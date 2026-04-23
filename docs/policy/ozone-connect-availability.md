---
next: false
prev: false
readTime: "6 min"
updated: "2026-04-22"
---

# Ozone Connect Availability Policy

## Applies to:

- **Licensed Financial Institutions (LFIs)**
- **Nebras**

## Purpose

This policy sets the availability standard that LFIs are expected to deliver for their Ozone Connect endpoints — the LFI-operated services that the API Hub calls to fulfil TPP requests.

Open Finance in the UAE can only deliver value to customers if the underlying services are consistently available. TPPs build products on the assumption that account information and payment services can be relied upon; when an LFI's services are unavailable, customers experience outages that undermine trust in Open Finance as a whole.

This policy defines the availability expected of LFIs, the way availability is observed across the ecosystem, and the communication, remediation, and governance processes that apply when availability falls short.

## Scope

This policy applies to all Ozone Connect endpoints operated by an LFI in production, across every API family the LFI has enabled (Bank Data, Service Initiation, Confirmation of Payee, Insurance, FX, Account Opening, ATM, and any future additions).

It does not apply to:

- Sandbox or non-production environments
- Downtime caused by the API Hub, the TPP, or the broader internet
- Downtime caused by upstream payment rails (for example Aani) where the issue is demonstrably outside the LFI's control

## Availability Target

Each LFI is expected to deliver **99.5% availability** across its Ozone Connect endpoints, measured per calendar month. This equates to no more than approximately 3 hours and 39 minutes of downtime per month — enough headroom to absorb planned releases and genuinely unforeseen issues, while still delivering a reliable service to customers and TPPs.

This target aligns with the end-to-end availability benchmark published in the Availability, Performance and Usage Benchmarks standard. In practice, because the API Hub itself is engineered for very high availability, the LFI's Ozone Connect availability is the dominant factor in the end-to-end figure. Meeting this target reliably is what allows the ecosystem as a whole to meet the published benchmark.

### How unavailability is defined

A request to Ozone Connect is treated as a failure where:

- Ozone Connect returns a 5xx response
- The TLS connection cannot be established
- The response is not received within the API Hub's upstream timeout
- Ozone Connect rejects valid Hub traffic below the capacity the LFI has agreed to sustain

Client errors (4xx responses attributable to the TPP or to an invalid request) are not counted against availability.

Partial outages count. An outage affecting only `POST /payments`, only one API family, or only a subset of TPPs is still an outage for the purposes of this policy.

## Live proving before go-live

Before an LFI is signed off as compliant with this policy and approved to go live on the ecosystem, the LFI must complete a **live proving period** with one or more TPPs.

- During the proving period, the LFI operates its Ozone Connect endpoints against real TPP traffic in production.
- The 99.5% availability target defined in this policy must be demonstrably met over the proving period.
- Nebras reviews the results and confirms, or withholds, sign-off before the LFI is approved for general availability.

An LFI that does not meet the target during proving remains in proving until it does, with Nebras support where required. This requirement applies equally to initial go-live and to any subsequent major version go-live.

## Monitoring, Reporting, and Intervention

Nebras actively monitor every LFI's Ozone Connect availability in real time, using the API Hub's own logs of every request made to the LFI. Availability is tracked continuously, per endpoint, against the 99.5% target. There is no need for LFIs to self-report, and no LFI operates outside Nebras's view.

Each LFI's current and historical availability is made available through the Nebras portal:

- **Daily** — for operational awareness, showing the prior 24 hours per endpoint
- **Monthly** — as the formal record against which the 99.5% target is assessed
- **On demand** — where Nebras or the LFI needs to investigate a specific incident

LFIs are expected to review these reports, reconcile them against their own internal monitoring, and raise any disputes with Nebras within **five business days** of publication. Reports not disputed within this window are treated as agreed.

Where an LFI falls below the 99.5% target in any calendar month, or where the monitoring surfaces a pattern of repeated incidents, Nebras will engage directly with the LFI to understand the underlying causes and agree a remediation plan. This engagement may include:

- A formal review meeting between Nebras and the LFI's engineering and operations leadership
- A written remediation plan, agreed with Nebras, setting out specific actions, owners, and target dates
- Enhanced reporting — typically weekly — until the LFI is consistently meeting the target
- Escalation to the relevant regulatory authority where non-compliance is persistent or where the interests of customers or TPPs require it

Nebras will act proportionately. A single month below target that is attributable to a well-understood, remediated incident will normally require only a post-incident review. Repeated shortfalls, or shortfalls without a credible remediation plan, will attract progressively firmer engagement.

## Incident Communication

Timely, clear communication during incidents is as important as the underlying availability. The following expectations apply whenever an LFI experiences — or becomes aware it is about to experience — an availability incident.

### Severity definitions

| Severity | Description |
|---|---|
| **P1** | Complete outage of an API family, or degradation affecting at least 25% of requests, or any unavailability of payment execution |
| **P2** | Degradation of a single endpoint or API family not meeting the P1 threshold |
| **P3** | Isolated issues affecting a limited number of TPPs or a narrow set of requests |

### LFI obligations during an incident

When an incident occurs, the LFI is expected to:

1. **Acknowledge the incident promptly.** For P1 incidents, acknowledgement is expected within **15 minutes** of the LFI becoming aware. For P2, within **1 hour**. For P3, within the next business day.
2. **Notify Nebras through the agreed channel.** Nebras operates a dedicated incident channel for each LFI; incidents are not to be reported by email alone.
3. **Provide regular status updates.** For P1 incidents, updates at least every **30 minutes** until service is restored. For P2, at least every **2 hours**.
4. **Declare the incident resolved** only once service has been stable for a reasonable observation period (typically 15 minutes for P1, 30 minutes for P2).

Nebras takes responsibility for cascading incident information to affected TPPs through its own communication channels. LFIs are not expected to communicate directly with TPPs during incidents.

### Post-incident review

For every P1 incident — and for any P2 incident that recurs within 30 days — the LFI is expected to provide a post-incident review to Nebras within **five business days** of resolution. The review should cover:

- A factual timeline of the incident
- The root cause
- The customer and TPP impact
- The remediation already applied
- Any further actions the LFI will take to prevent recurrence, with owners and dates

Nebras may share anonymised learnings from post-incident reviews across the ecosystem where doing so would help other LFIs avoid similar issues.

## Planned Maintenance

LFIs are expected to deliver changes to their production services without downtime wherever possible. Where planned downtime is genuinely unavoidable:

- Nebras and TPPs must be notified through the Nebras portal at least **72 hours in advance**
- The maintenance window must fall during a low-traffic period, typically between **02:00 and 05:00 Gulf Standard Time**
- The window must be kept as short as the change requires

Planned maintenance is not excluded from the availability calculation. Downtime during an announced maintenance window still counts toward the LFI's monthly availability figure. This is deliberate: the policy is intended to encourage investment in zero-downtime deployment practices, not to create a permitted quota of offline time.

## Continuous Improvement

Meeting the 99.5% target is a minimum expectation rather than an aspiration. LFIs are expected to treat availability as an ongoing discipline and, in particular, to:

- Track recurring causes of unavailability and address them at source
- Review monthly availability reports with their engineering and operations leadership
- Invest in the monitoring, alerting, and on-call capabilities required to detect and recover from incidents quickly
- Participate in ecosystem-wide reviews convened by Nebras to share practices and identify common causes of unavailability

---

This policy is read alongside:

- The [Ozone Connect Response Time Policy](/policy/ozone-connect-response-time)
- The [Ozone Connect Data Quality Policy](/policy/ozone-connect-data-quality)
