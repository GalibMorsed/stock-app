import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "./sidebar";

export default function MainPgae() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="home-section">
      <div className="sidebar-btn" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={isSidebarVisible ? faTimes : faBars} />
      </div>
      {isSidebarVisible && <Sidebar close={toggleSidebar} />}
      <div className="message">hey bitch do your work</div>
    </div>
  );
}
