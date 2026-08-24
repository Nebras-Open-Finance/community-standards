import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { I as ImageViewer } from "./ImageViewer-DmHTopUf.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_EdSectionBand = __unplugin_components_3;
  const _component_EdProse = __unplugin_components_4;
  const _component_EdRefTable = __unplugin_components_12;
  const _component_ImageViewer = ImageViewer;
  const _component_EdBullets = __unplugin_components_5;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-c8f5b810><section class="ed-doc__hero" data-v-c8f5b810><div class="ed-doc__inner" data-v-c8f5b810><div class="ed-doc__eyebrow" data-v-c8f5b810><span class="ed-doc__eyebrow-dash" data-v-c8f5b810></span> LFI · API Hub · Admin Portal · Reports </div><h1 class="ed-doc__title" data-v-c8f5b810> Reports <span class="ed-doc__read" data-v-c8f5b810>2 min read</span></h1><p class="ed-doc__lede" data-v-c8f5b810> The Admin Portal provides a set of operational reports covering API performance, error rates, call volumes, payment activity, and consent statistics. All reports can be filtered by date range, sorted by any column, and exported to <strong data-v-c8f5b810>CSV</strong> for further analysis. </p></div></section>`);
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "performance",
    num: "01",
    color: "var(--at-teal)",
    eyebrow: "Performance",
    title: "Response time metrics across all endpoints",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` The performance report aggregates API request data and provides response time metrics across all endpoints. `);
            } else {
              return [
                createTextVNode(" The performance report aggregates API request data and provides response time metrics across all endpoints. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`Each row includes:`);
            } else {
              return [
                createTextVNode("Each row includes:")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdRefTable, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<table data-v-c8f5b810${_scopeId2}><thead data-v-c8f5b810${_scopeId2}><tr data-v-c8f5b810${_scopeId2}><th data-v-c8f5b810${_scopeId2}>Column</th><th data-v-c8f5b810${_scopeId2}>Description</th></tr></thead><tbody data-v-c8f5b810${_scopeId2}><tr data-v-c8f5b810${_scopeId2}><td data-v-c8f5b810${_scopeId2}><strong data-v-c8f5b810${_scopeId2}>LFI Name</strong></td><td data-v-c8f5b810${_scopeId2}>Your organisation name (always your LFI for your portal)</td></tr><tr data-v-c8f5b810${_scopeId2}><td data-v-c8f5b810${_scopeId2}><strong data-v-c8f5b810${_scopeId2}>TPP Name</strong></td><td data-v-c8f5b810${_scopeId2}>The TPP that made the request — blank for requests that do not involve a TPP (e.g. LFI-to-Hub calls)</td></tr><tr data-v-c8f5b810${_scopeId2}><td data-v-c8f5b810${_scopeId2}><strong data-v-c8f5b810${_scopeId2}>Date</strong></td><td data-v-c8f5b810${_scopeId2}>The date of the aggregated data</td></tr><tr data-v-c8f5b810${_scopeId2}><td data-v-c8f5b810${_scopeId2}><strong data-v-c8f5b810${_scopeId2}>Endpoint</strong></td><td data-v-c8f5b810${_scopeId2}>The API endpoint called (e.g. accounts, balances, beneficiaries, payments)</td></tr><tr data-v-c8f5b810${_scopeId2}><td data-v-c8f5b810${_scopeId2}><strong data-v-c8f5b810${_scopeId2}>Response Code</strong></td><td data-v-c8f5b810${_scopeId2}>The HTTP response status code</td></tr><tr data-v-c8f5b810${_scopeId2}><td data-v-c8f5b810${_scopeId2}><strong data-v-c8f5b810${_scopeId2}>Max Response Time (ms)</strong></td><td data-v-c8f5b810${_scopeId2}>The slowest response time for the endpoint in the period</td></tr><tr data-v-c8f5b810${_scopeId2}><td data-v-c8f5b810${_scopeId2}><strong data-v-c8f5b810${_scopeId2}>Min Response Time (ms)</strong></td><td data-v-c8f5b810${_scopeId2}>The fastest response time for the endpoint in the period</td></tr><tr data-v-c8f5b810${_scopeId2}><td data-v-c8f5b810${_scopeId2}><strong data-v-c8f5b810${_scopeId2}>Average Response Time (ms)</strong></td><td data-v-c8f5b810${_scopeId2}>The mean response time across all calls to the endpoint in the period</td></tr><tr data-v-c8f5b810${_scopeId2}><td data-v-c8f5b810${_scopeId2}><strong data-v-c8f5b810${_scopeId2}>Number of Calls</strong></td><td data-v-c8f5b810${_scopeId2}>Total number of requests to the endpoint in the period</td></tr></tbody></table>`);
            } else {
              return [
                createVNode("table", null, [
                  createVNode("thead", null, [
                    createVNode("tr", null, [
                      createVNode("th", null, "Column"),
                      createVNode("th", null, "Description")
                    ])
                  ]),
                  createVNode("tbody", null, [
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("strong", null, "LFI Name")
                      ]),
                      createVNode("td", null, "Your organisation name (always your LFI for your portal)")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("strong", null, "TPP Name")
                      ]),
                      createVNode("td", null, "The TPP that made the request — blank for requests that do not involve a TPP (e.g. LFI-to-Hub calls)")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("strong", null, "Date")
                      ]),
                      createVNode("td", null, "The date of the aggregated data")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("strong", null, "Endpoint")
                      ]),
                      createVNode("td", null, "The API endpoint called (e.g. accounts, balances, beneficiaries, payments)")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("strong", null, "Response Code")
                      ]),
                      createVNode("td", null, "The HTTP response status code")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("strong", null, "Max Response Time (ms)")
                      ]),
                      createVNode("td", null, "The slowest response time for the endpoint in the period")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("strong", null, "Min Response Time (ms)")
                      ]),
                      createVNode("td", null, "The fastest response time for the endpoint in the period")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("strong", null, "Average Response Time (ms)")
                      ]),
                      createVNode("td", null, "The mean response time across all calls to the endpoint in the period")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("strong", null, "Number of Calls")
                      ]),
                      createVNode("td", null, "Total number of requests to the endpoint in the period")
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
              _push3(` Response times represent the <strong data-v-c8f5b810${_scopeId2}>end-to-end request duration</strong> as observed by the API Hub — from receiving the inbound request to returning the response. This includes the LFI&#39;s response time. `);
            } else {
              return [
                createTextVNode(" Response times represent the "),
                createVNode("strong", null, "end-to-end request duration"),
                createTextVNode(" as observed by the API Hub — from receiving the inbound request to returning the response. This includes the LFI's response time. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_ImageViewer, {
          src: "/images/ozone/admin-portal/logs-reports/OFP-performance.png",
          alt: "Performance report showing a table of endpoints with response time metrics, filtered by date range"
        }, null, _parent2, _scopeId));
        _push2(`<h3 data-v-c8f5b810${_scopeId}>LFI performance</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` A separate <strong data-v-c8f5b810${_scopeId2}>LFI Performance</strong> report isolates your response times by removing API Hub processing latency. This report shows only the time between the API Hub forwarding the request to your Ozone Connect endpoint and receiving your response — giving you a clear view of your own system&#39;s performance. `);
            } else {
              return [
                createTextVNode(" A separate "),
                createVNode("strong", null, "LFI Performance"),
                createTextVNode(" report isolates your response times by removing API Hub processing latency. This report shows only the time between the API Hub forwarding the request to your Ozone Connect endpoint and receiving your response — giving you a clear view of your own system's performance. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_ImageViewer, {
          src: "/images/ozone/admin-portal/logs-reports/LFI-performance.png",
          alt: "LFI Performance report showing isolated LFI response times per endpoint"
        }, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" The performance report aggregates API request data and provides response time metrics across all endpoints. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode("Each row includes:")
            ]),
            _: 1
          }),
          createVNode(_component_EdRefTable, null, {
            default: withCtx(() => [
              createVNode("table", null, [
                createVNode("thead", null, [
                  createVNode("tr", null, [
                    createVNode("th", null, "Column"),
                    createVNode("th", null, "Description")
                  ])
                ]),
                createVNode("tbody", null, [
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("strong", null, "LFI Name")
                    ]),
                    createVNode("td", null, "Your organisation name (always your LFI for your portal)")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("strong", null, "TPP Name")
                    ]),
                    createVNode("td", null, "The TPP that made the request — blank for requests that do not involve a TPP (e.g. LFI-to-Hub calls)")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("strong", null, "Date")
                    ]),
                    createVNode("td", null, "The date of the aggregated data")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("strong", null, "Endpoint")
                    ]),
                    createVNode("td", null, "The API endpoint called (e.g. accounts, balances, beneficiaries, payments)")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("strong", null, "Response Code")
                    ]),
                    createVNode("td", null, "The HTTP response status code")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("strong", null, "Max Response Time (ms)")
                    ]),
                    createVNode("td", null, "The slowest response time for the endpoint in the period")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("strong", null, "Min Response Time (ms)")
                    ]),
                    createVNode("td", null, "The fastest response time for the endpoint in the period")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("strong", null, "Average Response Time (ms)")
                    ]),
                    createVNode("td", null, "The mean response time across all calls to the endpoint in the period")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("strong", null, "Number of Calls")
                    ]),
                    createVNode("td", null, "Total number of requests to the endpoint in the period")
                  ])
                ])
              ])
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Response times represent the "),
              createVNode("strong", null, "end-to-end request duration"),
              createTextVNode(" as observed by the API Hub — from receiving the inbound request to returning the response. This includes the LFI's response time. ")
            ]),
            _: 1
          }),
          createVNode(_component_ImageViewer, {
            src: "/images/ozone/admin-portal/logs-reports/OFP-performance.png",
            alt: "Performance report showing a table of endpoints with response time metrics, filtered by date range"
          }),
          createVNode("h3", null, "LFI performance"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" A separate "),
              createVNode("strong", null, "LFI Performance"),
              createTextVNode(" report isolates your response times by removing API Hub processing latency. This report shows only the time between the API Hub forwarding the request to your Ozone Connect endpoint and receiving your response — giving you a clear view of your own system's performance. ")
            ]),
            _: 1
          }),
          createVNode(_component_ImageViewer, {
            src: "/images/ozone/admin-portal/logs-reports/LFI-performance.png",
            alt: "LFI Performance report showing isolated LFI response times per endpoint"
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "error-rates",
    num: "02",
    color: "var(--at-gold)",
    eyebrow: "API error rates",
    title: "Failed requests by endpoint, TPP, and error code",
    tone: "surface"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` The error rates report provides a breakdown of failed requests by endpoint, TPP, and error code. Use this to identify: `);
            } else {
              return [
                createTextVNode(" The error rates report provides a breakdown of failed requests by endpoint, TPP, and error code. Use this to identify: ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-c8f5b810${_scopeId2}>Endpoints with elevated error rates</li><li data-v-c8f5b810${_scopeId2}>TPPs that are consistently sending malformed requests</li><li data-v-c8f5b810${_scopeId2}>Trends in error volumes over time</li>`);
            } else {
              return [
                createVNode("li", null, "Endpoints with elevated error rates"),
                createVNode("li", null, "TPPs that are consistently sending malformed requests"),
                createVNode("li", null, "Trends in error volumes over time")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_ImageViewer, {
          src: "/images/ozone/admin-portal/logs-reports/API-error-rates.png",
          alt: "API Error Rates report showing error breakdown by endpoint and response code"
        }, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" The error rates report provides a breakdown of failed requests by endpoint, TPP, and error code. Use this to identify: ")
            ]),
            _: 1
          }),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, "Endpoints with elevated error rates"),
              createVNode("li", null, "TPPs that are consistently sending malformed requests"),
              createVNode("li", null, "Trends in error volumes over time")
            ]),
            _: 1
          }),
          createVNode(_component_ImageViewer, {
            src: "/images/ozone/admin-portal/logs-reports/API-error-rates.png",
            alt: "API Error Rates report showing error breakdown by endpoint and response code"
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "call-volumes",
    num: "03",
    color: "var(--at-blue-deep, #1d4ed8)",
    eyebrow: "API call volumes",
    title: "Total request counts by endpoint and TPP",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` The call volumes report shows the total number of API requests over a given period, broken down by endpoint and TPP. This is useful for understanding traffic patterns and capacity usage. `);
            } else {
              return [
                createTextVNode(" The call volumes report shows the total number of API requests over a given period, broken down by endpoint and TPP. This is useful for understanding traffic patterns and capacity usage. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_ImageViewer, {
          src: "/images/ozone/admin-portal/logs-reports/API-call-volume.png",
          alt: "API Call Volumes report showing request counts by endpoint and TPP"
        }, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" The call volumes report shows the total number of API requests over a given period, broken down by endpoint and TPP. This is useful for understanding traffic patterns and capacity usage. ")
            ]),
            _: 1
          }),
          createVNode(_component_ImageViewer, {
            src: "/images/ozone/admin-portal/logs-reports/API-call-volume.png",
            alt: "API Call Volumes report showing request counts by endpoint and TPP"
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "payment-reports",
    num: "04",
    color: "var(--at-navy)",
    eyebrow: "Payment reports",
    title: "Payment values and volumes by type and TPP",
    tone: "surface"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<h3 data-v-c8f5b810${_scopeId}>Payment values</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` The payment values report shows the monetary value of payments processed through the API Hub, broken down by payment type, TPP, and time period. `);
            } else {
              return [
                createTextVNode(" The payment values report shows the monetary value of payments processed through the API Hub, broken down by payment type, TPP, and time period. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_ImageViewer, {
          src: "/images/ozone/admin-portal/logs-reports/Payment-values.png",
          alt: "Payment Values report showing total payment amounts by TPP and payment type"
        }, null, _parent2, _scopeId));
        _push2(`<h3 data-v-c8f5b810${_scopeId}>Payment volumes</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` The payment volumes report shows the number of payment transactions processed, broken down by payment type, TPP, status, and time period. `);
            } else {
              return [
                createTextVNode(" The payment volumes report shows the number of payment transactions processed, broken down by payment type, TPP, status, and time period. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode("h3", null, "Payment values"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" The payment values report shows the monetary value of payments processed through the API Hub, broken down by payment type, TPP, and time period. ")
            ]),
            _: 1
          }),
          createVNode(_component_ImageViewer, {
            src: "/images/ozone/admin-portal/logs-reports/Payment-values.png",
            alt: "Payment Values report showing total payment amounts by TPP and payment type"
          }),
          createVNode("h3", null, "Payment volumes"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" The payment volumes report shows the number of payment transactions processed, broken down by payment type, TPP, status, and time period. ")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "consent-statistics",
    num: "05",
    color: "var(--at-teal-deep)",
    eyebrow: "Consent statistics",
    title: "Consents created, authorised, expired, revoked, consumed",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` The consent statistics report provides an overview of consent activity — including consents created, authorised, expired, revoked, and consumed — broken down by consent type, TPP, and time period. `);
            } else {
              return [
                createTextVNode(" The consent statistics report provides an overview of consent activity — including consents created, authorised, expired, revoked, and consumed — broken down by consent type, TPP, and time period. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_ImageViewer, {
          src: "/images/ozone/admin-portal/logs-reports/Consent-statistics.png",
          alt: "Consent Statistics report showing consent status breakdown by type and TPP"
        }, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" The consent statistics report provides an overview of consent activity — including consents created, authorised, expired, revoked, and consumed — broken down by consent type, TPP, and time period. ")
            ]),
            _: 1
          }),
          createVNode(_component_ImageViewer, {
            src: "/images/ozone/admin-portal/logs-reports/Consent-statistics.png",
            alt: "Consent Statistics report showing consent status breakdown by type and TPP"
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "working-with-reports",
    num: "06",
    color: "var(--at-gold)",
    eyebrow: "Working with reports",
    title: "Common controls and CSV export",
    tone: "surface"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`All reports share common controls:`);
            } else {
              return [
                createTextVNode("All reports share common controls:")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-c8f5b810${_scopeId2}><strong data-v-c8f5b810${_scopeId2}>Date range filter</strong> — adjust the reporting period using the date picker</li><li data-v-c8f5b810${_scopeId2}><strong data-v-c8f5b810${_scopeId2}>Column sorting</strong> — click any column header to sort ascending or descending</li><li data-v-c8f5b810${_scopeId2}><strong data-v-c8f5b810${_scopeId2}>Column filters</strong> — filter rows by specific values (e.g. a specific TPP, endpoint, or response code)</li><li data-v-c8f5b810${_scopeId2}><strong data-v-c8f5b810${_scopeId2}>Export</strong> — download the current report view as a <strong data-v-c8f5b810${_scopeId2}>CSV</strong> file for offline analysis in Excel or other tools</li>`);
            } else {
              return [
                createVNode("li", null, [
                  createVNode("strong", null, "Date range filter"),
                  createTextVNode(" — adjust the reporting period using the date picker")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "Column sorting"),
                  createTextVNode(" — click any column header to sort ascending or descending")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "Column filters"),
                  createTextVNode(" — filter rows by specific values (e.g. a specific TPP, endpoint, or response code)")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "Export"),
                  createTextVNode(" — download the current report view as a "),
                  createVNode("strong", null, "CSV"),
                  createTextVNode(" file for offline analysis in Excel or other tools")
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
              createTextVNode("All reports share common controls:")
            ]),
            _: 1
          }),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, [
                createVNode("strong", null, "Date range filter"),
                createTextVNode(" — adjust the reporting period using the date picker")
              ]),
              createVNode("li", null, [
                createVNode("strong", null, "Column sorting"),
                createTextVNode(" — click any column header to sort ascending or descending")
              ]),
              createVNode("li", null, [
                createVNode("strong", null, "Column filters"),
                createTextVNode(" — filter rows by specific values (e.g. a specific TPP, endpoint, or response code)")
              ]),
              createVNode("li", null, [
                createVNode("strong", null, "Export"),
                createTextVNode(" — download the current report view as a "),
                createVNode("strong", null, "CSV"),
                createTextVNode(" file for offline analysis in Excel or other tools")
              ])
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div>`);
}
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/v2.2-rc1/api-hub/admin-portal/reports.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const reports = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-c8f5b810"]]);
export {
  reports as default
};
