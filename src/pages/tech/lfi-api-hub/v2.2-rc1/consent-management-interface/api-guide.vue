<route lang="yaml">
meta:
  title: Consent Management Interface — API Guide
  isIndex: true
</route>

<script setup lang="ts">
const revokeBody = `{
  "revokedBy": "LFI.InitiatedByUser"
}`

interface QueryParam {
  name: string
  required: boolean
  description: string
}

const queryParams: QueryParam[] = [
  { name: 'consentType', required: false, description: 'Filter by consent type' },
  { name: 'status', required: false, description: 'Filter by consent status' },
  { name: 'page', required: false, description: 'Page number for paginated results' },
  { name: 'pageSize', required: false, description: 'Number of records per page' },
]

interface AltOp {
  method: 'GET' | 'POST' | 'PATCH'
  path: string
  href: string
  useWhen: string
}

const altOps: AltOp[] = [
  {
    method: 'GET',
    path: '/consents/{consentId}',
    href: '/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/consents-consentId',
    useWhen: 'You need a single consent by its ID',
  },
  {
    method: 'GET',
    path: '/accounts/{accountId}/consents',
    href: '/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/accounts-accountId-consents',
    useWhen: 'You need all consents linked to a specific account',
  },
  {
    method: 'GET',
    path: '/consents',
    href: '/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/consents',
    useWhen: 'You need to search consents by criteria other than user',
  },
]

interface MapRow {
  num: number
  field: string
  operation: string
  jsonPath: string
  guidelines: string
}

const dataSharingRows: MapRow[] = [
  {
    num: 1,
    field: 'TPP name',
    operation: 'GET /psu/{userId}/consents',
    jsonPath: '$..TradingName <span class="ed-or">or</span> $.data[*].tpp.tppName',
    guidelines:
      'If a trading name is supplied in the consent, display it. Otherwise fall back to the TPP name from the Trust Framework.',
  },
  {
    num: 2,
    field: 'Last data shared',
    operation: 'GET /psu/{userId}/consents',
    jsonPath: '$.data[*].consentUsage.lastDataShared',
    guidelines: '',
  },
  {
    num: 3,
    field: 'Connection expires',
    operation: 'GET /psu/{userId}/consents',
    jsonPath: '$.data[*].request.consent.ExpirationDateTime',
    guidelines: '',
  },
  {
    num: 4,
    field: 'Status',
    operation: 'GET /psu/{userId}/consents',
    jsonPath: '$.data[*].status',
    guidelines:
      'Map to user-friendly label per <a href="/tech/lfi-api-hub/v2.2-rc1/consent-management-interface/bank-service-initiation/requirements#status-labels">Status labels</a>.',
  },
  {
    num: 5,
    field: 'Consent ID',
    operation: 'GET /psu/{userId}/consents',
    jsonPath: '$.data[*].id',
    guidelines: 'Display truncated with copy button.',
  },
  {
    num: 6,
    field: 'IBAN',
    operation: 'GET /psu/{userId}/consents',
    jsonPath: '$.data[*].accountIds',
    guidelines:
      'The surrogate account identifiers patched onto the consent are returned. The LFI must replace these with the real IBAN &mdash; PII is not stored in the API Hub.',
  },
  {
    num: 7,
    field: 'Data permissions',
    operation: 'GET /psu/{userId}/consents',
    jsonPath: '$.data[*].request.consent.Permissions',
    guidelines:
      'Permissions must be displayed using the standardised data cluster language provided in the Customer Data standards. Map each permission code to its correct language label.',
  },
  {
    num: 8,
    field: 'First Connected',
    operation: 'GET /psu/{userId}/consents <span class="ed-or">or</span> GET /consent-groups/{consentGroupId}/consents',
    jsonPath: '$.data[*].consentBody.Data.CreationDateTime',
    guidelines:
      'If the consent has a <code>BaseConsentId</code>, this must be the <code>CreationDateTime</code> of the <strong>first</strong> consent in the consent group. The <code>BaseConsentId</code> value is used as the <code>consentGroupId</code> parameter. If <code>BaseConsentId</code> is not set, use the consent\'s own <code>CreationDateTime</code>.',
  },
  {
    num: 9,
    field: 'Last Updated',
    operation: 'GET /psu/{userId}/consents <span class="ed-or">or</span> GET /consent-groups/{consentGroupId}/consents',
    jsonPath: '$.data[*].consentBody.Data.CreationDateTime <span class="ed-or">or</span> $.data[*].updatedAt',
    guidelines:
      'If the consent has a <code>BaseConsentId</code>, this must be the <code>CreationDateTime</code> of the <strong>latest</strong> consent in the consent group. If <code>BaseConsentId</code> is not set, use the consent\'s <code>updatedAt</code> value.',
  },
]

const sipRows: MapRow[] = [
  {
    num: 1,
    field: 'TPP name',
    operation: 'GET /psu/{userId}/consents',
    jsonPath: '$..TradingName <span class="ed-or">or</span> $.data[*].tpp.tppName',
    guidelines: 'Same trading name / TPP name fallback as Data Sharing.',
  },
  {
    num: 2,
    field: 'Total paid',
    operation: 'GET /psu/{userId}/consents <span class="ed-or">or</span> GET /payment-log',
    jsonPath:
      '$.data[*].consentBody.Data.PaymentConsumption.CumulativeValueOfPayments <span class="ed-or">or</span> $.data[*].requestBody.Data.Instruction.Amount.Amount',
    guidelines: 'For single instant payments the amount matches the payment value.',
  },
  {
    num: 3,
    field: 'Permission Cancelled / Expired / Consumed',
    operation: 'GET /psu/{userId}/consents',
    jsonPath: '$.data[*].updatedAt',
    guidelines:
      'Terminal states &mdash; the last update date reflects when the consent entered that state.',
  },
  {
    num: 4,
    field: 'Last payment made',
    operation: 'GET /psu/{userId}/consents',
    jsonPath: '$.data[*].consentUsage.lastServiceInitiationAttempt',
    guidelines: '',
  },
  {
    num: 5,
    field: 'Payment to',
    operation: 'GET /psu/{userId}/consents <span class="ed-or">or</span> GET /payment-log',
    jsonPath:
      '$.data[*].request.consent.PersonalIdentifiableInformation <span class="ed-or">or</span> $.data[*].requestBody.Data.PersonalIdentifiableInformation',
    guidelines:
      'Use the value of <code>Creditor.Name</code> from either the consent or the payment initiation request, depending on the payment type.',
  },
  {
    num: 6,
    field: 'IBAN',
    operation: 'GET /psu/{userId}/consents <span class="ed-or">or</span> GET /payment-log',
    jsonPath: 'Same as above',
    guidelines:
      'Use the value of <code>CreditorAccount.Identification</code> from either the consent or the payment initiation request.',
  },
  {
    num: 7,
    field: 'Reference',
    operation: 'GET /payment-log',
    jsonPath: '$.data[*].requestBody.Data.CreditorReference',
    guidelines: '',
  },
  {
    num: 8,
    field: 'Payment Purpose',
    operation: 'GET /payment-log',
    jsonPath: '$.data[*].requestBody.Data.PaymentPurposeCode',
    guidelines:
      'The payment request provides the Aani purpose code, which must be transposed to the correct purpose code description based on Aani reference information.',
  },
  {
    num: 9,
    field: 'From account',
    operation: 'GET /psu/{userId}/consents',
    jsonPath: '$.data[*].accountIds <span class="ed-or">or</span> $.data[*].request.consent.PersonalIdentifiableInformation',
    guidelines:
      'The surrogate account identifiers patched onto the consent must be replaced with the real IBAN. Alternatively, if the TPP provided the debtor IBAN on the consent, use <code>DebtorAccount.Identification</code>.',
  },
  {
    num: 10,
    field: 'Payment Rules',
    operation: 'GET /psu/{userId}/consents',
    jsonPath: '$.data[*].request.consent.ControlParameters',
    guidelines:
      'The displayed properties depend on the values found in control parameters, which differ by payment type. Refer to the <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/psu-userId-consents">API spec</a> for available properties.',
  },
  {
    num: 11,
    field: 'You started this permission',
    operation: 'GET /psu/{userId}/consents <span class="ed-or">or</span> GET /consent-groups/{consentGroupId}/consents',
    jsonPath: '$.data[*].consentBody.Data.CreationDateTime',
    guidelines:
      'Same consent-group logic as Data Sharing "First Connected" &mdash; use the first consent\'s <code>CreationDateTime</code> when <code>BaseConsentId</code> is set.',
  },
  {
    num: 12,
    field: 'You cancelled this permission',
    operation: 'GET /psu/{userId}/consents',
    jsonPath: '$.data[*].updatedAt',
    guidelines: '',
  },
]

const multiPaymentRows: MapRow[] = [
  {
    num: 2,
    field: 'Total paid to date',
    operation: 'GET /psu/{userId}/consents <span class="ed-or">or</span> GET /payment-log',
    jsonPath: '$.data[*].consentBody.Data.PaymentConsumption.CumulativeValueOfPayments',
    guidelines:
      'For long-lived consents the <code>CumulativeValueOfPayments</code> property is maintained to provide the cumulative value of all payments.',
  },
]

interface HistoryRow {
  num: number
  field: string
  jsonPath: string
  guidelines: string
}

const historyDataSharingRows: HistoryRow[] = [
  {
    num: 1,
    field: 'TPP name',
    jsonPath: '$..TradingName <span class="ed-or">or</span> $.data[*].tpp.tppName',
    guidelines: 'Same trading name / TPP name fallback.',
  },
  { num: 2, field: 'Consent ID', jsonPath: '$.data[*].id', guidelines: '' },
  {
    num: 3,
    field: 'IBAN (Data Sharing)',
    jsonPath: '$.data[*].accountIds',
    guidelines: 'Replace surrogate IDs with real IBANs.',
  },
  {
    num: 4,
    field: 'Policy number (Insurance)',
    jsonPath: '$.data[*].supplementaryInformation.{{policyNumber}}',
    guidelines: 'Same <code>supplementaryInformation</code> or <code>insurancePolicyIds</code> approach.',
  },
  {
    num: 5,
    field: 'Policy expires (Insurance)',
    jsonPath: '$.data[*].supplementaryInformation.{{policyExpires}}',
    guidelines: 'Same approach.',
  },
  {
    num: 6,
    field: 'Data permissions',
    jsonPath: '$.data[*].request.consent.Permissions',
    guidelines: 'Map permission codes to standardised language.',
  },
  {
    num: 7,
    field: 'Connection date (shown as label)',
    jsonPath: '$.data[*].consentBody.Data.CreationDateTime',
    guidelines: '',
  },
]

const historyServiceInitRows: HistoryRow[] = [
  {
    num: 1,
    field: 'Payment to',
    jsonPath:
      '$.data[*].request.consent.PersonalIdentifiableInformation <span class="ed-or">or</span> payment-log $.data[*].requestBody.Data.PersonalIdentifiableInformation',
    guidelines:
      'Use <code>Creditor.Name</code> from the consent group member or the payment initiation request.',
  },
  {
    num: 2,
    field: 'IBAN',
    jsonPath: 'Same as above',
    guidelines: 'Use <code>CreditorAccount.Identification</code>.',
  },
  {
    num: 3,
    field: 'Reference',
    jsonPath: '$.data[*].request.consent.DebtorReference',
    guidelines: '',
  },
  {
    num: 4,
    field: 'Payment Purpose',
    jsonPath: '$.data[*].request.consent.PaymentPurposeCode',
    guidelines: 'Transpose to purpose code description.',
  },
  {
    num: 5,
    field: 'From account',
    jsonPath: '$.data[*].accountIds <span class="ed-or">or</span> $.data[*].request.consent.PersonalIdentifiableInformation',
    guidelines:
      'Replace surrogate IDs with real IBANs, or use <code>DebtorAccount.Identification</code> if provided by the TPP.',
  },
  {
    num: 6,
    field: 'Payment Rules',
    jsonPath: '$.data[*].request.consent.ControlParameters',
    guidelines: 'Properties vary by payment type.',
  },
  {
    num: 7,
    field: 'Connection date (shown as label)',
    jsonPath: '$.data[*].consentBody.Data.CreationDateTime',
    guidelines: '',
  },
]

const paymentHistoryRows: HistoryRow[] = [
  {
    num: 1,
    field: 'TPP name',
    jsonPath: '$..TradingName <span class="ed-or">or</span> $.data[*].tpp.tppName',
    guidelines: 'Same trading name / TPP name fallback.',
  },
  {
    num: 2,
    field: 'Total paid to date',
    jsonPath: '$.data[*].requestBody.Data.Instruction.Amount.Amount',
    guidelines: 'Sum the amounts of all successful payments returned by this operation.',
  },
  {
    num: 3,
    field: 'Payment date/time',
    jsonPath: '$.data[*].paymentResponse.creationDateTime',
    guidelines: 'Display as date and time, e.g. <code>15/02/2025 14:22</code>.',
  },
  {
    num: 4,
    field: 'Status',
    jsonPath: '$.data[*].paymentResponse.status',
    guidelines:
      'Map API status to display label: <code>AcceptedSettlementCompleted</code>, <code>AcceptedCreditSettlementCompleted</code>, <code>AcceptedWithoutPosting</code> &rarr; <strong>Successful</strong>; <code>Rejected</code> &rarr; <strong>Failed</strong>; <code>Pending</code> &rarr; <strong>Pending</strong>.',
  },
  {
    num: 5,
    field: 'Amount',
    jsonPath: '$.data[*].requestBody.Data.Instruction.Amount.Amount',
    guidelines: 'Display with currency symbol.',
  },
  {
    num: 6,
    field: 'Purpose',
    jsonPath: '$.data[*].requestBody.Data.PaymentPurposeCode',
    guidelines:
      'The payment request provides the Aani purpose code. Transpose to the purpose code description, e.g. <code>ACM</code> &rarr; <code>Agency Commission (ACM)</code>.',
  },
  {
    num: 7,
    field: 'Reference',
    jsonPath: '$.data[*].requestBody.Data.CreditorReference',
    guidelines: '',
  },
]

interface StatusRow { api: string; cmi: string }
const statusRows: StatusRow[] = [
  { api: 'Authorized', cmi: 'Active' },
  { api: 'AwaitingAuthorization', cmi: 'Pending' },
  { api: 'Revoked', cmi: 'Cancelled' },
  { api: 'Suspended', cmi: 'Suspended' },
  { api: 'Consumed', cmi: 'Consumed (or Successful/Failed for payments)' },
  { api: 'Expired', cmi: 'Expired' },
  { api: 'Rejected', cmi: 'Rejected' },
]
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          LFI · Consent Management Interface · API Guide
        </div>
        <h1 class="ed-doc__title">
          Consent Management Interface &mdash; API Guide
          <span class="ed-doc__read">6 min read</span>
        </h1>
        <p class="ed-doc__lede">
          This guide explains how to use the API Hub's Consent Manager API to retrieve and manage
          the data needed to populate each page of the LFI Consent Management Interface (CMI). See
          the per-product Requirements pages
          (<a href="/tech/lfi-api-hub/v2.2-rc1/consent-management-interface/bank-data-sharing/requirements">Bank Data Sharing</a>,
          <a href="/tech/lfi-api-hub/v2.2-rc1/consent-management-interface/bank-service-initiation/requirements">Bank Service Initiation</a>,
          <a href="/tech/lfi-api-hub/v2.2-rc1/consent-management-interface/insurance-data-sharing/requirements">Insurance Data Sharing</a>)
          for what each page must display, and the matching User Experience pages for interactive
          wireframes.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="prerequisites"
      num="01"
      color="var(--at-teal)"
      eyebrow="Before you begin"
      title="Prerequisites"
      tone="cream"
    >
      <EdProse>Before making Consent Manager API calls the LFI must:</EdProse>
      <ol class="ed-doc__steps">
        <li>
          Have a working mTLS connection to the API Hub &mdash; verify with
          <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/hello-mtls" class="endpoint"><span class="http-method http-method--get">GET</span><code>/hello-mtls</code></a>
        </li>
        <li>
          Patch the end user identifier onto each consent using
          <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/patch-consents-consentId" class="endpoint"><span class="http-method http-method--patch">PATCH</span><code>/consents/{consentId}</code></a>
          so that consents can be retrieved by user
        </li>
      </ol>
    </EdSectionBand>

    <EdSectionBand
      id="retrieving-user-consents"
      num="02"
      color="var(--at-gold)"
      eyebrow="Primary lookup"
      title="Retrieving user consents"
      tone="surface"
    >
      <EdProse>To retrieve all consents associated with a customer use:</EdProse>

      <div class="ed-doc__endpoint">
        <span class="http-badge http-get">GET</span>
        <a
          href="/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/psu-userId-consents"
          class="ed-doc__endpoint-path"
        ><code>/psu/{userId}/consents</code></a>
      </div>
      <EdProse>
        where <code>userId</code> is the LFI's unique identifier for the customer.
      </EdProse>
      <EdProse>
        The response returns a paginated array of consent objects. Each consent object contains the
        fields needed to populate the dashboard cards and detail pages described in the
        per-product Requirements pages
        (<a href="/tech/lfi-api-hub/v2.2-rc1/consent-management-interface/bank-data-sharing/requirements">Bank Data Sharing</a>,
        <a href="/tech/lfi-api-hub/v2.2-rc1/consent-management-interface/bank-service-initiation/requirements">Bank Service Initiation</a>,
        <a href="/tech/lfi-api-hub/v2.2-rc1/consent-management-interface/insurance-data-sharing/requirements">Insurance Data Sharing</a>).
      </EdProse>

      <h3 class="ed-doc__sub">Query parameters</h3>
      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Parameter</th>
              <th>Required</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="q in queryParams" :key="q.name">
              <td><code>{{ q.name }}</code></td>
              <td>{{ q.required ? 'Yes' : 'No' }}</td>
              <td>{{ q.description }}</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3 class="ed-doc__sub">Alternative retrieval operations</h3>
      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Operation</th>
              <th>Use when</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="op in altOps" :key="op.path">
              <td>
                <span class="http-badge" :class="`http-${op.method.toLowerCase()}`">{{ op.method }}</span>
                <a :href="op.href"><code>{{ op.path }}</code></a>
              </td>
              <td>{{ op.useWhen }}</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>
    </EdSectionBand>

    <EdSectionBand
      id="dashboard-mapping"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Field-by-field"
      title="Dashboard — mapping API fields to CMI"
      tone="cream"
    >
      <EdProse>
        The sections below map each CMI field from the per-product Requirements
        (<a href="/tech/lfi-api-hub/v2.2-rc1/consent-management-interface/bank-data-sharing/requirements#dashboard-card-content">Bank Data Sharing</a>,
        <a href="/tech/lfi-api-hub/v2.2-rc1/consent-management-interface/bank-service-initiation/requirements#dashboard-card-content">Bank Service Initiation</a>,
        <a href="/tech/lfi-api-hub/v2.2-rc1/consent-management-interface/insurance-data-sharing/requirements#dashboard-card-content">Insurance Data Sharing</a>)
        to the API response property and any transformation the LFI must apply.
      </EdProse>

      <h3 class="ed-doc__sub">Data Sharing</h3>
      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>CMI field</th>
              <th>Operation</th>
              <th>JSONPath</th>
              <th>Guidelines</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="r in dataSharingRows" :key="r.num">
              <td>{{ r.num }}</td>
              <td><strong>{{ r.field }}</strong></td>
              <td v-html="`<code>${r.operation}</code>`" />
              <td v-html="`<code>${r.jsonPath}</code>`" />
              <td v-html="r.guidelines" />
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3 class="ed-doc__sub">Single Instant Payment</h3>
      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>CMI field</th>
              <th>Operation</th>
              <th>JSONPath</th>
              <th>Guidelines</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="r in sipRows" :key="r.num">
              <td>{{ r.num }}</td>
              <td><strong>{{ r.field }}</strong></td>
              <td v-html="`<code>${r.operation}</code>`" />
              <td v-html="`<code>${r.jsonPath}</code>`" />
              <td v-html="r.guidelines" />
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3 class="ed-doc__sub">Multi Payment (all subtypes)</h3>
      <EdProse>
        Multi Payment consents follow the same field mappings as Single Instant Payment, with these
        additions:
      </EdProse>
      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>CMI field</th>
              <th>Operation</th>
              <th>JSONPath</th>
              <th>Guidelines</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="r in multiPaymentRows" :key="r.num">
              <td>{{ r.num }}</td>
              <td><strong>{{ r.field }}</strong></td>
              <td v-html="`<code>${r.operation}</code>`" />
              <td v-html="`<code>${r.jsonPath}</code>`" />
              <td v-html="r.guidelines" />
            </tr>
          </tbody>
        </table>
      </EdRefTable>
    </EdSectionBand>

    <EdSectionBand
      id="connection-history"
      num="04"
      color="var(--at-teal)"
      eyebrow="List of updates"
      title="Connection history"
      tone="surface"
    >
      <EdProse>
        To provide the
        <strong>List of Updates</strong>
        view described in the
        <a href="/tech/lfi-api-hub/v2.2-rc1/consent-management-interface/bank-data-sharing/requirements#detail-page">Bank Data Sharing Requirements</a>,
        use:
      </EdProse>

      <div class="ed-doc__endpoint">
        <span class="http-badge http-get">GET</span>
        <a
          href="/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/consent-groups-consentGroupId-consents"
          class="ed-doc__endpoint-path"
        ><code>/consent-groups/{consentGroupId}/consents</code></a>
      </div>
      <EdProse>
        where <code>consentGroupId</code> is the value of <code>BaseConsentId</code> on the current
        consent.
      </EdProse>
      <EdProse>
        This returns all consents in a consent group &mdash; consents that are linked by the same
        <code>BaseConsentId</code>.
      </EdProse>

      <h3 class="ed-doc__sub">How <code>BaseConsentId</code> works</h3>
      <EdProse>
        Connection history is driven by &ldquo;revisions&rdquo; to consents orchestrated by TPPs:
        an existing consent is replaced by a new consent with updated permissions or data-access
        terms. The TPP links the new consent to the original by setting <code>BaseConsentId</code>
        on the new consent to the <code>ConsentId</code> of the original consent. All subsequent
        consents sharing the same history use the same <code>BaseConsentId</code> value.
      </EdProse>

      <EdNote type="danger" title="End user isolation risk">
        <p>
          When a consent is created it contains no customer information &mdash; the end user identity is
          only added later when the LFI patches in the end user ID. This means two consents sharing the
          same <code>BaseConsentId</code> are <strong>not</strong> guaranteed to belong to the same
          customer. LFIs must ensure that only consents belonging to the same end user are returned when
          resolving related consents.
        </p>
      </EdNote>

      <EdNote type="info">
        <p>
          The
          <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/consents-consentId-audit" class="endpoint"><span class="http-method http-method--get">GET</span><code>/consents/{consentId}/audit</code></a>
          operation is <strong>not</strong> the correct way to retrieve connection history. It
          relates to changes within a single consent, not changes across multiple consents linked
          by <code>BaseConsentId</code>.
        </p>
      </EdNote>

      <h3 class="ed-doc__sub">Connection history &mdash; Data Sharing &amp; Insurance</h3>
      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>CMI field</th>
              <th>JSONPath</th>
              <th>Guidelines</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="r in historyDataSharingRows" :key="r.num">
              <td>{{ r.num }}</td>
              <td><strong>{{ r.field }}</strong></td>
              <td v-html="`<code>${r.jsonPath}</code>`" />
              <td v-html="r.guidelines" />
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3 class="ed-doc__sub">Connection history &mdash; Service Initiation</h3>
      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>CMI field</th>
              <th>JSONPath</th>
              <th>Guidelines</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="r in historyServiceInitRows" :key="r.num">
              <td>{{ r.num }}</td>
              <td><strong>{{ r.field }}</strong></td>
              <td v-html="`<code>${r.jsonPath}</code>`" />
              <td v-html="r.guidelines" />
            </tr>
          </tbody>
        </table>
      </EdRefTable>
    </EdSectionBand>

    <EdSectionBand
      id="payment-history"
      num="05"
      color="var(--at-gold)"
      eyebrow="Payment log"
      title="Payment history"
      tone="cream"
    >
      <EdProse>
        To provide the <strong>Payment History</strong> tab described in the
        <a href="/tech/lfi-api-hub/v2.2-rc1/consent-management-interface/bank-service-initiation/requirements#detail-page">Bank Service Initiation Requirements</a>,
        use:
      </EdProse>

      <div class="ed-doc__endpoint">
        <span class="http-badge http-get">GET</span>
        <a
          href="/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/payment-log"
          class="ed-doc__endpoint-path"
        ><code>/payment-log?consentId={consentId}</code></a>
      </div>
      <EdProse>
        This returns a summary of the payments made under a given consent. Each payment log entry
        contains the fields needed to populate a single row in the Payment History tab.
      </EdProse>

      <EdNote type="important">
        <p>
          From <strong>v2.2</strong> this response is <strong>paginated</strong>, using the same
          <code>page</code> and <code>pageSize</code> parameters as the consent queries above. In
          v2.1 it returned every payment under the consent in one response.
        </p>
        <p>
          Read <code>meta.totalPages</code> to know when to stop; do not treat a short page as the
          last one. A Payment History tab that renders only the first response will silently show
          one page of payments on any consent that has more.
        </p>
      </EdNote>

      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>CMI field</th>
              <th>JSONPath</th>
              <th>Guidelines</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="r in paymentHistoryRows" :key="r.num">
              <td>{{ r.num }}</td>
              <td><strong>{{ r.field }}</strong></td>
              <td v-html="`<code>${r.jsonPath}</code>`" />
              <td v-html="r.guidelines" />
            </tr>
          </tbody>
        </table>
      </EdRefTable>
    </EdSectionBand>

    <EdSectionBand
      id="revoking"
      num="06"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Action revoke"
      title="Revoking a consent"
      tone="surface"
    >
      <EdProse>
        When the customer confirms a revocation action on the CMI, the LFI must immediately revoke
        the consent via:
      </EdProse>

      <div class="ed-doc__endpoint">
        <span class="http-badge http-post">POST</span>
        <a
          href="/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/consents-consentId-action-revoke"
          class="ed-doc__endpoint-path"
        ><code>/consents/{consentId}/action/revoke</code></a>
      </div>
      <EdProse>
        This also revokes any associated tokens. The request body must include
        <code>revokedBy</code> set to <code>LFI.InitiatedByUser</code>.
      </EdProse>

      <EdCode :code="revokeBody" lang="json" />

      <EdProse>To revoke all consents in a consent group at once, use:</EdProse>
      <div class="ed-doc__endpoint">
        <span class="http-badge http-post">POST</span>
        <a
          href="/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/consent-groups-consentGroupId-consents-action-revoke"
          class="ed-doc__endpoint-path"
        ><code>/consent-groups/{consentGroupId}/consents/action/revoke</code></a>
      </div>
    </EdSectionBand>

    <EdSectionBand
      id="audit"
      num="07"
      color="var(--at-teal)"
      eyebrow="Change history"
      title="Audit trail"
      tone="cream"
    >
      <EdProse>To inspect the change history of a single consent use:</EdProse>

      <div class="ed-doc__endpoint">
        <span class="http-badge http-get">GET</span>
        <a
          href="/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/consents-consentId-audit"
          class="ed-doc__endpoint-path"
        ><code>/consents/{consentId}/audit</code></a>
      </div>
      <EdProse>
        This returns a chronological list of all operations performed on the consent, including the
        caller details and patch content. This is useful for debugging and compliance but is
        <strong>not</strong> the same as
        <a href="#connection-history">connection history</a>.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="status-mapping"
      num="08"
      color="var(--at-gold)"
      eyebrow="Translate API to UI"
      title="Status code mapping"
      tone="surface"
    >
      <EdProse>
        The Consent Manager API returns status codes that must be mapped to user-friendly labels.
        See
        <a href="/tech/lfi-api-hub/v2.2-rc1/consent-management-interface/bank-service-initiation/requirements#status-labels">Status labels (Bank Service Initiation)</a>
        for the full mapping table.
      </EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>API status</th>
              <th>CMI label</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="s in statusRows" :key="s.api">
              <td><code>{{ s.api }}</code></td>
              <td>{{ s.cmi }}</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>
        If a status code does not appear in this list, it should be normalised by splitting on word
        boundaries and maintaining case. If the status requires truncation for display, return the
        whole of the leftmost word.
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
  font-size: 1.05rem;
  line-height: 1.65;
  margin: 1.75rem 0 0;
  max-width: 60rem;
  color: var(--at-mute-2);
}
.ed-doc__lede :deep(strong) { color: var(--at-navy-deep); font-weight: 600; }
.ed-doc__lede :deep(a) {
  color: var(--at-navy-deep);
  text-decoration: underline;
  text-underline-offset: 3px;
}

/* Endpoint header */
.ed-doc__endpoint {
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  margin: 0.5rem 0 1.1rem;
}
.ed-doc__endpoint-path {
  font-family: var(--at-mono);
  font-size: 0.95rem;
  background: var(--at-surface);
  padding: 0.35rem 0.6rem;
  border: 1px solid var(--at-grid-line);
  color: var(--at-navy-deep);
  text-decoration: none;
}
.ed-doc__endpoint-path:hover { border-color: var(--at-teal-deep); }
.ed-doc__endpoint-path code { font-family: inherit; background: none; border: 0; padding: 0; }

/* Sub-headings inside section bands */
.ed-doc__sub {
  font-family: var(--at-serif);
  font-size: 1.2rem;
  font-weight: 600;
  letter-spacing: -0.015em;
  color: var(--at-navy-deep);
  margin: 2rem 0 0.85rem;
}
.ed-doc__sub :deep(code), .ed-doc__sub code {
  font-family: var(--at-mono);
  font-size: 0.86em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  padding: 0.08em 0.4em;
}

/* Numbered prerequisite steps */
.ed-doc__steps {
  list-style: none;
  margin: 1rem 0 0;
  padding: 0;
  counter-reset: step-counter;
  max-width: 56rem;
}
.ed-doc__steps > li {
  position: relative;
  counter-increment: step-counter;
  padding: 0.85rem 0 0.85rem 2.6rem;
  border-bottom: 1px solid var(--at-grid-line);
  font-family: var(--at-sans);
  font-size: 0.98rem;
  line-height: 1.65;
  color: var(--at-mute-2);
}
.ed-doc__steps > li:last-child { border-bottom: 0; }
.ed-doc__steps > li::before {
  content: counter(step-counter);
  position: absolute;
  left: 0;
  top: 0.95rem;
  width: 1.6rem;
  height: 1.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--at-navy-deep);
  color: var(--at-bg-cream);
  font-family: var(--at-mono);
  font-size: 0.75rem;
  font-weight: 700;
}
.ed-doc__steps a {
  color: var(--at-navy-deep);
  text-decoration: underline;
  text-underline-offset: 3px;
}
.ed-doc__steps a:hover { color: var(--at-teal-deep); }
.ed-doc__steps code {
  font-family: var(--at-mono);
  font-size: 0.86em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  color: var(--at-navy-deep);
  padding: 0.08em 0.4em;
}

/* "or" separator inside reference-table cells */
:deep(.ed-or) {
  font-family: var(--at-sans);
  font-size: 0.78em;
  font-weight: 600;
  color: var(--at-mute);
  text-transform: lowercase;
  letter-spacing: 0.04em;
  padding: 0 0.25em;
}

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
}
</style>
