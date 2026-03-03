---
next: false
prev: false
---

# Major Version Deprecation Policy

## Applies to:

- **Licensed Financial Institutions (LFIs)**
- **Nebras**

## Purpose

This document defines the deprecation policy for LFI API Hub implementations in the UAE Open Finance ecosystem. It establishes the requirements for LFIs to support concurrent API versions during transition periods and sets out the process by which prior versions are formally deprecated.

As defined in the [Version Management Policy](/policy/version-management), major version changes (e.g., V1.x → V2.0) may introduce breaking changes that are not backward compatible. Because TPPs build their integrations against specific API versions, they require a structured transition period to migrate to a new major version without disruption to their services or the end-users they serve. This policy ensures that LFIs provide that continuity while the ecosystem moves forward.

## Scope

This policy applies to all LFIs operating within the UAE Open Finance ecosystem and covers:

- Major version transitions of the LFI API Hub implementation
- The dual-running period during which both the prior and new API versions are simultaneously supported
- The formal deprecation process for retiring prior versions

## Dual-Running Requirement

When a new major version of the Open Finance standard is introduced (e.g., Vx.y → Vz.0), LFIs **must** operate both the prior version and the new version of their API Hub implementation concurrently for the duration of the deprecation window.

### How Dual-Running Works

LFIs achieve dual-running by:

- Deploying two active versions of their API Hub implementation simultaneously (e.g., V1.x and V2.0)
- Routing incoming API requests to the correct implementation based on the version identifier present in the request, typically via:
  - The URL path (e.g., `/v1/` vs `/v2/`)
  - An API version header
- Ensuring each implementation is independently maintained and supported, with no cross-version dependencies that could cause instability

Both implementations must remain fully functional and compliant with their respective standards throughout the dual-running period.

::: tip Example
An LFI running V1.2 and V2.0 simultaneously would route a request to `https://api.bank.ae/open-finance/v1/accounts` to the V1.2 implementation, and a request to `https://api.bank.ae/open-finance/v2/accounts` to the V2.0 implementation.
:::

## Deprecation Process

The deprecation of a prior version follows a structured timeline to protect TPPs and their customers from unplanned disruption.

### Phase 1: Launch and Communication

1. **Stand up the new version** — The LFI deploys and validates the new major version of their API Hub implementation in production.
2. **Validate readiness** — The LFI confirms the new version is functioning correctly, including end-to-end consent flows, data sharing, and service initiation (as applicable).
3. **Formal communication via Nebras** — The LFI notifies Nebras that the new version is live. Nebras issues a formal ecosystem-wide communication informing all TPPs that:
   - The new version is available
   - TPPs are expected to begin migrating their implementations to the new version
   - The prior version will be deprecated in accordance with this policy

### Phase 2: Migration Monitoring (Months 1–3)

From the date of the formal communication, LFIs must actively monitor the creation of new consents across both versions.

- At the **3-month mark**, LFIs must report to Nebras on the status of TPP migration, specifically identifying any TPPs that are still raising new consents on the prior version.
- Nebras will use this information to engage directly with non-migrated TPPs to understand blockers and accelerate migration.

### Phase 3: Final Migration Window (Months 4–5)

A further 2-month window is provided for remaining TPPs to complete migration.

- At the **5-month mark**, LFIs must again report to Nebras identifying any TPPs still raising new consents on the prior version.
- If no new consents are being raised on the prior version at this point, the LFI may request Nebras approval to proceed to Phase 4.

### Phase 4: Restricting New Consents on Prior Version

With Nebras approval, the LFI may **restrict the creation of new consents** on the prior version. This means:

- Existing consents on the prior version remain valid and must continue to be honoured
- No new consent journeys can be initiated against the prior version
- TPPs with active consents on the prior version may continue to exercise those consents until they expire

### Phase 5: Sunset of Prior Version

From the point at which new consent creation is restricted, the prior version must remain operational for a further **12 months**, providing sufficient time for all existing consents on the prior version to expire naturally.

After this 12-month period, and once Nebras confirms that no active consents remain on the prior version, the LFI may decommission the prior version entirely.

---

| Milestone | Timeline |
|---|---|
| New version goes live; formal communication issued | Day 0 |
| First migration status report to Nebras | Month 3 |
| Second migration status report to Nebras | Month 5 |
| Restriction of new consents on prior version (Nebras approval required) | Month 5+ |
| Prior version sunset (all prior version consents expired) | Up to Month 17+ |

---

## Nebras-Managed Deprecation

Where TPPs have not completed migration to the new version by the **6-month mark** from the date of formal communication, Nebras will take an active role in managing the deprecation.

This includes:

- Directly engaging with non-migrated TPPs to understand technical or operational blockers
- Setting individual migration deadlines for non-migrated TPPs, with formal written notice
- Escalating persistent non-compliance to the relevant regulatory authority where appropriate
- Coordinating with the LFI to ensure migration support is available to affected TPPs
- Retaining oversight of the LFI's deprecation timeline and adjusting it where necessary to protect TPPs and their customers

LFIs must provide Nebras with any data or reporting required to support this process.

## Operational Support During Dual-Running

LFIs are expected to maintain appropriate operational support for both versions throughout the dual-running period. This includes:

- **Incident management** — Both API versions must be covered by the LFI's standard incident management and response procedures, with equivalent SLAs applied to both
- **Monitoring and alerting** — LFIs must maintain active monitoring across both API versions, including availability, error rates, and latency
- **Change management** — Any changes to either version during the dual-running period must be assessed for impact on the other version and communicated to Nebras in accordance with standard change management procedures
- **TPP support** — LFIs must be able to provide technical support to TPPs migrating between versions, including guidance on breaking changes and access to sandbox environments running both versions
- **Consent data integrity** — LFIs must ensure that consent records associated with the prior version are preserved and remain accessible for the full duration of those consents' validity, regardless of the deprecation status of the API version under which they were created

## Compliance and Governance

LFIs are required to adhere to this policy for all major version transitions within the UAE Open Finance ecosystem. Failure to comply, including failure to dual-run versions during the transition period or failure to report migration status to Nebras, may result in regulatory escalation.

Nebras reserves the right to adjust deprecation timelines in exceptional circumstances, including where ecosystem-wide migration issues are identified or where the interests of TPPs or their customers require additional protection.
