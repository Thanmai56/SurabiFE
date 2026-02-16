import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import './Wallet.css';

function Wallet() {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const BASE_URL = "http://localhost:5000"; // change if needed

  // Fetch wallet balance
  const fetchBalance = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/api/fest/user/syncWallet`
      );
      setBalance(res.data.balance || 0);
    } catch (err) {
      console.error("Balance fetch failed", err);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  // Load Cashfree script
  const loadCashfreeScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleAddMoney = async () => {
    if (!amount || amount <= 0) {
      alert("Enter valid amount");
      return;
    }

    setLoading(true);

    try {
      // 1. Load Cashfree SDK
      const scriptLoaded = await loadCashfreeScript();
      if (!scriptLoaded) {
        alert("Cashfree SDK failed to load");
        setLoading(false);
        return;
      }

      // 2. Create order from backend
      const orderRes = await axios.post(
        `${BASE_URL}/api/fest/user/rechargeWallet/createOrder`,
        { amount: Number(amount) }
      );

      const paymentSessionId =
        orderRes.data.raw.payment_session_id;

      // 3. Initialize Cashfree
      const cashfree = new window.Cashfree({
        mode: "sandbox", // change to "production" in live
      });

      // 4. Open payment popup
      cashfree.checkout({
        paymentSessionId: paymentSessionId,
        redirectTarget: "_modal",
      });

      // 5. After payment, sync wallet
      setTimeout(async () => {
        await axios.post(
          `${BASE_URL}/api/fest/user/syncWallet`
        );

        await axios.post(
          `${BASE_URL}/api/fest/user/syncTransactions`
        );

        fetchBalance();
        alert("Wallet updated successfully");
        setAmount("");
        setLoading(false);
      }, 5000);
    } catch (err) {
      console.error(err);
      alert("Payment failed");
      setLoading(false);
    }
  };

  const goToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="wallet-page">
      {/* Navbar */}
      <nav className="wallet-navbar">
        <div className="nav-container">
          <div className="logo">
            <span className="logo-icon">💰</span>
            <span>CashFlow Wallet</span>
          </div>
          <button className="dashboard-btn" onClick={goToDashboard}>
            <span className="btn-icon">←</span>
            <span>Back to Dashboard</span>
          </button>
        </div>
      </nav>

      {/* Wallet Content */}
      <div className="wallet-container">
        <div className="wallet-box">
          <h2>My Wallet</h2>
          
          <div className="balance-icon">💰</div>
          <div className="balance">₹ {balance.toLocaleString()}</div>
          
          <div className="input-group">
            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="1"
            />
          </div>

          <button 
            onClick={handleAddMoney} 
            disabled={loading}
            className={loading ? 'loading' : ''}
          >
            {loading ? 'Processing...' : 'Add Money'}
          </button>

          <div className="wallet-note">
            <span>💡</span>
            <p>Minimum recharge amount is ₹1</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Wallet;