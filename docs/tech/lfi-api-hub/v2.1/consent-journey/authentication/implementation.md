---
next: false
prev: false
aside: false
---

# Implementation Guide

This page provides best-practice guidance for LFIs implementing authentication in the Open Finance consent journey. The recommendations here reflect the approach most likely to satisfy [SCA requirements](./sca), pass CX certification, and deliver an experience consistent with best-in-class mobile banking.

## Recommended architecture: device-bound app with native biometrics

The strongest and most seamless authentication approach combines a **device-bound mobile app** with **native biometric authentication**. This is the approach used by leading banking apps globally and satisfies SCA with minimal friction.

### How it works

```
PSU's device
┌─────────────────────────────────────────────┐
│                                             │
│  LFI Mobile App (bound to this device)      │
│  ┌───────────────────────────────────────┐  │
│  │                                       │  │
│  │  1. App opens via Authorization       │  │
│  │     Endpoint deep link                │  │
│  │                                       │  │
│  │  2. Device binding verified silently  │  │
│  │     (possession factor ✓)             │  │
│  │                                       │  │
│  │  3. Native biometric prompt           │  │
│  │     (inherence factor ✓)              │  │
│  │                                       │  │
│  │  4. SCA complete → proceed to         │  │
│  │     consent authorization             │  │
│  │                                       │  │
│  └───────────────────────────────────────┘  │
│                                             │
│  Secure Element / TEE                       │
│  ┌───────────────────────────────────────┐  │
│  │  Private key (never leaves device)    │  │
│  │  Biometric verification               │  │
│  └───────────────────────────────────────┘  │
│                                             │
└─────────────────────────────────────────────┘
```

| Step | What happens | SCA factor |
|------|-------------|------------|
| 1 | The Authorization Endpoint deep link opens the LFI app | — |
| 2 | The app verifies it is running on the bound device by checking cryptographic keys stored in the secure element | **Possession** — the device the app is bound to |
| 3 | The app prompts for a native biometric (Face ID, Touch ID, fingerprint) | **Inherence** — the PSU's biometric |
| 4 | SCA is satisfied (two factors). The PSU proceeds to review and authorize the consent | — |

This is best-in-class because:
- **It is fast** — a single biometric gesture, no typing, no waiting for OTPs
- **It is familiar** — identical to opening the banking app normally
- **It is secure** — private keys in the secure element, biometric verification on-device
- **It satisfies SCA** — possession (bound device) + inherence (biometric)

### Device binding

The LFI app MUST be bound to the PSU's device during the app's initial registration or enrolment. Binding MUST be established through:

1. A cryptographic key pair generated in the device's secure element (Secure Enclave on iOS, StrongBox/TEE on Android)
2. The public key registered with the LFI's backend during enrolment
3. The private key remaining on-device and never exported

On each authentication, the app verifies device binding by performing a cryptographic operation with the private key. This is silent to the PSU — no user interaction is required for the possession factor.

### Native biometrics

The biometric authentication MUST use the device's native biometric APIs:

| Platform | API | Biometrics supported |
|----------|-----|---------------------|
| iOS | Local Authentication framework / Face ID / Touch ID | Face ID, Touch ID |
| Android | BiometricPrompt API | Fingerprint, face unlock, iris (device-dependent) |

The biometric prompt MUST be the platform-native prompt. LFIs MUST NOT implement custom biometric capture. The operating system handles the biometric matching against enrolled biometrics; the result is an assertion that the enrolled user is present.

### Fallback to PIN/password

If native biometrics are not available (not enrolled, hardware not present, or user preference), the app MUST fall back to a knowledge factor:

- PIN or password entry within the LFI app
- This combined with the bound device still satisfies SCA (possession + knowledge)

## Payment consent flow: step-up confirmation

For payment consents, the flow extends with a biometric confirmation at the point of authorization:

```
┌──────────────────────────────────────────────────────┐
│                                                      │
│  1. App opens → device binding verified (possession) │
│  2. Native biometric prompt (inherence)              │
│  3. SCA complete ✓                                   │
│                                                      │
│  ─── PSU reviews payment details ───                 │
│                                                      │
│  4. PSU taps "Confirm Payment"                       │
│  5. Native biometric prompt (step-up confirmation)   │
│  6. Authorization complete → doConfirm               │
│                                                      │
└──────────────────────────────────────────────────────┘
```

The step-up biometric at step 5 confirms the PSU's intent to authorize the specific payment. This maps directly to how banking apps handle payment confirmation and satisfies the CBUAE directive's step-up requirement for sensitive actions.

## Fallback scenarios: when the app is not available

The [Overview](./index.md#app-invocation) defines the scenarios where the PSU does not have the LFI app installed. This section provides implementation detail for those flows.

### Mobile browser — browser-based authentication

If the LFI already supports browser-based authentication in its digital channels, the same capability MUST be available for Open Finance. The SCA requirements apply — the browser flow must achieve two-factor authentication:

| Factor | Browser-based approach |
|--------|----------------------|
| **Possession** | Verified through a registered credential (e.g. a FIDO2/Passkey credential bound to the device, or a device fingerprint established during prior enrolment) |
| **Inherence** or **Knowledge** | Biometric authentication via WebAuthn/FIDO2 (if supported), or PIN/password entry |

### Mobile browser — app handoff via push notification

When the LFI does not support browser-based authentication, the LFI MUST hand off to the mobile app:

```
Mobile browser                         LFI app (bound device)
┌─────────────────────┐                ┌──────────────────────┐
│                     │                │                      │
│ 1. GET /auth called │                │                      │
│    (interactionId + │                │                      │
│     consentId       │                │                      │
│     obtained)       │                │                      │
│                     │                │                      │
│ 2. PSU enters       │                │                      │
│    username/password │                │                      │
│    (knowledge ✓)    │                │                      │
│                     │   push notif   │                      │
│ 3. LFI sends push ──┼───────────────►│ 4. PSU opens notif   │
│                     │                │                      │
│                     │                │ 5. App authenticates  │
│ 6. Browser polls    │                │    (biometric ✓)     │
│    for completion   │                │                      │
│                     │                │ 7. App calls          │
│                     │                │    GET /consents,     │
│                     │                │    authorization,     │
│ 8. Redirect to TPP ◄┼────────────── │    doConfirm/doFail  │
│                     │                │                      │
└─────────────────────┘                └──────────────────────┘
```

Key implementation details:
- `GET /auth` MUST be called in the browser session — it cannot be called again from the app
- The `interactionId` and `consentId` MUST be passed to the app via the push notification deep link
- The app uses these identifiers to call `GET /consents/{consentId}`, present the authorization screen, and call `doConfirm` or `doFail`
- The browser page MUST poll for completion and redirect back to the TPP

### Desktop browser — QR code or push notification

On desktop, the LFI presents a web page with two handoff options:

**QR code:** The page displays a QR code that resolves to a deep link containing the `interactionId` and `consentId` (obtained from `GET /auth` in the desktop browser session). The PSU scans the code with their mobile device, which opens the LFI app. The PSU authenticates and completes consent authorization in the app. The desktop page polls for completion and redirects back to the TPP.

**Push notification:** Identical to the [mobile browser handoff](#mobile-browser--app-handoff-via-push-notification) above — the desktop page collects username/password, triggers a push to the bound device, and polls for completion.

If the LFI supports browser-based authentication in its existing channels, the PSU MUST also be able to complete the entire journey in the desktop browser without the mobile app.

## Emerging best practices

The following standards and technologies are consistent with the SCA principles and controls described in this guide. LFIs SHOULD evaluate them for future implementation:

### FIDO2

FIDO2 is a suite of protocols that provides strong proofs-of-authentication using public-key cryptography. Unlike app-bound biometrics, FIDO2 produces a portable **Authentication Assertion** — a signed object that can be verified by any relying party holding the corresponding public key. FIDO2 satisfies SCA through possession (private key on device) and inherence (biometric gate to the key).

### Passkeys

Passkeys are a cross-platform implementation of FIDO2 credentials developed by the FIDO Alliance with Apple and Google. They add the ability to synchronise keys between devices and recover from device loss — a key limitation of device-bound FIDO2 credentials. Passkeys provide the same SCA properties as FIDO2 with improved usability.

### Secure Payment Confirmation (SPC)

SPC is a W3C standard that extends WebAuthn specifically for payment authentication. It presents a browser-native payment confirmation dialog that includes the payee and amount, with biometric verification. SPC supports the CBUAE dynamic-linking requirement (binding the authentication to a specific payment) and is already incorporated into 3D Secure flows.

### OpenID for Verifiable Credentials

OpenID for Verifiable Credentials (OID4VC) provides a framework for presenting verifiable identity credentials as part of an authentication flow. This could enable third-party identity providers to participate in SCA, broadening the ecosystem beyond bank-issued credentials.

## Security controls

LFIs MUST apply the following controls to their authentication implementation:

| # | Control | Rationale |
|---|---------|-----------|
| 1 | Apps MUST be distributed through authorised app stores only | Provides a trusted source and enables integrity verification |
| 2 | Apps MUST verify the mobile OS version is supported | Ensures expected behaviour and reduces risk of information leakage |
| 3 | App installations MUST be correlated to a specific device signature | Establishes provenance of authentication operations |
| 4 | Private keys MUST be stored in the device secure element | Prevents extraction and reflects OWASP mobile best practices |
| 5 | Apps MUST verify the identity of external services (e.g. API Hub endpoints) using certificate pinning or equivalent | Prevents redirection of authentication flows to malicious services |
| 6 | Apps MUST NOT operate on jailbroken or rooted devices | Prevents compromise of the secure element and authentication flow |
| 7 | Each authentication operation MUST be linked to the specific consent being authorized | Provides audit trail and prevents replay of authentication assertions |
