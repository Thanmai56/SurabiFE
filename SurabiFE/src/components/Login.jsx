import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const login = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse) => {
      try {
        console.log("Google auth code:", codeResponse.code);

        const response = await axios.post(
          "http://188.245.112.188:5000/api/user/auth/login-oauth",
          {
            code: codeResponse.code,
          }
        );

        console.log("Backend response:", response.data);

        // Store JWT token
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
        }

        alert("Login successful");

        // Redirect to dashboard
        navigate("/dashboard");

      } catch (error) {
        console.error("Backend login error:", error);
        alert("Backend login failed");
      }
    },
    onError: () => {
      console.log("Google login failed");
      alert("Google login failed");
    },
  });

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome</h2>
        <p>Sign in with Google</p>

        <button className="google-btn" onClick={() => login()}>
          Continue with Google
        </button>
      </div>
    </div>
  );
}

export default Login;
