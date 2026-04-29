<route lang="yaml">
meta:
  title: Security Validation
</route>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          Testing &amp; Certification &middot; Security
        </div>
        <h1 class="ed-doc__title">
          Security Validation
          <span class="ed-doc__read">2 min read</span>
        </h1>
        <p class="ed-doc__lede">
          Before a TPP is approved for production access, it must submit the results of a penetration
          test to Nebras. This requirement provides independent assurance that the TPP's application can
          withstand real-world attack scenarios and that user data and financial transactions are
          adequately protected.
        </p>
      </div>
    </section>

    <div class="ed-doc__intro">
      <div class="ed-doc__inner">
        <CertificationTicketBanner cert-type="Penetration Test Results" />
      </div>
    </div>

    <EdSectionBand
      id="requirements"
      num="01"
      color="var(--at-teal)"
      eyebrow="Penetration Test Requirements"
      title="What the test must cover"
      tone="cream"
    >
      <h3>Scope</h3>

      <EdProse>
        The penetration test must cover the
        <strong>full extent of the TPP's services that rely on the Open Finance implementation</strong>
        &mdash; including all integration points, authentication flows, consent handling, data access,
        and payment initiation paths. Testing a subset of the application is not sufficient.
      </EdProse>

      <h3>Independence</h3>

      <EdProse>
        The test must be carried out by an <strong>independent third party</strong>. Internal security
        assessments or self-attested reviews do not satisfy this requirement. The testing organisation
        must have no material conflict of interest with the TPP.
      </EdProse>

      <h3>Application State</h3>

      <EdProse>
        The test must be conducted against the application in a
        <strong>production-like state</strong> &mdash; meaning the codebase, configuration, and
        infrastructure assessed must closely reflect what will be deployed to production. The test
        should not be run against an application that is mid-development or expected to undergo
        significant change before go-live.
      </EdProse>

      <EdNote type="info" title="Non-production environments are acceptable">
        <p>
          The penetration test does not need to be run against the live production environment. A
          staging or pre-production environment that mirrors production in architecture, configuration,
          and behaviour is acceptable, provided it is representative of what will go live.
        </p>
      </EdNote>

      <h3>Security Resilience</h3>

      <EdProse>
        The test report must demonstrate <strong>significant security resilience</strong> across the
        areas relevant to an Open Finance TPP integration, including but not limited to:
      </EdProse>

      <EdBullets>
        <li>Authentication and session management (OAuth 2.0, PKCE, token handling)</li>
        <li>mTLS certificate usage and private key protection</li>
        <li>Consent data handling and access control enforcement</li>
        <li>Input validation and injection attack resistance</li>
        <li>Sensitive data storage and transmission</li>
        <li>API rate limiting and abuse prevention</li>
        <li>Third-party dependency and supply chain risk</li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="submission"
      num="02"
      color="var(--at-gold)"
      eyebrow="Submission"
      title="How Nebras reviews your report"
      tone="surface"
    >
      <EdProse>
        The penetration test report must be submitted to Nebras as part of the production approval
        process. Nebras reserves the right to request clarification, require remediation of identified
        findings, or request a re-test before granting production access.
      </EdProse>

      <EdNote type="warning" title="Remediation before production">
        <p>
          Any <strong>critical</strong> or <strong>high</strong> severity findings identified in the
          penetration test must be remediated and evidenced before production access will be granted.
          Medium and lower severity findings must be acknowledged with a documented remediation plan.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="ongoing"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Ongoing Security Responsibility"
      title="Security after go-live"
      tone="cream"
    >
      <EdProse>
        The penetration test is a point-in-time assessment required before go-live &mdash; it is not a
        substitute for a continuous security posture. Once live in production, TPPs take full
        responsibility for the ongoing security of their platform.
      </EdProse>

      <EdProse>
        This includes, but is not limited to, keeping dependencies patched, monitoring for
        vulnerabilities, responding promptly to security incidents, and repeating penetration testing
        whenever significant changes are made to the application or its Open Finance integration. A
        material change to the platform &mdash; such as a new payment flow, a new data access surface,
        or a change in infrastructure &mdash; should trigger a targeted security review.
      </EdProse>

      <EdProse>
        Nebras may request updated evidence of security assurance at any point after go-live.
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

.ed-doc__intro { background: var(--at-bg-cream); border-bottom: 1px solid var(--at-grid-line); }
.ed-doc__intro .ed-doc__inner { padding: 2rem 2rem 2.5rem; }

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
