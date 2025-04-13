const Product = require("../Models/product");
const TableData = require("../Models/Table"); // Import the Table model

const getStockAnalysis = async (req, res) => {
  const { name, startDate, endDate } = req.query;

  if (!name || !startDate || !endDate) {
    return res.status(400).json({ message: "Missing required parameters." });
  }

  try {
    const stocks = await Product.find({ name });

    if (!stocks || stocks.length === 0) {
      return res.status(404).json({ message: "No stocks found for the user." });
    }

    const filteredStocks = stocks.filter((stock) => {
      const stockDate = new Date(stock.date);
      return stockDate >= new Date(startDate) && stockDate <= new Date(endDate);
    });

    const stockDetails = await Promise.all(
      filteredStocks.map(async (stock) => {
        const table = await TableData.findOne({ name, stock: stock.stock });

        const hasTable = !!table;
        const rowCount = hasTable ? table.data.length : 0;
        const colCount =
          hasTable && table.data.length > 0
            ? Object.keys(table.data[0]).length
            : 0;

        return {
          stockName: stock.stock,
          createdDate: stock.date,
          hasTable,
          rowCount,
          colCount,
        };
      })
    );

    res.status(200).json(stockDetails);
  } catch (error) {
    console.error("Error in stock analysis:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getStockAnalysis,
};
