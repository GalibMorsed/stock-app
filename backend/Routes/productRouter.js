const { storeData, getUserData } = require("../Controllers/productController");
const { productValidation } = require("../Middlewares/productValidation");
const { Router } = require("express");

const router = Router();

// Debugging: Log the imported values to ensure they are functions
console.log(typeof storeData, typeof getUserData, typeof authenticateUser);

router.post("/store", productValidation, storeData);
router.get("/user-data", productValidation, getUserData);

module.exports = router;
