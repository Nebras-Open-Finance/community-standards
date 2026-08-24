<route lang="yaml">
meta:
  title: Bank Data Sharing — API Guide
  isIndex: true
</route>

<script setup lang="ts">
const accountsListJson = `{
  "data": [
    {
      "id": "acc-001",
      "accountType": "Retail",
      "accountSubType": "CurrentAccount",
      "currency": "AED",
      "status": "Active",
      "accountHolderName": "Ahmed Al Mansouri",
      "servicer": {
        "schemeName": "BICFI",
        "identification": "BANKAEAAXXX"
      },
      "accountNumbers": [
        {
          "schemeName": "IBAN",
          "identification": "AE070331234567890123456"
        }
      ],
      "customers": [
        { "id": "cust-001" }
      ],
      "product": {
        "id": "prod-current-01",
        "productName": "Everyday Current Account"
      }
    }
  ],
  "meta": {
    "totalPages": 1,
    "totalRecords": 1
  }
}
`

const accountByIdJson = `{
  "data": {
    "id": "acc-001",
    "accountType": "Retail",
    "accountSubType": "CurrentAccount",
    "currency": "AED",
    "status": "Active",
    "accountHolderName": "Ahmed Al Mansouri",
    "servicer": {
      "schemeName": "BICFI",
      "identification": "BANKAEAAXXX"
    },
    "accountNumbers": [
      {
        "schemeName": "IBAN",
        "identification": "AE070331234567890123456"
      }
    ],
    "customers": [
      { "id": "cust-001" }
    ],
    "product": {
      "id": "prod-current-01",
      "productName": "Everyday Current Account"
    }
  },
  "meta": {}
}
`

const balancesJson = `{
  "data": [
    {
      "accountId": "acc-001",
      "balanceType": "InterimAvailable",
      "creditDebitIndicator": "Credit",
      "timestamp": "2026-04-13T10:15:00Z",
      "amount": { "amount": "12345.67", "currency": "AED" }
    },
    {
      "accountId": "acc-001",
      "balanceType": "ClosingBooked",
      "creditDebitIndicator": "Credit",
      "timestamp": "2026-04-12T23:59:59Z",
      "amount": { "amount": "12000.00", "currency": "AED" }
    }
  ],
  "meta": { "totalPages": 1, "totalRecords": 2 }
}
`

const transactionsJson = `{
  "data": [
    {
      "accountId": "acc-001",
      "transactionId": "txn-900123",
      "transactionDateTime": "2026-04-12T14:22:11Z",
      "bookingDateTime": "2026-04-12T14:22:11Z",
      "valueDateTime": "2026-04-12T14:22:11Z",
      "transactionType": "POS",
      "subTransactionType": "CardPurchase",
      "creditDebitIndicator": "Debit",
      "status": "Booked",
      "amount": { "amount": "42.50", "currency": "AED" },
      "transactionInformation": "CARREFOUR MALL OF THE EMIRATES",
      "transactionReference": "POS-20260412-900123",
      "balance": {
        "creditDebitIndicator": "Credit",
        "balanceType": "InterimAvailable",
        "amount": { "amount": "12345.67", "currency": "AED" }
      },
      "merchantDetails": {
        "merchantName": "Carrefour",
        "merchantCategoryCode": "5411"
      }
    }
  ],
  "meta": {
    "paginated": true,
    "totalPages": 12,
    "totalRecords": 1187
  }
}
`

const statementsJson = `{
  "data": [
    {
      "accountId": "acc-001",
      "accountSubType": "CurrentAccount",
      "statementId": "stmt-2026-03",
      "statementDate": "2026-03-31",
      "openingDate": "2026-03-01",
      "closingDate": "2026-03-31",
      "openingBalance": {
        "creditDebitIndicator": "Credit",
        "amount": "10000.00",
        "currency": "AED"
      },
      "closingBalance": {
        "creditDebitIndicator": "Credit",
        "amount": "12345.67",
        "currency": "AED"
      },
      "summary": [
        {
          "creditDebitIndicator": "Credit",
          "subTransactionType": "SalaryCredit",
          "amount": "18000.00",
          "count": 1
        },
        {
          "creditDebitIndicator": "Debit",
          "subTransactionType": "CardPurchase",
          "amount": "5234.33",
          "count": 42
        }
      ]
    }
  ],
  "meta": {
    "paginated": true,
    "totalPages": 3,
    "totalRecords": 24
  }
}
`

const beneficiariesJson = `{
  "data": [
    {
      "accountId": "acc-001",
      "beneficiaryId": "ben-00123",
      "beneficiaryType": "Trusted",
      "addedViaOF": false,
      "reference": "Rent March",
      "creditorAccount": {
        "schemeName": "IBAN",
        "identification": "AE220331234567890876543",
        "name": "Fatima Al Zaabi"
      },
      "servicer": {
        "schemeName": "BICFI",
        "identification": "BANKAEAAXXX"
      }
    }
  ],
  "meta": { "totalPages": 1, "totalRecords": 1 }
}
`

const directDebitsJson = `{
  "data": [
    {
      "accountId": "acc-001",
      "directDebitId": "dd-4471",
      "mandateIdentification": "MANDATE-4471",
      "directDebitStatusCode": "Active",
      "name": "DEWA",
      "frequency": "Monthly",
      "previousPaymentDateTime": "2026-03-15T00:00:00Z",
      "previousPaymentAmount": { "amount": "320.15", "currency": "AED" }
    }
  ],
  "meta": { "totalPages": 1, "totalRecords": 1 }
}
`

const scheduledPaymentsJson = `{
  "data": [
    {
      "accountId": "acc-001",
      "scheduledPaymentId": "sp-9981",
      "scheduledType": "Execution",
      "scheduledPaymentDateTime": "2026-04-20T09:00:00Z",
      "instructedAmount": { "amount": "1500.00", "currency": "AED" },
      "creditorAccount": {
        "schemeName": "IBAN",
        "identification": "AE220331234567890876543",
        "name": "Fatima Al Zaabi"
      },
      "creditorReference": "Rent April",
      "debtorReference": "Rent April"
    }
  ],
  "meta": { "totalPages": 1, "totalRecords": 1 }
}
`

const standingOrdersJson = `{
  "data": [
    {
      "accountId": "acc-001",
      "standingOrderId": "so-7712",
      "standingOrderStatusCode": "Active",
      "frequency": "EvryMnth",
      "firstPaymentDateTime": "2025-10-01T00:00:00Z",
      "firstPaymentAmount": { "amount": "2500.00", "currency": "AED" },
      "nextPaymentDateTime": "2026-05-01T00:00:00Z",
      "nextPaymentAmount": { "amount": "2500.00", "currency": "AED" },
      "creditorAccount": {
        "schemeName": "IBAN",
        "identification": "AE220331234567890876543",
        "name": "Fatima Al Zaabi"
      },
      "standingOrderType": "FixedAmount"
    }
  ],
  "meta": { "totalPages": 1, "totalRecords": 1 }
}
`

const productsJson = `{
  "data": [
    {
      "accountId": "acc-001",
      "productId": "prod-current-01",
      "productName": "Everyday Current Account",
      "productType": "CurrentAccount",
      "fees": [
        {
          "feeType": "MonthlyMaintenance",
          "amount": { "amount": "25.00", "currency": "AED" }
        }
      ],
      "benefits": [
        { "benefitType": "FreeATMWithdrawals", "description": "Unlimited free ATM withdrawals within the UAE" }
      ]
    }
  ],
  "meta": { "totalPages": 1, "totalRecords": 1 }
}
`

const customerRetailJson = `{
  "data": [
    {
      "id": "cust-001",
      "customerType": "Sole",
      "customerCategory": "Retail",
      "accountRole": "Principal",
      "verifiedClaims": [
        {
          "verification": { "trustFramework": "UAE.FI" },
          "claims": {
            "identityType": "Person",
            "fullName": "Ahmed Al Mansouri",
            "givenName": "Ahmed",
            "familyName": "Al Mansouri",
            "emiratesId": "784-1985-1234567-1",
            "emiratesIdExpiryDate": "2029-06-15",
            "birthDate": "1985-06-14",
            "nationality": "AE",
            "mobileNumber": "+971501234567",
            "email": "ahmed@example.ae",
            "residentialAddress": {
              "streetAddress": "Building 12, Marina Walk",
              "locality": "Dubai",
              "country": "AE"
            }
          }
        }
      ]
    }
  ],
  "meta": { "totalPages": 1, "totalRecords": 1 }
}
`

const customerCorporateJson = `{
  "data": [
    {
      "id": "cust-002",
      "customerType": "Sole",
      "customerCategory": "Corporate",
      "accountRole": "Principal",
      "verifiedClaims": [
        {
          "verification": { "trustFramework": "UAE.FI" },
          "claims": {
            "identityType": "Organisation",
            "businessName": "Al Mansouri Trading LLC",
            "tradeLicenceNumber": "DED-123456",
            "taxIdentificationNumber": "100123456700003",
            "dateOfIncorporation": "2015-02-10",
            "countryOfIncorporation": "AE",
            "corporateAddress": {
              "streetAddress": "Office 402, Business Bay Tower",
              "locality": "Dubai",
              "country": "AE"
            }
          }
        }
      ]
    }
  ],
  "meta": { "totalPages": 1, "totalRecords": 1 }
}
`

const customerPsuJson = `{
  "data": {
    "id": "cust-001",
    "customerCategory": "Retail",
    "verifiedClaims": [
      {
        "verification": { "trustFramework": "UAE.FI" },
        "claims": {
          "identityType": "Person",
          "fullName": "Ahmed Al Mansouri",
          "givenName": "Ahmed",
          "familyName": "Al Mansouri",
          "emiratesId": "784-1985-1234567-1",
          "emiratesIdExpiryDate": "2029-06-15",
          "residentialAddress": {
            "streetAddress": "Building 12, Marina Walk",
            "locality": "Dubai",
            "country": "AE"
          }
        }
      }
    ]
  },
  "meta": {}
}
`
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          LFI · Banking · Bank Data Sharing
        </div>
        <h1 class="ed-doc__title">
          Bank Data Sharing &mdash; API Guide
          <span class="ed-doc__read">12 min read</span>
        </h1>
        <p class="ed-doc__lede">
          Bank Data Sharing lets a TPP retrieve a customer's account list, account details, balances,
          transactions, statements, beneficiaries, direct debits, scheduled payments, standing orders,
          products, and customer details from your LFI via the API Hub. This guide covers the
          Ozone Connect endpoints your LFI MUST implement so the Hub can serve TPP requests.
        </p>
        <p class="ed-doc__lede">
          The behavioural rules for each endpoint &mdash; including account status handling, required
          field population, and <code>AccountSubType</code> coverage &mdash; are in the
          <a href="/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/requirements">Bank Data Sharing Requirements</a>. This guide covers the request
          and response shape of each endpoint.
        </p>
        <p class="ed-doc__lede">
          To see what the TPP receives for each field you return &mdash; and which consent
          permission exposes it &mdash; see the Field Mapping pages, one per endpoint, starting with
          <a href="/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/field-mapping/accounts"><code>GET /accounts</code></a>.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="prerequisites"
      num="01"
      color="var(--at-teal)"
      eyebrow="Prerequisites"
      title="What must be in place before you implement"
      tone="cream"
    >
      <EdProse>Before implementing Bank Data Sharing, ensure the following are in place:</EdProse>

      <EdBullets>
        <li>
          <strong>API Hub onboarded</strong> &mdash; Your API Hub instance is provisioned and your
          <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/environment-specific/">environment-specific configuration</a>
          is complete.
        </li>
        <li>
          <strong>Consent Journey implemented</strong> &mdash; The
          <a href="/tech/lfi-api-hub/v2.2-rc1/consent-journey/api-guide">Consent Journey API Guide</a>
          MUST be implemented first. A Bank Data Sharing request cannot be served without an
          authorized consent, so
          <span class="endpoint"><span class="http-method http-method--get">GET</span><code>/auth</code></span>,
          <span class="endpoint"><span class="http-method http-method--get">GET</span><code>/consents/{consentId}</code></span>,
          <span class="endpoint"><span class="http-method http-method--patch">PATCH</span><code>/consents/{consentId}</code></span>,
          <span class="endpoint"><span class="http-method http-method--post">POST</span><code>/auth/{interactionId}/doConfirm</code></span>,
          and
          <span class="endpoint"><span class="http-method http-method--post">POST</span><code>/auth/{interactionId}/doFail</code></span>
          must already be in place.
        </li>
        <li>
          <strong>Ozone Connect connectivity verified</strong> &mdash; Bidirectional mTLS connectivity
          is confirmed between the API Hub and your Ozone Connect base URL. See
          <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/connectivity/">Connectivity &amp; Certificates</a>.
        </li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="api-sequence-flow"
      num="02"
      color="var(--at-gold)"
      eyebrow="API Sequence Flow"
      title="End-to-end Bank Data Sharing"
      tone="surface"
    >
      <APIFlowViewer
        title="Bank Data Sharing API Flow"
        downloadUrl="/images/consent-flows/uae-data-sharing-sequence-diagram.png"
      >
        <APIFlowsBankDataSharing />
      </APIFlowViewer>
    </EdSectionBand>

    <EdSectionBand
      id="consent-validation"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Consent validation"
      title="Validate the consent before it is created"
      tone="cream"
    >
      <EdProse>
        During consent creation, if your LFI has configured the
        <a href="/tech/lfi-api-hub/v2.2-rc1/consent-events/open-api/validate" class="endpoint"><span class="http-method http-method--post">POST</span><code>/consent/action/validate</code></a>
        endpoint, the API Hub forwards the full consent payload to your Ozone Connect server
        <strong>before</strong> the consent is created. The request and response shape, and the
        overall placement of this call in the consent lifecycle, are covered in the
        <a href="/tech/lfi-api-hub/v2.2-rc1/consent-journey/api-guide#step-2-optional-validate-the-consent">Consent
        Journey API Guide &mdash; Validate the consent</a>.
      </EdProse>

      <EdProse>
        For Bank Data Sharing consents (<code>consentType: cbuae-account-access-consents</code>), your
        LFI MUST respond with <code>data.status: invalid</code> in the cases listed in
        <a href="/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/requirements#consent-validation">Bank Data Sharing Requirements &mdash; Consent
        Validation</a>.
      </EdProse>

      <EdNote type="info" title="Strongly recommended">
        <p>
          If the validate endpoint is not configured, the API Hub assumes all consents are valid and
          creates them immediately &mdash; those checks then cannot be enforced. Configuring the
          endpoint is strongly recommended for Bank Data Sharing.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="consent-flow"
      num="04"
      color="var(--at-navy)"
      eyebrow="Consent flow"
      title="Authorize the customer at your LFI"
      tone="surface"
    >
      <EdProse>
        Once the consent has been created, the TPP redirects the customer to your LFI's
        <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/environment-specific/auth-endpoint">authorization endpoint</a>
        &mdash; the URL you registered during API Hub onboarding. From there, your LFI runs the standard
        consent journey: authenticate the customer, retrieve the consent, let the customer approve or reject it,
        patch the authorized accounts and customer identifier onto the consent, and redirect back to the
        Hub.
      </EdProse>

      <EdProse>The endpoints your LFI implements against the API Hub for this flow are:</EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr><th>Endpoint</th><th>Direction</th><th>Purpose</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/headless-heimdall/open-api/auth" class="endpoint"><span class="http-method http-method--get">GET</span><code>/auth</code></a></td>
              <td>LFI &rarr; API Hub</td>
              <td>Initiate the authorization interaction</td>
            </tr>
            <tr>
              <td><a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/consents-consentId" class="endpoint"><span class="http-method http-method--get">GET</span><code>/consents/{consentId}</code></a></td>
              <td>LFI &rarr; API Hub</td>
              <td>Retrieve the full consent details</td>
            </tr>
            <tr>
              <td><a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/patch-consents-consentId" class="endpoint"><span class="http-method http-method--patch">PATCH</span><code>/consents/{consentId}</code></a></td>
              <td>LFI &rarr; API Hub</td>
              <td>Update consent status, customer identifiers, and account IDs</td>
            </tr>
            <tr>
              <td><a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/headless-heimdall/open-api/auth-interactionId-doConfirm" class="endpoint"><span class="http-method http-method--post">POST</span><code>/auth/{interactionId}/doConfirm</code></a></td>
              <td>LFI &rarr; API Hub</td>
              <td>Complete the interaction and redirect back to the TPP successfully</td>
            </tr>
            <tr>
              <td><a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/headless-heimdall/open-api/auth-interactionId-doFail" class="endpoint"><span class="http-method http-method--post">POST</span><code>/auth/{interactionId}/doFail</code></a></td>
              <td>LFI &rarr; API Hub</td>
              <td>Complete the interaction and redirect back to the TPP with a failure</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>
        Full details are in the
        <a href="/tech/lfi-api-hub/v2.2-rc1/consent-journey/api-guide">Consent Journey API Guide</a>.
      </EdProse>

      <h3 class="ed-doc__subhead">After the consent is authorized</h3>
      <EdProse>
        Every request the TPP makes to the API Hub's resource server &mdash; for example,
        <code>https://rs1.LFICODE.apihub.openfinance.ae/open-finance/account-information/v2.2/accounts</code>
        &mdash; MUST carry an access token bound to the authorized consent.
      </EdProse>

      <EdProse>The API Hub then performs the following checks before any traffic reaches your LFI:</EdProse>
      <EdBullets>
        <li>Validates the access token</li>
        <li>Validates that the consent is in <code>Authorised</code> status</li>
        <li>
          Validates that the consent grants access to the requested resource &mdash; e.g.
          <code>ReadAccountsBasic</code> or <code>ReadAccountsDetail</code> is required to call
          <span class="endpoint"><span class="http-method http-method--get">GET</span><code>/open-finance/account-information/v2.2/accounts</code></span>
        </li>
        <li>
          For endpoints scoped to a specific account, validates that the <code>{accountId}</code>
          path parameter is one of the accounts the LFI patched onto the consent at authorization.
          For <span class="endpoint"><span class="http-method http-method--get">GET</span><code>/accounts</code></span>, the same set is supplied to your Ozone Connect endpoint as the <code>accountIds</code> query parameter
        </li>
        <li>Validates that the TPP holds the role required to call the endpoint (e.g. <code>BDSP</code> for Bank Data Sharing)</li>
      </EdBullets>
      <EdProse>
        If all checks pass, the Hub proxies the request to your Ozone Connect base URL, enriching it
        with the headers listed in
        <a href="#common-request-headers">Common request headers</a>. The headers most relevant to your
        LFI are:
      </EdProse>
      <EdBullets>
        <li><code>o3-consent-id</code> &mdash; the authorized consent backing this call</li>
        <li><code>o3-psu-identifier</code> &mdash; the opaque reference your LFI patched onto the consent during the <a href="#consent-flow">Consent flow</a>, identifying the customer inside your systems</li>
        <li><code>o3-api-uri</code> &mdash; the parameterised URL the TPP called</li>
        <li><code>o3-ozone-interaction-id</code> &mdash; a per-request correlation ID for debugging</li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="conventions"
      num="05"
      color="var(--at-teal-deep)"
      eyebrow="Ozone Connect Data Sharing responses"
      title="Shared conventions across every endpoint"
      tone="cream"
    >
      <EdProse>
        The remainder of this guide covers the LFI-facing Ozone Connect endpoints that serve each TPP
        request after the consent is authorized &mdash; the shared conventions (field population,
        request headers, error responses, pagination) followed by the per-endpoint request and response
        shapes.
      </EdProse>

      <h3 class="ed-doc__subhead">Field population</h3>
      <EdProse>
        Every field that <strong>exists</strong> on the LFI's systems, or is <strong>derivable</strong>
        from them, MUST be populated in the response. TPPs rely on this data to serve customer use
        cases end-to-end &mdash; a field the LFI omits is a feature the TPP cannot build. The OpenAPI
        spec marks the minimum required set, but LFIs MUST populate every optional field they hold.
      </EdProse>
      <EdProse>
        This rule applies to every endpoint in this guide. The endpoint-specific rules in
        <a href="/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/requirements">Bank Data Sharing Requirements</a> call out fields that are always
        required for each endpoint.
      </EdProse>

      <h3 id="common-request-headers" class="ed-doc__subhead">Common request headers</h3>
      <EdProse>
        All resource endpoints receive the same set of headers from the API Hub. They are listed here
        and referenced from each endpoint section below.
      </EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr><th>Header</th><th>Required</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>o3-provider-id</code></td><td>Yes</td><td>Identifier for your LFI registered in the Hub</td></tr>
            <tr><td><code>o3-aspsp-id</code></td><td>Yes <em>(deprecated)</em></td><td>Deprecated alias for <code>o3-provider-id</code>. Will be removed in a future version &mdash; use <code>o3-provider-id</code></td></tr>
            <tr><td><code>o3-caller-org-id</code></td><td>Yes</td><td>Organisation ID of the TPP making the underlying request</td></tr>
            <tr><td><code>o3-caller-client-id</code></td><td>Yes</td><td>OIDC client ID of the TPP application</td></tr>
            <tr><td><code>o3-caller-software-statement-id</code></td><td>Yes</td><td>Software statement ID of the TPP application</td></tr>
            <tr><td><code>o3-api-uri</code></td><td>Yes</td><td>The parameterised URL of the API being called by the TPP</td></tr>
            <tr><td><code>o3-api-operation</code></td><td>Yes</td><td>The HTTP method of the operation carried out by the TPP (e.g. <code>GET</code>)</td></tr>
            <tr><td><code>o3-consent-id</code></td><td>Yes</td><td>The consent ID authorising this call</td></tr>
            <tr><td><code>o3-psu-identifier</code></td><td>Yes</td><td>Base64-encoded representation of the customer identifier JSON object &mdash; the opaque LFI-issued reference patched onto the consent at authorization, linking the consent to the authenticated customer</td></tr>
            <tr><td><code>o3-ozone-interaction-id</code></td><td>Yes</td><td>Hub-generated interaction ID. Equals <code>o3-caller-interaction-id</code> if the TPP provided one</td></tr>
            <tr><td><code>o3-caller-interaction-id</code></td><td>No</td><td>Interaction ID passed in by the TPP, if present</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>
        Token and consent validation have already been performed by the Hub before the request reaches
        your Ozone Connect endpoint. Your LFI does not re-validate the token or consent &mdash; it is
        trusted to be valid. See <a href="/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/requirements">Bank Data Sharing Requirements</a> for what
        your Ozone Connect endpoints must validate.
      </EdProse>

      <h3 id="common-error-responses" class="ed-doc__subhead">Common error responses</h3>
      <EdProse>
        Every <code>/accounts/{accountId}/&hellip;</code> endpoint MUST check the account's status
        before returning data &mdash; if the account is not <code>Active</code>, the endpoint MUST
        respond with <code>403</code> instead of returning the resource.
        <span class="endpoint"><span class="http-method http-method--get">GET</span><code>/accounts</code></span>
        is the only exception: it lists every consented account regardless of status, with the
        <code>Status</code> field populated so the TPP can observe the current state.
      </EdProse>
      <EdProse>All error bodies MUST include <code>errorCode</code> and <code>errorMessage</code>.</EdProse>

      <h4 class="ed-doc__subhead-minor"><code>403</code> &mdash; Forbidden</h4>
      <EdProse>
        Return <code>403</code> using the
        <a href="/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/requirements#account-status-handling">Account Status Handling</a> mapping:
      </EdProse>
      <EdRefTable>
        <table>
          <thead>
            <tr><th><code>errorCode</code></th><th><code>errorMessage</code></th><th>When to use</th></tr>
          </thead>
          <tbody>
            <tr><td><code>Consent.AccountTemporarilyBlocked</code></td><td><code>The account is temporarily blocked.</code></td><td>Account status is <code>Suspended</code></td></tr>
            <tr><td><code>Consent.PermanentAccountAccessFailure</code></td><td><code>The account is permanently inaccessible.</code></td><td>Account status is <code>Closed</code>, <code>Deceased</code>, or <code>Unclaimed</code></td></tr>
            <tr><td><code>GenericError</code></td><td><code>The account is inaccessible.</code></td><td><code>{accountId}</code> does not belong to the customer identified by <code>o3-psu-identifier</code></td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h4 class="ed-doc__subhead-minor"><code>400</code> &mdash; Bad Request</h4>
      <EdProse>
        Return <code>400</code> only for a request that is genuinely malformed &mdash; not for a
        well-formed request that simply matches no data. The API Hub enforces the OpenAPI schema
        before proxying, so most format errors are rejected upstream and rarely reach your Ozone
        Connect endpoints.
      </EdProse>
      <EdRefTable>
        <table>
          <thead>
            <tr><th><code>errorCode</code></th><th><code>errorMessage</code></th><th>When to use</th></tr>
          </thead>
          <tbody>
            <tr><td><code>Resource.InvalidFormat</code></td><td><code>A query parameter has an invalid format.</code></td><td>A date-range query parameter cannot be parsed, a contradictory range is supplied (<code>fromBookingDateTime</code> after <code>toBookingDateTime</code>), or <code>toBookingDateTime</code> is in the future. The API Hub enforces these checks before proxying, so an LFI does not normally return this itself</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3 id="pagination" class="ed-doc__subhead">Pagination</h3>
      <EdProse>
        <span class="endpoint"><span class="http-method http-method--get">GET</span><code>/accounts/{accountId}/transactions</code></span>
        and
        <span class="endpoint"><span class="http-method http-method--get">GET</span><code>/accounts/{accountId}/statements</code></span>
        MUST support pagination. Other list endpoints (<code>/beneficiaries</code>,
        <code>/direct-debits</code>, <code>/scheduled-payments</code>, <code>/standing-orders</code>,
        <code>/products</code>, <code>/accounts/{accountId}/customer</code>) MAY support pagination
        where result sets warrant it.
      </EdProse>
      <EdProse>
        The LFI implements page-based pagination (<code>page</code> / <code>page-size</code> query
        params, <code>meta.paginated</code> / <code>meta.totalPages</code> /
        <code>meta.totalRecords</code> in the response). The API Hub converts this into the
        <code>Links</code> envelope returned to the TPP.
      </EdProse>
      <EdProse>See <a href="/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/api-guide/pagination">Pagination</a> for the full behaviour.</EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="get-accounts"
      num="06"
      color="var(--at-teal)"
      eyebrow="Endpoint"
      title="GET /accounts"
      tone="surface"
    >
      <div class="ed-doc__endpoint">
        <span class="http-badge http-get">GET</span>
        <code class="ed-doc__endpoint-path">/accounts</code>
      </div>

      <EdProse>
        Backs the TPP request
        <code>GET https://rs1.LFICODE.apihub.openfinance.ae/open-finance/account-information/vx.y/accounts</code>.
      </EdProse>
      <EdProse>
        Returns the accounts matching the <code>accountIds</code> query parameter. Non-CAAP LFIs MUST
        treat <code>accountIds</code> as mandatory &mdash; it is always supplied by the Hub and contains
        the set of accounts the customer consented to share.
      </EdProse>

      <h3 class="ed-doc__subhead">Request headers</h3>
      <EdProse>See <a href="#common-request-headers">Common request headers</a>.</EdProse>

      <h3 class="ed-doc__subhead">Query parameters</h3>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Parameter</th><th>Required</th><th>Default</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>accountIds</code></td><td>Yes</td><td>&mdash;</td><td>Comma-separated list of account IDs to return. Populated by the Hub from the <code>accountIds</code> your LFI patched onto the consent during the <a href="#consent-flow">Consent flow</a></td></tr>
            <tr><td><code>page</code></td><td>Yes</td><td><code>1</code></td><td>Page number for paginated results</td></tr>
            <tr><td><code>page-size</code></td><td>Yes</td><td><code>100</code></td><td>Number of records per page</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3 class="ed-doc__subhead">Response</h3>
      <EdProse>
        <code>Content-Type: application/json</code>. Return <code>200</code> with a <code>data</code>
        array containing one record per consented account. See
        <a href="/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/requirements#get-accounts">GET /accounts rules</a> for field-level requirements.
      </EdProse>
      <EdCode :code="accountsListJson" lang="json" filename="GET /accounts response" />
      <EdProse>
        <span class="endpoint"><span class="http-method http-method--get">GET</span><code>/accounts</code></span>
        is exempt from the <a href="#common-error-responses">Common error responses</a> status mapping
        &mdash; return all consented accounts regardless of status.
      </EdProse>
      <EdProse>
        See the
        <a href="/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/open-api/accounts">GET <code>/accounts</code> API Reference</a>
        for the full schema.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="get-accounts-accountid"
      num="07"
      color="var(--at-gold)"
      eyebrow="Endpoint"
      title="GET /accounts/{accountId}"
      tone="cream"
    >
      <div class="ed-doc__endpoint">
        <span class="http-badge http-get">GET</span>
        <code class="ed-doc__endpoint-path">/accounts/{accountId}</code>
      </div>

      <EdProse>
        Backs the TPP request
        <code>GET https://rs1.LFICODE.apihub.openfinance.ae/open-finance/account-information/vx.y/accounts/{AccountId}</code>.
      </EdProse>
      <EdProse>
        Returns the full details of a single account. The response shape is the same
        <code>CbuaeAccount</code> returned inside the <code>data</code> array of
        <span class="endpoint"><span class="http-method http-method--get">GET</span><code>/accounts</code></span>,
        wrapped as a single object rather than an array. Data returned here MUST be consistent with
        what is returned by
        <span class="endpoint"><span class="http-method http-method--get">GET</span><code>/accounts</code></span>
        for the same account.
      </EdProse>

      <h3 class="ed-doc__subhead">Request headers</h3>
      <EdProse>See <a href="#common-request-headers">Common request headers</a>.</EdProse>

      <h3 class="ed-doc__subhead">Path parameters</h3>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Parameter</th><th>Required</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>accountId</code></td><td>Yes</td><td>The ID of the account to return. MUST be one of the accounts on the consent</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3 class="ed-doc__subhead">Response</h3>
      <EdProse><code>Content-Type: application/json</code></EdProse>
      <EdCode :code="accountByIdJson" lang="json" filename="GET /accounts/{accountId} response" />
      <EdProse>Errors: see <a href="#common-error-responses">Common error responses</a>.</EdProse>
      <EdProse>
        See the
        <a href="/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/open-api/accounts-AccountId">GET <code>/accounts/{accountId}</code> API Reference</a>
        for the full schema.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="get-accounts-balances"
      num="08"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Endpoint"
      title="GET /accounts/{accountId}/balances"
      tone="surface"
    >
      <div class="ed-doc__endpoint">
        <span class="http-badge http-get">GET</span>
        <code class="ed-doc__endpoint-path">/accounts/{accountId}/balances</code>
      </div>

      <EdProse>
        Backs the TPP request
        <code>GET https://rs1.LFICODE.apihub.openfinance.ae/open-finance/account-information/vx.y/accounts/{AccountId}/balances</code>.
      </EdProse>
      <EdProse>
        Returns the balances for a single account. An account may have more than one balance &mdash;
        return one record per distinct <code>balanceType</code> held. For <code>CurrentAccount</code>
        and <code>Savings</code> accounts, a record with <code>balanceType: InterimAvailable</code>
        MUST always be included &mdash; this is the real-time available balance. Include
        <code>creditLines</code> where applicable.
      </EdProse>

      <h3 class="ed-doc__subhead">Request headers</h3>
      <EdProse>See <a href="#common-request-headers">Common request headers</a>.</EdProse>

      <h3 class="ed-doc__subhead">Path parameters</h3>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Parameter</th><th>Required</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>accountId</code></td><td>Yes</td><td>The ID of the account whose balances are being returned</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3 class="ed-doc__subhead">Query parameters</h3>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Parameter</th><th>Required</th><th>Default</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>page</code></td><td>Yes</td><td><code>1</code></td><td>Page number</td></tr>
            <tr><td><code>page-size</code></td><td>Yes</td><td><code>100</code></td><td>Records per page</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3 class="ed-doc__subhead">Response</h3>
      <EdProse><code>Content-Type: application/json</code></EdProse>
      <EdCode :code="balancesJson" lang="json" filename="GET /accounts/{accountId}/balances response" />
      <EdProse>
        The full set of allowable <code>balanceType</code> values (<code>ClosingAvailable</code>,
        <code>ClosingBooked</code>, <code>ClosingCleared</code>, <code>Expected</code>,
        <code>ForwardAvailable</code>, <code>Information</code>, <code>InterimAvailable</code>,
        <code>InterimBooked</code>, <code>InterimCleared</code>, <code>OpeningAvailable</code>,
        <code>OpeningBooked</code>, <code>OpeningCleared</code>, <code>PreviouslyClosedBooked</code>)
        is defined in the OpenAPI spec.
      </EdProse>
      <EdProse>Errors: see <a href="#common-error-responses">Common error responses</a>.</EdProse>
      <EdProse>
        See the
        <a href="/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/open-api/accounts-AccountId-balances">GET <code>/accounts/{accountId}/balances</code> API Reference</a>
        for the full schema.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="get-accounts-transactions"
      num="09"
      color="var(--at-navy)"
      eyebrow="Endpoint"
      title="GET /accounts/{accountId}/transactions"
      tone="cream"
    >
      <div class="ed-doc__endpoint">
        <span class="http-badge http-get">GET</span>
        <code class="ed-doc__endpoint-path">/accounts/{accountId}/transactions</code>
      </div>

      <EdProse>
        Backs the TPP request
        <code>GET https://rs1.LFICODE.apihub.openfinance.ae/open-finance/account-information/vx.y/accounts/{AccountId}/transactions</code>.
      </EdProse>
      <EdProse>
        Returns the transactions for a single account, filtered by booking date-time where provided.
        Pagination is <strong>required</strong> for this endpoint &mdash; see
        <a href="/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/api-guide/pagination">Pagination</a>.
      </EdProse>

      <h3 class="ed-doc__subhead">Request headers</h3>
      <EdProse>See <a href="#common-request-headers">Common request headers</a>. In addition:</EdProse>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Header</th><th>Required</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>o3-fx-transactions</code></td><td>No</td><td>If <code>true</code>, return only FX-related transactions, based on permissions set in the related consent</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3 class="ed-doc__subhead">Path parameters</h3>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Parameter</th><th>Required</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>accountId</code></td><td>Yes</td><td>The ID of the account whose transactions are being returned</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3 class="ed-doc__subhead">Query parameters</h3>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Parameter</th><th>Required</th><th>Default</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>fromBookingDateTime</code></td><td>No</td><td>&mdash;</td><td>Return only transactions booked on or after this date-time. Open-ended if omitted. Any timezone offset MUST be ignored</td></tr>
            <tr><td><code>toBookingDateTime</code></td><td>No</td><td>&mdash;</td><td>Return only transactions booked on or before this date-time. Open-ended if omitted. Any timezone offset MUST be ignored</td></tr>
            <tr><td><code>page</code></td><td>Yes</td><td><code>1</code></td><td>Page number</td></tr>
            <tr><td><code>page-size</code></td><td>Yes</td><td><code>100</code></td><td>Records per page</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3 class="ed-doc__subhead">Response</h3>
      <EdProse><code>Content-Type: application/json</code></EdProse>
      <EdProse>
        At least two years of transactions MUST be available for retrieval. If no transactions exist
        within the requested range, return <code>200</code> with an empty <code>data</code> array
        &mdash; do not return <code>404</code>.
      </EdProse>
      <EdProse>
        The two-year rule is a <strong>minimum availability guarantee, not a query limit</strong>. An
        LFI MUST NOT reject a request solely because <code>fromBookingDateTime</code> or
        <code>toBookingDateTime</code> extends beyond two years into the past, or because the range
        matches no transactions &mdash; return <code>200</code> with the matching subset, empty where
        there is none. An LFI MAY return transactions older than two years where it holds them. The
        API Hub rejects malformed date-range requests before proxying &mdash; an unparseable
        date-time, a contradictory range (<code>fromBookingDateTime</code> after
        <code>toBookingDateTime</code>), or a <code>toBookingDateTime</code> in the future &mdash; with
        <code>400</code>, so the LFI receives only well-formed ranges. See
        <a href="#common-error-responses">Common error responses</a>.
      </EdProse>
      <EdCode :code="transactionsJson" lang="json" filename="GET /accounts/{accountId}/transactions response" />
      <EdProse>Errors: see <a href="#common-error-responses">Common error responses</a>.</EdProse>
      <EdProse>
        See the
        <a href="/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/open-api/accounts-AccountId-transactions">GET <code>/accounts/{accountId}/transactions</code> API Reference</a>
        for the full schema.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="get-accounts-statements"
      num="10"
      color="var(--at-teal-deep)"
      eyebrow="Endpoint"
      title="GET /accounts/{accountId}/statements"
      tone="surface"
    >
      <div class="ed-doc__endpoint">
        <span class="http-badge http-get">GET</span>
        <code class="ed-doc__endpoint-path">/accounts/{accountId}/statements</code>
      </div>

      <EdProse>
        Backs the TPP request
        <code>GET https://rs1.LFICODE.apihub.openfinance.ae/open-finance/account-information/vx.y/accounts/{AccountId}/statements</code>.
      </EdProse>
      <EdProse>
        Returns the statements for a single account, filtered by statement date where provided.
        Pagination is <strong>required</strong> for this endpoint &mdash; see
        <a href="/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/api-guide/pagination">Pagination</a>.
      </EdProse>

      <h3 class="ed-doc__subhead">Request headers</h3>
      <EdProse>See <a href="#common-request-headers">Common request headers</a>.</EdProse>

      <h3 class="ed-doc__subhead">Path parameters</h3>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Parameter</th><th>Required</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>accountId</code></td><td>Yes</td><td>The ID of the account whose statements are being returned</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3 class="ed-doc__subhead">Query parameters</h3>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Parameter</th><th>Required</th><th>Default</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>fromStatementDate</code></td><td>No</td><td>&mdash;</td><td>Return only statements with a statement date on or after this date. Open-ended if omitted</td></tr>
            <tr><td><code>toStatementDate</code></td><td>No</td><td>&mdash;</td><td>Return only statements with a statement date on or before this date. Open-ended if omitted</td></tr>
            <tr><td><code>page</code></td><td>Yes</td><td><code>1</code></td><td>Page number</td></tr>
            <tr><td><code>page-size</code></td><td>Yes</td><td><code>100</code></td><td>Records per page</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3 class="ed-doc__subhead">Response</h3>
      <EdProse><code>Content-Type: application/json</code></EdProse>
      <EdProse>
        At least two years of statements MUST be available for retrieval. If no statements exist in
        the requested range, return <code>200</code> with an empty <code>data</code> array.
      </EdProse>
      <EdProse>
        As with transactions, the two-year rule is a <strong>minimum availability guarantee, not a
        query limit</strong>. An LFI MUST NOT reject a request solely because
        <code>fromStatementDate</code> or <code>toStatementDate</code> extends beyond two years into
        the past, or because the range matches no statements &mdash; return <code>200</code> with the
        matching subset, empty where there is none. An LFI MAY return statements older than two years
        where it holds them. The API Hub rejects malformed date-range requests before proxying &mdash;
        an unparseable date, a contradictory range (<code>fromStatementDate</code> after
        <code>toStatementDate</code>), or a <code>toStatementDate</code> in the future &mdash; with
        <code>400</code>, so the LFI receives only well-formed ranges. See
        <a href="#common-error-responses">Common error responses</a>.
      </EdProse>
      <EdCode :code="statementsJson" lang="json" filename="GET /accounts/{accountId}/statements response" />
      <EdProse>Errors: see <a href="#common-error-responses">Common error responses</a>.</EdProse>
      <EdProse>
        See the
        <a href="/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/open-api/accounts-AccountId-statements">GET <code>/accounts/{accountId}/statements</code> API Reference</a>
        for the full schema.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="get-accounts-beneficiaries"
      num="11"
      color="var(--at-teal)"
      eyebrow="Endpoint"
      title="GET /accounts/{accountId}/beneficiaries"
      tone="cream"
    >
      <div class="ed-doc__endpoint">
        <span class="http-badge http-get">GET</span>
        <code class="ed-doc__endpoint-path">/accounts/{accountId}/beneficiaries</code>
      </div>

      <EdProse>
        Backs the TPP request
        <code>GET https://rs1.LFICODE.apihub.openfinance.ae/open-finance/account-information/vx.y/accounts/{AccountId}/beneficiaries</code>.
      </EdProse>
      <EdProse>
        Returns the beneficiaries linked to the account. Only supported for <code>CurrentAccount</code>
        and <code>Savings</code> &mdash; not available for <code>CreditCard</code>,
        <code>Finance</code>, or <code>Mortgage</code> accounts.
      </EdProse>

      <h3 class="ed-doc__subhead">Request headers</h3>
      <EdProse>See <a href="#common-request-headers">Common request headers</a>.</EdProse>

      <h3 class="ed-doc__subhead">Path parameters</h3>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Parameter</th><th>Required</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>accountId</code></td><td>Yes</td><td>The ID of the account whose beneficiaries are being returned</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3 class="ed-doc__subhead">Query parameters</h3>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Parameter</th><th>Required</th><th>Default</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>page</code></td><td>Yes</td><td><code>1</code></td><td>Page number</td></tr>
            <tr><td><code>page-size</code></td><td>Yes</td><td><code>100</code></td><td>Records per page</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3 class="ed-doc__subhead">Response</h3>
      <EdProse><code>Content-Type: application/json</code></EdProse>
      <EdProse>
        If the account holds no beneficiaries, return <code>200</code> with an empty <code>data</code>
        array &mdash; do not return <code>404</code>.
      </EdProse>
      <EdCode :code="beneficiariesJson" lang="json" filename="GET /accounts/{accountId}/beneficiaries response" />
      <EdProse>Errors: see <a href="#common-error-responses">Common error responses</a>.</EdProse>
      <EdProse>
        See the
        <a href="/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/open-api/accounts-AccountId-beneficiaries">GET <code>/accounts/{accountId}/beneficiaries</code> API Reference</a>
        for the full schema.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="get-accounts-direct-debits"
      num="12"
      color="var(--at-gold)"
      eyebrow="Endpoint"
      title="GET /accounts/{accountId}/direct-debits"
      tone="surface"
    >
      <div class="ed-doc__endpoint">
        <span class="http-badge http-get">GET</span>
        <code class="ed-doc__endpoint-path">/accounts/{accountId}/direct-debits</code>
      </div>

      <EdProse>
        Backs the TPP request
        <code>GET https://rs1.LFICODE.apihub.openfinance.ae/open-finance/account-information/vx.y/accounts/{AccountId}/direct-debits</code>.
      </EdProse>
      <EdProse>
        Returns the direct debits linked to the account. Only supported for <code>CurrentAccount</code>
        and <code>Savings</code>.
      </EdProse>

      <h3 class="ed-doc__subhead">Request headers</h3>
      <EdProse>See <a href="#common-request-headers">Common request headers</a>.</EdProse>

      <h3 class="ed-doc__subhead">Path parameters</h3>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Parameter</th><th>Required</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>accountId</code></td><td>Yes</td><td>The ID of the account whose direct debits are being returned</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3 class="ed-doc__subhead">Query parameters</h3>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Parameter</th><th>Required</th><th>Default</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>page</code></td><td>Yes</td><td><code>1</code></td><td>Page number</td></tr>
            <tr><td><code>page-size</code></td><td>Yes</td><td><code>100</code></td><td>Records per page</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3 class="ed-doc__subhead">Response</h3>
      <EdProse><code>Content-Type: application/json</code></EdProse>
      <EdProse>
        If the account holds no direct debits, return <code>200</code> with an empty
        <code>data</code> array.
      </EdProse>
      <EdCode :code="directDebitsJson" lang="json" filename="GET /accounts/{accountId}/direct-debits response" />
      <EdProse>Errors: see <a href="#common-error-responses">Common error responses</a>.</EdProse>
      <EdProse>
        See the
        <a href="/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/open-api/accounts-AccountId-direct-debits">GET <code>/accounts/{accountId}/direct-debits</code> API Reference</a>
        for the full schema.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="get-accounts-scheduled-payments"
      num="13"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Endpoint"
      title="GET /accounts/{accountId}/scheduled-payments"
      tone="cream"
    >
      <div class="ed-doc__endpoint">
        <span class="http-badge http-get">GET</span>
        <code class="ed-doc__endpoint-path">/accounts/{accountId}/scheduled-payments</code>
      </div>

      <EdProse>
        Backs the TPP request
        <code>GET https://rs1.LFICODE.apihub.openfinance.ae/open-finance/account-information/vx.y/accounts/{AccountId}/scheduled-payments</code>.
      </EdProse>
      <EdProse>
        Returns one-off scheduled payments linked to the account. Only supported for
        <code>CurrentAccount</code> and <code>Savings</code>.
      </EdProse>

      <h3 class="ed-doc__subhead">Request headers</h3>
      <EdProse>See <a href="#common-request-headers">Common request headers</a>.</EdProse>

      <h3 class="ed-doc__subhead">Path parameters</h3>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Parameter</th><th>Required</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>accountId</code></td><td>Yes</td><td>The ID of the account whose scheduled payments are being returned</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3 class="ed-doc__subhead">Query parameters</h3>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Parameter</th><th>Required</th><th>Default</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>page</code></td><td>Yes</td><td><code>1</code></td><td>Page number</td></tr>
            <tr><td><code>page-size</code></td><td>Yes</td><td><code>100</code></td><td>Records per page</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3 class="ed-doc__subhead">Response</h3>
      <EdProse><code>Content-Type: application/json</code></EdProse>
      <EdCode :code="scheduledPaymentsJson" lang="json" filename="GET /accounts/{accountId}/scheduled-payments response" />
      <EdProse>Errors: see <a href="#common-error-responses">Common error responses</a>.</EdProse>
      <EdProse>
        See the
        <a href="/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/open-api/accounts-AccountId-scheduled-payments">GET <code>/accounts/{accountId}/scheduled-payments</code> API Reference</a>
        for the full schema.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="get-accounts-standing-orders"
      num="14"
      color="var(--at-navy)"
      eyebrow="Endpoint"
      title="GET /accounts/{accountId}/standing-orders"
      tone="surface"
    >
      <div class="ed-doc__endpoint">
        <span class="http-badge http-get">GET</span>
        <code class="ed-doc__endpoint-path">/accounts/{accountId}/standing-orders</code>
      </div>

      <EdProse>
        Backs the TPP request
        <code>GET https://rs1.LFICODE.apihub.openfinance.ae/open-finance/account-information/vx.y/accounts/{AccountId}/standing-orders</code>.
      </EdProse>
      <EdProse>
        Returns standing orders linked to the account. Only supported for <code>CurrentAccount</code>
        and <code>Savings</code>.
      </EdProse>

      <h3 class="ed-doc__subhead">Request headers</h3>
      <EdProse>See <a href="#common-request-headers">Common request headers</a>.</EdProse>

      <h3 class="ed-doc__subhead">Path parameters</h3>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Parameter</th><th>Required</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>accountId</code></td><td>Yes</td><td>The ID of the account whose standing orders are being returned</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3 class="ed-doc__subhead">Query parameters</h3>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Parameter</th><th>Required</th><th>Default</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>page</code></td><td>Yes</td><td><code>1</code></td><td>Page number</td></tr>
            <tr><td><code>page-size</code></td><td>Yes</td><td><code>100</code></td><td>Records per page</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3 class="ed-doc__subhead">Response</h3>
      <EdProse><code>Content-Type: application/json</code></EdProse>
      <EdCode :code="standingOrdersJson" lang="json" filename="GET /accounts/{accountId}/standing-orders response" />
      <EdProse>Errors: see <a href="#common-error-responses">Common error responses</a>.</EdProse>
      <EdProse>
        See the
        <a href="/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/open-api/accounts-AccountId-standing-orders">GET <code>/accounts/{accountId}/standing-orders</code> API Reference</a>
        for the full schema.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="get-accounts-products"
      num="15"
      color="var(--at-teal-deep)"
      eyebrow="Endpoint"
      title="GET /accounts/{accountId}/products"
      tone="cream"
    >
      <div class="ed-doc__endpoint">
        <span class="http-badge http-get">GET</span>
        <code class="ed-doc__endpoint-path">/accounts/{accountId}/products</code>
      </div>

      <EdProse>
        Backs the TPP request
        <code>GET https://rs1.LFICODE.apihub.openfinance.ae/open-finance/account-information/vx.y/accounts/{AccountId}/product</code>
        (singular on the TPP side).
      </EdProse>
      <EdProse>
        Returns the product data associated with the account &mdash; fees, charges, rates, rewards,
        benefits, and eligibility criteria. <code>FinanceRates</code> may be returned as cleartext
        JSON or as a JWE compact string &mdash; see <a href="/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/api-guide/finance-rates">Encrypted FinanceRates</a>.
      </EdProse>

      <h3 class="ed-doc__subhead">Request headers</h3>
      <EdProse>See <a href="#common-request-headers">Common request headers</a>.</EdProse>

      <h3 class="ed-doc__subhead">Path parameters</h3>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Parameter</th><th>Required</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>accountId</code></td><td>Yes</td><td>The ID of the account whose product data is being returned</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3 class="ed-doc__subhead">Query parameters</h3>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Parameter</th><th>Required</th><th>Default</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>page</code></td><td>Yes</td><td><code>1</code></td><td>Page number</td></tr>
            <tr><td><code>page-size</code></td><td>Yes</td><td><code>100</code></td><td>Records per page</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3 class="ed-doc__subhead">Response</h3>
      <EdProse><code>Content-Type: application/json</code></EdProse>
      <EdProse>
        If no product data exists for the account, return <code>200</code> with an empty
        <code>data</code> array.
      </EdProse>
      <EdCode :code="productsJson" lang="json" filename="GET /accounts/{accountId}/products response" />
      <EdProse>Errors: see <a href="#common-error-responses">Common error responses</a>.</EdProse>
      <EdProse>
        See the
        <a href="/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/open-api/accounts-AccountId-products">GET <code>/accounts/{accountId}/products</code> API Reference</a>
        for the full schema.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="get-accounts-customer"
      num="16"
      color="var(--at-teal)"
      eyebrow="Endpoint"
      title="GET /accounts/{accountId}/customer"
      tone="surface"
    >
      <div class="ed-doc__endpoint">
        <span class="http-badge http-get">GET</span>
        <code class="ed-doc__endpoint-path">/accounts/{accountId}/customer</code>
      </div>

      <EdProse>
        Backs the TPP request
        <code>GET https://rs1.LFICODE.apihub.openfinance.ae/open-finance/account-information/vx.y/accounts/{AccountId}/parties</code>
        &mdash; "parties" on the TPP side, "customer" on Ozone Connect.
      </EdProse>
      <EdProse>
        Returns the customer records associated with a specific account. Joint accounts return one
        record per joint holder.
      </EdProse>
      <EdProse>
        The response is based on
        <a href="https://openid.net/specs/openid-connect-4-identity-assurance-1_0.html">OpenID Connect for Identity Assurance 1.0</a>
        &mdash; claims are carried inside a <code>verifiedClaims</code> envelope. See
        <a href="/knowledge-base/articles/identity-assurance-claims">Identity Assurance Claims</a>.
      </EdProse>

      <h3 class="ed-doc__subhead">Request headers</h3>
      <EdProse>See <a href="#common-request-headers">Common request headers</a>.</EdProse>

      <h3 class="ed-doc__subhead">Path parameters</h3>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Parameter</th><th>Required</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>accountId</code></td><td>Yes</td><td>The ID of the account whose customers are being returned</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3 class="ed-doc__subhead">Response</h3>
      <EdProse><code>Content-Type: application/json</code></EdProse>

      <h4 class="ed-doc__subhead-minor"><code>200</code> &mdash; Retail (personal) account</h4>
      <EdCode :code="customerRetailJson" lang="json" filename="GET /accounts/{accountId}/customer — retail" />

      <h4 class="ed-doc__subhead-minor"><code>200</code> &mdash; SME / Corporate account</h4>
      <EdCode :code="customerCorporateJson" lang="json" filename="GET /accounts/{accountId}/customer — corporate" />

      <EdProse>Errors: see <a href="#common-error-responses">Common error responses</a>.</EdProse>
      <EdProse>
        See the
        <a href="/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/open-api/accounts-AccountId-customer">GET <code>/accounts/{accountId}/customer</code> API Reference</a>
        for the full schema.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="get-customer"
      num="17"
      color="var(--at-gold)"
      eyebrow="Endpoint"
      title="GET /customer"
      tone="cream"
    >
      <div class="ed-doc__endpoint">
        <span class="http-badge http-get">GET</span>
        <code class="ed-doc__endpoint-path">/customer</code>
      </div>

      <EdProse>
        Backs the TPP request
        <code>GET https://rs1.LFICODE.apihub.openfinance.ae/open-finance/account-information/vx.y/parties</code>
        &mdash; "parties" on the TPP side, "customer" on Ozone Connect.
      </EdProse>
      <EdProse>
        Returns the customer record for the authenticated customer. Unlike
        <code>/accounts/{accountId}/customer</code>, this endpoint is not scoped to a specific account.
      </EdProse>

      <EdNote type="warning" title="Resolve from o3-psu-identifier, not the consent">
        <p>
          The response MUST be derived from the <code>o3-psu-identifier</code> header &mdash; not from
          any account on the consent. At authorization, the LFI patched an opaque customer identifier onto
          the consent, linking the consent to the authenticated user inside the LFI's own systems. The
          Hub forwards that identifier here. Your LFI resolves it back to the customer and returns that
          customer's claims.
        </p>
        <p>
          <code>o3-consent-id</code> is still supplied so the LFI can attribute the call for logging,
          but it MUST NOT be used to select which customer to return &mdash; the customer who authenticated
          the consent is the only subject of this response.
        </p>
      </EdNote>

      <EdProse>
        The response is based on
        <a href="https://openid.net/specs/openid-connect-4-identity-assurance-1_0.html">OpenID Connect for Identity Assurance 1.0</a>.
        See <a href="/knowledge-base/articles/identity-assurance-claims">Identity Assurance Claims</a>.
      </EdProse>

      <h3 class="ed-doc__subhead">Request headers</h3>
      <EdProse>
        See <a href="#common-request-headers">Common request headers</a>.
        <code>o3-psu-identifier</code> is the operative header for this endpoint.
      </EdProse>

      <h3 class="ed-doc__subhead">Response</h3>
      <EdProse><code>Content-Type: application/json</code></EdProse>
      <EdCode :code="customerPsuJson" lang="json" filename="GET /customer response" />
      <EdProse>
        See the
        <a href="/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/open-api/customer">GET <code>/customer</code> API Reference</a>
        for the full schema.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="customer-data-responses"
      num="18"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Customer data responses"
      title="OpenID Connect Identity Assurance envelope"
      tone="surface"
    >
      <EdProse>
        The response format for
        <span class="endpoint"><span class="http-method http-method--get">GET</span><code>/customer</code></span>
        and
        <span class="endpoint"><span class="http-method http-method--get">GET</span><code>/accounts/{accountId}/customer</code></span>
        (and the CoP query response) is based on the
        <a href="https://openid.net/specs/openid-connect-4-identity-assurance-1_0.html">OpenID Connect
        for Identity Assurance 1.0 Specification</a> &mdash; claims about a customer are carried inside
        a <code>verifiedClaims</code> envelope with a <code>verification.trustFramework</code>
        indicating the framework under which the claims were verified.
      </EdProse>
      <EdProse>
        See <a href="/knowledge-base/articles/identity-assurance-claims">Identity Assurance Claims</a>
        for the shared envelope and how it maps to each endpoint.
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
  color: var(--at-teal-deep);
  text-decoration: none;
  border-bottom: 1px solid currentColor;
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
.ed-doc__subhead :deep(code) {
  font-family: var(--at-mono);
  font-size: 0.8em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  padding: 0.08em 0.4em;
}

.ed-doc__subhead-minor {
  font-family: var(--at-sans);
  font-size: 1rem;
  font-weight: 600;
  color: var(--at-navy-deep);
  margin: 1.25rem 0 0.65rem;
}
.ed-doc__subhead-minor :deep(code) {
  font-family: var(--at-mono);
  font-size: 0.85em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  padding: 0.08em 0.4em;
}

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
}
</style>
