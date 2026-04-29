<route lang="yaml">
meta:
  title: Consent Management Interface
  isIndex: true
</route>

<script setup lang="ts">
interface Journey {
  name: string
  what: string
}

const journeys: Journey[] = [
  {
    name: 'View &amp; Manage',
    what: `See a dashboard of all consents &mdash; active and historical &mdash; with enough detail
           to understand what each consent permits, and click through to manage any individual
           consent`,
  },
  {
    name: 'Consent Revocation',
    what: `Cancel a consent, triggering revocation at the API Hub with a clear confirmation of
           what happens to data or payments already processed`,
  },
]
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          LFI · API Hub · v2.1 · Consent Management Interface
        </div>
        <h1 class="ed-doc__title">
          Consent Management Interface
          <span class="ed-doc__read">2 min read</span>
        </h1>
        <p class="ed-doc__lede">
          Every LFI must provide a Consent Management Interface (CMI) &mdash; a section of their
          digital banking application where customers can see all active and historical consents
          they have granted to third party providers, and take action on them.
          <strong>The CMI is a requirement, not an optional feature.</strong>
        </p>
        <p class="ed-doc__lede ed-doc__lede--tight">
          The LFI CMI serves as the primary transparency and control mechanism for customers within
          the LFI's own product. It complements the consent management interfaces provided by TPPs.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="must-support"
      num="01"
      color="var(--at-teal)"
      eyebrow="Two core journeys"
      title="What the CMI must support"
      tone="cream"
    >
      <EdProse>A compliant CMI covers two core user journeys:</EdProse>
      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Journey</th>
              <th>What the customer does</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="j in journeys" :key="j.name">
              <td><strong v-html="j.name" /></td>
              <td v-html="j.what" />
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdNote type="info" title="No Pause">
        <p>
          Unlike the TPP CMI, the LFI CMI does not support <strong>Pause</strong> and
          <strong>Reactivate</strong>. Pause is a TPP-only concept that does not affect the consent
          state at the API Hub.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="view-and-manage"
      num="02"
      color="var(--at-gold)"
      eyebrow="Dashboard + detail"
      title="View &amp; manage"
      tone="surface"
    >
      <EdProse>
        The CMI must present consent information at two levels:
      </EdProse>

      <div class="ed-doc__levels">
        <article class="ed-doc__level">
          <header class="ed-doc__level-head">
            <span class="ed-doc__level-tag">Level 1</span>
            <h3 class="ed-doc__level-title">Dashboard</h3>
          </header>
          <p class="ed-doc__level-body">
            Lists all consents the customer has granted to TPPs via this LFI, with enough detail to
            identify each one. The information shown varies by consent type; see
            <a href="/tech/lfi-api-hub/v2.1/consent-management-interface/user-experience">User Experience</a>
            for the required fields for Data Sharing and Service Initiation consents.
          </p>
          <p class="ed-doc__level-body">
            Any consent can be selected to open its detail page.
          </p>
        </article>

        <article class="ed-doc__level">
          <header class="ed-doc__level-head">
            <span class="ed-doc__level-tag">Level 2</span>
            <h3 class="ed-doc__level-title">Detail page</h3>
          </header>
          <p class="ed-doc__level-body">
            Shows the full parameters of a consent exactly as they were defined at consent
            creation. The detail page also hosts the <strong>Revoke</strong> action button where
            applicable, and &mdash; for long-lived payment consents &mdash; a full log of payments
            initiated under that consent.
          </p>
        </article>
      </div>
    </EdSectionBand>

    <EdSectionBand
      id="revocation"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Cancel access"
      title="Consent revocation"
      tone="cream"
    >
      <EdProse>
        For any consent in the <code>Authorized</code>, <code>AwaitingAuthorization</code>, or
        <code>Suspended</code> state, the option to revoke must be present on the detail page. When
        a customer revokes a consent, the LFI must:
      </EdProse>

      <ol class="ed-doc__steps">
        <li>
          Present a <strong>single confirmation page</strong> that clearly describes the impact
          &mdash; what the TPP will lose access to and what happens to any data already retrieved.
        </li>
        <li>
          Update the consent status to <code>Revoked</code> via the Consent Manager API.
        </li>
      </ol>

      <EdNote type="info">
        <p>
          Single-use consents that have already been submitted (such as a Single Instant Payment
          that has completed) are <strong>irrevocable</strong>. Do not display a revoke button for
          consents in the <code>Consumed</code> state.
        </p>
      </EdNote>
    </EdSectionBand>
  </div>
</template>

<style scoped>
.ed-doc {
  background: var(--at-bg-cream);
  color: var(--at-navy-deep);
  font-family: var(--at-sans);
  padding-top: 4.25rem;
  min-height: 100vh;
}

.ed-doc__hero { background: var(--at-bg-cream); border-bottom: 1px solid var(--at-grid-line); }
.ed-doc__inner { max-width: var(--at-page-max); margin: 0 auto; padding: 4rem 2rem 3rem; }

.ed-doc__eyebrow {
  font-family: var(--at-mono);
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--at-teal);
  margin-bottom: 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.ed-doc__eyebrow-dash { width: 24px; height: 1px; background: currentColor; }

.ed-doc__title {
  font-family: var(--at-serif);
  font-size: clamp(2.25rem, 5vw, 3.6rem);
  font-weight: 600;
  line-height: 1.02;
  letter-spacing: -0.03em;
  margin: 0;
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.85rem;
}

.ed-doc__read {
  font-family: var(--at-mono);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 500;
  color: var(--at-mute);
  align-self: center;
  padding-left: 0.6rem;
  border-left: 1px solid var(--at-grid-line-2);
}

.ed-doc__lede {
  font-family: var(--at-sans);
  font-size: 1.1rem;
  line-height: 1.65;
  margin: 1.75rem 0 0;
  max-width: 50rem;
  color: var(--at-mute-2);
}
.ed-doc__lede--tight { margin-top: 0.85rem; }
.ed-doc__lede strong { color: var(--at-navy-deep); font-weight: 600; }

/* Two-level cards (Dashboard / Detail page) */
.ed-doc__levels {
  margin-top: 1.25rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(22rem, 1fr));
  gap: 1.25rem;
}
.ed-doc__level {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  padding: 1.6rem 1.75rem 1.5rem;
  background: var(--at-bg-cream);
  border: 1px solid var(--at-grid-line);
}
.ed-doc__level::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 3px;
  background: var(--at-teal-deep);
}
.ed-doc__level-head { display: flex; flex-direction: column; gap: 0.35rem; }
.ed-doc__level-tag {
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-teal-deep);
}
.ed-doc__level-title {
  font-family: var(--at-serif);
  font-size: 1.35rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--at-navy-deep);
  margin: 0;
}
.ed-doc__level-body {
  font-family: var(--at-sans);
  font-size: 0.97rem;
  line-height: 1.65;
  color: var(--at-mute-2);
  margin: 0;
}
.ed-doc__level-body strong { color: var(--at-navy-deep); font-weight: 600; }
.ed-doc__level-body code {
  font-family: var(--at-mono);
  font-size: 0.86em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  color: var(--at-navy-deep);
  padding: 0.08em 0.4em;
}
.ed-doc__level-body a {
  color: var(--at-navy-deep);
  text-decoration: underline;
  text-underline-offset: 3px;
}
.ed-doc__level-body a:hover { color: var(--at-teal-deep); }

/* Numbered steps */
.ed-doc__steps {
  list-style: none;
  margin: 1rem 0 0;
  padding: 0;
  counter-reset: step-counter;
  max-width: 56rem;
}
.ed-doc__steps > li {
  position: relative;
  counter-increment: step-counter;
  padding: 0.85rem 0 0.85rem 2.6rem;
  border-bottom: 1px solid var(--at-grid-line);
  font-family: var(--at-sans);
  font-size: 0.98rem;
  line-height: 1.65;
  color: var(--at-mute-2);
}
.ed-doc__steps > li:last-child { border-bottom: 0; }
.ed-doc__steps > li::before {
  content: counter(step-counter);
  position: absolute;
  left: 0;
  top: 0.95rem;
  width: 1.6rem;
  height: 1.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--at-navy-deep);
  color: var(--at-bg-cream);
  font-family: var(--at-mono);
  font-size: 0.75rem;
  font-weight: 700;
}
.ed-doc__steps strong { color: var(--at-navy-deep); font-weight: 600; }
.ed-doc__steps code {
  font-family: var(--at-mono);
  font-size: 0.86em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  color: var(--at-navy-deep);
  padding: 0.08em 0.4em;
}

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
  .ed-doc__levels { grid-template-columns: 1fr; }
}
</style>
