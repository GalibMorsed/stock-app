import React, { useState } from "react";

export default function AnalysisScreen() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [analysisData, setAnalysisData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noData, setNoData] = useState(false);

  const name = localStorage.getItem("loggedInUser");

  const handleGenerate = async () => {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates.");
      return;
    }

    setLoading(true);
    setNoData(false);

    try {
      const res = await fetch(
        `http://localhost:6060/table/stockAnalysis?name=${name}&startDate=${startDate}&endDate=${endDate}`
      );
      const data = await res.json();

      console.log("Fetched Data:", data);
      if (!data || data.length === 0) {
        setNoData(true);
        setAnalysisData([]);
      } else {
        setAnalysisData(data);
      }
    } catch (error) {
      console.error("Error fetching analysis:", error);
      alert("Failed to generate analysis");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="analysis-screen">
      <h3 className="instruction">
        Please Select the Dates for which the statement is to be generated.
      </h3>

      <div className="input-section">
        <p>Start Date:</p>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <p>End Date:</p>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      <button className="btn generate-btn" onClick={handleGenerate}>
        {loading ? "Generating..." : "Generate Analysis"}
      </button>

      {noData && <p className="no-data">No data found for selected dates.</p>}

      {analysisData.length > 0 && (
        <div className="analysis-table">
          <h4>Analysis Results</h4>
          <table>
            <thead>
              <tr>
                <th>Stock Name</th>
                <th>Created Date</th>
                <th>Has Table</th>
              </tr>
            </thead>
            <tbody>
              {analysisData.map((stock, i) => (
                <tr key={i}>
                  <td>{stock.stockName || "N/A"}</td>
                  <td>{stock.createdDate || "N/A"}</td>
                  <td>{stock.hasTable ? "Yes" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
