<route lang="yaml">
meta:
  title: Trust Framework — API Guide
</route>

<script setup lang="ts">
const tokenTabs = [
  {
    label: 'Node.js',
    lang: 'typescript',
    code: `import https from 'node:https'
import fs from 'node:fs'

const CLIENT_ID  = process.env.CLIENT_ID!
const AUTH_BASE  = process.env.DIRECTORY_AUTH_BASE!
// production:  https://matls-auth.directory.openfinance.ae
// sandbox:     https://matls-auth.sandbox.directory.openfinance.ae

const agent = new https.Agent({
  cert: fs.readFileSync(process.env.TRANSPORT_CERT_PATH!),
  key:  fs.readFileSync(process.env.TRANSPORT_KEY_PATH!),
})

const params = new URLSearchParams({
  grant_type: 'client_credentials',
  scope:      'directory:software',
  client_id:  CLIENT_ID,
})

const tokenResponse = await fetch(\`\${AUTH_BASE}/token\`, {
  method:  'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body:    params.toString(),
  // @ts-expect-error — Node fetch accepts agent via undici dispatcher or a polyfill
  agent,
})

const { access_token } = await tokenResponse.json()`,
  },
  {
    label: 'Python',
    lang: 'python',
    code: `import os
import httpx

CLIENT_ID  = os.environ["CLIENT_ID"]
AUTH_BASE  = os.environ["DIRECTORY_AUTH_BASE"]
# production:  https://matls-auth.directory.openfinance.ae
# sandbox:     https://matls-auth.sandbox.directory.openfinance.ae

cert = (os.environ["TRANSPORT_CERT_PATH"], os.environ["TRANSPORT_KEY_PATH"])

token_response = httpx.post(
    f"{AUTH_BASE}/token",
    data={
        "grant_type": "client_credentials",
        "scope":      "directory:software",
        "client_id":  CLIENT_ID,
    },
    cert=cert,
)

access_token = token_response.json()["access_token"]`,
  },
] as const

const orgsTabs = [
  {
    label: 'Node.js',
    lang: 'typescript',
    code: `const API_BASE = process.env.DIRECTORY_API_BASE!
// production:  https://matls-api.directory.openfinance.ae
// sandbox:     https://matls-api.sandbox.directory.openfinance.ae

const orgsResponse = await fetch(\`\${API_BASE}/organisations\`, {
  headers: { Authorization: \`Bearer \${access_token}\` },
  // @ts-expect-error
  agent,
})

const organisations: Organisation[] = await orgsResponse.json()`,
  },
  {
    label: 'Python',
    lang: 'python',
    code: `import httpx

API_BASE = os.environ["DIRECTORY_API_BASE"]
# production:  https://matls-api.directory.openfinance.ae
# sandbox:     https://matls-api.sandbox.directory.openfinance.ae

orgs_response = httpx.get(
    f"{API_BASE}/organisations",
    headers={"Authorization": f"Bearer {access_token}"},
    cert=cert,
)

organisations = orgs_response.json()`,
  },
] as const

const filterTabs = [
  {
    label: 'Node.js',
    lang: 'typescript',
    code: `const tpps = organisations.filter((org: Organisation) => org.Size === 'TPP')`,
  },
  {
    label: 'Python',
    lang: 'python',
    code: `tpps = [org for org in organisations if org.get("Size") == "TPP"]`,
  },
] as const

const ssTabs = [
  {
    label: 'Node.js',
    lang: 'typescript',
    code: `interface SoftwareStatement {
  SoftwareStatementId: string
  SoftwareClientName:  string
  Status:              string
  // … additional fields
}

const allSoftwareStatements: (SoftwareStatement & { OrganisationId: string; OrganisationName: string })[] = []

for (const org of tpps) {
  const orgId   = org.OrganisationId
  const orgName = org.OrganisationName ?? 'Unknown'

  const ssResponse = await fetch(
    \`\${API_BASE}/organisations/\${orgId}/softwarestatements\`,
    {
      headers: { Authorization: \`Bearer \${access_token}\` },
      // @ts-expect-error
      agent,
    }
  )

  const statements: SoftwareStatement[] = await ssResponse.json()

  for (const ss of statements) {
    allSoftwareStatements.push({ ...ss, OrganisationId: orgId, OrganisationName: orgName })
  }
}`,
  },
  {
    label: 'Python',
    lang: 'python',
    code: `all_software_statements = []

for org in tpps:
    org_id   = org["OrganisationId"]
    org_name = org.get("OrganisationName", "Unknown")

    ss_response = httpx.get(
        f"{API_BASE}/organisations/{org_id}/softwarestatements",
        headers={"Authorization": f"Bearer {access_token}"},
        cert=cert,
    )

    statements = ss_response.json()

    for ss in statements:
        all_software_statements.append({
            **ss,
            "OrganisationId":   org_id,
            "OrganisationName": org_name,
        })`,
  },
] as const
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          LFI · Trust Framework · API
        </div>
        <h1 class="ed-doc__title">
          API Guide
          <span class="ed-doc__read">2 min read</span>
        </h1>
        <p class="ed-doc__lede">
          The Trust Framework directory provides a set of APIs that enable <code>Applications</code>
          within the framework to communicate and exchange data.
        </p>
        <p class="ed-doc__lede ed-doc__lede--tight">This guide explains how a registered Application can:</p>
        <ul class="ed-doc__bullets">
          <li>Retrieve all registered Organisations</li>
          <li>Filter those Organisations to identify TPPs</li>
          <li>Retrieve the associated Software Statements for each TPP</li>
        </ul>
        <p class="ed-doc__lede ed-doc__lede--tight">
          These steps can be used, for example, to generate a report that cross-references Organisations
          with their corresponding Software Statement applications.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="prerequisites"
      num="01"
      color="var(--at-teal)"
      eyebrow="Prerequisites"
      title="What you need before calling the Trust Framework API"
      tone="cream"
    >
      <EdProse>Before calling the Trust Framework API, ensure the following requirements are met:</EdProse>

      <EdBullets>
        <li>
          <strong>Registered <a href="/tech/lfi-api-hub/trust-framework/application">Application</a></strong>
          &mdash; the application must be created within the Trust Framework.
        </li>
        <li>
          <strong>Valid <a href="/tech/lfi-api-hub/trust-framework/certificates/">Transport Certificate</a></strong>
          &mdash; an active transport certificate must be issued and registered in the Trust Framework to
          establish secure <strong>mTLS communication</strong>.
        </li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="sequence-flow"
      num="02"
      color="var(--at-gold)"
      eyebrow="API Sequence Flow"
      title="End-to-end Trust Framework API call"
      tone="surface"
    >
      <APIFlowViewer title="TrustFramework - Example">
        <APIFlowsTrustFramework />
      </APIFlowViewer>
    </EdSectionBand>

    <EdSectionBand
      id="step-1"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Step 1"
      title="Obtain an Access Token"
      tone="cream"
    >
      <EdProse>
        The directory uses the OAuth 2.0 <strong>client credentials</strong> grant. POST to the
        directory's token endpoint, presenting your transport certificate over mTLS:
      </EdProse>

      <EdCodeGroup :tabs="tokenTabs" />

      <EdProse>
        See the <a href="/tech/lfi-api-hub/trust-framework/api/token">POST /token</a> API reference for the
        full request and response schema.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="step-2"
      num="04"
      color="var(--at-navy)"
      eyebrow="Step 2"
      title="List all Organisations"
      tone="surface"
    >
      <EdProse>
        With the token, call the <code>/organisations</code> endpoint to retrieve every organisation
        registered in the directory:
      </EdProse>

      <EdCodeGroup :tabs="orgsTabs" />

      <h3>Key response fields</h3>

      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Field</th>
              <th>Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><code>OrganisationId</code></td><td>string</td><td>Unique identifier for the organisation &mdash; used in subsequent calls</td></tr>
            <tr><td><code>OrganisationName</code></td><td>string</td><td>Human-readable name of the organisation</td></tr>
            <tr><td><code>Size</code></td><td>string &le; 255 chars, <code>^[^&lt;&gt;]*$</code></td><td><strong>Organisation type</strong> &mdash; <code>"TPP"</code> for Third Party Providers, <code>"LFI"</code> for Licensed Financial Institutions. Use this field to filter results to TPPs only.</td></tr>
            <tr><td><code>Status</code></td><td>string</td><td>Registration status, e.g. <code>Active</code></td></tr>
            <tr><td><code>CreatedOn</code></td><td>string (ISO 8601)</td><td>Date the organisation was registered</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>
        See the
        <a href="/tech/lfi-api-hub/trust-framework/api/organisations">GET /organisations</a> API reference
        for the full response schema.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="step-3"
      num="05"
      color="var(--at-teal-deep)"
      eyebrow="Step 3"
      title="Filter for TPPs"
      tone="cream"
    >
      <EdProse>
        The <code>/organisations</code> response includes both LFIs and TPPs. Use the <code>Size</code>
        field to narrow the list to TPPs only before iterating:
      </EdProse>

      <EdCodeGroup :tabs="filterTabs" />
    </EdSectionBand>

    <EdSectionBand
      id="step-4"
      num="06"
      color="var(--at-gold)"
      eyebrow="Step 4"
      title="Retrieve Software Statements"
      tone="surface"
    >
      <EdProse>
        For each TPP from Step 3, call the <code>/softwarestatements</code> sub-resource using its
        <code>OrganisationId</code>:
      </EdProse>

      <EdCodeGroup :tabs="ssTabs" />

      <h3>Key response fields</h3>

      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Field</th>
              <th>Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><code>SoftwareStatementId</code></td><td>string</td><td>Unique identifier for the Software Statement</td></tr>
            <tr><td><code>SoftwareClientName</code></td><td>string</td><td>Human-readable name of the client application</td></tr>
            <tr><td><code>Status</code></td><td>string</td><td>Status of the Software Statement, e.g. <code>Active</code></td></tr>
            <tr><td><code>SoftwareRoles</code></td><td>string[]</td><td>Roles assigned to this application (e.g. <code>AISP</code>, <code>PISP</code>)</td></tr>
            <tr><td><code>OrganisationId</code></td><td>string</td><td>The owning organisation (not always returned inline &mdash; join from Step 2)</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>
        See the
        <a href="/tech/lfi-api-hub/trust-framework/api/software-statements">GET /softwarestatements</a>
        API reference for the full response schema.
      </EdProse>
    </EdSectionBand>
  </div>
</template>

<style scoped>
.ed-doc { background: var(--at-bg-cream); color: var(--at-navy-deep); font-family: var(--at-sans); padding-top: 4.25rem; min-height: 100vh; }
.ed-doc__hero { background: var(--at-bg-cream); border-bottom: 1px solid var(--at-grid-line); }
.ed-doc__inner { max-width: var(--at-page-max); margin: 0 auto; padding: 4rem 2rem 3rem; }

.ed-doc__eyebrow { font-family: var(--at-mono); font-size: 0.68rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--at-teal); margin-bottom: 1.25rem; display: flex; align-items: center; gap: 0.75rem; }
.ed-doc__eyebrow-dash { width: 24px; height: 1px; background: currentColor; }

.ed-doc__title { font-family: var(--at-serif); font-size: clamp(2.25rem, 5vw, 3.6rem); font-weight: 600; line-height: 1.02; letter-spacing: -0.03em; margin: 0; display: flex; align-items: baseline; flex-wrap: wrap; gap: 0.85rem; }
.ed-doc__read { font-family: var(--at-mono); font-size: 0.7rem; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 500; color: var(--at-mute); align-self: center; padding-left: 0.6rem; border-left: 1px solid var(--at-grid-line-2); }

.ed-doc__lede { font-family: var(--at-sans); font-size: 1.1rem; line-height: 1.65; margin: 1.75rem 0 0; max-width: 50rem; color: var(--at-mute-2); }
.ed-doc__lede--tight { margin-top: 1rem; }
.ed-doc__lede :deep(strong) { color: var(--at-navy-deep); font-weight: 600; }
.ed-doc__lede :deep(code), .ed-doc__lede code { font-family: var(--at-mono); font-size: 0.86em; background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream)); border: 1px solid var(--at-grid-line); padding: 0.08em 0.4em; }

.ed-doc__bullets { font-family: var(--at-sans); font-size: 1rem; line-height: 1.65; margin: 0.85rem 0 0 1.2rem; padding: 0; max-width: 50rem; color: var(--at-mute-2); }
.ed-doc__bullets li { margin: 0.3rem 0; }

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
}
</style>
