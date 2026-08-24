<route lang="yaml">
meta:
  title: Data Deletion Confirmation
  isIndex: true
</route>

<script setup lang="ts">
// Introduced in v2.2-rc1. There is no v2.1 counterpart — this page is listed
// in the ONLY_IN allowlist in supporting/tests/version-dropdown-coverage.test.mjs
// and gated in DATA_DELETION_CONFIRMATION_VERSIONS in src/data/sidebars/tpp.ts.
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          TPP Standards · v2.2-rc1 · Consent · Data Deletion Confirmation
        </div>
        <h1 class="ed-doc__title">
          Data Deletion Confirmation
          <span class="ed-doc__read">7 min read</span>
        </h1>
        <p class="ed-doc__lede">
          When a consent ends, the TPP must review the data it holds under that consent and
          confirm what it did with it. That confirmation is recorded as an
          <strong>Attestation Event</strong>, posted to an append-only
          <code>attestations</code> sub-resource on the consent itself. For the request and
          response schemas, see the
          <a href="/tech/tpp-standards/v2.2-rc1/consent/data-deletion-confirmation/open-api/post-account-access-consents-ConsentId-attestations">API Reference</a>.
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
        The terminal statuses in scope are <code>Revoked</code> and <code>Expired</code>.
        <code>Rejected</code> consents are explicitly out of scope &mdash; no data was ever
        shared under them, so there is nothing to attest to.
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
        <code>POST</code> appends a new Attestation Event. <code>GET</code> returns every event
        successfully recorded against that consent, each carrying a copy of the Attestation the
        TPP submitted alongside its receipt. The response is paginated.
      </EdProse>

      <EdProse>
        Where a TPP has posted more than one Attestation against a consent, only the
        <strong>last successfully recorded</strong> one is reported on. Pass
        <code>LastSubmitted=true</code> on the <code>GET</code> to retrieve just that event
        rather than the whole history; the parameter defaults to <code>false</code>.
      </EdProse>

      <EdNote type="note">
        <p>
          Attestations are recorded and validated wholly within the API Hub. There is no
          corresponding Ozone Connect endpoint and no change to the consent record an LFI holds.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="signing"
      num="03"
      color="var(--at-teal)"
      eyebrow="How it is submitted"
      title="Signed requests and receipts"
      tone="cream"
    >
      <EdProse>
        <code>POST</code> does not take a JSON body. The request is a <strong>signed JWT</strong>
        sent as <code>application/jwt</code>, and the <code>201</code> response is a signed JWT
        in return. The Attestation itself travels in the <code>message</code> claim.
      </EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr><th>Operation</th><th>Media type</th><th>Body</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><code>POST</code> request</td>
              <td><code>application/jwt</code></td>
              <td><code>message</code> carries <code>Data</code> &mdash; the Attestation</td>
            </tr>
            <tr>
              <td><code>POST</code> 201 response</td>
              <td><code>application/jwt</code></td>
              <td><code>message</code> carries <code>Data</code> &mdash; the receipt</td>
            </tr>
            <tr>
              <td><code>GET</code> 200 response</td>
              <td><code>application/json</code></td>
              <td>Unsigned &mdash; <code>Data</code>, <code>Links</code>, <code>Meta</code></td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>
        Both JWTs require the <code>iss</code>, <code>exp</code>, <code>nbf</code> and
        <code>message</code> claims; <code>aud</code> and <code>iat</code> are optional.
      </EdProse>

      <EdNote type="note">
        <p>
          The receipt repeats the submitted Attestation back in full, rather than just
          acknowledging it by <code>AttestationId</code>. That is deliberate: it puts the complete
          record inside the signed message, so the TPP holds a signed artefact covering both what
          it attested and what the API Hub recorded.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="deadline"
      num="04"
      color="var(--at-gold)"
      eyebrow="When it is due"
      title="The regulatory deadline"
    >
      <EdProse>
        The API Hub stamps every recorded event with
        <code>RegulatoryDeadlineMetIndicator</code>, reporting whether it arrived before the
        regulatory deadline for the <code>AttestationType</code> submitted. For
        <code>DataRetentionDeletion</code> that deadline is <strong>45 days</strong> from the
        consent reaching its terminal status.
      </EdProse>

      <EdNote type="note">
        <p>
          The deadline is not carried in the OpenAPI document &mdash; the specification defines
          only the indicator, and the API Hub applies the regulatory value for the attestation
          type. A change to the deadline is therefore a policy change, not a schema change.
        </p>
      </EdNote>

      <EdProse>
        The deadline runs from the status change, not from the moment the TPP noticed it. A TPP
        subscribed to the
        <a href="/tech/tpp-standards/v2.2-rc1/webhooks/consent-status/api-guide">consent status webhook</a>
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
      num="05"
      color="var(--at-teal)"
      eyebrow="How the register behaves"
      title="Append-only and stateless"
      tone="cream"
    >
      <EdProse>
        The sub-resource is append-only. Each <code>POST</code> records a new, immutable event;
        the API Hub applies no de-duplication and stores every successfully recorded event.
      </EdProse>
      <EdProse>
        There is deliberately <strong>no state model and no correction endpoint</strong>. A TPP
        that needs to restate an attestation simply posts another event, and the last one
        successfully recorded is the one reported on.
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
