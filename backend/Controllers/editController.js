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

module.exports = {
  editTableData,
};
