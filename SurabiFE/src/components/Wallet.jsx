import React, { useState, useEffect } from "react";
import axios from "axios";


function Wallet() {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState("");

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

    try {
      // 1. Load Cashfree SDK
      const scriptLoaded = await loadCashfreeScript();
      if (!scriptLoaded) {
        alert("Cashfree SDK failed to load");
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
      }, 5000);
    } catch (err) {
      console.error(err);
      alert("Payment failed");
    }
  };

  return (
    <div className="wallet-container">
      <div className="wallet-box">
        <h2>My Wallet</h2>

        <div className="balance">₹ {balance}</div>

        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button onClick={handleAddMoney}>
          Add Money
        </button>
      </div>
    </div>
  );
}

export default Wallet;