import express from "express";
import { protect } from "../middlewares/auth.js";
import { authorize } from "../middlewares/rbac.js";
import Employee from "../models/Employee.js";
import Attendance from "../models/Attendance.js";
import LeaveRequest from "../models/LeaveRequest.js";
import PayrollRun from "../models/PayrollRun.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import dayjs from "dayjs";

const router = express.Router();

router.get("/admin", protect, authorize("admin"), asyncHandler(async (req,res)=>{
  const headcount = await Employee.countDocuments({ status: { $in: ["active","probation"] } });
  const today = dayjs().format("YYYY-MM-DD");
  const present = await Attendance.countDocuments({ date: today, status: { $in: ["present","late"] } });
  const onLeave = await LeaveRequest.countDocuments({ status: "approved", startDate: { $lte: new Date() }, endDate: { $gte: new Date() } });
  const late = await Attendance.countDocuments({ date: today, status: "late" });
  const lastPayroll = await PayrollRun.findOne({ status: "finalized" }).sort({ year: -1, month: -1 });
  res.json({ kpis: { headcount, presentToday: present, onLeaveToday: onLeave, lateToday: late }, lastPayroll });
}));

router.get("/hr", protect, authorize("admin","hr"), asyncHandler(async (req,res)=>{
  const headcount = await Employee.countDocuments({ status: { $in: ["active","probation"] } });
  const today = dayjs().format("YYYY-MM-DD");
  const present = await Attendance.countDocuments({ date: today, status: { $in: ["present","late"] } });
  const pendingLeaves = await LeaveRequest.countDocuments({ status: "pending" });
  res.json({ kpis: { headcount, presentToday: present, pendingLeaves } });
}));

router.get("/employee", protect, asyncHandler(async (req,res)=>{
  const emp = await Employee.findOne({ userId: req.user._id });
  if (!emp) return res.json({ kpis: {} });
  const today = dayjs().format("YYYY-MM-DD");
  const myAtt = await Attendance.findOne({ employeeId: emp._id, date: today });
  const leaves = await LeaveRequest.countDocuments({ employeeId: emp._id, status: "approved" });
  res.json({ kpis: { checkedIn: !!myAtt?.checkInAt, checkedOut: !!myAtt?.checkOutAt, approvedLeaves: leaves }, attendance: myAtt });
}));

export default router;
