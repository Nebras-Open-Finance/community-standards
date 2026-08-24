import { _ as __unplugin_components_0, a as __unplugin_components_2, b as __unplugin_components_6, c as __unplugin_components_7$1 } from "./EdBackStrip-COkyNhGh.js";
import { _ as __unplugin_components_7, a as __unplugin_components_8 } from "./EdStages-NkJQJXq7.js";
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
  __name: "product-and-services",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({ title: "Product and Services Policy · Internal Policies" });
    const sections = [
      { id: "overview", label: "Overview" },
      { id: "scope", label: "Scope & definitions" },
      { id: "principles", label: "Core principles" },
      { id: "development", label: "Development process" },
      { id: "approval", label: "Approval workflow" },
      { id: "risk", label: "Risk & consultation" },
      { id: "responsibilities", label: "Responsibilities" }
    ];
    const meta = [
      { label: "Applies to", value: "Nebras" },
      { label: "Classification", value: "Restricted" },
      { label: "Version", value: "1.0" }
    ];
    const keyNums = [
      { value: "4", unit: "stages", label: "Multi-stage approval workflow" },
      { value: "30–45", unit: "days", label: "Standard approval timeline" },
      { value: "Major", unit: "changes", label: "Trigger mandatory ERM risk assessment & consultation" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdBackStrip = __unplugin_components_0;
      const _component_EdHero = __unplugin_components_0$1;
      const _component_EdInPageNav = __unplugin_components_2;
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdBullets = __unplugin_components_5;
      const _component_EdStages = __unplugin_components_7;
      const _component_EdStage = __unplugin_components_8;
      const _component_EdRelatedCards = __unplugin_components_6;
      const _component_EdRelatedCard = __unplugin_components_7$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-page" }, _attrs))} data-v-a3e58dba>`);
      _push(ssrRenderComponent(_component_EdBackStrip, {
        href: "/internal/policies/",
        text: "All policies"
      }, null, _parent));
      _push(ssrRenderComponent(_component_EdHero, {
        eyebrow: "Internal · Restricted",
        "eyebrow-color": "var(--at-teal)",
        title: "Product and Services Policy",
        meta,
        lede: "As the UAE national API Hub, Nebras develops and maintains standardised APIs, centralised consent management, and integration tools (SDKs, components, MCPs). This policy provides the framework for creating, developing, and approving those products and services — enhancing interoperability, security, and efficiency while maintaining Nebras’s neutrality as an infrastructure provider.",
        "key-nums": keyNums
      }, null, _parent));
      _push(ssrRenderComponent(_component_EdInPageNav, { sections }, null, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "overview",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Overview",
        title: "Purpose of this policy",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-a3e58dba${_scopeId}>This policy aims to</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-a3e58dba${_scopeId2}>Establish a structured, transparent, and efficient process for the ideation, development, and approval of Nebras products and services.</li><li data-v-a3e58dba${_scopeId2}>Ensure all offerings comply with CBUAE regulations — particularly the Open Finance Regulation 2025 — and align with the evolving needs of LFIs, TPPs, and the broader ecosystem.</li><li data-v-a3e58dba${_scopeId2}>Promote innovation while managing risks through evaluation and stakeholder engagement.</li><li data-v-a3e58dba${_scopeId2}>Clarify that Nebras’s products facilitate secure data sharing, service initiation, quotes, and onboarding <strong data-v-a3e58dba${_scopeId2}>without assuming liability for end-user outcomes</strong>, which remain with LFIs and TPPs.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Establish a structured, transparent, and efficient process for the ideation, development, and approval of Nebras products and services."),
                    createVNode("li", null, "Ensure all offerings comply with CBUAE regulations — particularly the Open Finance Regulation 2025 — and align with the evolving needs of LFIs, TPPs, and the broader ecosystem."),
                    createVNode("li", null, "Promote innovation while managing risks through evaluation and stakeholder engagement."),
                    createVNode("li", null, [
                      createTextVNode("Clarify that Nebras’s products facilitate secure data sharing, service initiation, quotes, and onboarding "),
                      createVNode("strong", null, "without assuming liability for end-user outcomes"),
                      createTextVNode(", which remain with LFIs and TPPs.")
                    ])
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
                  createVNode("li", null, "Establish a structured, transparent, and efficient process for the ideation, development, and approval of Nebras products and services."),
                  createVNode("li", null, "Ensure all offerings comply with CBUAE regulations — particularly the Open Finance Regulation 2025 — and align with the evolving needs of LFIs, TPPs, and the broader ecosystem."),
                  createVNode("li", null, "Promote innovation while managing risks through evaluation and stakeholder engagement."),
                  createVNode("li", null, [
                    createTextVNode("Clarify that Nebras’s products facilitate secure data sharing, service initiation, quotes, and onboarding "),
                    createVNode("strong", null, "without assuming liability for end-user outcomes"),
                    createTextVNode(", which remain with LFIs and TPPs.")
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
        id: "scope",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "Scope & definitions",
        title: "What this policy applies to",
        lede: "This policy applies to all stages of product and service lifecycle management — ideation, design, development, testing, approval, and deployment. It does not cover routine maintenance or minor bug fixes, which are handled under operational procedures.",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-a3e58dba${_scopeId2}>APIs for data sharing, service initiation (including payments), onboarding, and quotes.</li><li data-v-a3e58dba${_scopeId2}>Centralised consent records and management systems for secure, compliant user permissions.</li><li data-v-a3e58dba${_scopeId2}>SDKs and other API components provided on an “as-is” basis, with no ongoing support or liability from Nebras.</li>`);
                } else {
                  return [
                    createVNode("li", null, "APIs for data sharing, service initiation (including payments), onboarding, and quotes."),
                    createVNode("li", null, "Centralised consent records and management systems for secure, compliant user permissions."),
                    createVNode("li", null, "SDKs and other API components provided on an “as-is” basis, with no ongoing support or liability from Nebras.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-a3e58dba${_scopeId}>Definitions</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-a3e58dba${_scopeId2}><strong data-v-a3e58dba${_scopeId2}>Product / service</strong> — any offering developed by Nebras to support the Open Finance infrastructure, including technical tools, standards, and protocols enabling secure interactions between LFIs and TPPs.</li><li data-v-a3e58dba${_scopeId2}><strong data-v-a3e58dba${_scopeId2}>Major change</strong> — a significant modification or addition, such as a new API endpoint, a novel feature impacting ecosystem interoperability, or expansion to new participant groups (e.g. e-wallet providers or fintech innovators).</li><li data-v-a3e58dba${_scopeId2}><strong data-v-a3e58dba${_scopeId2}>Minor update</strong> — routine enhancements, such as performance optimisations or security patches, that do not alter core functionality or require stakeholder consultation.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Product / service"),
                      createTextVNode(" — any offering developed by Nebras to support the Open Finance infrastructure, including technical tools, standards, and protocols enabling secure interactions between LFIs and TPPs.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Major change"),
                      createTextVNode(" — a significant modification or addition, such as a new API endpoint, a novel feature impacting ecosystem interoperability, or expansion to new participant groups (e.g. e-wallet providers or fintech innovators).")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Minor update"),
                      createTextVNode(" — routine enhancements, such as performance optimisations or security patches, that do not alter core functionality or require stakeholder consultation.")
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
                  createVNode("li", null, "APIs for data sharing, service initiation (including payments), onboarding, and quotes."),
                  createVNode("li", null, "Centralised consent records and management systems for secure, compliant user permissions."),
                  createVNode("li", null, "SDKs and other API components provided on an “as-is” basis, with no ongoing support or liability from Nebras.")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Definitions"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Product / service"),
                    createTextVNode(" — any offering developed by Nebras to support the Open Finance infrastructure, including technical tools, standards, and protocols enabling secure interactions between LFIs and TPPs.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Major change"),
                    createTextVNode(" — a significant modification or addition, such as a new API endpoint, a novel feature impacting ecosystem interoperability, or expansion to new participant groups (e.g. e-wallet providers or fintech innovators).")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Minor update"),
                    createTextVNode(" — routine enhancements, such as performance optimisations or security patches, that do not alter core functionality or require stakeholder consultation.")
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
        title: "Principles for product and service development",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-a3e58dba${_scopeId2}><strong data-v-a3e58dba${_scopeId2}>Innovation</strong> — prioritise secure, scalable, and interoperable solutions that drive ecosystem growth and Open Finance adoption.</li><li data-v-a3e58dba${_scopeId2}><strong data-v-a3e58dba${_scopeId2}>Stakeholder alignment</strong> — actively account for feedback from LFIs, TPPs, and other participants, especially for major changes.</li><li data-v-a3e58dba${_scopeId2}><strong data-v-a3e58dba${_scopeId2}>Compliance</strong> — fully adhere to CBUAE regulations, including data security standards and independence requirements, without requiring direct CBUAE approval unless specified.</li><li data-v-a3e58dba${_scopeId2}><strong data-v-a3e58dba${_scopeId2}>Sustainability</strong> — design products to be useful to customers and to support long-term ecosystem stability.</li><li data-v-a3e58dba${_scopeId2}><strong data-v-a3e58dba${_scopeId2}>Risk mitigation</strong> — embed risk assessments to protect against operational, technical, and regulatory vulnerabilities.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Innovation"),
                      createTextVNode(" — prioritise secure, scalable, and interoperable solutions that drive ecosystem growth and Open Finance adoption.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Stakeholder alignment"),
                      createTextVNode(" — actively account for feedback from LFIs, TPPs, and other participants, especially for major changes.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Compliance"),
                      createTextVNode(" — fully adhere to CBUAE regulations, including data security standards and independence requirements, without requiring direct CBUAE approval unless specified.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Sustainability"),
                      createTextVNode(" — design products to be useful to customers and to support long-term ecosystem stability.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Risk mitigation"),
                      createTextVNode(" — embed risk assessments to protect against operational, technical, and regulatory vulnerabilities.")
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
                    createVNode("strong", null, "Innovation"),
                    createTextVNode(" — prioritise secure, scalable, and interoperable solutions that drive ecosystem growth and Open Finance adoption.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Stakeholder alignment"),
                    createTextVNode(" — actively account for feedback from LFIs, TPPs, and other participants, especially for major changes.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Compliance"),
                    createTextVNode(" — fully adhere to CBUAE regulations, including data security standards and independence requirements, without requiring direct CBUAE approval unless specified.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Sustainability"),
                    createTextVNode(" — design products to be useful to customers and to support long-term ecosystem stability.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Risk mitigation"),
                    createTextVNode(" — embed risk assessments to protect against operational, technical, and regulatory vulnerabilities.")
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
        id: "development",
        num: "04",
        color: "var(--at-blue-deep)",
        eyebrow: "Development process",
        title: "A phased approach to development",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdStages, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "01",
                    title: "Ideation",
                    "num-color": "var(--at-blue-deep)"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-a3e58dba${_scopeId3}>Led by the CEO/CPO, this identifies emerging needs from market trends, regulatory updates, Board strategic directives, or ecosystem feedback. Ideas are documented in a standardised template outlining benefits, challenges, and alignment with Nebras’s mandate.</p>`);
                      } else {
                        return [
                          createVNode("p", null, "Led by the CEO/CPO, this identifies emerging needs from market trends, regulatory updates, Board strategic directives, or ecosystem feedback. Ideas are documented in a standardised template outlining benefits, challenges, and alignment with Nebras’s mandate.")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "02",
                    title: "Feasibility study",
                    "num-color": "var(--at-blue-deep)"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-a3e58dba${_scopeId3}>The CTO, with relevant vendors or partners, conducts a technical viability assessment (resource requirements, integration challenges, scalability). In parallel, the CEO/CPO evaluates the business case — ecosystem impact, adoption potential, and cost.</p>`);
                      } else {
                        return [
                          createVNode("p", null, "The CTO, with relevant vendors or partners, conducts a technical viability assessment (resource requirements, integration challenges, scalability). In parallel, the CEO/CPO evaluates the business case — ecosystem impact, adoption potential, and cost.")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "03",
                    title: "Design",
                    "num-color": "var(--at-blue-deep)"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-a3e58dba${_scopeId3}>Led by the CPO, CTO, and partners, detailed specifications are developed incorporating security protocols, CX guidelines, and interoperability requirements. Prototypes may be created for internal testing with cross-functional input.</p>`);
                      } else {
                        return [
                          createVNode("p", null, "Led by the CPO, CTO, and partners, detailed specifications are developed incorporating security protocols, CX guidelines, and interoperability requirements. Prototypes may be created for internal testing with cross-functional input.")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "04",
                    title: "Development & testing",
                    "num-color": "var(--at-blue-deep)"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-a3e58dba${_scopeId3}>Implementation occurs in a controlled environment, followed by rigorous testing for functionality, security, and performance — including simulated ecosystem scenarios to verify compatibility with LFI/TPP systems.</p>`);
                      } else {
                        return [
                          createVNode("p", null, "Implementation occurs in a controlled environment, followed by rigorous testing for functionality, security, and performance — including simulated ecosystem scenarios to verify compatibility with LFI/TPP systems.")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_EdStage, {
                      num: "01",
                      title: "Ideation",
                      "num-color": "var(--at-blue-deep)"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, "Led by the CEO/CPO, this identifies emerging needs from market trends, regulatory updates, Board strategic directives, or ecosystem feedback. Ideas are documented in a standardised template outlining benefits, challenges, and alignment with Nebras’s mandate.")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_EdStage, {
                      num: "02",
                      title: "Feasibility study",
                      "num-color": "var(--at-blue-deep)"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, "The CTO, with relevant vendors or partners, conducts a technical viability assessment (resource requirements, integration challenges, scalability). In parallel, the CEO/CPO evaluates the business case — ecosystem impact, adoption potential, and cost.")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_EdStage, {
                      num: "03",
                      title: "Design",
                      "num-color": "var(--at-blue-deep)"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, "Led by the CPO, CTO, and partners, detailed specifications are developed incorporating security protocols, CX guidelines, and interoperability requirements. Prototypes may be created for internal testing with cross-functional input.")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_EdStage, {
                      num: "04",
                      title: "Development & testing",
                      "num-color": "var(--at-blue-deep)"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, "Implementation occurs in a controlled environment, followed by rigorous testing for functionality, security, and performance — including simulated ecosystem scenarios to verify compatibility with LFI/TPP systems.")
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
                    title: "Ideation",
                    "num-color": "var(--at-blue-deep)"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, "Led by the CEO/CPO, this identifies emerging needs from market trends, regulatory updates, Board strategic directives, or ecosystem feedback. Ideas are documented in a standardised template outlining benefits, challenges, and alignment with Nebras’s mandate.")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_EdStage, {
                    num: "02",
                    title: "Feasibility study",
                    "num-color": "var(--at-blue-deep)"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, "The CTO, with relevant vendors or partners, conducts a technical viability assessment (resource requirements, integration challenges, scalability). In parallel, the CEO/CPO evaluates the business case — ecosystem impact, adoption potential, and cost.")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_EdStage, {
                    num: "03",
                    title: "Design",
                    "num-color": "var(--at-blue-deep)"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, "Led by the CPO, CTO, and partners, detailed specifications are developed incorporating security protocols, CX guidelines, and interoperability requirements. Prototypes may be created for internal testing with cross-functional input.")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_EdStage, {
                    num: "04",
                    title: "Development & testing",
                    "num-color": "var(--at-blue-deep)"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, "Implementation occurs in a controlled environment, followed by rigorous testing for functionality, security, and performance — including simulated ecosystem scenarios to verify compatibility with LFI/TPP systems.")
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
        id: "approval",
        num: "05",
        color: "var(--at-navy)",
        eyebrow: "Approval workflow",
        title: "Multi-staged approval",
        lede: "Standard process takes 30–45 days; minor updates may be expedited with CEO authorisation.",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-a3e58dba${_scopeId2}><strong data-v-a3e58dba${_scopeId2}>Stage 1 — Proposal submission</strong> — the CPO submits a detailed plan (scope, objectives, timeline, resource needs, ecosystem impacts).</li><li data-v-a3e58dba${_scopeId2}><strong data-v-a3e58dba${_scopeId2}>Stage 2 — Technical review</strong> — the CTO verifies technical feasibility and alignment with Nebras’s infrastructure and security standards.</li><li data-v-a3e58dba${_scopeId2}><strong data-v-a3e58dba${_scopeId2}>Stage 3 — Risk assessment</strong> — for major changes, a formal assessment is conducted per the Enterprise Risk Management Policy, identifying and mitigating risks such as data breaches or interoperability issues.</li><li data-v-a3e58dba${_scopeId2}><strong data-v-a3e58dba${_scopeId2}>Stage 4 — Final approval</strong> — the CEO approves product and operational details; the Board of Managers approves only high-level strategic elements (e.g. expansion to new LFI groups).</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Stage 1 — Proposal submission"),
                      createTextVNode(" — the CPO submits a detailed plan (scope, objectives, timeline, resource needs, ecosystem impacts).")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Stage 2 — Technical review"),
                      createTextVNode(" — the CTO verifies technical feasibility and alignment with Nebras’s infrastructure and security standards.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Stage 3 — Risk assessment"),
                      createTextVNode(" — for major changes, a formal assessment is conducted per the Enterprise Risk Management Policy, identifying and mitigating risks such as data breaches or interoperability issues.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Stage 4 — Final approval"),
                      createTextVNode(" — the CEO approves product and operational details; the Board of Managers approves only high-level strategic elements (e.g. expansion to new LFI groups).")
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
                    createVNode("strong", null, "Stage 1 — Proposal submission"),
                    createTextVNode(" — the CPO submits a detailed plan (scope, objectives, timeline, resource needs, ecosystem impacts).")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Stage 2 — Technical review"),
                    createTextVNode(" — the CTO verifies technical feasibility and alignment with Nebras’s infrastructure and security standards.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Stage 3 — Risk assessment"),
                    createTextVNode(" — for major changes, a formal assessment is conducted per the Enterprise Risk Management Policy, identifying and mitigating risks such as data breaches or interoperability issues.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Stage 4 — Final approval"),
                    createTextVNode(" — the CEO approves product and operational details; the Board of Managers approves only high-level strategic elements (e.g. expansion to new LFI groups).")
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
        id: "risk",
        num: "06",
        color: "var(--at-teal-deep)",
        eyebrow: "Risk & consultation",
        title: "Risk, compliance, and industry consultation",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-a3e58dba${_scopeId}>Risk and compliance considerations</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-a3e58dba${_scopeId2}>Revisions of existing or new risk assessments are mandatory for major changes, focusing on data security, system interoperability, and regulatory compliance.</li><li data-v-a3e58dba${_scopeId2}>All products and services must align with the Open Finance Regulation, including adherence to the Federal Law on Personal Data Protection.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Revisions of existing or new risk assessments are mandatory for major changes, focusing on data security, system interoperability, and regulatory compliance."),
                    createVNode("li", null, "All products and services must align with the Open Finance Regulation, including adherence to the Federal Law on Personal Data Protection.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-a3e58dba${_scopeId}>Industry consultation</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-a3e58dba${_scopeId2}>For major changes, Nebras conducts mandatory consultations with LFIs, TPPs, and other stakeholders via workshops, surveys, or virtual forums, allowing a feedback period.</li><li data-v-a3e58dba${_scopeId2}>Feedback is analysed and incorporated into the final design where feasible, with a summary report justifying any rejections.</li><li data-v-a3e58dba${_scopeId2}>This ensures ecosystem buy-in and compliance with the Open Finance Regulation 2025 principles of collaboration.</li>`);
                } else {
                  return [
                    createVNode("li", null, "For major changes, Nebras conducts mandatory consultations with LFIs, TPPs, and other stakeholders via workshops, surveys, or virtual forums, allowing a feedback period."),
                    createVNode("li", null, "Feedback is analysed and incorporated into the final design where feasible, with a summary report justifying any rejections."),
                    createVNode("li", null, "This ensures ecosystem buy-in and compliance with the Open Finance Regulation 2025 principles of collaboration.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, "Risk and compliance considerations"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Revisions of existing or new risk assessments are mandatory for major changes, focusing on data security, system interoperability, and regulatory compliance."),
                  createVNode("li", null, "All products and services must align with the Open Finance Regulation, including adherence to the Federal Law on Personal Data Protection.")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Industry consultation"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "For major changes, Nebras conducts mandatory consultations with LFIs, TPPs, and other stakeholders via workshops, surveys, or virtual forums, allowing a feedback period."),
                  createVNode("li", null, "Feedback is analysed and incorporated into the final design where feasible, with a summary report justifying any rejections."),
                  createVNode("li", null, "This ensures ecosystem buy-in and compliance with the Open Finance Regulation 2025 principles of collaboration.")
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
        num: "07",
        color: "var(--at-teal)",
        eyebrow: "Responsibilities",
        title: "Accountability and review",
        tone: "cream",
        narrow: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-a3e58dba${_scopeId2}><strong data-v-a3e58dba${_scopeId2}>Chief Product Officer (CPO)</strong> — leads ideation, proposal development, and overall process coordination.</li><li data-v-a3e58dba${_scopeId2}><strong data-v-a3e58dba${_scopeId2}>Chief Technology Officer (CTO)</strong> — ensures technical integrity, feasibility, and security throughout development.</li><li data-v-a3e58dba${_scopeId2}><strong data-v-a3e58dba${_scopeId2}>CEO</strong> — provides final operational approval and oversees alignment with Nebras’s strategic goals.</li><li data-v-a3e58dba${_scopeId2}><strong data-v-a3e58dba${_scopeId2}>Board of Managers</strong> — sets high-level strategic direction and approves major initiatives.</li><li data-v-a3e58dba${_scopeId2}><strong data-v-a3e58dba${_scopeId2}>All staff</strong> — contribute to relevant phases and report potential issues promptly.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Chief Product Officer (CPO)"),
                      createTextVNode(" — leads ideation, proposal development, and overall process coordination.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Chief Technology Officer (CTO)"),
                      createTextVNode(" — ensures technical integrity, feasibility, and security throughout development.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "CEO"),
                      createTextVNode(" — provides final operational approval and oversees alignment with Nebras’s strategic goals.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Board of Managers"),
                      createTextVNode(" — sets high-level strategic direction and approves major initiatives.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "All staff"),
                      createTextVNode(" — contribute to relevant phases and report potential issues promptly.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-a3e58dba${_scopeId}>Monitoring and policy review</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-a3e58dba${_scopeId2}>Annual audits of the product development process evaluate efficiency and compliance.</li><li data-v-a3e58dba${_scopeId2}>The policy is reviewed annually, or ad hoc in response to regulatory changes, ecosystem feedback, or internal incidents, with updates approved by the Board.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Annual audits of the product development process evaluate efficiency and compliance."),
                    createVNode("li", null, "The policy is reviewed annually, or ad hoc in response to regulatory changes, ecosystem feedback, or internal incidents, with updates approved by the Board.")
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
                    createTextVNode(" — leads ideation, proposal development, and overall process coordination.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Chief Technology Officer (CTO)"),
                    createTextVNode(" — ensures technical integrity, feasibility, and security throughout development.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "CEO"),
                    createTextVNode(" — provides final operational approval and oversees alignment with Nebras’s strategic goals.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Board of Managers"),
                    createTextVNode(" — sets high-level strategic direction and approves major initiatives.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "All staff"),
                    createTextVNode(" — contribute to relevant phases and report potential issues promptly.")
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "Monitoring and policy review"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Annual audits of the product development process evaluate efficiency and compliance."),
                  createVNode("li", null, "The policy is reviewed annually, or ad hoc in response to regulatory changes, ecosystem feedback, or internal incidents, with updates approved by the Board.")
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
              href: "/internal/policies/enterprise-risk-management",
              category: "Risk, Security & Compliance",
              title: "Enterprise Risk Management Policy",
              desc: "The risk framework under which major product changes are formally assessed."
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRelatedCard, {
              href: "/internal/policies/marketing-and-advertising",
              category: "Customers & Conduct",
              title: "Marketing and Advertising Policy",
              desc: "Standards for how new products and the ecosystem are promoted."
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdRelatedCard, {
                href: "/internal/policies/enterprise-risk-management",
                category: "Risk, Security & Compliance",
                title: "Enterprise Risk Management Policy",
                desc: "The risk framework under which major product changes are formally assessed."
              }),
              createVNode(_component_EdRelatedCard, {
                href: "/internal/policies/marketing-and-advertising",
                category: "Customers & Conduct",
                title: "Marketing and Advertising Policy",
                desc: "Standards for how new products and the ecosystem are promoted."
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/internal/policies/product-and-services.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const productAndServices = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a3e58dba"]]);
export {
  productAndServices as default
};
