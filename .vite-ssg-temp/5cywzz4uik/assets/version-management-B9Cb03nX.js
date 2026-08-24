import { _ as __unplugin_components_0, a as __unplugin_components_2, b as __unplugin_components_6$2, c as __unplugin_components_7$2 } from "./EdBackStrip-COkyNhGh.js";
import { _ as __unplugin_components_4, a as __unplugin_components_13 } from "./EdPillList-CPl1guC3.js";
import { _ as __unplugin_components_7$1, a as __unplugin_components_8$1 } from "./EdStages-NkJQJXq7.js";
import { _ as __unplugin_components_6$1 } from "./EdExample-DPMgFk_O.js";
import { _ as __unplugin_components_4$1 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_7, a as __unplugin_components_8 } from "./EdCompareCards-BLuIwQN6.js";
import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_6 } from "./EdCallout-BDBcOaPe.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { _ as __unplugin_components_0$1 } from "./EdHero-DawHPCxB.js";
import { defineComponent, mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "version-management",
  __ssrInlineRender: true,
  setup(__props) {
    const sections = [
      { id: "scope", label: "Scope" },
      { id: "effective-scope", label: "Effective scope" },
      { id: "versioning", label: "Versioning" },
      { id: "system-ui", label: "System & UI" },
      { id: "release", label: "Release" },
      { id: "governance", label: "Governance" }
    ];
    const meta = [
      { label: "Applies to", value: "Nebras" },
      { label: "Read", value: "5 min" },
      { label: "Updated", value: "21 Apr 2026" },
      { label: "Effective from", value: "V2.1" }
    ];
    const keyNums = [
      { value: "18", unit: "mo", label: "Min. major-version cadence" },
      { value: "6", unit: "mo", label: "Min. minor-version cadence" }
    ];
    const scopeItems = [
      "API specifications",
      "UI components",
      "Downstream systems",
      "Consent objects",
      "Supporting documentation"
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdBackStrip = __unplugin_components_0;
      const _component_EdHero = __unplugin_components_0$1;
      const _component_EdInPageNav = __unplugin_components_2;
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdPillList = __unplugin_components_4;
      const _component_EdCallout = __unplugin_components_6;
      const _component_EdBullets = __unplugin_components_5;
      const _component_EdCompareCards = __unplugin_components_7;
      const _component_EdCompareCard = __unplugin_components_8;
      const _component_EdProse = __unplugin_components_4$1;
      const _component_EdExample = __unplugin_components_6$1;
      const _component_EdStages = __unplugin_components_7$1;
      const _component_EdStage = __unplugin_components_8$1;
      const _component_EdTwoCol = __unplugin_components_13;
      const _component_EdRelatedCards = __unplugin_components_6$2;
      const _component_EdRelatedCard = __unplugin_components_7$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-page" }, _attrs))} data-v-41cd0014>`);
      _push(ssrRenderComponent(_component_EdBackStrip, {
        href: "/policy/",
        text: "All policies"
      }, null, _parent));
      _push(ssrRenderComponent(_component_EdHero, {
        eyebrow: "Govern · Operate · Evolve",
        title: "Version Management Policy",
        meta,
        lede: "Defines how API specifications, UI components, and related standards are versioned for the UAE Open Finance ecosystem — major and minor cadence, errata constraints, and the stability guarantees that apply once a capability is declared <strong>Live</strong>.",
        "key-nums": keyNums
      }, null, _parent));
      _push(ssrRenderComponent(_component_EdInPageNav, { sections }, null, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "scope",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Scope",
        title: "What this policy governs",
        lede: "This policy applies to all Open Finance standards published within the UAE Open Finance ecosystem.",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdPillList, { items: scopeItems }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdPillList, { items: scopeItems })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "effective-scope",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "Effective scope",
        title: "When this policy takes effect",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdCallout, { color: "var(--at-gold)" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-41cd0014${_scopeId2}> This policy takes effect from <strong data-v-41cd0014${_scopeId2}>V2.1</strong> of the UAE Open Finance Standard. Standards, specifications, and documentation published prior to V2.1 — including V2.0 and any earlier errata — are not governed by this policy. Breaking changes introduced before V2.1 do not constitute non-compliance. </p><p data-v-41cd0014${_scopeId2}> The stability guarantees set out in this policy — in particular, the restriction of breaking changes to major version releases and the scope constraints on errata — apply only to <strong data-v-41cd0014${_scopeId2}>Live capabilities</strong>. A capability is Live when Nebras has formally declared it in production use within the UAE Open Finance ecosystem. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" This policy takes effect from "),
                      createVNode("strong", null, "V2.1"),
                      createTextVNode(" of the UAE Open Finance Standard. Standards, specifications, and documentation published prior to V2.1 — including V2.0 and any earlier errata — are not governed by this policy. Breaking changes introduced before V2.1 do not constitute non-compliance. ")
                    ]),
                    createVNode("p", null, [
                      createTextVNode(" The stability guarantees set out in this policy — in particular, the restriction of breaking changes to major version releases and the scope constraints on errata — apply only to "),
                      createVNode("strong", null, "Live capabilities"),
                      createTextVNode(". A capability is Live when Nebras has formally declared it in production use within the UAE Open Finance ecosystem. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-41cd0014${_scopeId}>Capabilities not yet declared Live</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-41cd0014${_scopeId2}>Breaking changes <strong data-v-41cd0014${_scopeId2}>MAY</strong> be introduced in minor versions or errata without requiring a major version increment</li><li data-v-41cd0014${_scopeId2}>The release cadence defined below continues to apply</li><li data-v-41cd0014${_scopeId2}>Once a capability is declared Live, all subsequent changes <strong data-v-41cd0014${_scopeId2}>MUST</strong> comply with this policy in full</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createTextVNode("Breaking changes "),
                      createVNode("strong", null, "MAY"),
                      createTextVNode(" be introduced in minor versions or errata without requiring a major version increment")
                    ]),
                    createVNode("li", null, "The release cadence defined below continues to apply"),
                    createVNode("li", null, [
                      createTextVNode("Once a capability is declared Live, all subsequent changes "),
                      createVNode("strong", null, "MUST"),
                      createTextVNode(" comply with this policy in full")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<p class="ed-aside" data-v-41cd0014${_scopeId}> Nebras is responsible for maintaining and publishing the register of Live capabilities. </p>`);
          } else {
            return [
              createVNode(_component_EdCallout, { color: "var(--at-gold)" }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" This policy takes effect from "),
                    createVNode("strong", null, "V2.1"),
                    createTextVNode(" of the UAE Open Finance Standard. Standards, specifications, and documentation published prior to V2.1 — including V2.0 and any earlier errata — are not governed by this policy. Breaking changes introduced before V2.1 do not constitute non-compliance. ")
                  ]),
                  createVNode("p", null, [
                    createTextVNode(" The stability guarantees set out in this policy — in particular, the restriction of breaking changes to major version releases and the scope constraints on errata — apply only to "),
                    createVNode("strong", null, "Live capabilities"),
                    createTextVNode(". A capability is Live when Nebras has formally declared it in production use within the UAE Open Finance ecosystem. ")
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "Capabilities not yet declared Live"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createTextVNode("Breaking changes "),
                    createVNode("strong", null, "MAY"),
                    createTextVNode(" be introduced in minor versions or errata without requiring a major version increment")
                  ]),
                  createVNode("li", null, "The release cadence defined below continues to apply"),
                  createVNode("li", null, [
                    createTextVNode("Once a capability is declared Live, all subsequent changes "),
                    createVNode("strong", null, "MUST"),
                    createTextVNode(" comply with this policy in full")
                  ])
                ]),
                _: 1
              }),
              createVNode("p", { class: "ed-aside" }, " Nebras is responsible for maintaining and publishing the register of Live capabilities. ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "versioning",
        num: "03",
        color: "var(--at-blue)",
        eyebrow: "Versioning",
        title: "Major and minor versions",
        lede: "The UAE Open Finance standard uses a two-part version identifier of the form <code>Vx.y</code>, where <code>x</code> is the major version and <code>y</code> is the minor version.",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdCompareCards, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_EdCompareCard, {
                    accent: "var(--at-navy-deep)",
                    kicker: "Major versions",
                    example: "V1.1 → V2.0",
                    cadence: "18 months",
                    "cadence-label": "Minimum interval"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<ul data-v-41cd0014${_scopeId3}><li data-v-41cd0014${_scopeId3}><strong data-v-41cd0014${_scopeId3}>MAY</strong> include breaking changes that are not backward compatible</li><li data-v-41cd0014${_scopeId3}><strong data-v-41cd0014${_scopeId3}>MUST NOT</strong> be released more frequently than every 18 months from the last major release</li><li data-v-41cd0014${_scopeId3}><strong data-v-41cd0014${_scopeId3}>MUST</strong> include a comprehensive record of all breaking changes, with migration guidance and a clear deprecation timeline for the prior major version</li></ul>`);
                      } else {
                        return [
                          createVNode("ul", null, [
                            createVNode("li", null, [
                              createVNode("strong", null, "MAY"),
                              createTextVNode(" include breaking changes that are not backward compatible")
                            ]),
                            createVNode("li", null, [
                              createVNode("strong", null, "MUST NOT"),
                              createTextVNode(" be released more frequently than every 18 months from the last major release")
                            ]),
                            createVNode("li", null, [
                              createVNode("strong", null, "MUST"),
                              createTextVNode(" include a comprehensive record of all breaking changes, with migration guidance and a clear deprecation timeline for the prior major version")
                            ])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_EdCompareCard, {
                    accent: "var(--at-teal)",
                    kicker: "Minor versions",
                    example: "V1.0 → V1.1",
                    cadence: "6 months",
                    "cadence-label": "Minimum interval"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<ul data-v-41cd0014${_scopeId3}><li data-v-41cd0014${_scopeId3}><strong data-v-41cd0014${_scopeId3}>MUST NOT</strong> include breaking changes</li><li data-v-41cd0014${_scopeId3}><strong data-v-41cd0014${_scopeId3}>MUST NOT</strong> be released more frequently than every 6 months from the previous release</li><li data-v-41cd0014${_scopeId3}><strong data-v-41cd0014${_scopeId3}>MAY</strong> include non-breaking enhancements such as additional optional fields, additional GET response fields, additional endpoints, or non-breaking changes to field types</li></ul>`);
                      } else {
                        return [
                          createVNode("ul", null, [
                            createVNode("li", null, [
                              createVNode("strong", null, "MUST NOT"),
                              createTextVNode(" include breaking changes")
                            ]),
                            createVNode("li", null, [
                              createVNode("strong", null, "MUST NOT"),
                              createTextVNode(" be released more frequently than every 6 months from the previous release")
                            ]),
                            createVNode("li", null, [
                              createVNode("strong", null, "MAY"),
                              createTextVNode(" include non-breaking enhancements such as additional optional fields, additional GET response fields, additional endpoints, or non-breaking changes to field types")
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
                      accent: "var(--at-navy-deep)",
                      kicker: "Major versions",
                      example: "V1.1 → V2.0",
                      cadence: "18 months",
                      "cadence-label": "Minimum interval"
                    }, {
                      default: withCtx(() => [
                        createVNode("ul", null, [
                          createVNode("li", null, [
                            createVNode("strong", null, "MAY"),
                            createTextVNode(" include breaking changes that are not backward compatible")
                          ]),
                          createVNode("li", null, [
                            createVNode("strong", null, "MUST NOT"),
                            createTextVNode(" be released more frequently than every 18 months from the last major release")
                          ]),
                          createVNode("li", null, [
                            createVNode("strong", null, "MUST"),
                            createTextVNode(" include a comprehensive record of all breaking changes, with migration guidance and a clear deprecation timeline for the prior major version")
                          ])
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_EdCompareCard, {
                      accent: "var(--at-teal)",
                      kicker: "Minor versions",
                      example: "V1.0 → V1.1",
                      cadence: "6 months",
                      "cadence-label": "Minimum interval"
                    }, {
                      default: withCtx(() => [
                        createVNode("ul", null, [
                          createVNode("li", null, [
                            createVNode("strong", null, "MUST NOT"),
                            createTextVNode(" include breaking changes")
                          ]),
                          createVNode("li", null, [
                            createVNode("strong", null, "MUST NOT"),
                            createTextVNode(" be released more frequently than every 6 months from the previous release")
                          ]),
                          createVNode("li", null, [
                            createVNode("strong", null, "MAY"),
                            createTextVNode(" include non-breaking enhancements such as additional optional fields, additional GET response fields, additional endpoints, or non-breaking changes to field types")
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
            _push2(`<h3 data-v-41cd0014${_scopeId}>Version documentation</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Every major and minor version <strong data-v-41cd0014${_scopeId2}>MUST</strong> be accompanied by:`);
                } else {
                  return [
                    createTextVNode("Every major and minor version "),
                    createVNode("strong", null, "MUST"),
                    createTextVNode(" be accompanied by:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-41cd0014${_scopeId2}>A complete change log covering all modifications since the previous version</li><li data-v-41cd0014${_scopeId2}>Implementer guidance describing how to adopt the new version</li><li data-v-41cd0014${_scopeId2}>For major versions, migration guidance for each breaking change</li>`);
                } else {
                  return [
                    createVNode("li", null, "A complete change log covering all modifications since the previous version"),
                    createVNode("li", null, "Implementer guidance describing how to adopt the new version"),
                    createVNode("li", null, "For major versions, migration guidance for each breaking change")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdCompareCards, null, {
                default: withCtx(() => [
                  createVNode(_component_EdCompareCard, {
                    accent: "var(--at-navy-deep)",
                    kicker: "Major versions",
                    example: "V1.1 → V2.0",
                    cadence: "18 months",
                    "cadence-label": "Minimum interval"
                  }, {
                    default: withCtx(() => [
                      createVNode("ul", null, [
                        createVNode("li", null, [
                          createVNode("strong", null, "MAY"),
                          createTextVNode(" include breaking changes that are not backward compatible")
                        ]),
                        createVNode("li", null, [
                          createVNode("strong", null, "MUST NOT"),
                          createTextVNode(" be released more frequently than every 18 months from the last major release")
                        ]),
                        createVNode("li", null, [
                          createVNode("strong", null, "MUST"),
                          createTextVNode(" include a comprehensive record of all breaking changes, with migration guidance and a clear deprecation timeline for the prior major version")
                        ])
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_EdCompareCard, {
                    accent: "var(--at-teal)",
                    kicker: "Minor versions",
                    example: "V1.0 → V1.1",
                    cadence: "6 months",
                    "cadence-label": "Minimum interval"
                  }, {
                    default: withCtx(() => [
                      createVNode("ul", null, [
                        createVNode("li", null, [
                          createVNode("strong", null, "MUST NOT"),
                          createTextVNode(" include breaking changes")
                        ]),
                        createVNode("li", null, [
                          createVNode("strong", null, "MUST NOT"),
                          createTextVNode(" be released more frequently than every 6 months from the previous release")
                        ]),
                        createVNode("li", null, [
                          createVNode("strong", null, "MAY"),
                          createTextVNode(" include non-breaking enhancements such as additional optional fields, additional GET response fields, additional endpoints, or non-breaking changes to field types")
                        ])
                      ])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode("h3", null, "Version documentation"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Every major and minor version "),
                  createVNode("strong", null, "MUST"),
                  createTextVNode(" be accompanied by:")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "A complete change log covering all modifications since the previous version"),
                  createVNode("li", null, "Implementer guidance describing how to adopt the new version"),
                  createVNode("li", null, "For major versions, migration guidance for each breaking change")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "system-ui",
        num: "04",
        color: "var(--at-blue-deep)",
        eyebrow: "System & UI",
        title: "Version-independent UI support",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-41cd0014${_scopeId2}>UI elements <strong data-v-41cd0014${_scopeId2}>MUST NOT</strong> rely on API versioning for core functionality</li><li data-v-41cd0014${_scopeId2}>Where UI behaviour depends on new data in a consent object, LFIs and TPPs <strong data-v-41cd0014${_scopeId2}>MUST</strong> implement logic based on the presence of the data itself, not on the consent version</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createTextVNode("UI elements "),
                      createVNode("strong", null, "MUST NOT"),
                      createTextVNode(" rely on API versioning for core functionality")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("Where UI behaviour depends on new data in a consent object, LFIs and TPPs "),
                      createVNode("strong", null, "MUST"),
                      createTextVNode(" implement logic based on the presence of the data itself, not on the consent version")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdExample, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-41cd0014${_scopeId2}> If a new consent permission <code data-v-41cd0014${_scopeId2}>ReadStatements</code> is added in V2.1, the UI <strong data-v-41cd0014${_scopeId2}>SHOULD</strong> check whether <code data-v-41cd0014${_scopeId2}>ReadStatements</code> is present on the consent rather than checking whether the consent version equals V2.1. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" If a new consent permission "),
                      createVNode("code", null, "ReadStatements"),
                      createTextVNode(" is added in V2.1, the UI "),
                      createVNode("strong", null, "SHOULD"),
                      createTextVNode(" check whether "),
                      createVNode("code", null, "ReadStatements"),
                      createTextVNode(" is present on the consent rather than checking whether the consent version equals V2.1. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-41cd0014${_scopeId}>UI adoption</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-41cd0014${_scopeId2}>LFIs <strong data-v-41cd0014${_scopeId2}>MAY</strong> adopt visual or branding changes from a future version before upgrading their API version. <em data-v-41cd0014${_scopeId2}>Example:</em> new UI requirements published in V2.0 may be implemented while still serving API V1.2</li><li data-v-41cd0014${_scopeId2}>Adoption of new UI elements requires successful Customer Experience (CX) certification</li><li data-v-41cd0014${_scopeId2}>When an LFI upgrades its API to a given version, the UI <strong data-v-41cd0014${_scopeId2}>MUST</strong> also align with that version. UI enhancements <strong data-v-41cd0014${_scopeId2}>MAY</strong> precede API version upgrades but <strong data-v-41cd0014${_scopeId2}>MUST NOT</strong> lag behind them</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createTextVNode("LFIs "),
                      createVNode("strong", null, "MAY"),
                      createTextVNode(" adopt visual or branding changes from a future version before upgrading their API version. "),
                      createVNode("em", null, "Example:"),
                      createTextVNode(" new UI requirements published in V2.0 may be implemented while still serving API V1.2")
                    ]),
                    createVNode("li", null, "Adoption of new UI elements requires successful Customer Experience (CX) certification"),
                    createVNode("li", null, [
                      createTextVNode("When an LFI upgrades its API to a given version, the UI "),
                      createVNode("strong", null, "MUST"),
                      createTextVNode(" also align with that version. UI enhancements "),
                      createVNode("strong", null, "MAY"),
                      createTextVNode(" precede API version upgrades but "),
                      createVNode("strong", null, "MUST NOT"),
                      createTextVNode(" lag behind them")
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
                    createTextVNode("UI elements "),
                    createVNode("strong", null, "MUST NOT"),
                    createTextVNode(" rely on API versioning for core functionality")
                  ]),
                  createVNode("li", null, [
                    createTextVNode("Where UI behaviour depends on new data in a consent object, LFIs and TPPs "),
                    createVNode("strong", null, "MUST"),
                    createTextVNode(" implement logic based on the presence of the data itself, not on the consent version")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdExample, null, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" If a new consent permission "),
                    createVNode("code", null, "ReadStatements"),
                    createTextVNode(" is added in V2.1, the UI "),
                    createVNode("strong", null, "SHOULD"),
                    createTextVNode(" check whether "),
                    createVNode("code", null, "ReadStatements"),
                    createTextVNode(" is present on the consent rather than checking whether the consent version equals V2.1. ")
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "UI adoption"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createTextVNode("LFIs "),
                    createVNode("strong", null, "MAY"),
                    createTextVNode(" adopt visual or branding changes from a future version before upgrading their API version. "),
                    createVNode("em", null, "Example:"),
                    createTextVNode(" new UI requirements published in V2.0 may be implemented while still serving API V1.2")
                  ]),
                  createVNode("li", null, "Adoption of new UI elements requires successful Customer Experience (CX) certification"),
                  createVNode("li", null, [
                    createTextVNode("When an LFI upgrades its API to a given version, the UI "),
                    createVNode("strong", null, "MUST"),
                    createTextVNode(" also align with that version. UI enhancements "),
                    createVNode("strong", null, "MAY"),
                    createTextVNode(" precede API version upgrades but "),
                    createVNode("strong", null, "MUST NOT"),
                    createTextVNode(" lag behind them")
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
        id: "release",
        num: "05",
        color: "var(--at-navy)",
        eyebrow: "Release management",
        title: "Publication, candidates, and post-publication change",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdStages, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "01",
                    title: "Standards publication"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-41cd0014${_scopeId3}>A standards version <strong data-v-41cd0014${_scopeId3}>MAY</strong> only be declared published once it is fully available to TPPs via the API Hub.</p>`);
                      } else {
                        return [
                          createVNode("p", null, [
                            createTextVNode("A standards version "),
                            createVNode("strong", null, "MAY"),
                            createTextVNode(" only be declared published once it is fully available to TPPs via the API Hub.")
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "02",
                    title: "Release candidate"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-41cd0014${_scopeId3}> A release candidate (e.g. <code data-v-41cd0014${_scopeId3}>V1.2-rc</code>) <strong data-v-41cd0014${_scopeId3}>MAY</strong> be issued ahead of official publication. Once a version is agreed but not yet delivered into the API Hub, it carries a <code data-v-41cd0014${_scopeId3}>-rc-final</code> suffix to indicate fixed-but-not-yet-published state. </p>`);
                      } else {
                        return [
                          createVNode("p", null, [
                            createTextVNode(" A release candidate (e.g. "),
                            createVNode("code", null, "V1.2-rc"),
                            createTextVNode(") "),
                            createVNode("strong", null, "MAY"),
                            createTextVNode(" be issued ahead of official publication. Once a version is agreed but not yet delivered into the API Hub, it carries a "),
                            createVNode("code", null, "-rc-final"),
                            createTextVNode(" suffix to indicate fixed-but-not-yet-published state. ")
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "03",
                    title: "Changes to published versions"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_EdBullets, { tight: "" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<li data-v-41cd0014${_scopeId4}>Post-publication changes are limited to guidance clarifications or bug fixes, and <strong data-v-41cd0014${_scopeId4}>MUST</strong> follow the <a href="/policy/changes-to-published-content" data-v-41cd0014${_scopeId4}>Changes to Published Documentation Policy</a></li><li data-v-41cd0014${_scopeId4}>No functional changes affecting LFI or TPP implementations may be introduced after publication; such changes require a new minor or major version</li><li data-v-41cd0014${_scopeId4}>Errata <strong data-v-41cd0014${_scopeId4}>MUST NOT</strong> introduce breaking changes</li><li data-v-41cd0014${_scopeId4}>Errata <strong data-v-41cd0014${_scopeId4}>MUST NOT</strong> introduce new functionality — additive enhancements <strong data-v-41cd0014${_scopeId4}>MUST</strong> be delivered through a new minor version</li>`);
                            } else {
                              return [
                                createVNode("li", null, [
                                  createTextVNode("Post-publication changes are limited to guidance clarifications or bug fixes, and "),
                                  createVNode("strong", null, "MUST"),
                                  createTextVNode(" follow the "),
                                  createVNode("a", { href: "/policy/changes-to-published-content" }, "Changes to Published Documentation Policy")
                                ]),
                                createVNode("li", null, "No functional changes affecting LFI or TPP implementations may be introduced after publication; such changes require a new minor or major version"),
                                createVNode("li", null, [
                                  createTextVNode("Errata "),
                                  createVNode("strong", null, "MUST NOT"),
                                  createTextVNode(" introduce breaking changes")
                                ]),
                                createVNode("li", null, [
                                  createTextVNode("Errata "),
                                  createVNode("strong", null, "MUST NOT"),
                                  createTextVNode(" introduce new functionality — additive enhancements "),
                                  createVNode("strong", null, "MUST"),
                                  createTextVNode(" be delivered through a new minor version")
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_EdBullets, { tight: "" }, {
                            default: withCtx(() => [
                              createVNode("li", null, [
                                createTextVNode("Post-publication changes are limited to guidance clarifications or bug fixes, and "),
                                createVNode("strong", null, "MUST"),
                                createTextVNode(" follow the "),
                                createVNode("a", { href: "/policy/changes-to-published-content" }, "Changes to Published Documentation Policy")
                              ]),
                              createVNode("li", null, "No functional changes affecting LFI or TPP implementations may be introduced after publication; such changes require a new minor or major version"),
                              createVNode("li", null, [
                                createTextVNode("Errata "),
                                createVNode("strong", null, "MUST NOT"),
                                createTextVNode(" introduce breaking changes")
                              ]),
                              createVNode("li", null, [
                                createTextVNode("Errata "),
                                createVNode("strong", null, "MUST NOT"),
                                createTextVNode(" introduce new functionality — additive enhancements "),
                                createVNode("strong", null, "MUST"),
                                createTextVNode(" be delivered through a new minor version")
                              ])
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_EdStage, {
                      num: "01",
                      title: "Standards publication"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, [
                          createTextVNode("A standards version "),
                          createVNode("strong", null, "MAY"),
                          createTextVNode(" only be declared published once it is fully available to TPPs via the API Hub.")
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_EdStage, {
                      num: "02",
                      title: "Release candidate"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, [
                          createTextVNode(" A release candidate (e.g. "),
                          createVNode("code", null, "V1.2-rc"),
                          createTextVNode(") "),
                          createVNode("strong", null, "MAY"),
                          createTextVNode(" be issued ahead of official publication. Once a version is agreed but not yet delivered into the API Hub, it carries a "),
                          createVNode("code", null, "-rc-final"),
                          createTextVNode(" suffix to indicate fixed-but-not-yet-published state. ")
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_EdStage, {
                      num: "03",
                      title: "Changes to published versions"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_EdBullets, { tight: "" }, {
                          default: withCtx(() => [
                            createVNode("li", null, [
                              createTextVNode("Post-publication changes are limited to guidance clarifications or bug fixes, and "),
                              createVNode("strong", null, "MUST"),
                              createTextVNode(" follow the "),
                              createVNode("a", { href: "/policy/changes-to-published-content" }, "Changes to Published Documentation Policy")
                            ]),
                            createVNode("li", null, "No functional changes affecting LFI or TPP implementations may be introduced after publication; such changes require a new minor or major version"),
                            createVNode("li", null, [
                              createTextVNode("Errata "),
                              createVNode("strong", null, "MUST NOT"),
                              createTextVNode(" introduce breaking changes")
                            ]),
                            createVNode("li", null, [
                              createTextVNode("Errata "),
                              createVNode("strong", null, "MUST NOT"),
                              createTextVNode(" introduce new functionality — additive enhancements "),
                              createVNode("strong", null, "MUST"),
                              createTextVNode(" be delivered through a new minor version")
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
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdStages, null, {
                default: withCtx(() => [
                  createVNode(_component_EdStage, {
                    num: "01",
                    title: "Standards publication"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, [
                        createTextVNode("A standards version "),
                        createVNode("strong", null, "MAY"),
                        createTextVNode(" only be declared published once it is fully available to TPPs via the API Hub.")
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_EdStage, {
                    num: "02",
                    title: "Release candidate"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, [
                        createTextVNode(" A release candidate (e.g. "),
                        createVNode("code", null, "V1.2-rc"),
                        createTextVNode(") "),
                        createVNode("strong", null, "MAY"),
                        createTextVNode(" be issued ahead of official publication. Once a version is agreed but not yet delivered into the API Hub, it carries a "),
                        createVNode("code", null, "-rc-final"),
                        createTextVNode(" suffix to indicate fixed-but-not-yet-published state. ")
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_EdStage, {
                    num: "03",
                    title: "Changes to published versions"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_EdBullets, { tight: "" }, {
                        default: withCtx(() => [
                          createVNode("li", null, [
                            createTextVNode("Post-publication changes are limited to guidance clarifications or bug fixes, and "),
                            createVNode("strong", null, "MUST"),
                            createTextVNode(" follow the "),
                            createVNode("a", { href: "/policy/changes-to-published-content" }, "Changes to Published Documentation Policy")
                          ]),
                          createVNode("li", null, "No functional changes affecting LFI or TPP implementations may be introduced after publication; such changes require a new minor or major version"),
                          createVNode("li", null, [
                            createTextVNode("Errata "),
                            createVNode("strong", null, "MUST NOT"),
                            createTextVNode(" introduce breaking changes")
                          ]),
                          createVNode("li", null, [
                            createTextVNode("Errata "),
                            createVNode("strong", null, "MUST NOT"),
                            createTextVNode(" introduce new functionality — additive enhancements "),
                            createVNode("strong", null, "MUST"),
                            createTextVNode(" be delivered through a new minor version")
                          ])
                        ]),
                        _: 1
                      })
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
        id: "governance",
        num: "06",
        color: "var(--at-teal-deep)",
        eyebrow: "Compliance & review",
        title: "Governance and policy lifecycle",
        tone: "surface",
        narrow: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdTwoCol, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div data-v-41cd0014${_scopeId2}><h3 data-v-41cd0014${_scopeId2}>Compliance</h3>`);
                  _push3(ssrRenderComponent(_component_EdProse, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Nebras, LFIs, and TPPs are required to adhere to this policy. Nebras is responsible for maintaining the versioning scheme, publishing version artefacts, and coordinating with ecosystem participants on upcoming releases. `);
                      } else {
                        return [
                          createTextVNode(" Nebras, LFIs, and TPPs are required to adhere to this policy. Nebras is responsible for maintaining the versioning scheme, publishing version artefacts, and coordinating with ecosystem participants on upcoming releases. ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div><div data-v-41cd0014${_scopeId2}><h3 data-v-41cd0014${_scopeId2}>Review and updates</h3>`);
                  _push3(ssrRenderComponent(_component_EdProse, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` This policy will be reviewed periodically by Nebras to ensure alignment with industry best practice and the evolving UAE Open Finance ecosystem. Material changes will be communicated to LFIs and TPPs in advance of taking effect. `);
                      } else {
                        return [
                          createTextVNode(" This policy will be reviewed periodically by Nebras to ensure alignment with industry best practice and the evolving UAE Open Finance ecosystem. Material changes will be communicated to LFIs and TPPs in advance of taking effect. ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", null, [
                      createVNode("h3", null, "Compliance"),
                      createVNode(_component_EdProse, null, {
                        default: withCtx(() => [
                          createTextVNode(" Nebras, LFIs, and TPPs are required to adhere to this policy. Nebras is responsible for maintaining the versioning scheme, publishing version artefacts, and coordinating with ecosystem participants on upcoming releases. ")
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode("div", null, [
                      createVNode("h3", null, "Review and updates"),
                      createVNode(_component_EdProse, null, {
                        default: withCtx(() => [
                          createTextVNode(" This policy will be reviewed periodically by Nebras to ensure alignment with industry best practice and the evolving UAE Open Finance ecosystem. Material changes will be communicated to LFIs and TPPs in advance of taking effect. ")
                        ]),
                        _: 1
                      })
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdTwoCol, null, {
                default: withCtx(() => [
                  createVNode("div", null, [
                    createVNode("h3", null, "Compliance"),
                    createVNode(_component_EdProse, null, {
                      default: withCtx(() => [
                        createTextVNode(" Nebras, LFIs, and TPPs are required to adhere to this policy. Nebras is responsible for maintaining the versioning scheme, publishing version artefacts, and coordinating with ecosystem participants on upcoming releases. ")
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode("div", null, [
                    createVNode("h3", null, "Review and updates"),
                    createVNode(_component_EdProse, null, {
                      default: withCtx(() => [
                        createTextVNode(" This policy will be reviewed periodically by Nebras to ensure alignment with industry best practice and the evolving UAE Open Finance ecosystem. Material changes will be communicated to LFIs and TPPs in advance of taking effect. ")
                      ]),
                      _: 1
                    })
                  ])
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
              href: "/policy/changes-to-published-content",
              category: "Nebras",
              title: "Changes to Published Documentation Policy",
              desc: "How published versions may be amended post-release via Errata."
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRelatedCard, {
              href: "/policy/lfi-deprecation",
              category: "Nebras",
              title: "Major Version Deprecation Policy",
              desc: "How prior major versions are retired and the timelines that apply."
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdRelatedCard, {
                href: "/policy/changes-to-published-content",
                category: "Nebras",
                title: "Changes to Published Documentation Policy",
                desc: "How published versions may be amended post-release via Errata."
              }),
              createVNode(_component_EdRelatedCard, {
                href: "/policy/lfi-deprecation",
                category: "Nebras",
                title: "Major Version Deprecation Policy",
                desc: "How prior major versions are retired and the timelines that apply."
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/policy/version-management.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const versionManagement = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-41cd0014"]]);
export {
  versionManagement as default
};
