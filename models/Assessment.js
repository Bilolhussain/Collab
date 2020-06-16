const mongoose = require("mongoose");
const {Schema} = mongoose;

// Create Schema
const AssessmentSchema = new Schema({
  uAge: {
    type: String
    // required: true
  },
  uGender: {
    type: String
    // type: mongoose.Schema.Types.ObjectId, ref: 'User'
  },
  // uGender: {
  //   type: String,
  //   required: false
  // },
  uCountry: {
    type: String
    // required: true
  },
  // postedBy:{
  //   type: mongoose.Schema.Types.ObjectId, ref: 'User',
  //   required: true
  // },
    date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("assessments", AssessmentSchema);