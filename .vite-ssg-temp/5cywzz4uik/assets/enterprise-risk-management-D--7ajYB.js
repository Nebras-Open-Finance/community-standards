import { _ as __unplugin_components_0, a as __unplugin_components_2, b as __unplugin_components_6, c as __unplugin_components_7$2 } from "./EdBackStrip-COkyNhGh.js";
import { _ as __unplugin_components_7$1, a as __unplugin_components_8 } from "./EdStages-NkJQJXq7.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
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
  __name: "enterprise-risk-management",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({ title: "Enterprise Risk Management Policy · Internal Policies" });
    const sections = [
      { id: "overview", label: "Overview" },
      { id: "categories", label: "Risk categories & KRIs" },
      { id: "governance", label: "Three Lines model" },
      { id: "framework", label: "Framework & identification" },
      { id: "assessment", label: "Assessment & scoring" },
      { id: "controls", label: "Controls & residual risk" },
      { id: "mitigation", label: "Mitigation, reporting & monitoring" },
      { id: "segregation", label: "Segregation of Duty" }
    ];
    const meta = [
      { label: "Applies to", value: "Nebras" },
      { label: "Classification", value: "Restricted" },
      { label: "Version", value: "1.0 · Feb 2026" }
    ];
    const keyNums = [
      { value: "3", unit: "lines", label: "Lines of defence in the governance model" },
      { value: "13", label: "Defined risk categories" },
      { value: "8", label: "Core principles of risk management" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdBackStrip = __unplugin_components_0;
      const _component_EdHero = __unplugin_components_0$1;
      const _component_EdInPageNav = __unplugin_components_2;
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdBullets = __unplugin_components_5;
      const _component_EdNote = __unplugin_components_7;
      const _component_EdStages = __unplugin_components_7$1;
      const _component_EdStage = __unplugin_components_8;
      const _component_EdRelatedCards = __unplugin_components_6;
      const _component_EdRelatedCard = __unplugin_components_7$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-page" }, _attrs))} data-v-b2d528a4>`);
      _push(ssrRenderComponent(_component_EdBackStrip, {
        href: "/internal/policies/",
        text: "All policies"
      }, null, _parent));
      _push(ssrRenderComponent(_component_EdHero, {
        eyebrow: "Internal · Restricted",
        "eyebrow-color": "var(--at-blue)",
        title: "Enterprise Risk Management Policy",
        meta,
        lede: "Nebras’s Enterprise Risk Management framework establishes how risk is identified, assessed, mitigated, and monitored across <strong>strategic, tactical, and operational</strong> levels — anchored in a Three Lines model, a defined risk appetite and tolerance, and a culture of accountability and continuous improvement.",
        "key-nums": keyNums
      }, null, _parent));
      _push(ssrRenderComponent(_component_EdInPageNav, { sections }, null, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "overview",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Overview",
        title: "Purpose, scope, and governance of the ERM Policy",
        lede: "The ERM Policy outlines the framework and processes for identifying, assessing, managing, and monitoring risks associated with Nebras’s operations and strategic objectives, promoting a proactive culture of awareness, accountability, and continuous improvement.",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-b2d528a4${_scopeId}>Purpose</h3><p data-v-b2d528a4${_scopeId}>Built on the definition of risk as “the possibility of a deviation from an intended outcome or objective”, the policy embeds ERM throughout Nebras as supporting guardrails against uncertainty. It aims to:</p>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-b2d528a4${_scopeId2}><strong data-v-b2d528a4${_scopeId2}>Define risk appetite and tolerance residually</strong> — articulate the amount and type of risk Nebras is willing to accept after applying all current controls.</li><li data-v-b2d528a4${_scopeId2}><strong data-v-b2d528a4${_scopeId2}>Identify risks</strong> that could impact operations, finances, reputation, and regulatory compliance.</li><li data-v-b2d528a4${_scopeId2}><strong data-v-b2d528a4${_scopeId2}>Assess risks</strong> by likelihood and potential impact to prioritise management effort.</li><li data-v-b2d528a4${_scopeId2}><strong data-v-b2d528a4${_scopeId2}>Mitigate risks</strong> through strategies that minimise or eliminate adverse effects.</li><li data-v-b2d528a4${_scopeId2}><strong data-v-b2d528a4${_scopeId2}>Monitor risks</strong> and the effectiveness of risk management strategies.</li><li data-v-b2d528a4${_scopeId2}><strong data-v-b2d528a4${_scopeId2}>Promote accountability</strong>, <strong data-v-b2d528a4${_scopeId2}>enhance decision-making</strong>, and <strong data-v-b2d528a4${_scopeId2}>ensure compliance</strong> with relevant laws, regulations, and standards.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Define risk appetite and tolerance residually"),
                      createTextVNode(" — articulate the amount and type of risk Nebras is willing to accept after applying all current controls.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Identify risks"),
                      createTextVNode(" that could impact operations, finances, reputation, and regulatory compliance.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Assess risks"),
                      createTextVNode(" by likelihood and potential impact to prioritise management effort.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Mitigate risks"),
                      createTextVNode(" through strategies that minimise or eliminate adverse effects.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Monitor risks"),
                      createTextVNode(" and the effectiveness of risk management strategies.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Promote accountability"),
                      createTextVNode(", "),
                      createVNode("strong", null, "enhance decision-making"),
                      createTextVNode(", and "),
                      createVNode("strong", null, "ensure compliance"),
                      createTextVNode(" with relevant laws, regulations, and standards.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-b2d528a4${_scopeId}>Scope</h3><p data-v-b2d528a4${_scopeId}>The policy applies to all activities, processes, and stakeholders associated with Nebras, spanning operational, financial, compliance, strategic, technology, third-party, reputational, and environmental and social risk areas.</p><h3 data-v-b2d528a4${_scopeId}>The eight core principles</h3><p data-v-b2d528a4${_scopeId}>To embed the policy and strengthen risk maturity, Nebras articulates eight principles centred on value creation and protection:</p>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-b2d528a4${_scopeId2}><strong data-v-b2d528a4${_scopeId2}>Integrated</strong> — risk management forms an integral part of all activities, embedded into strategic, tactical, operational, and project objectives.</li><li data-v-b2d528a4${_scopeId2}><strong data-v-b2d528a4${_scopeId2}>Structured and comprehensive</strong> — a formalised internal risk structure delivers consistent, comparable results.</li><li data-v-b2d528a4${_scopeId2}><strong data-v-b2d528a4${_scopeId2}>Proportionate</strong> — ERM processes are customised to Nebras’s internal and external context.</li><li data-v-b2d528a4${_scopeId2}><strong data-v-b2d528a4${_scopeId2}>Inclusive</strong> — timely involvement of internal and external stakeholders informs the ERM landscape.</li><li data-v-b2d528a4${_scopeId2}><strong data-v-b2d528a4${_scopeId2}>Agile</strong> — ERM anticipates, detects, and responds to emerging and changing risks, remaining open to continual review.</li><li data-v-b2d528a4${_scopeId2}><strong data-v-b2d528a4${_scopeId2}>Best available information</strong> — inputs draw on historical, current, and forward-looking information, acknowledging limitations and uncertainties.</li><li data-v-b2d528a4${_scopeId2}><strong data-v-b2d528a4${_scopeId2}>Human and company culture factors</strong> — behaviour and culture significantly influence ERM; adequate awareness and training are ensured.</li><li data-v-b2d528a4${_scopeId2}><strong data-v-b2d528a4${_scopeId2}>Continued improvement</strong> — ERM is refined through learning, experience, and feedback aligned to best practice.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Integrated"),
                      createTextVNode(" — risk management forms an integral part of all activities, embedded into strategic, tactical, operational, and project objectives.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Structured and comprehensive"),
                      createTextVNode(" — a formalised internal risk structure delivers consistent, comparable results.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Proportionate"),
                      createTextVNode(" — ERM processes are customised to Nebras’s internal and external context.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Inclusive"),
                      createTextVNode(" — timely involvement of internal and external stakeholders informs the ERM landscape.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Agile"),
                      createTextVNode(" — ERM anticipates, detects, and responds to emerging and changing risks, remaining open to continual review.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Best available information"),
                      createTextVNode(" — inputs draw on historical, current, and forward-looking information, acknowledging limitations and uncertainties.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Human and company culture factors"),
                      createTextVNode(" — behaviour and culture significantly influence ERM; adequate awareness and training are ensured.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Continued improvement"),
                      createTextVNode(" — ERM is refined through learning, experience, and feedback aligned to best practice.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-b2d528a4${_scopeId}>Audience</h3><p data-v-b2d528a4${_scopeId}>All Nebras Board members and staff, including permanent and temporary employees, consultants, interns, and authorised third-party staff.</p><h3 data-v-b2d528a4${_scopeId}>Exceptions, review, compliance, and reporting</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-b2d528a4${_scopeId2}><strong data-v-b2d528a4${_scopeId2}>Exceptions</strong> MUST be explicitly approved by the Board Risk and Compliance Committee, are valid for a specific period, are reassessed and re-approved as necessary, and are noted by the Board of Managers.</li><li data-v-b2d528a4${_scopeId2}><strong data-v-b2d528a4${_scopeId2}>Annual review</strong> — the policy is reviewed and amended annually by the CEO and Risk department, tabled to the Board Risk and Compliance Committee, and submitted to the Board of Managers for final approval.</li><li data-v-b2d528a4${_scopeId2}><strong data-v-b2d528a4${_scopeId2}>Compliance</strong> — violations are raised to the Operations and Risk Lead; corrective and disciplinary action is proportionate to severity and aligned with HR policy. Any deviation requires risk review and acceptance approval from the Operations and Risk Lead.</li><li data-v-b2d528a4${_scopeId2}><strong data-v-b2d528a4${_scopeId2}>Reporting</strong> — the Risk function reports quarterly to the CEO, Board of Managers, and Board Risk and Compliance Committee on the status of risk management and any non-compliance.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Exceptions"),
                      createTextVNode(" MUST be explicitly approved by the Board Risk and Compliance Committee, are valid for a specific period, are reassessed and re-approved as necessary, and are noted by the Board of Managers.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Annual review"),
                      createTextVNode(" — the policy is reviewed and amended annually by the CEO and Risk department, tabled to the Board Risk and Compliance Committee, and submitted to the Board of Managers for final approval.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Compliance"),
                      createTextVNode(" — violations are raised to the Operations and Risk Lead; corrective and disciplinary action is proportionate to severity and aligned with HR policy. Any deviation requires risk review and acceptance approval from the Operations and Risk Lead.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Reporting"),
                      createTextVNode(" — the Risk function reports quarterly to the CEO, Board of Managers, and Board Risk and Compliance Committee on the status of risk management and any non-compliance.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, "Purpose"),
              createVNode("p", null, "Built on the definition of risk as “the possibility of a deviation from an intended outcome or objective”, the policy embeds ERM throughout Nebras as supporting guardrails against uncertainty. It aims to:"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Define risk appetite and tolerance residually"),
                    createTextVNode(" — articulate the amount and type of risk Nebras is willing to accept after applying all current controls.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Identify risks"),
                    createTextVNode(" that could impact operations, finances, reputation, and regulatory compliance.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Assess risks"),
                    createTextVNode(" by likelihood and potential impact to prioritise management effort.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Mitigate risks"),
                    createTextVNode(" through strategies that minimise or eliminate adverse effects.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Monitor risks"),
                    createTextVNode(" and the effectiveness of risk management strategies.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Promote accountability"),
                    createTextVNode(", "),
                    createVNode("strong", null, "enhance decision-making"),
                    createTextVNode(", and "),
                    createVNode("strong", null, "ensure compliance"),
                    createTextVNode(" with relevant laws, regulations, and standards.")
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "Scope"),
              createVNode("p", null, "The policy applies to all activities, processes, and stakeholders associated with Nebras, spanning operational, financial, compliance, strategic, technology, third-party, reputational, and environmental and social risk areas."),
              createVNode("h3", null, "The eight core principles"),
              createVNode("p", null, "To embed the policy and strengthen risk maturity, Nebras articulates eight principles centred on value creation and protection:"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Integrated"),
                    createTextVNode(" — risk management forms an integral part of all activities, embedded into strategic, tactical, operational, and project objectives.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Structured and comprehensive"),
                    createTextVNode(" — a formalised internal risk structure delivers consistent, comparable results.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Proportionate"),
                    createTextVNode(" — ERM processes are customised to Nebras’s internal and external context.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Inclusive"),
                    createTextVNode(" — timely involvement of internal and external stakeholders informs the ERM landscape.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Agile"),
                    createTextVNode(" — ERM anticipates, detects, and responds to emerging and changing risks, remaining open to continual review.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Best available information"),
                    createTextVNode(" — inputs draw on historical, current, and forward-looking information, acknowledging limitations and uncertainties.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Human and company culture factors"),
                    createTextVNode(" — behaviour and culture significantly influence ERM; adequate awareness and training are ensured.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Continued improvement"),
                    createTextVNode(" — ERM is refined through learning, experience, and feedback aligned to best practice.")
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "Audience"),
              createVNode("p", null, "All Nebras Board members and staff, including permanent and temporary employees, consultants, interns, and authorised third-party staff."),
              createVNode("h3", null, "Exceptions, review, compliance, and reporting"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Exceptions"),
                    createTextVNode(" MUST be explicitly approved by the Board Risk and Compliance Committee, are valid for a specific period, are reassessed and re-approved as necessary, and are noted by the Board of Managers.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Annual review"),
                    createTextVNode(" — the policy is reviewed and amended annually by the CEO and Risk department, tabled to the Board Risk and Compliance Committee, and submitted to the Board of Managers for final approval.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Compliance"),
                    createTextVNode(" — violations are raised to the Operations and Risk Lead; corrective and disciplinary action is proportionate to severity and aligned with HR policy. Any deviation requires risk review and acceptance approval from the Operations and Risk Lead.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Reporting"),
                    createTextVNode(" — the Risk function reports quarterly to the CEO, Board of Managers, and Board Risk and Compliance Committee on the status of risk management and any non-compliance.")
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
        id: "categories",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "Key risks faced by Nebras",
        title: "Risk categories and Key Risk Indicators",
        lede: "Risks originate from many avenues, allocated into thirteen categories — each with its own residual risk appetite and tolerance threshold, formulated by evaluating Nebras’s business context against the ERM Risk Matrix.",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-b2d528a4${_scopeId}>The thirteen risk categories</h3><div class="ed-table-wrap" data-v-b2d528a4${_scopeId}><table class="ed-table" data-v-b2d528a4${_scopeId}><thead data-v-b2d528a4${_scopeId}><tr data-v-b2d528a4${_scopeId}><th data-v-b2d528a4${_scopeId}>Category</th><th data-v-b2d528a4${_scopeId}>Description</th></tr></thead><tbody data-v-b2d528a4${_scopeId}><tr data-v-b2d528a4${_scopeId}><td data-v-b2d528a4${_scopeId}>Compliance</td><td data-v-b2d528a4${_scopeId}>Consequences of non-compliance with laws, regulations, and contractual obligations — penalties, fines, sanctions, reputational damage, and in extreme cases criminal prosecution, licence revocation, or closure.</td></tr><tr data-v-b2d528a4${_scopeId}><td data-v-b2d528a4${_scopeId}>Data &amp; Information Security</td><td data-v-b2d528a4${_scopeId}>Unauthorised access, leakage, alteration, mismanagement, or loss of data, and the use of inaccurate, incomplete, or misleading information in decision-making.</td></tr><tr data-v-b2d528a4${_scopeId}><td data-v-b2d528a4${_scopeId}>Cybersecurity</td><td data-v-b2d528a4${_scopeId}>Inability to protect Nebras’s computers, networks, programs, and data from unauthorised access, attacks, or exploitation by external actors, internal parties, or system and human vulnerabilities.</td></tr><tr data-v-b2d528a4${_scopeId}><td data-v-b2d528a4${_scopeId}>Legal</td><td data-v-b2d528a4${_scopeId}>Legal disputes, claims, or proceedings arising from interpretation, application, or non-compliance with laws, regulations, and contracts, including litigation, arbitration, and regulatory investigations.</td></tr><tr data-v-b2d528a4${_scopeId}><td data-v-b2d528a4${_scopeId}>Fraud</td><td data-v-b2d528a4${_scopeId}>Collusion and corruption, failure of declaration, falsified outcomes, fraudulent signatories, manipulation of recruitment, misappropriation of funds, and unauthorised transactions.</td></tr><tr data-v-b2d528a4${_scopeId}><td data-v-b2d528a4${_scopeId}>Operational</td><td data-v-b2d528a4${_scopeId}>Operational disruptions or losses caused by flawed or failed policies, processes, systems, or human errors.</td></tr><tr data-v-b2d528a4${_scopeId}><td data-v-b2d528a4${_scopeId}>Sharia Non-Compliance</td><td data-v-b2d528a4${_scopeId}>Data model limitations that result in inaccurate or incomplete representation of product features and structures from LFIs to TPPs and customers (e.g. Shari’ah-required terminology or structures not sufficiently supported).</td></tr><tr data-v-b2d528a4${_scopeId}><td data-v-b2d528a4${_scopeId}>Technology</td><td data-v-b2d528a4${_scopeId}>System architecture and design, change control, infrastructure breakdown, integration, legacy support, single points of failure, and storage capacity constraints.</td></tr><tr data-v-b2d528a4${_scopeId}><td data-v-b2d528a4${_scopeId}>Reputational</td><td data-v-b2d528a4${_scopeId}>Harm to Nebras’s reputation, image, or brand causing loss of trust or loyalty from stakeholders, customers, and the wider community.</td></tr><tr data-v-b2d528a4${_scopeId}><td data-v-b2d528a4${_scopeId}>Financial</td><td data-v-b2d528a4${_scopeId}>Impacts on revenue, performance, stability, and sustainability, including inadequate financial planning and external factors such as product adoption, market volatility, and economic conditions.</td></tr><tr data-v-b2d528a4${_scopeId}><td data-v-b2d528a4${_scopeId}>External events</td><td data-v-b2d528a4${_scopeId}>Risks from the external environment, assessed via PESTLE (Political, Economic, Socio-Economic, Technological, Legislative, Environmental), outside Nebras’s immediate control.</td></tr><tr data-v-b2d528a4${_scopeId}><td data-v-b2d528a4${_scopeId}>People</td><td data-v-b2d528a4${_scopeId}>Risks from culture, employment practices, key-person dependencies, lack of resources, and succession planning.</td></tr><tr data-v-b2d528a4${_scopeId}><td data-v-b2d528a4${_scopeId}>Outsourcing</td><td data-v-b2d528a4${_scopeId}>Risks arising from reliance on third-party service providers, including their day-to-day operations on behalf of Nebras.</td></tr></tbody></table></div>`);
            _push2(ssrRenderComponent(_component_EdNote, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-b2d528a4${_scopeId2}>Residual appetite and tolerance are set per category. Where explicitly stated in this policy: <strong data-v-b2d528a4${_scopeId2}>Compliance</strong> carries a <strong data-v-b2d528a4${_scopeId2}>Low</strong> residual risk appetite and a <strong data-v-b2d528a4${_scopeId2}>Low–Medium</strong> residual tolerance; <strong data-v-b2d528a4${_scopeId2}>Financial</strong> carries a <strong data-v-b2d528a4${_scopeId2}>Low–Medium</strong> residual appetite and a <strong data-v-b2d528a4${_scopeId2}>Medium</strong> residual tolerance. The full set of thresholds is elaborated in the Operational Risk Management Framework (ORMF).</p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode("Residual appetite and tolerance are set per category. Where explicitly stated in this policy: "),
                      createVNode("strong", null, "Compliance"),
                      createTextVNode(" carries a "),
                      createVNode("strong", null, "Low"),
                      createTextVNode(" residual risk appetite and a "),
                      createVNode("strong", null, "Low–Medium"),
                      createTextVNode(" residual tolerance; "),
                      createVNode("strong", null, "Financial"),
                      createTextVNode(" carries a "),
                      createVNode("strong", null, "Low–Medium"),
                      createTextVNode(" residual appetite and a "),
                      createVNode("strong", null, "Medium"),
                      createTextVNode(" residual tolerance. The full set of thresholds is elaborated in the Operational Risk Management Framework (ORMF).")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-b2d528a4${_scopeId}>Risk appetite framework and KRIs</h3><p data-v-b2d528a4${_scopeId}>Nebras maintains a Risk Appetite Framework combining qualitative statements and quantitative thresholds for each category. It is designed to give clear guidance on acceptable exposure, enable monitoring through Key Risk Indicators (KRIs), and support proactive, risk-based decision-making.</p>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-b2d528a4${_scopeId2}><strong data-v-b2d528a4${_scopeId2}>Quantitative thresholds</strong> set measurable limits (e.g. financial exposure limits, downtime thresholds, incident frequency).</li><li data-v-b2d528a4${_scopeId2}><strong data-v-b2d528a4${_scopeId2}>Qualitative thresholds</strong> define conditions under which exposure is deemed unacceptable (e.g. regulatory breaches, reputational damage, control failures).</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Quantitative thresholds"),
                      createTextVNode(" set measurable limits (e.g. financial exposure limits, downtime thresholds, incident frequency).")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Qualitative thresholds"),
                      createTextVNode(" define conditions under which exposure is deemed unacceptable (e.g. regulatory breaches, reputational damage, control failures).")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<p data-v-b2d528a4${_scopeId}>KRIs are measurable metrics that act as early-warning signals across risk categories. The KRI process runs through five stages:</p>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-b2d528a4${_scopeId2}><strong data-v-b2d528a4${_scopeId2}>Identification</strong> — KRIs are identified per category through collaboration between the Risk function, business units, and stakeholders.</li><li data-v-b2d528a4${_scopeId2}><strong data-v-b2d528a4${_scopeId2}>Definition</strong> — each KRI is defined with purpose, measurement criteria, and data sources, and MUST be SMART (specific, measurable, achievable, relevant, time-bound).</li><li data-v-b2d528a4${_scopeId2}><strong data-v-b2d528a4${_scopeId2}>Thresholds and tolerances</strong> — aligned with Nebras’s appetite and tolerance statements to trigger escalation or additional mitigation.</li><li data-v-b2d528a4${_scopeId2}><strong data-v-b2d528a4${_scopeId2}>Monitoring and reporting</strong> — KRIs are monitored regularly, with significant trends, breaches, or anomalies reported to the Board Risk and Compliance Committee and the Board of Managers.</li><li data-v-b2d528a4${_scopeId2}><strong data-v-b2d528a4${_scopeId2}>Review and update</strong> — KRIs are reviewed periodically to remain relevant to emerging risks.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Identification"),
                      createTextVNode(" — KRIs are identified per category through collaboration between the Risk function, business units, and stakeholders.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Definition"),
                      createTextVNode(" — each KRI is defined with purpose, measurement criteria, and data sources, and MUST be SMART (specific, measurable, achievable, relevant, time-bound).")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Thresholds and tolerances"),
                      createTextVNode(" — aligned with Nebras’s appetite and tolerance statements to trigger escalation or additional mitigation.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Monitoring and reporting"),
                      createTextVNode(" — KRIs are monitored regularly, with significant trends, breaches, or anomalies reported to the Board Risk and Compliance Committee and the Board of Managers.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Review and update"),
                      createTextVNode(" — KRIs are reviewed periodically to remain relevant to emerging risks.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<p data-v-b2d528a4${_scopeId}>KRIs are never an exhaustive list; they are documented and actively managed within the <strong data-v-b2d528a4${_scopeId}>Risk Register</strong>, which serves as the central repository for tracking, monitoring, and updating them. The Risk function maintains the Register and ensures designated owners review and update their KRIs.</p>`);
          } else {
            return [
              createVNode("h3", null, "The thirteen risk categories"),
              createVNode("div", { class: "ed-table-wrap" }, [
                createVNode("table", { class: "ed-table" }, [
                  createVNode("thead", null, [
                    createVNode("tr", null, [
                      createVNode("th", null, "Category"),
                      createVNode("th", null, "Description")
                    ])
                  ]),
                  createVNode("tbody", null, [
                    createVNode("tr", null, [
                      createVNode("td", null, "Compliance"),
                      createVNode("td", null, "Consequences of non-compliance with laws, regulations, and contractual obligations — penalties, fines, sanctions, reputational damage, and in extreme cases criminal prosecution, licence revocation, or closure.")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "Data & Information Security"),
                      createVNode("td", null, "Unauthorised access, leakage, alteration, mismanagement, or loss of data, and the use of inaccurate, incomplete, or misleading information in decision-making.")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "Cybersecurity"),
                      createVNode("td", null, "Inability to protect Nebras’s computers, networks, programs, and data from unauthorised access, attacks, or exploitation by external actors, internal parties, or system and human vulnerabilities.")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "Legal"),
                      createVNode("td", null, "Legal disputes, claims, or proceedings arising from interpretation, application, or non-compliance with laws, regulations, and contracts, including litigation, arbitration, and regulatory investigations.")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "Fraud"),
                      createVNode("td", null, "Collusion and corruption, failure of declaration, falsified outcomes, fraudulent signatories, manipulation of recruitment, misappropriation of funds, and unauthorised transactions.")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "Operational"),
                      createVNode("td", null, "Operational disruptions or losses caused by flawed or failed policies, processes, systems, or human errors.")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "Sharia Non-Compliance"),
                      createVNode("td", null, "Data model limitations that result in inaccurate or incomplete representation of product features and structures from LFIs to TPPs and customers (e.g. Shari’ah-required terminology or structures not sufficiently supported).")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "Technology"),
                      createVNode("td", null, "System architecture and design, change control, infrastructure breakdown, integration, legacy support, single points of failure, and storage capacity constraints.")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "Reputational"),
                      createVNode("td", null, "Harm to Nebras’s reputation, image, or brand causing loss of trust or loyalty from stakeholders, customers, and the wider community.")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "Financial"),
                      createVNode("td", null, "Impacts on revenue, performance, stability, and sustainability, including inadequate financial planning and external factors such as product adoption, market volatility, and economic conditions.")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "External events"),
                      createVNode("td", null, "Risks from the external environment, assessed via PESTLE (Political, Economic, Socio-Economic, Technological, Legislative, Environmental), outside Nebras’s immediate control.")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "People"),
                      createVNode("td", null, "Risks from culture, employment practices, key-person dependencies, lack of resources, and succession planning.")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "Outsourcing"),
                      createVNode("td", null, "Risks arising from reliance on third-party service providers, including their day-to-day operations on behalf of Nebras.")
                    ])
                  ])
                ])
              ]),
              createVNode(_component_EdNote, null, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode("Residual appetite and tolerance are set per category. Where explicitly stated in this policy: "),
                    createVNode("strong", null, "Compliance"),
                    createTextVNode(" carries a "),
                    createVNode("strong", null, "Low"),
                    createTextVNode(" residual risk appetite and a "),
                    createVNode("strong", null, "Low–Medium"),
                    createTextVNode(" residual tolerance; "),
                    createVNode("strong", null, "Financial"),
                    createTextVNode(" carries a "),
                    createVNode("strong", null, "Low–Medium"),
                    createTextVNode(" residual appetite and a "),
                    createVNode("strong", null, "Medium"),
                    createTextVNode(" residual tolerance. The full set of thresholds is elaborated in the Operational Risk Management Framework (ORMF).")
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "Risk appetite framework and KRIs"),
              createVNode("p", null, "Nebras maintains a Risk Appetite Framework combining qualitative statements and quantitative thresholds for each category. It is designed to give clear guidance on acceptable exposure, enable monitoring through Key Risk Indicators (KRIs), and support proactive, risk-based decision-making."),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Quantitative thresholds"),
                    createTextVNode(" set measurable limits (e.g. financial exposure limits, downtime thresholds, incident frequency).")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Qualitative thresholds"),
                    createTextVNode(" define conditions under which exposure is deemed unacceptable (e.g. regulatory breaches, reputational damage, control failures).")
                  ])
                ]),
                _: 1
              }),
              createVNode("p", null, "KRIs are measurable metrics that act as early-warning signals across risk categories. The KRI process runs through five stages:"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Identification"),
                    createTextVNode(" — KRIs are identified per category through collaboration between the Risk function, business units, and stakeholders.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Definition"),
                    createTextVNode(" — each KRI is defined with purpose, measurement criteria, and data sources, and MUST be SMART (specific, measurable, achievable, relevant, time-bound).")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Thresholds and tolerances"),
                    createTextVNode(" — aligned with Nebras’s appetite and tolerance statements to trigger escalation or additional mitigation.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Monitoring and reporting"),
                    createTextVNode(" — KRIs are monitored regularly, with significant trends, breaches, or anomalies reported to the Board Risk and Compliance Committee and the Board of Managers.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Review and update"),
                    createTextVNode(" — KRIs are reviewed periodically to remain relevant to emerging risks.")
                  ])
                ]),
                _: 1
              }),
              createVNode("p", null, [
                createTextVNode("KRIs are never an exhaustive list; they are documented and actively managed within the "),
                createVNode("strong", null, "Risk Register"),
                createTextVNode(", which serves as the central repository for tracking, monitoring, and updating them. The Risk function maintains the Register and ensures designated owners review and update their KRIs.")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "governance",
        num: "03",
        color: "var(--at-blue)",
        eyebrow: "Risk management governance",
        title: "The Three Lines model",
        lede: "Risk governance is anchored in the Three Lines model, ensuring business units, control functions, and Internal Audit remain independent and segregated to provide differentiated assurance to the Board of Managers.",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdStages, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "1st",
                    title: "Business units — own and manage risk",
                    "num-color": "var(--at-blue)"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-b2d528a4${_scopeId3}>Operational units — Ecosystem Engagement, Technology, Strategy and Product, and Operations. They identify and assess risks inherent in their activities, deploy and comply with key controls, build and monitor technical controls for automation, and transparently communicate risks.</p>`);
                      } else {
                        return [
                          createVNode("p", null, "Operational units — Ecosystem Engagement, Technology, Strategy and Product, and Operations. They identify and assess risks inherent in their activities, deploy and comply with key controls, build and monitor technical controls for automation, and transparently communicate risks.")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "2nd",
                    title: "Risk function — oversee and challenge",
                    "num-color": "var(--at-blue)"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-b2d528a4${_scopeId3}>Risk and compliance functions reinforce the first line: implementing a permanent control system, challenging operational units on risk identification and evaluation, carrying out independent second-level controls, fostering a culture of risk and ethics, and reporting regularly on the risk profile to the Board Risk and Compliance Committee and the Board of Managers.</p>`);
                      } else {
                        return [
                          createVNode("p", null, "Risk and compliance functions reinforce the first line: implementing a permanent control system, challenging operational units on risk identification and evaluation, carrying out independent second-level controls, fostering a culture of risk and ethics, and reporting regularly on the risk profile to the Board Risk and Compliance Committee and the Board of Managers.")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "3rd",
                    title: "Audit — independent assurance",
                    "num-color": "var(--at-blue)"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-b2d528a4${_scopeId3}>Internal Audit and External Audit operate objectively and independently, reporting directly to the Board of Managers. They provide assurance on the degree of control over operations and technology, help achieve objectives by assessing risk management and compliance, and periodically check compliance and the effectiveness of permanent controls.</p>`);
                      } else {
                        return [
                          createVNode("p", null, "Internal Audit and External Audit operate objectively and independently, reporting directly to the Board of Managers. They provide assurance on the degree of control over operations and technology, help achieve objectives by assessing risk management and compliance, and periodically check compliance and the effectiveness of permanent controls.")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_EdStage, {
                      num: "1st",
                      title: "Business units — own and manage risk",
                      "num-color": "var(--at-blue)"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, "Operational units — Ecosystem Engagement, Technology, Strategy and Product, and Operations. They identify and assess risks inherent in their activities, deploy and comply with key controls, build and monitor technical controls for automation, and transparently communicate risks.")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_EdStage, {
                      num: "2nd",
                      title: "Risk function — oversee and challenge",
                      "num-color": "var(--at-blue)"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, "Risk and compliance functions reinforce the first line: implementing a permanent control system, challenging operational units on risk identification and evaluation, carrying out independent second-level controls, fostering a culture of risk and ethics, and reporting regularly on the risk profile to the Board Risk and Compliance Committee and the Board of Managers.")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_EdStage, {
                      num: "3rd",
                      title: "Audit — independent assurance",
                      "num-color": "var(--at-blue)"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, "Internal Audit and External Audit operate objectively and independently, reporting directly to the Board of Managers. They provide assurance on the degree of control over operations and technology, help achieve objectives by assessing risk management and compliance, and periodically check compliance and the effectiveness of permanent controls.")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-b2d528a4${_scopeId}>Roles and responsibilities</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-b2d528a4${_scopeId2}><strong data-v-b2d528a4${_scopeId2}>Board of Managers</strong> — aligns the ERM policy with strategy and regulation, approves the policy, risk appetite, and tolerance, reviews risk reports, and holds the Committee and executive management accountable.</li><li data-v-b2d528a4${_scopeId2}><strong data-v-b2d528a4${_scopeId2}>Board Risk and Compliance Committee</strong> — endorses and recommends policies for Board approval, oversees identification, assessment, and mitigation of risks, monitors exposure, and guides the Risk function.</li><li data-v-b2d528a4${_scopeId2}><strong data-v-b2d528a4${_scopeId2}>CEO</strong> — establishes a culture of risk awareness, ensures governance mechanisms monitor risk, oversees risk processes, supports employees, and sets best-practice standards.</li><li data-v-b2d528a4${_scopeId2}><strong data-v-b2d528a4${_scopeId2}>Risk function</strong> — leads implementation of the framework, coordinates activities, conducts assessments, establishes controls and mitigation plans, reports to the Committee and Board, and delivers training.</li><li data-v-b2d528a4${_scopeId2}><strong data-v-b2d528a4${_scopeId2}>Business unit department heads</strong> — own risk within their departments, integrate risk practices into decision-making, communicate risks to the Risk function, and implement mitigation plans.</li><li data-v-b2d528a4${_scopeId2}><strong data-v-b2d528a4${_scopeId2}>All employees</strong> — adhere to policies and procedures, report potential risks or incidents, participate in training, and maintain awareness of the risks in their roles.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Board of Managers"),
                      createTextVNode(" — aligns the ERM policy with strategy and regulation, approves the policy, risk appetite, and tolerance, reviews risk reports, and holds the Committee and executive management accountable.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Board Risk and Compliance Committee"),
                      createTextVNode(" — endorses and recommends policies for Board approval, oversees identification, assessment, and mitigation of risks, monitors exposure, and guides the Risk function.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "CEO"),
                      createTextVNode(" — establishes a culture of risk awareness, ensures governance mechanisms monitor risk, oversees risk processes, supports employees, and sets best-practice standards.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Risk function"),
                      createTextVNode(" — leads implementation of the framework, coordinates activities, conducts assessments, establishes controls and mitigation plans, reports to the Committee and Board, and delivers training.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Business unit department heads"),
                      createTextVNode(" — own risk within their departments, integrate risk practices into decision-making, communicate risks to the Risk function, and implement mitigation plans.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "All employees"),
                      createTextVNode(" — adhere to policies and procedures, report potential risks or incidents, participate in training, and maintain awareness of the risks in their roles.")
                    ])
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
                    num: "1st",
                    title: "Business units — own and manage risk",
                    "num-color": "var(--at-blue)"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, "Operational units — Ecosystem Engagement, Technology, Strategy and Product, and Operations. They identify and assess risks inherent in their activities, deploy and comply with key controls, build and monitor technical controls for automation, and transparently communicate risks.")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_EdStage, {
                    num: "2nd",
                    title: "Risk function — oversee and challenge",
                    "num-color": "var(--at-blue)"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, "Risk and compliance functions reinforce the first line: implementing a permanent control system, challenging operational units on risk identification and evaluation, carrying out independent second-level controls, fostering a culture of risk and ethics, and reporting regularly on the risk profile to the Board Risk and Compliance Committee and the Board of Managers.")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_EdStage, {
                    num: "3rd",
                    title: "Audit — independent assurance",
                    "num-color": "var(--at-blue)"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, "Internal Audit and External Audit operate objectively and independently, reporting directly to the Board of Managers. They provide assurance on the degree of control over operations and technology, help achieve objectives by assessing risk management and compliance, and periodically check compliance and the effectiveness of permanent controls.")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode("h3", null, "Roles and responsibilities"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Board of Managers"),
                    createTextVNode(" — aligns the ERM policy with strategy and regulation, approves the policy, risk appetite, and tolerance, reviews risk reports, and holds the Committee and executive management accountable.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Board Risk and Compliance Committee"),
                    createTextVNode(" — endorses and recommends policies for Board approval, oversees identification, assessment, and mitigation of risks, monitors exposure, and guides the Risk function.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "CEO"),
                    createTextVNode(" — establishes a culture of risk awareness, ensures governance mechanisms monitor risk, oversees risk processes, supports employees, and sets best-practice standards.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Risk function"),
                    createTextVNode(" — leads implementation of the framework, coordinates activities, conducts assessments, establishes controls and mitigation plans, reports to the Committee and Board, and delivers training.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Business unit department heads"),
                    createTextVNode(" — own risk within their departments, integrate risk practices into decision-making, communicate risks to the Risk function, and implement mitigation plans.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "All employees"),
                    createTextVNode(" — adhere to policies and procedures, report potential risks or incidents, participate in training, and maintain awareness of the risks in their roles.")
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
        id: "framework",
        num: "04",
        color: "var(--at-blue-deep)",
        eyebrow: "Risk management framework",
        title: "The risk management cycle: objectives and identification",
        lede: "The framework creates a shared understanding of risk and how to manage it, ensuring accepted risks stay within appetite, policy, and strategic objectives — and protecting customer and stakeholder safety. It runs as a continuous cycle.",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdStages, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "01",
                    title: "Identify",
                    "num-color": "var(--at-blue-deep)"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-b2d528a4${_scopeId3}>Systematically recognise, analyse, and document potential risks through horizon scanning and an annual review of the risk taxonomy.</p>`);
                      } else {
                        return [
                          createVNode("p", null, "Systematically recognise, analyse, and document potential risks through horizon scanning and an annual review of the risk taxonomy.")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "02",
                    title: "Assess",
                    "num-color": "var(--at-blue-deep)"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-b2d528a4${_scopeId3}>Comprehend the nature and level of each risk, scoring impact and likelihood both before (inherent) and after (residual) controls.</p>`);
                      } else {
                        return [
                          createVNode("p", null, "Comprehend the nature and level of each risk, scoring impact and likelihood both before (inherent) and after (residual) controls.")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "03",
                    title: "Mitigate",
                    "num-color": "var(--at-blue-deep)"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-b2d528a4${_scopeId3}>Select and implement strategies to modify likelihood, consequence, or both, and record mitigation action plans.</p>`);
                      } else {
                        return [
                          createVNode("p", null, "Select and implement strategies to modify likelihood, consequence, or both, and record mitigation action plans.")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "04",
                    title: "Monitor",
                    "num-color": "var(--at-blue-deep)"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-b2d528a4${_scopeId3}>Track progress against objectives, re-evaluate risks, and confirm controls remain adequate and effective.</p>`);
                      } else {
                        return [
                          createVNode("p", null, "Track progress against objectives, re-evaluate risks, and confirm controls remain adequate and effective.")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_EdStage, {
                      num: "01",
                      title: "Identify",
                      "num-color": "var(--at-blue-deep)"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, "Systematically recognise, analyse, and document potential risks through horizon scanning and an annual review of the risk taxonomy.")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_EdStage, {
                      num: "02",
                      title: "Assess",
                      "num-color": "var(--at-blue-deep)"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, "Comprehend the nature and level of each risk, scoring impact and likelihood both before (inherent) and after (residual) controls.")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_EdStage, {
                      num: "03",
                      title: "Mitigate",
                      "num-color": "var(--at-blue-deep)"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, "Select and implement strategies to modify likelihood, consequence, or both, and record mitigation action plans.")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_EdStage, {
                      num: "04",
                      title: "Monitor",
                      "num-color": "var(--at-blue-deep)"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, "Track progress against objectives, re-evaluate risks, and confirm controls remain adequate and effective.")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-b2d528a4${_scopeId}>Risk identification</h3><p data-v-b2d528a4${_scopeId}>The Risk function works with all teams to formally identify risks, considering tangible and intangible sources; causes and events; threats and opportunities; vulnerabilities and capabilities; changes in the external and internal context; indicators of emerging risk; the nature and value of assets; consequences on objectives; limitations of knowledge; time-related factors; and the biases, assumptions, and beliefs of those involved.</p><p data-v-b2d528a4${_scopeId}>Each identified risk is classified into one risk category. Where a risk spans several categories, the <strong data-v-b2d528a4${_scopeId}>predominant</strong> category is recorded on the Risk Register, with further consequences explored as needed. Categories, types, and scenarios are recorded in the risk taxonomy, and each risk is described by:</p>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-b2d528a4${_scopeId2}>The <strong data-v-b2d528a4${_scopeId2}>event</strong> that causes the risk to materialise;</li><li data-v-b2d528a4${_scopeId2}>The immediate <strong data-v-b2d528a4${_scopeId2}>consequence</strong> of that event occurring; and</li><li data-v-b2d528a4${_scopeId2}>The key indicators (KRIs) that monitor whether the risk has occurred or is materialising.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createTextVNode("The "),
                      createVNode("strong", null, "event"),
                      createTextVNode(" that causes the risk to materialise;")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("The immediate "),
                      createVNode("strong", null, "consequence"),
                      createTextVNode(" of that event occurring; and")
                    ]),
                    createVNode("li", null, "The key indicators (KRIs) that monitor whether the risk has occurred or is materialising.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<p data-v-b2d528a4${_scopeId}>Because each captured risk matters at business-unit level but requires prioritisation for senior management and the Board, prioritisation is achieved through the risk assessment.</p>`);
          } else {
            return [
              createVNode(_component_EdStages, null, {
                default: withCtx(() => [
                  createVNode(_component_EdStage, {
                    num: "01",
                    title: "Identify",
                    "num-color": "var(--at-blue-deep)"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, "Systematically recognise, analyse, and document potential risks through horizon scanning and an annual review of the risk taxonomy.")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_EdStage, {
                    num: "02",
                    title: "Assess",
                    "num-color": "var(--at-blue-deep)"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, "Comprehend the nature and level of each risk, scoring impact and likelihood both before (inherent) and after (residual) controls.")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_EdStage, {
                    num: "03",
                    title: "Mitigate",
                    "num-color": "var(--at-blue-deep)"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, "Select and implement strategies to modify likelihood, consequence, or both, and record mitigation action plans.")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_EdStage, {
                    num: "04",
                    title: "Monitor",
                    "num-color": "var(--at-blue-deep)"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, "Track progress against objectives, re-evaluate risks, and confirm controls remain adequate and effective.")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode("h3", null, "Risk identification"),
              createVNode("p", null, "The Risk function works with all teams to formally identify risks, considering tangible and intangible sources; causes and events; threats and opportunities; vulnerabilities and capabilities; changes in the external and internal context; indicators of emerging risk; the nature and value of assets; consequences on objectives; limitations of knowledge; time-related factors; and the biases, assumptions, and beliefs of those involved."),
              createVNode("p", null, [
                createTextVNode("Each identified risk is classified into one risk category. Where a risk spans several categories, the "),
                createVNode("strong", null, "predominant"),
                createTextVNode(" category is recorded on the Risk Register, with further consequences explored as needed. Categories, types, and scenarios are recorded in the risk taxonomy, and each risk is described by:")
              ]),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createTextVNode("The "),
                    createVNode("strong", null, "event"),
                    createTextVNode(" that causes the risk to materialise;")
                  ]),
                  createVNode("li", null, [
                    createTextVNode("The immediate "),
                    createVNode("strong", null, "consequence"),
                    createTextVNode(" of that event occurring; and")
                  ]),
                  createVNode("li", null, "The key indicators (KRIs) that monitor whether the risk has occurred or is materialising.")
                ]),
                _: 1
              }),
              createVNode("p", null, "Because each captured risk matters at business-unit level but requires prioritisation for senior management and the Board, prioritisation is achieved through the risk assessment.")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "assessment",
        num: "05",
        color: "var(--at-navy)",
        eyebrow: "Risk assessment",
        title: "Scoring impact and likelihood",
        lede: "Risk evaluation scores each risk across two criteria — impact and likelihood — using qualitative, quantitative, or combined techniques, so the most important risks are treated first.",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p data-v-b2d528a4${_scopeId}>Assessment considers the likelihood of events and consequences, the nature and magnitude of consequences, complexity and connectivity, time-related factors and volatility, and the effectiveness of existing controls. Impact is tied to indicators such as financial impact on revenue, failure to meet regulatory requirements, long-term negative media coverage and market-share loss, prosecution and fines, retention or loss of senior leaders, and impacts on employees or stakeholders including customers and suppliers.</p><h3 data-v-b2d528a4${_scopeId}>Impact scale</h3><div class="ed-table-wrap" data-v-b2d528a4${_scopeId}><table class="ed-table" data-v-b2d528a4${_scopeId}><thead data-v-b2d528a4${_scopeId}><tr data-v-b2d528a4${_scopeId}><th data-v-b2d528a4${_scopeId}>Level</th><th data-v-b2d528a4${_scopeId}>Rating</th><th data-v-b2d528a4${_scopeId}>Possible impact</th></tr></thead><tbody data-v-b2d528a4${_scopeId}><tr data-v-b2d528a4${_scopeId}><td data-v-b2d528a4${_scopeId}>5</td><td data-v-b2d528a4${_scopeId}>Severe</td><td data-v-b2d528a4${_scopeId}>Severe financial loss; severe loss of confidentiality, integrity, or availability; complete and prolonged IT interruption with no foreseeable resolution; total failure to meet critical objectives and regulatory requirements; severe, irreversible reputation loss requiring Board intervention.</td></tr><tr data-v-b2d528a4${_scopeId}><td data-v-b2d528a4${_scopeId}>4</td><td data-v-b2d528a4${_scopeId}>Major</td><td data-v-b2d528a4${_scopeId}>Major financial loss; significant loss of confidentiality, integrity, or availability; extensive long-term IT interruption; failure to meet key objectives or regulatory requirements; major reputation loss requiring Executive Management attention.</td></tr><tr data-v-b2d528a4${_scopeId}><td data-v-b2d528a4${_scopeId}>3</td><td data-v-b2d528a4${_scopeId}>Moderate</td><td data-v-b2d528a4${_scopeId}>Considerable financial loss; considerable impact on confidentiality, integrity, or availability; disruption longer than the Recovery Time Objective (RTO); considerable project disruption; limited reputation loss requiring some management attention.</td></tr><tr data-v-b2d528a4${_scopeId}><td data-v-b2d528a4${_scopeId}>2</td><td data-v-b2d528a4${_scopeId}>Minor</td><td data-v-b2d528a4${_scopeId}>Minor financial loss; considerable impact on confidentiality, integrity, or availability; disruption longer than identified RTOs; some objectives not met; minor reputation loss unlikely to affect stakeholders.</td></tr><tr data-v-b2d528a4${_scopeId}><td data-v-b2d528a4${_scopeId}>1</td><td data-v-b2d528a4${_scopeId}>Negligible</td><td data-v-b2d528a4${_scopeId}>Minor impacts on confidentiality, integrity, or availability; minor disruption to business or IT services at departmental level; minor business disruption.</td></tr></tbody></table></div><h3 data-v-b2d528a4${_scopeId}>Likelihood scale</h3><p data-v-b2d528a4${_scopeId}>Likelihood estimation accounts for existing controls: implemented controls make occurrence less likely, while absent, incompletely implemented, or undocumented controls increase it. Objective records of past events are used where available; otherwise stakeholder and employee interviews inform a first impression.</p><div class="ed-table-wrap" data-v-b2d528a4${_scopeId}><table class="ed-table" data-v-b2d528a4${_scopeId}><thead data-v-b2d528a4${_scopeId}><tr data-v-b2d528a4${_scopeId}><th data-v-b2d528a4${_scopeId}>#</th><th data-v-b2d528a4${_scopeId}>Descriptor</th><th data-v-b2d528a4${_scopeId}>Frequency</th><th data-v-b2d528a4${_scopeId}>Probability</th></tr></thead><tbody data-v-b2d528a4${_scopeId}><tr data-v-b2d528a4${_scopeId}><td data-v-b2d528a4${_scopeId}>5</td><td data-v-b2d528a4${_scopeId}>Almost Certain</td><td data-v-b2d528a4${_scopeId}>Every year or more</td><td data-v-b2d528a4${_scopeId}>60–100%</td></tr><tr data-v-b2d528a4${_scopeId}><td data-v-b2d528a4${_scopeId}>4</td><td data-v-b2d528a4${_scopeId}>Likely</td><td data-v-b2d528a4${_scopeId}>Once every 1–2 years</td><td data-v-b2d528a4${_scopeId}>30–59%</td></tr><tr data-v-b2d528a4${_scopeId}><td data-v-b2d528a4${_scopeId}>3</td><td data-v-b2d528a4${_scopeId}>Possible</td><td data-v-b2d528a4${_scopeId}>Once every 2–5 years</td><td data-v-b2d528a4${_scopeId}>10–29%</td></tr><tr data-v-b2d528a4${_scopeId}><td data-v-b2d528a4${_scopeId}>2</td><td data-v-b2d528a4${_scopeId}>Unlikely</td><td data-v-b2d528a4${_scopeId}>Once every 5–10 years</td><td data-v-b2d528a4${_scopeId}>6–9%</td></tr><tr data-v-b2d528a4${_scopeId}><td data-v-b2d528a4${_scopeId}>1</td><td data-v-b2d528a4${_scopeId}>Rare</td><td data-v-b2d528a4${_scopeId}>Less than once every 10 years</td><td data-v-b2d528a4${_scopeId}>0–5%</td></tr></tbody></table></div><h3 data-v-b2d528a4${_scopeId}>Heat map</h3><p data-v-b2d528a4${_scopeId}>A heat map visualises the risk score and prioritises risks. Each risk is assessed on likelihood and impact both before (inherent) and after (residual) controls. Separate assessments are undertaken for new products or material changes, and outputs are reported to the Board Risk and Compliance Committee and Board and form the basis for regulatory reporting.</p><div class="ed-table-wrap" data-v-b2d528a4${_scopeId}><table class="ed-table ed-heat" data-v-b2d528a4${_scopeId}><thead data-v-b2d528a4${_scopeId}><tr data-v-b2d528a4${_scopeId}><th data-v-b2d528a4${_scopeId}>Likelihood ↓ / Impact →</th><th data-v-b2d528a4${_scopeId}>Negligible</th><th data-v-b2d528a4${_scopeId}>Minor</th><th data-v-b2d528a4${_scopeId}>Moderate</th><th data-v-b2d528a4${_scopeId}>Major</th><th data-v-b2d528a4${_scopeId}>Severe</th></tr></thead><tbody data-v-b2d528a4${_scopeId}><tr data-v-b2d528a4${_scopeId}><th data-v-b2d528a4${_scopeId}>Almost Certain</th><td data-v-b2d528a4${_scopeId}>Low–Med</td><td data-v-b2d528a4${_scopeId}>Medium</td><td data-v-b2d528a4${_scopeId}>Med–High</td><td data-v-b2d528a4${_scopeId}>High</td><td data-v-b2d528a4${_scopeId}>High</td></tr><tr data-v-b2d528a4${_scopeId}><th data-v-b2d528a4${_scopeId}>Likely</th><td data-v-b2d528a4${_scopeId}>Low</td><td data-v-b2d528a4${_scopeId}>Low–Med</td><td data-v-b2d528a4${_scopeId}>Medium</td><td data-v-b2d528a4${_scopeId}>Med–High</td><td data-v-b2d528a4${_scopeId}>High</td></tr><tr data-v-b2d528a4${_scopeId}><th data-v-b2d528a4${_scopeId}>Possible</th><td data-v-b2d528a4${_scopeId}>Low</td><td data-v-b2d528a4${_scopeId}>Low–Med</td><td data-v-b2d528a4${_scopeId}>Medium</td><td data-v-b2d528a4${_scopeId}>Med–High</td><td data-v-b2d528a4${_scopeId}>Med–High</td></tr><tr data-v-b2d528a4${_scopeId}><th data-v-b2d528a4${_scopeId}>Unlikely</th><td data-v-b2d528a4${_scopeId}>Low</td><td data-v-b2d528a4${_scopeId}>Low–Med</td><td data-v-b2d528a4${_scopeId}>Low–Med</td><td data-v-b2d528a4${_scopeId}>Medium</td><td data-v-b2d528a4${_scopeId}>Med–High</td></tr><tr data-v-b2d528a4${_scopeId}><th data-v-b2d528a4${_scopeId}>Rare</th><td data-v-b2d528a4${_scopeId}>Low</td><td data-v-b2d528a4${_scopeId}>Low</td><td data-v-b2d528a4${_scopeId}>Low–Med</td><td data-v-b2d528a4${_scopeId}>Medium</td><td data-v-b2d528a4${_scopeId}>Medium</td></tr></tbody></table></div>`);
            _push2(ssrRenderComponent(_component_EdNote, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-b2d528a4${_scopeId2}>The impact and likelihood matrices provide a high-level, standardised reference. Granular financial thresholds per impact level, risk-category-specific criteria, and tolerable exposure levels aligned to appetite are further defined within the Operational Risk Management Framework (ORMF).</p>`);
                } else {
                  return [
                    createVNode("p", null, "The impact and likelihood matrices provide a high-level, standardised reference. Granular financial thresholds per impact level, risk-category-specific criteria, and tolerable exposure levels aligned to appetite are further defined within the Operational Risk Management Framework (ORMF).")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("p", null, "Assessment considers the likelihood of events and consequences, the nature and magnitude of consequences, complexity and connectivity, time-related factors and volatility, and the effectiveness of existing controls. Impact is tied to indicators such as financial impact on revenue, failure to meet regulatory requirements, long-term negative media coverage and market-share loss, prosecution and fines, retention or loss of senior leaders, and impacts on employees or stakeholders including customers and suppliers."),
              createVNode("h3", null, "Impact scale"),
              createVNode("div", { class: "ed-table-wrap" }, [
                createVNode("table", { class: "ed-table" }, [
                  createVNode("thead", null, [
                    createVNode("tr", null, [
                      createVNode("th", null, "Level"),
                      createVNode("th", null, "Rating"),
                      createVNode("th", null, "Possible impact")
                    ])
                  ]),
                  createVNode("tbody", null, [
                    createVNode("tr", null, [
                      createVNode("td", null, "5"),
                      createVNode("td", null, "Severe"),
                      createVNode("td", null, "Severe financial loss; severe loss of confidentiality, integrity, or availability; complete and prolonged IT interruption with no foreseeable resolution; total failure to meet critical objectives and regulatory requirements; severe, irreversible reputation loss requiring Board intervention.")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "4"),
                      createVNode("td", null, "Major"),
                      createVNode("td", null, "Major financial loss; significant loss of confidentiality, integrity, or availability; extensive long-term IT interruption; failure to meet key objectives or regulatory requirements; major reputation loss requiring Executive Management attention.")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "3"),
                      createVNode("td", null, "Moderate"),
                      createVNode("td", null, "Considerable financial loss; considerable impact on confidentiality, integrity, or availability; disruption longer than the Recovery Time Objective (RTO); considerable project disruption; limited reputation loss requiring some management attention.")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "2"),
                      createVNode("td", null, "Minor"),
                      createVNode("td", null, "Minor financial loss; considerable impact on confidentiality, integrity, or availability; disruption longer than identified RTOs; some objectives not met; minor reputation loss unlikely to affect stakeholders.")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "1"),
                      createVNode("td", null, "Negligible"),
                      createVNode("td", null, "Minor impacts on confidentiality, integrity, or availability; minor disruption to business or IT services at departmental level; minor business disruption.")
                    ])
                  ])
                ])
              ]),
              createVNode("h3", null, "Likelihood scale"),
              createVNode("p", null, "Likelihood estimation accounts for existing controls: implemented controls make occurrence less likely, while absent, incompletely implemented, or undocumented controls increase it. Objective records of past events are used where available; otherwise stakeholder and employee interviews inform a first impression."),
              createVNode("div", { class: "ed-table-wrap" }, [
                createVNode("table", { class: "ed-table" }, [
                  createVNode("thead", null, [
                    createVNode("tr", null, [
                      createVNode("th", null, "#"),
                      createVNode("th", null, "Descriptor"),
                      createVNode("th", null, "Frequency"),
                      createVNode("th", null, "Probability")
                    ])
                  ]),
                  createVNode("tbody", null, [
                    createVNode("tr", null, [
                      createVNode("td", null, "5"),
                      createVNode("td", null, "Almost Certain"),
                      createVNode("td", null, "Every year or more"),
                      createVNode("td", null, "60–100%")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "4"),
                      createVNode("td", null, "Likely"),
                      createVNode("td", null, "Once every 1–2 years"),
                      createVNode("td", null, "30–59%")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "3"),
                      createVNode("td", null, "Possible"),
                      createVNode("td", null, "Once every 2–5 years"),
                      createVNode("td", null, "10–29%")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "2"),
                      createVNode("td", null, "Unlikely"),
                      createVNode("td", null, "Once every 5–10 years"),
                      createVNode("td", null, "6–9%")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "1"),
                      createVNode("td", null, "Rare"),
                      createVNode("td", null, "Less than once every 10 years"),
                      createVNode("td", null, "0–5%")
                    ])
                  ])
                ])
              ]),
              createVNode("h3", null, "Heat map"),
              createVNode("p", null, "A heat map visualises the risk score and prioritises risks. Each risk is assessed on likelihood and impact both before (inherent) and after (residual) controls. Separate assessments are undertaken for new products or material changes, and outputs are reported to the Board Risk and Compliance Committee and Board and form the basis for regulatory reporting."),
              createVNode("div", { class: "ed-table-wrap" }, [
                createVNode("table", { class: "ed-table ed-heat" }, [
                  createVNode("thead", null, [
                    createVNode("tr", null, [
                      createVNode("th", null, "Likelihood ↓ / Impact →"),
                      createVNode("th", null, "Negligible"),
                      createVNode("th", null, "Minor"),
                      createVNode("th", null, "Moderate"),
                      createVNode("th", null, "Major"),
                      createVNode("th", null, "Severe")
                    ])
                  ]),
                  createVNode("tbody", null, [
                    createVNode("tr", null, [
                      createVNode("th", null, "Almost Certain"),
                      createVNode("td", null, "Low–Med"),
                      createVNode("td", null, "Medium"),
                      createVNode("td", null, "Med–High"),
                      createVNode("td", null, "High"),
                      createVNode("td", null, "High")
                    ]),
                    createVNode("tr", null, [
                      createVNode("th", null, "Likely"),
                      createVNode("td", null, "Low"),
                      createVNode("td", null, "Low–Med"),
                      createVNode("td", null, "Medium"),
                      createVNode("td", null, "Med–High"),
                      createVNode("td", null, "High")
                    ]),
                    createVNode("tr", null, [
                      createVNode("th", null, "Possible"),
                      createVNode("td", null, "Low"),
                      createVNode("td", null, "Low–Med"),
                      createVNode("td", null, "Medium"),
                      createVNode("td", null, "Med–High"),
                      createVNode("td", null, "Med–High")
                    ]),
                    createVNode("tr", null, [
                      createVNode("th", null, "Unlikely"),
                      createVNode("td", null, "Low"),
                      createVNode("td", null, "Low–Med"),
                      createVNode("td", null, "Low–Med"),
                      createVNode("td", null, "Medium"),
                      createVNode("td", null, "Med–High")
                    ]),
                    createVNode("tr", null, [
                      createVNode("th", null, "Rare"),
                      createVNode("td", null, "Low"),
                      createVNode("td", null, "Low"),
                      createVNode("td", null, "Low–Med"),
                      createVNode("td", null, "Medium"),
                      createVNode("td", null, "Medium")
                    ])
                  ])
                ])
              ]),
              createVNode(_component_EdNote, null, {
                default: withCtx(() => [
                  createVNode("p", null, "The impact and likelihood matrices provide a high-level, standardised reference. Granular financial thresholds per impact level, risk-category-specific criteria, and tolerable exposure levels aligned to appetite are further defined within the Operational Risk Management Framework (ORMF).")
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
        num: "06",
        color: "var(--at-teal-deep)",
        eyebrow: "Control landscape",
        title: "Controls and residual risk calculation",
        lede: "Once a risk is assessed inherently, the current control landscape is defined. Controls are recorded in the Risk Register and assessed for adequacy of design and effectiveness of operation.",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-b2d528a4${_scopeId}>Control definition</h3><p data-v-b2d528a4${_scopeId}>A control is a measure, policy, process, system configuration, or activity that manages a risk by reducing its likelihood, impact, or both. Controls may be:</p>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-b2d528a4${_scopeId2}><strong data-v-b2d528a4${_scopeId2}>Preventive</strong> — designed to stop a risk event from occurring.</li><li data-v-b2d528a4${_scopeId2}><strong data-v-b2d528a4${_scopeId2}>Detective</strong> — designed to identify and respond to a risk event should it occur.</li><li data-v-b2d528a4${_scopeId2}><strong data-v-b2d528a4${_scopeId2}>Corrective</strong> — designed to restore a process or reduce consequences after a risk event.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Preventive"),
                      createTextVNode(" — designed to stop a risk event from occurring.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Detective"),
                      createTextVNode(" — designed to identify and respond to a risk event should it occur.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Corrective"),
                      createTextVNode(" — designed to restore a process or reduce consequences after a risk event.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<p data-v-b2d528a4${_scopeId}>Each control is assessed on <strong data-v-b2d528a4${_scopeId}>design adequacy</strong> (whether it is appropriately designed for the risk) and <strong data-v-b2d528a4${_scopeId}>operating effectiveness</strong> (whether it functions consistently and as intended). Together these determine the strength of the control environment and influence the residual risk.</p><h3 data-v-b2d528a4${_scopeId}>Residual risk calculation</h3><p data-v-b2d528a4${_scopeId}>Residual risk is the level of risk that remains after the mitigating effect of existing controls. Nebras determines it through five steps:</p>`);
            _push2(ssrRenderComponent(_component_EdStages, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "01",
                    title: "Identify inherent risk",
                    "num-color": "var(--at-teal-deep)"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-b2d528a4${_scopeId3}>Establish the level of risk before any controls (likelihood × impact).</p>`);
                      } else {
                        return [
                          createVNode("p", null, "Establish the level of risk before any controls (likelihood × impact).")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "02",
                    title: "Assess existing controls",
                    "num-color": "var(--at-teal-deep)"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-b2d528a4${_scopeId3}>Evaluate the adequacy and effectiveness of each relevant control.</p>`);
                      } else {
                        return [
                          createVNode("p", null, "Evaluate the adequacy and effectiveness of each relevant control.")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "03",
                    title: "Determine control impact",
                    "num-color": "var(--at-teal-deep)"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-b2d528a4${_scopeId3}>Adjust inherent risk according to how much the controls reduce likelihood and/or impact.</p>`);
                      } else {
                        return [
                          createVNode("p", null, "Adjust inherent risk according to how much the controls reduce likelihood and/or impact.")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "04",
                    title: "Calculate residual risk",
                    "num-color": "var(--at-teal-deep)"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-b2d528a4${_scopeId3}>Derive the remaining level of risk after applying the control assessments.</p>`);
                      } else {
                        return [
                          createVNode("p", null, "Derive the remaining level of risk after applying the control assessments.")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "05",
                    title: "Compare against appetite",
                    "num-color": "var(--at-teal-deep)"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-b2d528a4${_scopeId3}>If residual risk exceeds appetite or tolerance, additional mitigation actions MUST be identified and implemented.</p>`);
                      } else {
                        return [
                          createVNode("p", null, "If residual risk exceeds appetite or tolerance, additional mitigation actions MUST be identified and implemented.")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_EdStage, {
                      num: "01",
                      title: "Identify inherent risk",
                      "num-color": "var(--at-teal-deep)"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, "Establish the level of risk before any controls (likelihood × impact).")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_EdStage, {
                      num: "02",
                      title: "Assess existing controls",
                      "num-color": "var(--at-teal-deep)"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, "Evaluate the adequacy and effectiveness of each relevant control.")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_EdStage, {
                      num: "03",
                      title: "Determine control impact",
                      "num-color": "var(--at-teal-deep)"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, "Adjust inherent risk according to how much the controls reduce likelihood and/or impact.")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_EdStage, {
                      num: "04",
                      title: "Calculate residual risk",
                      "num-color": "var(--at-teal-deep)"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, "Derive the remaining level of risk after applying the control assessments.")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_EdStage, {
                      num: "05",
                      title: "Compare against appetite",
                      "num-color": "var(--at-teal-deep)"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, "If residual risk exceeds appetite or tolerance, additional mitigation actions MUST be identified and implemented.")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<p data-v-b2d528a4${_scopeId}>Residual risk is documented for each entry in the Risk Register and is subject to ongoing monitoring, review, and update in accordance with the ERM framework.</p>`);
          } else {
            return [
              createVNode("h3", null, "Control definition"),
              createVNode("p", null, "A control is a measure, policy, process, system configuration, or activity that manages a risk by reducing its likelihood, impact, or both. Controls may be:"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Preventive"),
                    createTextVNode(" — designed to stop a risk event from occurring.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Detective"),
                    createTextVNode(" — designed to identify and respond to a risk event should it occur.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Corrective"),
                    createTextVNode(" — designed to restore a process or reduce consequences after a risk event.")
                  ])
                ]),
                _: 1
              }),
              createVNode("p", null, [
                createTextVNode("Each control is assessed on "),
                createVNode("strong", null, "design adequacy"),
                createTextVNode(" (whether it is appropriately designed for the risk) and "),
                createVNode("strong", null, "operating effectiveness"),
                createTextVNode(" (whether it functions consistently and as intended). Together these determine the strength of the control environment and influence the residual risk.")
              ]),
              createVNode("h3", null, "Residual risk calculation"),
              createVNode("p", null, "Residual risk is the level of risk that remains after the mitigating effect of existing controls. Nebras determines it through five steps:"),
              createVNode(_component_EdStages, null, {
                default: withCtx(() => [
                  createVNode(_component_EdStage, {
                    num: "01",
                    title: "Identify inherent risk",
                    "num-color": "var(--at-teal-deep)"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, "Establish the level of risk before any controls (likelihood × impact).")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_EdStage, {
                    num: "02",
                    title: "Assess existing controls",
                    "num-color": "var(--at-teal-deep)"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, "Evaluate the adequacy and effectiveness of each relevant control.")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_EdStage, {
                    num: "03",
                    title: "Determine control impact",
                    "num-color": "var(--at-teal-deep)"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, "Adjust inherent risk according to how much the controls reduce likelihood and/or impact.")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_EdStage, {
                    num: "04",
                    title: "Calculate residual risk",
                    "num-color": "var(--at-teal-deep)"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, "Derive the remaining level of risk after applying the control assessments.")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_EdStage, {
                    num: "05",
                    title: "Compare against appetite",
                    "num-color": "var(--at-teal-deep)"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, "If residual risk exceeds appetite or tolerance, additional mitigation actions MUST be identified and implemented.")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode("p", null, "Residual risk is documented for each entry in the Risk Register and is subject to ongoing monitoring, review, and update in accordance with the ERM framework.")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "mitigation",
        num: "07",
        color: "var(--at-teal)",
        eyebrow: "Mitigation, reporting & monitoring",
        title: "Treating, reporting, and monitoring risk",
        lede: "Risk mitigation is an iterative process of formulating, planning, implementing, and assessing strategies, then deciding whether the remaining risk is acceptable — and if not, taking further action.",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-b2d528a4${_scopeId}>Mitigation strategies</h3><p data-v-b2d528a4${_scopeId}>Selecting the most appropriate strategy balances benefits against cost, effort, and disadvantages. Strategies are not mutually exclusive and may involve:</p>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-b2d528a4${_scopeId2}>Avoiding the risk by not starting or continuing the activity.</li><li data-v-b2d528a4${_scopeId2}>Taking or increasing the risk to pursue an opportunity.</li><li data-v-b2d528a4${_scopeId2}>Removing the risk source.</li><li data-v-b2d528a4${_scopeId2}>Affecting the likelihood, or the consequences, via mitigation.</li><li data-v-b2d528a4${_scopeId2}>Sharing the risk (e.g. through contracts or insurance).</li><li data-v-b2d528a4${_scopeId2}>Retaining or tolerating the risk by informed decision.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Avoiding the risk by not starting or continuing the activity."),
                    createVNode("li", null, "Taking or increasing the risk to pursue an opportunity."),
                    createVNode("li", null, "Removing the risk source."),
                    createVNode("li", null, "Affecting the likelihood, or the consequences, via mitigation."),
                    createVNode("li", null, "Sharing the risk (e.g. through contracts or insurance)."),
                    createVNode("li", null, "Retaining or tolerating the risk by informed decision.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<p data-v-b2d528a4${_scopeId}>A mitigation action plan is put in place when current controls are ineffective, require improvement, or do not exist. Each action records who is doing what. Controls and mitigations can span more than one risk and be cross-divisional. Where ownership lies outside Nebras, further controls may be needed and stakeholder communication is crucial. If no strategy sufficiently modifies a risk, it is recorded and kept under review, with residual risk documented and monitored.</p><h3 data-v-b2d528a4${_scopeId}>Risk responses</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-b2d528a4${_scopeId2}><strong data-v-b2d528a4${_scopeId2}>Risk acceptance / tolerance</strong> — a Risk Owner may tolerate a residual risk within tolerance levels. If it falls outside tolerance, a formal approval form goes to the Risk function, subject to review by the Operations and Risk Lead and CEO; CEO-approved acceptance is noted by the Board Risk and Compliance Committee. Accepted risks remain on the register and are monitored quarterly.</li><li data-v-b2d528a4${_scopeId2}><strong data-v-b2d528a4${_scopeId2}>Risk avoidance</strong> — completely eliminates the possibility of the risk occurring; the most difficult response but with the greatest beneficial impact.</li><li data-v-b2d528a4${_scopeId2}><strong data-v-b2d528a4${_scopeId2}>Risk reduction</strong> — implements further mitigation to reduce likelihood, impact, or both.</li><li data-v-b2d528a4${_scopeId2}><strong data-v-b2d528a4${_scopeId2}>Risk transfer</strong> — hands risk to a willing third party (e.g. insurance or outsourcing); liability may remain with Nebras where contractors cap their liability.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Risk acceptance / tolerance"),
                      createTextVNode(" — a Risk Owner may tolerate a residual risk within tolerance levels. If it falls outside tolerance, a formal approval form goes to the Risk function, subject to review by the Operations and Risk Lead and CEO; CEO-approved acceptance is noted by the Board Risk and Compliance Committee. Accepted risks remain on the register and are monitored quarterly.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Risk avoidance"),
                      createTextVNode(" — completely eliminates the possibility of the risk occurring; the most difficult response but with the greatest beneficial impact.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Risk reduction"),
                      createTextVNode(" — implements further mitigation to reduce likelihood, impact, or both.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Risk transfer"),
                      createTextVNode(" — hands risk to a willing third party (e.g. insurance or outsourcing); liability may remain with Nebras where contractors cap their liability.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-b2d528a4${_scopeId}>Risk reporting</h3><p data-v-b2d528a4${_scopeId}>The process and its outcomes are documented and reported to communicate activities, inform decision-making, improve risk management, and assist stakeholder interaction. Timely, accurate reporting of risk-limit breaches is ensured, with significant breaches escalated and remediation action plans agreed. The Board Risk and Compliance Committee meets quarterly, and the Board receives an overview of new and changing risk profiles (via heatmap), any activity outside approved appetite, significant findings, and summarised assessment outcomes.</p><h3 data-v-b2d528a4${_scopeId}>Risk monitoring</h3><p data-v-b2d528a4${_scopeId}>Two systems of monitoring operate: <strong data-v-b2d528a4${_scopeId}>regular monitoring</strong> of effectiveness and emerging risks, technological advances, and regulatory change; and an <strong data-v-b2d528a4${_scopeId}>annual review</strong> of assessment findings, mitigation strategies, and control measures. For risks not marked “Accepted”, the accountable risk owner assesses at least quarterly whether KRIs and key controls are within tolerance, how likelihood or impact has changed, control effectiveness, and any new or emerging risks — signed off by the accountable risk owner.</p>`);
          } else {
            return [
              createVNode("h3", null, "Mitigation strategies"),
              createVNode("p", null, "Selecting the most appropriate strategy balances benefits against cost, effort, and disadvantages. Strategies are not mutually exclusive and may involve:"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Avoiding the risk by not starting or continuing the activity."),
                  createVNode("li", null, "Taking or increasing the risk to pursue an opportunity."),
                  createVNode("li", null, "Removing the risk source."),
                  createVNode("li", null, "Affecting the likelihood, or the consequences, via mitigation."),
                  createVNode("li", null, "Sharing the risk (e.g. through contracts or insurance)."),
                  createVNode("li", null, "Retaining or tolerating the risk by informed decision.")
                ]),
                _: 1
              }),
              createVNode("p", null, "A mitigation action plan is put in place when current controls are ineffective, require improvement, or do not exist. Each action records who is doing what. Controls and mitigations can span more than one risk and be cross-divisional. Where ownership lies outside Nebras, further controls may be needed and stakeholder communication is crucial. If no strategy sufficiently modifies a risk, it is recorded and kept under review, with residual risk documented and monitored."),
              createVNode("h3", null, "Risk responses"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Risk acceptance / tolerance"),
                    createTextVNode(" — a Risk Owner may tolerate a residual risk within tolerance levels. If it falls outside tolerance, a formal approval form goes to the Risk function, subject to review by the Operations and Risk Lead and CEO; CEO-approved acceptance is noted by the Board Risk and Compliance Committee. Accepted risks remain on the register and are monitored quarterly.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Risk avoidance"),
                    createTextVNode(" — completely eliminates the possibility of the risk occurring; the most difficult response but with the greatest beneficial impact.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Risk reduction"),
                    createTextVNode(" — implements further mitigation to reduce likelihood, impact, or both.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Risk transfer"),
                    createTextVNode(" — hands risk to a willing third party (e.g. insurance or outsourcing); liability may remain with Nebras where contractors cap their liability.")
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "Risk reporting"),
              createVNode("p", null, "The process and its outcomes are documented and reported to communicate activities, inform decision-making, improve risk management, and assist stakeholder interaction. Timely, accurate reporting of risk-limit breaches is ensured, with significant breaches escalated and remediation action plans agreed. The Board Risk and Compliance Committee meets quarterly, and the Board receives an overview of new and changing risk profiles (via heatmap), any activity outside approved appetite, significant findings, and summarised assessment outcomes."),
              createVNode("h3", null, "Risk monitoring"),
              createVNode("p", null, [
                createTextVNode("Two systems of monitoring operate: "),
                createVNode("strong", null, "regular monitoring"),
                createTextVNode(" of effectiveness and emerging risks, technological advances, and regulatory change; and an "),
                createVNode("strong", null, "annual review"),
                createTextVNode(" of assessment findings, mitigation strategies, and control measures. For risks not marked “Accepted”, the accountable risk owner assesses at least quarterly whether KRIs and key controls are within tolerance, how likelihood or impact has changed, control effectiveness, and any new or emerging risks — signed off by the accountable risk owner.")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "segregation",
        num: "08",
        color: "var(--at-gold)",
        eyebrow: "Segregation of Duty",
        title: "Preventing end-to-end control by any single role",
        lede: "The Segregation of Duty framework prevents fraud, errors, and conflicts of interest by enforcing clear delineations of responsibility across critical processes, aligned with CBUAE Risk Management Regulation and AML/CFT Guidelines.",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-b2d528a4${_scopeId}>Principles and scope</h3><p data-v-b2d528a4${_scopeId}>Segregation of Duty applies to all Nebras operations, systems, and processes under the ERM Policy — particularly financial controls, API Hub management, data access, and compliance — and extends to all staff, Board members, contractors, and third-party vendors. Its principles are:</p>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-b2d528a4${_scopeId2}><strong data-v-b2d528a4${_scopeId2}>Separation of incompatible duties</strong> — no single individual can initiate, execute, and approve a transaction or activity.</li><li data-v-b2d528a4${_scopeId2}><strong data-v-b2d528a4${_scopeId2}>Prevention of end-to-end control</strong> — no individual or role controls an entire process (e.g. both data access and compliance monitoring).</li><li data-v-b2d528a4${_scopeId2}><strong data-v-b2d528a4${_scopeId2}>Transparency and accountability</strong> — all actions are traceable to specific roles, documented in process workflows.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Separation of incompatible duties"),
                      createTextVNode(" — no single individual can initiate, execute, and approve a transaction or activity.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Prevention of end-to-end control"),
                      createTextVNode(" — no individual or role controls an entire process (e.g. both data access and compliance monitoring).")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Transparency and accountability"),
                      createTextVNode(" — all actions are traceable to specific roles, documented in process workflows.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-b2d528a4${_scopeId}>System design and enforcement</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-b2d528a4${_scopeId2}><strong data-v-b2d528a4${_scopeId2}>System design</strong> — Nebras systems are architected to enforce Segregation of Duty, using Role-Based Access Control (RBAC) and automated workflows that assign initiation, verification, and logging to distinct roles.</li><li data-v-b2d528a4${_scopeId2}><strong data-v-b2d528a4${_scopeId2}>Access controls</strong> — RBAC is implemented across all systems, with permissions reviewed quarterly.</li><li data-v-b2d528a4${_scopeId2}><strong data-v-b2d528a4${_scopeId2}>Access logs</strong> — all access and activity is logged, monitored for unauthorised attempts, and audited regularly.</li><li data-v-b2d528a4${_scopeId2}><strong data-v-b2d528a4${_scopeId2}>Internal audits</strong> — the Internal Audit team verifies compliance during annual and risk-based audits of high-risk areas.</li><li data-v-b2d528a4${_scopeId2}><strong data-v-b2d528a4${_scopeId2}>Automated alerts</strong> — systems generate alerts for detected overlaps or unauthorised access, escalating to the Risk and Compliance Lead.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "System design"),
                      createTextVNode(" — Nebras systems are architected to enforce Segregation of Duty, using Role-Based Access Control (RBAC) and automated workflows that assign initiation, verification, and logging to distinct roles.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Access controls"),
                      createTextVNode(" — RBAC is implemented across all systems, with permissions reviewed quarterly.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Access logs"),
                      createTextVNode(" — all access and activity is logged, monitored for unauthorised attempts, and audited regularly.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Internal audits"),
                      createTextVNode(" — the Internal Audit team verifies compliance during annual and risk-based audits of high-risk areas.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Automated alerts"),
                      createTextVNode(" — systems generate alerts for detected overlaps or unauthorised access, escalating to the Risk and Compliance Lead.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-b2d528a4${_scopeId}>Exception handling</h3><p data-v-b2d528a4${_scopeId}>Temporary exceptions (e.g. staffing constraints requiring role overlaps) MUST be approved in writing by the CEO with documented justification, time-bound to a maximum of <strong data-v-b2d528a4${_scopeId}>30 days</strong> unless extended by the Board, and mitigated with additional controls such as enhanced monitoring or secondary approvals by Internal Audit or Risk. All exceptions are logged and reviewed during audits.</p><h3 data-v-b2d528a4${_scopeId}>Critical processes</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-b2d528a4${_scopeId2}><strong data-v-b2d528a4${_scopeId2}>Financial controls</strong> — separate roles for initiating payments, approving transactions, and reconciling accounts.</li><li data-v-b2d528a4${_scopeId2}><strong data-v-b2d528a4${_scopeId2}>Compliance and audit</strong> — risk assessment and compliance monitoring are independent from operational execution.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Financial controls"),
                      createTextVNode(" — separate roles for initiating payments, approving transactions, and reconciling accounts.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Compliance and audit"),
                      createTextVNode(" — risk assessment and compliance monitoring are independent from operational execution.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-b2d528a4${_scopeId}>Implementation, training, and monitoring</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-b2d528a4${_scopeId2}><strong data-v-b2d528a4${_scopeId2}>Implementation</strong> — led by the Risk and Compliance Lead with IT support, completed within <strong data-v-b2d528a4${_scopeId2}>60 days</strong> of policy approval.</li><li data-v-b2d528a4${_scopeId2}><strong data-v-b2d528a4${_scopeId2}>Training</strong> — mandatory for all staff and contractors at onboarding and annually, with completion tracked and non-compliance escalated to the CEO within 7 days. The chapter is communicated to all staff within 30 days of approval.</li><li data-v-b2d528a4${_scopeId2}><strong data-v-b2d528a4${_scopeId2}>Monitoring</strong> — quarterly reviews of access logs and role assignments; annual audits reported to the Board Audit Committee; detected violations reported to the CEO within 48 hours; continuous real-time alerts with monthly summaries.</li><li data-v-b2d528a4${_scopeId2}><strong data-v-b2d528a4${_scopeId2}>Documentation</strong> — all related records are held in a secure, centralised database, retained for a minimum of <strong data-v-b2d528a4${_scopeId2}>5 years</strong>, with detailed role-to-process mappings for traceability.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Implementation"),
                      createTextVNode(" — led by the Risk and Compliance Lead with IT support, completed within "),
                      createVNode("strong", null, "60 days"),
                      createTextVNode(" of policy approval.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Training"),
                      createTextVNode(" — mandatory for all staff and contractors at onboarding and annually, with completion tracked and non-compliance escalated to the CEO within 7 days. The chapter is communicated to all staff within 30 days of approval.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Monitoring"),
                      createTextVNode(" — quarterly reviews of access logs and role assignments; annual audits reported to the Board Audit Committee; detected violations reported to the CEO within 48 hours; continuous real-time alerts with monthly summaries.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Documentation"),
                      createTextVNode(" — all related records are held in a secure, centralised database, retained for a minimum of "),
                      createVNode("strong", null, "5 years"),
                      createTextVNode(", with detailed role-to-process mappings for traceability.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-b2d528a4${_scopeId2}>While this policy establishes the principles of Segregation of Duties, detailed role-to-process mappings and RACI matrices — covering user access management, financial transactions and payment processing, and vendor onboarding and outsourcing — are maintained within the ORMF and supporting procedures, reviewed at least annually.</p>`);
                } else {
                  return [
                    createVNode("p", null, "While this policy establishes the principles of Segregation of Duties, detailed role-to-process mappings and RACI matrices — covering user access management, financial transactions and payment processing, and vendor onboarding and outsourcing — are maintained within the ORMF and supporting procedures, reviewed at least annually.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, "Principles and scope"),
              createVNode("p", null, "Segregation of Duty applies to all Nebras operations, systems, and processes under the ERM Policy — particularly financial controls, API Hub management, data access, and compliance — and extends to all staff, Board members, contractors, and third-party vendors. Its principles are:"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Separation of incompatible duties"),
                    createTextVNode(" — no single individual can initiate, execute, and approve a transaction or activity.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Prevention of end-to-end control"),
                    createTextVNode(" — no individual or role controls an entire process (e.g. both data access and compliance monitoring).")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Transparency and accountability"),
                    createTextVNode(" — all actions are traceable to specific roles, documented in process workflows.")
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "System design and enforcement"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "System design"),
                    createTextVNode(" — Nebras systems are architected to enforce Segregation of Duty, using Role-Based Access Control (RBAC) and automated workflows that assign initiation, verification, and logging to distinct roles.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Access controls"),
                    createTextVNode(" — RBAC is implemented across all systems, with permissions reviewed quarterly.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Access logs"),
                    createTextVNode(" — all access and activity is logged, monitored for unauthorised attempts, and audited regularly.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Internal audits"),
                    createTextVNode(" — the Internal Audit team verifies compliance during annual and risk-based audits of high-risk areas.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Automated alerts"),
                    createTextVNode(" — systems generate alerts for detected overlaps or unauthorised access, escalating to the Risk and Compliance Lead.")
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "Exception handling"),
              createVNode("p", null, [
                createTextVNode("Temporary exceptions (e.g. staffing constraints requiring role overlaps) MUST be approved in writing by the CEO with documented justification, time-bound to a maximum of "),
                createVNode("strong", null, "30 days"),
                createTextVNode(" unless extended by the Board, and mitigated with additional controls such as enhanced monitoring or secondary approvals by Internal Audit or Risk. All exceptions are logged and reviewed during audits.")
              ]),
              createVNode("h3", null, "Critical processes"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Financial controls"),
                    createTextVNode(" — separate roles for initiating payments, approving transactions, and reconciling accounts.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Compliance and audit"),
                    createTextVNode(" — risk assessment and compliance monitoring are independent from operational execution.")
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "Implementation, training, and monitoring"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Implementation"),
                    createTextVNode(" — led by the Risk and Compliance Lead with IT support, completed within "),
                    createVNode("strong", null, "60 days"),
                    createTextVNode(" of policy approval.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Training"),
                    createTextVNode(" — mandatory for all staff and contractors at onboarding and annually, with completion tracked and non-compliance escalated to the CEO within 7 days. The chapter is communicated to all staff within 30 days of approval.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Monitoring"),
                    createTextVNode(" — quarterly reviews of access logs and role assignments; annual audits reported to the Board Audit Committee; detected violations reported to the CEO within 48 hours; continuous real-time alerts with monthly summaries.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Documentation"),
                    createTextVNode(" — all related records are held in a secure, centralised database, retained for a minimum of "),
                    createVNode("strong", null, "5 years"),
                    createTextVNode(", with detailed role-to-process mappings for traceability.")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, null, {
                default: withCtx(() => [
                  createVNode("p", null, "While this policy establishes the principles of Segregation of Duties, detailed role-to-process mappings and RACI matrices — covering user access management, financial transactions and payment processing, and vendor onboarding and outsourcing — are maintained within the ORMF and supporting procedures, reviewed at least annually.")
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
              href: "/internal/policies/business-continuity",
              category: "Risk, Security & Compliance",
              title: "Business Continuity Policy",
              desc: "How Nebras sustains critical operations and recovers from disruption within defined recovery objectives."
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRelatedCard, {
              href: "/internal/policies/internal-audit",
              category: "Governance & Oversight",
              title: "Internal Audit Policy",
              desc: "The independent third-line assurance function that evaluates the effectiveness of risk management and controls."
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdRelatedCard, {
                href: "/internal/policies/business-continuity",
                category: "Risk, Security & Compliance",
                title: "Business Continuity Policy",
                desc: "How Nebras sustains critical operations and recovers from disruption within defined recovery objectives."
              }),
              createVNode(_component_EdRelatedCard, {
                href: "/internal/policies/internal-audit",
                category: "Governance & Oversight",
                title: "Internal Audit Policy",
                desc: "The independent third-line assurance function that evaluates the effectiveness of risk management and controls."
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/internal/policies/enterprise-risk-management.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const enterpriseRiskManagement = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b2d528a4"]]);
export {
  enterpriseRiskManagement as default
};
