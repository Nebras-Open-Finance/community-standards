---
next: false
prev: false
aside: false
---

# Readiness Checklist

<ReadinessChecklistDownload />

Work through each area in order. All items must be completed before initiating onboarding to production.


### Trust Framework

| Requirement | Yes / No | Notes / Evidence |
|---|---|---|
| Organisation is registered in the Trust Framework Directory | | *Organisation ID:* |
| Application has been created with the correct roles assigned (e.g. BDSP, BSIP) | | *Application name: &nbsp; Roles:* |
| At least one Transport Certificate is active and installed for mTLS | | *Certificate thumbprint:* |
| At least one Signing Certificate is active and available for JWT signing | | *Certificate thumbprint: &nbsp; Key ID (kid):* |
| Production private keys are stored securely, never leave the company's estate, and are never committed to source control — use a FIPS 140-3 certified HSM or a KMS that supports UAE data residency requirements, in line with the [Secure Management of Keys and Credentials](/policy/secure-management) policy | | *HSM / KMS provider:* |
| Certificate expiry is actively monitored and the firm has a documented process to rotate certificates before expiry — a lapsed transport or signing certificate will silently break all LFI connections | | *Monitoring mechanism:* |
| Redirect URIs are registered in the Directory and exactly match what your application sends in authorisation requests — see [Handling Redirect URIs](../trust-framework/redirect-uri/) | | *Redirect URI(s):* |


### API Discovery

| Requirement | Yes / No | Notes |
|---|---|---|
| Can call [GET /participants](../trust-framework/api-discovery/) to retrieve the list of LFIs and their Authorization Server metadata | | |
| Can inspect the API resources and metadata returned per Authorization Server to determine which support the capabilities required by your proposition | | |
| Can resolve an LFI's `DiscoveryEndpointUrl` from the participants response and fetch its [`.well-known/openid-configuration`](../trust-framework/well-known/) to obtain `token_endpoint`, `issuer`, `par_endpoint`, and `registration_endpoint` | | |
| LFI endpoint URLs are resolved dynamically at runtime — they are not hardcoded | | |


### Registration with an LFI

| Requirement | Yes / No | Notes / Evidence |
|---|---|---|
| Successfully called [POST /tpp-registration](../registration/api-guide) on the target LFI (or Model Bank), using the `registration_endpoint` resolved from the `.well-known` endpoint | | *Client ID returned:* |


### Security & FAPI

| Requirement | Yes / No | Notes / Evidence |
|---|---|---|
| Can build and sign a well-formed JWT using your signing key — see [Message Signing](../security/fapi/message-signing) | | *Signing Key ID (kid):* |
| Can build a valid [Client Assertion](../security/tokens/client-assertion) (`private_key_jwt`) | | *Client ID:* |
| Can obtain a Client Credentials access token from the Model Bank's token endpoint | | |
| mTLS is correctly configured on your HTTP client (transport certificate presented on all requests) | | |
| Can construct a valid [PAR request JWT](../security/fapi/request-jwt) including all required claims | | |
| Callback handler correctly extracts the `code` and `state` from the redirect and verifies `state` — see [Handling Authorization Callbacks](../security/fapi/handling-callback) | | |
| Can exchange the authorisation `code` for an access token and refresh token | | |


### Data Sharing

| Requirement | Yes / No | Notes / Evidence |
|---|---|---|
| Can create a Data Sharing consent scoped to the permissions that align with your proposition's use case | | |
| Consent requests only the minimum permissions required — no over-scoping beyond the endpoints your proposition actually calls | | |
| Can complete the full consent, authorisation, and token exchange flow with the Model Bank | | |
| Can resolve the Model Bank's resource server endpoints response to call data endpoints | | |
| Consent state is kept up to date in your systems by polling [`GET /account-access-consents/{ConsentId}`](../v2.1/consent/open-api/account-access-consents-ConsentId) or via webhooks | | *Mechanism used (polling / webhooks):* |
| Can use a Refresh Token to obtain a new Access Token without re-authorising the user — see [Tokens & Assertions](../security/tokens/) | | |
| Consent Management Interface meets the requirements — see [Consent Management Interface](../v2.1/consent/consent-management-interface) | | |


### Error Handling

| Requirement | Yes / No | Notes |
|---|---|---|
| HTTP 4xx responses from the LFI are parsed and surfaced to the user where appropriate | | |
| Expired or revoked tokens trigger a re-authentication flow rather than a silent failure | | |
| Consent `Rejected` and `Revoked` states are handled gracefully | | |
| Network or mTLS failures do not cause payment state to become ambiguous — idempotency keys are preserved for retries | | |


## Production Authorization Servers

List every Authorization Server you intend to register with in production. You can retrieve this information from the [GET /participants](../trust-framework/api-discovery/) endpoint — each entry in the response contains an `OrganisationName` and an `AuthorisationServers` array with `CustomerFriendlyName` and `OpenIDDiscoveryDocument` per server.

| Organisation Name | Authorization Server | OpenID Discovery Document |
|-------------------|----------------------|---------------------------|
| | | |

> Add a row for each Authorization Server. If an LFI operates multiple Authorization Servers (e.g. separate servers for retail and corporate), add a separate row for each.
