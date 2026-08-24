import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
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
  const _component_EdBullets = __unplugin_components_5;
  const _component_EdNote = __unplugin_components_7;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-0b1f2c2e><section class="ed-doc__hero" data-v-0b1f2c2e><div class="ed-doc__inner" data-v-0b1f2c2e><div class="ed-doc__eyebrow" data-v-0b1f2c2e><span class="ed-doc__eyebrow-dash" data-v-0b1f2c2e></span> LFI · API Hub · Headless Heimdall </div><h1 class="ed-doc__title" data-v-0b1f2c2e> Headless Heimdall Auth Server <span class="ed-doc__read" data-v-0b1f2c2e>2 min read</span></h1><p class="ed-doc__lede" data-v-0b1f2c2e> The <strong data-v-0b1f2c2e>Headless Heimdall Auth Server</strong> is an API provided by the API Hub that powers the consent authorisation journey. It shields your authorisation server from the complexity of raw OIDC and FAPI 2.0 — your system calls three endpoints at the appropriate points in the customer journey and the API Hub handles the rest. </p></div></section>`);
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "base-url",
    num: "01",
    color: "var(--at-teal)",
    eyebrow: "Base URL",
    title: "Per-environment Headless Heimdall hosts",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdRefTable, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<table data-v-0b1f2c2e${_scopeId2}><thead data-v-0b1f2c2e${_scopeId2}><tr data-v-0b1f2c2e${_scopeId2}><th data-v-0b1f2c2e${_scopeId2}>Environment</th><th data-v-0b1f2c2e${_scopeId2}>URL</th></tr></thead><tbody data-v-0b1f2c2e${_scopeId2}><tr data-v-0b1f2c2e${_scopeId2}><td data-v-0b1f2c2e${_scopeId2}>Pre-production</td><td data-v-0b1f2c2e${_scopeId2}><code data-v-0b1f2c2e${_scopeId2}>https://hh.{lfiCode}.preprod.apihub.openfinance.ae</code></td></tr><tr data-v-0b1f2c2e${_scopeId2}><td data-v-0b1f2c2e${_scopeId2}>Production</td><td data-v-0b1f2c2e${_scopeId2}><code data-v-0b1f2c2e${_scopeId2}>https://hh.{lfiCode}.apihub.openfinance.ae</code></td></tr></tbody></table>`);
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
                        createVNode("code", null, "https://hh.{lfiCode}.preprod.apihub.openfinance.ae")
                      ])
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "Production"),
                      createVNode("td", null, [
                        createVNode("code", null, "https://hh.{lfiCode}.apihub.openfinance.ae")
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
              _push3(` Where <code data-v-0b1f2c2e${_scopeId2}>{lfiCode}</code> is the LFI Code assigned during <a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/prerequisites#lfi-code" data-v-0b1f2c2e${_scopeId2}>API Hub onboarding</a>. `);
            } else {
              return [
                createTextVNode(" Where "),
                createVNode("code", null, "{lfiCode}"),
                createTextVNode(" is the LFI Code assigned during "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/prerequisites#lfi-code" }, "API Hub onboarding"),
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
                      createVNode("code", null, "https://hh.{lfiCode}.preprod.apihub.openfinance.ae")
                    ])
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, "Production"),
                    createVNode("td", null, [
                      createVNode("code", null, "https://hh.{lfiCode}.apihub.openfinance.ae")
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
              createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/prerequisites#lfi-code" }, "API Hub onboarding"),
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
              _push3(` All requests to the Headless Heimdall Auth Server MUST be made using the <strong data-v-0b1f2c2e${_scopeId2}>C3-hh-cm-client</strong> application registered in the Trust Framework. This is the same client used to call the <a href="/tech/lfi-api-hub/v2.1/api-hub/consent-manager/" data-v-0b1f2c2e${_scopeId2}>Consent Manager</a>. `);
            } else {
              return [
                createTextVNode(" All requests to the Headless Heimdall Auth Server MUST be made using the "),
                createVNode("strong", null, "C3-hh-cm-client"),
                createTextVNode(" application registered in the Trust Framework. This is the same client used to call the "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/" }, "Consent Manager"),
                createTextVNode(". ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Requests MUST be made over <strong data-v-0b1f2c2e${_scopeId2}>mutual TLS</strong> using the <strong data-v-0b1f2c2e${_scopeId2}>C3</strong> transport client certificate. If your API Hub is configured for <a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/configuring-authentication/jwt-client" data-v-0b1f2c2e${_scopeId2}>JWT Auth</a>, you MUST also include a signed JWT in the <code data-v-0b1f2c2e${_scopeId2}>Authorization</code> header, signed with the <strong data-v-0b1f2c2e${_scopeId2}>Sig4</strong> signing key. `);
            } else {
              return [
                createTextVNode(" Requests MUST be made over "),
                createVNode("strong", null, "mutual TLS"),
                createTextVNode(" using the "),
                createVNode("strong", null, "C3"),
                createTextVNode(" transport client certificate. If your API Hub is configured for "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/configuring-authentication/jwt-client" }, "JWT Auth"),
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
              _push3(` See <a href="/tech/lfi-api-hub/v2.1/api-hub/connectivity/" data-v-0b1f2c2e${_scopeId2}>Connectivity &amp; Certificates</a> for the full certificate mapping, and <a href="/tech/lfi-api-hub/trust-framework/creating-c3-application" data-v-0b1f2c2e${_scopeId2}>Creating the C3-hh-cm-client Application</a> for setup instructions. `);
            } else {
              return [
                createTextVNode(" See "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/connectivity/" }, "Connectivity & Certificates"),
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
              createTextVNode(" All requests to the Headless Heimdall Auth Server MUST be made using the "),
              createVNode("strong", null, "C3-hh-cm-client"),
              createTextVNode(" application registered in the Trust Framework. This is the same client used to call the "),
              createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/" }, "Consent Manager"),
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
              createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/configuring-authentication/jwt-client" }, "JWT Auth"),
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
              createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/connectivity/" }, "Connectivity & Certificates"),
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
    id: "consent-journey",
    num: "03",
    color: "var(--at-blue-deep, #1d4ed8)",
    eyebrow: "How it fits into the consent journey",
    title: "Three endpoints, one FAPI 2.0 authorisation code flow",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` When a TPP initiates a consent request, the API Hub creates the consent record and redirects the end user to your authorisation endpoint. From that point, your authorisation server interacts with the Headless Heimdall Auth Server to coordinate the FAPI 2.0 authorisation code flow: `);
            } else {
              return [
                createTextVNode(" When a TPP initiates a consent request, the API Hub creates the consent record and redirects the end user to your authorisation endpoint. From that point, your authorisation server interacts with the Headless Heimdall Auth Server to coordinate the FAPI 2.0 authorisation code flow: ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-0b1f2c2e${_scopeId2}><strong data-v-0b1f2c2e${_scopeId2}><span class="endpoint" data-v-0b1f2c2e${_scopeId2}><span class="http-method http-method--get" data-v-0b1f2c2e${_scopeId2}>GET</span><code data-v-0b1f2c2e${_scopeId2}>/auth</code></span></strong> — Your authorisation server calls this at the start of every authorisation code grant. The API Hub validates the FAPI/OIDC request and returns the interaction context and the decoded consent details. Your system uses these details to present the consent to the end user for approval. </li><li data-v-0b1f2c2e${_scopeId2}><strong data-v-0b1f2c2e${_scopeId2}><span class="endpoint" data-v-0b1f2c2e${_scopeId2}><span class="http-method http-method--post" data-v-0b1f2c2e${_scopeId2}>POST</span><code data-v-0b1f2c2e${_scopeId2}>/auth/{interactionId}/doConfirm</code></span></strong> — After the end user has authenticated and authorised the consent, your system calls this to complete the interaction. The API Hub updates the consent state and issues tokens to the TPP. </li><li data-v-0b1f2c2e${_scopeId2}><strong data-v-0b1f2c2e${_scopeId2}><span class="endpoint" data-v-0b1f2c2e${_scopeId2}><span class="http-method http-method--post" data-v-0b1f2c2e${_scopeId2}>POST</span><code data-v-0b1f2c2e${_scopeId2}>/auth/{interactionId}/doFail</code></span></strong> — If authentication fails or the end user rejects the consent, your system calls this to end the interaction. The API Hub initiates an error redirect back to the TPP. </li>`);
            } else {
              return [
                createVNode("li", null, [
                  createVNode("strong", null, [
                    createVNode("span", { class: "endpoint" }, [
                      createVNode("span", { class: "http-method http-method--get" }, "GET"),
                      createVNode("code", null, "/auth")
                    ])
                  ]),
                  createTextVNode(" — Your authorisation server calls this at the start of every authorisation code grant. The API Hub validates the FAPI/OIDC request and returns the interaction context and the decoded consent details. Your system uses these details to present the consent to the end user for approval. ")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, [
                    createVNode("span", { class: "endpoint" }, [
                      createVNode("span", { class: "http-method http-method--post" }, "POST"),
                      createVNode("code", null, "/auth/{interactionId}/doConfirm")
                    ])
                  ]),
                  createTextVNode(" — After the end user has authenticated and authorised the consent, your system calls this to complete the interaction. The API Hub updates the consent state and issues tokens to the TPP. ")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, [
                    createVNode("span", { class: "endpoint" }, [
                      createVNode("span", { class: "http-method http-method--post" }, "POST"),
                      createVNode("code", null, "/auth/{interactionId}/doFail")
                    ])
                  ]),
                  createTextVNode(" — If authentication fails or the end user rejects the consent, your system calls this to end the interaction. The API Hub initiates an error redirect back to the TPP. ")
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdNote, {
          type: "tip",
          title: "Consent Manager interaction"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<p data-v-0b1f2c2e${_scopeId2}> During the authorisation journey, your system will typically also call the <a href="/tech/lfi-api-hub/v2.1/api-hub/consent-manager/" data-v-0b1f2c2e${_scopeId2}>Consent Manager</a> to read the full consent object and update its state. Both APIs work together to complete the journey. </p>`);
            } else {
              return [
                createVNode("p", null, [
                  createTextVNode(" During the authorisation journey, your system will typically also call the "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/" }, "Consent Manager"),
                  createTextVNode(" to read the full consent object and update its state. Both APIs work together to complete the journey. ")
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` For the full API flow, see the <a href="/tech/lfi-api-hub/v2.1/consent-journey/api-guide" data-v-0b1f2c2e${_scopeId2}>Consent Journey API Guide</a>. `);
            } else {
              return [
                createTextVNode(" For the full API flow, see the "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/consent-journey/api-guide" }, "Consent Journey API Guide"),
                createTextVNode(". ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" When a TPP initiates a consent request, the API Hub creates the consent record and redirects the end user to your authorisation endpoint. From that point, your authorisation server interacts with the Headless Heimdall Auth Server to coordinate the FAPI 2.0 authorisation code flow: ")
            ]),
            _: 1
          }),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, [
                createVNode("strong", null, [
                  createVNode("span", { class: "endpoint" }, [
                    createVNode("span", { class: "http-method http-method--get" }, "GET"),
                    createVNode("code", null, "/auth")
                  ])
                ]),
                createTextVNode(" — Your authorisation server calls this at the start of every authorisation code grant. The API Hub validates the FAPI/OIDC request and returns the interaction context and the decoded consent details. Your system uses these details to present the consent to the end user for approval. ")
              ]),
              createVNode("li", null, [
                createVNode("strong", null, [
                  createVNode("span", { class: "endpoint" }, [
                    createVNode("span", { class: "http-method http-method--post" }, "POST"),
                    createVNode("code", null, "/auth/{interactionId}/doConfirm")
                  ])
                ]),
                createTextVNode(" — After the end user has authenticated and authorised the consent, your system calls this to complete the interaction. The API Hub updates the consent state and issues tokens to the TPP. ")
              ]),
              createVNode("li", null, [
                createVNode("strong", null, [
                  createVNode("span", { class: "endpoint" }, [
                    createVNode("span", { class: "http-method http-method--post" }, "POST"),
                    createVNode("code", null, "/auth/{interactionId}/doFail")
                  ])
                ]),
                createTextVNode(" — If authentication fails or the end user rejects the consent, your system calls this to end the interaction. The API Hub initiates an error redirect back to the TPP. ")
              ])
            ]),
            _: 1
          }),
          createVNode(_component_EdNote, {
            type: "tip",
            title: "Consent Manager interaction"
          }, {
            default: withCtx(() => [
              createVNode("p", null, [
                createTextVNode(" During the authorisation journey, your system will typically also call the "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/" }, "Consent Manager"),
                createTextVNode(" to read the full consent object and update its state. Both APIs work together to complete the journey. ")
              ])
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" For the full API flow, see the "),
              createVNode("a", { href: "/tech/lfi-api-hub/v2.1/consent-journey/api-guide" }, "Consent Journey API Guide"),
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
              _push3(` The full API reference for each endpoint is available in the sidebar under <strong data-v-0b1f2c2e${_scopeId2}>API Reference</strong>. Use <span class="endpoint" data-v-0b1f2c2e${_scopeId2}><span class="http-method http-method--get" data-v-0b1f2c2e${_scopeId2}>GET</span><code data-v-0b1f2c2e${_scopeId2}>/hello-mtls</code></span> to verify your mTLS connectivity before calling other endpoints. `);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-0b1f2c2e"]]);
export {
  index as default
};
