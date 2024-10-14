// server/routes/business.js
const express = require('express');
const router = express.Router();
const Business = require('../models/Business');

// Get all businesses
router.get('/', async (req, res) => {
  try {
    const businesses = await Business.find();
    res.json(businesses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single business by ID
router.get('/:id', async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);
    res.json(business);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
