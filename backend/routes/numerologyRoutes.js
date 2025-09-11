// routes/numerologyRoutes.js
import express from "express";
import { calculateNumerology } from "../controllers/numerologyController.js";

const router = express.Router();
router.post("/calculate", calculateNumerology);

export default router;
