<route lang="yaml">
meta:
  title: Consent Manager
  isIndex: true
</route>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          LFI · API Hub · Consent Manager
        </div>
        <h1 class="ed-doc__title">
          Consent Manager
          <span class="ed-doc__read">2 min read</span>
        </h1>
        <p class="ed-doc__lede">
          The <strong>Consent Manager</strong> is an API provided by the API Hub that gives the LFI read and
          write access to the consent records held centrally by the API Hub. The API Hub is the single
          source of truth for all consents &mdash; the Consent Manager is how your systems interact with
          that source of truth.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="base-url"
      num="01"
      color="var(--at-teal)"
      eyebrow="Base URL"
      title="Per-environment Consent Manager hosts"
      tone="cream"
    >
      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Environment</th>
              <th>URL</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Pre-production</td>
              <td><code>https://cm.{lfiCode}.preprod.apihub.openfinance.ae</code></td>
            </tr>
            <tr>
              <td>Production</td>
              <td><code>https://cm.{lfiCode}.apihub.openfinance.ae</code></td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>
        Where <code>{lfiCode}</code> is the LFI Code assigned during
        <a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/prerequisites#lfi-code">API Hub onboarding</a>.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="authentication"
      num="02"
      color="var(--at-gold)"
      eyebrow="Authentication"
      title="C3-hh-cm-client over mTLS, optionally JWT-signed"
      tone="surface"
    >
      <EdProse>
        All requests to the Consent Manager MUST be made using the
        <strong>C3-hh-cm-client</strong> application registered in the Trust Framework. This is the same
        client used to call the
        <a href="/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/">Headless Heimdall Auth Server</a>.
      </EdProse>

      <EdProse>
        Requests MUST be made over <strong>mutual TLS</strong> using the <strong>C3</strong> transport
        client certificate. If your API Hub is configured for
        <a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/configuring-authentication/jwt-client">JWT Auth</a>,
        you MUST also include a signed JWT in the <code>Authorization</code> header, signed with the
        <strong>Sig4</strong> signing key.
      </EdProse>

      <EdProse>
        See
        <a href="/tech/lfi-api-hub/v2.1/api-hub/connectivity/">Connectivity &amp; Certificates</a>
        for the full certificate mapping, and
        <a href="/tech/lfi-api-hub/trust-framework/creating-c3-application">Creating the C3-hh-cm-client Application</a>
        for setup instructions.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="when-lfi-calls"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="When the LFI calls the Consent Manager"
      title="Three contexts: auth journey, CMI, payment updates"
      tone="cream"
    >
      <EdProse>The Consent Manager is used in three contexts:</EdProse>

      <h3>1. Authentication and authorisation journey</h3>
      <EdProse>
        During the consent authorisation flow, the LFI's authorisation server calls the Consent Manager to
        read the consent details and update the consent state after the PSU has authenticated and made
        their authorisation decision.
      </EdProse>
      <EdProse>
        For full details on the end-to-end flow &mdash; including how the Consent Manager fits alongside
        the Headless Heimdall Auth Server &mdash; see the
        <a href="/tech/lfi-api-hub/v2.1/consent-journey/api-guide">Consent Journey API Guide</a>.
      </EdProse>

      <h3>2. Consent Management Interface</h3>
      <EdProse>
        The LFI MUST provide a Consent Management Interface (CMI) within its digital banking application.
        The CMI is powered by Consent Manager API calls &mdash; retrieving consents by user, by account, or
        by ID, and revoking consents on the customer's behalf.
      </EdProse>
      <EdProse>
        For the requirements, user experience specifications, and a detailed API guide for building the
        CMI, see the
        <a href="/tech/lfi-api-hub/v2.1/consent-management-interface/">Consent Management Interface</a>.
      </EdProse>

      <h3>3. Payment status updates</h3>
      <EdProse>
        For every Open Finance payment executed under a consent, the LFI MUST update the payment status on
        the API Hub by calling <span class="endpoint"><span class="http-method http-method--patch">PATCH</span><code>/payment-log/{id}</code></span>. This keeps the API Hub's payment log
        accurate and ensures the CMI can display up-to-date payment history to the customer.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="api-reference"
      num="04"
      color="var(--at-navy)"
      eyebrow="API Reference"
      title="Where to find the endpoints"
      tone="surface"
    >
      <EdProse>
        The full API reference for each endpoint is available in the sidebar under <strong>API Reference</strong>.
        Use <span class="endpoint"><span class="http-method http-method--get">GET</span><code>/hello-mtls</code></span> to verify your mTLS connectivity before calling other endpoints.
      </EdProse>
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
.ed-doc__lede :deep(strong) { color: var(--at-navy-deep); font-weight: 600; }
.ed-doc__lede :deep(a) {
  color: var(--at-teal-deep);
  text-decoration: none;
  border-bottom: 1px solid currentColor;
}

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
}
</style>
