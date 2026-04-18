---
next: false
prev: false
aside: false
---

# Authentication

When a TPP initiates a consent journey, the API Hub redirects the PSU (Payment Services User) to the LFI's **Authorization Endpoint** so the PSU can prove their identity. This is the **authentication** step — the PSU demonstrates to the LFI that they are who they claim to be, using the same credentials and methods they use when accessing the LFI's own digital channels.

Authentication is distinct from [authorization](/tech/lfi-api-hub/v2.1/consent-journey/authorization/), which is the subsequent step where the authenticated PSU reviews and approves the consent (e.g. selecting accounts, confirming a payment).

## Where authentication sits in the consent flow

<ImageViewer
  src="/images/journeys/oauth-wireframe.png"
  alt="Oauth flow"
/>


1. The TPP creates a consent and receives a redirect URI from the API Hub
2. The PSU's device opens the LFI's **Authorization Endpoint**
3. **The LFI authenticates the PSU** using Strong Customer Authentication (SCA)
4. The LFI presents the consent for authorization
5. The LFI completes the interaction and redirects back to the TPP.

## Principles

The following principles govern authentication in the Open Finance Framework:

| # | Principle | Detail |
|---|-----------|--------|
| 1 | **LFIs authenticate** | The PSU MUST go through Multi-Factor Authentication (MFA) at their LFI. The API Hub does not perform PSU authentication. |
| 2 | **Parity of experience** | The PSU MUST be able to use the same authentication methods they use when accessing the LFI's own digital channels. Open Finance authentication MUST NOT be more obstructive, slower, or require more steps than the LFI's existing channels. |
| 3 | **Single MFA ceremony** | Unlike an LFI's online channels which may require authentication for login and again for sensitive actions, the Open Finance consent journey requires the PSU to complete MFA **once** before authorization. The exception is [step-up authentication for payment consents](./sca#step-up-authentication-for-payment-consents). |
| 4 | **No obstacles** | LFIs MUST NOT introduce unnecessary delay or friction during authentication. This includes advertising, language that discourages TPP usage, or additional steps beyond what is required for authentication. |
| 5 | **Immediate challenge** | The authentication challenge MUST be presented immediately on app open or page load, with no preceding splash, welcome screen, or tap-to-continue. The PSU arrives from the TPP having already expressed intent to authenticate; no further action MUST be required to initiate the challenge. This takes precedence over parity with the LFI's own channels. |
| 6 | **CX certification** | The authentication experience will be reviewed for customer experience (CX) compliance as part of production certification. |

## App invocation

The LFI's **Authorization Endpoint** MUST support two scenarios based on the PSU's device:

| Scenario | Behaviour |
|----------|-----------|
| **LFI app is installed** | The Authorization Endpoint MUST open the LFI's native mobile app directly. No intermediate screens, browser pages, or app-store prompts may be shown before the app opens. |
| **LFI app is not installed** | The Authorization Endpoint MUST open a mobile-optimised web page where the PSU can complete authentication. |

Both scenarios MUST be supported. The Authorization Endpoint is expected to directly open the native app when this is how PSUs typically interact with the LFI digitally.

### Immediate authentication challenge

Whichever scenario applies, the authentication challenge MUST be the first thing the PSU sees. No tap, button press, or intermediate screen may precede the challenge. Concretely:

| Channel | What "immediate" means |
|---------|------------------------|
| **Native app — biometrics available** | The native biometric prompt (Face ID, Touch ID, fingerprint) MUST fire automatically as the app opens. A "Log in with Face ID" button that the PSU must tap to invoke the prompt is NOT permitted. |
| **Native app — biometrics unavailable** | Where the app falls back to a knowledge factor, the PIN or password entry screen MUST be shown immediately on app open. |
| **Web page** | The credential entry form (e.g. username and password fields) MUST be the first screen rendered. A preceding page with a "Log in" button that navigates to the form is NOT permitted. |

This requirement takes precedence over parity with the LFI's own digital channels. If the LFI's own mobile app or website requires the user to tap a login button before the authentication challenge is shown, that tap MUST NOT be present in the Open Finance journey — the PSU has arrived from the TPP with explicit intent to authenticate and authorize, and any further action to initiate the challenge is redundant friction.



## What's next

- [Strong Customer Authentication](./sca) — SCA requirements, prohibited methods, and CBUAE regulatory alignment
- [Implementation Guide](./implementation) — Best-practice approaches for biometric authentication, device binding, and step-up flows
