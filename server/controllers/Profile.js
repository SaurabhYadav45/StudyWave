const mongoose = require("mongoose")

const Profile = require("../models/Profile");
const User = require("../models/User");
const {uploadImageToCloudinary} = require("../utils/imageUploader")


// const CourseProgress = require("../models/CourseProgress")
// const Course = require("../models/Course")
// const { convertSecondsToDuration } = require("../utils/secToDuration")

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

