import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "./sidebar";

export default function MainPage() {
  const [isSidebarOpen, setIsSidebarVisible] = useState(false);
  const [isStockFormVisible, setStockFormVisible] = useState(false);
  const [stocks, setStocks] = useState([]);
  const [stockName, setStockName] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarOpen);
  };

  const toggleStockForm = () => {
    setStockFormVisible(true);
  };

  const createStock = () => {
    if (stockName.trim() !== "" && selectedDate.trim() !== "") {
      const newStock = { name: stockName, date: selectedDate };
      setStocks((prevStocks) => [...prevStocks, newStock]);
      setStockName("");
      setSelectedDate("");
      setStockFormVisible(false);
    }
  };

  return (
    <div className="home-section">
      <div className="sidebar-message">
        <div className="sidebar-btn" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={isSidebarOpen ? faTimes : faBars} />
        </div>
        <Sidebar
          stocks={stocks || []}
          isOpen={isSidebarOpen}
          close={toggleSidebar}
        />
        <div className="message">Hey, Check Your Stock Report</div>
      </div>

      <div className="button-container">
        <div className="stock-btns">
          <button className="btn" onClick={toggleStockForm}>
            Create Stock
          </button>
          <button className="btn">Stock Analysis</button>
        </div>
        <div className="border"></div>
        <div className="sales-btns">
          <button className="btn">Sales Update</button>
          <button className="btn">Sales Analysis</button>
        </div>
      </div>

      <div className="inventory-info">
        <p>Inventory Summary</p>
        <p>Total Stocks Created - {stocks.length}</p>
        <p>Total Sale - 43</p>
      </div>

      {isStockFormVisible && (
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
      )}
    </div>
  );
}
