import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: false }, // optional
    date: { type: String, required: true },
    time: { type: String, required: true },
    message: { type: String },
    key: { type: String, required: true, unique: true }, // unique appointment key
    status: { type: String, default: "pending" },
    preferredDateTime: { type: Date, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Appointment", appointmentSchema);
