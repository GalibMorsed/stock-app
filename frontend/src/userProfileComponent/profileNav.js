import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ProfileNav() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleDeleteAccount = async () => {
    const name = localStorage.getItem("loggedInUser");
    if (!name) {
      alert("No user found in localStorage");
      return;
    }

    setShowModal(true);
  };

  const confirmDelete = async () => {
    const name = localStorage.getItem("loggedInUser");
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
    } finally {
      setShowModal(false);
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

      {showModal && (
        <div className="profile-modal-overlay">
          <div className="profile-modal">
            <h2>Warning</h2>
            <p>
              Are you sure you want to delete your account? This action is
              irreversible, and all your data will be permanently removed from
              this platform.
            </p>
            <div className="profile-modal-actions">
              <button className="btn confirm-btn" onClick={confirmDelete}>
                Confirm
              </button>
              <button
                className="btn cancel-btn"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
