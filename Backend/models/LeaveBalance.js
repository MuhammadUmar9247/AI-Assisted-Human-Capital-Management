import mongoose from "mongoose";

const leaveBalanceSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true },
  year: { type: Number, required: true },
  leaveTypeId: { type: mongoose.Schema.Types.ObjectId, ref: "LeaveType", required: true },
  quota: { type: Number, default: 0 },
  used: { type: Number, default: 0 },
  pending: { type: Number, default: 0 },
  remaining: { type: Number, default: 0 }
}, { timestamps: true });

leaveBalanceSchema.index({ employeeId: 1, year: 1, leaveTypeId: 1 }, { unique: true });

export default mongoose.model("LeaveBalance", leaveBalanceSchema);
