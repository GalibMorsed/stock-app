import React from "react";

export default function Sidebar({ isOpen, close, stocks = [] }) {
  return (
    <div className={`sidebar-nav ${isOpen ? "show" : "hide"}`}>
      <h1 className="web-name">StockNest</h1>
      <div className="sidebar-info">
        <ul className="note-list">
          <h2>Created Stocks</h2>
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
