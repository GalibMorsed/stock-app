const express = require("express");
const router = express.Router();
const {
  saveTableData,
  getTableData,
} = require("../Controllers/tableController");
const { tableValidation } = require("../Middlewares/tableValidation");
const { deleteTableData } = require("../Controllers/deleteController");

router.post("/storeTable", tableValidation, saveTableData);
router.get("/fetchTable", getTableData);
router.delete("/deleteTable", deleteTableData);
module.exports = router;
