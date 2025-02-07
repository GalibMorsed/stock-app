import { signup, login } from "../Controllers/AuthController";
import {
  signupValidation,
  loginValidation,
} from "../Middlewares/AuthValidation";
import { Router } from "express";

const router = Router();

router.post("/login", loginValidation, login);
router.post("/signup", signupValidation, signup);

module.exports = router;
