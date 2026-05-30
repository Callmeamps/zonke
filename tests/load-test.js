const autocannon = require('autocannon');

process.env.SUPABASE_URL = process.env.SUPABASE_URL || 'https://fake.supabase.co';
process.env.SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'fake-key';

const { createServer } = require('../server.testable');

const PORT = Number(process.env.TEST_PORT) || 3093;
const BASE_URL = `http://localhost:${PORT}`;

let serverInstance;

console.log('Running load test...\n');

async function runLoadTest() {
  const app = createServer();

  await new Promise((resolve) => {
    serverInstance = app.listen(PORT, () => {
      console.log(`Load test server listening on port ${PORT}`);
      resolve();
    });
  });

  const url = `${BASE_URL}/api/submit-audit`;

  const counter = autocannon({
    url,
    connections: 100,
    pipelining: 10,
    duration: 10,
    method: 'POST',
    body: JSON.stringify({ email: 'load@test.com', vertical: 'real_estate' }),
    headers: { 'Content-Type': 'application/json' },
  });

  autocannon.track(counter, { renderProgressBar: true });

  counter.on('done', (result) => {
    console.log('\nLoad test results for /api/submit-audit:');
    console.log(`  Duration: ${result.duration}s`);
    console.log(`  Requests: ${result.requests.total}`);
    console.log(`  Requests/sec: ${result.requests.average}`);
    console.log(`  Latency: avg=${result.latency.average.toFixed(2)}ms p95=${result.latency.p95.toFixed(2)}ms p99=${result.latency.p99.toFixed(2)}ms`);

    if (result.errors > 0) console.log(`  ⚠ Errors: ${result.errors}`);
    if (result.timeouts > 0) console.log(`  ⚠ Timeouts: ${result.timeouts}`);

    serverInstance.close();
    process.exit(result.errors === 0 && result.timeouts === 0 ? 0 : 1);
  });

  counter.on('error', (err) => {
    console.error('Load test error:', err.message);
    if (serverInstance) serverInstance.close();
    process.exit(1);
  });
}

runLoadTest().catch((err) => {
  console.error('Load test runner error:', err);
  if (serverInstance) serverInstance.close();
  process.exit(1);
});
