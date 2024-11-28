const Category = require("../models/Category");

exports.createCategory = async(req, res) =>{
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
        const categoryDetails = await Category.create({
            name:name,
            description: description,
        })
        console.log(categoryDetails);

        return res.status(200).json({
            success:true,
            message:"Category created successfuly"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


// Get allCategories handler function

exports.showAllCategories = async(req, res) =>{
    try {
        // This retrieves all tag documents from the database, but only includes name and description fields in each document.
        const allCategories = await Category.find({}, {name:true, description:true});
        res.status(200).json({
            success:true,
            message:"All Categories returned successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:  error.message,
        })
    }
}


exports.categoryPageDetails  = async(req, res)=>{
    try {
        // get category id
        const {categoryId} = req.body;
        // Get course for specified category
        const selectedCategory  = await Category.findById(categoryId)
                                          .populate("courses")
                                          .exec();
        // Validation
        if(!selectedCategory){
            return res.status(404).json({
                success: false,
                message:"Data Not Found"
            })
        }
        // get courses for different categories
        const differentCategories = await Category.find({
                                          _id:{$ne:categoryId},
                                          })
                                          .populate("courses")
                                          .exec();
        // Get top selling courses 
        // H.W

        // return response
        return res.status(200).json({
            success:true,
            data:{
                selectedCategory,
                differentCategories,
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}