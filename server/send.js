// server/seed.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Business = require('./models/Business');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB');

    // Sample data for multiple businesses
    const businesses = [
      {
        name: "Road Freight Transport",
        description: "Capital for buying and transporting goods accessible in your investor account as soon as the project repayment is completed.",
        image: "https://via.placeholder.com/150",
        expectedReturn: 14,
        term: "8 months",
        daysLeft: 21,
        goalAmount: 40000,
        currentFunding: 19466,
      },
      {
        name: "Eco-Friendly Cleaning Service",
        description: "A sustainable cleaning company using eco-friendly products. Seeking investment to expand operations to new regions.",
        image: "https://via.placeholder.com/150",
        expectedReturn: 10,
        term: "12 months",
        daysLeft: 30,
        goalAmount: 25000,
        currentFunding: 8000,
      },
      {
        name: "Tech Innovations",
        description: "Invest in a tech startup focused on developing AI-driven solutions for the healthcare industry.",
        image: "https://via.placeholder.com/150",
        expectedReturn: 18,
        term: "6 months",
        daysLeft: 15,
        goalAmount: 60000,
        currentFunding: 42000,
      }
    ];

    // Clear existing data and insert new demo data
    await Business.deleteMany({});
    await Business.insertMany(businesses);
    
    console.log('Demo businesses inserted');
    mongoose.disconnect();
  })
  .catch(err => console.error('Error connecting to MongoDB:', err));
