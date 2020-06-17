const express = require("express");
const router = express.Router();
const controller = require("../controllers")
const getControllers = controller.get
const postControllers = controller.post


//Get Controller
router.route("/").get(getControllers.indexPage);

router.route("/refresh").get(getControllers.refresh);


//Post Controller
router.route("/indexPage").post(postControllers.indexPage);


module.exports = router;