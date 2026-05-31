<route lang="yaml">
meta:
  title: API Hub Overview
  isIndex: true
</route>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          LFI · API Hub · Overview
        </div>
        <h1 class="ed-doc__title">
          API Hub Overview
          <span class="ed-doc__read">5 min read</span>
        </h1>
        <p class="ed-doc__lede">
          The <strong>API Hub</strong> &mdash; powered by Ozone &mdash; is the central Open Finance gateway
          that connects Licensed Financial Institutions (LFIs) to the ecosystem. It acts as both the
          <strong>OIDC Authorization Server</strong> and the <strong>Open Finance Gateway</strong>, managing
          all incoming TPP traffic on your behalf.
        </p>
        <p class="ed-doc__lede ed-doc__lede--tight">
          As an LFI, you connect your Ozone Connect base URL and authorization endpoint to the Hub
          <strong>once</strong>. The Hub then handles TPP credential verification, security enforcement,
          request routing, and consent management.
        </p>
        <p class="ed-doc__lede ed-doc__lede--tight">
          All TPP traffic MUST flow through the API Hub &mdash; TPPs never call LFI Ozone Connect endpoints
          directly.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="architecture"
      num="01"
      color="var(--at-teal)"
      eyebrow="Architecture"
      title="How the API Hub fits between TPPs and your LFI"
      tone="cream"
    >
      <APIFlowViewer title="API Hub Architecture">
        <APIFlowsAPIHubArchitecture />
      </APIFlowViewer>

      <EdProse>
        The canonical request path is:
        <strong>TPP &rarr; API Hub &rarr; LFI &rarr; API Hub &rarr; TPP</strong>. The API Hub validates the
        TPP's token and consent, enforces OpenAPI schemas, enriches the request with customer and consent
        context, then proxies it to the corresponding Ozone Connect endpoint on your LFI. Your Ozone Connect
        endpoint executes the operation and returns the response, which the Hub normalizes before delivering
        to the TPP.
      </EdProse>

      <EdProse>
        Each LFI's Hub instance is a <strong>dedicated isolated tenant</strong> &mdash; your consent store,
        audit logs, and configuration are on completely separate infrastructure from every other LFI in the
        ecosystem.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="hub-responsibilities"
      num="02"
      color="var(--at-gold)"
      eyebrow="What the Hub handles"
      title="Hub-side responsibilities"
      tone="surface"
    >
      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Responsibility</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>TPP credential verification</strong></td>
              <td>Validates the TPP's certificate and software statement against the Trust Framework on every request</td>
            </tr>
            <tr>
              <td><strong>FAPI 2.0 security</strong></td>
              <td>Enforces PAR, mTLS-bound access tokens, DPoP, and JWS message signing</td>
            </tr>
            <tr>
              <td><strong>Consent lifecycle</strong></td>
              <td>Stores and enforces all consent records &mdash; data sharing and payment consents. The API Hub is the <strong>single source of truth</strong> for all consent state</td>
            </tr>
            <tr>
              <td><strong>Token issuance</strong></td>
              <td>Issues all access tokens to TPPs after successful consent authorization. The API Hub is the sole token issuer &mdash; LFIs MUST NOT issue tokens to TPPs</td>
            </tr>
            <tr>
              <td><strong>API routing</strong></td>
              <td>Routes inbound TPP requests to the correct Ozone Connect endpoint on your LFI, enriching each request with <code>customerId</code>, <code>accountIds</code>, and TPP information</td>
            </tr>
            <tr>
              <td><strong>Participant discovery</strong></td>
              <td>Publishes your <code>/.well-known/openid-configuration</code> so TPPs can discover your endpoints</td>
            </tr>
            <tr>
              <td><strong>Error mapping</strong></td>
              <td>Maps LFI error responses to the TPP-facing standard, normalizing response formats across the ecosystem</td>
            </tr>
            <tr>
              <td><strong>Audit logging</strong></td>
              <td>Maintains a tamper-evident log of all API interactions for regulatory purposes</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>
    </EdSectionBand>

    <EdSectionBand
      id="lfi-responsibilities"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="What you handle"
      title="LFI-side responsibilities"
      tone="cream"
    >
      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Responsibility</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Ozone Connect endpoints</strong></td>
              <td>Expose your banking APIs (accounts, payments, CoP, etc.) via Ozone Connect. The API Hub routes verified requests to these endpoints</td>
            </tr>
            <tr>
              <td><strong>End user authentication</strong></td>
              <td>Authenticate the customer when they are redirected to your authorization endpoint during consent flows. The API Hub handles the OIDC authorization protocol; your system authenticates the person</td>
            </tr>
            <tr>
              <td><strong>Business logic &amp; data retrieval</strong></td>
              <td>Execute the requested operation &mdash; retrieve account data, initiate payments, check balances &mdash; and return the response per the LFI OpenAPI specification</td>
            </tr>
            <tr>
              <td><strong>Fraud &amp; risk checks</strong></td>
              <td>Apply your institution's fraud detection and risk assessment on incoming requests</td>
            </tr>
            <tr>
              <td><strong>Consent authorization UX</strong></td>
              <td>Present the consent details to the end user and capture their authorization decision via your application</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>
    </EdSectionBand>

    <EdSectionBand
      id="consent-and-data"
      num="04"
      color="var(--at-navy)"
      eyebrow="Consent &amp; data"
      title="Hub as the single source of truth"
      tone="surface"
    >
      <EdProse>
        <strong>The Hub is the source of truth for all consent records.</strong> Whether a customer revokes
        a consent through your CMI, or a TPP modifies a consent through their interface, both parties MUST
        patch the change to the Hub immediately. LFIs MUST NOT maintain independent consent state that
        diverges from the Hub's record. Any consent state held in your own systems must exactly match the
        Hub's record at all times.
      </EdProse>

      <EdProse>
        <strong>The Hub never reads or stores request and response payload data.</strong> Account details,
        transaction records, payment instructions, and all other customer data returned by your Ozone
        Connect endpoints are routed through the Hub transparently &mdash; they are never inspected,
        logged, or retained. Only consent metadata and interaction audit events are stored by the Hub.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="trust-model"
      num="05"
      color="var(--at-teal-deep)"
      eyebrow="Trust model"
      title="What the LFI delegates to the Hub"
      tone="cream"
    >
      <EdProse>
        LFIs trust the API Hub for token validation and consent validation. When the Hub forwards a request
        to your Ozone Connect endpoint, the token and consent have already been verified &mdash; you do not
        need to re-query consent state from a separate store.
      </EdProse>

      <EdProse>
        Your Ozone Connect endpoints SHOULD validate the Bearer token signature and claims (issuer,
        audience, expiry, scope) as described in
        <a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/application-layer-auth">Application Layer Authentication</a>,
        but MUST NOT independently re-validate consent state against a separate consent store. The Hub's
        consent record is authoritative.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="request-lifecycle"
      num="06"
      color="var(--at-gold)"
      eyebrow="Request lifecycle"
      title="Consent authorization and API request flows"
      tone="surface"
    >
      <h3>Consent authorization</h3>
      <EdBullets>
        <li>TPP initiates a consent request via <strong>Pushed Authorization Request (PAR)</strong> to the API Hub</li>
        <li>API Hub creates and stores the consent record</li>
        <li>End user is redirected to your <strong>authorization endpoint</strong></li>
        <li>Your system <strong>authenticates the end user</strong> and presents the consent details for approval</li>
        <li>
          Your system calls the API Hub
          (<a href="/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/open-api/auth-interactionId-doConfirm"><code>/doConfirm</code></a>
          or
          <a href="/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/open-api/auth-interactionId-doFail"><code>/doFail</code></a>)
          with the authorization result
        </li>
        <li>API Hub issues an access token to the TPP</li>
      </EdBullets>

      <EdProse>
        For full authorization server integration details, see
        <a href="/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/">Headless Heimdall</a>.
      </EdProse>

      <h3>API request</h3>
      <EdBullets>
        <li>TPP sends an API request with its access token to the API Hub</li>
        <li>API Hub validates the token and consent, enforces the OpenAPI schema, and enriches the request with customer and consent context</li>
        <li>API Hub proxies the request to the corresponding <strong>Ozone Connect</strong> endpoint on your LFI</li>
        <li>Your Ozone Connect endpoint executes the operation and returns the response per the LFI OpenAPI specification</li>
        <li>API Hub normalizes the response and returns it to the TPP</li>
      </EdBullets>

      <EdProse>
        For request authentication details, see
        <a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/application-layer-auth">Application Layer Authentication</a>.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="endpoints-you-register"
      num="07"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Endpoints you register"
      title="Two endpoints per environment"
      tone="cream"
    >
      <EdProse>Two endpoints you operate are registered with the Hub per environment:</EdProse>

      <EdBullets>
        <li>
          <a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/ozone-connect-url"><strong>Ozone Connect Base URL</strong></a>
          &mdash; your Ozone Connect base URL; the Hub forwards verified TPP requests here for accounts,
          payments, CoP, and other Open Finance APIs
        </li>
        <li>
          <a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/auth-endpoint"><strong>Authorization Endpoint</strong></a>
          &mdash; customers are redirected here to <strong>authenticate</strong> and authorize consent
          requests; this is where your institution verifies the end user's identity
        </li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="environments"
      num="08"
      color="var(--at-navy)"
      eyebrow="Environments"
      title="Pre-production and production"
      tone="surface"
    >
      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Environment</th>
              <th>Trust Framework</th>
              <th>Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Pre-production</strong></td>
              <td>Sandbox</td>
              <td>Register an application in the Sandbox Trust Framework and use it to act as a TPP against the pre-production Hub &mdash; complete consent journeys and call the APIs to verify your Ozone Connect implementation end-to-end</td>
            </tr>
            <tr>
              <td><strong>Production</strong></td>
              <td>Production</td>
              <td>Live customer traffic</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>
        Both environments are structurally identical. The only differences are the mTLS certificates
        (issued from the production Trust Framework rather than Sandbox) and the environment-specific
        values for the Ozone Connect Base URL and Authorization Endpoint. See
        <a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/">Environment Specific Configuration</a>
        for the full details.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="admin-portal"
      num="09"
      color="var(--at-teal-deep)"
      eyebrow="Admin Portal"
      title="Operate your Hub instance"
      tone="cream"
    >
      <EdProse>
        The Hub provides an
        <a href="/tech/lfi-api-hub/v2.1/api-hub/admin-portal/"><strong>Admin Portal</strong></a>
        where your team can:
      </EdProse>

      <EdBullets>
        <li>Activate and manage TPP applications that have requested access to your APIs</li>
        <li>View real-time and historical API traffic and audit logs</li>
        <li>Manage your registered API resources and endpoint configuration</li>
        <li>Monitor consent status across your customer base</li>
      </EdBullets>
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
