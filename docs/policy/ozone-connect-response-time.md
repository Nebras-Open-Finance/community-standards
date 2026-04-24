---
next: false
prev: false
readTime: "7 min"
updated: "2026-04-22"
---

# Ozone Connect Response Time Policy

## Applies to:

- **Licensed Financial Institutions (LFIs)**
- **Nebras**

## Purpose

This policy sets the response time expectations that LFIs are expected to meet for their Ozone Connect endpoints — the LFI-operated services that the API Hub calls to fulfil TPP requests.

Response time is what customers actually feel. A customer checking their balance inside a TPP app, confirming a payee before sending money, or authorising a payment expects the experience to feel immediate. Every additional second of latency translates directly into abandoned payments, failed checkouts, and a worse impression of Open Finance. For payment execution in particular, slow responses create ambiguity about whether a payment succeeded, which is one of the most damaging experiences a customer can have with a financial service.

This policy defines the response times expected of LFIs, how those times are observed across the ecosystem, and the communication, remediation, and governance processes that apply when performance falls short.

## Scope

This policy applies to all Ozone Connect endpoints operated by an LFI in production, across every API family the LFI has enabled.

It does not apply to:

- Endpoints operated by the API Hub itself (such as consent reads, authorisation, and token endpoints)
- Sandbox or non-production environments
- Latency attributable to the API Hub, the TPP, or the broader internet
- The time taken by the LFI to complete fraud, sanctions, and compliance screening of a payment after the API response has been returned
- The time taken by the underlying payment rail to process and settle a payment (for example Aani), which is governed by the applicable scheme rules
- The time a customer spends completing authentication at the LFI — this is measured separately under the Consent Journey requirements

## Response Time Target

Each LFI is expected to meet a **p95 response time of 500 ms or better** for its Ozone Connect endpoints, measured per calendar day per endpoint.

This applies uniformly across every Ozone Connect endpoint an LFI exposes. A single target keeps the policy simple for LFIs to reason about and monitor, and reflects the reality that customers expect comparable responsiveness whether they are checking a balance, retrieving transactions, confirming a payee, or initiating a payment consent.

Ozone Connect endpoints covered by this policy include, for example:

- **Bank Data Sharing** — `GET /accounts`, `GET /accounts/{accountId}/balances`, `GET /accounts/{accountId}/transactions`, `GET /accounts/{accountId}/standing-orders`, `GET /accounts/{accountId}/beneficiaries`, and the other account-scoped reads in the bank data sharing API
- **Service Initiation** — `POST /payments`, `POST /payment-consents`, `POST /payment-consents/{consentId}/file`, `POST /payment-consents/{consentId}/refund`, `GET /payments/{paymentId}`
- **Confirmation of Payee** — `POST /customers/action/cop-query`
- **Products and Leads** — `GET /products`, `POST /leads`
- **Insurance, FX, Account Opening, ATM, User Operations, and Consent Events** — all endpoints exposed under the corresponding Ozone Connect API families

Endpoints operated by the API Hub (for example `/account-access-consents`, `/payment-consents` at the Hub, and the authorisation and token endpoints) are outside the scope of this policy.

This target aligns with the 500 ms average response time published in the Availability, Performance and Usage Benchmarks standard. Holding each Ozone Connect endpoint to this p95 figure — rather than only an average — ensures that the customer experience remains consistent across the long tail of requests, not just on average.

### What the response time target covers for payments

For `POST /payments`, the 500 ms target applies to the Ozone Connect API response — the point at which the LFI acknowledges that the payment request has been received and accepted for onward processing. It does not require the LFI to have completed screening or settlement within 500 ms. Payment processing spans three distinct phases, each with its own expectation:

1. **API response — 500 ms p95, governed by this policy.**
   The LFI acknowledges the payment request and returns an initial payment status. This is the point at which the TPP knows the request is in the LFI's hands and can show the customer an appropriate in-progress state.

2. **Fraud, sanctions, and compliance screening — up to 3 seconds.**
   Screening runs after the API response has been returned. Once screening is complete, the LFI updates the payment status accordingly, either progressing the payment to the rail or rejecting it with the appropriate reason.

3. **Rail execution — governed by the applicable payment scheme rules.**
   For domestic instant payments this is subject to the Aani scheme rules (3 seconds per payment end-to-end, as set out in the Availability, Performance and Usage Benchmarks standard). The LFI's obligations toward the scheme operator are defined by the scheme and sit outside this policy.

The same structure — fast API acknowledgement followed by asynchronous processing — applies to other service initiation endpoints such as `POST /payment-consents/{consentId}/file` and the refund and FX endpoints. In every case, the 500 ms target in this policy refers only to the API response time; the time taken to complete the underlying business operation is governed separately.

### How response time is measured

Response time is measured as Time to Last Byte (TTLB): the elapsed time from the moment the API Hub issues the request to Ozone Connect until the final byte of the response is received by the Hub. This isolates the LFI's contribution from anything happening on the TPP side or the public internet.

## Live proving before go-live

Before an LFI is signed off as compliant with this policy and approved to go live on the ecosystem, the LFI must complete a **live proving period** with one or more TPPs.

- During the proving period, the LFI operates its Ozone Connect endpoints against real TPP traffic in production.
- The 500 ms p95 response time target defined in this policy must be demonstrably met across all in-scope Ozone Connect endpoints over the proving period.
- Nebras reviews the results and confirms, or withholds, sign-off before the LFI is approved for general availability.

An LFI that does not meet the target during proving remains in proving until it does, with Nebras support where required. This requirement applies equally to initial go-live and to any subsequent major version go-live.

## Monitoring, Reporting, and Intervention

Nebras actively monitor every LFI's Ozone Connect response times in real time, using the API Hub's own logs of every request made to the LFI. Response times are tracked continuously, per endpoint, against the 500 ms p95 target. There is no need for LFIs to self-report, and no LFI operates outside Nebras's view.

Each LFI's current and historical performance is made available through the Nebras portal:

- **Daily** — showing p50, p95, and p99 per endpoint for the prior 24 hours
- **Monthly** — as the formal record against which the 500 ms target is assessed
- **On demand** — where Nebras or the LFI needs to investigate a specific concern

LFIs are expected to review these reports, reconcile them against their own internal monitoring, and raise any disputes with Nebras within **five business days** of publication. Reports not disputed within this window are treated as agreed.

Where an LFI persistently misses the target in this policy — whether through sustained drift or through repeated degradation incidents — Nebras will engage directly with the LFI to understand the underlying causes and agree a remediation plan. "Persistently" is assessed in the round, but typically means any of:

- Missing the 500 ms p95 target for the same endpoint in three consecutive calendar months
- Three or more P1 or P2 degradations in a rolling 90-day window
- Failure to deliver remediation actions agreed in a previous review

Engagement may include:

- A formal review meeting between Nebras and the LFI's engineering and operations leadership
- A written remediation plan, agreed with Nebras, setting out specific actions, owners, and target dates
- Enhanced reporting — typically weekly — until the LFI is consistently within target
- Escalation to the relevant regulatory authority where non-compliance is persistent or where the interests of customers or TPPs require it

Nebras will act proportionately. Isolated breaches with a clear, remediated cause will normally require only a post-incident review. Sustained shortfalls, or shortfalls without a credible remediation plan, will attract progressively firmer engagement.

## Performance Degradation

A sustained breach of the response time target is functionally an incident, even if the service is technically still responding. The following expectations apply whenever an LFI's response times degrade materially against target.

### Severity definitions

| Severity | Description |
|---|---|
| **P1** | Payment execution p95 exceeds 1,000 ms for 15 minutes or more; or any Ozone Connect API family's p95 exceeds 1,500 ms for 15 minutes or more |
| **P2** | p95 for a given Ozone Connect endpoint exceeds 750 ms for 30 minutes or more |
| **P3** | p95 for a given Ozone Connect endpoint drifts above 500 ms without meeting the P2 threshold |

### LFI obligations during degradation

When a P1 or P2 degradation occurs, the LFI is expected to:

1. **Acknowledge the degradation promptly.** For P1, within **15 minutes** of the LFI becoming aware. For P2, within **1 hour**.
2. **Notify Nebras through the agreed incident channel.**
3. **Provide regular status updates.** For P1, at least every **30 minutes** until performance is restored. For P2, at least every **2 hours**.
4. **Declare the degradation resolved** only once performance has been stable within target for a reasonable observation period (typically 30 minutes).

Nebras takes responsibility for cascading status information to affected TPPs through its own communication channels. LFIs are not expected to communicate directly with TPPs during degradation incidents.

### Post-incident review

For every P1 degradation — and for any P2 that recurs within 30 days — the LFI is expected to provide a post-incident review to Nebras within **five business days** of resolution. The review should cover:

- A factual timeline of the degradation
- The root cause, including any capacity, data-growth, or dependency factors
- The customer and TPP impact
- The remediation already applied
- Any further actions the LFI will take to prevent recurrence, with owners and dates

## Continuous Improvement

Meeting the target above is a minimum expectation rather than an aspiration. Customer experience improves continuously as response times fall, and LFIs are expected to treat performance as an ongoing discipline. In particular, LFIs are expected to:

- Track response times against target across every endpoint, not just in aggregate
- Pay attention to trends at p99 even where p95 remains within target, since p99 is an early warning of capacity or data-growth issues
- Review monthly response time reports with their engineering and operations leadership
- Invest in the capacity, caching, and downstream tuning required to keep pace with volume growth
- Participate in ecosystem-wide reviews convened by Nebras to share practices for keeping Open Finance services fast

---

This policy is read alongside:

- The [Ozone Connect Availability Policy](/policy/ozone-connect-availability)
- The [Ozone Connect Data Quality Policy](/policy/ozone-connect-data-quality)
