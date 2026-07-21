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
  'function parseEmailList(',
  'function normalizeInvoiceContacts(',
  'function serviceDateLabel(',
  'function buildMailtoURL(',
  'function businessAddress(',
  'function useBusinessAddress(',
  'function dateRangeISO(',
  'function renderWorkSchedule(',
  'function toggleWorkDate(',
  'function applyWorkDaysToFirstLine(',
  'function duplicateCurrentInvoice(',
  'function buildInvoicePDF(',
  'function renderClients(',
  'function renderItems(',
  'function renderBrain('
]) assert.ok(html.includes(feature), `Missing baseline feature: ${feature}`);

for (const deliveryFeature of [
  'recipientEmails',
  'ccEmails',
  'bccEmails',
  'serviceStartDate',
  'serviceEndDate',
  'The work end date cannot be before the work start date',
  "query.push(`cc=",
  "query.push(`bcc="
]) assert.ok(html.includes(deliveryFeature), `Missing invoice delivery/date behavior: ${deliveryFeature}`);

for (const locationFeature of [
  'invoiceApp.businessAddress',
  'Starting location',
  'One-way distance'
]) assert.ok(html.includes(locationFeature), `Missing project location/mileage behavior: ${locationFeature}`);

for (const removedLocationFeature of [
  'projectLocation',
  'maps.apple.com',
  'Open driving route'
]) assert.ok(!html.includes(removedLocationFeature), `Removed project-address behavior still present: ${removedLocationFeature}`);

for (const scheduleFeature of [
  'workDates',
  'offDates',
  'All dates in the range count as workdays automatically',
  'Use work-day count as first line quantity'
]) assert.ok(html.includes(scheduleFeature), `Missing work-schedule behavior: ${scheduleFeature}`);

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
