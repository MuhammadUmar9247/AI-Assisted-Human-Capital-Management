import mongoose from "mongoose";

const holidaySchema = new mongoose.Schema({
  date: { type: Date, required: true },
  name: { type: String, required: true },
  recurring: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model("Holiday", holidaySchema);
