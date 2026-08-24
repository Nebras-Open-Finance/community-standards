import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as _sfc_main$1 } from "./APIFlowsAPIHubArchitecture-HlNuWKOz.js";
import { _ as __unplugin_components_8 } from "./APIFlowViewer-C5xJUdUs.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "mermaid";
import "./useChartTheme-DtmiKid7.js";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_EdSectionBand = __unplugin_components_3;
  const _component_APIFlowViewer = __unplugin_components_8;
  const _component_APIFlowsAPIHubArchitecture = _sfc_main$1;
  const _component_EdProse = __unplugin_components_4;
  const _component_EdRefTable = __unplugin_components_12;
  const _component_EdBullets = __unplugin_components_5;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-d9dddc4c><section class="ed-doc__hero" data-v-d9dddc4c><div class="ed-doc__inner" data-v-d9dddc4c><div class="ed-doc__eyebrow" data-v-d9dddc4c><span class="ed-doc__eyebrow-dash" data-v-d9dddc4c></span> LFI · API Hub · Overview </div><h1 class="ed-doc__title" data-v-d9dddc4c> API Hub Overview <span class="ed-doc__read" data-v-d9dddc4c>5 min read</span></h1><p class="ed-doc__lede" data-v-d9dddc4c> The <strong data-v-d9dddc4c>API Hub</strong> — powered by Ozone — is the central Open Finance gateway that connects Licensed Financial Institutions (LFIs) to the ecosystem. It acts as both the <strong data-v-d9dddc4c>OIDC Authorization Server</strong> and the <strong data-v-d9dddc4c>Open Finance Gateway</strong>, managing all incoming TPP traffic on your behalf. </p><p class="ed-doc__lede ed-doc__lede--tight" data-v-d9dddc4c> As an LFI, you connect your Ozone Connect base URL and authorization endpoint to the Hub <strong data-v-d9dddc4c>once</strong>. The Hub then handles TPP credential verification, security enforcement, request routing, and consent management. </p><p class="ed-doc__lede ed-doc__lede--tight" data-v-d9dddc4c> All TPP traffic MUST flow through the API Hub — TPPs never call LFI Ozone Connect endpoints directly. </p></div></section>`);
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "architecture",
    num: "01",
    color: "var(--at-teal)",
    eyebrow: "Architecture",
    title: "How the API Hub fits between TPPs and your LFI",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_APIFlowViewer, { title: "API Hub Architecture" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_APIFlowsAPIHubArchitecture, null, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_APIFlowsAPIHubArchitecture)
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` The canonical request path is: <strong data-v-d9dddc4c${_scopeId2}>TPP → API Hub → LFI → API Hub → TPP</strong>. The API Hub validates the TPP&#39;s token and consent, enforces OpenAPI schemas, enriches the request with customer and consent context, then proxies it to the corresponding Ozone Connect endpoint on your LFI. Your Ozone Connect endpoint executes the operation and returns the response, which the Hub normalizes before delivering to the TPP. `);
            } else {
              return [
                createTextVNode(" The canonical request path is: "),
                createVNode("strong", null, "TPP → API Hub → LFI → API Hub → TPP"),
                createTextVNode(". The API Hub validates the TPP's token and consent, enforces OpenAPI schemas, enriches the request with customer and consent context, then proxies it to the corresponding Ozone Connect endpoint on your LFI. Your Ozone Connect endpoint executes the operation and returns the response, which the Hub normalizes before delivering to the TPP. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Each LFI&#39;s Hub instance is a <strong data-v-d9dddc4c${_scopeId2}>dedicated isolated tenant</strong> — your consent store, audit logs, and configuration are on completely separate infrastructure from every other LFI in the ecosystem. `);
            } else {
              return [
                createTextVNode(" Each LFI's Hub instance is a "),
                createVNode("strong", null, "dedicated isolated tenant"),
                createTextVNode(" — your consent store, audit logs, and configuration are on completely separate infrastructure from every other LFI in the ecosystem. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_APIFlowViewer, { title: "API Hub Architecture" }, {
            default: withCtx(() => [
              createVNode(_component_APIFlowsAPIHubArchitecture)
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" The canonical request path is: "),
              createVNode("strong", null, "TPP → API Hub → LFI → API Hub → TPP"),
              createTextVNode(". The API Hub validates the TPP's token and consent, enforces OpenAPI schemas, enriches the request with customer and consent context, then proxies it to the corresponding Ozone Connect endpoint on your LFI. Your Ozone Connect endpoint executes the operation and returns the response, which the Hub normalizes before delivering to the TPP. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Each LFI's Hub instance is a "),
              createVNode("strong", null, "dedicated isolated tenant"),
              createTextVNode(" — your consent store, audit logs, and configuration are on completely separate infrastructure from every other LFI in the ecosystem. ")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "hub-responsibilities",
    num: "02",
    color: "var(--at-gold)",
    eyebrow: "What the Hub handles",
    title: "Hub-side responsibilities",
    tone: "surface"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdRefTable, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<table data-v-d9dddc4c${_scopeId2}><thead data-v-d9dddc4c${_scopeId2}><tr data-v-d9dddc4c${_scopeId2}><th data-v-d9dddc4c${_scopeId2}>Responsibility</th><th data-v-d9dddc4c${_scopeId2}>Detail</th></tr></thead><tbody data-v-d9dddc4c${_scopeId2}><tr data-v-d9dddc4c${_scopeId2}><td data-v-d9dddc4c${_scopeId2}><strong data-v-d9dddc4c${_scopeId2}>TPP credential verification</strong></td><td data-v-d9dddc4c${_scopeId2}>Validates the TPP&#39;s certificate and software statement against the Trust Framework on every request</td></tr><tr data-v-d9dddc4c${_scopeId2}><td data-v-d9dddc4c${_scopeId2}><strong data-v-d9dddc4c${_scopeId2}>FAPI 2.0 security</strong></td><td data-v-d9dddc4c${_scopeId2}>Enforces PAR, mTLS-bound access tokens, DPoP, and JWS message signing</td></tr><tr data-v-d9dddc4c${_scopeId2}><td data-v-d9dddc4c${_scopeId2}><strong data-v-d9dddc4c${_scopeId2}>Consent lifecycle</strong></td><td data-v-d9dddc4c${_scopeId2}>Stores and enforces all consent records — data sharing and payment consents. The API Hub is the <strong data-v-d9dddc4c${_scopeId2}>single source of truth</strong> for all consent state</td></tr><tr data-v-d9dddc4c${_scopeId2}><td data-v-d9dddc4c${_scopeId2}><strong data-v-d9dddc4c${_scopeId2}>Token issuance</strong></td><td data-v-d9dddc4c${_scopeId2}>Issues all access tokens to TPPs after successful consent authorization. The API Hub is the sole token issuer — LFIs MUST NOT issue tokens to TPPs</td></tr><tr data-v-d9dddc4c${_scopeId2}><td data-v-d9dddc4c${_scopeId2}><strong data-v-d9dddc4c${_scopeId2}>API routing</strong></td><td data-v-d9dddc4c${_scopeId2}>Routes inbound TPP requests to the correct Ozone Connect endpoint on your LFI, enriching each request with <code data-v-d9dddc4c${_scopeId2}>customerId</code>, <code data-v-d9dddc4c${_scopeId2}>accountIds</code>, and TPP information</td></tr><tr data-v-d9dddc4c${_scopeId2}><td data-v-d9dddc4c${_scopeId2}><strong data-v-d9dddc4c${_scopeId2}>Participant discovery</strong></td><td data-v-d9dddc4c${_scopeId2}>Publishes your <code data-v-d9dddc4c${_scopeId2}>/.well-known/openid-configuration</code> so TPPs can discover your endpoints</td></tr><tr data-v-d9dddc4c${_scopeId2}><td data-v-d9dddc4c${_scopeId2}><strong data-v-d9dddc4c${_scopeId2}>Error mapping</strong></td><td data-v-d9dddc4c${_scopeId2}>Maps LFI error responses to the TPP-facing standard, normalizing response formats across the ecosystem</td></tr><tr data-v-d9dddc4c${_scopeId2}><td data-v-d9dddc4c${_scopeId2}><strong data-v-d9dddc4c${_scopeId2}>Audit logging</strong></td><td data-v-d9dddc4c${_scopeId2}>Maintains a tamper-evident log of all API interactions for regulatory purposes</td></tr></tbody></table>`);
            } else {
              return [
                createVNode("table", null, [
                  createVNode("thead", null, [
                    createVNode("tr", null, [
                      createVNode("th", null, "Responsibility"),
                      createVNode("th", null, "Detail")
                    ])
                  ]),
                  createVNode("tbody", null, [
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("strong", null, "TPP credential verification")
                      ]),
                      createVNode("td", null, "Validates the TPP's certificate and software statement against the Trust Framework on every request")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("strong", null, "FAPI 2.0 security")
                      ]),
                      createVNode("td", null, "Enforces PAR, mTLS-bound access tokens, DPoP, and JWS message signing")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("strong", null, "Consent lifecycle")
                      ]),
                      createVNode("td", null, [
                        createTextVNode("Stores and enforces all consent records — data sharing and payment consents. The API Hub is the "),
                        createVNode("strong", null, "single source of truth"),
                        createTextVNode(" for all consent state")
                      ])
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("strong", null, "Token issuance")
                      ]),
                      createVNode("td", null, "Issues all access tokens to TPPs after successful consent authorization. The API Hub is the sole token issuer — LFIs MUST NOT issue tokens to TPPs")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("strong", null, "API routing")
                      ]),
                      createVNode("td", null, [
                        createTextVNode("Routes inbound TPP requests to the correct Ozone Connect endpoint on your LFI, enriching each request with "),
                        createVNode("code", null, "customerId"),
                        createTextVNode(", "),
                        createVNode("code", null, "accountIds"),
                        createTextVNode(", and TPP information")
                      ])
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("strong", null, "Participant discovery")
                      ]),
                      createVNode("td", null, [
                        createTextVNode("Publishes your "),
                        createVNode("code", null, "/.well-known/openid-configuration"),
                        createTextVNode(" so TPPs can discover your endpoints")
                      ])
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("strong", null, "Error mapping")
                      ]),
                      createVNode("td", null, "Maps LFI error responses to the TPP-facing standard, normalizing response formats across the ecosystem")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("strong", null, "Audit logging")
                      ]),
                      createVNode("td", null, "Maintains a tamper-evident log of all API interactions for regulatory purposes")
                    ])
                  ])
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdRefTable, null, {
            default: withCtx(() => [
              createVNode("table", null, [
                createVNode("thead", null, [
                  createVNode("tr", null, [
                    createVNode("th", null, "Responsibility"),
                    createVNode("th", null, "Detail")
                  ])
                ]),
                createVNode("tbody", null, [
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("strong", null, "TPP credential verification")
                    ]),
                    createVNode("td", null, "Validates the TPP's certificate and software statement against the Trust Framework on every request")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("strong", null, "FAPI 2.0 security")
                    ]),
                    createVNode("td", null, "Enforces PAR, mTLS-bound access tokens, DPoP, and JWS message signing")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("strong", null, "Consent lifecycle")
                    ]),
                    createVNode("td", null, [
                      createTextVNode("Stores and enforces all consent records — data sharing and payment consents. The API Hub is the "),
                      createVNode("strong", null, "single source of truth"),
                      createTextVNode(" for all consent state")
                    ])
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("strong", null, "Token issuance")
                    ]),
                    createVNode("td", null, "Issues all access tokens to TPPs after successful consent authorization. The API Hub is the sole token issuer — LFIs MUST NOT issue tokens to TPPs")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("strong", null, "API routing")
                    ]),
                    createVNode("td", null, [
                      createTextVNode("Routes inbound TPP requests to the correct Ozone Connect endpoint on your LFI, enriching each request with "),
                      createVNode("code", null, "customerId"),
                      createTextVNode(", "),
                      createVNode("code", null, "accountIds"),
                      createTextVNode(", and TPP information")
                    ])
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("strong", null, "Participant discovery")
                    ]),
                    createVNode("td", null, [
                      createTextVNode("Publishes your "),
                      createVNode("code", null, "/.well-known/openid-configuration"),
                      createTextVNode(" so TPPs can discover your endpoints")
                    ])
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("strong", null, "Error mapping")
                    ]),
                    createVNode("td", null, "Maps LFI error responses to the TPP-facing standard, normalizing response formats across the ecosystem")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("strong", null, "Audit logging")
                    ]),
                    createVNode("td", null, "Maintains a tamper-evident log of all API interactions for regulatory purposes")
                  ])
                ])
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
    id: "lfi-responsibilities",
    num: "03",
    color: "var(--at-blue-deep, #1d4ed8)",
    eyebrow: "What you handle",
    title: "LFI-side responsibilities",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdRefTable, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<table data-v-d9dddc4c${_scopeId2}><thead data-v-d9dddc4c${_scopeId2}><tr data-v-d9dddc4c${_scopeId2}><th data-v-d9dddc4c${_scopeId2}>Responsibility</th><th data-v-d9dddc4c${_scopeId2}>Detail</th></tr></thead><tbody data-v-d9dddc4c${_scopeId2}><tr data-v-d9dddc4c${_scopeId2}><td data-v-d9dddc4c${_scopeId2}><strong data-v-d9dddc4c${_scopeId2}>Ozone Connect endpoints</strong></td><td data-v-d9dddc4c${_scopeId2}>Expose your banking APIs (accounts, payments, CoP, etc.) via Ozone Connect. The API Hub routes verified requests to these endpoints</td></tr><tr data-v-d9dddc4c${_scopeId2}><td data-v-d9dddc4c${_scopeId2}><strong data-v-d9dddc4c${_scopeId2}>End user authentication</strong></td><td data-v-d9dddc4c${_scopeId2}>Authenticate the customer when they are redirected to your authorization endpoint during consent flows. The API Hub handles the OIDC authorization protocol; your system authenticates the person</td></tr><tr data-v-d9dddc4c${_scopeId2}><td data-v-d9dddc4c${_scopeId2}><strong data-v-d9dddc4c${_scopeId2}>Business logic &amp; data retrieval</strong></td><td data-v-d9dddc4c${_scopeId2}>Execute the requested operation — retrieve account data, initiate payments, check balances — and return the response per the LFI OpenAPI specification</td></tr><tr data-v-d9dddc4c${_scopeId2}><td data-v-d9dddc4c${_scopeId2}><strong data-v-d9dddc4c${_scopeId2}>Fraud &amp; risk checks</strong></td><td data-v-d9dddc4c${_scopeId2}>Apply your institution&#39;s fraud detection and risk assessment on incoming requests</td></tr><tr data-v-d9dddc4c${_scopeId2}><td data-v-d9dddc4c${_scopeId2}><strong data-v-d9dddc4c${_scopeId2}>Consent authorization UX</strong></td><td data-v-d9dddc4c${_scopeId2}>Present the consent details to the end user and capture their authorization decision via your application</td></tr></tbody></table>`);
            } else {
              return [
                createVNode("table", null, [
                  createVNode("thead", null, [
                    createVNode("tr", null, [
                      createVNode("th", null, "Responsibility"),
                      createVNode("th", null, "Detail")
                    ])
                  ]),
                  createVNode("tbody", null, [
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("strong", null, "Ozone Connect endpoints")
                      ]),
                      createVNode("td", null, "Expose your banking APIs (accounts, payments, CoP, etc.) via Ozone Connect. The API Hub routes verified requests to these endpoints")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("strong", null, "End user authentication")
                      ]),
                      createVNode("td", null, "Authenticate the customer when they are redirected to your authorization endpoint during consent flows. The API Hub handles the OIDC authorization protocol; your system authenticates the person")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("strong", null, "Business logic & data retrieval")
                      ]),
                      createVNode("td", null, "Execute the requested operation — retrieve account data, initiate payments, check balances — and return the response per the LFI OpenAPI specification")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("strong", null, "Fraud & risk checks")
                      ]),
                      createVNode("td", null, "Apply your institution's fraud detection and risk assessment on incoming requests")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("strong", null, "Consent authorization UX")
                      ]),
                      createVNode("td", null, "Present the consent details to the end user and capture their authorization decision via your application")
                    ])
                  ])
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdRefTable, null, {
            default: withCtx(() => [
              createVNode("table", null, [
                createVNode("thead", null, [
                  createVNode("tr", null, [
                    createVNode("th", null, "Responsibility"),
                    createVNode("th", null, "Detail")
                  ])
                ]),
                createVNode("tbody", null, [
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("strong", null, "Ozone Connect endpoints")
                    ]),
                    createVNode("td", null, "Expose your banking APIs (accounts, payments, CoP, etc.) via Ozone Connect. The API Hub routes verified requests to these endpoints")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("strong", null, "End user authentication")
                    ]),
                    createVNode("td", null, "Authenticate the customer when they are redirected to your authorization endpoint during consent flows. The API Hub handles the OIDC authorization protocol; your system authenticates the person")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("strong", null, "Business logic & data retrieval")
                    ]),
                    createVNode("td", null, "Execute the requested operation — retrieve account data, initiate payments, check balances — and return the response per the LFI OpenAPI specification")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("strong", null, "Fraud & risk checks")
                    ]),
                    createVNode("td", null, "Apply your institution's fraud detection and risk assessment on incoming requests")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("strong", null, "Consent authorization UX")
                    ]),
                    createVNode("td", null, "Present the consent details to the end user and capture their authorization decision via your application")
                  ])
                ])
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
    id: "consent-and-data",
    num: "04",
    color: "var(--at-navy)",
    eyebrow: "Consent & data",
    title: "Hub as the single source of truth",
    tone: "surface"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<strong data-v-d9dddc4c${_scopeId2}>The Hub is the source of truth for all consent records.</strong> Whether a customer revokes a consent through your CMI, or a TPP modifies a consent through their interface, both parties MUST patch the change to the Hub immediately. LFIs MUST NOT maintain independent consent state that diverges from the Hub&#39;s record. Any consent state held in your own systems must exactly match the Hub&#39;s record at all times. `);
            } else {
              return [
                createVNode("strong", null, "The Hub is the source of truth for all consent records."),
                createTextVNode(" Whether a customer revokes a consent through your CMI, or a TPP modifies a consent through their interface, both parties MUST patch the change to the Hub immediately. LFIs MUST NOT maintain independent consent state that diverges from the Hub's record. Any consent state held in your own systems must exactly match the Hub's record at all times. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<strong data-v-d9dddc4c${_scopeId2}>The Hub never reads or stores request and response payload data.</strong> Account details, transaction records, payment instructions, and all other customer data returned by your Ozone Connect endpoints are routed through the Hub transparently — they are never inspected, logged, or retained. Only consent metadata and interaction audit events are stored by the Hub. `);
            } else {
              return [
                createVNode("strong", null, "The Hub never reads or stores request and response payload data."),
                createTextVNode(" Account details, transaction records, payment instructions, and all other customer data returned by your Ozone Connect endpoints are routed through the Hub transparently — they are never inspected, logged, or retained. Only consent metadata and interaction audit events are stored by the Hub. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createVNode("strong", null, "The Hub is the source of truth for all consent records."),
              createTextVNode(" Whether a customer revokes a consent through your CMI, or a TPP modifies a consent through their interface, both parties MUST patch the change to the Hub immediately. LFIs MUST NOT maintain independent consent state that diverges from the Hub's record. Any consent state held in your own systems must exactly match the Hub's record at all times. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createVNode("strong", null, "The Hub never reads or stores request and response payload data."),
              createTextVNode(" Account details, transaction records, payment instructions, and all other customer data returned by your Ozone Connect endpoints are routed through the Hub transparently — they are never inspected, logged, or retained. Only consent metadata and interaction audit events are stored by the Hub. ")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "trust-model",
    num: "05",
    color: "var(--at-teal-deep)",
    eyebrow: "Trust model",
    title: "What the LFI delegates to the Hub",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` LFIs trust the API Hub for token validation and consent validation. When the Hub forwards a request to your Ozone Connect endpoint, the token and consent have already been verified — you do not need to re-query consent state from a separate store. `);
            } else {
              return [
                createTextVNode(" LFIs trust the API Hub for token validation and consent validation. When the Hub forwards a request to your Ozone Connect endpoint, the token and consent have already been verified — you do not need to re-query consent state from a separate store. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Your Ozone Connect endpoints SHOULD validate the Bearer token signature and claims (issuer, audience, expiry, scope) as described in <a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/application-layer-auth" data-v-d9dddc4c${_scopeId2}>Application Layer Authentication</a>, but MUST NOT independently re-validate consent state against a separate consent store. The Hub&#39;s consent record is authoritative. `);
            } else {
              return [
                createTextVNode(" Your Ozone Connect endpoints SHOULD validate the Bearer token signature and claims (issuer, audience, expiry, scope) as described in "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/application-layer-auth" }, "Application Layer Authentication"),
                createTextVNode(", but MUST NOT independently re-validate consent state against a separate consent store. The Hub's consent record is authoritative. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" LFIs trust the API Hub for token validation and consent validation. When the Hub forwards a request to your Ozone Connect endpoint, the token and consent have already been verified — you do not need to re-query consent state from a separate store. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Your Ozone Connect endpoints SHOULD validate the Bearer token signature and claims (issuer, audience, expiry, scope) as described in "),
              createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/application-layer-auth" }, "Application Layer Authentication"),
              createTextVNode(", but MUST NOT independently re-validate consent state against a separate consent store. The Hub's consent record is authoritative. ")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "request-lifecycle",
    num: "06",
    color: "var(--at-gold)",
    eyebrow: "Request lifecycle",
    title: "Consent authorization and API request flows",
    tone: "surface"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<h3 data-v-d9dddc4c${_scopeId}>Consent authorization</h3>`);
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-d9dddc4c${_scopeId2}>TPP initiates a consent request via <strong data-v-d9dddc4c${_scopeId2}>Pushed Authorization Request (PAR)</strong> to the API Hub</li><li data-v-d9dddc4c${_scopeId2}>API Hub creates and stores the consent record</li><li data-v-d9dddc4c${_scopeId2}>End user is redirected to your <strong data-v-d9dddc4c${_scopeId2}>authorization endpoint</strong></li><li data-v-d9dddc4c${_scopeId2}>Your system <strong data-v-d9dddc4c${_scopeId2}>authenticates the end user</strong> and presents the consent details for approval</li><li data-v-d9dddc4c${_scopeId2}> Your system calls the API Hub (<a href="/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/open-api/auth-interactionId-doConfirm" data-v-d9dddc4c${_scopeId2}><code data-v-d9dddc4c${_scopeId2}>/doConfirm</code></a> or <a href="/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/open-api/auth-interactionId-doFail" data-v-d9dddc4c${_scopeId2}><code data-v-d9dddc4c${_scopeId2}>/doFail</code></a>) with the authorization result </li><li data-v-d9dddc4c${_scopeId2}>API Hub issues an access token to the TPP</li>`);
            } else {
              return [
                createVNode("li", null, [
                  createTextVNode("TPP initiates a consent request via "),
                  createVNode("strong", null, "Pushed Authorization Request (PAR)"),
                  createTextVNode(" to the API Hub")
                ]),
                createVNode("li", null, "API Hub creates and stores the consent record"),
                createVNode("li", null, [
                  createTextVNode("End user is redirected to your "),
                  createVNode("strong", null, "authorization endpoint")
                ]),
                createVNode("li", null, [
                  createTextVNode("Your system "),
                  createVNode("strong", null, "authenticates the end user"),
                  createTextVNode(" and presents the consent details for approval")
                ]),
                createVNode("li", null, [
                  createTextVNode(" Your system calls the API Hub ("),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/open-api/auth-interactionId-doConfirm" }, [
                    createVNode("code", null, "/doConfirm")
                  ]),
                  createTextVNode(" or "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/open-api/auth-interactionId-doFail" }, [
                    createVNode("code", null, "/doFail")
                  ]),
                  createTextVNode(") with the authorization result ")
                ]),
                createVNode("li", null, "API Hub issues an access token to the TPP")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` For full authorization server integration details, see <a href="/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/" data-v-d9dddc4c${_scopeId2}>Headless Heimdall</a>. `);
            } else {
              return [
                createTextVNode(" For full authorization server integration details, see "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/" }, "Headless Heimdall"),
                createTextVNode(". ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 data-v-d9dddc4c${_scopeId}>API request</h3>`);
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-d9dddc4c${_scopeId2}>TPP sends an API request with its access token to the API Hub</li><li data-v-d9dddc4c${_scopeId2}>API Hub validates the token and consent, enforces the OpenAPI schema, and enriches the request with customer and consent context</li><li data-v-d9dddc4c${_scopeId2}>API Hub proxies the request to the corresponding <strong data-v-d9dddc4c${_scopeId2}>Ozone Connect</strong> endpoint on your LFI</li><li data-v-d9dddc4c${_scopeId2}>Your Ozone Connect endpoint executes the operation and returns the response per the LFI OpenAPI specification</li><li data-v-d9dddc4c${_scopeId2}>API Hub normalizes the response and returns it to the TPP</li>`);
            } else {
              return [
                createVNode("li", null, "TPP sends an API request with its access token to the API Hub"),
                createVNode("li", null, "API Hub validates the token and consent, enforces the OpenAPI schema, and enriches the request with customer and consent context"),
                createVNode("li", null, [
                  createTextVNode("API Hub proxies the request to the corresponding "),
                  createVNode("strong", null, "Ozone Connect"),
                  createTextVNode(" endpoint on your LFI")
                ]),
                createVNode("li", null, "Your Ozone Connect endpoint executes the operation and returns the response per the LFI OpenAPI specification"),
                createVNode("li", null, "API Hub normalizes the response and returns it to the TPP")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` For request authentication details, see <a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/application-layer-auth" data-v-d9dddc4c${_scopeId2}>Application Layer Authentication</a>. `);
            } else {
              return [
                createTextVNode(" For request authentication details, see "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/application-layer-auth" }, "Application Layer Authentication"),
                createTextVNode(". ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode("h3", null, "Consent authorization"),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, [
                createTextVNode("TPP initiates a consent request via "),
                createVNode("strong", null, "Pushed Authorization Request (PAR)"),
                createTextVNode(" to the API Hub")
              ]),
              createVNode("li", null, "API Hub creates and stores the consent record"),
              createVNode("li", null, [
                createTextVNode("End user is redirected to your "),
                createVNode("strong", null, "authorization endpoint")
              ]),
              createVNode("li", null, [
                createTextVNode("Your system "),
                createVNode("strong", null, "authenticates the end user"),
                createTextVNode(" and presents the consent details for approval")
              ]),
              createVNode("li", null, [
                createTextVNode(" Your system calls the API Hub ("),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/open-api/auth-interactionId-doConfirm" }, [
                  createVNode("code", null, "/doConfirm")
                ]),
                createTextVNode(" or "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/open-api/auth-interactionId-doFail" }, [
                  createVNode("code", null, "/doFail")
                ]),
                createTextVNode(") with the authorization result ")
              ]),
              createVNode("li", null, "API Hub issues an access token to the TPP")
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" For full authorization server integration details, see "),
              createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/" }, "Headless Heimdall"),
              createTextVNode(". ")
            ]),
            _: 1
          }),
          createVNode("h3", null, "API request"),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, "TPP sends an API request with its access token to the API Hub"),
              createVNode("li", null, "API Hub validates the token and consent, enforces the OpenAPI schema, and enriches the request with customer and consent context"),
              createVNode("li", null, [
                createTextVNode("API Hub proxies the request to the corresponding "),
                createVNode("strong", null, "Ozone Connect"),
                createTextVNode(" endpoint on your LFI")
              ]),
              createVNode("li", null, "Your Ozone Connect endpoint executes the operation and returns the response per the LFI OpenAPI specification"),
              createVNode("li", null, "API Hub normalizes the response and returns it to the TPP")
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" For request authentication details, see "),
              createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/application-layer-auth" }, "Application Layer Authentication"),
              createTextVNode(". ")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "endpoints-you-register",
    num: "07",
    color: "var(--at-blue-deep, #1d4ed8)",
    eyebrow: "Endpoints you register",
    title: "Two endpoints per environment",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`Two endpoints you operate are registered with the Hub per environment:`);
            } else {
              return [
                createTextVNode("Two endpoints you operate are registered with the Hub per environment:")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-d9dddc4c${_scopeId2}><a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/ozone-connect-url" data-v-d9dddc4c${_scopeId2}><strong data-v-d9dddc4c${_scopeId2}>Ozone Connect Base URL</strong></a> — your Ozone Connect base URL; the Hub forwards verified TPP requests here for accounts, payments, CoP, and other Open Finance APIs </li><li data-v-d9dddc4c${_scopeId2}><a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/auth-endpoint" data-v-d9dddc4c${_scopeId2}><strong data-v-d9dddc4c${_scopeId2}>Authorization Endpoint</strong></a> — customers are redirected here to <strong data-v-d9dddc4c${_scopeId2}>authenticate</strong> and authorize consent requests; this is where your institution verifies the end user&#39;s identity </li>`);
            } else {
              return [
                createVNode("li", null, [
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/ozone-connect-url" }, [
                    createVNode("strong", null, "Ozone Connect Base URL")
                  ]),
                  createTextVNode(" — your Ozone Connect base URL; the Hub forwards verified TPP requests here for accounts, payments, CoP, and other Open Finance APIs ")
                ]),
                createVNode("li", null, [
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/auth-endpoint" }, [
                    createVNode("strong", null, "Authorization Endpoint")
                  ]),
                  createTextVNode(" — customers are redirected here to "),
                  createVNode("strong", null, "authenticate"),
                  createTextVNode(" and authorize consent requests; this is where your institution verifies the end user's identity ")
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
              createTextVNode("Two endpoints you operate are registered with the Hub per environment:")
            ]),
            _: 1
          }),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, [
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/ozone-connect-url" }, [
                  createVNode("strong", null, "Ozone Connect Base URL")
                ]),
                createTextVNode(" — your Ozone Connect base URL; the Hub forwards verified TPP requests here for accounts, payments, CoP, and other Open Finance APIs ")
              ]),
              createVNode("li", null, [
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/auth-endpoint" }, [
                  createVNode("strong", null, "Authorization Endpoint")
                ]),
                createTextVNode(" — customers are redirected here to "),
                createVNode("strong", null, "authenticate"),
                createTextVNode(" and authorize consent requests; this is where your institution verifies the end user's identity ")
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
    id: "environments",
    num: "08",
    color: "var(--at-navy)",
    eyebrow: "Environments",
    title: "Pre-production and production",
    tone: "surface"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdRefTable, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<table data-v-d9dddc4c${_scopeId2}><thead data-v-d9dddc4c${_scopeId2}><tr data-v-d9dddc4c${_scopeId2}><th data-v-d9dddc4c${_scopeId2}>Environment</th><th data-v-d9dddc4c${_scopeId2}>Trust Framework</th><th data-v-d9dddc4c${_scopeId2}>Purpose</th></tr></thead><tbody data-v-d9dddc4c${_scopeId2}><tr data-v-d9dddc4c${_scopeId2}><td data-v-d9dddc4c${_scopeId2}><strong data-v-d9dddc4c${_scopeId2}>Pre-production</strong></td><td data-v-d9dddc4c${_scopeId2}>Sandbox</td><td data-v-d9dddc4c${_scopeId2}>Register an application in the Sandbox Trust Framework and use it to act as a TPP against the pre-production Hub — complete consent journeys and call the APIs to verify your Ozone Connect implementation end-to-end</td></tr><tr data-v-d9dddc4c${_scopeId2}><td data-v-d9dddc4c${_scopeId2}><strong data-v-d9dddc4c${_scopeId2}>Production</strong></td><td data-v-d9dddc4c${_scopeId2}>Production</td><td data-v-d9dddc4c${_scopeId2}>Live customer traffic</td></tr></tbody></table>`);
            } else {
              return [
                createVNode("table", null, [
                  createVNode("thead", null, [
                    createVNode("tr", null, [
                      createVNode("th", null, "Environment"),
                      createVNode("th", null, "Trust Framework"),
                      createVNode("th", null, "Purpose")
                    ])
                  ]),
                  createVNode("tbody", null, [
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("strong", null, "Pre-production")
                      ]),
                      createVNode("td", null, "Sandbox"),
                      createVNode("td", null, "Register an application in the Sandbox Trust Framework and use it to act as a TPP against the pre-production Hub — complete consent journeys and call the APIs to verify your Ozone Connect implementation end-to-end")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("strong", null, "Production")
                      ]),
                      createVNode("td", null, "Production"),
                      createVNode("td", null, "Live customer traffic")
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
              _push3(` Both environments are structurally identical. The only differences are the mTLS certificates (issued from the production Trust Framework rather than Sandbox) and the environment-specific values for the Ozone Connect Base URL and Authorization Endpoint. See <a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/" data-v-d9dddc4c${_scopeId2}>Environment Specific Configuration</a> for the full details. `);
            } else {
              return [
                createTextVNode(" Both environments are structurally identical. The only differences are the mTLS certificates (issued from the production Trust Framework rather than Sandbox) and the environment-specific values for the Ozone Connect Base URL and Authorization Endpoint. See "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/" }, "Environment Specific Configuration"),
                createTextVNode(" for the full details. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdRefTable, null, {
            default: withCtx(() => [
              createVNode("table", null, [
                createVNode("thead", null, [
                  createVNode("tr", null, [
                    createVNode("th", null, "Environment"),
                    createVNode("th", null, "Trust Framework"),
                    createVNode("th", null, "Purpose")
                  ])
                ]),
                createVNode("tbody", null, [
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("strong", null, "Pre-production")
                    ]),
                    createVNode("td", null, "Sandbox"),
                    createVNode("td", null, "Register an application in the Sandbox Trust Framework and use it to act as a TPP against the pre-production Hub — complete consent journeys and call the APIs to verify your Ozone Connect implementation end-to-end")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("strong", null, "Production")
                    ]),
                    createVNode("td", null, "Production"),
                    createVNode("td", null, "Live customer traffic")
                  ])
                ])
              ])
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Both environments are structurally identical. The only differences are the mTLS certificates (issued from the production Trust Framework rather than Sandbox) and the environment-specific values for the Ozone Connect Base URL and Authorization Endpoint. See "),
              createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/" }, "Environment Specific Configuration"),
              createTextVNode(" for the full details. ")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "admin-portal",
    num: "09",
    color: "var(--at-teal-deep)",
    eyebrow: "Admin Portal",
    title: "Operate your Hub instance",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` The Hub provides an <a href="/tech/lfi-api-hub/v2.1/api-hub/admin-portal/" data-v-d9dddc4c${_scopeId2}><strong data-v-d9dddc4c${_scopeId2}>Admin Portal</strong></a> where your team can: `);
            } else {
              return [
                createTextVNode(" The Hub provides an "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/admin-portal/" }, [
                  createVNode("strong", null, "Admin Portal")
                ]),
                createTextVNode(" where your team can: ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-d9dddc4c${_scopeId2}>Activate and manage TPP applications that have requested access to your APIs</li><li data-v-d9dddc4c${_scopeId2}>View real-time and historical API traffic and audit logs</li><li data-v-d9dddc4c${_scopeId2}>Manage your registered API resources and endpoint configuration</li><li data-v-d9dddc4c${_scopeId2}>Monitor consent status across your customer base</li>`);
            } else {
              return [
                createVNode("li", null, "Activate and manage TPP applications that have requested access to your APIs"),
                createVNode("li", null, "View real-time and historical API traffic and audit logs"),
                createVNode("li", null, "Manage your registered API resources and endpoint configuration"),
                createVNode("li", null, "Monitor consent status across your customer base")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" The Hub provides an "),
              createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/admin-portal/" }, [
                createVNode("strong", null, "Admin Portal")
              ]),
              createTextVNode(" where your team can: ")
            ]),
            _: 1
          }),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, "Activate and manage TPP applications that have requested access to your APIs"),
              createVNode("li", null, "View real-time and historical API traffic and audit logs"),
              createVNode("li", null, "Manage your registered API resources and endpoint configuration"),
              createVNode("li", null, "Monitor consent status across your customer base")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div>`);
}
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/v2.1/api-hub/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-d9dddc4c"]]);
export {
  index as default
};
