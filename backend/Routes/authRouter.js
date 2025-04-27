const {
  signin,
  login,
  deleteAccount,
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

module.exports = router;
