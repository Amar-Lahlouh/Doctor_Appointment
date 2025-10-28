import {
  updateUser,
  deleteUser,
  getSingleUser,
  GetAllUser,
  GetMe,
  getMyAppointments,
  GetProfileUser,
} from "../controllers/userController.js";
import express from "express";
import { VerifyAuth } from "../auth/verifyToken.js";
const router = express.Router();

//router.get("/:id", getSingleUser);
router.use(VerifyAuth);
router.put("/:id", updateUser);

router.get("/allusers", GetAllUser);

router.delete("/:id", deleteUser);
router.get("/getme", GetMe);
router.get("/appointments/my-appointments", getMyAppointments);
router.post("/profile", GetProfileUser);
export default router;
