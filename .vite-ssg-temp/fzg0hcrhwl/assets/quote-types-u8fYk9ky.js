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
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-fde5cad7><section class="ed-doc__hero" data-v-fde5cad7><div class="ed-doc__inner" data-v-fde5cad7><div class="ed-doc__eyebrow" data-v-fde5cad7><span class="ed-doc__eyebrow-dash" data-v-fde5cad7></span> Insurance · Quotation · Shared explainer </div><h1 class="ed-doc__title" data-v-fde5cad7> Quote Types <span class="ed-doc__read" data-v-fde5cad7>4 min read</span></h1><p class="ed-doc__lede" data-v-fde5cad7> Every quote request carries a <code data-v-fde5cad7>QuoteType</code> of <code data-v-fde5cad7>New</code>, <code data-v-fde5cad7>Renewal</code>, or <code data-v-fde5cad7>Switch</code>. The three values determine what data the TPP MUST supply, what the LFI MAY assume about the customer, and how the resulting policy relates to any prior policy. This page is the single source of truth referenced from both the LFI Integration Guide and TPP Standards. </p></div></section>`);
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "new",
    num: "01",
    color: "var(--at-teal)",
    eyebrow: "QuoteType: New",
    title: "New — first-time policy",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` The customer has no existing policy of this sector that the quote is intended to replace or continue. The TPP supplies the customer\\&#39;s demographic and risk-relevant data inline; the LFI underwrites from scratch. `);
            } else {
              return [
                createTextVNode(" The customer has no existing policy of this sector that the quote is intended to replace or continue. The TPP supplies the customer\\'s demographic and risk-relevant data inline; the LFI underwrites from scratch. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 class="ed-doc__subhead" data-v-fde5cad7${_scopeId}>What the TPP must supply</h3>`);
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-fde5cad7${_scopeId2}> A unique <code data-v-fde5cad7${_scopeId2}>QuoteReference</code> — TPP-generated, used by the TPP to thread the quote through its own systems. Distinct from <code data-v-fde5cad7${_scopeId2}>QuoteId</code>, which the LFI mints. </li><li data-v-fde5cad7${_scopeId2}> Sector-specific risk data (vehicle for Motor, property address for Home, trip details for Travel, salary band for Health, etc.). </li><li data-v-fde5cad7${_scopeId2}> Customer identifying data sufficient for the LFI to KYC and underwrite (Emirates ID, date of birth, etc.). </li>`);
            } else {
              return [
                createVNode("li", null, [
                  createTextVNode(" A unique "),
                  createVNode("code", null, "QuoteReference"),
                  createTextVNode(" — TPP-generated, used by the TPP to thread the quote through its own systems. Distinct from "),
                  createVNode("code", null, "QuoteId"),
                  createTextVNode(", which the LFI mints. ")
                ]),
                createVNode("li", null, " Sector-specific risk data (vehicle for Motor, property address for Home, trip details for Travel, salary band for Health, etc.). "),
                createVNode("li", null, " Customer identifying data sufficient for the LFI to KYC and underwrite (Emirates ID, date of birth, etc.). ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 class="ed-doc__subhead" data-v-fde5cad7${_scopeId}>What the LFI may assume</h3>`);
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-fde5cad7${_scopeId2}>No prior policy history with this LFI for this customer at this sector.</li><li data-v-fde5cad7${_scopeId2}> The LFI MUST run its full new-business underwriting process — risk scoring, screening, pricing — from the supplied data alone. </li>`);
            } else {
              return [
                createVNode("li", null, "No prior policy history with this LFI for this customer at this sector."),
                createVNode("li", null, " The LFI MUST run its full new-business underwriting process — risk scoring, screening, pricing — from the supplied data alone. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" The customer has no existing policy of this sector that the quote is intended to replace or continue. The TPP supplies the customer\\'s demographic and risk-relevant data inline; the LFI underwrites from scratch. ")
            ]),
            _: 1
          }),
          createVNode("h3", { class: "ed-doc__subhead" }, "What the TPP must supply"),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, [
                createTextVNode(" A unique "),
                createVNode("code", null, "QuoteReference"),
                createTextVNode(" — TPP-generated, used by the TPP to thread the quote through its own systems. Distinct from "),
                createVNode("code", null, "QuoteId"),
                createTextVNode(", which the LFI mints. ")
              ]),
              createVNode("li", null, " Sector-specific risk data (vehicle for Motor, property address for Home, trip details for Travel, salary band for Health, etc.). "),
              createVNode("li", null, " Customer identifying data sufficient for the LFI to KYC and underwrite (Emirates ID, date of birth, etc.). ")
            ]),
            _: 1
          }),
          createVNode("h3", { class: "ed-doc__subhead" }, "What the LFI may assume"),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, "No prior policy history with this LFI for this customer at this sector."),
              createVNode("li", null, " The LFI MUST run its full new-business underwriting process — risk scoring, screening, pricing — from the supplied data alone. ")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "renewal",
    num: "02",
    color: "var(--at-gold, #b08800)",
    eyebrow: "QuoteType: Renewal",
    title: "Renewal — continuing with the same insurer",
    tone: "surface"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` The customer holds an existing policy with <strong data-v-fde5cad7${_scopeId2}>this LFI</strong> at the same sector and wishes to renew it. The TPP references the prior policy so the LFI can carry forward underwriting context (no-claims discount, established risk profile, customer history) rather than re-underwriting from scratch. `);
            } else {
              return [
                createTextVNode(" The customer holds an existing policy with "),
                createVNode("strong", null, "this LFI"),
                createTextVNode(" at the same sector and wishes to renew it. The TPP references the prior policy so the LFI can carry forward underwriting context (no-claims discount, established risk profile, customer history) rather than re-underwriting from scratch. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 class="ed-doc__subhead" data-v-fde5cad7${_scopeId}>What the TPP must supply</h3>`);
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-fde5cad7${_scopeId2}> The <code data-v-fde5cad7${_scopeId2}>InsurancePolicyId</code> of the prior policy at this LFI, retrieved through Insurance Data Sharing under a customer consent. The TPP MUST have held a valid consent at the time of the policy retrieval — the LFI MAY refuse to renew where it cannot evidence prior data sharing. </li><li data-v-fde5cad7${_scopeId2}> Any data the customer wishes to update at renewal (address change, vehicle change, beneficiary update, etc.). </li><li data-v-fde5cad7${_scopeId2}> The same <code data-v-fde5cad7${_scopeId2}>QuoteReference</code> shape as for <code data-v-fde5cad7${_scopeId2}>New</code>. </li>`);
            } else {
              return [
                createVNode("li", null, [
                  createTextVNode(" The "),
                  createVNode("code", null, "InsurancePolicyId"),
                  createTextVNode(" of the prior policy at this LFI, retrieved through Insurance Data Sharing under a customer consent. The TPP MUST have held a valid consent at the time of the policy retrieval — the LFI MAY refuse to renew where it cannot evidence prior data sharing. ")
                ]),
                createVNode("li", null, " Any data the customer wishes to update at renewal (address change, vehicle change, beneficiary update, etc.). "),
                createVNode("li", null, [
                  createTextVNode(" The same "),
                  createVNode("code", null, "QuoteReference"),
                  createTextVNode(" shape as for "),
                  createVNode("code", null, "New"),
                  createTextVNode(". ")
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 class="ed-doc__subhead" data-v-fde5cad7${_scopeId}>What the LFI may assume</h3>`);
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-fde5cad7${_scopeId2}>The customer is already known — KYC may be lighter-touch.</li><li data-v-fde5cad7${_scopeId2}> The prior policy\\&#39;s claims history, no-claims discount, and risk rating may be carried forward where appropriate. </li><li data-v-fde5cad7${_scopeId2}> The LFI MAY decline to renew where its underwriting appetite has changed — <code data-v-fde5cad7${_scopeId2}>204</code> is the correct response, not a <code data-v-fde5cad7${_scopeId2}>201</code> with adverse pricing. </li>`);
            } else {
              return [
                createVNode("li", null, "The customer is already known — KYC may be lighter-touch."),
                createVNode("li", null, " The prior policy\\'s claims history, no-claims discount, and risk rating may be carried forward where appropriate. "),
                createVNode("li", null, [
                  createTextVNode(" The LFI MAY decline to renew where its underwriting appetite has changed — "),
                  createVNode("code", null, "204"),
                  createTextVNode(" is the correct response, not a "),
                  createVNode("code", null, "201"),
                  createTextVNode(" with adverse pricing. ")
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdNote, {
          type: "info",
          title: "Renewal vs Switch"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<p data-v-fde5cad7${_scopeId2}><code data-v-fde5cad7${_scopeId2}>Renewal</code> always references a policy held at <strong data-v-fde5cad7${_scopeId2}>this LFI</strong>. If the customer is moving from a different insurer, the correct <code data-v-fde5cad7${_scopeId2}>QuoteType</code> is <code data-v-fde5cad7${_scopeId2}>Switch</code>. </p>`);
            } else {
              return [
                createVNode("p", null, [
                  createVNode("code", null, "Renewal"),
                  createTextVNode(" always references a policy held at "),
                  createVNode("strong", null, "this LFI"),
                  createTextVNode(". If the customer is moving from a different insurer, the correct "),
                  createVNode("code", null, "QuoteType"),
                  createTextVNode(" is "),
                  createVNode("code", null, "Switch"),
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
              createTextVNode(" The customer holds an existing policy with "),
              createVNode("strong", null, "this LFI"),
              createTextVNode(" at the same sector and wishes to renew it. The TPP references the prior policy so the LFI can carry forward underwriting context (no-claims discount, established risk profile, customer history) rather than re-underwriting from scratch. ")
            ]),
            _: 1
          }),
          createVNode("h3", { class: "ed-doc__subhead" }, "What the TPP must supply"),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, [
                createTextVNode(" The "),
                createVNode("code", null, "InsurancePolicyId"),
                createTextVNode(" of the prior policy at this LFI, retrieved through Insurance Data Sharing under a customer consent. The TPP MUST have held a valid consent at the time of the policy retrieval — the LFI MAY refuse to renew where it cannot evidence prior data sharing. ")
              ]),
              createVNode("li", null, " Any data the customer wishes to update at renewal (address change, vehicle change, beneficiary update, etc.). "),
              createVNode("li", null, [
                createTextVNode(" The same "),
                createVNode("code", null, "QuoteReference"),
                createTextVNode(" shape as for "),
                createVNode("code", null, "New"),
                createTextVNode(". ")
              ])
            ]),
            _: 1
          }),
          createVNode("h3", { class: "ed-doc__subhead" }, "What the LFI may assume"),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, "The customer is already known — KYC may be lighter-touch."),
              createVNode("li", null, " The prior policy\\'s claims history, no-claims discount, and risk rating may be carried forward where appropriate. "),
              createVNode("li", null, [
                createTextVNode(" The LFI MAY decline to renew where its underwriting appetite has changed — "),
                createVNode("code", null, "204"),
                createTextVNode(" is the correct response, not a "),
                createVNode("code", null, "201"),
                createTextVNode(" with adverse pricing. ")
              ])
            ]),
            _: 1
          }),
          createVNode(_component_EdNote, {
            type: "info",
            title: "Renewal vs Switch"
          }, {
            default: withCtx(() => [
              createVNode("p", null, [
                createVNode("code", null, "Renewal"),
                createTextVNode(" always references a policy held at "),
                createVNode("strong", null, "this LFI"),
                createTextVNode(". If the customer is moving from a different insurer, the correct "),
                createVNode("code", null, "QuoteType"),
                createTextVNode(" is "),
                createVNode("code", null, "Switch"),
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
    id: "switch",
    num: "03",
    color: "var(--at-violet, #6d28d9)",
    eyebrow: "QuoteType: Switch",
    title: "Switch — moving from a different insurer",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` The customer holds an existing policy at a <strong data-v-fde5cad7${_scopeId2}>different LFI</strong> (the incumbent) and wishes to move. The TPP supplies enough information about the incumbent policy for the LFI to price competitively and, where applicable, coordinate the switch (handing back NCD, avoiding double-coverage). `);
            } else {
              return [
                createTextVNode(" The customer holds an existing policy at a "),
                createVNode("strong", null, "different LFI"),
                createTextVNode(" (the incumbent) and wishes to move. The TPP supplies enough information about the incumbent policy for the LFI to price competitively and, where applicable, coordinate the switch (handing back NCD, avoiding double-coverage). ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 class="ed-doc__subhead" data-v-fde5cad7${_scopeId}>What the TPP must supply</h3>`);
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-fde5cad7${_scopeId2}> The incumbent policy\\&#39;s details — insurer name, policy number, sums insured, premium, renewal date — retrieved through Insurance Data Sharing against the incumbent under a customer consent. </li><li data-v-fde5cad7${_scopeId2}> The customer\\&#39;s demographic and risk data, the same way as for <code data-v-fde5cad7${_scopeId2}>New</code>. Switching does not exempt the new LFI from underwriting. </li><li data-v-fde5cad7${_scopeId2}> Any switch-specific instructions (effective date, overlap window). </li>`);
            } else {
              return [
                createVNode("li", null, " The incumbent policy\\'s details — insurer name, policy number, sums insured, premium, renewal date — retrieved through Insurance Data Sharing against the incumbent under a customer consent. "),
                createVNode("li", null, [
                  createTextVNode(" The customer\\'s demographic and risk data, the same way as for "),
                  createVNode("code", null, "New"),
                  createTextVNode(". Switching does not exempt the new LFI from underwriting. ")
                ]),
                createVNode("li", null, " Any switch-specific instructions (effective date, overlap window). ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 class="ed-doc__subhead" data-v-fde5cad7${_scopeId}>What the LFI may assume</h3>`);
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-fde5cad7${_scopeId2}> Claims history from the incumbent is <strong data-v-fde5cad7${_scopeId2}>declared</strong>, not authoritative — the LFI MUST run its own screening and, where required, request additional declarations. </li><li data-v-fde5cad7${_scopeId2}> The incumbent policy is not yet cancelled. The LFI MAY make policy issuance contingent on the customer cancelling the incumbent within the policy effective date. </li>`);
            } else {
              return [
                createVNode("li", null, [
                  createTextVNode(" Claims history from the incumbent is "),
                  createVNode("strong", null, "declared"),
                  createTextVNode(", not authoritative — the LFI MUST run its own screening and, where required, request additional declarations. ")
                ]),
                createVNode("li", null, " The incumbent policy is not yet cancelled. The LFI MAY make policy issuance contingent on the customer cancelling the incumbent within the policy effective date. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" The customer holds an existing policy at a "),
              createVNode("strong", null, "different LFI"),
              createTextVNode(" (the incumbent) and wishes to move. The TPP supplies enough information about the incumbent policy for the LFI to price competitively and, where applicable, coordinate the switch (handing back NCD, avoiding double-coverage). ")
            ]),
            _: 1
          }),
          createVNode("h3", { class: "ed-doc__subhead" }, "What the TPP must supply"),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, " The incumbent policy\\'s details — insurer name, policy number, sums insured, premium, renewal date — retrieved through Insurance Data Sharing against the incumbent under a customer consent. "),
              createVNode("li", null, [
                createTextVNode(" The customer\\'s demographic and risk data, the same way as for "),
                createVNode("code", null, "New"),
                createTextVNode(". Switching does not exempt the new LFI from underwriting. ")
              ]),
              createVNode("li", null, " Any switch-specific instructions (effective date, overlap window). ")
            ]),
            _: 1
          }),
          createVNode("h3", { class: "ed-doc__subhead" }, "What the LFI may assume"),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, [
                createTextVNode(" Claims history from the incumbent is "),
                createVNode("strong", null, "declared"),
                createTextVNode(", not authoritative — the LFI MUST run its own screening and, where required, request additional declarations. ")
              ]),
              createVNode("li", null, " The incumbent policy is not yet cancelled. The LFI MAY make policy issuance contingent on the customer cancelling the incumbent within the policy effective date. ")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "declining",
    num: "04",
    color: "var(--at-navy)",
    eyebrow: "Declining to quote",
    title: "When the LFI cannot fulfil the requested QuoteType",
    tone: "surface"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` If the LFI does not offer a particular combination of sector and quote type (e.g. switching is not supported for Travel, or the LFI does not renew expired policies older than 30 days), the Create Quote endpoint MUST return <code data-v-fde5cad7${_scopeId2}>204</code> with an empty body. <strong data-v-fde5cad7${_scopeId2}>Do not return <code data-v-fde5cad7${_scopeId2}>201</code> with no quotes</strong> — a <code data-v-fde5cad7${_scopeId2}>201</code> implies success and breaks the TPP\\&#39;s ability to surface a &quot;no quote available&quot; outcome cleanly to the customer. `);
            } else {
              return [
                createTextVNode(" If the LFI does not offer a particular combination of sector and quote type (e.g. switching is not supported for Travel, or the LFI does not renew expired policies older than 30 days), the Create Quote endpoint MUST return "),
                createVNode("code", null, "204"),
                createTextVNode(" with an empty body. "),
                createVNode("strong", null, [
                  createTextVNode("Do not return "),
                  createVNode("code", null, "201"),
                  createTextVNode(" with no quotes")
                ]),
                createTextVNode(" — a "),
                createVNode("code", null, "201"),
                createTextVNode(` implies success and breaks the TPP\\'s ability to surface a "no quote available" outcome cleanly to the customer. `)
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` The set of supported sector + quote type combinations SHOULD be published in the LFI\\&#39;s Trust Framework metadata so TPPs can predict declines rather than discovering them via 204 responses. `);
            } else {
              return [
                createTextVNode(" The set of supported sector + quote type combinations SHOULD be published in the LFI\\'s Trust Framework metadata so TPPs can predict declines rather than discovering them via 204 responses. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" If the LFI does not offer a particular combination of sector and quote type (e.g. switching is not supported for Travel, or the LFI does not renew expired policies older than 30 days), the Create Quote endpoint MUST return "),
              createVNode("code", null, "204"),
              createTextVNode(" with an empty body. "),
              createVNode("strong", null, [
                createTextVNode("Do not return "),
                createVNode("code", null, "201"),
                createTextVNode(" with no quotes")
              ]),
              createTextVNode(" — a "),
              createVNode("code", null, "201"),
              createTextVNode(` implies success and breaks the TPP\\'s ability to surface a "no quote available" outcome cleanly to the customer. `)
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" The set of supported sector + quote type combinations SHOULD be published in the LFI\\'s Trust Framework metadata so TPPs can predict declines rather than discovering them via 204 responses. ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/v2.1/insurance/quotation/quote-types.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const quoteTypes = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-fde5cad7"]]);
export {
  quoteTypes as default
};
