import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
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
  const _component_EdNote = __unplugin_components_7;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-35c9cc73><section class="ed-doc__hero" data-v-35c9cc73><div class="ed-doc__inner" data-v-35c9cc73><div class="ed-doc__eyebrow" data-v-35c9cc73><span class="ed-doc__eyebrow-dash" data-v-35c9cc73></span> Insurance · Quotation · TPP screens </div><h1 class="ed-doc__title" data-v-35c9cc73> User Journeys <span class="ed-doc__read" data-v-35c9cc73>4 min read</span></h1><p class="ed-doc__lede" data-v-35c9cc73> The customer-facing flow in your TPP application, broken down by mode. Insurance Quotation has no Hub-mediated consent journey — the screens below are entirely yours to design (LFI-Led: minimal handoff; TPP-Led: full application capture before redirect to the LFI for payment). </p></div></section>`);
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "quote-collection",
    num: "01",
    color: "var(--at-teal)",
    eyebrow: "Step 1 — Quote collection",
    title: "Gather inputs and request quotes",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Regardless of mode, you collect the data needed to request quotes in your own UI: sector, <code data-v-35c9cc73${_scopeId2}>QuoteType</code>, sector-specific risk data (vehicle, property, trip, etc.), and customer identifiers. POST <code data-v-35c9cc73${_scopeId2}>/{type}-insurance-quotes</code> may return one or more quotes from each LFI; present them so the customer can compare and choose. `);
            } else {
              return [
                createTextVNode(" Regardless of mode, you collect the data needed to request quotes in your own UI: sector, "),
                createVNode("code", null, "QuoteType"),
                createTextVNode(", sector-specific risk data (vehicle, property, trip, etc.), and customer identifiers. POST "),
                createVNode("code", null, "/{type}-insurance-quotes"),
                createTextVNode(" may return one or more quotes from each LFI; present them so the customer can compare and choose. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 class="ed-doc__subhead" data-v-35c9cc73${_scopeId}>Screens in your app</h3>`);
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-35c9cc73${_scopeId2}><strong data-v-35c9cc73${_scopeId2}>Quote inputs</strong> — collect sector, <code data-v-35c9cc73${_scopeId2}>QuoteType</code>, and sector-specific risk inputs. Validate locally before submission. </li><li data-v-35c9cc73${_scopeId2}><strong data-v-35c9cc73${_scopeId2}>Quote comparison</strong> — render the returned quotes. Surface premium, coverage, exclusions, and any sector-specific selling points. Indicate which LFI declined (received <code data-v-35c9cc73${_scopeId2}>204</code>) so the customer is not left wondering. </li><li data-v-35c9cc73${_scopeId2}><strong data-v-35c9cc73${_scopeId2}>Quote acceptance</strong> — the customer picks one quote. Confirm the selection before sending the PATCH Accept Quote. </li>`);
            } else {
              return [
                createVNode("li", null, [
                  createVNode("strong", null, "Quote inputs"),
                  createTextVNode(" — collect sector, "),
                  createVNode("code", null, "QuoteType"),
                  createTextVNode(", and sector-specific risk inputs. Validate locally before submission. ")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "Quote comparison"),
                  createTextVNode(" — render the returned quotes. Surface premium, coverage, exclusions, and any sector-specific selling points. Indicate which LFI declined (received "),
                  createVNode("code", null, "204"),
                  createTextVNode(") so the customer is not left wondering. ")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "Quote acceptance"),
                  createTextVNode(" — the customer picks one quote. Confirm the selection before sending the PATCH Accept Quote. ")
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
              createTextVNode(" Regardless of mode, you collect the data needed to request quotes in your own UI: sector, "),
              createVNode("code", null, "QuoteType"),
              createTextVNode(", sector-specific risk data (vehicle, property, trip, etc.), and customer identifiers. POST "),
              createVNode("code", null, "/{type}-insurance-quotes"),
              createTextVNode(" may return one or more quotes from each LFI; present them so the customer can compare and choose. ")
            ]),
            _: 1
          }),
          createVNode("h3", { class: "ed-doc__subhead" }, "Screens in your app"),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, [
                createVNode("strong", null, "Quote inputs"),
                createTextVNode(" — collect sector, "),
                createVNode("code", null, "QuoteType"),
                createTextVNode(", and sector-specific risk inputs. Validate locally before submission. ")
              ]),
              createVNode("li", null, [
                createVNode("strong", null, "Quote comparison"),
                createTextVNode(" — render the returned quotes. Surface premium, coverage, exclusions, and any sector-specific selling points. Indicate which LFI declined (received "),
                createVNode("code", null, "204"),
                createTextVNode(") so the customer is not left wondering. ")
              ]),
              createVNode("li", null, [
                createVNode("strong", null, "Quote acceptance"),
                createTextVNode(" — the customer picks one quote. Confirm the selection before sending the PATCH Accept Quote. ")
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
    id: "accept",
    num: "02",
    color: "var(--at-gold, #b08800)",
    eyebrow: "Step 2 — Accept & subscribe",
    title: "Subscribe to events when accepting the quote",
    tone: "surface"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` PATCH <code data-v-35c9cc73${_scopeId2}>/{type}-insurance-quotes/{QuoteId}</code> carries both the accept payload and (optionally) a <code data-v-35c9cc73${_scopeId2}>Subscription.Webhook</code> object. Subscribe at accept time so you receive every subsequent status change — <code data-v-35c9cc73${_scopeId2}>ApplicationPending</code> through <code data-v-35c9cc73${_scopeId2}>Completed</code> — on your webhook endpoint without polling. `);
            } else {
              return [
                createTextVNode(" PATCH "),
                createVNode("code", null, "/{type}-insurance-quotes/{QuoteId}"),
                createTextVNode(" carries both the accept payload and (optionally) a "),
                createVNode("code", null, "Subscription.Webhook"),
                createTextVNode(" object. Subscribe at accept time so you receive every subsequent status change — "),
                createVNode("code", null, "ApplicationPending"),
                createTextVNode(" through "),
                createVNode("code", null, "Completed"),
                createTextVNode(" — on your webhook endpoint without polling. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 class="ed-doc__subhead" data-v-35c9cc73${_scopeId}>Where the flow forks</h3>`);
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-35c9cc73${_scopeId2}><strong data-v-35c9cc73${_scopeId2}>LFI-Led mode</strong> — the response is <code data-v-35c9cc73${_scopeId2}>204</code>. The customer is handed to the LFI for KYC, payment, and document delivery. Your app waits for status events (or returns control to the customer with a &quot;we\\&#39;ll let you know when your policy is ready&quot; screen). </li><li data-v-35c9cc73${_scopeId2}><strong data-v-35c9cc73${_scopeId2}>TPP-Led mode</strong> — the response is <code data-v-35c9cc73${_scopeId2}>200</code> with <code data-v-35c9cc73${_scopeId2}>PolicyIssuanceAllowed</code> declaring you handle <code data-v-35c9cc73${_scopeId2}>CustomerVerification</code>, <code data-v-35c9cc73${_scopeId2}>Payment</code>, and/or <code data-v-35c9cc73${_scopeId2}>PolicyDocuments</code>. Continue in your app with KYC capture. </li>`);
            } else {
              return [
                createVNode("li", null, [
                  createVNode("strong", null, "LFI-Led mode"),
                  createTextVNode(" — the response is "),
                  createVNode("code", null, "204"),
                  createTextVNode(`. The customer is handed to the LFI for KYC, payment, and document delivery. Your app waits for status events (or returns control to the customer with a "we\\'ll let you know when your policy is ready" screen). `)
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "TPP-Led mode"),
                  createTextVNode(" — the response is "),
                  createVNode("code", null, "200"),
                  createTextVNode(" with "),
                  createVNode("code", null, "PolicyIssuanceAllowed"),
                  createTextVNode(" declaring you handle "),
                  createVNode("code", null, "CustomerVerification"),
                  createTextVNode(", "),
                  createVNode("code", null, "Payment"),
                  createTextVNode(", and/or "),
                  createVNode("code", null, "PolicyDocuments"),
                  createTextVNode(". Continue in your app with KYC capture. ")
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
              createTextVNode(" PATCH "),
              createVNode("code", null, "/{type}-insurance-quotes/{QuoteId}"),
              createTextVNode(" carries both the accept payload and (optionally) a "),
              createVNode("code", null, "Subscription.Webhook"),
              createTextVNode(" object. Subscribe at accept time so you receive every subsequent status change — "),
              createVNode("code", null, "ApplicationPending"),
              createTextVNode(" through "),
              createVNode("code", null, "Completed"),
              createTextVNode(" — on your webhook endpoint without polling. ")
            ]),
            _: 1
          }),
          createVNode("h3", { class: "ed-doc__subhead" }, "Where the flow forks"),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, [
                createVNode("strong", null, "LFI-Led mode"),
                createTextVNode(" — the response is "),
                createVNode("code", null, "204"),
                createTextVNode(`. The customer is handed to the LFI for KYC, payment, and document delivery. Your app waits for status events (or returns control to the customer with a "we\\'ll let you know when your policy is ready" screen). `)
              ]),
              createVNode("li", null, [
                createVNode("strong", null, "TPP-Led mode"),
                createTextVNode(" — the response is "),
                createVNode("code", null, "200"),
                createTextVNode(" with "),
                createVNode("code", null, "PolicyIssuanceAllowed"),
                createTextVNode(" declaring you handle "),
                createVNode("code", null, "CustomerVerification"),
                createTextVNode(", "),
                createVNode("code", null, "Payment"),
                createTextVNode(", and/or "),
                createVNode("code", null, "PolicyDocuments"),
                createTextVNode(". Continue in your app with KYC capture. ")
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
    id: "tpp-led-kyc",
    num: "03",
    color: "var(--at-blue-deep, #1d4ed8)",
    eyebrow: "Step 3 (TPP-Led only) — KYC",
    title: "Collect customer verification in your app",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` For TPP-Led quotes where <code data-v-35c9cc73${_scopeId2}>PolicyIssuanceAllowed.CustomerVerification: true</code>, your app collects the customer\\&#39;s KYC data — Emirates ID, address, occupation, etc., per the sector\\&#39;s accept-quote schema — and submits it via a second PATCH on the same quote endpoint. `);
            } else {
              return [
                createTextVNode(" For TPP-Led quotes where "),
                createVNode("code", null, "PolicyIssuanceAllowed.CustomerVerification: true"),
                createTextVNode(", your app collects the customer\\'s KYC data — Emirates ID, address, occupation, etc., per the sector\\'s accept-quote schema — and submits it via a second PATCH on the same quote endpoint. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 class="ed-doc__subhead" data-v-35c9cc73${_scopeId}>Screens in your app</h3>`);
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-35c9cc73${_scopeId2}><strong data-v-35c9cc73${_scopeId2}>Identity capture</strong> — Emirates ID front/back scan or manual entry. UAE PASS integration is encouraged where available. </li><li data-v-35c9cc73${_scopeId2}><strong data-v-35c9cc73${_scopeId2}>Declarations</strong> — any sector-specific declarations the LFI requires (claims history, smoking status for Life/Health, named drivers for Motor, etc.). </li><li data-v-35c9cc73${_scopeId2}><strong data-v-35c9cc73${_scopeId2}>Review &amp; submit</strong> — surface the gathered data for the customer to confirm before transmission. This submission is treated as the customer\\&#39;s instruction to proceed. </li>`);
            } else {
              return [
                createVNode("li", null, [
                  createVNode("strong", null, "Identity capture"),
                  createTextVNode(" — Emirates ID front/back scan or manual entry. UAE PASS integration is encouraged where available. ")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "Declarations"),
                  createTextVNode(" — any sector-specific declarations the LFI requires (claims history, smoking status for Life/Health, named drivers for Motor, etc.). ")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "Review & submit"),
                  createTextVNode(" — surface the gathered data for the customer to confirm before transmission. This submission is treated as the customer\\'s instruction to proceed. ")
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
              createTextVNode(" For TPP-Led quotes where "),
              createVNode("code", null, "PolicyIssuanceAllowed.CustomerVerification: true"),
              createTextVNode(", your app collects the customer\\'s KYC data — Emirates ID, address, occupation, etc., per the sector\\'s accept-quote schema — and submits it via a second PATCH on the same quote endpoint. ")
            ]),
            _: 1
          }),
          createVNode("h3", { class: "ed-doc__subhead" }, "Screens in your app"),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, [
                createVNode("strong", null, "Identity capture"),
                createTextVNode(" — Emirates ID front/back scan or manual entry. UAE PASS integration is encouraged where available. ")
              ]),
              createVNode("li", null, [
                createVNode("strong", null, "Declarations"),
                createTextVNode(" — any sector-specific declarations the LFI requires (claims history, smoking status for Life/Health, named drivers for Motor, etc.). ")
              ]),
              createVNode("li", null, [
                createVNode("strong", null, "Review & submit"),
                createTextVNode(" — surface the gathered data for the customer to confirm before transmission. This submission is treated as the customer\\'s instruction to proceed. ")
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
    id: "payment-redirect",
    num: "04",
    color: "var(--at-violet, #6d28d9)",
    eyebrow: "Step 4 (TPP-Led only) — Payment redirect",
    title: "Redirect the customer to the LFI-hosted payment URL",
    tone: "surface"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` After the LFI emits <code data-v-35c9cc73${_scopeId2}>ApplicationApproved</code> on the quote-log (delivered to your webhook or visible via polling), the event carries a <code data-v-35c9cc73${_scopeId2}>BrokerInstructions.Url</code>. This is the LFI\\&#39;s hosted payment page. Redirect the customer to it; payment is collected by the LFI. `);
            } else {
              return [
                createTextVNode(" After the LFI emits "),
                createVNode("code", null, "ApplicationApproved"),
                createTextVNode(" on the quote-log (delivered to your webhook or visible via polling), the event carries a "),
                createVNode("code", null, "BrokerInstructions.Url"),
                createTextVNode(". This is the LFI\\'s hosted payment page. Redirect the customer to it; payment is collected by the LFI. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 class="ed-doc__subhead" data-v-35c9cc73${_scopeId}>Screens in your app</h3>`);
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-35c9cc73${_scopeId2}><strong data-v-35c9cc73${_scopeId2}>Handoff confirmation</strong> — a short screen explaining the customer is being taken to the insurer\\&#39;s secure payment page. Show the LFI brand so the customer recognises where they\\&#39;re going. </li><li data-v-35c9cc73${_scopeId2}><strong data-v-35c9cc73${_scopeId2}>Return landing</strong> — the LFI redirects the customer back to a URL you control after payment. Show a &quot;your policy is being finalised&quot; state until the <code data-v-35c9cc73${_scopeId2}>PolicyIssued</code> / <code data-v-35c9cc73${_scopeId2}>Completed</code> events arrive. </li>`);
            } else {
              return [
                createVNode("li", null, [
                  createVNode("strong", null, "Handoff confirmation"),
                  createTextVNode(" — a short screen explaining the customer is being taken to the insurer\\'s secure payment page. Show the LFI brand so the customer recognises where they\\'re going. ")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "Return landing"),
                  createTextVNode(' — the LFI redirects the customer back to a URL you control after payment. Show a "your policy is being finalised" state until the '),
                  createVNode("code", null, "PolicyIssued"),
                  createTextVNode(" / "),
                  createVNode("code", null, "Completed"),
                  createTextVNode(" events arrive. ")
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdNote, {
          type: "warning",
          title: "Single-use URL"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<p data-v-35c9cc73${_scopeId2}> The <code data-v-35c9cc73${_scopeId2}>BrokerInstructions.Url</code> is single-use and time-bound. Do not store, log, or replay it. If the customer abandons and returns later, request a fresh URL from the LFI (typically via a new <code data-v-35c9cc73${_scopeId2}>PaymentRequired</code> event) rather than reusing the stale one. </p>`);
            } else {
              return [
                createVNode("p", null, [
                  createTextVNode(" The "),
                  createVNode("code", null, "BrokerInstructions.Url"),
                  createTextVNode(" is single-use and time-bound. Do not store, log, or replay it. If the customer abandons and returns later, request a fresh URL from the LFI (typically via a new "),
                  createVNode("code", null, "PaymentRequired"),
                  createTextVNode(" event) rather than reusing the stale one. ")
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
              createTextVNode(" After the LFI emits "),
              createVNode("code", null, "ApplicationApproved"),
              createTextVNode(" on the quote-log (delivered to your webhook or visible via polling), the event carries a "),
              createVNode("code", null, "BrokerInstructions.Url"),
              createTextVNode(". This is the LFI\\'s hosted payment page. Redirect the customer to it; payment is collected by the LFI. ")
            ]),
            _: 1
          }),
          createVNode("h3", { class: "ed-doc__subhead" }, "Screens in your app"),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, [
                createVNode("strong", null, "Handoff confirmation"),
                createTextVNode(" — a short screen explaining the customer is being taken to the insurer\\'s secure payment page. Show the LFI brand so the customer recognises where they\\'re going. ")
              ]),
              createVNode("li", null, [
                createVNode("strong", null, "Return landing"),
                createTextVNode(' — the LFI redirects the customer back to a URL you control after payment. Show a "your policy is being finalised" state until the '),
                createVNode("code", null, "PolicyIssued"),
                createTextVNode(" / "),
                createVNode("code", null, "Completed"),
                createTextVNode(" events arrive. ")
              ])
            ]),
            _: 1
          }),
          createVNode(_component_EdNote, {
            type: "warning",
            title: "Single-use URL"
          }, {
            default: withCtx(() => [
              createVNode("p", null, [
                createTextVNode(" The "),
                createVNode("code", null, "BrokerInstructions.Url"),
                createTextVNode(" is single-use and time-bound. Do not store, log, or replay it. If the customer abandons and returns later, request a fresh URL from the LFI (typically via a new "),
                createVNode("code", null, "PaymentRequired"),
                createTextVNode(" event) rather than reusing the stale one. ")
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
    id: "documents",
    num: "05",
    color: "var(--at-teal)",
    eyebrow: "Step 5 — Policy delivery",
    title: "Surface the policy and documents to the customer",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` On <code data-v-35c9cc73${_scopeId2}>PolicyIssued</code>, you receive the policy reference and (in TPP-Led mode) the full set of policy documents as base64-encoded <code data-v-35c9cc73${_scopeId2}>Documents</code> entries. Verify each document\\&#39;s SHA-256 hash, then present them to the customer. `);
            } else {
              return [
                createTextVNode(" On "),
                createVNode("code", null, "PolicyIssued"),
                createTextVNode(", you receive the policy reference and (in TPP-Led mode) the full set of policy documents as base64-encoded "),
                createVNode("code", null, "Documents"),
                createTextVNode(" entries. Verify each document\\'s SHA-256 hash, then present them to the customer. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 class="ed-doc__subhead" data-v-35c9cc73${_scopeId}>Screens in your app</h3>`);
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-35c9cc73${_scopeId2}><strong data-v-35c9cc73${_scopeId2}>Policy summary</strong> — the issued policy with key terms surfaced (sums insured, premium, coverage dates, beneficiaries). In LFI-Led mode you receive an <code data-v-35c9cc73${_scopeId2}>InsurancePolicyId</code>; in TPP-Led mode the documents themselves are authoritative. </li><li data-v-35c9cc73${_scopeId2}><strong data-v-35c9cc73${_scopeId2}>Document downloads</strong> — Policy Booklet, Terms &amp; Conditions, IPID, etc. Allow the customer to download each PDF and offer to email them on demand. </li><li data-v-35c9cc73${_scopeId2}><strong data-v-35c9cc73${_scopeId2}>Lifecycle hooks</strong> — surface &quot;manage your policy&quot; links that take the customer back to the LFI (or your own broker-of-record surface) for claims, mid-term adjustments, and renewal. </li>`);
            } else {
              return [
                createVNode("li", null, [
                  createVNode("strong", null, "Policy summary"),
                  createTextVNode(" — the issued policy with key terms surfaced (sums insured, premium, coverage dates, beneficiaries). In LFI-Led mode you receive an "),
                  createVNode("code", null, "InsurancePolicyId"),
                  createTextVNode("; in TPP-Led mode the documents themselves are authoritative. ")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "Document downloads"),
                  createTextVNode(" — Policy Booklet, Terms & Conditions, IPID, etc. Allow the customer to download each PDF and offer to email them on demand. ")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "Lifecycle hooks"),
                  createTextVNode(' — surface "manage your policy" links that take the customer back to the LFI (or your own broker-of-record surface) for claims, mid-term adjustments, and renewal. ')
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
              createTextVNode(" On "),
              createVNode("code", null, "PolicyIssued"),
              createTextVNode(", you receive the policy reference and (in TPP-Led mode) the full set of policy documents as base64-encoded "),
              createVNode("code", null, "Documents"),
              createTextVNode(" entries. Verify each document\\'s SHA-256 hash, then present them to the customer. ")
            ]),
            _: 1
          }),
          createVNode("h3", { class: "ed-doc__subhead" }, "Screens in your app"),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, [
                createVNode("strong", null, "Policy summary"),
                createTextVNode(" — the issued policy with key terms surfaced (sums insured, premium, coverage dates, beneficiaries). In LFI-Led mode you receive an "),
                createVNode("code", null, "InsurancePolicyId"),
                createTextVNode("; in TPP-Led mode the documents themselves are authoritative. ")
              ]),
              createVNode("li", null, [
                createVNode("strong", null, "Document downloads"),
                createTextVNode(" — Policy Booklet, Terms & Conditions, IPID, etc. Allow the customer to download each PDF and offer to email them on demand. ")
              ]),
              createVNode("li", null, [
                createVNode("strong", null, "Lifecycle hooks"),
                createTextVNode(' — surface "manage your policy" links that take the customer back to the LFI (or your own broker-of-record surface) for claims, mid-term adjustments, and renewal. ')
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/v2.1/insurance/quotation/user-journeys.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const userJourneys = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-35c9cc73"]]);
export {
  userJourneys as default
};
