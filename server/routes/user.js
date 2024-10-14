// server/routes/user.js
const express = require('express');
const multer = require('multer');
const auth = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure this path is correctly configured
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Route for updating user profile
router.put('/update', auth, upload.single('profileImage'), async (req, res) => {
  const userId = req.user.userId;
  const { fullName, email, phone, address } = req.body;
  const profileImage = req.file ? req.file.path : null;

  try {
    const updatedData = { fullName, email, phone, address };
    if (profileImage) {
      updatedData.profileImage = profileImage;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Error updating profile', error });
  }
});

module.exports = router;
