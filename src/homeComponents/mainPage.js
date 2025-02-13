import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function MainPgae() {
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
    <div>
      <p>Welcome, {loggedInUser}</p>
      <button onClick={handleLogout} className="btn logout-btn">
        Logout
      </button>
    </div>
  );
}
