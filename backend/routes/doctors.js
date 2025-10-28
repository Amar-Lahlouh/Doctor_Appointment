import express from "express";

import {
  updateDoctor,
  deleteDoctor,
  GetAllDoctor,
  GetSingleDoctor,
  getDoctorProfile,
} from "../controllers/doctorController.js";

import reviewRouter from "./review.js";
import { VerifyAuth } from "../auth/verifyToken.js";
const router = express.Router();
router.get("/all", GetAllDoctor);
router.use(VerifyAuth);
router.use("/:doctorId/reviews", reviewRouter);

router.get("/:id", GetSingleDoctor);
router.delete("/:id", deleteDoctor);
router.put("/:id", updateDoctor);
router.get("/profile/me", VerifyAuth, getDoctorProfile);
export default router;
