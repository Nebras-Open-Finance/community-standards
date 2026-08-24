import { _ as __unplugin_components_0, a as __unplugin_components_2, b as __unplugin_components_6$1, c as __unplugin_components_7$1 } from "./EdBackStrip-COkyNhGh.js";
import { _ as __unplugin_components_9 } from "./EdSeverityTable-CdmPrf4w.js";
import { _ as __unplugin_components_7, a as __unplugin_components_8 } from "./EdStages-NkJQJXq7.js";
import { _ as __unplugin_components_6 } from "./EdCallout-BDBcOaPe.js";
import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { _ as __unplugin_components_0$1 } from "./EdHero-DawHPCxB.js";
import { defineComponent, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "api-response-time",
  __ssrInlineRender: true,
  setup(__props) {
    const sections = [
      { id: "scope", label: "Scope" },
      { id: "target", label: "Target" },
      { id: "window", label: "Measured window" },
      { id: "accountability", label: "Accountability" },
      { id: "payments", label: "Payments" },
      { id: "proving", label: "Live proving" },
      { id: "monitoring", label: "Monitoring" },
      { id: "degradation", label: "Degradation" },
      { id: "improvement", label: "Improvement" }
    ];
    const meta = [
      { label: "Applies to", value: "LFIs · Nebras" },
      { label: "Read", value: "8 min" },
      { label: "Updated", value: "4 Aug 2026" }
    ];
    const keyNums = [
      { value: "500", unit: "ms p95", label: "Per endpoint, per calendar day" },
      { value: "TTLB", label: "TPP request in, TPP response out" }
    ];
    const severities = [
      {
        severity: "P1",
        color: "#B33A3A",
        description: "Payment execution p95 exceeds <strong>1,000 ms for 15 minutes</strong> or more; or any API family's p95 exceeds <strong>1,500 ms for 15 minutes</strong> or more"
      },
      {
        severity: "P2",
        color: "var(--at-gold)",
        description: "p95 for a given endpoint exceeds <strong>750 ms for 30 minutes</strong> or more"
      },
      {
        severity: "P3",
        color: "var(--at-blue)",
        description: "p95 for a given endpoint drifts above <strong>500 ms</strong> without meeting the P2 threshold"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdBackStrip = __unplugin_components_0;
      const _component_EdHero = __unplugin_components_0$1;
      const _component_EdInPageNav = __unplugin_components_2;
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdBullets = __unplugin_components_5;
      const _component_EdCallout = __unplugin_components_6;
      const _component_EdStages = __unplugin_components_7;
      const _component_EdStage = __unplugin_components_8;
      const _component_EdSeverityTable = __unplugin_components_9;
      const _component_EdRelatedCards = __unplugin_components_6$1;
      const _component_EdRelatedCard = __unplugin_components_7$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-page" }, _attrs))} data-v-4af0068d>`);
      _push(ssrRenderComponent(_component_EdBackStrip, {
        href: "/policy/",
        text: "All policies"
      }, null, _parent));
      _push(ssrRenderComponent(_component_EdHero, {
        eyebrow: "Operate · Measure · Improve",
        title: "API Response Time Policy",
        meta,
        lede: "Defines the response time the ecosystem is expected to deliver on every TPP request that reaches an LFI — what customers actually feel when they check a balance, confirm a payee, or authorise a payment.",
        "key-nums": keyNums
      }, null, _parent));
      _push(ssrRenderComponent(_component_EdInPageNav, { sections }, null, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "scope",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Scope",
        title: "Where this policy applies",
        lede: "Applies to every TPP-facing Open Finance API request in production that results in a corresponding request to the LFI's Ozone Connect, across every API family an LFI has enabled.",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`The subject of this policy is the <strong data-v-4af0068d${_scopeId2}>request as the TPP experiences it</strong> — not any single hop within it. A request that is fast on one leg and slow on another is a slow request, and is measured as such.`);
                } else {
                  return [
                    createTextVNode("The subject of this policy is the "),
                    createVNode("strong", null, "request as the TPP experiences it"),
                    createTextVNode(" — not any single hop within it. A request that is fast on one leg and slow on another is a slow request, and is measured as such.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`A request is in scope where the API Hub calls Ozone Connect to serve it. Requests the API Hub answers entirely on its own are out of scope, because there is no LFI segment for the end-to-end figure to say anything about.`);
                } else {
                  return [
                    createTextVNode("A request is in scope where the API Hub calls Ozone Connect to serve it. Requests the API Hub answers entirely on its own are out of scope, because there is no LFI segment for the end-to-end figure to say anything about.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-4af0068d${_scopeId}>Out of scope</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-4af0068d${_scopeId2}>Requests the API Hub serves without calling Ozone Connect — consent reads, authorisation, and token endpoints among them. The Hub&#39;s performance on these is managed by Nebras outside this policy.</li><li data-v-4af0068d${_scopeId2}>Sandbox or non-production environments</li><li data-v-4af0068d${_scopeId2}>The public internet between the TPP and the API Hub, and anything happening inside the TPP&#39;s own systems</li><li data-v-4af0068d${_scopeId2}>Time taken by the LFI to complete fraud, sanctions, and compliance screening of a payment after the API response has been returned</li><li data-v-4af0068d${_scopeId2}>Time taken by the underlying payment rail to process and settle a payment (for example Aani), governed by the applicable scheme rules</li><li data-v-4af0068d${_scopeId2}>Time a customer spends completing authentication at the LFI — measured separately under the Consent Journey requirements</li>`);
                } else {
                  return [
                    createVNode("li", null, "Requests the API Hub serves without calling Ozone Connect — consent reads, authorisation, and token endpoints among them. The Hub's performance on these is managed by Nebras outside this policy."),
                    createVNode("li", null, "Sandbox or non-production environments"),
                    createVNode("li", null, "The public internet between the TPP and the API Hub, and anything happening inside the TPP's own systems"),
                    createVNode("li", null, "Time taken by the LFI to complete fraud, sanctions, and compliance screening of a payment after the API response has been returned"),
                    createVNode("li", null, "Time taken by the underlying payment rail to process and settle a payment (for example Aani), governed by the applicable scheme rules"),
                    createVNode("li", null, "Time a customer spends completing authentication at the LFI — measured separately under the Consent Journey requirements")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCallout, { color: "var(--at-teal)" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-4af0068d${_scopeId2}>Nothing else is excluded. In particular, there is <strong data-v-4af0068d${_scopeId2}>no exclusion for time spent calling an external service</strong> — whether that call is made by the API Hub or by the LFI, and whether the service is the Trust Framework, a core banking platform, or any other dependency. Dependency latency is response time.</p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode("Nothing else is excluded. In particular, there is "),
                      createVNode("strong", null, "no exclusion for time spent calling an external service"),
                      createTextVNode(" — whether that call is made by the API Hub or by the LFI, and whether the service is the Trust Framework, a core banking platform, or any other dependency. Dependency latency is response time.")
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
                  createTextVNode("The subject of this policy is the "),
                  createVNode("strong", null, "request as the TPP experiences it"),
                  createTextVNode(" — not any single hop within it. A request that is fast on one leg and slow on another is a slow request, and is measured as such.")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("A request is in scope where the API Hub calls Ozone Connect to serve it. Requests the API Hub answers entirely on its own are out of scope, because there is no LFI segment for the end-to-end figure to say anything about.")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Out of scope"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Requests the API Hub serves without calling Ozone Connect — consent reads, authorisation, and token endpoints among them. The Hub's performance on these is managed by Nebras outside this policy."),
                  createVNode("li", null, "Sandbox or non-production environments"),
                  createVNode("li", null, "The public internet between the TPP and the API Hub, and anything happening inside the TPP's own systems"),
                  createVNode("li", null, "Time taken by the LFI to complete fraud, sanctions, and compliance screening of a payment after the API response has been returned"),
                  createVNode("li", null, "Time taken by the underlying payment rail to process and settle a payment (for example Aani), governed by the applicable scheme rules"),
                  createVNode("li", null, "Time a customer spends completing authentication at the LFI — measured separately under the Consent Journey requirements")
                ]),
                _: 1
              }),
              createVNode(_component_EdCallout, { color: "var(--at-teal)" }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode("Nothing else is excluded. In particular, there is "),
                    createVNode("strong", null, "no exclusion for time spent calling an external service"),
                    createTextVNode(" — whether that call is made by the API Hub or by the LFI, and whether the service is the Trust Framework, a core banking platform, or any other dependency. Dependency latency is response time.")
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
        id: "target",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "Response time target",
        title: "500 ms p95 per endpoint, per calendar day",
        lede: "Every endpoint is expected to return to the TPP within a <strong>p95 response time of 500 ms or better</strong>. A single target keeps the policy simple to reason about, and reflects the reality that customers expect comparable responsiveness whether they are checking a balance, retrieving transactions, confirming a payee, or initiating a payment consent.",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-4af0068d${_scopeId}>Endpoints in scope (examples)</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-4af0068d${_scopeId2}><strong data-v-4af0068d${_scopeId2}>Bank Data Sharing</strong> — <code data-v-4af0068d${_scopeId2}>GET /accounts</code>, <code data-v-4af0068d${_scopeId2}>GET /accounts/{accountId}/balances</code>, <code data-v-4af0068d${_scopeId2}>GET /accounts/{accountId}/transactions</code>, <code data-v-4af0068d${_scopeId2}>GET /accounts/{accountId}/standing-orders</code>, <code data-v-4af0068d${_scopeId2}>GET /accounts/{accountId}/beneficiaries</code>, and other account-scoped reads</li><li data-v-4af0068d${_scopeId2}><strong data-v-4af0068d${_scopeId2}>Service Initiation</strong> — <code data-v-4af0068d${_scopeId2}>POST /payments</code>, <code data-v-4af0068d${_scopeId2}>POST /payment-consents</code>, <code data-v-4af0068d${_scopeId2}>POST /payment-consents/{consentId}/file</code>, <code data-v-4af0068d${_scopeId2}>POST /payment-consents/{consentId}/refund</code>, <code data-v-4af0068d${_scopeId2}>GET /payments/{paymentId}</code></li><li data-v-4af0068d${_scopeId2}><strong data-v-4af0068d${_scopeId2}>Confirmation of Payee</strong> — <code data-v-4af0068d${_scopeId2}>POST /customers/action/cop-query</code></li><li data-v-4af0068d${_scopeId2}><strong data-v-4af0068d${_scopeId2}>Products and Leads</strong> — <code data-v-4af0068d${_scopeId2}>GET /products</code>, <code data-v-4af0068d${_scopeId2}>POST /leads</code></li><li data-v-4af0068d${_scopeId2}><strong data-v-4af0068d${_scopeId2}>Insurance, FX, Account Opening, ATM, User Operations, and Consent Events</strong> — all endpoints under the corresponding API families</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Bank Data Sharing"),
                      createTextVNode(" — "),
                      createVNode("code", null, "GET /accounts"),
                      createTextVNode(", "),
                      createVNode("code", null, "GET /accounts/{accountId}/balances"),
                      createTextVNode(", "),
                      createVNode("code", null, "GET /accounts/{accountId}/transactions"),
                      createTextVNode(", "),
                      createVNode("code", null, "GET /accounts/{accountId}/standing-orders"),
                      createTextVNode(", "),
                      createVNode("code", null, "GET /accounts/{accountId}/beneficiaries"),
                      createTextVNode(", and other account-scoped reads")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Service Initiation"),
                      createTextVNode(" — "),
                      createVNode("code", null, "POST /payments"),
                      createTextVNode(", "),
                      createVNode("code", null, "POST /payment-consents"),
                      createTextVNode(", "),
                      createVNode("code", null, "POST /payment-consents/{consentId}/file"),
                      createTextVNode(", "),
                      createVNode("code", null, "POST /payment-consents/{consentId}/refund"),
                      createTextVNode(", "),
                      createVNode("code", null, "GET /payments/{paymentId}")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Confirmation of Payee"),
                      createTextVNode(" — "),
                      createVNode("code", null, "POST /customers/action/cop-query")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Products and Leads"),
                      createTextVNode(" — "),
                      createVNode("code", null, "GET /products"),
                      createTextVNode(", "),
                      createVNode("code", null, "POST /leads")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Insurance, FX, Account Opening, ATM, User Operations, and Consent Events"),
                      createTextVNode(" — all endpoints under the corresponding API families")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`This target aligns with the 500 ms average response time published in the Availability, Performance and Usage Benchmarks standard. Holding each endpoint to this p95 figure — rather than only an average — ensures the customer experience remains consistent across the long tail of requests, not just on average.`);
                } else {
                  return [
                    createTextVNode("This target aligns with the 500 ms average response time published in the Availability, Performance and Usage Benchmarks standard. Holding each endpoint to this p95 figure — rather than only an average — ensures the customer experience remains consistent across the long tail of requests, not just on average.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, "Endpoints in scope (examples)"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Bank Data Sharing"),
                    createTextVNode(" — "),
                    createVNode("code", null, "GET /accounts"),
                    createTextVNode(", "),
                    createVNode("code", null, "GET /accounts/{accountId}/balances"),
                    createTextVNode(", "),
                    createVNode("code", null, "GET /accounts/{accountId}/transactions"),
                    createTextVNode(", "),
                    createVNode("code", null, "GET /accounts/{accountId}/standing-orders"),
                    createTextVNode(", "),
                    createVNode("code", null, "GET /accounts/{accountId}/beneficiaries"),
                    createTextVNode(", and other account-scoped reads")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Service Initiation"),
                    createTextVNode(" — "),
                    createVNode("code", null, "POST /payments"),
                    createTextVNode(", "),
                    createVNode("code", null, "POST /payment-consents"),
                    createTextVNode(", "),
                    createVNode("code", null, "POST /payment-consents/{consentId}/file"),
                    createTextVNode(", "),
                    createVNode("code", null, "POST /payment-consents/{consentId}/refund"),
                    createTextVNode(", "),
                    createVNode("code", null, "GET /payments/{paymentId}")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Confirmation of Payee"),
                    createTextVNode(" — "),
                    createVNode("code", null, "POST /customers/action/cop-query")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Products and Leads"),
                    createTextVNode(" — "),
                    createVNode("code", null, "GET /products"),
                    createTextVNode(", "),
                    createVNode("code", null, "POST /leads")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Insurance, FX, Account Opening, ATM, User Operations, and Consent Events"),
                    createTextVNode(" — all endpoints under the corresponding API families")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("This target aligns with the 500 ms average response time published in the Availability, Performance and Usage Benchmarks standard. Holding each endpoint to this p95 figure — rather than only an average — ensures the customer experience remains consistent across the long tail of requests, not just on average.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "window",
        num: "03",
        color: "var(--at-blue-deep)",
        eyebrow: "Measured window",
        title: "TPP → API Hub → Ozone Connect → API Hub → TPP",
        lede: "Response time is measured as <strong>Time to Last Byte (TTLB)</strong> at the API Hub resource server: the clock starts when the API Hub receives the first byte of the TPP's request, and stops when the last byte of the response is written back to the TPP. Everything in between is inside the window.",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdStages, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "01",
                    title: "TPP → API Hub — clock starts",
                    "num-color": "var(--at-blue-deep)"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-4af0068d${_scopeId3}>The request arrives at the API Hub resource server (<code data-v-4af0068d${_scopeId3}>rs1.{lfiCode}.apihub.openfinance.ae</code>). Measurement begins here, which is why the public internet between the TPP and the Hub falls outside the window.</p>`);
                      } else {
                        return [
                          createVNode("p", null, [
                            createTextVNode("The request arrives at the API Hub resource server ("),
                            createVNode("code", null, "rs1.{lfiCode}.apihub.openfinance.ae"),
                            createTextVNode("). Measurement begins here, which is why the public internet between the TPP and the Hub falls outside the window.")
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "02",
                    title: "API Hub processing — inbound",
                    "num-color": "var(--at-blue-deep)"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-4af0068d${_scopeId3}>mTLS and DPoP verification, access token validation, consent validation, OpenAPI schema enforcement, and request enrichment with the customer, account, and TPP information the LFI needs. <strong data-v-4af0068d${_scopeId3}>Any call the Hub makes to an external service while handling the request — including the Trust Framework — is inside the window.</strong></p>`);
                      } else {
                        return [
                          createVNode("p", null, [
                            createTextVNode("mTLS and DPoP verification, access token validation, consent validation, OpenAPI schema enforcement, and request enrichment with the customer, account, and TPP information the LFI needs. "),
                            createVNode("strong", null, "Any call the Hub makes to an external service while handling the request — including the Trust Framework — is inside the window.")
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "03",
                    title: "API Hub → Ozone Connect → API Hub",
                    "num-color": "var(--at-blue-deep)"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-4af0068d${_scopeId3}>Both network legs, plus everything Ozone Connect does in between. <strong data-v-4af0068d${_scopeId3}>The LFI&#39;s own onward calls are inside the window too</strong> — to its core banking platform, to internal authorisation or decisioning services, and to any external service it depends on. No portion of the elapsed time is deducted for a slow dependency.</p>`);
                      } else {
                        return [
                          createVNode("p", null, [
                            createTextVNode("Both network legs, plus everything Ozone Connect does in between. "),
                            createVNode("strong", null, "The LFI's own onward calls are inside the window too"),
                            createTextVNode(" — to its core banking platform, to internal authorisation or decisioning services, and to any external service it depends on. No portion of the elapsed time is deducted for a slow dependency.")
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "04",
                    title: "API Hub → TPP — clock stops",
                    "num-color": "var(--at-blue-deep)"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-4af0068d${_scopeId3}>Response normalisation and error mapping, until the last byte is written to the TPP.</p>`);
                      } else {
                        return [
                          createVNode("p", null, "Response normalisation and error mapping, until the last byte is written to the TPP.")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_EdStage, {
                      num: "01",
                      title: "TPP → API Hub — clock starts",
                      "num-color": "var(--at-blue-deep)"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, [
                          createTextVNode("The request arrives at the API Hub resource server ("),
                          createVNode("code", null, "rs1.{lfiCode}.apihub.openfinance.ae"),
                          createTextVNode("). Measurement begins here, which is why the public internet between the TPP and the Hub falls outside the window.")
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_EdStage, {
                      num: "02",
                      title: "API Hub processing — inbound",
                      "num-color": "var(--at-blue-deep)"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, [
                          createTextVNode("mTLS and DPoP verification, access token validation, consent validation, OpenAPI schema enforcement, and request enrichment with the customer, account, and TPP information the LFI needs. "),
                          createVNode("strong", null, "Any call the Hub makes to an external service while handling the request — including the Trust Framework — is inside the window.")
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_EdStage, {
                      num: "03",
                      title: "API Hub → Ozone Connect → API Hub",
                      "num-color": "var(--at-blue-deep)"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, [
                          createTextVNode("Both network legs, plus everything Ozone Connect does in between. "),
                          createVNode("strong", null, "The LFI's own onward calls are inside the window too"),
                          createTextVNode(" — to its core banking platform, to internal authorisation or decisioning services, and to any external service it depends on. No portion of the elapsed time is deducted for a slow dependency.")
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_EdStage, {
                      num: "04",
                      title: "API Hub → TPP — clock stops",
                      "num-color": "var(--at-blue-deep)"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, "Response normalisation and error mapping, until the last byte is written to the TPP.")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCallout, { color: "var(--at-blue-deep)" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-4af0068d${_scopeId2}>The measurement is taken <strong data-v-4af0068d${_scopeId2}>as observed</strong>. There is no mechanism for either Nebras or an LFI to exclude a downstream system from its figures. Where a dependency is the cause of a missed target, the owning party is expected to address it — by caching, by moving the call off the request path, or by working with the provider — rather than to treat it as an exclusion.</p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode("The measurement is taken "),
                      createVNode("strong", null, "as observed"),
                      createTextVNode(". There is no mechanism for either Nebras or an LFI to exclude a downstream system from its figures. Where a dependency is the cause of a missed target, the owning party is expected to address it — by caching, by moving the call off the request path, or by working with the provider — rather than to treat it as an exclusion.")
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
                    num: "01",
                    title: "TPP → API Hub — clock starts",
                    "num-color": "var(--at-blue-deep)"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, [
                        createTextVNode("The request arrives at the API Hub resource server ("),
                        createVNode("code", null, "rs1.{lfiCode}.apihub.openfinance.ae"),
                        createTextVNode("). Measurement begins here, which is why the public internet between the TPP and the Hub falls outside the window.")
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_EdStage, {
                    num: "02",
                    title: "API Hub processing — inbound",
                    "num-color": "var(--at-blue-deep)"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, [
                        createTextVNode("mTLS and DPoP verification, access token validation, consent validation, OpenAPI schema enforcement, and request enrichment with the customer, account, and TPP information the LFI needs. "),
                        createVNode("strong", null, "Any call the Hub makes to an external service while handling the request — including the Trust Framework — is inside the window.")
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_EdStage, {
                    num: "03",
                    title: "API Hub → Ozone Connect → API Hub",
                    "num-color": "var(--at-blue-deep)"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, [
                        createTextVNode("Both network legs, plus everything Ozone Connect does in between. "),
                        createVNode("strong", null, "The LFI's own onward calls are inside the window too"),
                        createTextVNode(" — to its core banking platform, to internal authorisation or decisioning services, and to any external service it depends on. No portion of the elapsed time is deducted for a slow dependency.")
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_EdStage, {
                    num: "04",
                    title: "API Hub → TPP — clock stops",
                    "num-color": "var(--at-blue-deep)"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, "Response normalisation and error mapping, until the last byte is written to the TPP.")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_EdCallout, { color: "var(--at-blue-deep)" }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode("The measurement is taken "),
                    createVNode("strong", null, "as observed"),
                    createTextVNode(". There is no mechanism for either Nebras or an LFI to exclude a downstream system from its figures. Where a dependency is the cause of a missed target, the owning party is expected to address it — by caching, by moving the call off the request path, or by working with the provider — rather than to treat it as an exclusion.")
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
        id: "accountability",
        num: "04",
        color: "var(--at-navy)",
        eyebrow: "Accountability",
        title: "One target, two owners",
        lede: "The 500 ms p95 is a single number measured on a single request, and both Nebras and the LFI are accountable for meeting it. Because the API Hub records the timing of each segment, a breach can be attributed to the party whose segment caused it.",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-4af0068d${_scopeId}>Nebras owns the API Hub segment</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-4af0068d${_scopeId2}>Hub processing on the way in and on the way out (stages 02 and 04 above)</li><li data-v-4af0068d${_scopeId2}>Every call the Hub makes to an external service while handling the request, including the Trust Framework</li><li data-v-4af0068d${_scopeId2}>The Hub&#39;s network legs to and from Ozone Connect</li>`);
                } else {
                  return [
                    createVNode("li", null, "Hub processing on the way in and on the way out (stages 02 and 04 above)"),
                    createVNode("li", null, "Every call the Hub makes to an external service while handling the request, including the Trust Framework"),
                    createVNode("li", null, "The Hub's network legs to and from Ozone Connect")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-4af0068d${_scopeId}>The LFI owns the Ozone Connect segment</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-4af0068d${_scopeId2}>Everything from the request arriving at Ozone Connect to the last byte of its response leaving (stage 03 above)</li><li data-v-4af0068d${_scopeId2}>Every onward call Ozone Connect makes while handling the request, to internal or external systems alike</li>`);
                } else {
                  return [
                    createVNode("li", null, "Everything from the request arriving at Ozone Connect to the last byte of its response leaving (stage 03 above)"),
                    createVNode("li", null, "Every onward call Ozone Connect makes while handling the request, to internal or external systems alike")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCallout, { color: "var(--at-navy)" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-4af0068d${_scopeId2}>Attribution is settled by the API Hub&#39;s per-segment timing record. LFIs see their own segment in the Admin Portal through the <strong data-v-4af0068d${_scopeId2}>LFI Performance</strong> report, which reports response times with API Hub processing removed; the Performance report alongside it reports the end-to-end figure this policy targets. <strong data-v-4af0068d${_scopeId2}>Neither party may attribute a breach to the other in place of that record.</strong> Where a breach spans both segments, remediation is planned jointly.</p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode("Attribution is settled by the API Hub's per-segment timing record. LFIs see their own segment in the Admin Portal through the "),
                      createVNode("strong", null, "LFI Performance"),
                      createTextVNode(" report, which reports response times with API Hub processing removed; the Performance report alongside it reports the end-to-end figure this policy targets. "),
                      createVNode("strong", null, "Neither party may attribute a breach to the other in place of that record."),
                      createTextVNode(" Where a breach spans both segments, remediation is planned jointly.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, "Nebras owns the API Hub segment"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Hub processing on the way in and on the way out (stages 02 and 04 above)"),
                  createVNode("li", null, "Every call the Hub makes to an external service while handling the request, including the Trust Framework"),
                  createVNode("li", null, "The Hub's network legs to and from Ozone Connect")
                ]),
                _: 1
              }),
              createVNode("h3", null, "The LFI owns the Ozone Connect segment"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Everything from the request arriving at Ozone Connect to the last byte of its response leaving (stage 03 above)"),
                  createVNode("li", null, "Every onward call Ozone Connect makes while handling the request, to internal or external systems alike")
                ]),
                _: 1
              }),
              createVNode(_component_EdCallout, { color: "var(--at-navy)" }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode("Attribution is settled by the API Hub's per-segment timing record. LFIs see their own segment in the Admin Portal through the "),
                    createVNode("strong", null, "LFI Performance"),
                    createTextVNode(" report, which reports response times with API Hub processing removed; the Performance report alongside it reports the end-to-end figure this policy targets. "),
                    createVNode("strong", null, "Neither party may attribute a breach to the other in place of that record."),
                    createTextVNode(" Where a breach spans both segments, remediation is planned jointly.")
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
        id: "payments",
        num: "05",
        color: "var(--at-blue)",
        eyebrow: "Payments",
        title: "What 500 ms covers for POST /payments",
        lede: "For <code>POST /payments</code>, the 500 ms target applies to the API response returned to the TPP — the point at which the payment request has been received and accepted for onward processing. It does <strong>not</strong> require the LFI to have completed screening or settlement within 500 ms.",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Payment processing spans three distinct phases, each with its own expectation:`);
                } else {
                  return [
                    createTextVNode("Payment processing spans three distinct phases, each with its own expectation:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdStages, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "01",
                    title: "API response — 500 ms p95 (this policy)",
                    "num-color": "var(--at-blue)"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-4af0068d${_scopeId3}>The LFI acknowledges the payment request and returns an initial payment status, which the API Hub maps and returns to the TPP. This is the point at which the TPP knows the request is in the LFI&#39;s hands and can show the customer an appropriate in-progress state.</p>`);
                      } else {
                        return [
                          createVNode("p", null, "The LFI acknowledges the payment request and returns an initial payment status, which the API Hub maps and returns to the TPP. This is the point at which the TPP knows the request is in the LFI's hands and can show the customer an appropriate in-progress state.")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "02",
                    title: "Fraud, sanctions, and compliance screening — up to 3 seconds",
                    "num-color": "var(--at-blue)"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-4af0068d${_scopeId3}>Screening runs after the API response has been returned. Once screening is complete, the LFI updates the payment status accordingly — either progressing the payment to the rail or rejecting it with the appropriate reason.</p>`);
                      } else {
                        return [
                          createVNode("p", null, "Screening runs after the API response has been returned. Once screening is complete, the LFI updates the payment status accordingly — either progressing the payment to the rail or rejecting it with the appropriate reason.")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "03",
                    title: "Rail execution — payment scheme rules",
                    "num-color": "var(--at-blue)"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-4af0068d${_scopeId3}>For domestic instant payments this is subject to the <strong data-v-4af0068d${_scopeId3}>Aani scheme rules</strong> (3 seconds per payment end-to-end, as set out in the Availability, Performance and Usage Benchmarks standard). The LFI&#39;s obligations toward the scheme operator are defined by the scheme and sit outside this policy.</p>`);
                      } else {
                        return [
                          createVNode("p", null, [
                            createTextVNode("For domestic instant payments this is subject to the "),
                            createVNode("strong", null, "Aani scheme rules"),
                            createTextVNode(" (3 seconds per payment end-to-end, as set out in the Availability, Performance and Usage Benchmarks standard). The LFI's obligations toward the scheme operator are defined by the scheme and sit outside this policy.")
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
                      title: "API response — 500 ms p95 (this policy)",
                      "num-color": "var(--at-blue)"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, "The LFI acknowledges the payment request and returns an initial payment status, which the API Hub maps and returns to the TPP. This is the point at which the TPP knows the request is in the LFI's hands and can show the customer an appropriate in-progress state.")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_EdStage, {
                      num: "02",
                      title: "Fraud, sanctions, and compliance screening — up to 3 seconds",
                      "num-color": "var(--at-blue)"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, "Screening runs after the API response has been returned. Once screening is complete, the LFI updates the payment status accordingly — either progressing the payment to the rail or rejecting it with the appropriate reason.")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_EdStage, {
                      num: "03",
                      title: "Rail execution — payment scheme rules",
                      "num-color": "var(--at-blue)"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, [
                          createTextVNode("For domestic instant payments this is subject to the "),
                          createVNode("strong", null, "Aani scheme rules"),
                          createTextVNode(" (3 seconds per payment end-to-end, as set out in the Availability, Performance and Usage Benchmarks standard). The LFI's obligations toward the scheme operator are defined by the scheme and sit outside this policy.")
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`The same structure — fast API acknowledgement followed by asynchronous processing — applies to other service initiation endpoints such as <code data-v-4af0068d${_scopeId2}>POST /payment-consents/{consentId}/file</code> and the refund and FX endpoints. In every case, the 500 ms target in this policy refers only to the API response time.`);
                } else {
                  return [
                    createTextVNode("The same structure — fast API acknowledgement followed by asynchronous processing — applies to other service initiation endpoints such as "),
                    createVNode("code", null, "POST /payment-consents/{consentId}/file"),
                    createTextVNode(" and the refund and FX endpoints. In every case, the 500 ms target in this policy refers only to the API response time.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Payment processing spans three distinct phases, each with its own expectation:")
                ]),
                _: 1
              }),
              createVNode(_component_EdStages, null, {
                default: withCtx(() => [
                  createVNode(_component_EdStage, {
                    num: "01",
                    title: "API response — 500 ms p95 (this policy)",
                    "num-color": "var(--at-blue)"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, "The LFI acknowledges the payment request and returns an initial payment status, which the API Hub maps and returns to the TPP. This is the point at which the TPP knows the request is in the LFI's hands and can show the customer an appropriate in-progress state.")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_EdStage, {
                    num: "02",
                    title: "Fraud, sanctions, and compliance screening — up to 3 seconds",
                    "num-color": "var(--at-blue)"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, "Screening runs after the API response has been returned. Once screening is complete, the LFI updates the payment status accordingly — either progressing the payment to the rail or rejecting it with the appropriate reason.")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_EdStage, {
                    num: "03",
                    title: "Rail execution — payment scheme rules",
                    "num-color": "var(--at-blue)"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, [
                        createTextVNode("For domestic instant payments this is subject to the "),
                        createVNode("strong", null, "Aani scheme rules"),
                        createTextVNode(" (3 seconds per payment end-to-end, as set out in the Availability, Performance and Usage Benchmarks standard). The LFI's obligations toward the scheme operator are defined by the scheme and sit outside this policy.")
                      ])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("The same structure — fast API acknowledgement followed by asynchronous processing — applies to other service initiation endpoints such as "),
                  createVNode("code", null, "POST /payment-consents/{consentId}/file"),
                  createTextVNode(" and the refund and FX endpoints. In every case, the 500 ms target in this policy refers only to the API response time.")
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
        num: "06",
        color: "var(--at-navy)",
        eyebrow: "Live proving",
        title: "Proving the target before go-live",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Before an LFI is signed off as compliant with this policy and approved to go live on the ecosystem, the LFI must complete a <strong data-v-4af0068d${_scopeId2}>live proving period</strong> with one or more TPPs.`);
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
                  _push3(`<li data-v-4af0068d${_scopeId2}>During the proving period, the LFI operates its Ozone Connect endpoints against real TPP traffic in production</li><li data-v-4af0068d${_scopeId2}>The 500 ms p95 target must be demonstrably met across all in-scope endpoints over the proving period, measured on the full TPP-facing request</li><li data-v-4af0068d${_scopeId2}>Nebras reviews the results and confirms, or withholds, sign-off before the LFI is approved for general availability</li>`);
                } else {
                  return [
                    createVNode("li", null, "During the proving period, the LFI operates its Ozone Connect endpoints against real TPP traffic in production"),
                    createVNode("li", null, "The 500 ms p95 target must be demonstrably met across all in-scope endpoints over the proving period, measured on the full TPP-facing request"),
                    createVNode("li", null, "Nebras reviews the results and confirms, or withholds, sign-off before the LFI is approved for general availability")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`An LFI that does not meet the target during proving remains in proving until it does, with Nebras support where required. Where the API Hub segment is the cause, Nebras remediates it and the proving period is not counted against the LFI. This requirement applies equally to initial go-live and to any subsequent major version go-live.`);
                } else {
                  return [
                    createTextVNode("An LFI that does not meet the target during proving remains in proving until it does, with Nebras support where required. Where the API Hub segment is the cause, Nebras remediates it and the proving period is not counted against the LFI. This requirement applies equally to initial go-live and to any subsequent major version go-live.")
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
                  createVNode("li", null, "The 500 ms p95 target must be demonstrably met across all in-scope endpoints over the proving period, measured on the full TPP-facing request"),
                  createVNode("li", null, "Nebras reviews the results and confirms, or withholds, sign-off before the LFI is approved for general availability")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("An LFI that does not meet the target during proving remains in proving until it does, with Nebras support where required. Where the API Hub segment is the cause, Nebras remediates it and the proving period is not counted against the LFI. This requirement applies equally to initial go-live and to any subsequent major version go-live.")
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
        num: "07",
        color: "var(--at-teal-deep)",
        eyebrow: "Monitoring & intervention",
        title: "Continuous, central observation",
        lede: "Nebras actively monitors response times in real time, using the API Hub's own logs of every TPP request. Response times are tracked continuously, per endpoint, against the 500 ms p95 target, with the API Hub and Ozone Connect segments recorded separately.",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`LFIs are expected to review their own response times, including the segment timings the API Hub reports back to them.`);
                } else {
                  return [
                    createTextVNode("LFIs are expected to review their own response times, including the segment timings the API Hub reports back to them.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-4af0068d${_scopeId}>When the target is persistently missed</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`&quot;Persistently&quot; is assessed in the round, but typically means any of:`);
                } else {
                  return [
                    createTextVNode('"Persistently" is assessed in the round, but typically means any of:')
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-4af0068d${_scopeId2}>Missing the 500 ms p95 target for the same endpoint in <strong data-v-4af0068d${_scopeId2}>three consecutive calendar months</strong></li><li data-v-4af0068d${_scopeId2}><strong data-v-4af0068d${_scopeId2}>Three or more P1 or P2 degradations</strong> in a rolling 90-day window</li><li data-v-4af0068d${_scopeId2}>Failure to deliver remediation actions agreed in a previous review</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createTextVNode("Missing the 500 ms p95 target for the same endpoint in "),
                      createVNode("strong", null, "three consecutive calendar months")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Three or more P1 or P2 degradations"),
                      createTextVNode(" in a rolling 90-day window")
                    ]),
                    createVNode("li", null, "Failure to deliver remediation actions agreed in a previous review")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Engagement may include a formal review meeting, a written remediation plan with owners and dates, enhanced (typically weekly) reporting, and escalation to the relevant regulatory authority where non-compliance is persistent or where the interests of customers or TPPs require it. Where the attributed cause sits in the API Hub segment, the same expectations fall on Nebras.`);
                } else {
                  return [
                    createTextVNode("Engagement may include a formal review meeting, a written remediation plan with owners and dates, enhanced (typically weekly) reporting, and escalation to the relevant regulatory authority where non-compliance is persistent or where the interests of customers or TPPs require it. Where the attributed cause sits in the API Hub segment, the same expectations fall on Nebras.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("LFIs are expected to review their own response times, including the segment timings the API Hub reports back to them.")
                ]),
                _: 1
              }),
              createVNode("h3", null, "When the target is persistently missed"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode('"Persistently" is assessed in the round, but typically means any of:')
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createTextVNode("Missing the 500 ms p95 target for the same endpoint in "),
                    createVNode("strong", null, "three consecutive calendar months")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Three or more P1 or P2 degradations"),
                    createTextVNode(" in a rolling 90-day window")
                  ]),
                  createVNode("li", null, "Failure to deliver remediation actions agreed in a previous review")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Engagement may include a formal review meeting, a written remediation plan with owners and dates, enhanced (typically weekly) reporting, and escalation to the relevant regulatory authority where non-compliance is persistent or where the interests of customers or TPPs require it. Where the attributed cause sits in the API Hub segment, the same expectations fall on Nebras.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "degradation",
        num: "08",
        color: "var(--at-navy-deep)",
        eyebrow: "Performance degradation",
        title: "A sustained breach is functionally an incident",
        lede: "Even if the service is technically still responding, a sustained breach of the response time target is treated as an incident. Severity is assessed on the TPP-facing figure; the obligations below fall on the party that owns the attributed segment.",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-4af0068d${_scopeId}>Severity definitions</h3>`);
            _push2(ssrRenderComponent(_component_EdSeverityTable, { rows: severities }, null, _parent2, _scopeId));
            _push2(`<h3 data-v-4af0068d${_scopeId}>Obligations during a P1 or P2 degradation</h3>`);
            _push2(ssrRenderComponent(_component_EdStages, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "01",
                    title: "Acknowledge promptly"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-4af0068d${_scopeId3}>For <strong data-v-4af0068d${_scopeId3}>P1</strong>, within <strong data-v-4af0068d${_scopeId3}>15 minutes</strong> of the owning party becoming aware. For <strong data-v-4af0068d${_scopeId3}>P2</strong>, within <strong data-v-4af0068d${_scopeId3}>1 hour</strong>.</p>`);
                      } else {
                        return [
                          createVNode("p", null, [
                            createTextVNode("For "),
                            createVNode("strong", null, "P1"),
                            createTextVNode(", within "),
                            createVNode("strong", null, "15 minutes"),
                            createTextVNode(" of the owning party becoming aware. For "),
                            createVNode("strong", null, "P2"),
                            createTextVNode(", within "),
                            createVNode("strong", null, "1 hour"),
                            createTextVNode(".")
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "02",
                    title: "Notify the other party"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-4af0068d${_scopeId3}>Through the agreed incident channel. Where the LFI owns the cause, it notifies Nebras; where the API Hub segment is the cause, Nebras notifies the affected LFIs.</p>`);
                      } else {
                        return [
                          createVNode("p", null, "Through the agreed incident channel. Where the LFI owns the cause, it notifies Nebras; where the API Hub segment is the cause, Nebras notifies the affected LFIs.")
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
                        _push4(`<p data-v-4af0068d${_scopeId3}>For <strong data-v-4af0068d${_scopeId3}>P1</strong>, at least every <strong data-v-4af0068d${_scopeId3}>30 minutes</strong> until performance is restored. For <strong data-v-4af0068d${_scopeId3}>P2</strong>, at least every <strong data-v-4af0068d${_scopeId3}>2 hours</strong>.</p>`);
                      } else {
                        return [
                          createVNode("p", null, [
                            createTextVNode("For "),
                            createVNode("strong", null, "P1"),
                            createTextVNode(", at least every "),
                            createVNode("strong", null, "30 minutes"),
                            createTextVNode(" until performance is restored. For "),
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
                        _push4(`<p data-v-4af0068d${_scopeId3}>Only once performance has been stable within target for a reasonable observation period (typically 30 minutes).</p>`);
                      } else {
                        return [
                          createVNode("p", null, "Only once performance has been stable within target for a reasonable observation period (typically 30 minutes).")
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
                          createTextVNode(", within "),
                          createVNode("strong", null, "15 minutes"),
                          createTextVNode(" of the owning party becoming aware. For "),
                          createVNode("strong", null, "P2"),
                          createTextVNode(", within "),
                          createVNode("strong", null, "1 hour"),
                          createTextVNode(".")
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_EdStage, {
                      num: "02",
                      title: "Notify the other party"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, "Through the agreed incident channel. Where the LFI owns the cause, it notifies Nebras; where the API Hub segment is the cause, Nebras notifies the affected LFIs.")
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
                          createTextVNode(", at least every "),
                          createVNode("strong", null, "30 minutes"),
                          createTextVNode(" until performance is restored. For "),
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
                        createVNode("p", null, "Only once performance has been stable within target for a reasonable observation period (typically 30 minutes).")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCallout, { color: "var(--at-navy-deep)" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-4af0068d${_scopeId2}>Nebras takes responsibility for cascading status information to affected TPPs through its own communication channels, whichever segment the degradation sits in. <strong data-v-4af0068d${_scopeId2}>LFIs are not expected to communicate directly with TPPs during degradation incidents.</strong></p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode("Nebras takes responsibility for cascading status information to affected TPPs through its own communication channels, whichever segment the degradation sits in. "),
                      createVNode("strong", null, "LFIs are not expected to communicate directly with TPPs during degradation incidents.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-4af0068d${_scopeId}>Post-incident review</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`For every P1 degradation — and for any P2 that recurs within 30 days — the party that owns the attributed cause is expected to provide a post-incident review within <strong data-v-4af0068d${_scopeId2}>five business days</strong> of resolution. Where the cause spans both segments, the review is produced jointly. The review should cover:`);
                } else {
                  return [
                    createTextVNode("For every P1 degradation — and for any P2 that recurs within 30 days — the party that owns the attributed cause is expected to provide a post-incident review within "),
                    createVNode("strong", null, "five business days"),
                    createTextVNode(" of resolution. Where the cause spans both segments, the review is produced jointly. The review should cover:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-4af0068d${_scopeId2}>A factual timeline of the degradation</li><li data-v-4af0068d${_scopeId2}>The root cause, including any capacity, data-growth, or dependency factors</li><li data-v-4af0068d${_scopeId2}>The customer and TPP impact</li><li data-v-4af0068d${_scopeId2}>The remediation already applied</li><li data-v-4af0068d${_scopeId2}>Any further actions that will be taken to prevent recurrence, with owners and dates</li>`);
                } else {
                  return [
                    createVNode("li", null, "A factual timeline of the degradation"),
                    createVNode("li", null, "The root cause, including any capacity, data-growth, or dependency factors"),
                    createVNode("li", null, "The customer and TPP impact"),
                    createVNode("li", null, "The remediation already applied"),
                    createVNode("li", null, "Any further actions that will be taken to prevent recurrence, with owners and dates")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, "Severity definitions"),
              createVNode(_component_EdSeverityTable, { rows: severities }),
              createVNode("h3", null, "Obligations during a P1 or P2 degradation"),
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
                        createTextVNode(", within "),
                        createVNode("strong", null, "15 minutes"),
                        createTextVNode(" of the owning party becoming aware. For "),
                        createVNode("strong", null, "P2"),
                        createTextVNode(", within "),
                        createVNode("strong", null, "1 hour"),
                        createTextVNode(".")
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_EdStage, {
                    num: "02",
                    title: "Notify the other party"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, "Through the agreed incident channel. Where the LFI owns the cause, it notifies Nebras; where the API Hub segment is the cause, Nebras notifies the affected LFIs.")
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
                        createTextVNode(", at least every "),
                        createVNode("strong", null, "30 minutes"),
                        createTextVNode(" until performance is restored. For "),
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
                      createVNode("p", null, "Only once performance has been stable within target for a reasonable observation period (typically 30 minutes).")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_EdCallout, { color: "var(--at-navy-deep)" }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode("Nebras takes responsibility for cascading status information to affected TPPs through its own communication channels, whichever segment the degradation sits in. "),
                    createVNode("strong", null, "LFIs are not expected to communicate directly with TPPs during degradation incidents.")
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "Post-incident review"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("For every P1 degradation — and for any P2 that recurs within 30 days — the party that owns the attributed cause is expected to provide a post-incident review within "),
                  createVNode("strong", null, "five business days"),
                  createTextVNode(" of resolution. Where the cause spans both segments, the review is produced jointly. The review should cover:")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "A factual timeline of the degradation"),
                  createVNode("li", null, "The root cause, including any capacity, data-growth, or dependency factors"),
                  createVNode("li", null, "The customer and TPP impact"),
                  createVNode("li", null, "The remediation already applied"),
                  createVNode("li", null, "Any further actions that will be taken to prevent recurrence, with owners and dates")
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
        num: "09",
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
                  _push3(`Customer experience improves continuously as response times fall. Nebras and LFIs alike are expected to:`);
                } else {
                  return [
                    createTextVNode("Customer experience improves continuously as response times fall. Nebras and LFIs alike are expected to:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-4af0068d${_scopeId2}>Track response times against target across every endpoint, not just in aggregate, and at segment level as well as end to end</li><li data-v-4af0068d${_scopeId2}>Pay attention to trends at <strong data-v-4af0068d${_scopeId2}>p99</strong> even where p95 remains within target — p99 is an early warning of capacity or data-growth issues</li><li data-v-4af0068d${_scopeId2}>Review monthly response time reports with their engineering and operations leadership</li><li data-v-4af0068d${_scopeId2}>Invest in the capacity, caching, and downstream tuning required to keep pace with volume growth</li><li data-v-4af0068d${_scopeId2}>Keep dependency calls off the request path wherever the data allows it to be cached or pre-fetched</li><li data-v-4af0068d${_scopeId2}>Participate in ecosystem-wide reviews convened by Nebras to share practices for keeping Open Finance services fast</li>`);
                } else {
                  return [
                    createVNode("li", null, "Track response times against target across every endpoint, not just in aggregate, and at segment level as well as end to end"),
                    createVNode("li", null, [
                      createTextVNode("Pay attention to trends at "),
                      createVNode("strong", null, "p99"),
                      createTextVNode(" even where p95 remains within target — p99 is an early warning of capacity or data-growth issues")
                    ]),
                    createVNode("li", null, "Review monthly response time reports with their engineering and operations leadership"),
                    createVNode("li", null, "Invest in the capacity, caching, and downstream tuning required to keep pace with volume growth"),
                    createVNode("li", null, "Keep dependency calls off the request path wherever the data allows it to be cached or pre-fetched"),
                    createVNode("li", null, "Participate in ecosystem-wide reviews convened by Nebras to share practices for keeping Open Finance services fast")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Customer experience improves continuously as response times fall. Nebras and LFIs alike are expected to:")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Track response times against target across every endpoint, not just in aggregate, and at segment level as well as end to end"),
                  createVNode("li", null, [
                    createTextVNode("Pay attention to trends at "),
                    createVNode("strong", null, "p99"),
                    createTextVNode(" even where p95 remains within target — p99 is an early warning of capacity or data-growth issues")
                  ]),
                  createVNode("li", null, "Review monthly response time reports with their engineering and operations leadership"),
                  createVNode("li", null, "Invest in the capacity, caching, and downstream tuning required to keep pace with volume growth"),
                  createVNode("li", null, "Keep dependency calls off the request path wherever the data allows it to be cached or pre-fetched"),
                  createVNode("li", null, "Participate in ecosystem-wide reviews convened by Nebras to share practices for keeping Open Finance services fast")
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
              href: "/policy/ozone-connect-availability",
              category: "LFIs · Nebras",
              "category-color": "var(--at-teal)",
              title: "Ozone Connect Availability Policy",
              desc: "The 99.5% monthly availability standard for the LFI's Ozone Connect endpoints."
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
                href: "/policy/ozone-connect-availability",
                category: "LFIs · Nebras",
                "category-color": "var(--at-teal)",
                title: "Ozone Connect Availability Policy",
                desc: "The 99.5% monthly availability standard for the LFI's Ozone Connect endpoints."
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/policy/api-response-time.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const apiResponseTime = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4af0068d"]]);
export {
  apiResponseTime as default
};
