import User from "../models/User.js";
import CompanySettings from "../models/CompanySettings.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { auditLog } from "../utils/auditLog.js";
import AuditLog from "../models/AuditLog.js";

export const firstRunStatus = asyncHandler(async (req, res) => {
  const settings = await CompanySettings.findOne();
  const adminCount = await User.countDocuments({ role: "admin" });
  res.json({ setupDone: !!(settings?.setupDone), hasAdmin: adminCount > 0 });
});

export const setupCompany = asyncHandler(async (req, res) => {
  const { companyName, adminEmail, adminPassword, officeStartTime, graceMinutes, officeLat, officeLng, radiusMeters } = req.body;
  
  const existing = await CompanySettings.findOne();
  if (existing?.setupDone) return res.status(400).json({ message: "Setup already done" });
  
  const settings = await CompanySettings.create({
    companyName,
    officeStartTime: officeStartTime || "09:00",
    graceMinutes: graceMinutes || 15,
    officeLat,
    officeLng,
    radiusMeters: radiusMeters || 150,
    setupDone: true
  });
  
  const existingAdmin = await User.findOne({ email: adminEmail?.toLowerCase() });
  if (existingAdmin) return res.status(400).json({ message: "Admin already exists" });
  
  const passwordHash = await bcrypt.hash(adminPassword, 10);
  const admin = await User.create({
    email: adminEmail.toLowerCase(),
    passwordHash,
    role: "admin",
    mustChangePassword: false,
    active: true
  });
  
  await auditLog(AuditLog, {
    actorId: admin._id,
    actorRole: "admin",
    action: "COMPANY_SETUP",
    entity: "Company",
    after: { companyName, adminEmail }
  });
  
  const token = generateToken(admin._id);
  res.json({ settings, admin: { id: admin._id, email: admin.email, role: admin.role }, token });
});
