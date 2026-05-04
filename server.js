const express = require('express');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 10000;

// 🔑 VERY IMPORTANT HEADERS (this is the fix)
const headers = {
    "User-Agent": "Mozilla/5.0",
    "Accept": "text/html",
    "Referer": "https://results.eci.gov.in/"
};

// PARTY DATA
app.get('/party', async (req, res) => {
    try {
        const response = await fetch(
            "https://results.eci.gov.in/ResultAcGenMay2026/partywiseresult-S25.htm",
            { headers }
        );

        const html = await response.text();

        if (!html || html.length < 1000) {
            throw new Error("Empty or blocked response");
        }

        res.send(html);

    } catch (err) {
        console.error("Party fetch error:", err.message);
        res.status(500).send("Error fetching party data");
    }
});

// CANDIDATE DATA
app.get('/candidates', async (req, res) => {
    try {
        const response = await fetch(
            "https://results.eci.gov.in/ResultAcGenMay2026/index.htm",
            { headers }
        );

        const html = await response.text();

        res.send(html);

    } catch (err) {
        console.error("Candidate fetch error:", err.message);
        res.status(500).send("Error fetching candidate data");
    }
});

// ROOT
app.get('/', (req, res) => {
    res.send("Server running");
});

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
