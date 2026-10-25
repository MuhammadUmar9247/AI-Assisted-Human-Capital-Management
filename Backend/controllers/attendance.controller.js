import Attendance from "../models/Attendance.js";
import CompanySettings from "../models/CompanySettings.js";
import Employee from "../models/Employee.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import dayjs from "dayjs";

const getToday = () => dayjs().format("YYYY-MM-DD");

export const checkIn = asyncHandler(async (req, res) => {
  if (req.user.role !== "employee") return res.status(403).json({ message: "Only employees can check in" });
  const emp = await Employee.findOne({ userId: req.user._id });
  if (!emp) return res.status(404).json({ message: "Employee profile not found" });
  
  const date = getToday();
  const existing = await Attendance.findOne({ employeeId: emp._id, date });
  if (existing && existing.checkInAt) return res.status(409).json({ message: "Already checked in today" });
  
  const settings = await CompanySettings.findOne();
  const now = new Date();
  const start = settings?.officeStartTime || "09:00";
  const [h,m] = start.split(":").map(Number);
  const startTime = dayjs().hour(h).minute(m).second(0);
  const lateMinutes = now > startTime.add(settings?.graceMinutes||15, "minute") ? dayjs(now).diff(startTime, "minute") - (settings?.graceMinutes||15) : 0;
  
  const attendance = await Attendance.findOneAndUpdate(
    { employeeId: emp._id, date },
    { employeeId: emp._id, date, checkInAt: now, source: req.body.source||"web", location: req.body.location||{}, status: lateMinutes > 0 ? "late" : "present", lateMinutes: lateMinutes > 0 ? lateMinutes : 0 },
    { upsert: true, new: true }
  );
  
  res.json(attendance);
});

export const checkOut = asyncHandler(async (req, res) => {
  if (req.user.role !== "employee") return res.status(403).json({ message: "Only employees can check out" });
  const emp = await Employee.findOne({ userId: req.user._id });
  const date = getToday();
  const attendance = await Attendance.findOne({ employeeId: emp._id, date });
  if (!attendance || !attendance.checkInAt) return res.status(400).json({ message: "No check-in found for today" });
  if (attendance.checkOutAt) return res.status(409).json({ message: "Already checked out" });
  
  attendance.checkOutAt = new Date();
  const hoursWorked = (attendance.checkOutAt - attendance.checkInAt) / (1000*60*60);
  attendance.hoursWorked = Math.round(hoursWorked * 100)/100;
  if (hoursWorked < 5) attendance.status = "half_day";
  await attendance.save();
  res.json(attendance);
});

export const getMyAttendance = asyncHandler(async (req, res) => {
  if (req.user.role !== "employee") return res.status(403).json({ message: "Only employees" });
  const emp = await Employee.findOne({ userId: req.user._id });
  const attendance = await Attendance.find({ employeeId: emp._id }).sort({ date: -1 }).limit(30);
  res.json(attendance);
});

export const getAllAttendance = asyncHandler(async (req, res) => {
  const { date } = req.query;
  const filter = date ? { date } : {};
  const attendance = await Attendance.find(filter).populate("employeeId").sort({ date: -1 });
  res.json(attendance);
});
