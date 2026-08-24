<route lang="yaml">
meta:
  title: Debtor Account
</route>

<script setup lang="ts">
const exampleSample = `{
  "Initiation": {
    "DebtorAccount": {
      "SchemeName": "IBAN",
      "Identification": "AE070331234567890123456",
      "Name": {
        "en": "Ahmad Al Mansouri",
        "ar": "أحمد المنصوري"
      }
    },
    "Creditor": [ ... ]   // see Creditor page
  },
  "Risk": { ... }
}`
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          Service Initiation &middot; PII &middot; Debtor Account
        </div>
        <h1 class="ed-doc__title">
          Debtor Account
          <span class="ed-doc__read">2 min read</span>
        </h1>
        <p class="ed-doc__lede">
          <code>Initiation.DebtorAccount</code> is an <strong>optional</strong> field in the consent PII. It is
          used when the TPP already knows which account the user wants to pay from &mdash; for example, because
          the user selected it within the TPP's own application before being redirected to the LFI.
        </p>
        <p class="ed-doc__lede">
          When provided, the LFI will pre-select this account on their authorisation screen. When omitted, the
          user chooses their account directly at the LFI during authorisation.
        </p>

        <EdNote type="info" title="POST /par only">
          <p>
            <code>Initiation.DebtorAccount</code> is only present in the PII submitted at
            <span class="endpoint"><span class="http-method http-method--post">POST</span><code>/par</code></span>
            (consent staging). It is <strong>not part of the
            <span class="endpoint"><span class="http-method http-method--post">POST</span><code>/payments</code></span>
            PII schema</strong>.
          </p>
          <p>
            At payment time, the debtor account has already been determined: the user selected and authorised
            it during the consent flow at the LFI. There is no mechanism to change or re-specify the debtor
            account at
            <span class="endpoint"><span class="http-method http-method--post">POST</span><code>/payments</code></span>.
          </p>
        </EdNote>
      </div>
    </section>

    <EdSectionBand
      id="schema"
      num="01"
      color="var(--at-teal)"
      eyebrow="Schema"
      title="DebtorAccount fields"
      tone="cream"
    >
      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Field</th>
              <th>Type</th>
              <th>Required</th>
              <th>Description</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>SchemeName</code></td>
              <td>enum</td>
              <td>Yes</td>
              <td>Account identifier scheme &mdash; always <code>IBAN</code></td>
              <td><code>IBAN</code></td>
            </tr>
            <tr>
              <td><code>Identification</code></td>
              <td>string</td>
              <td>Yes</td>
              <td>The IBAN of the debtor account</td>
              <td><code>AE070331234567890123456</code></td>
            </tr>
            <tr>
              <td><code>Name.en</code></td>
              <td>string</td>
              <td>Yes*</td>
              <td>Account holder name in English</td>
              <td><code>Ahmad Al Mansouri</code></td>
            </tr>
            <tr>
              <td><code>Name.ar</code></td>
              <td>string</td>
              <td>No</td>
              <td>Account holder name in Arabic</td>
              <td><code>أحمد المنصوري</code></td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>
        * At least one of <code>Name.en</code> or <code>Name.ar</code> must be provided if <code>Name</code> is
        included.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="example"
      num="02"
      color="var(--at-gold)"
      eyebrow="Example"
      title="POST /par PII with DebtorAccount provided"
      tone="surface"
    >
      <EdCode :code="exampleSample" lang="json" filename="POST /par PII (excerpt)" />

      <EdNote type="tip" title="When to omit DebtorAccount">
        <p>
          If your application does not hold the user's IBAN &mdash; for example, in a checkout flow where the
          user is paying from an account you have never seen &mdash; omit <code>DebtorAccount</code> entirely.
          The user will select their account at the LFI.
        </p>
      </EdNote>
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

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
}
</style>
