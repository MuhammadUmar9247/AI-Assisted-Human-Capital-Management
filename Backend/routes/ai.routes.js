import express from "express";
import { protect } from "../middlewares/auth.js";
import AiLog from "../models/AiLog.js";
import Employee from "../models/Employee.js";
import LeaveRequest from "../models/LeaveRequest.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import dayjs from "dayjs";

const router = express.Router();

const tools = {
  get_headcount: async (scope, user) => {
    if (user.role === "employee") return { count: await Employee.countDocuments({}) };
    return { count: await Employee.countDocuments({ status: { $in: ["active","probation"] } }) };
  },
  get_my_leave_balance: async (scope, user) => {
    if (user.role !== "employee") return { error: "Only for employee" };
    const emp = await Employee.findOne({ userId: user._id });
    const leaves = await LeaveRequest.countDocuments({ employeeId: emp._id, status: "approved" });
    return { approvedLeaves: leaves, note: "Balance based on approved leaves (demo)" };
  }
};

router.post("/chat", protect, asyncHandler(async (req,res)=>{
  const { message } = req.body;
  const start = Date.now();
  
  let answer = "I can help with headcount, leave balance, attendance. Try asking 'how many employees?' or 'my leave balance'.";
  let toolsUsed = [];
  
  if (message && (message.toLowerCase().includes("headcount") || message.toLowerCase().includes("employees"))) {
    toolsUsed.push("get_headcount");
    const r = await tools.get_headcount(null, req.user);
    answer = `There are ${r.count || 0} active/probation employees.`;
  } else if (message && message.toLowerCase().includes("leave") && req.user.role === "employee") {
    toolsUsed.push("get_my_leave_balance");
    const r = await tools.get_my_leave_balance(null, req.user);
    answer = `You have ${r.approvedLeaves || 0} approved leaves so far.`;
  }
  
  await AiLog.create({
    userId: req.user._id,
    role: req.user.role,
    query: message,
    toolsUsed,
    responseSummary: answer,
    latencyMs: Date.now()-start,
    ip: req.ip
  });
  
  res.json({ answer: "[AI-generated] " + answer, toolsUsed });
}));

router.post("/smart-leave", protect, asyncHandler(async (req,res)=>{
  const { text } = req.body;
  res.json({ prefill: { type: "casual", reason: text || "", startDate: dayjs().add(3,"day").format("YYYY-MM-DD"), endDate: dayjs().add(4,"day").format("YYYY-MM-DD") } });
}));

export default router;
