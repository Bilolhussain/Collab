const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const RegisteredEmailSchema = new Schema({
    
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zip: {
        type: String,
        required: true
    },
    phone1: {
        type: String,
        required: true
    },
    phhone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }
});

module.exports = RegisteredEmail = mongoose.model("registeredemail", RegisteredEmailSchema);

