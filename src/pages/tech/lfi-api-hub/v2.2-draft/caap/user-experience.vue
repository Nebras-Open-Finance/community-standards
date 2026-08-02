<route lang="yaml">
meta:
  title: CAAP - User Experience
</route>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          LFI · CAAP · User Experience
        </div>
        <h1 class="ed-doc__title">
          User Experience
          <span class="ed-doc__read">5 min read</span>
        </h1>
        <p class="ed-doc__lede">
          When an LFI adopts CAAP, the end user&apos;s authentication and consent authorisation experience is
          delivered by CAAP &mdash; not by an LFI-operated application. This page describes what the end user
          sees, where the LFI is still on the path, and what is and is not the LFI&apos;s responsibility
          across the journey.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="entry"
      num="01"
      color="var(--at-teal)"
      eyebrow="Entry to the journey"
      title="From the TPP to CAAP, via the API Hub"
      tone="cream"
    >
      <EdProse>
        The journey starts in the TPP application. After the TPP requests a consent via
        <code>POST /par</code> against the API Hub, the TPP redirects the end user to the API Hub
        authorization endpoint with the returned <code>request_uri</code>. From there, the API Hub
        redirects the end user into CAAP for authentication and consent approval.
      </EdProse>

      <EdNote type="info" title="What changes vs. an LFI-operated auth endpoint">
        <p>
          Without CAAP, the API Hub redirects the end user to the LFI&apos;s
          <a href="/tech/lfi-api-hub/v2.2-draft/api-hub/onboarding/environment-specific/auth-endpoint">Authorization Endpoint</a>,
          and the LFI authenticates and authorises the end user using its own mobile app or web journey,
          calling Headless Heimdall and the Consent Manager. With CAAP, the API Hub redirects to CAAP,
          and the LFI no longer operates that experience.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="end-to-end"
      num="02"
      color="var(--at-gold)"
      eyebrow="End-to-end experience"
      title="What the end user sees, screen by screen"
      tone="surface"
    >
      <EdProse>
        The image below shows the full end user experience after the TPP creates the consent and the
        API Hub redirects the end user to a CAAP-using LFI &mdash; from EFR / UAE Pass authentication,
        through OTP and consent review, to the authorization page itself.
      </EdProse>

      <ImageViewer
        src="/images/journeys/caap.png"
        alt="CAAP end-to-end end user journey: authentication, OTP challenge, consent review, account selection, and authorisation"
        caption="CAAP end-to-end end user journey. The authorization page shown is the Bank Data Sharing variant."
      />

      <EdNote type="info" title="Other consent types adjust the authorization page">
        <p>
          The authorization page shown is the <strong>Bank Data Sharing</strong> variant. CAAP renders
          a different authorization page for each consent type &mdash; the same surrounding journey
          (authenticate, register, review, confirm), with a layout suited to what the end user is consenting
          to. For comparison, see the equivalent journeys for
          <a href="/tech/lfi-api-hub/v2.2-draft/banking/service-initiation/domestic-payments/single-instant-payment/user-journeys">Bank Service Initiation</a>
          and
          <a href="/tech/lfi-api-hub/v2.2-draft/insurance/data-sharing/user-journeys">Insurance Data Sharing</a>.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="caap-screens"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="What the end user sees"
      title="The CAAP-side screens"
      tone="cream"
    >
      <EdProse>
        CAAP renders a consistent authentication and consent journey across LFIs that adopt it. The end user
        progresses through the following stages:
      </EdProse>

      <EdBullets>
        <li><strong>Identify.</strong> The end user provides identifying details (e.g. Emirates ID or other LFI-recognised identifiers).</li>
        <li><strong>Challenge.</strong> CAAP issues a challenge against the LFI &mdash; calling the LFI&apos;s <code>/users/actions/challenge/initialize</code> and <code>/users/actions/challenge/complete</code> CAAP Operations endpoints &mdash; so the LFI&apos;s authentication system verifies the end user.</li>
        <li><strong>Review consent.</strong> CAAP displays the requested consent (permissions, expiry, accounts, payment details where applicable). For consents carrying encrypted PII, CAAP calls the LFI&apos;s <code>/users/actions/pii/decrypt</code> endpoint to display cleartext to the end user.</li>
        <li><strong>Select accounts or policies.</strong> Where the consent requires selecting accounts or insurance policies, CAAP retrieves them via the LFI&apos;s CAAP-specific <code>/accounts</code>, <code>/accounts/{accountId}</code>, and <code>/{type}-insurance-policies</code> endpoints.</li>
        <li><strong>Validate.</strong> Before completion, CAAP calls the LFI&apos;s <code>/consent/actions/validate</code> endpoint. If validation fails, the journey ends with the user-facing message returned by the LFI.</li>
        <li><strong>Confirm.</strong> The end user confirms the consent; CAAP completes the interaction with the API Hub, and the API Hub redirects the end user back to the TPP.</li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="consent-management"
      num="04"
      color="var(--at-navy)"
      eyebrow="Consent management after authorisation"
      title="End user consent review and revocation"
      tone="surface"
    >
      <EdProse>
        After the consent is authorised, the end user manages the consent in CAAP &mdash; not in the LFI&apos;s
        own consent management interface. CAAP exposes the list of active consents, their permissions
        and expiry, and the ability to revoke them. Revocations are propagated to the API Hub (the
        consent source of truth) and from there back to the LFI via the existing
        <a href="/tech/lfi-api-hub/v2.2-draft/consent-events">Ozone Connect Consent Events</a> path.
      </EdProse>

      <EdNote type="info" title="Not applicable with CAAP">
        <p>
          The LFI&apos;s own <a href="/tech/lfi-api-hub/v2.2-draft/consent-management-interface/">Consent Management Interface</a>
          requirements and UX guidance are <strong>not applicable</strong> when the LFI adopts CAAP &mdash; CAAP delivers that interface.
        </p>
      </EdNote>
    </EdSectionBand>
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
@media (max-width: 720px) { .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; } }
</style>
