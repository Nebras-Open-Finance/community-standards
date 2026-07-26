<route lang="yaml">
meta:
  title: Sandbox — Model Insurer
</route>

<script setup lang="ts">
// Sandbox Model Insurer page — the insurance counterpart to the Model Bank
// (model-bank.vue). Discovery values below are confirmed live from the altareq2
// well-known. Test login credentials and policy data are NOT yet populated —
// they are placeholders to be filled in from the sandbox once provided.
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          TPP · Sandbox · Model Insurer
        </div>
        <h1 class="ed-doc__title">
          Sandbox &mdash; Model Insurer
          <span class="ed-doc__read">2 min read</span>
        </h1>
        <p class="ed-doc__lede">
          To support onboarding and early development, a Model Insurer has been deployed within the
          sandbox environment. This simulated Licensed Financial Institution mirrors the structure and
          behavior of a real insurer, providing TPPs with a safe, compliant space to test their
          end-to-end Insurance Data Sharing integration flows.
        </p>
        <p class="ed-doc__lede ed-doc__lede--tight">
          Like the <a href="/tech/tpp-standards/sandbox/model-bank">Model Bank</a>, the Model Insurer is
          registered in the Trust Framework and exposes Authorization Servers, discovery endpoints, and
          Open Finance APIs &mdash; just like any production LFI. TPPs use it to gather
          <a href="/tech/tpp-standards/production/testing-certification/functional/insurance-data-sharing">Insurance
          Data Sharing Functional Certification</a> evidence. It lets you:
        </p>
        <ul class="ed-doc__bullets">
          <li>Explore API discovery via the <code>.well-known</code> endpoint</li>
          <li>Test registration with real (sandbox) software statements</li>
          <li>Validate certificate-based authentication and mutual TLS setups</li>
          <li>Simulate consent flows and retrieve insurance policy data across sectors</li>
        </ul>
      </div>
    </section>

    <EdSectionBand
      id="discovery"
      num="01"
      color="var(--at-teal)"
      eyebrow="Model Insurer Discovery"
      title="The .well-known endpoint and what it exposes"
      tone="cream"
    >
      <EdProse>The <code>.well-known</code> endpoint for the Model Insurer is:</EdProse>

      <EdCode
        code="https://auth1.altareq2.sandbox.apihub.openfinance.ae/.well-known/openid-configuration"
        lang="plaintext"
        filename=".well-known URL"
      />

      <EdProse>The <code>.well-known</code> endpoint exposes the following critical information values:</EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Field</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>issuer</code></td>
              <td><code>https://auth1.altareq2.sandbox.apihub.openfinance.ae</code></td>
            </tr>
            <tr>
              <td><code>authorization_endpoint</code></td>
              <td><code>https://auth1.altareq2.sandbox.apihub.openfinance.ae/auth</code></td>
            </tr>
            <tr>
              <td><code>par_endpoint</code></td>
              <td><code>https://as1.altareq2.sandbox.apihub.openfinance.ae/par</code></td>
            </tr>
            <tr>
              <td><code>token_endpoint</code></td>
              <td><code>https://as1.altareq2.sandbox.apihub.openfinance.ae/token</code></td>
            </tr>
            <tr>
              <td><code>registration_endpoint</code></td>
              <td><code>https://rs1.altareq2.sandbox.apihub.openfinance.ae/tpp-registration</code></td>
            </tr>
            <tr>
              <td><code>jwks_uri</code></td>
              <td><code>https://keystore.sandbox.directory.openfinance.ae/233bcd1d-4216-4b3c-a362-9e4a9282bba7/application.jwks</code></td>
            </tr>
            <tr>
              <td>Resource Server (<code>rs</code>)</td>
              <td><code>https://rs1.altareq2.sandbox.apihub.openfinance.ae</code></td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>
    </EdSectionBand>

    <EdSectionBand
      id="credentials"
      num="02"
      color="var(--at-gold)"
      eyebrow="Model Insurer Credentials"
      title="Test credentials and policies"
      lede="Use these to authenticate at the Model Insurer and retrieve policy data across the insurance sectors."
      tone="surface"
    >
      <h4 class="ed-doc__version-sub">Login</h4>
      <table class="ed-doc__creds">
        <thead>
          <tr><th>Username</th><th>Password</th></tr>
        </thead>
        <tbody>
          <tr>
            <td><code>mits</code></td>
            <td><code>mits</code></td>
          </tr>
        </tbody>
      </table>

      <h4 class="ed-doc__version-sub">Policies</h4>
      <EdProse>
        Two policies are available per sector, across the six insurance sectors the Model Insurer
        underwrites.
      </EdProse>
      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>InsurancePolicyId</th>
              <th>Type</th>
              <th>PolicyNumber</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>10000000-0000-0000-0000-000000000001</code></td>
              <td>employment</td>
              <td><code>P1000000000000001</code></td>
            </tr>
            <tr>
              <td><code>10000000-0000-0000-0000-000000000002</code></td>
              <td>employment</td>
              <td><code>P0000000000000002</code></td>
            </tr>
            <tr>
              <td><code>20000000-0000-0000-0000-000000000001</code></td>
              <td>health</td>
              <td><code>P2000000000000001</code></td>
            </tr>
            <tr>
              <td><code>20000000-0000-0000-0000-000000000002</code></td>
              <td>health</td>
              <td><code>P2000000000000002</code></td>
            </tr>
            <tr>
              <td><code>30000000-0000-0000-0000-000000000001</code></td>
              <td>home</td>
              <td><code>P3000000000000001</code></td>
            </tr>
            <tr>
              <td><code>30000000-0000-0000-0000-000000000002</code></td>
              <td>home</td>
              <td><code>P3000000000000002</code></td>
            </tr>
            <tr>
              <td><code>40000000-0000-0000-0000-000000000001</code></td>
              <td>life</td>
              <td><code>P4000000000000001</code></td>
            </tr>
            <tr>
              <td><code>40000000-0000-0000-0000-000000000002</code></td>
              <td>life</td>
              <td><code>P4000000000000002</code></td>
            </tr>
            <tr>
              <td><code>50000000-0000-0000-0000-000000000001</code></td>
              <td>motor</td>
              <td><code>P5000000000000001</code></td>
            </tr>
            <tr>
              <td><code>50000000-0000-0000-0000-000000000002</code></td>
              <td>motor</td>
              <td><code>P5000000000000002</code></td>
            </tr>
            <tr>
              <td><code>60000000-0000-0000-0000-000000000001</code></td>
              <td>renters</td>
              <td><code>P6000000000000001</code></td>
            </tr>
            <tr>
              <td><code>60000000-0000-0000-0000-000000000002</code></td>
              <td>renters</td>
              <td><code>P6000000000000002</code></td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>
    </EdSectionBand>
  </div>
</template>

<style scoped>
.ed-doc {
  background: var(--at-bg-cream);
  color: var(--at-navy-deep);
  font-family: var(--at-sans);
  padding-top: 4.25rem;
  min-height: 100vh;
}

.ed-doc__hero { background: var(--at-bg-cream); border-bottom: 1px solid var(--at-grid-line); }
.ed-doc__inner { max-width: var(--at-page-max); margin: 0 auto; padding: 4rem 2rem 3rem; }

.ed-doc__eyebrow {
  font-family: var(--at-mono);
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--at-teal);
  margin-bottom: 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.ed-doc__eyebrow-dash { width: 24px; height: 1px; background: currentColor; }

.ed-doc__title {
  font-family: var(--at-serif);
  font-size: clamp(2.25rem, 5vw, 3.6rem);
  font-weight: 600;
  line-height: 1.02;
  letter-spacing: -0.03em;
  margin: 0;
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.85rem;
}
.ed-doc__read {
  font-family: var(--at-mono);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 500;
  color: var(--at-mute);
  align-self: center;
  padding-left: 0.6rem;
  border-left: 1px solid var(--at-grid-line-2);
}

.ed-doc__lede {
  font-family: var(--at-sans);
  font-size: 1.1rem;
  line-height: 1.65;
  margin: 1.75rem 0 0;
  max-width: 50rem;
  color: var(--at-mute-2);
}
.ed-doc__lede--tight { margin-top: 1.25rem; }
.ed-doc__lede :deep(a), .ed-doc__lede a {
  color: var(--at-teal-deep);
  text-decoration: none;
  border-bottom: 1px solid currentColor;
}
.ed-doc__lede :deep(code), .ed-doc__lede code {
  font-family: var(--at-mono);
  font-size: 0.86em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  padding: 0.08em 0.4em;
}

.ed-doc__bullets {
  font-family: var(--at-sans);
  font-size: 1rem;
  line-height: 1.65;
  margin: 0.85rem 0 0 1.2rem;
  padding: 0;
  max-width: 50rem;
  color: var(--at-mute-2);
}
.ed-doc__bullets li { margin: 0.3rem 0; }
.ed-doc__bullets code {
  font-family: var(--at-mono);
  font-size: 0.86em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  padding: 0.08em 0.4em;
}

.ed-doc__version-sub {
  font-family: var(--at-mono);
  font-size: 0.7rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-mute);
  margin: 1.5rem 0 0.6rem;
}

.ed-doc__creds {
  border-collapse: collapse;
  margin: 0.5rem 0 0;
  font-family: var(--at-sans);
  border: 1px solid var(--at-grid-line);
}
.ed-doc__creds th,
.ed-doc__creds td {
  border: 1px solid var(--at-grid-line);
  padding: 0.6rem 0.95rem;
  font-size: 0.92rem;
  text-align: left;
}
.ed-doc__creds th {
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  background: var(--at-bg-cream);
  color: var(--at-navy-deep);
  font-weight: 700;
}
.ed-doc__creds code {
  font-family: var(--at-mono);
  font-size: 0.86em;
  color: var(--at-navy-deep);
}

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
}
</style>
