import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { auditLog } from "../utils/auditLog.js";
import AuditLog from "../models/AuditLog.js";

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user || !user.active) return res.status(401).json({ message: "Invalid credentials" });
  
  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) return res.status(401).json({ message: "Invalid credentials" });
  
  user.lastLogin = new Date();
  await user.save();
  
  const token = generateToken(user._id);
  res.json({
    token,
    user: {
      id: user._id,
      email: user.email,
      role: user.role,
      employeeId: user.employeeId,
      mustChangePassword: user.mustChangePassword
    }
  });
});

export const me = asyncHandler(async (req, res) => {
  res.json({ user: req.user });
});

export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const user = await User.findById(req.user._id);
  const match = await bcrypt.compare(currentPassword, user.passwordHash);
  if (!match) return res.status(400).json({ message: "Current password incorrect" });
  
  user.passwordHash = await bcrypt.hash(newPassword, 10);
  user.mustChangePassword = false;
  await user.save();
  
  await auditLog(AuditLog, {
    actorId: user._id,
    actorRole: user.role,
    action: "CHANGE_PASSWORD",
    entity: "User",
    entityId: user._id.toString()
  });
  
  res.json({ message: "Password changed successfully" });
});
