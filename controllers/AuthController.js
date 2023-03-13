const { validationResult } = require('express-validator');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const ResponseData = require('../utils/ResponseData');
const keys = require("../config/keys");
const Model = require('../models');
 
const UserModel = Model.user;
const LicenseModel = Model.license;
const OutletModel = Model.outlet;

const ResponseUserModel = (user) => {
    let licenseKey = "";
    let validateLicense = -1;
    let mode = 'free';
    if(user.license!=null && user.license.length>0){
        user.license.sort((a,b)=>{
            if(a.expired > b.expired){
                return 1;
            }
            return -1;
            
        });
        licenseKey = user.license[0].license;
        validateLicense = user.license[0].expired;
        mode = 'expired';
        if(validateLicense > Date.now()){
            mode = 'license';
        }
    }
    return {
        fullname: `${user.firstname} ${user.lastname}`,
        phone: user.phone,
        email: user.email,
        active: user.active,
        avatar: user.avatar,
        id: user.id,
        role: user.role,
        firstname:user.firstname,
        lastname:user.lastname,
        gender:user.gender,
        token:user.token,
        licenses:user.license,
        licenseKey,
        validateLicense,
        mode
    }
}
const jwtsign = (payload) => {
    // Sign token
    return jwt.sign(
        payload,
        keys.secretOrKey, {
        expiresIn: 31556926 // 1 year in seconds
    }
    );
}
const encryptPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        bcrypt.hash(password, 10, (err, data) => {
            if (err) reject(err);

            resolve(data);
        });
    });
}
const checkPassword = (password, hashPassword) => {
    return new Promise(async (resolve, reject) => {
        bcrypt.compare(
            password.toString(),
            hashPassword.toString(),
            (err, data) => {
                if (err) reject(err);
                resolve(data);
            }
        );
    });
};
const login = async (req, res) => {
    const validResult = validationResult(req);
    if (!validResult.isEmpty) {
        return ResponseData.warning(res, validResult.array()[0].msg);
    }
    try {
        const { email, password } = req.body;
        
        await UserModel.hasMany(LicenseModel);

        const user = await UserModel.findOne({
            where: { [Op.or]: [{ phone: email }, { email }] },
            include:[{model:LicenseModel, as:"license"}]
        });

        if (user == null || !user) {
            return ResponseData.warning(res, "auth.backend.message1:Can't find user by this email or name");
        }

        else {

            if (!await checkPassword(password, user.password)) {
                return ResponseData.warning(res, "auth.backend.message2:Wrong password, check again");
            }

            const payload = { id: user.id, email: user.email, role: user.role, phone:user.phone};

            const token = jwtsign(payload);
            return ResponseData.ok(res, "auth.backend.message3:Login successfully, welcome to your visit.", { token, user: ResponseUserModel(user) });

        }

    }
    catch (err) {
        console.log(err);
        return ResponseData.error(res, "auth.backend.message4:Internal server error", err);
    }
}
const register = async (req, res) => {
    const validResult = validationResult(req);
    if (!validResult.isEmpty) {
        return ResponseData.warning(res, validResult.array()[0].msg);
    }
    try {
        
        const { country, businessName, busineeType, district, phone, ownerName, email, pin } = req.body;

        if ((await UserModel.findOne({ where: { [Op.or]: [{ phone }, { email }] } })) != null) {
            return ResponseData.warning(res, "auth.backend.message5:Already using phone or email, try login");
        }
        else {
            const user = await UserModel.create({
                phone, email, firstname:ownerName,
                password: await encryptPassword(password)
            }
            );

            const outlet = await OutletModel.create({
              country, name:businessName, type:busineeType, district, owner:user.id  
            })

            const payload = { id: user.id, email, role: 'owner', phone };
            const token = jwtsign(payload);
            
            return ResponseData.ok(res, "auth.backend.message6:Created outlet and user, please login with your authentication", { token, user: ResponseUserModel(user) });
        }
    }
    catch (err) {
        console.log(err)
        return ResponseData.error(res, "auth.backend.message4:Internal server error", err);
    }
}
const account = async (req, res) => {
    try {
        return ResponseData.ok(res, "get account information", { user: ResponseUserModel(req.user) });
    }
    catch (err) {
        console.log(err)
        return ResponseData.error(res, "Server Fatal Error", err);
    }
}
// const sendAuthMail = async (req, res) => {
//     try {
//         const user = req.user;
//         const payload = { id: user.id, email: user.email, role: 'user', active: false };
//         const token = jwtsign(payload);
//         const link = `${process.env.REDIRECT_URL}verify/email/${token}`;

//         if (await transferMail(user.email, MAIL_TITLE.auth, emailVerificationTemplate(link))) {
//             return ResponseData.ok(res, `Sent Verification Email to ${user.email}`, { token });
//         }
//         else {
//             return ResponseData.warning(res, `Whoops!, Did not send verification mail to ${user.email}`, { token });
//         }
//     }
//     catch (err) {
//         console.log(err)
//         return ResponseData.error(res, "Server Fatal Error", err);

//     }
// }
// const emailVerify = async (req, res) => {
//     try{
//         const {token} = req.params;
//         const payload = jwt.verify(token,keys.secretOrKey);
//         const user = await UserModel.findOne({where:{email:payload.email, id:payload.id}});
//         if(user!=null){
//             await user.update({active:true})
//             return ResponseData.ok(res, `Verified your email`);
//         }
//         else
//             return ResponseData.warning(res,`Can not find user infomation from system`);
//     }
//     catch(err){
//         return ResponseData.warning(res,`Token error, Can't verified`);
//     }
// }
module.exports = {
    ResponseUserModel,
    register,
    login,
    account,
    // sendAuthMail,
    // emailVerify,
}