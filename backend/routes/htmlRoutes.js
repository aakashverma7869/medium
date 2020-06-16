const express = require("express");
const router = express.Router();
const controller = require("../controllers")
const getControllers = controller.get
const postControllers = controller.post


//Get Controller
router.route("/").get(getControllers.index);


module.exports = router;