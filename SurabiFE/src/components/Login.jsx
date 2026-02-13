import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import "./Login.css";

function Login() {
  const login = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse) => {
      try {
        console.log("Google auth code:", codeResponse.code);

        // Send code to your backend endpoint
        const response = await axios.post(
          "http://localhost:5000/api/user/auth/login-oauth", // change if needed
          {
            code: codeResponse.code,
          }
        );

        console.log("Backend response:", response.data);

        alert("Login successful");

        // Example: store token if backend returns one
        // localStorage.setItem("token", response.data.token);

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