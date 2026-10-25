import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String },
  title: { type: String },
  message: { type: String },
  read: { type: Boolean, default: false },
  link: { type: String }
}, { timestamps: true });

export default mongoose.model("Notification", notificationSchema);
