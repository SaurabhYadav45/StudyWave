const nodemailer = require("nodemailer");

const mailSender = async(email, title, body) =>{
    try {
        // Create Transporter
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            // secure: true,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            }
        })

        // Send mail using transporter
        let info = transporter.sendMail({
            from: 'StudyNotion',
            to: `${email}`,
            subjects:`${title}`,
            html:`${body}`,
        })
        console.log(info);
        return info;

    } catch (error) {
        console.log(error.message);
    }
}


module.exports = mailSender;