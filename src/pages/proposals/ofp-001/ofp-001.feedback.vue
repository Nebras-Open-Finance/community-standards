<script setup lang="ts">
// Feedback summary for OFP-001. Rendered in the "Votes Received & Feedback" tab,
// appended under the live vote panel once voting has closed (see the parent
// index.vue: FeedbackPartial is glob-imported from this folder and shown when
// isClosed). This is an EDITORIAL synthesis of the themes that came through in
// the vote comments — the raw, per-org votes are shown by the panel above.
// Quotes are drawn verbatim from voters' submitted comments.

interface Theme {
  k: string
  title: string
  body: string
  quote?: { text: string; who: string }
}

const themes: Theme[] = [
  {
    k: '01',
    title: 'Alignment with POST /payments is welcomed',
    body:
      'Support was broad (16 of 18 in favour). The recurring reason was consistency: carrying the batch as a JSON array in a single signed request brings Bulk/Batch Payments into line with the existing payment APIs, and removes the under-specified file model that no LFI had implemented.',
    quote: {
      text: 'This change does simplify the integration model and aligns bulk payments with the existing POST /payments API pattern.',
      who: 'Aaqib Mir · Mashreq · For',
    },
  },
  {
    k: '02',
    title: 'Batch size and payload limits need defining',
    body:
      'The most frequent request, raised by several For-voters. Respondents asked for a maximum number of instructions per request and a defined payload size, citing API gateway, load balancer and memory limits, and the cost of signature validation on large payloads. The proposal sets no limit; this is recorded for the specification to define.',
    quote: {
      text: 'JSON should not be having entries more than 500, or a limit should be applied, more payments may impact payload body size, memory pressures.',
      who: 'Saba Wasim · ADCB, Al Hilal Bank · For',
    },
  },
  {
    k: '03',
    title: 'Per-payment tracking and status reporting',
    body:
      'Respondents asked for a unique identifier on each instruction — one suggested the UETR at transaction level — and for the response, acknowledgement and Get Payment payloads to be defined, since the execution report was previously a file. These are noted for the specification work and are not part of the approved change.',
    quote: {
      text: 'I suggest the inclusion of the Unique End-to-End Transaction Reference (UETR), utilizing the UUID Version 4 standard, at the transaction level.',
      who: 'Mahera Shaikh · Citibank NA, UAE · For',
    },
  },
  {
    k: '04',
    title: 'Consent and execution questions',
    body:
      'DIB raised points on the consent: when its status moves to consumed or expired, that RequestedExecutionDate at consent level puts every instruction on the same date, where future-dated scheduling is performed, and that individual payments are not visible to the customer at authorization. These are recorded as open questions for the specification.',
    quote: {
      text: 'Payment line items cannot be displayed at consent screen… giving no option to customer to validate individual payments at LFI’s platform.',
      who: 'Arif Saeed · DIB · For',
    },
  },
  {
    k: '05',
    title: 'One objection: ISO 20022 XML instead',
    body:
      'The single vote against proposed a different model rather than retaining the current one: ISO 20022 XML (pain.001) submitted over the APIs, citing build cost, the absence of a canonical JSON schema, and alignment with existing file-oriented corporate channels. It also asked Nebras to standardise payload limits, asynchronous processing and a common error model. The counter-proposal is outside this proposal’s scope and is recorded for separate consideration. The one abstention was submitted without comment.',
    quote: {
      text: 'Counter-proposal: Adopt ISO 20022 XML (file-based) submission via Open Finance APIs.',
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
