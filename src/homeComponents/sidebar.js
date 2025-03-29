import React, { useEffect, useState } from "react";

export default function Sidebar({ isOpen, close }) {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const userId = localStorage.getItem("LoggedInUser");
      if (!userId) return;

      try {
        const response = await fetch("http://localhost:6060/product/userData", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        });

        const data = await response.json();
        if (response.ok) {
          setUserData(data);
        } else {
          console.error("Error fetching data:", data.message);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={`sidebar-nav ${isOpen ? "show" : "hide"}`}>
      <h1 className="web-name">StockNest</h1>
      <div className="sidebar-info">
        <ul className="note-list">
          <h2>Created Stocks</h2>
          {userData.length > 0 ? (
            userData.map((item) => <li key={item._id}>{item.data}</li>)
          ) : (
            <li>No stocks created yet</li>
          )}
        </ul>
      </div>
    </div>
  );
}
