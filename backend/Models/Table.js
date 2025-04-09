const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tableDataSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  stock: {
    type: String,
    required: true,
  },
  data: [
    {
      type: mongoose.Schema.Types.Mixed,
    },
  ],
});

const TableModel = mongoose.model("TableData", tableDataSchema);
module.exports = TableModel;
