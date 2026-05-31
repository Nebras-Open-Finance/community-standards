<route lang="yaml">
meta:
  title: Insurance Quotation — User Journeys
  next: false
  prev: false
  aside: false
</route>

<script setup lang="ts">
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          Insurance &middot; Quotation &middot; LFI hosted screens
        </div>
        <h1 class="ed-doc__title">
          User Journeys
          <span class="ed-doc__read">3 min read</span>
        </h1>
        <p class="ed-doc__lede">
          Insurance Quotation does not have a Hub-mediated consent journey &mdash; the TPP authenticates
          with the Client Credentials Grant and the customer interacts either with the TPP\'s own UI
          or with screens your LFI hosts. This page describes what your LFI hosts and when.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="lfi-led"
      num="01"
      color="var(--at-teal)"
      eyebrow="LFI-Led mode"
      title="Your LFI hosts the customer end-to-end"
      tone="cream"
    >
      <EdProse>
        In LFI-Led mode, the TPP creates the quote and (on acceptance) hands the customer to your
        LFI to complete the application. Your LFI is responsible for the customer-facing screens
        from acceptance through to policy issuance. The TPP\'s only customer touchpoint after
        acceptance is the document delivery you push back via the quote-log.
      </EdProse>

      <h3 class="ed-doc__subhead">Screens your LFI hosts</h3>
      <EdBullets>
        <li>
          <strong>Quote summary</strong> &mdash; confirms the quote details (sums insured, premium,
          coverage period, exclusions) before the customer commits.
        </li>
        <li>
          <strong>Customer verification (KYC)</strong> &mdash; Emirates ID capture, address
          confirmation, and any additional declarations required for underwriting.
        </li>
        <li>
          <strong>Payment</strong> &mdash; premium collection through your LFI\'s payment provider
          (card, wallet, or direct debit, as supported).
        </li>
        <li>
          <strong>Confirmation</strong> &mdash; on successful issuance, an in-LFI confirmation
          screen that hands the customer back to the originating TPP (typically via a return URL
          the TPP supplied on quote creation).
        </li>
      </EdBullets>

      <h3 class="ed-doc__subhead">Status emission</h3>
      <EdProse>
        At each transition (KYC submitted, payment confirmed, policy issued), emit the matching
        quote-log status via <code>PATCH /insurance-quote-log/{logId}</code> so the TPP &mdash; and
        any subscribed webhook &mdash; sees the lifecycle progress. The TPP uses these events to
        update its own customer-facing UI in parallel.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="tpp-led"
      num="02"
      color="var(--at-gold, #b08800)"
      eyebrow="TPP-Led mode"
      title="The TPP hosts the customer; your LFI hosts only the payment page"
      tone="surface"
    >
      <EdProse>
        In TPP-Led mode, the TPP collects KYC in its own UI and submits it to your LFI via PATCH on
        the quote. Your LFI\'s only hosted screen is the <strong>payment page</strong> &mdash;
        delivered to the TPP as a <code>BrokerInstructions.Url</code> on the
        <code>ApplicationApproved</code> event, then surfaced to the customer by the TPP as a redirect.
      </EdProse>

      <h3 class="ed-doc__subhead">Payment page requirements</h3>
      <EdBullets>
        <li>
          <strong>Branded as LFI</strong> &mdash; the customer must clearly see they are paying the
          insurer, not the TPP.
        </li>
        <li>
          <strong>Single-use URL</strong> &mdash; the URL MUST be invalidated after first redemption
          or after a reasonable session window (15&ndash;30 minutes). The TPP MUST NOT cache or
          replay it.
        </li>
        <li>
          <strong>Return handling</strong> &mdash; on payment success or cancellation, return the
          customer to a destination the TPP specified when subscribing to events. The customer\'s
          status thereafter is observable to the TPP via subsequent quote-log events
          (<code>PolicyIssued</code>, <code>CustomerCancelled</code>, etc.).
        </li>
        <li>
          <strong>No KYC capture</strong> &mdash; KYC has already been collected by the TPP and
          accepted by the LFI before the payment URL is issued. The payment page MUST NOT re-prompt
          for it.
        </li>
      </EdBullets>

      <h3 class="ed-doc__subhead">Document delivery</h3>
      <EdProse>
        Once the policy is issued, your LFI MUST NOT email or post documents to the customer
        directly in TPP-Led mode &mdash; the TPP becomes the document delivery channel. Attach all
        policy documents (Policy Booklet, Terms &amp; Conditions, IPID, etc.) as base64-encoded
        <code>Documents</code> entries on the <code>PolicyIssued</code> quote-log event, with
        SHA-256 hashes for integrity verification. The TPP surfaces them to the customer in its
        own UI.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="comparison"
      num="03"
      color="var(--at-navy)"
      eyebrow="At a glance"
      title="Which screens does each mode host?"
      tone="cream"
    >
      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Screen / responsibility</th>
              <th>LFI-Led</th>
              <th>TPP-Led</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Quote summary &amp; acceptance</td>
              <td>LFI</td>
              <td>TPP</td>
            </tr>
            <tr>
              <td>Customer verification (KYC)</td>
              <td>LFI</td>
              <td>TPP</td>
            </tr>
            <tr>
              <td>Premium payment</td>
              <td>LFI</td>
              <td>LFI (via redirect from TPP)</td>
            </tr>
            <tr>
              <td>Policy document delivery</td>
              <td>LFI (direct to customer)</td>
              <td>TPP (via Documents on PolicyIssued event)</td>
            </tr>
            <tr>
              <td>Post-issuance customer support</td>
              <td>LFI</td>
              <td>LFI (per standard insurance regulatory obligations)</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>
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
.ed-doc__subhead {
  font-family: var(--at-serif); font-size: 1.2rem; font-weight: 600;
  letter-spacing: -0.015em; color: var(--at-navy-deep); margin: 1.75rem 0 0.85rem;
}
@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
}
</style>
