<route lang="yaml">
meta:
  layout: biopay
  title: BioPay
  next: false
  prev: false
  aside: false
</route>

<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { biopaySections } from '@/data/biopay'

useHead({ title: 'BioPay' })

interface Pillar { num: string; title: string; body: string }

// The three commitments the solution is held to, as set out in the vision
// slide. Draft — these are the positions to argue with, not settled policy.
const pillars: Pillar[] = [
  {
    num: '01',
    title: 'Identified via biometrics',
    body: 'The biometric match at the terminal is all that is needed to pay. A face or a palm resolves the customer to an identity the ecosystem already trusts &mdash; nothing is typed, scanned or presented alongside it.',
  },
  {
    num: '02',
    title: 'Deviceless',
    body: 'No hand-off to another device to instruct the payment. The customer does not reach for a card, unlock a phone, open an app or approve a push notification. The terminal is the whole interaction.',
  },
  {
    num: '03',
    title: 'Payment rail agnostic',
    body: 'A single payment instruction that is not directly tied to any one payment rail. The rail underneath &mdash; AANI, CBDC, Jaywan, and others over time &mdash; is chosen after the terminal has already done its job.',
  },
]

interface Contribution { title: string; body: string }

// What the Open Finance layer contributes. The framing that matters: the Hub is
// a control plane and a security boundary, not a data store.
const contributions: Contribution[] = [
  {
    title: 'A control plane between the initiator and the bank',
    body: 'Every call runs through the API Hub. The party initiating the payment never reaches a bank directly, and the bank never has to expose itself to a new counterparty &mdash; it integrates once, with the Hub, exactly as it already does for every other Open Finance journey.',
  },
  {
    title: 'Every transaction recorded in one place',
    body: 'The Hub records each payment as it passes through: who initiated it, against which institution, and how it resolved. That gives the ecosystem a single, consistent record for reconciliation, dispute handling and supervision.',
  },
  {
    title: 'The security layer banks already accept',
    body: 'Mutual TLS and application-layer authentication on every request, with the same certificate and signing model used across Open Finance. This is what lets the journey meet LFIs&rsquo; own security postures and the requirements of the Central Bank without each bank negotiating a bespoke arrangement.',
  },
  {
    title: 'No sensitive information stored at the Hub',
    body: 'No biometric ever enters Open Finance &mdash; capture and matching happen before the first API call. The Hub holds no templates, no account numbers and no card numbers. What it keeps is described on the technical pages.',
  },
]
</script>

<template>
  <div class="bp-home">
    <!-- ─── Hero ────────────────────────────────────────────────────────── -->
    <section class="bp-hero">
      <div class="bp-hero__inner">
        <div class="bp-hero__label">
          <span class="bp-hero__dash" />
          BioPay &middot; Draft &middot; Internal
        </div>
        <h1 class="bp-hero__title">Pay by being yourself</h1>
        <p class="bp-hero__sub">
          A payment journey for the whole of the UAE. The customer registers once with their
          bank, then presents a face or a palm at the terminal and the payment completes.
          No card. No phone. No app. Nothing carried at all.
        </p>
        <p class="bp-hero__sub">
          Three things are true at once: identity comes from biometrics, funds come from a real
          bank account at a licensed institution, and the rail underneath is chosen after the
          terminal has already done its job.
        </p>
      </div>
    </section>

    <!-- ─── The vision ──────────────────────────────────────────────────── -->
    <section class="bp-section bp-section--paper">
      <div class="bp-section__inner">
        <div class="bp-eyebrow">
          <span class="bp-eyebrow__dash" />
          The vision
        </div>
        <h2 class="bp-heading">Three commitments the design is held to</h2>
        <div class="bp-principles">
          <article v-for="p in pillars" :key="p.num" class="bp-principle">
            <span class="bp-principle__num">{{ p.num }}</span>
            <div class="bp-principle__body">
              <h3 class="bp-principle__title" v-html="p.title" />
              <p class="bp-principle__text" v-html="p.body" />
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- ─── At the terminal ─────────────────────────────────────────────── -->
    <section class="bp-section">
      <div class="bp-section__inner">
        <div class="bp-eyebrow">
          <span class="bp-eyebrow__dash" />
          At the terminal
        </div>
        <h2 class="bp-heading">What the customer actually does</h2>
        <p class="bp-lede">
          The basket is totalled and the terminal asks for a biometric. The customer holds a
          palm above the reader &mdash; or uses face or fingerprint instead &mdash; and that is
          the end of their involvement. Behind those two screens sits an identity check, a
          registration lookup, a payment instruction and a bank transfer; none of it is
          something the customer has to do.
        </p>
        <div class="bp-shots">
          <figure class="bp-shot">
            <ImageViewer
              src="/images/biopay/terminal-verify-to-pay.png"
              alt="Example terminal prompting for a biometric"
            />
            <figcaption class="bp-shot__cap">
              <span class="bp-shot__step">01</span>
              Verify to pay &mdash; the amount, and a prompt for a palm, face or fingerprint.
              Paying by card remains available as a fallback.
            </figcaption>
          </figure>
          <figure class="bp-shot">
            <ImageViewer
              src="/images/biopay/terminal-payment-made.png"
              alt="Example terminal showing payment complete"
            />
            <figcaption class="bp-shot__cap">
              <span class="bp-shot__step">02</span>
              Payment made &mdash; paid from the customer&rsquo;s own bank account, with a
              receipt showing how it was verified and the reference to quote.
            </figcaption>
          </figure>
        </div>
      </div>
    </section>

    <!-- ─── What Open Finance contributes ───────────────────────────────── -->
    <section class="bp-section bp-section--paper">
      <div class="bp-section__inner">
        <div class="bp-eyebrow">
          <span class="bp-eyebrow__dash" />
          The role of Open Finance
        </div>
        <h2 class="bp-heading">A control plane, not a data store</h2>
        <p class="bp-lede">
          The biometric match happens before Open Finance is involved, and the money moves on
          rails that already exist. What Open Finance and the API Hub add is the layer in
          between: a single, governed path from the party initiating the payment to the
          licensed institution that holds the money.
        </p>
        <div class="bp-points">
          <article v-for="c in contributions" :key="c.title" class="bp-point">
            <h3 class="bp-point__title" v-html="c.title" />
            <p class="bp-point__text" v-html="c.body" />
          </article>
        </div>
      </div>
    </section>

    <!-- ─── Sections of this space ──────────────────────────────────────── -->
    <section class="bp-section">
      <div class="bp-section__inner">
        <div class="bp-eyebrow">
          <span class="bp-eyebrow__dash" />
          In this space
        </div>
        <h2 class="bp-heading">Where the detail lives</h2>
        <div class="bp-count">{{ biopaySections.length }} sections</div>
        <div class="bp-grid">
          <RouterLink
            v-for="page in biopaySections"
            :key="page.slug"
            :to="'/biopay/' + page.slug"
            class="bp-card"
            :style="{ '--bp-card-color': page.color }"
          >
            <span class="bp-card__top" :style="{ background: page.color }" />
            <div class="bp-card__meta">
              <span class="bp-card__status" :style="{ color: page.color }">{{ page.status }}</span>
              <span class="bp-card__dot">&middot;</span>
              <span class="bp-card__read">{{ page.readTime }}</span>
            </div>
            <h2 class="bp-card__title">{{ page.title }}</h2>
            <p class="bp-card__desc">{{ page.summary }}</p>
            <div class="bp-card__foot">
              <span class="bp-card__outcome">{{ page.outcome }}</span>
              <span class="bp-card__arrow" :style="{ color: page.color }">&rarr;</span>
            </div>
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.bp-home {
  background: var(--at-bg-cream);
  color: var(--at-navy-deep);
  font-family: var(--at-sans);
}

/* ─── Hero ──────────────────────────────────────────────────────────────── */
.bp-hero { background: var(--at-bg-cream); border-bottom: 1px solid var(--at-grid-line); }
.bp-hero__inner { max-width: var(--at-page-max); margin: 0 auto; padding: 4.5rem 2rem 3rem; }
.bp-hero__label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-family: var(--at-mono);
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--at-teal);
  margin-bottom: 1.5rem;
}
.bp-hero__dash { width: 24px; height: 1px; background: currentColor; }
.bp-hero__title {
  font-family: var(--at-serif);
  font-size: clamp(2.75rem, 6.5vw, 4.5rem);
  font-weight: 600;
  line-height: 0.98;
  letter-spacing: -0.035em;
  margin: 0;
}
.bp-hero__sub {
  font-size: 1.15rem;
  line-height: 1.55;
  margin: 1.75rem 0 0;
  max-width: 44rem;
  color: var(--at-mute-2);
}
/* ─── Sections ──────────────────────────────────────────────────────────── */
.bp-section { border-bottom: 1px solid var(--at-grid-line); }
.bp-section--paper { background: var(--at-bg-paper); }
.bp-section__inner { max-width: var(--at-page-max); margin: 0 auto; padding: 3rem 2rem 3.5rem; }

.bp-count {
  font-family: var(--at-mono);
  font-size: 0.68rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--at-mute);
  margin-bottom: 1.5rem;
}

.bp-eyebrow {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  font-family: var(--at-mono);
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--at-teal-deep);
  margin-bottom: 1rem;
}
.bp-eyebrow__dash { width: 24px; height: 1px; background: currentColor; }

.bp-heading {
  font-family: var(--at-serif);
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 600;
  line-height: 1.15;
  letter-spacing: -0.02em;
  margin: 0 0 1.25rem;
}

.bp-lede {
  font-size: 1rem;
  line-height: 1.7;
  color: var(--at-mute-2);
  max-width: 48rem;
  margin: 0 0 2rem;
}

/* ─── Terminal mockups ──────────────────────────────────────────────────── */
.bp-shots {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(23rem, 1fr));
  gap: 1.75rem;
  align-items: start;
}
.bp-shot { margin: 0; }
.bp-shot__cap {
  display: block;
  margin-top: 0.9rem;
  font-size: 0.88rem;
  line-height: 1.6;
  color: var(--at-mute-2);
}
.bp-shot__step {
  display: inline-block;
  margin-right: 0.55rem;
  font-family: var(--at-mono);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: var(--at-teal-deep);
}

/* ─── Cards ─────────────────────────────────────────────────────────────── */
.bp-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(19rem, 1fr));
  gap: 1.5rem;
}
.bp-card {
  position: relative;
  display: flex;
  flex-direction: column;
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line);
  padding: 1.75rem 1.5rem 1.35rem;
  text-decoration: none;
  color: inherit;
  transition: border-color 0.16s, transform 0.16s;
}
.bp-card:hover {
  border-color: var(--bp-card-color, var(--at-teal));
  transform: translateY(-2px);
}
.bp-card__top {
  position: absolute;
  inset: 0 0 auto 0;
  height: 3px;
}
.bp-card__meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--at-mono);
  font-size: 0.64rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--at-mute);
  margin-bottom: 0.9rem;
}
.bp-card__status { font-weight: 700; }
.bp-card__title {
  font-family: var(--at-serif);
  font-size: 1.35rem;
  font-weight: 600;
  letter-spacing: -0.015em;
  margin: 0 0 0.7rem;
}
.bp-card__desc {
  font-size: 0.92rem;
  line-height: 1.6;
  color: var(--at-mute-2);
  margin: 0 0 1.4rem;
}
.bp-card__foot {
  margin-top: auto;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  padding-top: 0.9rem;
  border-top: 1px solid var(--at-grid-line);
}
.bp-card__outcome {
  font-size: 0.82rem;
  line-height: 1.5;
  color: var(--at-mute);
}
.bp-card__arrow { font-family: var(--at-mono); font-size: 1rem; }

/* ─── Pillars ───────────────────────────────────────────────────────────── */
.bp-principles {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(22rem, 1fr));
  gap: 1.25rem;
}
.bp-principle {
  display: grid;
  grid-template-columns: 3.25rem 1fr;
  gap: 1.1rem;
  padding: 1.5rem;
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line);
}
.bp-principle__num {
  font-family: var(--at-mono);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--at-teal-deep);
}
.bp-principle__title {
  font-family: var(--at-sans);
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.5rem;
}
.bp-principle__text {
  font-size: 0.92rem;
  line-height: 1.65;
  color: var(--at-mute-2);
  margin: 0;
}

/* ─── What Open Finance contributes ─────────────────────────────────────── */
.bp-points {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(21rem, 1fr));
  gap: 1.25rem;
}
.bp-point {
  padding: 1.5rem;
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line);
  border-top: 3px solid var(--at-teal);
}
.bp-point__title {
  font-family: var(--at-sans);
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.35;
  margin: 0 0 0.6rem;
}
.bp-point__text {
  font-size: 0.92rem;
  line-height: 1.65;
  color: var(--at-mute-2);
  margin: 0;
}

.bp-principle__text :deep(code),
.bp-point__text :deep(code) {
  font-family: var(--at-mono);
  font-size: 0.86em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  padding: 0.08em 0.4em;
}

@media (max-width: 640px) {
  .bp-hero__inner,
  .bp-section__inner { padding-left: 1.25rem; padding-right: 1.25rem; }
}
</style>
