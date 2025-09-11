import express from "express";
import { sendOtp, verifyOtp, adminLogin } from "../controllers/authController.js";

const router = express.Router();

// User routes
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);

// Admin route
router.post("/admin-login", adminLogin);

export default router;
