import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
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
  const _component_EdBullets = __unplugin_components_5;
  const _component_EdRefTable = __unplugin_components_12;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-59bbaf9c><section class="ed-doc__hero" data-v-59bbaf9c><div class="ed-doc__inner" data-v-59bbaf9c><div class="ed-doc__eyebrow" data-v-59bbaf9c><span class="ed-doc__eyebrow-dash" data-v-59bbaf9c></span> Insurance · Quotation · LFI hosted screens </div><h1 class="ed-doc__title" data-v-59bbaf9c> User Journeys <span class="ed-doc__read" data-v-59bbaf9c>3 min read</span></h1><p class="ed-doc__lede" data-v-59bbaf9c> Insurance Quotation does not have a Hub-mediated consent journey — the TPP authenticates with the Client Credentials Grant and the customer interacts either with the TPP\\&#39;s own UI or with screens your LFI hosts. This page describes what your LFI hosts and when. </p></div></section>`);
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "lfi-led",
    num: "01",
    color: "var(--at-teal)",
    eyebrow: "LFI-Led mode",
    title: "Your LFI hosts the customer end-to-end",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` In LFI-Led mode, the TPP creates the quote and (on acceptance) hands the customer to your LFI to complete the application. Your LFI is responsible for the customer-facing screens from acceptance through to policy issuance. The TPP\\&#39;s only customer touchpoint after acceptance is the document delivery you push back via the quote-log. `);
            } else {
              return [
                createTextVNode(" In LFI-Led mode, the TPP creates the quote and (on acceptance) hands the customer to your LFI to complete the application. Your LFI is responsible for the customer-facing screens from acceptance through to policy issuance. The TPP\\'s only customer touchpoint after acceptance is the document delivery you push back via the quote-log. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 class="ed-doc__subhead" data-v-59bbaf9c${_scopeId}>Screens your LFI hosts</h3>`);
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-59bbaf9c${_scopeId2}><strong data-v-59bbaf9c${_scopeId2}>Quote summary</strong> — confirms the quote details (sums insured, premium, coverage period, exclusions) before the customer commits. </li><li data-v-59bbaf9c${_scopeId2}><strong data-v-59bbaf9c${_scopeId2}>Customer verification (KYC)</strong> — Emirates ID capture, address confirmation, and any additional declarations required for underwriting. </li><li data-v-59bbaf9c${_scopeId2}><strong data-v-59bbaf9c${_scopeId2}>Payment</strong> — premium collection through your LFI\\&#39;s payment provider (card, wallet, or direct debit, as supported). </li><li data-v-59bbaf9c${_scopeId2}><strong data-v-59bbaf9c${_scopeId2}>Confirmation</strong> — on successful issuance, an in-LFI confirmation screen that hands the customer back to the originating TPP (typically via a return URL the TPP supplied on quote creation). </li>`);
            } else {
              return [
                createVNode("li", null, [
                  createVNode("strong", null, "Quote summary"),
                  createTextVNode(" — confirms the quote details (sums insured, premium, coverage period, exclusions) before the customer commits. ")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "Customer verification (KYC)"),
                  createTextVNode(" — Emirates ID capture, address confirmation, and any additional declarations required for underwriting. ")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "Payment"),
                  createTextVNode(" — premium collection through your LFI\\'s payment provider (card, wallet, or direct debit, as supported). ")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "Confirmation"),
                  createTextVNode(" — on successful issuance, an in-LFI confirmation screen that hands the customer back to the originating TPP (typically via a return URL the TPP supplied on quote creation). ")
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 class="ed-doc__subhead" data-v-59bbaf9c${_scopeId}>Status emission</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` At each transition (KYC submitted, payment confirmed, policy issued), emit the matching quote-log status via <code data-v-59bbaf9c${_scopeId2}>PATCH /insurance-quote-log/{logId}</code> so the TPP — and any subscribed webhook — sees the lifecycle progress. The TPP uses these events to update its own customer-facing UI in parallel. `);
            } else {
              return [
                createTextVNode(" At each transition (KYC submitted, payment confirmed, policy issued), emit the matching quote-log status via "),
                createVNode("code", null, "PATCH /insurance-quote-log/{logId}"),
                createTextVNode(" so the TPP — and any subscribed webhook — sees the lifecycle progress. The TPP uses these events to update its own customer-facing UI in parallel. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" In LFI-Led mode, the TPP creates the quote and (on acceptance) hands the customer to your LFI to complete the application. Your LFI is responsible for the customer-facing screens from acceptance through to policy issuance. The TPP\\'s only customer touchpoint after acceptance is the document delivery you push back via the quote-log. ")
            ]),
            _: 1
          }),
          createVNode("h3", { class: "ed-doc__subhead" }, "Screens your LFI hosts"),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, [
                createVNode("strong", null, "Quote summary"),
                createTextVNode(" — confirms the quote details (sums insured, premium, coverage period, exclusions) before the customer commits. ")
              ]),
              createVNode("li", null, [
                createVNode("strong", null, "Customer verification (KYC)"),
                createTextVNode(" — Emirates ID capture, address confirmation, and any additional declarations required for underwriting. ")
              ]),
              createVNode("li", null, [
                createVNode("strong", null, "Payment"),
                createTextVNode(" — premium collection through your LFI\\'s payment provider (card, wallet, or direct debit, as supported). ")
              ]),
              createVNode("li", null, [
                createVNode("strong", null, "Confirmation"),
                createTextVNode(" — on successful issuance, an in-LFI confirmation screen that hands the customer back to the originating TPP (typically via a return URL the TPP supplied on quote creation). ")
              ])
            ]),
            _: 1
          }),
          createVNode("h3", { class: "ed-doc__subhead" }, "Status emission"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" At each transition (KYC submitted, payment confirmed, policy issued), emit the matching quote-log status via "),
              createVNode("code", null, "PATCH /insurance-quote-log/{logId}"),
              createTextVNode(" so the TPP — and any subscribed webhook — sees the lifecycle progress. The TPP uses these events to update its own customer-facing UI in parallel. ")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "tpp-led",
    num: "02",
    color: "var(--at-gold, #b08800)",
    eyebrow: "TPP-Led mode",
    title: "The TPP hosts the customer; your LFI hosts only the payment page",
    tone: "surface"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` In TPP-Led mode, the TPP collects KYC in its own UI and submits it to your LFI via PATCH on the quote. Your LFI\\&#39;s only hosted screen is the <strong data-v-59bbaf9c${_scopeId2}>payment page</strong> — delivered to the TPP as a <code data-v-59bbaf9c${_scopeId2}>BrokerInstructions.Url</code> on the <code data-v-59bbaf9c${_scopeId2}>ApplicationApproved</code> event, then surfaced to the customer by the TPP as a redirect. `);
            } else {
              return [
                createTextVNode(" In TPP-Led mode, the TPP collects KYC in its own UI and submits it to your LFI via PATCH on the quote. Your LFI\\'s only hosted screen is the "),
                createVNode("strong", null, "payment page"),
                createTextVNode(" — delivered to the TPP as a "),
                createVNode("code", null, "BrokerInstructions.Url"),
                createTextVNode(" on the "),
                createVNode("code", null, "ApplicationApproved"),
                createTextVNode(" event, then surfaced to the customer by the TPP as a redirect. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 class="ed-doc__subhead" data-v-59bbaf9c${_scopeId}>Payment page requirements</h3>`);
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-59bbaf9c${_scopeId2}><strong data-v-59bbaf9c${_scopeId2}>Branded as LFI</strong> — the customer must clearly see they are paying the insurer, not the TPP. </li><li data-v-59bbaf9c${_scopeId2}><strong data-v-59bbaf9c${_scopeId2}>Single-use URL</strong> — the URL MUST be invalidated after first redemption or after a reasonable session window (15–30 minutes). The TPP MUST NOT cache or replay it. </li><li data-v-59bbaf9c${_scopeId2}><strong data-v-59bbaf9c${_scopeId2}>Return handling</strong> — on payment success or cancellation, return the customer to a destination the TPP specified when subscribing to events. The customer\\&#39;s status thereafter is observable to the TPP via subsequent quote-log events (<code data-v-59bbaf9c${_scopeId2}>PolicyIssued</code>, <code data-v-59bbaf9c${_scopeId2}>CustomerCancelled</code>, etc.). </li><li data-v-59bbaf9c${_scopeId2}><strong data-v-59bbaf9c${_scopeId2}>No KYC capture</strong> — KYC has already been collected by the TPP and accepted by the LFI before the payment URL is issued. The payment page MUST NOT re-prompt for it. </li>`);
            } else {
              return [
                createVNode("li", null, [
                  createVNode("strong", null, "Branded as LFI"),
                  createTextVNode(" — the customer must clearly see they are paying the insurer, not the TPP. ")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "Single-use URL"),
                  createTextVNode(" — the URL MUST be invalidated after first redemption or after a reasonable session window (15–30 minutes). The TPP MUST NOT cache or replay it. ")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "Return handling"),
                  createTextVNode(" — on payment success or cancellation, return the customer to a destination the TPP specified when subscribing to events. The customer\\'s status thereafter is observable to the TPP via subsequent quote-log events ("),
                  createVNode("code", null, "PolicyIssued"),
                  createTextVNode(", "),
                  createVNode("code", null, "CustomerCancelled"),
                  createTextVNode(", etc.). ")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "No KYC capture"),
                  createTextVNode(" — KYC has already been collected by the TPP and accepted by the LFI before the payment URL is issued. The payment page MUST NOT re-prompt for it. ")
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 class="ed-doc__subhead" data-v-59bbaf9c${_scopeId}>Document delivery</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Once the policy is issued, your LFI MUST NOT email or post documents to the customer directly in TPP-Led mode — the TPP becomes the document delivery channel. Attach all policy documents (Policy Booklet, Terms &amp; Conditions, IPID, etc.) as base64-encoded <code data-v-59bbaf9c${_scopeId2}>Documents</code> entries on the <code data-v-59bbaf9c${_scopeId2}>PolicyIssued</code> quote-log event, with SHA-256 hashes for integrity verification. The TPP surfaces them to the customer in its own UI. `);
            } else {
              return [
                createTextVNode(" Once the policy is issued, your LFI MUST NOT email or post documents to the customer directly in TPP-Led mode — the TPP becomes the document delivery channel. Attach all policy documents (Policy Booklet, Terms & Conditions, IPID, etc.) as base64-encoded "),
                createVNode("code", null, "Documents"),
                createTextVNode(" entries on the "),
                createVNode("code", null, "PolicyIssued"),
                createTextVNode(" quote-log event, with SHA-256 hashes for integrity verification. The TPP surfaces them to the customer in its own UI. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" In TPP-Led mode, the TPP collects KYC in its own UI and submits it to your LFI via PATCH on the quote. Your LFI\\'s only hosted screen is the "),
              createVNode("strong", null, "payment page"),
              createTextVNode(" — delivered to the TPP as a "),
              createVNode("code", null, "BrokerInstructions.Url"),
              createTextVNode(" on the "),
              createVNode("code", null, "ApplicationApproved"),
              createTextVNode(" event, then surfaced to the customer by the TPP as a redirect. ")
            ]),
            _: 1
          }),
          createVNode("h3", { class: "ed-doc__subhead" }, "Payment page requirements"),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, [
                createVNode("strong", null, "Branded as LFI"),
                createTextVNode(" — the customer must clearly see they are paying the insurer, not the TPP. ")
              ]),
              createVNode("li", null, [
                createVNode("strong", null, "Single-use URL"),
                createTextVNode(" — the URL MUST be invalidated after first redemption or after a reasonable session window (15–30 minutes). The TPP MUST NOT cache or replay it. ")
              ]),
              createVNode("li", null, [
                createVNode("strong", null, "Return handling"),
                createTextVNode(" — on payment success or cancellation, return the customer to a destination the TPP specified when subscribing to events. The customer\\'s status thereafter is observable to the TPP via subsequent quote-log events ("),
                createVNode("code", null, "PolicyIssued"),
                createTextVNode(", "),
                createVNode("code", null, "CustomerCancelled"),
                createTextVNode(", etc.). ")
              ]),
              createVNode("li", null, [
                createVNode("strong", null, "No KYC capture"),
                createTextVNode(" — KYC has already been collected by the TPP and accepted by the LFI before the payment URL is issued. The payment page MUST NOT re-prompt for it. ")
              ])
            ]),
            _: 1
          }),
          createVNode("h3", { class: "ed-doc__subhead" }, "Document delivery"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Once the policy is issued, your LFI MUST NOT email or post documents to the customer directly in TPP-Led mode — the TPP becomes the document delivery channel. Attach all policy documents (Policy Booklet, Terms & Conditions, IPID, etc.) as base64-encoded "),
              createVNode("code", null, "Documents"),
              createTextVNode(" entries on the "),
              createVNode("code", null, "PolicyIssued"),
              createTextVNode(" quote-log event, with SHA-256 hashes for integrity verification. The TPP surfaces them to the customer in its own UI. ")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "comparison",
    num: "03",
    color: "var(--at-navy)",
    eyebrow: "At a glance",
    title: "Which screens does each mode host?",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdRefTable, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<table data-v-59bbaf9c${_scopeId2}><thead data-v-59bbaf9c${_scopeId2}><tr data-v-59bbaf9c${_scopeId2}><th data-v-59bbaf9c${_scopeId2}>Screen / responsibility</th><th data-v-59bbaf9c${_scopeId2}>LFI-Led</th><th data-v-59bbaf9c${_scopeId2}>TPP-Led</th></tr></thead><tbody data-v-59bbaf9c${_scopeId2}><tr data-v-59bbaf9c${_scopeId2}><td data-v-59bbaf9c${_scopeId2}>Quote summary &amp; acceptance</td><td data-v-59bbaf9c${_scopeId2}>LFI</td><td data-v-59bbaf9c${_scopeId2}>TPP</td></tr><tr data-v-59bbaf9c${_scopeId2}><td data-v-59bbaf9c${_scopeId2}>Customer verification (KYC)</td><td data-v-59bbaf9c${_scopeId2}>LFI</td><td data-v-59bbaf9c${_scopeId2}>TPP</td></tr><tr data-v-59bbaf9c${_scopeId2}><td data-v-59bbaf9c${_scopeId2}>Premium payment</td><td data-v-59bbaf9c${_scopeId2}>LFI</td><td data-v-59bbaf9c${_scopeId2}>LFI (via redirect from TPP)</td></tr><tr data-v-59bbaf9c${_scopeId2}><td data-v-59bbaf9c${_scopeId2}>Policy document delivery</td><td data-v-59bbaf9c${_scopeId2}>LFI (direct to customer)</td><td data-v-59bbaf9c${_scopeId2}>TPP (via Documents on PolicyIssued event)</td></tr><tr data-v-59bbaf9c${_scopeId2}><td data-v-59bbaf9c${_scopeId2}>Post-issuance customer support</td><td data-v-59bbaf9c${_scopeId2}>LFI</td><td data-v-59bbaf9c${_scopeId2}>LFI (per standard insurance regulatory obligations)</td></tr></tbody></table>`);
            } else {
              return [
                createVNode("table", null, [
                  createVNode("thead", null, [
                    createVNode("tr", null, [
                      createVNode("th", null, "Screen / responsibility"),
                      createVNode("th", null, "LFI-Led"),
                      createVNode("th", null, "TPP-Led")
                    ])
                  ]),
                  createVNode("tbody", null, [
                    createVNode("tr", null, [
                      createVNode("td", null, "Quote summary & acceptance"),
                      createVNode("td", null, "LFI"),
                      createVNode("td", null, "TPP")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "Customer verification (KYC)"),
                      createVNode("td", null, "LFI"),
                      createVNode("td", null, "TPP")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "Premium payment"),
                      createVNode("td", null, "LFI"),
                      createVNode("td", null, "LFI (via redirect from TPP)")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "Policy document delivery"),
                      createVNode("td", null, "LFI (direct to customer)"),
                      createVNode("td", null, "TPP (via Documents on PolicyIssued event)")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "Post-issuance customer support"),
                      createVNode("td", null, "LFI"),
                      createVNode("td", null, "LFI (per standard insurance regulatory obligations)")
                    ])
                  ])
                ])
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
                    createVNode("th", null, "Screen / responsibility"),
                    createVNode("th", null, "LFI-Led"),
                    createVNode("th", null, "TPP-Led")
                  ])
                ]),
                createVNode("tbody", null, [
                  createVNode("tr", null, [
                    createVNode("td", null, "Quote summary & acceptance"),
                    createVNode("td", null, "LFI"),
                    createVNode("td", null, "TPP")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, "Customer verification (KYC)"),
                    createVNode("td", null, "LFI"),
                    createVNode("td", null, "TPP")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, "Premium payment"),
                    createVNode("td", null, "LFI"),
                    createVNode("td", null, "LFI (via redirect from TPP)")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, "Policy document delivery"),
                    createVNode("td", null, "LFI (direct to customer)"),
                    createVNode("td", null, "TPP (via Documents on PolicyIssued event)")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, "Post-issuance customer support"),
                    createVNode("td", null, "LFI"),
                    createVNode("td", null, "LFI (per standard insurance regulatory obligations)")
                  ])
                ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/v2.2-rc1/insurance/quotation/user-journeys.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const userJourneys = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-59bbaf9c"]]);
export {
  userJourneys as default
};
