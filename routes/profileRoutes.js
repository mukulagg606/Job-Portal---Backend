const express = require("express");
const { updateProfile,getUserDetails } = require("../controllers/profileController");
const { auth } = require("../middleware/auth");
const router = express.Router();

router.route("/updateprofile").post(auth,updateProfile);

router.route("/viewuserprofile").get(auth,getUserDetails);


module.exports = router;