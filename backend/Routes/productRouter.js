const { storeData, userData } = require("../Controllers/productController");
const { productValidation } = require("../Middlewares/productValidation");
const { Router } = require("express");

const router = Router();

// Debugging: Log the imported values to ensure they are functions
console.log(typeof storeData, typeof userData, typeof authenticateUser);

router.post("/storeData", productValidation, storeData);
router.get("/userdata", productValidation, userData);

module.exports = router;
