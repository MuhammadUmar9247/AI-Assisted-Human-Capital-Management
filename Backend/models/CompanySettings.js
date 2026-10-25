import mongoose from "mongoose";

const companySettingsSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  officeStartTime: { type: String, default: "09:00" },
  graceMinutes: { type: Number, default: 15 },
  weekend: { type: [Number], default: [0, 6] }, // Sun, Sat
  officeLat: { type: Number },
  officeLng: { type: Number },
  radiusMeters: { type: Number, default: 150 },
  setupDone: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model("CompanySettings", companySettingsSchema);
