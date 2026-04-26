---
next: false
prev: false
aside: false
---

🕒 **2 minute read**

# Payment Status Event - API Guide

## Prerequisites

Before receiving a Payment Status Event, ensure the following requirements are met:

- **Registered [Application](/tech/tpp-standards/trust-framework/application)**
  The application must be created within the Trust Framework and assigned the **BDSP role** as defined in [Roles](/tech/tpp-standards/trust-framework/roles).

- **Valid [Encryption Certificate](/tech/tpp-standards/trust-framework/certificates)**
  An active encryption certificate must be issued and registered in the Trust Framework to receive the event as an enrypted JWE.

## How It Works

When a payment consent is created with `subscription.Webhook.IsActive: true`, the API Hub monitors that consent for payment status changes. Each time the LFI processes the payment and updates its status — by PATCHing the API Hub — the Hub delivers a Payment Status Event to your registered `Webhook.Url` as a JWE-encrypted POST request.

The JWE is encrypted using your public **Encryption Certificate** registered in the Trust Framework. You must respond with `202 Accepted` immediately and decrypt the event payload asynchronously.

## API Sequence Flow

<APIFlowViewer title="Payment Status Event Flow | Example: Status -> AcceptedWithoutPosting">
  <APIFlowPaymentStatusEvent/>
</APIFlowViewer>

## Step 1 — Enable the subscription on your payment consent

Set `subscription.Webhook.IsActive` to `true` and provide your webhook URL when creating the payment consent PII. The URL must be registered and accessible from the API Hub.

```json
{
  "subscription": {
    "Webhook": {
      "IsActive": true,
      "Url": "https://tpp.example.com/webhooks/receiver"
    }
  }
}
```

::: tip
The `Webhook.Url` must be the URL of your registered webhook endpoint — the API Hub will POST events directly to this address.
:::

## Step 2 — Receive the event

The Hub delivers the event as an HTTP POST to your `Webhook.Url`. The request body is a JWE compact serialisation string and the `Content-Type` is `application/jwe`.

**Request headers you will receive:**

| Header | Description |
|--------|-------------|
| `Content-Type` | `application/jwe` |
| `x-fapi-interaction-id` | RFC4122 UUID used as a correlation ID for this event delivery |

## Step 3 — Respond with 202

You must respond with `202 Accepted` and an **empty body** before performing any processing. The Hub expects an immediate acknowledgement — do not wait for decryption or business logic before responding.

```http
HTTP/1.1 202 Accepted
x-fapi-interaction-id: <echo the received value>
```

::: warning
Failure to respond with `202` promptly may cause the Hub to retry delivery. Process the event payload asynchronously after acknowledging receipt.
:::

## Step 4 — Decrypt the JWE

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

A replica of the payment resource at the time of the status change, with `Status` and `StatusUpdateDateTime` updated to reflect the new state. Where the payment was rejected, `RejectReasonCode` will be populated. Where the payment has been processed by the underlying rails, `PaymentTransactionId` will be present.

### Example decrypted payload

```json
{
  "iss": "https://auth1.[LFICODE].apihub.openfinance.ae",
  "aud": "[CLIENT_ID]",
  "iat": 1713196200,
  "exp": 1713199800,
  "message": {
    "Meta": {
      "EventDateTime": "2025-04-15T12:30:00Z",
      "EventResource": "/payment/7130812d-4d81-4c68-8187-6358cfbce521",
      "EventType": "Resource.Updated",
      "ConsentId": "2079bdce-c8e2-42a8-92b5-2732d9695971"
    },
    "Data": {
      "PaymentId": "7130812d-4d81-4c68-8187-6358cfbce521",
      "ConsentId": "2079bdce-c8e2-42a8-92b5-2732d9695971",
      "Status": "AcceptedWithoutPosting",
      "StatusUpdateDateTime": "2025-04-15T12:30:00Z",
      "CreationDateTime": "2025-04-15T12:00:00Z",
      "Instruction": {
        "InstructedAmount": {
          "Amount": "500.00",
          "Currency": "AED"
        }
      },
      "PaymentPurposeCode": "ACM",
      "OpenFinanceBilling": {
        "Type": "PushP2P",     
      },
    }
  }
}
```
