// server/routes/investments.js
const express = require('express');
const auth = require('../middleware/auth'); 
const Investment = require('../models/Investment');
const Business = require('../models/Business');

const router = express.Router();

router.post('/', auth, async (req, res) => {
  const { businessId, amount, ownership } = req.body;
  const userId = req.user.userId;

  try {
    const newInvestment = new Investment({ userId, businessId, amount, ownership });
    await newInvestment.save();

    const business = await Business.findById(businessId);
    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }
    business.currentFunding += amount;
    await business.save();

    res.status(201).json(newInvestment);
  } catch (error) {
    console.error('Error processing investment:', error);
    res.status(500).json({ message: 'Error processing investment', error });
  }
});

module.exports = router;
