import express from "express";
import { protect } from "../middlewares/auth.js";
import { authorize } from "../middlewares/rbac.js";
import { checkIn, checkOut, getMyAttendance, getAllAttendance } from "../controllers/attendance.controller.js";

const router = express.Router();

router.post("/check-in", protect, checkIn);
router.post("/check-out", protect, checkOut);
router.get("/me", protect, getMyAttendance);
router.get("/", protect, authorize("admin","hr"), getAllAttendance);

export default router;
