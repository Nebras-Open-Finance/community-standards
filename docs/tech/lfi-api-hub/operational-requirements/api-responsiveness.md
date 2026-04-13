---
next: false
prev: false
aside: false
---

# Operational Requirements – API Responsiveness

LFIs must ensure their Ozone Connect endpoints respond within the latency thresholds defined by the UAE Open Finance standard. These thresholds apply to the time between the API Hub forwarding a request to the LFI and receiving a response.

## Response Time Thresholds

| Endpoint Type | P95 Target | P99 Target |
|---------------|-----------|-----------|
| Account & transaction data | 1000ms | 3000ms |
| Payment initiation | 1000ms | 3000ms |
| Confirmation of payee | 500ms | 1500ms |
| Consent lifecycle (GET/PATCH) | 500ms | 1500ms |

Thresholds are measured at the API Hub boundary. Network latency between the API Hub and the LFI's infrastructure is included in these measurements.

## Monitoring

Response time data is collected continuously by the API Hub and published on the [Metrics & Monitoring](/metrics) dashboard. LFIs can use this data to track their performance against the thresholds above.

::: warning Sustained threshold breaches
Persistent breach of P95 thresholds may trigger a review of the LFI's participation status. LFIs are expected to investigate and resolve performance issues proactively.
:::

## Optimisation Guidance

- Ensure Ozone Connect endpoints are hosted in the same region as your core banking systems to minimise internal latency.
- Use connection pooling and avoid cold-start delays on response-path services.
- Pre-warm any caches used for account data retrieval ahead of business hours.

See also: [Availability](./index)
