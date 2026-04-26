---
next: false
prev: false
aside: false
---

🕒 **3 minute read**

# Consent Status Event - API Guide

## Prerequisites

Before receiving a Consent Status Event, ensure the following requirements are met:

- **Registered [Application](/tech/tpp-standards/trust-framework/application)**
  The application must be created within the Trust Framework and assigned the appropriate role as defined in [Roles](/tech/tpp-standards/trust-framework/roles).

- **Valid [Encryption Certificate](/tech/tpp-standards/trust-framework/certificates)**
  An active encryption certificate must be issued and registered in the Trust Framework to receive the event as an encrypted JWE.

## How It Works

When a consent is created with subscription.Webhook.IsActive: true, on every consent status changes — for example, when a User revokes, or the consent expires — the API Hub delivers a Consent Status Event to your registered webhook URL as a JWE-encrypted POST request. No per-consent subscription flag is required; events are delivered based on your webhook registration in the Trust Framework.

Events are sent for both **Bank Data Sharing** and **Bank Service Initiation** consents. The `Data` object mirrors the full consent resource at the time of the status change.

The JWE is encrypted using your public **Encryption Certificate** registered in the Trust Framework. You must respond with `202 Accepted` immediately and decrypt the event payload asynchronously.

## API Sequence Flow

<APIFlowViewer title="Consent Status Event Flow | Example: Status -> Revoked">
  <APIFlowConsentEvent/>
</APIFlowViewer>

## Step 1 — Receive the event

The Hub delivers the event as an HTTP POST to your registered webhook URL. The request body is a JWE compact serialisation string and the `Content-Type` is `application/jwe`.

**Request headers you will receive:**

| Header | Description |
|--------|-------------|
| `Content-Type` | `application/jwe` |
| `x-fapi-interaction-id` | RFC4122 UUID used as a correlation ID for this event delivery |

## Step 2 — Respond with 202

You must respond with `202 Accepted` and an **empty body** before performing any processing. The Hub expects an immediate acknowledgement — do not wait for decryption or business logic before responding.

```http
HTTP/1.1 202 Accepted
x-fapi-interaction-id: <echo the received value>
```

::: warning
Failure to respond with `202` promptly may cause the Hub to retry delivery. Process the event payload asynchronously after acknowledging receipt.
:::

## Step 3 — Decrypt the JWE

The event is a JWE compact serialisation encrypted with your public **Encryption Certificate**. The JWE header contains a `kid` that identifies which of your registered encryption keys was used — decode the header first to select the correct private key, then decrypt.

See [Receiving Event Notifications](/tech/tpp-standards/security/fapi/receiving-events) for the full FAPI-aligned guidance, including key selection by `kid`, JWS signature verification, and required security checks.

## Event Payload

The decrypted and decoded event payload contains the following structure under the `message` claim:

### `Meta`

| Field | Type | Description |
|-------|------|-------------|
| `EventDateTime` | string (date-time) | When the event was generated |
| `EventResource` | string | The resource URI that triggered the event |
| `EventType` | string | One of: `Resource.Created`, `Resource.Updated`, `Resource.Deleted` |
| `ConsentId` | string | The consent identifier associated with the event |

### `Data`

A replica of the consent resource at the time of the status change, with `Status` and `StatusUpdateDateTime` updated to reflect the new state. Where the consent was revoked, `RevokedBy` will indicate who initiated the revocation.

The shape of `Data` depends on the consent type:

- **Bank Data Sharing Consent** — includes `Permissions`, `AccountType`, `AccountSubType`, and `ExpirationDateTime`
- **Bank Service Initiation Consent** — includes `ControlParameters`, `PaymentPurposeCode`, and optionally `PaymentConsumption` tracking cumulative payment usage

### Consent `Status` values

| Status | Description |
|--------|-------------|
| `AwaitingAuthorization` | The consent is awaiting User authorization |
| `Authorized` | The consent has been successfully authorized by the User |
| `Rejected` | The unauthorized consent was rejected at the LFI |
| `Revoked` | The consent has been revoked — check `RevokedBy` for who initiated it |
| `Expired` | The consent has passed its `ExpirationDateTime` |
| `Consumed` | The consented action(s) have been completed (payment consents) |
| `Suspended` | The consent has been suspended pending further enquiry |

### `RevokedBy` values

Present when `Status` is `Revoked`:

| Value | Description |
|-------|-------------|
| `LFI` | Revoked by the LFI without User initiation |
| `TPP` | Revoked by the TPP without User initiation |
| `LFI.InitiatedByUser` | User initiated revocation via the LFI |
| `TPP.InitiatedByUser` | User initiated revocation via the TPP |

### Example decrypted payload

```json
{
  "iss": "https://auth1.[LFICODE].apihub.openfinance.ae",
  "aud": "[CLIENT_ID]",
  "iat": 1713196200,
  "exp": 1713199800,
  "message": {
    "Meta": {
      "EventDateTime": "2025-04-15T10:00:00Z",
      "EventResource": "/consents/2079bdce-c8e2-42a8-92b5-2732d9695971",
      "EventType": "Resource.Updated",
      "ConsentId": "2079bdce-c8e2-42a8-92b5-2732d9695971"
    },
    {
    "Data": {
        "ConsentId": "b8f42378-10ac-46a1-8d20-4e020484216d",
        "CreationDateTime": "2025-04-15T12:00:00Z",
        "Status": "Revoked",
        "StatusUpdateDateTime": "2025-04-15T12:30:00Z",
        "Permissions": [
        "ReadAccountsBasic",
        "ReadAccountsDetail",
        "ReadBalances",
        "ReadBeneficiariesBasic",
        "ReadBeneficiariesDetail",
        "ReadTransactionsBasic",
        "ReadTransactionsDetail",
        "ReadProduct",
        "ReadScheduledPaymentsBasic",
        "ReadScheduledPaymentsDetail",
        "ReadDirectDebits",
        "ReadStandingOrdersBasic",
        "ReadStandingOrdersDetail",
        "ReadStatements",
        "ReadPartyUser",
        "ReadPartyUserIdentity",
        "ReadParty",
        "ReadProductFinanceRates"
        ],
        "ExpirationDateTime": "2026-12-25T23:00:00.000Z",
        "OpenFinanceBilling": {
            "UserType": "Retail",
            "Purpose": "AccountAggregation"
        },
    }
  }
}
```
