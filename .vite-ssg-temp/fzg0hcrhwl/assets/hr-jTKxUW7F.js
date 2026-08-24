import { _ as __unplugin_components_0, a as __unplugin_components_2, b as __unplugin_components_6, c as __unplugin_components_7$2 } from "./EdBackStrip-COkyNhGh.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
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
  __name: "hr",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({ title: "Human Resources Policy · Internal Policies" });
    const sections = [
      { id: "overview", label: "Overview & values" },
      { id: "recruitment", label: "Recruitment & onboarding" },
      { id: "working-hours", label: "Working hours & attendance" },
      { id: "leave", label: "Leave & holidays" },
      { id: "compensation", label: "Compensation & benefits" },
      { id: "performance", label: "Performance & development" },
      { id: "conduct", label: "Conduct & ethics" },
      { id: "grievance", label: "Grievance & disciplinary" },
      { id: "end-of-service", label: "End of service" },
      { id: "whistleblowing", label: "Whistleblowing & disclosure" }
    ];
    const meta = [
      { label: "Applies to", value: "Nebras" },
      { label: "Classification", value: "Restricted" },
      { label: "Version", value: "1.0 · Apr 2024" }
    ];
    const keyNums = [
      { value: "30", unit: "days", label: "Annual leave entitlement per year" },
      { value: "6", unit: "mo", label: "Standard probationary period" },
      { value: "90", unit: "days", label: "Maternity leave, full pay" }
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
      const _component_EdProse = __unplugin_components_4;
      const _component_EdRelatedCards = __unplugin_components_6;
      const _component_EdRelatedCard = __unplugin_components_7$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-page" }, _attrs))} data-v-5cf59a26>`);
      _push(ssrRenderComponent(_component_EdBackStrip, {
        href: "/internal/policies/",
        text: "All policies"
      }, null, _parent));
      _push(ssrRenderComponent(_component_EdHero, {
        eyebrow: "Internal · Restricted",
        "eyebrow-color": "var(--at-gold)",
        title: "Human Resources Policy",
        meta,
        lede: "The Nebras Open Finance HR Policies and Procedures Manual sets out how the company recruits, rewards, develops, and manages its people — observing UAE Federal Decree-Law No. 33 of 2021 (the Labour Law) in letter and spirit. Where this manual and the Labour Law diverge, the <strong>legislation prevails</strong>; where an employment contract offers terms no less beneficial than the law, the <strong>contract prevails</strong>.",
        "key-nums": keyNums
      }, null, _parent));
      _push(ssrRenderComponent(_component_EdInPageNav, { sections }, null, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "overview",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Overview & values",
        title: "Purpose, applicability, and culture",
        lede: "The manual documents Nebras’s HR policies and procedures, serves as the reference for consistent application, and supports compliance monitoring. It applies to all staff, secondees, and personnel of Nebras Open Finance and its subsidiaries.",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-5cf59a26${_scopeId}>Governing principles</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-5cf59a26${_scopeId2}>The manual is developed along the guidelines of the UAE Labour Law (Federal Decree-Law No. 33 of 2021, effective 2 February 2022), as amended.</li><li data-v-5cf59a26${_scopeId2}>In case of inconsistency between the manual and the Labour Law, the <strong data-v-5cf59a26${_scopeId2}>legislation takes precedence</strong>.</li><li data-v-5cf59a26${_scopeId2}>In case of inconsistency between the manual and an employment contract, the <strong data-v-5cf59a26${_scopeId2}>employment contract takes precedence</strong>, provided it is not less beneficial than prescribed by law.</li><li data-v-5cf59a26${_scopeId2}>Where a situation is not covered by the manual, the UAE Labour Law is consulted.</li><li data-v-5cf59a26${_scopeId2}>The manual is under the supervision of the CEO; amendments follow the Delegation of Authority, and superseded versions are retained for reference. Queries are registered with the Head of HR.</li>`);
                } else {
                  return [
                    createVNode("li", null, "The manual is developed along the guidelines of the UAE Labour Law (Federal Decree-Law No. 33 of 2021, effective 2 February 2022), as amended."),
                    createVNode("li", null, [
                      createTextVNode("In case of inconsistency between the manual and the Labour Law, the "),
                      createVNode("strong", null, "legislation takes precedence"),
                      createTextVNode(".")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("In case of inconsistency between the manual and an employment contract, the "),
                      createVNode("strong", null, "employment contract takes precedence"),
                      createTextVNode(", provided it is not less beneficial than prescribed by law.")
                    ]),
                    createVNode("li", null, "Where a situation is not covered by the manual, the UAE Labour Law is consulted."),
                    createVNode("li", null, "The manual is under the supervision of the CEO; amendments follow the Delegation of Authority, and superseded versions are retained for reference. Queries are registered with the Head of HR.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-5cf59a26${_scopeId}>Organisation &amp; Emiratisation</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-5cf59a26${_scopeId2}>Nebras runs a delayered structure — a CEO at the top with CXOs reporting to the CEO. The structure remains evolutionary and is normally reviewed on a two-year cycle, with changes justified by a business case.</li><li data-v-5cf59a26${_scopeId2}>Corporate-level structural changes (positions reporting to the CEO and all Functional Heads) require <strong data-v-5cf59a26${_scopeId2}>Board of Managers</strong> approval; changes below Functional Head require <strong data-v-5cf59a26${_scopeId2}>CEO</strong> approval.</li><li data-v-5cf59a26${_scopeId2}>Nebras supports the UAE’s nationalisation initiatives, designing roles suitable for UAE Nationals with a strategic target workforce composition of <strong data-v-5cf59a26${_scopeId2}>50–60% UAE Nationals</strong>.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Nebras runs a delayered structure — a CEO at the top with CXOs reporting to the CEO. The structure remains evolutionary and is normally reviewed on a two-year cycle, with changes justified by a business case."),
                    createVNode("li", null, [
                      createTextVNode("Corporate-level structural changes (positions reporting to the CEO and all Functional Heads) require "),
                      createVNode("strong", null, "Board of Managers"),
                      createTextVNode(" approval; changes below Functional Head require "),
                      createVNode("strong", null, "CEO"),
                      createTextVNode(" approval.")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("Nebras supports the UAE’s nationalisation initiatives, designing roles suitable for UAE Nationals with a strategic target workforce composition of "),
                      createVNode("strong", null, "50–60% UAE Nationals"),
                      createTextVNode(".")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-5cf59a26${_scopeId2}>Key terms used throughout: <strong data-v-5cf59a26${_scopeId2}>EOSB</strong> (End of Service Benefits), <strong data-v-5cf59a26${_scopeId2}>Dependants</strong> (immediate family on a Nebras employee’s sponsorship), <strong data-v-5cf59a26${_scopeId2}>Point of origin</strong> (the employee’s country of origin as stated in their contract), <strong data-v-5cf59a26${_scopeId2}>MOH</strong> (Ministry of Health), and <strong data-v-5cf59a26${_scopeId2}>UAEN</strong> (UAE National).</p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode("Key terms used throughout: "),
                      createVNode("strong", null, "EOSB"),
                      createTextVNode(" (End of Service Benefits), "),
                      createVNode("strong", null, "Dependants"),
                      createTextVNode(" (immediate family on a Nebras employee’s sponsorship), "),
                      createVNode("strong", null, "Point of origin"),
                      createTextVNode(" (the employee’s country of origin as stated in their contract), "),
                      createVNode("strong", null, "MOH"),
                      createTextVNode(" (Ministry of Health), and "),
                      createVNode("strong", null, "UAEN"),
                      createTextVNode(" (UAE National).")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, "Governing principles"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "The manual is developed along the guidelines of the UAE Labour Law (Federal Decree-Law No. 33 of 2021, effective 2 February 2022), as amended."),
                  createVNode("li", null, [
                    createTextVNode("In case of inconsistency between the manual and the Labour Law, the "),
                    createVNode("strong", null, "legislation takes precedence"),
                    createTextVNode(".")
                  ]),
                  createVNode("li", null, [
                    createTextVNode("In case of inconsistency between the manual and an employment contract, the "),
                    createVNode("strong", null, "employment contract takes precedence"),
                    createTextVNode(", provided it is not less beneficial than prescribed by law.")
                  ]),
                  createVNode("li", null, "Where a situation is not covered by the manual, the UAE Labour Law is consulted."),
                  createVNode("li", null, "The manual is under the supervision of the CEO; amendments follow the Delegation of Authority, and superseded versions are retained for reference. Queries are registered with the Head of HR.")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Organisation & Emiratisation"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Nebras runs a delayered structure — a CEO at the top with CXOs reporting to the CEO. The structure remains evolutionary and is normally reviewed on a two-year cycle, with changes justified by a business case."),
                  createVNode("li", null, [
                    createTextVNode("Corporate-level structural changes (positions reporting to the CEO and all Functional Heads) require "),
                    createVNode("strong", null, "Board of Managers"),
                    createTextVNode(" approval; changes below Functional Head require "),
                    createVNode("strong", null, "CEO"),
                    createTextVNode(" approval.")
                  ]),
                  createVNode("li", null, [
                    createTextVNode("Nebras supports the UAE’s nationalisation initiatives, designing roles suitable for UAE Nationals with a strategic target workforce composition of "),
                    createVNode("strong", null, "50–60% UAE Nationals"),
                    createTextVNode(".")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, null, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode("Key terms used throughout: "),
                    createVNode("strong", null, "EOSB"),
                    createTextVNode(" (End of Service Benefits), "),
                    createVNode("strong", null, "Dependants"),
                    createTextVNode(" (immediate family on a Nebras employee’s sponsorship), "),
                    createVNode("strong", null, "Point of origin"),
                    createTextVNode(" (the employee’s country of origin as stated in their contract), "),
                    createVNode("strong", null, "MOH"),
                    createTextVNode(" (Ministry of Health), and "),
                    createVNode("strong", null, "UAEN"),
                    createTextVNode(" (UAE National).")
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
        id: "recruitment",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "Recruitment & onboarding",
        title: "Workforce planning through confirmation of service",
        lede: "Human Resources is treated as the company’s most valuable, non-duplicable asset. Staffing follows a structured process aligned to the strategic business plan, with preference given to UAE Nationals consistent with nationalisation directives.",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdStages, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "01",
                    title: "Workforce planning",
                    "num-color": "var(--at-gold)"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-5cf59a26${_scopeId3}>In November the CEO issues a workforce-planning format to Managers and Department Heads. Department Heads finalise requirements and draft job descriptions (reviewed and approved by HR); HR consolidates the total requirement, obtains approval, and initiates recruitment.</p>`);
                      } else {
                        return [
                          createVNode("p", null, "In November the CEO issues a workforce-planning format to Managers and Department Heads. Department Heads finalise requirements and draft job descriptions (reviewed and approved by HR); HR consolidates the total requirement, obtains approval, and initiates recruitment.")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "02",
                    title: "Sourcing & screening",
                    "num-color": "var(--at-gold)"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-5cf59a26${_scopeId3}>Internal candidates are considered first. Candidates are sourced through agencies as appropriate (executive search for grades 1–3; Central Bank HR may assist for Nationals). HR screens applications and shortlists via online or in-person interviews.</p>`);
                      } else {
                        return [
                          createVNode("p", null, "Internal candidates are considered first. Candidates are sourced through agencies as appropriate (executive search for grades 1–3; Central Bank HR may assist for Nationals). HR screens applications and shortlists via online or in-person interviews.")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "03",
                    title: "Selection interview",
                    "num-color": "var(--at-gold)"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-5cf59a26${_scopeId3}>Shortlisted candidates attend a focused interview with the Department Head or manager to assess function-specific competence. Feedback and the order of choice are returned to HR. Selection panels vary by grade, with senior roles reporting to the CEO cleared by the Board of Managers.</p>`);
                      } else {
                        return [
                          createVNode("p", null, "Shortlisted candidates attend a focused interview with the Department Head or manager to assess function-specific competence. Feedback and the order of choice are returned to HR. Selection panels vary by grade, with senior roles reporting to the CEO cleared by the Board of Managers.")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "04",
                    title: "Appointment",
                    "num-color": "var(--at-gold)"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-5cf59a26${_scopeId3}>HR prepares the appointment letter for CEO signature. Every appointment is conditional on a satisfactory medical, completion of visa and immigration formalities, proof of resignation from the previous employer, attested educational certificates, and reference/experience letters.</p>`);
                      } else {
                        return [
                          createVNode("p", null, "HR prepares the appointment letter for CEO signature. Every appointment is conditional on a satisfactory medical, completion of visa and immigration formalities, proof of resignation from the previous employer, attested educational certificates, and reference/experience letters.")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "05",
                    title: "Onboarding & checks",
                    "num-color": "var(--at-gold)"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-5cf59a26${_scopeId3}>Pre-employment background checks are mandatory and tailored to role and seniority — covering sanctions/PEP/security, criminal records, financial history, and professional references. Results are reviewed by HR, the hiring manager, and (where issues arise) the CEO and relevant Board committee, and recorded in the employee file. Board members are reviewed and approved by CBUAE supervision.</p>`);
                      } else {
                        return [
                          createVNode("p", null, "Pre-employment background checks are mandatory and tailored to role and seniority — covering sanctions/PEP/security, criminal records, financial history, and professional references. Results are reviewed by HR, the hiring manager, and (where issues arise) the CEO and relevant Board committee, and recorded in the employee file. Board members are reviewed and approved by CBUAE supervision.")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_EdStage, {
                      num: "01",
                      title: "Workforce planning",
                      "num-color": "var(--at-gold)"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, "In November the CEO issues a workforce-planning format to Managers and Department Heads. Department Heads finalise requirements and draft job descriptions (reviewed and approved by HR); HR consolidates the total requirement, obtains approval, and initiates recruitment.")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_EdStage, {
                      num: "02",
                      title: "Sourcing & screening",
                      "num-color": "var(--at-gold)"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, "Internal candidates are considered first. Candidates are sourced through agencies as appropriate (executive search for grades 1–3; Central Bank HR may assist for Nationals). HR screens applications and shortlists via online or in-person interviews.")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_EdStage, {
                      num: "03",
                      title: "Selection interview",
                      "num-color": "var(--at-gold)"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, "Shortlisted candidates attend a focused interview with the Department Head or manager to assess function-specific competence. Feedback and the order of choice are returned to HR. Selection panels vary by grade, with senior roles reporting to the CEO cleared by the Board of Managers.")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_EdStage, {
                      num: "04",
                      title: "Appointment",
                      "num-color": "var(--at-gold)"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, "HR prepares the appointment letter for CEO signature. Every appointment is conditional on a satisfactory medical, completion of visa and immigration formalities, proof of resignation from the previous employer, attested educational certificates, and reference/experience letters.")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_EdStage, {
                      num: "05",
                      title: "Onboarding & checks",
                      "num-color": "var(--at-gold)"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, "Pre-employment background checks are mandatory and tailored to role and seniority — covering sanctions/PEP/security, criminal records, financial history, and professional references. Results are reviewed by HR, the hiring manager, and (where issues arise) the CEO and relevant Board committee, and recorded in the employee file. Board members are reviewed and approved by CBUAE supervision.")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-5cf59a26${_scopeId}>Probation &amp; confirmation</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-5cf59a26${_scopeId2}>New employees are placed on probation for <strong data-v-5cf59a26${_scopeId2}>six months</strong>. Confirmation may exceptionally occur earlier, but no earlier than <strong data-v-5cf59a26${_scopeId2}>three months</strong> from commencement.</li><li data-v-5cf59a26${_scopeId2}>Towards the end of probation, HR obtains a performance review from the Department Head; a confirmation letter is then issued — signed by HR for grades 7–8 and by the CEO for all other grades.</li><li data-v-5cf59a26${_scopeId2}>Maternity leave may be granted during probation; the probationary period is extended by the equivalent number of days on return.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createTextVNode("New employees are placed on probation for "),
                      createVNode("strong", null, "six months"),
                      createTextVNode(". Confirmation may exceptionally occur earlier, but no earlier than "),
                      createVNode("strong", null, "three months"),
                      createTextVNode(" from commencement.")
                    ]),
                    createVNode("li", null, "Towards the end of probation, HR obtains a performance review from the Department Head; a confirmation letter is then issued — signed by HR for grades 7–8 and by the CEO for all other grades."),
                    createVNode("li", null, "Maternity leave may be granted during probation; the probationary period is extended by the equivalent number of days on return.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-5cf59a26${_scopeId}>Transfers</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-5cf59a26${_scopeId2}>Inter-department transfers require a minimum of <strong data-v-5cf59a26${_scopeId2}>1 year</strong> in the current assignment, a last performance score of at least <strong data-v-5cf59a26${_scopeId2}>4</strong>, and Department Head agreement; UAE Nationals are given preference.</li><li data-v-5cf59a26${_scopeId2}>Intra-departmental transfers are decided by the Department Head with written agreement from the Head of HR.</li><li data-v-5cf59a26${_scopeId2}>Overseas joiners receive relocation support, one-way passage, and up to one month’s hotel accommodation; family residence visa processing fees are borne by the company.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createTextVNode("Inter-department transfers require a minimum of "),
                      createVNode("strong", null, "1 year"),
                      createTextVNode(" in the current assignment, a last performance score of at least "),
                      createVNode("strong", null, "4"),
                      createTextVNode(", and Department Head agreement; UAE Nationals are given preference.")
                    ]),
                    createVNode("li", null, "Intra-departmental transfers are decided by the Department Head with written agreement from the Head of HR."),
                    createVNode("li", null, "Overseas joiners receive relocation support, one-way passage, and up to one month’s hotel accommodation; family residence visa processing fees are borne by the company.")
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
                    title: "Workforce planning",
                    "num-color": "var(--at-gold)"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, "In November the CEO issues a workforce-planning format to Managers and Department Heads. Department Heads finalise requirements and draft job descriptions (reviewed and approved by HR); HR consolidates the total requirement, obtains approval, and initiates recruitment.")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_EdStage, {
                    num: "02",
                    title: "Sourcing & screening",
                    "num-color": "var(--at-gold)"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, "Internal candidates are considered first. Candidates are sourced through agencies as appropriate (executive search for grades 1–3; Central Bank HR may assist for Nationals). HR screens applications and shortlists via online or in-person interviews.")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_EdStage, {
                    num: "03",
                    title: "Selection interview",
                    "num-color": "var(--at-gold)"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, "Shortlisted candidates attend a focused interview with the Department Head or manager to assess function-specific competence. Feedback and the order of choice are returned to HR. Selection panels vary by grade, with senior roles reporting to the CEO cleared by the Board of Managers.")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_EdStage, {
                    num: "04",
                    title: "Appointment",
                    "num-color": "var(--at-gold)"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, "HR prepares the appointment letter for CEO signature. Every appointment is conditional on a satisfactory medical, completion of visa and immigration formalities, proof of resignation from the previous employer, attested educational certificates, and reference/experience letters.")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_EdStage, {
                    num: "05",
                    title: "Onboarding & checks",
                    "num-color": "var(--at-gold)"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, "Pre-employment background checks are mandatory and tailored to role and seniority — covering sanctions/PEP/security, criminal records, financial history, and professional references. Results are reviewed by HR, the hiring manager, and (where issues arise) the CEO and relevant Board committee, and recorded in the employee file. Board members are reviewed and approved by CBUAE supervision.")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode("h3", null, "Probation & confirmation"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createTextVNode("New employees are placed on probation for "),
                    createVNode("strong", null, "six months"),
                    createTextVNode(". Confirmation may exceptionally occur earlier, but no earlier than "),
                    createVNode("strong", null, "three months"),
                    createTextVNode(" from commencement.")
                  ]),
                  createVNode("li", null, "Towards the end of probation, HR obtains a performance review from the Department Head; a confirmation letter is then issued — signed by HR for grades 7–8 and by the CEO for all other grades."),
                  createVNode("li", null, "Maternity leave may be granted during probation; the probationary period is extended by the equivalent number of days on return.")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Transfers"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createTextVNode("Inter-department transfers require a minimum of "),
                    createVNode("strong", null, "1 year"),
                    createTextVNode(" in the current assignment, a last performance score of at least "),
                    createVNode("strong", null, "4"),
                    createTextVNode(", and Department Head agreement; UAE Nationals are given preference.")
                  ]),
                  createVNode("li", null, "Intra-departmental transfers are decided by the Department Head with written agreement from the Head of HR."),
                  createVNode("li", null, "Overseas joiners receive relocation support, one-way passage, and up to one month’s hotel accommodation; family residence visa processing fees are borne by the company.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "working-hours",
        num: "03",
        color: "var(--at-blue)",
        eyebrow: "Working hours & attendance",
        title: "Hours, overtime, remote work, and missions",
        lede: "Working-hours policy follows the Federal Labour Law while supporting operational needs and employee wellbeing.",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-5cf59a26${_scopeId}>Standard hours</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-5cf59a26${_scopeId2}>Standard working time is <strong data-v-5cf59a26${_scopeId2}>8 hours/day</strong>, <strong data-v-5cf59a26${_scopeId2}>4.5 hours on Friday</strong>, totalling <strong data-v-5cf59a26${_scopeId2}>36.5 hours/week</strong> (Labour Law Art. 17). The eight daily hours may be scheduled between 07:30 and 21:00 depending on the role.</li><li data-v-5cf59a26${_scopeId2}>During the holy month of Ramadan, working hours are reduced by at least <strong data-v-5cf59a26${_scopeId2}>two hours</strong>, or as instructed by the Federal Government.</li><li data-v-5cf59a26${_scopeId2}>Shift arrangements are prepared by the Direct Supervisor with HR and CEO approval. Work on weekly days off or public holidays requires prior Department Head approval, with HR informed in advance.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createTextVNode("Standard working time is "),
                      createVNode("strong", null, "8 hours/day"),
                      createTextVNode(", "),
                      createVNode("strong", null, "4.5 hours on Friday"),
                      createTextVNode(", totalling "),
                      createVNode("strong", null, "36.5 hours/week"),
                      createTextVNode(" (Labour Law Art. 17). The eight daily hours may be scheduled between 07:30 and 21:00 depending on the role.")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("During the holy month of Ramadan, working hours are reduced by at least "),
                      createVNode("strong", null, "two hours"),
                      createTextVNode(", or as instructed by the Federal Government.")
                    ]),
                    createVNode("li", null, "Shift arrangements are prepared by the Direct Supervisor with HR and CEO approval. Work on weekly days off or public holidays requires prior Department Head approval, with HR informed in advance.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-5cf59a26${_scopeId}>Overtime</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-5cf59a26${_scopeId2}>Overtime is payable to employees in grades <strong data-v-5cf59a26${_scopeId2}>7–8</strong>, subject to: more than half an hour worked per day; not exceeding <strong data-v-5cf59a26${_scopeId2}>11.5 hours/week</strong>; calculated at basic salary on a pro-rata basis; and capped at <strong data-v-5cf59a26${_scopeId2}>AED 2,000/month</strong>.</li><li data-v-5cf59a26${_scopeId2}>Total working hours including overtime MUST NOT exceed <strong data-v-5cf59a26${_scopeId2}>144 hours over any 3-week period</strong> — a maximum of 11.5 overtime hours in a week. The statutory overtime cap is 2 hours/day (Art. 19), paid at basic + 25% (daytime) or basic + 50%, or a compensatory rest day, for night/holiday work.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createTextVNode("Overtime is payable to employees in grades "),
                      createVNode("strong", null, "7–8"),
                      createTextVNode(", subject to: more than half an hour worked per day; not exceeding "),
                      createVNode("strong", null, "11.5 hours/week"),
                      createTextVNode("; calculated at basic salary on a pro-rata basis; and capped at "),
                      createVNode("strong", null, "AED 2,000/month"),
                      createTextVNode(".")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("Total working hours including overtime MUST NOT exceed "),
                      createVNode("strong", null, "144 hours over any 3-week period"),
                      createTextVNode(" — a maximum of 11.5 overtime hours in a week. The statutory overtime cap is 2 hours/day (Art. 19), paid at basic + 25% (daytime) or basic + 50%, or a compensatory rest day, for night/holiday work.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-5cf59a26${_scopeId}>Flexible &amp; remote work</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-5cf59a26${_scopeId2}>Employees may work remotely up to a defined number of days per year — intended to allow one remote day a week, normally on a Friday. Additional remote work may be agreed with the Direct Supervisor.</li><li data-v-5cf59a26${_scopeId2}>Additional remote work requires a written request at least <strong data-v-5cf59a26${_scopeId2}>two weeks</strong> in advance with justification; the supervisor decides in writing, and agreed performance metrics ensure productivity is maintained.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Employees may work remotely up to a defined number of days per year — intended to allow one remote day a week, normally on a Friday. Additional remote work may be agreed with the Direct Supervisor."),
                    createVNode("li", null, [
                      createTextVNode("Additional remote work requires a written request at least "),
                      createVNode("strong", null, "two weeks"),
                      createTextVNode(" in advance with justification; the supervisor decides in writing, and agreed performance metrics ensure productivity is maintained.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-5cf59a26${_scopeId}>Attendance &amp; official missions</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-5cf59a26${_scopeId2}>Employees unable to report on time for a valid reason MUST inform their immediate superior and submit a leave application on return. Persistent lateness is treated as misconduct.</li><li data-v-5cf59a26${_scopeId2}>Nebras may delegate employees to official missions inside or outside the UAE; missions outside the UAE require CEO approval. Employees remain bound by the code of conduct and MUST respect local laws and customs.</li><li data-v-5cf59a26${_scopeId2}>A UAEN female employee is provided one air ticket for a family member to accompany her on overseas missions, in the same travel class, for first- or second-degree relatives with supporting documents.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Employees unable to report on time for a valid reason MUST inform their immediate superior and submit a leave application on return. Persistent lateness is treated as misconduct."),
                    createVNode("li", null, "Nebras may delegate employees to official missions inside or outside the UAE; missions outside the UAE require CEO approval. Employees remain bound by the code of conduct and MUST respect local laws and customs."),
                    createVNode("li", null, "A UAEN female employee is provided one air ticket for a family member to accompany her on overseas missions, in the same travel class, for first- or second-degree relatives with supporting documents.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, "Standard hours"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createTextVNode("Standard working time is "),
                    createVNode("strong", null, "8 hours/day"),
                    createTextVNode(", "),
                    createVNode("strong", null, "4.5 hours on Friday"),
                    createTextVNode(", totalling "),
                    createVNode("strong", null, "36.5 hours/week"),
                    createTextVNode(" (Labour Law Art. 17). The eight daily hours may be scheduled between 07:30 and 21:00 depending on the role.")
                  ]),
                  createVNode("li", null, [
                    createTextVNode("During the holy month of Ramadan, working hours are reduced by at least "),
                    createVNode("strong", null, "two hours"),
                    createTextVNode(", or as instructed by the Federal Government.")
                  ]),
                  createVNode("li", null, "Shift arrangements are prepared by the Direct Supervisor with HR and CEO approval. Work on weekly days off or public holidays requires prior Department Head approval, with HR informed in advance.")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Overtime"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createTextVNode("Overtime is payable to employees in grades "),
                    createVNode("strong", null, "7–8"),
                    createTextVNode(", subject to: more than half an hour worked per day; not exceeding "),
                    createVNode("strong", null, "11.5 hours/week"),
                    createTextVNode("; calculated at basic salary on a pro-rata basis; and capped at "),
                    createVNode("strong", null, "AED 2,000/month"),
                    createTextVNode(".")
                  ]),
                  createVNode("li", null, [
                    createTextVNode("Total working hours including overtime MUST NOT exceed "),
                    createVNode("strong", null, "144 hours over any 3-week period"),
                    createTextVNode(" — a maximum of 11.5 overtime hours in a week. The statutory overtime cap is 2 hours/day (Art. 19), paid at basic + 25% (daytime) or basic + 50%, or a compensatory rest day, for night/holiday work.")
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "Flexible & remote work"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Employees may work remotely up to a defined number of days per year — intended to allow one remote day a week, normally on a Friday. Additional remote work may be agreed with the Direct Supervisor."),
                  createVNode("li", null, [
                    createTextVNode("Additional remote work requires a written request at least "),
                    createVNode("strong", null, "two weeks"),
                    createTextVNode(" in advance with justification; the supervisor decides in writing, and agreed performance metrics ensure productivity is maintained.")
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "Attendance & official missions"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Employees unable to report on time for a valid reason MUST inform their immediate superior and submit a leave application on return. Persistent lateness is treated as misconduct."),
                  createVNode("li", null, "Nebras may delegate employees to official missions inside or outside the UAE; missions outside the UAE require CEO approval. Employees remain bound by the code of conduct and MUST respect local laws and customs."),
                  createVNode("li", null, "A UAEN female employee is provided one air ticket for a family member to accompany her on overseas missions, in the same travel class, for first- or second-degree relatives with supporting documents.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "leave",
        num: "04",
        color: "var(--at-blue-deep)",
        eyebrow: "Leave & holidays",
        title: "Leave entitlements and public holidays",
        lede: "The company provides several types of leave so employees can rest and return replenished. Public holidays apply as announced by the Federal Government; the CEO circulates upcoming holidays and their duration.",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="table-wrap" data-v-5cf59a26${_scopeId}><table class="leave-table" data-v-5cf59a26${_scopeId}><thead data-v-5cf59a26${_scopeId}><tr data-v-5cf59a26${_scopeId}><th scope="col" data-v-5cf59a26${_scopeId}>Leave type</th><th scope="col" data-v-5cf59a26${_scopeId}>Entitlement</th><th scope="col" data-v-5cf59a26${_scopeId}>Key conditions</th></tr></thead><tbody data-v-5cf59a26${_scopeId}><tr data-v-5cf59a26${_scopeId}><th scope="row" data-v-5cf59a26${_scopeId}>Annual leave</th><td data-v-5cf59a26${_scopeId}>30 working days/year (Art. 29)</td><td data-v-5cf59a26${_scopeId}>Pro-rated for mid-year joiners; does not accrue during unpaid leave or disciplinary suspension; the Direct Supervisor responds to requests within 15 days.</td></tr><tr data-v-5cf59a26${_scopeId}><th scope="row" data-v-5cf59a26${_scopeId}>Short-term sick leave</th><td data-v-5cf59a26${_scopeId}>10 calendar days/year</td><td data-v-5cf59a26${_scopeId}>Defined as up to 5 days; 2–5 days require a medical certificate; a single day may be approved without a certificate up to 3 times/year; Friday plus the following Monday counts as 4 days.</td></tr><tr data-v-5cf59a26${_scopeId}><th scope="row" data-v-5cf59a26${_scopeId}>Long-term sick leave</th><td data-v-5cf59a26${_scopeId}>Up to 90 days/year</td><td data-v-5cf59a26${_scopeId}>Defined as more than 7 consecutive days; validated by the MOH Medical Committee; beyond 3 months the MOH may extend by six months or recommend termination for lack of medical fitness.</td></tr><tr data-v-5cf59a26${_scopeId}><th scope="row" data-v-5cf59a26${_scopeId}>Maternity leave</th><td data-v-5cf59a26${_scopeId}>90 consecutive calendar days, full pay</td><td data-v-5cf59a26${_scopeId}>Plus one nursing hour per working day for 18 months; the employee informs her supervisor at least 3 months before the expected date; may combine with annual leave.</td></tr><tr data-v-5cf59a26${_scopeId}><th scope="row" data-v-5cf59a26${_scopeId}>Paternity leave</th><td data-v-5cf59a26${_scopeId}>10 working days, full pay</td><td data-v-5cf59a26${_scopeId}>Taken consecutively or intermittently within 6 months of birth; birth certificate submitted in support.</td></tr><tr data-v-5cf59a26${_scopeId}><th scope="row" data-v-5cf59a26${_scopeId}>Compassionate leave</th><td data-v-5cf59a26${_scopeId}>10 working days (first-degree); 5 working days (second-degree)</td><td data-v-5cf59a26${_scopeId}>Full pay on bereavement of a family member; may be taken consecutively or over two intervals; documentation may be requested.</td></tr><tr data-v-5cf59a26${_scopeId}><th scope="row" data-v-5cf59a26${_scopeId}>Study &amp; examination leave (UAEN)</th><td data-v-5cf59a26${_scopeId}>15 days/year, plus one hour early daily</td><td data-v-5cf59a26${_scopeId}>Once a year; programme not exceeding 4 years, accredited by the Ministry of Higher Education; may extend one further year on academic justification.</td></tr><tr data-v-5cf59a26${_scopeId}><th scope="row" data-v-5cf59a26${_scopeId}>Hajj leave</th><td data-v-5cf59a26${_scopeId}>Once during employment</td><td data-v-5cf59a26${_scopeId}>Limited to 2 employees/year on a first-come, first-served basis; proof required on return; unused portion cannot be cashed.</td></tr><tr data-v-5cf59a26${_scopeId}><th scope="row" data-v-5cf59a26${_scopeId}>Iddah leave</th><td data-v-5cf59a26${_scopeId}>4 months and 10 days, paid</td><td data-v-5cf59a26${_scopeId}>Muslim female employee, from the date of the husband’s death, per Islamic Sharia; death certificate submitted; cannot be deferred or cashed.</td></tr></tbody></table></div><h3 data-v-5cf59a26${_scopeId}>Availing and accumulation</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-5cf59a26${_scopeId2}>Employees submit tentative annual-leave dates at the start of the year for consolidation into an annual leave plan ensuring fairness and adequate coverage.</li><li data-v-5cf59a26${_scopeId2}>Unused annual leave may be carried forward by no more than <strong data-v-5cf59a26${_scopeId2}>8 days</strong>; leave is not cashed during employment, only at end of service (exceptional further accumulation needs Management approval).</li><li data-v-5cf59a26${_scopeId2}>Unauthorised absence for <strong data-v-5cf59a26${_scopeId2}>seven consecutive days</strong> entitles the company to terminate services. Employees recalled during annual leave have unused days credited back.</li><li data-v-5cf59a26${_scopeId2}>Sick leave taken during annual leave counts as annual leave; if illness extends beyond it, sick leave begins on the scheduled return date subject to a satisfactory medical report.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Employees submit tentative annual-leave dates at the start of the year for consolidation into an annual leave plan ensuring fairness and adequate coverage."),
                    createVNode("li", null, [
                      createTextVNode("Unused annual leave may be carried forward by no more than "),
                      createVNode("strong", null, "8 days"),
                      createTextVNode("; leave is not cashed during employment, only at end of service (exceptional further accumulation needs Management approval).")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("Unauthorised absence for "),
                      createVNode("strong", null, "seven consecutive days"),
                      createTextVNode(" entitles the company to terminate services. Employees recalled during annual leave have unused days credited back.")
                    ]),
                    createVNode("li", null, "Sick leave taken during annual leave counts as annual leave; if illness extends beyond it, sick leave begins on the scheduled return date subject to a satisfactory medical report.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "table-wrap" }, [
                createVNode("table", { class: "leave-table" }, [
                  createVNode("thead", null, [
                    createVNode("tr", null, [
                      createVNode("th", { scope: "col" }, "Leave type"),
                      createVNode("th", { scope: "col" }, "Entitlement"),
                      createVNode("th", { scope: "col" }, "Key conditions")
                    ])
                  ]),
                  createVNode("tbody", null, [
                    createVNode("tr", null, [
                      createVNode("th", { scope: "row" }, "Annual leave"),
                      createVNode("td", null, "30 working days/year (Art. 29)"),
                      createVNode("td", null, "Pro-rated for mid-year joiners; does not accrue during unpaid leave or disciplinary suspension; the Direct Supervisor responds to requests within 15 days.")
                    ]),
                    createVNode("tr", null, [
                      createVNode("th", { scope: "row" }, "Short-term sick leave"),
                      createVNode("td", null, "10 calendar days/year"),
                      createVNode("td", null, "Defined as up to 5 days; 2–5 days require a medical certificate; a single day may be approved without a certificate up to 3 times/year; Friday plus the following Monday counts as 4 days.")
                    ]),
                    createVNode("tr", null, [
                      createVNode("th", { scope: "row" }, "Long-term sick leave"),
                      createVNode("td", null, "Up to 90 days/year"),
                      createVNode("td", null, "Defined as more than 7 consecutive days; validated by the MOH Medical Committee; beyond 3 months the MOH may extend by six months or recommend termination for lack of medical fitness.")
                    ]),
                    createVNode("tr", null, [
                      createVNode("th", { scope: "row" }, "Maternity leave"),
                      createVNode("td", null, "90 consecutive calendar days, full pay"),
                      createVNode("td", null, "Plus one nursing hour per working day for 18 months; the employee informs her supervisor at least 3 months before the expected date; may combine with annual leave.")
                    ]),
                    createVNode("tr", null, [
                      createVNode("th", { scope: "row" }, "Paternity leave"),
                      createVNode("td", null, "10 working days, full pay"),
                      createVNode("td", null, "Taken consecutively or intermittently within 6 months of birth; birth certificate submitted in support.")
                    ]),
                    createVNode("tr", null, [
                      createVNode("th", { scope: "row" }, "Compassionate leave"),
                      createVNode("td", null, "10 working days (first-degree); 5 working days (second-degree)"),
                      createVNode("td", null, "Full pay on bereavement of a family member; may be taken consecutively or over two intervals; documentation may be requested.")
                    ]),
                    createVNode("tr", null, [
                      createVNode("th", { scope: "row" }, "Study & examination leave (UAEN)"),
                      createVNode("td", null, "15 days/year, plus one hour early daily"),
                      createVNode("td", null, "Once a year; programme not exceeding 4 years, accredited by the Ministry of Higher Education; may extend one further year on academic justification.")
                    ]),
                    createVNode("tr", null, [
                      createVNode("th", { scope: "row" }, "Hajj leave"),
                      createVNode("td", null, "Once during employment"),
                      createVNode("td", null, "Limited to 2 employees/year on a first-come, first-served basis; proof required on return; unused portion cannot be cashed.")
                    ]),
                    createVNode("tr", null, [
                      createVNode("th", { scope: "row" }, "Iddah leave"),
                      createVNode("td", null, "4 months and 10 days, paid"),
                      createVNode("td", null, "Muslim female employee, from the date of the husband’s death, per Islamic Sharia; death certificate submitted; cannot be deferred or cashed.")
                    ])
                  ])
                ])
              ]),
              createVNode("h3", null, "Availing and accumulation"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Employees submit tentative annual-leave dates at the start of the year for consolidation into an annual leave plan ensuring fairness and adequate coverage."),
                  createVNode("li", null, [
                    createTextVNode("Unused annual leave may be carried forward by no more than "),
                    createVNode("strong", null, "8 days"),
                    createTextVNode("; leave is not cashed during employment, only at end of service (exceptional further accumulation needs Management approval).")
                  ]),
                  createVNode("li", null, [
                    createTextVNode("Unauthorised absence for "),
                    createVNode("strong", null, "seven consecutive days"),
                    createTextVNode(" entitles the company to terminate services. Employees recalled during annual leave have unused days credited back.")
                  ]),
                  createVNode("li", null, "Sick leave taken during annual leave counts as annual leave; if illness extends beyond it, sick leave begins on the scheduled return date subject to a satisfactory medical report.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "compensation",
        num: "05",
        color: "var(--at-navy)",
        eyebrow: "Compensation & benefits",
        title: "Pay, allowances, and benefits",
        lede: "Compensation is guided by internal equity and external competitiveness, underpinned by a Board-approved job-evaluation methodology that ranks roles by relative value — evaluating the job, not the jobholder.",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-5cf59a26${_scopeId}>Pay structure &amp; cycle</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-5cf59a26${_scopeId2}>Total fixed pay is split <strong data-v-5cf59a26${_scopeId2}>Basic Salary (50%) + Consolidated Allowance (50%)</strong>.</li><li data-v-5cf59a26${_scopeId2}>Fixed pay is processed on the <strong data-v-5cf59a26${_scopeId2}>26th</strong> of each month (or the last working day before, if the 26th is a non-working day).</li><li data-v-5cf59a26${_scopeId2}>Variable pay is finalised and disbursed between <strong data-v-5cf59a26${_scopeId2}>10 January and 28 February</strong> each year, subject to Board approval.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createTextVNode("Total fixed pay is split "),
                      createVNode("strong", null, "Basic Salary (50%) + Consolidated Allowance (50%)"),
                      createTextVNode(".")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("Fixed pay is processed on the "),
                      createVNode("strong", null, "26th"),
                      createTextVNode(" of each month (or the last working day before, if the 26th is a non-working day).")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("Variable pay is finalised and disbursed between "),
                      createVNode("strong", null, "10 January and 28 February"),
                      createTextVNode(" each year, subject to Board approval.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-5cf59a26${_scopeId}>UAE National allowances</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-5cf59a26${_scopeId2}>Child allowance of <strong data-v-5cf59a26${_scopeId2}>AED 600</strong> per child per month, per the family book.</li><li data-v-5cf59a26${_scopeId2}>UAE National premium allowance by grade: grades 1–2 — AED 10,000; grades 3–4 — AED 8,000; grades 5–6 — AED 6,000; grades 7–8 — AED 4,000.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createTextVNode("Child allowance of "),
                      createVNode("strong", null, "AED 600"),
                      createTextVNode(" per child per month, per the family book.")
                    ]),
                    createVNode("li", null, "UAE National premium allowance by grade: grades 1–2 — AED 10,000; grades 3–4 — AED 8,000; grades 5–6 — AED 6,000; grades 7–8 — AED 4,000.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-5cf59a26${_scopeId}>Benefits</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-5cf59a26${_scopeId2}><strong data-v-5cf59a26${_scopeId2}>Health insurance</strong> — covers self and dependants (spouse and 3 children up to age 18 or visa validity); grades 1–2 in category A, grades 3–8 in category B. Double insurance is not permitted; UAE Nationals receive a Thiqa Top-Up plan.</li><li data-v-5cf59a26${_scopeId2}><strong data-v-5cf59a26${_scopeId2}>Group life &amp; personal accident</strong> — all employees are covered (no dependants enrolled).</li><li data-v-5cf59a26${_scopeId2}><strong data-v-5cf59a26${_scopeId2}>Pension</strong> — UAE Nationals are enrolled with GPSSA: employer contributes <strong data-v-5cf59a26${_scopeId2}>15%</strong> and the employee <strong data-v-5cf59a26${_scopeId2}>5%</strong> of pensionable salary; GCC Nationals follow their home-country scheme.</li><li data-v-5cf59a26${_scopeId2}><strong data-v-5cf59a26${_scopeId2}>Education allowance</strong> — per child per annum for up to 3 children aged 3–18 (no cap for UAE Nationals): grade 1 — AED 65,000; grades 2–4 — AED 50,000; grades 5–6 — AED 40,000; grades 7–8 — AED 30,000.</li><li data-v-5cf59a26${_scopeId2}><strong data-v-5cf59a26${_scopeId2}>Housing loan</strong> — grades 1–2 are eligible for an interest-free loan up to AED 120,000 per 6 months, repaid over 6 months; fully repayable on resignation.</li><li data-v-5cf59a26${_scopeId2}><strong data-v-5cf59a26${_scopeId2}>Annual leave airfare</strong> — IATA rate for employee, spouse, and up to 3 children under 18 with valid UAE residency; business class for grades 1–2, economy for grades 3–8.</li><li data-v-5cf59a26${_scopeId2}><strong data-v-5cf59a26${_scopeId2}>Relocation</strong> — international joiners receive one-way passage and hotel accommodation up to 30 nights; grades 1–3 receive a relocation allowance of one Basic Allowance up to AED 25,000.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Health insurance"),
                      createTextVNode(" — covers self and dependants (spouse and 3 children up to age 18 or visa validity); grades 1–2 in category A, grades 3–8 in category B. Double insurance is not permitted; UAE Nationals receive a Thiqa Top-Up plan.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Group life & personal accident"),
                      createTextVNode(" — all employees are covered (no dependants enrolled).")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Pension"),
                      createTextVNode(" — UAE Nationals are enrolled with GPSSA: employer contributes "),
                      createVNode("strong", null, "15%"),
                      createTextVNode(" and the employee "),
                      createVNode("strong", null, "5%"),
                      createTextVNode(" of pensionable salary; GCC Nationals follow their home-country scheme.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Education allowance"),
                      createTextVNode(" — per child per annum for up to 3 children aged 3–18 (no cap for UAE Nationals): grade 1 — AED 65,000; grades 2–4 — AED 50,000; grades 5–6 — AED 40,000; grades 7–8 — AED 30,000.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Housing loan"),
                      createTextVNode(" — grades 1–2 are eligible for an interest-free loan up to AED 120,000 per 6 months, repaid over 6 months; fully repayable on resignation.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Annual leave airfare"),
                      createTextVNode(" — IATA rate for employee, spouse, and up to 3 children under 18 with valid UAE residency; business class for grades 1–2, economy for grades 3–8.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Relocation"),
                      createTextVNode(" — international joiners receive one-way passage and hotel accommodation up to 30 nights; grades 1–3 receive a relocation allowance of one Basic Allowance up to AED 25,000.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-5cf59a26${_scopeId}>Short-term incentives &amp; merit</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-5cf59a26${_scopeId2}>The Board sets the annual bonus pool; incentives are a function of individual performance rating and total fixed monthly pay.</li><li data-v-5cf59a26${_scopeId2}>Employees hired on/before 1 January with no active warning qualify for the bonus; those hired between 2 January and 1 July are pro-rated; those hired after 1 July are not eligible. Graduate trainees are not eligible; employees on military service receive a default 3.00 rating.</li><li data-v-5cf59a26${_scopeId2}>Annual merit increases are at Board discretion, based on performance, position in scale, and cost-of-living/market inflation.</li>`);
                } else {
                  return [
                    createVNode("li", null, "The Board sets the annual bonus pool; incentives are a function of individual performance rating and total fixed monthly pay."),
                    createVNode("li", null, "Employees hired on/before 1 January with no active warning qualify for the bonus; those hired between 2 January and 1 July are pro-rated; those hired after 1 July are not eligible. Graduate trainees are not eligible; employees on military service receive a default 3.00 rating."),
                    createVNode("li", null, "Annual merit increases are at Board discretion, based on performance, position in scale, and cost-of-living/market inflation.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, "Pay structure & cycle"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createTextVNode("Total fixed pay is split "),
                    createVNode("strong", null, "Basic Salary (50%) + Consolidated Allowance (50%)"),
                    createTextVNode(".")
                  ]),
                  createVNode("li", null, [
                    createTextVNode("Fixed pay is processed on the "),
                    createVNode("strong", null, "26th"),
                    createTextVNode(" of each month (or the last working day before, if the 26th is a non-working day).")
                  ]),
                  createVNode("li", null, [
                    createTextVNode("Variable pay is finalised and disbursed between "),
                    createVNode("strong", null, "10 January and 28 February"),
                    createTextVNode(" each year, subject to Board approval.")
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "UAE National allowances"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createTextVNode("Child allowance of "),
                    createVNode("strong", null, "AED 600"),
                    createTextVNode(" per child per month, per the family book.")
                  ]),
                  createVNode("li", null, "UAE National premium allowance by grade: grades 1–2 — AED 10,000; grades 3–4 — AED 8,000; grades 5–6 — AED 6,000; grades 7–8 — AED 4,000.")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Benefits"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Health insurance"),
                    createTextVNode(" — covers self and dependants (spouse and 3 children up to age 18 or visa validity); grades 1–2 in category A, grades 3–8 in category B. Double insurance is not permitted; UAE Nationals receive a Thiqa Top-Up plan.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Group life & personal accident"),
                    createTextVNode(" — all employees are covered (no dependants enrolled).")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Pension"),
                    createTextVNode(" — UAE Nationals are enrolled with GPSSA: employer contributes "),
                    createVNode("strong", null, "15%"),
                    createTextVNode(" and the employee "),
                    createVNode("strong", null, "5%"),
                    createTextVNode(" of pensionable salary; GCC Nationals follow their home-country scheme.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Education allowance"),
                    createTextVNode(" — per child per annum for up to 3 children aged 3–18 (no cap for UAE Nationals): grade 1 — AED 65,000; grades 2–4 — AED 50,000; grades 5–6 — AED 40,000; grades 7–8 — AED 30,000.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Housing loan"),
                    createTextVNode(" — grades 1–2 are eligible for an interest-free loan up to AED 120,000 per 6 months, repaid over 6 months; fully repayable on resignation.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Annual leave airfare"),
                    createTextVNode(" — IATA rate for employee, spouse, and up to 3 children under 18 with valid UAE residency; business class for grades 1–2, economy for grades 3–8.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Relocation"),
                    createTextVNode(" — international joiners receive one-way passage and hotel accommodation up to 30 nights; grades 1–3 receive a relocation allowance of one Basic Allowance up to AED 25,000.")
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "Short-term incentives & merit"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "The Board sets the annual bonus pool; incentives are a function of individual performance rating and total fixed monthly pay."),
                  createVNode("li", null, "Employees hired on/before 1 January with no active warning qualify for the bonus; those hired between 2 January and 1 July are pro-rated; those hired after 1 July are not eligible. Graduate trainees are not eligible; employees on military service receive a default 3.00 rating."),
                  createVNode("li", null, "Annual merit increases are at Board discretion, based on performance, position in scale, and cost-of-living/market inflation.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "performance",
        num: "06",
        color: "var(--at-teal-deep)",
        eyebrow: "Performance & development",
        title: "Performance management, promotion, and learning",
        lede: "The Performance Management Process (PMP) cascades strategic goals to individual SMART objectives, applicable to all levels. Core-competency development carries 20% weighting in the outcome.",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-5cf59a26${_scopeId}>Performance categories</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-5cf59a26${_scopeId2}>Reviews culminate in a category from <strong data-v-5cf59a26${_scopeId2}>5 – Outstanding</strong>, 4 – Exceeds Expectation, 3 – Meeting All Expectations, 2 – Below Expectation, to <strong data-v-5cf59a26${_scopeId2}>1 – Unsatisfactory</strong>.</li><li data-v-5cf59a26${_scopeId2}>Distribution follows a normal (bell-curve) pattern — indicatively 5/10/70/10/5% across the five levels — applied flexibly given the small organisation.</li><li data-v-5cf59a26${_scopeId2}>At least one interim review is conducted during the year, with objectives agreed and signed by appraiser and appraisee.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createTextVNode("Reviews culminate in a category from "),
                      createVNode("strong", null, "5 – Outstanding"),
                      createTextVNode(", 4 – Exceeds Expectation, 3 – Meeting All Expectations, 2 – Below Expectation, to "),
                      createVNode("strong", null, "1 – Unsatisfactory"),
                      createTextVNode(".")
                    ]),
                    createVNode("li", null, "Distribution follows a normal (bell-curve) pattern — indicatively 5/10/70/10/5% across the five levels — applied flexibly given the small organisation."),
                    createVNode("li", null, "At least one interim review is conducted during the year, with objectives agreed and signed by appraiser and appraisee.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-5cf59a26${_scopeId}>Performance Improvement Plan (PIP)</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-5cf59a26${_scopeId2}>An <strong data-v-5cf59a26${_scopeId2}>Unsatisfactory</strong> rating renders the employee liable for immediate discontinuation of service; a <strong data-v-5cf59a26${_scopeId2}>Below Expectation</strong> rating triggers a PIP.</li><li data-v-5cf59a26${_scopeId2}>The PIP is developed by the line manager with the employee, normally over <strong data-v-5cf59a26${_scopeId2}>3 months</strong>, reviewed monthly. It may extend a further 3 months; failure to improve within the extended period leads to termination.</li><li data-v-5cf59a26${_scopeId2}>An underperformer may not transfer to another department until the PIP is completed satisfactorily. Employees who wilfully refuse to perform undergo counselling rather than a PIP.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createTextVNode("An "),
                      createVNode("strong", null, "Unsatisfactory"),
                      createTextVNode(" rating renders the employee liable for immediate discontinuation of service; a "),
                      createVNode("strong", null, "Below Expectation"),
                      createTextVNode(" rating triggers a PIP.")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("The PIP is developed by the line manager with the employee, normally over "),
                      createVNode("strong", null, "3 months"),
                      createTextVNode(", reviewed monthly. It may extend a further 3 months; failure to improve within the extended period leads to termination.")
                    ]),
                    createVNode("li", null, "An underperformer may not transfer to another department until the PIP is completed satisfactorily. Employees who wilfully refuse to perform undergo counselling rather than a PIP.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-5cf59a26${_scopeId}>Promotion &amp; succession</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-5cf59a26${_scopeId2}>Promotions are planned career moves to <strong data-v-5cf59a26${_scopeId2}>vacant</strong> positions only, requiring consistent average PMP scores over the relevant tenure, no active warning, and the potential to hold higher responsibilities. Employees are not promoted to the same grade as their line manager.</li><li data-v-5cf59a26${_scopeId2}>Promotion increments apply to total fixed salary at <strong data-v-5cf59a26${_scopeId2}>10% / 15% / 20%</strong> of gross (by average PMP-score band), or the new grade minimum, whichever is higher. Board approval is required for grades 3–5; CEO for grades 6–8.</li><li data-v-5cf59a26${_scopeId2}>Succession planning applies to section/unit managers and above, and to critical roles; successors are usually identified internally with a time-bound development plan.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createTextVNode("Promotions are planned career moves to "),
                      createVNode("strong", null, "vacant"),
                      createTextVNode(" positions only, requiring consistent average PMP scores over the relevant tenure, no active warning, and the potential to hold higher responsibilities. Employees are not promoted to the same grade as their line manager.")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("Promotion increments apply to total fixed salary at "),
                      createVNode("strong", null, "10% / 15% / 20%"),
                      createTextVNode(" of gross (by average PMP-score band), or the new grade minimum, whichever is higher. Board approval is required for grades 3–5; CEO for grades 6–8.")
                    ]),
                    createVNode("li", null, "Succession planning applies to section/unit managers and above, and to critical roles; successors are usually identified internally with a time-bound development plan.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-5cf59a26${_scopeId}>Learning &amp; development</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-5cf59a26${_scopeId2}>Nebras provides learning mapped to identified development needs. The company may budget annually for training.</li><li data-v-5cf59a26${_scopeId2}>Modes include in-house and external programmes, on-the-job training, structured knowledge-transfer sessions, a new-joiner orientation programme (compliance, AML, health &amp; safety, security), job rotations, coaching and counselling, conferences and seminars, and overseas or blended learning.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Nebras provides learning mapped to identified development needs. The company may budget annually for training."),
                    createVNode("li", null, "Modes include in-house and external programmes, on-the-job training, structured knowledge-transfer sessions, a new-joiner orientation programme (compliance, AML, health & safety, security), job rotations, coaching and counselling, conferences and seminars, and overseas or blended learning.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, "Performance categories"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createTextVNode("Reviews culminate in a category from "),
                    createVNode("strong", null, "5 – Outstanding"),
                    createTextVNode(", 4 – Exceeds Expectation, 3 – Meeting All Expectations, 2 – Below Expectation, to "),
                    createVNode("strong", null, "1 – Unsatisfactory"),
                    createTextVNode(".")
                  ]),
                  createVNode("li", null, "Distribution follows a normal (bell-curve) pattern — indicatively 5/10/70/10/5% across the five levels — applied flexibly given the small organisation."),
                  createVNode("li", null, "At least one interim review is conducted during the year, with objectives agreed and signed by appraiser and appraisee.")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Performance Improvement Plan (PIP)"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createTextVNode("An "),
                    createVNode("strong", null, "Unsatisfactory"),
                    createTextVNode(" rating renders the employee liable for immediate discontinuation of service; a "),
                    createVNode("strong", null, "Below Expectation"),
                    createTextVNode(" rating triggers a PIP.")
                  ]),
                  createVNode("li", null, [
                    createTextVNode("The PIP is developed by the line manager with the employee, normally over "),
                    createVNode("strong", null, "3 months"),
                    createTextVNode(", reviewed monthly. It may extend a further 3 months; failure to improve within the extended period leads to termination.")
                  ]),
                  createVNode("li", null, "An underperformer may not transfer to another department until the PIP is completed satisfactorily. Employees who wilfully refuse to perform undergo counselling rather than a PIP.")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Promotion & succession"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createTextVNode("Promotions are planned career moves to "),
                    createVNode("strong", null, "vacant"),
                    createTextVNode(" positions only, requiring consistent average PMP scores over the relevant tenure, no active warning, and the potential to hold higher responsibilities. Employees are not promoted to the same grade as their line manager.")
                  ]),
                  createVNode("li", null, [
                    createTextVNode("Promotion increments apply to total fixed salary at "),
                    createVNode("strong", null, "10% / 15% / 20%"),
                    createTextVNode(" of gross (by average PMP-score band), or the new grade minimum, whichever is higher. Board approval is required for grades 3–5; CEO for grades 6–8.")
                  ]),
                  createVNode("li", null, "Succession planning applies to section/unit managers and above, and to critical roles; successors are usually identified internally with a time-bound development plan.")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Learning & development"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Nebras provides learning mapped to identified development needs. The company may budget annually for training."),
                  createVNode("li", null, "Modes include in-house and external programmes, on-the-job training, structured knowledge-transfer sessions, a new-joiner orientation programme (compliance, AML, health & safety, security), job rotations, coaching and counselling, conferences and seminars, and overseas or blended learning.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "conduct",
        num: "07",
        color: "var(--at-teal)",
        eyebrow: "Conduct & ethics",
        title: "Professional ethics and code of conduct",
        lede: "How results are achieved matters as much as the results themselves. The code applies to all employees and Board members, reflecting the trust customers place in Nebras with their confidential information and transactions.",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-5cf59a26${_scopeId}>Integrity obligations</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-5cf59a26${_scopeId2}><strong data-v-5cf59a26${_scopeId2}>Conflicts of interest</strong> MUST be disclosed and approved in writing by the Board/CEO. Staff disclose annually; Board members on joining or renewal. Accepted disclosures are stored confidentially by HR for 5 years.</li><li data-v-5cf59a26${_scopeId2}><strong data-v-5cf59a26${_scopeId2}>Gifts &amp; bribes</strong> — commissions, kickbacks, and undesirable gifts MUST NOT be accepted. A gift worth more than <strong data-v-5cf59a26${_scopeId2}>AED 250</strong> must be disclosed in writing to the CEO for permission; the Anti-Bribery &amp; Corruption policy further limits gifts/hospitality to <strong data-v-5cf59a26${_scopeId2}>AED 500</strong>, all declared and logged in an official register.</li><li data-v-5cf59a26${_scopeId2}><strong data-v-5cf59a26${_scopeId2}>Outside activities</strong> — employees MUST NOT be gainfully engaged with another employer during or outside office hours (volunteering and charity are exempt). No preferential treatment or personal borrowing/lending between employees.</li><li data-v-5cf59a26${_scopeId2}><strong data-v-5cf59a26${_scopeId2}>Anti-money laundering</strong> — employees familiarise themselves with relevant federal laws and report suspicious activity to the concerned authorities.</li><li data-v-5cf59a26${_scopeId2}><strong data-v-5cf59a26${_scopeId2}>Confidentiality</strong> — customer and proprietary information MUST NOT be shared with unauthorised third parties; individual salaries and bonuses are not discussed; documents are stored securely and shredded when unwanted.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Conflicts of interest"),
                      createTextVNode(" MUST be disclosed and approved in writing by the Board/CEO. Staff disclose annually; Board members on joining or renewal. Accepted disclosures are stored confidentially by HR for 5 years.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Gifts & bribes"),
                      createTextVNode(" — commissions, kickbacks, and undesirable gifts MUST NOT be accepted. A gift worth more than "),
                      createVNode("strong", null, "AED 250"),
                      createTextVNode(" must be disclosed in writing to the CEO for permission; the Anti-Bribery & Corruption policy further limits gifts/hospitality to "),
                      createVNode("strong", null, "AED 500"),
                      createTextVNode(", all declared and logged in an official register.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Outside activities"),
                      createTextVNode(" — employees MUST NOT be gainfully engaged with another employer during or outside office hours (volunteering and charity are exempt). No preferential treatment or personal borrowing/lending between employees.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Anti-money laundering"),
                      createTextVNode(" — employees familiarise themselves with relevant federal laws and report suspicious activity to the concerned authorities.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Confidentiality"),
                      createTextVNode(" — customer and proprietary information MUST NOT be shared with unauthorised third parties; individual salaries and bonuses are not discussed; documents are stored securely and shredded when unwanted.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-5cf59a26${_scopeId}>Anti-Bribery &amp; Corruption</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-5cf59a26${_scopeId2}>Nebras maintains a zero-tolerance stance aligned with Federal Law No. 7/2016 and CBUAE AML/CFT Guidelines. Third-party vendors are screened for AB&amp;C risk at onboarding; annual risk evaluations are run by the Risk team.</li><li data-v-5cf59a26${_scopeId2}>All transactions and gift declarations are retained for <strong data-v-5cf59a26${_scopeId2}>5 years</strong>; the Head of Risk monitors compliance bi-annually and Internal Audit verifies gift logs at least annually.</li><li data-v-5cf59a26${_scopeId2}>Suspected issues are reported to the Whistle Blowing Committee; investigations are confidential and concluded within <strong data-v-5cf59a26${_scopeId2}>30 days</strong>.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Nebras maintains a zero-tolerance stance aligned with Federal Law No. 7/2016 and CBUAE AML/CFT Guidelines. Third-party vendors are screened for AB&C risk at onboarding; annual risk evaluations are run by the Risk team."),
                    createVNode("li", null, [
                      createTextVNode("All transactions and gift declarations are retained for "),
                      createVNode("strong", null, "5 years"),
                      createTextVNode("; the Head of Risk monitors compliance bi-annually and Internal Audit verifies gift logs at least annually.")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("Suspected issues are reported to the Whistle Blowing Committee; investigations are confidential and concluded within "),
                      createVNode("strong", null, "30 days"),
                      createTextVNode(".")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-5cf59a26${_scopeId}>Workplace conduct</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-5cf59a26${_scopeId2}>Working languages are English and Arabic. Company computers, email, and internet are for business use only and are monitored; only licensed, company-owned software may be installed.</li><li data-v-5cf59a26${_scopeId2}>Smoking (including e-cigarettes) is prohibited anywhere on the premises. ID cards MUST be carried and presented on request; access is limited to areas required for duties.</li><li data-v-5cf59a26${_scopeId2}>Employees follow all health &amp; safety laws and training, report unsafe incidents immediately, and disclose health conditions affecting duties.</li><li data-v-5cf59a26${_scopeId2}><strong data-v-5cf59a26${_scopeId2}>Dress code</strong> — professional and conservative, in line with UAE customs: men wear Kandoora (UAEN) or suit/blazer with collared shirt; women wear Abaya (UAEN) or suit/dress with upper arms covered and skirts below the knee. Denim, shorts, and form-fitting, transparent, or revealing garments are not permitted.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Working languages are English and Arabic. Company computers, email, and internet are for business use only and are monitored; only licensed, company-owned software may be installed."),
                    createVNode("li", null, "Smoking (including e-cigarettes) is prohibited anywhere on the premises. ID cards MUST be carried and presented on request; access is limited to areas required for duties."),
                    createVNode("li", null, "Employees follow all health & safety laws and training, report unsafe incidents immediately, and disclose health conditions affecting duties."),
                    createVNode("li", null, [
                      createVNode("strong", null, "Dress code"),
                      createTextVNode(" — professional and conservative, in line with UAE customs: men wear Kandoora (UAEN) or suit/blazer with collared shirt; women wear Abaya (UAEN) or suit/dress with upper arms covered and skirts below the knee. Denim, shorts, and form-fitting, transparent, or revealing garments are not permitted.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-5cf59a26${_scopeId}>Misconduct &amp; commitments</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-5cf59a26${_scopeId2}>Beyond the acts listed under Labour Law No. 33 of 2021, misconduct includes unauthorised absence, insubordination, failure to follow instructions, disregarding safety, fighting, illegal activity, indecent or coercive conduct, discourtesy, and divulging confidential information.</li><li data-v-5cf59a26${_scopeId2}>Being under the influence of alcohol or controlled substances on the premises is prohibited; possession or dealing in illegal substances results in <strong data-v-5cf59a26${_scopeId2}>instant dismissal</strong> and referral to the authorities.</li><li data-v-5cf59a26${_scopeId2}>Nebras adopts a <strong data-v-5cf59a26${_scopeId2}>zero-tolerance</strong> approach to modern slavery, human trafficking, and forced labour: employment is freely chosen, original documents are not retained, and concerns are reported via the Whistle Blowing Policy.</li><li data-v-5cf59a26${_scopeId2}>Confidentiality obligations continue after severance; company assets and funds are used only for company business and returned on termination.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Beyond the acts listed under Labour Law No. 33 of 2021, misconduct includes unauthorised absence, insubordination, failure to follow instructions, disregarding safety, fighting, illegal activity, indecent or coercive conduct, discourtesy, and divulging confidential information."),
                    createVNode("li", null, [
                      createTextVNode("Being under the influence of alcohol or controlled substances on the premises is prohibited; possession or dealing in illegal substances results in "),
                      createVNode("strong", null, "instant dismissal"),
                      createTextVNode(" and referral to the authorities.")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("Nebras adopts a "),
                      createVNode("strong", null, "zero-tolerance"),
                      createTextVNode(" approach to modern slavery, human trafficking, and forced labour: employment is freely chosen, original documents are not retained, and concerns are reported via the Whistle Blowing Policy.")
                    ]),
                    createVNode("li", null, "Confidentiality obligations continue after severance; company assets and funds are used only for company business and returned on termination.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, "Integrity obligations"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Conflicts of interest"),
                    createTextVNode(" MUST be disclosed and approved in writing by the Board/CEO. Staff disclose annually; Board members on joining or renewal. Accepted disclosures are stored confidentially by HR for 5 years.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Gifts & bribes"),
                    createTextVNode(" — commissions, kickbacks, and undesirable gifts MUST NOT be accepted. A gift worth more than "),
                    createVNode("strong", null, "AED 250"),
                    createTextVNode(" must be disclosed in writing to the CEO for permission; the Anti-Bribery & Corruption policy further limits gifts/hospitality to "),
                    createVNode("strong", null, "AED 500"),
                    createTextVNode(", all declared and logged in an official register.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Outside activities"),
                    createTextVNode(" — employees MUST NOT be gainfully engaged with another employer during or outside office hours (volunteering and charity are exempt). No preferential treatment or personal borrowing/lending between employees.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Anti-money laundering"),
                    createTextVNode(" — employees familiarise themselves with relevant federal laws and report suspicious activity to the concerned authorities.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Confidentiality"),
                    createTextVNode(" — customer and proprietary information MUST NOT be shared with unauthorised third parties; individual salaries and bonuses are not discussed; documents are stored securely and shredded when unwanted.")
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "Anti-Bribery & Corruption"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Nebras maintains a zero-tolerance stance aligned with Federal Law No. 7/2016 and CBUAE AML/CFT Guidelines. Third-party vendors are screened for AB&C risk at onboarding; annual risk evaluations are run by the Risk team."),
                  createVNode("li", null, [
                    createTextVNode("All transactions and gift declarations are retained for "),
                    createVNode("strong", null, "5 years"),
                    createTextVNode("; the Head of Risk monitors compliance bi-annually and Internal Audit verifies gift logs at least annually.")
                  ]),
                  createVNode("li", null, [
                    createTextVNode("Suspected issues are reported to the Whistle Blowing Committee; investigations are confidential and concluded within "),
                    createVNode("strong", null, "30 days"),
                    createTextVNode(".")
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "Workplace conduct"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Working languages are English and Arabic. Company computers, email, and internet are for business use only and are monitored; only licensed, company-owned software may be installed."),
                  createVNode("li", null, "Smoking (including e-cigarettes) is prohibited anywhere on the premises. ID cards MUST be carried and presented on request; access is limited to areas required for duties."),
                  createVNode("li", null, "Employees follow all health & safety laws and training, report unsafe incidents immediately, and disclose health conditions affecting duties."),
                  createVNode("li", null, [
                    createVNode("strong", null, "Dress code"),
                    createTextVNode(" — professional and conservative, in line with UAE customs: men wear Kandoora (UAEN) or suit/blazer with collared shirt; women wear Abaya (UAEN) or suit/dress with upper arms covered and skirts below the knee. Denim, shorts, and form-fitting, transparent, or revealing garments are not permitted.")
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "Misconduct & commitments"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Beyond the acts listed under Labour Law No. 33 of 2021, misconduct includes unauthorised absence, insubordination, failure to follow instructions, disregarding safety, fighting, illegal activity, indecent or coercive conduct, discourtesy, and divulging confidential information."),
                  createVNode("li", null, [
                    createTextVNode("Being under the influence of alcohol or controlled substances on the premises is prohibited; possession or dealing in illegal substances results in "),
                    createVNode("strong", null, "instant dismissal"),
                    createTextVNode(" and referral to the authorities.")
                  ]),
                  createVNode("li", null, [
                    createTextVNode("Nebras adopts a "),
                    createVNode("strong", null, "zero-tolerance"),
                    createTextVNode(" approach to modern slavery, human trafficking, and forced labour: employment is freely chosen, original documents are not retained, and concerns are reported via the Whistle Blowing Policy.")
                  ]),
                  createVNode("li", null, "Confidentiality obligations continue after severance; company assets and funds are used only for company business and returned on termination.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "grievance",
        num: "08",
        color: "var(--at-gold)",
        eyebrow: "Grievance & disciplinary",
        title: "Raising concerns and corrective action",
        lede: "People management is treated as a positive process. Grievances are resolved informally and confidentially where possible; disciplinary procedure is a last resort after efforts to improve conduct or performance.",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-5cf59a26${_scopeId}>Grievance procedure</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-5cf59a26${_scopeId2}>Covers perceived unfair treatment, working conditions, interpersonal conflicts, and matters under Article 111 of the Labour Law — but cannot be used to appeal a disciplinary action already initiated (a separate appeals process applies).</li><li data-v-5cf59a26${_scopeId2}>The employee raises the concern in writing to the immediate supervisor/manager or HR, who aim to resolve it within <strong data-v-5cf59a26${_scopeId2}>3 days</strong>; unresolved matters escalate to the Department Head, then HR.</li><li data-v-5cf59a26${_scopeId2}>If still unresolved, HR (or the CEO, for Manager-and-above) constitutes an ad-hoc committee of up to <strong data-v-5cf59a26${_scopeId2}>3 members</strong>. The whole process is completed within <strong data-v-5cf59a26${_scopeId2}>15 days</strong>, with the final decision communicated in writing by HR.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Covers perceived unfair treatment, working conditions, interpersonal conflicts, and matters under Article 111 of the Labour Law — but cannot be used to appeal a disciplinary action already initiated (a separate appeals process applies)."),
                    createVNode("li", null, [
                      createTextVNode("The employee raises the concern in writing to the immediate supervisor/manager or HR, who aim to resolve it within "),
                      createVNode("strong", null, "3 days"),
                      createTextVNode("; unresolved matters escalate to the Department Head, then HR.")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("If still unresolved, HR (or the CEO, for Manager-and-above) constitutes an ad-hoc committee of up to "),
                      createVNode("strong", null, "3 members"),
                      createTextVNode(". The whole process is completed within "),
                      createVNode("strong", null, "15 days"),
                      createTextVNode(", with the final decision communicated in writing by HR.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-5cf59a26${_scopeId}>Disciplinary process</h3>`);
            _push2(ssrRenderComponent(_component_EdStages, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "01",
                    title: "Investigation",
                    "num-color": "var(--at-gold)"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-5cf59a26${_scopeId3}>On becoming aware of misconduct, the immediate supervisor investigates, discusses the incident with the employee, gives them the opportunity to explain, and records the discussion and any commitment to improve.</p>`);
                      } else {
                        return [
                          createVNode("p", null, "On becoming aware of misconduct, the immediate supervisor investigates, discusses the incident with the employee, gives them the opportunity to explain, and records the discussion and any commitment to improve.")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "02",
                    title: "Escalation",
                    "num-color": "var(--at-gold)"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-5cf59a26${_scopeId3}>More serious matters are reported to the Department Head in writing (findings, employee responses, recommendation). The Department Head meets the employee and supervisor within 3 days and may involve HR.</p>`);
                      } else {
                        return [
                          createVNode("p", null, "More serious matters are reported to the Department Head in writing (findings, employee responses, recommendation). The Department Head meets the employee and supervisor within 3 days and may involve HR.")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "03",
                    title: "Committee",
                    "num-color": "var(--at-gold)"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-5cf59a26${_scopeId3}>For employees below Manager, HR constitutes a 3-member investigation committee; for Manager and above, the committee is constituted by the CEO and works under the CEO’s guidance.</p>`);
                      } else {
                        return [
                          createVNode("p", null, "For employees below Manager, HR constitutes a 3-member investigation committee; for Manager and above, the committee is constituted by the CEO and works under the CEO’s guidance.")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "04",
                    title: "Decision",
                    "num-color": "var(--at-gold)"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-5cf59a26${_scopeId3}>Actions escalate through verbal warning, first written warning, final written warning, to termination. Discontinuation of a Manager’s service requires approval from the relevant Board committee; other terminations require CEO approval.</p>`);
                      } else {
                        return [
                          createVNode("p", null, "Actions escalate through verbal warning, first written warning, final written warning, to termination. Discontinuation of a Manager’s service requires approval from the relevant Board committee; other terminations require CEO approval.")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "05",
                    title: "Closure",
                    "num-color": "var(--at-gold)"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-5cf59a26${_scopeId3}>Disciplinary letters are signed by the Department Head/CEO and documented in the employee record. The procedure is concluded within <strong data-v-5cf59a26${_scopeId3}>30 days</strong> of occurrence or reporting to HR.</p>`);
                      } else {
                        return [
                          createVNode("p", null, [
                            createTextVNode("Disciplinary letters are signed by the Department Head/CEO and documented in the employee record. The procedure is concluded within "),
                            createVNode("strong", null, "30 days"),
                            createTextVNode(" of occurrence or reporting to HR.")
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_EdStage, {
                      num: "01",
                      title: "Investigation",
                      "num-color": "var(--at-gold)"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, "On becoming aware of misconduct, the immediate supervisor investigates, discusses the incident with the employee, gives them the opportunity to explain, and records the discussion and any commitment to improve.")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_EdStage, {
                      num: "02",
                      title: "Escalation",
                      "num-color": "var(--at-gold)"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, "More serious matters are reported to the Department Head in writing (findings, employee responses, recommendation). The Department Head meets the employee and supervisor within 3 days and may involve HR.")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_EdStage, {
                      num: "03",
                      title: "Committee",
                      "num-color": "var(--at-gold)"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, "For employees below Manager, HR constitutes a 3-member investigation committee; for Manager and above, the committee is constituted by the CEO and works under the CEO’s guidance.")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_EdStage, {
                      num: "04",
                      title: "Decision",
                      "num-color": "var(--at-gold)"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, "Actions escalate through verbal warning, first written warning, final written warning, to termination. Discontinuation of a Manager’s service requires approval from the relevant Board committee; other terminations require CEO approval.")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_EdStage, {
                      num: "05",
                      title: "Closure",
                      "num-color": "var(--at-gold)"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, [
                          createTextVNode("Disciplinary letters are signed by the Department Head/CEO and documented in the employee record. The procedure is concluded within "),
                          createVNode("strong", null, "30 days"),
                          createTextVNode(" of occurrence or reporting to HR.")
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-5cf59a26${_scopeId2}>No disciplinary action is taken without a proper enquiry recorded in writing, and employees MUST be given a fair chance to defend themselves. The committee may recommend suspension pending inquiry (without pay where a crime is alleged). No employee under inquiry may resign until it concludes. An employee proved innocent is reinstated with salary for the suspension period.</p>`);
                } else {
                  return [
                    createVNode("p", null, "No disciplinary action is taken without a proper enquiry recorded in writing, and employees MUST be given a fair chance to defend themselves. The committee may recommend suspension pending inquiry (without pay where a crime is alleged). No employee under inquiry may resign until it concludes. An employee proved innocent is reinstated with salary for the suspension period.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, "Grievance procedure"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Covers perceived unfair treatment, working conditions, interpersonal conflicts, and matters under Article 111 of the Labour Law — but cannot be used to appeal a disciplinary action already initiated (a separate appeals process applies)."),
                  createVNode("li", null, [
                    createTextVNode("The employee raises the concern in writing to the immediate supervisor/manager or HR, who aim to resolve it within "),
                    createVNode("strong", null, "3 days"),
                    createTextVNode("; unresolved matters escalate to the Department Head, then HR.")
                  ]),
                  createVNode("li", null, [
                    createTextVNode("If still unresolved, HR (or the CEO, for Manager-and-above) constitutes an ad-hoc committee of up to "),
                    createVNode("strong", null, "3 members"),
                    createTextVNode(". The whole process is completed within "),
                    createVNode("strong", null, "15 days"),
                    createTextVNode(", with the final decision communicated in writing by HR.")
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "Disciplinary process"),
              createVNode(_component_EdStages, null, {
                default: withCtx(() => [
                  createVNode(_component_EdStage, {
                    num: "01",
                    title: "Investigation",
                    "num-color": "var(--at-gold)"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, "On becoming aware of misconduct, the immediate supervisor investigates, discusses the incident with the employee, gives them the opportunity to explain, and records the discussion and any commitment to improve.")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_EdStage, {
                    num: "02",
                    title: "Escalation",
                    "num-color": "var(--at-gold)"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, "More serious matters are reported to the Department Head in writing (findings, employee responses, recommendation). The Department Head meets the employee and supervisor within 3 days and may involve HR.")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_EdStage, {
                    num: "03",
                    title: "Committee",
                    "num-color": "var(--at-gold)"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, "For employees below Manager, HR constitutes a 3-member investigation committee; for Manager and above, the committee is constituted by the CEO and works under the CEO’s guidance.")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_EdStage, {
                    num: "04",
                    title: "Decision",
                    "num-color": "var(--at-gold)"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, "Actions escalate through verbal warning, first written warning, final written warning, to termination. Discontinuation of a Manager’s service requires approval from the relevant Board committee; other terminations require CEO approval.")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_EdStage, {
                    num: "05",
                    title: "Closure",
                    "num-color": "var(--at-gold)"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, [
                        createTextVNode("Disciplinary letters are signed by the Department Head/CEO and documented in the employee record. The procedure is concluded within "),
                        createVNode("strong", null, "30 days"),
                        createTextVNode(" of occurrence or reporting to HR.")
                      ])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, null, {
                default: withCtx(() => [
                  createVNode("p", null, "No disciplinary action is taken without a proper enquiry recorded in writing, and employees MUST be given a fair chance to defend themselves. The committee may recommend suspension pending inquiry (without pay where a crime is alleged). No employee under inquiry may resign until it concludes. An employee proved innocent is reinstated with salary for the suspension period.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "end-of-service",
        num: "09",
        color: "var(--at-blue)",
        eyebrow: "End of service",
        title: "Resignation, termination, and benefits",
        lede: "Employment ends through resignation, termination, retirement, or death. The company will not terminate without careful consideration and full compliance with the UAE Labour Law.",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-5cf59a26${_scopeId}>Notice periods</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-5cf59a26${_scopeId2}>Employer termination during probation — <strong data-v-5cf59a26${_scopeId2}>14 days</strong>.</li><li data-v-5cf59a26${_scopeId2}>Resignation during probation to leave the UAE — <strong data-v-5cf59a26${_scopeId2}>14 days</strong>; to join another UAE employer — <strong data-v-5cf59a26${_scopeId2}>30 days</strong>.</li><li data-v-5cf59a26${_scopeId2}>Termination or resignation outside probation — <strong data-v-5cf59a26${_scopeId2}>30–90 days</strong> (minimum 30), as specified in the appointment letter.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createTextVNode("Employer termination during probation — "),
                      createVNode("strong", null, "14 days"),
                      createTextVNode(".")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("Resignation during probation to leave the UAE — "),
                      createVNode("strong", null, "14 days"),
                      createTextVNode("; to join another UAE employer — "),
                      createVNode("strong", null, "30 days"),
                      createTextVNode(".")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("Termination or resignation outside probation — "),
                      createVNode("strong", null, "30–90 days"),
                      createTextVNode(" (minimum 30), as specified in the appointment letter.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-5cf59a26${_scopeId}>Resignation, retirement &amp; death</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-5cf59a26${_scopeId2}>A confirmed employee resigns by letter to the Department Head/manager with the agreed notice; HR issues an acceptance letter and completes full and final settlement after handover. Visa/sponsorship is cancelled or transferred within two months of the last working day.</li><li data-v-5cf59a26${_scopeId2}>Retirement age is <strong data-v-5cf59a26${_scopeId2}>65</strong> for Nationals and <strong data-v-5cf59a26${_scopeId2}>60</strong> for expatriates, with 3 months’ advance notice; the Board may extend service by up to 1 year.</li><li data-v-5cf59a26${_scopeId2}>On death, the contract ends from the death-certificate date; legal heirs receive applicable EOSB, and the company repatriates the remains and eligible dependants.</li>`);
                } else {
                  return [
                    createVNode("li", null, "A confirmed employee resigns by letter to the Department Head/manager with the agreed notice; HR issues an acceptance letter and completes full and final settlement after handover. Visa/sponsorship is cancelled or transferred within two months of the last working day."),
                    createVNode("li", null, [
                      createTextVNode("Retirement age is "),
                      createVNode("strong", null, "65"),
                      createTextVNode(" for Nationals and "),
                      createVNode("strong", null, "60"),
                      createTextVNode(" for expatriates, with 3 months’ advance notice; the Board may extend service by up to 1 year.")
                    ]),
                    createVNode("li", null, "On death, the contract ends from the death-certificate date; legal heirs receive applicable EOSB, and the company repatriates the remains and eligible dependants.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-5cf59a26${_scopeId}>End-of-service payments</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-5cf59a26${_scopeId2}>Settlement includes salary to the last working day, payment in lieu of accrued annual leave, pro-rata annual air passage (if 6+ months completed since the last entitlement), and notice-period salary where applicable.</li><li data-v-5cf59a26${_scopeId2}>Repatriation: a one-way ticket home for self and dependants once the visa is cancelled; grades 1–3 receive a repatriation allowance up to <strong data-v-5cf59a26${_scopeId2}>AED 5,000</strong>. Not payable if transferring to another UAE role.</li><li data-v-5cf59a26${_scopeId2}><strong data-v-5cf59a26${_scopeId2}>Gratuity</strong> — non-national employees are entitled to <strong data-v-5cf59a26${_scopeId2}>one month’s basic salary for each year</strong> of continuous service (based on last basic salary); employees with less than one year receive none. UAE Nationals’ EOSB is calculated under Federal Pension &amp; Social Security Law No. 7 of 1999, as amended.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Settlement includes salary to the last working day, payment in lieu of accrued annual leave, pro-rata annual air passage (if 6+ months completed since the last entitlement), and notice-period salary where applicable."),
                    createVNode("li", null, [
                      createTextVNode("Repatriation: a one-way ticket home for self and dependants once the visa is cancelled; grades 1–3 receive a repatriation allowance up to "),
                      createVNode("strong", null, "AED 5,000"),
                      createTextVNode(". Not payable if transferring to another UAE role.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Gratuity"),
                      createTextVNode(" — non-national employees are entitled to "),
                      createVNode("strong", null, "one month’s basic salary for each year"),
                      createTextVNode(" of continuous service (based on last basic salary); employees with less than one year receive none. UAE Nationals’ EOSB is calculated under Federal Pension & Social Security Law No. 7 of 1999, as amended.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-5cf59a26${_scopeId2}>The manual also references the Labour Law gratuity scale (Art. 51): <strong data-v-5cf59a26${_scopeId2}>21 days</strong>’ basic wage per year for 1–5 years’ service and <strong data-v-5cf59a26${_scopeId2}>30 days</strong>’ basic wage per year beyond 5 years, capped at a maximum of two years’ wage, with pro-rata treatment for part-time or temporary contracts where stated.</p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode("The manual also references the Labour Law gratuity scale (Art. 51): "),
                      createVNode("strong", null, "21 days"),
                      createTextVNode("’ basic wage per year for 1–5 years’ service and "),
                      createVNode("strong", null, "30 days"),
                      createTextVNode("’ basic wage per year beyond 5 years, capped at a maximum of two years’ wage, with pro-rata treatment for part-time or temporary contracts where stated.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-5cf59a26${_scopeId}>Off-boarding</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-5cf59a26${_scopeId2}><strong data-v-5cf59a26${_scopeId2}>System access</strong> is revoked immediately across all systems.</li><li data-v-5cf59a26${_scopeId2}><strong data-v-5cf59a26${_scopeId2}>Final settlement</strong> is paid within <strong data-v-5cf59a26${_scopeId2}>14 days</strong>, per Federal Law No. 33/2021.</li><li data-v-5cf59a26${_scopeId2}><strong data-v-5cf59a26${_scopeId2}>Assets</strong> — access cards, devices, and ID are collected and their return logged by HR; unreturned property is recovered from final dues. Exit interviews may be conducted after dues are paid.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "System access"),
                      createTextVNode(" is revoked immediately across all systems.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Final settlement"),
                      createTextVNode(" is paid within "),
                      createVNode("strong", null, "14 days"),
                      createTextVNode(", per Federal Law No. 33/2021.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Assets"),
                      createTextVNode(" — access cards, devices, and ID are collected and their return logged by HR; unreturned property is recovered from final dues. Exit interviews may be conducted after dues are paid.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, "Notice periods"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createTextVNode("Employer termination during probation — "),
                    createVNode("strong", null, "14 days"),
                    createTextVNode(".")
                  ]),
                  createVNode("li", null, [
                    createTextVNode("Resignation during probation to leave the UAE — "),
                    createVNode("strong", null, "14 days"),
                    createTextVNode("; to join another UAE employer — "),
                    createVNode("strong", null, "30 days"),
                    createTextVNode(".")
                  ]),
                  createVNode("li", null, [
                    createTextVNode("Termination or resignation outside probation — "),
                    createVNode("strong", null, "30–90 days"),
                    createTextVNode(" (minimum 30), as specified in the appointment letter.")
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "Resignation, retirement & death"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "A confirmed employee resigns by letter to the Department Head/manager with the agreed notice; HR issues an acceptance letter and completes full and final settlement after handover. Visa/sponsorship is cancelled or transferred within two months of the last working day."),
                  createVNode("li", null, [
                    createTextVNode("Retirement age is "),
                    createVNode("strong", null, "65"),
                    createTextVNode(" for Nationals and "),
                    createVNode("strong", null, "60"),
                    createTextVNode(" for expatriates, with 3 months’ advance notice; the Board may extend service by up to 1 year.")
                  ]),
                  createVNode("li", null, "On death, the contract ends from the death-certificate date; legal heirs receive applicable EOSB, and the company repatriates the remains and eligible dependants.")
                ]),
                _: 1
              }),
              createVNode("h3", null, "End-of-service payments"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Settlement includes salary to the last working day, payment in lieu of accrued annual leave, pro-rata annual air passage (if 6+ months completed since the last entitlement), and notice-period salary where applicable."),
                  createVNode("li", null, [
                    createTextVNode("Repatriation: a one-way ticket home for self and dependants once the visa is cancelled; grades 1–3 receive a repatriation allowance up to "),
                    createVNode("strong", null, "AED 5,000"),
                    createTextVNode(". Not payable if transferring to another UAE role.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Gratuity"),
                    createTextVNode(" — non-national employees are entitled to "),
                    createVNode("strong", null, "one month’s basic salary for each year"),
                    createTextVNode(" of continuous service (based on last basic salary); employees with less than one year receive none. UAE Nationals’ EOSB is calculated under Federal Pension & Social Security Law No. 7 of 1999, as amended.")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, null, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode("The manual also references the Labour Law gratuity scale (Art. 51): "),
                    createVNode("strong", null, "21 days"),
                    createTextVNode("’ basic wage per year for 1–5 years’ service and "),
                    createVNode("strong", null, "30 days"),
                    createTextVNode("’ basic wage per year beyond 5 years, capped at a maximum of two years’ wage, with pro-rata treatment for part-time or temporary contracts where stated.")
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "Off-boarding"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "System access"),
                    createTextVNode(" is revoked immediately across all systems.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Final settlement"),
                    createTextVNode(" is paid within "),
                    createVNode("strong", null, "14 days"),
                    createTextVNode(", per Federal Law No. 33/2021.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Assets"),
                    createTextVNode(" — access cards, devices, and ID are collected and their return logged by HR; unreturned property is recovered from final dues. Exit interviews may be conducted after dues are paid.")
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
        id: "whistleblowing",
        num: "10",
        color: "var(--at-blue-deep)",
        eyebrow: "Whistleblowing & disclosure",
        title: "Speaking up, disclosures, and behaviours",
        lede: "The Whistle Blowing Policy provides a safe, confidential channel to raise evidenced concerns without fear of victimisation, complementing — not replacing — other channels and the code of conduct.",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-5cf59a26${_scopeId}>Whistleblowing</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-5cf59a26${_scopeId2}>Reportable concerns include unethical conduct, fraud, conflicts of interest, confidentiality breaches, theft, bribery, money laundering, misrepresentation of financials, discrimination or harassment, health &amp; safety hazards, and suspected modern slavery or human trafficking.</li><li data-v-5cf59a26${_scopeId2}>Concerns are submitted in writing, signed, in a sealed envelope marked “Highly Confidential – WB” to the designated Board member/CEO. The sender MUST NOT write their name on the outside; <strong data-v-5cf59a26${_scopeId2}>anonymous letters are not actioned</strong>.</li><li data-v-5cf59a26${_scopeId2}>An ad-hoc Whistle Blowing Committee (WBC) of no more than 3 members — typically the Head of Internal Audit, Head of Risk, and Board members — commences investigation no later than <strong data-v-5cf59a26${_scopeId2}>3 working days</strong>, preserving confidentiality throughout.</li><li data-v-5cf59a26${_scopeId2}>Whistleblowers are protected from retaliation and their anonymity preserved where possible; false or malicious whistleblowing attracts disciplinary action. A whistleblower may be rewarded where the company avoids reputational or financial loss.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Reportable concerns include unethical conduct, fraud, conflicts of interest, confidentiality breaches, theft, bribery, money laundering, misrepresentation of financials, discrimination or harassment, health & safety hazards, and suspected modern slavery or human trafficking."),
                    createVNode("li", null, [
                      createTextVNode("Concerns are submitted in writing, signed, in a sealed envelope marked “Highly Confidential – WB” to the designated Board member/CEO. The sender MUST NOT write their name on the outside; "),
                      createVNode("strong", null, "anonymous letters are not actioned"),
                      createTextVNode(".")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("An ad-hoc Whistle Blowing Committee (WBC) of no more than 3 members — typically the Head of Internal Audit, Head of Risk, and Board members — commences investigation no later than "),
                      createVNode("strong", null, "3 working days"),
                      createTextVNode(", preserving confidentiality throughout.")
                    ]),
                    createVNode("li", null, "Whistleblowers are protected from retaliation and their anonymity preserved where possible; false or malicious whistleblowing attracts disciplinary action. A whistleblower may be rewarded where the company avoids reputational or financial loss.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-5cf59a26${_scopeId}>Disclosure policy</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-5cf59a26${_scopeId2}><strong data-v-5cf59a26${_scopeId2}>Outward disclosures</strong> of customer or proprietary information require the CEO’s written consent, a demonstrated need-to-know, and documents marked “Confidential”.</li><li data-v-5cf59a26${_scopeId2}><strong data-v-5cf59a26${_scopeId2}>Inward disclosures</strong> are mandatory (at joining) — business interests with Nebras or CBUAE, relations/investments with LFIs, and relatives in the Central Bank, banks, or regulatory bodies — or event-based (vendor interests, conflicts arising in employment). Disclosures are updated yearly.</li><li data-v-5cf59a26${_scopeId2}>Non-compliance — false, incomplete, or late disclosures — attracts disciplinary action. HR conducts a preliminary investigation and proposes action to the CEO; grievous cases may go to an investigation committee and the Board.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Outward disclosures"),
                      createTextVNode(" of customer or proprietary information require the CEO’s written consent, a demonstrated need-to-know, and documents marked “Confidential”.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Inward disclosures"),
                      createTextVNode(" are mandatory (at joining) — business interests with Nebras or CBUAE, relations/investments with LFIs, and relatives in the Central Bank, banks, or regulatory bodies — or event-based (vendor interests, conflicts arising in employment). Disclosures are updated yearly.")
                    ]),
                    createVNode("li", null, "Non-compliance — false, incomplete, or late disclosures — attracts disciplinary action. HR conducts a preliminary investigation and proposes action to the CEO; grievous cases may go to an investigation committee and the Board.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-5cf59a26${_scopeId}>Nebras behaviours</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-5cf59a26${_scopeId2}>The company’s culture is anchored in eight core behaviours: ownership, proactivity &amp; accountability; setting a high bar with the grit to evolve an industry; a bias toward pertinent action grounded in nuance; being built for compliance &amp; trust; transparent engagement and aligned execution; staying humble and curious; customer obsession while inventing the future; and being lean, collaborative &amp; supportive across entity boundaries.</p>`);
                } else {
                  return [
                    createVNode("p", null, "The company’s culture is anchored in eight core behaviours: ownership, proactivity & accountability; setting a high bar with the grit to evolve an industry; a bias toward pertinent action grounded in nuance; being built for compliance & trust; transparent engagement and aligned execution; staying humble and curious; customer obsession while inventing the future; and being lean, collaborative & supportive across entity boundaries.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, "Whistleblowing"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Reportable concerns include unethical conduct, fraud, conflicts of interest, confidentiality breaches, theft, bribery, money laundering, misrepresentation of financials, discrimination or harassment, health & safety hazards, and suspected modern slavery or human trafficking."),
                  createVNode("li", null, [
                    createTextVNode("Concerns are submitted in writing, signed, in a sealed envelope marked “Highly Confidential – WB” to the designated Board member/CEO. The sender MUST NOT write their name on the outside; "),
                    createVNode("strong", null, "anonymous letters are not actioned"),
                    createTextVNode(".")
                  ]),
                  createVNode("li", null, [
                    createTextVNode("An ad-hoc Whistle Blowing Committee (WBC) of no more than 3 members — typically the Head of Internal Audit, Head of Risk, and Board members — commences investigation no later than "),
                    createVNode("strong", null, "3 working days"),
                    createTextVNode(", preserving confidentiality throughout.")
                  ]),
                  createVNode("li", null, "Whistleblowers are protected from retaliation and their anonymity preserved where possible; false or malicious whistleblowing attracts disciplinary action. A whistleblower may be rewarded where the company avoids reputational or financial loss.")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Disclosure policy"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Outward disclosures"),
                    createTextVNode(" of customer or proprietary information require the CEO’s written consent, a demonstrated need-to-know, and documents marked “Confidential”.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Inward disclosures"),
                    createTextVNode(" are mandatory (at joining) — business interests with Nebras or CBUAE, relations/investments with LFIs, and relatives in the Central Bank, banks, or regulatory bodies — or event-based (vendor interests, conflicts arising in employment). Disclosures are updated yearly.")
                  ]),
                  createVNode("li", null, "Non-compliance — false, incomplete, or late disclosures — attracts disciplinary action. HR conducts a preliminary investigation and proposes action to the CEO; grievous cases may go to an investigation committee and the Board.")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Nebras behaviours"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("p", null, "The company’s culture is anchored in eight core behaviours: ownership, proactivity & accountability; setting a high bar with the grit to evolve an industry; a bias toward pertinent action grounded in nuance; being built for compliance & trust; transparent engagement and aligned execution; staying humble and curious; customer obsession while inventing the future; and being lean, collaborative & supportive across entity boundaries.")
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
              desc: "The Board, committee, and Delegation of Authority framework that approves HR structure, remuneration, and senior appointments."
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRelatedCard, {
              href: "/internal/policies/information-security",
              category: "Risk, Security & Compliance",
              title: "Information Security Policy",
              desc: "The access, monitoring, and data-protection controls underpinning acceptable use, confidentiality, and off-boarding revocation."
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdRelatedCard, {
                href: "/internal/policies/corporate-governance",
                category: "Governance & Oversight",
                title: "Corporate Governance Policy",
                desc: "The Board, committee, and Delegation of Authority framework that approves HR structure, remuneration, and senior appointments."
              }),
              createVNode(_component_EdRelatedCard, {
                href: "/internal/policies/information-security",
                category: "Risk, Security & Compliance",
                title: "Information Security Policy",
                desc: "The access, monitoring, and data-protection controls underpinning acceptable use, confidentiality, and off-boarding revocation."
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/internal/policies/hr.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const hr = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-5cf59a26"]]);
export {
  hr as default
};
