import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true },
  date: { type: String, required: true }, // YYYY-MM-DD
  checkInAt: { type: Date },
  checkOutAt: { type: Date },
  source: { type: String, enum: ["web", "camera"], default: "web" },
  location: {
    lat: Number,
    lng: Number,
    accuracy: Number
  },
  status: { type: String, enum: ["present", "late", "half_day", "absent", "missing_checkout"], default: "present" },
  hoursWorked: { type: Number, default: 0 },
  lateMinutes: { type: Number, default: 0 },
  corrections: [{
    requestedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    reason: String,
    requestedAt: Date,
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
    reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    reviewedAt: Date,
    comment: String
  }]
}, { timestamps: true });

attendanceSchema.index({ employeeId: 1, date: 1 }, { unique: true });

export default mongoose.model("Attendance", attendanceSchema);
