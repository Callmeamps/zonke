const express = require('express');
const path = require('path');
const { handleAudit } = require('./lib/handleAudit');
const { handleBooking } = require('./lib/handleBooking');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(__dirname));

// API Routes
app.post('/api/submit-audit', async (req, res) => {
  try {
    const result = await handleAudit(req.body);
    res.status(result.statusCode || 200).json(result.body || result);
  } catch (err) {
    console.error('Audit error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/submit-booking', async (req, res) => {
  try {
    const result = await handleBooking(req.body);
    res.status(result.statusCode || 200).json(result.body || result);
  } catch (err) {
    console.error('Booking error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// SPA fallback: serve index.html for other routes (optional)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Zonke server listening on port ${PORT}`);
});
