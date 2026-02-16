import React from 'react';
import './Landing.css';
import { FaWallet, FaShieldAlt, FaBolt, FaChartLine, FaGooglePlay, FaApple } from 'react-icons/fa';
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="landing">
      {/* Navbar - Fixed */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">
            <FaWallet className="logo-icon" />
            <span>CashFlow</span>
          </div>
          
          <div className="nav-links">
            <a href="#features">Features</a>
            <a href="#security">Security</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </div>
          
         <Link to="/login" className="register-btn">
  Login
</Link>
          
          <div className="mobile-menu-btn">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>

      {/* Rest of your code remains exactly the same */}
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Your Digital Wallet for
            <span className="highlight"> Modern Money</span>
          </h1>
          <p className="hero-subtitle">
            Store, send, and receive money instantly with the most secure digital wallet. 
            Join millions of users who trust CashFlow for their daily transactions.
          </p>
          <div className="cta-buttons">
            <button className="cta-primary">
              <FaGooglePlay className="cta-icon" />
              Google Play
            </button>
            <button className="cta-secondary">
              <FaApple className="cta-icon" />
              App Store
            </button>
          </div>
          <div className="stats">
            <div className="stat-item">
              <h3>10M+</h3>
              <p>Active Users</p>
            </div>
            <div className="stat-item">
              <h3>$2B+</h3>
              <p>Transactions</p>
            </div>
            <div className="stat-item">
              <h3>150+</h3>
              <p>Countries</p>
            </div>
          </div>
        </div>
        <div className="hero-image">
          <div className="phone-mockup">
            <div className="mockup-screen">
              <div className="mockup-balance">$1,234.56</div>
              <div className="mockup-transactions">
                <div className="mockup-transaction"></div>
                <div className="mockup-transaction"></div>
                <div className="mockup-transaction"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <h2 className="section-title">Why Choose CashFlow?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <FaBolt className="feature-icon" />
            <h3>Instant Transfers</h3>
            <p>Send and receive money instantly to any bank account or wallet</p>
          </div>
          <div className="feature-card">
            <FaShieldAlt className="feature-icon" />
            <h3>Bank-Grade Security</h3>
            <p>Your money is protected with advanced encryption and security</p>
          </div>
          <div className="feature-card">
            <FaChartLine className="feature-icon" />
            <h3>Smart Analytics</h3>
            <p>Track your spending with intelligent insights and reports</p>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="security">
        <div className="security-content">
          <h2 className="section-title">Your Security is Our Priority</h2>
          <p className="security-text">
            With biometric authentication, real-time fraud detection, and end-to-end encryption, 
            your money is always safe with us.
          </p>
          <div className="security-features">
            <div className="security-item">
              <span className="checkmark">✓</span>
              <span>Biometric Login</span>
            </div>
            <div className="security-item">
              <span className="checkmark">✓</span>
              <span>Two-Factor Authentication</span>
            </div>
            <div className="security-item">
              <span className="checkmark">✓</span>
              <span>Real-time Fraud Monitoring</span>
            </div>
            <div className="security-item">
              <span className="checkmark">✓</span>
              <span>FDIC Insured up to $250,000</span>
            </div>
          </div>
        </div>
        <div className="security-image">
          <div className="security-shield">
            <FaShieldAlt className="shield-icon" />
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section className="download">
        <h2 className="section-title">Get Started Today</h2>
        <p className="download-text">
          Download the CashFlow app and start managing your money smarter.
        </p>
        <div className="download-buttons">
          <button className="download-btn">
            <FaGooglePlay className="download-icon" />
            <div className="btn-text">
              <span className="small">Get it on</span>
              <span className="large">Google Play</span>
            </div>
          </button>
          <button className="download-btn">
            <FaApple className="download-icon" />
            <div className="btn-text">
              <span className="small">Download on</span>
              <span className="large">App Store</span>
            </div>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <FaWallet />
              <span>CashFlow</span>
            </div>
            <p>© 2024 CashFlow. All rights reserved.</p>
          </div>
          <div className="footer-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#contact">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Landing;