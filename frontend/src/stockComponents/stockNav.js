import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function StockNav({ onCreateTable }) {
  const { stockName } = useParams();
  const [createdDate, setCreatedDate] = useState("");
  const [hasTable, setHasTable] = useState(false);

  useEffect(() => {
    const fetchStockData = async () => {
      const name = localStorage.getItem("loggedInUser");
      if (!name || !stockName) {
        console.warn("Missing loggedInUser or stockName");
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:6060/product/userData?name=${name}`
        );

        if (!response.ok) throw new Error("Failed to fetch stock data");

        const data = await response.json();
        const matchedStock = data.find((item) => item.stock === stockName);

        if (matchedStock) {
          if (matchedStock.date || matchedStock.createdAt) {
            const date = matchedStock.date || matchedStock.createdAt;
            setCreatedDate(new Date(date).toLocaleDateString());
          } else {
            setCreatedDate("Invalid Date");
          }

          setHasTable(matchedStock.hasTable); // Use hasTable from backend response
        } else {
          setCreatedDate("Stock not found");
          setHasTable(false);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setCreatedDate("Error loading date");
        setHasTable(false); // fallback safe value
      }
    };

    fetchStockData();
  }, [stockName]);

  return (
    <div className="stock-nav">
      <div className="stock-info">
        <Link to="/home">
          <div className="home-img" title="Home"></div>
        </Link>
        <p className="date">
          {createdDate ? `CreatedAt: ${createdDate}` : "Loading..."}
        </p>
      </div>
      <div className="table-btn">
        {!hasTable && (
          <button className="btn" onClick={onCreateTable}>
            Create Table
          </button>
        )}
      </div>
    </div>
  );
}
