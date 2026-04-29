<route lang="yaml">
meta:
  title: Application Layer Authentication
</route>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          LFI · API Hub · Onboarding · Application Layer Auth
        </div>
        <h1 class="ed-doc__title">
          Application Layer Authentication
          <span class="ed-doc__read">4 min read</span>
        </h1>
        <p class="ed-doc__lede">
          All communication between the API Hub and an LFI is secured at the transport layer using
          <strong>mutual TLS (mTLS)</strong>. In addition to mTLS, the API Hub supports several
          <strong>application layer authentication</strong> methods that provide defense-in-depth.
        </p>
        <p class="ed-doc__lede ed-doc__lede--tight">
          LFIs MUST select an application layer authentication method during onboarding. If you are unsure
          which method to choose, we recommend <strong>JWT Auth</strong>.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="how-to-request"
      num="01"
      color="var(--at-teal)"
      eyebrow="How to request configuration"
      title="Indicate your choice on the Service Desk ticket"
      tone="cream"
    >
      <EdProse>
        Indicate your chosen application layer authentication method, via the relevant API Hub Onboarding
        Service Desk ticket.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="communication-directions"
      num="02"
      color="var(--at-gold)"
      eyebrow="Communication directions"
      title="Two directions, not all methods supported in both"
      tone="surface"
    >
      <EdProse>Application layer authentication applies to two directions of communication:</EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Direction</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>API Hub to LFI</strong> (Ozone Connect)</td>
              <td>Requests the API Hub sends to your Ozone Connect endpoints when proxying TPP API calls.</td>
            </tr>
            <tr>
              <td><strong>LFI to API Hub</strong> (Consent Manager &amp; Headless Heimdall Auth Server)</td>
              <td>Requests your authorisation server sends to the API Hub's Consent Manager and Headless Heimdall Auth Server during consent and authorisation flows.</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>
        Not all methods are supported in both directions. The table below summarises availability.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="available-methods"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Available methods"
      title="Method-by-direction support matrix"
      tone="cream"
    >
      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Method</th>
              <th style="text-align:center">API Hub to LFI (Ozone Connect)</th>
              <th style="text-align:center">LFI to API Hub (CM &amp; Headless Heimdall)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><a href="#mtls-only">mTLS Only (Off)</a></td>
              <td style="text-align:center">Yes</td>
              <td style="text-align:center">Yes</td>
            </tr>
            <tr>
              <td><a href="#api-key">API Key</a></td>
              <td style="text-align:center">Yes</td>
              <td style="text-align:center">No</td>
            </tr>
            <tr>
              <td><a href="#client-credentials">Client Credentials Grant</a></td>
              <td style="text-align:center">Yes</td>
              <td style="text-align:center">No</td>
            </tr>
            <tr>
              <td><a href="#jwt-auth">JWT Auth</a></td>
              <td style="text-align:center">Yes</td>
              <td style="text-align:center">Yes</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdNote type="tip" title="Recommendation">
        <p>
          If you are unsure which method to select, choose <strong>JWT Auth</strong>. It offers strong
          security without requiring additional infrastructure, and is the only method (besides mTLS only)
          that is supported in both directions.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="mtls-only"
      num="04"
      color="var(--at-navy)"
      eyebrow="mTLS Only (Off)"
      title="No application-layer auth, mTLS only"
      tone="surface"
    >
      <EdProse>
        In this configuration, application layer authentication is switched off. The integration relies
        solely on the mutual TLS connection for authentication.
      </EdProse>
      <EdProse>
        This is the simplest option to implement &mdash; no additional application-layer work is required
        beyond configuring mTLS.
      </EdProse>
      <EdProse>
        The main drawback is the lack of defense-in-depth: security relies on a single layer.
      </EdProse>
      <EdProse>This setting can be applied in both directions.</EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="api-key"
      num="05"
      color="var(--at-teal-deep)"
      eyebrow="API Key"
      title="Shared secret in request headers"
      tone="cream"
    >
      <EdProse>
        An API Key is a shared secret used between the LFI and the API Hub. The API Hub includes the key
        in requests to your Ozone Connect endpoints.
      </EdProse>
      <EdProse>
        API Keys are the most basic form of application layer authentication. While they provide limited
        security benefit compared to other methods, they MAY be appropriate as a starting point or for
        LFIs that use an existing API Gateway that enforces API Key validation.
      </EdProse>

      <h3>Constraints</h3>
      <EdBullets>
        <li>Supported for <strong>Ozone Connect only</strong> (API Hub to LFI direction).</li>
        <li>NOT supported for Consent Manager or Headless Heimdall Auth Server APIs.</li>
        <li>The API Key MUST have a validity of 12 months or more. Key rotation is supported annually.</li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="client-credentials"
      num="06"
      color="var(--at-gold)"
      eyebrow="Client Credentials Grant"
      title="OIDC token from an LFI-hosted authorisation server"
      tone="surface"
    >
      <EdProse>
        The API Hub obtains an access token via an OIDC Client Credentials Grant from an authorisation
        server managed by the LFI. The API Hub then includes this token in requests to your Ozone Connect
        endpoints.
      </EdProse>
      <EdProse>
        This is a well-established and secure mechanism. Security can be further strengthened by
        implementing a FAPI profile on the LFI's authorisation server.
      </EdProse>

      <h3>Constraints</h3>
      <EdBullets>
        <li>Supported for <strong>Ozone Connect only</strong> (API Hub to LFI direction).</li>
        <li>NOT supported for Consent Manager or Headless Heimdall Auth Server APIs.</li>
        <li>Requires the LFI to operate its own authorisation server.</li>
        <li>MAY result in a small increase in latency, as the API Hub makes an additional call to obtain the access token.</li>
        <li>Where a <code>client_secret</code> is used, it MUST have a validity of 12 months or more. Secret rotation is supported annually.</li>
        <li><code>scope</code> values are configured during onboarding based on LFI requirements.</li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="jwt-auth"
      num="07"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="JWT Auth"
      title="Recommended — PS256-signed JWT in headers"
      tone="cream"
    >
      <EdProse>
        JWT Auth is a standard for secure and efficient application layer authentication. The requestor
        creates a signed JWT using a private key and a set of well-defined claims. The receiver verifies
        the token using the corresponding public key published on a JWKS endpoint hosted by the Trust
        Framework.
      </EdProse>
      <EdProse>
        JWT Auth is the <strong>recommended</strong> method. It offers the following advantages:
      </EdProse>

      <EdBullets>
        <li>Uses <strong>PS256</strong> &mdash; a secure asymmetric algorithm that does not rely on shared secrets.</li>
        <li>No additional infrastructure is required &mdash; signing keys are generated and managed through the Trust Framework.</li>
        <li>Key rotation is managed by the sending party; the receiver uses the JWKS for verification.</li>
        <li>JWT claims bind the token to the certificates used in the underlying mTLS layer, providing strong binding between transport and application layers.</li>
      </EdBullets>

      <h3>Constraints</h3>
      <EdBullets>
        <li>LFIs MUST implement JWT creation (as client) and JWT validation (as server) in their integration.</li>
      </EdBullets>

      <h3>Supported in both directions</h3>
      <EdBullets>
        <li><strong>API Hub to LFI</strong> (Ozone Connect) &mdash; the API Hub sends a JWT Auth token with each request to your Ozone Connect endpoints. Your server validates the token.</li>
        <li><strong>LFI to API Hub</strong> (Consent Manager &amp; Headless Heimdall Auth Server) &mdash; if you choose to enable this, your authorisation server sends a JWT Auth token with each request to the Consent Manager and Headless Heimdall Auth Server. The API Hub validates the token.</li>
      </EdBullets>

      <EdNote type="info" title="Optional LFI-to-Hub JWT Auth">
        <p>
          When selecting JWT Auth, you MAY also choose to send JWT Auth headers on your requests to the
          Consent Manager and Headless Heimdall Auth Server. This is configured separately &mdash;
          indicate your preference on the Service Desk ticket.
        </p>
      </EdNote>

      <EdProse>
        For full technical detail on constructing and validating JWT Auth tokens, see
        <a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/configuring-authentication/jwt-server">JWT Auth &mdash; Server-side</a>
        (your Ozone Connect server validating tokens from the API Hub) and
        <a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/configuring-authentication/jwt-client">JWT Auth &mdash; Client-side</a>
        (your authorisation server sending tokens to the API Hub).
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
.ed-doc__lede--tight { margin-top: 1rem; }
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
