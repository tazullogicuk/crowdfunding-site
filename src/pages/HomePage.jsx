// src/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to the Crowdfunding Platform</h1>
          <p className="text-xl mb-8">Invest in businesses and own a part of their success!</p>
          <Link to="/businesses" className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition">
            Explore Businesses
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Platform?</h2>
        <div className="flex flex-wrap justify-around">
          <div className="max-w-sm bg-white shadow-md rounded-lg p-6 m-4">
            <h3 className="text-xl font-semibold mb-2">Simple Investment Process</h3>
            <p>Browse businesses, invest with ease, and track your ownership all in one place.</p>
          </div>
          <div className="max-w-sm bg-white shadow-md rounded-lg p-6 m-4">
            <h3 className="text-xl font-semibold mb-2">Secure Transactions</h3>
            <p>Your investments are secured, with transparency and trust built into the platform.</p>
          </div>
          <div className="max-w-sm bg-white shadow-md rounded-lg p-6 m-4">
            <h3 className="text-xl font-semibold mb-2">Diverse Opportunities</h3>
            <p>Invest in a variety of businesses and diversify your portfolio.</p>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="bg-gray-800 text-white py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Get Started Today!</h2>
          <p className="text-lg mb-8">Join our community and start investing in businesses that matter to you.</p>
          <Link to="/register" className="bg-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-blue-500 transition mr-4">
            Sign Up
          </Link>
          <Link to="/login" className="bg-gray-700 px-6 py-3 rounded-full font-semibold hover:bg-gray-600 transition">
            Log In
          </Link>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
