const mongoose = require('mongoose');
const { Schema } = mongoose;

// Create Schema
const CounselorSchema = new Schema({
  firstName: {
    type: String,
    // required: true
  },
  lastName: {
    type: String,
  },
  gender: {
    type: String,
  },
  education: {
    type: String,
  },
  expertise: {
    type: String,
  },
  picture: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('counselors', CounselorSchema);
