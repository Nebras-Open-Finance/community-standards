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
  __name: "complaints-and-disputes",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({ title: "Complaints and Disputes Management Policy · Internal Policies" });
    const sections = [
      { id: "overview", label: "Overview" },
      { id: "scope", label: "Scope & definitions" },
      { id: "categories", label: "Categories" },
      { id: "workflow", label: "Workflow" },
      { id: "slas", label: "SLAs & appeals" },
      { id: "responsibilities", label: "Responsibilities" },
      { id: "records", label: "Records & monitoring" }
    ];
    const meta = [
      { label: "Applies to", value: "Nebras · LFIs · TPPs" },
      { label: "Classification", value: "Restricted" },
      { label: "Version", value: "1.0 · Aug 2025" }
    ];
    const keyNums = [
      { value: "24", unit: "h", label: "Acknowledgment of a raised dispute" },
      { value: "10–15", unit: "days", label: "Resolution of empirical disputes" },
      { value: "5", unit: "yr", label: "Minimum record retention" }
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-page" }, _attrs))} data-v-f523c309>`);
      _push(ssrRenderComponent(_component_EdBackStrip, {
        href: "/internal/policies/",
        text: "All policies"
      }, null, _parent));
      _push(ssrRenderComponent(_component_EdHero, {
        eyebrow: "Internal · Restricted",
        "eyebrow-color": "var(--at-teal)",
        title: "Complaints and Disputes Management Policy",
        meta,
        lede: "Nebras facilitates the resolution of complaints and disputes across the Open Finance ecosystem by leveraging its position as API Hub operator — resolving <strong>empirical</strong> (verifiable) issues internally and escalating <strong>non-empirical</strong> (subjective or fraud-related) matters to the CBUAE.",
        "key-nums": keyNums
      }, null, _parent));
      _push(ssrRenderComponent(_component_EdInPageNav, { sections }, null, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "overview",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Overview",
        title: "Purpose of this policy",
        lede: "Nebras resolves verifiable issues using API Hub logs and data, and consults or escalates subjective and complex matters to the relevant parties — LFIs, TPPs, and ultimately the CBUAE — to ensure fair and efficient handling that promotes trust in the ecosystem.",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-f523c309${_scopeId}>This policy aims to</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-f523c309${_scopeId2}>Provide a clear, structured process for raising, assessing, resolving, and escalating complaints and disputes.</li><li data-v-f523c309${_scopeId2}>Align with the CBUAE Consumer Protection Regulations and Open Finance Regulation.</li><li data-v-f523c309${_scopeId2}>Enhance ecosystem integrity through timely resolutions and learning from disputes to improve standards.</li><li data-v-f523c309${_scopeId2}>Clarify Nebras’s review and empirical-decisioning role — responsibility for consumer disputes lies with LFIs and TPPs, and subjective or fraud-case decisions reside with the CBUAE.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Provide a clear, structured process for raising, assessing, resolving, and escalating complaints and disputes."),
                    createVNode("li", null, "Align with the CBUAE Consumer Protection Regulations and Open Finance Regulation."),
                    createVNode("li", null, "Enhance ecosystem integrity through timely resolutions and learning from disputes to improve standards."),
                    createVNode("li", null, "Clarify Nebras’s review and empirical-decisioning role — responsibility for consumer disputes lies with LFIs and TPPs, and subjective or fraud-case decisions reside with the CBUAE.")
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
                  createVNode("li", null, "Provide a clear, structured process for raising, assessing, resolving, and escalating complaints and disputes."),
                  createVNode("li", null, "Align with the CBUAE Consumer Protection Regulations and Open Finance Regulation."),
                  createVNode("li", null, "Enhance ecosystem integrity through timely resolutions and learning from disputes to improve standards."),
                  createVNode("li", null, "Clarify Nebras’s review and empirical-decisioning role — responsibility for consumer disputes lies with LFIs and TPPs, and subjective or fraud-case decisions reside with the CBUAE.")
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
        title: "What this policy covers",
        lede: "This policy covers all types of complaints and disputes related to ecosystem activity.",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-f523c309${_scopeId2}>TPP failings against regulations or standards.</li><li data-v-f523c309${_scopeId2}>LFI failings against regulations or standards.</li><li data-v-f523c309${_scopeId2}>Operational or technical failures in the API Hub (or Trust Framework) by Nebras.</li><li data-v-f523c309${_scopeId2}>Consumer protection issues directly or indirectly impacting retail users via LFIs’ or TPPs’ Open Finance activity.</li>`);
                } else {
                  return [
                    createVNode("li", null, "TPP failings against regulations or standards."),
                    createVNode("li", null, "LFI failings against regulations or standards."),
                    createVNode("li", null, "Operational or technical failures in the API Hub (or Trust Framework) by Nebras."),
                    createVNode("li", null, "Consumer protection issues directly or indirectly impacting retail users via LFIs’ or TPPs’ Open Finance activity.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-f523c309${_scopeId}>Definitions</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-f523c309${_scopeId2}><strong data-v-f523c309${_scopeId2}>Empirical dispute</strong> — an issue that can be objectively verified using API Hub data, logs, or records (e.g. system errors or transaction mismatches), including submitted evidence from TPPs and LFIs.</li><li data-v-f523c309${_scopeId2}><strong data-v-f523c309${_scopeId2}>Non-empirical dispute</strong> — a subjective, fraud-related, or complex issue requiring adjudication by the regulator, plus any case involving a failing of Nebras in its regulatory role.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Empirical dispute"),
                      createTextVNode(" — an issue that can be objectively verified using API Hub data, logs, or records (e.g. system errors or transaction mismatches), including submitted evidence from TPPs and LFIs.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Non-empirical dispute"),
                      createTextVNode(" — a subjective, fraud-related, or complex issue requiring adjudication by the regulator, plus any case involving a failing of Nebras in its regulatory role.")
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
                  createVNode("li", null, "TPP failings against regulations or standards."),
                  createVNode("li", null, "LFI failings against regulations or standards."),
                  createVNode("li", null, "Operational or technical failures in the API Hub (or Trust Framework) by Nebras."),
                  createVNode("li", null, "Consumer protection issues directly or indirectly impacting retail users via LFIs’ or TPPs’ Open Finance activity.")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Definitions"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Empirical dispute"),
                    createTextVNode(" — an issue that can be objectively verified using API Hub data, logs, or records (e.g. system errors or transaction mismatches), including submitted evidence from TPPs and LFIs.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Non-empirical dispute"),
                    createTextVNode(" — a subjective, fraud-related, or complex issue requiring adjudication by the regulator, plus any case involving a failing of Nebras in its regulatory role.")
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
        num: "03",
        color: "var(--at-blue)",
        eyebrow: "Dispute categories",
        title: "How disputes are classified",
        lede: "As set out in the Nebras Interaction Guide, disputes fall into the following categories.",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-f523c309${_scopeId2}><strong data-v-f523c309${_scopeId2}>Technical issues</strong> — system downtime or API failures, to be filed within 2 hours of occurrence for priority handling.</li><li data-v-f523c309${_scopeId2}><strong data-v-f523c309${_scopeId2}>Erroneous transactions</strong> — mismatches in data sharing or initiation, verifiable via logs.</li><li data-v-f523c309${_scopeId2}><strong data-v-f523c309${_scopeId2}>Non-delivery of goods/services</strong> — disputes arising from failed Open Finance-enabled services.</li><li data-v-f523c309${_scopeId2}><strong data-v-f523c309${_scopeId2}>Transaction disputes</strong> — conflicts over payment initiations or consents.</li><li data-v-f523c309${_scopeId2}><strong data-v-f523c309${_scopeId2}>Other disputes</strong> — miscellaneous issues, such as standards compliance or ecosystem access.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Technical issues"),
                      createTextVNode(" — system downtime or API failures, to be filed within 2 hours of occurrence for priority handling.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Erroneous transactions"),
                      createTextVNode(" — mismatches in data sharing or initiation, verifiable via logs.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Non-delivery of goods/services"),
                      createTextVNode(" — disputes arising from failed Open Finance-enabled services.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Transaction disputes"),
                      createTextVNode(" — conflicts over payment initiations or consents.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Other disputes"),
                      createTextVNode(" — miscellaneous issues, such as standards compliance or ecosystem access.")
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
                    createVNode("strong", null, "Technical issues"),
                    createTextVNode(" — system downtime or API failures, to be filed within 2 hours of occurrence for priority handling.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Erroneous transactions"),
                    createTextVNode(" — mismatches in data sharing or initiation, verifiable via logs.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Non-delivery of goods/services"),
                    createTextVNode(" — disputes arising from failed Open Finance-enabled services.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Transaction disputes"),
                    createTextVNode(" — conflicts over payment initiations or consents.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Other disputes"),
                    createTextVNode(" — miscellaneous issues, such as standards compliance or ecosystem access.")
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
        id: "workflow",
        num: "04",
        color: "var(--at-blue-deep)",
        eyebrow: "Dispute management workflow",
        title: "From intake to closure",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdStages, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "01",
                    title: "Raising a dispute",
                    "num-color": "var(--at-blue-deep)"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-f523c309${_scopeId3}>Cases are received via the online portal, dedicated email, or telephone hotline, with acknowledgment sent within <strong data-v-f523c309${_scopeId3}>24 hours</strong>.</p>`);
                      } else {
                        return [
                          createVNode("p", null, [
                            createTextVNode("Cases are received via the online portal, dedicated email, or telephone hotline, with acknowledgment sent within "),
                            createVNode("strong", null, "24 hours"),
                            createTextVNode(".")
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "02",
                    title: "Assessment",
                    "num-color": "var(--at-blue-deep)"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-f523c309${_scopeId3}>The Operations team classifies the dispute, gathering initial evidence from API logs and Nebras systems.</p>`);
                      } else {
                        return [
                          createVNode("p", null, "The Operations team classifies the dispute, gathering initial evidence from API logs and Nebras systems.")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "03",
                    title: "Further gathering from parties",
                    "num-color": "var(--at-blue-deep)"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-f523c309${_scopeId3}>LFIs and TPPs may be asked to submit additional evidence into the process to support reaching a conclusion.</p>`);
                      } else {
                        return [
                          createVNode("p", null, "LFIs and TPPs may be asked to submit additional evidence into the process to support reaching a conclusion.")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "04",
                    title: "Resolution",
                    "num-color": "var(--at-blue-deep)"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-f523c309${_scopeId3}>Disputes with an empirical basis are resolved by Nebras, supported by data and fact-based evidence. Subjective or fraud-based cases — and cases relating to Nebras failings — are escalated to the CBUAE.</p>`);
                      } else {
                        return [
                          createVNode("p", null, "Disputes with an empirical basis are resolved by Nebras, supported by data and fact-based evidence. Subjective or fraud-based cases — and cases relating to Nebras failings — are escalated to the CBUAE.")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "05",
                    title: "Closure",
                    "num-color": "var(--at-blue-deep)"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-f523c309${_scopeId3}>All parties are formally notified of outcomes, with reasons provided and feedback solicited for process improvement.</p>`);
                      } else {
                        return [
                          createVNode("p", null, "All parties are formally notified of outcomes, with reasons provided and feedback solicited for process improvement.")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_EdStage, {
                      num: "01",
                      title: "Raising a dispute",
                      "num-color": "var(--at-blue-deep)"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, [
                          createTextVNode("Cases are received via the online portal, dedicated email, or telephone hotline, with acknowledgment sent within "),
                          createVNode("strong", null, "24 hours"),
                          createTextVNode(".")
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_EdStage, {
                      num: "02",
                      title: "Assessment",
                      "num-color": "var(--at-blue-deep)"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, "The Operations team classifies the dispute, gathering initial evidence from API logs and Nebras systems.")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_EdStage, {
                      num: "03",
                      title: "Further gathering from parties",
                      "num-color": "var(--at-blue-deep)"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, "LFIs and TPPs may be asked to submit additional evidence into the process to support reaching a conclusion.")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_EdStage, {
                      num: "04",
                      title: "Resolution",
                      "num-color": "var(--at-blue-deep)"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, "Disputes with an empirical basis are resolved by Nebras, supported by data and fact-based evidence. Subjective or fraud-based cases — and cases relating to Nebras failings — are escalated to the CBUAE.")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_EdStage, {
                      num: "05",
                      title: "Closure",
                      "num-color": "var(--at-blue-deep)"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, "All parties are formally notified of outcomes, with reasons provided and feedback solicited for process improvement.")
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
                    title: "Raising a dispute",
                    "num-color": "var(--at-blue-deep)"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, [
                        createTextVNode("Cases are received via the online portal, dedicated email, or telephone hotline, with acknowledgment sent within "),
                        createVNode("strong", null, "24 hours"),
                        createTextVNode(".")
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_EdStage, {
                    num: "02",
                    title: "Assessment",
                    "num-color": "var(--at-blue-deep)"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, "The Operations team classifies the dispute, gathering initial evidence from API logs and Nebras systems.")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_EdStage, {
                    num: "03",
                    title: "Further gathering from parties",
                    "num-color": "var(--at-blue-deep)"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, "LFIs and TPPs may be asked to submit additional evidence into the process to support reaching a conclusion.")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_EdStage, {
                    num: "04",
                    title: "Resolution",
                    "num-color": "var(--at-blue-deep)"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, "Disputes with an empirical basis are resolved by Nebras, supported by data and fact-based evidence. Subjective or fraud-based cases — and cases relating to Nebras failings — are escalated to the CBUAE.")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_EdStage, {
                    num: "05",
                    title: "Closure",
                    "num-color": "var(--at-blue-deep)"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, "All parties are formally notified of outcomes, with reasons provided and feedback solicited for process improvement.")
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
        id: "slas",
        num: "05",
        color: "var(--at-navy)",
        eyebrow: "SLAs & appeals",
        title: "Service levels and the right to appeal",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-f523c309${_scopeId}>Service level agreements</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-f523c309${_scopeId2}>Initial acknowledgment within <strong data-v-f523c309${_scopeId2}>1 business day</strong>.</li><li data-v-f523c309${_scopeId2}>Resolution for empirical disputes within <strong data-v-f523c309${_scopeId2}>10–15 days</strong>.</li><li data-v-f523c309${_scopeId2}>Non-empirical referrals within <strong data-v-f523c309${_scopeId2}>5 days</strong>.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createTextVNode("Initial acknowledgment within "),
                      createVNode("strong", null, "1 business day"),
                      createTextVNode(".")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("Resolution for empirical disputes within "),
                      createVNode("strong", null, "10–15 days"),
                      createTextVNode(".")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("Non-empirical referrals within "),
                      createVNode("strong", null, "5 days"),
                      createTextVNode(".")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-f523c309${_scopeId}>Appeals</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-f523c309${_scopeId2}>For empirical resolutions, appeals are submitted to the CEO within <strong data-v-f523c309${_scopeId2}>7 days</strong>.</li><li data-v-f523c309${_scopeId2}>Non-empirical appeals go directly to the CBUAE.</li><li data-v-f523c309${_scopeId2}>Appeals are processed and decided within <strong data-v-f523c309${_scopeId2}>7 business days</strong>, with written notification.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createTextVNode("For empirical resolutions, appeals are submitted to the CEO within "),
                      createVNode("strong", null, "7 days"),
                      createTextVNode(".")
                    ]),
                    createVNode("li", null, "Non-empirical appeals go directly to the CBUAE."),
                    createVNode("li", null, [
                      createTextVNode("Appeals are processed and decided within "),
                      createVNode("strong", null, "7 business days"),
                      createTextVNode(", with written notification.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, "Service level agreements"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createTextVNode("Initial acknowledgment within "),
                    createVNode("strong", null, "1 business day"),
                    createTextVNode(".")
                  ]),
                  createVNode("li", null, [
                    createTextVNode("Resolution for empirical disputes within "),
                    createVNode("strong", null, "10–15 days"),
                    createTextVNode(".")
                  ]),
                  createVNode("li", null, [
                    createTextVNode("Non-empirical referrals within "),
                    createVNode("strong", null, "5 days"),
                    createTextVNode(".")
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "Appeals"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createTextVNode("For empirical resolutions, appeals are submitted to the CEO within "),
                    createVNode("strong", null, "7 days"),
                    createTextVNode(".")
                  ]),
                  createVNode("li", null, "Non-empirical appeals go directly to the CBUAE."),
                  createVNode("li", null, [
                    createTextVNode("Appeals are processed and decided within "),
                    createVNode("strong", null, "7 business days"),
                    createTextVNode(", with written notification.")
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
        id: "responsibilities",
        num: "06",
        color: "var(--at-teal-deep)",
        eyebrow: "Responsibilities",
        title: "Who does what",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-f523c309${_scopeId2}><strong data-v-f523c309${_scopeId2}>Operations team</strong> — handles intake, assessment, resolution workflows, and initial communications.</li><li data-v-f523c309${_scopeId2}><strong data-v-f523c309${_scopeId2}>CEO</strong> — reviews and decides on empirical disputes, ensuring impartiality.</li><li data-v-f523c309${_scopeId2}><strong data-v-f523c309${_scopeId2}>Board Risk &amp; Compliance Committee</strong> — provides oversight, reviews policy effectiveness, and escalates systemic issues.</li><li data-v-f523c309${_scopeId2}><strong data-v-f523c309${_scopeId2}>All staff</strong> — forward any disputes received to the Operations team and maintain confidentiality.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Operations team"),
                      createTextVNode(" — handles intake, assessment, resolution workflows, and initial communications.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "CEO"),
                      createTextVNode(" — reviews and decides on empirical disputes, ensuring impartiality.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Board Risk & Compliance Committee"),
                      createTextVNode(" — provides oversight, reviews policy effectiveness, and escalates systemic issues.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "All staff"),
                      createTextVNode(" — forward any disputes received to the Operations team and maintain confidentiality.")
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
                    createVNode("strong", null, "Operations team"),
                    createTextVNode(" — handles intake, assessment, resolution workflows, and initial communications.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "CEO"),
                    createTextVNode(" — reviews and decides on empirical disputes, ensuring impartiality.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Board Risk & Compliance Committee"),
                    createTextVNode(" — provides oversight, reviews policy effectiveness, and escalates systemic issues.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "All staff"),
                    createTextVNode(" — forward any disputes received to the Operations team and maintain confidentiality.")
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
        id: "records",
        num: "07",
        color: "var(--at-teal)",
        eyebrow: "Records & monitoring",
        title: "Documentation, recordkeeping, and review",
        tone: "cream",
        narrow: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-f523c309${_scopeId}>Documentation and recordkeeping</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-f523c309${_scopeId2}>All disputes are logged in a secure, centralised database, including intake details, evidence, resolutions, and communications.</li><li data-v-f523c309${_scopeId2}>Records are retained for a minimum of <strong data-v-f523c309${_scopeId2}>5 years</strong>, compliant with data protection laws, and accessible for audits or regulatory inquiries.</li>`);
                } else {
                  return [
                    createVNode("li", null, "All disputes are logged in a secure, centralised database, including intake details, evidence, resolutions, and communications."),
                    createVNode("li", null, [
                      createTextVNode("Records are retained for a minimum of "),
                      createVNode("strong", null, "5 years"),
                      createTextVNode(", compliant with data protection laws, and accessible for audits or regulatory inquiries.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-f523c309${_scopeId}>Monitoring and reporting</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-f523c309${_scopeId2}>Bi-annual reviews of SLA compliance, dispute trends, and resolution rates are conducted by the Operations Lead.</li><li data-v-f523c309${_scopeId2}>Reports are submitted to the Board Risk &amp; Compliance Committee, highlighting patterns for potential ecosystem improvements or policy updates.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Bi-annual reviews of SLA compliance, dispute trends, and resolution rates are conducted by the Operations Lead."),
                    createVNode("li", null, "Reports are submitted to the Board Risk & Compliance Committee, highlighting patterns for potential ecosystem improvements or policy updates.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, "Documentation and recordkeeping"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "All disputes are logged in a secure, centralised database, including intake details, evidence, resolutions, and communications."),
                  createVNode("li", null, [
                    createTextVNode("Records are retained for a minimum of "),
                    createVNode("strong", null, "5 years"),
                    createTextVNode(", compliant with data protection laws, and accessible for audits or regulatory inquiries.")
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "Monitoring and reporting"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Bi-annual reviews of SLA compliance, dispute trends, and resolution rates are conducted by the Operations Lead."),
                  createVNode("li", null, "Reports are submitted to the Board Risk & Compliance Committee, highlighting patterns for potential ecosystem improvements or policy updates.")
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
              href: "/internal/policies/retail-consumer-protection",
              category: "Customers & Conduct",
              title: "Retail Consumer Protection Policy",
              desc: "Nebras's indirect role in supporting fair, transparent, and secure retail consumer experiences."
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRelatedCard, {
              href: "/internal/policies/enterprise-risk-management",
              category: "Risk, Security & Compliance",
              title: "Enterprise Risk Management Policy",
              desc: "The risk framework under which systemic dispute patterns are assessed and escalated."
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdRelatedCard, {
                href: "/internal/policies/retail-consumer-protection",
                category: "Customers & Conduct",
                title: "Retail Consumer Protection Policy",
                desc: "Nebras's indirect role in supporting fair, transparent, and secure retail consumer experiences."
              }),
              createVNode(_component_EdRelatedCard, {
                href: "/internal/policies/enterprise-risk-management",
                category: "Risk, Security & Compliance",
                title: "Enterprise Risk Management Policy",
                desc: "The risk framework under which systemic dispute patterns are assessed and escalated."
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/internal/policies/complaints-and-disputes.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const complaintsAndDisputes = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f523c309"]]);
export {
  complaintsAndDisputes as default
};
