import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "./sidebar";

export default function MainPage() {
  const [isSidebarOpen, setIsSidebarVisible] = useState(false);
  const [isStockFormVisible, setStockFormVisible] = useState(false);
  const [stocks, setStocks] = useState([]);
  const [stockName, setStockName] = useState("");

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarOpen);
  };

  const toggleStockForm = () => {
    setStockFormVisible(true);
  };

  const createStock = () => {
    if (stockName.trim() !== "") {
      const newStock = { name: stockName };
      setStocks([...stocks, newStock]);
      setStockName("");
      setStockFormVisible(false);
    }
  };

  return (
    <div className="home-section">
      {/* Sidebar and Message */}
      <div className="sidebar-message">
        <div className="sidebar-btn" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={isSidebarOpen ? faTimes : faBars} />
        </div>
        <Sidebar isOpen={isSidebarOpen} close={toggleSidebar} stocks={stocks} />
        <div className="message">Hey, Check Your Stock Report</div>
      </div>

      {/* Button Layout */}
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

      {/* Inventory Summary */}
      <div className="inventory-info">
        <p>Inventory Summary</p>
        <p>Total Stocks Created - {stocks.length}</p>
        <p>Total Sale - 43</p>
      </div>

      {/* Stock Creation Form */}
      {isStockFormVisible && (
        <div className="stock-form">
          <h2>Create a New Stock</h2>
          <input
            type="text"
            placeholder="Enter stock name"
            value={stockName}
            onChange={(e) => setStockName(e.target.value)}
          />
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
      )}
    </div>
  );
}
