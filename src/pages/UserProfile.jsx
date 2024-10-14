import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UserProfile() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    profileImage: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [updateMessage, setUpdateMessage] = useState('');

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    
    if (userId && token) {
      axios.get(`http://localhost:5001/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(response => {
        setUserInfo(response.data);
        if (response.data.profileImage) {
          setImagePreview(`http://localhost:5001/${response.data.profileImage}`);
        }
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUserInfo((prev) => ({ ...prev, profileImage: file }));
    setImagePreview(URL.createObjectURL(file));
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('fullName', userInfo.fullName);
    formData.append('email', userInfo.email);
    formData.append('phone', userInfo.phone);
    formData.append('address', userInfo.address);
    if (userInfo.profileImage) {
      formData.append('profileImage', userInfo.profileImage);
    }

    const token = localStorage.getItem('token');
    axios.put('http://localhost:5001/api/users/update', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(response => {
      setUpdateMessage('Profile updated successfully!');
      setUserInfo(response.data); // Update state with new data
      if (response.data.profileImage) {
        setImagePreview(`http://localhost:5001/${response.data.profileImage}`);
      }
    })
    .catch(error => {
      console.error('Error updating profile:', error);
      setUpdateMessage('Failed to update profile. Please try again.');
    });
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-center">User Profile</h2>
      
      {imagePreview && (
        <div className="flex justify-center mb-6">
          <img src={imagePreview} alt="Profile" className="w-24 h-24 rounded-full object-cover shadow-md" />
        </div>
      )}

      <form onSubmit={handleUpdateProfile}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Full Name</label>
          <input 
            type="text" 
            name="fullName" 
            value={userInfo.fullName} 
            onChange={handleChange} 
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input 
            type="email" 
            name="email" 
            value={userInfo.email} 
            onChange={handleChange} 
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Phone</label>
          <input 
            type="tel" 
            name="phone" 
            value={userInfo.phone} 
            onChange={handleChange} 
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Address</label>
          <textarea 
            name="address" 
            value={userInfo.address} 
            onChange={handleChange} 
            className="w-full p-2 border border-gray-300 rounded-lg"
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Profile Image</label>
          <input 
            type="file" 
            onChange={handleFileChange} 
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <button 
          type="submit" 
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Update Profile
        </button>
      </form>

      {updateMessage && <p className="mt-4 text-center text-red-500">{updateMessage}</p>}

      <button 
        onClick={handleLogout} 
        className="mt-4 w-full bg-red-600 text-white py-2 rounded-lg"
      >
        Logout
      </button>
    </div>
  );
}

export default UserProfile;
