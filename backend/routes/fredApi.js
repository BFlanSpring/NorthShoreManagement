const express = require('express');
const axios = require('axios');
const router = express.Router();

const FRED_API_KEY = '38b20c6d4ddce071568e81cdf5532506';
const FRED_BASE_URL = 'https://api.stlouisfed.org/fred/series/observations';

router.get('/fred-data', async (req, res) => {
    const { seriesId } = req.query;

    try {
        const response = await axios.get(FRED_BASE_URL, {
            params: {
                series_id: seriesId,
                api_key: FRED_API_KEY,
                file_type: 'json'
            }
        });

        res.json({ data: response.data.observations });
    } catch (error) {
        console.error('Error fetching FRED data:', error);
        res.status(500).json({ error: 'Failed to fetch FRED data' });
    }
});

module.exports = router;
