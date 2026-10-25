import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema({
  actorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  actorRole: { type: String },
  action: { type: String, required: true },
  entity: { type: String, required: true },
  entityId: { type: String },
  ip: { type: String },
  userAgent: { type: String },
  before: { type: Object },
  after: { type: Object },
  at: { type: Date, default: Date.now }
}, { timestamps: false });

export default mongoose.model("AuditLog", auditLogSchema);
