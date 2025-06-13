import React, { useEffect, useState } from "react";
import Calendar from "./calender";
import { useNavigate } from "react-router-dom";

export default function ProfileScreen() {
  const [userEmail, setUserEmail] = useState("");
  const [loggedInUser, setLoggedInUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
    const email = localStorage.getItem("userEmail");
    if (email) {
      setUserEmail(email);
    }
  }, []);

  const handleExploreClick = () => {
    navigate("/Archive");
  };

  return (
    <div className="profile-screen">
      <div className="left-side">
        <h2>Personalize Your Profile</h2>
        <div className="edit-info">
          <div className="edit-container">
            <div className="avatar-wrapper">
              <div className="avatar"></div>
              <button className="edit-avatar-btn">✏️</button>
            </div>
            <div className="user-info">
              <p>
                <strong>Name:</strong> {loggedInUser}
              </p>
              <p>
                <strong>Email Id:</strong> {userEmail || "Not Available"}
              </p>
            </div>
            <button className="edit-btn btn">Edit Profile</button>
          </div>
        </div>

        <h2>Discover Your Archive</h2>
        <div className="archive">
          <p>Browse and manage your favorite stocks effortlessly.</p>
          <button className="explore-btn btn" onClick={handleExploreClick}>
            Explore Archive
          </button>
        </div>
      </div>

      <div className="right-side">
        <h2>Track Your Stock Performance</h2>
        <div className="stock-status">
          <Calendar />
        </div>
      </div>
    </div>
  );
}
