---
prev: false
next: false
aside: false
---

# Production Live Proving

Once all certification requirements have been met, TPPs enter the **Production Proving Phase** — a controlled live period where the TPP's integration is validated against real production infrastructure before being opened to all customers and LFIs.



## The Buddying Phase

During Production Proving, each TPP is paired with a small set of **buddy LFIs** (Authorization Servers). Testing in production is restricted to these buddied LFIs only — the TPP must not make production requests to any LFI or Authorization Server outside of its assigned buddy set during this phase.

This pairing allows the TPP to validate its end-to-end use case in a controlled real-world environment, with LFI teams available to support and investigate any issues that arise.

**Expected duration:** 2 weeks to 1 month, depending on the complexity of the integration and the number of use cases being validated.

::: info Only test users during live proving
During the buddying phase, all testing must be conducted using **test users only**. Real customer accounts must not be used until go-live approval has been granted.
:::



## Commercial Model

The Production Proving Phase is **non-commercial**. None of the following apply until go-live approval is granted:

- API Hub fees
- LFI-to-TPP fees
- TPP-to-LFI commissions
- Any other commercial charges

All commercial terms take effect only once Nebras grants go-live approval.



## Applying for Go-Live

Once the TPP is satisfied that live proving has been completed successfully, it can apply to Nebras for **go-live sign-off**.

Go-live approval allows the TPP to:

- Work with all production LFIs, not just the buddied set
- Open their service to all customers
- Operate under the full commercial model

Nebras will review the TPP's live proving activity before granting approval.



## Onboarding New LFIs After Go-Live

Given the nature of Open Finance integrations — where each LFI operates its own Authorization Server with its own configuration, supported account types, and capabilities — **each new LFI a TPP onboards requires its own validation period**. TPPs should expect to spend time confirming that a newly integrated LFI behaves as expected for their use case before directing live customer traffic to it. This should be factored into integration and release planning.
