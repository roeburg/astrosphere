// controllers/numerologyController.js
import { makeNumerology } from "../utils/numerologyUtils.js";

export const calculateNumerology = async (req, res) => {
  try {
    const { name, dob } = req.body;

    if (!name || !dob) {
      return res.status(400).json({ error: "Name and DOB are required." });
    }

    const result = makeNumerology(name, dob);

    res.status(200).json({
      success: true,
      data: {
        name: result.name,
        dob: result.dob,
        driver: result.driver,
        conductor: result.conductor,
        loshu: result.loshu,
        digitCounts: result.digitCounts,
        driverDetails: result.driverDetails,
        conductorDetails: result.conductorDetails,
        presentYogas: result.presentYogas,
        repetitionInterpretations: result.repetitionInterpretations,
        fullInterpretation: result.fullInterpretation,
      },
    });
  } catch (error) {
    console.error("Numerology calculation failed:", error);
    res.status(500).json({ success: false, error: "Numerology calculation failed." });
  }
};
