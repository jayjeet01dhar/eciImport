const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 10000;

// 🔑 Browser-like headers
const config = {
    headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "Accept": "text/html,application/xhtml+xml",
        "Accept-Language": "en-US,en;q=0.9",
        "Referer": "https://results.eci.gov.in/",
        "Connection": "keep-alive"
    },
    timeout: 20000
};

// PARTY API
app.get('/party', async (req, res) => {
    try {
        const response = await axios.get(
            "https://results.eci.gov.in/ResultAcGenMay2026/partywiseresult-S25.htm",
            config
        );

        res.send(response.data);

    } catch (err) {
        console.error("Party fetch error:", err.message);
        res.status(500).send("Error fetching party data");
    }
});

// CANDIDATE API
app.get('/candidates', async (req, res) => {
    try {
        const response = await axios.get(
            "https://results.eci.gov.in/ResultAcGenMay2026/index.htm",
            config
        );

        res.send(response.data);

    } catch (err) {
        console.error("Candidate fetch error:", err.message);
        res.status(500).send("Error fetching candidate data");
    }
});

// ROOT
app.get('/', (req, res) => {
    res.send("Server running OK");
});

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
