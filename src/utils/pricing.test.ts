import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateAnnualDiscount, calculateCustomQuote, validateContactForm } from './pricing';

test('calculateAnnualDiscount calculates 20% discount correctly', () => {
  assert.equal(calculateAnnualDiscount(3200), 2560);
  assert.equal(calculateAnnualDiscount(6800), 5440);
  assert.equal(calculateAnnualDiscount(14500), 11600);
  assert.equal(calculateAnnualDiscount(0), 0);
});

test('calculateCustomQuote aggregates add-on modules and handles rush modifier', () => {
  // Base tier only
  const baseOnly = calculateCustomQuote({
    tierBase: 5000,
    includeDesignSystem: false,
    include3DRendering: false,
    includeRapidPrototyping: false,
    turnaroundRush: false,
  });
  assert.equal(baseOnly, 5000);

  // With add-ons
  const withAddons = calculateCustomQuote({
    tierBase: 5000,
    includeDesignSystem: true, // +2400
    include3DRendering: true, // +3200
    includeRapidPrototyping: false,
    turnaroundRush: false,
  });
  assert.equal(withAddons, 10600);

  // With rush (+25%)
  const withRush = calculateCustomQuote({
    tierBase: 5000,
    includeDesignSystem: true, // 7400
    include3DRendering: false,
    includeRapidPrototyping: false,
    turnaroundRush: true, // 7400 * 1.25 = 9250
  });
  assert.equal(withRush, 9250);
});

test('validateContactForm checks name, valid email, and message length', () => {
  // Invalid empty data
  const invalidResult = validateContactForm({
    fullName: '',
    email: 'bad-email',
    projectCategory: 'Architecture',
    budgetRange: '$10k - $25k',
    message: 'short',
  });
  assert.equal(invalidResult.isValid, false);
  assert.ok(invalidResult.errors.fullName);
  assert.ok(invalidResult.errors.email);
  assert.ok(invalidResult.errors.message);

  // Valid complete data
  const validResult = validateContactForm({
    fullName: 'Elena Vance',
    email: 'elena@novacrest.com',
    projectCategory: 'Digital Craft',
    budgetRange: '$25k - $50k',
    message: 'We are redesigning our global architectural portfolio and brand identity.',
  });
  assert.equal(validResult.isValid, true);
  assert.equal(Object.keys(validResult.errors).length, 0);
});
