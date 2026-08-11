<script setup lang="ts">
// Feedback summary for OFP-007. Rendered in the "Votes Received & Feedback" tab,
// appended under the live vote panel once voting has closed (see the parent
// ofp-007/index.vue: FeedbackPartial is glob-imported and shown when isClosed).
// This is an EDITORIAL synthesis of the vote — the raw, per-org votes are shown
// by the panel above. Quotes are drawn verbatim from voters' submitted comments
// and question answers.
//
// OFP-007 closed 3 Aug 2026 at 13 for / 0 against / 0 abstain. Five voters
// answered the questions; two left a written comment. The themes below reflect
// what those answers actually said: how the question is answered today, why the
// resolved forwarded URL is the part that pays for itself, a clear appetite for
// editing (which the proposal deliberately deferred), a request to restrict
// access by role before the page ships, and two adjacent asks that fall outside
// this proposal. Attribution is kept anonymous here (voters are named in the
// per-org panel above).

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
      'Every vote was in favour — 13 for, none against, none abstaining — across a broad cross-section of LFIs. No amendment was requested, and no voter argued that the information should stay where it is. The read-only scope was accepted as drawn; the disagreement, such as it was, is about what should come next rather than about this.',
  },
  {
    k: '02',
    title: 'Today the answer is reconstructed, not looked up',
    body:
      'The first question asked how an LFI finds out what its configuration is actually set to. The answers converge: keep a local record, search back through the onboarding and change tickets, and raise a ticket with Nebras when no confident answer can be found. Frequency ranged up to one or two checks a week, triggered by a forwarded request failing, a pre-production/production comparison, or onboarding a new engineer. One LFI named the failure mode precisely — a local record says what was intended, not what the Hub is enforcing.',
    quote: {
      text: 'Our record and the Hub’s record are two separate things. Our infrastructure code tells us what we intended to configure; it does not tell us what the Hub is actually enforcing. Where those have diverged, we have no way to detect it.',
      who: 'An LFI · For',
    },
  },
  {
    k: '03',
    title: 'The resolved forwarded URL is the part that earns its keep',
    body:
      'Two voters singled out the worked forwarded URL per API family, rather than the raw base paths, as the thing that changes their day. Showing the URL the Hub will actually call turns a 404 on a proxied request from a Service Desk ticket into something the LFI can diagnose from the screen in front of it. The same voter set the scaling problem out plainly: moving from one API Hub to two for SME takes them from one configuration to four across brands and environments, each distinguishable today only by reading ticket history in the right order.',
    quote: {
      text: 'Reconstructing those from ticket history is exactly the failure mode described, and the per-brand portal scoping solves it without anything for us to build. The resolved forwarded URL per API family would also materially shorten incident diagnosis.',
      who: 'An LFI · For',
    },
  },
  {
    k: '04',
    title: 'Read-only is enough for now — but editing has real appetite',
    body:
      'The second question asked whether LFIs would want to change these values themselves. Four of the five who answered said yes, and they named fields: the API family base paths and endpoint URLs, the LFI redirect URL (C3), and in one case every field on the page. Every one of them attached change control to the request — maker-checker or four-eyes approval, a restricted role modelled on PBC/PTC access in the Trust Framework, audit logging, and controlled promotion to production. None of them argued it should be folded into this proposal; the split the proposal drew was accepted, and editing will be brought forward separately.',
    quote: {
      text: 'Read-only is good enough for this proposal … That said, edit capability would also be valuable, but it should be treated as a separate enhancement … provided appropriate governance and change controls are in place (for example, role-based access, maker-checker approval, audit logging, and controlled deployment to production).',
      who: 'An LFI · For',
    },
  },
  {
    k: '05',
    title: 'Restrict the page by role before it ships',
    body:
      'The one condition attached to a “for” vote goes to the cost the proposal itself flagged: portal access is not role-differentiated today, so backend base URLs, internal paths, and egress IP addresses would become visible to every user the Trust Framework grants portal access. The request is that the section be limited to the technical roles before it is released — a requirement carried into implementation rather than a reason to hold the decision.',
    quote: {
      text: 'Portal access is not currently role-differentiated, so this section would expose backend URLs and internal paths to every user granted portal access. We would ask that it be restricted to the technical roles before it ships.',
      who: 'An LFI · For',
    },
  },
  {
    k: '06',
    title: 'Two adjacent asks, recorded but out of scope',
    body:
      'The third question — what else an LFI would want to see that it cannot see today — produced two requests that are not configuration and so fall outside this proposal. One is log search in the Admin Portal filtered first by Interaction ID, with a second-level keyword search within a single request journey. The other is replacing the mock-bank placeholder with the LFI\'s own base URL wherever it appears, which is a documentation and portal-copy fix rather than a new view. Both are recorded and will be taken up on their own merits.',
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
          unanimous; the substance is in the three questions on the form, which five voters answered. The full
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

/* A trailing card alone on the bottom row (odd count, 2 cols) spans full width. */
.fb-card:last-child:nth-child(odd) { grid-column: 1 / -1; }

@media (max-width: 920px) {
  .fb { padding: 2.5rem 0 3rem; }
  .fb__inner { padding: 0 1.25rem; }
  .fb__grid { grid-template-columns: 1fr; }
  .fb-card:last-child:nth-child(odd) { grid-column: auto; }
}
</style>
