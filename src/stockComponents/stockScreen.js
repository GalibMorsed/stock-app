import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function StockScreen() {
  const [tableData, setTableData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState([]);
  const [noTable, setNoTable] = useState(false);

  const { stockName } = useParams();
  const name = localStorage.getItem("loggedInUser");

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Stock Table",
          text: `Check out this stock table: ${stockName}`,
          url: `${window.location.origin}/table/${stockName}`,
        })
        .catch((err) => console.error("Error sharing:", err));
    } else {
      alert("Sharing is not supported on this browser.");
    }
  };

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
        setEditedData(data);
        setColumns(Object.keys(data[0]));
      } catch (err) {
        console.error("Error fetching table:", err);
        setNoTable(true);
      }
    };

    fetchTable();
  }, [name, stockName]);

  const handleEditToggle = () => {
    setEditMode((prev) => !prev);
  };

  const handleChange = (rowIdx, col, value) => {
    const updated = [...editedData];
    updated[rowIdx][col] = value;
    setEditedData(updated);
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(
        `http://localhost:6060/table/editTable?name=${name}&stockName=${stockName}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            stockName,
            data: editedData,
          }),
        }
      );

      const result = await res.json();
      if (res.ok) {
        alert("Table updated successfully");
        setTableData(editedData);
        setEditMode(false);
      } else {
        alert(result.message || "Update failed");
      }
    } catch (err) {
      console.error("Error saving table:", err);
      alert("Something went wrong");
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this table?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `http://localhost:6060/table/deleteTable?name=${name}&stockName=${stockName}`,
        { method: "DELETE" }
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

  const handleDeleteRow = async (rowIdx) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this row?"
    );
    if (!confirmDelete) return;

    const updatedData = editedData.filter((_, index) => index !== rowIdx);
    try {
      const res = await fetch(
        `http://localhost:6060/table/deleteRow?name=${name}&stockName=${stockName}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ row: editedData[rowIdx] }),
        }
      );

      if (res.ok) {
        alert("Row deleted successfully");
        setEditedData(updatedData);
      } else {
        const result = await res.json();
        alert(result.message || "Failed to delete row.");
      }
    } catch (err) {
      console.error("Error deleting row:", err);
      alert("Something went wrong while deleting the row.");
    }
  };

  const handleAddRow = () => {
    const newRow = {};
    columns.forEach((col) => {
      newRow[col] = "";
    });
    setEditedData([...editedData, newRow]);
  };

  const handleAddColumn = () => {
    const newColName = prompt("Enter new column name:");
    if (!newColName) return;

    if (columns.includes(newColName)) {
      alert("Column already exists.");
      return;
    }

    const updatedColumns = [...columns, newColName];
    const updatedData = editedData.map((row) => ({
      ...row,
      [newColName]: "",
    }));

    setColumns(updatedColumns);
    setEditedData(updatedData);
  };

  return (
    <div className="stock-page">
      <div className="stock-buttons">
        <button className="btn edit" onClick={handleEditToggle}>
          {editMode ? "Cancel" : "Edit"}
        </button>
        {editMode && (
          <>
            <button className="btn add" onClick={handleAddRow}>
              Add Row
            </button>
            <button className="btn add" onClick={handleAddColumn}>
              Add Column
            </button>
          </>
        )}
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
                  {columns.map((col, colIndex) => (
                    <th key={colIndex}>{tableData[0][col]}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(editMode
                  ? editedData
                  : tableData.slice(editMode ? 0 : 1)
                ).map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    <td>
                      {!editMode && "▶️"}
                      {editMode && (
                        <button onClick={() => handleDeleteRow(rowIndex)}>
                          ❌
                        </button>
                      )}
                    </td>
                    {columns.map((col, colIndex) => (
                      <td key={colIndex}>
                        {editMode ? (
                          <input
                            value={editedData[rowIndex][col]}
                            onChange={(e) =>
                              handleChange(rowIndex, col, e.target.value)
                            }
                          />
                        ) : (
                          row[col]
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {editMode && (
          <button className="btn update" onClick={handleUpdate}>
            Save Changes
          </button>
        )}
      </div>

      <div className="bottom-btns">
        <button className="btn refresh" onClick={handleRefresh}>
          Refresh
        </button>
        <button className="btn share" onClick={handleShare}>
          Share
        </button>
      </div>
    </div>
  );
}
