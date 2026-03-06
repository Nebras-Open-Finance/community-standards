---
prev: false
next: false
aside: false
---

# Payment Status

After a payment is submitted, its status progresses through a defined lifecycle. TPPs must poll `GET /payments/{PaymentId}` to track progress, or subscribe to payment status event notifications where supported.



## Status Values

| Status | Description |
|--------|-------------|
| `Pending` | The payment has been received by the LFI and is queued for processing. No settlement activity has started yet. |
| `AcceptedSettlementInProcess` | The payment has been accepted by the LFI and submitted to the payment rail. Settlement is in progress. |
| `AcceptedSettlementCompleted` | The payment has been fully settled. Funds have been transferred to the creditor. This is the final successful state. |
| `Rejected` | The payment was rejected — either by the LFI during validation or by the payment rail during processing. The payment will not be retried automatically. |



## Status Transitions

```
Pending
  └─→ AcceptedSettlementInProcess
        ├─→ AcceptedSettlementCompleted   (success)
        └─→ Rejected                      (failure)
  └─→ Rejected                            (immediate rejection)
```

A payment that reaches `Rejected` at any point will not be re-submitted. If the user needs to retry, the TPP must initiate a new payment.



## Rejection Reasons

A payment may be rejected for a range of reasons, including:

- Insufficient funds in the debtor account
- Account details that fail Confirmation of Payee validation
- The payment exceeds AANI scheme limits
- The creditor account is inactive, blocked, or does not accept the payment type
- The LFI's fraud or risk controls declined the payment

The API response to `GET /payments/{PaymentId}` includes a `StatusReason` field when the payment has been rejected. TPPs should surface a meaningful message to the user where the reason is actionable (for example, insufficient funds) and log the full reason for diagnostic purposes.



## Polling Guidance

Payment status can change asynchronously — particularly for payments routed via AANI where processing happens in seconds, or via FTS where settlement follows a cut-off window.

TPPs should:

1. Poll `GET /payments/{PaymentId}` shortly after the payment is submitted to catch immediate rejections
2. Continue polling at a reasonable interval (e.g. every few seconds initially, backing off over time) until a terminal state is reached
3. Treat `AcceptedSettlementCompleted` and `Rejected` as terminal — no further status changes will occur

::: tip Event notifications
Where supported by the LFI, subscribing to payment status event notifications is preferable to polling. Events provide lower-latency status updates and reduce load on both sides.
:::

See [GET /payments/{PaymentId}](/tech/tpp-standards/v2.1/banking/service-initiation/open-api/payments-PaymentId) for the full response schema.
