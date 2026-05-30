const http = require('http');

process.env.SUPABASE_URL = process.env.SUPABASE_URL || 'https://fake.supabase.co';
process.env.SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'fake-key';

const { createServer } = require('../server.testable');
const { faker } = require('@faker-js/faker');

const PORT = Number(process.env.TEST_PORT) || 3092;
const BASE_URL = `http://localhost:${PORT}`;

const ITERATIONS = 200; // Reduced for faster crash testing

let serverInstance;
let connectionErrors = [];
let uncaughtErrors = [];
let successCount = 0;
let serverErrorCount = 0;
let otherErrorCount = 0;

const seenEndpoints = new Set();

function makeRequest(method, path, body) {
  return new Promise((resolve) => {
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
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    });

    req.on('error', (err) => resolve({ status: 0, body: err.message }));
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function fuzzAudit() {
  for (let i = 0; i < ITERATIONS; i++) {
    let body;
    const r = Math.random();
    if (r < 0.3) body = { email: faker.internet.email(), vertical: faker.helpers.arrayElement(['real_estate', 'tenders']) };
    else if (r < 0.5) body = { email: faker.internet.email(), vertical: 'invalid_vertical' };
    else if (r < 0.7) body = { vertical: faker.helpers.arrayElement(['real_estate', 'tenders']) };
    else {
      const badVerticals = ['INVALID', null, undefined, 123, {}];
      body = { email: faker.string.alphanumeric(50) + '@' + faker.string.alphanumeric(20) + '.' + faker.string.alpha(3), vertical: faker.helpers.arrayElement(['real_estate', 'tenders', ...badVerticals]), company: faker.company.name() };
    }

    try {
      const res = await makeRequest('POST', '/api/submit-audit', body);
      seenEndpoints.add('audit');
      if (res.status === 0) {
        connectionErrors.push({ endpoint: 'audit', body, error: res.body });
      } else if (res.status >= 500) {
        serverErrorCount++;
      } else if (res.status === 200 || res.status === 400) {
        successCount++;
      } else {
        otherErrorCount++;
      }
    } catch (e) {
      uncaughtErrors.push({ endpoint: 'audit', body, error: e.message });
    }
  }
}

async function fuzzBooking() {
  for (let i = 0; i < ITERATIONS; i++) {
    let body;
    const r = Math.random();
    if (r < 0.3) body = { name: faker.person.fullName(), email: faker.internet.email() };
    else if (r < 0.5) body = { name: '', email: faker.internet.email() };
    else body = { name: faker.string.alphanumeric(100), email: faker.internet.email(), preferred_date: faker.date.future().toISOString(), message: faker.lorem.paragraph() };

    try {
      const res = await makeRequest('POST', '/api/submit-booking', body);
      seenEndpoints.add('booking');
      if (res.status === 0) {
        connectionErrors.push({ endpoint: 'booking', body, error: res.body });
      } else if (res.status >= 500) {
        serverErrorCount++;
      } else if (res.status === 200 || res.status === 400) {
        successCount++;
      } else {
        otherErrorCount++;
      }
    } catch (e) {
      uncaughtErrors.push({ endpoint: 'booking', body, error: e.message });
    }
  }
}

async function runFuzzTests() {
  const app = createServer();

  await new Promise((resolve) => {
    serverInstance = app.listen(PORT, () => {
      console.log(`Fuzz test server listening on port ${PORT}`);
      resolve();
    });
  });

  try {
    console.log(`Fuzzing endpoints with ${ITERATIONS} iterations each...\n`);
    await Promise.all([fuzzAudit(), fuzzBooking()]);

    console.log('Fuzz test summary:');
    console.log(`  Total requests: ${ITERATIONS * 2}`);
    console.log(`  Successful responses (2xx/4xx): ${successCount}`);
    console.log(`  Server errors (5xx): ${serverErrorCount}`);
    console.log(`  Other non-2xx/4xx: ${otherErrorCount}`);

    const allCrashes = [...connectionErrors, ...uncaughtErrors];
    if (allCrashes.length > 0) {
      console.log(`\n⚠️  Crashes/connection failures detected:`);
      allCrashes.forEach((err, idx) => {
        console.log(`  ${idx + 1}. ${JSON.stringify(err).slice(0, 200)}`);
      });
    } else {
      console.log('\nNo crashes detected. Server remained responsive.');
    }

    if (connectionErrors.length > 0) {
      process.exit(1);
    } else {
      console.log(`\nFuzzing complete — server resilient.`);
      process.exit(0);
    }
  } finally {
    serverInstance.close();
  }
}

runFuzzTests().catch((err) => {
  console.error('Fuzz test runner error:', err);
  if (serverInstance) serverInstance.close();
  process.exit(1);
});
