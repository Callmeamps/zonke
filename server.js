require('dotenv').config();
const express = require('express');
const path = require('path');
const { handleAudit } = require('./lib/handleAudit');
const { handleBooking } = require('./lib/handleBooking');
const { handleToolSubmit } = require('./lib/handleToolSubmit');

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

app.post('/api/tool-submit', async (req, res) => {
  try {
    const result = await handleToolSubmit(req.body);
    res.status(result.statusCode || 200).json(result.body || result);
  } catch (err) {
    console.error('Tool submit error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Page Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/real-estate', (req, res) => {
  res.sendFile(path.join(__dirname, 'real-estate.html'));
});

app.get('/tenders', (req, res) => {
  res.sendFile(path.join(__dirname, 'tenders.html'));
});

app.get('/pricing', (req, res) => {
  res.sendFile(path.join(__dirname, 'pricing.html'));
});

app.get('/brand-reel', (req, res) => {
  res.sendFile(path.join(__dirname, 'brand-reel.html'));
});

app.get('/lead-reactor', (req, res) => {
  res.sendFile(path.join(__dirname, 'lead-reactor.html'));
});

app.get('/tender-vault', (req, res) => {
  res.sendFile(path.join(__dirname, 'tender-vault.html'));
});

app.get('/audit-thanks', (req, res) => {
  res.sendFile(path.join(__dirname, 'audit-thanks.html'));
});

app.get('/tools', (req, res) => {
  res.sendFile(path.join(__dirname, 'tools', 'index.html'));
});

// Tool Routes
app.get('/tools/lead-leak-calculator', (req, res) => {
  res.sendFile(path.join(__dirname, 'tools', 'lead-leak-calculator.html'));
});

app.get('/tools/viewing-optimizer', (req, res) => {
  res.sendFile(path.join(__dirname, 'tools', 'viewing-optimizer.html'));
});

app.get('/tools/bid-roi-analyzer', (req, res) => {
  res.sendFile(path.join(__dirname, 'tools', 'bid-roi-analyzer.html'));
});

app.get('/tools/property-market-pulse', (req, res) => {
  res.sendFile(path.join(__dirname, 'tools', 'property-market-pulse.html'));
});

app.get('/tools/response-time-simulator', (req, res) => {
  res.sendFile(path.join(__dirname, 'tools', 'response-time-simulator.html'));
});

app.get('/tools/tender-fit-score', (req, res) => {
  res.sendFile(path.join(__dirname, 'tools', 'tender-fit-score.html'));
});

app.get('/tools/commission-forecaster', (req, res) => {
  res.sendFile(path.join(__dirname, 'tools', 'commission-forecaster.html'));
});

app.get('/tools/deadline-drift-calculator', (req, res) => {
  res.sendFile(path.join(__dirname, 'tools', 'deadline-drift-calculator.html'));
});

app.get('/tools/compliance-radar', (req, res) => {
  res.sendFile(path.join(__dirname, 'tools', 'compliance-radar.html'));
});

app.get('/tools/ai-readiness-scanner', (req, res) => {
  res.sendFile(path.join(__dirname, 'tools', 'ai-readiness-scanner.html'));
});

app.get('/tools/automation-roi-calculator', (req, res) => {
  res.sendFile(path.join(__dirname, 'tools', 'automation-roi-calculator.html'));
});

app.get('/tools/workflow-automator', (req, res) => {
  res.sendFile(path.join(__dirname, 'tools', 'workflow-automator.html'));
});

app.get('/tools/tender-leak-calculator', (req, res) => {
  res.sendFile(path.join(__dirname, 'tools', 'tender-leak-calculator.html'));
});

// SPA fallback: serve index.html for other routes (optional)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Zonke server listening on port ${PORT}`);
});
