<script setup lang="ts">
// Feedback summary for OFP-006. Rendered in the "Votes Received & Feedback" tab,
// appended under the live vote panel once voting has closed (see the parent
// ofp-006.vue: FeedbackPartial is glob-imported and shown when isClosed).
// This is an EDITORIAL synthesis of the vote — the raw, per-org votes are shown
// by the panel above. Quotes are drawn verbatim from voters' submitted comments
// and question answers.
//
// OFP-006 closed 10 Aug 2026 at 6 for / 0 against / 0 abstain — unanimous, but
// 6 of 24 eligible voters, the lowest turnout of any proposal so far. Four of the
// six answered the two questions; three left a written comment. The themes below
// separate the two things the vote actually established: broad agreement that the
// path is the right place to carry the version, and almost no evidence that any
// LFI needs it today. The fourth theme is the decisive one — the single LFI that
// dual-runs in production has already built the workaround. Attribution is kept
// anonymous here (voters are named in the per-org panel above).

interface Theme {
  k: string
  title: string
  body: string
  quote?: { text: string; who: string }
}

const themes: Theme[] = [
  {
    k: '01',
    title: 'Unanimous, and thin',
    body:
      'Every vote was in favour — 6 for, none against, none abstaining — and no voter asked for the proposal to be amended or narrowed. But six votes is a quarter of the eligible electorate and the lowest turnout of any proposal to date, against thirteen on OFP-007. Two of the six answered neither question. On a proposal whose central section asked the ecosystem to justify a build, a light turnout is itself a finding: the LFIs who did not vote are not, on this evidence, waiting for it.',
  },
  {
    k: '02',
    title: 'Nobody disputed that the path is the right place',
    body:
      'On the mechanism there was no argument at all. Voters described path-based versioning as standard practice, and the most detailed answer set out benefits the proposal had not claimed — that carrying the version through to the internal integration API keeps code maintenance tractable, and that it allows an old version to be deprecated at the gateway rather than inside the application. The engineering judgement in the proposal was accepted. What the vote did not establish is that it needs to be built now.',
    quote: {
      text: 'Relative path versioning is best as per industrial practice.',
      who: 'An LFI · For',
    },
  },
  {
    k: '03',
    title: 'Every yes was about a version that does not exist yet',
    body:
      'The first question asked whether an LFI would route on the substituted path rather than the header, and whether it would move existing routing over or use the token only for new versions. Two answered "only for new versions" in almost identical words. A third said it is not running versions in parallel at all and would revisit when it does. Not one voter said it would migrate routing it operates today. The support is real, but it is entirely forward-looking — which places the earliest point at which it could be used at the next major version transition.',
    quote: {
      text: 'We’re not currently running versions in parallel. When we do support multiple versions, we’d still keep API Hub as the decision point and route on the configured path, with o3-api-uri treated as informational/for logging rather than as the routing key.',
      who: 'An LFI · For',
    },
  },
  {
    k: '04',
    title: 'The one LFI that dual-runs has already built the workaround',
    body:
      'The second question asked who dual-runs today and what it costs to operate. One voter — the only one running concurrent versions end to end — described exactly the pattern the proposal set out to remove: intercept the header, substitute the version into the internal URI path, route on that. It is built, it is in production, and the answer named no operating cost. This is the most consequential answer in the vote. The proposal rests on the workaround being a burden LFIs are carrying; the only LFI carrying it has paid for it once and did not ask to be relieved of it.',
    quote: {
      text: 'we do dual run versions in our api end to end. currently we are intercepting the header and form internal APIs by substituting version in the URI path',
      who: 'An LFI · For',
    },
  },
  {
    k: '05',
    title: 'Backward compatibility, not dual-running, is the prevailing plan',
    body:
      'Two voters described their approach to the next major version as a single implementation that stays compatible with the prior one — moving straight to the new version while remaining backward compatible with the version before it. If that is how most LFIs meet the concurrent-running obligation, there is little for a path-based router to route: one deployment answers both versions. That does not make the token wrong, but it narrows the population that would gain anything from it well below what a change on the API Hub request path needs to justify itself.',
    quote: {
      text: 'We plan to run the latest version while remaining backwards compatible to earlier 1 version',
      who: 'An LFI · For',
    },
  },
  {
    k: '06',
    title: 'The only question asked back was about timing',
    body:
      'Three voters left a written comment, and the one question put back to Nebras was when the change would land if it were supported. It is answered directly in the Outcome tab: it has not been scheduled, it will not appear in an API Hub release, and there is no timeline to give. The proposal is deferred on evidence of demand rather than on merit, and Nebras will bring it back at the next major version transition — when the LFIs answering these two questions will be answering from operational experience instead of from intention.',
    quote: {
      text: 'if the change would be supported, we would like to ask the possible implementation timelines.',
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
          A short synthesis of the votes, comments, and question answers behind the tally above. Support was
          unanimous but the turnout was the lowest of any proposal so far, and the substance is in the two
          questions on the form, which four of the six voters answered. The full per-organisation votes are
          listed in the panel.
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
