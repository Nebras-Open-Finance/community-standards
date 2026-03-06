---
next: false
prev: false
aside: false
---

# Risk

The `Risk` object is a required part of the PII payload at both `POST /par` (consent staging) and `POST /payments` (payment creation). It carries contextual and fraud-indicator data that the LFI uses to assess the risk of the transaction.

Like the rest of the PII, the `Risk` object is encrypted inside the JWE and is only readable by the destination LFI.

## Structure

The `Risk` object contains two sub-objects — one describing the debtor's context and one describing the creditor's context:

```json
{
  "Risk": {
    "DebtorRisk": {
      "PaymentContextCode": "TransferToThirdParty",
      "ContractPresentIndicator": false
    },
    "CreditorRisk": {
      "BeneficiaryAccountType": "Personal"
    }
  }
}
```

## DebtorRisk

Describes the context from the debtor (payer) side of the transaction.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `PaymentContextCode` | enum | Yes | Categorises the payment context — see values below |
| `ContractPresentIndicator` | boolean | No | `true` if a signed contract exists between the payer and payee for this payment |
| `MerchantCategoryCode` | string | No | ISO 18245 merchant category code, if the payment is to a merchant |
| `MerchantCustomerIdentification` | string | No | The TPP's customer identifier at the merchant, if applicable |

### PaymentContextCode values

| Value | Meaning |
|-------|---------|
| `BillPayment` | Payment of a bill (utility, government, etc.) |
| `EcommerceGoods` | Online purchase of physical goods |
| `EcommerceServices` | Online purchase of services |
| `Other` | Payments that do not fit another category |
| `PersonToBusiness` | Person paying a business outside of e-commerce |
| `PersonToMerchant` | Person paying a merchant at point of sale |
| `PersonToPerson` | Transfer between individuals |
| `TransferToThirdParty` | Transfer to a third-party account (e.g., family, friend) |
| `TransferToSelf` | Transfer between the debtor's own accounts |

## CreditorRisk

Describes the context from the creditor (payee) side of the transaction.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `BeneficiaryAccountType` | enum | No | Whether the creditor account is `Personal` or `Business` |
| `BeneficiaryPrepopulatedIndicator` | boolean | No | `true` if the TPP pre-populated the beneficiary details (rather than the user entering them) |
| `DeliveryAddress` | object | No | Postal delivery address for the goods or services, if applicable |

## LFI use of Risk data

The `Risk` fields are informational — they help the LFI apply appropriate transaction monitoring and fraud controls. LFIs may use these fields to:

- Route payments through different internal risk assessment paths
- Apply enhanced scrutiny to high-risk contexts (e.g., large `TransferToThirdParty` payments)
- Flag mismatches between the stated context and the payment details

::: tip Provide accurate Risk data
Supplying accurate and complete `Risk` fields — even optional ones — gives the LFI a clearer picture of the payment context. This can reduce the likelihood of the payment being held for manual review or rejected by the LFI's fraud controls.
:::
