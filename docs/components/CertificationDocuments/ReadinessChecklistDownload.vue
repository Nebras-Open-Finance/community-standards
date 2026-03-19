<template>
  <div class="checklist-download">
    <p>When you are ready to apply for production access, download the form below, fill it in, and submit it to the Nebras Open Finance team alongside your other certification evidence.</p>
    <button class="download-btn" @click="download">
      Download Readiness Checklist (.doc)
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
  a.download = 'nebras-readiness-checklist.doc'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

function row(text, notes = '') {
  return `<tr>
    <td style="width:58%;">${text}</td>
    <td style="width:10%; text-align:center; color:#374151;">Yes &nbsp;/&nbsp; No</td>
    <td style="color:#6b7280; font-style:italic;">${notes}</td>
  </tr>`
}

function section(title, rows) {
  return `
<h3>${title}</h3>
<table>
  <tr>
    <th style="width:58%;">Requirement</th>
    <th style="width:10%;">Confirmed</th>
    <th>Notes / Evidence</th>
  </tr>
  ${rows.join('\n  ')}
</table>`
}

function generateDocument() {
  return `<html xmlns:o='urn:schemas-microsoft-com:office:office'
               xmlns:w='urn:schemas-microsoft-com:office:word'
               xmlns='http://www.w3.org/TR/REC-html40'>
<head>
<meta charset='utf-8'>
<title>Nebras Open Finance — Readiness Checklist</title>
<!--[if gte mso 9]><xml>
  <w:WordDocument>
    <w:View>Normal</w:View>
    <w:Zoom>100</w:Zoom>
    <w:DoNotOptimizeForBrowser/>
  </w:WordDocument>
</xml><![endif]-->
<style>
  @page    { margin: 2.5cm; mso-page-orientation: portrait; size: 21cm 29.7cm; }
  body        { font-family: Calibri, Arial, sans-serif; font-size: 11pt; color: #111; }
  h1          { font-size: 20pt; font-weight: bold; color: #0f172a; margin-bottom: 4pt; }
  h2          { font-size: 13pt; font-weight: bold; color: #0f172a; border-bottom: 2px solid #cbd5e1; padding-bottom: 3pt; margin-top: 18pt; margin-bottom: 8pt; }
  h3          { font-size: 11pt; font-weight: bold; color: #1e40af; margin-top: 14pt; margin-bottom: 4pt; }
  p           { margin: 4pt 0; }
  .subtitle   { font-size: 11pt; color: #475569; margin-bottom: 16pt; }
  table       { width: 100%; border-collapse: collapse; margin: 8pt 0; font-size: 10.5pt; table-layout: fixed; mso-table-layout-alt: fixed; }
  th          { background: #f1f5f9; font-weight: bold; text-align: left; padding: 6pt 8pt; border: 1pt solid #cbd5e1; font-size: 10pt; word-wrap: break-word; }
  td          { padding: 6pt 8pt; border: 1pt solid #cbd5e1; vertical-align: top; word-wrap: break-word; }
  .section-note { font-size: 9.5pt; color: #6b7280; font-style: italic; margin: 0 0 8pt 0; }
  .declaration-item { margin: 6pt 0; }
  .box        { font-size: 13pt; margin-right: 6pt; }
  .signoff    { margin-top: 20pt; }
  .signoff-row{ margin: 10pt 0; }
  .field-line { display: inline-block; border-bottom: 1pt solid #374151; vertical-align: bottom; }
  hr          { border: none; border-top: 1pt solid #e2e8f0; margin: 16pt 0; }
</style>
</head>
<body>

<h1>Nebras Open Finance</h1>
<p class="subtitle">Readiness Checklist — Production Access Application</p>
<hr>
<p style="font-size:9.5pt; color:#6b7280;">
  Complete all sections and submit this document to the Nebras Open Finance team alongside your
  Functional Evidence, User Experience Evidence, FAPI Conformance results, and Security Validation.
  Incomplete submissions will be returned. All sandbox testing must be performed against the AlTareq Model Bank.
</p>


<h2>1. Applicant Details</h2>
<table>
  <tr><td style="width:38%; background:#f8fafc; font-weight:bold;">TPP / Application name</td><td></td></tr>
  <tr><td style="background:#f8fafc; font-weight:bold;">Organisation name</td><td></td></tr>
  <tr><td style="background:#f8fafc; font-weight:bold;">Organisation ID</td><td><em>As registered in the Trust Framework Directory</em></td></tr>
  <tr><td style="background:#f8fafc; font-weight:bold;">Contact name</td><td></td></tr>
  <tr><td style="background:#f8fafc; font-weight:bold;">Contact email</td><td></td></tr>
  <tr><td style="background:#f8fafc; font-weight:bold;">Submission date</td><td></td></tr>
</table>


<h2>2. Readiness Checklist</h2>
<p class="section-note">For every item, circle Yes or No and provide the requested evidence or identifier in the Notes column. All items must be Yes before production access can be granted.</p>

${section('2.1 Trust Framework', [
  row('Organisation is registered in the Trust Framework Directory.', 'Organisation ID:'),
  row('Application has been created with the correct roles assigned (e.g. BDSP, BSIP).', 'Application name: <br>Roles assigned:'),
  row('At least one Transport Certificate is active and installed for mTLS.', 'Certificate thumbprint:'),
  row('At least one Signing Certificate is active and available for JWT signing.', 'Certificate thumbprint: <br>Key ID (kid):'),
  row('Production private keys are stored securely, never leave the company\'s estate, and are never committed to source control — a FIPS 140-3 certified HSM or KMS that supports UAE data residency requirements must be used.', 'HSM / KMS provider:'),
  row('Certificate expiry is actively monitored and the firm has a documented process to rotate certificates before expiry.', 'Monitoring mechanism:'),
  row('All Redirect URIs are registered in the Directory and exactly match what the application sends in authorisation requests.', 'Redirect URI(s):'),
  row('Organisation and Application logos are set in the Trust Framework Directory and accurately represent the organisation and the specific application (service the customer is receiving) respectively.'),
])}

${section('2.2 API Discovery', [
  row('Can call GET /participants to retrieve the list of LFIs and their Authorization Server metadata.'),
  row('Can inspect the API resources and metadata returned per Authorization Server to determine which support the capabilities required by the proposition.'),
  row('Can resolve an LFI\'s DiscoveryEndpointUrl and fetch its .well-known/openid-configuration to obtain token_endpoint, issuer, par_endpoint, and registration_endpoint.'),
  row('LFI endpoint URLs are not hardcoded — they are refreshed periodically from the Trust Framework directory to pick up changes.'),
])}

${section('2.3 Registration with an LFI', [
  row('Successfully called POST /tpp-registration on the AlTareq Model Bank using the registration_endpoint resolved from .well-known.', 'Client ID returned:'),
])}

${section('2.4 Security &amp; FAPI', [
  row('Can build and sign a well-formed JWT using the application signing key.', 'Signing Key ID (kid):'),
  row('Can build a valid Client Assertion (private_key_jwt).', 'Client ID:'),
  row('Can obtain a Client Credentials access token from the Model Bank token endpoint.'),
  row('mTLS is correctly configured — the transport certificate is presented on all outbound requests.'),
  row('Can construct a valid PAR request JWT including all required claims.'),
  row('Callback handler correctly extracts the code and state from the redirect and verifies the state value.'),
  row('Can exchange the authorisation code for an access token and refresh token.'),
])}

${section('2.5 Data Sharing', [
  row('Can create a Data Sharing consent scoped to the permissions required by the proposition.'),
  row('Consent requests only the minimum permissions required — no over-scoping beyond the endpoints the proposition actually calls.'),
  row('Can complete the full consent, authorisation, and token exchange flow with the AlTareq Model Bank.'),
  row('Can resolve the Model Bank resource server endpoints and call data endpoints.'),
  row('Consent state is kept up to date by polling GET /account-access-consents/{ConsentId} or via webhooks.', 'Mechanism used (polling / webhooks):'),
  row('Can use a Refresh Token to obtain a new Access Token without re-authorising the user.'),
  row('Consent Management Interface meets Nebras requirements.'),
])}

${section('2.6 Error Handling', [
  row('HTTP 4xx responses from the LFI are parsed and surfaced to the user where appropriate.'),
  row('Expired or revoked tokens trigger a re-authentication flow rather than a silent failure.'),
  row('Consent Rejected and Revoked states are handled gracefully.'),
  row('Network or mTLS failures do not cause payment state to become ambiguous — idempotency keys are preserved for retries.'),
])}


<h2>3. Production Authorization Servers</h2>
<p class="section-note">
  List every Authorization Server you intend to register with in production.
  Retrieve this from GET /participants — each entry contains an OrganisationName and an AuthorisationServers array
  with CustomerFriendlyName and OpenIDDiscoveryDocument per server.
  If an LFI operates multiple Authorization Servers, add a separate row for each.
</p>
<table>
  <tr>
    <th style="width:28%;">Organisation Name</th>
    <th style="width:28%;">Authorization Server (CustomerFriendlyName)</th>
    <th>OpenID Discovery Document</th>
  </tr>
  <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
  <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
  <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
  <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
</table>


<h2>4. Declaration</h2>
<p>By signing below, I confirm that:</p>

<p class="declaration-item"><span class="box">&#9634;</span> All items in Section 2 are confirmed Yes and the information provided is accurate to the best of my knowledge.</p>
<p class="declaration-item"><span class="box">&#9634;</span> All sandbox testing referenced in this document was performed against the AlTareq Model Bank environment.</p>

<div class="signoff">
  <div class="signoff-row"><strong>Full name:</strong>&nbsp;&nbsp;<span class="field-line" style="min-width:300px;">&nbsp;</span></div>
  <div class="signoff-row"><strong>Role / title:</strong>&nbsp;&nbsp;<span class="field-line" style="min-width:280px;">&nbsp;</span></div>
  <div class="signoff-row"><strong>Date:</strong>&nbsp;&nbsp;<span class="field-line" style="min-width:200px;">&nbsp;</span></div>
  <div class="signoff-row"><strong>Signature:</strong>&nbsp;&nbsp;<span class="field-line" style="min-width:280px;">&nbsp;</span></div>
</div>

<hr>
<p style="font-size:9pt; color:#94a3b8; text-align:center;">
  Nebras Open Finance — Readiness Checklist v1.0 &nbsp;|&nbsp; Submit to the Open Finance team alongside all required certification evidence.
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
