const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");

// resetPasswordToken
exports.resetPasswordToken = async(req, res) =>{
    try {
        // get mail from req body
        const email = req.body.email;
        // check user for this email, email validation
        const user = await User.findOne({email: email});
        if(!user){
            return res.json({
                success: false,
                message:"Your Email is not registered with us"
            });
        }
        // genrate token
        const token = crypto.randomUUID();
        // Update user by adding token and expiration time
        const updatedDetails = await User.findOneAndUpdate(
            {email : email},
            {
                token: token,
                resetPasswordExpires:Date.now() + 5*60*1000,
            },
            {new: true},
        )
        // create url
        const url = `http://localhost:3000/update-password/${token}`
        // send mail containing the url
        await mailSender(email, 
            "Password Reset Link", 
            `Password Reset Link : ${url}`)
        // return response
        return res.json({
            success: true,
            message:"Email sent successfully, please check email and change password",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            messageL:"Something went wrong while sending reset password mail"
        });
    }
}



// resetPassword

exports.resetPassword = async(req, res)=>{
    try {
        //fetch data
        const {password, confirmPassword, token} = req.body;
        // validation
        if(password !== confirmPassword){
            return res.json({
                success: false,
                message:"Passwoerd not matching",
            });
        }
        // get userDetail from DB using token 
        const userDetails = await User.findOne({token: token});
        // IF no entry - Invalid token
        if(!userDetails){
            return res.json({
                success: false,
                message:"Token is Invalid"
            });
        }

        // Token time check
        if(userDetails.resetPasswordExpires < Date.now()){
            return res.json({
                success: false,
                message: "token is expired, please regenerate your token ",
            })
        }
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Pssword update
        await User.findOneAndUpdate(
            {token: token},
            {password: hashedPassword},
            {new: true},
        );
        // Return response
        return res.status(200).json({
            success: true,
            message:"Password reset successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message:"Something went wrong while sending reset password mail"
        })
    }
}