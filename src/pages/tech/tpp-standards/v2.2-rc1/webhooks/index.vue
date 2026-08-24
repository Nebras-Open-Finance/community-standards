<route lang="yaml">
meta:
  title: Webhooks — Event Notifications
  isIndex: true
</route>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          Webhooks · Push notifications
        </div>
        <h1 class="ed-doc__title">
          Webhooks &mdash; Event Notifications
          <span class="ed-doc__read">2 min read</span>
        </h1>
        <p class="ed-doc__lede">
          Rather than requiring TPPs to poll for status changes, UAE Open Finance supports
          <strong>push-based event notifications</strong>. When a relevant event occurs &mdash; such as a
          consent being authorized or revoked, or a payment status changing &mdash; the API Hub can deliver
          a notification directly to your registered webhook endpoint.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="how-delivered"
      num="01"
      color="var(--at-teal)"
      eyebrow="How Events Are Delivered"
      title="HTTP POST of an encrypted, signed payload"
      tone="cream"
    >
      <EdProse>
        Events are delivered as an HTTP <code>POST</code> to the webhook URL you provide along with the
        consent. The request body is a <strong>JWE compact serialisation</strong> encrypted using the public
        <strong>Encryption Certificate</strong> registered in the Trust Framework and in the Application
        that created the Consent. Inside the JWE is a signed JWT (JWS) containing the event payload.
      </EdProse>

      <EdProse>
        You must respond with <code>202 Accepted</code> and an empty body immediately upon receipt.
        Decrypt and process the payload asynchronously &mdash; the Hub may retry delivery if it does not
        receive a timely acknowledgement.
      </EdProse>

      <EdProse>
        See
        <a href="/tech/tpp-standards/security/fapi/receiving-events">Receiving Event Notifications</a>
        for the full decryption, signature-verification, and FAPI-required claim-validation flow &mdash;
        including how to use the <code>kid</code> in the JWE header to select the correct private key.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="requirements"
      num="02"
      color="var(--at-gold)"
      eyebrow="Requirements"
      title="What you need before events can be delivered"
      tone="surface"
    >
      <EdBullets>
        <li>A webhook URL registered on your <strong>Application</strong> in the Trust Framework</li>
        <li>A valid <strong>Encryption Certificate</strong> on your Application &mdash; events cannot be delivered without one</li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="available-events"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Available Events"
      title="What the API Hub will push to you"
      tone="cream"
    >
      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Event</th>
              <th>Trigger</th>
              <th>Guide</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Consent Status</td>
              <td>Any consent status change (<code>Authorized</code>, <code>Revoked</code>, <code>Expired</code>, etc.)</td>
              <td><a href="/tech/tpp-standards/v2.2-rc1/webhooks/consent-status/api-guide">Consent Status Event</a></td>
            </tr>
            <tr>
              <td>Payment Status</td>
              <td>Payment status update on a consent with <code>subscription.Webhook.IsActive: true</code></td>
              <td><a href="/tech/tpp-standards/v2.2-rc1/webhooks/payment-status/api-guide">Payment Status Event</a></td>
            </tr>
            <tr>
              <td>Insurance Quote Status</td>
              <td>Quote lifecycle event on a quote with <code>Subscription.Webhook.IsActive: true</code> (<code>ApplicationPending</code>, <code>ApplicationApproved</code>, <code>PolicyIssued</code>, <code>Completed</code>, terminal states)</td>
              <td><a href="/tech/tpp-standards/v2.2-rc1/webhooks/insurance-status/api-guide">Insurance Quote Status Event</a></td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>
    </EdSectionBand>

    <section class="ed-doc__contents">
      <div class="ed-doc__inner">
        <div class="ed-doc__contents-head">
          <div class="ed-doc__contents-eyebrow">
            <span class="ed-doc__eyebrow-dash" />
            Section contents
          </div>
          <h2 class="ed-doc__contents-title">Browse this section</h2>
          <p class="ed-doc__contents-sub">The full set of pages covering event notifications and webhooks in UAE Open Finance.</p>
        </div>

        <div class="ed-doc__contents-grid">
          <a class="ed-link-card" href="/tech/tpp-standards/v2.2-rc1/webhooks/consent-status/api-guide" :style="{ '--card-color': 'var(--at-teal)' }">
            <span class="ed-link-card__top" />
            <div class="ed-link-card__meta"><span class="ed-link-card__cat">Sub-section</span></div>
            <h3 class="ed-link-card__title">Consent Status</h3>
            <p class="ed-link-card__desc">How consent state changes (<code>Authorized</code>, <code>Revoked</code>, <code>Expired</code>) are pushed to your webhook.</p>
            <div class="ed-link-card__foot"><span class="ed-link-card__cta">Open</span><span class="ed-link-card__arrow">&rarr;</span></div>
          </a>
          <a class="ed-link-card" href="/tech/tpp-standards/v2.2-rc1/webhooks/payment-status/api-guide" :style="{ '--card-color': 'var(--at-gold, #b08800)' }">
            <span class="ed-link-card__top" />
            <div class="ed-link-card__meta"><span class="ed-link-card__cat">Sub-section</span></div>
            <h3 class="ed-link-card__title">Payment Status</h3>
            <p class="ed-link-card__desc">Per-payment status updates on consents that opted into webhook delivery.</p>
            <div class="ed-link-card__foot"><span class="ed-link-card__cta">Open</span><span class="ed-link-card__arrow">&rarr;</span></div>
          </a>
          <a class="ed-link-card" href="/tech/tpp-standards/v2.2-rc1/webhooks/insurance-status/api-guide" :style="{ '--card-color': 'var(--at-violet, #6d28d9)' }">
            <span class="ed-link-card__top" />
            <div class="ed-link-card__meta"><span class="ed-link-card__cat">Sub-section</span></div>
            <h3 class="ed-link-card__title">Insurance Quote Status</h3>
            <p class="ed-link-card__desc">Quote lifecycle updates delivered when a TPP attaches a <code>Subscription.Webhook</code> to an accepted insurance quote.</p>
            <div class="ed-link-card__foot"><span class="ed-link-card__cta">Open</span><span class="ed-link-card__arrow">&rarr;</span></div>
          </a>
          <a class="ed-link-card" href="/tech/tpp-standards/security/fapi/receiving-events" :style="{ '--card-color': 'var(--at-blue-deep, #1d4ed8)' }">
            <span class="ed-link-card__top" />
            <div class="ed-link-card__meta"><span class="ed-link-card__cat">Reference</span></div>
            <h3 class="ed-link-card__title">Receiving Event Notifications</h3>
            <p class="ed-link-card__desc">FAPI-aligned decryption, signature verification, and replay protection for inbound JWE events.</p>
            <div class="ed-link-card__foot"><span class="ed-link-card__cta">Open</span><span class="ed-link-card__arrow">&rarr;</span></div>
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
.ed-link-card__desc :deep(code) {
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
.ed-link-card:hover .ed-link-card__arrow { transform: translateX(4px); }

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
  .ed-doc__contents { padding: 2.5rem 0 3.5rem; }
}
</style>
