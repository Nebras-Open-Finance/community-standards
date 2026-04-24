---
next: false
prev: false
readTime: "7 min"
updated: "2026-04-22"
---

# Ozone Connect Data Quality Policy

## Applies to:

- **Licensed Financial Institutions (LFIs)**
- **Nebras**

## Purpose

This policy defines the data quality expectations for data returned by an LFI's Ozone Connect endpoints in the UAE Open Finance ecosystem. The value of Open Finance to customers and to the TPPs that serve them depends on the completeness, accuracy, and timeliness of the data they receive. Missing, stale, or inconsistent data breaks TPP use cases, erodes customer trust, and limits the products the ecosystem can support.

This policy sets out what LFIs are expected to deliver, how that delivery is measured, and how Nebras engages with LFIs to improve data quality over time.

## Scope

This policy applies to the **response payloads of Ozone Connect endpoints that return data** — that is, endpoints whose role is to provide information back to the TPP about customers, accounts, products, or services.

In scope, for example:

- Bank Data Sharing reads (`GET /accounts`, `GET /accounts/{accountId}/balances`, `GET /accounts/{accountId}/transactions`, and related endpoints)
- Products and Leads reads (`GET /products`, and the data returned after lead creation)
- Insurance policy and related data reads
- Any future Ozone Connect endpoint whose primary purpose is to return data about a customer, account, product, or service

Out of scope:

- Action and initiation endpoints that do not return domain data (for example `POST /payments`, `POST /customers/action/cop-query`, and similar). These are governed by the [Ozone Connect Availability Policy](/policy/ozone-connect-availability) and the [Ozone Connect Response Time Policy](/policy/ozone-connect-response-time), not this policy.
- Internal system data that is not part of the published Ozone Connect OpenAPI specifications.

Where a data-returning endpoint is involved in a service initiation flow (for example returning payment status data), the data quality expectations in this policy apply to the data fields in the response.

## Data Delivery Expectations

The Ozone Connect OpenAPI specifications define, for each in-scope endpoint, the fields that may appear in a response and which of those fields are required. LFIs are expected to deliver data against those specifications as follows.

### Required fields

Fields marked as required in the Ozone Connect OpenAPI specification **must** be delivered on every response where the endpoint returns data for the relevant resource.

- A required field is required because TPPs and downstream use cases cannot function reliably without it.
- Missing or null required fields are treated as a data quality defect regardless of the underlying cause in the LFI's systems.

### Optional fields

Fields that are optional in the Ozone Connect OpenAPI specification **must** be delivered whenever the underlying data exists in the LFI's systems and can be mapped to the specification.

- "Exists and can be mapped" means the data is held by the LFI in some form, and there is a reasonable mapping from the LFI's internal representation to the specified field.
- LFIs are not expected to invent data they do not hold, but are expected to deliver data they do hold.

### Accuracy

Data returned on in-scope responses **must** match the LFI's system of record. Values that are present must be correct — amounts, identifiers, dates, statuses, names, and every other specified field.

Accuracy is expected across:

- **Field values** — the value returned is the value held in the LFI's systems
- **Units and formats** — currency, precision, date-time format, status enumerations, and identifiers conform to the specification
- **Relationships between fields** — values that relate to one another remain consistent (for example available balance consistent with booked and pending movements)

Defects in accuracy are treated with the same severity as missing required fields.

### Real-time data

Data returned on in-scope responses **must** reflect the current state of the LFI's systems at the time of the request. TPPs and their customers act on what they see; stale data breaks that trust.

- Data must be sourced from systems that reflect the current position of the customer, account, product, or service.
- Where caching is used in the LFI's implementation, it must be bounded such that the data returned remains current for the purpose of the endpoint — for example balances and transactions must reflect the latest posted activity.
- End-of-day or overnight batch propagation is not acceptable for any in-scope field unless explicitly recorded in the Data Mapping Commitment and agreed with Nebras.

Where an LFI operates processes that cause transient divergence (for example end-of-day cutover windows), these must be disclosed to Nebras and communicated to TPPs through the standard incident and maintenance channels defined in the [Ozone Connect Availability Policy](/policy/ozone-connect-availability).

### Forward commitment

LFIs are expected to progressively align their internal systems so that more optional fields can be delivered, more accurately, and more current, over time. Data that is not available today, but is reasonably achievable, should be worked towards as part of the LFI's normal technology roadmap. The objective is for every LFI to converge on delivering the full specified data set, accurately and in real time, wherever the data realistically exists in the banking estate.

## The Data Mapping Commitment

As part of onboarding to the ecosystem, each LFI provides a **Data Mapping Commitment** that records, for each in-scope endpoint and field, whether the LFI will deliver that field, on what basis, and with what freshness. This commitment is the reference point for Nebras's ongoing monitoring of data quality.

- The Data Mapping Commitment is reviewed and updated when the LFI makes material changes to its core systems, when new Ozone Connect endpoints or fields are introduced, or when Nebras identifies gaps through monitoring.
- LFIs are accountable for delivering against their Data Mapping Commitment. Under-delivery against the commitment is treated as a data quality defect.

## Live proving before go-live

Before an LFI is signed off as compliant with this policy and approved to go live on the ecosystem, the LFI must complete a **live proving period** with one or more TPPs.

- During the proving period, the LFI operates its Ozone Connect endpoints against real TPP traffic in production.
- Field presence, accuracy, and real-time behaviour are observed across the proving period and compared against the LFI's Data Mapping Commitment and the specification.
- Nebras reviews the results of the proving period and confirms, or withholds, sign-off before the LFI is approved for general availability.

An LFI that does not demonstrably meet the expectations of this policy during proving remains in proving until it does, with Nebras support where required. This requirement applies equally to initial go-live and to any subsequent major version go-live.

## Monitoring, Reporting, and Intervention

Nebras actively monitor the data returned by every LFI's Ozone Connect endpoints, using the API Hub's own logs and the schema validation performed on every response. Field-level presence, consistency, and freshness are observed centrally, in real time. There is no need for LFIs to self-report, and no LFI operates outside Nebras's view.

Monitoring looks at:

- **Required field presence** — the rate at which required fields are delivered on in-scope responses
- **Optional field presence** — the rate at which optional fields are delivered, measured against the LFI's Data Mapping Commitment
- **Accuracy and consistency** — signals that indicate data divergence from the LFI's system of record, including internal inconsistencies in the response and divergence from expected formats
- **Freshness** — signals that indicate data is not reflecting current state, including staleness patterns across endpoints
- **Peer benchmarks** — each LFI's delivery is compared against similar LFIs in the ecosystem, so that outliers are visible

Where monitoring shows that an LFI is not delivering in line with the specification or its Data Mapping Commitment, or is materially behind its peer group on the same fields, Nebras will engage directly with the LFI. That engagement may include:

- Reviewing the specific fields, records, or time windows in question and the underlying cause
- Updating the Data Mapping Commitment where a field is genuinely not available in the LFI's systems
- Agreeing remediation plans and timelines where a field is available but not being delivered, or is being delivered incorrectly or with delay
- Escalating persistent or material non-delivery to the relevant regulatory authority where appropriate

LFIs must provide Nebras with any information required to support this process, including mappings, field-level definitions, and roadmap commitments where relevant.

## Continuous Improvement

Data quality is expected to improve over the life of the ecosystem, not hold steady. LFIs are expected to:

- Treat gaps identified through Nebras's monitoring as inputs into their own technology roadmaps
- Prioritise closing data gaps that affect multiple TPP use cases or that place the LFI behind its peer group
- Communicate planned improvements to Nebras so that ecosystem expectations can be set accordingly

Nebras will periodically publish anonymised ecosystem-wide views of data quality so that LFIs and TPPs share a common picture of where the ecosystem is strong and where it needs to improve.

---

This policy is read alongside:

- The [Ozone Connect Availability Policy](/policy/ozone-connect-availability)
- The [Ozone Connect Response Time Policy](/policy/ozone-connect-response-time)
