---
title: "FAPI Request Headers — Traceability, Context, and Safe Retries"
description: "What the FAPI and Open Finance request headers are for, why x-fapi-interaction-id is the most important one to get right, and a one-line guide to each of the others."
next: false
prev: false
---

# FAPI Request Headers — Traceability, Context, and Safe Retries

Every API call in the UAE Open Finance ecosystem supports a set of HTTP headers defined by the [FAPI 2.0 Security Profile](https://openid.net/specs/fapi-2_0-security-profile.html) and the UAE Open Finance standard. These headers carry no business logic — they don't affect what the API does — but they significantly affect how problems are diagnosed, how fraud controls operate, and how payment retries behave safely.

The [Request Headers reference](/tech/tpp-standards/security/request-headers) covers the full rules. This article explains the intent behind each one.

## x-fapi-interaction-id

This is the most important header to get right, and the one most likely to save you hours when something goes wrong.

`x-fapi-interaction-id` is a UUID you generate and attach to every outbound request. It acts as a correlation handle that follows the request through your system, through the API Hub, and into the LFI — and comes back to you in the response. Every log line on every system that touched that request can be tagged with the same ID.

Without it, tracing a failed payment across three systems means reconciling timestamps and guessing. With it, you ask Nebras support for a trace by interaction ID and get a complete picture in minutes.

**How it works in practice:**

- Generate a fresh UUID v4 for each request — never reuse across requests.
- Send it as `x-fapi-interaction-id: 7b5b4e3c-1d2a-4f5e-8c3b-9a0d6e2f1b4c`.
- The API Hub echoes the exact value back in the `x-fapi-interaction-id` response header. If you omit it, the API Hub generates one for you — but you won't know what it is until you read the response header, and any log lines emitted *before* the response arrives will have no ID to correlate against.
- Log the interaction ID the moment you compose the request, not when you receive the response. This ensures it appears in your logs even if the request never returns.

**When debugging:** if a request fails, search your logs for the interaction ID to pull the full request and response together. Pass it to Nebras when raising a support case — it is the single fastest way to get an end-to-end trace.

::: tip Always send it
The header is defined as *recommended* in FAPI 2.0, but in practice it is essential. There is no meaningful cost to sending it and significant cost to omitting it when you need to investigate a problem.
:::

## The other headers

**`x-fapi-customer-ip-address`** — The IP address of the customer's device; send it whenever the customer is actively present in a session, so the LFI's fraud controls can see that the request originated from a real user rather than a background process.

**`x-fapi-auth-date`** — The date and time the customer last authenticated with your system (RFC 7231 HTTP-date format); send it on PSU-facing calls so the LFI knows how fresh the authentication is and can apply appropriate session risk controls.

**`x-customer-user-agent`** — The user-agent string of the customer's browser or app; send it when the customer is accessing your service through a browser or native application, as it supports API Hub device fingerprinting and fraud detection.

**`x-idempotency-key`** — A stable, unique key you attach to every `POST /payments` request; if the API Hub has already processed a request with the same key for the same consent, it returns the original response without re-processing — always reuse the same key on retries, never generate a fresh one, or you risk creating a duplicate payment.


See the [Request Headers reference](/tech/tpp-standards/security/request-headers) for format rules, exact conditions, and validation requirements.
