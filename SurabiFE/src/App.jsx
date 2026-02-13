import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Login from "./components/Login";
import Wallet from "./components/Wallet";  
import Dashboard from "./components/Dashboard";
function App() {
  return (
    <GoogleOAuthProvider clientId="59340652230-dki15dtqr2kmq388mikgce7d7do1fpnu.apps.googleusercontent.com">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/wallet" element={<Wallet />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;