const Profile = require("../models/profileModel");
const catchAsyncError = require("../middleware/catchAsyncError");

//Update Profile
exports.updateProfile = catchAsyncError(async(req,res,next)=>{
    
    const {_id,phoneNo,email} = req.user;
    const { general_info, experienceList, skills, projectsList, certificatesList, coursesList, contact_info } = req.body;
    
    await Profile.updateOne({
        user_id : _id},{  
    
        general_info:general_info,
       
        experience: experienceList,

        skills:skills,

        project:projectsList,

        licenses_and_certificates:certificatesList,

        course: coursesList,

        contact_info:contact_info,
    }, {
        upsert: true
    }
    )

    res.status(200).json({
        success:true,
        message:"User updated successfully"
    })
    next();
})


//Get user details
exports.getUserDetails = catchAsyncError(async(req,res,next)=>{
    const {_id} = req.user;
    const userProfile = await Profile.findOne({user_id:_id})
    
    res.status(200).json({
        userProfile,
        success:true,
    })
    next();
})