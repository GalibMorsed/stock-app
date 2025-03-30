const CreatedStocks = require("../Models/product");

const storeData = async (req, res) => {
  try {
    const { name, stock, date } = req.body;

    if (!name) {
      return res.status(401).json({ message: "Unauthorized: User ID missing" });
    }
    if (!stock) {
      return res.status(400).json({ message: "Data field is required" });
    }
    if (!date) {
      return res.status(400).json({ message: "Data field is required" });
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
    const { name } = req.body;
    if (!name) {
      return res.status(401).json({ message: "Unauthorized: User ID missing" });
    }

    const userData = await CreatedStocks.find({ name });
    res.json(userData);
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
