const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());

// Health check
app.get('/', (req, res) => {
  res.send("Server is running");
});

// PARTY DATA
app.get('/party', async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    await page.goto(
      'https://results.eci.gov.in/ResultAcGenMay2026/partywiseresult-S25.htm',
      { waitUntil: 'networkidle2', timeout: 60000 }
    );

    const html = await page.content();

    await browser.close();

    res.send(html);

  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching party data");
  }
});

// CANDIDATE DATA
app.get('/candidates', async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    await page.goto(
      'https://results.eci.gov.in/ResultAcGenMay2026/index.htm',
      { waitUntil: 'networkidle2', timeout: 60000 }
    );

    const html = await page.content();

    await browser.close();

    res.send(html);

  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching candidates");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
