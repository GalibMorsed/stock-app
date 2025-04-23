import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProfileNav() {
  const navigate = useNavigate();

  return (
    <div className="profile-nav">
      <div className="left-sec" onClick={() => navigate("/")}>
        <div className="home-img" title="Home"></div>
        <p className="home-text">Home</p>
      </div>
      <div className="delete-btn">
        <button className="btn delete-btn">Delete Account</button>
      </div>
    </div>
  );
}
