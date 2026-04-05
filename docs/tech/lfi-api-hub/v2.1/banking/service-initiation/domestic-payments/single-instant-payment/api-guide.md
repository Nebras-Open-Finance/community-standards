---
next: false
prev: false
aside: false
---

# Single Instant Payment - API Guide

A Single Instant Payment enables LFIs to securely process one-time, immediate domestic payments initiated by licensed third-party providers (TPPs) on behalf of customers. These services ensure real-time execution while maintaining strong customer authentication and control over payment details.

All payments operate under explicit customer consent. The customer authorises the payment at the LFI with fixed amount and destination details, after which the LFI validates and executes the payment immediately within the scope of the granted consent.

## API Sequence Flow

<APIFlowViewer title="Single Instant Payment API Flow">
  <APIFlowsSingleInstantPayment/>
</APIFlowViewer>

## <span style="color: #3b82f6; padding-right: 5px;">POST</span> `/payments`

The `POST /payments` endpoint is invoked by the **API Hub** to instruct the **LFI** to initiate a payment after a payment instruction from a **TPP** has successfully passed all required validations.

Upon receiving the request, the LFI **must process the payment** and return:

- A **failure response**, if the payment fails any **technical validations**, or  
- A **success response**, if the payment passes validation and is successfully **submitted to the underlying payment rails** for processing.

### Request headers

| Header | Required | Description |
|--------|----------|-------------|
| `o3-provider-id` | Yes | Identifier for your LFI registered in the Hub |
| `o3-aspsp-id` | Yes *(deprecated)* | Deprecated alias for `o3-provider-id`. Will be removed in a future version — use `o3-provider-id` |
| `o3-caller-org-id` | Yes | Organisation ID of the TPP making the underlying request |
| `o3-caller-client-id` | Yes | OIDC client ID of the TPP application |
| `o3-caller-software-statement-id` | Yes | Software statement ID of the TPP application |
| `o3-api-uri` | Yes | The parameterised URL of the API being called by the TPP |
| `o3-api-operation` | Yes | The HTTP method of the operation carried out by the TPP (e.g. `POST`) |
| `o3-ozone-interaction-id` | Yes | Hub-generated interaction ID. Equals `o3-caller-interaction-id` if the TPP provided one |
| `o3-consent-id` | Yes | The consentId for which this call is being made |
| `o3-psu-identifier` | Yes | Base64-encoded psuIdentifier JSON object |
| `o3-caller-interaction-id` | No | Interaction ID passed in by the TPP, if present |

### Request body

`Content-Type: application/json`

The Hub sends the request as a plain JSON payload rather than a JWS, with the body including all relevant payment initiation details.

#### `requestUrl`

| Field         | Type    | Required | Description                                      | Example            |
|---------------|---------|----------|--------------------------------------------------|--------------------|
| `requestUrl` | string  | No      | The resource URL at which the TPP requested for the payment. | `https://rs1.[LFICode].apihub.openfinance.ae/open-finance/payment/v2.1/payments`    |

#### `paymentType`

| Field         | Type    | Required | Description                                      | Example            |
|---------------|---------|----------|--------------------------------------------------|--------------------|
| `paymentType` | string  | Yes      | The type of the payment that is being created. Must be set to `cbuae-payment` for domestic single instant payment. | `cbuae-payment`    |

#### Data (required) | `request.Data`

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `ConsentId` | string | Yes | Unique consent identifier from the TPP, as captured in consent creation. | `cac2381a-7111-4c5f-bc2f-4319a93da7c5` |
| `Instruction` | object | Yes | The instruction payload for a single domestic payment transfer. | — |
| `PaymentPurposeCode` | string | Yes | Coded payment purpose, 3 uppercase letters. | `ACM` |
| `PersonalIdentifiableInformation` | string | No | Encrypted payload containing creditor and risk-related data, provided as a JWE string. | `eyJhbGci...` |
| `DebtorReference` | string | No | Reference shown on the debtor’s statement for the payment. | `Order-78910` |
| `CreditorReference` | string | No | Reference shown on the creditor's statement that supports reconciliation of a given payment instruction. | `ORD-78910` |
| `OpenFinanceBilling` | object | Yes | Open Finance billing details for the product type. | — |

#### Instruction (required) | `request.Data.Instruction`

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `Amount.Amount` | string | Yes | Payment amount in decimal format (two fraction digits). | `100.00` |
| `Amount.Currency` | string | Yes | ISO-4217 currency code for the amount. | `AED` |

#### OpenFinanceBilling (required) | `request.Data.OpenFinanceBilling`

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `Type` | string | Yes | The billing type for this payment instruction. | `Collection` |
| `MerchantId` | string | No | Optional merchant identifier. | `MERCHANT123` |

#### `requestHeaders`

| Field         | Type    | Required | Description                                      | Example            |
|---------------|---------|----------|--------------------------------------------------|--------------------|
| `requestHeaders` | object  | Yes      | The entire set of HTTP request headers that was received from the TPP. | —    |

#### `tpp`

| Field         | Type    | Required | Description                                      | Example            |
|---------------|---------|----------|--------------------------------------------------|--------------------|
| `clientId` | string  | Yes      | The client identifier for the TPP as issued by the Trust Framework. | `1675793e-d6e3-4954-96c8-acb9aaa83c53`    |
| `tppId` | string  | Yes      | The identifier used by the API Hub to uniquely identify the TPP. | `fdd6e0ac-ba7a-4bc4-a986-c45c5daaaf00`    |
| `tppName` | string  | Yes      | The TPP name recorded in the Trust Framework. | `Example TPP`    |
| `softwareStatementId` | string  | Yes      | The client identifier for the TPP as issued by the Trust Framework. | `XvAjPeeYZAdWwrFF..`    |
| `directoryRecord` | string  | No      | The latest copy of the TPP directory record retrieve from the CBUAE Trust Framework directory, encoded as a Base 64 string. | `eyJhbW91bnQiOiIxMDAuMDAiLCJjdXJyZW5jeSI6IkFFRCJ9..`    |
| `decodedSsa` | object  | Yes      | The decoded software statement retrieved from the Trust Framework that provides the properties of the Client. | — |
| `ordId` | string  | Yes      | The organization identifier for the TPP. | `Example TPP`    |

#### `decodedSsa`

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `client_id` | string | Yes | Globally unique TPP client identifier issued by the Trust Framework. | `1675793e-d6e3-4954-96c8-acb9aaa83c53` |
| `client_name` | string | No | Name of the client as presented to end users during authorization flows. | `Example TPP` |
| `client_uri` | string | No | Home page URI of the client application. | `https://example.com` |
| `logo_uri` | string | No | URL of the client logo. | `https://example.com/logo.png` |
| `jwks_uri` | string | No | URL where the client’s JSON Web Key Set is hosted. | `https://example.com/jwks.json` |
| `redirect_uris` | array of string | No | Registered redirection endpoints for OAuth authorization flows. | `["https://example.com/callback"]` |
| `roles` | array of string | No | TPP roles associated with the client in the Trust Framework. | `["BSIP", "BDSP"]` |
| `sector_identifier_uri` | string | No | URI for sector identifier configuration. | `https://example.com/sector` |
| `application_type` | string | No | OAuth application type (e.g., `web`, `native`). | `web` |
| `organisation_id` | string | No | Identifier of the organisation that owns the client. | `org-1234` |

#### Request example

```json
{
  "requestUrl": "https://rs1.[LFICode].apihub.openfinance.ae/open-finance/payment/v2.1/payments",
  "paymentType": "cbuae-payment",
  "request": {
    "Data": {
      "ConsentId": "cac2381a-7111-4c5f-bc2f-4319a93da7c5",
      "Instruction": {
        "Amount": {
          "Amount": "100.00",
          "Currency": "AED"
        }
      },
      "PaymentPurposeCode": "ACM",
      "OpenFinanceBilling": {
        "Type": "Collection"
      }
    }
  },
  "requestHeaders": {
    "o3-provider-id": "lfi-123",
    "o3-aspsp-id": "lfi-123",
    "o3-caller-org-id": "tpb-456",
    "o3-caller-client-id": "client-789",
    "o3-caller-software-statement-id": "ssa-abc",
    "o3-api-uri": "/open-finance/payment/v2.1/payments",
    "o3-api-operation": "POST",
    "o3-ozone-interaction-id": "ozone-xyz",
    "o3-consent-id": "cac2381a-7111-4c5f-bc2f-4319a93da7c5",
    "o3-psu-identifier": "eyJwczoi..."
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
      "client_uri": "https://example.com",
      "logo_uri": "https://example.com/logo.png",
      "jwks_uri": "https://example.com/jwks.json",
      "redirect_uris": ["https://example.com/callback"],
      "roles": ["BSIP", "BDSP"],
      "sector_identifier_uri": "https://example.com/sector",
      "application_type": "web",
      "organisation_id": "org-1234"
    }
  },
  "supplementaryInformation": {}
}
```

### Response

`Content-Type: application/json`

Return `201` on successful payment initiation.

#### `data`

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `id` | string | Yes | An API specific unique identification as assigned by the LFI to identify the domestic Payment resource. | `payment-123` |
| `consentId` | string | No | Unique identification assigned by the TPP to identify the consent resource. | `cac2381a-7111-4c5f-bc2f-4319a93da7c5` |
| `paymentTransactionId` | string | No | This is an end-to-end identifier that is generated by the underlying payment rails when it is sent from an Originating LFI to a Receiving LFI. | `txn-456789` |
| `status` | string | Yes | Specifies the status of the payment information group. Allowed values: Pending, AcceptedSettlementCompleted, AcceptedCreditSettlementCompleted, AcceptedWithoutPosting, Rejected, Received. | `Pending` |
| `statusUpdateDateTime` | string | Yes | Date and time at which the resource status was updated. | `2023-01-01T12:00:00Z` |
| `creationDateTime` | string | Yes | Date and time at which the message was created. | `2023-01-01T12:00:00Z` |
| `instruction` | object | No | The Initiation payload. | — |
| `paymentPurposeCode` | string | Yes | Specifies the purpose of the payment. | `ABC` |
| `debtorReference` | string | No | A Debtor Reference. | `Order-78910` |
| `openFinanceBilling` | object | No | Billing parameters. | — |

#### instruction (optional) | `data.instruction`

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `Amount.amount` | string | Yes | Payment amount in decimal format. | `100.00` |
| `Amount.currency` | string | Yes | ISO-4217 currency code. | `AED` |

#### openFinanceBilling (optional) | `data.openFinanceBilling`

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `Type` | string | Yes | The billing type. Allowed values: Collection, LargeValueCollection, PushP2P, PullP2P, Me2Me. | `Collection` |
| `NumberOfSuccessfulTransactions` | integer | No | Number of successful transactions. | `1` |
| `MerchantId` | string | No | Merchant identifier. | `MERCHANT123` |

#### `meta`

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `meta` | object | No | Metadata relevant to the resource. | — |

#### Example — Successful initiation

```json
{
  "data": {
    "id": "5ff155ea-853f-480c-ac74-1eaed7c1201f",
    "consentId": "cac2381a-7111-4c5f-bc2f-4319a93da7c5",
    "paymentTransactionId": "de857816-3016-4567-86b6-8f418e36fb27",
    "status": "Pending",
    "statusUpdateDateTime": "2023-01-01T12:00:00Z",
    "creationDateTime": "2023-01-01T12:00:00Z",
    "instruction": {
      "Amount": {
        "amount": "100.00",
        "currency": "AED"
      }
    },
    "paymentPurposeCode": "ACM",
    "debtorReference": "Order-78910",
    "openFinanceBilling": {
      "Type": "Collection",
      "MerchantId": "MERCHANT123"
    }
  },
  "meta": {}
}
```

#### Error responses

Only return an error when the Hub's request itself is invalid or a server condition prevents you from responding. All error bodies must include `errorCode` and `errorMessage`.

##### `400` — Bad request

| `errorCode` | When to use |
|-------------|-------------|
| `Body.InvalidFormat` | Request body is absent, not valid JSON, or does not match the schema |
| `Resource.InvalidFormat` | Field is present but not syntactically valid |
| `Consent.Invalid` | Consent is invalid or expired |
| `Consent.BusinessRuleViolation` | Business rule violation in consent |
| `Consent.FailsControlParameters` | Consent fails control parameters |
| `Consent.InvalidUserIdentifier` | Invalid user identifier in consent |
| `JWS.InvalidSignature` | JWS signature is invalid |
| `JWS.Malformed` | JWS is malformed |
| `JWS.InvalidClaim` | JWS contains invalid claim |
| `JWS.InvalidHeader` | JWS header is invalid |
| `JWE.DecryptionError` | Error decrypting JWE |
| `JWE.InvalidHeader` | JWE header is invalid |
| `GenericRecoverableError` | Recoverable validation error not covered above — Hub may retry |
| `GenericError` | Unrecoverable validation error not covered above |
| `Event.UnexpectedEvent` | Unexpected event occurred |

###### Example response

```json
{
  "errorCode": "Body.InvalidFormat",
  "errorMessage": "Request body is not valid JSON"
}
```

##### `403` — Forbidden

| `errorCode` | When to use |
|-------------|-------------|
| `AccessToken.InvalidScope` | The Hub's token does not include the required scope |
| `Consent.TransientAccountAccessFailure` | Account temporarily inaccessible — Hub may retry after a delay |
| `Consent.AccountTemporarilyBlocked` | Account temporarily blocked/suspended — Hub may retry after a delay |
| `Consent.PermanentAccountAccessFailure` | Account permanently inaccessible due to infrastructure reasons |
| `GenericRecoverableError` | Recoverable access failure not covered above |
| `GenericError` | Unrecoverable access failure not covered above |

###### Example response

```json
{
  "errorCode": "AccessToken.InvalidScope",
  "errorMessage": "Access token does not have required scope"
}
```

##### `409` — Conflict

| `errorCode` | When to use |
|-------------|-------------|
| `GenericRecoverableError` | Recoverable conflict not covered above |
| `GenericError` | Unrecoverable conflict not covered above |

###### Example response

```json
{
  "errorCode": "GenericError",
  "errorMessage": "Conflict occurred during processing"
}
```

##### `500` — Internal server error

| `errorCode` | When to use |
|-------------|-------------|
| `GenericRecoverableError` | Transient server error — Hub may retry after a delay |
| `GenericError` | Unrecoverable server error |

###### Example response

```json
{
  "errorCode": "GenericError",
  "errorMessage": "Internal server error occurred"
}
```

## <span style="color: #eab308; padding-right: 5px;">PATCH</span> `/payment-log/:id`

This endpoint updates the payment status in the API Hub. The API Hub receives the status update from the LFI, triggers asynchronous notifications to TPPs, and maintains accurate status for billing and limit calculations.

### Request headers

| Header | Required | Description |
|--------|----------|-------------|
| `o3-provider-id` | Yes | Identifier for your LFI registered in the Hub |
| `o3-caller-org-id` | Yes | Organisation ID of the TPP making the underlying request |
| `o3-caller-client-id` | Yes | OIDC client ID of the TPP application |
| `o3-api-uri` | Yes | The parameterised URL of the API being called by the TPP |
| `o3-api-operation` | Yes | The HTTP method of the operation carried out by the TPP (`PATCH`) |
| `o3-ozone-interaction-id` | Yes | Hub-generated interaction ID. Equals `o3-caller-interaction-id` if the TPP provided one |
| `o3-consent-id` | Yes | The consentId for which this call is being made |
| `o3-psu-identifier` | Yes | Base64-encoded psuIdentifier JSON object |
| `o3-caller-interaction-id` | No | Interaction ID passed in by the TPP, if present |

### Path parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `id` | string | Identifier of the payment log entry being updated | `5ff155ea-853f-480c-ac74-1eaed7c1201f` |

### Request body

`Content-Type: application/json`

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `paymentResponse.status` | string | Yes | Represents the **current state of the payment** based on the Payment Status Model. Allowed values: `Pending`, `AcceptedSettlementCompleted`, `AcceptedCreditSettlementCompleted`, `AcceptedWithoutPosting`, and `Rejected`. [Payment Status](/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/overview/payment-status.md) | `AcceptedSettlementCompleted` |
| `paymentResponse.paymentTransactionId` | string | Conditional | Unique **end-to-end transaction identifier** assigned by the underlying payment rails. Required once the payment has been processed or submitted for execution. | `de857816-3016-4567-86b6-8f418e36fb27` |
| `paymentResponse.openFinanceBilling.numberOfSuccessfulTransactions` | integer | No | Indicates the **number of successfully processed transactions**, typically relevant for batch or file-based payments. | `1` |
| `paymentResponse.rejectReasonCode[]` | array | Conditional | List of **rejection reasons** provided when a payment fails. Required if the payment status is `Rejected`. When updating multiple times, new reasons should be appended to preserve history. | — |
| `paymentResponse.rejectReasonCode[].code` | string | Yes (within array) | Standardized **error code** identifying the reason for rejection. Should follow the Open Finance namespaced format (e.g., `AANI.AM04`). | `AANI.AM04` |
| `paymentResponse.rejectReasonCode[].message` | string | Yes (within array) | Human-readable **description of the rejection reason**. This message may be shared with TPPs and should be clear, concise, and sanitized. | `Payment rejected due to insufficient funds.` |

### Successful status update

```json
{
    "paymentResponse.status": "AcceptedWithoutPosting",
    "paymentResponse.paymentTransactionId": "de857816-3016-4567-86b6-8f418e36fb27"
}
```

### Rejected status update

```json
{
    "paymentResponse.status": "Rejected",
    "paymentResponse.paymentTransactionId": "de857816-3016-4567-86b6-8f418e36fb27",
    "paymentResponse.rejectReasonCode": [
      {
        "code": "AANI.AM04",
        "message": "Payment rejected due to insufficient funds."
      }
    ]
}
```

### Response

`Content-Type: application/json`

A successful `PATCH /payment-log/:id` returns `204 No Content` — the response does not have a body.

See the [PATCH /payment-log/:id](/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/payment-log) API reference for the full request and response schema.

## <span style="color: #22c55e; padding-right: 5px;">GET</span> `/payments/:paymentId`

> This section is in progress.