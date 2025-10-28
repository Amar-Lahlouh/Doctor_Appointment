import express from "express";
import {
  getCheckoutSession,
  CheckExpirey,
  FetchBooking,
  FetchReviews,
} from "../controllers/bookingController.js";
import { VerifyAuth } from "../auth/verifyToken.js";
const router = express.Router();
console.log("test");

router.post("/checkout-session/:doctorId", VerifyAuth, getCheckoutSession);
router.put("/checkexpirey", VerifyAuth, CheckExpirey);
router.get("/fetchBooking/:id", VerifyAuth, FetchBooking);
router.get("/fetchreviews", FetchReviews);
export default router;
