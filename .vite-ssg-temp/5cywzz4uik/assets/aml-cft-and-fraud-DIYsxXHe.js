import { _ as __unplugin_components_0, a as __unplugin_components_2, b as __unplugin_components_6, c as __unplugin_components_7$2 } from "./EdBackStrip-COkyNhGh.js";
import { _ as __unplugin_components_7$1, a as __unplugin_components_8 } from "./EdStages-NkJQJXq7.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
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
  __name: "aml-cft-and-fraud",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({ title: "AML/CFT and Fraud Policy · Internal Policies" });
    const sections = [
      { id: "overview", label: "Overview" },
      { id: "roles", label: "Roles" },
      { id: "requirements", label: "AML/CFT requirements" },
      { id: "procedures", label: "AML/CFT procedures" },
      { id: "prevention", label: "Fraud preventive controls" },
      { id: "detection", label: "Fraud detection" },
      { id: "assessment", label: "Fraud risk assessment" },
      { id: "incidents", label: "Incidents & coordination" },
      { id: "governance", label: "Monitoring & review" }
    ];
    const meta = [
      { label: "Applies to", value: "Nebras · LFIs · TPPs" },
      { label: "Classification", value: "Restricted" },
      { label: "Version", value: "1.0 · Aug 2025" }
    ];
    const keyNums = [
      { value: "5", unit: "yr", label: "Payment and entity record retention" },
      { value: "24", unit: "h", label: "Compliance review of a reported incident" },
      { value: "5", unit: "days", label: "Root Cause Analysis completion" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdBackStrip = __unplugin_components_0;
      const _component_EdHero = __unplugin_components_0$1;
      const _component_EdInPageNav = __unplugin_components_2;
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdNote = __unplugin_components_7;
      const _component_EdBullets = __unplugin_components_5;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdStages = __unplugin_components_7$1;
      const _component_EdStage = __unplugin_components_8;
      const _component_EdRelatedCards = __unplugin_components_6;
      const _component_EdRelatedCard = __unplugin_components_7$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-page" }, _attrs))} data-v-9a5e17ba>`);
      _push(ssrRenderComponent(_component_EdBackStrip, {
        href: "/internal/policies/",
        text: "All policies"
      }, null, _parent));
      _push(ssrRenderComponent(_component_EdHero, {
        eyebrow: "Internal · Restricted",
        "eyebrow-color": "var(--at-blue)",
        title: "AML/CFT and Fraud Policy",
        meta,
        lede: "Nebras operates the UAE Open Finance API Hub — it does <strong>not</strong> hold customer funds, maintain client accounts, or conduct customer-facing transactions. Its AML/CFT role is therefore <strong>limited</strong>, confined to the regulatory fee collection service, and complements rather than replaces the primary obligations of LFIs, TPPs, and their commercial banking partners. Alongside this, Nebras enforces robust fraud prevention and detection controls with a zero-tolerance approach.",
        "key-nums": keyNums
      }, null, _parent));
      _push(ssrRenderComponent(_component_EdInPageNav, { sections }, null, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "overview",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Introduction",
        title: "Purpose, scope, and Nebras’s limited role",
        lede: "Established as a regulated API Hub operator under the Central Bank of the UAE (CBUAE), Nebras Open Finance LLC enables secure data sharing and controlled transaction initiation. Its activities complement — not replace — the AML/CFT responsibilities of LFIs and TPPs.",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdNote, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-9a5e17ba${_scopeId2}>Nebras maintains a limited AML/CFT role, confined strictly to its regulatory fee collection service. It does <strong data-v-9a5e17ba${_scopeId2}>not</strong> conduct customer-facing financial transactions, does <strong data-v-9a5e17ba${_scopeId2}>not</strong> maintain client funds, and does <strong data-v-9a5e17ba${_scopeId2}>not</strong> perform transaction monitoring, sanctions screening, or file Suspicious Activity Reports (SARs). AML/CFT compliance relating to customer transactions remains the responsibility of regulated LFIs, TPPs, and their banking partners.</p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode("Nebras maintains a limited AML/CFT role, confined strictly to its regulatory fee collection service. It does "),
                      createVNode("strong", null, "not"),
                      createTextVNode(" conduct customer-facing financial transactions, does "),
                      createVNode("strong", null, "not"),
                      createTextVNode(" maintain client funds, and does "),
                      createVNode("strong", null, "not"),
                      createTextVNode(" perform transaction monitoring, sanctions screening, or file Suspicious Activity Reports (SARs). AML/CFT compliance relating to customer transactions remains the responsibility of regulated LFIs, TPPs, and their banking partners.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-9a5e17ba${_scopeId}>Purpose</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-9a5e17ba${_scopeId2}>Define Nebras’s limited AML/CFT obligations within the Open Finance framework.</li><li data-v-9a5e17ba${_scopeId2}>Ensure compliance with CBUAE AML/CFT Guidelines, Open Finance Regulation, and international best practices for fraud prevention.</li><li data-v-9a5e17ba${_scopeId2}>Clarify that Nebras maintains robust controls to prevent, detect, and respond to fraud, even though it does not perform transaction monitoring, sanctions screening, or file SARs.</li><li data-v-9a5e17ba${_scopeId2}>Outline controls governing AML/CFT and fraud — due diligence, anomaly escalation, incident management, and risk handling associated with the collection service for regulatory fees between TPPs and LFIs.</li><li data-v-9a5e17ba${_scopeId2}>Assign roles and responsibilities across Nebras for the implementation and oversight of AML/CFT and fraud prevention processes.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Define Nebras’s limited AML/CFT obligations within the Open Finance framework."),
                    createVNode("li", null, "Ensure compliance with CBUAE AML/CFT Guidelines, Open Finance Regulation, and international best practices for fraud prevention."),
                    createVNode("li", null, "Clarify that Nebras maintains robust controls to prevent, detect, and respond to fraud, even though it does not perform transaction monitoring, sanctions screening, or file SARs."),
                    createVNode("li", null, "Outline controls governing AML/CFT and fraud — due diligence, anomaly escalation, incident management, and risk handling associated with the collection service for regulatory fees between TPPs and LFIs."),
                    createVNode("li", null, "Assign roles and responsibilities across Nebras for the implementation and oversight of AML/CFT and fraud prevention processes.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-9a5e17ba${_scopeId}>Scope, audience, and goals</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-9a5e17ba${_scopeId2}><strong data-v-9a5e17ba${_scopeId2}>Scope</strong> — all Nebras staff, contractors, Board members, and authorized third parties; all activities involving the API Hub, Trust Framework, Open Finance Standards, and the collection of regulatory fees from LFIs and TPPs; and all LFIs and TPPs connected to Nebras in their interactions with the platform.</li><li data-v-9a5e17ba${_scopeId2}><strong data-v-9a5e17ba${_scopeId2}>Audience</strong> — all Nebras employees, temporary staff, consultants, and authorized service partners.</li><li data-v-9a5e17ba${_scopeId2}><strong data-v-9a5e17ba${_scopeId2}>Goals</strong> — ensure compliance with relevant AML/CFT and fraud-related legal and regulatory requirements; articulate Nebras’s limited AML/CFT role; ensure all collected payments follow applicable financial crime and fraud controls through licensed banking partners; and strengthen oversight of anomalies, escalation mechanisms, and fraud incident management.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Scope"),
                      createTextVNode(" — all Nebras staff, contractors, Board members, and authorized third parties; all activities involving the API Hub, Trust Framework, Open Finance Standards, and the collection of regulatory fees from LFIs and TPPs; and all LFIs and TPPs connected to Nebras in their interactions with the platform.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Audience"),
                      createTextVNode(" — all Nebras employees, temporary staff, consultants, and authorized service partners.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Goals"),
                      createTextVNode(" — ensure compliance with relevant AML/CFT and fraud-related legal and regulatory requirements; articulate Nebras’s limited AML/CFT role; ensure all collected payments follow applicable financial crime and fraud controls through licensed banking partners; and strengthen oversight of anomalies, escalation mechanisms, and fraud incident management.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-9a5e17ba${_scopeId}>Key terms</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-9a5e17ba${_scopeId2}><strong data-v-9a5e17ba${_scopeId2}>API Hub</strong> — the Open Finance hub that enables API calls from TPPs to LFIs.</li><li data-v-9a5e17ba${_scopeId2}><strong data-v-9a5e17ba${_scopeId2}>Collection Service</strong> — Nebras’s mechanism for collecting regulatory fees from LFIs and TPPs through commercial banking partners; all payments are subject to the partners’ AML and financial crime controls.</li><li data-v-9a5e17ba${_scopeId2}><strong data-v-9a5e17ba${_scopeId2}>Anomaly</strong> — any irregularity detected within collection service payments requiring escalation.</li><li data-v-9a5e17ba${_scopeId2}><strong data-v-9a5e17ba${_scopeId2}>Regulated Parties</strong> — LFIs and TPPs licensed and screened by CBUAE.</li><li data-v-9a5e17ba${_scopeId2}><strong data-v-9a5e17ba${_scopeId2}>Due Diligence</strong> — the assessment of a service provider’s capability, financial stability, operational controls, technology, and risk posture before onboarding.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "API Hub"),
                      createTextVNode(" — the Open Finance hub that enables API calls from TPPs to LFIs.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Collection Service"),
                      createTextVNode(" — Nebras’s mechanism for collecting regulatory fees from LFIs and TPPs through commercial banking partners; all payments are subject to the partners’ AML and financial crime controls.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Anomaly"),
                      createTextVNode(" — any irregularity detected within collection service payments requiring escalation.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Regulated Parties"),
                      createTextVNode(" — LFIs and TPPs licensed and screened by CBUAE.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Due Diligence"),
                      createTextVNode(" — the assessment of a service provider’s capability, financial stability, operational controls, technology, and risk posture before onboarding.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-9a5e17ba${_scopeId}>Exceptions</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-9a5e17ba${_scopeId2}>Any exception to this policy MUST be approved explicitly by the Board Risk &amp; Compliance Committee and reassessed when necessary.</p>`);
                } else {
                  return [
                    createVNode("p", null, "Any exception to this policy MUST be approved explicitly by the Board Risk & Compliance Committee and reassessed when necessary.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdNote, null, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode("Nebras maintains a limited AML/CFT role, confined strictly to its regulatory fee collection service. It does "),
                    createVNode("strong", null, "not"),
                    createTextVNode(" conduct customer-facing financial transactions, does "),
                    createVNode("strong", null, "not"),
                    createTextVNode(" maintain client funds, and does "),
                    createVNode("strong", null, "not"),
                    createTextVNode(" perform transaction monitoring, sanctions screening, or file Suspicious Activity Reports (SARs). AML/CFT compliance relating to customer transactions remains the responsibility of regulated LFIs, TPPs, and their banking partners.")
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "Purpose"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Define Nebras’s limited AML/CFT obligations within the Open Finance framework."),
                  createVNode("li", null, "Ensure compliance with CBUAE AML/CFT Guidelines, Open Finance Regulation, and international best practices for fraud prevention."),
                  createVNode("li", null, "Clarify that Nebras maintains robust controls to prevent, detect, and respond to fraud, even though it does not perform transaction monitoring, sanctions screening, or file SARs."),
                  createVNode("li", null, "Outline controls governing AML/CFT and fraud — due diligence, anomaly escalation, incident management, and risk handling associated with the collection service for regulatory fees between TPPs and LFIs."),
                  createVNode("li", null, "Assign roles and responsibilities across Nebras for the implementation and oversight of AML/CFT and fraud prevention processes.")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Scope, audience, and goals"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Scope"),
                    createTextVNode(" — all Nebras staff, contractors, Board members, and authorized third parties; all activities involving the API Hub, Trust Framework, Open Finance Standards, and the collection of regulatory fees from LFIs and TPPs; and all LFIs and TPPs connected to Nebras in their interactions with the platform.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Audience"),
                    createTextVNode(" — all Nebras employees, temporary staff, consultants, and authorized service partners.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Goals"),
                    createTextVNode(" — ensure compliance with relevant AML/CFT and fraud-related legal and regulatory requirements; articulate Nebras’s limited AML/CFT role; ensure all collected payments follow applicable financial crime and fraud controls through licensed banking partners; and strengthen oversight of anomalies, escalation mechanisms, and fraud incident management.")
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "Key terms"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "API Hub"),
                    createTextVNode(" — the Open Finance hub that enables API calls from TPPs to LFIs.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Collection Service"),
                    createTextVNode(" — Nebras’s mechanism for collecting regulatory fees from LFIs and TPPs through commercial banking partners; all payments are subject to the partners’ AML and financial crime controls.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Anomaly"),
                    createTextVNode(" — any irregularity detected within collection service payments requiring escalation.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Regulated Parties"),
                    createTextVNode(" — LFIs and TPPs licensed and screened by CBUAE.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Due Diligence"),
                    createTextVNode(" — the assessment of a service provider’s capability, financial stability, operational controls, technology, and risk posture before onboarding.")
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "Exceptions"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("p", null, "Any exception to this policy MUST be approved explicitly by the Board Risk & Compliance Committee and reassessed when necessary.")
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
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "Roles and responsibilities",
        title: "Who owns what",
        lede: "Accountability for AML/CFT and fraud controls is distributed from the Board through to individual employees.",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-9a5e17ba${_scopeId2}><strong data-v-9a5e17ba${_scopeId2}>Board Risk and Compliance Committee</strong> — approves this policy and oversees its implementation; ensures an appropriate governance framework with clearly defined roles, responsibilities, and accountability; and ensures senior management maintains the systems, controls, and resources needed to comply with regulatory expectations.</li><li data-v-9a5e17ba${_scopeId2}><strong data-v-9a5e17ba${_scopeId2}>The CEO</strong> — ensures alignment with CBUAE AML/CFT and fraud regulations, enforces organization-wide compliance with this policy, and ensures adequate resources and oversight mechanisms are in place.</li><li data-v-9a5e17ba${_scopeId2}><strong data-v-9a5e17ba${_scopeId2}>Risk and Compliance Lead</strong> — establishes controls for AML/CFT and fraud exposures linked to the collection service, reviews collection service data for anomalies, escalates concerns to the CEO or CBUAE where required, reports material risks to the Board Risk &amp; Compliance Committee, and updates the policy with regulatory changes.</li><li data-v-9a5e17ba${_scopeId2}><strong data-v-9a5e17ba${_scopeId2}>Operations Team</strong> — records payments, flags irregularities, and supports quarterly reviews.</li><li data-v-9a5e17ba${_scopeId2}><strong data-v-9a5e17ba${_scopeId2}>Nebras Employees</strong> — report suspicious behaviours or irregularities to Compliance and support compliance with this policy.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Board Risk and Compliance Committee"),
                      createTextVNode(" — approves this policy and oversees its implementation; ensures an appropriate governance framework with clearly defined roles, responsibilities, and accountability; and ensures senior management maintains the systems, controls, and resources needed to comply with regulatory expectations.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "The CEO"),
                      createTextVNode(" — ensures alignment with CBUAE AML/CFT and fraud regulations, enforces organization-wide compliance with this policy, and ensures adequate resources and oversight mechanisms are in place.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Risk and Compliance Lead"),
                      createTextVNode(" — establishes controls for AML/CFT and fraud exposures linked to the collection service, reviews collection service data for anomalies, escalates concerns to the CEO or CBUAE where required, reports material risks to the Board Risk & Compliance Committee, and updates the policy with regulatory changes.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Operations Team"),
                      createTextVNode(" — records payments, flags irregularities, and supports quarterly reviews.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Nebras Employees"),
                      createTextVNode(" — report suspicious behaviours or irregularities to Compliance and support compliance with this policy.")
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
                    createVNode("strong", null, "Board Risk and Compliance Committee"),
                    createTextVNode(" — approves this policy and oversees its implementation; ensures an appropriate governance framework with clearly defined roles, responsibilities, and accountability; and ensures senior management maintains the systems, controls, and resources needed to comply with regulatory expectations.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "The CEO"),
                    createTextVNode(" — ensures alignment with CBUAE AML/CFT and fraud regulations, enforces organization-wide compliance with this policy, and ensures adequate resources and oversight mechanisms are in place.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Risk and Compliance Lead"),
                    createTextVNode(" — establishes controls for AML/CFT and fraud exposures linked to the collection service, reviews collection service data for anomalies, escalates concerns to the CEO or CBUAE where required, reports material risks to the Board Risk & Compliance Committee, and updates the policy with regulatory changes.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Operations Team"),
                    createTextVNode(" — records payments, flags irregularities, and supports quarterly reviews.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Nebras Employees"),
                    createTextVNode(" — report suspicious behaviours or irregularities to Compliance and support compliance with this policy.")
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
        id: "requirements",
        num: "03",
        color: "var(--at-blue)",
        eyebrow: "AML/CFT requirements",
        title: "Regulatory expectations and exposure oversight",
        lede: "Nebras maintains a governance framework that meets its AML/CFT obligations without assuming the regulatory responsibilities of LFIs and TPPs.",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-9a5e17ba${_scopeId}>Regulatory and compliance expectations</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-9a5e17ba${_scopeId2}>Nebras’s limited AML/CFT role MUST NOT replace or dilute the primary obligations of LFIs and TPPs under UAE regulations.</li><li data-v-9a5e17ba${_scopeId2}>AML/CFT compliance relating to customer transactions remains the responsibility of regulated LFIs, TPPs, and their banking partners.</li><li data-v-9a5e17ba${_scopeId2}>The fee-collection service is operated so it does not compromise Nebras’s ability to oversee its operational environment.</li><li data-v-9a5e17ba${_scopeId2}>All payment flows are routed exclusively through regulated commercial banking partners that apply AML, sanctions, and financial crime screening in line with UAE requirements.</li><li data-v-9a5e17ba${_scopeId2}>Nebras does not engage with, onboard, or facilitate entities that are not duly licensed or screened by the CBUAE.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Nebras’s limited AML/CFT role MUST NOT replace or dilute the primary obligations of LFIs and TPPs under UAE regulations."),
                    createVNode("li", null, "AML/CFT compliance relating to customer transactions remains the responsibility of regulated LFIs, TPPs, and their banking partners."),
                    createVNode("li", null, "The fee-collection service is operated so it does not compromise Nebras’s ability to oversee its operational environment."),
                    createVNode("li", null, "All payment flows are routed exclusively through regulated commercial banking partners that apply AML, sanctions, and financial crime screening in line with UAE requirements."),
                    createVNode("li", null, "Nebras does not engage with, onboard, or facilitate entities that are not duly licensed or screened by the CBUAE.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-9a5e17ba${_scopeId}>Assessing AML/CFT exposure within the collection service</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-9a5e17ba${_scopeId2}>The nature and structure of the fee-collection activity — and any associated financial crime exposure — are periodically assessed at a risk-based level.</li><li data-v-9a5e17ba${_scopeId2}>The regulatory status of all LFIs and TPPs is validated through CBUAE prior to any interaction or onboarding.</li><li data-v-9a5e17ba${_scopeId2}>Commercial banking partners supporting the collection service demonstrate credible AML, sanctions, and due-diligence controls consistent with UAE regulatory expectations.</li><li data-v-9a5e17ba${_scopeId2}>The environment is monitored for potential indicators of AML/CFT concerns, including irregular payment patterns, repeated disputes, unexpected sources of funds, and any anomalies identified through Nebras’s internal risk-monitoring frameworks.</li>`);
                } else {
                  return [
                    createVNode("li", null, "The nature and structure of the fee-collection activity — and any associated financial crime exposure — are periodically assessed at a risk-based level."),
                    createVNode("li", null, "The regulatory status of all LFIs and TPPs is validated through CBUAE prior to any interaction or onboarding."),
                    createVNode("li", null, "Commercial banking partners supporting the collection service demonstrate credible AML, sanctions, and due-diligence controls consistent with UAE regulatory expectations."),
                    createVNode("li", null, "The environment is monitored for potential indicators of AML/CFT concerns, including irregular payment patterns, repeated disputes, unexpected sources of funds, and any anomalies identified through Nebras’s internal risk-monitoring frameworks.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, "Regulatory and compliance expectations"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Nebras’s limited AML/CFT role MUST NOT replace or dilute the primary obligations of LFIs and TPPs under UAE regulations."),
                  createVNode("li", null, "AML/CFT compliance relating to customer transactions remains the responsibility of regulated LFIs, TPPs, and their banking partners."),
                  createVNode("li", null, "The fee-collection service is operated so it does not compromise Nebras’s ability to oversee its operational environment."),
                  createVNode("li", null, "All payment flows are routed exclusively through regulated commercial banking partners that apply AML, sanctions, and financial crime screening in line with UAE requirements."),
                  createVNode("li", null, "Nebras does not engage with, onboard, or facilitate entities that are not duly licensed or screened by the CBUAE.")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Assessing AML/CFT exposure within the collection service"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "The nature and structure of the fee-collection activity — and any associated financial crime exposure — are periodically assessed at a risk-based level."),
                  createVNode("li", null, "The regulatory status of all LFIs and TPPs is validated through CBUAE prior to any interaction or onboarding."),
                  createVNode("li", null, "Commercial banking partners supporting the collection service demonstrate credible AML, sanctions, and due-diligence controls consistent with UAE regulatory expectations."),
                  createVNode("li", null, "The environment is monitored for potential indicators of AML/CFT concerns, including irregular payment patterns, repeated disputes, unexpected sources of funds, and any anomalies identified through Nebras’s internal risk-monitoring frameworks.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "procedures",
        num: "04",
        color: "var(--at-blue-deep)",
        eyebrow: "AML/CFT procedures",
        title: "Due diligence and payment processing controls",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-9a5e17ba${_scopeId}>Due diligence</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-9a5e17ba${_scopeId2}>Verify LFI/TPP licensing status via CBUAE before onboarding.</li><li data-v-9a5e17ba${_scopeId2}>Collect basic entity and authorized signatory details.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Verify LFI/TPP licensing status via CBUAE before onboarding."),
                    createVNode("li", null, "Collect basic entity and authorized signatory details.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-9a5e17ba${_scopeId}>Payment processing controls</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-9a5e17ba${_scopeId2}>Record regulatory fee payments in an internal ledger.</li><li data-v-9a5e17ba${_scopeId2}>Monitor for anomalies such as irregular or delayed payments, unexpected payment sources, and repeated disputes or reversals.</li><li data-v-9a5e17ba${_scopeId2}>Escalate anomalies promptly.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Record regulatory fee payments in an internal ledger."),
                    createVNode("li", null, "Monitor for anomalies such as irregular or delayed payments, unexpected payment sources, and repeated disputes or reversals."),
                    createVNode("li", null, "Escalate anomalies promptly.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, "Due diligence"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Verify LFI/TPP licensing status via CBUAE before onboarding."),
                  createVNode("li", null, "Collect basic entity and authorized signatory details.")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Payment processing controls"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Record regulatory fee payments in an internal ledger."),
                  createVNode("li", null, "Monitor for anomalies such as irregular or delayed payments, unexpected payment sources, and repeated disputes or reversals."),
                  createVNode("li", null, "Escalate anomalies promptly.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "prevention",
        num: "05",
        color: "var(--at-navy)",
        eyebrow: "Fraud preventive controls",
        title: "Onboarding, access governance, and settlement",
        lede: "Preventive controls centre on maker–checker discipline across onboarding, access provisioning, and fee settlement.",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-9a5e17ba${_scopeId}>TPP &amp; LFI onboarding controls</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-9a5e17ba${_scopeId2}>Verify licensing status from official CBUAE sources before granting TPP access.</li><li data-v-9a5e17ba${_scopeId2}>Ensure no technical credentials are provisioned before Compliance signs off.</li><li data-v-9a5e17ba${_scopeId2}>Maintain onboarding checklists with mandatory maker–checker approval.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Verify licensing status from official CBUAE sources before granting TPP access."),
                    createVNode("li", null, "Ensure no technical credentials are provisioned before Compliance signs off."),
                    createVNode("li", null, "Maintain onboarding checklists with mandatory maker–checker approval.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-9a5e17ba${_scopeId}>TPP and LFI access governance</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-9a5e17ba${_scopeId2}>All access provisioning, modification, or revocation MUST follow a maker–checker approval flow.</li><li data-v-9a5e17ba${_scopeId2}>Access is granted only after verifying valid role justification, user identity, and active employment or contract.</li><li data-v-9a5e17ba${_scopeId2}>Quarterly access reviews MUST be conducted by Compliance and Technology.</li>`);
                } else {
                  return [
                    createVNode("li", null, "All access provisioning, modification, or revocation MUST follow a maker–checker approval flow."),
                    createVNode("li", null, "Access is granted only after verifying valid role justification, user identity, and active employment or contract."),
                    createVNode("li", null, "Quarterly access reviews MUST be conducted by Compliance and Technology.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-9a5e17ba${_scopeId}>Fee calculation &amp; settlement controls</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-9a5e17ba${_scopeId2}>All fee-related activities MUST follow a maker–checker process: the maker (Operations) prepares fee schedules, invoices, and reconciliations; the checker (Finance) verifies accuracy and approves.</li><li data-v-9a5e17ba${_scopeId2}>Exceptions — such as disputes or incorrect amounts — MUST be escalated to Nebras Management.</li><li data-v-9a5e17ba${_scopeId2}>Monthly reconciliation between system-generated logs and collected fees.</li>`);
                } else {
                  return [
                    createVNode("li", null, "All fee-related activities MUST follow a maker–checker process: the maker (Operations) prepares fee schedules, invoices, and reconciliations; the checker (Finance) verifies accuracy and approves."),
                    createVNode("li", null, "Exceptions — such as disputes or incorrect amounts — MUST be escalated to Nebras Management."),
                    createVNode("li", null, "Monthly reconciliation between system-generated logs and collected fees.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, "TPP & LFI onboarding controls"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Verify licensing status from official CBUAE sources before granting TPP access."),
                  createVNode("li", null, "Ensure no technical credentials are provisioned before Compliance signs off."),
                  createVNode("li", null, "Maintain onboarding checklists with mandatory maker–checker approval.")
                ]),
                _: 1
              }),
              createVNode("h3", null, "TPP and LFI access governance"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "All access provisioning, modification, or revocation MUST follow a maker–checker approval flow."),
                  createVNode("li", null, "Access is granted only after verifying valid role justification, user identity, and active employment or contract."),
                  createVNode("li", null, "Quarterly access reviews MUST be conducted by Compliance and Technology.")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Fee calculation & settlement controls"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "All fee-related activities MUST follow a maker–checker process: the maker (Operations) prepares fee schedules, invoices, and reconciliations; the checker (Finance) verifies accuracy and approves."),
                  createVNode("li", null, "Exceptions — such as disputes or incorrect amounts — MUST be escalated to Nebras Management."),
                  createVNode("li", null, "Monthly reconciliation between system-generated logs and collected fees.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "detection",
        num: "06",
        color: "var(--at-teal-deep)",
        eyebrow: "Fraud detection controls",
        title: "Monitoring, anomaly detection, and red flags",
        lede: "Audit logging and continuous monitoring MUST be enabled for all system-critical actions.",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-9a5e17ba${_scopeId}>System integrity and unauthorized access monitoring</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-9a5e17ba${_scopeId2}>Access changes and privilege escalations.</li><li data-v-9a5e17ba${_scopeId2}>API credential issuance and potential misuse.</li><li data-v-9a5e17ba${_scopeId2}>TPP onboarding activities.</li><li data-v-9a5e17ba${_scopeId2}>Attempts to grant access to unlicensed entities.</li><li data-v-9a5e17ba${_scopeId2}>Attempts originating outside the consent parameters or Trust Framework, including requests that cannot be reconciled to an approved Trust Framework role.</li><li data-v-9a5e17ba${_scopeId2}>Role changes executed outside the defined approval workflow.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Access changes and privilege escalations."),
                    createVNode("li", null, "API credential issuance and potential misuse."),
                    createVNode("li", null, "TPP onboarding activities."),
                    createVNode("li", null, "Attempts to grant access to unlicensed entities."),
                    createVNode("li", null, "Attempts originating outside the consent parameters or Trust Framework, including requests that cannot be reconciled to an approved Trust Framework role."),
                    createVNode("li", null, "Role changes executed outside the defined approval workflow.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-9a5e17ba${_scopeId2}>Compliance and Technology MUST jointly review these controls to ensure system integrity. Audit logs MUST be reviewed at least monthly, and alerts related to unauthorized or anomalous activity MUST be reviewed within one business day.</p>`);
                } else {
                  return [
                    createVNode("p", null, "Compliance and Technology MUST jointly review these controls to ensure system integrity. Audit logs MUST be reviewed at least monthly, and alerts related to unauthorized or anomalous activity MUST be reviewed within one business day.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-9a5e17ba${_scopeId}>Fee anomaly detection</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-9a5e17ba${_scopeId2}>Sudden changes in expected fee patterns.</li><li data-v-9a5e17ba${_scopeId2}>Duplicate or missing settlement transactions.</li><li data-v-9a5e17ba${_scopeId2}>Irregularities in LFI/TPP usage logs.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Sudden changes in expected fee patterns."),
                    createVNode("li", null, "Duplicate or missing settlement transactions."),
                    createVNode("li", null, "Irregularities in LFI/TPP usage logs.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-9a5e17ba${_scopeId2}>Any anomaly MUST be escalated to Compliance immediately.</p>`);
                } else {
                  return [
                    createVNode("p", null, "Any anomaly MUST be escalated to Compliance immediately.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<h4 data-v-9a5e17ba${_scopeId2}>Red flags for operational fraud</h4>`);
                  _push3(ssrRenderComponent(_component_EdBullets, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<li data-v-9a5e17ba${_scopeId3}>Bypassing maker–checker steps.</li><li data-v-9a5e17ba${_scopeId3}>Unexplained role changes.</li><li data-v-9a5e17ba${_scopeId3}>Credential issuance not logged.</li><li data-v-9a5e17ba${_scopeId3}>Inconsistent TPP licensing evidence.</li><li data-v-9a5e17ba${_scopeId3}>Manual overrides without justification.</li>`);
                      } else {
                        return [
                          createVNode("li", null, "Bypassing maker–checker steps."),
                          createVNode("li", null, "Unexplained role changes."),
                          createVNode("li", null, "Credential issuance not logged."),
                          createVNode("li", null, "Inconsistent TPP licensing evidence."),
                          createVNode("li", null, "Manual overrides without justification.")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("h4", null, "Red flags for operational fraud"),
                    createVNode(_component_EdBullets, null, {
                      default: withCtx(() => [
                        createVNode("li", null, "Bypassing maker–checker steps."),
                        createVNode("li", null, "Unexplained role changes."),
                        createVNode("li", null, "Credential issuance not logged."),
                        createVNode("li", null, "Inconsistent TPP licensing evidence."),
                        createVNode("li", null, "Manual overrides without justification.")
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
              createVNode("h3", null, "System integrity and unauthorized access monitoring"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Access changes and privilege escalations."),
                  createVNode("li", null, "API credential issuance and potential misuse."),
                  createVNode("li", null, "TPP onboarding activities."),
                  createVNode("li", null, "Attempts to grant access to unlicensed entities."),
                  createVNode("li", null, "Attempts originating outside the consent parameters or Trust Framework, including requests that cannot be reconciled to an approved Trust Framework role."),
                  createVNode("li", null, "Role changes executed outside the defined approval workflow.")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("p", null, "Compliance and Technology MUST jointly review these controls to ensure system integrity. Audit logs MUST be reviewed at least monthly, and alerts related to unauthorized or anomalous activity MUST be reviewed within one business day.")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Fee anomaly detection"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Sudden changes in expected fee patterns."),
                  createVNode("li", null, "Duplicate or missing settlement transactions."),
                  createVNode("li", null, "Irregularities in LFI/TPP usage logs.")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("p", null, "Any anomaly MUST be escalated to Compliance immediately.")
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, null, {
                default: withCtx(() => [
                  createVNode("h4", null, "Red flags for operational fraud"),
                  createVNode(_component_EdBullets, null, {
                    default: withCtx(() => [
                      createVNode("li", null, "Bypassing maker–checker steps."),
                      createVNode("li", null, "Unexplained role changes."),
                      createVNode("li", null, "Credential issuance not logged."),
                      createVNode("li", null, "Inconsistent TPP licensing evidence."),
                      createVNode("li", null, "Manual overrides without justification.")
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
        id: "assessment",
        num: "07",
        color: "var(--at-teal)",
        eyebrow: "Fraud risk assessment",
        title: "A documented methodology aligned with ERM",
        lede: "Nebras maintains a documented fraud risk assessment methodology aligned with the Enterprise Risk Management (ERM) framework. Fraud risks are identified, assessed, monitored, and reported as part of the organization’s risk management cycle.",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-9a5e17ba${_scopeId}>The fraud risk assessment shall</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-9a5e17ba${_scopeId2}>Identify inherent fraud risks relevant to Nebras’s activities, including regulatory fee collection, system access, data integrity, third-party interactions, and internal operations.</li><li data-v-9a5e17ba${_scopeId2}>Assess fraud risks based on likelihood and impact, consistent with the risk evaluation methodology defined in the ERM Policy.</li><li data-v-9a5e17ba${_scopeId2}>Identify existing preventive and detective controls and evaluate residual fraud risk.</li><li data-v-9a5e17ba${_scopeId2}>Define risk ownership and required mitigation actions for material fraud risks.</li><li data-v-9a5e17ba${_scopeId2}>Be reviewed at least annually, or upon the occurrence of material incidents or changes to Nebras’s operating environment.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Identify inherent fraud risks relevant to Nebras’s activities, including regulatory fee collection, system access, data integrity, third-party interactions, and internal operations."),
                    createVNode("li", null, "Assess fraud risks based on likelihood and impact, consistent with the risk evaluation methodology defined in the ERM Policy."),
                    createVNode("li", null, "Identify existing preventive and detective controls and evaluate residual fraud risk."),
                    createVNode("li", null, "Define risk ownership and required mitigation actions for material fraud risks."),
                    createVNode("li", null, "Be reviewed at least annually, or upon the occurrence of material incidents or changes to Nebras’s operating environment.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-9a5e17ba${_scopeId2}>Material fraud risks and assessment outcomes are reported to the Board Risk and Compliance Committee as part of regular ERM reporting.</p>`);
                } else {
                  return [
                    createVNode("p", null, "Material fraud risks and assessment outcomes are reported to the Board Risk and Compliance Committee as part of regular ERM reporting.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, "The fraud risk assessment shall"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Identify inherent fraud risks relevant to Nebras’s activities, including regulatory fee collection, system access, data integrity, third-party interactions, and internal operations."),
                  createVNode("li", null, "Assess fraud risks based on likelihood and impact, consistent with the risk evaluation methodology defined in the ERM Policy."),
                  createVNode("li", null, "Identify existing preventive and detective controls and evaluate residual fraud risk."),
                  createVNode("li", null, "Define risk ownership and required mitigation actions for material fraud risks."),
                  createVNode("li", null, "Be reviewed at least annually, or upon the occurrence of material incidents or changes to Nebras’s operating environment.")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("p", null, "Material fraud risks and assessment outcomes are reported to the Board Risk and Compliance Committee as part of regular ERM reporting.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "incidents",
        num: "08",
        color: "var(--at-gold)",
        eyebrow: "Incident management",
        title: "Reporting, escalation, and regulatory coordination",
        lede: "All employees MUST immediately report any suspected fraud to Compliance through the designated reporting channel, using the standardized fraud incident reporting template.",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-9a5e17ba${_scopeId}>Escalation flow</h3>`);
            _push2(ssrRenderComponent(_component_EdStages, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "01",
                    title: "Internal reporting",
                    "num-color": "var(--at-gold)"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-9a5e17ba${_scopeId3}>Employees immediately report suspected fraud to Compliance through the designated channel, using the standardized fraud incident reporting template.</p>`);
                      } else {
                        return [
                          createVNode("p", null, "Employees immediately report suspected fraud to Compliance through the designated channel, using the standardized fraud incident reporting template.")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "02",
                    title: "Compliance review",
                    "num-color": "var(--at-gold)"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-9a5e17ba${_scopeId3}>Compliance reviews the reported incident within <strong data-v-9a5e17ba${_scopeId3}>24 hours</strong>.</p>`);
                      } else {
                        return [
                          createVNode("p", null, [
                            createTextVNode("Compliance reviews the reported incident within "),
                            createVNode("strong", null, "24 hours"),
                            createTextVNode(".")
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "03",
                    title: "Investigation",
                    "num-color": "var(--at-gold)"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-9a5e17ba${_scopeId3}>Technology and/or Finance conduct the investigation, depending on the incident type.</p>`);
                      } else {
                        return [
                          createVNode("p", null, "Technology and/or Finance conduct the investigation, depending on the incident type.")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "04",
                    title: "Root Cause Analysis",
                    "num-color": "var(--at-gold)"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-9a5e17ba${_scopeId3}>A Root Cause Analysis (RCA) is completed within <strong data-v-9a5e17ba${_scopeId3}>5 business days</strong>.</p>`);
                      } else {
                        return [
                          createVNode("p", null, [
                            createTextVNode("A Root Cause Analysis (RCA) is completed within "),
                            createVNode("strong", null, "5 business days"),
                            createTextVNode(".")
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "05",
                    title: "Remediation to closure",
                    "num-color": "var(--at-gold)"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-9a5e17ba${_scopeId3}>All remediation actions are formally documented and tracked to closure.</p>`);
                      } else {
                        return [
                          createVNode("p", null, "All remediation actions are formally documented and tracked to closure.")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_EdStage, {
                      num: "01",
                      title: "Internal reporting",
                      "num-color": "var(--at-gold)"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, "Employees immediately report suspected fraud to Compliance through the designated channel, using the standardized fraud incident reporting template.")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_EdStage, {
                      num: "02",
                      title: "Compliance review",
                      "num-color": "var(--at-gold)"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, [
                          createTextVNode("Compliance reviews the reported incident within "),
                          createVNode("strong", null, "24 hours"),
                          createTextVNode(".")
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_EdStage, {
                      num: "03",
                      title: "Investigation",
                      "num-color": "var(--at-gold)"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, "Technology and/or Finance conduct the investigation, depending on the incident type.")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_EdStage, {
                      num: "04",
                      title: "Root Cause Analysis",
                      "num-color": "var(--at-gold)"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, [
                          createTextVNode("A Root Cause Analysis (RCA) is completed within "),
                          createVNode("strong", null, "5 business days"),
                          createTextVNode(".")
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_EdStage, {
                      num: "05",
                      title: "Remediation to closure",
                      "num-color": "var(--at-gold)"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, "All remediation actions are formally documented and tracked to closure.")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-9a5e17ba${_scopeId}>Regulatory coordination and consumer protection</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-9a5e17ba${_scopeId2}>Nebras does not carry AML or financial crime reporting obligations; these remain the responsibility of LFIs and TPPs.</li><li data-v-9a5e17ba${_scopeId2}>Nebras reports only internal operational fraud incidents when required under applicable UAE regulatory expectations.</li><li data-v-9a5e17ba${_scopeId2}><strong data-v-9a5e17ba${_scopeId2}>Transparency</strong> — standards and consent flows provide transparency and security for end users.</li><li data-v-9a5e17ba${_scopeId2}><strong data-v-9a5e17ba${_scopeId2}>Redress</strong> — LFIs and TPPs are responsible for handling consumer complaints and disputes.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Nebras does not carry AML or financial crime reporting obligations; these remain the responsibility of LFIs and TPPs."),
                    createVNode("li", null, "Nebras reports only internal operational fraud incidents when required under applicable UAE regulatory expectations."),
                    createVNode("li", null, [
                      createVNode("strong", null, "Transparency"),
                      createTextVNode(" — standards and consent flows provide transparency and security for end users.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Redress"),
                      createTextVNode(" — LFIs and TPPs are responsible for handling consumer complaints and disputes.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, "Escalation flow"),
              createVNode(_component_EdStages, null, {
                default: withCtx(() => [
                  createVNode(_component_EdStage, {
                    num: "01",
                    title: "Internal reporting",
                    "num-color": "var(--at-gold)"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, "Employees immediately report suspected fraud to Compliance through the designated channel, using the standardized fraud incident reporting template.")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_EdStage, {
                    num: "02",
                    title: "Compliance review",
                    "num-color": "var(--at-gold)"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, [
                        createTextVNode("Compliance reviews the reported incident within "),
                        createVNode("strong", null, "24 hours"),
                        createTextVNode(".")
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_EdStage, {
                    num: "03",
                    title: "Investigation",
                    "num-color": "var(--at-gold)"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, "Technology and/or Finance conduct the investigation, depending on the incident type.")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_EdStage, {
                    num: "04",
                    title: "Root Cause Analysis",
                    "num-color": "var(--at-gold)"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, [
                        createTextVNode("A Root Cause Analysis (RCA) is completed within "),
                        createVNode("strong", null, "5 business days"),
                        createTextVNode(".")
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_EdStage, {
                    num: "05",
                    title: "Remediation to closure",
                    "num-color": "var(--at-gold)"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, "All remediation actions are formally documented and tracked to closure.")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode("h3", null, "Regulatory coordination and consumer protection"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Nebras does not carry AML or financial crime reporting obligations; these remain the responsibility of LFIs and TPPs."),
                  createVNode("li", null, "Nebras reports only internal operational fraud incidents when required under applicable UAE regulatory expectations."),
                  createVNode("li", null, [
                    createVNode("strong", null, "Transparency"),
                    createTextVNode(" — standards and consent flows provide transparency and security for end users.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Redress"),
                    createTextVNode(" — LFIs and TPPs are responsible for handling consumer complaints and disputes.")
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
        num: "09",
        color: "var(--at-blue)",
        eyebrow: "Monitoring, training and review",
        title: "Recordkeeping, oversight, and enforcement",
        tone: "cream",
        narrow: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-9a5e17ba${_scopeId}>Record keeping</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-9a5e17ba${_scopeId2}>Nebras maintains payment and entity records for five (5) years, consistent with CBUAE guidelines.</p>`);
                } else {
                  return [
                    createVNode("p", null, "Nebras maintains payment and entity records for five (5) years, consistent with CBUAE guidelines.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-9a5e17ba${_scopeId}>Monitoring, training, and reporting</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-9a5e17ba${_scopeId2}>Quarterly reviews of collection service payments, with ongoing oversight from the Risk Lead and Senior Management.</li><li data-v-9a5e17ba${_scopeId2}>Annual AML/CFT training covering Nebras’s limited AML/CFT role, the responsibilities of LFIs and TPPs, identifying anomalies within the collection service, and escalation processes; non-compliance is reported to the Compliance Department.</li><li data-v-9a5e17ba${_scopeId2}>Annual compliance summaries to the Board Risk &amp; Compliance Committee, with immediate escalation of significant anomalies to the CEO and CBUAE.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Quarterly reviews of collection service payments, with ongoing oversight from the Risk Lead and Senior Management."),
                    createVNode("li", null, "Annual AML/CFT training covering Nebras’s limited AML/CFT role, the responsibilities of LFIs and TPPs, identifying anomalies within the collection service, and escalation processes; non-compliance is reported to the Compliance Department."),
                    createVNode("li", null, "Annual compliance summaries to the Board Risk & Compliance Committee, with immediate escalation of significant anomalies to the CEO and CBUAE.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-9a5e17ba${_scopeId}>Policy review and enforcement</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-9a5e17ba${_scopeId2}>Annual review, or earlier if regulatory updates require; exceptions require Board Committee approval.</li><li data-v-9a5e17ba${_scopeId2}><strong data-v-9a5e17ba${_scopeId2}>LFIs/TPPs</strong> — non-compliance or systemic issues are escalated to CBUAE in line with Open Finance Regulation.</li><li data-v-9a5e17ba${_scopeId2}><strong data-v-9a5e17ba${_scopeId2}>Nebras staff</strong> — violations of this policy may result in disciplinary action aligned with HR procedures.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Annual review, or earlier if regulatory updates require; exceptions require Board Committee approval."),
                    createVNode("li", null, [
                      createVNode("strong", null, "LFIs/TPPs"),
                      createTextVNode(" — non-compliance or systemic issues are escalated to CBUAE in line with Open Finance Regulation.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Nebras staff"),
                      createTextVNode(" — violations of this policy may result in disciplinary action aligned with HR procedures.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, "Record keeping"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("p", null, "Nebras maintains payment and entity records for five (5) years, consistent with CBUAE guidelines.")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Monitoring, training, and reporting"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Quarterly reviews of collection service payments, with ongoing oversight from the Risk Lead and Senior Management."),
                  createVNode("li", null, "Annual AML/CFT training covering Nebras’s limited AML/CFT role, the responsibilities of LFIs and TPPs, identifying anomalies within the collection service, and escalation processes; non-compliance is reported to the Compliance Department."),
                  createVNode("li", null, "Annual compliance summaries to the Board Risk & Compliance Committee, with immediate escalation of significant anomalies to the CEO and CBUAE.")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Policy review and enforcement"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Annual review, or earlier if regulatory updates require; exceptions require Board Committee approval."),
                  createVNode("li", null, [
                    createVNode("strong", null, "LFIs/TPPs"),
                    createTextVNode(" — non-compliance or systemic issues are escalated to CBUAE in line with Open Finance Regulation.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Nebras staff"),
                    createTextVNode(" — violations of this policy may result in disciplinary action aligned with HR procedures.")
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
              href: "/internal/policies/enterprise-risk-management",
              category: "Risk, Security & Compliance",
              title: "Enterprise Risk Management Policy",
              desc: "The ERM framework under which fraud risks are identified, assessed, and reported to the Board Risk & Compliance Committee."
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRelatedCard, {
              href: "/internal/policies/complaints-and-disputes",
              category: "Customers & Conduct",
              title: "Complaints and Disputes Management Policy",
              desc: "How Nebras resolves empirical disputes and escalates fraud-related and subjective matters to the CBUAE."
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdRelatedCard, {
                href: "/internal/policies/enterprise-risk-management",
                category: "Risk, Security & Compliance",
                title: "Enterprise Risk Management Policy",
                desc: "The ERM framework under which fraud risks are identified, assessed, and reported to the Board Risk & Compliance Committee."
              }),
              createVNode(_component_EdRelatedCard, {
                href: "/internal/policies/complaints-and-disputes",
                category: "Customers & Conduct",
                title: "Complaints and Disputes Management Policy",
                desc: "How Nebras resolves empirical disputes and escalates fraud-related and subjective matters to the CBUAE."
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/internal/policies/aml-cft-and-fraud.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const amlCftAndFraud = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9a5e17ba"]]);
export {
  amlCftAndFraud as default
};
