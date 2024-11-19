const Course = require("../models/Course");
const Section = require("../models/Section");

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
        const newSection  = await sectionName.create({sectionName});
        // Update course with section objectId
        const updatedCourseDetails = await Course.findByIdAndUpdate(courseId, 
            {
                $push:{
                    courseContent:newSection._id,
                }
            },
            {new: true},
        );

        // HW 
        // Use populate to replace section/ subsection bot in updatedCourseDetails

        return res.status(200).json({
            success:true,
            message:"Section created successfully",
            updatedCourseDetails,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message:"Error in Course Creation"
        })
    }
};


// Update Section

exports.updateSection = async(req, res) =>{
    try {
        // data input
        const {sectionName, sectionId} = req.body;

        if(!sectionName || !courseId){
            return res.status(400).json({
                success: false,
                message:"Missing Properties",
            })
        }

        // Update
        const section = await Course.findByIdAndUpdate(sectionId, {sectionName}, {new : true});

        return res.status(200).json({
            success: true,
            message:"Section Updated Successfully"
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
        const {sectionId} = req.params;

        // Use findByIdAndDelete
        await Section.findByIdAndDelete(sectionId);
        // return response
        return res.status(200).json({
            success: true,
            message:"Section deleted Successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message:"Unable to delete section, please try later"
        })
    }
}