<template>
  <div class="checklist-download">
    <p>Download the form below, fill it in, and submit it to the Nebras Open Finance team as part of your production access request.</p>
    <button class="download-btn" @click="download">
      Download Functional Evidence — Bank Data Sharing (.doc)
    </button>
  </div>
</template>

<script setup>
function download() {
  const html = generateDocument()
  const blob = new Blob(['\ufeff', html], { type: 'application/msword' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'nebras-functional-evidence-bank-data-sharing.doc'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

function generateDocument() {
  return `<html xmlns:o='urn:schemas-microsoft-com:office:office'
               xmlns:w='urn:schemas-microsoft-com:office:word'
               xmlns='http://www.w3.org/TR/REC-html40'>
<head>
<meta charset='utf-8'>
<title>Nebras Open Finance — Functional Evidence: Bank Data Sharing</title>
<style>
  body        { font-family: Calibri, Arial, sans-serif; font-size: 11pt; margin: 2.5cm 2.5cm 2.5cm 2.5cm; color: #111; }
  h1          { font-size: 20pt; font-weight: bold; color: #0f172a; margin-bottom: 4pt; }
  h2          { font-size: 13pt; font-weight: bold; color: #0f172a; border-bottom: 2px solid #cbd5e1; padding-bottom: 3pt; margin-top: 18pt; margin-bottom: 8pt; }
  h3          { font-size: 11pt; font-weight: bold; color: #1e40af; margin-top: 14pt; margin-bottom: 4pt; }
  p           { margin: 4pt 0; }
  .subtitle   { font-size: 11pt; color: #475569; margin-bottom: 16pt; }
  table       { width: 100%; border-collapse: collapse; margin: 8pt 0; font-size: 10.5pt; }
  th          { background: #f1f5f9; font-weight: bold; text-align: left; padding: 6pt 8pt; border: 1pt solid #cbd5e1; font-size: 10pt; }
  td          { padding: 6pt 8pt; border: 1pt solid #cbd5e1; vertical-align: top; }
  .label      { width: 38%; background: #f8fafc; font-weight: bold; }
  .note       { font-size: 9.5pt; color: #6b7280; font-style: italic; margin: 4pt 0 10pt 0; }
  .paste-box  { border: 1pt solid #cbd5e1; background: #f8fafc; padding: 10pt; min-height: 60pt; margin: 6pt 0; font-size: 10pt; color: #94a3b8; font-style: italic; }
  .section-note { font-size: 9.5pt; color: #6b7280; font-style: italic; margin: 0 0 8pt 0; }
  .signoff    { margin-top: 20pt; }
  .signoff-row{ margin: 10pt 0; }
  .field-line { display: inline-block; border-bottom: 1pt solid #374151; vertical-align: bottom; }
  .box        { font-size: 13pt; margin-right: 6pt; }
  hr          { border: none; border-top: 1pt solid #e2e8f0; margin: 16pt 0; }
</style>
</head>
<body>

<h1>Nebras Open Finance</h1>
<p class="subtitle">Functional Evidence — Bank Data Sharing</p>
<hr>
<p style="font-size:9.5pt; color:#6b7280;">
  Complete all sections and submit this document to the Nebras Open Finance team as part of your production access request.
  All sections are required unless marked optional. Evidence must be from the AlTareq Model Bank sandbox environment.
  Incomplete submissions will be returned.
</p>


<h2>1. Proposition Overview</h2>
<p class="section-note">Describe the product or service you are building and how Bank Data Sharing supports it.</p>
<table>
  <tr><td class="label">TPP / Application name</td><td></td></tr>
  <tr><td class="label">Proposition description</td><td><em>Describe what your product does and the user need it serves</em></td></tr>
  <tr><td class="label">How data sharing is used</td><td><em>Explain which account data your proposition reads and why — e.g. "We read balances and transactions to generate a spending report for the user"</em></td></tr>
  <tr><td class="label">User type</td><td><em>Retail / SME / Corporate</em></td></tr>
  <tr><td class="label">OpenFinanceBilling Purpose</td><td><em>The Purpose value you set — e.g. AccountAggregation, BudgetingAnalysis</em></td></tr>
</table>


<h2>2. Consent Definition</h2>
<p class="section-note">Paste the exact authorization_details object you send inside your PAR request JWT, then justify every field.</p>

<h3>2a. Your authorization_details</h3>
<p>Paste your complete authorization_details object below. Do not redact any fields.</p>
<div class="paste-box">Paste authorization_details JSON here</div>

<h3>2b. Field Justification</h3>
<p class="section-note">For every field you set, explain why it is present. For every permission in Permissions, state which API endpoint requires it.</p>
<table>
  <tr>
    <th style="width:32%;">Field</th>
    <th style="width:28%;">Value set</th>
    <th>Justification</th>
  </tr>
  <tr><td><code>ConsentId</code></td><td></td><td><em>e.g. UUID generated at consent creation time by our system</em></td></tr>
  <tr><td><code>ExpirationDateTime</code></td><td></td><td><em>e.g. 90 days from consent creation — matches our session model</em></td></tr>
  <tr><td><code>OpenFinanceBilling.UserType</code></td><td></td><td></td></tr>
  <tr><td><code>OpenFinanceBilling.Purpose</code></td><td></td><td></td></tr>
  <tr><td><code>FromDate</code> (if set)</td><td></td><td></td></tr>
  <tr><td><code>ToDate</code> (if set)</td><td></td><td></td></tr>
  <tr><td><code>AccountType</code> (if set)</td><td></td><td></td></tr>
  <tr><td><code>AccountSubType</code> (if set)</td><td></td><td></td></tr>
  <tr><td><code>BaseConsentId</code> (if set)</td><td></td><td></td></tr>
  <tr><td><code>OnBehalfOf</code> (if set)</td><td></td><td></td></tr>
</table>

<p style="margin-top:10pt;"><strong>Permission justification</strong> — complete a row for each permission in your Permissions array. Remove rows for permissions you do not request.</p>
<table>
  <tr>
    <th style="width:28%;">Permission</th>
    <th style="width:32%;">Endpoint(s) that require it</th>
    <th style="width:12%;">Used?</th>
    <th>Reason</th>
  </tr>
  <tr><td><code>ReadAccountsBasic</code></td><td>GET /accounts</td><td>Yes / No</td><td></td></tr>
  <tr><td><code>ReadAccountsDetail</code></td><td>GET /accounts, GET /accounts/{AccountId}</td><td>Yes / No</td><td></td></tr>
  <tr><td><code>ReadBalances</code></td><td>GET /accounts/{AccountId}/balances</td><td>Yes / No</td><td></td></tr>
  <tr><td><code>ReadTransactionsBasic</code></td><td>GET /accounts/{AccountId}/transactions</td><td>Yes / No</td><td></td></tr>
  <tr><td><code>ReadTransactionsDetail</code></td><td>GET /accounts/{AccountId}/transactions</td><td>Yes / No</td><td></td></tr>
  <tr><td><code>ReadBeneficiariesBasic</code></td><td>GET /accounts/{AccountId}/beneficiaries</td><td>Yes / No</td><td></td></tr>
  <tr><td><code>ReadBeneficiariesDetail</code></td><td>GET /accounts/{AccountId}/beneficiaries</td><td>Yes / No</td><td></td></tr>
  <tr><td><code>ReadDirectDebits</code></td><td>GET /accounts/{AccountId}/direct-debits</td><td>Yes / No</td><td></td></tr>
  <tr><td><code>ReadStandingOrdersBasic</code></td><td>GET /accounts/{AccountId}/standing-orders</td><td>Yes / No</td><td></td></tr>
  <tr><td><code>ReadStandingOrdersDetail</code></td><td>GET /accounts/{AccountId}/standing-orders</td><td>Yes / No</td><td></td></tr>
  <tr><td><code>ReadScheduledPaymentsBasic</code></td><td>GET /accounts/{AccountId}/scheduled-payments</td><td>Yes / No</td><td></td></tr>
  <tr><td><code>ReadScheduledPaymentsDetail</code></td><td>GET /accounts/{AccountId}/scheduled-payments</td><td>Yes / No</td><td></td></tr>
  <tr><td><code>ReadStatements</code></td><td>GET /accounts/{AccountId}/statements</td><td>Yes / No</td><td></td></tr>
  <tr><td><code>ReadPartyUser</code></td><td>GET /parties, GET /accounts/{AccountId}/parties</td><td>Yes / No</td><td></td></tr>
  <tr><td><code>ReadPartyUserIdentity</code></td><td>GET /parties, GET /accounts/{AccountId}/parties</td><td>Yes / No</td><td></td></tr>
  <tr><td><code>ReadParty</code></td><td>GET /accounts/{AccountId}/parties</td><td>Yes / No</td><td></td></tr>
  <tr><td><code>ReadProduct</code></td><td>(product sub-resource)</td><td>Yes / No</td><td></td></tr>
  <tr><td><code>ReadProductFinanceRates</code></td><td>(product sub-resource)</td><td>Yes / No</td><td></td></tr>
</table>


<h2>3. Model Bank Evidence</h2>
<p class="section-note">
  For each endpoint your proposition calls, provide evidence of a successful 200 OK response from the AlTareq Model Bank.
  Include the full response body or a clearly readable excerpt.
  Use the Model Bank accounts for mits or rora.
</p>

<h3>3a. Consent Authorised</h3>
<p>Provide the response from GET /account-access-consents/{ConsentId} showing Status: Authorized.</p>
<div class="paste-box">Paste GET /account-access-consents/{ConsentId} response here</div>
<table>
  <tr><th style="width:38%;">Field</th><th>Observed value</th></tr>
  <tr><td>ConsentId</td><td></td></tr>
  <tr><td>Status</td><td><em>Authorized</em></td></tr>
  <tr><td>ExpirationDateTime</td><td></td></tr>
  <tr><td>Permissions (list)</td><td></td></tr>
</table>

<h3>3b. GET /accounts</h3>
<div class="paste-box">Paste response body (or excerpt showing at least one account)</div>
<table>
  <tr><td class="label">HTTP status</td><td>200</td></tr>
  <tr><td class="label">AccountId used in subsequent calls</td><td></td></tr>
</table>

<h3>3c. GET /accounts/{AccountId}/balances</h3>
<div class="paste-box">Paste response body</div>
<table>
  <tr><td class="label">HTTP status</td><td>200</td></tr>
  <tr><td class="label">AccountId</td><td></td></tr>
</table>

<h3>3d. GET /accounts/{AccountId}/transactions</h3>
<div class="paste-box">Paste response body (excerpt of at least one transaction is sufficient)</div>
<table>
  <tr><td class="label">HTTP status</td><td>200</td></tr>
  <tr><td class="label">AccountId</td><td></td></tr>
</table>

<h3>3e. Additional endpoints (repeat for each endpoint your proposition calls)</h3>
<p class="section-note">For each additional endpoint (/beneficiaries, /direct-debits, /standing-orders, /scheduled-payments, /statements, /parties), add a section in the same format as 3b–3d.</p>
<div class="paste-box">Endpoint: GET /accounts/{AccountId}/___________<br>Paste response body here</div>
<table>
  <tr><td class="label">Endpoint</td><td></td></tr>
  <tr><td class="label">HTTP status</td><td>200</td></tr>
  <tr><td class="label">AccountId</td><td></td></tr>
</table>


<h2>4. Consent State Handling</h2>
<p class="section-note">Describe how your application tracks and responds to consent state changes.</p>
<table>
  <tr>
    <th style="width:38%;">Scenario</th>
    <th>How your application handles it</th>
  </tr>
  <tr><td>Consent moves to <code>Revoked</code></td><td></td></tr>
  <tr><td>Consent moves to <code>Expired</code></td><td></td></tr>
  <tr><td>Access token expires mid-session</td><td></td></tr>
  <tr><td>Refresh token is rejected (<code>invalid_grant</code>)</td><td></td></tr>
</table>


<h2>5. Minimum Permissions Declaration</h2>
<table>
  <tr>
    <th style="width:78%;">Declaration</th>
    <th style="width:12%;">Confirmed</th>
  </tr>
  <tr>
    <td>Every permission in my Permissions array has a corresponding row in the table in section 2b</td>
    <td style="text-align:center; color:#374151;">Yes &nbsp;/&nbsp; No</td>
  </tr>
  <tr>
    <td>I have not requested any permission for data that is not displayed or used within my proposition</td>
    <td style="text-align:center; color:#374151;">Yes &nbsp;/&nbsp; No</td>
  </tr>
  <tr>
    <td>I am not requesting permissions speculatively for future features not yet built</td>
    <td style="text-align:center; color:#374151;">Yes &nbsp;/&nbsp; No</td>
  </tr>
</table>

<div class="signoff">
  <div class="signoff-row"><strong>Signed off by:</strong>&nbsp;&nbsp;<span class="field-line" style="min-width:280px;">&nbsp;</span>&nbsp;&nbsp;<em>(name and role)</em></div>
  <div class="signoff-row"><strong>Date:</strong>&nbsp;&nbsp;<span class="field-line" style="min-width:200px;">&nbsp;</span></div>
</div>

<hr>
<p style="font-size:9pt; color:#94a3b8; text-align:center;">
  Nebras Open Finance — Functional Evidence: Bank Data Sharing &nbsp;|&nbsp; Submit to the Open Finance team alongside your integration request.
</p>

</body>
</html>`
}
</script>

<style scoped>
.checklist-download {
  margin: 24px 0;
  padding: 20px 24px;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
}

.checklist-download p {
  margin: 0 0 16px 0;
  color: var(--vp-c-text-2);
  font-size: 14px;
}

.download-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: var(--vp-c-brand-1);
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.download-btn:hover {
  background: var(--vp-c-brand-2);
}
</style>
