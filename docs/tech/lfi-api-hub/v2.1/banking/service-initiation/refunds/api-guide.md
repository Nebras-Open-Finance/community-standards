---
next: false
prev: false
aside: false
---

🕒 **4 minute read**

# Payment Refunds — API Guide

The Payment Refunds endpoint lets the API Hub retrieve the debtor's payment account details from your LFI after a payment has been made. The TPP uses those details to initiate a refund back to the original payer. This endpoint does **not** execute the refund itself — it only returns the account details needed to initiate one.

## API Sequence Flow

<APIFlowViewer title="Payment Refunds API Flow">
  <APIFlowsRefunds/>
</APIFlowViewer>

## <span style="color: #22c55e; padding-right: 5px;">GET</span> `/payment-consents/{consentId}/refund`

### Request headers

| Header | Required | Description |
|--------|----------|-------------|
| `o3-provider-id` | Yes | Identifier for your LFI registered in the Hub |
| `o3-aspsp-id` | Yes *(deprecated)* | Deprecated alias for `o3-provider-id`. Will be removed in a future version — use `o3-provider-id` |
| `o3-caller-org-id` | Yes | Organisation ID of the TPP making the underlying request |
| `o3-caller-client-id` | Yes | OIDC client ID of the TPP application |
| `o3-caller-software-statement-id` | Yes | Software statement ID of the TPP application |
| `o3-api-uri` | Yes | The parameterised URL of the API being called by the TPP |
| `o3-api-operation` | Yes | The HTTP method of the operation carried out by the TPP (e.g. `GET`) |
| `o3-ozone-interaction-id` | Yes | Hub-generated interaction ID. Equals `o3-caller-interaction-id` if the TPP provided one |
| `o3-caller-interaction-id` | No | Interaction ID passed in by the TPP, if present |
| `o3-psu-identifier` | Yes | Base64-encoded representation of the PSU identifier JSON object |

### Path parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| `consentId` | Yes | The consent ID of the original payment consent |

### Response

`Content-Type: application/json`

Return `200` with the debtor's refund account details. The Hub wraps the response in a signed JWS before returning it to the TPP — your LFI returns plain JSON.

#### `200` — Refund account found

Return the debtor's account details under `data.refundAccount`. The `refundAccount` object is required and must contain the debtor's IBAN and name.

```json
{
  "data": {
    "consentId": "con-7f4a9b2c-1d3e-4f5a-b6c7-8d9e0f1a2b3c",
    "refundAccount": {
      "schemeName": "IBAN",
      "identification": "AE070331234567890123456",
      "name": {
        "en": "Ibrahim Al Suwaidi"
      }
    }
  },
  "meta": {}
}
```

##### `data.refundAccount`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `schemeName` | string | Yes | Account identifier scheme — always `IBAN` |
| `identification` | string | Yes | The debtor's IBAN |
| `name` | object | Yes | The account holder name |
| `name.en` | string | Yes | Account holder name in English (max 70 characters) |
| `name.ar` | string | No | Account holder name in Arabic (max 70 characters) |

#### Error responses

All error bodies must include `errorCode` and `errorMessage`.

##### `403` — Forbidden

| `errorCode` | `errorMessage` | When to use |
|-------------|----------------|-------------|
| `Consent.AccountTemporarilyBlocked` | `The debtor account is blocked from receiving payments.` | The account is blocked from receiving payments for a temporary reason — e.g. account status is `Suspended`, or the account is otherwise unable to receive a credit transaction refund on a transient basis |
| `Consent.PermanentAccountAccessFailure` | `The debtor account is blocked from receiving payments.` | The account is blocked from receiving payments permanently — e.g. account status is `Closed`, `Deceased`, or `Unclaimed` |

## API Reference

See the [GET `/payment-consents/{consentId}/refund` API Reference](/tech/lfi-api-hub/v2.1/banking/service-initiation/open-api/payment-consents-ConsentId-refund) for the full request and response schema.
