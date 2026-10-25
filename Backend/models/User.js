import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ["admin", "hr", "employee"], required: true },
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
  mustChangePassword: { type: Boolean, default: false },
  active: { type: Boolean, default: true },
  lastLogin: { type: Date }
}, { timestamps: true });

export default mongoose.model("User", userSchema);
