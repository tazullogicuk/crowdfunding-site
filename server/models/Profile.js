// server/models/Profile.js
const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  address: String,
  profileImage: String,
  // Add any other fields you need for the profile
});

module.exports = mongoose.model('Profile', profileSchema); // Ensure 'Profile' is the model name
