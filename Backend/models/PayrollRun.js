import mongoose from "mongoose";

const payrollRunSchema = new mongoose.Schema({
  month: { type: Number, required: true },
  year: { type: Number, required: true },
  status: { type: String, enum: ["draft", "finalized"], default: "draft" },
  generatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  finalizedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  finalizedAt: { type: Date },
  items: [{
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
    basic: Number,
    hra: Number,
    medical: Number,
    other: Number,
    gross: Number,
    workingDays: Number,
    presentDays: Number,
    absentDays: Number,
    halfDays: Number,
    unpaidLeaveDays: Number,
    perDay: Number,
    deductions: Number,
    tax: Number,
    net: Number
  }],
  totals: {
    gross: { type: Number, default: 0 },
    deductions: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
    net: { type: Number, default: 0 }
  }
}, { timestamps: true });

payrollRunSchema.index({ month: 1, year: 1 }, { unique: true });

export default mongoose.model("PayrollRun", payrollRunSchema);
