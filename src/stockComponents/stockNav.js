import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function StockNav() {
  const { stockName } = useParams();
  const [createdDate, setCreatedDate] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [rows, setRows] = useState(0);
  const [cols, setCols] = useState(0);
  const [showTable, setShowTable] = useState(false);
  const [tableData, setTableData] = useState([]);

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

  const handleGenerateTable = () => {
    const data = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => "")
    );
    setTableData(data);
    setShowTable(true);
  };

  const handleInputChange = (row, col, value) => {
    const updated = [...tableData];
    updated[row][col] = value;
    setTableData(updated);
  };

  const handleSaveTable = () => {
    console.log("Saved Table Data:", tableData);
    // TODO: Save to backend or further processing
    alert("Table created and stored!");
  };

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
        <button
          className="btn"
          onClick={() => setShowDropdown((prev) => !prev)}
        >
          Create Table
        </button>

        {showDropdown && (
          <div className="dropdown-section">
            <input
              type="number"
              placeholder="Columns"
              value={cols}
              min="1"
              onChange={(e) => setCols(+e.target.value)}
            />
            <input
              type="number"
              placeholder="Rows"
              value={rows}
              min="1"
              onChange={(e) => setRows(+e.target.value)}
            />
            <button className="btn small" onClick={handleGenerateTable}>
              Enter Data
            </button>
          </div>
        )}

        {showTable && (
          <div className="table-editor">
            <table>
              <tbody>
                {tableData.map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => (
                      <td key={j}>
                        <input
                          type="text"
                          value={cell}
                          onChange={(e) =>
                            handleInputChange(i, j, e.target.value)
                          }
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="btn success" onClick={handleSaveTable}>
              Create Table
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
