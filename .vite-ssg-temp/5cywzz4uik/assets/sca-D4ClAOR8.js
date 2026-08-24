import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
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
  const _component_EdBullets = __unplugin_components_5;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-fcb0f692><section class="ed-doc__hero" data-v-fcb0f692><div class="ed-doc__inner" data-v-fcb0f692><div class="ed-doc__eyebrow" data-v-fcb0f692><span class="ed-doc__eyebrow-dash" data-v-fcb0f692></span> LFI · Consent Journey · Authentication · SCA </div><h1 class="ed-doc__title" data-v-fcb0f692> Strong Customer Authentication <span class="ed-doc__read" data-v-fcb0f692>4 min read</span></h1><p class="ed-doc__lede" data-v-fcb0f692> Strong Customer Authentication (SCA) is multi-factor authentication (MFA) that requires the end user to authenticate using at least two independent factors. SCA is a regulatory requirement under the CBUAE directive <em data-v-fcb0f692>Prevention of Fraud Incidents Impacting Consumers</em> (Notice No. 3057/2025) and applies to all Open Finance consent journeys. </p></div></section>`);
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "factors",
    num: "01",
    color: "var(--at-teal)",
    eyebrow: "Authentication factors",
    title: "At least two of three independent factors",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`SCA requires at least <strong data-v-fcb0f692${_scopeId2}>two</strong> of the following three factors:`);
            } else {
              return [
                createTextVNode("SCA requires at least "),
                createVNode("strong", null, "two"),
                createTextVNode(" of the following three factors:")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdRefTable, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<table data-v-fcb0f692${_scopeId2}><thead data-v-fcb0f692${_scopeId2}><tr data-v-fcb0f692${_scopeId2}><th data-v-fcb0f692${_scopeId2}>Factor</th><th data-v-fcb0f692${_scopeId2}>Category</th><th data-v-fcb0f692${_scopeId2}>Examples</th></tr></thead><tbody data-v-fcb0f692${_scopeId2}><tr data-v-fcb0f692${_scopeId2}><td data-v-fcb0f692${_scopeId2}><strong data-v-fcb0f692${_scopeId2}>Possession</strong></td><td data-v-fcb0f692${_scopeId2}>Something you have</td><td data-v-fcb0f692${_scopeId2}>A bound mobile device, hardware token, SIM card</td></tr><tr data-v-fcb0f692${_scopeId2}><td data-v-fcb0f692${_scopeId2}><strong data-v-fcb0f692${_scopeId2}>Inherence</strong></td><td data-v-fcb0f692${_scopeId2}>Something you are</td><td data-v-fcb0f692${_scopeId2}>Fingerprint, facial recognition, voice recognition</td></tr><tr data-v-fcb0f692${_scopeId2}><td data-v-fcb0f692${_scopeId2}><strong data-v-fcb0f692${_scopeId2}>Knowledge</strong></td><td data-v-fcb0f692${_scopeId2}>Something you know</td><td data-v-fcb0f692${_scopeId2}>PIN, password, passphrase</td></tr></tbody></table>`);
            } else {
              return [
                createVNode("table", null, [
                  createVNode("thead", null, [
                    createVNode("tr", null, [
                      createVNode("th", null, "Factor"),
                      createVNode("th", null, "Category"),
                      createVNode("th", null, "Examples")
                    ])
                  ]),
                  createVNode("tbody", null, [
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("strong", null, "Possession")
                      ]),
                      createVNode("td", null, "Something you have"),
                      createVNode("td", null, "A bound mobile device, hardware token, SIM card")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("strong", null, "Inherence")
                      ]),
                      createVNode("td", null, "Something you are"),
                      createVNode("td", null, "Fingerprint, facial recognition, voice recognition")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("strong", null, "Knowledge")
                      ]),
                      createVNode("td", null, "Something you know"),
                      createVNode("td", null, "PIN, password, passphrase")
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
              _push3(` Each factor used MUST be independent — compromise of one factor MUST NOT compromise another. `);
            } else {
              return [
                createTextVNode(" Each factor used MUST be independent — compromise of one factor MUST NOT compromise another. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode("SCA requires at least "),
              createVNode("strong", null, "two"),
              createTextVNode(" of the following three factors:")
            ]),
            _: 1
          }),
          createVNode(_component_EdRefTable, null, {
            default: withCtx(() => [
              createVNode("table", null, [
                createVNode("thead", null, [
                  createVNode("tr", null, [
                    createVNode("th", null, "Factor"),
                    createVNode("th", null, "Category"),
                    createVNode("th", null, "Examples")
                  ])
                ]),
                createVNode("tbody", null, [
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("strong", null, "Possession")
                    ]),
                    createVNode("td", null, "Something you have"),
                    createVNode("td", null, "A bound mobile device, hardware token, SIM card")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("strong", null, "Inherence")
                    ]),
                    createVNode("td", null, "Something you are"),
                    createVNode("td", null, "Fingerprint, facial recognition, voice recognition")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("strong", null, "Knowledge")
                    ]),
                    createVNode("td", null, "Something you know"),
                    createVNode("td", null, "PIN, password, passphrase")
                  ])
                ])
              ])
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Each factor used MUST be independent — compromise of one factor MUST NOT compromise another. ")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "prohibited",
    num: "02",
    color: "var(--at-gold)",
    eyebrow: "Prohibited authentication methods",
    title: "What MUST NOT be used",
    tone: "surface"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`The following methods are <strong data-v-fcb0f692${_scopeId2}>prohibited</strong> in Open Finance consent journeys:`);
            } else {
              return [
                createTextVNode("The following methods are "),
                createVNode("strong", null, "prohibited"),
                createTextVNode(" in Open Finance consent journeys:")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdRefTable, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<table data-v-fcb0f692${_scopeId2}><thead data-v-fcb0f692${_scopeId2}><tr data-v-fcb0f692${_scopeId2}><th data-v-fcb0f692${_scopeId2}>Method</th><th data-v-fcb0f692${_scopeId2}>Status</th><th data-v-fcb0f692${_scopeId2}>Rationale</th></tr></thead><tbody data-v-fcb0f692${_scopeId2}><tr data-v-fcb0f692${_scopeId2}><td data-v-fcb0f692${_scopeId2}>SMS OTP (as standalone)</td><td data-v-fcb0f692${_scopeId2}><strong data-v-fcb0f692${_scopeId2}>MUST NOT</strong> be used</td><td data-v-fcb0f692${_scopeId2}>Prohibited by CBUAE directive as a standalone authentication method</td></tr><tr data-v-fcb0f692${_scopeId2}><td data-v-fcb0f692${_scopeId2}>Email OTP (as standalone)</td><td data-v-fcb0f692${_scopeId2}><strong data-v-fcb0f692${_scopeId2}>MUST NOT</strong> be used</td><td data-v-fcb0f692${_scopeId2}>Prohibited by CBUAE directive as a standalone authentication method</td></tr><tr data-v-fcb0f692${_scopeId2}><td data-v-fcb0f692${_scopeId2}>Static passcodes (as standalone)</td><td data-v-fcb0f692${_scopeId2}><strong data-v-fcb0f692${_scopeId2}>MUST NOT</strong> be used</td><td data-v-fcb0f692${_scopeId2}>Prohibited by CBUAE directive as a standalone authentication method</td></tr><tr data-v-fcb0f692${_scopeId2}><td data-v-fcb0f692${_scopeId2}>SMS OTP (as a factor in Open Finance MFA)</td><td data-v-fcb0f692${_scopeId2}><strong data-v-fcb0f692${_scopeId2}>MUST NOT</strong> be used</td><td data-v-fcb0f692${_scopeId2}>Open Finance authentication MUST NOT introduce methods that are more obstructive or weaker than the LFI&#39;s existing digital channels. If the LFI does not use SMS OTP in its own mobile banking authentication, it MUST NOT introduce it for Open Finance.</td></tr><tr data-v-fcb0f692${_scopeId2}><td data-v-fcb0f692${_scopeId2}>Email OTP (as a factor in Open Finance MFA)</td><td data-v-fcb0f692${_scopeId2}><strong data-v-fcb0f692${_scopeId2}>MUST NOT</strong> be used</td><td data-v-fcb0f692${_scopeId2}>Same rationale as above. These methods add friction and latency that degrade the customer experience below the standard of the LFI&#39;s own channels.</td></tr></tbody></table>`);
            } else {
              return [
                createVNode("table", null, [
                  createVNode("thead", null, [
                    createVNode("tr", null, [
                      createVNode("th", null, "Method"),
                      createVNode("th", null, "Status"),
                      createVNode("th", null, "Rationale")
                    ])
                  ]),
                  createVNode("tbody", null, [
                    createVNode("tr", null, [
                      createVNode("td", null, "SMS OTP (as standalone)"),
                      createVNode("td", null, [
                        createVNode("strong", null, "MUST NOT"),
                        createTextVNode(" be used")
                      ]),
                      createVNode("td", null, "Prohibited by CBUAE directive as a standalone authentication method")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "Email OTP (as standalone)"),
                      createVNode("td", null, [
                        createVNode("strong", null, "MUST NOT"),
                        createTextVNode(" be used")
                      ]),
                      createVNode("td", null, "Prohibited by CBUAE directive as a standalone authentication method")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "Static passcodes (as standalone)"),
                      createVNode("td", null, [
                        createVNode("strong", null, "MUST NOT"),
                        createTextVNode(" be used")
                      ]),
                      createVNode("td", null, "Prohibited by CBUAE directive as a standalone authentication method")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "SMS OTP (as a factor in Open Finance MFA)"),
                      createVNode("td", null, [
                        createVNode("strong", null, "MUST NOT"),
                        createTextVNode(" be used")
                      ]),
                      createVNode("td", null, "Open Finance authentication MUST NOT introduce methods that are more obstructive or weaker than the LFI's existing digital channels. If the LFI does not use SMS OTP in its own mobile banking authentication, it MUST NOT introduce it for Open Finance.")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "Email OTP (as a factor in Open Finance MFA)"),
                      createVNode("td", null, [
                        createVNode("strong", null, "MUST NOT"),
                        createTextVNode(" be used")
                      ]),
                      createVNode("td", null, "Same rationale as above. These methods add friction and latency that degrade the customer experience below the standard of the LFI's own channels.")
                    ])
                  ])
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdNote, { type: "warning" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<p data-v-fcb0f692${_scopeId2}> LFIs MUST NOT introduce authentication factors into the Open Finance journey that are not used in their existing digital channels. Open Finance authentication MUST be equivalent to — not more burdensome than — the LFI&#39;s current authentication experience. </p>`);
            } else {
              return [
                createVNode("p", null, " LFIs MUST NOT introduce authentication factors into the Open Finance journey that are not used in their existing digital channels. Open Finance authentication MUST be equivalent to — not more burdensome than — the LFI's current authentication experience. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode("The following methods are "),
              createVNode("strong", null, "prohibited"),
              createTextVNode(" in Open Finance consent journeys:")
            ]),
            _: 1
          }),
          createVNode(_component_EdRefTable, null, {
            default: withCtx(() => [
              createVNode("table", null, [
                createVNode("thead", null, [
                  createVNode("tr", null, [
                    createVNode("th", null, "Method"),
                    createVNode("th", null, "Status"),
                    createVNode("th", null, "Rationale")
                  ])
                ]),
                createVNode("tbody", null, [
                  createVNode("tr", null, [
                    createVNode("td", null, "SMS OTP (as standalone)"),
                    createVNode("td", null, [
                      createVNode("strong", null, "MUST NOT"),
                      createTextVNode(" be used")
                    ]),
                    createVNode("td", null, "Prohibited by CBUAE directive as a standalone authentication method")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, "Email OTP (as standalone)"),
                    createVNode("td", null, [
                      createVNode("strong", null, "MUST NOT"),
                      createTextVNode(" be used")
                    ]),
                    createVNode("td", null, "Prohibited by CBUAE directive as a standalone authentication method")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, "Static passcodes (as standalone)"),
                    createVNode("td", null, [
                      createVNode("strong", null, "MUST NOT"),
                      createTextVNode(" be used")
                    ]),
                    createVNode("td", null, "Prohibited by CBUAE directive as a standalone authentication method")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, "SMS OTP (as a factor in Open Finance MFA)"),
                    createVNode("td", null, [
                      createVNode("strong", null, "MUST NOT"),
                      createTextVNode(" be used")
                    ]),
                    createVNode("td", null, "Open Finance authentication MUST NOT introduce methods that are more obstructive or weaker than the LFI's existing digital channels. If the LFI does not use SMS OTP in its own mobile banking authentication, it MUST NOT introduce it for Open Finance.")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, "Email OTP (as a factor in Open Finance MFA)"),
                    createVNode("td", null, [
                      createVNode("strong", null, "MUST NOT"),
                      createTextVNode(" be used")
                    ]),
                    createVNode("td", null, "Same rationale as above. These methods add friction and latency that degrade the customer experience below the standard of the LFI's own channels.")
                  ])
                ])
              ])
            ]),
            _: 1
          }),
          createVNode(_component_EdNote, { type: "warning" }, {
            default: withCtx(() => [
              createVNode("p", null, " LFIs MUST NOT introduce authentication factors into the Open Finance journey that are not used in their existing digital channels. Open Finance authentication MUST be equivalent to — not more burdensome than — the LFI's current authentication experience. ")
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
    eyebrow: "SCA requirements by consent type",
    title: "Single MFA ceremony for data sharing; step-up for payments",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<h3 data-v-fcb0f692${_scopeId}>Data sharing consents</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` For data sharing consents, a <strong data-v-fcb0f692${_scopeId2}>single MFA ceremony</strong> at the start of the consent journey is sufficient. No step-up authentication is required. `);
            } else {
              return [
                createTextVNode(" For data sharing consents, a "),
                createVNode("strong", null, "single MFA ceremony"),
                createTextVNode(" at the start of the consent journey is sufficient. No step-up authentication is required. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` The end user authenticates, reviews the data sharing permissions, selects accounts, and authorizes the consent. `);
            } else {
              return [
                createTextVNode(" The end user authenticates, reviews the data sharing permissions, selects accounts, and authorizes the consent. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 id="step-up-authentication-for-payment-consents" data-v-fcb0f692${_scopeId}>Payment consents — step-up authentication</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` For payment consents (single payments and multi-payment consents), the CBUAE directive requires <strong data-v-fcb0f692${_scopeId2}>step-up authentication</strong> for sensitive actions including the initiation of payments. This means an additional authentication gesture is required at the point the end user confirms the payment authorization. `);
            } else {
              return [
                createTextVNode(" For payment consents (single payments and multi-payment consents), the CBUAE directive requires "),
                createVNode("strong", null, "step-up authentication"),
                createTextVNode(" for sensitive actions including the initiation of payments. This means an additional authentication gesture is required at the point the end user confirms the payment authorization. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`In practice, a well-implemented payment consent journey has two authentication touchpoints:`);
            } else {
              return [
                createTextVNode("In practice, a well-implemented payment consent journey has two authentication touchpoints:")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdRefTable, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<table data-v-fcb0f692${_scopeId2}><thead data-v-fcb0f692${_scopeId2}><tr data-v-fcb0f692${_scopeId2}><th data-v-fcb0f692${_scopeId2}>Touchpoint</th><th data-v-fcb0f692${_scopeId2}>Purpose</th><th data-v-fcb0f692${_scopeId2}>What happens</th></tr></thead><tbody data-v-fcb0f692${_scopeId2}><tr data-v-fcb0f692${_scopeId2}><td data-v-fcb0f692${_scopeId2}><strong data-v-fcb0f692${_scopeId2}>Initial authentication</strong></td><td data-v-fcb0f692${_scopeId2}>Establish the end user&#39;s identity</td><td data-v-fcb0f692${_scopeId2}>The end user opens the LFI app (or web page) and completes MFA — typically device possession + biometric or PIN. This is identical to how the end user would normally open their banking app.</td></tr><tr data-v-fcb0f692${_scopeId2}><td data-v-fcb0f692${_scopeId2}><strong data-v-fcb0f692${_scopeId2}>Payment confirmation</strong></td><td data-v-fcb0f692${_scopeId2}>Confirm intent for the specific payment</td><td data-v-fcb0f692${_scopeId2}>After reviewing the payment details, the end user confirms authorization with a <strong data-v-fcb0f692${_scopeId2}>native biometric gesture</strong> (e.g. Face ID, fingerprint). This is identical to how the end user would confirm a payment in their banking app.</td></tr></tbody></table>`);
            } else {
              return [
                createVNode("table", null, [
                  createVNode("thead", null, [
                    createVNode("tr", null, [
                      createVNode("th", null, "Touchpoint"),
                      createVNode("th", null, "Purpose"),
                      createVNode("th", null, "What happens")
                    ])
                  ]),
                  createVNode("tbody", null, [
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("strong", null, "Initial authentication")
                      ]),
                      createVNode("td", null, "Establish the end user's identity"),
                      createVNode("td", null, "The end user opens the LFI app (or web page) and completes MFA — typically device possession + biometric or PIN. This is identical to how the end user would normally open their banking app.")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("strong", null, "Payment confirmation")
                      ]),
                      createVNode("td", null, "Confirm intent for the specific payment"),
                      createVNode("td", null, [
                        createTextVNode("After reviewing the payment details, the end user confirms authorization with a "),
                        createVNode("strong", null, "native biometric gesture"),
                        createTextVNode(" (e.g. Face ID, fingerprint). This is identical to how the end user would confirm a payment in their banking app.")
                      ])
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
              _push3(` These two touchpoints serve distinct purposes — identity establishment and payment intent confirmation — and align with how banking apps already handle payment flows. The end user experience is familiar: open the app with your face or fingerprint, review the payment, confirm with your face or fingerprint. `);
            } else {
              return [
                createTextVNode(" These two touchpoints serve distinct purposes — identity establishment and payment intent confirmation — and align with how banking apps already handle payment flows. The end user experience is familiar: open the app with your face or fingerprint, review the payment, confirm with your face or fingerprint. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdNote, {
          type: "tip",
          title: `Why this doesn't feel like "authenticating twice"`
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<p data-v-fcb0f692${_scopeId2}> The initial authentication is the natural act of opening and unlocking the banking app. The payment confirmation is the natural act of approving a specific transaction. End users already do this in their banking apps today. The step-up requirement simply ensures this existing pattern is preserved in the Open Finance journey. </p>`);
            } else {
              return [
                createVNode("p", null, " The initial authentication is the natural act of opening and unlocking the banking app. The payment confirmation is the natural act of approving a specific transaction. End users already do this in their banking apps today. The step-up requirement simply ensures this existing pattern is preserved in the Open Finance journey. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode("h3", null, "Data sharing consents"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" For data sharing consents, a "),
              createVNode("strong", null, "single MFA ceremony"),
              createTextVNode(" at the start of the consent journey is sufficient. No step-up authentication is required. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" The end user authenticates, reviews the data sharing permissions, selects accounts, and authorizes the consent. ")
            ]),
            _: 1
          }),
          createVNode("h3", { id: "step-up-authentication-for-payment-consents" }, "Payment consents — step-up authentication"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" For payment consents (single payments and multi-payment consents), the CBUAE directive requires "),
              createVNode("strong", null, "step-up authentication"),
              createTextVNode(" for sensitive actions including the initiation of payments. This means an additional authentication gesture is required at the point the end user confirms the payment authorization. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode("In practice, a well-implemented payment consent journey has two authentication touchpoints:")
            ]),
            _: 1
          }),
          createVNode(_component_EdRefTable, null, {
            default: withCtx(() => [
              createVNode("table", null, [
                createVNode("thead", null, [
                  createVNode("tr", null, [
                    createVNode("th", null, "Touchpoint"),
                    createVNode("th", null, "Purpose"),
                    createVNode("th", null, "What happens")
                  ])
                ]),
                createVNode("tbody", null, [
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("strong", null, "Initial authentication")
                    ]),
                    createVNode("td", null, "Establish the end user's identity"),
                    createVNode("td", null, "The end user opens the LFI app (or web page) and completes MFA — typically device possession + biometric or PIN. This is identical to how the end user would normally open their banking app.")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("strong", null, "Payment confirmation")
                    ]),
                    createVNode("td", null, "Confirm intent for the specific payment"),
                    createVNode("td", null, [
                      createTextVNode("After reviewing the payment details, the end user confirms authorization with a "),
                      createVNode("strong", null, "native biometric gesture"),
                      createTextVNode(" (e.g. Face ID, fingerprint). This is identical to how the end user would confirm a payment in their banking app.")
                    ])
                  ])
                ])
              ])
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" These two touchpoints serve distinct purposes — identity establishment and payment intent confirmation — and align with how banking apps already handle payment flows. The end user experience is familiar: open the app with your face or fingerprint, review the payment, confirm with your face or fingerprint. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdNote, {
            type: "tip",
            title: `Why this doesn't feel like "authenticating twice"`
          }, {
            default: withCtx(() => [
              createVNode("p", null, " The initial authentication is the natural act of opening and unlocking the banking app. The payment confirmation is the natural act of approving a specific transaction. End users already do this in their banking apps today. The step-up requirement simply ensures this existing pattern is preserved in the Open Finance journey. ")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "cbuae-alignment",
    num: "04",
    color: "var(--at-navy)",
    eyebrow: "CBUAE regulatory alignment",
    title: "Mapping clauses of Notice No. 3057/2025 to Open Finance",
    tone: "surface"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` The table below maps specific clauses from CBUAE Notice No. 3057/2025 <em data-v-fcb0f692${_scopeId2}>Prevention of Fraud Incidents Impacting Consumers</em> to Open Finance requirements: `);
            } else {
              return [
                createTextVNode(" The table below maps specific clauses from CBUAE Notice No. 3057/2025 "),
                createVNode("em", null, "Prevention of Fraud Incidents Impacting Consumers"),
                createTextVNode(" to Open Finance requirements: ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdRefTable, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<table data-v-fcb0f692${_scopeId2}><thead data-v-fcb0f692${_scopeId2}><tr data-v-fcb0f692${_scopeId2}><th style="${ssrRenderStyle({ "width": "3rem" })}" data-v-fcb0f692${_scopeId2}>#</th><th data-v-fcb0f692${_scopeId2}>CBUAE requirement</th><th data-v-fcb0f692${_scopeId2}>Open Finance alignment</th></tr></thead><tbody data-v-fcb0f692${_scopeId2}><tr data-v-fcb0f692${_scopeId2}><td data-v-fcb0f692${_scopeId2}>1</td><td data-v-fcb0f692${_scopeId2}>LFIs are prohibited from using weak authentication methods (SMS OTP, Email OTP, static passcodes) as standalone methods for any transaction, enrolment, provisioning, or channel access</td><td data-v-fcb0f692${_scopeId2}>All Open Finance consent journeys MUST use SCA with at least two independent factors. Weak methods are prohibited as standalone or as factors introduced specifically for Open Finance.</td></tr><tr data-v-fcb0f692${_scopeId2}><td data-v-fcb0f692${_scopeId2}>2</td><td data-v-fcb0f692${_scopeId2}>For 3D Secure transactions, LFIs must use strong authentication (in-app verification, soft tokens, biometrics)</td><td data-v-fcb0f692${_scopeId2}>Open Finance payment consent journeys MUST employ strong in-app or biometric verification for step-up authentication at the point of payment authorization.</td></tr><tr data-v-fcb0f692${_scopeId2}><td data-v-fcb0f692${_scopeId2}>3</td><td data-v-fcb0f692${_scopeId2}>For recurring logins from trusted devices, LFIs may use passcodes or device-native biometrics</td><td data-v-fcb0f692${_scopeId2}>For Open Finance authentication on a trusted (bound) device, LFIs may use device-native biometrics (inherence) alongside the trusted device (possession) to satisfy two-factor SCA.</td></tr><tr data-v-fcb0f692${_scopeId2}><td data-v-fcb0f692${_scopeId2}>4</td><td data-v-fcb0f692${_scopeId2}>LFIs must implement step-up authentication for sensitive actions including payment initiation</td><td data-v-fcb0f692${_scopeId2}>For payment consents, an additional biometric confirmation MUST be performed at the point the end user authorizes the consent. See <a href="#step-up-authentication-for-payment-consents" data-v-fcb0f692${_scopeId2}>step-up authentication</a> above.</td></tr></tbody></table>`);
            } else {
              return [
                createVNode("table", null, [
                  createVNode("thead", null, [
                    createVNode("tr", null, [
                      createVNode("th", { style: { "width": "3rem" } }, "#"),
                      createVNode("th", null, "CBUAE requirement"),
                      createVNode("th", null, "Open Finance alignment")
                    ])
                  ]),
                  createVNode("tbody", null, [
                    createVNode("tr", null, [
                      createVNode("td", null, "1"),
                      createVNode("td", null, "LFIs are prohibited from using weak authentication methods (SMS OTP, Email OTP, static passcodes) as standalone methods for any transaction, enrolment, provisioning, or channel access"),
                      createVNode("td", null, "All Open Finance consent journeys MUST use SCA with at least two independent factors. Weak methods are prohibited as standalone or as factors introduced specifically for Open Finance.")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "2"),
                      createVNode("td", null, "For 3D Secure transactions, LFIs must use strong authentication (in-app verification, soft tokens, biometrics)"),
                      createVNode("td", null, "Open Finance payment consent journeys MUST employ strong in-app or biometric verification for step-up authentication at the point of payment authorization.")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "3"),
                      createVNode("td", null, "For recurring logins from trusted devices, LFIs may use passcodes or device-native biometrics"),
                      createVNode("td", null, "For Open Finance authentication on a trusted (bound) device, LFIs may use device-native biometrics (inherence) alongside the trusted device (possession) to satisfy two-factor SCA.")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "4"),
                      createVNode("td", null, "LFIs must implement step-up authentication for sensitive actions including payment initiation"),
                      createVNode("td", null, [
                        createTextVNode("For payment consents, an additional biometric confirmation MUST be performed at the point the end user authorizes the consent. See "),
                        createVNode("a", { href: "#step-up-authentication-for-payment-consents" }, "step-up authentication"),
                        createTextVNode(" above.")
                      ])
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
              createTextVNode(" The table below maps specific clauses from CBUAE Notice No. 3057/2025 "),
              createVNode("em", null, "Prevention of Fraud Incidents Impacting Consumers"),
              createTextVNode(" to Open Finance requirements: ")
            ]),
            _: 1
          }),
          createVNode(_component_EdRefTable, null, {
            default: withCtx(() => [
              createVNode("table", null, [
                createVNode("thead", null, [
                  createVNode("tr", null, [
                    createVNode("th", { style: { "width": "3rem" } }, "#"),
                    createVNode("th", null, "CBUAE requirement"),
                    createVNode("th", null, "Open Finance alignment")
                  ])
                ]),
                createVNode("tbody", null, [
                  createVNode("tr", null, [
                    createVNode("td", null, "1"),
                    createVNode("td", null, "LFIs are prohibited from using weak authentication methods (SMS OTP, Email OTP, static passcodes) as standalone methods for any transaction, enrolment, provisioning, or channel access"),
                    createVNode("td", null, "All Open Finance consent journeys MUST use SCA with at least two independent factors. Weak methods are prohibited as standalone or as factors introduced specifically for Open Finance.")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, "2"),
                    createVNode("td", null, "For 3D Secure transactions, LFIs must use strong authentication (in-app verification, soft tokens, biometrics)"),
                    createVNode("td", null, "Open Finance payment consent journeys MUST employ strong in-app or biometric verification for step-up authentication at the point of payment authorization.")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, "3"),
                    createVNode("td", null, "For recurring logins from trusted devices, LFIs may use passcodes or device-native biometrics"),
                    createVNode("td", null, "For Open Finance authentication on a trusted (bound) device, LFIs may use device-native biometrics (inherence) alongside the trusted device (possession) to satisfy two-factor SCA.")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, "4"),
                    createVNode("td", null, "LFIs must implement step-up authentication for sensitive actions including payment initiation"),
                    createVNode("td", null, [
                      createTextVNode("For payment consents, an additional biometric confirmation MUST be performed at the point the end user authorizes the consent. See "),
                      createVNode("a", { href: "#step-up-authentication-for-payment-consents" }, "step-up authentication"),
                      createTextVNode(" above.")
                    ])
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
    id: "proofs",
    num: "05",
    color: "var(--at-teal-deep)",
    eyebrow: "Proofs of authentication",
    title: "Cryptographically verifiable assertions",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` A given authentication operation SHOULD be uniquely identifiable and SHOULD produce a cryptographically verifiable proof-of-authentication. This provides: `);
            } else {
              return [
                createTextVNode(" A given authentication operation SHOULD be uniquely identifiable and SHOULD produce a cryptographically verifiable proof-of-authentication. This provides: ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-fcb0f692${_scopeId2}>An audit trail linking the authentication to a specific consent</li><li data-v-fcb0f692${_scopeId2}>Foundations for fraud prevention and dispute resolution</li><li data-v-fcb0f692${_scopeId2}>Assurance to relying parties (API Hub) that authentication occurred</li>`);
            } else {
              return [
                createVNode("li", null, "An audit trail linking the authentication to a specific consent"),
                createVNode("li", null, "Foundations for fraud prevention and dispute resolution"),
                createVNode("li", null, "Assurance to relying parties (API Hub) that authentication occurred")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Where possible, the authentication assertion SHOULD be signed using a private key stored in the device&#39;s secure element (e.g. Secure Enclave on iOS, StrongBox/TEE on Android), and the corresponding public key SHOULD be available for verification. `);
            } else {
              return [
                createTextVNode(" Where possible, the authentication assertion SHOULD be signed using a private key stored in the device's secure element (e.g. Secure Enclave on iOS, StrongBox/TEE on Android), and the corresponding public key SHOULD be available for verification. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" A given authentication operation SHOULD be uniquely identifiable and SHOULD produce a cryptographically verifiable proof-of-authentication. This provides: ")
            ]),
            _: 1
          }),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, "An audit trail linking the authentication to a specific consent"),
              createVNode("li", null, "Foundations for fraud prevention and dispute resolution"),
              createVNode("li", null, "Assurance to relying parties (API Hub) that authentication occurred")
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Where possible, the authentication assertion SHOULD be signed using a private key stored in the device's secure element (e.g. Secure Enclave on iOS, StrongBox/TEE on Android), and the corresponding public key SHOULD be available for verification. ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/v2.1/consent-journey/authentication/sca.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const sca = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-fcb0f692"]]);
export {
  sca as default
};
