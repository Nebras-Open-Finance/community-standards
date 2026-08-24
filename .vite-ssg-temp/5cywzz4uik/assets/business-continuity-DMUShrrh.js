import { _ as __unplugin_components_0, a as __unplugin_components_2, b as __unplugin_components_6, c as __unplugin_components_7$2 } from "./EdBackStrip-COkyNhGh.js";
import { _ as __unplugin_components_7$1, a as __unplugin_components_8 } from "./EdStages-NkJQJXq7.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
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
  __name: "business-continuity",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({ title: "Business Continuity & Disaster Recovery Policy · Internal Policies" });
    const sections = [
      { id: "context", label: "Context & role" },
      { id: "scope", label: "Scope & dependencies" },
      { id: "infrastructure", label: "Infrastructure DR" },
      { id: "operational", label: "Operational support" },
      { id: "metrics", label: "Policy & recovery metrics" },
      { id: "testing", label: "Testing & maintenance" },
      { id: "crisis", label: "Crisis management" },
      { id: "communication", label: "Communication plan" },
      { id: "glossary", label: "Glossary" }
    ];
    const meta = [
      { label: "Applies to", value: "Nebras" },
      { label: "Classification", value: "Restricted" },
      { label: "Version", value: "1.0 · Sep 2024" }
    ];
    const keyNums = [
      { value: "1", unit: "hr", label: "Recovery Time Objective (Tier 1 systems)" },
      { value: "1", unit: "hr", label: "Recovery Point Objective (Tier 1 systems)" },
      { value: "<30", unit: "min", label: "CBUAE notification of a Level 1 incident" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdBackStrip = __unplugin_components_0;
      const _component_EdHero = __unplugin_components_0$1;
      const _component_EdInPageNav = __unplugin_components_2;
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdBullets = __unplugin_components_5;
      const _component_EdNote = __unplugin_components_7;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdStages = __unplugin_components_7$1;
      const _component_EdStage = __unplugin_components_8;
      const _component_EdRelatedCards = __unplugin_components_6;
      const _component_EdRelatedCard = __unplugin_components_7$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-page" }, _attrs))} data-v-db1e14c0>`);
      _push(ssrRenderComponent(_component_EdBackStrip, {
        href: "/internal/policies/",
        text: "All policies"
      }, null, _parent));
      _push(ssrRenderComponent(_component_EdHero, {
        eyebrow: "Internal · Restricted",
        "eyebrow-color": "var(--at-blue)",
        title: "Business Continuity & Disaster Recovery Policy",
        meta,
        lede: "Nebras Open Finance is the central operational entity for the UAE Open Finance Framework and the <strong>single point of governance</strong> for the CBUAE Open Finance program. This policy establishes the Business Continuity Management and Disaster Recovery framework that ensures the timely recovery of critical services so that Nebras’s central role never becomes a single point of failure for the ecosystem.",
        "key-nums": keyNums
      }, null, _parent));
      _push(ssrRenderComponent(_component_EdInPageNav, { sections }, null, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "context",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Introduction & context",
        title: "Nebras as the single point of governance",
        lede: "Nebras Open Finance is an essential component of the CBUAE’s Financial Infrastructure Transformation (FIT) Program and acts as the central operational entity for the UAE Open Finance Framework — encompassing critical functions that ensure the framework’s security, stability, and regulatory compliance.",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-db1e14c0${_scopeId}>Purpose of this document</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-db1e14c0${_scopeId2}><strong data-v-db1e14c0${_scopeId2}>Policy statement</strong> — formally establishes the Business Continuity Management (BCM) and Disaster Recovery (DR) policies, mandating a structured, proactive, and tested approach to operational risk and the rapid resumption of critical services following any disruption, regardless of cause (technical failure, cyber-attack, or physical disaster).</li><li data-v-db1e14c0${_scopeId2}><strong data-v-db1e14c0${_scopeId2}>Regulatory compliance</strong> — defines Nebras’s compliance with the CBUAE Open Finance Regulation (OFR) and Operational Risk Standards (Article 7), including documented BCP/DR plans, Business Impact Analysis (BIA), and defined Recovery Time Objectives (RTOs) and Recovery Point Objectives (RPOs).</li><li data-v-db1e14c0${_scopeId2}><strong data-v-db1e14c0${_scopeId2}>Strategic resilience plan</strong> — provides the actionable BCP and DRP, with defined procedures, activation criteria, and system-specific redundancy, failover, and recovery strategies for core platforms.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Policy statement"),
                      createTextVNode(" — formally establishes the Business Continuity Management (BCM) and Disaster Recovery (DR) policies, mandating a structured, proactive, and tested approach to operational risk and the rapid resumption of critical services following any disruption, regardless of cause (technical failure, cyber-attack, or physical disaster).")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Regulatory compliance"),
                      createTextVNode(" — defines Nebras’s compliance with the CBUAE Open Finance Regulation (OFR) and Operational Risk Standards (Article 7), including documented BCP/DR plans, Business Impact Analysis (BIA), and defined Recovery Time Objectives (RTOs) and Recovery Point Objectives (RPOs).")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Strategic resilience plan"),
                      createTextVNode(" — provides the actionable BCP and DRP, with defined procedures, activation criteria, and system-specific redundancy, failover, and recovery strategies for core platforms.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-db1e14c0${_scopeId}>Core functions managed by Nebras</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-db1e14c0${_scopeId2}><strong data-v-db1e14c0${_scopeId2}>Operator of the Central API Hub (Ozone)</strong> — the centralized platform providing the single, standardised gateway for all Open Finance communication between LFIs and TPPs. Failure of the API Hub directly halts all data sharing and payment initiation services across the entire UAE Open Finance network.</li><li data-v-db1e14c0${_scopeId2}><strong data-v-db1e14c0${_scopeId2}>Administrator of the Trust Framework (Raidiam)</strong> — governs the ecosystem’s identity and security layer, managing the Participant Directory, issuance and revocation of digital certificates (PKI), and enforcement of security profiles and authentication standards (e.g. mTLS). Failure compromises the fundamental security and trust model.</li><li data-v-db1e14c0${_scopeId2}><strong data-v-db1e14c0${_scopeId2}>Oversight of common infrastructural services</strong> — consent management (AlTareq), plus service assurance, reporting, and dispute resolution through tools such as Jira and PowerBI.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Operator of the Central API Hub (Ozone)"),
                      createTextVNode(" — the centralized platform providing the single, standardised gateway for all Open Finance communication between LFIs and TPPs. Failure of the API Hub directly halts all data sharing and payment initiation services across the entire UAE Open Finance network.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Administrator of the Trust Framework (Raidiam)"),
                      createTextVNode(" — governs the ecosystem’s identity and security layer, managing the Participant Directory, issuance and revocation of digital certificates (PKI), and enforcement of security profiles and authentication standards (e.g. mTLS). Failure compromises the fundamental security and trust model.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Oversight of common infrastructural services"),
                      createTextVNode(" — consent management (AlTareq), plus service assurance, reporting, and dispute resolution through tools such as Jira and PowerBI.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` A disruption to Nebras’s services constitutes a systemic operational risk to the UAE’s financial sector. The BCP/DR Plan therefore treats all Nebras-managed components as <strong data-v-db1e14c0${_scopeId2}>Tier 1 Critical Systems</strong>, requiring the most stringent RTOs and RPOs to safeguard the continuity of the national Open Finance platform. `);
                } else {
                  return [
                    createTextVNode(" A disruption to Nebras’s services constitutes a systemic operational risk to the UAE’s financial sector. The BCP/DR Plan therefore treats all Nebras-managed components as "),
                    createVNode("strong", null, "Tier 1 Critical Systems"),
                    createTextVNode(", requiring the most stringent RTOs and RPOs to safeguard the continuity of the national Open Finance platform. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, "Purpose of this document"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Policy statement"),
                    createTextVNode(" — formally establishes the Business Continuity Management (BCM) and Disaster Recovery (DR) policies, mandating a structured, proactive, and tested approach to operational risk and the rapid resumption of critical services following any disruption, regardless of cause (technical failure, cyber-attack, or physical disaster).")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Regulatory compliance"),
                    createTextVNode(" — defines Nebras’s compliance with the CBUAE Open Finance Regulation (OFR) and Operational Risk Standards (Article 7), including documented BCP/DR plans, Business Impact Analysis (BIA), and defined Recovery Time Objectives (RTOs) and Recovery Point Objectives (RPOs).")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Strategic resilience plan"),
                    createTextVNode(" — provides the actionable BCP and DRP, with defined procedures, activation criteria, and system-specific redundancy, failover, and recovery strategies for core platforms.")
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "Core functions managed by Nebras"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Operator of the Central API Hub (Ozone)"),
                    createTextVNode(" — the centralized platform providing the single, standardised gateway for all Open Finance communication between LFIs and TPPs. Failure of the API Hub directly halts all data sharing and payment initiation services across the entire UAE Open Finance network.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Administrator of the Trust Framework (Raidiam)"),
                    createTextVNode(" — governs the ecosystem’s identity and security layer, managing the Participant Directory, issuance and revocation of digital certificates (PKI), and enforcement of security profiles and authentication standards (e.g. mTLS). Failure compromises the fundamental security and trust model.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Oversight of common infrastructural services"),
                    createTextVNode(" — consent management (AlTareq), plus service assurance, reporting, and dispute resolution through tools such as Jira and PowerBI.")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, null, {
                default: withCtx(() => [
                  createTextVNode(" A disruption to Nebras’s services constitutes a systemic operational risk to the UAE’s financial sector. The BCP/DR Plan therefore treats all Nebras-managed components as "),
                  createVNode("strong", null, "Tier 1 Critical Systems"),
                  createTextVNode(", requiring the most stringent RTOs and RPOs to safeguard the continuity of the national Open Finance platform. ")
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
        eyebrow: "Scope of the plan",
        title: "Critical assets and dependencies",
        lede: "The scope is defined by a comprehensive Business Impact Analysis (BIA), encompassing all systems, processes, and resources that, if disrupted, would critically impair Nebras’s function as the Open Finance ecosystem manager. It is divided into three core areas.",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-db1e14c0${_scopeId}>Core Open Finance infrastructure (technology scope)</h3><p data-v-db1e14c0${_scopeId}>Mission-critical systems responsible for data flow, security, and connectivity. Disruption constitutes a Level 1 Critical Incident.</p>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-db1e14c0${_scopeId2}><strong data-v-db1e14c0${_scopeId2}>Ozone API Hub environment</strong> — API gateway and traffic management (routing, throttling, and security policy enforcement); the consent management system (creation, storage, enforcement, and revocation of consumer consent records); and the API Hub databases (configurations, auditing logs, and performance metrics).</li><li data-v-db1e14c0${_scopeId2}><strong data-v-db1e14c0${_scopeId2}>Raidiam Trust Framework environment</strong> — the Trust Registry / Participant Directory of licensed and certified LFIs and TPPs; the Public Key Infrastructure (PKI) components issuing, managing, and revoking transport, signing, and encryption certificates for secure mTLS communication; and the onboarding and certification platforms.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Ozone API Hub environment"),
                      createTextVNode(" — API gateway and traffic management (routing, throttling, and security policy enforcement); the consent management system (creation, storage, enforcement, and revocation of consumer consent records); and the API Hub databases (configurations, auditing logs, and performance metrics).")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Raidiam Trust Framework environment"),
                      createTextVNode(" — the Trust Registry / Participant Directory of licensed and certified LFIs and TPPs; the Public Key Infrastructure (PKI) components issuing, managing, and revoking transport, signing, and encryption certificates for secure mTLS communication; and the onboarding and certification platforms.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-db1e14c0${_scopeId}>Operational support processes (business process scope)</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-db1e14c0${_scopeId2}><strong data-v-db1e14c0${_scopeId2}>Service desk and incident management (via Jira)</strong> — major incident triage, ecosystem query management, and Knowledge Base access.</li><li data-v-db1e14c0${_scopeId2}><strong data-v-db1e14c0${_scopeId2}>Dispute and case management (via Jira Portal)</strong> — the regulated workflow for logging, tracking, adjudicating, and reporting disputes, maintaining an immutable audit trail.</li><li data-v-db1e14c0${_scopeId2}><strong data-v-db1e14c0${_scopeId2}>Reporting and analytics (via PowerBI)</strong> — critical regulatory reporting to the CBUAE and internal operational metrics for real-time risk monitoring.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Service desk and incident management (via Jira)"),
                      createTextVNode(" — major incident triage, ecosystem query management, and Knowledge Base access.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Dispute and case management (via Jira Portal)"),
                      createTextVNode(" — the regulated workflow for logging, tracking, adjudicating, and reporting disputes, maintaining an immutable audit trail.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Reporting and analytics (via PowerBI)"),
                      createTextVNode(" — critical regulatory reporting to the CBUAE and internal operational metrics for real-time risk monitoring.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-db1e14c0${_scopeId}>Personnel, facilities, and vendor management (resource &amp; third-party scope)</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-db1e14c0${_scopeId2}><strong data-v-db1e14c0${_scopeId2}>Key personnel</strong> — the Crisis Management Team (CMT), Technical Recovery Teams (TRTs), and Critical Business Function owners, with up-to-date contact information.</li><li data-v-db1e14c0${_scopeId2}><strong data-v-db1e14c0${_scopeId2}>Alternative facilities</strong> — command and control centres (physical and virtual) should the primary Nebras office or data centre become inaccessible.</li><li data-v-db1e14c0${_scopeId2}><strong data-v-db1e14c0${_scopeId2}>Critical third-party vendors</strong> — documented recovery plans for key providers, including the primary infrastructure providers (Ozone, Raidiam) and hosting providers, enforcing the outsourced BCP/DR requirements stipulated by the CBUAE.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Key personnel"),
                      createTextVNode(" — the Crisis Management Team (CMT), Technical Recovery Teams (TRTs), and Critical Business Function owners, with up-to-date contact information.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Alternative facilities"),
                      createTextVNode(" — command and control centres (physical and virtual) should the primary Nebras office or data centre become inaccessible.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Critical third-party vendors"),
                      createTextVNode(" — documented recovery plans for key providers, including the primary infrastructure providers (Ozone, Raidiam) and hosting providers, enforcing the outsourced BCP/DR requirements stipulated by the CBUAE.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, "Core Open Finance infrastructure (technology scope)"),
              createVNode("p", null, "Mission-critical systems responsible for data flow, security, and connectivity. Disruption constitutes a Level 1 Critical Incident."),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Ozone API Hub environment"),
                    createTextVNode(" — API gateway and traffic management (routing, throttling, and security policy enforcement); the consent management system (creation, storage, enforcement, and revocation of consumer consent records); and the API Hub databases (configurations, auditing logs, and performance metrics).")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Raidiam Trust Framework environment"),
                    createTextVNode(" — the Trust Registry / Participant Directory of licensed and certified LFIs and TPPs; the Public Key Infrastructure (PKI) components issuing, managing, and revoking transport, signing, and encryption certificates for secure mTLS communication; and the onboarding and certification platforms.")
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "Operational support processes (business process scope)"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Service desk and incident management (via Jira)"),
                    createTextVNode(" — major incident triage, ecosystem query management, and Knowledge Base access.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Dispute and case management (via Jira Portal)"),
                    createTextVNode(" — the regulated workflow for logging, tracking, adjudicating, and reporting disputes, maintaining an immutable audit trail.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Reporting and analytics (via PowerBI)"),
                    createTextVNode(" — critical regulatory reporting to the CBUAE and internal operational metrics for real-time risk monitoring.")
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "Personnel, facilities, and vendor management (resource & third-party scope)"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Key personnel"),
                    createTextVNode(" — the Crisis Management Team (CMT), Technical Recovery Teams (TRTs), and Critical Business Function owners, with up-to-date contact information.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Alternative facilities"),
                    createTextVNode(" — command and control centres (physical and virtual) should the primary Nebras office or data centre become inaccessible.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Critical third-party vendors"),
                    createTextVNode(" — documented recovery plans for key providers, including the primary infrastructure providers (Ozone, Raidiam) and hosting providers, enforcing the outsourced BCP/DR requirements stipulated by the CBUAE.")
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
        id: "infrastructure",
        num: "03",
        color: "var(--at-blue)",
        eyebrow: "Core infrastructure DR strategy",
        title: "Immediate failover and geographical redundancy",
        lede: "The strategy for core infrastructure is based on immediate failover and geographical redundancy to maintain continuous service for data sharing and transaction initiation, adhering to stringent CBUAE operational resilience requirements.",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-db1e14c0${_scopeId}>Ozone API Hub management (API gateway &amp; consent)</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-db1e14c0${_scopeId2}><strong data-v-db1e14c0${_scopeId2}>API gateway availability</strong> — active-active / active-passive architecture across a multi-zone / multi-region cloud deployment, using a Global Traffic Manager (GTM) or equivalent DNS failover to immediately redirect TPP traffic on detection of a primary site failure. <strong data-v-db1e14c0${_scopeId2}>RTO target: &lt;1 Hour</strong> (with seamless failover targeting seconds). <strong data-v-db1e14c0${_scopeId2}>RPO target: 1 Hour</strong>.</li><li data-v-db1e14c0${_scopeId2}><strong data-v-db1e14c0${_scopeId2}>Consent management database</strong> — synchronous data replication for all consent records with automated database clustering and rapid leader election. Primary system failure triggers automated cutover to the read-replica database within minutes, updating API Hub configurations instantly.</li><li data-v-db1e14c0${_scopeId2}><strong data-v-db1e14c0${_scopeId2}>API metrics &amp; auditing logs</strong> — stream processing or asynchronous replication to a separate, resilient data lake; recovery time is less critical, but the integrity and completeness of historical data are essential for post-incident analysis and regulatory reporting.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "API gateway availability"),
                      createTextVNode(" — active-active / active-passive architecture across a multi-zone / multi-region cloud deployment, using a Global Traffic Manager (GTM) or equivalent DNS failover to immediately redirect TPP traffic on detection of a primary site failure. "),
                      createVNode("strong", null, "RTO target: <1 Hour"),
                      createTextVNode(" (with seamless failover targeting seconds). "),
                      createVNode("strong", null, "RPO target: 1 Hour"),
                      createTextVNode(".")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Consent management database"),
                      createTextVNode(" — synchronous data replication for all consent records with automated database clustering and rapid leader election. Primary system failure triggers automated cutover to the read-replica database within minutes, updating API Hub configurations instantly.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "API metrics & auditing logs"),
                      createTextVNode(" — stream processing or asynchronous replication to a separate, resilient data lake; recovery time is less critical, but the integrity and completeness of historical data are essential for post-incident analysis and regulatory reporting.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-db1e14c0${_scopeId}>Raidiam Trust Framework oversight (identity &amp; security)</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-db1e14c0${_scopeId2}><strong data-v-db1e14c0${_scopeId2}>Mirrored infrastructure</strong> — a fully functional, hot-standby copy of the Trust Framework, including the Certificate Authority (CA) and Directory, maintained in an alternate region. <strong data-v-db1e14c0${_scopeId2}>RTO target: &lt;1 Hour</strong>. <strong data-v-db1e14c0${_scopeId2}>RPO target: 1 Hour</strong>.</li><li data-v-db1e14c0${_scopeId2}><strong data-v-db1e14c0${_scopeId2}>PKI resilience</strong> — private keys for the CA root and intermediate certificates stored in geographically separated, highly secured Hardware Security Modules (HSMs), with robust key recovery and backup procedures.</li><li data-v-db1e14c0${_scopeId2}><strong data-v-db1e14c0${_scopeId2}>Manual fallback kit</strong> — a documented, pre-approved manual process and toolkit (offline certificate request forms, secure vault for manual credentials) to handle critical TPP or LFI onboarding and renewal tasks during an extended outage. The manual process is initiated only after a Level 1 Incident is declared and automated recovery has failed.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Mirrored infrastructure"),
                      createTextVNode(" — a fully functional, hot-standby copy of the Trust Framework, including the Certificate Authority (CA) and Directory, maintained in an alternate region. "),
                      createVNode("strong", null, "RTO target: <1 Hour"),
                      createTextVNode(". "),
                      createVNode("strong", null, "RPO target: 1 Hour"),
                      createTextVNode(".")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "PKI resilience"),
                      createTextVNode(" — private keys for the CA root and intermediate certificates stored in geographically separated, highly secured Hardware Security Modules (HSMs), with robust key recovery and backup procedures.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Manual fallback kit"),
                      createTextVNode(" — a documented, pre-approved manual process and toolkit (offline certificate request forms, secure vault for manual credentials) to handle critical TPP or LFI onboarding and renewal tasks during an extended outage. The manual process is initiated only after a Level 1 Incident is declared and automated recovery has failed.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, "Ozone API Hub management (API gateway & consent)"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "API gateway availability"),
                    createTextVNode(" — active-active / active-passive architecture across a multi-zone / multi-region cloud deployment, using a Global Traffic Manager (GTM) or equivalent DNS failover to immediately redirect TPP traffic on detection of a primary site failure. "),
                    createVNode("strong", null, "RTO target: <1 Hour"),
                    createTextVNode(" (with seamless failover targeting seconds). "),
                    createVNode("strong", null, "RPO target: 1 Hour"),
                    createTextVNode(".")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Consent management database"),
                    createTextVNode(" — synchronous data replication for all consent records with automated database clustering and rapid leader election. Primary system failure triggers automated cutover to the read-replica database within minutes, updating API Hub configurations instantly.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "API metrics & auditing logs"),
                    createTextVNode(" — stream processing or asynchronous replication to a separate, resilient data lake; recovery time is less critical, but the integrity and completeness of historical data are essential for post-incident analysis and regulatory reporting.")
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "Raidiam Trust Framework oversight (identity & security)"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Mirrored infrastructure"),
                    createTextVNode(" — a fully functional, hot-standby copy of the Trust Framework, including the Certificate Authority (CA) and Directory, maintained in an alternate region. "),
                    createVNode("strong", null, "RTO target: <1 Hour"),
                    createTextVNode(". "),
                    createVNode("strong", null, "RPO target: 1 Hour"),
                    createTextVNode(".")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "PKI resilience"),
                    createTextVNode(" — private keys for the CA root and intermediate certificates stored in geographically separated, highly secured Hardware Security Modules (HSMs), with robust key recovery and backup procedures.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Manual fallback kit"),
                    createTextVNode(" — a documented, pre-approved manual process and toolkit (offline certificate request forms, secure vault for manual credentials) to handle critical TPP or LFI onboarding and renewal tasks during an extended outage. The manual process is initiated only after a Level 1 Incident is declared and automated recovery has failed.")
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
        id: "operational",
        num: "04",
        color: "var(--at-blue-deep)",
        eyebrow: "Operational support systems",
        title: "Continuity for the service desk and reporting",
        lede: "Continuity strategies for the operational tools that support communication, compliance, and resolution within the Nebras ecosystem.",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-db1e14c0${_scopeId}>Service Desk (Jira Service Management)</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-db1e14c0${_scopeId2}><strong data-v-db1e14c0${_scopeId2}>Incident logging (major incidents)</strong> — a dedicated Emergency Communications Channel (secure email, dedicated incident platform) bypasses the primary service desk tool. <strong data-v-db1e14c0${_scopeId2}>RTO: immediate fallback (within 30 minutes)</strong>; all Severity 1/2 incidents logged on the alternate system with timestamps and communicated immediately to the CBUAE and impacted parties. <strong data-v-db1e14c0${_scopeId2}>RPO: 1 Hour</strong>.</li><li data-v-db1e14c0${_scopeId2}><strong data-v-db1e14c0${_scopeId2}>Dispute management</strong> — a regulated workflow backup using standardized physical/digital forms to capture all mandated dispute information. <strong data-v-db1e14c0${_scopeId2}>RPO: 1 Hour</strong>; on recovery, the Data Migration Team imports manual logs to restore the official regulatory audit trail.</li><li data-v-db1e14c0${_scopeId2}><strong data-v-db1e14c0${_scopeId2}>Change management</strong> — an emergency change protocol with a restricted Outage Change Approval Board (CAB) and minimal quorum for Emergency Changes only. <strong data-v-db1e14c0${_scopeId2}>RTO: 30 Mins for approval</strong>; normal changes are halted and emergency changes logged manually.</li><li data-v-db1e14c0${_scopeId2}><strong data-v-db1e14c0${_scopeId2}>Billing and settlement</strong> — scheduled offsite backups (e.g. daily) of the invoicing and fee-calculation database, accessed independently of the primary environment. <strong data-v-db1e14c0${_scopeId2}>RPO: max 48 Hours</strong>; billing cycles may be delayed but must not be cancelled, with a manual calculation spreadsheet prepared to bridge the outage.</li><li data-v-db1e14c0${_scopeId2}><strong data-v-db1e14c0${_scopeId2}>Knowledge Base</strong> — a static, read-only copy of all critical documentation (API specifications, BCP contacts, operational guidelines) on a resilient web server separate from the corporate environment. <strong data-v-db1e14c0${_scopeId2}>RTO: 4 Hours</strong>.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Incident logging (major incidents)"),
                      createTextVNode(" — a dedicated Emergency Communications Channel (secure email, dedicated incident platform) bypasses the primary service desk tool. "),
                      createVNode("strong", null, "RTO: immediate fallback (within 30 minutes)"),
                      createTextVNode("; all Severity 1/2 incidents logged on the alternate system with timestamps and communicated immediately to the CBUAE and impacted parties. "),
                      createVNode("strong", null, "RPO: 1 Hour"),
                      createTextVNode(".")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Dispute management"),
                      createTextVNode(" — a regulated workflow backup using standardized physical/digital forms to capture all mandated dispute information. "),
                      createVNode("strong", null, "RPO: 1 Hour"),
                      createTextVNode("; on recovery, the Data Migration Team imports manual logs to restore the official regulatory audit trail.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Change management"),
                      createTextVNode(" — an emergency change protocol with a restricted Outage Change Approval Board (CAB) and minimal quorum for Emergency Changes only. "),
                      createVNode("strong", null, "RTO: 30 Mins for approval"),
                      createTextVNode("; normal changes are halted and emergency changes logged manually.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Billing and settlement"),
                      createTextVNode(" — scheduled offsite backups (e.g. daily) of the invoicing and fee-calculation database, accessed independently of the primary environment. "),
                      createVNode("strong", null, "RPO: max 48 Hours"),
                      createTextVNode("; billing cycles may be delayed but must not be cancelled, with a manual calculation spreadsheet prepared to bridge the outage.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Knowledge Base"),
                      createTextVNode(" — a static, read-only copy of all critical documentation (API specifications, BCP contacts, operational guidelines) on a resilient web server separate from the corporate environment. "),
                      createVNode("strong", null, "RTO: 4 Hours"),
                      createTextVNode(".")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-db1e14c0${_scopeId}>Reporting and Analytics (PowerBI)</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-db1e14c0${_scopeId2}><strong data-v-db1e14c0${_scopeId2}>Critical regulatory reports</strong> — all data sources (Ozone logs, Jira data) maintain direct, secure SQL access points for a small number of authorised Power BI analysts. <strong data-v-db1e14c0${_scopeId2}>RTO: 24 Hours</strong>; analysts use pre-written, tested SQL scripts to generate the core required metrics (API uptime, incident volume) directly from the replicated operational databases, bypassing the PowerBI service if necessary.</li><li data-v-db1e14c0${_scopeId2}><strong data-v-db1e14c0${_scopeId2}>Data integrity</strong> — data integrity of the Ozone and Trust Framework logging tables is critical, and their RPO takes precedence over PowerBI dashboard availability. Recovery of the source databases is the top priority before restoring reporting services.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Critical regulatory reports"),
                      createTextVNode(" — all data sources (Ozone logs, Jira data) maintain direct, secure SQL access points for a small number of authorised Power BI analysts. "),
                      createVNode("strong", null, "RTO: 24 Hours"),
                      createTextVNode("; analysts use pre-written, tested SQL scripts to generate the core required metrics (API uptime, incident volume) directly from the replicated operational databases, bypassing the PowerBI service if necessary.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Data integrity"),
                      createTextVNode(" — data integrity of the Ozone and Trust Framework logging tables is critical, and their RPO takes precedence over PowerBI dashboard availability. Recovery of the source databases is the top priority before restoring reporting services.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, "Service Desk (Jira Service Management)"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Incident logging (major incidents)"),
                    createTextVNode(" — a dedicated Emergency Communications Channel (secure email, dedicated incident platform) bypasses the primary service desk tool. "),
                    createVNode("strong", null, "RTO: immediate fallback (within 30 minutes)"),
                    createTextVNode("; all Severity 1/2 incidents logged on the alternate system with timestamps and communicated immediately to the CBUAE and impacted parties. "),
                    createVNode("strong", null, "RPO: 1 Hour"),
                    createTextVNode(".")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Dispute management"),
                    createTextVNode(" — a regulated workflow backup using standardized physical/digital forms to capture all mandated dispute information. "),
                    createVNode("strong", null, "RPO: 1 Hour"),
                    createTextVNode("; on recovery, the Data Migration Team imports manual logs to restore the official regulatory audit trail.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Change management"),
                    createTextVNode(" — an emergency change protocol with a restricted Outage Change Approval Board (CAB) and minimal quorum for Emergency Changes only. "),
                    createVNode("strong", null, "RTO: 30 Mins for approval"),
                    createTextVNode("; normal changes are halted and emergency changes logged manually.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Billing and settlement"),
                    createTextVNode(" — scheduled offsite backups (e.g. daily) of the invoicing and fee-calculation database, accessed independently of the primary environment. "),
                    createVNode("strong", null, "RPO: max 48 Hours"),
                    createTextVNode("; billing cycles may be delayed but must not be cancelled, with a manual calculation spreadsheet prepared to bridge the outage.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Knowledge Base"),
                    createTextVNode(" — a static, read-only copy of all critical documentation (API specifications, BCP contacts, operational guidelines) on a resilient web server separate from the corporate environment. "),
                    createVNode("strong", null, "RTO: 4 Hours"),
                    createTextVNode(".")
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "Reporting and Analytics (PowerBI)"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Critical regulatory reports"),
                    createTextVNode(" — all data sources (Ozone logs, Jira data) maintain direct, secure SQL access points for a small number of authorised Power BI analysts. "),
                    createVNode("strong", null, "RTO: 24 Hours"),
                    createTextVNode("; analysts use pre-written, tested SQL scripts to generate the core required metrics (API uptime, incident volume) directly from the replicated operational databases, bypassing the PowerBI service if necessary.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Data integrity"),
                    createTextVNode(" — data integrity of the Ozone and Trust Framework logging tables is critical, and their RPO takes precedence over PowerBI dashboard availability. Recovery of the source databases is the top priority before restoring reporting services.")
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
        id: "metrics",
        num: "05",
        color: "var(--at-navy)",
        eyebrow: "Policy statement & recovery metrics",
        title: "RTO and RPO commitments",
        lede: "Nebras Open Finance is committed to maintaining continuous operations and providing essential services to the CBUAE Open Finance ecosystem. This BCP/DR Policy ensures the timely and orderly recovery of critical technology and business functions within defined RTOs and RPOs, minimizing impact on ecosystem participants and maintaining compliance with CBUAE regulations.",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-db1e14c0${_scopeId}>Key recovery metrics (RTO / RPO)</h3><div class="rto-table-wrap" data-v-db1e14c0${_scopeId}><table class="rto-table" data-v-db1e14c0${_scopeId}><thead data-v-db1e14c0${_scopeId}><tr data-v-db1e14c0${_scopeId}><th data-v-db1e14c0${_scopeId}>Business function</th><th data-v-db1e14c0${_scopeId}>RTO (time to recover)</th><th data-v-db1e14c0${_scopeId}>RPO (max data loss)</th><th data-v-db1e14c0${_scopeId}>Justification</th></tr></thead><tbody data-v-db1e14c0${_scopeId}><tr data-v-db1e14c0${_scopeId}><td data-v-db1e14c0${_scopeId}>Ozone API Hub access</td><td data-v-db1e14c0${_scopeId}>1 Hour</td><td data-v-db1e14c0${_scopeId}>1 Hour</td><td data-v-db1e14c0${_scopeId}>Direct impact on financial transaction flow and data sharing for the entire ecosystem. Systemic risk.</td></tr><tr data-v-db1e14c0${_scopeId}><td data-v-db1e14c0${_scopeId}>Raidiam Trust Registry / PKI</td><td data-v-db1e14c0${_scopeId}>1 Hour</td><td data-v-db1e14c0${_scopeId}>1 Hour</td><td data-v-db1e14c0${_scopeId}>Absolute requirement for security validation (digital certificates, TPP credentials). Integrity is non-negotiable.</td></tr><tr data-v-db1e14c0${_scopeId}><td data-v-db1e14c0${_scopeId}>Major incident tracking</td><td data-v-db1e14c0${_scopeId}>1 Hour</td><td data-v-db1e14c0${_scopeId}>1 Hour</td><td data-v-db1e14c0${_scopeId}>Rapid notification and tracking are regulatory mandates.</td></tr><tr data-v-db1e14c0${_scopeId}><td data-v-db1e14c0${_scopeId}>Dispute management (logging)</td><td data-v-db1e14c0${_scopeId}>&lt;2 Hours</td><td data-v-db1e14c0${_scopeId}>2 Hour</td><td data-v-db1e14c0${_scopeId}>Requires preserving the legal audit trail of all consumer/participant disputes.</td></tr><tr data-v-db1e14c0${_scopeId}><td data-v-db1e14c0${_scopeId}>Non-critical internal systems</td><td data-v-db1e14c0${_scopeId}>24–48 Hours</td><td data-v-db1e14c0${_scopeId}>Up to 24 Hours</td><td data-v-db1e14c0${_scopeId}>Internal administrative systems with no direct real-time external dependency.</td></tr></tbody></table></div>`);
            _push2(ssrRenderComponent(_component_EdNote, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` As backup occurs every hour, the RPO for Tier 1 systems is a maximum of one hour, while the RTO target for the Ozone API Hub and Raidiam Trust Framework is under one hour with failover targeting seconds. `);
                } else {
                  return [
                    createTextVNode(" As backup occurs every hour, the RPO for Tier 1 systems is a maximum of one hour, while the RTO target for the Ozone API Hub and Raidiam Trust Framework is under one hour with failover targeting seconds. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-db1e14c0${_scopeId}>Business Impact Analysis (BIA) and risk assessment</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-db1e14c0${_scopeId2}>The BIA identifies and prioritises critical services based on the impact of non-availability over a predefined time frame. Beyond internal impact-based prioritisation, critical services are classified against national criticality considerations — financial system stability, national economic continuity, public confidence and customer protection, and interdependencies with financial sector participants and national critical infrastructure.</p><p data-v-db1e14c0${_scopeId2}>Services with a systemic or sector-wide impact are designated <strong data-v-db1e14c0${_scopeId2}>Nationally Critical Services</strong> and are subject to enhanced recovery prioritisation, stricter recovery objectives, and more frequent testing, in alignment with the CBUAE and national resilience frameworks guided by the National Emergency Crisis and Disaster Management Authority (NCEMA). The determination of Maximum Tolerable Period of Disruption (MTPD), RTO, and RPO is based on impact thresholds derived from the Impact Rating Matrix and the national criticality classification, and values are reviewed and approved by the relevant Department Head and the CEO.</p>`);
                } else {
                  return [
                    createVNode("p", null, "The BIA identifies and prioritises critical services based on the impact of non-availability over a predefined time frame. Beyond internal impact-based prioritisation, critical services are classified against national criticality considerations — financial system stability, national economic continuity, public confidence and customer protection, and interdependencies with financial sector participants and national critical infrastructure."),
                    createVNode("p", null, [
                      createTextVNode("Services with a systemic or sector-wide impact are designated "),
                      createVNode("strong", null, "Nationally Critical Services"),
                      createTextVNode(" and are subject to enhanced recovery prioritisation, stricter recovery objectives, and more frequent testing, in alignment with the CBUAE and national resilience frameworks guided by the National Emergency Crisis and Disaster Management Authority (NCEMA). The determination of Maximum Tolerable Period of Disruption (MTPD), RTO, and RPO is based on impact thresholds derived from the Impact Rating Matrix and the national criticality classification, and values are reviewed and approved by the relevant Department Head and the CEO.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, "Key recovery metrics (RTO / RPO)"),
              createVNode("div", { class: "rto-table-wrap" }, [
                createVNode("table", { class: "rto-table" }, [
                  createVNode("thead", null, [
                    createVNode("tr", null, [
                      createVNode("th", null, "Business function"),
                      createVNode("th", null, "RTO (time to recover)"),
                      createVNode("th", null, "RPO (max data loss)"),
                      createVNode("th", null, "Justification")
                    ])
                  ]),
                  createVNode("tbody", null, [
                    createVNode("tr", null, [
                      createVNode("td", null, "Ozone API Hub access"),
                      createVNode("td", null, "1 Hour"),
                      createVNode("td", null, "1 Hour"),
                      createVNode("td", null, "Direct impact on financial transaction flow and data sharing for the entire ecosystem. Systemic risk.")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "Raidiam Trust Registry / PKI"),
                      createVNode("td", null, "1 Hour"),
                      createVNode("td", null, "1 Hour"),
                      createVNode("td", null, "Absolute requirement for security validation (digital certificates, TPP credentials). Integrity is non-negotiable.")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "Major incident tracking"),
                      createVNode("td", null, "1 Hour"),
                      createVNode("td", null, "1 Hour"),
                      createVNode("td", null, "Rapid notification and tracking are regulatory mandates.")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "Dispute management (logging)"),
                      createVNode("td", null, "<2 Hours"),
                      createVNode("td", null, "2 Hour"),
                      createVNode("td", null, "Requires preserving the legal audit trail of all consumer/participant disputes.")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "Non-critical internal systems"),
                      createVNode("td", null, "24–48 Hours"),
                      createVNode("td", null, "Up to 24 Hours"),
                      createVNode("td", null, "Internal administrative systems with no direct real-time external dependency.")
                    ])
                  ])
                ])
              ]),
              createVNode(_component_EdNote, null, {
                default: withCtx(() => [
                  createTextVNode(" As backup occurs every hour, the RPO for Tier 1 systems is a maximum of one hour, while the RTO target for the Ozone API Hub and Raidiam Trust Framework is under one hour with failover targeting seconds. ")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Business Impact Analysis (BIA) and risk assessment"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("p", null, "The BIA identifies and prioritises critical services based on the impact of non-availability over a predefined time frame. Beyond internal impact-based prioritisation, critical services are classified against national criticality considerations — financial system stability, national economic continuity, public confidence and customer protection, and interdependencies with financial sector participants and national critical infrastructure."),
                  createVNode("p", null, [
                    createTextVNode("Services with a systemic or sector-wide impact are designated "),
                    createVNode("strong", null, "Nationally Critical Services"),
                    createTextVNode(" and are subject to enhanced recovery prioritisation, stricter recovery objectives, and more frequent testing, in alignment with the CBUAE and national resilience frameworks guided by the National Emergency Crisis and Disaster Management Authority (NCEMA). The determination of Maximum Tolerable Period of Disruption (MTPD), RTO, and RPO is based on impact thresholds derived from the Impact Rating Matrix and the national criticality classification, and values are reviewed and approved by the relevant Department Head and the CEO.")
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
        id: "testing",
        num: "06",
        color: "var(--at-teal-deep)",
        eyebrow: "Testing & maintenance",
        title: "Keeping the plan viable",
        lede: "A structured programme of review, testing, and training ensures the BCP/DR Plan remains effective and up to date.",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-db1e14c0${_scopeId2}><strong data-v-db1e14c0${_scopeId2}>Policy / plan review</strong> — conducted annually, reviewed and approved by the Nebras Board and submitted to the CBUAE’s supervisory function for oversight.</li><li data-v-db1e14c0${_scopeId2}><strong data-v-db1e14c0${_scopeId2}>Full BCP/DR test (scenario-based)</strong> — at least annually, including a simulated primary site failover for the Ozone API Hub and Raidiam Trust Framework, testing the full cycle from incident declaration to manual fallback (Jira/dispute) and system recovery.</li><li data-v-db1e14c0${_scopeId2}><strong data-v-db1e14c0${_scopeId2}>Component / failover testing</strong> — quarterly; technical teams test the automated failover mechanisms (GTM/DNS, database replication) for key systems.</li><li data-v-db1e14c0${_scopeId2}><strong data-v-db1e14c0${_scopeId2}>Staff training</strong> — bi-annually; mandatory training for the CMT and all relevant operational staff on activation protocols and manual procedures.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Policy / plan review"),
                      createTextVNode(" — conducted annually, reviewed and approved by the Nebras Board and submitted to the CBUAE’s supervisory function for oversight.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Full BCP/DR test (scenario-based)"),
                      createTextVNode(" — at least annually, including a simulated primary site failover for the Ozone API Hub and Raidiam Trust Framework, testing the full cycle from incident declaration to manual fallback (Jira/dispute) and system recovery.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Component / failover testing"),
                      createTextVNode(" — quarterly; technical teams test the automated failover mechanisms (GTM/DNS, database replication) for key systems.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Staff training"),
                      createTextVNode(" — bi-annually; mandatory training for the CMT and all relevant operational staff on activation protocols and manual procedures.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-db1e14c0${_scopeId2}>In addition to standard BCM exercises, Nebras conducts scenario-based integrated testing incorporating both Business Continuity and Cyber Incident Response capabilities. These exercises simulate realistic and evolving threat scenarios — including ransomware attacks, data breaches, system outages, and critical third-party service disruptions — and are conducted at least annually across cross-functional departments. Assurance over third-party and vendor BCM capabilities may include joint exercises, independent attestations, or periodic reviews. Outcomes are formally documented, with identified gaps tracked through to remediation. These scenario-based integrated exercises are mandatory and form a core component of the organization’s cyber resilience and national-level risk preparedness.</p>`);
                } else {
                  return [
                    createVNode("p", null, "In addition to standard BCM exercises, Nebras conducts scenario-based integrated testing incorporating both Business Continuity and Cyber Incident Response capabilities. These exercises simulate realistic and evolving threat scenarios — including ransomware attacks, data breaches, system outages, and critical third-party service disruptions — and are conducted at least annually across cross-functional departments. Assurance over third-party and vendor BCM capabilities may include joint exercises, independent attestations, or periodic reviews. Outcomes are formally documented, with identified gaps tracked through to remediation. These scenario-based integrated exercises are mandatory and form a core component of the organization’s cyber resilience and national-level risk preparedness.")
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
                    createVNode("strong", null, "Policy / plan review"),
                    createTextVNode(" — conducted annually, reviewed and approved by the Nebras Board and submitted to the CBUAE’s supervisory function for oversight.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Full BCP/DR test (scenario-based)"),
                    createTextVNode(" — at least annually, including a simulated primary site failover for the Ozone API Hub and Raidiam Trust Framework, testing the full cycle from incident declaration to manual fallback (Jira/dispute) and system recovery.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Component / failover testing"),
                    createTextVNode(" — quarterly; technical teams test the automated failover mechanisms (GTM/DNS, database replication) for key systems.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Staff training"),
                    createTextVNode(" — bi-annually; mandatory training for the CMT and all relevant operational staff on activation protocols and manual procedures.")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("p", null, "In addition to standard BCM exercises, Nebras conducts scenario-based integrated testing incorporating both Business Continuity and Cyber Incident Response capabilities. These exercises simulate realistic and evolving threat scenarios — including ransomware attacks, data breaches, system outages, and critical third-party service disruptions — and are conducted at least annually across cross-functional departments. Assurance over third-party and vendor BCM capabilities may include joint exercises, independent attestations, or periodic reviews. Outcomes are formally documented, with identified gaps tracked through to remediation. These scenario-based integrated exercises are mandatory and form a core component of the organization’s cyber resilience and national-level risk preparedness.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "crisis",
        num: "07",
        color: "var(--at-teal)",
        eyebrow: "Crisis management & governance",
        title: "Activation, command, and recovery teams",
        lede: "The command and control framework for declaring, escalating, managing, and resolving a crisis impacting the Nebras Open Finance infrastructure.",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-db1e14c0${_scopeId}>Activation criteria (triggers)</h3><p data-v-db1e14c0${_scopeId}>The BCP/DR Plan is formally activated by the CMT Lead upon confirmation of any event meeting the following criteria.</p>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-db1e14c0${_scopeId2}><strong data-v-db1e14c0${_scopeId2}>Level 1 Incident</strong> — any disruption causing or projected to cause outage or degradation of the Ozone API Hub or Raidiam Trust Framework exceeding the target RTO (1 hour), or where initial failover procedures have failed.</li><li data-v-db1e14c0${_scopeId2}><strong data-v-db1e14c0${_scopeId2}>Systemic security breach</strong> — confirmation of a successful cyber-attack, data breach, or compromise of any critical Open Finance component (API Hub, Trust Registry, or consent data).</li><li data-v-db1e14c0${_scopeId2}><strong data-v-db1e14c0${_scopeId2}>Physical unavailability</strong> — primary facility or data centre inaccessible due to an external event (fire, flood, civil disruption).</li><li data-v-db1e14c0${_scopeId2}><strong data-v-db1e14c0${_scopeId2}>CBUAE mandate</strong> — direct instruction from the Central Bank of the UAE to activate contingency measures.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Level 1 Incident"),
                      createTextVNode(" — any disruption causing or projected to cause outage or degradation of the Ozone API Hub or Raidiam Trust Framework exceeding the target RTO (1 hour), or where initial failover procedures have failed.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Systemic security breach"),
                      createTextVNode(" — confirmation of a successful cyber-attack, data breach, or compromise of any critical Open Finance component (API Hub, Trust Registry, or consent data).")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Physical unavailability"),
                      createTextVNode(" — primary facility or data centre inaccessible due to an external event (fire, flood, civil disruption).")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "CBUAE mandate"),
                      createTextVNode(" — direct instruction from the Central Bank of the UAE to activate contingency measures.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-db1e14c0${_scopeId}>Crisis Management Team (CMT) structure</h3>`);
            _push2(ssrRenderComponent(_component_EdStages, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "01",
                    title: "CMT Lead (CEO / COO)",
                    "num-color": "var(--at-teal)"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-db1e14c0${_scopeId3}>Overall strategy and CBUAE relationship. Declares and de-declares the incident, authorises emergency funding and external resources, and manages strategic communications with the CBUAE and the Nebras Board.</p>`);
                      } else {
                        return [
                          createVNode("p", null, "Overall strategy and CBUAE relationship. Declares and de-declares the incident, authorises emergency funding and external resources, and manages strategic communications with the CBUAE and the Nebras Board.")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "02",
                    title: "Incident Manager (Head of Operations / CTO)",
                    "num-color": "var(--at-teal)"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-db1e14c0${_scopeId3}>Operational execution and recovery. Manages the incident lifecycle, chairs status calls, coordinates the Technical Recovery Teams, and reports to the CMT Lead.</p>`);
                      } else {
                        return [
                          createVNode("p", null, "Operational execution and recovery. Manages the incident lifecycle, chairs status calls, coordinates the Technical Recovery Teams, and reports to the CMT Lead.")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "03",
                    title: "Communication Lead (Head of PR / Compliance)",
                    "num-color": "var(--at-teal)"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-db1e14c0${_scopeId3}>Stakeholder messaging and integrity. Drafts, gains approval for, and issues all internal and external communication bulletins, ensuring regulatory notification is timely and compliant.</p>`);
                      } else {
                        return [
                          createVNode("p", null, "Stakeholder messaging and integrity. Drafts, gains approval for, and issues all internal and external communication bulletins, ensuring regulatory notification is timely and compliant.")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "04",
                    title: "Technical Recovery Lead (Head of IT / Infra)",
                    "num-color": "var(--at-teal)"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-db1e14c0${_scopeId3}>Infrastructure remediation. Directs all technical recovery efforts (failover, system restoral, patch management) for the Ozone API Hub and Trust Framework.</p>`);
                      } else {
                        return [
                          createVNode("p", null, "Infrastructure remediation. Directs all technical recovery efforts (failover, system restoral, patch management) for the Ozone API Hub and Trust Framework.")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "05",
                    title: "Compliance & Risk Lead (CRO / Legal Counsel)",
                    "num-color": "var(--at-teal)"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-db1e14c0${_scopeId3}>Legal and regulatory compliance. Ensures all recovery actions adhere to CBUAE regulations and manages the evidence trail, data privacy requirements, and dispute resolution continuity.</p>`);
                      } else {
                        return [
                          createVNode("p", null, "Legal and regulatory compliance. Ensures all recovery actions adhere to CBUAE regulations and manages the evidence trail, data privacy requirements, and dispute resolution continuity.")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_EdStage, {
                      num: "01",
                      title: "CMT Lead (CEO / COO)",
                      "num-color": "var(--at-teal)"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, "Overall strategy and CBUAE relationship. Declares and de-declares the incident, authorises emergency funding and external resources, and manages strategic communications with the CBUAE and the Nebras Board.")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_EdStage, {
                      num: "02",
                      title: "Incident Manager (Head of Operations / CTO)",
                      "num-color": "var(--at-teal)"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, "Operational execution and recovery. Manages the incident lifecycle, chairs status calls, coordinates the Technical Recovery Teams, and reports to the CMT Lead.")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_EdStage, {
                      num: "03",
                      title: "Communication Lead (Head of PR / Compliance)",
                      "num-color": "var(--at-teal)"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, "Stakeholder messaging and integrity. Drafts, gains approval for, and issues all internal and external communication bulletins, ensuring regulatory notification is timely and compliant.")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_EdStage, {
                      num: "04",
                      title: "Technical Recovery Lead (Head of IT / Infra)",
                      "num-color": "var(--at-teal)"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, "Infrastructure remediation. Directs all technical recovery efforts (failover, system restoral, patch management) for the Ozone API Hub and Trust Framework.")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_EdStage, {
                      num: "05",
                      title: "Compliance & Risk Lead (CRO / Legal Counsel)",
                      "num-color": "var(--at-teal)"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, "Legal and regulatory compliance. Ensures all recovery actions adhere to CBUAE regulations and manages the evidence trail, data privacy requirements, and dispute resolution continuity.")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-db1e14c0${_scopeId}>Technical Recovery Team (TRT) structure</h3><p data-v-db1e14c0${_scopeId}>The TRT executes the DR strategy and reports directly to the Incident Manager.</p>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-db1e14c0${_scopeId2}><strong data-v-db1e14c0${_scopeId2}>TRT 1 — API &amp; Application Team</strong> — the Ozone API Hub, application-level data integrity, consent manager, and service restoration.</li><li data-v-db1e14c0${_scopeId2}><strong data-v-db1e14c0${_scopeId2}>TRT 2 — Infrastructure &amp; Security Team</strong> — the Raidiam Trust Framework, PKI / certificate validation, cloud and hosting infrastructure, and network connectivity.</li><li data-v-db1e14c0${_scopeId2}><strong data-v-db1e14c0${_scopeId2}>TRT 3 — Data &amp; Reporting Team</strong> — restoring database integrity, recovering audit logs, and preparing regulatory reports (RTO/RPO validation).</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "TRT 1 — API & Application Team"),
                      createTextVNode(" — the Ozone API Hub, application-level data integrity, consent manager, and service restoration.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "TRT 2 — Infrastructure & Security Team"),
                      createTextVNode(" — the Raidiam Trust Framework, PKI / certificate validation, cloud and hosting infrastructure, and network connectivity.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "TRT 3 — Data & Reporting Team"),
                      createTextVNode(" — restoring database integrity, recovering audit logs, and preparing regulatory reports (RTO/RPO validation).")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, "Activation criteria (triggers)"),
              createVNode("p", null, "The BCP/DR Plan is formally activated by the CMT Lead upon confirmation of any event meeting the following criteria."),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Level 1 Incident"),
                    createTextVNode(" — any disruption causing or projected to cause outage or degradation of the Ozone API Hub or Raidiam Trust Framework exceeding the target RTO (1 hour), or where initial failover procedures have failed.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Systemic security breach"),
                    createTextVNode(" — confirmation of a successful cyber-attack, data breach, or compromise of any critical Open Finance component (API Hub, Trust Registry, or consent data).")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Physical unavailability"),
                    createTextVNode(" — primary facility or data centre inaccessible due to an external event (fire, flood, civil disruption).")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "CBUAE mandate"),
                    createTextVNode(" — direct instruction from the Central Bank of the UAE to activate contingency measures.")
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "Crisis Management Team (CMT) structure"),
              createVNode(_component_EdStages, null, {
                default: withCtx(() => [
                  createVNode(_component_EdStage, {
                    num: "01",
                    title: "CMT Lead (CEO / COO)",
                    "num-color": "var(--at-teal)"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, "Overall strategy and CBUAE relationship. Declares and de-declares the incident, authorises emergency funding and external resources, and manages strategic communications with the CBUAE and the Nebras Board.")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_EdStage, {
                    num: "02",
                    title: "Incident Manager (Head of Operations / CTO)",
                    "num-color": "var(--at-teal)"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, "Operational execution and recovery. Manages the incident lifecycle, chairs status calls, coordinates the Technical Recovery Teams, and reports to the CMT Lead.")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_EdStage, {
                    num: "03",
                    title: "Communication Lead (Head of PR / Compliance)",
                    "num-color": "var(--at-teal)"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, "Stakeholder messaging and integrity. Drafts, gains approval for, and issues all internal and external communication bulletins, ensuring regulatory notification is timely and compliant.")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_EdStage, {
                    num: "04",
                    title: "Technical Recovery Lead (Head of IT / Infra)",
                    "num-color": "var(--at-teal)"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, "Infrastructure remediation. Directs all technical recovery efforts (failover, system restoral, patch management) for the Ozone API Hub and Trust Framework.")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_EdStage, {
                    num: "05",
                    title: "Compliance & Risk Lead (CRO / Legal Counsel)",
                    "num-color": "var(--at-teal)"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, "Legal and regulatory compliance. Ensures all recovery actions adhere to CBUAE regulations and manages the evidence trail, data privacy requirements, and dispute resolution continuity.")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode("h3", null, "Technical Recovery Team (TRT) structure"),
              createVNode("p", null, "The TRT executes the DR strategy and reports directly to the Incident Manager."),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "TRT 1 — API & Application Team"),
                    createTextVNode(" — the Ozone API Hub, application-level data integrity, consent manager, and service restoration.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "TRT 2 — Infrastructure & Security Team"),
                    createTextVNode(" — the Raidiam Trust Framework, PKI / certificate validation, cloud and hosting infrastructure, and network connectivity.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "TRT 3 — Data & Reporting Team"),
                    createTextVNode(" — restoring database integrity, recovering audit logs, and preparing regulatory reports (RTO/RPO validation).")
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
        id: "communication",
        num: "08",
        color: "var(--at-gold)",
        eyebrow: "Crisis communication plan",
        title: "Notification protocols",
        lede: "Given Nebras’s central role, the communication plan is its most critical external-facing BCP component, designed to maintain market confidence and regulatory transparency. Nebras adheres to a zero-tolerance policy for delays in notifying the CBUAE of a Level 1 Critical Incident.",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-db1e14c0${_scopeId}>Regulatory notification protocol</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-db1e14c0${_scopeId2}><strong data-v-db1e14c0${_scopeId2}>Central Bank of the UAE (CBUAE)</strong> — immediate upon incident declaration, via dedicated secure line (primary) followed by secure email for formal documentation. <strong data-v-db1e14c0${_scopeId2}>RTO for initial notification: &lt;30 Minutes</strong>.</li><li data-v-db1e14c0${_scopeId2}><strong data-v-db1e14c0${_scopeId2}>Nebras Board</strong> — immediate upon Level 1 declaration, via phone call and secure email from the CMT Lead. <strong data-v-db1e14c0${_scopeId2}>RTO for initial notification: &lt;60 Minutes</strong>.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Central Bank of the UAE (CBUAE)"),
                      createTextVNode(" — immediate upon incident declaration, via dedicated secure line (primary) followed by secure email for formal documentation. "),
                      createVNode("strong", null, "RTO for initial notification: <30 Minutes"),
                      createTextVNode(".")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Nebras Board"),
                      createTextVNode(" — immediate upon Level 1 declaration, via phone call and secure email from the CMT Lead. "),
                      createVNode("strong", null, "RTO for initial notification: <60 Minutes"),
                      createTextVNode(".")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-db1e14c0${_scopeId}>External communication (ecosystem participants)</h3><p data-v-db1e14c0${_scopeId}>Communication to LFIs and TPPs must be fact-based and provide actionable advice.</p>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-db1e14c0${_scopeId2}><strong data-v-db1e14c0${_scopeId2}>LFIs (banks / insurers)</strong> — nature of the incident, estimated restoration time, confirmed impact on services (data sharing / payments), and specific manual workarounds. Delivered via the dedicated TPP/LFI Status Portal (primary) and automated alert email/SMS, every 30–60 minutes until stable, then hourly.</li><li data-v-db1e14c0${_scopeId2}><strong data-v-db1e14c0${_scopeId2}>TPPs</strong> — as for LFIs, focusing on API Hub status and any changes to the Trust Framework environment (e.g. certificate validation issues), on the same channels and cadence.</li><li data-v-db1e14c0${_scopeId2}><strong data-v-db1e14c0${_scopeId2}>Public / media</strong> — confirmation of an operational issue, commitment to recovery, reassurance that consent data is safe, and reference to the official status page, via the official Nebras website and designated media spokesperson, only when the incident escalates or public speculation requires a response.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "LFIs (banks / insurers)"),
                      createTextVNode(" — nature of the incident, estimated restoration time, confirmed impact on services (data sharing / payments), and specific manual workarounds. Delivered via the dedicated TPP/LFI Status Portal (primary) and automated alert email/SMS, every 30–60 minutes until stable, then hourly.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "TPPs"),
                      createTextVNode(" — as for LFIs, focusing on API Hub status and any changes to the Trust Framework environment (e.g. certificate validation issues), on the same channels and cadence.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Public / media"),
                      createTextVNode(" — confirmation of an operational issue, commitment to recovery, reassurance that consent data is safe, and reference to the official status page, via the official Nebras website and designated media spokesperson, only when the incident escalates or public speculation requires a response.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-db1e14c0${_scopeId}>Internal communication</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-db1e14c0${_scopeId2}><strong data-v-db1e14c0${_scopeId2}>Staff safety</strong> — immediate notification of any physical threat (evacuation procedures).</li><li data-v-db1e14c0${_scopeId2}><strong data-v-db1e14c0${_scopeId2}>All-staff updates</strong> — regular concise updates from the CMT confirming service status and providing guidance on handling external queries, under a “single source of truth” principle.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Staff safety"),
                      createTextVNode(" — immediate notification of any physical threat (evacuation procedures).")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "All-staff updates"),
                      createTextVNode(" — regular concise updates from the CMT confirming service status and providing guidance on handling external queries, under a “single source of truth” principle.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, "Regulatory notification protocol"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Central Bank of the UAE (CBUAE)"),
                    createTextVNode(" — immediate upon incident declaration, via dedicated secure line (primary) followed by secure email for formal documentation. "),
                    createVNode("strong", null, "RTO for initial notification: <30 Minutes"),
                    createTextVNode(".")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Nebras Board"),
                    createTextVNode(" — immediate upon Level 1 declaration, via phone call and secure email from the CMT Lead. "),
                    createVNode("strong", null, "RTO for initial notification: <60 Minutes"),
                    createTextVNode(".")
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "External communication (ecosystem participants)"),
              createVNode("p", null, "Communication to LFIs and TPPs must be fact-based and provide actionable advice."),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "LFIs (banks / insurers)"),
                    createTextVNode(" — nature of the incident, estimated restoration time, confirmed impact on services (data sharing / payments), and specific manual workarounds. Delivered via the dedicated TPP/LFI Status Portal (primary) and automated alert email/SMS, every 30–60 minutes until stable, then hourly.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "TPPs"),
                    createTextVNode(" — as for LFIs, focusing on API Hub status and any changes to the Trust Framework environment (e.g. certificate validation issues), on the same channels and cadence.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Public / media"),
                    createTextVNode(" — confirmation of an operational issue, commitment to recovery, reassurance that consent data is safe, and reference to the official status page, via the official Nebras website and designated media spokesperson, only when the incident escalates or public speculation requires a response.")
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "Internal communication"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Staff safety"),
                    createTextVNode(" — immediate notification of any physical threat (evacuation procedures).")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "All-staff updates"),
                    createTextVNode(" — regular concise updates from the CMT confirming service status and providing guidance on handling external queries, under a “single source of truth” principle.")
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
        id: "glossary",
        num: "09",
        color: "var(--at-blue)",
        eyebrow: "Glossary",
        title: "Key terms",
        tone: "cream",
        narrow: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-db1e14c0${_scopeId2}><strong data-v-db1e14c0${_scopeId2}>BCP</strong> — Business Continuity Plan; the overall documented framework for maintaining critical business functions following a disruption.</li><li data-v-db1e14c0${_scopeId2}><strong data-v-db1e14c0${_scopeId2}>DR</strong> — Disaster Recovery; the subset of BCP focused on restoring the technology infrastructure (IT systems, applications, data, and connectivity) after a disruption.</li><li data-v-db1e14c0${_scopeId2}><strong data-v-db1e14c0${_scopeId2}>CMT</strong> — Crisis Management Team; the senior leadership group responsible for declaring the crisis, providing strategic direction, and overseeing response and communication.</li><li data-v-db1e14c0${_scopeId2}><strong data-v-db1e14c0${_scopeId2}>TRT</strong> — Technical Recovery Team; the operational staff and technical experts responsible for executing the DR procedures and technical restoration of systems.</li><li data-v-db1e14c0${_scopeId2}><strong data-v-db1e14c0${_scopeId2}>RTO</strong> — Recovery Time Objective; the maximum acceptable duration within which a critical business function or system must be restored after a disruption.</li><li data-v-db1e14c0${_scopeId2}><strong data-v-db1e14c0${_scopeId2}>RPO</strong> — Recovery Point Objective; the maximum acceptable age of data lost during a disruption.</li><li data-v-db1e14c0${_scopeId2}><strong data-v-db1e14c0${_scopeId2}>Ozone API Hub</strong> — the central API gateway and technical platform managed by Nebras that facilitates all API calls, consent management, and data flow between LFIs and TPPs.</li><li data-v-db1e14c0${_scopeId2}><strong data-v-db1e14c0${_scopeId2}>Raidiam Trust Framework</strong> — the underlying security and identity component (Trust Registry, PKI, certificate validation) that authenticates and authorizes all participants and transactions.</li><li data-v-db1e14c0${_scopeId2}><strong data-v-db1e14c0${_scopeId2}>Service degradation</strong> — a state where a critical system is operational but performing below its expected service level (e.g. high latency, partial failure, or reduced throughput).</li><li data-v-db1e14c0${_scopeId2}><strong data-v-db1e14c0${_scopeId2}>LFI / TPP</strong> — Licensed Financial Institutions (Data Holders) and Third-Party Providers (Data Users) participating in the Open Finance ecosystem via Nebras’s infrastructure.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "BCP"),
                      createTextVNode(" — Business Continuity Plan; the overall documented framework for maintaining critical business functions following a disruption.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "DR"),
                      createTextVNode(" — Disaster Recovery; the subset of BCP focused on restoring the technology infrastructure (IT systems, applications, data, and connectivity) after a disruption.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "CMT"),
                      createTextVNode(" — Crisis Management Team; the senior leadership group responsible for declaring the crisis, providing strategic direction, and overseeing response and communication.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "TRT"),
                      createTextVNode(" — Technical Recovery Team; the operational staff and technical experts responsible for executing the DR procedures and technical restoration of systems.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "RTO"),
                      createTextVNode(" — Recovery Time Objective; the maximum acceptable duration within which a critical business function or system must be restored after a disruption.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "RPO"),
                      createTextVNode(" — Recovery Point Objective; the maximum acceptable age of data lost during a disruption.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Ozone API Hub"),
                      createTextVNode(" — the central API gateway and technical platform managed by Nebras that facilitates all API calls, consent management, and data flow between LFIs and TPPs.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Raidiam Trust Framework"),
                      createTextVNode(" — the underlying security and identity component (Trust Registry, PKI, certificate validation) that authenticates and authorizes all participants and transactions.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Service degradation"),
                      createTextVNode(" — a state where a critical system is operational but performing below its expected service level (e.g. high latency, partial failure, or reduced throughput).")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "LFI / TPP"),
                      createTextVNode(" — Licensed Financial Institutions (Data Holders) and Third-Party Providers (Data Users) participating in the Open Finance ecosystem via Nebras’s infrastructure.")
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
                    createVNode("strong", null, "BCP"),
                    createTextVNode(" — Business Continuity Plan; the overall documented framework for maintaining critical business functions following a disruption.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "DR"),
                    createTextVNode(" — Disaster Recovery; the subset of BCP focused on restoring the technology infrastructure (IT systems, applications, data, and connectivity) after a disruption.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "CMT"),
                    createTextVNode(" — Crisis Management Team; the senior leadership group responsible for declaring the crisis, providing strategic direction, and overseeing response and communication.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "TRT"),
                    createTextVNode(" — Technical Recovery Team; the operational staff and technical experts responsible for executing the DR procedures and technical restoration of systems.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "RTO"),
                    createTextVNode(" — Recovery Time Objective; the maximum acceptable duration within which a critical business function or system must be restored after a disruption.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "RPO"),
                    createTextVNode(" — Recovery Point Objective; the maximum acceptable age of data lost during a disruption.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Ozone API Hub"),
                    createTextVNode(" — the central API gateway and technical platform managed by Nebras that facilitates all API calls, consent management, and data flow between LFIs and TPPs.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Raidiam Trust Framework"),
                    createTextVNode(" — the underlying security and identity component (Trust Registry, PKI, certificate validation) that authenticates and authorizes all participants and transactions.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Service degradation"),
                    createTextVNode(" — a state where a critical system is operational but performing below its expected service level (e.g. high latency, partial failure, or reduced throughput).")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "LFI / TPP"),
                    createTextVNode(" — Licensed Financial Institutions (Data Holders) and Third-Party Providers (Data Users) participating in the Open Finance ecosystem via Nebras’s infrastructure.")
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
              desc: "The risk framework under which systemic operational and continuity risks are assessed and escalated."
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRelatedCard, {
              href: "/internal/policies/information-security",
              category: "Risk, Security & Compliance",
              title: "Information Security Policy",
              desc: "The security controls protecting the API Hub, Trust Framework, and consent data referenced throughout this plan."
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdRelatedCard, {
                href: "/internal/policies/enterprise-risk-management",
                category: "Risk, Security & Compliance",
                title: "Enterprise Risk Management Policy",
                desc: "The risk framework under which systemic operational and continuity risks are assessed and escalated."
              }),
              createVNode(_component_EdRelatedCard, {
                href: "/internal/policies/information-security",
                category: "Risk, Security & Compliance",
                title: "Information Security Policy",
                desc: "The security controls protecting the API Hub, Trust Framework, and consent data referenced throughout this plan."
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/internal/policies/business-continuity.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const businessContinuity = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-db1e14c0"]]);
export {
  businessContinuity as default
};
