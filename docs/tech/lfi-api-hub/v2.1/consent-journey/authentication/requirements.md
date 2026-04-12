---
next: false
prev: false
aside: false
---

# Authentication Requirements

This page defines the required error handling behaviour when the PSU fails to authenticate during the consent journey. The LFI MUST invoke `POST /auth/{interactionId}/doFail` with the exact `error` and `error_description` values specified below.

For the full `doFail` API specification, see the [`POST /auth/{interactionId}/doFail` API Reference](/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/open-api/auth-interactionId-doFail).

## Error scenarios

### 1. PSU fails initial authentication

The PSU does not successfully complete initial authentication — for example, by exceeding the maximum number of allowed attempts (e.g. 3 failed attempts).

| Field | Value |
|-------|-------|
| `error` | `access_denied` |
| `error_description` | `user_failed_to_authenticate` |

The LFI MUST NOT PATCH the consent to `Rejected` in this scenario — the PSU's identity has not been confirmed, so no PSU identifiers are available.

### 2. PSU fails step-up authentication

The PSU authenticated successfully during initial login but fails the step-up authentication required for payment consent confirmation — for example, failing biometric verification or exceeding the maximum number of step-up attempts.

| Field | Value |
|-------|-------|
| `error` | `access_denied` |
| `error_description` | `user_failed_step_up_authentication` |

The LFI MUST PATCH the consent to `Rejected` before calling `doFail` — the PSU was already identified during initial authentication.

### 3. PSU is blocked, suspended, or flagged

The PSU authenticates successfully but the LFI determines the customer account is blocked, suspended, or otherwise flagged — for example, due to a fraud hold, deceased marker, or sanctions screening.

| Field | Value |
|-------|-------|
| `error` | `access_denied` |
| `error_description` | `user_account_blocked` |

The LFI MUST NOT PATCH the consent to `Rejected` in this scenario — the LFI SHOULD NOT associate the consent with a blocked account in the API Hub.

### 4. LFI internal technical error

The LFI encounters an internal technical error during the authentication process — for example, an internal service failure or inability to retrieve customer data.

| Field | Value |
|-------|-------|
| `error` | `server_error` |
| `error_description` | `lfi_internal_error` |

The LFI MUST NOT PATCH the consent to `Rejected` — the PSU's identity may not have been confirmed, and the failure is not attributable to the PSU.

### 5. LFI fails to communicate with API Hub

The LFI cannot communicate with the API Hub after the initial `GET /auth` call — for example, a failure when calling `GET /consents/{consentId}` to retrieve the consent details.

| Field | Value |
|-------|-------|
| `error` | `server_error` |
| `error_description` | `api_hub_communication_error` |

The LFI MUST NOT PATCH the consent to `Rejected` — the API Hub may be unreachable.

::: warning When GET /auth itself fails
If `GET /auth` fails, the LFI has no `interactionId` and therefore cannot call `doFail`. In this case the LFI MUST render an error page to the PSU explaining that the service is temporarily unavailable.
:::

### 6. LFI temporarily unavailable

The LFI cannot complete authentication due to high load or temporary capacity constraints at the LFI's systems.

| Field | Value |
|-------|-------|
| `error` | `temporarily_unavailable` |
| `error_description` | `lfi_temporarily_unavailable` |

The LFI MUST NOT PATCH the consent to `Rejected` — the PSU's identity may not have been confirmed.

## Summary

| # | Scenario | `error` | `error_description` | PATCH to Rejected? |
|---|----------|---------|---------------------|--------------------|
| 1 | PSU fails initial authentication | `access_denied` | `user_failed_to_authenticate` | No |
| 2 | PSU fails step-up authentication | `access_denied` | `user_failed_step_up_authentication` | Yes |
| 3 | PSU is blocked, suspended, or flagged | `access_denied` | `user_account_blocked` | No |
| 4 | LFI internal technical error | `server_error` | `lfi_internal_error` | No |
| 5 | LFI fails to communicate with API Hub | `server_error` | `api_hub_communication_error` | No |
| 6 | LFI temporarily unavailable | `temporarily_unavailable` | `lfi_temporarily_unavailable` | No |

::: warning FAPI error code validation
If the LFI submits an `error` code that is not supported by the FAPI 2.0 Security Profile, the API Hub will overwrite it with `invalid_request`.
:::
