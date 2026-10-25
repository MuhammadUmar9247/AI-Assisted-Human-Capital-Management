import express from "express";
import { protect } from "../middlewares/auth.js";
import { authorize } from "../middlewares/rbac.js";
import Announcement from "../models/Announcement.js";
import Notification from "../models/Notification.js";
import AuditLog from "../models/AuditLog.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();

router.get("/announcements", protect, asyncHandler(async (req,res)=>{
  const anns = await Announcement.find().sort({ createdAt: -1 }).limit(10);
  res.json(anns);
}));

router.post("/announcements", protect, authorize("admin","hr"), asyncHandler(async (req,res)=>{
  const ann = await Announcement.create({ ...req.body, createdBy: req.user._id });
  res.json(ann);
}));

router.get("/notifications", protect, asyncHandler(async (req,res)=>{
  const notes = await Notification.find({ userId: req.user._id }).sort({ createdAt: -1 }).limit(20);
  res.json(notes);
}));

export default router;
