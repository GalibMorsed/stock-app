import React, { useState } from "react";
import { useParams } from "react-router-dom";

const CreateTable = ({ onFinish }) => {
  const [showInputs, setShowInputs] = useState(false);
  const [rows, setRows] = useState(0);
  const [cols, setCols] = useState(0);
  const [tableData, setTableData] = useState([]);

  const name = localStorage.getItem("loggedInUser");
  const { stockName } = useParams();

  const handleCreate = () => {
    setShowInputs(true);
  };

  const handleGenerateFields = () => {
    const newData = Array.from({ length: rows }, () => Array(cols).fill(""));
    setTableData(newData);
  };

  const handleChange = (r, c, value) => {
    const updatedData = [...tableData];
    updatedData[r][c] = value;
    setTableData(updatedData);
  };

  const handleFinish = async () => {
    if (!name || !stockName) {
      alert("Missing user or stock name");
      return;
    }

    const formattedData = tableData.map((row) => {
      const rowObj = {};
      row.forEach((cell, index) => {
        rowObj[`Col${index + 1}`] = cell;
      });
      return rowObj;
    });

    const newTable = {
      name,
      stock: stockName,
      data: formattedData,
    };

    try {
      const url = "http://localhost:6060/table/storeTable";
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTable),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Table created successfully!");
        setTimeout(() => {
          onFinish();
        }, 1000);
      } else {
        alert("Error saving table: " + result.message);
      }
    } catch (error) {
      console.error("Save failed", error);
      alert("Failed to save table");
    }
  };

  return (
    <div className="creating-table">
      <button className="create-btn" onClick={handleCreate}>
        Start Creating
      </button>

      {showInputs && (
        <div className="input-section">
          <h2>Create your table</h2>
          <div className="input-group">
            <label>No. of Columns:</label>
            <input
              type="number"
              min="1"
              onChange={(e) => setCols(+e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>No. of Rows:</label>
            <input
              type="number"
              min="1"
              onChange={(e) => setRows(+e.target.value)}
            />
          </div>
          <button className="enter-btn" onClick={handleGenerateFields}>
            Enter Data
          </button>
        </div>
      )}

      {tableData.length > 0 && (
        <div className="table-inputs">
          <table>
            <thead>
              <tr>
                {Array.from({ length: cols }).map((_, i) => (
                  <th key={i}>Col {i + 1}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, r) => (
                <tr key={r}>
                  {row.map((cell, c) => (
                    <td key={c}>
                      <input
                        type="text"
                        value={cell}
                        onChange={(e) => handleChange(r, c, e.target.value)}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <button className="final-create-btn" onClick={handleFinish}>
            Finish Creating
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateTable;
