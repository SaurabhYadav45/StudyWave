const mongoose = require("mongoose");
// const mailSender = require("../utils/mailSender")

const OTPSchema = new mongoose.Schema({
    email:{
        type:String,
        reqired:true,
    },
    otp:{
        type:String,
        required:true,
    },
    cretaedAt:{
        type:Date,
        default:Date.now(),
        expires:5*60,
    }
});

async function sendVerificationEmail(email, otp){
    try {
        const mailResponse = await mailSender(email, "Verification Email from StudyNotion", otp);
        console.log("Email sent successfully : ", mailResponse);
    } catch (error) {
        console.log("error occurred while sending mail:", error);
        throw error;
    }
}

// This is a Mongoose middleware that runs before saving an OTP document to the database.
OTPSchema.pre("save", async function(next){
    await sendVerificationEmail(this.email, this.otp);
})

module.exports = mongoose.model("OTP", OTPSchema);