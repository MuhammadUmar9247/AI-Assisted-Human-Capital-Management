import User from "../models/User.js";
import Employee from "../models/Employee.js";
import bcrypt from "bcryptjs";
import { asyncHandler } from "../utils/asyncHandler.js";
import { generateEmpCode } from "../utils/generateCode.js";
import { auditLog } from "../utils/auditLog.js";
import AuditLog from "../models/AuditLog.js";

export const listEmployees = asyncHandler(async (req, res) => {
  const { q, departmentId, status } = req.query;
  const filter = {};
  if (q) {
    filter[""] = [
      { firstName: { "": q, "": "i" } },
      { lastName: { "": q, "": "i" } },
      { empCode: { "": q, "": "i" } },
      { email: { "": q, "": "i" } }
    ];
  }
  if (departmentId) filter.departmentId = departmentId;
  if (status) filter.status = status;
  const employees = await Employee.find(filter).populate("departmentId designationId").sort({ createdAt: -1 });
  res.json(employees);
});

export const getEmployee = asyncHandler(async (req, res) => {
  const emp = await Employee.findById(req.params.id).populate("departmentId designationId userId");
  if (!emp) return res.status(404).json({ message: "Employee not found" });
  res.json(emp);
});

export const registerEmployee = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, phone, address, departmentId, designationId, joinDate, basic, hra, medical, other } = req.body;
  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) return res.status(400).json({ message: "User with this email exists" });
  const emp = await Employee.create({
    empCode: generateEmpCode(),
    firstName, lastName, email: email.toLowerCase(), phone, address,
    departmentId, designationId, joinDate,
    salary: { basic, hra: hra||0, medical: medical||0, other: other||0 },
    status: "active"
  });
  const tempPass = Math.random().toString(36).slice(-8) + "A1!";
  const passwordHash = await bcrypt.hash(tempPass, 10);
  const user = await User.create({
    email: email.toLowerCase(),
    passwordHash,
    role: "employee",
    employeeId: emp._id,
    mustChangePassword: true,
    active: true
  });
  emp.userId = user._id;
  await emp.save();
  await auditLog(AuditLog, {
    actorId: req.user._id,
    actorRole: req.user.role,
    action: "CREATE_EMPLOYEE",
    entity: "Employee",
    entityId: emp._id.toString(),
    after: { empCode: emp.empCode, email: emp.email }
  });
  res.json({ employee: emp, user: { email: user.email, tempPassword: tempPass } });
});

export const updateEmployee = asyncHandler(async (req, res) => {
  const emp = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(emp);
});
