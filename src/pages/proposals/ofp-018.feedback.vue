<script setup lang="ts">
// Feedback summary for OFP-018. Rendered in the "Votes Received & Feedback" tab,
// appended under the live vote panel once voting has closed (ofp-018.vue
// glob-imports './ofp-018.feedback.vue' and shows it when isClosed). This is an
// EDITORIAL synthesis of the vote — the raw, per-org votes are shown by the
// panel above. Quotes are drawn verbatim from voters' submitted comments.
//
// OFP-018 closed 9 Nov 2026 at 3 for / 9 against / 1 abstain (13 votes). Six
// voters left a written comment. Attribution follows OFP-003: name · org · stance.

interface Theme {
  k: string
  title: string
  body: string
  quote?: { text: string; who: string }
}

const themes: Theme[] = [
  {
    k: '01',
    title: 'A majority against, led by LFIs',
    body:
      'Thirteen votes were cast — 3 for, 9 against, 1 abstaining. All nine against votes came from LFIs, five of them without a comment. Those that gave reasons pointed less at the idea than at what it would take to receive an application: onboarding capability that does not exist today, journeys that cannot take data in from outside, and safeguards they want defined first.',
    quote: {
      text: 'Citi doesn’t support automated retail onboarding capability',
      who: 'Sukhendu Banerjee · Citibank NA, UAE · Against',
    },
  },
  {
    k: '02',
    title: 'Onboarding journeys are not ready to take an application in',
    body:
      'Three LFIs described why their own onboarding cannot simply accept a submitted application. Journeys are fragmented and depend on external systems for data sourcing and customer validation; new products start from establishing KYC data through security checks that cannot be bypassed; and wiring submission, status, withdrawal, notifications and encryption into origination means substantial development and ongoing cost, particularly on legacy systems.',
    quote: {
      text: 'Our journeys for new products start mostly from establishing KYC data fields through various security checks, bypassing them will be difficult from both compliance and security perspective.',
      who: 'Rahul Bindroo · Ajman Bank · Against',
    },
  },
  {
    k: '03',
    title: 'A confirmation without a consent record',
    body:
      'The confirmation model drew the most specific comment, from both sides of the vote. A supporter asked for the legal basis to be confirmed, citing Article 17(3.1), and for a standard confirmation-evidence record and retention period rather than evidence held only by the TPP. An objector made the same point more strongly: with the TPP’s record as the source of truth and no centralised record in the API Hub, customer authorisation cannot be independently verified or traced across the ecosystem.',
    quote: {
      text: 'Model 1 relies on customer confirmation maintained by the TPP as the source of truth, without establishing a centralized consent record within the API Hub.',
      who: 'Preethi Iyer · Commercial Bank International PJSC · Against',
    },
  },
  {
    k: '04',
    title: 'Encrypted payloads and shared data need clear validation',
    body:
      'Because the API Hub cannot read the applicant payload, voters asked where validation sits. The requests were for published JSON schemas and sandbox validation so TPPs catch errors before encryption, a defined process for key publication and rotation, and clear responsibilities for the receiving LFI. In hybrid origination, the receiving LFI also has no way to verify that data retrieved from the Host LFI was not modified before submission.',
    quote: {
      text: 'The Hub can’t validate the encrypted payload. Please publish JSON schemas and sandbox validation so TPPs catch errors before encryption, and define key publication and rotation.',
      who: 'Aamir Lone · For',
    },
  },
  {
    k: '05',
    title: 'Support for the design, with questions before issue',
    body:
      'The voters in favour endorsed the shape of the journey — apply once through the TPP, with the bank keeping the decision — and asked for clarifications rather than changes: whether a hybrid origination consent purpose is consistent with Article 16(5), how a TPP may display the Approved status, and which Open Finance Licence option a TPP needs. One asked that mortgages and home finance follow in a later release; another placed the journey on the future roadmap, after MVP3.',
    quote: {
      text: 'Applying once through the TPP, with the bank keeping KYC, credit assessment and the decision, is the right design.',
      who: 'Aamir Lone · For',
    },
  },
  {
    k: '06',
    title: 'UAE PASS suggested as an identity route',
    body:
      'One objector proposed using UAE PASS for customer authentication, identity verification and application authorisation, to strengthen verification and reduce duplication in the journey — while keeping an alternative route for customers without UAE PASS, and leaving KYC and regulatory checks with the LFI. This is outside the proposal as written and is recorded for separate consideration.',
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
          A short synthesis of the comments behind the tally above. Six of the thirteen voters left a
          written comment. The full per-organisation votes are listed in the panel; these are the themes
          that shaped the outcome.
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
.fb__lede { font-size: 1rem; line-height: 1.65; color: var(--at-mute-2); margin: 1.1rem 0 0; }
.fb__grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
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
.fb-card__body { font-size: 14.5px; line-height: 1.62; color: var(--at-navy); margin: 0; text-wrap: pretty; }
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
