import express from "express";
import { protect } from "../middlewares/auth.js";
import { authorize } from "../middlewares/rbac.js";
import AuditLog from "../models/AuditLog.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();

router.get("/", protect, authorize("admin"), asyncHandler(async (req,res)=>{
  const logs = await AuditLog.find().sort({ at: -1 }).limit(100);
  res.json(logs);
}));

export default router;
