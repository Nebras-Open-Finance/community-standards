---
next: false
prev: false
aside: false
---

# Getting Started as an LFI

This page outlines the end-to-end journey for a Licensed Financial Institution (LFI) integrating with the UAE Open Finance ecosystem — from first onboarding in the sandbox environment through to live operation with Third-Party Providers (TPPs).

The journey is organised into three phases. Each step builds on the previous one, and each phase should be completed before progressing to the next.

- **Phase A — Pre-production: Build & Integrate.** Register, connect, and develop against the pre-production environment.
- **Phase B — Certification.** Evidence that your implementation meets the functional, user experience, performance, and security standards.
- **Phase C — Production: Launch.** Repeat onboarding in production, validate, publish your resources, and prove live with TPPs.

A consolidated view of responsibilities across the ecosystem is maintained in the [LFI Integration Guide overview](../).

::: tip Phased delivery by capability
Steps 1, 2, 5 and 6 (Trust Framework and API Hub onboarding) are one-off activities per environment. Steps 3, 4 and 7–9 can be delivered iteratively — capability by capability. A bank may, for example, take **Data Sharing** through development, certification and production first, then return to deliver **Service Initiation** through the same steps later. All in-scope capabilities MUST be live by the regulatory compliance deadline, but the path to get there can be staged. See the [Recommended Bank Rollout Plan](./bank-rollout-plan) for suggested sequencing.
:::


## Phase A — Sandbox: Build & Integrate


### Step 1. Onboard to the Sandbox Trust Framework

Register your organisation with the UAE Open Finance Trust Framework in the sandbox. The Trust Framework is the central directory of ecosystem participants — you must be registered here before you can connect to anything else.

**Prerequisites**
- Organisation details and authorised signatories identified.
- Nominated [Organisation Admins](../trust-framework/organisation-admins) and additional users.
- Transport and signing certificates issued by an approved Certificate Authority (see [Keys & Certificates](../trust-framework/certificates/)).
- Agreement on the [Trust Framework Roles](../trust-framework/roles) your organisation requires.

**What to do**
- Complete the [Trust Framework onboarding process](../trust-framework/onboarding), including [organisation admin sign-up](../trust-framework/user-sign-up) and [adding users](../trust-framework/adding-users).
- Upload your [Client Transport](../trust-framework/certificates/client-transport) and [Client Signing](../trust-framework/certificates/client-signing) certificates.
- Register your [Application](../trust-framework/application) and create the [C3-hh-cm-client](../trust-framework/creating-c3-application) that the API Hub will use to call your services.
- Record organisation [contacts](../trust-framework/contacts).

**Done when**
- Your organisation is visible in the sandbox directory with the correct LFI role.
- Your application is registered and certificates are bound to it.
- At least one Organisation Admin and one technical user can authenticate.


### Step 2. Set Up and Connect to the Pre-Production API Hub

The UAE Open Finance [API Hub](../v2.1/api-hub/) (operated by Nebras, with vendor support from Ozone API) is the central intermediary that sits between LFIs and TPPs. It handles OIDC/FAPI security, consent lifecycle, request routing, and schema enforcement. You connect to the Hub once; the Hub manages the complexity of multi-TPP interoperability on your behalf.

**Prerequisites**
- Step 1 complete.
- Infrastructure and network teams engaged; outbound/inbound routes to pre-production Hub endpoints agreed.
- mTLS certificate material in place from Step 1.

**What to do**
- Complete the [Prerequisites Questionnaire](../v2.1/api-hub/onboarding/prerequisites).
- Set up [Connectivity & Certificates](../v2.1/api-hub/connectivity/).
- Configure [Application Layer Authentication](../v2.1/api-hub/onboarding/application-layer-auth), including [JWT Auth](../v2.1/api-hub/onboarding/jwt-auth).
- Apply the [Environment-Specific configuration](../v2.1/api-hub/onboarding/environment-specific/) for pre-production (Ozone Connect base URL, authorization endpoint, certificate walkthroughs).

**Done when**
- The Hub can complete an mTLS handshake with your pre-production environment.
- A test request flows end-to-end: Hub → your Ozone Connect endpoint → response back to the Hub.
- Your application-layer authentication (JWT signatures, audience, expiry) is verified by the Hub.


### Step 3. Develop Your Open Finance APIs

This is the core build phase. It covers both directions of integration between the LFI and the Hub:

- **APIs your LFI exposes (Ozone Connect).** Banking data sharing, payment initiation, Confirmation of Payee, and consent events. The Hub calls these on behalf of authorised TPPs.
- **APIs your LFI consumes (API Hub).** The [Consent Manager](../v2.1/api-hub/consent-manager/) to retrieve, inspect, and revoke consents; and the [Headless Heimdall Auth Server](../v2.1/api-hub/headless-heimdall/) to hand off and return authorization results during the consent journey.

Because API Hub is the single source of truth for consent, your LFI does not maintain independent consent state — it queries the Hub for consent details and writes lifecycle events back to the Hub as the PSU journey progresses.

**Prerequisites**
- Step 2 complete (end-to-end sandbox connectivity verified).
- Product scope agreed (which account types, payment types, and optional APIs are in scope for launch).
- Internal teams aligned on the [consent journey](../v2.1/consent-journey/api-guide) user experience and the [Consent Management Interface](../v2.1/consent-management-interface/) your LFI will provide to customers.

**What to do**
- Implement the LFI-exposed APIs per the OpenAPI specifications.
- Integrate the LFI-consumed APIs:
  - Build the authentication and authorization steps of the [Consent Journey](../v2.1/consent-journey/api-guide), including [SCA](../v2.1/consent-journey/authentication/sca), returning results to Headless Heimdall.
  - Use the [Consent Manager API](../v2.1/api-hub/consent-manager/) to retrieve consent context and expose consents through your [Consent Management Interface](../v2.1/consent-management-interface/).

Because Step 3 is the largest body of work and has strong sequencing dependencies, we recommend following the [Recommended Bank Rollout Plan](./bank-rollout-plan) which walks through the order in which to deliver these capabilities, and how to stage internal delivery against certification milestones.

**Done when (per capability)**
- For the capability in delivery, all endpoints respond in line with their OpenAPI specifications.
- The Hub can drive a full PSU journey for that capability: PAR → authorization at the LFI → token issuance → data or payment call → consent visible in the Consent Management Interface.
- Consent lifecycle events (authorised, revoked, expired) flow cleanly between Hub and LFI in both directions for that capability.

Once the "Done when" criteria are satisfied for a capability, it can proceed into Phase B independently of other capabilities still in development.


## Phase B — Certification


### Step 4. Test and Certify Your Open Finance Capabilities

< ADD LATER >


## Phase C — Production: Launch


### Step 5. Onboard to the Production Trust Framework

Repeat the Trust Framework registration in the production environment. Production is a separate Trust Framework instance with its own directory, certificates, and application registrations — sandbox artefacts are not reused.

**Prerequisites**
- Step 4 complete; certification evidence accepted.
- Production-grade transport and signing certificates issued.

**What to do**
- Re-run the [Trust Framework onboarding](../trust-framework/onboarding) process against production.
- Upload production [certificates](../trust-framework/certificates/) and register the production [C3-hh-cm-client application](../trust-framework/creating-c3-application).
- Confirm production [roles](../trust-framework/roles) and [contacts](../trust-framework/contacts).

**Done when**
- Your organisation is listed in the production Trust Framework directory with the correct role.
- Production application and certificates are registered.


### Step 6. Set Up and Connect to the Production API Hub

Repeat the API Hub connectivity setup in production.

**Prerequisites**
- Step 5 complete.
- Production environment(s) built and available.

**What to do**
- Configure production connectivity and mTLS with the production Hub — see [Connectivity & Certificates](../v2.1/api-hub/connectivity/) and the production-specific entries in [Environment-Specific configuration](../v2.1/api-hub/onboarding/environment-specific/).
- Re-run the [Application Layer Authentication](../v2.1/api-hub/onboarding/application-layer-auth) setup against production keys.

**Done when**
- An mTLS handshake and authenticated test request succeed between the production Hub and your production environment.
- No sandbox credentials or endpoints remain referenced in production configuration.


### Step 7. Validate Your APIs in Production

A pre-live validation pass against the production environment using controlled, internal test accounts. This is the last check before real customer traffic.

**Prerequisites**
- Step 6 complete.
- Controlled test PSUs (bank-staff accounts) available in production.
- Error handling, monitoring, and audit logging enabled.

**What to do**
- Execute the [attestation and self-testing](../production/testing-certification/self-testing) flows against production.
- Walk through full consent, data sharing, and payment journeys end-to-end.
- Verify error mapping, logging, and observability behave as in sandbox.

**Done when**
- All critical flows succeed in production with controlled accounts.
- Monitoring and alerting are confirmed live.
- No real customer traffic has been processed.


### Step 8. Publish Your Open Finance Resources to the Ecosystem

Make your certified production APIs discoverable to TPPs by publishing them in the Trust Framework.

**Prerequisites**
- Step 7 complete.
- Production API resource URLs and metadata finalised.

**What to do**
- In the production Trust Framework, create your [authorisation server](../trust-framework/servers/creating) and register your [API resources](../trust-framework/servers/api/) with the correct metadata (API family, version, endpoints).
- Confirm that directory metadata matches the endpoints actually deployed.

**Done when**
- TPPs can discover your authorisation server and API resources through the Trust Framework directory.
- Resource metadata (family, version, URLs) is correct and consistent with deployed infrastructure.


### Step 9. Live Proving with TPPs

Controlled, real-customer validation with a small number of TPPs before opening to the wider ecosystem.

**Prerequisites**
- Step 8 complete.
- One or more TPP partners identified for buddying.
- Incident response and on-call processes in place.

**What to do**
- Run [TPP Buddying](../production/testing-certification/tpp-buddying) sessions with each partner.
- Exercise the full end-to-end flow with real PSUs.
- Triage and resolve any issues surfaced during proving.

**Done when**
- Each buddying TPP reports successful end-to-end flows with real customers.
- Any defects raised during proving are resolved or formally accepted.
- You are ready to open to general TPP traffic.
