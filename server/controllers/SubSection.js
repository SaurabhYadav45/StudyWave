const { uploadImageToCloudinary } = require("../utils/imageUploader");
const Section = require('../models/Section');
const SubSection = require("../models/SubSection");



exports.createSubSection = async(req, res) =>{
    try {
        // fetch data
        const{sectionId, title, timeDuration, description} = req.body;

        // Extract video/files
        const video = req.files.videoFiles;
        // validation
        if(!sectionId || !title || !timeDuration || !description){
            return res.status(400).json({
                success: false,
                message:"All  fields are required"
            })
        }

        //upload video to cloudinary
        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);
        //Create a subsection
        const subSectionDetails = await SubSection.create({
            title: title,
            timeDuration: timeDuration,
            description: description,
            videoUrl : uploadDetails.secure_url,
        })

        // Update Sectionwith this Subsection objectid
        const updatedSection = await Section.findByIdAndUpdate({_id: sectionId},
            {$push:{subSection: subSectionDetails._id}},
            {new: true}
        );
        // H.W :-> Populate Query

        return res.status(200).json({
            success: true,
            message:"SubSectuion created succcessfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message:"Unable to create Subsection, please try again later"
        })
    }
};


// H.W
// Update Sub section

//Delete Sub Section

