<script setup lang="ts">
// Feedback summary for OFP-003. Rendered in the "Votes Received & Feedback" tab,
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
    title: 'A uniform character set is wanted',
    body:
      'Support was broad (14 of 18 in favour). The recurring reason was consistency: LFIs and TPPs want one set that every institution accepts and stores, so a reference that validates at the API Hub is not rejected or altered downstream.',
    quote: {
      text: 'Keep uniformity across all LFIs which will ease the integration and understanding of debtor and creditor references. Easy to process the reference using open APIs.',
      who: 'George Kirubaharan Devathomas · ADIB · For',
    },
  },
  {
    k: '02',
    title: 'Arabic cannot be carried end-to-end today',
    body:
      'The decisive theme, and the reason for the amendment. Both remaining objections to the character set itself — and several For-voters — reported that Arabic is not supported across SWIFT, the UAEFTS rail, and core banking systems. Where a customer enters Arabic, TPPs transliterate it to Latin before submission.',
    quote: {
      text: 'Our core systems do not support Arabic characters by default… From a SWIFT perspective, MT messages do not support Arabic characters. FTS — Arabic chars are not allowed in remittance info as per CB SSM.',
      who: 'Pradeepkumar Rayapati · FAB · Against',
    },
  },
  {
    k: '03',
    title: 'The SWIFT “x” set is the safe baseline',
    body:
      'The Latin baseline was independently confirmed as workable. FAB reported its core supports exactly A–Z, a–z, 0–9 and ' + "' ( ) + , - . : /" + ' — the ISO 20022 / SWIFT “x” set — and other TPPs said they already validate against the approved SWIFT characters. This is the set the decision adopts.',
    quote: {
      text: 'Most payments, especially those that travel on SWIFT networks, can only be sent using the English character set… we always validate against approved SWIFT characters.',
      who: 'Mike Nagavalli · GrowX · For',
    },
  },
  {
    k: '04',
    title: 'One ask to go narrower — handled via guidance',
    body:
      'A single voter asked for a stricter subset (A–Z 0–9 space - /, avoiding + ’ : ?) to guarantee survivability across every rail. We acknowledge the concern but did not narrow the enforced set — that would reject ordinary references for everyone. Survivability is instead steered through the Structured Reference guidance.',
    quote: {
      text: 'If we aim to guarantee survivability across AANI / IPP / UAEFTS, banks are recommended to use a stricter practical subset… prefer a structured format: INV-123456, REF-202406-ABC.',
      who: 'Aishwarya Venugopal · Mashreq · For',
    },
  },
  {
    k: '05',
    title: 'A separate ask on length',
    body:
      'One objection was not about characters at all: a request to widen the 35-character limit toward the 140-character SWIFT/AEP remittance field, chiefly for B2B reconciliation. That is a length question outside this proposal’s scope; it is recorded for separate consideration and did not affect this decision.',
    quote: {
      text: 'Limiting this field to only 35 characters will raise RFIs for banks. This is more important for B2B customers, where they supply extensive information in this field for reconciliation.',
      who: 'AQ Mohammed · DIB · Against',
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
