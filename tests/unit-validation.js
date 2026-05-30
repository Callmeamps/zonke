const assert = require('assert');

// Set fake env before requiring modules that use it
process.env.SUPABASE_URL = 'https://fake.supabase.co';
process.env.SUPABASE_SERVICE_ROLE_KEY = 'fake-key';

const { handleAudit } = require('../lib/handleAudit');
const { handleBooking } = require('../lib/handleBooking');

console.log('Running unit validation tests...\n');

let passed = 0;
let failed = 0;

function testAuditValidation(name, body, expectedStatus) {
  try {
    const result = handleAudit(body);
    if (result.statusCode === expectedStatus) {
      console.log(`✓ ${name}`);
      passed++;
    } else {
      console.log(`✗ ${name}: expected status ${expectedStatus}, got ${result.statusCode}`);
      failed++;
    }
  } catch (err) {
    console.log(`✗ ${name}: threw error ${err.message}`);
    failed++;
  }
}

function testBookingValidation(name, body, expectedStatus) {
  try {
    const result = handleBooking(body);
    if (result.statusCode === expectedStatus) {
      console.log(`✓ ${name}`);
      passed++;
    } else {
      console.log(`✗ ${name}: expected status ${expectedStatus}, got ${result.statusCode}`);
      failed++;
    }
  } catch (err) {
    console.log(`✗ ${name}: threw error ${err.message}`);
    failed++;
  }
}

// Audit validation tests
console.log('Audit validation:');
testAuditValidation({ email: 'test@example.com', vertical: 'real_estate' }, 200);
testAuditValidation({ email: 'test@example.com', vertical: 'tenders' }, 200);
testAuditValidation({ email: 'test@example.com', company: 'Acme', vertical: 'real_estate' }, 200);
testAuditValidation({ email: 'bad-email', vertical: 'real_estate' }, 200);
testAuditValidation({ vertical: 'real_estate' }, 400);
testAuditValidation({ email: 'test@example.com' }, 400);
testAuditValidation({ email: 'test@example.com', vertical: 'invalid' }, 400);
testAuditValidation({}, 400);

console.log('\nBooking validation:');
testBookingValidation({ name: 'John', email: 'john@example.com' }, 200);
testBookingValidation({ name: 'John', email: 'john@example.com', preferred_date: '2026-05-20' }, 200);
testBookingValidation({ name: 'John', email: 'john@example.com', message: 'Test' }, 200);
testBookingValidation({ name: '', email: 'john@example.com' }, 200);
testBookingValidation({ name: 'John' }, 400);
testBookingValidation({ email: 'john@example.com' }, 400);
testBookingValidation({}, 400);

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
