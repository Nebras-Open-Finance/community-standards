---
next: false
prev: false
aside: false
---

# Payments (Service Initiation)

The Open Finance Payment Service Initiation capabilities enable TPPs to initiate payments on behalf of customers under explicit, consent-driven authorisation. 

All payment initiations operate under explicit customer consent. The TPP requests the consent, the customer authorises it at their LFI, and the TPP may then submit payments within the bounds of what was authorised.

::: info Required role: BSIP
Access to the Payment Service Initiation APIs requires the **BSIP** (Bank Service Initiation Provider) role. This role must be assigned to your application in the Trust Framework before making any payment requests. See [Roles](/tech/tpp-standards/trust-framework/roles) for the full list of scopes and grant types this role permits.

Note - Within payments there is the ability to receive a small amount of data sharing permissions. If your consent includes `ReadAccountsBasic`, `ReadAccountsDetail`, or `ReadBalances`, in order to access this functionality you will also need the **BDSP role**.
:::

<LiveAPIs :families="['payment']" />


### Single Instant Payment

A one-time payment initiated immediately upon consent authorisation. The TPP specifies a fixed creditor account and amount at consent time; the customer authorises and the payment is submitted in a single flow.

Suitable for checkout payments, bill settlement, and any scenario where a single, known amount is being paid to a known recipient.

### Multi-Payment Consents

Multi-payment consents allow a TPP to initiate a series of payments over time under a single customer authorisation. The customer authorises the consent once; the TPP can then submit payments as needed within the rules defined at consent time.

There are several multi-payment consent types, each suited to different use cases:

| Consent Type | Amount | Timing | Creditor |
|---|---|---|---|
| **Variable On Demand** | Variable, within limits | On demand | 1–10 defined, or undefined |
| **Fixed On Demand** | Fixed per-payment | On demand | 1 defined |
| **Variable Periodic Schedule** | Variable per payment | Fixed schedule (1 per period) | 1 defined |
| **Fixed Periodic Schedule** | Fixed per payment | Fixed schedule (1 per period) | 1 defined |
| **Variable Defined Schedule** | Variable per payment | Defined dates | 1 defined |
| **Fixed Defined Schedule** | Fixed per payment | Defined dates | 1 defined |

**On Demand** types let the TPP trigger payments at any time within the consent's period and limits, making them suitable for subscription billing, wallet top-ups, and discretionary recurring charges.

**Periodic Schedule** types enforce exactly one payment per calendar period (e.g. weekly, monthly), making them well suited to regular bills and standing payment arrangements.

**Defined Schedule** types lock payments to specific future dates set at consent time, which is ideal for instalment plans and known future obligations.

### Delegated SCA

Delegated SCA is a variant of multi-payment consent where Strong Customer Authentication is performed by the TPP rather than the LFI. This enables a frictionless in-app payment experience — the customer authenticates once within the TPP's interface, and the LFI accepts that authentication for subsequent payments.

Delegated SCA requires the TPP to hold an explicit delegation from the LFI and is subject to additional requirements. See [Delegated SCA](/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/delegated-sca/requirements) for details.

### Confirmation of Payee

Before submitting a payment, TPPs should verify that the creditor account details provided by the user match the account holder registered at the LFI. Confirmation of Payee reduces the risk of misdirected payments and is a key fraud prevention control.

See [Confirmation of Payee](/tech/tpp-standards/v2.1/banking/confirmation-of-payee/requirements) for requirements and integration guidance.
