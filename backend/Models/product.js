const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stocksCreated = new Schema({
  name: {
    type: mongoose.Schema.Types.String,
    ref: "User",
    required: true,
  },
  stock: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const productModel = mongoose.model("CreatedStocks", stocksCreated);
module.exports = productModel;
