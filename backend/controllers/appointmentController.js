import Appointment from "../models/Appointment.js";

/**
 * Generate a unique appointment key
 */
function generateUniqueKey(length = 12) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let key = "";
  for (let i = 0; i < length; i++) {
    key += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return key + Date.now().toString(36);
}

/**
 * Book a new appointment (Public)
 * POST /api/appointments/book
 */
export const bookAppointment = async (req, res) => {
  try {
    const { name, email, date, time, message, preferredDateTime } = req.body;
    if (!name || !email || !date || !time || !preferredDateTime) {
      return res.status(400).json({ success: false, error: "All required fields must be filled" });
    }

    const newApp = new Appointment({
      name,
      email,
      date,
      time,
      message,
      preferredDateTime,
      status: "pending",
      key: generateUniqueKey(),
    });

    await newApp.save();
    return res.status(201).json({ success: true, appointment: newApp });
  } catch (err) {
    console.error("Booking Error:", err);
    if (err.code === 11000 && err.keyPattern?.key) {
      return res.status(500).json({ success: false, error: "Duplicate appointment key. Try again." });
    }
    return res.status(500).json({ success: false, error: "Failed to book appointment" });
  }
};

/**
 * Get all appointments (Admin)
 * GET /api/appointments
 */
export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({}).sort({ createdAt: -1 });
    return res.json({ success: true, appointments });
  } catch (err) {
    console.error("Fetch Appointments Error:", err);
    return res.status(500).json({ success: false, error: "Failed to retrieve appointments" });
  }
};

/**
 * Get appointment status by user email (Public/User)
 * GET /api/appointments/status?email=user@example.com
 */
export const getAppointmentStatusByUser = async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ success: false, error: "Email is required" });
    }

    const appointment = await Appointment.findOne({ email }).sort({ createdAt: -1 });

    if (!appointment) {
      return res.status(404).json({ success: false, error: "No appointment found" });
    }

    return res.json({
      success: true,
      status: appointment.status,
      appointment,
    });
  } catch (err) {
    console.error("Get Appointment Status Error:", err);
    return res.status(500).json({ success: false, error: "Failed to fetch appointment status" });
  }
};

/**
 * Update an appointment (status or other fields)
 * PATCH /api/appointments/:id
 */
export const updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body || {};

    if (!id) {
      return res.status(400).json({ success: false, error: "Appointment id required" });
    }

    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ success: false, error: "Appointment not found" });
    }

    // Apply updates
    if (updates.status !== undefined) appointment.status = updates.status;
    if (updates.name !== undefined) appointment.name = updates.name;
    if (updates.email !== undefined) appointment.email = updates.email;
    if (updates.date !== undefined) appointment.date = updates.date;
    if (updates.time !== undefined) appointment.time = updates.time;
    if (updates.message !== undefined) appointment.message = updates.message;
    if (updates.preferredDateTime !== undefined) appointment.preferredDateTime = updates.preferredDateTime;

    await appointment.save();

    return res.json({ success: true, appointment });
  } catch (err) {
    console.error("Update Appointment Error:", err);
    return res.status(500).json({ success: false, error: "Failed to update appointment" });
  }
};
