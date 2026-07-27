<route lang="yaml">
meta:
  title: Opening the Authorization Redirect
</route>

<script setup lang="ts">
const redirectUrl = `https://auth1.altareq1.sandbox.apihub.openfinance.ae/auth?client_id={clientId}&response_type=code&request_uri={request_uri}`

const webRedirectCode = `// Browser-based web app — top-level, full-page navigation.
// authorizationUrl = authorization_endpoint + client_id, response_type, request_uri
window.location.assign(authorizationUrl)

// Server-side equivalent (e.g. Express):
// res.redirect(303, authorizationUrl)`
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          Security · FAPI · Redirect
        </div>
        <h1 class="ed-doc__title">
          Opening the Authorization Redirect
          <span class="ed-doc__read">4 min read</span>
        </h1>
        <p class="ed-doc__lede">
          After you submit a <code>/par</code> request, you construct the authorization URL and send the
          customer to the LFI's <strong>Authorization Endpoint</strong> to authenticate and authorise the
          consent. <strong>How</strong> your application opens that URL is security-critical &mdash; get it
          wrong and you break app-to-app redirection or expose the customer to credential theft.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="the-redirect"
      num="01"
      color="var(--at-teal)"
      eyebrow="What you are opening"
      title="The authorization URL built from the /par response"
      tone="cream"
    >
      <EdProse>
        The API Hub returns a <code>request_uri</code> from your
        <a href="/tech/tpp-standards/v2.1/consent/api-guide">PAR request</a>. You combine it with the
        LFI's <code>authorization_endpoint</code> (read from
        <a href="/tech/tpp-standards/trust-framework/well-known/"><code>.well-known/openid-configuration</code></a>)
        to build the redirect URL:
      </EdProse>

      <EdCode :code="redirectUrl" lang="plaintext" filename="Authorization URL" />

      <EdProse>
        This URL is a stable, publicly accessible HTTPS endpoint owned by the LFI. On mobile it is
        configured as a verified deep link, so opening it correctly can hand the customer straight into
        the LFI's banking app. The guidance below covers how to open it from within your app; once the
        customer finishes at the LFI, they are redirected back to your <code>redirect_uri</code> &mdash;
        see <a href="/tech/tpp-standards/security/fapi/handling-callback">Handling Authorization Callbacks</a>.
      </EdProse>
    </EdSectionBand>

    <RedirectLaunchGuidance
      audience="TPP"
      target-app="the LFI's mobile banking app"
      redirect-name="authorization redirect"
      :start-num="2"
    >
      <template #web-desktop="{ num }">
        <EdSectionBand
          id="opening-outside-app"
          :num="num"
          color="var(--at-navy)"
          eyebrow="Opening the link outside a mobile app"
          title="Web and desktop: full-page redirect, never an iframe"
          tone="surface"
        >
          <EdProse>
            If your app runs in a web browser instead of as a native mobile app &mdash; on desktop or
            mobile web &mdash; opening the redirect is simpler. Send the customer to the LFI's Authorization
            Endpoint with a normal <strong>full-page browser redirect</strong>.
          </EdProse>

          <EdCode :code="webRedirectCode" lang="typescript" filename="Full-page redirect" />

          <EdBullets>
            <li><strong>Navigate the whole page</strong> &mdash; <code>window.location.assign(url)</code> client-side, or a <code>302</code>/<code>303</code> from your server. The customer sees the LFI's real domain in the address bar, a key anti-phishing signal.</li>
            <li><strong>Never render the LFI's authorization or authentication screens in an <code>&lt;iframe&gt;</code> or embedded frame</strong> (including hidden iframes). This is the web equivalent of the embedded-WebView prohibition &mdash; the same RFC 8252 / FAPI rationale, plus clickjacking &mdash; and the LFI sends frame-busting headers that will block it regardless.</li>
            <li><strong>Avoid popups and new tabs or windows</strong> &mdash; popup blockers, lost address-bar visibility, and poor mobile-web behaviour make same-tab redirection the reliable choice.</li>
            <li><strong>Preserve <code>state</code> and the PKCE <code>code_verifier</code></strong> in server-side session or secure storage so they survive the round-trip.</li>
          </EdBullets>

          <EdProse>
            On <strong>desktop</strong>, handing the customer to a mobile app is the LFI's responsibility
            once they land on the Authorization Endpoint &mdash; via QR scan, push-to-app, or browser-based
            authentication. Your job is only the full-page redirect. See
            <a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/auth-endpoint#desktop-browser">Authorization Endpoint &mdash; Desktop browser behaviour</a>.
          </EdProse>

          <EdNote type="info" title="Aligned with UK Open Banking">
            <p>
              UK Open Banking's redirection model is always domain-to-domain and full-page &mdash; an
              inbound screen (TPP domain &rarr; LFI domain) and an outbound screen (LFI domain &rarr; TPP
              domain) &mdash; which explicitly excludes iframes and embedded webviews. Desktop customers who
              need a mobile app are served by decoupled / QR-code hand-off, driven by the LFI. The rule for
              the TPP is the same in both cases: redirect the full page and let the LFI drive the hand-off.
            </p>
          </EdNote>
        </EdSectionBand>
      </template>
    </RedirectLaunchGuidance>
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
.ed-doc__lede code {
  font-family: var(--at-mono);
  font-size: 0.86em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  padding: 0.08em 0.4em;
}

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
}
</style>
