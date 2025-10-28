import { VerifyAuth } from "../auth/verifyToken.js";
import {
  GetAllReviews,
  createReview,
} from "../controllers/reviewController.js";

import express from "express";
const router = express.Router({ mergeParams: true });
router.use(VerifyAuth);
router.route("/").get(GetAllReviews).post(createReview);

export default router;
