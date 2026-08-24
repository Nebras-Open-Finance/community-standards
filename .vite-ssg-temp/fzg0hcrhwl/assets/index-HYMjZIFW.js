import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { I as ImageViewer } from "./ImageViewer-DmHTopUf.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_EdSectionBand = __unplugin_components_3;
  const _component_ImageViewer = ImageViewer;
  const _component_EdBullets = __unplugin_components_5;
  const _component_EdProse = __unplugin_components_4;
  const _component_EdRefTable = __unplugin_components_12;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-81714d31><section class="ed-doc__hero" data-v-81714d31><div class="ed-doc__inner" data-v-81714d31><div class="ed-doc__eyebrow" data-v-81714d31><span class="ed-doc__eyebrow-dash" data-v-81714d31></span> LFI · Consent Journey · Authorization </div><h1 class="ed-doc__title" data-v-81714d31> Authorization <span class="ed-doc__read" data-v-81714d31>3 min read</span></h1><p class="ed-doc__lede" data-v-81714d31> Once the end user has been <a href="/tech/lfi-api-hub/v2.2-rc1/consent-journey/authentication/" data-v-81714d31>authenticated</a>, the LFI presents the consent details so the end user can review and approve (or decline) the request. This is the <strong data-v-81714d31>authorization</strong> step — the end user makes an informed decision about granting the TPP access to their accounts or authorizing a payment. </p><p class="ed-doc__lede ed-doc__lede--tight" data-v-81714d31> The exact content of the authorization page varies by consent type. Each consent type defines its own authorization page requirements in its User Experience section. </p></div></section>`);
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "where-it-sits",
    num: "01",
    color: "var(--at-teal)",
    eyebrow: "Where authorization sits in the consent flow",
    title: "After authentication, before the redirect back to the TPP",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_ImageViewer, {
          src: "/images/journeys/oauth-wireframe.png",
          alt: "OAuth flow"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-81714d31${_scopeId2}>The TPP creates a consent and receives a redirect URI from the API Hub</li><li data-v-81714d31${_scopeId2}>The end user&#39;s device opens the LFI&#39;s <strong data-v-81714d31${_scopeId2}>Authorization Endpoint</strong></li><li data-v-81714d31${_scopeId2}>The LFI authenticates the end user using Strong Customer Authentication (SCA)</li><li data-v-81714d31${_scopeId2}><strong data-v-81714d31${_scopeId2}>The LFI presents the consent for authorization</strong></li><li data-v-81714d31${_scopeId2}>The LFI completes the interaction and redirects back to the TPP.</li>`);
            } else {
              return [
                createVNode("li", null, "The TPP creates a consent and receives a redirect URI from the API Hub"),
                createVNode("li", null, [
                  createTextVNode("The end user's device opens the LFI's "),
                  createVNode("strong", null, "Authorization Endpoint")
                ]),
                createVNode("li", null, "The LFI authenticates the end user using Strong Customer Authentication (SCA)"),
                createVNode("li", null, [
                  createVNode("strong", null, "The LFI presents the consent for authorization")
                ]),
                createVNode("li", null, "The LFI completes the interaction and redirects back to the TPP.")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_ImageViewer, {
            src: "/images/journeys/oauth-wireframe.png",
            alt: "OAuth flow"
          }),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, "The TPP creates a consent and receives a redirect URI from the API Hub"),
              createVNode("li", null, [
                createTextVNode("The end user's device opens the LFI's "),
                createVNode("strong", null, "Authorization Endpoint")
              ]),
              createVNode("li", null, "The LFI authenticates the end user using Strong Customer Authentication (SCA)"),
              createVNode("li", null, [
                createVNode("strong", null, "The LFI presents the consent for authorization")
              ]),
              createVNode("li", null, "The LFI completes the interaction and redirects back to the TPP.")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "principles",
    num: "02",
    color: "var(--at-gold)",
    eyebrow: "Principles",
    title: "Eight principles that govern every authorization page",
    tone: "surface"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` The following principles govern authorization pages across all consent types: `);
            } else {
              return [
                createTextVNode(" The following principles govern authorization pages across all consent types: ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdRefTable, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<table data-v-81714d31${_scopeId2}><thead data-v-81714d31${_scopeId2}><tr data-v-81714d31${_scopeId2}><th style="${ssrRenderStyle({ "width": "3rem" })}" data-v-81714d31${_scopeId2}>#</th><th data-v-81714d31${_scopeId2}>Principle</th><th data-v-81714d31${_scopeId2}>Detail</th></tr></thead><tbody data-v-81714d31${_scopeId2}><tr data-v-81714d31${_scopeId2}><td data-v-81714d31${_scopeId2}>1</td><td data-v-81714d31${_scopeId2}><strong data-v-81714d31${_scopeId2}>AlTareq branding</strong></td><td data-v-81714d31${_scopeId2}>The AlTareq logo and ecosystem branding MUST be displayed on every authorization page. The end user MUST be able to clearly identify that the authorization is part of the AlTareq Open Finance ecosystem. Action buttons and naming conventions related to AlTareq MUST be preserved.</td></tr><tr data-v-81714d31${_scopeId2}><td data-v-81714d31${_scopeId2}>2</td><td data-v-81714d31${_scopeId2}><strong data-v-81714d31${_scopeId2}>Informed consent</strong></td><td data-v-81714d31${_scopeId2}>The authorization page MUST clearly explain what the end user is authorizing. All material details — such as the TPP name, data permissions, payment amounts, payee details, and consent duration — MUST be presented before the end user confirms.</td></tr><tr data-v-81714d31${_scopeId2}><td data-v-81714d31${_scopeId2}>3</td><td data-v-81714d31${_scopeId2}><strong data-v-81714d31${_scopeId2}>Progress indication</strong></td><td data-v-81714d31${_scopeId2}>The authorization page MUST include a progress indicator showing the end user where they are in the consent journey (e.g. Consent &gt; <strong data-v-81714d31${_scopeId2}>Authorize</strong> &gt; Complete).</td></tr><tr data-v-81714d31${_scopeId2}><td data-v-81714d31${_scopeId2}>4</td><td data-v-81714d31${_scopeId2}><strong data-v-81714d31${_scopeId2}>Consent-specific content</strong></td><td data-v-81714d31${_scopeId2}>The content of the authorization page MUST accurately reflect the consent type. For example, data-sharing consents present account selection and permission details, while payment consents present payee name, IBAN, amount, and payment schedule.</td></tr><tr data-v-81714d31${_scopeId2}><td data-v-81714d31${_scopeId2}>5</td><td data-v-81714d31${_scopeId2}><strong data-v-81714d31${_scopeId2}>No obstacles</strong></td><td data-v-81714d31${_scopeId2}>LFIs MUST NOT use language, design, or interaction patterns that discourage the end user from granting consent. The authorization page MUST NOT steer the end user toward declining, introduce unnecessary friction, or present the consent in a misleading way.</td></tr><tr data-v-81714d31${_scopeId2}><td data-v-81714d31${_scopeId2}>6</td><td data-v-81714d31${_scopeId2}><strong data-v-81714d31${_scopeId2}>Parity of experience</strong></td><td data-v-81714d31${_scopeId2}>The authorization experience MUST be consistent with the quality of the LFI&#39;s own digital channels. It MUST NOT load slower, use confusing language, or more obstructive than equivalent in-app interactions.</td></tr><tr data-v-81714d31${_scopeId2}><td data-v-81714d31${_scopeId2}>7</td><td data-v-81714d31${_scopeId2}><strong data-v-81714d31${_scopeId2}>Clear actions</strong></td><td data-v-81714d31${_scopeId2}>The end user MUST be presented with unambiguous options to approve or decline the consent. The action to approve MUST be clearly labelled and easy to locate.</td></tr><tr data-v-81714d31${_scopeId2}><td data-v-81714d31${_scopeId2}>8</td><td data-v-81714d31${_scopeId2}><strong data-v-81714d31${_scopeId2}>CX certification</strong></td><td data-v-81714d31${_scopeId2}>The authorization page MUST be submitted as part of CX certification prior to production. Any material changes to a production authorization page MUST be resubmitted for review and approval.</td></tr></tbody></table>`);
            } else {
              return [
                createVNode("table", null, [
                  createVNode("thead", null, [
                    createVNode("tr", null, [
                      createVNode("th", { style: { "width": "3rem" } }, "#"),
                      createVNode("th", null, "Principle"),
                      createVNode("th", null, "Detail")
                    ])
                  ]),
                  createVNode("tbody", null, [
                    createVNode("tr", null, [
                      createVNode("td", null, "1"),
                      createVNode("td", null, [
                        createVNode("strong", null, "AlTareq branding")
                      ]),
                      createVNode("td", null, "The AlTareq logo and ecosystem branding MUST be displayed on every authorization page. The end user MUST be able to clearly identify that the authorization is part of the AlTareq Open Finance ecosystem. Action buttons and naming conventions related to AlTareq MUST be preserved.")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "2"),
                      createVNode("td", null, [
                        createVNode("strong", null, "Informed consent")
                      ]),
                      createVNode("td", null, "The authorization page MUST clearly explain what the end user is authorizing. All material details — such as the TPP name, data permissions, payment amounts, payee details, and consent duration — MUST be presented before the end user confirms.")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "3"),
                      createVNode("td", null, [
                        createVNode("strong", null, "Progress indication")
                      ]),
                      createVNode("td", null, [
                        createTextVNode("The authorization page MUST include a progress indicator showing the end user where they are in the consent journey (e.g. Consent > "),
                        createVNode("strong", null, "Authorize"),
                        createTextVNode(" > Complete).")
                      ])
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "4"),
                      createVNode("td", null, [
                        createVNode("strong", null, "Consent-specific content")
                      ]),
                      createVNode("td", null, "The content of the authorization page MUST accurately reflect the consent type. For example, data-sharing consents present account selection and permission details, while payment consents present payee name, IBAN, amount, and payment schedule.")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "5"),
                      createVNode("td", null, [
                        createVNode("strong", null, "No obstacles")
                      ]),
                      createVNode("td", null, "LFIs MUST NOT use language, design, or interaction patterns that discourage the end user from granting consent. The authorization page MUST NOT steer the end user toward declining, introduce unnecessary friction, or present the consent in a misleading way.")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "6"),
                      createVNode("td", null, [
                        createVNode("strong", null, "Parity of experience")
                      ]),
                      createVNode("td", null, "The authorization experience MUST be consistent with the quality of the LFI's own digital channels. It MUST NOT load slower, use confusing language, or more obstructive than equivalent in-app interactions.")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "7"),
                      createVNode("td", null, [
                        createVNode("strong", null, "Clear actions")
                      ]),
                      createVNode("td", null, "The end user MUST be presented with unambiguous options to approve or decline the consent. The action to approve MUST be clearly labelled and easy to locate.")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "8"),
                      createVNode("td", null, [
                        createVNode("strong", null, "CX certification")
                      ]),
                      createVNode("td", null, "The authorization page MUST be submitted as part of CX certification prior to production. Any material changes to a production authorization page MUST be resubmitted for review and approval.")
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
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" The following principles govern authorization pages across all consent types: ")
            ]),
            _: 1
          }),
          createVNode(_component_EdRefTable, null, {
            default: withCtx(() => [
              createVNode("table", null, [
                createVNode("thead", null, [
                  createVNode("tr", null, [
                    createVNode("th", { style: { "width": "3rem" } }, "#"),
                    createVNode("th", null, "Principle"),
                    createVNode("th", null, "Detail")
                  ])
                ]),
                createVNode("tbody", null, [
                  createVNode("tr", null, [
                    createVNode("td", null, "1"),
                    createVNode("td", null, [
                      createVNode("strong", null, "AlTareq branding")
                    ]),
                    createVNode("td", null, "The AlTareq logo and ecosystem branding MUST be displayed on every authorization page. The end user MUST be able to clearly identify that the authorization is part of the AlTareq Open Finance ecosystem. Action buttons and naming conventions related to AlTareq MUST be preserved.")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, "2"),
                    createVNode("td", null, [
                      createVNode("strong", null, "Informed consent")
                    ]),
                    createVNode("td", null, "The authorization page MUST clearly explain what the end user is authorizing. All material details — such as the TPP name, data permissions, payment amounts, payee details, and consent duration — MUST be presented before the end user confirms.")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, "3"),
                    createVNode("td", null, [
                      createVNode("strong", null, "Progress indication")
                    ]),
                    createVNode("td", null, [
                      createTextVNode("The authorization page MUST include a progress indicator showing the end user where they are in the consent journey (e.g. Consent > "),
                      createVNode("strong", null, "Authorize"),
                      createTextVNode(" > Complete).")
                    ])
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, "4"),
                    createVNode("td", null, [
                      createVNode("strong", null, "Consent-specific content")
                    ]),
                    createVNode("td", null, "The content of the authorization page MUST accurately reflect the consent type. For example, data-sharing consents present account selection and permission details, while payment consents present payee name, IBAN, amount, and payment schedule.")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, "5"),
                    createVNode("td", null, [
                      createVNode("strong", null, "No obstacles")
                    ]),
                    createVNode("td", null, "LFIs MUST NOT use language, design, or interaction patterns that discourage the end user from granting consent. The authorization page MUST NOT steer the end user toward declining, introduce unnecessary friction, or present the consent in a misleading way.")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, "6"),
                    createVNode("td", null, [
                      createVNode("strong", null, "Parity of experience")
                    ]),
                    createVNode("td", null, "The authorization experience MUST be consistent with the quality of the LFI's own digital channels. It MUST NOT load slower, use confusing language, or more obstructive than equivalent in-app interactions.")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, "7"),
                    createVNode("td", null, [
                      createVNode("strong", null, "Clear actions")
                    ]),
                    createVNode("td", null, "The end user MUST be presented with unambiguous options to approve or decline the consent. The action to approve MUST be clearly labelled and easy to locate.")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, "8"),
                    createVNode("td", null, [
                      createVNode("strong", null, "CX certification")
                    ]),
                    createVNode("td", null, "The authorization page MUST be submitted as part of CX certification prior to production. Any material changes to a production authorization page MUST be resubmitted for review and approval.")
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
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "by-consent-type",
    num: "03",
    color: "var(--at-blue-deep, #1d4ed8)",
    eyebrow: "Authorization pages by consent type",
    title: "Consent-specific UX requirements and wireframes",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` The authorization page content varies depending on the type of consent being authorized. Refer to the <strong data-v-81714d31${_scopeId2}>User Experience</strong> page for each consent type for the specific authorization page requirements and interactive wireframes: `);
            } else {
              return [
                createTextVNode(" The authorization page content varies depending on the type of consent being authorized. Refer to the "),
                createVNode("strong", null, "User Experience"),
                createTextVNode(" page for each consent type for the specific authorization page requirements and interactive wireframes: ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-81714d31${_scopeId2}><a href="/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/user-journeys" data-v-81714d31${_scopeId2}>Bank Data Sharing</a> — Account selection and data permission review</li><li data-v-81714d31${_scopeId2}><a href="/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/domestic-payments/single-instant-payment/user-journeys" data-v-81714d31${_scopeId2}>Single Instant Payment</a> — Payment amount, payee, and Confirmation of Payee details</li><li data-v-81714d31${_scopeId2}><a href="/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/domestic-payments/multi-payments/variable-on-demand/user-journeys" data-v-81714d31${_scopeId2}>Variable On Demand</a> — Payment rules, creditor details, and maximum limits</li><li data-v-81714d31${_scopeId2}><a href="/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/domestic-payments/multi-payments/fixed-on-demand/user-journeys" data-v-81714d31${_scopeId2}>Fixed On Demand</a> — Fixed amount per-payment details and creditor information</li><li data-v-81714d31${_scopeId2}><a href="/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/domestic-payments/multi-payments/variable-periodic-schedule/user-journeys" data-v-81714d31${_scopeId2}>Variable Periodic Schedule</a> — Recurring payment schedule with variable amounts</li><li data-v-81714d31${_scopeId2}><a href="/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/domestic-payments/multi-payments/fixed-periodic-schedule/user-journeys" data-v-81714d31${_scopeId2}>Fixed Periodic Schedule</a> — Recurring payment schedule with fixed amounts</li><li data-v-81714d31${_scopeId2}><a href="/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/domestic-payments/multi-payments/variable-defined-schedule/user-journeys" data-v-81714d31${_scopeId2}>Variable Defined Schedule</a> — Pre-defined payment dates with variable amounts</li><li data-v-81714d31${_scopeId2}><a href="/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/domestic-payments/multi-payments/fixed-defined-schedule/user-journeys" data-v-81714d31${_scopeId2}>Fixed Defined Schedule</a> — Pre-defined payment dates with fixed amounts</li><li data-v-81714d31${_scopeId2}><a href="/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/domestic-payments/multi-payments/delegated-sca/user-journeys" data-v-81714d31${_scopeId2}>Delegated SCA</a> — Per-payment authentication with delegated consent</li>`);
            } else {
              return [
                createVNode("li", null, [
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/user-journeys" }, "Bank Data Sharing"),
                  createTextVNode(" — Account selection and data permission review")
                ]),
                createVNode("li", null, [
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/domestic-payments/single-instant-payment/user-journeys" }, "Single Instant Payment"),
                  createTextVNode(" — Payment amount, payee, and Confirmation of Payee details")
                ]),
                createVNode("li", null, [
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/domestic-payments/multi-payments/variable-on-demand/user-journeys" }, "Variable On Demand"),
                  createTextVNode(" — Payment rules, creditor details, and maximum limits")
                ]),
                createVNode("li", null, [
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/domestic-payments/multi-payments/fixed-on-demand/user-journeys" }, "Fixed On Demand"),
                  createTextVNode(" — Fixed amount per-payment details and creditor information")
                ]),
                createVNode("li", null, [
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/domestic-payments/multi-payments/variable-periodic-schedule/user-journeys" }, "Variable Periodic Schedule"),
                  createTextVNode(" — Recurring payment schedule with variable amounts")
                ]),
                createVNode("li", null, [
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/domestic-payments/multi-payments/fixed-periodic-schedule/user-journeys" }, "Fixed Periodic Schedule"),
                  createTextVNode(" — Recurring payment schedule with fixed amounts")
                ]),
                createVNode("li", null, [
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/domestic-payments/multi-payments/variable-defined-schedule/user-journeys" }, "Variable Defined Schedule"),
                  createTextVNode(" — Pre-defined payment dates with variable amounts")
                ]),
                createVNode("li", null, [
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/domestic-payments/multi-payments/fixed-defined-schedule/user-journeys" }, "Fixed Defined Schedule"),
                  createTextVNode(" — Pre-defined payment dates with fixed amounts")
                ]),
                createVNode("li", null, [
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/domestic-payments/multi-payments/delegated-sca/user-journeys" }, "Delegated SCA"),
                  createTextVNode(" — Per-payment authentication with delegated consent")
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
              createTextVNode(" The authorization page content varies depending on the type of consent being authorized. Refer to the "),
              createVNode("strong", null, "User Experience"),
              createTextVNode(" page for each consent type for the specific authorization page requirements and interactive wireframes: ")
            ]),
            _: 1
          }),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, [
                createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/user-journeys" }, "Bank Data Sharing"),
                createTextVNode(" — Account selection and data permission review")
              ]),
              createVNode("li", null, [
                createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/domestic-payments/single-instant-payment/user-journeys" }, "Single Instant Payment"),
                createTextVNode(" — Payment amount, payee, and Confirmation of Payee details")
              ]),
              createVNode("li", null, [
                createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/domestic-payments/multi-payments/variable-on-demand/user-journeys" }, "Variable On Demand"),
                createTextVNode(" — Payment rules, creditor details, and maximum limits")
              ]),
              createVNode("li", null, [
                createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/domestic-payments/multi-payments/fixed-on-demand/user-journeys" }, "Fixed On Demand"),
                createTextVNode(" — Fixed amount per-payment details and creditor information")
              ]),
              createVNode("li", null, [
                createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/domestic-payments/multi-payments/variable-periodic-schedule/user-journeys" }, "Variable Periodic Schedule"),
                createTextVNode(" — Recurring payment schedule with variable amounts")
              ]),
              createVNode("li", null, [
                createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/domestic-payments/multi-payments/fixed-periodic-schedule/user-journeys" }, "Fixed Periodic Schedule"),
                createTextVNode(" — Recurring payment schedule with fixed amounts")
              ]),
              createVNode("li", null, [
                createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/domestic-payments/multi-payments/variable-defined-schedule/user-journeys" }, "Variable Defined Schedule"),
                createTextVNode(" — Pre-defined payment dates with variable amounts")
              ]),
              createVNode("li", null, [
                createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/domestic-payments/multi-payments/fixed-defined-schedule/user-journeys" }, "Fixed Defined Schedule"),
                createTextVNode(" — Pre-defined payment dates with fixed amounts")
              ]),
              createVNode("li", null, [
                createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/domestic-payments/multi-payments/delegated-sca/user-journeys" }, "Delegated SCA"),
                createTextVNode(" — Per-payment authentication with delegated consent")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/v2.2-rc1/consent-journey/authorization/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-81714d31"]]);
export {
  index as default
};
