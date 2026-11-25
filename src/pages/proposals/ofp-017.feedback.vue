<script setup lang="ts">
// Feedback summary for OFP-017. Rendered in the "Votes Received & Feedback" tab,
// appended under the live vote panel once voting has closed (ofp-017.vue
// glob-imports ./ofp-017.feedback.vue and shows it when isClosed). This is an
// EDITORIAL synthesis of the themes that came through in the vote comments and
// question answers — the raw, per-org votes are shown by the panel above.
// Quotes are drawn verbatim from voters' submitted comments and answers.

interface Theme {
  k: string
  title: string
  body: string
  quote?: { text: string; who: string }
}

const themes: Theme[] = [
  {
    k: '01',
    title: 'Unanimous support, and LFIs say they can supply it',
    body:
      'All 11 votes cast were in favour, with none against and none abstaining. Of the LFIs that answered question 01, DIB and HSBC said they can return InArrears, Defaulted and WrittenOff on GET /accounts. HSBC noted that it does not share data for credit card, finance or mortgage products today.',
    quote: {
      text: 'Yes - can support new statuses',
      who: 'Arif Saeed · DIB · For',
    },
  },
  {
    k: '02',
    title: 'The 90-day point for Defaulted holds',
    body:
      'No voter challenged the definitions. DIB confirmed the 90-days-past-due point for Defaulted. Mashreq observed that terminology differs by product type, with dormant used for asset products and defaulted or written off for credit products, which makes a common set of terms harder to apply.',
    quote: {
      text: 'It is difficult to bring in a common terminology to different type of products. The status defines the action on the customer for that product',
      who: 'Aishwarya Venugopal · Mashreq · For',
    },
  },
  {
    k: '03',
    title: 'No agreed answer on Suspended and Dormant',
    body:
      'Question 02 asked which status should be returned when an account is both Suspended or Dormant and in arrears. The two LFIs that answered disagreed: DIB said its finance accounts are not marked suspended and would return InArrears, while CBD answered Suspended. The proposal left this precedence open and the vote did not settle it.',
    quote: {
      text: 'Finance accounts will not mark suspended, and InArrears (Overdue) status will be returned',
      who: 'Arif Saeed · DIB · For',
    },
  },
  {
    k: '04',
    title: 'TPPs see value for credit use cases',
    body:
      'One TPP answered question 03. Spare named affordability assessments, credit decisioning and lending journeys as the use cases for the new statuses. No TPP said whether StatusUpdateDateTime is enough on its own, or asked for days past due or the amount in arrears.',
    quote: {
      text: 'We see significant value in these additional statuses',
      who: 'Dipanshu Munjal · Spare Technologies · For',
    },
  },
  {
    k: '05',
    title: 'Some doubt over readiness for V2.2',
    body:
      'Two For-voters were less certain about timing. CBD supported the idea but questioned whether it belongs in V2.2, and was not sure its systems hold these statuses. Standard Chartered said it would check its systems for the closest equivalent. Neither asked for the proposal to change.',
    quote: {
      text: 'Whilst I believe there is value in this proposal, I am not sure we should put it in standards 2.2',
      who: 'Luis Claudio · CBD · For',
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
