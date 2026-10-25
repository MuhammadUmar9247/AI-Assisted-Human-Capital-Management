import express from "express";
import { protect } from "../middlewares/auth.js";
import { authorize } from "../middlewares/rbac.js";
import { applyLeave, myLeaves, getAllLeaves, approveLeave, rejectLeave } from "../controllers/leave.controller.js";

const router = express.Router();

router.post("/apply", protect, applyLeave);
router.get("/me", protect, myLeaves);
router.get("/", protect, authorize("admin","hr"), getAllLeaves);
router.put("/:id/approve", protect, authorize("admin","hr"), approveLeave);
router.put("/:id/reject", protect, authorize("admin","hr"), rejectLeave);

export default router;
