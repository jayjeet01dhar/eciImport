const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/eci', async (req, res) => {
    try {
        const response = await axios.get(
            'https://results.eci.gov.in/ResultAcGenMay2026/partywiseresult-S25.htm',
            {
                headers: {
                    'User-Agent': 'Mozilla/5.0'
                }
            }
        );
        res.send(response.data);
    } catch (err) {
        res.status(500).send('Error fetching ECI data');
    }
});

app.listen(3001, () => console.log('Server running'));