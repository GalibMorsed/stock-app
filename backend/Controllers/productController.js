const CreatedStocks = require("../Models/product");
const Table = require("../Models/Table"); // Import the Table model

const storeData = async (req, res) => {
  try {
    const { name, stock, date } = req.body;

    if (!name || !stock || !date) {
      return res.status(401).json({ message: "Unauthorized: User ID missing" });
    }

    const newEntry = new CreatedStocks({
      name,
      stock,
      date,
    });

    await newEntry.save();
    res.status(201).json({ message: "Data stored successfully", newEntry });
  } catch (error) {
    console.error("Error in storeData:", error);
    res.status(500).json({
      message: "Server error",
      success: false,
      error: error.message,
    });
  }
};

const userData = async (req, res) => {
  try {
    const name = req.query.name; // Fetching from URL parameter
    if (!name) {
      return res.status(400).json({ message: "User name is required" });
    }

    const stocks = await CreatedStocks.find({ name });
    if (!stocks.length) {
      return res.status(404).json({ message: "No data found for this user" });
    }

    // Check if each stock has a table
    const stocksWithTableInfo = await Promise.all(
      stocks.map(async (stock) => {
        const tableExists = await Table.exists({ stock: stock.stock });
        return { ...stock.toObject(), hasTable: !!tableExists };
      })
    );

    res.status(200).json(stocksWithTableInfo);
  } catch (error) {
    console.error("Error in userData:", error);
    res.status(500).json({
      message: "Server error",
      success: false,
      error: error.message,
    });
  }
};
module.exports = {
  storeData,
  userData,
};
