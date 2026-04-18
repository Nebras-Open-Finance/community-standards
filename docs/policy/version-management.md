---
next: false
prev: false
---

# Version Management Policy

## Applies to:

- **Nebras**


## Purpose

This document defines the version management policy for Open Finance standards in the United Arab Emirates. The policy ensures consistent, predictable, and transparent versioning of API specifications, UI components, and related standards, while minimising disruption to TPPs and the broader ecosystem.

This policy is read alongside:

- [Changes to Published Documentation Policy](/policy/changes-to-published-content) — how published versions may be amended post-release
- [Major Version Deprecation Policy](/policy/lfi-deprecation) — how prior major versions are retired


## Scope

This policy applies to all Open Finance standards published within the UAE Open Finance ecosystem, including:

- API specifications
- UI components
- Downstream systems
- Consent objects
- Supporting documentation


## Effective Scope

This policy takes effect from **V2.1** of the UAE Open Finance Standard. Standards, specifications, and documentation published prior to V2.1 — including V2.0 and any earlier errata — are not governed by this policy. Breaking changes introduced before V2.1 do not constitute non-compliance.

The stability guarantees set out in this policy — in particular, the restriction of breaking changes to major version releases and the scope constraints on errata — apply only to **Live capabilities**. A capability is Live when Nebras has formally declared it in production use within the UAE Open Finance ecosystem.

For capabilities that have not yet been declared Live:

- Breaking changes MAY be introduced in minor versions or errata without requiring a major version increment
- The release cadence defined in [Versioning Definitions](#versioning-definitions) continues to apply
- Once a capability is declared Live, all subsequent changes to that capability MUST comply with this policy in full

Nebras is responsible for maintaining and publishing the register of Live capabilities.


## Versioning Definitions

The UAE Open Finance standard uses a two-part version identifier of the form `Vx.y`, where `x` is the major version and `y` is the minor version.

### Major Versions

- Indicated by a change in the primary version number (e.g., V1.1 → V2.0)
- MAY include breaking changes to API specifications that are not backward compatible
- MUST NOT be released more frequently than every 18 months from the last major version release
- MUST be accompanied by a comprehensive record of all breaking changes, including:
  - Detailed migration guidance for each breaking change
  - A clear statement of the deprecation timeline for the prior major version, in line with the [Major Version Deprecation Policy](/policy/lfi-deprecation)

### Minor Versions

- Indicated by a change in the secondary version number (e.g., V1.0 → V1.1)
- MUST NOT include breaking changes to API specifications
- MUST NOT be released more frequently than every 6 months from the previous major or minor version release
- MAY include non-breaking enhancements such as:
  - Additional optional fields in POST requests
  - Additional fields in GET responses
  - Additional endpoints
  - Non-breaking changes to field types

### Version Documentation

Every major and minor version MUST be accompanied by:

- A complete change log covering all modifications since the previous version
- Implementer guidance describing how to adopt the new version
- For major versions, migration guidance for each breaking change


## System and UI Requirements

### Version-Independent UI Support

- UI elements MUST NOT rely on API versioning for core functionality
- Where UI behaviour depends on new data in a consent object (e.g., a new field introduced in V2.0), LFIs and TPPs MUST implement logic based on the presence of the data itself, not on the consent version

**Example:**
If a new consent permission `ReadStatements` is added in V2.1, the UI SHOULD check whether `ReadStatements` is present on the consent rather than checking whether the consent version equals V2.1.

### UI Adoption

- LFIs MAY adopt visual or branding changes (e.g., colours, fonts, layout, logos) from a future version before upgrading their API version
  - Example: New UI requirements published in V2.0 may be implemented while still serving API V1.2
- Adoption of new UI elements requires successful Customer Experience (CX) certification to confirm UX compliance
- When an LFI upgrades its API to a given version, the UI MUST also align with that version. UI enhancements MAY precede API version upgrades but MUST NOT lag behind them


## Release Management

### Standards Publication

- A standards version MAY only be declared published once it is fully available to TPPs via the API Hub

### Release Candidate

- A release candidate (e.g., `V1.2-rc`) MAY be issued ahead of official publication to give the ecosystem visibility of upcoming changes
- Once a standards version is agreed but not yet delivered into the API Hub, it is fixed but not yet officially published. This state is indicated by a release candidate final suffix (e.g., `V1.2-rc-final`)

### Changes to Published Versions

- Post-publication changes are limited to guidance clarifications or bug fixes, and MUST follow the [Changes to Published Documentation Policy](/policy/changes-to-published-content)
- No functional changes affecting LFI or TPP implementations may be introduced after publication; such changes require a new minor or major version
- Errata MUST NOT introduce breaking changes. Any change that would break backward compatibility for LFIs or TPPs MUST be delivered through a new major version in accordance with this policy
- Errata MUST NOT introduce new functionality. Additive, non-breaking enhancements (such as new optional fields or new endpoints) MUST be delivered through a new minor version


## Compliance and Governance

Nebras, LFIs, and TPPs are required to adhere to this policy. Nebras is responsible for maintaining the versioning scheme, publishing version artefacts, and coordinating with ecosystem participants on upcoming releases.


## Review and Updates

This policy will be reviewed periodically by Nebras to ensure alignment with industry best practice and the evolving UAE Open Finance ecosystem. Material changes to the policy will be communicated to LFIs and TPPs in advance of taking effect.
