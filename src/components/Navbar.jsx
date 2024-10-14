import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const isAuthenticated = !!token;

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or Project Name */}
        <Link to="/" className="text-2xl font-bold">Crowdfunding Platform</Link>
        
        {/* Links */}
        <div className="flex space-x-4">
          <Link to="/" className="hover:text-gray-400">Home</Link>
          <Link to="/businesses" className="hover:text-gray-400">Businesses</Link>
          {isAuthenticated && <Link to="/profile" className="hover:text-gray-400">Profile</Link>}
          
          {/* Authentication Links */}
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="hover:text-gray-400">Login</Link>
              <Link to="/register" className="hover:text-gray-400">Register</Link>
            </>
          ) : (
            <button 
              onClick={handleLogout} 
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
