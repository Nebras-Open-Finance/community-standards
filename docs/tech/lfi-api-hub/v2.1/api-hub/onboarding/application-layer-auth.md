---
next: false
prev: false
aside: false
---

# Application Layer Authentication

All communication between the API Hub and an LFI is secured at the transport layer using **mutual TLS (mTLS)**. In addition to mTLS, the API Hub supports several **application layer authentication** methods that provide defense-in-depth.

LFIs MUST select an application layer authentication method during onboarding. If you are unsure which method to choose, we recommend **JWT Auth**.

## How to Request Configuration

Indicate your chosen application layer authentication method, via the relevant API Hub Onboarding Service Desk ticket. 

## Communication Directions

Application layer authentication applies to two directions of communication:

| Direction | Description |
|-----------|-------------|
| **API Hub to LFI** (Ozone Connect) | Requests the API Hub sends to your Ozone Connect endpoints when proxying TPP API calls. |
| **LFI to API Hub** (Consent Manager & Headless Heimdall Auth Server) | Requests your authorisation server sends to the API Hub's Consent Manager and Headless Heimdall Auth Server during consent and authorisation flows. |

Not all methods are supported in both directions. The table below summarises availability.

## Available Methods

| Method | API Hub to LFI (Ozone Connect) | LFI to API Hub (CM & Headless Heimdall) |
|--------|:---:|:---:|
| [mTLS Only (Off)](#mtls-only-off) | Yes | Yes |
| [API Key](#api-key) | Yes | No |
| [Client Credentials Grant](#client-credentials-grant) | Yes | No |
| [JWT Auth](#jwt-auth) | Yes | Yes |

::: tip Recommendation
If you are unsure which method to select, choose **JWT Auth**. It offers strong security without requiring additional infrastructure, and is the only method (besides mTLS only) that is supported in both directions.
:::


## mTLS Only (Off)

In this configuration, application layer authentication is switched off. The integration relies solely on the mutual TLS connection for authentication.

This is the simplest option to implement — no additional application-layer work is required beyond configuring mTLS.

The main drawback is the lack of defense-in-depth: security relies on a single layer.

This setting can be applied in both directions.


## API Key

An API Key is a shared secret used between the LFI and the API Hub. The API Hub includes the key in requests to your Ozone Connect endpoints.

API Keys are the most basic form of application layer authentication. While they provide limited security benefit compared to other methods, they MAY be appropriate as a starting point or for LFIs that use an existing API Gateway that enforces API Key validation.

**Constraints:**
- Supported for **Ozone Connect only** (API Hub to LFI direction).
- NOT supported for Consent Manager or Headless Heimdall Auth Server APIs.
- The API Key MUST have a validity of 12 months or more. Key rotation is supported annually.


## Client Credentials Grant

The API Hub obtains an access token via an OIDC Client Credentials Grant from an authorisation server managed by the LFI. The API Hub then includes this token in requests to your Ozone Connect endpoints.

This is a well-established and secure mechanism. Security can be further strengthened by implementing a FAPI profile on the LFI's authorisation server.

**Constraints:**
- Supported for **Ozone Connect only** (API Hub to LFI direction).
- NOT supported for Consent Manager or Headless Heimdall Auth Server APIs.
- Requires the LFI to operate its own authorisation server.
- MAY result in a small increase in latency, as the API Hub makes an additional call to obtain the access token.
- Where a `client_secret` is used, it MUST have a validity of 12 months or more. Secret rotation is supported annually.
- `scope` values are configured during onboarding based on LFI requirements.


## JWT Auth

JWT Auth is a standard for secure and efficient application layer authentication. The requestor creates a signed JWT using a private key and a set of well-defined claims. The receiver verifies the token using the corresponding public key published on a JWKS endpoint hosted by the Trust Framework.

JWT Auth is the **recommended** method. It offers the following advantages:

- Uses **PS256** — a secure asymmetric algorithm that does not rely on shared secrets.
- No additional infrastructure is required — signing keys are generated and managed through the Trust Framework.
- Key rotation is managed by the sending party; the receiver uses the JWKS for verification.
- JWT claims bind the token to the certificates used in the underlying mTLS layer, providing strong binding between transport and application layers.

**Constraints:**
- LFIs MUST implement JWT creation (as client) and JWT validation (as server) in their integration.

**Supported in both directions:**
- **API Hub to LFI** (Ozone Connect) — the API Hub sends a JWT Auth token with each request to your Ozone Connect endpoints. Your server validates the token.
- **LFI to API Hub** (Consent Manager & Headless Heimdall Auth Server) — if you choose to enable this, your authorisation server sends a JWT Auth token with each request to the Consent Manager and Headless Heimdall Auth Server. The API Hub validates the token.

::: info Optional LFI-to-Hub JWT Auth
When selecting JWT Auth, you MAY also choose to send JWT Auth headers on your requests to the Consent Manager and Headless Heimdall Auth Server. This is configured separately — indicate your preference on the Service Desk ticket.
:::

For full technical detail on constructing and validating JWT Auth tokens, see [JWT Auth — Server-side](./configuring-authentication/jwt-server) (your Ozone Connect server validating tokens from the API Hub) and [JWT Auth — Client-side](./configuring-authentication/jwt-client) (your authorisation server sending tokens to the API Hub).
