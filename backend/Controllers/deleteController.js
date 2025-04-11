const TableModel = require("../Models/Table");
const productModel = require("../Models/product");

const deleteTableData = async (req, res) => {
  const { name, stockName } = req.query;

  try {
    const tableDeleted = await TableModel.findOneAndDelete({
      name,
      stock: stockName,
    });
    const stockDeleted = await productModel.findOneAndDelete({
      name,
      stock: stockName,
    });

    if (!tableDeleted && !stockDeleted) {
      return res
        .status(404)
        .json({ message: "No table or stock found to delete" });
    }

    res.json({
      message: "Table and stock deleted successfully!",
      deletedTable: tableDeleted ? true : false,
      deletedStock: stockDeleted ? true : false,
    });
  } catch (error) {
    res.status(500).json({ message: "Error deleting records", error });
  }
};

const deleteRow = async (req, res) => {
  const { name, stockName } = req.query;
  const { row } = req.body;

  try {
    const table = await TableModel.findOne({ name, stock: stockName });

    if (!table) {
      return res.status(404).json({ message: "Table not found" });
    }

    table.data = table.data.filter(
      (tableRow) => JSON.stringify(tableRow) !== JSON.stringify(row)
    );
    await table.save();

    res.json({ message: "Row deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting row", error });
  }
};

module.exports = {
  deleteTableData,
  deleteRow,
};
