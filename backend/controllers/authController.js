import jwt from "jsonwebtoken";
import transporter from "../config/mailer.js"; // adjust path

// In-memory OTP store (use Redis/DB in production)
const otpStore = new Map();

// --- Constants ---
const JWT_SECRET = "sahil";
const MAIL_USER = "ae73cd001@smtp-brevo.com"; // must match mailer.js
const ADMIN_EMAIL = "admin";
const ADMIN_PASSWORD = "admin123";

// --- User OTP Login ---
export const sendOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

  otpStore.set(email.toLowerCase(), { code: otp, expiresAt });

  try {
    await transporter.sendMail({
      from: `"Sahil Auth" <${MAIL_USER}>`,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is: ${otp}`,
      html: `<h2>Your OTP is: ${otp}</h2><p>This code will expire in 10 minutes.</p>`,
    });

    res.status(200).json({ message: "OTP sent successfully." });
  } catch (error) {
  console.log("❌ FULL ERROR START");
  console.log(error);
  console.log("❌ FULL ERROR END");

  res.status(500).json({
    message: "Failed to send OTP.",
    error: error.message,
    code: error.code,
    command: error.command,
  });
}
};

// --- Verify OTP ---
export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  const lowerCaseEmail = email.toLowerCase();

  const storedOtp = otpStore.get(lowerCaseEmail);

  if (!storedOtp || storedOtp.expiresAt < Date.now() || storedOtp.code !== otp) {
    return res.status(401).json({ message: "Invalid or expired OTP." });
  }

  otpStore.delete(lowerCaseEmail); // OTP used once

  const token = jwt.sign(
    { email: lowerCaseEmail, role: "user" },
    JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.status(200).json({
    message: "Login successful.",
    token,
    user: { email: lowerCaseEmail, role: "user" },
  });
};

// --- Admin Login ---
export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  if (email.trim() === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const token = jwt.sign(
      { email: ADMIN_EMAIL, role: "admin" },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Admin login successful.",
      token,
      user: { email: ADMIN_EMAIL, role: "admin" },
    });
  } else {
    res.status(401).json({ message: "Invalid admin credentials." });
  }
};
