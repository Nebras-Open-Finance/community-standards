<script setup lang="ts">
// Feedback summary for OFP-013. Rendered in the "Votes Received & Feedback" tab,
// appended under the live vote panel once voting has closed (see ofp-013.vue:
// FeedbackPartial is glob-imported and shown when isClosed).
// This is an EDITORIAL synthesis of the vote — the raw, per-person votes are
// shown by the panel above. Quotes are drawn verbatim from voters' submitted
// comments and question answers, attributed as on OFP-003.
//
// OFP-013 closed 7 Oct 2026 at 3 for / 5 against / 0 abstain.

interface Theme {
  k: string
  title: string
  body: string
  quote?: { text: string; who: string }
}

const themes: Theme[] = [
  {
    k: '01',
    title: 'The problem was not disputed',
    body:
      'No voter argued that discovery resolves the right instance today. The three votes in favour accepted the change as drawn, on the understanding that attempts would be sequential, stop at a definitive result, and leave existing CoP endpoints and contracts untouched. The disagreement was about the remedy.',
    quote: {
      text: 'Based on our understanding, under the proposal, discovery would return an array of every instance that supports CoP for that bank code. TPP would query instances sequentially, stopping when an instance returns a definitive result.',
      who: 'Sena Ozturk · HSBC · For',
    },
  },
  {
    k: '02',
    title: 'Fan-out multiplies the load',
    body:
      'The decisive theme. LFIs objected that returning every instance turns one payee check into several calls, and that the cost of that traffic lands on the LFI even though the charges do not. One LFI running at least five servers put the increase at five-fold.',
    quote: {
      text: 'As an LFI with at least 5 servers the 5x fold increase in COP traffic is unjustified.',
      who: 'Abdulla Mashaal · Emirates NBD · Against',
    },
  },
  {
    k: '03',
    title: 'Route inside the bank, not across it',
    body:
      'Several LFIs described resolving the segment themselves. Emirates NBD already checks every segment for an IBAN behind its CoP solution; DIB runs one core for all segments and asked that such LFIs be identified and called once. Mashreq proposed an account type in the request so the Hub can return a single endpoint.',
    quote: {
      text: 'If TPPs provide the AccountType, and each AccountType maps to a single authorization server for a given version, then Ozone should be able to identify the correct authorization server and return only that endpoint.',
      who: 'Aaqib Mir · Mashreq · Against',
    },
  },
  {
    k: '04',
    title: 'Charging for legs that found nothing — views split',
    body:
      'The second question asked whether a 204 should remain chargeable under fan-out. Mashreq and Emirates NBD said charges should follow the payee check as a whole, not each attempt; DIB said each call made should be charged. The proposal did not change pricing, and neither does this decision.',
    quote: {
      text: 'We believe charges should reflect the overall payee verification outcome rather than each individual fan-out attempt.',
      who: 'Aaqib Mir · Mashreq · Against',
    },
  },
  {
    k: '05',
    title: 'Brand, organisation, and opting out',
    body:
      'Two further points sat beside the main objection. One voter noted that the endpoint returns details by organisation rather than by brand, which bears on how instances are told apart. Another said it would opt out of the change and asked that it remain optional. Both are recorded; neither alters the outcome.',
    quote: {
      text: 'We will opt out of this change and recommend it remains optional.',
      who: 'Abdulla Mashaal · Emirates NBD · Against',
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
          A short synthesis of the comments and question answers behind the tally above. Five of eight votes
          were against, and four of those five came with reasons. The full per-organisation votes are listed in
          the panel; these are the themes that shaped the outcome.
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

.fb-card:last-child:nth-child(odd) { grid-column: 1 / -1; }

@media (max-width: 920px) {
  .fb { padding: 2.5rem 0 3rem; }
  .fb__inner { padding: 0 1.25rem; }
  .fb__grid { grid-template-columns: 1fr; }
  .fb-card:last-child:nth-child(odd) { grid-column: auto; }
}
</style>
