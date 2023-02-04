const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const { createJwtToken } = require("../utils/token.js");
const { generateOTP, fast2sms } = require("../utils/otp.js");

//Register a User
exports.registerUser = catchAsyncError(async(req,res,next) => {
    //console.log("hi"+req.body)
    const {name, phoneNo, email} = req.body;
    //console.log("hiiiii"+JSON.stringify(req.body))
    const phoneExist = await User.findOne({ phoneNo });

    if (phoneExist) {
      return next (new ErrorHandler("Phone Number already exists",400));
    }

    const user = await User.create({
        name:name,
        phoneNo:phoneNo,
        email:email,
    });

    res.status(200).json({
        success:true,
        message:"User created successfully",
        data: {
            userId: user._id,
          },
    })

    const otp = generateOTP(6);
    user.phoneOTP = otp;
    await user.save();
    await fast2sms(
      {
        message: `Your OTP is ${otp}`,
        contactNumber: Number(user.phoneNo),
      },
    );
  } 
);

//Login User
exports.sendLoginOtp = catchAsyncError(async(req,res,next)=>{

        const { phoneNo } = req.body;
        const user = await User.findOne({ phoneNo });
    
        if (!user) {
         return next (new ErrorHandler("Phone Number not found",404))
        }
    
        res.status(201).json({
          type: "success",
          message: "OTP sended to your registered phone number",
          data: {
            userId: user._id,
          },
        });
    
        const otp = generateOTP(6);
        console.log(otp);
        user.phoneOTP = otp;
        user.isAccountVerified = true;
        await user.save();
        await fast2sms(
          {
            message: `Your OTP is ${otp}`,
            contactNumber: user.phoneNo,
        },
       
      );
  });
  

  //Verify User
  exports.verifyUser = async (req, res,next) => {
    
      const { otp, phoneNo } = req.body;
      const user = await User.findOne({phoneNo});
      //console.log("1")
      if (!user) {
       return next (new ErrorHandler("User not found",400))
      }
      //console.log("2")
      if (user.phoneOTP !== otp) {
       return next (new ErrorHandler("incorrect otp",400))
      }
      const token = createJwtToken({ userId: user._id });
      //console.log("3")
      user.phoneOTP = "";
      await user.save();
      //console.log("4")
      res.status(201).json({
        type: "success",
        message: "OTP verified successfully",
        data: {
          token
        },
      });
  };

