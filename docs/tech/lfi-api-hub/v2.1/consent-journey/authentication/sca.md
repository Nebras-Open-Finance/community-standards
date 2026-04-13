---
next: false
prev: false
aside: false
---

# Strong Customer Authentication

Strong Customer Authentication (SCA) is multi-factor authentication (MFA) that requires the PSU to authenticate using at least two independent factors. SCA is a regulatory requirement under the CBUAE directive *Prevention of Fraud Incidents Impacting Consumers* (Notice No. 3057/2025) and applies to all Open Finance consent journeys.

## Authentication factors

SCA requires at least **two** of the following three factors:

| Factor | Category | Examples |
|--------|----------|----------|
| **Possession** | Something you have | A bound mobile device, hardware token, SIM card |
| **Inherence** | Something you are | Fingerprint, facial recognition, voice recognition |
| **Knowledge** | Something you know | PIN, password, passphrase |

Each factor used MUST be independent — compromise of one factor MUST NOT compromise another.

## Prohibited authentication methods

The following methods are **prohibited** in Open Finance consent journeys:

| Method | Status | Rationale |
|--------|--------|-----------|
| SMS OTP (as standalone) | **MUST NOT** be used | Prohibited by CBUAE directive as a standalone authentication method |
| Email OTP (as standalone) | **MUST NOT** be used | Prohibited by CBUAE directive as a standalone authentication method |
| Static passcodes (as standalone) | **MUST NOT** be used | Prohibited by CBUAE directive as a standalone authentication method |
| SMS OTP (as a factor in Open Finance MFA) | **MUST NOT** be used | Open Finance authentication MUST NOT introduce methods that are more obstructive or weaker than the LFI's existing digital channels. If the LFI does not use SMS OTP in its own mobile banking authentication, it MUST NOT introduce it for Open Finance. |
| Email OTP (as a factor in Open Finance MFA) | **MUST NOT** be used | Same rationale as above. These methods add friction and latency that degrade the customer experience below the standard of the LFI's own channels. |

::: warning
LFIs MUST NOT introduce authentication factors into the Open Finance journey that are not used in their existing digital channels. Open Finance authentication MUST be equivalent to — not more burdensome than — the LFI's current authentication experience.
:::

## SCA requirements by consent type

### Data sharing consents

For data sharing consents, a **single MFA ceremony** at the start of the consent journey is sufficient. No step-up authentication is required.

The PSU authenticates, reviews the data sharing permissions, selects accounts, and authorizes the consent.

### Payment consents — step-up authentication {#step-up-authentication-for-payment-consents}

For payment consents (single payments and multi-payment consents), the CBUAE directive requires **step-up authentication** for sensitive actions including the initiation of payments. This means an additional authentication gesture is required at the point the PSU confirms the payment authorization.

In practice, a well-implemented payment consent journey has two authentication touchpoints:

| Touchpoint | Purpose | What happens |
|------------|---------|-------------|
| **Initial authentication** | Establish the PSU's identity | The PSU opens the LFI app (or web page) and completes MFA — typically device possession + biometric or PIN. This is identical to how the PSU would normally open their banking app. |
| **Payment confirmation** | Confirm intent for the specific payment | After reviewing the payment details, the PSU confirms authorization with a **native biometric gesture** (e.g. Face ID, fingerprint). This is identical to how the PSU would confirm a payment in their banking app. |

These two touchpoints serve distinct purposes — identity establishment and payment intent confirmation — and align with how banking apps already handle payment flows. The PSU experience is familiar: open the app with your face or fingerprint, review the payment, confirm with your face or fingerprint.

::: tip Why this doesn't feel like "authenticating twice"
The initial authentication is the natural act of opening and unlocking the banking app. The payment confirmation is the natural act of approving a specific transaction. PSUs already do this in their banking apps today. The step-up requirement simply ensures this existing pattern is preserved in the Open Finance journey.
:::

## CBUAE regulatory alignment

The table below maps specific clauses from CBUAE Notice No. 3057/2025 *Prevention of Fraud Incidents Impacting Consumers* to Open Finance requirements:

| # | CBUAE requirement | Open Finance alignment |
|---|-------------------|----------------------|
| 1 | LFIs are prohibited from using weak authentication methods (SMS OTP, Email OTP, static passcodes) as standalone methods for any transaction, enrolment, provisioning, or channel access | All Open Finance consent journeys MUST use SCA with at least two independent factors. Weak methods are prohibited as standalone or as factors introduced specifically for Open Finance. |
| 2 | For 3D Secure transactions, LFIs must use strong authentication (in-app verification, soft tokens, biometrics) | Open Finance payment consent journeys MUST employ strong in-app or biometric verification for step-up authentication at the point of payment authorization. |
| 3 | For recurring logins from trusted devices, LFIs may use passcodes or device-native biometrics | For Open Finance authentication on a trusted (bound) device, LFIs may use device-native biometrics (inherence) alongside the trusted device (possession) to satisfy two-factor SCA. |
| 4 | LFIs must implement step-up authentication for sensitive actions including payment initiation | For payment consents, an additional biometric confirmation MUST be performed at the point the PSU authorizes the consent. See [step-up authentication](#step-up-authentication-for-payment-consents) above. |

## Proofs of authentication

A given authentication operation SHOULD be uniquely identifiable and SHOULD produce a cryptographically verifiable proof-of-authentication. This provides:

- An audit trail linking the authentication to a specific consent
- Foundations for fraud prevention and dispute resolution
- Assurance to relying parties (API Hub) that authentication occurred

Where possible, the authentication assertion SHOULD be signed using a private key stored in the device's secure element (e.g. Secure Enclave on iOS, StrongBox/TEE on Android), and the corresponding public key SHOULD be available for verification.
