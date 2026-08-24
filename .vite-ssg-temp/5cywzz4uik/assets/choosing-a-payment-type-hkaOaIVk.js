import { _ as __unplugin_components_0, a as __unplugin_components_2, b as __unplugin_components_6, c as __unplugin_components_7$2 } from "./EdBackStrip-COkyNhGh.js";
import { _ as __unplugin_components_7$1 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_7, a as __unplugin_components_8 } from "./EdCompareCards-BLuIwQN6.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { _ as __unplugin_components_0$1 } from "./EdHero-DawHPCxB.js";
import { defineComponent, mergeProps, withCtx, createVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "choosing-a-payment-type",
  __ssrInlineRender: true,
  setup(__props) {
    const sections = [
      { id: "path", label: "Pick a path" },
      { id: "sip", label: "Single Instant Payment" },
      { id: "multi", label: "Multi-Payment" },
      { id: "delegated", label: "Delegated SCA" },
      { id: "pitfalls", label: "Pitfalls" }
    ];
    const meta = [
      { label: "Category", value: "Payments" },
      { label: "Read", value: "10 min" },
      { label: "Updated", value: "21 Apr 2026" }
    ];
    const tags = ["Payments", "Multi-Payment", "Decision Guide"];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdBackStrip = __unplugin_components_0;
      const _component_EdHero = __unplugin_components_0$1;
      const _component_EdInPageNav = __unplugin_components_2;
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdRefTable = __unplugin_components_12;
      const _component_EdBullets = __unplugin_components_5;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdCompareCards = __unplugin_components_7;
      const _component_EdCompareCard = __unplugin_components_8;
      const _component_EdNote = __unplugin_components_7$1;
      const _component_EdRelatedCards = __unplugin_components_6;
      const _component_EdRelatedCard = __unplugin_components_7$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-page" }, _attrs))} data-v-0d483e3a>`);
      _push(ssrRenderComponent(_component_EdBackStrip, {
        href: "/knowledge-base/",
        text: "All knowledge base articles"
      }, null, _parent));
      _push(ssrRenderComponent(_component_EdHero, {
        eyebrow: "Learn · Understand · Build",
        title: "Choosing a Payment Type",
        meta,
        lede: "UAE Open Finance defines <strong>seven payment shapes</strong>. The first decision is whether you need <strong>one payment now</strong> (Single Instant Payment) or <strong>many payments over time</strong> (one of six Multi-Payment variants). <strong>Delegated SCA</strong> is an optional overlay on the multi-payment variants that shifts strong customer authentication from the LFI to the TPP."
      }, {
        lede: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="ed-tags" data-v-0d483e3a${_scopeId}><!--[-->`);
            ssrRenderList(tags, (t) => {
              _push2(`<span class="ed-tag" data-v-0d483e3a${_scopeId}>${ssrInterpolate(t)}</span>`);
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode("div", { class: "ed-tags" }, [
                (openBlock(), createBlock(Fragment, null, renderList(tags, (t) => {
                  return createVNode("span", {
                    key: t,
                    class: "ed-tag"
                  }, toDisplayString(t), 1);
                }), 64))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdInPageNav, { sections }, null, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "path",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Pick a path",
        title: "One payment now, or many over time?",
        lede: "That single question splits the seven shapes into two paths. If you only need one payment, stop — Single Instant Payment is the only option. If you need to take more than one payment under the same consent, you're in Multi-Payment territory.",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-0d483e3a${_scopeId2}><thead data-v-0d483e3a${_scopeId2}><tr data-v-0d483e3a${_scopeId2}><th data-v-0d483e3a${_scopeId2}>You need…</th><th data-v-0d483e3a${_scopeId2}>Use</th></tr></thead><tbody data-v-0d483e3a${_scopeId2}><tr data-v-0d483e3a${_scopeId2}><td data-v-0d483e3a${_scopeId2}>Exactly one payment, executed immediately</td><td data-v-0d483e3a${_scopeId2}><a href="/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/single-instant-payment/api-guide" data-v-0d483e3a${_scopeId2}>Single Instant Payment</a></td></tr><tr data-v-0d483e3a${_scopeId2}><td data-v-0d483e3a${_scopeId2}>More than one payment under the same authorisation</td><td data-v-0d483e3a${_scopeId2}>One of the six <a href="#multi" data-v-0d483e3a${_scopeId2}>Multi-Payment</a> variants</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "You need…"),
                          createVNode("th", null, "Use")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, "Exactly one payment, executed immediately"),
                          createVNode("td", null, [
                            createVNode("a", { href: "/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/single-instant-payment/api-guide" }, "Single Instant Payment")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "More than one payment under the same authorisation"),
                          createVNode("td", null, [
                            createTextVNode("One of the six "),
                            createVNode("a", { href: "#multi" }, "Multi-Payment"),
                            createTextVNode(" variants")
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
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "You need…"),
                        createVNode("th", null, "Use")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, "Exactly one payment, executed immediately"),
                        createVNode("td", null, [
                          createVNode("a", { href: "/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/single-instant-payment/api-guide" }, "Single Instant Payment")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "More than one payment under the same authorisation"),
                        createVNode("td", null, [
                          createTextVNode("One of the six "),
                          createVNode("a", { href: "#multi" }, "Multi-Payment"),
                          createTextVNode(" variants")
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
        id: "sip",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "Single Instant Payment",
        title: "One payment, one authorisation, settled now",
        lede: "Settled immediately on UAE domestic rails (AANI or UAEFTS).",
        tone: "surface",
        narrow: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-0d483e3a${_scopeId2}><strong data-v-0d483e3a${_scopeId2}>When to use:</strong> A checkout, an ad-hoc bill, a one-off transfer — any situation where the user is making a single payment decision in the moment.</li><li data-v-0d483e3a${_scopeId2}><strong data-v-0d483e3a${_scopeId2}>What&#39;s known up front:</strong> The exact amount, the creditor, the payment purpose.</li><li data-v-0d483e3a${_scopeId2}><strong data-v-0d483e3a${_scopeId2}>Re-authorisation:</strong> Every payment is its own consent. There is no &quot;next payment&quot; under the same authorisation.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "When to use:"),
                      createTextVNode(" A checkout, an ad-hoc bill, a one-off transfer — any situation where the user is making a single payment decision in the moment.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "What's known up front:"),
                      createTextVNode(" The exact amount, the creditor, the payment purpose.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Re-authorisation:"),
                      createTextVNode(' Every payment is its own consent. There is no "next payment" under the same authorisation.')
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`If one payment is all you need, you&#39;re done — the rest of this article is about the multi-payment path.`);
                } else {
                  return [
                    createTextVNode("If one payment is all you need, you're done — the rest of this article is about the multi-payment path.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "When to use:"),
                    createTextVNode(" A checkout, an ad-hoc bill, a one-off transfer — any situation where the user is making a single payment decision in the moment.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "What's known up front:"),
                    createTextVNode(" The exact amount, the creditor, the payment purpose.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Re-authorisation:"),
                    createTextVNode(' Every payment is its own consent. There is no "next payment" under the same authorisation.')
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("If one payment is all you need, you're done — the rest of this article is about the multi-payment path.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "multi",
        num: "03",
        color: "var(--at-blue)",
        eyebrow: "Multi-Payment",
        title: "Six variants, two questions",
        lede: "Multi-Payment covers everything that isn't a single instant payment. The six variants come from answering two questions about the consent.",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-0d483e3a${_scopeId2}><strong data-v-0d483e3a${_scopeId2}>How much is each payment for?</strong> — <strong data-v-0d483e3a${_scopeId2}>Fixed</strong> means every payment is the same amount; <strong data-v-0d483e3a${_scopeId2}>Variable</strong> means each payment is capped at a per-payment ceiling but can come in for less.</li><li data-v-0d483e3a${_scopeId2}><strong data-v-0d483e3a${_scopeId2}>When does each payment run?</strong> — <strong data-v-0d483e3a${_scopeId2}>OnDemand</strong> means the TPP triggers each payment whenever it wants; <strong data-v-0d483e3a${_scopeId2}>PeriodicSchedule</strong> means one payment per recurring period (monthly, weekly, etc.); <strong data-v-0d483e3a${_scopeId2}>DefinedSchedule</strong> means a pre-agreed list of specific calendar dates.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "How much is each payment for?"),
                      createTextVNode(" — "),
                      createVNode("strong", null, "Fixed"),
                      createTextVNode(" means every payment is the same amount; "),
                      createVNode("strong", null, "Variable"),
                      createTextVNode(" means each payment is capped at a per-payment ceiling but can come in for less.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "When does each payment run?"),
                      createTextVNode(" — "),
                      createVNode("strong", null, "OnDemand"),
                      createTextVNode(" means the TPP triggers each payment whenever it wants; "),
                      createVNode("strong", null, "PeriodicSchedule"),
                      createTextVNode(" means one payment per recurring period (monthly, weekly, etc.); "),
                      createVNode("strong", null, "DefinedSchedule"),
                      createTextVNode(" means a pre-agreed list of specific calendar dates.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Two amount answers × three timing answers = six combinations. Each one is a distinct payment shape with its own api-guide:`);
                } else {
                  return [
                    createTextVNode("Two amount answers × three timing answers = six combinations. Each one is a distinct payment shape with its own api-guide:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-0d483e3a${_scopeId2}><thead data-v-0d483e3a${_scopeId2}><tr data-v-0d483e3a${_scopeId2}><th data-v-0d483e3a${_scopeId2}>Amount</th><th data-v-0d483e3a${_scopeId2}>Timing</th><th data-v-0d483e3a${_scopeId2}>Variant</th></tr></thead><tbody data-v-0d483e3a${_scopeId2}><tr data-v-0d483e3a${_scopeId2}><td data-v-0d483e3a${_scopeId2}>Fixed per payment</td><td data-v-0d483e3a${_scopeId2}>TPP triggers each payment</td><td data-v-0d483e3a${_scopeId2}><a href="/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/fixed-on-demand/api-guide" data-v-0d483e3a${_scopeId2}>FixedOnDemand</a></td></tr><tr data-v-0d483e3a${_scopeId2}><td data-v-0d483e3a${_scopeId2}>Variable up to a per-payment cap</td><td data-v-0d483e3a${_scopeId2}>TPP triggers each payment</td><td data-v-0d483e3a${_scopeId2}><a href="/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/variable-on-demand/api-guide" data-v-0d483e3a${_scopeId2}>VariableOnDemand</a></td></tr><tr data-v-0d483e3a${_scopeId2}><td data-v-0d483e3a${_scopeId2}>Fixed per payment</td><td data-v-0d483e3a${_scopeId2}>One per recurring period (e.g. monthly)</td><td data-v-0d483e3a${_scopeId2}><a href="/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/fixed-periodic-schedule/api-guide" data-v-0d483e3a${_scopeId2}>FixedPeriodicSchedule</a></td></tr><tr data-v-0d483e3a${_scopeId2}><td data-v-0d483e3a${_scopeId2}>Variable up to a per-payment cap</td><td data-v-0d483e3a${_scopeId2}>One per recurring period</td><td data-v-0d483e3a${_scopeId2}><a href="/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/variable-periodic-schedule/api-guide" data-v-0d483e3a${_scopeId2}>VariablePeriodicSchedule</a></td></tr><tr data-v-0d483e3a${_scopeId2}><td data-v-0d483e3a${_scopeId2}>Exact amount known for each dated payment</td><td data-v-0d483e3a${_scopeId2}>List of specific calendar dates</td><td data-v-0d483e3a${_scopeId2}><a href="/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/fixed-defined-schedule/api-guide" data-v-0d483e3a${_scopeId2}>FixedDefinedSchedule</a></td></tr><tr data-v-0d483e3a${_scopeId2}><td data-v-0d483e3a${_scopeId2}>Per-date ceiling, actual amount may differ</td><td data-v-0d483e3a${_scopeId2}>List of specific calendar dates</td><td data-v-0d483e3a${_scopeId2}><a href="/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/variable-defined-schedule/api-guide" data-v-0d483e3a${_scopeId2}>VariableDefinedSchedule</a></td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Amount"),
                          createVNode("th", null, "Timing"),
                          createVNode("th", null, "Variant")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, "Fixed per payment"),
                          createVNode("td", null, "TPP triggers each payment"),
                          createVNode("td", null, [
                            createVNode("a", { href: "/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/fixed-on-demand/api-guide" }, "FixedOnDemand")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "Variable up to a per-payment cap"),
                          createVNode("td", null, "TPP triggers each payment"),
                          createVNode("td", null, [
                            createVNode("a", { href: "/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/variable-on-demand/api-guide" }, "VariableOnDemand")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "Fixed per payment"),
                          createVNode("td", null, "One per recurring period (e.g. monthly)"),
                          createVNode("td", null, [
                            createVNode("a", { href: "/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/fixed-periodic-schedule/api-guide" }, "FixedPeriodicSchedule")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "Variable up to a per-payment cap"),
                          createVNode("td", null, "One per recurring period"),
                          createVNode("td", null, [
                            createVNode("a", { href: "/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/variable-periodic-schedule/api-guide" }, "VariablePeriodicSchedule")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "Exact amount known for each dated payment"),
                          createVNode("td", null, "List of specific calendar dates"),
                          createVNode("td", null, [
                            createVNode("a", { href: "/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/fixed-defined-schedule/api-guide" }, "FixedDefinedSchedule")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "Per-date ceiling, actual amount may differ"),
                          createVNode("td", null, "List of specific calendar dates"),
                          createVNode("td", null, [
                            createVNode("a", { href: "/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/variable-defined-schedule/api-guide" }, "VariableDefinedSchedule")
                          ])
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-0d483e3a${_scopeId}>On-demand — the TPP triggers each payment</h3>`);
            _push2(ssrRenderComponent(_component_EdCompareCards, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_EdCompareCard, {
                    accent: "var(--at-blue)",
                    kicker: "FixedOnDemand",
                    example: "Same amount each time"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<ul data-v-0d483e3a${_scopeId3}><li data-v-0d483e3a${_scopeId3}><strong data-v-0d483e3a${_scopeId3}>When to use:</strong> Fixed-amount subscription billing, regular instalment collection, membership fees — the charge is always the same, and the TPP (not the calendar) decides when to take it.</li><li data-v-0d483e3a${_scopeId3}><strong data-v-0d483e3a${_scopeId3}>What&#39;s known up front:</strong> The per-payment amount (<code data-v-0d483e3a${_scopeId3}>PeriodicSchedule.Amount</code>), the creditor, and cumulative caps via <code data-v-0d483e3a${_scopeId3}>PeriodicSchedule.PeriodType</code>.</li></ul>`);
                      } else {
                        return [
                          createVNode("ul", null, [
                            createVNode("li", null, [
                              createVNode("strong", null, "When to use:"),
                              createTextVNode(" Fixed-amount subscription billing, regular instalment collection, membership fees — the charge is always the same, and the TPP (not the calendar) decides when to take it.")
                            ]),
                            createVNode("li", null, [
                              createVNode("strong", null, "What's known up front:"),
                              createTextVNode(" The per-payment amount ("),
                              createVNode("code", null, "PeriodicSchedule.Amount"),
                              createTextVNode("), the creditor, and cumulative caps via "),
                              createVNode("code", null, "PeriodicSchedule.PeriodType"),
                              createTextVNode(".")
                            ])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_EdCompareCard, {
                    accent: "var(--at-blue-deep)",
                    kicker: "VariableOnDemand",
                    example: "Variable up to a ceiling"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<ul data-v-0d483e3a${_scopeId3}><li data-v-0d483e3a${_scopeId3}><strong data-v-0d483e3a${_scopeId3}>When to use:</strong> Metered billing, utility top-ups, variable-charge subscriptions, TPP-managed savings sweeps — both the amount and the timing depend on usage or TPP logic, not a calendar.</li><li data-v-0d483e3a${_scopeId3}><strong data-v-0d483e3a${_scopeId3}>What&#39;s known up front:</strong> The per-payment ceiling (<code data-v-0d483e3a${_scopeId3}>MaximumIndividualAmount</code>), cumulative caps via <code data-v-0d483e3a${_scopeId3}>PeriodicSchedule.PeriodType</code>, and optional <code data-v-0d483e3a${_scopeId3}>Controls</code> on total count and total value across the consent.</li></ul>`);
                      } else {
                        return [
                          createVNode("ul", null, [
                            createVNode("li", null, [
                              createVNode("strong", null, "When to use:"),
                              createTextVNode(" Metered billing, utility top-ups, variable-charge subscriptions, TPP-managed savings sweeps — both the amount and the timing depend on usage or TPP logic, not a calendar.")
                            ]),
                            createVNode("li", null, [
                              createVNode("strong", null, "What's known up front:"),
                              createTextVNode(" The per-payment ceiling ("),
                              createVNode("code", null, "MaximumIndividualAmount"),
                              createTextVNode("), cumulative caps via "),
                              createVNode("code", null, "PeriodicSchedule.PeriodType"),
                              createTextVNode(", and optional "),
                              createVNode("code", null, "Controls"),
                              createTextVNode(" on total count and total value across the consent.")
                            ])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_EdCompareCard, {
                      accent: "var(--at-blue)",
                      kicker: "FixedOnDemand",
                      example: "Same amount each time"
                    }, {
                      default: withCtx(() => [
                        createVNode("ul", null, [
                          createVNode("li", null, [
                            createVNode("strong", null, "When to use:"),
                            createTextVNode(" Fixed-amount subscription billing, regular instalment collection, membership fees — the charge is always the same, and the TPP (not the calendar) decides when to take it.")
                          ]),
                          createVNode("li", null, [
                            createVNode("strong", null, "What's known up front:"),
                            createTextVNode(" The per-payment amount ("),
                            createVNode("code", null, "PeriodicSchedule.Amount"),
                            createTextVNode("), the creditor, and cumulative caps via "),
                            createVNode("code", null, "PeriodicSchedule.PeriodType"),
                            createTextVNode(".")
                          ])
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_EdCompareCard, {
                      accent: "var(--at-blue-deep)",
                      kicker: "VariableOnDemand",
                      example: "Variable up to a ceiling"
                    }, {
                      default: withCtx(() => [
                        createVNode("ul", null, [
                          createVNode("li", null, [
                            createVNode("strong", null, "When to use:"),
                            createTextVNode(" Metered billing, utility top-ups, variable-charge subscriptions, TPP-managed savings sweeps — both the amount and the timing depend on usage or TPP logic, not a calendar.")
                          ]),
                          createVNode("li", null, [
                            createVNode("strong", null, "What's known up front:"),
                            createTextVNode(" The per-payment ceiling ("),
                            createVNode("code", null, "MaximumIndividualAmount"),
                            createTextVNode("), cumulative caps via "),
                            createVNode("code", null, "PeriodicSchedule.PeriodType"),
                            createTextVNode(", and optional "),
                            createVNode("code", null, "Controls"),
                            createTextVNode(" on total count and total value across the consent.")
                          ])
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "tip",
              title: "PeriodType is a cap window, not a cadence"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-0d483e3a${_scopeId2}>On on-demand variants, <code data-v-0d483e3a${_scopeId2}>PeriodicSchedule.PeriodType</code> (<code data-v-0d483e3a${_scopeId2}>Day</code>, <code data-v-0d483e3a${_scopeId2}>Week</code>, <code data-v-0d483e3a${_scopeId2}>Month</code>, …) defines the <strong data-v-0d483e3a${_scopeId2}>reference window for cumulative limits</strong> — e.g. &quot;no more than N payments totalling X AED per rolling month&quot;. It is <strong data-v-0d483e3a${_scopeId2}>not</strong> a recurrence schedule. The TPP still triggers every payment explicitly.</p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode("On on-demand variants, "),
                      createVNode("code", null, "PeriodicSchedule.PeriodType"),
                      createTextVNode(" ("),
                      createVNode("code", null, "Day"),
                      createTextVNode(", "),
                      createVNode("code", null, "Week"),
                      createTextVNode(", "),
                      createVNode("code", null, "Month"),
                      createTextVNode(", …) defines the "),
                      createVNode("strong", null, "reference window for cumulative limits"),
                      createTextVNode(' — e.g. "no more than N payments totalling X AED per rolling month". It is '),
                      createVNode("strong", null, "not"),
                      createTextVNode(" a recurrence schedule. The TPP still triggers every payment explicitly.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-0d483e3a${_scopeId}>Periodic schedule — one payment per period</h3>`);
            _push2(ssrRenderComponent(_component_EdCompareCards, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_EdCompareCard, {
                    accent: "var(--at-blue)",
                    kicker: "FixedPeriodicSchedule",
                    example: "Fixed amount, fixed cadence"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<ul data-v-0d483e3a${_scopeId3}><li data-v-0d483e3a${_scopeId3}><strong data-v-0d483e3a${_scopeId3}>When to use:</strong> Fixed-price subscriptions, loan repayments, membership dues — predictable recurring charges that follow a calendar.</li><li data-v-0d483e3a${_scopeId3}><strong data-v-0d483e3a${_scopeId3}>What&#39;s known up front:</strong> The per-payment amount and the period cadence. The LFI will only permit <strong data-v-0d483e3a${_scopeId3}>one payment per period</strong> under this consent.</li><li data-v-0d483e3a${_scopeId3}><strong data-v-0d483e3a${_scopeId3}>vs FixedOnDemand:</strong> Same fixed amount, but the calendar — not the TPP — gates payment frequency.</li></ul>`);
                      } else {
                        return [
                          createVNode("ul", null, [
                            createVNode("li", null, [
                              createVNode("strong", null, "When to use:"),
                              createTextVNode(" Fixed-price subscriptions, loan repayments, membership dues — predictable recurring charges that follow a calendar.")
                            ]),
                            createVNode("li", null, [
                              createVNode("strong", null, "What's known up front:"),
                              createTextVNode(" The per-payment amount and the period cadence. The LFI will only permit "),
                              createVNode("strong", null, "one payment per period"),
                              createTextVNode(" under this consent.")
                            ]),
                            createVNode("li", null, [
                              createVNode("strong", null, "vs FixedOnDemand:"),
                              createTextVNode(" Same fixed amount, but the calendar — not the TPP — gates payment frequency.")
                            ])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_EdCompareCard, {
                    accent: "var(--at-blue-deep)",
                    kicker: "VariablePeriodicSchedule",
                    example: "Variable amount, fixed cadence"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<ul data-v-0d483e3a${_scopeId3}><li data-v-0d483e3a${_scopeId3}><strong data-v-0d483e3a${_scopeId3}>When to use:</strong> Utility bills, variable monthly service charges, TPP-managed savings where the amount differs each period but must stay within a pre-approved cap.</li><li data-v-0d483e3a${_scopeId3}><strong data-v-0d483e3a${_scopeId3}>What&#39;s known up front:</strong> The per-payment ceiling (<code data-v-0d483e3a${_scopeId3}>MaximumIndividualAmount</code>) and the period cadence. One payment per period, actual amount variable within the cap.</li></ul>`);
                      } else {
                        return [
                          createVNode("ul", null, [
                            createVNode("li", null, [
                              createVNode("strong", null, "When to use:"),
                              createTextVNode(" Utility bills, variable monthly service charges, TPP-managed savings where the amount differs each period but must stay within a pre-approved cap.")
                            ]),
                            createVNode("li", null, [
                              createVNode("strong", null, "What's known up front:"),
                              createTextVNode(" The per-payment ceiling ("),
                              createVNode("code", null, "MaximumIndividualAmount"),
                              createTextVNode(") and the period cadence. One payment per period, actual amount variable within the cap.")
                            ])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_EdCompareCard, {
                      accent: "var(--at-blue)",
                      kicker: "FixedPeriodicSchedule",
                      example: "Fixed amount, fixed cadence"
                    }, {
                      default: withCtx(() => [
                        createVNode("ul", null, [
                          createVNode("li", null, [
                            createVNode("strong", null, "When to use:"),
                            createTextVNode(" Fixed-price subscriptions, loan repayments, membership dues — predictable recurring charges that follow a calendar.")
                          ]),
                          createVNode("li", null, [
                            createVNode("strong", null, "What's known up front:"),
                            createTextVNode(" The per-payment amount and the period cadence. The LFI will only permit "),
                            createVNode("strong", null, "one payment per period"),
                            createTextVNode(" under this consent.")
                          ]),
                          createVNode("li", null, [
                            createVNode("strong", null, "vs FixedOnDemand:"),
                            createTextVNode(" Same fixed amount, but the calendar — not the TPP — gates payment frequency.")
                          ])
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_EdCompareCard, {
                      accent: "var(--at-blue-deep)",
                      kicker: "VariablePeriodicSchedule",
                      example: "Variable amount, fixed cadence"
                    }, {
                      default: withCtx(() => [
                        createVNode("ul", null, [
                          createVNode("li", null, [
                            createVNode("strong", null, "When to use:"),
                            createTextVNode(" Utility bills, variable monthly service charges, TPP-managed savings where the amount differs each period but must stay within a pre-approved cap.")
                          ]),
                          createVNode("li", null, [
                            createVNode("strong", null, "What's known up front:"),
                            createTextVNode(" The per-payment ceiling ("),
                            createVNode("code", null, "MaximumIndividualAmount"),
                            createTextVNode(") and the period cadence. One payment per period, actual amount variable within the cap.")
                          ])
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-0d483e3a${_scopeId}>Defined schedule — a pre-agreed list of dates</h3>`);
            _push2(ssrRenderComponent(_component_EdCompareCards, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_EdCompareCard, {
                    accent: "var(--at-blue)",
                    kicker: "FixedDefinedSchedule",
                    example: "Fixed amount per date"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<ul data-v-0d483e3a${_scopeId3}><li data-v-0d483e3a${_scopeId3}><strong data-v-0d483e3a${_scopeId3}>When to use:</strong> Structured instalment plans, staged loan repayments, any case where both dates and amounts are known and agreed up front (e.g. &quot;AED 500 on the 1st of each of Jan/Apr/Jul/Oct&quot;).</li><li data-v-0d483e3a${_scopeId3}><strong data-v-0d483e3a${_scopeId3}>What&#39;s known up front:</strong> Every <code data-v-0d483e3a${_scopeId3}>(PaymentExecutionDate, Amount)</code> pair in the <code data-v-0d483e3a${_scopeId3}>Schedule</code> array. The TPP submits exactly one payment per scheduled entry, for exactly the listed amount.</li></ul>`);
                      } else {
                        return [
                          createVNode("ul", null, [
                            createVNode("li", null, [
                              createVNode("strong", null, "When to use:"),
                              createTextVNode(' Structured instalment plans, staged loan repayments, any case where both dates and amounts are known and agreed up front (e.g. "AED 500 on the 1st of each of Jan/Apr/Jul/Oct").')
                            ]),
                            createVNode("li", null, [
                              createVNode("strong", null, "What's known up front:"),
                              createTextVNode(" Every "),
                              createVNode("code", null, "(PaymentExecutionDate, Amount)"),
                              createTextVNode(" pair in the "),
                              createVNode("code", null, "Schedule"),
                              createTextVNode(" array. The TPP submits exactly one payment per scheduled entry, for exactly the listed amount.")
                            ])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_EdCompareCard, {
                    accent: "var(--at-blue-deep)",
                    kicker: "VariableDefinedSchedule",
                    example: "Ceiling per date"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<ul data-v-0d483e3a${_scopeId3}><li data-v-0d483e3a${_scopeId3}><strong data-v-0d483e3a${_scopeId3}>When to use:</strong> Milestone-based project billing, staged payments where the dates are fixed but the final amount on each date depends on delivered work or usage.</li><li data-v-0d483e3a${_scopeId3}><strong data-v-0d483e3a${_scopeId3}>What&#39;s known up front:</strong> Every <code data-v-0d483e3a${_scopeId3}>(PaymentExecutionDate, MaximumIndividualAmount)</code> pair. The TPP submits one payment per scheduled entry, at or below the listed ceiling.</li><li data-v-0d483e3a${_scopeId3}><strong data-v-0d483e3a${_scopeId3}>vs FixedDefinedSchedule:</strong> Same schedule shape, same dates, same <code data-v-0d483e3a${_scopeId3}>Schedule</code> array — the only structural difference is whether each entry carries a locked <code data-v-0d483e3a${_scopeId3}>Amount</code> or a <code data-v-0d483e3a${_scopeId3}>MaximumIndividualAmount</code> ceiling.</li></ul>`);
                      } else {
                        return [
                          createVNode("ul", null, [
                            createVNode("li", null, [
                              createVNode("strong", null, "When to use:"),
                              createTextVNode(" Milestone-based project billing, staged payments where the dates are fixed but the final amount on each date depends on delivered work or usage.")
                            ]),
                            createVNode("li", null, [
                              createVNode("strong", null, "What's known up front:"),
                              createTextVNode(" Every "),
                              createVNode("code", null, "(PaymentExecutionDate, MaximumIndividualAmount)"),
                              createTextVNode(" pair. The TPP submits one payment per scheduled entry, at or below the listed ceiling.")
                            ]),
                            createVNode("li", null, [
                              createVNode("strong", null, "vs FixedDefinedSchedule:"),
                              createTextVNode(" Same schedule shape, same dates, same "),
                              createVNode("code", null, "Schedule"),
                              createTextVNode(" array — the only structural difference is whether each entry carries a locked "),
                              createVNode("code", null, "Amount"),
                              createTextVNode(" or a "),
                              createVNode("code", null, "MaximumIndividualAmount"),
                              createTextVNode(" ceiling.")
                            ])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_EdCompareCard, {
                      accent: "var(--at-blue)",
                      kicker: "FixedDefinedSchedule",
                      example: "Fixed amount per date"
                    }, {
                      default: withCtx(() => [
                        createVNode("ul", null, [
                          createVNode("li", null, [
                            createVNode("strong", null, "When to use:"),
                            createTextVNode(' Structured instalment plans, staged loan repayments, any case where both dates and amounts are known and agreed up front (e.g. "AED 500 on the 1st of each of Jan/Apr/Jul/Oct").')
                          ]),
                          createVNode("li", null, [
                            createVNode("strong", null, "What's known up front:"),
                            createTextVNode(" Every "),
                            createVNode("code", null, "(PaymentExecutionDate, Amount)"),
                            createTextVNode(" pair in the "),
                            createVNode("code", null, "Schedule"),
                            createTextVNode(" array. The TPP submits exactly one payment per scheduled entry, for exactly the listed amount.")
                          ])
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_EdCompareCard, {
                      accent: "var(--at-blue-deep)",
                      kicker: "VariableDefinedSchedule",
                      example: "Ceiling per date"
                    }, {
                      default: withCtx(() => [
                        createVNode("ul", null, [
                          createVNode("li", null, [
                            createVNode("strong", null, "When to use:"),
                            createTextVNode(" Milestone-based project billing, staged payments where the dates are fixed but the final amount on each date depends on delivered work or usage.")
                          ]),
                          createVNode("li", null, [
                            createVNode("strong", null, "What's known up front:"),
                            createTextVNode(" Every "),
                            createVNode("code", null, "(PaymentExecutionDate, MaximumIndividualAmount)"),
                            createTextVNode(" pair. The TPP submits one payment per scheduled entry, at or below the listed ceiling.")
                          ]),
                          createVNode("li", null, [
                            createVNode("strong", null, "vs FixedDefinedSchedule:"),
                            createTextVNode(" Same schedule shape, same dates, same "),
                            createVNode("code", null, "Schedule"),
                            createTextVNode(" array — the only structural difference is whether each entry carries a locked "),
                            createVNode("code", null, "Amount"),
                            createTextVNode(" or a "),
                            createVNode("code", null, "MaximumIndividualAmount"),
                            createTextVNode(" ceiling.")
                          ])
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "How much is each payment for?"),
                    createTextVNode(" — "),
                    createVNode("strong", null, "Fixed"),
                    createTextVNode(" means every payment is the same amount; "),
                    createVNode("strong", null, "Variable"),
                    createTextVNode(" means each payment is capped at a per-payment ceiling but can come in for less.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "When does each payment run?"),
                    createTextVNode(" — "),
                    createVNode("strong", null, "OnDemand"),
                    createTextVNode(" means the TPP triggers each payment whenever it wants; "),
                    createVNode("strong", null, "PeriodicSchedule"),
                    createTextVNode(" means one payment per recurring period (monthly, weekly, etc.); "),
                    createVNode("strong", null, "DefinedSchedule"),
                    createTextVNode(" means a pre-agreed list of specific calendar dates.")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Two amount answers × three timing answers = six combinations. Each one is a distinct payment shape with its own api-guide:")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Amount"),
                        createVNode("th", null, "Timing"),
                        createVNode("th", null, "Variant")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, "Fixed per payment"),
                        createVNode("td", null, "TPP triggers each payment"),
                        createVNode("td", null, [
                          createVNode("a", { href: "/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/fixed-on-demand/api-guide" }, "FixedOnDemand")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "Variable up to a per-payment cap"),
                        createVNode("td", null, "TPP triggers each payment"),
                        createVNode("td", null, [
                          createVNode("a", { href: "/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/variable-on-demand/api-guide" }, "VariableOnDemand")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "Fixed per payment"),
                        createVNode("td", null, "One per recurring period (e.g. monthly)"),
                        createVNode("td", null, [
                          createVNode("a", { href: "/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/fixed-periodic-schedule/api-guide" }, "FixedPeriodicSchedule")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "Variable up to a per-payment cap"),
                        createVNode("td", null, "One per recurring period"),
                        createVNode("td", null, [
                          createVNode("a", { href: "/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/variable-periodic-schedule/api-guide" }, "VariablePeriodicSchedule")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "Exact amount known for each dated payment"),
                        createVNode("td", null, "List of specific calendar dates"),
                        createVNode("td", null, [
                          createVNode("a", { href: "/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/fixed-defined-schedule/api-guide" }, "FixedDefinedSchedule")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "Per-date ceiling, actual amount may differ"),
                        createVNode("td", null, "List of specific calendar dates"),
                        createVNode("td", null, [
                          createVNode("a", { href: "/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/variable-defined-schedule/api-guide" }, "VariableDefinedSchedule")
                        ])
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "On-demand — the TPP triggers each payment"),
              createVNode(_component_EdCompareCards, null, {
                default: withCtx(() => [
                  createVNode(_component_EdCompareCard, {
                    accent: "var(--at-blue)",
                    kicker: "FixedOnDemand",
                    example: "Same amount each time"
                  }, {
                    default: withCtx(() => [
                      createVNode("ul", null, [
                        createVNode("li", null, [
                          createVNode("strong", null, "When to use:"),
                          createTextVNode(" Fixed-amount subscription billing, regular instalment collection, membership fees — the charge is always the same, and the TPP (not the calendar) decides when to take it.")
                        ]),
                        createVNode("li", null, [
                          createVNode("strong", null, "What's known up front:"),
                          createTextVNode(" The per-payment amount ("),
                          createVNode("code", null, "PeriodicSchedule.Amount"),
                          createTextVNode("), the creditor, and cumulative caps via "),
                          createVNode("code", null, "PeriodicSchedule.PeriodType"),
                          createTextVNode(".")
                        ])
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_EdCompareCard, {
                    accent: "var(--at-blue-deep)",
                    kicker: "VariableOnDemand",
                    example: "Variable up to a ceiling"
                  }, {
                    default: withCtx(() => [
                      createVNode("ul", null, [
                        createVNode("li", null, [
                          createVNode("strong", null, "When to use:"),
                          createTextVNode(" Metered billing, utility top-ups, variable-charge subscriptions, TPP-managed savings sweeps — both the amount and the timing depend on usage or TPP logic, not a calendar.")
                        ]),
                        createVNode("li", null, [
                          createVNode("strong", null, "What's known up front:"),
                          createTextVNode(" The per-payment ceiling ("),
                          createVNode("code", null, "MaximumIndividualAmount"),
                          createTextVNode("), cumulative caps via "),
                          createVNode("code", null, "PeriodicSchedule.PeriodType"),
                          createTextVNode(", and optional "),
                          createVNode("code", null, "Controls"),
                          createTextVNode(" on total count and total value across the consent.")
                        ])
                      ])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "tip",
                title: "PeriodType is a cap window, not a cadence"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode("On on-demand variants, "),
                    createVNode("code", null, "PeriodicSchedule.PeriodType"),
                    createTextVNode(" ("),
                    createVNode("code", null, "Day"),
                    createTextVNode(", "),
                    createVNode("code", null, "Week"),
                    createTextVNode(", "),
                    createVNode("code", null, "Month"),
                    createTextVNode(", …) defines the "),
                    createVNode("strong", null, "reference window for cumulative limits"),
                    createTextVNode(' — e.g. "no more than N payments totalling X AED per rolling month". It is '),
                    createVNode("strong", null, "not"),
                    createTextVNode(" a recurrence schedule. The TPP still triggers every payment explicitly.")
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "Periodic schedule — one payment per period"),
              createVNode(_component_EdCompareCards, null, {
                default: withCtx(() => [
                  createVNode(_component_EdCompareCard, {
                    accent: "var(--at-blue)",
                    kicker: "FixedPeriodicSchedule",
                    example: "Fixed amount, fixed cadence"
                  }, {
                    default: withCtx(() => [
                      createVNode("ul", null, [
                        createVNode("li", null, [
                          createVNode("strong", null, "When to use:"),
                          createTextVNode(" Fixed-price subscriptions, loan repayments, membership dues — predictable recurring charges that follow a calendar.")
                        ]),
                        createVNode("li", null, [
                          createVNode("strong", null, "What's known up front:"),
                          createTextVNode(" The per-payment amount and the period cadence. The LFI will only permit "),
                          createVNode("strong", null, "one payment per period"),
                          createTextVNode(" under this consent.")
                        ]),
                        createVNode("li", null, [
                          createVNode("strong", null, "vs FixedOnDemand:"),
                          createTextVNode(" Same fixed amount, but the calendar — not the TPP — gates payment frequency.")
                        ])
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_EdCompareCard, {
                    accent: "var(--at-blue-deep)",
                    kicker: "VariablePeriodicSchedule",
                    example: "Variable amount, fixed cadence"
                  }, {
                    default: withCtx(() => [
                      createVNode("ul", null, [
                        createVNode("li", null, [
                          createVNode("strong", null, "When to use:"),
                          createTextVNode(" Utility bills, variable monthly service charges, TPP-managed savings where the amount differs each period but must stay within a pre-approved cap.")
                        ]),
                        createVNode("li", null, [
                          createVNode("strong", null, "What's known up front:"),
                          createTextVNode(" The per-payment ceiling ("),
                          createVNode("code", null, "MaximumIndividualAmount"),
                          createTextVNode(") and the period cadence. One payment per period, actual amount variable within the cap.")
                        ])
                      ])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode("h3", null, "Defined schedule — a pre-agreed list of dates"),
              createVNode(_component_EdCompareCards, null, {
                default: withCtx(() => [
                  createVNode(_component_EdCompareCard, {
                    accent: "var(--at-blue)",
                    kicker: "FixedDefinedSchedule",
                    example: "Fixed amount per date"
                  }, {
                    default: withCtx(() => [
                      createVNode("ul", null, [
                        createVNode("li", null, [
                          createVNode("strong", null, "When to use:"),
                          createTextVNode(' Structured instalment plans, staged loan repayments, any case where both dates and amounts are known and agreed up front (e.g. "AED 500 on the 1st of each of Jan/Apr/Jul/Oct").')
                        ]),
                        createVNode("li", null, [
                          createVNode("strong", null, "What's known up front:"),
                          createTextVNode(" Every "),
                          createVNode("code", null, "(PaymentExecutionDate, Amount)"),
                          createTextVNode(" pair in the "),
                          createVNode("code", null, "Schedule"),
                          createTextVNode(" array. The TPP submits exactly one payment per scheduled entry, for exactly the listed amount.")
                        ])
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_EdCompareCard, {
                    accent: "var(--at-blue-deep)",
                    kicker: "VariableDefinedSchedule",
                    example: "Ceiling per date"
                  }, {
                    default: withCtx(() => [
                      createVNode("ul", null, [
                        createVNode("li", null, [
                          createVNode("strong", null, "When to use:"),
                          createTextVNode(" Milestone-based project billing, staged payments where the dates are fixed but the final amount on each date depends on delivered work or usage.")
                        ]),
                        createVNode("li", null, [
                          createVNode("strong", null, "What's known up front:"),
                          createTextVNode(" Every "),
                          createVNode("code", null, "(PaymentExecutionDate, MaximumIndividualAmount)"),
                          createTextVNode(" pair. The TPP submits one payment per scheduled entry, at or below the listed ceiling.")
                        ]),
                        createVNode("li", null, [
                          createVNode("strong", null, "vs FixedDefinedSchedule:"),
                          createTextVNode(" Same schedule shape, same dates, same "),
                          createVNode("code", null, "Schedule"),
                          createTextVNode(" array — the only structural difference is whether each entry carries a locked "),
                          createVNode("code", null, "Amount"),
                          createTextVNode(" or a "),
                          createVNode("code", null, "MaximumIndividualAmount"),
                          createTextVNode(" ceiling.")
                        ])
                      ])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "delegated",
        num: "04",
        color: "var(--at-navy)",
        eyebrow: "Delegated SCA",
        title: "An overlay on multi-payment consents",
        lede: "Delegated SCA is not a payment shape. It's a <code>ControlParameters.IsDelegatedAuthentication: true</code> flag that can be set on a multi-payment consent to shift responsibility for performing Strong Customer Authentication from the LFI to the TPP.",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-0d483e3a${_scopeId2}><strong data-v-0d483e3a${_scopeId2}>Default flow:</strong> The LFI authenticates the user at each step of the consent journey and SCA for the payment itself.</li><li data-v-0d483e3a${_scopeId2}><strong data-v-0d483e3a${_scopeId2}>With Delegated SCA:</strong> The TPP has already performed SCA at its own surface (biometrics, secure enclave, MFA) and asserts this to the LFI via a fully-populated <code data-v-0d483e3a${_scopeId2}>Risk.DebtorIndicators.Authentication</code> block on every <code data-v-0d483e3a${_scopeId2}>POST /par</code> and <code data-v-0d483e3a${_scopeId2}>POST /payments</code>.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Default flow:"),
                      createTextVNode(" The LFI authenticates the user at each step of the consent journey and SCA for the payment itself.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "With Delegated SCA:"),
                      createTextVNode(" The TPP has already performed SCA at its own surface (biometrics, secure enclave, MFA) and asserts this to the LFI via a fully-populated "),
                      createVNode("code", null, "Risk.DebtorIndicators.Authentication"),
                      createTextVNode(" block on every "),
                      createVNode("code", null, "POST /par"),
                      createTextVNode(" and "),
                      createVNode("code", null, "POST /payments"),
                      createTextVNode(".")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<strong data-v-0d483e3a${_scopeId2}>When to use:</strong> Apps that already run a compliant SCA flow on the user&#39;s device at the point of every payment, so do not need to rely on the other control parameters.`);
                } else {
                  return [
                    createVNode("strong", null, "When to use:"),
                    createTextVNode(" Apps that already run a compliant SCA flow on the user's device at the point of every payment, so do not need to rely on the other control parameters.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`The nature of this payment means the Risk fields a TPP provides for Delegated SCA payments are different to other payment types — see the <a href="/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/delegated-sca/api-guide" data-v-0d483e3a${_scopeId2}>Delegated SCA api-guide</a> for the full flow and mandatory Risk fields.`);
                } else {
                  return [
                    createTextVNode("The nature of this payment means the Risk fields a TPP provides for Delegated SCA payments are different to other payment types — see the "),
                    createVNode("a", { href: "/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/delegated-sca/api-guide" }, "Delegated SCA api-guide"),
                    createTextVNode(" for the full flow and mandatory Risk fields.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Default flow:"),
                    createTextVNode(" The LFI authenticates the user at each step of the consent journey and SCA for the payment itself.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "With Delegated SCA:"),
                    createTextVNode(" The TPP has already performed SCA at its own surface (biometrics, secure enclave, MFA) and asserts this to the LFI via a fully-populated "),
                    createVNode("code", null, "Risk.DebtorIndicators.Authentication"),
                    createTextVNode(" block on every "),
                    createVNode("code", null, "POST /par"),
                    createTextVNode(" and "),
                    createVNode("code", null, "POST /payments"),
                    createTextVNode(".")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("strong", null, "When to use:"),
                  createTextVNode(" Apps that already run a compliant SCA flow on the user's device at the point of every payment, so do not need to rely on the other control parameters.")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("The nature of this payment means the Risk fields a TPP provides for Delegated SCA payments are different to other payment types — see the "),
                  createVNode("a", { href: "/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/delegated-sca/api-guide" }, "Delegated SCA api-guide"),
                  createTextVNode(" for the full flow and mandatory Risk fields.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "pitfalls",
        num: "05",
        color: "var(--at-teal-deep)",
        eyebrow: "Common pitfalls",
        title: "The four most frequent confusions",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-0d483e3a${_scopeId}>Treating <code data-v-0d483e3a${_scopeId}>PeriodicSchedule.PeriodType</code> as a cadence on on-demand variants</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`On <code data-v-0d483e3a${_scopeId2}>FixedOnDemand</code> and <code data-v-0d483e3a${_scopeId2}>VariableOnDemand</code>, <code data-v-0d483e3a${_scopeId2}>PeriodType</code> is a <strong data-v-0d483e3a${_scopeId2}>cap reference window</strong>, not a recurrence schedule. The TPP still triggers every payment.`);
                } else {
                  return [
                    createTextVNode("On "),
                    createVNode("code", null, "FixedOnDemand"),
                    createTextVNode(" and "),
                    createVNode("code", null, "VariableOnDemand"),
                    createTextVNode(", "),
                    createVNode("code", null, "PeriodType"),
                    createTextVNode(" is a "),
                    createVNode("strong", null, "cap reference window"),
                    createTextVNode(", not a recurrence schedule. The TPP still triggers every payment.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-0d483e3a${_scopeId}>Picking <code data-v-0d483e3a${_scopeId}>FixedDefinedSchedule</code> when dates are known but amounts aren&#39;t</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`If amounts may vary per date, use <code data-v-0d483e3a${_scopeId2}>VariableDefinedSchedule</code> with a <code data-v-0d483e3a${_scopeId2}>MaximumIndividualAmount</code> per entry — <code data-v-0d483e3a${_scopeId2}>FixedDefinedSchedule</code> locks the amount up front and the LFI will reject any payment for a different value.`);
                } else {
                  return [
                    createTextVNode("If amounts may vary per date, use "),
                    createVNode("code", null, "VariableDefinedSchedule"),
                    createTextVNode(" with a "),
                    createVNode("code", null, "MaximumIndividualAmount"),
                    createTextVNode(" per entry — "),
                    createVNode("code", null, "FixedDefinedSchedule"),
                    createTextVNode(" locks the amount up front and the LFI will reject any payment for a different value.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-0d483e3a${_scopeId}>Assuming <code data-v-0d483e3a${_scopeId}>PeriodicSchedule</code> means &quot;periodic payments&quot;</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`The object is named for its role in the schema, not its semantics in every variant. For <code data-v-0d483e3a${_scopeId2}>OnDemand</code> variants it governs caps; for <code data-v-0d483e3a${_scopeId2}>PeriodicSchedule</code> variants it governs cadence; for <code data-v-0d483e3a${_scopeId2}>DefinedSchedule</code> variants it carries the date list.`);
                } else {
                  return [
                    createTextVNode("The object is named for its role in the schema, not its semantics in every variant. For "),
                    createVNode("code", null, "OnDemand"),
                    createTextVNode(" variants it governs caps; for "),
                    createVNode("code", null, "PeriodicSchedule"),
                    createTextVNode(" variants it governs cadence; for "),
                    createVNode("code", null, "DefinedSchedule"),
                    createTextVNode(" variants it carries the date list.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-0d483e3a${_scopeId}>Setting the <code data-v-0d483e3a${_scopeId}>Type</code> on the wrong object</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`The OpenAPI discriminator is on <code data-v-0d483e3a${_scopeId2}>PeriodicSchedule.Type</code> (e.g. <code data-v-0d483e3a${_scopeId2}>&quot;FixedOnDemand&quot;</code>), <strong data-v-0d483e3a${_scopeId2}>not</strong> on <code data-v-0d483e3a${_scopeId2}>MultiPayment.Type</code>. A mis-placed discriminator is rejected with <code data-v-0d483e3a${_scopeId2}>400 invalid_message_format</code>.`);
                } else {
                  return [
                    createTextVNode("The OpenAPI discriminator is on "),
                    createVNode("code", null, "PeriodicSchedule.Type"),
                    createTextVNode(" (e.g. "),
                    createVNode("code", null, '"FixedOnDemand"'),
                    createTextVNode("), "),
                    createVNode("strong", null, "not"),
                    createTextVNode(" on "),
                    createVNode("code", null, "MultiPayment.Type"),
                    createTextVNode(". A mis-placed discriminator is rejected with "),
                    createVNode("code", null, "400 invalid_message_format"),
                    createTextVNode(".")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, [
                createTextVNode("Treating "),
                createVNode("code", null, "PeriodicSchedule.PeriodType"),
                createTextVNode(" as a cadence on on-demand variants")
              ]),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("On "),
                  createVNode("code", null, "FixedOnDemand"),
                  createTextVNode(" and "),
                  createVNode("code", null, "VariableOnDemand"),
                  createTextVNode(", "),
                  createVNode("code", null, "PeriodType"),
                  createTextVNode(" is a "),
                  createVNode("strong", null, "cap reference window"),
                  createTextVNode(", not a recurrence schedule. The TPP still triggers every payment.")
                ]),
                _: 1
              }),
              createVNode("h3", null, [
                createTextVNode("Picking "),
                createVNode("code", null, "FixedDefinedSchedule"),
                createTextVNode(" when dates are known but amounts aren't")
              ]),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("If amounts may vary per date, use "),
                  createVNode("code", null, "VariableDefinedSchedule"),
                  createTextVNode(" with a "),
                  createVNode("code", null, "MaximumIndividualAmount"),
                  createTextVNode(" per entry — "),
                  createVNode("code", null, "FixedDefinedSchedule"),
                  createTextVNode(" locks the amount up front and the LFI will reject any payment for a different value.")
                ]),
                _: 1
              }),
              createVNode("h3", null, [
                createTextVNode("Assuming "),
                createVNode("code", null, "PeriodicSchedule"),
                createTextVNode(' means "periodic payments"')
              ]),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("The object is named for its role in the schema, not its semantics in every variant. For "),
                  createVNode("code", null, "OnDemand"),
                  createTextVNode(" variants it governs caps; for "),
                  createVNode("code", null, "PeriodicSchedule"),
                  createTextVNode(" variants it governs cadence; for "),
                  createVNode("code", null, "DefinedSchedule"),
                  createTextVNode(" variants it carries the date list.")
                ]),
                _: 1
              }),
              createVNode("h3", null, [
                createTextVNode("Setting the "),
                createVNode("code", null, "Type"),
                createTextVNode(" on the wrong object")
              ]),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("The OpenAPI discriminator is on "),
                  createVNode("code", null, "PeriodicSchedule.Type"),
                  createTextVNode(" (e.g. "),
                  createVNode("code", null, '"FixedOnDemand"'),
                  createTextVNode("), "),
                  createVNode("strong", null, "not"),
                  createTextVNode(" on "),
                  createVNode("code", null, "MultiPayment.Type"),
                  createTextVNode(". A mis-placed discriminator is rejected with "),
                  createVNode("code", null, "400 invalid_message_format"),
                  createTextVNode(".")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdRelatedCards, {
        eyebrow: "Related articles",
        title: "Read alongside"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdRelatedCard, {
              href: "/knowledge-base/articles/payment-account-permissions",
              category: "Payments",
              "category-color": "var(--at-gold)",
              title: "Account Permissions in a Payment Consent",
              desc: "Reading payer accounts and balances under a payment consent."
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRelatedCard, {
              href: "/knowledge-base/articles/pii-encryption",
              category: "Security",
              "category-color": "var(--at-blue)",
              title: "Payment PII Encryption",
              desc: "Why PII in payment consents is encrypted end-to-end."
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdRelatedCard, {
                href: "/knowledge-base/articles/payment-account-permissions",
                category: "Payments",
                "category-color": "var(--at-gold)",
                title: "Account Permissions in a Payment Consent",
                desc: "Reading payer accounts and balances under a payment consent."
              }),
              createVNode(_component_EdRelatedCard, {
                href: "/knowledge-base/articles/pii-encryption",
                category: "Security",
                "category-color": "var(--at-blue)",
                title: "Payment PII Encryption",
                desc: "Why PII in payment consents is encrypted end-to-end."
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/knowledge-base/articles/choosing-a-payment-type.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const choosingAPaymentType = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0d483e3a"]]);
export {
  choosingAPaymentType as default
};
