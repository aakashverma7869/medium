var mongoose = require("mongoose");
var userSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      trim: true,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);


module.exports = mongoose.model("User", userSchema);
