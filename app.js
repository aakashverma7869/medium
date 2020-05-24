const express = require("express");
require('dotenv').config()
const mongoose = require("mongoose");
const router = express.Router();
const app = express();
const cors = require("cors");
const compression = require("compression");
const bodyParser = require("body-parser");
// const logger = require("morgan");
const path = require("path");
const mainRoutes = require("./backend/routes/htmlRoutes");
const cookieParser = require("cookie-parser");



//db connection
mongoose.connect(process.env.DATABASE,
    {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true})
    .then(()=>{
        console.log("DB CONNECTED................");
    });







app.use(cookieParser());
app.use(cors());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("views", __dirname + "/client/views");
app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "client/css/")));
app.use(express.static(path.join(__dirname, "client/script/")));
// app.use(logger("dev"));
/*
function home(req, res) {
  res.render("index");
}
router.route("/").get(home);
*/


app.use("/", mainRoutes);
app.set("port", process.env.PORT || 4000);
app.listen(app.get("port"), () => {
  console.log("Application running in port: " + app.get("port"));
});
module.exports = app;