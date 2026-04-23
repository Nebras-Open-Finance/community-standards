<template>
  <div class="ed-tech">

    <PageHeader />

    <!-- ═══════════════════════════════════════════════════════════════════
         HERO
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ed-tech-hero">
      <div class="ed-tech-hero__inner">
        <div class="ed-tech-hero__label">
          <span class="ed-tech-hero__label-dash" />
          Build &middot; Integrate &middot; Operate
        </div>
        <h1 class="ed-tech-hero__title">
          UAE Open Finance Architecture
          <span class="ed-tech-hero__badge">{{ CURRENT_VERSION }}</span>
        </h1>
        <p class="ed-tech-hero__sub">
          The <strong>UAE Open Finance Platform</strong> (AlTareq) is the national ecosystem that
          lets TPPs and LFIs securely share customer data and initiate payments with explicit
          consent. It provides one unified API layer for the entire country, managed by the
          <strong>Central Bank of the UAE</strong> and operated by <strong>Nebras</strong>.
        </p>
        <p class="ed-tech-hero__sub ed-tech-hero__sub--tight">
          A single standardized gateway &mdash; the <strong>API Hub</strong> &mdash; sits between
          Third-Party Providers and all participating Licensed Financial Institutions. Every LFI
          has its own tenant inside the Hub, and all TPP traffic flows through it rather than
          directly to an LFI, giving developers one integration point with consent, tokens,
          schemas, and routing handled centrally.
        </p>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         SECTIONS GRID
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ed-tech-sections">
      <div class="ed-tech-sections__inner">
        <div class="ed-tech-sections__head">
          <div class="ed-tech-sections__eyebrow">
            <span class="ed-tech-sections__eyebrow-dash" />
            Developer docs
          </div>
          <h2 class="ed-tech-sections__title">Where to go</h2>
          <p class="ed-tech-sections__lede">
            These developer docs are organised around the audiences and artefacts you will work
            with. Pick the guide that matches your role, or jump straight to the OpenAPI specs,
            knowledge base, or change registers.
          </p>
        </div>

        <div class="ed-tech-grid">
          <a
            v-for="section in sections"
            :key="section.title"
            :href="section.url"
            class="ed-tech-card"
            :style="{ '--card-color': section.color }"
          >
            <span class="ed-tech-card__top" :style="{ background: section.color }" />

            <div class="ed-tech-card__meta">
              <span class="ed-tech-card__cat" :style="{ color: section.color }">
                {{ section.category }}
              </span>
            </div>

            <h3 class="ed-tech-card__title" v-html="section.title" />
            <p class="ed-tech-card__desc" v-html="section.desc" />

            <div v-if="section.tags && section.tags.length" class="ed-tech-card__tags">
              <span
                v-for="tag in section.tags"
                :key="tag"
                class="ed-tech-card__tag"
                :style="{
                  background: withAlpha(section.color, 0.10),
                  color: section.color,
                }"
              >{{ tag }}</span>
            </div>

            <div class="ed-tech-card__foot">
              <span class="ed-tech-card__cta">{{ section.cta || 'Open section' }}</span>
              <span class="ed-tech-card__arrow" :style="{ color: section.color }">&rarr;</span>
            </div>
          </a>
        </div>
      </div>
    </section>

    <PageFooter />
  </div>
</template>

<script setup>
import PageHeader from './Components/PageHeader.vue'
import PageFooter from './Components/PageFooter.vue'
import { CURRENT_VERSION } from '../../.vitepress/version.ts'

const sections = [
  {
    category: 'For TPPs',
    color: 'var(--at-teal)',
    title: 'TPP &mdash; Open Finance Standards',
    url: '/tech/tpp-standards/',
    desc: 'The normative specification for everything a TPP needs to integrate with the UAE Open Finance ecosystem: API surfaces, FAPI-aligned security, consent and authorisation flows, user experience requirements, and onboarding through the Trust Framework.',
    tags: ['FAPI', 'Consent', 'Banking APIs', 'Onboarding'],
    cta: 'Open TPP Standards',
  },
  {
    category: 'For LFIs',
    color: 'var(--at-blue-deep)',
    title: 'LFI &mdash; Integration Guide',
    url: '/tech/lfi-api-hub/',
    desc: 'The implementation guide for LFIs connecting to the API Hub. Covers the APIs each LFI must implement (via Ozone Connect), the authentication and consent touchpoints exposed by the Hub, admin-portal operations, and the onboarding steps required to become a live participant.',
    tags: ['Ozone Connect', 'Headless Heimdall', 'CMI', 'Certification'],
    cta: 'Open LFI Integration Guide',
  },
  {
    category: 'Reference',
    color: 'var(--at-navy-deep)',
    title: 'API Specs',
    url: '/tech/api-specs/',
    desc: 'The OpenAPI specifications are the <strong>source of truth</strong> for every API in the ecosystem &mdash; <strong>Standards</strong> (Hub &rarr; TPPs), <strong>API Hub</strong> (Hub &rarr; LFIs), and <strong>Ozone Connect</strong> (what LFIs must implement for the Hub to call).',
    tags: ['OpenAPI', 'Standards', 'API Hub', 'Ozone Connect'],
    cta: 'Open API Specs',
  },
  {
    category: 'Library',
    color: 'var(--at-gold)',
    title: 'Knowledge Base',
    url: '/knowledge-base/',
    desc: 'Practical, searchable articles that sit alongside the standards &mdash; deep dives, worked examples, and answers to common integration questions. Useful when you need context beyond what the specification alone provides.',
    tags: ['Deep dives', 'Worked examples', 'FAQs'],
    cta: 'Open Knowledge Base',
  },
  {
    category: 'Changelog',
    color: 'var(--at-navy)',
    title: 'Release Notes &amp; Erratas',
    url: '/tech/release-notes-and-erratas/',
    desc: 'The authoritative registers of post-publication changes. <strong>Release Notes</strong> track deployments to the API Hub, Trust Framework, and supporting infrastructure. <strong>Erratas</strong> track corrections to the published TPP Standards and LFI Integration Guide.',
    tags: ['Release Notes', 'Erratas'],
    cta: 'Open Release Notes & Erratas',
  },
]

function withAlpha(cssVar, alpha) {
  return `color-mix(in srgb, ${cssVar} ${Math.round(alpha * 100)}%, transparent)`
}
</script>

<style scoped>
.ed-tech {
  background: var(--at-bg-cream);
  color: var(--at-navy-deep);
  font-family: var(--at-sans);
  padding-top: 4.25rem;
}

/* ─── Hero ──────────────────────────────────────────────────────────────── */
.ed-tech-hero {
  background: var(--at-bg-cream);
  border-bottom: 1px solid var(--at-grid-line);
}

.ed-tech-hero__inner {
  max-width: var(--at-page-max);
  margin: 0 auto;
  padding: 4.5rem 2rem 3.5rem;
}

.ed-tech-hero__label {
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

.ed-tech-hero__label-dash {
  width: 24px;
  height: 1px;
  background: currentColor;
}

.ed-tech-hero__title {
  font-family: var(--at-serif);
  font-size: clamp(2.75rem, 6.5vw, 4.5rem);
  font-weight: 600;
  line-height: 0.98;
  letter-spacing: -0.035em;
  margin: 0;
  color: var(--at-navy-deep);
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.85rem;
}

.ed-tech-hero__badge {
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

.ed-tech-hero__sub {
  font-family: var(--at-sans);
  font-size: 1.12rem;
  line-height: 1.6;
  margin: 1.75rem 0 0;
  max-width: 48rem;
  color: var(--at-mute-2);
}

.ed-tech-hero__sub--tight { margin-top: 1rem; }

.ed-tech-hero__sub strong { color: var(--at-navy-deep); font-weight: 600; }

/* ─── Sections ──────────────────────────────────────────────────────────── */
.ed-tech-sections {
  padding: 4rem 0 5rem;
  background: var(--at-surface);
  border-top: 1px solid var(--at-grid-line);
}

.ed-tech-sections__inner {
  max-width: var(--at-page-max);
  margin: 0 auto;
  padding: 0 2rem;
}

.ed-tech-sections__head { max-width: 52rem; margin-bottom: 2.5rem; }

.ed-tech-sections__eyebrow {
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--at-teal);
  margin-bottom: 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 600;
}

.ed-tech-sections__eyebrow-dash {
  width: 24px;
  height: 1px;
  background: currentColor;
}

.ed-tech-sections__title {
  font-family: var(--at-serif);
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 500;
  letter-spacing: -0.025em;
  line-height: 1.05;
  margin: 0;
  color: var(--at-navy-deep);
}

.ed-tech-sections__lede {
  font-family: var(--at-sans);
  font-size: 1rem;
  line-height: 1.65;
  color: var(--at-mute-2);
  margin: 1.1rem 0 0;
}

.ed-tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(22.5rem, 1fr));
  gap: 1.25rem;
}

/* ─── Card ──────────────────────────────────────────────────────────────── */
.ed-tech-card {
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

.ed-tech-card:hover {
  border-color: var(--card-color, var(--at-navy));
  transform: translateY(-2px);
}

.ed-tech-card__top {
  position: absolute;
  top: 0;
  left: 0;
  width: 48px;
  height: 3px;
}

.ed-tech-card__meta {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  margin-bottom: 0.85rem;
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.ed-tech-card__cat { font-weight: 700; }

.ed-tech-card__title {
  font-family: var(--at-serif);
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: var(--at-navy-deep);
  margin: 0 0 0.85rem;
}

.ed-tech-card__desc {
  font-family: var(--at-sans);
  font-size: 0.92rem;
  line-height: 1.6;
  color: var(--at-mute-2);
  margin: 0 0 1.1rem;
  flex: 1;
}

.ed-tech-card__desc :deep(strong) {
  color: var(--at-navy-deep);
  font-weight: 600;
}

.ed-tech-card__desc :deep(code) {
  font-family: var(--at-mono);
  font-size: 0.82em;
  background: rgba(0, 39, 127, 0.06);
  padding: 0.08em 0.35em;
  color: var(--at-navy-deep);
}

.ed-tech-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 1rem;
}

.ed-tech-card__tag {
  padding: 0.28rem 0.6rem;
  font-family: var(--at-mono);
  font-size: 0.58rem;
  letter-spacing: 0.08em;
  font-weight: 600;
  text-transform: uppercase;
}

.ed-tech-card__foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1rem;
  border-top: 1px solid var(--at-grid-line);
}

.ed-tech-card__cta {
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--at-mute);
}

.ed-tech-card__arrow {
  font-family: var(--at-mono);
  font-size: 1rem;
  transition: transform 0.2s;
}

.ed-tech-card:hover .ed-tech-card__arrow { transform: translateX(4px); }
.ed-tech-card:hover .ed-tech-card__cta { color: var(--at-navy-deep); }

/* ─── Responsive ────────────────────────────────────────────────────────── */
@media (max-width: 640px) {
  .ed-tech-hero__inner { padding: 3rem 1.25rem 2.5rem; }
  .ed-tech-sections { padding: 3rem 0 4rem; }
  .ed-tech-sections__inner { padding: 0 1.25rem; }
  .ed-tech-grid { grid-template-columns: 1fr; }
}
</style>
