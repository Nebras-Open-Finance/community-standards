<route lang="yaml">
meta:
  title: Delegated SCA — Requirements
  isIndex: true
</route>

<script setup lang="ts">
import { data } from '@/data/requirements/lfi-api-hub-v2-1-banking-service-initiation-domestic-payments-multi-payments-delegated-sca'

function validatorClass(v: string): string {
  if (v === 'API Hub') return 'ed-req-validator--hub'
  if (v === 'TPP') return 'ed-req-validator--tpp'
  if (v === 'N/A') return 'ed-req-validator--none'
  if (v.startsWith('LFI')) return 'ed-req-validator--lfi'
  return 'ed-req-validator--lfi'
}

interface SplitValidator { label: string; detail: string | null }

function splitValidator(v: string): SplitValidator {
  const m = v.match(/^([^(]+?)\s*\(([^)]+)\)\s*$/)
  if (m && m[1] && m[2]) return { label: m[1].trim(), detail: m[2].trim() }
  return { label: v, detail: null }
}

function methodClass(m: string | undefined): string {
  return m ? `http-${m.toLowerCase()}` : ''
}

function genericGridTemplate(headers: readonly string[]): string {
  const tracks: string[] = []
  for (let i = 0; i < headers.length; i++) {
    const h = headers[i]?.trim() ?? ''
    const isFirst = i === 0
    const isLast = i === headers.length - 1
    if (isFirst && h === '#') tracks.push('2.5rem')
    else if (isLast) tracks.push('minmax(0, 2.4fr)')
    else tracks.push('minmax(11rem, 1fr)')
  }
  return tracks.join(' ')
}

const eyebrow = computed<string>(() => data.eyebrow ?? 'Validate · Enforce · Trust')
</script>

<template>
  <div class="ed-req">
    <section class="ed-req-hero">
      <div class="ed-req-hero__inner">
        <div class="ed-req-hero__label">
          <span class="ed-req-hero__label-dash" />
          {{ eyebrow }}
        </div>
        <h1 class="ed-req-hero__title">
          {{ data.title }}
          <span v-if="data.version" class="ed-req-hero__badge">{{ data.version }}</span>
          <span v-if="data.readTime" class="ed-req-hero__read">{{ data.readTime }} read</span>
        </h1>
        <p class="ed-req-hero__sub" v-html="data.lede" />
        <p v-if="data.preconditions" class="ed-req-hero__sub ed-req-hero__sub--tight" v-html="data.preconditions" />
      </div>
    </section>

    <EdSectionBand
      v-for="(s, i) in data.sections"
      :id="s.id"
      :key="s.id"
      :num="s.num"
      :tone="i % 2 === 0 ? 'cream' : 'surface'"
      :eyebrow="s.method && s.path ? 'Endpoint' : 'Section'"
      :title="s.title"
    >
      <div v-if="s.method && s.path" class="ed-req-endpoint">
        <span class="http-badge" :class="methodClass(s.method)">{{ s.method }}</span>
        <code class="ed-req-endpoint__path">{{ s.path }}</code>
      </div>

      <div
        v-for="(c, ci) in s.callouts || []"
        :key="`${s.id}-callout-${ci}`"
        class="ed-req-callout"
        :class="`ed-req-callout--${c.kind}`"
      >
        <div v-if="c.title" class="ed-req-callout__title">{{ c.title }}</div>
        <div class="ed-req-callout__body" v-html="c.html" />
      </div>

      <template v-for="(b, bi) in s.blocks || []" :key="`${s.id}-blk-${bi}`">
        <p v-if="b.kind === 'prose'" class="ed-req-intro" v-html="b.html" />
        <div
          v-else-if="b.kind === 'table'"
          class="ed-req-table ed-req-table--generic"
          role="table"
          :aria-label="s.title"
          :style="{ gridTemplateColumns: genericGridTemplate(b.table.headers) }"
        >
          <div class="ed-req-row ed-req-row--head" role="row">
            <div
              v-for="(h, hi) in b.table.headers"
              :key="`${s.id}-blk-${bi}-h-${hi}`"
              class="ed-req-cell"
              role="columnheader"
            >{{ h }}</div>
          </div>
          <div
            v-for="(r, ri) in b.table.rows"
            :key="`${s.id}-blk-${bi}-r-${ri}`"
            class="ed-req-row"
            role="row"
          >
            <div
              v-for="(c, ci) in r.cells"
              :key="`${s.id}-blk-${bi}-r-${ri}-c-${ci}`"
              class="ed-req-cell ed-req-cell--generic"
              role="cell"
              v-html="c"
            />
          </div>
        </div>
      </template>

      <div v-if="s.rules && s.rules.length" class="ed-req-table" role="table" :aria-label="s.title">
        <div class="ed-req-row ed-req-row--head" role="row">
          <div class="ed-req-cell ed-req-cell--num" role="columnheader">#</div>
          <div class="ed-req-cell ed-req-cell--field" role="columnheader">Field</div>
          <div class="ed-req-cell ed-req-cell--rule" role="columnheader">Rule</div>
          <div class="ed-req-cell ed-req-cell--validator" role="columnheader">Validated by</div>
        </div>
        <div
          v-for="(r, idx) in s.rules"
          :key="`${s.id}-rule-${idx}`"
          class="ed-req-row"
          role="row"
        >
          <div class="ed-req-cell ed-req-cell--num" role="cell">{{ idx + 1 }}</div>
          <div class="ed-req-cell ed-req-cell--field" role="cell" v-html="r.field" />
          <div class="ed-req-cell ed-req-cell--rule" role="cell" v-html="r.rule" />
          <div class="ed-req-cell ed-req-cell--validator" role="cell">
            <span class="ed-req-validator" :class="validatorClass(r.validatedBy)">
              <span class="ed-req-validator__label">{{ splitValidator(r.validatedBy).label }}</span>
              <span v-if="splitValidator(r.validatedBy).detail" class="ed-req-validator__detail">{{ splitValidator(r.validatedBy).detail }}</span>
            </span>
          </div>
        </div>
      </div>

      <div
        v-if="s.table"
        class="ed-req-table ed-req-table--generic"
        role="table"
        :aria-label="s.title"
        :style="{ gridTemplateColumns: genericGridTemplate(s.table.headers) }"
      >
        <div class="ed-req-row ed-req-row--head" role="row">
          <div
            v-for="(h, hi) in s.table.headers"
            :key="`${s.id}-h-${hi}`"
            class="ed-req-cell"
            role="columnheader"
          >{{ h }}</div>
        </div>
        <div
          v-for="(r, ri) in s.table.rows"
          :key="`${s.id}-r-${ri}`"
          class="ed-req-row"
          role="row"
        >
          <div
            v-for="(c, ci) in r.cells"
            :key="`${s.id}-r-${ri}-c-${ci}`"
            class="ed-req-cell ed-req-cell--generic"
            role="cell"
            v-html="c"
          />
        </div>
      </div>

      <div
        v-for="(sub, si) in s.subsections || []"
        :key="`${s.id}-sub-${si}`"
        class="ed-req-sub"
      >
        <h3 class="ed-req-sub__heading">{{ sub.heading }}</h3>

        <div
          v-for="(c, ci) in sub.callouts || []"
          :key="`${s.id}-sub-${si}-callout-${ci}`"
          class="ed-req-callout"
          :class="`ed-req-callout--${c.kind}`"
        >
          <div v-if="c.title" class="ed-req-callout__title">{{ c.title }}</div>
          <div class="ed-req-callout__body" v-html="c.html" />
        </div>

        <template v-for="(b, bi) in sub.blocks || []" :key="`${s.id}-sub-${si}-blk-${bi}`">
          <p v-if="b.kind === 'prose'" class="ed-req-sub__intro" v-html="b.html" />
          <div
            v-else-if="b.kind === 'table'"
            class="ed-req-table ed-req-table--generic ed-req-table--sub"
            role="table"
            :aria-label="sub.heading"
            :style="{ gridTemplateColumns: genericGridTemplate(b.table.headers) }"
          >
            <div class="ed-req-row ed-req-row--head" role="row">
              <div
                v-for="(h, hi) in b.table.headers"
                :key="`${s.id}-sub-${si}-blk-${bi}-h-${hi}`"
                class="ed-req-cell"
                role="columnheader"
              >{{ h }}</div>
            </div>
            <div
              v-for="(r, ri) in b.table.rows"
              :key="`${s.id}-sub-${si}-blk-${bi}-r-${ri}`"
              class="ed-req-row"
              role="row"
            >
              <div
                v-for="(c, ci) in r.cells"
                :key="`${s.id}-sub-${si}-blk-${bi}-r-${ri}-c-${ci}`"
                class="ed-req-cell ed-req-cell--generic"
                role="cell"
                v-html="c"
              />
            </div>
          </div>
        </template>

        <div
          v-for="(sub2, s2i) in sub.subsections || []"
          :key="`${s.id}-sub-${si}-sub2-${s2i}`"
          class="ed-req-sub ed-req-sub--nested"
        >
          <h4 class="ed-req-sub__heading ed-req-sub__heading--nested">{{ sub2.heading }}</h4>

          <div
            v-for="(c, ci) in sub2.callouts || []"
            :key="`${s.id}-sub-${si}-sub2-${s2i}-callout-${ci}`"
            class="ed-req-callout"
            :class="`ed-req-callout--${c.kind}`"
          >
            <div v-if="c.title" class="ed-req-callout__title">{{ c.title }}</div>
            <div class="ed-req-callout__body" v-html="c.html" />
          </div>

          <template v-for="(b, bi) in sub2.blocks || []" :key="`${s.id}-sub-${si}-sub2-${s2i}-blk-${bi}`">
            <p v-if="b.kind === 'prose'" class="ed-req-sub__intro" v-html="b.html" />
            <div
              v-else-if="b.kind === 'table'"
              class="ed-req-table ed-req-table--generic ed-req-table--sub"
              role="table"
              :aria-label="sub2.heading"
              :style="{ gridTemplateColumns: genericGridTemplate(b.table.headers) }"
            >
              <div class="ed-req-row ed-req-row--head" role="row">
                <div
                  v-for="(h, hi) in b.table.headers"
                  :key="`${s.id}-sub-${si}-sub2-${s2i}-blk-${bi}-h-${hi}`"
                  class="ed-req-cell"
                  role="columnheader"
                >{{ h }}</div>
              </div>
              <div
                v-for="(r, ri) in b.table.rows"
                :key="`${s.id}-sub-${si}-sub2-${s2i}-blk-${bi}-r-${ri}`"
                class="ed-req-row"
                role="row"
              >
                <div
                  v-for="(c, ci) in r.cells"
                  :key="`${s.id}-sub-${si}-sub2-${s2i}-blk-${bi}-r-${ri}-c-${ci}`"
                  class="ed-req-cell ed-req-cell--generic"
                  role="cell"
                  v-html="c"
                />
              </div>
            </div>
          </template>
        </div>
      </div>
    </EdSectionBand>
  </div>
</template>

<style scoped>
.ed-req { background: var(--at-bg-cream); color: var(--at-navy-deep); font-family: var(--at-sans); padding-top: 4.25rem; }

.ed-req-hero { background: var(--at-bg-cream); border-bottom: 1px solid var(--at-grid-line); }
.ed-req-hero__inner { max-width: var(--at-page-max); margin: 0 auto; padding: 4rem 2rem 3rem; }

.ed-req-hero__label {
  font-family: var(--at-mono); font-size: 0.68rem; letter-spacing: 0.18em;
  text-transform: uppercase; color: var(--at-teal); margin-bottom: 1.25rem;
  display: flex; align-items: center; gap: 0.75rem;
}
.ed-req-hero__label-dash { width: 24px; height: 1px; background: currentColor; }

.ed-req-hero__title {
  font-family: var(--at-serif); font-size: clamp(2.25rem, 5vw, 3.6rem);
  font-weight: 600; line-height: 1.02; letter-spacing: -0.03em; margin: 0;
  display: flex; align-items: baseline; flex-wrap: wrap; gap: 0.85rem;
}

.ed-req-hero__badge {
  font-family: var(--at-mono); font-size: 0.75rem; letter-spacing: 0.12em;
  text-transform: uppercase; font-weight: 600; color: var(--at-teal);
  background: rgba(0, 194, 169, 0.12); padding: 0.35rem 0.7rem; align-self: center;
}

.ed-req-hero__read {
  font-family: var(--at-mono); font-size: 0.7rem; letter-spacing: 0.1em;
  text-transform: uppercase; font-weight: 500; color: var(--at-mute);
  align-self: center; padding-left: 0.6rem; border-left: 1px solid var(--at-grid-line-2);
}

.ed-req-hero__sub {
  font-family: var(--at-sans); font-size: 1.05rem; line-height: 1.65;
  margin: 1.5rem 0 0; max-width: 50rem; color: var(--at-mute-2);
}
.ed-req-hero__sub--tight { margin-top: 0.85rem; }
.ed-req-hero__sub :deep(strong) { color: var(--at-navy-deep); font-weight: 600; }
.ed-req-hero__sub :deep(a) { color: var(--at-teal-deep); text-decoration: none; border-bottom: 1px solid currentColor; }
.ed-req-hero__sub :deep(a:hover) { color: var(--at-navy-deep); }
.ed-req-hero__sub :deep(code) {
  font-family: var(--at-mono); font-size: 0.86em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line); padding: 0.08em 0.4em;
}

.ed-req-endpoint { display: inline-flex; align-items: center; gap: 0.6rem; margin-bottom: 1.25rem; }
.ed-req-endpoint__path {
  font-family: var(--at-mono); font-size: 0.95rem; background: var(--at-surface);
  padding: 0.35rem 0.6rem; border: 1px solid var(--at-grid-line); color: var(--at-navy-deep);
}

.ed-req-intro {
  font-family: var(--at-sans); font-size: 1rem; line-height: 1.65;
  color: var(--at-mute-2); max-width: 56rem; margin: 0 0 1.75rem;
}
.ed-req-intro :deep(code) {
  font-family: var(--at-mono); font-size: 0.86em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line); padding: 0.08em 0.4em;
}
.ed-req-intro :deep(a) { color: var(--at-navy-deep); text-decoration: underline; text-underline-offset: 3px; }

.ed-req-table {
  display: grid;
  grid-template-columns: 2.5rem minmax(11rem, 16rem) 1fr minmax(11rem, 13rem);
  border: 1px solid var(--at-grid-line); background: var(--at-surface);
}

.ed-req-row { display: contents; }

.ed-req-cell {
  padding: 0.85rem 0.95rem; border-bottom: 1px solid var(--at-grid-line);
  font-family: var(--at-sans); font-size: 0.92rem; line-height: 1.55; color: var(--at-navy-deep);
}
.ed-req-row:last-child .ed-req-cell { border-bottom: 0; }

.ed-req-row--head .ed-req-cell {
  background: var(--at-navy-deep); font-family: var(--at-mono); font-size: 0.66rem;
  letter-spacing: 0.16em; text-transform: uppercase; font-weight: 700;
  color: var(--at-bg-cream); border-bottom: 0; padding-top: 0.75rem; padding-bottom: 0.75rem;
}
.ed-req-row--head .ed-req-cell + .ed-req-cell { border-left: 1px solid rgba(250, 250, 247, 0.18); }

.ed-req-cell--num {
  font-family: var(--at-mono); font-size: 0.78rem; color: var(--at-mute);
  text-align: right; padding-right: 0.5rem;
}
.ed-req-cell--field {
  border-right: 1px solid var(--at-grid-line);
  word-break: break-word;
  overflow-wrap: anywhere;
}
.ed-req-cell--field :deep(code) {
  font-family: var(--at-mono); font-size: 0.85em; color: var(--at-navy-deep);
  background: none; border: 0; padding: 0;
  word-break: break-word; overflow-wrap: anywhere;
}
.ed-req-cell--rule { border-right: 1px solid var(--at-grid-line); }
.ed-req-cell--rule :deep(code), .ed-req-cell--generic :deep(code) {
  font-family: var(--at-mono); font-size: 0.84em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line); padding: 0.08em 0.4em; word-break: break-word;
}
.ed-req-cell--rule :deep(a), .ed-req-cell--generic :deep(a) {
  color: var(--at-navy-deep); text-decoration: underline; text-underline-offset: 3px;
}
.ed-req-cell--rule :deep(a:hover), .ed-req-cell--generic :deep(a:hover) { color: var(--at-teal-deep); }
.ed-req-cell--rule :deep(strong), .ed-req-cell--generic :deep(strong) { font-weight: 600; }

.ed-req-cell--validator { padding-left: 0.6rem; }
.ed-req-cell--generic { border-right: 1px solid var(--at-grid-line); }
.ed-req-row .ed-req-cell--generic:last-child { border-right: 0; }

.ed-req-validator {
  display: inline-flex; flex-direction: column; align-items: flex-start;
  gap: 0.15rem; max-width: 100%; font-family: var(--at-mono);
  padding: 0.3rem 0.55rem; border: 1px solid currentColor;
}
.ed-req-validator__label {
  font-size: 0.7rem; letter-spacing: 0.06em; text-transform: uppercase;
  font-weight: 700; white-space: nowrap;
}
.ed-req-validator__detail {
  font-size: 0.6rem; letter-spacing: 0.02em; font-weight: 500; opacity: 0.85; white-space: nowrap;
}
.ed-req-validator--hub  { color: var(--at-blue-deep, #1d4ed8); }
.ed-req-validator--lfi  { color: var(--at-teal-deep); }
.ed-req-validator--tpp  { color: var(--at-gold, #b08800); }
.ed-req-validator--none { color: var(--at-mute); }

.ed-req-aside {
  margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid var(--at-grid-line);
  font-family: var(--at-sans); font-size: 0.92rem; line-height: 1.65;
  color: var(--at-mute-2); max-width: 56rem;
}
.ed-req-aside :deep(code) {
  font-family: var(--at-mono); font-size: 0.85em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line); padding: 0.08em 0.4em;
}

.ed-req-callout {
  margin: 0 0 1.5rem; padding: 1rem 1.15rem;
  border-left: 3px solid var(--callout-accent, var(--at-mute));
  background: color-mix(in srgb, var(--callout-accent, var(--at-mute)) 8%, var(--at-bg-cream));
  font-family: var(--at-sans); font-size: 0.92rem; line-height: 1.6; color: var(--at-navy-deep);
  max-width: 56rem;
}
.ed-req-callout--warning { --callout-accent: #b08800; }
.ed-req-callout--info    { --callout-accent: #1d4ed8; }
.ed-req-callout--tip     { --callout-accent: var(--at-teal-deep); }
.ed-req-callout--danger  { --callout-accent: #b91c1c; }

.ed-req-callout__title {
  font-family: var(--at-mono); font-size: 0.66rem; letter-spacing: 0.16em;
  text-transform: uppercase; font-weight: 700;
  color: var(--callout-accent, var(--at-mute)); margin-bottom: 0.5rem;
}
.ed-req-callout__body :deep(p) { margin: 0 0 0.6rem; }
.ed-req-callout__body :deep(p:last-child) { margin-bottom: 0; }
.ed-req-callout__body :deep(code) {
  font-family: var(--at-mono); font-size: 0.86em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line); padding: 0.08em 0.4em;
}
.ed-req-callout__body :deep(a) { color: var(--at-navy-deep); text-decoration: underline; text-underline-offset: 3px; }
.ed-req-callout__body :deep(ul) { margin: 0.4rem 0 0.4rem 1.2rem; padding: 0; }
.ed-req-callout__body :deep(li) { margin-bottom: 0.25rem; }

.ed-req-sub {
  margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--at-grid-line);
}
.ed-req-sub:first-of-type { margin-top: 1.75rem; }
.ed-req-sub__heading {
  font-family: var(--at-serif); font-size: 1.15rem; font-weight: 600;
  letter-spacing: -0.015em; color: var(--at-navy-deep); margin: 0 0 0.85rem;
}
.ed-req-sub__intro {
  font-family: var(--at-sans); font-size: 0.95rem; line-height: 1.65;
  color: var(--at-mute-2); max-width: 56rem; margin: 0 0 1.25rem;
}
.ed-req-sub__intro :deep(code) {
  font-family: var(--at-mono); font-size: 0.86em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line); padding: 0.08em 0.4em;
}
.ed-req-sub__intro :deep(a) { color: var(--at-navy-deep); text-decoration: underline; text-underline-offset: 3px; }
.ed-req-sub__intro :deep(ul) { margin: 0.4rem 0 0.4rem 1.2rem; padding: 0; }
.ed-req-sub__intro :deep(li) { margin-bottom: 0.25rem; }

.ed-req-table--sub { max-width: 56rem; }
.ed-req-aside--sub { margin-top: 1rem; }

.ed-req-sub--nested {
  margin-top: 1.5rem; padding-top: 1.25rem; padding-left: 1.25rem;
  border-top: 0; border-left: 2px solid var(--at-grid-line);
}
.ed-req-sub__heading--nested {
  font-size: 1rem; font-weight: 600; font-family: var(--at-sans);
  letter-spacing: -0.005em; margin: 0 0 0.65rem; color: var(--at-navy-deep);
}

@media (max-width: 720px) {
  .ed-req-hero__inner { padding: 2.75rem 1.25rem 2rem; }
  .ed-req-table { grid-template-columns: 1fr; }
  .ed-req-table--generic { grid-template-columns: 1fr !important; }
  .ed-req-cell--field, .ed-req-cell--rule, .ed-req-cell--generic { border-right: 0; }
}
</style>
