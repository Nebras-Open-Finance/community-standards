import { E as EdCode } from "./EdCode-BQ4YLUeg.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
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
  const _component_EdBullets = __unplugin_components_5;
  const _component_EdNote = __unplugin_components_7;
  const _component_EdCode = EdCode;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-5d9d581e><section class="ed-doc__hero" data-v-5d9d581e><div class="ed-doc__inner" data-v-5d9d581e><div class="ed-doc__eyebrow" data-v-5d9d581e><span class="ed-doc__eyebrow-dash" data-v-5d9d581e></span> LFI · API Hub · Onboarding · Environment-Specific </div><h1 class="ed-doc__title" data-v-5d9d581e> Authorization Endpoint <span class="ed-doc__read" data-v-5d9d581e>8 min read</span></h1><p class="ed-doc__lede" data-v-5d9d581e> The <strong data-v-5d9d581e>Authorization Endpoint</strong> is the HTTPS URL to which the end user (customer) is redirected during consent authorisation flows. It is the entry point to the LFI&#39;s authentication and consent authorisation experience. </p><p class="ed-doc__lede ed-doc__lede--tight" data-v-5d9d581e> The TPP constructs the redirect URL and sends the end user there directly — the API Hub does not perform this redirect. The URL MUST therefore be a stable, publicly accessible HTTPS endpoint that works reliably across all devices and browsers. </p></div></section>`);
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "what-you-provide",
    num: "01",
    color: "var(--at-teal)",
    eyebrow: "What you provide",
    title: "One Authorization Endpoint per Hub instance, per environment",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`You MUST provide one Authorization Endpoint URL per API Hub instance, per environment:`);
            } else {
              return [
                createTextVNode("You MUST provide one Authorization Endpoint URL per API Hub instance, per environment:")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdRefTable, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<table data-v-5d9d581e${_scopeId2}><thead data-v-5d9d581e${_scopeId2}><tr data-v-5d9d581e${_scopeId2}><th data-v-5d9d581e${_scopeId2}>Environment</th><th data-v-5d9d581e${_scopeId2}>Example</th></tr></thead><tbody data-v-5d9d581e${_scopeId2}><tr data-v-5d9d581e${_scopeId2}><td data-v-5d9d581e${_scopeId2}>Pre-production</td><td data-v-5d9d581e${_scopeId2}><code data-v-5d9d581e${_scopeId2}>https://openbanking-uat.example.com/authorize</code></td></tr><tr data-v-5d9d581e${_scopeId2}><td data-v-5d9d581e${_scopeId2}>Production</td><td data-v-5d9d581e${_scopeId2}><code data-v-5d9d581e${_scopeId2}>https://openbanking.example.com/authorize</code></td></tr></tbody></table>`);
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
                        createVNode("code", null, "https://openbanking-uat.example.com/authorize")
                      ])
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "Production"),
                      createVNode("td", null, [
                        createVNode("code", null, "https://openbanking.example.com/authorize")
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
              _push3(`There is exactly <strong data-v-5d9d581e${_scopeId2}>one</strong> Authorization Endpoint URL per API Hub instance.`);
            } else {
              return [
                createTextVNode("There is exactly "),
                createVNode("strong", null, "one"),
                createTextVNode(" Authorization Endpoint URL per API Hub instance.")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode("You MUST provide one Authorization Endpoint URL per API Hub instance, per environment:")
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
                      createVNode("code", null, "https://openbanking-uat.example.com/authorize")
                    ])
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, "Production"),
                    createVNode("td", null, [
                      createVNode("code", null, "https://openbanking.example.com/authorize")
                    ])
                  ])
                ])
              ])
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode("There is exactly "),
              createVNode("strong", null, "one"),
              createTextVNode(" Authorization Endpoint URL per API Hub instance.")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "how-it-is-used",
    num: "02",
    color: "var(--at-gold)",
    eyebrow: "How it is used",
    title: "The consent authorisation flow",
    tone: "surface"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`During the consent authorisation flow:`);
            } else {
              return [
                createTextVNode("During the consent authorisation flow:")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-5d9d581e${_scopeId2}>A TPP initiates a consent request via Pushed Authorization Request (PAR) to the API Hub.</li><li data-v-5d9d581e${_scopeId2}>The API Hub creates the consent and returns a <code data-v-5d9d581e${_scopeId2}>request_uri</code> to the TPP.</li><li data-v-5d9d581e${_scopeId2}>The TPP constructs the authorization URL and redirects the end user to <strong data-v-5d9d581e${_scopeId2}>your Authorization Endpoint</strong>.</li><li data-v-5d9d581e${_scopeId2}> Your system calls <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/headless-heimdall/" class="endpoint" data-v-5d9d581e${_scopeId2}><span class="http-method http-method--get" data-v-5d9d581e${_scopeId2}>GET</span><code data-v-5d9d581e${_scopeId2}>/auth</code></a> on the Headless Heimdall Auth Server, passing through the query parameters received from the redirect. </li><li data-v-5d9d581e${_scopeId2}>Headless Heimdall validates the FAPI/OIDC request and returns the interaction context and decoded consent details.</li><li data-v-5d9d581e${_scopeId2}>Your system authenticates the end user and presents the consent for approval.</li><li data-v-5d9d581e${_scopeId2}>Your system calls <code data-v-5d9d581e${_scopeId2}>doConfirm</code> or <code data-v-5d9d581e${_scopeId2}>doFail</code> on the Headless Heimdall Auth Server with the result.</li><li data-v-5d9d581e${_scopeId2}>The end user is redirected back to the TPP.</li>`);
            } else {
              return [
                createVNode("li", null, "A TPP initiates a consent request via Pushed Authorization Request (PAR) to the API Hub."),
                createVNode("li", null, [
                  createTextVNode("The API Hub creates the consent and returns a "),
                  createVNode("code", null, "request_uri"),
                  createTextVNode(" to the TPP.")
                ]),
                createVNode("li", null, [
                  createTextVNode("The TPP constructs the authorization URL and redirects the end user to "),
                  createVNode("strong", null, "your Authorization Endpoint"),
                  createTextVNode(".")
                ]),
                createVNode("li", null, [
                  createTextVNode(" Your system calls "),
                  createVNode("a", {
                    href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/headless-heimdall/",
                    class: "endpoint"
                  }, [
                    createVNode("span", { class: "http-method http-method--get" }, "GET"),
                    createVNode("code", null, "/auth")
                  ]),
                  createTextVNode(" on the Headless Heimdall Auth Server, passing through the query parameters received from the redirect. ")
                ]),
                createVNode("li", null, "Headless Heimdall validates the FAPI/OIDC request and returns the interaction context and decoded consent details."),
                createVNode("li", null, "Your system authenticates the end user and presents the consent for approval."),
                createVNode("li", null, [
                  createTextVNode("Your system calls "),
                  createVNode("code", null, "doConfirm"),
                  createTextVNode(" or "),
                  createVNode("code", null, "doFail"),
                  createTextVNode(" on the Headless Heimdall Auth Server with the result.")
                ]),
                createVNode("li", null, "The end user is redirected back to the TPP.")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdNote, {
          type: "info",
          title: "FAPI 2.0 protocol handling"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<p data-v-5d9d581e${_scopeId2}> The API Hub handles all FAPI 2.0 and OIDC protocol complexity through the Headless Heimdall Auth Server. Your Authorization Endpoint does not need to implement FAPI validation, token binding, or OIDC protocol logic directly — these are handled when you call <span class="endpoint" data-v-5d9d581e${_scopeId2}><span class="http-method http-method--get" data-v-5d9d581e${_scopeId2}>GET</span><code data-v-5d9d581e${_scopeId2}>/auth</code></span>. Your endpoint&#39;s role is to receive the redirect, invoke <span class="endpoint" data-v-5d9d581e${_scopeId2}><span class="http-method http-method--get" data-v-5d9d581e${_scopeId2}>GET</span><code data-v-5d9d581e${_scopeId2}>/auth</code></span>, authenticate the end user, and complete the consent journey. </p><p data-v-5d9d581e${_scopeId2}> For full details on the authorization flow, see the <a href="/tech/lfi-api-hub/v2.2-rc1/consent-journey/api-guide" data-v-5d9d581e${_scopeId2}>Consent Journey API Guide</a>. </p>`);
            } else {
              return [
                createVNode("p", null, [
                  createTextVNode(" The API Hub handles all FAPI 2.0 and OIDC protocol complexity through the Headless Heimdall Auth Server. Your Authorization Endpoint does not need to implement FAPI validation, token binding, or OIDC protocol logic directly — these are handled when you call "),
                  createVNode("span", { class: "endpoint" }, [
                    createVNode("span", { class: "http-method http-method--get" }, "GET"),
                    createVNode("code", null, "/auth")
                  ]),
                  createTextVNode(". Your endpoint's role is to receive the redirect, invoke "),
                  createVNode("span", { class: "endpoint" }, [
                    createVNode("span", { class: "http-method http-method--get" }, "GET"),
                    createVNode("code", null, "/auth")
                  ]),
                  createTextVNode(", authenticate the end user, and complete the consent journey. ")
                ]),
                createVNode("p", null, [
                  createTextVNode(" For full details on the authorization flow, see the "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/consent-journey/api-guide" }, "Consent Journey API Guide"),
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
              createTextVNode("During the consent authorisation flow:")
            ]),
            _: 1
          }),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, "A TPP initiates a consent request via Pushed Authorization Request (PAR) to the API Hub."),
              createVNode("li", null, [
                createTextVNode("The API Hub creates the consent and returns a "),
                createVNode("code", null, "request_uri"),
                createTextVNode(" to the TPP.")
              ]),
              createVNode("li", null, [
                createTextVNode("The TPP constructs the authorization URL and redirects the end user to "),
                createVNode("strong", null, "your Authorization Endpoint"),
                createTextVNode(".")
              ]),
              createVNode("li", null, [
                createTextVNode(" Your system calls "),
                createVNode("a", {
                  href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/headless-heimdall/",
                  class: "endpoint"
                }, [
                  createVNode("span", { class: "http-method http-method--get" }, "GET"),
                  createVNode("code", null, "/auth")
                ]),
                createTextVNode(" on the Headless Heimdall Auth Server, passing through the query parameters received from the redirect. ")
              ]),
              createVNode("li", null, "Headless Heimdall validates the FAPI/OIDC request and returns the interaction context and decoded consent details."),
              createVNode("li", null, "Your system authenticates the end user and presents the consent for approval."),
              createVNode("li", null, [
                createTextVNode("Your system calls "),
                createVNode("code", null, "doConfirm"),
                createTextVNode(" or "),
                createVNode("code", null, "doFail"),
                createTextVNode(" on the Headless Heimdall Auth Server with the result.")
              ]),
              createVNode("li", null, "The end user is redirected back to the TPP.")
            ]),
            _: 1
          }),
          createVNode(_component_EdNote, {
            type: "info",
            title: "FAPI 2.0 protocol handling"
          }, {
            default: withCtx(() => [
              createVNode("p", null, [
                createTextVNode(" The API Hub handles all FAPI 2.0 and OIDC protocol complexity through the Headless Heimdall Auth Server. Your Authorization Endpoint does not need to implement FAPI validation, token binding, or OIDC protocol logic directly — these are handled when you call "),
                createVNode("span", { class: "endpoint" }, [
                  createVNode("span", { class: "http-method http-method--get" }, "GET"),
                  createVNode("code", null, "/auth")
                ]),
                createTextVNode(". Your endpoint's role is to receive the redirect, invoke "),
                createVNode("span", { class: "endpoint" }, [
                  createVNode("span", { class: "http-method http-method--get" }, "GET"),
                  createVNode("code", null, "/auth")
                ]),
                createTextVNode(", authenticate the end user, and complete the consent journey. ")
              ]),
              createVNode("p", null, [
                createTextVNode(" For full details on the authorization flow, see the "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/consent-journey/api-guide" }, "Consent Journey API Guide"),
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
    id: "url-format",
    num: "03",
    color: "var(--at-blue-deep, #1d4ed8)",
    eyebrow: "URL format requirements",
    title: "HTTPS, no query parameters, public, stable",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`The Authorization Endpoint URL MUST:`);
            } else {
              return [
                createTextVNode("The Authorization Endpoint URL MUST:")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-5d9d581e${_scopeId2}>Use <strong data-v-5d9d581e${_scopeId2}>HTTPS</strong> — HTTP is not permitted</li><li data-v-5d9d581e${_scopeId2}>Be a clean base URL with <strong data-v-5d9d581e${_scopeId2}>no query parameters</strong> — the TPP appends OIDC query parameters (<code data-v-5d9d581e${_scopeId2}>client_id</code>, <code data-v-5d9d581e${_scopeId2}>response_type</code>, <code data-v-5d9d581e${_scopeId2}>request_uri</code>) during the redirect</li><li data-v-5d9d581e${_scopeId2}>Be accessible to end user browsers over the <strong data-v-5d9d581e${_scopeId2}>public internet</strong></li><li data-v-5d9d581e${_scopeId2}>Resolve to infrastructure <strong data-v-5d9d581e${_scopeId2}>owned and operated by the LFI</strong></li><li data-v-5d9d581e${_scopeId2}>Be stable — the URL MUST NOT change without coordinated reconfiguration of the API Hub instance</li>`);
            } else {
              return [
                createVNode("li", null, [
                  createTextVNode("Use "),
                  createVNode("strong", null, "HTTPS"),
                  createTextVNode(" — HTTP is not permitted")
                ]),
                createVNode("li", null, [
                  createTextVNode("Be a clean base URL with "),
                  createVNode("strong", null, "no query parameters"),
                  createTextVNode(" — the TPP appends OIDC query parameters ("),
                  createVNode("code", null, "client_id"),
                  createTextVNode(", "),
                  createVNode("code", null, "response_type"),
                  createTextVNode(", "),
                  createVNode("code", null, "request_uri"),
                  createTextVNode(") during the redirect")
                ]),
                createVNode("li", null, [
                  createTextVNode("Be accessible to end user browsers over the "),
                  createVNode("strong", null, "public internet")
                ]),
                createVNode("li", null, [
                  createTextVNode("Resolve to infrastructure "),
                  createVNode("strong", null, "owned and operated by the LFI")
                ]),
                createVNode("li", null, "Be stable — the URL MUST NOT change without coordinated reconfiguration of the API Hub instance")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`The TPP constructs the full redirect URL in the following format:`);
            } else {
              return [
                createTextVNode("The TPP constructs the full redirect URL in the following format:")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdCode, {
          lang: "text",
          code: "https://your-auth-endpoint.example.com/authorize?client_id={clientId}&response_type=code&request_uri={request_uri}"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Where <code data-v-5d9d581e${_scopeId2}>request_uri</code> is the value returned from the API Hub&#39;s <code data-v-5d9d581e${_scopeId2}>/par</code> response. `);
            } else {
              return [
                createTextVNode(" Where "),
                createVNode("code", null, "request_uri"),
                createTextVNode(" is the value returned from the API Hub's "),
                createVNode("code", null, "/par"),
                createTextVNode(" response. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode("The Authorization Endpoint URL MUST:")
            ]),
            _: 1
          }),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, [
                createTextVNode("Use "),
                createVNode("strong", null, "HTTPS"),
                createTextVNode(" — HTTP is not permitted")
              ]),
              createVNode("li", null, [
                createTextVNode("Be a clean base URL with "),
                createVNode("strong", null, "no query parameters"),
                createTextVNode(" — the TPP appends OIDC query parameters ("),
                createVNode("code", null, "client_id"),
                createTextVNode(", "),
                createVNode("code", null, "response_type"),
                createTextVNode(", "),
                createVNode("code", null, "request_uri"),
                createTextVNode(") during the redirect")
              ]),
              createVNode("li", null, [
                createTextVNode("Be accessible to end user browsers over the "),
                createVNode("strong", null, "public internet")
              ]),
              createVNode("li", null, [
                createTextVNode("Resolve to infrastructure "),
                createVNode("strong", null, "owned and operated by the LFI")
              ]),
              createVNode("li", null, "Be stable — the URL MUST NOT change without coordinated reconfiguration of the API Hub instance")
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode("The TPP constructs the full redirect URL in the following format:")
            ]),
            _: 1
          }),
          createVNode(_component_EdCode, {
            lang: "text",
            code: "https://your-auth-endpoint.example.com/authorize?client_id={clientId}&response_type=code&request_uri={request_uri}"
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Where "),
              createVNode("code", null, "request_uri"),
              createTextVNode(" is the value returned from the API Hub's "),
              createVNode("code", null, "/par"),
              createTextVNode(" response. ")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "deep-linking",
    num: "04",
    color: "var(--at-navy)",
    eyebrow: "App invocation via deep linking",
    title: "Universal Links and App Links — no custom schemes",
    tone: "surface"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` The Authorization Endpoint URL MUST be configured as a <strong data-v-5d9d581e${_scopeId2}>deep link</strong> that opens the LFI&#39;s native mobile app when it is installed on the end user&#39;s device. This is the primary authentication channel — most end users will authenticate via the LFI&#39;s mobile banking app. `);
            } else {
              return [
                createTextVNode(" The Authorization Endpoint URL MUST be configured as a "),
                createVNode("strong", null, "deep link"),
                createTextVNode(" that opens the LFI's native mobile app when it is installed on the end user's device. This is the primary authentication channel — most end users will authenticate via the LFI's mobile banking app. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 data-v-5d9d581e${_scopeId}>Required approach: Universal Links and App Links</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` LFIs MUST use platform-verified deep linking mechanisms to associate the Authorization Endpoint URL with their native app: `);
            } else {
              return [
                createTextVNode(" LFIs MUST use platform-verified deep linking mechanisms to associate the Authorization Endpoint URL with their native app: ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdRefTable, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<table data-v-5d9d581e${_scopeId2}><thead data-v-5d9d581e${_scopeId2}><tr data-v-5d9d581e${_scopeId2}><th data-v-5d9d581e${_scopeId2}>Platform</th><th data-v-5d9d581e${_scopeId2}>Mechanism</th><th data-v-5d9d581e${_scopeId2}>Verification file</th></tr></thead><tbody data-v-5d9d581e${_scopeId2}><tr data-v-5d9d581e${_scopeId2}><td data-v-5d9d581e${_scopeId2}><strong data-v-5d9d581e${_scopeId2}>iOS</strong></td><td data-v-5d9d581e${_scopeId2}>Universal Links</td><td data-v-5d9d581e${_scopeId2}><code data-v-5d9d581e${_scopeId2}>/.well-known/apple-app-site-association</code></td></tr><tr data-v-5d9d581e${_scopeId2}><td data-v-5d9d581e${_scopeId2}><strong data-v-5d9d581e${_scopeId2}>Android</strong></td><td data-v-5d9d581e${_scopeId2}>Android App Links</td><td data-v-5d9d581e${_scopeId2}><code data-v-5d9d581e${_scopeId2}>/.well-known/assetlinks.json</code></td></tr></tbody></table>`);
            } else {
              return [
                createVNode("table", null, [
                  createVNode("thead", null, [
                    createVNode("tr", null, [
                      createVNode("th", null, "Platform"),
                      createVNode("th", null, "Mechanism"),
                      createVNode("th", null, "Verification file")
                    ])
                  ]),
                  createVNode("tbody", null, [
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("strong", null, "iOS")
                      ]),
                      createVNode("td", null, "Universal Links"),
                      createVNode("td", null, [
                        createVNode("code", null, "/.well-known/apple-app-site-association")
                      ])
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("strong", null, "Android")
                      ]),
                      createVNode("td", null, "Android App Links"),
                      createVNode("td", null, [
                        createVNode("code", null, "/.well-known/assetlinks.json")
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
              _push3(` These mechanisms allow the operating system to verify that the LFI owns both the domain and the app, and to open the app directly when the end user navigates to the URL — without showing an intermediate browser page or disambiguation dialog. `);
            } else {
              return [
                createTextVNode(" These mechanisms allow the operating system to verify that the LFI owns both the domain and the app, and to open the app directly when the end user navigates to the URL — without showing an intermediate browser page or disambiguation dialog. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdNote, {
          type: "danger",
          title: "Custom URL schemes are prohibited"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<p data-v-5d9d581e${_scopeId2}> Custom URL schemes (e.g. <code data-v-5d9d581e${_scopeId2}>mybank://authorize</code>) MUST NOT be used. Custom schemes are not verified by the operating system, meaning any app can register to handle the scheme. This creates a redirect interception risk where a malicious app could capture the authorization request. Only HTTPS-based verified deep links (Universal Links and App Links) are permitted. </p>`);
            } else {
              return [
                createVNode("p", null, [
                  createTextVNode(" Custom URL schemes (e.g. "),
                  createVNode("code", null, "mybank://authorize"),
                  createTextVNode(") MUST NOT be used. Custom schemes are not verified by the operating system, meaning any app can register to handle the scheme. This creates a redirect interception risk where a malicious app could capture the authorization request. Only HTTPS-based verified deep links (Universal Links and App Links) are permitted. ")
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 data-v-5d9d581e${_scopeId}>How verified deep linking works</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`Both Universal Links (iOS) and App Links (Android) follow the same principle:`);
            } else {
              return [
                createTextVNode("Both Universal Links (iOS) and App Links (Android) follow the same principle:")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-5d9d581e${_scopeId2}><strong data-v-5d9d581e${_scopeId2}>The LFI hosts a verification file</strong> on the Authorization Endpoint domain, proving ownership of both the domain and the app.</li><li data-v-5d9d581e${_scopeId2}><strong data-v-5d9d581e${_scopeId2}>The LFI&#39;s mobile app declares</strong> that it handles URLs for the Authorization Endpoint domain.</li><li data-v-5d9d581e${_scopeId2}><strong data-v-5d9d581e${_scopeId2}>The operating system verifies</strong> the association at app install time by fetching the verification file from the domain.</li><li data-v-5d9d581e${_scopeId2}><strong data-v-5d9d581e${_scopeId2}>When the end user navigates to the URL</strong>, the OS opens the LFI app directly — no browser page is loaded, no disambiguation dialog is shown.</li>`);
            } else {
              return [
                createVNode("li", null, [
                  createVNode("strong", null, "The LFI hosts a verification file"),
                  createTextVNode(" on the Authorization Endpoint domain, proving ownership of both the domain and the app.")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "The LFI's mobile app declares"),
                  createTextVNode(" that it handles URLs for the Authorization Endpoint domain.")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "The operating system verifies"),
                  createTextVNode(" the association at app install time by fetching the verification file from the domain.")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "When the end user navigates to the URL"),
                  createTextVNode(", the OS opens the LFI app directly — no browser page is loaded, no disambiguation dialog is shown.")
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h4 data-v-5d9d581e${_scopeId}>iOS — Apple App Site Association</h4>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` The LFI MUST host an <code data-v-5d9d581e${_scopeId2}>apple-app-site-association</code> file at the root of the Authorization Endpoint domain: `);
            } else {
              return [
                createTextVNode(" The LFI MUST host an "),
                createVNode("code", null, "apple-app-site-association"),
                createTextVNode(" file at the root of the Authorization Endpoint domain: ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdCode, {
          lang: "text",
          code: "https://openbanking.example.com/.well-known/apple-app-site-association"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` This JSON file declares which paths on the domain should open the app. It MUST be served over HTTPS without redirects, and MUST NOT require authentication. `);
            } else {
              return [
                createTextVNode(" This JSON file declares which paths on the domain should open the app. It MUST be served over HTTPS without redirects, and MUST NOT require authentication. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h4 data-v-5d9d581e${_scopeId}>Android — Digital Asset Links</h4>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` The LFI MUST host an <code data-v-5d9d581e${_scopeId2}>assetlinks.json</code> file at the root of the Authorization Endpoint domain: `);
            } else {
              return [
                createTextVNode(" The LFI MUST host an "),
                createVNode("code", null, "assetlinks.json"),
                createTextVNode(" file at the root of the Authorization Endpoint domain: ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdCode, {
          lang: "text",
          code: "https://openbanking.example.com/.well-known/assetlinks.json"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` This JSON file establishes a cryptographic link between the domain and the app using the app&#39;s signing certificate fingerprint. The app&#39;s <code data-v-5d9d581e${_scopeId2}>AndroidManifest.xml</code> MUST declare an intent filter with <code data-v-5d9d581e${_scopeId2}>android:autoVerify=&quot;true&quot;</code> for the Authorization Endpoint domain. `);
            } else {
              return [
                createTextVNode(" This JSON file establishes a cryptographic link between the domain and the app using the app's signing certificate fingerprint. The app's "),
                createVNode("code", null, "AndroidManifest.xml"),
                createTextVNode(" MUST declare an intent filter with "),
                createVNode("code", null, 'android:autoVerify="true"'),
                createTextVNode(" for the Authorization Endpoint domain. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdNote, {
          type: "tip",
          title: "Verification happens at install time"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<p data-v-5d9d581e${_scopeId2}> The operating system fetches and verifies the association file when the app is installed or updated. If verification fails (e.g. the file is missing, malformed, or the certificate fingerprint doesn&#39;t match), the OS will fall back to opening the URL in the browser — which defeats the purpose of deep linking. LFIs MUST ensure the verification files are correctly configured and accessible <strong data-v-5d9d581e${_scopeId2}>before</strong> publishing the app. </p>`);
            } else {
              return [
                createVNode("p", null, [
                  createTextVNode(" The operating system fetches and verifies the association file when the app is installed or updated. If verification fails (e.g. the file is missing, malformed, or the certificate fingerprint doesn't match), the OS will fall back to opening the URL in the browser — which defeats the purpose of deep linking. LFIs MUST ensure the verification files are correctly configured and accessible "),
                  createVNode("strong", null, "before"),
                  createTextVNode(" publishing the app. ")
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 data-v-5d9d581e${_scopeId}>Fallback when the app is not installed</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` If the LFI app is not installed on the end user&#39;s device, the URL opens in the device&#39;s browser. In this case, the Authorization Endpoint MUST serve a <strong data-v-5d9d581e${_scopeId2}>mobile-optimised web page</strong> that allows the end user to complete authentication. See the <a href="/tech/lfi-api-hub/v2.2-rc1/consent-journey/authentication/implementation#fallback-scenarios-when-the-app-is-not-available" data-v-5d9d581e${_scopeId2}>Authentication Implementation Guide</a> for the detailed fallback flows, including browser-based authentication, app handoff via push notification, and QR code handoff from desktop. `);
            } else {
              return [
                createTextVNode(" If the LFI app is not installed on the end user's device, the URL opens in the device's browser. In this case, the Authorization Endpoint MUST serve a "),
                createVNode("strong", null, "mobile-optimised web page"),
                createTextVNode(" that allows the end user to complete authentication. See the "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/consent-journey/authentication/implementation#fallback-scenarios-when-the-app-is-not-available" }, "Authentication Implementation Guide"),
                createTextVNode(" for the detailed fallback flows, including browser-based authentication, app handoff via push notification, and QR code handoff from desktop. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` The same URL MUST work in both cases — app invocation and browser fallback — without requiring the TPP or end user to do anything differently. `);
            } else {
              return [
                createTextVNode(" The same URL MUST work in both cases — app invocation and browser fallback — without requiring the TPP or end user to do anything differently. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" The Authorization Endpoint URL MUST be configured as a "),
              createVNode("strong", null, "deep link"),
              createTextVNode(" that opens the LFI's native mobile app when it is installed on the end user's device. This is the primary authentication channel — most end users will authenticate via the LFI's mobile banking app. ")
            ]),
            _: 1
          }),
          createVNode("h3", null, "Required approach: Universal Links and App Links"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" LFIs MUST use platform-verified deep linking mechanisms to associate the Authorization Endpoint URL with their native app: ")
            ]),
            _: 1
          }),
          createVNode(_component_EdRefTable, null, {
            default: withCtx(() => [
              createVNode("table", null, [
                createVNode("thead", null, [
                  createVNode("tr", null, [
                    createVNode("th", null, "Platform"),
                    createVNode("th", null, "Mechanism"),
                    createVNode("th", null, "Verification file")
                  ])
                ]),
                createVNode("tbody", null, [
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("strong", null, "iOS")
                    ]),
                    createVNode("td", null, "Universal Links"),
                    createVNode("td", null, [
                      createVNode("code", null, "/.well-known/apple-app-site-association")
                    ])
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("strong", null, "Android")
                    ]),
                    createVNode("td", null, "Android App Links"),
                    createVNode("td", null, [
                      createVNode("code", null, "/.well-known/assetlinks.json")
                    ])
                  ])
                ])
              ])
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" These mechanisms allow the operating system to verify that the LFI owns both the domain and the app, and to open the app directly when the end user navigates to the URL — without showing an intermediate browser page or disambiguation dialog. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdNote, {
            type: "danger",
            title: "Custom URL schemes are prohibited"
          }, {
            default: withCtx(() => [
              createVNode("p", null, [
                createTextVNode(" Custom URL schemes (e.g. "),
                createVNode("code", null, "mybank://authorize"),
                createTextVNode(") MUST NOT be used. Custom schemes are not verified by the operating system, meaning any app can register to handle the scheme. This creates a redirect interception risk where a malicious app could capture the authorization request. Only HTTPS-based verified deep links (Universal Links and App Links) are permitted. ")
              ])
            ]),
            _: 1
          }),
          createVNode("h3", null, "How verified deep linking works"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode("Both Universal Links (iOS) and App Links (Android) follow the same principle:")
            ]),
            _: 1
          }),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, [
                createVNode("strong", null, "The LFI hosts a verification file"),
                createTextVNode(" on the Authorization Endpoint domain, proving ownership of both the domain and the app.")
              ]),
              createVNode("li", null, [
                createVNode("strong", null, "The LFI's mobile app declares"),
                createTextVNode(" that it handles URLs for the Authorization Endpoint domain.")
              ]),
              createVNode("li", null, [
                createVNode("strong", null, "The operating system verifies"),
                createTextVNode(" the association at app install time by fetching the verification file from the domain.")
              ]),
              createVNode("li", null, [
                createVNode("strong", null, "When the end user navigates to the URL"),
                createTextVNode(", the OS opens the LFI app directly — no browser page is loaded, no disambiguation dialog is shown.")
              ])
            ]),
            _: 1
          }),
          createVNode("h4", null, "iOS — Apple App Site Association"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" The LFI MUST host an "),
              createVNode("code", null, "apple-app-site-association"),
              createTextVNode(" file at the root of the Authorization Endpoint domain: ")
            ]),
            _: 1
          }),
          createVNode(_component_EdCode, {
            lang: "text",
            code: "https://openbanking.example.com/.well-known/apple-app-site-association"
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" This JSON file declares which paths on the domain should open the app. It MUST be served over HTTPS without redirects, and MUST NOT require authentication. ")
            ]),
            _: 1
          }),
          createVNode("h4", null, "Android — Digital Asset Links"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" The LFI MUST host an "),
              createVNode("code", null, "assetlinks.json"),
              createTextVNode(" file at the root of the Authorization Endpoint domain: ")
            ]),
            _: 1
          }),
          createVNode(_component_EdCode, {
            lang: "text",
            code: "https://openbanking.example.com/.well-known/assetlinks.json"
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" This JSON file establishes a cryptographic link between the domain and the app using the app's signing certificate fingerprint. The app's "),
              createVNode("code", null, "AndroidManifest.xml"),
              createTextVNode(" MUST declare an intent filter with "),
              createVNode("code", null, 'android:autoVerify="true"'),
              createTextVNode(" for the Authorization Endpoint domain. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdNote, {
            type: "tip",
            title: "Verification happens at install time"
          }, {
            default: withCtx(() => [
              createVNode("p", null, [
                createTextVNode(" The operating system fetches and verifies the association file when the app is installed or updated. If verification fails (e.g. the file is missing, malformed, or the certificate fingerprint doesn't match), the OS will fall back to opening the URL in the browser — which defeats the purpose of deep linking. LFIs MUST ensure the verification files are correctly configured and accessible "),
                createVNode("strong", null, "before"),
                createTextVNode(" publishing the app. ")
              ])
            ]),
            _: 1
          }),
          createVNode("h3", null, "Fallback when the app is not installed"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" If the LFI app is not installed on the end user's device, the URL opens in the device's browser. In this case, the Authorization Endpoint MUST serve a "),
              createVNode("strong", null, "mobile-optimised web page"),
              createTextVNode(" that allows the end user to complete authentication. See the "),
              createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/consent-journey/authentication/implementation#fallback-scenarios-when-the-app-is-not-available" }, "Authentication Implementation Guide"),
              createTextVNode(" for the detailed fallback flows, including browser-based authentication, app handoff via push notification, and QR code handoff from desktop. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" The same URL MUST work in both cases — app invocation and browser fallback — without requiring the TPP or end user to do anything differently. ")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "desktop-browser",
    num: "05",
    color: "var(--at-teal-deep)",
    eyebrow: "Desktop browser behaviour",
    title: "QR handoff, push handoff, or browser-based auth",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` When the end user is on a desktop device, the Authorization Endpoint URL opens in the desktop browser. There is no native app to deep link to. In this case, the endpoint MUST render a web page that enables the end user to complete the consent journey. Common approaches include: `);
            } else {
              return [
                createTextVNode(" When the end user is on a desktop device, the Authorization Endpoint URL opens in the desktop browser. There is no native app to deep link to. In this case, the endpoint MUST render a web page that enables the end user to complete the consent journey. Common approaches include: ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-5d9d581e${_scopeId2}><strong data-v-5d9d581e${_scopeId2}>QR code handoff</strong> — the page displays a QR code that the end user scans with their mobile device, opening the LFI app to complete authentication</li><li data-v-5d9d581e${_scopeId2}><strong data-v-5d9d581e${_scopeId2}>Push notification handoff</strong> — the page collects identifying information and triggers a push notification to the end user&#39;s bound device</li><li data-v-5d9d581e${_scopeId2}><strong data-v-5d9d581e${_scopeId2}>Browser-based authentication</strong> — if the LFI supports web-based authentication in its existing digital channels, the end user MUST be able to complete the entire journey in the desktop browser</li>`);
            } else {
              return [
                createVNode("li", null, [
                  createVNode("strong", null, "QR code handoff"),
                  createTextVNode(" — the page displays a QR code that the end user scans with their mobile device, opening the LFI app to complete authentication")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "Push notification handoff"),
                  createTextVNode(" — the page collects identifying information and triggers a push notification to the end user's bound device")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "Browser-based authentication"),
                  createTextVNode(" — if the LFI supports web-based authentication in its existing digital channels, the end user MUST be able to complete the entire journey in the desktop browser")
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` The desktop page MUST poll for completion and redirect the end user back to the TPP once the consent journey concludes. `);
            } else {
              return [
                createTextVNode(" The desktop page MUST poll for completion and redirect the end user back to the TPP once the consent journey concludes. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` For implementation details, see the <a href="/tech/lfi-api-hub/v2.2-rc1/consent-journey/authentication/implementation#desktop-browser--qr-code-or-push-notification" data-v-5d9d581e${_scopeId2}>Authentication Implementation Guide</a>. `);
            } else {
              return [
                createTextVNode(" For implementation details, see the "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/consent-journey/authentication/implementation#desktop-browser--qr-code-or-push-notification" }, "Authentication Implementation Guide"),
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
              createTextVNode(" When the end user is on a desktop device, the Authorization Endpoint URL opens in the desktop browser. There is no native app to deep link to. In this case, the endpoint MUST render a web page that enables the end user to complete the consent journey. Common approaches include: ")
            ]),
            _: 1
          }),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, [
                createVNode("strong", null, "QR code handoff"),
                createTextVNode(" — the page displays a QR code that the end user scans with their mobile device, opening the LFI app to complete authentication")
              ]),
              createVNode("li", null, [
                createVNode("strong", null, "Push notification handoff"),
                createTextVNode(" — the page collects identifying information and triggers a push notification to the end user's bound device")
              ]),
              createVNode("li", null, [
                createVNode("strong", null, "Browser-based authentication"),
                createTextVNode(" — if the LFI supports web-based authentication in its existing digital channels, the end user MUST be able to complete the entire journey in the desktop browser")
              ])
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" The desktop page MUST poll for completion and redirect the end user back to the TPP once the consent journey concludes. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" For implementation details, see the "),
              createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/consent-journey/authentication/implementation#desktop-browser--qr-code-or-push-notification" }, "Authentication Implementation Guide"),
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
    id: "cross-device",
    num: "06",
    color: "var(--at-gold)",
    eyebrow: "Cross-device and cross-browser compatibility",
    title: "Works regardless of device, OS, browser, or TPP redirect method",
    tone: "surface"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` The Authorization Endpoint is invoked by a TPP that the LFI does not control. The LFI cannot predict which device, operating system, browser, or redirect method the TPP will use. The endpoint MUST therefore work reliably across all common combinations. `);
            } else {
              return [
                createTextVNode(" The Authorization Endpoint is invoked by a TPP that the LFI does not control. The LFI cannot predict which device, operating system, browser, or redirect method the TPP will use. The endpoint MUST therefore work reliably across all common combinations. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 data-v-5d9d581e${_scopeId}>What the LFI MUST support</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`The Authorization Endpoint MUST function correctly:`);
            } else {
              return [
                createTextVNode("The Authorization Endpoint MUST function correctly:")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-5d9d581e${_scopeId2}><strong data-v-5d9d581e${_scopeId2}>Across mobile platforms</strong> — iOS and Android, including current and recent OS versions</li><li data-v-5d9d581e${_scopeId2}><strong data-v-5d9d581e${_scopeId2}>Across mobile browsers</strong> — Safari, Chrome, Samsung Internet, Firefox, and any other browser with meaningful market share in the UAE. The deep link MUST open the app regardless of which browser the TPP is using. If the app is not installed, the browser fallback MUST render correctly in all of these browsers.</li><li data-v-5d9d581e${_scopeId2}><strong data-v-5d9d581e${_scopeId2}>Across desktop browsers</strong> — Chrome, Safari, Edge, and Firefox on Windows, macOS, and common Linux distributions</li><li data-v-5d9d581e${_scopeId2}><strong data-v-5d9d581e${_scopeId2}>Regardless of how the TPP opens the redirect</strong> — the endpoint MUST work whether the TPP opens the URL in the current browser tab, a new browser tab, or a system browser view (e.g. <code data-v-5d9d581e${_scopeId2}>SFSafariViewController</code> on iOS, Chrome Custom Tabs on Android). The behaviour MUST be seamless in all cases.</li><li data-v-5d9d581e${_scopeId2}><strong data-v-5d9d581e${_scopeId2}>On both mobile and desktop</strong> — the same URL serves the appropriate experience based on the device context</li>`);
            } else {
              return [
                createVNode("li", null, [
                  createVNode("strong", null, "Across mobile platforms"),
                  createTextVNode(" — iOS and Android, including current and recent OS versions")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "Across mobile browsers"),
                  createTextVNode(" — Safari, Chrome, Samsung Internet, Firefox, and any other browser with meaningful market share in the UAE. The deep link MUST open the app regardless of which browser the TPP is using. If the app is not installed, the browser fallback MUST render correctly in all of these browsers.")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "Across desktop browsers"),
                  createTextVNode(" — Chrome, Safari, Edge, and Firefox on Windows, macOS, and common Linux distributions")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "Regardless of how the TPP opens the redirect"),
                  createTextVNode(" — the endpoint MUST work whether the TPP opens the URL in the current browser tab, a new browser tab, or a system browser view (e.g. "),
                  createVNode("code", null, "SFSafariViewController"),
                  createTextVNode(" on iOS, Chrome Custom Tabs on Android). The behaviour MUST be seamless in all cases.")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "On both mobile and desktop"),
                  createTextVNode(" — the same URL serves the appropriate experience based on the device context")
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 data-v-5d9d581e${_scopeId}>What the LFI MUST test</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` LFIs are responsible for comprehensive testing of the Authorization Endpoint across the full range of devices, operating systems, and browsers their end users may use. This includes verifying that: `);
            } else {
              return [
                createTextVNode(" LFIs are responsible for comprehensive testing of the Authorization Endpoint across the full range of devices, operating systems, and browsers their end users may use. This includes verifying that: ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-5d9d581e${_scopeId2}>Deep linking correctly opens the native app on both iOS and Android when the app is installed, across all major browsers</li><li data-v-5d9d581e${_scopeId2}>The browser fallback renders and functions correctly on both iOS and Android when the app is not installed, across all major browsers</li><li data-v-5d9d581e${_scopeId2}>The desktop experience works across all major desktop browsers</li><li data-v-5d9d581e${_scopeId2}>The flow completes successfully regardless of whether the TPP opens the redirect in the current tab, a new tab, or a system browser view</li><li data-v-5d9d581e${_scopeId2}>Navigation behaviour is sensible — for example, pressing the device back button during the flow does not leave the end user stranded on a blank page</li><li data-v-5d9d581e${_scopeId2}>The flow works on devices with different screen sizes, orientations, and accessibility settings</li>`);
            } else {
              return [
                createVNode("li", null, "Deep linking correctly opens the native app on both iOS and Android when the app is installed, across all major browsers"),
                createVNode("li", null, "The browser fallback renders and functions correctly on both iOS and Android when the app is not installed, across all major browsers"),
                createVNode("li", null, "The desktop experience works across all major desktop browsers"),
                createVNode("li", null, "The flow completes successfully regardless of whether the TPP opens the redirect in the current tab, a new tab, or a system browser view"),
                createVNode("li", null, "Navigation behaviour is sensible — for example, pressing the device back button during the flow does not leave the end user stranded on a blank page"),
                createVNode("li", null, "The flow works on devices with different screen sizes, orientations, and accessibility settings")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdNote, {
          type: "warning",
          title: "Compatibility failures block production certification"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<p data-v-5d9d581e${_scopeId2}> Any failure of the Authorization Endpoint to function on a device or browser that end users commonly use will be treated as a <strong data-v-5d9d581e${_scopeId2}>certification failure</strong>. The LFI is responsible for ensuring broad compatibility. The CX certification process, managed by Nebras, will verify this as part of production readiness. </p>`);
            } else {
              return [
                createVNode("p", null, [
                  createTextVNode(" Any failure of the Authorization Endpoint to function on a device or browser that end users commonly use will be treated as a "),
                  createVNode("strong", null, "certification failure"),
                  createTextVNode(". The LFI is responsible for ensuring broad compatibility. The CX certification process, managed by Nebras, will verify this as part of production readiness. ")
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 data-v-5d9d581e${_scopeId}>App disambiguation</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` On Android, if multiple apps are registered to handle the same domain (for example, a production app and a development build), the OS may display a disambiguation dialog asking the end user to choose which app to open. This MUST NOT occur in production — it confuses the end user and undermines trust. `);
            } else {
              return [
                createTextVNode(" On Android, if multiple apps are registered to handle the same domain (for example, a production app and a development build), the OS may display a disambiguation dialog asking the end user to choose which app to open. This MUST NOT occur in production — it confuses the end user and undermines trust. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` LFIs MUST ensure that only the production app is verified against the production Authorization Endpoint domain. Development and staging builds MUST use separate domains (e.g. <code data-v-5d9d581e${_scopeId2}>openbanking-dev.example.com</code>) and MUST NOT be registered against the production domain&#39;s <code data-v-5d9d581e${_scopeId2}>assetlinks.json</code>. `);
            } else {
              return [
                createTextVNode(" LFIs MUST ensure that only the production app is verified against the production Authorization Endpoint domain. Development and staging builds MUST use separate domains (e.g. "),
                createVNode("code", null, "openbanking-dev.example.com"),
                createTextVNode(") and MUST NOT be registered against the production domain's "),
                createVNode("code", null, "assetlinks.json"),
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
              createTextVNode(" The Authorization Endpoint is invoked by a TPP that the LFI does not control. The LFI cannot predict which device, operating system, browser, or redirect method the TPP will use. The endpoint MUST therefore work reliably across all common combinations. ")
            ]),
            _: 1
          }),
          createVNode("h3", null, "What the LFI MUST support"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode("The Authorization Endpoint MUST function correctly:")
            ]),
            _: 1
          }),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, [
                createVNode("strong", null, "Across mobile platforms"),
                createTextVNode(" — iOS and Android, including current and recent OS versions")
              ]),
              createVNode("li", null, [
                createVNode("strong", null, "Across mobile browsers"),
                createTextVNode(" — Safari, Chrome, Samsung Internet, Firefox, and any other browser with meaningful market share in the UAE. The deep link MUST open the app regardless of which browser the TPP is using. If the app is not installed, the browser fallback MUST render correctly in all of these browsers.")
              ]),
              createVNode("li", null, [
                createVNode("strong", null, "Across desktop browsers"),
                createTextVNode(" — Chrome, Safari, Edge, and Firefox on Windows, macOS, and common Linux distributions")
              ]),
              createVNode("li", null, [
                createVNode("strong", null, "Regardless of how the TPP opens the redirect"),
                createTextVNode(" — the endpoint MUST work whether the TPP opens the URL in the current browser tab, a new browser tab, or a system browser view (e.g. "),
                createVNode("code", null, "SFSafariViewController"),
                createTextVNode(" on iOS, Chrome Custom Tabs on Android). The behaviour MUST be seamless in all cases.")
              ]),
              createVNode("li", null, [
                createVNode("strong", null, "On both mobile and desktop"),
                createTextVNode(" — the same URL serves the appropriate experience based on the device context")
              ])
            ]),
            _: 1
          }),
          createVNode("h3", null, "What the LFI MUST test"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" LFIs are responsible for comprehensive testing of the Authorization Endpoint across the full range of devices, operating systems, and browsers their end users may use. This includes verifying that: ")
            ]),
            _: 1
          }),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, "Deep linking correctly opens the native app on both iOS and Android when the app is installed, across all major browsers"),
              createVNode("li", null, "The browser fallback renders and functions correctly on both iOS and Android when the app is not installed, across all major browsers"),
              createVNode("li", null, "The desktop experience works across all major desktop browsers"),
              createVNode("li", null, "The flow completes successfully regardless of whether the TPP opens the redirect in the current tab, a new tab, or a system browser view"),
              createVNode("li", null, "Navigation behaviour is sensible — for example, pressing the device back button during the flow does not leave the end user stranded on a blank page"),
              createVNode("li", null, "The flow works on devices with different screen sizes, orientations, and accessibility settings")
            ]),
            _: 1
          }),
          createVNode(_component_EdNote, {
            type: "warning",
            title: "Compatibility failures block production certification"
          }, {
            default: withCtx(() => [
              createVNode("p", null, [
                createTextVNode(" Any failure of the Authorization Endpoint to function on a device or browser that end users commonly use will be treated as a "),
                createVNode("strong", null, "certification failure"),
                createTextVNode(". The LFI is responsible for ensuring broad compatibility. The CX certification process, managed by Nebras, will verify this as part of production readiness. ")
              ])
            ]),
            _: 1
          }),
          createVNode("h3", null, "App disambiguation"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" On Android, if multiple apps are registered to handle the same domain (for example, a production app and a development build), the OS may display a disambiguation dialog asking the end user to choose which app to open. This MUST NOT occur in production — it confuses the end user and undermines trust. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" LFIs MUST ensure that only the production app is verified against the production Authorization Endpoint domain. Development and staging builds MUST use separate domains (e.g. "),
              createVNode("code", null, "openbanking-dev.example.com"),
              createTextVNode(") and MUST NOT be registered against the production domain's "),
              createVNode("code", null, "assetlinks.json"),
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
    id: "summary",
    num: "07",
    color: "var(--at-blue-deep, #1d4ed8)",
    eyebrow: "Summary of requirements",
    title: "The full checklist",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdRefTable, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<table data-v-5d9d581e${_scopeId2}><thead data-v-5d9d581e${_scopeId2}><tr data-v-5d9d581e${_scopeId2}><th style="${ssrRenderStyle({ "width": "3rem" })}" data-v-5d9d581e${_scopeId2}>#</th><th data-v-5d9d581e${_scopeId2}>Requirement</th></tr></thead><tbody data-v-5d9d581e${_scopeId2}><tr data-v-5d9d581e${_scopeId2}><td data-v-5d9d581e${_scopeId2}>1</td><td data-v-5d9d581e${_scopeId2}>HTTPS only — no HTTP, no custom URL schemes</td></tr><tr data-v-5d9d581e${_scopeId2}><td data-v-5d9d581e${_scopeId2}>2</td><td data-v-5d9d581e${_scopeId2}>No query parameters in the base URL</td></tr><tr data-v-5d9d581e${_scopeId2}><td data-v-5d9d581e${_scopeId2}>3</td><td data-v-5d9d581e${_scopeId2}>Publicly accessible over the internet</td></tr><tr data-v-5d9d581e${_scopeId2}><td data-v-5d9d581e${_scopeId2}>4</td><td data-v-5d9d581e${_scopeId2}>Universal Links (iOS) and App Links (Android) configured for the domain</td></tr><tr data-v-5d9d581e${_scopeId2}><td data-v-5d9d581e${_scopeId2}>5</td><td data-v-5d9d581e${_scopeId2}><code data-v-5d9d581e${_scopeId2}>apple-app-site-association</code> and <code data-v-5d9d581e${_scopeId2}>assetlinks.json</code> hosted and verified</td></tr><tr data-v-5d9d581e${_scopeId2}><td data-v-5d9d581e${_scopeId2}>6</td><td data-v-5d9d581e${_scopeId2}>App opens directly when installed — no intermediate pages or disambiguation dialogs</td></tr><tr data-v-5d9d581e${_scopeId2}><td data-v-5d9d581e${_scopeId2}>7</td><td data-v-5d9d581e${_scopeId2}>Mobile-optimised web fallback when app is not installed</td></tr><tr data-v-5d9d581e${_scopeId2}><td data-v-5d9d581e${_scopeId2}>8</td><td data-v-5d9d581e${_scopeId2}>Desktop web experience with handoff to mobile app (QR, push) or browser-based auth</td></tr><tr data-v-5d9d581e${_scopeId2}><td data-v-5d9d581e${_scopeId2}>9</td><td data-v-5d9d581e${_scopeId2}>Works across all major browsers on iOS, Android, and desktop</td></tr><tr data-v-5d9d581e${_scopeId2}><td data-v-5d9d581e${_scopeId2}>10</td><td data-v-5d9d581e${_scopeId2}>Works regardless of TPP redirect method (current tab, new tab, system browser view)</td></tr><tr data-v-5d9d581e${_scopeId2}><td data-v-5d9d581e${_scopeId2}>11</td><td data-v-5d9d581e${_scopeId2}>Production app disambiguation resolved — only one app handles the production domain</td></tr><tr data-v-5d9d581e${_scopeId2}><td data-v-5d9d581e${_scopeId2}>12</td><td data-v-5d9d581e${_scopeId2}>CX certified by Nebras as part of production readiness</td></tr></tbody></table>`);
            } else {
              return [
                createVNode("table", null, [
                  createVNode("thead", null, [
                    createVNode("tr", null, [
                      createVNode("th", { style: { "width": "3rem" } }, "#"),
                      createVNode("th", null, "Requirement")
                    ])
                  ]),
                  createVNode("tbody", null, [
                    createVNode("tr", null, [
                      createVNode("td", null, "1"),
                      createVNode("td", null, "HTTPS only — no HTTP, no custom URL schemes")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "2"),
                      createVNode("td", null, "No query parameters in the base URL")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "3"),
                      createVNode("td", null, "Publicly accessible over the internet")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "4"),
                      createVNode("td", null, "Universal Links (iOS) and App Links (Android) configured for the domain")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "5"),
                      createVNode("td", null, [
                        createVNode("code", null, "apple-app-site-association"),
                        createTextVNode(" and "),
                        createVNode("code", null, "assetlinks.json"),
                        createTextVNode(" hosted and verified")
                      ])
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "6"),
                      createVNode("td", null, "App opens directly when installed — no intermediate pages or disambiguation dialogs")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "7"),
                      createVNode("td", null, "Mobile-optimised web fallback when app is not installed")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "8"),
                      createVNode("td", null, "Desktop web experience with handoff to mobile app (QR, push) or browser-based auth")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "9"),
                      createVNode("td", null, "Works across all major browsers on iOS, Android, and desktop")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "10"),
                      createVNode("td", null, "Works regardless of TPP redirect method (current tab, new tab, system browser view)")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "11"),
                      createVNode("td", null, "Production app disambiguation resolved — only one app handles the production domain")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "12"),
                      createVNode("td", null, "CX certified by Nebras as part of production readiness")
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
                    createVNode("th", { style: { "width": "3rem" } }, "#"),
                    createVNode("th", null, "Requirement")
                  ])
                ]),
                createVNode("tbody", null, [
                  createVNode("tr", null, [
                    createVNode("td", null, "1"),
                    createVNode("td", null, "HTTPS only — no HTTP, no custom URL schemes")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, "2"),
                    createVNode("td", null, "No query parameters in the base URL")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, "3"),
                    createVNode("td", null, "Publicly accessible over the internet")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, "4"),
                    createVNode("td", null, "Universal Links (iOS) and App Links (Android) configured for the domain")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, "5"),
                    createVNode("td", null, [
                      createVNode("code", null, "apple-app-site-association"),
                      createTextVNode(" and "),
                      createVNode("code", null, "assetlinks.json"),
                      createTextVNode(" hosted and verified")
                    ])
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, "6"),
                    createVNode("td", null, "App opens directly when installed — no intermediate pages or disambiguation dialogs")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, "7"),
                    createVNode("td", null, "Mobile-optimised web fallback when app is not installed")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, "8"),
                    createVNode("td", null, "Desktop web experience with handoff to mobile app (QR, push) or browser-based auth")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, "9"),
                    createVNode("td", null, "Works across all major browsers on iOS, Android, and desktop")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, "10"),
                    createVNode("td", null, "Works regardless of TPP redirect method (current tab, new tab, system browser view)")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, "11"),
                    createVNode("td", null, "Production app disambiguation resolved — only one app handles the production domain")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, "12"),
                    createVNode("td", null, "CX certified by Nebras as part of production readiness")
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
  _push(`</div>`);
}
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/environment-specific/auth-endpoint.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const authEndpoint = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-5d9d581e"]]);
export {
  authEndpoint as default
};
