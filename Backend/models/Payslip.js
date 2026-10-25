import mongoose from "mongoose";

const payslipSchema = new mongoose.Schema({
  payrollRunId: { type: mongoose.Schema.Types.ObjectId, ref: "PayrollRun", required: true },
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true },
  data: { type: Object },
  pdfPath: { type: String }
}, { timestamps: true });

export default mongoose.model("Payslip", payslipSchema);
