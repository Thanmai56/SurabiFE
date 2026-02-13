import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { v4 as uuidv4 } from "uuid";
import './QRCodeGenerator.css';

const QRCodeGenerator = () => {
  const [amount, setAmount] = useState("");
  const [qrData, setQrData] = useState(null);

  const generateQR = () => {
    const token = localStorage.getItem("token") || "demo-token";

    const now = new Date();
    const payload = {
      token: token,
      amount: Number(amount),
      id: uuidv4(),
      createdAt: now.toLocaleString('en-IN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      }).replace(',', '')
    };

    setQrData(JSON.stringify(payload));
  };

  return (
    <div className="qr-generator-container">
      <h3>Wallet Payment</h3>

      <div className="input-section">
        <input
          className="qr-input"
          type="number"
          placeholder="Enter amount for wallet payment"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <div className="button-group">
          <button
            className="generate-btn"
            onClick={generateQR}
            disabled={!amount}
          >
            Create Payment QR
          </button>

          {qrData && (
            <button
              className="clear-btn"
              onClick={() => {
                setQrData(null);
                setAmount("");
              }}
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {qrData && (
        <div className="qr-display" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h4>Scan to Pay</h4>
          <div className="qr-code-placeholder" style={{ display: 'flex', justifyContent: 'center', background: 'white', padding: '20px', borderRadius: '16px' }}>
            <QRCodeCanvas
              value={qrData}
              size={240}
              level="H"
              includeMargin={true}
            />
          </div>
          <p className="qr-text-preview" style={{ marginTop: '1rem', color: '#64748b' }}>
            Amount: <span style={{ color: '#1e293b', fontWeight: 800 }}>₹{amount}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;