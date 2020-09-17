const mongoose = require('mongoose');
const { Schema } = mongoose;

// Create Schema
const AssessmentSchema = new Schema({
  uCountry: {
    type: String,
    // required: true
  },
  uGender: {
    type: String,
    // type: mongoose.Schema.Types.ObjectId, ref: 'User'
  },
  uId: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('assessments', AssessmentSchema);
