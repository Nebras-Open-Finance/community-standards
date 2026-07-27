<route lang="yaml">
meta:
  title: Opening the Return Redirect
</route>

<script setup lang="ts">
const redirectResponse = `HTTP/1.1 303 See Other
Location: https://tpp.example.com/callback?code=fbe03604-baf2-4220-b7dd-05b14de19e5c&state=d2fe5e2c-77cd-4788-b0ef-7cf0fc8a3e54&iss=https://auth1.altareq1.sandbox.apihub.openfinance.ae`
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          LFI · Consent Journey · Redirect
        </div>
        <h1 class="ed-doc__title">
          Opening the Return Redirect
          <span class="ed-doc__read">4 min read</span>
        </h1>
        <p class="ed-doc__lede">
          Once the customer has authenticated and made their decision, you complete the interaction by
          calling <code>doConfirm</code> or <code>doFail</code> on the Headless Heimdall Auth Server. The
          response returns the URL to send the customer <strong>back to the TPP</strong>.
          <strong>How</strong> your app opens that URL is security-critical &mdash; get it wrong and you
          break app-to-app redirection or expose the customer to credential theft.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="the-redirect"
      num="01"
      color="var(--at-teal)"
      eyebrow="What you are opening"
      title="The URL returned by doConfirm / doFail"
      tone="cream"
    >
      <EdProse>
        After you post the customer's decision, Headless Heimdall responds with an HTTP
        <code>303</code> whose <code>Location</code> header carries the redirect URI &mdash; the URL that
        returns the authorization result (or error) to the TPP. Your app is responsible for opening it:
      </EdProse>

      <EdCode :code="redirectResponse" lang="http" filename="doConfirm / doFail — 303 response" />

      <EdProse>
        This URL is the TPP's registered <code>redirect_uri</code>. On mobile it may be a verified deep
        link into the TPP's app, so opening it correctly can hand the customer straight back into the app
        they started in. See the endpoint references for
        <a href="/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/open-api/auth-interactionId-doConfirm"><code>doConfirm</code></a>
        and
        <a href="/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/open-api/auth-interactionId-doFail"><code>doFail</code></a>,
        and the <a href="/tech/lfi-api-hub/v2.1/consent-journey/api-guide">Consent Journey API Guide</a>
        for the full flow.
      </EdProse>

      <EdNote type="info" title="Inbound vs outbound">
        <p>
          This page covers the <strong>outbound</strong> redirect &mdash; sending the customer from your
          app back to the TPP. For the <strong>inbound</strong> direction &mdash; how the customer's
          arrival at your Authorization Endpoint opens your own app &mdash; see
          <a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/auth-endpoint">Authorization Endpoint</a>.
        </p>
      </EdNote>
    </EdSectionBand>

    <RedirectLaunchGuidance
      audience="LFI"
      target-app="the TPP's mobile app"
      redirect-name="return redirect"
      :start-num="2"
    >
      <template #web-desktop="{ num }">
        <EdSectionBand
          id="opening-outside-app"
          :num="num"
          color="var(--at-navy)"
          eyebrow="Opening the link outside a mobile app"
          title="Web and desktop: follow the 303 as a full-page redirect"
          tone="surface"
        >
          <EdProse>
            If the customer authenticated in a web browser &mdash; your desktop or mobile web channel
            &mdash; instead of your native app, opening the return redirect is simpler. Just follow the
            <code>doConfirm</code> / <code>doFail</code> <code>303</code> as a normal <strong>full-page
            browser redirect</strong> back to the TPP's <code>redirect_uri</code>.
          </EdProse>

          <EdBullets>
            <li><strong>Follow the <code>Location</code> header at the top level of the browser</strong> &mdash; a standard <code>303</code> redirect. Do not wrap the return in an <code>&lt;iframe&gt;</code> or embedded frame.</li>
            <li><strong>Desktop cross-device journeys</strong> &mdash; where the customer started on a desktop browser and authenticated on their phone &mdash; complete on your Authorization Endpoint page, which polls for completion and then performs this redirect. See <a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/auth-endpoint#desktop-browser">Authorization Endpoint &mdash; Desktop browser behaviour</a>.</li>
          </EdBullets>

          <EdNote type="info" title="Aligned with UK Open Banking">
            <p>
              UK Open Banking's redirection model is domain-to-domain and full-page in both directions
              &mdash; the outbound screen returns the customer from the LFI domain to the TPP domain &mdash;
              and never embeds one party's pages inside the other. Desktop customers who authenticate on a
              second device are handled by decoupled / QR-code hand-off on your Authorization Endpoint.
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
