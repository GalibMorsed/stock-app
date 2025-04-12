const TableData = require("../Models/Table");

const editTableData = async (req, res) => {
  const { name, stockName, data } = req.body;

  try {
    const updatedTable = await TableData.findOneAndUpdate(
      { name, stock: stockName },
      { data },
      { new: true }
    );

    if (!updatedTable) {
      return res.status(404).json({ message: "Table not found for update" });
    }

    res.json({ message: "Table updated successfully", updatedTable });
  } catch (error) {
    res.status(500).json({ message: "Failed to update table", error });
  }
};

const updateTable = async (req, res) => {
  const { name, stockName, data } = req.body;

  if (!name || !stockName || !data || !Array.isArray(data)) {
    return res.status(400).json({ message: "Missing fields or invalid data" });
  }

  try {
    const updated = await TableData.findOneAndUpdate(
      { name, stock: stockName },
      { data },
      { new: true, upsert: false }
    );

    if (!updated) {
      return res.status(404).json({ message: "Table not found" });
    }

    res.status(200).json({ message: "Table updated successfully", updated });
  } catch (error) {
    console.error("Error updating table:", error);
    res.status(500).json({ message: "Error updating table", error });
  }
};

module.exports = {
  editTableData,
  updateTable,
};
