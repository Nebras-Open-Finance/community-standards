<route lang="yaml">
meta:
  title: Configuring Outbound mTLS
</route>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          LFI · API Hub · Onboarding · Configuring Auth
        </div>
        <h1 class="ed-doc__title">
          Configuring Outbound mTLS
          <span class="ed-doc__read">3 min read</span>
        </h1>
        <p class="ed-doc__lede">
          This page describes how the LFI MUST configure outbound mutual TLS (mTLS) when its authorisation
          server calls the API Hub's Consent Manager and Headless Heimdall Auth Server endpoints during
          consent and authorisation flows.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="why-outbound-mtls"
      num="01"
      color="var(--at-teal)"
      eyebrow="Why the LFI must configure outbound mTLS"
      title="Every CM and HH call is mutual TLS with C3"
      tone="cream"
    >
      <EdProse>
        Every request from the LFI to the API Hub's Consent Manager or Headless Heimdall Auth Server is a
        mutual TLS connection in which the LFI presents the <strong>C3</strong> transport client
        certificate. The API Hub rejects any call to these endpoints that does not present a valid C3
        certificate.
      </EdProse>

      <EdProse>
        The LFI's outbound HTTP client &mdash; typically the authorisation server application that
        orchestrates consent &mdash; MUST be configured to:
      </EdProse>

      <EdBullets>
        <li><strong>Present</strong> the C3 client certificate and its private key on every outbound connection, and</li>
        <li><strong>Trust</strong> the API Hub's server certificate chain so the TLS handshake succeeds.</li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="trust-framework-cas"
      num="02"
      color="var(--at-gold)"
      eyebrow="Trust Framework certificate authorities"
      title="Same PKI as the inbound direction"
      tone="surface"
    >
      <EdProse>
        Outbound mTLS uses the same Trust Framework PKI as the inbound direction. Each API Hub environment
        pairs with a distinct Trust Framework:
      </EdProse>

      <EdBullets>
        <li><strong>Production</strong> API Hub &rarr; <strong>Production</strong> Trust Framework</li>
        <li><strong>Pre-production</strong> API Hub &rarr; <strong>Sandbox</strong> Trust Framework</li>
      </EdBullets>

      <EdProse>
        The Root and Issuing CA details for each environment are documented on
        <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/configuring-authentication/mtls-server#trust-framework-cas">Configuring Inbound mTLS &mdash; Section 2</a>.
        The same CA bundle assembled for inbound mTLS is re-used on the outbound direction.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="configuring-client"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Configuring your outbound HTTP client"
      title="Present the C3 cert, trust the API Hub server chain"
      tone="cream"
    >
      <EdProse>Outbound mTLS configuration has two parts:</EdProse>

      <EdBullets>
        <li><strong>Present the C3 client certificate</strong> so the API Hub accepts the TLS handshake and can identify your organisation.</li>
        <li><strong>Trust the API Hub's server chain</strong> so the handshake completes and your client does not fall back to an untrusted state.</li>
      </EdBullets>

      <h3>3a. Present the C3 client certificate</h3>
      <EdProse>
        The C3 transport client certificate is created inside the <code>C3-hh-cm-client</code> Application
        in your Trust Framework Organisation. The same Application also holds the <strong>Sig4</strong>
        signing certificate used for
        <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/configuring-authentication/jwt-client">JWT Auth &mdash; Client-side</a>
        when JWT Auth is enabled on the LFI &rarr; Hub direction.
      </EdProse>

      <EdBullets>
        <li>In your Trust Framework Organisation, open the <strong><code>C3-hh-cm-client</code></strong> Application.</li>
        <li>Create (or reuse) the <strong>C3</strong> transport client certificate, following the code snippets provided in the Trust Framework.</li>
        <li>Export the C3 certificate and its private key in a format your HTTP client accepts (typically PEM or PKCS#12).</li>
        <li>Load the C3 certificate and private key into the HTTP client used by your authorisation server when calling the API Hub's Consent Manager and Headless Heimdall Auth Server endpoints.</li>
      </EdBullets>

      <EdNote type="warning" title="Per-environment certificates">
        <p>
          The C3 certificate created in your Sandbox Trust Framework Organisation is only valid against
          the Pre-production API Hub. For Production, the C3 is issued by the Production Trust Framework.
          Do not share key material between environments.
        </p>
      </EdNote>

      <EdProse>
        The C3 certificate subject &mdash; specifically its <code>OU</code> and <code>O</code> &mdash; also
        determines the JWKS URL where the API Hub looks up your Sig4 public key when JWT Auth is enabled.
        See
        <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/configuring-authentication/jwt-client">JWT Auth &mdash; Client-side</a>
        for how the subject binds the transport and application layers.
      </EdProse>

      <h3>3b. Trust the API Hub's server chain</h3>
      <EdNote type="warning" title="Open question">
        <p>
          This section depends on whether the API Hub's Consent Manager and Headless Heimdall endpoints
          present a Trust Framework-issued server certificate or a commercial (public Web PKI)
          certificate. Confirm with Ozone before finalising.
        </p>
      </EdNote>

      <EdProse>
        If the API Hub presents a <strong>Trust Framework-issued</strong> server certificate, the LFI's
        outbound HTTP client MUST load the Trust Framework bundle (Issuing CA + Root CA) as a trust
        anchor. This is the same bundle assembled for
        <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/configuring-authentication/mtls-server#trust-ca-bundle">Configuring Inbound mTLS &mdash; Section 3a</a>.
      </EdProse>

      <EdProse>
        If the API Hub presents a <strong>commercial</strong> server certificate, most HTTP clients will
        validate it against the operating-system trust store without any LFI-side configuration. In that
        case no additional trust setup is required beyond ensuring the OS trust store is up to date.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="verification"
      num="04"
      color="var(--at-navy)"
      eyebrow="Verification"
      title="Ozone verifies outbound mTLS during onboarding"
      tone="surface"
    >
      <EdProse>
        Ozone verifies your outbound mTLS configuration end-to-end as part of onboarding. The API Hub is
        only considered set up for an environment once your authorisation server can successfully:
      </EdProse>

      <EdBullets>
        <li>Establish a mutual TLS session with the Consent Manager presenting the C3 certificate issued by the paired Trust Framework, and</li>
        <li>Establish a mutual TLS session with the Headless Heimdall Auth Server presenting the same C3 certificate.</li>
      </EdBullets>

      <EdProse>
        If either case fails, the environment-specific onboarding ticket remains open until the
        configuration is corrected.
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
