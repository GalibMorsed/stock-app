const express = require("express");
const router = express.Router();
const {
  saveTableData,
  getTableData,
} = require("../Controllers/tableController");
const { tableValidation } = require("../Middlewares/tableValidation");
const { deleteTableData } = require("../Controllers/deleteController");
const { editTableData } = require("../Controllers/editController");
const { deleteRow } = require("../Controllers/deleteController");
const { getStockAnalysis } = require("../Controllers/analysisController");

router.post("/storeTable", tableValidation, saveTableData);
router.get("/fetchTable", getTableData);
router.delete("/deleteTable", deleteTableData);
router.put("/editTable", editTableData);
router.delete("/deleteRow", deleteRow);
router.get("/stockAnalysis", getStockAnalysis);
module.exports = router;
