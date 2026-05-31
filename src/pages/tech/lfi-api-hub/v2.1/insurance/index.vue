<route lang="yaml">
meta:
  title: Insurance
  isIndex: true
</route>

<script setup lang="ts">
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
    href: '/tech/lfi-api-hub/v2.1/insurance/data-sharing/',
    cat: 'Insurance Data Sharing',
    color: 'var(--at-teal)',
    title: 'Insurance Data Sharing',
    body: 'Expose a customer&rsquo;s insurance policies to consented TPPs across seven sectors &mdash; Employment, Health, Home, Life, Motor, Renters, and Travel. Permissions such as <code>ReadInsurancePolicies</code>, <code>ReadCustomerBasic</code>, and <code>ReadInsurancePremium</code> control which fields are returned. When the customer grants <code>ReadInsurancePremium</code>, your Ozone Connect endpoints return the <code>Premium</code> field as an encrypted JWE.',
    highlights: ['Policy information across 7 sectors', 'Customer &amp; payment-method data', 'Encrypted premium values', 'Coverage, riders &amp; claims history'],
  },
  {
    href: '/tech/lfi-api-hub/v2.1/insurance/quotation/',
    cat: 'Insurance Quotation',
    color: 'var(--at-gold, #b08800)',
    title: 'Insurance Quotation',
    body: 'Receive quote requests, accept, and issue policies through your Ozone Connect endpoints across the same seven sectors. Choose between <strong>LFI-Led</strong> (your LFI hosts the customer end-to-end) and <strong>TPP-Led</strong> (the TPP collects KYC and surfaces an LFI-hosted payment URL). Status events flow back to subscribed TPPs through <code>PATCH /insurance-quote-log/{logId}</code>.',
    highlights: ['Quotes across 7 sectors', 'New, Renewal &amp; Switch quote types', 'LFI-Led &amp; TPP-Led modes', 'Webhook-driven status events'],
  },
]
</script>

<template>
  <div class="ed-landing">
    <section class="ed-landing__hero">
      <div class="ed-landing__inner">
        <div class="ed-landing__eyebrow">
          <span class="ed-landing__eyebrow-dash" />
          LFI Standards &middot; v2.1 &middot; Insurance
        </div>
        <h1 class="ed-landing__title">
          Insurance
          <span class="ed-landing__read">2 min read</span>
        </h1>
        <p class="ed-landing__lede">
          The Open Finance Insurance capabilities enable secure and efficient sharing of insurance policy
          data &mdash; empowering third-party providers (TPPs) with the tools they need to deliver policy
          aggregation, switching, broking, and value-added digital insurance services.
        </p>
        <p class="ed-landing__lede ed-landing__lede--tight">
          All services operate under strict consent management and granular data access permissions,
          mediated and validated by the API Hub.
        </p>
      </div>
    </section>

    <section class="ed-landing__contents">
      <div class="ed-landing__inner">
        <div class="ed-landing__contents-head">
          <div class="ed-landing__contents-eyebrow">
            <span class="ed-landing__eyebrow-dash" />
            Capabilities
          </div>
          <h2 class="ed-landing__contents-title">Browse the Insurance capabilities</h2>
          <p class="ed-landing__contents-sub">The full set of capability areas covered by the LFI Insurance standards.</p>
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
              <li v-for="h in cap.highlights" :key="h" v-html="h" />
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

.ed-landing__contents {
  background: var(--at-bg-cream);
  border-top: 1px solid var(--at-grid-line);
  padding: 3.5rem 0 5rem;
}
.ed-landing__contents .ed-landing__inner { padding-top: 0; padding-bottom: 0; }

.ed-landing__contents-head { margin-bottom: 1.85rem; }
.ed-landing__contents-eyebrow {
  font-family: var(--at-mono); font-size: 0.68rem;
  letter-spacing: 0.18em; text-transform: uppercase;
  color: var(--at-teal); margin-bottom: 1rem;
  display: flex; align-items: center; gap: 0.75rem;
}
.ed-landing__contents-title {
  font-family: var(--at-serif);
  font-size: clamp(1.5rem, 2.6vw, 2rem);
  font-weight: 600; letter-spacing: -0.02em;
  line-height: 1.1; margin: 0 0 0.6rem; color: var(--at-navy-deep);
}
.ed-landing__contents-sub {
  font-family: var(--at-sans); font-size: 0.95rem;
  line-height: 1.6; color: var(--at-mute-2); margin: 0;
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
  position: absolute; top: 0; left: 0;
  width: 48px; height: 3px;
  background: var(--card-color, var(--at-navy));
}
.ed-link-card__meta {
  display: flex; align-items: center; gap: 0.65rem;
  margin-bottom: 0.85rem;
  font-family: var(--at-mono); font-size: 0.62rem;
  letter-spacing: 0.12em; text-transform: uppercase;
  flex-wrap: wrap;
}
.ed-link-card__cat { font-weight: 700; color: var(--card-color, var(--at-navy)); }
.ed-link-card__title {
  font-family: var(--at-serif); font-size: 1.4rem;
  font-weight: 500; line-height: 1.2; letter-spacing: -0.02em;
  color: var(--at-navy-deep); margin: 0 0 0.85rem;
}
.ed-link-card--lg .ed-link-card__title { font-size: 1.55rem; }
.ed-link-card__desc {
  font-family: var(--at-sans); font-size: 0.95rem;
  line-height: 1.6; color: var(--at-mute-2); margin: 0 0 1.1rem;
}
.ed-link-card__desc :deep(code) {
  font-family: var(--at-mono); font-size: 0.82em;
  background: rgba(0, 39, 127, 0.06); padding: 0.08em 0.35em; color: var(--at-navy-deep);
}
.ed-link-card__highlights {
  list-style: none; margin: 0 0 1.25rem; padding: 0;
  display: grid; grid-template-columns: repeat(2, 1fr);
  gap: 0.4rem 1rem; flex: 1;
}
.ed-link-card__highlights li {
  position: relative; padding-left: 0.95rem;
  font-family: var(--at-sans); font-size: 0.86rem;
  line-height: 1.4; color: var(--at-navy-deep);
}
.ed-link-card__highlights li::before {
  content: ""; position: absolute; left: 0; top: 0.55em;
  width: 0.45rem; height: 1px;
  background: var(--card-color, var(--at-navy));
}
.ed-link-card__foot {
  display: flex; align-items: center; justify-content: space-between;
  padding-top: 0.95rem; border-top: 1px solid var(--at-grid-line);
  font-family: var(--at-mono); font-size: 0.66rem;
  letter-spacing: 0.14em; text-transform: uppercase; font-weight: 700; color: var(--at-mute);
}
.ed-link-card__arrow { color: var(--card-color, var(--at-navy)); transition: transform 0.2s ease; }
.ed-link-card:hover .ed-link-card__arrow { transform: translateX(4px); }

@media (max-width: 720px) {
  .ed-landing__inner { padding: 2.75rem 1.25rem 2rem; }
  .ed-landing__contents { padding: 2.5rem 0 3.5rem; }
  .ed-link-card__highlights { grid-template-columns: 1fr; }
}
</style>
