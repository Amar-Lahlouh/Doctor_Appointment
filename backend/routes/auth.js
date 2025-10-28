import express from "express";

import {
  register,
  login,
  profile,
  refreshToken,
  Logout,
} from "../controllers/authController.js";
import { VerifyAuth } from "../auth/verifyToken.js";

const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.post("/logout", Logout);
router.post("/refresh", VerifyAuth, refreshToken);

router.get("/me", VerifyAuth, profile);

export default router;
