import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ProfileNav() {
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    const name = localStorage.getItem("loggedInUser");
    if (!name) {
      alert("No user found in localStorage");
      return;
    }
    const confirmation = window.confirm(
      "Are you sure you want to delete your account? This action is irreversible, and all your data will be permanently removed from this platform."
    );

    if (!confirmation) {
      return;
    }

    try {
      await axios.delete("http://localhost:6060/auth/deleteAccount", {
        data: { name: name },
      });
      localStorage.removeItem("loggedInUser");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("token");
      navigate("/signin");
    } catch (error) {
      console.error("Error deleting account:", error);
      alert(
        error.response?.data?.message ||
          "Failed to delete account. Please try again later."
      );
    }
  };

  return (
    <div className="profile-nav">
      <div className="left-sec" onClick={() => navigate("/")}>
        <div className="home-img" title="Home"></div>
        <p className="home-text">Home</p>
      </div>
      <div className="delete-btn">
        <button className="btn delete-btn" onClick={handleDeleteAccount}>
          Delete Account
        </button>
      </div>
    </div>
  );
}
