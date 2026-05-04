const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 10000;

// ✅ ENABLE CORS
app.use(cors());

const config = {
    headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "text/html",
        "Referer": "https://results.eci.gov.in/"
    }
};

// PARTY
app.get('/party', async (req, res) => {
    try {
        const response = await axios.get(
            "https://results.eci.gov.in/ResultAcGenMay2026/partywiseresult-S25.htm",
            config
        );

        res.send(response.data);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Error fetching party data");
    }
});

// CANDIDATES
app.get('/candidates', async (req, res) => {
    try {
        const response = await axios.get(
            "https://results.eci.gov.in/ResultAcGenMay2026/index.htm",
            config
        );

        res.send(response.data);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Error fetching candidate data");
    }
});

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
