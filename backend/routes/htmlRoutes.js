const express = require("express");
const router = express.Router();
const controller = require("../controllers")
const getControllers = controller.get
const postControllers = controller.post
// const postController = require("../controllers/postController");
// router.route("/").get(getControllers.index);
// router.route("/login").post(postControllers.index);
// router.route("/").get(getControllers.login);
router.route("/").get(getControllers.login);
router.route("/login").post(postControllers.login);







// router.route("/Doctors").get(getController.doctor);
// router.route("/Hospitals").get(getController.hospitals);
// router.route("/getlocation/:pincode").get(getController.pincodeQuery);
// router.route("/search").post(postController.search);
// router.route("/login").get(getController.login);
// router.route("/signup").get(getController.signup);
module.exports = router;