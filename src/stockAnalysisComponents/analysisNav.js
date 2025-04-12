import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AnalysisNav() {
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState("");

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser") || "User");
  }, []);

  return (
    <div className="analysis-nav">
      <div className="left-section" onClick={() => navigate("/")}>
        <div className="home-img"></div>
        <p className="home-text">Home</p>
      </div>
      <div className="right-section">
        <div className="user-img"></div>
        <p className="user-text">Hi, {loggedInUser}</p>
      </div>
    </div>
  );
}
