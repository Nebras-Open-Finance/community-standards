---
prev: false
next: false
aside: false
---

🕒 **5 minute read**

<script setup>
import APIFlowViewer from '/components/APIFlowViewer.vue'
import TPPPaymentStatus from '/components/APIFlows/TPPPaymentStatus.vue'
</script>

# Payment Status

Every domestic payment initiated through the API Hub is executed by the LFI in one of three modes: **intra-bank** (both debtor and creditor accounts are held at the same LFI, so no rail is used), **AANI** (the UAE's instant payment rail, used as the primary interbank rail), or **UAEFTS** (the UAE Funds Transfer System, used as the fallback interbank rail). Your TPP does not select the execution mode — the LFI owns that decision.

Your TPP receives status updates for every payment through two complementary mechanisms: **event notifications** (the Hub pushes a webhook to your registered endpoint each time status changes) and **polling** (`GET /payments/{paymentId}` on the API Hub). This page covers how to receive status, what each status means, and which statuses you can expect for each execution mode.

## How your TPP receives payment status

<APIFlowViewer title="Payment status retrieval">
  <TPPPaymentStatus/>
</APIFlowViewer>

### Event notifications (recommended)

When your consent is created with `subscription.Webhook.IsActive: true` and a registered `Webhook.Url`, the API Hub pushes a Payment Status Event to your endpoint each time the LFI PATCHes a new status to the Hub. Events are delivered as JWE-encrypted POST requests signed with your registered Encryption Certificate. Your TPP MUST respond with `202 Accepted` immediately and decrypt the payload asynchronously.

Event notifications are the recommended mechanism — they provide the lowest latency and remove the need for your TPP to poll. See the [Payment Status Event API Guide](/tech/tpp-standards/v2.1/webhooks/payment-status/api-guide) for the full event shape, encryption requirements, and retry semantics.

### Polling (fallback)

Your TPP MAY instead call [`GET /payments/{paymentId}`](/tech/tpp-standards/v2.1/banking/service-initiation/open-api/payments-PaymentId) on the API Hub to retrieve the current status on demand. Polling is appropriate when:

- Your TPP has not registered a webhook endpoint for this consent.
- You need to reconcile a missed or late event.
- You want to confirm the authoritative status before acting on an event payload.

When polling, start shortly after `POST /payments` to catch immediate pre-rail rejections, back off as time passes, and stop polling once the payment reaches a terminal status (`AcceptedWithoutPosting`, `AcceptedCreditSettlementCompleted`, or `Rejected`).

## Open Finance payment statuses

The Open Finance payment status enum aligns with ISO 20022 `ExternalPaymentTransactionStatus1Code`. Five values are relevant for domestic payments:

| Open Finance status | ISO 20022 | Meaning | Terminal? |
| --- | --- | --- | --- |
| `Pending` | `PDNG` | Payment accepted for processing; rail submission or internal execution outstanding. This is the initial status returned in the `POST /payments` response | No |
| `AcceptedSettlementCompleted` | `ACSC` | Settlement of the debtor account has been completed. Indicates progression but does not guarantee the creditor side is complete | No |
| `AcceptedWithoutPosting` | `ACWP` | The receiving bank has accepted the payment; the originating LFI cannot confirm that the credit has posted to the creditor account | Yes (on AANI) |
| `AcceptedCreditSettlementCompleted` | `ACCC` | The creditor account has been credited with the funds of the payment | Yes (on UAEFTS and intra-bank) |
| `Rejected` | `RJCT` | The payment was rejected, either pre-rail by the LFI or post-rail by AANI or UAEFTS | Yes |

::: info Received status
The Open Finance enum also includes `Received` (ISO 20022 `RCVD`), used only for bulk and batch payments where the Hub acknowledges receipt of a file of instructions. Bulk and batch payments are not yet documented in v2.1 — for the domestic single and multi-payments covered by this page, you can ignore `Received`.
:::

Once a payment reaches a terminal status (`AcceptedWithoutPosting`, `AcceptedCreditSettlementCompleted`, or `Rejected`), its status will not change again.

## Rail selection and the statuses you can expect

The LFI selects the execution mode on receipt of each `POST /payments`. The rule is:

1. **Intra-bank** — if both the debtor and creditor accounts are held at the same LFI, the payment is executed internally without a rail.
2. **AANI** — otherwise, the LFI submits the payment to AANI whenever the receiving bank and account are reachable on AANI.
3. **UAEFTS** — if AANI is unavailable or cannot reach the receiving bank, the LFI falls back to UAEFTS. The fall-back is automatic; your TPP and the PSU are not involved.

If neither rail can reach the receiving bank, the LFI rejects the payment pre-rail before ever submitting it. The status set your TPP should expect depends on which mode the LFI chose:

### Intra-bank

Both accounts are at the same LFI, so the LFI has full visibility of both legs and can confirm the creditor has been credited.

- **Success path**: `Pending` → `AcceptedCreditSettlementCompleted`
- **Rejection path**: `Pending` → `Rejected` (with `LFI.<reasonCode>`)

### AANI

AANI is the UAE's instant payment rail. It settles within seconds and returns either a positive Account Verification Response (the receiving bank has accepted) or a rejection. AANI does not expose a credit-posting signal to the originating LFI, so the terminal successful status is `AcceptedWithoutPosting` rather than `AcceptedCreditSettlementCompleted`.

- **Success path**: `Pending` → `AcceptedWithoutPosting`
- **Rejection path**: `Pending` → `Rejected` (with `AANI.<reasonCode>`)

### UAEFTS

UAEFTS is the UAE Funds Transfer System, operated by the Central Bank. It carries payments over ISO 20022 `pacs.008` messaging and settles through the Central Bank as a centralised interbank clearing. Because settlement is centralised, the CB900 Debit Confirmation implicitly confirms the creditor side, so the terminal successful status is `AcceptedCreditSettlementCompleted`.

- **Success path**: `Pending` → (optionally `AcceptedSettlementCompleted`) → `AcceptedCreditSettlementCompleted`
- **Rejection path**: `Pending` → `Rejected` (with `FTS.<reasonCode>`)

## Rejection reason codes

When a payment is rejected, the `RejectReasonCode[]` array on the payment resource carries a namespaced `Code`. The first segment identifies where the rejection originated:

| Prefix | Source | Example |
| --- | --- | --- |
| `LFI.` | The LFI rejected the payment pre-rail (fraud, sanctions, account state, insufficient funds) or rejected an intra-bank payment that never reached a rail | `LFI.InsufficientFunds` |
| `AANI.` | AANI rejected the payment on-rail | `AANI.AC06` |
| `FTS.` | UAEFTS rejected the payment on-rail | `FTS.AC06` |

The API Hub relays `RejectReasonCode.Code` to your TPP verbatim — it does not remap rail codes into a different namespace. Your TPP SHOULD surface an actionable message to the PSU where the underlying reason is recoverable (for example, insufficient funds), and SHOULD log the full code and message for diagnostic purposes.

### Illustrative AANI Reject Reason Codes

The authoritative list of AANI reason codes is published in the AANI Core Service Interface Specification. The codes you will see most often are:

| AANI code | Meaning |
| --- | --- |
| `AC06` | Blocked Account |
| `AC07` | Closed Creditor Account Number |
| `AM04` | Insufficient Funds |
| `AM14` | Amount Exceeds Agreed Limit |
| `UCRD` | Unknown Creditor |

Where Open Finance defines a Prescriptive Error Code for the underlying condition (for example, `Consent.TransientAccountAccessFailure`), the LFI MAY substitute the prescriptive code in place of the raw rail code. Your TPP SHOULD be prepared to handle either form.
