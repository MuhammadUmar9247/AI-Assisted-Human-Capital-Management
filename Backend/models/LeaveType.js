import mongoose from "mongoose";

const leaveTypeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  annualQuota: { type: Number, default: 14 },
  sickQuota: { type: Number, default: 8 },
  casualQuota: { type: Number, default: 10 },
  unpaidAllowed: { type: Boolean, default: true },
  active: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model("LeaveType", leaveTypeSchema);
