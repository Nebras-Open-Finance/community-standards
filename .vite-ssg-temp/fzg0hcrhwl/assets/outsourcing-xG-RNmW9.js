import { _ as __unplugin_components_0, a as __unplugin_components_2, b as __unplugin_components_6, c as __unplugin_components_7$2 } from "./EdBackStrip-COkyNhGh.js";
import { _ as __unplugin_components_7$1, a as __unplugin_components_8 } from "./EdStages-NkJQJXq7.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
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
  __name: "outsourcing",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({ title: "Outsourcing Policy · Internal Policies" });
    const sections = [
      { id: "overview", label: "Overview" },
      { id: "scope", label: "Scope & definitions" },
      { id: "requirement", label: "Requirement & materiality" },
      { id: "roles", label: "Roles & responsibilities" },
      { id: "lifecycle", label: "Outsourcing lifecycle" },
      { id: "agreement", label: "Due diligence & the agreement" },
      { id: "termination", label: "Termination & exit" }
    ];
    const meta = [
      { label: "Applies to", value: "All Nebras staff" },
      { label: "Classification", value: "Restricted" },
      { label: "Version", value: "1.0 · Feb 2025" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdBackStrip = __unplugin_components_0;
      const _component_EdHero = __unplugin_components_0$1;
      const _component_EdInPageNav = __unplugin_components_2;
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdBullets = __unplugin_components_5;
      const _component_EdNote = __unplugin_components_7;
      const _component_EdStages = __unplugin_components_7$1;
      const _component_EdStage = __unplugin_components_8;
      const _component_EdRelatedCards = __unplugin_components_6;
      const _component_EdRelatedCard = __unplugin_components_7$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-page" }, _attrs))} data-v-00722133>`);
      _push(ssrRenderComponent(_component_EdBackStrip, {
        href: "/internal/policies/",
        text: "All policies"
      }, null, _parent));
      _push(ssrRenderComponent(_component_EdHero, {
        eyebrow: "Internal · Restricted",
        "eyebrow-color": "var(--at-navy)",
        title: "Outsourcing Policy",
        meta,
        lede: "As Nebras progressively shifts from internal resources to outsourced resources and services, this policy establishes the standards, governance, and processes that govern outsourcing across all operations — framing how the organisation identifies, mitigates, and manages the risks that arise when activities are delivered by an Outsourcing Service Provider."
      }, null, _parent));
      _push(ssrRenderComponent(_component_EdInPageNav, { sections }, null, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "overview",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Overview",
        title: "Purpose and objectives",
        lede: "Although outsourcing can offer various advantages, it also heightens Nebras’s vulnerability to multiple risks. This policy provides a framework that guides employees to safeguard and manage those risks while outsourcing activities to service providers.",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-00722133${_scopeId2}>Established in 2025 as part of the UAE’s national financial infrastructure strategy, Nebras plays a pivotal role in shaping the financial landscape of the UAE. As it strives to develop and operate best-in-class financial products and services, adherence to a robust outsourcing policy is imperative. The policy reflects a commitment to proactively identify and mitigate potential risks, implement industry-led practices, and foster a culture of vigilance and accountability among employees.</p>`);
                } else {
                  return [
                    createVNode("p", null, "Established in 2025 as part of the UAE’s national financial infrastructure strategy, Nebras plays a pivotal role in shaping the financial landscape of the UAE. As it strives to develop and operate best-in-class financial products and services, adherence to a robust outsourcing policy is imperative. The policy reflects a commitment to proactively identify and mitigate potential risks, implement industry-led practices, and foster a culture of vigilance and accountability among employees.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-00722133${_scopeId}>This policy aims to</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-00722133${_scopeId2}>Develop a framework to manage the risks arising from outsourcing activities.</li><li data-v-00722133${_scopeId2}>Establish an effective governance structure with preventive and detective controls to mitigate risks arising out of outsourcing.</li><li data-v-00722133${_scopeId2}>Stipulate guidelines for activities that could be outsourced, and for assigning materiality to an Outsourcing Service Provider.</li><li data-v-00722133${_scopeId2}>Provide broad guidelines for onboarding, monitoring, and exiting the agreement with an Outsourcing Service Provider.</li><li data-v-00722133${_scopeId2}>Assign roles and responsibilities within Nebras for the implementation and management of the policy.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Develop a framework to manage the risks arising from outsourcing activities."),
                    createVNode("li", null, "Establish an effective governance structure with preventive and detective controls to mitigate risks arising out of outsourcing."),
                    createVNode("li", null, "Stipulate guidelines for activities that could be outsourced, and for assigning materiality to an Outsourcing Service Provider."),
                    createVNode("li", null, "Provide broad guidelines for onboarding, monitoring, and exiting the agreement with an Outsourcing Service Provider."),
                    createVNode("li", null, "Assign roles and responsibilities within Nebras for the implementation and management of the policy.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-00722133${_scopeId}>Goals</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-00722133${_scopeId2}>The goal of this policy is to provide guidance and direction on the outsourcing of Nebras’s activities to service providers. It is also Nebras’s intention to ensure that its outsourced activities comply with relevant laws, regulations, and standards.</p>`);
                } else {
                  return [
                    createVNode("p", null, "The goal of this policy is to provide guidance and direction on the outsourcing of Nebras’s activities to service providers. It is also Nebras’s intention to ensure that its outsourced activities comply with relevant laws, regulations, and standards.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("p", null, "Established in 2025 as part of the UAE’s national financial infrastructure strategy, Nebras plays a pivotal role in shaping the financial landscape of the UAE. As it strives to develop and operate best-in-class financial products and services, adherence to a robust outsourcing policy is imperative. The policy reflects a commitment to proactively identify and mitigate potential risks, implement industry-led practices, and foster a culture of vigilance and accountability among employees.")
                ]),
                _: 1
              }),
              createVNode("h3", null, "This policy aims to"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Develop a framework to manage the risks arising from outsourcing activities."),
                  createVNode("li", null, "Establish an effective governance structure with preventive and detective controls to mitigate risks arising out of outsourcing."),
                  createVNode("li", null, "Stipulate guidelines for activities that could be outsourced, and for assigning materiality to an Outsourcing Service Provider."),
                  createVNode("li", null, "Provide broad guidelines for onboarding, monitoring, and exiting the agreement with an Outsourcing Service Provider."),
                  createVNode("li", null, "Assign roles and responsibilities within Nebras for the implementation and management of the policy.")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Goals"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("p", null, "The goal of this policy is to provide guidance and direction on the outsourcing of Nebras’s activities to service providers. It is also Nebras’s intention to ensure that its outsourced activities comply with relevant laws, regulations, and standards.")
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
        title: "Scope, audience, and key terms",
        lede: "Outsourcing is a contractual relationship between Nebras and an Outsourcing Service Provider, which may or may not be subject to regulation. In this setup the provider executes a process, service, or activity — directly or via sub-outsourcing — that would normally be conducted by Nebras itself.",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-00722133${_scopeId}>Audience</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-00722133${_scopeId2}>All Nebras staff, including permanent employees, temporary employees, consultants, interns, and authorised third-party staff members.</p>`);
                } else {
                  return [
                    createVNode("p", null, "All Nebras staff, including permanent employees, temporary employees, consultants, interns, and authorised third-party staff members.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-00722133${_scopeId}>Definitions</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-00722133${_scopeId2}><strong data-v-00722133${_scopeId2}>Board</strong> — the Nebras Board of Managers, responsible for governance and oversight of outsourcing activities.</li><li data-v-00722133${_scopeId2}><strong data-v-00722133${_scopeId2}>Confidential Information</strong> — sensitive or proprietary information, including customer data, operational data, system details, or documents processed by a service provider.</li><li data-v-00722133${_scopeId2}><strong data-v-00722133${_scopeId2}>Due Diligence</strong> — the assessment conducted to evaluate an Outsourcing Service Provider’s capability, financial stability, operational controls, technology, and risk posture before onboarding.</li><li data-v-00722133${_scopeId2}><strong data-v-00722133${_scopeId2}>Exit Strategy</strong> — the set of procedures ensuring that Nebras can smoothly transition away from a service provider upon termination without disrupting operations.</li><li data-v-00722133${_scopeId2}><strong data-v-00722133${_scopeId2}>Material Outsourcing</strong> — outsourcing arrangements where failure or disruption could significantly affect Nebras’s operational continuity, regulatory obligations, or reputation.</li><li data-v-00722133${_scopeId2}><strong data-v-00722133${_scopeId2}>Nebras</strong> — an affiliated entity of the Central Bank of the UAE, aimed at operating the UAE Open Finance common infrastructure and supporting a broader Open Data Economy.</li><li data-v-00722133${_scopeId2}><strong data-v-00722133${_scopeId2}>Outsourcing</strong> — a contractual arrangement in which an external service provider performs a function, activity, or process on behalf of Nebras.</li><li data-v-00722133${_scopeId2}><strong data-v-00722133${_scopeId2}>Outsourcing Agreement</strong> — a legally binding contract between Nebras and an Outsourcing Service Provider detailing scope, performance standards, confidentiality, SLAs, and termination conditions.</li><li data-v-00722133${_scopeId2}><strong data-v-00722133${_scopeId2}>Outsourcing Service Provider</strong> — a third-party entity engaged to perform outsourced functions or services for Nebras.</li><li data-v-00722133${_scopeId2}><strong data-v-00722133${_scopeId2}>Risk Assessment</strong> — identification and evaluation of risks associated with outsourcing, including regulatory, financial, operational, and reputational risks.</li><li data-v-00722133${_scopeId2}><strong data-v-00722133${_scopeId2}>RCC (Risk and Compliance Committee)</strong> — committee overseeing the implementation of the Outsourcing Policy, reviewing outsourcing risks, incidents, and compliance effectiveness.</li><li data-v-00722133${_scopeId2}><strong data-v-00722133${_scopeId2}>SLA</strong> — Service Level Agreement.</li><li data-v-00722133${_scopeId2}><strong data-v-00722133${_scopeId2}>Sub-Outsourcing</strong> — an Outsourcing Service Provider delegating part or all of the outsourced activity to another third party.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Board"),
                      createTextVNode(" — the Nebras Board of Managers, responsible for governance and oversight of outsourcing activities.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Confidential Information"),
                      createTextVNode(" — sensitive or proprietary information, including customer data, operational data, system details, or documents processed by a service provider.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Due Diligence"),
                      createTextVNode(" — the assessment conducted to evaluate an Outsourcing Service Provider’s capability, financial stability, operational controls, technology, and risk posture before onboarding.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Exit Strategy"),
                      createTextVNode(" — the set of procedures ensuring that Nebras can smoothly transition away from a service provider upon termination without disrupting operations.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Material Outsourcing"),
                      createTextVNode(" — outsourcing arrangements where failure or disruption could significantly affect Nebras’s operational continuity, regulatory obligations, or reputation.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Nebras"),
                      createTextVNode(" — an affiliated entity of the Central Bank of the UAE, aimed at operating the UAE Open Finance common infrastructure and supporting a broader Open Data Economy.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Outsourcing"),
                      createTextVNode(" — a contractual arrangement in which an external service provider performs a function, activity, or process on behalf of Nebras.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Outsourcing Agreement"),
                      createTextVNode(" — a legally binding contract between Nebras and an Outsourcing Service Provider detailing scope, performance standards, confidentiality, SLAs, and termination conditions.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Outsourcing Service Provider"),
                      createTextVNode(" — a third-party entity engaged to perform outsourced functions or services for Nebras.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Risk Assessment"),
                      createTextVNode(" — identification and evaluation of risks associated with outsourcing, including regulatory, financial, operational, and reputational risks.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "RCC (Risk and Compliance Committee)"),
                      createTextVNode(" — committee overseeing the implementation of the Outsourcing Policy, reviewing outsourcing risks, incidents, and compliance effectiveness.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "SLA"),
                      createTextVNode(" — Service Level Agreement.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Sub-Outsourcing"),
                      createTextVNode(" — an Outsourcing Service Provider delegating part or all of the outsourced activity to another third party.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-00722133${_scopeId2}>All exceptions to this policy MUST be explicitly approved by the Risk and Compliance Committee. An exception is valid for a specific time and MUST be reassessed and re-approved when necessary. Related risk-management, outsourcing awareness, and communication-management arrangements are set out in the Nebras Information Security Policy.</p>`);
                } else {
                  return [
                    createVNode("p", null, "All exceptions to this policy MUST be explicitly approved by the Risk and Compliance Committee. An exception is valid for a specific time and MUST be reassessed and re-approved when necessary. Related risk-management, outsourcing awareness, and communication-management arrangements are set out in the Nebras Information Security Policy.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, "Audience"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("p", null, "All Nebras staff, including permanent employees, temporary employees, consultants, interns, and authorised third-party staff members.")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Definitions"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Board"),
                    createTextVNode(" — the Nebras Board of Managers, responsible for governance and oversight of outsourcing activities.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Confidential Information"),
                    createTextVNode(" — sensitive or proprietary information, including customer data, operational data, system details, or documents processed by a service provider.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Due Diligence"),
                    createTextVNode(" — the assessment conducted to evaluate an Outsourcing Service Provider’s capability, financial stability, operational controls, technology, and risk posture before onboarding.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Exit Strategy"),
                    createTextVNode(" — the set of procedures ensuring that Nebras can smoothly transition away from a service provider upon termination without disrupting operations.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Material Outsourcing"),
                    createTextVNode(" — outsourcing arrangements where failure or disruption could significantly affect Nebras’s operational continuity, regulatory obligations, or reputation.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Nebras"),
                    createTextVNode(" — an affiliated entity of the Central Bank of the UAE, aimed at operating the UAE Open Finance common infrastructure and supporting a broader Open Data Economy.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Outsourcing"),
                    createTextVNode(" — a contractual arrangement in which an external service provider performs a function, activity, or process on behalf of Nebras.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Outsourcing Agreement"),
                    createTextVNode(" — a legally binding contract between Nebras and an Outsourcing Service Provider detailing scope, performance standards, confidentiality, SLAs, and termination conditions.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Outsourcing Service Provider"),
                    createTextVNode(" — a third-party entity engaged to perform outsourced functions or services for Nebras.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Risk Assessment"),
                    createTextVNode(" — identification and evaluation of risks associated with outsourcing, including regulatory, financial, operational, and reputational risks.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "RCC (Risk and Compliance Committee)"),
                    createTextVNode(" — committee overseeing the implementation of the Outsourcing Policy, reviewing outsourcing risks, incidents, and compliance effectiveness.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "SLA"),
                    createTextVNode(" — Service Level Agreement.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Sub-Outsourcing"),
                    createTextVNode(" — an Outsourcing Service Provider delegating part or all of the outsourced activity to another third party.")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, null, {
                default: withCtx(() => [
                  createVNode("p", null, "All exceptions to this policy MUST be explicitly approved by the Risk and Compliance Committee. An exception is valid for a specific time and MUST be reassessed and re-approved when necessary. Related risk-management, outsourcing awareness, and communication-management arrangements are set out in the Nebras Information Security Policy.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "requirement",
        num: "03",
        color: "var(--at-blue)",
        eyebrow: "Requirement of outsourcing",
        title: "Regulatory obligations and materiality",
        lede: "Outsourcing a function does not reduce Nebras’s responsibilities: Nebras remains ultimately accountable for the outsourced function and for the risks it carries.",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-00722133${_scopeId}>Regulatory and compliance requirements</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-00722133${_scopeId2}>Nebras MUST ensure that the Outsourcing Service Provider maintains the same high level of care in delivering services as Nebras would have exercised had the activity not been outsourced, and MUST refrain from engaging any provider that could harm its reputation.</li><li data-v-00722133${_scopeId2}>Whether the provider is based in the UAE or overseas, the outsourcing process MUST NOT hinder or disrupt Nebras’s capacity to effectively supervise and manage its operations.</li><li data-v-00722133${_scopeId2}>Unless it is a group company, the provider MUST NOT be owned or controlled by any director, key managerial personnel, or approver involved in the outsourcing arrangement. This requirement may be waived only with the consent of the Board or a Board-level Committee, with proper disclosure, oversight, and monitoring, and the Board MUST ensure that no conflicts of interest arise.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Nebras MUST ensure that the Outsourcing Service Provider maintains the same high level of care in delivering services as Nebras would have exercised had the activity not been outsourced, and MUST refrain from engaging any provider that could harm its reputation."),
                    createVNode("li", null, "Whether the provider is based in the UAE or overseas, the outsourcing process MUST NOT hinder or disrupt Nebras’s capacity to effectively supervise and manage its operations."),
                    createVNode("li", null, "Unless it is a group company, the provider MUST NOT be owned or controlled by any director, key managerial personnel, or approver involved in the outsourcing arrangement. This requirement may be waived only with the consent of the Board or a Board-level Committee, with proper disclosure, oversight, and monitoring, and the Board MUST ensure that no conflicts of interest arise.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-00722133${_scopeId}>Assessment of need and attendant risks</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-00722133${_scopeId2}>The Nebras team MUST assess the necessity of outsourcing through a thorough evaluation of the associated benefits, risks, and the presence of adequate processes to mitigate those risks. The team will:</p>`);
                } else {
                  return [
                    createVNode("p", null, "The Nebras team MUST assess the necessity of outsourcing through a thorough evaluation of the associated benefits, risks, and the presence of adequate processes to mitigate those risks. The team will:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-00722133${_scopeId2}>Assess the necessity for outsourcing by evaluating the critical nature of the activity in question.</li><li data-v-00722133${_scopeId2}>Establish the expectations and desired outcomes associated with outsourcing.</li><li data-v-00722133${_scopeId2}>Identify the key success factors and conduct a cost-benefit analysis.</li><li data-v-00722133${_scopeId2}>Select the appropriate outsourcing model.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Assess the necessity for outsourcing by evaluating the critical nature of the activity in question."),
                    createVNode("li", null, "Establish the expectations and desired outcomes associated with outsourcing."),
                    createVNode("li", null, "Identify the key success factors and conduct a cost-benefit analysis."),
                    createVNode("li", null, "Select the appropriate outsourcing model.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-00722133${_scopeId}>Material outsourcing classification criteria</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-00722133${_scopeId2}>An outsourcing arrangement MUST be classified as Material where one or more of the following criteria are met:</p>`);
                } else {
                  return [
                    createVNode("p", null, "An outsourcing arrangement MUST be classified as Material where one or more of the following criteria are met:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-00722133${_scopeId2}>The outsourced activity supports a critical or time-sensitive service or process as identified through the Business Impact Analysis (BIA), including processes with defined RTO or MTPD requirements.</li><li data-v-00722133${_scopeId2}>Failure or disruption of the outsourced service may result in material regulatory non-compliance, breach of licence conditions, or legal obligations.</li><li data-v-00722133${_scopeId2}>The arrangement involves access to or processing of Confidential or Restricted information, including operational, system, customer, or financial data.</li><li data-v-00722133${_scopeId2}>Disruption of the service may cause significant financial loss, operational disruption, or reputational impact to Nebras.</li><li data-v-00722133${_scopeId2}>The service has limited substitutability, where alternative providers cannot be reasonably engaged within an acceptable timeframe.</li><li data-v-00722133${_scopeId2}>The arrangement is assessed as high-risk under the Enterprise Risk Management (ERM) risk assessment methodology.</li>`);
                } else {
                  return [
                    createVNode("li", null, "The outsourced activity supports a critical or time-sensitive service or process as identified through the Business Impact Analysis (BIA), including processes with defined RTO or MTPD requirements."),
                    createVNode("li", null, "Failure or disruption of the outsourced service may result in material regulatory non-compliance, breach of licence conditions, or legal obligations."),
                    createVNode("li", null, "The arrangement involves access to or processing of Confidential or Restricted information, including operational, system, customer, or financial data."),
                    createVNode("li", null, "Disruption of the service may cause significant financial loss, operational disruption, or reputational impact to Nebras."),
                    createVNode("li", null, "The service has limited substitutability, where alternative providers cannot be reasonably engaged within an acceptable timeframe."),
                    createVNode("li", null, "The arrangement is assessed as high-risk under the Enterprise Risk Management (ERM) risk assessment methodology.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-00722133${_scopeId2}>Outsourcing arrangements classified as Material MUST be subject to enhanced governance, approval, monitoring, and exit planning requirements.</p>`);
                } else {
                  return [
                    createVNode("p", null, "Outsourcing arrangements classified as Material MUST be subject to enhanced governance, approval, monitoring, and exit planning requirements.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, "Regulatory and compliance requirements"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Nebras MUST ensure that the Outsourcing Service Provider maintains the same high level of care in delivering services as Nebras would have exercised had the activity not been outsourced, and MUST refrain from engaging any provider that could harm its reputation."),
                  createVNode("li", null, "Whether the provider is based in the UAE or overseas, the outsourcing process MUST NOT hinder or disrupt Nebras’s capacity to effectively supervise and manage its operations."),
                  createVNode("li", null, "Unless it is a group company, the provider MUST NOT be owned or controlled by any director, key managerial personnel, or approver involved in the outsourcing arrangement. This requirement may be waived only with the consent of the Board or a Board-level Committee, with proper disclosure, oversight, and monitoring, and the Board MUST ensure that no conflicts of interest arise.")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Assessment of need and attendant risks"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("p", null, "The Nebras team MUST assess the necessity of outsourcing through a thorough evaluation of the associated benefits, risks, and the presence of adequate processes to mitigate those risks. The team will:")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Assess the necessity for outsourcing by evaluating the critical nature of the activity in question."),
                  createVNode("li", null, "Establish the expectations and desired outcomes associated with outsourcing."),
                  createVNode("li", null, "Identify the key success factors and conduct a cost-benefit analysis."),
                  createVNode("li", null, "Select the appropriate outsourcing model.")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Material outsourcing classification criteria"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("p", null, "An outsourcing arrangement MUST be classified as Material where one or more of the following criteria are met:")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "The outsourced activity supports a critical or time-sensitive service or process as identified through the Business Impact Analysis (BIA), including processes with defined RTO or MTPD requirements."),
                  createVNode("li", null, "Failure or disruption of the outsourced service may result in material regulatory non-compliance, breach of licence conditions, or legal obligations."),
                  createVNode("li", null, "The arrangement involves access to or processing of Confidential or Restricted information, including operational, system, customer, or financial data."),
                  createVNode("li", null, "Disruption of the service may cause significant financial loss, operational disruption, or reputational impact to Nebras."),
                  createVNode("li", null, "The service has limited substitutability, where alternative providers cannot be reasonably engaged within an acceptable timeframe."),
                  createVNode("li", null, "The arrangement is assessed as high-risk under the Enterprise Risk Management (ERM) risk assessment methodology.")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("p", null, "Outsourcing arrangements classified as Material MUST be subject to enhanced governance, approval, monitoring, and exit planning requirements.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "roles",
        num: "04",
        color: "var(--at-blue-deep)",
        eyebrow: "Roles & responsibilities",
        title: "Who governs outsourcing",
        lede: "The Board and Senior Management are ultimately responsible for outsourcing activities and for managing the risks inherent in them. Committees of the Board and Senior Management are responsible for the business function as well as the oversight and assurance functions in respect of outsourcing.",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-00722133${_scopeId}>Board</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-00722133${_scopeId2}>Establish a framework for the approval of outsourcing activities based on risk assessment and materiality.</li><li data-v-00722133${_scopeId2}>Formulate policies to assess the risks and significance of both current and potential outsourcing agreements.</li><li data-v-00722133${_scopeId2}>Implement an appropriate administrative structure to support the outsourcing processes.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Establish a framework for the approval of outsourcing activities based on risk assessment and materiality."),
                    createVNode("li", null, "Formulate policies to assess the risks and significance of both current and potential outsourcing agreements."),
                    createVNode("li", null, "Implement an appropriate administrative structure to support the outsourcing processes.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-00722133${_scopeId}>Chief Executive Officer</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-00722133${_scopeId2}>Accept and endorse the overall responsibility of outsourcing.</li><li data-v-00722133${_scopeId2}>Enforce organisation-wide outsourcing policy implementation across Nebras.</li><li data-v-00722133${_scopeId2}>Oversee and monitor compliance with the outsourcing policy.</li><li data-v-00722133${_scopeId2}>Enforce outsourcing accountability throughout the organisation.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Accept and endorse the overall responsibility of outsourcing."),
                    createVNode("li", null, "Enforce organisation-wide outsourcing policy implementation across Nebras."),
                    createVNode("li", null, "Oversee and monitor compliance with the outsourcing policy."),
                    createVNode("li", null, "Enforce outsourcing accountability throughout the organisation.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-00722133${_scopeId}>Senior Management</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-00722133${_scopeId2}>Develop outsourcing policies and procedures, and assess the risks and significance of all current and potential agreements under a framework aligned with the enterprise-wide risk management strategy approved by the Board.</li><li data-v-00722133${_scopeId2}>Conduct prior assessments of potential agreements and regular evaluations of existing ones, focusing on performance reviews, criticality, and associated risks.</li><li data-v-00722133${_scopeId2}>Identify outsourcing risks as they emerge, and monitor, mitigate, manage, and report these risks to the Board or Executive Committee promptly.</li><li data-v-00722133${_scopeId2}>Ensure appropriate business continuity plans are established for realistic disruptive scenarios — including the exit of any third-party service provider — and that these plans are tested regularly.</li><li data-v-00722133${_scopeId2}>Oversee third-party operations to ensure data confidentiality and timely resolution of customer complaints.</li><li data-v-00722133${_scopeId2}>Periodically verify compliance with relevant legislation, regulations, Board-approved policies, and performance standards, reporting findings to the Board or Executive Committee.</li><li data-v-00722133${_scopeId2}>Develop the necessary capacity and skill sets within the organisation to effectively oversee outsourced activities.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Develop outsourcing policies and procedures, and assess the risks and significance of all current and potential agreements under a framework aligned with the enterprise-wide risk management strategy approved by the Board."),
                    createVNode("li", null, "Conduct prior assessments of potential agreements and regular evaluations of existing ones, focusing on performance reviews, criticality, and associated risks."),
                    createVNode("li", null, "Identify outsourcing risks as they emerge, and monitor, mitigate, manage, and report these risks to the Board or Executive Committee promptly."),
                    createVNode("li", null, "Ensure appropriate business continuity plans are established for realistic disruptive scenarios — including the exit of any third-party service provider — and that these plans are tested regularly."),
                    createVNode("li", null, "Oversee third-party operations to ensure data confidentiality and timely resolution of customer complaints."),
                    createVNode("li", null, "Periodically verify compliance with relevant legislation, regulations, Board-approved policies, and performance standards, reporting findings to the Board or Executive Committee."),
                    createVNode("li", null, "Develop the necessary capacity and skill sets within the organisation to effectively oversee outsourced activities.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-00722133${_scopeId}>Nebras COO</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-00722133${_scopeId2}>Assist Senior Management in the identification, measurement, monitoring, mitigation, and management of outsourcing risks.</li><li data-v-00722133${_scopeId2}>Maintain a centralised database of all outsourcing agreements, accessible for review by the Board, Senior Management, and other relevant stakeholders.</li><li data-v-00722133${_scopeId2}>Oversee and supervise outsourced activities to ensure providers adhere to performance standards and deliver uninterrupted services, while reporting to Senior Management, coordinating periodic due diligence, and addressing concerns.</li><li data-v-00722133${_scopeId2}>Develop the documentation for contractual agreements, including service level management, vendor operation monitoring, key risk indicators, and classification of vendors by assessed risk level.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Assist Senior Management in the identification, measurement, monitoring, mitigation, and management of outsourcing risks."),
                    createVNode("li", null, "Maintain a centralised database of all outsourcing agreements, accessible for review by the Board, Senior Management, and other relevant stakeholders."),
                    createVNode("li", null, "Oversee and supervise outsourced activities to ensure providers adhere to performance standards and deliver uninterrupted services, while reporting to Senior Management, coordinating periodic due diligence, and addressing concerns."),
                    createVNode("li", null, "Develop the documentation for contractual agreements, including service level management, vendor operation monitoring, key risk indicators, and classification of vendors by assessed risk level.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-00722133${_scopeId}>Risk and Compliance Committee</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-00722133${_scopeId2}>Supervise and ensure the implementation of the Outsourcing Policy.</li><li data-v-00722133${_scopeId2}>Conduct periodic reviews of outsourcing processes, risk assessments, audit reports, incident reports, and their corrective actions.</li><li data-v-00722133${_scopeId2}>Review and approve the outsourcing policies and procedures periodically, and discuss outsourcing strategic directions.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Supervise and ensure the implementation of the Outsourcing Policy."),
                    createVNode("li", null, "Conduct periodic reviews of outsourcing processes, risk assessments, audit reports, incident reports, and their corrective actions."),
                    createVNode("li", null, "Review and approve the outsourcing policies and procedures periodically, and discuss outsourcing strategic directions.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-00722133${_scopeId}>Nebras employees</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-00722133${_scopeId2}>Actively participate in outsourcing awareness training sessions and activities.</li><li data-v-00722133${_scopeId2}>Apply best practices in daily work activities.</li><li data-v-00722133${_scopeId2}>Report incidents, breaches, or suspicious activities to the appropriate channels.</li><li data-v-00722133${_scopeId2}>Provide feedback on the effectiveness of awareness training materials and delivery methods.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Actively participate in outsourcing awareness training sessions and activities."),
                    createVNode("li", null, "Apply best practices in daily work activities."),
                    createVNode("li", null, "Report incidents, breaches, or suspicious activities to the appropriate channels."),
                    createVNode("li", null, "Provide feedback on the effectiveness of awareness training materials and delivery methods.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-00722133${_scopeId2}>The COO reports quarterly to the Risk and Compliance Committee, the CEO, and the Board of Managers on the details and status of outsourcing, along with any non-compliance documented against the approved policy.</p>`);
                } else {
                  return [
                    createVNode("p", null, "The COO reports quarterly to the Risk and Compliance Committee, the CEO, and the Board of Managers on the details and status of outsourcing, along with any non-compliance documented against the approved policy.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, "Board"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Establish a framework for the approval of outsourcing activities based on risk assessment and materiality."),
                  createVNode("li", null, "Formulate policies to assess the risks and significance of both current and potential outsourcing agreements."),
                  createVNode("li", null, "Implement an appropriate administrative structure to support the outsourcing processes.")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Chief Executive Officer"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Accept and endorse the overall responsibility of outsourcing."),
                  createVNode("li", null, "Enforce organisation-wide outsourcing policy implementation across Nebras."),
                  createVNode("li", null, "Oversee and monitor compliance with the outsourcing policy."),
                  createVNode("li", null, "Enforce outsourcing accountability throughout the organisation.")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Senior Management"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Develop outsourcing policies and procedures, and assess the risks and significance of all current and potential agreements under a framework aligned with the enterprise-wide risk management strategy approved by the Board."),
                  createVNode("li", null, "Conduct prior assessments of potential agreements and regular evaluations of existing ones, focusing on performance reviews, criticality, and associated risks."),
                  createVNode("li", null, "Identify outsourcing risks as they emerge, and monitor, mitigate, manage, and report these risks to the Board or Executive Committee promptly."),
                  createVNode("li", null, "Ensure appropriate business continuity plans are established for realistic disruptive scenarios — including the exit of any third-party service provider — and that these plans are tested regularly."),
                  createVNode("li", null, "Oversee third-party operations to ensure data confidentiality and timely resolution of customer complaints."),
                  createVNode("li", null, "Periodically verify compliance with relevant legislation, regulations, Board-approved policies, and performance standards, reporting findings to the Board or Executive Committee."),
                  createVNode("li", null, "Develop the necessary capacity and skill sets within the organisation to effectively oversee outsourced activities.")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Nebras COO"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Assist Senior Management in the identification, measurement, monitoring, mitigation, and management of outsourcing risks."),
                  createVNode("li", null, "Maintain a centralised database of all outsourcing agreements, accessible for review by the Board, Senior Management, and other relevant stakeholders."),
                  createVNode("li", null, "Oversee and supervise outsourced activities to ensure providers adhere to performance standards and deliver uninterrupted services, while reporting to Senior Management, coordinating periodic due diligence, and addressing concerns."),
                  createVNode("li", null, "Develop the documentation for contractual agreements, including service level management, vendor operation monitoring, key risk indicators, and classification of vendors by assessed risk level.")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Risk and Compliance Committee"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Supervise and ensure the implementation of the Outsourcing Policy."),
                  createVNode("li", null, "Conduct periodic reviews of outsourcing processes, risk assessments, audit reports, incident reports, and their corrective actions."),
                  createVNode("li", null, "Review and approve the outsourcing policies and procedures periodically, and discuss outsourcing strategic directions.")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Nebras employees"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Actively participate in outsourcing awareness training sessions and activities."),
                  createVNode("li", null, "Apply best practices in daily work activities."),
                  createVNode("li", null, "Report incidents, breaches, or suspicious activities to the appropriate channels."),
                  createVNode("li", null, "Provide feedback on the effectiveness of awareness training materials and delivery methods.")
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, null, {
                default: withCtx(() => [
                  createVNode("p", null, "The COO reports quarterly to the Risk and Compliance Committee, the CEO, and the Board of Managers on the details and status of outsourcing, along with any non-compliance documented against the approved policy.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "lifecycle",
        num: "05",
        color: "var(--at-navy)",
        eyebrow: "Outsourcing lifecycle",
        title: "From assessment to exit",
        lede: "Each outsourcing arrangement moves through a defined lifecycle, with materiality determining the depth of governance applied at every stage.",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdStages, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "01",
                    title: "Assess the need",
                    "num-color": "var(--at-navy)"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-00722133${_scopeId3}>Evaluate the criticality of the activity, expected outcomes, key success factors, and a cost-benefit analysis, then select the appropriate outsourcing model and confirm materiality.</p>`);
                      } else {
                        return [
                          createVNode("p", null, "Evaluate the criticality of the activity, expected outcomes, key success factors, and a cost-benefit analysis, then select the appropriate outsourcing model and confirm materiality.")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "02",
                    title: "Due diligence",
                    "num-color": "var(--at-navy)"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-00722133${_scopeId3}>Conduct thorough due diligence across qualitative, quantitative, financial, operational, legal, and reputational aspects, seeking independent evaluations and market insights where feasible, and select the provider through a risk assessment framework.</p>`);
                      } else {
                        return [
                          createVNode("p", null, "Conduct thorough due diligence across qualitative, quantitative, financial, operational, legal, and reputational aspects, seeking independent evaluations and market insights where feasible, and select the provider through a risk assessment framework.")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "03",
                    title: "Execute the agreement",
                    "num-color": "var(--at-navy)"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-00722133${_scopeId3}>Proceed only after a legally binding written agreement, reviewed by the COO, is executed in the standard format — any modification requires explicit approval and amendments are documented as supplements.</p>`);
                      } else {
                        return [
                          createVNode("p", null, "Proceed only after a legally binding written agreement, reviewed by the COO, is executed in the standard format — any modification requires explicit approval and amendments are documented as supplements.")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "04",
                    title: "Monitor and reassess",
                    "num-color": "var(--at-navy)"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-00722133${_scopeId3}>Regularly monitor and assess the provider, and perform periodic reassessments — at least annually, or more frequently for elevated risk, material incidents, regulatory expectations, or significant changes in operations, ownership, or control — with enhanced focus on Material arrangements.</p>`);
                      } else {
                        return [
                          createVNode("p", null, "Regularly monitor and assess the provider, and perform periodic reassessments — at least annually, or more frequently for elevated risk, material incidents, regulatory expectations, or significant changes in operations, ownership, or control — with enhanced focus on Material arrangements.")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "05",
                    title: "Exit and transition",
                    "num-color": "var(--at-navy)"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-00722133${_scopeId3}>On termination, establish a suitable handover procedure for data and processes in collaboration with the provider, ensuring minimal disruption to Nebras’s operations while preserving its reputation.</p>`);
                      } else {
                        return [
                          createVNode("p", null, "On termination, establish a suitable handover procedure for data and processes in collaboration with the provider, ensuring minimal disruption to Nebras’s operations while preserving its reputation.")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_EdStage, {
                      num: "01",
                      title: "Assess the need",
                      "num-color": "var(--at-navy)"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, "Evaluate the criticality of the activity, expected outcomes, key success factors, and a cost-benefit analysis, then select the appropriate outsourcing model and confirm materiality.")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_EdStage, {
                      num: "02",
                      title: "Due diligence",
                      "num-color": "var(--at-navy)"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, "Conduct thorough due diligence across qualitative, quantitative, financial, operational, legal, and reputational aspects, seeking independent evaluations and market insights where feasible, and select the provider through a risk assessment framework.")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_EdStage, {
                      num: "03",
                      title: "Execute the agreement",
                      "num-color": "var(--at-navy)"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, "Proceed only after a legally binding written agreement, reviewed by the COO, is executed in the standard format — any modification requires explicit approval and amendments are documented as supplements.")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_EdStage, {
                      num: "04",
                      title: "Monitor and reassess",
                      "num-color": "var(--at-navy)"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, "Regularly monitor and assess the provider, and perform periodic reassessments — at least annually, or more frequently for elevated risk, material incidents, regulatory expectations, or significant changes in operations, ownership, or control — with enhanced focus on Material arrangements.")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_EdStage, {
                      num: "05",
                      title: "Exit and transition",
                      "num-color": "var(--at-navy)"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, "On termination, establish a suitable handover procedure for data and processes in collaboration with the provider, ensuring minimal disruption to Nebras’s operations while preserving its reputation.")
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
                    title: "Assess the need",
                    "num-color": "var(--at-navy)"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, "Evaluate the criticality of the activity, expected outcomes, key success factors, and a cost-benefit analysis, then select the appropriate outsourcing model and confirm materiality.")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_EdStage, {
                    num: "02",
                    title: "Due diligence",
                    "num-color": "var(--at-navy)"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, "Conduct thorough due diligence across qualitative, quantitative, financial, operational, legal, and reputational aspects, seeking independent evaluations and market insights where feasible, and select the provider through a risk assessment framework.")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_EdStage, {
                    num: "03",
                    title: "Execute the agreement",
                    "num-color": "var(--at-navy)"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, "Proceed only after a legally binding written agreement, reviewed by the COO, is executed in the standard format — any modification requires explicit approval and amendments are documented as supplements.")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_EdStage, {
                    num: "04",
                    title: "Monitor and reassess",
                    "num-color": "var(--at-navy)"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, "Regularly monitor and assess the provider, and perform periodic reassessments — at least annually, or more frequently for elevated risk, material incidents, regulatory expectations, or significant changes in operations, ownership, or control — with enhanced focus on Material arrangements.")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_EdStage, {
                    num: "05",
                    title: "Exit and transition",
                    "num-color": "var(--at-navy)"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, "On termination, establish a suitable handover procedure for data and processes in collaboration with the provider, ensuring minimal disruption to Nebras’s operations while preserving its reputation.")
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
        id: "agreement",
        num: "06",
        color: "var(--at-teal-deep)",
        eyebrow: "Due diligence & the agreement",
        title: "Selecting providers and structuring contracts",
        lede: "Due diligence evaluates a provider’s ability to meet the requirements of the outsourcing agreement, and the agreement itself codifies the standards, controls, and rights that protect Nebras throughout the arrangement.",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-00722133${_scopeId}>Due diligence of the provider</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-00722133${_scopeId2}>Assess the provider’s experience and proven ability to implement and support operations.</li><li data-v-00722133${_scopeId2}>Assess financial stability and the capacity to meet obligations even in challenging circumstances.</li><li data-v-00722133${_scopeId2}>Consider business reputation, organisational culture, compliance history, and any existing or potential legal issues.</li><li data-v-00722133${_scopeId2}>Consider external influences such as the political, economic, social, and legal landscape of the provider’s operating jurisdiction.</li><li data-v-00722133${_scopeId2}>Evaluate technology, infrastructure reliability, internal controls, audit coverage, reporting and monitoring processes, data backup strategies, business continuity planning, and disaster recovery.</li><li data-v-00722133${_scopeId2}>Review existing controls, requirements, and contractual provisions designed to ensure data protection.</li><li data-v-00722133${_scopeId2}>Assess the ability to uphold confidentiality, particularly where the provider interacts with multiple clients.</li><li data-v-00722133${_scopeId2}>Assess the capacity to enforce contractual agreements and associated rights, including those related to data storage, protection, and confidentiality.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Assess the provider’s experience and proven ability to implement and support operations."),
                    createVNode("li", null, "Assess financial stability and the capacity to meet obligations even in challenging circumstances."),
                    createVNode("li", null, "Consider business reputation, organisational culture, compliance history, and any existing or potential legal issues."),
                    createVNode("li", null, "Consider external influences such as the political, economic, social, and legal landscape of the provider’s operating jurisdiction."),
                    createVNode("li", null, "Evaluate technology, infrastructure reliability, internal controls, audit coverage, reporting and monitoring processes, data backup strategies, business continuity planning, and disaster recovery."),
                    createVNode("li", null, "Review existing controls, requirements, and contractual provisions designed to ensure data protection."),
                    createVNode("li", null, "Assess the ability to uphold confidentiality, particularly where the provider interacts with multiple clients."),
                    createVNode("li", null, "Assess the capacity to enforce contractual agreements and associated rights, including those related to data storage, protection, and confidentiality.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-00722133${_scopeId2}>Nebras will engage in contractual agreements exclusively with providers operating under jurisdictions that ensure the enforceability of contracts and the rights afforded to Nebras. Periodic reassessments MUST include evaluation of service performance, financial stability, risk profile, compliance with contractual obligations, information security posture, and business continuity capabilities, with outcomes documented and used to determine remediation, continued suitability, escalation, or exit decisions.</p>`);
                } else {
                  return [
                    createVNode("p", null, "Nebras will engage in contractual agreements exclusively with providers operating under jurisdictions that ensure the enforceability of contracts and the rights afforded to Nebras. Periodic reassessments MUST include evaluation of service performance, financial stability, risk profile, compliance with contractual obligations, information security posture, and business continuity capabilities, with outcomes documented and used to determine remediation, continued suitability, escalation, or exit decisions.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-00722133${_scopeId2}>The due diligence assessment MUST be presented to the Board Committee for approval.</p>`);
                } else {
                  return [
                    createVNode("p", null, "The due diligence assessment MUST be presented to the Board Committee for approval.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-00722133${_scopeId}>Important aspects of the agreement</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-00722133${_scopeId2}>Details of the activity being outsourced, including service and performance standards, extending to sub-contractors where applicable.</li><li data-v-00722133${_scopeId2}>A clause requiring Nebras’s prior approval or consent before the provider onboards sub-contractors for all or part of an outsourced activity.</li><li data-v-00722133${_scopeId2}>Nebras’s access to all data, books, records, logs, alerts, and business premises relevant to the outsourced activity.</li><li data-v-00722133${_scopeId2}>Regular monitoring and assessment of the provider so that any necessary corrective measure can be taken immediately.</li><li data-v-00722133${_scopeId2}>Deliverables, including SLAs, to measure the quality and quantity of service levels.</li><li data-v-00722133${_scopeId2}>The nature of the legal and regulatory relationship between the parties, addressing risks and mitigation strategies identified at the risk evaluation and due diligence stages.</li><li data-v-00722133${_scopeId2}>Controls for maintaining confidentiality of data, incorporating the provider’s liability to Nebras in the event of any breach.</li><li data-v-00722133${_scopeId2}>Clearly defined roles and responsibilities and suitable indemnification clauses; any limitation-of-liability consideration is assessed in consultation with the legal team.</li><li data-v-00722133${_scopeId2}>The resolution process, events of default, indemnities, remedies, recourse, contingency plans for business continuity, and testing requirements.</li><li data-v-00722133${_scopeId2}>A clause making the provider contractually liable for the performance and risk management practices of its sub-contractors.</li><li data-v-00722133${_scopeId2}>The provider’s obligation to comply with directions issued by Nebras in relation to the outsourced activities.</li><li data-v-00722133${_scopeId2}>Nebras’s termination rights, including the ability to transfer the arrangement to another provider if necessary.</li><li data-v-00722133${_scopeId2}>A non-disclosure agreement covering information retained by the provider.</li><li data-v-00722133${_scopeId2}>An explicit right of audit and access clause granting Nebras, its internal and external auditors, and any relevant regulatory or supervisory authority unrestricted access to the provider’s premises, systems, data, records, personnel, and sub-contractors.</li><li data-v-00722133${_scopeId2}>A requirement for the provider to maintain documented exit and transition plans and to participate in periodic exit testing and contingency simulations — including simulated termination, provider failure, or service disruption scenarios — as reasonably requested by Nebras.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Details of the activity being outsourced, including service and performance standards, extending to sub-contractors where applicable."),
                    createVNode("li", null, "A clause requiring Nebras’s prior approval or consent before the provider onboards sub-contractors for all or part of an outsourced activity."),
                    createVNode("li", null, "Nebras’s access to all data, books, records, logs, alerts, and business premises relevant to the outsourced activity."),
                    createVNode("li", null, "Regular monitoring and assessment of the provider so that any necessary corrective measure can be taken immediately."),
                    createVNode("li", null, "Deliverables, including SLAs, to measure the quality and quantity of service levels."),
                    createVNode("li", null, "The nature of the legal and regulatory relationship between the parties, addressing risks and mitigation strategies identified at the risk evaluation and due diligence stages."),
                    createVNode("li", null, "Controls for maintaining confidentiality of data, incorporating the provider’s liability to Nebras in the event of any breach."),
                    createVNode("li", null, "Clearly defined roles and responsibilities and suitable indemnification clauses; any limitation-of-liability consideration is assessed in consultation with the legal team."),
                    createVNode("li", null, "The resolution process, events of default, indemnities, remedies, recourse, contingency plans for business continuity, and testing requirements."),
                    createVNode("li", null, "A clause making the provider contractually liable for the performance and risk management practices of its sub-contractors."),
                    createVNode("li", null, "The provider’s obligation to comply with directions issued by Nebras in relation to the outsourced activities."),
                    createVNode("li", null, "Nebras’s termination rights, including the ability to transfer the arrangement to another provider if necessary."),
                    createVNode("li", null, "A non-disclosure agreement covering information retained by the provider."),
                    createVNode("li", null, "An explicit right of audit and access clause granting Nebras, its internal and external auditors, and any relevant regulatory or supervisory authority unrestricted access to the provider’s premises, systems, data, records, personnel, and sub-contractors."),
                    createVNode("li", null, "A requirement for the provider to maintain documented exit and transition plans and to participate in periodic exit testing and contingency simulations — including simulated termination, provider failure, or service disruption scenarios — as reasonably requested by Nebras.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, "Due diligence of the provider"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Assess the provider’s experience and proven ability to implement and support operations."),
                  createVNode("li", null, "Assess financial stability and the capacity to meet obligations even in challenging circumstances."),
                  createVNode("li", null, "Consider business reputation, organisational culture, compliance history, and any existing or potential legal issues."),
                  createVNode("li", null, "Consider external influences such as the political, economic, social, and legal landscape of the provider’s operating jurisdiction."),
                  createVNode("li", null, "Evaluate technology, infrastructure reliability, internal controls, audit coverage, reporting and monitoring processes, data backup strategies, business continuity planning, and disaster recovery."),
                  createVNode("li", null, "Review existing controls, requirements, and contractual provisions designed to ensure data protection."),
                  createVNode("li", null, "Assess the ability to uphold confidentiality, particularly where the provider interacts with multiple clients."),
                  createVNode("li", null, "Assess the capacity to enforce contractual agreements and associated rights, including those related to data storage, protection, and confidentiality.")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("p", null, "Nebras will engage in contractual agreements exclusively with providers operating under jurisdictions that ensure the enforceability of contracts and the rights afforded to Nebras. Periodic reassessments MUST include evaluation of service performance, financial stability, risk profile, compliance with contractual obligations, information security posture, and business continuity capabilities, with outcomes documented and used to determine remediation, continued suitability, escalation, or exit decisions.")
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, null, {
                default: withCtx(() => [
                  createVNode("p", null, "The due diligence assessment MUST be presented to the Board Committee for approval.")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Important aspects of the agreement"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Details of the activity being outsourced, including service and performance standards, extending to sub-contractors where applicable."),
                  createVNode("li", null, "A clause requiring Nebras’s prior approval or consent before the provider onboards sub-contractors for all or part of an outsourced activity."),
                  createVNode("li", null, "Nebras’s access to all data, books, records, logs, alerts, and business premises relevant to the outsourced activity."),
                  createVNode("li", null, "Regular monitoring and assessment of the provider so that any necessary corrective measure can be taken immediately."),
                  createVNode("li", null, "Deliverables, including SLAs, to measure the quality and quantity of service levels."),
                  createVNode("li", null, "The nature of the legal and regulatory relationship between the parties, addressing risks and mitigation strategies identified at the risk evaluation and due diligence stages."),
                  createVNode("li", null, "Controls for maintaining confidentiality of data, incorporating the provider’s liability to Nebras in the event of any breach."),
                  createVNode("li", null, "Clearly defined roles and responsibilities and suitable indemnification clauses; any limitation-of-liability consideration is assessed in consultation with the legal team."),
                  createVNode("li", null, "The resolution process, events of default, indemnities, remedies, recourse, contingency plans for business continuity, and testing requirements."),
                  createVNode("li", null, "A clause making the provider contractually liable for the performance and risk management practices of its sub-contractors."),
                  createVNode("li", null, "The provider’s obligation to comply with directions issued by Nebras in relation to the outsourced activities."),
                  createVNode("li", null, "Nebras’s termination rights, including the ability to transfer the arrangement to another provider if necessary."),
                  createVNode("li", null, "A non-disclosure agreement covering information retained by the provider."),
                  createVNode("li", null, "An explicit right of audit and access clause granting Nebras, its internal and external auditors, and any relevant regulatory or supervisory authority unrestricted access to the provider’s premises, systems, data, records, personnel, and sub-contractors."),
                  createVNode("li", null, "A requirement for the provider to maintain documented exit and transition plans and to participate in periodic exit testing and contingency simulations — including simulated termination, provider failure, or service disruption scenarios — as reasonably requested by Nebras.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "termination",
        num: "07",
        color: "var(--at-teal)",
        eyebrow: "Termination & exit",
        title: "Ending the arrangement safely",
        lede: "Every termination — early or otherwise — MUST preserve business continuity, data confidentiality, and Nebras’s reputation through a controlled handover.",
        tone: "cream",
        narrow: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-00722133${_scopeId2}>The agreement MUST incorporate a termination clause with a specified minimum notice period, ensuring business continuity during and after termination while outsourced services continue.</li><li data-v-00722133${_scopeId2}>The obligation to maintain the confidentiality of customer information MUST persist even after the contract has expired or been terminated by either party.</li><li data-v-00722133${_scopeId2}>The agreement MUST include provisions on data privacy, data protection, and the secure removal or destruction of data, hardware, and all records, both digital and physical.</li><li data-v-00722133${_scopeId2}>The provider MUST fully cooperate with Nebras and any new provider(s) to facilitate a seamless transition, and MUST NOT delete, purge, revoke, alter, or modify any data during the transition period unless specifically instructed in writing by the Central Bank or Nebras.</li><li data-v-00722133${_scopeId2}>The contract MUST outline the conditions for default termination or an early exit option, covering scenarios such as a change in ownership of the provider, insolvency or liquidation, and judicial indictment, whether in the UAE or elsewhere.</li><li data-v-00722133${_scopeId2}>In every instance of termination, a suitable handover procedure for data and processes MUST be established in collaboration with the provider, ensuring minimal disruption to the continuity of Nebras’s operations.</li>`);
                } else {
                  return [
                    createVNode("li", null, "The agreement MUST incorporate a termination clause with a specified minimum notice period, ensuring business continuity during and after termination while outsourced services continue."),
                    createVNode("li", null, "The obligation to maintain the confidentiality of customer information MUST persist even after the contract has expired or been terminated by either party."),
                    createVNode("li", null, "The agreement MUST include provisions on data privacy, data protection, and the secure removal or destruction of data, hardware, and all records, both digital and physical."),
                    createVNode("li", null, "The provider MUST fully cooperate with Nebras and any new provider(s) to facilitate a seamless transition, and MUST NOT delete, purge, revoke, alter, or modify any data during the transition period unless specifically instructed in writing by the Central Bank or Nebras."),
                    createVNode("li", null, "The contract MUST outline the conditions for default termination or an early exit option, covering scenarios such as a change in ownership of the provider, insolvency or liquidation, and judicial indictment, whether in the UAE or elsewhere."),
                    createVNode("li", null, "In every instance of termination, a suitable handover procedure for data and processes MUST be established in collaboration with the provider, ensuring minimal disruption to the continuity of Nebras’s operations.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "The agreement MUST incorporate a termination clause with a specified minimum notice period, ensuring business continuity during and after termination while outsourced services continue."),
                  createVNode("li", null, "The obligation to maintain the confidentiality of customer information MUST persist even after the contract has expired or been terminated by either party."),
                  createVNode("li", null, "The agreement MUST include provisions on data privacy, data protection, and the secure removal or destruction of data, hardware, and all records, both digital and physical."),
                  createVNode("li", null, "The provider MUST fully cooperate with Nebras and any new provider(s) to facilitate a seamless transition, and MUST NOT delete, purge, revoke, alter, or modify any data during the transition period unless specifically instructed in writing by the Central Bank or Nebras."),
                  createVNode("li", null, "The contract MUST outline the conditions for default termination or an early exit option, covering scenarios such as a change in ownership of the provider, insolvency or liquidation, and judicial indictment, whether in the UAE or elsewhere."),
                  createVNode("li", null, "In every instance of termination, a suitable handover procedure for data and processes MUST be established in collaboration with the provider, ensuring minimal disruption to the continuity of Nebras’s operations.")
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
              href: "/internal/policies/procurement",
              category: "Governance & Oversight",
              title: "Procurement Policy",
              desc: "How providers are sourced and selected before an outsourcing arrangement is entered into."
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRelatedCard, {
              href: "/internal/policies/enterprise-risk-management",
              category: "Risk, Security & Compliance",
              title: "Enterprise Risk Management Policy",
              desc: "The ERM methodology under which outsourcing arrangements are risk-assessed and classified as Material."
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdRelatedCard, {
                href: "/internal/policies/procurement",
                category: "Governance & Oversight",
                title: "Procurement Policy",
                desc: "How providers are sourced and selected before an outsourcing arrangement is entered into."
              }),
              createVNode(_component_EdRelatedCard, {
                href: "/internal/policies/enterprise-risk-management",
                category: "Risk, Security & Compliance",
                title: "Enterprise Risk Management Policy",
                desc: "The ERM methodology under which outsourcing arrangements are risk-assessed and classified as Material."
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/internal/policies/outsourcing.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const outsourcing = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-00722133"]]);
export {
  outsourcing as default
};
