import React, { useEffect, useState } from "react";

export default function ProfileScreen() {
  const [userEmail, setUserEmail] = useState("");
  const [loggedInUser, setLoggedInUser] = useState("");

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
    const email = localStorage.getItem("userEmail");
    if (email) {
      setUserEmail(email);
    }
  }, []);

  return (
    <div className="profile-screen">
      <div className="left-side">
        <h2>Edit Info</h2>
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
            <button className="edit-btn btn">Edit</button>
          </div>
        </div>

        <h2>Explore Archive</h2>
        <div className="archive">
          <p>Go through your favourite stocks</p>
          <button className="explore-btn btn">Explore</button>
        </div>
      </div>

      <div className="right-side">
        <h2>Created Stock's Status</h2>
        <div className="stock-status">
          <div className="calendar">
            {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
              <div key={day} className="day-header">
                {day}
              </div>
            ))}
            {Array.from({ length: 30 }, (_, i) => (
              <div
                key={i}
                className={`day ${[2, 3, 5].includes(i + 1) ? "active" : ""}`}
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
