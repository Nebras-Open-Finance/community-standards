<route lang="yaml">
meta:
  title: Insurance Quotation — API Guide
  isIndex: true
</route>

<script setup lang="ts">
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          LFI &middot; Insurance &middot; Quotation
        </div>
        <h1 class="ed-doc__title">
          Insurance Quotation &mdash; API Guide
          <span class="ed-doc__read">6 min read</span>
        </h1>
        <p class="ed-doc__lede">
          How your Ozone Connect server receives quote requests, accepts them, issues policies, and emits
          status events through the Hub. Unlike Insurance Data Sharing there is no consent journey
          &mdash; the TPP authenticates with Client Credentials. The flow forks into two modes on
          accept: <strong>LFI-Led</strong> (your LFI hosts the customer through completion) and
          <strong>TPP-Led</strong> (the TPP collects KYC and surfaces an LFI-hosted payment URL).
        </p>
      </div>
    </section>

    <EdSectionBand
      id="positioning"
      num="01"
      color="var(--at-teal)"
      eyebrow="Endpoints you implement"
      title="Four endpoints per sector you underwrite"
      tone="cream"
    >
      <EdProse>
        For each insurance sector your LFI underwrites, expose four endpoints on Ozone Connect:
      </EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr><th>Endpoint</th><th>Purpose</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <span class="endpoint">
                  <span class="http-method http-method--post">POST</span>
                  <code>/{type}-insurance-quotes</code>
                </span>
              </td>
              <td>Underwrite the request and return one or more quotes (or <code>204</code> to decline).</td>
            </tr>
            <tr>
              <td>
                <span class="endpoint">
                  <span class="http-method http-method--get">GET</span>
                  <code>/{type}-insurance-quotes/{QuoteId}</code>
                </span>
              </td>
              <td>Return the current state of a quote &mdash; used by TPPs polling between events.</td>
            </tr>
            <tr>
              <td>
                <span class="endpoint">
                  <span class="http-method http-method--patch">PATCH</span>
                  <code>/{type}-insurance-quotes/{QuoteId}</code>
                </span>
              </td>
              <td>Accept the quote (declaring <code>PolicyIssuanceAllowed</code>) and, in TPP-Led mode, receive KYC submissions.</td>
            </tr>
            <tr>
              <td>
                <span class="endpoint">
                  <span class="http-method http-method--post">POST</span>
                  <code>/{type}-insurance-policies</code>
                </span>
              </td>
              <td>Issue the policy from the accepted quote.</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>
        Substitute the sector slug (<code>employment</code>, <code>health</code>, <code>home</code>,
        <code>life</code>, <code>motor</code>, <code>renters</code>, <code>travel</code>) for
        <code>{type}</code>. Mount only the sectors your LFI offers &mdash; the Hub returns
        <code>404</code> for unmounted sectors.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="quote-log"
      num="02"
      color="var(--at-gold, #b08800)"
      eyebrow="Status emission"
      title="Drive the lifecycle through the Hub's quote-log"
      tone="surface"
    >
      <EdProse>
        Every status transition between Accept Quote and the terminal state is announced to the Hub by
        the LFI via <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/insurance-quote-log-logId"><code>PATCH /insurance-quote-log/{logId}</code></a>
        on the Consent Manager surface. The Hub records the event and, where the TPP subscribed via the
        <code>Subscription</code> object on PATCH Accept Quote, delivers it to the TPP\'s webhook.
      </EdProse>

      <EdProse>
        <code>logId</code> is the same value as the <code>QuoteId</code>. Each PATCH carries one of three
        body schemas drawn from the Hub spec &mdash; pending-completion, completed, or terminal.
      </EdProse>

      <h3 class="ed-doc__subhead">PATCH-to-event mapping</h3>
      <EdProse>
        Use this table to predict the event a TPP will receive for each PATCH you emit. The Hub
        forwards verbatim &mdash; the body you send is the body the webhook sees.
      </EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>When you emit</th>
              <th>QuoteStatus</th>
              <th>Required additional fields</th>
              <th>Resulting webhook event</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Immediately after Accept Quote</td>
              <td><code>ApplicationPending</code></td>
              <td>None</td>
              <td>Pending Completion event with <code>QuoteStatus: ApplicationPending</code></td>
            </tr>
            <tr>
              <td>After TPP submits KYC (TPP-Led only)</td>
              <td><code>ApplicationApproved</code></td>
              <td><code>BrokerInstructions[].Url</code> &mdash; the LFI-hosted payment page</td>
              <td>Pending Completion event with <code>BrokerInstructions</code></td>
            </tr>
            <tr>
              <td>Premium adjustment requires re-pay</td>
              <td><code>PaymentRequired</code></td>
              <td><code>BrokerInstructions[].Url</code></td>
              <td>Pending Completion event with <code>BrokerInstructions</code></td>
            </tr>
            <tr>
              <td>Policy issued (LFI-Led)</td>
              <td><code>PolicyIssued</code></td>
              <td><code>InsurancePolicyId</code></td>
              <td>Pending Completion event with policy reference</td>
            </tr>
            <tr>
              <td>Policy issued (TPP-Led)</td>
              <td><code>PolicyIssued</code></td>
              <td><code>Documents[]</code> with SHA-256 hashes</td>
              <td>Pending Completion event with policy documents</td>
            </tr>
            <tr>
              <td>Flow complete</td>
              <td><code>Completed</code></td>
              <td><code>PolicyTerm</code>, <code>Premium</code>, <code>CustomerPaidInFull</code>, <code>PolicyCountrySubDivision</code>, (optional) <code>Commission</code></td>
              <td>Completed Status event &mdash; final</td>
            </tr>
            <tr>
              <td>Quote expired</td>
              <td><code>Expired</code></td>
              <td>(optional) <code>Reason</code></td>
              <td>Terminal Status event &mdash; final</td>
            </tr>
            <tr>
              <td>LFI declines mid-flow</td>
              <td><code>Rejected</code> / <code>LFICancelled</code></td>
              <td>(optional) <code>Reason</code></td>
              <td>Terminal Status event &mdash; final</td>
            </tr>
            <tr>
              <td>Customer abandons</td>
              <td><code>CustomerCancelled</code></td>
              <td>(optional) <code>Reason</code></td>
              <td>Terminal Status event &mdash; final</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdNote type="warning" title="Status ordering matters">
        <p>
          The Hub MUST receive statuses in the order shown above &mdash; <code>PolicyIssued</code>
          before <code>Completed</code>, never the reverse. Once any terminal (<code>Completed</code>,
          <code>Expired</code>, <code>Rejected</code>, <code>CustomerCancelled</code>,
          <code>LFICancelled</code>) is emitted, no further PATCHes are accepted for that
          <code>logId</code>.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="modes"
      num="03"
      color="var(--at-navy)"
      eyebrow="Mode-specific walkthroughs"
      title="Pick the flow you're implementing"
      tone="cream"
    >
      <EdProse>
        The two modes share the create/accept/issue skeleton but diverge in where customer KYC and
        payment happen. The walkthroughs below cover each end-to-end with the matching status events.
      </EdProse>

      <div class="ed-doc__cards">
        <a class="ed-doc__card" href="/tech/lfi-api-hub/v2.2-rc1/insurance/quotation/api-guide/lfi-led">
          <span class="ed-doc__card-cat">LFI-Led</span>
          <h3 class="ed-doc__card-title">Your LFI hosts customer verification, payment, and documents</h3>
          <p class="ed-doc__card-desc">
            Single-PATCH accept flow. TPP redirects the customer to your LFI on accept; you drive the
            rest. Status events fan back through the Hub to the TPP.
          </p>
          <span class="ed-doc__card-arrow">Open &rarr;</span>
        </a>
        <a class="ed-doc__card" href="/tech/lfi-api-hub/v2.2-rc1/insurance/quotation/api-guide/tpp-led">
          <span class="ed-doc__card-cat">TPP-Led</span>
          <h3 class="ed-doc__card-title">TPP collects KYC; LFI hosts only the payment page</h3>
          <p class="ed-doc__card-desc">
            Two-PATCH flow on the same quote. The TPP submits KYC; you respond with an LFI-hosted
            payment URL. After the customer pays, you issue and emit policy documents.
          </p>
          <span class="ed-doc__card-arrow">Open &rarr;</span>
        </a>
      </div>
    </EdSectionBand>

    <EdSectionBand
      id="quote-types"
      num="04"
      color="var(--at-violet, #6d28d9)"
      eyebrow="Per-quote-type rules"
      title="New, Renewal, and Switch differences"
      tone="surface"
    >
      <EdProse>
        The validation differences between <code>New</code>, <code>Renewal</code>, and
        <code>Switch</code> are documented in the shared <a href="/tech/lfi-api-hub/v2.2-rc1/insurance/quotation/quote-types">Quote Types</a>
        explainer &mdash; the same page the TPP standards link to. Read it before implementing the
        Create Quote validation in your Ozone Connect endpoint.
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
  font-family: var(--at-mono); font-size: 0.68rem; letter-spacing: 0.18em;
  text-transform: uppercase; color: var(--at-teal); margin-bottom: 1.25rem;
  display: flex; align-items: center; gap: 0.75rem;
}
.ed-doc__eyebrow-dash { width: 24px; height: 1px; background: currentColor; }
.ed-doc__title {
  font-family: var(--at-serif); font-size: clamp(2.25rem, 5vw, 3.6rem);
  font-weight: 600; line-height: 1.02; letter-spacing: -0.03em; margin: 0;
  display: flex; align-items: baseline; flex-wrap: wrap; gap: 0.85rem;
}
.ed-doc__read {
  font-family: var(--at-mono); font-size: 0.7rem; letter-spacing: 0.1em;
  text-transform: uppercase; font-weight: 500; color: var(--at-mute);
  align-self: center; padding-left: 0.6rem; border-left: 1px solid var(--at-grid-line-2);
}
.ed-doc__lede {
  font-family: var(--at-sans); font-size: 1.1rem; line-height: 1.65;
  margin: 1.75rem 0 0; max-width: 50rem; color: var(--at-mute-2);
}
.ed-doc__lede :deep(code) {
  font-family: var(--at-mono); font-size: 0.86em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line); padding: 0.08em 0.4em;
}
.ed-doc__subhead {
  font-family: var(--at-serif); font-size: 1.2rem; font-weight: 600;
  letter-spacing: -0.015em; color: var(--at-navy-deep); margin: 1.75rem 0 0.85rem;
}

.ed-doc__cards {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(22rem, 1fr));
  gap: 1.25rem; margin-top: 1.5rem;
}
.ed-doc__card {
  display: block; padding: 1.5rem; background: var(--at-bg-cream);
  border: 1px solid var(--at-grid-line); text-decoration: none; color: inherit;
  transition: border-color 0.2s ease, transform 0.2s ease;
}
.ed-doc__card:hover { border-color: var(--at-teal); transform: translateY(-2px); }
.ed-doc__card-cat {
  display: inline-block; font-family: var(--at-mono); font-size: 0.62rem;
  letter-spacing: 0.16em; text-transform: uppercase; font-weight: 700;
  color: var(--at-teal-deep); margin-bottom: 0.65rem;
}
.ed-doc__card-title {
  font-family: var(--at-serif); font-size: 1.15rem; font-weight: 600;
  margin: 0 0 0.5rem; color: var(--at-navy-deep);
}
.ed-doc__card-desc {
  font-family: var(--at-sans); font-size: 0.92rem; line-height: 1.55;
  color: var(--at-mute-2); margin: 0 0 1rem;
}
.ed-doc__card-arrow {
  font-family: var(--at-mono); font-size: 0.66rem; letter-spacing: 0.14em;
  text-transform: uppercase; font-weight: 700; color: var(--at-teal-deep);
}

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
}
</style>
