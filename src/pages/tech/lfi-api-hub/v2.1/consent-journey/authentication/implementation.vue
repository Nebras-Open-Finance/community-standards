<route lang="yaml">
meta:
  title: Implementation Guide
</route>

<script setup lang="ts">
const deviceArchDiagram = `PSU's device
┌─────────────────────────────────────────────┐
│                                             │
│  LFI Mobile App (bound to this device)      │
│  ┌───────────────────────────────────────┐  │
│  │                                       │  │
│  │  1. App opens via Authorization       │  │
│  │     Endpoint deep link                │  │
│  │                                       │  │
│  │  2. Device binding verified silently  │  │
│  │     (possession factor ✓)             │  │
│  │                                       │  │
│  │  3. Native biometric prompt           │  │
│  │     (inherence factor ✓)              │  │
│  │                                       │  │
│  │  4. SCA complete → proceed to         │  │
│  │     consent authorization             │  │
│  │                                       │  │
│  └───────────────────────────────────────┘  │
│                                             │
│  Secure Element / TEE                       │
│  ┌───────────────────────────────────────┐  │
│  │  Private key (never leaves device)    │  │
│  │  Biometric verification               │  │
│  └───────────────────────────────────────┘  │
│                                             │
└─────────────────────────────────────────────┘`

const paymentStepUpDiagram = `┌─────────────────────────────────────────────────────┐
│                                                      │
│  1. App opens → device binding verified (possession) │
│  2. Native biometric prompt (inherence)              │
│  3. SCA complete ✓                                   │
│                                                      │
│  ─── PSU reviews payment details ───                 │
│                                                      │
│  4. PSU taps "Confirm Payment"                       │
│  5. Native biometric prompt (step-up confirmation)   │
│  6. Authorization complete → doConfirm               │
│                                                      │
└──────────────────────────────────────────────────────┘`

const pushHandoffDiagram = `Mobile browser                         LFI app (bound device)
┌────────────────────┐                ┌─────────────────────┐
│                     │                │                      │
│ 1. GET /auth called │                │                      │
│    (interactionId + │                │                      │
│     consentId       │                │                      │
│     obtained)       │                │                      │
│                     │                │                      │
│ 2. PSU enters       │                │                      │
│    username/password │                │                      │
│    (knowledge ✓)    │                │                      │
│                     │   push notif   │                      │
│ 3. LFI sends push ──┼───────────────►│ 4. PSU opens notif   │
│                     │                │                      │
│                     │                │ 5. App authenticates  │
│ 6. Browser polls    │                │    (biometric ✓)     │
│    for completion   │                │                      │
│                     │                │ 7. App calls          │
│                     │                │    GET /consents,     │
│                     │                │    authorization,     │
│ 8. Redirect to TPP ◄─┼────────────── │    doConfirm/doFail  │
│                     │                │                      │
└─────────────────────┘                └─────────────────────┘`
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          LFI · Consent Journey · Authentication · Implementation
        </div>
        <h1 class="ed-doc__title">
          Implementation Guide
          <span class="ed-doc__read">5 min read</span>
        </h1>
        <p class="ed-doc__lede">
          This page provides best-practice guidance for LFIs implementing authentication in the Open
          Finance consent journey. The recommendations here reflect the approach most likely to satisfy
          <a href="/tech/lfi-api-hub/v2.1/consent-journey/authentication/sca">SCA requirements</a>,
          pass CX certification, and deliver an experience consistent with best-in-class mobile banking.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="recommended-architecture"
      num="01"
      color="var(--at-teal)"
      eyebrow="Recommended architecture"
      title="Device-bound app with native biometrics"
      tone="cream"
    >
      <EdProse>
        The strongest and most seamless authentication approach combines a
        <strong>device-bound mobile app</strong> with <strong>native biometric authentication</strong>.
        This is the approach used by leading banking apps globally and satisfies SCA with minimal
        friction.
      </EdProse>

      <h3>How it works</h3>
      <EdCode lang="text" :code="deviceArchDiagram" />

      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Step</th>
              <th>What happens</th>
              <th>SCA factor</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>The Authorization Endpoint deep link opens the LFI app</td>
              <td>&mdash;</td>
            </tr>
            <tr>
              <td>2</td>
              <td>The app verifies it is running on the bound device by checking cryptographic keys stored in the secure element</td>
              <td><strong>Possession</strong> &mdash; the device the app is bound to</td>
            </tr>
            <tr>
              <td>3</td>
              <td>The app prompts for a native biometric (Face ID, Touch ID, fingerprint)</td>
              <td><strong>Inherence</strong> &mdash; the PSU's biometric</td>
            </tr>
            <tr>
              <td>4</td>
              <td>SCA is satisfied (two factors). The PSU proceeds to review and authorize the consent</td>
              <td>&mdash;</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>This is best-in-class because:</EdProse>
      <EdBullets>
        <li><strong>It is fast</strong> &mdash; a single biometric gesture, no typing, no waiting for OTPs</li>
        <li><strong>It is familiar</strong> &mdash; identical to opening the banking app normally</li>
        <li><strong>It is secure</strong> &mdash; private keys in the secure element, biometric verification on-device</li>
        <li><strong>It satisfies SCA</strong> &mdash; possession (bound device) + inherence (biometric)</li>
      </EdBullets>

      <h3>Device binding</h3>
      <EdProse>
        The LFI app MUST be bound to the PSU's device during the app's initial registration or
        enrolment. Binding MUST be established through:
      </EdProse>
      <EdBullets>
        <li>A cryptographic key pair generated in the device's secure element (Secure Enclave on iOS, StrongBox/TEE on Android)</li>
        <li>The public key registered with the LFI's backend during enrolment</li>
        <li>The private key remaining on-device and never exported</li>
      </EdBullets>
      <EdProse>
        On each authentication, the app verifies device binding by performing a cryptographic operation
        with the private key. This is silent to the PSU &mdash; no user interaction is required for the
        possession factor.
      </EdProse>

      <h3>Native biometrics</h3>
      <EdProse>The biometric authentication MUST use the device's native biometric APIs:</EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Platform</th>
              <th>API</th>
              <th>Biometrics supported</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>iOS</td>
              <td>Local Authentication framework / Face ID / Touch ID</td>
              <td>Face ID, Touch ID</td>
            </tr>
            <tr>
              <td>Android</td>
              <td>BiometricPrompt API</td>
              <td>Fingerprint, face unlock, iris (device-dependent)</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>
        The biometric prompt MUST be the platform-native prompt. LFIs MUST NOT implement custom
        biometric capture. The operating system handles the biometric matching against enrolled
        biometrics; the result is an assertion that the enrolled user is present.
      </EdProse>

      <h3>Fallback to PIN/password</h3>
      <EdProse>
        If native biometrics are not available (not enrolled, hardware not present, or user
        preference), the app MUST fall back to a knowledge factor:
      </EdProse>
      <EdBullets>
        <li>PIN or password entry within the LFI app</li>
        <li>This combined with the bound device still satisfies SCA (possession + knowledge)</li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="payment-step-up"
      num="02"
      color="var(--at-gold)"
      eyebrow="Payment consent flow"
      title="Step-up confirmation at point of authorization"
      tone="surface"
    >
      <EdProse>
        For payment consents, the flow extends with a biometric confirmation at the point of
        authorization:
      </EdProse>

      <EdCode lang="text" :code="paymentStepUpDiagram" />

      <EdProse>
        The step-up biometric at step 5 confirms the PSU's intent to authorize the specific payment.
        This maps directly to how banking apps handle payment confirmation and satisfies the CBUAE
        directive's step-up requirement for sensitive actions.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="fallback-scenarios-when-the-app-is-not-available"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Fallback scenarios"
      title="When the app is not available"
      tone="cream"
    >
      <EdProse>
        The
        <a href="/tech/lfi-api-hub/v2.1/consent-journey/authentication/#app-invocation">Overview</a>
        defines the scenarios where the PSU does not have the LFI app installed. This section provides
        implementation detail for those flows.
      </EdProse>

      <h3>Mobile browser &mdash; browser-based authentication</h3>
      <EdProse>
        If the LFI already supports browser-based authentication in its digital channels, the same
        capability MUST be available for Open Finance. The SCA requirements apply &mdash; the browser
        flow must achieve two-factor authentication:
      </EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Factor</th>
              <th>Browser-based approach</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Possession</strong></td>
              <td>Verified through a registered credential (e.g. a FIDO2/Passkey credential bound to the device, or a device fingerprint established during prior enrolment)</td>
            </tr>
            <tr>
              <td><strong>Inherence</strong> or <strong>Knowledge</strong></td>
              <td>Biometric authentication via WebAuthn/FIDO2 (if supported), or PIN/password entry</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3 id="mobile-browser--app-handoff-via-push-notification">Mobile browser &mdash; app handoff via push notification</h3>
      <EdProse>
        When the LFI does not support browser-based authentication, the LFI MUST hand off to the mobile
        app:
      </EdProse>

      <EdCode lang="text" :code="pushHandoffDiagram" />

      <EdProse>Key implementation details:</EdProse>
      <EdBullets>
        <li><span class="endpoint"><span class="http-method http-method--get">GET</span><code>/auth</code></span> MUST be called in the browser session &mdash; it cannot be called again from the app</li>
        <li>The <code>interactionId</code> and <code>consentId</code> MUST be passed to the app via the push notification deep link</li>
        <li>The app uses these identifiers to call <span class="endpoint"><span class="http-method http-method--get">GET</span><code>/consents/{consentId}</code></span>, present the authorization screen, and call <code>doConfirm</code> or <code>doFail</code></li>
        <li>The browser page MUST poll for completion and redirect back to the TPP</li>
      </EdBullets>

      <h3 id="desktop-browser--qr-code-or-push-notification">Desktop browser &mdash; QR code or push notification</h3>
      <EdProse>On desktop, the LFI presents a web page with two handoff options:</EdProse>

      <EdProse>
        <strong>QR code:</strong> The page displays a QR code that resolves to a deep link containing
        the <code>interactionId</code> and <code>consentId</code> (obtained from <span class="endpoint"><span class="http-method http-method--get">GET</span><code>/auth</code></span>
        in the desktop browser session). The PSU scans the code with their mobile device, which opens
        the LFI app. The PSU authenticates and completes consent authorization in the app. The desktop
        page polls for completion and redirects back to the TPP.
      </EdProse>

      <EdProse>
        <strong>Push notification:</strong> Identical to the
        <a href="#mobile-browser--app-handoff-via-push-notification">mobile browser handoff</a>
        above &mdash; the desktop page collects username/password, triggers a push to the bound device,
        and polls for completion.
      </EdProse>

      <EdProse>
        If the LFI supports browser-based authentication in its existing channels, the PSU MUST also be
        able to complete the entire journey in the desktop browser without the mobile app.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="emerging"
      num="04"
      color="var(--at-navy)"
      eyebrow="Emerging best practices"
      title="Standards LFIs SHOULD evaluate"
      tone="surface"
    >
      <EdProse>
        The following standards and technologies are consistent with the SCA principles and controls
        described in this guide. LFIs SHOULD evaluate them for future implementation:
      </EdProse>

      <h3>FIDO2</h3>
      <EdProse>
        FIDO2 is a suite of protocols that provides strong proofs-of-authentication using public-key
        cryptography. Unlike app-bound biometrics, FIDO2 produces a portable
        <strong>Authentication Assertion</strong> &mdash; a signed object that can be verified by any
        relying party holding the corresponding public key. FIDO2 satisfies SCA through possession
        (private key on device) and inherence (biometric gate to the key).
      </EdProse>

      <h3>Passkeys</h3>
      <EdProse>
        Passkeys are a cross-platform implementation of FIDO2 credentials developed by the FIDO
        Alliance with Apple and Google. They add the ability to synchronise keys between devices and
        recover from device loss &mdash; a key limitation of device-bound FIDO2 credentials. Passkeys
        provide the same SCA properties as FIDO2 with improved usability.
      </EdProse>

      <h3>Secure Payment Confirmation (SPC)</h3>
      <EdProse>
        SPC is a W3C standard that extends WebAuthn specifically for payment authentication. It
        presents a browser-native payment confirmation dialog that includes the payee and amount, with
        biometric verification. SPC supports the CBUAE dynamic-linking requirement (binding the
        authentication to a specific payment) and is already incorporated into 3D Secure flows.
      </EdProse>

      <h3>OpenID for Verifiable Credentials</h3>
      <EdProse>
        OpenID for Verifiable Credentials (OID4VC) provides a framework for presenting verifiable
        identity credentials as part of an authentication flow. This could enable third-party identity
        providers to participate in SCA, broadening the ecosystem beyond bank-issued credentials.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="security-controls"
      num="05"
      color="var(--at-teal-deep)"
      eyebrow="Security controls"
      title="Required controls for authentication implementations"
      tone="cream"
    >
      <EdProse>LFIs MUST apply the following controls to their authentication implementation:</EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th style="width:3rem">#</th>
              <th>Control</th>
              <th>Rationale</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>1</td><td>Apps MUST be distributed through authorised app stores only</td><td>Provides a trusted source and enables integrity verification</td></tr>
            <tr><td>2</td><td>Apps MUST verify the mobile OS version is supported</td><td>Ensures expected behaviour and reduces risk of information leakage</td></tr>
            <tr><td>3</td><td>App installations MUST be correlated to a specific device signature</td><td>Establishes provenance of authentication operations</td></tr>
            <tr><td>4</td><td>Private keys MUST be stored in the device secure element</td><td>Prevents extraction and reflects OWASP mobile best practices</td></tr>
            <tr><td>5</td><td>Apps MUST verify the identity of external services (e.g. API Hub endpoints) using certificate pinning or equivalent</td><td>Prevents redirection of authentication flows to malicious services</td></tr>
            <tr><td>6</td><td>Apps MUST NOT operate on jailbroken or rooted devices</td><td>Prevents compromise of the secure element and authentication flow</td></tr>
            <tr><td>7</td><td>Each authentication operation MUST be linked to the specific consent being authorized</td><td>Provides audit trail and prevents replay of authentication assertions</td></tr>
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
