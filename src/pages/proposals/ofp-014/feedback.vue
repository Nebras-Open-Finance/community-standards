<script setup lang="ts">
// Feedback summary for OFP-014. Rendered in the "Votes Received & Feedback" tab,
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
    title: 'Consistent date-time semantics are wanted',
    body:
      'Support was broad (8 of 9 in favour). Where a reason was given, it was consistency: LFIs and TPPs want a single, stated meaning for every date-time field, so that a value sent by one party is read as the same instant by the other.',
    quote: {
      text: 'Consistent date-time will reduce misinterpretation of date and time across LFI and TPP.',
      who: 'Abdulla Mashaal · Emirates NBD · For',
    },
  },
  {
    k: '02',
    title: 'Equivalence is mostly handled — not everywhere',
    body:
      'Question 01 asked LFIs whether 2027-07-22T00:00:00Z and 2027-07-22T04:00:00+04:00 are treated as the same moment today. Emirates NBD and Emirates Islamic reported that all their date-time fields are already emitted in UTC. DIB reported both forms are treated the same, with changes needed on its inbound and outbound Open Finance services. HSBC answered no at a high level, with downstream translation required — confirming that the clarification is not documentation alone for every LFI.',
    quote: {
      text: 'All our date-time fields are emitted in YYYY-MM-DDTHH:MM:SS.sssZ format (e.g. 2026-02-13T19:07:28.000Z) — UTC, RFC 3339 profile of ISO 8601.',
      who: 'Ashif Asharaf · Emirates Islamic, Emirates NBD · For',
    },
  },
  {
    k: '03',
    title: 'No objection to prohibiting -00:00 at V2.2',
    body:
      'Question 02 asked whether V2.2 should carry a pattern that rejects -00:00 while still permitting non-UTC offsets. Both answers received were in favour: HSBC answered yes, and DIB confirmed it can implement the change for the V2.2 release.',
    quote: {
      text: 'Currently we are on 2.1. We are fine to implement the ask for Version 2.2. release with the required efforts.',
      who: 'Anu Unnithan · DIB · For',
    },
  },
  {
    k: '04',
    title: 'Divided on when to require UTC',
    body:
      'Question 03 asked whether V2.2 should require UTC outright by schema, or wait for a major version. HSBC preferred a major version change, and recommended a format carrying the +04:00 offset. DIB was prepared to take it at V2.2, provided it is fully tested. With no consensus to make a breaking change at V2.2, requiring UTC by schema remains deferred, as the proposal set out.',
    quote: {
      text: 'Yes , we will do as part of version 2.2 release and complete testing is required for the same.',
      who: 'Anu Unnithan · DIB · For',
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

/* If a card sits alone on the bottom row, let it span full width. */
.fb-card:last-child:nth-child(odd) { grid-column: 1 / -1; }

@media (max-width: 920px) {
  .fb { padding: 2.5rem 0 3rem; }
  .fb__inner { padding: 0 1.25rem; }
  .fb__grid { grid-template-columns: 1fr; }
  .fb-card:last-child:nth-child(odd) { grid-column: auto; }
}
</style>
