import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Archives() {
  const [archivedStocks, setArchivedStocks] = useState([]);
  const name = localStorage.getItem("loggedInUser");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArchived = async () => {
      try {
        const res = await fetch("http://localhost:6060/product/getarchive", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name }),
        });
        const data = await res.json();
        if (Array.isArray(data)) {
          setArchivedStocks(data);
        } else {
          console.error("Unexpected response format:", data);
          setArchivedStocks([]);
        }
      } catch (err) {
        console.error("Failed to fetch archived stocks:", err);
        setArchivedStocks([]);
      }
    };

    fetchArchived();
  }, [name]);

  const handleUnarchive = async (stockName) => {
    try {
      const res = await fetch("http://localhost:6060/product/unarchive", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, stock: stockName }),
      });

      const result = await res.json();

      if (res.ok) {
        alert("Stock unarchived successfully.");
        setArchivedStocks((prev) => prev.filter((s) => s.stock !== stockName));
      } else {
        alert(result.message || "Unarchive failed.");
      }
    } catch (err) {
      console.error("Error during unarchive:", err.message);
    }
  };

  const handleStockClick = (stockName) => {
    navigate(`/stockPage/${stockName}`);
  };

  return (
    <div className="archive-page">
      <h2>Archived Stocks</h2>
      {archivedStocks.length === 0 ? (
        <p className="no-data">No archived stocks found.</p>
      ) : (
        <div className="archive-grid">
          {archivedStocks.map((stock, idx) => (
            <div className="archive-card" key={idx}>
              <p>
                <strong>User:</strong> {stock.name}
              </p>
              <h3
                className="stock-name"
                onClick={() => handleStockClick(stock.stock)}
                style={{ cursor: "pointer", color: "blue" }}
              >
                <strong>Stock Name:</strong> {stock.stock}
              </h3>

              <p>
                <strong>Created At:</strong>{" "}
                {new Date(stock.date).toLocaleDateString()}
              </p>
              <button
                className="btn unarchive"
                onClick={() => handleUnarchive(stock.stock)}
              >
                Unarchive
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
