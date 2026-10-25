import PayrollRun from "../models/PayrollRun.js";
import Employee from "../models/Employee.js";
import Attendance from "../models/Attendance.js";
import LeaveRequest from "../models/LeaveRequest.js";
import CompanySettings from "../models/CompanySettings.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { calcTax } from "../utils/tax.js";
import { auditLog } from "../utils/auditLog.js";
import AuditLog from "../models/AuditLog.js";

export const generatePayroll = asyncHandler(async (req, res) => {
  const { month, year } = req.body;
  const existing = await PayrollRun.findOne({ month, year });
  if (existing) return res.status(400).json({ message: "Payroll already exists for this period" });
  const settings = await CompanySettings.findOne();
  const employees = await Employee.find({ status: { [$in]: ["active", "probation"] } });
  const items = [];
  let totals = { gross: 0, deductions: 0, tax: 0, net: 0 };
  for (const emp of employees) {
    const basic = emp.salary.basic || 0;
    const hra = emp.salary.hra || basic * 0.4;
    const medical = emp.salary.medical || basic * 0.1;
    const other = emp.salary.other || 0;
    const gross = Math.round(basic + hra + medical + other);
    const workingDays = 26;
    const perDay = gross / workingDays;
    const startDate = new Date(year, month-1, 1);
    const endDate = new Date(year, month, 0);
    const atts = await Attendance.find({ employeeId: emp._id, date: { [$gte]: startDate.toISOString().slice(0,10), [$lte]: endDate.toISOString().slice(0,10) } });
    let halfDays = 0, absentDays = 0;
    for (const a of atts) {
      if (a.status === "half_day") halfDays++;
      if (a.status === "absent") absentDays++;
    }
    const unpaidLeaves = await LeaveRequest.find({ employeeId: emp._id, status: "approved", startDate: { [$lte]: endDate }, endDate: { [$gte]: startDate } });
    let unpaidDays = 0;
    for (const l of unpaidLeaves) unpaidDays += l.days || 0;
    const deductions = Math.round((absentDays + unpaidDays + halfDays * 0.5) * perDay);
    const tax = calcTax(gross);
    const net = gross - deductions - tax;
    items.push({
      employeeId: emp._id, basic, hra, medical, other, gross,
      workingDays, presentDays: atts.filter(a=>a.status==="present"||a.status==="late").length,
      absentDays, halfDays, unpaidLeaveDays: unpaidDays, perDay: Math.round(perDay), deductions, tax, net
    });
    totals.gross += gross; totals.deductions += deductions; totals.tax += tax; totals.net += net;
  }
  const run = await PayrollRun.create({
    month, year, status: "draft", generatedBy: req.user._id, items, totals
  });
  await auditLog(AuditLog, {
    actorId: req.user._id, actorRole: req.user.role, action: "GENERATE_PAYROLL", entity: "PayrollRun", entityId: run._id.toString()
  });
  res.json(run);
});

export const getPayrollRuns = asyncHandler(async (req, res) => {
  const runs = await PayrollRun.find().sort({ year: -1, month: -1 });
  res.json(runs);
});

export const finalizePayroll = asyncHandler(async (req, res) => {
  const run = await PayrollRun.findById(req.params.id);
  if (!run) return res.status(404).json({ message: "Payroll run not found" });
  if (run.status === "finalized") return res.status(400).json({ message: "Already finalized" });
  run.status = "finalized";
  run.finalizedBy = req.user._id;
  run.finalizedAt = new Date();
  await run.save();
  await auditLog(AuditLog, {
    actorId: req.user._id, actorRole: req.user.role, action: "FINALIZE_PAYROLL", entity: "PayrollRun", entityId: run._id.toString()
  });
  res.json(run);
});
