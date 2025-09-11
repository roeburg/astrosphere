import express from "express";
import {
  bookAppointment,
  getAllAppointments,
  getAppointmentStatusByUser,
  updateAppointment,
} from "../controllers/appointmentController.js";

const router = express.Router();

// Book a new appointment
router.post("/book", bookAppointment);

// Get all appointments (admin use)
router.get("/", getAllAppointments);

// Get appointment status by user (email required in query params)
router.get("/status", getAppointmentStatusByUser);

// Update an appointment by ID
router.patch("/:id", updateAppointment);

export default router;
