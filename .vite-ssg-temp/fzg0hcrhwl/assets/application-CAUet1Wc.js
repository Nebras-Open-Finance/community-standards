import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
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
  const _component_EdBullets = __unplugin_components_5;
  const _component_EdRefTable = __unplugin_components_12;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-097031e6><section class="ed-doc__hero" data-v-097031e6><div class="ed-doc__inner" data-v-097031e6><div class="ed-doc__eyebrow" data-v-097031e6><span class="ed-doc__eyebrow-dash" data-v-097031e6></span> LFI · Trust Framework · Applications </div><h1 class="ed-doc__title" data-v-097031e6> Application <span class="ed-doc__read" data-v-097031e6>2 min read</span></h1><p class="ed-doc__lede" data-v-097031e6> Within the Trust Framework, an application performs two closely related roles: <strong data-v-097031e6>software statement</strong> and <strong data-v-097031e6>client</strong>. </p></div></section>`);
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "software-statement",
    num: "01",
    color: "var(--at-teal)",
    eyebrow: "As a Software Statement",
    title: "The application's identity within the ecosystem",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` As a software statement, the application contains the key information required to establish a trusted connection with other organisations. This includes: `);
            } else {
              return [
                createTextVNode(" As a software statement, the application contains the key information required to establish a trusted connection with other organisations. This includes: ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-097031e6${_scopeId2}>The roles it is permitted to perform (e.g. <strong data-v-097031e6${_scopeId2}>BDSP</strong>, <strong data-v-097031e6${_scopeId2}>BSIP</strong>)</li><li data-v-097031e6${_scopeId2}>The organisation it belongs to</li><li data-v-097031e6${_scopeId2}>Its approved capabilities and permissions</li>`);
            } else {
              return [
                createVNode("li", null, [
                  createTextVNode("The roles it is permitted to perform (e.g. "),
                  createVNode("strong", null, "BDSP"),
                  createTextVNode(", "),
                  createVNode("strong", null, "BSIP"),
                  createTextVNode(")")
                ]),
                createVNode("li", null, "The organisation it belongs to"),
                createVNode("li", null, "Its approved capabilities and permissions")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` In this role, it defines the identity and permissions of the application as authorised within the ecosystem. `);
            } else {
              return [
                createTextVNode(" In this role, it defines the identity and permissions of the application as authorised within the ecosystem. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" As a software statement, the application contains the key information required to establish a trusted connection with other organisations. This includes: ")
            ]),
            _: 1
          }),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, [
                createTextVNode("The roles it is permitted to perform (e.g. "),
                createVNode("strong", null, "BDSP"),
                createTextVNode(", "),
                createVNode("strong", null, "BSIP"),
                createTextVNode(")")
              ]),
              createVNode("li", null, "The organisation it belongs to"),
              createVNode("li", null, "Its approved capabilities and permissions")
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" In this role, it defines the identity and permissions of the application as authorised within the ecosystem. ")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "client",
    num: "02",
    color: "var(--at-gold)",
    eyebrow: "As a Client",
    title: "The active connection to other organisations",
    tone: "surface"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` As a client, the same application becomes the active connection to another organisation (such as the API Hub). In this role, it: `);
            } else {
              return [
                createTextVNode(" As a client, the same application becomes the active connection to another organisation (such as the API Hub). In this role, it: ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-097031e6${_scopeId2}>Is issued credentials (such as a client ID and certificates)</li><li data-v-097031e6${_scopeId2}>Uses those credentials to make API calls and perform transactions</li><li data-v-097031e6${_scopeId2}>Is registered with the API Hub</li>`);
            } else {
              return [
                createVNode("li", null, "Is issued credentials (such as a client ID and certificates)"),
                createVNode("li", null, "Uses those credentials to make API calls and perform transactions"),
                createVNode("li", null, "Is registered with the API Hub")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`In simple terms:`);
            } else {
              return [
                createTextVNode("In simple terms:")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` An application both <strong data-v-097031e6${_scopeId2}>defines what it is allowed to do</strong> and <strong data-v-097031e6${_scopeId2}>uses those permissions to interact with other participants</strong>, in line with the rules set by the Central Bank of the UAE. `);
            } else {
              return [
                createTextVNode(" An application both "),
                createVNode("strong", null, "defines what it is allowed to do"),
                createTextVNode(" and "),
                createVNode("strong", null, "uses those permissions to interact with other participants"),
                createTextVNode(", in line with the rules set by the Central Bank of the UAE. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" As a client, the same application becomes the active connection to another organisation (such as the API Hub). In this role, it: ")
            ]),
            _: 1
          }),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, "Is issued credentials (such as a client ID and certificates)"),
              createVNode("li", null, "Uses those credentials to make API calls and perform transactions"),
              createVNode("li", null, "Is registered with the API Hub")
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode("In simple terms:")
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" An application both "),
              createVNode("strong", null, "defines what it is allowed to do"),
              createTextVNode(" and "),
              createVNode("strong", null, "uses those permissions to interact with other participants"),
              createTextVNode(", in line with the rules set by the Central Bank of the UAE. ")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "application-details",
    num: "03",
    color: "var(--at-blue-deep, #1d4ed8)",
    eyebrow: "Application Details",
    title: "What every application must register",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`Each application must include the following details:`);
            } else {
              return [
                createTextVNode("Each application must include the following details:")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdRefTable, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<table data-v-097031e6${_scopeId2}><thead data-v-097031e6${_scopeId2}><tr data-v-097031e6${_scopeId2}><th data-v-097031e6${_scopeId2}>Feature</th><th data-v-097031e6${_scopeId2}>Description</th><th data-v-097031e6${_scopeId2}>Example</th></tr></thead><tbody data-v-097031e6${_scopeId2}><tr data-v-097031e6${_scopeId2}><td data-v-097031e6${_scopeId2}><strong data-v-097031e6${_scopeId2}>Roles</strong></td><td data-v-097031e6${_scopeId2}>Functional roles assigned to the application, inherited from the parent organisation&#39;s registered roles.</td><td data-v-097031e6${_scopeId2}><code data-v-097031e6${_scopeId2}>BSIP</code>, <code data-v-097031e6${_scopeId2}>BDSP</code></td></tr><tr data-v-097031e6${_scopeId2}><td data-v-097031e6${_scopeId2}><strong data-v-097031e6${_scopeId2}>Client Name</strong></td><td data-v-097031e6${_scopeId2}>The public-facing name of the application as registered in the Trust Framework.</td><td data-v-097031e6${_scopeId2}><code data-v-097031e6${_scopeId2}>MyApp v1</code></td></tr><tr data-v-097031e6${_scopeId2}><td data-v-097031e6${_scopeId2}><strong data-v-097031e6${_scopeId2}>Version</strong></td><td data-v-097031e6${_scopeId2}>The current version of the application or software statement.</td><td data-v-097031e6${_scopeId2}><code data-v-097031e6${_scopeId2}>1.0.3</code></td></tr><tr data-v-097031e6${_scopeId2}><td data-v-097031e6${_scopeId2}><strong data-v-097031e6${_scopeId2}>Federation Entity Management Type</strong></td><td data-v-097031e6${_scopeId2}>Specifies how the application&#39;s entity is managed within the federation (e.g., self-managed or delegated).</td><td data-v-097031e6${_scopeId2}><code data-v-097031e6${_scopeId2}>federation-managed</code></td></tr><tr data-v-097031e6${_scopeId2}><td data-v-097031e6${_scopeId2}><strong data-v-097031e6${_scopeId2}>Logo</strong></td><td data-v-097031e6${_scopeId2}>A PNG or JPEG image uploaded to represent the application. Used in portals and consent screens.</td><td data-v-097031e6${_scopeId2}><code data-v-097031e6${_scopeId2}>logo.png</code></td></tr><tr data-v-097031e6${_scopeId2}><td data-v-097031e6${_scopeId2}><strong data-v-097031e6${_scopeId2}>Redirect URI</strong></td><td data-v-097031e6${_scopeId2}> Must be a valid HTTPS URI that complies with FAPI standards for redirection after authentication.<br data-v-097031e6${_scopeId2}><br data-v-097031e6${_scopeId2}> More information on Mobile app <a href="/tech/tpp-standards/trust-framework/redirect-uri" data-v-097031e6${_scopeId2}>Redirect URIs</a>. </td><td data-v-097031e6${_scopeId2}><code data-v-097031e6${_scopeId2}>https://app.example.com/callback</code></td></tr></tbody></table>`);
            } else {
              return [
                createVNode("table", null, [
                  createVNode("thead", null, [
                    createVNode("tr", null, [
                      createVNode("th", null, "Feature"),
                      createVNode("th", null, "Description"),
                      createVNode("th", null, "Example")
                    ])
                  ]),
                  createVNode("tbody", null, [
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("strong", null, "Roles")
                      ]),
                      createVNode("td", null, "Functional roles assigned to the application, inherited from the parent organisation's registered roles."),
                      createVNode("td", null, [
                        createVNode("code", null, "BSIP"),
                        createTextVNode(", "),
                        createVNode("code", null, "BDSP")
                      ])
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("strong", null, "Client Name")
                      ]),
                      createVNode("td", null, "The public-facing name of the application as registered in the Trust Framework."),
                      createVNode("td", null, [
                        createVNode("code", null, "MyApp v1")
                      ])
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("strong", null, "Version")
                      ]),
                      createVNode("td", null, "The current version of the application or software statement."),
                      createVNode("td", null, [
                        createVNode("code", null, "1.0.3")
                      ])
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("strong", null, "Federation Entity Management Type")
                      ]),
                      createVNode("td", null, "Specifies how the application's entity is managed within the federation (e.g., self-managed or delegated)."),
                      createVNode("td", null, [
                        createVNode("code", null, "federation-managed")
                      ])
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("strong", null, "Logo")
                      ]),
                      createVNode("td", null, "A PNG or JPEG image uploaded to represent the application. Used in portals and consent screens."),
                      createVNode("td", null, [
                        createVNode("code", null, "logo.png")
                      ])
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("strong", null, "Redirect URI")
                      ]),
                      createVNode("td", null, [
                        createTextVNode(" Must be a valid HTTPS URI that complies with FAPI standards for redirection after authentication."),
                        createVNode("br"),
                        createVNode("br"),
                        createTextVNode(" More information on Mobile app "),
                        createVNode("a", { href: "/tech/tpp-standards/trust-framework/redirect-uri" }, "Redirect URIs"),
                        createTextVNode(". ")
                      ]),
                      createVNode("td", null, [
                        createVNode("code", null, "https://app.example.com/callback")
                      ])
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
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode("Each application must include the following details:")
            ]),
            _: 1
          }),
          createVNode(_component_EdRefTable, null, {
            default: withCtx(() => [
              createVNode("table", null, [
                createVNode("thead", null, [
                  createVNode("tr", null, [
                    createVNode("th", null, "Feature"),
                    createVNode("th", null, "Description"),
                    createVNode("th", null, "Example")
                  ])
                ]),
                createVNode("tbody", null, [
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("strong", null, "Roles")
                    ]),
                    createVNode("td", null, "Functional roles assigned to the application, inherited from the parent organisation's registered roles."),
                    createVNode("td", null, [
                      createVNode("code", null, "BSIP"),
                      createTextVNode(", "),
                      createVNode("code", null, "BDSP")
                    ])
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("strong", null, "Client Name")
                    ]),
                    createVNode("td", null, "The public-facing name of the application as registered in the Trust Framework."),
                    createVNode("td", null, [
                      createVNode("code", null, "MyApp v1")
                    ])
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("strong", null, "Version")
                    ]),
                    createVNode("td", null, "The current version of the application or software statement."),
                    createVNode("td", null, [
                      createVNode("code", null, "1.0.3")
                    ])
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("strong", null, "Federation Entity Management Type")
                    ]),
                    createVNode("td", null, "Specifies how the application's entity is managed within the federation (e.g., self-managed or delegated)."),
                    createVNode("td", null, [
                      createVNode("code", null, "federation-managed")
                    ])
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("strong", null, "Logo")
                    ]),
                    createVNode("td", null, "A PNG or JPEG image uploaded to represent the application. Used in portals and consent screens."),
                    createVNode("td", null, [
                      createVNode("code", null, "logo.png")
                    ])
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("strong", null, "Redirect URI")
                    ]),
                    createVNode("td", null, [
                      createTextVNode(" Must be a valid HTTPS URI that complies with FAPI standards for redirection after authentication."),
                      createVNode("br"),
                      createVNode("br"),
                      createTextVNode(" More information on Mobile app "),
                      createVNode("a", { href: "/tech/tpp-standards/trust-framework/redirect-uri" }, "Redirect URIs"),
                      createTextVNode(". ")
                    ]),
                    createVNode("td", null, [
                      createVNode("code", null, "https://app.example.com/callback")
                    ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/trust-framework/application.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const application = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-097031e6"]]);
export {
  application as default
};
