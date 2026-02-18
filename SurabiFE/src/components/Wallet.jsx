import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Wallet.css";

function Wallet() {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const navigate = useNavigate();

  const BASE_URL = "http://188.245.112.188:5000";

  // Get token from localStorage
  const token = localStorage.getItem("token");

  const authHeaders = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  // Fetch wallet balance
  const fetchBalance = useCallback(async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/api/fest/user/syncWallet`,
        {},
        authHeaders
      );
      setBalance(res.data.balance || 0);
    } catch (err) {
      console.error("Balance fetch failed", err);
    }
  }, []);

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  // Sync transactions and update balance
  const syncAfterPayment = async () => {
    try {
      // First sync wallet to get latest balance
      await axios.post(
        `${BASE_URL}/api/fest/user/syncWallet`,
        {},
        authHeaders
      );
      
      // Then sync transactions
      const txRes = await axios.post(
        `${BASE_URL}/api/fest/user/syncTransactions`,
        {},
        authHeaders
      );
      
      console.log("Transactions synced:", txRes.data);
      
      // Fetch updated balance
      await fetchBalance();
      
      return true;
    } catch (err) {
      console.error("Sync failed:", err);
      return false;
    }
  };

  // Load Cashfree script
  const loadCashfreeScript = () => {
    return new Promise((resolve) => {
      // Check if script already exists
      if (window.Cashfree) {
        resolve(true);
        return;
      }
      
      const script = document.createElement("script");
      script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
      script.async = true;
      script.onload = () => {
        console.log("Cashfree SDK loaded");
        resolve(true);
      };
      script.onerror = () => {
        console.error("Failed to load Cashfree SDK");
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  // Clean up Cashfree script
  const cleanupCashfreeScript = () => {
    const scripts = document.querySelectorAll('script[src="https://sdk.cashfree.com/js/v3/cashfree.js"]');
    scripts.forEach(script => script.remove());
    delete window.Cashfree;
  };

  const handleAddMoney = async () => {
    if (!amount || amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    setLoading(true);

    try {
      // Load Cashfree SDK
      const scriptLoaded = await loadCashfreeScript();
      if (!scriptLoaded) {
        throw new Error("Failed to load payment SDK");
      }

      // Create order
      const orderRes = await axios.post(
        `${BASE_URL}/api/fest/user/rechargeWallet/createOrder`,
        { 
          amount: Number(amount),
          provider: "cashfree" // Add if needed by your backend
        },
        authHeaders
      );

      console.log("Order response:", orderRes.data);

      // Extract payment_session_id from the response
      // Based on your API response, it's inside orderRes.data.raw
      const paymentSessionId = orderRes.data?.raw?.payment_session_id;
      const cfOrderId = orderRes.data?.raw?.cf_order_id;
      const orderId = orderRes.data?.raw?.order_id;

      if (!paymentSessionId) {
        throw new Error("Payment session ID not received");
      }

      // Store order details for tracking
      setOrderId(orderId);
      
      console.log("Payment Session ID:", paymentSessionId);

      // Initialize Cashfree
      const cashfree = new window.Cashfree({
        mode: "sandbox", // Change to "production" for live
      });

      // Set up payment callback
      const paymentCallback = async (paymentResult) => {
        console.log("Payment callback:", paymentResult);
        
        if (paymentResult && paymentResult.paymentStatus === "SUCCESS") {
          // Sync wallet and transactions
          const syncSuccess = await syncAfterPayment();
          
          if (syncSuccess) {
            alert("Payment successful! Wallet updated.");
            setAmount("");
          } else {
            alert("Payment successful but sync failed. Please refresh.");
          }
        } else {
          alert("Payment was not successful. Please try again.");
        }
        
        setLoading(false);
        cleanupCashfreeScript();
      };

      // Open checkout
      cashfree.checkout({
        paymentSessionId: paymentSessionId,
        redirectTarget: "_modal", // Use "_self" if you want redirect instead of modal
        callback: paymentCallback, // Some versions support callback
      });

      // Fallback: Poll for payment status (if callback not supported)
      // You can implement a webhook on your backend for better reliability
      const pollInterval = setInterval(async () => {
        try {
          // Check payment status via your backend
          const statusRes = await axios.get(
            `${BASE_URL}/api/fest/user/order/status/${orderId}`,
            authHeaders
          );
          
          if (statusRes.data.status === "SUCCESS") {
            clearInterval(pollInterval);
            await syncAfterPayment();
            alert("Payment successful! Wallet updated.");
            setAmount("");
            setLoading(false);
            cleanupCashfreeScript();
          }
        } catch (err) {
          // Ignore polling errors
        }
      }, 3000);

      // Stop polling after 2 minutes
      setTimeout(() => {
        clearInterval(pollInterval);
      }, 120000);

    } catch (err) {
      console.error("Payment error:", err);
      
      if (err.response) {
        // Backend error response
        alert(`Payment failed: ${err.response.data.message || "Server error"}`);
      } else if (err.request) {
        // Network error
        alert("Network error. Please check your connection.");
      } else {
        // Other errors
        alert(`Payment failed: ${err.message}`);
      }
      
      setLoading(false);
      cleanupCashfreeScript();
    }
  };

  const goToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="wallet-page">
      <nav className="wallet-navbar">
        <div className="nav-container">
          <div className="logo">
            <span className="logo-icon">💰</span>
            <span>CashFlow Wallet</span>
          </div>
          <button className="dashboard-btn" onClick={goToDashboard}>
            ← Back to Dashboard
          </button>
        </div>
      </nav>

      <div className="wallet-container">
        <div className="wallet-box">
          <h2>My Wallet</h2>

          <div className="balance">₹ {balance.toFixed(2)}</div>

          <input
            type="number"
            min="1"
            step="1"
            placeholder="Enter amount (₹)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            disabled={loading}
          />

          <button 
            onClick={handleAddMoney} 
            disabled={loading || !amount}
            className={loading ? "loading-btn" : ""}
          >
            {loading ? "Processing Payment..." : "Add Money"}
          </button>
          
          {orderId && (
            <p className="order-info">Order ID: {orderId}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Wallet;