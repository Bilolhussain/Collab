const mongoose = require('mongoose');
const { Schema } = mongoose;

// Create Schema
const MeetingSchema = new Schema({
  counselor: {
    type: String,
    // required: true
  },
  student: {
    type: String,
  },
  time: {
    type: String,
  },
  agenda: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('meeting', MeetingSchema);
