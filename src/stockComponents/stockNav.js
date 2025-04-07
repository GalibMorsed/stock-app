import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function StockNav({ onCreateTable }) {
  const { stockName } = useParams();
  const [createdDate, setCreatedDate] = useState("");

  useEffect(() => {
    const fetchStockDate = async () => {
      const name = localStorage.getItem("loggedInUser");
      if (!name || !stockName) return;

      try {
        const response = await fetch(
          `http://localhost:6060/product/userData?name=${name}`
        );

        if (!response.ok) throw new Error("Failed to fetch stock data");

        const data = await response.json();
        const matchedStock = data.find((item) => item.stock === stockName);

        if (matchedStock?.date) {
          const formattedDate = new Date(
            matchedStock.date
          ).toLocaleDateString();
          setCreatedDate(formattedDate);
        } else if (matchedStock?.createdAt) {
          const formattedDate = new Date(
            matchedStock.createdAt
          ).toLocaleDateString();
          setCreatedDate(formattedDate);
        } else {
          setCreatedDate("Invalid Date");
        }
      } catch (error) {
        setCreatedDate("Error loading date");
      }
    };

    fetchStockDate();
  }, [stockName]);

  return (
    <div className="stock-nav">
      <div className="stock-info">
        <Link to="/home">
          <div className="home-img"></div>
        </Link>
        <p className="date">
          {createdDate ? `CreatedAt: ${createdDate}` : "Loading..."}
        </p>
      </div>
      <div className="table-btn">
        <button className="btn" onClick={onCreateTable}>
          Create Table
        </button>
      </div>
    </div>
  );
}
