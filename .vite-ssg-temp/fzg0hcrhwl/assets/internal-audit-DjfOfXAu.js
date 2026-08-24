import { _ as __unplugin_components_0, a as __unplugin_components_2, b as __unplugin_components_6$1, c as __unplugin_components_7$1 } from "./EdBackStrip-COkyNhGh.js";
import { _ as __unplugin_components_6 } from "./EdExample-DPMgFk_O.js";
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
  __name: "internal-audit",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({ title: "Internal Audit Policy · Internal Policies" });
    const sections = [
      { id: "introduction", label: "Introduction" },
      { id: "governance", label: "Governance" },
      { id: "roles", label: "Roles & authorities" },
      { id: "department", label: "The Department" },
      { id: "methodology", label: "Audit methodology" },
      { id: "review", label: "Review & references" }
    ];
    const meta = [
      { label: "Applies to", value: "Nebras · All staff" },
      { label: "Classification", value: "Restricted" },
      { label: "Version", value: "1.0 · Aug 2025" }
    ];
    const keyNums = [
      { value: "3", unit: "yr", label: "Policy validity from date of approval" },
      { value: "5", unit: "yr", label: "External quality assessment cadence (minimum)" },
      { value: "2", unit: "×", label: "Maximum target-date extensions per finding" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdBackStrip = __unplugin_components_0;
      const _component_EdHero = __unplugin_components_0$1;
      const _component_EdInPageNav = __unplugin_components_2;
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdBullets = __unplugin_components_5;
      const _component_EdStages = __unplugin_components_7;
      const _component_EdStage = __unplugin_components_8;
      const _component_EdExample = __unplugin_components_6;
      const _component_EdRelatedCards = __unplugin_components_6$1;
      const _component_EdRelatedCard = __unplugin_components_7$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-page" }, _attrs))} data-v-5d580945>`);
      _push(ssrRenderComponent(_component_EdBackStrip, {
        href: "/internal/policies/",
        text: "All policies"
      }, null, _parent));
      _push(ssrRenderComponent(_component_EdHero, {
        eyebrow: "Internal · Restricted",
        "eyebrow-color": "var(--at-navy)",
        title: "Internal Audit Policy",
        meta,
        lede: "Nebras Open Finance adopts the three lines of defense model. The Internal Audit Department (the “Department” or “IAD”) is established as the <strong>third line of defense</strong>, providing independent assurance and consulting services. This policy defines the Department’s purpose, authority, and responsibility, its position within Nebras, and the scope of internal audit activities.",
        "key-nums": keyNums
      }, null, _parent));
      _push(ssrRenderComponent(_component_EdInPageNav, { sections }, null, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "introduction",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Introduction",
        title: "Purpose, glossary, and approval",
        lede: "The purpose of the Internal Audit Policy is to define the IAD’s purpose, authority, and responsibility, establish its position within Nebras — including its functional reporting relationship with the Board — and define the scope of internal audit activities, as well as others’ responsibilities for providing access and cooperation during audits.",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-5d580945${_scopeId}>Reference documents</h3><p data-v-5d580945${_scopeId}>The Internal Audit Policy is established in alignment with the following:</p>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-5d580945${_scopeId2}>Audit Committee’s Charter.</li><li data-v-5d580945${_scopeId2}>Internal Audit Manual.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Audit Committee’s Charter."),
                    createVNode("li", null, "Internal Audit Manual.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-5d580945${_scopeId}>Glossary</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-5d580945${_scopeId2}><strong data-v-5d580945${_scopeId2}>Nebras Leadership</strong> — Executive Officers.</li><li data-v-5d580945${_scopeId2}><strong data-v-5d580945${_scopeId2}>BoD</strong> — Board of Directors.</li><li data-v-5d580945${_scopeId2}><strong data-v-5d580945${_scopeId2}>Business Department</strong> — any organizational department in Nebras.</li><li data-v-5d580945${_scopeId2}><strong data-v-5d580945${_scopeId2}>HIA</strong> — Head of Internal Audit.</li><li data-v-5d580945${_scopeId2}><strong data-v-5d580945${_scopeId2}>IA / IAD</strong> — Internal Audit / Internal Audit Department.</li><li data-v-5d580945${_scopeId2}><strong data-v-5d580945${_scopeId2}>Three Lines Model</strong> — a risk management model with three levels of accountability.</li><li data-v-5d580945${_scopeId2}><strong data-v-5d580945${_scopeId2}>IPPF</strong> — International Professional Practice Framework.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Nebras Leadership"),
                      createTextVNode(" — Executive Officers.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "BoD"),
                      createTextVNode(" — Board of Directors.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Business Department"),
                      createTextVNode(" — any organizational department in Nebras.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "HIA"),
                      createTextVNode(" — Head of Internal Audit.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "IA / IAD"),
                      createTextVNode(" — Internal Audit / Internal Audit Department.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Three Lines Model"),
                      createTextVNode(" — a risk management model with three levels of accountability.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "IPPF"),
                      createTextVNode(" — International Professional Practice Framework.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-5d580945${_scopeId}>Approval of the policy</h3><p data-v-5d580945${_scopeId}>The Internal Audit Policy MUST be approved by the Audit Committee of Nebras and SHALL be effective from the date of its approval for a period of three years, or the re-election of Audit Committee members, whichever comes earlier. The Head of Internal Audit reviews the policy periodically to ensure it remains updated. Any revision is deemed invalid unless authorized and formally approved per the authorities of the Audit Committee.</p>`);
          } else {
            return [
              createVNode("h3", null, "Reference documents"),
              createVNode("p", null, "The Internal Audit Policy is established in alignment with the following:"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Audit Committee’s Charter."),
                  createVNode("li", null, "Internal Audit Manual.")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Glossary"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Nebras Leadership"),
                    createTextVNode(" — Executive Officers.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "BoD"),
                    createTextVNode(" — Board of Directors.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Business Department"),
                    createTextVNode(" — any organizational department in Nebras.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "HIA"),
                    createTextVNode(" — Head of Internal Audit.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "IA / IAD"),
                    createTextVNode(" — Internal Audit / Internal Audit Department.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Three Lines Model"),
                    createTextVNode(" — a risk management model with three levels of accountability.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "IPPF"),
                    createTextVNode(" — International Professional Practice Framework.")
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "Approval of the policy"),
              createVNode("p", null, "The Internal Audit Policy MUST be approved by the Audit Committee of Nebras and SHALL be effective from the date of its approval for a period of three years, or the re-election of Audit Committee members, whichever comes earlier. The Head of Internal Audit reviews the policy periodically to ensure it remains updated. Any revision is deemed invalid unless authorized and formally approved per the authorities of the Audit Committee.")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "governance",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "Governance",
        title: "Definition, framework, and independence",
        lede: "Internal auditing is an independent, objective assurance and advisory service designed to add value and improve Nebras’s operations. It helps Management and the Board accomplish their objectives by bringing a systematic, disciplined approach to evaluate and improve the effectiveness of governance, risk management, and control processes.",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-5d580945${_scopeId}>International Professional Practice Framework</h3><p data-v-5d580945${_scopeId}>In performing its duties, the IAD adheres to Nebras’s policies and procedures as well as the IPPF, which consists of:</p>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-5d580945${_scopeId2}><strong data-v-5d580945${_scopeId2}>Mandatory guidance</strong> — Core Principles, Definition, Code of Ethics, and the International Standards for the Professional Practice of Internal Auditing.</li><li data-v-5d580945${_scopeId2}><strong data-v-5d580945${_scopeId2}>Recommended guidance</strong> — Implementation Guidance and Supplemental Guidance.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Mandatory guidance"),
                      createTextVNode(" — Core Principles, Definition, Code of Ethics, and the International Standards for the Professional Practice of Internal Auditing.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Recommended guidance"),
                      createTextVNode(" — Implementation Guidance and Supplemental Guidance.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-5d580945${_scopeId}>Core principles</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-5d580945${_scopeId2}>Integrity.</li><li data-v-5d580945${_scopeId2}>Competence and due professional care.</li><li data-v-5d580945${_scopeId2}>Objective and free from undue influence (independent).</li><li data-v-5d580945${_scopeId2}>Aligns with the strategies, objectives, and risks of the organization.</li><li data-v-5d580945${_scopeId2}>Appropriately positioned and adequately resourced.</li><li data-v-5d580945${_scopeId2}>Quality and continuous improvement.</li><li data-v-5d580945${_scopeId2}>Communicates effectively.</li><li data-v-5d580945${_scopeId2}>Provides risk-based assurance.</li><li data-v-5d580945${_scopeId2}>Insightful, proactive, and future-focused.</li><li data-v-5d580945${_scopeId2}>Promotes organizational improvement.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Integrity."),
                    createVNode("li", null, "Competence and due professional care."),
                    createVNode("li", null, "Objective and free from undue influence (independent)."),
                    createVNode("li", null, "Aligns with the strategies, objectives, and risks of the organization."),
                    createVNode("li", null, "Appropriately positioned and adequately resourced."),
                    createVNode("li", null, "Quality and continuous improvement."),
                    createVNode("li", null, "Communicates effectively."),
                    createVNode("li", null, "Provides risk-based assurance."),
                    createVNode("li", null, "Insightful, proactive, and future-focused."),
                    createVNode("li", null, "Promotes organizational improvement.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-5d580945${_scopeId}>Code of ethics</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-5d580945${_scopeId2}><strong data-v-5d580945${_scopeId2}>Integrity</strong> — the integrity of Nebras staff establishes trust and provides the basis for reliance on their judgment.</li><li data-v-5d580945${_scopeId2}><strong data-v-5d580945${_scopeId2}>Objectivity</strong> — internal auditors exhibit the highest level of professional objectivity, make a balanced assessment of all relevant circumstances, and are not unduly influenced by their own interests or by others.</li><li data-v-5d580945${_scopeId2}><strong data-v-5d580945${_scopeId2}>Confidentiality</strong> — respect the value and ownership of information received and do not disclose it without appropriate authority unless there is a legal or professional obligation to do so.</li><li data-v-5d580945${_scopeId2}><strong data-v-5d580945${_scopeId2}>Competency</strong> — apply the knowledge, skills, and experience needed in the performance of internal audit services.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Integrity"),
                      createTextVNode(" — the integrity of Nebras staff establishes trust and provides the basis for reliance on their judgment.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Objectivity"),
                      createTextVNode(" — internal auditors exhibit the highest level of professional objectivity, make a balanced assessment of all relevant circumstances, and are not unduly influenced by their own interests or by others.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Confidentiality"),
                      createTextVNode(" — respect the value and ownership of information received and do not disclose it without appropriate authority unless there is a legal or professional obligation to do so.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Competency"),
                      createTextVNode(" — apply the knowledge, skills, and experience needed in the performance of internal audit services.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-5d580945${_scopeId}>Independence</h3><p data-v-5d580945${_scopeId}>The Head of Internal Audit has direct and unrestricted access to senior management and the BoD. Internal Audit is managed through dual reporting lines — functionally to the Audit Committee and administratively to the CEO through a dotted reporting line. The Audit Committee ensures the IAD is an independent function by:</p>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-5d580945${_scopeId2}>Approving the internal audit policy.</li><li data-v-5d580945${_scopeId2}>Approving the risk-based internal audit plan.</li><li data-v-5d580945${_scopeId2}>Approving the internal audit budget and resource plan.</li><li data-v-5d580945${_scopeId2}>Receiving communications from the Head of Internal Audit on the activity’s performance relative to its plan and other matters.</li><li data-v-5d580945${_scopeId2}>Approving decisions regarding the appointment and removal of the Head of Internal Audit.</li><li data-v-5d580945${_scopeId2}>Approving the remuneration of the Head of Internal Audit.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Approving the internal audit policy."),
                    createVNode("li", null, "Approving the risk-based internal audit plan."),
                    createVNode("li", null, "Approving the internal audit budget and resource plan."),
                    createVNode("li", null, "Receiving communications from the Head of Internal Audit on the activity’s performance relative to its plan and other matters."),
                    createVNode("li", null, "Approving decisions regarding the appointment and removal of the Head of Internal Audit."),
                    createVNode("li", null, "Approving the remuneration of the Head of Internal Audit.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<p data-v-5d580945${_scopeId}>The Department is free from interference in determining the scope of internal auditing, performing work, and reporting results. The Head of Internal Audit MUST disclose any such interference to the Audit Committee and discuss its implications, and MUST confirm the Department’s organizational independence to the Audit Committee at least annually.</p>`);
          } else {
            return [
              createVNode("h3", null, "International Professional Practice Framework"),
              createVNode("p", null, "In performing its duties, the IAD adheres to Nebras’s policies and procedures as well as the IPPF, which consists of:"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Mandatory guidance"),
                    createTextVNode(" — Core Principles, Definition, Code of Ethics, and the International Standards for the Professional Practice of Internal Auditing.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Recommended guidance"),
                    createTextVNode(" — Implementation Guidance and Supplemental Guidance.")
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "Core principles"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Integrity."),
                  createVNode("li", null, "Competence and due professional care."),
                  createVNode("li", null, "Objective and free from undue influence (independent)."),
                  createVNode("li", null, "Aligns with the strategies, objectives, and risks of the organization."),
                  createVNode("li", null, "Appropriately positioned and adequately resourced."),
                  createVNode("li", null, "Quality and continuous improvement."),
                  createVNode("li", null, "Communicates effectively."),
                  createVNode("li", null, "Provides risk-based assurance."),
                  createVNode("li", null, "Insightful, proactive, and future-focused."),
                  createVNode("li", null, "Promotes organizational improvement.")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Code of ethics"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Integrity"),
                    createTextVNode(" — the integrity of Nebras staff establishes trust and provides the basis for reliance on their judgment.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Objectivity"),
                    createTextVNode(" — internal auditors exhibit the highest level of professional objectivity, make a balanced assessment of all relevant circumstances, and are not unduly influenced by their own interests or by others.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Confidentiality"),
                    createTextVNode(" — respect the value and ownership of information received and do not disclose it without appropriate authority unless there is a legal or professional obligation to do so.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Competency"),
                    createTextVNode(" — apply the knowledge, skills, and experience needed in the performance of internal audit services.")
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "Independence"),
              createVNode("p", null, "The Head of Internal Audit has direct and unrestricted access to senior management and the BoD. Internal Audit is managed through dual reporting lines — functionally to the Audit Committee and administratively to the CEO through a dotted reporting line. The Audit Committee ensures the IAD is an independent function by:"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Approving the internal audit policy."),
                  createVNode("li", null, "Approving the risk-based internal audit plan."),
                  createVNode("li", null, "Approving the internal audit budget and resource plan."),
                  createVNode("li", null, "Receiving communications from the Head of Internal Audit on the activity’s performance relative to its plan and other matters."),
                  createVNode("li", null, "Approving decisions regarding the appointment and removal of the Head of Internal Audit."),
                  createVNode("li", null, "Approving the remuneration of the Head of Internal Audit.")
                ]),
                _: 1
              }),
              createVNode("p", null, "The Department is free from interference in determining the scope of internal auditing, performing work, and reporting results. The Head of Internal Audit MUST disclose any such interference to the Audit Committee and discuss its implications, and MUST confirm the Department’s organizational independence to the Audit Committee at least annually.")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "roles",
        num: "03",
        color: "var(--at-blue)",
        eyebrow: "Roles, responsibilities & authorities",
        title: "Who is accountable for what",
        lede: "Business departments and process owners are responsible for designing sound internal controls, policies, and procedures. As the third line of defense, the IAD is not responsible for setting policies, designing internal controls, or detecting fraud — its mandate is to evaluate these systems and provide independent assurance on their efficiency and effectiveness.",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-5d580945${_scopeId}>IAD — roles &amp; responsibilities</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-5d580945${_scopeId2}>Assist the Audit Committee in carrying out its responsibilities as stipulated in its Charter.</li><li data-v-5d580945${_scopeId2}>Conduct internal audit engagements per the scope of this policy and the risk-based audit plan.</li><li data-v-5d580945${_scopeId2}>Provide recommendations to mitigate highlighted risks and support Nebras’ objectives.</li><li data-v-5d580945${_scopeId2}>Support all departments in maintaining effective internal control systems and highlight opportunities for continuous improvement.</li><li data-v-5d580945${_scopeId2}>Maintain integrity and objectivity by refraining from administrative and executive responsibilities that would impair independence.</li><li data-v-5d580945${_scopeId2}>Review policies and procedures when requested and evaluate controls by identifying, prioritizing, and recording risks and controls.</li><li data-v-5d580945${_scopeId2}>Spread awareness about governance, risk assessment, and internal control systems.</li><li data-v-5d580945${_scopeId2}>Work to improve the overall efficiency and effectiveness of Nebras’ internal audit process.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Assist the Audit Committee in carrying out its responsibilities as stipulated in its Charter."),
                    createVNode("li", null, "Conduct internal audit engagements per the scope of this policy and the risk-based audit plan."),
                    createVNode("li", null, "Provide recommendations to mitigate highlighted risks and support Nebras’ objectives."),
                    createVNode("li", null, "Support all departments in maintaining effective internal control systems and highlight opportunities for continuous improvement."),
                    createVNode("li", null, "Maintain integrity and objectivity by refraining from administrative and executive responsibilities that would impair independence."),
                    createVNode("li", null, "Review policies and procedures when requested and evaluate controls by identifying, prioritizing, and recording risks and controls."),
                    createVNode("li", null, "Spread awareness about governance, risk assessment, and internal control systems."),
                    createVNode("li", null, "Work to improve the overall efficiency and effectiveness of Nebras’ internal audit process.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-5d580945${_scopeId}>IAD — authorities</h3><p data-v-5d580945${_scopeId}>The IAD is authorized to:</p>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-5d580945${_scopeId2}>Have unrestricted access to necessary information, including administrative and financial records, information systems and applications, and employee records to the extent needed to perform audit duties.</li><li data-v-5d580945${_scopeId2}>Communicate directly with the chairman and members of the Audit Committee.</li><li data-v-5d580945${_scopeId2}>Obtain necessary assistance from any employee or department when needed.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Have unrestricted access to necessary information, including administrative and financial records, information systems and applications, and employee records to the extent needed to perform audit duties."),
                    createVNode("li", null, "Communicate directly with the chairman and members of the Audit Committee."),
                    createVNode("li", null, "Obtain necessary assistance from any employee or department when needed.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<p data-v-5d580945${_scopeId}>The Head of Internal Audit and internal audit staff are NOT authorized to:</p>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-5d580945${_scopeId2}>Perform any operational duties.</li><li data-v-5d580945${_scopeId2}>Design controls or take actions to manage risks.</li><li data-v-5d580945${_scopeId2}>Initiate or approve accounting transactions, except those pertaining to IAD activities.</li><li data-v-5d580945${_scopeId2}>Have physical custody of assets other than those assigned to the IAD to assist in performing their duties.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Perform any operational duties."),
                    createVNode("li", null, "Design controls or take actions to manage risks."),
                    createVNode("li", null, "Initiate or approve accounting transactions, except those pertaining to IAD activities."),
                    createVNode("li", null, "Have physical custody of assets other than those assigned to the IAD to assist in performing their duties.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-5d580945${_scopeId}>Nebras Leadership and Business Departments</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-5d580945${_scopeId2}>Grant access to information, records, personnel, and physical properties for audits.</li><li data-v-5d580945${_scopeId2}>Ensure Nebras Leadership promptly addresses audit findings and recommendations.</li><li data-v-5d580945${_scopeId2}>Support auditors in performing their duties effectively.</li><li data-v-5d580945${_scopeId2}>Ensure management comments are included in the audit report before reporting to the Audit Committee.</li><li data-v-5d580945${_scopeId2}>Monitor the implementation of agreed audit action items within specified timelines.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Grant access to information, records, personnel, and physical properties for audits."),
                    createVNode("li", null, "Ensure Nebras Leadership promptly addresses audit findings and recommendations."),
                    createVNode("li", null, "Support auditors in performing their duties effectively."),
                    createVNode("li", null, "Ensure management comments are included in the audit report before reporting to the Audit Committee."),
                    createVNode("li", null, "Monitor the implementation of agreed audit action items within specified timelines.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-5d580945${_scopeId}>Head of Internal Audit — roles &amp; responsibilities</h3><p data-v-5d580945${_scopeId}>The Head of Internal Audit is accountable to the Audit Committee at three levels:</p>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-5d580945${_scopeId2}><strong data-v-5d580945${_scopeId2}>Strategic</strong> — develop and update the Internal Audit Policy, Protocol, and Manual; set the strategic direction of the IAD; establish and report KPIs; partner with leadership; and align activities with best practice, the IPPF, and the second line of defense.</li><li data-v-5d580945${_scopeId2}><strong data-v-5d580945${_scopeId2}>Internal auditing</strong> — review Nebras’ risk profile, conduct the annual risk assessment, prepare and implement the risk-based audit plan, manage service providers, develop follow-up mechanisms, and supervise IAD staff.</li><li data-v-5d580945${_scopeId2}><strong data-v-5d580945${_scopeId2}>Reporting</strong> — report significant control issues and recommendations, evaluate internal control effectiveness, communicate audit results, prepare thematic analyses, submit periodic performance and follow-up reports, and maintain quality assurance and improvement programs.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Strategic"),
                      createTextVNode(" — develop and update the Internal Audit Policy, Protocol, and Manual; set the strategic direction of the IAD; establish and report KPIs; partner with leadership; and align activities with best practice, the IPPF, and the second line of defense.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Internal auditing"),
                      createTextVNode(" — review Nebras’ risk profile, conduct the annual risk assessment, prepare and implement the risk-based audit plan, manage service providers, develop follow-up mechanisms, and supervise IAD staff.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Reporting"),
                      createTextVNode(" — report significant control issues and recommendations, evaluate internal control effectiveness, communicate audit results, prepare thematic analyses, submit periodic performance and follow-up reports, and maintain quality assurance and improvement programs.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-5d580945${_scopeId}>Head of Internal Audit — authorities</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-5d580945${_scopeId2}>Direct the IAD to conduct regular and extraordinary audits to address emerging risks, whether or not part of the audit plan, updating the Audit Committee afterwards.</li><li data-v-5d580945${_scopeId2}>Initiate special reviews or investigations as needed, with subsequent update to the Audit Committee.</li><li data-v-5d580945${_scopeId2}>Define the scope, objectives, and methodology of audit assignments.</li><li data-v-5d580945${_scopeId2}>Determine IAD priorities and recommend adjustments to the timescale and audit plan when needed.</li><li data-v-5d580945${_scopeId2}>Decide the risk rating of audit observations and the overall internal control evaluation, using predefined criteria and professional judgment.</li><li data-v-5d580945${_scopeId2}>Develop the Internal Audit Manual and protocol in alignment with this policy and other governing documents.</li><li data-v-5d580945${_scopeId2}>Develop and approve the risk assessment and scoring mechanism used to prepare the risk-based audit plan.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Direct the IAD to conduct regular and extraordinary audits to address emerging risks, whether or not part of the audit plan, updating the Audit Committee afterwards."),
                    createVNode("li", null, "Initiate special reviews or investigations as needed, with subsequent update to the Audit Committee."),
                    createVNode("li", null, "Define the scope, objectives, and methodology of audit assignments."),
                    createVNode("li", null, "Determine IAD priorities and recommend adjustments to the timescale and audit plan when needed."),
                    createVNode("li", null, "Decide the risk rating of audit observations and the overall internal control evaluation, using predefined criteria and professional judgment."),
                    createVNode("li", null, "Develop the Internal Audit Manual and protocol in alignment with this policy and other governing documents."),
                    createVNode("li", null, "Develop and approve the risk assessment and scoring mechanism used to prepare the risk-based audit plan.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, "IAD — roles & responsibilities"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Assist the Audit Committee in carrying out its responsibilities as stipulated in its Charter."),
                  createVNode("li", null, "Conduct internal audit engagements per the scope of this policy and the risk-based audit plan."),
                  createVNode("li", null, "Provide recommendations to mitigate highlighted risks and support Nebras’ objectives."),
                  createVNode("li", null, "Support all departments in maintaining effective internal control systems and highlight opportunities for continuous improvement."),
                  createVNode("li", null, "Maintain integrity and objectivity by refraining from administrative and executive responsibilities that would impair independence."),
                  createVNode("li", null, "Review policies and procedures when requested and evaluate controls by identifying, prioritizing, and recording risks and controls."),
                  createVNode("li", null, "Spread awareness about governance, risk assessment, and internal control systems."),
                  createVNode("li", null, "Work to improve the overall efficiency and effectiveness of Nebras’ internal audit process.")
                ]),
                _: 1
              }),
              createVNode("h3", null, "IAD — authorities"),
              createVNode("p", null, "The IAD is authorized to:"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Have unrestricted access to necessary information, including administrative and financial records, information systems and applications, and employee records to the extent needed to perform audit duties."),
                  createVNode("li", null, "Communicate directly with the chairman and members of the Audit Committee."),
                  createVNode("li", null, "Obtain necessary assistance from any employee or department when needed.")
                ]),
                _: 1
              }),
              createVNode("p", null, "The Head of Internal Audit and internal audit staff are NOT authorized to:"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Perform any operational duties."),
                  createVNode("li", null, "Design controls or take actions to manage risks."),
                  createVNode("li", null, "Initiate or approve accounting transactions, except those pertaining to IAD activities."),
                  createVNode("li", null, "Have physical custody of assets other than those assigned to the IAD to assist in performing their duties.")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Nebras Leadership and Business Departments"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Grant access to information, records, personnel, and physical properties for audits."),
                  createVNode("li", null, "Ensure Nebras Leadership promptly addresses audit findings and recommendations."),
                  createVNode("li", null, "Support auditors in performing their duties effectively."),
                  createVNode("li", null, "Ensure management comments are included in the audit report before reporting to the Audit Committee."),
                  createVNode("li", null, "Monitor the implementation of agreed audit action items within specified timelines.")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Head of Internal Audit — roles & responsibilities"),
              createVNode("p", null, "The Head of Internal Audit is accountable to the Audit Committee at three levels:"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Strategic"),
                    createTextVNode(" — develop and update the Internal Audit Policy, Protocol, and Manual; set the strategic direction of the IAD; establish and report KPIs; partner with leadership; and align activities with best practice, the IPPF, and the second line of defense.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Internal auditing"),
                    createTextVNode(" — review Nebras’ risk profile, conduct the annual risk assessment, prepare and implement the risk-based audit plan, manage service providers, develop follow-up mechanisms, and supervise IAD staff.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Reporting"),
                    createTextVNode(" — report significant control issues and recommendations, evaluate internal control effectiveness, communicate audit results, prepare thematic analyses, submit periodic performance and follow-up reports, and maintain quality assurance and improvement programs.")
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "Head of Internal Audit — authorities"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Direct the IAD to conduct regular and extraordinary audits to address emerging risks, whether or not part of the audit plan, updating the Audit Committee afterwards."),
                  createVNode("li", null, "Initiate special reviews or investigations as needed, with subsequent update to the Audit Committee."),
                  createVNode("li", null, "Define the scope, objectives, and methodology of audit assignments."),
                  createVNode("li", null, "Determine IAD priorities and recommend adjustments to the timescale and audit plan when needed."),
                  createVNode("li", null, "Decide the risk rating of audit observations and the overall internal control evaluation, using predefined criteria and professional judgment."),
                  createVNode("li", null, "Develop the Internal Audit Manual and protocol in alignment with this policy and other governing documents."),
                  createVNode("li", null, "Develop and approve the risk assessment and scoring mechanism used to prepare the risk-based audit plan.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "department",
        num: "04",
        color: "var(--at-blue-deep)",
        eyebrow: "The Internal Audit Department in Nebras",
        title: "Scope, planning, services, and assurance",
        lede: "The scope of the Internal Audit Department covers the activities of Nebras Open Finance and all its branches or subsidiaries, if any.",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-5d580945${_scopeId}>Scope</h3><p data-v-5d580945${_scopeId}>The scope includes, but is not limited to:</p>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-5d580945${_scopeId2}>Products, processes, and day-to-day operations.</li><li data-v-5d580945${_scopeId2}>Administrative, financial, and investment activities.</li><li data-v-5d580945${_scopeId2}>Information technology, information security, and applications.</li><li data-v-5d580945${_scopeId2}>Processes adopted by third parties or business partners where contractual agreement supports internal auditing.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Products, processes, and day-to-day operations."),
                    createVNode("li", null, "Administrative, financial, and investment activities."),
                    createVNode("li", null, "Information technology, information security, and applications."),
                    createVNode("li", null, "Processes adopted by third parties or business partners where contractual agreement supports internal auditing.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-5d580945${_scopeId}>Annual risk assessment and audit plan</h3><p data-v-5d580945${_scopeId}>The Head of Internal Audit presents the risk-based audit plan to the Audit Committee for input and approval. The plan includes the result of Nebras’ Enterprise Risk Assessment, the methodology adopted, recommended priorities, areas to be audited over the long and short term, and a proposed timetable for completion. The plan MUST be flexible and may be adjusted during the year based on emerging risks or business requirements; any changes are subsequently reported to the Audit Committee with rationale for noting and approval.</p><h3 data-v-5d580945${_scopeId}>Internal audit services</h3><p data-v-5d580945${_scopeId}>Audit services are conducted in conformance with the international standards for the professional practice of internal auditing, and are categorized as follows:</p>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-5d580945${_scopeId2}><strong data-v-5d580945${_scopeId2}>Assurance services</strong> — regular audit engagements conducted per the annual audit plan to provide reasonable assurance on the adequacy and effectiveness of internal control.</li><li data-v-5d580945${_scopeId2}><strong data-v-5d580945${_scopeId2}>Advisory services</strong> — engagements initiated at Management’s request to achieve agreed objectives and scope, such as reviews of specific processes, policies and procedures before implementation, projects, or investigations. These must not impair the Department’s independence, and pre-implementation review does not prevent auditors from raising findings during a later audit.</li><li data-v-5d580945${_scopeId2}><strong data-v-5d580945${_scopeId2}>Special review</strong> — a review initiated as a result of an audit finding, designed to achieve specific objectives or examine certain irregularities.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Assurance services"),
                      createTextVNode(" — regular audit engagements conducted per the annual audit plan to provide reasonable assurance on the adequacy and effectiveness of internal control.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Advisory services"),
                      createTextVNode(" — engagements initiated at Management’s request to achieve agreed objectives and scope, such as reviews of specific processes, policies and procedures before implementation, projects, or investigations. These must not impair the Department’s independence, and pre-implementation review does not prevent auditors from raising findings during a later audit.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Special review"),
                      createTextVNode(" — a review initiated as a result of an audit finding, designed to achieve specific objectives or examine certain irregularities.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-5d580945${_scopeId}>Using external services</h3><p data-v-5d580945${_scopeId}>The Head of Internal Audit is expected to obtain competent advice and external assistance where internal staff lack the required knowledge, skills, or competencies. Where the Head intends to rely on an outside service provider, they SHALL seek approval from the Audit Committee and assess the provider’s competency, independence, and objectivity in relation to the assignment.</p><h3 data-v-5d580945${_scopeId}>Periodic reporting</h3><p data-v-5d580945${_scopeId}>The Internal Audit Department submits a periodic report to the Audit Committee and BoD tabulating its achievements, key observations and findings, and emerging risks.</p><h3 data-v-5d580945${_scopeId}>Liaison with external auditor</h3><p data-v-5d580945${_scopeId}>Internal auditors should maintain professional relationships with external parties — consultants, external auditors, the central bank, and others in professional contact with them. The relationship with the external auditor should be a continuing partnership involving open communication, access to internal audit plans and reports, coordination, and minimization of duplication. Nebras’ Finance Department principally liaises with external auditors on the annual audit and financial statements.</p><h3 data-v-5d580945${_scopeId}>Quality assurance and improvement program</h3><p data-v-5d580945${_scopeId}>The IAD maintains a quality assurance and improvement program covering all aspects of its activities, performed through internal and external assessments to confirm conformity with the IPPF and adherence to principles and ethics. Internal assessments MUST be conducted periodically; external assessments MUST be conducted at least once every five years, under the supervision of the Audit Committee.</p><h3 data-v-5d580945${_scopeId}>Dispute resolution</h3><p data-v-5d580945${_scopeId}>Where a dispute arises between the IAD and process owners over findings, associated risks, or recommendations, the Head of Internal Audit works closely with Management — involving the CEO and Nebras’ leadership — to reach agreement in the best interest of Nebras. If unresolved, the matter is brought to the Audit Committee, which has the final decision.</p>`);
          } else {
            return [
              createVNode("h3", null, "Scope"),
              createVNode("p", null, "The scope includes, but is not limited to:"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Products, processes, and day-to-day operations."),
                  createVNode("li", null, "Administrative, financial, and investment activities."),
                  createVNode("li", null, "Information technology, information security, and applications."),
                  createVNode("li", null, "Processes adopted by third parties or business partners where contractual agreement supports internal auditing.")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Annual risk assessment and audit plan"),
              createVNode("p", null, "The Head of Internal Audit presents the risk-based audit plan to the Audit Committee for input and approval. The plan includes the result of Nebras’ Enterprise Risk Assessment, the methodology adopted, recommended priorities, areas to be audited over the long and short term, and a proposed timetable for completion. The plan MUST be flexible and may be adjusted during the year based on emerging risks or business requirements; any changes are subsequently reported to the Audit Committee with rationale for noting and approval."),
              createVNode("h3", null, "Internal audit services"),
              createVNode("p", null, "Audit services are conducted in conformance with the international standards for the professional practice of internal auditing, and are categorized as follows:"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Assurance services"),
                    createTextVNode(" — regular audit engagements conducted per the annual audit plan to provide reasonable assurance on the adequacy and effectiveness of internal control.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Advisory services"),
                    createTextVNode(" — engagements initiated at Management’s request to achieve agreed objectives and scope, such as reviews of specific processes, policies and procedures before implementation, projects, or investigations. These must not impair the Department’s independence, and pre-implementation review does not prevent auditors from raising findings during a later audit.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Special review"),
                    createTextVNode(" — a review initiated as a result of an audit finding, designed to achieve specific objectives or examine certain irregularities.")
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "Using external services"),
              createVNode("p", null, "The Head of Internal Audit is expected to obtain competent advice and external assistance where internal staff lack the required knowledge, skills, or competencies. Where the Head intends to rely on an outside service provider, they SHALL seek approval from the Audit Committee and assess the provider’s competency, independence, and objectivity in relation to the assignment."),
              createVNode("h3", null, "Periodic reporting"),
              createVNode("p", null, "The Internal Audit Department submits a periodic report to the Audit Committee and BoD tabulating its achievements, key observations and findings, and emerging risks."),
              createVNode("h3", null, "Liaison with external auditor"),
              createVNode("p", null, "Internal auditors should maintain professional relationships with external parties — consultants, external auditors, the central bank, and others in professional contact with them. The relationship with the external auditor should be a continuing partnership involving open communication, access to internal audit plans and reports, coordination, and minimization of duplication. Nebras’ Finance Department principally liaises with external auditors on the annual audit and financial statements."),
              createVNode("h3", null, "Quality assurance and improvement program"),
              createVNode("p", null, "The IAD maintains a quality assurance and improvement program covering all aspects of its activities, performed through internal and external assessments to confirm conformity with the IPPF and adherence to principles and ethics. Internal assessments MUST be conducted periodically; external assessments MUST be conducted at least once every five years, under the supervision of the Audit Committee."),
              createVNode("h3", null, "Dispute resolution"),
              createVNode("p", null, "Where a dispute arises between the IAD and process owners over findings, associated risks, or recommendations, the Head of Internal Audit works closely with Management — involving the CEO and Nebras’ leadership — to reach agreement in the best interest of Nebras. If unresolved, the matter is brought to the Audit Committee, which has the final decision.")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "methodology",
        num: "05",
        color: "var(--at-navy)",
        eyebrow: "Audit methodology",
        title: "How engagements are planned, executed, and reported",
        lede: "Nebras’ internal audit methodology outlines the systematic approach used by the IAD to plan, execute, and report on audit engagements. It is aligned with industry best practices and professional standards to ensure high-quality, impactful audit services.",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdStages, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "01",
                    title: "Risk-based planning",
                    "num-color": "var(--at-navy)"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-5d580945${_scopeId3}>Engagements are scoped through risk-based audit planning, prioritizing areas by the results of the enterprise risk assessment.</p>`);
                      } else {
                        return [
                          createVNode("p", null, "Engagements are scoped through risk-based audit planning, prioritizing areas by the results of the enterprise risk assessment.")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "02",
                    title: "Evidence gathering & analysis",
                    "num-color": "var(--at-navy)"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-5d580945${_scopeId3}>Auditors gather and analyse evidence to evaluate the design and operating effectiveness of internal controls.</p>`);
                      } else {
                        return [
                          createVNode("p", null, "Auditors gather and analyse evidence to evaluate the design and operating effectiveness of internal controls.")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "03",
                    title: "Reporting",
                    "num-color": "var(--at-navy)"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-5d580945${_scopeId3}>Findings are consolidated into comprehensive audit reports, including a control-effectiveness evaluation and risk-rated observations.</p>`);
                      } else {
                        return [
                          createVNode("p", null, "Findings are consolidated into comprehensive audit reports, including a control-effectiveness evaluation and risk-rated observations.")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_EdStage, {
                      num: "01",
                      title: "Risk-based planning",
                      "num-color": "var(--at-navy)"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, "Engagements are scoped through risk-based audit planning, prioritizing areas by the results of the enterprise risk assessment.")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_EdStage, {
                      num: "02",
                      title: "Evidence gathering & analysis",
                      "num-color": "var(--at-navy)"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, "Auditors gather and analyse evidence to evaluate the design and operating effectiveness of internal controls.")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_EdStage, {
                      num: "03",
                      title: "Reporting",
                      "num-color": "var(--at-navy)"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, "Findings are consolidated into comprehensive audit reports, including a control-effectiveness evaluation and risk-rated observations.")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-5d580945${_scopeId}>Audit frequency</h3><p data-v-5d580945${_scopeId}>Based on the enterprise risk assessment, every department is assessed for inherent risk against predefined criteria and classified as high, medium, or low risk:</p>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-5d580945${_scopeId2}><strong data-v-5d580945${_scopeId2}>High risk</strong> — audited every year.</li><li data-v-5d580945${_scopeId2}><strong data-v-5d580945${_scopeId2}>Medium risk</strong> — audited once every two years.</li><li data-v-5d580945${_scopeId2}><strong data-v-5d580945${_scopeId2}>Low risk</strong> — audited at least once every three years.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "High risk"),
                      createTextVNode(" — audited every year.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Medium risk"),
                      createTextVNode(" — audited once every two years.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Low risk"),
                      createTextVNode(" — audited at least once every three years.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<p data-v-5d580945${_scopeId}>Audit coverage and cycle are presented to the Audit Committee for feedback and approval. Any deviation from the audit cycle MUST be documented and approved by the Audit Committee.</p><h3 data-v-5d580945${_scopeId}>Audit rating</h3><p data-v-5d580945${_scopeId}>At the end of each assignment, the IAD evaluates the effectiveness of internal control, and the result forms part of the final audit report. Each observation is ranked with a risk rating based on its implication and likelihood, guiding priorities for corrective action so Management can readily identify the most critical findings.</p><h3 data-v-5d580945${_scopeId}>Follow-up on recommendations</h3><p data-v-5d580945${_scopeId}>Audit reports include management’s response and corrective action, with a target date for completion. The IAD is responsible for follow-up and for maintaining records for regular reporting to the Audit Committee. A process owner may request a target-date extension a maximum of two times, supported by valid rationale and considering the observation’s risk rating. Extensions are reviewed by the IAD and approved as follows:</p>`);
            _push2(ssrRenderComponent(_component_EdExample, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_EdBullets, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<li data-v-5d580945${_scopeId3}><strong data-v-5d580945${_scopeId3}>First-time extension</strong> — endorsed by the Head of Internal Audit; approved by the CEO.</li><li data-v-5d580945${_scopeId3}><strong data-v-5d580945${_scopeId3}>Second-time extension</strong> — endorsed by the Head of Internal Audit and the CEO; approved by the Audit Committee.</li>`);
                      } else {
                        return [
                          createVNode("li", null, [
                            createVNode("strong", null, "First-time extension"),
                            createTextVNode(" — endorsed by the Head of Internal Audit; approved by the CEO.")
                          ]),
                          createVNode("li", null, [
                            createVNode("strong", null, "Second-time extension"),
                            createTextVNode(" — endorsed by the Head of Internal Audit and the CEO; approved by the Audit Committee.")
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_EdBullets, null, {
                      default: withCtx(() => [
                        createVNode("li", null, [
                          createVNode("strong", null, "First-time extension"),
                          createTextVNode(" — endorsed by the Head of Internal Audit; approved by the CEO.")
                        ]),
                        createVNode("li", null, [
                          createVNode("strong", null, "Second-time extension"),
                          createTextVNode(" — endorsed by the Head of Internal Audit and the CEO; approved by the Audit Committee.")
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
              createVNode(_component_EdStages, null, {
                default: withCtx(() => [
                  createVNode(_component_EdStage, {
                    num: "01",
                    title: "Risk-based planning",
                    "num-color": "var(--at-navy)"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, "Engagements are scoped through risk-based audit planning, prioritizing areas by the results of the enterprise risk assessment.")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_EdStage, {
                    num: "02",
                    title: "Evidence gathering & analysis",
                    "num-color": "var(--at-navy)"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, "Auditors gather and analyse evidence to evaluate the design and operating effectiveness of internal controls.")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_EdStage, {
                    num: "03",
                    title: "Reporting",
                    "num-color": "var(--at-navy)"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, "Findings are consolidated into comprehensive audit reports, including a control-effectiveness evaluation and risk-rated observations.")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode("h3", null, "Audit frequency"),
              createVNode("p", null, "Based on the enterprise risk assessment, every department is assessed for inherent risk against predefined criteria and classified as high, medium, or low risk:"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "High risk"),
                    createTextVNode(" — audited every year.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Medium risk"),
                    createTextVNode(" — audited once every two years.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Low risk"),
                    createTextVNode(" — audited at least once every three years.")
                  ])
                ]),
                _: 1
              }),
              createVNode("p", null, "Audit coverage and cycle are presented to the Audit Committee for feedback and approval. Any deviation from the audit cycle MUST be documented and approved by the Audit Committee."),
              createVNode("h3", null, "Audit rating"),
              createVNode("p", null, "At the end of each assignment, the IAD evaluates the effectiveness of internal control, and the result forms part of the final audit report. Each observation is ranked with a risk rating based on its implication and likelihood, guiding priorities for corrective action so Management can readily identify the most critical findings."),
              createVNode("h3", null, "Follow-up on recommendations"),
              createVNode("p", null, "Audit reports include management’s response and corrective action, with a target date for completion. The IAD is responsible for follow-up and for maintaining records for regular reporting to the Audit Committee. A process owner may request a target-date extension a maximum of two times, supported by valid rationale and considering the observation’s risk rating. Extensions are reviewed by the IAD and approved as follows:"),
              createVNode(_component_EdExample, null, {
                default: withCtx(() => [
                  createVNode(_component_EdBullets, null, {
                    default: withCtx(() => [
                      createVNode("li", null, [
                        createVNode("strong", null, "First-time extension"),
                        createTextVNode(" — endorsed by the Head of Internal Audit; approved by the CEO.")
                      ]),
                      createVNode("li", null, [
                        createVNode("strong", null, "Second-time extension"),
                        createTextVNode(" — endorsed by the Head of Internal Audit and the CEO; approved by the Audit Committee.")
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
        id: "review",
        num: "06",
        color: "var(--at-teal-deep)",
        eyebrow: "Review & references",
        title: "Policy review and governing references",
        tone: "surface",
        narrow: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-5d580945${_scopeId}>Policy review</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-5d580945${_scopeId2}>The policy is reviewed annually by the Internal Audit Lead and approved by the Board Audit Committee.</li><li data-v-5d580945${_scopeId2}>Ad hoc reviews occur in response to regulatory changes, organizational shifts, or audit findings, ensuring ongoing relevance.</li>`);
                } else {
                  return [
                    createVNode("li", null, "The policy is reviewed annually by the Internal Audit Lead and approved by the Board Audit Committee."),
                    createVNode("li", null, "Ad hoc reviews occur in response to regulatory changes, organizational shifts, or audit findings, ensuring ongoing relevance.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-5d580945${_scopeId}>References</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-5d580945${_scopeId2}>CBUAE Internal Audit Regulation.</li><li data-v-5d580945${_scopeId2}>Open Finance Regulation.</li><li data-v-5d580945${_scopeId2}>Institute of Internal Auditors (IIA) International Standards for the Professional Practice of Internal Auditing.</li>`);
                } else {
                  return [
                    createVNode("li", null, "CBUAE Internal Audit Regulation."),
                    createVNode("li", null, "Open Finance Regulation."),
                    createVNode("li", null, "Institute of Internal Auditors (IIA) International Standards for the Professional Practice of Internal Auditing.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, "Policy review"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "The policy is reviewed annually by the Internal Audit Lead and approved by the Board Audit Committee."),
                  createVNode("li", null, "Ad hoc reviews occur in response to regulatory changes, organizational shifts, or audit findings, ensuring ongoing relevance.")
                ]),
                _: 1
              }),
              createVNode("h3", null, "References"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "CBUAE Internal Audit Regulation."),
                  createVNode("li", null, "Open Finance Regulation."),
                  createVNode("li", null, "Institute of Internal Auditors (IIA) International Standards for the Professional Practice of Internal Auditing.")
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
              href: "/internal/policies/corporate-governance",
              category: "Governance & Oversight",
              title: "Corporate Governance Policy",
              desc: "The governance framework and committee structure within which the Internal Audit Department operates as the third line of defense."
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRelatedCard, {
              href: "/internal/policies/enterprise-risk-management",
              category: "Risk, Security & Compliance",
              title: "Enterprise Risk Management Policy",
              desc: "The enterprise risk assessment that drives risk-based audit planning and audit frequency."
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdRelatedCard, {
                href: "/internal/policies/corporate-governance",
                category: "Governance & Oversight",
                title: "Corporate Governance Policy",
                desc: "The governance framework and committee structure within which the Internal Audit Department operates as the third line of defense."
              }),
              createVNode(_component_EdRelatedCard, {
                href: "/internal/policies/enterprise-risk-management",
                category: "Risk, Security & Compliance",
                title: "Enterprise Risk Management Policy",
                desc: "The enterprise risk assessment that drives risk-based audit planning and audit frequency."
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/internal/policies/internal-audit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const internalAudit = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-5d580945"]]);
export {
  internalAudit as default
};
