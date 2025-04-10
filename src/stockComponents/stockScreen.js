import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function StockScreen() {
  const [tableData, setTableData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [noTable, setNoTable] = useState(false);

  const { stockName } = useParams();
  const name = localStorage.getItem("loggedInUser");

  useEffect(() => {
    const fetchTable = async () => {
      try {
        const res = await fetch(
          `http://localhost:6060/table/fetchTable?name=${name}&stockName=${stockName}`
        );
        const data = await res.json();

        if (!data || data.length === 0) {
          setNoTable(true);
          return;
        }

        setTableData(data);
        setColumns(Object.keys(data[0]));
      } catch (err) {
        console.error("Error fetching table:", err);
        setNoTable(true);
      }
    };

    fetchTable();
  }, [name, stockName]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this table?"
    );
    if (!confirmDelete) return;

    const userName = localStorage.getItem("loggedInUser");

    try {
      const res = await fetch(
        `http://localhost:6060/table/deleteTable?name=${userName}&stockName=${stockName}`,
        {
          method: "DELETE",
        }
      );

      const result = await res.json();

      if (res.ok) {
        alert(result.message);
        window.location.href = "/";
      } else {
        alert(result.message || "Failed to delete.");
      }
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Something went wrong during deletion.");
    }
  };

  return (
    <div className="stock-page">
      <div className="stock-buttons">
        <button className="btn edit">Edit</button>
        <button className="btn add">Add</button>
        <button className="btn filter">Filter</button>
        <button className="btn sort">Sort</button>
        <button className="btn search">Search</button>
        <button className="btn archive">Archive</button>
        <button className="btn delete" onClick={handleDelete}>
          Delete
        </button>
      </div>

      <div className="stock-table">
        <div className="table-wrapper">
          {noTable ? (
            <p className="no-table-msg">No table created yet for this stock.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th></th>
                  {columns.map((col, index) => (
                    <th key={index}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index}>
                    <td>▶️</td>
                    {columns.map((col, cIndex) => (
                      <td key={cIndex}>{row[col]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <div className="bottom-btns">
        <button className="btn refresh">Refresh</button>
        <button className="btn share">Share</button>
      </div>
    </div>
  );
}
