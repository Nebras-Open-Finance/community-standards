---
next: false
prev: false
aside: false
---

🕒 **3 minute read**

# Consent Events & Actions — API Guide

This guide covers the implementation of the Consent Events & Actions endpoints on your Ozone Connect server. These are endpoints **your LFI exposes** and the **API Hub calls**.

## Prerequisites

Before implementing these endpoints, ensure the following are in place:

1. **API Hub onboarded** — Your API Hub instance is provisioned and your [environment-specific configuration](/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/) is complete
2. **Ozone Connect base URL configured** — The API Hub knows the base URL of your Ozone Connect server. See [Ozone Connect Base URL](/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/ozone-connect-url)
3. **Connectivity verified** — Bidirectional mTLS connectivity confirmed between your systems and the API Hub. See [Connectivity & Certificates](/tech/lfi-api-hub/v2.1/api-hub/connectivity/)

## Validate: `POST /consent/action/validate`

### API Sequence Flow

The API Hub calls this endpoint during consent creation, **before** the consent is stored. The trigger is a TPP submitting a `POST /par` request to the API Hub.


<APIFlowViewer title="Consent Validation Flow">
  <APIFlowsConsentValidate/>
</APIFlowViewer>

### What to validate

Your LFI SHOULD validate that the consent is one you can support. At a high level, typical checks include:

- Does the consent version match what your LFI supports?
- Are the requested permissions within the scope of what your LFI offers?

Each consent type defines its own specific validation rules in its **Requirements** page (e.g. [Bank Data Sharing — Requirements](/tech/lfi-api-hub/v2.1/banking/data-sharing/requirements)). Refer to the Requirements page for each consent type your LFI supports to understand the full set of validation checks you MUST implement.


### Response schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `data.status` | `string` | Yes | `valid` or `invalid` |
| `data.code` | `string` | No | An error code — returned when status is `invalid` |
| `data.description` | `string` | No | A human-readable description of why the consent was rejected |
| `meta` | `object` | Yes | Empty object `{}` |

See the [`POST /consent/action/validate` API Reference](/tech/lfi-api-hub/v2.1/consent-events/open-api/validate) for the full request and response schemas.

## Consent events: `POST /consent/event/{operation}`

### API Sequence Flow

The API Hub calls this endpoint to notify your LFI of consent lifecycle changes:

| Operation | Trigger |
|-----------|---------|
| `POST /consent/event/post` | A consent has been **created** — i.e. after `POST /par` succeeds (and after validation, if configured) |
| `POST /consent/event/patch` | A consent has been **updated** — e.g. status changed to `Authorized`, `Rejected`, `Revoked`, or `Expired` |


<APIFlowViewer title="Consent Event Flow">
  <APIFlowsConsentEventLFI/>
</APIFlowViewer>

### What to do with the event

If your LFI stores consents locally, use these events to keep your local state in sync with the API Hub:

- **On `post`** — Store the new consent in your local system
- **On `patch`** — Update your local consent record to reflect the latest state

The request body contains the **full consent object** as stored in the API Hub's Consent Manager — not a diff. Your LFI can replace its local record entirely with the received payload.

::: warning Source of truth
The API Hub is the **single source of truth** for consent state. Your local copy is a convenience cache. If there is ever a discrepancy, the Hub's state takes precedence.
:::

### Response

Your LFI MUST return `204 No Content` to acknowledge receipt.

::: info No retry, no rollback
If your endpoint returns an error (e.g. `400` or `500`), the API Hub will **not** retry the notification and will **not** roll back the consent change. The consent state in the Hub proceeds regardless.

Because the Hub is the source of truth and your local copy is a cache, any missed event can be reconciled by reading from the Consent Manager:

- **Handler received the payload but failed to process it** — you have the `consentId`, so call [`GET /consents/{consentId}`](/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consents-consentId) to fetch the latest state.
- **Your system was offline and never received the event** — reconcile lazily at PSU login by calling [`GET /psu/{userId}/consents`](/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/psu-userId-consents) before rendering the CMI.

LFIs that do not maintain a local consent cache do not need to reconcile — read from the Consent Manager on demand.
:::

## API Reference

- [`POST /consent/action/validate`](/tech/lfi-api-hub/v2.1/consent-events/open-api/validate) — Full request and response schema
- [`POST /consent/event/{operation}`](/tech/lfi-api-hub/v2.1/consent-events/open-api/event-op) — Full request and response schema
