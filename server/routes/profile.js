// server/routes/profile.js
const express = require('express');
const multer = require('multer');
const auth = require('../middleware/auth');
const Profile = require('../models/Profile'); // Import the Profile model

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Store uploads in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Route to update profile
router.put('/update', auth, upload.single('profileImage'), async (req, res) => {
  const userId = req.user.userId; // Assumes auth middleware sets userId
  const { fullName, email, phone, address } = req.body;
  const profileImage = req.file ? req.file.path : null;

  try {
    const updatedData = { fullName, email, phone, address };
    if (profileImage) {
      updatedData.profileImage = profileImage;
    }

    const updatedProfile = await Profile.findByIdAndUpdate(userId, updatedData, { new: true });
    res.status(200).json(updatedProfile);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Error updating profile', error });
  }
});

module.exports = router;
