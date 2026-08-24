import { _ as __unplugin_components_0, a as __unplugin_components_2, b as __unplugin_components_6, c as __unplugin_components_7 } from "./EdBackStrip-COkyNhGh.js";
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
  __name: "corporate-governance",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({ title: "Corporate Governance Policy · Internal Policies" });
    const sections = [
      { id: "terms", label: "Terms & definitions" },
      { id: "overview", label: "Overview" },
      { id: "framework", label: "Governance framework" },
      { id: "committees", label: "Board committees" },
      { id: "structure", label: "Organization structure" },
      { id: "conflicts", label: "Conflicts & segregation" }
    ];
    const meta = [
      { label: "Applies to", value: "Nebras" },
      { label: "Classification", value: "Restricted" },
      { label: "Version", value: "1.0 · Sep 2024" }
    ];
    const keyNums = [
      { value: "5", unit: "committees", label: "Board committees supporting oversight" },
      { value: "3", unit: "lines", label: "Three Lines of Defense model" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdBackStrip = __unplugin_components_0;
      const _component_EdHero = __unplugin_components_0$1;
      const _component_EdInPageNav = __unplugin_components_2;
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdBullets = __unplugin_components_5;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdRelatedCards = __unplugin_components_6;
      const _component_EdRelatedCard = __unplugin_components_7;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-page" }, _attrs))} data-v-c25ba6ee>`);
      _push(ssrRenderComponent(_component_EdBackStrip, {
        href: "/internal/policies/",
        text: "All policies"
      }, null, _parent));
      _push(ssrRenderComponent(_component_EdHero, {
        eyebrow: "Internal · Restricted",
        "eyebrow-color": "var(--at-navy)",
        title: "Corporate Governance Policy",
        meta,
        lede: "This policy establishes the framework that guides Nebras’s governance practices — defining the structure, processes, and mechanisms by which the entity is governed to ensure <strong>transparency</strong>, <strong>accountability</strong>, and <strong>integrity</strong> across all aspects of its operation of the UAE Open Finance common infrastructure.",
        "key-nums": keyNums
      }, null, _parent));
      _push(ssrRenderComponent(_component_EdInPageNav, { sections }, null, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "terms",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Terms & definitions",
        title: "Key terms used in this policy",
        lede: "The following terms carry specific meaning throughout this policy.",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-c25ba6ee${_scopeId2}><strong data-v-c25ba6ee${_scopeId2}>Nebras (the organization)</strong> — an affiliated entity of the Central Bank of the UAE, aimed at operating the UAE Open Finance common infrastructure and supporting a broader Open Data Economy.</li><li data-v-c25ba6ee${_scopeId2}><strong data-v-c25ba6ee${_scopeId2}>Board of Managers (BoM, or Board)</strong> — the Board of Managers as defined by the Contract of Establishment of Nebras.</li><li data-v-c25ba6ee${_scopeId2}><strong data-v-c25ba6ee${_scopeId2}>TPP</strong> — Third Party Providers providing services based on the data consumed via the API Hub.</li><li data-v-c25ba6ee${_scopeId2}><strong data-v-c25ba6ee${_scopeId2}>VAS</strong> — Value-Added Services offered through the API Hub.</li><li data-v-c25ba6ee${_scopeId2}><strong data-v-c25ba6ee${_scopeId2}>VAS Provider</strong> — a company providing Value-Added Services for TPPs via the API Hub.</li><li data-v-c25ba6ee${_scopeId2}><strong data-v-c25ba6ee${_scopeId2}>API Hub</strong> — the Open Finance API Hub that enables API calls from TPPs to LFIs.</li><li data-v-c25ba6ee${_scopeId2}><strong data-v-c25ba6ee${_scopeId2}>Risk</strong> — the effect of uncertainty on objectives, representing the possibility of deviation from intended outcomes. Deviation can be positive (opportunity), negative (threat), or both, and is typically characterized by its sources, potential events, their consequences, and the likelihood of occurrence.</li><li data-v-c25ba6ee${_scopeId2}><strong data-v-c25ba6ee${_scopeId2}>Risk Appetite</strong> — the amount and type of risk that Nebras is willing and prepared to accept in pursuit of its objectives at ‘face value’, reflecting inherent risk exposure before the analysis and evaluation of any current controls.</li><li data-v-c25ba6ee${_scopeId2}><strong data-v-c25ba6ee${_scopeId2}>Three Lines of Defense</strong> — consists of Business (1st Line), Risk and Compliance (2nd Line), and Audit (3rd Line). Business units, support and control functions, and Internal Audit remain independent and segregated from each other to ensure different levels of assurance to the Board of Managers.</li><li data-v-c25ba6ee${_scopeId2}><strong data-v-c25ba6ee${_scopeId2}>Mitigation or Action Owners</strong> — those responsible for the implementation of mitigations and/or actions, agreeing on the mitigation design, resourcing, and timeframes prior to implementation.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Nebras (the organization)"),
                      createTextVNode(" — an affiliated entity of the Central Bank of the UAE, aimed at operating the UAE Open Finance common infrastructure and supporting a broader Open Data Economy.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Board of Managers (BoM, or Board)"),
                      createTextVNode(" — the Board of Managers as defined by the Contract of Establishment of Nebras.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "TPP"),
                      createTextVNode(" — Third Party Providers providing services based on the data consumed via the API Hub.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "VAS"),
                      createTextVNode(" — Value-Added Services offered through the API Hub.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "VAS Provider"),
                      createTextVNode(" — a company providing Value-Added Services for TPPs via the API Hub.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "API Hub"),
                      createTextVNode(" — the Open Finance API Hub that enables API calls from TPPs to LFIs.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Risk"),
                      createTextVNode(" — the effect of uncertainty on objectives, representing the possibility of deviation from intended outcomes. Deviation can be positive (opportunity), negative (threat), or both, and is typically characterized by its sources, potential events, their consequences, and the likelihood of occurrence.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Risk Appetite"),
                      createTextVNode(" — the amount and type of risk that Nebras is willing and prepared to accept in pursuit of its objectives at ‘face value’, reflecting inherent risk exposure before the analysis and evaluation of any current controls.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Three Lines of Defense"),
                      createTextVNode(" — consists of Business (1st Line), Risk and Compliance (2nd Line), and Audit (3rd Line). Business units, support and control functions, and Internal Audit remain independent and segregated from each other to ensure different levels of assurance to the Board of Managers.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Mitigation or Action Owners"),
                      createTextVNode(" — those responsible for the implementation of mitigations and/or actions, agreeing on the mitigation design, resourcing, and timeframes prior to implementation.")
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
                    createVNode("strong", null, "Nebras (the organization)"),
                    createTextVNode(" — an affiliated entity of the Central Bank of the UAE, aimed at operating the UAE Open Finance common infrastructure and supporting a broader Open Data Economy.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Board of Managers (BoM, or Board)"),
                    createTextVNode(" — the Board of Managers as defined by the Contract of Establishment of Nebras.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "TPP"),
                    createTextVNode(" — Third Party Providers providing services based on the data consumed via the API Hub.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "VAS"),
                    createTextVNode(" — Value-Added Services offered through the API Hub.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "VAS Provider"),
                    createTextVNode(" — a company providing Value-Added Services for TPPs via the API Hub.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "API Hub"),
                    createTextVNode(" — the Open Finance API Hub that enables API calls from TPPs to LFIs.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Risk"),
                    createTextVNode(" — the effect of uncertainty on objectives, representing the possibility of deviation from intended outcomes. Deviation can be positive (opportunity), negative (threat), or both, and is typically characterized by its sources, potential events, their consequences, and the likelihood of occurrence.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Risk Appetite"),
                    createTextVNode(" — the amount and type of risk that Nebras is willing and prepared to accept in pursuit of its objectives at ‘face value’, reflecting inherent risk exposure before the analysis and evaluation of any current controls.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Three Lines of Defense"),
                    createTextVNode(" — consists of Business (1st Line), Risk and Compliance (2nd Line), and Audit (3rd Line). Business units, support and control functions, and Internal Audit remain independent and segregated from each other to ensure different levels of assurance to the Board of Managers.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Mitigation or Action Owners"),
                    createTextVNode(" — those responsible for the implementation of mitigations and/or actions, agreeing on the mitigation design, resourcing, and timeframes prior to implementation.")
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
        id: "overview",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "Overview",
        title: "Purpose, scope, and governance of the policy",
        lede: "The Corporate Governance Policy defines the structure, processes, and mechanisms by which Nebras is governed, ensuring transparency, accountability, and integrity in all aspects of its operations.",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-c25ba6ee${_scopeId}>Purpose</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-c25ba6ee${_scopeId2}>Establish clear governance principles that ensure the effective oversight and management of Nebras.</li><li data-v-c25ba6ee${_scopeId2}>Promote a culture of transparency, accountability, and ethical conduct in all business activities.</li><li data-v-c25ba6ee${_scopeId2}>Safeguard the interests of all stakeholders, including financial institutions, third-party providers (TPPs), regulators, and the broader financial ecosystem.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Establish clear governance principles that ensure the effective oversight and management of Nebras."),
                    createVNode("li", null, "Promote a culture of transparency, accountability, and ethical conduct in all business activities."),
                    createVNode("li", null, "Safeguard the interests of all stakeholders, including financial institutions, third-party providers (TPPs), regulators, and the broader financial ecosystem.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-c25ba6ee${_scopeId}>Scope</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-c25ba6ee${_scopeId2}>This policy applies to all employees, management, Board members, Board committees, and VAS providers of Nebras. It encompasses all departments.</p>`);
                } else {
                  return [
                    createVNode("p", null, "This policy applies to all employees, management, Board members, Board committees, and VAS providers of Nebras. It encompasses all departments.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-c25ba6ee${_scopeId}>Governance and review</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-c25ba6ee${_scopeId2}>This policy is periodically reviewed and amended by the Nebras Risk and Compliance Department, with the Board’s approval, to align with the latest business environment and Nebras’s strategic objectives.</li><li data-v-c25ba6ee${_scopeId2}>The policy MUST be reviewed if a regulatory change occurs affecting Nebras’s activities.</li><li data-v-c25ba6ee${_scopeId2}>Where any deviation from this policy or related processes is required, the requester MUST seek risk review and acceptance approval from the Risk and Compliance Department.</li>`);
                } else {
                  return [
                    createVNode("li", null, "This policy is periodically reviewed and amended by the Nebras Risk and Compliance Department, with the Board’s approval, to align with the latest business environment and Nebras’s strategic objectives."),
                    createVNode("li", null, "The policy MUST be reviewed if a regulatory change occurs affecting Nebras’s activities."),
                    createVNode("li", null, "Where any deviation from this policy or related processes is required, the requester MUST seek risk review and acceptance approval from the Risk and Compliance Department.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-c25ba6ee${_scopeId}>Compliance</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-c25ba6ee${_scopeId2}>Violations of this policy MUST be brought to the attention of the Risk and Compliance Department, and corrective actions taken to remedy non-compliance issues and findings.</li><li data-v-c25ba6ee${_scopeId2}>Penalties for disciplinary action are consistent with the severity of the incident(s), as determined by the investigation by the Risk and Compliance Committee.</li><li data-v-c25ba6ee${_scopeId2}>If a criminal offence is considered to have been committed, further action — in consultation with external authorities — may be taken to assist in prosecution, in alignment with the ERM Policy’s procedures on risk and compliance escalation.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Violations of this policy MUST be brought to the attention of the Risk and Compliance Department, and corrective actions taken to remedy non-compliance issues and findings."),
                    createVNode("li", null, "Penalties for disciplinary action are consistent with the severity of the incident(s), as determined by the investigation by the Risk and Compliance Committee."),
                    createVNode("li", null, "If a criminal offence is considered to have been committed, further action — in consultation with external authorities — may be taken to assist in prosecution, in alignment with the ERM Policy’s procedures on risk and compliance escalation.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, "Purpose"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Establish clear governance principles that ensure the effective oversight and management of Nebras."),
                  createVNode("li", null, "Promote a culture of transparency, accountability, and ethical conduct in all business activities."),
                  createVNode("li", null, "Safeguard the interests of all stakeholders, including financial institutions, third-party providers (TPPs), regulators, and the broader financial ecosystem.")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Scope"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("p", null, "This policy applies to all employees, management, Board members, Board committees, and VAS providers of Nebras. It encompasses all departments.")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Governance and review"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "This policy is periodically reviewed and amended by the Nebras Risk and Compliance Department, with the Board’s approval, to align with the latest business environment and Nebras’s strategic objectives."),
                  createVNode("li", null, "The policy MUST be reviewed if a regulatory change occurs affecting Nebras’s activities."),
                  createVNode("li", null, "Where any deviation from this policy or related processes is required, the requester MUST seek risk review and acceptance approval from the Risk and Compliance Department.")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Compliance"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Violations of this policy MUST be brought to the attention of the Risk and Compliance Department, and corrective actions taken to remedy non-compliance issues and findings."),
                  createVNode("li", null, "Penalties for disciplinary action are consistent with the severity of the incident(s), as determined by the investigation by the Risk and Compliance Committee."),
                  createVNode("li", null, "If a criminal offence is considered to have been committed, further action — in consultation with external authorities — may be taken to assist in prosecution, in alignment with the ERM Policy’s procedures on risk and compliance escalation.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "framework",
        num: "03",
        color: "var(--at-blue)",
        eyebrow: "Governance framework",
        title: "The Board of Managers",
        lede: "The Board of Managers holds ultimate responsibility for the strategic direction, governance framework, risk oversight, and overall performance of Nebras.",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-c25ba6ee${_scopeId}>Composition</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-c25ba6ee${_scopeId2}>The Board of Managers is composed of individuals selected for their expertise, experience, and ability to contribute to the strategic oversight of Nebras. The Board includes representatives from the CBUAE, participating banks, insurers, and independent / ecosystem directors to ensure diverse perspectives and comprehensive governance. The number of Board members and their specific roles are defined in the entity’s Contract of Establishment.</p>`);
                } else {
                  return [
                    createVNode("p", null, "The Board of Managers is composed of individuals selected for their expertise, experience, and ability to contribute to the strategic oversight of Nebras. The Board includes representatives from the CBUAE, participating banks, insurers, and independent / ecosystem directors to ensure diverse perspectives and comprehensive governance. The number of Board members and their specific roles are defined in the entity’s Contract of Establishment.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-c25ba6ee${_scopeId}>Responsibilities</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-c25ba6ee${_scopeId2}><strong data-v-c25ba6ee${_scopeId2}>Strategic Oversight</strong> — providing strategic direction, managing decision-making votes, and ensuring alignment with the entity’s mission and objectives.</li><li data-v-c25ba6ee${_scopeId2}><strong data-v-c25ba6ee${_scopeId2}>Risk Management</strong> — setting the risk appetite and overseeing risk management practices to keep risk levels within appetite. Practices are governed by the risk appetite articulated in the Enterprise Risk Management (ERM) Policy; any deviations from appetite MUST be escalated to the Risk and Compliance Committee for review and approval.</li><li data-v-c25ba6ee${_scopeId2}><strong data-v-c25ba6ee${_scopeId2}>Performance Evaluation</strong> — assessing the performance of the entity and its senior management team, in collaboration with the CBUAE team, to ensure alignment with KPIs.</li><li data-v-c25ba6ee${_scopeId2}><strong data-v-c25ba6ee${_scopeId2}>Regulatory Compliance</strong> — ensuring the entity adheres to all relevant regulations and standards.</li><li data-v-c25ba6ee${_scopeId2}><strong data-v-c25ba6ee${_scopeId2}>Financial Management</strong> — overseeing the entity’s financial performance and ensuring alignment with established financial targets and budgets.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Strategic Oversight"),
                      createTextVNode(" — providing strategic direction, managing decision-making votes, and ensuring alignment with the entity’s mission and objectives.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Risk Management"),
                      createTextVNode(" — setting the risk appetite and overseeing risk management practices to keep risk levels within appetite. Practices are governed by the risk appetite articulated in the Enterprise Risk Management (ERM) Policy; any deviations from appetite MUST be escalated to the Risk and Compliance Committee for review and approval.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Performance Evaluation"),
                      createTextVNode(" — assessing the performance of the entity and its senior management team, in collaboration with the CBUAE team, to ensure alignment with KPIs.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Regulatory Compliance"),
                      createTextVNode(" — ensuring the entity adheres to all relevant regulations and standards.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Financial Management"),
                      createTextVNode(" — overseeing the entity’s financial performance and ensuring alignment with established financial targets and budgets.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-c25ba6ee${_scopeId}>Meetings</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-c25ba6ee${_scopeId2}>The Board meets regularly, at least quarterly, or more frequently if required. Meeting agendas and minutes are documented, and decisions are recorded to ensure transparency and accountability.</p>`);
                } else {
                  return [
                    createVNode("p", null, "The Board meets regularly, at least quarterly, or more frequently if required. Meeting agendas and minutes are documented, and decisions are recorded to ensure transparency and accountability.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, "Composition"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("p", null, "The Board of Managers is composed of individuals selected for their expertise, experience, and ability to contribute to the strategic oversight of Nebras. The Board includes representatives from the CBUAE, participating banks, insurers, and independent / ecosystem directors to ensure diverse perspectives and comprehensive governance. The number of Board members and their specific roles are defined in the entity’s Contract of Establishment.")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Responsibilities"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Strategic Oversight"),
                    createTextVNode(" — providing strategic direction, managing decision-making votes, and ensuring alignment with the entity’s mission and objectives.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Risk Management"),
                    createTextVNode(" — setting the risk appetite and overseeing risk management practices to keep risk levels within appetite. Practices are governed by the risk appetite articulated in the Enterprise Risk Management (ERM) Policy; any deviations from appetite MUST be escalated to the Risk and Compliance Committee for review and approval.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Performance Evaluation"),
                    createTextVNode(" — assessing the performance of the entity and its senior management team, in collaboration with the CBUAE team, to ensure alignment with KPIs.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Regulatory Compliance"),
                    createTextVNode(" — ensuring the entity adheres to all relevant regulations and standards.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Financial Management"),
                    createTextVNode(" — overseeing the entity’s financial performance and ensuring alignment with established financial targets and budgets.")
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "Meetings"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("p", null, "The Board meets regularly, at least quarterly, or more frequently if required. Meeting agendas and minutes are documented, and decisions are recorded to ensure transparency and accountability.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "committees",
        num: "04",
        color: "var(--at-blue-deep)",
        eyebrow: "Board committees",
        title: "Five committees supporting the Board",
        lede: "The Board has established five committees to support its functions and ensure effective oversight in specialized areas. Each committee is responsible for specific aspects of governance, operates under Board-approved terms of reference, and reports directly to the Board.",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-c25ba6ee${_scopeId}>Escalation to the Board</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-c25ba6ee${_scopeId2}>Board Committees MUST escalate matters to the Board of Managers without undue delay where issues are considered material, including but not limited to:</p>`);
                } else {
                  return [
                    createVNode("p", null, "Board Committees MUST escalate matters to the Board of Managers without undue delay where issues are considered material, including but not limited to:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-c25ba6ee${_scopeId2}>Risk appetite breaches or significant near-breaches.</li><li data-v-c25ba6ee${_scopeId2}>Material regulatory non-compliance or supervisory findings.</li><li data-v-c25ba6ee${_scopeId2}>Major operational, cyber, data, or technology-related incidents.</li><li data-v-c25ba6ee${_scopeId2}>Financial losses or exposures exceeding approved thresholds.</li><li data-v-c25ba6ee${_scopeId2}>Matters that may have a material impact on Nebras’s strategy, license, reputation, or financial soundness.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Risk appetite breaches or significant near-breaches."),
                    createVNode("li", null, "Material regulatory non-compliance or supervisory findings."),
                    createVNode("li", null, "Major operational, cyber, data, or technology-related incidents."),
                    createVNode("li", null, "Financial losses or exposures exceeding approved thresholds."),
                    createVNode("li", null, "Matters that may have a material impact on Nebras’s strategy, license, reputation, or financial soundness.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-c25ba6ee${_scopeId2}>The composition of each committee is defined by the Board based on the specific experience required to fulfil its responsibilities.</p>`);
                } else {
                  return [
                    createVNode("p", null, "The composition of each committee is defined by the Board based on the specific experience required to fulfil its responsibilities.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h4 data-v-c25ba6ee${_scopeId}>Board Strategy Committee</h4>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-c25ba6ee${_scopeId2}>Provide guidance on innovative strategies and initiatives supporting Open Finance adoption and development.</li><li data-v-c25ba6ee${_scopeId2}>Review financial performance and resource utilization.</li><li data-v-c25ba6ee${_scopeId2}>Oversee overall performance to ensure achievement of established strategic objectives.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Provide guidance on innovative strategies and initiatives supporting Open Finance adoption and development."),
                    createVNode("li", null, "Review financial performance and resource utilization."),
                    createVNode("li", null, "Oversee overall performance to ensure achievement of established strategic objectives.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h4 data-v-c25ba6ee${_scopeId}>Board Risk and Compliance Committee</h4>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-c25ba6ee${_scopeId2}>Ensure the company’s compliance with relevant regulations and handle regulatory gaps.</li><li data-v-c25ba6ee${_scopeId2}>Oversee the company’s risk management processes and controls, and evaluate the effectiveness of mechanisms for identifying, assessing, and monitoring risks.</li><li data-v-c25ba6ee${_scopeId2}>Ensure Nebras operates its risk management practices using the Three Lines of Defense model — (1) Management, (2) Risk Management and Compliance, (3) Internal Audit — all providing oversight on risk mitigation strategies and compliance activities as described in the ERM Policy.</li><li data-v-c25ba6ee${_scopeId2}>Ensure continuous monitoring and review of governance-related risks in accordance with the ERM Policy’s monitoring framework.</li><li data-v-c25ba6ee${_scopeId2}>Review and recommend the risk appetite statement, risk policies, and tolerance levels to the Board, and monitor adherence to the approved risk appetite.</li><li data-v-c25ba6ee${_scopeId2}>Monitor key risks (credit, market, operational, cyber, conduct, compliance, reputational) and emerging risks in the Open Finance ecosystem.</li><li data-v-c25ba6ee${_scopeId2}>Oversee compliance function effectiveness, regulatory adherence (CBUAE, data protection laws, AML/CFT), and whistleblowing mechanisms.</li><li data-v-c25ba6ee${_scopeId2}>Review periodic risk and compliance reports, including key risk indicators, incident reports, stress testing, incident management, and remediation plans.</li><li data-v-c25ba6ee${_scopeId2}>Ensure coordination between risk, compliance, internal audit, and business units.</li><li data-v-c25ba6ee${_scopeId2}>Assess third-party, outsourcing, and technology risks related to Open Finance infrastructure.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Ensure the company’s compliance with relevant regulations and handle regulatory gaps."),
                    createVNode("li", null, "Oversee the company’s risk management processes and controls, and evaluate the effectiveness of mechanisms for identifying, assessing, and monitoring risks."),
                    createVNode("li", null, "Ensure Nebras operates its risk management practices using the Three Lines of Defense model — (1) Management, (2) Risk Management and Compliance, (3) Internal Audit — all providing oversight on risk mitigation strategies and compliance activities as described in the ERM Policy."),
                    createVNode("li", null, "Ensure continuous monitoring and review of governance-related risks in accordance with the ERM Policy’s monitoring framework."),
                    createVNode("li", null, "Review and recommend the risk appetite statement, risk policies, and tolerance levels to the Board, and monitor adherence to the approved risk appetite."),
                    createVNode("li", null, "Monitor key risks (credit, market, operational, cyber, conduct, compliance, reputational) and emerging risks in the Open Finance ecosystem."),
                    createVNode("li", null, "Oversee compliance function effectiveness, regulatory adherence (CBUAE, data protection laws, AML/CFT), and whistleblowing mechanisms."),
                    createVNode("li", null, "Review periodic risk and compliance reports, including key risk indicators, incident reports, stress testing, incident management, and remediation plans."),
                    createVNode("li", null, "Ensure coordination between risk, compliance, internal audit, and business units."),
                    createVNode("li", null, "Assess third-party, outsourcing, and technology risks related to Open Finance infrastructure.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h4 data-v-c25ba6ee${_scopeId}>Board Audit Committee</h4>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-c25ba6ee${_scopeId2}>Oversee the organization’s financial reporting processes, ensuring accuracy, transparency, and compliance with applicable accounting standards and regulations.</li><li data-v-c25ba6ee${_scopeId2}>Ensure internal and external audits are conducted independently and thoroughly.</li><li data-v-c25ba6ee${_scopeId2}>Facilitate effective communication between the Board, internal auditors, and external auditors.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Oversee the organization’s financial reporting processes, ensuring accuracy, transparency, and compliance with applicable accounting standards and regulations."),
                    createVNode("li", null, "Ensure internal and external audits are conducted independently and thoroughly."),
                    createVNode("li", null, "Facilitate effective communication between the Board, internal auditors, and external auditors.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h4 data-v-c25ba6ee${_scopeId}>Board Nomination and Remuneration Committee</h4>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-c25ba6ee${_scopeId2}>Review the structure of the Board, and identify and recommend suitable candidates for selection as members of the Board and executive management of Nebras.</li><li data-v-c25ba6ee${_scopeId2}>Establish clear policies for the compensation and remuneration of the Board and executive management.</li><li data-v-c25ba6ee${_scopeId2}>Oversee periodic Board effectiveness and performance evaluations, conducted at least annually, covering the Board, its Committees, and individual members.</li><li data-v-c25ba6ee${_scopeId2}>Establish and maintain a structured Board and senior management succession planning framework to ensure continuity, independence, and availability of appropriate skills in line with regulatory expectations.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Review the structure of the Board, and identify and recommend suitable candidates for selection as members of the Board and executive management of Nebras."),
                    createVNode("li", null, "Establish clear policies for the compensation and remuneration of the Board and executive management."),
                    createVNode("li", null, "Oversee periodic Board effectiveness and performance evaluations, conducted at least annually, covering the Board, its Committees, and individual members."),
                    createVNode("li", null, "Establish and maintain a structured Board and senior management succession planning framework to ensure continuity, independence, and availability of appropriate skills in line with regulatory expectations.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h4 data-v-c25ba6ee${_scopeId}>Board Industry Advisory Committee</h4>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-c25ba6ee${_scopeId2}>Guide Open Finance framework expansion by providing expertise on emerging trends, innovative use cases, and other development opportunities.</li><li data-v-c25ba6ee${_scopeId2}>Promote collaboration among various industry players and enhance the Open Finance ecosystem by identifying new entities that could be onboarded.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Guide Open Finance framework expansion by providing expertise on emerging trends, innovative use cases, and other development opportunities."),
                    createVNode("li", null, "Promote collaboration among various industry players and enhance the Open Finance ecosystem by identifying new entities that could be onboarded.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, "Escalation to the Board"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("p", null, "Board Committees MUST escalate matters to the Board of Managers without undue delay where issues are considered material, including but not limited to:")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Risk appetite breaches or significant near-breaches."),
                  createVNode("li", null, "Material regulatory non-compliance or supervisory findings."),
                  createVNode("li", null, "Major operational, cyber, data, or technology-related incidents."),
                  createVNode("li", null, "Financial losses or exposures exceeding approved thresholds."),
                  createVNode("li", null, "Matters that may have a material impact on Nebras’s strategy, license, reputation, or financial soundness.")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("p", null, "The composition of each committee is defined by the Board based on the specific experience required to fulfil its responsibilities.")
                ]),
                _: 1
              }),
              createVNode("h4", null, "Board Strategy Committee"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Provide guidance on innovative strategies and initiatives supporting Open Finance adoption and development."),
                  createVNode("li", null, "Review financial performance and resource utilization."),
                  createVNode("li", null, "Oversee overall performance to ensure achievement of established strategic objectives.")
                ]),
                _: 1
              }),
              createVNode("h4", null, "Board Risk and Compliance Committee"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Ensure the company’s compliance with relevant regulations and handle regulatory gaps."),
                  createVNode("li", null, "Oversee the company’s risk management processes and controls, and evaluate the effectiveness of mechanisms for identifying, assessing, and monitoring risks."),
                  createVNode("li", null, "Ensure Nebras operates its risk management practices using the Three Lines of Defense model — (1) Management, (2) Risk Management and Compliance, (3) Internal Audit — all providing oversight on risk mitigation strategies and compliance activities as described in the ERM Policy."),
                  createVNode("li", null, "Ensure continuous monitoring and review of governance-related risks in accordance with the ERM Policy’s monitoring framework."),
                  createVNode("li", null, "Review and recommend the risk appetite statement, risk policies, and tolerance levels to the Board, and monitor adherence to the approved risk appetite."),
                  createVNode("li", null, "Monitor key risks (credit, market, operational, cyber, conduct, compliance, reputational) and emerging risks in the Open Finance ecosystem."),
                  createVNode("li", null, "Oversee compliance function effectiveness, regulatory adherence (CBUAE, data protection laws, AML/CFT), and whistleblowing mechanisms."),
                  createVNode("li", null, "Review periodic risk and compliance reports, including key risk indicators, incident reports, stress testing, incident management, and remediation plans."),
                  createVNode("li", null, "Ensure coordination between risk, compliance, internal audit, and business units."),
                  createVNode("li", null, "Assess third-party, outsourcing, and technology risks related to Open Finance infrastructure.")
                ]),
                _: 1
              }),
              createVNode("h4", null, "Board Audit Committee"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Oversee the organization’s financial reporting processes, ensuring accuracy, transparency, and compliance with applicable accounting standards and regulations."),
                  createVNode("li", null, "Ensure internal and external audits are conducted independently and thoroughly."),
                  createVNode("li", null, "Facilitate effective communication between the Board, internal auditors, and external auditors.")
                ]),
                _: 1
              }),
              createVNode("h4", null, "Board Nomination and Remuneration Committee"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Review the structure of the Board, and identify and recommend suitable candidates for selection as members of the Board and executive management of Nebras."),
                  createVNode("li", null, "Establish clear policies for the compensation and remuneration of the Board and executive management."),
                  createVNode("li", null, "Oversee periodic Board effectiveness and performance evaluations, conducted at least annually, covering the Board, its Committees, and individual members."),
                  createVNode("li", null, "Establish and maintain a structured Board and senior management succession planning framework to ensure continuity, independence, and availability of appropriate skills in line with regulatory expectations.")
                ]),
                _: 1
              }),
              createVNode("h4", null, "Board Industry Advisory Committee"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Guide Open Finance framework expansion by providing expertise on emerging trends, innovative use cases, and other development opportunities."),
                  createVNode("li", null, "Promote collaboration among various industry players and enhance the Open Finance ecosystem by identifying new entities that could be onboarded.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "structure",
        num: "05",
        color: "var(--at-navy)",
        eyebrow: "Organization structure & responsibilities",
        title: "From the Board to functional departments",
        lede: "The organizational structure of Nebras is designed to ensure effective governance, clear lines of accountability, independent oversight, and efficient decision-making, in line with regulatory expectations and best practices.",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-c25ba6ee${_scopeId}>Executive Management</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-c25ba6ee${_scopeId2}>The Executive Management Team is responsible for the day-to-day management and operational execution of strategies, policies, and objectives approved by the Board. It is led by the Chief Executive Officer (CEO), who reports directly to the Board.</p>`);
                } else {
                  return [
                    createVNode("p", null, "The Executive Management Team is responsible for the day-to-day management and operational execution of strategies, policies, and objectives approved by the Board. It is led by the Chief Executive Officer (CEO), who reports directly to the Board.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-c25ba6ee${_scopeId2}><strong data-v-c25ba6ee${_scopeId2}>Chief Executive Officer (CEO)</strong> — responsible for overall strategic leadership, operational management, and stakeholder relations, ensuring the entity’s goals and objectives are achieved.</li><li data-v-c25ba6ee${_scopeId2}><strong data-v-c25ba6ee${_scopeId2}>Chief Implementation Officer (CIO)</strong> — leads ecosystem engagement and implementation, including for VAS providers, enabling and increasing adoption of API calls and creating productive partnerships. Governs the industry roll-out of standards, manages industry change, and supports industry comprehension of the standards and business rules.</li><li data-v-c25ba6ee${_scopeId2}><strong data-v-c25ba6ee${_scopeId2}>Chief Operating Officer (COO)</strong> — manages daily operations, ensuring process efficiency, resource optimization, and risk mitigation, while driving delivery of key projects and overseeing performance metrics and reporting.</li><li data-v-c25ba6ee${_scopeId2}><strong data-v-c25ba6ee${_scopeId2}>Chief Technology Officer (CTO)</strong> — leads the technology strategy, managing the entity’s IT infrastructure, innovation, and cybersecurity, while ensuring regulatory compliance and overseeing vendor relationships and technical support.</li><li data-v-c25ba6ee${_scopeId2}><strong data-v-c25ba6ee${_scopeId2}>Chief Product Officer (CPO)</strong> — defines and implements the product vision, strategy, and roadmap, ensuring alignment with business goals and market demands, and leads the design, development, and continuous improvement of products and services.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Chief Executive Officer (CEO)"),
                      createTextVNode(" — responsible for overall strategic leadership, operational management, and stakeholder relations, ensuring the entity’s goals and objectives are achieved.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Chief Implementation Officer (CIO)"),
                      createTextVNode(" — leads ecosystem engagement and implementation, including for VAS providers, enabling and increasing adoption of API calls and creating productive partnerships. Governs the industry roll-out of standards, manages industry change, and supports industry comprehension of the standards and business rules.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Chief Operating Officer (COO)"),
                      createTextVNode(" — manages daily operations, ensuring process efficiency, resource optimization, and risk mitigation, while driving delivery of key projects and overseeing performance metrics and reporting.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Chief Technology Officer (CTO)"),
                      createTextVNode(" — leads the technology strategy, managing the entity’s IT infrastructure, innovation, and cybersecurity, while ensuring regulatory compliance and overseeing vendor relationships and technical support.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Chief Product Officer (CPO)"),
                      createTextVNode(" — defines and implements the product vision, strategy, and roadmap, ensuring alignment with business goals and market demands, and leads the design, development, and continuous improvement of products and services.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-c25ba6ee${_scopeId}>Functional departments</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-c25ba6ee${_scopeId2}>Nebras is organized into functional departments aligned with its operational and strategic objectives. Each department is headed by a member of the Executive Management Team and operates within authorities delegated by the CEO.</p>`);
                } else {
                  return [
                    createVNode("p", null, "Nebras is organized into functional departments aligned with its operational and strategic objectives. Each department is headed by a member of the Executive Management Team and operates within authorities delegated by the CEO.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-c25ba6ee${_scopeId2}><strong data-v-c25ba6ee${_scopeId2}>Ecosystem Engagement Department</strong> — builds and maintains relationships with external stakeholders, including financial institutions, fintechs, and other ecosystem participants. Drives collaboration, industry alignment, and onboarding to the platform, and leads outreach to expand the ecosystem and attract new participants and VAS providers.</li><li data-v-c25ba6ee${_scopeId2}><strong data-v-c25ba6ee${_scopeId2}>Operations Department</strong> — manages day-to-day activities, ensuring seamless execution of services and operational efficiency, overseeing business processes, service delivery, incident management, and performance tracking. Where functions are outsourced to third parties, it oversees vendor performance, ensures compliance with service level agreements, and manages communications.</li><li data-v-c25ba6ee${_scopeId2}><strong data-v-c25ba6ee${_scopeId2}>Technology Department</strong> — leads management, maintenance, and optimization of the entity’s technical infrastructure, including the Trust Framework and API Hub, and manages IT security, system architecture, data management, and compliance with technology standards. Coordinates with technology vendors to resolve issues and implement the technology development roadmap.</li><li data-v-c25ba6ee${_scopeId2}><strong data-v-c25ba6ee${_scopeId2}>Strategy and Product Department</strong> — responsible for the development and management of Open Finance products, including banking, insurance, and FX, designing new products, refining existing offerings, and aligning product strategies with the overall goals of the entity.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Ecosystem Engagement Department"),
                      createTextVNode(" — builds and maintains relationships with external stakeholders, including financial institutions, fintechs, and other ecosystem participants. Drives collaboration, industry alignment, and onboarding to the platform, and leads outreach to expand the ecosystem and attract new participants and VAS providers.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Operations Department"),
                      createTextVNode(" — manages day-to-day activities, ensuring seamless execution of services and operational efficiency, overseeing business processes, service delivery, incident management, and performance tracking. Where functions are outsourced to third parties, it oversees vendor performance, ensures compliance with service level agreements, and manages communications.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Technology Department"),
                      createTextVNode(" — leads management, maintenance, and optimization of the entity’s technical infrastructure, including the Trust Framework and API Hub, and manages IT security, system architecture, data management, and compliance with technology standards. Coordinates with technology vendors to resolve issues and implement the technology development roadmap.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Strategy and Product Department"),
                      createTextVNode(" — responsible for the development and management of Open Finance products, including banking, insurance, and FX, designing new products, refining existing offerings, and aligning product strategies with the overall goals of the entity.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, "Executive Management"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("p", null, "The Executive Management Team is responsible for the day-to-day management and operational execution of strategies, policies, and objectives approved by the Board. It is led by the Chief Executive Officer (CEO), who reports directly to the Board.")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Chief Executive Officer (CEO)"),
                    createTextVNode(" — responsible for overall strategic leadership, operational management, and stakeholder relations, ensuring the entity’s goals and objectives are achieved.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Chief Implementation Officer (CIO)"),
                    createTextVNode(" — leads ecosystem engagement and implementation, including for VAS providers, enabling and increasing adoption of API calls and creating productive partnerships. Governs the industry roll-out of standards, manages industry change, and supports industry comprehension of the standards and business rules.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Chief Operating Officer (COO)"),
                    createTextVNode(" — manages daily operations, ensuring process efficiency, resource optimization, and risk mitigation, while driving delivery of key projects and overseeing performance metrics and reporting.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Chief Technology Officer (CTO)"),
                    createTextVNode(" — leads the technology strategy, managing the entity’s IT infrastructure, innovation, and cybersecurity, while ensuring regulatory compliance and overseeing vendor relationships and technical support.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Chief Product Officer (CPO)"),
                    createTextVNode(" — defines and implements the product vision, strategy, and roadmap, ensuring alignment with business goals and market demands, and leads the design, development, and continuous improvement of products and services.")
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "Functional departments"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("p", null, "Nebras is organized into functional departments aligned with its operational and strategic objectives. Each department is headed by a member of the Executive Management Team and operates within authorities delegated by the CEO.")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Ecosystem Engagement Department"),
                    createTextVNode(" — builds and maintains relationships with external stakeholders, including financial institutions, fintechs, and other ecosystem participants. Drives collaboration, industry alignment, and onboarding to the platform, and leads outreach to expand the ecosystem and attract new participants and VAS providers.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Operations Department"),
                    createTextVNode(" — manages day-to-day activities, ensuring seamless execution of services and operational efficiency, overseeing business processes, service delivery, incident management, and performance tracking. Where functions are outsourced to third parties, it oversees vendor performance, ensures compliance with service level agreements, and manages communications.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Technology Department"),
                    createTextVNode(" — leads management, maintenance, and optimization of the entity’s technical infrastructure, including the Trust Framework and API Hub, and manages IT security, system architecture, data management, and compliance with technology standards. Coordinates with technology vendors to resolve issues and implement the technology development roadmap.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Strategy and Product Department"),
                    createTextVNode(" — responsible for the development and management of Open Finance products, including banking, insurance, and FX, designing new products, refining existing offerings, and aligning product strategies with the overall goals of the entity.")
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
        id: "conflicts",
        num: "06",
        color: "var(--at-teal-deep)",
        eyebrow: "Conflicts of interest & segregation of duties",
        title: "Protecting the integrity of decision-making",
        lede: "A conflict of interest arises when an individual’s personal, financial, or other interests could potentially influence or compromise their professional judgment or actions in their role within Nebras.",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-c25ba6ee${_scopeId}>Conflicts of interest</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-c25ba6ee${_scopeId2}>All Board members, senior management, and employees MUST submit a formal conflict-of-interest declaration upon appointment, on an annual basis, and whenever a material change in circumstances arises.</li><li data-v-c25ba6ee${_scopeId2}>Conflict-of-interest declarations are reviewed, documented, and monitored by the Risk and Compliance function.</li>`);
                } else {
                  return [
                    createVNode("li", null, "All Board members, senior management, and employees MUST submit a formal conflict-of-interest declaration upon appointment, on an annual basis, and whenever a material change in circumstances arises."),
                    createVNode("li", null, "Conflict-of-interest declarations are reviewed, documented, and monitored by the Risk and Compliance function.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-c25ba6ee${_scopeId}>Identification of conflicts</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-c25ba6ee${_scopeId2}>All individuals within the entity are required to disclose any potential conflicts of interest upon joining and periodically thereafter. These disclosures include:</p>`);
                } else {
                  return [
                    createVNode("p", null, "All individuals within the entity are required to disclose any potential conflicts of interest upon joining and periodically thereafter. These disclosures include:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-c25ba6ee${_scopeId2}>Financial interests in third-party vendors, financial institutions, or fintech companies participating in the Open Finance platform.</li><li data-v-c25ba6ee${_scopeId2}>Relationships with individuals or organizations that may benefit from the entity’s decisions or activities.</li><li data-v-c25ba6ee${_scopeId2}>Participation in external activities (e.g. directorships, consulting roles) that may influence decision-making.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Financial interests in third-party vendors, financial institutions, or fintech companies participating in the Open Finance platform."),
                    createVNode("li", null, "Relationships with individuals or organizations that may benefit from the entity’s decisions or activities."),
                    createVNode("li", null, "Participation in external activities (e.g. directorships, consulting roles) that may influence decision-making.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-c25ba6ee${_scopeId}>Managing conflicts</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-c25ba6ee${_scopeId2}>Individuals with conflicts are required to recuse themselves from relevant discussions and decisions.</li><li data-v-c25ba6ee${_scopeId2}>Conflicts are documented, and mitigating actions are outlined by the risk management team.</li><li data-v-c25ba6ee${_scopeId2}>If necessary, the Board of Managers intervenes to resolve significant conflicts and ensure fairness.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Individuals with conflicts are required to recuse themselves from relevant discussions and decisions."),
                    createVNode("li", null, "Conflicts are documented, and mitigating actions are outlined by the risk management team."),
                    createVNode("li", null, "If necessary, the Board of Managers intervenes to resolve significant conflicts and ensure fairness.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-c25ba6ee${_scopeId}>Segregation of duties</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-c25ba6ee${_scopeId2}>To maintain operational integrity and prevent undue influence, Nebras enforces a clear segregation of duties across all functions — crucial for reducing the risk of errors, fraud, and bias in decision-making.</p>`);
                } else {
                  return [
                    createVNode("p", null, "To maintain operational integrity and prevent undue influence, Nebras enforces a clear segregation of duties across all functions — crucial for reducing the risk of errors, fraud, and bias in decision-making.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h4 data-v-c25ba6ee${_scopeId}>Principles</h4>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-c25ba6ee${_scopeId2}><strong data-v-c25ba6ee${_scopeId2}>Independence</strong> — no single individual should have control over multiple stages of critical processes (e.g. financial approvals, procurement, or product development).</li><li data-v-c25ba6ee${_scopeId2}><strong data-v-c25ba6ee${_scopeId2}>Accountability</strong> — clear roles and responsibilities are defined, ensuring that checks and balances exist within workflows.</li><li data-v-c25ba6ee${_scopeId2}><strong data-v-c25ba6ee${_scopeId2}>Transparency</strong> — all actions and decisions are well-documented and traceable, enabling oversight by internal and external auditors.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Independence"),
                      createTextVNode(" — no single individual should have control over multiple stages of critical processes (e.g. financial approvals, procurement, or product development).")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Accountability"),
                      createTextVNode(" — clear roles and responsibilities are defined, ensuring that checks and balances exist within workflows.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Transparency"),
                      createTextVNode(" — all actions and decisions are well-documented and traceable, enabling oversight by internal and external auditors.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h4 data-v-c25ba6ee${_scopeId}>Implementation</h4>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-c25ba6ee${_scopeId2}><strong data-v-c25ba6ee${_scopeId2}>Operational controls</strong> — clear operational boundaries ensure that no individual or team has complete autonomy over critical business processes (e.g. financial transactions, product releases).</li><li data-v-c25ba6ee${_scopeId2}><strong data-v-c25ba6ee${_scopeId2}>Technology controls</strong> — access to sensitive systems and data is restricted based on roles and responsibilities. Changes to critical systems (e.g. the API Hub) require approvals from both the Technology and Operations departments.</li><li data-v-c25ba6ee${_scopeId2}><strong data-v-c25ba6ee${_scopeId2}>Decision-making controls</strong> — major decisions, such as VAS pricing strategies, partnership agreements, and technology procurement, require approvals from multiple stakeholders, including relevant department heads and the CEO.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Operational controls"),
                      createTextVNode(" — clear operational boundaries ensure that no individual or team has complete autonomy over critical business processes (e.g. financial transactions, product releases).")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Technology controls"),
                      createTextVNode(" — access to sensitive systems and data is restricted based on roles and responsibilities. Changes to critical systems (e.g. the API Hub) require approvals from both the Technology and Operations departments.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Decision-making controls"),
                      createTextVNode(" — major decisions, such as VAS pricing strategies, partnership agreements, and technology procurement, require approvals from multiple stakeholders, including relevant department heads and the CEO.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, "Conflicts of interest"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "All Board members, senior management, and employees MUST submit a formal conflict-of-interest declaration upon appointment, on an annual basis, and whenever a material change in circumstances arises."),
                  createVNode("li", null, "Conflict-of-interest declarations are reviewed, documented, and monitored by the Risk and Compliance function.")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Identification of conflicts"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("p", null, "All individuals within the entity are required to disclose any potential conflicts of interest upon joining and periodically thereafter. These disclosures include:")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Financial interests in third-party vendors, financial institutions, or fintech companies participating in the Open Finance platform."),
                  createVNode("li", null, "Relationships with individuals or organizations that may benefit from the entity’s decisions or activities."),
                  createVNode("li", null, "Participation in external activities (e.g. directorships, consulting roles) that may influence decision-making.")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Managing conflicts"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Individuals with conflicts are required to recuse themselves from relevant discussions and decisions."),
                  createVNode("li", null, "Conflicts are documented, and mitigating actions are outlined by the risk management team."),
                  createVNode("li", null, "If necessary, the Board of Managers intervenes to resolve significant conflicts and ensure fairness.")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Segregation of duties"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("p", null, "To maintain operational integrity and prevent undue influence, Nebras enforces a clear segregation of duties across all functions — crucial for reducing the risk of errors, fraud, and bias in decision-making.")
                ]),
                _: 1
              }),
              createVNode("h4", null, "Principles"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Independence"),
                    createTextVNode(" — no single individual should have control over multiple stages of critical processes (e.g. financial approvals, procurement, or product development).")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Accountability"),
                    createTextVNode(" — clear roles and responsibilities are defined, ensuring that checks and balances exist within workflows.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Transparency"),
                    createTextVNode(" — all actions and decisions are well-documented and traceable, enabling oversight by internal and external auditors.")
                  ])
                ]),
                _: 1
              }),
              createVNode("h4", null, "Implementation"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Operational controls"),
                    createTextVNode(" — clear operational boundaries ensure that no individual or team has complete autonomy over critical business processes (e.g. financial transactions, product releases).")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Technology controls"),
                    createTextVNode(" — access to sensitive systems and data is restricted based on roles and responsibilities. Changes to critical systems (e.g. the API Hub) require approvals from both the Technology and Operations departments.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Decision-making controls"),
                    createTextVNode(" — major decisions, such as VAS pricing strategies, partnership agreements, and technology procurement, require approvals from multiple stakeholders, including relevant department heads and the CEO.")
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
              href: "/internal/policies/internal-audit",
              category: "Governance & Oversight",
              title: "Internal Audit Policy",
              desc: "The independent third line of defense providing assurance to the Board of Managers."
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRelatedCard, {
              href: "/internal/policies/enterprise-risk-management",
              category: "Risk, Security & Compliance",
              title: "Enterprise Risk Management Policy",
              desc: "The risk appetite and Three Lines of Defense framework that underpins Board and committee oversight."
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdRelatedCard, {
                href: "/internal/policies/internal-audit",
                category: "Governance & Oversight",
                title: "Internal Audit Policy",
                desc: "The independent third line of defense providing assurance to the Board of Managers."
              }),
              createVNode(_component_EdRelatedCard, {
                href: "/internal/policies/enterprise-risk-management",
                category: "Risk, Security & Compliance",
                title: "Enterprise Risk Management Policy",
                desc: "The risk appetite and Three Lines of Defense framework that underpins Board and committee oversight."
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/internal/policies/corporate-governance.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const corporateGovernance = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c25ba6ee"]]);
export {
  corporateGovernance as default
};
