const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

// Health check route
app.get('/', (req, res) => {
    res.send('Server is running');
});

// Main ECI endpoint
app.get('/eci', async (req, res) => {
    try {
        const response = await axios.get(
            'https://results.eci.gov.in/ResultAcGenMay2026/partywiseresult-S25.htm',
            {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9',
                    'Accept-Language': 'en-US,en;q=0.9',
                    'Referer': 'https://results.eci.gov.in/',
                    'Origin': 'https://results.eci.gov.in',
                    'Connection': 'keep-alive'
                },
                timeout: 20000
            }
        );

        res.send(response.data);

    } catch (err) {
        console.error('ECI FETCH ERROR:', err.message);
        res.status(500).send('Error fetching ECI data: ' + err.message);
    }
});

// IMPORTANT: Use dynamic port for Render
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
