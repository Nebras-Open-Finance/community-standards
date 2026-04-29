<route lang="yaml">
meta:
  title: Strong Customer Authentication
</route>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          LFI · Consent Journey · Authentication · SCA
        </div>
        <h1 class="ed-doc__title">
          Strong Customer Authentication
          <span class="ed-doc__read">4 min read</span>
        </h1>
        <p class="ed-doc__lede">
          Strong Customer Authentication (SCA) is multi-factor authentication (MFA) that requires the
          PSU to authenticate using at least two independent factors. SCA is a regulatory requirement
          under the CBUAE directive <em>Prevention of Fraud Incidents Impacting Consumers</em>
          (Notice No. 3057/2025) and applies to all Open Finance consent journeys.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="factors"
      num="01"
      color="var(--at-teal)"
      eyebrow="Authentication factors"
      title="At least two of three independent factors"
      tone="cream"
    >
      <EdProse>SCA requires at least <strong>two</strong> of the following three factors:</EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Factor</th>
              <th>Category</th>
              <th>Examples</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Possession</strong></td>
              <td>Something you have</td>
              <td>A bound mobile device, hardware token, SIM card</td>
            </tr>
            <tr>
              <td><strong>Inherence</strong></td>
              <td>Something you are</td>
              <td>Fingerprint, facial recognition, voice recognition</td>
            </tr>
            <tr>
              <td><strong>Knowledge</strong></td>
              <td>Something you know</td>
              <td>PIN, password, passphrase</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>
        Each factor used MUST be independent &mdash; compromise of one factor MUST NOT compromise
        another.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="prohibited"
      num="02"
      color="var(--at-gold)"
      eyebrow="Prohibited authentication methods"
      title="What MUST NOT be used"
      tone="surface"
    >
      <EdProse>The following methods are <strong>prohibited</strong> in Open Finance consent journeys:</EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Method</th>
              <th>Status</th>
              <th>Rationale</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>SMS OTP (as standalone)</td>
              <td><strong>MUST NOT</strong> be used</td>
              <td>Prohibited by CBUAE directive as a standalone authentication method</td>
            </tr>
            <tr>
              <td>Email OTP (as standalone)</td>
              <td><strong>MUST NOT</strong> be used</td>
              <td>Prohibited by CBUAE directive as a standalone authentication method</td>
            </tr>
            <tr>
              <td>Static passcodes (as standalone)</td>
              <td><strong>MUST NOT</strong> be used</td>
              <td>Prohibited by CBUAE directive as a standalone authentication method</td>
            </tr>
            <tr>
              <td>SMS OTP (as a factor in Open Finance MFA)</td>
              <td><strong>MUST NOT</strong> be used</td>
              <td>Open Finance authentication MUST NOT introduce methods that are more obstructive or weaker than the LFI's existing digital channels. If the LFI does not use SMS OTP in its own mobile banking authentication, it MUST NOT introduce it for Open Finance.</td>
            </tr>
            <tr>
              <td>Email OTP (as a factor in Open Finance MFA)</td>
              <td><strong>MUST NOT</strong> be used</td>
              <td>Same rationale as above. These methods add friction and latency that degrade the customer experience below the standard of the LFI's own channels.</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdNote type="warning">
        <p>
          LFIs MUST NOT introduce authentication factors into the Open Finance journey that are not
          used in their existing digital channels. Open Finance authentication MUST be equivalent to
          &mdash; not more burdensome than &mdash; the LFI's current authentication experience.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="by-consent-type"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="SCA requirements by consent type"
      title="Single MFA ceremony for data sharing; step-up for payments"
      tone="cream"
    >
      <h3>Data sharing consents</h3>
      <EdProse>
        For data sharing consents, a <strong>single MFA ceremony</strong> at the start of the consent
        journey is sufficient. No step-up authentication is required.
      </EdProse>
      <EdProse>
        The PSU authenticates, reviews the data sharing permissions, selects accounts, and authorizes
        the consent.
      </EdProse>

      <h3 id="step-up-authentication-for-payment-consents">Payment consents &mdash; step-up authentication</h3>
      <EdProse>
        For payment consents (single payments and multi-payment consents), the CBUAE directive requires
        <strong>step-up authentication</strong> for sensitive actions including the initiation of
        payments. This means an additional authentication gesture is required at the point the PSU
        confirms the payment authorization.
      </EdProse>

      <EdProse>In practice, a well-implemented payment consent journey has two authentication touchpoints:</EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Touchpoint</th>
              <th>Purpose</th>
              <th>What happens</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Initial authentication</strong></td>
              <td>Establish the PSU's identity</td>
              <td>The PSU opens the LFI app (or web page) and completes MFA &mdash; typically device possession + biometric or PIN. This is identical to how the PSU would normally open their banking app.</td>
            </tr>
            <tr>
              <td><strong>Payment confirmation</strong></td>
              <td>Confirm intent for the specific payment</td>
              <td>After reviewing the payment details, the PSU confirms authorization with a <strong>native biometric gesture</strong> (e.g. Face ID, fingerprint). This is identical to how the PSU would confirm a payment in their banking app.</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>
        These two touchpoints serve distinct purposes &mdash; identity establishment and payment intent
        confirmation &mdash; and align with how banking apps already handle payment flows. The PSU
        experience is familiar: open the app with your face or fingerprint, review the payment, confirm
        with your face or fingerprint.
      </EdProse>

      <EdNote type="tip" title="Why this doesn't feel like &quot;authenticating twice&quot;">
        <p>
          The initial authentication is the natural act of opening and unlocking the banking app. The
          payment confirmation is the natural act of approving a specific transaction. PSUs already do
          this in their banking apps today. The step-up requirement simply ensures this existing
          pattern is preserved in the Open Finance journey.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="cbuae-alignment"
      num="04"
      color="var(--at-navy)"
      eyebrow="CBUAE regulatory alignment"
      title="Mapping clauses of Notice No. 3057/2025 to Open Finance"
      tone="surface"
    >
      <EdProse>
        The table below maps specific clauses from CBUAE Notice No. 3057/2025
        <em>Prevention of Fraud Incidents Impacting Consumers</em> to Open Finance requirements:
      </EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th style="width:3rem">#</th>
              <th>CBUAE requirement</th>
              <th>Open Finance alignment</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>LFIs are prohibited from using weak authentication methods (SMS OTP, Email OTP, static passcodes) as standalone methods for any transaction, enrolment, provisioning, or channel access</td>
              <td>All Open Finance consent journeys MUST use SCA with at least two independent factors. Weak methods are prohibited as standalone or as factors introduced specifically for Open Finance.</td>
            </tr>
            <tr>
              <td>2</td>
              <td>For 3D Secure transactions, LFIs must use strong authentication (in-app verification, soft tokens, biometrics)</td>
              <td>Open Finance payment consent journeys MUST employ strong in-app or biometric verification for step-up authentication at the point of payment authorization.</td>
            </tr>
            <tr>
              <td>3</td>
              <td>For recurring logins from trusted devices, LFIs may use passcodes or device-native biometrics</td>
              <td>For Open Finance authentication on a trusted (bound) device, LFIs may use device-native biometrics (inherence) alongside the trusted device (possession) to satisfy two-factor SCA.</td>
            </tr>
            <tr>
              <td>4</td>
              <td>LFIs must implement step-up authentication for sensitive actions including payment initiation</td>
              <td>For payment consents, an additional biometric confirmation MUST be performed at the point the PSU authorizes the consent. See <a href="#step-up-authentication-for-payment-consents">step-up authentication</a> above.</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>
    </EdSectionBand>

    <EdSectionBand
      id="proofs"
      num="05"
      color="var(--at-teal-deep)"
      eyebrow="Proofs of authentication"
      title="Cryptographically verifiable assertions"
      tone="cream"
    >
      <EdProse>
        A given authentication operation SHOULD be uniquely identifiable and SHOULD produce a
        cryptographically verifiable proof-of-authentication. This provides:
      </EdProse>

      <EdBullets>
        <li>An audit trail linking the authentication to a specific consent</li>
        <li>Foundations for fraud prevention and dispute resolution</li>
        <li>Assurance to relying parties (API Hub) that authentication occurred</li>
      </EdBullets>

      <EdProse>
        Where possible, the authentication assertion SHOULD be signed using a private key stored in the
        device's secure element (e.g. Secure Enclave on iOS, StrongBox/TEE on Android), and the
        corresponding public key SHOULD be available for verification.
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
.ed-doc__lede :deep(em) { font-style: italic; }
.ed-doc__lede :deep(a) {
  color: var(--at-teal-deep);
  text-decoration: none;
  border-bottom: 1px solid currentColor;
}

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
}
</style>
