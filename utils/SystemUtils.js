const nodemailer = require('nodemailer');

const MAIL_TITLE = {
    auth:'Verification link for your email address'

}

const transferMail = async(to, subject, message)=>{
    try{
        const transport = nodemailer.createTransport({
            service:'Gmail',
            // host: "smtp.gmail.com",
            // port: 587,
            // secure: false,
            auth:{
                user: process.env.MAIL_USER || 'help.bluelbis@gmail.com',
                pass: process.env.MAIL_PASS || 'Admin@012458' 
            }
        });
        const result = await transport.sendMail({
            from:subject,
            to,
            subject,
            html:message,
        });
        console.log(result);
        return true;
    }  
    catch(err){
        console.log(err);
        return false;
    } 
}

module.exports={
    transferMail,MAIL_TITLE
}