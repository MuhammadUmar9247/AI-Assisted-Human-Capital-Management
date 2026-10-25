import mongoose from "mongoose";

const designationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  departmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
  active: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model("Designation", designationSchema);
