import { _ as __unplugin_components_0, a as __unplugin_components_2, b as __unplugin_components_6, c as __unplugin_components_7$1 } from "./EdBackStrip-COkyNhGh.js";
import { _ as __unplugin_components_7, a as __unplugin_components_8 } from "./EdCompareCards-BLuIwQN6.js";
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
  __name: "ozone-connect-data-quality",
  __ssrInlineRender: true,
  setup(__props) {
    const sections = [
      { id: "scope", label: "Scope" },
      { id: "expectations", label: "Expectations" },
      { id: "mapping", label: "Data Mapping" },
      { id: "proving", label: "Live proving" },
      { id: "monitoring", label: "Monitoring" },
      { id: "improvement", label: "Improvement" }
    ];
    const meta = [
      { label: "Applies to", value: "LFIs · Nebras" },
      { label: "Read", value: "7 min" },
      { label: "Updated", value: "22 Apr 2026" }
    ];
    const keyNums = [
      { value: "100", unit: "%", label: "Required-field delivery rate" },
      { value: "Real", label: "Time data freshness" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdBackStrip = __unplugin_components_0;
      const _component_EdHero = __unplugin_components_0$1;
      const _component_EdInPageNav = __unplugin_components_2;
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdBullets = __unplugin_components_5;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdCompareCards = __unplugin_components_7;
      const _component_EdCompareCard = __unplugin_components_8;
      const _component_EdRelatedCards = __unplugin_components_6;
      const _component_EdRelatedCard = __unplugin_components_7$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-page" }, _attrs))} data-v-6d6f58c3>`);
      _push(ssrRenderComponent(_component_EdBackStrip, {
        href: "/policy/",
        text: "All policies"
      }, null, _parent));
      _push(ssrRenderComponent(_component_EdHero, {
        eyebrow: "Operate · Measure · Improve",
        title: "Ozone Connect Data Quality Policy",
        meta,
        lede: "Defines the data quality expectations for data returned by an LFI's Ozone Connect endpoints — completeness, accuracy, and timeliness. The value of Open Finance to customers and TPPs depends on these properties holding.",
        "key-nums": keyNums
      }, null, _parent));
      _push(ssrRenderComponent(_component_EdInPageNav, { sections }, null, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "scope",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Scope",
        title: "Endpoints whose role is to return data",
        lede: "Applies to the <strong>response payloads of Ozone Connect endpoints that return data</strong> — that is, endpoints whose role is to provide information back to the TPP about customers, accounts, products, or services.",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-6d6f58c3${_scopeId}>In scope (examples)</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-6d6f58c3${_scopeId2}>Bank Data Sharing reads (<code data-v-6d6f58c3${_scopeId2}>GET /accounts</code>, <code data-v-6d6f58c3${_scopeId2}>GET /accounts/{accountId}/balances</code>, <code data-v-6d6f58c3${_scopeId2}>GET /accounts/{accountId}/transactions</code>, and related endpoints)</li><li data-v-6d6f58c3${_scopeId2}>Products and Leads reads (<code data-v-6d6f58c3${_scopeId2}>GET /products</code>, and the data returned after lead creation)</li><li data-v-6d6f58c3${_scopeId2}>Insurance policy and related data reads</li><li data-v-6d6f58c3${_scopeId2}>Any future Ozone Connect endpoint whose primary purpose is to return data about a customer, account, product, or service</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createTextVNode("Bank Data Sharing reads ("),
                      createVNode("code", null, "GET /accounts"),
                      createTextVNode(", "),
                      createVNode("code", null, "GET /accounts/{accountId}/balances"),
                      createTextVNode(", "),
                      createVNode("code", null, "GET /accounts/{accountId}/transactions"),
                      createTextVNode(", and related endpoints)")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("Products and Leads reads ("),
                      createVNode("code", null, "GET /products"),
                      createTextVNode(", and the data returned after lead creation)")
                    ]),
                    createVNode("li", null, "Insurance policy and related data reads"),
                    createVNode("li", null, "Any future Ozone Connect endpoint whose primary purpose is to return data about a customer, account, product, or service")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-6d6f58c3${_scopeId}>Out of scope</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-6d6f58c3${_scopeId2}>Action and initiation endpoints that do not return domain data (for example <code data-v-6d6f58c3${_scopeId2}>POST /payments</code>, <code data-v-6d6f58c3${_scopeId2}>POST /customers/action/cop-query</code>, and similar). These are governed by the <a href="/policy/ozone-connect-availability" data-v-6d6f58c3${_scopeId2}>Availability Policy</a> and the <a href="/policy/api-response-time" data-v-6d6f58c3${_scopeId2}>API Response Time Policy</a>, not this one.</li><li data-v-6d6f58c3${_scopeId2}>Internal system data that is not part of the published Ozone Connect OpenAPI specifications</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createTextVNode("Action and initiation endpoints that do not return domain data (for example "),
                      createVNode("code", null, "POST /payments"),
                      createTextVNode(", "),
                      createVNode("code", null, "POST /customers/action/cop-query"),
                      createTextVNode(", and similar). These are governed by the "),
                      createVNode("a", { href: "/policy/ozone-connect-availability" }, "Availability Policy"),
                      createTextVNode(" and the "),
                      createVNode("a", { href: "/policy/api-response-time" }, "API Response Time Policy"),
                      createTextVNode(", not this one.")
                    ]),
                    createVNode("li", null, "Internal system data that is not part of the published Ozone Connect OpenAPI specifications")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Where a data-returning endpoint is involved in a service initiation flow (for example returning payment status data), the data quality expectations in this policy apply to the data fields in the response.`);
                } else {
                  return [
                    createTextVNode("Where a data-returning endpoint is involved in a service initiation flow (for example returning payment status data), the data quality expectations in this policy apply to the data fields in the response.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, "In scope (examples)"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createTextVNode("Bank Data Sharing reads ("),
                    createVNode("code", null, "GET /accounts"),
                    createTextVNode(", "),
                    createVNode("code", null, "GET /accounts/{accountId}/balances"),
                    createTextVNode(", "),
                    createVNode("code", null, "GET /accounts/{accountId}/transactions"),
                    createTextVNode(", and related endpoints)")
                  ]),
                  createVNode("li", null, [
                    createTextVNode("Products and Leads reads ("),
                    createVNode("code", null, "GET /products"),
                    createTextVNode(", and the data returned after lead creation)")
                  ]),
                  createVNode("li", null, "Insurance policy and related data reads"),
                  createVNode("li", null, "Any future Ozone Connect endpoint whose primary purpose is to return data about a customer, account, product, or service")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Out of scope"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createTextVNode("Action and initiation endpoints that do not return domain data (for example "),
                    createVNode("code", null, "POST /payments"),
                    createTextVNode(", "),
                    createVNode("code", null, "POST /customers/action/cop-query"),
                    createTextVNode(", and similar). These are governed by the "),
                    createVNode("a", { href: "/policy/ozone-connect-availability" }, "Availability Policy"),
                    createTextVNode(" and the "),
                    createVNode("a", { href: "/policy/api-response-time" }, "API Response Time Policy"),
                    createTextVNode(", not this one.")
                  ]),
                  createVNode("li", null, "Internal system data that is not part of the published Ozone Connect OpenAPI specifications")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Where a data-returning endpoint is involved in a service initiation flow (for example returning payment status data), the data quality expectations in this policy apply to the data fields in the response.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "expectations",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "Delivery expectations",
        title: "Required, optional, accurate, current",
        lede: "The Ozone Connect OpenAPI specifications define, for each in-scope endpoint, the fields that may appear in a response and which of those fields are required. LFIs are expected to deliver data against those specifications as follows.",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdCompareCards, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_EdCompareCard, {
                    accent: "#B33A3A",
                    kicker: "Required fields",
                    example: "MUST be present"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<ul data-v-6d6f58c3${_scopeId3}><li data-v-6d6f58c3${_scopeId3}>Fields marked as required in the Ozone Connect OpenAPI specification <strong data-v-6d6f58c3${_scopeId3}>must</strong> be delivered on every response where the endpoint returns data for the relevant resource</li><li data-v-6d6f58c3${_scopeId3}>A required field is required because TPPs and downstream use cases cannot function reliably without it</li><li data-v-6d6f58c3${_scopeId3}>Missing or null required fields are treated as a <strong data-v-6d6f58c3${_scopeId3}>data quality defect</strong> regardless of the underlying cause in the LFI&#39;s systems</li></ul>`);
                      } else {
                        return [
                          createVNode("ul", null, [
                            createVNode("li", null, [
                              createTextVNode("Fields marked as required in the Ozone Connect OpenAPI specification "),
                              createVNode("strong", null, "must"),
                              createTextVNode(" be delivered on every response where the endpoint returns data for the relevant resource")
                            ]),
                            createVNode("li", null, "A required field is required because TPPs and downstream use cases cannot function reliably without it"),
                            createVNode("li", null, [
                              createTextVNode("Missing or null required fields are treated as a "),
                              createVNode("strong", null, "data quality defect"),
                              createTextVNode(" regardless of the underlying cause in the LFI's systems")
                            ])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_EdCompareCard, {
                    accent: "var(--at-teal)",
                    kicker: "Optional fields",
                    example: "MUST if data exists"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<ul data-v-6d6f58c3${_scopeId3}><li data-v-6d6f58c3${_scopeId3}>Fields that are optional in the spec <strong data-v-6d6f58c3${_scopeId3}>must</strong> be delivered whenever the underlying data exists in the LFI&#39;s systems and can be mapped to the specification</li><li data-v-6d6f58c3${_scopeId3}>&quot;Exists and can be mapped&quot; means the data is held by the LFI in some form, and there is a reasonable mapping from the LFI&#39;s internal representation to the specified field</li><li data-v-6d6f58c3${_scopeId3}>LFIs are not expected to invent data they do not hold, but are expected to deliver data they do hold</li></ul>`);
                      } else {
                        return [
                          createVNode("ul", null, [
                            createVNode("li", null, [
                              createTextVNode("Fields that are optional in the spec "),
                              createVNode("strong", null, "must"),
                              createTextVNode(" be delivered whenever the underlying data exists in the LFI's systems and can be mapped to the specification")
                            ]),
                            createVNode("li", null, `"Exists and can be mapped" means the data is held by the LFI in some form, and there is a reasonable mapping from the LFI's internal representation to the specified field`),
                            createVNode("li", null, "LFIs are not expected to invent data they do not hold, but are expected to deliver data they do hold")
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_EdCompareCard, {
                      accent: "#B33A3A",
                      kicker: "Required fields",
                      example: "MUST be present"
                    }, {
                      default: withCtx(() => [
                        createVNode("ul", null, [
                          createVNode("li", null, [
                            createTextVNode("Fields marked as required in the Ozone Connect OpenAPI specification "),
                            createVNode("strong", null, "must"),
                            createTextVNode(" be delivered on every response where the endpoint returns data for the relevant resource")
                          ]),
                          createVNode("li", null, "A required field is required because TPPs and downstream use cases cannot function reliably without it"),
                          createVNode("li", null, [
                            createTextVNode("Missing or null required fields are treated as a "),
                            createVNode("strong", null, "data quality defect"),
                            createTextVNode(" regardless of the underlying cause in the LFI's systems")
                          ])
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_EdCompareCard, {
                      accent: "var(--at-teal)",
                      kicker: "Optional fields",
                      example: "MUST if data exists"
                    }, {
                      default: withCtx(() => [
                        createVNode("ul", null, [
                          createVNode("li", null, [
                            createTextVNode("Fields that are optional in the spec "),
                            createVNode("strong", null, "must"),
                            createTextVNode(" be delivered whenever the underlying data exists in the LFI's systems and can be mapped to the specification")
                          ]),
                          createVNode("li", null, `"Exists and can be mapped" means the data is held by the LFI in some form, and there is a reasonable mapping from the LFI's internal representation to the specified field`),
                          createVNode("li", null, "LFIs are not expected to invent data they do not hold, but are expected to deliver data they do hold")
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-6d6f58c3${_scopeId}>Accuracy</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Data returned on in-scope responses <strong data-v-6d6f58c3${_scopeId2}>must</strong> match the LFI&#39;s system of record. Values that are present must be correct — amounts, identifiers, dates, statuses, names, and every other specified field.`);
                } else {
                  return [
                    createTextVNode("Data returned on in-scope responses "),
                    createVNode("strong", null, "must"),
                    createTextVNode(" match the LFI's system of record. Values that are present must be correct — amounts, identifiers, dates, statuses, names, and every other specified field.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-6d6f58c3${_scopeId2}><strong data-v-6d6f58c3${_scopeId2}>Field values</strong> — the value returned is the value held in the LFI&#39;s systems</li><li data-v-6d6f58c3${_scopeId2}><strong data-v-6d6f58c3${_scopeId2}>Units and formats</strong> — currency, precision, date-time format, status enumerations, and identifiers conform to the specification</li><li data-v-6d6f58c3${_scopeId2}><strong data-v-6d6f58c3${_scopeId2}>Relationships between fields</strong> — values that relate to one another remain consistent (for example available balance consistent with booked and pending movements)</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Field values"),
                      createTextVNode(" — the value returned is the value held in the LFI's systems")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Units and formats"),
                      createTextVNode(" — currency, precision, date-time format, status enumerations, and identifiers conform to the specification")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Relationships between fields"),
                      createTextVNode(" — values that relate to one another remain consistent (for example available balance consistent with booked and pending movements)")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Defects in accuracy are treated with the same severity as missing required fields.`);
                } else {
                  return [
                    createTextVNode("Defects in accuracy are treated with the same severity as missing required fields.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-6d6f58c3${_scopeId}>Real-time data</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Data returned on in-scope responses <strong data-v-6d6f58c3${_scopeId2}>must</strong> reflect the current state of the LFI&#39;s systems at the time of the request. TPPs and their customers act on what they see; stale data breaks that trust.`);
                } else {
                  return [
                    createTextVNode("Data returned on in-scope responses "),
                    createVNode("strong", null, "must"),
                    createTextVNode(" reflect the current state of the LFI's systems at the time of the request. TPPs and their customers act on what they see; stale data breaks that trust.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-6d6f58c3${_scopeId2}>Data must be sourced from systems that reflect the current position of the customer, account, product, or service</li><li data-v-6d6f58c3${_scopeId2}>Where caching is used in the LFI&#39;s implementation, it must be bounded such that the data returned remains current for the purpose of the endpoint</li><li data-v-6d6f58c3${_scopeId2}>End-of-day or overnight batch propagation is <strong data-v-6d6f58c3${_scopeId2}>not acceptable</strong> for any in-scope field unless explicitly recorded in the Data Mapping Commitment and agreed with Nebras</li>`);
                } else {
                  return [
                    createVNode("li", null, "Data must be sourced from systems that reflect the current position of the customer, account, product, or service"),
                    createVNode("li", null, "Where caching is used in the LFI's implementation, it must be bounded such that the data returned remains current for the purpose of the endpoint"),
                    createVNode("li", null, [
                      createTextVNode("End-of-day or overnight batch propagation is "),
                      createVNode("strong", null, "not acceptable"),
                      createTextVNode(" for any in-scope field unless explicitly recorded in the Data Mapping Commitment and agreed with Nebras")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Where an LFI operates processes that cause transient divergence (for example end-of-day cutover windows), these must be disclosed to Nebras and communicated to TPPs through the standard incident and maintenance channels defined in the <a href="/policy/ozone-connect-availability" data-v-6d6f58c3${_scopeId2}>Availability Policy</a>.`);
                } else {
                  return [
                    createTextVNode("Where an LFI operates processes that cause transient divergence (for example end-of-day cutover windows), these must be disclosed to Nebras and communicated to TPPs through the standard incident and maintenance channels defined in the "),
                    createVNode("a", { href: "/policy/ozone-connect-availability" }, "Availability Policy"),
                    createTextVNode(".")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-6d6f58c3${_scopeId}>Forward commitment</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`LFIs are expected to progressively align their internal systems so that more optional fields can be delivered, more accurately, and more current, over time. The objective is for every LFI to converge on delivering the full specified data set, accurately and in real time, wherever the data realistically exists in the banking estate.`);
                } else {
                  return [
                    createTextVNode("LFIs are expected to progressively align their internal systems so that more optional fields can be delivered, more accurately, and more current, over time. The objective is for every LFI to converge on delivering the full specified data set, accurately and in real time, wherever the data realistically exists in the banking estate.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdCompareCards, null, {
                default: withCtx(() => [
                  createVNode(_component_EdCompareCard, {
                    accent: "#B33A3A",
                    kicker: "Required fields",
                    example: "MUST be present"
                  }, {
                    default: withCtx(() => [
                      createVNode("ul", null, [
                        createVNode("li", null, [
                          createTextVNode("Fields marked as required in the Ozone Connect OpenAPI specification "),
                          createVNode("strong", null, "must"),
                          createTextVNode(" be delivered on every response where the endpoint returns data for the relevant resource")
                        ]),
                        createVNode("li", null, "A required field is required because TPPs and downstream use cases cannot function reliably without it"),
                        createVNode("li", null, [
                          createTextVNode("Missing or null required fields are treated as a "),
                          createVNode("strong", null, "data quality defect"),
                          createTextVNode(" regardless of the underlying cause in the LFI's systems")
                        ])
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_EdCompareCard, {
                    accent: "var(--at-teal)",
                    kicker: "Optional fields",
                    example: "MUST if data exists"
                  }, {
                    default: withCtx(() => [
                      createVNode("ul", null, [
                        createVNode("li", null, [
                          createTextVNode("Fields that are optional in the spec "),
                          createVNode("strong", null, "must"),
                          createTextVNode(" be delivered whenever the underlying data exists in the LFI's systems and can be mapped to the specification")
                        ]),
                        createVNode("li", null, `"Exists and can be mapped" means the data is held by the LFI in some form, and there is a reasonable mapping from the LFI's internal representation to the specified field`),
                        createVNode("li", null, "LFIs are not expected to invent data they do not hold, but are expected to deliver data they do hold")
                      ])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode("h3", null, "Accuracy"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Data returned on in-scope responses "),
                  createVNode("strong", null, "must"),
                  createTextVNode(" match the LFI's system of record. Values that are present must be correct — amounts, identifiers, dates, statuses, names, and every other specified field.")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Field values"),
                    createTextVNode(" — the value returned is the value held in the LFI's systems")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Units and formats"),
                    createTextVNode(" — currency, precision, date-time format, status enumerations, and identifiers conform to the specification")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Relationships between fields"),
                    createTextVNode(" — values that relate to one another remain consistent (for example available balance consistent with booked and pending movements)")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Defects in accuracy are treated with the same severity as missing required fields.")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Real-time data"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Data returned on in-scope responses "),
                  createVNode("strong", null, "must"),
                  createTextVNode(" reflect the current state of the LFI's systems at the time of the request. TPPs and their customers act on what they see; stale data breaks that trust.")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Data must be sourced from systems that reflect the current position of the customer, account, product, or service"),
                  createVNode("li", null, "Where caching is used in the LFI's implementation, it must be bounded such that the data returned remains current for the purpose of the endpoint"),
                  createVNode("li", null, [
                    createTextVNode("End-of-day or overnight batch propagation is "),
                    createVNode("strong", null, "not acceptable"),
                    createTextVNode(" for any in-scope field unless explicitly recorded in the Data Mapping Commitment and agreed with Nebras")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Where an LFI operates processes that cause transient divergence (for example end-of-day cutover windows), these must be disclosed to Nebras and communicated to TPPs through the standard incident and maintenance channels defined in the "),
                  createVNode("a", { href: "/policy/ozone-connect-availability" }, "Availability Policy"),
                  createTextVNode(".")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Forward commitment"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("LFIs are expected to progressively align their internal systems so that more optional fields can be delivered, more accurately, and more current, over time. The objective is for every LFI to converge on delivering the full specified data set, accurately and in real time, wherever the data realistically exists in the banking estate.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "mapping",
        num: "03",
        color: "var(--at-blue)",
        eyebrow: "Data Mapping Commitment",
        title: "The reference point for ongoing monitoring",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`As part of onboarding to the ecosystem, each LFI provides a <strong data-v-6d6f58c3${_scopeId2}>Data Mapping Commitment</strong> that records, for each in-scope endpoint and field, whether the LFI will deliver that field, on what basis, and with what freshness. This commitment is the reference point for Nebras&#39;s ongoing monitoring of data quality.`);
                } else {
                  return [
                    createTextVNode("As part of onboarding to the ecosystem, each LFI provides a "),
                    createVNode("strong", null, "Data Mapping Commitment"),
                    createTextVNode(" that records, for each in-scope endpoint and field, whether the LFI will deliver that field, on what basis, and with what freshness. This commitment is the reference point for Nebras's ongoing monitoring of data quality.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-6d6f58c3${_scopeId2}>Reviewed and updated when the LFI makes material changes to its core systems, when new Ozone Connect endpoints or fields are introduced, or when Nebras identifies gaps through monitoring</li><li data-v-6d6f58c3${_scopeId2}>LFIs are accountable for delivering against their Data Mapping Commitment. <strong data-v-6d6f58c3${_scopeId2}>Under-delivery against the commitment is treated as a data quality defect.</strong></li>`);
                } else {
                  return [
                    createVNode("li", null, "Reviewed and updated when the LFI makes material changes to its core systems, when new Ozone Connect endpoints or fields are introduced, or when Nebras identifies gaps through monitoring"),
                    createVNode("li", null, [
                      createTextVNode("LFIs are accountable for delivering against their Data Mapping Commitment. "),
                      createVNode("strong", null, "Under-delivery against the commitment is treated as a data quality defect.")
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
                  createTextVNode("As part of onboarding to the ecosystem, each LFI provides a "),
                  createVNode("strong", null, "Data Mapping Commitment"),
                  createTextVNode(" that records, for each in-scope endpoint and field, whether the LFI will deliver that field, on what basis, and with what freshness. This commitment is the reference point for Nebras's ongoing monitoring of data quality.")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Reviewed and updated when the LFI makes material changes to its core systems, when new Ozone Connect endpoints or fields are introduced, or when Nebras identifies gaps through monitoring"),
                  createVNode("li", null, [
                    createTextVNode("LFIs are accountable for delivering against their Data Mapping Commitment. "),
                    createVNode("strong", null, "Under-delivery against the commitment is treated as a data quality defect.")
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
        num: "04",
        color: "var(--at-blue-deep)",
        eyebrow: "Live proving",
        title: "Proving data quality before go-live",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Before an LFI is signed off as compliant with this policy and approved to go live on the ecosystem, the LFI must complete a <strong data-v-6d6f58c3${_scopeId2}>live proving period</strong> with one or more TPPs.`);
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
                  _push3(`<li data-v-6d6f58c3${_scopeId2}>The LFI operates its Ozone Connect endpoints against real TPP traffic in production</li><li data-v-6d6f58c3${_scopeId2}>Field presence, accuracy, and real-time behaviour are observed across the proving period and compared against the LFI&#39;s Data Mapping Commitment and the specification</li><li data-v-6d6f58c3${_scopeId2}>Nebras reviews the results and confirms, or withholds, sign-off before the LFI is approved for general availability</li>`);
                } else {
                  return [
                    createVNode("li", null, "The LFI operates its Ozone Connect endpoints against real TPP traffic in production"),
                    createVNode("li", null, "Field presence, accuracy, and real-time behaviour are observed across the proving period and compared against the LFI's Data Mapping Commitment and the specification"),
                    createVNode("li", null, "Nebras reviews the results and confirms, or withholds, sign-off before the LFI is approved for general availability")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`An LFI that does not demonstrably meet the expectations of this policy during proving remains in proving until it does, with Nebras support where required. This requirement applies equally to initial go-live and to any subsequent major version go-live.`);
                } else {
                  return [
                    createTextVNode("An LFI that does not demonstrably meet the expectations of this policy during proving remains in proving until it does, with Nebras support where required. This requirement applies equally to initial go-live and to any subsequent major version go-live.")
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
                  createVNode("li", null, "The LFI operates its Ozone Connect endpoints against real TPP traffic in production"),
                  createVNode("li", null, "Field presence, accuracy, and real-time behaviour are observed across the proving period and compared against the LFI's Data Mapping Commitment and the specification"),
                  createVNode("li", null, "Nebras reviews the results and confirms, or withholds, sign-off before the LFI is approved for general availability")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("An LFI that does not demonstrably meet the expectations of this policy during proving remains in proving until it does, with Nebras support where required. This requirement applies equally to initial go-live and to any subsequent major version go-live.")
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
        num: "05",
        color: "var(--at-navy)",
        eyebrow: "Monitoring & intervention",
        title: "Continuous, central observation",
        lede: "Nebras actively monitors the data returned by every LFI's Ozone Connect endpoints, using the API Hub's own logs and the schema validation performed on every response. Field-level presence, consistency, and freshness are observed centrally, in real time.",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-6d6f58c3${_scopeId}>What is monitored</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-6d6f58c3${_scopeId2}><strong data-v-6d6f58c3${_scopeId2}>Required field presence</strong> — the rate at which required fields are delivered on in-scope responses</li><li data-v-6d6f58c3${_scopeId2}><strong data-v-6d6f58c3${_scopeId2}>Optional field presence</strong> — the rate at which optional fields are delivered, measured against the LFI&#39;s Data Mapping Commitment</li><li data-v-6d6f58c3${_scopeId2}><strong data-v-6d6f58c3${_scopeId2}>Accuracy and consistency</strong> — signals that indicate data divergence from the LFI&#39;s system of record, including internal inconsistencies in the response and divergence from expected formats</li><li data-v-6d6f58c3${_scopeId2}><strong data-v-6d6f58c3${_scopeId2}>Freshness</strong> — signals that indicate data is not reflecting current state, including staleness patterns across endpoints</li><li data-v-6d6f58c3${_scopeId2}><strong data-v-6d6f58c3${_scopeId2}>Peer benchmarks</strong> — each LFI&#39;s delivery is compared against similar LFIs in the ecosystem, so that outliers are visible</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Required field presence"),
                      createTextVNode(" — the rate at which required fields are delivered on in-scope responses")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Optional field presence"),
                      createTextVNode(" — the rate at which optional fields are delivered, measured against the LFI's Data Mapping Commitment")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Accuracy and consistency"),
                      createTextVNode(" — signals that indicate data divergence from the LFI's system of record, including internal inconsistencies in the response and divergence from expected formats")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Freshness"),
                      createTextVNode(" — signals that indicate data is not reflecting current state, including staleness patterns across endpoints")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Peer benchmarks"),
                      createTextVNode(" — each LFI's delivery is compared against similar LFIs in the ecosystem, so that outliers are visible")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-6d6f58c3${_scopeId}>When delivery falls short</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Where monitoring shows that an LFI is not delivering in line with the specification or its Data Mapping Commitment, or is materially behind its peer group on the same fields, Nebras will engage directly with the LFI. That engagement may include:`);
                } else {
                  return [
                    createTextVNode("Where monitoring shows that an LFI is not delivering in line with the specification or its Data Mapping Commitment, or is materially behind its peer group on the same fields, Nebras will engage directly with the LFI. That engagement may include:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-6d6f58c3${_scopeId2}>Reviewing the specific fields, records, or time windows in question and the underlying cause</li><li data-v-6d6f58c3${_scopeId2}>Updating the Data Mapping Commitment where a field is genuinely not available in the LFI&#39;s systems</li><li data-v-6d6f58c3${_scopeId2}>Agreeing remediation plans and timelines where a field is available but not being delivered, or is being delivered incorrectly or with delay</li><li data-v-6d6f58c3${_scopeId2}>Escalating persistent or material non-delivery to the relevant regulatory authority where appropriate</li>`);
                } else {
                  return [
                    createVNode("li", null, "Reviewing the specific fields, records, or time windows in question and the underlying cause"),
                    createVNode("li", null, "Updating the Data Mapping Commitment where a field is genuinely not available in the LFI's systems"),
                    createVNode("li", null, "Agreeing remediation plans and timelines where a field is available but not being delivered, or is being delivered incorrectly or with delay"),
                    createVNode("li", null, "Escalating persistent or material non-delivery to the relevant regulatory authority where appropriate")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`LFIs must provide Nebras with any information required to support this process, including mappings, field-level definitions, and roadmap commitments where relevant.`);
                } else {
                  return [
                    createTextVNode("LFIs must provide Nebras with any information required to support this process, including mappings, field-level definitions, and roadmap commitments where relevant.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, "What is monitored"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Required field presence"),
                    createTextVNode(" — the rate at which required fields are delivered on in-scope responses")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Optional field presence"),
                    createTextVNode(" — the rate at which optional fields are delivered, measured against the LFI's Data Mapping Commitment")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Accuracy and consistency"),
                    createTextVNode(" — signals that indicate data divergence from the LFI's system of record, including internal inconsistencies in the response and divergence from expected formats")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Freshness"),
                    createTextVNode(" — signals that indicate data is not reflecting current state, including staleness patterns across endpoints")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Peer benchmarks"),
                    createTextVNode(" — each LFI's delivery is compared against similar LFIs in the ecosystem, so that outliers are visible")
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "When delivery falls short"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Where monitoring shows that an LFI is not delivering in line with the specification or its Data Mapping Commitment, or is materially behind its peer group on the same fields, Nebras will engage directly with the LFI. That engagement may include:")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Reviewing the specific fields, records, or time windows in question and the underlying cause"),
                  createVNode("li", null, "Updating the Data Mapping Commitment where a field is genuinely not available in the LFI's systems"),
                  createVNode("li", null, "Agreeing remediation plans and timelines where a field is available but not being delivered, or is being delivered incorrectly or with delay"),
                  createVNode("li", null, "Escalating persistent or material non-delivery to the relevant regulatory authority where appropriate")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("LFIs must provide Nebras with any information required to support this process, including mappings, field-level definitions, and roadmap commitments where relevant.")
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
        num: "06",
        color: "var(--at-teal-deep)",
        eyebrow: "Continuous improvement",
        title: "Quality should improve over the life of the ecosystem",
        tone: "surface",
        narrow: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Data quality is expected to improve over the life of the ecosystem, not hold steady. LFIs are expected to:`);
                } else {
                  return [
                    createTextVNode("Data quality is expected to improve over the life of the ecosystem, not hold steady. LFIs are expected to:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-6d6f58c3${_scopeId2}>Treat gaps identified through Nebras&#39;s monitoring as inputs into their own technology roadmaps</li><li data-v-6d6f58c3${_scopeId2}>Prioritise closing data gaps that affect multiple TPP use cases or that place the LFI behind its peer group</li><li data-v-6d6f58c3${_scopeId2}>Communicate planned improvements to Nebras so that ecosystem expectations can be set accordingly</li>`);
                } else {
                  return [
                    createVNode("li", null, "Treat gaps identified through Nebras's monitoring as inputs into their own technology roadmaps"),
                    createVNode("li", null, "Prioritise closing data gaps that affect multiple TPP use cases or that place the LFI behind its peer group"),
                    createVNode("li", null, "Communicate planned improvements to Nebras so that ecosystem expectations can be set accordingly")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Nebras will periodically publish anonymised ecosystem-wide views of data quality so that LFIs and TPPs share a common picture of where the ecosystem is strong and where it needs to improve.`);
                } else {
                  return [
                    createTextVNode("Nebras will periodically publish anonymised ecosystem-wide views of data quality so that LFIs and TPPs share a common picture of where the ecosystem is strong and where it needs to improve.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Data quality is expected to improve over the life of the ecosystem, not hold steady. LFIs are expected to:")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Treat gaps identified through Nebras's monitoring as inputs into their own technology roadmaps"),
                  createVNode("li", null, "Prioritise closing data gaps that affect multiple TPP use cases or that place the LFI behind its peer group"),
                  createVNode("li", null, "Communicate planned improvements to Nebras so that ecosystem expectations can be set accordingly")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Nebras will periodically publish anonymised ecosystem-wide views of data quality so that LFIs and TPPs share a common picture of where the ecosystem is strong and where it needs to improve.")
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
              desc: "The 99.5% monthly availability standard for the same endpoints."
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRelatedCard, {
              href: "/policy/api-response-time",
              category: "LFIs · Nebras",
              "category-color": "var(--at-teal)",
              title: "API Response Time Policy",
              desc: "The 500 ms p95 standard, measured end to end across the whole TPP-facing request."
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdRelatedCard, {
                href: "/policy/ozone-connect-availability",
                category: "LFIs · Nebras",
                "category-color": "var(--at-teal)",
                title: "Ozone Connect Availability Policy",
                desc: "The 99.5% monthly availability standard for the same endpoints."
              }),
              createVNode(_component_EdRelatedCard, {
                href: "/policy/api-response-time",
                category: "LFIs · Nebras",
                "category-color": "var(--at-teal)",
                title: "API Response Time Policy",
                desc: "The 500 ms p95 standard, measured end to end across the whole TPP-facing request."
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/policy/ozone-connect-data-quality.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ozoneConnectDataQuality = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-6d6f58c3"]]);
export {
  ozoneConnectDataQuality as default
};
