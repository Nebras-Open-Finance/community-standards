---
next: false
prev: false
aside: false
---

# Prerequisites

Before your API Hub can be provisioned, you MUST complete the prerequisites questionnaire via a Service Desk ticket. This page describes the information you will need to provide and why it is required.

::: info
Ensure your organisation is registered in the Trust Framework before starting the prerequisites process. See [Trust Framework Onboarding](/tech/lfi-api-hub/trust-framework/onboarding) for details.
:::


## Organisation Details

| Field | Description |
|-------|-------------|
| **LFI Legal Name** | Your legal name as it appears on your Trust Framework organisation page. |
| **IBAN Bank Code** | The IBAN bank code for the brand associated with this onboarding. Not applicable for insurers. |
| **Primary Technical Contact (PTC)** | Email address of the main technical contact for integration queries. |
| **Primary Business Contact (PBC)** | Email address of the main business contact. |


## LFI Code

Your **LFI Code** forms part of the URL for both the TPP-facing and LFI-facing domain names — including your API Hub's well-known discovery document URI (see [Environment Specific Configuration](/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/)).

If your institution operates multiple brands (e.g. retail and business), each brand will have its own API Hub and its own LFI Code. Each brand is onboarded separately.


## Infrastructure

### Hosting Environment

Indicate where your Ozone Connect endpoints will be hosted:

- Azure
- AWS
- OCI (Oracle Cloud Infrastructure)
- GCP (Google Cloud Platform)
- On-premises

### Digital Channels

Indicate which digital channels you currently support for PSU authentication and consent journeys:

- Web
- Mobile
- Both


## Brands

Indicate how many business brands you will be implementing. Each brand represents a separate API Hub instance — for example, a bank may have separate brands for retail and corporate, each requiring its own onboarding.


## CAAP

Indicate whether you plan to use the **Consent Approval Application Platform (CAAP)** for PSU consent management. CAAP is an API Hub-hosted solution for managing the PSU consent journey. See [CAAP](/tech/lfi-api-hub/v2.1/caap/) for details.


## Supported API Families

Indicate which API families you plan to support. The available families are:

- **Bank Data Sharing** — account information, balances, transactions, and related data
- **Bank & FX Service Initiation** — payment initiation, including domestic transfers
- **Consent Events & Actions** — consent lifecycle event notifications

::: info Insurance
Insurance API families (e.g. Health, Motor, Travel) will be covered in a future update to this documentation.
:::


## Health Check Endpoints

The following health check endpoints are **mandatory** for all LFI implementations:

| Endpoint | Description |
|----------|-------------|
| `GET /hello` | Basic connectivity check. |
| `GET /hello-mtls` | Verifies mutual TLS is correctly configured. |
| `GET /echo-cert` | Returns the client certificate details received by your server, used to verify certificate propagation. |

These endpoints MUST be implemented and reachable before your integration can proceed to testing.


## Optional Features

During onboarding you will be asked which optional features you plan to implement. These are configured per API family.

### Consent Pre-Validation

Allows your Ozone Connect implementation to validate a consent before it is created. When enabled, the API Hub calls your validation endpoint during consent creation.

::: warning Strongly Recommended
Consent Pre-Validation is **strongly recommended** for all LFI implementations. Implementing this feature allows you to catch invalid consent parameters early — before the PSU begins the authorization journey — resulting in a significantly better customer experience. This feature may become a **mandatory requirement** in a future version of the specification if adoption is insufficient.
:::

See [Consent Events & Actions](/tech/lfi-api-hub/v2.1/consent-events/) for details.



### Consent Event Notification

Enables asynchronous notification of consent lifecycle events to your Ozone Connect implementation. When enabled, the API Hub sends event notifications when consents are created, authorized, revoked, or otherwise modified.

See [Consent Events & Actions](/tech/lfi-api-hub/v2.1/consent-events/) for details.

<br/>

::: info Consent Augmentation
The Consent Events & Actions API also defines a **Consent Augmentation** endpoint (`POST /consent/action/augment`). This endpoint is **not currently recommended for implementation**. LFIs SHOULD NOT enable this feature unless specifically advised to do so by Nebras. It may be revisited in a future version of the specification.
:::