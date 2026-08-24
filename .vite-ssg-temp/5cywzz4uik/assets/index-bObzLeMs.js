import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
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
  const _component_EdBullets = __unplugin_components_5;
  const _component_EdRefTable = __unplugin_components_12;
  const _component_EdNote = __unplugin_components_7;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-e716f0e0><section class="ed-doc__hero" data-v-e716f0e0><div class="ed-doc__inner" data-v-e716f0e0><div class="ed-doc__eyebrow" data-v-e716f0e0><span class="ed-doc__eyebrow-dash" data-v-e716f0e0></span> LFI · Trust Framework · Servers · API Resources </div><h1 class="ed-doc__title" data-v-e716f0e0> API Resources <span class="ed-doc__read" data-v-e716f0e0>2 min read</span></h1><p class="ed-doc__lede" data-v-e716f0e0><strong data-v-e716f0e0>API Resources</strong> are registered under your Authorisation Server and describe the specific API endpoints your organisation exposes to TPPs. Each API resource is associated with a set of scopes and a base URL, allowing TPPs to discover what you offer and how to reach it. </p><p class="ed-doc__lede ed-doc__lede--tight" data-v-e716f0e0> TPPs can discover the endpoints you expose via <a href="/tech/tpp-standards/trust-framework/open-api/participants" class="endpoint" data-v-e716f0e0><span class="http-method http-method--get" data-v-e716f0e0>GET</span><code data-v-e716f0e0>/participants</code></a>. </p></div></section>`);
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "what-is-api-resource",
    num: "01",
    color: "var(--at-teal)",
    eyebrow: "What is an API Resource?",
    title: "The directory record TPPs use to find your endpoints",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`An API resource entry in the Trust Framework directory tells TPPs:`);
            } else {
              return [
                createTextVNode("An API resource entry in the Trust Framework directory tells TPPs:")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-e716f0e0${_scopeId2}><strong data-v-e716f0e0${_scopeId2}>Which API family</strong> you support (e.g. banking data sharing, payment initiation)</li><li data-v-e716f0e0${_scopeId2}><strong data-v-e716f0e0${_scopeId2}>Where to send requests</strong> (the base URL for that API on your infrastructure)</li><li data-v-e716f0e0${_scopeId2}><strong data-v-e716f0e0${_scopeId2}>Which scopes are applicable</strong> for that API family</li>`);
            } else {
              return [
                createVNode("li", null, [
                  createVNode("strong", null, "Which API family"),
                  createTextVNode(" you support (e.g. banking data sharing, payment initiation)")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "Where to send requests"),
                  createTextVNode(" (the base URL for that API on your infrastructure)")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "Which scopes are applicable"),
                  createTextVNode(" for that API family")
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` When a TPP dynamically registers with your authorisation server, it uses the API resource entries to understand which scopes to request and which base URL to call. `);
            } else {
              return [
                createTextVNode(" When a TPP dynamically registers with your authorisation server, it uses the API resource entries to understand which scopes to request and which base URL to call. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode("An API resource entry in the Trust Framework directory tells TPPs:")
            ]),
            _: 1
          }),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, [
                createVNode("strong", null, "Which API family"),
                createTextVNode(" you support (e.g. banking data sharing, payment initiation)")
              ]),
              createVNode("li", null, [
                createVNode("strong", null, "Where to send requests"),
                createTextVNode(" (the base URL for that API on your infrastructure)")
              ]),
              createVNode("li", null, [
                createVNode("strong", null, "Which scopes are applicable"),
                createTextVNode(" for that API family")
              ])
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" When a TPP dynamically registers with your authorisation server, it uses the API resource entries to understand which scopes to request and which base URL to call. ")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "api-families",
    num: "02",
    color: "var(--at-gold)",
    eyebrow: "API Families",
    title: "Grouped sets of endpoints exposed by the API Hub",
    tone: "surface"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` The Open Finance UAE ecosystem organises APIs into <strong data-v-e716f0e0${_scopeId2}>API families</strong>. Each family groups a set of related endpoints that the <strong data-v-e716f0e0${_scopeId2}>API Hub exposes to TPPs</strong>. The Base URL for these TPP-facing endpoints is always your API Hub resource server: `);
            } else {
              return [
                createTextVNode(" The Open Finance UAE ecosystem organises APIs into "),
                createVNode("strong", null, "API families"),
                createTextVNode(". Each family groups a set of related endpoints that the "),
                createVNode("strong", null, "API Hub exposes to TPPs"),
                createTextVNode(". The Base URL for these TPP-facing endpoints is always your API Hub resource server: ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdRefTable, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<table data-v-e716f0e0${_scopeId2}><thead data-v-e716f0e0${_scopeId2}><tr data-v-e716f0e0${_scopeId2}><th data-v-e716f0e0${_scopeId2}>Environment</th><th data-v-e716f0e0${_scopeId2}>Base URL</th></tr></thead><tbody data-v-e716f0e0${_scopeId2}><tr data-v-e716f0e0${_scopeId2}><td data-v-e716f0e0${_scopeId2}>Pre-production</td><td data-v-e716f0e0${_scopeId2}><code data-v-e716f0e0${_scopeId2}>https://rs1.{lfiCode}.preprod.apihub.openfinance.ae</code></td></tr><tr data-v-e716f0e0${_scopeId2}><td data-v-e716f0e0${_scopeId2}>Production</td><td data-v-e716f0e0${_scopeId2}><code data-v-e716f0e0${_scopeId2}>https://rs1.{lfiCode}.apihub.openfinance.ae</code></td></tr></tbody></table>`);
            } else {
              return [
                createVNode("table", null, [
                  createVNode("thead", null, [
                    createVNode("tr", null, [
                      createVNode("th", null, "Environment"),
                      createVNode("th", null, "Base URL")
                    ])
                  ]),
                  createVNode("tbody", null, [
                    createVNode("tr", null, [
                      createVNode("td", null, "Pre-production"),
                      createVNode("td", null, [
                        createVNode("code", null, "https://rs1.{lfiCode}.preprod.apihub.openfinance.ae")
                      ])
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "Production"),
                      createVNode("td", null, [
                        createVNode("code", null, "https://rs1.{lfiCode}.apihub.openfinance.ae")
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
              _push3(` When a TPP calls one of these endpoints, the API Hub validates the request and routes it to the corresponding endpoint on your <strong data-v-e716f0e0${_scopeId2}>Ozone Connect</strong> implementation. The tables below show each TPP-facing API resource and the Ozone Connect endpoint it maps to. `);
            } else {
              return [
                createTextVNode(" When a TPP calls one of these endpoints, the API Hub validates the request and routes it to the corresponding endpoint on your "),
                createVNode("strong", null, "Ozone Connect"),
                createTextVNode(" implementation. The tables below show each TPP-facing API resource and the Ozone Connect endpoint it maps to. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` The structure and schema of all available API families can be retrieved from the Trust Framework via <a href="/tech/lfi-api-hub/trust-framework/api/api-families" class="endpoint" data-v-e716f0e0${_scopeId2}><span class="http-method http-method--get" data-v-e716f0e0${_scopeId2}>GET</span><code data-v-e716f0e0${_scopeId2}>/references/apifamilies</code></a> — this returns the family definitions, including their endpoint patterns and metadata schemas. `);
            } else {
              return [
                createTextVNode(" The structure and schema of all available API families can be retrieved from the Trust Framework via "),
                createVNode("a", {
                  href: "/tech/lfi-api-hub/trust-framework/api/api-families",
                  class: "endpoint"
                }, [
                  createVNode("span", { class: "http-method http-method--get" }, "GET"),
                  createVNode("code", null, "/references/apifamilies")
                ]),
                createTextVNode(" — this returns the family definitions, including their endpoint patterns and metadata schemas. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdNote, {
          type: "info",
          title: "Publishing to production"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<p data-v-e716f0e0${_scopeId2}> An LFI can only publish API resources to the <strong data-v-e716f0e0${_scopeId2}>production</strong> Trust Framework once they have completed <a href="/tech/lfi-api-hub/production/testing-certification/functional/bank-data-sharing" data-v-e716f0e0${_scopeId2}>Functional Certification</a>. API resources MAY be published to the <strong data-v-e716f0e0${_scopeId2}>sandbox</strong> Trust Framework at any time for development and testing. </p>`);
            } else {
              return [
                createVNode("p", null, [
                  createTextVNode(" An LFI can only publish API resources to the "),
                  createVNode("strong", null, "production"),
                  createTextVNode(" Trust Framework once they have completed "),
                  createVNode("a", { href: "/tech/lfi-api-hub/production/testing-certification/functional/bank-data-sharing" }, "Functional Certification"),
                  createTextVNode(". API resources MAY be published to the "),
                  createVNode("strong", null, "sandbox"),
                  createTextVNode(" Trust Framework at any time for development and testing. ")
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdNote, {
          type: "tip",
          title: "API Hub default endpoints"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<p data-v-e716f0e0${_scopeId2}> Endpoints marked <strong data-v-e716f0e0${_scopeId2}>API Hub default</strong> are delivered entirely by the API Hub — the LFI does not need to implement them in Ozone Connect. These endpoints MUST always be included when publishing the API family. </p>`);
            } else {
              return [
                createVNode("p", null, [
                  createTextVNode(" Endpoints marked "),
                  createVNode("strong", null, "API Hub default"),
                  createTextVNode(" are delivered entirely by the API Hub — the LFI does not need to implement them in Ozone Connect. These endpoints MUST always be included when publishing the API family. ")
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`The following families are available in version <strong data-v-e716f0e0${_scopeId2}>2.1</strong>.`);
            } else {
              return [
                createTextVNode("The following families are available in version "),
                createVNode("strong", null, "2.1"),
                createTextVNode(".")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" The Open Finance UAE ecosystem organises APIs into "),
              createVNode("strong", null, "API families"),
              createTextVNode(". Each family groups a set of related endpoints that the "),
              createVNode("strong", null, "API Hub exposes to TPPs"),
              createTextVNode(". The Base URL for these TPP-facing endpoints is always your API Hub resource server: ")
            ]),
            _: 1
          }),
          createVNode(_component_EdRefTable, null, {
            default: withCtx(() => [
              createVNode("table", null, [
                createVNode("thead", null, [
                  createVNode("tr", null, [
                    createVNode("th", null, "Environment"),
                    createVNode("th", null, "Base URL")
                  ])
                ]),
                createVNode("tbody", null, [
                  createVNode("tr", null, [
                    createVNode("td", null, "Pre-production"),
                    createVNode("td", null, [
                      createVNode("code", null, "https://rs1.{lfiCode}.preprod.apihub.openfinance.ae")
                    ])
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, "Production"),
                    createVNode("td", null, [
                      createVNode("code", null, "https://rs1.{lfiCode}.apihub.openfinance.ae")
                    ])
                  ])
                ])
              ])
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" When a TPP calls one of these endpoints, the API Hub validates the request and routes it to the corresponding endpoint on your "),
              createVNode("strong", null, "Ozone Connect"),
              createTextVNode(" implementation. The tables below show each TPP-facing API resource and the Ozone Connect endpoint it maps to. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" The structure and schema of all available API families can be retrieved from the Trust Framework via "),
              createVNode("a", {
                href: "/tech/lfi-api-hub/trust-framework/api/api-families",
                class: "endpoint"
              }, [
                createVNode("span", { class: "http-method http-method--get" }, "GET"),
                createVNode("code", null, "/references/apifamilies")
              ]),
              createTextVNode(" — this returns the family definitions, including their endpoint patterns and metadata schemas. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdNote, {
            type: "info",
            title: "Publishing to production"
          }, {
            default: withCtx(() => [
              createVNode("p", null, [
                createTextVNode(" An LFI can only publish API resources to the "),
                createVNode("strong", null, "production"),
                createTextVNode(" Trust Framework once they have completed "),
                createVNode("a", { href: "/tech/lfi-api-hub/production/testing-certification/functional/bank-data-sharing" }, "Functional Certification"),
                createTextVNode(". API resources MAY be published to the "),
                createVNode("strong", null, "sandbox"),
                createTextVNode(" Trust Framework at any time for development and testing. ")
              ])
            ]),
            _: 1
          }),
          createVNode(_component_EdNote, {
            type: "tip",
            title: "API Hub default endpoints"
          }, {
            default: withCtx(() => [
              createVNode("p", null, [
                createTextVNode(" Endpoints marked "),
                createVNode("strong", null, "API Hub default"),
                createTextVNode(" are delivered entirely by the API Hub — the LFI does not need to implement them in Ozone Connect. These endpoints MUST always be included when publishing the API family. ")
              ])
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode("The following families are available in version "),
              createVNode("strong", null, "2.1"),
              createTextVNode(".")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "account-information",
    num: "03",
    color: "var(--at-blue-deep, #1d4ed8)",
    eyebrow: "Account Information",
    title: "account-information",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Banking data sharing — account information, balances, transactions, beneficiaries, and related sub-resources. `);
            } else {
              return [
                createTextVNode(" Banking data sharing — account information, balances, transactions, beneficiaries, and related sub-resources. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdRefTable, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<table data-v-e716f0e0${_scopeId2}><thead data-v-e716f0e0${_scopeId2}><tr data-v-e716f0e0${_scopeId2}><th data-v-e716f0e0${_scopeId2}>API Resource (TPP-facing)</th><th data-v-e716f0e0${_scopeId2}>Ozone Connect Endpoint</th></tr></thead><tbody data-v-e716f0e0${_scopeId2}><tr data-v-e716f0e0${_scopeId2}><td data-v-e716f0e0${_scopeId2}><a href="/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts" class="endpoint" data-v-e716f0e0${_scopeId2}><span class="http-method http-method--get" data-v-e716f0e0${_scopeId2}>GET</span><code data-v-e716f0e0${_scopeId2}>/accounts</code></a></td><td data-v-e716f0e0${_scopeId2}><a href="/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts" class="endpoint" data-v-e716f0e0${_scopeId2}><span class="http-method http-method--get" data-v-e716f0e0${_scopeId2}>GET</span><code data-v-e716f0e0${_scopeId2}>/accounts</code></a></td></tr><tr data-v-e716f0e0${_scopeId2}><td data-v-e716f0e0${_scopeId2}><a href="/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId" class="endpoint" data-v-e716f0e0${_scopeId2}><span class="http-method http-method--get" data-v-e716f0e0${_scopeId2}>GET</span><code data-v-e716f0e0${_scopeId2}>/accounts/{AccountId}</code></a></td><td data-v-e716f0e0${_scopeId2}><a href="/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId" class="endpoint" data-v-e716f0e0${_scopeId2}><span class="http-method http-method--get" data-v-e716f0e0${_scopeId2}>GET</span><code data-v-e716f0e0${_scopeId2}>/accounts/{accountId}</code></a></td></tr><tr data-v-e716f0e0${_scopeId2}><td data-v-e716f0e0${_scopeId2}><a href="/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-balances" class="endpoint" data-v-e716f0e0${_scopeId2}><span class="http-method http-method--get" data-v-e716f0e0${_scopeId2}>GET</span><code data-v-e716f0e0${_scopeId2}>/accounts/{AccountId}/balances</code></a></td><td data-v-e716f0e0${_scopeId2}><a href="/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-balances" class="endpoint" data-v-e716f0e0${_scopeId2}><span class="http-method http-method--get" data-v-e716f0e0${_scopeId2}>GET</span><code data-v-e716f0e0${_scopeId2}>/accounts/{accountId}/balances</code></a></td></tr><tr data-v-e716f0e0${_scopeId2}><td data-v-e716f0e0${_scopeId2}><a href="/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-transactions" class="endpoint" data-v-e716f0e0${_scopeId2}><span class="http-method http-method--get" data-v-e716f0e0${_scopeId2}>GET</span><code data-v-e716f0e0${_scopeId2}>/accounts/{AccountId}/transactions</code></a></td><td data-v-e716f0e0${_scopeId2}><a href="/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-transactions" class="endpoint" data-v-e716f0e0${_scopeId2}><span class="http-method http-method--get" data-v-e716f0e0${_scopeId2}>GET</span><code data-v-e716f0e0${_scopeId2}>/accounts/{accountId}/transactions</code></a></td></tr><tr data-v-e716f0e0${_scopeId2}><td data-v-e716f0e0${_scopeId2}><a href="/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-beneficiaries" class="endpoint" data-v-e716f0e0${_scopeId2}><span class="http-method http-method--get" data-v-e716f0e0${_scopeId2}>GET</span><code data-v-e716f0e0${_scopeId2}>/accounts/{AccountId}/beneficiaries</code></a></td><td data-v-e716f0e0${_scopeId2}><a href="/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-beneficiaries" class="endpoint" data-v-e716f0e0${_scopeId2}><span class="http-method http-method--get" data-v-e716f0e0${_scopeId2}>GET</span><code data-v-e716f0e0${_scopeId2}>/accounts/{accountId}/beneficiaries</code></a></td></tr><tr data-v-e716f0e0${_scopeId2}><td data-v-e716f0e0${_scopeId2}><a href="/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-direct-debits" class="endpoint" data-v-e716f0e0${_scopeId2}><span class="http-method http-method--get" data-v-e716f0e0${_scopeId2}>GET</span><code data-v-e716f0e0${_scopeId2}>/accounts/{AccountId}/direct-debits</code></a></td><td data-v-e716f0e0${_scopeId2}><a href="/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-direct-debits" class="endpoint" data-v-e716f0e0${_scopeId2}><span class="http-method http-method--get" data-v-e716f0e0${_scopeId2}>GET</span><code data-v-e716f0e0${_scopeId2}>/accounts/{accountId}/direct-debits</code></a></td></tr><tr data-v-e716f0e0${_scopeId2}><td data-v-e716f0e0${_scopeId2}><a href="/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-standing-orders" class="endpoint" data-v-e716f0e0${_scopeId2}><span class="http-method http-method--get" data-v-e716f0e0${_scopeId2}>GET</span><code data-v-e716f0e0${_scopeId2}>/accounts/{AccountId}/standing-orders</code></a></td><td data-v-e716f0e0${_scopeId2}><a href="/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-standing-orders" class="endpoint" data-v-e716f0e0${_scopeId2}><span class="http-method http-method--get" data-v-e716f0e0${_scopeId2}>GET</span><code data-v-e716f0e0${_scopeId2}>/accounts/{accountId}/standing-orders</code></a></td></tr><tr data-v-e716f0e0${_scopeId2}><td data-v-e716f0e0${_scopeId2}><a href="/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-scheduled-payments" class="endpoint" data-v-e716f0e0${_scopeId2}><span class="http-method http-method--get" data-v-e716f0e0${_scopeId2}>GET</span><code data-v-e716f0e0${_scopeId2}>/accounts/{AccountId}/scheduled-payments</code></a></td><td data-v-e716f0e0${_scopeId2}><a href="/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-scheduled-payments" class="endpoint" data-v-e716f0e0${_scopeId2}><span class="http-method http-method--get" data-v-e716f0e0${_scopeId2}>GET</span><code data-v-e716f0e0${_scopeId2}>/accounts/{accountId}/scheduled-payments</code></a></td></tr><tr data-v-e716f0e0${_scopeId2}><td data-v-e716f0e0${_scopeId2}><a href="/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-statements" class="endpoint" data-v-e716f0e0${_scopeId2}><span class="http-method http-method--get" data-v-e716f0e0${_scopeId2}>GET</span><code data-v-e716f0e0${_scopeId2}>/accounts/{AccountId}/statements</code></a></td><td data-v-e716f0e0${_scopeId2}><a href="/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-statements" class="endpoint" data-v-e716f0e0${_scopeId2}><span class="http-method http-method--get" data-v-e716f0e0${_scopeId2}>GET</span><code data-v-e716f0e0${_scopeId2}>/accounts/{accountId}/statements</code></a></td></tr><tr data-v-e716f0e0${_scopeId2}><td data-v-e716f0e0${_scopeId2}><a href="/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-product" class="endpoint" data-v-e716f0e0${_scopeId2}><span class="http-method http-method--get" data-v-e716f0e0${_scopeId2}>GET</span><code data-v-e716f0e0${_scopeId2}>/accounts/{AccountId}/product</code></a></td><td data-v-e716f0e0${_scopeId2}><a href="/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-products" class="endpoint" data-v-e716f0e0${_scopeId2}><span class="http-method http-method--get" data-v-e716f0e0${_scopeId2}>GET</span><code data-v-e716f0e0${_scopeId2}>/accounts/{accountId}/products</code></a></td></tr><tr data-v-e716f0e0${_scopeId2}><td data-v-e716f0e0${_scopeId2}><a href="/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-parties" class="endpoint" data-v-e716f0e0${_scopeId2}><span class="http-method http-method--get" data-v-e716f0e0${_scopeId2}>GET</span><code data-v-e716f0e0${_scopeId2}>/accounts/{AccountId}/parties</code></a></td><td data-v-e716f0e0${_scopeId2}><a href="/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-customer" class="endpoint" data-v-e716f0e0${_scopeId2}><span class="http-method http-method--get" data-v-e716f0e0${_scopeId2}>GET</span><code data-v-e716f0e0${_scopeId2}>/accounts/{accountId}/customer</code></a></td></tr><tr data-v-e716f0e0${_scopeId2}><td data-v-e716f0e0${_scopeId2}><a href="/tech/tpp-standards/v2.1/banking/data-sharing/open-api/parties" class="endpoint" data-v-e716f0e0${_scopeId2}><span class="http-method http-method--get" data-v-e716f0e0${_scopeId2}>GET</span><code data-v-e716f0e0${_scopeId2}>/parties</code></a></td><td data-v-e716f0e0${_scopeId2}><a href="/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/customer" class="endpoint" data-v-e716f0e0${_scopeId2}><span class="http-method http-method--get" data-v-e716f0e0${_scopeId2}>GET</span><code data-v-e716f0e0${_scopeId2}>/customer</code></a></td></tr><tr data-v-e716f0e0${_scopeId2}><td data-v-e716f0e0${_scopeId2}><a href="/tech/tpp-standards/v2.1/consent/open-api/account-access-consents" class="endpoint" data-v-e716f0e0${_scopeId2}><span class="http-method http-method--get" data-v-e716f0e0${_scopeId2}>GET</span><code data-v-e716f0e0${_scopeId2}>/account-access-consents</code></a></td><td data-v-e716f0e0${_scopeId2}><strong data-v-e716f0e0${_scopeId2}>API Hub default</strong></td></tr><tr data-v-e716f0e0${_scopeId2}><td data-v-e716f0e0${_scopeId2}><a href="/tech/tpp-standards/v2.1/consent/open-api/account-access-consents-ConsentId" class="endpoint" data-v-e716f0e0${_scopeId2}><span class="http-method http-method--get" data-v-e716f0e0${_scopeId2}>GET</span><code data-v-e716f0e0${_scopeId2}>/account-access-consents/{ConsentId}</code></a></td><td data-v-e716f0e0${_scopeId2}><strong data-v-e716f0e0${_scopeId2}>API Hub default</strong></td></tr></tbody></table>`);
            } else {
              return [
                createVNode("table", null, [
                  createVNode("thead", null, [
                    createVNode("tr", null, [
                      createVNode("th", null, "API Resource (TPP-facing)"),
                      createVNode("th", null, "Ozone Connect Endpoint")
                    ])
                  ]),
                  createVNode("tbody", null, [
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("a", {
                          href: "/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts",
                          class: "endpoint"
                        }, [
                          createVNode("span", { class: "http-method http-method--get" }, "GET"),
                          createVNode("code", null, "/accounts")
                        ])
                      ]),
                      createVNode("td", null, [
                        createVNode("a", {
                          href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts",
                          class: "endpoint"
                        }, [
                          createVNode("span", { class: "http-method http-method--get" }, "GET"),
                          createVNode("code", null, "/accounts")
                        ])
                      ])
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("a", {
                          href: "/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId",
                          class: "endpoint"
                        }, [
                          createVNode("span", { class: "http-method http-method--get" }, "GET"),
                          createVNode("code", null, "/accounts/{AccountId}")
                        ])
                      ]),
                      createVNode("td", null, [
                        createVNode("a", {
                          href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId",
                          class: "endpoint"
                        }, [
                          createVNode("span", { class: "http-method http-method--get" }, "GET"),
                          createVNode("code", null, "/accounts/{accountId}")
                        ])
                      ])
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("a", {
                          href: "/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-balances",
                          class: "endpoint"
                        }, [
                          createVNode("span", { class: "http-method http-method--get" }, "GET"),
                          createVNode("code", null, "/accounts/{AccountId}/balances")
                        ])
                      ]),
                      createVNode("td", null, [
                        createVNode("a", {
                          href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-balances",
                          class: "endpoint"
                        }, [
                          createVNode("span", { class: "http-method http-method--get" }, "GET"),
                          createVNode("code", null, "/accounts/{accountId}/balances")
                        ])
                      ])
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("a", {
                          href: "/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-transactions",
                          class: "endpoint"
                        }, [
                          createVNode("span", { class: "http-method http-method--get" }, "GET"),
                          createVNode("code", null, "/accounts/{AccountId}/transactions")
                        ])
                      ]),
                      createVNode("td", null, [
                        createVNode("a", {
                          href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-transactions",
                          class: "endpoint"
                        }, [
                          createVNode("span", { class: "http-method http-method--get" }, "GET"),
                          createVNode("code", null, "/accounts/{accountId}/transactions")
                        ])
                      ])
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("a", {
                          href: "/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-beneficiaries",
                          class: "endpoint"
                        }, [
                          createVNode("span", { class: "http-method http-method--get" }, "GET"),
                          createVNode("code", null, "/accounts/{AccountId}/beneficiaries")
                        ])
                      ]),
                      createVNode("td", null, [
                        createVNode("a", {
                          href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-beneficiaries",
                          class: "endpoint"
                        }, [
                          createVNode("span", { class: "http-method http-method--get" }, "GET"),
                          createVNode("code", null, "/accounts/{accountId}/beneficiaries")
                        ])
                      ])
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("a", {
                          href: "/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-direct-debits",
                          class: "endpoint"
                        }, [
                          createVNode("span", { class: "http-method http-method--get" }, "GET"),
                          createVNode("code", null, "/accounts/{AccountId}/direct-debits")
                        ])
                      ]),
                      createVNode("td", null, [
                        createVNode("a", {
                          href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-direct-debits",
                          class: "endpoint"
                        }, [
                          createVNode("span", { class: "http-method http-method--get" }, "GET"),
                          createVNode("code", null, "/accounts/{accountId}/direct-debits")
                        ])
                      ])
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("a", {
                          href: "/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-standing-orders",
                          class: "endpoint"
                        }, [
                          createVNode("span", { class: "http-method http-method--get" }, "GET"),
                          createVNode("code", null, "/accounts/{AccountId}/standing-orders")
                        ])
                      ]),
                      createVNode("td", null, [
                        createVNode("a", {
                          href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-standing-orders",
                          class: "endpoint"
                        }, [
                          createVNode("span", { class: "http-method http-method--get" }, "GET"),
                          createVNode("code", null, "/accounts/{accountId}/standing-orders")
                        ])
                      ])
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("a", {
                          href: "/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-scheduled-payments",
                          class: "endpoint"
                        }, [
                          createVNode("span", { class: "http-method http-method--get" }, "GET"),
                          createVNode("code", null, "/accounts/{AccountId}/scheduled-payments")
                        ])
                      ]),
                      createVNode("td", null, [
                        createVNode("a", {
                          href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-scheduled-payments",
                          class: "endpoint"
                        }, [
                          createVNode("span", { class: "http-method http-method--get" }, "GET"),
                          createVNode("code", null, "/accounts/{accountId}/scheduled-payments")
                        ])
                      ])
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("a", {
                          href: "/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-statements",
                          class: "endpoint"
                        }, [
                          createVNode("span", { class: "http-method http-method--get" }, "GET"),
                          createVNode("code", null, "/accounts/{AccountId}/statements")
                        ])
                      ]),
                      createVNode("td", null, [
                        createVNode("a", {
                          href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-statements",
                          class: "endpoint"
                        }, [
                          createVNode("span", { class: "http-method http-method--get" }, "GET"),
                          createVNode("code", null, "/accounts/{accountId}/statements")
                        ])
                      ])
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("a", {
                          href: "/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-product",
                          class: "endpoint"
                        }, [
                          createVNode("span", { class: "http-method http-method--get" }, "GET"),
                          createVNode("code", null, "/accounts/{AccountId}/product")
                        ])
                      ]),
                      createVNode("td", null, [
                        createVNode("a", {
                          href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-products",
                          class: "endpoint"
                        }, [
                          createVNode("span", { class: "http-method http-method--get" }, "GET"),
                          createVNode("code", null, "/accounts/{accountId}/products")
                        ])
                      ])
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("a", {
                          href: "/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-parties",
                          class: "endpoint"
                        }, [
                          createVNode("span", { class: "http-method http-method--get" }, "GET"),
                          createVNode("code", null, "/accounts/{AccountId}/parties")
                        ])
                      ]),
                      createVNode("td", null, [
                        createVNode("a", {
                          href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-customer",
                          class: "endpoint"
                        }, [
                          createVNode("span", { class: "http-method http-method--get" }, "GET"),
                          createVNode("code", null, "/accounts/{accountId}/customer")
                        ])
                      ])
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("a", {
                          href: "/tech/tpp-standards/v2.1/banking/data-sharing/open-api/parties",
                          class: "endpoint"
                        }, [
                          createVNode("span", { class: "http-method http-method--get" }, "GET"),
                          createVNode("code", null, "/parties")
                        ])
                      ]),
                      createVNode("td", null, [
                        createVNode("a", {
                          href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/customer",
                          class: "endpoint"
                        }, [
                          createVNode("span", { class: "http-method http-method--get" }, "GET"),
                          createVNode("code", null, "/customer")
                        ])
                      ])
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("a", {
                          href: "/tech/tpp-standards/v2.1/consent/open-api/account-access-consents",
                          class: "endpoint"
                        }, [
                          createVNode("span", { class: "http-method http-method--get" }, "GET"),
                          createVNode("code", null, "/account-access-consents")
                        ])
                      ]),
                      createVNode("td", null, [
                        createVNode("strong", null, "API Hub default")
                      ])
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("a", {
                          href: "/tech/tpp-standards/v2.1/consent/open-api/account-access-consents-ConsentId",
                          class: "endpoint"
                        }, [
                          createVNode("span", { class: "http-method http-method--get" }, "GET"),
                          createVNode("code", null, "/account-access-consents/{ConsentId}")
                        ])
                      ]),
                      createVNode("td", null, [
                        createVNode("strong", null, "API Hub default")
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
              createTextVNode(" Banking data sharing — account information, balances, transactions, beneficiaries, and related sub-resources. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdRefTable, null, {
            default: withCtx(() => [
              createVNode("table", null, [
                createVNode("thead", null, [
                  createVNode("tr", null, [
                    createVNode("th", null, "API Resource (TPP-facing)"),
                    createVNode("th", null, "Ozone Connect Endpoint")
                  ])
                ]),
                createVNode("tbody", null, [
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("a", {
                        href: "/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts",
                        class: "endpoint"
                      }, [
                        createVNode("span", { class: "http-method http-method--get" }, "GET"),
                        createVNode("code", null, "/accounts")
                      ])
                    ]),
                    createVNode("td", null, [
                      createVNode("a", {
                        href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts",
                        class: "endpoint"
                      }, [
                        createVNode("span", { class: "http-method http-method--get" }, "GET"),
                        createVNode("code", null, "/accounts")
                      ])
                    ])
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("a", {
                        href: "/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId",
                        class: "endpoint"
                      }, [
                        createVNode("span", { class: "http-method http-method--get" }, "GET"),
                        createVNode("code", null, "/accounts/{AccountId}")
                      ])
                    ]),
                    createVNode("td", null, [
                      createVNode("a", {
                        href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId",
                        class: "endpoint"
                      }, [
                        createVNode("span", { class: "http-method http-method--get" }, "GET"),
                        createVNode("code", null, "/accounts/{accountId}")
                      ])
                    ])
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("a", {
                        href: "/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-balances",
                        class: "endpoint"
                      }, [
                        createVNode("span", { class: "http-method http-method--get" }, "GET"),
                        createVNode("code", null, "/accounts/{AccountId}/balances")
                      ])
                    ]),
                    createVNode("td", null, [
                      createVNode("a", {
                        href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-balances",
                        class: "endpoint"
                      }, [
                        createVNode("span", { class: "http-method http-method--get" }, "GET"),
                        createVNode("code", null, "/accounts/{accountId}/balances")
                      ])
                    ])
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("a", {
                        href: "/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-transactions",
                        class: "endpoint"
                      }, [
                        createVNode("span", { class: "http-method http-method--get" }, "GET"),
                        createVNode("code", null, "/accounts/{AccountId}/transactions")
                      ])
                    ]),
                    createVNode("td", null, [
                      createVNode("a", {
                        href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-transactions",
                        class: "endpoint"
                      }, [
                        createVNode("span", { class: "http-method http-method--get" }, "GET"),
                        createVNode("code", null, "/accounts/{accountId}/transactions")
                      ])
                    ])
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("a", {
                        href: "/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-beneficiaries",
                        class: "endpoint"
                      }, [
                        createVNode("span", { class: "http-method http-method--get" }, "GET"),
                        createVNode("code", null, "/accounts/{AccountId}/beneficiaries")
                      ])
                    ]),
                    createVNode("td", null, [
                      createVNode("a", {
                        href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-beneficiaries",
                        class: "endpoint"
                      }, [
                        createVNode("span", { class: "http-method http-method--get" }, "GET"),
                        createVNode("code", null, "/accounts/{accountId}/beneficiaries")
                      ])
                    ])
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("a", {
                        href: "/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-direct-debits",
                        class: "endpoint"
                      }, [
                        createVNode("span", { class: "http-method http-method--get" }, "GET"),
                        createVNode("code", null, "/accounts/{AccountId}/direct-debits")
                      ])
                    ]),
                    createVNode("td", null, [
                      createVNode("a", {
                        href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-direct-debits",
                        class: "endpoint"
                      }, [
                        createVNode("span", { class: "http-method http-method--get" }, "GET"),
                        createVNode("code", null, "/accounts/{accountId}/direct-debits")
                      ])
                    ])
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("a", {
                        href: "/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-standing-orders",
                        class: "endpoint"
                      }, [
                        createVNode("span", { class: "http-method http-method--get" }, "GET"),
                        createVNode("code", null, "/accounts/{AccountId}/standing-orders")
                      ])
                    ]),
                    createVNode("td", null, [
                      createVNode("a", {
                        href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-standing-orders",
                        class: "endpoint"
                      }, [
                        createVNode("span", { class: "http-method http-method--get" }, "GET"),
                        createVNode("code", null, "/accounts/{accountId}/standing-orders")
                      ])
                    ])
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("a", {
                        href: "/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-scheduled-payments",
                        class: "endpoint"
                      }, [
                        createVNode("span", { class: "http-method http-method--get" }, "GET"),
                        createVNode("code", null, "/accounts/{AccountId}/scheduled-payments")
                      ])
                    ]),
                    createVNode("td", null, [
                      createVNode("a", {
                        href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-scheduled-payments",
                        class: "endpoint"
                      }, [
                        createVNode("span", { class: "http-method http-method--get" }, "GET"),
                        createVNode("code", null, "/accounts/{accountId}/scheduled-payments")
                      ])
                    ])
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("a", {
                        href: "/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-statements",
                        class: "endpoint"
                      }, [
                        createVNode("span", { class: "http-method http-method--get" }, "GET"),
                        createVNode("code", null, "/accounts/{AccountId}/statements")
                      ])
                    ]),
                    createVNode("td", null, [
                      createVNode("a", {
                        href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-statements",
                        class: "endpoint"
                      }, [
                        createVNode("span", { class: "http-method http-method--get" }, "GET"),
                        createVNode("code", null, "/accounts/{accountId}/statements")
                      ])
                    ])
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("a", {
                        href: "/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-product",
                        class: "endpoint"
                      }, [
                        createVNode("span", { class: "http-method http-method--get" }, "GET"),
                        createVNode("code", null, "/accounts/{AccountId}/product")
                      ])
                    ]),
                    createVNode("td", null, [
                      createVNode("a", {
                        href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-products",
                        class: "endpoint"
                      }, [
                        createVNode("span", { class: "http-method http-method--get" }, "GET"),
                        createVNode("code", null, "/accounts/{accountId}/products")
                      ])
                    ])
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("a", {
                        href: "/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-parties",
                        class: "endpoint"
                      }, [
                        createVNode("span", { class: "http-method http-method--get" }, "GET"),
                        createVNode("code", null, "/accounts/{AccountId}/parties")
                      ])
                    ]),
                    createVNode("td", null, [
                      createVNode("a", {
                        href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-customer",
                        class: "endpoint"
                      }, [
                        createVNode("span", { class: "http-method http-method--get" }, "GET"),
                        createVNode("code", null, "/accounts/{accountId}/customer")
                      ])
                    ])
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("a", {
                        href: "/tech/tpp-standards/v2.1/banking/data-sharing/open-api/parties",
                        class: "endpoint"
                      }, [
                        createVNode("span", { class: "http-method http-method--get" }, "GET"),
                        createVNode("code", null, "/parties")
                      ])
                    ]),
                    createVNode("td", null, [
                      createVNode("a", {
                        href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/customer",
                        class: "endpoint"
                      }, [
                        createVNode("span", { class: "http-method http-method--get" }, "GET"),
                        createVNode("code", null, "/customer")
                      ])
                    ])
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("a", {
                        href: "/tech/tpp-standards/v2.1/consent/open-api/account-access-consents",
                        class: "endpoint"
                      }, [
                        createVNode("span", { class: "http-method http-method--get" }, "GET"),
                        createVNode("code", null, "/account-access-consents")
                      ])
                    ]),
                    createVNode("td", null, [
                      createVNode("strong", null, "API Hub default")
                    ])
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("a", {
                        href: "/tech/tpp-standards/v2.1/consent/open-api/account-access-consents-ConsentId",
                        class: "endpoint"
                      }, [
                        createVNode("span", { class: "http-method http-method--get" }, "GET"),
                        createVNode("code", null, "/account-access-consents/{ConsentId}")
                      ])
                    ]),
                    createVNode("td", null, [
                      createVNode("strong", null, "API Hub default")
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
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "payment",
    num: "04",
    color: "var(--at-navy)",
    eyebrow: "Payment Initiation",
    title: "payment",
    tone: "surface"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`Payment initiation — domestic single payments and multi-payments.`);
            } else {
              return [
                createTextVNode("Payment initiation — domestic single payments and multi-payments.")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdRefTable, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<table data-v-e716f0e0${_scopeId2}><thead data-v-e716f0e0${_scopeId2}><tr data-v-e716f0e0${_scopeId2}><th data-v-e716f0e0${_scopeId2}>API Resource (TPP-facing)</th><th data-v-e716f0e0${_scopeId2}>Ozone Connect Endpoint</th></tr></thead><tbody data-v-e716f0e0${_scopeId2}><tr data-v-e716f0e0${_scopeId2}><td data-v-e716f0e0${_scopeId2}><a href="/tech/tpp-standards/v2.1/banking/service-initiation/open-api/payments" class="endpoint" data-v-e716f0e0${_scopeId2}><span class="http-method http-method--post" data-v-e716f0e0${_scopeId2}>POST</span><code data-v-e716f0e0${_scopeId2}>/payments</code></a></td><td data-v-e716f0e0${_scopeId2}><a href="/tech/lfi-api-hub/v2.1/banking/service-initiation/open-api/payments" class="endpoint" data-v-e716f0e0${_scopeId2}><span class="http-method http-method--post" data-v-e716f0e0${_scopeId2}>POST</span><code data-v-e716f0e0${_scopeId2}>/payments</code></a></td></tr><tr data-v-e716f0e0${_scopeId2}><td data-v-e716f0e0${_scopeId2}><a href="/tech/tpp-standards/v2.1/banking/service-initiation/open-api/payments-PaymentId" class="endpoint" data-v-e716f0e0${_scopeId2}><span class="http-method http-method--get" data-v-e716f0e0${_scopeId2}>GET</span><code data-v-e716f0e0${_scopeId2}>/payments/{PaymentId}</code></a></td><td data-v-e716f0e0${_scopeId2}><a href="/tech/lfi-api-hub/v2.1/banking/service-initiation/open-api/payments-PaymentId" class="endpoint" data-v-e716f0e0${_scopeId2}><span class="http-method http-method--get" data-v-e716f0e0${_scopeId2}>GET</span><code data-v-e716f0e0${_scopeId2}>/payments/{paymentId}</code></a></td></tr><tr data-v-e716f0e0${_scopeId2}><td data-v-e716f0e0${_scopeId2}><a href="/tech/tpp-standards/v2.1/banking/service-initiation/open-api/payment-consents-ConsentId-refund" class="endpoint" data-v-e716f0e0${_scopeId2}><span class="http-method http-method--post" data-v-e716f0e0${_scopeId2}>POST</span><code data-v-e716f0e0${_scopeId2}>/payment-consents/{ConsentId}/refund</code></a></td><td data-v-e716f0e0${_scopeId2}><a href="/tech/lfi-api-hub/v2.1/banking/service-initiation/open-api/payment-consents-ConsentId-refund" class="endpoint" data-v-e716f0e0${_scopeId2}><span class="http-method http-method--post" data-v-e716f0e0${_scopeId2}>POST</span><code data-v-e716f0e0${_scopeId2}>/payment-consents/{consentId}/refund</code></a></td></tr><tr data-v-e716f0e0${_scopeId2}><td data-v-e716f0e0${_scopeId2}><a href="/tech/tpp-standards/v2.1/consent/open-api/payment-consents" class="endpoint" data-v-e716f0e0${_scopeId2}><span class="http-method http-method--get" data-v-e716f0e0${_scopeId2}>GET</span><code data-v-e716f0e0${_scopeId2}>/payment-consents</code></a></td><td data-v-e716f0e0${_scopeId2}><strong data-v-e716f0e0${_scopeId2}>API Hub default</strong></td></tr><tr data-v-e716f0e0${_scopeId2}><td data-v-e716f0e0${_scopeId2}><a href="/tech/tpp-standards/v2.1/consent/open-api/payment-consents-ConsentId" class="endpoint" data-v-e716f0e0${_scopeId2}><span class="http-method http-method--get" data-v-e716f0e0${_scopeId2}>GET</span><code data-v-e716f0e0${_scopeId2}>/payment-consents/{ConsentId}</code></a></td><td data-v-e716f0e0${_scopeId2}><strong data-v-e716f0e0${_scopeId2}>API Hub default</strong></td></tr></tbody></table>`);
            } else {
              return [
                createVNode("table", null, [
                  createVNode("thead", null, [
                    createVNode("tr", null, [
                      createVNode("th", null, "API Resource (TPP-facing)"),
                      createVNode("th", null, "Ozone Connect Endpoint")
                    ])
                  ]),
                  createVNode("tbody", null, [
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("a", {
                          href: "/tech/tpp-standards/v2.1/banking/service-initiation/open-api/payments",
                          class: "endpoint"
                        }, [
                          createVNode("span", { class: "http-method http-method--post" }, "POST"),
                          createVNode("code", null, "/payments")
                        ])
                      ]),
                      createVNode("td", null, [
                        createVNode("a", {
                          href: "/tech/lfi-api-hub/v2.1/banking/service-initiation/open-api/payments",
                          class: "endpoint"
                        }, [
                          createVNode("span", { class: "http-method http-method--post" }, "POST"),
                          createVNode("code", null, "/payments")
                        ])
                      ])
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("a", {
                          href: "/tech/tpp-standards/v2.1/banking/service-initiation/open-api/payments-PaymentId",
                          class: "endpoint"
                        }, [
                          createVNode("span", { class: "http-method http-method--get" }, "GET"),
                          createVNode("code", null, "/payments/{PaymentId}")
                        ])
                      ]),
                      createVNode("td", null, [
                        createVNode("a", {
                          href: "/tech/lfi-api-hub/v2.1/banking/service-initiation/open-api/payments-PaymentId",
                          class: "endpoint"
                        }, [
                          createVNode("span", { class: "http-method http-method--get" }, "GET"),
                          createVNode("code", null, "/payments/{paymentId}")
                        ])
                      ])
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("a", {
                          href: "/tech/tpp-standards/v2.1/banking/service-initiation/open-api/payment-consents-ConsentId-refund",
                          class: "endpoint"
                        }, [
                          createVNode("span", { class: "http-method http-method--post" }, "POST"),
                          createVNode("code", null, "/payment-consents/{ConsentId}/refund")
                        ])
                      ]),
                      createVNode("td", null, [
                        createVNode("a", {
                          href: "/tech/lfi-api-hub/v2.1/banking/service-initiation/open-api/payment-consents-ConsentId-refund",
                          class: "endpoint"
                        }, [
                          createVNode("span", { class: "http-method http-method--post" }, "POST"),
                          createVNode("code", null, "/payment-consents/{consentId}/refund")
                        ])
                      ])
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("a", {
                          href: "/tech/tpp-standards/v2.1/consent/open-api/payment-consents",
                          class: "endpoint"
                        }, [
                          createVNode("span", { class: "http-method http-method--get" }, "GET"),
                          createVNode("code", null, "/payment-consents")
                        ])
                      ]),
                      createVNode("td", null, [
                        createVNode("strong", null, "API Hub default")
                      ])
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("a", {
                          href: "/tech/tpp-standards/v2.1/consent/open-api/payment-consents-ConsentId",
                          class: "endpoint"
                        }, [
                          createVNode("span", { class: "http-method http-method--get" }, "GET"),
                          createVNode("code", null, "/payment-consents/{ConsentId}")
                        ])
                      ]),
                      createVNode("td", null, [
                        createVNode("strong", null, "API Hub default")
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
              createTextVNode("Payment initiation — domestic single payments and multi-payments.")
            ]),
            _: 1
          }),
          createVNode(_component_EdRefTable, null, {
            default: withCtx(() => [
              createVNode("table", null, [
                createVNode("thead", null, [
                  createVNode("tr", null, [
                    createVNode("th", null, "API Resource (TPP-facing)"),
                    createVNode("th", null, "Ozone Connect Endpoint")
                  ])
                ]),
                createVNode("tbody", null, [
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("a", {
                        href: "/tech/tpp-standards/v2.1/banking/service-initiation/open-api/payments",
                        class: "endpoint"
                      }, [
                        createVNode("span", { class: "http-method http-method--post" }, "POST"),
                        createVNode("code", null, "/payments")
                      ])
                    ]),
                    createVNode("td", null, [
                      createVNode("a", {
                        href: "/tech/lfi-api-hub/v2.1/banking/service-initiation/open-api/payments",
                        class: "endpoint"
                      }, [
                        createVNode("span", { class: "http-method http-method--post" }, "POST"),
                        createVNode("code", null, "/payments")
                      ])
                    ])
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("a", {
                        href: "/tech/tpp-standards/v2.1/banking/service-initiation/open-api/payments-PaymentId",
                        class: "endpoint"
                      }, [
                        createVNode("span", { class: "http-method http-method--get" }, "GET"),
                        createVNode("code", null, "/payments/{PaymentId}")
                      ])
                    ]),
                    createVNode("td", null, [
                      createVNode("a", {
                        href: "/tech/lfi-api-hub/v2.1/banking/service-initiation/open-api/payments-PaymentId",
                        class: "endpoint"
                      }, [
                        createVNode("span", { class: "http-method http-method--get" }, "GET"),
                        createVNode("code", null, "/payments/{paymentId}")
                      ])
                    ])
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("a", {
                        href: "/tech/tpp-standards/v2.1/banking/service-initiation/open-api/payment-consents-ConsentId-refund",
                        class: "endpoint"
                      }, [
                        createVNode("span", { class: "http-method http-method--post" }, "POST"),
                        createVNode("code", null, "/payment-consents/{ConsentId}/refund")
                      ])
                    ]),
                    createVNode("td", null, [
                      createVNode("a", {
                        href: "/tech/lfi-api-hub/v2.1/banking/service-initiation/open-api/payment-consents-ConsentId-refund",
                        class: "endpoint"
                      }, [
                        createVNode("span", { class: "http-method http-method--post" }, "POST"),
                        createVNode("code", null, "/payment-consents/{consentId}/refund")
                      ])
                    ])
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("a", {
                        href: "/tech/tpp-standards/v2.1/consent/open-api/payment-consents",
                        class: "endpoint"
                      }, [
                        createVNode("span", { class: "http-method http-method--get" }, "GET"),
                        createVNode("code", null, "/payment-consents")
                      ])
                    ]),
                    createVNode("td", null, [
                      createVNode("strong", null, "API Hub default")
                    ])
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("a", {
                        href: "/tech/tpp-standards/v2.1/consent/open-api/payment-consents-ConsentId",
                        class: "endpoint"
                      }, [
                        createVNode("span", { class: "http-method http-method--get" }, "GET"),
                        createVNode("code", null, "/payment-consents/{ConsentId}")
                      ])
                    ]),
                    createVNode("td", null, [
                      createVNode("strong", null, "API Hub default")
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
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "confirmation",
    num: "05",
    color: "var(--at-teal-deep)",
    eyebrow: "Confirmation of Payee",
    title: "confirmation",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`Confirmation of payee — payee name verification before initiating a payment.`);
            } else {
              return [
                createTextVNode("Confirmation of payee — payee name verification before initiating a payment.")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdRefTable, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<table data-v-e716f0e0${_scopeId2}><thead data-v-e716f0e0${_scopeId2}><tr data-v-e716f0e0${_scopeId2}><th data-v-e716f0e0${_scopeId2}>API Resource (TPP-facing)</th><th data-v-e716f0e0${_scopeId2}>Ozone Connect Endpoint</th></tr></thead><tbody data-v-e716f0e0${_scopeId2}><tr data-v-e716f0e0${_scopeId2}><td data-v-e716f0e0${_scopeId2}><a href="/tech/tpp-standards/v2.1/banking/confirmation-of-payee/open-api/confirmation" class="endpoint" data-v-e716f0e0${_scopeId2}><span class="http-method http-method--post" data-v-e716f0e0${_scopeId2}>POST</span><code data-v-e716f0e0${_scopeId2}>/confirmation</code></a></td><td data-v-e716f0e0${_scopeId2}><a href="/tech/lfi-api-hub/v2.1/banking/confirmation-of-payee/open-api/cop-query" class="endpoint" data-v-e716f0e0${_scopeId2}><span class="http-method http-method--post" data-v-e716f0e0${_scopeId2}>POST</span><code data-v-e716f0e0${_scopeId2}>/customers/action/cop-query</code></a></td></tr><tr data-v-e716f0e0${_scopeId2}><td data-v-e716f0e0${_scopeId2}><a href="/tech/tpp-standards/v2.1/banking/confirmation-of-payee/open-api/discovery" class="endpoint" data-v-e716f0e0${_scopeId2}><span class="http-method http-method--get" data-v-e716f0e0${_scopeId2}>GET</span><code data-v-e716f0e0${_scopeId2}>/discovery</code></a></td><td data-v-e716f0e0${_scopeId2}><strong data-v-e716f0e0${_scopeId2}>API Hub default</strong></td></tr></tbody></table>`);
            } else {
              return [
                createVNode("table", null, [
                  createVNode("thead", null, [
                    createVNode("tr", null, [
                      createVNode("th", null, "API Resource (TPP-facing)"),
                      createVNode("th", null, "Ozone Connect Endpoint")
                    ])
                  ]),
                  createVNode("tbody", null, [
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("a", {
                          href: "/tech/tpp-standards/v2.1/banking/confirmation-of-payee/open-api/confirmation",
                          class: "endpoint"
                        }, [
                          createVNode("span", { class: "http-method http-method--post" }, "POST"),
                          createVNode("code", null, "/confirmation")
                        ])
                      ]),
                      createVNode("td", null, [
                        createVNode("a", {
                          href: "/tech/lfi-api-hub/v2.1/banking/confirmation-of-payee/open-api/cop-query",
                          class: "endpoint"
                        }, [
                          createVNode("span", { class: "http-method http-method--post" }, "POST"),
                          createVNode("code", null, "/customers/action/cop-query")
                        ])
                      ])
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("a", {
                          href: "/tech/tpp-standards/v2.1/banking/confirmation-of-payee/open-api/discovery",
                          class: "endpoint"
                        }, [
                          createVNode("span", { class: "http-method http-method--get" }, "GET"),
                          createVNode("code", null, "/discovery")
                        ])
                      ]),
                      createVNode("td", null, [
                        createVNode("strong", null, "API Hub default")
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
              createTextVNode("Confirmation of payee — payee name verification before initiating a payment.")
            ]),
            _: 1
          }),
          createVNode(_component_EdRefTable, null, {
            default: withCtx(() => [
              createVNode("table", null, [
                createVNode("thead", null, [
                  createVNode("tr", null, [
                    createVNode("th", null, "API Resource (TPP-facing)"),
                    createVNode("th", null, "Ozone Connect Endpoint")
                  ])
                ]),
                createVNode("tbody", null, [
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("a", {
                        href: "/tech/tpp-standards/v2.1/banking/confirmation-of-payee/open-api/confirmation",
                        class: "endpoint"
                      }, [
                        createVNode("span", { class: "http-method http-method--post" }, "POST"),
                        createVNode("code", null, "/confirmation")
                      ])
                    ]),
                    createVNode("td", null, [
                      createVNode("a", {
                        href: "/tech/lfi-api-hub/v2.1/banking/confirmation-of-payee/open-api/cop-query",
                        class: "endpoint"
                      }, [
                        createVNode("span", { class: "http-method http-method--post" }, "POST"),
                        createVNode("code", null, "/customers/action/cop-query")
                      ])
                    ])
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("a", {
                        href: "/tech/tpp-standards/v2.1/banking/confirmation-of-payee/open-api/discovery",
                        class: "endpoint"
                      }, [
                        createVNode("span", { class: "http-method http-method--get" }, "GET"),
                        createVNode("code", null, "/discovery")
                      ])
                    ]),
                    createVNode("td", null, [
                      createVNode("strong", null, "API Hub default")
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
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "atm",
    num: "06",
    color: "var(--at-gold)",
    eyebrow: "ATM",
    title: "atm",
    tone: "surface"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`ATM location data — publicly accessible, no consent required.`);
            } else {
              return [
                createTextVNode("ATM location data — publicly accessible, no consent required.")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdRefTable, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<table data-v-e716f0e0${_scopeId2}><thead data-v-e716f0e0${_scopeId2}><tr data-v-e716f0e0${_scopeId2}><th data-v-e716f0e0${_scopeId2}>API Resource (TPP-facing)</th><th data-v-e716f0e0${_scopeId2}>Ozone Connect Endpoint</th></tr></thead><tbody data-v-e716f0e0${_scopeId2}><tr data-v-e716f0e0${_scopeId2}><td data-v-e716f0e0${_scopeId2}><a href="/tech/tpp-standards/v2.1/banking/atms/open-api/atms" class="endpoint" data-v-e716f0e0${_scopeId2}><span class="http-method http-method--get" data-v-e716f0e0${_scopeId2}>GET</span><code data-v-e716f0e0${_scopeId2}>/atms</code></a></td><td data-v-e716f0e0${_scopeId2}><a href="/tech/lfi-api-hub/v2.1/banking/atms/open-api/atm" class="endpoint" data-v-e716f0e0${_scopeId2}><span class="http-method http-method--get" data-v-e716f0e0${_scopeId2}>GET</span><code data-v-e716f0e0${_scopeId2}>/atm</code></a></td></tr></tbody></table>`);
            } else {
              return [
                createVNode("table", null, [
                  createVNode("thead", null, [
                    createVNode("tr", null, [
                      createVNode("th", null, "API Resource (TPP-facing)"),
                      createVNode("th", null, "Ozone Connect Endpoint")
                    ])
                  ]),
                  createVNode("tbody", null, [
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("a", {
                          href: "/tech/tpp-standards/v2.1/banking/atms/open-api/atms",
                          class: "endpoint"
                        }, [
                          createVNode("span", { class: "http-method http-method--get" }, "GET"),
                          createVNode("code", null, "/atms")
                        ])
                      ]),
                      createVNode("td", null, [
                        createVNode("a", {
                          href: "/tech/lfi-api-hub/v2.1/banking/atms/open-api/atm",
                          class: "endpoint"
                        }, [
                          createVNode("span", { class: "http-method http-method--get" }, "GET"),
                          createVNode("code", null, "/atm")
                        ])
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
              createTextVNode("ATM location data — publicly accessible, no consent required.")
            ]),
            _: 1
          }),
          createVNode(_component_EdRefTable, null, {
            default: withCtx(() => [
              createVNode("table", null, [
                createVNode("thead", null, [
                  createVNode("tr", null, [
                    createVNode("th", null, "API Resource (TPP-facing)"),
                    createVNode("th", null, "Ozone Connect Endpoint")
                  ])
                ]),
                createVNode("tbody", null, [
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("a", {
                        href: "/tech/tpp-standards/v2.1/banking/atms/open-api/atms",
                        class: "endpoint"
                      }, [
                        createVNode("span", { class: "http-method http-method--get" }, "GET"),
                        createVNode("code", null, "/atms")
                      ])
                    ]),
                    createVNode("td", null, [
                      createVNode("a", {
                        href: "/tech/lfi-api-hub/v2.1/banking/atms/open-api/atm",
                        class: "endpoint"
                      }, [
                        createVNode("span", { class: "http-method http-method--get" }, "GET"),
                        createVNode("code", null, "/atm")
                      ])
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
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "product",
    num: "07",
    color: "var(--at-blue-deep, #1d4ed8)",
    eyebrow: "Products & Leads",
    title: "product",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`Product catalogue and lead generation — publicly accessible product listings.`);
            } else {
              return [
                createTextVNode("Product catalogue and lead generation — publicly accessible product listings.")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdRefTable, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<table data-v-e716f0e0${_scopeId2}><thead data-v-e716f0e0${_scopeId2}><tr data-v-e716f0e0${_scopeId2}><th data-v-e716f0e0${_scopeId2}>API Resource (TPP-facing)</th><th data-v-e716f0e0${_scopeId2}>Ozone Connect Endpoint</th></tr></thead><tbody data-v-e716f0e0${_scopeId2}><tr data-v-e716f0e0${_scopeId2}><td data-v-e716f0e0${_scopeId2}><a href="/tech/tpp-standards/v2.1/banking/products-leads/open-api/products" class="endpoint" data-v-e716f0e0${_scopeId2}><span class="http-method http-method--get" data-v-e716f0e0${_scopeId2}>GET</span><code data-v-e716f0e0${_scopeId2}>/products</code></a></td><td data-v-e716f0e0${_scopeId2}><a href="/tech/lfi-api-hub/v2.1/banking/products-and-leads/open-api/products" class="endpoint" data-v-e716f0e0${_scopeId2}><span class="http-method http-method--get" data-v-e716f0e0${_scopeId2}>GET</span><code data-v-e716f0e0${_scopeId2}>/products</code></a></td></tr><tr data-v-e716f0e0${_scopeId2}><td data-v-e716f0e0${_scopeId2}><a href="/tech/tpp-standards/v2.1/banking/products-leads/open-api/leads" class="endpoint" data-v-e716f0e0${_scopeId2}><span class="http-method http-method--post" data-v-e716f0e0${_scopeId2}>POST</span><code data-v-e716f0e0${_scopeId2}>/leads</code></a></td><td data-v-e716f0e0${_scopeId2}><a href="/tech/lfi-api-hub/v2.1/banking/products-and-leads/open-api/leads" class="endpoint" data-v-e716f0e0${_scopeId2}><span class="http-method http-method--post" data-v-e716f0e0${_scopeId2}>POST</span><code data-v-e716f0e0${_scopeId2}>/leads</code></a></td></tr></tbody></table>`);
            } else {
              return [
                createVNode("table", null, [
                  createVNode("thead", null, [
                    createVNode("tr", null, [
                      createVNode("th", null, "API Resource (TPP-facing)"),
                      createVNode("th", null, "Ozone Connect Endpoint")
                    ])
                  ]),
                  createVNode("tbody", null, [
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("a", {
                          href: "/tech/tpp-standards/v2.1/banking/products-leads/open-api/products",
                          class: "endpoint"
                        }, [
                          createVNode("span", { class: "http-method http-method--get" }, "GET"),
                          createVNode("code", null, "/products")
                        ])
                      ]),
                      createVNode("td", null, [
                        createVNode("a", {
                          href: "/tech/lfi-api-hub/v2.1/banking/products-and-leads/open-api/products",
                          class: "endpoint"
                        }, [
                          createVNode("span", { class: "http-method http-method--get" }, "GET"),
                          createVNode("code", null, "/products")
                        ])
                      ])
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("a", {
                          href: "/tech/tpp-standards/v2.1/banking/products-leads/open-api/leads",
                          class: "endpoint"
                        }, [
                          createVNode("span", { class: "http-method http-method--post" }, "POST"),
                          createVNode("code", null, "/leads")
                        ])
                      ]),
                      createVNode("td", null, [
                        createVNode("a", {
                          href: "/tech/lfi-api-hub/v2.1/banking/products-and-leads/open-api/leads",
                          class: "endpoint"
                        }, [
                          createVNode("span", { class: "http-method http-method--post" }, "POST"),
                          createVNode("code", null, "/leads")
                        ])
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
              createTextVNode("Product catalogue and lead generation — publicly accessible product listings.")
            ]),
            _: 1
          }),
          createVNode(_component_EdRefTable, null, {
            default: withCtx(() => [
              createVNode("table", null, [
                createVNode("thead", null, [
                  createVNode("tr", null, [
                    createVNode("th", null, "API Resource (TPP-facing)"),
                    createVNode("th", null, "Ozone Connect Endpoint")
                  ])
                ]),
                createVNode("tbody", null, [
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("a", {
                        href: "/tech/tpp-standards/v2.1/banking/products-leads/open-api/products",
                        class: "endpoint"
                      }, [
                        createVNode("span", { class: "http-method http-method--get" }, "GET"),
                        createVNode("code", null, "/products")
                      ])
                    ]),
                    createVNode("td", null, [
                      createVNode("a", {
                        href: "/tech/lfi-api-hub/v2.1/banking/products-and-leads/open-api/products",
                        class: "endpoint"
                      }, [
                        createVNode("span", { class: "http-method http-method--get" }, "GET"),
                        createVNode("code", null, "/products")
                      ])
                    ])
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("a", {
                        href: "/tech/tpp-standards/v2.1/banking/products-leads/open-api/leads",
                        class: "endpoint"
                      }, [
                        createVNode("span", { class: "http-method http-method--post" }, "POST"),
                        createVNode("code", null, "/leads")
                      ])
                    ]),
                    createVNode("td", null, [
                      createVNode("a", {
                        href: "/tech/lfi-api-hub/v2.1/banking/products-and-leads/open-api/leads",
                        class: "endpoint"
                      }, [
                        createVNode("span", { class: "http-method http-method--post" }, "POST"),
                        createVNode("code", null, "/leads")
                      ])
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
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "relationship-to-scopes",
    num: "08",
    color: "var(--at-navy)",
    eyebrow: "Relationship to Scopes",
    title: "API families carry defined OAuth 2.0 scopes",
    tone: "surface"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Each API family carries a defined set of OAuth 2.0 scopes. When you register an API resource, the Trust Framework associates those scopes with your authorisation server. TPPs requesting tokens for a given scope will be directed to your server as the resource owner for that family. `);
            } else {
              return [
                createTextVNode(" Each API family carries a defined set of OAuth 2.0 scopes. When you register an API resource, the Trust Framework associates those scopes with your authorisation server. TPPs requesting tokens for a given scope will be directed to your server as the resource owner for that family. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Each API family carries a defined set of OAuth 2.0 scopes. When you register an API resource, the Trust Framework associates those scopes with your authorisation server. TPPs requesting tokens for a given scope will be directed to your server as the resource owner for that family. ")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<section class="ed-doc__contents" data-v-e716f0e0><div class="ed-doc__inner" data-v-e716f0e0><div class="ed-doc__contents-head" data-v-e716f0e0><div class="ed-doc__contents-eyebrow" data-v-e716f0e0><span class="ed-doc__eyebrow-dash" data-v-e716f0e0></span> Next Steps </div><h2 class="ed-doc__contents-title" data-v-e716f0e0>Add and configure API resources</h2></div><div class="ed-doc__contents-grid" data-v-e716f0e0><a class="ed-link-card" href="/tech/lfi-api-hub/trust-framework/servers/api/creating" style="${ssrRenderStyle({ "--card-color": "var(--at-teal)" })}" data-v-e716f0e0><span class="ed-link-card__top" data-v-e716f0e0></span><div class="ed-link-card__meta" data-v-e716f0e0><span class="ed-link-card__cat" data-v-e716f0e0>Walkthrough</span></div><h3 class="ed-link-card__title" data-v-e716f0e0>Creating an API Resource</h3><p class="ed-link-card__desc" data-v-e716f0e0>Step-by-step walkthrough of registering an API family on your server.</p><div class="ed-link-card__foot" data-v-e716f0e0><span class="ed-link-card__cta" data-v-e716f0e0>Open</span><span class="ed-link-card__arrow" data-v-e716f0e0>→</span></div></a><a class="ed-link-card" href="/tech/lfi-api-hub/trust-framework/servers/api/meta" style="${ssrRenderStyle({ "--card-color": "var(--at-gold, #b08800)" })}" data-v-e716f0e0><span class="ed-link-card__top" data-v-e716f0e0></span><div class="ed-link-card__meta" data-v-e716f0e0><span class="ed-link-card__cat" data-v-e716f0e0>Reference</span></div><h3 class="ed-link-card__title" data-v-e716f0e0>API Resource Meta Data</h3><p class="ed-link-card__desc" data-v-e716f0e0>Metadata schema fields each API family supports.</p><div class="ed-link-card__foot" data-v-e716f0e0><span class="ed-link-card__cta" data-v-e716f0e0>Open</span><span class="ed-link-card__arrow" data-v-e716f0e0>→</span></div></a></div></div></section></div>`);
}
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/trust-framework/servers/api/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-e716f0e0"]]);
export {
  index as default
};
