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
  'function invoiceDueSchedule(',
  'function invoiceWorkspaceFromForm(',
  'function saveInvoiceWorkspace(',
  'function restoreInvoiceWorkspace(',
  'function renderWorkspacePreview(',
  'function openPreviewPage(',
  'function buildMailtoURL(',
  'function dateRangeISO(',
  'function renderWorkSchedule(',
  'function toggleWorkDate(',
  'function applyWorkDaysToFirstLine(',
  'function syncWorkDayQuantity(',
  'function markQuantityOverride(',
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

for (const optionalTermsFeature of [
  'Payment terms (optional)',
  '<option value="">No due date</option>',
  "if(value==='')return {terms:null,dueDate:''}",
  "const overdue=inv.dueDate&&"
]) assert.ok(html.includes(optionalTermsFeature), `Missing optional payment-terms behavior: ${optionalTermsFeature}`);

for (const workspaceFeature of [
  'invoiceApp.invoiceWorkspace',
  'Saved automatically as you work.',
  'Restored your automatically saved invoice.',
  'id="navPreview"',
  "const MAIN_TABS=['home','new','preview','clients','items','brain']",
  "window.addEventListener('beforeunload',saveInvoiceWorkspace)"
]) assert.ok(html.includes(workspaceFeature), `Missing autosave/preview workspace behavior: ${workspaceFeature}`);

for (const locationFeature of [
  'One-way distance'
]) assert.ok(html.includes(locationFeature), `Missing project location/mileage behavior: ${locationFeature}`);

for (const removedLocationFeature of [
  'projectLocation',
  'mileageFrom',
  'invoiceApp.businessAddress',
  'Starting location',
  'Set my address',
  'maps.apple.com',
  'Open driving route'
]) assert.ok(!html.includes(removedLocationFeature), `Removed project-address behavior still present: ${removedLocationFeature}`);

for (const scheduleFeature of [
  'workDates',
  'offDates',
  'All dates in the range count as workdays automatically',
  'Resume automatic work-day quantity',
  'class="item-qty" type="number" min="0" step="1"',
  'id="modalLineQty" type="number" min="0" step="1"',
  'function editBusinessName()',
  'function saveBusinessName()',
  'function businessInitials()',
  "words[0][0]+words[words.length-1][0]",
  'Business name updated.',
  'Trips per workday',
  "row.dataset.qtyMode==='manual'",
  'oneWay*trips*workDays'
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
