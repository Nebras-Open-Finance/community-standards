<route lang="yaml">
meta:
  title: Data Deletion Confirmation
  isIndex: true
</route>

<script setup lang="ts">
// Introduced in v2.2-draft. There is no v2.1 counterpart — this page is listed
// in the ONLY_IN allowlist in supporting/tests/version-dropdown-coverage.test.mjs
// and gated in DATA_DELETION_CONFIRMATION_VERSIONS in src/data/sidebars/tpp.ts.
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          TPP Standards · v2.2-draft · Consent · Data Deletion Confirmation
        </div>
        <h1 class="ed-doc__title">
          Data Deletion Confirmation
          <span class="ed-doc__read">5 min read</span>
        </h1>
        <p class="ed-doc__lede">
          When a consent ends, the TPP must review the data it holds under that consent and
          confirm what it did with it. That confirmation is recorded as an
          <strong>Attestation Event</strong>, posted to an append-only
          <code>attestations</code> sub-resource on the consent itself. For the request and
          response schemas, see the
          <a href="/tech/tpp-standards/v2.2-draft/consent/data-deletion-confirmation/open-api/post-account-access-consents-ConsentId-attestations">API Reference</a>.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="obligation"
      num="01"
      color="var(--at-teal)"
      eyebrow="What is required"
      title="The obligation"
      tone="cream"
    >
      <EdProse>
        Once a consent reaches a <strong>terminal status</strong>, the TPP MUST review every
        category of data it holds under that consent and record an Attestation Event stating,
        per category, whether the data was deleted or lawfully retained.
      </EdProse>
      <EdProse>
        The terminal statuses in scope are <code>Revoked</code>, <code>Expired</code>, and
        <code>Consumed</code>. <code>Rejected</code> consents are explicitly out of scope &mdash;
        no data was ever shared under them, so there is nothing to attest to.
      </EdProse>

      <EdNote type="important">
        <p>
          A payment consent is <strong>not</strong> empty for this purpose. It carries debtor and
          creditor account details, amounts, references, and charge and exchange-rate information,
          plus any account data the TPP retrieved in order to set the payment up. When a payment
          consent reaches a terminal status, that data falls under the same obligation as a
          Data Sharing consent.
        </p>
      </EdNote>

      <EdProse>
        Data the TPP holds outside the consent &mdash; data the customer supplied directly, or
        data obtained under a separate lawful basis &mdash; is not covered by this attestation.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="sub-resource"
      num="02"
      color="var(--at-gold)"
      eyebrow="Where it is recorded"
      title="The attestations sub-resource"
    >
      <EdProse>
        Every consent type gains an <code>attestations</code> sub-resource. Each is scoped to its
        own API family, so a TPP only needs the scopes it already holds.
      </EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr><th>Consent type</th><th>Path</th><th>Scope</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>Bank Data Sharing</td>
              <td><code>/account-access-consents/{ConsentId}/attestations</code></td>
              <td><code>accounts</code></td>
            </tr>
            <tr>
              <td>Bank Service Initiation</td>
              <td><code>/payment-consents/{ConsentId}/attestations</code></td>
              <td><code>payments</code></td>
            </tr>
            <tr>
              <td>Insurance</td>
              <td><code>/insurance-consents/{ConsentId}/attestations</code></td>
              <td><code>insurance</code></td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>
        <code>POST</code> appends a new Attestation Event. <code>GET</code> returns the events the
        TPP has posted against that consent, most recent first, each paired with its receipt.
      </EdProse>

      <EdNote type="note">
        <p>
          Attestations are recorded and validated wholly within the API Hub. There is no
          corresponding Ozone Connect endpoint and no change to the consent record an LFI holds.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="deadline"
      num="03"
      color="var(--at-teal)"
      eyebrow="When it is due"
      title="The 45-day deadline"
      tone="cream"
    >
      <EdProse>
        The Attestation Event MUST reach the API Hub within <strong>45 days</strong> of the
        consent reaching its terminal status. The API Hub stamps every event with
        <code>RegulatoryDeadlineMetIndicator</code>, stating whether it arrived inside that
        window.
      </EdProse>

      <EdProse>
        The deadline runs from the status change, not from the moment the TPP noticed it. A TPP
        subscribed to the
        <a href="/tech/tpp-standards/v2.2-draft/webhooks/consent-status/api-guide">consent status webhook</a>
        is notified when a consent becomes terminal; a TPP that is not subscribed MUST poll the
        consent to detect the transition. Either way, knowing is the TPP's responsibility.
      </EdProse>

      <EdNote type="warning">
        <p>
          A late event is still recorded. The API Hub does not reject it &mdash;
          <code>RegulatoryDeadlineMetIndicator</code> simply reports <code>false</code>. A late
          attestation is more useful than a missing one, and the indicator preserves the
          compliance signal.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="model"
      num="04"
      color="var(--at-gold)"
      eyebrow="How the register behaves"
      title="Append-only and stateless"
    >
      <EdProse>
        The sub-resource is append-only. Each <code>POST</code> records a new, immutable event;
        the API Hub applies no de-duplication and stores every successfully recorded event.
      </EdProse>
      <EdProse>
        There is deliberately <strong>no state model and no correction endpoint</strong>. A TPP
        that needs to restate an attestation simply posts another event. Which event is surfaced
        in reporting is a reporting-layer matter, not consent state.
      </EdProse>
      <EdProse>
        <code>AttestationType</code> is the extension point. A future obligation to attest to
        something else against a consent becomes a new type &mdash; not a new API.
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
.ed-doc__lede strong { color: var(--at-navy-deep); font-weight: 600; }
.ed-doc__lede code {
  font-family: var(--at-mono);
  font-size: 0.86em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  color: var(--at-navy-deep);
  padding: 0.08em 0.4em;
}
.ed-doc__lede a {
  color: var(--at-navy-deep);
  text-decoration: underline;
  text-underline-offset: 3px;
}
.ed-doc__lede a:hover { color: var(--at-teal-deep); }

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
}
</style>
