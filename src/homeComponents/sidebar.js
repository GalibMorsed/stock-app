import React from "react";

export default function Sidebar({ isOpen, close }) {
  return (
    <>
      <div className={`sidebar-nav ${isOpen ? "show" : "hide"}`}>
        <h1 className="web-name">StockNest</h1>
        <div className="sidebar-info">
          <ul className="note-list">
            <h2>Created Stocks</h2>
            <li>StockFlow Manager</li>
            <li>InvTrack Pro</li>
            <li>SmartStock Hub</li>
            <li>VaultSync Inventory</li>
            <li>StockEase System</li>
            <li>SwiftInventory Tracker</li>
            <li>StashTrack Solutions</li>
            <li>PrimeStock Control</li>
            <li>SupplySync Pro</li>
            <li>WareTrack Manager</li>
          </ul>
        </div>
      </div>
    </>
  );
}
