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
      <div className="sidebar-message">
        <div className="sidebar-btn" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={isSidebarOpen ? faTimes : faBars} />
        </div>
        <Sidebar isOpen={isSidebarOpen} close={toggleSidebar} />

        <div className="message">Hey, Check Your Created Stocks</div>
      </div>
    </div>
  );
}
