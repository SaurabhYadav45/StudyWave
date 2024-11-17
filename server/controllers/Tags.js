const Tag = require("../models/tags");

exports.createTag = async(req, res) =>{
    try {
        // fetch data
        const {name, description} = req.body;
        // Do Validation
        if(!name || !description){
            return res.status(403).json({
                success: false,
                message:"All fields are required",
            })
        }

        // Create entry in DB
        const tagDetails = await Tag.create({
            name:name,
            description: description,
        })
        console.log(tagDetails);

        return res.status(200).json({
            success:true,
            message:"Tag created successfuly"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


// Get allTags handler function

exports.showAllTags = async(req, res) =>{
    try {
        // This retrieves all tag documents from the database, but only includes name and description fields in each document.
        const allTags = await Tag.find({}, {name:true, description:true});
        res.status(200).json({
            success:true,
            message:"All tags returned successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:  error.message,
        })
    }
}