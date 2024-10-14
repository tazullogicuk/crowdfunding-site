// server/models/Business.js
const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
  expectedReturn: Number,
  term: String,
  daysLeft: Number,
  goalAmount: Number,
  currentFunding: Number,
  investors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

module.exports = mongoose.model('Business', businessSchema);
