---
next: false
prev: false
---

# Request Headers

These headers apply to all authenticated API calls made in the UAE Open Finance ecosystem. They are defined by the [FAPI 2.0 Security Profile](https://openid.net/specs/fapi-2_0-security-profile.html) and the UAE Open Finance standard.

## Header Reference

| Header | Level | Applies To |
|---|---|---|
| `x-fapi-interaction-id` | Recommended | All endpoints |
| `x-fapi-customer-ip-address` | Conditional | All endpoints |
| `x-fapi-auth-date` | Conditional | Data Sharing, Service Initiation, Confirmation of Payee |
| `x-customer-user-agent` | Optional | Data Sharing, Service Initiation, Confirmation of Payee |
| `x-idempotency-key` | Required | [POST /payments](..//banking/service-initiation/open-api/payments) |


## x-fapi-interaction-id

A UUID v4 correlation identifier that links a request to its response and enables end-to-end traceability across the ecosystem.

- **Format:** UUID v4 (RFC 4122), e.g. `7b5b4e3c-1d2a-4f5e-8c3b-9a0d6e2f1b4c`
- **Level:** Recommended on all requests. TPPs SHOULD include this header on every outbound call.
- **LFI behaviour:** The API Hub echoes the value verbatim in the `x-fapi-interaction-id` response header. If the header is absent, the API Hub generates a UUID and returns it in the response.

TPPs should log the interaction ID alongside every outbound request and its response. This enables correlation of issues across TPP systems, the API Hub and the LFI systems, and Nebras support.

## x-fapi-customer-ip-address

The IP address of the customer's device at the time of the request.

- **Format:** IPv4 or IPv6 string, e.g. `192.168.1.1` or `2001:db8::1`
- **Level:** Required when the customer is present in an active PSU-facing session. Required on all Product and Leads endpoints regardless of session context.

Where the TPP cannot determine the customer's IP address (e.g. in a server-to-server background call), this header should be omitted.

## x-fapi-auth-date

The date and time at which the customer last authenticated with the TPP.

- **Format:** RFC 7231 HTTP-date, e.g. `Sun, 10 Sep 2023 19:43:31 UTC`
- **Level:** Required when the customer is present in an active PSU-facing session (i.e. the request is being made on behalf of a customer who is currently logged in). Optional for background/automated calls.

::: tip
This header informs the LFI's fraud and risk controls. Omitting it during a PSU-facing session may cause the LFI to treat the call as a background operation, which can affect consent and session handling.
:::

## x-customer-user-agent

The user-agent string of the customer's browser or application.

- **Format:** Standard HTTP User-Agent string, e.g. `Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X)`
- **Level:** Optional. Recommended where the customer is accessing the TPP via a browser or native application.

This header supports LFI fraud detection and device fingerprinting. It should reflect the customer's actual device, not the TPP's server.

## x-idempotency-key

A unique key that guarantees exactly-once processing of payment initiation requests.

- **Format:** String, maximum 40 characters, no whitespace — pattern `^(\S*)$`
- **Level:** Required on all `POST /payments` requests.
- **Scope:** Unique per consent. The same key must not be reused across different consents.

**Rules:**

- If the API Hub receives a `POST /payments` request with an `x-idempotency-key` it has already processed for the same consent, it must return the original response without re-processing the payment.
- TPPs must not change the request body when replaying a request with the same idempotency key.
- TPPs must preserve the idempotency key when retrying after a network failure or timeout. Do not generate a new key for a retry — this would create a duplicate payment.
- The API Hub echoes the `x-idempotency-key` in the response header.

::: warning
If a TPP generates a new `x-idempotency-key` on retry after a timeout, it risks creating a duplicate payment. The correct behaviour on retry is to resend the original key with the original request body.
:::

## Message Signing

Request signing (`x-jws-signature`) is handled separately. Refer to [Message Signing](/tech/tpp-standards/security/fapi/message-signing) for requirements and implementation guidance.
