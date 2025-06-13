import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Sidebar({ isOpen, close, updateTotalStocks }) {
  const [userData, setUserData] = useState([]);
  const [activeStock, setActiveStock] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const name = localStorage.getItem("loggedInUser");

      if (!name) {
        console.log("No logged-in user found in localStorage.");
        return;
      }

      try {
        const url = `http://localhost:6060/product/userData?name=${name}`;
        const response = await fetch(url, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setUserData(data);
        updateTotalStocks(data.length); // Send stock count to MainPage
      } catch (error) {
        console.error("Error fetching data:", error.message);
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
            userData.map((item) => (
              <li
                key={item._id}
                className={activeStock === item._id ? "active" : ""}
                onClick={() => setActiveStock(item._id)} // Set active stock
              >
                <Link
                  to={`/stockPage/${encodeURIComponent(item.stock)}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <strong>{item.stock}</strong>
                </Link>
              </li>
            ))
          ) : (
            <li>No stocks created yet</li>
          )}
        </ul>
      </div>
    </div>
  );
}
