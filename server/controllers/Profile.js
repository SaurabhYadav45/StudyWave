const mongoose = require("mongoose")

const Profile = require("../models/Profile");
const User = require("../models/User");
const {uploadImageToCloudinary} = require("../utils/imageUploader")


const CourseProgress = require("../models/CourseProgress")
const Course = require("../models/Course")
const { convertSecondsToDuration } = require("../utils/secToDuration")

exports.updateProfile = async(req, res) =>{
    try {
        // Get data
        const {
            firstName = "",
            lastName = "",
            dateOfBirth = "",
            about = "",
            contactNumber = "",
            gender = "",
          } = req.body
          const id = req.user.id

        //Validation
        if(!contactNumber || !gender || !id){
            return res.status(400).json({
                success: false,
                message:"ALl fields are required",
            });
        }
        // Find the profile by id
        const userDetails = await User.findById(id)
        const profileDetails = await Profile.findById(userDetails.additionalDetails)

        const user = await User.findByIdAndUpdate(id, {
        firstName,
        lastName,
        })
        await user.save()

        // Update profile
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about =  about;
        profileDetails.gender = gender;
        profileDetails.contactNumber = contactNumber;
        await profileDetails.save();

        // Find the updated user details
        const updatedUserDetails = await User.findById(id)
        .populate("additionalDetails")
        .exec()
        //return response
        return res.status(200).json({
            success:true,
            message:"Profile updated successfully",
            updatedUserDetails,
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Unable to update profile, Try again later"
        })
    }
};


//deleteAccount

exports.deleteAccount = async(req, res)=>{
    try {
        //get id
        const id = req.user.id;
        // Validation
        const userDetails = User.findById(id);
        if(!userDetails){
            return res.status(404).json({
                success: false,
                message:"User not found",
            })
        }

        // delete profile
        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});
        //H.W unenroll User from all enrolled courses
        // How can we schedule this schedule delete operation
        // Cron job

        //delete user
        await User.findByIdAndDelete({_id: id});
        //Return response
        return res.status(200).json({
            success:true,
            message:"user deleted successfully"
        })
    } catch (error) {
        return  res.status(500).json({
            success: false,
            message:"user cannot be deleted, please try again later"
        })
    }
}


exports.getUserDetails = async(req, res)=>{
    try {
        const id = req.user.id;
        const userDetails = await User.findById(id).populate("additionalDetails").exec();
        return res.status(200).json({
            success: true,
            message:"User data fetched successfullly"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


// updateDisplayPicture
exports.updateDisplayPicture = async (req, res) => {
  try {
    const displayPicture = req.files.displayPicture
    const userId = req.user.id
    const image = await uploadImageToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000
    )
    console.log(image)
    const updatedProfile = await User.findByIdAndUpdate(
      { _id: userId },
      { image: image.secure_url },
      { new: true }
    )
    res.send({
      success: true,
      message: `Image Updated successfully`,
      data: updatedProfile,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// Get Enrolled Courses

exports.getEnrolledCourses = async (req, res) => {
    try {
      const userId = req.user.id
      let userDetails = await User.findOne({
        _id: userId,
      })
        .populate({
          path: "courses",
          populate: {
            path: "courseContent",
            populate: {
              path: "subSection",
            },
          },
        })
        .exec()
      userDetails = userDetails.toObject()
      var SubsectionLength = 0
      for (var i = 0; i < userDetails.courses.length; i++) {
        let totalDurationInSeconds = 0
        SubsectionLength = 0
        for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
          totalDurationInSeconds += userDetails.courses[i].courseContent[
            j
          ].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
          userDetails.courses[i].totalDuration = convertSecondsToDuration(
            totalDurationInSeconds
          )
          SubsectionLength +=
            userDetails.courses[i].courseContent[j].subSection.length
        }
        let courseProgressCount = await CourseProgress.findOne({
          courseID: userDetails.courses[i]._id,
          userId: userId,
        })
        courseProgressCount = courseProgressCount?.completedVideos.length
        if (SubsectionLength === 0) {
          userDetails.courses[i].progressPercentage = 100
        } else {
          // To make it up to 2 decimal point
          const multiplier = Math.pow(10, 2)
          userDetails.courses[i].progressPercentage =
            Math.round(
              (courseProgressCount / SubsectionLength) * 100 * multiplier
            ) / multiplier
        }
      }
  
      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userDetails}`,
        })
      }
      return res.status(200).json({
        success: true,
        data: userDetails.courses,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  }

// Get Instructor Dashboard

exports.getInstructorDashboard = async(req, res)=>{
  try {
    const userId = req.user.id

    const courseDetails = await Course.find({instructor : userId})

    const courseData = courseDetails.map((course) => {
      const totalStudentsEnrolled = course?.studentsEnrolled?.length
      const totalAmountGenerated = totalStudentsEnrolled * course?.price

      // Create a new object with the additional fields
      const courseDataWithStats = {
        _id: course._id,
        courseName: course?.courseName,
        courseDesciption: course?.courseDescription,
        totalStudentsEnrolled,
        totalAmountGenerated,
      }
      return courseDataWithStats
    })
    return res.status(200).json({
      success:true,
      courses:courseData,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success:false,
      message:"server Error"
    })
  }
}
