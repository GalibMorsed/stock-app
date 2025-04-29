const Product = require("../Models/product");

const archiveProduct = async (req, res) => {
  const { name, stock } = req.body;

  if (!name || !stock) {
    return res
      .status(400)
      .json({ message: "Missing name or stock in request body." });
  }

  try {
    const updated = await Product.findOneAndUpdate(
      { name, stock },
      { isArchived: true },
      { new: true }
    );

    if (!updated) {
      return res
        .status(404)
        .json({ message: "Product not found for given user and stock." });
    }

    res.json({ message: "Product archived successfully", product: updated });
  } catch (err) {
    res.status(500).json({ message: "Error archiving product", error: err });
  }
};

const getArchivedProducts = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res
      .status(400)
      .json({ message: "Username is required in request body." });
  }

  try {
    const archived = await Product.find({
      name,
      isArchived: true,
    });

    res.json(archived);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching archived products", error: err });
  }
};

const unarchiveProduct = async (req, res) => {
  const { name, stock } = req.body;

  if (!name || !stock) {
    return res
      .status(400)
      .json({ message: "Missing name or stock in request body." });
  }

  try {
    const updated = await Product.findOneAndUpdate(
      { name, stock },
      { isArchived: false },
      { new: true }
    );

    if (!updated) {
      return res
        .status(404)
        .json({ message: "Product not found or already unarchived." });
    }

    res.json({ message: "Product unarchived successfully", product: updated });
  } catch (err) {
    res.status(500).json({ message: "Error unarchiving product", error: err });
  }
};

module.exports = {
  archiveProduct,
  getArchivedProducts,
  unarchiveProduct,
};
