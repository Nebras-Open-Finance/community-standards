---
next: false
prev: false
aside: false
---

🕒 **7 minute read**

# Sandbox | Model Bank

To support onboarding and early development, a Model Bank has been deployed within the sandbox environment. This simulated Licensed Financial Institution mirrors the structure and behavior of a real LFI, providing TPPs with a safe, compliant space to test their end-to-end integration flows.

The Model Bank is registered in the Trust Framework and exposes Authorization Servers, discovery endpoints, and Open Finance APIs — just like any production LFI. TPPs can use it to:

- Explore API discovery via the `.well-known` endpoint
- Test registration with real (sandbox) software statements
- Validate certificate-based authentication and mutual TLS setups
- Simulate consent flows, account access, and payment initiation

## Model Bank Discovery

The `.well-known` endpoint for the Model Bank is:

`https://auth1.altareq1.sandbox.apihub.openfinance.ae/.well-known/openid-configuration`


The `.well-known` endpoint exposes the following critical information values:

| Field | Value |
|-------|-------|
| `issuer` | `https://auth1.altareq1.sandbox.apihub.openfinance.ae` |
| `authorization_endpoint` | `https://auth1.altareq1.sandbox.apihub.openfinance.ae/auth` |
| `par_endpoint` | `https://as1.altareq1.sandbox.apihub.openfinance.ae/par` |
| `token_endpoint` | `https://as1.altareq1.sandbox.apihub.openfinance.ae/token` |
| `registration_endpoint` | `https://rs1.altareq1.sandbox.apihub.openfinance.ae/tpp-registration` |
| `jwks_uri` | `https://keystore.sandbox.directory.openfinance.ae/233bcd1d-4216-4b3c-a362-9e4a9282bba7/application.jwks` |
| Resource Server (`rs`) | `https://rs1.altareq1.sandbox.apihub.openfinance.ae` |

## Model Bank Credentials

Credentials are version-specific.

<div v-for="(c, i) in allCredentials" :key="c.version">

<h3>Banking API {{ c.version }} <Badge v-if="c.version === currentVersion" type="tip" text="Current" /></h3>

<table>
  <thead><tr><th>Username</th><th>Password</th></tr></thead>
  <tbody><tr><td><code>{{ c.username }}</code></td><td><code>{{ c.password }}</code></td></tr></tbody>
</table>

<ImageViewer
  v-if="c.version === currentVersion"
  src="/images/postman/first-flow-sip/7.png"
  alt="Model Bank Auth"
/>

<p><strong>Accounts:</strong></p>

<table>
  <thead>
    <tr><th>AccountId</th><th>SchemeName</th><th>Identification</th><th>AccountType</th><th>Name</th></tr>
  </thead>
  <tbody>
    <tr v-for="a in c.accounts" :key="a.accountId">
      <td><code>{{ a.accountId }}</code></td>
      <td>{{ a.schemeName }}</td>
      <td>{{ a.identification }}</td>
      <td>{{ a.accountType }}</td>
      <td>{{ a.name }}</td>
    </tr>
  </tbody>
</table>

<hr v-if="i < allCredentials.length - 1" />

</div>

<script setup>
import { useModelBankCredentials } from '../../../components/Composables/useModelBankCredentials'

const { currentVersion, allCredentials } = useModelBankCredentials()
</script>
