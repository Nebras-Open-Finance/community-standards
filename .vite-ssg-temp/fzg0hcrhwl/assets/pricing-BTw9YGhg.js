import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_EdSectionBand = __unplugin_components_3;
  const _component_EdNote = __unplugin_components_7;
  const _component_EdProse = __unplugin_components_4;
  const _component_EdBullets = __unplugin_components_5;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-d4c3611f><section class="ed-doc__hero" data-v-d4c3611f><div class="ed-doc__inner" data-v-d4c3611f><div class="ed-doc__eyebrow" data-v-d4c3611f><span class="ed-doc__eyebrow-dash" data-v-d4c3611f></span> LFI · CAAP · Pricing </div><h1 class="ed-doc__title" data-v-d4c3611f> Pricing <span class="ed-doc__read" data-v-d4c3611f>2 min read</span></h1><p class="ed-doc__lede" data-v-d4c3611f> CAAP is a Nebras-operated service offered to LFIs as an alternative to building their own authentication, consent authorisation, and consent management interface. This page describes how CAAP is charged and what is included. </p></div></section>`);
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "commercials",
    num: "01",
    color: "var(--at-teal)",
    eyebrow: "Commercial terms",
    title: "To be confirmed",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdNote, {
          type: "warning",
          title: "Pricing not yet published"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<p data-v-d4c3611f${_scopeId2}> CAAP commercial terms are being finalised between Nebras and the participating LFIs. This page is a placeholder; the published pricing will appear here once agreed. In the meantime, LFIs evaluating CAAP should contact Nebras via the Service Desk for an indicative quote. </p>`);
            } else {
              return [
                createVNode("p", null, " CAAP commercial terms are being finalised between Nebras and the participating LFIs. This page is a placeholder; the published pricing will appear here once agreed. In the meantime, LFIs evaluating CAAP should contact Nebras via the Service Desk for an indicative quote. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdNote, {
            type: "warning",
            title: "Pricing not yet published"
          }, {
            default: withCtx(() => [
              createVNode("p", null, " CAAP commercial terms are being finalised between Nebras and the participating LFIs. This page is a placeholder; the published pricing will appear here once agreed. In the meantime, LFIs evaluating CAAP should contact Nebras via the Service Desk for an indicative quote. ")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "what-is-included",
    num: "02",
    color: "var(--at-gold)",
    eyebrow: "What CAAP includes",
    title: "Scope of the CAAP service",
    tone: "surface"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` For LFIs that adopt CAAP, the following are delivered by Nebras as part of the CAAP service: `);
            } else {
              return [
                createTextVNode(" For LFIs that adopt CAAP, the following are delivered by Nebras as part of the CAAP service: ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-d4c3611f${_scopeId2}>The end user-facing authentication and consent authorisation experience — web and (where applicable) mobile.</li><li data-v-d4c3611f${_scopeId2}>The end user-facing consent management interface, including consent review and revocation.</li><li data-v-d4c3611f${_scopeId2}>Integration with the API Hub&#39;s <a href="/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/" data-v-d4c3611f${_scopeId2}>Headless Heimdall</a> and <a href="/tech/lfi-api-hub/v2.1/api-hub/consent-manager/" data-v-d4c3611f${_scopeId2}>Consent Manager</a> — the LFI does not call these directly.</li><li data-v-d4c3611f${_scopeId2}>Language and accessibility support for the CAAP screens.</li><li data-v-d4c3611f${_scopeId2}>Operational support, monitoring, and incident management for the CAAP service.</li>`);
            } else {
              return [
                createVNode("li", null, "The end user-facing authentication and consent authorisation experience — web and (where applicable) mobile."),
                createVNode("li", null, "The end user-facing consent management interface, including consent review and revocation."),
                createVNode("li", null, [
                  createTextVNode("Integration with the API Hub's "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/" }, "Headless Heimdall"),
                  createTextVNode(" and "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/" }, "Consent Manager"),
                  createTextVNode(" — the LFI does not call these directly.")
                ]),
                createVNode("li", null, "Language and accessibility support for the CAAP screens."),
                createVNode("li", null, "Operational support, monitoring, and incident management for the CAAP service.")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" For LFIs that adopt CAAP, the following are delivered by Nebras as part of the CAAP service: ")
            ]),
            _: 1
          }),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, "The end user-facing authentication and consent authorisation experience — web and (where applicable) mobile."),
              createVNode("li", null, "The end user-facing consent management interface, including consent review and revocation."),
              createVNode("li", null, [
                createTextVNode("Integration with the API Hub's "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/" }, "Headless Heimdall"),
                createTextVNode(" and "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/" }, "Consent Manager"),
                createTextVNode(" — the LFI does not call these directly.")
              ]),
              createVNode("li", null, "Language and accessibility support for the CAAP screens."),
              createVNode("li", null, "Operational support, monitoring, and incident management for the CAAP service.")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "what-is-not-included",
    num: "03",
    color: "var(--at-blue-deep, #1d4ed8)",
    eyebrow: "What CAAP does not include",
    title: "Still the LFI's responsibility",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` CAAP does not change the LFI&#39;s responsibility to deliver the Ozone Connect APIs that underpin the Open Finance services it offers to TPPs. The following remain in scope for the LFI regardless of whether CAAP is adopted: `);
            } else {
              return [
                createTextVNode(" CAAP does not change the LFI's responsibility to deliver the Ozone Connect APIs that underpin the Open Finance services it offers to TPPs. The following remain in scope for the LFI regardless of whether CAAP is adopted: ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-d4c3611f${_scopeId2}>The Ozone Connect endpoints for <a href="/tech/lfi-api-hub/v2.1/banking/data-sharing/" data-v-d4c3611f${_scopeId2}>Bank Data Sharing</a>, <a href="/tech/lfi-api-hub/v2.1/banking/service-initiation/" data-v-d4c3611f${_scopeId2}>Bank Service Initiation</a>, <a href="/tech/lfi-api-hub/v2.1/insurance/" data-v-d4c3611f${_scopeId2}>Insurance Data Sharing</a>, Products &amp; Leads, Confirmation of Payee, and ATMs.</li><li data-v-d4c3611f${_scopeId2}>The LFI&#39;s <a href="/tech/lfi-api-hub/v2.1/consent-events" data-v-d4c3611f${_scopeId2}>Consent Events</a> handlers for receiving consent lifecycle notifications from the API Hub.</li><li data-v-d4c3611f${_scopeId2}>The new <strong data-v-d4c3611f${_scopeId2}>CAAP Operations</strong> endpoints documented in this section — user verification, registration, PII decryption, consent validation, and the CAAP-specific accounts and insurance policy GETs.</li><li data-v-d4c3611f${_scopeId2}>Underlying LFI infrastructure: authentication systems, customer records, account systems, payment rails, fraud and risk checks.</li>`);
            } else {
              return [
                createVNode("li", null, [
                  createTextVNode("The Ozone Connect endpoints for "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/" }, "Bank Data Sharing"),
                  createTextVNode(", "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/service-initiation/" }, "Bank Service Initiation"),
                  createTextVNode(", "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/insurance/" }, "Insurance Data Sharing"),
                  createTextVNode(", Products & Leads, Confirmation of Payee, and ATMs.")
                ]),
                createVNode("li", null, [
                  createTextVNode("The LFI's "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/consent-events" }, "Consent Events"),
                  createTextVNode(" handlers for receiving consent lifecycle notifications from the API Hub.")
                ]),
                createVNode("li", null, [
                  createTextVNode("The new "),
                  createVNode("strong", null, "CAAP Operations"),
                  createTextVNode(" endpoints documented in this section — user verification, registration, PII decryption, consent validation, and the CAAP-specific accounts and insurance policy GETs.")
                ]),
                createVNode("li", null, "Underlying LFI infrastructure: authentication systems, customer records, account systems, payment rails, fraud and risk checks.")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" CAAP does not change the LFI's responsibility to deliver the Ozone Connect APIs that underpin the Open Finance services it offers to TPPs. The following remain in scope for the LFI regardless of whether CAAP is adopted: ")
            ]),
            _: 1
          }),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, [
                createTextVNode("The Ozone Connect endpoints for "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/" }, "Bank Data Sharing"),
                createTextVNode(", "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/service-initiation/" }, "Bank Service Initiation"),
                createTextVNode(", "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/insurance/" }, "Insurance Data Sharing"),
                createTextVNode(", Products & Leads, Confirmation of Payee, and ATMs.")
              ]),
              createVNode("li", null, [
                createTextVNode("The LFI's "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/consent-events" }, "Consent Events"),
                createTextVNode(" handlers for receiving consent lifecycle notifications from the API Hub.")
              ]),
              createVNode("li", null, [
                createTextVNode("The new "),
                createVNode("strong", null, "CAAP Operations"),
                createTextVNode(" endpoints documented in this section — user verification, registration, PII decryption, consent validation, and the CAAP-specific accounts and insurance policy GETs.")
              ]),
              createVNode("li", null, "Underlying LFI infrastructure: authentication systems, customer records, account systems, payment rails, fraud and risk checks.")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "next-steps",
    num: "04",
    color: "var(--at-navy)",
    eyebrow: "Next steps",
    title: "Indicating CAAP adoption",
    tone: "surface"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` LFIs declare whether they intend to adopt CAAP when completing the <a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/prerequisites" data-v-d4c3611f${_scopeId2}>Prerequisites Questionnaire</a>. Reach out via the Service Desk to discuss commercials and the implementation plan for the CAAP Operations APIs. `);
            } else {
              return [
                createTextVNode(" LFIs declare whether they intend to adopt CAAP when completing the "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/prerequisites" }, "Prerequisites Questionnaire"),
                createTextVNode(". Reach out via the Service Desk to discuss commercials and the implementation plan for the CAAP Operations APIs. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" LFIs declare whether they intend to adopt CAAP when completing the "),
              createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/prerequisites" }, "Prerequisites Questionnaire"),
              createTextVNode(". Reach out via the Service Desk to discuss commercials and the implementation plan for the CAAP Operations APIs. ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/v2.1/caap/pricing.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const pricing = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-d4c3611f"]]);
export {
  pricing as default
};
