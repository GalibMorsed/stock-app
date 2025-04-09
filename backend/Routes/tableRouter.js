const express = require("express");
const router = express.Router();
const {
  saveTableData,
  getTableData,
} = require("../Controllers/tableController");
const { tableValidation } = require("../Middlewares/tableValidation");

router.post("/storeTable", tableValidation, saveTableData);
router.get("/fetchTable", getTableData); // optional: add validation for params

module.exports = router;
