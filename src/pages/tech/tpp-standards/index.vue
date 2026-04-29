<route lang="yaml">
meta:
  title: TPP Standards
  isIndex: true
</route>

<script setup lang="ts">
// Phase 6 — TPP Standards landing page. Ported from
// `docs/components/WebPages/TppStandardsPage.vue`.
//
// Chrome (PageHeader/PageFooter) is owned by the default layout, so this
// template starts directly with the page wrapper. EdHoverSidebar is
// auto-registered by `unplugin-vue-components`. `useSelectedVersion` is
// auto-imported from `src/composables/`.

const { selectedVersion } = useSelectedVersion()

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

const sections = computed<SectionConfig[]>(() => [
  {
    category: 'Start here',
    color: 'var(--at-teal)',
    title: 'Getting Started',
    url: `/tech/tpp-standards/${selectedVersion.value}/getting-started/`,
    desc: 'Enter your sandbox client details and generate a ready-to-use Postman collection so you can call the APIs end-to-end in minutes. Includes the Sandbox Quickstart, the Postman Guide, and the Sandbox Model Bank reference data.',
    tags: ['Sandbox', 'Postman', 'Model Bank'],
  },
  {
    category: 'Directory',
    color: 'var(--at-gold)',
    title: 'Trust Framework',
    url: '/tech/tpp-standards/trust-framework/',
    desc: 'The participant directory that underpins the ecosystem. Register your organisation, nominate Organisation Admins, create applications, upload transport/signing/encryption keys, and discover authorisation servers, roles, and API resources for every LFI you intend to call.',
    tags: ['Organisations', 'Applications', 'Keys', 'LFI Discovery'],
  },
  {
    category: 'Onboarding',
    color: 'var(--at-blue)',
    title: 'Registration',
    url: '/tech/tpp-standards/registration/api-guide',
    desc: 'How your TPP registers a client dynamically with each LFI\'s authorisation server via <code>/tpp-registration</code>. Covers the request contract, the software statement, and the registration response you use to call downstream APIs.',
    tags: ['/tpp-registration', 'Software statement'],
  },
  {
    category: 'Security',
    color: 'var(--at-blue-deep)',
    title: 'Security, Auth &amp; Headers',
    url: '/tech/tpp-standards/security/fapi',
    desc: 'The FAPI security profile TPPs must implement &mdash; request-object JWTs, message signing and encryption, receiving event notifications, and handling authorization callbacks &mdash; plus token exchange, client assertions, and the standard request headers every call must carry.',
    tags: ['FAPI', 'mTLS', 'JWT', 'Client assertion'],
  },
  {
    category: 'Consent',
    color: 'var(--at-navy)',
    title: 'Consent',
    url: `/tech/tpp-standards/${selectedVersion.value}/consent/`,
    desc: 'Create, manage, and revoke customer consents through the API Hub. Covers PAR, account-access and payment consents, the Consent Management Interface your customers see, and the patch flow for consent state transitions.',
    tags: ['PAR', 'Account access', 'Payment consents', 'CMI'],
  },
  {
    category: 'Core APIs',
    color: 'var(--at-navy-deep)',
    title: 'Banking',
    url: `/tech/tpp-standards/${selectedVersion.value}/banking/`,
    desc: 'The banking APIs the API Hub exposes to TPPs on behalf of authorised customers.',
    subItems: [
      {
        label: 'Data Sharing',
        hint: 'accounts, balances, transactions, beneficiaries, statements, parties',
        url: `/tech/tpp-standards/${selectedVersion.value}/banking/data-sharing/`,
      },
      {
        label: 'Payments (Service Initiation)',
        hint: 'single instant &amp; multi-payments, refunds, PII, multi-authorization',
        url: `/tech/tpp-standards/${selectedVersion.value}/banking/service-initiation/`,
      },
      {
        label: 'Confirmation of Payee',
        hint: 'pre-payment payee verification',
        url: `/tech/tpp-standards/${selectedVersion.value}/banking/confirmation-of-payee/`,
      },
      {
        label: 'Products and Leads',
        hint: 'open product catalogue, lead capture',
        url: `/tech/tpp-standards/${selectedVersion.value}/banking/products-leads/`,
      },
      {
        label: 'ATMs',
        hint: 'ATM location data',
        url: `/tech/tpp-standards/${selectedVersion.value}/banking/atms/`,
      },
    ],
  },
  {
    category: 'Events',
    color: 'var(--at-teal-deep)',
    title: 'Event Notifications &amp; Webhooks',
    url: `/tech/tpp-standards/${selectedVersion.value}/webhooks/`,
    desc: 'Receive real-time notifications from the API Hub when consent or payment state changes. Covers the webhook payload contracts, delivery guarantees, and the validation your endpoint must perform.',
    tags: ['Consent status', 'Payment status'],
  },
  {
    category: 'Launch',
    color: 'var(--at-gold)',
    title: 'Testing &amp; Certification',
    url: '/tech/tpp-standards/production/testing-certification/overview',
    desc: 'The required certifications before going live &mdash; Trust Framework checklist, functional evidence, user experience evidence, FAPI conformance, and security validation &mdash; followed by the production live-proving step.',
    tags: ['Functional', 'UX', 'FAPI', 'Security', 'Live proving'],
  },
])

function withAlpha(cssVar: string, alpha: number): string {
  return `color-mix(in srgb, ${cssVar} ${Math.round(alpha * 100)}%, transparent)`
}
</script>

<template>
  <div class="ed-tpp">

    <!-- ═══════════════════════════════════════════════════════════════════
         HERO
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ed-tpp-hero">
      <div class="ed-tpp-hero__inner">
        <div class="ed-tpp-hero__label">
          <span class="ed-tpp-hero__label-dash" />
          Build &middot; Integrate &middot; Certify
        </div>
        <h1 class="ed-tpp-hero__title">
          TPP Standards
          <span class="ed-tpp-hero__badge">{{ selectedVersion }}</span>
        </h1>
        <p class="ed-tpp-hero__sub">
          The Open Finance Standards in the United Arab Emirates form the technical and operational
          foundation for secure, interoperable, and customer-consented data sharing across the
          financial ecosystem. Led by the <strong>Central Bank of the UAE (CBUAE)</strong>, the
          framework extends beyond traditional open banking to enable broader financial data access,
          payment initiation, and value-added services &mdash; all built on strong security,
          governance, and consumer protection principles.
        </p>
        <p class="ed-tpp-hero__sub ed-tpp-hero__sub--tight">
          This documentation is for <strong>Third-Party Providers (TPPs)</strong> consuming Open
          Finance capabilities &mdash; including account information services, payment initiation,
          and other regulated financial data use cases.
        </p>

        <div class="ed-tpp-hero__links">
          <a href="/tech/lfi-api-hub/" class="ed-tpp-hero__link">
            <span class="ed-tpp-hero__link-label">LFI?</span>
            <span class="ed-tpp-hero__link-text">See the LFI Integration Guide</span>
            <span class="ed-tpp-hero__link-arrow">&rarr;</span>
          </a>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         SECTIONS GRID
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ed-tpp-sections">
      <div class="ed-tpp-sections__inner">
        <div class="ed-tpp-sections__head">
          <div class="ed-tpp-sections__eyebrow">
            <span class="ed-tpp-sections__eyebrow-dash" />
            Guide sections
          </div>
          <h2 class="ed-tpp-sections__title">Sections</h2>
          <p class="ed-tpp-sections__lede">
            Work through each area of the TPP integration. Start with
            <a :href="`/tech/tpp-standards/${selectedVersion}/getting-started/`" class="ed-tpp-sections__lede-link">
              Getting Started
            </a>
            to register your sandbox client and generate a ready-to-use Postman collection,
            then progress through Trust Framework registration, security profile, consent,
            and the banking APIs.
          </p>
        </div>

        <div class="ed-tpp-grid">
          <template v-for="section in sections" :key="section.title">
            <!-- Simple: whole card is one link -->
            <a
              v-if="!section.subItems"
              :href="section.url"
              class="ed-tpp-card"
              :style="{ '--card-color': section.color }"
            >
              <span class="ed-tpp-card__top" :style="{ background: section.color }" />

              <div class="ed-tpp-card__meta">
                <span class="ed-tpp-card__cat" :style="{ color: section.color }">
                  {{ section.category }}
                </span>
              </div>

              <h3 class="ed-tpp-card__title" v-html="section.title" />
              <p class="ed-tpp-card__desc" v-html="section.desc" />

              <div v-if="section.tags && section.tags.length" class="ed-tpp-card__tags">
                <span
                  v-for="tag in section.tags"
                  :key="tag"
                  class="ed-tpp-card__tag"
                  :style="{
                    background: withAlpha(section.color, 0.10),
                    color: section.color,
                  }"
                >{{ tag }}</span>
              </div>

              <div class="ed-tpp-card__foot">
                <span class="ed-tpp-card__cta">Open section</span>
                <span class="ed-tpp-card__arrow" :style="{ color: section.color }">&rarr;</span>
              </div>
            </a>

            <!-- Split: title/desc link + per-sub-item links -->
            <div
              v-else
              class="ed-tpp-card ed-tpp-card--split"
              :style="{ '--card-color': section.color }"
            >
              <span class="ed-tpp-card__top" :style="{ background: section.color }" />

              <a :href="section.url" class="ed-tpp-card__head">
                <div class="ed-tpp-card__meta">
                  <span class="ed-tpp-card__cat" :style="{ color: section.color }">
                    {{ section.category }}
                  </span>
                </div>

                <h3 class="ed-tpp-card__title" v-html="section.title" />
                <p class="ed-tpp-card__desc" v-html="section.desc" />
              </a>

              <ul class="ed-tpp-card__subs">
                <li v-for="sub in section.subItems" :key="sub.label">
                  <a :href="sub.url" class="ed-tpp-card__sub">
                    <span class="ed-tpp-card__sub-marker" :style="{ background: section.color }" />
                    <span class="ed-tpp-card__sub-body">
                      <span class="ed-tpp-card__sub-label" v-html="sub.label" />
                      <span v-if="sub.hint" class="ed-tpp-card__sub-hint" v-html="sub.hint" />
                    </span>
                    <span class="ed-tpp-card__sub-arrow" :style="{ color: section.color }">&rarr;</span>
                  </a>
                </li>
              </ul>

              <a :href="section.url" class="ed-tpp-card__foot ed-tpp-card__foot--link">
                <span class="ed-tpp-card__cta">Open Banking overview</span>
                <span class="ed-tpp-card__arrow" :style="{ color: section.color }">&rarr;</span>
              </a>
            </div>
          </template>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.ed-tpp {
  background: var(--at-bg-cream);
  color: var(--at-navy-deep);
  font-family: var(--at-sans);
  padding-top: 4.25rem;
}

/* ─── Hero ──────────────────────────────────────────────────────────────── */
.ed-tpp-hero {
  background: var(--at-bg-cream);
  border-bottom: 1px solid var(--at-grid-line);
}

.ed-tpp-hero__inner {
  max-width: var(--at-page-max);
  margin: 0 auto;
  padding: 4.5rem 2rem 3.5rem;
}

.ed-tpp-hero__label {
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

.ed-tpp-hero__label-dash {
  width: 24px;
  height: 1px;
  background: currentColor;
}

.ed-tpp-hero__title {
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

.ed-tpp-hero__badge {
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

.ed-tpp-hero__sub {
  font-family: var(--at-sans);
  font-size: 1.12rem;
  line-height: 1.6;
  margin: 1.75rem 0 0;
  max-width: 48rem;
  color: var(--at-mute-2);
}

.ed-tpp-hero__sub--tight { margin-top: 1rem; }

.ed-tpp-hero__sub strong { color: var(--at-navy-deep); font-weight: 600; }

.ed-tpp-hero__links {
  margin-top: 2.25rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  max-width: 48rem;
}

.ed-tpp-hero__link {
  flex: 1 1 20rem;
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

.ed-tpp-hero__link:hover {
  border-color: var(--at-navy-deep);
  transform: translateY(-1px);
}

.ed-tpp-hero__link-label {
  font-family: var(--at-mono);
  font-size: 0.6rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-teal);
  white-space: nowrap;
}

.ed-tpp-hero__link-text {
  flex: 1;
  font-size: 0.92rem;
  font-weight: 500;
}

.ed-tpp-hero__link-arrow {
  font-family: var(--at-mono);
  color: var(--at-mute);
  transition: transform 0.15s, color 0.15s;
}

.ed-tpp-hero__link:hover .ed-tpp-hero__link-arrow {
  transform: translateX(3px);
  color: var(--at-navy-deep);
}

/* ─── Sections ──────────────────────────────────────────────────────────── */
.ed-tpp-sections {
  padding: 4rem 0 5rem;
  background: var(--at-surface);
  border-top: 1px solid var(--at-grid-line);
}

.ed-tpp-sections__inner {
  max-width: var(--at-page-max);
  margin: 0 auto;
  padding: 0 2rem;
}

.ed-tpp-sections__head { max-width: 52rem; margin-bottom: 2.5rem; }

.ed-tpp-sections__eyebrow {
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

.ed-tpp-sections__eyebrow-dash {
  width: 24px;
  height: 1px;
  background: currentColor;
}

.ed-tpp-sections__title {
  font-family: var(--at-serif);
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 500;
  letter-spacing: -0.025em;
  line-height: 1.05;
  margin: 0;
  color: var(--at-navy-deep);
}

.ed-tpp-sections__lede {
  font-family: var(--at-sans);
  font-size: 1rem;
  line-height: 1.65;
  color: var(--at-mute-2);
  margin: 1.1rem 0 0;
}

.ed-tpp-sections__lede-link {
  color: var(--at-teal);
  text-decoration: none;
  font-weight: 600;
  border-bottom: 1px solid currentColor;
}

.ed-tpp-sections__lede-link:hover { color: var(--at-teal-deep); }

.ed-tpp-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(22.5rem, 1fr));
  gap: 1.25rem;
}

/* ─── Card ──────────────────────────────────────────────────────────────── */
.ed-tpp-card {
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

.ed-tpp-card:hover {
  border-color: var(--card-color, var(--at-navy));
  transform: translateY(-2px);
}

.ed-tpp-card__top {
  position: absolute;
  top: 0;
  left: 0;
  width: 48px;
  height: 3px;
}

.ed-tpp-card__meta {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  margin-bottom: 0.85rem;
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.ed-tpp-card__cat { font-weight: 700; }

.ed-tpp-card__title {
  font-family: var(--at-serif);
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: var(--at-navy-deep);
  margin: 0 0 0.85rem;
}

.ed-tpp-card__desc {
  font-family: var(--at-sans);
  font-size: 0.92rem;
  line-height: 1.6;
  color: var(--at-mute-2);
  margin: 0 0 1.1rem;
}

.ed-tpp-card__desc :deep(code) {
  font-family: var(--at-mono);
  font-size: 0.82em;
  background: rgba(0, 39, 127, 0.06);
  padding: 0.08em 0.35em;
  color: var(--at-navy-deep);
}

/* ─── Split card (Banking) ──────────────────────────────────────────────── */
.ed-tpp-card--split { padding: 0; }

.ed-tpp-card--split:hover { transform: none; }

.ed-tpp-card__head {
  display: block;
  padding: 2rem 1.75rem 1.25rem;
  text-decoration: none;
  color: inherit;
  transition: background 0.15s;
}

.ed-tpp-card__head:hover { background: rgba(0, 39, 127, 0.02); }

.ed-tpp-card__head:hover .ed-tpp-card__title { color: var(--card-color, var(--at-navy)); }

.ed-tpp-card--split .ed-tpp-card__title { transition: color 0.15s; }

/* ─── Sub-items (clickable) ─────────────────────────────────────────────── */
.ed-tpp-card__subs {
  list-style: none;
  margin: 0;
  padding: 0;
  border-top: 1px solid var(--at-grid-line);
  flex: 1;
}

.ed-tpp-card__sub {
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

.ed-tpp-card__sub:hover {
  background: var(--at-bg-paper);
  padding-left: 1.9rem;
}

.ed-tpp-card__sub-marker {
  width: 6px;
  height: 6px;
  align-self: center;
  transition: transform 0.15s;
}

.ed-tpp-card__sub:hover .ed-tpp-card__sub-marker { transform: scale(1.4); }

.ed-tpp-card__sub-body {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  min-width: 0;
}

.ed-tpp-card__sub-label {
  font-family: var(--at-sans);
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--at-navy-deep);
  line-height: 1.3;
}

.ed-tpp-card__sub-hint {
  font-family: var(--at-sans);
  font-size: 0.78rem;
  line-height: 1.45;
  color: var(--at-mute);
}

.ed-tpp-card__sub-arrow {
  font-family: var(--at-mono);
  font-size: 0.95rem;
  opacity: 0.5;
  transition: opacity 0.15s, transform 0.15s;
}

.ed-tpp-card__sub:hover .ed-tpp-card__sub-arrow {
  opacity: 1;
  transform: translateX(3px);
}

/* ─── Tags ──────────────────────────────────────────────────────────────── */
.ed-tpp-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 1rem;
}

.ed-tpp-card__tag {
  padding: 0.28rem 0.6rem;
  font-family: var(--at-mono);
  font-size: 0.58rem;
  letter-spacing: 0.08em;
  font-weight: 600;
  text-transform: uppercase;
}

/* Simple cards: push desc to fill so the foot hugs the bottom */
.ed-tpp-card:not(.ed-tpp-card--split) .ed-tpp-card__desc { flex: 1; }

.ed-tpp-card__foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1rem;
  border-top: 1px solid var(--at-grid-line);
}

.ed-tpp-card__foot--link {
  padding: 1rem 1.75rem;
  text-decoration: none;
  color: inherit;
  border-top: 1px solid var(--at-grid-line);
  transition: background 0.15s;
}

.ed-tpp-card__foot--link:hover { background: var(--at-bg-paper); }

.ed-tpp-card__foot--link:hover .ed-tpp-card__cta { color: var(--at-navy-deep); }

.ed-tpp-card__foot--link:hover .ed-tpp-card__arrow { transform: translateX(4px); }

.ed-tpp-card__cta {
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--at-mute);
}

.ed-tpp-card__arrow {
  font-family: var(--at-mono);
  font-size: 1rem;
  transition: transform 0.2s;
}

.ed-tpp-card:hover .ed-tpp-card__arrow { transform: translateX(4px); }
.ed-tpp-card:hover .ed-tpp-card__cta { color: var(--at-navy-deep); }

/* ─── Responsive ────────────────────────────────────────────────────────── */
@media (max-width: 640px) {
  .ed-tpp-hero__inner { padding: 3rem 1.25rem 2.5rem; }
  .ed-tpp-sections { padding: 3rem 0 4rem; }
  .ed-tpp-sections__inner { padding: 0 1.25rem; }
  .ed-tpp-grid { grid-template-columns: 1fr; }
}
</style>
