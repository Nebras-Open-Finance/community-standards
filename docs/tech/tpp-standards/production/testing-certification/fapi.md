---
prev: false
next: false
aside: false
---

# FAPI Conformance

Every TPP must obtain a **Relying Party (RP) certification** for their application against the **CBUAE FAPI 2.0 Message Signing Profile** before being promoted to production. This certification is issued by the [OpenID Foundation (OIDF)](https://openid.net/) and is an exit criterion from the API Hub Sandbox.

::: info Test as a client (Relying Party)
TPPs integrate as OAuth 2.0 clients — they consume the LFI's Authorization Server. The correct certification track is therefore the **Relying Party (RP)** test, not the Authorization Server (AS) test. Selecting the wrong track will produce results that are not accepted.
:::



## Certification Required

TPPs must achieve the **CBUAE FAPI 2.0 RP Message Signing ID1** certification. A public list of organisations that have already certified is available at:

[openid.net/certification/certified-cbuae-fapi-2-0-rp-message-signing-id1](https://openid.net/certification/certified-cbuae-fapi-2-0-rp-message-signing-id1/)

Certification must be renewed for each major new version of the Standards.



## Running the Conformance Tests

### 1. Access the Conformance Suite

The OIDF conformance suite is available at [www.certification.openid.net](https://www.certification.openid.net/). Log in with a Google or GitLab account to create and run test plans.

### 2. Configure the Test Plan

When scheduling a new test, use the following configuration exactly:

| Setting | Value |
|---------|-------|
| **Test Plan** | `FAPI2-Message-Signing-ID1: Relying Party (client) test` |
| **Sender Constraining** | `mtls` |
| **Client Authentication Type** | `private_key_jwt` |
| **Authorization Request Type** | `rar` |
| **Request Method** | `signed_non_repudiation` |
| **FAPI Client Type** | `oidc` |
| **FAPI Profile** | `cbuae` |
| **FAPI Response Mode** | `plain_response` |

<ImageViewer
  src="/images/fapi/test-config.png"
  alt="OIDF Conformance Suite test configuration for CBUAE FAPI 2.0 RP Message Signing ID1"
/>

### 3. Note on Test Data Visibility

::: warning Test data becomes public
After running the conformance tests, all data used — including public and private keys of certificates and client data from the test — will be made available in the ecosystem and visible to other participants. If you run the certification in a production environment, you must revoke the certificates used during the tests and obtain any required customer consent. It is strongly recommended to use dedicated test certificates.
:::

### 4. Submit for Certification

Once tests pass, submit your results to the OIDF for certification. Follow the submission instructions at:

[openid.net/how-to-certify-your-implementation](https://openid.net/how-to-certify-your-implementation/)



## Notifying Nebras

TPPs must inform Nebras **immediately** upon receipt of their FAPI Certification from the OIDF. Receipt of certification is an exit criterion from the API Hub Sandbox — production promotion will not proceed until this has been confirmed.



## Fees

Certification fees are fixed and paid directly to the OIDF. The current fee schedule is available at:

[openid.net/certification/fees](https://openid.net/certification/fees/)

Fees are significantly reduced for OIDF members. Institutions that expect to certify multiple implementations or renew frequently may find OIDF membership cost-effective. Membership information and benefits:

- [Join the OpenID Foundation](https://openid.net/foundation/join/)
- [Membership fee schedule](https://openid.net/foundation/members/)



## Support

For questions about running conformance tests or the certification process, contact the OIDF directly:

**Email:** [Certification@oidf.org](mailto:Certification@oidf.org)
