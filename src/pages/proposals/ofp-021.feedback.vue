<script setup lang="ts">
// Feedback summary for OFP-021. Rendered in the "Votes Received & Feedback" tab,
// appended under the live vote panel once voting has closed (see the parent
// ofp-021.vue: FeedbackPartial is glob-imported and shown when isClosed). This
// is an EDITORIAL synthesis of the vote — the raw, per-org votes are shown by
// the panel above. Quotes are drawn verbatim from voters' submitted answers.
//
// OFP-021 closed 9 Nov 2026 at 5 for / 0 against / 0 abstain. One voter (ADCB)
// answered the two questions; the other four voted without a comment.

interface Theme {
  k: string
  title: string
  body: string
  quote?: { text: string; who: string }
}

const themes: Theme[] = [
  {
    k: '01',
    title: 'Unanimous, with no amendment requested',
    body:
      'Every vote was in favour — 5 for, none against, none abstaining — from ADCB and Al Hilal Bank, Emirates NBD, Emirates Islamic, HSBC and Spare Technologies. No voter asked for a change to the proposed formats, and none raised the change of type between V2.1 and V2.2 or the reversal of Ozone Connect v2.2.6 as a concern. Four of the five votes were cast without a comment.',
  },
  {
    k: '02',
    title: 'The identifier limits are accepted, subject to an internal check',
    body:
      'The first question asked whether the card and biller identifiers LFIs hold fit MerchantId up to 15, TerminalId up to 16 and BillerId up to 35 letters and digits. ADCB, the only voter to answer, accepted the limits on condition of an internal check: it sends these identifiers from source as held, and its IT team is to confirm that none is longer than the limits or contains spaces or hyphens. No identifier outside the proposed formats was reported.',
    quote: {
      text: 'Accept the limits, subject to an internal check. ADCB sends the card merchant ID, the terminal or channel ID and the bill ID from source as held. IT should confirm that none is longer than the limits or contains spaces or hyphens.',
      who: 'Saba Wasim · ADCB, Al Hilal Bank · For',
    },
  },
  {
    k: '03',
    title: 'The Frequency values cover the salaries held',
    body:
      'The second question asked whether Weekly, Fortnightly, Monthly and Annual are enough to populate Salary Frequency. ADCB confirmed that they are, and that it will send Monthly where the salary period is known, which is consistent with Frequency being optional where no period is held. No missing value was reported.',
    quote: {
      text: 'Yes. Weekly, Fortnightly, Monthly and Annual are enough. ADCB will send Monthly where the salary period is known.',
      who: 'Saba Wasim · ADCB, Al Hilal Bank · For',
    },
  },
]
</script>

<template>
  <section class="fb">
    <div class="fb__inner">
      <div class="fb__head">
        <div class="fb__eyebrow"><span class="fb__eyebrow-dash" /> Feedback · themes from the vote</div>
        <h2 class="fb__title">What the ecosystem told us</h2>
        <p class="fb__lede">
          A short synthesis of the votes and question answers behind the tally above. Support was unanimous,
          and one voter answered the two questions on the form. The full per-organisation votes are listed in
          the panel.
        </p>
      </div>

      <div class="fb__grid">
        <article v-for="t in themes" :key="t.k" class="fb-card">
          <div class="fb-card__k">{{ t.k }}</div>
          <h3 class="fb-card__title">{{ t.title }}</h3>
          <p class="fb-card__body">{{ t.body }}</p>
          <blockquote v-if="t.quote" class="fb-card__quote">
            <p class="fb-card__quote-text">“{{ t.quote.text }}”</p>
            <footer class="fb-card__quote-who">{{ t.quote.who }}</footer>
          </blockquote>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.fb {
  background: var(--at-bg-cream);
  padding: 3.5rem 0 4rem;
  border-top: 1px solid var(--at-grid-line);
}
.fb__inner { max-width: var(--at-page-max); margin: 0 auto; padding: 0 2rem; }

.fb__head { max-width: 52rem; margin-bottom: 2.25rem; }
.fb__eyebrow {
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
.fb__eyebrow-dash { width: 24px; height: 1px; background: currentColor; }
.fb__title {
  font-family: var(--at-serif);
  font-size: clamp(1.9rem, 3.6vw, 2.5rem);
  font-weight: 500;
  letter-spacing: -0.025em;
  line-height: 1.06;
  margin: 0;
  color: var(--at-navy-deep);
}
.fb__lede {
  font-size: 1rem;
  line-height: 1.65;
  color: var(--at-mute-2);
  margin: 1.1rem 0 0;
}

.fb__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.fb-card {
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line);
  border-top: 2px solid var(--at-teal);
  padding: 22px 24px 24px;
  display: flex;
  flex-direction: column;
}
.fb-card__k {
  font-family: var(--at-mono);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: var(--at-teal);
  margin-bottom: 10px;
}
.fb-card__title {
  font-family: var(--at-serif);
  font-size: 20px;
  font-weight: 500;
  letter-spacing: -0.015em;
  line-height: 1.2;
  color: var(--at-navy-deep);
  margin: 0 0 10px;
}
.fb-card__body {
  font-size: 14.5px;
  line-height: 1.62;
  color: var(--at-navy);
  margin: 0;
  text-wrap: pretty;
}
.fb-card__quote {
  margin: 16px 0 0;
  padding: 12px 16px;
  border-left: 3px solid var(--at-grid-line);
  background: var(--at-bg-cream);
}
.fb-card__quote-text {
  font-family: var(--at-serif);
  font-size: 14.5px;
  font-style: italic;
  line-height: 1.5;
  color: var(--at-navy-deep);
  margin: 0 0 8px;
  text-wrap: pretty;
}
.fb-card__quote-who {
  font-family: var(--at-mono);
  font-size: 10px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--at-navy);
  opacity: 0.6;
}

/* A trailing card alone on the bottom row (odd count, 2 cols) spans full width. */
.fb-card:last-child:nth-child(odd) { grid-column: 1 / -1; }

@media (max-width: 920px) {
  .fb { padding: 2.5rem 0 3rem; }
  .fb__inner { padding: 0 1.25rem; }
  .fb__grid { grid-template-columns: 1fr; }
  .fb-card:last-child:nth-child(odd) { grid-column: auto; }
}
</style>
