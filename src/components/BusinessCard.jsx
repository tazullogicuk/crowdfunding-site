// src/components/BusinessCard.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate

function BusinessCard({ business }) {
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); // Check if the user is logged in

  const handleInvestClick = () => {
    if (!token) {
      navigate('/login'); // Redirect to login if not authenticated
    } else {
      navigate(`/business/${business._id}`); // Navigate to BusinessDetailsPage if authenticated
    }
  };

  return (
    <div className="flex bg-white shadow-md rounded-lg overflow-hidden mb-6 border border-gray-200">
      {/* Left Section - Image */}
      <div className="w-1/3 relative">
        <img src={business.image} alt={business.name} className="h-full w-full object-cover" />
        <div className="absolute top-4 left-4 bg-green-600 text-white text-xs px-3 py-1 rounded-md shadow">
          + ACTIVE
        </div>
      </div>

      {/* Right Section - Content */}
      <div className="w-2/3 p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-1">{business.name}</h2>
          <p className="text-gray-600 text-sm mb-4">{business.description}</p>
          
          <div className="flex items-center space-x-6 mb-4">
            <div className="text-center">
              <span className="block text-xs text-gray-500">Expected return</span>
              <span className="block text-lg font-semibold text-gray-900">{business.expectedReturn}%</span>
            </div>
            <div className="text-center">
              <span className="block text-xs text-gray-500">Term</span>
              <span className="block text-lg font-semibold text-gray-900">{business.term}</span>
            </div>
            <div className="text-center">
              <span className="block text-xs text-gray-500">To invest</span>
              <span className="block text-lg font-semibold text-gray-900">{business.daysLeft} days</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-gray-300 h-2 rounded-full mb-3">
            <div 
              className="bg-green-600 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${(business.currentFunding / business.goalAmount) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>€{business.currentFunding.toLocaleString()} invested</span>
            <span>€{(business.goalAmount - business.currentFunding).toLocaleString()} left</span>
          </div>
        </div>

        {/* Invest Button */}
        <button 
          onClick={handleInvestClick}
          className="w-full mt-4 py-2 bg-green-600 text-white font-semibold rounded-md shadow hover:bg-green-700 transition-colors"
        >
          INVEST
        </button>

        {/* Details Button */}
        <Link to={`/business/${business._id}`}>
          <button className="w-full mt-2 py-2 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 transition-colors">
            DETAILS
          </button>
        </Link>
      </div>
    </div>
  );
}

export default BusinessCard;
