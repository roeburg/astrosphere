// --- Essential Imports ---
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// --- Configuration Imports ---
import connectDB from "./config/db.js";

// --- Route Imports ---
import authRoutes from "./routes/authRoutes.js";
import numerologyRoutes from "./routes/numerologyRoutes.js";
import kundliRoutes from "./routes/kundliRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";

// --- Configuration Setup ---
dotenv.config();

// --- Connect to MongoDB ---
connectDB();

// --- Initialize Express ---
const app = express();

// --- Core Middlewares ---
app.use(express.json());

// --- CORS Setup ---
// Allow your frontend and localhost (for development)
const allowedOrigins = [
  "https://astrosphere-822a.vercel.app",
  "http://localhost:3000"
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = "The CORS policy for this site does not allow access from the specified Origin.";
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// --- Health Check Endpoint ---
app.get("/", (req, res) => res.send("🚀 Astrosphere API is running..."));

// --- API Routes ---
app.use("/api/auth", authRoutes);
app.use("/api/numerology", numerologyRoutes);
app.use("/api/kundli", kundliRoutes);
app.use("/api/appointments", appointmentRoutes);

// --- 404 Not Found Handler ---
app.use((req, res, next) => {
  res.status(404).json({ message: "Not Found - The route you are trying to access does not exist." });
});

// --- Global Error Handler ---
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

// --- Server Initialization ---
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server successfully started on port ${PORT}`));
