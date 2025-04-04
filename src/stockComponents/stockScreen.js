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
        <button className="btn delete">Delete</button>
      </div>

      <div className="stock-table">
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price ($)</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((stock) => (
                <tr key={stock.id}>
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
    </div>
  );
}
