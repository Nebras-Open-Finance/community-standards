import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { _ as __unplugin_components_9 } from "./EdCodeGroup-zEBrHWfH.js";
import { mergeProps, useSSRContext, defineComponent, withCtx, createTextVNode, createVNode } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { u as useMermaidDiagram, _ as __unplugin_components_8 } from "./APIFlowViewer-C5xJUdUs.js";
import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "mermaid";
import "./useChartTheme-DtmiKid7.js";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const mermaidDefinition = `
sequenceDiagram
    participant App as Application
    participant Auth as Directory Auth
    participant API as Directory API

    App->>+Auth: POST /token (client_credentials, mTLS)
    Auth-->>-App: { access_token }

    App->>+API: GET /organisations (Bearer token, mTLS)
    API-->>-App: [ { OrganisationId, OrganisationName, Size, … } ]

    Note over App: Filter: Size == "TPP"

    loop For each TPP organisation
        App->>+API: GET /organisations/{OrganisationId}/softwarestatements
        API-->>-App: [ { SoftwareStatementId, SoftwareClientName, … } ]
    end
`;
const _sfc_main$1 = {
  __name: "APIFlowsTrustFramework",
  __ssrInlineRender: true,
  setup(__props) {
    useMermaidDiagram(
      mermaidDefinition,
      "trust-framework-diagram",
      {
        sequence: {
          diagramMarginX: 50,
          diagramMarginY: 30,
          actorMargin: 200,
          width: 200,
          height: 65,
          boxMargin: 20,
          messageMargin: 45,
          mirrorActors: false,
          useMaxWidth: true
        }
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "diagram-wrapper" }, _attrs))}><div class="mermaid-container"></div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/api-flows/APIFlowsTrustFramework.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "api-guide",
  __ssrInlineRender: true,
  setup(__props) {
    const tokenTabs = [
      {
        label: "Node.js",
        lang: "typescript",
        code: `import https from 'node:https'
import fs from 'node:fs'

const CLIENT_ID  = process.env.CLIENT_ID!
const AUTH_BASE  = process.env.DIRECTORY_AUTH_BASE!
// production:  https://matls-auth.directory.openfinance.ae
// sandbox:     https://matls-auth.sandbox.directory.openfinance.ae

const agent = new https.Agent({
  cert: fs.readFileSync(process.env.TRANSPORT_CERT_PATH!),
  key:  fs.readFileSync(process.env.TRANSPORT_KEY_PATH!),
})

const params = new URLSearchParams({
  grant_type: 'client_credentials',
  scope:      'directory:software',
  client_id:  CLIENT_ID,
})

const tokenResponse = await fetch(\`\${AUTH_BASE}/token\`, {
  method:  'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body:    params.toString(),
  // @ts-expect-error — Node fetch accepts agent via undici dispatcher or a polyfill
  agent,
})

const { access_token } = await tokenResponse.json()`
      },
      {
        label: "Python",
        lang: "python",
        code: `import os
import httpx

CLIENT_ID  = os.environ["CLIENT_ID"]
AUTH_BASE  = os.environ["DIRECTORY_AUTH_BASE"]
# production:  https://matls-auth.directory.openfinance.ae
# sandbox:     https://matls-auth.sandbox.directory.openfinance.ae

cert = (os.environ["TRANSPORT_CERT_PATH"], os.environ["TRANSPORT_KEY_PATH"])

token_response = httpx.post(
    f"{AUTH_BASE}/token",
    data={
        "grant_type": "client_credentials",
        "scope":      "directory:software",
        "client_id":  CLIENT_ID,
    },
    cert=cert,
)

access_token = token_response.json()["access_token"]`
      }
    ];
    const orgsTabs = [
      {
        label: "Node.js",
        lang: "typescript",
        code: `const API_BASE = process.env.DIRECTORY_API_BASE!
// production:  https://matls-api.directory.openfinance.ae
// sandbox:     https://matls-api.sandbox.directory.openfinance.ae

const orgsResponse = await fetch(\`\${API_BASE}/organisations\`, {
  headers: { Authorization: \`Bearer \${access_token}\` },
  // @ts-expect-error
  agent,
})

const organisations: Organisation[] = await orgsResponse.json()`
      },
      {
        label: "Python",
        lang: "python",
        code: `import httpx

API_BASE = os.environ["DIRECTORY_API_BASE"]
# production:  https://matls-api.directory.openfinance.ae
# sandbox:     https://matls-api.sandbox.directory.openfinance.ae

orgs_response = httpx.get(
    f"{API_BASE}/organisations",
    headers={"Authorization": f"Bearer {access_token}"},
    cert=cert,
)

organisations = orgs_response.json()`
      }
    ];
    const filterTabs = [
      {
        label: "Node.js",
        lang: "typescript",
        code: `const tpps = organisations.filter((org: Organisation) => org.Size === 'TPP')`
      },
      {
        label: "Python",
        lang: "python",
        code: `tpps = [org for org in organisations if org.get("Size") == "TPP"]`
      }
    ];
    const ssTabs = [
      {
        label: "Node.js",
        lang: "typescript",
        code: `interface SoftwareStatement {
  SoftwareStatementId: string
  SoftwareClientName:  string
  Status:              string
  // … additional fields
}

const allSoftwareStatements: (SoftwareStatement & { OrganisationId: string; OrganisationName: string })[] = []

for (const org of tpps) {
  const orgId   = org.OrganisationId
  const orgName = org.OrganisationName ?? 'Unknown'

  const ssResponse = await fetch(
    \`\${API_BASE}/organisations/\${orgId}/softwarestatements\`,
    {
      headers: { Authorization: \`Bearer \${access_token}\` },
      // @ts-expect-error
      agent,
    }
  )

  const statements: SoftwareStatement[] = await ssResponse.json()

  for (const ss of statements) {
    allSoftwareStatements.push({ ...ss, OrganisationId: orgId, OrganisationName: orgName })
  }
}`
      },
      {
        label: "Python",
        lang: "python",
        code: `all_software_statements = []

for org in tpps:
    org_id   = org["OrganisationId"]
    org_name = org.get("OrganisationName", "Unknown")

    ss_response = httpx.get(
        f"{API_BASE}/organisations/{org_id}/softwarestatements",
        headers={"Authorization": f"Bearer {access_token}"},
        cert=cert,
    )

    statements = ss_response.json()

    for ss in statements:
        all_software_statements.append({
            **ss,
            "OrganisationId":   org_id,
            "OrganisationName": org_name,
        })`
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdBullets = __unplugin_components_5;
      const _component_APIFlowViewer = __unplugin_components_8;
      const _component_APIFlowsTrustFramework = _sfc_main$1;
      const _component_EdCodeGroup = __unplugin_components_9;
      const _component_EdRefTable = __unplugin_components_12;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-da1c7083><section class="ed-doc__hero" data-v-da1c7083><div class="ed-doc__inner" data-v-da1c7083><div class="ed-doc__eyebrow" data-v-da1c7083><span class="ed-doc__eyebrow-dash" data-v-da1c7083></span> LFI · Trust Framework · API </div><h1 class="ed-doc__title" data-v-da1c7083> API Guide <span class="ed-doc__read" data-v-da1c7083>2 min read</span></h1><p class="ed-doc__lede" data-v-da1c7083> The Trust Framework directory provides a set of APIs that enable <code data-v-da1c7083>Applications</code> within the framework to communicate and exchange data. </p><p class="ed-doc__lede ed-doc__lede--tight" data-v-da1c7083>This guide explains how a registered Application can:</p><ul class="ed-doc__bullets" data-v-da1c7083><li data-v-da1c7083>Retrieve all registered Organisations</li><li data-v-da1c7083>Filter those Organisations to identify TPPs</li><li data-v-da1c7083>Retrieve the associated Software Statements for each TPP</li></ul><p class="ed-doc__lede ed-doc__lede--tight" data-v-da1c7083> These steps can be used, for example, to generate a report that cross-references Organisations with their corresponding Software Statement applications. </p></div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "prerequisites",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Prerequisites",
        title: "What you need before calling the Trust Framework API",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Before calling the Trust Framework API, ensure the following requirements are met:`);
                } else {
                  return [
                    createTextVNode("Before calling the Trust Framework API, ensure the following requirements are met:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-da1c7083${_scopeId2}><strong data-v-da1c7083${_scopeId2}>Registered <a href="/tech/lfi-api-hub/trust-framework/application" data-v-da1c7083${_scopeId2}>Application</a></strong> — the application must be created within the Trust Framework. </li><li data-v-da1c7083${_scopeId2}><strong data-v-da1c7083${_scopeId2}>Valid <a href="/tech/lfi-api-hub/trust-framework/certificates/" data-v-da1c7083${_scopeId2}>Transport Certificate</a></strong> — an active transport certificate must be issued and registered in the Trust Framework to establish secure <strong data-v-da1c7083${_scopeId2}>mTLS communication</strong>. </li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, [
                        createTextVNode("Registered "),
                        createVNode("a", { href: "/tech/lfi-api-hub/trust-framework/application" }, "Application")
                      ]),
                      createTextVNode(" — the application must be created within the Trust Framework. ")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, [
                        createTextVNode("Valid "),
                        createVNode("a", { href: "/tech/lfi-api-hub/trust-framework/certificates/" }, "Transport Certificate")
                      ]),
                      createTextVNode(" — an active transport certificate must be issued and registered in the Trust Framework to establish secure "),
                      createVNode("strong", null, "mTLS communication"),
                      createTextVNode(". ")
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
                  createTextVNode("Before calling the Trust Framework API, ensure the following requirements are met:")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, [
                      createTextVNode("Registered "),
                      createVNode("a", { href: "/tech/lfi-api-hub/trust-framework/application" }, "Application")
                    ]),
                    createTextVNode(" — the application must be created within the Trust Framework. ")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, [
                      createTextVNode("Valid "),
                      createVNode("a", { href: "/tech/lfi-api-hub/trust-framework/certificates/" }, "Transport Certificate")
                    ]),
                    createTextVNode(" — an active transport certificate must be issued and registered in the Trust Framework to establish secure "),
                    createVNode("strong", null, "mTLS communication"),
                    createTextVNode(". ")
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
        id: "sequence-flow",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "API Sequence Flow",
        title: "End-to-end Trust Framework API call",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_APIFlowViewer, { title: "TrustFramework - Example" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_APIFlowsTrustFramework, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_APIFlowsTrustFramework)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_APIFlowViewer, { title: "TrustFramework - Example" }, {
                default: withCtx(() => [
                  createVNode(_component_APIFlowsTrustFramework)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "step-1",
        num: "03",
        color: "var(--at-blue-deep, #1d4ed8)",
        eyebrow: "Step 1",
        title: "Obtain an Access Token",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The directory uses the OAuth 2.0 <strong data-v-da1c7083${_scopeId2}>client credentials</strong> grant. POST to the directory&#39;s token endpoint, presenting your transport certificate over mTLS: `);
                } else {
                  return [
                    createTextVNode(" The directory uses the OAuth 2.0 "),
                    createVNode("strong", null, "client credentials"),
                    createTextVNode(" grant. POST to the directory's token endpoint, presenting your transport certificate over mTLS: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: tokenTabs }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` See the <a href="/tech/lfi-api-hub/trust-framework/api/token" data-v-da1c7083${_scopeId2}>POST /token</a> API reference for the full request and response schema. `);
                } else {
                  return [
                    createTextVNode(" See the "),
                    createVNode("a", { href: "/tech/lfi-api-hub/trust-framework/api/token" }, "POST /token"),
                    createTextVNode(" API reference for the full request and response schema. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The directory uses the OAuth 2.0 "),
                  createVNode("strong", null, "client credentials"),
                  createTextVNode(" grant. POST to the directory's token endpoint, presenting your transport certificate over mTLS: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCodeGroup, { tabs: tokenTabs }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" See the "),
                  createVNode("a", { href: "/tech/lfi-api-hub/trust-framework/api/token" }, "POST /token"),
                  createTextVNode(" API reference for the full request and response schema. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "step-2",
        num: "04",
        color: "var(--at-navy)",
        eyebrow: "Step 2",
        title: "List all Organisations",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` With the token, call the <code data-v-da1c7083${_scopeId2}>/organisations</code> endpoint to retrieve every organisation registered in the directory: `);
                } else {
                  return [
                    createTextVNode(" With the token, call the "),
                    createVNode("code", null, "/organisations"),
                    createTextVNode(" endpoint to retrieve every organisation registered in the directory: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: orgsTabs }, null, _parent2, _scopeId));
            _push2(`<h3 data-v-da1c7083${_scopeId}>Key response fields</h3>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-da1c7083${_scopeId2}><thead data-v-da1c7083${_scopeId2}><tr data-v-da1c7083${_scopeId2}><th data-v-da1c7083${_scopeId2}>Field</th><th data-v-da1c7083${_scopeId2}>Type</th><th data-v-da1c7083${_scopeId2}>Description</th></tr></thead><tbody data-v-da1c7083${_scopeId2}><tr data-v-da1c7083${_scopeId2}><td data-v-da1c7083${_scopeId2}><code data-v-da1c7083${_scopeId2}>OrganisationId</code></td><td data-v-da1c7083${_scopeId2}>string</td><td data-v-da1c7083${_scopeId2}>Unique identifier for the organisation — used in subsequent calls</td></tr><tr data-v-da1c7083${_scopeId2}><td data-v-da1c7083${_scopeId2}><code data-v-da1c7083${_scopeId2}>OrganisationName</code></td><td data-v-da1c7083${_scopeId2}>string</td><td data-v-da1c7083${_scopeId2}>Human-readable name of the organisation</td></tr><tr data-v-da1c7083${_scopeId2}><td data-v-da1c7083${_scopeId2}><code data-v-da1c7083${_scopeId2}>Size</code></td><td data-v-da1c7083${_scopeId2}>string ≤ 255 chars, <code data-v-da1c7083${_scopeId2}>^[^&lt;&gt;]*$</code></td><td data-v-da1c7083${_scopeId2}><strong data-v-da1c7083${_scopeId2}>Organisation type</strong> — <code data-v-da1c7083${_scopeId2}>&quot;TPP&quot;</code> for Third Party Providers, <code data-v-da1c7083${_scopeId2}>&quot;LFI&quot;</code> for Licensed Financial Institutions. Use this field to filter results to TPPs only.</td></tr><tr data-v-da1c7083${_scopeId2}><td data-v-da1c7083${_scopeId2}><code data-v-da1c7083${_scopeId2}>Status</code></td><td data-v-da1c7083${_scopeId2}>string</td><td data-v-da1c7083${_scopeId2}>Registration status, e.g. <code data-v-da1c7083${_scopeId2}>Active</code></td></tr><tr data-v-da1c7083${_scopeId2}><td data-v-da1c7083${_scopeId2}><code data-v-da1c7083${_scopeId2}>CreatedOn</code></td><td data-v-da1c7083${_scopeId2}>string (ISO 8601)</td><td data-v-da1c7083${_scopeId2}>Date the organisation was registered</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Field"),
                          createVNode("th", null, "Type"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "OrganisationId")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "Unique identifier for the organisation — used in subsequent calls")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "OrganisationName")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "Human-readable name of the organisation")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Size")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("string ≤ 255 chars, "),
                            createVNode("code", null, "^[^<>]*$")
                          ]),
                          createVNode("td", null, [
                            createVNode("strong", null, "Organisation type"),
                            createTextVNode(" — "),
                            createVNode("code", null, '"TPP"'),
                            createTextVNode(" for Third Party Providers, "),
                            createVNode("code", null, '"LFI"'),
                            createTextVNode(" for Licensed Financial Institutions. Use this field to filter results to TPPs only.")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Status")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, [
                            createTextVNode("Registration status, e.g. "),
                            createVNode("code", null, "Active")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "CreatedOn")
                          ]),
                          createVNode("td", null, "string (ISO 8601)"),
                          createVNode("td", null, "Date the organisation was registered")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` See the <a href="/tech/lfi-api-hub/trust-framework/api/organisations" data-v-da1c7083${_scopeId2}>GET /organisations</a> API reference for the full response schema. `);
                } else {
                  return [
                    createTextVNode(" See the "),
                    createVNode("a", { href: "/tech/lfi-api-hub/trust-framework/api/organisations" }, "GET /organisations"),
                    createTextVNode(" API reference for the full response schema. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" With the token, call the "),
                  createVNode("code", null, "/organisations"),
                  createTextVNode(" endpoint to retrieve every organisation registered in the directory: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCodeGroup, { tabs: orgsTabs }),
              createVNode("h3", null, "Key response fields"),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Field"),
                        createVNode("th", null, "Type"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "OrganisationId")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "Unique identifier for the organisation — used in subsequent calls")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "OrganisationName")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "Human-readable name of the organisation")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Size")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("string ≤ 255 chars, "),
                          createVNode("code", null, "^[^<>]*$")
                        ]),
                        createVNode("td", null, [
                          createVNode("strong", null, "Organisation type"),
                          createTextVNode(" — "),
                          createVNode("code", null, '"TPP"'),
                          createTextVNode(" for Third Party Providers, "),
                          createVNode("code", null, '"LFI"'),
                          createTextVNode(" for Licensed Financial Institutions. Use this field to filter results to TPPs only.")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Status")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, [
                          createTextVNode("Registration status, e.g. "),
                          createVNode("code", null, "Active")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "CreatedOn")
                        ]),
                        createVNode("td", null, "string (ISO 8601)"),
                        createVNode("td", null, "Date the organisation was registered")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" See the "),
                  createVNode("a", { href: "/tech/lfi-api-hub/trust-framework/api/organisations" }, "GET /organisations"),
                  createTextVNode(" API reference for the full response schema. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "step-3",
        num: "05",
        color: "var(--at-teal-deep)",
        eyebrow: "Step 3",
        title: "Filter for TPPs",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The <code data-v-da1c7083${_scopeId2}>/organisations</code> response includes both LFIs and TPPs. Use the <code data-v-da1c7083${_scopeId2}>Size</code> field to narrow the list to TPPs only before iterating: `);
                } else {
                  return [
                    createTextVNode(" The "),
                    createVNode("code", null, "/organisations"),
                    createTextVNode(" response includes both LFIs and TPPs. Use the "),
                    createVNode("code", null, "Size"),
                    createTextVNode(" field to narrow the list to TPPs only before iterating: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: filterTabs }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The "),
                  createVNode("code", null, "/organisations"),
                  createTextVNode(" response includes both LFIs and TPPs. Use the "),
                  createVNode("code", null, "Size"),
                  createTextVNode(" field to narrow the list to TPPs only before iterating: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCodeGroup, { tabs: filterTabs })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "step-4",
        num: "06",
        color: "var(--at-gold)",
        eyebrow: "Step 4",
        title: "Retrieve Software Statements",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` For each TPP from Step 3, call the <code data-v-da1c7083${_scopeId2}>/softwarestatements</code> sub-resource using its <code data-v-da1c7083${_scopeId2}>OrganisationId</code>: `);
                } else {
                  return [
                    createTextVNode(" For each TPP from Step 3, call the "),
                    createVNode("code", null, "/softwarestatements"),
                    createTextVNode(" sub-resource using its "),
                    createVNode("code", null, "OrganisationId"),
                    createTextVNode(": ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: ssTabs }, null, _parent2, _scopeId));
            _push2(`<h3 data-v-da1c7083${_scopeId}>Key response fields</h3>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-da1c7083${_scopeId2}><thead data-v-da1c7083${_scopeId2}><tr data-v-da1c7083${_scopeId2}><th data-v-da1c7083${_scopeId2}>Field</th><th data-v-da1c7083${_scopeId2}>Type</th><th data-v-da1c7083${_scopeId2}>Description</th></tr></thead><tbody data-v-da1c7083${_scopeId2}><tr data-v-da1c7083${_scopeId2}><td data-v-da1c7083${_scopeId2}><code data-v-da1c7083${_scopeId2}>SoftwareStatementId</code></td><td data-v-da1c7083${_scopeId2}>string</td><td data-v-da1c7083${_scopeId2}>Unique identifier for the Software Statement</td></tr><tr data-v-da1c7083${_scopeId2}><td data-v-da1c7083${_scopeId2}><code data-v-da1c7083${_scopeId2}>SoftwareClientName</code></td><td data-v-da1c7083${_scopeId2}>string</td><td data-v-da1c7083${_scopeId2}>Human-readable name of the client application</td></tr><tr data-v-da1c7083${_scopeId2}><td data-v-da1c7083${_scopeId2}><code data-v-da1c7083${_scopeId2}>Status</code></td><td data-v-da1c7083${_scopeId2}>string</td><td data-v-da1c7083${_scopeId2}>Status of the Software Statement, e.g. <code data-v-da1c7083${_scopeId2}>Active</code></td></tr><tr data-v-da1c7083${_scopeId2}><td data-v-da1c7083${_scopeId2}><code data-v-da1c7083${_scopeId2}>SoftwareRoles</code></td><td data-v-da1c7083${_scopeId2}>string[]</td><td data-v-da1c7083${_scopeId2}>Roles assigned to this application (e.g. <code data-v-da1c7083${_scopeId2}>BDSP</code>, <code data-v-da1c7083${_scopeId2}>BSIP</code>)</td></tr><tr data-v-da1c7083${_scopeId2}><td data-v-da1c7083${_scopeId2}><code data-v-da1c7083${_scopeId2}>OrganisationId</code></td><td data-v-da1c7083${_scopeId2}>string</td><td data-v-da1c7083${_scopeId2}>The owning organisation (not always returned inline — join from Step 2)</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Field"),
                          createVNode("th", null, "Type"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "SoftwareStatementId")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "Unique identifier for the Software Statement")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "SoftwareClientName")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "Human-readable name of the client application")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Status")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, [
                            createTextVNode("Status of the Software Statement, e.g. "),
                            createVNode("code", null, "Active")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "SoftwareRoles")
                          ]),
                          createVNode("td", null, "string[]"),
                          createVNode("td", null, [
                            createTextVNode("Roles assigned to this application (e.g. "),
                            createVNode("code", null, "BDSP"),
                            createTextVNode(", "),
                            createVNode("code", null, "BSIP"),
                            createTextVNode(")")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "OrganisationId")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "The owning organisation (not always returned inline — join from Step 2)")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` See the <a href="/tech/lfi-api-hub/trust-framework/api/software-statements" data-v-da1c7083${_scopeId2}>GET /softwarestatements</a> API reference for the full response schema. `);
                } else {
                  return [
                    createTextVNode(" See the "),
                    createVNode("a", { href: "/tech/lfi-api-hub/trust-framework/api/software-statements" }, "GET /softwarestatements"),
                    createTextVNode(" API reference for the full response schema. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" For each TPP from Step 3, call the "),
                  createVNode("code", null, "/softwarestatements"),
                  createTextVNode(" sub-resource using its "),
                  createVNode("code", null, "OrganisationId"),
                  createTextVNode(": ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCodeGroup, { tabs: ssTabs }),
              createVNode("h3", null, "Key response fields"),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Field"),
                        createVNode("th", null, "Type"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "SoftwareStatementId")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "Unique identifier for the Software Statement")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "SoftwareClientName")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "Human-readable name of the client application")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Status")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, [
                          createTextVNode("Status of the Software Statement, e.g. "),
                          createVNode("code", null, "Active")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "SoftwareRoles")
                        ]),
                        createVNode("td", null, "string[]"),
                        createVNode("td", null, [
                          createTextVNode("Roles assigned to this application (e.g. "),
                          createVNode("code", null, "BDSP"),
                          createTextVNode(", "),
                          createVNode("code", null, "BSIP"),
                          createTextVNode(")")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "OrganisationId")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "The owning organisation (not always returned inline — join from Step 2)")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" See the "),
                  createVNode("a", { href: "/tech/lfi-api-hub/trust-framework/api/software-statements" }, "GET /softwarestatements"),
                  createTextVNode(" API reference for the full response schema. ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/trust-framework/api/api-guide.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const apiGuide = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-da1c7083"]]);
export {
  apiGuide as default
};
