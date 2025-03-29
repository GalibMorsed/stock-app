const CreatedStocks = require("../Models/product");

const storeData = async (req, res) => {
  try {
    const { userId, data } = req.body; // Extract userId from request body

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: User ID missing" });
    }
    if (!data) {
      return res.status(400).json({ message: "Data field is required" });
    }

    const newEntry = new CreatedStocks({
      userId,
      data,
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
    const { userId } = req.body; // Extract userId from request body

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: User ID missing" });
    }

    const userData = await CreatedStocks.find({ userId });
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
