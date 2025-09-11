import express from 'express';
import {
    getPlanetaryPositions,
    getAstroDetails,
    getKundliChart,
} from '../controllers/kundliController.js';

const router = express.Router();

// Public routes (no middleware)
router.post('/planets', getPlanetaryPositions);
router.post('/astro-details', getAstroDetails);
router.post('/chart/:chartId', getKundliChart);

// The fix is on this line:
export default router;

