<route lang="yaml">
meta:
  title: JWT Auth — Client-side
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
          JWT Auth &mdash; Client-side (LFI Sending a Token)
          <span class="ed-doc__read">2 min read</span>
        </h1>
        <p class="ed-doc__lede">
          This page describes how your authorisation server constructs and sends JWT Auth tokens when
          calling the API Hub's Consent Manager and Headless Heimdall Auth Server endpoints. See
          <a href="/tech/lfi-api-hub/v2.2-draft/api-hub/onboarding/application-layer-auth">Application Layer Authentication</a>
          for an overview of all available methods and when to select JWT Auth.
        </p>
        <EdNote type="info" title="Optional">
          <p>
            Sending JWT Auth from the LFI to the API Hub is optional even when JWT Auth is selected. It is
            configured separately from the API Hub &rarr; LFI direction &mdash; indicate your preference on
            the onboarding Service Desk ticket.
          </p>
        </EdNote>
        <p class="ed-doc__lede ed-doc__lede--tight">
          When your authorisation server calls API Hub endpoints (Consent Manager or Headless Heimdall
          Auth Server), you MUST construct a JWT Auth token and include it as a Bearer token in the
          <code>Authorization</code> HTTP header. The request MUST also be made over mutual TLS &mdash; see
          <a href="/tech/lfi-api-hub/v2.2-draft/api-hub/onboarding/configuring-authentication/mtls-client">Configuring Outbound mTLS</a>.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="publishing-keys"
      num="01"
      color="var(--at-teal)"
      eyebrow="Publishing signing keys on a JWKS"
      title="Set up the C3-hh-cm-client application"
      tone="cream"
    >
      <EdBullets>
        <li>Create an Application in your Trust Framework Organisation labelled <code>C3-hh-cm-client</code>.</li>
        <li>Create both the <strong>C3</strong> transport client certificate and <strong>Sig4</strong> signing certificate in this Application using the code snippets provided in the Trust Framework.</li>
        <li>The Trust Framework will create a unique <code>kid</code> and host the JWKS.</li>
        <li>When publishing a new key, wait <strong>10 minutes</strong> before issuing a message signed with that key. This allows the receiver's JWKS cache to refresh.</li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="constructing-token"
      num="02"
      color="var(--at-gold)"
      eyebrow="Constructing the token"
      title="Sign with PS256 over mTLS"
      tone="surface"
    >
      <EdBullets>
        <li>Ensure the machine generating the signature uses <strong>NTP</strong> to synchronise its clock.</li>
        <li>Construct the JWT header and payload as specified in the <a href="#claims-reference">Claims Reference</a> below.</li>
        <li>Sign the JWT using the <strong>PS256</strong> algorithm with a private signing key from the <code>C3-hh-cm-client</code> application.</li>
        <li>Include the JWT as a <code>Bearer</code> token in the <code>Authorization</code> HTTP header.</li>
        <li>The HTTPS request MUST be made over mutual TLS. The <strong>C3</strong> client certificate MUST be used to initiate the mTLS session, and MUST have a <code>DN</code> and <code>OU</code> that match the values placed in the JWT signature claims.</li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="claims-reference"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="JWT Auth claims reference"
      title="Header and body claims"
      tone="cream"
    >
      <h3>Header</h3>
      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Claim</th>
              <th>Expected Value</th>
              <th style="text-align:center">Mandatory</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>alg</code></td>
              <td><code>PS256</code></td>
              <td style="text-align:center">Yes</td>
              <td></td>
            </tr>
            <tr>
              <td><code>typ</code></td>
              <td><code>JOSE</code></td>
              <td style="text-align:center">Yes</td>
              <td></td>
            </tr>
            <tr>
              <td><code>cty</code></td>
              <td><code>json</code></td>
              <td style="text-align:center">Yes</td>
              <td></td>
            </tr>
            <tr>
              <td><code>kid</code></td>
              <td>The key ID of the keypair used to sign the message, as published on the JWKS.</td>
              <td style="text-align:center">Yes</td>
              <td>Other means of identifying the key (e.g. <code>x5c</code>, <code>x5u</code>) are not supported.</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3>Body</h3>
      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Claim</th>
              <th>Expected Value</th>
              <th style="text-align:center">Mandatory</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>iss</code></td>
              <td>The organisation <code>O</code> value from the TLS certificate Subject used in the transport layer.</td>
              <td style="text-align:center">Yes</td>
              <td>For a certificate with Subject <code>CN=ABC, OU=XYZ, O=Acme Bank, C=AE</code>, this would be <code>Acme Bank</code>.</td>
            </tr>
            <tr>
              <td><code>sub</code></td>
              <td>The organisation unit <code>OU</code> value from the TLS certificate Subject used in the transport layer.</td>
              <td style="text-align:center">Yes</td>
              <td>For the same certificate, this would be <code>XYZ</code>.</td>
            </tr>
            <tr>
              <td><code>aud</code></td>
              <td>Identifier for the party receiving the JWT.</td>
              <td style="text-align:center">Yes</td>
              <td>This MUST be set to the <code>PROVIDER_ID</code> specified during configuration.</td>
            </tr>
            <tr>
              <td><code>exp</code></td>
              <td>Time when the JWT will expire, in UTC seconds since epoch.</td>
              <td style="text-align:center">Yes</td>
              <td>Recommended expiry: 10&ndash;30 seconds. When validating, allow for a 10-second clock skew. The JWT is invalid if the current time is greater than this value.</td>
            </tr>
            <tr>
              <td><code>iat</code></td>
              <td>Time when the JWT was issued, in UTC seconds since epoch.</td>
              <td style="text-align:center">Yes</td>
              <td>When validating, allow for a 10-second clock skew. The JWT is invalid if the current time is less than this value.</td>
            </tr>
            <tr>
              <td><code>nbf</code></td>
              <td>Time before which the JWT is invalid, in UTC seconds since epoch.</td>
              <td style="text-align:center">No</td>
              <td>When validating, allow for a 10-second clock skew. The JWT is invalid if the current time is less than this value (when specified).</td>
            </tr>
            <tr>
              <td><code>jti</code></td>
              <td>A unique identifier for the JWT.</td>
              <td style="text-align:center">Yes</td>
              <td>Recommended: populate with a UUIDv4 to increase entropy.</td>
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
.ed-doc__lede--tight { margin-top: 1rem; }
.ed-doc__lede :deep(strong) { color: var(--at-navy-deep); font-weight: 600; }
.ed-doc__lede :deep(code) {
  font-family: var(--at-mono);
  font-size: 0.86em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  padding: 0.08em 0.4em;
}
.ed-doc__lede :deep(a) {
  color: var(--at-teal-deep);
  text-decoration: none;
  border-bottom: 1px solid currentColor;
}

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
}
</style>
