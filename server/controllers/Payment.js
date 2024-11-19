const {instance} = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");

// Capture the payment and initiate the Razorpay order
exports.capturePayment = async(req, res) =>{
    // get CourseId and UserId
    const {course_id} = req.body;
    const userId = req.user.id;
    // Validation
    if(!course_id){
        return res.status(400).json({
            success: false,
            message:"Please provide valid course ID"
        })
    }

    let course;
    try {
        course = await Course.findById(course_id);
        if(!course){
            return res.json({
                success: false,
                message:"Could not find the course"
            })
        }

        // Check if user already paid for this course
        const uid = new mongoose.Types.ObjectId(userId);
        if(course.studentsEnrolled.includes(uid)){
            return res.json({
                success: false,
                message:"Student is already enrolled"
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }

    // Order Create
    const amount = course.price;
    const currency = "INR";
    const options = {
        amount: amount*100,
        currency,
        reciept:Math.random(Date.now()).toString(),
        notes:{
            courseId: course_id,
            userId,
        }
    };

    try {
        // Initialize the payment using Razorpay
        const paymentResponse = await instance.orders.create(options);
        console.log(paymentResponse);

        // Return response
        return res.status(200).json({
            success: false,
            courseName: course.courseName,
            courseDescription: course.courseDescription,
            thumbnail: course.thumbnail,
            orderId:paymentResponse.id,
            currency:paymentResponse.currency,
            amount:paymentResponse.amount,
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message:"Could not initiate order"
        })
    }
}


//verify Signature of razorpay and Server

exports.verifySignature = async(req, res)=>{
    const webhookSecret = "123455678";

    const signature = req.headers["x-razorpay-signature"];

    const shasum = crypto.createHmac("sha256", webhookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    if(signature === digest){
        console.log("Payment is Authorized");

        const {courseId, userId} = req.body.payload.payment.entity.notes;

        try {
            // find the course and enroll the student in it
            const enrolledCourse = await Course.findOneAndUpdate(
                {_id:courseId},
                {$push:{studentsEnrolled:userId}},
                {new:true},
            );

            if(!enrolledCourse){
                return res.status(500).json({
                    success: false,
                    mmessage:"Course not found",
                })
            }
            console.log(enrolledCourse);

            //Find the Student and add the course to their list enrolled course
            const enrolledStudent = await User.findOneAndUpdate(
                {_id: userId},
                {$push:{courses: courseId}},
                {new:true},
            );
            console.log(enrolledStudent);

            //Send Confirmation Mail
            const emailResponse = await mailSender(
                enrolledStudent.email,
                "Conratulation fron StudyNotion",
                "Congratulation, you're Enrolled to your new course",
            )

            console.log(emailResponse);
            return res.status(200).json({
                success: true,
                message:"Signature Verified and Copurse Added"
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message:error.message,
            })
        }
    }
    else{
        return res.status(400).json({
            success: false,
            message: "Invalid request",
        });
    }
}