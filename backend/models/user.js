var mongoose = require("mongoose");
var userSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      trim: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    name: {
        type: String,
        maxlength: 32,
        trim: true
      },
      email: {
        type: String,
        trim: true
      },
      gender: {
        type: String,
        maxlength: 32,
        trim: true
      },
      date:{
          type: Date
      },
      city: {
        type: String,
        maxlength: 32,
        trim: true
      },
      state: {
        type: String,
        maxlength: 32,
        trim: true
      },
      
      doctorchec: {
        type: String,
        maxlength: 32,
        trim: true
      },
      country: {
        type: String,
        maxlength: 32,
        trim: true
      },
      description:{
        type: String,
        maxlength: 150,
        trim: true
      },
      speciality:{
        type: String,
        maxlength: 32,
        trim: true
      },
      qualification:{
        type: String,
        maxlength: 32,
        trim: true
      },
      treatmentList:{
        type: String,
        maxlength: 32,
        trim: true
      },
      location:{
        type: String,
        maxlength: 32,
        trim: true
      },
      hospital:{
        type: String,
        maxlength: 32,
        trim: true
      },
      achivements:{
        type: String,
        maxlength: 32,
        trim: true
      },
      awards:{
        type: String,
        maxlength: 32,
        trim: true
      },
      experience:{
        type: String,
        maxlength: 32,
        trim: true
      },
      fees:{
        type: String,
        maxlength: 32,
        trim: true
      },
      photo: {
        data: Buffer,
        contentType: String
      }

  },
  { timestamps: true }
);


module.exports = mongoose.model("User", userSchema);
