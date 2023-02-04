const User = require("../models/userModel")
const ErrorHandler = require("../utils/errorHandler")
const { verifyJwtToken } = require("../utils/token.js")


exports.auth = async (req, res, next) => {
    
        // check for auth header from client 
        const header = req.headers.authorization

        if (!header) {
           return next(new ErrorHandler("Auth Headers missing",403))
        }

        // verify  auth token
        const token = header.split("Bearer")[1]
        //console.log(token)
        if (!token) {
           return next(new ErrorHandler("Auth Token missing",403))
        }

        const userId = verifyJwtToken(token,next)

        if (!userId) {
           return next(new ErrorHandler("User Id missing",403))
        }

        const user = await User.findById(userId)

        if (!user) {
            return next(new ErrorHandler("User not found",404))
        }

        req.user = user;

        next();

}