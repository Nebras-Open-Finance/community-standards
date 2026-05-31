<route lang="yaml">
meta:
  title: Authorization
  isIndex: true
</route>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          LFI · Consent Journey · Authorization
        </div>
        <h1 class="ed-doc__title">
          Authorization
          <span class="ed-doc__read">3 min read</span>
        </h1>
        <p class="ed-doc__lede">
          Once the end user has been
          <a href="/tech/lfi-api-hub/v2.1/consent-journey/authentication/">authenticated</a>,
          the LFI presents the consent details so the end user can review and approve (or decline) the
          request. This is the <strong>authorization</strong> step &mdash; the end user makes an informed
          decision about granting the TPP access to their accounts or authorizing a payment.
        </p>
        <p class="ed-doc__lede ed-doc__lede--tight">
          The exact content of the authorization page varies by consent type. Each consent type defines
          its own authorization page requirements in its User Experience section.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="where-it-sits"
      num="01"
      color="var(--at-teal)"
      eyebrow="Where authorization sits in the consent flow"
      title="After authentication, before the redirect back to the TPP"
      tone="cream"
    >
      <ImageViewer
        src="/images/journeys/oauth-wireframe.png"
        alt="OAuth flow"
      />

      <EdBullets>
        <li>The TPP creates a consent and receives a redirect URI from the API Hub</li>
        <li>The end user's device opens the LFI's <strong>Authorization Endpoint</strong></li>
        <li>The LFI authenticates the end user using Strong Customer Authentication (SCA)</li>
        <li><strong>The LFI presents the consent for authorization</strong></li>
        <li>The LFI completes the interaction and redirects back to the TPP.</li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="principles"
      num="02"
      color="var(--at-gold)"
      eyebrow="Principles"
      title="Eight principles that govern every authorization page"
      tone="surface"
    >
      <EdProse>
        The following principles govern authorization pages across all consent types:
      </EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th style="width:3rem">#</th>
              <th>Principle</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td><strong>AlTareq branding</strong></td>
              <td>The AlTareq logo and ecosystem branding MUST be displayed on every authorization page. The end user MUST be able to clearly identify that the authorization is part of the AlTareq Open Finance ecosystem. Action buttons and naming conventions related to AlTareq MUST be preserved.</td>
            </tr>
            <tr>
              <td>2</td>
              <td><strong>Informed consent</strong></td>
              <td>The authorization page MUST clearly explain what the end user is authorizing. All material details &mdash; such as the TPP name, data permissions, payment amounts, payee details, and consent duration &mdash; MUST be presented before the end user confirms.</td>
            </tr>
            <tr>
              <td>3</td>
              <td><strong>Progress indication</strong></td>
              <td>The authorization page MUST include a progress indicator showing the end user where they are in the consent journey (e.g. Consent &gt; <strong>Authorize</strong> &gt; Complete).</td>
            </tr>
            <tr>
              <td>4</td>
              <td><strong>Consent-specific content</strong></td>
              <td>The content of the authorization page MUST accurately reflect the consent type. For example, data-sharing consents present account selection and permission details, while payment consents present payee name, IBAN, amount, and payment schedule.</td>
            </tr>
            <tr>
              <td>5</td>
              <td><strong>No obstacles</strong></td>
              <td>LFIs MUST NOT use language, design, or interaction patterns that discourage the end user from granting consent. The authorization page MUST NOT steer the end user toward declining, introduce unnecessary friction, or present the consent in a misleading way.</td>
            </tr>
            <tr>
              <td>6</td>
              <td><strong>Parity of experience</strong></td>
              <td>The authorization experience MUST be consistent with the quality of the LFI's own digital channels. It MUST NOT load slower, use confusing language, or more obstructive than equivalent in-app interactions.</td>
            </tr>
            <tr>
              <td>7</td>
              <td><strong>Clear actions</strong></td>
              <td>The end user MUST be presented with unambiguous options to approve or decline the consent. The action to approve MUST be clearly labelled and easy to locate.</td>
            </tr>
            <tr>
              <td>8</td>
              <td><strong>CX certification</strong></td>
              <td>The authorization page MUST be submitted as part of CX certification prior to production. Any material changes to a production authorization page MUST be resubmitted for review and approval.</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>
    </EdSectionBand>

    <EdSectionBand
      id="by-consent-type"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Authorization pages by consent type"
      title="Consent-specific UX requirements and wireframes"
      tone="cream"
    >
      <EdProse>
        The authorization page content varies depending on the type of consent being authorized. Refer
        to the <strong>User Experience</strong> page for each consent type for the specific
        authorization page requirements and interactive wireframes:
      </EdProse>

      <EdBullets>
        <li><a href="/tech/lfi-api-hub/v2.1/banking/data-sharing/user-journeys">Bank Data Sharing</a> &mdash; Account selection and data permission review</li>
        <li><a href="/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/single-instant-payment/user-journeys">Single Instant Payment</a> &mdash; Payment amount, payee, and Confirmation of Payee details</li>
        <li><a href="/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/multi-payments/variable-on-demand/user-journeys">Variable On Demand</a> &mdash; Payment rules, creditor details, and maximum limits</li>
        <li><a href="/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/multi-payments/fixed-on-demand/user-journeys">Fixed On Demand</a> &mdash; Fixed amount per-payment details and creditor information</li>
        <li><a href="/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/multi-payments/variable-periodic-schedule/user-journeys">Variable Periodic Schedule</a> &mdash; Recurring payment schedule with variable amounts</li>
        <li><a href="/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/multi-payments/fixed-periodic-schedule/user-journeys">Fixed Periodic Schedule</a> &mdash; Recurring payment schedule with fixed amounts</li>
        <li><a href="/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/multi-payments/variable-defined-schedule/user-journeys">Variable Defined Schedule</a> &mdash; Pre-defined payment dates with variable amounts</li>
        <li><a href="/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/multi-payments/fixed-defined-schedule/user-journeys">Fixed Defined Schedule</a> &mdash; Pre-defined payment dates with fixed amounts</li>
        <li><a href="/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/multi-payments/delegated-sca/user-journeys">Delegated SCA</a> &mdash; Per-payment authentication with delegated consent</li>
      </EdBullets>
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
.ed-doc__lede--tight { margin-top: 1rem; }
.ed-doc__lede :deep(strong) { color: var(--at-navy-deep); font-weight: 600; }
.ed-doc__lede :deep(a) {
  color: var(--at-teal-deep);
  text-decoration: none;
  border-bottom: 1px solid currentColor;
}

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
}
</style>
