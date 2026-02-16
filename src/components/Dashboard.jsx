import React, { useState, useEffect } from 'react';
import UserProfile from './UserProfile';
import QRCodeGenerator from './QRCodeGenerator';
import './Dashboard.css';
import Login from './Login';
import Wallet from './Wallet';
const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [userName, setUserName] = useState("User");
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    const storedName = localStorage.getItem("userName");
  if (storedName) {
    setUserName(storedName);
  } 
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const canteens = [
    { name: 'Royal Canteen', location: 'Near Main Gate', status: 'Open Now', icon: '🍲' },
    { name: 'Food Court A', location: 'Near Auditorium', status: 'Open Now', icon: '🍕' },
    { name: 'Quick Bites', location: 'Near Sports Complex', status: 'Closed', icon: '🍔' },
    { name: 'South Feast', location: 'Near Lake Side', status: 'Open Now', icon: '🍚' },
  ];

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <div className="section-content">
            <Login />
          </div>
        );
        case 'wallet':
        return (
          <div className="section-content">
            <Wallet />
          </div>
        );
      case 'qr':
        return (
          <div className="section-content">
            <QRCodeGenerator />
          </div>
        );
      case 'dashboard':
      default:
        return (
          <div className="section-content">
            <div className="dashboard-overview">
              <div className="welcome-banner">
                <h2>Welcome back, {userName}! 👋</h2>
                <p>Everything is ready for your Surabhi Fest 2026 experience. You have 3 upcoming events today.</p>
                <div className="quick-actions">
                  <button className="action-btn btn-primary" onClick={() => setActiveSection('qr')}>
                    <span>✨</span> Generate Ticket QR
                  </button>
                  <button className="action-btn btn-secondary" onClick={() => setActiveSection('profile')}>
                    <span>👤</span> Edit Profile
                  </button>
                   {/* <button className="action-btn btn-secondary" onClick={() => setActiveSection('wallet')}>
                    <span>👤</span> Wallet
                  </button> */}
                </div>
              </div>

              <div className="canteen-section">
                <h3 className="section-title">Campus Canteens</h3>
                <div className="stats-grid">
                  {canteens.map((canteen, index) => (
                    <div key={index} className="stat-card">
                      <div className="stat-icon">
                        {canteen.icon}
                      </div>
                      <div className="stat-info">
                        <h4>{canteen.name}</h4>
                        <p className="canteen-location">{canteen.location}</p>
                        <span className={`canteen-status ${canteen.status === 'Open Now' ? 'status-open' : 'status-closed'}`}>
                          {canteen.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-brand">
          <h1>Surabhi Fest 2026</h1>
          <p>Official Event Dashboard</p>
        </div>
        <div className="header-user">
          {!isOnline && (
            <div className="offline-badge">
              <span>📡</span> Offline Mode
            </div>
          )}
          <div className="user-badge" onClick={() => setActiveSection('profile')}>
            <span className="avatar-small">👤</span>
            <span className="user-name">{userName}</span>
            
          </div>
        </div>
      </header>

      <div className="dashboard-layout">
        <aside className="sidebar-nav">
          <div className="nav-card">
            <ul className="nav-menu">
              <li>
                <button
                  className={activeSection === 'dashboard' ? 'nav-link active' : 'nav-link'}
                  onClick={() => setActiveSection('dashboard')}
                >
                  <span className="nav-icon">🏠</span>
                  <span className="nav-text">Home</span>
                </button>
              </li>
              <li>
                <button
                  className={activeSection === 'profile' ? 'nav-link active' : 'nav-link'}
                  onClick={() => setActiveSection('profile')}
                >
                  <span className="nav-icon">👤</span>
                  <span className="nav-text">Profile Settings</span>
                </button>
              </li>
              <li>
                <button
                  className={activeSection === 'qr' ? 'nav-link active' : 'nav-link'}
                  onClick={() => setActiveSection('qr')}
                >
                  <span className="nav-icon">📱</span>
                  <span className="nav-text">QR Tools</span>
                </button>
                <button
                  className={activeSection === 'wallet' ? 'nav-link active' : 'nav-link'}
                  onClick={() => setActiveSection('wallet')}
                >
                  <span className="nav-icon">💰</span>
                  <span className="nav-text">Wallet</span>
                </button>
              </li>
            </ul>
          </div>
        </aside>

        <main className="dashboard-main">
          {renderActiveSection()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;