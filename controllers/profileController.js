const Profile = require("../models/profileModel");
const catchAsyncError = require("../middleware/catchAsyncError");

//Update Profile
exports.updateProfile = catchAsyncError(async(req,res,next)=>{
    
    const {_id,phoneNo,email} = req.user;
    const {full_name,headline,company_name,position,date_of_joining,date_of_resigning,work_description,used_skills,
    skills_name,years_of_experience,project_title,project_url,project_description,project_duration,
    license_name,certificate_issuing_organisation,certificate_link,certificate_issue_date,course_name,course_issuing_organisation,
    skype_id} = req.body;
     await Profile.updateOne({
        user_id : _id},{  
    
        general_info:{
        full_name,
        headline},
       
        experience:{
        company_name,
        date_of_joining,
        date_of_resigning,
        work_description,
        used_skills
    },

       skills:{ 
        skills_name,
        years_of_experience
    },

        ad_project:{
        project_title,
        project_url,
        project_description,
        project_duration
    },

        add_licenses_and_certificates:{
        license_name,
        certificate_issuing_organisation,
        certificate_link,
        certificate_issue_date
    },

        add_course:{
        course_name,
        course_issuing_organisation
    },

        contact_info:{
        phoneNo:phoneNo,
        email:email,
        skype_id
    },
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