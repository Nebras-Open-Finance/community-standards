import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { I as ImageViewer } from "./ImageViewer-DmHTopUf.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
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
  const _component_EdNote = __unplugin_components_7;
  const _component_ImageViewer = ImageViewer;
  const _component_EdBullets = __unplugin_components_5;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-76b19295><section class="ed-doc__hero" data-v-76b19295><div class="ed-doc__inner" data-v-76b19295><div class="ed-doc__eyebrow" data-v-76b19295><span class="ed-doc__eyebrow-dash" data-v-76b19295></span> LFI · CAAP · User Experience </div><h1 class="ed-doc__title" data-v-76b19295> User Experience <span class="ed-doc__read" data-v-76b19295>5 min read</span></h1><p class="ed-doc__lede" data-v-76b19295> When an LFI adopts CAAP, the end user&#39;s authentication and consent authorisation experience is delivered by CAAP — not by an LFI-operated application. This page describes what the end user sees, where the LFI is still on the path, and what is and is not the LFI&#39;s responsibility across the journey. </p></div></section>`);
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "entry",
    num: "01",
    color: "var(--at-teal)",
    eyebrow: "Entry to the journey",
    title: "From the TPP to CAAP, via the API Hub",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` The journey starts in the TPP application. After the TPP requests a consent via <code data-v-76b19295${_scopeId2}>POST /par</code> against the API Hub, the TPP redirects the end user to the API Hub authorization endpoint with the returned <code data-v-76b19295${_scopeId2}>request_uri</code>. From there, the API Hub redirects the end user into CAAP for authentication and consent approval. `);
            } else {
              return [
                createTextVNode(" The journey starts in the TPP application. After the TPP requests a consent via "),
                createVNode("code", null, "POST /par"),
                createTextVNode(" against the API Hub, the TPP redirects the end user to the API Hub authorization endpoint with the returned "),
                createVNode("code", null, "request_uri"),
                createTextVNode(". From there, the API Hub redirects the end user into CAAP for authentication and consent approval. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdNote, {
          type: "info",
          title: "What changes vs. an LFI-operated auth endpoint"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<p data-v-76b19295${_scopeId2}> Without CAAP, the API Hub redirects the end user to the LFI&#39;s <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/environment-specific/auth-endpoint" data-v-76b19295${_scopeId2}>Authorization Endpoint</a>, and the LFI authenticates and authorises the end user using its own mobile app or web journey, calling Headless Heimdall and the Consent Manager. With CAAP, the API Hub redirects to CAAP, and the LFI no longer operates that experience. </p>`);
            } else {
              return [
                createVNode("p", null, [
                  createTextVNode(" Without CAAP, the API Hub redirects the end user to the LFI's "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/environment-specific/auth-endpoint" }, "Authorization Endpoint"),
                  createTextVNode(", and the LFI authenticates and authorises the end user using its own mobile app or web journey, calling Headless Heimdall and the Consent Manager. With CAAP, the API Hub redirects to CAAP, and the LFI no longer operates that experience. ")
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
              createTextVNode(" The journey starts in the TPP application. After the TPP requests a consent via "),
              createVNode("code", null, "POST /par"),
              createTextVNode(" against the API Hub, the TPP redirects the end user to the API Hub authorization endpoint with the returned "),
              createVNode("code", null, "request_uri"),
              createTextVNode(". From there, the API Hub redirects the end user into CAAP for authentication and consent approval. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdNote, {
            type: "info",
            title: "What changes vs. an LFI-operated auth endpoint"
          }, {
            default: withCtx(() => [
              createVNode("p", null, [
                createTextVNode(" Without CAAP, the API Hub redirects the end user to the LFI's "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/environment-specific/auth-endpoint" }, "Authorization Endpoint"),
                createTextVNode(", and the LFI authenticates and authorises the end user using its own mobile app or web journey, calling Headless Heimdall and the Consent Manager. With CAAP, the API Hub redirects to CAAP, and the LFI no longer operates that experience. ")
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
    id: "end-to-end",
    num: "02",
    color: "var(--at-gold)",
    eyebrow: "End-to-end experience",
    title: "What the end user sees, screen by screen",
    tone: "surface"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` The image below shows the full end user experience after the TPP creates the consent and the API Hub redirects the end user to a CAAP-using LFI — from EFR / UAE Pass authentication, through OTP and consent review, to the authorization page itself. `);
            } else {
              return [
                createTextVNode(" The image below shows the full end user experience after the TPP creates the consent and the API Hub redirects the end user to a CAAP-using LFI — from EFR / UAE Pass authentication, through OTP and consent review, to the authorization page itself. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_ImageViewer, {
          src: "/images/journeys/caap.png",
          alt: "CAAP end-to-end end user journey: authentication, OTP challenge, consent review, account selection, and authorisation",
          caption: "CAAP end-to-end end user journey. The authorization page shown is the Bank Data Sharing variant."
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdNote, {
          type: "info",
          title: "Other consent types adjust the authorization page"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<p data-v-76b19295${_scopeId2}> The authorization page shown is the <strong data-v-76b19295${_scopeId2}>Bank Data Sharing</strong> variant. CAAP renders a different authorization page for each consent type — the same surrounding journey (authenticate, register, review, confirm), with a layout suited to what the end user is consenting to. For comparison, see the equivalent journeys for <a href="/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/domestic-payments/single-instant-payment/user-journeys" data-v-76b19295${_scopeId2}>Bank Service Initiation</a> and <a href="/tech/lfi-api-hub/v2.2-rc1/insurance/data-sharing/user-journeys" data-v-76b19295${_scopeId2}>Insurance Data Sharing</a>. </p>`);
            } else {
              return [
                createVNode("p", null, [
                  createTextVNode(" The authorization page shown is the "),
                  createVNode("strong", null, "Bank Data Sharing"),
                  createTextVNode(" variant. CAAP renders a different authorization page for each consent type — the same surrounding journey (authenticate, register, review, confirm), with a layout suited to what the end user is consenting to. For comparison, see the equivalent journeys for "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/domestic-payments/single-instant-payment/user-journeys" }, "Bank Service Initiation"),
                  createTextVNode(" and "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/insurance/data-sharing/user-journeys" }, "Insurance Data Sharing"),
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
              createTextVNode(" The image below shows the full end user experience after the TPP creates the consent and the API Hub redirects the end user to a CAAP-using LFI — from EFR / UAE Pass authentication, through OTP and consent review, to the authorization page itself. ")
            ]),
            _: 1
          }),
          createVNode(_component_ImageViewer, {
            src: "/images/journeys/caap.png",
            alt: "CAAP end-to-end end user journey: authentication, OTP challenge, consent review, account selection, and authorisation",
            caption: "CAAP end-to-end end user journey. The authorization page shown is the Bank Data Sharing variant."
          }),
          createVNode(_component_EdNote, {
            type: "info",
            title: "Other consent types adjust the authorization page"
          }, {
            default: withCtx(() => [
              createVNode("p", null, [
                createTextVNode(" The authorization page shown is the "),
                createVNode("strong", null, "Bank Data Sharing"),
                createTextVNode(" variant. CAAP renders a different authorization page for each consent type — the same surrounding journey (authenticate, register, review, confirm), with a layout suited to what the end user is consenting to. For comparison, see the equivalent journeys for "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/domestic-payments/single-instant-payment/user-journeys" }, "Bank Service Initiation"),
                createTextVNode(" and "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/insurance/data-sharing/user-journeys" }, "Insurance Data Sharing"),
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
    id: "caap-screens",
    num: "03",
    color: "var(--at-blue-deep, #1d4ed8)",
    eyebrow: "What the end user sees",
    title: "The CAAP-side screens",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` CAAP renders a consistent authentication and consent journey across LFIs that adopt it. The end user progresses through the following stages: `);
            } else {
              return [
                createTextVNode(" CAAP renders a consistent authentication and consent journey across LFIs that adopt it. The end user progresses through the following stages: ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-76b19295${_scopeId2}><strong data-v-76b19295${_scopeId2}>Identify.</strong> The end user provides identifying details (e.g. Emirates ID or other LFI-recognised identifiers).</li><li data-v-76b19295${_scopeId2}><strong data-v-76b19295${_scopeId2}>Challenge.</strong> CAAP issues a challenge against the LFI — calling the LFI&#39;s <code data-v-76b19295${_scopeId2}>/users/actions/challenge/initialize</code> and <code data-v-76b19295${_scopeId2}>/users/actions/challenge/complete</code> CAAP Operations endpoints — so the LFI&#39;s authentication system verifies the end user.</li><li data-v-76b19295${_scopeId2}><strong data-v-76b19295${_scopeId2}>Review consent.</strong> CAAP displays the requested consent (permissions, expiry, accounts, payment details where applicable). For consents carrying encrypted PII, CAAP calls the LFI&#39;s <code data-v-76b19295${_scopeId2}>/users/actions/pii/decrypt</code> endpoint to display cleartext to the end user.</li><li data-v-76b19295${_scopeId2}><strong data-v-76b19295${_scopeId2}>Select accounts or policies.</strong> Where the consent requires selecting accounts or insurance policies, CAAP retrieves them via the LFI&#39;s CAAP-specific <code data-v-76b19295${_scopeId2}>/accounts</code>, <code data-v-76b19295${_scopeId2}>/accounts/{accountId}</code>, and <code data-v-76b19295${_scopeId2}>/{type}-insurance-policies</code> endpoints.</li><li data-v-76b19295${_scopeId2}><strong data-v-76b19295${_scopeId2}>Validate.</strong> Before completion, CAAP calls the LFI&#39;s <code data-v-76b19295${_scopeId2}>/consent/actions/validate</code> endpoint. If validation fails, the journey ends with the user-facing message returned by the LFI.</li><li data-v-76b19295${_scopeId2}><strong data-v-76b19295${_scopeId2}>Confirm.</strong> The end user confirms the consent; CAAP completes the interaction with the API Hub, and the API Hub redirects the end user back to the TPP.</li>`);
            } else {
              return [
                createVNode("li", null, [
                  createVNode("strong", null, "Identify."),
                  createTextVNode(" The end user provides identifying details (e.g. Emirates ID or other LFI-recognised identifiers).")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "Challenge."),
                  createTextVNode(" CAAP issues a challenge against the LFI — calling the LFI's "),
                  createVNode("code", null, "/users/actions/challenge/initialize"),
                  createTextVNode(" and "),
                  createVNode("code", null, "/users/actions/challenge/complete"),
                  createTextVNode(" CAAP Operations endpoints — so the LFI's authentication system verifies the end user.")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "Review consent."),
                  createTextVNode(" CAAP displays the requested consent (permissions, expiry, accounts, payment details where applicable). For consents carrying encrypted PII, CAAP calls the LFI's "),
                  createVNode("code", null, "/users/actions/pii/decrypt"),
                  createTextVNode(" endpoint to display cleartext to the end user.")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "Select accounts or policies."),
                  createTextVNode(" Where the consent requires selecting accounts or insurance policies, CAAP retrieves them via the LFI's CAAP-specific "),
                  createVNode("code", null, "/accounts"),
                  createTextVNode(", "),
                  createVNode("code", null, "/accounts/{accountId}"),
                  createTextVNode(", and "),
                  createVNode("code", null, "/{type}-insurance-policies"),
                  createTextVNode(" endpoints.")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "Validate."),
                  createTextVNode(" Before completion, CAAP calls the LFI's "),
                  createVNode("code", null, "/consent/actions/validate"),
                  createTextVNode(" endpoint. If validation fails, the journey ends with the user-facing message returned by the LFI.")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "Confirm."),
                  createTextVNode(" The end user confirms the consent; CAAP completes the interaction with the API Hub, and the API Hub redirects the end user back to the TPP.")
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
              createTextVNode(" CAAP renders a consistent authentication and consent journey across LFIs that adopt it. The end user progresses through the following stages: ")
            ]),
            _: 1
          }),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, [
                createVNode("strong", null, "Identify."),
                createTextVNode(" The end user provides identifying details (e.g. Emirates ID or other LFI-recognised identifiers).")
              ]),
              createVNode("li", null, [
                createVNode("strong", null, "Challenge."),
                createTextVNode(" CAAP issues a challenge against the LFI — calling the LFI's "),
                createVNode("code", null, "/users/actions/challenge/initialize"),
                createTextVNode(" and "),
                createVNode("code", null, "/users/actions/challenge/complete"),
                createTextVNode(" CAAP Operations endpoints — so the LFI's authentication system verifies the end user.")
              ]),
              createVNode("li", null, [
                createVNode("strong", null, "Review consent."),
                createTextVNode(" CAAP displays the requested consent (permissions, expiry, accounts, payment details where applicable). For consents carrying encrypted PII, CAAP calls the LFI's "),
                createVNode("code", null, "/users/actions/pii/decrypt"),
                createTextVNode(" endpoint to display cleartext to the end user.")
              ]),
              createVNode("li", null, [
                createVNode("strong", null, "Select accounts or policies."),
                createTextVNode(" Where the consent requires selecting accounts or insurance policies, CAAP retrieves them via the LFI's CAAP-specific "),
                createVNode("code", null, "/accounts"),
                createTextVNode(", "),
                createVNode("code", null, "/accounts/{accountId}"),
                createTextVNode(", and "),
                createVNode("code", null, "/{type}-insurance-policies"),
                createTextVNode(" endpoints.")
              ]),
              createVNode("li", null, [
                createVNode("strong", null, "Validate."),
                createTextVNode(" Before completion, CAAP calls the LFI's "),
                createVNode("code", null, "/consent/actions/validate"),
                createTextVNode(" endpoint. If validation fails, the journey ends with the user-facing message returned by the LFI.")
              ]),
              createVNode("li", null, [
                createVNode("strong", null, "Confirm."),
                createTextVNode(" The end user confirms the consent; CAAP completes the interaction with the API Hub, and the API Hub redirects the end user back to the TPP.")
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
    id: "consent-management",
    num: "04",
    color: "var(--at-navy)",
    eyebrow: "Consent management after authorisation",
    title: "End user consent review and revocation",
    tone: "surface"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` After the consent is authorised, the end user manages the consent in CAAP — not in the LFI&#39;s own consent management interface. CAAP exposes the list of active consents, their permissions and expiry, and the ability to revoke them. Revocations are propagated to the API Hub (the consent source of truth) and from there back to the LFI via the existing <a href="/tech/lfi-api-hub/v2.2-rc1/consent-events" data-v-76b19295${_scopeId2}>Ozone Connect Consent Events</a> path. `);
            } else {
              return [
                createTextVNode(" After the consent is authorised, the end user manages the consent in CAAP — not in the LFI's own consent management interface. CAAP exposes the list of active consents, their permissions and expiry, and the ability to revoke them. Revocations are propagated to the API Hub (the consent source of truth) and from there back to the LFI via the existing "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/consent-events" }, "Ozone Connect Consent Events"),
                createTextVNode(" path. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdNote, {
          type: "info",
          title: "Not applicable with CAAP"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<p data-v-76b19295${_scopeId2}> The LFI&#39;s own <a href="/tech/lfi-api-hub/v2.2-rc1/consent-management-interface/" data-v-76b19295${_scopeId2}>Consent Management Interface</a> requirements and UX guidance are <strong data-v-76b19295${_scopeId2}>not applicable</strong> when the LFI adopts CAAP — CAAP delivers that interface. </p>`);
            } else {
              return [
                createVNode("p", null, [
                  createTextVNode(" The LFI's own "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/consent-management-interface/" }, "Consent Management Interface"),
                  createTextVNode(" requirements and UX guidance are "),
                  createVNode("strong", null, "not applicable"),
                  createTextVNode(" when the LFI adopts CAAP — CAAP delivers that interface. ")
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
              createTextVNode(" After the consent is authorised, the end user manages the consent in CAAP — not in the LFI's own consent management interface. CAAP exposes the list of active consents, their permissions and expiry, and the ability to revoke them. Revocations are propagated to the API Hub (the consent source of truth) and from there back to the LFI via the existing "),
              createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/consent-events" }, "Ozone Connect Consent Events"),
              createTextVNode(" path. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdNote, {
            type: "info",
            title: "Not applicable with CAAP"
          }, {
            default: withCtx(() => [
              createVNode("p", null, [
                createTextVNode(" The LFI's own "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/consent-management-interface/" }, "Consent Management Interface"),
                createTextVNode(" requirements and UX guidance are "),
                createVNode("strong", null, "not applicable"),
                createTextVNode(" when the LFI adopts CAAP — CAAP delivers that interface. ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/v2.2-rc1/caap/user-experience.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const userExperience = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-76b19295"]]);
export {
  userExperience as default
};
