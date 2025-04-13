import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState("");
  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
    // Redirect to login page
  };
  return (
    <>
      <div className="navbar">
        <div className="user-info">
          <div className="img" title="Profile"></div>
          <p className="name">Welcome, {loggedInUser}</p>
        </div>
        <div className="logout-btn">
          <button onClick={handleLogout} className="btn logout-btn">
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
