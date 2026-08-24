import { _ as __unplugin_components_0, a as __unplugin_components_2, b as __unplugin_components_6$1, c as __unplugin_components_7$1 } from "./EdBackStrip-COkyNhGh.js";
import { _ as __unplugin_components_7, a as __unplugin_components_8 } from "./EdStages-NkJQJXq7.js";
import { _ as __unplugin_components_9 } from "./EdSeverityTable-CdmPrf4w.js";
import { _ as __unplugin_components_6 } from "./EdCallout-BDBcOaPe.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { _ as __unplugin_components_0$1 } from "./EdHero-DawHPCxB.js";
import { defineComponent, mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ozone-connect-availability",
  __ssrInlineRender: true,
  setup(__props) {
    const sections = [
      { id: "scope", label: "Scope" },
      { id: "target", label: "Target" },
      { id: "proving", label: "Live proving" },
      { id: "monitoring", label: "Monitoring" },
      { id: "incidents", label: "Incidents" },
      { id: "maintenance", label: "Maintenance" },
      { id: "improvement", label: "Improvement" }
    ];
    const meta = [
      { label: "Applies to", value: "LFIs · Nebras" },
      { label: "Read", value: "6 min" },
      { label: "Updated", value: "22 Apr 2026" }
    ];
    const keyNums = [
      { value: "99.5", unit: "%", label: "Monthly availability target" },
      { value: "3h 39m", label: "Permitted downtime per month" }
    ];
    const severities = [
      {
        severity: "P1",
        color: "#B33A3A",
        description: "Complete outage of an API family, or degradation affecting at least <strong>25% of requests</strong>, or any unavailability of payment execution"
      },
      {
        severity: "P2",
        color: "var(--at-gold)",
        description: "Degradation of a single endpoint or API family not meeting the P1 threshold"
      },
      {
        severity: "P3",
        color: "var(--at-blue)",
        description: "Isolated issues affecting a limited number of TPPs or a narrow set of requests"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdBackStrip = __unplugin_components_0;
      const _component_EdHero = __unplugin_components_0$1;
      const _component_EdInPageNav = __unplugin_components_2;
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdBullets = __unplugin_components_5;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdCallout = __unplugin_components_6;
      const _component_EdSeverityTable = __unplugin_components_9;
      const _component_EdStages = __unplugin_components_7;
      const _component_EdStage = __unplugin_components_8;
      const _component_EdRelatedCards = __unplugin_components_6$1;
      const _component_EdRelatedCard = __unplugin_components_7$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-page" }, _attrs))} data-v-b2d73f37>`);
      _push(ssrRenderComponent(_component_EdBackStrip, {
        href: "/policy/",
        text: "All policies"
      }, null, _parent));
      _push(ssrRenderComponent(_component_EdHero, {
        eyebrow: "Operate · Measure · Improve",
        title: "Ozone Connect Availability Policy",
        meta,
        lede: "Sets the availability standard LFIs are expected to deliver for their Ozone Connect endpoints — the LFI-operated services the API Hub calls to fulfil TPP requests.",
        "key-nums": keyNums
      }, null, _parent));
      _push(ssrRenderComponent(_component_EdInPageNav, { sections }, null, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "scope",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Scope",
        title: "Where this policy applies",
        lede: "Applies to all Ozone Connect endpoints operated by an LFI in production, across every API family the LFI has enabled (Bank Data, Service Initiation, Confirmation of Payee, Insurance, FX, Account Opening, ATM, and any future additions).",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-b2d73f37${_scopeId}>Out of scope</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-b2d73f37${_scopeId2}>Sandbox or non-production environments</li><li data-v-b2d73f37${_scopeId2}>Downtime caused by the API Hub, the TPP, or the broader internet</li><li data-v-b2d73f37${_scopeId2}>Downtime caused by upstream payment rails (for example Aani) where the issue is demonstrably outside the LFI&#39;s control</li>`);
                } else {
                  return [
                    createVNode("li", null, "Sandbox or non-production environments"),
                    createVNode("li", null, "Downtime caused by the API Hub, the TPP, or the broader internet"),
                    createVNode("li", null, "Downtime caused by upstream payment rails (for example Aani) where the issue is demonstrably outside the LFI's control")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, "Out of scope"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Sandbox or non-production environments"),
                  createVNode("li", null, "Downtime caused by the API Hub, the TPP, or the broader internet"),
                  createVNode("li", null, "Downtime caused by upstream payment rails (for example Aani) where the issue is demonstrably outside the LFI's control")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "target",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "Availability target",
        title: "99.5% availability per calendar month",
        lede: "Each LFI is expected to deliver <strong>99.5% availability</strong> across its Ozone Connect endpoints, equating to no more than approximately 3 hours and 39 minutes of downtime per month — enough headroom to absorb planned releases and genuinely unforeseen issues, while still delivering a reliable service to customers and TPPs.",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`This target aligns with the end-to-end availability benchmark published in the Availability, Performance and Usage Benchmarks standard. Because the API Hub itself is engineered for very high availability, the LFI&#39;s Ozone Connect availability is the dominant factor in the end-to-end figure.`);
                } else {
                  return [
                    createTextVNode("This target aligns with the end-to-end availability benchmark published in the Availability, Performance and Usage Benchmarks standard. Because the API Hub itself is engineered for very high availability, the LFI's Ozone Connect availability is the dominant factor in the end-to-end figure.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-b2d73f37${_scopeId}>How unavailability is defined</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`A request to Ozone Connect is treated as a failure where:`);
                } else {
                  return [
                    createTextVNode("A request to Ozone Connect is treated as a failure where:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-b2d73f37${_scopeId2}>Ozone Connect returns a <strong data-v-b2d73f37${_scopeId2}>5xx response</strong></li><li data-v-b2d73f37${_scopeId2}>The TLS connection cannot be established</li><li data-v-b2d73f37${_scopeId2}>The response is not received within the API Hub&#39;s upstream timeout</li><li data-v-b2d73f37${_scopeId2}>Ozone Connect rejects valid Hub traffic below the capacity the LFI has agreed to sustain</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createTextVNode("Ozone Connect returns a "),
                      createVNode("strong", null, "5xx response")
                    ]),
                    createVNode("li", null, "The TLS connection cannot be established"),
                    createVNode("li", null, "The response is not received within the API Hub's upstream timeout"),
                    createVNode("li", null, "Ozone Connect rejects valid Hub traffic below the capacity the LFI has agreed to sustain")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Client errors (4xx responses attributable to the TPP or to an invalid request) are not counted against availability.`);
                } else {
                  return [
                    createTextVNode("Client errors (4xx responses attributable to the TPP or to an invalid request) are not counted against availability.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCallout, { color: "var(--at-gold)" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-b2d73f37${_scopeId2}><strong data-v-b2d73f37${_scopeId2}>Partial outages count.</strong> An outage affecting only <code data-v-b2d73f37${_scopeId2}>POST /payments</code>, only one API family, or only a subset of TPPs is still an outage for the purposes of this policy.</p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createVNode("strong", null, "Partial outages count."),
                      createTextVNode(" An outage affecting only "),
                      createVNode("code", null, "POST /payments"),
                      createTextVNode(", only one API family, or only a subset of TPPs is still an outage for the purposes of this policy.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("This target aligns with the end-to-end availability benchmark published in the Availability, Performance and Usage Benchmarks standard. Because the API Hub itself is engineered for very high availability, the LFI's Ozone Connect availability is the dominant factor in the end-to-end figure.")
                ]),
                _: 1
              }),
              createVNode("h3", null, "How unavailability is defined"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("A request to Ozone Connect is treated as a failure where:")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createTextVNode("Ozone Connect returns a "),
                    createVNode("strong", null, "5xx response")
                  ]),
                  createVNode("li", null, "The TLS connection cannot be established"),
                  createVNode("li", null, "The response is not received within the API Hub's upstream timeout"),
                  createVNode("li", null, "Ozone Connect rejects valid Hub traffic below the capacity the LFI has agreed to sustain")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Client errors (4xx responses attributable to the TPP or to an invalid request) are not counted against availability.")
                ]),
                _: 1
              }),
              createVNode(_component_EdCallout, { color: "var(--at-gold)" }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createVNode("strong", null, "Partial outages count."),
                    createTextVNode(" An outage affecting only "),
                    createVNode("code", null, "POST /payments"),
                    createTextVNode(", only one API family, or only a subset of TPPs is still an outage for the purposes of this policy.")
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
        id: "proving",
        num: "03",
        color: "var(--at-blue)",
        eyebrow: "Live proving",
        title: "Proving the target before go-live",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Before an LFI is signed off as compliant with this policy and approved to go live on the ecosystem, the LFI must complete a <strong data-v-b2d73f37${_scopeId2}>live proving period</strong> with one or more TPPs.`);
                } else {
                  return [
                    createTextVNode("Before an LFI is signed off as compliant with this policy and approved to go live on the ecosystem, the LFI must complete a "),
                    createVNode("strong", null, "live proving period"),
                    createTextVNode(" with one or more TPPs.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-b2d73f37${_scopeId2}>During the proving period, the LFI operates its Ozone Connect endpoints against real TPP traffic in production</li><li data-v-b2d73f37${_scopeId2}>The 99.5% availability target defined in this policy must be demonstrably met over the proving period</li><li data-v-b2d73f37${_scopeId2}>Nebras reviews the results and confirms, or withholds, sign-off before the LFI is approved for general availability</li>`);
                } else {
                  return [
                    createVNode("li", null, "During the proving period, the LFI operates its Ozone Connect endpoints against real TPP traffic in production"),
                    createVNode("li", null, "The 99.5% availability target defined in this policy must be demonstrably met over the proving period"),
                    createVNode("li", null, "Nebras reviews the results and confirms, or withholds, sign-off before the LFI is approved for general availability")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`An LFI that does not meet the target during proving remains in proving until it does, with Nebras support where required. This requirement applies equally to initial go-live and to any subsequent major version go-live.`);
                } else {
                  return [
                    createTextVNode("An LFI that does not meet the target during proving remains in proving until it does, with Nebras support where required. This requirement applies equally to initial go-live and to any subsequent major version go-live.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Before an LFI is signed off as compliant with this policy and approved to go live on the ecosystem, the LFI must complete a "),
                  createVNode("strong", null, "live proving period"),
                  createTextVNode(" with one or more TPPs.")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "During the proving period, the LFI operates its Ozone Connect endpoints against real TPP traffic in production"),
                  createVNode("li", null, "The 99.5% availability target defined in this policy must be demonstrably met over the proving period"),
                  createVNode("li", null, "Nebras reviews the results and confirms, or withholds, sign-off before the LFI is approved for general availability")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("An LFI that does not meet the target during proving remains in proving until it does, with Nebras support where required. This requirement applies equally to initial go-live and to any subsequent major version go-live.")
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
        num: "04",
        color: "var(--at-blue-deep)",
        eyebrow: "Monitoring & intervention",
        title: "Continuous, central observation",
        lede: "Nebras actively monitors every LFI's Ozone Connect availability in real time, using the API Hub's own logs of every request made to the LFI.",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`LFIs are expected to review their own Ozone Connect availability.`);
                } else {
                  return [
                    createTextVNode("LFIs are expected to review their own Ozone Connect availability.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-b2d73f37${_scopeId}>When the target is missed</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Where an LFI falls below the 99.5% target in any calendar month, or where the monitoring surfaces a pattern of repeated incidents, Nebras will engage directly with the LFI. This engagement may include:`);
                } else {
                  return [
                    createTextVNode("Where an LFI falls below the 99.5% target in any calendar month, or where the monitoring surfaces a pattern of repeated incidents, Nebras will engage directly with the LFI. This engagement may include:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-b2d73f37${_scopeId2}>A formal review meeting between Nebras and the LFI&#39;s engineering and operations leadership</li><li data-v-b2d73f37${_scopeId2}>A written remediation plan, agreed with Nebras, setting out specific actions, owners, and target dates</li><li data-v-b2d73f37${_scopeId2}>Enhanced reporting — typically weekly — until the LFI is consistently meeting the target</li><li data-v-b2d73f37${_scopeId2}>Escalation to the relevant regulatory authority where non-compliance is persistent or where the interests of customers or TPPs require it</li>`);
                } else {
                  return [
                    createVNode("li", null, "A formal review meeting between Nebras and the LFI's engineering and operations leadership"),
                    createVNode("li", null, "A written remediation plan, agreed with Nebras, setting out specific actions, owners, and target dates"),
                    createVNode("li", null, "Enhanced reporting — typically weekly — until the LFI is consistently meeting the target"),
                    createVNode("li", null, "Escalation to the relevant regulatory authority where non-compliance is persistent or where the interests of customers or TPPs require it")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Nebras will act proportionately. A single month below target that is attributable to a well-understood, remediated incident will normally require only a post-incident review. Repeated shortfalls, or shortfalls without a credible remediation plan, will attract progressively firmer engagement.`);
                } else {
                  return [
                    createTextVNode("Nebras will act proportionately. A single month below target that is attributable to a well-understood, remediated incident will normally require only a post-incident review. Repeated shortfalls, or shortfalls without a credible remediation plan, will attract progressively firmer engagement.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("LFIs are expected to review their own Ozone Connect availability.")
                ]),
                _: 1
              }),
              createVNode("h3", null, "When the target is missed"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Where an LFI falls below the 99.5% target in any calendar month, or where the monitoring surfaces a pattern of repeated incidents, Nebras will engage directly with the LFI. This engagement may include:")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "A formal review meeting between Nebras and the LFI's engineering and operations leadership"),
                  createVNode("li", null, "A written remediation plan, agreed with Nebras, setting out specific actions, owners, and target dates"),
                  createVNode("li", null, "Enhanced reporting — typically weekly — until the LFI is consistently meeting the target"),
                  createVNode("li", null, "Escalation to the relevant regulatory authority where non-compliance is persistent or where the interests of customers or TPPs require it")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Nebras will act proportionately. A single month below target that is attributable to a well-understood, remediated incident will normally require only a post-incident review. Repeated shortfalls, or shortfalls without a credible remediation plan, will attract progressively firmer engagement.")
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
        num: "05",
        color: "var(--at-navy)",
        eyebrow: "Incident communication",
        title: "Severity, acknowledgement, and updates",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-b2d73f37${_scopeId}>Severity definitions</h3>`);
            _push2(ssrRenderComponent(_component_EdSeverityTable, { rows: severities }, null, _parent2, _scopeId));
            _push2(`<h3 data-v-b2d73f37${_scopeId}>LFI obligations during an incident</h3>`);
            _push2(ssrRenderComponent(_component_EdStages, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "01",
                    title: "Acknowledge promptly"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-b2d73f37${_scopeId3}>For <strong data-v-b2d73f37${_scopeId3}>P1</strong> incidents, acknowledgement is expected within <strong data-v-b2d73f37${_scopeId3}>15 minutes</strong> of the LFI becoming aware. For <strong data-v-b2d73f37${_scopeId3}>P2</strong>, within <strong data-v-b2d73f37${_scopeId3}>1 hour</strong>. For <strong data-v-b2d73f37${_scopeId3}>P3</strong>, within the next business day.</p>`);
                      } else {
                        return [
                          createVNode("p", null, [
                            createTextVNode("For "),
                            createVNode("strong", null, "P1"),
                            createTextVNode(" incidents, acknowledgement is expected within "),
                            createVNode("strong", null, "15 minutes"),
                            createTextVNode(" of the LFI becoming aware. For "),
                            createVNode("strong", null, "P2"),
                            createTextVNode(", within "),
                            createVNode("strong", null, "1 hour"),
                            createTextVNode(". For "),
                            createVNode("strong", null, "P3"),
                            createTextVNode(", within the next business day.")
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "02",
                    title: "Notify Nebras"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-b2d73f37${_scopeId3}>Nebras operates a dedicated incident channel for each LFI. Incidents are not to be reported by email alone.</p>`);
                      } else {
                        return [
                          createVNode("p", null, "Nebras operates a dedicated incident channel for each LFI. Incidents are not to be reported by email alone.")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "03",
                    title: "Provide regular status updates"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-b2d73f37${_scopeId3}>For <strong data-v-b2d73f37${_scopeId3}>P1</strong>, updates at least every <strong data-v-b2d73f37${_scopeId3}>30 minutes</strong> until service is restored. For <strong data-v-b2d73f37${_scopeId3}>P2</strong>, at least every <strong data-v-b2d73f37${_scopeId3}>2 hours</strong>.</p>`);
                      } else {
                        return [
                          createVNode("p", null, [
                            createTextVNode("For "),
                            createVNode("strong", null, "P1"),
                            createTextVNode(", updates at least every "),
                            createVNode("strong", null, "30 minutes"),
                            createTextVNode(" until service is restored. For "),
                            createVNode("strong", null, "P2"),
                            createTextVNode(", at least every "),
                            createVNode("strong", null, "2 hours"),
                            createTextVNode(".")
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "04",
                    title: "Declare resolved"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-b2d73f37${_scopeId3}>Only once service has been stable for a reasonable observation period (typically 15 minutes for P1, 30 minutes for P2).</p>`);
                      } else {
                        return [
                          createVNode("p", null, "Only once service has been stable for a reasonable observation period (typically 15 minutes for P1, 30 minutes for P2).")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_EdStage, {
                      num: "01",
                      title: "Acknowledge promptly"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, [
                          createTextVNode("For "),
                          createVNode("strong", null, "P1"),
                          createTextVNode(" incidents, acknowledgement is expected within "),
                          createVNode("strong", null, "15 minutes"),
                          createTextVNode(" of the LFI becoming aware. For "),
                          createVNode("strong", null, "P2"),
                          createTextVNode(", within "),
                          createVNode("strong", null, "1 hour"),
                          createTextVNode(". For "),
                          createVNode("strong", null, "P3"),
                          createTextVNode(", within the next business day.")
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_EdStage, {
                      num: "02",
                      title: "Notify Nebras"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, "Nebras operates a dedicated incident channel for each LFI. Incidents are not to be reported by email alone.")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_EdStage, {
                      num: "03",
                      title: "Provide regular status updates"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, [
                          createTextVNode("For "),
                          createVNode("strong", null, "P1"),
                          createTextVNode(", updates at least every "),
                          createVNode("strong", null, "30 minutes"),
                          createTextVNode(" until service is restored. For "),
                          createVNode("strong", null, "P2"),
                          createTextVNode(", at least every "),
                          createVNode("strong", null, "2 hours"),
                          createTextVNode(".")
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_EdStage, {
                      num: "04",
                      title: "Declare resolved"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, "Only once service has been stable for a reasonable observation period (typically 15 minutes for P1, 30 minutes for P2).")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCallout, { color: "var(--at-navy)" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-b2d73f37${_scopeId2}>Nebras takes responsibility for cascading incident information to affected TPPs through its own communication channels. <strong data-v-b2d73f37${_scopeId2}>LFIs are not expected to communicate directly with TPPs during incidents.</strong></p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode("Nebras takes responsibility for cascading incident information to affected TPPs through its own communication channels. "),
                      createVNode("strong", null, "LFIs are not expected to communicate directly with TPPs during incidents.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-b2d73f37${_scopeId}>Post-incident review</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`For every P1 incident — and for any P2 incident that recurs within 30 days — the LFI is expected to provide a post-incident review to Nebras within <strong data-v-b2d73f37${_scopeId2}>five business days</strong> of resolution. The review should cover:`);
                } else {
                  return [
                    createTextVNode("For every P1 incident — and for any P2 incident that recurs within 30 days — the LFI is expected to provide a post-incident review to Nebras within "),
                    createVNode("strong", null, "five business days"),
                    createTextVNode(" of resolution. The review should cover:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-b2d73f37${_scopeId2}>A factual timeline of the incident</li><li data-v-b2d73f37${_scopeId2}>The root cause</li><li data-v-b2d73f37${_scopeId2}>The customer and TPP impact</li><li data-v-b2d73f37${_scopeId2}>The remediation already applied</li><li data-v-b2d73f37${_scopeId2}>Any further actions the LFI will take to prevent recurrence, with owners and dates</li>`);
                } else {
                  return [
                    createVNode("li", null, "A factual timeline of the incident"),
                    createVNode("li", null, "The root cause"),
                    createVNode("li", null, "The customer and TPP impact"),
                    createVNode("li", null, "The remediation already applied"),
                    createVNode("li", null, "Any further actions the LFI will take to prevent recurrence, with owners and dates")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Nebras may share anonymised learnings from post-incident reviews across the ecosystem where doing so would help other LFIs avoid similar issues.`);
                } else {
                  return [
                    createTextVNode("Nebras may share anonymised learnings from post-incident reviews across the ecosystem where doing so would help other LFIs avoid similar issues.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, "Severity definitions"),
              createVNode(_component_EdSeverityTable, { rows: severities }),
              createVNode("h3", null, "LFI obligations during an incident"),
              createVNode(_component_EdStages, null, {
                default: withCtx(() => [
                  createVNode(_component_EdStage, {
                    num: "01",
                    title: "Acknowledge promptly"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, [
                        createTextVNode("For "),
                        createVNode("strong", null, "P1"),
                        createTextVNode(" incidents, acknowledgement is expected within "),
                        createVNode("strong", null, "15 minutes"),
                        createTextVNode(" of the LFI becoming aware. For "),
                        createVNode("strong", null, "P2"),
                        createTextVNode(", within "),
                        createVNode("strong", null, "1 hour"),
                        createTextVNode(". For "),
                        createVNode("strong", null, "P3"),
                        createTextVNode(", within the next business day.")
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_EdStage, {
                    num: "02",
                    title: "Notify Nebras"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, "Nebras operates a dedicated incident channel for each LFI. Incidents are not to be reported by email alone.")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_EdStage, {
                    num: "03",
                    title: "Provide regular status updates"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, [
                        createTextVNode("For "),
                        createVNode("strong", null, "P1"),
                        createTextVNode(", updates at least every "),
                        createVNode("strong", null, "30 minutes"),
                        createTextVNode(" until service is restored. For "),
                        createVNode("strong", null, "P2"),
                        createTextVNode(", at least every "),
                        createVNode("strong", null, "2 hours"),
                        createTextVNode(".")
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_EdStage, {
                    num: "04",
                    title: "Declare resolved"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, "Only once service has been stable for a reasonable observation period (typically 15 minutes for P1, 30 minutes for P2).")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_EdCallout, { color: "var(--at-navy)" }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode("Nebras takes responsibility for cascading incident information to affected TPPs through its own communication channels. "),
                    createVNode("strong", null, "LFIs are not expected to communicate directly with TPPs during incidents.")
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "Post-incident review"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("For every P1 incident — and for any P2 incident that recurs within 30 days — the LFI is expected to provide a post-incident review to Nebras within "),
                  createVNode("strong", null, "five business days"),
                  createTextVNode(" of resolution. The review should cover:")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "A factual timeline of the incident"),
                  createVNode("li", null, "The root cause"),
                  createVNode("li", null, "The customer and TPP impact"),
                  createVNode("li", null, "The remediation already applied"),
                  createVNode("li", null, "Any further actions the LFI will take to prevent recurrence, with owners and dates")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Nebras may share anonymised learnings from post-incident reviews across the ecosystem where doing so would help other LFIs avoid similar issues.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "maintenance",
        num: "06",
        color: "var(--at-teal-deep)",
        eyebrow: "Planned maintenance",
        title: "Zero-downtime first; planned downtime counts against target",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`LFIs are expected to deliver changes to their production services without downtime wherever possible. Where planned downtime is genuinely unavoidable:`);
                } else {
                  return [
                    createTextVNode("LFIs are expected to deliver changes to their production services without downtime wherever possible. Where planned downtime is genuinely unavoidable:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-b2d73f37${_scopeId2}>Nebras and TPPs must be notified through the Nebras portal at least <strong data-v-b2d73f37${_scopeId2}>72 hours in advance</strong></li><li data-v-b2d73f37${_scopeId2}>The maintenance window must fall during a low-traffic period, typically between <strong data-v-b2d73f37${_scopeId2}>02:00 and 05:00 Gulf Standard Time</strong></li><li data-v-b2d73f37${_scopeId2}>The window must be kept as short as the change requires</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createTextVNode("Nebras and TPPs must be notified through the Nebras portal at least "),
                      createVNode("strong", null, "72 hours in advance")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("The maintenance window must fall during a low-traffic period, typically between "),
                      createVNode("strong", null, "02:00 and 05:00 Gulf Standard Time")
                    ]),
                    createVNode("li", null, "The window must be kept as short as the change requires")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCallout, { color: "#B33A3A" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-b2d73f37${_scopeId2}><strong data-v-b2d73f37${_scopeId2}>Planned maintenance is not excluded from the availability calculation.</strong> Downtime during an announced maintenance window still counts toward the LFI&#39;s monthly availability figure. This is deliberate: the policy is intended to encourage investment in zero-downtime deployment practices, not to create a permitted quota of offline time.</p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createVNode("strong", null, "Planned maintenance is not excluded from the availability calculation."),
                      createTextVNode(" Downtime during an announced maintenance window still counts toward the LFI's monthly availability figure. This is deliberate: the policy is intended to encourage investment in zero-downtime deployment practices, not to create a permitted quota of offline time.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("LFIs are expected to deliver changes to their production services without downtime wherever possible. Where planned downtime is genuinely unavoidable:")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createTextVNode("Nebras and TPPs must be notified through the Nebras portal at least "),
                    createVNode("strong", null, "72 hours in advance")
                  ]),
                  createVNode("li", null, [
                    createTextVNode("The maintenance window must fall during a low-traffic period, typically between "),
                    createVNode("strong", null, "02:00 and 05:00 Gulf Standard Time")
                  ]),
                  createVNode("li", null, "The window must be kept as short as the change requires")
                ]),
                _: 1
              }),
              createVNode(_component_EdCallout, { color: "#B33A3A" }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createVNode("strong", null, "Planned maintenance is not excluded from the availability calculation."),
                    createTextVNode(" Downtime during an announced maintenance window still counts toward the LFI's monthly availability figure. This is deliberate: the policy is intended to encourage investment in zero-downtime deployment practices, not to create a permitted quota of offline time.")
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
        id: "improvement",
        num: "07",
        color: "var(--at-gold)",
        eyebrow: "Continuous improvement",
        title: "A minimum, not an aspiration",
        tone: "cream",
        narrow: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Meeting the 99.5% target is a minimum expectation rather than an aspiration. LFIs are expected to treat availability as an ongoing discipline and, in particular, to:`);
                } else {
                  return [
                    createTextVNode("Meeting the 99.5% target is a minimum expectation rather than an aspiration. LFIs are expected to treat availability as an ongoing discipline and, in particular, to:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-b2d73f37${_scopeId2}>Track recurring causes of unavailability and address them at source</li><li data-v-b2d73f37${_scopeId2}>Review monthly availability reports with their engineering and operations leadership</li><li data-v-b2d73f37${_scopeId2}>Invest in the monitoring, alerting, and on-call capabilities required to detect and recover from incidents quickly</li><li data-v-b2d73f37${_scopeId2}>Participate in ecosystem-wide reviews convened by Nebras to share practices and identify common causes of unavailability</li>`);
                } else {
                  return [
                    createVNode("li", null, "Track recurring causes of unavailability and address them at source"),
                    createVNode("li", null, "Review monthly availability reports with their engineering and operations leadership"),
                    createVNode("li", null, "Invest in the monitoring, alerting, and on-call capabilities required to detect and recover from incidents quickly"),
                    createVNode("li", null, "Participate in ecosystem-wide reviews convened by Nebras to share practices and identify common causes of unavailability")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Meeting the 99.5% target is a minimum expectation rather than an aspiration. LFIs are expected to treat availability as an ongoing discipline and, in particular, to:")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Track recurring causes of unavailability and address them at source"),
                  createVNode("li", null, "Review monthly availability reports with their engineering and operations leadership"),
                  createVNode("li", null, "Invest in the monitoring, alerting, and on-call capabilities required to detect and recover from incidents quickly"),
                  createVNode("li", null, "Participate in ecosystem-wide reviews convened by Nebras to share practices and identify common causes of unavailability")
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
              href: "/policy/api-response-time",
              category: "LFIs · Nebras",
              "category-color": "var(--at-teal)",
              title: "API Response Time Policy",
              desc: "The 500 ms p95 standard, measured end to end across the whole TPP-facing request."
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRelatedCard, {
              href: "/policy/ozone-connect-data-quality",
              category: "LFIs · Nebras",
              "category-color": "var(--at-teal)",
              title: "Ozone Connect Data Quality Policy",
              desc: "Required and optional field delivery, accuracy, and freshness expectations."
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdRelatedCard, {
                href: "/policy/api-response-time",
                category: "LFIs · Nebras",
                "category-color": "var(--at-teal)",
                title: "API Response Time Policy",
                desc: "The 500 ms p95 standard, measured end to end across the whole TPP-facing request."
              }),
              createVNode(_component_EdRelatedCard, {
                href: "/policy/ozone-connect-data-quality",
                category: "LFIs · Nebras",
                "category-color": "var(--at-teal)",
                title: "Ozone Connect Data Quality Policy",
                desc: "Required and optional field delivery, accuracy, and freshness expectations."
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/policy/ozone-connect-availability.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ozoneConnectAvailability = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b2d73f37"]]);
export {
  ozoneConnectAvailability as default
};
