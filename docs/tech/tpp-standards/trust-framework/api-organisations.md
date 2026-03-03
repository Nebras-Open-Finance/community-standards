---
next: false
prev: false
aside: false
---

🕒 **15 minute read**

# Trust Framework - API Discovery

The **Trust Framework** is a trusted registry of Third Party Providers (TPPs) and Licensed Financial Institutions (LFIs). It plays a central role in ensuring security, trust, and interoperability across the ecosystem.

By leveraging digital certificates and software statements, the framework verifies the identity and authorization of participants. These credentials enable secure communication through mutual TLS and are essential for TPPs to register and interact with LFI APIs.

Importantly, the Trust Framework also serves as a central hub for API discovery. LFIs can publish their Open Finance API endpoints, capabilities, and registration details—allowing TPPs to programmatically discover, onboard, and integrate with confidence across the entire Open Finance network.

More information on the [Trust Framework](../trust-framework/)


## Prerequisites

Before you begin, make sure you have:

- Understanding of the various organizations within the [Trust Framework](../trust-framework/) and their respective roles in enabling Open Finance.


## The Participants Endpoint

The Participants endpoint serves as the entry point for discovering Open Finance resources published by Licensed Financial Institutions (LFIs). When queried, it returns a list of LFI's associated Authorization Servers. Each Authorization Server record includes detailed metadata such as the OpenID Discovery Document (also referred to as the `.well-known` endpoint), as well as the API resources and endpoints exposed by that server. This information enables Third Party Providers (TPPs) to programmatically discover, register with, and integrate against the APIs offered by each LFI.


## <GET /> `/participants`


#### Example Request

```bash
curl <participants-endpoint> \
  --request GET
```

#### Endpoint

**Sandbox:** https://data.sandbox.directory.openfinance.ae/participants

**Production:** https://data.directory.openfinance.ae/participants 




<details>
<summary>Example Response</summary>



```json
[
  {
    "OrganisationId": "00000000-0000-0000-0000-000000000001",
    "Status": "Active",
    "OrganisationName": "Example Bank",
    "CreatedOn": "2024-10-09T12:10:40.651Z",
    "LegalEntityName": "Example Bank PJSC",
    "CountryOfRegistration": "AE",
    "CompanyRegister": "Example FreeZone Authority",
    "Tags": null,
    "Flags": {
      "shariah_compliant": ["True"]
    },
    "Size": "LFI",
    "RegistrationNumber": "00.00.00.000.0000.00 / 00000000",
    "RegistrationId": null,
    "RegisteredName": "Example Bank PJSC",
    "AddressLine1": "Example Tower",
    "AddressLine2": null,
    "City": "Dubai",
    "Postcode": "000",
    "Country": "AE",
    "ParentOrganisationReference": "",
    "AuthorisationServers": [
      {
        "Status": "Active",
        "AuthorisationServerId": "00000000-0000-0000-0000-000000000002",
        "AutoRegistrationNotificationWebhook": null,
        "AutoRegistrationSupported": false,
        "CreatedAt": "2025-04-08T10:08:24Z",
        "CustomerFriendlyDescription": "Example-Server",
        "CustomerFriendlyLogoUri": "https://data.sandbox.directory.openfinance.ae/logos/placeholder-logo.png",
        "CustomerFriendlyName": "Example-Server",
        "DeprecatedDate": null,
        "DeveloperPortalUri": null,
        "FederationEndpoint": null,
        "FederationId": null,
        "Issuer": "https://auth.examplebank.openfinance.ae",
        "NotificationWebhook": null,
        "NotificationWebhookAddedDate": null,
        "NotificationWebhookStatus": null,
        "OpenIDDiscoveryDocument": "https://auth.examplebank.openfinance.ae/.well-known/openid-configuration",
        "OrganisationId": "00000000-0000-0000-0000-000000000001",
        "ParentAuthorisationServerId": null,
        "PayloadSigningCertLocationUri": "https://keystore.sandbox.directory.openfinance.ae/00000000-0000-0000-0000-000000000001/application.jwks",
        "RetirementDate": null,
        "SupersededByAuthorisationServerId": null,
        "SupportsCiba": false,
        "SupportsDCR": false,
        "SupportsRedirect": false,
        "TermsOfServiceUri": null,
        "ApiResources": [
          {
            "ApiResourceId": "00000000-0000-0000-0000-000000000003",
            "ApiVersion": "1.0.0",
            "FamilyComplete": false,
            "CertificationStatus": "Self-Certified",
            "ApiFamilyType": "account",
            "Status": "Active",
            "ApiDiscoveryEndpoints": [
              {
                "ApiDiscoveryId": "00000000-0000-0000-0000-000000000004",
                "ApiEndpoint": "https://api.examplebank.ae/open-finance/account-information/v2/accounts"
              }
            ]
          }
        ],
        "AuthorisationServerCertifications": [],
        "Flags": {}
      }
    ],
    "OrgDomainClaims": [
      {
        "AuthorisationDomainName": "Nebras Open Finance LLC",
        "AuthorityName": "Central Bank of UAE",
        "RegistrationId": "",
        "Status": "Active"
      }
    ],
    "OrgDomainRoleClaims": [
      {
        "AuthorisationDomainRoleIdentifier": "00000000-0000-0000-0000-000000000005",
        "Status": "Active",
        "AuthorisationDomain": "Nebras Open Finance LLC",
        "Role": "ISP",
        "RegistrationId": "00.00.00.000.0000.00 / 00000000",
        "UniqueTechnicalIdentifiers": null,
        "Authorisations": [],
        "RoleType": "Federation",
        "Exclusive": false,
        "Metadata": [
          {
            "MetadataId": "00000000-0000-0000-0000-000000000006",
            "DomainRoleName": "ISP",
            "Type": "scope",
            "Name": "insurance",
            "Status": "Active"
          },
          {
            "MetadataId": "00000000-0000-0000-0000-000000000007",
            "DomainRoleName": "ISP",
            "Type": "scope",
            "Name": "openid",
            "Status": "Active"
          },
          {
            "MetadataId": "00000000-0000-0000-0000-000000000008",
            "DomainRoleName": "ISP",
            "Type": "grant_type",
            "Name": "urn:openfinanceuae:insurance-consent:*",
            "Status": "Active"
          },
          {
            "MetadataId": "00000000-0000-0000-0000-000000000009",
            "DomainRoleName": "ISP",
            "Type": "grant_type",
            "Name": "authorization_code",
            "Status": "Active"
          },
          {
            "MetadataId": "00000000-0000-0000-0000-000000000010",
            "DomainRoleName": "ISP",
            "Type": "grant_type",
            "Name": "client_credentials",
            "Status": "Active"
          },
          {
            "MetadataId": "00000000-0000-0000-0000-000000000011",
            "DomainRoleName": "ISP",
            "Type": "grant_type",
            "Name": "refresh_token",
            "Status": "Active"
          }
        ]
      },
      {
        "AuthorisationDomainRoleIdentifier": "00000000-0000-0000-0000-000000000012",
        "Status": "Active",
        "AuthorisationDomain": "Nebras Open Finance LLC",
        "Role": "BDSP",
        "RegistrationId": "00.00.00.000.0000.00 / 00000000",
        "UniqueTechnicalIdentifiers": null,
        "Authorisations": [],
        "RoleType": "Federation",
        "Exclusive": false,
        "Metadata": [
          {
            "MetadataId": "00000000-0000-0000-0000-000000000013",
            "DomainRoleName": "BDSP",
            "Type": "authorization_details_types",
            "Name": "urn:openfinanceuae:account-access-consent:*",
            "Status": "Active"
          },
          {
            "MetadataId": "00000000-0000-0000-0000-000000000014",
            "DomainRoleName": "BDSP",
            "Type": "grant_type",
            "Name": "authorization_code",
            "Status": "Active"
          },
          {
            "MetadataId": "00000000-0000-0000-0000-000000000015",
            "DomainRoleName": "BDSP",
            "Type": "grant_type",
            "Name": "client_credentials",
            "Status": "Active"
          },
          {
            "MetadataId": "00000000-0000-0000-0000-000000000016",
            "DomainRoleName": "BDSP",
            "Type": "grant_type",
            "Name": "refresh_token",
            "Status": "Active"
          },
          {
            "MetadataId": "00000000-0000-0000-0000-000000000017",
            "DomainRoleName": "BDSP",
            "Type": "scope",
            "Name": "accounts",
            "Status": "Active"
          },
          {
            "MetadataId": "00000000-0000-0000-0000-000000000018",
            "DomainRoleName": "BDSP",
            "Type": "scope",
            "Name": "openid",
            "Status": "Active"
          },
          {
            "MetadataId": "00000000-0000-0000-0000-000000000019",
            "DomainRoleName": "BDSP",
            "Type": "scope",
            "Name": "products",
            "Status": "Active"
          }
        ]
      },
      {
        "AuthorisationDomainRoleIdentifier": "00000000-0000-0000-0000-000000000020",
        "Status": "Active",
        "AuthorisationDomain": "Nebras Open Finance LLC",
        "Role": "BSIP",
        "RegistrationId": "00.00.00.000.0000.00 / 00000000",
        "UniqueTechnicalIdentifiers": null,
        "Authorisations": [],
        "RoleType": "Federation",
        "Exclusive": false,
        "Metadata": [
          {
            "MetadataId": "00000000-0000-0000-0000-000000000021",
            "DomainRoleName": "BSIP",
            "Type": "scope",
            "Name": "openid",
            "Status": "Active"
          },
          {
            "MetadataId": "00000000-0000-0000-0000-000000000022",
            "DomainRoleName": "BSIP",
            "Type": "scope",
            "Name": "payments",
            "Status": "Active"
          },
          {
            "MetadataId": "00000000-0000-0000-0000-000000000023",
            "DomainRoleName": "BSIP",
            "Type": "authorization_details_types",
            "Name": "urn:openfinanceuae:service-initiation-consent:*",
            "Status": "Active"
          },
          {
            "MetadataId": "00000000-0000-0000-0000-000000000024",
            "DomainRoleName": "BSIP",
            "Type": "grant_type",
            "Name": "authorization_code",
            "Status": "Active"
          },
          {
            "MetadataId": "00000000-0000-0000-0000-000000000025",
            "DomainRoleName": "BSIP",
            "Type": "grant_type",
            "Name": "client_credentials",
            "Status": "Active"
          },
          {
            "MetadataId": "00000000-0000-0000-0000-000000000026",
            "DomainRoleName": "BSIP",
            "Type": "grant_type",
            "Name": "refresh_token",
            "Status": "Active"
          },
          {
            "MetadataId": "00000000-0000-0000-0000-000000000027",
            "DomainRoleName": "BSIP",
            "Type": "scope",
            "Name": "confirmation-of-payee",
            "Status": "Active"
          },
          {
            "MetadataId": "00000000-0000-0000-0000-000000000028",
            "DomainRoleName": "BSIP",
            "Type": "scope",
            "Name": "products",
            "Status": "Active"
          }
        ]
      },
      {
        "AuthorisationDomainRoleIdentifier": "00000000-0000-0000-0000-000000000029",
        "Status": "Active",
        "AuthorisationDomain": "Nebras Open Finance LLC",
        "Role": "LFI",
        "RegistrationId": "00.00.00.000.0000.00 / 00000000",
        "UniqueTechnicalIdentifiers": null,
        "Authorisations": [],
        "RoleType": "Federation",
        "Exclusive": false,
        "Metadata": []
      }
    ]
  }
] 
```

</details>


## API Resources

The API resources hosted on the LFI's Authorization Server represent the key resources that are exposed through various endpoints. 

The format of these endpoints are:
- Production: `https:rs1.[LFICode].apihub.openfinance.ae/open-finance/[APIFamily]]/[Version]/[Endpoint]` 

- Sandbox: `https:rs1.[LFICode].apihub.preprod.openfinance.ae/open-finance/[APIFamily]]/[Version]/[Endpoint]` 

These endpoints are organized into structured categories known as **API families**. Each API family groups together related functionality, making it easier for TPPs to understand the available services. The following API families are supported:

### API Family – Payment
This family includes endpoints related to initiating and managing payments.
- These endpoints are part of the [Bank Service Initiation](../bank-service-initiation/) functionality and associated with the **BSIP** role.
- Allowed API scopes: `openid payments`

**Consent Endpoints**

These endpoints are used to create and manage payment consents.

- Supported grant type: `client_credentials`

*Example endpoints:*

- `https://rs1.[LFICode].apihub.openfinance.ae/open-finance/payment/[Version]/payment-consents`
- `https://rs1.[LFICode].apihub.openfinance.ae/open-finance/payment/[Version]/payment-consents/{ConsentId}`

**Resource Endpoints**

These endpoints are used to initiate and retrieve payments, including file-based payments.

Supported grant types: `authorization_code`, `refresh_token`

*Example endpoints:*


- `https://rs1.[LFICode].apihub.openfinance.ae/open-finance/payment/[Version]/payments`
- `https://rs1.[LFICode].apihub.openfinance.ae/open-finance/payment/[Version]/payments/{PaymentId}`
- `https://rs1.[LFICode].apihub.openfinance.ae/open-finance/payment/[Version]/file-payments`

<br>


### API Family – Account
This family includes endpoints related to retrieving bank data e.g. accounts, balances, transactions, etc.
- These endpoints are part of the [Bank Data Sharing](../bank-data-sharing/) functionality and are associated with the **BDSP** role.
- Allowed API scopes: `openid accounts`
- Supported grant types: `authorization_code`, `refresh_token`


**Consent Endpoints**

These endpoints are used to create and manage account information consents.

- Supported grant type: `client_credentials`

*Example endpoints:*

- `https://rs1.[LFICode].apihub.openfinance.ae/open-finance/account-information/[Version]/account-access-consents`
- `https://rs1.[LFICode].apihub.openfinance.ae/open-finance/account-information/[Version]/account-access-consents/{ConsentId}`

**Resource Endpoints**

These endpoints are used to retrieve account-information.

- Supported grant types: `authorization_code`, `refresh_token`

*Example endpoints:*

- `https:rs1.[LFICode].apihub.openfinance.ae/open-finance/account-informatio/[Version]/accounts`
- `https:rs1.[LFICode].apihub.openfinance.ae/open-finance/account-informatio/[Version]/accounts/{AccountId}/balances`
- `https:rs1.[LFICode].apihub.openfinance.ae/open-finance/account-informatio/[Version]/accounts/{AccountId}/transactions`

<br>


### API Family – Confirmation of Payee
This family includes endpoints related to the discovery and confirmation of bank account details, such as verifying account ownership before initiating payments.
- These endpoints are part of the [Confirmation of Payee](../confirmation-of-payee/) functionality and are associated with the **BSIP** role.
- Allowed API scopes: `openid payments`
- Supported grant types: `client_credentials`

*Resource Endpoint examples:*
- `https:rs1.[LFICode].apihub.openfinance.ae/open-finance/confirmation-of-payee/[Version]/confirmation`
- `https:rs1.[LFICode].apihub.openfinance.ae/open-finance/confirmation-of-payee/[Version]/discovery`

<br>


### API Family – Banking Product Data
This family includes endpoints related to the discovery of banking products and posting a user who is interested in applying for a banking product.
- These endpoints are part of the [Banking Products](../banking-products/) functionality and are associated with the **BDSP** role.
- Allowed API scopes: `openid accounts`
- Supported grant types: `client_credentials`

*Resource Endpoint examples:*
- `https:rs1.[LFICode].apihub.openfinance.ae/open-finance/product/[Version]/products`
- `https:rs1.[LFICode].apihub.openfinance.ae/open-finance/product/[Version]/leads`

<br>


### API Family – Insurance
This family includes endpoints related to the insurance policy data and creating an insurance quote for a user who is interested in applying for a insurance product.
- These endpoints are part of the [Insurance](../insurance/) functionality and are associated with the **ISP** role.
- Allowed API scopes: `openid insurance`



**Consent Endpoints**

These endpoints are used to create and manage account information consents.

- Supported grant type: `client_credentials`

*Example endpoints:*

- `https://rs1.[LFICode].apihub.openfinance.ae/open-finance/insurance/[Version]/insurance-consents`
- `https://rs1.[LFICode].apihub.openfinance.ae/open-finance/insurance/[Version]/insurance-consents/{ConsentId}`


**Resource Endpoints**

These endpoints are used to create and manage account information consents.

- Supported grant types: `client_credentials`, `authorization_code`, `refresh_token`

*Endpoint examples:*
<InsuranceEndpoints />
<!-- - `https:rs1.[LFICode].apihub.openfinance.ae/open-finance/product/[Version]/employment-insurance-quotes`
- `https:rs1.[LFICode].apihub.openfinance.ae/open-finance/product/[Version]/health-insurance-policies/{InsurancePolicyId}`
- `https:rs1.[LFICode].apihub.openfinance.ae/open-finance/product/[Version]/motor-insurance-policies` -->



<br>


## OpenID Discovery | The `.well-known` Endpoint

The `OpenIDDiscoveryDocument` also known as the `.well-known` endpoint allows a standardized way for Third Party Providers (TPPs) to programmatically retrieve the configuration details of an Authorization Server. From the participants endpoint we get the list of authorization servers. When we have an authorization server we want to integrate with we then hit the `.well-known` endpoint for that authorization server.

When queried, the .well-known endpoint returns a Discovery Document — a JSON object containing metadata required for a TPP to integrate securely with the LFI. This includes:

- `resource_server` – The base URL where protected Open Finance APIs are hosted
- `authorization_endpoint` – The URL where end-users authenticate and authorize access
- `token_endpoint` – The endpoint TPPs use to exchange authorization codes for access tokens
- `issuer` – An identifier for the Authorization Server needed when generating JWTs
- `pushed_authorization_request_endpoint` – Used for submitting signed authorization requests in PAR flows
- `jwks_uri` – URL where the server exposes its public keys for validating JWT signatures
- `registration_endpoint` – Enables Dynamic Client Registration (DCR) using software statements

The `.well-known` endpoint eliminates the need for hardcoded URLs or manual configuration. Allowing TPPs to build scalable and interoperable Open Finance applications that work across multiple LFIs with minimal effort.



## <GET /> `/.well-known/openid-configuration`


#### Example Request

```bash
curl <.well-known-endpoint> \
  --request GET
```

#### Endpoint

The `.well-known` endpoint is typically located at:

`https://<authorization-server>/.well-known/openid-configuration`


<details>
<summary>Example Response</summary>

```json
{
  "issuer": "https://auth1.examplebank.preprod.apihub.openfinance.ae",
  "claims_parameter_supported": true,
  "claims_supported": ["aud", "exp", "nbf"],
  "grant_types_supported": [
    "authorization_code",
    "client_credentials",
    "refresh_token",
    "urn:ietf:params:oauth:grant-type:jwt-bearer",
    "urn:openid:params:grant-type:ciba"
  ],
  "response_types_supported": ["code"],
  "request_parameter_supported": true,
  "request_uri_parameter_supported": true,
  "require_request_uri_registration": true,
  "scopes_supported": [
    "openid",
    "accounts",
    "payments",
    "consents",
    "customers",
    "insurance",
    "profile",
    "confirmation-of-payee",
    "products"
  ],
  "token_endpoint_auth_methods_supported": ["private_key_jwt"],
  "tls_client_certificate_bound_access_tokens": false,
  "code_challenge_methods_supported": ["S256"],
  "claim_types_supported": ["normal"],
  "subject_types_supported": ["public"],
  "token_endpoint": "https://as1.examplebank.preprod.apihub.openfinance.ae/token",
  "authorization_endpoint": "https://ob-dev.examplebank.ae/cbuae/open-banking/v1.2/oauth2/authorize",
  "registration_endpoint": "https://rs1.examplebank.preprod.apihub.openfinance.ae/tpp-registration",
  "jwks_uri": "https://keystore.sandbox.directory.openfinance.ae/db16163c-efb3-4ec2-aa3d-a3d4f466814e/application.jwks",
  "userinfo_endpoint": "https://as1.examplebank.preprod.apihub.openfinance.ae/userinfo",
  "introspection_endpoint": "https://as1.examplebank.preprod.apihub.openfinance.ae/introspection",
  "revocation_endpoint": "https://as1.examplebank.preprod.apihub.openfinance.ae/token/revoke",
  "pushed_authorization_request_endpoint": "https://as1.examplebank.preprod.apihub.openfinance.ae/par",
  "backchannel_authentication_endpoint": "https://as1.examplebank.preprod.apihub.openfinance.ae/bc-authorize",
  "backchannel_token_delivery_modes_supported": ["poll", "ping", "push"],
  "backchannel_authentication_request_signing_alg_values_supported": ["none", "PS256", "RS256", "HS256"],
  "backchannel_user_code_parameter_supported": false,
  "id_token_signing_alg_values_supported": ["PS256"],
  "request_object_signing_alg_values_supported": ["PS256"],
  "request_object_encryption_alg_values_supported": [],
  "request_object_encryption_enc_values_supported": [],
  "token_endpoint_auth_signing_alg_values_supported": ["PS256"],
  "acr_values_supported": [],
  "authorization_details_types_supported": [
    "urn:openfinanceuae:service-initiation-consent:v1.2",
    "urn:openfinanceuae:account-access-consent:v1.2",
    "urn:openfinanceuae:insurance-consent:v1.2"
  ],
  "authorization_signing_alg_values_supported": [],
  "authorization_encryption_alg_values_supported": [],
  "authorization_encryption_enc_values_supported": [],
  "response_modes_supported": ["query"],
  "userinfo_signing_alg_values_supported": ["PS256", "RS256", "HS256", "none"],
  "userinfo_encryption_alg_values_supported": [],
  "userinfo_encryption_enc_values_supported": [],
  "require_pushed_authorization_requests": true,
  "id_token_encryption_alg_values_supported": [],
  "id_token_encryption_enc_values_supported": [],
  "authorization_response_iss_parameter_supported": true
}
```

</details>




<!-- NEEDS DOING -->
<!-- JWKS -->