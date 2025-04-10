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

module.exports = {
  deleteTableData,
};
