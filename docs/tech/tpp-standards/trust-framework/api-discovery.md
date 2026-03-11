---
next: false
prev: false
aside: false
---

🕒 **15 minute read**

# Trust Framework - API Discovery

The Trust Framework also serves as a central hub for API discovery. LFIs  publish their Open Finance API endpoints, capabilities, and registration details—allowing TPPs to programmatically discover, onboard, and integrate with confidence across the entire Open Finance network.


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


#### Caching

The information returned from <GET /> `/participants` changes infrequently and is cached accordingly. 

- Cache-Control header: max-age=900
- Cache duration: 15 minutes



## Organisations

Each object in the `/participants` response represents an **Organisation** (typically a Licensed Financial Institution) that has exposed at least one **Authorisation Server** available for discovery and integration within the ecosystem.

### Legal & Regulatory Identity

- `OrganisationName`
- `LegalEntityName`
- `RegistrationNumber`
- `CompanyRegister`
- `CountryOfRegistration`
- `Status` 
- `CreatedOn`

These fields confirm the legal identity and operational status of the organization.


## AuthorisationServers

Each **Authorisation Server** represents an **Ozone API Hub** through which a Licensed Financial Institution (LFI) exposes its Open Finance APIs. Each server record includes customer-facing metadata, API resources, and a pointer to its Discovery endpoint.

See [Authorisation Servers](./authorisation-servers) for full details on key properties and how to use them.





## API Resources

See [API Resources](./api-resources) for details on the API families exposed by LFIs.

## Flags & Meta Data

See [Flags & Meta Data](./flags-metadata) for details on organisation/server flags and API metadata fields.