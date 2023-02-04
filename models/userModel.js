const mongoose = require("mongoose");
const validator = require("validator")

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Your Name"]
    },
    phoneNo:{
        type:String,
        required:[true, "Please Enter Your Phone Number"],
        unique:true,
        max:[10,"Incorrect Number"],
        min:[10,"Incorrect Number"]
    },
    email:{
        type:String,
        required:[true,"Please Enter Email"],
        validator:[validator.isEmail,"Please enter valid Email"]
    },
    phoneOTP:{
        type:String,
    },
    
})

module.exports = mongoose.model("User",userSchema);