import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  empCode: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  phone: { type: String },
  address: { type: String },
  departmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
  designationId: { type: mongoose.Schema.Types.ObjectId, ref: "Designation" },
  joinDate: { type: Date, required: true },
  leaveDate: { type: Date },
  status: { type: String, enum: ["active", "probation", "inactive", "terminated"], default: "active" },
  managerId: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
  salary: {
    basic: { type: Number, required: true },
    hra: { type: Number, default: 0 },
    medical: { type: Number, default: 0 },
    other: { type: Number, default: 0 },
    currency: { type: String, default: "PKR" }
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

export default mongoose.model("Employee", employeeSchema);
