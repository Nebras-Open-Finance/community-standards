<script setup lang="ts">
// Feedback summary for OFP-012. Rendered in the "Votes Received & Feedback" tab,
// appended under the live vote panel once voting has closed (see ofp-012.vue:
// FeedbackPartial is glob-imported as ./ofp-012.feedback.vue and shown when
// isClosed). This is an EDITORIAL synthesis of the themes that came through in
// the vote comments and question answers — the raw, per-org votes are shown by
// the panel above. Quotes are drawn verbatim from voters' submitted comments
// and question answers.
//
// OFP-012 closed 23 Sep 2026 at 11 for / 1 against / 0 abstain. Substantive
// answers came from Emirates NBD, ADCB, Mashreq (For) and HSBC (Against).

interface Theme {
  k: string
  title: string
  body: string
  quote?: { text: string; who: string }
}

const themes: Theme[] = [
  {
    k: '01',
    title: 'Newest-first is what customers expect to see',
    body:
      'Eleven of twelve votes were in favour, with one against and none abstaining. Where For-voters gave a reason, it was the customer view: an account opened in a TPP app is expected to show its latest activity first, and fetching oldest-first means working through history before anything useful can be displayed.',
    quote: {
      text: 'Instead of fetching the oldest one’s first and displaying that, we plan to fetch the latest one(Thats what the customer is expecting to see first).',
      who: 'Aaqib Mir · Mashreq · For',
    },
  },
  {
    k: '02',
    title: 'A contained change for live LFIs — depending on scope',
    body:
      'Three LFIs answered the first question. Emirates NBD, in live proving, expects to apply the sort on its side as a relatively minor change, and Mashreq will change its core system to sort the data. ADCB estimated low-to-moderate effort, contingent on its upstream provider returning ordered results, and drew the distinction that matters: ordering within each page is trivial, but ordering across pagination — which is what the proposal specifies — would need a defined implementation window.',
    quote: {
      text: 'If the requirement is scoped as “ordered within each page” the work is trivial and no grace period is needed. If it is “globally ordered across pagination,” we would need for a defined implementation window rather than immediate effect.',
      who: 'Saba Wasim · ADCB · For',
    },
  },
  {
    k: '03',
    title: 'Statements are the harder case',
    body:
      'The one vote against turned on statements rather than transactions. HSBC’s statements are produced as PDFs, generated oldest to newest, and can carry different start and end dates for each customer according to the billing cycle, as with cards. HSBC already returns transactions newest-first and would accept a fixed order there, but said it could not support descending order on the statements endpoint.',
    quote: {
      text: 'For statement- we would not be able to support the descending order (Newest to oldest) as our statements are in PDF format and are generated in ascending order (oldest to newest).',
      who: 'Sena Ozturk · HSBC · Against',
    },
  },
  {
    k: '04',
    title: 'No TPP use case asked for ascending order',
    body:
      'No respondent said it needed to request ascending order. Emirates NBD, answering as a TPP, said newest-first would let it cache data and reduce the number of calls, and that it uses the current balance as provided rather than reconstructing a running balance. Mashreq confirmed newest-first works for its use cases, and HSBC said it already shares transactions newest to oldest.',
    quote: {
      text: 'By getting newest data first, I would cache the data and reduce the number of calls which is a benefit. We currently do not plan to calculate the running-balance, but to use a current balance as provided.',
      who: 'Abdulla Mashaal · Emirates NBD · For',
    },
  },
  {
    k: '05',
    title: 'A fixed order is preferred over a sort control',
    body:
      'On the third question, ADCB said a fixed descending order is materially easier: to hold across pagination the ordering has to be enforced in the source query, and a TPP-controlled parameter would roughly double what must be built, validated and tested. HSBC recommended a fixed order for transactions. Emirates NBD considered both directions feasible at channel level but said further assessment would be needed at platform level, noting that pending, settled and cleared states make a TPP-requested sort more complex for LFIs.',
    quote: {
      text: 'A TPP-controlled parameter means both paths must support either direction at query time, plus request validation, plus a defined default when the parameter is absent, plus test coverage and conformance evidence for both orderings. It roughly doubles the surface for a capability we have not seen demand for.',
      who: 'Saba Wasim · ADCB · For',
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
