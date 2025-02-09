const { signin, login } = require("../Controllers/AuthController");
const {
  signinValidation,
  loginValidation,
} = require("../Middlewares/authValidation");
const { Router } = require("express");

const router = Router();

router.post("/login", loginValidation, login);
router.post("/signin", signinValidation, signin);

module.exports = router;
