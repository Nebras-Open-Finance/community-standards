---
title: "The tpp and decodedSsa Context Blocks on Ozone Connect Calls"
description: "Every call the API Hub makes to your Ozone Connect endpoints carries a tpp object identifying the calling TPP, plus its decoded Software Statement Assertion. This article explains what each field is, why it's there, and the operational reasons an LFI might want to use it — even though none are required for payment execution."
next: false
prev: false
---

# The `tpp` and `decodedSsa` Context Blocks on Ozone Connect Calls

Every request the API Hub forwards to your Ozone Connect endpoints — `POST /payments`, `GET /accounts`, the various consent actions — carries a `tpp` object inside the request body. The `tpp` object describes the Third-Party Provider on whose behalf the Hub is calling, and includes a nested `decodedSsa` containing the parsed Software Statement Assertion (SSA) that the TPP registered with the Trust Framework.

None of these fields are required for an LFI to **execute** a payment or fulfil a data-sharing request. The API Hub has already authenticated the TPP, validated its certificates against the Trust Framework, and confirmed it is entitled to make the call. The fields are passed through as **context** — useful for audit logs, fraud signals, customer-facing display, compliance reports, and support investigations.

This article documents what is in each field and the situations where an LFI typically uses it.

## When you don't need to do anything

The default position is: **safely ignore everything in `tpp` and `decodedSsa`**. The Hub has already done the work that protects the LFI:

- Verified the TPP's mTLS transport certificate against the Trust Framework directory
- Verified the TPP's signing certificate against the SSA's `jwks_uri`
- Confirmed the TPP's role (`BSIP`, `BDSP`, etc.) entitles it to call this endpoint
- Confirmed the consent referenced by the request belongs to this TPP

If your LFI's payment processing logic does not look at `tpp` or `decodedSsa`, no rule is being broken. They are passed through so the LFI **can** consume them when it has a reason to — they are not a validation surface.

## When the context is useful

| Use case | What you'd read |
|----------|-----------------|
| **Audit log enrichment** — labelling each Ozone Connect call with the human-readable identity of the TPP that triggered it | `tpp.tppName`, `tpp.tppId`, `decodedSsa.client_name` |
| **Customer-facing display** — surfacing the TPP brand in app history (e.g. "Payment initiated by Mario Money") | `decodedSsa.client_name`, `decodedSsa.logo_uri`, `decodedSsa.client_uri` |
| **Fraud and risk signals** — feeding TPP identity, organisation, and roles into your scoring model | `tpp.clientId`, `tpp.orgId`, `decodedSsa.roles`, `decodedSsa.organisation_id` |
| **Compliance / regulatory reporting** — producing per-TPP volume and value reports for the CBUAE | `tpp.tppId`, `tpp.tppName`, `tpp.softwareStatementId` |
| **Support investigations** — correlating an incident to a specific TPP application without round-tripping through Nebras | `tpp.softwareStatementId`, `decodedSsa.client_id` |
| **Privacy / right-to-be-forgotten** — pinning the directory record at the moment of the call so the LFI can prove what was advertised about the TPP at that point in time | `tpp.directoryRecord` |

## The `tpp` object

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `clientId` | string | Yes | The OIDC client identifier issued to the TPP by the Trust Framework. Stable for the life of the TPP application. | `1675793e-d6e3-4954-96c8-acb9aaa83c53` |
| `orgId` | string | Yes | The organisation identifier issued to the TPP's parent organisation by the Trust Framework. One organisation may own many `clientId`s. | `a1b2c3d4-e5f6-7890-abcd-ef0123456789` |
| `tppId` | string | Yes | The identifier the API Hub uses internally to uniquely identify the TPP. Useful when raising support cases with Nebras. | `fdd6e0ac-ba7a-4bc4-a986-c45c5daaaf00` |
| `tppName` | string | Yes | The TPP's registered name as recorded in the Trust Framework. | `Example TPP` |
| `softwareStatementId` | string | Yes | The identifier of the specific software statement (i.e. the registered application) being used. A single `clientId` may have multiple software statements over time. | `XvAjPeeYZAdWwrFF..` |
| `directoryRecord` | string | No | The full TPP directory record retrieved from the CBUAE Trust Framework directory at the time of the call, encoded as a Base64 string. Only present when the Hub fetched it for this request. | `eyJhbW91bnQiOiIxMDAuMDAi..` |
| `decodedSsa` | object | Yes | The decoded Software Statement Assertion — see [The `decodedSsa` object](#the-decodedssa-object) below. | — |

### `clientId` vs `tppId` vs `softwareStatementId`

These three identifiers commonly cause confusion. The mental model:

- **`clientId`** — issued by the Trust Framework when the TPP registers an OIDC client. This is the value the TPP uses as `iss` and `sub` on its client assertions, and what the API Hub records against tokens.
- **`softwareStatementId`** — issued by the Trust Framework when the TPP registers a *specific application* (the SSA). One `clientId` typically has one active SSA, but the SSA can be re-issued (for example after rotating keys) without a new `clientId`.
- **`tppId`** — the Hub's internal identifier. Use this when raising tickets with Nebras; use `clientId` or `softwareStatementId` when correlating with anything published in the Trust Framework.

For audit logging, log all three. They cost nothing to store and answer different questions later.

## The `decodedSsa` object

The Software Statement Assertion is a JWT signed by the Trust Framework that asserts a TPP's identity, the public key set used to verify its requests, and the OAuth metadata for its registered application. The Hub verifies the SSA's signature on every request and forwards the decoded claims under `decodedSsa`.

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `client_id` | string | Yes | Globally unique TPP client identifier issued by the Trust Framework. Matches `tpp.clientId`. | `1675793e-d6e3-4954-96c8-acb9aaa83c53` |
| `client_name` | string | No | Human-readable name of the client as the TPP wants it displayed to end users during authorization flows. Suitable for surfacing in customer-facing app history. | `Example TPP` |
| `client_uri` | string | No | Home page URI of the TPP's client application. Suitable for linking from a "Connected apps" screen. | `https://example.com` |
| `logo_uri` | string | No | URL of the TPP's logo. Suitable for inline display next to historical activity. | `https://example.com/logo.png` |
| `jwks_uri` | string | No | URL where the TPP's JSON Web Key Set is hosted. The Hub uses this to verify the TPP's signed requests; the LFI does **not** need to fetch it. | `https://example.com/jwks.json` |
| `redirect_uris` | array of string | No | The OAuth redirect endpoints registered for this client. Useful for a sanity check during incident response — never call them directly from the LFI. | `["https://example.com/callback"]` |
| `roles` | array of string | No | The Open Finance roles the TPP is entitled to. The presence of `BSIP` (payment initiation), `BDSP` (data sharing), etc. tells you what categories of API the TPP can call. | `["BSIP", "BDSP"]` |
| `sector_identifier_uri` | string | No | OIDC sector identifier URI used for pairwise subject identifiers. Rarely consumed by an LFI. | `https://example.com/sector` |
| `application_type` | string | No | OAuth application type — `web` or `native`. Can feed into device-aware fraud rules. | `web` |
| `organisation_id` | string | No | Identifier of the organisation that owns the client. Matches `tpp.orgId`. | `org-1234` |

::: tip Display fields are TPP-controlled
`client_name`, `client_uri`, and `logo_uri` are values the TPP set when it registered the SSA. They are signed by the Trust Framework, so they have not been tampered with in transit, but the LFI is trusting that the Trust Framework's onboarding controls are sufficient for these to be safe to display to customers. Treat them as trusted display strings, not as authoritative identifiers — use `client_id` / `tpp.tppId` for anything that needs to be a primary key.
:::

## What an LFI should not do with these fields

- **Do not re-authenticate the TPP.** The Hub has already verified the SSA's signature, the TPP's mTLS certificate, and the consent ownership. There is no scenario where re-fetching `jwks_uri` from the LFI side adds security.
- **Do not enforce role checks the Hub already enforces.** If `decodedSsa.roles` does not include the role required for the endpoint, the request would not have reached your Ozone Connect surface in the first place.
- **Do not call any URI in the SSA from the LFI.** `client_uri`, `redirect_uris`, `sector_identifier_uri`, and `jwks_uri` are TPP-controlled URLs. The only system that should fetch them is the API Hub.
- **Do not reject requests for missing optional fields.** Optional means optional; the TPP may legitimately not have set them at registration time.

## Where this context appears

The same `tpp` and `decodedSsa` blocks are present on every Ozone Connect endpoint the API Hub calls — including all payment-initiation endpoints (Single Instant Payment and every Multi-Payment variant), data-sharing endpoints, and consent-action callbacks. The schema is identical across all of them. If your LFI builds a single helper to extract and log this block, the same helper will work everywhere.
