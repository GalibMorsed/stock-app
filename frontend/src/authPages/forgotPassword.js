import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "newPassword") setNewPassword(value);
    if (name === "confirmPassword") setConfirmPassword(value);
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (!email || !newPassword || !confirmPassword) {
      return handleError("All fields are required");
    }

    if (newPassword !== confirmPassword) {
      return handleError("Passwords do not match");
    }

    try {
      const url = "https://stock-nest-kpfy.onrender.com/auth/update-password";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, newPassword }),
      });

      const result = await response.json();
      const { success, message, error } = result;

      if (success) {
        handleSuccess(message);
        setTimeout(() => navigate("/login"), 1000);
      } else {
        handleError(error?.details?.[0]?.message || message);
      }

      console.log(result);
    } catch (err) {
      handleError(err.message);
    }
  };

  return (
    <div className="wholeConatiner">
      <h1 className="logo">StockNest</h1>
      <div className="auth-container">
        <h1>Forgot Password</h1>
        <form onSubmit={handleForgotPassword}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              onChange={handleChange}
              type="email"
              name="email"
              placeholder="Enter your email..."
              value={email}
            />
          </div>
          <div>
            <label htmlFor="newPassword">New Password</label>
            <input
              onChange={handleChange}
              type="password"
              name="newPassword"
              placeholder="Enter your new password..."
              value={newPassword}
            />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <input
              onChange={handleChange}
              type="password"
              name="confirmPassword"
              placeholder="Confirm your new password..."
              value={confirmPassword}
            />
          </div>
          <button className="auth-btn" type="submit">
            Submit
          </button>
          <span>
            <Link to="/login">Back to Login</Link>
          </span>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default ForgotPassword;
