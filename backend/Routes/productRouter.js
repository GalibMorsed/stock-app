const { storeData, userData } = require("../Controllers/productController");
const { productValidation } = require("../Middlewares/productValidation");
const { Router } = require("express");

const router = Router();

// Debugging: Log the imported values to ensure they are functions
console.log(typeof storeData, typeof userData, typeof productValidation); // Should log 'function'

router.post("/storeData", productValidation, storeData);
router.get("/userData", userData);

module.exports = router;
