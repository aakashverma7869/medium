var mongoose = require("mongoose");
var schedule = new mongoose.Schema(
  {
    days: {
      type: String,
      trim: true,
      required: true
    },
    hospital: {
      type: String,
      required: true
    },
    startTime: {
        type: String,
        maxlength: 32,
        trim: true
      },
      endTime: {
        type: String,
        trim: true
      },
    interval: {
        type: String,
        maxlength: 32,
          trim: true
      },
      doctorId:{
        type: String
      }  
  },

  { timestamps: true }
);

module.exports = mongoose.model("Schedule", schedule);
