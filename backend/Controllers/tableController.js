const TableData = require("../Models/Table");

const saveTableData = async (req, res) => {
  try {
    const { name, stock, data } = req.body; // Ensure `stock` is destructured

    if (!name || !stock || !data || !Array.isArray(data)) {
      return res
        .status(400)
        .json({ message: "Missing required fields or data format is invalid" });
    }

    const newTable = new TableData({ name, stock, data });

    await newTable.save();
    res
      .status(201)
      .json({ message: "Table data saved successfully!", newTable });
  } catch (error) {
    console.error("Error in storeData:", error);
    res.status(500).json({
      message: "Failed to save table data",
      success: false,
      error: error.message,
    });
  }
};
const getTableData = async (req, res) => {
  const { name, stockName } = req.query;

  try {
    const table = await TableData.findOne({ name, stock: stockName });
    if (!table) {
      return res.status(404).json({ message: "Table not found" });
    }

    res.json(table.data);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve data", error });
  }
};

module.exports = {
  saveTableData,
  getTableData,
};
