import { _ as __unplugin_components_0, a as __unplugin_components_2, b as __unplugin_components_6, c as __unplugin_components_7 } from "./EdBackStrip-COkyNhGh.js";
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
  __name: "retail-consumer-protection",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({ title: "Retail Consumer Protection Policy · Internal Policies" });
    const sections = [
      { id: "overview", label: "Overview" },
      { id: "scope", label: "Scope & definitions" },
      { id: "principles", label: "Principles" },
      { id: "role", label: "Role & standards" },
      { id: "liability", label: "Liability & model" },
      { id: "monitoring", label: "Monitoring" },
      { id: "responsibilities", label: "Responsibilities & training" },
      { id: "review", label: "Reporting & enforcement" }
    ];
    const meta = [
      { label: "Applies to", value: "Nebras · LFIs · TPPs" },
      { label: "Classification", value: "Restricted" },
      { label: "Version", value: "1.0 · Aug 2025" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdBackStrip = __unplugin_components_0;
      const _component_EdHero = __unplugin_components_0$1;
      const _component_EdInPageNav = __unplugin_components_2;
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdBullets = __unplugin_components_5;
      const _component_EdRelatedCards = __unplugin_components_6;
      const _component_EdRelatedCard = __unplugin_components_7;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-page" }, _attrs))} data-v-46c336e9>`);
      _push(ssrRenderComponent(_component_EdBackStrip, {
        href: "/internal/policies/",
        text: "All policies"
      }, null, _parent));
      _push(ssrRenderComponent(_component_EdHero, {
        eyebrow: "Internal · Restricted",
        "eyebrow-color": "var(--at-teal)",
        title: "Retail Consumer Protection Policy",
        meta,
        lede: "Nebras operates as the national API Hub and Trust Framework operator, facilitating secure data sharing and transaction initiation between LFIs and TPPs <strong>without direct consumer interaction</strong>. This policy sets out Nebras’s indirect role in supporting transparent, clear, and fair retail customer experiences through standards that align with CBUAE mandates."
      }, null, _parent));
      _push(ssrRenderComponent(_component_EdInPageNav, { sections }, null, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "overview",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Overview",
        title: "Nebras's indirect relationship with retail consumers",
        lede: "Established under the CBUAE Open Finance Regulation 2025 (Notice No. 4046/2025, Circular No. 03/2025), Nebras supports fair retail customer experiences through its standards. LFIs and TPPs hold the primary responsibility for consumer protection obligations under the Consumer Protection Regulation 2020.",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-46c336e9${_scopeId}>This policy aims to</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-46c336e9${_scopeId2}>Define Nebras’s role in supporting transparent, fair, and secure consumer experiences — with a focus on indirect support for retail customers.</li><li data-v-46c336e9${_scopeId2}>Ensure alignment with the CBUAE Consumer Protection Regulation 2020 (fairness, transparency, and disclosure) and the Open Finance Regulation 2025.</li><li data-v-46c336e9${_scopeId2}>Establish procedures for monitoring ecosystem compliance and managing consumer-related complaints.</li><li data-v-46c336e9${_scopeId2}>Clarify that Nebras does not assume liability for consumer protection, which remains with LFIs and TPPs under CBUAE supervision.</li><li data-v-46c336e9${_scopeId2}>Promote equitable access to services, sustainability through low-cost models, and user-friendly processes for retail customers.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Define Nebras’s role in supporting transparent, fair, and secure consumer experiences — with a focus on indirect support for retail customers."),
                    createVNode("li", null, "Ensure alignment with the CBUAE Consumer Protection Regulation 2020 (fairness, transparency, and disclosure) and the Open Finance Regulation 2025."),
                    createVNode("li", null, "Establish procedures for monitoring ecosystem compliance and managing consumer-related complaints."),
                    createVNode("li", null, "Clarify that Nebras does not assume liability for consumer protection, which remains with LFIs and TPPs under CBUAE supervision."),
                    createVNode("li", null, "Promote equitable access to services, sustainability through low-cost models, and user-friendly processes for retail customers.")
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
                  createVNode("li", null, "Define Nebras’s role in supporting transparent, fair, and secure consumer experiences — with a focus on indirect support for retail customers."),
                  createVNode("li", null, "Ensure alignment with the CBUAE Consumer Protection Regulation 2020 (fairness, transparency, and disclosure) and the Open Finance Regulation 2025."),
                  createVNode("li", null, "Establish procedures for monitoring ecosystem compliance and managing consumer-related complaints."),
                  createVNode("li", null, "Clarify that Nebras does not assume liability for consumer protection, which remains with LFIs and TPPs under CBUAE supervision."),
                  createVNode("li", null, "Promote equitable access to services, sustainability through low-cost models, and user-friendly processes for retail customers.")
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
        lede: "This policy applies to all Nebras activities involving the API Hub, the Trust Framework, and the Standards — including rules for API consent flows, data portability, TPP certification, and other processes impacting retail users. It covers all company activity but does not extend to direct consumer interactions, as Nebras operates as the centralised infrastructure operator.",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-46c336e9${_scopeId}>Definitions</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-46c336e9${_scopeId2}><strong data-v-46c336e9${_scopeId2}>Consumer / retail customer</strong> — the end user of financial products or services offered by LFIs and TPPs, as defined in the Consumer Protection Regulation 2020.</li><li data-v-46c336e9${_scopeId2}><strong data-v-46c336e9${_scopeId2}>Empirical dispute</strong> — an issue verifiable through API Hub data or logs (e.g. technical failures, erroneous transactions).</li><li data-v-46c336e9${_scopeId2}><strong data-v-46c336e9${_scopeId2}>Non-empirical dispute</strong> — a subjective or fraud-related issue, escalated to the CBUAE or to LFIs and TPPs.</li><li data-v-46c336e9${_scopeId2}><strong data-v-46c336e9${_scopeId2}>Key Facts Sheets</strong> — mandatory TPP disclosures detailing product/service terms, risks, and fees, per the Open Finance Regulation 2025.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Consumer / retail customer"),
                      createTextVNode(" — the end user of financial products or services offered by LFIs and TPPs, as defined in the Consumer Protection Regulation 2020.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Empirical dispute"),
                      createTextVNode(" — an issue verifiable through API Hub data or logs (e.g. technical failures, erroneous transactions).")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Non-empirical dispute"),
                      createTextVNode(" — a subjective or fraud-related issue, escalated to the CBUAE or to LFIs and TPPs.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Key Facts Sheets"),
                      createTextVNode(" — mandatory TPP disclosures detailing product/service terms, risks, and fees, per the Open Finance Regulation 2025.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, "Definitions"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Consumer / retail customer"),
                    createTextVNode(" — the end user of financial products or services offered by LFIs and TPPs, as defined in the Consumer Protection Regulation 2020.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Empirical dispute"),
                    createTextVNode(" — an issue verifiable through API Hub data or logs (e.g. technical failures, erroneous transactions).")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Non-empirical dispute"),
                    createTextVNode(" — a subjective or fraud-related issue, escalated to the CBUAE or to LFIs and TPPs.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Key Facts Sheets"),
                    createTextVNode(" — mandatory TPP disclosures detailing product/service terms, risks, and fees, per the Open Finance Regulation 2025.")
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
        eyebrow: "Principles",
        title: "Principles of retail consumer protection",
        lede: "Nebras adheres to the following principles to indirectly support retail consumer protection.",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-46c336e9${_scopeId2}><strong data-v-46c336e9${_scopeId2}>Transparency</strong> — ensure standards (e.g. consent flows) provide clear information to consumers via LFIs and TPPs.</li><li data-v-46c336e9${_scopeId2}><strong data-v-46c336e9${_scopeId2}>Fairness</strong> — promote equitable access to Open Finance services without discrimination.</li><li data-v-46c336e9${_scopeId2}><strong data-v-46c336e9${_scopeId2}>Security</strong> — mandate secure communication and authentication protocols under the Open Finance Regulation.</li><li data-v-46c336e9${_scopeId2}><strong data-v-46c336e9${_scopeId2}>Accountability</strong> — reinforce that LFIs and TPPs are accountable for consumer protection compliance, with Nebras supporting through standards and monitoring.</li><li data-v-46c336e9${_scopeId2}><strong data-v-46c336e9${_scopeId2}>Sustainability</strong> — support low-cost service provision and widespread distribution via commercial models.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Transparency"),
                      createTextVNode(" — ensure standards (e.g. consent flows) provide clear information to consumers via LFIs and TPPs.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Fairness"),
                      createTextVNode(" — promote equitable access to Open Finance services without discrimination.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Security"),
                      createTextVNode(" — mandate secure communication and authentication protocols under the Open Finance Regulation.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Accountability"),
                      createTextVNode(" — reinforce that LFIs and TPPs are accountable for consumer protection compliance, with Nebras supporting through standards and monitoring.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Sustainability"),
                      createTextVNode(" — support low-cost service provision and widespread distribution via commercial models.")
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
                    createVNode("strong", null, "Transparency"),
                    createTextVNode(" — ensure standards (e.g. consent flows) provide clear information to consumers via LFIs and TPPs.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Fairness"),
                    createTextVNode(" — promote equitable access to Open Finance services without discrimination.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Security"),
                    createTextVNode(" — mandate secure communication and authentication protocols under the Open Finance Regulation.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Accountability"),
                    createTextVNode(" — reinforce that LFIs and TPPs are accountable for consumer protection compliance, with Nebras supporting through standards and monitoring.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Sustainability"),
                    createTextVNode(" — support low-cost service provision and widespread distribution via commercial models.")
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
        id: "role",
        num: "04",
        color: "var(--at-blue-deep)",
        eyebrow: "Role & standards",
        title: "Nebras's role and the standards that support retail CX",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-46c336e9${_scopeId}>Nebras&#39;s role in the ecosystem</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-46c336e9${_scopeId2}>Sets technical, CX, and operational standards to facilitate secure data sharing and transaction initiation.</li><li data-v-46c336e9${_scopeId2}>Does not interact directly with consumers or have access to their data, ensuring neutrality per the Open Finance Regulation 2025.</li><li data-v-46c336e9${_scopeId2}>Provides indirect support for retail customers by establishing standards that enhance transparency and fairness in consumer-facing processes managed by LFIs and TPPs.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Sets technical, CX, and operational standards to facilitate secure data sharing and transaction initiation."),
                    createVNode("li", null, "Does not interact directly with consumers or have access to their data, ensuring neutrality per the Open Finance Regulation 2025."),
                    createVNode("li", null, "Provides indirect support for retail customers by establishing standards that enhance transparency and fairness in consumer-facing processes managed by LFIs and TPPs.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-46c336e9${_scopeId}>Standards supporting retail consumer experience</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-46c336e9${_scopeId2}><strong data-v-46c336e9${_scopeId2}>API consent flows</strong> — clear, user-friendly, secure consent mechanisms for data sharing and transaction initiation.</li><li data-v-46c336e9${_scopeId2}><strong data-v-46c336e9${_scopeId2}>Data portability</strong> — seamless, secure data transfer between LFIs and TPPs.</li><li data-v-46c336e9${_scopeId2}><strong data-v-46c336e9${_scopeId2}>TPP certification</strong> — functional and CX certifications that verify TPP compliance.</li><li data-v-46c336e9${_scopeId2}><strong data-v-46c336e9${_scopeId2}>Zero-cost data sharing</strong> — low-cost retail services enabled by data sharing within normal volume bounds at no cost, per Nebras’s commercial model.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "API consent flows"),
                      createTextVNode(" — clear, user-friendly, secure consent mechanisms for data sharing and transaction initiation.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Data portability"),
                      createTextVNode(" — seamless, secure data transfer between LFIs and TPPs.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "TPP certification"),
                      createTextVNode(" — functional and CX certifications that verify TPP compliance.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Zero-cost data sharing"),
                      createTextVNode(" — low-cost retail services enabled by data sharing within normal volume bounds at no cost, per Nebras’s commercial model.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, "Nebras's role in the ecosystem"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Sets technical, CX, and operational standards to facilitate secure data sharing and transaction initiation."),
                  createVNode("li", null, "Does not interact directly with consumers or have access to their data, ensuring neutrality per the Open Finance Regulation 2025."),
                  createVNode("li", null, "Provides indirect support for retail customers by establishing standards that enhance transparency and fairness in consumer-facing processes managed by LFIs and TPPs.")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Standards supporting retail consumer experience"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "API consent flows"),
                    createTextVNode(" — clear, user-friendly, secure consent mechanisms for data sharing and transaction initiation.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Data portability"),
                    createTextVNode(" — seamless, secure data transfer between LFIs and TPPs.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "TPP certification"),
                    createTextVNode(" — functional and CX certifications that verify TPP compliance.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Zero-cost data sharing"),
                    createTextVNode(" — low-cost retail services enabled by data sharing within normal volume bounds at no cost, per Nebras’s commercial model.")
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
        id: "liability",
        num: "05",
        color: "var(--at-navy)",
        eyebrow: "Liability & commercial model",
        title: "Where liability sits",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-46c336e9${_scopeId2}>Nebras enables zero-cost data sharing within normal volumes to support sustainable, low-cost retail services.</li><li data-v-46c336e9${_scopeId2}>LFIs and TPPs retain full liability for consumer protection and any issues arising from Open Finance activities, per the Open Finance Regulation 2025. Nebras does not assume any direct liability.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Nebras enables zero-cost data sharing within normal volumes to support sustainable, low-cost retail services."),
                    createVNode("li", null, "LFIs and TPPs retain full liability for consumer protection and any issues arising from Open Finance activities, per the Open Finance Regulation 2025. Nebras does not assume any direct liability.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Nebras enables zero-cost data sharing within normal volumes to support sustainable, low-cost retail services."),
                  createVNode("li", null, "LFIs and TPPs retain full liability for consumer protection and any issues arising from Open Finance activities, per the Open Finance Regulation 2025. Nebras does not assume any direct liability.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "monitoring",
        num: "06",
        color: "var(--at-teal-deep)",
        eyebrow: "Monitoring & compliance",
        title: "How compliance is monitored",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-46c336e9${_scopeId2}><strong data-v-46c336e9${_scopeId2}>API monitoring</strong> — continuous tracking of API activity, including logs, to detect anomalies (e.g. consent breaches, unauthorised access).</li><li data-v-46c336e9${_scopeId2}><strong data-v-46c336e9${_scopeId2}>TPP certification</strong> — ongoing reviews of functional and CX certification to ensure adherence to standards.</li><li data-v-46c336e9${_scopeId2}><strong data-v-46c336e9${_scopeId2}>Risk assessments</strong> — conducted for new or revised standards per the Enterprise Risk Management Policy.</li><li data-v-46c336e9${_scopeId2}><strong data-v-46c336e9${_scopeId2}>Escalation</strong> — non-compliance by LFIs or TPPs is reported to the CBUAE for supervisory action.</li><li data-v-46c336e9${_scopeId2}>Annual compliance reviews verify alignment with the retail support principles.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "API monitoring"),
                      createTextVNode(" — continuous tracking of API activity, including logs, to detect anomalies (e.g. consent breaches, unauthorised access).")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "TPP certification"),
                      createTextVNode(" — ongoing reviews of functional and CX certification to ensure adherence to standards.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Risk assessments"),
                      createTextVNode(" — conducted for new or revised standards per the Enterprise Risk Management Policy.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Escalation"),
                      createTextVNode(" — non-compliance by LFIs or TPPs is reported to the CBUAE for supervisory action.")
                    ]),
                    createVNode("li", null, "Annual compliance reviews verify alignment with the retail support principles.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-46c336e9${_scopeId}>Complaint and dispute handling</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-46c336e9${_scopeId2}>All complaints, including those from LFI/TPP customers relating to retail experiences, are processed through Nebras’s dispute management system via TPP/LFI logging.</li><li data-v-46c336e9${_scopeId2}>All processes and SLAs are held within the Nebras Interaction Guide.</li>`);
                } else {
                  return [
                    createVNode("li", null, "All complaints, including those from LFI/TPP customers relating to retail experiences, are processed through Nebras’s dispute management system via TPP/LFI logging."),
                    createVNode("li", null, "All processes and SLAs are held within the Nebras Interaction Guide.")
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
                    createVNode("strong", null, "API monitoring"),
                    createTextVNode(" — continuous tracking of API activity, including logs, to detect anomalies (e.g. consent breaches, unauthorised access).")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "TPP certification"),
                    createTextVNode(" — ongoing reviews of functional and CX certification to ensure adherence to standards.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Risk assessments"),
                    createTextVNode(" — conducted for new or revised standards per the Enterprise Risk Management Policy.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Escalation"),
                    createTextVNode(" — non-compliance by LFIs or TPPs is reported to the CBUAE for supervisory action.")
                  ]),
                  createVNode("li", null, "Annual compliance reviews verify alignment with the retail support principles.")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Complaint and dispute handling"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "All complaints, including those from LFI/TPP customers relating to retail experiences, are processed through Nebras’s dispute management system via TPP/LFI logging."),
                  createVNode("li", null, "All processes and SLAs are held within the Nebras Interaction Guide.")
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
        eyebrow: "Responsibilities & training",
        title: "Accountability and awareness",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-46c336e9${_scopeId}>Responsibilities and accountability</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-46c336e9${_scopeId2}><strong data-v-46c336e9${_scopeId2}>Board Risk &amp; Compliance Committee</strong> — oversees policy implementation and compliance.</li><li data-v-46c336e9${_scopeId2}><strong data-v-46c336e9${_scopeId2}>CEO</strong> — ensures standards align with CBUAE regulations.</li><li data-v-46c336e9${_scopeId2}><strong data-v-46c336e9${_scopeId2}>Executive officers</strong> — develop and maintain standards impacting retail customer experiences.</li><li data-v-46c336e9${_scopeId2}><strong data-v-46c336e9${_scopeId2}>Risk and Compliance Lead</strong> — monitors ecosystem risks, assesses retail impacts, and oversees compliance.</li><li data-v-46c336e9${_scopeId2}><strong data-v-46c336e9${_scopeId2}>Operations team</strong> — manages complaint workflows.</li><li data-v-46c336e9${_scopeId2}><strong data-v-46c336e9${_scopeId2}>All staff</strong> — report potential issues promptly to supervisors or the Risk Lead.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Board Risk & Compliance Committee"),
                      createTextVNode(" — oversees policy implementation and compliance.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "CEO"),
                      createTextVNode(" — ensures standards align with CBUAE regulations.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Executive officers"),
                      createTextVNode(" — develop and maintain standards impacting retail customer experiences.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Risk and Compliance Lead"),
                      createTextVNode(" — monitors ecosystem risks, assesses retail impacts, and oversees compliance.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Operations team"),
                      createTextVNode(" — manages complaint workflows.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "All staff"),
                      createTextVNode(" — report potential issues promptly to supervisors or the Risk Lead.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-46c336e9${_scopeId}>Training and awareness</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-46c336e9${_scopeId2}>Annual training for all staff on Nebras policies, the CBUAE Consumer Protection Regulation, and the Open Finance Regulation.</li><li data-v-46c336e9${_scopeId2}>Topics: Nebras’s indirect role in retail support, complaint handling, API monitoring procedures, and retail CX standards.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Annual training for all staff on Nebras policies, the CBUAE Consumer Protection Regulation, and the Open Finance Regulation."),
                    createVNode("li", null, "Topics: Nebras’s indirect role in retail support, complaint handling, API monitoring procedures, and retail CX standards.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, "Responsibilities and accountability"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Board Risk & Compliance Committee"),
                    createTextVNode(" — oversees policy implementation and compliance.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "CEO"),
                    createTextVNode(" — ensures standards align with CBUAE regulations.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Executive officers"),
                    createTextVNode(" — develop and maintain standards impacting retail customer experiences.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Risk and Compliance Lead"),
                    createTextVNode(" — monitors ecosystem risks, assesses retail impacts, and oversees compliance.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Operations team"),
                    createTextVNode(" — manages complaint workflows.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "All staff"),
                    createTextVNode(" — report potential issues promptly to supervisors or the Risk Lead.")
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "Training and awareness"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Annual training for all staff on Nebras policies, the CBUAE Consumer Protection Regulation, and the Open Finance Regulation."),
                  createVNode("li", null, "Topics: Nebras’s indirect role in retail support, complaint handling, API monitoring procedures, and retail CX standards.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "review",
        num: "08",
        color: "var(--at-gold)",
        eyebrow: "Reporting & enforcement",
        title: "Monitoring, reporting, review, and enforcement",
        tone: "surface",
        narrow: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-46c336e9${_scopeId2}><strong data-v-46c336e9${_scopeId2}>Monitoring</strong> — quarterly reviews of API logs and certification outcomes, with annual compliance reviews focused on retail impacts.</li><li data-v-46c336e9${_scopeId2}><strong data-v-46c336e9${_scopeId2}>Reporting</strong> — an annual report to the Board Risk &amp; Compliance Committee on disputes, compliance, and ecosystem issues.</li><li data-v-46c336e9${_scopeId2}><strong data-v-46c336e9${_scopeId2}>Review</strong> — annual policy review, or ad hoc if triggered by CBUAE regulation changes, business needs, or incidents. Exceptions are approved by the Board.</li><li data-v-46c336e9${_scopeId2}><strong data-v-46c336e9${_scopeId2}>Enforcement</strong> — internal violations (e.g. failure to report issues) may lead to disciplinary action; systemic ecosystem issues, including those affecting retail customers, are reported to the CBUAE for enforcement under the Open Finance Regulation.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Monitoring"),
                      createTextVNode(" — quarterly reviews of API logs and certification outcomes, with annual compliance reviews focused on retail impacts.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Reporting"),
                      createTextVNode(" — an annual report to the Board Risk & Compliance Committee on disputes, compliance, and ecosystem issues.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Review"),
                      createTextVNode(" — annual policy review, or ad hoc if triggered by CBUAE regulation changes, business needs, or incidents. Exceptions are approved by the Board.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Enforcement"),
                      createTextVNode(" — internal violations (e.g. failure to report issues) may lead to disciplinary action; systemic ecosystem issues, including those affecting retail customers, are reported to the CBUAE for enforcement under the Open Finance Regulation.")
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
                    createVNode("strong", null, "Monitoring"),
                    createTextVNode(" — quarterly reviews of API logs and certification outcomes, with annual compliance reviews focused on retail impacts.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Reporting"),
                    createTextVNode(" — an annual report to the Board Risk & Compliance Committee on disputes, compliance, and ecosystem issues.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Review"),
                    createTextVNode(" — annual policy review, or ad hoc if triggered by CBUAE regulation changes, business needs, or incidents. Exceptions are approved by the Board.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Enforcement"),
                    createTextVNode(" — internal violations (e.g. failure to report issues) may lead to disciplinary action; systemic ecosystem issues, including those affecting retail customers, are reported to the CBUAE for enforcement under the Open Finance Regulation.")
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
              href: "/internal/policies/complaints-and-disputes",
              category: "Customers & Conduct",
              title: "Complaints and Disputes Management Policy",
              desc: "The structured process for raising, assessing, resolving, and escalating complaints and disputes."
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRelatedCard, {
              href: "/internal/policies/marketing-and-advertising",
              category: "Customers & Conduct",
              title: "Marketing and Advertising Policy",
              desc: "Standards for accurate, fair, and compliant marketing and advertising."
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdRelatedCard, {
                href: "/internal/policies/complaints-and-disputes",
                category: "Customers & Conduct",
                title: "Complaints and Disputes Management Policy",
                desc: "The structured process for raising, assessing, resolving, and escalating complaints and disputes."
              }),
              createVNode(_component_EdRelatedCard, {
                href: "/internal/policies/marketing-and-advertising",
                category: "Customers & Conduct",
                title: "Marketing and Advertising Policy",
                desc: "Standards for accurate, fair, and compliant marketing and advertising."
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/internal/policies/retail-consumer-protection.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const retailConsumerProtection = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-46c336e9"]]);
export {
  retailConsumerProtection as default
};
