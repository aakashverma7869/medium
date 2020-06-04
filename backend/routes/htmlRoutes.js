const express = require("express");
const router = express.Router();
const controller = require("../controllers")
const getControllers = controller.get
const postControllers = controller.post


//Get Controller
router.route("/").get(getControllers.login);
router.route("/signup").get(getControllers.signup);
router.route("/phonenumber").get(getControllers.phonenumber);
router.route("/logout").get(getControllers.logout);
router.route("/editProfile").get(getControllers.editProfile);
router.route("/AddSchedule").get(getControllers.AddSchedule);
router.route("/travastraPlus").get(getControllers.travastraPlus);
router.route("/index").get(getControllers.index);

//POST Controller
router.route("/indexPage").post(postControllers.indexPage);
router.route("/signUpUser").post(postControllers.signUpUser);
router.route("/otp").post(postControllers.otp);
router.route("/check").post(postControllers.check);
router.route("/updateUserData").post(postControllers.updateUserData);
router.route("/docSignUp").post(postControllers.docSignUp);
router.route("/addschedule").post(postControllers.addschedule);

module.exports = router;