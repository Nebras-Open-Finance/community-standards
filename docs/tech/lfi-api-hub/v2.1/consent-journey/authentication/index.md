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
| 5 | **CX certification** | The authentication experience will be reviewed for customer experience (CX) compliance as part of production certification. |

## App invocation

The LFI's **Authorization Endpoint** MUST support two scenarios based on the PSU's device:

| Scenario | Behaviour |
|----------|-----------|
| **LFI app is installed** | The Authorization Endpoint MUST open the LFI's native mobile app directly. No intermediate screens, browser pages, or app-store prompts may be shown before the app opens. |
| **LFI app is not installed** | The Authorization Endpoint MUST open a mobile-optimised web page where the PSU can complete authentication. |

Both scenarios MUST be supported. The Authorization Endpoint is expected to directly open the native app when this is how PSUs typically interact with the LFI digitally.



## What's next

- [Strong Customer Authentication](./sca) — SCA requirements, prohibited methods, and CBUAE regulatory alignment
- [Implementation Guide](./implementation) — Best-practice approaches for biometric authentication, device binding, and step-up flows
