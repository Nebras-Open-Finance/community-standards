import { E as EdCode } from "./EdCode-BQ4YLUeg.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { defineComponent, mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const curlExample = `curl <participants-endpoint> \\
  --request GET`;
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
]`;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "api-discovery",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdBullets = __unplugin_components_5;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdCode = EdCode;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-956abdc6><section class="ed-doc__hero" data-v-956abdc6><div class="ed-doc__inner" data-v-956abdc6><div class="ed-doc__eyebrow" data-v-956abdc6><span class="ed-doc__eyebrow-dash" data-v-956abdc6></span> TPP · Trust Framework · LFI Discovery </div><h1 class="ed-doc__title" data-v-956abdc6> API Discovery <span class="ed-doc__read" data-v-956abdc6>2 min read</span></h1><p class="ed-doc__lede" data-v-956abdc6> The Trust Framework also serves as a central hub for API discovery. LFIs publish their Open Finance API endpoints, capabilities, and registration details — allowing TPPs to programmatically discover, onboard, and integrate with confidence across the entire Open Finance network. </p></div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "prerequisites",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Prerequisites",
        title: "Before you begin",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-956abdc6${_scopeId2}>Understanding of the various organizations within the <a href="/tech/tpp-standards/trust-framework/" data-v-956abdc6${_scopeId2}>Trust Framework</a> and their respective roles in enabling Open Finance.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createTextVNode("Understanding of the various organizations within the "),
                      createVNode("a", { href: "/tech/tpp-standards/trust-framework/" }, "Trust Framework"),
                      createTextVNode(" and their respective roles in enabling Open Finance.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createTextVNode("Understanding of the various organizations within the "),
                    createVNode("a", { href: "/tech/tpp-standards/trust-framework/" }, "Trust Framework"),
                    createTextVNode(" and their respective roles in enabling Open Finance.")
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "participants-endpoint",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "The Participants Endpoint",
        title: "Entry point for discovering Open Finance resources",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The Participants endpoint serves as the entry point for discovering Open Finance resources published by Licensed Financial Institutions (LFIs). When queried, it returns a list of LFI&#39;s associated Authorization Servers. Each Authorization Server record includes detailed metadata such as the OpenID Discovery Document (also referred to as the <code data-v-956abdc6${_scopeId2}>.well-known</code> endpoint), as well as the API resources and endpoints exposed by that server. This information enables Third Party Providers (TPPs) to programmatically discover, register with, and integrate against the APIs offered by each LFI. `);
                } else {
                  return [
                    createTextVNode(" The Participants endpoint serves as the entry point for discovering Open Finance resources published by Licensed Financial Institutions (LFIs). When queried, it returns a list of LFI's associated Authorization Servers. Each Authorization Server record includes detailed metadata such as the OpenID Discovery Document (also referred to as the "),
                    createVNode("code", null, ".well-known"),
                    createTextVNode(" endpoint), as well as the API resources and endpoints exposed by that server. This information enables Third Party Providers (TPPs) to programmatically discover, register with, and integrate against the APIs offered by each LFI. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="ed-doc__endpoint" data-v-956abdc6${_scopeId}><span class="http-badge http-get" data-v-956abdc6${_scopeId}>GET</span><code class="ed-doc__endpoint-path" data-v-956abdc6${_scopeId}>/participants</code></div><h3 data-v-956abdc6${_scopeId}>Example Request</h3>`);
            _push2(ssrRenderComponent(_component_EdCode, {
              code: curlExample,
              lang: "bash",
              filename: "curl"
            }, null, _parent2, _scopeId));
            _push2(`<h3 data-v-956abdc6${_scopeId}>Endpoint</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-956abdc6${_scopeId2}><strong data-v-956abdc6${_scopeId2}>Sandbox:</strong> <a href="https://data.sandbox.directory.openfinance.ae/participants" data-v-956abdc6${_scopeId2}>https://data.sandbox.directory.openfinance.ae/participants</a></li><li data-v-956abdc6${_scopeId2}><strong data-v-956abdc6${_scopeId2}>Production:</strong> <a href="https://data.directory.openfinance.ae/participants" data-v-956abdc6${_scopeId2}>https://data.directory.openfinance.ae/participants</a></li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Sandbox:"),
                      createTextVNode(),
                      createVNode("a", { href: "https://data.sandbox.directory.openfinance.ae/participants" }, "https://data.sandbox.directory.openfinance.ae/participants")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Production:"),
                      createTextVNode(),
                      createVNode("a", { href: "https://data.directory.openfinance.ae/participants" }, "https://data.directory.openfinance.ae/participants")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<details class="ed-doc__details" data-v-956abdc6${_scopeId}><summary data-v-956abdc6${_scopeId}>Example Response</summary>`);
            _push2(ssrRenderComponent(_component_EdCode, {
              code: exampleResponse,
              lang: "json",
              filename: "GET /participants — example response"
            }, null, _parent2, _scopeId));
            _push2(`</details><h3 data-v-956abdc6${_scopeId}>Caching</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The information returned from <span class="endpoint" data-v-956abdc6${_scopeId2}><span class="http-method http-method--get" data-v-956abdc6${_scopeId2}>GET</span><code data-v-956abdc6${_scopeId2}>/participants</code></span> changes infrequently and is cached accordingly. `);
                } else {
                  return [
                    createTextVNode(" The information returned from "),
                    createVNode("span", { class: "endpoint" }, [
                      createVNode("span", { class: "http-method http-method--get" }, "GET"),
                      createVNode("code", null, "/participants")
                    ]),
                    createTextVNode(" changes infrequently and is cached accordingly. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-956abdc6${_scopeId2}><strong data-v-956abdc6${_scopeId2}>Cache-Control header:</strong> <code data-v-956abdc6${_scopeId2}>max-age=900</code></li><li data-v-956abdc6${_scopeId2}><strong data-v-956abdc6${_scopeId2}>Cache duration:</strong> 15 minutes</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Cache-Control header:"),
                      createTextVNode(),
                      createVNode("code", null, "max-age=900")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Cache duration:"),
                      createTextVNode(" 15 minutes")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The Participants endpoint serves as the entry point for discovering Open Finance resources published by Licensed Financial Institutions (LFIs). When queried, it returns a list of LFI's associated Authorization Servers. Each Authorization Server record includes detailed metadata such as the OpenID Discovery Document (also referred to as the "),
                  createVNode("code", null, ".well-known"),
                  createTextVNode(" endpoint), as well as the API resources and endpoints exposed by that server. This information enables Third Party Providers (TPPs) to programmatically discover, register with, and integrate against the APIs offered by each LFI. ")
                ]),
                _: 1
              }),
              createVNode("div", { class: "ed-doc__endpoint" }, [
                createVNode("span", { class: "http-badge http-get" }, "GET"),
                createVNode("code", { class: "ed-doc__endpoint-path" }, "/participants")
              ]),
              createVNode("h3", null, "Example Request"),
              createVNode(_component_EdCode, {
                code: curlExample,
                lang: "bash",
                filename: "curl"
              }),
              createVNode("h3", null, "Endpoint"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Sandbox:"),
                    createTextVNode(),
                    createVNode("a", { href: "https://data.sandbox.directory.openfinance.ae/participants" }, "https://data.sandbox.directory.openfinance.ae/participants")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Production:"),
                    createTextVNode(),
                    createVNode("a", { href: "https://data.directory.openfinance.ae/participants" }, "https://data.directory.openfinance.ae/participants")
                  ])
                ]),
                _: 1
              }),
              createVNode("details", { class: "ed-doc__details" }, [
                createVNode("summary", null, "Example Response"),
                createVNode(_component_EdCode, {
                  code: exampleResponse,
                  lang: "json",
                  filename: "GET /participants — example response"
                })
              ]),
              createVNode("h3", null, "Caching"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The information returned from "),
                  createVNode("span", { class: "endpoint" }, [
                    createVNode("span", { class: "http-method http-method--get" }, "GET"),
                    createVNode("code", null, "/participants")
                  ]),
                  createTextVNode(" changes infrequently and is cached accordingly. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Cache-Control header:"),
                    createTextVNode(),
                    createVNode("code", null, "max-age=900")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Cache duration:"),
                    createTextVNode(" 15 minutes")
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "organisations",
        num: "03",
        color: "var(--at-blue-deep, #1d4ed8)",
        eyebrow: "Organisations",
        title: "Each object represents an Organisation (typically an LFI)",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Each object in the <code data-v-956abdc6${_scopeId2}>/participants</code> response represents an <strong data-v-956abdc6${_scopeId2}>Organisation</strong> (typically a Licensed Financial Institution) that has exposed at least one <strong data-v-956abdc6${_scopeId2}>Authorisation Server</strong> available for discovery and integration within the ecosystem. `);
                } else {
                  return [
                    createTextVNode(" Each object in the "),
                    createVNode("code", null, "/participants"),
                    createTextVNode(" response represents an "),
                    createVNode("strong", null, "Organisation"),
                    createTextVNode(" (typically a Licensed Financial Institution) that has exposed at least one "),
                    createVNode("strong", null, "Authorisation Server"),
                    createTextVNode(" available for discovery and integration within the ecosystem. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-956abdc6${_scopeId}>Legal &amp; Regulatory Identity</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-956abdc6${_scopeId2}><code data-v-956abdc6${_scopeId2}>OrganisationName</code></li><li data-v-956abdc6${_scopeId2}><code data-v-956abdc6${_scopeId2}>LegalEntityName</code></li><li data-v-956abdc6${_scopeId2}><code data-v-956abdc6${_scopeId2}>RegistrationNumber</code></li><li data-v-956abdc6${_scopeId2}><code data-v-956abdc6${_scopeId2}>CompanyRegister</code></li><li data-v-956abdc6${_scopeId2}><code data-v-956abdc6${_scopeId2}>CountryOfRegistration</code></li><li data-v-956abdc6${_scopeId2}><code data-v-956abdc6${_scopeId2}>Status</code></li><li data-v-956abdc6${_scopeId2}><code data-v-956abdc6${_scopeId2}>CreatedOn</code></li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("code", null, "OrganisationName")
                    ]),
                    createVNode("li", null, [
                      createVNode("code", null, "LegalEntityName")
                    ]),
                    createVNode("li", null, [
                      createVNode("code", null, "RegistrationNumber")
                    ]),
                    createVNode("li", null, [
                      createVNode("code", null, "CompanyRegister")
                    ]),
                    createVNode("li", null, [
                      createVNode("code", null, "CountryOfRegistration")
                    ]),
                    createVNode("li", null, [
                      createVNode("code", null, "Status")
                    ]),
                    createVNode("li", null, [
                      createVNode("code", null, "CreatedOn")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`These fields confirm the legal identity and operational status of the organization.`);
                } else {
                  return [
                    createTextVNode("These fields confirm the legal identity and operational status of the organization.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Each object in the "),
                  createVNode("code", null, "/participants"),
                  createTextVNode(" response represents an "),
                  createVNode("strong", null, "Organisation"),
                  createTextVNode(" (typically a Licensed Financial Institution) that has exposed at least one "),
                  createVNode("strong", null, "Authorisation Server"),
                  createTextVNode(" available for discovery and integration within the ecosystem. ")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Legal & Regulatory Identity"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("code", null, "OrganisationName")
                  ]),
                  createVNode("li", null, [
                    createVNode("code", null, "LegalEntityName")
                  ]),
                  createVNode("li", null, [
                    createVNode("code", null, "RegistrationNumber")
                  ]),
                  createVNode("li", null, [
                    createVNode("code", null, "CompanyRegister")
                  ]),
                  createVNode("li", null, [
                    createVNode("code", null, "CountryOfRegistration")
                  ]),
                  createVNode("li", null, [
                    createVNode("code", null, "Status")
                  ]),
                  createVNode("li", null, [
                    createVNode("code", null, "CreatedOn")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("These fields confirm the legal identity and operational status of the organization.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "authorisation-servers",
        num: "04",
        color: "var(--at-navy)",
        eyebrow: "Authorisation Servers",
        title: "Each AS represents an Ozone API Hub",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Each <strong data-v-956abdc6${_scopeId2}>Authorisation Server</strong> represents an <strong data-v-956abdc6${_scopeId2}>Ozone API Hub</strong> through which a Licensed Financial Institution (LFI) exposes its Open Finance APIs. Each server record includes customer-facing metadata, API resources, and a pointer to its Discovery endpoint. `);
                } else {
                  return [
                    createTextVNode(" Each "),
                    createVNode("strong", null, "Authorisation Server"),
                    createTextVNode(" represents an "),
                    createVNode("strong", null, "Ozone API Hub"),
                    createTextVNode(" through which a Licensed Financial Institution (LFI) exposes its Open Finance APIs. Each server record includes customer-facing metadata, API resources, and a pointer to its Discovery endpoint. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` See <a href="/tech/tpp-standards/trust-framework/authorisation-servers" data-v-956abdc6${_scopeId2}>Authorisation Servers</a> for full details on key properties and how to use them. `);
                } else {
                  return [
                    createTextVNode(" See "),
                    createVNode("a", { href: "/tech/tpp-standards/trust-framework/authorisation-servers" }, "Authorisation Servers"),
                    createTextVNode(" for full details on key properties and how to use them. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Each "),
                  createVNode("strong", null, "Authorisation Server"),
                  createTextVNode(" represents an "),
                  createVNode("strong", null, "Ozone API Hub"),
                  createTextVNode(" through which a Licensed Financial Institution (LFI) exposes its Open Finance APIs. Each server record includes customer-facing metadata, API resources, and a pointer to its Discovery endpoint. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" See "),
                  createVNode("a", { href: "/tech/tpp-standards/trust-framework/authorisation-servers" }, "Authorisation Servers"),
                  createTextVNode(" for full details on key properties and how to use them. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "api-resources",
        num: "05",
        color: "var(--at-teal-deep)",
        eyebrow: "API Resources",
        title: "API families exposed by LFIs",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` See <a href="/tech/tpp-standards/trust-framework/api-resources" data-v-956abdc6${_scopeId2}>API Resources</a> for details on the API families exposed by LFIs. `);
                } else {
                  return [
                    createTextVNode(" See "),
                    createVNode("a", { href: "/tech/tpp-standards/trust-framework/api-resources" }, "API Resources"),
                    createTextVNode(" for details on the API families exposed by LFIs. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" See "),
                  createVNode("a", { href: "/tech/tpp-standards/trust-framework/api-resources" }, "API Resources"),
                  createTextVNode(" for details on the API families exposed by LFIs. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "flags-metadata",
        num: "06",
        color: "var(--at-gold)",
        eyebrow: "Flags & Meta Data",
        title: "Organisation/server flags and API metadata fields",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` See <a href="/tech/tpp-standards/trust-framework/flags-metadata" data-v-956abdc6${_scopeId2}>Flags &amp; Meta Data</a> for details on organisation/server flags and API metadata fields. `);
                } else {
                  return [
                    createTextVNode(" See "),
                    createVNode("a", { href: "/tech/tpp-standards/trust-framework/flags-metadata" }, "Flags & Meta Data"),
                    createTextVNode(" for details on organisation/server flags and API metadata fields. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" See "),
                  createVNode("a", { href: "/tech/tpp-standards/trust-framework/flags-metadata" }, "Flags & Meta Data"),
                  createTextVNode(" for details on organisation/server flags and API metadata fields. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/trust-framework/api-discovery.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const apiDiscovery = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-956abdc6"]]);
export {
  apiDiscovery as default
};
