import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
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
  const _component_EdNote = __unplugin_components_7;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-58bf95f4><section class="ed-doc__hero" data-v-58bf95f4><div class="ed-doc__inner" data-v-58bf95f4><div class="ed-doc__eyebrow" data-v-58bf95f4><span class="ed-doc__eyebrow-dash" data-v-58bf95f4></span> TPP · Trust Framework · LFI Discovery </div><h1 class="ed-doc__title" data-v-58bf95f4> Authorisation Servers <span class="ed-doc__read" data-v-58bf95f4>2 min read</span></h1><p class="ed-doc__lede" data-v-58bf95f4> Each <strong data-v-58bf95f4>Authorisation Server</strong> represents an <strong data-v-58bf95f4>Ozone API Hub</strong> through which a Licensed Financial Institution (LFI) exposes its Open Finance APIs. These servers allow Third Party Providers (TPPs) to authenticate, request consent, and interact securely with the LFI&#39;s API ecosystem. </p><p class="ed-doc__lede ed-doc__lede--tight" data-v-58bf95f4> Each server object provides both technical and customer-facing metadata, enabling TPPs to integrate programmatically while also presenting consistent branding to end-users. </p></div></section>`);
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "key-properties",
    num: "01",
    color: "var(--at-teal)",
    eyebrow: "Key Properties",
    title: "Fields returned for every Authorisation Server",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdRefTable, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<table data-v-58bf95f4${_scopeId2}><thead data-v-58bf95f4${_scopeId2}><tr data-v-58bf95f4${_scopeId2}><th data-v-58bf95f4${_scopeId2}>Property</th><th data-v-58bf95f4${_scopeId2}>Description</th></tr></thead><tbody data-v-58bf95f4${_scopeId2}><tr data-v-58bf95f4${_scopeId2}><td data-v-58bf95f4${_scopeId2}><code data-v-58bf95f4${_scopeId2}>AuthorisationServerId</code></td><td data-v-58bf95f4${_scopeId2}>Unique identifier for this Authorisation Server.</td></tr><tr data-v-58bf95f4${_scopeId2}><td data-v-58bf95f4${_scopeId2}><code data-v-58bf95f4${_scopeId2}>Status</code></td><td data-v-58bf95f4${_scopeId2}>Current status of the server (e.g., Active).</td></tr><tr data-v-58bf95f4${_scopeId2}><td data-v-58bf95f4${_scopeId2}><code data-v-58bf95f4${_scopeId2}>Issuer</code></td><td data-v-58bf95f4${_scopeId2}>Base URL of the Authorization Server used for token validation and JWT verification.</td></tr><tr data-v-58bf95f4${_scopeId2}><td data-v-58bf95f4${_scopeId2}><code data-v-58bf95f4${_scopeId2}>OpenIDDiscoveryDocument</code></td><td data-v-58bf95f4${_scopeId2}>URL of the <code data-v-58bf95f4${_scopeId2}>.well-known/openid-configuration</code> endpoint containing OAuth 2.0 and OpenID Connect metadata. This document provides TPPs with all necessary endpoints for registration, authentication, and token exchange.</td></tr><tr data-v-58bf95f4${_scopeId2}><td data-v-58bf95f4${_scopeId2}><code data-v-58bf95f4${_scopeId2}>CustomerFriendlyName</code></td><td data-v-58bf95f4${_scopeId2}>Display name chosen by the LFI to represent the server to Customers. TPPs should present this to end-users. Example: <code data-v-58bf95f4${_scopeId2}>&quot;ENBDX&quot;</code>.</td></tr><tr data-v-58bf95f4${_scopeId2}><td data-v-58bf95f4${_scopeId2}><code data-v-58bf95f4${_scopeId2}>CustomerFriendlyLogoUri</code></td><td data-v-58bf95f4${_scopeId2}>URL to the logo the LFI considers best for the server. TPPs should use this logo when displaying the server to end-users to maintain consistent branding. Example: <code data-v-58bf95f4${_scopeId2}>https://data.directory.openfinance.ae/logos/.../authorisationservers/...png</code>.</td></tr></tbody></table>`);
            } else {
              return [
                createVNode("table", null, [
                  createVNode("thead", null, [
                    createVNode("tr", null, [
                      createVNode("th", null, "Property"),
                      createVNode("th", null, "Description")
                    ])
                  ]),
                  createVNode("tbody", null, [
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("code", null, "AuthorisationServerId")
                      ]),
                      createVNode("td", null, "Unique identifier for this Authorisation Server.")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("code", null, "Status")
                      ]),
                      createVNode("td", null, "Current status of the server (e.g., Active).")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("code", null, "Issuer")
                      ]),
                      createVNode("td", null, "Base URL of the Authorization Server used for token validation and JWT verification.")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("code", null, "OpenIDDiscoveryDocument")
                      ]),
                      createVNode("td", null, [
                        createTextVNode("URL of the "),
                        createVNode("code", null, ".well-known/openid-configuration"),
                        createTextVNode(" endpoint containing OAuth 2.0 and OpenID Connect metadata. This document provides TPPs with all necessary endpoints for registration, authentication, and token exchange.")
                      ])
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("code", null, "CustomerFriendlyName")
                      ]),
                      createVNode("td", null, [
                        createTextVNode("Display name chosen by the LFI to represent the server to Customers. TPPs should present this to end-users. Example: "),
                        createVNode("code", null, '"ENBDX"'),
                        createTextVNode(".")
                      ])
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("code", null, "CustomerFriendlyLogoUri")
                      ]),
                      createVNode("td", null, [
                        createTextVNode("URL to the logo the LFI considers best for the server. TPPs should use this logo when displaying the server to end-users to maintain consistent branding. Example: "),
                        createVNode("code", null, "https://data.directory.openfinance.ae/logos/.../authorisationservers/...png"),
                        createTextVNode(".")
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
              _push3(` The <code data-v-58bf95f4${_scopeId2}>CustomerFriendlyLogoUri</code> and <code data-v-58bf95f4${_scopeId2}>CustomerFriendlyName</code> allow TPPs to display a consistent user interface for end-users when selecting or authenticating with an Authorisation Server. This ensures the server is easily identifiable and trusted by customers. `);
            } else {
              return [
                createTextVNode(" The "),
                createVNode("code", null, "CustomerFriendlyLogoUri"),
                createTextVNode(" and "),
                createVNode("code", null, "CustomerFriendlyName"),
                createTextVNode(" allow TPPs to display a consistent user interface for end-users when selecting or authenticating with an Authorisation Server. This ensures the server is easily identifiable and trusted by customers. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdNote, { type: "tip" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<p data-v-58bf95f4${_scopeId2}> Always use the logo dynamically from <code data-v-58bf95f4${_scopeId2}>CustomerFriendlyLogoUri</code> rather than hardcoding, so any updates made by the LFI are automatically reflected. </p>`);
            } else {
              return [
                createVNode("p", null, [
                  createTextVNode(" Always use the logo dynamically from "),
                  createVNode("code", null, "CustomerFriendlyLogoUri"),
                  createTextVNode(" rather than hardcoding, so any updates made by the LFI are automatically reflected. ")
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdNote, {
          type: "info",
          title: "OpenIDDiscoveryDocument is a URL, not the document"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<p data-v-58bf95f4${_scopeId2}><code data-v-58bf95f4${_scopeId2}>OpenIDDiscoveryDocument</code> is the <strong data-v-58bf95f4${_scopeId2}>URL</strong> of the LFI&#39;s <code data-v-58bf95f4${_scopeId2}>.well-known/openid-configuration</code> endpoint — it is a pointer, not the configuration data itself. To obtain the actual endpoints your application needs (such as <code data-v-58bf95f4${_scopeId2}>authorization_endpoint</code>, <code data-v-58bf95f4${_scopeId2}>token_endpoint</code>, <code data-v-58bf95f4${_scopeId2}>pushed_authorization_request_endpoint</code>, and <code data-v-58bf95f4${_scopeId2}>registration_endpoint</code>), you must make a separate <code data-v-58bf95f4${_scopeId2}>GET</code> request to that URL. </p>`);
            } else {
              return [
                createVNode("p", null, [
                  createVNode("code", null, "OpenIDDiscoveryDocument"),
                  createTextVNode(" is the "),
                  createVNode("strong", null, "URL"),
                  createTextVNode(" of the LFI's "),
                  createVNode("code", null, ".well-known/openid-configuration"),
                  createTextVNode(" endpoint — it is a pointer, not the configuration data itself. To obtain the actual endpoints your application needs (such as "),
                  createVNode("code", null, "authorization_endpoint"),
                  createTextVNode(", "),
                  createVNode("code", null, "token_endpoint"),
                  createTextVNode(", "),
                  createVNode("code", null, "pushed_authorization_request_endpoint"),
                  createTextVNode(", and "),
                  createVNode("code", null, "registration_endpoint"),
                  createTextVNode("), you must make a separate "),
                  createVNode("code", null, "GET"),
                  createTextVNode(" request to that URL. ")
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Additional details about the Discovery endpoint can be found in <a href="/tech/tpp-standards/trust-framework/well-known/" data-v-58bf95f4${_scopeId2}>Discovery</a>. `);
            } else {
              return [
                createTextVNode(" Additional details about the Discovery endpoint can be found in "),
                createVNode("a", { href: "/tech/tpp-standards/trust-framework/well-known/" }, "Discovery"),
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
                    createVNode("th", null, "Property"),
                    createVNode("th", null, "Description")
                  ])
                ]),
                createVNode("tbody", null, [
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("code", null, "AuthorisationServerId")
                    ]),
                    createVNode("td", null, "Unique identifier for this Authorisation Server.")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("code", null, "Status")
                    ]),
                    createVNode("td", null, "Current status of the server (e.g., Active).")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("code", null, "Issuer")
                    ]),
                    createVNode("td", null, "Base URL of the Authorization Server used for token validation and JWT verification.")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("code", null, "OpenIDDiscoveryDocument")
                    ]),
                    createVNode("td", null, [
                      createTextVNode("URL of the "),
                      createVNode("code", null, ".well-known/openid-configuration"),
                      createTextVNode(" endpoint containing OAuth 2.0 and OpenID Connect metadata. This document provides TPPs with all necessary endpoints for registration, authentication, and token exchange.")
                    ])
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("code", null, "CustomerFriendlyName")
                    ]),
                    createVNode("td", null, [
                      createTextVNode("Display name chosen by the LFI to represent the server to Customers. TPPs should present this to end-users. Example: "),
                      createVNode("code", null, '"ENBDX"'),
                      createTextVNode(".")
                    ])
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("code", null, "CustomerFriendlyLogoUri")
                    ]),
                    createVNode("td", null, [
                      createTextVNode("URL to the logo the LFI considers best for the server. TPPs should use this logo when displaying the server to end-users to maintain consistent branding. Example: "),
                      createVNode("code", null, "https://data.directory.openfinance.ae/logos/.../authorisationservers/...png"),
                      createTextVNode(".")
                    ])
                  ])
                ])
              ])
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" The "),
              createVNode("code", null, "CustomerFriendlyLogoUri"),
              createTextVNode(" and "),
              createVNode("code", null, "CustomerFriendlyName"),
              createTextVNode(" allow TPPs to display a consistent user interface for end-users when selecting or authenticating with an Authorisation Server. This ensures the server is easily identifiable and trusted by customers. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdNote, { type: "tip" }, {
            default: withCtx(() => [
              createVNode("p", null, [
                createTextVNode(" Always use the logo dynamically from "),
                createVNode("code", null, "CustomerFriendlyLogoUri"),
                createTextVNode(" rather than hardcoding, so any updates made by the LFI are automatically reflected. ")
              ])
            ]),
            _: 1
          }),
          createVNode(_component_EdNote, {
            type: "info",
            title: "OpenIDDiscoveryDocument is a URL, not the document"
          }, {
            default: withCtx(() => [
              createVNode("p", null, [
                createVNode("code", null, "OpenIDDiscoveryDocument"),
                createTextVNode(" is the "),
                createVNode("strong", null, "URL"),
                createTextVNode(" of the LFI's "),
                createVNode("code", null, ".well-known/openid-configuration"),
                createTextVNode(" endpoint — it is a pointer, not the configuration data itself. To obtain the actual endpoints your application needs (such as "),
                createVNode("code", null, "authorization_endpoint"),
                createTextVNode(", "),
                createVNode("code", null, "token_endpoint"),
                createTextVNode(", "),
                createVNode("code", null, "pushed_authorization_request_endpoint"),
                createTextVNode(", and "),
                createVNode("code", null, "registration_endpoint"),
                createTextVNode("), you must make a separate "),
                createVNode("code", null, "GET"),
                createTextVNode(" request to that URL. ")
              ])
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Additional details about the Discovery endpoint can be found in "),
              createVNode("a", { href: "/tech/tpp-standards/trust-framework/well-known/" }, "Discovery"),
              createTextVNode(". ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/trust-framework/authorisation-servers.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const authorisationServers = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-58bf95f4"]]);
export {
  authorisationServers as default
};
