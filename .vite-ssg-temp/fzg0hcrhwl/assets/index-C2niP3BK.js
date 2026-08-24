import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
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
  const _component_EdNote = __unplugin_components_7;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-253d0d94><section class="ed-doc__hero" data-v-253d0d94><div class="ed-doc__inner" data-v-253d0d94><div class="ed-doc__eyebrow" data-v-253d0d94><span class="ed-doc__eyebrow-dash" data-v-253d0d94></span> LFI · Insurance · Quotation </div><h1 class="ed-doc__title" data-v-253d0d94> Insurance Quotation — API Guide <span class="ed-doc__read" data-v-253d0d94>6 min read</span></h1><p class="ed-doc__lede" data-v-253d0d94> How your Ozone Connect server receives quote requests, accepts them, issues policies, and emits status events through the Hub. Unlike Insurance Data Sharing there is no consent journey — the TPP authenticates with Client Credentials. The flow forks into two modes on accept: <strong data-v-253d0d94>LFI-Led</strong> (your LFI hosts the customer through completion) and <strong data-v-253d0d94>TPP-Led</strong> (the TPP collects KYC and surfaces an LFI-hosted payment URL). </p></div></section>`);
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "positioning",
    num: "01",
    color: "var(--at-teal)",
    eyebrow: "Endpoints you implement",
    title: "Four endpoints per sector you underwrite",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` For each insurance sector your LFI underwrites, expose four endpoints on Ozone Connect: `);
            } else {
              return [
                createTextVNode(" For each insurance sector your LFI underwrites, expose four endpoints on Ozone Connect: ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdRefTable, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<table data-v-253d0d94${_scopeId2}><thead data-v-253d0d94${_scopeId2}><tr data-v-253d0d94${_scopeId2}><th data-v-253d0d94${_scopeId2}>Endpoint</th><th data-v-253d0d94${_scopeId2}>Purpose</th></tr></thead><tbody data-v-253d0d94${_scopeId2}><tr data-v-253d0d94${_scopeId2}><td data-v-253d0d94${_scopeId2}><span class="endpoint" data-v-253d0d94${_scopeId2}><span class="http-method http-method--post" data-v-253d0d94${_scopeId2}>POST</span><code data-v-253d0d94${_scopeId2}>/{type}-insurance-quotes</code></span></td><td data-v-253d0d94${_scopeId2}>Underwrite the request and return one or more quotes (or <code data-v-253d0d94${_scopeId2}>204</code> to decline).</td></tr><tr data-v-253d0d94${_scopeId2}><td data-v-253d0d94${_scopeId2}><span class="endpoint" data-v-253d0d94${_scopeId2}><span class="http-method http-method--get" data-v-253d0d94${_scopeId2}>GET</span><code data-v-253d0d94${_scopeId2}>/{type}-insurance-quotes/{QuoteId}</code></span></td><td data-v-253d0d94${_scopeId2}>Return the current state of a quote — used by TPPs polling between events.</td></tr><tr data-v-253d0d94${_scopeId2}><td data-v-253d0d94${_scopeId2}><span class="endpoint" data-v-253d0d94${_scopeId2}><span class="http-method http-method--patch" data-v-253d0d94${_scopeId2}>PATCH</span><code data-v-253d0d94${_scopeId2}>/{type}-insurance-quotes/{QuoteId}</code></span></td><td data-v-253d0d94${_scopeId2}>Accept the quote (declaring <code data-v-253d0d94${_scopeId2}>PolicyIssuanceAllowed</code>) and, in TPP-Led mode, receive KYC submissions.</td></tr><tr data-v-253d0d94${_scopeId2}><td data-v-253d0d94${_scopeId2}><span class="endpoint" data-v-253d0d94${_scopeId2}><span class="http-method http-method--post" data-v-253d0d94${_scopeId2}>POST</span><code data-v-253d0d94${_scopeId2}>/{type}-insurance-policies</code></span></td><td data-v-253d0d94${_scopeId2}>Issue the policy from the accepted quote.</td></tr></tbody></table>`);
            } else {
              return [
                createVNode("table", null, [
                  createVNode("thead", null, [
                    createVNode("tr", null, [
                      createVNode("th", null, "Endpoint"),
                      createVNode("th", null, "Purpose")
                    ])
                  ]),
                  createVNode("tbody", null, [
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("span", { class: "endpoint" }, [
                          createVNode("span", { class: "http-method http-method--post" }, "POST"),
                          createVNode("code", null, "/{type}-insurance-quotes")
                        ])
                      ]),
                      createVNode("td", null, [
                        createTextVNode("Underwrite the request and return one or more quotes (or "),
                        createVNode("code", null, "204"),
                        createTextVNode(" to decline).")
                      ])
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("span", { class: "endpoint" }, [
                          createVNode("span", { class: "http-method http-method--get" }, "GET"),
                          createVNode("code", null, "/{type}-insurance-quotes/{QuoteId}")
                        ])
                      ]),
                      createVNode("td", null, "Return the current state of a quote — used by TPPs polling between events.")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("span", { class: "endpoint" }, [
                          createVNode("span", { class: "http-method http-method--patch" }, "PATCH"),
                          createVNode("code", null, "/{type}-insurance-quotes/{QuoteId}")
                        ])
                      ]),
                      createVNode("td", null, [
                        createTextVNode("Accept the quote (declaring "),
                        createVNode("code", null, "PolicyIssuanceAllowed"),
                        createTextVNode(") and, in TPP-Led mode, receive KYC submissions.")
                      ])
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("span", { class: "endpoint" }, [
                          createVNode("span", { class: "http-method http-method--post" }, "POST"),
                          createVNode("code", null, "/{type}-insurance-policies")
                        ])
                      ]),
                      createVNode("td", null, "Issue the policy from the accepted quote.")
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
              _push3(` Substitute the sector slug (<code data-v-253d0d94${_scopeId2}>employment</code>, <code data-v-253d0d94${_scopeId2}>health</code>, <code data-v-253d0d94${_scopeId2}>home</code>, <code data-v-253d0d94${_scopeId2}>life</code>, <code data-v-253d0d94${_scopeId2}>motor</code>, <code data-v-253d0d94${_scopeId2}>renters</code>, <code data-v-253d0d94${_scopeId2}>travel</code>) for <code data-v-253d0d94${_scopeId2}>{type}</code>. Mount only the sectors your LFI offers — the Hub returns <code data-v-253d0d94${_scopeId2}>404</code> for unmounted sectors. `);
            } else {
              return [
                createTextVNode(" Substitute the sector slug ("),
                createVNode("code", null, "employment"),
                createTextVNode(", "),
                createVNode("code", null, "health"),
                createTextVNode(", "),
                createVNode("code", null, "home"),
                createTextVNode(", "),
                createVNode("code", null, "life"),
                createTextVNode(", "),
                createVNode("code", null, "motor"),
                createTextVNode(", "),
                createVNode("code", null, "renters"),
                createTextVNode(", "),
                createVNode("code", null, "travel"),
                createTextVNode(") for "),
                createVNode("code", null, "{type}"),
                createTextVNode(". Mount only the sectors your LFI offers — the Hub returns "),
                createVNode("code", null, "404"),
                createTextVNode(" for unmounted sectors. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" For each insurance sector your LFI underwrites, expose four endpoints on Ozone Connect: ")
            ]),
            _: 1
          }),
          createVNode(_component_EdRefTable, null, {
            default: withCtx(() => [
              createVNode("table", null, [
                createVNode("thead", null, [
                  createVNode("tr", null, [
                    createVNode("th", null, "Endpoint"),
                    createVNode("th", null, "Purpose")
                  ])
                ]),
                createVNode("tbody", null, [
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("span", { class: "endpoint" }, [
                        createVNode("span", { class: "http-method http-method--post" }, "POST"),
                        createVNode("code", null, "/{type}-insurance-quotes")
                      ])
                    ]),
                    createVNode("td", null, [
                      createTextVNode("Underwrite the request and return one or more quotes (or "),
                      createVNode("code", null, "204"),
                      createTextVNode(" to decline).")
                    ])
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("span", { class: "endpoint" }, [
                        createVNode("span", { class: "http-method http-method--get" }, "GET"),
                        createVNode("code", null, "/{type}-insurance-quotes/{QuoteId}")
                      ])
                    ]),
                    createVNode("td", null, "Return the current state of a quote — used by TPPs polling between events.")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("span", { class: "endpoint" }, [
                        createVNode("span", { class: "http-method http-method--patch" }, "PATCH"),
                        createVNode("code", null, "/{type}-insurance-quotes/{QuoteId}")
                      ])
                    ]),
                    createVNode("td", null, [
                      createTextVNode("Accept the quote (declaring "),
                      createVNode("code", null, "PolicyIssuanceAllowed"),
                      createTextVNode(") and, in TPP-Led mode, receive KYC submissions.")
                    ])
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("span", { class: "endpoint" }, [
                        createVNode("span", { class: "http-method http-method--post" }, "POST"),
                        createVNode("code", null, "/{type}-insurance-policies")
                      ])
                    ]),
                    createVNode("td", null, "Issue the policy from the accepted quote.")
                  ])
                ])
              ])
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Substitute the sector slug ("),
              createVNode("code", null, "employment"),
              createTextVNode(", "),
              createVNode("code", null, "health"),
              createTextVNode(", "),
              createVNode("code", null, "home"),
              createTextVNode(", "),
              createVNode("code", null, "life"),
              createTextVNode(", "),
              createVNode("code", null, "motor"),
              createTextVNode(", "),
              createVNode("code", null, "renters"),
              createTextVNode(", "),
              createVNode("code", null, "travel"),
              createTextVNode(") for "),
              createVNode("code", null, "{type}"),
              createTextVNode(". Mount only the sectors your LFI offers — the Hub returns "),
              createVNode("code", null, "404"),
              createTextVNode(" for unmounted sectors. ")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "quote-log",
    num: "02",
    color: "var(--at-gold, #b08800)",
    eyebrow: "Status emission",
    title: "Drive the lifecycle through the Hub's quote-log",
    tone: "surface"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Every status transition between Accept Quote and the terminal state is announced to the Hub by the LFI via <a href="/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/insurance-quote-log-logId" data-v-253d0d94${_scopeId2}><code data-v-253d0d94${_scopeId2}>PATCH /insurance-quote-log/{logId}</code></a> on the Consent Manager surface. The Hub records the event and, where the TPP subscribed via the <code data-v-253d0d94${_scopeId2}>Subscription</code> object on PATCH Accept Quote, delivers it to the TPP\\&#39;s webhook. `);
            } else {
              return [
                createTextVNode(" Every status transition between Accept Quote and the terminal state is announced to the Hub by the LFI via "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/insurance-quote-log-logId" }, [
                  createVNode("code", null, "PATCH /insurance-quote-log/{logId}")
                ]),
                createTextVNode(" on the Consent Manager surface. The Hub records the event and, where the TPP subscribed via the "),
                createVNode("code", null, "Subscription"),
                createTextVNode(" object on PATCH Accept Quote, delivers it to the TPP\\'s webhook. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<code data-v-253d0d94${_scopeId2}>logId</code> is the same value as the <code data-v-253d0d94${_scopeId2}>QuoteId</code>. Each PATCH carries one of three body schemas drawn from the Hub spec — pending-completion, completed, or terminal. `);
            } else {
              return [
                createVNode("code", null, "logId"),
                createTextVNode(" is the same value as the "),
                createVNode("code", null, "QuoteId"),
                createTextVNode(". Each PATCH carries one of three body schemas drawn from the Hub spec — pending-completion, completed, or terminal. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 class="ed-doc__subhead" data-v-253d0d94${_scopeId}>PATCH-to-event mapping</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Use this table to predict the event a TPP will receive for each PATCH you emit. The Hub forwards verbatim — the body you send is the body the webhook sees. `);
            } else {
              return [
                createTextVNode(" Use this table to predict the event a TPP will receive for each PATCH you emit. The Hub forwards verbatim — the body you send is the body the webhook sees. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdRefTable, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<table data-v-253d0d94${_scopeId2}><thead data-v-253d0d94${_scopeId2}><tr data-v-253d0d94${_scopeId2}><th data-v-253d0d94${_scopeId2}>When you emit</th><th data-v-253d0d94${_scopeId2}>QuoteStatus</th><th data-v-253d0d94${_scopeId2}>Required additional fields</th><th data-v-253d0d94${_scopeId2}>Resulting webhook event</th></tr></thead><tbody data-v-253d0d94${_scopeId2}><tr data-v-253d0d94${_scopeId2}><td data-v-253d0d94${_scopeId2}>Immediately after Accept Quote</td><td data-v-253d0d94${_scopeId2}><code data-v-253d0d94${_scopeId2}>ApplicationPending</code></td><td data-v-253d0d94${_scopeId2}>None</td><td data-v-253d0d94${_scopeId2}>Pending Completion event with <code data-v-253d0d94${_scopeId2}>QuoteStatus: ApplicationPending</code></td></tr><tr data-v-253d0d94${_scopeId2}><td data-v-253d0d94${_scopeId2}>After TPP submits KYC (TPP-Led only)</td><td data-v-253d0d94${_scopeId2}><code data-v-253d0d94${_scopeId2}>ApplicationApproved</code></td><td data-v-253d0d94${_scopeId2}><code data-v-253d0d94${_scopeId2}>BrokerInstructions[].Url</code> — the LFI-hosted payment page</td><td data-v-253d0d94${_scopeId2}>Pending Completion event with <code data-v-253d0d94${_scopeId2}>BrokerInstructions</code></td></tr><tr data-v-253d0d94${_scopeId2}><td data-v-253d0d94${_scopeId2}>Premium adjustment requires re-pay</td><td data-v-253d0d94${_scopeId2}><code data-v-253d0d94${_scopeId2}>PaymentRequired</code></td><td data-v-253d0d94${_scopeId2}><code data-v-253d0d94${_scopeId2}>BrokerInstructions[].Url</code></td><td data-v-253d0d94${_scopeId2}>Pending Completion event with <code data-v-253d0d94${_scopeId2}>BrokerInstructions</code></td></tr><tr data-v-253d0d94${_scopeId2}><td data-v-253d0d94${_scopeId2}>Policy issued (LFI-Led)</td><td data-v-253d0d94${_scopeId2}><code data-v-253d0d94${_scopeId2}>PolicyIssued</code></td><td data-v-253d0d94${_scopeId2}><code data-v-253d0d94${_scopeId2}>InsurancePolicyId</code></td><td data-v-253d0d94${_scopeId2}>Pending Completion event with policy reference</td></tr><tr data-v-253d0d94${_scopeId2}><td data-v-253d0d94${_scopeId2}>Policy issued (TPP-Led)</td><td data-v-253d0d94${_scopeId2}><code data-v-253d0d94${_scopeId2}>PolicyIssued</code></td><td data-v-253d0d94${_scopeId2}><code data-v-253d0d94${_scopeId2}>Documents[]</code> with SHA-256 hashes</td><td data-v-253d0d94${_scopeId2}>Pending Completion event with policy documents</td></tr><tr data-v-253d0d94${_scopeId2}><td data-v-253d0d94${_scopeId2}>Flow complete</td><td data-v-253d0d94${_scopeId2}><code data-v-253d0d94${_scopeId2}>Completed</code></td><td data-v-253d0d94${_scopeId2}><code data-v-253d0d94${_scopeId2}>PolicyTerm</code>, <code data-v-253d0d94${_scopeId2}>Premium</code>, <code data-v-253d0d94${_scopeId2}>CustomerPaidInFull</code>, <code data-v-253d0d94${_scopeId2}>PolicyCountrySubDivision</code>, (optional) <code data-v-253d0d94${_scopeId2}>Commission</code></td><td data-v-253d0d94${_scopeId2}>Completed Status event — final</td></tr><tr data-v-253d0d94${_scopeId2}><td data-v-253d0d94${_scopeId2}>Quote expired</td><td data-v-253d0d94${_scopeId2}><code data-v-253d0d94${_scopeId2}>Expired</code></td><td data-v-253d0d94${_scopeId2}>(optional) <code data-v-253d0d94${_scopeId2}>Reason</code></td><td data-v-253d0d94${_scopeId2}>Terminal Status event — final</td></tr><tr data-v-253d0d94${_scopeId2}><td data-v-253d0d94${_scopeId2}>LFI declines mid-flow</td><td data-v-253d0d94${_scopeId2}><code data-v-253d0d94${_scopeId2}>Rejected</code> / <code data-v-253d0d94${_scopeId2}>LFICancelled</code></td><td data-v-253d0d94${_scopeId2}>(optional) <code data-v-253d0d94${_scopeId2}>Reason</code></td><td data-v-253d0d94${_scopeId2}>Terminal Status event — final</td></tr><tr data-v-253d0d94${_scopeId2}><td data-v-253d0d94${_scopeId2}>Customer abandons</td><td data-v-253d0d94${_scopeId2}><code data-v-253d0d94${_scopeId2}>CustomerCancelled</code></td><td data-v-253d0d94${_scopeId2}>(optional) <code data-v-253d0d94${_scopeId2}>Reason</code></td><td data-v-253d0d94${_scopeId2}>Terminal Status event — final</td></tr></tbody></table>`);
            } else {
              return [
                createVNode("table", null, [
                  createVNode("thead", null, [
                    createVNode("tr", null, [
                      createVNode("th", null, "When you emit"),
                      createVNode("th", null, "QuoteStatus"),
                      createVNode("th", null, "Required additional fields"),
                      createVNode("th", null, "Resulting webhook event")
                    ])
                  ]),
                  createVNode("tbody", null, [
                    createVNode("tr", null, [
                      createVNode("td", null, "Immediately after Accept Quote"),
                      createVNode("td", null, [
                        createVNode("code", null, "ApplicationPending")
                      ]),
                      createVNode("td", null, "None"),
                      createVNode("td", null, [
                        createTextVNode("Pending Completion event with "),
                        createVNode("code", null, "QuoteStatus: ApplicationPending")
                      ])
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "After TPP submits KYC (TPP-Led only)"),
                      createVNode("td", null, [
                        createVNode("code", null, "ApplicationApproved")
                      ]),
                      createVNode("td", null, [
                        createVNode("code", null, "BrokerInstructions[].Url"),
                        createTextVNode(" — the LFI-hosted payment page")
                      ]),
                      createVNode("td", null, [
                        createTextVNode("Pending Completion event with "),
                        createVNode("code", null, "BrokerInstructions")
                      ])
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "Premium adjustment requires re-pay"),
                      createVNode("td", null, [
                        createVNode("code", null, "PaymentRequired")
                      ]),
                      createVNode("td", null, [
                        createVNode("code", null, "BrokerInstructions[].Url")
                      ]),
                      createVNode("td", null, [
                        createTextVNode("Pending Completion event with "),
                        createVNode("code", null, "BrokerInstructions")
                      ])
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "Policy issued (LFI-Led)"),
                      createVNode("td", null, [
                        createVNode("code", null, "PolicyIssued")
                      ]),
                      createVNode("td", null, [
                        createVNode("code", null, "InsurancePolicyId")
                      ]),
                      createVNode("td", null, "Pending Completion event with policy reference")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "Policy issued (TPP-Led)"),
                      createVNode("td", null, [
                        createVNode("code", null, "PolicyIssued")
                      ]),
                      createVNode("td", null, [
                        createVNode("code", null, "Documents[]"),
                        createTextVNode(" with SHA-256 hashes")
                      ]),
                      createVNode("td", null, "Pending Completion event with policy documents")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "Flow complete"),
                      createVNode("td", null, [
                        createVNode("code", null, "Completed")
                      ]),
                      createVNode("td", null, [
                        createVNode("code", null, "PolicyTerm"),
                        createTextVNode(", "),
                        createVNode("code", null, "Premium"),
                        createTextVNode(", "),
                        createVNode("code", null, "CustomerPaidInFull"),
                        createTextVNode(", "),
                        createVNode("code", null, "PolicyCountrySubDivision"),
                        createTextVNode(", (optional) "),
                        createVNode("code", null, "Commission")
                      ]),
                      createVNode("td", null, "Completed Status event — final")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "Quote expired"),
                      createVNode("td", null, [
                        createVNode("code", null, "Expired")
                      ]),
                      createVNode("td", null, [
                        createTextVNode("(optional) "),
                        createVNode("code", null, "Reason")
                      ]),
                      createVNode("td", null, "Terminal Status event — final")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "LFI declines mid-flow"),
                      createVNode("td", null, [
                        createVNode("code", null, "Rejected"),
                        createTextVNode(" / "),
                        createVNode("code", null, "LFICancelled")
                      ]),
                      createVNode("td", null, [
                        createTextVNode("(optional) "),
                        createVNode("code", null, "Reason")
                      ]),
                      createVNode("td", null, "Terminal Status event — final")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "Customer abandons"),
                      createVNode("td", null, [
                        createVNode("code", null, "CustomerCancelled")
                      ]),
                      createVNode("td", null, [
                        createTextVNode("(optional) "),
                        createVNode("code", null, "Reason")
                      ]),
                      createVNode("td", null, "Terminal Status event — final")
                    ])
                  ])
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdNote, {
          type: "warning",
          title: "Status ordering matters"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<p data-v-253d0d94${_scopeId2}> The Hub MUST receive statuses in the order shown above — <code data-v-253d0d94${_scopeId2}>PolicyIssued</code> before <code data-v-253d0d94${_scopeId2}>Completed</code>, never the reverse. Once any terminal (<code data-v-253d0d94${_scopeId2}>Completed</code>, <code data-v-253d0d94${_scopeId2}>Expired</code>, <code data-v-253d0d94${_scopeId2}>Rejected</code>, <code data-v-253d0d94${_scopeId2}>CustomerCancelled</code>, <code data-v-253d0d94${_scopeId2}>LFICancelled</code>) is emitted, no further PATCHes are accepted for that <code data-v-253d0d94${_scopeId2}>logId</code>. </p>`);
            } else {
              return [
                createVNode("p", null, [
                  createTextVNode(" The Hub MUST receive statuses in the order shown above — "),
                  createVNode("code", null, "PolicyIssued"),
                  createTextVNode(" before "),
                  createVNode("code", null, "Completed"),
                  createTextVNode(", never the reverse. Once any terminal ("),
                  createVNode("code", null, "Completed"),
                  createTextVNode(", "),
                  createVNode("code", null, "Expired"),
                  createTextVNode(", "),
                  createVNode("code", null, "Rejected"),
                  createTextVNode(", "),
                  createVNode("code", null, "CustomerCancelled"),
                  createTextVNode(", "),
                  createVNode("code", null, "LFICancelled"),
                  createTextVNode(") is emitted, no further PATCHes are accepted for that "),
                  createVNode("code", null, "logId"),
                  createTextVNode(". ")
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
              createTextVNode(" Every status transition between Accept Quote and the terminal state is announced to the Hub by the LFI via "),
              createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/insurance-quote-log-logId" }, [
                createVNode("code", null, "PATCH /insurance-quote-log/{logId}")
              ]),
              createTextVNode(" on the Consent Manager surface. The Hub records the event and, where the TPP subscribed via the "),
              createVNode("code", null, "Subscription"),
              createTextVNode(" object on PATCH Accept Quote, delivers it to the TPP\\'s webhook. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createVNode("code", null, "logId"),
              createTextVNode(" is the same value as the "),
              createVNode("code", null, "QuoteId"),
              createTextVNode(". Each PATCH carries one of three body schemas drawn from the Hub spec — pending-completion, completed, or terminal. ")
            ]),
            _: 1
          }),
          createVNode("h3", { class: "ed-doc__subhead" }, "PATCH-to-event mapping"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Use this table to predict the event a TPP will receive for each PATCH you emit. The Hub forwards verbatim — the body you send is the body the webhook sees. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdRefTable, null, {
            default: withCtx(() => [
              createVNode("table", null, [
                createVNode("thead", null, [
                  createVNode("tr", null, [
                    createVNode("th", null, "When you emit"),
                    createVNode("th", null, "QuoteStatus"),
                    createVNode("th", null, "Required additional fields"),
                    createVNode("th", null, "Resulting webhook event")
                  ])
                ]),
                createVNode("tbody", null, [
                  createVNode("tr", null, [
                    createVNode("td", null, "Immediately after Accept Quote"),
                    createVNode("td", null, [
                      createVNode("code", null, "ApplicationPending")
                    ]),
                    createVNode("td", null, "None"),
                    createVNode("td", null, [
                      createTextVNode("Pending Completion event with "),
                      createVNode("code", null, "QuoteStatus: ApplicationPending")
                    ])
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, "After TPP submits KYC (TPP-Led only)"),
                    createVNode("td", null, [
                      createVNode("code", null, "ApplicationApproved")
                    ]),
                    createVNode("td", null, [
                      createVNode("code", null, "BrokerInstructions[].Url"),
                      createTextVNode(" — the LFI-hosted payment page")
                    ]),
                    createVNode("td", null, [
                      createTextVNode("Pending Completion event with "),
                      createVNode("code", null, "BrokerInstructions")
                    ])
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, "Premium adjustment requires re-pay"),
                    createVNode("td", null, [
                      createVNode("code", null, "PaymentRequired")
                    ]),
                    createVNode("td", null, [
                      createVNode("code", null, "BrokerInstructions[].Url")
                    ]),
                    createVNode("td", null, [
                      createTextVNode("Pending Completion event with "),
                      createVNode("code", null, "BrokerInstructions")
                    ])
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, "Policy issued (LFI-Led)"),
                    createVNode("td", null, [
                      createVNode("code", null, "PolicyIssued")
                    ]),
                    createVNode("td", null, [
                      createVNode("code", null, "InsurancePolicyId")
                    ]),
                    createVNode("td", null, "Pending Completion event with policy reference")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, "Policy issued (TPP-Led)"),
                    createVNode("td", null, [
                      createVNode("code", null, "PolicyIssued")
                    ]),
                    createVNode("td", null, [
                      createVNode("code", null, "Documents[]"),
                      createTextVNode(" with SHA-256 hashes")
                    ]),
                    createVNode("td", null, "Pending Completion event with policy documents")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, "Flow complete"),
                    createVNode("td", null, [
                      createVNode("code", null, "Completed")
                    ]),
                    createVNode("td", null, [
                      createVNode("code", null, "PolicyTerm"),
                      createTextVNode(", "),
                      createVNode("code", null, "Premium"),
                      createTextVNode(", "),
                      createVNode("code", null, "CustomerPaidInFull"),
                      createTextVNode(", "),
                      createVNode("code", null, "PolicyCountrySubDivision"),
                      createTextVNode(", (optional) "),
                      createVNode("code", null, "Commission")
                    ]),
                    createVNode("td", null, "Completed Status event — final")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, "Quote expired"),
                    createVNode("td", null, [
                      createVNode("code", null, "Expired")
                    ]),
                    createVNode("td", null, [
                      createTextVNode("(optional) "),
                      createVNode("code", null, "Reason")
                    ]),
                    createVNode("td", null, "Terminal Status event — final")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, "LFI declines mid-flow"),
                    createVNode("td", null, [
                      createVNode("code", null, "Rejected"),
                      createTextVNode(" / "),
                      createVNode("code", null, "LFICancelled")
                    ]),
                    createVNode("td", null, [
                      createTextVNode("(optional) "),
                      createVNode("code", null, "Reason")
                    ]),
                    createVNode("td", null, "Terminal Status event — final")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, "Customer abandons"),
                    createVNode("td", null, [
                      createVNode("code", null, "CustomerCancelled")
                    ]),
                    createVNode("td", null, [
                      createTextVNode("(optional) "),
                      createVNode("code", null, "Reason")
                    ]),
                    createVNode("td", null, "Terminal Status event — final")
                  ])
                ])
              ])
            ]),
            _: 1
          }),
          createVNode(_component_EdNote, {
            type: "warning",
            title: "Status ordering matters"
          }, {
            default: withCtx(() => [
              createVNode("p", null, [
                createTextVNode(" The Hub MUST receive statuses in the order shown above — "),
                createVNode("code", null, "PolicyIssued"),
                createTextVNode(" before "),
                createVNode("code", null, "Completed"),
                createTextVNode(", never the reverse. Once any terminal ("),
                createVNode("code", null, "Completed"),
                createTextVNode(", "),
                createVNode("code", null, "Expired"),
                createTextVNode(", "),
                createVNode("code", null, "Rejected"),
                createTextVNode(", "),
                createVNode("code", null, "CustomerCancelled"),
                createTextVNode(", "),
                createVNode("code", null, "LFICancelled"),
                createTextVNode(") is emitted, no further PATCHes are accepted for that "),
                createVNode("code", null, "logId"),
                createTextVNode(". ")
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
    id: "modes",
    num: "03",
    color: "var(--at-navy)",
    eyebrow: "Mode-specific walkthroughs",
    title: "Pick the flow you're implementing",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` The two modes share the create/accept/issue skeleton but diverge in where customer KYC and payment happen. The walkthroughs below cover each end-to-end with the matching status events. `);
            } else {
              return [
                createTextVNode(" The two modes share the create/accept/issue skeleton but diverge in where customer KYC and payment happen. The walkthroughs below cover each end-to-end with the matching status events. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<div class="ed-doc__cards" data-v-253d0d94${_scopeId}><a class="ed-doc__card" href="/tech/lfi-api-hub/v2.1/insurance/quotation/api-guide/lfi-led" data-v-253d0d94${_scopeId}><span class="ed-doc__card-cat" data-v-253d0d94${_scopeId}>LFI-Led</span><h3 class="ed-doc__card-title" data-v-253d0d94${_scopeId}>Your LFI hosts customer verification, payment, and documents</h3><p class="ed-doc__card-desc" data-v-253d0d94${_scopeId}> Single-PATCH accept flow. TPP redirects the customer to your LFI on accept; you drive the rest. Status events fan back through the Hub to the TPP. </p><span class="ed-doc__card-arrow" data-v-253d0d94${_scopeId}>Open →</span></a><a class="ed-doc__card" href="/tech/lfi-api-hub/v2.1/insurance/quotation/api-guide/tpp-led" data-v-253d0d94${_scopeId}><span class="ed-doc__card-cat" data-v-253d0d94${_scopeId}>TPP-Led</span><h3 class="ed-doc__card-title" data-v-253d0d94${_scopeId}>TPP collects KYC; LFI hosts only the payment page</h3><p class="ed-doc__card-desc" data-v-253d0d94${_scopeId}> Two-PATCH flow on the same quote. The TPP submits KYC; you respond with an LFI-hosted payment URL. After the customer pays, you issue and emit policy documents. </p><span class="ed-doc__card-arrow" data-v-253d0d94${_scopeId}>Open →</span></a></div>`);
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" The two modes share the create/accept/issue skeleton but diverge in where customer KYC and payment happen. The walkthroughs below cover each end-to-end with the matching status events. ")
            ]),
            _: 1
          }),
          createVNode("div", { class: "ed-doc__cards" }, [
            createVNode("a", {
              class: "ed-doc__card",
              href: "/tech/lfi-api-hub/v2.1/insurance/quotation/api-guide/lfi-led"
            }, [
              createVNode("span", { class: "ed-doc__card-cat" }, "LFI-Led"),
              createVNode("h3", { class: "ed-doc__card-title" }, "Your LFI hosts customer verification, payment, and documents"),
              createVNode("p", { class: "ed-doc__card-desc" }, " Single-PATCH accept flow. TPP redirects the customer to your LFI on accept; you drive the rest. Status events fan back through the Hub to the TPP. "),
              createVNode("span", { class: "ed-doc__card-arrow" }, "Open →")
            ]),
            createVNode("a", {
              class: "ed-doc__card",
              href: "/tech/lfi-api-hub/v2.1/insurance/quotation/api-guide/tpp-led"
            }, [
              createVNode("span", { class: "ed-doc__card-cat" }, "TPP-Led"),
              createVNode("h3", { class: "ed-doc__card-title" }, "TPP collects KYC; LFI hosts only the payment page"),
              createVNode("p", { class: "ed-doc__card-desc" }, " Two-PATCH flow on the same quote. The TPP submits KYC; you respond with an LFI-hosted payment URL. After the customer pays, you issue and emit policy documents. "),
              createVNode("span", { class: "ed-doc__card-arrow" }, "Open →")
            ])
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "quote-types",
    num: "04",
    color: "var(--at-violet, #6d28d9)",
    eyebrow: "Per-quote-type rules",
    title: "New, Renewal, and Switch differences",
    tone: "surface"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` The validation differences between <code data-v-253d0d94${_scopeId2}>New</code>, <code data-v-253d0d94${_scopeId2}>Renewal</code>, and <code data-v-253d0d94${_scopeId2}>Switch</code> are documented in the shared <a href="/tech/lfi-api-hub/v2.1/insurance/quotation/quote-types" data-v-253d0d94${_scopeId2}>Quote Types</a> explainer — the same page the TPP standards link to. Read it before implementing the Create Quote validation in your Ozone Connect endpoint. `);
            } else {
              return [
                createTextVNode(" The validation differences between "),
                createVNode("code", null, "New"),
                createTextVNode(", "),
                createVNode("code", null, "Renewal"),
                createTextVNode(", and "),
                createVNode("code", null, "Switch"),
                createTextVNode(" are documented in the shared "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/insurance/quotation/quote-types" }, "Quote Types"),
                createTextVNode(" explainer — the same page the TPP standards link to. Read it before implementing the Create Quote validation in your Ozone Connect endpoint. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" The validation differences between "),
              createVNode("code", null, "New"),
              createTextVNode(", "),
              createVNode("code", null, "Renewal"),
              createTextVNode(", and "),
              createVNode("code", null, "Switch"),
              createTextVNode(" are documented in the shared "),
              createVNode("a", { href: "/tech/lfi-api-hub/v2.1/insurance/quotation/quote-types" }, "Quote Types"),
              createTextVNode(" explainer — the same page the TPP standards link to. Read it before implementing the Create Quote validation in your Ozone Connect endpoint. ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/v2.1/insurance/quotation/api-guide/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-253d0d94"]]);
export {
  index as default
};
