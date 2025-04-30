const {
  signin,
  login,
  deleteAccount,
  updatePassword,
} = require("../Controllers/AuthController");
const {
  signinValidation,
  loginValidation,
} = require("../Middlewares/authValidation");
const { Router } = require("express");

const router = Router();

router.post("/login", loginValidation, login);
router.post("/signin", signinValidation, signin);
router.delete("/deleteAccount", deleteAccount);
router.post("/update-password", updatePassword);

module.exports = router;
