---
prev: false
next: false
aside: false
---

# Security Validation

Before a TPP is approved for production access, it must submit the results of a penetration test to Nebras. This requirement provides independent assurance that the TPP's application can withstand real-world attack scenarios and that user data and financial transactions are adequately protected.



## Penetration Test Requirements

### Scope

The penetration test must cover the **full extent of the TPP's services that rely on the Open Finance implementation** — including all integration points, authentication flows, consent handling, data access, and payment initiation paths. Testing a subset of the application is not sufficient.

### Independence

The test must be carried out by an **independent third party**. Internal security assessments or self-attested reviews do not satisfy this requirement. The testing organisation must have no material conflict of interest with the TPP.

### Application State

The test must be conducted against the application in a **production-like state** — meaning the codebase, configuration, and infrastructure assessed must closely reflect what will be deployed to production. The test should not be run against an application that is mid-development or expected to undergo significant change before go-live.

::: info Non-production environments are acceptable
The penetration test does not need to be run against the live production environment. A staging or pre-production environment that mirrors production in architecture, configuration, and behaviour is acceptable, provided it is representative of what will go live.
:::

### Security Resilience

The test report must demonstrate **significant security resilience** across the areas relevant to an Open Finance TPP integration, including but not limited to:

- Authentication and session management (OAuth 2.0, PKCE, token handling)
- mTLS certificate usage and private key protection
- Consent data handling and access control enforcement
- Input validation and injection attack resistance
- Sensitive data storage and transmission
- API rate limiting and abuse prevention
- Third-party dependency and supply chain risk



## Submission

The penetration test report must be submitted to Nebras as part of the production approval process. Nebras reserves the right to request clarification, require remediation of identified findings, or request a re-test before granting production access.

::: warning Remediation before production
Any **critical** or **high** severity findings identified in the penetration test must be remediated and evidenced before production access will be granted. Medium and lower severity findings must be acknowledged with a documented remediation plan.
:::

## Ongoing Security Responsibility

The penetration test is a point-in-time assessment required before go-live — it is not a substitute for a continuous security posture. Once live in production, TPPs take full responsibility for the ongoing security of their platform.

This includes, but is not limited to, keeping dependencies patched, monitoring for vulnerabilities, responding promptly to security incidents, and repeating penetration testing whenever significant changes are made to the application or its Open Finance integration. A material change to the platform — such as a new payment flow, a new data access surface, or a change in infrastructure — should trigger a targeted security review.

Nebras may request updated evidence of security assurance at any point after go-live.
