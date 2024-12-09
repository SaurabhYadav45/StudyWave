const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender")
const emailTemplate = require("../mail/templates/emailVerificationTemplate")

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
        expires:5*60, // The document will be automatically deleted after 5 minutes of its creation time
    },
});

async function sendVerificationEmail(email, otp){
    try {
        const mailResponse = await mailSender(email, "Verification Email from StudyWave", emailTemplate(otp));
        console.log("Email sent successfully : ", mailResponse);
    } catch (error) {
        console.log("error occurred while sending mail:", error);
        throw error;
    }
}

// This is a Mongoose middleware that runs before saving an OTP document to the database.
OTPSchema.pre("save", async function (next) {
	console.log("New document saved to database");

	// Only send an email when a new document is created
	if (this.isNew) {
		await sendVerificationEmail(this.email, this.otp);
	}
	next();
});

module.exports = mongoose.model("OTP", OTPSchema);