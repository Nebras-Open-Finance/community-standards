<route lang="yaml">
meta:
  title: Consent Requirements
  isIndex: true
</route>

<script setup lang="ts">
// All content is static — no script logic required for this page.
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          TPP Standards · v2.1 · Consent · Requirements
        </div>
        <h1 class="ed-doc__title">
          Consent Requirements
          <span class="ed-doc__read">2 min read</span>
        </h1>
        <p class="ed-doc__lede">
          These requirements apply to all TPPs operating within UAE Open Finance, regardless of the
          service type. They are assessed as part of the
          <a href="/tech/tpp-standards/production/testing-certification/functional/bank-data-sharing">Functional Certification</a>
          certification process.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="minimal-scope"
      num="01"
      color="var(--at-teal)"
      eyebrow="Only what you need"
      title="Minimal scope"
      tone="cream"
    >
      <EdProse>
        A consent must be <strong>minimally scoped</strong> &mdash; it may only request the
        permissions genuinely necessary to deliver the service being offered to the user at the
        time of authorisation.
      </EdProse>
      <EdProse>
        Requesting permissions speculatively, in anticipation of future features, or as a blanket
        grant is not permitted. If a TPP's service requires only account balances, it must not also
        request transaction history or beneficiary data.
      </EdProse>

      <EdNote type="warning">
        <p>
          LFIs may reject a consent at the <code>/par</code> stage if the
          <code>authorization_details</code> object contains values that are unsupported or
          disproportionate to the service offered and described via the
          <a href="/tech/tpp-standards/trust-framework/api-discovery"><code>/participants</code> endpoint</a>.
          This includes:
        </p>
        <ul>
          <li>A <code>Permissions</code> set broader than the service the LFI supports</li>
          <li>
            Field values the LFI does not support &mdash; for example, requesting
            <code>AccountSubType: CreditCard</code> at an LFI that only supports
            <code>CurrentAccount</code> and <code>Savings</code>
          </li>
        </ul>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="consent-duration"
      num="02"
      color="var(--at-gold)"
      eyebrow="Bounded lifetimes"
      title="Consent duration"
      tone="surface"
    >
      <EdProse>
        A consent's <code>ExpirationDateTime</code> must not exceed <strong>one year</strong> from
        the date of consent creation. Consents submitted with an expiry beyond this limit will be
        rejected by the API Hub.
      </EdProse>
      <EdProse>
        The <code>ExpirationDateTime</code> must reflect the minimum period required for the
        service. A consent must not be issued with an unnecessarily long expiry when the underlying
        service covers a shorter, defined period.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="explicit-user-consent"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Affirmative action required"
      title="Explicit user consent"
      tone="cream"
    >
      <EdProse>
        Before any protected resource is accessed, the user must be presented with a clear,
        accurate consent screen at the LFI and must take an affirmative action to approve it.
      </EdProse>
      <EdProse>
        The consent screen is rendered by the LFI during the authorization flow and is driven
        directly by the <code>authorization_details</code> submitted in the <code>/par</code>
        request &mdash; the permissions, account scope, and expiry the user sees must
        <strong>exactly match</strong> what the TPP requested. TPPs must not present users with a
        pre-consent screen that describes a different scope than what is ultimately submitted to
        <code>/par</code>.
      </EdProse>
      <EdProse>
        Each service type has a defined user experience standard that governs what must be shown to
        the user. The consent and authorisation screens for each service type are documented in the
        corresponding User Experience pages, e.g.
        <a href="/tech/tpp-standards/v2.1/banking/data-sharing/user-journeys">Bank Data Sharing User Experience</a>.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="maintaining-state"
      num="04"
      color="var(--at-teal)"
      eyebrow="Stay in sync with the LFI"
      title="Maintaining consent state accuracy"
      tone="surface"
    >
      <EdProse>
        A TPP must maintain an accurate and up-to-date record of every consent it holds in its own
        systems. The state of a consent can change at any time &mdash; the user may revoke it
        directly at the LFI, the LFI may suspend it, or it may expire &mdash; without the TPP
        initiating the change.
      </EdProse>
      <EdProse>
        This record must be kept current and must be accurately reflected in the
        <a href="/tech/tpp-standards/v2.1/consent/consent-management-interface/">Consent Management Interface</a>
        the TPP exposes to its users, so that users can always see exactly what they have consented
        to and take action to revoke or amend it.
      </EdProse>
      <EdProse>
        TPPs have two mechanisms to keep their records in sync with the LFI:
      </EdProse>

      <div class="ed-doc__methods">
        <article class="ed-doc__method">
          <header class="ed-doc__method-head">
            <span class="ed-doc__method-tag">Mechanism A</span>
            <h3 class="ed-doc__method-title">Polling</h3>
          </header>
          <p class="ed-doc__method-body">
            The TPP periodically calls the consent status endpoint to check the current state:
          </p>
          <ul class="ed-doc__method-list">
            <li>
              <span class="endpoint"><span class="http-method http-method--get">GET</span><code>/account-access-consents/{ConsentId}</code></span> for Bank Data Sharing consents
            </li>
            <li>
              <span class="endpoint"><span class="http-method http-method--get">GET</span><code>/payment-consents/{ConsentId}</code></span> for Bank Service Initiation consents
            </li>
          </ul>
          <p class="ed-doc__method-body">
            Polling should be performed at a reasonable interval. Excessive polling rates are
            subject to rate limiting by LFIs.
          </p>
        </article>

        <article class="ed-doc__method ed-doc__method--recommended">
          <header class="ed-doc__method-head">
            <span class="ed-doc__method-tag">Mechanism B</span>
            <h3 class="ed-doc__method-title">
              Webhooks
              <span class="ed-doc__method-sub">Event Subscriptions</span>
            </h3>
          </header>
          <p class="ed-doc__method-body">
            The TPP subscribes to consent status events and is notified by the API Hub whenever a
            consent transitions between states (e.g. <code>Authorized</code>, <code>Revoked</code>,
            <code>Expired</code>). This avoids the latency and overhead of polling. See
            <a href="/tech/tpp-standards/v2.1/webhooks/consent-status/api-guide">Consent Status Event</a>
            for the event payload and subscription model.
          </p>
        </article>
      </div>
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
.ed-doc__lede strong { color: var(--at-navy-deep); font-weight: 600; }
.ed-doc__lede a {
  color: var(--at-navy-deep);
  text-decoration: underline;
  text-underline-offset: 3px;
}
.ed-doc__lede a:hover { color: var(--at-teal-deep); }

/* Polling vs Webhooks side-by-side cards */
.ed-doc__methods {
  margin-top: 1.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(22rem, 1fr));
  gap: 1.25rem;
}

.ed-doc__method {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: 1.6rem 1.75rem 1.65rem;
  background: var(--at-bg-cream);
  border: 1px solid var(--at-grid-line);
}
.ed-doc__method::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 3px;
  background: var(--at-mute);
}
.ed-doc__method--recommended::before { background: var(--at-teal-deep); }

.ed-doc__method-head { display: flex; flex-direction: column; gap: 0.4rem; }
.ed-doc__method-tag {
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-mute);
}
.ed-doc__method--recommended .ed-doc__method-tag { color: var(--at-teal-deep); }

.ed-doc__method-title {
  font-family: var(--at-serif);
  font-size: 1.35rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--at-navy-deep);
  margin: 0;
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.6rem;
}
.ed-doc__method-sub {
  font-family: var(--at-mono);
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--at-mute);
}

.ed-doc__method-body {
  font-family: var(--at-sans);
  font-size: 0.95rem;
  line-height: 1.65;
  color: var(--at-mute-2);
  margin: 0;
}
.ed-doc__method-body code {
  font-family: var(--at-mono);
  font-size: 0.86em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  color: var(--at-navy-deep);
  padding: 0.08em 0.4em;
}
.ed-doc__method-body strong { color: var(--at-navy-deep); font-weight: 600; }
.ed-doc__method-body a {
  color: var(--at-navy-deep);
  text-decoration: underline;
  text-underline-offset: 3px;
}
.ed-doc__method-body a:hover { color: var(--at-teal-deep); }

.ed-doc__method-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
.ed-doc__method-list li {
  position: relative;
  padding-left: 1.1rem;
  font-family: var(--at-sans);
  font-size: 0.92rem;
  line-height: 1.55;
  color: var(--at-mute-2);
}
.ed-doc__method-list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.55rem;
  width: 0.4rem;
  height: 0.4rem;
  background: var(--at-teal);
}
.ed-doc__method-list code {
  font-family: var(--at-mono);
  font-size: 0.86em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  color: var(--at-navy-deep);
  padding: 0.08em 0.4em;
}

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
  .ed-doc__methods { grid-template-columns: 1fr; }
}
</style>
