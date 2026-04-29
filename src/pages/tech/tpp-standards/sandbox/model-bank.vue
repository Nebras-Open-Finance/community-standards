<route lang="yaml">
meta:
  title: Sandbox — Model Bank
</route>

<script setup lang="ts">
import { useModelBankCredentials } from '@/components/common/composables/useModelBankCredentials'

const { currentVersion, allCredentials } = useModelBankCredentials()
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          TPP · Sandbox · Model Bank
        </div>
        <h1 class="ed-doc__title">
          Sandbox &mdash; Model Bank
          <span class="ed-doc__read">2 min read</span>
        </h1>
        <p class="ed-doc__lede">
          To support onboarding and early development, a Model Bank has been deployed within the sandbox
          environment. This simulated Licensed Financial Institution mirrors the structure and behavior of
          a real LFI, providing TPPs with a safe, compliant space to test their end-to-end integration
          flows.
        </p>
        <p class="ed-doc__lede ed-doc__lede--tight">
          The Model Bank is registered in the Trust Framework and exposes Authorization Servers, discovery
          endpoints, and Open Finance APIs &mdash; just like any production LFI. TPPs can use it to:
        </p>
        <ul class="ed-doc__bullets">
          <li>Explore API discovery via the <code>.well-known</code> endpoint</li>
          <li>Test registration with real (sandbox) software statements</li>
          <li>Validate certificate-based authentication and mutual TLS setups</li>
          <li>Simulate consent flows, account access, and payment initiation</li>
        </ul>
      </div>
    </section>

    <EdSectionBand
      id="discovery"
      num="01"
      color="var(--at-teal)"
      eyebrow="Model Bank Discovery"
      title="The .well-known endpoint and what it exposes"
      tone="cream"
    >
      <EdProse>The <code>.well-known</code> endpoint for the Model Bank is:</EdProse>

      <EdCode
        code="https://auth1.altareq1.sandbox.apihub.openfinance.ae/.well-known/openid-configuration"
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
              <td><code>https://auth1.altareq1.sandbox.apihub.openfinance.ae</code></td>
            </tr>
            <tr>
              <td><code>authorization_endpoint</code></td>
              <td><code>https://auth1.altareq1.sandbox.apihub.openfinance.ae/auth</code></td>
            </tr>
            <tr>
              <td><code>par_endpoint</code></td>
              <td><code>https://as1.altareq1.sandbox.apihub.openfinance.ae/par</code></td>
            </tr>
            <tr>
              <td><code>token_endpoint</code></td>
              <td><code>https://as1.altareq1.sandbox.apihub.openfinance.ae/token</code></td>
            </tr>
            <tr>
              <td><code>registration_endpoint</code></td>
              <td><code>https://rs1.altareq1.sandbox.apihub.openfinance.ae/tpp-registration</code></td>
            </tr>
            <tr>
              <td><code>jwks_uri</code></td>
              <td><code>https://keystore.sandbox.directory.openfinance.ae/233bcd1d-4216-4b3c-a362-9e4a9282bba7/application.jwks</code></td>
            </tr>
            <tr>
              <td>Resource Server (<code>rs</code>)</td>
              <td><code>https://rs1.altareq1.sandbox.apihub.openfinance.ae</code></td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>
    </EdSectionBand>

    <EdSectionBand
      id="credentials"
      num="02"
      color="var(--at-gold)"
      eyebrow="Model Bank Credentials"
      title="Test credentials and accounts per Banking API version"
      lede="Credentials are version-specific. The current version is highlighted; older versions remain available for testing legacy integrations."
      tone="surface"
    >
      <div
        v-for="(c, i) in allCredentials"
        :key="c.version"
        class="ed-doc__version"
        :class="{ 'is-divided': i > 0 }"
      >
        <h3 class="ed-doc__version-heading">
          Banking API {{ c.version }}
          <span v-if="c.version === currentVersion" class="ed-doc__version-badge">Current</span>
        </h3>

        <h4 class="ed-doc__version-sub">Login</h4>
        <table class="ed-doc__creds">
          <thead>
            <tr><th>Username</th><th>Password</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><code>{{ c.username }}</code></td>
              <td><code>{{ c.password }}</code></td>
            </tr>
          </tbody>
        </table>

        <ImageViewer
          v-if="c.version === currentVersion"
          src="/images/postman/first-flow-sip/7.png"
          alt="Model Bank Auth"
        />

        <h4 class="ed-doc__version-sub">Accounts</h4>
        <EdRefTable>
          <table>
            <thead>
              <tr>
                <th>AccountId</th>
                <th>SchemeName</th>
                <th>Identification</th>
                <th>AccountType</th>
                <th>Name</th>
              </tr>
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
        </EdRefTable>
      </div>
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

.ed-doc__version { margin-top: 0.5rem; }
.ed-doc__version.is-divided {
  margin-top: 2.5rem;
  padding-top: 2rem;
  border-top: 1px solid var(--at-grid-line);
}
.ed-doc__version-heading {
  font-family: var(--at-serif);
  font-size: 1.4rem;
  font-weight: 600;
  letter-spacing: -0.015em;
  color: var(--at-navy-deep);
  margin: 0 0 1rem;
  display: flex;
  align-items: center;
  gap: 0.85rem;
}
.ed-doc__version-badge {
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-teal-deep);
  background: color-mix(in srgb, var(--at-teal) 14%, transparent);
  border: 1px solid color-mix(in srgb, var(--at-teal) 40%, transparent);
  padding: 0.22rem 0.55rem;
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
