const { createAdminClient } = require('./supabaseAdmin');
const { Resend } = require('resend');

let resend;
function getResend() {
  if (!resend) resend = new Resend(process.env.RESEND_API_KEY);
  return resend;
}
const FROM = process.env.RESEND_FROM || 'callmeamps@garatenuav.resend.app';
const REPLY_TO = process.env.RESEND_REPLY_TO || 'replies@garatenuav.resend.app';

async function handleToolSubmit(body) {
  const { tool_id, email, results } = body;

  if (!tool_id || !email) {
    return { statusCode: 400, body: { error: 'Missing required fields' } };
  }

  if (!email.includes('@')) {
    return { statusCode: 400, body: { error: 'Invalid email' } };
  }

  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from('tool_submissions')
    .insert({
      tool_id,
      email,
      results: results || null,
      score: results?.leakedRevenue || results?.score || null
    })
    .select('id')
    .single();

  if (error) {
    console.error('Supabase error:', error);
    return { statusCode: 500, body: { error: 'Database error' } };
  }

  // Send report email via Resend
  try {
    const subject = getSubject(tool_id);
    const html = buildReportEmail(tool_id, results);

    await getResend().emails.send({
      from: FROM,
      to: email,
      reply_to: REPLY_TO,
      subject,
      html,
    });
  } catch (emailErr) {
    // Log but don't fail — submission already saved
    console.error('Resend email error:', emailErr.message);
  }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: { success: true, id: data.id }
  };
}

function getSubject(tool_id) {
  const subjects = {
    'lead-leak-calculator': 'Your Lead Leak Report — Zonke',
    'response-time-simulator': 'Your Response Time Report — Zonke',
    'commission-forecaster': 'Your Commission Forecast — Zonke',
    'viewing-optimizer': 'Your Viewing Schedule — Zonke',
    'property-market-pulse': 'Your Market Pulse Report — Zonke',
    'tender-fit-score': 'Your Tender Fit Score — Zonke',
    'deadline-drift-calculator': 'Your Deadline Drift Report — Zonke',
    'bid-roi-analyzer': 'Your Bid ROI Analysis — Zonke',
    'compliance-radar': 'Your Compliance Report — Zonke',
    'ai-readiness-scanner': 'Your AI Readiness Report — Zonke',
    'automation-roi-calculator': 'Your Automation ROI Report — Zonke',
    'workflow-automator': 'Your Workflow Playbook — Zonke',
    'tender-leak-calculator': 'Your Tender Leak Report — Zonke',
  };
  return subjects[tool_id] || 'Your Report — Zonke';
}

function buildReportEmail(tool_id, results) {
  const r = results || {};
  const toolName = tool_id.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  let keyMetrics = '';
  if (r.leakedRevenue) keyMetrics += `<tr><td style="padding:8px;border-bottom:1px solid #333;">Lost Revenue</td><td style="padding:8px;border-bottom:1px solid #333;color:#c3f400;font-weight:bold;">R${Math.round(r.leakedRevenue).toLocaleString()}</td></tr>`;
  if (r.score !== undefined) keyMetrics += `<tr><td style="padding:8px;border-bottom:1px solid #333;">Score</td><td style="padding:8px;border-bottom:1px solid #333;color:#c3f400;font-weight:bold;">${r.score}%</td></tr>`;
  if (r.optimizedRate) keyMetrics += `<tr><td style="padding:8px;border-bottom:1px solid #333;">Optimized Rate</td><td style="padding:8px;border-bottom:1px solid #333;color:#c3f400;font-weight:bold;">${r.optimizedRate}%</td></tr>`;
  if (r.driftDays) keyMetrics += `<tr><td style="padding:8px;border-bottom:1px solid #333;">Drift Days</td><td style="padding:8px;border-bottom:1px solid #333;color:#ff571c;font-weight:bold;">${r.driftDays}</td></tr>`;
  if (r.compliancePercent !== undefined) keyMetrics += `<tr><td style="padding:8px;border-bottom:1px solid #333;">Compliance</td><td style="padding:8px;border-bottom:1px solid #333;color:#c3f400;font-weight:bold;">${r.compliancePercent}%</td></tr>`;
  if (r.roiPercent) keyMetrics += `<tr><td style="padding:8px;border-bottom:1px solid #333;">ROI</td><td style="padding:8px;border-bottom:1px solid #333;color:#c3f400;font-weight:bold;">${r.roiPercent}%</td></tr>`;

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#121414;font-family:'JetBrains Mono',monospace;">
  <div style="max-width:600px;margin:0 auto;padding:32px;">
    <div style="border:2px solid #c3f400;padding:24px;margin-bottom:24px;">
      <h1 style="color:#c3f400;font-size:24px;margin:0 0 8px;">> ${toolName.toUpperCase()}</h1>
      <p style="color:#8e9379;font-size:12px;margin:0;text-transform:uppercase;letter-spacing:0.1em;">ZONKE AI NATIVE STUDIO</p>
    </div>

    ${keyMetrics ? `
    <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
      <thead><tr><th style="text-align:left;padding:8px;border-bottom:2px solid #c3f400;color:#fff;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;">Metric</th><th style="text-align:left;padding:8px;border-bottom:2px solid #c3f400;color:#fff;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;">Value</th></tr></thead>
      <tbody>${keyMetrics}</tbody>
    </table>` : ''}

    <div style="border:1px solid #333;padding:16px;margin-bottom:24px;">
      <p style="color:#e2e2e2;font-size:14px;line-height:1.6;margin:0;">
        This is your automated report from Zonke. To discuss these results and explore how we can implement these improvements for your business, reply to this email or book a consultation.
      </p>
    </div>

    <a href="https://zonke.site/pricing" style="display:block;background:#c3f400;color:#283500;text-align:center;padding:16px;text-decoration:none;font-weight:bold;font-size:14px;text-transform:uppercase;letter-spacing:0.1em;">
      BOOK CONSULTATION →
    </a>

    <p style="color:#8e9379;font-size:11px;text-align:center;margin-top:24px;">
      Zonke AI Native Studio — Emalahleni, South Africa<br>
      <a href="mailto:replies@garatenuav.resend.app" style="color:#8e9379;">replies@garatenuav.resend.app</a>
    </p>
  </div>
</body>
</html>`;
}

module.exports = { handleToolSubmit };
