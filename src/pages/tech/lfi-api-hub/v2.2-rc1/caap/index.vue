<route lang="yaml">
meta:
  title: CAAP
  isIndex: true
</route>

<script setup lang="ts">
interface OverviewCard {
  href: string
  cat: string
  color: string
  title: string
  desc: string
}

const cards: OverviewCard[] = [
  {
    href: '/tech/lfi-api-hub/v2.2-rc1/caap/user-experience',
    cat: 'User Experience',
    color: 'var(--at-gold)',
    title: 'User Experience',
    desc: 'The end-to-end end user journey CAAP delivers &mdash; EFR / UAE Pass authentication, OTP, consent review, and the authorization page itself.',
  },
  {
    href: '/tech/lfi-api-hub/v2.2-rc1/caap/api-guide',
    cat: 'API Guide',
    color: 'var(--at-teal)',
    title: 'API Guide',
    desc: 'Implementation guide for the CAAP Operations endpoints the LFI MUST build on Ozone Connect &mdash; registration, account and policy selection, and validation.',
  },
  {
    href: '/tech/lfi-api-hub/v2.2-rc1/caap/pricing',
    cat: 'Pricing',
    color: 'var(--at-navy)',
    title: 'Pricing',
    desc: 'Commercial terms for adopting CAAP, including what is included in the service and what remains the LFI’s responsibility.',
  },
]
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          LFI · CAAP
        </div>
        <h1 class="ed-doc__title">
          Central Authentication and Authorization Platform
          <span class="ed-doc__read">3 min read</span>
        </h1>
        <p class="ed-doc__lede">
          <strong>CAAP</strong> is a Nebras-operated platform that handles the customer-facing authentication
          and consent authorisation experience on behalf of an LFI.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="what-caap-is"
      num="01"
      color="var(--at-teal)"
      eyebrow="What CAAP is"
      title="A Nebras-operated authentication and consent experience"
      tone="cream"
    >
      <EdProse>
        When a TPP creates a consent and the end user is redirected for authentication and authorisation,
        a CAAP-adopting LFI sends the end user to <strong>CAAP</strong> rather than to an LFI-operated
        authorization endpoint. CAAP authenticates the end user (via EFR or UAE Pass), presents the
        consent for approval, and completes the interaction with the API Hub on the LFI&apos;s behalf.
      </EdProse>

      <EdProse>
        CAAP also presents the consent management interface end users use to review and revoke their
        consents. The LFI does not build or operate either of these experiences. The LFI&apos;s
        integration with CAAP is server-to-server only: CAAP calls a set of CAAP Operations endpoints
        on the LFI&apos;s Ozone Connect server to drive identification, validation, and account /
        policy selection against the LFI&apos;s systems of record.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="what-caap-replaces"
      num="02"
      color="var(--at-gold)"
      eyebrow="What CAAP replaces"
      title="The work an LFI no longer has to deliver"
      tone="surface"
    >
      <EdProse>
        Adopting CAAP removes two substantial pieces of Open Finance delivery from the LFI&apos;s scope.
        The documentation for these areas remains in this site for LFIs that operate their own
        implementations, but is <strong>not applicable</strong> if you adopt CAAP:
      </EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Capability</th>
              <th>Who delivers it without CAAP</th>
              <th>Who delivers it with CAAP</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Authentication and consent authorisation UX</strong></td>
              <td>LFI &mdash; see <a href="/tech/lfi-api-hub/v2.2-rc1/consent-journey/authentication">Consent Journey &rarr; Authentication</a> and <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/environment-specific/auth-endpoint">Authorization Endpoint</a>.</td>
              <td>CAAP</td>
            </tr>
            <tr>
              <td><strong>Consent Management Interface</strong></td>
              <td>LFI &mdash; see <a href="/tech/lfi-api-hub/v2.2-rc1/consent-management-interface/">Consent Management Interface</a>.</td>
              <td>CAAP</td>
            </tr>
            <tr>
              <td><strong>Headless Heimdall and Consent Manager integration</strong></td>
              <td>LFI &mdash; see <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/headless-heimdall/">Headless Heimdall</a> and <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/">Consent Manager</a>.</td>
              <td>CAAP</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdNote type="info" title="Still in scope for the LFI">
        <p>
          The LFI MUST still implement its Ozone Connect endpoints for <a href="/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/">Bank Data Sharing</a>,
          <a href="/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/">Bank Service Initiation</a>,
          <a href="/tech/lfi-api-hub/v2.2-rc1/insurance/">Insurance Data Sharing</a>, and the other
          Ozone Connect APIs. CAAP handles authentication and consent, not data and payments. In
          addition, the LFI MUST implement the CAAP Operations APIs documented in this section so that
          CAAP can drive end user verification, registration, PII decryption, and consent validation against
          the LFI&apos;s own systems of record.
        </p>
      </EdNote>
    </EdSectionBand>

    <section class="ed-doc__cards">
      <div class="ed-doc__inner">
        <div class="ed-doc__cards-head">
          <div class="ed-doc__cards-eyebrow">
            <span class="ed-doc__eyebrow-dash" />
            Browse this section
          </div>
          <h2 class="ed-doc__cards-title">Where to go next</h2>
        </div>

        <div class="ed-doc__cards-grid">
          <a
            v-for="card in cards"
            :key="card.href"
            class="ed-link-card"
            :href="card.href"
            :style="{ '--card-color': card.color }"
          >
            <span class="ed-link-card__top" />
            <div class="ed-link-card__meta"><span class="ed-link-card__cat">{{ card.cat }}</span></div>
            <h3 class="ed-link-card__title">{{ card.title }}</h3>
            <p class="ed-link-card__desc" v-html="card.desc" />
            <div class="ed-link-card__foot"><span class="ed-link-card__cta">Open</span><span class="ed-link-card__arrow">&rarr;</span></div>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.ed-doc { background: var(--at-bg-cream); color: var(--at-navy-deep); font-family: var(--at-sans); padding-top: 4.25rem; min-height: 100vh; }
.ed-doc__hero { background: var(--at-bg-cream); border-bottom: 1px solid var(--at-grid-line); }
.ed-doc__inner { max-width: var(--at-page-max); margin: 0 auto; padding: 4rem 2rem 3rem; }
.ed-doc__eyebrow { font-family: var(--at-mono); font-size: 0.68rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--at-teal); margin-bottom: 1.25rem; display: flex; align-items: center; gap: 0.75rem; }
.ed-doc__eyebrow-dash { width: 24px; height: 1px; background: currentColor; }
.ed-doc__title { font-family: var(--at-serif); font-size: clamp(2.25rem, 5vw, 3.6rem); font-weight: 600; line-height: 1.02; letter-spacing: -0.03em; margin: 0; display: flex; align-items: baseline; flex-wrap: wrap; gap: 0.85rem; }
.ed-doc__read { font-family: var(--at-mono); font-size: 0.7rem; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 500; color: var(--at-mute); align-self: center; padding-left: 0.6rem; border-left: 1px solid var(--at-grid-line-2); }
.ed-doc__lede { font-family: var(--at-sans); font-size: 1.1rem; line-height: 1.65; margin: 1.75rem 0 0; max-width: 50rem; color: var(--at-mute-2); }
.ed-doc__lede :deep(strong) { color: var(--at-navy-deep); font-weight: 600; }
.ed-doc__lede :deep(a) { color: var(--at-teal-deep); text-decoration: none; border-bottom: 1px solid currentColor; }

.ed-doc__cards { background: var(--at-surface); border-top: 1px solid var(--at-grid-line); padding: 3.5rem 0 4.5rem; }
.ed-doc__cards .ed-doc__inner { padding-top: 0; padding-bottom: 0; }
.ed-doc__cards-head { margin-bottom: 1.85rem; }
.ed-doc__cards-eyebrow { font-family: var(--at-mono); font-size: 0.68rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--at-teal); margin-bottom: 1rem; display: flex; align-items: center; gap: 0.75rem; }
.ed-doc__cards-title { font-family: var(--at-serif); font-size: clamp(1.5rem, 2.6vw, 2rem); font-weight: 600; letter-spacing: -0.02em; line-height: 1.1; margin: 0; color: var(--at-navy-deep); }
.ed-doc__cards-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr)); gap: 1.25rem; }

.ed-link-card { position: relative; display: flex; flex-direction: column; background: var(--at-bg-cream); border: 1px solid var(--at-grid-line); padding: 2rem 1.75rem 1.5rem; text-decoration: none; color: inherit; transition: border-color 0.2s ease, transform 0.2s ease; }
.ed-link-card:hover { border-color: var(--card-color, var(--at-navy)); transform: translateY(-2px); }
.ed-link-card__top { position: absolute; top: 0; left: 0; width: 48px; height: 3px; background: var(--card-color, var(--at-navy)); }
.ed-link-card__meta { display: flex; align-items: center; gap: 0.65rem; margin-bottom: 0.85rem; font-family: var(--at-mono); font-size: 0.62rem; letter-spacing: 0.12em; text-transform: uppercase; flex-wrap: wrap; }
.ed-link-card__cat { font-weight: 700; color: var(--card-color, var(--at-navy)); }
.ed-link-card__title { font-family: var(--at-serif); font-size: 1.4rem; font-weight: 500; line-height: 1.2; letter-spacing: -0.02em; color: var(--at-navy-deep); margin: 0 0 0.85rem; }
.ed-link-card__desc { font-family: var(--at-sans); font-size: 0.95rem; line-height: 1.6; color: var(--at-mute-2); margin: 0 0 1.1rem; flex: 1; }
.ed-link-card__foot { display: flex; align-items: center; justify-content: space-between; padding-top: 0.85rem; border-top: 1px solid var(--at-grid-line); font-family: var(--at-mono); font-size: 0.66rem; letter-spacing: 0.14em; text-transform: uppercase; font-weight: 700; color: var(--at-mute); }
.ed-link-card__arrow { color: var(--card-color, var(--at-navy)); transition: transform 0.2s ease; }
.ed-link-card:hover .ed-link-card__arrow { transform: translateX(4px); }

@media (max-width: 720px) { .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; } .ed-doc__cards { padding: 2.5rem 0 3.25rem; } }
</style>
