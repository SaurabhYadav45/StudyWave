const Course = require("../models/Course");
const Tag = require('../models/Category');
const User = require('../models/User');
const {uploadImageToCloudinary} = require('../utils/imageUploader');


// CreateCourse handler function

exports.createCourse  = async(req, res) =>{
    try {
        const {courseName, courseDescription, whatYouWillLearn, price, tag} = req.body;
        // get thumbnail
        const thumbnail = req.files.thumbnailImage;

        // Do validation
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !tag){
            return res.status(400).json({
                success: false,
                message:"All fields are mandatory",
            });
        }

        // Check for instructor
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);
        console.log("Instructor Details : ", instructorDetails);

        if(!instructorDetails){
            return res.status(404).json({
                success: false,
                message:"Instructor Detail not found"
            })
        }

        const tagDetails = await Tag.findById(tag);
        if(!tagDetails){
            return res.status(404).json({
                success: false,
                message:"Tag Detail not found"
            })
        }

        // Upload Image to Cloudinary
        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

        //Create an entry for new course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn:whatYouWillLearn,
            price,
            tag:tagDetails._id,
            thumbnail:thumbnailImage.secure_url,
        })

        // Add the new course to the userSchema of Instructor
        await User.findByIdAndUpdate(
            {_id : instructorDetails._id},
            { $push:{ Courses:newCourse._id}},
            {new: true},
        );

        // Update the tag ka schema 
        // H.W
        await Tag.findByIdAndUpdate(
            tagDetails._id,
            { $push: { courses: newCourse._id } },
            { new: true }
        );

        //Return response
        return res.status(200).json({
            success: true,
            message:"Course created successfully",
            data: newCourse,
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message : "Failed to create course"
        })
    }
};



// getAllCourses handler function

exports.getAllCourses = async(req, res)=>{
    try {
        const allCourses = await Course.find({});

        return res.status(200).json({
            success: true,
            message: "Data for all courses fetched successfully",
            data: allCourses,
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message : "Cannot fetch course data"
        })
    }
}


// getCourseDetails

exports.getCourseDetails = async(req, res) =>{
    try {
        // get id
        const {courseId} = req.body;
        // find course details
        const courseDetails = await Course.find(
                                    {_id:courseId})
                                    .populate(
                                        {
                                            path:"instructor",
                                            populate:{
                                                path:"additionalDetails",
                                            },
                                        }
                                    )
                                    .populate("category")
                                    .populate("ratingAndReviews")
                                    .populate({
                                        path:"courseContent",
                                        populate:{
                                            path:"subSection"
                                        }
                                    })
                                    .exec();

        // Validsation
        if(!courseDetails){
            return res.status(400).json({
                success: false,
                message:`Could not find the course with ${courseId}`,
            })
        }
        // Return response
        return res.status(200).json({
            success: true,
            message:"Course details fetched successfully",
            data:courseDetails,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message:error.message,
        })
    }
}


// deleteCourse
exports.deleteCourse = async (req, res) => {
    try {
      const { courseId } = req.body
  
      // Find the course
      const course = await Course.findById(courseId)
      if (!course) {
        return res.status(404).json({ message: "Course not found" })
      }
  
      // Unenroll students from the course
      const studentsEnrolled = course.studentsEnroled
      for (const studentId of studentsEnrolled) {
        await User.findByIdAndUpdate(studentId, {
          $pull: { courses: courseId },
        })
      }
  
      // Delete sections and sub-sections
      const courseSections = course.courseContent
      for (const sectionId of courseSections) {
        // Delete sub-sections of the section
        const section = await Section.findById(sectionId)
        if (section) {
          const subSections = section.subSection
          for (const subSectionId of subSections) {
            await SubSection.findByIdAndDelete(subSectionId)
          }
        }
  
        // Delete the section
        await Section.findByIdAndDelete(sectionId)
      }
  
      // Delete the course
      await Course.findByIdAndDelete(courseId)
  
      return res.status(200).json({
        success: true,
        message: "Course deleted successfully",
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      })
    }
  }
  