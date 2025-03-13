const Category = require("../models/Category");


function getRandomInt(max) {
    return Math.floor(Math.random() * max)
}

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
            message:"All Categories returned successfully",
            data: allCategories,
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
        // console.log("Heloooooooooooooooo.....")
        const {categoryId} = req.body;
        // Get course for specified category
        const selectedCategory  = await Category.findById(categoryId)
        .populate({
            path: "courses", // Populate courses
            populate: [
              {
                path: "instructor", // Populate instructor from User model
                select: "firstName lastName", // Specify fields to retrieve
              },
              {
                path: "ratingAndReviews", // Populate ratingAndReviews
              },
            ],
          });
        //   .exec();

        console.log("SELECTED CATEGORY :", selectedCategory)
        // Handle the case when the category is not found
        if(!selectedCategory){
            return res.status(404).json({
                success: false,
                message:"Category not found"
            })
        }

        // Handle the case when there are no courses
        if (selectedCategory.courses.length === 0) {
            console.log("No courses found for the selected category.")
            return res.status(404).json({
            success: false,
            message: "No courses found for the selected category.",
            })
        }


        // get courses for different categories
        // const differentCategories = await Category.find({
        //                                   _id:{$ne:categoryId},
        //                                   })
        //                                   .populate("courses")
        //                                   .exec();

        const categoriesExceptSelected = await Category.find({
            _id: { $ne: categoryId },
          })

           // If no categories are found, handle the edge case
            if (categoriesExceptSelected.length === 0) {
                return res.status(404).json({ message: "No other categories found" });
            }

          // Select a random category
            const randomCategoryId =
            categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]._id;

            // Fetch the random category and populate its published courses
            const differentCategory = await Category.findById(randomCategoryId).populate({
                path: "courses", // Populate courses
                match: { status: "Published" }, // Only include published courses
                populate: [
                  {
                    path: "instructor", // Populate instructor from User model
                    select: "firstName lastName", // Specify fields to retrieve
                  },
                  {
                    path: "ratingAndReviews", // Populate ratingAndReviews
                    select: "rating review", // Specify fields to retrieve
                  },
                ],
              });



        // Get top selling courses 
        // H.W

        // Get top-selling courses across all categories
    //     const allCategories = await Category.find()
    //     .populate({
    //     path: "courses",
    //     match: { status: "Published" },
    //     })
    //     .exec()
    //      const allCourses = allCategories.flatMap((category) => category.courses)
    //      const mostSellingCourses = allCourses
    //     .sort((a, b) => b.sold - a.sold)
    //     .slice(0, 10)

        // return response
        return res.status(200).json({
            success:true,
            data:{
                selectedCategory,
                differentCategory,
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