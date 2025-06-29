import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "./sidebar";
import { useNavigate } from "react-router-dom";

export default function MainPage() {
  const [isSidebarOpen, setIsSidebarVisible] = useState(false);
  const [isStockFormVisible, setStockFormVisible] = useState(false);
  const [totalStocks, setTotalStocks] = useState(0);
  const [stocks, setStocks] = useState([]);
  const [stockName, setStockName] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [name, setLoggedInUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    setLoggedInUser(user || "");
  }, []);

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.classList.add("sidebar-open");
    } else {
      document.body.classList.remove("sidebar-open");
    }
  }, [isSidebarOpen]);

  useEffect(() => {
    if (isStockFormVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isStockFormVisible]);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarOpen);
  };

  const toggleStockForm = () => {
    setStockFormVisible(true);
  };

  const createStock = async () => {
    if (stockName.trim() === "") {
      alert("Stock name cannot be empty.");
      return;
    }

    if (!name) {
      alert("User not found! Please log in.");
      return;
    }

    const newStock = { name, stock: stockName, date: selectedDate };

    try {
      const url = "https://stock-nest-kpfy.onrender.com/product/storeData";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newStock),
      });

      const result = await response.json();
      if (response.ok) {
        setStocks([...stocks, result.stock]);
        setTotalStocks(totalStocks + 1);
        alert("Stock created successfully!");
        window.location.reload();
      } else {
        console.error("Server error:", result);
        alert(result.error || "Failed to create stock");
      }
    } catch (error) {
      console.error("Error creating stock:", error);
      alert("Error creating stock");
    }

    setStockName("");
    setSelectedDate("");
    setStockFormVisible(false);
  };

  return (
    <div className="home-section">
      <div className="sidebar-message">
        <div className="sidebar-btn" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={isSidebarOpen ? faTimes : faBars} />
        </div>
        <Sidebar
          isOpen={isSidebarOpen}
          close={toggleSidebar}
          updateTotalStocks={setTotalStocks}
        />
        <div
          className={`sidebar-overlay ${isSidebarOpen ? "show" : ""}`}
          onClick={toggleSidebar}
        ></div>
        <div className="message">Hey, {name} Check Your Stock Report</div>
      </div>

      <div className="button-container">
        <div className="stock-btns">
          <button className="btn" onClick={toggleStockForm}>
            Create Stock
          </button>
          <button
            className="btn"
            onClick={() => navigate("/stockAnalysisPage")}
          >
            Stock Analysis
          </button>
        </div>
        <div className="border"></div>
        <div className="sales-btns">
          <button className="btn">Sales Update</button>
          <button className="btn">Sales Analysis</button>
        </div>
      </div>

      <div className="inventory-info">
        <p>Inventory Summary</p>
        <p>Total Stocks Created - {totalStocks}</p>
        <p>Total Sale - 0</p>
      </div>

      {isStockFormVisible && (
        <>
          <div
            className="stock-form-overlay show"
            onClick={() => setStockFormVisible(false)}
          ></div>
          <div className="stock-form">
            <h2>Create a New Stock</h2>
            <label>Stock Name</label>
            <input
              type="text"
              placeholder="Enter stock name"
              value={stockName}
              onChange={(e) => setStockName(e.target.value)}
            />
            <label>Date</label>
            <input
              type="date"
              id="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
            <div className="create-btn">
              <button className="btn" onClick={createStock}>
                Create
              </button>
              <button
                className="btn cancel"
                onClick={() => setStockFormVisible(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
