import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';

const UserProfile = () => {
  const [user, setUser] = useState({
    name: 'Surabhi User',
    email: 'user@example.com',
    avatar: null,
    joinedDate: new Date().toLocaleDateString(),
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({});
  const navigate = useNavigate();

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
        name: 'Surabhi User',
        email: 'surabhi.user@example.com',
        avatar: null,
        joinedDate: '2025-12-01',
      };
      
      setUser(mockUserData);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const handleEdit = () => {
    setEditedUser(user);
    setIsEditing(true);
  };

  const handleSave = () => {
    setUser(editedUser);
    setIsEditing(false);
    // In a real app, you would send the updated data to the backend here
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedUser({});
  };

  const handleChange = (e) => {
    setEditedUser({
      ...editedUser,
      [e.target.name]: e.target.value
    });
  };

  const goToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="profile-page">
      {/* Navbar */}
      <nav className="profile-navbar">
        <div className="nav-container">
          <div className="logo">
            <span className="logo-icon">👤</span>
            <span>User Profile</span>
          </div>
          <button className="dashboard-btn" onClick={goToDashboard}>
            <span className="btn-icon">←</span>
            <span>Back to Dashboard</span>
          </button>
        </div>
      </nav>

      {/* Profile Content */}
      <div className="user-profile-container">
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar-section">
              <div className="profile-avatar">
                {user.avatar ? (
                  <img src={user.avatar} alt="User Avatar" className="avatar-img" />
                ) : (
                  <div className="avatar-placeholder">👤</div>
                )}
              </div>
              <button className="avatar-edit-btn" title="Change avatar">
                <span>📷</span>
              </button>
            </div>
            
            {!isEditing ? (
              <div className="profile-info">
                <h2>{user.name}</h2>
                <p className="email">{user.email}</p>
                <div className="profile-meta">
                  <span className="joined-badge">
                    <span className="badge-icon">📅</span>
                    Member since: {new Date(user.joinedDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
                <button className="edit-profile-btn" onClick={handleEdit}>
                  <span>✏️</span>
                  Edit Profile
                </button>
              </div>
            ) : (
              <div className="profile-edit-form">
                <h3>Edit Profile</h3>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={editedUser.name || ''}
                    onChange={handleChange}
                    placeholder="Enter your name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={editedUser.email || ''}
                    onChange={handleChange}
                    placeholder="Enter your email"
                  />
                </div>
                <div className="form-actions">
                  <button className="save-btn" onClick={handleSave}>
                    Save Changes
                  </button>
                  <button className="cancel-btn" onClick={handleCancel}>
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="profile-stats">
            <div className="stat-item">
              <span className="stat-value">0</span>
              <span className="stat-label">Events Attended</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">₹{Math.floor(Math.random() * 5000)}</span>
              <span className="stat-label">Wallet Balance</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">3</span>
              <span className="stat-label">Upcoming Events</span>
            </div>
          </div>

          <div className="profile-details">
            <h3>Account Information</h3>
            <div className="details-grid">
              <div className="detail-item">
                <span className="detail-label">Account Status</span>
                <span className="detail-value active-status">Active</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Email Verified</span>
                <span className="detail-value verified-status">✓ Verified</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Member ID</span>
                <span className="detail-value">FEST2026-{Math.floor(Math.random() * 10000)}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Last Login</span>
                <span className="detail-value">{new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <div className="profile-actions">
            <button className="action-btn password-btn">
              <span>🔒</span>
              Change Password
            </button>
            <button className="action-btn notifications-btn">
              <span>🔔</span>
              Notification Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;