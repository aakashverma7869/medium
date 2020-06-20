var mongoose = require("mongoose");
var blogSchema = new mongoose.Schema(
  {
   
    fname: {
        type: String,
        maxlength: 100
      },
      relatedbtn: {
        type: String,
        maxlength: 100
      }
  },
  { timestamps: true }
);


module.exports = mongoose.model("Blog", blogSchema);
