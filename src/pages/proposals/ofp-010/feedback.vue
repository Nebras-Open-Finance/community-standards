<script setup lang="ts">
// Feedback summary for OFP-010. Rendered in the "Votes Received & Feedback" tab,
// appended under the live vote panel once voting has closed (see the parent
// index.vue: FeedbackPartial is glob-imported from this folder and shown when
// isClosed). This is an EDITORIAL synthesis of the themes that came through in
// the vote comments and question answers — the raw, per-org votes are shown by
// the panel above. Quotes are drawn verbatim from voters' submitted comments.

interface Theme {
  k: string
  title: string
  body: string
  quote?: { text: string; who: string }
}

const themes: Theme[] = [
  {
    k: '01',
    title: 'The narrative is what makes the data usable',
    body:
      'The case made in support was about value, not just completeness. Amount, date, and account give the bare financial record; the narrative is what TPPs rely on for categorisation, affordability analysis, financial insights, and underwriting. Making it required is seen as a lift in data quality and consistency across the ecosystem.',
    quote: {
      text: 'While transaction details such as amount, date, and account information provide the basic financial record, the transaction narrative provides essential context required for use cases such as transaction categorisation, affordability analysis, financial insights, and underwriting.',
      who: 'Preethi Iyer · Commercial Bank International · For',
    },
  },
  {
    k: '02',
    title: 'Achievable across products — for some',
    body:
      'Asked whether a meaningful narrative can be supplied for every product on the transactions endpoint, one LFI answered that it can: where a core does not hold a narrative for a product, relevant product information is used instead so the transaction still carries a meaningful description.',
    quote: {
      text: 'For products where a transaction narrative is not available, I believe relevant product information can be provided as an alternative to ensure a meaningful description is still presented. Based on this approach, we consider the requirement achievable across products and do not foresee any significant challenges in supporting it.',
      who: 'Aaqib Mir · Mashreq · For',
    },
  },
  {
    k: '03',
    title: 'Already in place at some LFIs',
    body:
      'For some LFIs the change formalises what they already do: the narration is mapped and returned in the existing statement response. For them the requirement adds a certification check, not new build.',
    quote: {
      text: 'Narration is already mapped from DIB End. This is available in the response for statement service.',
      who: 'Anu Unnithan · DIB · For',
    },
  },
  {
    k: '04',
    title: 'Corporate and SME are the gap',
    body:
      'Not every LFI can supply a narrative on every product line today. Retail transactions were reported as covered, but corporate and SME transactions were not, and supporters acknowledged that LFIs will need to assess their cores product by product. This is why the change is targeted at V2.2 and asserted at functional certification: the expectation is set now, with time for remediation before it is checked.',
    quote: {
      text: 'Retail product transactions will have a narrative. Response not available for corporate or SME transactions - suggest further analysis by community.',
      who: 'Abdulla Mashaal · Emirates NBD · For',
    },
  },
  {
    k: '05',
    title: 'The objection: readiness, not value',
    body:
      'Both votes against came from LFIs, and neither disputed the value of the narrative. One reported that it cannot provide transaction information for all transaction types; the other preferred to keep the field optional, sent when available in core systems, citing the remediation involved — including contacting customers where the data is unavailable — and asked that it be discussed in the UBF working group first. The proposal was approved as proposed; the V2.2 lead time and certification-based enforcement are how that remediation is accommodated.',
    quote: {
      text: 'This would require a significant remediation effort, including contacting customers where the relevant data is unavailable or lacks meaningful value. In view of the analysis and remediation effort involved, it is recommended that this be discussed within the UBF working group prior to finalising the proposal, or that it remains optional as per the current approach.',
      who: 'Sena Ozturk · HSBC · Against',
    },
  },
  {
    k: '06',
    title: 'Required is not the same as meaningful',
    body:
      'Voters on both sides of the readiness question stressed that the narrative must actually describe the transaction. Making the field required guarantees it is present and non-empty; it does not standardise its content or format, which will continue to vary between LFIs. That limitation is acknowledged and was not in scope for this proposal.',
    quote: {
      text: 'The limitation of this change is that the content and format of the narrative will continue to vary. A narrative could simply say "Transaction".',
      who: 'Abdulla Mashaal · Emirates NBD · For',
    },
  },
  {
    k: '07',
    title: 'Length and concatenation',
    body:
      'One LFI asked for the field’s length to reflect the lowest value supported across cores, and for rules on how narration held in several core fields is concatenated into one. The bounds are fixed at 1–500 characters on both sides of the Hub by this decision; how an LFI composes the narrative within them is not specified here and is recorded for separate consideration.',
    quote: {
      text: 'if naration is a string in the API, we will need to limit this basis the lowest value supported across in length. Details for concatenation will also have to be specified',
      who: 'Harikumar Rajan · Emirates Islamic · For',
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

/* Last card sits alone on the bottom row (odd card count, 2 cols) — let it span full. */
.fb-card:last-child:nth-child(odd) { grid-column: 1 / -1; }

@media (max-width: 920px) {
  .fb { padding: 2.5rem 0 3rem; }
  .fb__inner { padding: 0 1.25rem; }
  .fb__grid { grid-template-columns: 1fr; }
  .fb-card:last-child:nth-child(odd) { grid-column: auto; }
}
</style>
