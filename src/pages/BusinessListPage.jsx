// src/pages/BusinessListPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BusinessCard from '../components/BusinessCard';

function BusinessListPage() {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch businesses from the backend
    axios.get('http://localhost:5001/api/businesses')
      .then(response => {
        setBusinesses(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("There was an error fetching the business data!", error);
        setError("There was an error fetching the business data.");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-6 text-center text-lg">Loading...</div>;
  if (error) return <div className="p-6 text-center text-red-600">{error}</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Businesses for Investment</h1>
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        {businesses.map((business) => (
          <BusinessCard key={business._id} business={business} />
        ))}
      </div>
    </div>
  );
}

export default BusinessListPage;
