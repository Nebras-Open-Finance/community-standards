---
next: false
prev: false
aside: false
---

# TrustFramework Checklist

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
| Organisation and Application logos are set in the Trust Framework Directory and accurately represent the organisation and the specific application (service the customer is receiving) respectively | | |


### API Discovery

| Requirement | Yes / No | Notes |
|---|---|---|
| Can call [GET /participants](../trust-framework/api-discovery/) to retrieve the list of LFIs and their Authorization Server metadata | | |
| Can inspect the API resources and metadata returned per Authorization Server to determine which support the capabilities required by your proposition | | |
| Can resolve an LFI's `DiscoveryEndpointUrl` from the participants response and fetch its [`.well-known/openid-configuration`](../trust-framework/well-known/) to obtain `token_endpoint`, `issuer`, `par_endpoint`, and `registration_endpoint` | | |
| LFI endpoint URLs are not hardcoded — they are refreshed periodically from the Trust Framework directory to pick up changes | | |


## Production Authorization Servers

List every Authorization Server you intend to register with in production. You can retrieve this information from the [GET /participants](../trust-framework/api-discovery/) endpoint — each entry in the response contains an `OrganisationName` and an `AuthorisationServers` array with `CustomerFriendlyName` and `OpenIDDiscoveryDocument` per server.

| Organisation Name | Authorization Server | OpenID Discovery Document |
|-------------------|----------------------|---------------------------|
| | | |

> Add a row for each Authorization Server. If an LFI operates multiple Authorization Servers (e.g. separate servers for retail and corporate), add a separate row for each.
