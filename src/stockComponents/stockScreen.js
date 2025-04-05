import React from "react";

export default function StockScreen() {
  const stocks = [
    { id: 1, name: "Apple", price: 175, quantity: 50 },
    { id: 2, name: "Microsoft", price: 320, quantity: 30 },
    { id: 3, name: "Tesla", price: 680, quantity: 20 },
    { id: 4, name: "Apple", price: 175, quantity: 50 },
    { id: 5, name: "Microsoft", price: 320, quantity: 30 },
    { id: 6, name: "Tesla", price: 680, quantity: 20 },
    { id: 7, name: "Apple", price: 175, quantity: 50 },
    { id: 8, name: "Microsoft", price: 320, quantity: 30 },
    { id: 9, name: "Tesla", price: 680, quantity: 20 },
    { id: 10, name: "Apple", price: 175, quantity: 50 },
    { id: 11, name: "Microsoft", price: 320, quantity: 30 },
    { id: 12, name: "Tesla", price: 680, quantity: 20 },
    { id: 13, name: "Apple", price: 175, quantity: 50 },
    { id: 14, name: "Microsoft", price: 320, quantity: 30 },
    { id: 15, name: "Tesla", price: 680, quantity: 20 },
  ];

  return (
    <div className="stock-page">
      <div className="stock-buttons">
        <button className="btn edit">Edit</button>
        <button className="btn add">Add</button>
        <button className="btn filter">Filter</button>
        <button className="btn sort">Sort</button>
        <button className="btn search">Search</button>
        <button className="btn archive">Archive</button>
        <button className="btn delete">Delete</button>
      </div>

      <div className="stock-table">
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>ID</th>
                <th>Name</th>
                <th>Price ($)</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((stock) => (
                <tr key={stock.id}>
                  <td>▶️</td>
                  <td>{stock.id}</td>
                  <td>{stock.name}</td>
                  <td>{stock.price}</td>
                  <td>{stock.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="bottom-btns">
        <button className="btn refresh">Refresh</button>
        <button className="btn share">Share</button>
      </div>
    </div>
  );
}
