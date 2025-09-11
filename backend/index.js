// --- Essential Imports ---
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from 'path'; // <-- Add this import
import { fileURLToPath } from 'url'; // <-- Add this import

// --- Configuration Imports ---
import connectDB from "./config/db.js";

// --- Route Imports ---
import authRoutes from "./routes/authRoutes.js";
import numerologyRoutes from "./routes/numerologyRoutes.js";
import kundliRoutes from "./routes/kundliRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";

// --- Configuration Setup ---
// ** REPLACE THE OLD dotenv.config() WITH THIS BLOCK **
// This robustly finds the .env file next to your server.js
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '.env') });
// ** END OF REPLACEMENT **

// Establish the connection to the MongoDB database
connectDB();

// Initialize the Express application
const app = express();

// --- Core Middlewares ---
app.use(cors());
app.use(express.json());

// --- Health Check Endpoint ---
app.get("/", (req, res) => res.send("🚀 Astrosphere API is running..."));

// --- API Routes ---
app.use("/api/auth", authRoutes);
app.use("/api/numerology", numerologyRoutes);
app.use("/api/kundli", kundliRoutes);
app.use("/api/appointments", appointmentRoutes);

// --- Server Initialization ---
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`🚀 Server successfully started on port ${PORT}`));
