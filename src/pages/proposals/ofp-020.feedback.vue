<script setup lang="ts">
// Feedback summary for OFP-020. Rendered in the "Votes Received & Feedback" tab,
// appended under the live vote panel once voting has closed (see the parent
// ofp-020.vue: FeedbackPartial is glob-imported from './ofp-020.feedback.vue'
// and shown when isClosed). This is an EDITORIAL synthesis of the themes that
// came through in the vote comments and question answers — the raw, per-org
// votes are shown by the panel above. Quotes are drawn verbatim from voters'
// submitted comments and answers.
//
// OFP-020 closed 9 Nov 2026 at 3 for / 5 against / 1 abstain. Follows the
// OFP-014 format: overall stance first, then one theme per vote question.

interface Theme {
  k: string
  title: string
  body: string
  quote?: { text: string; who: string }
}

const themes: Theme[] = [
  {
    k: '01',
    title: 'LFIs could not commit to V2.2',
    body:
      'Support was limited (3 of 9 in favour). All five votes against came from LFIs — Emirates NBD, Emirates Islamic, HSBC, CBD and Mashreq — and the one abstention, from Standard Chartered, said Bulk/Batch is not on its roadmap. Where a reason was given, it was capacity and timing rather than the payment model. The mandate is therefore not adopted, and Bulk/Batch is added to V2.2 as optional for LFIs.',
    quote: {
      text: 'We think that this functionality should be held until we 3.0 as 2.2 is a lot of work as is.',
      who: 'Luis Claudio · CBD · Against',
    },
  },
  {
    k: '02',
    title: 'Delivery in V2.2 is not assured',
    body:
      'Question 01 asked LFIs whether they can support Bulk/Batch Payments for SME and Corporate accounts in V2.2, and whether they plan to offer them for Retail. HSBC answered that delivery within V2.2 would not be feasible because the JSON array format is not supported, and recommended a flexible format such as XML alongside JSON. CBD reported no Retail use case at present. Neither answer confirmed that the mandatory scope could be met at V2.2. The JSON array model itself was agreed in OFP-001 and was not reopened.',
    quote: {
      text: 'We cannot support bulk or batch payments for corporate accounts because the required JSON array format is not supported. We recommend keeping the format flexible by supporting options such as XML and JSON.',
      who: 'Sena Ozturk · HSBC · Against',
    },
  },
  {
    k: '03',
    title: '5,000 instructions is enough to start',
    body:
      'Question 02 asked TPPs what they would use Bulk/Batch Payments for, and whether a maximum of 5,000 instructions per request is enough. Spare named B2B use cases — month-end vendor payments and payroll — and said 5,000 is enough to begin with, asking whether a limit on the cumulative amount applies. CBD reported an average of approximately 1,300 payments, excluding payroll. No answer asked for a higher limit.',
    quote: {
      text: '5000 seems to be enough for the beginning. Actual will depend on the type of business. Any limit for the cumulative amount?',
      who: 'Dipanshu Munjal · Spare Technologies · For',
    },
  },
  {
    k: '04',
    title: 'No case for mandatory Retail',
    body:
      'Question 03 asked whether the split is right: mandatory for SME and Corporate accounts, optional for Retail. Spare answered yes, CBD believed so, and HSBC said Retail should be optional. No answer argued for mandatory Retail support. With the mandate for business accounts not adopted either, every LFI decides for itself whether to offer Bulk/Batch Payments.',
    quote: {
      text: 'it should be optional for retail.',
      who: 'Sena Ozturk · HSBC · Against',
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
          A short synthesis of the comments and question answers behind the tally above. The full
          per-organisation votes are listed in the panel; these are the themes that shaped the outcome.
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

/* Last card sits alone on the bottom row (5 cards, 2 cols) — let it span full. */
.fb-card:last-child:nth-child(odd) { grid-column: 1 / -1; }

@media (max-width: 920px) {
  .fb { padding: 2.5rem 0 3rem; }
  .fb__inner { padding: 0 1.25rem; }
  .fb__grid { grid-template-columns: 1fr; }
  .fb-card:last-child:nth-child(odd) { grid-column: auto; }
}
</style>
