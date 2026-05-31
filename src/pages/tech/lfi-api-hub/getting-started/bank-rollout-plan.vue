<route lang="yaml">
meta:
  title: Recommended Bank Rollout Plan
</route>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          LFI · Getting Started · Rollout Plan
        </div>
        <h1 class="ed-doc__title">
          Recommended Bank Rollout Plan
          <span class="ed-doc__read">6 min read</span>
        </h1>
        <p class="ed-doc__lede">
          This page proposes a sensible delivery sequence for an LFI working through
          <a href="/tech/lfi-api-hub/getting-started/">Step 3 of the LFI Integration Journey</a>. It is
          intended as a starting path that breaks the work into manageable increments &mdash; once you
          have completed Phase 1 you will be well-placed to decide the order of subsequent capabilities
          based on your own priorities and constraints.
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
      </div>
    </section>

    <EdSectionBand
      id="phase-1"
      num="1"
      color="var(--at-teal)"
      eyebrow="Phase 1"
      title="Foundations and Retail Core"
      tone="cream"
    >
      <EdProse>
        Phase 1 establishes the foundational integration with the API Hub and delivers the first
        customer-facing capability (Retail Data Sharing) followed by the simplest payment journey.
      </EdProse>

      <EdProse>
        The steps are ordered so each builds on the last &mdash; ordering within the phase is a
        recommendation, not a hard dependency graph, except where an API clearly depends on another being
        present (e.g. Refunds requires a completed payment).
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
              <td>Update consent status, customer identifiers, and account IDs</td>
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

      <h3>3. Retail Data Sharing &mdash; Current &amp; Savings Accounts</h3>
      <EdProse>
        Implement
        <a href="/tech/lfi-api-hub/v2.1/banking/data-sharing/">Bank Data Sharing</a>
        for retail Current Accounts and Savings Accounts. Data Sharing is recommended as the first
        productised capability because it exercises the full consent journey end-to-end without the
        additional complexity of payment execution or encrypted PII.
      </EdProse>

      <EdProse>Prioritise the following endpoints:</EdProse>

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
                <a href="/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts" class="endpoint"><span class="http-method http-method--get">GET</span><code>/accounts</code></a>
              </td>
              <td>List the accounts covered by the consent</td>
            </tr>
            <tr>
              <td>
                <a href="/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId" class="endpoint"><span class="http-method http-method--get">GET</span><code>/accounts/{AccountId}</code></a>
              </td>
              <td>Retrieve details for a single account</td>
            </tr>
            <tr>
              <td>
                <a href="/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-balances" class="endpoint"><span class="http-method http-method--get">GET</span><code>/accounts/{AccountId}/balances</code></a>
              </td>
              <td>Retrieve balances for an account</td>
            </tr>
            <tr>
              <td>
                <a href="/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-transactions" class="endpoint"><span class="http-method http-method--get">GET</span><code>/accounts/{AccountId}/transactions</code></a>
              </td>
              <td>Retrieve the transaction history for an account</td>
            </tr>
            <tr>
              <td>
                <a href="/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/customer" class="endpoint"><span class="http-method http-method--get">GET</span><code>/customer</code></a>
              </td>
              <td>Retrieve the customer details covered by the consent</td>
            </tr>
            <tr>
              <td>
                <a href="/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-customer" class="endpoint"><span class="http-method http-method--get">GET</span><code>/accounts/{AccountId}/customer</code></a>
              </td>
              <td>Retrieve customer details for a specific account</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>
        See
        <a href="/tech/lfi-api-hub/v2.1/banking/data-sharing/requirements">Data Sharing &mdash; Requirements</a>
        and the
        <a href="/tech/lfi-api-hub/v2.1/banking/data-sharing/api-guide/">Data Sharing API Guide</a>.
      </EdProse>

      <EdProse>
        Once live, update the
        <a href="/tech/lfi-api-hub/v2.1/consent-events/open-api/validate" class="endpoint"><span class="http-method http-method--post">POST</span><code>/consent/action/validate</code></a>
        response to accept Bank Data Sharing consents.
      </EdProse>

      <h3>4. Retail Domestic &mdash; Single Instant Payment</h3>
      <EdProse>
        Implement the
        <a href="/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/single-instant-payment/requirements">Single Instant Payment</a>
        journey for retail customers. This introduces payment execution and the handling of encrypted PII
        on payment consents.
      </EdProse>

      <EdProse>Key endpoints:</EdProse>

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
                <a href="/tech/lfi-api-hub/v2.1/banking/service-initiation/open-api/payments" class="endpoint"><span class="http-method http-method--post">POST</span><code>/payments</code></a>
              </td>
              <td>Execute an authorised payment</td>
            </tr>
            <tr>
              <td>
                <a href="/tech/lfi-api-hub/v2.1/banking/service-initiation/open-api/payments-PaymentId" class="endpoint"><span class="http-method http-method--get">GET</span><code>/payments/{PaymentId}</code></a>
              </td>
              <td>Retrieve the status of a payment</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>
        See the
        <a href="/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/single-instant-payment/api-guide">Single Instant Payment API Guide</a>,
        <a href="/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/overview/payment-status">Payment Rails and Status</a>,
        and the
        <a href="/tech/lfi-api-hub/v2.1/banking/service-initiation/personal-identifiable-information/">Personal Identifiable Information</a>
        guide for PII decryption.
      </EdProse>

      <EdProse>
        Extend <span class="endpoint"><span class="http-method http-method--post">POST</span><code>/consent/action/validate</code></span> to accept Single Instant Payment consents.
      </EdProse>

      <h3>5. Refunds</h3>
      <EdProse>
        Implement
        <a href="/tech/lfi-api-hub/v2.1/banking/service-initiation/refunds/requirements">Refunds</a>
        against completed payment consents. Refunds depend on the payment capability from the previous
        step being live.
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
                <a href="/tech/lfi-api-hub/v2.1/banking/service-initiation/open-api/payment-consents-ConsentId-refund" class="endpoint"><span class="http-method http-method--get">GET</span><code>/payment-consents/{ConsentId}/refund</code></a>
              </td>
              <td>Retrieve refund details for a payment consent</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>
        See the
        <a href="/tech/lfi-api-hub/v2.1/banking/service-initiation/refunds/api-guide">Refunds API Guide</a>.
      </EdProse>

      <h3>6. Confirmation of Payee</h3>
      <EdProse>
        Implement
        <a href="/tech/lfi-api-hub/v2.1/banking/confirmation-of-payee/requirements">Confirmation of Payee</a>
        (CoP). CoP does not use the consent journey &mdash; it is a direct LFI-exposed API proxied via the
        Hub &mdash; so it can be delivered in parallel with the earlier payment and data sharing work if
        resourcing allows.
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
                <a href="/tech/lfi-api-hub/v2.1/banking/confirmation-of-payee/open-api/cop-query" class="endpoint"><span class="http-method http-method--post">POST</span><code>/customers/action/cop-query</code></a>
              </td>
              <td>Verify a payee's name against an account identifier</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>
        See the
        <a href="/tech/lfi-api-hub/v2.1/banking/confirmation-of-payee/api-guide">CoP API Guide</a>
        and
        <a href="/tech/lfi-api-hub/v2.1/banking/confirmation-of-payee/user-journeys">user journeys</a>.
      </EdProse>

      <h3>7. Consent Management Interface</h3>
      <EdProse>
        Provide a
        <a href="/tech/lfi-api-hub/v2.1/consent-management-interface/">Consent Management Interface</a>
        (CMI) in your retail banking channels so customers can view and revoke their active consents.
      </EdProse>

      <EdProse>
        The CMI is sequenced last in Phase 1 because it consumes consents created by the earlier
        capabilities. It is built against the Hub's Consent Manager APIs:
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
        <a href="/tech/lfi-api-hub/v2.1/consent-management-interface/bank-data-sharing/requirements">CMI &mdash; Bank Data Sharing Requirements</a>,
        <a href="/tech/lfi-api-hub/v2.1/consent-management-interface/bank-service-initiation/requirements">Bank Service Initiation Requirements</a>,
        the corresponding
        <a href="/tech/lfi-api-hub/v2.1/consent-management-interface/bank-data-sharing/user-experience">User Experience</a>
        pages, and the
        <a href="/tech/lfi-api-hub/v2.1/consent-management-interface/api-guide">CMI API Guide</a>.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="phase-2"
      num="2"
      color="var(--at-gold)"
      eyebrow="Phase 2"
      title="Extend Retail"
      tone="surface"
    >
      <EdProse>
        Phase 2 rounds out the retail offering with the more complex payment types and the discovery APIs.
      </EdProse>

      <h3>Domestic Multi-Payments (all flavours)</h3>
      <EdProse>Implement all remaining domestic payment types for retail customers:</EdProse>

      <EdBullets>
        <li>
          <a href="/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/multi-payments/variable-on-demand/requirements">Variable On-Demand</a>
        </li>
        <li>
          <a href="/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/multi-payments/fixed-on-demand/requirements">Fixed On-Demand</a>
        </li>
        <li>
          <a href="/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/multi-payments/variable-periodic-schedule/requirements">Variable Periodic Schedule</a>
        </li>
        <li>
          <a href="/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/multi-payments/fixed-periodic-schedule/requirements">Fixed Periodic Schedule</a>
        </li>
        <li>
          <a href="/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/multi-payments/variable-defined-schedule/requirements">Variable Defined Schedule</a>
        </li>
        <li>
          <a href="/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/multi-payments/fixed-defined-schedule/requirements">Fixed Defined Schedule</a>
        </li>
        <li>
          <a href="/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/multi-payments/delegated-sca/requirements">Delegated SCA</a>
        </li>
      </EdBullets>

      <EdProse>
        Extend <span class="endpoint"><span class="http-method http-method--post">POST</span><code>/consent/action/validate</code></span> to accept each multi-payment consent type as you
        bring it live.
      </EdProse>

      <h3>Products &amp; Leads</h3>
      <EdProse>
        Implement the
        <a href="/tech/lfi-api-hub/v2.1/banking/products-and-leads/requirements">Products &amp; Leads</a>
        APIs. See the
        <a href="/tech/lfi-api-hub/v2.1/banking/products-and-leads/api-guide">Products &amp; Leads API Guide</a>.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="phase-3"
      num="3"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Phase 3"
      title="Data Sharing Breadth and SME Foundations"
      tone="cream"
    >
      <EdProse>
        Phase 3 extends Data Sharing to additional product types and introduces the SME proposition.
      </EdProse>

      <h3>Extended Retail Data Sharing</h3>
      <EdProse>Add Data Sharing for additional retail product categories:</EdProse>

      <EdBullets>
        <li><strong>Credit Card</strong> accounts</li>
        <li><strong>Finance</strong> accounts</li>
        <li><strong>Mortgage</strong> accounts</li>
      </EdBullets>

      <EdProse>
        These reuse the same Data Sharing endpoints delivered in Phase 1 &mdash; the additional work is in
        mapping your core banking product data into the Data Sharing schemas.
      </EdProse>

      <h3>SME Data Sharing &mdash; Current &amp; Savings Accounts</h3>
      <EdProse>
        Deliver
        <a href="/tech/lfi-api-hub/v2.1/banking/data-sharing/">Data Sharing</a>
        for SME Current Accounts and Savings Accounts, prioritising the same endpoints as retail in
        Phase 1 (<code>/accounts</code>, <code>/accounts/{AccountId}</code>, <code>/balances</code>,
        <code>/transactions</code>, <code>/customer</code>,
        <code>/accounts/{AccountId}/customer</code>).
      </EdProse>

      <h3>SME Single Instant Payment</h3>
      <EdProse>
        Deliver
        <a href="/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/single-instant-payment/requirements">Single Instant Payment</a>
        for SME customers.
      </EdProse>

      <h3>SME Refunds</h3>
      <EdProse>
        Deliver
        <a href="/tech/lfi-api-hub/v2.1/banking/service-initiation/refunds/requirements">Refunds</a>
        for SME payment consents.
      </EdProse>

      <h3>SME Confirmation of Payee</h3>
      <EdProse>
        Deliver
        <a href="/tech/lfi-api-hub/v2.1/banking/confirmation-of-payee/requirements">CoP</a>
        for SME customers.
      </EdProse>

      <h3>SME Consent Management Interface</h3>
      <EdProse>
        Provide a
        <a href="/tech/lfi-api-hub/v2.1/consent-management-interface/">Consent Management Interface</a>
        in your SME banking channels, using the same Consent Manager APIs as the retail CMI.
      </EdProse>

      <EdNote type="info" title="Separate API Hub for SME">
        <p>
          SME propositions will typically require a second API Hub instance alongside the retail one,
          because each Hub exposes only one authorization endpoint. The second Hub can be pointed at the
          same Ozone Connect deployment &mdash; routing internally on the <code>o3-provider-id</code>
          header &mdash; and the LFI-held certificates (C3, S4, Sig4, Enc1) are shared across both Hubs.
          See
          <a href="/knowledge-base/articles/multi-segment-api-hubs">Multi-Segment LFIs &mdash; How to Structure API Hubs Across Customer Segments</a>
          for the full deployment pattern and Trust Framework implications.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="phase-4"
      num="4"
      color="var(--at-navy)"
      eyebrow="Phase 4"
      title="SME Complex Payments"
      tone="surface"
    >
      <EdProse>Phase 4 completes the SME proposition with the more complex payment flows.</EdProse>

      <h3>SME Multi-Payments (all flavours)</h3>
      <EdProse>
        Deliver all domestic multi-payment types for SME &mdash; the same set as Phase 2, applied to SME
        accounts.
      </EdProse>

      <h3>SME Multi-Authorization</h3>
      <EdProse>
        Implement
        <a href="/tech/lfi-api-hub/v2.1/banking/service-initiation/multi-authorization">Multi-Authorization</a>
        for SME payment consents that require multiple authorisers (for example, a business account with
        two-signatory rules).
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="after-phase-4"
      num="5"
      color="var(--at-teal-deep)"
      eyebrow="After Phase 4"
      title="Ongoing version upgrades and regulatory change"
      tone="cream"
    >
      <EdProse>
        By the end of Phase 4 you will have delivered all of the current Open Finance capabilities across
        both retail and SME propositions. From here, ongoing work is driven by version upgrades, new API
        families, errata, and regulatory changes &mdash; continue to track the
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
