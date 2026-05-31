require('dotenv').config();
const express = require('express');
const path = require('path');
const { handleAudit } = require('./lib/handleAudit');
const { handleBooking } = require('./lib/handleBooking');
const { handleToolSubmit } = require('./lib/handleToolSubmit');
const { createAdminClient } = require('./lib/supabaseAdmin');

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

// Internal Auth
app.post('/api/internal/verify', (req, res) => {
  const { password } = req.body;
  const validPassword = process.env.INTERNAL_PASSWORD || 'zonke2024';
  if (password === validPassword) {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false });
  }
});

// Internal Stats (Dashboard)
app.get('/api/internal/stats', async (req, res) => {
  try {
    const client = createAdminClient();
    
    // Fetch all data
    const [audits, bookings, toolSubmissions] = await Promise.all([
      client.from('audits').select('*').order('created_at', { ascending: false }),
      client.from('bookings').select('*').order('created_at', { ascending: false }),
      client.from('tool_submissions').select('*').order('created_at', { ascending: false })
    ]);

    const auditsData = audits.data || [];
    const bookingsData = bookings.data || [];
    const toolsData = toolSubmissions.data || [];

    // KPIs
    const kpis = {
      audits: {
        total: auditsData.length,
        byVertical: auditsData.reduce((acc, a) => {
          acc[a.vertical] = (acc[a.vertical] || 0) + 1;
          return acc;
        }, {})
      },
      bookings: bookingsData.length,
      tools: toolsData.length,
      total: auditsData.length + bookingsData.length + toolsData.length
    };

    // 30-day submissions chart
    const days = 30;
    const labels = [];
    const now = new Date();
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      labels.push(d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
    }

    const auditCounts = new Array(days).fill(0);
    const bookingCounts = new Array(days).fill(0);
    const toolCounts = new Array(days).fill(0);

    const toDateKey = (d) => d.toISOString().split('T')[0];

    auditsData.forEach(a => {
      const idx = labels.findIndex(l => toDateKey(new Date(a.created_at)) === toDateKey(new Date(l)));
      if (idx >= 0) auditCounts[idx]++;
    });
    bookingsData.forEach(b => {
      const idx = labels.findIndex(l => toDateKey(new Date(b.created_at)) === toDateKey(new Date(l)));
      if (idx >= 0) bookingCounts[idx]++;
    });
    toolsData.forEach(t => {
      const idx = labels.findIndex(l => toDateKey(new Date(t.created_at)) === toDateKey(new Date(l)));
      if (idx >= 0) toolCounts[idx]++;
    });

    // Tools by type
    const toolsByType = toolsData.reduce((acc, t) => {
      acc[t.tool_id] = (acc[t.tool_id] || 0) + 1;
      return acc;
    }, {});

    // Recent activity
    const recent = [
      ...auditsData.map(a => ({ type: 'audit', email: a.email, details: a.vertical, created_at: a.created_at })),
      ...bookingsData.map(b => ({ type: 'booking', email: b.email, details: b.name, created_at: b.created_at })),
      ...toolsData.map(t => ({ type: 'tool', email: t.email, details: t.tool_id, created_at: t.created_at }))
    ].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 50);

    res.json({
      kpis,
      charts: {
        submissions: { labels, audits: auditCounts, bookings: bookingCounts, tools: toolCounts },
        tools: toolsByType
      },
      recent
    });
  } catch (err) {
    console.error('Stats error:', err);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// Internal: Get all audits
app.get('/api/internal/audits', async (req, res) => {
  try {
    const client = createAdminClient();
    const { data, error } = await client.from('audits').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error('Audits error:', err);
    res.status(500).json({ error: 'Failed to fetch audits' });
  }
});

// Internal: Get all bookings
app.get('/api/internal/bookings', async (req, res) => {
  try {
    const client = createAdminClient();
    const { data, error } = await client.from('bookings').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error('Bookings error:', err);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// Internal: Get all tool submissions
app.get('/api/internal/tool-submissions', async (req, res) => {
  try {
    const client = createAdminClient();
    const { data, error } = await client.from('tool_submissions').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error('Tool submissions error:', err);
    res.status(500).json({ error: 'Failed to fetch tool submissions' });
  }
});

// Page Routes
app.get('/internal', (req, res) => {
  res.sendFile(path.join(__dirname, 'internal', 'index.html'));
});

app.get('/internal/dashboard.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'internal', 'dashboard.html'));
});

app.get('/internal/leads.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'internal', 'leads.html'));
});

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

app.get('/booking-thanks', (req, res) => {
  res.sendFile(path.join(__dirname, 'booking-thanks.html'));
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
