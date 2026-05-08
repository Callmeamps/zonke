const { createAdminClient } = require('./supabaseAdmin');

/**
 * Handle booking form submission.
 * Expected body: { name, email, preferred_date, message }
 * preferred_date can be ISO string or empty.
 */
async function handleBooking(body) {
  const { name, email, preferred_date, message } = body;

  if (!name || !email) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Name and email required' }) };
  }

  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from('bookings')
    .insert({
      name,
      email,
      preferred_date: preferred_date || null,
      message: message || null
    })
    .select('id')
    .single();

  if (error) {
    console.error('Supabase error:', error);
    return { statusCode: 500, body: JSON.stringify({ error: 'Database error' }) };
  }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ success: true, id: data.id })
  };
}

module.exports = { handleBooking };
