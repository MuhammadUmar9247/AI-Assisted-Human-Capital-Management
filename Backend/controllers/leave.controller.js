import LeaveRequest from "../models/LeaveRequest.js";
import LeaveBalance from "../models/LeaveBalance.js";
import LeaveType from "../models/LeaveType.js";
import Employee from "../models/Employee.js";
import Holiday from "../models/Holiday.js";
import CompanySettings from "../models/CompanySettings.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { countWorkingDays } from "../utils/dateHelpers.js";
import { auditLog } from "../utils/auditLog.js";
import AuditLog from "../models/AuditLog.js";

export const applyLeave = asyncHandler(async (req, res) => {
  if (req.user.role !== "employee") return res.status(403).json({ message: "Only employees" });
  const emp = await Employee.findOne({ userId: req.user._id });
  const { leaveTypeId, startDate, endDate, reason } = req.body;
  
  const settings = await CompanySettings.findOne();
  const holidays = await Holiday.find({ date: { [$gte]: startDate, [$lte]: endDate } });
  const holidayDates = holidays.map(h => h.date);
  const days = countWorkingDays(startDate, endDate, settings?.weekend || [0,6], holidayDates);
  
  if (days <= 0) return res.status(400).json({ message: "No working days in selected range" });
  
  const leave = await LeaveRequest.create({
    employeeId: emp._id,
    leaveTypeId,
    startDate,
    endDate,
    days,
    reason,
    status: "pending"
  });
  
  await auditLog(AuditLog, {
    actorId: req.user._id,
    actorRole: req.user.role,
    action: "APPLY_LEAVE",
    entity: "LeaveRequest",
    entityId: leave._id.toString()
  });
  
  res.json(leave);
});

export const myLeaves = asyncHandler(async (req, res) => {
  if (req.user.role !== "employee") return res.status(403).json({ message: "Only employees" });
  const emp = await Employee.findOne({ userId: req.user._id });
  const leaves = await LeaveRequest.find({ employeeId: emp._id }).populate("leaveTypeId").sort({ createdAt: -1 });
  res.json(leaves);
});

export const getAllLeaves = asyncHandler(async (req, res) => {
  const { status } = req.query;
  const filter = status ? { status } : {};
  const leaves = await LeaveRequest.find(filter).populate("employeeId leaveTypeId").sort({ createdAt: -1 });
  res.json(leaves);
});

export const approveLeave = asyncHandler(async (req, res) => {
  const leave = await LeaveRequest.findById(req.params.id);
  if (!leave) return res.status(404).json({ message: "Leave not found" });
  if (leave.status !== "pending") return res.status(400).json({ message: "Already processed" });
  
  leave.status = "approved";
  leave.approvedBy = req.user._id;
  leave.approvedAt = new Date();
  leave.comment = req.body.comment || "";
  await leave.save();
  
  await auditLog(AuditLog, {
    actorId: req.user._id,
    actorRole: req.user.role,
    action: "APPROVE_LEAVE",
    entity: "LeaveRequest",
    entityId: leave._id.toString(),
    after: { status: "approved" }
  });
  
  res.json(leave);
});

export const rejectLeave = asyncHandler(async (req, res) => {
  const leave = await LeaveRequest.findById(req.params.id);
  if (!leave) return res.status(404).json({ message: "Leave not found" });
  leave.status = "rejected";
  leave.approvedBy = req.user._id;
  leave.approvedAt = new Date();
  leave.comment = req.body.comment || "";
  await leave.save();
  res.json(leave);
});
