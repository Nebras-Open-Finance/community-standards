<route lang="yaml">
meta:
  title: Trust Framework — Onboarding
</route>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          LFI · Trust Framework · Onboarding
        </div>
        <h1 class="ed-doc__title">
          Onboarding
          <span class="ed-doc__read">2 min read</span>
        </h1>
        <p class="ed-doc__lede">
          The onboarding process to the <strong>Trust Framework</strong> works in tandem with the
          <strong>licensing processes</strong> defined by the <strong>Central Bank of the UAE (CBUAE)</strong>.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="when"
      num="01"
      color="var(--at-teal)"
      eyebrow="When You Can Onboard"
      title="Sandbox or Production, depending on your licence stage"
      tone="cream"
    >
      <EdProse>
        As a <strong>Licensed Financial Institution (LFI)</strong>, you may begin onboarding to the
        appropriate Trust Framework environment based on your licensing status:
      </EdProse>

      <EdBullets>
        <li>
          <strong>Sandbox Environment</strong> &mdash; you may onboard to the
          <a href="https://web.sandbox.directory.openfinance.ae/">Sandbox Trust Framework</a> once the
          CBUAE has <strong>confirmed receipt</strong> of your <strong>licence application</strong> or
          provided <strong>in-principle approval</strong>.
        </li>
        <li>
          <strong>Production Environment</strong> &mdash; you may onboard to the
          <a href="https://web.directory.openfinance.ae/">Production Trust Framework</a> once the CBUAE has
          <strong>approved your licence</strong>.
        </li>
      </EdBullets>

      <EdProse>
        If you have not yet started your Open Finance licensing process and are interested in finding out
        more, please contact <a href="mailto:connect@nebrasopenfinance.ae">connect@nebrasopenfinance.ae</a>.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="requesting-sandbox-onboarding"
      num="02"
      color="var(--at-gold)"
      eyebrow="Requesting Sandbox Onboarding"
      title="What to send to support@nebrasopenfinance.ae"
      tone="surface"
    >
      <EdProse>
        Once the CBUAE has confirmed receipt of your licence application, send the following to
        <a href="mailto:support@nebrasopenfinance.ae">support@nebrasopenfinance.ae</a> to begin sandbox
        onboarding:
      </EdProse>

      <EdNote type="info" title="📨 Email template">
        <p>
          <strong>To:</strong>
          <a href="mailto:support@nebrasopenfinance.ae">support@nebrasopenfinance.ae</a><br>
          <strong>Subject:</strong> Trust Framework Sandbox Onboarding Request &mdash; [Your Organisation Name]
        </p>
        <p>Dear Nebras Support,</p>
        <p>
          I wish to proceed with onboarding my organisation to the Trust Framework Sandbox. Please review
          the attached documents:
        </p>
        <p>
          <strong>1. CBUAE Licence / Letter of Intent</strong><br>
          A copy of your valid Central Bank of the UAE (CBUAE) Licence, or in-principle approval letter and
          supporting documentation submitted to the CBUAE.
        </p>
        <p>
          <strong>2. Organisation Details</strong><br>
          The completed
          <a href="/tech/lfi-api-hub/trust-framework/onboarding-form-organisation">Organisation Details form</a>.
        </p>
        <p>
          <strong>3. Primary Organisation Admin Details</strong><br>
          The completed
          <a href="/tech/lfi-api-hub/trust-framework/onboarding-form-admin">Primary Organisation Admin form</a>
          with the nominated administrator's details.
        </p>
        <p>
          <strong>4. Primary Organisation Admin Approval</strong><br>
          A signed letter from your Chief Compliance Officer confirming the approval of the designated
          Primary Organisation Admin.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="primary-admin"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Primary Organisation Admin"
      title="The single point of contact for your organisation"
      tone="cream"
    >
      <EdProse>
        As part of your licence application, you must nominate a <strong>Primary Organisation Admin</strong>.
        The Primary Organisation Admin will act as your organization's main point of contact with
        <strong>Nebras</strong> and the <strong>CBUAE</strong> during onboarding and ongoing operations.
      </EdProse>

      <EdProse>Within the Trust Framework, the Primary Organisation Admin will:</EdProse>

      <EdBullets>
        <li>Serve as <strong>system administrator</strong></li>
        <li>Manage user access</li>
        <li>Appoint technical contacts</li>
        <li>Coordinate the signing and submission of required legal documentation</li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="access"
      num="04"
      color="var(--at-navy)"
      eyebrow="Access & Registration"
      title="Receiving the invitation email and completing sign-up"
      tone="surface"
    >
      <EdProse>
        Once your onboarding request has been accepted, the <strong>Primary Organisation Admin</strong>
        will receive an invitation email from the Trust Framework platform. They can complete registration
        by following the steps in the
        <a href="/tech/lfi-api-hub/trust-framework/user-sign-up">Sign Up guide</a>.
      </EdProse>

      <ImageViewer
        src="/images/raidiam/sign-up/1.png"
        alt="Registration Email"
      />

      <EdNote type="warning" title="Agreement signing required">
        <p>
          In addition to the steps in the
          <a href="/tech/lfi-api-hub/trust-framework/user-sign-up">Sign Up guide</a>, as part of
          registration, the <strong>Primary Organisation Admin</strong> will receive the
          <strong>LFI Participation Agreement</strong> for electronic signature. This document must be
          signed by an <strong>authorised signatory</strong> &mdash; someone with the authority to legally
          bind the organisation. The Primary Organisation Admin must coordinate this signing before the
          organisation can access the Trust Framework.
        </p>
      </EdNote>

      <EdProse>
        After the Primary Organisation Admin account is set up, they can <strong>add additional users</strong>
        within the Trust Framework platform.
      </EdProse>
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
.ed-doc__lede :deep(strong) { color: var(--at-navy-deep); font-weight: 600; }

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
}
</style>
