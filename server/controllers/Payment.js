const {instance} = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");

const mongoose = require("mongoose")
const crypto = require("crypto")

const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail")
const {paymentSuccessEmail} = require("../mail/templates/paymentSuccessEmail")
const CourseProgress = require("../models/CourseProgress")

// Capture the payment and initiate the Razorpay order

exports.capturePayment = async(req, res) =>{
    const{courses} = req.body
    const{userId} = req.user.id
    

    if(courses.length === 0){
        return res.json({success: false, message:"Please Provide a Course ID"})
    }

    let total_amount = 0;
    for(const courseId of courses){
        let course;
        try {
            // Find the course by its ID
            course = await Course.findById(courseId)

            // If the course is not found, return an error
            if(!course){
                return res.status(500).json({success:false, message:"Could not find the Course"})
            }

            // Check if the user is already enrolled in the course
            console.log("Just above uid")
            const uid = new mongoose.Types.ObjectId(userId)
            if(course.studentsEnrolled.includes(uid)){
                return res.status(200).json({
                    success:false,
                    message:"Student is already Registerd"
                })
            }

            total_amount += course.price
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success:false,
                message:error.message
            })
        }
    }

    const options = {
        amount: total_amount*100,
        currency: "INR",
        receipt: Math.random(Date.now()).toString()
    }

    try {
        // Initiate the Payment using Razorpay
        const paymentResponse = await instance.orders.create(options)
        console.log("PaymentResponse",paymentResponse)
        
        res.status(200).json({
            success:true,
            data:paymentResponse,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Could Not Initiate the Orders"
        })
    }
}


// Verify the Payment

exports.verifyPayment = async(req, res)=>{
    const razorpay_order_id = req.body.razorpay_order_id
    const razorpay_payment_id = req.body.razorpay_payment_id
    const razorpay_signature = req.body.razorpay_signature
    const courses = req.body?.courses
    const userId = req.user.id

    if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !userId){
        return res.status(404).json({
            success:false,
            message:"Payment Failed"
        })
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id
    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(body.toString())
        .digest("hex")


        if(expectedSignature === razorpay_signature){
            try {
                // Handle the enrollment and response inside this function
                await enrollStudents(courses, userId, res);
            } catch (error) {
                return res.status(500).json({
                    success: false,
                    message: "Enrollment failed: " + error.message,
                });
            }
        } else {
            return res.status(500).json({
                success:false,
                message:"Payment verification failed"
            });
        }

    // if(expectedSignature === razorpay_signature){
    //     await enrollStudents(courses, userId, res)
    //     return res.status(200).json({
    //         success:true,
    //         message:"Payment Verified"
    //     })
    // }

    // return res.status(500).json({
    //     success:false,
    //     message:"Payment failed"
    // })
}

// Enroll the student in the course

const enrollStudents = async (courses, userId, res) => {
    if (!courses || !userId) {
      return res
        .status(400)
        .json({ success: false, message: "Please Provide Course ID and User ID" })
    }
  
    let errors = []; // To collect errors during iteration
  
    for (const courseId of courses) {
      try {
        // Find the course and enroll the student
        const enrolledCourse = await Course.findOneAndUpdate(
          { _id: courseId },
          { $push: { studentsEnrolled: userId } },
          { new: true }
        )
  
        if (!enrolledCourse) {
          errors.push(`Course not found: ${courseId}`)
          continue // Skip to the next course
        }
  
        // console.log("Updated course: ", enrolledCourse)
  
        // Create course progress
        const newCourseProgress = await CourseProgress.create({
          courseID: courseId,
          userId: userId,
          completedVideos: [],
        })
  
        // Find the student and update enrolled courses
        const enrolledStudent = await User.findByIdAndUpdate(
          userId,
          {
            $push: {
              courses: courseId,
              courseProgress: newCourseProgress._id,
            },
          },
          { new: true }
        )
  
        if (!enrolledStudent) {
          errors.push(`User not found: ${userId}`)
          continue
        }
  
        console.log("Enrolled student: ", enrolledStudent)
  
        // Send email notification
        try {
          const emailResponse = await mailSender(
            enrolledStudent.email,
            `Successfully Enrolled into ${enrolledCourse.courseName}`,
            courseEnrollmentEmail(
              enrolledCourse.courseName,
              `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
            )
          )
          console.log("Email sent successfully: ", emailResponse.response)
        } catch (emailError) {
          console.log("Email sending failed: ", emailError)
        }
  
      } catch (error) {
        console.log(error)
        errors.push(`Error enrolling in course ${courseId}: ${error.message}`)
      }
    }
  
    // ✅ Send response only once after loop finishes
    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors })
    }
  
    return res.status(200).json({ success: true, message: "Enrollment successful" })
  }
  


exports.sendPaymentSuccessEmail = async(req, res)=>{
    const{orderId, paymentId, amount} = req.body
    const userId = req.user.id

    if(!orderId || !paymentId || !amount || !userId){
        return res.json({
            success:false,
            message:"Please provide all the details"
        })
    }

    try {
        const enrolledStudent = await User.findById(userId)

        await mailSender(
            enrolledStudent.email,
            `Payment Recieved`,
            paymentSuccessEmail(
                `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
                amount/100,
                orderId,
                paymentId
            )
        )
    } catch (error) {
        console.log("error in sending mail", error)
        return res
        .status(400)
        .json({ success: false, message: "Could not send email" })
    }
}





// Capture the payment and initiate the Razorpay order
// exports.capturePayment = async(req, res) =>{
//     // get CourseId and UserId
//     const {course_id} = req.body;
//     const userId = req.user.id;
//     // Validation
//     if(!course_id){
//         return res.status(400).json({
//             success: false,
//             message:"Please provide valid course ID"
//         })
//     }

//     let course;
//     try {
//         course = await Course.findById(course_id);
//         if(!course){
//             return res.json({
//                 success: false,
//                 message:"Could not find the course"
//             })
//         }

//         // Check if user already paid for this course
//         const uid = new mongoose.Types.ObjectId(userId);
//         if(course.studentsEnrolled.includes(uid)){
//             return res.json({
//                 success: false,
//                 message:"Student is already enrolled"
//             });
//         }
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({
//             success: false,
//             message: error.message,
//         });
//     }

//     // Order Create
//     const amount = course.price;
//     const currency = "INR";
//     const options = {
//         amount: amount*100,
//         currency,
//         reciept:Math.random(Date.now()).toString(),
//         notes:{
//             courseId: course_id,
//             userId,
//         }
//     };

//     try {
//         // Initialize the payment using Razorpay
//         const paymentResponse = await instance.orders.create(options);
//         console.log(paymentResponse);

//         // Return response
//         return res.status(200).json({
//             success: false,
//             courseName: course.courseName,
//             courseDescription: course.courseDescription,
//             thumbnail: course.thumbnail,
//             orderId:paymentResponse.id,
//             currency:paymentResponse.currency,
//             amount:paymentResponse.amount,
//         })
//     } catch (error) {
//         console.log(error);
//         res.json({
//             success: false,
//             message:"Could not initiate order"
//         })
//     }
// }


//verify Signature of razorpay and Server

// exports.verifySignature = async(req, res)=>{
//     const webhookSecret = "123455678";

//     const signature = req.headers["x-razorpay-signature"];

//     const shasum = crypto.createHmac("sha256", webhookSecret);
//     shasum.update(JSON.stringify(req.body));
//     const digest = shasum.digest("hex");

//     if(signature === digest){
//         console.log("Payment is Authorized");

//         const {courseId, userId} = req.body.payload.payment.entity.notes;

//         try {
//             // find the course and enroll the student in it
//             const enrolledCourse = await Course.findOneAndUpdate(
//                 {_id:courseId},
//                 {$push:{studentsEnrolled:userId}},
//                 {new:true},
//             );

//             if(!enrolledCourse){
//                 return res.status(500).json({
//                     success: false,
//                     mmessage:"Course not found",
//                 })
//             }
//             console.log(enrolledCourse);

//             //Find the Student and add the course to their list enrolled course
//             const enrolledStudent = await User.findOneAndUpdate(
//                 {_id: userId},
//                 {$push:{courses: courseId}},
//                 {new:true},
//             );
//             console.log(enrolledStudent);

//             //Send Confirmation Mail
//             const emailResponse = await mailSender(
//                 enrolledStudent.email,
//                 "Conratulation fron StudyNotion",
//                 "Congratulation, you're Enrolled to your new course",
//             )

//             console.log(emailResponse);
//             return res.status(200).json({
//                 success: true,
//                 message:"Signature Verified and Copurse Added"
//             })
//         } catch (error) {
//             console.log(error);
//             return res.status(500).json({
//                 success: false,
//                 message:error.message,
//             })
//         }
//     }
//     else{
//         return res.status(400).json({
//             success: false,
//             message: "Invalid request",
//         });
//     }
// }