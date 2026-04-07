---
next: false
prev: false
aside: false
---

# Consent Manager

The **Consent Manager** is an API provided by the API Hub that gives the LFI read and write access to the consent records held centrally by the API Hub. The API Hub is the single source of truth for all consents — the Consent Manager is how your systems interact with that source of truth.

## Base URL

| Environment | URL |
|-------------|-----|
| Pre-production | `https://cm.{lfiCode}.preprod.apihub.openfinance.ae` |
| Production | `https://cm.{lfiCode}.apihub.openfinance.ae` |

Where `{lfiCode}` is the LFI Code assigned during [API Hub onboarding](/tech/lfi-api-hub/v2.1/api-hub/onboarding/prerequisites#lfi-code).

## Authentication

All requests to the Consent Manager MUST be made using the **C3-hh-cm-client** application registered in the Trust Framework. This is the same client used to call the [Headless Heimdall Auth Server](/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/).

Requests MUST be made over **mutual TLS** using the **C3** transport client certificate. If your API Hub is configured for [JWT Auth](/tech/lfi-api-hub/v2.1/api-hub/onboarding/jwt-auth), you MUST also include a signed JWT in the `Authorization` header, signed with the **Sig4** signing key.

See [Connectivity & Certificates](/tech/lfi-api-hub/v2.1/api-hub/connectivity/) for the full certificate mapping, and [Creating the C3-hh-cm-client Application](/tech/lfi-api-hub/trust-framework/creating-c3-application) for setup instructions.

## When the LFI Calls the Consent Manager

The Consent Manager is used in three contexts:

### 1. Authentication and Authorisation Journey

During the consent authorisation flow, the LFI's authorisation server calls the Consent Manager to read the consent details and update the consent state after the PSU has authenticated and made their authorisation decision.

For full details on the end-to-end flow — including how the Consent Manager fits alongside the Headless Heimdall Auth Server — see the [Consent Journey API Guide](/tech/lfi-api-hub/v2.1/consent-journey/api-guide/).

### 2. Consent Management Interface

The LFI MUST provide a Consent Management Interface (CMI) within its digital banking application. The CMI is powered by Consent Manager API calls — retrieving consents by user, by account, or by ID, and revoking consents on the customer's behalf.

For the requirements, user experience specifications, and a detailed API guide for building the CMI, see the [Consent Management Interface](/tech/lfi-api-hub/v2.1/consent-management-interface/).

### 3. Payment Status Updates

For every Open Finance payment executed under a consent, the LFI MUST update the payment status on the API Hub by calling `PATCH /payment-log/{id}`. This keeps the API Hub's payment log accurate and ensures the CMI can display up-to-date payment history to the customer.

## API Reference

The full API reference for each endpoint is available in the sidebar under **API Reference**. Use `GET /hello-mtls` to verify your mTLS connectivity before calling other endpoints.
