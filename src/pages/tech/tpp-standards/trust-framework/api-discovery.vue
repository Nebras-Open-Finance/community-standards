<route lang="yaml">
meta:
  title: Trust Framework — API Discovery
</route>

<script setup lang="ts">
const curlExample = `curl <participants-endpoint> \\
  --request GET`

const exampleResponse = `[
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
          { "MetadataId": "00000000-0000-0000-0000-000000000006", "DomainRoleName": "ISP", "Type": "scope", "Name": "insurance", "Status": "Active" },
          { "MetadataId": "00000000-0000-0000-0000-000000000007", "DomainRoleName": "ISP", "Type": "scope", "Name": "openid", "Status": "Active" },
          { "MetadataId": "00000000-0000-0000-0000-000000000008", "DomainRoleName": "ISP", "Type": "grant_type", "Name": "urn:openfinanceuae:insurance-consent:*", "Status": "Active" },
          { "MetadataId": "00000000-0000-0000-0000-000000000009", "DomainRoleName": "ISP", "Type": "grant_type", "Name": "authorization_code", "Status": "Active" },
          { "MetadataId": "00000000-0000-0000-0000-000000000010", "DomainRoleName": "ISP", "Type": "grant_type", "Name": "client_credentials", "Status": "Active" },
          { "MetadataId": "00000000-0000-0000-0000-000000000011", "DomainRoleName": "ISP", "Type": "grant_type", "Name": "refresh_token", "Status": "Active" }
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
          { "MetadataId": "00000000-0000-0000-0000-000000000013", "DomainRoleName": "BDSP", "Type": "authorization_details_types", "Name": "urn:openfinanceuae:account-access-consent:*", "Status": "Active" },
          { "MetadataId": "00000000-0000-0000-0000-000000000014", "DomainRoleName": "BDSP", "Type": "grant_type", "Name": "authorization_code", "Status": "Active" },
          { "MetadataId": "00000000-0000-0000-0000-000000000015", "DomainRoleName": "BDSP", "Type": "grant_type", "Name": "client_credentials", "Status": "Active" },
          { "MetadataId": "00000000-0000-0000-0000-000000000016", "DomainRoleName": "BDSP", "Type": "grant_type", "Name": "refresh_token", "Status": "Active" },
          { "MetadataId": "00000000-0000-0000-0000-000000000017", "DomainRoleName": "BDSP", "Type": "scope", "Name": "accounts", "Status": "Active" },
          { "MetadataId": "00000000-0000-0000-0000-000000000018", "DomainRoleName": "BDSP", "Type": "scope", "Name": "openid", "Status": "Active" },
          { "MetadataId": "00000000-0000-0000-0000-000000000019", "DomainRoleName": "BDSP", "Type": "scope", "Name": "products", "Status": "Active" }
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
          { "MetadataId": "00000000-0000-0000-0000-000000000021", "DomainRoleName": "BSIP", "Type": "scope", "Name": "openid", "Status": "Active" },
          { "MetadataId": "00000000-0000-0000-0000-000000000022", "DomainRoleName": "BSIP", "Type": "scope", "Name": "payments", "Status": "Active" },
          { "MetadataId": "00000000-0000-0000-0000-000000000023", "DomainRoleName": "BSIP", "Type": "authorization_details_types", "Name": "urn:openfinanceuae:service-initiation-consent:*", "Status": "Active" },
          { "MetadataId": "00000000-0000-0000-0000-000000000024", "DomainRoleName": "BSIP", "Type": "grant_type", "Name": "authorization_code", "Status": "Active" },
          { "MetadataId": "00000000-0000-0000-0000-000000000025", "DomainRoleName": "BSIP", "Type": "grant_type", "Name": "client_credentials", "Status": "Active" },
          { "MetadataId": "00000000-0000-0000-0000-000000000026", "DomainRoleName": "BSIP", "Type": "grant_type", "Name": "refresh_token", "Status": "Active" },
          { "MetadataId": "00000000-0000-0000-0000-000000000027", "DomainRoleName": "BSIP", "Type": "scope", "Name": "confirmation-of-payee", "Status": "Active" },
          { "MetadataId": "00000000-0000-0000-0000-000000000028", "DomainRoleName": "BSIP", "Type": "scope", "Name": "products", "Status": "Active" }
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
]`
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          TPP · Trust Framework · LFI Discovery
        </div>
        <h1 class="ed-doc__title">
          API Discovery
          <span class="ed-doc__read">2 min read</span>
        </h1>
        <p class="ed-doc__lede">
          The Trust Framework also serves as a central hub for API discovery. LFIs publish their Open
          Finance API endpoints, capabilities, and registration details &mdash; allowing TPPs to
          programmatically discover, onboard, and integrate with confidence across the entire Open Finance
          network.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="prerequisites"
      num="01"
      color="var(--at-teal)"
      eyebrow="Prerequisites"
      title="Before you begin"
      tone="cream"
    >
      <EdBullets>
        <li>Understanding of the various organizations within the <a href="/tech/tpp-standards/trust-framework/">Trust Framework</a> and their respective roles in enabling Open Finance.</li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="participants-endpoint"
      num="02"
      color="var(--at-gold)"
      eyebrow="The Participants Endpoint"
      title="Entry point for discovering Open Finance resources"
      tone="surface"
    >
      <EdProse>
        The Participants endpoint serves as the entry point for discovering Open Finance resources
        published by Licensed Financial Institutions (LFIs). When queried, it returns a list of LFI's
        associated Authorization Servers. Each Authorization Server record includes detailed metadata such
        as the OpenID Discovery Document (also referred to as the <code>.well-known</code> endpoint), as
        well as the API resources and endpoints exposed by that server. This information enables Third
        Party Providers (TPPs) to programmatically discover, register with, and integrate against the APIs
        offered by each LFI.
      </EdProse>

      <div class="ed-doc__endpoint">
        <span class="http-badge http-get">GET</span>
        <code class="ed-doc__endpoint-path">/participants</code>
      </div>

      <h3>Example Request</h3>
      <EdCode :code="curlExample" lang="bash" filename="curl" />

      <h3>Endpoint</h3>
      <EdBullets>
        <li><strong>Sandbox:</strong> <a href="https://data.sandbox.directory.openfinance.ae/participants">https://data.sandbox.directory.openfinance.ae/participants</a></li>
        <li><strong>Production:</strong> <a href="https://data.directory.openfinance.ae/participants">https://data.directory.openfinance.ae/participants</a></li>
      </EdBullets>

      <details class="ed-doc__details">
        <summary>Example Response</summary>
        <EdCode :code="exampleResponse" lang="json" filename="GET /participants — example response" />
      </details>

      <h3>Caching</h3>
      <EdProse>
        The information returned from <span class="endpoint"><span class="http-method http-method--get">GET</span><code>/participants</code></span> changes infrequently and is cached
        accordingly.
      </EdProse>
      <EdBullets>
        <li><strong>Cache-Control header:</strong> <code>max-age=900</code></li>
        <li><strong>Cache duration:</strong> 15 minutes</li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="organisations"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Organisations"
      title="Each object represents an Organisation (typically an LFI)"
      tone="cream"
    >
      <EdProse>
        Each object in the <code>/participants</code> response represents an <strong>Organisation</strong>
        (typically a Licensed Financial Institution) that has exposed at least one
        <strong>Authorisation Server</strong> available for discovery and integration within the ecosystem.
      </EdProse>

      <h3>Legal &amp; Regulatory Identity</h3>
      <EdBullets>
        <li><code>OrganisationName</code></li>
        <li><code>LegalEntityName</code></li>
        <li><code>RegistrationNumber</code></li>
        <li><code>CompanyRegister</code></li>
        <li><code>CountryOfRegistration</code></li>
        <li><code>Status</code></li>
        <li><code>CreatedOn</code></li>
      </EdBullets>

      <EdProse>These fields confirm the legal identity and operational status of the organization.</EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="authorisation-servers"
      num="04"
      color="var(--at-navy)"
      eyebrow="Authorisation Servers"
      title="Each AS represents an Ozone API Hub"
      tone="surface"
    >
      <EdProse>
        Each <strong>Authorisation Server</strong> represents an <strong>Ozone API Hub</strong> through
        which a Licensed Financial Institution (LFI) exposes its Open Finance APIs. Each server record
        includes customer-facing metadata, API resources, and a pointer to its Discovery endpoint.
      </EdProse>

      <EdProse>
        See <a href="/tech/tpp-standards/trust-framework/authorisation-servers">Authorisation Servers</a>
        for full details on key properties and how to use them.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="api-resources"
      num="05"
      color="var(--at-teal-deep)"
      eyebrow="API Resources"
      title="API families exposed by LFIs"
      tone="cream"
    >
      <EdProse>
        See <a href="/tech/tpp-standards/trust-framework/api-resources">API Resources</a> for details on
        the API families exposed by LFIs.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="flags-metadata"
      num="06"
      color="var(--at-gold)"
      eyebrow="Flags & Meta Data"
      title="Organisation/server flags and API metadata fields"
      tone="surface"
    >
      <EdProse>
        See <a href="/tech/tpp-standards/trust-framework/flags-metadata">Flags &amp; Meta Data</a> for
        details on organisation/server flags and API metadata fields.
      </EdProse>
    </EdSectionBand>
  </div>
</template>

<style scoped>
.ed-doc {
  background: var(--at-bg-cream);
  color: var(--at-navy-deep);
  font-family: var(--at-sans);
  padding-top: 4.25rem;
  min-height: 100vh;
}

.ed-doc__hero { background: var(--at-bg-cream); border-bottom: 1px solid var(--at-grid-line); }
.ed-doc__inner { max-width: var(--at-page-max); margin: 0 auto; padding: 4rem 2rem 3rem; }

.ed-doc__eyebrow {
  font-family: var(--at-mono);
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--at-teal);
  margin-bottom: 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.ed-doc__eyebrow-dash { width: 24px; height: 1px; background: currentColor; }

.ed-doc__title {
  font-family: var(--at-serif);
  font-size: clamp(2.25rem, 5vw, 3.6rem);
  font-weight: 600;
  line-height: 1.02;
  letter-spacing: -0.03em;
  margin: 0;
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.85rem;
}
.ed-doc__read {
  font-family: var(--at-mono);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 500;
  color: var(--at-mute);
  align-self: center;
  padding-left: 0.6rem;
  border-left: 1px solid var(--at-grid-line-2);
}

.ed-doc__lede {
  font-family: var(--at-sans);
  font-size: 1.1rem;
  line-height: 1.65;
  margin: 1.75rem 0 0;
  max-width: 50rem;
  color: var(--at-mute-2);
}

.ed-doc__endpoint {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  margin: 0.5rem 0 1.25rem;
}
.ed-doc__endpoint-path {
  font-family: var(--at-mono);
  font-size: 0.95rem;
  background: var(--at-surface);
  padding: 0.35rem 0.6rem;
  border: 1px solid var(--at-grid-line);
  color: var(--at-navy-deep);
}

.ed-doc__details {
  margin: 1rem 0 1.5rem;
  border: 1px solid var(--at-grid-line);
  background: var(--at-surface);
}
.ed-doc__details > summary {
  font-family: var(--at-mono);
  font-size: 0.7rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-navy-deep);
  padding: 0.85rem 1rem;
  cursor: pointer;
  user-select: none;
}
.ed-doc__details[open] > summary {
  border-bottom: 1px solid var(--at-grid-line);
}

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
}
</style>
