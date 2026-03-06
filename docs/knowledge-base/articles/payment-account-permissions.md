---
title: "Account Permissions in a Payment Consent"
description: "How to use ReadAccountsBasic, ReadAccountsDetail, and ReadBalances on a payment consent, which endpoints they unlock, and why they're useful during a payment flow."
---

# Account Permissions in a Payment Consent

A payment consent can optionally include a small set of account-reading permissions. This allows a TPP to read the payer's account details and balance using the **same access token** issued for the payment — without creating a separate [Bank Data Sharing](../../tech/tpp-standards/v2.1/banking/data-sharing/api-guide) consent.



## Why Include These Permissions?

During a payment flow the TPP typically needs to:

- **Display the payer's debit account** — the user should be able to confirm which account they are paying from before authorizing.
- **Show the available balance** — helps the user check they have sufficient funds before approving the payment.
- **Pre-fill the debit account** — some UX patterns let the user pick an account; `ReadAccountsBasic` provides the list.

Without these permissions the TPP only receives a payment access token that is scoped to initiate and track the payment — it cannot call any account endpoints.



## Available Permissions

These three permissions are the only account-reading permissions available on a payment consent. They are a **small subset** of the full set of permissions available in a Bank Data Sharing consent.

| Permission | Endpoint unlocked | What it returns |
|------------|-------------------|-----------------|
| `ReadAccountsBasic` | `GET /accounts` | List of accounts with basic metadata (account type, currency, nickname). Does **not** include the full account number or IBAN. |
| `ReadAccountsDetail` | `GET /accounts/{AccountId}` | Full account record including the IBAN/account identification. Requires `ReadAccountsBasic` to first retrieve an `AccountId`. |
| `ReadBalances` | `GET /accounts/{AccountId}/balances` | Current balance for a specific account (available balance, credit/debit indicator, and currency). |

`ReadRefundAccount` is a fourth permission on a payment consent. It unlocks `GET /payment-consents/{ConsentId}/refund` and is used to retrieve account details for routing a refund — it is not an account-reading permission in the same sense.



## Impact on Scope

Including any of the three permissions above **changes the required scope** in the `/par` Request JWT.

| Consent includes | Scope in Request JWT |
|-----------------|----------------------|
| Payment only (no account permissions) | `payments openid` |
| Payment **with** `ReadAccountsBasic`, `ReadAccountsDetail`, or `ReadBalances` | `accounts payments openid` |

::: warning
If account-reading permissions are present in `authorization_details` but `accounts` is omitted from the scope, the Authorization Server will issue a token that cannot call the account endpoints — your `GET /accounts` calls will return `403 Forbidden`.
:::



## Requesting the Permissions

Add the `Permissions` array to `authorization_details.consent` in your `/par` request alongside the payment fields:

```json
"authorization_details": [
  {
    "type": "urn:openfinanceuae:service-initiation-consent:v2.1",
    "consent": {
      "ConsentId": "{{unique-guid}}",
      "IsSingleAuthorization": true,
      "ExpirationDateTime": "2026-05-03T15:46:00+00:00",

      "Permissions": [
        "ReadAccountsBasic",
        "ReadAccountsDetail",
        "ReadBalances"
      ],

      "ControlParameters": { /* payment schedule */ },
      "PersonalIdentifiableInformation": "{{encryptedPII}}",
      "PaymentPurposeCode": "ACM"
    }
  }
]
```

And update the scope in your Request JWT:

```typescript
const requestJWT = await buildRequestJWT({
  scope: 'accounts payments openid',  // changed from 'payments openid'
  codeChallenge,
  authorizationDetails,
})
```



## Calling the Account Endpoints

Use the same access token returned after the user authorizes the payment consent.

### GET /accounts — requires `ReadAccountsBasic`

```typescript
const { Data: { Account: accounts } } = await fetch(
  `${LFI_API_BASE}/open-finance/v2.1/accounts`,
  { headers: { Authorization: `Bearer ${access_token}` } }
).then(r => r.json())

const accountId = accounts[0].AccountId
```

### GET /accounts/{AccountId} — requires `ReadAccountsDetail`

```typescript
const { Data: { Account: [account] } } = await fetch(
  `${LFI_API_BASE}/open-finance/v2.1/accounts/${accountId}`,
  { headers: { Authorization: `Bearer ${access_token}` } }
).then(r => r.json())

// account.Account[0].Identification — the IBAN
```

### GET /accounts/{AccountId}/balances — requires `ReadBalances`

```typescript
const { Data: { Balance } } = await fetch(
  `${LFI_API_BASE}/open-finance/v2.1/accounts/${accountId}/balances`,
  { headers: { Authorization: `Bearer ${access_token}` } }
).then(r => r.json())

// Balance[0].Amount.Amount — available balance
// Balance[0].CreditDebitIndicator — 'Credit' or 'Debit'
```



## Relationship to Bank Data Sharing

These permissions follow the same permission model as [Bank Data Sharing](../../tech/tpp-standards/v2.1/banking/data-sharing/api-guide) but are scoped to the payment context:

- Access **expires when the payment consent expires**.
- Access is **limited to the accounts the user authorized** at the LFI.
- Only these three account endpoints are available — no transactions, beneficiaries, statements, or other sub-resources.

If you need access to the full range of account data, create a separate Bank Data Sharing consent.
