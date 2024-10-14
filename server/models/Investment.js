// server/models/Investment.js
const mongoose = require('mongoose');

const investmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }, // Make optional for testing
  businessId: { type: mongoose.Schema.Types.ObjectId, ref: 'Business', required: true },
  amount: { type: Number, required: true },
  ownership: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Investment', investmentSchema);
