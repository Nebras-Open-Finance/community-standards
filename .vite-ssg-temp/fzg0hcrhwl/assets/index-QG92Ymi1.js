import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_EdSectionBand = __unplugin_components_3;
  const _component_EdRefTable = __unplugin_components_12;
  const _component_EdProse = __unplugin_components_4;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-1438392d><section class="ed-doc__hero" data-v-1438392d><div class="ed-doc__inner" data-v-1438392d><div class="ed-doc__eyebrow" data-v-1438392d><span class="ed-doc__eyebrow-dash" data-v-1438392d></span> LFI · API Hub · Consent Manager </div><h1 class="ed-doc__title" data-v-1438392d> Consent Manager <span class="ed-doc__read" data-v-1438392d>2 min read</span></h1><p class="ed-doc__lede" data-v-1438392d> The <strong data-v-1438392d>Consent Manager</strong> is an API provided by the API Hub that gives the LFI read and write access to the consent records held centrally by the API Hub. The API Hub is the single source of truth for all consents — the Consent Manager is how your systems interact with that source of truth. </p></div></section>`);
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "base-url",
    num: "01",
    color: "var(--at-teal)",
    eyebrow: "Base URL",
    title: "Per-environment Consent Manager hosts",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdRefTable, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<table data-v-1438392d${_scopeId2}><thead data-v-1438392d${_scopeId2}><tr data-v-1438392d${_scopeId2}><th data-v-1438392d${_scopeId2}>Environment</th><th data-v-1438392d${_scopeId2}>URL</th></tr></thead><tbody data-v-1438392d${_scopeId2}><tr data-v-1438392d${_scopeId2}><td data-v-1438392d${_scopeId2}>Pre-production</td><td data-v-1438392d${_scopeId2}><code data-v-1438392d${_scopeId2}>https://cm.{lfiCode}.preprod.apihub.openfinance.ae</code></td></tr><tr data-v-1438392d${_scopeId2}><td data-v-1438392d${_scopeId2}>Production</td><td data-v-1438392d${_scopeId2}><code data-v-1438392d${_scopeId2}>https://cm.{lfiCode}.apihub.openfinance.ae</code></td></tr></tbody></table>`);
            } else {
              return [
                createVNode("table", null, [
                  createVNode("thead", null, [
                    createVNode("tr", null, [
                      createVNode("th", null, "Environment"),
                      createVNode("th", null, "URL")
                    ])
                  ]),
                  createVNode("tbody", null, [
                    createVNode("tr", null, [
                      createVNode("td", null, "Pre-production"),
                      createVNode("td", null, [
                        createVNode("code", null, "https://cm.{lfiCode}.preprod.apihub.openfinance.ae")
                      ])
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "Production"),
                      createVNode("td", null, [
                        createVNode("code", null, "https://cm.{lfiCode}.apihub.openfinance.ae")
                      ])
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
              _push3(` Where <code data-v-1438392d${_scopeId2}>{lfiCode}</code> is the LFI Code assigned during <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/prerequisites#lfi-code" data-v-1438392d${_scopeId2}>API Hub onboarding</a>. `);
            } else {
              return [
                createTextVNode(" Where "),
                createVNode("code", null, "{lfiCode}"),
                createTextVNode(" is the LFI Code assigned during "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/prerequisites#lfi-code" }, "API Hub onboarding"),
                createTextVNode(". ")
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
                    createVNode("th", null, "URL")
                  ])
                ]),
                createVNode("tbody", null, [
                  createVNode("tr", null, [
                    createVNode("td", null, "Pre-production"),
                    createVNode("td", null, [
                      createVNode("code", null, "https://cm.{lfiCode}.preprod.apihub.openfinance.ae")
                    ])
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, "Production"),
                    createVNode("td", null, [
                      createVNode("code", null, "https://cm.{lfiCode}.apihub.openfinance.ae")
                    ])
                  ])
                ])
              ])
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Where "),
              createVNode("code", null, "{lfiCode}"),
              createTextVNode(" is the LFI Code assigned during "),
              createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/prerequisites#lfi-code" }, "API Hub onboarding"),
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
    id: "authentication",
    num: "02",
    color: "var(--at-gold)",
    eyebrow: "Authentication",
    title: "C3-hh-cm-client over mTLS, optionally JWT-signed",
    tone: "surface"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` All requests to the Consent Manager MUST be made using the <strong data-v-1438392d${_scopeId2}>C3-hh-cm-client</strong> application registered in the Trust Framework. This is the same client used to call the <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/headless-heimdall/" data-v-1438392d${_scopeId2}>Headless Heimdall Auth Server</a>. `);
            } else {
              return [
                createTextVNode(" All requests to the Consent Manager MUST be made using the "),
                createVNode("strong", null, "C3-hh-cm-client"),
                createTextVNode(" application registered in the Trust Framework. This is the same client used to call the "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/headless-heimdall/" }, "Headless Heimdall Auth Server"),
                createTextVNode(". ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Requests MUST be made over <strong data-v-1438392d${_scopeId2}>mutual TLS</strong> using the <strong data-v-1438392d${_scopeId2}>C3</strong> transport client certificate. If your API Hub is configured for <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/configuring-authentication/jwt-client" data-v-1438392d${_scopeId2}>JWT Auth</a>, you MUST also include a signed JWT in the <code data-v-1438392d${_scopeId2}>Authorization</code> header, signed with the <strong data-v-1438392d${_scopeId2}>Sig4</strong> signing key. `);
            } else {
              return [
                createTextVNode(" Requests MUST be made over "),
                createVNode("strong", null, "mutual TLS"),
                createTextVNode(" using the "),
                createVNode("strong", null, "C3"),
                createTextVNode(" transport client certificate. If your API Hub is configured for "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/configuring-authentication/jwt-client" }, "JWT Auth"),
                createTextVNode(", you MUST also include a signed JWT in the "),
                createVNode("code", null, "Authorization"),
                createTextVNode(" header, signed with the "),
                createVNode("strong", null, "Sig4"),
                createTextVNode(" signing key. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` See <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/connectivity/" data-v-1438392d${_scopeId2}>Connectivity &amp; Certificates</a> for the full certificate mapping, and <a href="/tech/lfi-api-hub/trust-framework/creating-c3-application" data-v-1438392d${_scopeId2}>Creating the C3-hh-cm-client Application</a> for setup instructions. `);
            } else {
              return [
                createTextVNode(" See "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/connectivity/" }, "Connectivity & Certificates"),
                createTextVNode(" for the full certificate mapping, and "),
                createVNode("a", { href: "/tech/lfi-api-hub/trust-framework/creating-c3-application" }, "Creating the C3-hh-cm-client Application"),
                createTextVNode(" for setup instructions. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" All requests to the Consent Manager MUST be made using the "),
              createVNode("strong", null, "C3-hh-cm-client"),
              createTextVNode(" application registered in the Trust Framework. This is the same client used to call the "),
              createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/headless-heimdall/" }, "Headless Heimdall Auth Server"),
              createTextVNode(". ")
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Requests MUST be made over "),
              createVNode("strong", null, "mutual TLS"),
              createTextVNode(" using the "),
              createVNode("strong", null, "C3"),
              createTextVNode(" transport client certificate. If your API Hub is configured for "),
              createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/configuring-authentication/jwt-client" }, "JWT Auth"),
              createTextVNode(", you MUST also include a signed JWT in the "),
              createVNode("code", null, "Authorization"),
              createTextVNode(" header, signed with the "),
              createVNode("strong", null, "Sig4"),
              createTextVNode(" signing key. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" See "),
              createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/connectivity/" }, "Connectivity & Certificates"),
              createTextVNode(" for the full certificate mapping, and "),
              createVNode("a", { href: "/tech/lfi-api-hub/trust-framework/creating-c3-application" }, "Creating the C3-hh-cm-client Application"),
              createTextVNode(" for setup instructions. ")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "when-lfi-calls",
    num: "03",
    color: "var(--at-blue-deep, #1d4ed8)",
    eyebrow: "When the LFI calls the Consent Manager",
    title: "Three contexts: auth journey, CMI, payment updates",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`The Consent Manager is used in three contexts:`);
            } else {
              return [
                createTextVNode("The Consent Manager is used in three contexts:")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 data-v-1438392d${_scopeId}>1. Authentication and authorisation journey</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` During the consent authorisation flow, the LFI&#39;s authorisation server calls the Consent Manager to read the consent details and update the consent state after the end user has authenticated and made their authorisation decision. `);
            } else {
              return [
                createTextVNode(" During the consent authorisation flow, the LFI's authorisation server calls the Consent Manager to read the consent details and update the consent state after the end user has authenticated and made their authorisation decision. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` For full details on the end-to-end flow — including how the Consent Manager fits alongside the Headless Heimdall Auth Server — see the <a href="/tech/lfi-api-hub/v2.2-rc1/consent-journey/api-guide" data-v-1438392d${_scopeId2}>Consent Journey API Guide</a>. `);
            } else {
              return [
                createTextVNode(" For full details on the end-to-end flow — including how the Consent Manager fits alongside the Headless Heimdall Auth Server — see the "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/consent-journey/api-guide" }, "Consent Journey API Guide"),
                createTextVNode(". ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 data-v-1438392d${_scopeId}>2. Consent Management Interface</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` The LFI MUST provide a Consent Management Interface (CMI) within its digital banking application. The CMI is powered by Consent Manager API calls — retrieving consents by user, by account, or by ID, and revoking consents on the customer&#39;s behalf. `);
            } else {
              return [
                createTextVNode(" The LFI MUST provide a Consent Management Interface (CMI) within its digital banking application. The CMI is powered by Consent Manager API calls — retrieving consents by user, by account, or by ID, and revoking consents on the customer's behalf. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` For the requirements, user experience specifications, and a detailed API guide for building the CMI, see the <a href="/tech/lfi-api-hub/v2.2-rc1/consent-management-interface/" data-v-1438392d${_scopeId2}>Consent Management Interface</a>. `);
            } else {
              return [
                createTextVNode(" For the requirements, user experience specifications, and a detailed API guide for building the CMI, see the "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/consent-management-interface/" }, "Consent Management Interface"),
                createTextVNode(". ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 data-v-1438392d${_scopeId}>3. Payment status updates</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` For every Open Finance payment executed under a consent, the LFI MUST update the payment status on the API Hub by calling <span class="endpoint" data-v-1438392d${_scopeId2}><span class="http-method http-method--patch" data-v-1438392d${_scopeId2}>PATCH</span><code data-v-1438392d${_scopeId2}>/payment-log/{id}</code></span>. This keeps the API Hub&#39;s payment log accurate and ensures the CMI can display up-to-date payment history to the customer. `);
            } else {
              return [
                createTextVNode(" For every Open Finance payment executed under a consent, the LFI MUST update the payment status on the API Hub by calling "),
                createVNode("span", { class: "endpoint" }, [
                  createVNode("span", { class: "http-method http-method--patch" }, "PATCH"),
                  createVNode("code", null, "/payment-log/{id}")
                ]),
                createTextVNode(". This keeps the API Hub's payment log accurate and ensures the CMI can display up-to-date payment history to the customer. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode("The Consent Manager is used in three contexts:")
            ]),
            _: 1
          }),
          createVNode("h3", null, "1. Authentication and authorisation journey"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" During the consent authorisation flow, the LFI's authorisation server calls the Consent Manager to read the consent details and update the consent state after the end user has authenticated and made their authorisation decision. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" For full details on the end-to-end flow — including how the Consent Manager fits alongside the Headless Heimdall Auth Server — see the "),
              createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/consent-journey/api-guide" }, "Consent Journey API Guide"),
              createTextVNode(". ")
            ]),
            _: 1
          }),
          createVNode("h3", null, "2. Consent Management Interface"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" The LFI MUST provide a Consent Management Interface (CMI) within its digital banking application. The CMI is powered by Consent Manager API calls — retrieving consents by user, by account, or by ID, and revoking consents on the customer's behalf. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" For the requirements, user experience specifications, and a detailed API guide for building the CMI, see the "),
              createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/consent-management-interface/" }, "Consent Management Interface"),
              createTextVNode(". ")
            ]),
            _: 1
          }),
          createVNode("h3", null, "3. Payment status updates"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" For every Open Finance payment executed under a consent, the LFI MUST update the payment status on the API Hub by calling "),
              createVNode("span", { class: "endpoint" }, [
                createVNode("span", { class: "http-method http-method--patch" }, "PATCH"),
                createVNode("code", null, "/payment-log/{id}")
              ]),
              createTextVNode(". This keeps the API Hub's payment log accurate and ensures the CMI can display up-to-date payment history to the customer. ")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "api-reference",
    num: "04",
    color: "var(--at-navy)",
    eyebrow: "API Reference",
    title: "Where to find the endpoints",
    tone: "surface"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` The full API reference for each endpoint is available in the sidebar under <strong data-v-1438392d${_scopeId2}>API Reference</strong>. Use <span class="endpoint" data-v-1438392d${_scopeId2}><span class="http-method http-method--get" data-v-1438392d${_scopeId2}>GET</span><code data-v-1438392d${_scopeId2}>/hello-mtls</code></span> to verify your mTLS connectivity before calling other endpoints. `);
            } else {
              return [
                createTextVNode(" The full API reference for each endpoint is available in the sidebar under "),
                createVNode("strong", null, "API Reference"),
                createTextVNode(". Use "),
                createVNode("span", { class: "endpoint" }, [
                  createVNode("span", { class: "http-method http-method--get" }, "GET"),
                  createVNode("code", null, "/hello-mtls")
                ]),
                createTextVNode(" to verify your mTLS connectivity before calling other endpoints. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" The full API reference for each endpoint is available in the sidebar under "),
              createVNode("strong", null, "API Reference"),
              createTextVNode(". Use "),
              createVNode("span", { class: "endpoint" }, [
                createVNode("span", { class: "http-method http-method--get" }, "GET"),
                createVNode("code", null, "/hello-mtls")
              ]),
              createTextVNode(" to verify your mTLS connectivity before calling other endpoints. ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-1438392d"]]);
export {
  index as default
};
