const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stocksCreated = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
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

module.exports = mongoose.model("CreatedStocks", stocksCreated);
