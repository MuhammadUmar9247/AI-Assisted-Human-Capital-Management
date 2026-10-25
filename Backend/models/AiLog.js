import mongoose from "mongoose";

const aiLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  role: { type: String },
  query: { type: String },
  toolsUsed: [{ type: String }],
  responseSummary: { type: String },
  latencyMs: { type: Number },
  ip: { type: String },
  at: { type: Date, default: Date.now }
}, { timestamps: false });

export default mongoose.model("AiLog", aiLogSchema);
