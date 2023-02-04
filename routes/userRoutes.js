const express = require("express");
const router = express.Router();
const {registerUser,sendLoginOtp,verifyUser} = require("../controllers/userController");

router.route("/register").post(registerUser);

router.route("/sendloginotp").post(sendLoginOtp);

router.route("/verify").post(verifyUser);

module.exports = router;