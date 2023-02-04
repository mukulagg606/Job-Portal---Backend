const Profile = require("../models/profileModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");

//Update Profile
exports.updateProfile = catchAsyncError(async(req,res,next)=>{
    
    //console.log(req.user);
    
    const {_id,phoneNo,email} = req.user;
    const {full_name,headline,company_name,position,date_of_joining,date_of_resigning,work_description,used_skills,
    skills_name,years_of_experience,project_title,project_url,project_description,project_duration,
    license_name,certificate_issuing_organisation,certificate_link,certificate_issue_date,course_name,course_issuing_organisation,
    skype_id} = req.body;
     await Profile.updateOne({
        user_id : _id},{  
    
        general_info:{
        full_name:req.body.full_name,
        headline:req.body.headline},
       
        experience:{
        company_name:req.body.company_name,
        position:req.body.position,
        date_of_joining:req.body.date_of_joining,
        date_of_resigning:req.body.date_of_resigning,
        work_description:req.body.work_description,
        used_skills:req.body.used_skills},

       skills:{ 
        skills_name:req.body.skills_name,
        years_of_experience:req.body.years_of_experience},

        ad_project:{
        project_title:req.body.project_title,
        project_url:req.body.project_url,
        project_description:req.body.project_description,
        project_duration:req.body.project_duration},

        add_licenses_and_certificates:{
        license_name:req.body.license_name,
        certificate_issuing_organisation:req.body.certificate_issuing_organisation,
        certificate_link:req.body.certificate_link,
        certificate_issue_date:req.body.certificate_issue_date},

        add_course:{
        course_name:req.body.course_name,
        course_issuing_organisation:req.body.course_issuing_organisation},

        contact_info:{
        phoneNo:phoneNo,
        email:email,
        skype_id:req.body.skype_id},
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
    const user = await Profile.findOne({user_id:_id})
    
    res.status(200).json({
        user,
        success:true,
    })
    next();
})