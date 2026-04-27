const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRFHdACwK9UlClhcEsC8aiVmo-j-ziv804B2RbBhoDU7j-TeI6Okh-92J7gSqtWy0YoPHdDIPy7IBdX/pub?gid=0&single=true&output=csv';

// Serve static files (index.html)
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint — fetches CSV server-side (no CORS issues)
app.get('/api/products', async (req, res) => {
  try {
    const response = await fetch(CSV_URL);
    const csv = await response.text();
    res.setHeader('Content-Type', 'text/plain');
    res.send(csv);
  } catch (err) {
    console.error('Error fetching sheet:', err);
    res.status(500).send('Error fetching product data');
  }
});

app.listen(PORT, () => {
  console.log(`Shamrock catalog server running on port ${PORT}`);
});
