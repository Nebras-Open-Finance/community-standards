import { _ as __unplugin_components_6 } from "./EdRefTable-DCHoNUfr.js";
import { _ as __unplugin_components_5 } from "./APIFlowViewer-BRjrby73.js";
import { _ as __unplugin_components_4 } from "./EdProse-D3vi_RS_.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-DD63-Oxz.js";
import { _ as __unplugin_components_2 } from "./EdInPageNav-DkIq-w7S.js";
import { _ as __unplugin_components_0$1 } from "./EdHero-BRdU9xqH.js";
import { _ as __unplugin_components_0 } from "./EdBackStrip-CrlwbtLm.js";
import { defineComponent, mergeProps, withCtx, createTextVNode, createVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrRenderStyle, ssrInterpolate } from "vue/server-renderer";
import { useHead } from "@unhead/vue";
import { _ as _sfc_main$1 } from "./BpRegistrationFlow-C_6EJf7-.js";
import { _ as _sfc_main$2 } from "./BpPaymentFlow-DobHG7mp.js";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "mermaid";
import "./useChartTheme-DtmiKid7.js";
import "vite-ssg";
import "axios";
import "vue-router";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "technical-architecture",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({ title: "Technical Architecture · BioPay" });
    const sections = [
      { id: "diagram", label: "Architecture diagram" },
      { id: "who", label: "Who does what" }
    ];
    const meta = [
      { label: "Status", value: "Draft" },
      { label: "Actors", value: "3" },
      { label: "Version", value: "0.1" }
    ];
    const actors = [
      {
        key: "bpip",
        name: "BPIP",
        sub: "Biometric Payment Initiation Provider — the payment initiator",
        color: "var(--at-teal)",
        responsibilities: [
          "Capture the biometric, run liveness detection and match it to a verified identity — all of it outside the Open Finance boundary.",
          "Resolve the customer to an identifier, and assert with each payment that the identification took place.",
          "Retain the LFI identifier received in the registration event, and reconcile any events it did not receive.",
          "Build the payment request to the creditor schema for the instrument discovery returned.",
          "Generate and retain an idempotency key for every payment, and recover with it rather than initiating again.",
          "Implement the event endpoint, and acknowledge registration and payment status events.",
          "Report the outcome back to the acceptance point."
        ]
      },
      {
        key: "hub",
        name: "API Hub",
        sub: "Nebras — the control plane",
        color: "var(--at-blue-deep)",
        responsibilities: [
          "Enforce mutual TLS and application-layer authentication on every request, so each call is bound to a participant the Trust Framework has identified by certificate.",
          "Issue access tokens under client_credentials. There is no authorisation journey in this flow, and no LFI issues anything.",
          "Enforce role and scope entitlement before any request is proxied.",
          "Validate every request against the schema for the named payment instrument.",
          "Act as the gateway between the BPIP and the LFI. The two never communicate directly — the Hub resolves the LFI from the registration record and proxies every request to its Ozone Connect endpoints.",
          "Enforce idempotency, and serve retrieval by payment identifier or by idempotency key.",
          "Record every transaction that passes through, for reconciliation, dispute handling and supervision.",
          "Normalise status, map LFI errors to the standard, and deliver events to the initiator.",
          "Hold no biometric, no template, no account number and no card number."
        ]
      },
      {
        key: "lfi",
        name: "LFI",
        sub: "Licensed Financial Institution — the execution layer",
        color: "var(--at-navy)",
        responsibilities: [
          "Run the registration journey in its own channel, and verify the customer’s identity.",
          "Bind the verified identity to its own customer record, and capture the instrument the customer selects.",
          "Post the completed registration to the API Hub, and update it when the customer changes or withdraws it.",
          "Implement the biometric payment endpoints on Ozone Connect.",
          "Execute the payment on the registered payment rail (AANI, CBDC, Jaywan, …).",
          "Patch payment status to the API Hub once the payment reaches a terminal state."
        ]
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdBackStrip = __unplugin_components_0;
      const _component_EdHero = __unplugin_components_0$1;
      const _component_EdInPageNav = __unplugin_components_2;
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdProse = __unplugin_components_4;
      const _component_APIFlowViewer = __unplugin_components_5;
      const _component_EdRefTable = __unplugin_components_6;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-page" }, _attrs))} data-v-ed96aef0>`);
      _push(ssrRenderComponent(_component_EdBackStrip, {
        href: "/biopay/",
        text: "BioPay overview"
      }, null, _parent));
      _push(ssrRenderComponent(_component_EdHero, {
        eyebrow: "BioPay · Draft",
        "eyebrow-color": "var(--at-teal)",
        title: "Technical Architecture",
        meta,
        lede: "How the journey is put together, and which party is accountable for each part of it. <strong>Everything here is draft</strong> — the flows and the split of responsibilities are proposals for review."
      }, null, _parent));
      _push(ssrRenderComponent(_component_EdInPageNav, { sections }, null, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "diagram",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Architecture diagram",
        title: "The journey in two halves",
        lede: "Registration binds a customer to a payment instrument. Payment spends against that binding. They are separate flows with separate actors, and they are worth reading separately. Click either diagram to expand it."
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 class="bp-sub" data-v-ed96aef0${_scopeId}>Registration</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The customer registers with their bank, in the bank’s own channel, and no Open Finance API is involved in that part. What brings it into Open Finance is the step that follows: the LFI posts the completed registration to the API Hub, the Hub stores the binding, and the Hub drives an event to the initiator. `);
                } else {
                  return [
                    createTextVNode(" The customer registers with their bank, in the bank’s own channel, and no Open Finance API is involved in that part. What brings it into Open Finance is the step that follows: the LFI posts the completed registration to the API Hub, the Hub stores the binding, and the Hub drives an event to the initiator. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_APIFlowViewer, {
              title: "BioPay — registration",
              eyebrow: "Registration flow"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$1, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="bp-sub" data-v-ed96aef0${_scopeId}>Payment</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The initiator identifies the customer, confirms the registration is still usable, and initiates a payment shaped to the registered instrument. The API Hub resolves the LFI from its registration store and proxies the request; the LFI executes on the rail and patches status back, which the Hub delivers to the initiator. `);
                } else {
                  return [
                    createTextVNode(" The initiator identifies the customer, confirms the registration is still usable, and initiates a payment shaped to the registered instrument. The API Hub resolves the LFI from its registration store and proxies the request; the LFI executes on the rail and patches status back, which the Hub delivers to the initiator. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_APIFlowViewer, {
              title: "BioPay — payment",
              eyebrow: "Payment flow"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$2, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$2)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", { class: "bp-sub" }, "Registration"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The customer registers with their bank, in the bank’s own channel, and no Open Finance API is involved in that part. What brings it into Open Finance is the step that follows: the LFI posts the completed registration to the API Hub, the Hub stores the binding, and the Hub drives an event to the initiator. ")
                ]),
                _: 1
              }),
              createVNode(_component_APIFlowViewer, {
                title: "BioPay — registration",
                eyebrow: "Registration flow"
              }, {
                default: withCtx(() => [
                  createVNode(_sfc_main$1)
                ]),
                _: 1
              }),
              createVNode("h3", { class: "bp-sub" }, "Payment"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The initiator identifies the customer, confirms the registration is still usable, and initiates a payment shaped to the registered instrument. The API Hub resolves the LFI from its registration store and proxies the request; the LFI executes on the rail and patches status back, which the Hub delivers to the initiator. ")
                ]),
                _: 1
              }),
              createVNode(_component_APIFlowViewer, {
                title: "BioPay — payment",
                eyebrow: "Payment flow"
              }, {
                default: withCtx(() => [
                  createVNode(_sfc_main$2)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "who",
        num: "02",
        color: "var(--at-blue-deep)",
        eyebrow: "Who does what",
        title: "Three actors, and what each is accountable for",
        tone: "surface",
        lede: "One new role and two existing ones. The split matters: the initiator answers <em>who is paying</em>, the API Hub decides <em>whether the request is allowed and where it goes</em>, and the LFI decides <em>whether the money moves</em>."
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-ed96aef0${_scopeId2}><thead data-v-ed96aef0${_scopeId2}><tr data-v-ed96aef0${_scopeId2}><th data-v-ed96aef0${_scopeId2}>Actor</th><th data-v-ed96aef0${_scopeId2}>Responsibility</th></tr></thead><tbody data-v-ed96aef0${_scopeId2}><!--[-->`);
                  ssrRenderList(actors, (a) => {
                    _push3(`<!--[--><!--[-->`);
                    ssrRenderList(a.responsibilities, (r, i) => {
                      _push3(`<tr data-v-ed96aef0${_scopeId2}>`);
                      if (i === 0) {
                        _push3(`<td${ssrRenderAttr("rowspan", a.responsibilities.length)} class="bp-actor" style="${ssrRenderStyle({ "--bp-actor-color": a.color })}" data-v-ed96aef0${_scopeId2}><strong data-v-ed96aef0${_scopeId2}>${ssrInterpolate(a.name)}</strong><span class="bp-actor__sub" data-v-ed96aef0${_scopeId2}>${ssrInterpolate(a.sub)}</span></td>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`<td data-v-ed96aef0${_scopeId2}>${ssrInterpolate(r)}</td></tr>`);
                    });
                    _push3(`<!--]--><!--]-->`);
                  });
                  _push3(`<!--]--></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Actor"),
                          createVNode("th", null, "Responsibility")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        (openBlock(), createBlock(Fragment, null, renderList(actors, (a) => {
                          return openBlock(), createBlock(Fragment, {
                            key: a.key
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(a.responsibilities, (r, i) => {
                              return openBlock(), createBlock("tr", {
                                key: a.key + "-" + i
                              }, [
                                i === 0 ? (openBlock(), createBlock("td", {
                                  key: 0,
                                  rowspan: a.responsibilities.length,
                                  class: "bp-actor",
                                  style: { "--bp-actor-color": a.color }
                                }, [
                                  createVNode("strong", null, toDisplayString(a.name), 1),
                                  createVNode("span", { class: "bp-actor__sub" }, toDisplayString(a.sub), 1)
                                ], 12, ["rowspan"])) : createCommentVNode("", true),
                                createVNode("td", null, toDisplayString(r), 1)
                              ]);
                            }), 128))
                          ], 64);
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
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Actor"),
                        createVNode("th", null, "Responsibility")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      (openBlock(), createBlock(Fragment, null, renderList(actors, (a) => {
                        return openBlock(), createBlock(Fragment, {
                          key: a.key
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(a.responsibilities, (r, i) => {
                            return openBlock(), createBlock("tr", {
                              key: a.key + "-" + i
                            }, [
                              i === 0 ? (openBlock(), createBlock("td", {
                                key: 0,
                                rowspan: a.responsibilities.length,
                                class: "bp-actor",
                                style: { "--bp-actor-color": a.color }
                              }, [
                                createVNode("strong", null, toDisplayString(a.name), 1),
                                createVNode("span", { class: "bp-actor__sub" }, toDisplayString(a.sub), 1)
                              ], 12, ["rowspan"])) : createCommentVNode("", true),
                              createVNode("td", null, toDisplayString(r), 1)
                            ]);
                          }), 128))
                        ], 64);
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
      _push(`</div>`);
    };
  }
});
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/biopay/technical-architecture.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const technicalArchitecture = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ed96aef0"]]);
export {
  technicalArchitecture as default
};
