// server/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const businessRoutes = require('./routes/business');
const investmentRoutes = require('./routes/investments');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile'); // Import the new profile route

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));


// Routes
app.use('/api/businesses', businessRoutes);
app.use('/api/investments', investmentRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', profileRoutes); // Register the profile route

// Serve static files for profile images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
