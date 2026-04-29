<route lang="yaml">
meta:
  title: Functional Evidence — Bank Data Sharing
</route>

<script setup lang="ts">
const authDetailsTemplate = `// Paste your authorization_details here — do not redact any fields
{
  "type": "urn:openfinanceuae:account-access-consent:v2.1",
  "consent": {
    "ConsentId": "",
    "ExpirationDateTime": "",
    "Permissions": [],
    "OpenFinanceBilling": {
      "UserType": "",
      "Purpose": ""
    }
  }
}`

const consentResponseTemplate = `// Paste GET /account-access-consents/{ConsentId} response here`
const accountsResponseTemplate = `// Paste response body (or excerpt showing at least one account)`
const balancesResponseTemplate = `// Paste response body`
const transactionsResponseTemplate = `// Paste response body (excerpt of at least one transaction is sufficient)`
const additionalEndpointTemplate = `// Endpoint: GET /accounts/{AccountId}/___________
// Paste response body`
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          Testing &amp; Certification &middot; Functional Evidence
        </div>
        <h1 class="ed-doc__title">
          Functional Evidence &mdash; Bank Data Sharing
          <span class="ed-doc__read">2 min read</span>
        </h1>
        <p class="ed-doc__lede">
          Complete this document and submit it as part of your integration review. All sections are
          required unless marked optional. Evidence must be from the
          <a href="/tech/tpp-standards/sandbox/model-bank">AlTareq Model Bank</a> sandbox environment.
        </p>
      </div>
    </section>

    <div class="ed-doc__intro">
      <div class="ed-doc__inner">
        <CertificationTicketBanner cert-type="TPP Functional Certification Evidence" />
      </div>
    </div>

    <EdSectionBand
      id="proposition"
      num="01"
      color="var(--at-teal)"
      eyebrow="1. Proposition Overview"
      title="Describe the product or service you are building and how Bank Data Sharing supports it"
      tone="cream"
    >
      <EdRefTable>
        <table>
          <tbody>
            <tr><th><strong>TPP / Application name</strong></th><td></td></tr>
            <tr><th><strong>Proposition description</strong></th><td><em>Describe what your product does and the user need it serves</em></td></tr>
            <tr><th><strong>How data sharing is used</strong></th><td><em>Explain which account data your proposition reads and why &mdash; e.g. &ldquo;We read balances and transactions to generate a spending report for the user&rdquo;</em></td></tr>
            <tr><th><strong>User type</strong></th><td><code>Retail</code> / <code>SME</code> / <code>Corporate</code></td></tr>
            <tr><th><strong>OpenFinanceBilling Purpose</strong></th><td><em>The <code>Purpose</code> value you set &mdash; e.g. <code>AccountAggregation</code>, <code>BudgetingAnalysis</code></em></td></tr>
          </tbody>
        </table>
      </EdRefTable>
    </EdSectionBand>

    <EdSectionBand
      id="consent-definition"
      num="02"
      color="var(--at-gold)"
      eyebrow="2. Consent Definition"
      title="Paste your authorization_details and justify every field"
      tone="surface"
    >
      <EdProse>
        Paste the exact <code>authorization_details</code> object you send inside your PAR request JWT.
        Then describe every field you have set.
      </EdProse>

      <h3>2a. Your authorization_details</h3>

      <EdCode :code="authDetailsTemplate" lang="json" filename="authorization_details" />

      <h3>2b. Field Justification</h3>

      <EdProse>
        For every field you set, explain why it is present. For every permission in
        <code>Permissions</code>, state which API endpoint requires it.
      </EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr><th>Field</th><th>Value set</th><th>Justification</th></tr>
          </thead>
          <tbody>
            <tr><td><code>ConsentId</code></td><td></td><td><em>e.g. UUID generated at consent creation time by our system</em></td></tr>
            <tr><td><code>ExpirationDateTime</code></td><td></td><td><em>e.g. 90 days from consent creation &mdash; matches our session model</em></td></tr>
            <tr><td><code>OpenFinanceBilling.UserType</code></td><td></td><td></td></tr>
            <tr><td><code>OpenFinanceBilling.Purpose</code></td><td></td><td></td></tr>
            <tr><td><code>FromDate</code> <em>(if set)</em></td><td></td><td></td></tr>
            <tr><td><code>ToDate</code> <em>(if set)</em></td><td></td><td></td></tr>
            <tr><td><code>AccountType</code> <em>(if set)</em></td><td></td><td></td></tr>
            <tr><td><code>AccountSubType</code> <em>(if set)</em></td><td></td><td></td></tr>
            <tr><td><code>BaseConsentId</code> <em>(if set)</em></td><td></td><td></td></tr>
            <tr><td><code>OnBehalfOf</code> <em>(if set)</em></td><td></td><td></td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>
        <strong>Permission justification</strong> &mdash; complete a row for each permission in your
        <code>Permissions</code> array:
      </EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Permission</th>
              <th>Endpoint(s) that require it</th>
              <th>Used by your proposition?</th>
              <th>Reason</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>ReadAccountsBasic</code></td>
              <td><span class="endpoint"><span class="http-method http-method--get">GET</span><code>/accounts</code></span></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td><code>ReadAccountsDetail</code></td>
              <td>
                <span class="endpoint"><span class="http-method http-method--get">GET</span><code>/accounts</code></span>,
                <span class="endpoint"><span class="http-method http-method--get">GET</span><code>/accounts/{AccountId}</code></span>
              </td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td><code>ReadBalances</code></td>
              <td><span class="endpoint"><span class="http-method http-method--get">GET</span><code>/accounts/{AccountId}/balances</code></span></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td><code>ReadTransactionsBasic</code></td>
              <td><span class="endpoint"><span class="http-method http-method--get">GET</span><code>/accounts/{AccountId}/transactions</code></span></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td><code>ReadTransactionsDetail</code></td>
              <td><span class="endpoint"><span class="http-method http-method--get">GET</span><code>/accounts/{AccountId}/transactions</code></span></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td><code>ReadBeneficiariesBasic</code></td>
              <td><span class="endpoint"><span class="http-method http-method--get">GET</span><code>/accounts/{AccountId}/beneficiaries</code></span></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td><code>ReadBeneficiariesDetail</code></td>
              <td><span class="endpoint"><span class="http-method http-method--get">GET</span><code>/accounts/{AccountId}/beneficiaries</code></span></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td><code>ReadDirectDebits</code></td>
              <td><span class="endpoint"><span class="http-method http-method--get">GET</span><code>/accounts/{AccountId}/direct-debits</code></span></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td><code>ReadStandingOrdersBasic</code></td>
              <td><span class="endpoint"><span class="http-method http-method--get">GET</span><code>/accounts/{AccountId}/standing-orders</code></span></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td><code>ReadStandingOrdersDetail</code></td>
              <td><span class="endpoint"><span class="http-method http-method--get">GET</span><code>/accounts/{AccountId}/standing-orders</code></span></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td><code>ReadScheduledPaymentsBasic</code></td>
              <td><span class="endpoint"><span class="http-method http-method--get">GET</span><code>/accounts/{AccountId}/scheduled-payments</code></span></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td><code>ReadScheduledPaymentsDetail</code></td>
              <td><span class="endpoint"><span class="http-method http-method--get">GET</span><code>/accounts/{AccountId}/scheduled-payments</code></span></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td><code>ReadStatements</code></td>
              <td><span class="endpoint"><span class="http-method http-method--get">GET</span><code>/accounts/{AccountId}/statements</code></span></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td><code>ReadPartyUser</code></td>
              <td>
                <span class="endpoint"><span class="http-method http-method--get">GET</span><code>/parties</code></span>,
                <span class="endpoint"><span class="http-method http-method--get">GET</span><code>/accounts/{AccountId}/parties</code></span>
              </td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td><code>ReadPartyUserIdentity</code></td>
              <td>
                <span class="endpoint"><span class="http-method http-method--get">GET</span><code>/parties</code></span>,
                <span class="endpoint"><span class="http-method http-method--get">GET</span><code>/accounts/{AccountId}/parties</code></span>
              </td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td><code>ReadParty</code></td>
              <td><span class="endpoint"><span class="http-method http-method--get">GET</span><code>/accounts/{AccountId}/parties</code></span></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td><code>ReadProduct</code></td>
              <td><em>(product sub-resource)</em></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td><code>ReadProductFinanceRates</code></td>
              <td><em>(product sub-resource)</em></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdNote type="note">
        <p>
          Remove any rows for permissions you do not request. Any permission present in
          <code>Permissions</code> must have a row here with a justification.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="model-bank-evidence"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="3. Model Bank Evidence"
      title="Successful 200 OK responses from the AlTareq Model Bank"
      tone="cream"
    >
      <EdProse>
        For each endpoint your proposition calls, provide evidence of a successful <code>200 OK</code>
        response from the AlTareq Model Bank. Include the full response body or a clearly readable
        excerpt. Use the Model Bank accounts for <code>mits</code> or <code>rora</code> &mdash; see
        <a href="/tech/tpp-standards/sandbox/model-bank#model-bank-credentials">Model Bank credentials</a>.
      </EdProse>

      <h3>3a. Consent Authorized</h3>

      <EdProse>
        Provide the response from
        <span class="endpoint"><span class="http-method http-method--get">GET</span><code>/account-access-consents/{ConsentId}</code></span>
        showing <code>Status: Authorized</code>.
      </EdProse>

      <EdCode :code="consentResponseTemplate" lang="json" filename="GET /account-access-consents/{ConsentId}" />

      <EdRefTable>
        <table>
          <thead>
            <tr><th>Field</th><th>Observed value</th></tr>
          </thead>
          <tbody>
            <tr><td><code>ConsentId</code></td><td></td></tr>
            <tr><td><code>Status</code></td><td><code>Authorized</code></td></tr>
            <tr><td><code>ExpirationDateTime</code></td><td></td></tr>
            <tr><td><code>Permissions</code> (list)</td><td></td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3>3b. GET /accounts</h3>

      <EdCode :code="accountsResponseTemplate" lang="json" filename="GET /accounts" />

      <EdRefTable>
        <table>
          <tbody>
            <tr><th><strong>HTTP status</strong></th><td><code>200</code></td></tr>
            <tr><th><strong>AccountId used in subsequent calls</strong></th><td></td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3>3c. GET /accounts/{AccountId}/balances</h3>

      <EdCode :code="balancesResponseTemplate" lang="json" filename="GET /accounts/{AccountId}/balances" />

      <EdRefTable>
        <table>
          <tbody>
            <tr><th><strong>HTTP status</strong></th><td><code>200</code></td></tr>
            <tr><th><strong>AccountId</strong></th><td></td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3>3d. GET /accounts/{AccountId}/transactions</h3>

      <EdCode :code="transactionsResponseTemplate" lang="json" filename="GET /accounts/{AccountId}/transactions" />

      <EdRefTable>
        <table>
          <tbody>
            <tr><th><strong>HTTP status</strong></th><td><code>200</code></td></tr>
            <tr><th><strong>AccountId</strong></th><td></td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3>3e. Additional endpoints <em>(repeat for each endpoint your proposition calls)</em></h3>

      <EdProse>
        For each additional endpoint (<code>/beneficiaries</code>, <code>/direct-debits</code>,
        <code>/standing-orders</code>, <code>/scheduled-payments</code>, <code>/statements</code>,
        <code>/parties</code>), add a section below in the same format as 3b&ndash;3d.
      </EdProse>

      <EdCode :code="additionalEndpointTemplate" lang="json" filename="Additional endpoint evidence" />

      <EdRefTable>
        <table>
          <tbody>
            <tr><th><strong>Endpoint</strong></th><td></td></tr>
            <tr><th><strong>HTTP status</strong></th><td><code>200</code></td></tr>
            <tr><th><strong>AccountId</strong></th><td></td></tr>
          </tbody>
        </table>
      </EdRefTable>
    </EdSectionBand>

    <EdSectionBand
      id="state-handling"
      num="04"
      color="var(--at-navy)"
      eyebrow="4. Consent State Handling"
      title="How your application tracks and responds to consent state changes"
      tone="surface"
    >
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Scenario</th><th>How your application handles it</th></tr>
          </thead>
          <tbody>
            <tr><td>Consent moves to <code>Revoked</code></td><td></td></tr>
            <tr><td>Consent moves to <code>Expired</code></td><td></td></tr>
            <tr><td>Access token expires mid-session</td><td></td></tr>
            <tr><td>Refresh token is rejected (<code>invalid_grant</code>)</td><td></td></tr>
          </tbody>
        </table>
      </EdRefTable>
    </EdSectionBand>

    <EdSectionBand
      id="minimum-permissions"
      num="05"
      color="var(--at-teal-deep)"
      eyebrow="5. Minimum Permissions Declaration"
      title="Confirm you have requested only what you need"
      tone="cream"
    >
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Declaration</th><th>Yes / No</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>Every permission in my <code>Permissions</code> array has a corresponding row in the table in section 2b</td>
              <td></td>
            </tr>
            <tr>
              <td>I have not requested any permission for data that is not displayed or used within my proposition</td>
              <td></td>
            </tr>
            <tr>
              <td>I am not requesting permissions speculatively for future features not yet built</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse><strong>Signed off by:</strong> <em>(name and role)</em></EdProse>
      <EdProse><strong>Date:</strong></EdProse>

      <EdNote type="note">
        <p>
          Submit this document to the Open Finance team alongside your integration request. Incomplete
          submissions will be returned.
        </p>
      </EdNote>
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
.ed-doc__lede :deep(a) {
  color: var(--at-teal-deep);
  text-decoration: none;
  border-bottom: 1px solid currentColor;
}

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
}
</style>
