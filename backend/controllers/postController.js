const User = require("../models/user")


let login = (req, res) => {
    // res.render("LoginPage");
    const {phone,password} = req.body
    User.findOne({ phone }, (err, user) => {
        if (err || !user) {
        res.render("LoginPage");
        }
        else if(user.password==password){
            res.render("index");
        }
    });
}
let index = (req, res) => {
    res.render("index");
}
module.exports = {
    login:login,
    index : index
}