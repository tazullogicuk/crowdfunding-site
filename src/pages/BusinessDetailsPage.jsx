// src/pages/BusinessDetailsPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function BusinessDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [investment, setInvestment] = useState('');
  const [ownership, setOwnership] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch the specific business data based on the 'id' parameter
    axios.get(`http://localhost:5001/api/businesses/${id}`)
      .then(response => {
        setBusiness(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("There was an error fetching the business details!", error);
        setError("There was an error fetching the business details.");
        setLoading(false);
      });
  }, [id]);

  const handleInvestmentChange = (e) => {
    const value = e.target.value;
    setInvestment(value);
    setOwnership((value / (business?.goalAmount || 1)) * 100); // Guard against division by zero
  };

  const handleInvestmentSubmit = (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    
    if (!token || !userId) {
      // Redirect to login if the user is not logged in
      window.location.href = '/login';
      return;
    }
  
    const investmentData = {
      userId,  // Include the userId in the payload
      businessId: business._id,  // Make sure this is the correct business ID
      amount: parseFloat(investment),  // Convert amount to a number
      ownership: ownership.toFixed(2), // Format ownership percentage
    };
  
    axios.post('http://localhost:5001/api/investments', investmentData, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      alert('Investment submitted successfully!');
      // Optionally, update state or refresh the page to show updated investment details
    })
    .catch(error => {
      console.error('Error processing investment:', error);
      if (error.response && error.response.status === 401) {
        // Redirect to login if the token is invalid or missing
        window.location.href = '/login';
      } else {
        alert('Failed to submit investment.');
      }
    });
  };
  
  


  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden p-6">
      <div className="flex">
        <img src={business.image} alt={business.name} className="w-1/3 rounded-lg object-cover" />
        <div className="w-2/3 pl-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{business.name}</h1>
          <p className="text-gray-600 mb-4">{business.description}</p>
          <div className="flex space-x-8 mb-4">
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
        </div>
      </div>

      {/* Progress Bar and Funding Info */}
      <div className="mt-6">
        <div className="bg-gray-300 h-2 rounded-full mb-3">
          <div 
            className="bg-green-600 h-2 rounded-full transition-all duration-300" 
            style={{ width: `${(business.currentFunding / business.goalAmount) * 100}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-sm text-gray-600 mb-6">
          <span>€{business.currentFunding.toLocaleString()} invested</span>
          <span>€{(business.goalAmount - business.currentFunding).toLocaleString()} left</span>
        </div>
      </div>

      {/* Investment Form */}
      <form onSubmit={handleInvestmentSubmit} className="bg-gray-100 p-4 rounded-lg shadow-inner">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Investment Amount (€):
        </label>
        <input 
          type="number" 
          value={investment} 
          onChange={handleInvestmentChange}
          className="w-full p-2 border border-gray-300 rounded-lg mb-4"
          min="0"
        />
        <div className="text-gray-700 mb-4">
          Ownership: <span className="font-semibold">{ownership.toFixed(2)}%</span>
        </div>
        <button 
          type="submit" 
          className="w-full py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700"
        >
          Invest Now
        </button>
      </form>

      {/* Success or Error Message */}
      {message && <p className="mt-4 text-center text-lg font-semibold">{message}</p>}
    </div>
  );
}

export default BusinessDetailsPage;
