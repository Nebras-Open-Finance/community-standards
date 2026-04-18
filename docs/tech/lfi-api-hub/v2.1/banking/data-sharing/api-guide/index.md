---
next: false
prev: false
aside: false
---

🕒 **15 minute read**

# Bank Data Sharing - API Guide

Bank Data Sharing lets a TPP retrieve a customer's account list, account details, balances, transactions, statements, beneficiaries, direct debits, scheduled payments, standing orders, products, and customer details from your LFI via the API Hub. This guide covers the Ozone Connect endpoints your LFI MUST implement so the Hub can serve TPP requests.

The behavioural rules for each endpoint — including account status handling, required field population, and `AccountSubType` coverage — are in the [Bank Data Sharing Requirements](../requirements). This guide covers the request and response shape of each endpoint.

## Prerequisites

Before implementing Bank Data Sharing, ensure the following are in place:

1. **API Hub onboarded** — Your API Hub instance is provisioned and your [environment-specific configuration](/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/) is complete
2. **Consent Journey implemented** — The [Consent Journey API Guide](/tech/lfi-api-hub/v2.1/consent-journey/api-guide) MUST be implemented first. A Bank Data Sharing request cannot be served without an authorized consent, so `GET /auth`, `GET /consents/{consentId}`, `PATCH /consents/{consentId}`, `POST /auth/{interactionId}/doConfirm`, and `POST /auth/{interactionId}/doFail` must already be in place
3. **Ozone Connect connectivity verified** — Bidirectional mTLS connectivity is confirmed between the API Hub and your Ozone Connect base URL. See [Connectivity & Certificates](/tech/lfi-api-hub/v2.1/api-hub/connectivity/)

## API Sequence Flow

<APIFlowViewer title="Bank Data Sharing API Flow"
downloadUrl="/images/consent-flows/uae-data-sharing-sequence-diagram.png">
  <APIFlowsBankDataSharing/>
</APIFlowViewer>

## Consent Validation

During consent creation, if your LFI has configured the [`POST /consent/action/validate`](/tech/lfi-api-hub/v2.1/consent-events/open-api/validate) endpoint, the API Hub forwards the full consent payload to your Ozone Connect server **before** the consent is created. The request and response shape, and the overall placement of this call in the consent lifecycle, are covered in the [Consent Journey API Guide — Validate the consent](/tech/lfi-api-hub/v2.1/consent-journey/api-guide#step-2-optional-validate-the-consent).

For Bank Data Sharing consents (`consentType: cbuae-account-access-consents`), your LFI MUST respond with `data.status: invalid` in the cases listed in [Bank Data Sharing Requirements — Consent Validation](../requirements#consent-validation).

If the validate endpoint is not configured, the API Hub assumes all consents are valid and creates them immediately — those checks then cannot be enforced. Configuring the endpoint is strongly recommended for Bank Data Sharing.

## Consent Flow

Once the consent has been created, the TPP redirects the PSU to your LFI's [authorization endpoint](/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/auth-endpoint) — the URL you registered during API Hub onboarding. From there, your LFI runs the standard consent journey: authenticate the PSU, retrieve the consent, let the PSU approve or reject it, patch the authorized accounts and PSU identifier onto the consent, and redirect back to the Hub.

The endpoints your LFI implements against the API Hub for this flow are:

| Endpoint | Direction | Purpose |
|----------|-----------|---------|
| [`GET /auth`](/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/open-api/auth) | LFI → API Hub | Initiate the authorization interaction |
| [`GET /consents/{consentId}`](/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consents-consentId) | LFI → API Hub | Retrieve the full consent details |
| [`PATCH /consents/{consentId}`](/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/patch-consents-consentId) | LFI → API Hub | Update consent status, PSU identifiers, and account IDs |
| [`POST /auth/{interactionId}/doConfirm`](/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/open-api/auth-interactionId-doConfirm) | LFI → API Hub | Complete the interaction and redirect back to the TPP successfully |
| [`POST /auth/{interactionId}/doFail`](/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/open-api/auth-interactionId-doFail) | LFI → API Hub | Complete the interaction and redirect back to the TPP with a failure |

Full details are in the [Consent Journey API Guide](/tech/lfi-api-hub/v2.1/consent-journey/api-guide).

### After the consent is authorized

Every request the TPP makes to the API Hub's resource server — for example, `https://rs1.LFICODE.apihub.openfinance.ae/open-finance/account-information/v2.1/accounts` — MUST carry an access token bound to the authorized consent.

The API Hub then performs the following checks before any traffic reaches your LFI:

- Validates the access token
- Validates that the consent is in `Authorised` status
- Validates that the consent grants access to the requested resource — e.g. `ReadAccountsBasic` or `ReadAccountsDetail` is required to call `GET /open-finance/account-information/v2.1/accounts`
- Validates that the TPP holds the role required to call the endpoint (e.g. `AISP` for Bank Data Sharing)

If all checks pass, the Hub proxies the request to your Ozone Connect base URL, enriching it with the headers listed in [Common request headers](#common-request-headers). The headers most relevant to your LFI are:

- `o3-consent-id` — the authorized consent backing this call
- `o3-psu-identifier` — the opaque reference your LFI patched onto the consent during the [Consent Flow](#consent-flow), identifying the PSU inside your systems
- `o3-api-uri` — the parameterised URL the TPP called
- `o3-ozone-interaction-id` — a per-request correlation ID for debugging

## Ozone Connect Data Sharing responses

The remainder of this guide covers the LFI-facing Ozone Connect endpoints that serve each TPP request after the consent is authorized — the shared conventions (field population, request headers, error responses, pagination) followed by the per-endpoint request and response shapes.

### Field population

Every field that **exists** on the LFI's systems, or is **derivable** from them, MUST be populated in the response. TPPs rely on this data to serve customer use cases end-to-end — a field the LFI omits is a feature the TPP cannot build. The OpenAPI spec marks the minimum required set, but LFIs MUST populate every optional field they hold.

This rule applies to every endpoint in this guide. The endpoint-specific rules in [Bank Data Sharing Requirements](../requirements) call out fields that are always required for each endpoint.

### Common request headers

All resource endpoints receive the same set of headers from the API Hub. They are listed here and referenced from each endpoint section below.

| Header | Required | Description |
|--------|----------|-------------|
| `o3-provider-id` | Yes | Identifier for your LFI registered in the Hub |
| `o3-aspsp-id` | Yes *(deprecated)* | Deprecated alias for `o3-provider-id`. Will be removed in a future version — use `o3-provider-id` |
| `o3-caller-org-id` | Yes | Organisation ID of the TPP making the underlying request |
| `o3-caller-client-id` | Yes | OIDC client ID of the TPP application |
| `o3-caller-software-statement-id` | Yes | Software statement ID of the TPP application |
| `o3-api-uri` | Yes | The parameterised URL of the API being called by the TPP |
| `o3-api-operation` | Yes | The HTTP method of the operation carried out by the TPP (e.g. `GET`) |
| `o3-consent-id` | Yes | The consent ID authorising this call |
| `o3-psu-identifier` | Yes | Base64-encoded representation of the PSU identifier JSON object — the opaque LFI-issued reference patched onto the consent at authorization, linking the consent to the authenticated PSU |
| `o3-ozone-interaction-id` | Yes | Hub-generated interaction ID. Equals `o3-caller-interaction-id` if the TPP provided one |
| `o3-caller-interaction-id` | No | Interaction ID passed in by the TPP, if present |

Token and consent validation have already been performed by the Hub before the request reaches your Ozone Connect endpoint. Your LFI does not re-validate the token or consent — it is trusted to be valid. See [Bank Data Sharing Requirements](../requirements) for what your Ozone Connect endpoints must validate.

### Common error responses

Every `/accounts/{accountId}/…` endpoint MUST check the account's status before returning data — if the account is not `Active`, the endpoint MUST respond with `403` instead of returning the resource. `GET /accounts` is the only exception: it lists every consented account regardless of status, with the `Status` field populated so the TPP can observe the current state.

All error bodies MUST include `errorCode` and `errorMessage`.

#### `403` — Forbidden

Return `403` using the [Account Status Handling](../requirements#account-status-handling) mapping:

| `errorCode` | `errorMessage` | When to use |
|-------------|----------------|-------------|
| `Consent.AccountTemporarilyBlocked` | `The account is temporarily blocked.` | Account status is `Suspended` |
| `Consent.PermanentAccountAccessFailure` | `The account is permanently inaccessible.` | Account status is `Closed`, `Deceased`, or `Unclaimed` |

### Pagination

`GET /accounts/{accountId}/transactions` and `GET /accounts/{accountId}/statements` MUST support pagination. Other list endpoints (`/beneficiaries`, `/direct-debits`, `/scheduled-payments`, `/standing-orders`, `/products`, `/accounts/{accountId}/customer`) MAY support pagination where result sets warrant it.

The LFI implements page-based pagination (`page` / `page-size` query params, `meta.paginated` / `meta.totalPages` / `meta.totalRecords` in the response). The API Hub converts this into the `Links` envelope returned to the TPP.

See [Pagination](./pagination) for the full behaviour.



## <span style="color: #22c55e; padding-right: 5px;">GET</span> `/accounts`

Backs the TPP request `GET https://rs1.LFICODE.apihub.openfinance.ae/open-finance/account-information/vx.y/accounts`.

Returns the accounts matching the `accountIds` query parameter. Non-CAAP LFIs MUST treat `accountIds` as mandatory — it is always supplied by the Hub and contains the set of accounts the PSU consented to share.

### Request headers

See [Common request headers](#common-request-headers).

### Query parameters

| Parameter | Required | Default | Description |
|-----------|----------|---------|-------------|
| `accountIds` | Yes | — | Comma-separated list of account IDs to return. Populated by the Hub from the `accountIds` your LFI patched onto the consent during the [Consent Flow](#consent-flow) |
| `page` | Yes | `1` | Page number for paginated results |
| `page-size` | Yes | `100` | Number of records per page |

### Response

`Content-Type: application/json`

Return `200` with a `data` array containing one record per consented account. See [GET /accounts rules](../requirements#get-accounts) for field-level requirements.

```json
{
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
```

`GET /accounts` is exempt from the [Common error responses](#common-error-responses) status mapping — return all consented accounts regardless of status.

See the [GET `/accounts` API Reference](../open-api/accounts) for the full schema.



## <span style="color: #22c55e; padding-right: 5px;">GET</span> `/accounts/{accountId}`

Backs the TPP request `GET https://rs1.LFICODE.apihub.openfinance.ae/open-finance/account-information/vx.y/accounts/{AccountId}`.

Returns the full details of a single account. The response shape is the same `CbuaeAccount` returned inside the `data` array of `GET /accounts`, wrapped as a single object rather than an array. Data returned here MUST be consistent with what is returned by `GET /accounts` for the same account.

### Request headers

See [Common request headers](#common-request-headers).

### Path parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| `accountId` | Yes | The ID of the account to return. MUST be one of the accounts on the consent |

### Response

`Content-Type: application/json`

```json
{
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
```

Errors: see [Common error responses](#common-error-responses).

See the [GET `/accounts/{accountId}` API Reference](../open-api/accounts-AccountId) for the full schema.



## <span style="color: #22c55e; padding-right: 5px;">GET</span> `/accounts/{accountId}/balances`

Backs the TPP request `GET https://rs1.LFICODE.apihub.openfinance.ae/open-finance/account-information/vx.y/accounts/{AccountId}/balances`.

Returns the balances for a single account. An account may have more than one balance — return one record per distinct `balanceType` held. For `CurrentAccount` and `Savings` accounts, a record with `balanceType: InterimAvailable` MUST always be included — this is the real-time available balance. Include `creditLines` where applicable.

### Request headers

See [Common request headers](#common-request-headers).

### Path parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| `accountId` | Yes | The ID of the account whose balances are being returned |

### Query parameters

| Parameter | Required | Default | Description |
|-----------|----------|---------|-------------|
| `page` | Yes | `1` | Page number |
| `page-size` | Yes | `100` | Records per page |

### Response

`Content-Type: application/json`

```json
{
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
```

The full set of allowable `balanceType` values (`ClosingAvailable`, `ClosingBooked`, `ClosingCleared`, `Expected`, `ForwardAvailable`, `Information`, `InterimAvailable`, `InterimBooked`, `InterimCleared`, `OpeningAvailable`, `OpeningBooked`, `OpeningCleared`, `PreviouslyClosedBooked`) is defined in the OpenAPI spec.

Errors: see [Common error responses](#common-error-responses).

See the [GET `/accounts/{accountId}/balances` API Reference](../open-api/accounts-AccountId-balances) for the full schema.



## <span style="color: #22c55e; padding-right: 5px;">GET</span> `/accounts/{accountId}/transactions`

Backs the TPP request `GET https://rs1.LFICODE.apihub.openfinance.ae/open-finance/account-information/vx.y/accounts/{AccountId}/transactions`.

Returns the transactions for a single account, filtered by booking date-time where provided. Pagination is **required** for this endpoint — see [Pagination](./pagination).

### Request headers

See [Common request headers](#common-request-headers). In addition:

| Header | Required | Description |
|--------|----------|-------------|
| `o3-fx-transactions` | No | If `true`, return only FX-related transactions, based on permissions set in the related consent |

### Path parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| `accountId` | Yes | The ID of the account whose transactions are being returned |

### Query parameters

| Parameter | Required | Default | Description |
|-----------|----------|---------|-------------|
| `fromBookingDateTime` | No | — | Return only transactions booked on or after this date-time. Open-ended if omitted. Any timezone offset MUST be ignored |
| `toBookingDateTime` | No | — | Return only transactions booked on or before this date-time. Open-ended if omitted. Any timezone offset MUST be ignored |
| `page` | Yes | `1` | Page number |
| `page-size` | Yes | `100` | Records per page |

### Response

`Content-Type: application/json`

At least two years of transactions MUST be available for retrieval. If no transactions exist within the requested range, return `200` with an empty `data` array — do not return `404`.

```json
{
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
```

Errors: see [Common error responses](#common-error-responses).

See the [GET `/accounts/{accountId}/transactions` API Reference](../open-api/accounts-AccountId-transactions) for the full schema.



## <span style="color: #22c55e; padding-right: 5px;">GET</span> `/accounts/{accountId}/statements`

Backs the TPP request `GET https://rs1.LFICODE.apihub.openfinance.ae/open-finance/account-information/vx.y/accounts/{AccountId}/statements`.

Returns the statements for a single account, filtered by statement date where provided. Pagination is **required** for this endpoint — see [Pagination](./pagination).

### Request headers

See [Common request headers](#common-request-headers).

### Path parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| `accountId` | Yes | The ID of the account whose statements are being returned |

### Query parameters

| Parameter | Required | Default | Description |
|-----------|----------|---------|-------------|
| `fromStatementDate` | No | — | Return only statements with a statement date on or after this date. Open-ended if omitted |
| `toStatementDate` | No | — | Return only statements with a statement date on or before this date. Open-ended if omitted |
| `page` | Yes | `1` | Page number |
| `page-size` | Yes | `100` | Records per page |

### Response

`Content-Type: application/json`

At least two years of statements MUST be available for retrieval. If no statements exist in the requested range, return `200` with an empty `data` array.

```json
{
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
```

Errors: see [Common error responses](#common-error-responses).

See the [GET `/accounts/{accountId}/statements` API Reference](../open-api/accounts-AccountId-statements) for the full schema.



## <span style="color: #22c55e; padding-right: 5px;">GET</span> `/accounts/{accountId}/beneficiaries`

Backs the TPP request `GET https://rs1.LFICODE.apihub.openfinance.ae/open-finance/account-information/vx.y/accounts/{AccountId}/beneficiaries`.

Returns the beneficiaries linked to the account. Only supported for `CurrentAccount` and `Savings` — not available for `CreditCard`, `Finance`, or `Mortgage` accounts.

### Request headers

See [Common request headers](#common-request-headers).

### Path parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| `accountId` | Yes | The ID of the account whose beneficiaries are being returned |

### Query parameters

| Parameter | Required | Default | Description |
|-----------|----------|---------|-------------|
| `page` | Yes | `1` | Page number |
| `page-size` | Yes | `100` | Records per page |

### Response

`Content-Type: application/json`

If the account holds no beneficiaries, return `200` with an empty `data` array — do not return `404`.

```json
{
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
```

Errors: see [Common error responses](#common-error-responses).

See the [GET `/accounts/{accountId}/beneficiaries` API Reference](../open-api/accounts-AccountId-beneficiaries) for the full schema.



## <span style="color: #22c55e; padding-right: 5px;">GET</span> `/accounts/{accountId}/direct-debits`

Backs the TPP request `GET https://rs1.LFICODE.apihub.openfinance.ae/open-finance/account-information/vx.y/accounts/{AccountId}/direct-debits`.

Returns the direct debits linked to the account. Only supported for `CurrentAccount` and `Savings`.

### Request headers

See [Common request headers](#common-request-headers).

### Path parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| `accountId` | Yes | The ID of the account whose direct debits are being returned |

### Query parameters

| Parameter | Required | Default | Description |
|-----------|----------|---------|-------------|
| `page` | Yes | `1` | Page number |
| `page-size` | Yes | `100` | Records per page |

### Response

`Content-Type: application/json`

If the account holds no direct debits, return `200` with an empty `data` array.

```json
{
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
```

Errors: see [Common error responses](#common-error-responses).

See the [GET `/accounts/{accountId}/direct-debits` API Reference](../open-api/accounts-AccountId-direct-debits) for the full schema.



## <span style="color: #22c55e; padding-right: 5px;">GET</span> `/accounts/{accountId}/scheduled-payments`

Backs the TPP request `GET https://rs1.LFICODE.apihub.openfinance.ae/open-finance/account-information/vx.y/accounts/{AccountId}/scheduled-payments`.

Returns one-off scheduled payments linked to the account. Only supported for `CurrentAccount` and `Savings`.

### Request headers

See [Common request headers](#common-request-headers).

### Path parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| `accountId` | Yes | The ID of the account whose scheduled payments are being returned |

### Query parameters

| Parameter | Required | Default | Description |
|-----------|----------|---------|-------------|
| `page` | Yes | `1` | Page number |
| `page-size` | Yes | `100` | Records per page |

### Response

`Content-Type: application/json`

```json
{
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
```

Errors: see [Common error responses](#common-error-responses).

See the [GET `/accounts/{accountId}/scheduled-payments` API Reference](../open-api/accounts-AccountId-scheduled-payments) for the full schema.



## <span style="color: #22c55e; padding-right: 5px;">GET</span> `/accounts/{accountId}/standing-orders`

Backs the TPP request `GET https://rs1.LFICODE.apihub.openfinance.ae/open-finance/account-information/vx.y/accounts/{AccountId}/standing-orders`.

Returns standing orders linked to the account. Only supported for `CurrentAccount` and `Savings`.

### Request headers

See [Common request headers](#common-request-headers).

### Path parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| `accountId` | Yes | The ID of the account whose standing orders are being returned |

### Query parameters

| Parameter | Required | Default | Description |
|-----------|----------|---------|-------------|
| `page` | Yes | `1` | Page number |
| `page-size` | Yes | `100` | Records per page |

### Response

`Content-Type: application/json`

```json
{
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
```

Errors: see [Common error responses](#common-error-responses).

See the [GET `/accounts/{accountId}/standing-orders` API Reference](../open-api/accounts-AccountId-standing-orders) for the full schema.



## <span style="color: #22c55e; padding-right: 5px;">GET</span> `/accounts/{accountId}/products`

Backs the TPP request `GET https://rs1.LFICODE.apihub.openfinance.ae/open-finance/account-information/vx.y/accounts/{AccountId}/product` (singular on the TPP side).

Returns the product data associated with the account — fees, charges, rates, rewards, benefits, and eligibility criteria. `FinanceRates` may be returned as cleartext JSON or as a JWE compact string — see [Encrypted FinanceRates](./finance-rates).

### Request headers

See [Common request headers](#common-request-headers).

### Path parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| `accountId` | Yes | The ID of the account whose product data is being returned |

### Query parameters

| Parameter | Required | Default | Description |
|-----------|----------|---------|-------------|
| `page` | Yes | `1` | Page number |
| `page-size` | Yes | `100` | Records per page |

### Response

`Content-Type: application/json`

If no product data exists for the account, return `200` with an empty `data` array.

```json
{
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
```

Errors: see [Common error responses](#common-error-responses).

See the [GET `/accounts/{accountId}/products` API Reference](../open-api/accounts-AccountId-products) for the full schema.



## <span style="color: #22c55e; padding-right: 5px;">GET</span> `/accounts/{accountId}/customer`

Backs the TPP request `GET https://rs1.LFICODE.apihub.openfinance.ae/open-finance/account-information/vx.y/accounts/{AccountId}/parties` — "parties" on the TPP side, "customer" on Ozone Connect.

Returns the customer records associated with a specific account. Joint accounts return one record per joint holder.

The response is based on [OpenID Connect for Identity Assurance 1.0](https://openid.net/specs/openid-connect-4-identity-assurance-1_0.html) — claims are carried inside a `verifiedClaims` envelope. See [Identity Assurance Claims](/knowledge-base/articles/identity-assurance-claims).

### Request headers

See [Common request headers](#common-request-headers).

### Path parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| `accountId` | Yes | The ID of the account whose customers are being returned |

### Response

`Content-Type: application/json`

#### `200` — Retail (personal) account

```json
{
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
```

#### `200` — SME / Corporate account

```json
{
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
```

Errors: see [Common error responses](#common-error-responses).

See the [GET `/accounts/{accountId}/customer` API Reference](../open-api/accounts-AccountId-customer) for the full schema.



## <span style="color: #22c55e; padding-right: 5px;">GET</span> `/customer`

Backs the TPP request `GET https://rs1.LFICODE.apihub.openfinance.ae/open-finance/account-information/vx.y/parties` — "parties" on the TPP side, "customer" on Ozone Connect.

Returns the customer record for the authenticated PSU. Unlike `/accounts/{accountId}/customer`, this endpoint is not scoped to a specific account.

**The response MUST be derived from the `o3-psu-identifier` header — not from any account on the consent.** At authorization, the LFI patched an opaque PSU identifier onto the consent, linking the consent to the authenticated user inside the LFI's own systems. The Hub forwards that identifier here. Your LFI resolves it back to the PSU and returns that PSU's claims.

`o3-consent-id` is still supplied so the LFI can attribute the call for logging, but it MUST NOT be used to select which customer to return — the PSU who authenticated the consent is the only subject of this response.

The response is based on [OpenID Connect for Identity Assurance 1.0](https://openid.net/specs/openid-connect-4-identity-assurance-1_0.html). See [Identity Assurance Claims](/knowledge-base/articles/identity-assurance-claims).

### Request headers

See [Common request headers](#common-request-headers). `o3-psu-identifier` is the operative header for this endpoint.

### Response

`Content-Type: application/json`

```json
{
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
```

See the [GET `/customer` API Reference](../open-api/customer) for the full schema.



## Customer data responses

The response format for `GET /customer` and `GET /accounts/{accountId}/customer` (and the CoP query response) is based on the [OpenID Connect for Identity Assurance 1.0 Specification](https://openid.net/specs/openid-connect-4-identity-assurance-1_0.html) — claims about a customer are carried inside a `verifiedClaims` envelope with a `verification.trustFramework` indicating the framework under which the claims were verified.

See [Identity Assurance Claims](/knowledge-base/articles/identity-assurance-claims) for the shared envelope and how it maps to each endpoint.
