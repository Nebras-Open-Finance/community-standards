import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { E as EdCode } from "./EdCode-BQ4YLUeg.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
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
  const _component_EdCode = EdCode;
  const _component_EdBullets = __unplugin_components_5;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-b1e3002d><section class="ed-doc__hero" data-v-b1e3002d><div class="ed-doc__inner" data-v-b1e3002d><div class="ed-doc__eyebrow" data-v-b1e3002d><span class="ed-doc__eyebrow-dash" data-v-b1e3002d></span> LFI · API Hub · Onboarding · Environment-Specific </div><h1 class="ed-doc__title" data-v-b1e3002d> Ozone Connect Base URL <span class="ed-doc__read" data-v-b1e3002d>2 min read</span></h1><p class="ed-doc__lede" data-v-b1e3002d> The <strong data-v-b1e3002d>Ozone Connect Base URL</strong> is the root URL of your Ozone Connect API endpoints — the server that the API Hub calls when proxying TPP requests to your institution. </p><p class="ed-doc__lede ed-doc__lede--tight" data-v-b1e3002d> When a TPP makes a valid API request to the API Hub, the API Hub validates the token and consent, enforces the OpenAPI schema, enriches the request, and then forwards it to your Ozone Connect Base URL. </p></div></section>`);
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "what-you-provide",
    num: "01",
    color: "var(--at-teal)",
    eyebrow: "What you provide",
    title: "One base URL per environment",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`You MUST provide a base URL for each environment:`);
            } else {
              return [
                createTextVNode("You MUST provide a base URL for each environment:")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdRefTable, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<table data-v-b1e3002d${_scopeId2}><thead data-v-b1e3002d${_scopeId2}><tr data-v-b1e3002d${_scopeId2}><th data-v-b1e3002d${_scopeId2}>Environment</th><th data-v-b1e3002d${_scopeId2}>Example</th></tr></thead><tbody data-v-b1e3002d${_scopeId2}><tr data-v-b1e3002d${_scopeId2}><td data-v-b1e3002d${_scopeId2}>Pre-production</td><td data-v-b1e3002d${_scopeId2}><code data-v-b1e3002d${_scopeId2}>https://openapi-uat.example.com</code></td></tr><tr data-v-b1e3002d${_scopeId2}><td data-v-b1e3002d${_scopeId2}>Production</td><td data-v-b1e3002d${_scopeId2}><code data-v-b1e3002d${_scopeId2}>https://openapi.example.com</code></td></tr></tbody></table>`);
            } else {
              return [
                createVNode("table", null, [
                  createVNode("thead", null, [
                    createVNode("tr", null, [
                      createVNode("th", null, "Environment"),
                      createVNode("th", null, "Example")
                    ])
                  ]),
                  createVNode("tbody", null, [
                    createVNode("tr", null, [
                      createVNode("td", null, "Pre-production"),
                      createVNode("td", null, [
                        createVNode("code", null, "https://openapi-uat.example.com")
                      ])
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "Production"),
                      createVNode("td", null, [
                        createVNode("code", null, "https://openapi.example.com")
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
              _push3(` The API Hub appends the API path to your base URL. For example, if your base URL is <code data-v-b1e3002d${_scopeId2}>https://openapi.example.com</code>, a TPP request for account data will be forwarded to: `);
            } else {
              return [
                createTextVNode(" The API Hub appends the API path to your base URL. For example, if your base URL is "),
                createVNode("code", null, "https://openapi.example.com"),
                createTextVNode(", a TPP request for account data will be forwarded to: ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdCode, {
          lang: "text",
          code: "https://openapi.example.com/accounts"
        }, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode("You MUST provide a base URL for each environment:")
            ]),
            _: 1
          }),
          createVNode(_component_EdRefTable, null, {
            default: withCtx(() => [
              createVNode("table", null, [
                createVNode("thead", null, [
                  createVNode("tr", null, [
                    createVNode("th", null, "Environment"),
                    createVNode("th", null, "Example")
                  ])
                ]),
                createVNode("tbody", null, [
                  createVNode("tr", null, [
                    createVNode("td", null, "Pre-production"),
                    createVNode("td", null, [
                      createVNode("code", null, "https://openapi-uat.example.com")
                    ])
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, "Production"),
                    createVNode("td", null, [
                      createVNode("code", null, "https://openapi.example.com")
                    ])
                  ])
                ])
              ])
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" The API Hub appends the API path to your base URL. For example, if your base URL is "),
              createVNode("code", null, "https://openapi.example.com"),
              createTextVNode(", a TPP request for account data will be forwarded to: ")
            ]),
            _: 1
          }),
          createVNode(_component_EdCode, {
            lang: "text",
            code: "https://openapi.example.com/accounts"
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "requirements",
    num: "02",
    color: "var(--at-gold)",
    eyebrow: "Requirements",
    title: "HTTPS, reachable, no trailing slash",
    tone: "surface"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`The Ozone Connect Base URL MUST:`);
            } else {
              return [
                createTextVNode("The Ozone Connect Base URL MUST:")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-b1e3002d${_scopeId2}>Use <strong data-v-b1e3002d${_scopeId2}>HTTPS</strong></li><li data-v-b1e3002d${_scopeId2}> Be reachable from the API Hub&#39;s egress IP addresses (provided during onboarding — see <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/environment-specific/#values-provided-by-ozone" data-v-b1e3002d${_scopeId2}>Environment Specific Configuration</a>) </li><li data-v-b1e3002d${_scopeId2}><strong data-v-b1e3002d${_scopeId2}>Not</strong> include a trailing slash</li><li data-v-b1e3002d${_scopeId2}><strong data-v-b1e3002d${_scopeId2}>Not</strong> include path segments beyond the root (e.g. <code data-v-b1e3002d${_scopeId2}>/v2.2</code> is not required — the API Hub manages versioned routing)</li>`);
            } else {
              return [
                createVNode("li", null, [
                  createTextVNode("Use "),
                  createVNode("strong", null, "HTTPS")
                ]),
                createVNode("li", null, [
                  createTextVNode(" Be reachable from the API Hub's egress IP addresses (provided during onboarding — see "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/environment-specific/#values-provided-by-ozone" }, "Environment Specific Configuration"),
                  createTextVNode(") ")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "Not"),
                  createTextVNode(" include a trailing slash")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "Not"),
                  createTextVNode(" include path segments beyond the root (e.g. "),
                  createVNode("code", null, "/v2.2"),
                  createTextVNode(" is not required — the API Hub manages versioned routing)")
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
              createTextVNode("The Ozone Connect Base URL MUST:")
            ]),
            _: 1
          }),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, [
                createTextVNode("Use "),
                createVNode("strong", null, "HTTPS")
              ]),
              createVNode("li", null, [
                createTextVNode(" Be reachable from the API Hub's egress IP addresses (provided during onboarding — see "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/environment-specific/#values-provided-by-ozone" }, "Environment Specific Configuration"),
                createTextVNode(") ")
              ]),
              createVNode("li", null, [
                createVNode("strong", null, "Not"),
                createTextVNode(" include a trailing slash")
              ]),
              createVNode("li", null, [
                createVNode("strong", null, "Not"),
                createTextVNode(" include path segments beyond the root (e.g. "),
                createVNode("code", null, "/v2.2"),
                createTextVNode(" is not required — the API Hub manages versioned routing)")
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
    id: "network-access",
    num: "03",
    color: "var(--at-blue-deep, #1d4ed8)",
    eyebrow: "Network access",
    title: "Allowlist the API Hub's egress IPs",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` You MUST allowlist the API Hub&#39;s outbound IP address(es) at your network or firewall level. These IPs are provided by Ozone as part of the <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/environment-specific/" data-v-b1e3002d${_scopeId2}>environment-specific onboarding</a>. `);
            } else {
              return [
                createTextVNode(" You MUST allowlist the API Hub's outbound IP address(es) at your network or firewall level. These IPs are provided by Ozone as part of the "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/environment-specific/" }, "environment-specific onboarding"),
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
              createTextVNode(" You MUST allowlist the API Hub's outbound IP address(es) at your network or firewall level. These IPs are provided by Ozone as part of the "),
              createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/environment-specific/" }, "environment-specific onboarding"),
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
    id: "separate-urls",
    num: "04",
    color: "var(--at-navy)",
    eyebrow: "Separate URLs per environment",
    title: "UAT and live infrastructure are configured independently",
    tone: "surface"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Your pre-production and production Ozone Connect Base URLs will typically point to different infrastructure (e.g. a UAT environment and a live environment). Each is configured independently via the environment-specific Service Desk ticket. `);
            } else {
              return [
                createTextVNode(" Your pre-production and production Ozone Connect Base URLs will typically point to different infrastructure (e.g. a UAT environment and a live environment). Each is configured independently via the environment-specific Service Desk ticket. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Your pre-production and production Ozone Connect Base URLs will typically point to different infrastructure (e.g. a UAT environment and a live environment). Each is configured independently via the environment-specific Service Desk ticket. ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/environment-specific/ozone-connect-url.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ozoneConnectUrl = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-b1e3002d"]]);
export {
  ozoneConnectUrl as default
};
