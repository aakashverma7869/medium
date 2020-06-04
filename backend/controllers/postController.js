
let _id = null

const User = require("../models/user")
const Schedule = require("../models/schedule")


const Nexmo = require('nexmo');
//for OTP generator
const nexmo = new Nexmo({
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET
});
//check or emailid and password if correct render to index page

let indexPage = (req, res) => {
  console.log("Post request for login");
    const {email,password} = req.body;

    User.findOne({ email }, (err, user) => {
      console.log("Entry of DB...........")
        if (err || !user) {
          console.log("invalid login password")
          req.session.loginstatus = "Invalid"
          res.redirect("/");
        }
        
        else if(user.password==password){
          //check of already session
          if(!req.session.userid)
          {
            console.log("IF-->");
            //if session is not present make a session for the user
            req.session.userid = user._id;
            const obje = { 
              "status":"Successfully",
              "userName":user.name,
              "userPhone":user.phone
             }

             console.log("OBhect milna vala h",obje);
            res.render("index",obje);
          }
        }

        else{
          console.log("Else part--->>>>>>>")
          res.redirect("/");
        }
    });
}


//for SignUp user
let  signUpUser = (req, res) => {
    const user = new User(req.body);
    user.save((err, category) => {
      if (err) {
        return res.status(400).json({
          error: "NOT able to save category in DB"
        });
      }
      else{
          console.log("Sucessful store in DB",category);
          if(category.doctorchec=="doctor")
          {
            console.log("Yes doctor is ------------->>>>>>>>>>");
            req.session.userid = user._id;
            res.render("docSignUp",{"userName": category.name});
          }
          else{
            res.render("index",{"userName": category.name,"userPhone":category.phone,"status":"Successfully"});
          }
      }
    });
  };

  //for doctor signup
  let docSignUp = (req,res) =>{

      User.findOneAndUpdate(
        { _id: req.session.userid},
        { $set: req.body },
        { new: true ,useFindAndModify : false},
      // { name:(name || "").toString() ,
      //   email:(email || "").toString(),
      //   state:(state || "").toString(),
      //   city:(city || "").toString(),
      //   country:(country || "").toString(),
      //   date:(date || "").toString(),
      //   gender:(gender || "").toString(),
      //   phone:(phone || "").toString()
      // },
      (err, output) => {
        if (err) {
          console.log("error in updte",err.errmsg);
        }
        else{
          console.log("data updated",output);
          res.render("index",{"userName": output.name,"userPhone": output.phone, "status":output.status});
        }
      }
    
    );
    
    };











//After entering the phone number
  let otp = (req, res) => {
      // A user registers with a mobile phone number
      let phoneNumber = req.body.phone;
      console.log(phoneNumber);
      //check the user is registered in DB
      User.findOne({ phone:phoneNumber }, (err, user) => {
        if (err || !user) {
        console.log("Phone number does't match with database");
          res.render("LoginPage");
        }
        //  m\u/else if(user.phone==phoneNumber){
        //   if(!req.session.userid)
        //   {
        //     req.session.userid = user._id;
        //     res.render("index");
        //   }     
        // }
        else{
          //making of session
        req.session.userOtp = user._id;
        console.log("OTP------------>",req.session.userOtp);

        nexmo.verify.request({number: "91"+phoneNumber, brand: 'travastra',workflow_id: '6'}, (err, result) => {
        if(err) {
          console.log(err);
     
          //Oops! Something went wrong, respond with 500: Server Error
          res.status(500).send(err);
        } else {
          console.log(result);
     
          if(result && result.status == '0') {
            //A status of 0 means success! Respond with 200: OK
            _id = result.request_id;
            res.render("OTP");
          } else {
            //A status other than 0 means that something is wrong with the request. Respond with 400: Bad Request
            //The rest of the status values can be found here: https://developer.nexmo.com/api/verify#status-values
            res.status(400).send(result);
          }
        }
      });
      
    }
    });
}

let check = (req, res) => {
    //To verify the phone number the request ID and code are required.
    console.log("check------>",Object.keys(req.session));
    if(req.session.userOtp)
    {
   console.log("session mil gya ",req.session.userOtp);
   
    let code = req.body.code;
    let requestId = _id;
    console.log("Code: " + code + " Request ID: " + requestId);
   
    nexmo.verify.check({request_id: requestId, code: code}, (err, result) => {
      if(err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        console.log(result)
        if(result && result.status == '0') {
          //A status of 0 means success! Respond with 200: OK
          // res.status(200).send(result);
          console.log('Account verified!')


          User.findOne({ _id : req.session.userOtp}, (err, user) => {
            if (err || !user) {
              console.log("ID not found in DB", req.session.userOtp);
              req.session.destroy(function(err) {
                console.log("session is destroyed");
              })
            res.render("LoginPage");
            }
              else if(!req.session.userid)
              {
                req.session.userOtp = null;
                req.session.userid = user._id;
                res.render("index");
              }   
        });

        } else {
          //A status other than 0 means that something is wrong with the request. Respond with 400: Bad Request
          //The rest of the status values can be found here: https://developer.nexmo.com/api/verify#status-values
          res.status(400).send(result);
          console.log('Error verifying account')
        }
      }
    });
  }
  else{
    console.log("session not found");
    res.render("LoginPage");
  }
}








let updateUserData = (req, res) => {
  const {name,email,state,city,country,date,gender,phone} = req.body;
  console.log("phone is ------->",phone);
  console.log("type of phone is ------->",typeof(phone));
  
  User.findOneAndUpdate(
    
    { _id: req.session.userid},
    { $set: req.body },
    { new: true ,useFindAndModify : false},

  (err, user) => {
    if (err) {
      console.log("error in updte",err.errmsg);
      res.redirect("editProfile");
    }
    else{
      console.log("data updated",user);
      const userID = req.session.userid;
      Schedule.find({ doctorId : userID }, (err, schedule) => {
        console.log("Entry of DB..........")
          if (err || !schedule) {
            console.log("Inside Error->>>>",user);
            res.render("editProfile",user);
        }
        else{
            console.log(schedule);
            console.log("user data is --->>>>>>>>>",user);
            console.log("user schedule is is --->>>>>>>>>",schedule);
            
            res.render("editProfile",{schedule:schedule,user:user,"status":"Successfully"});
        } 
    });

      // res.render("editProfile",{user:user});
    }
  }

);

};




let addschedule = (req,res) =>
{

  console.log("data value is ---->>>>>>>>>>",req.body);
  const sche = new Schedule({days: req.body.days , hospital: req.body.hospital ,startTime: req.body.startTime , endTime: req.body.endTime , interval:req.body.interval , doctorId: req.session.userid});
// console.log("after--->>>>",sche);
  sche.save((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "NOT able to save category in DB"
      });
    }
    else{
        console.log("Sucessful store in DB",category);
    }
  });
};




module.exports = {
    indexPage:indexPage,
    signUpUser: signUpUser,
    otp:otp,
    check:check,
    updateUserData:updateUserData,
    docSignUp: docSignUp,
    addschedule: addschedule
}