import mongoose from "mongoose";

const leaveRequestSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true },
  leaveTypeId: { type: mongoose.Schema.Types.ObjectId, ref: "LeaveType", required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  days: { type: Number, required: true },
  reason: { type: String },
  status: { type: String, enum: ["pending", "approved", "rejected", "cancelled"], default: "pending" },
  approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  approvedAt: { type: Date },
  comment: { type: String }
}, { timestamps: true });

export default mongoose.model("LeaveRequest", leaveRequestSchema);
