---
next: false
prev: false
aside: false
---

# Operational Requirements – Availability

LFIs must maintain their Open Finance API endpoints to a level of availability and reliability that enables TPPs to provide continuous service to their customers.

## Availability Target

LFIs must target **99.5% monthly uptime** for all Open Finance API endpoints, measured across each calendar month. Downtime is calculated as any period during which the API Hub cannot successfully reach the LFI's Ozone Connect endpoints.

Planned maintenance windows must be pre-notified to Nebras and must not exceed the agreed maintenance allowances defined in the LFI's participation agreement.

## Monitoring

The API Hub continuously monitors the availability and responsiveness of LFI endpoints. Availability data is aggregated and published on the [Metrics & Monitoring](/metrics) dashboard.

LFIs are expected to monitor their own endpoints independently and investigate incidents proactively, without waiting for Nebras to raise them.

## Incident Response

LFIs must have a defined incident response process for Open Finance API outages. When an availability incident occurs:

1. Notify Nebras within the timeframe specified in your participation agreement.
2. Provide a root cause analysis for any incident lasting more than 30 minutes.
3. Implement remediations before returning to production.

See also: [API Responsiveness](./api-responsiveness)
