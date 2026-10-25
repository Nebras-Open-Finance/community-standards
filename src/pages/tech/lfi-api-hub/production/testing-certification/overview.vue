<route lang="yaml">
meta:
  title: Testing & Certification Overview
  isIndex: true
</route>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          Production &middot; Testing &amp; Certification
        </div>
        <h1 class="ed-doc__title">
          Testing &amp; Certification Overview
          <span class="ed-doc__read">4 min read</span>
        </h1>
        <p class="ed-doc__lede">
          A Licensed Financial Institution (LFI) reaches live operation in UAE Open Finance through two
          certification gates. The first unlocks production onboarding: the production Trust Framework
          and the production API Hub. The second unlocks TPP Buddying, the first live traffic with
          real customers.
        </p>
      </div>
    </section>

    <div class="ed-doc__intro">
      <div class="ed-doc__inner">
        <CertificationTicketBanner audience="LFI" />
      </div>
    </div>

    <EdSectionBand
      id="path-to-live"
      num="01"
      color="var(--at-teal)"
      eyebrow="The Path to Live"
      title="Two certification gates, each unlocking the next phase"
      tone="cream"
    >
      <EdProse>
        Certification is staged so that an LFI can start production onboarding as soon as its
        implementation is functionally correct and its customer experience is approved. Live traffic
        additionally requires evidence that the implementation is responsive under load, secure, and
        working as expected in production.
      </EdProse>

      <EdStages>
        <EdStage num="01" title="Gate 1: Functional and CX certification" num-color="var(--at-blue-deep, #1d4ed8)">
          <p>
            Nebras accepts your <strong>Functional Certification</strong> evidence and your
            <strong>CX Certification</strong> evidence.
          </p>
        </EdStage>
        <EdStage num="02" title="Production onboarding" num-color="var(--at-teal)">
          <p>
            You onboard to the <strong>production Trust Framework</strong>, then set up and connect to
            the <strong>production API Hub</strong>. No real-customer traffic flows at this stage.
          </p>
        </EdStage>
        <EdStage num="03" title="Gate 2: Performance, penetration testing and production spot checks" num-color="var(--at-gold)">
          <p>
            Nebras accepts your <strong>performance test</strong> and <strong>penetration test</strong>
            results, and you attest that your <strong>production spot checks</strong> have passed.
          </p>
        </EdStage>
        <EdStage num="04" title="TPP Buddying" num-color="var(--at-navy)">
          <p>
            You prove your implementation live with one or more partner TPPs and real customers before
            opening to the wider ecosystem. See
            <a href="/tech/lfi-api-hub/production/testing-certification/tpp-buddying">TPP Buddying</a>.
          </p>
        </EdStage>
      </EdStages>

      <EdNote type="tip" title="Phased delivery by capability">
        <p>
          Production Trust Framework and API Hub onboarding happen once. A capability delivered later,
          such as Service Initiation after Data Sharing, goes through the same certifications before it
          enters TPP Buddying. See
          <a href="/tech/lfi-api-hub/getting-started/">Getting Started as an LFI</a> for the full
          journey.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="gate-1"
      num="02"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Gate 1 · Production Onboarding"
      title="Functional and CX certification unlock production onboarding"
      tone="surface"
    >
      <EdProse>
        Before onboarding to the production Trust Framework, the LFI MUST have both of the following
        certifications accepted by Nebras. Each maps to a <strong>Certification Type</strong> in the
        Service Desk evidence ticket.
      </EdProse>

      <div class="ed-doc__contents-grid">
        <a class="ed-link-card" href="/tech/lfi-api-hub/production/testing-certification/functional/" :style="{ '--card-color': 'var(--at-blue-deep, #1d4ed8)' }">
          <span class="ed-link-card__top" />
          <div class="ed-link-card__meta">
            <span class="ed-link-card__cat">01 &middot; Evidence</span>
          </div>
          <h3 class="ed-link-card__title">Functional Evidence</h3>
          <p class="ed-link-card__desc">
            Proof that your Ozone Connect endpoints return correct, complete data, that each payment
            reaches the right terminal status, and that the same results flow through the API Hub to a
            TPP. Submitted per capability.
          </p>
          <div class="ed-link-card__cert">
            <span class="ed-link-card__cert-label">Certification Type</span>
            <span class="ed-link-card__cert-value">LFI Functional Certification Evidence</span>
          </div>
          <div class="ed-link-card__foot">
            <span class="ed-link-card__cta">Start certification</span>
            <span class="ed-link-card__arrow">&nearr;</span>
          </div>
        </a>

        <a class="ed-link-card" href="/tech/lfi-api-hub/production/testing-certification/user-experience" :style="{ '--card-color': 'var(--at-teal)' }">
          <span class="ed-link-card__top" />
          <div class="ed-link-card__meta">
            <span class="ed-link-card__cat">02 &middot; Evidence</span>
          </div>
          <h3 class="ed-link-card__title">User Experience Evidence</h3>
          <p class="ed-link-card__desc">
            Evidence that your consent journey and consent management interface meet the Open Finance
            user experience requirements.
          </p>
          <div class="ed-link-card__cert">
            <span class="ed-link-card__cert-label">Certification Type</span>
            <span class="ed-link-card__cert-value">LFI CX Certification Evidence</span>
          </div>
          <div class="ed-link-card__foot">
            <span class="ed-link-card__cta">Open requirements</span>
            <span class="ed-link-card__arrow">&nearr;</span>
          </div>
        </a>
      </div>

      <EdProse>
        Once both are accepted, the LFI MAY onboard to the
        <a href="/tech/lfi-api-hub/trust-framework/onboarding">production Trust Framework</a> and set
        up and connect to the production API Hub &mdash; see
        <a href="/tech/lfi-api-hub/v2.1/api-hub/connectivity/">Connectivity &amp; Certificates</a> and
        the production entries in
        <a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/">Environment-Specific configuration</a>.
      </EdProse>

      <EdNote type="warning" title="Connected is not live">
        <p>
          Passing Gate 1 permits production onboarding and connectivity only. The LFI MUST NOT process
          real-customer Open Finance traffic until Gate 2 has been passed and TPP Buddying begins.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="gate-2"
      num="03"
      color="var(--at-gold)"
      eyebrow="Gate 2 · TPP Buddying"
      title="Performance, security and production spot checks unlock TPP Buddying"
      tone="cream"
    >
      <EdProse>
        Before entering TPP Buddying, the LFI MUST have its performance test and penetration test
        results accepted by Nebras, and MUST attest that its production spot checks have passed.
      </EdProse>

      <div class="ed-doc__contents-grid">
        <a class="ed-link-card" href="/tech/lfi-api-hub/production/testing-certification/performance" :style="{ '--card-color': 'var(--at-gold)' }">
          <span class="ed-link-card__top" />
          <div class="ed-link-card__meta">
            <span class="ed-link-card__cat">03 &middot; Performance</span>
          </div>
          <h3 class="ed-link-card__title">Performance Testing</h3>
          <p class="ed-link-card__desc">
            A performance test validating that your Ozone Connect endpoints remain responsive under
            reasonable load.
          </p>
          <div class="ed-link-card__cert">
            <span class="ed-link-card__cert-label">Certification Type</span>
            <span class="ed-link-card__cert-value">LFI Performance Test Results</span>
          </div>
          <div class="ed-link-card__foot">
            <span class="ed-link-card__cta">Open requirements</span>
            <span class="ed-link-card__arrow">&nearr;</span>
          </div>
        </a>

        <a class="ed-link-card" href="/tech/lfi-api-hub/production/testing-certification/security-validation" :style="{ '--card-color': 'var(--at-navy)' }">
          <span class="ed-link-card__top" />
          <div class="ed-link-card__meta">
            <span class="ed-link-card__cat">04 &middot; Validation</span>
          </div>
          <h3 class="ed-link-card__title">Security Validation</h3>
          <p class="ed-link-card__desc">
            An independent penetration test covering your consent journey, your consent management
            interface, and every Ozone Connect endpoint you have delivered.
          </p>
          <div class="ed-link-card__cert">
            <span class="ed-link-card__cert-label">Certification Type</span>
            <span class="ed-link-card__cert-value">Penetration Test Results</span>
          </div>
          <div class="ed-link-card__foot">
            <span class="ed-link-card__cta">Open requirements</span>
            <span class="ed-link-card__arrow">&nearr;</span>
          </div>
        </a>

        <a class="ed-link-card" href="/tech/lfi-api-hub/production/testing-certification/self-testing" :style="{ '--card-color': 'var(--at-blue, #2c5fb3)' }">
          <span class="ed-link-card__top" />
          <div class="ed-link-card__meta">
            <span class="ed-link-card__cat">05 &middot; Live Proving</span>
          </div>
          <h3 class="ed-link-card__title">Production Spot Checks</h3>
          <p class="ed-link-card__desc">
            Spot checks against production, using controlled test accounts, confirming that your Ozone
            Connect endpoints respond as expected through the production API Hub.
          </p>
          <div class="ed-link-card__cert">
            <span class="ed-link-card__cert-label">Evidence</span>
            <span class="ed-link-card__cert-value">Self-attestation</span>
          </div>
          <div class="ed-link-card__foot">
            <span class="ed-link-card__cta">Open guidance</span>
            <span class="ed-link-card__arrow">&nearr;</span>
          </div>
        </a>
      </div>

      <h3>Performance test</h3>
      <EdProse>
        The performance test MUST demonstrate that the LFI's Ozone Connect endpoints remain responsive
        under a reasonable level of load. The load profile and the results to submit are set out on the
        <a href="/tech/lfi-api-hub/production/testing-certification/performance">Performance Testing</a>
        page.
      </EdProse>

      <h3>Penetration test</h3>
      <EdProse>
        The penetration test MUST be carried out by an <strong>independent third party</strong>.
        Internal security assessments and self-attested reviews do not satisfy this requirement. The
        test MUST cover:
      </EdProse>
      <EdBullets>
        <li>
          the <a href="/tech/lfi-api-hub/v2.1/consent-journey/authentication">consent journey</a>
          &mdash; authentication and authorisation of the end user at the LFI;
        </li>
        <li>
          the <a href="/tech/lfi-api-hub/v2.1/consent-management-interface/">consent management interface</a>;
          and
        </li>
        <li>every Ozone Connect endpoint the LFI has delivered.</li>
      </EdBullets>

      <h3>Production spot checks</h3>
      <EdProse>
        Once connected to the production API Hub, the LFI MUST run spot checks against production using
        controlled test accounts (for example, bank-staff accounts) to confirm that its production Ozone
        Connect endpoints respond as expected. The LFI then attests the results to Nebras. See
        <a href="/tech/lfi-api-hub/production/testing-certification/self-testing">Attestation &amp; Self Testing</a>.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="submitting"
      num="04"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Submitting Your Evidence"
      title="Raise one Service Desk ticket per certification area"
      tone="surface"
    >
      <EdProse>
        Certification evidence is submitted to Nebras through the <strong>Service Desk</strong>, using
        the dedicated <em>Providing certification evidence</em> request type. The link is the same for
        every area, but each area is its own ticket: raise one for Functional, one for User Experience,
        one for Performance, and one for Security &mdash; and pick the matching
        <strong>Certification Type</strong> from the dropdown on each.
      </EdProse>

      <EdProse>
        Functional evidence is split further: each functional area, such as Bank Data Sharing or each
        domestic payment type, is its own submission and its own ticket. The
        <a href="/tech/lfi-api-hub/production/testing-certification/functional/">Functional Certification</a>
        page lists every area.
      </EdProse>

      <EdProse>
        The Service Desk is gated by Sandbox Trust Framework SSO &mdash; see
        <a href="/support-service-desk">Support &amp; Service Desk</a> for access prerequisites, what to
        include in a ticket, and the alternative email and telephone channels.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="ongoing"
      num="05"
      color="var(--at-gold)"
      eyebrow="Ongoing Conformance"
      title="Certification at go-live is the entry bar, not the finish line"
      tone="cream"
    >
      <EdProse>
        Once live, the LFI MUST maintain its certified state across every area continuously, not only at
        the point of certification. Material changes to the LFI's platform or to the Open Finance
        standards may trigger re-certification of the affected area; Nebras may also request fresh
        evidence at any time after go-live.
      </EdProse>

      <EdBullets>
        <li>
          <strong>Functional conformance</strong> &mdash; the LFI's Ozone Connect endpoints MUST
          continue to behave as specified in the LFI OpenAPI specifications as the standards evolve.
        </li>
        <li>
          <strong>User experience</strong> &mdash; the consent journey and consent management interface
          MUST continue to meet Open Finance CX requirements as those requirements are updated.
        </li>
        <li>
          <strong>Performance</strong> &mdash; the LFI's Ozone Connect endpoints MUST remain responsive
          as production traffic grows, and SHOULD be re-tested after significant infrastructure changes.
        </li>
        <li>
          <strong>Security of the LFI's systems</strong> &mdash; the LFI MUST keep dependencies patched,
          monitor for vulnerabilities, respond to incidents, and repeat penetration testing whenever
          significant changes are made to the consent journey, the consent management interface, or its
          Ozone Connect endpoints.
        </li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="scope"
      num="06"
      color="var(--at-navy)"
      eyebrow="Scope"
      title="What these requirements do and do not cover"
      tone="surface"
    >
      <EdProse>
        The certification requirements in this section are set by Nebras and govern technical and
        operational readiness for participation in the Open Finance UAE ecosystem. They do not
        constitute legal or regulatory advice, and they do not replace any obligation the LFI holds
        towards the Central Bank of the UAE (CBUAE), including regulatory compliance deadlines.
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

.ed-doc__contents-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(22.5rem, 100%), 1fr));
  gap: 1.25rem;
  margin: 1.5rem 0 1.5rem;
}

.ed-link-card {
  position: relative;
  display: flex;
  flex-direction: column;
  background: var(--at-bg-cream);
  border: 1px solid var(--at-grid-line);
  padding: 2rem 1.75rem 1.5rem;
  text-decoration: none;
  color: inherit;
  transition: border-color 0.2s ease, transform 0.2s ease;
}
.ed-link-card:hover { border-color: var(--card-color, var(--at-navy)); transform: translateY(-2px); }
.ed-link-card__top {
  position: absolute;
  top: 0;
  left: 0;
  width: 48px;
  height: 3px;
  background: var(--card-color, var(--at-navy));
}
.ed-link-card__meta {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  margin-bottom: 0.85rem;
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  flex-wrap: wrap;
}
.ed-link-card__cat { font-weight: 700; color: var(--card-color, var(--at-navy)); }
.ed-link-card__title {
  font-family: var(--at-serif);
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: var(--at-navy-deep);
  margin: 0 0 0.85rem;
}
.ed-link-card__desc {
  font-family: var(--at-sans);
  font-size: 0.92rem;
  line-height: 1.6;
  color: var(--at-mute-2);
  margin: 0 0 0.95rem;
  flex: 1;
}
.ed-link-card__cert {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  padding: 0.6rem 0.75rem;
  margin-bottom: 1rem;
  background: color-mix(in srgb, var(--card-color, var(--at-navy)) 6%, var(--at-bg-cream));
  border-left: 2px solid var(--card-color, var(--at-navy));
}
.ed-link-card__cert-label {
  font-family: var(--at-mono);
  font-size: 0.6rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--at-mute);
  font-weight: 700;
}
.ed-link-card__cert-value {
  font-family: var(--at-mono);
  font-size: 0.82rem;
  color: var(--at-navy-deep);
  font-weight: 600;
}
.ed-link-card__foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 0.85rem;
  border-top: 1px solid var(--at-grid-line);
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-mute);
}
.ed-link-card__arrow { color: var(--card-color, var(--at-navy)); transition: transform 0.2s ease; }
.ed-link-card:hover .ed-link-card__arrow { transform: translateX(4px); }

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
}
</style>
