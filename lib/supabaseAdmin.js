const { PostgrestClient } = require('@supabase/postgrest-js');

/**
 * Create a Supabase admin client using Postgrest.
 * For server-side use only (inserts/update - no realtime, no auth needed).
 */
function createAdminClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set');
  }

  return new PostgrestClient(`${url}/rest/v1`, {
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
    },
  });
}

module.exports = { createAdminClient };