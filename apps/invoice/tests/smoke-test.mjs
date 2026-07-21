import { readFile, access } from 'node:fs/promises';
import assert from 'node:assert/strict';

const html = await readFile(new URL('../app/index.html', import.meta.url), 'utf8');
const requiredFiles = ['manifest.webmanifest','service-worker.js','icon-192.png','icon-512.png'];
for (const file of requiredFiles) await access(new URL(`../app/${file}`, import.meta.url));

for (const feature of [
  'function saveInvoice(',
  'function previewInvoice(',
  'function markViewed(',
  'function markPaid(',
  'function recordPayment(',
  'function addPayment(',
  'function paymentTotal(',
  'function invoiceBalance(',
  'function duplicateCurrentInvoice(',
  'function buildInvoicePDF(',
  'function renderClients(',
  'function renderItems(',
  'function renderBrain('
]) assert.ok(html.includes(feature), `Missing baseline feature: ${feature}`);

for (const paymentFeature of [
  'payments:[]',
  "inv.status='partial'",
  'Invoice payment recorded',
  'Payment cannot exceed the remaining balance',
  'Invoice total cannot be less than the',
  'Paid in full'
]) assert.ok(html.includes(paymentFeature), `Missing partial-payment behavior: ${paymentFeature}`);

for (const key of [
  'invoiceApp.invoices',
  'invoiceApp.clients',
  'invoiceApp.items',
  'invoiceApp.brainEvents',
  'invoiceApp.taxRecords'
]) assert.ok(html.includes(key), `Missing storage key: ${key}`);

assert.match(html, /manifest\.webmanifest/);
assert.match(html, /serviceWorker\.register/);
console.log('Smoke tests passed: baseline features and PWA files are present.');
