<route lang="yaml">
meta:
  title: Headless Heimdall Auth Server
  isIndex: true
</route>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          LFI · API Hub · Headless Heimdall
        </div>
        <h1 class="ed-doc__title">
          Headless Heimdall Auth Server
          <span class="ed-doc__read">2 min read</span>
        </h1>
        <p class="ed-doc__lede">
          The <strong>Headless Heimdall Auth Server</strong> is an API provided by the API Hub that powers
          the consent authorisation journey. It shields your authorisation server from the complexity of
          raw OIDC and FAPI 2.0 &mdash; your system calls three endpoints at the appropriate points in the
          customer journey and the API Hub handles the rest.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="base-url"
      num="01"
      color="var(--at-teal)"
      eyebrow="Base URL"
      title="Per-environment Headless Heimdall hosts"
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
              <td><code>https://hh.{lfiCode}.preprod.apihub.openfinance.ae</code></td>
            </tr>
            <tr>
              <td>Production</td>
              <td><code>https://hh.{lfiCode}.apihub.openfinance.ae</code></td>
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
        All requests to the Headless Heimdall Auth Server MUST be made using the
        <strong>C3-hh-cm-client</strong> application registered in the Trust Framework. This is the same
        client used to call the
        <a href="/tech/lfi-api-hub/v2.1/api-hub/consent-manager/">Consent Manager</a>.
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
      id="consent-journey"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="How it fits into the consent journey"
      title="Three endpoints, one FAPI 2.0 authorisation code flow"
      tone="cream"
    >
      <EdProse>
        When a TPP initiates a consent request, the API Hub creates the consent record and redirects the
        end user to your authorisation endpoint. From that point, your authorisation server interacts with the
        Headless Heimdall Auth Server to coordinate the FAPI 2.0 authorisation code flow:
      </EdProse>

      <EdBullets>
        <li>
          <strong><span class="endpoint"><span class="http-method http-method--get">GET</span><code>/auth</code></span></strong> &mdash; Your authorisation server calls this at the start
          of every authorisation code grant. The API Hub validates the FAPI/OIDC request and returns the
          interaction context and the decoded consent details. Your system uses these details to present
          the consent to the end user for approval.
        </li>
        <li>
          <strong><span class="endpoint"><span class="http-method http-method--post">POST</span><code>/auth/{interactionId}/doConfirm</code></span></strong> &mdash; After the end user has
          authenticated and authorised the consent, your system calls this to complete the interaction. The
          API Hub updates the consent state and issues tokens to the TPP.
        </li>
        <li>
          <strong><span class="endpoint"><span class="http-method http-method--post">POST</span><code>/auth/{interactionId}/doFail</code></span></strong> &mdash; If authentication fails
          or the end user rejects the consent, your system calls this to end the interaction. The API Hub
          initiates an error redirect back to the TPP.
        </li>
      </EdBullets>

      <EdNote type="tip" title="Consent Manager interaction">
        <p>
          During the authorisation journey, your system will typically also call the
          <a href="/tech/lfi-api-hub/v2.1/api-hub/consent-manager/">Consent Manager</a>
          to read the full consent object and update its state. Both APIs work together to complete the
          journey.
        </p>
      </EdNote>

      <EdProse>
        For the full API flow, see the
        <a href="/tech/lfi-api-hub/v2.1/consent-journey/api-guide">Consent Journey API Guide</a>.
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
