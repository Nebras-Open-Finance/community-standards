import { _ as __unplugin_components_0, a as __unplugin_components_2, b as __unplugin_components_6, c as __unplugin_components_7$1 } from "./EdBackStrip-COkyNhGh.js";
import { _ as __unplugin_components_7, a as __unplugin_components_8 } from "./EdStages-NkJQJXq7.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { _ as __unplugin_components_0$1 } from "./EdHero-DawHPCxB.js";
import { defineComponent, mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { useHead } from "@unhead/vue";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "marketing-and-advertising",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({ title: "Marketing and Advertising Policy · Internal Policies" });
    const sections = [
      { id: "overview", label: "Overview" },
      { id: "scope", label: "Scope & definitions" },
      { id: "principles", label: "Core principles" },
      { id: "approval", label: "Approval process" },
      { id: "controls", label: "Controls" },
      { id: "responsibilities", label: "Responsibilities" },
      { id: "oversight", label: "Training & oversight" }
    ];
    const meta = [
      { label: "Applies to", value: "Nebras" },
      { label: "Classification", value: "Restricted" },
      { label: "Version", value: "1.0" }
    ];
    const keyNums = [
      { value: "7–14", unit: "days", label: "Internal review timeline for materials" },
      { value: "14", unit: "days", label: "CBUAE advance notice for industry-wide messaging" },
      { value: "5", unit: "yr", label: "Minimum approval-record retention" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdBackStrip = __unplugin_components_0;
      const _component_EdHero = __unplugin_components_0$1;
      const _component_EdInPageNav = __unplugin_components_2;
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdBullets = __unplugin_components_5;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdStages = __unplugin_components_7;
      const _component_EdStage = __unplugin_components_8;
      const _component_EdRelatedCards = __unplugin_components_6;
      const _component_EdRelatedCard = __unplugin_components_7$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-page" }, _attrs))} data-v-ee889c98>`);
      _push(ssrRenderComponent(_component_EdBackStrip, {
        href: "/internal/policies/",
        text: "All policies"
      }, null, _parent));
      _push(ssrRenderComponent(_component_EdHero, {
        eyebrow: "Internal · Restricted",
        "eyebrow-color": "var(--at-teal)",
        title: "Marketing and Advertising Policy",
        meta,
        lede: "As the CBUAE-regulated national API Hub and Trust Framework provider, Nebras markets and advertises to promote the <strong>AlTareq</strong> brand and trust-mark and the broader Open Finance ecosystem. This policy ensures all such activity is ethical, compliant, and transparent — preventing misleading information and preserving Nebras’s neutral position.",
        "key-nums": keyNums
      }, null, _parent));
      _push(ssrRenderComponent(_component_EdInPageNav, { sections }, null, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "overview",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Overview",
        title: "Purpose of this policy",
        lede: "Marketing activities include educational campaigns, promotional materials, and digital communications aimed at LFIs, TPPs, and the public. All must align with CBUAE Circulars on marketing guidelines, Federal Laws on consumer protection, and UAE media standards.",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-ee889c98${_scopeId}>This policy aims to</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-ee889c98${_scopeId2}>Ensure all marketing and advertising is truthful, transparent, and fully compliant with relevant CBUAE and UAE regulations.</li><li data-v-ee889c98${_scopeId2}>Establish an approval process, including mandatory prior CBUAE approval for communications involving industry-wide impacts or references to the regulator.</li><li data-v-ee889c98${_scopeId2}>Prevent misleading claims, exaggeration, or discriminatory content that could harm Nebras’s reputation or the ecosystem’s integrity.</li><li data-v-ee889c98${_scopeId2}>Support Nebras’s role in fostering trust by clearly communicating its neutral position as infrastructure operator, scheme brand, and standard setter — without endorsing specific financial products, TPPs, or LFIs.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Ensure all marketing and advertising is truthful, transparent, and fully compliant with relevant CBUAE and UAE regulations."),
                    createVNode("li", null, "Establish an approval process, including mandatory prior CBUAE approval for communications involving industry-wide impacts or references to the regulator."),
                    createVNode("li", null, "Prevent misleading claims, exaggeration, or discriminatory content that could harm Nebras’s reputation or the ecosystem’s integrity."),
                    createVNode("li", null, "Support Nebras’s role in fostering trust by clearly communicating its neutral position as infrastructure operator, scheme brand, and standard setter — without endorsing specific financial products, TPPs, or LFIs.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, "This policy aims to"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Ensure all marketing and advertising is truthful, transparent, and fully compliant with relevant CBUAE and UAE regulations."),
                  createVNode("li", null, "Establish an approval process, including mandatory prior CBUAE approval for communications involving industry-wide impacts or references to the regulator."),
                  createVNode("li", null, "Prevent misleading claims, exaggeration, or discriminatory content that could harm Nebras’s reputation or the ecosystem’s integrity."),
                  createVNode("li", null, "Support Nebras’s role in fostering trust by clearly communicating its neutral position as infrastructure operator, scheme brand, and standard setter — without endorsing specific financial products, TPPs, or LFIs.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "scope",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "Scope & definitions",
        title: "What this policy covers",
        lede: "This policy applies to all forms of Nebras-issued communications and promotional activity, across both digital and traditional media, with particular emphasis on national campaigns with UAE-wide reach.",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-ee889c98${_scopeId2}>The AlTareq brand and trust-mark.</li><li data-v-ee889c98${_scopeId2}>Advertisements, brochures, and promotional materials.</li><li data-v-ee889c98${_scopeId2}>Social media posts, website content, and email marketing campaigns.</li><li data-v-ee889c98${_scopeId2}>Industry publicity, marketing events, and national awareness campaigns.</li>`);
                } else {
                  return [
                    createVNode("li", null, "The AlTareq brand and trust-mark."),
                    createVNode("li", null, "Advertisements, brochures, and promotional materials."),
                    createVNode("li", null, "Social media posts, website content, and email marketing campaigns."),
                    createVNode("li", null, "Industry publicity, marketing events, and national awareness campaigns.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The policy does not apply to confidential engagements conducted bilaterally or multilaterally with the industry (including product development and other consultations), nor to product or standards collateral circulated in the ecosystem. Industry conferences and similar non-marketing activities are conducted at the discretion of the CEO. `);
                } else {
                  return [
                    createTextVNode(" The policy does not apply to confidential engagements conducted bilaterally or multilaterally with the industry (including product development and other consultations), nor to product or standards collateral circulated in the ecosystem. Industry conferences and similar non-marketing activities are conducted at the discretion of the CEO. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-ee889c98${_scopeId}>Definitions</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-ee889c98${_scopeId2}><strong data-v-ee889c98${_scopeId2}>Industry-wide activity</strong> — any marketing or communication that affects or targets multiple LFIs, TPPs, or the entire Open Finance ecosystem, such as ecosystem adoption drives.</li><li data-v-ee889c98${_scopeId2}><strong data-v-ee889c98${_scopeId2}>CBUAE-related messaging</strong> — content that references the CBUAE, its logos, or regulatory approvals, or implies endorsement by the regulator.</li><li data-v-ee889c98${_scopeId2}><strong data-v-ee889c98${_scopeId2}>(National) campaigns</strong> — broad, public-facing initiatives to promote Open Finance across the UAE, often involving media partnerships or public events.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Industry-wide activity"),
                      createTextVNode(" — any marketing or communication that affects or targets multiple LFIs, TPPs, or the entire Open Finance ecosystem, such as ecosystem adoption drives.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "CBUAE-related messaging"),
                      createTextVNode(" — content that references the CBUAE, its logos, or regulatory approvals, or implies endorsement by the regulator.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "(National) campaigns"),
                      createTextVNode(" — broad, public-facing initiatives to promote Open Finance across the UAE, often involving media partnerships or public events.")
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
                  createVNode("li", null, "The AlTareq brand and trust-mark."),
                  createVNode("li", null, "Advertisements, brochures, and promotional materials."),
                  createVNode("li", null, "Social media posts, website content, and email marketing campaigns."),
                  createVNode("li", null, "Industry publicity, marketing events, and national awareness campaigns.")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The policy does not apply to confidential engagements conducted bilaterally or multilaterally with the industry (including product development and other consultations), nor to product or standards collateral circulated in the ecosystem. Industry conferences and similar non-marketing activities are conducted at the discretion of the CEO. ")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Definitions"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Industry-wide activity"),
                    createTextVNode(" — any marketing or communication that affects or targets multiple LFIs, TPPs, or the entire Open Finance ecosystem, such as ecosystem adoption drives.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "CBUAE-related messaging"),
                    createTextVNode(" — content that references the CBUAE, its logos, or regulatory approvals, or implies endorsement by the regulator.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "(National) campaigns"),
                    createTextVNode(" — broad, public-facing initiatives to promote Open Finance across the UAE, often involving media partnerships or public events.")
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
        id: "principles",
        num: "03",
        color: "var(--at-blue)",
        eyebrow: "Core principles",
        title: "Principles guiding Nebras marketing",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-ee889c98${_scopeId2}><strong data-v-ee889c98${_scopeId2}>Truthfulness</strong> — all statements must be accurate, evidence-based, and verifiable, avoiding unsubstantiated claims about benefits or performance.</li><li data-v-ee889c98${_scopeId2}><strong data-v-ee889c98${_scopeId2}>Transparency</strong> — clearly disclose Nebras’s role, any limitations of services, and disclaimers regarding liability or endorsements.</li><li data-v-ee889c98${_scopeId2}><strong data-v-ee889c98${_scopeId2}>Fairness</strong> — ensure content is inclusive, non-discriminatory, and does not favour specific participants.</li><li data-v-ee889c98${_scopeId2}><strong data-v-ee889c98${_scopeId2}>Compliance</strong> — strictly adhere to CBUAE Circulars and UAE media standards, including prohibitions on false advertising.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Truthfulness"),
                      createTextVNode(" — all statements must be accurate, evidence-based, and verifiable, avoiding unsubstantiated claims about benefits or performance.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Transparency"),
                      createTextVNode(" — clearly disclose Nebras’s role, any limitations of services, and disclaimers regarding liability or endorsements.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Fairness"),
                      createTextVNode(" — ensure content is inclusive, non-discriminatory, and does not favour specific participants.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Compliance"),
                      createTextVNode(" — strictly adhere to CBUAE Circulars and UAE media standards, including prohibitions on false advertising.")
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
                    createVNode("strong", null, "Truthfulness"),
                    createTextVNode(" — all statements must be accurate, evidence-based, and verifiable, avoiding unsubstantiated claims about benefits or performance.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Transparency"),
                    createTextVNode(" — clearly disclose Nebras’s role, any limitations of services, and disclaimers regarding liability or endorsements.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Fairness"),
                    createTextVNode(" — ensure content is inclusive, non-discriminatory, and does not favour specific participants.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Compliance"),
                    createTextVNode(" — strictly adhere to CBUAE Circulars and UAE media standards, including prohibitions on false advertising.")
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
        id: "approval",
        num: "04",
        color: "var(--at-blue-deep)",
        eyebrow: "Approval process",
        title: "How marketing materials are approved",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdStages, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "01",
                    title: "Internal approval",
                    "num-color": "var(--at-blue-deep)"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-ee889c98${_scopeId3}>The Nebras team drafts materials and submits them to the CEO for initial review, ensuring alignment with policy principles. For national campaigns, additional sign-off from the Chairman is required to confirm strategic fit.</p><p data-v-ee889c98${_scopeId3}><strong data-v-ee889c98${_scopeId3}>Review timeline: 7–14 business days</strong>, with revisions tracked.</p>`);
                      } else {
                        return [
                          createVNode("p", null, "The Nebras team drafts materials and submits them to the CEO for initial review, ensuring alignment with policy principles. For national campaigns, additional sign-off from the Chairman is required to confirm strategic fit."),
                          createVNode("p", null, [
                            createVNode("strong", null, "Review timeline: 7–14 business days"),
                            createTextVNode(", with revisions tracked.")
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "02",
                    title: "External approval",
                    "num-color": "var(--at-blue-deep)"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-ee889c98${_scopeId3}>Industry-wide activities or CBUAE-related messaging must be submitted to the CBUAE Communications team at least <strong data-v-ee889c98${_scopeId3}>14 days in advance</strong>. Approval must be obtained in writing, with any required modifications implemented before release.</p>`);
                      } else {
                        return [
                          createVNode("p", null, [
                            createTextVNode("Industry-wide activities or CBUAE-related messaging must be submitted to the CBUAE Communications team at least "),
                            createVNode("strong", null, "14 days in advance"),
                            createTextVNode(". Approval must be obtained in writing, with any required modifications implemented before release.")
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "03",
                    title: "Logging & release",
                    "num-color": "var(--at-blue-deep)"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-ee889c98${_scopeId3}>All materials are routed through the CPO for logging. No unauthorised releases are permitted; digital tools may be used for efficiency.</p>`);
                      } else {
                        return [
                          createVNode("p", null, "All materials are routed through the CPO for logging. No unauthorised releases are permitted; digital tools may be used for efficiency.")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_EdStage, {
                      num: "01",
                      title: "Internal approval",
                      "num-color": "var(--at-blue-deep)"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, "The Nebras team drafts materials and submits them to the CEO for initial review, ensuring alignment with policy principles. For national campaigns, additional sign-off from the Chairman is required to confirm strategic fit."),
                        createVNode("p", null, [
                          createVNode("strong", null, "Review timeline: 7–14 business days"),
                          createTextVNode(", with revisions tracked.")
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_EdStage, {
                      num: "02",
                      title: "External approval",
                      "num-color": "var(--at-blue-deep)"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, [
                          createTextVNode("Industry-wide activities or CBUAE-related messaging must be submitted to the CBUAE Communications team at least "),
                          createVNode("strong", null, "14 days in advance"),
                          createTextVNode(". Approval must be obtained in writing, with any required modifications implemented before release.")
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_EdStage, {
                      num: "03",
                      title: "Logging & release",
                      "num-color": "var(--at-blue-deep)"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, "All materials are routed through the CPO for logging. No unauthorised releases are permitted; digital tools may be used for efficiency.")
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
                    title: "Internal approval",
                    "num-color": "var(--at-blue-deep)"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, "The Nebras team drafts materials and submits them to the CEO for initial review, ensuring alignment with policy principles. For national campaigns, additional sign-off from the Chairman is required to confirm strategic fit."),
                      createVNode("p", null, [
                        createVNode("strong", null, "Review timeline: 7–14 business days"),
                        createTextVNode(", with revisions tracked.")
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_EdStage, {
                    num: "02",
                    title: "External approval",
                    "num-color": "var(--at-blue-deep)"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, [
                        createTextVNode("Industry-wide activities or CBUAE-related messaging must be submitted to the CBUAE Communications team at least "),
                        createVNode("strong", null, "14 days in advance"),
                        createTextVNode(". Approval must be obtained in writing, with any required modifications implemented before release.")
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_EdStage, {
                    num: "03",
                    title: "Logging & release",
                    "num-color": "var(--at-blue-deep)"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, "All materials are routed through the CPO for logging. No unauthorised releases are permitted; digital tools may be used for efficiency.")
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
        id: "controls",
        num: "05",
        color: "var(--at-navy)",
        eyebrow: "Controls & restrictions",
        title: "What is controlled and restricted",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-ee889c98${_scopeId2}><strong data-v-ee889c98${_scopeId2}>Content restrictions</strong> — prohibit exaggeration of ecosystem benefits; include mandatory disclaimers for any regulatory references or potential risks.</li><li data-v-ee889c98${_scopeId2}><strong data-v-ee889c98${_scopeId2}>Social media controls</strong> — all posts must be pre-approved by the CEO or CPO; staff personal accounts may not promote Nebras without authorisation.</li><li data-v-ee889c98${_scopeId2}><strong data-v-ee889c98${_scopeId2}>Third-party endorsements</strong> — any collaboration requires written agreements, CEO/CPO review, and compliance checks to ensure alignment with Nebras’s neutrality.</li><li data-v-ee889c98${_scopeId2}><strong data-v-ee889c98${_scopeId2}>Recordkeeping</strong> — maintain detailed logs of all approvals, revisions, and releases for a minimum of <strong data-v-ee889c98${_scopeId2}>5 years</strong> in a secure database.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Content restrictions"),
                      createTextVNode(" — prohibit exaggeration of ecosystem benefits; include mandatory disclaimers for any regulatory references or potential risks.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Social media controls"),
                      createTextVNode(" — all posts must be pre-approved by the CEO or CPO; staff personal accounts may not promote Nebras without authorisation.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Third-party endorsements"),
                      createTextVNode(" — any collaboration requires written agreements, CEO/CPO review, and compliance checks to ensure alignment with Nebras’s neutrality.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Recordkeeping"),
                      createTextVNode(" — maintain detailed logs of all approvals, revisions, and releases for a minimum of "),
                      createVNode("strong", null, "5 years"),
                      createTextVNode(" in a secure database.")
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
                    createVNode("strong", null, "Content restrictions"),
                    createTextVNode(" — prohibit exaggeration of ecosystem benefits; include mandatory disclaimers for any regulatory references or potential risks.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Social media controls"),
                    createTextVNode(" — all posts must be pre-approved by the CEO or CPO; staff personal accounts may not promote Nebras without authorisation.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Third-party endorsements"),
                    createTextVNode(" — any collaboration requires written agreements, CEO/CPO review, and compliance checks to ensure alignment with Nebras’s neutrality.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Recordkeeping"),
                    createTextVNode(" — maintain detailed logs of all approvals, revisions, and releases for a minimum of "),
                    createVNode("strong", null, "5 years"),
                    createTextVNode(" in a secure database.")
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
        id: "responsibilities",
        num: "06",
        color: "var(--at-teal-deep)",
        eyebrow: "Responsibilities",
        title: "Who does what",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-ee889c98${_scopeId2}><strong data-v-ee889c98${_scopeId2}>Chief Product Officer (CPO)</strong> — oversees content creation, internal approvals, and coordination with external parties.</li><li data-v-ee889c98${_scopeId2}><strong data-v-ee889c98${_scopeId2}>CBUAE Communications team</strong> — reviews and provides input on all industry-wide materials, or those involving CBUAE-related content or branding.</li><li data-v-ee889c98${_scopeId2}><strong data-v-ee889c98${_scopeId2}>CEO</strong> — grants final internal sign-off and ensures regulatory compliance.</li><li data-v-ee889c98${_scopeId2}><strong data-v-ee889c98${_scopeId2}>Staff and contractors</strong> — submit all proposed materials to the CPO, adhere to restrictions, and report any potential violations immediately.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Chief Product Officer (CPO)"),
                      createTextVNode(" — oversees content creation, internal approvals, and coordination with external parties.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "CBUAE Communications team"),
                      createTextVNode(" — reviews and provides input on all industry-wide materials, or those involving CBUAE-related content or branding.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "CEO"),
                      createTextVNode(" — grants final internal sign-off and ensures regulatory compliance.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Staff and contractors"),
                      createTextVNode(" — submit all proposed materials to the CPO, adhere to restrictions, and report any potential violations immediately.")
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
                    createVNode("strong", null, "Chief Product Officer (CPO)"),
                    createTextVNode(" — oversees content creation, internal approvals, and coordination with external parties.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "CBUAE Communications team"),
                    createTextVNode(" — reviews and provides input on all industry-wide materials, or those involving CBUAE-related content or branding.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "CEO"),
                    createTextVNode(" — grants final internal sign-off and ensures regulatory compliance.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Staff and contractors"),
                    createTextVNode(" — submit all proposed materials to the CPO, adhere to restrictions, and report any potential violations immediately.")
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
        id: "oversight",
        num: "07",
        color: "var(--at-teal)",
        eyebrow: "Training & oversight",
        title: "Training, monitoring, and enforcement",
        tone: "cream",
        narrow: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-ee889c98${_scopeId}>Training and awareness</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-ee889c98${_scopeId2}>Annual mandatory training for all staff on this policy, including CBUAE Circulars, Federal Laws, and UAE media standards.</li><li data-v-ee889c98${_scopeId2}>Topics include identifying compliant content, navigating approval processes, social media best practices, and recognising misleading claims.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Annual mandatory training for all staff on this policy, including CBUAE Circulars, Federal Laws, and UAE media standards."),
                    createVNode("li", null, "Topics include identifying compliant content, navigating approval processes, social media best practices, and recognising misleading claims.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-ee889c98${_scopeId}>Monitoring and reporting</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-ee889c98${_scopeId2}><strong data-v-ee889c98${_scopeId2}>Monitoring</strong> — the CPO conducts annual reviews of ongoing campaigns to verify compliance and effectiveness.</li><li data-v-ee889c98${_scopeId2}><strong data-v-ee889c98${_scopeId2}>Reporting</strong> — an annual report to the Board detailing activities, approval metrics, any breaches, and lessons learned.</li><li data-v-ee889c98${_scopeId2}><strong data-v-ee889c98${_scopeId2}>Escalation</strong> — detected non-compliance is reported to the CEO immediately, with severe issues escalated to the CBUAE where they involve regulatory violations.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Monitoring"),
                      createTextVNode(" — the CPO conducts annual reviews of ongoing campaigns to verify compliance and effectiveness.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Reporting"),
                      createTextVNode(" — an annual report to the Board detailing activities, approval metrics, any breaches, and lessons learned.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Escalation"),
                      createTextVNode(" — detected non-compliance is reported to the CEO immediately, with severe issues escalated to the CBUAE where they involve regulatory violations.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-ee889c98${_scopeId}>Enforcement and disciplinary actions</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-ee889c98${_scopeId2}>Violations, such as releasing unapproved materials or making misleading claims, are likely to result in disciplinary measures.</li><li data-v-ee889c98${_scopeId2}>Systemic or repeated issues are reported to the CBUAE for potential regulatory enforcement.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Violations, such as releasing unapproved materials or making misleading claims, are likely to result in disciplinary measures."),
                    createVNode("li", null, "Systemic or repeated issues are reported to the CBUAE for potential regulatory enforcement.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, "Training and awareness"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Annual mandatory training for all staff on this policy, including CBUAE Circulars, Federal Laws, and UAE media standards."),
                  createVNode("li", null, "Topics include identifying compliant content, navigating approval processes, social media best practices, and recognising misleading claims.")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Monitoring and reporting"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Monitoring"),
                    createTextVNode(" — the CPO conducts annual reviews of ongoing campaigns to verify compliance and effectiveness.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Reporting"),
                    createTextVNode(" — an annual report to the Board detailing activities, approval metrics, any breaches, and lessons learned.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Escalation"),
                    createTextVNode(" — detected non-compliance is reported to the CEO immediately, with severe issues escalated to the CBUAE where they involve regulatory violations.")
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "Enforcement and disciplinary actions"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Violations, such as releasing unapproved materials or making misleading claims, are likely to result in disciplinary measures."),
                  createVNode("li", null, "Systemic or repeated issues are reported to the CBUAE for potential regulatory enforcement.")
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
              href: "/internal/policies/product-and-services",
              category: "Customers & Conduct",
              title: "Product and Services Policy",
              desc: "How Nebras defines, governs, and manages the products and services it provides."
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRelatedCard, {
              href: "/internal/policies/retail-consumer-protection",
              category: "Customers & Conduct",
              title: "Retail Consumer Protection Policy",
              desc: "Nebras's indirect role in supporting fair, transparent retail consumer experiences."
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdRelatedCard, {
                href: "/internal/policies/product-and-services",
                category: "Customers & Conduct",
                title: "Product and Services Policy",
                desc: "How Nebras defines, governs, and manages the products and services it provides."
              }),
              createVNode(_component_EdRelatedCard, {
                href: "/internal/policies/retail-consumer-protection",
                category: "Customers & Conduct",
                title: "Retail Consumer Protection Policy",
                desc: "Nebras's indirect role in supporting fair, transparent retail consumer experiences."
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/internal/policies/marketing-and-advertising.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const marketingAndAdvertising = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ee889c98"]]);
export {
  marketingAndAdvertising as default
};
