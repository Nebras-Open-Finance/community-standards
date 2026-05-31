<route lang="yaml">
meta:
  title: Recommended Insurance Rollout Plan
</route>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          LFI · Getting Started · Insurance Rollout Plan
        </div>
        <h1 class="ed-doc__title">
          Recommended Insurance Rollout Plan
          <span class="ed-doc__read">5 min read</span>
        </h1>
        <p class="ed-doc__lede">
          This page proposes a sensible delivery sequence for an LFI working through
          <a href="/tech/lfi-api-hub/getting-started/">Step 3 of the LFI Integration Journey</a> when its
          Open Finance scope covers insurance. It is intended as a starting path that breaks the work into
          manageable increments &mdash; the LFI picks a single insurance type to deliver end-to-end first,
          then extends to the rest of its book once the first type is live.
        </p>
      </div>
    </section>

    <section class="ed-doc__intro">
      <div class="ed-doc__inner">
        <EdNote type="warning" title="Guidance only">
          <p>
            This rollout plan is guidance. The Central Bank of the UAE sets the actual regulatory
            requirements and deadlines &mdash; those MUST always take precedence. It is the LFI's
            responsibility to assess how best to meet their obligations. This page recommends a delivery
            order; it does not define scope or timing.
          </p>
        </EdNote>

        <EdProse>
          Each phase below is a self-contained delivery increment. A phase can be taken end-to-end through
          <a href="/tech/lfi-api-hub/getting-started/#phase-a">Step 3 &rarr; Step 9</a>
          (build, certify, go live) before the next phase is started, or phases can be run in parallel
          where resourcing allows.
        </EdProse>

        <EdProse>
          The plan is shaped around one core idea: an LFI that underwrites more than one insurance type
          should <strong>pick a primary insurance type first</strong> &mdash; typically the type with the
          largest in-force book or the highest expected TPP demand &mdash; and deliver it through every
          phase before extending to the rest. This contains scope, lets the LFI prove the consent journey
          and Ozone Connect endpoints against a single product model, and avoids spreading certification
          and production launch effort across multiple insurance types in parallel.
        </EdProse>
      </div>
    </section>

    <EdSectionBand
      id="phase-1"
      num="1"
      color="var(--at-teal)"
      eyebrow="Phase 1"
      title="Foundations and First Insurance Type — Data Sharing"
      tone="cream"
    >
      <EdProse>
        Phase 1 establishes the foundational integration with the API Hub and delivers Insurance Data
        Sharing for the LFI's chosen primary insurance type, end-to-end through certification and
        production launch.
      </EdProse>

      <h3>1. Consent Validate</h3>
      <EdProse>
        Implement the
        <a href="/tech/lfi-api-hub/v2.1/consent-events/open-api/validate" class="endpoint"><span class="http-method http-method--post">POST</span><code>/consent/action/validate</code></a>
        endpoint on your Ozone Connect server.
      </EdProse>
      <EdProse>
        This endpoint is called by the API Hub <strong>before</strong> a consent is stored, and lets your
        LFI signal which consent types and permissions you support. Building this first means you can
        safely reject any consent type you haven't yet implemented, and then expand the accepted set as
        each subsequent capability comes online.
      </EdProse>
      <EdProse>
        See the
        <a href="/tech/lfi-api-hub/v2.1/consent-events/api-guide">Consent Events API Guide</a>
        for implementation details.
      </EdProse>

      <h3>2. Consent Journey</h3>
      <EdProse>
        Implement the authorization interaction between your LFI and the API Hub. These are the five
        endpoints your LFI calls against the Hub to drive a consent through customer authentication,
        authorization, and return to TPP:
      </EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Endpoint</th>
              <th>Direction</th>
              <th>Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <a href="/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/open-api/auth" class="endpoint"><span class="http-method http-method--get">GET</span><code>/auth</code></a>
              </td>
              <td>LFI &rarr; API Hub</td>
              <td>Initiate the authorization interaction</td>
            </tr>
            <tr>
              <td>
                <a href="/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consents-consentId" class="endpoint"><span class="http-method http-method--get">GET</span><code>/consents/{consentId}</code></a>
              </td>
              <td>LFI &rarr; API Hub</td>
              <td>Retrieve the full consent details</td>
            </tr>
            <tr>
              <td>
                <a href="/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/patch-consents-consentId" class="endpoint"><span class="http-method http-method--patch">PATCH</span><code>/consents/{consentId}</code></a>
              </td>
              <td>LFI &rarr; API Hub</td>
              <td>Update consent status, customer identifiers, and policy IDs</td>
            </tr>
            <tr>
              <td>
                <a href="/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/open-api/auth-interactionId-doConfirm" class="endpoint"><span class="http-method http-method--post">POST</span><code>/auth/{interactionId}/doConfirm</code></a>
              </td>
              <td>LFI &rarr; API Hub</td>
              <td>Complete the authorization interaction and redirect back to TPP successfully</td>
            </tr>
            <tr>
              <td>
                <a href="/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/open-api/auth-interactionId-doFail" class="endpoint"><span class="http-method http-method--post">POST</span><code>/auth/{interactionId}/doFail</code></a>
              </td>
              <td>LFI &rarr; API Hub</td>
              <td>Complete the authorization interaction and redirect back to TPP with a failure</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>
        See the
        <a href="/tech/lfi-api-hub/v2.1/consent-journey/api-guide">Consent Journey API Guide</a>
        for the end-to-end sequence, including customer authentication requirements
        (<a href="/tech/lfi-api-hub/v2.1/consent-journey/authentication/sca">SCA</a>) and identifier rules.
      </EdProse>

      <h3>3. Pick a Primary Insurance Type</h3>
      <EdProse>
        Before building any Insurance Data Sharing endpoints, select <strong>one</strong> insurance type
        from the seven sectors covered by the standard:
      </EdProse>

      <EdBullets>
        <li><strong>Employment</strong> insurance</li>
        <li><strong>Health</strong> insurance</li>
        <li><strong>Home</strong> insurance</li>
        <li><strong>Life</strong> insurance</li>
        <li><strong>Motor</strong> insurance</li>
        <li><strong>Renters</strong> insurance</li>
        <li><strong>Travel</strong> insurance</li>
      </EdBullets>

      <EdProse>
        If your LFI underwrites more than one of these, pick the type you judge best to start with &mdash;
        typically the one with the largest in-force book, the highest expected TPP demand, or the cleanest
        mapping from your existing policy administration system into the standard's schema. The remaining
        types are picked up in <a href="#phase-3">Phase 3</a> once Phase 1 and Phase 2 are live for the
        primary type.
      </EdProse>

      <h3>4. Insurance Data Sharing &mdash; Primary Type</h3>
      <EdProse>
        Implement
        <a href="/tech/lfi-api-hub/v2.1/insurance/data-sharing/">Insurance Data Sharing</a>
        for the primary insurance type chosen above. Each insurance type is exposed through one pair of
        Ozone Connect endpoints &mdash; substitute the sector slug for your chosen type
        (<code>employment</code>, <code>health</code>, <code>home</code>, <code>life</code>,
        <code>motor</code>, <code>renters</code>, or <code>travel</code>):
      </EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Endpoint</th>
              <th>Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <span class="endpoint"><span class="http-method http-method--get">GET</span><code>/{sector}-insurance-policies</code></span>
              </td>
              <td>List the policies covered by the consent</td>
            </tr>
            <tr>
              <td>
                <span class="endpoint"><span class="http-method http-method--get">GET</span><code>/{sector}-insurance-policies/{InsurancePolicyId}</code></span>
              </td>
              <td>Retrieve full details for a single policy</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>
        See
        <a href="/tech/lfi-api-hub/v2.1/insurance/data-sharing/requirements">Data Sharing &mdash; Requirements</a>
        and the
        <a href="/tech/lfi-api-hub/v2.1/insurance/data-sharing/api-guide/">Data Sharing API Guide</a>.
        Where the consent includes <code>ReadInsurancePremium</code>, the <code>Premium</code> field MUST
        be returned as a JWE &mdash; see
        <a href="/tech/lfi-api-hub/v2.1/insurance/data-sharing/api-guide/premiums">Encrypted Premiums</a>.
      </EdProse>

      <EdProse>
        Once live, update the
        <a href="/tech/lfi-api-hub/v2.1/consent-events/open-api/validate" class="endpoint"><span class="http-method http-method--post">POST</span><code>/consent/action/validate</code></a>
        response to accept Insurance Data Sharing consents for the chosen sector.
      </EdProse>

      <h3>5. Consent Management Interface</h3>
      <EdProse>
        Provide a
        <a href="/tech/lfi-api-hub/v2.1/consent-management-interface/">Consent Management Interface</a>
        (CMI) in your customer-facing channels so policyholders can view and revoke their active insurance
        consents.
      </EdProse>

      <EdProse>
        The CMI is sequenced last in Phase 1 because it consumes consents created by the Insurance Data
        Sharing capability. It is built against the Hub's Consent Manager APIs &mdash; the same endpoints
        the bank rollout uses, since the Consent Manager surface is consent-type agnostic:
      </EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Endpoint</th>
              <th>Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <a href="/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/psu-userId-consents" class="endpoint"><span class="http-method http-method--get">GET</span><code>/psu/{userId}/consents</code></a>
              </td>
              <td>List all consents for a given customer</td>
            </tr>
            <tr>
              <td>
                <a href="/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consents-consentId" class="endpoint"><span class="http-method http-method--get">GET</span><code>/consents/{consentId}</code></a>
              </td>
              <td>Retrieve the full details of a consent</td>
            </tr>
            <tr>
              <td>
                <a href="/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consents-consentId-action-revoke" class="endpoint"><span class="http-method http-method--post">POST</span><code>/consents/{consentId}/action/revoke</code></a>
              </td>
              <td>Revoke a specific consent</td>
            </tr>
            <tr>
              <td>
                <a href="/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consent-groups-consentGroupId-consents-action-revoke" class="endpoint"><span class="http-method http-method--post">POST</span><code>/consent-groups/{consentGroupId}/consents/action/revoke</code></a>
              </td>
              <td>Revoke a group of related consents</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>
        See
        <a href="/tech/lfi-api-hub/v2.1/consent-management-interface/insurance-data-sharing/requirements">CMI &mdash; Insurance Data Sharing Requirements</a>,
        <a href="/tech/lfi-api-hub/v2.1/consent-management-interface/insurance-data-sharing/user-experience">User Experience</a>,
        and the
        <a href="/tech/lfi-api-hub/v2.1/consent-management-interface/api-guide">CMI API Guide</a>.
      </EdProse>

      <EdProse>
        With Phase 1 complete, take the work through
        <a href="/tech/lfi-api-hub/getting-started/#phase-b">Certification</a> and
        <a href="/tech/lfi-api-hub/getting-started/#phase-c">Production Launch</a> for the chosen primary
        insurance type before starting Phase 2.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="phase-2"
      num="2"
      color="var(--at-gold)"
      eyebrow="Phase 2"
      title="First Insurance Type — Quotation"
      tone="surface"
    >
      <EdProse>
        Phase 2 adds the Insurance Quotation capability for the <strong>same insurance type</strong>
        delivered in Phase 1. Building quotation against a type the LFI has already taken end-to-end keeps
        the consent journey, customer identification, and Ozone Connect integration patterns familiar
        &mdash; the only new work is the quotation flow itself.
      </EdProse>

      <EdNote type="info" title="Forthcoming capability">
        <p>
          Insurance Quotation is a forthcoming capability and is not yet published in these standards.
          When it is published, this phase will be updated with the endpoint list, requirements, and API
          guide links. Track the
          <a href="/tech/release-notes-and-erratas/release-notes/api-hub/2026">API Hub Release Notes</a>
          for the publication date.
        </p>
      </EdNote>

      <EdProse>
        Extend
        <a href="/tech/lfi-api-hub/v2.1/consent-events/open-api/validate" class="endpoint"><span class="http-method http-method--post">POST</span><code>/consent/action/validate</code></a>
        to accept Insurance Quotation consents for the chosen sector once the capability goes live, and
        take Phase 2 through Certification and Production Launch before starting Phase 3.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="phase-3"
      num="3"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Phase 3"
      title="Extend to Additional Insurance Types"
      tone="cream"
    >
      <EdProse>
        Phase 3 applies to LFIs that underwrite more than one insurance type. Once Phase 1 and Phase 2 are
        live for the primary type, repeat the same delivery pattern for each additional insurance type the
        LFI offers:
      </EdProse>

      <EdBullets>
        <li>Implement Insurance Data Sharing for the additional sector (<code>/{sector}-insurance-policies</code> and <code>/{sector}-insurance-policies/{InsurancePolicyId}</code>)</li>
        <li>Extend the CMI to surface consents for the additional sector (no new endpoints &mdash; the Consent Manager APIs already cover it)</li>
        <li>Implement Insurance Quotation for the additional sector once that capability is live</li>
        <li>Extend
          <span class="endpoint"><span class="http-method http-method--post">POST</span><code>/consent/action/validate</code></span>
          to accept consents for the additional sector
        </li>
      </EdBullets>

      <EdProse>
        Each additional insurance type is a self-contained delivery increment and should be taken through
        Certification and Production Launch before the next one is started, unless resourcing allows
        types to be brought live in parallel.
      </EdProse>

      <EdProse>
        The endpoints and consent-journey integration are the same across all seven sectors &mdash; the
        additional work is in mapping each insurance type's policy and customer data into the
        standard's schemas.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="after-phase-3"
      num="4"
      color="var(--at-teal-deep)"
      eyebrow="After Phase 3"
      title="Ongoing version upgrades and regulatory change"
      tone="surface"
    >
      <EdProse>
        By the end of Phase 3 the LFI will have delivered Insurance Data Sharing, the Consent Management
        Interface, and Insurance Quotation for every insurance type it underwrites. From here, ongoing
        work is driven by version upgrades, new API families, errata, and regulatory changes &mdash;
        continue to track the
        <a href="/tech/release-notes-and-erratas/release-notes/api-hub/2026">API Hub Release Notes</a>
        schedule and plan subsequent work against your own delivery cycles.
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

/* Sub-step headings inside each phase band — match the step sizing in
   /lfi-api-hub/getting-started/. */
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

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
  .ed-doc__intro { padding: 0 0 2rem; }
}
</style>
