<route lang="yaml">
meta:
  title: LFI Integration Guide
  isIndex: true
</route>

<script setup lang="ts">
// Phase 6 — LFI Integration Guide landing page. Ported from
// `docs/components/WebPages/LfiGuidePage.vue`.
//
// Chrome (PageHeader/PageFooter) is owned by the default layout, so this
// template starts directly with the page wrapper. EdHoverSidebar is
// auto-registered by `unplugin-vue-components`. `useSelectedVersion` is
// auto-imported from `src/composables/`.


const { selectedVersion } = useSelectedVersion()

interface Pillar {
  title: string
  desc: string
  color: string
}

interface SectionSubItem {
  label: string
  hint?: string
  url: string
}

interface SectionConfig {
  category: string
  color: string
  title: string
  url: string
  desc: string
  tags?: readonly string[]
  subItems?: readonly SectionSubItem[]
}

const pillars: readonly Pillar[] = [
  {
    title: 'Operate Ozone Connect',
    desc: 'The LFI-built backend that implements the Open Finance endpoints the Hub calls &mdash; account data, payments, Confirmation of Payee, products &amp; leads, ATMs, and consent events.',
    color: 'var(--at-teal)',
  },
  {
    title: 'Authenticate the customer',
    desc: 'During the consent journey, the PSU is redirected from the Hub to the LFI to authenticate and authorise the consent. Your authorisation server hands the result back to the Hub via Headless Heimdall.',
    color: 'var(--at-blue-deep)',
  },
  {
    title: 'Provide a CMI',
    desc: 'The customer-facing Consent Management Interface where PSUs review and revoke active consents, backed by the Hub\'s Consent Manager API.',
    color: 'var(--at-gold)',
  },
]

const sections = computed<SectionConfig[]>(() => [
  {
    category: 'Identity',
    color: 'var(--at-gold)',
    title: 'Trust Framework',
    url: '/tech/lfi-api-hub/trust-framework/',
    desc: 'The participant directory and certificate authority that underpins the ecosystem. Register your organisation, nominate Organisation Admins and users, upload transport and signing certificates, and create the <code>C3-hh-cm-client</code> application the Hub uses to call your services. Once live, this is also where you publish your authorisation server and API resources so TPPs can discover them.',
    tags: ['Registration', 'Certificates', 'C3 client'],
  },
  {
    category: 'Hub',
    color: 'var(--at-teal)',
    title: 'API Hub',
    url: `/tech/lfi-api-hub/${selectedVersion.value}/api-hub/`,
    desc: 'Everything the Hub provides to your LFI: connectivity and mTLS setup, application-layer authentication, environment-specific configuration, the Admin Portal for TPP management and operational reporting, the Headless Heimdall auth-server API used during the consent journey, and the Consent Manager API for reading and managing consents.',
    tags: ['Onboarding', 'Headless Heimdall', 'Consent Manager', 'Admin Portal'],
  },
  {
    category: 'Ozone Connect',
    color: 'var(--at-navy-deep)',
    title: 'Ozone Connect - Banking',
    url: `/tech/lfi-api-hub/${selectedVersion.value}/banking/`,
    desc: 'The Ozone Connect APIs your LFI implements for the Hub to call on behalf of authorised TPPs.',
    subItems: [
      {
        label: 'Data Sharing',
        hint: 'accounts, balances, transactions, beneficiaries, standing orders, statements, customer data (BDSP, consented)',
        url: `/tech/lfi-api-hub/${selectedVersion.value}/banking/data-sharing/`,
      },
      {
        label: 'Payments (Service Initiation)',
        hint: 'single instant &amp; multi-payments, refunds, PII, multi-authorization (BSIP, consented)',
        url: `/tech/lfi-api-hub/${selectedVersion.value}/banking/service-initiation/`,
      },
      {
        label: 'Confirmation of Payee',
        hint: 'pre-payment payee verification (BSIP, client credentials)',
        url: `/tech/lfi-api-hub/${selectedVersion.value}/banking/confirmation-of-payee/`,
      },
      {
        label: 'Products &amp; Leads',
        hint: 'open product catalogue and lead capture (BDSP, client credentials)',
        url: `/tech/lfi-api-hub/${selectedVersion.value}/banking/products-and-leads/`,
      },
      {
        label: 'ATMs',
        hint: 'ATM location data (BDSP, client credentials)',
        url: `/tech/lfi-api-hub/${selectedVersion.value}/banking/atms/`,
      },
    ],
  },
  {
    category: 'Ozone Connect',
    color: 'var(--at-navy-deep)',
    title: 'Ozone Connect - Consent Events',
    url: `/tech/lfi-api-hub/${selectedVersion.value}/consent-events/`,
    desc: 'The events-and-actions API your LFI implements so the Hub can validate consents at creation time and notify your systems when consents are created, modified, or revoked. This is the LFI\'s hook into the consent lifecycle owned by the Hub.',
    tags: ['Validate', 'Event dispatch'],
  },
  {
    category: 'PSU Journey',
    color: 'var(--at-blue-deep)',
    title: 'Consent Journey',
    url: `/tech/lfi-api-hub/${selectedVersion.value}/consent-journey/api-guide`,
    desc: 'The customer journey at the LFI between PAR and token issuance: authentication (including Strong Customer Authentication), authorization, and the Headless Heimdall handoff back to the Hub.',
    tags: ['Authentication', 'SCA', 'Authorization'],
  },
  {
    category: 'PSU Journey',
    color: 'var(--at-blue-deep)',
    title: 'Consent Management Interface',
    url: `/tech/lfi-api-hub/${selectedVersion.value}/consent-management-interface/`,
    desc: 'Requirements, user experience, and API guide for the consent management surface every LFI must expose to its customers &mdash; the place where PSUs view and revoke active Open Finance consents.',
    tags: ['Requirements', 'UX', 'API guide'],
  },
  {
    category: 'Launch',
    color: 'var(--at-navy)',
    title: 'Testing & Certification',
    url: '/tech/lfi-api-hub/production/testing-certification/overview',
    desc: 'The certification evidence required before going live &mdash; functional, user experience, performance, and security validation &mdash; and the production live-proving steps (attestation, self-testing, TPP buddying) that follow.',
    tags: ['Functional', 'UX', 'Performance', 'Security', 'TPP buddying'],
  },
])

function withAlpha(cssVar: string, alpha: number): string {
  // Best-effort alpha overlay using color-mix — falls back to a subtle tint.
  return `color-mix(in srgb, ${cssVar} ${Math.round(alpha * 100)}%, transparent)`
}
</script>

<template>
  <div class="ed-lfi">

    <!-- ═══════════════════════════════════════════════════════════════════
         HERO
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ed-lfi-hero">
      <div class="ed-lfi-hero__inner">
        <div class="ed-lfi-hero__label">
          <span class="ed-lfi-hero__label-dash" />
          Integrate &middot; Certify &middot; Operate
        </div>
        <h1 class="ed-lfi-hero__title">
          LFI &mdash; Integration Guide
          <span class="ed-lfi-hero__badge">{{ selectedVersion }}</span>
        </h1>
        <p class="ed-lfi-hero__sub">
          The implementation guide for <strong>Licensed Financial Institutions (LFIs)</strong>
          connecting to UAE Open Finance. It covers the APIs your bank exposes, the API Hub
          services your bank consumes, the Trust Framework registrations required to participate,
          and the onboarding and certification path from sandbox through to live production traffic.
        </p>

        <div class="ed-lfi-hero__links">
          <a href="/tech/tpp-standards/" class="ed-lfi-hero__link">
            <span class="ed-lfi-hero__link-label">TPP?</span>
            <span class="ed-lfi-hero__link-text">See the TPP Standards</span>
            <span class="ed-lfi-hero__link-arrow">&rarr;</span>
          </a>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         WHERE THE LFI SITS
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ed-lfi-pillars">
      <div class="ed-lfi-pillars__inner">
        <div class="ed-lfi-pillars__head">
          <div class="ed-lfi-pillars__eyebrow">
            <span class="ed-lfi-pillars__eyebrow-dash" />
            Architecture
          </div>
          <h2 class="ed-lfi-pillars__title">Where the LFI sits</h2>
          <p class="ed-lfi-pillars__lede">
            UAE Open Finance is <strong>strictly mediated</strong>: TPPs never call LFIs directly.
            All TPP traffic is routed through the <strong>API Hub</strong> (operated by Nebras,
            with vendor support from Ozone API), which acts as the OIDC/FAPI authorization server,
            the consent source of truth, and the gateway that proxies every request to the
            relevant LFI. The LFI's role is the <strong>execution layer</strong>.
          </p>
        </div>

        <div class="ed-lfi-pillars__grid">
          <div
            v-for="(pillar, i) in pillars"
            :key="pillar.title"
            class="ed-lfi-pillar"
            :style="{ '--pillar-color': pillar.color }"
          >
            <div class="ed-lfi-pillar__num">0{{ i + 1 }}</div>
            <h3 class="ed-lfi-pillar__title">{{ pillar.title }}</h3>
            <p class="ed-lfi-pillar__desc" v-html="pillar.desc" />
          </div>
        </div>

        <p class="ed-lfi-pillars__footnote">
          Consent state, token issuance, schema enforcement, and TPP-facing routing all live in
          the Hub. The LFI does not maintain independent consent state and does not issue tokens.
        </p>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         START HERE — FEATURED CARD
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ed-lfi-featured">
      <div class="ed-lfi-featured__inner">
        <a href="/tech/lfi-api-hub/getting-started/" class="ed-lfi-featured__card">
          <div class="ed-lfi-featured__meta">
            <span class="ed-lfi-featured__meta-dot" />
            Start here
          </div>

          <h2 class="ed-lfi-featured__title">LFI Integration Journey</h2>

          <p class="ed-lfi-featured__desc">
            If this is your first time on this guide, follow the Integration Journey end-to-end.
            It sequences the work into three phases &mdash; <strong>Pre-production build &amp; integrate</strong>,
            <strong>Certification</strong>, and <strong>Production launch</strong> &mdash; and links
            out to every section below at the right point in the journey.
          </p>

          <div class="ed-lfi-featured__phases">
            <div class="ed-lfi-featured__phase">
              <span class="ed-lfi-featured__phase-num">1</span>
              <span class="ed-lfi-featured__phase-label">Pre-production build &amp; integrate</span>
            </div>
            <div class="ed-lfi-featured__phase-sep">&rarr;</div>
            <div class="ed-lfi-featured__phase">
              <span class="ed-lfi-featured__phase-num">2</span>
              <span class="ed-lfi-featured__phase-label">Certification</span>
            </div>
            <div class="ed-lfi-featured__phase-sep">&rarr;</div>
            <div class="ed-lfi-featured__phase">
              <span class="ed-lfi-featured__phase-num">3</span>
              <span class="ed-lfi-featured__phase-label">Production launch</span>
            </div>
          </div>

          <div class="ed-lfi-featured__foot">
            <span class="ed-lfi-featured__cta">Open the Integration Journey</span>
            <span class="ed-lfi-featured__arrow">&rarr;</span>
          </div>
        </a>

        <a href="/tech/lfi-api-hub/getting-started/bank-rollout-plan" class="ed-lfi-featured__aside">
          <div class="ed-lfi-featured__aside-label">Companion plan</div>
          <h3 class="ed-lfi-featured__aside-title">Recommended Bank Rollout Plan</h3>
          <p class="ed-lfi-featured__aside-desc">
            How to stage delivery capability-by-capability against the regulatory deadline.
          </p>
          <span class="ed-lfi-featured__aside-arrow">&rarr;</span>
        </a>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         SECTIONS GRID
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ed-lfi-sections">
      <div class="ed-lfi-sections__inner">
        <div class="ed-lfi-sections__head">
          <div class="ed-lfi-sections__eyebrow">
            <span class="ed-lfi-sections__eyebrow-dash" />
            Guide sections
          </div>
          <h2 class="ed-lfi-sections__title">Sections</h2>
          <p class="ed-lfi-sections__lede">
            Each section covers one area of the integration. Work through them in the order
            suggested by the Integration Journey, or jump in where you need.
          </p>
        </div>

        <div class="ed-lfi-grid">
          <template v-for="section in sections" :key="section.title">
            <!-- Simple: whole card is one link -->
            <a
              v-if="!section.subItems"
              :href="section.url"
              class="ed-lfi-card"
              :style="{ '--card-color': section.color }"
            >
              <span class="ed-lfi-card__top" :style="{ background: section.color }" />

              <div class="ed-lfi-card__meta">
                <span class="ed-lfi-card__cat" :style="{ color: section.color }">
                  {{ section.category }}
                </span>
              </div>

              <h3 class="ed-lfi-card__title" v-html="section.title" />
              <p class="ed-lfi-card__desc" v-html="section.desc" />

              <div v-if="section.tags && section.tags.length" class="ed-lfi-card__tags">
                <span
                  v-for="tag in section.tags"
                  :key="tag"
                  class="ed-lfi-card__tag"
                  :style="{
                    background: withAlpha(section.color, 0.10),
                    color: section.color,
                  }"
                >{{ tag }}</span>
              </div>

              <div class="ed-lfi-card__foot">
                <span class="ed-lfi-card__cta">Open section</span>
                <span class="ed-lfi-card__arrow" :style="{ color: section.color }">&rarr;</span>
              </div>
            </a>

            <!-- Split: head link + per-sub-item links + foot link -->
            <div
              v-else
              class="ed-lfi-card ed-lfi-card--split"
              :style="{ '--card-color': section.color }"
            >
              <span class="ed-lfi-card__top" :style="{ background: section.color }" />

              <a :href="section.url" class="ed-lfi-card__head">
                <div class="ed-lfi-card__meta">
                  <span class="ed-lfi-card__cat" :style="{ color: section.color }">
                    {{ section.category }}
                  </span>
                </div>

                <h3 class="ed-lfi-card__title" v-html="section.title" />
                <p class="ed-lfi-card__desc" v-html="section.desc" />
              </a>

              <ul class="ed-lfi-card__subs">
                <li v-for="sub in section.subItems" :key="sub.label">
                  <a :href="sub.url" class="ed-lfi-card__sub">
                    <span class="ed-lfi-card__sub-marker" :style="{ background: section.color }" />
                    <span class="ed-lfi-card__sub-body">
                      <span class="ed-lfi-card__sub-label" v-html="sub.label" />
                      <span v-if="sub.hint" class="ed-lfi-card__sub-hint" v-html="sub.hint" />
                    </span>
                    <span class="ed-lfi-card__sub-arrow" :style="{ color: section.color }">&rarr;</span>
                  </a>
                </li>
              </ul>

              <a :href="section.url" class="ed-lfi-card__foot ed-lfi-card__foot--link">
                <span class="ed-lfi-card__cta">Open Finance overview</span>
                <span class="ed-lfi-card__arrow" :style="{ color: section.color }">&rarr;</span>
              </a>
            </div>
          </template>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.ed-lfi {
  background: var(--at-bg-cream);
  color: var(--at-navy-deep);
  font-family: var(--at-sans);
  padding-top: 4.25rem;
}

/* ─── Hero ──────────────────────────────────────────────────────────────── */
.ed-lfi-hero {
  background: var(--at-bg-cream);
  border-bottom: 1px solid var(--at-grid-line);
}

.ed-lfi-hero__inner {
  max-width: var(--at-page-max);
  margin: 0 auto;
  padding: 4.5rem 2rem 3rem;
}

.ed-lfi-hero__label {
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

.ed-lfi-hero__label-dash {
  width: 24px;
  height: 1px;
  background: currentColor;
}

.ed-lfi-hero__title {
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

.ed-lfi-hero__badge {
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

.ed-lfi-hero__sub {
  font-family: var(--at-sans);
  font-size: 1.15rem;
  line-height: 1.6;
  margin: 1.75rem 0 0;
  max-width: 48rem;
  color: var(--at-mute-2);
}

.ed-lfi-hero__sub strong { color: var(--at-navy-deep); font-weight: 600; }

/* ─── Hero links ────────────────────────────────────────────────────────── */
.ed-lfi-hero__links {
  margin-top: 2.25rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  max-width: 48rem;
}

.ed-lfi-hero__link {
  flex: 1 1 18rem;
  display: flex;
  align-items: center;
  gap: 0.9rem;
  padding: 0.9rem 1.1rem;
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line);
  text-decoration: none;
  color: var(--at-navy-deep);
  transition: border-color 0.15s, transform 0.15s;
}

.ed-lfi-hero__link:hover {
  border-color: var(--at-navy-deep);
  transform: translateY(-1px);
}

.ed-lfi-hero__link-label {
  font-family: var(--at-mono);
  font-size: 0.6rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-teal);
  white-space: nowrap;
}

.ed-lfi-hero__link-text {
  flex: 1;
  font-size: 0.92rem;
  font-weight: 500;
  padding-left: 0.92rem;
}

.ed-lfi-hero__link-arrow {
  font-family: var(--at-mono);
  color: var(--at-mute);
  transition: transform 0.15s, color 0.15s;
}

.ed-lfi-hero__link:hover .ed-lfi-hero__link-arrow {
  transform: translateX(3px);
  color: var(--at-navy-deep);
}

/* ─── Pillars (Where the LFI sits) ──────────────────────────────────────── */
.ed-lfi-pillars {
  background: var(--at-surface);
  border-bottom: 1px solid var(--at-grid-line);
  padding: 4.5rem 0 4rem;
}

.ed-lfi-pillars__inner {
  max-width: var(--at-page-max);
  margin: 0 auto;
  padding: 0 2rem;
}

.ed-lfi-pillars__head { max-width: 52rem; }

.ed-lfi-pillars__eyebrow {
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--at-blue-deep);
  margin-bottom: 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 600;
}

.ed-lfi-pillars__eyebrow-dash {
  width: 24px;
  height: 1px;
  background: currentColor;
}

.ed-lfi-pillars__title {
  font-family: var(--at-serif);
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 500;
  letter-spacing: -0.025em;
  line-height: 1.05;
  margin: 0;
  color: var(--at-navy-deep);
}

.ed-lfi-pillars__lede {
  font-family: var(--at-sans);
  font-size: 1.02rem;
  line-height: 1.65;
  color: var(--at-mute-2);
  margin: 1.25rem 0 0;
}

.ed-lfi-pillars__lede strong { color: var(--at-navy-deep); font-weight: 600; }

.ed-lfi-pillars__grid {
  margin-top: 2.75rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  border: 1px solid var(--at-grid-line);
  background: var(--at-surface);
}

.ed-lfi-pillar {
  position: relative;
  padding: 2rem 1.75rem 1.75rem;
  border-right: 1px solid var(--at-grid-line);
}

.ed-lfi-pillar:last-child { border-right: none; }

.ed-lfi-pillar::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 56px;
  height: 3px;
  background: var(--pillar-color, var(--at-navy));
}

.ed-lfi-pillar__num {
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.14em;
  font-weight: 700;
  color: var(--pillar-color, var(--at-navy));
  margin-bottom: 1rem;
}

.ed-lfi-pillar__title {
  font-family: var(--at-serif);
  font-size: 1.3rem;
  font-weight: 500;
  letter-spacing: -0.02em;
  line-height: 1.2;
  margin: 0 0 0.65rem;
  color: var(--at-navy-deep);
}

.ed-lfi-pillar__desc {
  font-family: var(--at-sans);
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--at-mute-2);
  margin: 0;
}

.ed-lfi-pillars__footnote {
  margin: 2rem 0 0;
  font-family: var(--at-sans);
  font-size: 0.88rem;
  line-height: 1.6;
  color: var(--at-mute);
  max-width: 52rem;
  padding-left: 1rem;
  border-left: 2px solid var(--at-grid-line-2);
}

/* ─── Featured (Start here) ─────────────────────────────────────────────── */
.ed-lfi-featured {
  padding: 4.5rem 0;
  background: var(--at-bg-cream);
}

.ed-lfi-featured__inner {
  max-width: var(--at-page-max);
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.25rem;
}

.ed-lfi-featured__card {
  position: relative;
  display: flex;
  flex-direction: column;
  background: var(--at-inverse-bg);
  color: var(--at-inverse-fg);
  padding: 2.5rem 2.25rem 2rem;
  text-decoration: none;
  overflow: hidden;
  transition: transform 0.2s ease;
}

.ed-lfi-featured__card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--at-teal);
}

.ed-lfi-featured__card:hover { transform: translateY(-2px); }

.ed-lfi-featured__meta {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--at-teal);
  margin-bottom: 1.25rem;
}

.ed-lfi-featured__meta-dot {
  width: 8px;
  height: 8px;
  background: var(--at-teal);
  border-radius: 50%;
  box-shadow: 0 0 0 4px rgba(0, 194, 169, 0.18);
}

.ed-lfi-featured__title {
  font-family: var(--at-serif);
  font-size: clamp(1.85rem, 3.5vw, 2.5rem);
  font-weight: 500;
  letter-spacing: -0.025em;
  line-height: 1.05;
  margin: 0 0 1rem;
  color: var(--at-inverse-fg);
}

.ed-lfi-featured__desc {
  font-family: var(--at-sans);
  font-size: 1.02rem;
  line-height: 1.6;
  color: rgba(250, 250, 247, 0.82);
  margin: 0 0 1.75rem;
  max-width: 42rem;
}

.ed-lfi-featured__desc strong { color: var(--at-inverse-fg); font-weight: 600; }

.ed-lfi-featured__phases {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.ed-lfi-featured__phase {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.55rem 0.95rem;
  background: rgba(250, 250, 247, 0.06);
  border: 1px solid rgba(250, 250, 247, 0.14);
}

.ed-lfi-featured__phase-num {
  font-family: var(--at-mono);
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--at-teal);
}

.ed-lfi-featured__phase-label {
  font-family: var(--at-mono);
  font-size: 0.68rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-weight: 500;
  color: var(--at-inverse-fg);
}

.ed-lfi-featured__phase-sep {
  font-family: var(--at-mono);
  color: rgba(250, 250, 247, 0.4);
}

.ed-lfi-featured__foot {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding-top: 1.25rem;
  border-top: 1px solid rgba(250, 250, 247, 0.12);
}

.ed-lfi-featured__cta {
  font-family: var(--at-mono);
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--at-teal);
}

.ed-lfi-featured__arrow {
  font-family: var(--at-mono);
  color: var(--at-teal);
  transition: transform 0.2s;
}

.ed-lfi-featured__card:hover .ed-lfi-featured__arrow { transform: translateX(4px); }

/* Aside card */
.ed-lfi-featured__aside {
  position: relative;
  display: flex;
  flex-direction: column;
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line);
  padding: 2rem 1.75rem 1.5rem;
  text-decoration: none;
  color: inherit;
  transition: border-color 0.2s, transform 0.2s;
}

.ed-lfi-featured__aside:hover {
  border-color: var(--at-gold);
  transform: translateY(-2px);
}

.ed-lfi-featured__aside::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 48px;
  height: 3px;
  background: var(--at-gold);
}

.ed-lfi-featured__aside-label {
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--at-gold);
  margin-bottom: 1rem;
}

.ed-lfi-featured__aside-title {
  font-family: var(--at-serif);
  font-size: 1.4rem;
  font-weight: 500;
  letter-spacing: -0.02em;
  line-height: 1.2;
  margin: 0 0 0.75rem;
  color: var(--at-navy-deep);
}

.ed-lfi-featured__aside-desc {
  font-family: var(--at-sans);
  font-size: 0.92rem;
  line-height: 1.55;
  color: var(--at-mute-2);
  margin: 0 0 1.25rem;
  flex: 1;
}

.ed-lfi-featured__aside-arrow {
  font-family: var(--at-mono);
  font-size: 1rem;
  color: var(--at-gold);
  align-self: flex-end;
  transition: transform 0.2s;
}

.ed-lfi-featured__aside:hover .ed-lfi-featured__aside-arrow { transform: translateX(4px); }

/* ─── Sections ──────────────────────────────────────────────────────────── */
.ed-lfi-sections {
  padding: 4rem 0 5rem;
  background: var(--at-surface);
  border-top: 1px solid var(--at-grid-line);
}

.ed-lfi-sections__inner {
  max-width: var(--at-page-max);
  margin: 0 auto;
  padding: 0 2rem;
}

.ed-lfi-sections__head { max-width: 44rem; margin-bottom: 2.5rem; }

.ed-lfi-sections__eyebrow {
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

.ed-lfi-sections__eyebrow-dash {
  width: 24px;
  height: 1px;
  background: currentColor;
}

.ed-lfi-sections__title {
  font-family: var(--at-serif);
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 500;
  letter-spacing: -0.025em;
  line-height: 1.05;
  margin: 0;
  color: var(--at-navy-deep);
}

.ed-lfi-sections__lede {
  font-family: var(--at-sans);
  font-size: 1rem;
  line-height: 1.6;
  color: var(--at-mute-2);
  margin: 1.1rem 0 0;
}

.ed-lfi-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(22.5rem, 1fr));
  gap: 1.25rem;
}

/* ─── Card ──────────────────────────────────────────────────────────────── */
.ed-lfi-card {
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

.ed-lfi-card:hover {
  border-color: var(--card-color, var(--at-navy));
  transform: translateY(-2px);
}

.ed-lfi-card__top {
  position: absolute;
  top: 0;
  left: 0;
  width: 48px;
  height: 3px;
}

.ed-lfi-card__meta {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  margin-bottom: 0.85rem;
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.ed-lfi-card__cat { font-weight: 700; }

.ed-lfi-card__title {
  font-family: var(--at-serif);
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: var(--at-navy-deep);
  margin: 0 0 0.85rem;
}

.ed-lfi-card__desc {
  font-family: var(--at-sans);
  font-size: 0.92rem;
  line-height: 1.6;
  color: var(--at-mute-2);
  margin: 0 0 1.25rem;
  flex: 1;
}

.ed-lfi-card__desc :deep(code) {
  font-family: var(--at-mono);
  font-size: 0.82em;
  background: rgba(0, 39, 127, 0.06);
  padding: 0.08em 0.35em;
  color: var(--at-navy-deep);
}

.ed-lfi-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 1rem;
}

.ed-lfi-card__tag {
  padding: 0.28rem 0.6rem;
  font-family: var(--at-mono);
  font-size: 0.58rem;
  letter-spacing: 0.08em;
  font-weight: 600;
  text-transform: uppercase;
}

.ed-lfi-card__foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1rem;
  border-top: 1px solid var(--at-grid-line);
}

.ed-lfi-card__cta {
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--at-mute);
}

.ed-lfi-card__arrow {
  font-family: var(--at-mono);
  font-size: 1rem;
  transition: transform 0.2s;
}

.ed-lfi-card:hover .ed-lfi-card__arrow { transform: translateX(4px); }
.ed-lfi-card:hover .ed-lfi-card__cta { color: var(--at-navy-deep); }

/* ─── Split card (Ozone Connect — Banking) ──────────────────────────────── */
.ed-lfi-card--split { padding: 0; }

.ed-lfi-card--split:hover { transform: none; }

.ed-lfi-card__head {
  display: block;
  padding: 2rem 1.75rem 1.25rem;
  text-decoration: none;
  color: inherit;
  transition: background 0.15s;
}

.ed-lfi-card__head:hover { background: rgba(0, 39, 127, 0.02); }
.ed-lfi-card__head:hover .ed-lfi-card__title { color: var(--card-color, var(--at-navy)); }
.ed-lfi-card--split .ed-lfi-card__title { transition: color 0.15s; }

.ed-lfi-card__subs {
  list-style: none;
  margin: 0;
  padding: 0;
  border-top: 1px solid var(--at-grid-line);
  flex: 1;
}

.ed-lfi-card__sub {
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

.ed-lfi-card__sub:hover {
  background: var(--at-bg-paper);
  padding-left: 1.9rem;
}

.ed-lfi-card__sub-marker {
  width: 6px;
  height: 6px;
  align-self: center;
  transition: transform 0.15s;
}

.ed-lfi-card__sub:hover .ed-lfi-card__sub-marker { transform: scale(1.4); }

.ed-lfi-card__sub-body {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  min-width: 0;
}

.ed-lfi-card__sub-label {
  font-family: var(--at-sans);
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--at-navy-deep);
  line-height: 1.3;
}

.ed-lfi-card__sub-hint {
  font-family: var(--at-sans);
  font-size: 0.78rem;
  line-height: 1.45;
  color: var(--at-mute);
}

.ed-lfi-card__sub-arrow {
  font-family: var(--at-mono);
  font-size: 0.95rem;
  opacity: 0.5;
  transition: opacity 0.15s, transform 0.15s;
}

.ed-lfi-card__sub:hover .ed-lfi-card__sub-arrow {
  opacity: 1;
  transform: translateX(3px);
}

.ed-lfi-card__foot--link {
  padding: 1rem 1.75rem;
  text-decoration: none;
  color: inherit;
  border-top: 1px solid var(--at-grid-line);
  transition: background 0.15s;
}

.ed-lfi-card__foot--link:hover { background: var(--at-bg-paper); }
.ed-lfi-card__foot--link:hover .ed-lfi-card__cta { color: var(--at-navy-deep); }
.ed-lfi-card__foot--link:hover .ed-lfi-card__arrow { transform: translateX(4px); }

/* ─── Responsive ────────────────────────────────────────────────────────── */
@media (max-width: 900px) {
  .ed-lfi-pillars__grid { grid-template-columns: 1fr; }
  .ed-lfi-pillar { border-right: none; border-bottom: 1px solid var(--at-grid-line); }
  .ed-lfi-pillar:last-child { border-bottom: none; }
  .ed-lfi-featured__inner { grid-template-columns: 1fr; }
}

@media (max-width: 640px) {
  .ed-lfi-hero__inner { padding: 3rem 1.25rem 2rem; }
  .ed-lfi-pillars { padding: 3rem 0 2.5rem; }
  .ed-lfi-pillars__inner { padding: 0 1.25rem; }
  .ed-lfi-featured { padding: 3rem 0; }
  .ed-lfi-featured__inner { padding: 0 1.25rem; }
  .ed-lfi-featured__card { padding: 2rem 1.5rem 1.5rem; }
  .ed-lfi-sections { padding: 3rem 0 4rem; }
  .ed-lfi-sections__inner { padding: 0 1.25rem; }
  .ed-lfi-grid { grid-template-columns: 1fr; }
}
</style>
