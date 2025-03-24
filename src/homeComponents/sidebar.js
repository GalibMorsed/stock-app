import React, { useEffect } from "react";

export default function Sidebar({ isOpen, close, stocks = [] }) {
  useEffect(() => {
    console.log("Sidebar updated with stocks:", stocks); // ✅ Debugging log
  }, [stocks]); // ✅ Ensure re-render when stocks update

  return (
    <div className={`sidebar-nav ${isOpen ? "show" : ""}`}>
      <h1 className="web-name">StockNest</h1>
      <div className="sidebar-info">
        <ul className="note-list">
          <h3>Created Stocks</h3>
          {stocks.length > 0 ? (
            stocks.map((stock, index) => <li key={index}>{stock.name}</li>)
          ) : (
            <li>No stocks created yet</li>
          )}
        </ul>
      </div>
    </div>
  );
}
