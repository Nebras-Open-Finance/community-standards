<script setup lang="ts">
// Standalone Functional Certification landing page — a card grid that links to
// every functional-certification area for one audience (LFI or TPP). It is NOT
// wired into the sidebar; it is linked from the Service Desk / Jira
// certification-evidence tickets as a single entry point. Ported from the
// `/tech/tpp-standards` landing-page card grid.
//
// Auto-registered globally by `unplugin-vue-components` (filename → <FcCertLanding>).

interface LandingSubItem {
  label: string
  hint?: string
  url: string
}

interface LandingCard {
  /** Short eyebrow label, e.g. 'Data Sharing'. */
  category: string
  /** Card heading — may contain inline HTML entities. */
  title: string
  /** Card body — may contain inline HTML (e.g. <code>). */
  desc: string
  /** Route path the card (and its header) links to. */
  url: string
  /** Optional pill tags. */
  tags?: readonly string[]
  /** When present, renders a split card with a per-item link list. */
  subItems?: readonly LandingSubItem[]
}

const props = defineProps<{
  /** Audience badge shown in the hero, e.g. 'LFI' or 'TPP'. */
  audience: string
  /** Hero heading. */
  title: string
  /** Hero lede paragraph — may contain inline HTML. */
  lede: string
  /** The cards to render, in presentation order. */
  cards: readonly LandingCard[]
}>()

// A fixed palette cycled across the cards so each has a distinct accent, matching
// the look of the TPP Standards landing page.
const PALETTE = [
  'var(--at-teal)',
  'var(--at-gold)',
  'var(--at-blue, #2563eb)',
  'var(--at-navy)',
  'var(--at-blue-deep, #1d4ed8)',
  'var(--at-teal-deep)',
  'var(--at-navy-deep)',
] as const

const decorated = computed(() =>
  props.cards.map((card, i) => ({ ...card, color: PALETTE[i % PALETTE.length] ?? PALETTE[0] })),
)

function withAlpha(cssVar: string, alpha: number): string {
  return `color-mix(in srgb, ${cssVar} ${Math.round(alpha * 100)}%, transparent)`
}
</script>

<template>
  <div class="fc-landing">
    <!-- ── Hero ─────────────────────────────────────────────────────────── -->
    <section class="fc-landing-hero">
      <div class="fc-landing-hero__inner">
        <div class="fc-landing-hero__label">
          <span class="fc-landing-hero__label-dash" />
          Testing &amp; Certification
        </div>
        <h1 class="fc-landing-hero__title">
          {{ title }}
          <span class="fc-landing-hero__badge">{{ audience }}</span>
        </h1>
        <p class="fc-landing-hero__sub" v-html="lede" />
        <p class="fc-landing-hero__note">
          Each area is certified separately — pick the one you are submitting evidence for and follow
          the guidance, then attach the ZIP the portal builds to its own Service Desk ticket.
        </p>
      </div>
    </section>

    <!-- ── Card grid ────────────────────────────────────────────────────── -->
    <section class="fc-landing-sections">
      <div class="fc-landing-sections__inner">
        <div class="fc-landing-grid">
          <template v-for="card in decorated" :key="card.title">
            <!-- Simple: whole card is one link -->
            <a
              v-if="!card.subItems"
              :href="card.url"
              class="fc-landing-card"
              :style="{ '--card-color': card.color }"
            >
              <span class="fc-landing-card__top" :style="{ background: card.color }" />

              <div class="fc-landing-card__meta">
                <span class="fc-landing-card__cat" :style="{ color: card.color }">
                  {{ card.category }}
                </span>
              </div>

              <h3 class="fc-landing-card__title" v-html="card.title" />
              <p class="fc-landing-card__desc" v-html="card.desc" />

              <div v-if="card.tags && card.tags.length" class="fc-landing-card__tags">
                <span
                  v-for="tag in card.tags"
                  :key="tag"
                  class="fc-landing-card__tag"
                  :style="{ background: withAlpha(card.color, 0.1), color: card.color }"
                >{{ tag }}</span>
              </div>

              <div class="fc-landing-card__foot">
                <span class="fc-landing-card__cta">Open guide</span>
                <span class="fc-landing-card__arrow" :style="{ color: card.color }">&rarr;</span>
              </div>
            </a>

            <!-- Split: header link + per-sub-item links -->
            <div
              v-else
              class="fc-landing-card fc-landing-card--split"
              :style="{ '--card-color': card.color }"
            >
              <span class="fc-landing-card__top" :style="{ background: card.color }" />

              <a :href="card.url" class="fc-landing-card__head">
                <div class="fc-landing-card__meta">
                  <span class="fc-landing-card__cat" :style="{ color: card.color }">
                    {{ card.category }}
                  </span>
                </div>

                <h3 class="fc-landing-card__title" v-html="card.title" />
                <p class="fc-landing-card__desc" v-html="card.desc" />
              </a>

              <ul class="fc-landing-card__subs">
                <li v-for="sub in card.subItems" :key="sub.label">
                  <a :href="sub.url" class="fc-landing-card__sub">
                    <span class="fc-landing-card__sub-marker" :style="{ background: card.color }" />
                    <span class="fc-landing-card__sub-body">
                      <span class="fc-landing-card__sub-label" v-html="sub.label" />
                      <span v-if="sub.hint" class="fc-landing-card__sub-hint" v-html="sub.hint" />
                    </span>
                    <span class="fc-landing-card__sub-arrow" :style="{ color: card.color }">&rarr;</span>
                  </a>
                </li>
              </ul>
            </div>
          </template>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.fc-landing {
  background: var(--at-bg-cream);
  color: var(--at-navy-deep);
  font-family: var(--at-sans);
  padding-top: 4.25rem;
  min-height: 100vh;
}

/* ─── Hero ──────────────────────────────────────────────────────────────── */
.fc-landing-hero {
  background: var(--at-bg-cream);
  border-bottom: 1px solid var(--at-grid-line);
}

.fc-landing-hero__inner {
  max-width: var(--at-page-max);
  margin: 0 auto;
  padding: 4.5rem 2rem 3.5rem;
}

.fc-landing-hero__label {
  font-family: var(--at-mono);
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--at-teal);
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.fc-landing-hero__label-dash { width: 24px; height: 1px; background: currentColor; }

.fc-landing-hero__title {
  font-family: var(--at-serif);
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.035em;
  margin: 0;
  color: var(--at-navy-deep);
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.85rem;
}

.fc-landing-hero__badge {
  font-family: var(--at-mono);
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--at-teal);
  background: rgba(0, 194, 169, 0.12);
  padding: 0.35rem 0.7rem;
  align-self: center;
}

.fc-landing-hero__sub {
  font-family: var(--at-sans);
  font-size: 1.12rem;
  line-height: 1.6;
  margin: 1.75rem 0 0;
  max-width: 50rem;
  color: var(--at-mute-2);
}

.fc-landing-hero__sub :deep(code) {
  font-family: var(--at-mono);
  font-size: 0.85em;
  background: rgba(0, 39, 127, 0.06);
  padding: 0.08em 0.35em;
  color: var(--at-navy-deep);
}

.fc-landing-hero__note {
  font-family: var(--at-sans);
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 1rem 0 0;
  max-width: 50rem;
  color: var(--at-mute);
}

/* ─── Sections ──────────────────────────────────────────────────────────── */
.fc-landing-sections {
  padding: 3.5rem 0 5rem;
  background: var(--at-surface);
  border-top: 1px solid var(--at-grid-line);
}

.fc-landing-sections__inner {
  max-width: var(--at-page-max);
  margin: 0 auto;
  padding: 0 2rem;
}

.fc-landing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(22.5rem, 1fr));
  gap: 1.25rem;
}

/* ─── Card ──────────────────────────────────────────────────────────────── */
.fc-landing-card {
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

.fc-landing-card:hover {
  border-color: var(--card-color, var(--at-navy));
  transform: translateY(-2px);
}

.fc-landing-card__top {
  position: absolute;
  top: 0;
  left: 0;
  width: 48px;
  height: 3px;
}

.fc-landing-card__meta {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  margin-bottom: 0.85rem;
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.fc-landing-card__cat { font-weight: 700; }

.fc-landing-card__title {
  font-family: var(--at-serif);
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: var(--at-navy-deep);
  margin: 0 0 0.85rem;
}

.fc-landing-card__desc {
  font-family: var(--at-sans);
  font-size: 0.92rem;
  line-height: 1.6;
  color: var(--at-mute-2);
  margin: 0 0 1.1rem;
}

.fc-landing-card__desc :deep(code) {
  font-family: var(--at-mono);
  font-size: 0.82em;
  background: rgba(0, 39, 127, 0.06);
  padding: 0.08em 0.35em;
  color: var(--at-navy-deep);
}

/* Simple cards: push desc to fill so the foot hugs the bottom */
.fc-landing-card:not(.fc-landing-card--split) .fc-landing-card__desc { flex: 1; }

/* ─── Split card ────────────────────────────────────────────────────────── */
.fc-landing-card--split { padding: 0; }
.fc-landing-card--split:hover { transform: none; }

.fc-landing-card__head {
  display: block;
  padding: 2rem 1.75rem 1.25rem;
  text-decoration: none;
  color: inherit;
  transition: background 0.15s;
}

.fc-landing-card__head:hover { background: rgba(0, 39, 127, 0.02); }
.fc-landing-card__head:hover .fc-landing-card__title { color: var(--card-color, var(--at-navy)); }
.fc-landing-card--split .fc-landing-card__title { transition: color 0.15s; }

.fc-landing-card__subs {
  list-style: none;
  margin: 0;
  padding: 0;
  border-top: 1px solid var(--at-grid-line);
  flex: 1;
}

.fc-landing-card__sub {
  display: grid;
  grid-template-columns: 10px 1fr auto;
  align-items: center;
  column-gap: 0.85rem;
  padding: 0.85rem 1.75rem;
  border-bottom: 1px solid var(--at-grid-line);
  text-decoration: none;
  color: inherit;
  transition: background 0.15s, padding-left 0.15s;
}

.fc-landing-card__sub:hover {
  background: var(--at-bg-paper);
  padding-left: 1.9rem;
}

.fc-landing-card__sub-marker {
  width: 6px;
  height: 6px;
  align-self: center;
  transition: transform 0.15s;
}

.fc-landing-card__sub:hover .fc-landing-card__sub-marker { transform: scale(1.4); }

.fc-landing-card__sub-body {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  min-width: 0;
}

.fc-landing-card__sub-label {
  font-family: var(--at-sans);
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--at-navy-deep);
  line-height: 1.3;
}

.fc-landing-card__sub-hint {
  font-family: var(--at-sans);
  font-size: 0.78rem;
  line-height: 1.45;
  color: var(--at-mute);
}

.fc-landing-card__sub-arrow {
  font-family: var(--at-mono);
  font-size: 0.95rem;
  opacity: 0.5;
  transition: opacity 0.15s, transform 0.15s;
}

.fc-landing-card__sub:hover .fc-landing-card__sub-arrow {
  opacity: 1;
  transform: translateX(3px);
}

/* ─── Tags ──────────────────────────────────────────────────────────────── */
.fc-landing-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 1rem;
}

.fc-landing-card__tag {
  padding: 0.28rem 0.6rem;
  font-family: var(--at-mono);
  font-size: 0.58rem;
  letter-spacing: 0.08em;
  font-weight: 600;
  text-transform: uppercase;
}

/* ─── Foot ──────────────────────────────────────────────────────────────── */
.fc-landing-card__foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1rem;
  border-top: 1px solid var(--at-grid-line);
}

.fc-landing-card__cta {
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--at-mute);
}

.fc-landing-card__arrow {
  font-family: var(--at-mono);
  font-size: 1rem;
  transition: transform 0.2s;
}

.fc-landing-card:hover .fc-landing-card__arrow { transform: translateX(4px); }
.fc-landing-card:hover .fc-landing-card__cta { color: var(--at-navy-deep); }

/* ─── Responsive ────────────────────────────────────────────────────────── */
@media (max-width: 640px) {
  .fc-landing-hero__inner { padding: 3rem 1.25rem 2.5rem; }
  .fc-landing-sections { padding: 2.5rem 0 4rem; }
  .fc-landing-sections__inner { padding: 0 1.25rem; }
  .fc-landing-grid { grid-template-columns: 1fr; }
}
</style>
