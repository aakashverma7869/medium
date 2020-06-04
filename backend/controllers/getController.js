const User = require("../models/user")
const Schedule =require("../models/schedule")

let index = (req, res) => {
    console.log("entry in index function get-->>>");
    const userID = req.session.userid;
    console.log("print id--->",userID);
    User.findOne({ _id : userID }, (err, user) => {
        console.log("Entry of DB...........")
          if (err || !user) {
            console.log("Data not found");
            res.redirect("/");
        }
        else{
            console.log("print user------->>",user);
            res.render("index",{"userName": user.name,"userPhone":user.phone,"status":"Successfully"});
        } 
    });
}
let login = (req, res) => {
    console.log("Login page redirect")
    
    req.session.loginstatus = req.session.loginstatus || null
    res.render("LoginPage",{"status": req.session.loginstatus});
}
let signup = (req, res) => {
    res.render("SignupPage");
}
let phonenumber = (req, res) => {
    res.render("PhoneNumber");
}
const logout = (req,res) =>{
    req.session.destroy(function(err) {
      console.log("session is destroyed");
    })
  res.redirect("/");
  }
let travastraPlus = (req,res) =>{
    res.render("travastraPlus");
}
  
let editProfile = (req, res) => {
    const userID = req.session.userid;
    User.findOne({ _id : userID }, (err, user) => {
        // console.log("Entry of DB...........")
          if (err || !user) {
            console.log("Data not found");
            res.redirect("/");
        }
        else{
            Schedule.find({ doctorId : userID }, (err, schedule) => {
                console.log("Entry of DB..........")
                  if (err || !schedule) {
                    // console.log("Inside Error->>>>",user);
                    res.render("editProfile",{user:user,"status":"none"});
                }
                else{
                    // console.log(schedule);
                    // console.log("user data is --->>>>>>>>>",user);
                    // console.log("user schedule is is --->>>>>>>>>",schedule);
                    
                    res.render("editProfile",{schedule:schedule,user:user,"status":"none"});
                } 
            });

        } 
    });

}


let AddSchedule = (req, res) =>
{
    res.render("AddSchedule")
}


module.exports = {
    index:index,
    login:login,
    signup:signup,
    phonenumber:phonenumber,
    logout:logout,
    editProfile:editProfile,
    AddSchedule:AddSchedule,
    travastraPlus:travastraPlus
}