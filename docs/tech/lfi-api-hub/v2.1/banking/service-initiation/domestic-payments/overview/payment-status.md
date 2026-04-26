---
next: false
prev: false
aside: false
---

🕒 **7 minute read**

<script setup>
import APIFlowViewer from '/components/APIFlowViewer.vue'
import AaniStatusMapping from '/components/APIFlows/AaniStatusMapping.vue'
import FtsStatusMapping from '/components/APIFlows/FtsStatusMapping.vue'
</script>

# Payment Status

Every domestic payment initiated through the API Hub is executed in one of three modes: **intra-bank** (both debtor and creditor accounts are held at your LFI, so no rail is used), or one of the two domestic payment rails — **AANI** (the UAE's instant payment rail) and **UAEFTS** (the UAE Funds Transfer System). Your LFI is the only party that sees the raw execution outcome, so your LFI MUST map that outcome to an Open Finance payment status and propagate it to the Hub via the Consent Manager Payment Log.

This page covers both concerns: how your LFI selects an execution mode, and how outcomes from each mode map to Open Finance statuses. For the consent lifecycle, see the [Consent Manager](/tech/lfi-api-hub/v2.1/api-hub/consent-manager/) section.

## Open Finance payment statuses

The Open Finance payment status enum is defined in the [Ozone Connect Bank Service Initiation OpenAPI](/tech/lfi-api-hub/v2.1/banking/service-initiation/open-api/payments) and aligns with ISO 20022 `ExternalPaymentTransactionStatus1Code`. Six values are in scope:

| Open Finance status | ISO 20022 | Meaning |
| --- | --- | --- |
| `Pending` | `PDNG` | Payment accepted for processing; further checks or rail submission outstanding |
| `AcceptedSettlementCompleted` | `ACSC` | Settlement of the debtor account has been completed — a payment-processing state |
| `AcceptedWithoutPosting` | `ACWP` | The receiving bank has accepted the payment but your LFI cannot confirm the creditor account has been credited — a settlement state |
| `AcceptedCreditSettlementCompleted` | `ACCC` | The creditor account has been credited with the funds of the payment |
| `Rejected` | `RJCT` | The payment was rejected, either pre-rail by your LFI or post-rail by AANI / UAEFTS |

`Pending` is the initial status your Ozone Connect [`POST /payments`](/tech/lfi-api-hub/v2.1/banking/service-initiation/open-api/payments) response returns — your LFI does **not** PATCH a payment to `Pending`. PATCH is only used to transition away from `Pending` to a terminal status. The statuses your LFI PATCHes for a domestic payment are therefore `AcceptedWithoutPosting`, `AcceptedCreditSettlementCompleted`, and `Rejected`. `AcceptedSettlementCompleted` is available in the enum but is rarely written in isolation on AANI or UAEFTS, where debtor settlement and the receiving-side outcome resolve in a single rail response.

::: info Received status
The Open Finance enum also includes a sixth value, `Received` (ISO 20022 `RCVD`), used only for bulk and batch payments where the Hub acknowledges receipt of a file of instructions before processing individual payments. Bulk and batch payments are not yet documented in v2.1 — for the domestic single and multi-payments covered by this page, you can ignore `Received`.
:::

Once a payment reaches a terminal status (`AcceptedWithoutPosting`, `AcceptedCreditSettlementCompleted`, or `Rejected`), your LFI MUST NOT transition it to a different value.

## Rail selection

Your LFI is responsible for choosing the execution mode for every domestic payment. The API Hub does not select a rail on your behalf, and the TPP and PSU are not involved in the decision. Apply the following logic on receipt of `POST /payments`:

1. **Intra-bank** — if both the debtor and creditor accounts are held at your LFI, execute the payment internally. No rail is used, and your LFI has end-to-end visibility of both legs.
2. **AANI** — otherwise, submit the payment to AANI as the primary rail whenever the receiving bank and receiving account are reachable on AANI.
3. **UAEFTS** — if AANI is unavailable or the receiving bank cannot receive via AANI, fall back to UAEFTS. The fall-back is automatic and MUST NOT require TPP or PSU intervention.

Your LFI MUST only reject a payment pre-rail for reachability reasons once both rails have been ruled out — that is, when the receiving bank is reachable on neither AANI nor UAEFTS. Set `RejectReasonCode.Code = LFI.<reasonCode>` (for example, `LFI.CreditorBankNotReachable`).

## Intra-bank payments

When the debtor account and creditor account are both held at your LFI, there is no interbank rail involved — the payment is executed by an internal debit-and-credit within your core banking system. Your LFI has full visibility of both legs, so the payment can reach the most specific Open Finance terminal status: `AcceptedCreditSettlementCompleted`.

The events that trigger a PATCH are:

| Intra-bank outcome | New Open Finance status | Notes |
| --- | --- | --- |
| Debtor debit and creditor credit both posted | `AcceptedCreditSettlementCompleted` | Terminal for intra-bank — your LFI knows the funds have definitely landed in the creditor account |
| Internal rejection (screening, insufficient funds, account state, etc.) | `Rejected` | Set `RejectReasonCode.Code` to `LFI.<reasonCode>` — there is no rail namespace to fall back to |

Intra-bank payments have no `paymentTransactionId` assigned by a rail. If your internal core assigns an end-to-end reference, you MAY include it as `paymentTransactionId`; otherwise omit the field.

## AANI status mapping

<APIFlowViewer title="AANI status mapping">
  <AaniStatusMapping/>
</APIFlowViewer>

AANI is the UAE's instant payment rail. An AANI payment either clears to terminal success within seconds and returns a positive **Account Verification Response** (an ISO 20022 `pacs.002` message with an accepted status), or is rejected by the receiving bank with an AANI Reject Reason Code drawn from the AANI Core Service Interface Specification.

While the payment is in flight to AANI and awaiting a response, the status remains `Pending` — your LFI does not need to PATCH anything until the AANI response arrives. The events that trigger a PATCH are:

| AANI response | New Open Finance status | Notes |
| --- | --- | --- |
| Positive Account Verification Response (`pacs.002` accepted) | `AcceptedWithoutPosting` | Terminal for AANI |
| `pacs.002` rejection | `Rejected` | Set `RejectReasonCode.Code` to `AANI.<reasonCode>` (for example `AANI.AM04`) |

::: warning
`AcceptedWithoutPosting` is the terminal status for successful AANI payments. Your LFI MUST NOT infer `AcceptedCreditSettlementCompleted` from an AANI Account Verification Response — AANI does not confirm credit posting at the receiving bank to the originating LFI.
:::

Once AANI assigns an end-to-end transaction identifier, include it as `paymentTransactionId` on the next `PATCH /payment-log/{paymentId}`. Once set, `paymentTransactionId` MUST NOT change.

### Illustrative AANI Reject Reason Codes

The full list of 40 codes is maintained in the AANI Core Service Interface Specification. The codes you will see most often are:

| AANI code | Meaning |
| --- | --- |
| `AC06` | Blocked Account |
| `AC07` | Closed Creditor Account Number |
| `AM04` | Insufficient Funds |
| `AM14` | Amount Exceeds Agreed Limit |
| `UCRD` | Unknown Creditor |

Your LFI MUST relay the code in the `AANI.` namespace — `AANI.AM04` — without transposing it to a different namespace. Where Open Finance defines a Prescriptive Error Code for the underlying condition (e.g. `Consent.TransientAccountAccessFailure`), prefer the prescriptive code.

## UAEFTS status mapping

<APIFlowViewer title="UAEFTS status mapping">
  <FtsStatusMapping/>
</APIFlowViewer>

UAEFTS is the UAE Funds Transfer System, the Central Bank of the UAE's domestic interbank funds transfer rail. UAEFTS carries payment messages using the ISO 20022 `pacs.008` schema and returns the following acknowledgements:

- **ACK** — UAEFTS has accepted the message after technical validation
- **NAK** — UAEFTS has rejected the message with an FTS reason code
- **CB900** — Debit Confirmation: settlement through the Central Bank has completed, the debtor account has been debited, and the corresponding credit to the receiving bank has been settled

Because UAEFTS settles through the Central Bank as a centralised interbank clearing, a CB900 implicitly confirms that the creditor side of the payment has been settled as well. The terminal successful status for a UAEFTS payment is therefore `AcceptedCreditSettlementCompleted`.

ACK on its own is technical acceptance within the `Pending` state — it does **not** trigger a PATCH, and the payment remains `Pending` until CB900 or NAK arrives. The events that trigger a PATCH are:

| UAEFTS response | New Open Finance status | Notes |
| --- | --- | --- |
| CB900 Debit Confirmation | `AcceptedCreditSettlementCompleted` | Terminal for UAEFTS |
| NAK received | `Rejected` | Set `RejectReasonCode.Code` to `FTS.<reasonCode>` |

## Rejection code prefixes

Every `Rejected` status carries a `RejectReasonCode[]` array. The first segment of each `Code` is a namespace that identifies **where** the rejection originated:

| Rejected by | `RejectReasonCode.Code` prefix | Example |
| --- | --- | --- |
| LFI — pre-rail screening (fraud, sanctions, account state, insufficient funds) or an intra-bank payment that never reaches a rail | `LFI.` | `LFI.InsufficientFunds` |
| AANI | `AANI.` | `AANI.AC06` |
| UAEFTS | `FTS.` | `FTS.AC06` |

::: danger
Your LFI MUST NOT transpose a rail-originated reason code into the `LFI.` namespace, and MUST NOT transpose an LFI-originated rejection into an `AANI.` or `FTS.` namespace. The prefix is critical for TPP diagnostics and downstream reconciliation.
:::

The `LFI.` namespace is correct in two cases: when your LFI has rejected an interbank payment **before** it reaches AANI or UAEFTS, and when an intra-bank payment is rejected internally (since no rail is ever involved). Once a payment has been submitted to AANI or UAEFTS, any subsequent rejection MUST carry the `AANI.` or `FTS.` prefix respectively, even if your LFI observed the failure first.

Where a Prescriptive Error Code is defined (e.g. `Consent.TransientAccountAccessFailure`), prefer the prescriptive code over a raw rail code. The OpenAPI `RejectReasonCode.Code` pattern `^[A-Za-z]+\.[A-Za-z0-9]+$` allows either.

## Propagating status to the Hub

The initial `Pending` status is set by the 201 response your Ozone Connect `POST /payments` endpoint returns — no PATCH is required at that point.

### What your LFI MUST PATCH

Your LFI MUST PATCH the **terminal** Open Finance status for the payment — `AcceptedWithoutPosting`, `AcceptedCreditSettlementCompleted`, or `Rejected` as appropriate for the execution mode. This is the only mandatory PATCH in the lifecycle.

### What your LFI MAY PATCH

If your LFI observes an intermediate execution event that cleanly maps to an Open Finance status other than the terminal one — for example, debtor-account settlement (`AcceptedSettlementCompleted`) on a rail or internal path that exposes it — your LFI MAY PATCH that intermediate status. It is not a requirement, and the Hub will relay whichever statuses it receives to the TPP.

Tables in the AANI, UAEFTS, and intra-bank sections above list the events you SHOULD PATCH. Additional intermediate PATCHes are permitted provided every status you PATCH is a valid Open Finance status value and the ordering respects the lifecycle (you cannot PATCH back from a terminal status).

### How to PATCH

On each PATCH-triggering event, your LFI MUST immediately:

1. Map the outcome to the new Open Finance status.
2. Call [`PATCH /payment-log/{paymentId}`](/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/payment-log) on the API Hub Consent Manager with the new `status`, a current `statusUpdateDateTime`, `paymentTransactionId` (once assigned by the rail, if applicable), and any `rejectReasonCode`.
3. Update the response your Ozone Connect [`GET /payments/{paymentId}`](/tech/lfi-api-hub/v2.1/banking/service-initiation/open-api/payments) endpoint returns so that push and pull views of the payment are consistent.

Your LFI MUST NOT batch status updates or defer them waiting for TPP polling. The Hub relays the new status to the TPP via webhook events as soon as it receives the PATCH.

### Example PATCH body

```json
{
  "data": {
    "paymentId": "pmt-20260418-00023",
    "consentId": "cns-20260418-00011",
    "paymentTransactionId": "AANI-TX-7F4D0C1E",
    "status": "AcceptedWithoutPosting",
    "statusUpdateDateTime": "2026-04-18T10:14:22.845Z"
  }
}
```

### Example rejected PATCH body

```json
{
  "data": {
    "paymentId": "pmt-20260418-00023",
    "consentId": "cns-20260418-00011",
    "status": "Rejected",
    "statusUpdateDateTime": "2026-04-18T10:14:22.845Z",
    "rejectReasonCode": [
      {
        "code": "AANI.AM04",
        "message": "Insufficient funds at the receiving bank"
      }
    ]
  }
}
```
