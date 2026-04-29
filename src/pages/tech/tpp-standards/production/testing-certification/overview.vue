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
          <span class="ed-doc__read">3 min read</span>
        </h1>
        <p class="ed-doc__lede">
          Before a Third Party Provider (TPP) can connect to a live Licensed Financial Institution (LFI)
          in production, it must satisfy two independent sets of requirements: regulatory licensing and
          Nebras technical certification.
        </p>
      </div>
    </section>

    <div class="ed-doc__intro">
      <div class="ed-doc__inner">
        <CertificationTicketBanner />
      </div>
    </div>

    <EdSectionBand
      id="regulatory"
      num="01"
      color="var(--at-teal)"
      eyebrow="Regulatory Licensing"
      title="A valid CBUAE licence is required before production access"
      tone="cream"
    >
      <EdProse>
        TPPs must hold a valid licence issued by the <strong>Central Bank of the UAE (CBUAE)</strong>
        before being granted access to production. Nebras certification is a separate, technical
        requirement and does not replace or supersede any CBUAE licensing obligation. You must contact
        the CBUAE directly to understand the licensing requirements applicable to your proposition and
        business model.
      </EdProse>

      <EdNote type="warning" title="Licence required for production access">
        <p>
          Production access will not be granted until a valid CBUAE licence has been confirmed. You may
          work through the Nebras certification process in parallel with your licensing application, but
          both must be satisfied before go-live.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="nebras-certification"
      num="02"
      color="var(--at-gold)"
      eyebrow="Nebras Certification"
      title="Four certification areas, all mandatory before go-live"
      tone="surface"
    >
      <EdProse>
        Nebras requires all TPPs to complete the following certification areas before production access
        is granted. These requirements apply regardless of which LFI you are connecting to and are in
        addition to any requirements that individual LFIs may impose. Each area maps to a
        <strong>Certification Type</strong> in the Service Desk evidence ticket.
      </EdProse>

      <div class="ed-doc__contents-grid">
        <a class="ed-link-card" href="/tech/tpp-standards/production/testing-certification/functional" :style="{ '--card-color': 'var(--at-blue-deep, #1d4ed8)' }">
          <span class="ed-link-card__top" />
          <div class="ed-link-card__meta">
            <span class="ed-link-card__cat">01 &middot; Evidence</span>
          </div>
          <h3 class="ed-link-card__title">Functional Evidence</h3>
          <p class="ed-link-card__desc">
            Documented proof that your proposition calls only the APIs it needs, requests only the
            minimum permissions required, and handles consent states correctly.
          </p>
          <div class="ed-link-card__cert">
            <span class="ed-link-card__cert-label">Certification Type</span>
            <span class="ed-link-card__cert-value">TPP Functional Certification Evidence</span>
          </div>
          <div class="ed-link-card__foot">
            <span class="ed-link-card__cta">Open template</span>
            <span class="ed-link-card__arrow">&nearr;</span>
          </div>
        </a>

        <a class="ed-link-card" href="/tech/tpp-standards/production/testing-certification/user-experience" :style="{ '--card-color': 'var(--at-teal)' }">
          <span class="ed-link-card__top" />
          <div class="ed-link-card__meta">
            <span class="ed-link-card__cat">02 &middot; Evidence</span>
          </div>
          <h3 class="ed-link-card__title">User Experience Evidence</h3>
          <p class="ed-link-card__desc">
            Evidence that your consent and authorisation flows meet Nebras user experience requirements.
          </p>
          <div class="ed-link-card__cert">
            <span class="ed-link-card__cert-label">Certification Type</span>
            <span class="ed-link-card__cert-value">TPP CX Certification Evidence</span>
          </div>
          <div class="ed-link-card__foot">
            <span class="ed-link-card__cta">Open requirements</span>
            <span class="ed-link-card__arrow">&nearr;</span>
          </div>
        </a>

        <a class="ed-link-card" href="/tech/tpp-standards/production/testing-certification/fapi" :style="{ '--card-color': 'var(--at-blue, #2c5fb3)' }">
          <span class="ed-link-card__top" />
          <div class="ed-link-card__meta">
            <span class="ed-link-card__cat">03 &middot; Conformance</span>
          </div>
          <h3 class="ed-link-card__title">FAPI Conformance</h3>
          <p class="ed-link-card__desc">
            Results from running the OpenID Foundation FAPI conformance test suite against your client
            configuration.
          </p>
          <div class="ed-link-card__cert">
            <span class="ed-link-card__cert-label">Certification Type</span>
            <span class="ed-link-card__cert-value">TPP FAPI Certification Evidence</span>
          </div>
          <div class="ed-link-card__foot">
            <span class="ed-link-card__cta">Open guidance</span>
            <span class="ed-link-card__arrow">&nearr;</span>
          </div>
        </a>

        <a class="ed-link-card" href="/tech/tpp-standards/production/testing-certification/security-validation" :style="{ '--card-color': 'var(--at-gold)' }">
          <span class="ed-link-card__top" />
          <div class="ed-link-card__meta">
            <span class="ed-link-card__cat">04 &middot; Validation</span>
          </div>
          <h3 class="ed-link-card__title">Security Validation</h3>
          <p class="ed-link-card__desc">
            Confirmation that your key management, certificate handling, and data security practices
            meet Nebras policy requirements.
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
      </div>

      <EdProse>
        All four areas must be satisfied before Nebras will grant production access to a live LFI
        environment.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="submitting"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Submitting Your Evidence"
      title="Raise one Service Desk ticket per certification area"
      tone="cream"
    >
      <EdProse>
        Certification evidence is submitted to Nebras through the <strong>Service Desk</strong>, using
        the dedicated <em>Providing certification evidence</em> request type. The link is the same for
        every area, but each area is its own ticket: raise four tickets &mdash; one for Functional, one
        for User Experience, one for FAPI, and one for Security &mdash; and pick the matching
        <strong>Certification Type</strong> from the dropdown on each.
      </EdProse>

      <EdProse>
        The Service Desk is gated by Sandbox Trust Framework SSO &mdash; see
        <a href="/support-service-desk">Support &amp; Service Desk</a> for access prerequisites, what to
        include in a ticket, and the alternative email and telephone channels.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="ongoing"
      num="04"
      color="var(--at-gold)"
      eyebrow="Ongoing Conformance"
      title="Certification at go-live is the entry bar, not the finish line"
      tone="surface"
    >
      <EdProse>
        Once in production, the TPP MUST maintain its certified state across every area continuously,
        not only at the point of certification. Material changes to the TPP's platform, to the Open
        Finance standards, or to the FAPI profile may trigger re-certification of the affected area;
        Nebras may also request fresh evidence at any time after go-live.
      </EdProse>

      <EdBullets>
        <li>
          <strong>Functional conformance</strong> &mdash; the TPP MUST continue to call only the APIs
          required by its proposition, request only the minimum permissions needed, and handle consent
          state changes correctly as the Open Finance specification evolves.
        </li>
        <li>
          <strong>User experience</strong> &mdash; consent and authorisation flows MUST continue to meet
          Nebras CX requirements as those requirements are updated.
        </li>
        <li>
          <strong>Security of the TPP's systems</strong> &mdash; the TPP MUST keep dependencies patched,
          monitor for vulnerabilities, respond to incidents, and repeat penetration testing whenever
          significant changes are made to the application or its Open Finance integration.
        </li>
        <li>
          <strong>FAPI alignment</strong> &mdash; the TPP MUST maintain a current OIDF
          <strong>CBUAE FAPI 2.0 RP Message Signing</strong> certification, and re-certify against each
          new major version of the standards.
        </li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="scope"
      num="05"
      color="var(--at-navy)"
      eyebrow="Scope"
      title="What these requirements do and do not cover"
      tone="cream"
    >
      <EdProse>
        The certification requirements in this section are set by Nebras and govern technical and
        operational readiness for participation in the Open Finance UAE ecosystem. They do not
        constitute legal or regulatory advice. TPPs are solely responsible for ensuring they hold the
        appropriate regulatory authorisations for their proposition before going live.
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
  grid-template-columns: repeat(auto-fill, minmax(22.5rem, 1fr));
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
