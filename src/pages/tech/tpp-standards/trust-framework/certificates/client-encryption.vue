<route lang="yaml">
meta:
  title: Client Encryption Certificate
  isIndex: true
</route>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          Trust Framework · Certificates
        </div>
        <h1 class="ed-doc__title">
          Client Encryption Certificate
          <span class="ed-doc__read">2 min read</span>
        </h1>
        <p class="ed-doc__lede">The <strong>Encryption Certificate</strong> is used to <strong>encrypt data</strong> sent to your application &mdash; such as event notifications &mdash; ensuring only your application can read it.</p>

        <div class="ed-spec-strip">
            <div class="ed-spec-strip__row">
              <div class="ed-spec-strip__label">Purpose</div>
              <div class="ed-spec-strip__value">Ensuring only your application can read sensitive data</div>
            </div>
            <div class="ed-spec-strip__row">
              <div class="ed-spec-strip__label">Usage</div>
              <div class="ed-spec-strip__value">Decrypting encrypted responses and event payloads</div>
            </div>
            <div class="ed-spec-strip__row">
              <div class="ed-spec-strip__label">Required</div>
              <div class="ed-spec-strip__value">Optional &mdash; required if your application subscribes to receive encrypted events</div>
            </div>
        </div>

        <p class="ed-doc-prose ed-doc-prose--first">When an LFI or the platform sends an encrypted payload, it encrypts it using the public key from this certificate. Your application uses the corresponding private key to decrypt it.</p>
      </div>
    </section>

    <section class="ed-doc__band ed-doc__band--surface">
      <div class="ed-doc__inner">
        <h2 class="ed-doc__h2">Generating Your Encryption Certificate</h2>

        <p class="ed-doc-prose">Follow the <a href="../certificates">Keys &amp; Certificates</a> guide to generate your private key and CSR, then upload the CSR to the Trust Framework to receive your certificate.</p>
        <p class="ed-doc-prose">When selecting the certificate type during generation, choose <strong>Encryption</strong>.</p>
        <div class="ed-doc-callout ed-doc-callout--tip">
          
          <div class="ed-doc-callout__body">Keep your encryption private key stored securely. If it is lost, you will be unable to decrypt any events received during the period the certificate was active. See <a href="/policy/secure-management">Secure Management of Keys and Credentials</a> for guidance.</div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.ed-doc { background: var(--at-bg-cream); color: var(--at-navy-deep); font-family: var(--at-sans); padding-top: 4.25rem; min-height: 100vh; }

.ed-doc__hero { background: var(--at-bg-cream); border-bottom: 1px solid var(--at-grid-line); }
.ed-doc__inner { max-width: var(--at-page-max); margin: 0 auto; padding: 4rem 2rem 3rem; }

.ed-doc__eyebrow { font-family: var(--at-mono); font-size: 0.68rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--at-teal); margin-bottom: 1.25rem; display: flex; align-items: center; gap: 0.75rem; }
.ed-doc__eyebrow-dash { width: 24px; height: 1px; background: currentColor; }

.ed-doc__title { font-family: var(--at-serif); font-size: clamp(2.25rem, 5vw, 3.6rem); font-weight: 600; line-height: 1.02; letter-spacing: -0.03em; margin: 0; display: flex; align-items: baseline; flex-wrap: wrap; gap: 0.85rem; }
.ed-doc__read { font-family: var(--at-mono); font-size: 0.7rem; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 500; color: var(--at-mute); align-self: center; padding-left: 0.6rem; border-left: 1px solid var(--at-grid-line-2); }

.ed-doc__lede { font-family: var(--at-sans); font-size: 1.1rem; line-height: 1.65; margin: 1.75rem 0 0; max-width: 50rem; color: var(--at-mute-2); }
.ed-doc__lede--tight { margin-top: 0.85rem; }
.ed-doc__lede :deep(strong), .ed-doc__lede strong { color: var(--at-navy-deep); font-weight: 600; }
.ed-doc__lede :deep(code), .ed-doc__lede code { font-family: var(--at-mono); font-size: 0.86em; background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream)); border: 1px solid var(--at-grid-line); padding: 0.08em 0.4em; }
.ed-doc__lede :deep(a), .ed-doc__lede a { color: var(--at-teal-deep); text-decoration: none; border-bottom: 1px solid currentColor; }

.ed-doc__bullets { font-family: var(--at-sans); font-size: 1rem; line-height: 1.65; margin: 1rem 0 0 1.2rem; padding: 0; max-width: 50rem; color: var(--at-mute-2); }
.ed-doc__bullets li { margin: 0.3rem 0; }
.ed-doc__bullets :deep(strong), .ed-doc__bullets strong { color: var(--at-navy-deep); font-weight: 600; }
.ed-doc__bullets :deep(code), .ed-doc__bullets code { font-family: var(--at-mono); font-size: 0.86em; background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream)); border: 1px solid var(--at-grid-line); padding: 0.08em 0.4em; }

.ed-spec-strip { display: grid; grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr)); margin-top: 2.25rem; border: 1px solid var(--at-grid-line); background: var(--at-surface); }
.ed-spec-strip__row { display: flex; flex-direction: column; gap: 0.35rem; padding: 1rem 1.25rem; border-right: 1px solid var(--at-grid-line); }
.ed-spec-strip__row:last-child { border-right: 0; }
.ed-spec-strip__label { font-family: var(--at-mono); font-size: 0.62rem; letter-spacing: 0.16em; text-transform: uppercase; font-weight: 700; color: var(--at-mute); }
.ed-spec-strip__value { font-family: var(--at-sans); font-size: 0.95rem; line-height: 1.45; color: var(--at-navy-deep); font-weight: 500; }
.ed-spec-strip__value :deep(code), .ed-spec-strip__value code { font-family: var(--at-mono); font-size: 0.86em; background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream)); border: 1px solid var(--at-grid-line); padding: 0.08em 0.4em; }

.ed-doc__band { border-top: 1px solid var(--at-grid-line); padding: 3rem 0 4rem; }
.ed-doc__band--surface { background: var(--at-surface); }
.ed-doc__band--cream { background: var(--at-bg-cream); }
.ed-doc__band .ed-doc__inner { padding-top: 0; padding-bottom: 0; }

.ed-doc__h2 { font-family: var(--at-serif); font-size: clamp(1.5rem, 2.6vw, 2rem); font-weight: 600; letter-spacing: -0.02em; line-height: 1.1; margin: 0 0 1.5rem; color: var(--at-navy-deep); }

.ed-doc-prose { font-family: var(--at-sans); font-size: 1rem; line-height: 1.65; color: var(--at-mute-2); margin: 0 0 1.1rem; max-width: 56rem; }
.ed-doc-prose:last-child { margin-bottom: 0; }
.ed-doc-prose--first { margin-top: 1.75rem; }
.ed-doc-prose--closing { margin-top: 1.5rem; max-width: 60rem; }
.ed-doc-prose :deep(strong), .ed-doc-prose strong { color: var(--at-navy-deep); font-weight: 600; }
.ed-doc-prose :deep(code), .ed-doc-prose code { font-family: var(--at-mono); font-size: 0.86em; background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream)); border: 1px solid var(--at-grid-line); padding: 0.08em 0.4em; }
.ed-doc-prose :deep(a), .ed-doc-prose a { color: var(--at-teal-deep); text-decoration: none; border-bottom: 1px solid currentColor; }

.ed-doc-callout { margin: 1.5rem 0 0; padding: 1rem 1.15rem; border-left: 3px solid var(--callout-accent, var(--at-mute)); background: color-mix(in srgb, var(--callout-accent, var(--at-mute)) 8%, var(--at-bg-cream)); font-family: var(--at-sans); font-size: 0.95rem; line-height: 1.6; color: var(--at-navy-deep); max-width: 56rem; }
.ed-doc-callout--warning { --callout-accent: #b08800; }
.ed-doc-callout--info    { --callout-accent: #1d4ed8; }
.ed-doc-callout--tip     { --callout-accent: var(--at-teal-deep); }
.ed-doc-callout--danger  { --callout-accent: #b91c1c; }
.ed-doc-callout__title { font-family: var(--at-mono); font-size: 0.66rem; letter-spacing: 0.16em; text-transform: uppercase; font-weight: 700; color: var(--callout-accent, var(--at-mute)); margin-bottom: 0.5rem; }
.ed-doc-callout__body :deep(code), .ed-doc-callout__body code { font-family: var(--at-mono); font-size: 0.86em; background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream)); border: 1px solid var(--at-grid-line); padding: 0.08em 0.4em; }
.ed-doc-callout__body :deep(a), .ed-doc-callout__body a { color: var(--at-navy-deep); text-decoration: underline; text-underline-offset: 3px; }

.ed-doc-legend { display: flex; flex-direction: column; gap: 0.75rem; margin: 1.25rem 0 0; max-width: 60rem; }
.ed-doc-legend__row { display: grid; grid-template-columns: minmax(11rem, 14rem) 1fr; gap: 1.25rem; padding: 0.75rem 0; border-top: 1px solid var(--at-grid-line); }
.ed-doc-legend__row:last-child { border-bottom: 1px solid var(--at-grid-line); }
.ed-doc-legend dt { font-family: var(--at-mono); font-size: 0.7rem; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 700; color: var(--at-teal-deep); }
.ed-doc-legend dd { margin: 0; font-family: var(--at-sans); font-size: 0.95rem; line-height: 1.6; color: var(--at-mute-2); }
.ed-doc-legend dd :deep(code), .ed-doc-legend dd code { font-family: var(--at-mono); font-size: 0.86em; background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream)); border: 1px solid var(--at-grid-line); padding: 0.08em 0.4em; }

.ed-doc-table { display: grid; grid-template-columns: repeat(var(--cols, 4), minmax(0, 1fr)); border: 1px solid var(--at-grid-line); background: var(--at-bg-cream); margin-top: 1.5rem; }
.ed-doc-table__row { display: contents; }
.ed-doc-table__cell { padding: 0.85rem 0.95rem; border-bottom: 1px solid var(--at-grid-line); border-right: 1px solid var(--at-grid-line); font-family: var(--at-sans); font-size: 0.92rem; line-height: 1.5; color: var(--at-navy-deep); }
.ed-doc-table__row:last-child .ed-doc-table__cell { border-bottom: 0; }
.ed-doc-table__row .ed-doc-table__cell:last-child { border-right: 0; }
.ed-doc-table__row--head .ed-doc-table__cell { background: var(--at-navy-deep); color: var(--at-bg-cream); font-family: var(--at-mono); font-size: 0.66rem; letter-spacing: 0.16em; text-transform: uppercase; font-weight: 700; border-bottom: 0; padding: 0.75rem 0.95rem; }
.ed-doc-table__row--head .ed-doc-table__cell { border-right: 1px solid rgba(250, 250, 247, 0.18); }
.ed-doc-table__row--head .ed-doc-table__cell:last-child { border-right: 0; }
.ed-doc-table__cell :deep(code), .ed-doc-table__cell code { font-family: var(--at-mono); font-size: 0.85em; background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream)); border: 1px solid var(--at-grid-line); padding: 0.06em 0.35em; }
.ed-doc-table__cell :deep(strong), .ed-doc-table__cell strong { font-weight: 600; color: var(--at-navy-deep); }
.ed-doc-table__cell :deep(em), .ed-doc-table__cell em { font-style: normal; font-family: var(--at-sans); font-size: 0.82rem; color: var(--at-mute); display: block; margin-top: 0.15rem; }

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
  .ed-doc__band { padding: 2rem 0 2.75rem; }
  .ed-spec-strip { grid-template-columns: 1fr; }
  .ed-spec-strip__row { border-right: 0; border-bottom: 1px solid var(--at-grid-line); }
  .ed-spec-strip__row:last-child { border-bottom: 0; }
  .ed-doc-legend__row { grid-template-columns: 1fr; gap: 0.4rem; }
  .ed-doc-table { grid-template-columns: 1fr !important; }
  .ed-doc-table__cell { border-right: 0; }
}
</style>
