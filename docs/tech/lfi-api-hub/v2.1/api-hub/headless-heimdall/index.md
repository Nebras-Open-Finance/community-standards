---
next: false
prev: false
aside: false
---

# Headless Heimdall Auth Server

The **Headless Heimdall Auth Server** is an API provided by the API Hub that powers the consent authorisation journey. It shields your authorisation server from the complexity of raw OIDC and FAPI 2.0 — your system calls three endpoints at the appropriate points in the customer journey and the API Hub handles the rest.

## Base URL

| Environment | URL |
|-------------|-----|
| Pre-production | `https://hh.{lfiCode}.preprod.apihub.openfinance.ae` |
| Production | `https://hh.{lfiCode}.apihub.openfinance.ae` |

Where `{lfiCode}` is the LFI Code assigned during [API Hub onboarding](/tech/lfi-api-hub/v2.1/api-hub/onboarding/prerequisites#lfi-code).

## Authentication

All requests to the Headless Heimdall Auth Server MUST be made using the **C3-hh-cm-client** application registered in the Trust Framework. This is the same client used to call the [Consent Manager](/tech/lfi-api-hub/v2.1/api-hub/consent-manager/).

Requests MUST be made over **mutual TLS** using the **C3** transport client certificate. If your API Hub is configured for [JWT Auth](/tech/lfi-api-hub/v2.1/api-hub/onboarding/configuring-authentication/jwt-client), you MUST also include a signed JWT in the `Authorization` header, signed with the **Sig4** signing key.

See [Connectivity & Certificates](/tech/lfi-api-hub/v2.1/api-hub/connectivity/) for the full certificate mapping, and [Creating the C3-hh-cm-client Application](/tech/lfi-api-hub/trust-framework/creating-c3-application) for setup instructions.

## How It Fits Into the Consent Journey

When a TPP initiates a consent request, the API Hub creates the consent record and redirects the PSU to your authorisation endpoint. From that point, your authorisation server interacts with the Headless Heimdall Auth Server to coordinate the FAPI 2.0 authorisation code flow:

1. **`GET /auth`** — Your authorisation server calls this at the start of every authorisation code grant. The API Hub validates the FAPI/OIDC request and returns the interaction context and the decoded consent details. Your system uses these details to present the consent to the PSU for approval.

2. **`POST /auth/{interactionId}/doConfirm`** — After the PSU has authenticated and authorised the consent, your system calls this to complete the interaction. The API Hub updates the consent state and issues tokens to the TPP.

3. **`POST /auth/{interactionId}/doFail`** — If authentication fails or the PSU rejects the consent, your system calls this to end the interaction. The API Hub initiates an error redirect back to the TPP.

::: tip Consent Manager interaction
During the authorisation journey, your system will typically also call the [Consent Manager](/tech/lfi-api-hub/v2.1/api-hub/consent-manager/) to read the full consent object and update its state. Both APIs work together to complete the journey.
:::

For the full API flow - see the [Consent Journey API Guide](/tech/lfi-api-hub/v2.1/consent-journey/api-guide).

## API Reference

The full API reference for each endpoint is available in the sidebar under **API Reference**. Use `GET /hello-mtls` to verify your mTLS connectivity before calling other endpoints.
