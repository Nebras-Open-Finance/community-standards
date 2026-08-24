import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { defineComponent, mergeProps, withCtx, createTextVNode, createVNode, openBlock, createBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const journeys = [
      {
        name: "View &amp; Manage",
        what: `See a dashboard of all consents &mdash; active and historical &mdash; with enough detail
           to understand what each consent permits, and click through to manage any individual
           consent`
      },
      {
        name: "Consent Revocation",
        what: `Cancel a consent, triggering revocation at the API Hub with a clear confirmation of
           what happens to data or payments already processed`
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdRefTable = __unplugin_components_12;
      const _component_EdNote = __unplugin_components_7;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-ad98d460><section class="ed-doc__hero" data-v-ad98d460><div class="ed-doc__inner" data-v-ad98d460><div class="ed-doc__eyebrow" data-v-ad98d460><span class="ed-doc__eyebrow-dash" data-v-ad98d460></span> LFI · API Hub · v2.1 · Consent Management Interface </div><h1 class="ed-doc__title" data-v-ad98d460> Consent Management Interface <span class="ed-doc__read" data-v-ad98d460>2 min read</span></h1><p class="ed-doc__lede" data-v-ad98d460> Every LFI must provide a Consent Management Interface (CMI) — a section of their digital banking application where customers can see all active and historical consents they have granted to third party providers, and take action on them. <strong data-v-ad98d460>The CMI is a requirement, not an optional feature.</strong></p><p class="ed-doc__lede ed-doc__lede--tight" data-v-ad98d460> The LFI CMI serves as the primary transparency and control mechanism for customers within the LFI&#39;s own product. It complements the consent management interfaces provided by TPPs. </p></div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "must-support",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Two core journeys",
        title: "What the CMI must support",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`A compliant CMI covers two core user journeys:`);
                } else {
                  return [
                    createTextVNode("A compliant CMI covers two core user journeys:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-ad98d460${_scopeId2}><thead data-v-ad98d460${_scopeId2}><tr data-v-ad98d460${_scopeId2}><th data-v-ad98d460${_scopeId2}>Journey</th><th data-v-ad98d460${_scopeId2}>What the customer does</th></tr></thead><tbody data-v-ad98d460${_scopeId2}><!--[-->`);
                  ssrRenderList(journeys, (j) => {
                    _push3(`<tr data-v-ad98d460${_scopeId2}><td data-v-ad98d460${_scopeId2}><strong data-v-ad98d460${_scopeId2}>${j.name ?? ""}</strong></td><td data-v-ad98d460${_scopeId2}>${j.what ?? ""}</td></tr>`);
                  });
                  _push3(`<!--]--></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Journey"),
                          createVNode("th", null, "What the customer does")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        (openBlock(), createBlock(Fragment, null, renderList(journeys, (j) => {
                          return createVNode("tr", {
                            key: j.name
                          }, [
                            createVNode("td", null, [
                              createVNode("strong", {
                                innerHTML: j.name
                              }, null, 8, ["innerHTML"])
                            ]),
                            createVNode("td", {
                              innerHTML: j.what
                            }, null, 8, ["innerHTML"])
                          ]);
                        }), 64))
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "info",
              title: "No Pause"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-ad98d460${_scopeId2}> Unlike the TPP CMI, the LFI CMI does not support <strong data-v-ad98d460${_scopeId2}>Pause</strong> and <strong data-v-ad98d460${_scopeId2}>Reactivate</strong>. Pause is a TPP-only concept that does not affect the consent state at the API Hub. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" Unlike the TPP CMI, the LFI CMI does not support "),
                      createVNode("strong", null, "Pause"),
                      createTextVNode(" and "),
                      createVNode("strong", null, "Reactivate"),
                      createTextVNode(". Pause is a TPP-only concept that does not affect the consent state at the API Hub. ")
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
                  createTextVNode("A compliant CMI covers two core user journeys:")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Journey"),
                        createVNode("th", null, "What the customer does")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      (openBlock(), createBlock(Fragment, null, renderList(journeys, (j) => {
                        return createVNode("tr", {
                          key: j.name
                        }, [
                          createVNode("td", null, [
                            createVNode("strong", {
                              innerHTML: j.name
                            }, null, 8, ["innerHTML"])
                          ]),
                          createVNode("td", {
                            innerHTML: j.what
                          }, null, 8, ["innerHTML"])
                        ]);
                      }), 64))
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "info",
                title: "No Pause"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" Unlike the TPP CMI, the LFI CMI does not support "),
                    createVNode("strong", null, "Pause"),
                    createTextVNode(" and "),
                    createVNode("strong", null, "Reactivate"),
                    createTextVNode(". Pause is a TPP-only concept that does not affect the consent state at the API Hub. ")
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
        id: "view-and-manage",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "Dashboard + detail",
        title: "View & manage",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The CMI must present consent information at two levels: `);
                } else {
                  return [
                    createTextVNode(" The CMI must present consent information at two levels: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="ed-doc__levels" data-v-ad98d460${_scopeId}><article class="ed-doc__level" data-v-ad98d460${_scopeId}><header class="ed-doc__level-head" data-v-ad98d460${_scopeId}><span class="ed-doc__level-tag" data-v-ad98d460${_scopeId}>Level 1</span><h3 class="ed-doc__level-title" data-v-ad98d460${_scopeId}>Dashboard</h3></header><p class="ed-doc__level-body" data-v-ad98d460${_scopeId}> Lists all consents the customer has granted to TPPs via this LFI, with enough detail to identify each one. The information shown varies by consent type; see the per-product Requirements pages for <a href="/tech/lfi-api-hub/v2.1/consent-management-interface/bank-data-sharing/requirements" data-v-ad98d460${_scopeId}>Bank Data Sharing</a>, <a href="/tech/lfi-api-hub/v2.1/consent-management-interface/bank-service-initiation/requirements" data-v-ad98d460${_scopeId}>Bank Service Initiation</a>, and <a href="/tech/lfi-api-hub/v2.1/consent-management-interface/insurance-data-sharing/requirements" data-v-ad98d460${_scopeId}>Insurance Data Sharing</a>. </p><p class="ed-doc__level-body" data-v-ad98d460${_scopeId}> Any consent can be selected to open its detail page. </p></article><article class="ed-doc__level" data-v-ad98d460${_scopeId}><header class="ed-doc__level-head" data-v-ad98d460${_scopeId}><span class="ed-doc__level-tag" data-v-ad98d460${_scopeId}>Level 2</span><h3 class="ed-doc__level-title" data-v-ad98d460${_scopeId}>Detail page</h3></header><p class="ed-doc__level-body" data-v-ad98d460${_scopeId}> Shows the full parameters of a consent exactly as they were defined at consent creation. The detail page also hosts the <strong data-v-ad98d460${_scopeId}>Revoke</strong> action button where applicable, and — for long-lived payment consents — a full log of payments initiated under that consent. </p></article></div>`);
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The CMI must present consent information at two levels: ")
                ]),
                _: 1
              }),
              createVNode("div", { class: "ed-doc__levels" }, [
                createVNode("article", { class: "ed-doc__level" }, [
                  createVNode("header", { class: "ed-doc__level-head" }, [
                    createVNode("span", { class: "ed-doc__level-tag" }, "Level 1"),
                    createVNode("h3", { class: "ed-doc__level-title" }, "Dashboard")
                  ]),
                  createVNode("p", { class: "ed-doc__level-body" }, [
                    createTextVNode(" Lists all consents the customer has granted to TPPs via this LFI, with enough detail to identify each one. The information shown varies by consent type; see the per-product Requirements pages for "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.1/consent-management-interface/bank-data-sharing/requirements" }, "Bank Data Sharing"),
                    createTextVNode(", "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.1/consent-management-interface/bank-service-initiation/requirements" }, "Bank Service Initiation"),
                    createTextVNode(", and "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.1/consent-management-interface/insurance-data-sharing/requirements" }, "Insurance Data Sharing"),
                    createTextVNode(". ")
                  ]),
                  createVNode("p", { class: "ed-doc__level-body" }, " Any consent can be selected to open its detail page. ")
                ]),
                createVNode("article", { class: "ed-doc__level" }, [
                  createVNode("header", { class: "ed-doc__level-head" }, [
                    createVNode("span", { class: "ed-doc__level-tag" }, "Level 2"),
                    createVNode("h3", { class: "ed-doc__level-title" }, "Detail page")
                  ]),
                  createVNode("p", { class: "ed-doc__level-body" }, [
                    createTextVNode(" Shows the full parameters of a consent exactly as they were defined at consent creation. The detail page also hosts the "),
                    createVNode("strong", null, "Revoke"),
                    createTextVNode(" action button where applicable, and — for long-lived payment consents — a full log of payments initiated under that consent. ")
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "revocation",
        num: "03",
        color: "var(--at-blue-deep, #1d4ed8)",
        eyebrow: "Cancel access",
        title: "Consent revocation",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` For any consent in the <code data-v-ad98d460${_scopeId2}>Authorized</code>, <code data-v-ad98d460${_scopeId2}>AwaitingAuthorization</code>, or <code data-v-ad98d460${_scopeId2}>Suspended</code> state, the option to revoke must be present on the detail page. When a customer revokes a consent, the LFI must: `);
                } else {
                  return [
                    createTextVNode(" For any consent in the "),
                    createVNode("code", null, "Authorized"),
                    createTextVNode(", "),
                    createVNode("code", null, "AwaitingAuthorization"),
                    createTextVNode(", or "),
                    createVNode("code", null, "Suspended"),
                    createTextVNode(" state, the option to revoke must be present on the detail page. When a customer revokes a consent, the LFI must: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<ol class="ed-doc__steps" data-v-ad98d460${_scopeId}><li data-v-ad98d460${_scopeId}> Present a <strong data-v-ad98d460${_scopeId}>single confirmation page</strong> that clearly describes the impact — what the TPP will lose access to and what happens to any data already retrieved. </li><li data-v-ad98d460${_scopeId}> Update the consent status to <code data-v-ad98d460${_scopeId}>Revoked</code> via the Consent Manager API. </li></ol>`);
            _push2(ssrRenderComponent(_component_EdNote, { type: "info" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-ad98d460${_scopeId2}> Single-use consents that have already been submitted (such as a Single Instant Payment that has completed) are <strong data-v-ad98d460${_scopeId2}>irrevocable</strong>. Do not display a revoke button for consents in the <code data-v-ad98d460${_scopeId2}>Consumed</code> state. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" Single-use consents that have already been submitted (such as a Single Instant Payment that has completed) are "),
                      createVNode("strong", null, "irrevocable"),
                      createTextVNode(". Do not display a revoke button for consents in the "),
                      createVNode("code", null, "Consumed"),
                      createTextVNode(" state. ")
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
                  createTextVNode(" For any consent in the "),
                  createVNode("code", null, "Authorized"),
                  createTextVNode(", "),
                  createVNode("code", null, "AwaitingAuthorization"),
                  createTextVNode(", or "),
                  createVNode("code", null, "Suspended"),
                  createTextVNode(" state, the option to revoke must be present on the detail page. When a customer revokes a consent, the LFI must: ")
                ]),
                _: 1
              }),
              createVNode("ol", { class: "ed-doc__steps" }, [
                createVNode("li", null, [
                  createTextVNode(" Present a "),
                  createVNode("strong", null, "single confirmation page"),
                  createTextVNode(" that clearly describes the impact — what the TPP will lose access to and what happens to any data already retrieved. ")
                ]),
                createVNode("li", null, [
                  createTextVNode(" Update the consent status to "),
                  createVNode("code", null, "Revoked"),
                  createTextVNode(" via the Consent Manager API. ")
                ])
              ]),
              createVNode(_component_EdNote, { type: "info" }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" Single-use consents that have already been submitted (such as a Single Instant Payment that has completed) are "),
                    createVNode("strong", null, "irrevocable"),
                    createTextVNode(". Do not display a revoke button for consents in the "),
                    createVNode("code", null, "Consumed"),
                    createTextVNode(" state. ")
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
    };
  }
});
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/v2.1/consent-management-interface/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ad98d460"]]);
export {
  index as default
};
