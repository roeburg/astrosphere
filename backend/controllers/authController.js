import jwt from "jsonwebtoken";
import axios from "axios";

// In-memory OTP store (use Redis/DB in production)
const otpStore = new Map();

// --- Constants ---
const JWT_SECRET = "sahil";
const ADMIN_EMAIL = "admin";
const ADMIN_PASSWORD = "admin123";

// --- User OTP Login ---
export const sendOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + 10 * 60 * 1000;

  otpStore.set(email.toLowerCase(), { code: otp, expiresAt });

  try {
    await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "Astrosphere",
          email: "sahilthakur6164@gmail.com",
        },
        to: [
          {
            email: email,
          },
        ],
        subject: "Your OTP Code",
        htmlContent: `<h2>Your OTP is: ${otp}</h2><p>This code will expire in 10 minutes.</p>`,
      },
      {
        headers: {
          "api-key": "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",
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json({
      message: "OTP sent successfully.",
    });
  } catch (error) {
    console.log("❌ FULL ERROR START");
    console.log(error.response?.data || error);
    console.log("❌ FULL ERROR END");

    res.status(500).json({
      message: "Failed to send OTP.",
      error: error.response?.data || error.message,
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

  otpStore.delete(lowerCaseEmail);

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
