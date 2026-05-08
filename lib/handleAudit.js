const { createAdminClient } = require('./supabaseAdmin');

/**
 * Handle audit form submission.
 * Expected body: { email, company, vertical }
 */
async function handleAudit(body) {
  const { email, company, vertical } = body;

  // Basic validation
  if (!email || !vertical) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing required fields' }) };
  }

  if (!['real_estate', 'tenders'].includes(vertical)) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid vertical' }) };
  }

  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from('audits')
    .insert({
      email,
      company: company || null,
      vertical
    })
    .select('id')
    .single();

  if (error) {
    console.error('Supabase error:', error);
    return { statusCode: 500, body: JSON.stringify({ error: 'Database error' }) };
  }

  // Here you could trigger an email via Resend or similar.

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ success: true, id: data.id })
  };
}

module.exports = { handleAudit };
