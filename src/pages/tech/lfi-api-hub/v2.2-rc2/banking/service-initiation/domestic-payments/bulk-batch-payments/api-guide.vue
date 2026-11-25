<route lang="yaml">
meta:
  title: Bulk and Batch Payments — API Guide
</route>

<script setup lang="ts">
const LFI = '/tech/lfi-api-hub/v2.2-rc2'
const SI = `${LFI}/banking/service-initiation`
const BASE = `${SI}/domestic-payments/bulk-batch-payments`

const decryptedConsentPiiExample = `{
  "Risk": {
    "UserIndicators": {
      "UserName": { "en": "Fatima Al Mansoori" },
      "Authentication": {
        "AuthenticationChannel": "Web",
        "ChallengeOutcome": "Pass",
        "AuthenticationFlow": "MFA"
      },
      "DeviceInformation": { "DeviceType": "Desktop" }
    },
    "BatchIndicators": {
      "Channel": "Web",
      "BatchSource": "FileUpload",
      "NumberOfNewCreditorAccounts": 1
    }
  }
}
`

const postPaymentsRequestExample = `{
  "requestUrl": "https://rs1.[LFICode].apihub.openfinance.ae/open-finance/payment/v2.2/bulk-payments",
  "request": {
    "Data": {
      "ConsentId": "cac2381a-7111-4c5f-bc2f-4319a93da7c5",
      "PersonalIdentifiableInformation": "eyJhbGciOiJSU0EtT0FFUC0yNTYi...",
      "Instructions": [
        {
          "Amount": { "Amount": "1500.00", "Currency": "AED" },
          "PaymentPurposeCode": "SAL",
          "PersonalIdentifiableInformation": "eyJhbGciOiJSU0EtT0FFUC0yNTYi...",
          "DebtorReference": "Payroll Jun26",
          "CreditorReference": "EMP-001"
        },
        {
          "Amount": { "Amount": "1500.00", "Currency": "AED" },
          "PaymentPurposeCode": "SAL",
          "PersonalIdentifiableInformation": "eyJhbGciOiJSU0EtT0FFUC0yNTYi...",
          "DebtorReference": "Payroll Jun26",
          "CreditorReference": "EMP-002"
        },
        {
          "Amount": { "Amount": "1250.00", "Currency": "AED" },
          "PaymentPurposeCode": "SAL",
          "PersonalIdentifiableInformation": "eyJhbGciOiJSU0EtT0FFUC0yNTYi...",
          "DebtorReference": "Payroll Jun26",
          "CreditorReference": "EMP-003"
        }
      ]
    }
  },
  "requestHeaders": {
    "o3-provider-id": "lfi-123",
    "o3-caller-org-id": "tpp-456",
    "o3-caller-client-id": "client-789",
    "o3-api-uri": "/open-finance/payment/v2.2/bulk-payments",
    "o3-api-operation": "POST",
    "o3-ozone-interaction-id": "ozone-xyz",
    "o3-consent-id": "cac2381a-7111-4c5f-bc2f-4319a93da7c5",
    "o3-psu-identifier": "eyJwczoi...",
    "x-fapi-interaction-id": "0f4d3a16-9e27-4f8d-9a5a-3a2f7e9c1b22",
    "x-idempotency-key": "idem-2026-06-24-payroll"
  },
  "tpp": {
    "clientId": "1675793e-d6e3-4954-96c8-acb9aaa83c53",
    "orgId": "a1b2c3d4-e5f6-7890-abcd-ef0123456789",
    "tppId": "fdd6e0ac-ba7a-4bc4-a986-c45c5daaaf00",
    "tppName": "Example TPP",
    "softwareStatementId": "XvAjPeeYZAdWwrFF..",
    "decodedSsa": {
      "client_id": "1675793e-d6e3-4954-96c8-acb9aaa83c53",
      "client_name": "Example TPP",
      "roles": ["BSIP"]
    }
  },
  "supplementaryInformation": {}
}
`

const decryptedInstructionPiiExample = `{
  "Initiation": {
    "DebtorAccount": {
      "SchemeName": "IBAN",
      "Identification": "AE070331234567890123456"
    },
    "Creditor": { "Name": "Ivan England" },
    "CreditorAccount": {
      "SchemeName": "IBAN",
      "Identification": "AE460090000000123456789",
      "Name": { "en": "Ivan David England" }
    }
  }
}
`

const processBatchNode = `async function processBatch(body: PaymentPostRequest, psuIdentifier: string) {
  const { ConsentId, PersonalIdentifiableInformation, Instructions } = body.request.Data

  // Batch level — a failure here rejects the whole request; no payment is created.
  const consent = await consentStore.getBulkBatchConsent(ConsentId)
  if (!consent) throw httpError(400, 'Consent.Invalid', \`No Bulk and Batch consent \${ConsentId}.\`)

  const batchPii = await decryptPii(PersonalIdentifiableInformation)   // shared decrypt helper
  validateSchema('AEBankServiceInitiation.AEFilePaymentRiskPIIProperties', batchPii)  // 400 Body.InvalidFormat

  // Payment level — each instruction is checked on its own. A failure rejects
  // that payment only; the rest of the batch carries on.
  const payments = []
  for (const instruction of Instructions) {
    const payment = createPaymentRecord(consent, instruction)          // own, unique PaymentId
    try {
      const pii = await decryptPii(instruction.PersonalIdentifiableInformation)
      validateSchema('AEBankServiceInitiation.AEFilePaymentPIIProperties', pii)
      await checkDebtorAccount(pii.Initiation.DebtorAccount, psuIdentifier, consent)  // held by the User, eligible, active
      await checkCreditor(pii.Initiation)                                            // valid UAE domestic creditor
      await checkFunds(pii.Initiation.DebtorAccount, instruction.Amount)
      payment.accept(pii, batchPii.Risk)        // goes on to screening and its rail
    } catch (err) {
      payment.reject(rejectReasonFor(err))      // Rejected, with a RejectReasonCode
    }
    payments.push(payment)
  }
  return payments
}
`

const processBatchPython = `def process_batch(body: dict, psu_identifier: str) -> list:
    data = body["request"]["Data"]

    # Batch level — a failure here rejects the whole request; no payment is created.
    consent = consent_store.get_bulk_batch_consent(data["ConsentId"])
    if consent is None:
        raise HttpError(400, "Consent.Invalid", f"No Bulk and Batch consent {data['ConsentId']}.")

    batch_pii = decrypt_pii(data["PersonalIdentifiableInformation"])   # shared decrypt helper
    validate_schema("AEBankServiceInitiation.AEFilePaymentRiskPIIProperties", batch_pii)  # 400 Body.InvalidFormat

    # Payment level — each instruction is checked on its own. A failure rejects
    # that payment only; the rest of the batch carries on.
    payments = []
    for instruction in data["Instructions"]:
        payment = create_payment_record(consent, instruction)          # own, unique PaymentId
        try:
            pii = decrypt_pii(instruction["PersonalIdentifiableInformation"])
            validate_schema("AEBankServiceInitiation.AEFilePaymentPIIProperties", pii)
            check_debtor_account(pii["Initiation"]["DebtorAccount"], psu_identifier, consent)  # held by the User, eligible, active
            check_creditor(pii["Initiation"])                                                 # valid UAE domestic creditor
            check_funds(pii["Initiation"]["DebtorAccount"], instruction["Amount"])
            payment.accept(pii, batch_pii["Risk"])   # goes on to screening and its rail
        except PaymentCheckError as err:
            payment.reject(reject_reason_for(err))   # Rejected, with a RejectReasonCode
        payments.append(payment)
    return payments
`

const postBulkPaymentsResponseExample = `{
  "data": {
    "id": "4f1c2a9e-7b3d-4e8a-9c61-2d5f0b7a8e13",
    "consentId": "cac2381a-7111-4c5f-bc2f-4319a93da7c5",
    "creationDateTime": "2026-06-24T15:47:02+00:00",
    "instructions": [
      {
        "paymentId": "83b47199-90c2-4c05-9ef1-aeae68b0fc7c",
        "status": "Pending",
        "statusUpdateDateTime": "2026-06-24T15:47:02+00:00",
        "amount": { "amount": "1500.00", "currency": "AED" },
        "paymentPurposeCode": "SAL",
        "debtorReference": "Payroll Jun26",
        "creditorReference": "EMP-001"
      },
      {
        "paymentId": "1d2e9a40-5c7b-4f18-8e36-0b9a2c4d7e51",
        "status": "Pending",
        "statusUpdateDateTime": "2026-06-24T15:47:02+00:00",
        "amount": { "amount": "1500.00", "currency": "AED" },
        "paymentPurposeCode": "SAL",
        "debtorReference": "Payroll Jun26",
        "creditorReference": "EMP-002"
      },
      {
        "paymentId": "a7c3f5e2-9b14-4d6a-b08e-3e5f1c2d9a74",
        "status": "Pending",
        "statusUpdateDateTime": "2026-06-24T15:47:02+00:00",
        "amount": { "amount": "1250.00", "currency": "AED" },
        "paymentPurposeCode": "SAL",
        "debtorReference": "Payroll Jun26",
        "creditorReference": "EMP-003"
      }
    ]
  }
}
`

const getBulkPaymentResponseExample = `{
  "data": {
    "id": "4f1c2a9e-7b3d-4e8a-9c61-2d5f0b7a8e13",
    "consentId": "cac2381a-7111-4c5f-bc2f-4319a93da7c5",
    "creationDateTime": "2026-06-24T15:47:02+00:00",
    "instructions": [
      {
        "paymentId": "83b47199-90c2-4c05-9ef1-aeae68b0fc7c",
        "paymentTransactionId": "OFP20260624154703000001",
        "paymentRail": "AANI",
        "status": "AcceptedWithoutPosting",
        "statusUpdateDateTime": "2026-06-24T15:47:06+00:00",
        "amount": { "amount": "1500.00", "currency": "AED" },
        "paymentPurposeCode": "SAL",
        "debtorReference": "Payroll Jun26",
        "creditorReference": "EMP-001"
      },
      {
        "paymentId": "1d2e9a40-5c7b-4f18-8e36-0b9a2c4d7e51",
        "paymentTransactionId": "OFP20260624154703000002",
        "paymentRail": "AANI",
        "status": "AcceptedWithoutPosting",
        "statusUpdateDateTime": "2026-06-24T15:47:06+00:00",
        "amount": { "amount": "1500.00", "currency": "AED" },
        "paymentPurposeCode": "SAL",
        "debtorReference": "Payroll Jun26",
        "creditorReference": "EMP-002"
      },
      {
        "paymentId": "a7c3f5e2-9b14-4d6a-b08e-3e5f1c2d9a74",
        "paymentTransactionId": "OFP20260624154703000003",
        "paymentRail": "AANI",
        "status": "Rejected",
        "statusUpdateDateTime": "2026-06-24T15:47:05+00:00",
        "rejectReasonCode": [
          { "code": "AANI.AM04", "message": "Payment request cannot be executed as insufficient funds at debtor account." }
        ],
        "amount": { "amount": "1250.00", "currency": "AED" },
        "paymentPurposeCode": "SAL",
        "debtorReference": "Payroll Jun26",
        "creditorReference": "EMP-003"
      }
    ]
  }
}
`

const processBatchTabs = [
  { label: 'Node.js', lang: 'typescript', code: processBatchNode },
  { label: 'Python',  lang: 'python',     code: processBatchPython },
] as const
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          LFI · Banking · Service Initiation · Bulk and Batch Payments
        </div>
        <h1 class="ed-doc__title">
          Bulk and Batch Payments &mdash; API Guide
          <span class="ed-doc__read">9 min read</span>
        </h1>
        <BulkBatchOptionalNotice />
        <p class="ed-doc__lede">
          Bulk and Batch Payments let a TPP make many domestic payments from a customer's accounts at your
          LFI under a single consent and a single authorization. This guide covers what your LFI implements
          for them: validating the consent, authorizing the batch, and executing every payment in the batch
          on Ozone Connect <code>POST /bulk-payments</code>.
        </p>
        <p class="ed-doc__lede">
          The behavioural rules for each step &mdash; validation conditions, error mappings, and how each
          payment in a batch is treated &mdash; are in the
          <a href="./requirements">Bulk and Batch Payments Requirements</a>.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="prerequisites"
      num="01"
      color="var(--at-teal)"
      eyebrow="Prerequisites"
      title="What you need before implementing Bulk and Batch Payments"
      tone="cream"
    >
      <EdProse>Before implementing Bulk and Batch Payments, ensure the following are in place:</EdProse>

      <EdBullets>
        <li>
          <strong>API Hub onboarded</strong> &mdash; Your API Hub instance is provisioned and your
          <a :href="`${LFI}/api-hub/onboarding/environment-specific/`">environment-specific
          configuration</a> is complete.
        </li>
        <li>
          <strong>Enc1 key pair generated and registered</strong> &mdash; The TPP encrypts PII to your
          LFI's <a :href="`${LFI}/api-hub/onboarding/environment-specific/#enc1-encryption-key`">Enc1
          public key</a>: once for the consent, once for the batch, and once for each payment. Your LFI
          MUST hold the corresponding private key and be able to look it up by <code>kid</code>.
        </li>
        <li>
          <strong>Consent Journey implemented</strong> &mdash; The
          <a :href="`${LFI}/consent-journey/api-guide`">Consent Journey API Guide</a> MUST be implemented
          first. A batch cannot be executed without an authorized consent.
        </li>
        <li>
          <strong>Ozone Connect connectivity verified</strong> &mdash; Bidirectional mTLS connectivity is
          confirmed between the API Hub and your Ozone Connect base URL. See
          <a :href="`${LFI}/api-hub/connectivity/`">Connectivity &amp; Certificates</a>.
        </li>
        <li>
          <strong>Domestic payments implemented</strong> &mdash; Each payment in a batch is screened and
          settled as a domestic payment. The
          <a :href="`${SI}/domestic-payments/single-instant-payment/api-guide`">Single Instant Payment API
          Guide</a> covers the creditor checks, screening and rail routing that each payment reuses.
        </li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="sequence-flow"
      num="02"
      color="var(--at-gold)"
      eyebrow="API Sequence Flow"
      title="End-to-end Bulk and Batch Payment"
      tone="surface"
    >
      <APIFlowViewer title="Bulk and Batch Payment API Flow">
        <APIFlowsBulkBatchPayment />
      </APIFlowViewer>
    </EdSectionBand>

    <EdSectionBand
      id="consent-validation"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Consent Validation"
      title="Validate the consent before it is created"
      tone="cream"
    >
      <EdProse>
        When a TPP creates a Bulk and Batch consent, the API Hub calls your
        <a :href="`${LFI}/consent-events/open-api/validate`" class="endpoint"><span class="http-method http-method--post">POST</span><code>/consent/action/validate</code></a>
        endpoint <strong>before</strong> the consent is created. Your LFI MUST validate the consent and
        respond with <code>data.status: "valid"</code> or <code>data.status: "invalid"</code>.
      </EdProse>

      <EdProse>
        A Bulk and Batch consent is identified by its <code>ControlParameters.ConsentSchedule</code>
        carrying <code>BulkBatchPayment</code>, with the reason for the batch (<code>Description</code>),
        the number of payments (<code>NumberOfTransactions</code>) and their total
        (<code>TotalValueOfPayments</code>). It names <strong>no Debtor Account and no Creditor</strong>
        &mdash; each payment carries its own, on <code>POST /bulk-payments</code> &mdash; so there is far less to
        validate than for a single payment. The full rule set is in
        <a href="./requirements#consent-validation">Requirements &mdash; Consent Validation</a>.
      </EdProse>

      <h3 class="ed-doc__subhead">Decrypting and validating the PII</h3>
      <EdProse>
        <code>consent.PersonalIdentifiableInformation</code> arrives as a JWE compact string encrypted by
        the TPP to your LFI's Enc1 public key. Decrypt it as for any payment consent, then validate the
        payload against the Bulk and Batch Payment PII &mdash;
        <code>AEBankServiceInitiationRichAuthorizationRequests.AEBulkBatchPaymentPII</code> in
        <code>uae-api-hub-consent-manager-openapi.yaml</code>. It carries only the Bulk and Batch
        <code>Risk</code> block (<code>AEBulkBatchPaymentRisk</code>): <code>UserIndicators</code> for the
        User who submits the batch and <code>BatchIndicators</code> for the batch itself. See
        <a :href="`${SI}/personal-identifiable-information/api-guide/decrypt-pii`">How to Decrypt PII</a>
        for the decrypt helper.
      </EdProse>

      <EdProse>The decrypted consent-time PII for a Bulk/Batch Payment looks like:</EdProse>
      <EdCode :code="decryptedConsentPiiExample" lang="json" filename="decrypted consent PII" />

      <EdProse>
        If decryption fails or the payload fails schema validation, respond with <code>invalid</code>.
        See
        <a :href="`${LFI}/consent-events/api-guide#validate-post-consent-action-validate`">Consent Events
        &amp; Actions &mdash; API Guide</a> for the full validate request and response schema.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="consent-flow"
      num="04"
      color="var(--at-navy)"
      eyebrow="Consent Flow"
      title="Authenticate the customer and authorize the batch"
      tone="surface"
    >
      <EdProse>
        After consent creation passes validation, the TPP redirects the customer to your LFI's
        <a :href="`${LFI}/api-hub/onboarding/environment-specific/auth-endpoint`">authorization
        endpoint</a> and your LFI runs the standard consent journey: authenticate the customer, retrieve
        the consent, show the batch on the Authorization Page, patch the customer identifier onto the
        consent, and redirect back to the Hub. There is <strong>no account selection</strong> &mdash; the
        consent names no Debtor Account. See <a href="./user-journeys">User Experience</a> for what the
        page shows, and <a href="./requirements#authorization">Requirements &mdash; Authorization</a> for
        the eligibility rules.
      </EdProse>

      <EdProse>The endpoints your LFI implements against the API Hub for this flow are:</EdProse>

      <EdRefTable>
        <table>
          <thead><tr><th>Endpoint</th><th>Direction</th><th>Purpose</th></tr></thead>
          <tbody>
            <tr><td><a :href="`${LFI}/api-hub/headless-heimdall/open-api/auth`" class="endpoint"><span class="http-method http-method--get">GET</span><code>/auth</code></a></td><td>LFI &rarr; API Hub</td><td>Initiate the authorization interaction</td></tr>
            <tr><td><a :href="`${LFI}/api-hub/consent-manager/open-api/consents-consentId`" class="endpoint"><span class="http-method http-method--get">GET</span><code>/consents/{consentId}</code></a></td><td>LFI &rarr; API Hub</td><td>Retrieve the full consent details, including <code>BulkBatchPayment</code></td></tr>
            <tr><td><a :href="`${LFI}/api-hub/consent-manager/open-api/patch-consents-consentId`" class="endpoint"><span class="http-method http-method--patch">PATCH</span><code>/consents/{consentId}</code></a></td><td>LFI &rarr; API Hub</td><td>Update the consent status and customer identifiers</td></tr>
            <tr><td><a :href="`${LFI}/api-hub/headless-heimdall/open-api/auth-interactionId-doConfirm`" class="endpoint"><span class="http-method http-method--post">POST</span><code>/auth/{interactionId}/doConfirm</code></a></td><td>LFI &rarr; API Hub</td><td>Complete the interaction and redirect back to the TPP successfully</td></tr>
            <tr><td><a :href="`${LFI}/api-hub/headless-heimdall/open-api/auth-interactionId-doFail`" class="endpoint"><span class="http-method http-method--post">POST</span><code>/auth/{interactionId}/doFail</code></a></td><td>LFI &rarr; API Hub</td><td>Complete the interaction and redirect back to the TPP with a failure</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdNote type="info" title="The customer identifier ties each payment to the User">
        <p>
          The customer identifier you patch onto the consent is returned on every
          <code>POST /bulk-payments</code> as the <code>o3-psu-identifier</code> header. With no account
          pinned on the consent, it is what you use to check that each payment's Debtor Account is held
          by the User who authorized the batch.
        </p>
      </EdNote>

      <EdProse>
        Full details are in the <a :href="`${LFI}/consent-journey/api-guide`">Consent Journey API
        Guide</a>.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="post-bulk-payments"
      num="05"
      color="var(--at-teal-deep)"
      eyebrow="POST /bulk-payments"
      title="Validate the batch and every payment in it, return 201"
      tone="cream"
    >
      <div class="ed-doc__endpoint">
        <span class="http-badge http-post">POST</span>
        <code class="ed-doc__endpoint-path">/bulk-payments</code>
      </div>

      <EdProse>
        When the TPP submits the batch, the API Hub validates the access token, the consent status and
        the OpenAPI schema, and validates the <code>Instructions</code> array against the consent &mdash;
        the count against <code>NumberOfTransactions</code>, every currency against
        <code>TotalValueOfPayments.Currency</code> (<code>AED</code>) and the total against
        <code>TotalValueOfPayments.Amount</code>. It then calls your Ozone Connect
        <a :href="`${BASE}/open-api/bulk-payments`" class="endpoint"><span class="http-method http-method--post">POST</span><code>/bulk-payments</code></a>
        with every payment in one request. <code>POST /bulk-payments</code> is the Bulk and Batch
        counterpart of <code>POST /payments</code>: the same <code>o3-*</code> headers, the same security
        and the same error responses.
      </EdProse>

      <EdNote type="warning" title="Reject one payment, not the batch">
        <p>
          A failure in the batch as a whole &mdash; the consent, the idempotency key or the batch-level
          PII &mdash; rejects the whole request with an error response, and no payment is made. A failure
          in one payment &mdash; its PII, Debtor Account, Creditor, funds or any other error &mdash; rejects
          <strong>that payment only</strong>, with its <code>rejectReasonCode</code>, and you MUST carry on
          processing the rest of the batch. See
          <a href="./requirements#payment-execution">Requirements &mdash; Payment Execution</a>.
        </p>
      </EdNote>

      <h3 class="ed-doc__subhead">Request body</h3>
      <EdProse><code>Content-Type: application/json</code></EdProse>
      <EdProse>
        The body is <code>BulkPaymentPostRequest</code>, which mirrors the single-payment
        <code>PaymentPostRequest</code>: <code>requestUrl</code>, <code>request</code> (the TPP's
        <code>AEFilePaymentRequest</code> as received), <code>requestHeaders</code>, <code>tpp</code> and
        <code>supplementaryInformation</code>. It carries no <code>paymentType</code>, as the operation
        identifies the payment as a Bulk/Batch Payment. The request headers and the
        <code>requestHeaders</code>, <code>tpp</code> and <code>supplementaryInformation</code> blocks are
        the same as for a single payment &mdash; see the
        <a :href="`${SI}/domestic-payments/single-instant-payment/api-guide#post-payments`">Single Instant
        Payment API Guide</a>. The TPP's FAPI headers, including <code>x-idempotency-key</code>, are inside
        <code>requestHeaders</code>, not on the HTTP request.
      </EdProse>

      <h4 class="ed-doc__subhead ed-doc__subhead--small"><code>request.Data</code> (<code>AEFilePaymentRequest</code>)</h4>
      <EdRefTable>
        <table>
          <thead><tr><th>Field</th><th>Type</th><th>Required</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>ConsentId</code></td><td>string</td><td>Yes</td><td>The Bulk and Batch consent the batch is executed under. MUST equal the <code>o3-consent-id</code> header</td></tr>
            <tr><td><code>PersonalIdentifiableInformation</code></td><td>string (JWE)</td><td>No</td><td>The batch-level PII: the Bulk and Batch <code>Risk</code> block, once for the whole batch</td></tr>
            <tr><td><code>Instructions</code></td><td>array (1–500)</td><td>Yes</td><td>The payments in the batch, one element per payment, at most 500. <em>Described below.</em></td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h4 class="ed-doc__subhead ed-doc__subhead--small"><code>request.Data.Instructions[]</code> (<code>AEFilePaymentInstruction</code>)</h4>
      <EdRefTable>
        <table>
          <thead><tr><th>Field</th><th>Type</th><th>Required</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>Amount.Amount</code></td><td>string</td><td>Yes</td><td>Decimal amount with two fraction digits</td></tr>
            <tr><td><code>Amount.Currency</code></td><td>string</td><td>Yes</td><td><code>AED</code> &mdash; the API Hub has checked it against <code>TotalValueOfPayments.Currency</code></td></tr>
            <tr><td><code>PaymentPurposeCode</code></td><td>string</td><td>Yes</td><td>3-letter AANI purpose code of this payment</td></tr>
            <tr><td><code>PersonalIdentifiableInformation</code></td><td>string (JWE)</td><td>Yes</td><td>This payment's Debtor Account and creditor, encrypted on its own</td></tr>
            <tr><td><code>DebtorReference</code></td><td>string</td><td>No</td><td>Reference shown on the debtor's statement for this payment</td></tr>
            <tr><td><code>CreditorReference</code></td><td>string</td><td>No</td><td>Reference passed to the creditor for this payment</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h4 class="ed-doc__subhead ed-doc__subhead--small">Request example</h4>
      <EdCode :code="postPaymentsRequestExample" lang="json" filename="POST /bulk-payments request body" />

      <h3 id="reading-the-pii" class="ed-doc__subhead">Reading the PII</h3>
      <EdProse>A batch carries PII at two levels, each encrypted to your Enc1 public key:</EdProse>
      <EdRefTable>
        <table>
          <thead><tr><th>PII</th><th>Schema</th><th>Carries</th></tr></thead>
          <tbody>
            <tr><td><code>Data.PersonalIdentifiableInformation</code></td><td><code>AEBankServiceInitiation.AEFilePaymentRiskPIIProperties</code></td><td>The Bulk and Batch <code>Risk</code> block only, for the whole batch</td></tr>
            <tr><td><code>Data.Instructions[].PersonalIdentifiableInformation</code></td><td><code>AEBankServiceInitiation.AEFilePaymentPIIProperties</code></td><td>That payment's <code>Initiation.DebtorAccount</code> and <code>Initiation.CreditorAccount</code> (both required), and optional <code>Initiation.Creditor</code> and <code>Initiation.CreditorAgent</code>. No <code>Risk</code> and no Confirmation of Payee</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>A decrypted instruction PII looks like:</EdProse>
      <EdCode :code="decryptedInstructionPiiExample" lang="json" filename="decrypted instruction PII" />

      <EdProse>
        Both schemas are in <code>uae-ozone-connect-bank-service-initiation-openapi.yaml</code>. Decrypt
        each with the same helper as at consent time &mdash; see
        <a :href="`${SI}/personal-identifiable-information/api-guide/decrypt-pii`">How to Decrypt PII</a>.
      </EdProse>

      <h3 id="processing-the-batch" class="ed-doc__subhead">Processing the batch</h3>
      <EdProse>
        Check the batch as a whole first, then each payment on its own. Each payment gets its own
        <code>PaymentId</code>, and a payment that fails a check is rejected without stopping the others:
      </EdProse>

      <EdCodeGroup :tabs="processBatchTabs" />

      <EdRefTable>
        <table>
          <thead><tr><th>Check</th><th>Level</th><th>On failure</th></tr></thead>
          <tbody>
            <tr><td>Consent referenced by <code>o3-consent-id</code> is a known, unrevoked Bulk and Batch consent</td><td>Batch</td><td><code>400</code> <code>Consent.Invalid</code></td></tr>
            <tr><td>Batch PII decrypts and conforms to <code>AEFilePaymentRiskPIIProperties</code></td><td>Batch</td><td><code>400</code> <code>JWE.DecryptionError</code> or <code>Body.InvalidFormat</code></td></tr>
            <tr><td>Instruction PII decrypts and conforms to <code>AEFilePaymentPIIProperties</code></td><td>Payment</td><td>That payment <code>Rejected</code></td></tr>
            <tr><td><code>DebtorAccount</code> is a UAE IBAN at your LFI, held by the User identified by <code>o3-psu-identifier</code>, eligible under <code>IsSingleAuthorization</code>, and active</td><td>Payment</td><td>That payment <code>Rejected</code></td></tr>
            <tr><td>Creditor is a valid UAE domestic creditor &mdash; see <a :href="`${SI}/personal-identifiable-information/creditor`">Creditor</a></td><td>Payment</td><td>That payment <code>Rejected</code></td></tr>
            <tr><td>Debtor Account has sufficient funds for that payment</td><td>Payment</td><td>That payment <code>Rejected</code></td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3 id="repeated-idempotency-key" class="ed-doc__subhead">Repeated idempotency keys</h3>
      <EdProse>
        The <code>x-idempotency-key</code> in <code>requestHeaders</code> identifies the whole batch.
        Check it before anything else. Record each batch you accept against the key, the
        <code>tpp.clientId</code> and the <code>o3-consent-id</code> header, for at least 24 hours. A
        repeat of the same batch MUST NOT execute any payment again: return <code>201</code> with the
        original <code>data.id</code> and <code>paymentId</code>s and each payment's current
        <code>status</code>. A repeat with a different <code>request.Data</code> MUST be rejected with
        <code>409</code> <code>GenericRecoverableError</code> &mdash; compare every
        <code>PersonalIdentifiableInformation</code> after decryption, as the encrypted values change when
        the TPP re-signs a retry. See
        <a href="./requirements#payment-execution">Requirements &mdash; Payment Execution</a> rule 1.
      </EdProse>

      <h3 id="after-acceptance" class="ed-doc__subhead">Screening and settling each payment</h3>
      <EdProse>
        Each payment that passes its checks goes on, on its own, to your fraud screening, transaction
        monitoring and AML controls, and then to its rail &mdash; AANI, UAEFTS, or your own ledger where the
        debtor and creditor accounts are both held at your LFI. A payment that fails screening is
        <code>Rejected</code>; the others are not affected. The domestic rail and status rules apply to
        each payment as for a single payment &mdash; see
        <a :href="`${SI}/domestic-payments/overview/payment-status`">Payment Rails and Status</a> and
        <a href="./requirements#screening-and-settlement">Requirements &mdash; Screening and
        Settlement</a>.
      </EdProse>

      <h3 id="response" class="ed-doc__subhead">Response</h3>
      <EdProse><code>Content-Type: application/json</code></EdProse>
      <EdProse>
        If the batch as a whole passes, return <code>201</code> with <code>AEFilePaymentIdResponse</code>,
        the camelCase mirror of the TPP-facing Bulk/Batch response, as <code>AEPaymentIdResponse</code> is
        for a single payment. Include every payment, in the order of <code>request.Data.Instructions</code>,
        including any you rejected. The batch has <strong>no status of its own</strong>.
      </EdProse>

      <h4 class="ed-doc__subhead ed-doc__subhead--small"><code>data</code></h4>
      <EdRefTable>
        <table>
          <thead><tr><th>Field</th><th>Type</th><th>Required</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>id</code></td><td>string</td><td>Yes</td><td>The LFI-assigned identifier of the Bulk/Batch Payment &mdash; the TPP's <code>BulkPaymentId</code>. MUST be unique and MUST NOT be reassigned</td></tr>
            <tr><td><code>consentId</code></td><td>string</td><td>No</td><td>The Bulk and Batch consent the batch was executed under</td></tr>
            <tr><td><code>creationDateTime</code></td><td>string</td><td>Yes</td><td>ISO 8601 timestamp the Bulk/Batch Payment was created</td></tr>
            <tr><td><code>instructions</code></td><td>array</td><td>Yes</td><td>One element per request instruction, in the same order. <em>Described below.</em></td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h4 class="ed-doc__subhead ed-doc__subhead--small"><code>data.instructions[]</code> (<code>AEFilePaymentInstructionResponse</code>)</h4>
      <EdRefTable>
        <table>
          <thead><tr><th>Field</th><th>Type</th><th>Required</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>paymentId</code></td><td>string</td><td>Yes</td><td>The LFI-assigned <code>PaymentId</code> of this payment. MUST be unique; it is used with <code>GET /bulk-payments/{bulkPaymentId}/payments/{paymentId}</code>, not with <code>GET /payments/{paymentId}</code></td></tr>
            <tr><td><code>status</code></td><td>string</td><td>Yes</td><td>This payment's status, as for a single payment: <code>Pending</code>, <code>AcceptedSettlementCompleted</code>, <code>AcceptedCreditSettlementCompleted</code>, <code>AcceptedWithoutPosting</code> or <code>Rejected</code></td></tr>
            <tr><td><code>statusUpdateDateTime</code></td><td>string</td><td>Yes</td><td>ISO 8601 timestamp of this payment's last status update</td></tr>
            <tr><td><code>amount</code></td><td>object</td><td>Yes</td><td>This payment's amount and currency</td></tr>
            <tr><td><code>paymentPurposeCode</code></td><td>string</td><td>Yes</td><td>This payment's purpose code, from the request</td></tr>
            <tr><td><code>paymentTransactionId</code></td><td>string</td><td>No</td><td>End-to-end identifier of this payment on its rail. Omit until set &mdash; do not return an empty string</td></tr>
            <tr><td><code>paymentRail</code></td><td>string</td><td>No</td><td>The rail this payment settles over. It also sets the namespace of its <code>rejectReasonCode</code></td></tr>
            <tr><td><code>rejectReasonCode</code></td><td>array</td><td>No</td><td>Why this payment was <code>Rejected</code>. The <code>message</code> MUST be sanitised for onward relay to the TPP</td></tr>
            <tr><td><code>debtorReference</code></td><td>string</td><td>No</td><td>This payment's debtor reference, from the request</td></tr>
            <tr><td><code>creditorReference</code></td><td>string</td><td>No</td><td>This payment's creditor reference, from the request</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h4 class="ed-doc__subhead ed-doc__subhead--small">Example &mdash; a batch of three</h4>
      <EdCode :code="postBulkPaymentsResponseExample" lang="json" filename="201 Created" />

      <EdProse>
        Error responses are the same as for <code>POST /payments</code> &mdash; see the
        <a :href="`${SI}/domestic-payments/single-instant-payment/api-guide#post-payments`">Single Instant
        Payment API Guide</a> and the <a :href="`${BASE}/open-api/bulk-payments`">POST
        <code>/bulk-payments</code> API Reference</a>. Return one only for a failure of the batch as a
        whole.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="get-bulk-payments"
      num="06"
      color="var(--at-teal)"
      eyebrow="GET /bulk-payments/:bulkPaymentId"
      title="Serve the status of every payment in the batch"
      tone="surface"
    >
      <div class="ed-doc__endpoint">
        <span class="http-badge http-get">GET</span>
        <code class="ed-doc__endpoint-path">/bulk-payments/{bulkPaymentId}</code>
      </div>

      <EdProse>
        <a :href="`${BASE}/open-api/bulk-payments-bulkPaymentId`" class="endpoint"><span class="http-method http-method--get">GET</span><code>/bulk-payments/{bulkPaymentId}</code></a>
        is the Bulk and Batch counterpart of <code>GET /payments/{paymentId}</code>. The API Hub calls it
        when the TPP reads the batch, with the same <code>o3-*</code> headers and the
        <code>bulkPaymentId</code> you returned as <code>data.id</code>. Return the same body as the
        <code>201</code> to <code>POST /bulk-payments</code>, with the <strong>current</strong>
        <code>status</code> of each payment, in the original request order. Once a payment is routed,
        report its <code>paymentRail</code>; its <code>rejectReasonCode</code>, if any, carries that rail's
        namespace.
      </EdProse>

      <h4 class="ed-doc__subhead ed-doc__subhead--small">Example &mdash; two settled, one rejected by AANI</h4>
      <EdCode :code="getBulkPaymentResponseExample" lang="json" filename="200 OK" />

      <EdProse>
        The TPP's lookup by idempotency key (<code>GET /bulk-payments</code>) has no Ozone Connect
        counterpart: the API Hub answers it itself, as for single payments. See
        <a href="./requirements#payment-status-retrieval">Requirements &mdash; Payment Status
        Retrieval</a>.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="get-bulk-payments-payment"
      num="07"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="GET /bulk-payments/:bulkPaymentId/payments/:paymentId"
      title="Serve one payment from a batch"
      tone="cream"
    >
      <div class="ed-doc__endpoint">
        <span class="http-badge http-get">GET</span>
        <code class="ed-doc__endpoint-path">/bulk-payments/{bulkPaymentId}/payments/{paymentId}</code>
      </div>

      <EdProse>
        The TPP can read a single payment from a batch, by its <code>BulkPaymentId</code> and
        <code>PaymentId</code>. The API Hub then calls your
        <a :href="`${BASE}/open-api/bulk-payments-bulkPaymentId-payments-paymentId`" class="endpoint"><span class="http-method http-method--get">GET</span><code>/bulk-payments/{bulkPaymentId}/payments/{paymentId}</code></a>
        with the same <code>o3-*</code> headers, the <code>bulkPaymentId</code> you returned as
        <code>data.id</code>, and the <code>paymentId</code> you assigned to that payment.
      </EdProse>

      <EdProse>
        Return <code>AEFilePaymentInstructionIdResponse</code>: its <code>data</code> is that payment's
        element of <code>data.instructions</code>, exactly as <code>GET /bulk-payments/{bulkPaymentId}</code>
        returns it, with the payment's current <code>status</code>. If <code>paymentId</code> is not a
        payment within the Bulk/Batch Payment identified by <code>bulkPaymentId</code>, return an error
        response &mdash; the TPP receives <code>404</code>. See
        <a href="./requirements#payment-status-retrieval">Requirements &mdash; Payment Status
        Retrieval</a>.
      </EdProse>

      <EdProse>
        This is the only way to read a single payment from a batch. Bulk/Batch Payments are kept separate
        from single payments: the API Hub does not call your
        <a :href="`${SI}/open-api/payments-PaymentId`" class="endpoint"><span class="http-method http-method--get">GET</span><code>/payments/{paymentId}</code></a>
        for a payment within a batch, and that endpoint serves only payments made on
        <code>POST /payments</code>.
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
.ed-doc__lede :deep(code) {
  font-family: var(--at-mono);
  font-size: 0.86em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  padding: 0.08em 0.4em;
}
.ed-doc__lede :deep(a) {
  color: var(--at-navy-deep);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.ed-doc__endpoint {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  margin: 0.5rem 0 1.5rem;
}
.ed-doc__endpoint-path {
  font-family: var(--at-mono);
  font-size: 0.95rem;
  background: var(--at-surface);
  padding: 0.35rem 0.6rem;
  border: 1px solid var(--at-grid-line);
  color: var(--at-navy-deep);
}

.ed-doc__subhead {
  font-family: var(--at-serif);
  font-size: 1.25rem;
  font-weight: 600;
  letter-spacing: -0.015em;
  color: var(--at-navy-deep);
  margin: 1.75rem 0 0.85rem;
}
.ed-doc__subhead--small { font-size: 1.05rem; margin-top: 1.5rem; }
.ed-doc__subhead :deep(code) {
  font-family: var(--at-mono);
  font-size: 0.8em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  padding: 0.08em 0.4em;
}

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
}
</style>
