import axios from 'axios';

// WARNING: Your secret keys are hardcoded below.
// This is a security risk. Do not share this file or upload it to a public repository like GitHub.
const USER_ID = '654250';
const API_KEY = 'ak-f00163b42c5b0426b5d5272ec531cd4d0a287ffc';
const API_BASE_URL = 'https://json.astrologyapi.com/v1/';

// Reusable helper function to call the external API
const callAstrologyApi = async (endpoint, data) => {
    // This log will now show the correct values because they are hardcoded.
    console.log("Checking credentials loaded by server:", { USER_ID, API_KEY });

    // This check ensures we don't send 'undefined' to the API
    if (!USER_ID || !API_KEY) {
        throw new Error('API credentials are not available because they are missing from the code.');
    }

    const authString = 'Basic ' + Buffer.from(USER_ID + ':' + API_KEY).toString('base64');
    const url = API_BASE_URL + endpoint;
    const headers = {
        'Authorization': authString,
        'Content-Type': 'application/json',
    };
    try {
        console.log("Sending data to AstrologyAPI:", data); // Log the data being sent
        const response = await axios.post(url, data, { headers });
        return response.data;
    } catch (error) {
        console.error(`Error calling AstrologyAPI endpoint ${endpoint}:`, error.response ? error.response.data : error.message);
        throw new Error(error.response ? JSON.stringify(error.response.data) : 'AstrologyAPI request failed');
    }
};

// This helper function transforms the request body for the external API.
const transformRequestData = (body) => {
    const { dob, time, lat, lon, tz } = body;

    if (!dob || !time) {
        throw new Error('Date of birth and time are required.');
    }

    const [day, month, year] = dob.split('/').map(Number);
    const [hour, min] = time.split(':').map(Number);

    return {
        day,
        month,
        year,
        hour,
        min,
        lat,
        lon,
        tzone: tz
    };
};


/**
 * @description  Get planetary positions for a Kundli
 * @route        POST /api/kundli/planets
 */
export const getPlanetaryPositions = async (req, res) => {
    try {
        const apiPayload = transformRequestData(req.body);
        const flatPlacements = await callAstrologyApi('planets', apiPayload);

        if (flatPlacements && flatPlacements.status === false) {
            return res.status(400).json({ message: flatPlacements.msg || 'Invalid request to AstrologyAPI.' });
        }

        // **FIX**: Create an object with numeric keys (1-12) as required by the chart component.
        const placementsByHouse = {};
        for (let i = 1; i <= 12; i++) {
            placementsByHouse[i] = [];
        }

        if (Array.isArray(flatPlacements)) {
            flatPlacements.forEach(planet => {
                // Use the actual house number (e.g., 1, 2, 3) as the key.
                if (planet.house >= 1 && planet.house <= 12) {
                    placementsByHouse[planet.house].push(planet);
                }
            });
        }
        
        res.status(200).json({
            placements: Array.isArray(flatPlacements) ? flatPlacements : [],
            placementsByHouse: placementsByHouse
        });

    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve planetary data.', error: error.message });
    }
};

/**
 * @description  Get basic astrological details
 * @route        POST /api/kundli/astro-details
 */
export const getAstroDetails = async (req, res) => {
    try {
        const apiPayload = transformRequestData(req.body);
        const astroDetails = await callAstrologyApi('astro_details', apiPayload);

        if (astroDetails && astroDetails.status === false) {
            return res.status(400).json({ message: astroDetails.msg || 'Invalid request to AstrologyAPI.' });
        }
        res.status(200).json(astroDetails);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve astro details.', error: error.message });
    }
};

/**
 * @description  Get a specific Kundli chart by its ID
 * @route        POST /api/kundli/chart/:chartId
 */
export const getKundliChart = async (req, res) => {
    const { chartId } = req.params;
    if (!chartId) {
        return res.status(400).json({ message: 'Chart ID is required.' });
    }
    try {
        const apiPayload = transformRequestData(req.body);
        const chartData = await callAstrologyApi(`horo_chart_image/${chartId}`, apiPayload);

        if (chartData && chartData.status === false) {
            return res.status(400).json({ message: chartData.msg || 'Failed to generate chart.' });
        }
        if (!chartData.svg) {
            return res.status(500).json({ message: 'SVG data not found in API response.' });
        }
        res.header('Content-Type', 'image/svg+xml');
        res.send(chartData.svg);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve Kundli chart.', error: error.message });
    }
};

