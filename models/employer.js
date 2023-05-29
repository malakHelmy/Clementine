const mongoose = require('mongoose');

const employerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  website: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  
  isAdmin: {
    type: Boolean,
    default: false
  }
  
});

const Employer = mongoose.model('Employer', employerSchema);

module.exports = Employer;
