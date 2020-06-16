const mongoose = require("mongoose");
const assessments = require("./Assessment");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  fileimg: {
    type: String,
    required: true
   },
  firstLogin: { 
    type: Boolean, default: false
  },
  // assessment:[{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "assessments"
  // }],
    date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("users", UserSchema);
