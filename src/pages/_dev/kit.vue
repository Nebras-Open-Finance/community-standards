<script setup lang="ts">
// Phase 2 verification page — exercises every Editorial component with
// representative props. The `_dev/` directory is excluded from the public
// route table (see vite.config.ts: Pages.exclude). Visit /_dev/kit in dev.
//
// Component imports are NOT needed here — unplugin-vue-components scans
// src/components recursively and auto-registers every Ed* component.

const sections = [
  { id: 'hero',          label: 'Hero' },
  { id: 'meta',          label: 'Meta' },
  { id: 'keynums',       label: 'KeyNums' },
  { id: 'sectionband',   label: 'SectionBand' },
  { id: 'prose',         label: 'Prose' },
  { id: 'bullets',       label: 'Bullets' },
  { id: 'pilllist',      label: 'PillList' },
  { id: 'note',          label: 'Note' },
  { id: 'callout',       label: 'Callout' },
  { id: 'example',       label: 'Example' },
  { id: 'lifetime',      label: 'Lifetime' },
  { id: 'severitytable', label: 'SeverityTable' },
  { id: 'reftable',      label: 'RefTable' },
  { id: 'code',          label: 'Code' },
  { id: 'twocol',        label: 'TwoCol' },
  { id: 'stages',        label: 'Stages' },
  { id: 'compare',       label: 'CompareCards' },
  { id: 'related',       label: 'RelatedCards' },
  { id: 'backstrip',     label: 'BackStrip' },
  { id: 'inpagenav',     label: 'InPageNav' },
  { id: 'hoversidebar',  label: 'HoverSidebar' },
]

const heroMeta = [
  { label: 'Audience', value: 'TPP / LFI' },
  { label: 'Status',   value: 'v2.1' },
  { label: 'Updated',  value: '2026-04-26' },
]

const heroKeyNums = [
  { value: '25', label: 'Editorial components' },
  { value: '1941', unit: 'lines', label: 'Source size (pre-port)' },
  { value: '0', label: 'Direct LFI calls' },
]

const severityRows = [
  { severity: 'Critical', color: '#B33A3A',             description: 'Production traffic blocked. Immediate response required.' },
  { severity: 'High',     color: 'var(--at-gold)',      description: 'Significant degradation. Mitigation within 24 hours.' },
  { severity: 'Medium',   color: 'var(--at-blue-deep)', description: 'Localised impact. Tracked through normal release.' },
  { severity: 'Low',      color: 'var(--at-teal-deep)', description: 'Cosmetic or doc-only. Best-effort.' },
]

const sidebarItems = [
  {
    text: 'Getting started',
    collapsed: false,
    items: [
      { text: 'Overview',    link: '/_dev/kit#hero' },
      { text: 'Quick start', link: '/_dev/kit#prose' },
    ],
  },
  {
    text: 'Components',
    collapsed: false,
    items: [
      { text: 'Notes',         link: '/_dev/kit#note' },
      { text: 'Callouts',      link: '/_dev/kit#callout' },
      { text: 'Tables',        link: '/_dev/kit#reftable' },
      {
        text: 'Sub-group',
        items: [
          { text: 'Nested A', link: '/_dev/kit#twocol' },
          { text: 'Nested B', link: '/_dev/kit#stages' },
        ],
      },
    ],
  },
]

const sampleCode = `{
  "alg": "PS256",
  "typ": "JWT",
  "kid": "tpp-signing-2026-04"
}`

const sampleAudExamples = `aud: https://api.openfinance.ae
aud: https://auth.lfi-foo.apihub.openfinance.ae`
</script>

<template>
  <main class="kit">
    <!-- Section header banner so it's obvious this is the dev kit -->
    <div class="kit__banner">
      <span class="kit__banner-label">DEV KIT</span>
      <span class="kit__banner-text">
        Phase 2 verification — every Editorial component rendered with sample props.
      </span>
    </div>

    <section id="hero" class="kit__sec">
      <h2 class="kit__h2">EdHero</h2>
      <p class="kit__desc">Page hero with eyebrow, title, meta items, lede, and key numbers.</p>
      <EdHero
        eyebrow="Editorial kit"
        title="Phase 2 component port"
        :meta="heroMeta"
        lede="Every <strong>Ed*</strong> component, rebuilt against TypeScript-strict <code>&lt;script setup lang='ts'&gt;</code> and rewired off VitePress."
        :keyNums="heroKeyNums"
      />
    </section>

    <section id="meta" class="kit__sec">
      <h2 class="kit__h2">EdMeta</h2>
      <p class="kit__desc">Stand-alone metadata strip (also embedded in EdHero).</p>
      <EdMeta :items="heroMeta" />
    </section>

    <section id="keynums" class="kit__sec">
      <h2 class="kit__h2">EdKeyNums</h2>
      <p class="kit__desc">Stand-alone key-numbers grid (also embedded in EdHero).</p>
      <EdKeyNums :items="heroKeyNums" />
    </section>

    <EdSectionBand
      id="sectionband"
      num="01"
      eyebrow="Sample band"
      title="EdSectionBand — cream tone, numbered eyebrow"
      lede="Used for top-level page sections. Slot accepts any editorial primitives."
      tone="cream"
    >
      <EdProse>This is the slotted content of the section band. It can mix prose, lists, tables and callouts.</EdProse>
    </EdSectionBand>

    <EdSectionBand
      eyebrow="Surface variant"
      title="EdSectionBand — surface tone, no number"
      tone="surface"
      narrow
    >
      <EdProse>Surface tone uses a white background with top/bottom rules. Narrow caps inner width at 60rem.</EdProse>
    </EdSectionBand>

    <section id="prose" class="kit__sec">
      <h2 class="kit__h2">EdProse</h2>
      <p class="kit__desc">Standard paragraph treatment. Wraps a single &lt;p&gt;.</p>
      <EdProse>
        Editorial paragraphs handle <strong>bold emphasis</strong>, <em>italics</em>,
        <a href="#hero">internal links</a>, and inline <code>code</code> spans uniformly.
      </EdProse>
    </section>

    <section id="bullets" class="kit__sec">
      <h2 class="kit__h2">EdBullets</h2>
      <p class="kit__desc">Custom bulleted list. Default and tight density.</p>
      <EdBullets>
        <li><strong>Default density</strong> — generous padding, divider between rows.</li>
        <li>Each row supports <code>code</code>, <em>italics</em> and <a href="#prose">links</a>.</li>
        <li>Bullets render as small accent squares (teal by default).</li>
      </EdBullets>
      <EdBullets tight accent="var(--at-blue-deep)">
        <li>Tight density variant with a blue accent.</li>
        <li>Same content rules apply.</li>
      </EdBullets>
    </section>

    <section id="pilllist" class="kit__sec">
      <h2 class="kit__h2">EdPillList</h2>
      <p class="kit__desc">Inline tag/keyword strip.</p>
      <EdPillList :items="['OIDC', 'FAPI', 'PAR', 'mTLS', 'JWT']" />
    </section>

    <section id="note" class="kit__sec">
      <h2 class="kit__h2">EdNote</h2>
      <p class="kit__desc">Admonitions. Variants: tip, info, note, warning, caution, important, danger. Showing 3.</p>
      <EdNote type="tip">A teal tip is the default treatment when <code>type</code> is omitted.</EdNote>
      <EdNote type="warning" title="Mind the cache TTL">
        Tokens cached longer than the consent duration will fail validation at the API Hub.
      </EdNote>
      <EdNote type="danger">
        <strong>Do not</strong> route TPP traffic directly to the LFI. All traffic flows through the API Hub.
      </EdNote>
    </section>

    <section id="callout" class="kit__sec">
      <h2 class="kit__h2">EdCallout</h2>
      <p class="kit__desc">Generic accented block. Custom color via prop.</p>
      <EdCallout>
        <p>Default callout uses the teal accent. Body supports <strong>bold</strong>, <a href="#">links</a>, and <code>code</code>.</p>
      </EdCallout>
      <EdCallout color="var(--at-blue-deep)">
        <p>Custom-coloured rail — useful for category-specific callouts.</p>
      </EdCallout>
    </section>

    <section id="example" class="kit__sec">
      <h2 class="kit__h2">EdExample</h2>
      <p class="kit__desc">Tinted left-rail block, labelled "Example" by default.</p>
      <EdExample>
        <p>An <strong>example</strong> block tinted with the accent colour at 6% opacity.</p>
      </EdExample>
      <EdExample label="Counter-example" color="#B33A3A">
        <p>Custom label and rail color for negative or warning examples.</p>
      </EdExample>
    </section>

    <section id="lifetime" class="kit__sec">
      <h2 class="kit__h2">EdLifetime</h2>
      <p class="kit__desc">Two-endpoint timeline visualisation.</p>
      <EdLifetime
        from="iat"
        to="exp"
        duration="≤ 60 seconds"
        recommended="60s recommended"
        color="var(--at-blue-deep)"
      />
    </section>

    <section id="severitytable" class="kit__sec">
      <h2 class="kit__h2">EdSeverityTable</h2>
      <p class="kit__desc">Severity-to-description grid with coloured chips.</p>
      <EdSeverityTable :rows="severityRows" />
    </section>

    <section id="reftable" class="kit__sec">
      <h2 class="kit__h2">EdRefTable</h2>
      <p class="kit__desc">Reference-style table wrapper. Slot a raw &lt;table&gt;.</p>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Claim</th><th>Type</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>iss</code></td><td>string</td><td>Issuer of the token.</td></tr>
            <tr><td><code>aud</code></td><td>string</td><td>Authorization Server's <strong>issuer identifier</strong>.</td></tr>
            <tr><td><code>exp</code></td><td>number</td><td>Expiry as Unix epoch seconds.</td></tr>
          </tbody>
        </table>
      </EdRefTable>
    </section>

    <section id="code" class="kit__sec">
      <h2 class="kit__h2">EdCode</h2>
      <p class="kit__desc">Shiki-highlighted code block with optional filename.</p>
      <EdCode :code="sampleCode" lang="json" filename="JOSE header" />
      <EdCode :code="sampleAudExamples" lang="text" />
    </section>

    <section id="twocol" class="kit__sec">
      <h2 class="kit__h2">EdTwoCol</h2>
      <p class="kit__desc">Auto-fit two-column grid (slot-only layout primitive).</p>
      <EdTwoCol>
        <EdProse>Left column — wraps below 20rem.</EdProse>
        <EdProse>Right column — gutter is 2.5rem.</EdProse>
      </EdTwoCol>
    </section>

    <section id="stages" class="kit__sec">
      <h2 class="kit__h2">EdStages + EdStage</h2>
      <p class="kit__desc">Numbered process steps stacked vertically.</p>
      <EdStages>
        <EdStage num="1" title="Initiate consent" numColor="var(--at-blue-deep)">
          <p>TPP creates a consent via PAR at the API Hub.</p>
        </EdStage>
        <EdStage num="2" title="Authenticate at the LFI" numColor="var(--at-teal)">
          <p>The end user is redirected to the LFI to authenticate and authorize the consent.</p>
        </EdStage>
        <EdStage num="3" title="Use the access token" numColor="var(--at-navy)">
          <p>The TPP exchanges the authorization code for an access token at the API Hub.</p>
        </EdStage>
      </EdStages>
    </section>

    <section id="compare" class="kit__sec">
      <h2 class="kit__h2">EdCompareCards + EdCompareCard</h2>
      <p class="kit__desc">Side-by-side comparison cards with optional cadence row.</p>
      <EdCompareCards>
        <EdCompareCard
          kicker="One-off"
          example="POST /payments"
          cadence="single"
          cadenceLabel="instance"
          accent="var(--at-blue-deep)"
        >
          <ul>
            <li>One authorisation, one execution.</li>
            <li>Consent expires after success or 90 days.</li>
          </ul>
        </EdCompareCard>
        <EdCompareCard
          kicker="Recurring"
          example="POST /domestic-standing-orders"
          cadence="N"
          cadenceLabel="executions"
          accent="var(--at-teal-deep)"
        >
          <ul>
            <li>One authorisation, repeated executions.</li>
            <li>Cancellable by either party.</li>
          </ul>
        </EdCompareCard>
      </EdCompareCards>
    </section>

    <section id="related" class="kit__sec kit__sec--full">
      <h2 class="kit__h2">EdRelatedCards + EdRelatedCard</h2>
      <p class="kit__desc">Bottom-of-page "read alongside" grid.</p>
      <EdRelatedCards eyebrow="Read alongside" title="Related components">
        <EdRelatedCard
          href="#hero"
          category="Hero"
          categoryColor="var(--at-teal)"
          title="EdHero"
          desc="Page hero with eyebrow, title, meta and key numbers."
        />
        <EdRelatedCard
          href="#sectionband"
          category="Layout"
          categoryColor="var(--at-blue-deep)"
          title="EdSectionBand"
          desc="Top-level page section with two tone variants."
        />
        <EdRelatedCard
          href="#note"
          category="Admonition"
          categoryColor="var(--at-gold)"
          title="EdNote"
          desc="Seven-variant admonition for tips, warnings and danger callouts."
        />
      </EdRelatedCards>
    </section>

    <section id="backstrip" class="kit__sec kit__sec--full">
      <h2 class="kit__h2">EdBackStrip</h2>
      <p class="kit__desc">Top-of-page back link with arrow.</p>
      <EdBackStrip href="#hero" text="Back to the top of the kit" />
    </section>

    <section id="inpagenav" class="kit__sec kit__sec--full">
      <h2 class="kit__h2">EdInPageNav</h2>
      <p class="kit__desc">Sticky in-page anchor strip.</p>
      <EdInPageNav :sections="sections" />
    </section>

    <section id="hoversidebar" class="kit__sec">
      <h2 class="kit__h2">EdHoverSidebar (with EdSidebarItem)</h2>
      <p class="kit__desc">
        Hover-revealed left-edge drawer. Mounted at the page edge — look for the navy
        rail on the very left of the viewport. Requires &gt;= 960px viewport to render.
        Active link state uses vue-router's <code>useRoute()</code>.
      </p>
      <EdHoverSidebar
        title="Kit sections"
        rootHref="#hero"
        :items="sidebarItems"
      />
    </section>
  </main>
</template>

<style scoped>
.kit {
  max-width: var(--at-page-max);
  margin: 0 auto;
  padding: 2rem;
}

.kit__banner {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1rem;
  margin-bottom: 2.5rem;
  background: var(--at-navy-deep);
  color: var(--at-bg-cream);
  font-family: var(--at-mono);
  font-size: 0.72rem;
  letter-spacing: 0.1em;
}
.kit__banner-label {
  background: var(--at-teal);
  color: var(--at-navy-deep);
  padding: 0.25rem 0.5rem;
  font-weight: 700;
  letter-spacing: 0.14em;
}
.kit__banner-text {
  text-transform: none;
  letter-spacing: 0;
  font-family: var(--at-sans);
  font-size: 0.85rem;
}

.kit__sec {
  padding: 2.25rem 0;
  border-top: 1px solid var(--at-grid-line-2);
}
.kit__sec--full {
  padding-left: 0;
  padding-right: 0;
}

.kit__h2 {
  font-family: var(--at-serif);
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--at-navy-deep);
  margin: 0 0 0.4rem;
}
.kit__desc {
  font-family: var(--at-sans);
  font-size: 0.9rem;
  color: var(--at-mute);
  margin: 0 0 1.5rem;
}
</style>
