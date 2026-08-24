import { E as EdCode } from "./EdCode-BQ4YLUeg.js";
import { _ as _sfc_main$1 } from "./APIFlowsPagination-D63XLrxb.js";
import { _ as __unplugin_components_8 } from "./APIFlowViewer-C5xJUdUs.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_9 } from "./EdCodeGroup-zEBrHWfH.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { defineComponent, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "mermaid";
import "./useChartTheme-DtmiKid7.js";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const loopNode = `import crypto from 'node:crypto'

async function fetchAllTransactions(accountId: string, fromBookingDateTime: string) {
  const transactions: unknown[] = []

  // Initial request — no page parameters, the Hub paginates via Links
  let nextUrl: string | undefined =
    \`\${LFI_API_BASE}/open-finance/v2.2/accounts/\${accountId}/transactions\` +
    \`?fromBookingDateTime=\${encodeURIComponent(fromBookingDateTime)}\`

  while (nextUrl) {
    const response = await fetch(nextUrl, {
      headers: {
        Authorization:                \`Bearer \${access_token}\`,
        'x-fapi-interaction-id':      crypto.randomUUID(),
        'x-fapi-auth-date':           lastCustomerAuthDate,
        'x-fapi-customer-ip-address': customerIpAddress,
      },
      // agent: new https.Agent({ cert: transportCert, key: transportKey }),
    })

    const body = await response.json()
    transactions.push(...body.Data.Transaction)

    // Stop when the server does not return a Next link — works for both
    // paginated (last page reached) and unpaginated (single response) cases
    nextUrl = body.Links.Next
  }

  return transactions
}
`;
const loopPython = `import uuid

def fetch_all_transactions(account_id: str, from_booking_date_time: str) -> list:
    transactions = []

    # Initial request — no page parameters, the Hub paginates via Links
    next_url = (
        f"{LFI_API_BASE}/open-finance/v2.2/accounts/{account_id}/transactions"
        f"?fromBookingDateTime={from_booking_date_time}"
    )

    while next_url:
        response = httpx.get(
            next_url,
            headers={
                "Authorization":                f"Bearer {access_token}",
                "x-fapi-interaction-id":        str(uuid.uuid4()),
                "x-fapi-auth-date":             last_customer_auth_date,
                "x-fapi-customer-ip-address":   customer_ip_address,
            },
            # cert=("transport.crt", "transport.key"),
        )

        body = response.json()
        transactions.extend(body["Data"]["Transaction"])

        # Stop when the server does not return a Next link — works for both
        # paginated (last page reached) and unpaginated (single response) cases
        next_url = body["Links"].get("Next")

    return transactions
`;
const initialReq = `GET /accounts/acc-001/transactions?fromBookingDateTime=2026-01-01T00:00:00Z
`;
const page1Json = `{
  "Data": {
    "AccountId": "acc-001",
    "Transaction": [ /* ... 100 items ... */ ]
  },
  "Links": {
    "Self":  "https://rs1.lfi.apihub.openfinance.ae/open-finance/v2.2/accounts/acc-001/transactions?fromBookingDateTime=2026-01-01T00%3A00%3A00Z&page=1",
    "First": "https://rs1.lfi.apihub.openfinance.ae/open-finance/v2.2/accounts/acc-001/transactions?fromBookingDateTime=2026-01-01T00%3A00%3A00Z&page=1",
    "Next":  "https://rs1.lfi.apihub.openfinance.ae/open-finance/v2.2/accounts/acc-001/transactions?fromBookingDateTime=2026-01-01T00%3A00%3A00Z&page=2",
    "Last":  "https://rs1.lfi.apihub.openfinance.ae/open-finance/v2.2/accounts/acc-001/transactions?fromBookingDateTime=2026-01-01T00%3A00%3A00Z&page=3"
  },
  "Meta": {
    "TotalPages":             3,
    "FirstAvailableDateTime": "2022-03-14T08:21:00+00:00",
    "LastAvailableDateTime":  "2026-04-18T11:47:00+00:00"
  }
}
`;
const page3Json = `{
  "Data": { "AccountId": "acc-001", "Transaction": [ /* ... last slice ... */ ] },
  "Links": {
    "Self":  "https://rs1.lfi.apihub.openfinance.ae/open-finance/v2.2/accounts/acc-001/transactions?fromBookingDateTime=2026-01-01T00%3A00%3A00Z&page=3",
    "First": "https://rs1.lfi.apihub.openfinance.ae/open-finance/v2.2/accounts/acc-001/transactions?fromBookingDateTime=2026-01-01T00%3A00%3A00Z&page=1",
    "Prev":  "https://rs1.lfi.apihub.openfinance.ae/open-finance/v2.2/accounts/acc-001/transactions?fromBookingDateTime=2026-01-01T00%3A00%3A00Z&page=2",
    "Last":  "https://rs1.lfi.apihub.openfinance.ae/open-finance/v2.2/accounts/acc-001/transactions?fromBookingDateTime=2026-01-01T00%3A00%3A00Z&page=3"
  },
  "Meta": {
    "TotalPages":             3,
    "FirstAvailableDateTime": "2022-03-14T08:21:00+00:00",
    "LastAvailableDateTime":  "2026-04-18T11:47:00+00:00"
  }
}
`;
const unpaginatedJson = `{
  "Data": {
    "AccountId": "acc-001",
    "Transaction": [ /* ... every matching transaction ... */ ]
  },
  "Links": {
    "Self": "https://rs1.lfi.apihub.openfinance.ae/open-finance/v2.2/accounts/acc-001/transactions?fromBookingDateTime=2026-01-01T00%3A00%3A00Z"
  },
  "Meta": {
    "TotalPages":             1,
    "FirstAvailableDateTime": "2022-03-14T08:21:00+00:00",
    "LastAvailableDateTime":  "2026-04-18T11:47:00+00:00"
  }
}
`;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "pagination",
  __ssrInlineRender: true,
  setup(__props) {
    const loopTabs = [
      { label: "Node.js", lang: "typescript", code: loopNode },
      { label: "Python", lang: "python", code: loopPython }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdBullets = __unplugin_components_5;
      const _component_EdRefTable = __unplugin_components_12;
      const _component_EdCodeGroup = __unplugin_components_9;
      const _component_EdNote = __unplugin_components_7;
      const _component_APIFlowViewer = __unplugin_components_8;
      const _component_APIFlowsPagination = _sfc_main$1;
      const _component_EdCode = EdCode;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-15922a6e><section class="ed-doc__hero" data-v-15922a6e><div class="ed-doc__inner" data-v-15922a6e><div class="ed-doc__eyebrow" data-v-15922a6e><span class="ed-doc__eyebrow-dash" data-v-15922a6e></span> TPP · Banking · Bank Data Sharing </div><h1 class="ed-doc__title" data-v-15922a6e> Pagination <span class="ed-doc__read" data-v-15922a6e>3 min read</span></h1><p class="ed-doc__lede" data-v-15922a6e> List endpoints on the Bank Data Sharing API return pagination information in the response body. The TPP walks through a paginated result set by following the URLs in the <code data-v-15922a6e>Links</code> object — there are no <code data-v-15922a6e>page</code> or <code data-v-15922a6e>page-size</code> query parameters to set on the request. </p><p class="ed-doc__lede" data-v-15922a6e> For the end-to-end picture — including how the API Hub converts LFI <code data-v-15922a6e>meta</code> into the TPP <code data-v-15922a6e>Links</code> envelope — see <a href="/knowledge-base/articles/pagination" data-v-15922a6e>Pagination — LFI <code data-v-15922a6e>meta</code> to TPP <code data-v-15922a6e>Links</code></a>. </p></div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "response-shapes",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Two response shapes to handle",
        title: "Paginated and unpaginated, one loop",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Pagination is ultimately driven by the LFI. The UAE Open Finance standard <strong data-v-15922a6e${_scopeId2}>requires</strong> LFIs to paginate <code data-v-15922a6e${_scopeId2}>/accounts/{AccountId}/transactions</code> and <code data-v-15922a6e${_scopeId2}>/accounts/{AccountId}/statements</code>, but during rollout not every LFI will have implemented it on day one. A TPP SHOULD therefore be ready for either of the following: `);
                } else {
                  return [
                    createTextVNode(" Pagination is ultimately driven by the LFI. The UAE Open Finance standard "),
                    createVNode("strong", null, "requires"),
                    createTextVNode(" LFIs to paginate "),
                    createVNode("code", null, "/accounts/{AccountId}/transactions"),
                    createTextVNode(" and "),
                    createVNode("code", null, "/accounts/{AccountId}/statements"),
                    createTextVNode(", but during rollout not every LFI will have implemented it on day one. A TPP SHOULD therefore be ready for either of the following: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-15922a6e${_scopeId2}><strong data-v-15922a6e${_scopeId2}>Paginated</strong> — the LFI returned a page of the filtered result set. <code data-v-15922a6e${_scopeId2}>Meta.TotalPages &gt; 1</code> and <code data-v-15922a6e${_scopeId2}>Links.Next</code> is populated while more pages remain. </li><li data-v-15922a6e${_scopeId2}><strong data-v-15922a6e${_scopeId2}>Unpaginated</strong> — the LFI returned the full result set in a single response. <code data-v-15922a6e${_scopeId2}>Meta.TotalPages</code> is <code data-v-15922a6e${_scopeId2}>1</code> (or <code data-v-15922a6e${_scopeId2}>0</code> for an empty result) and <code data-v-15922a6e${_scopeId2}>Links</code> contains only <code data-v-15922a6e${_scopeId2}>Self</code>. </li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Paginated"),
                      createTextVNode(" — the LFI returned a page of the filtered result set. "),
                      createVNode("code", null, "Meta.TotalPages > 1"),
                      createTextVNode(" and "),
                      createVNode("code", null, "Links.Next"),
                      createTextVNode(" is populated while more pages remain. ")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Unpaginated"),
                      createTextVNode(" — the LFI returned the full result set in a single response. "),
                      createVNode("code", null, "Meta.TotalPages"),
                      createTextVNode(" is "),
                      createVNode("code", null, "1"),
                      createTextVNode(" (or "),
                      createVNode("code", null, "0"),
                      createTextVNode(" for an empty result) and "),
                      createVNode("code", null, "Links"),
                      createTextVNode(" contains only "),
                      createVNode("code", null, "Self"),
                      createTextVNode(". ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The loop pattern below — follow <code data-v-15922a6e${_scopeId2}>Links.Next</code> until it is absent — handles both cases without branching. A TPP that only supports the paginated shape will appear to work correctly while the LFI is unpaginated (it fetches page 1 and stops), but will silently truncate to the first page once the LFI enables pagination. Using <code data-v-15922a6e${_scopeId2}>Links.Next</code> as the stop condition avoids that regression. `);
                } else {
                  return [
                    createTextVNode(" The loop pattern below — follow "),
                    createVNode("code", null, "Links.Next"),
                    createTextVNode(" until it is absent — handles both cases without branching. A TPP that only supports the paginated shape will appear to work correctly while the LFI is unpaginated (it fetches page 1 and stops), but will silently truncate to the first page once the LFI enables pagination. Using "),
                    createVNode("code", null, "Links.Next"),
                    createTextVNode(" as the stop condition avoids that regression. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Pagination is ultimately driven by the LFI. The UAE Open Finance standard "),
                  createVNode("strong", null, "requires"),
                  createTextVNode(" LFIs to paginate "),
                  createVNode("code", null, "/accounts/{AccountId}/transactions"),
                  createTextVNode(" and "),
                  createVNode("code", null, "/accounts/{AccountId}/statements"),
                  createTextVNode(", but during rollout not every LFI will have implemented it on day one. A TPP SHOULD therefore be ready for either of the following: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Paginated"),
                    createTextVNode(" — the LFI returned a page of the filtered result set. "),
                    createVNode("code", null, "Meta.TotalPages > 1"),
                    createTextVNode(" and "),
                    createVNode("code", null, "Links.Next"),
                    createTextVNode(" is populated while more pages remain. ")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Unpaginated"),
                    createTextVNode(" — the LFI returned the full result set in a single response. "),
                    createVNode("code", null, "Meta.TotalPages"),
                    createTextVNode(" is "),
                    createVNode("code", null, "1"),
                    createTextVNode(" (or "),
                    createVNode("code", null, "0"),
                    createTextVNode(" for an empty result) and "),
                    createVNode("code", null, "Links"),
                    createTextVNode(" contains only "),
                    createVNode("code", null, "Self"),
                    createTextVNode(". ")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The loop pattern below — follow "),
                  createVNode("code", null, "Links.Next"),
                  createTextVNode(" until it is absent — handles both cases without branching. A TPP that only supports the paginated shape will appear to work correctly while the LFI is unpaginated (it fetches page 1 and stops), but will silently truncate to the first page once the LFI enables pagination. Using "),
                  createVNode("code", null, "Links.Next"),
                  createTextVNode(" as the stop condition avoids that regression. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "which-paginate",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "Which endpoints paginate",
        title: "Required vs optional pagination",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-15922a6e${_scopeId2}><thead data-v-15922a6e${_scopeId2}><tr data-v-15922a6e${_scopeId2}><th data-v-15922a6e${_scopeId2}>Endpoint</th><th data-v-15922a6e${_scopeId2}>Pagination</th></tr></thead><tbody data-v-15922a6e${_scopeId2}><tr data-v-15922a6e${_scopeId2}><td data-v-15922a6e${_scopeId2}><span class="endpoint" data-v-15922a6e${_scopeId2}><span class="http-method http-method--get" data-v-15922a6e${_scopeId2}>GET</span><code data-v-15922a6e${_scopeId2}>/accounts/{AccountId}/transactions</code></span></td><td data-v-15922a6e${_scopeId2}><strong data-v-15922a6e${_scopeId2}>Required</strong></td></tr><tr data-v-15922a6e${_scopeId2}><td data-v-15922a6e${_scopeId2}><span class="endpoint" data-v-15922a6e${_scopeId2}><span class="http-method http-method--get" data-v-15922a6e${_scopeId2}>GET</span><code data-v-15922a6e${_scopeId2}>/accounts/{AccountId}/statements</code></span></td><td data-v-15922a6e${_scopeId2}><strong data-v-15922a6e${_scopeId2}>Required</strong></td></tr><tr data-v-15922a6e${_scopeId2}><td data-v-15922a6e${_scopeId2}><span class="endpoint" data-v-15922a6e${_scopeId2}><span class="http-method http-method--get" data-v-15922a6e${_scopeId2}>GET</span><code data-v-15922a6e${_scopeId2}>/accounts</code></span></td><td data-v-15922a6e${_scopeId2}>Optional</td></tr><tr data-v-15922a6e${_scopeId2}><td data-v-15922a6e${_scopeId2}><span class="endpoint" data-v-15922a6e${_scopeId2}><span class="http-method http-method--get" data-v-15922a6e${_scopeId2}>GET</span><code data-v-15922a6e${_scopeId2}>/accounts/{AccountId}/balances</code></span></td><td data-v-15922a6e${_scopeId2}>Optional</td></tr><tr data-v-15922a6e${_scopeId2}><td data-v-15922a6e${_scopeId2}><span class="endpoint" data-v-15922a6e${_scopeId2}><span class="http-method http-method--get" data-v-15922a6e${_scopeId2}>GET</span><code data-v-15922a6e${_scopeId2}>/accounts/{AccountId}/beneficiaries</code></span></td><td data-v-15922a6e${_scopeId2}>Optional</td></tr><tr data-v-15922a6e${_scopeId2}><td data-v-15922a6e${_scopeId2}><span class="endpoint" data-v-15922a6e${_scopeId2}><span class="http-method http-method--get" data-v-15922a6e${_scopeId2}>GET</span><code data-v-15922a6e${_scopeId2}>/accounts/{AccountId}/direct-debits</code></span></td><td data-v-15922a6e${_scopeId2}>Optional</td></tr><tr data-v-15922a6e${_scopeId2}><td data-v-15922a6e${_scopeId2}><span class="endpoint" data-v-15922a6e${_scopeId2}><span class="http-method http-method--get" data-v-15922a6e${_scopeId2}>GET</span><code data-v-15922a6e${_scopeId2}>/accounts/{AccountId}/scheduled-payments</code></span></td><td data-v-15922a6e${_scopeId2}>Optional</td></tr><tr data-v-15922a6e${_scopeId2}><td data-v-15922a6e${_scopeId2}><span class="endpoint" data-v-15922a6e${_scopeId2}><span class="http-method http-method--get" data-v-15922a6e${_scopeId2}>GET</span><code data-v-15922a6e${_scopeId2}>/accounts/{AccountId}/standing-orders</code></span></td><td data-v-15922a6e${_scopeId2}>Optional</td></tr><tr data-v-15922a6e${_scopeId2}><td data-v-15922a6e${_scopeId2}><span class="endpoint" data-v-15922a6e${_scopeId2}><span class="http-method http-method--get" data-v-15922a6e${_scopeId2}>GET</span><code data-v-15922a6e${_scopeId2}>/accounts/{AccountId}/product</code></span></td><td data-v-15922a6e${_scopeId2}>Optional</td></tr><tr data-v-15922a6e${_scopeId2}><td data-v-15922a6e${_scopeId2}><span class="endpoint" data-v-15922a6e${_scopeId2}><span class="http-method http-method--get" data-v-15922a6e${_scopeId2}>GET</span><code data-v-15922a6e${_scopeId2}>/accounts/{AccountId}/parties</code></span></td><td data-v-15922a6e${_scopeId2}>Optional</td></tr></tbody></table>`);
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
                              createVNode("code", null, "/accounts/{AccountId}/transactions")
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
                              createVNode("code", null, "/accounts/{AccountId}/statements")
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
                              createVNode("code", null, "/accounts/{AccountId}/balances")
                            ])
                          ]),
                          createVNode("td", null, "Optional")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("span", { class: "endpoint" }, [
                              createVNode("span", { class: "http-method http-method--get" }, "GET"),
                              createVNode("code", null, "/accounts/{AccountId}/beneficiaries")
                            ])
                          ]),
                          createVNode("td", null, "Optional")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("span", { class: "endpoint" }, [
                              createVNode("span", { class: "http-method http-method--get" }, "GET"),
                              createVNode("code", null, "/accounts/{AccountId}/direct-debits")
                            ])
                          ]),
                          createVNode("td", null, "Optional")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("span", { class: "endpoint" }, [
                              createVNode("span", { class: "http-method http-method--get" }, "GET"),
                              createVNode("code", null, "/accounts/{AccountId}/scheduled-payments")
                            ])
                          ]),
                          createVNode("td", null, "Optional")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("span", { class: "endpoint" }, [
                              createVNode("span", { class: "http-method http-method--get" }, "GET"),
                              createVNode("code", null, "/accounts/{AccountId}/standing-orders")
                            ])
                          ]),
                          createVNode("td", null, "Optional")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("span", { class: "endpoint" }, [
                              createVNode("span", { class: "http-method http-method--get" }, "GET"),
                              createVNode("code", null, "/accounts/{AccountId}/product")
                            ])
                          ]),
                          createVNode("td", null, "Optional")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("span", { class: "endpoint" }, [
                              createVNode("span", { class: "http-method http-method--get" }, "GET"),
                              createVNode("code", null, "/accounts/{AccountId}/parties")
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
                  _push3(` Transactions and statements span long history (at least two years) and routinely produce large result sets. For other list endpoints the full result set is usually returned in one response, but TPPs SHOULD still follow <code data-v-15922a6e${_scopeId2}>Links.Next</code> defensively in case an LFI chooses to paginate them. `);
                } else {
                  return [
                    createTextVNode(" Transactions and statements span long history (at least two years) and routinely produce large result sets. For other list endpoints the full result set is usually returned in one response, but TPPs SHOULD still follow "),
                    createVNode("code", null, "Links.Next"),
                    createTextVNode(" defensively in case an LFI chooses to paginate them. ")
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
                            createVNode("code", null, "/accounts/{AccountId}/transactions")
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
                            createVNode("code", null, "/accounts/{AccountId}/statements")
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
                            createVNode("code", null, "/accounts/{AccountId}/balances")
                          ])
                        ]),
                        createVNode("td", null, "Optional")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("span", { class: "endpoint" }, [
                            createVNode("span", { class: "http-method http-method--get" }, "GET"),
                            createVNode("code", null, "/accounts/{AccountId}/beneficiaries")
                          ])
                        ]),
                        createVNode("td", null, "Optional")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("span", { class: "endpoint" }, [
                            createVNode("span", { class: "http-method http-method--get" }, "GET"),
                            createVNode("code", null, "/accounts/{AccountId}/direct-debits")
                          ])
                        ]),
                        createVNode("td", null, "Optional")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("span", { class: "endpoint" }, [
                            createVNode("span", { class: "http-method http-method--get" }, "GET"),
                            createVNode("code", null, "/accounts/{AccountId}/scheduled-payments")
                          ])
                        ]),
                        createVNode("td", null, "Optional")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("span", { class: "endpoint" }, [
                            createVNode("span", { class: "http-method http-method--get" }, "GET"),
                            createVNode("code", null, "/accounts/{AccountId}/standing-orders")
                          ])
                        ]),
                        createVNode("td", null, "Optional")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("span", { class: "endpoint" }, [
                            createVNode("span", { class: "http-method http-method--get" }, "GET"),
                            createVNode("code", null, "/accounts/{AccountId}/product")
                          ])
                        ]),
                        createVNode("td", null, "Optional")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("span", { class: "endpoint" }, [
                            createVNode("span", { class: "http-method http-method--get" }, "GET"),
                            createVNode("code", null, "/accounts/{AccountId}/parties")
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
                  createTextVNode(" Transactions and statements span long history (at least two years) and routinely produce large result sets. For other list endpoints the full result set is usually returned in one response, but TPPs SHOULD still follow "),
                  createVNode("code", null, "Links.Next"),
                  createTextVNode(" defensively in case an LFI chooses to paginate them. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "links-envelope",
        num: "03",
        color: "var(--at-blue-deep, #1d4ed8)",
        eyebrow: "The Links envelope",
        title: "What each Links field means",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Every paginated response includes a <code data-v-15922a6e${_scopeId2}>Links</code> object alongside <code data-v-15922a6e${_scopeId2}>Data</code>: `);
                } else {
                  return [
                    createTextVNode(" Every paginated response includes a "),
                    createVNode("code", null, "Links"),
                    createTextVNode(" object alongside "),
                    createVNode("code", null, "Data"),
                    createTextVNode(": ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-15922a6e${_scopeId2}><thead data-v-15922a6e${_scopeId2}><tr data-v-15922a6e${_scopeId2}><th data-v-15922a6e${_scopeId2}>Field</th><th data-v-15922a6e${_scopeId2}>Required</th><th data-v-15922a6e${_scopeId2}>Meaning</th></tr></thead><tbody data-v-15922a6e${_scopeId2}><tr data-v-15922a6e${_scopeId2}><td data-v-15922a6e${_scopeId2}><code data-v-15922a6e${_scopeId2}>Self</code></td><td data-v-15922a6e${_scopeId2}>Yes</td><td data-v-15922a6e${_scopeId2}>The URL that produced this response</td></tr><tr data-v-15922a6e${_scopeId2}><td data-v-15922a6e${_scopeId2}><code data-v-15922a6e${_scopeId2}>First</code></td><td data-v-15922a6e${_scopeId2}>No</td><td data-v-15922a6e${_scopeId2}>Link to the first page. Omitted when the response is unpaginated</td></tr><tr data-v-15922a6e${_scopeId2}><td data-v-15922a6e${_scopeId2}><code data-v-15922a6e${_scopeId2}>Prev</code></td><td data-v-15922a6e${_scopeId2}>No</td><td data-v-15922a6e${_scopeId2}>Link to the previous page. Omitted on the first page</td></tr><tr data-v-15922a6e${_scopeId2}><td data-v-15922a6e${_scopeId2}><code data-v-15922a6e${_scopeId2}>Next</code></td><td data-v-15922a6e${_scopeId2}>No</td><td data-v-15922a6e${_scopeId2}>Link to the next page. <strong data-v-15922a6e${_scopeId2}>Omitted on the last page and when the response is unpaginated</strong></td></tr><tr data-v-15922a6e${_scopeId2}><td data-v-15922a6e${_scopeId2}><code data-v-15922a6e${_scopeId2}>Last</code></td><td data-v-15922a6e${_scopeId2}>No</td><td data-v-15922a6e${_scopeId2}>Link to the last page. Omitted when the response is unpaginated</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Field"),
                          createVNode("th", null, "Required"),
                          createVNode("th", null, "Meaning")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Self")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, "The URL that produced this response")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "First")
                          ]),
                          createVNode("td", null, "No"),
                          createVNode("td", null, "Link to the first page. Omitted when the response is unpaginated")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Prev")
                          ]),
                          createVNode("td", null, "No"),
                          createVNode("td", null, "Link to the previous page. Omitted on the first page")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Next")
                          ]),
                          createVNode("td", null, "No"),
                          createVNode("td", null, [
                            createTextVNode("Link to the next page. "),
                            createVNode("strong", null, "Omitted on the last page and when the response is unpaginated")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Last")
                          ]),
                          createVNode("td", null, "No"),
                          createVNode("td", null, "Link to the last page. Omitted when the response is unpaginated")
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
                  _push3(` The URLs in <code data-v-15922a6e${_scopeId2}>Links</code> are opaque — treat them as strings to fetch, not as templates to parse or rebuild. The API Hub may evolve the pagination parameters it embeds in these URLs without breaking your client. `);
                } else {
                  return [
                    createTextVNode(" The URLs in "),
                    createVNode("code", null, "Links"),
                    createTextVNode(" are opaque — treat them as strings to fetch, not as templates to parse or rebuild. The API Hub may evolve the pagination parameters it embeds in these URLs without breaking your client. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Every paginated response includes a "),
                  createVNode("code", null, "Links"),
                  createTextVNode(" object alongside "),
                  createVNode("code", null, "Data"),
                  createTextVNode(": ")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Field"),
                        createVNode("th", null, "Required"),
                        createVNode("th", null, "Meaning")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Self")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, "The URL that produced this response")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "First")
                        ]),
                        createVNode("td", null, "No"),
                        createVNode("td", null, "Link to the first page. Omitted when the response is unpaginated")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Prev")
                        ]),
                        createVNode("td", null, "No"),
                        createVNode("td", null, "Link to the previous page. Omitted on the first page")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Next")
                        ]),
                        createVNode("td", null, "No"),
                        createVNode("td", null, [
                          createTextVNode("Link to the next page. "),
                          createVNode("strong", null, "Omitted on the last page and when the response is unpaginated")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Last")
                        ]),
                        createVNode("td", null, "No"),
                        createVNode("td", null, "Link to the last page. Omitted when the response is unpaginated")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The URLs in "),
                  createVNode("code", null, "Links"),
                  createTextVNode(" are opaque — treat them as strings to fetch, not as templates to parse or rebuild. The API Hub may evolve the pagination parameters it embeds in these URLs without breaking your client. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "meta-object",
        num: "04",
        color: "var(--at-navy)",
        eyebrow: "The Meta object",
        title: "Counts and history boundaries",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-15922a6e${_scopeId2}><thead data-v-15922a6e${_scopeId2}><tr data-v-15922a6e${_scopeId2}><th data-v-15922a6e${_scopeId2}>Field</th><th data-v-15922a6e${_scopeId2}>Applies to</th><th data-v-15922a6e${_scopeId2}>Meaning</th></tr></thead><tbody data-v-15922a6e${_scopeId2}><tr data-v-15922a6e${_scopeId2}><td data-v-15922a6e${_scopeId2}><code data-v-15922a6e${_scopeId2}>TotalPages</code></td><td data-v-15922a6e${_scopeId2}>All list endpoints</td><td data-v-15922a6e${_scopeId2}>Total number of pages in the filtered result set. <code data-v-15922a6e${_scopeId2}>1</code> when the response is unpaginated, <code data-v-15922a6e${_scopeId2}>0</code> for an empty result set</td></tr><tr data-v-15922a6e${_scopeId2}><td data-v-15922a6e${_scopeId2}><code data-v-15922a6e${_scopeId2}>FirstAvailableDateTime</code></td><td data-v-15922a6e${_scopeId2}>Transactions, statements</td><td data-v-15922a6e${_scopeId2}>ISO 8601 timestamp of the earliest record the LFI holds for this account</td></tr><tr data-v-15922a6e${_scopeId2}><td data-v-15922a6e${_scopeId2}><code data-v-15922a6e${_scopeId2}>LastAvailableDateTime</code></td><td data-v-15922a6e${_scopeId2}>Transactions, statements</td><td data-v-15922a6e${_scopeId2}>ISO 8601 timestamp of the most recent record the LFI holds for this account</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Field"),
                          createVNode("th", null, "Applies to"),
                          createVNode("th", null, "Meaning")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "TotalPages")
                          ]),
                          createVNode("td", null, "All list endpoints"),
                          createVNode("td", null, [
                            createTextVNode("Total number of pages in the filtered result set. "),
                            createVNode("code", null, "1"),
                            createTextVNode(" when the response is unpaginated, "),
                            createVNode("code", null, "0"),
                            createTextVNode(" for an empty result set")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "FirstAvailableDateTime")
                          ]),
                          createVNode("td", null, "Transactions, statements"),
                          createVNode("td", null, "ISO 8601 timestamp of the earliest record the LFI holds for this account")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "LastAvailableDateTime")
                          ]),
                          createVNode("td", null, "Transactions, statements"),
                          createVNode("td", null, "ISO 8601 timestamp of the most recent record the LFI holds for this account")
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
                  _push3(`<code data-v-15922a6e${_scopeId2}>FirstAvailableDateTime</code> and <code data-v-15922a6e${_scopeId2}>LastAvailableDateTime</code> reflect the full history the LFI holds, not the slice returned by the current query. They are useful for narrowing follow-up requests with <code data-v-15922a6e${_scopeId2}>fromBookingDateTime</code> / <code data-v-15922a6e${_scopeId2}>toBookingDateTime</code>. `);
                } else {
                  return [
                    createVNode("code", null, "FirstAvailableDateTime"),
                    createTextVNode(" and "),
                    createVNode("code", null, "LastAvailableDateTime"),
                    createTextVNode(" reflect the full history the LFI holds, not the slice returned by the current query. They are useful for narrowing follow-up requests with "),
                    createVNode("code", null, "fromBookingDateTime"),
                    createTextVNode(" / "),
                    createVNode("code", null, "toBookingDateTime"),
                    createTextVNode(". ")
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
                        createVNode("th", null, "Field"),
                        createVNode("th", null, "Applies to"),
                        createVNode("th", null, "Meaning")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "TotalPages")
                        ]),
                        createVNode("td", null, "All list endpoints"),
                        createVNode("td", null, [
                          createTextVNode("Total number of pages in the filtered result set. "),
                          createVNode("code", null, "1"),
                          createTextVNode(" when the response is unpaginated, "),
                          createVNode("code", null, "0"),
                          createTextVNode(" for an empty result set")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "FirstAvailableDateTime")
                        ]),
                        createVNode("td", null, "Transactions, statements"),
                        createVNode("td", null, "ISO 8601 timestamp of the earliest record the LFI holds for this account")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "LastAvailableDateTime")
                        ]),
                        createVNode("td", null, "Transactions, statements"),
                        createVNode("td", null, "ISO 8601 timestamp of the most recent record the LFI holds for this account")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("code", null, "FirstAvailableDateTime"),
                  createTextVNode(" and "),
                  createVNode("code", null, "LastAvailableDateTime"),
                  createTextVNode(" reflect the full history the LFI holds, not the slice returned by the current query. They are useful for narrowing follow-up requests with "),
                  createVNode("code", null, "fromBookingDateTime"),
                  createTextVNode(" / "),
                  createVNode("code", null, "toBookingDateTime"),
                  createTextVNode(". ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "follow-next",
        num: "05",
        color: "var(--at-teal-deep)",
        eyebrow: "Following Links.Next",
        title: "The canonical fetch loop",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The canonical pattern is a loop that fetches <code data-v-15922a6e${_scopeId2}>Links.Next</code> until the field is absent. The same logic terminates correctly whether the LFI paginated the result or returned it in a single response. `);
                } else {
                  return [
                    createTextVNode(" The canonical pattern is a loop that fetches "),
                    createVNode("code", null, "Links.Next"),
                    createTextVNode(" until the field is absent. The same logic terminates correctly whether the LFI paginated the result or returned it in a single response. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: loopTabs }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "tip",
              title: "Reuse the access token across pages"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-15922a6e${_scopeId2}> The access token is valid for the same 10-minute window used elsewhere. For very large result sets, refresh proactively using the refresh token flow in <a href="/tech/tpp-standards/v2.2-rc1/banking/data-sharing/api-guide/#step-10-refreshing-the-access-token" data-v-15922a6e${_scopeId2}>Step 10 — Refreshing the Access Token</a> rather than waiting for a <code data-v-15922a6e${_scopeId2}>401</code> mid-loop. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" The access token is valid for the same 10-minute window used elsewhere. For very large result sets, refresh proactively using the refresh token flow in "),
                      createVNode("a", { href: "/tech/tpp-standards/v2.2-rc1/banking/data-sharing/api-guide/#step-10-refreshing-the-access-token" }, "Step 10 — Refreshing the Access Token"),
                      createTextVNode(" rather than waiting for a "),
                      createVNode("code", null, "401"),
                      createTextVNode(" mid-loop. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "warning",
              title: "Rate limits and bounded retries"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-15922a6e${_scopeId2}> Each page is a separate HTTP request. Cap your loop with a sensible maximum page count and respect any <code data-v-15922a6e${_scopeId2}>429 Too Many Requests</code> backoff the API Hub returns — do not retry <code data-v-15922a6e${_scopeId2}>Links.Next</code> in a tight loop. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" Each page is a separate HTTP request. Cap your loop with a sensible maximum page count and respect any "),
                      createVNode("code", null, "429 Too Many Requests"),
                      createTextVNode(" backoff the API Hub returns — do not retry "),
                      createVNode("code", null, "Links.Next"),
                      createTextVNode(" in a tight loop. ")
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
                  createTextVNode(" The canonical pattern is a loop that fetches "),
                  createVNode("code", null, "Links.Next"),
                  createTextVNode(" until the field is absent. The same logic terminates correctly whether the LFI paginated the result or returned it in a single response. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCodeGroup, { tabs: loopTabs }),
              createVNode(_component_EdNote, {
                type: "tip",
                title: "Reuse the access token across pages"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" The access token is valid for the same 10-minute window used elsewhere. For very large result sets, refresh proactively using the refresh token flow in "),
                    createVNode("a", { href: "/tech/tpp-standards/v2.2-rc1/banking/data-sharing/api-guide/#step-10-refreshing-the-access-token" }, "Step 10 — Refreshing the Access Token"),
                    createTextVNode(" rather than waiting for a "),
                    createVNode("code", null, "401"),
                    createTextVNode(" mid-loop. ")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "warning",
                title: "Rate limits and bounded retries"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" Each page is a separate HTTP request. Cap your loop with a sensible maximum page count and respect any "),
                    createVNode("code", null, "429 Too Many Requests"),
                    createTextVNode(" backoff the API Hub returns — do not retry "),
                    createVNode("code", null, "Links.Next"),
                    createTextVNode(" in a tight loop. ")
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
        id: "api-sequence-flow",
        num: "06",
        color: "var(--at-gold)",
        eyebrow: "API Sequence Flow",
        title: "Walking pages end-to-end",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The diagram below traces a three-page transactions query through the API Hub. The TPP makes a single unparameterised request and then follows <code data-v-15922a6e${_scopeId2}>Links.Next</code> on each response; the Hub translates each call into the corresponding <code data-v-15922a6e${_scopeId2}>page</code> / <code data-v-15922a6e${_scopeId2}>page-size</code> request to the LFI and converts the LFI&#39;s <code data-v-15922a6e${_scopeId2}>meta</code> back into the <code data-v-15922a6e${_scopeId2}>Links</code> envelope. `);
                } else {
                  return [
                    createTextVNode(" The diagram below traces a three-page transactions query through the API Hub. The TPP makes a single unparameterised request and then follows "),
                    createVNode("code", null, "Links.Next"),
                    createTextVNode(" on each response; the Hub translates each call into the corresponding "),
                    createVNode("code", null, "page"),
                    createTextVNode(" / "),
                    createVNode("code", null, "page-size"),
                    createTextVNode(" request to the LFI and converts the LFI's "),
                    createVNode("code", null, "meta"),
                    createTextVNode(" back into the "),
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
                  createTextVNode(" The diagram below traces a three-page transactions query through the API Hub. The TPP makes a single unparameterised request and then follows "),
                  createVNode("code", null, "Links.Next"),
                  createTextVNode(" on each response; the Hub translates each call into the corresponding "),
                  createVNode("code", null, "page"),
                  createTextVNode(" / "),
                  createVNode("code", null, "page-size"),
                  createTextVNode(" request to the LFI and converts the LFI's "),
                  createVNode("code", null, "meta"),
                  createTextVNode(" back into the "),
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
        id: "example-3-pages",
        num: "07",
        color: "var(--at-teal)",
        eyebrow: "Worked example — transactions, 3-page result",
        title: "Walking three pages of transactions",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Initial request:`);
                } else {
                  return [
                    createTextVNode("Initial request:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: initialReq,
              lang: "http",
              filename: "initial request"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Response — page 1 of 3:`);
                } else {
                  return [
                    createTextVNode("Response — page 1 of 3:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: page1Json,
              lang: "json",
              filename: "page 1 response"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The TPP follows <code data-v-15922a6e${_scopeId2}>Links.Next</code>. On page 3, the response has no <code data-v-15922a6e${_scopeId2}>Next</code> field: `);
                } else {
                  return [
                    createTextVNode(" The TPP follows "),
                    createVNode("code", null, "Links.Next"),
                    createTextVNode(". On page 3, the response has no "),
                    createVNode("code", null, "Next"),
                    createTextVNode(" field: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: page3Json,
              lang: "json",
              filename: "page 3 response"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`The loop terminates on the absence of <code data-v-15922a6e${_scopeId2}>Links.Next</code>.`);
                } else {
                  return [
                    createTextVNode("The loop terminates on the absence of "),
                    createVNode("code", null, "Links.Next"),
                    createTextVNode(".")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Initial request:")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: initialReq,
                lang: "http",
                filename: "initial request"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Response — page 1 of 3:")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: page1Json,
                lang: "json",
                filename: "page 1 response"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The TPP follows "),
                  createVNode("code", null, "Links.Next"),
                  createTextVNode(". On page 3, the response has no "),
                  createVNode("code", null, "Next"),
                  createTextVNode(" field: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: page3Json,
                lang: "json",
                filename: "page 3 response"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("The loop terminates on the absence of "),
                  createVNode("code", null, "Links.Next"),
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
        id: "example-unpaginated",
        num: "08",
        color: "var(--at-gold)",
        eyebrow: "Worked example — LFI returns everything in one response",
        title: "Unpaginated response handled by the same loop",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` When the LFI has not enabled pagination, the same request returns the full result set in one response: `);
                } else {
                  return [
                    createTextVNode(" When the LFI has not enabled pagination, the same request returns the full result set in one response: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: unpaginatedJson,
              lang: "json",
              filename: "unpaginated response"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<code data-v-15922a6e${_scopeId2}>Links.Next</code> is absent, so the loop exits after the first iteration. No TPP-side branching is required. `);
                } else {
                  return [
                    createVNode("code", null, "Links.Next"),
                    createTextVNode(" is absent, so the loop exits after the first iteration. No TPP-side branching is required. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" When the LFI has not enabled pagination, the same request returns the full result set in one response: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: unpaginatedJson,
                lang: "json",
                filename: "unpaginated response"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("code", null, "Links.Next"),
                  createTextVNode(" is absent, so the loop exits after the first iteration. No TPP-side branching is required. ")
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
        num: "09",
        color: "var(--at-blue-deep, #1d4ed8)",
        eyebrow: "Empty result sets",
        title: "No matches is a 200, not a 404",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` A query that matches no records returns <code data-v-15922a6e${_scopeId2}>200</code> with an empty <code data-v-15922a6e${_scopeId2}>Data</code> array, <code data-v-15922a6e${_scopeId2}>Meta.TotalPages: 0</code>, and <code data-v-15922a6e${_scopeId2}>Links</code> containing only <code data-v-15922a6e${_scopeId2}>Self</code>. Do not treat this as an error — <code data-v-15922a6e${_scopeId2}>404</code> is not returned for empty filtered results. `);
                } else {
                  return [
                    createTextVNode(" A query that matches no records returns "),
                    createVNode("code", null, "200"),
                    createTextVNode(" with an empty "),
                    createVNode("code", null, "Data"),
                    createTextVNode(" array, "),
                    createVNode("code", null, "Meta.TotalPages: 0"),
                    createTextVNode(", and "),
                    createVNode("code", null, "Links"),
                    createTextVNode(" containing only "),
                    createVNode("code", null, "Self"),
                    createTextVNode(". Do not treat this as an error — "),
                    createVNode("code", null, "404"),
                    createTextVNode(" is not returned for empty filtered results. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" A query that matches no records returns "),
                  createVNode("code", null, "200"),
                  createTextVNode(" with an empty "),
                  createVNode("code", null, "Data"),
                  createTextVNode(" array, "),
                  createVNode("code", null, "Meta.TotalPages: 0"),
                  createTextVNode(", and "),
                  createVNode("code", null, "Links"),
                  createTextVNode(" containing only "),
                  createVNode("code", null, "Self"),
                  createTextVNode(". Do not treat this as an error — "),
                  createVNode("code", null, "404"),
                  createTextVNode(" is not returned for empty filtered results. ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/v2.2-rc1/banking/data-sharing/api-guide/pagination.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const pagination = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-15922a6e"]]);
export {
  pagination as default
};
