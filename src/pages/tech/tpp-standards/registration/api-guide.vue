<route lang="yaml">
meta:
  title: Registering your Application
</route>

<script setup lang="ts">
const wellKnownExample = `"registration_endpoint": "https://rs1.[LFICode].apihub.openfinance.ae/tpp-registration"`

const curlExample = `curl <registration_endpoint> \\
  --request POST \\
  --header 'Content-Type: application/json' \\
  --cert path/to/your-cert.pem \\
  --key path/to/your-key.key \\
  --data '{}'`
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          TPP · Registration · Dynamic Client Registration
        </div>
        <h1 class="ed-doc__title">
          Registering your Application
          <span class="ed-doc__read">2 min read</span>
        </h1>
        <p class="ed-doc__lede">
          TPPs dynamically register their applications with LFIs by submitting a registration request to
          the LFI's <code>registration_endpoint</code>, which is discovered via the
          <code>.well-known</code> endpoint. This request includes the TPP application's transport
          certificate and corresponding private key to establish a secure and trusted connection.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="prerequisites"
      num="01"
      color="var(--at-teal)"
      eyebrow="Prerequisites"
      title="What you need before registering"
      tone="cream"
    >
      <EdProse>
        Before registering with an Authorisation Server, ensure the following requirements are met:
      </EdProse>

      <EdBullets>
        <li>
          <strong>Onboarded Organisation in the <a href="/tech/tpp-standards/trust-framework/">Trust Framework</a></strong>
          &mdash; your organisation must be successfully registered and approved within the Trust Framework.
        </li>
        <li>
          <strong>Registered <a href="/tech/tpp-standards/trust-framework/application">Application</a></strong>
          &mdash; the application must be created within the Trust Framework and assigned the appropriate
          <a href="/tech/tpp-standards/trust-framework/roles">roles</a> required for the intended use case.
        </li>
        <li>
          <strong>Valid <a href="/tech/tpp-standards/trust-framework/certificates">Transport Certificate</a></strong>
          &mdash; an active transport certificate must be issued and registered in the Trust Framework to
          enable secure <strong>mTLS communication</strong> with the Authorisation Server.
        </li>
        <li>
          <strong>Selected Authorisation Server</strong>
          &mdash; you must identify the Authorisation Server you intend to register with by using
          <a href="/tech/tpp-standards/trust-framework/api-discovery">API Discovery</a> to locate and
          select the appropriate endpoint.
        </li>
      </EdBullets>

      <EdNote type="warning" title="Roles are locked in at registration">
        <p>
          The roles assigned to your application (<code>BSIP</code>, <code>BDSP</code>,
          <code>ISP</code>) determine what it is permitted to do with the LFI. Once registered, editing the
          application's roles in the Trust Framework has no effect &mdash; the registered roles are fixed.
          If the roles later need to change, you must disable the application, create a new one with the
          correct roles, and register it again.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="registration-endpoint"
      num="02"
      color="var(--at-gold)"
      eyebrow="Retrieving the registration_endpoint"
      title="Discover the URL via .well-known"
      tone="surface"
    >
      <EdProse>
        Once you have identified the Authorisation Server you want to register with, you can locate its
        registration endpoint via the
        <a href="/tech/tpp-standards/trust-framework/well-known"><code>.well-known</code> OpenID configuration</a>.
      </EdProse>

      <EdProse>Within the returned JSON from the <code>.well-known</code> look for:</EdProse>

      <EdCode :code="wellKnownExample" lang="json" filename=".well-known excerpt" />

      <EdProse>This is the endpoint your TPP will use to register the application with.</EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="sequence-flow"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="API Sequence Flow"
      title="End-to-end TPP registration"
      tone="cream"
    >
      <APIFlowViewer title="TPP Registration API Flow">
        <APIFlowsRegistration />
      </APIFlowViewer>
    </EdSectionBand>

    <EdSectionBand
      id="post-tpp-registration"
      num="04"
      color="var(--at-navy)"
      eyebrow="POST /tpp-registration"
      title="Submitting the registration request"
      tone="surface"
    >
      <div class="ed-doc__endpoint">
        <span class="http-badge http-post">POST</span>
        <code class="ed-doc__endpoint-path">/tpp-registration</code>
      </div>

      <h3>Example request</h3>
      <EdCode :code="curlExample" lang="bash" filename="curl" />

      <EdProse>
        This endpoint uses <strong>mutual TLS (mTLS)</strong> with transport-level certificates. Make sure
        that:
      </EdProse>

      <EdBullets>
        <li><code>--cert</code> &mdash; path to your <strong>transport</strong> client certificate (<code>.pem</code>)</li>
        <li><code>--key</code> &mdash; path to your <strong>transport</strong> private key (<code>.key</code>)</li>
      </EdBullets>

      <EdProse>
        Once the registration is successful, you will receive a <strong>204 No Content</strong> response.
        This indicates that your application is registered with the server.
      </EdProse>

      <EdNote type="info" title="Your Client ID is not returned here">
        <p>
          <span class="endpoint"><span class="http-method http-method--post">POST</span><code>/tpp-registration</code></span> returns no body. Your <code>ClientId</code> is the UUID
          assigned to your application when it was created in the Trust Framework Directory &mdash; it is
          not issued by this endpoint. Find it on the application detail page: Organisation &rarr;
          Applications &rarr; select your application. See
          <a href="/tech/tpp-standards/trust-framework/application#your-client-id">Creating an Application</a>
          for a screenshot.
        </p>
        <p>
          You will need this value as <code>client_id</code>, <code>iss</code>, and <code>sub</code> in all
          Client Assertions and Request JWTs.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="activation"
      num="05"
      color="var(--at-teal-deep)"
      eyebrow="Activation"
      title="Registration alone does not grant access"
      tone="cream"
    >
      <EdProse>
        Registration does not automatically grant access. Once a TPP submits a registration request to an
        LFI, the LFI must activate the TPP, the associated Client, and the Software Statement before the
        TPP can communicate with the LFI.
      </EdProse>

      <EdNote type="info" title="Model bank">
        <p>
          Registration with the <a href="/tech/tpp-standards/sandbox/model-bank">model bank</a> is
          activated automatically &mdash; no manual approval is required. For all other LFIs, activation
          must be performed by the LFI via their Admin Portal before the TPP can make API calls.
        </p>
      </EdNote>

      <EdProse>
        For guidance on how an LFI activates a TPP's registration request via their Admin Portal, please
        review the
        <a href="/tech/lfi-api-hub/v2.1/api-hub/admin-portal/tpp-activation">TPP Management &amp; Activation page</a>.
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
.ed-doc__lede :deep(code) {
  font-family: var(--at-mono);
  font-size: 0.86em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  padding: 0.08em 0.4em;
}

.ed-doc__endpoint {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  margin: 0.5rem 0 1.5rem;
}
.ed-doc__endpoint-path {
  font-family: var(--at-mono);
  font-size: 0.95rem;
  background: var(--at-surface);
  padding: 0.35rem 0.6rem;
  border: 1px solid var(--at-grid-line);
  color: var(--at-navy-deep);
}

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
}
</style>
