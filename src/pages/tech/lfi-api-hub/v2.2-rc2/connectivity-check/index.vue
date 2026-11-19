<route lang="yaml">
meta:
  title: Connectivity Check
  isIndex: true
</route>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          LFI · Ozone Connect · Connectivity Check
        </div>
        <h1 class="ed-doc__title">
          Connectivity Check
          <span class="ed-doc__read">3 min read</span>
        </h1>
        <p class="ed-doc__lede">
          The <strong>Connectivity Check API</strong> is a small family of Ozone Connect endpoints implemented
          by your LFI. Ozone calls these endpoints from the API Hub to verify end-to-end connectivity,
          mutual TLS, and client-certificate propagation between the Hub and your Ozone Connect surface. The
          OpenAPI specification for these endpoints is published as <em>Ozone Connect - Health Check APIs</em>.
        </p>
        <p class="ed-doc__lede ed-doc__lede--tight">
          These endpoints MUST be implemented and reachable before your integration can proceed to
          testing &mdash; they are the first endpoints Ozone calls during
          <a href="/tech/lfi-api-hub/v2.2-rc2/api-hub/onboarding/environment-specific/#connectivity-validation">onboarding connectivity validation</a>.
          After onboarding, the API Hub does not call them automatically, but you MUST keep them in
          place so that connectivity issues can be debugged quickly.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="endpoints"
      num="01"
      color="var(--at-teal)"
      eyebrow="Endpoints"
      title="The three Connectivity Check endpoints"
      tone="cream"
    >
      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Endpoint</th>
              <th>Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><a href="/tech/lfi-api-hub/v2.2-rc2/connectivity-check/open-api/hello" class="endpoint"><span class="http-method http-method--get">GET</span><code>/hello</code></a></td>
              <td>Basic connectivity check with no mTLS. Confirms network routing and that your Ozone Connect server is reachable from the Hub. Used early in onboarding, before mTLS is enforced &mdash; see <a href="#after-mtls">After mTLS enforcement</a>.</td>
            </tr>
            <tr>
              <td><a href="/tech/lfi-api-hub/v2.2-rc2/connectivity-check/open-api/hello-mtls" class="endpoint"><span class="http-method http-method--get">GET</span><code>/hello-mtls</code></a></td>
              <td>Same as <code>/hello</code> but requires a valid client certificate. Confirms that mutual TLS is correctly terminated at your edge.</td>
            </tr>
            <tr>
              <td><a href="/tech/lfi-api-hub/v2.2-rc2/connectivity-check/open-api/echo-cert" class="endpoint"><span class="http-method http-method--get">GET</span><code>/echo-cert</code></a></td>
              <td>Returns the client certificate details your server received. Used to debug certificate propagation through reverse proxies and load balancers &mdash; useful when mTLS appears to succeed at the edge but the cert is stripped before reaching your application.</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>
    </EdSectionBand>

    <EdSectionBand
      id="when-called"
      num="02"
      color="var(--at-gold)"
      eyebrow="When these endpoints are called"
      title="During onboarding, then only on demand"
      tone="surface"
    >
      <EdBullets>
        <li>
          <strong>During onboarding.</strong> Before your integration can proceed to testing, Ozone runs
          end-to-end connectivity validation in both directions. On the LFI side, this means calling
          <code>/hello</code>, <code>/hello-mtls</code>, and <code>/echo-cert</code> on your Ozone
          Connect server. See
          <a href="/tech/lfi-api-hub/v2.2-rc2/api-hub/onboarding/environment-specific/#connectivity-validation">Environment Specific &mdash; end-to-end validation</a>.
        </li>
        <li>
          <strong>On demand, to debug connectivity.</strong> After onboarding, Ozone calls these
          endpoints only when connectivity needs to be checked or debugged &mdash; for example after a
          transport certificate rotation, after a change to network routing, or while investigating a
          connectivity issue.
        </li>
      </EdBullets>

      <EdNote type="info" title="No automatic calls">
        <p>
          The API Hub does not call these endpoints automatically or on a schedule. They are
          diagnostic endpoints, not a health-monitoring feed.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="after-mtls"
      num="03"
      color="var(--at-navy)"
      eyebrow="After mTLS enforcement"
      title="Keep the endpoints in place; expect /hello to stop answering"
      tone="cream"
    >
      <EdProse>
        Once connectivity has been established and verified, mTLS MUST be enforced across the whole
        Ozone Connect Base URL &mdash; see
        <a href="/tech/lfi-api-hub/production/testing-certification/security-validation#mtls">Security Validation</a>.
        From then on, <code>GET /hello</code> no longer works as a check without mTLS: a request without a
        client certificate fails at the TLS handshake, like any other request to your Ozone Connect
        server.
      </EdProse>

      <EdNote type="info" title="This is expected">
        <p>
          <code>GET /hello</code> failing without a client certificate is the correct result once mTLS is
          enforced, not a defect. Do not exempt <code>/hello</code> from mTLS to keep it answering.
        </p>
      </EdNote>

      <EdProse>
        <code>GET /hello-mtls</code> and <code>GET /echo-cert</code> continue to work for the API Hub.
        You MUST keep all three endpoints in place after go-live. When a connectivity issue occurs,
        they let Ozone quickly isolate where it lies:
      </EdProse>

      <EdBullets>
        <li>
          <code>/hello-mtls</code> fails at the handshake: the problem is in your mTLS configuration,
          such as the trusted CA bundle, the server certificate, or the pin to the API Hub's C4
          certificate.
        </li>
        <li>
          <code>/hello-mtls</code> succeeds but <code>/echo-cert</code> returns no certificate or the
          wrong one: the client certificate is being lost between the component that terminates TLS and
          your application.
        </li>
        <li>
          Both succeed: transport and certificate propagation are working, so the problem lies
          elsewhere.
        </li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="base-path"
      num="04"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Base path"
      title="Where these endpoints sit on your Ozone Connect server"
      tone="surface"
    >
      <EdProse>
        These endpoints sit on your Ozone Connect server alongside the Banking and Consent Events APIs.
        If you configure a path override for the Connectivity Check family during onboarding, the Hub calls
        <code>OzoneConnectURL/&lt;path&gt;/&lt;endpoint&gt;</code> &mdash; see
        <a href="/tech/lfi-api-hub/v2.2-rc2/api-hub/onboarding/environment-specific/#optional-api-family-base-paths">Environment Specific &mdash; optional API family base paths</a>.
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
