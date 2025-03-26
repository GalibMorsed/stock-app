const CreatedStocks = require("../Models/product");

const storeData = async (req, res) => {
  try {
    const { data } = req.body;

    const newEntry = new CreatedStocks({
      userId: req.user.id, // Extracted from token
      data,
    });

    await newEntry.save();
    res.status(201).json({ message: "Data stored successfully", newEntry });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const getUserData = async (req, res) => {
  try {
    const userData = await CreatedStocks.find({ userId: req.user.id });
    res.json(userData);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {
  storeData,
  getUserData,
};
