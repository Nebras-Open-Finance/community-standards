import { _ as __unplugin_components_0, a as __unplugin_components_2, b as __unplugin_components_6, c as __unplugin_components_7 } from "./EdBackStrip-COkyNhGh.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { E as EdCode } from "./EdCode-BQ4YLUeg.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_0$1 } from "./EdHero-DawHPCxB.js";
import { defineComponent, mergeProps, withCtx, createVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const lfiRequest = `GET /accounts/acc-001/transactions
  ?fromBookingDateTime=2026-01-01T00:00:00Z
  &page=2
  &page-size=100`;
const lfiResponse = `{
  "data": [
    { "accountId": "acc-001", "transactionId": "txn-900234", "...": "..." }
  ],
  "meta": {
    "paginated": true,
    "totalPages": 12,
    "totalRecords": 1187
  }
}`;
const tppRequest = `GET /accounts/acc-001/transactions?fromBookingDateTime=2026-01-01T00:00:00Z`;
const tppResponse = `{
  "Data": {
    "Transaction": [
      { "AccountId": "acc-001", "TransactionId": "txn-900234", "...": "..." }
    ]
  },
  "Links": {
    "Self":  "https://hub.example.ae/open-finance/v2.1/accounts/acc-001/transactions?fromBookingDateTime=2026-01-01T00:00:00Z&page=2",
    "First": "https://hub.example.ae/open-finance/v2.1/accounts/acc-001/transactions?fromBookingDateTime=2026-01-01T00:00:00Z&page=1",
    "Prev":  "https://hub.example.ae/open-finance/v2.1/accounts/acc-001/transactions?fromBookingDateTime=2026-01-01T00:00:00Z&page=1",
    "Next":  "https://hub.example.ae/open-finance/v2.1/accounts/acc-001/transactions?fromBookingDateTime=2026-01-01T00:00:00Z&page=3",
    "Last":  "https://hub.example.ae/open-finance/v2.1/accounts/acc-001/transactions?fromBookingDateTime=2026-01-01T00:00:00Z&page=12"
  },
  "Meta": {
    "TotalPages": 12
  }
}`;
const emptyResponse = `{
  "data": [],
  "meta": {
    "paginated": true,
    "totalPages": 0,
    "totalRecords": 0
  }
}`;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "pagination",
  __ssrInlineRender: true,
  setup(__props) {
    const sections = [
      { id: "lfi", label: "LFI side" },
      { id: "hub", label: "Hub side" },
      { id: "empty", label: "Empty results" },
      { id: "why", label: "Why two models" },
      { id: "others", label: "Other endpoints" }
    ];
    const meta = [
      { label: "Category", value: "Integration" },
      { label: "Read", value: "7 min" },
      { label: "Updated", value: "21 Apr 2026" }
    ];
    const tags = ["Pagination", "Ozone Connect", "Data Sharing"];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdBackStrip = __unplugin_components_0;
      const _component_EdHero = __unplugin_components_0$1;
      const _component_EdInPageNav = __unplugin_components_2;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdCode = EdCode;
      const _component_EdRefTable = __unplugin_components_12;
      const _component_EdRelatedCards = __unplugin_components_6;
      const _component_EdRelatedCard = __unplugin_components_7;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-page" }, _attrs))} data-v-480860fa>`);
      _push(ssrRenderComponent(_component_EdBackStrip, {
        href: "/knowledge-base/",
        text: "All knowledge base articles"
      }, null, _parent));
      _push(ssrRenderComponent(_component_EdHero, {
        eyebrow: "Learn · Understand · Build",
        title: "Pagination — LFI meta to TPP Links",
        meta,
        lede: "Bank Data Sharing list endpoints use two different pagination models: <strong>LFI → API Hub</strong> is page-based (<code>page</code> + <code>page-size</code> with a <code>meta</code> response); <strong>API Hub → TPP</strong> uses a Links envelope. The Hub bridges the two."
      }, {
        lede: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="ed-tags" data-v-480860fa${_scopeId}><!--[-->`);
            ssrRenderList(tags, (t) => {
              _push2(`<span class="ed-tag" data-v-480860fa${_scopeId}>${ssrInterpolate(t)}</span>`);
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode("div", { class: "ed-tags" }, [
                (openBlock(), createBlock(Fragment, null, renderList(tags, (t) => {
                  return createVNode("span", {
                    key: t,
                    class: "ed-tag"
                  }, toDisplayString(t), 1);
                }), 64))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdInPageNav, { sections }, null, _parent));
      _push(ssrRenderComponent(_component_EdProse, { class: "ed-page__intro" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` This article uses <code data-v-480860fa${_scopeId}>GET /accounts/{accountId}/transactions</code> as the worked example. The same behaviour applies to <code data-v-480860fa${_scopeId}>GET /accounts/{accountId}/statements</code> — and to any other endpoint where the LFI chooses to paginate. `);
          } else {
            return [
              createTextVNode(" This article uses "),
              createVNode("code", null, "GET /accounts/{accountId}/transactions"),
              createTextVNode(" as the worked example. The same behaviour applies to "),
              createVNode("code", null, "GET /accounts/{accountId}/statements"),
              createTextVNode(" — and to any other endpoint where the LFI chooses to paginate. ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "lfi",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "LFI side",
        title: "Page-based requests, meta responses",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-480860fa${_scopeId}>Request from the Hub</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`The Hub issues one page-based request per TPP call:`);
                } else {
                  return [
                    createTextVNode("The Hub issues one page-based request per TPP call:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: lfiRequest,
              lang: "http"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<code data-v-480860fa${_scopeId2}>page</code> is 1-indexed; <code data-v-480860fa${_scopeId2}>page-size</code> defaults to <code data-v-480860fa${_scopeId2}>100</code>. Filtering parameters (<code data-v-480860fa${_scopeId2}>fromBookingDateTime</code>, <code data-v-480860fa${_scopeId2}>toBookingDateTime</code>) are applied <strong data-v-480860fa${_scopeId2}>before</strong> pagination — <code data-v-480860fa${_scopeId2}>totalRecords</code> and <code data-v-480860fa${_scopeId2}>totalPages</code> reflect the filtered result set, not the whole table.`);
                } else {
                  return [
                    createVNode("code", null, "page"),
                    createTextVNode(" is 1-indexed; "),
                    createVNode("code", null, "page-size"),
                    createTextVNode(" defaults to "),
                    createVNode("code", null, "100"),
                    createTextVNode(". Filtering parameters ("),
                    createVNode("code", null, "fromBookingDateTime"),
                    createTextVNode(", "),
                    createVNode("code", null, "toBookingDateTime"),
                    createTextVNode(") are applied "),
                    createVNode("strong", null, "before"),
                    createTextVNode(" pagination — "),
                    createVNode("code", null, "totalRecords"),
                    createTextVNode(" and "),
                    createVNode("code", null, "totalPages"),
                    createTextVNode(" reflect the filtered result set, not the whole table.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-480860fa${_scopeId}>Response to the Hub</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`The LFI returns the slice for the requested page, plus a <code data-v-480860fa${_scopeId2}>meta</code> block describing the full filtered result set:`);
                } else {
                  return [
                    createTextVNode("The LFI returns the slice for the requested page, plus a "),
                    createVNode("code", null, "meta"),
                    createTextVNode(" block describing the full filtered result set:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: lfiResponse,
              lang: "json"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-480860fa${_scopeId2}><thead data-v-480860fa${_scopeId2}><tr data-v-480860fa${_scopeId2}><th data-v-480860fa${_scopeId2}>Field</th><th data-v-480860fa${_scopeId2}>Meaning</th></tr></thead><tbody data-v-480860fa${_scopeId2}><tr data-v-480860fa${_scopeId2}><td data-v-480860fa${_scopeId2}><code data-v-480860fa${_scopeId2}>meta.paginated</code></td><td data-v-480860fa${_scopeId2}><code data-v-480860fa${_scopeId2}>true</code> if the response is a page of a larger result set. <code data-v-480860fa${_scopeId2}>false</code> or omitted if the LFI returned the full result set in a single response</td></tr><tr data-v-480860fa${_scopeId2}><td data-v-480860fa${_scopeId2}><code data-v-480860fa${_scopeId2}>meta.totalPages</code></td><td data-v-480860fa${_scopeId2}><code data-v-480860fa${_scopeId2}>ceil(totalRecords / page-size)</code> — the last page number the Hub may request</td></tr><tr data-v-480860fa${_scopeId2}><td data-v-480860fa${_scopeId2}><code data-v-480860fa${_scopeId2}>meta.totalRecords</code></td><td data-v-480860fa${_scopeId2}>The total number of records in the filtered result set across all pages</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Field"),
                          createVNode("th", null, "Meaning")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "meta.paginated")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "true"),
                            createTextVNode(" if the response is a page of a larger result set. "),
                            createVNode("code", null, "false"),
                            createTextVNode(" or omitted if the LFI returned the full result set in a single response")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "meta.totalPages")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "ceil(totalRecords / page-size)"),
                            createTextVNode(" — the last page number the Hub may request")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "meta.totalRecords")
                          ]),
                          createVNode("td", null, "The total number of records in the filtered result set across all pages")
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
                  _push3(`The LFI <strong data-v-480860fa${_scopeId2}>MUST</strong> return records in a deterministic order so pagination is stable across successive page requests.`);
                } else {
                  return [
                    createTextVNode("The LFI "),
                    createVNode("strong", null, "MUST"),
                    createTextVNode(" return records in a deterministic order so pagination is stable across successive page requests.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, "Request from the Hub"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("The Hub issues one page-based request per TPP call:")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: lfiRequest,
                lang: "http"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("code", null, "page"),
                  createTextVNode(" is 1-indexed; "),
                  createVNode("code", null, "page-size"),
                  createTextVNode(" defaults to "),
                  createVNode("code", null, "100"),
                  createTextVNode(". Filtering parameters ("),
                  createVNode("code", null, "fromBookingDateTime"),
                  createTextVNode(", "),
                  createVNode("code", null, "toBookingDateTime"),
                  createTextVNode(") are applied "),
                  createVNode("strong", null, "before"),
                  createTextVNode(" pagination — "),
                  createVNode("code", null, "totalRecords"),
                  createTextVNode(" and "),
                  createVNode("code", null, "totalPages"),
                  createTextVNode(" reflect the filtered result set, not the whole table.")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Response to the Hub"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("The LFI returns the slice for the requested page, plus a "),
                  createVNode("code", null, "meta"),
                  createTextVNode(" block describing the full filtered result set:")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: lfiResponse,
                lang: "json"
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Field"),
                        createVNode("th", null, "Meaning")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "meta.paginated")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "true"),
                          createTextVNode(" if the response is a page of a larger result set. "),
                          createVNode("code", null, "false"),
                          createTextVNode(" or omitted if the LFI returned the full result set in a single response")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "meta.totalPages")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "ceil(totalRecords / page-size)"),
                          createTextVNode(" — the last page number the Hub may request")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "meta.totalRecords")
                        ]),
                        createVNode("td", null, "The total number of records in the filtered result set across all pages")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("The LFI "),
                  createVNode("strong", null, "MUST"),
                  createTextVNode(" return records in a deterministic order so pagination is stable across successive page requests.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "hub",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "Hub side",
        title: "Links envelope to TPP",
        lede: "The Hub receives one TPP request, calls the LFI one or more times (often just once — it forwards the TPP's requested page through), and composes the TPP response. It uses the LFI's <code>meta</code> to generate the <code>Links</code> block.",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-480860fa${_scopeId}>Request from the TPP</h3>`);
            _push2(ssrRenderComponent(_component_EdCode, {
              code: tppRequest,
              lang: "http"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`The TPP does not send <code data-v-480860fa${_scopeId2}>page</code> or <code data-v-480860fa${_scopeId2}>page-size</code>. Pagination is expressed through the Hub&#39;s URL parameters on the <code data-v-480860fa${_scopeId2}>Links</code> returned in the previous response.`);
                } else {
                  return [
                    createTextVNode("The TPP does not send "),
                    createVNode("code", null, "page"),
                    createTextVNode(" or "),
                    createVNode("code", null, "page-size"),
                    createTextVNode(". Pagination is expressed through the Hub's URL parameters on the "),
                    createVNode("code", null, "Links"),
                    createTextVNode(" returned in the previous response.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-480860fa${_scopeId}>Response to the TPP</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`The Hub converts the LFI&#39;s <code data-v-480860fa${_scopeId2}>meta</code> into <code data-v-480860fa${_scopeId2}>Meta</code> and <code data-v-480860fa${_scopeId2}>Links</code>:`);
                } else {
                  return [
                    createTextVNode("The Hub converts the LFI's "),
                    createVNode("code", null, "meta"),
                    createTextVNode(" into "),
                    createVNode("code", null, "Meta"),
                    createTextVNode(" and "),
                    createVNode("code", null, "Links"),
                    createTextVNode(":")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: tppResponse,
              lang: "json"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`The Hub derives each link from the LFI&#39;s <code data-v-480860fa${_scopeId2}>meta.totalPages</code> and the current <code data-v-480860fa${_scopeId2}>page</code>:`);
                } else {
                  return [
                    createTextVNode("The Hub derives each link from the LFI's "),
                    createVNode("code", null, "meta.totalPages"),
                    createTextVNode(" and the current "),
                    createVNode("code", null, "page"),
                    createTextVNode(":")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-480860fa${_scopeId2}><thead data-v-480860fa${_scopeId2}><tr data-v-480860fa${_scopeId2}><th data-v-480860fa${_scopeId2}>TPP field</th><th data-v-480860fa${_scopeId2}>Derived from</th></tr></thead><tbody data-v-480860fa${_scopeId2}><tr data-v-480860fa${_scopeId2}><td data-v-480860fa${_scopeId2}><code data-v-480860fa${_scopeId2}>Links.Self</code></td><td data-v-480860fa${_scopeId2}>The URL that produced this response</td></tr><tr data-v-480860fa${_scopeId2}><td data-v-480860fa${_scopeId2}><code data-v-480860fa${_scopeId2}>Links.First</code></td><td data-v-480860fa${_scopeId2}>Current URL with <code data-v-480860fa${_scopeId2}>page=1</code></td></tr><tr data-v-480860fa${_scopeId2}><td data-v-480860fa${_scopeId2}><code data-v-480860fa${_scopeId2}>Links.Prev</code></td><td data-v-480860fa${_scopeId2}>Current URL with <code data-v-480860fa${_scopeId2}>page = currentPage - 1</code>. Omitted on the first page</td></tr><tr data-v-480860fa${_scopeId2}><td data-v-480860fa${_scopeId2}><code data-v-480860fa${_scopeId2}>Links.Next</code></td><td data-v-480860fa${_scopeId2}>Current URL with <code data-v-480860fa${_scopeId2}>page = currentPage + 1</code>. Omitted on the last page</td></tr><tr data-v-480860fa${_scopeId2}><td data-v-480860fa${_scopeId2}><code data-v-480860fa${_scopeId2}>Links.Last</code></td><td data-v-480860fa${_scopeId2}>Current URL with <code data-v-480860fa${_scopeId2}>page = meta.totalPages</code></td></tr><tr data-v-480860fa${_scopeId2}><td data-v-480860fa${_scopeId2}><code data-v-480860fa${_scopeId2}>Meta.TotalPages</code></td><td data-v-480860fa${_scopeId2}><code data-v-480860fa${_scopeId2}>meta.totalPages</code> from the LFI</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "TPP field"),
                          createVNode("th", null, "Derived from")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Links.Self")
                          ]),
                          createVNode("td", null, "The URL that produced this response")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Links.First")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("Current URL with "),
                            createVNode("code", null, "page=1")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Links.Prev")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("Current URL with "),
                            createVNode("code", null, "page = currentPage - 1"),
                            createTextVNode(". Omitted on the first page")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Links.Next")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("Current URL with "),
                            createVNode("code", null, "page = currentPage + 1"),
                            createTextVNode(". Omitted on the last page")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Links.Last")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("Current URL with "),
                            createVNode("code", null, "page = meta.totalPages")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Meta.TotalPages")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "meta.totalPages"),
                            createTextVNode(" from the LFI")
                          ])
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-480860fa${_scopeId}>When the LFI returns an unpaginated response</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`If the LFI returns <code data-v-480860fa${_scopeId2}>meta.paginated: false</code> (or omits <code data-v-480860fa${_scopeId2}>paginated</code>), the full result set is in a single response. The Hub emits <code data-v-480860fa${_scopeId2}>Meta.TotalPages: 1</code>, a <code data-v-480860fa${_scopeId2}>Links.Self</code>, and no <code data-v-480860fa${_scopeId2}>First</code> / <code data-v-480860fa${_scopeId2}>Prev</code> / <code data-v-480860fa${_scopeId2}>Next</code> / <code data-v-480860fa${_scopeId2}>Last</code>.`);
                } else {
                  return [
                    createTextVNode("If the LFI returns "),
                    createVNode("code", null, "meta.paginated: false"),
                    createTextVNode(" (or omits "),
                    createVNode("code", null, "paginated"),
                    createTextVNode("), the full result set is in a single response. The Hub emits "),
                    createVNode("code", null, "Meta.TotalPages: 1"),
                    createTextVNode(", a "),
                    createVNode("code", null, "Links.Self"),
                    createTextVNode(", and no "),
                    createVNode("code", null, "First"),
                    createTextVNode(" / "),
                    createVNode("code", null, "Prev"),
                    createTextVNode(" / "),
                    createVNode("code", null, "Next"),
                    createTextVNode(" / "),
                    createVNode("code", null, "Last"),
                    createTextVNode(".")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, "Request from the TPP"),
              createVNode(_component_EdCode, {
                code: tppRequest,
                lang: "http"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("The TPP does not send "),
                  createVNode("code", null, "page"),
                  createTextVNode(" or "),
                  createVNode("code", null, "page-size"),
                  createTextVNode(". Pagination is expressed through the Hub's URL parameters on the "),
                  createVNode("code", null, "Links"),
                  createTextVNode(" returned in the previous response.")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Response to the TPP"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("The Hub converts the LFI's "),
                  createVNode("code", null, "meta"),
                  createTextVNode(" into "),
                  createVNode("code", null, "Meta"),
                  createTextVNode(" and "),
                  createVNode("code", null, "Links"),
                  createTextVNode(":")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: tppResponse,
                lang: "json"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("The Hub derives each link from the LFI's "),
                  createVNode("code", null, "meta.totalPages"),
                  createTextVNode(" and the current "),
                  createVNode("code", null, "page"),
                  createTextVNode(":")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "TPP field"),
                        createVNode("th", null, "Derived from")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Links.Self")
                        ]),
                        createVNode("td", null, "The URL that produced this response")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Links.First")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("Current URL with "),
                          createVNode("code", null, "page=1")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Links.Prev")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("Current URL with "),
                          createVNode("code", null, "page = currentPage - 1"),
                          createTextVNode(". Omitted on the first page")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Links.Next")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("Current URL with "),
                          createVNode("code", null, "page = currentPage + 1"),
                          createTextVNode(". Omitted on the last page")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Links.Last")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("Current URL with "),
                          createVNode("code", null, "page = meta.totalPages")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Meta.TotalPages")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "meta.totalPages"),
                          createTextVNode(" from the LFI")
                        ])
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "When the LFI returns an unpaginated response"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("If the LFI returns "),
                  createVNode("code", null, "meta.paginated: false"),
                  createTextVNode(" (or omits "),
                  createVNode("code", null, "paginated"),
                  createTextVNode("), the full result set is in a single response. The Hub emits "),
                  createVNode("code", null, "Meta.TotalPages: 1"),
                  createTextVNode(", a "),
                  createVNode("code", null, "Links.Self"),
                  createTextVNode(", and no "),
                  createVNode("code", null, "First"),
                  createTextVNode(" / "),
                  createVNode("code", null, "Prev"),
                  createTextVNode(" / "),
                  createVNode("code", null, "Next"),
                  createTextVNode(" / "),
                  createVNode("code", null, "Last"),
                  createTextVNode(".")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "empty",
        num: "03",
        color: "var(--at-blue)",
        eyebrow: "Empty results",
        title: "A filtered query that yields nothing",
        tone: "cream",
        narrow: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdCode, {
              code: emptyResponse,
              lang: "json"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`The Hub propagates this as an empty <code data-v-480860fa${_scopeId2}>Data</code> array with <code data-v-480860fa${_scopeId2}>Meta.TotalPages: 0</code>. <code data-v-480860fa${_scopeId2}>404</code> <strong data-v-480860fa${_scopeId2}>MUST NOT</strong> be returned.`);
                } else {
                  return [
                    createTextVNode("The Hub propagates this as an empty "),
                    createVNode("code", null, "Data"),
                    createTextVNode(" array with "),
                    createVNode("code", null, "Meta.TotalPages: 0"),
                    createTextVNode(". "),
                    createVNode("code", null, "404"),
                    createTextVNode(),
                    createVNode("strong", null, "MUST NOT"),
                    createTextVNode(" be returned.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdCode, {
                code: emptyResponse,
                lang: "json"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("The Hub propagates this as an empty "),
                  createVNode("code", null, "Data"),
                  createTextVNode(" array with "),
                  createVNode("code", null, "Meta.TotalPages: 0"),
                  createTextVNode(". "),
                  createVNode("code", null, "404"),
                  createTextVNode(),
                  createVNode("strong", null, "MUST NOT"),
                  createTextVNode(" be returned.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "why",
        num: "04",
        color: "var(--at-blue-deep)",
        eyebrow: "Why two models",
        title: "Forward-compatibility on the TPP side, simplicity on the LFI side",
        tone: "surface",
        narrow: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`The TPP standards follow UK Open Banking conventions — opaque <code data-v-480860fa${_scopeId2}>Links</code> let the Hub evolve its pagination strategy (cursor-based, time-sliced, etc.) without breaking TPP clients. The LFI side is deliberately simpler: page/page-size is the lowest-common-denominator interface that every core banking system can serve cheaply. The Hub absorbs the translation.`);
                } else {
                  return [
                    createTextVNode("The TPP standards follow UK Open Banking conventions — opaque "),
                    createVNode("code", null, "Links"),
                    createTextVNode(" let the Hub evolve its pagination strategy (cursor-based, time-sliced, etc.) without breaking TPP clients. The LFI side is deliberately simpler: page/page-size is the lowest-common-denominator interface that every core banking system can serve cheaply. The Hub absorbs the translation.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("The TPP standards follow UK Open Banking conventions — opaque "),
                  createVNode("code", null, "Links"),
                  createTextVNode(" let the Hub evolve its pagination strategy (cursor-based, time-sliced, etc.) without breaking TPP clients. The LFI side is deliberately simpler: page/page-size is the lowest-common-denominator interface that every core banking system can serve cheaply. The Hub absorbs the translation.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "others",
        num: "05",
        color: "var(--at-navy)",
        eyebrow: "Other endpoints",
        title: "The same pattern applies",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<code data-v-480860fa${_scopeId2}>GET /accounts/{accountId}/statements</code> works identically: the LFI paginates by <code data-v-480860fa${_scopeId2}>page</code> / <code data-v-480860fa${_scopeId2}>page-size</code> and returns <code data-v-480860fa${_scopeId2}>meta.totalPages</code> / <code data-v-480860fa${_scopeId2}>meta.totalRecords</code>; the Hub emits <code data-v-480860fa${_scopeId2}>Links</code> and <code data-v-480860fa${_scopeId2}>Meta.TotalPages</code> on the TPP side.`);
                } else {
                  return [
                    createVNode("code", null, "GET /accounts/{accountId}/statements"),
                    createTextVNode(" works identically: the LFI paginates by "),
                    createVNode("code", null, "page"),
                    createTextVNode(" / "),
                    createVNode("code", null, "page-size"),
                    createTextVNode(" and returns "),
                    createVNode("code", null, "meta.totalPages"),
                    createTextVNode(" / "),
                    createVNode("code", null, "meta.totalRecords"),
                    createTextVNode("; the Hub emits "),
                    createVNode("code", null, "Links"),
                    createTextVNode(" and "),
                    createVNode("code", null, "Meta.TotalPages"),
                    createTextVNode(" on the TPP side.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Other list endpoints (<code data-v-480860fa${_scopeId2}>/beneficiaries</code>, <code data-v-480860fa${_scopeId2}>/direct-debits</code>, <code data-v-480860fa${_scopeId2}>/scheduled-payments</code>, <code data-v-480860fa${_scopeId2}>/standing-orders</code>, <code data-v-480860fa${_scopeId2}>/products</code>, <code data-v-480860fa${_scopeId2}>/accounts/{accountId}/customer</code>) may pursue the same model if the LFI chooses to paginate them, but the expectation is that the full result set is returned in a single response.`);
                } else {
                  return [
                    createTextVNode("Other list endpoints ("),
                    createVNode("code", null, "/beneficiaries"),
                    createTextVNode(", "),
                    createVNode("code", null, "/direct-debits"),
                    createTextVNode(", "),
                    createVNode("code", null, "/scheduled-payments"),
                    createTextVNode(", "),
                    createVNode("code", null, "/standing-orders"),
                    createTextVNode(", "),
                    createVNode("code", null, "/products"),
                    createTextVNode(", "),
                    createVNode("code", null, "/accounts/{accountId}/customer"),
                    createTextVNode(") may pursue the same model if the LFI chooses to paginate them, but the expectation is that the full result set is returned in a single response.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("code", null, "GET /accounts/{accountId}/statements"),
                  createTextVNode(" works identically: the LFI paginates by "),
                  createVNode("code", null, "page"),
                  createTextVNode(" / "),
                  createVNode("code", null, "page-size"),
                  createTextVNode(" and returns "),
                  createVNode("code", null, "meta.totalPages"),
                  createTextVNode(" / "),
                  createVNode("code", null, "meta.totalRecords"),
                  createTextVNode("; the Hub emits "),
                  createVNode("code", null, "Links"),
                  createTextVNode(" and "),
                  createVNode("code", null, "Meta.TotalPages"),
                  createTextVNode(" on the TPP side.")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Other list endpoints ("),
                  createVNode("code", null, "/beneficiaries"),
                  createTextVNode(", "),
                  createVNode("code", null, "/direct-debits"),
                  createTextVNode(", "),
                  createVNode("code", null, "/scheduled-payments"),
                  createTextVNode(", "),
                  createVNode("code", null, "/standing-orders"),
                  createTextVNode(", "),
                  createVNode("code", null, "/products"),
                  createTextVNode(", "),
                  createVNode("code", null, "/accounts/{accountId}/customer"),
                  createTextVNode(") may pursue the same model if the LFI chooses to paginate them, but the expectation is that the full result set is returned in a single response.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdRelatedCards, {
        eyebrow: "Related articles",
        title: "Read alongside"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdRelatedCard, {
              href: "/knowledge-base/articles/request-headers",
              category: "Security",
              "category-color": "var(--at-blue)",
              title: "FAPI Request Headers",
              desc: "What x-fapi-interaction-id and the other FAPI headers are for."
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRelatedCard, {
              href: "/knowledge-base/articles/identity-assurance-claims",
              category: "Integration",
              "category-color": "var(--at-blue-deep)",
              title: "Identity Assurance Claims",
              desc: "The OIDC IDA envelope used for customer-returning endpoints."
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdRelatedCard, {
                href: "/knowledge-base/articles/request-headers",
                category: "Security",
                "category-color": "var(--at-blue)",
                title: "FAPI Request Headers",
                desc: "What x-fapi-interaction-id and the other FAPI headers are for."
              }),
              createVNode(_component_EdRelatedCard, {
                href: "/knowledge-base/articles/identity-assurance-claims",
                category: "Integration",
                "category-color": "var(--at-blue-deep)",
                title: "Identity Assurance Claims",
                desc: "The OIDC IDA envelope used for customer-returning endpoints."
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/knowledge-base/articles/pagination.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const pagination = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-480860fa"]]);
export {
  pagination as default
};
