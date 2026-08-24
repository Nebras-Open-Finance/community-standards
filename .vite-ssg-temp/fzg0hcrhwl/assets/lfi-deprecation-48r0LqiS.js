import { _ as __unplugin_components_0, a as __unplugin_components_2, b as __unplugin_components_6$1, c as __unplugin_components_7$1 } from "./EdBackStrip-COkyNhGh.js";
import { _ as __unplugin_components_7, a as __unplugin_components_8 } from "./EdStages-NkJQJXq7.js";
import { _ as __unplugin_components_6 } from "./EdExample-DPMgFk_O.js";
import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { _ as __unplugin_components_0$1 } from "./EdHero-DawHPCxB.js";
import { defineComponent, mergeProps, withCtx, createTextVNode, createVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "lfi-deprecation",
  __ssrInlineRender: true,
  setup(__props) {
    const sections = [
      { id: "scope", label: "Scope" },
      { id: "dual-running", label: "Dual-running" },
      { id: "process", label: "Process" },
      { id: "managed", label: "Nebras-managed" },
      { id: "support", label: "Operational support" },
      { id: "governance", label: "Governance" }
    ];
    const meta = [
      { label: "Applies to", value: "LFIs · Integrators · Nebras" },
      { label: "Read", value: "6 min" },
      { label: "Updated", value: "21 Apr 2026" }
    ];
    const keyNums = [
      { value: "5", unit: "phases", label: "Structured deprecation pipeline" },
      { value: "12", unit: "mo", label: "Sunset window after restriction" },
      { value: "17", unit: "mo+", label: "Total transition envelope" }
    ];
    const milestones = [
      { stage: "Day 0", label: "New version goes live; formal communication issued" },
      { stage: "Month 3", label: "First migration status report to Nebras" },
      { stage: "Month 5", label: "Second migration status report to Nebras" },
      { stage: "Month 5+", label: "Restriction of new consents on prior version (Nebras approval required)" },
      { stage: "Month 17+", label: "Prior version sunset (all prior version consents expired)" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdBackStrip = __unplugin_components_0;
      const _component_EdHero = __unplugin_components_0$1;
      const _component_EdInPageNav = __unplugin_components_2;
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdBullets = __unplugin_components_5;
      const _component_EdExample = __unplugin_components_6;
      const _component_EdStages = __unplugin_components_7;
      const _component_EdStage = __unplugin_components_8;
      const _component_EdRelatedCards = __unplugin_components_6$1;
      const _component_EdRelatedCard = __unplugin_components_7$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-page" }, _attrs))} data-v-488bd35f>`);
      _push(ssrRenderComponent(_component_EdBackStrip, {
        href: "/policy/",
        text: "All policies"
      }, null, _parent));
      _push(ssrRenderComponent(_component_EdHero, {
        eyebrow: "Govern · Operate · Evolve",
        title: "Major Version Deprecation Policy",
        meta,
        lede: "Defines the dual-running and deprecation requirements LFIs must follow when a new major version of the Open Finance standard is introduced — protecting TPPs and their customers from disruption while the ecosystem moves forward.",
        "key-nums": keyNums
      }, null, _parent));
      _push(ssrRenderComponent(_component_EdInPageNav, { sections }, null, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "scope",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Scope",
        title: "What this policy covers",
        lede: "Applies to all LFIs operating within the UAE Open Finance ecosystem, covering major version transitions of the LFI API Hub implementation, the dual-running period, and the formal deprecation process.",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-488bd35f${_scopeId}>When dual-running does not apply</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Where an LFI implements the API for the first time, only a single version is required initially. There is no expectation to support dual-running before a prior version exists.`);
                } else {
                  return [
                    createTextVNode("Where an LFI implements the API for the first time, only a single version is required initially. There is no expectation to support dual-running before a prior version exists.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`There is also no expectation for LFIs to implement dual-running or formal deprecation processes for:`);
                } else {
                  return [
                    createTextVNode("There is also no expectation for LFIs to implement dual-running or formal deprecation processes for:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-488bd35f${_scopeId2}><strong data-v-488bd35f${_scopeId2}>Minor (non-breaking) API version updates</strong></li><li data-v-488bd35f${_scopeId2}><strong data-v-488bd35f${_scopeId2}>Errata or corrective changes</strong></li><li data-v-488bd35f${_scopeId2}><strong data-v-488bd35f${_scopeId2}>UI components or presentation-layer changes</strong></li><li data-v-488bd35f${_scopeId2}><strong data-v-488bd35f${_scopeId2}>Downstream system or internal implementation changes</strong></li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Minor (non-breaking) API version updates")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Errata or corrective changes")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "UI components or presentation-layer changes")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Downstream system or internal implementation changes")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`These changes are expected to be backward compatible and managed without requiring concurrent version support.`);
                } else {
                  return [
                    createTextVNode("These changes are expected to be backward compatible and managed without requiring concurrent version support.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, "When dual-running does not apply"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Where an LFI implements the API for the first time, only a single version is required initially. There is no expectation to support dual-running before a prior version exists.")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("There is also no expectation for LFIs to implement dual-running or formal deprecation processes for:")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Minor (non-breaking) API version updates")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Errata or corrective changes")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "UI components or presentation-layer changes")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Downstream system or internal implementation changes")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("These changes are expected to be backward compatible and managed without requiring concurrent version support.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "dual-running",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "Dual-running",
        title: "Operating two versions in parallel",
        lede: "When an LFI is ready to go live with a new major version (e.g. Vx.y → Vz.0), it <strong>must</strong> operate both the prior and new version concurrently for the duration of the deprecation window.",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-488bd35f${_scopeId}>How dual-running works</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-488bd35f${_scopeId2}>Deploy two active versions of their API Hub implementation simultaneously (e.g. V1.x and V2.0)</li><li data-v-488bd35f${_scopeId2}>Route incoming API requests to the correct implementation based on the version the TPP requested — currently via the <code data-v-488bd35f${_scopeId2}>o3-api-uri</code> header</li><li data-v-488bd35f${_scopeId2}>Ensure each implementation is independently maintained and supported, with no cross-version dependencies that could cause instability</li>`);
                } else {
                  return [
                    createVNode("li", null, "Deploy two active versions of their API Hub implementation simultaneously (e.g. V1.x and V2.0)"),
                    createVNode("li", null, [
                      createTextVNode("Route incoming API requests to the correct implementation based on the version the TPP requested — currently via the "),
                      createVNode("code", null, "o3-api-uri"),
                      createTextVNode(" header")
                    ]),
                    createVNode("li", null, "Ensure each implementation is independently maintained and supported, with no cross-version dependencies that could cause instability")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Both implementations must remain fully functional and compliant with their respective standards throughout the dual-running period.`);
                } else {
                  return [
                    createTextVNode("Both implementations must remain fully functional and compliant with their respective standards throughout the dual-running period.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdExample, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-488bd35f${_scopeId2}>An LFI running V1.2 and V2.1 simultaneously would route a request to <code data-v-488bd35f${_scopeId2}>https://api.bank.ae/open-finance/v1.2/accounts</code> to the V1.2 implementation, and a request to <code data-v-488bd35f${_scopeId2}>https://api.bank.ae/open-finance/v2.1/accounts</code> to the V2.1 implementation.</p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode("An LFI running V1.2 and V2.1 simultaneously would route a request to "),
                      createVNode("code", null, "https://api.bank.ae/open-finance/v1.2/accounts"),
                      createTextVNode(" to the V1.2 implementation, and a request to "),
                      createVNode("code", null, "https://api.bank.ae/open-finance/v2.1/accounts"),
                      createTextVNode(" to the V2.1 implementation.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, "How dual-running works"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Deploy two active versions of their API Hub implementation simultaneously (e.g. V1.x and V2.0)"),
                  createVNode("li", null, [
                    createTextVNode("Route incoming API requests to the correct implementation based on the version the TPP requested — currently via the "),
                    createVNode("code", null, "o3-api-uri"),
                    createTextVNode(" header")
                  ]),
                  createVNode("li", null, "Ensure each implementation is independently maintained and supported, with no cross-version dependencies that could cause instability")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Both implementations must remain fully functional and compliant with their respective standards throughout the dual-running period.")
                ]),
                _: 1
              }),
              createVNode(_component_EdExample, null, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode("An LFI running V1.2 and V2.1 simultaneously would route a request to "),
                    createVNode("code", null, "https://api.bank.ae/open-finance/v1.2/accounts"),
                    createTextVNode(" to the V1.2 implementation, and a request to "),
                    createVNode("code", null, "https://api.bank.ae/open-finance/v2.1/accounts"),
                    createTextVNode(" to the V2.1 implementation.")
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
        id: "process",
        num: "03",
        color: "var(--at-blue)",
        eyebrow: "Deprecation process",
        title: "The five-phase deprecation pipeline",
        lede: "The deprecation of a prior version follows a structured timeline to protect TPPs and their customers from unplanned disruption.",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdStages, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "01",
                    title: "Launch and communication",
                    "num-color": "var(--at-blue)"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-488bd35f${_scopeId3}><strong data-v-488bd35f${_scopeId3}>Stand up the new version</strong> — The LFI deploys and validates the new major version of their API Hub implementation in production.</p><p data-v-488bd35f${_scopeId3}><strong data-v-488bd35f${_scopeId3}>Validate readiness</strong> — The LFI confirms the new version is functioning correctly, including end-to-end consent flows, data sharing, and service initiation (as applicable).</p><p data-v-488bd35f${_scopeId3}><strong data-v-488bd35f${_scopeId3}>Formal communication via Nebras</strong> — Nebras issues a formal ecosystem-wide communication informing all TPPs that the new version is available, that they are expected to begin migrating, and that the prior version will be deprecated in accordance with this policy.</p>`);
                      } else {
                        return [
                          createVNode("p", null, [
                            createVNode("strong", null, "Stand up the new version"),
                            createTextVNode(" — The LFI deploys and validates the new major version of their API Hub implementation in production.")
                          ]),
                          createVNode("p", null, [
                            createVNode("strong", null, "Validate readiness"),
                            createTextVNode(" — The LFI confirms the new version is functioning correctly, including end-to-end consent flows, data sharing, and service initiation (as applicable).")
                          ]),
                          createVNode("p", null, [
                            createVNode("strong", null, "Formal communication via Nebras"),
                            createTextVNode(" — Nebras issues a formal ecosystem-wide communication informing all TPPs that the new version is available, that they are expected to begin migrating, and that the prior version will be deprecated in accordance with this policy.")
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "02",
                    title: "Migration monitoring (Months 1–3)",
                    "num-color": "var(--at-blue)"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-488bd35f${_scopeId3}>From the date of the formal communication, LFIs must actively monitor the creation of new consents across both versions.</p><p data-v-488bd35f${_scopeId3}>At the <strong data-v-488bd35f${_scopeId3}>3-month mark</strong>, LFIs must report to Nebras on the status of TPP migration, specifically identifying any TPPs that are still raising new consents on the prior version. Nebras will use this information to engage directly with non-migrated TPPs.</p>`);
                      } else {
                        return [
                          createVNode("p", null, "From the date of the formal communication, LFIs must actively monitor the creation of new consents across both versions."),
                          createVNode("p", null, [
                            createTextVNode("At the "),
                            createVNode("strong", null, "3-month mark"),
                            createTextVNode(", LFIs must report to Nebras on the status of TPP migration, specifically identifying any TPPs that are still raising new consents on the prior version. Nebras will use this information to engage directly with non-migrated TPPs.")
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "03",
                    title: "Final migration window (Months 4–5)",
                    "num-color": "var(--at-blue)"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-488bd35f${_scopeId3}>A further 2-month window is provided for remaining TPPs to complete migration.</p><p data-v-488bd35f${_scopeId3}>At the <strong data-v-488bd35f${_scopeId3}>5-month mark</strong>, LFIs must again report to Nebras identifying any TPPs still raising new consents on the prior version. If no new consents are being raised on the prior version at this point, the LFI may request Nebras approval to proceed to Phase 4.</p>`);
                      } else {
                        return [
                          createVNode("p", null, "A further 2-month window is provided for remaining TPPs to complete migration."),
                          createVNode("p", null, [
                            createTextVNode("At the "),
                            createVNode("strong", null, "5-month mark"),
                            createTextVNode(", LFIs must again report to Nebras identifying any TPPs still raising new consents on the prior version. If no new consents are being raised on the prior version at this point, the LFI may request Nebras approval to proceed to Phase 4.")
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "04",
                    title: "Restricting new consents on prior version",
                    "num-color": "var(--at-blue)"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-488bd35f${_scopeId3}>With Nebras approval, the LFI may <strong data-v-488bd35f${_scopeId3}>restrict the creation of new consents</strong> on the prior version. This means:</p>`);
                        _push4(ssrRenderComponent(_component_EdBullets, { tight: "" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<li data-v-488bd35f${_scopeId4}>Existing consents on the prior version remain valid and must continue to be honoured</li><li data-v-488bd35f${_scopeId4}>No new consent journeys can be initiated against the prior version</li><li data-v-488bd35f${_scopeId4}>TPPs with active consents on the prior version may continue to exercise those consents until they expire</li>`);
                            } else {
                              return [
                                createVNode("li", null, "Existing consents on the prior version remain valid and must continue to be honoured"),
                                createVNode("li", null, "No new consent journeys can be initiated against the prior version"),
                                createVNode("li", null, "TPPs with active consents on the prior version may continue to exercise those consents until they expire")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode("p", null, [
                            createTextVNode("With Nebras approval, the LFI may "),
                            createVNode("strong", null, "restrict the creation of new consents"),
                            createTextVNode(" on the prior version. This means:")
                          ]),
                          createVNode(_component_EdBullets, { tight: "" }, {
                            default: withCtx(() => [
                              createVNode("li", null, "Existing consents on the prior version remain valid and must continue to be honoured"),
                              createVNode("li", null, "No new consent journeys can be initiated against the prior version"),
                              createVNode("li", null, "TPPs with active consents on the prior version may continue to exercise those consents until they expire")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "05",
                    title: "Sunset of prior version",
                    "num-color": "var(--at-blue)"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-488bd35f${_scopeId3}>From the point at which new consent creation is restricted, the prior version must remain operational for a further <strong data-v-488bd35f${_scopeId3}>12 months</strong>, providing sufficient time for all existing consents on the prior version to expire naturally.</p><p data-v-488bd35f${_scopeId3}>After this 12-month period, and once Nebras confirms that no active consents remain on the prior version, the LFI may decommission the prior version entirely.</p>`);
                      } else {
                        return [
                          createVNode("p", null, [
                            createTextVNode("From the point at which new consent creation is restricted, the prior version must remain operational for a further "),
                            createVNode("strong", null, "12 months"),
                            createTextVNode(", providing sufficient time for all existing consents on the prior version to expire naturally.")
                          ]),
                          createVNode("p", null, "After this 12-month period, and once Nebras confirms that no active consents remain on the prior version, the LFI may decommission the prior version entirely.")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_EdStage, {
                      num: "01",
                      title: "Launch and communication",
                      "num-color": "var(--at-blue)"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, [
                          createVNode("strong", null, "Stand up the new version"),
                          createTextVNode(" — The LFI deploys and validates the new major version of their API Hub implementation in production.")
                        ]),
                        createVNode("p", null, [
                          createVNode("strong", null, "Validate readiness"),
                          createTextVNode(" — The LFI confirms the new version is functioning correctly, including end-to-end consent flows, data sharing, and service initiation (as applicable).")
                        ]),
                        createVNode("p", null, [
                          createVNode("strong", null, "Formal communication via Nebras"),
                          createTextVNode(" — Nebras issues a formal ecosystem-wide communication informing all TPPs that the new version is available, that they are expected to begin migrating, and that the prior version will be deprecated in accordance with this policy.")
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_EdStage, {
                      num: "02",
                      title: "Migration monitoring (Months 1–3)",
                      "num-color": "var(--at-blue)"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, "From the date of the formal communication, LFIs must actively monitor the creation of new consents across both versions."),
                        createVNode("p", null, [
                          createTextVNode("At the "),
                          createVNode("strong", null, "3-month mark"),
                          createTextVNode(", LFIs must report to Nebras on the status of TPP migration, specifically identifying any TPPs that are still raising new consents on the prior version. Nebras will use this information to engage directly with non-migrated TPPs.")
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_EdStage, {
                      num: "03",
                      title: "Final migration window (Months 4–5)",
                      "num-color": "var(--at-blue)"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, "A further 2-month window is provided for remaining TPPs to complete migration."),
                        createVNode("p", null, [
                          createTextVNode("At the "),
                          createVNode("strong", null, "5-month mark"),
                          createTextVNode(", LFIs must again report to Nebras identifying any TPPs still raising new consents on the prior version. If no new consents are being raised on the prior version at this point, the LFI may request Nebras approval to proceed to Phase 4.")
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_EdStage, {
                      num: "04",
                      title: "Restricting new consents on prior version",
                      "num-color": "var(--at-blue)"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, [
                          createTextVNode("With Nebras approval, the LFI may "),
                          createVNode("strong", null, "restrict the creation of new consents"),
                          createTextVNode(" on the prior version. This means:")
                        ]),
                        createVNode(_component_EdBullets, { tight: "" }, {
                          default: withCtx(() => [
                            createVNode("li", null, "Existing consents on the prior version remain valid and must continue to be honoured"),
                            createVNode("li", null, "No new consent journeys can be initiated against the prior version"),
                            createVNode("li", null, "TPPs with active consents on the prior version may continue to exercise those consents until they expire")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_EdStage, {
                      num: "05",
                      title: "Sunset of prior version",
                      "num-color": "var(--at-blue)"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, [
                          createTextVNode("From the point at which new consent creation is restricted, the prior version must remain operational for a further "),
                          createVNode("strong", null, "12 months"),
                          createTextVNode(", providing sufficient time for all existing consents on the prior version to expire naturally.")
                        ]),
                        createVNode("p", null, "After this 12-month period, and once Nebras confirms that no active consents remain on the prior version, the LFI may decommission the prior version entirely.")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-488bd35f${_scopeId}>Milestone summary</h3><div class="ed-milestones" data-v-488bd35f${_scopeId}><!--[-->`);
            ssrRenderList(milestones, (m) => {
              _push2(`<div class="ed-milestone" data-v-488bd35f${_scopeId}><span class="ed-milestone__stage" data-v-488bd35f${_scopeId}>${ssrInterpolate(m.stage)}</span><span class="ed-milestone__label" data-v-488bd35f${_scopeId}>${ssrInterpolate(m.label)}</span></div>`);
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode(_component_EdStages, null, {
                default: withCtx(() => [
                  createVNode(_component_EdStage, {
                    num: "01",
                    title: "Launch and communication",
                    "num-color": "var(--at-blue)"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, [
                        createVNode("strong", null, "Stand up the new version"),
                        createTextVNode(" — The LFI deploys and validates the new major version of their API Hub implementation in production.")
                      ]),
                      createVNode("p", null, [
                        createVNode("strong", null, "Validate readiness"),
                        createTextVNode(" — The LFI confirms the new version is functioning correctly, including end-to-end consent flows, data sharing, and service initiation (as applicable).")
                      ]),
                      createVNode("p", null, [
                        createVNode("strong", null, "Formal communication via Nebras"),
                        createTextVNode(" — Nebras issues a formal ecosystem-wide communication informing all TPPs that the new version is available, that they are expected to begin migrating, and that the prior version will be deprecated in accordance with this policy.")
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_EdStage, {
                    num: "02",
                    title: "Migration monitoring (Months 1–3)",
                    "num-color": "var(--at-blue)"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, "From the date of the formal communication, LFIs must actively monitor the creation of new consents across both versions."),
                      createVNode("p", null, [
                        createTextVNode("At the "),
                        createVNode("strong", null, "3-month mark"),
                        createTextVNode(", LFIs must report to Nebras on the status of TPP migration, specifically identifying any TPPs that are still raising new consents on the prior version. Nebras will use this information to engage directly with non-migrated TPPs.")
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_EdStage, {
                    num: "03",
                    title: "Final migration window (Months 4–5)",
                    "num-color": "var(--at-blue)"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, "A further 2-month window is provided for remaining TPPs to complete migration."),
                      createVNode("p", null, [
                        createTextVNode("At the "),
                        createVNode("strong", null, "5-month mark"),
                        createTextVNode(", LFIs must again report to Nebras identifying any TPPs still raising new consents on the prior version. If no new consents are being raised on the prior version at this point, the LFI may request Nebras approval to proceed to Phase 4.")
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_EdStage, {
                    num: "04",
                    title: "Restricting new consents on prior version",
                    "num-color": "var(--at-blue)"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, [
                        createTextVNode("With Nebras approval, the LFI may "),
                        createVNode("strong", null, "restrict the creation of new consents"),
                        createTextVNode(" on the prior version. This means:")
                      ]),
                      createVNode(_component_EdBullets, { tight: "" }, {
                        default: withCtx(() => [
                          createVNode("li", null, "Existing consents on the prior version remain valid and must continue to be honoured"),
                          createVNode("li", null, "No new consent journeys can be initiated against the prior version"),
                          createVNode("li", null, "TPPs with active consents on the prior version may continue to exercise those consents until they expire")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_EdStage, {
                    num: "05",
                    title: "Sunset of prior version",
                    "num-color": "var(--at-blue)"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, [
                        createTextVNode("From the point at which new consent creation is restricted, the prior version must remain operational for a further "),
                        createVNode("strong", null, "12 months"),
                        createTextVNode(", providing sufficient time for all existing consents on the prior version to expire naturally.")
                      ]),
                      createVNode("p", null, "After this 12-month period, and once Nebras confirms that no active consents remain on the prior version, the LFI may decommission the prior version entirely.")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode("h3", null, "Milestone summary"),
              createVNode("div", { class: "ed-milestones" }, [
                (openBlock(), createBlock(Fragment, null, renderList(milestones, (m) => {
                  return createVNode("div", {
                    key: m.stage,
                    class: "ed-milestone"
                  }, [
                    createVNode("span", { class: "ed-milestone__stage" }, toDisplayString(m.stage), 1),
                    createVNode("span", { class: "ed-milestone__label" }, toDisplayString(m.label), 1)
                  ]);
                }), 64))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "managed",
        num: "04",
        color: "var(--at-blue-deep)",
        eyebrow: "Nebras-managed",
        title: "Where TPPs do not migrate by the six-month mark",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Where TPPs have not completed migration to the new version by the <strong data-v-488bd35f${_scopeId2}>6-month mark</strong> from the date of formal communication, Nebras will take an active role in managing the deprecation.`);
                } else {
                  return [
                    createTextVNode("Where TPPs have not completed migration to the new version by the "),
                    createVNode("strong", null, "6-month mark"),
                    createTextVNode(" from the date of formal communication, Nebras will take an active role in managing the deprecation.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-488bd35f${_scopeId2}>Directly engaging with non-migrated TPPs to understand technical or operational blockers</li><li data-v-488bd35f${_scopeId2}>Setting individual migration deadlines for non-migrated TPPs, with formal written notice</li><li data-v-488bd35f${_scopeId2}>Escalating persistent non-compliance to the relevant regulatory authority where appropriate</li><li data-v-488bd35f${_scopeId2}>Coordinating with the LFI to ensure migration support is available to affected TPPs</li><li data-v-488bd35f${_scopeId2}>Retaining oversight of the LFI&#39;s deprecation timeline and adjusting it where necessary to protect TPPs and their customers</li>`);
                } else {
                  return [
                    createVNode("li", null, "Directly engaging with non-migrated TPPs to understand technical or operational blockers"),
                    createVNode("li", null, "Setting individual migration deadlines for non-migrated TPPs, with formal written notice"),
                    createVNode("li", null, "Escalating persistent non-compliance to the relevant regulatory authority where appropriate"),
                    createVNode("li", null, "Coordinating with the LFI to ensure migration support is available to affected TPPs"),
                    createVNode("li", null, "Retaining oversight of the LFI's deprecation timeline and adjusting it where necessary to protect TPPs and their customers")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`LFIs must provide Nebras with any data or reporting required to support this process.`);
                } else {
                  return [
                    createTextVNode("LFIs must provide Nebras with any data or reporting required to support this process.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Where TPPs have not completed migration to the new version by the "),
                  createVNode("strong", null, "6-month mark"),
                  createTextVNode(" from the date of formal communication, Nebras will take an active role in managing the deprecation.")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Directly engaging with non-migrated TPPs to understand technical or operational blockers"),
                  createVNode("li", null, "Setting individual migration deadlines for non-migrated TPPs, with formal written notice"),
                  createVNode("li", null, "Escalating persistent non-compliance to the relevant regulatory authority where appropriate"),
                  createVNode("li", null, "Coordinating with the LFI to ensure migration support is available to affected TPPs"),
                  createVNode("li", null, "Retaining oversight of the LFI's deprecation timeline and adjusting it where necessary to protect TPPs and their customers")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("LFIs must provide Nebras with any data or reporting required to support this process.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "support",
        num: "05",
        color: "var(--at-navy)",
        eyebrow: "Operational support",
        title: "Sustaining both versions during the transition",
        lede: "LFIs are expected to maintain appropriate operational support for both versions throughout the dual-running period.",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-488bd35f${_scopeId2}><strong data-v-488bd35f${_scopeId2}>Incident management</strong> — Both API versions must be covered by the LFI&#39;s standard incident management and response procedures, with equivalent SLAs applied to both</li><li data-v-488bd35f${_scopeId2}><strong data-v-488bd35f${_scopeId2}>Monitoring and alerting</strong> — LFIs must maintain active monitoring across both API versions, including availability, error rates, and latency</li><li data-v-488bd35f${_scopeId2}><strong data-v-488bd35f${_scopeId2}>Change management</strong> — Any changes to either version during the dual-running period must be assessed for impact on the other version and communicated to Nebras in accordance with standard change management procedures</li><li data-v-488bd35f${_scopeId2}><strong data-v-488bd35f${_scopeId2}>TPP support</strong> — LFIs must be able to provide technical support to TPPs migrating between versions, including guidance on breaking changes and access to sandbox environments running both versions</li><li data-v-488bd35f${_scopeId2}><strong data-v-488bd35f${_scopeId2}>Consent data integrity</strong> — LFIs must ensure that consent records associated with the prior version are preserved and remain accessible for the full duration of those consents&#39; validity, regardless of the deprecation status of the API version</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Incident management"),
                      createTextVNode(" — Both API versions must be covered by the LFI's standard incident management and response procedures, with equivalent SLAs applied to both")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Monitoring and alerting"),
                      createTextVNode(" — LFIs must maintain active monitoring across both API versions, including availability, error rates, and latency")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Change management"),
                      createTextVNode(" — Any changes to either version during the dual-running period must be assessed for impact on the other version and communicated to Nebras in accordance with standard change management procedures")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "TPP support"),
                      createTextVNode(" — LFIs must be able to provide technical support to TPPs migrating between versions, including guidance on breaking changes and access to sandbox environments running both versions")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Consent data integrity"),
                      createTextVNode(" — LFIs must ensure that consent records associated with the prior version are preserved and remain accessible for the full duration of those consents' validity, regardless of the deprecation status of the API version")
                    ])
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
                    createVNode("strong", null, "Incident management"),
                    createTextVNode(" — Both API versions must be covered by the LFI's standard incident management and response procedures, with equivalent SLAs applied to both")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Monitoring and alerting"),
                    createTextVNode(" — LFIs must maintain active monitoring across both API versions, including availability, error rates, and latency")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Change management"),
                    createTextVNode(" — Any changes to either version during the dual-running period must be assessed for impact on the other version and communicated to Nebras in accordance with standard change management procedures")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "TPP support"),
                    createTextVNode(" — LFIs must be able to provide technical support to TPPs migrating between versions, including guidance on breaking changes and access to sandbox environments running both versions")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Consent data integrity"),
                    createTextVNode(" — LFIs must ensure that consent records associated with the prior version are preserved and remain accessible for the full duration of those consents' validity, regardless of the deprecation status of the API version")
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
        id: "governance",
        num: "06",
        color: "var(--at-teal-deep)",
        eyebrow: "Compliance & governance",
        title: "Adherence and Nebras discretion",
        tone: "surface",
        narrow: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`LFIs are required to adhere to this policy for all major version transitions within the UAE Open Finance ecosystem. Failure to comply, including failure to dual-run versions during the transition period or failure to report migration status to Nebras, may result in regulatory escalation.`);
                } else {
                  return [
                    createTextVNode("LFIs are required to adhere to this policy for all major version transitions within the UAE Open Finance ecosystem. Failure to comply, including failure to dual-run versions during the transition period or failure to report migration status to Nebras, may result in regulatory escalation.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Nebras reserves the right to adjust deprecation timelines in exceptional circumstances, including where ecosystem-wide migration issues are identified or where the interests of TPPs or their customers require additional protection.`);
                } else {
                  return [
                    createTextVNode("Nebras reserves the right to adjust deprecation timelines in exceptional circumstances, including where ecosystem-wide migration issues are identified or where the interests of TPPs or their customers require additional protection.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("LFIs are required to adhere to this policy for all major version transitions within the UAE Open Finance ecosystem. Failure to comply, including failure to dual-run versions during the transition period or failure to report migration status to Nebras, may result in regulatory escalation.")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Nebras reserves the right to adjust deprecation timelines in exceptional circumstances, including where ecosystem-wide migration issues are identified or where the interests of TPPs or their customers require additional protection.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdRelatedCards, {
        eyebrow: "Read alongside",
        title: "Related policies"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdRelatedCard, {
              href: "/policy/version-management",
              category: "Nebras",
              title: "Version Management Policy",
              desc: "The major and minor version cadence that triggers this deprecation pipeline."
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRelatedCard, {
              href: "/policy/changes-to-published-content",
              category: "Nebras",
              title: "Changes to Published Documentation Policy",
              desc: "How errata are issued during and after the dual-running window."
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdRelatedCard, {
                href: "/policy/version-management",
                category: "Nebras",
                title: "Version Management Policy",
                desc: "The major and minor version cadence that triggers this deprecation pipeline."
              }),
              createVNode(_component_EdRelatedCard, {
                href: "/policy/changes-to-published-content",
                category: "Nebras",
                title: "Changes to Published Documentation Policy",
                desc: "How errata are issued during and after the dual-running window."
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/policy/lfi-deprecation.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const lfiDeprecation = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-488bd35f"]]);
export {
  lfiDeprecation as default
};
