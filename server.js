const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

// Health check
app.get('/', (req, res) => {
  res.send('Server is running');
});

// PARTY-WISE
app.get('/party', async (req, res) => {
  try {
    const response = await axios.get(
      'https://results.eci.gov.in/ResultAcGenMay2026/partywiseresult-S25.htm',
      {
        headers: {
          'User-Agent': 'Mozilla/5.0',
          'Accept': 'text/html',
          'Referer': 'https://results.eci.gov.in/'
        },
        timeout: 20000
      }
    );
    res.send(response.data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error fetching party data');
  }
});

// CANDIDATE-WISE
app.get('/candidates', async (req, res) => {
  try {
    const response = await axios.get(
      'https://results.eci.gov.in/ResultAcGenMay2026/ConstituencywiseS25.htm',
      {
        headers: {
          'User-Agent': 'Mozilla/5.0',
          'Accept': 'text/html',
          'Referer': 'https://results.eci.gov.in/'
        },
        timeout: 20000
      }
    );
    res.send(response.data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error fetching candidate data');
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log('Server running on ' + PORT));
