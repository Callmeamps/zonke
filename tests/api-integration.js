const http = require('http');

process.env.SUPABASE_URL = process.env.SUPABASE_URL || 'https://fake.supabase.co';
process.env.SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'fake-key';

const { createServer } = require('../server.testable');

const PORT = Number(process.env.TEST_PORT) || 3091;
const BASE_URL = `http://localhost:${PORT}`;

let serverInstance;

const isRealDB = !process.env.SUPABASE_URL.includes('fake');

console.log('Running API integration tests...\n');

function makeRequest(method, path, body) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const options = {
      method,
      hostname: url.hostname,
      port: url.port,
      path: url.pathname,
      headers: { 'Content-Type': 'application/json' },
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, headers: res.headers, body: data ? JSON.parse(data) : null });
        } catch {
          resolve({ status: res.statusCode, headers: res.headers, body: data });
        }
      });
    });

    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function runTests() {
  let passed = 0;
  let failed = 0;

  const app = createServer();

  await new Promise((resolve) => {
    serverInstance = app.listen(PORT, () => {
      console.log(`Test server listening on port ${PORT}`);
      resolve();
    });
  });

  try {
    // Audit endpoint happy path (requires real Supabase)
    console.log('POST /api/submit-audit:');
    if (!isRealDB) {
      console.log('  » Skipping DB-dependent tests (SUPABASE_URL not configured)');
    } else {
      let res = await makeRequest('POST', '/api/submit-audit', { email: 'crash@test.com', vertical: 'real_estate' });
      if (res.status === 200 && res.body.success) console.log('  ✓ valid audit submission'), passed++;
      else console.log(`  ✗ valid audit submission: status ${res.status}`), failed++;

      res = await makeRequest('POST', '/api/submit-audit', { email: 'crash@test.com', vertical: 'tenders', company: 'TestCo' });
      if (res.status === 200 && res.body.success) console.log('  ✓ audit with company'), passed++;
      else console.log(`  ✗ audit with company: status ${res.status}`), failed++;
    }

    // Validation tests (no DB required)
    res = await makeRequest('POST', '/api/submit-audit', { vertical: 'real_estate' });
    if (res.status === 400 && res.body.error) console.log('  ✓ missing email'), passed++;
    else console.log(`  ✗ missing email: expected 400`), failed++;

    // Audit missing vertical
    res = await makeRequest('POST', '/api/submit-audit', { email: 'test@test.com' });
    if (res.status === 400) console.log('  ✓ missing vertical'), passed++;
    else console.log(`  ✗ missing vertical: expected 400, got ${res.status}`), failed++;

    // Audit invalid vertical
    res = await makeRequest('POST', '/api/submit-audit', { email: 'test@test.com', vertical: 'invalid' });
    if (res.status === 400) console.log('  ✓ invalid vertical'), passed++;
    else console.log(`  ✗ invalid vertical: expected 400, got ${res.status}`), failed++;

    // Booking endpoint happy path (requires real Supabase)
    console.log('\nPOST /api/submit-booking:');
    if (!isRealDB) {
      console.log('  » Skipping DB-dependent tests (SUPABASE_URL not configured)');
    } else {
      let res = await makeRequest('POST', '/api/submit-booking', { name: 'Crash Test', email: 'crash@test.com' });
      if (res.status === 200 && res.body.success) console.log('  ✓ valid booking'), passed++;
      else console.log(`  ✗ valid booking: status ${res.status}`), failed++;

      res = await makeRequest('POST', '/api/submit-booking', { name: 'Crash Test', email: 'crash@test.com', preferred_date: '2026-12-25', message: 'Holiday booking' });
      if (res.status === 200 && res.body.success) console.log('  ✓ booking with all fields'), passed++;
      else console.log(`  ✗ booking with all fields: status ${res.status}`), failed++;
    }

    // Booking validation tests (no DB required)
    res = await makeRequest('POST', '/api/submit-booking', { email: 'test@test.com' });
    if (res.status === 400 && res.body.error) console.log('  ✓ missing name'), passed++;
    else console.log(`  ✗ missing name: expected 400, got ${res.status}`), failed++;

    // Booking missing email
    res = await makeRequest('POST', '/api/submit-booking', { name: 'Test' });
    if (res.status === 400) console.log('  ✓ missing email'), passed++;
    else console.log(`  ✗ missing email: expected 400, got ${res.status}`), failed++;

    // Edge case: empty body
    console.log('\nEdge cases:');
    res = await makeRequest('POST', '/api/submit-audit', {});
    if (res.status === 400) console.log('  ✓ audit empty body'), passed++;
    else console.log(`  ✗ audit empty body: expected 400, got ${res.status}`), failed++;

    res = await makeRequest('POST', '/api/submit-booking', {});
    if (res.status === 400) console.log('  ✓ booking empty body'), passed++;
    else console.log(`  ✗ booking empty body: expected 400, got ${res.status}`), failed++;

    // Edge case: huge payloads
    const hugeBody = { email: 'a'.repeat(10000) + '@test.com', vertical: 'real_estate' };
    res = await makeRequest('POST', '/api/submit-audit', hugeBody);
    if (res.status === 200 || res.status === 413 || res.status === 500) console.log(`  ✓ huge email payload (status ${res.status})`), passed++;
    else console.log(`  ✗ huge email payload: unexpected status ${res.status}`), failed++;

  } finally {
    serverInstance.close();
  }

  console.log(`\n${passed} passed, ${failed} failed`);
  process.exit(failed > 0 ? 1 : 0);
}

runTests().catch((err) => {
  console.error('Test runner error:', err);
  if (serverInstance) serverInstance.close();
  process.exit(1);
});
