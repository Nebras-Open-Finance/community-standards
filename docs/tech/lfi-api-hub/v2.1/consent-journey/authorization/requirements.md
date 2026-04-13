---
next: false
prev: false
aside: false
---

# Authorization Requirements

This page defines the required error handling behaviour when the consent authorization fails after the PSU has been [authenticated](/tech/lfi-api-hub/v2.1/consent-journey/authentication/). The LFI MUST invoke `POST /auth/{interactionId}/doFail` with the exact `error` and `error_description` values specified below.

For all authorization failure scenarios, the LFI MUST PATCH the consent to `Rejected` before calling `doFail` — the PSU has been identified during the authentication step.

For the full `doFail` API specification, see the [`POST /auth/{interactionId}/doFail` API Reference](/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/open-api/auth-interactionId-doFail).

## Error scenarios

### 1. PSU explicitly cancels or declines the consent

The PSU reviews the consent details and chooses to decline or cancel the authorization.

| Field | Value |
|-------|-------|
| `error` | `access_denied` |
| `error_description` | `user_rejected_consent` |

### 2. PSU lacks eligible accounts or access

The PSU does not have any accounts or sufficient access rights to authorize the consent. For example:

- The PSU has no eligible accounts for the requested consent type
- The PSU's accounts do not support the requested payment rail or currency
- The consent has `IsSingleAuthorization` set to `true` but the PSU does not have sufficient authority to authorize the payment independently — for example, where the payment would require an additional approver (subsequent authorizer)

| Field | Value |
|-------|-------|
| `error` | `access_denied` |
| `error_description` | `user_lacks_eligible_accounts` |

### 3. Consent type not supported by LFI

The LFI does not support the consent type or configuration requested by the TPP.

| Field | Value |
|-------|-------|
| `error` | `access_denied` |
| `error_description` | `consent_not_supported` |

::: tip Use POST /consent/action/validate instead
This scenario SHOULD NOT occur in steady state. LFIs SHOULD implement the [`POST /consent/action/validate`](/tech/lfi-api-hub/v2.1/consent-events/open-api/validate) endpoint to reject unsupported consents at creation time — before the PSU is redirected to the LFI.

If this error is reported persistently or frequently, Nebras may require the LFI to implement the `POST /consent/action/validate` endpoint.
:::

### 4. PSU session expires

The PSU's session with the LFI expires before they complete the authorization of the consent.

| Field | Value |
|-------|-------|
| `error` | `access_denied` |
| `error_description` | `session_expired` |

::: warning Session timeout guidance
LFIs MUST ensure that session timeouts are not so short that they create an obstacle to a PSU completing authentication and authorization. The introduction of payment step-up authentication enables LFIs to implement session management in a way that balances security with usability.
:::

### 5. LFI internal technical error

The LFI encounters an internal technical error during the authorization process — for example, an internal service failure or inability to retrieve account data.

| Field | Value |
|-------|-------|
| `error` | `server_error` |
| `error_description` | `lfi_internal_error` |

### 6. LFI fails to communicate with API Hub

The LFI cannot communicate with the API Hub during the authorization process — for example, a failure when calling `PATCH /consents/{consentId}` to update the consent status.

| Field | Value |
|-------|-------|
| `error` | `server_error` |
| `error_description` | `api_hub_communication_error` |

The LFI MUST attempt to PATCH the consent to `Rejected` before calling `doFail`, but if the API Hub is unreachable, the LFI MUST still call `doFail` to redirect the PSU back to the TPP.

## Summary

| # | Scenario | `error` | `error_description` |
|---|----------|---------|---------------------|
| 1 | PSU explicitly cancels or declines the consent | `access_denied` | `user_rejected_consent` |
| 2 | PSU lacks eligible accounts or access | `access_denied` | `user_lacks_eligible_accounts` |
| 3 | Consent type not supported by LFI | `access_denied` | `consent_not_supported` |
| 4 | PSU session expires | `access_denied` | `session_expired` |
| 5 | LFI internal technical error | `server_error` | `lfi_internal_error` |
| 6 | LFI fails to communicate with API Hub | `server_error` | `api_hub_communication_error` |

For all scenarios above, the LFI MUST PATCH the consent to `Rejected` before calling `doFail`, except scenario 6 where the API Hub may be unreachable — in which case the LFI MUST make a best-effort attempt.
