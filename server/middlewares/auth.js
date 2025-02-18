const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

// auth

exports.auth = async(req, res, next) =>{
    try {
        // extract token
        const token = req.cookies.token
                        || req.body.token
                        || req.header("Authorization").replace("Bearer ", "");

        // If token missing, then return response
        if(!token){
            return res.status(401).json({
                success: false,
                message:"Token is missing",
            })
       }

    // Verify the token
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        } catch (err) {
            //Verification Issue
            return res.status(401).json({
                success:false,
                message:'Token is Invalid',
            });
        }
        next();
    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"Something went wrong, while validating the token"
        })
    }
}


// isStudent

exports.isStudent = async (req, res, next) => {
	try {
		const userDetails = await User.findOne({ email: req.user.email });

		if (userDetails.accountType !== "Student") {
			return res.status(401).json({
				success: false,
				message: "This is a Protected Route for Students",
			});
		}
		next();
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: `User Role Can't be Verified` });
	}
};

// isAdmin
exports.isAdmin = async (req, res, next) => {
	try {
		const userDetails = await User.findOne({ email: req.user.email });

		if (userDetails.accountType !== "Admin") {
			return res.status(401).json({
				success: false,
				message: "This is a Protected Route for Admin",
			});
		}
		next();
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: `User Role Can't be Verified` });
	}
};

exports.isInstructor = async (req, res, next) => {
	try {
		const userDetails = await User.findOne({ email: req.user.email });
		console.log(userDetails);

		console.log(userDetails.accountType);

		if (userDetails.accountType !== "Instructor") {
			return res.status(401).json({
				success: false,
				message: "This is a Protected Route for Instructor",
			});
		}
		next();
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: `User Role Can't be Verified` });
	}
};


