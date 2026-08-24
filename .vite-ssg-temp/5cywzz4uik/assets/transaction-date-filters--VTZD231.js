import { _ as __unplugin_components_0, a as __unplugin_components_2, b as __unplugin_components_6, c as __unplugin_components_7$1 } from "./EdBackStrip-COkyNhGh.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { E as EdCode } from "./EdCode-BQ4YLUeg.js";
import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
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
const exampleRequest = `GET /accounts/acc-001/transactions
  ?fromBookingDateTime=2025-01-01T00:00:00Z
  &toBookingDateTime=2025-12-31T23:59:59Z
  &page=1
  &page-size=100`;
const emptyResponse = `HTTP/1.1 200 OK

{
  "data": [],
  "meta": {
    "paginated": true,
    "totalPages": 0,
    "totalRecords": 0
  }
}`;
const rejectedResponse = `HTTP/1.1 400 Bad Request

{
  "code": "Resource.InvalidFormat",
  "message": "A query parameter has an invalid format."
}`;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "transaction-date-filters",
  __ssrInlineRender: true,
  setup(__props) {
    const sections = [
      { id: "accepted", label: "Accepted" },
      { id: "rejected", label: "Rejected" },
      { id: "lfi", label: "What the LFI does" }
    ];
    const meta = [
      { label: "Category", value: "Integration" },
      { label: "Read", value: "3 min" },
      { label: "Updated", value: "21 May 2026" }
    ];
    const tags = ["Data Sharing", "Ozone Connect", "Transactions"];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdBackStrip = __unplugin_components_0;
      const _component_EdHero = __unplugin_components_0$1;
      const _component_EdInPageNav = __unplugin_components_2;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdBullets = __unplugin_components_5;
      const _component_EdCode = EdCode;
      const _component_EdNote = __unplugin_components_7;
      const _component_EdRelatedCards = __unplugin_components_6;
      const _component_EdRelatedCard = __unplugin_components_7$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-page" }, _attrs))} data-v-311680d0>`);
      _push(ssrRenderComponent(_component_EdBackStrip, {
        href: "/knowledge-base/",
        text: "All knowledge base articles"
      }, null, _parent));
      _push(ssrRenderComponent(_component_EdHero, {
        eyebrow: "Learn · Understand · Build",
        title: "Date Filters — fromBookingDateTime & toBookingDateTime",
        meta,
        lede: "The transaction and statement list endpoints accept an optional date range. This article is the short version: what the range accepts, the three cases the <strong>API Hub</strong> rejects, and what an LFI's Ozone Connect implementation has to do with the requests that reach it."
      }, {
        lede: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="ed-tags" data-v-311680d0${_scopeId}><!--[-->`);
            ssrRenderList(tags, (t) => {
              _push2(`<span class="ed-tag" data-v-311680d0${_scopeId}>${ssrInterpolate(t)}</span>`);
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
            _push2(` Both list endpoints take an optional, open-ended date range. <code data-v-311680d0${_scopeId}>GET /accounts/{accountId}/transactions</code> uses <code data-v-311680d0${_scopeId}>fromBookingDateTime</code> / <code data-v-311680d0${_scopeId}>toBookingDateTime</code>; <code data-v-311680d0${_scopeId}>GET /accounts/{accountId}/statements</code> uses <code data-v-311680d0${_scopeId}>fromStatementDate</code> / <code data-v-311680d0${_scopeId}>toStatementDate</code>. The behaviour is identical — the examples below use transactions. `);
          } else {
            return [
              createTextVNode(" Both list endpoints take an optional, open-ended date range. "),
              createVNode("code", null, "GET /accounts/{accountId}/transactions"),
              createTextVNode(" uses "),
              createVNode("code", null, "fromBookingDateTime"),
              createTextVNode(" / "),
              createVNode("code", null, "toBookingDateTime"),
              createTextVNode("; "),
              createVNode("code", null, "GET /accounts/{accountId}/statements"),
              createTextVNode(" uses "),
              createVNode("code", null, "fromStatementDate"),
              createTextVNode(" / "),
              createVNode("code", null, "toStatementDate"),
              createTextVNode(". The behaviour is identical — the examples below use transactions. ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "accepted",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Accepted",
        title: "What the range accepts",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Both parameters are optional. They narrow the result to transactions booked <strong data-v-311680d0${_scopeId2}>on or after</strong> <code data-v-311680d0${_scopeId2}>fromBookingDateTime</code> and <strong data-v-311680d0${_scopeId2}>on or before</strong> <code data-v-311680d0${_scopeId2}>toBookingDateTime</code>; omit either bound for an open-ended range. A well-formed range is always accepted — <strong data-v-311680d0${_scopeId2}>even when it matches nothing</strong>. In particular, the following are valid requests, not errors: `);
                } else {
                  return [
                    createTextVNode(" Both parameters are optional. They narrow the result to transactions booked "),
                    createVNode("strong", null, "on or after"),
                    createTextVNode(),
                    createVNode("code", null, "fromBookingDateTime"),
                    createTextVNode(" and "),
                    createVNode("strong", null, "on or before"),
                    createTextVNode(),
                    createVNode("code", null, "toBookingDateTime"),
                    createTextVNode("; omit either bound for an open-ended range. A well-formed range is always accepted — "),
                    createVNode("strong", null, "even when it matches nothing"),
                    createTextVNode(". In particular, the following are valid requests, not errors: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-311680d0${_scopeId2}>a range reaching <strong data-v-311680d0${_scopeId2}>beyond two years</strong> into the past — the LFI returns the records it holds, and <strong data-v-311680d0${_scopeId2}>MAY</strong> return records older than two years where it has them;</li><li data-v-311680d0${_scopeId2}>a <strong data-v-311680d0${_scopeId2}>quiet period</strong> with no activity;</li><li data-v-311680d0${_scopeId2}>a <code data-v-311680d0${_scopeId2}>fromBookingDateTime</code> set <strong data-v-311680d0${_scopeId2}>in the future</strong> or later than any booked transaction — coherent, it simply matches nothing.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createTextVNode("a range reaching "),
                      createVNode("strong", null, "beyond two years"),
                      createTextVNode(" into the past — the LFI returns the records it holds, and "),
                      createVNode("strong", null, "MAY"),
                      createTextVNode(" return records older than two years where it has them;")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("a "),
                      createVNode("strong", null, "quiet period"),
                      createTextVNode(" with no activity;")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("a "),
                      createVNode("code", null, "fromBookingDateTime"),
                      createTextVNode(" set "),
                      createVNode("strong", null, "in the future"),
                      createTextVNode(" or later than any booked transaction — coherent, it simply matches nothing.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` In each of these cases the response is <code data-v-311680d0${_scopeId2}>200</code> with the matching subset in <code data-v-311680d0${_scopeId2}>data</code> — an empty array where nothing matches. A <code data-v-311680d0${_scopeId2}>404</code><strong data-v-311680d0${_scopeId2}>MUST NOT</strong> be used to signal &quot;no transactions in range&quot;. `);
                } else {
                  return [
                    createTextVNode(" In each of these cases the response is "),
                    createVNode("code", null, "200"),
                    createTextVNode(" with the matching subset in "),
                    createVNode("code", null, "data"),
                    createTextVNode(" — an empty array where nothing matches. A "),
                    createVNode("code", null, "404"),
                    createVNode("strong", null, "MUST NOT"),
                    createTextVNode(' be used to signal "no transactions in range". ')
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: emptyResponse,
              lang: "http",
              filename: "200 — a valid empty result"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Both parameters are optional. They narrow the result to transactions booked "),
                  createVNode("strong", null, "on or after"),
                  createTextVNode(),
                  createVNode("code", null, "fromBookingDateTime"),
                  createTextVNode(" and "),
                  createVNode("strong", null, "on or before"),
                  createTextVNode(),
                  createVNode("code", null, "toBookingDateTime"),
                  createTextVNode("; omit either bound for an open-ended range. A well-formed range is always accepted — "),
                  createVNode("strong", null, "even when it matches nothing"),
                  createTextVNode(". In particular, the following are valid requests, not errors: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createTextVNode("a range reaching "),
                    createVNode("strong", null, "beyond two years"),
                    createTextVNode(" into the past — the LFI returns the records it holds, and "),
                    createVNode("strong", null, "MAY"),
                    createTextVNode(" return records older than two years where it has them;")
                  ]),
                  createVNode("li", null, [
                    createTextVNode("a "),
                    createVNode("strong", null, "quiet period"),
                    createTextVNode(" with no activity;")
                  ]),
                  createVNode("li", null, [
                    createTextVNode("a "),
                    createVNode("code", null, "fromBookingDateTime"),
                    createTextVNode(" set "),
                    createVNode("strong", null, "in the future"),
                    createTextVNode(" or later than any booked transaction — coherent, it simply matches nothing.")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" In each of these cases the response is "),
                  createVNode("code", null, "200"),
                  createTextVNode(" with the matching subset in "),
                  createVNode("code", null, "data"),
                  createTextVNode(" — an empty array where nothing matches. A "),
                  createVNode("code", null, "404"),
                  createVNode("strong", null, "MUST NOT"),
                  createTextVNode(' be used to signal "no transactions in range". ')
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: emptyResponse,
                lang: "http",
                filename: "200 — a valid empty result"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "rejected",
        num: "02",
        color: "var(--at-blue)",
        eyebrow: "Rejected",
        title: "Three cases the API Hub rejects",
        tone: "surface",
        narrow: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The <strong data-v-311680d0${_scopeId2}>API Hub</strong> validates the date range before proxying the request to the LFI. It returns <code data-v-311680d0${_scopeId2}>400</code> with <code data-v-311680d0${_scopeId2}>Resource.InvalidFormat</code> in three cases: `);
                } else {
                  return [
                    createTextVNode(" The "),
                    createVNode("strong", null, "API Hub"),
                    createTextVNode(" validates the date range before proxying the request to the LFI. It returns "),
                    createVNode("code", null, "400"),
                    createTextVNode(" with "),
                    createVNode("code", null, "Resource.InvalidFormat"),
                    createTextVNode(" in three cases: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-311680d0${_scopeId2}>a date-time parameter <strong data-v-311680d0${_scopeId2}>cannot be parsed</strong>;</li><li data-v-311680d0${_scopeId2}>the range is <strong data-v-311680d0${_scopeId2}>contradictory</strong> — <code data-v-311680d0${_scopeId2}>fromBookingDateTime</code> is after <code data-v-311680d0${_scopeId2}>toBookingDateTime</code>;</li><li data-v-311680d0${_scopeId2}><code data-v-311680d0${_scopeId2}>toBookingDateTime</code> is <strong data-v-311680d0${_scopeId2}>in the future</strong> — an upper bound on when a transaction was booked cannot lie past the current moment.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createTextVNode("a date-time parameter "),
                      createVNode("strong", null, "cannot be parsed"),
                      createTextVNode(";")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("the range is "),
                      createVNode("strong", null, "contradictory"),
                      createTextVNode(" — "),
                      createVNode("code", null, "fromBookingDateTime"),
                      createTextVNode(" is after "),
                      createVNode("code", null, "toBookingDateTime"),
                      createTextVNode(";")
                    ]),
                    createVNode("li", null, [
                      createVNode("code", null, "toBookingDateTime"),
                      createTextVNode(" is "),
                      createVNode("strong", null, "in the future"),
                      createTextVNode(" — an upper bound on when a transaction was booked cannot lie past the current moment.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: rejectedResponse,
              lang: "http",
              filename: "A rejected date-range request"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Note the asymmetry: only the <strong data-v-311680d0${_scopeId2}>upper</strong> bound is checked against the clock. A future <code data-v-311680d0${_scopeId2}>fromBookingDateTime</code> is coherent — it just matches nothing — so it is accepted and returns <code data-v-311680d0${_scopeId2}>200</code>. The identical three checks apply to <code data-v-311680d0${_scopeId2}>fromStatementDate</code> / <code data-v-311680d0${_scopeId2}>toStatementDate</code> on the statements endpoint. `);
                } else {
                  return [
                    createTextVNode(" Note the asymmetry: only the "),
                    createVNode("strong", null, "upper"),
                    createTextVNode(" bound is checked against the clock. A future "),
                    createVNode("code", null, "fromBookingDateTime"),
                    createTextVNode(" is coherent — it just matches nothing — so it is accepted and returns "),
                    createVNode("code", null, "200"),
                    createTextVNode(". The identical three checks apply to "),
                    createVNode("code", null, "fromStatementDate"),
                    createTextVNode(" / "),
                    createVNode("code", null, "toStatementDate"),
                    createTextVNode(" on the statements endpoint. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The "),
                  createVNode("strong", null, "API Hub"),
                  createTextVNode(" validates the date range before proxying the request to the LFI. It returns "),
                  createVNode("code", null, "400"),
                  createTextVNode(" with "),
                  createVNode("code", null, "Resource.InvalidFormat"),
                  createTextVNode(" in three cases: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createTextVNode("a date-time parameter "),
                    createVNode("strong", null, "cannot be parsed"),
                    createTextVNode(";")
                  ]),
                  createVNode("li", null, [
                    createTextVNode("the range is "),
                    createVNode("strong", null, "contradictory"),
                    createTextVNode(" — "),
                    createVNode("code", null, "fromBookingDateTime"),
                    createTextVNode(" is after "),
                    createVNode("code", null, "toBookingDateTime"),
                    createTextVNode(";")
                  ]),
                  createVNode("li", null, [
                    createVNode("code", null, "toBookingDateTime"),
                    createTextVNode(" is "),
                    createVNode("strong", null, "in the future"),
                    createTextVNode(" — an upper bound on when a transaction was booked cannot lie past the current moment.")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: rejectedResponse,
                lang: "http",
                filename: "A rejected date-range request"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Note the asymmetry: only the "),
                  createVNode("strong", null, "upper"),
                  createTextVNode(" bound is checked against the clock. A future "),
                  createVNode("code", null, "fromBookingDateTime"),
                  createTextVNode(" is coherent — it just matches nothing — so it is accepted and returns "),
                  createVNode("code", null, "200"),
                  createTextVNode(". The identical three checks apply to "),
                  createVNode("code", null, "fromStatementDate"),
                  createTextVNode(" / "),
                  createVNode("code", null, "toStatementDate"),
                  createTextVNode(" on the statements endpoint. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "lfi",
        num: "03",
        color: "var(--at-gold)",
        eyebrow: "What the LFI does",
        title: "What your Ozone Connect implementation must do",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Because the API Hub catches all three malformed cases, your Ozone Connect endpoints receive only parseable, non-contradictory ranges whose upper bound is not in the future. There is nothing to re-validate — the LFI&#39;s job is simply to filter and return: `);
                } else {
                  return [
                    createTextVNode(" Because the API Hub catches all three malformed cases, your Ozone Connect endpoints receive only parseable, non-contradictory ranges whose upper bound is not in the future. There is nothing to re-validate — the LFI's job is simply to filter and return: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-311680d0${_scopeId2}><strong data-v-311680d0${_scopeId2}>Filter</strong> to transactions whose booking date-time falls within the supplied bounds, then apply pagination — so <code data-v-311680d0${_scopeId2}>meta.totalRecords</code> and <code data-v-311680d0${_scopeId2}>meta.totalPages</code> describe the filtered set.</li><li data-v-311680d0${_scopeId2}><strong data-v-311680d0${_scopeId2}>Ignore any timezone offset</strong> on the supplied values — compare the wall-clock date-time as given.</li><li data-v-311680d0${_scopeId2}>Make <strong data-v-311680d0${_scopeId2}>at least two years</strong> of history available; you <strong data-v-311680d0${_scopeId2}>MAY</strong> hold and return more. The two-year figure is a minimum availability floor, not a query limit.</li><li data-v-311680d0${_scopeId2}>Return <code data-v-311680d0${_scopeId2}>200</code> with the matching subset — an <strong data-v-311680d0${_scopeId2}>empty <code data-v-311680d0${_scopeId2}>data</code> array</strong> where nothing matches. Never <code data-v-311680d0${_scopeId2}>404</code>.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Filter"),
                      createTextVNode(" to transactions whose booking date-time falls within the supplied bounds, then apply pagination — so "),
                      createVNode("code", null, "meta.totalRecords"),
                      createTextVNode(" and "),
                      createVNode("code", null, "meta.totalPages"),
                      createTextVNode(" describe the filtered set.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Ignore any timezone offset"),
                      createTextVNode(" on the supplied values — compare the wall-clock date-time as given.")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("Make "),
                      createVNode("strong", null, "at least two years"),
                      createTextVNode(" of history available; you "),
                      createVNode("strong", null, "MAY"),
                      createTextVNode(" hold and return more. The two-year figure is a minimum availability floor, not a query limit.")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("Return "),
                      createVNode("code", null, "200"),
                      createTextVNode(" with the matching subset — an "),
                      createVNode("strong", null, [
                        createTextVNode("empty "),
                        createVNode("code", null, "data"),
                        createTextVNode(" array")
                      ]),
                      createTextVNode(" where nothing matches. Never "),
                      createVNode("code", null, "404"),
                      createTextVNode(".")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: exampleRequest,
              lang: "http",
              filename: "A bounded request from the API Hub"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "info",
              title: "An empty result is not a completeness signal"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-311680d0${_scopeId2}> A <code data-v-311680d0${_scopeId2}>200</code> with an empty <code data-v-311680d0${_scopeId2}>data</code> array means &quot;no records matched&quot; — it does <strong data-v-311680d0${_scopeId2}>not</strong> assert the customer had no activity. For any period beyond the two-year guarantee, an empty or partial result may simply reflect what the LFI retains. TPPs are told not to infer absence of activity past that window. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" A "),
                      createVNode("code", null, "200"),
                      createTextVNode(" with an empty "),
                      createVNode("code", null, "data"),
                      createTextVNode(' array means "no records matched" — it does '),
                      createVNode("strong", null, "not"),
                      createTextVNode(" assert the customer had no activity. For any period beyond the two-year guarantee, an empty or partial result may simply reflect what the LFI retains. TPPs are told not to infer absence of activity past that window. ")
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
                  createTextVNode(" Because the API Hub catches all three malformed cases, your Ozone Connect endpoints receive only parseable, non-contradictory ranges whose upper bound is not in the future. There is nothing to re-validate — the LFI's job is simply to filter and return: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Filter"),
                    createTextVNode(" to transactions whose booking date-time falls within the supplied bounds, then apply pagination — so "),
                    createVNode("code", null, "meta.totalRecords"),
                    createTextVNode(" and "),
                    createVNode("code", null, "meta.totalPages"),
                    createTextVNode(" describe the filtered set.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Ignore any timezone offset"),
                    createTextVNode(" on the supplied values — compare the wall-clock date-time as given.")
                  ]),
                  createVNode("li", null, [
                    createTextVNode("Make "),
                    createVNode("strong", null, "at least two years"),
                    createTextVNode(" of history available; you "),
                    createVNode("strong", null, "MAY"),
                    createTextVNode(" hold and return more. The two-year figure is a minimum availability floor, not a query limit.")
                  ]),
                  createVNode("li", null, [
                    createTextVNode("Return "),
                    createVNode("code", null, "200"),
                    createTextVNode(" with the matching subset — an "),
                    createVNode("strong", null, [
                      createTextVNode("empty "),
                      createVNode("code", null, "data"),
                      createTextVNode(" array")
                    ]),
                    createTextVNode(" where nothing matches. Never "),
                    createVNode("code", null, "404"),
                    createTextVNode(".")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: exampleRequest,
                lang: "http",
                filename: "A bounded request from the API Hub"
              }),
              createVNode(_component_EdNote, {
                type: "info",
                title: "An empty result is not a completeness signal"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" A "),
                    createVNode("code", null, "200"),
                    createTextVNode(" with an empty "),
                    createVNode("code", null, "data"),
                    createTextVNode(' array means "no records matched" — it does '),
                    createVNode("strong", null, "not"),
                    createTextVNode(" assert the customer had no activity. For any period beyond the two-year guarantee, an empty or partial result may simply reflect what the LFI retains. TPPs are told not to infer absence of activity past that window. ")
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
        eyebrow: "Related articles",
        title: "Read alongside"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdRelatedCard, {
              href: "/knowledge-base/articles/pagination",
              category: "Integration",
              "category-color": "var(--at-blue-deep)",
              title: "Pagination — LFI meta to TPP Links",
              desc: "How the filtered result set is paged from Ozone Connect through the API Hub."
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRelatedCard, {
              href: "/knowledge-base/articles/request-headers",
              category: "Security",
              "category-color": "var(--at-blue)",
              title: "FAPI Request Headers",
              desc: "What x-fapi-interaction-id and the other FAPI headers are for."
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdRelatedCard, {
                href: "/knowledge-base/articles/pagination",
                category: "Integration",
                "category-color": "var(--at-blue-deep)",
                title: "Pagination — LFI meta to TPP Links",
                desc: "How the filtered result set is paged from Ozone Connect through the API Hub."
              }),
              createVNode(_component_EdRelatedCard, {
                href: "/knowledge-base/articles/request-headers",
                category: "Security",
                "category-color": "var(--at-blue)",
                title: "FAPI Request Headers",
                desc: "What x-fapi-interaction-id and the other FAPI headers are for."
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/knowledge-base/articles/transaction-date-filters.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const transactionDateFilters = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-311680d0"]]);
export {
  transactionDateFilters as default
};
