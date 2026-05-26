<route lang="yaml">
meta:
  title: Getting Started as an LFI
  isIndex: true
</route>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          LFI · Getting Started
        </div>
        <h1 class="ed-doc__title">
          Getting Started as an LFI
          <span class="ed-doc__read">6 min read</span>
        </h1>
        <p class="ed-doc__lede">
          This page outlines the end-to-end journey for a Licensed Financial Institution (LFI) integrating
          with the UAE Open Finance ecosystem &mdash; from first onboarding in the sandbox environment
          through to live operation with Third-Party Providers (TPPs).
        </p>
        <p class="ed-doc__lede ed-doc__lede--tight">
          The journey is organised into three phases. Each step builds on the previous one, and each phase
          should be completed before progressing to the next.
        </p>
      </div>
    </section>

    <section class="ed-doc__intro">
      <div class="ed-doc__inner">
        <div class="ed-doc__phase-grid">
          <a
            href="#phase-a"
            class="ed-doc__phase-card"
            :style="{ '--card-color': 'var(--at-teal)' }"
          >
            <span class="ed-doc__phase-card-top" />
            <div class="ed-doc__phase-card-meta">
              <span class="ed-doc__phase-card-cat">Phase A</span>
            </div>
            <h3 class="ed-doc__phase-card-title">Pre-production: Build &amp; Integrate</h3>
            <p class="ed-doc__phase-card-desc">
              Register, connect, and develop against the pre-production environment.
            </p>
            <div class="ed-doc__phase-card-foot">
              <span class="ed-doc__phase-card-cta">Jump to phase</span>
              <span class="ed-doc__phase-card-arrow">&darr;</span>
            </div>
          </a>

          <a
            href="#phase-b"
            class="ed-doc__phase-card"
            :style="{ '--card-color': 'var(--at-gold)' }"
          >
            <span class="ed-doc__phase-card-top" />
            <div class="ed-doc__phase-card-meta">
              <span class="ed-doc__phase-card-cat">Phase B</span>
            </div>
            <h3 class="ed-doc__phase-card-title">Certification</h3>
            <p class="ed-doc__phase-card-desc">
              Evidence that your implementation meets the functional, user experience, performance, and
              security standards.
            </p>
            <div class="ed-doc__phase-card-foot">
              <span class="ed-doc__phase-card-cta">Jump to phase</span>
              <span class="ed-doc__phase-card-arrow">&darr;</span>
            </div>
          </a>

          <a
            href="#phase-c"
            class="ed-doc__phase-card"
            :style="{ '--card-color': 'var(--at-blue-deep, #1d4ed8)' }"
          >
            <span class="ed-doc__phase-card-top" />
            <div class="ed-doc__phase-card-meta">
              <span class="ed-doc__phase-card-cat">Phase C</span>
            </div>
            <h3 class="ed-doc__phase-card-title">Production: Launch</h3>
            <p class="ed-doc__phase-card-desc">
              Repeat onboarding in production, validate, publish your resources, and prove live with TPPs.
            </p>
            <div class="ed-doc__phase-card-foot">
              <span class="ed-doc__phase-card-cta">Jump to phase</span>
              <span class="ed-doc__phase-card-arrow">&darr;</span>
            </div>
          </a>
        </div>

        <EdProse>
          A consolidated view of responsibilities across the ecosystem is maintained in the
          <a href="/tech/lfi-api-hub/">LFI Integration Guide overview</a>.
        </EdProse>

        <EdNote type="tip" title="Phased delivery by capability">
          <p>
            Steps 1, 2, 5 and 6 (Trust Framework and API Hub onboarding) are one-off activities per
            environment. Steps 3, 4 and 7&ndash;9 can be delivered iteratively &mdash; capability by
            capability. A bank may, for example, take <strong>Data Sharing</strong> through development,
            certification and production first, then return to deliver <strong>Service Initiation</strong>
            through the same steps later. All in-scope capabilities MUST be live by the regulatory
            compliance deadline, but the path to get there can be staged. See the
            <a href="/tech/lfi-api-hub/getting-started/bank-rollout-plan">Recommended Bank Rollout Plan</a>
            or the
            <a href="/tech/lfi-api-hub/getting-started/insurance-rollout-plan">Recommended Insurance Rollout Plan</a>
            for suggested sequencing.
          </p>
        </EdNote>
      </div>
    </section>

    <EdSectionBand
      id="phase-a"
      num="A"
      color="var(--at-teal)"
      eyebrow="Phase A · Pre-production"
      title="Build & Integrate"
      tone="cream"
    >
      <h3>Step 1. Onboard to the Sandbox Trust Framework</h3>
      <EdProse>
        Register your organisation with the UAE Open Finance Trust Framework in the sandbox. The Trust
        Framework is the central directory of ecosystem participants &mdash; you must be registered here
        before you can connect to anything else.
      </EdProse>

      <h4>Prerequisites</h4>
      <EdBullets>
        <li>Organisation details and authorised signatories identified.</li>
        <li>
          Nominated
          <a href="/tech/lfi-api-hub/trust-framework/organisation-admins">Organisation Admins</a> and
          additional users.
        </li>
        <li>
          Transport and signing certificates issued by an approved Certificate Authority (see
          <a href="/tech/lfi-api-hub/trust-framework/certificates/">Keys &amp; Certificates</a>).
        </li>
        <li>
          Agreement on the
          <a href="/tech/lfi-api-hub/trust-framework/roles">Trust Framework Roles</a> your organisation
          requires.
        </li>
      </EdBullets>

      <h4>What to do</h4>
      <EdBullets>
        <li>
          Complete the
          <a href="/tech/lfi-api-hub/trust-framework/onboarding">Trust Framework onboarding process</a>,
          including
          <a href="/tech/lfi-api-hub/trust-framework/user-sign-up">organisation admin sign-up</a> and
          <a href="/tech/lfi-api-hub/trust-framework/adding-users">adding users</a>.
        </li>
        <li>
          Upload your
          <a href="/tech/lfi-api-hub/trust-framework/certificates/client-transport">Client Transport</a>
          and
          <a href="/tech/lfi-api-hub/trust-framework/certificates/client-signing">Client Signing</a>
          certificates.
        </li>
        <li>
          Register your
          <a href="/tech/lfi-api-hub/trust-framework/application">Application</a> and create the
          <a href="/tech/lfi-api-hub/trust-framework/creating-c3-application">C3-hh-cm-client</a> that the
          API Hub will use to call your services.
        </li>
        <li>
          Record organisation
          <a href="/tech/lfi-api-hub/trust-framework/contacts">contacts</a>.
        </li>
      </EdBullets>

      <h4>Done when</h4>
      <EdBullets>
        <li>Your organisation is visible in the sandbox directory with the correct LFI role.</li>
        <li>Your application is registered and certificates are bound to it.</li>
        <li>At least one Organisation Admin and one technical user can authenticate.</li>
      </EdBullets>

      <h3>Step 2. Set Up and Connect to the Pre-Production API Hub</h3>
      <EdProse>
        The UAE Open Finance
        <a href="/tech/lfi-api-hub/v2.1/api-hub/">API Hub</a>
        (operated by Nebras, with vendor support from Ozone API) is the central intermediary that sits
        between LFIs and TPPs. It handles OIDC/FAPI security, consent lifecycle, request routing, and
        schema enforcement. You connect to the Hub once; the Hub manages the complexity of multi-TPP
        interoperability on your behalf.
      </EdProse>

      <h4>Prerequisites</h4>
      <EdBullets>
        <li>Step 1 complete.</li>
        <li>
          Infrastructure and network teams engaged; outbound/inbound routes to pre-production Hub
          endpoints agreed.
        </li>
        <li>mTLS certificate material in place from Step 1.</li>
      </EdBullets>

      <h4>What to do</h4>
      <EdBullets>
        <li>
          Complete the
          <a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/prerequisites">Prerequisites Questionnaire</a>.
        </li>
        <li>
          Set up
          <a href="/tech/lfi-api-hub/v2.1/api-hub/connectivity/">Connectivity &amp; Certificates</a>.
        </li>
        <li>
          Configure
          <a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/application-layer-auth">Application Layer Authentication</a>,
          then implement the
          <a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/configuring-authentication/mtls-server">mTLS and JWT Auth layers</a>.
        </li>
        <li>
          Apply the
          <a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/">Environment-Specific configuration</a>
          for pre-production (Ozone Connect base URL, authorization endpoint, certificate walkthroughs).
        </li>
      </EdBullets>

      <h4>Done when</h4>
      <EdBullets>
        <li>The Hub can complete an mTLS handshake with your pre-production environment.</li>
        <li>
          A test request flows end-to-end: Hub &rarr; your Ozone Connect endpoint &rarr; response back to
          the Hub.
        </li>
        <li>
          Your application-layer authentication (JWT signatures, audience, expiry) is verified by the Hub.
        </li>
      </EdBullets>

      <h3>Step 3. Develop Your Open Finance APIs</h3>
      <EdProse>
        This is the core build phase. It covers both directions of integration between the LFI and the Hub:
      </EdProse>

      <EdBullets>
        <li>
          <strong>APIs your LFI exposes (Ozone Connect).</strong> Banking data sharing, payment initiation,
          Confirmation of Payee, and consent events. The Hub calls these on behalf of authorised TPPs.
        </li>
        <li>
          <strong>APIs your LFI consumes (API Hub).</strong> The
          <a href="/tech/lfi-api-hub/v2.1/api-hub/consent-manager/">Consent Manager</a>
          to retrieve, inspect, and revoke consents; and the
          <a href="/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/">Headless Heimdall Auth Server</a>
          to hand off and return authorization results during the consent journey.
        </li>
      </EdBullets>

      <EdProse>
        Because API Hub is the single source of truth for consent, your LFI does not maintain independent
        consent state &mdash; it queries the Hub for consent details and writes lifecycle events back to
        the Hub as the PSU journey progresses.
      </EdProse>

      <h4>Prerequisites</h4>
      <EdBullets>
        <li>Step 2 complete (end-to-end connectivity verified).</li>
        <li>
          Product scope agreed (which account types, payment types, and optional APIs are in scope for
          launch).
        </li>
        <li>
          Internal teams aligned on the
          <a href="/tech/lfi-api-hub/v2.1/consent-journey/api-guide">consent journey</a>
          user experience and the
          <a href="/tech/lfi-api-hub/v2.1/consent-management-interface/">Consent Management Interface</a>
          your LFI will provide to customers.
        </li>
      </EdBullets>

      <h4>What to do</h4>
      <EdBullets>
        <li>Implement the LFI-exposed APIs per the OpenAPI specifications.</li>
        <li>
          Integrate the LFI-consumed APIs:
          <ul>
            <li>
              Build the authentication and authorization steps of the
              <a href="/tech/lfi-api-hub/v2.1/consent-journey/api-guide">Consent Journey</a>, including
              <a href="/tech/lfi-api-hub/v2.1/consent-journey/authentication/sca">SCA</a>, returning
              results to Headless Heimdall.
            </li>
            <li>
              Use the
              <a href="/tech/lfi-api-hub/v2.1/api-hub/consent-manager/">Consent Manager API</a> to retrieve
              consent context and expose consents through your
              <a href="/tech/lfi-api-hub/v2.1/consent-management-interface/">Consent Management Interface</a>.
            </li>
          </ul>
        </li>
      </EdBullets>

      <EdProse>
        Because Step 3 is the largest body of work and has strong sequencing dependencies, we recommend
        following the
        <a href="/tech/lfi-api-hub/getting-started/bank-rollout-plan">Recommended Bank Rollout Plan</a>
        (for LFIs with a banking scope) or the
        <a href="/tech/lfi-api-hub/getting-started/insurance-rollout-plan">Recommended Insurance Rollout Plan</a>
        (for LFIs with an insurance scope), which walk through the order in which to deliver these
        capabilities and how to stage internal delivery against certification milestones.
      </EdProse>

      <h4>Done when (per capability)</h4>
      <EdBullets>
        <li>
          For the capability in delivery, all endpoints respond in line with their OpenAPI specifications.
        </li>
        <li>
          The Hub can drive a full PSU journey for that capability: PAR &rarr; authorization at the LFI
          &rarr; token issuance &rarr; data or payment call &rarr; consent visible in the Consent
          Management Interface.
        </li>
        <li>
          Consent lifecycle events (authorised, revoked, expired) flow cleanly between Hub and LFI in both
          directions for that capability.
        </li>
      </EdBullets>

      <EdProse>
        Once the &ldquo;Done when&rdquo; criteria are satisfied for a capability, it can proceed into
        Phase B independently of other capabilities still in development.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="phase-b"
      num="B"
      color="var(--at-gold)"
      eyebrow="Phase B · Certification"
      title="Test and Certify Your Open Finance Capabilities"
      tone="surface"
    >
      <h3>Step 4. Test and Certify Your Open Finance Capabilities</h3>
      <EdNote type="info" title="To be added">
        <p>Detailed certification content is being finalised and will appear here.</p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="phase-c"
      num="C"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Phase C · Production"
      title="Launch"
      tone="cream"
    >
      <h3>Step 5. Onboard to the Production Trust Framework</h3>
      <EdProse>
        Repeat the Trust Framework registration in the production environment. Production is a separate
        Trust Framework instance with its own directory, certificates, and application registrations
        &mdash; sandbox artefacts are not reused.
      </EdProse>

      <h4>Prerequisites</h4>
      <EdBullets>
        <li>Step 4 complete; certification evidence accepted.</li>
        <li>Production-grade transport and signing certificates issued.</li>
      </EdBullets>

      <h4>What to do</h4>
      <EdBullets>
        <li>
          Re-run the
          <a href="/tech/lfi-api-hub/trust-framework/onboarding">Trust Framework onboarding</a> process
          against production.
        </li>
        <li>
          Upload production
          <a href="/tech/lfi-api-hub/trust-framework/certificates/">certificates</a> and register the
          production
          <a href="/tech/lfi-api-hub/trust-framework/creating-c3-application">C3-hh-cm-client application</a>.
        </li>
        <li>
          Confirm production
          <a href="/tech/lfi-api-hub/trust-framework/roles">roles</a> and
          <a href="/tech/lfi-api-hub/trust-framework/contacts">contacts</a>.
        </li>
      </EdBullets>

      <h4>Done when</h4>
      <EdBullets>
        <li>
          Your organisation is listed in the production Trust Framework directory with the correct role.
        </li>
        <li>Production application and certificates are registered.</li>
      </EdBullets>

      <h3>Step 6. Set Up and Connect to the Production API Hub</h3>
      <EdProse>Repeat the API Hub connectivity setup in production.</EdProse>

      <h4>Prerequisites</h4>
      <EdBullets>
        <li>Step 5 complete.</li>
        <li>Production environment(s) built and available.</li>
      </EdBullets>

      <h4>What to do</h4>
      <EdBullets>
        <li>
          Configure production connectivity and mTLS with the production Hub &mdash; see
          <a href="/tech/lfi-api-hub/v2.1/api-hub/connectivity/">Connectivity &amp; Certificates</a> and
          the production-specific entries in
          <a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/">Environment-Specific configuration</a>.
        </li>
        <li>
          Re-run the
          <a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/application-layer-auth">Application Layer Authentication</a>
          setup against production keys.
        </li>
      </EdBullets>

      <h4>Done when</h4>
      <EdBullets>
        <li>
          An mTLS handshake and authenticated test request succeed between the production Hub and your
          production environment.
        </li>
        <li>
          No Pre-production credentials or endpoints remain referenced in production configuration.
        </li>
      </EdBullets>

      <h3>Step 7. Validate Your APIs in Production</h3>
      <EdProse>
        A pre-live validation pass against the production environment using controlled, internal test
        accounts. This is the last check before real customer traffic.
      </EdProse>

      <h4>Prerequisites</h4>
      <EdBullets>
        <li>Step 6 complete.</li>
        <li>Controlled test PSUs (bank-staff accounts) available in production.</li>
        <li>Error handling, monitoring, and audit logging enabled.</li>
      </EdBullets>

      <h4>What to do</h4>
      <EdBullets>
        <li>
          Execute the
          <a href="/tech/lfi-api-hub/production/testing-certification/self-testing">attestation and self-testing</a>
          flows against production.
        </li>
        <li>Walk through full consent, data sharing, and payment journeys end-to-end.</li>
        <li>Verify that error mapping, logging, and observability behave as in Pre-production.</li>
      </EdBullets>

      <h4>Done when</h4>
      <EdBullets>
        <li>All critical flows succeed in production with controlled accounts.</li>
        <li>Monitoring and alerting are confirmed live.</li>
        <li>No real customer traffic has been processed.</li>
      </EdBullets>

      <h3>Step 8. Publish Your Open Finance Resources to the Ecosystem</h3>
      <EdProse>
        Make your certified production APIs discoverable to TPPs by publishing them in the Trust
        Framework.
      </EdProse>

      <h4>Prerequisites</h4>
      <EdBullets>
        <li>Step 7 complete.</li>
        <li>Production API resource URLs and metadata finalised.</li>
      </EdBullets>

      <h4>What to do</h4>
      <EdBullets>
        <li>
          In the production Trust Framework, create your
          <a href="/tech/lfi-api-hub/trust-framework/servers/creating">authorisation server</a> and
          register your
          <a href="/tech/lfi-api-hub/trust-framework/servers/api/">API resources</a> with the correct
          metadata (API family, version, endpoints).
        </li>
        <li>Confirm that directory metadata matches the endpoints actually deployed.</li>
      </EdBullets>

      <h4>Done when</h4>
      <EdBullets>
        <li>
          TPPs can discover your authorisation server and API resources through the Trust Framework
          directory.
        </li>
        <li>
          Resource metadata (family, version, URLs) is correct and consistent with deployed
          infrastructure.
        </li>
      </EdBullets>

      <h3>Step 9. Live Proving with TPPs</h3>
      <EdProse>
        Controlled, real-customer validation with a small number of TPPs before opening to the wider
        ecosystem.
      </EdProse>

      <h4>Prerequisites</h4>
      <EdBullets>
        <li>Step 8 complete.</li>
        <li>One or more TPP partners identified for buddying.</li>
        <li>Incident response and on-call processes in place.</li>
      </EdBullets>

      <h4>What to do</h4>
      <EdBullets>
        <li>
          Run
          <a href="/tech/lfi-api-hub/production/testing-certification/tpp-buddying">TPP Buddying</a>
          sessions with each partner.
        </li>
        <li>Exercise the full end-to-end flow with real PSUs.</li>
        <li>Triage and resolve any issues surfaced during proving.</li>
      </EdBullets>

      <h4>Done when</h4>
      <EdBullets>
        <li>Each buddying TPP reports successful end-to-end flows with real customers.</li>
        <li>Any defects raised during proving are resolved or formally accepted.</li>
        <li>You are ready to open to general TPP traffic.</li>
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
.ed-doc__lede--tight { margin-top: 0.85rem; }
.ed-doc__lede :deep(strong) { color: var(--at-navy-deep); font-weight: 600; }
.ed-doc__lede :deep(a) {
  color: var(--at-teal-deep);
  text-decoration: none;
  border-bottom: 1px solid currentColor;
}

.ed-doc__intro {
  background: var(--at-bg-cream);
  border-bottom: 1px solid var(--at-grid-line);
  padding: 0 0 3rem;
}
.ed-doc__intro .ed-doc__inner { padding-top: 0; padding-bottom: 0; }

/* Phase jump cards — click to anchor down to the matching phase band. */
.ed-doc__phase-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin: 0 0 2rem;
  scroll-behavior: smooth;
}

.ed-doc__phase-card {
  position: relative;
  display: flex;
  flex-direction: column;
  background: #fff;
  border: 1px solid var(--at-grid-line);
  padding: 1.75rem 1.5rem 1.25rem;
  text-decoration: none;
  color: inherit;
  transition: border-color 0.2s ease, transform 0.2s ease;
}
.ed-doc__phase-card:hover {
  border-color: var(--card-color, var(--at-navy));
  transform: translateY(-2px);
}

.ed-doc__phase-card-top {
  position: absolute;
  top: 0;
  left: 0;
  width: 48px;
  height: 3px;
  background: var(--card-color, var(--at-navy));
}

.ed-doc__phase-card-meta {
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  margin-bottom: 0.7rem;
}
.ed-doc__phase-card-cat {
  color: var(--card-color, var(--at-navy));
  font-weight: 700;
}

.ed-doc__phase-card-title {
  font-family: var(--at-serif);
  font-size: 1.25rem;
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: var(--at-navy-deep);
  margin: 0 0 0.7rem;
}

.ed-doc__phase-card-desc {
  font-family: var(--at-sans);
  font-size: 0.92rem;
  line-height: 1.55;
  color: var(--at-mute-2);
  margin: 0 0 1.1rem;
  flex: 1;
}

.ed-doc__phase-card-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 0.85rem;
  border-top: 1px solid var(--at-grid-line);
}
.ed-doc__phase-card-cta {
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-mute);
}
.ed-doc__phase-card-arrow {
  font-family: var(--at-mono);
  font-size: 1rem;
  color: var(--card-color, var(--at-navy));
  transition: transform 0.2s ease;
}
.ed-doc__phase-card:hover .ed-doc__phase-card-cta { color: var(--at-navy-deep); }
.ed-doc__phase-card:hover .ed-doc__phase-card-arrow { transform: translateY(3px); }

/* Anchored phase bands need breathing room below the fixed page header. */
.ed-doc :deep(.ed-band) { scroll-margin-top: 5rem; }

/* Step headings inside each phase band — override EdSectionBand's default h3
   to make Step N. ... feel like a section title rather than a sub-heading. */
.ed-doc :deep(.ed-band__inner > h3) {
  font-family: var(--at-serif);
  font-size: clamp(1.45rem, 2.4vw, 1.85rem);
  font-weight: 600;
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: var(--at-navy-deep);
  margin: 3rem 0 1.1rem;
  padding-top: 1.75rem;
  border-top: 1px solid var(--at-grid-line);
}
.ed-doc :deep(.ed-band__inner > h3:first-child) {
  margin-top: 0;
  padding-top: 0;
  border-top: 0;
}

@media (max-width: 900px) {
  .ed-doc__phase-grid { grid-template-columns: 1fr; }
}

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
  .ed-doc__intro { padding: 0 0 2rem; }
}
</style>
