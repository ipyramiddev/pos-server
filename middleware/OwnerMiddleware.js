const ResponseData = require('../utils/ResponseData')
module.exports = async(req,res,next) =>{
    if(req.user && req.user.id && req.user.role.includes("owner")){
        next();
    }
    else{
        ResponseData.error(res,"Login with Owner",{});
    }
     
}