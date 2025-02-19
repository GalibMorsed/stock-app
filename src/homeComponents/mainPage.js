import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "./sidebar";

export default function MainPage() {
  const [isSidebarOpen, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarOpen);
  };

  return (
    <div className="home-section">
      {/* Sidebar and Message */}
      <div className="sidebar-message">
        <div className="sidebar-btn" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={isSidebarOpen ? faTimes : faBars} />
        </div>
        <Sidebar isOpen={isSidebarOpen} close={toggleSidebar} />
        <div className="message">Hey, Check Your Stock Report</div>
      </div>

      {/* Button Layout */}
      <div className="button-container">
        <div className="stock-btns">
          <button className="btn">Create Stock</button>
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
        <p>Total Stocks Created - 3</p>
        <p>Total Sale - 43</p>
      </div>
    </div>
  );
}
