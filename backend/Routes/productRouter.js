const { storeData, userData } = require("../Controllers/productController");
const {
  archiveProduct,
  getArchivedProducts,
  unarchiveProduct,
} = require("../Controllers/archiveController");
const { productValidation } = require("../Middlewares/productValidation");
const { Router } = require("express");

const router = Router();

console.log(typeof storeData, typeof userData, typeof productValidation);

router.post("/storeData", productValidation, storeData);
router.get("/userData", userData);

router.post("/archived", archiveProduct);
router.post("/getarchive", getArchivedProducts);
router.put("/unarchive", unarchiveProduct);

module.exports = router;
