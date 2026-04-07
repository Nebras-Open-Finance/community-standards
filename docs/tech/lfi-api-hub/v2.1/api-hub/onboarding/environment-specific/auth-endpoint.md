---
next: false
prev: false
aside: false
---

# Authorization Endpoint

The **Authorization Endpoint** is the URL to which the API Hub redirects PSUs (customers) during consent authorisation flows. This is where your institution authenticates the PSU and presents the consent for approval.

## What you provide

You MUST provide an authorization URL for each environment:

| Environment | Example |
|-------------|---------|
| Pre-production | `https://openbanking-uat.example.com/auth` |
| Production | `https://openbanking.example.com/auth` |

There can be only **one** authorization URL per API Hub instance.

## How it is used

During the consent authorisation flow:

1. A TPP initiates a consent request via Pushed Authorization Request (PAR) to the API Hub.
2. The API Hub creates the consent and generates an authorization request.
3. The PSU's browser is redirected to **your Authorization Endpoint**.
4. Your system authenticates the PSU and presents the consent details for approval.
5. Your system calls the API Hub's [Headless Heimdall Auth Server](/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/) (`/doConfirm` or `/doFail`) with the result.
6. The PSU is redirected back to the TPP.

For full details on the authorization flow, see [Authentication and Authorization Journey](/tech/lfi-api-hub/v2.1/auth/).

## Requirements

The Authorization Endpoint MUST:

- Use **HTTPS**
- **Not** include query parameters — the API Hub appends its own query parameters during the redirect
- Be compliant with **FAPI 2.0** requirements
- Be accessible to PSU browsers over the public internet
