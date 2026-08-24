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
  __name: "information-security",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({ title: "Information Security Policy · Internal Policies" });
    const sections = [
      { id: "governance", label: "Governance & roles" },
      { id: "strategy", label: "Strategy & standards" },
      { id: "acceptable-use", label: "Acceptable use" },
      { id: "email-internet", label: "Email & internet" },
      { id: "access", label: "Access & passwords" },
      { id: "project", label: "Secure delivery" },
      { id: "classification", label: "Classification & handling" },
      { id: "data-protection", label: "Data protection" },
      { id: "third-party", label: "Third-party security" },
      { id: "risk-incident", label: "Risk, incident & awareness" }
    ];
    const meta = [
      { label: "Applies to", value: "Nebras" },
      { label: "Classification", value: "Restricted" },
      { label: "Version", value: "Jun 2024" }
    ];
    const keyNums = [
      { value: "72", unit: "h", label: "Regulatory breach notification window" },
      { value: "2", unit: "× / yr", label: "Minimum Trust Framework PKI key rotation" },
      { value: "12", unit: "char", label: "Minimum domain password length" }
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-page" }, _attrs))} data-v-641d9aa6>`);
      _push(ssrRenderComponent(_component_EdBackStrip, {
        href: "/internal/policies/",
        text: "All policies"
      }, null, _parent));
      _push(ssrRenderComponent(_component_EdHero, {
        eyebrow: "Internal · Restricted",
        "eyebrow-color": "var(--at-blue)",
        title: "Information Security Policy",
        meta,
        lede: "Nebras is committed to protecting the <strong>confidentiality, integrity, and availability</strong> of the information and system assets that underpin the UAE Open Finance common infrastructure. This policy sets the mandatory framework of principles, standards, and controls that governs information security across all Nebras functions, staff, contractors, vendors, and third parties.",
        "key-nums": keyNums
      }, null, _parent));
      _push(ssrRenderComponent(_component_EdInPageNav, { sections }, null, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "governance",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Governance & roles",
        title: "Purpose, scope, and accountability",
        lede: "The policy establishes Nebras’s approach to protecting information and system assets — whether stored in software, hardware, transmitted over networks, or held in physical form — and communicates the organisation’s commitment to safeguarding sensitive data across all of its operations.",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-641d9aa6${_scopeId}>Scope and audience</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-641d9aa6${_scopeId2}>Covers the entire IT environment owned or operated by Nebras — documentation, personnel, hardware (servers, virtual workloads, cloud, endpoints, network and wireless devices), software, and information — including assets operated by an outsourced provider on Nebras’s behalf.</li><li data-v-641d9aa6${_scopeId2}>Applies to all users of information assets: permanent and temporary staff, interns, consultants, contractors, vendors, business partners, and authorised third parties, regardless of geography.</li><li data-v-641d9aa6${_scopeId2}>All users MUST read, understand, and comply; where anything is unclear they SHOULD consult the Operations and Risk Head or an authorised delegate.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Covers the entire IT environment owned or operated by Nebras — documentation, personnel, hardware (servers, virtual workloads, cloud, endpoints, network and wireless devices), software, and information — including assets operated by an outsourced provider on Nebras’s behalf."),
                    createVNode("li", null, "Applies to all users of information assets: permanent and temporary staff, interns, consultants, contractors, vendors, business partners, and authorised third parties, regardless of geography."),
                    createVNode("li", null, "All users MUST read, understand, and comply; where anything is unclear they SHOULD consult the Operations and Risk Head or an authorised delegate.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-641d9aa6${_scopeId}>Objectives</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-641d9aa6${_scopeId2}>Identify all information assets and manage their risks per the Nebras Risk Appetite and Tolerance Policy.</li><li data-v-641d9aa6${_scopeId2}>Protect operating systems, networks and communication protocols, and custom or off-the-shelf applications with appropriate solutions.</li><li data-v-641d9aa6${_scopeId2}>Maintain backup, vulnerability, and patch-management processes for all critical information and known vulnerabilities.</li><li data-v-641d9aa6${_scopeId2}>Achieve compliance through periodic audits, technical assessments, and business continuity tests, with periodic review of user privilege and activity.</li><li data-v-641d9aa6${_scopeId2}>Identify, contain, eradicate, recover from, and report information security incidents through the incident management process.</li><li data-v-641d9aa6${_scopeId2}>Dispose of assets per the Information Classification, Handling, Labelling and Exchange Standard, and deliver security training on joining and annually.</li><li data-v-641d9aa6${_scopeId2}>Rotate PKI keys within the Trust Framework at least twice a year.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Identify all information assets and manage their risks per the Nebras Risk Appetite and Tolerance Policy."),
                    createVNode("li", null, "Protect operating systems, networks and communication protocols, and custom or off-the-shelf applications with appropriate solutions."),
                    createVNode("li", null, "Maintain backup, vulnerability, and patch-management processes for all critical information and known vulnerabilities."),
                    createVNode("li", null, "Achieve compliance through periodic audits, technical assessments, and business continuity tests, with periodic review of user privilege and activity."),
                    createVNode("li", null, "Identify, contain, eradicate, recover from, and report information security incidents through the incident management process."),
                    createVNode("li", null, "Dispose of assets per the Information Classification, Handling, Labelling and Exchange Standard, and deliver security training on joining and annually."),
                    createVNode("li", null, "Rotate PKI keys within the Trust Framework at least twice a year.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-641d9aa6${_scopeId}>Roles and responsibilities</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-641d9aa6${_scopeId2}><strong data-v-641d9aa6${_scopeId2}>Board of Managers</strong> — accepts overall accountability for information security and oversees a properly managed and implemented security programme and its risk reporting.</li><li data-v-641d9aa6${_scopeId2}><strong data-v-641d9aa6${_scopeId2}>Chief Executive Officer</strong> — endorses overall responsibility, enforces organisation-wide implementation, and oversees compliance and accountability.</li><li data-v-641d9aa6${_scopeId2}><strong data-v-641d9aa6${_scopeId2}>Risk and Compliance Committee</strong> — supervises implementation, conducts periodic reviews of regulations, risk assessments, audit and incident reports, approves policies, and promotes security culture.</li><li data-v-641d9aa6${_scopeId2}><strong data-v-641d9aa6${_scopeId2}>Operations Head</strong> — ensures staff understand their responsibilities, determines asset criticality and business risk, oversees reporting to the CEO and Committee, and endorses policies. The (outsourced) Information Security Head is accountable to this role.</li><li data-v-641d9aa6${_scopeId2}><strong data-v-641d9aa6${_scopeId2}>Information Security Head</strong> — plans, implements, and maintains the security management system; runs risk assessments aligned to Enterprise Risk Management; selects and implements controls; conducts validations and security testing; and delivers the awareness programme.</li><li data-v-641d9aa6${_scopeId2}><strong data-v-641d9aa6${_scopeId2}>Employees</strong> — participate in awareness training, apply best practice, and report incidents, breaches, or suspicious activity.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Board of Managers"),
                      createTextVNode(" — accepts overall accountability for information security and oversees a properly managed and implemented security programme and its risk reporting.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Chief Executive Officer"),
                      createTextVNode(" — endorses overall responsibility, enforces organisation-wide implementation, and oversees compliance and accountability.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Risk and Compliance Committee"),
                      createTextVNode(" — supervises implementation, conducts periodic reviews of regulations, risk assessments, audit and incident reports, approves policies, and promotes security culture.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Operations Head"),
                      createTextVNode(" — ensures staff understand their responsibilities, determines asset criticality and business risk, oversees reporting to the CEO and Committee, and endorses policies. The (outsourced) Information Security Head is accountable to this role.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Information Security Head"),
                      createTextVNode(" — plans, implements, and maintains the security management system; runs risk assessments aligned to Enterprise Risk Management; selects and implements controls; conducts validations and security testing; and delivers the awareness programme.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Employees"),
                      createTextVNode(" — participate in awareness training, apply best practice, and report incidents, breaches, or suspicious activity.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-641d9aa6${_scopeId}>Compliance, exceptions, and review</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-641d9aa6${_scopeId2}>Violations are brought to the Operations Head; corrective and disciplinary action follows the severity of the incident, consistent with the HR Policy, and may involve external authorities for criminal offences.</li><li data-v-641d9aa6${_scopeId2}>All exceptions MUST be explicitly approved by the Risk and Compliance Committee, are valid for a defined period, and are reassessed and re-approved when necessary.</li><li data-v-641d9aa6${_scopeId2}>The policy is reviewed and amended at least annually — or earlier on major system change or regulatory direction — considering risk-assessment results, management review, and organisational change. The Information Security Head reports quarterly to the Committee, CEO, and Board.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Violations are brought to the Operations Head; corrective and disciplinary action follows the severity of the incident, consistent with the HR Policy, and may involve external authorities for criminal offences."),
                    createVNode("li", null, "All exceptions MUST be explicitly approved by the Risk and Compliance Committee, are valid for a defined period, and are reassessed and re-approved when necessary."),
                    createVNode("li", null, "The policy is reviewed and amended at least annually — or earlier on major system change or regulatory direction — considering risk-assessment results, management review, and organisational change. The Information Security Head reports quarterly to the Committee, CEO, and Board.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, "Scope and audience"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Covers the entire IT environment owned or operated by Nebras — documentation, personnel, hardware (servers, virtual workloads, cloud, endpoints, network and wireless devices), software, and information — including assets operated by an outsourced provider on Nebras’s behalf."),
                  createVNode("li", null, "Applies to all users of information assets: permanent and temporary staff, interns, consultants, contractors, vendors, business partners, and authorised third parties, regardless of geography."),
                  createVNode("li", null, "All users MUST read, understand, and comply; where anything is unclear they SHOULD consult the Operations and Risk Head or an authorised delegate.")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Objectives"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Identify all information assets and manage their risks per the Nebras Risk Appetite and Tolerance Policy."),
                  createVNode("li", null, "Protect operating systems, networks and communication protocols, and custom or off-the-shelf applications with appropriate solutions."),
                  createVNode("li", null, "Maintain backup, vulnerability, and patch-management processes for all critical information and known vulnerabilities."),
                  createVNode("li", null, "Achieve compliance through periodic audits, technical assessments, and business continuity tests, with periodic review of user privilege and activity."),
                  createVNode("li", null, "Identify, contain, eradicate, recover from, and report information security incidents through the incident management process."),
                  createVNode("li", null, "Dispose of assets per the Information Classification, Handling, Labelling and Exchange Standard, and deliver security training on joining and annually."),
                  createVNode("li", null, "Rotate PKI keys within the Trust Framework at least twice a year.")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Roles and responsibilities"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Board of Managers"),
                    createTextVNode(" — accepts overall accountability for information security and oversees a properly managed and implemented security programme and its risk reporting.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Chief Executive Officer"),
                    createTextVNode(" — endorses overall responsibility, enforces organisation-wide implementation, and oversees compliance and accountability.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Risk and Compliance Committee"),
                    createTextVNode(" — supervises implementation, conducts periodic reviews of regulations, risk assessments, audit and incident reports, approves policies, and promotes security culture.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Operations Head"),
                    createTextVNode(" — ensures staff understand their responsibilities, determines asset criticality and business risk, oversees reporting to the CEO and Committee, and endorses policies. The (outsourced) Information Security Head is accountable to this role.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Information Security Head"),
                    createTextVNode(" — plans, implements, and maintains the security management system; runs risk assessments aligned to Enterprise Risk Management; selects and implements controls; conducts validations and security testing; and delivers the awareness programme.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Employees"),
                    createTextVNode(" — participate in awareness training, apply best practice, and report incidents, breaches, or suspicious activity.")
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "Compliance, exceptions, and review"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Violations are brought to the Operations Head; corrective and disciplinary action follows the severity of the incident, consistent with the HR Policy, and may involve external authorities for criminal offences."),
                  createVNode("li", null, "All exceptions MUST be explicitly approved by the Risk and Compliance Committee, are valid for a defined period, and are reassessed and re-approved when necessary."),
                  createVNode("li", null, "The policy is reviewed and amended at least annually — or earlier on major system change or regulatory direction — considering risk-assessment results, management review, and organisational change. The Information Security Head reports quarterly to the Committee, CEO, and Board.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "strategy",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "Strategy & standards",
        title: "Strategic pillars and the standards framework",
        lede: "The strategy develops the people, process, and technology needed to achieve the security principles of confidentiality, integrity, availability, and non-repudiation, adopting concepts such as least privilege and segregation of duties.",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-641d9aa6${_scopeId}>Strategic pillars</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-641d9aa6${_scopeId2}><strong data-v-641d9aa6${_scopeId2}>People</strong> — understand the business and the threat landscape to inform holistic risk assessment.</li><li data-v-641d9aa6${_scopeId2}><strong data-v-641d9aa6${_scopeId2}>Process</strong> — enforce least privilege across all access.</li><li data-v-641d9aa6${_scopeId2}><strong data-v-641d9aa6${_scopeId2}>Technology</strong> — enforce segregation of duties, keeping residual risk at minimal, accepted levels.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "People"),
                      createTextVNode(" — understand the business and the threat landscape to inform holistic risk assessment.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Process"),
                      createTextVNode(" — enforce least privilege across all access.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Technology"),
                      createTextVNode(" — enforce segregation of duties, keeping residual risk at minimal, accepted levels.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-641d9aa6${_scopeId}>Supporting policies and standards</h3><p data-v-641d9aa6${_scopeId}>The following are established under this policy, drafted by the Information Security Head, reviewed by the Operations Head, endorsed by the Risk and Compliance Committee, and approved by the CEO:</p>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-641d9aa6${_scopeId2}>Acceptable Usage; Email Security; Internet Security; Password Management; Information Security Project Management; and Information Classification, Handling and Labelling standards (developed).</li><li data-v-641d9aa6${_scopeId2}>Asset Management &amp; Classification; Access Control; Physical Security; Cryptography Management; Third Party, Vendor Management &amp; Outsourcing; Configuration Management; Data Privacy; and Device &amp; Remote Access standards, plus the Risk Acceptance Form and Legal Compliance Policy.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Acceptable Usage; Email Security; Internet Security; Password Management; Information Security Project Management; and Information Classification, Handling and Labelling standards (developed)."),
                    createVNode("li", null, "Asset Management & Classification; Access Control; Physical Security; Cryptography Management; Third Party, Vendor Management & Outsourcing; Configuration Management; Data Privacy; and Device & Remote Access standards, plus the Risk Acceptance Form and Legal Compliance Policy.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<p data-v-641d9aa6${_scopeId}>The following are addressed within contractual agreements with suppliers: API Security, Network Security, Operating Systems Security, Database Security, Application Security, Cloud Security, Data Security, Vulnerability &amp; Patch Management, Incident Management, Data Backup &amp; Recovery, Change Management, and Capacity Management standards.</p>`);
          } else {
            return [
              createVNode("h3", null, "Strategic pillars"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "People"),
                    createTextVNode(" — understand the business and the threat landscape to inform holistic risk assessment.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Process"),
                    createTextVNode(" — enforce least privilege across all access.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Technology"),
                    createTextVNode(" — enforce segregation of duties, keeping residual risk at minimal, accepted levels.")
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "Supporting policies and standards"),
              createVNode("p", null, "The following are established under this policy, drafted by the Information Security Head, reviewed by the Operations Head, endorsed by the Risk and Compliance Committee, and approved by the CEO:"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Acceptable Usage; Email Security; Internet Security; Password Management; Information Security Project Management; and Information Classification, Handling and Labelling standards (developed)."),
                  createVNode("li", null, "Asset Management & Classification; Access Control; Physical Security; Cryptography Management; Third Party, Vendor Management & Outsourcing; Configuration Management; Data Privacy; and Device & Remote Access standards, plus the Risk Acceptance Form and Legal Compliance Policy.")
                ]),
                _: 1
              }),
              createVNode("p", null, "The following are addressed within contractual agreements with suppliers: API Security, Network Security, Operating Systems Security, Database Security, Application Security, Cloud Security, Data Security, Vulnerability & Patch Management, Incident Management, Data Backup & Recovery, Change Management, and Capacity Management standards.")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "acceptable-use",
        num: "03",
        color: "var(--at-blue)",
        eyebrow: "Acceptable use",
        title: "How Nebras assets may be used",
        lede: "All information assets created or stored in any system are the property of Nebras, which reserves the right to audit stored data at any time. Assets are for authorised business use only and MUST comply with applicable laws, regulations, and contractual obligations.",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-641d9aa6${_scopeId}>Computing and mobile devices</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-641d9aa6${_scopeId2}>Personal devices MUST comply with the BYOD standard; unauthorised or unlicensed software MUST NOT be installed; endpoints MUST be locked when unattended.</li><li data-v-641d9aa6${_scopeId2}>Work files MUST be stored on network shared folders, not local drives; lost or stolen devices MUST be reported to the IT Help Desk immediately.</li><li data-v-641d9aa6${_scopeId2}>Data copied to external storage requires IT, Information Security, and Data Owner approval, MUST be encrypted, and remains the user’s accountability. Nebras email or information MUST NOT be backed up to non-Nebras media or cloud.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Personal devices MUST comply with the BYOD standard; unauthorised or unlicensed software MUST NOT be installed; endpoints MUST be locked when unattended."),
                    createVNode("li", null, "Work files MUST be stored on network shared folders, not local drives; lost or stolen devices MUST be reported to the IT Help Desk immediately."),
                    createVNode("li", null, "Data copied to external storage requires IT, Information Security, and Data Owner approval, MUST be encrypted, and remains the user’s accountability. Nebras email or information MUST NOT be backed up to non-Nebras media or cloud.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-641d9aa6${_scopeId}>Internet and internal portals</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-641d9aa6${_scopeId2}>Internet access is via the Nebras network only, for business purposes, granted by role; connections MUST NOT bypass firewalls or proxy services, and all downloads are scanned at the web proxy and client.</li><li data-v-641d9aa6${_scopeId2}>“Restricted” and above information MUST NOT be posted, shared, or uploaded to the internet or social media; only authorised personnel may publish approved content.</li><li data-v-641d9aa6${_scopeId2}>Remote workers MUST NOT use public Wi-Fi for secret, confidential, or restricted information; internal portal activity may be monitored.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Internet access is via the Nebras network only, for business purposes, granted by role; connections MUST NOT bypass firewalls or proxy services, and all downloads are scanned at the web proxy and client."),
                    createVNode("li", null, "“Restricted” and above information MUST NOT be posted, shared, or uploaded to the internet or social media; only authorised personnel may publish approved content."),
                    createVNode("li", null, "Remote workers MUST NOT use public Wi-Fi for secret, confidential, or restricted information; internal portal activity may be monitored.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-641d9aa6${_scopeId}>Email and social media</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-641d9aa6${_scopeId2}>Personal and business email MUST be kept separate; auto-forwarding official mail to public accounts is prohibited; recipients MUST be verified before sending sensitive information.</li><li data-v-641d9aa6${_scopeId2}>Restricted and above information sent by email MUST be encrypted, and confidential/restricted attachments password-protected or encrypted; accounts require multi-factor authentication.</li><li data-v-641d9aa6${_scopeId2}>Employees and third parties MUST NOT share Nebras financial data, proprietary or classified information, or issue statements on behalf of Nebras over social media; official accounts have a single custodian and credentials are never shared.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Personal and business email MUST be kept separate; auto-forwarding official mail to public accounts is prohibited; recipients MUST be verified before sending sensitive information."),
                    createVNode("li", null, "Restricted and above information sent by email MUST be encrypted, and confidential/restricted attachments password-protected or encrypted; accounts require multi-factor authentication."),
                    createVNode("li", null, "Employees and third parties MUST NOT share Nebras financial data, proprietary or classified information, or issue statements on behalf of Nebras over social media; official accounts have a single custodian and credentials are never shared.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-641d9aa6${_scopeId}>Clear desk, clear screen, and user responsibility</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-641d9aa6${_scopeId2}>Desks are cleared when unattended; classified media are locked away; documents of Restricted or above are removed from printers and whiteboards immediately; privacy filters are used on shared floors.</li><li data-v-641d9aa6${_scopeId2}>Endpoints lock automatically after 10 minutes of inactivity; users lock screens when away (Windows Key + L).</li><li data-v-641d9aa6${_scopeId2}>Users MUST NOT bypass controls, share credentials or active sessions, or tamper with audit logs or evidence, and MUST report incidents and weaknesses to the IT Help Desk or Information Security Team.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Desks are cleared when unattended; classified media are locked away; documents of Restricted or above are removed from printers and whiteboards immediately; privacy filters are used on shared floors."),
                    createVNode("li", null, "Endpoints lock automatically after 10 minutes of inactivity; users lock screens when away (Windows Key + L)."),
                    createVNode("li", null, "Users MUST NOT bypass controls, share credentials or active sessions, or tamper with audit logs or evidence, and MUST report incidents and weaknesses to the IT Help Desk or Information Security Team.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, "Computing and mobile devices"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Personal devices MUST comply with the BYOD standard; unauthorised or unlicensed software MUST NOT be installed; endpoints MUST be locked when unattended."),
                  createVNode("li", null, "Work files MUST be stored on network shared folders, not local drives; lost or stolen devices MUST be reported to the IT Help Desk immediately."),
                  createVNode("li", null, "Data copied to external storage requires IT, Information Security, and Data Owner approval, MUST be encrypted, and remains the user’s accountability. Nebras email or information MUST NOT be backed up to non-Nebras media or cloud.")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Internet and internal portals"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Internet access is via the Nebras network only, for business purposes, granted by role; connections MUST NOT bypass firewalls or proxy services, and all downloads are scanned at the web proxy and client."),
                  createVNode("li", null, "“Restricted” and above information MUST NOT be posted, shared, or uploaded to the internet or social media; only authorised personnel may publish approved content."),
                  createVNode("li", null, "Remote workers MUST NOT use public Wi-Fi for secret, confidential, or restricted information; internal portal activity may be monitored.")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Email and social media"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Personal and business email MUST be kept separate; auto-forwarding official mail to public accounts is prohibited; recipients MUST be verified before sending sensitive information."),
                  createVNode("li", null, "Restricted and above information sent by email MUST be encrypted, and confidential/restricted attachments password-protected or encrypted; accounts require multi-factor authentication."),
                  createVNode("li", null, "Employees and third parties MUST NOT share Nebras financial data, proprietary or classified information, or issue statements on behalf of Nebras over social media; official accounts have a single custodian and credentials are never shared.")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Clear desk, clear screen, and user responsibility"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Desks are cleared when unattended; classified media are locked away; documents of Restricted or above are removed from printers and whiteboards immediately; privacy filters are used on shared floors."),
                  createVNode("li", null, "Endpoints lock automatically after 10 minutes of inactivity; users lock screens when away (Windows Key + L)."),
                  createVNode("li", null, "Users MUST NOT bypass controls, share credentials or active sessions, or tamper with audit logs or evidence, and MUST report incidents and weaknesses to the IT Help Desk or Information Security Team.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "email-internet",
        num: "04",
        color: "var(--at-blue-deep)",
        eyebrow: "Email & internet security",
        title: "Messaging and connectivity controls",
        lede: "Email and internet standards define the technical countermeasures — account lifecycle, content filtering, authentication, and monitoring — that protect Nebras communications.",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-641d9aa6${_scopeId}>Email account lifecycle</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-641d9aa6${_scopeId2}>Accounts are created only after HR approval (and Department Head approval for third-party or generic IDs); every generic or group account has an assigned owner for accountability.</li><li data-v-641d9aa6${_scopeId2}>Access is revoked immediately on termination; a terminated employee’s mailbox may be kept enabled for no more than 30 days with Department Head approval and monitoring; deleted IDs are never re-allotted.</li><li data-v-641d9aa6${_scopeId2}>Official correspondence is treated as Restricted unless otherwise specified; the IT department archives mail per the approved procedure.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Accounts are created only after HR approval (and Department Head approval for third-party or generic IDs); every generic or group account has an assigned owner for accountability."),
                    createVNode("li", null, "Access is revoked immediately on termination; a terminated employee’s mailbox may be kept enabled for no more than 30 days with Department Head approval and monitoring; deleted IDs are never re-allotted."),
                    createVNode("li", null, "Official correspondence is treated as Restricted unless otherwise specified; the IT department archives mail per the approved procedure.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-641d9aa6${_scopeId}>Email security controls</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-641d9aa6${_scopeId2}>Internet-facing mail servers are firewalled to required secure ports only; web-mail session time-out is set to 5 minutes or less; initial access is allowed only from Nebras offices, with conditional-access rules.</li><li data-v-641d9aa6${_scopeId2}>Gateway content filtering quarantines malicious or sensitive content; executables are blocked on incoming mail; password-protected archives are quarantined; macros are stripped; the server is never an open relay; spoofed inbound mail using Nebras domains is blocked.</li><li data-v-641d9aa6${_scopeId2}>Accounts use a user ID/password within offices and multi-factor authentication elsewhere; attachments are scanned for viruses, key loggers, malware, ransomware, and backdoors.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Internet-facing mail servers are firewalled to required secure ports only; web-mail session time-out is set to 5 minutes or less; initial access is allowed only from Nebras offices, with conditional-access rules."),
                    createVNode("li", null, "Gateway content filtering quarantines malicious or sensitive content; executables are blocked on incoming mail; password-protected archives are quarantined; macros are stripped; the server is never an open relay; spoofed inbound mail using Nebras domains is blocked."),
                    createVNode("li", null, "Accounts use a user ID/password within offices and multi-factor authentication elsewhere; attachments are scanned for viruses, key loggers, malware, ransomware, and backdoors.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-641d9aa6${_scopeId}>Sender authentication</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-641d9aa6${_scopeId2}><strong data-v-641d9aa6${_scopeId2}>SPF</strong> — publishes the IP addresses authorised to send on behalf of Nebras domains; web-only domains declare no valid senders. DNSSEC is deployed on all DNS name servers.</li><li data-v-641d9aa6${_scopeId2}><strong data-v-641d9aa6${_scopeId2}>DKIM</strong> — signs outbound mail with a private key; the public key in DNS lets recipients verify origin and integrity.</li><li data-v-641d9aa6${_scopeId2}><strong data-v-641d9aa6${_scopeId2}>DMARC</strong> — sets authentication policy (failing messages quarantined) and receives aggregate reports to detect spoofing and misuse.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "SPF"),
                      createTextVNode(" — publishes the IP addresses authorised to send on behalf of Nebras domains; web-only domains declare no valid senders. DNSSEC is deployed on all DNS name servers.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "DKIM"),
                      createTextVNode(" — signs outbound mail with a private key; the public key in DNS lets recipients verify origin and integrity.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "DMARC"),
                      createTextVNode(" — sets authentication policy (failing messages quarantined) and receives aggregate reports to detect spoofing and misuse.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-641d9aa6${_scopeId}>Internet standard and monitoring</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-641d9aa6${_scopeId2}>Internet is used only on Nebras networks or controlled assets, authorised by the Department Head; exception lists are reviewed at least annually; unsecured inbound/outbound terminal-service connections are not permitted.</li><li data-v-641d9aa6${_scopeId2}>Remote access uses strong authentication (two-factor, authenticator apps, tokens, or smart cards) and strong encryption — no deprecated protocols below TLS 1.2.</li><li data-v-641d9aa6${_scopeId2}>Firewall, proxy, email, DNS, SPF, DKIM, and DMARC logs are consolidated into the centralised SIEM; the Information Security Team reviews internet connections at least every 3 months.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Internet is used only on Nebras networks or controlled assets, authorised by the Department Head; exception lists are reviewed at least annually; unsecured inbound/outbound terminal-service connections are not permitted."),
                    createVNode("li", null, "Remote access uses strong authentication (two-factor, authenticator apps, tokens, or smart cards) and strong encryption — no deprecated protocols below TLS 1.2."),
                    createVNode("li", null, "Firewall, proxy, email, DNS, SPF, DKIM, and DMARC logs are consolidated into the centralised SIEM; the Information Security Team reviews internet connections at least every 3 months.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, "Email account lifecycle"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Accounts are created only after HR approval (and Department Head approval for third-party or generic IDs); every generic or group account has an assigned owner for accountability."),
                  createVNode("li", null, "Access is revoked immediately on termination; a terminated employee’s mailbox may be kept enabled for no more than 30 days with Department Head approval and monitoring; deleted IDs are never re-allotted."),
                  createVNode("li", null, "Official correspondence is treated as Restricted unless otherwise specified; the IT department archives mail per the approved procedure.")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Email security controls"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Internet-facing mail servers are firewalled to required secure ports only; web-mail session time-out is set to 5 minutes or less; initial access is allowed only from Nebras offices, with conditional-access rules."),
                  createVNode("li", null, "Gateway content filtering quarantines malicious or sensitive content; executables are blocked on incoming mail; password-protected archives are quarantined; macros are stripped; the server is never an open relay; spoofed inbound mail using Nebras domains is blocked."),
                  createVNode("li", null, "Accounts use a user ID/password within offices and multi-factor authentication elsewhere; attachments are scanned for viruses, key loggers, malware, ransomware, and backdoors.")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Sender authentication"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "SPF"),
                    createTextVNode(" — publishes the IP addresses authorised to send on behalf of Nebras domains; web-only domains declare no valid senders. DNSSEC is deployed on all DNS name servers.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "DKIM"),
                    createTextVNode(" — signs outbound mail with a private key; the public key in DNS lets recipients verify origin and integrity.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "DMARC"),
                    createTextVNode(" — sets authentication policy (failing messages quarantined) and receives aggregate reports to detect spoofing and misuse.")
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "Internet standard and monitoring"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Internet is used only on Nebras networks or controlled assets, authorised by the Department Head; exception lists are reviewed at least annually; unsecured inbound/outbound terminal-service connections are not permitted."),
                  createVNode("li", null, "Remote access uses strong authentication (two-factor, authenticator apps, tokens, or smart cards) and strong encryption — no deprecated protocols below TLS 1.2."),
                  createVNode("li", null, "Firewall, proxy, email, DNS, SPF, DKIM, and DMARC logs are consolidated into the centralised SIEM; the Information Security Team reviews internet connections at least every 3 months.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "access",
        num: "05",
        color: "var(--at-navy)",
        eyebrow: "Access control & passwords",
        title: "Identity, authentication, and password management",
        lede: "Password requirements vary by account type; strong authentication, secure storage, vaulting, and authentication logging are mandatory across all systems.",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-641d9aa6${_scopeId}>Password policy by account type</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-641d9aa6${_scopeId2}><strong data-v-641d9aa6${_scopeId2}>Domain</strong> — history 10, maximum age 45 days, minimum age 1 day, minimum length 12 characters, complexity enabled; lockout after 3 attempts for 30 minutes; guest accounts disabled; privileged accounts avoid default names.</li><li data-v-641d9aa6${_scopeId2}><strong data-v-641d9aa6${_scopeId2}>Service accounts</strong> — history 10, minimum length 14, complexity enforced, interactive logon disabled; vendor-shared credentials reset before go-live; interactive logon activity monitored and alerted.</li><li data-v-641d9aa6${_scopeId2}><strong data-v-641d9aa6${_scopeId2}>Local administrators</strong> — minimum length 20, maximum age 1 year; passwords split between Information Security and IT Operations and vaulted under dual access control.</li><li data-v-641d9aa6${_scopeId2}><strong data-v-641d9aa6${_scopeId2}>Applications</strong> — default passwords changed after install; passwords salted-hashed before transmission; public-facing apps enforce strong policy (length 12, history 5), 2nd-factor authentication, and CAPTCHA against brute force.</li><li data-v-641d9aa6${_scopeId2}><strong data-v-641d9aa6${_scopeId2}>Databases</strong> — default credentials removed; credentials stored one-way hashed; Windows authentication preferred; where not possible, 3 failed attempts, 45-day lifetime, 30-minute lockout, minimum length 12.</li><li data-v-641d9aa6${_scopeId2}><strong data-v-641d9aa6${_scopeId2}>Network and security devices</strong> — integrated with domain controller / RADIUS / TACACS; default accounts renamed or disabled; passwords stored encrypted; unused accounts removed.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Domain"),
                      createTextVNode(" — history 10, maximum age 45 days, minimum age 1 day, minimum length 12 characters, complexity enabled; lockout after 3 attempts for 30 minutes; guest accounts disabled; privileged accounts avoid default names.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Service accounts"),
                      createTextVNode(" — history 10, minimum length 14, complexity enforced, interactive logon disabled; vendor-shared credentials reset before go-live; interactive logon activity monitored and alerted.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Local administrators"),
                      createTextVNode(" — minimum length 20, maximum age 1 year; passwords split between Information Security and IT Operations and vaulted under dual access control.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Applications"),
                      createTextVNode(" — default passwords changed after install; passwords salted-hashed before transmission; public-facing apps enforce strong policy (length 12, history 5), 2nd-factor authentication, and CAPTCHA against brute force.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Databases"),
                      createTextVNode(" — default credentials removed; credentials stored one-way hashed; Windows authentication preferred; where not possible, 3 failed attempts, 45-day lifetime, 30-minute lockout, minimum length 12.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Network and security devices"),
                      createTextVNode(" — integrated with domain controller / RADIUS / TACACS; default accounts renamed or disabled; passwords stored encrypted; unused accounts removed.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-641d9aa6${_scopeId}>Lifecycle, storage, and vaulting</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-641d9aa6${_scopeId2}>Default passwords are reset on first initialisation before production; temporary passwords are delivered via the IT Service Desk and changed at first login; passwords are stored one-way hashed and salted.</li><li data-v-641d9aa6${_scopeId2}>Passwords are treated as Restricted, never shared, emailed, spoken, or written down, and never stored unencrypted; suspected compromise is reported and all passwords changed.</li><li data-v-641d9aa6${_scopeId2}>Vaulted passwords are held in tamper-evident envelopes in a fireproof safe under dual custody, released only with Information Security Head authorisation, reset after use, and rotated annually between November and December.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Default passwords are reset on first initialisation before production; temporary passwords are delivered via the IT Service Desk and changed at first login; passwords are stored one-way hashed and salted."),
                    createVNode("li", null, "Passwords are treated as Restricted, never shared, emailed, spoken, or written down, and never stored unencrypted; suspected compromise is reported and all passwords changed."),
                    createVNode("li", null, "Vaulted passwords are held in tamper-evident envelopes in a fireproof safe under dual custody, released only with Information Security Head authorisation, reset after use, and rotated annually between November and December.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-641d9aa6${_scopeId}>Authentication logging and access</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-641d9aa6${_scopeId2}>Logs capture event type, timestamp with time zone, user identity, source (IP, device, location), and authentication method; access to logs is restricted with an audit trail.</li><li data-v-641d9aa6${_scopeId2}>Failed authentication returns a generic message that does not reveal which credential was wrong; logs are correlated in the SIEM with real-time monitoring and alerts for repeated failures or anomalies.</li><li data-v-641d9aa6${_scopeId2}>A login banner warns that the system is Nebras’s, that usage may be monitored and audited, and that unauthorised use is prohibited.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Logs capture event type, timestamp with time zone, user identity, source (IP, device, location), and authentication method; access to logs is restricted with an audit trail."),
                    createVNode("li", null, "Failed authentication returns a generic message that does not reveal which credential was wrong; logs are correlated in the SIEM with real-time monitoring and alerts for repeated failures or anomalies."),
                    createVNode("li", null, "A login banner warns that the system is Nebras’s, that usage may be monitored and audited, and that unauthorised use is prohibited.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, "Password policy by account type"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Domain"),
                    createTextVNode(" — history 10, maximum age 45 days, minimum age 1 day, minimum length 12 characters, complexity enabled; lockout after 3 attempts for 30 minutes; guest accounts disabled; privileged accounts avoid default names.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Service accounts"),
                    createTextVNode(" — history 10, minimum length 14, complexity enforced, interactive logon disabled; vendor-shared credentials reset before go-live; interactive logon activity monitored and alerted.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Local administrators"),
                    createTextVNode(" — minimum length 20, maximum age 1 year; passwords split between Information Security and IT Operations and vaulted under dual access control.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Applications"),
                    createTextVNode(" — default passwords changed after install; passwords salted-hashed before transmission; public-facing apps enforce strong policy (length 12, history 5), 2nd-factor authentication, and CAPTCHA against brute force.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Databases"),
                    createTextVNode(" — default credentials removed; credentials stored one-way hashed; Windows authentication preferred; where not possible, 3 failed attempts, 45-day lifetime, 30-minute lockout, minimum length 12.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Network and security devices"),
                    createTextVNode(" — integrated with domain controller / RADIUS / TACACS; default accounts renamed or disabled; passwords stored encrypted; unused accounts removed.")
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "Lifecycle, storage, and vaulting"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Default passwords are reset on first initialisation before production; temporary passwords are delivered via the IT Service Desk and changed at first login; passwords are stored one-way hashed and salted."),
                  createVNode("li", null, "Passwords are treated as Restricted, never shared, emailed, spoken, or written down, and never stored unencrypted; suspected compromise is reported and all passwords changed."),
                  createVNode("li", null, "Vaulted passwords are held in tamper-evident envelopes in a fireproof safe under dual custody, released only with Information Security Head authorisation, reset after use, and rotated annually between November and December.")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Authentication logging and access"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Logs capture event type, timestamp with time zone, user identity, source (IP, device, location), and authentication method; access to logs is restricted with an audit trail."),
                  createVNode("li", null, "Failed authentication returns a generic message that does not reveal which credential was wrong; logs are correlated in the SIEM with real-time monitoring and alerts for repeated failures or anomalies."),
                  createVNode("li", null, "A login banner warns that the system is Nebras’s, that usage may be monitored and audited, and that unauthorised use is prohibited.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "project",
        num: "06",
        color: "var(--at-teal-deep)",
        eyebrow: "Secure delivery",
        title: "Security across the project lifecycle",
        lede: "Information Security is embedded at every phase of delivery so that controls, testing, and safeguards are designed in from initiation through closure.",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-641d9aa6${_scopeId}>Lifecycle phases</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-641d9aa6${_scopeId2}><strong data-v-641d9aa6${_scopeId2}>Initiation &amp; requirements</strong> — run a risk assessment; embed segregation of duties and least privilege; define authentication, authorisation, compliance, and third-party integration requirements.</li><li data-v-641d9aa6${_scopeId2}><strong data-v-641d9aa6${_scopeId2}>Request for proposal</strong> — define security requirements, issue a security questionnaire, review vendor responses, set evaluation criteria (certifications, audit openness, SLAs, incident response), and verify compliance.</li><li data-v-641d9aa6${_scopeId2}><strong data-v-641d9aa6${_scopeId2}>Contracting</strong> — finalise security clauses, SLAs, data-protection and breach-notification provisions, audit rights, and change management; onboard vendors with policies, access, and embedded incident-management requirements while data ownership stays with Nebras.</li><li data-v-641d9aa6${_scopeId2}><strong data-v-641d9aa6${_scopeId2}>Execution</strong> — implement controls (firewalls, IDS/IPS, encryption, WAF, MFA, RBAC); manage risk-prioritised patching; and coordinate penetration testing, vulnerability scanning, and code review on a frozen system state.</li><li data-v-641d9aa6${_scopeId2}><strong data-v-641d9aa6${_scopeId2}>Closure</strong> — dispose of or retain data securely, decommission systems, revoke accounts, conduct a final security audit, capture lessons learned, and transition ongoing responsibilities.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Initiation & requirements"),
                      createTextVNode(" — run a risk assessment; embed segregation of duties and least privilege; define authentication, authorisation, compliance, and third-party integration requirements.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Request for proposal"),
                      createTextVNode(" — define security requirements, issue a security questionnaire, review vendor responses, set evaluation criteria (certifications, audit openness, SLAs, incident response), and verify compliance.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Contracting"),
                      createTextVNode(" — finalise security clauses, SLAs, data-protection and breach-notification provisions, audit rights, and change management; onboard vendors with policies, access, and embedded incident-management requirements while data ownership stays with Nebras.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Execution"),
                      createTextVNode(" — implement controls (firewalls, IDS/IPS, encryption, WAF, MFA, RBAC); manage risk-prioritised patching; and coordinate penetration testing, vulnerability scanning, and code review on a frozen system state.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Closure"),
                      createTextVNode(" — dispose of or retain data securely, decommission systems, revoke accounts, conduct a final security audit, capture lessons learned, and transition ongoing responsibilities.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "important",
              title: "Production data in non-production"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-641d9aa6${_scopeId2}>All data released from production MUST be masked or scrambled. Where clean production data is required for testing, UAT, or migration, the Data Owner MUST give explicit approval and accept the associated risk, with the Information Security Team advising on protective controls.</p>`);
                } else {
                  return [
                    createVNode("p", null, "All data released from production MUST be masked or scrambled. Where clean production data is required for testing, UAT, or migration, the Data Owner MUST give explicit approval and accept the associated risk, with the Information Security Team advising on protective controls.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, "Lifecycle phases"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Initiation & requirements"),
                    createTextVNode(" — run a risk assessment; embed segregation of duties and least privilege; define authentication, authorisation, compliance, and third-party integration requirements.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Request for proposal"),
                    createTextVNode(" — define security requirements, issue a security questionnaire, review vendor responses, set evaluation criteria (certifications, audit openness, SLAs, incident response), and verify compliance.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Contracting"),
                    createTextVNode(" — finalise security clauses, SLAs, data-protection and breach-notification provisions, audit rights, and change management; onboard vendors with policies, access, and embedded incident-management requirements while data ownership stays with Nebras.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Execution"),
                    createTextVNode(" — implement controls (firewalls, IDS/IPS, encryption, WAF, MFA, RBAC); manage risk-prioritised patching; and coordinate penetration testing, vulnerability scanning, and code review on a frozen system state.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Closure"),
                    createTextVNode(" — dispose of or retain data securely, decommission systems, revoke accounts, conduct a final security audit, capture lessons learned, and transition ongoing responsibilities.")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "important",
                title: "Production data in non-production"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, "All data released from production MUST be masked or scrambled. Where clean production data is required for testing, UAT, or migration, the Data Owner MUST give explicit approval and accept the associated risk, with the Information Security Team advising on protective controls.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "classification",
        num: "07",
        color: "var(--at-teal)",
        eyebrow: "Classification & handling",
        title: "Information classification, labelling, and handling",
        lede: "Every information asset is classified by the impact of its unauthorised disclosure, and each level carries minimum handling controls for access, encryption, storage, transmission, and disposal.",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "info",
              title: "Classification levels"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-641d9aa6${_scopeId2}><strong data-v-641d9aa6${_scopeId2}>Public</strong> — approved for unrestricted release, no harm on disclosure.</p><p data-v-641d9aa6${_scopeId2}><strong data-v-641d9aa6${_scopeId2}>Internal</strong> — for Nebras personnel only via role-based access; minor impact.</p><p data-v-641d9aa6${_scopeId2}><strong data-v-641d9aa6${_scopeId2}>Confidential</strong> — sensitive business, personal, or financial data (customer records, PII, HR files, contracts): strict need-to-know access, audit logging, secure disposal.</p><p data-v-641d9aa6${_scopeId2}><strong data-v-641d9aa6${_scopeId2}>Restricted</strong> — highly sensitive data (trade secrets, cryptographic keys, biometric data): ultra-restricted access with Data Owner and COO (as DPO) approval, mandatory MFA, end-to-end AES-256 encryption with HSM-held keys, real-time access alerts, and full audit trail.</p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createVNode("strong", null, "Public"),
                      createTextVNode(" — approved for unrestricted release, no harm on disclosure.")
                    ]),
                    createVNode("p", null, [
                      createVNode("strong", null, "Internal"),
                      createTextVNode(" — for Nebras personnel only via role-based access; minor impact.")
                    ]),
                    createVNode("p", null, [
                      createVNode("strong", null, "Confidential"),
                      createTextVNode(" — sensitive business, personal, or financial data (customer records, PII, HR files, contracts): strict need-to-know access, audit logging, secure disposal.")
                    ]),
                    createVNode("p", null, [
                      createVNode("strong", null, "Restricted"),
                      createTextVNode(" — highly sensitive data (trade secrets, cryptographic keys, biometric data): ultra-restricted access with Data Owner and COO (as DPO) approval, mandatory MFA, end-to-end AES-256 encryption with HSM-held keys, real-time access alerts, and full audit trail.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-641d9aa6${_scopeId}>Labelling</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-641d9aa6${_scopeId2}>The Data Owner assigns a classification label to production data; Confidential and Restricted data MUST be labelled, and combined data takes the most restrictive level present.</li><li data-v-641d9aa6${_scopeId2}>Any data not explicitly labelled is treated by default as Confidential.</li>`);
                } else {
                  return [
                    createVNode("li", null, "The Data Owner assigns a classification label to production data; Confidential and Restricted data MUST be labelled, and combined data takes the most restrictive level present."),
                    createVNode("li", null, "Any data not explicitly labelled is treated by default as Confidential.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-641d9aa6${_scopeId}>Critical Information Infrastructure</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-641d9aa6${_scopeId2}>Nebras maintains an inventory of assets supporting national Open Finance infrastructure, designated Critical Information Assets in line with UAE Cyber Security Council (CSC) expectations.</li><li data-v-641d9aa6${_scopeId2}>These include API Hub core platforms and Trust Framework components; cryptographic keys, certificates, and PKI; identity, consent, and access-management systems; and core connectivity, logging, and monitoring systems — all subject to enhanced protection, monitoring, resilience, and incident response.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Nebras maintains an inventory of assets supporting national Open Finance infrastructure, designated Critical Information Assets in line with UAE Cyber Security Council (CSC) expectations."),
                    createVNode("li", null, "These include API Hub core platforms and Trust Framework components; cryptographic keys, certificates, and PKI; identity, consent, and access-management systems; and core connectivity, logging, and monitoring systems — all subject to enhanced protection, monitoring, resilience, and incident response.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-641d9aa6${_scopeId}>Handling and reclassification</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-641d9aa6${_scopeId2}>Access follows least privilege with regular access reviews signed off by the Information Security Team; Confidential data is encrypted in transit and at rest, and Restricted data is encrypted on portable devices and untrusted networks.</li><li data-v-641d9aa6${_scopeId2}>Data is transmitted by secure methods (VPN or encrypted email) and disposed of beyond recovery by shredding, pulping, or approved sanitisation; sharing channels apply encryption and approval requirements that escalate with classification.</li><li data-v-641d9aa6${_scopeId2}>Data Owners review classifications at least annually; reclassification is communicated to stakeholders and custodians, with labels updated on the original document.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Access follows least privilege with regular access reviews signed off by the Information Security Team; Confidential data is encrypted in transit and at rest, and Restricted data is encrypted on portable devices and untrusted networks."),
                    createVNode("li", null, "Data is transmitted by secure methods (VPN or encrypted email) and disposed of beyond recovery by shredding, pulping, or approved sanitisation; sharing channels apply encryption and approval requirements that escalate with classification."),
                    createVNode("li", null, "Data Owners review classifications at least annually; reclassification is communicated to stakeholders and custodians, with labels updated on the original document.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdNote, {
                type: "info",
                title: "Classification levels"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createVNode("strong", null, "Public"),
                    createTextVNode(" — approved for unrestricted release, no harm on disclosure.")
                  ]),
                  createVNode("p", null, [
                    createVNode("strong", null, "Internal"),
                    createTextVNode(" — for Nebras personnel only via role-based access; minor impact.")
                  ]),
                  createVNode("p", null, [
                    createVNode("strong", null, "Confidential"),
                    createTextVNode(" — sensitive business, personal, or financial data (customer records, PII, HR files, contracts): strict need-to-know access, audit logging, secure disposal.")
                  ]),
                  createVNode("p", null, [
                    createVNode("strong", null, "Restricted"),
                    createTextVNode(" — highly sensitive data (trade secrets, cryptographic keys, biometric data): ultra-restricted access with Data Owner and COO (as DPO) approval, mandatory MFA, end-to-end AES-256 encryption with HSM-held keys, real-time access alerts, and full audit trail.")
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "Labelling"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "The Data Owner assigns a classification label to production data; Confidential and Restricted data MUST be labelled, and combined data takes the most restrictive level present."),
                  createVNode("li", null, "Any data not explicitly labelled is treated by default as Confidential.")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Critical Information Infrastructure"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Nebras maintains an inventory of assets supporting national Open Finance infrastructure, designated Critical Information Assets in line with UAE Cyber Security Council (CSC) expectations."),
                  createVNode("li", null, "These include API Hub core platforms and Trust Framework components; cryptographic keys, certificates, and PKI; identity, consent, and access-management systems; and core connectivity, logging, and monitoring systems — all subject to enhanced protection, monitoring, resilience, and incident response.")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Handling and reclassification"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Access follows least privilege with regular access reviews signed off by the Information Security Team; Confidential data is encrypted in transit and at rest, and Restricted data is encrypted on portable devices and untrusted networks."),
                  createVNode("li", null, "Data is transmitted by secure methods (VPN or encrypted email) and disposed of beyond recovery by shredding, pulping, or approved sanitisation; sharing channels apply encryption and approval requirements that escalate with classification."),
                  createVNode("li", null, "Data Owners review classifications at least annually; reclassification is communicated to stakeholders and custodians, with labels updated on the original document.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "data-protection",
        num: "08",
        color: "var(--at-gold)",
        eyebrow: "Data protection & privacy",
        title: "Privacy, retention, and data protection techniques",
        lede: "Nebras respects data subjects’ rights under applicable laws (including UAE PDPL and GDPR) and applies industry-tested techniques to protect, retain, and dispose of personal and business data.",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-641d9aa6${_scopeId}>Data protection techniques</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-641d9aa6${_scopeId2}><strong data-v-641d9aa6${_scopeId2}>Cryptography</strong> — industry-tested algorithms with strong key lengths and key management, covering reversible encryption and one-way hashing.</li><li data-v-641d9aa6${_scopeId2}><strong data-v-641d9aa6${_scopeId2}>Encryption</strong> — e.g. AES (128 bits and higher), 3DES with minimum double-length keys (EMV only), and RSA (2048 bits and higher).</li><li data-v-641d9aa6${_scopeId2}><strong data-v-641d9aa6${_scopeId2}>Degaussing, sanitisation, and secure wipe</strong> — permanent destruction or deletion of data so it cannot be recovered.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Cryptography"),
                      createTextVNode(" — industry-tested algorithms with strong key lengths and key management, covering reversible encryption and one-way hashing.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Encryption"),
                      createTextVNode(" — e.g. AES (128 bits and higher), 3DES with minimum double-length keys (EMV only), and RSA (2048 bits and higher).")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Degaussing, sanitisation, and secure wipe"),
                      createTextVNode(" — permanent destruction or deletion of data so it cannot be recovered.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-641d9aa6${_scopeId}>Data subject rights</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-641d9aa6${_scopeId2}>Rights include access, rectification, erasure, restriction, portability, objection, and withdrawal of consent.</li><li data-v-641d9aa6${_scopeId2}>The COO (as DPO) verifies identity within 72 hours and responds within 30 days (extendable to 60 for complex cases); requests are tracked centrally and metrics reported quarterly to the Board Risk and Compliance Committee.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Rights include access, rectification, erasure, restriction, portability, objection, and withdrawal of consent."),
                    createVNode("li", null, "The COO (as DPO) verifies identity within 72 hours and responds within 30 days (extendable to 60 for complex cases); requests are tracked centrally and metrics reported quarterly to the Board Risk and Compliance Committee.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-641d9aa6${_scopeId}>DPIA, retention, and RoPA</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-641d9aa6${_scopeId2}>A Data Protection Impact Assessment is mandatory for high-risk processing (large-scale sensitive PII or biometrics, automated decision-making with legal effect, new technology processing Restricted data, or cross-border transfer to non-adequate jurisdictions); reports are filed in the DPIA Register and retained 5 years.</li><li data-v-641d9aa6${_scopeId2}>Retention follows a defined schedule — e.g. customer PII 7 years after account closure (CBUAE/AML), financial transaction logs 10 years (CBUAE Open Finance rules), API access logs 1 year, HR records 5 years — with secure deletion (NIST 800-88, DBAN, DIN 66399 P-5) verified by the DPO, and legal holds retained until proceedings end.</li><li data-v-641d9aa6${_scopeId2}>A Record of Processing Activities is maintained (per UAE PDPL Article 14), owned by the COO as DPO, updated quarterly, read-only for auditors, and reviewed in the annual internal audit.</li>`);
                } else {
                  return [
                    createVNode("li", null, "A Data Protection Impact Assessment is mandatory for high-risk processing (large-scale sensitive PII or biometrics, automated decision-making with legal effect, new technology processing Restricted data, or cross-border transfer to non-adequate jurisdictions); reports are filed in the DPIA Register and retained 5 years."),
                    createVNode("li", null, "Retention follows a defined schedule — e.g. customer PII 7 years after account closure (CBUAE/AML), financial transaction logs 10 years (CBUAE Open Finance rules), API access logs 1 year, HR records 5 years — with secure deletion (NIST 800-88, DBAN, DIN 66399 P-5) verified by the DPO, and legal holds retained until proceedings end."),
                    createVNode("li", null, "A Record of Processing Activities is maintained (per UAE PDPL Article 14), owned by the COO as DPO, updated quarterly, read-only for auditors, and reviewed in the annual internal audit.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, "Data protection techniques"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Cryptography"),
                    createTextVNode(" — industry-tested algorithms with strong key lengths and key management, covering reversible encryption and one-way hashing.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Encryption"),
                    createTextVNode(" — e.g. AES (128 bits and higher), 3DES with minimum double-length keys (EMV only), and RSA (2048 bits and higher).")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Degaussing, sanitisation, and secure wipe"),
                    createTextVNode(" — permanent destruction or deletion of data so it cannot be recovered.")
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "Data subject rights"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Rights include access, rectification, erasure, restriction, portability, objection, and withdrawal of consent."),
                  createVNode("li", null, "The COO (as DPO) verifies identity within 72 hours and responds within 30 days (extendable to 60 for complex cases); requests are tracked centrally and metrics reported quarterly to the Board Risk and Compliance Committee.")
                ]),
                _: 1
              }),
              createVNode("h3", null, "DPIA, retention, and RoPA"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "A Data Protection Impact Assessment is mandatory for high-risk processing (large-scale sensitive PII or biometrics, automated decision-making with legal effect, new technology processing Restricted data, or cross-border transfer to non-adequate jurisdictions); reports are filed in the DPIA Register and retained 5 years."),
                  createVNode("li", null, "Retention follows a defined schedule — e.g. customer PII 7 years after account closure (CBUAE/AML), financial transaction logs 10 years (CBUAE Open Finance rules), API access logs 1 year, HR records 5 years — with secure deletion (NIST 800-88, DBAN, DIN 66399 P-5) verified by the DPO, and legal holds retained until proceedings end."),
                  createVNode("li", null, "A Record of Processing Activities is maintained (per UAE PDPL Article 14), owned by the COO as DPO, updated quarterly, read-only for auditors, and reviewed in the annual internal audit.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "third-party",
        num: "09",
        color: "var(--at-blue)",
        eyebrow: "Third-party security",
        title: "Vendor, outsourcing, and supply-chain assurance",
        lede: "All third parties processing Nebras data — especially Restricted and Confidential — MUST provide equivalent protection through contractual and operational safeguards.",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-641d9aa6${_scopeId}>Vendor risk management</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-641d9aa6${_scopeId2}><strong data-v-641d9aa6${_scopeId2}>Due diligence</strong> — pre-engagement Information Security &amp; Privacy Questionnaire, review of certifications (ISO 27001, SOC 2 Type II), and breach-history assessment.</li><li data-v-641d9aa6${_scopeId2}><strong data-v-641d9aa6${_scopeId2}>Data Processing Agreement</strong> — mandatory for Restricted/Confidential data, covering sub-processor list, 24-hour breach notification, audit rights, and data return or deletion on termination.</li><li data-v-641d9aa6${_scopeId2}><strong data-v-641d9aa6${_scopeId2}>Risk tiering</strong> — High (Restricted data): full DPA plus annual audit; Medium (Confidential): DPA plus biennial review; Low (Internal/Public): standard contract clauses.</li><li data-v-641d9aa6${_scopeId2}><strong data-v-641d9aa6${_scopeId2}>Governance</strong> — the Information Security Head reviews DPA drafts, the COO (as DPO) co-signs for Restricted data, and the Risk &amp; Compliance Committee approves high-risk vendors.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Due diligence"),
                      createTextVNode(" — pre-engagement Information Security & Privacy Questionnaire, review of certifications (ISO 27001, SOC 2 Type II), and breach-history assessment.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Data Processing Agreement"),
                      createTextVNode(" — mandatory for Restricted/Confidential data, covering sub-processor list, 24-hour breach notification, audit rights, and data return or deletion on termination.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Risk tiering"),
                      createTextVNode(" — High (Restricted data): full DPA plus annual audit; Medium (Confidential): DPA plus biennial review; Low (Internal/Public): standard contract clauses.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Governance"),
                      createTextVNode(" — the Information Security Head reviews DPA drafts, the COO (as DPO) co-signs for Restricted data, and the Risk & Compliance Committee approves high-risk vendors.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-641d9aa6${_scopeId}>Cyber resilience testing</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-641d9aa6${_scopeId2}>Providers supporting Critical Information Assets or processing Restricted/Confidential data undergo mandatory periodic cyber resilience testing — penetration testing, vulnerability assessments, resilience or recovery simulations, and review of incident response and disaster recovery capability.</li><li data-v-641d9aa6${_scopeId2}>High-risk or critical providers are tested at least annually, or more frequently based on risk, regulatory expectations, or material service changes.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Providers supporting Critical Information Assets or processing Restricted/Confidential data undergo mandatory periodic cyber resilience testing — penetration testing, vulnerability assessments, resilience or recovery simulations, and review of incident response and disaster recovery capability."),
                    createVNode("li", null, "High-risk or critical providers are tested at least annually, or more frequently based on risk, regulatory expectations, or material service changes.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, "Vendor risk management"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Due diligence"),
                    createTextVNode(" — pre-engagement Information Security & Privacy Questionnaire, review of certifications (ISO 27001, SOC 2 Type II), and breach-history assessment.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Data Processing Agreement"),
                    createTextVNode(" — mandatory for Restricted/Confidential data, covering sub-processor list, 24-hour breach notification, audit rights, and data return or deletion on termination.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Risk tiering"),
                    createTextVNode(" — High (Restricted data): full DPA plus annual audit; Medium (Confidential): DPA plus biennial review; Low (Internal/Public): standard contract clauses.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Governance"),
                    createTextVNode(" — the Information Security Head reviews DPA drafts, the COO (as DPO) co-signs for Restricted data, and the Risk & Compliance Committee approves high-risk vendors.")
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "Cyber resilience testing"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Providers supporting Critical Information Assets or processing Restricted/Confidential data undergo mandatory periodic cyber resilience testing — penetration testing, vulnerability assessments, resilience or recovery simulations, and review of incident response and disaster recovery capability."),
                  createVNode("li", null, "High-risk or critical providers are tested at least annually, or more frequently based on risk, regulatory expectations, or material service changes.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "risk-incident",
        num: "10",
        color: "var(--at-blue-deep)",
        eyebrow: "Risk, incident & awareness",
        title: "Risk management, incident response, and awareness",
        lede: "Risks are analysed by impact and likelihood and treated to acceptable levels; incidents are managed through a defined lifecycle with mandatory regulatory reporting; and awareness is sustained across the organisation.",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-641d9aa6${_scopeId}>Risk management</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-641d9aa6${_scopeId2}>Identified risks are analysed as a compound of impact (minor / moderate / major) and likelihood (unlikely / likely / very likely), considering asset criticality and existing controls on common scales for comparability.</li><li data-v-641d9aa6${_scopeId2}>Treatment strategies are avoidance, mitigation, transference, or acceptance; residual risks above baseline (high and medium) are tracked, and Risk Acceptance Forms are approved by the Risk and Compliance Committee.</li><li data-v-641d9aa6${_scopeId2}>Risk assessments are reviewed at least annually and on triggers such as new systems, suppliers, incidents, regulatory change, or geographic expansion.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Identified risks are analysed as a compound of impact (minor / moderate / major) and likelihood (unlikely / likely / very likely), considering asset criticality and existing controls on common scales for comparability."),
                    createVNode("li", null, "Treatment strategies are avoidance, mitigation, transference, or acceptance; residual risks above baseline (high and medium) are tracked, and Risk Acceptance Forms are approved by the Risk and Compliance Committee."),
                    createVNode("li", null, "Risk assessments are reviewed at least annually and on triggers such as new systems, suppliers, incidents, regulatory change, or geographic expansion.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-641d9aa6${_scopeId}>Incident response lifecycle</h3>`);
            _push2(ssrRenderComponent(_component_EdStages, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "01",
                    title: "Detect & contain",
                    "num-color": "var(--at-blue-deep)"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-641d9aa6${_scopeId3}>Within 1 hour, IT Operations isolates the affected system and revokes access to limit the compromise.</p>`);
                      } else {
                        return [
                          createVNode("p", null, "Within 1 hour, IT Operations isolates the affected system and revokes access to limit the compromise.")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "02",
                    title: "Assess & log",
                    "num-color": "var(--at-blue-deep)"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-641d9aa6${_scopeId3}>The Information Security Head records the event in the Incident Register and assesses whether personal data is involved.</p>`);
                      } else {
                        return [
                          createVNode("p", null, "The Information Security Head records the event in the Incident Register and assesses whether personal data is involved.")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "03",
                    title: "Mobilise response team",
                    "num-color": "var(--at-blue-deep)"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-641d9aa6${_scopeId3}>The COO (as DPO) forms the Breach Response Team — DPO, Legal, Communications, and Information Security.</p>`);
                      } else {
                        return [
                          createVNode("p", null, "The COO (as DPO) forms the Breach Response Team — DPO, Legal, Communications, and Information Security.")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "04",
                    title: "Notify",
                    "num-color": "var(--at-blue-deep)"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-641d9aa6${_scopeId3}>Within 72 hours, the UAE Data Office is notified where there is high risk to rights and freedoms, and affected data subjects are informed by direct email and website notice.</p>`);
                      } else {
                        return [
                          createVNode("p", null, "Within 72 hours, the UAE Data Office is notified where there is high risk to rights and freedoms, and affected data subjects are informed by direct email and website notice.")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "05",
                    title: "Remediate & report",
                    "num-color": "var(--at-blue-deep)"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-641d9aa6${_scopeId3}>Root-cause analysis is completed, controls updated, and the breach report presented quarterly to the Risk &amp; Compliance Committee. High-risk triggers include 1,000+ records, sensitive PII, or risk of identity theft.</p>`);
                      } else {
                        return [
                          createVNode("p", null, "Root-cause analysis is completed, controls updated, and the breach report presented quarterly to the Risk & Compliance Committee. High-risk triggers include 1,000+ records, sensitive PII, or risk of identity theft.")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_EdStage, {
                      num: "01",
                      title: "Detect & contain",
                      "num-color": "var(--at-blue-deep)"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, "Within 1 hour, IT Operations isolates the affected system and revokes access to limit the compromise.")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_EdStage, {
                      num: "02",
                      title: "Assess & log",
                      "num-color": "var(--at-blue-deep)"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, "The Information Security Head records the event in the Incident Register and assesses whether personal data is involved.")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_EdStage, {
                      num: "03",
                      title: "Mobilise response team",
                      "num-color": "var(--at-blue-deep)"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, "The COO (as DPO) forms the Breach Response Team — DPO, Legal, Communications, and Information Security.")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_EdStage, {
                      num: "04",
                      title: "Notify",
                      "num-color": "var(--at-blue-deep)"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, "Within 72 hours, the UAE Data Office is notified where there is high risk to rights and freedoms, and affected data subjects are informed by direct email and website notice.")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_EdStage, {
                      num: "05",
                      title: "Remediate & report",
                      "num-color": "var(--at-blue-deep)"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, "Root-cause analysis is completed, controls updated, and the breach report presented quarterly to the Risk & Compliance Committee. High-risk triggers include 1,000+ records, sensitive PII, or risk of identity theft.")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-641d9aa6${_scopeId}>Cyber incident severity</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-641d9aa6${_scopeId2}><strong data-v-641d9aa6${_scopeId2}>Severity 1 (Critical)</strong> — affects critical assets or national Open Finance infrastructure, widespread disruption, or significant data compromise; escalated immediately to Senior Management and the Board, with national reporting and authority coordination.</li><li data-v-641d9aa6${_scopeId2}><strong data-v-641d9aa6${_scopeId2}>Severity 2 (High)</strong> — major operational disruption, attempted compromise of critical systems, or confidential-data exposure without widespread impact.</li><li data-v-641d9aa6${_scopeId2}><strong data-v-641d9aa6${_scopeId2}>Severity 3 (Medium)</strong> — localised issues, limited data exposure, or weaknesses requiring remediation.</li><li data-v-641d9aa6${_scopeId2}><strong data-v-641d9aa6${_scopeId2}>Severity 4 (Low)</strong> — minor events with no operational or data impact.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Severity 1 (Critical)"),
                      createTextVNode(" — affects critical assets or national Open Finance infrastructure, widespread disruption, or significant data compromise; escalated immediately to Senior Management and the Board, with national reporting and authority coordination.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Severity 2 (High)"),
                      createTextVNode(" — major operational disruption, attempted compromise of critical systems, or confidential-data exposure without widespread impact.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Severity 3 (Medium)"),
                      createTextVNode(" — localised issues, limited data exposure, or weaknesses requiring remediation.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Severity 4 (Low)"),
                      createTextVNode(" — minor events with no operational or data impact.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-641d9aa6${_scopeId}>Awareness and communication</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-641d9aa6${_scopeId2}>General awareness training reaches all employees on joining and annually; role-based training addresses job-specific gaps, insider-threat recognition, and sector-specific threats, with records retained 5 years.</li><li data-v-641d9aa6${_scopeId2}>An internal communication plan defines who communicates what and when — from policy on joining, to quarterly threat and incident-reporting updates, to event-based escalation of disruptions, breaches, and data leaks to the Risk and Compliance Committee.</li>`);
                } else {
                  return [
                    createVNode("li", null, "General awareness training reaches all employees on joining and annually; role-based training addresses job-specific gaps, insider-threat recognition, and sector-specific threats, with records retained 5 years."),
                    createVNode("li", null, "An internal communication plan defines who communicates what and when — from policy on joining, to quarterly threat and incident-reporting updates, to event-based escalation of disruptions, breaches, and data leaks to the Risk and Compliance Committee.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, "Risk management"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Identified risks are analysed as a compound of impact (minor / moderate / major) and likelihood (unlikely / likely / very likely), considering asset criticality and existing controls on common scales for comparability."),
                  createVNode("li", null, "Treatment strategies are avoidance, mitigation, transference, or acceptance; residual risks above baseline (high and medium) are tracked, and Risk Acceptance Forms are approved by the Risk and Compliance Committee."),
                  createVNode("li", null, "Risk assessments are reviewed at least annually and on triggers such as new systems, suppliers, incidents, regulatory change, or geographic expansion.")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Incident response lifecycle"),
              createVNode(_component_EdStages, null, {
                default: withCtx(() => [
                  createVNode(_component_EdStage, {
                    num: "01",
                    title: "Detect & contain",
                    "num-color": "var(--at-blue-deep)"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, "Within 1 hour, IT Operations isolates the affected system and revokes access to limit the compromise.")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_EdStage, {
                    num: "02",
                    title: "Assess & log",
                    "num-color": "var(--at-blue-deep)"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, "The Information Security Head records the event in the Incident Register and assesses whether personal data is involved.")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_EdStage, {
                    num: "03",
                    title: "Mobilise response team",
                    "num-color": "var(--at-blue-deep)"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, "The COO (as DPO) forms the Breach Response Team — DPO, Legal, Communications, and Information Security.")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_EdStage, {
                    num: "04",
                    title: "Notify",
                    "num-color": "var(--at-blue-deep)"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, "Within 72 hours, the UAE Data Office is notified where there is high risk to rights and freedoms, and affected data subjects are informed by direct email and website notice.")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_EdStage, {
                    num: "05",
                    title: "Remediate & report",
                    "num-color": "var(--at-blue-deep)"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, "Root-cause analysis is completed, controls updated, and the breach report presented quarterly to the Risk & Compliance Committee. High-risk triggers include 1,000+ records, sensitive PII, or risk of identity theft.")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode("h3", null, "Cyber incident severity"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Severity 1 (Critical)"),
                    createTextVNode(" — affects critical assets or national Open Finance infrastructure, widespread disruption, or significant data compromise; escalated immediately to Senior Management and the Board, with national reporting and authority coordination.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Severity 2 (High)"),
                    createTextVNode(" — major operational disruption, attempted compromise of critical systems, or confidential-data exposure without widespread impact.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Severity 3 (Medium)"),
                    createTextVNode(" — localised issues, limited data exposure, or weaknesses requiring remediation.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Severity 4 (Low)"),
                    createTextVNode(" — minor events with no operational or data impact.")
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "Awareness and communication"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "General awareness training reaches all employees on joining and annually; role-based training addresses job-specific gaps, insider-threat recognition, and sector-specific threats, with records retained 5 years."),
                  createVNode("li", null, "An internal communication plan defines who communicates what and when — from policy on joining, to quarterly threat and incident-reporting updates, to event-based escalation of disruptions, breaches, and data leaks to the Risk and Compliance Committee.")
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
              desc: "How Nebras sustains availability and recovers critical Open Finance services after disruption."
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRelatedCard, {
              href: "/internal/policies/enterprise-risk-management",
              category: "Risk, Security & Compliance",
              title: "Enterprise Risk Management Policy",
              desc: "The risk framework and appetite to which information security risk assessment is aligned."
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdRelatedCard, {
                href: "/internal/policies/business-continuity",
                category: "Risk, Security & Compliance",
                title: "Business Continuity Policy",
                desc: "How Nebras sustains availability and recovers critical Open Finance services after disruption."
              }),
              createVNode(_component_EdRelatedCard, {
                href: "/internal/policies/enterprise-risk-management",
                category: "Risk, Security & Compliance",
                title: "Enterprise Risk Management Policy",
                desc: "The risk framework and appetite to which information security risk assessment is aligned."
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/internal/policies/information-security.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const informationSecurity = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-641d9aa6"]]);
export {
  informationSecurity as default
};
