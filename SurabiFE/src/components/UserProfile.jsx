import React, { useState, useEffect } from 'react';
import './UserProfile.css';

const UserProfile = () => {
  const [user, setUser] = useState({
    name: 'Surabhi User',
    email: 'user@example.com',
    avatar: null,
    joinedDate: new Date().toLocaleDateString(),
  });

  useEffect(() => {
    // In a real app, this would fetch from backend
    // Simulating API call
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    // Simulated API call to backend
    try {
      // This would be: const response = await fetch('/api/user/profile');
      // const userData = await response.json();
      
      // For now, using mock data
      const mockUserData = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        avatar: 'https://via.placeholder.com/150',
        joinedDate: '2025-12-01',
      };
      
      setUser(mockUserData);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  return (
    <div className="user-profile-container">
      <div className="profile-header">
        <div className="profile-avatar">
          {user.avatar ? (
            <img src={user.avatar} alt="User Avatar" className="avatar-img" />
          ) : (
            <div className="avatar-placeholder">👤</div>
          )}
        </div>
        <div className="profile-info">
          <h2>{user.name}</h2>
          <p className="email">{user.email}</p>
          <p className="joined-date">Member since: {user.joinedDate}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;