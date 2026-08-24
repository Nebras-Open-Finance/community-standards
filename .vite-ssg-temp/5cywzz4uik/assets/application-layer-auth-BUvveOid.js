import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_EdSectionBand = __unplugin_components_3;
  const _component_EdProse = __unplugin_components_4;
  const _component_EdRefTable = __unplugin_components_12;
  const _component_EdNote = __unplugin_components_7;
  const _component_EdBullets = __unplugin_components_5;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-a72c394b><section class="ed-doc__hero" data-v-a72c394b><div class="ed-doc__inner" data-v-a72c394b><div class="ed-doc__eyebrow" data-v-a72c394b><span class="ed-doc__eyebrow-dash" data-v-a72c394b></span> LFI · API Hub · Onboarding · Application Layer Auth </div><h1 class="ed-doc__title" data-v-a72c394b> Application Layer Authentication <span class="ed-doc__read" data-v-a72c394b>4 min read</span></h1><p class="ed-doc__lede" data-v-a72c394b> All communication between the API Hub and an LFI is secured at the transport layer using <strong data-v-a72c394b>mutual TLS (mTLS)</strong>. In addition to mTLS, the API Hub supports several <strong data-v-a72c394b>application layer authentication</strong> methods that provide defense-in-depth. </p><p class="ed-doc__lede ed-doc__lede--tight" data-v-a72c394b> LFIs MUST select an application layer authentication method during onboarding. If you are unsure which method to choose, we recommend <strong data-v-a72c394b>JWT Auth</strong>. </p></div></section>`);
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "how-to-request",
    num: "01",
    color: "var(--at-teal)",
    eyebrow: "How to request configuration",
    title: "Indicate your choice on the Service Desk ticket",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Indicate your chosen application layer authentication method, via the relevant API Hub Onboarding Service Desk ticket. `);
            } else {
              return [
                createTextVNode(" Indicate your chosen application layer authentication method, via the relevant API Hub Onboarding Service Desk ticket. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Indicate your chosen application layer authentication method, via the relevant API Hub Onboarding Service Desk ticket. ")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "communication-directions",
    num: "02",
    color: "var(--at-gold)",
    eyebrow: "Communication directions",
    title: "Two directions, not all methods supported in both",
    tone: "surface"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`Application layer authentication applies to two directions of communication:`);
            } else {
              return [
                createTextVNode("Application layer authentication applies to two directions of communication:")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdRefTable, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<table data-v-a72c394b${_scopeId2}><thead data-v-a72c394b${_scopeId2}><tr data-v-a72c394b${_scopeId2}><th data-v-a72c394b${_scopeId2}>Direction</th><th data-v-a72c394b${_scopeId2}>Description</th></tr></thead><tbody data-v-a72c394b${_scopeId2}><tr data-v-a72c394b${_scopeId2}><td data-v-a72c394b${_scopeId2}><strong data-v-a72c394b${_scopeId2}>API Hub to LFI</strong> (Ozone Connect)</td><td data-v-a72c394b${_scopeId2}>Requests the API Hub sends to your Ozone Connect endpoints when proxying TPP API calls.</td></tr><tr data-v-a72c394b${_scopeId2}><td data-v-a72c394b${_scopeId2}><strong data-v-a72c394b${_scopeId2}>LFI to API Hub</strong> (Consent Manager &amp; Headless Heimdall Auth Server)</td><td data-v-a72c394b${_scopeId2}>Requests your authorisation server sends to the API Hub&#39;s Consent Manager and Headless Heimdall Auth Server during consent and authorisation flows.</td></tr></tbody></table>`);
            } else {
              return [
                createVNode("table", null, [
                  createVNode("thead", null, [
                    createVNode("tr", null, [
                      createVNode("th", null, "Direction"),
                      createVNode("th", null, "Description")
                    ])
                  ]),
                  createVNode("tbody", null, [
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("strong", null, "API Hub to LFI"),
                        createTextVNode(" (Ozone Connect)")
                      ]),
                      createVNode("td", null, "Requests the API Hub sends to your Ozone Connect endpoints when proxying TPP API calls.")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("strong", null, "LFI to API Hub"),
                        createTextVNode(" (Consent Manager & Headless Heimdall Auth Server)")
                      ]),
                      createVNode("td", null, "Requests your authorisation server sends to the API Hub's Consent Manager and Headless Heimdall Auth Server during consent and authorisation flows.")
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
              _push3(` Not all methods are supported in both directions. The table below summarises availability. `);
            } else {
              return [
                createTextVNode(" Not all methods are supported in both directions. The table below summarises availability. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode("Application layer authentication applies to two directions of communication:")
            ]),
            _: 1
          }),
          createVNode(_component_EdRefTable, null, {
            default: withCtx(() => [
              createVNode("table", null, [
                createVNode("thead", null, [
                  createVNode("tr", null, [
                    createVNode("th", null, "Direction"),
                    createVNode("th", null, "Description")
                  ])
                ]),
                createVNode("tbody", null, [
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("strong", null, "API Hub to LFI"),
                      createTextVNode(" (Ozone Connect)")
                    ]),
                    createVNode("td", null, "Requests the API Hub sends to your Ozone Connect endpoints when proxying TPP API calls.")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("strong", null, "LFI to API Hub"),
                      createTextVNode(" (Consent Manager & Headless Heimdall Auth Server)")
                    ]),
                    createVNode("td", null, "Requests your authorisation server sends to the API Hub's Consent Manager and Headless Heimdall Auth Server during consent and authorisation flows.")
                  ])
                ])
              ])
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Not all methods are supported in both directions. The table below summarises availability. ")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "available-methods",
    num: "03",
    color: "var(--at-blue-deep, #1d4ed8)",
    eyebrow: "Available methods",
    title: "Method-by-direction support matrix",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdRefTable, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<table data-v-a72c394b${_scopeId2}><thead data-v-a72c394b${_scopeId2}><tr data-v-a72c394b${_scopeId2}><th data-v-a72c394b${_scopeId2}>Method</th><th style="${ssrRenderStyle({ "text-align": "center" })}" data-v-a72c394b${_scopeId2}>API Hub to LFI (Ozone Connect)</th><th style="${ssrRenderStyle({ "text-align": "center" })}" data-v-a72c394b${_scopeId2}>LFI to API Hub (CM &amp; Headless Heimdall)</th></tr></thead><tbody data-v-a72c394b${_scopeId2}><tr data-v-a72c394b${_scopeId2}><td data-v-a72c394b${_scopeId2}><a href="#mtls-only" data-v-a72c394b${_scopeId2}>mTLS Only (Off)</a></td><td style="${ssrRenderStyle({ "text-align": "center" })}" data-v-a72c394b${_scopeId2}>Yes</td><td style="${ssrRenderStyle({ "text-align": "center" })}" data-v-a72c394b${_scopeId2}>Yes</td></tr><tr data-v-a72c394b${_scopeId2}><td data-v-a72c394b${_scopeId2}><a href="#api-key" data-v-a72c394b${_scopeId2}>API Key</a></td><td style="${ssrRenderStyle({ "text-align": "center" })}" data-v-a72c394b${_scopeId2}>Yes</td><td style="${ssrRenderStyle({ "text-align": "center" })}" data-v-a72c394b${_scopeId2}>No</td></tr><tr data-v-a72c394b${_scopeId2}><td data-v-a72c394b${_scopeId2}><a href="#client-credentials" data-v-a72c394b${_scopeId2}>Client Credentials Grant</a></td><td style="${ssrRenderStyle({ "text-align": "center" })}" data-v-a72c394b${_scopeId2}>Yes</td><td style="${ssrRenderStyle({ "text-align": "center" })}" data-v-a72c394b${_scopeId2}>No</td></tr><tr data-v-a72c394b${_scopeId2}><td data-v-a72c394b${_scopeId2}><a href="#jwt-auth" data-v-a72c394b${_scopeId2}>JWT Auth</a></td><td style="${ssrRenderStyle({ "text-align": "center" })}" data-v-a72c394b${_scopeId2}>Yes</td><td style="${ssrRenderStyle({ "text-align": "center" })}" data-v-a72c394b${_scopeId2}>Yes</td></tr></tbody></table>`);
            } else {
              return [
                createVNode("table", null, [
                  createVNode("thead", null, [
                    createVNode("tr", null, [
                      createVNode("th", null, "Method"),
                      createVNode("th", { style: { "text-align": "center" } }, "API Hub to LFI (Ozone Connect)"),
                      createVNode("th", { style: { "text-align": "center" } }, "LFI to API Hub (CM & Headless Heimdall)")
                    ])
                  ]),
                  createVNode("tbody", null, [
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("a", { href: "#mtls-only" }, "mTLS Only (Off)")
                      ]),
                      createVNode("td", { style: { "text-align": "center" } }, "Yes"),
                      createVNode("td", { style: { "text-align": "center" } }, "Yes")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("a", { href: "#api-key" }, "API Key")
                      ]),
                      createVNode("td", { style: { "text-align": "center" } }, "Yes"),
                      createVNode("td", { style: { "text-align": "center" } }, "No")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("a", { href: "#client-credentials" }, "Client Credentials Grant")
                      ]),
                      createVNode("td", { style: { "text-align": "center" } }, "Yes"),
                      createVNode("td", { style: { "text-align": "center" } }, "No")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("a", { href: "#jwt-auth" }, "JWT Auth")
                      ]),
                      createVNode("td", { style: { "text-align": "center" } }, "Yes"),
                      createVNode("td", { style: { "text-align": "center" } }, "Yes")
                    ])
                  ])
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdNote, {
          type: "tip",
          title: "Recommendation"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<p data-v-a72c394b${_scopeId2}> If you are unsure which method to select, choose <strong data-v-a72c394b${_scopeId2}>JWT Auth</strong>. It offers strong security without requiring additional infrastructure, and is the only method (besides mTLS only) that is supported in both directions. </p>`);
            } else {
              return [
                createVNode("p", null, [
                  createTextVNode(" If you are unsure which method to select, choose "),
                  createVNode("strong", null, "JWT Auth"),
                  createTextVNode(". It offers strong security without requiring additional infrastructure, and is the only method (besides mTLS only) that is supported in both directions. ")
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
                    createVNode("th", null, "Method"),
                    createVNode("th", { style: { "text-align": "center" } }, "API Hub to LFI (Ozone Connect)"),
                    createVNode("th", { style: { "text-align": "center" } }, "LFI to API Hub (CM & Headless Heimdall)")
                  ])
                ]),
                createVNode("tbody", null, [
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("a", { href: "#mtls-only" }, "mTLS Only (Off)")
                    ]),
                    createVNode("td", { style: { "text-align": "center" } }, "Yes"),
                    createVNode("td", { style: { "text-align": "center" } }, "Yes")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("a", { href: "#api-key" }, "API Key")
                    ]),
                    createVNode("td", { style: { "text-align": "center" } }, "Yes"),
                    createVNode("td", { style: { "text-align": "center" } }, "No")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("a", { href: "#client-credentials" }, "Client Credentials Grant")
                    ]),
                    createVNode("td", { style: { "text-align": "center" } }, "Yes"),
                    createVNode("td", { style: { "text-align": "center" } }, "No")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("a", { href: "#jwt-auth" }, "JWT Auth")
                    ]),
                    createVNode("td", { style: { "text-align": "center" } }, "Yes"),
                    createVNode("td", { style: { "text-align": "center" } }, "Yes")
                  ])
                ])
              ])
            ]),
            _: 1
          }),
          createVNode(_component_EdNote, {
            type: "tip",
            title: "Recommendation"
          }, {
            default: withCtx(() => [
              createVNode("p", null, [
                createTextVNode(" If you are unsure which method to select, choose "),
                createVNode("strong", null, "JWT Auth"),
                createTextVNode(". It offers strong security without requiring additional infrastructure, and is the only method (besides mTLS only) that is supported in both directions. ")
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
    id: "mtls-only",
    num: "04",
    color: "var(--at-navy)",
    eyebrow: "mTLS Only (Off)",
    title: "No application-layer auth, mTLS only",
    tone: "surface"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` In this configuration, application layer authentication is switched off. The integration relies solely on the mutual TLS connection for authentication. `);
            } else {
              return [
                createTextVNode(" In this configuration, application layer authentication is switched off. The integration relies solely on the mutual TLS connection for authentication. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` This is the simplest option to implement — no additional application-layer work is required beyond configuring mTLS. `);
            } else {
              return [
                createTextVNode(" This is the simplest option to implement — no additional application-layer work is required beyond configuring mTLS. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` The main drawback is the lack of defense-in-depth: security relies on a single layer. `);
            } else {
              return [
                createTextVNode(" The main drawback is the lack of defense-in-depth: security relies on a single layer. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`This setting can be applied in both directions.`);
            } else {
              return [
                createTextVNode("This setting can be applied in both directions.")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" In this configuration, application layer authentication is switched off. The integration relies solely on the mutual TLS connection for authentication. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" This is the simplest option to implement — no additional application-layer work is required beyond configuring mTLS. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" The main drawback is the lack of defense-in-depth: security relies on a single layer. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode("This setting can be applied in both directions.")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "api-key",
    num: "05",
    color: "var(--at-teal-deep)",
    eyebrow: "API Key",
    title: "Shared secret in request headers",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` An API Key is a shared secret used between the LFI and the API Hub. The API Hub includes the key in requests to your Ozone Connect endpoints. `);
            } else {
              return [
                createTextVNode(" An API Key is a shared secret used between the LFI and the API Hub. The API Hub includes the key in requests to your Ozone Connect endpoints. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` API Keys are the most basic form of application layer authentication. While they provide limited security benefit compared to other methods, they MAY be appropriate as a starting point or for LFIs that use an existing API Gateway that enforces API Key validation. `);
            } else {
              return [
                createTextVNode(" API Keys are the most basic form of application layer authentication. While they provide limited security benefit compared to other methods, they MAY be appropriate as a starting point or for LFIs that use an existing API Gateway that enforces API Key validation. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 data-v-a72c394b${_scopeId}>Constraints</h3>`);
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-a72c394b${_scopeId2}>Supported for <strong data-v-a72c394b${_scopeId2}>Ozone Connect only</strong> (API Hub to LFI direction).</li><li data-v-a72c394b${_scopeId2}>NOT supported for Consent Manager or Headless Heimdall Auth Server APIs.</li><li data-v-a72c394b${_scopeId2}>The API Key MUST have a validity of 12 months or more. Key rotation is supported annually.</li>`);
            } else {
              return [
                createVNode("li", null, [
                  createTextVNode("Supported for "),
                  createVNode("strong", null, "Ozone Connect only"),
                  createTextVNode(" (API Hub to LFI direction).")
                ]),
                createVNode("li", null, "NOT supported for Consent Manager or Headless Heimdall Auth Server APIs."),
                createVNode("li", null, "The API Key MUST have a validity of 12 months or more. Key rotation is supported annually.")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" An API Key is a shared secret used between the LFI and the API Hub. The API Hub includes the key in requests to your Ozone Connect endpoints. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" API Keys are the most basic form of application layer authentication. While they provide limited security benefit compared to other methods, they MAY be appropriate as a starting point or for LFIs that use an existing API Gateway that enforces API Key validation. ")
            ]),
            _: 1
          }),
          createVNode("h3", null, "Constraints"),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, [
                createTextVNode("Supported for "),
                createVNode("strong", null, "Ozone Connect only"),
                createTextVNode(" (API Hub to LFI direction).")
              ]),
              createVNode("li", null, "NOT supported for Consent Manager or Headless Heimdall Auth Server APIs."),
              createVNode("li", null, "The API Key MUST have a validity of 12 months or more. Key rotation is supported annually.")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "client-credentials",
    num: "06",
    color: "var(--at-gold)",
    eyebrow: "Client Credentials Grant",
    title: "OIDC token from an LFI-hosted authorisation server",
    tone: "surface"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` The API Hub obtains an access token via an OIDC Client Credentials Grant from an authorisation server managed by the LFI. The API Hub then includes this token in requests to your Ozone Connect endpoints. `);
            } else {
              return [
                createTextVNode(" The API Hub obtains an access token via an OIDC Client Credentials Grant from an authorisation server managed by the LFI. The API Hub then includes this token in requests to your Ozone Connect endpoints. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` This is a well-established and secure mechanism. Security can be further strengthened by implementing a FAPI profile on the LFI&#39;s authorisation server. `);
            } else {
              return [
                createTextVNode(" This is a well-established and secure mechanism. Security can be further strengthened by implementing a FAPI profile on the LFI's authorisation server. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 data-v-a72c394b${_scopeId}>Constraints</h3>`);
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-a72c394b${_scopeId2}>Supported for <strong data-v-a72c394b${_scopeId2}>Ozone Connect only</strong> (API Hub to LFI direction).</li><li data-v-a72c394b${_scopeId2}>NOT supported for Consent Manager or Headless Heimdall Auth Server APIs.</li><li data-v-a72c394b${_scopeId2}>Requires the LFI to operate its own authorisation server.</li><li data-v-a72c394b${_scopeId2}>MAY result in a small increase in latency, as the API Hub makes an additional call to obtain the access token.</li><li data-v-a72c394b${_scopeId2}>Where a <code data-v-a72c394b${_scopeId2}>client_secret</code> is used, it MUST have a validity of 12 months or more. Secret rotation is supported annually.</li><li data-v-a72c394b${_scopeId2}><code data-v-a72c394b${_scopeId2}>scope</code> values are configured during onboarding based on LFI requirements.</li>`);
            } else {
              return [
                createVNode("li", null, [
                  createTextVNode("Supported for "),
                  createVNode("strong", null, "Ozone Connect only"),
                  createTextVNode(" (API Hub to LFI direction).")
                ]),
                createVNode("li", null, "NOT supported for Consent Manager or Headless Heimdall Auth Server APIs."),
                createVNode("li", null, "Requires the LFI to operate its own authorisation server."),
                createVNode("li", null, "MAY result in a small increase in latency, as the API Hub makes an additional call to obtain the access token."),
                createVNode("li", null, [
                  createTextVNode("Where a "),
                  createVNode("code", null, "client_secret"),
                  createTextVNode(" is used, it MUST have a validity of 12 months or more. Secret rotation is supported annually.")
                ]),
                createVNode("li", null, [
                  createVNode("code", null, "scope"),
                  createTextVNode(" values are configured during onboarding based on LFI requirements.")
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
              createTextVNode(" The API Hub obtains an access token via an OIDC Client Credentials Grant from an authorisation server managed by the LFI. The API Hub then includes this token in requests to your Ozone Connect endpoints. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" This is a well-established and secure mechanism. Security can be further strengthened by implementing a FAPI profile on the LFI's authorisation server. ")
            ]),
            _: 1
          }),
          createVNode("h3", null, "Constraints"),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, [
                createTextVNode("Supported for "),
                createVNode("strong", null, "Ozone Connect only"),
                createTextVNode(" (API Hub to LFI direction).")
              ]),
              createVNode("li", null, "NOT supported for Consent Manager or Headless Heimdall Auth Server APIs."),
              createVNode("li", null, "Requires the LFI to operate its own authorisation server."),
              createVNode("li", null, "MAY result in a small increase in latency, as the API Hub makes an additional call to obtain the access token."),
              createVNode("li", null, [
                createTextVNode("Where a "),
                createVNode("code", null, "client_secret"),
                createTextVNode(" is used, it MUST have a validity of 12 months or more. Secret rotation is supported annually.")
              ]),
              createVNode("li", null, [
                createVNode("code", null, "scope"),
                createTextVNode(" values are configured during onboarding based on LFI requirements.")
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
    id: "jwt-auth",
    num: "07",
    color: "var(--at-blue-deep, #1d4ed8)",
    eyebrow: "JWT Auth",
    title: "Recommended — PS256-signed JWT in headers",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` JWT Auth is a standard for secure and efficient application layer authentication. The requestor creates a signed JWT using a private key and a set of well-defined claims. The receiver verifies the token using the corresponding public key published on a JWKS endpoint hosted by the Trust Framework. `);
            } else {
              return [
                createTextVNode(" JWT Auth is a standard for secure and efficient application layer authentication. The requestor creates a signed JWT using a private key and a set of well-defined claims. The receiver verifies the token using the corresponding public key published on a JWKS endpoint hosted by the Trust Framework. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` JWT Auth is the <strong data-v-a72c394b${_scopeId2}>recommended</strong> method. It offers the following advantages: `);
            } else {
              return [
                createTextVNode(" JWT Auth is the "),
                createVNode("strong", null, "recommended"),
                createTextVNode(" method. It offers the following advantages: ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-a72c394b${_scopeId2}>Uses <strong data-v-a72c394b${_scopeId2}>PS256</strong> — a secure asymmetric algorithm that does not rely on shared secrets.</li><li data-v-a72c394b${_scopeId2}>No additional infrastructure is required — signing keys are generated and managed through the Trust Framework.</li><li data-v-a72c394b${_scopeId2}>Key rotation is managed by the sending party; the receiver uses the JWKS for verification.</li><li data-v-a72c394b${_scopeId2}>JWT claims bind the token to the certificates used in the underlying mTLS layer, providing strong binding between transport and application layers.</li>`);
            } else {
              return [
                createVNode("li", null, [
                  createTextVNode("Uses "),
                  createVNode("strong", null, "PS256"),
                  createTextVNode(" — a secure asymmetric algorithm that does not rely on shared secrets.")
                ]),
                createVNode("li", null, "No additional infrastructure is required — signing keys are generated and managed through the Trust Framework."),
                createVNode("li", null, "Key rotation is managed by the sending party; the receiver uses the JWKS for verification."),
                createVNode("li", null, "JWT claims bind the token to the certificates used in the underlying mTLS layer, providing strong binding between transport and application layers.")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 data-v-a72c394b${_scopeId}>Constraints</h3>`);
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-a72c394b${_scopeId2}>LFIs MUST implement JWT creation (as client) and JWT validation (as server) in their integration.</li>`);
            } else {
              return [
                createVNode("li", null, "LFIs MUST implement JWT creation (as client) and JWT validation (as server) in their integration.")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 data-v-a72c394b${_scopeId}>Supported in both directions</h3>`);
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-a72c394b${_scopeId2}><strong data-v-a72c394b${_scopeId2}>API Hub to LFI</strong> (Ozone Connect) — the API Hub sends a JWT Auth token with each request to your Ozone Connect endpoints. Your server validates the token.</li><li data-v-a72c394b${_scopeId2}><strong data-v-a72c394b${_scopeId2}>LFI to API Hub</strong> (Consent Manager &amp; Headless Heimdall Auth Server) — if you choose to enable this, your authorisation server sends a JWT Auth token with each request to the Consent Manager and Headless Heimdall Auth Server. The API Hub validates the token.</li>`);
            } else {
              return [
                createVNode("li", null, [
                  createVNode("strong", null, "API Hub to LFI"),
                  createTextVNode(" (Ozone Connect) — the API Hub sends a JWT Auth token with each request to your Ozone Connect endpoints. Your server validates the token.")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "LFI to API Hub"),
                  createTextVNode(" (Consent Manager & Headless Heimdall Auth Server) — if you choose to enable this, your authorisation server sends a JWT Auth token with each request to the Consent Manager and Headless Heimdall Auth Server. The API Hub validates the token.")
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdNote, {
          type: "info",
          title: "Optional LFI-to-Hub JWT Auth"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<p data-v-a72c394b${_scopeId2}> When selecting JWT Auth, you MAY also choose to send JWT Auth headers on your requests to the Consent Manager and Headless Heimdall Auth Server. This is configured separately — indicate your preference on the Service Desk ticket. </p>`);
            } else {
              return [
                createVNode("p", null, " When selecting JWT Auth, you MAY also choose to send JWT Auth headers on your requests to the Consent Manager and Headless Heimdall Auth Server. This is configured separately — indicate your preference on the Service Desk ticket. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` For full technical detail on constructing and validating JWT Auth tokens, see <a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/configuring-authentication/jwt-server" data-v-a72c394b${_scopeId2}>JWT Auth — Server-side</a> (your Ozone Connect server validating tokens from the API Hub) and <a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/configuring-authentication/jwt-client" data-v-a72c394b${_scopeId2}>JWT Auth — Client-side</a> (your authorisation server sending tokens to the API Hub). `);
            } else {
              return [
                createTextVNode(" For full technical detail on constructing and validating JWT Auth tokens, see "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/configuring-authentication/jwt-server" }, "JWT Auth — Server-side"),
                createTextVNode(" (your Ozone Connect server validating tokens from the API Hub) and "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/configuring-authentication/jwt-client" }, "JWT Auth — Client-side"),
                createTextVNode(" (your authorisation server sending tokens to the API Hub). ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" JWT Auth is a standard for secure and efficient application layer authentication. The requestor creates a signed JWT using a private key and a set of well-defined claims. The receiver verifies the token using the corresponding public key published on a JWKS endpoint hosted by the Trust Framework. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" JWT Auth is the "),
              createVNode("strong", null, "recommended"),
              createTextVNode(" method. It offers the following advantages: ")
            ]),
            _: 1
          }),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, [
                createTextVNode("Uses "),
                createVNode("strong", null, "PS256"),
                createTextVNode(" — a secure asymmetric algorithm that does not rely on shared secrets.")
              ]),
              createVNode("li", null, "No additional infrastructure is required — signing keys are generated and managed through the Trust Framework."),
              createVNode("li", null, "Key rotation is managed by the sending party; the receiver uses the JWKS for verification."),
              createVNode("li", null, "JWT claims bind the token to the certificates used in the underlying mTLS layer, providing strong binding between transport and application layers.")
            ]),
            _: 1
          }),
          createVNode("h3", null, "Constraints"),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, "LFIs MUST implement JWT creation (as client) and JWT validation (as server) in their integration.")
            ]),
            _: 1
          }),
          createVNode("h3", null, "Supported in both directions"),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, [
                createVNode("strong", null, "API Hub to LFI"),
                createTextVNode(" (Ozone Connect) — the API Hub sends a JWT Auth token with each request to your Ozone Connect endpoints. Your server validates the token.")
              ]),
              createVNode("li", null, [
                createVNode("strong", null, "LFI to API Hub"),
                createTextVNode(" (Consent Manager & Headless Heimdall Auth Server) — if you choose to enable this, your authorisation server sends a JWT Auth token with each request to the Consent Manager and Headless Heimdall Auth Server. The API Hub validates the token.")
              ])
            ]),
            _: 1
          }),
          createVNode(_component_EdNote, {
            type: "info",
            title: "Optional LFI-to-Hub JWT Auth"
          }, {
            default: withCtx(() => [
              createVNode("p", null, " When selecting JWT Auth, you MAY also choose to send JWT Auth headers on your requests to the Consent Manager and Headless Heimdall Auth Server. This is configured separately — indicate your preference on the Service Desk ticket. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" For full technical detail on constructing and validating JWT Auth tokens, see "),
              createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/configuring-authentication/jwt-server" }, "JWT Auth — Server-side"),
              createTextVNode(" (your Ozone Connect server validating tokens from the API Hub) and "),
              createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/configuring-authentication/jwt-client" }, "JWT Auth — Client-side"),
              createTextVNode(" (your authorisation server sending tokens to the API Hub). ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/v2.1/api-hub/onboarding/application-layer-auth.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const applicationLayerAuth = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-a72c394b"]]);
export {
  applicationLayerAuth as default
};
