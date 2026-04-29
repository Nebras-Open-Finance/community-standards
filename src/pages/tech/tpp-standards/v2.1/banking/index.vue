<route lang="yaml">
meta:
  title: Banking
  isIndex: true
</route>

<script setup lang="ts">
// Aggregated across all five banking families — an LFI counts if it offers
// any of these in the directory.
const { liveLfis, totalCount: totalLfiCount, loadError } = useLiveLfis(
  ['account-information', 'payment', 'confirmation', 'product', 'atm'],
  6,
)

function initials(name: string): string {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]?.toUpperCase() ?? '').join('')
}

interface Capability {
  href: string
  cat: string
  color: string
  title: string
  body: string
  highlights: string[]
}

const capabilities: Capability[] = [
  {
    href: '/tech/tpp-standards/v2.1/banking/data-sharing/',
    cat: 'Bank Data Sharing',
    color: 'var(--at-teal)',
    title: 'Bank Data Sharing',
    body: 'Consented access to account, balance, transaction, beneficiary, direct debit, standing order, scheduled payment, and party information. Permissions such as <code>ReadAccountsBasic</code>, <code>ReadBalances</code>, and <code>ReadTransactionsDetail</code> control which fields are returned, with data filtered by consent expiry and date ranges.',
    highlights: ['Account & balance information', 'Transaction & statement history', 'Standing orders, direct debits, beneficiaries', 'Party & product information'],
  },
  {
    href: '/tech/tpp-standards/v2.1/banking/service-initiation/',
    cat: 'Service Initiation',
    color: 'var(--at-gold, #b08800)',
    title: 'Service Initiation (Payments)',
    body: "Initiate domestic and international payments on behalf of users after obtaining explicit consent. Single one-shot payments and multi-payment consents — fixed or variable, on-demand, periodic schedule, or defined schedule — cover everything from checkout to subscription billing and instalment plans.",
    highlights: ['Single Instant Payments', 'Multi-payment consents (6 variants)', 'Delegated SCA', 'Refunds & multi-authorisation'],
  },
  {
    href: '/tech/tpp-standards/v2.1/banking/confirmation-of-payee/',
    cat: 'Confirmation of Payee',
    color: 'var(--at-blue-deep, #1d4ed8)',
    title: 'Confirmation of Payee (CoP)',
    body: 'Verify that a payee’s name matches the account holder before executing a payment, reducing misdirected payment risk. A two-step flow — discovery (resolve the LFI from the IBAN) followed by a confirmation request — returns Yes / Partial / No match indicators.',
    highlights: ['Discovery by IBAN', 'Name match check', 'Yes / Partial / No outcomes', 'Reduces APP fraud risk'],
  },
  {
    href: '/tech/tpp-standards/v2.1/banking/products-leads/',
    cat: 'Products & Leads',
    color: 'var(--at-navy)',
    title: 'Products & Leads',
    body: 'Browse current product catalogues across LFIs (savings, current accounts, credit cards, finance, mortgages) and create leads for product origination. Filter by Sharia compliance, product category, last updated date, with retail and business banking products both supported.',
    highlights: ['Public product catalogues', 'Sharia compliance filter', 'Lead creation for origination', 'Retail & business products'],
  },
  {
    href: '/tech/tpp-standards/v2.1/banking/atms/',
    cat: 'ATMs',
    color: 'var(--at-teal-deep)',
    title: 'ATMs',
    body: 'Retrieve ATM location and service data published by LFIs. A read-only, public-data API — no user consent or redirect required. Each ATM record includes location, supported services, accessibility features, fees, and withdrawal limits.',
    highlights: ['Locations & GPS coordinates', 'Supported services & currencies', 'Accessibility features', 'Fees & withdrawal limits'],
  },
]
</script>

<template>
  <div class="ed-landing">
    <section class="ed-landing__hero">
      <div class="ed-landing__inner">
        <div class="ed-landing__eyebrow">
          <span class="ed-landing__eyebrow-dash" />
          TPP Standards &middot; v2.1 &middot; Banking
        </div>
        <h1 class="ed-landing__title">
          Banking
          <span class="ed-landing__read">2 min read</span>
        </h1>
        <p class="ed-landing__lede">
          The Open Finance Banking capabilities enable secure and efficient financial data sharing, payment
          initiation, and verification, empowering third-party providers (TPPs) with the necessary tools to
          enhance user experience and financial services.
        </p>
        <p class="ed-landing__lede ed-landing__lede--tight">
          All services are provided with strict consent management and detailed data access permissions.
        </p>
      </div>
    </section>

    <section class="ed-landing__live">
      <div class="ed-landing__inner">
        <div class="ed-landing__live-head">
          <div class="ed-landing__live-eyebrow">
            <span class="ed-landing__eyebrow-dash" />
            Live ecosystem
          </div>
          <h2 class="ed-landing__live-title">Which LFIs are live on Open Finance Banking</h2>
          <p class="ed-landing__live-sub">
            LFIs currently serving Banking requests &mdash; across data sharing, payments, CoP, products, and
            ATMs &mdash; on UAE Open Finance.
          </p>
        </div>

        <ClientOnly>
          <div v-if="liveLfis.length" class="ed-landing__live-grid">
            <a
              v-for="lfi in liveLfis"
              :key="lfi.key"
              class="ed-landing__tpp"
              :title="lfi.legalName"
              href="/program/whats-live"
            >
              <div class="ed-landing__tpp-logo">
                <img v-if="lfi.logoUri" :src="lfi.logoUri" :alt="lfi.legalName" />
                <span v-else class="ed-landing__tpp-initials">{{ initials(lfi.name) }}</span>
              </div>
              <div class="ed-landing__tpp-name">{{ lfi.name }}</div>
            </a>
            <a
              v-if="totalLfiCount > liveLfis.length"
              class="ed-landing__tpp ed-landing__tpp--more"
              href="/program/whats-live"
              :title="`See all ${totalLfiCount} LFIs`"
            >
              <span class="ed-landing__tpp-more-dots">&hellip;</span>
              <span class="ed-landing__tpp-more-label">+{{ totalLfiCount - liveLfis.length }} more</span>
            </a>
          </div>
          <p v-else-if="loadError" class="ed-landing__live-empty">Live data is currently unavailable.</p>
          <p v-else class="ed-landing__live-empty">No LFIs are currently live for Banking capabilities.</p>

          <a
            v-if="totalLfiCount > 0"
            class="ed-landing__live-cta"
            href="/program/whats-live"
          >
            <span v-if="totalLfiCount > liveLfis.length">
              See all {{ totalLfiCount }} LFIs in the live ecosystem
            </span>
            <span v-else>View in the live ecosystem dashboard</span>
            <span class="ed-landing__live-cta-arrow" aria-hidden="true">&rarr;</span>
          </a>

          <template #placeholder>
            <div class="ed-landing__live-grid">
              <div v-for="i in 6" :key="i" class="ed-landing__tpp ed-landing__tpp--skel" />
            </div>
          </template>
        </ClientOnly>
      </div>
    </section>

    <section class="ed-landing__contents">
      <div class="ed-landing__inner">
        <div class="ed-landing__contents-head">
          <div class="ed-landing__contents-eyebrow">
            <span class="ed-landing__eyebrow-dash" />
            Capabilities
          </div>
          <h2 class="ed-landing__contents-title">Browse the Banking capabilities</h2>
          <p class="ed-landing__contents-sub">The full set of capability areas covered by the TPP Banking standards.</p>
        </div>

        <div class="ed-landing__contents-grid ed-landing__contents-grid--lg">
          <a
            v-for="cap in capabilities"
            :key="cap.href"
            class="ed-link-card ed-link-card--lg"
            :href="cap.href"
            :style="{ '--card-color': cap.color }"
          >
            <span class="ed-link-card__top" />
            <div class="ed-link-card__meta"><span class="ed-link-card__cat">{{ cap.cat }}</span></div>
            <h3 class="ed-link-card__title">{{ cap.title }}</h3>
            <p class="ed-link-card__desc" v-html="cap.body" />
            <ul class="ed-link-card__highlights">
              <li v-for="h in cap.highlights" :key="h">{{ h }}</li>
            </ul>
            <div class="ed-link-card__foot"><span class="ed-link-card__cta">Open</span><span class="ed-link-card__arrow">&rarr;</span></div>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.ed-landing {
  background: var(--at-bg-cream);
  color: var(--at-navy-deep);
  font-family: var(--at-sans);
  padding-top: 4.25rem;
  min-height: 100vh;
}

.ed-landing__hero { background: var(--at-bg-cream); border-bottom: 1px solid var(--at-grid-line); }
.ed-landing__inner { max-width: var(--at-page-max); margin: 0 auto; padding: 4rem 2rem 3rem; }

.ed-landing__eyebrow {
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
.ed-landing__eyebrow-dash { width: 24px; height: 1px; background: currentColor; }

.ed-landing__title {
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
.ed-landing__read {
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

.ed-landing__lede {
  font-family: var(--at-sans);
  font-size: 1.1rem;
  line-height: 1.65;
  margin: 1.75rem 0 0;
  max-width: 50rem;
  color: var(--at-mute-2);
}
.ed-landing__lede--tight { margin-top: 0.85rem; }

/* ── Live ecosystem ────────────────────────────────────────────────── */
.ed-landing__live {
  background: var(--at-surface);
  border-top: 1px solid var(--at-grid-line);
  padding: 3.5rem 0 4rem;
}
.ed-landing__live .ed-landing__inner { padding-top: 0; padding-bottom: 0; }

.ed-landing__live-head { margin-bottom: 1.85rem; }
.ed-landing__live-eyebrow {
  font-family: var(--at-mono);
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--at-teal);
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.ed-landing__live-title {
  font-family: var(--at-serif);
  font-size: clamp(1.5rem, 2.6vw, 2rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.1;
  margin: 0 0 0.6rem;
  color: var(--at-navy-deep);
}
.ed-landing__live-sub {
  font-family: var(--at-sans);
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--at-mute-2);
  margin: 0;
}
.ed-landing__live-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(13rem, 1fr));
  gap: 0.85rem;
}
.ed-landing__tpp {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 1rem 1.15rem;
  background: var(--at-bg-cream);
  border: 1px solid var(--at-grid-line);
  min-height: 4.5rem;
  text-decoration: none;
  color: inherit;
  transition: border-color 0.15s ease;
}
.ed-landing__tpp:hover { border-color: var(--at-teal-deep); }
.ed-landing__tpp--skel { background: color-mix(in srgb, var(--at-grid-line) 30%, var(--at-bg-cream)); }
.ed-landing__tpp--more {
  flex-direction: column;
  justify-content: center;
  gap: 0.2rem;
  background: color-mix(in srgb, var(--at-teal-deep) 6%, var(--at-bg-cream));
  border-style: dashed;
  text-align: center;
}
.ed-landing__tpp-more-dots {
  font-family: var(--at-serif);
  font-size: 1.4rem;
  letter-spacing: 0.08em;
  font-weight: 600;
  color: var(--at-teal-deep);
  line-height: 1;
}
.ed-landing__tpp-more-label {
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-teal-deep);
}
.ed-landing__tpp-logo {
  flex-shrink: 0;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line);
  overflow: hidden;
}
.ed-landing__tpp-logo img { width: 100%; height: 100%; object-fit: contain; }
.ed-landing__tpp-initials {
  font-family: var(--at-mono);
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--at-teal-deep);
  letter-spacing: 0.04em;
}
.ed-landing__tpp-name {
  font-family: var(--at-sans);
  font-size: 0.92rem;
  font-weight: 600;
  color: var(--at-navy-deep);
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
.ed-landing__live-empty {
  font-family: var(--at-sans);
  font-size: 0.95rem;
  color: var(--at-mute-2);
  margin: 0;
}
.ed-landing__live-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  margin-top: 1.5rem;
  font-family: var(--at-mono);
  font-size: 0.82rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-teal-deep);
  text-decoration: none;
  border-bottom: 1px solid currentColor;
  padding-bottom: 0.25rem;
}
.ed-landing__live-cta-arrow { transition: transform 0.18s ease; }
.ed-landing__live-cta:hover .ed-landing__live-cta-arrow { transform: translateX(3px); }

/* ── Capabilities / Section contents ───────────────────────────────── */
.ed-landing__contents {
  background: var(--at-bg-cream);
  border-top: 1px solid var(--at-grid-line);
  padding: 3.5rem 0 5rem;
}
.ed-landing__contents .ed-landing__inner { padding-top: 0; padding-bottom: 0; }

.ed-landing__contents-head { margin-bottom: 1.85rem; }
.ed-landing__contents-eyebrow {
  font-family: var(--at-mono);
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--at-teal);
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.ed-landing__contents-title {
  font-family: var(--at-serif);
  font-size: clamp(1.5rem, 2.6vw, 2rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.1;
  margin: 0 0 0.6rem;
  color: var(--at-navy-deep);
}
.ed-landing__contents-sub {
  font-family: var(--at-sans);
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--at-mute-2);
  margin: 0;
}
.ed-landing__contents-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(22.5rem, 1fr));
  gap: 1.25rem;
}
.ed-landing__contents-grid--lg {
  grid-template-columns: repeat(auto-fill, minmax(26rem, 1fr));
  gap: 1.5rem;
}

.ed-link-card {
  position: relative;
  display: flex;
  flex-direction: column;
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line);
  padding: 2rem 1.75rem 1.5rem;
  text-decoration: none;
  color: inherit;
  transition: border-color 0.2s ease, transform 0.2s ease;
}
.ed-link-card--lg { padding: 2.4rem 2rem 1.65rem; }
.ed-link-card:hover { border-color: var(--card-color, var(--at-navy)); transform: translateY(-2px); }
.ed-link-card__top {
  position: absolute;
  top: 0;
  left: 0;
  width: 48px;
  height: 3px;
  background: var(--card-color, var(--at-navy));
}
.ed-link-card__meta {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  margin-bottom: 0.85rem;
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  flex-wrap: wrap;
}
.ed-link-card__cat { font-weight: 700; color: var(--card-color, var(--at-navy)); }
.ed-link-card__title {
  font-family: var(--at-serif);
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: var(--at-navy-deep);
  margin: 0 0 0.85rem;
}
.ed-link-card--lg .ed-link-card__title { font-size: 1.55rem; }
.ed-link-card__desc {
  font-family: var(--at-sans);
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--at-mute-2);
  margin: 0 0 1.1rem;
}
.ed-link-card__desc :deep(code) {
  font-family: var(--at-mono);
  font-size: 0.82em;
  background: rgba(0, 39, 127, 0.06);
  padding: 0.08em 0.35em;
  color: var(--at-navy-deep);
}
.ed-link-card__highlights {
  list-style: none;
  margin: 0 0 1.25rem;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.4rem 1rem;
  flex: 1;
}
.ed-link-card__highlights li {
  position: relative;
  padding-left: 0.95rem;
  font-family: var(--at-sans);
  font-size: 0.86rem;
  line-height: 1.4;
  color: var(--at-navy-deep);
}
.ed-link-card__highlights li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.55em;
  width: 0.45rem;
  height: 1px;
  background: var(--card-color, var(--at-navy));
}
.ed-link-card__foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 0.95rem;
  border-top: 1px solid var(--at-grid-line);
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-mute);
}
.ed-link-card__arrow { color: var(--card-color, var(--at-navy)); transition: transform 0.2s ease; }
.ed-link-card:hover .ed-link-card__arrow { transform: translateX(4px); }

@media (max-width: 720px) {
  .ed-landing__inner { padding: 2.75rem 1.25rem 2rem; }
  .ed-landing__live, .ed-landing__contents { padding: 2.5rem 0 3.5rem; }
  .ed-link-card__highlights { grid-template-columns: 1fr; }
}
</style>
