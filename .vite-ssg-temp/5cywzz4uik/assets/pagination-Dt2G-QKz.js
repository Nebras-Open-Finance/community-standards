import { _ as _sfc_main$1 } from "./APIFlowsPagination-D63XLrxb.js";
import { _ as __unplugin_components_8 } from "./APIFlowViewer-C5xJUdUs.js";
import { E as EdCode } from "./EdCode-BQ4YLUeg.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { defineComponent, mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "mermaid";
import "./useChartTheme-DtmiKid7.js";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const exampleRequest = `GET /accounts/acc-001/transactions?fromBookingDateTime=2026-01-01T00:00:00Z&page=2&page-size=100
`;
const exampleResponse = `{
  "data": [
    { "accountId": "acc-001", "transactionId": "txn-900234", "...": "..." }
  ],
  "meta": {
    "paginated": true,
    "totalPages": 12,
    "totalRecords": 1187
  }
}
`;
const emptyResponse = `{
  "data": [],
  "meta": {
    "paginated": true,
    "totalPages": 0,
    "totalRecords": 0
  }
}
`;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "pagination",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdRefTable = __unplugin_components_12;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdCode = EdCode;
      const _component_APIFlowViewer = __unplugin_components_8;
      const _component_APIFlowsPagination = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-160b3875><section class="ed-doc__hero" data-v-160b3875><div class="ed-doc__inner" data-v-160b3875><div class="ed-doc__eyebrow" data-v-160b3875><span class="ed-doc__eyebrow-dash" data-v-160b3875></span> LFI · Banking · Bank Data Sharing </div><h1 class="ed-doc__title" data-v-160b3875> Pagination <span class="ed-doc__read" data-v-160b3875>2 min read</span></h1><p class="ed-doc__lede" data-v-160b3875> Pagination for Bank Data Sharing endpoints is <strong data-v-160b3875>page-based</strong> on the LFI (Ozone Connect) side. The API Hub converts the LFI&#39;s page/meta response into the <code data-v-160b3875>Links</code> envelope returned to the TPP. </p><p class="ed-doc__lede" data-v-160b3875> For the end-to-end picture — including how the Hub converts LFI <code data-v-160b3875>meta</code> into TPP <code data-v-160b3875>Links</code> — see <a href="/knowledge-base/articles/pagination" data-v-160b3875>Pagination — LFI <code data-v-160b3875>meta</code> to TPP <code data-v-160b3875>Links</code></a>. </p></div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "which-paginate",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Which endpoints require pagination",
        title: "Required vs optional pagination",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-160b3875${_scopeId2}><thead data-v-160b3875${_scopeId2}><tr data-v-160b3875${_scopeId2}><th data-v-160b3875${_scopeId2}>Endpoint</th><th data-v-160b3875${_scopeId2}>Pagination</th></tr></thead><tbody data-v-160b3875${_scopeId2}><tr data-v-160b3875${_scopeId2}><td data-v-160b3875${_scopeId2}><span class="endpoint" data-v-160b3875${_scopeId2}><span class="http-method http-method--get" data-v-160b3875${_scopeId2}>GET</span><code data-v-160b3875${_scopeId2}>/accounts/{accountId}/transactions</code></span></td><td data-v-160b3875${_scopeId2}><strong data-v-160b3875${_scopeId2}>Required</strong></td></tr><tr data-v-160b3875${_scopeId2}><td data-v-160b3875${_scopeId2}><span class="endpoint" data-v-160b3875${_scopeId2}><span class="http-method http-method--get" data-v-160b3875${_scopeId2}>GET</span><code data-v-160b3875${_scopeId2}>/accounts/{accountId}/statements</code></span></td><td data-v-160b3875${_scopeId2}><strong data-v-160b3875${_scopeId2}>Required</strong></td></tr><tr data-v-160b3875${_scopeId2}><td data-v-160b3875${_scopeId2}><span class="endpoint" data-v-160b3875${_scopeId2}><span class="http-method http-method--get" data-v-160b3875${_scopeId2}>GET</span><code data-v-160b3875${_scopeId2}>/accounts</code></span></td><td data-v-160b3875${_scopeId2}>Optional</td></tr><tr data-v-160b3875${_scopeId2}><td data-v-160b3875${_scopeId2}><span class="endpoint" data-v-160b3875${_scopeId2}><span class="http-method http-method--get" data-v-160b3875${_scopeId2}>GET</span><code data-v-160b3875${_scopeId2}>/accounts/{accountId}/balances</code></span></td><td data-v-160b3875${_scopeId2}>Optional</td></tr><tr data-v-160b3875${_scopeId2}><td data-v-160b3875${_scopeId2}><span class="endpoint" data-v-160b3875${_scopeId2}><span class="http-method http-method--get" data-v-160b3875${_scopeId2}>GET</span><code data-v-160b3875${_scopeId2}>/accounts/{accountId}/beneficiaries</code></span></td><td data-v-160b3875${_scopeId2}>Optional</td></tr><tr data-v-160b3875${_scopeId2}><td data-v-160b3875${_scopeId2}><span class="endpoint" data-v-160b3875${_scopeId2}><span class="http-method http-method--get" data-v-160b3875${_scopeId2}>GET</span><code data-v-160b3875${_scopeId2}>/accounts/{accountId}/direct-debits</code></span></td><td data-v-160b3875${_scopeId2}>Optional</td></tr><tr data-v-160b3875${_scopeId2}><td data-v-160b3875${_scopeId2}><span class="endpoint" data-v-160b3875${_scopeId2}><span class="http-method http-method--get" data-v-160b3875${_scopeId2}>GET</span><code data-v-160b3875${_scopeId2}>/accounts/{accountId}/scheduled-payments</code></span></td><td data-v-160b3875${_scopeId2}>Optional</td></tr><tr data-v-160b3875${_scopeId2}><td data-v-160b3875${_scopeId2}><span class="endpoint" data-v-160b3875${_scopeId2}><span class="http-method http-method--get" data-v-160b3875${_scopeId2}>GET</span><code data-v-160b3875${_scopeId2}>/accounts/{accountId}/standing-orders</code></span></td><td data-v-160b3875${_scopeId2}>Optional</td></tr><tr data-v-160b3875${_scopeId2}><td data-v-160b3875${_scopeId2}><span class="endpoint" data-v-160b3875${_scopeId2}><span class="http-method http-method--get" data-v-160b3875${_scopeId2}>GET</span><code data-v-160b3875${_scopeId2}>/accounts/{accountId}/products</code></span></td><td data-v-160b3875${_scopeId2}>Optional</td></tr><tr data-v-160b3875${_scopeId2}><td data-v-160b3875${_scopeId2}><span class="endpoint" data-v-160b3875${_scopeId2}><span class="http-method http-method--get" data-v-160b3875${_scopeId2}>GET</span><code data-v-160b3875${_scopeId2}>/accounts/{accountId}/customer</code></span></td><td data-v-160b3875${_scopeId2}>Optional</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Endpoint"),
                          createVNode("th", null, "Pagination")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("span", { class: "endpoint" }, [
                              createVNode("span", { class: "http-method http-method--get" }, "GET"),
                              createVNode("code", null, "/accounts/{accountId}/transactions")
                            ])
                          ]),
                          createVNode("td", null, [
                            createVNode("strong", null, "Required")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("span", { class: "endpoint" }, [
                              createVNode("span", { class: "http-method http-method--get" }, "GET"),
                              createVNode("code", null, "/accounts/{accountId}/statements")
                            ])
                          ]),
                          createVNode("td", null, [
                            createVNode("strong", null, "Required")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("span", { class: "endpoint" }, [
                              createVNode("span", { class: "http-method http-method--get" }, "GET"),
                              createVNode("code", null, "/accounts")
                            ])
                          ]),
                          createVNode("td", null, "Optional")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("span", { class: "endpoint" }, [
                              createVNode("span", { class: "http-method http-method--get" }, "GET"),
                              createVNode("code", null, "/accounts/{accountId}/balances")
                            ])
                          ]),
                          createVNode("td", null, "Optional")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("span", { class: "endpoint" }, [
                              createVNode("span", { class: "http-method http-method--get" }, "GET"),
                              createVNode("code", null, "/accounts/{accountId}/beneficiaries")
                            ])
                          ]),
                          createVNode("td", null, "Optional")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("span", { class: "endpoint" }, [
                              createVNode("span", { class: "http-method http-method--get" }, "GET"),
                              createVNode("code", null, "/accounts/{accountId}/direct-debits")
                            ])
                          ]),
                          createVNode("td", null, "Optional")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("span", { class: "endpoint" }, [
                              createVNode("span", { class: "http-method http-method--get" }, "GET"),
                              createVNode("code", null, "/accounts/{accountId}/scheduled-payments")
                            ])
                          ]),
                          createVNode("td", null, "Optional")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("span", { class: "endpoint" }, [
                              createVNode("span", { class: "http-method http-method--get" }, "GET"),
                              createVNode("code", null, "/accounts/{accountId}/standing-orders")
                            ])
                          ]),
                          createVNode("td", null, "Optional")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("span", { class: "endpoint" }, [
                              createVNode("span", { class: "http-method http-method--get" }, "GET"),
                              createVNode("code", null, "/accounts/{accountId}/products")
                            ])
                          ]),
                          createVNode("td", null, "Optional")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("span", { class: "endpoint" }, [
                              createVNode("span", { class: "http-method http-method--get" }, "GET"),
                              createVNode("code", null, "/accounts/{accountId}/customer")
                            ])
                          ]),
                          createVNode("td", null, "Optional")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Transactions and statements span long history (at least two years) and routinely produce large result sets — pagination is required so responses remain bounded. For other list endpoints, LFIs MAY paginate where result sets warrant it, or return all matching records in a single response. `);
                } else {
                  return [
                    createTextVNode(" Transactions and statements span long history (at least two years) and routinely produce large result sets — pagination is required so responses remain bounded. For other list endpoints, LFIs MAY paginate where result sets warrant it, or return all matching records in a single response. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Endpoint"),
                        createVNode("th", null, "Pagination")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("span", { class: "endpoint" }, [
                            createVNode("span", { class: "http-method http-method--get" }, "GET"),
                            createVNode("code", null, "/accounts/{accountId}/transactions")
                          ])
                        ]),
                        createVNode("td", null, [
                          createVNode("strong", null, "Required")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("span", { class: "endpoint" }, [
                            createVNode("span", { class: "http-method http-method--get" }, "GET"),
                            createVNode("code", null, "/accounts/{accountId}/statements")
                          ])
                        ]),
                        createVNode("td", null, [
                          createVNode("strong", null, "Required")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("span", { class: "endpoint" }, [
                            createVNode("span", { class: "http-method http-method--get" }, "GET"),
                            createVNode("code", null, "/accounts")
                          ])
                        ]),
                        createVNode("td", null, "Optional")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("span", { class: "endpoint" }, [
                            createVNode("span", { class: "http-method http-method--get" }, "GET"),
                            createVNode("code", null, "/accounts/{accountId}/balances")
                          ])
                        ]),
                        createVNode("td", null, "Optional")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("span", { class: "endpoint" }, [
                            createVNode("span", { class: "http-method http-method--get" }, "GET"),
                            createVNode("code", null, "/accounts/{accountId}/beneficiaries")
                          ])
                        ]),
                        createVNode("td", null, "Optional")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("span", { class: "endpoint" }, [
                            createVNode("span", { class: "http-method http-method--get" }, "GET"),
                            createVNode("code", null, "/accounts/{accountId}/direct-debits")
                          ])
                        ]),
                        createVNode("td", null, "Optional")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("span", { class: "endpoint" }, [
                            createVNode("span", { class: "http-method http-method--get" }, "GET"),
                            createVNode("code", null, "/accounts/{accountId}/scheduled-payments")
                          ])
                        ]),
                        createVNode("td", null, "Optional")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("span", { class: "endpoint" }, [
                            createVNode("span", { class: "http-method http-method--get" }, "GET"),
                            createVNode("code", null, "/accounts/{accountId}/standing-orders")
                          ])
                        ]),
                        createVNode("td", null, "Optional")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("span", { class: "endpoint" }, [
                            createVNode("span", { class: "http-method http-method--get" }, "GET"),
                            createVNode("code", null, "/accounts/{accountId}/products")
                          ])
                        ]),
                        createVNode("td", null, "Optional")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("span", { class: "endpoint" }, [
                            createVNode("span", { class: "http-method http-method--get" }, "GET"),
                            createVNode("code", null, "/accounts/{accountId}/customer")
                          ])
                        ]),
                        createVNode("td", null, "Optional")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Transactions and statements span long history (at least two years) and routinely produce large result sets — pagination is required so responses remain bounded. For other list endpoints, LFIs MAY paginate where result sets warrant it, or return all matching records in a single response. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "request",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "Request",
        title: "page / page-size",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The Hub sends <code data-v-160b3875${_scopeId2}>page</code> and <code data-v-160b3875${_scopeId2}>page-size</code> as query parameters on every paginated request: `);
                } else {
                  return [
                    createTextVNode(" The Hub sends "),
                    createVNode("code", null, "page"),
                    createTextVNode(" and "),
                    createVNode("code", null, "page-size"),
                    createTextVNode(" as query parameters on every paginated request: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-160b3875${_scopeId2}><thead data-v-160b3875${_scopeId2}><tr data-v-160b3875${_scopeId2}><th data-v-160b3875${_scopeId2}>Parameter</th><th data-v-160b3875${_scopeId2}>Type</th><th data-v-160b3875${_scopeId2}>Default</th><th data-v-160b3875${_scopeId2}>Description</th></tr></thead><tbody data-v-160b3875${_scopeId2}><tr data-v-160b3875${_scopeId2}><td data-v-160b3875${_scopeId2}><code data-v-160b3875${_scopeId2}>page</code></td><td data-v-160b3875${_scopeId2}>integer</td><td data-v-160b3875${_scopeId2}><code data-v-160b3875${_scopeId2}>1</code></td><td data-v-160b3875${_scopeId2}>1-indexed page number</td></tr><tr data-v-160b3875${_scopeId2}><td data-v-160b3875${_scopeId2}><code data-v-160b3875${_scopeId2}>page-size</code></td><td data-v-160b3875${_scopeId2}>integer</td><td data-v-160b3875${_scopeId2}><code data-v-160b3875${_scopeId2}>100</code></td><td data-v-160b3875${_scopeId2}>Number of records per page</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Parameter"),
                          createVNode("th", null, "Type"),
                          createVNode("th", null, "Default"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "page")
                          ]),
                          createVNode("td", null, "integer"),
                          createVNode("td", null, [
                            createVNode("code", null, "1")
                          ]),
                          createVNode("td", null, "1-indexed page number")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "page-size")
                          ]),
                          createVNode("td", null, "integer"),
                          createVNode("td", null, [
                            createVNode("code", null, "100")
                          ]),
                          createVNode("td", null, "Number of records per page")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The LFI MUST return the slice of the result set that corresponds to <code data-v-160b3875${_scopeId2}>page</code> and <code data-v-160b3875${_scopeId2}>page-size</code>. Filtering (e.g. <code data-v-160b3875${_scopeId2}>fromBookingDateTime</code> / <code data-v-160b3875${_scopeId2}>toBookingDateTime</code> for transactions) is applied <strong data-v-160b3875${_scopeId2}>first</strong>; pagination is applied to the filtered result set. `);
                } else {
                  return [
                    createTextVNode(" The LFI MUST return the slice of the result set that corresponds to "),
                    createVNode("code", null, "page"),
                    createTextVNode(" and "),
                    createVNode("code", null, "page-size"),
                    createTextVNode(". Filtering (e.g. "),
                    createVNode("code", null, "fromBookingDateTime"),
                    createTextVNode(" / "),
                    createVNode("code", null, "toBookingDateTime"),
                    createTextVNode(" for transactions) is applied "),
                    createVNode("strong", null, "first"),
                    createTextVNode("; pagination is applied to the filtered result set. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The Hub sends "),
                  createVNode("code", null, "page"),
                  createTextVNode(" and "),
                  createVNode("code", null, "page-size"),
                  createTextVNode(" as query parameters on every paginated request: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Parameter"),
                        createVNode("th", null, "Type"),
                        createVNode("th", null, "Default"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "page")
                        ]),
                        createVNode("td", null, "integer"),
                        createVNode("td", null, [
                          createVNode("code", null, "1")
                        ]),
                        createVNode("td", null, "1-indexed page number")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "page-size")
                        ]),
                        createVNode("td", null, "integer"),
                        createVNode("td", null, [
                          createVNode("code", null, "100")
                        ]),
                        createVNode("td", null, "Number of records per page")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The LFI MUST return the slice of the result set that corresponds to "),
                  createVNode("code", null, "page"),
                  createTextVNode(" and "),
                  createVNode("code", null, "page-size"),
                  createTextVNode(". Filtering (e.g. "),
                  createVNode("code", null, "fromBookingDateTime"),
                  createTextVNode(" / "),
                  createVNode("code", null, "toBookingDateTime"),
                  createTextVNode(" for transactions) is applied "),
                  createVNode("strong", null, "first"),
                  createTextVNode("; pagination is applied to the filtered result set. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "response-meta",
        num: "03",
        color: "var(--at-blue-deep, #1d4ed8)",
        eyebrow: "Response",
        title: "meta — paginated, totalPages, totalRecords",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The LFI indicates the pagination state in the response <code data-v-160b3875${_scopeId2}>meta</code> object: `);
                } else {
                  return [
                    createTextVNode(" The LFI indicates the pagination state in the response "),
                    createVNode("code", null, "meta"),
                    createTextVNode(" object: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-160b3875${_scopeId2}><thead data-v-160b3875${_scopeId2}><tr data-v-160b3875${_scopeId2}><th data-v-160b3875${_scopeId2}>Field</th><th data-v-160b3875${_scopeId2}>Type</th><th data-v-160b3875${_scopeId2}>Description</th></tr></thead><tbody data-v-160b3875${_scopeId2}><tr data-v-160b3875${_scopeId2}><td data-v-160b3875${_scopeId2}><code data-v-160b3875${_scopeId2}>paginated</code></td><td data-v-160b3875${_scopeId2}>boolean</td><td data-v-160b3875${_scopeId2}><code data-v-160b3875${_scopeId2}>true</code> if the response is paginated. <code data-v-160b3875${_scopeId2}>false</code> or omitted if the full result set is returned in a single response</td></tr><tr data-v-160b3875${_scopeId2}><td data-v-160b3875${_scopeId2}><code data-v-160b3875${_scopeId2}>totalPages</code></td><td data-v-160b3875${_scopeId2}>integer</td><td data-v-160b3875${_scopeId2}>The total number of pages in the full result set, given the current <code data-v-160b3875${_scopeId2}>page-size</code></td></tr><tr data-v-160b3875${_scopeId2}><td data-v-160b3875${_scopeId2}><code data-v-160b3875${_scopeId2}>totalRecords</code></td><td data-v-160b3875${_scopeId2}>integer</td><td data-v-160b3875${_scopeId2}>The total number of records in the full result set across all pages</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Field"),
                          createVNode("th", null, "Type"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "paginated")
                          ]),
                          createVNode("td", null, "boolean"),
                          createVNode("td", null, [
                            createVNode("code", null, "true"),
                            createTextVNode(" if the response is paginated. "),
                            createVNode("code", null, "false"),
                            createTextVNode(" or omitted if the full result set is returned in a single response")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "totalPages")
                          ]),
                          createVNode("td", null, "integer"),
                          createVNode("td", null, [
                            createTextVNode("The total number of pages in the full result set, given the current "),
                            createVNode("code", null, "page-size")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "totalRecords")
                          ]),
                          createVNode("td", null, "integer"),
                          createVNode("td", null, "The total number of records in the full result set across all pages")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<code data-v-160b3875${_scopeId2}>totalPages</code> and <code data-v-160b3875${_scopeId2}>totalRecords</code> MUST reflect the <strong data-v-160b3875${_scopeId2}>filtered</strong> result set — not the whole table. If a transaction query filters by date range, <code data-v-160b3875${_scopeId2}>totalRecords</code> is the count of transactions in that range, and <code data-v-160b3875${_scopeId2}>totalPages</code> is <code data-v-160b3875${_scopeId2}>ceil(totalRecords / page-size)</code>. `);
                } else {
                  return [
                    createVNode("code", null, "totalPages"),
                    createTextVNode(" and "),
                    createVNode("code", null, "totalRecords"),
                    createTextVNode(" MUST reflect the "),
                    createVNode("strong", null, "filtered"),
                    createTextVNode(" result set — not the whole table. If a transaction query filters by date range, "),
                    createVNode("code", null, "totalRecords"),
                    createTextVNode(" is the count of transactions in that range, and "),
                    createVNode("code", null, "totalPages"),
                    createTextVNode(" is "),
                    createVNode("code", null, "ceil(totalRecords / page-size)"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-160b3875${_scopeId}>Example — transactions, page 2 of 12</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Request:`);
                } else {
                  return [
                    createTextVNode("Request:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: exampleRequest,
              lang: "http",
              filename: "request"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Response:`);
                } else {
                  return [
                    createTextVNode("Response:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: exampleResponse,
              lang: "json",
              filename: "response"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The Hub uses <code data-v-160b3875${_scopeId2}>totalPages</code> to construct <code data-v-160b3875${_scopeId2}>Links.First</code>, <code data-v-160b3875${_scopeId2}>Links.Prev</code>, <code data-v-160b3875${_scopeId2}>Links.Next</code>, and <code data-v-160b3875${_scopeId2}>Links.Last</code> on the TPP-facing response, and surfaces <code data-v-160b3875${_scopeId2}>totalPages</code> in the TPP&#39;s <code data-v-160b3875${_scopeId2}>Meta</code>. See the <a href="/knowledge-base/articles/pagination" data-v-160b3875${_scopeId2}>Pagination KB article</a> for the full conversion. `);
                } else {
                  return [
                    createTextVNode(" The Hub uses "),
                    createVNode("code", null, "totalPages"),
                    createTextVNode(" to construct "),
                    createVNode("code", null, "Links.First"),
                    createTextVNode(", "),
                    createVNode("code", null, "Links.Prev"),
                    createTextVNode(", "),
                    createVNode("code", null, "Links.Next"),
                    createTextVNode(", and "),
                    createVNode("code", null, "Links.Last"),
                    createTextVNode(" on the TPP-facing response, and surfaces "),
                    createVNode("code", null, "totalPages"),
                    createTextVNode(" in the TPP's "),
                    createVNode("code", null, "Meta"),
                    createTextVNode(". See the "),
                    createVNode("a", { href: "/knowledge-base/articles/pagination" }, "Pagination KB article"),
                    createTextVNode(" for the full conversion. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The LFI indicates the pagination state in the response "),
                  createVNode("code", null, "meta"),
                  createTextVNode(" object: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Field"),
                        createVNode("th", null, "Type"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "paginated")
                        ]),
                        createVNode("td", null, "boolean"),
                        createVNode("td", null, [
                          createVNode("code", null, "true"),
                          createTextVNode(" if the response is paginated. "),
                          createVNode("code", null, "false"),
                          createTextVNode(" or omitted if the full result set is returned in a single response")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "totalPages")
                        ]),
                        createVNode("td", null, "integer"),
                        createVNode("td", null, [
                          createTextVNode("The total number of pages in the full result set, given the current "),
                          createVNode("code", null, "page-size")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "totalRecords")
                        ]),
                        createVNode("td", null, "integer"),
                        createVNode("td", null, "The total number of records in the full result set across all pages")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("code", null, "totalPages"),
                  createTextVNode(" and "),
                  createVNode("code", null, "totalRecords"),
                  createTextVNode(" MUST reflect the "),
                  createVNode("strong", null, "filtered"),
                  createTextVNode(" result set — not the whole table. If a transaction query filters by date range, "),
                  createVNode("code", null, "totalRecords"),
                  createTextVNode(" is the count of transactions in that range, and "),
                  createVNode("code", null, "totalPages"),
                  createTextVNode(" is "),
                  createVNode("code", null, "ceil(totalRecords / page-size)"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Example — transactions, page 2 of 12"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Request:")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: exampleRequest,
                lang: "http",
                filename: "request"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Response:")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: exampleResponse,
                lang: "json",
                filename: "response"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The Hub uses "),
                  createVNode("code", null, "totalPages"),
                  createTextVNode(" to construct "),
                  createVNode("code", null, "Links.First"),
                  createTextVNode(", "),
                  createVNode("code", null, "Links.Prev"),
                  createTextVNode(", "),
                  createVNode("code", null, "Links.Next"),
                  createTextVNode(", and "),
                  createVNode("code", null, "Links.Last"),
                  createTextVNode(" on the TPP-facing response, and surfaces "),
                  createVNode("code", null, "totalPages"),
                  createTextVNode(" in the TPP's "),
                  createVNode("code", null, "Meta"),
                  createTextVNode(". See the "),
                  createVNode("a", { href: "/knowledge-base/articles/pagination" }, "Pagination KB article"),
                  createTextVNode(" for the full conversion. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "api-sequence-flow",
        num: "04",
        color: "var(--at-teal)",
        eyebrow: "API Sequence Flow",
        title: "Walking pages end-to-end",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The diagram below traces a three-page transactions query between the TPP, Hub, and your Ozone Connect endpoint. The TPP makes a single unparameterised request and follows <code data-v-160b3875${_scopeId2}>Links.Next</code> on each response; the Hub translates each call into a <code data-v-160b3875${_scopeId2}>page</code> / <code data-v-160b3875${_scopeId2}>page-size</code> request sent to your Ozone Connect <a href="/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/open-api/accounts-AccountId-transactions" data-v-160b3875${_scopeId2}><code data-v-160b3875${_scopeId2}>GET /accounts/{accountId}/transactions</code></a> endpoint and converts your <code data-v-160b3875${_scopeId2}>meta</code> back into the TPP&#39;s <code data-v-160b3875${_scopeId2}>Links</code> envelope. `);
                } else {
                  return [
                    createTextVNode(" The diagram below traces a three-page transactions query between the TPP, Hub, and your Ozone Connect endpoint. The TPP makes a single unparameterised request and follows "),
                    createVNode("code", null, "Links.Next"),
                    createTextVNode(" on each response; the Hub translates each call into a "),
                    createVNode("code", null, "page"),
                    createTextVNode(" / "),
                    createVNode("code", null, "page-size"),
                    createTextVNode(" request sent to your Ozone Connect "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/open-api/accounts-AccountId-transactions" }, [
                      createVNode("code", null, "GET /accounts/{accountId}/transactions")
                    ]),
                    createTextVNode(" endpoint and converts your "),
                    createVNode("code", null, "meta"),
                    createTextVNode(" back into the TPP's "),
                    createVNode("code", null, "Links"),
                    createTextVNode(" envelope. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_APIFlowViewer, { title: "Pagination API Flow" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_APIFlowsPagination, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_APIFlowsPagination)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The diagram below traces a three-page transactions query between the TPP, Hub, and your Ozone Connect endpoint. The TPP makes a single unparameterised request and follows "),
                  createVNode("code", null, "Links.Next"),
                  createTextVNode(" on each response; the Hub translates each call into a "),
                  createVNode("code", null, "page"),
                  createTextVNode(" / "),
                  createVNode("code", null, "page-size"),
                  createTextVNode(" request sent to your Ozone Connect "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/open-api/accounts-AccountId-transactions" }, [
                    createVNode("code", null, "GET /accounts/{accountId}/transactions")
                  ]),
                  createTextVNode(" endpoint and converts your "),
                  createVNode("code", null, "meta"),
                  createTextVNode(" back into the TPP's "),
                  createVNode("code", null, "Links"),
                  createTextVNode(" envelope. ")
                ]),
                _: 1
              }),
              createVNode(_component_APIFlowViewer, { title: "Pagination API Flow" }, {
                default: withCtx(() => [
                  createVNode(_component_APIFlowsPagination)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "empty-results",
        num: "05",
        color: "var(--at-navy)",
        eyebrow: "Empty result sets",
        title: "Empty matches return 200, not 404",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` If filtering yields no records, return <code data-v-160b3875${_scopeId2}>200</code> with an empty <code data-v-160b3875${_scopeId2}>data</code> array and: `);
                } else {
                  return [
                    createTextVNode(" If filtering yields no records, return "),
                    createVNode("code", null, "200"),
                    createTextVNode(" with an empty "),
                    createVNode("code", null, "data"),
                    createTextVNode(" array and: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: emptyResponse,
              lang: "json",
              filename: "empty response"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Do not return <code data-v-160b3875${_scopeId2}>404</code> for an empty filtered result.`);
                } else {
                  return [
                    createTextVNode("Do not return "),
                    createVNode("code", null, "404"),
                    createTextVNode(" for an empty filtered result.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" If filtering yields no records, return "),
                  createVNode("code", null, "200"),
                  createTextVNode(" with an empty "),
                  createVNode("code", null, "data"),
                  createTextVNode(" array and: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: emptyResponse,
                lang: "json",
                filename: "empty response"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Do not return "),
                  createVNode("code", null, "404"),
                  createTextVNode(" for an empty filtered result.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "ordering",
        num: "05",
        color: "var(--at-teal-deep)",
        eyebrow: "Ordering and stability",
        title: "Deterministic order across pages",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The LFI MUST return records in a <strong data-v-160b3875${_scopeId2}>deterministic order</strong> so that pagination is stable across successive page requests. For transactions and statements, newest-first (descending <code data-v-160b3875${_scopeId2}>bookingDateTime</code> / <code data-v-160b3875${_scopeId2}>statementDate</code>) is recommended. If new records arrive between page requests, the LFI SHOULD ensure the same record is not returned on two different pages of the same logical query. `);
                } else {
                  return [
                    createTextVNode(" The LFI MUST return records in a "),
                    createVNode("strong", null, "deterministic order"),
                    createTextVNode(" so that pagination is stable across successive page requests. For transactions and statements, newest-first (descending "),
                    createVNode("code", null, "bookingDateTime"),
                    createTextVNode(" / "),
                    createVNode("code", null, "statementDate"),
                    createTextVNode(") is recommended. If new records arrive between page requests, the LFI SHOULD ensure the same record is not returned on two different pages of the same logical query. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The LFI MUST return records in a "),
                  createVNode("strong", null, "deterministic order"),
                  createTextVNode(" so that pagination is stable across successive page requests. For transactions and statements, newest-first (descending "),
                  createVNode("code", null, "bookingDateTime"),
                  createTextVNode(" / "),
                  createVNode("code", null, "statementDate"),
                  createTextVNode(") is recommended. If new records arrive between page requests, the LFI SHOULD ensure the same record is not returned on two different pages of the same logical query. ")
                ]),
                _: 1
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/api-guide/pagination.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const pagination = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-160b3875"]]);
export {
  pagination as default
};
