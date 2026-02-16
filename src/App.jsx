import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Login from "./components/Login";
import Wallet from "./components/Wallet";  
import Dashboard from "./components/Dashboard";
import Landing from "./components/Landing"; 
import UserProfile from "./components/UserProfile";
function App() {
  return (
    <GoogleOAuthProvider clientId="59340652230-dki15dtqr2kmq388mikgce7d7do1fpnu.apps.googleusercontent.com">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;