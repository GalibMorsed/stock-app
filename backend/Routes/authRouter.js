import { signin, login } from "../Controllers/AuthController.js";
import {
  signinValidation,
  loginValidation,
} from "../Middlewares/AuthValidation.js";
import { Router } from "express";

const router = Router();

router.post("/login", loginValidation, login);
router.post("/signup", signinValidation, signin);

export default router;
