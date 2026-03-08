---
prev: false
aside: false
---

# Testing & Certification Overview

Before a Third Party Provider (TPP) can connect to a live Licensed Financial Institution (LFI) in production, it must satisfy two independent sets of requirements: regulatory licensing and Nebras technical certification.

## Regulatory Licensing

TPPs must hold a valid licence issued by the **Central Bank of the UAE (CBUAE)** before being granted access to production. Nebras certification is a separate, technical requirement and does not replace or supersede any CBUAE licensing obligation. You must contact the CBUAE directly to understand the licensing requirements applicable to your proposition and business model.

::: warning Licence required for production access
Production access will not be granted until a valid CBUAE licence has been confirmed. You may work through the Nebras certification process in parallel with your licensing application, but both must be satisfied before go-live.
:::

## Nebras Certification

Nebras requires all TPPs to complete the following certification areas before production access is granted. These requirements apply regardless of which LFI you are connecting to and are in addition to any requirements that individual LFIs may impose.

| Area | What it covers |
|------|----------------|
| [Readiness Checklist](./index) | A structured pre-flight check confirming your Trust Framework setup, security configuration, and API integration are complete and working against the AlTareq Model Bank |
| [Functional Evidence](./functional) | Documented proof that your proposition calls only the APIs it needs, requests only the minimum permissions required, and handles consent states correctly |
| [User Experience Evidence](./user-experience) | Evidence that your consent and authorisation flows meet Nebras user experience requirements |
| [FAPI Conformance](./fapi) | Results from running the OpenID Foundation FAPI conformance test suite against your client configuration |
| [Security Validation](./security-validation) | Confirmation that your key management, certificate handling, and data security practices meet Nebras policy requirements |

All five areas must be satisfied before Nebras will grant production access to a live LFI environment.

## Scope of These Requirements

The certification requirements in this section are set by Nebras and govern technical and operational readiness for participation in the Open Finance UAE ecosystem. They do not constitute legal or regulatory advice. TPPs are solely responsible for ensuring they hold the appropriate regulatory authorisations for their proposition before going live.
