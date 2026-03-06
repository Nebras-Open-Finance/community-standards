---
next: false
prev: false
---

# Version Management Policy

## Applies to:

- **Nebras**


## Purpose

This document defines the version management policy for Open Finance standards in the United Arab Emirates. The policy ensures consistent, predictable, and transparent versioning of API specifications, UI components, and related standards, while minimizing disruption to Third-Party Providers (TPPs) and the broader ecosystem.


## Scope

This policy applies to all Open Finance standards, including:

- API specifications  
- UI components  
- Downstream systems  
- Consent objects  
- Supporting documentation  

The policy is applicable to all versions published within the UAE Open Finance ecosystem.


## Versioning Definitions

### Major Versions

- Indicated by a change in the primary version number (e.g., V1.1 → V2.0)  
- May include breaking changes to API specifications that are not backward compatible  
- Can be released at most every 18 months from the last major version release 
- A comprehensive record of all breaking changes must accompany each major version release, including:  
  - Detailed migration guidance for each breaking change  

### Minor Versions

- Indicated by a change in the secondary version number (e.g., V1.0 → V1.1)  
- Cannot include breaking changes to API specifications  
- Can be released at most every 6 months from the major or minor version release  
- May include non-breaking enhancements such as:  
  - Additional optional fields in POST requests  
  - Additional fields in GET requests  
  - Additional endpoints  
  - Non-breaking changes to field types  

**Version Documentation:** Both major and minor versions must include a complete list of changes and guidance for implementers on how to adopt the new version.


## System and UI Requirements

### Version-Independent UI Support

- UI elements must not rely on API versioning for core functionality  
- Where UI behavior depends on new data in a consent object (e.g., a new field in V2.0), LFIs and TPPs must implement logic based on the existence of the data itself, not the consent version  

**Example:**  
If a new consent permission `ReadStatements` is added in V2.1, the UI should check if `ReadStatements` exists rather than checking if the consent version equals V2.1.

### UI Adoption

- LFIs may adopt visual or branding changes (e.g., colors, fonts, layout, logos) from a future version before updating the API version  
  - Example: New UI requirements published in V2.0 may be implemented while still using API V1.2  
- Adoption of new UI elements requires successful Customer Experience (CX) certification to ensure UX compliance  
- When an LFI upgrades its API to the latest version, the UI must also align with that version. UI enhancements can precede API version upgrades but not follow them


## Release Management

### Standards Publication

- A standards version may only be published when it is fully available to TPPs via the API Hub

### Release Candidate

- A release candidate (e.g., V1.2-rc) may be issued before official publication to provide the ecosystem with visibility of upcoming changes  
- Once a standards version is agreed on but not yet delivered into the API Hub, it is fixed but not yet officially published. This will be indicated by release candidate final (e.g., V1.2-rc-final)

### Changes to Published Versions

- Post-publication changes are limited to guidance clarifications or bug fixes  
- No functional changes affecting LFIs or TPPs’ implementations may be introduced after publication


## Compliance and Governance

Nebras, LFIs, and TPPs are required to adhere to this version management policy.
