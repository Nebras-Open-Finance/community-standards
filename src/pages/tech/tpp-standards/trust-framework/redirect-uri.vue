<route lang="yaml">
meta:
  title: Application — Redirect URIs
</route>

<script setup lang="ts">
const callbackUrl = `https://yourapp.com/callback?code=fbe03604-baf2-4220-b7dd-05b14de19e5c&state=d2fe5e2c-77cd-4788-b0ef-7cf0fc8a3e54&iss=https://auth1.altareq1.sandbox.apihub.openfinance.ae`
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          TPP · Trust Framework · Applications
        </div>
        <h1 class="ed-doc__title">
          Redirect URIs
          <span class="ed-doc__read">2 min read</span>
        </h1>
        <p class="ed-doc__lede">
          Every application in the Trust Framework must have a configured <code>RedirectURI</code>. This
          <code>RedirectURI</code> is a specific, web address controlled by your application. It acts as
          the callback destination where the LFI sends the user after they complete authentication and
          authorizing the consent.
        </p>
        <ImageViewer
          src="/images/journeys/oauth-wireframe.png"
          alt="OAuth flow"
        />
        <p class="ed-doc__lede ed-doc__lede--tight">
          The following guide outlines how your <code>RedirectURI</code> can meet FAPI 2.0 requirements
          while still enabling deep linking into a mobile app.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="fapi-constraint"
      num="01"
      color="var(--at-teal)"
      eyebrow="FAPI 2.0 Constraint"
      title="Redirect URIs must be HTTPS — no custom URL schemes"
      tone="cream"
    >
      <EdProse>
        <strong>FAPI 2.0</strong> does not allow non-HTTPS redirect URIs. Therefore, you will not be able
        to use a custom URL scheme (e.g., <code>myapp://home</code>).
      </EdProse>

      <EdProse>
        To remain compliant with FAPI 2.0 and still support deep linking into your application, follow the
        steps below.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="universal-link"
      num="02"
      color="var(--at-gold)"
      eyebrow="Step 1"
      title="Set up an HTTPS-based Universal / App Link"
      tone="surface"
    >
      <EdProse>You'll need to make your app respond to a secure URL like:</EdProse>

      <EdCode :code="callbackUrl" lang="plaintext" filename="Callback URL" />

      <EdProse>
        For how to validate the callback (<code>state</code>, <code>iss</code>, single-use code, replay
        protection), see
        <a href="/tech/tpp-standards/security/fapi/handling-callback">Handling Authorization Callbacks</a>.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="handle-redirect"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Step 2"
      title="Handle the redirect in your app"
      tone="cream"
    >
      <EdProse>Once the user is redirected to the HTTPS URL:</EdProse>

      <EdBullets>
        <li>If your app is installed, it should open and process the URL (e.g., extract the authorization code).</li>
        <li>If your app is not installed, it should fall back to an appropriate web page to either complete the user journey on web or to encourage the user to install the app.</li>
      </EdBullets>

      <EdProse>
        By adopting this approach, you can continue supporting deep linking while ensuring compliance with
        the security standards required by FAPI 2.0.
      </EdProse>
    </EdSectionBand>

    <section class="ed-doc__contents">
      <div class="ed-doc__inner">
        <div class="ed-doc__contents-head">
          <div class="ed-doc__contents-eyebrow">
            <span class="ed-doc__eyebrow-dash" />
            Additional Resources
          </div>
          <h2 class="ed-doc__contents-title">Platform documentation</h2>
          <p class="ed-doc__contents-sub">Vendor guides for setting up the secure HTTPS-based deep links Apple and Google require on iOS and Android.</p>
        </div>

        <div class="ed-doc__contents-grid">
          <a class="ed-link-card" href="https://developer.apple.com/documentation/xcode/supporting-universal-links-in-your-app" target="_blank" rel="noopener" :style="{ '--card-color': 'var(--at-navy)' }">
            <span class="ed-link-card__top" />
            <div class="ed-link-card__meta"><span class="ed-link-card__cat">iOS · Apple</span></div>
            <h3 class="ed-link-card__title">Supporting Universal Links in Your App</h3>
            <p class="ed-link-card__desc">Apple's Xcode documentation covering the Associated Domains entitlement, the <code>apple-app-site-association</code> file your HTTPS host must serve, and how iOS routes a tapped link straight to your app when it's installed (and to Safari when it isn't).</p>
            <div class="ed-link-card__foot"><span class="ed-link-card__cta">Open on developer.apple.com</span><span class="ed-link-card__arrow">&nearr;</span></div>
          </a>

          <a class="ed-link-card" href="https://developer.android.com/training/app-links" target="_blank" rel="noopener" :style="{ '--card-color': 'var(--at-teal-deep)' }">
            <span class="ed-link-card__top" />
            <div class="ed-link-card__meta"><span class="ed-link-card__cat">Android</span></div>
            <h3 class="ed-link-card__title">Android App Links</h3>
            <p class="ed-link-card__desc">Google's training guide covering verified App Links, the <code>assetlinks.json</code> Digital Asset Links file your HTTPS host must serve, intent filters with <code>android:autoVerify="true"</code>, and how Android opens your app directly without the disambiguation dialog.</p>
            <div class="ed-link-card__foot"><span class="ed-link-card__cta">Open on developer.android.com</span><span class="ed-link-card__arrow">&nearr;</span></div>
          </a>
        </div>
      </div>
    </section>
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
.ed-doc__lede--tight { margin-top: 1.25rem; }
.ed-doc__lede :deep(strong) { color: var(--at-navy-deep); font-weight: 600; }
.ed-doc__lede :deep(code), .ed-doc__lede code {
  font-family: var(--at-mono);
  font-size: 0.86em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  padding: 0.08em 0.4em;
}

.ed-doc__contents { background: var(--at-surface); border-top: 1px solid var(--at-grid-line); padding: 3.5rem 0 4rem; }
.ed-doc__contents .ed-doc__inner { padding-top: 0; padding-bottom: 0; }
.ed-doc__contents-head { margin-bottom: 1.85rem; }
.ed-doc__contents-eyebrow {
  font-family: var(--at-mono);
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--at-teal);
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.ed-doc__contents-title {
  font-family: var(--at-serif);
  font-size: clamp(1.5rem, 2.6vw, 2rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.1;
  margin: 0 0 0.6rem;
  color: var(--at-navy-deep);
}
.ed-doc__contents-sub {
  font-family: var(--at-sans);
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--at-mute-2);
  margin: 0;
}
.ed-doc__contents-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(22.5rem, 1fr));
  gap: 1.25rem;
}

.ed-link-card {
  position: relative;
  display: flex;
  flex-direction: column;
  background: var(--at-bg-cream);
  border: 1px solid var(--at-grid-line);
  padding: 2rem 1.75rem 1.5rem;
  text-decoration: none;
  color: inherit;
  transition: border-color 0.2s ease, transform 0.2s ease;
}
.ed-link-card:hover { border-color: var(--card-color, var(--at-navy)); transform: translateY(-2px); }
.ed-link-card__top {
  position: absolute;
  top: 0;
  left: 0;
  width: 48px;
  height: 3px;
  background: var(--card-color, var(--at-navy));
}
.ed-link-card__meta {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  margin-bottom: 0.85rem;
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  flex-wrap: wrap;
}
.ed-link-card__cat { font-weight: 700; color: var(--card-color, var(--at-navy)); }
.ed-link-card__title {
  font-family: var(--at-serif);
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: var(--at-navy-deep);
  margin: 0 0 0.85rem;
}
.ed-link-card__desc {
  font-family: var(--at-sans);
  font-size: 0.92rem;
  line-height: 1.6;
  color: var(--at-mute-2);
  margin: 0 0 1.1rem;
  flex: 1;
}
.ed-link-card__desc :deep(code), .ed-link-card__desc code {
  font-family: var(--at-mono);
  font-size: 0.82em;
  background: rgba(0, 39, 127, 0.06);
  padding: 0.08em 0.35em;
  color: var(--at-navy-deep);
}
.ed-link-card__foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 0.85rem;
  border-top: 1px solid var(--at-grid-line);
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-mute);
}
.ed-link-card__arrow { color: var(--card-color, var(--at-navy)); transition: transform 0.2s ease; }
.ed-link-card:hover .ed-link-card__arrow { transform: translate(2px, -2px); }

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
  .ed-doc__contents { padding: 2.5rem 0 3.5rem; }
}
</style>
