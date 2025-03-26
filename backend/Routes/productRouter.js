const { storeData, getUserData } = require("../Controllers/productController");
const {
  signinValidation,
  loginValidation,
} = require("../Middlewares/authValidation");
const { Router } = require("express");

const router = Router();

// Debugging: Log the imported values to ensure they are functions
console.log(typeof storeData, typeof getUserData, typeof authenticateUser);

router.post("/store", loginValidation, signinValidation, storeData);
router.get("/user-data", loginValidation, signinValidation, getUserData);

module.exports = router;
