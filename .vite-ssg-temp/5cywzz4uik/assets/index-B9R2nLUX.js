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
      },
      {
        name: "Pause a Consent",
        what: `Temporarily pause a consent in the TPP's own system without revoking it, stopping data
           access or payment initiation until the user reactivates it`
      },
      {
        name: "Reactivate a Paused Consent",
        what: `Re-enable a paused consent without requiring the user to re-authenticate with their LFI`
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdRefTable = __unplugin_components_12;
      const _component_EdNote = __unplugin_components_7;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-718fe86d><section class="ed-doc__hero" data-v-718fe86d><div class="ed-doc__inner" data-v-718fe86d><div class="ed-doc__eyebrow" data-v-718fe86d><span class="ed-doc__eyebrow-dash" data-v-718fe86d></span> TPP Standards · v2.2-rc1 · Consent · Consent Management Interface </div><h1 class="ed-doc__title" data-v-718fe86d> Consent Management Interface <span class="ed-doc__read" data-v-718fe86d>3 min read</span></h1><p class="ed-doc__lede" data-v-718fe86d> Every TPP must provide a Consent Management Interface (CMI) — a section of their application where users can see all active and historical consents they have granted, and take action on them. <strong data-v-718fe86d>The CMI is a requirement, not an optional feature.</strong></p><p class="ed-doc__lede ed-doc__lede--tight" data-v-718fe86d> The CMI serves as the primary transparency and control mechanism for users within the TPP&#39;s own product. It complements the consent management interfaces provided by LFIs. </p></div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "must-support",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Four core journeys",
        title: "What the CMI must support",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`A compliant CMI covers four core user journeys:`);
                } else {
                  return [
                    createTextVNode("A compliant CMI covers four core user journeys:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-718fe86d${_scopeId2}><thead data-v-718fe86d${_scopeId2}><tr data-v-718fe86d${_scopeId2}><th data-v-718fe86d${_scopeId2}>Journey</th><th data-v-718fe86d${_scopeId2}>What the user does</th></tr></thead><tbody data-v-718fe86d${_scopeId2}><!--[-->`);
                  ssrRenderList(journeys, (j) => {
                    _push3(`<tr data-v-718fe86d${_scopeId2}><td data-v-718fe86d${_scopeId2}><strong data-v-718fe86d${_scopeId2}>${j.name ?? ""}</strong></td><td data-v-718fe86d${_scopeId2}>${j.what ?? ""}</td></tr>`);
                  });
                  _push3(`<!--]--></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Journey"),
                          createVNode("th", null, "What the user does")
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
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("A compliant CMI covers four core user journeys:")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Journey"),
                        createVNode("th", null, "What the user does")
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
            _push2(`<div class="ed-doc__levels" data-v-718fe86d${_scopeId}><article class="ed-doc__level" data-v-718fe86d${_scopeId}><header class="ed-doc__level-head" data-v-718fe86d${_scopeId}><span class="ed-doc__level-tag" data-v-718fe86d${_scopeId}>Level 1</span><h3 class="ed-doc__level-title" data-v-718fe86d${_scopeId}>Dashboard</h3></header><p class="ed-doc__level-body" data-v-718fe86d${_scopeId}> Lists all consents between the user and the TPP with enough detail to identify each one. The information shown varies by consent type; see the per-product Requirements pages for <a href="/tech/tpp-standards/v2.2-rc1/consent/consent-management-interface/bank-data-sharing/requirements" data-v-718fe86d${_scopeId}>Bank Data Sharing</a>, <a href="/tech/tpp-standards/v2.2-rc1/consent/consent-management-interface/bank-service-initiation/requirements" data-v-718fe86d${_scopeId}>Bank Service Initiation</a>, and <a href="/tech/tpp-standards/v2.2-rc1/consent/consent-management-interface/insurance-data-sharing/requirements" data-v-718fe86d${_scopeId}>Insurance Data Sharing</a>. </p><p class="ed-doc__level-body" data-v-718fe86d${_scopeId}> Any consent can be selected to open its detail page. </p></article><article class="ed-doc__level" data-v-718fe86d${_scopeId}><header class="ed-doc__level-head" data-v-718fe86d${_scopeId}><span class="ed-doc__level-tag" data-v-718fe86d${_scopeId}>Level 2</span><h3 class="ed-doc__level-title" data-v-718fe86d${_scopeId}>Detail page</h3></header><p class="ed-doc__level-body" data-v-718fe86d${_scopeId}> Shows the full parameters of a consent exactly as they were defined at consent creation. The detail page also hosts the <strong data-v-718fe86d${_scopeId}>Pause</strong>, <strong data-v-718fe86d${_scopeId}>Reactivate</strong>, and <strong data-v-718fe86d${_scopeId}>Revoke</strong> action buttons where applicable, and — for long-lived payment consents — a full log of payments initiated under that consent. </p></article></div>`);
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
                    createTextVNode(" Lists all consents between the user and the TPP with enough detail to identify each one. The information shown varies by consent type; see the per-product Requirements pages for "),
                    createVNode("a", { href: "/tech/tpp-standards/v2.2-rc1/consent/consent-management-interface/bank-data-sharing/requirements" }, "Bank Data Sharing"),
                    createTextVNode(", "),
                    createVNode("a", { href: "/tech/tpp-standards/v2.2-rc1/consent/consent-management-interface/bank-service-initiation/requirements" }, "Bank Service Initiation"),
                    createTextVNode(", and "),
                    createVNode("a", { href: "/tech/tpp-standards/v2.2-rc1/consent/consent-management-interface/insurance-data-sharing/requirements" }, "Insurance Data Sharing"),
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
                    createVNode("strong", null, "Pause"),
                    createTextVNode(", "),
                    createVNode("strong", null, "Reactivate"),
                    createTextVNode(", and "),
                    createVNode("strong", null, "Revoke"),
                    createTextVNode(" action buttons where applicable, and — for long-lived payment consents — a full log of payments initiated under that consent. ")
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
                  _push3(` For any consent in the <code data-v-718fe86d${_scopeId2}>Authorized</code>, <code data-v-718fe86d${_scopeId2}>AwaitingAuthorization</code>, <code data-v-718fe86d${_scopeId2}>Suspended</code>, or <code data-v-718fe86d${_scopeId2}>Paused</code> state, the option to revoke must be present on the detail page. When a user revokes a consent, the TPP must: `);
                } else {
                  return [
                    createTextVNode(" For any consent in the "),
                    createVNode("code", null, "Authorized"),
                    createTextVNode(", "),
                    createVNode("code", null, "AwaitingAuthorization"),
                    createTextVNode(", "),
                    createVNode("code", null, "Suspended"),
                    createTextVNode(", or "),
                    createVNode("code", null, "Paused"),
                    createTextVNode(" state, the option to revoke must be present on the detail page. When a user revokes a consent, the TPP must: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<ol class="ed-doc__steps" data-v-718fe86d${_scopeId}><li data-v-718fe86d${_scopeId}> Present a <strong data-v-718fe86d${_scopeId}>single confirmation page</strong> that clearly describes the impact — what the user will lose access to and what happens to any data already retrieved. </li><li data-v-718fe86d${_scopeId}><p data-v-718fe86d${_scopeId}>PATCH the API Hub to update the consent status to <code data-v-718fe86d${_scopeId}>Revoked</code>:</p><ul class="ed-doc__substeps" data-v-718fe86d${_scopeId}><li data-v-718fe86d${_scopeId}> Data Sharing: <a href="/tech/tpp-standards/v2.2-rc1/consent/open-api/patch-account-access-consents-ConsentId" class="endpoint" data-v-718fe86d${_scopeId}><span class="http-method http-method--patch" data-v-718fe86d${_scopeId}>PATCH</span><code data-v-718fe86d${_scopeId}>/account-access-consents/{ConsentId}</code></a></li><li data-v-718fe86d${_scopeId}> Service Initiation: <a href="/tech/tpp-standards/v2.2-rc1/consent/open-api/patch-payment-consents-ConsentId" class="endpoint" data-v-718fe86d${_scopeId}><span class="http-method http-method--patch" data-v-718fe86d${_scopeId}>PATCH</span><code data-v-718fe86d${_scopeId}>/payment-consents/{ConsentId}</code></a></li></ul></li></ol>`);
            _push2(ssrRenderComponent(_component_EdNote, { type: "info" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-718fe86d${_scopeId2}> Single-use consents that have already been submitted (such as a Single Instant Payment that has completed) are <strong data-v-718fe86d${_scopeId2}>irrevocable</strong>. Do not display a revoke button for consents in the <code data-v-718fe86d${_scopeId2}>Consumed</code> state. </p>`);
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
                  createTextVNode(", "),
                  createVNode("code", null, "Suspended"),
                  createTextVNode(", or "),
                  createVNode("code", null, "Paused"),
                  createTextVNode(" state, the option to revoke must be present on the detail page. When a user revokes a consent, the TPP must: ")
                ]),
                _: 1
              }),
              createVNode("ol", { class: "ed-doc__steps" }, [
                createVNode("li", null, [
                  createTextVNode(" Present a "),
                  createVNode("strong", null, "single confirmation page"),
                  createTextVNode(" that clearly describes the impact — what the user will lose access to and what happens to any data already retrieved. ")
                ]),
                createVNode("li", null, [
                  createVNode("p", null, [
                    createTextVNode("PATCH the API Hub to update the consent status to "),
                    createVNode("code", null, "Revoked"),
                    createTextVNode(":")
                  ]),
                  createVNode("ul", { class: "ed-doc__substeps" }, [
                    createVNode("li", null, [
                      createTextVNode(" Data Sharing: "),
                      createVNode("a", {
                        href: "/tech/tpp-standards/v2.2-rc1/consent/open-api/patch-account-access-consents-ConsentId",
                        class: "endpoint"
                      }, [
                        createVNode("span", { class: "http-method http-method--patch" }, "PATCH"),
                        createVNode("code", null, "/account-access-consents/{ConsentId}")
                      ])
                    ]),
                    createVNode("li", null, [
                      createTextVNode(" Service Initiation: "),
                      createVNode("a", {
                        href: "/tech/tpp-standards/v2.2-rc1/consent/open-api/patch-payment-consents-ConsentId",
                        class: "endpoint"
                      }, [
                        createVNode("span", { class: "http-method http-method--patch" }, "PATCH"),
                        createVNode("code", null, "/payment-consents/{ConsentId}")
                      ])
                    ])
                  ])
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
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "pause",
        num: "04",
        color: "var(--at-teal)",
        eyebrow: "Local pause, LFI untouched",
        title: "Pause a consent",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` For any consent in the <code data-v-718fe86d${_scopeId2}>Authorized</code> state, the option to pause must be present on the detail page. When a user pauses a consent, the TPP must: `);
                } else {
                  return [
                    createTextVNode(" For any consent in the "),
                    createVNode("code", null, "Authorized"),
                    createTextVNode(" state, the option to pause must be present on the detail page. When a user pauses a consent, the TPP must: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<ol class="ed-doc__steps" data-v-718fe86d${_scopeId}><li data-v-718fe86d${_scopeId}> Present a <strong data-v-718fe86d${_scopeId}>single confirmation page</strong> that clearly describes that the connection has been paused and how this will affect the service the TPP provides to the user. </li><li data-v-718fe86d${_scopeId}> Record the paused status in the TPP&#39;s own system. <strong data-v-718fe86d${_scopeId}>Do not</strong> PATCH the API Hub — the consent remains <code data-v-718fe86d${_scopeId}>Authorized</code> at the LFI. </li></ol>`);
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "warning",
              title: "Paused ≠ Suspended"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-718fe86d${_scopeId2}><strong data-v-718fe86d${_scopeId2}>Paused</strong> is a user-initiated action within the TPP CMI. It stops the TPP from accessing data or initiating payments locally. The consent remains <code data-v-718fe86d${_scopeId2}>Authorized</code> at the LFI and no re-authentication is needed to resume. </p><p data-v-718fe86d${_scopeId2}><strong data-v-718fe86d${_scopeId2}>Suspended</strong> is an LFI-initiated state change recorded in the API Hub — for example when a user&#39;s Emirates ID has expired. It is a change to the consent&#39;s actual state. </p><p data-v-718fe86d${_scopeId2}> Do not present a Paused consent as Suspended, and do not conflate the two in your UI or business logic. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createVNode("strong", null, "Paused"),
                      createTextVNode(" is a user-initiated action within the TPP CMI. It stops the TPP from accessing data or initiating payments locally. The consent remains "),
                      createVNode("code", null, "Authorized"),
                      createTextVNode(" at the LFI and no re-authentication is needed to resume. ")
                    ]),
                    createVNode("p", null, [
                      createVNode("strong", null, "Suspended"),
                      createTextVNode(" is an LFI-initiated state change recorded in the API Hub — for example when a user's Emirates ID has expired. It is a change to the consent's actual state. ")
                    ]),
                    createVNode("p", null, " Do not present a Paused consent as Suspended, and do not conflate the two in your UI or business logic. ")
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
                  createTextVNode(" state, the option to pause must be present on the detail page. When a user pauses a consent, the TPP must: ")
                ]),
                _: 1
              }),
              createVNode("ol", { class: "ed-doc__steps" }, [
                createVNode("li", null, [
                  createTextVNode(" Present a "),
                  createVNode("strong", null, "single confirmation page"),
                  createTextVNode(" that clearly describes that the connection has been paused and how this will affect the service the TPP provides to the user. ")
                ]),
                createVNode("li", null, [
                  createTextVNode(" Record the paused status in the TPP's own system. "),
                  createVNode("strong", null, "Do not"),
                  createTextVNode(" PATCH the API Hub — the consent remains "),
                  createVNode("code", null, "Authorized"),
                  createTextVNode(" at the LFI. ")
                ])
              ]),
              createVNode(_component_EdNote, {
                type: "warning",
                title: "Paused ≠ Suspended"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createVNode("strong", null, "Paused"),
                    createTextVNode(" is a user-initiated action within the TPP CMI. It stops the TPP from accessing data or initiating payments locally. The consent remains "),
                    createVNode("code", null, "Authorized"),
                    createTextVNode(" at the LFI and no re-authentication is needed to resume. ")
                  ]),
                  createVNode("p", null, [
                    createVNode("strong", null, "Suspended"),
                    createTextVNode(" is an LFI-initiated state change recorded in the API Hub — for example when a user's Emirates ID has expired. It is a change to the consent's actual state. ")
                  ]),
                  createVNode("p", null, " Do not present a Paused consent as Suspended, and do not conflate the two in your UI or business logic. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "reactivate",
        num: "05",
        color: "var(--at-gold)",
        eyebrow: "Resume without re-auth",
        title: "Reactivate a paused consent",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` For any consent the TPP has recorded as Paused, the option to reactivate must be present on the detail page. When a user reactivates a consent, the TPP must: `);
                } else {
                  return [
                    createTextVNode(" For any consent the TPP has recorded as Paused, the option to reactivate must be present on the detail page. When a user reactivates a consent, the TPP must: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<ol class="ed-doc__steps" data-v-718fe86d${_scopeId}><li data-v-718fe86d${_scopeId}> Present a <strong data-v-718fe86d${_scopeId}>single confirmation page</strong> that clearly describes that access has been restored and what the TPP will now be able to do on the user&#39;s behalf. </li><li data-v-718fe86d${_scopeId}> Remove the paused status in the TPP&#39;s own system, resuming normal data access or payment initiation under the existing consent. </li></ol>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` No interaction with the API Hub is required — the consent is already <code data-v-718fe86d${_scopeId2}>Authorized</code> at the LFI. The user does not need to re-authenticate. `);
                } else {
                  return [
                    createTextVNode(" No interaction with the API Hub is required — the consent is already "),
                    createVNode("code", null, "Authorized"),
                    createTextVNode(" at the LFI. The user does not need to re-authenticate. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" For any consent the TPP has recorded as Paused, the option to reactivate must be present on the detail page. When a user reactivates a consent, the TPP must: ")
                ]),
                _: 1
              }),
              createVNode("ol", { class: "ed-doc__steps" }, [
                createVNode("li", null, [
                  createTextVNode(" Present a "),
                  createVNode("strong", null, "single confirmation page"),
                  createTextVNode(" that clearly describes that access has been restored and what the TPP will now be able to do on the user's behalf. ")
                ]),
                createVNode("li", null, " Remove the paused status in the TPP's own system, resuming normal data access or payment initiation under the existing consent. ")
              ]),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" No interaction with the API Hub is required — the consent is already "),
                  createVNode("code", null, "Authorized"),
                  createTextVNode(" at the LFI. The user does not need to re-authenticate. ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/v2.2-rc1/consent/consent-management-interface/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-718fe86d"]]);
export {
  index as default
};
