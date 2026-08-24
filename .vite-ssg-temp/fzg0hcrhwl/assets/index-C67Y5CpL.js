import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
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
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-32f7d36b><section class="ed-doc__hero" data-v-32f7d36b><div class="ed-doc__inner" data-v-32f7d36b><div class="ed-doc__eyebrow" data-v-32f7d36b><span class="ed-doc__eyebrow-dash" data-v-32f7d36b></span> LFI · Trust Framework · API </div><h1 class="ed-doc__title" data-v-32f7d36b> API <span class="ed-doc__read" data-v-32f7d36b>2 min read</span></h1><p class="ed-doc__lede" data-v-32f7d36b> Several things that you can do in the Trust Framework portal can also be done via API — managing organisations, software statements, authorisation servers, certificates, and contacts. </p><p class="ed-doc__lede ed-doc__lede--tight" data-v-32f7d36b> The API uses <strong data-v-32f7d36b>mTLS</strong> for all authenticated requests. A valid transport certificate registered in the Trust Framework is required. </p></div></section>`);
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "endpoints",
    num: "01",
    color: "var(--at-teal)",
    eyebrow: "Endpoints",
    title: "Production and Sandbox base URLs",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdRefTable, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<table data-v-32f7d36b${_scopeId2}><thead data-v-32f7d36b${_scopeId2}><tr data-v-32f7d36b${_scopeId2}><th data-v-32f7d36b${_scopeId2}></th><th data-v-32f7d36b${_scopeId2}>Production</th><th data-v-32f7d36b${_scopeId2}>Sandbox</th></tr></thead><tbody data-v-32f7d36b${_scopeId2}><tr data-v-32f7d36b${_scopeId2}><td data-v-32f7d36b${_scopeId2}><strong data-v-32f7d36b${_scopeId2}>Well Known</strong></td><td data-v-32f7d36b${_scopeId2}><a href="https://auth.directory.openfinance.ae/.well-known/openid-configuration" data-v-32f7d36b${_scopeId2}><code data-v-32f7d36b${_scopeId2}>auth.directory.openfinance.ae/.well-known/openid-configuration</code></a></td><td data-v-32f7d36b${_scopeId2}><a href="https://auth.sandbox.directory.openfinance.ae/.well-known/openid-configuration" data-v-32f7d36b${_scopeId2}><code data-v-32f7d36b${_scopeId2}>auth.sandbox.directory.openfinance.ae/.well-known/openid-configuration</code></a></td></tr><tr data-v-32f7d36b${_scopeId2}><td data-v-32f7d36b${_scopeId2}><strong data-v-32f7d36b${_scopeId2}>Auth</strong></td><td data-v-32f7d36b${_scopeId2}><code data-v-32f7d36b${_scopeId2}>https://matls-auth.directory.openfinance.ae</code></td><td data-v-32f7d36b${_scopeId2}><code data-v-32f7d36b${_scopeId2}>https://matls-auth.sandbox.directory.openfinance.ae</code></td></tr><tr data-v-32f7d36b${_scopeId2}><td data-v-32f7d36b${_scopeId2}><strong data-v-32f7d36b${_scopeId2}>API</strong></td><td data-v-32f7d36b${_scopeId2}><code data-v-32f7d36b${_scopeId2}>https://matls-api.directory.openfinance.ae</code></td><td data-v-32f7d36b${_scopeId2}><code data-v-32f7d36b${_scopeId2}>https://matls-api.sandbox.directory.openfinance.ae</code></td></tr></tbody></table>`);
            } else {
              return [
                createVNode("table", null, [
                  createVNode("thead", null, [
                    createVNode("tr", null, [
                      createVNode("th"),
                      createVNode("th", null, "Production"),
                      createVNode("th", null, "Sandbox")
                    ])
                  ]),
                  createVNode("tbody", null, [
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("strong", null, "Well Known")
                      ]),
                      createVNode("td", null, [
                        createVNode("a", { href: "https://auth.directory.openfinance.ae/.well-known/openid-configuration" }, [
                          createVNode("code", null, "auth.directory.openfinance.ae/.well-known/openid-configuration")
                        ])
                      ]),
                      createVNode("td", null, [
                        createVNode("a", { href: "https://auth.sandbox.directory.openfinance.ae/.well-known/openid-configuration" }, [
                          createVNode("code", null, "auth.sandbox.directory.openfinance.ae/.well-known/openid-configuration")
                        ])
                      ])
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("strong", null, "Auth")
                      ]),
                      createVNode("td", null, [
                        createVNode("code", null, "https://matls-auth.directory.openfinance.ae")
                      ]),
                      createVNode("td", null, [
                        createVNode("code", null, "https://matls-auth.sandbox.directory.openfinance.ae")
                      ])
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("strong", null, "API")
                      ]),
                      createVNode("td", null, [
                        createVNode("code", null, "https://matls-api.directory.openfinance.ae")
                      ]),
                      createVNode("td", null, [
                        createVNode("code", null, "https://matls-api.sandbox.directory.openfinance.ae")
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
              _push3(` As per the Trust Framework, the API is powered by <strong data-v-32f7d36b${_scopeId2}>Raidiam</strong> and the official documentation can be found at <a href="https://www.raidiam.com/developers/docs/apis" data-v-32f7d36b${_scopeId2}>raidiam.com/developers/docs/apis</a>. `);
            } else {
              return [
                createTextVNode(" As per the Trust Framework, the API is powered by "),
                createVNode("strong", null, "Raidiam"),
                createTextVNode(" and the official documentation can be found at "),
                createVNode("a", { href: "https://www.raidiam.com/developers/docs/apis" }, "raidiam.com/developers/docs/apis"),
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
                    createVNode("th"),
                    createVNode("th", null, "Production"),
                    createVNode("th", null, "Sandbox")
                  ])
                ]),
                createVNode("tbody", null, [
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("strong", null, "Well Known")
                    ]),
                    createVNode("td", null, [
                      createVNode("a", { href: "https://auth.directory.openfinance.ae/.well-known/openid-configuration" }, [
                        createVNode("code", null, "auth.directory.openfinance.ae/.well-known/openid-configuration")
                      ])
                    ]),
                    createVNode("td", null, [
                      createVNode("a", { href: "https://auth.sandbox.directory.openfinance.ae/.well-known/openid-configuration" }, [
                        createVNode("code", null, "auth.sandbox.directory.openfinance.ae/.well-known/openid-configuration")
                      ])
                    ])
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("strong", null, "Auth")
                    ]),
                    createVNode("td", null, [
                      createVNode("code", null, "https://matls-auth.directory.openfinance.ae")
                    ]),
                    createVNode("td", null, [
                      createVNode("code", null, "https://matls-auth.sandbox.directory.openfinance.ae")
                    ])
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("strong", null, "API")
                    ]),
                    createVNode("td", null, [
                      createVNode("code", null, "https://matls-api.directory.openfinance.ae")
                    ]),
                    createVNode("td", null, [
                      createVNode("code", null, "https://matls-api.sandbox.directory.openfinance.ae")
                    ])
                  ])
                ])
              ])
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" As per the Trust Framework, the API is powered by "),
              createVNode("strong", null, "Raidiam"),
              createTextVNode(" and the official documentation can be found at "),
              createVNode("a", { href: "https://www.raidiam.com/developers/docs/apis" }, "raidiam.com/developers/docs/apis"),
              createTextVNode(". ")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<section class="ed-doc__contents" data-v-32f7d36b><div class="ed-doc__inner" data-v-32f7d36b><div class="ed-doc__contents-head" data-v-32f7d36b><div class="ed-doc__contents-eyebrow" data-v-32f7d36b><span class="ed-doc__eyebrow-dash" data-v-32f7d36b></span> Section contents </div><h2 class="ed-doc__contents-title" data-v-32f7d36b>Browse this section</h2><p class="ed-doc__contents-sub" data-v-32f7d36b>The full set of pages covering the Trust Framework API.</p></div><div class="ed-doc__contents-grid" data-v-32f7d36b><a class="ed-link-card" href="/tech/lfi-api-hub/trust-framework/api/api-guide" style="${ssrRenderStyle({ "--card-color": "var(--at-teal)" })}" data-v-32f7d36b><span class="ed-link-card__top" data-v-32f7d36b></span><div class="ed-link-card__meta" data-v-32f7d36b><span class="ed-link-card__cat" data-v-32f7d36b>Page</span></div><h3 class="ed-link-card__title" data-v-32f7d36b>API Guide</h3><p class="ed-link-card__desc" data-v-32f7d36b>Implementation notes, signing helpers, and worked examples for calling the Trust Framework API.</p><div class="ed-link-card__foot" data-v-32f7d36b><span class="ed-link-card__cta" data-v-32f7d36b>Open</span><span class="ed-link-card__arrow" data-v-32f7d36b>→</span></div></a><a class="ed-link-card" href="/tech/lfi-api-hub/trust-framework/api/token" style="${ssrRenderStyle({ "--card-color": "var(--at-blue-deep, #1d4ed8)" })}" data-v-32f7d36b><span class="ed-link-card__top" data-v-32f7d36b></span><div class="ed-link-card__meta" data-v-32f7d36b><span class="ed-link-card__cat" data-v-32f7d36b>Endpoint</span><span class="http-badge http-post" data-v-32f7d36b>POST</span><code class="ed-link-card__path" data-v-32f7d36b>/token</code></div><h3 class="ed-link-card__title" data-v-32f7d36b>Create a token</h3><p class="ed-link-card__desc" data-v-32f7d36b>OpenAPI reference for the Trust Framework <span class="endpoint" data-v-32f7d36b><span class="http-method http-method--post" data-v-32f7d36b>POST</span><code data-v-32f7d36b>/token</code></span> endpoint.</p><div class="ed-link-card__foot" data-v-32f7d36b><span class="ed-link-card__cta" data-v-32f7d36b>Open spec</span><span class="ed-link-card__arrow" data-v-32f7d36b>→</span></div></a><a class="ed-link-card" href="/tech/lfi-api-hub/trust-framework/api/organisations" style="${ssrRenderStyle({ "--card-color": "var(--at-blue-deep, #1d4ed8)" })}" data-v-32f7d36b><span class="ed-link-card__top" data-v-32f7d36b></span><div class="ed-link-card__meta" data-v-32f7d36b><span class="ed-link-card__cat" data-v-32f7d36b>Endpoint</span><span class="http-badge http-get" data-v-32f7d36b>GET</span><code class="ed-link-card__path" data-v-32f7d36b>/organisations</code></div><h3 class="ed-link-card__title" data-v-32f7d36b>Get organisations</h3><p class="ed-link-card__desc" data-v-32f7d36b>OpenAPI reference for fetching organisations from the Trust Framework Directory.</p><div class="ed-link-card__foot" data-v-32f7d36b><span class="ed-link-card__cta" data-v-32f7d36b>Open spec</span><span class="ed-link-card__arrow" data-v-32f7d36b>→</span></div></a><a class="ed-link-card" href="/tech/lfi-api-hub/trust-framework/api/software-statements" style="${ssrRenderStyle({ "--card-color": "var(--at-blue-deep, #1d4ed8)" })}" data-v-32f7d36b><span class="ed-link-card__top" data-v-32f7d36b></span><div class="ed-link-card__meta" data-v-32f7d36b><span class="ed-link-card__cat" data-v-32f7d36b>Endpoint</span><span class="http-badge http-get" data-v-32f7d36b>GET</span><code class="ed-link-card__path" data-v-32f7d36b>.../{OrganisationId}/softwarestatements</code></div><h3 class="ed-link-card__title" data-v-32f7d36b>Get software statements</h3><p class="ed-link-card__desc" data-v-32f7d36b>OpenAPI reference for fetching software statements registered for an organisation.</p><div class="ed-link-card__foot" data-v-32f7d36b><span class="ed-link-card__cta" data-v-32f7d36b>Open spec</span><span class="ed-link-card__arrow" data-v-32f7d36b>→</span></div></a><a class="ed-link-card" href="/tech/lfi-api-hub/trust-framework/api/contacts" style="${ssrRenderStyle({ "--card-color": "var(--at-blue-deep, #1d4ed8)" })}" data-v-32f7d36b><span class="ed-link-card__top" data-v-32f7d36b></span><div class="ed-link-card__meta" data-v-32f7d36b><span class="ed-link-card__cat" data-v-32f7d36b>Endpoint</span><span class="http-badge http-get" data-v-32f7d36b>GET</span><code class="ed-link-card__path" data-v-32f7d36b>.../{OrganisationId}/contacts</code></div><h3 class="ed-link-card__title" data-v-32f7d36b>Get contacts</h3><p class="ed-link-card__desc" data-v-32f7d36b>OpenAPI reference for fetching the contacts registered for an organisation.</p><div class="ed-link-card__foot" data-v-32f7d36b><span class="ed-link-card__cta" data-v-32f7d36b>Open spec</span><span class="ed-link-card__arrow" data-v-32f7d36b>→</span></div></a><a class="ed-link-card" href="/tech/lfi-api-hub/trust-framework/api/auth-servers" style="${ssrRenderStyle({ "--card-color": "var(--at-blue-deep, #1d4ed8)" })}" data-v-32f7d36b><span class="ed-link-card__top" data-v-32f7d36b></span><div class="ed-link-card__meta" data-v-32f7d36b><span class="ed-link-card__cat" data-v-32f7d36b>Endpoint</span><span class="http-badge http-get" data-v-32f7d36b>GET</span><code class="ed-link-card__path" data-v-32f7d36b>.../{OrganisationId}/authorisationservers</code></div><h3 class="ed-link-card__title" data-v-32f7d36b>Get authorisation servers</h3><p class="ed-link-card__desc" data-v-32f7d36b>OpenAPI reference for fetching authorisation servers under an organisation.</p><div class="ed-link-card__foot" data-v-32f7d36b><span class="ed-link-card__cta" data-v-32f7d36b>Open spec</span><span class="ed-link-card__arrow" data-v-32f7d36b>→</span></div></a><a class="ed-link-card" href="/tech/lfi-api-hub/trust-framework/api/api-resources" style="${ssrRenderStyle({ "--card-color": "var(--at-blue-deep, #1d4ed8)" })}" data-v-32f7d36b><span class="ed-link-card__top" data-v-32f7d36b></span><div class="ed-link-card__meta" data-v-32f7d36b><span class="ed-link-card__cat" data-v-32f7d36b>Endpoint</span><span class="http-badge http-get" data-v-32f7d36b>GET</span><code class="ed-link-card__path" data-v-32f7d36b>.../{AuthorisationServerId}/apiresources</code></div><h3 class="ed-link-card__title" data-v-32f7d36b>Get API resources</h3><p class="ed-link-card__desc" data-v-32f7d36b>OpenAPI reference for fetching API resources registered on an authorisation server.</p><div class="ed-link-card__foot" data-v-32f7d36b><span class="ed-link-card__cta" data-v-32f7d36b>Open spec</span><span class="ed-link-card__arrow" data-v-32f7d36b>→</span></div></a><a class="ed-link-card" href="/tech/lfi-api-hub/trust-framework/api/api-families" style="${ssrRenderStyle({ "--card-color": "var(--at-blue-deep, #1d4ed8)" })}" data-v-32f7d36b><span class="ed-link-card__top" data-v-32f7d36b></span><div class="ed-link-card__meta" data-v-32f7d36b><span class="ed-link-card__cat" data-v-32f7d36b>Endpoint</span><span class="http-badge http-get" data-v-32f7d36b>GET</span><code class="ed-link-card__path" data-v-32f7d36b>/references/apifamilies</code></div><h3 class="ed-link-card__title" data-v-32f7d36b>Get API families</h3><p class="ed-link-card__desc" data-v-32f7d36b>OpenAPI reference for retrieving the full set of API family definitions and metadata schemas.</p><div class="ed-link-card__foot" data-v-32f7d36b><span class="ed-link-card__cta" data-v-32f7d36b>Open spec</span><span class="ed-link-card__arrow" data-v-32f7d36b>→</span></div></a></div></div></section></div>`);
}
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/trust-framework/api/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-32f7d36b"]]);
export {
  index as default
};
