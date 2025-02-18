const Course = require("../models/Course");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection")

// Create Section

exports.createSection = async(req, res) =>{
    try {
        //fetch data
        const {sectionName, courseId} = req.body;

        if(!sectionName || !courseId){
            return res.status(400).json({
                success: false,
                message:"Missing Properties",
            })
        }


        // create section
        const newSection  = await Section.create({sectionName});
        console.log("new Section :", newSection)
        console.log("COURSEID : ", courseId)
        // Update course with section objectId
        const updatedCourseDetails = await Course.findByIdAndUpdate(courseId, 
            {
                $push:{
                    courseContent:newSection._id,
                }
            },
            {new: true},
        )
        .populate({
            path: "courseContent",
            populate: {
              path: "subSection",
            },
          })
          .exec()

          console.log("Updated Section : ", updatedCourseDetails)

        return res.status(200).json({
            success:true,
            message:"Section created successfully",
            updatedCourseDetails,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message:"Error in Section Creation"
        })
    }
};


// Update Section

exports.updateSection = async(req, res) =>{
    try {
        // data input
        const {sectionName, sectionId, courseId} = req.body;
        
        if(!sectionName || !courseId){
            return res.status(400).json({
                success: false,
                message:"Missing Properties",
            })
        }

        // Update
        const section = await Section.findByIdAndUpdate(sectionId, {sectionName:sectionName}, {new : true});

        console.log("SECTION :", section)

         //make course to send
        const course= await Course.findById(courseId).populate({
        path:"courseContent",
        populate:{
            path:"subSection"
        }
        }).exec();

        return res.status(200).json({
            success: true,
            message:"Section Updated Successfully",
            data:course,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message:"Unable to update section, please try again"
        })
    }
};


// Delete section

exports.deleteSection = async(req, res)=>{
    try {
        // Get id from params
        const {sectionId, courseId} = req.body;

        await Course.findByIdAndUpdate(courseId,{
            $pull:{
              courseContent:sectionId,
            }
          })
          console.log(sectionId);
          //find by id an delete
          const deletedSection = await Section.findByIdAndDelete(sectionId);
          console.log("sectionId and CourseId",sectionId,courseId);

          if(!deletedSection){
            return res.status(404).json({
              success:false,
              message:"Section not found",
            })
          }

        await SubSection.deleteMany({_id:{$in:deletedSection.subSection}});
        await Section.findByIdAndDelete(sectionId);
        const course=await Course.findById(courseId).populate({
        path:"courseContent",
        populate:{
            path:"subSection"
        }
        }).exec();
        
        // return response
        return res.status(200).json({
            success: true,
            message:"Section Deleted Successfully",
            data:course
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message:"Unable to delete section, please try later",
            error: error.message,
        })
    }
}