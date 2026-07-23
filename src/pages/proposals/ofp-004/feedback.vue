<script setup lang="ts">
// Feedback summary for OFP-004. Rendered in the "Votes Received & Feedback" tab,
// appended under the live vote panel once voting has closed (see the parent
// ofp-004/index.vue: FeedbackPartial is glob-imported and shown when isClosed). This
// is an EDITORIAL synthesis of the vote — the raw, per-org votes are shown by
// the panel above. Quotes are drawn verbatim from voters' submitted comments.
//
// OFP-004 closed 22 Jul 2026 at 12 for / 0 against / 0 abstain. Only two voters
// left a comment; the rest recorded a bare "For". The themes below reflect that:
// broad, unqualified support, with the two comments speaking to the field
// evidence and the "validation-only" reassurance respectively. Attribution is
// kept anonymous here (voters are named in the per-org panel above).

interface Theme {
  k: string
  title: string
  body: string
  quote?: { text: string; who: string }
}

const themes: Theme[] = [
  {
    k: '01',
    title: 'Unanimous, with no dissent',
    body:
      'Every vote was in favour — 12 for, none against, none abstaining — across a broad cross-section of the ecosystem, LFIs and TPPs alike. No amendment was requested and no objection was raised to the 15-minute floor or to applying it to both expiry fields.',
  },
  {
    k: '02',
    title: 'The field confirms dead-on-arrival consents',
    body:
      'The one detailed endorsement came from an LFI that had directly observed the problem the proposal describes — consents created with only seconds or minutes of headroom, lapsing before the customer can finish authorising. They also backed extending the same floor to AuthorizationExpirationDateTime for multi-authorisation payments, calling the whole change a simple validation-and-documentation fix with minimal impact on legitimate short-lived consents.',
    quote: {
      text: 'We’ve observed consents being created with an ExpirationDateTime only seconds/minutes ahead, which can expire before the customer completes the redirect + authentication + authorization/approval flow and the TPP makes the first call. These consents are effectively dead on arrival.',
      who: 'An LFI · For',
    },
  },
  {
    k: '03',
    title: 'Reassurance that the lifecycle is untouched',
    body:
      'The main risk flagged during drafting was whether this touched the consent status model. Another LFI’s vote answered it directly: their only note was that the change is safe precisely because it does not affect the consent lifecycle — which matches the decision, a validation-only bound that leaves the status model and the Hub’s handling of unauthorised consents unchanged.',
    quote: {
      text: 'I have no concerns with this change, as it does not affect the consent lifecycle.',
      who: 'An LFI · For',
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
          A short synthesis of the votes and comments behind the tally above. Support was unanimous and
          largely wordless — two voters left a comment; the rest recorded a plain “For”. The full
          per-organisation votes are listed in the panel.
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

/* Last card sits alone on the bottom row (3 cards, 2 cols) — let it span full. */
.fb-card:last-child:nth-child(odd) { grid-column: 1 / -1; }

@media (max-width: 920px) {
  .fb { padding: 2.5rem 0 3rem; }
  .fb__inner { padding: 0 1.25rem; }
  .fb__grid { grid-template-columns: 1fr; }
  .fb-card:last-child:nth-child(odd) { grid-column: auto; }
}
</style>
