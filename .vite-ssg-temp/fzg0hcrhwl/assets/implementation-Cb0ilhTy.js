import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { E as EdCode } from "./EdCode-BQ4YLUeg.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { defineComponent, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const deviceArchDiagram = `end user's device
┌─────────────────────────────────────────────┐
│                                             │
│  LFI Mobile App (bound to this device)      │
│  ┌───────────────────────────────────────┐  │
│  │                                       │  │
│  │  1. App opens via Authorization       │  │
│  │     Endpoint deep link                │  │
│  │                                       │  │
│  │  2. Device binding verified silently  │  │
│  │     (possession factor ✓)             │  │
│  │                                       │  │
│  │  3. Native biometric prompt           │  │
│  │     (inherence factor ✓)              │  │
│  │                                       │  │
│  │  4. SCA complete → proceed to         │  │
│  │     consent authorization             │  │
│  │                                       │  │
│  └───────────────────────────────────────┘  │
│                                             │
│  Secure Element / TEE                       │
│  ┌───────────────────────────────────────┐  │
│  │  Private key (never leaves device)    │  │
│  │  Biometric verification               │  │
│  └───────────────────────────────────────┘  │
│                                             │
└─────────────────────────────────────────────┘`;
const paymentStepUpDiagram = `┌─────────────────────────────────────────────────────┐
│                                                      │
│  1. App opens → device binding verified (possession) │
│  2. Native biometric prompt (inherence)              │
│  3. SCA complete ✓                                   │
│                                                      │
│  ─── end user reviews payment details ───                 │
│                                                      │
│  4. End user taps "Confirm Payment"                       │
│  5. Native biometric prompt (step-up confirmation)   │
│  6. Authorization complete → doConfirm               │
│                                                      │
└──────────────────────────────────────────────────────┘`;
const pushHandoffDiagram = `Mobile browser                         LFI app (bound device)
┌────────────────────┐                ┌─────────────────────┐
│                     │                │                      │
│ 1. GET /auth called │                │                      │
│    (interactionId + │                │                      │
│     consentId       │                │                      │
│     obtained)       │                │                      │
│                     │                │                      │
│ 2. End user enters       │                │                      │
│    username/password │                │                      │
│    (knowledge ✓)    │                │                      │
│                     │   push notif   │                      │
│ 3. LFI sends push ──┼───────────────►│ 4. End user opens notif   │
│                     │                │                      │
│                     │                │ 5. App authenticates  │
│ 6. Browser polls    │                │    (biometric ✓)     │
│    for completion   │                │                      │
│                     │                │ 7. App calls          │
│                     │                │    GET /consents,     │
│                     │                │    authorization,     │
│ 8. Redirect to TPP ◄─┼────────────── │    doConfirm/doFail  │
│                     │                │                      │
└─────────────────────┘                └─────────────────────┘`;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "implementation",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdCode = EdCode;
      const _component_EdRefTable = __unplugin_components_12;
      const _component_EdBullets = __unplugin_components_5;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-ef97c5b6><section class="ed-doc__hero" data-v-ef97c5b6><div class="ed-doc__inner" data-v-ef97c5b6><div class="ed-doc__eyebrow" data-v-ef97c5b6><span class="ed-doc__eyebrow-dash" data-v-ef97c5b6></span> LFI · Consent Journey · Authentication · Implementation </div><h1 class="ed-doc__title" data-v-ef97c5b6> Implementation Guide <span class="ed-doc__read" data-v-ef97c5b6>5 min read</span></h1><p class="ed-doc__lede" data-v-ef97c5b6> This page provides best-practice guidance for LFIs implementing authentication in the Open Finance consent journey. The recommendations here reflect the approach most likely to satisfy <a href="/tech/lfi-api-hub/v2.2-rc1/consent-journey/authentication/sca" data-v-ef97c5b6>SCA requirements</a>, pass CX certification, and deliver an experience consistent with best-in-class mobile banking. </p></div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "recommended-architecture",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Recommended architecture",
        title: "Device-bound app with native biometrics",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The strongest and most seamless authentication approach combines a <strong data-v-ef97c5b6${_scopeId2}>device-bound mobile app</strong> with <strong data-v-ef97c5b6${_scopeId2}>native biometric authentication</strong>. This is the approach used by leading banking apps globally and satisfies SCA with minimal friction. `);
                } else {
                  return [
                    createTextVNode(" The strongest and most seamless authentication approach combines a "),
                    createVNode("strong", null, "device-bound mobile app"),
                    createTextVNode(" with "),
                    createVNode("strong", null, "native biometric authentication"),
                    createTextVNode(". This is the approach used by leading banking apps globally and satisfies SCA with minimal friction. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-ef97c5b6${_scopeId}>How it works</h3>`);
            _push2(ssrRenderComponent(_component_EdCode, {
              lang: "text",
              code: deviceArchDiagram
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-ef97c5b6${_scopeId2}><thead data-v-ef97c5b6${_scopeId2}><tr data-v-ef97c5b6${_scopeId2}><th data-v-ef97c5b6${_scopeId2}>Step</th><th data-v-ef97c5b6${_scopeId2}>What happens</th><th data-v-ef97c5b6${_scopeId2}>SCA factor</th></tr></thead><tbody data-v-ef97c5b6${_scopeId2}><tr data-v-ef97c5b6${_scopeId2}><td data-v-ef97c5b6${_scopeId2}>1</td><td data-v-ef97c5b6${_scopeId2}>The Authorization Endpoint deep link opens the LFI app</td><td data-v-ef97c5b6${_scopeId2}>—</td></tr><tr data-v-ef97c5b6${_scopeId2}><td data-v-ef97c5b6${_scopeId2}>2</td><td data-v-ef97c5b6${_scopeId2}>The app verifies it is running on the bound device by checking cryptographic keys stored in the secure element</td><td data-v-ef97c5b6${_scopeId2}><strong data-v-ef97c5b6${_scopeId2}>Possession</strong> — the device the app is bound to</td></tr><tr data-v-ef97c5b6${_scopeId2}><td data-v-ef97c5b6${_scopeId2}>3</td><td data-v-ef97c5b6${_scopeId2}>The app prompts for a native biometric (Face ID, Touch ID, fingerprint)</td><td data-v-ef97c5b6${_scopeId2}><strong data-v-ef97c5b6${_scopeId2}>Inherence</strong> — the end user&#39;s biometric</td></tr><tr data-v-ef97c5b6${_scopeId2}><td data-v-ef97c5b6${_scopeId2}>4</td><td data-v-ef97c5b6${_scopeId2}>SCA is satisfied (two factors). The end user proceeds to review and authorize the consent</td><td data-v-ef97c5b6${_scopeId2}>—</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Step"),
                          createVNode("th", null, "What happens"),
                          createVNode("th", null, "SCA factor")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, "1"),
                          createVNode("td", null, "The Authorization Endpoint deep link opens the LFI app"),
                          createVNode("td", null, "—")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "2"),
                          createVNode("td", null, "The app verifies it is running on the bound device by checking cryptographic keys stored in the secure element"),
                          createVNode("td", null, [
                            createVNode("strong", null, "Possession"),
                            createTextVNode(" — the device the app is bound to")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "3"),
                          createVNode("td", null, "The app prompts for a native biometric (Face ID, Touch ID, fingerprint)"),
                          createVNode("td", null, [
                            createVNode("strong", null, "Inherence"),
                            createTextVNode(" — the end user's biometric")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "4"),
                          createVNode("td", null, "SCA is satisfied (two factors). The end user proceeds to review and authorize the consent"),
                          createVNode("td", null, "—")
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
                  _push3(`This is best-in-class because:`);
                } else {
                  return [
                    createTextVNode("This is best-in-class because:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-ef97c5b6${_scopeId2}><strong data-v-ef97c5b6${_scopeId2}>It is fast</strong> — a single biometric gesture, no typing, no waiting for OTPs</li><li data-v-ef97c5b6${_scopeId2}><strong data-v-ef97c5b6${_scopeId2}>It is familiar</strong> — identical to opening the banking app normally</li><li data-v-ef97c5b6${_scopeId2}><strong data-v-ef97c5b6${_scopeId2}>It is secure</strong> — private keys in the secure element, biometric verification on-device</li><li data-v-ef97c5b6${_scopeId2}><strong data-v-ef97c5b6${_scopeId2}>It satisfies SCA</strong> — possession (bound device) + inherence (biometric)</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "It is fast"),
                      createTextVNode(" — a single biometric gesture, no typing, no waiting for OTPs")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "It is familiar"),
                      createTextVNode(" — identical to opening the banking app normally")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "It is secure"),
                      createTextVNode(" — private keys in the secure element, biometric verification on-device")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "It satisfies SCA"),
                      createTextVNode(" — possession (bound device) + inherence (biometric)")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-ef97c5b6${_scopeId}>Device binding</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The LFI app MUST be bound to the end user&#39;s device during the app&#39;s initial registration or enrolment. Binding MUST be established through: `);
                } else {
                  return [
                    createTextVNode(" The LFI app MUST be bound to the end user's device during the app's initial registration or enrolment. Binding MUST be established through: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-ef97c5b6${_scopeId2}>A cryptographic key pair generated in the device&#39;s secure element (Secure Enclave on iOS, StrongBox/TEE on Android)</li><li data-v-ef97c5b6${_scopeId2}>The public key registered with the LFI&#39;s backend during enrolment</li><li data-v-ef97c5b6${_scopeId2}>The private key remaining on-device and never exported</li>`);
                } else {
                  return [
                    createVNode("li", null, "A cryptographic key pair generated in the device's secure element (Secure Enclave on iOS, StrongBox/TEE on Android)"),
                    createVNode("li", null, "The public key registered with the LFI's backend during enrolment"),
                    createVNode("li", null, "The private key remaining on-device and never exported")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` On each authentication, the app verifies device binding by performing a cryptographic operation with the private key. This is silent to the end user — no user interaction is required for the possession factor. `);
                } else {
                  return [
                    createTextVNode(" On each authentication, the app verifies device binding by performing a cryptographic operation with the private key. This is silent to the end user — no user interaction is required for the possession factor. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-ef97c5b6${_scopeId}>Native biometrics</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`The biometric authentication MUST use the device&#39;s native biometric APIs:`);
                } else {
                  return [
                    createTextVNode("The biometric authentication MUST use the device's native biometric APIs:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-ef97c5b6${_scopeId2}><thead data-v-ef97c5b6${_scopeId2}><tr data-v-ef97c5b6${_scopeId2}><th data-v-ef97c5b6${_scopeId2}>Platform</th><th data-v-ef97c5b6${_scopeId2}>API</th><th data-v-ef97c5b6${_scopeId2}>Biometrics supported</th></tr></thead><tbody data-v-ef97c5b6${_scopeId2}><tr data-v-ef97c5b6${_scopeId2}><td data-v-ef97c5b6${_scopeId2}>iOS</td><td data-v-ef97c5b6${_scopeId2}>Local Authentication framework / Face ID / Touch ID</td><td data-v-ef97c5b6${_scopeId2}>Face ID, Touch ID</td></tr><tr data-v-ef97c5b6${_scopeId2}><td data-v-ef97c5b6${_scopeId2}>Android</td><td data-v-ef97c5b6${_scopeId2}>BiometricPrompt API</td><td data-v-ef97c5b6${_scopeId2}>Fingerprint, face unlock, iris (device-dependent)</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Platform"),
                          createVNode("th", null, "API"),
                          createVNode("th", null, "Biometrics supported")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, "iOS"),
                          createVNode("td", null, "Local Authentication framework / Face ID / Touch ID"),
                          createVNode("td", null, "Face ID, Touch ID")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "Android"),
                          createVNode("td", null, "BiometricPrompt API"),
                          createVNode("td", null, "Fingerprint, face unlock, iris (device-dependent)")
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
                  _push3(` The biometric prompt MUST be the platform-native prompt. LFIs MUST NOT implement custom biometric capture. The operating system handles the biometric matching against enrolled biometrics; the result is an assertion that the enrolled user is present. `);
                } else {
                  return [
                    createTextVNode(" The biometric prompt MUST be the platform-native prompt. LFIs MUST NOT implement custom biometric capture. The operating system handles the biometric matching against enrolled biometrics; the result is an assertion that the enrolled user is present. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-ef97c5b6${_scopeId}>Fallback to PIN/password</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` If native biometrics are not available (not enrolled, hardware not present, or user preference), the app MUST fall back to a knowledge factor: `);
                } else {
                  return [
                    createTextVNode(" If native biometrics are not available (not enrolled, hardware not present, or user preference), the app MUST fall back to a knowledge factor: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-ef97c5b6${_scopeId2}>PIN or password entry within the LFI app</li><li data-v-ef97c5b6${_scopeId2}>This combined with the bound device still satisfies SCA (possession + knowledge)</li>`);
                } else {
                  return [
                    createVNode("li", null, "PIN or password entry within the LFI app"),
                    createVNode("li", null, "This combined with the bound device still satisfies SCA (possession + knowledge)")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The strongest and most seamless authentication approach combines a "),
                  createVNode("strong", null, "device-bound mobile app"),
                  createTextVNode(" with "),
                  createVNode("strong", null, "native biometric authentication"),
                  createTextVNode(". This is the approach used by leading banking apps globally and satisfies SCA with minimal friction. ")
                ]),
                _: 1
              }),
              createVNode("h3", null, "How it works"),
              createVNode(_component_EdCode, {
                lang: "text",
                code: deviceArchDiagram
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Step"),
                        createVNode("th", null, "What happens"),
                        createVNode("th", null, "SCA factor")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, "1"),
                        createVNode("td", null, "The Authorization Endpoint deep link opens the LFI app"),
                        createVNode("td", null, "—")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "2"),
                        createVNode("td", null, "The app verifies it is running on the bound device by checking cryptographic keys stored in the secure element"),
                        createVNode("td", null, [
                          createVNode("strong", null, "Possession"),
                          createTextVNode(" — the device the app is bound to")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "3"),
                        createVNode("td", null, "The app prompts for a native biometric (Face ID, Touch ID, fingerprint)"),
                        createVNode("td", null, [
                          createVNode("strong", null, "Inherence"),
                          createTextVNode(" — the end user's biometric")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "4"),
                        createVNode("td", null, "SCA is satisfied (two factors). The end user proceeds to review and authorize the consent"),
                        createVNode("td", null, "—")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("This is best-in-class because:")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "It is fast"),
                    createTextVNode(" — a single biometric gesture, no typing, no waiting for OTPs")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "It is familiar"),
                    createTextVNode(" — identical to opening the banking app normally")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "It is secure"),
                    createTextVNode(" — private keys in the secure element, biometric verification on-device")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "It satisfies SCA"),
                    createTextVNode(" — possession (bound device) + inherence (biometric)")
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "Device binding"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The LFI app MUST be bound to the end user's device during the app's initial registration or enrolment. Binding MUST be established through: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "A cryptographic key pair generated in the device's secure element (Secure Enclave on iOS, StrongBox/TEE on Android)"),
                  createVNode("li", null, "The public key registered with the LFI's backend during enrolment"),
                  createVNode("li", null, "The private key remaining on-device and never exported")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" On each authentication, the app verifies device binding by performing a cryptographic operation with the private key. This is silent to the end user — no user interaction is required for the possession factor. ")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Native biometrics"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("The biometric authentication MUST use the device's native biometric APIs:")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Platform"),
                        createVNode("th", null, "API"),
                        createVNode("th", null, "Biometrics supported")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, "iOS"),
                        createVNode("td", null, "Local Authentication framework / Face ID / Touch ID"),
                        createVNode("td", null, "Face ID, Touch ID")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "Android"),
                        createVNode("td", null, "BiometricPrompt API"),
                        createVNode("td", null, "Fingerprint, face unlock, iris (device-dependent)")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The biometric prompt MUST be the platform-native prompt. LFIs MUST NOT implement custom biometric capture. The operating system handles the biometric matching against enrolled biometrics; the result is an assertion that the enrolled user is present. ")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Fallback to PIN/password"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" If native biometrics are not available (not enrolled, hardware not present, or user preference), the app MUST fall back to a knowledge factor: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "PIN or password entry within the LFI app"),
                  createVNode("li", null, "This combined with the bound device still satisfies SCA (possession + knowledge)")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "payment-step-up",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "Payment consent flow",
        title: "Step-up confirmation at point of authorization",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` For payment consents, the flow extends with a biometric confirmation at the point of authorization: `);
                } else {
                  return [
                    createTextVNode(" For payment consents, the flow extends with a biometric confirmation at the point of authorization: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              lang: "text",
              code: paymentStepUpDiagram
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The step-up biometric at step 5 confirms the end user&#39;s intent to authorize the specific payment. This maps directly to how banking apps handle payment confirmation and satisfies the CBUAE directive&#39;s step-up requirement for sensitive actions. `);
                } else {
                  return [
                    createTextVNode(" The step-up biometric at step 5 confirms the end user's intent to authorize the specific payment. This maps directly to how banking apps handle payment confirmation and satisfies the CBUAE directive's step-up requirement for sensitive actions. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" For payment consents, the flow extends with a biometric confirmation at the point of authorization: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                lang: "text",
                code: paymentStepUpDiagram
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The step-up biometric at step 5 confirms the end user's intent to authorize the specific payment. This maps directly to how banking apps handle payment confirmation and satisfies the CBUAE directive's step-up requirement for sensitive actions. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "fallback-scenarios-when-the-app-is-not-available",
        num: "03",
        color: "var(--at-blue-deep, #1d4ed8)",
        eyebrow: "Fallback scenarios",
        title: "When the app is not available",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The <a href="/tech/lfi-api-hub/v2.2-rc1/consent-journey/authentication/#app-invocation" data-v-ef97c5b6${_scopeId2}>Overview</a> defines the scenarios where the end user does not have the LFI app installed. This section provides implementation detail for those flows. `);
                } else {
                  return [
                    createTextVNode(" The "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/consent-journey/authentication/#app-invocation" }, "Overview"),
                    createTextVNode(" defines the scenarios where the end user does not have the LFI app installed. This section provides implementation detail for those flows. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-ef97c5b6${_scopeId}>Mobile browser — browser-based authentication</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` If the LFI already supports browser-based authentication in its digital channels, the same capability MUST be available for Open Finance. The SCA requirements apply — the browser flow must achieve two-factor authentication: `);
                } else {
                  return [
                    createTextVNode(" If the LFI already supports browser-based authentication in its digital channels, the same capability MUST be available for Open Finance. The SCA requirements apply — the browser flow must achieve two-factor authentication: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-ef97c5b6${_scopeId2}><thead data-v-ef97c5b6${_scopeId2}><tr data-v-ef97c5b6${_scopeId2}><th data-v-ef97c5b6${_scopeId2}>Factor</th><th data-v-ef97c5b6${_scopeId2}>Browser-based approach</th></tr></thead><tbody data-v-ef97c5b6${_scopeId2}><tr data-v-ef97c5b6${_scopeId2}><td data-v-ef97c5b6${_scopeId2}><strong data-v-ef97c5b6${_scopeId2}>Possession</strong></td><td data-v-ef97c5b6${_scopeId2}>Verified through a registered credential (e.g. a FIDO2/Passkey credential bound to the device, or a device fingerprint established during prior enrolment)</td></tr><tr data-v-ef97c5b6${_scopeId2}><td data-v-ef97c5b6${_scopeId2}><strong data-v-ef97c5b6${_scopeId2}>Inherence</strong> or <strong data-v-ef97c5b6${_scopeId2}>Knowledge</strong></td><td data-v-ef97c5b6${_scopeId2}>Biometric authentication via WebAuthn/FIDO2 (if supported), or PIN/password entry</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Factor"),
                          createVNode("th", null, "Browser-based approach")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "Possession")
                          ]),
                          createVNode("td", null, "Verified through a registered credential (e.g. a FIDO2/Passkey credential bound to the device, or a device fingerprint established during prior enrolment)")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "Inherence"),
                            createTextVNode(" or "),
                            createVNode("strong", null, "Knowledge")
                          ]),
                          createVNode("td", null, "Biometric authentication via WebAuthn/FIDO2 (if supported), or PIN/password entry")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 id="mobile-browser--app-handoff-via-push-notification" data-v-ef97c5b6${_scopeId}>Mobile browser — app handoff via push notification</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` When the LFI does not support browser-based authentication, the LFI MUST hand off to the mobile app: `);
                } else {
                  return [
                    createTextVNode(" When the LFI does not support browser-based authentication, the LFI MUST hand off to the mobile app: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              lang: "text",
              code: pushHandoffDiagram
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Key implementation details:`);
                } else {
                  return [
                    createTextVNode("Key implementation details:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-ef97c5b6${_scopeId2}><span class="endpoint" data-v-ef97c5b6${_scopeId2}><span class="http-method http-method--get" data-v-ef97c5b6${_scopeId2}>GET</span><code data-v-ef97c5b6${_scopeId2}>/auth</code></span> MUST be called in the browser session — it cannot be called again from the app</li><li data-v-ef97c5b6${_scopeId2}>The <code data-v-ef97c5b6${_scopeId2}>interactionId</code> and <code data-v-ef97c5b6${_scopeId2}>consentId</code> MUST be passed to the app via the push notification deep link</li><li data-v-ef97c5b6${_scopeId2}>The app uses these identifiers to call <span class="endpoint" data-v-ef97c5b6${_scopeId2}><span class="http-method http-method--get" data-v-ef97c5b6${_scopeId2}>GET</span><code data-v-ef97c5b6${_scopeId2}>/consents/{consentId}</code></span>, present the authorization screen, and call <code data-v-ef97c5b6${_scopeId2}>doConfirm</code> or <code data-v-ef97c5b6${_scopeId2}>doFail</code></li><li data-v-ef97c5b6${_scopeId2}>The browser page MUST poll for completion and redirect back to the TPP</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("span", { class: "endpoint" }, [
                        createVNode("span", { class: "http-method http-method--get" }, "GET"),
                        createVNode("code", null, "/auth")
                      ]),
                      createTextVNode(" MUST be called in the browser session — it cannot be called again from the app")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("The "),
                      createVNode("code", null, "interactionId"),
                      createTextVNode(" and "),
                      createVNode("code", null, "consentId"),
                      createTextVNode(" MUST be passed to the app via the push notification deep link")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("The app uses these identifiers to call "),
                      createVNode("span", { class: "endpoint" }, [
                        createVNode("span", { class: "http-method http-method--get" }, "GET"),
                        createVNode("code", null, "/consents/{consentId}")
                      ]),
                      createTextVNode(", present the authorization screen, and call "),
                      createVNode("code", null, "doConfirm"),
                      createTextVNode(" or "),
                      createVNode("code", null, "doFail")
                    ]),
                    createVNode("li", null, "The browser page MUST poll for completion and redirect back to the TPP")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 id="desktop-browser--qr-code-or-push-notification" data-v-ef97c5b6${_scopeId}>Desktop browser — QR code or push notification</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`On desktop, the LFI presents a web page with two handoff options:`);
                } else {
                  return [
                    createTextVNode("On desktop, the LFI presents a web page with two handoff options:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<strong data-v-ef97c5b6${_scopeId2}>QR code:</strong> The page displays a QR code that resolves to a deep link containing the <code data-v-ef97c5b6${_scopeId2}>interactionId</code> and <code data-v-ef97c5b6${_scopeId2}>consentId</code> (obtained from <span class="endpoint" data-v-ef97c5b6${_scopeId2}><span class="http-method http-method--get" data-v-ef97c5b6${_scopeId2}>GET</span><code data-v-ef97c5b6${_scopeId2}>/auth</code></span> in the desktop browser session). The end user scans the code with their mobile device, which opens the LFI app. The end user authenticates and completes consent authorization in the app. The desktop page polls for completion and redirects back to the TPP. `);
                } else {
                  return [
                    createVNode("strong", null, "QR code:"),
                    createTextVNode(" The page displays a QR code that resolves to a deep link containing the "),
                    createVNode("code", null, "interactionId"),
                    createTextVNode(" and "),
                    createVNode("code", null, "consentId"),
                    createTextVNode(" (obtained from "),
                    createVNode("span", { class: "endpoint" }, [
                      createVNode("span", { class: "http-method http-method--get" }, "GET"),
                      createVNode("code", null, "/auth")
                    ]),
                    createTextVNode(" in the desktop browser session). The end user scans the code with their mobile device, which opens the LFI app. The end user authenticates and completes consent authorization in the app. The desktop page polls for completion and redirects back to the TPP. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<strong data-v-ef97c5b6${_scopeId2}>Push notification:</strong> Identical to the <a href="#mobile-browser--app-handoff-via-push-notification" data-v-ef97c5b6${_scopeId2}>mobile browser handoff</a> above — the desktop page collects username/password, triggers a push to the bound device, and polls for completion. `);
                } else {
                  return [
                    createVNode("strong", null, "Push notification:"),
                    createTextVNode(" Identical to the "),
                    createVNode("a", { href: "#mobile-browser--app-handoff-via-push-notification" }, "mobile browser handoff"),
                    createTextVNode(" above — the desktop page collects username/password, triggers a push to the bound device, and polls for completion. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` If the LFI supports browser-based authentication in its existing channels, the end user MUST also be able to complete the entire journey in the desktop browser without the mobile app. `);
                } else {
                  return [
                    createTextVNode(" If the LFI supports browser-based authentication in its existing channels, the end user MUST also be able to complete the entire journey in the desktop browser without the mobile app. ")
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
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/consent-journey/authentication/#app-invocation" }, "Overview"),
                  createTextVNode(" defines the scenarios where the end user does not have the LFI app installed. This section provides implementation detail for those flows. ")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Mobile browser — browser-based authentication"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" If the LFI already supports browser-based authentication in its digital channels, the same capability MUST be available for Open Finance. The SCA requirements apply — the browser flow must achieve two-factor authentication: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Factor"),
                        createVNode("th", null, "Browser-based approach")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "Possession")
                        ]),
                        createVNode("td", null, "Verified through a registered credential (e.g. a FIDO2/Passkey credential bound to the device, or a device fingerprint established during prior enrolment)")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "Inherence"),
                          createTextVNode(" or "),
                          createVNode("strong", null, "Knowledge")
                        ]),
                        createVNode("td", null, "Biometric authentication via WebAuthn/FIDO2 (if supported), or PIN/password entry")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", { id: "mobile-browser--app-handoff-via-push-notification" }, "Mobile browser — app handoff via push notification"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" When the LFI does not support browser-based authentication, the LFI MUST hand off to the mobile app: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                lang: "text",
                code: pushHandoffDiagram
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Key implementation details:")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("span", { class: "endpoint" }, [
                      createVNode("span", { class: "http-method http-method--get" }, "GET"),
                      createVNode("code", null, "/auth")
                    ]),
                    createTextVNode(" MUST be called in the browser session — it cannot be called again from the app")
                  ]),
                  createVNode("li", null, [
                    createTextVNode("The "),
                    createVNode("code", null, "interactionId"),
                    createTextVNode(" and "),
                    createVNode("code", null, "consentId"),
                    createTextVNode(" MUST be passed to the app via the push notification deep link")
                  ]),
                  createVNode("li", null, [
                    createTextVNode("The app uses these identifiers to call "),
                    createVNode("span", { class: "endpoint" }, [
                      createVNode("span", { class: "http-method http-method--get" }, "GET"),
                      createVNode("code", null, "/consents/{consentId}")
                    ]),
                    createTextVNode(", present the authorization screen, and call "),
                    createVNode("code", null, "doConfirm"),
                    createTextVNode(" or "),
                    createVNode("code", null, "doFail")
                  ]),
                  createVNode("li", null, "The browser page MUST poll for completion and redirect back to the TPP")
                ]),
                _: 1
              }),
              createVNode("h3", { id: "desktop-browser--qr-code-or-push-notification" }, "Desktop browser — QR code or push notification"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("On desktop, the LFI presents a web page with two handoff options:")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("strong", null, "QR code:"),
                  createTextVNode(" The page displays a QR code that resolves to a deep link containing the "),
                  createVNode("code", null, "interactionId"),
                  createTextVNode(" and "),
                  createVNode("code", null, "consentId"),
                  createTextVNode(" (obtained from "),
                  createVNode("span", { class: "endpoint" }, [
                    createVNode("span", { class: "http-method http-method--get" }, "GET"),
                    createVNode("code", null, "/auth")
                  ]),
                  createTextVNode(" in the desktop browser session). The end user scans the code with their mobile device, which opens the LFI app. The end user authenticates and completes consent authorization in the app. The desktop page polls for completion and redirects back to the TPP. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("strong", null, "Push notification:"),
                  createTextVNode(" Identical to the "),
                  createVNode("a", { href: "#mobile-browser--app-handoff-via-push-notification" }, "mobile browser handoff"),
                  createTextVNode(" above — the desktop page collects username/password, triggers a push to the bound device, and polls for completion. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" If the LFI supports browser-based authentication in its existing channels, the end user MUST also be able to complete the entire journey in the desktop browser without the mobile app. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "emerging",
        num: "04",
        color: "var(--at-navy)",
        eyebrow: "Emerging best practices",
        title: "Standards LFIs SHOULD evaluate",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The following standards and technologies are consistent with the SCA principles and controls described in this guide. LFIs SHOULD evaluate them for future implementation: `);
                } else {
                  return [
                    createTextVNode(" The following standards and technologies are consistent with the SCA principles and controls described in this guide. LFIs SHOULD evaluate them for future implementation: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-ef97c5b6${_scopeId}>FIDO2</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` FIDO2 is a suite of protocols that provides strong proofs-of-authentication using public-key cryptography. Unlike app-bound biometrics, FIDO2 produces a portable <strong data-v-ef97c5b6${_scopeId2}>Authentication Assertion</strong> — a signed object that can be verified by any relying party holding the corresponding public key. FIDO2 satisfies SCA through possession (private key on device) and inherence (biometric gate to the key). `);
                } else {
                  return [
                    createTextVNode(" FIDO2 is a suite of protocols that provides strong proofs-of-authentication using public-key cryptography. Unlike app-bound biometrics, FIDO2 produces a portable "),
                    createVNode("strong", null, "Authentication Assertion"),
                    createTextVNode(" — a signed object that can be verified by any relying party holding the corresponding public key. FIDO2 satisfies SCA through possession (private key on device) and inherence (biometric gate to the key). ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-ef97c5b6${_scopeId}>Passkeys</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Passkeys are a cross-platform implementation of FIDO2 credentials developed by the FIDO Alliance with Apple and Google. They add the ability to synchronise keys between devices and recover from device loss — a key limitation of device-bound FIDO2 credentials. Passkeys provide the same SCA properties as FIDO2 with improved usability. `);
                } else {
                  return [
                    createTextVNode(" Passkeys are a cross-platform implementation of FIDO2 credentials developed by the FIDO Alliance with Apple and Google. They add the ability to synchronise keys between devices and recover from device loss — a key limitation of device-bound FIDO2 credentials. Passkeys provide the same SCA properties as FIDO2 with improved usability. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-ef97c5b6${_scopeId}>Secure Payment Confirmation (SPC)</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` SPC is a W3C standard that extends WebAuthn specifically for payment authentication. It presents a browser-native payment confirmation dialog that includes the payee and amount, with biometric verification. SPC supports the CBUAE dynamic-linking requirement (binding the authentication to a specific payment) and is already incorporated into 3D Secure flows. `);
                } else {
                  return [
                    createTextVNode(" SPC is a W3C standard that extends WebAuthn specifically for payment authentication. It presents a browser-native payment confirmation dialog that includes the payee and amount, with biometric verification. SPC supports the CBUAE dynamic-linking requirement (binding the authentication to a specific payment) and is already incorporated into 3D Secure flows. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-ef97c5b6${_scopeId}>OpenID for Verifiable Credentials</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` OpenID for Verifiable Credentials (OID4VC) provides a framework for presenting verifiable identity credentials as part of an authentication flow. This could enable third-party identity providers to participate in SCA, broadening the ecosystem beyond bank-issued credentials. `);
                } else {
                  return [
                    createTextVNode(" OpenID for Verifiable Credentials (OID4VC) provides a framework for presenting verifiable identity credentials as part of an authentication flow. This could enable third-party identity providers to participate in SCA, broadening the ecosystem beyond bank-issued credentials. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The following standards and technologies are consistent with the SCA principles and controls described in this guide. LFIs SHOULD evaluate them for future implementation: ")
                ]),
                _: 1
              }),
              createVNode("h3", null, "FIDO2"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" FIDO2 is a suite of protocols that provides strong proofs-of-authentication using public-key cryptography. Unlike app-bound biometrics, FIDO2 produces a portable "),
                  createVNode("strong", null, "Authentication Assertion"),
                  createTextVNode(" — a signed object that can be verified by any relying party holding the corresponding public key. FIDO2 satisfies SCA through possession (private key on device) and inherence (biometric gate to the key). ")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Passkeys"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Passkeys are a cross-platform implementation of FIDO2 credentials developed by the FIDO Alliance with Apple and Google. They add the ability to synchronise keys between devices and recover from device loss — a key limitation of device-bound FIDO2 credentials. Passkeys provide the same SCA properties as FIDO2 with improved usability. ")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Secure Payment Confirmation (SPC)"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" SPC is a W3C standard that extends WebAuthn specifically for payment authentication. It presents a browser-native payment confirmation dialog that includes the payee and amount, with biometric verification. SPC supports the CBUAE dynamic-linking requirement (binding the authentication to a specific payment) and is already incorporated into 3D Secure flows. ")
                ]),
                _: 1
              }),
              createVNode("h3", null, "OpenID for Verifiable Credentials"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" OpenID for Verifiable Credentials (OID4VC) provides a framework for presenting verifiable identity credentials as part of an authentication flow. This could enable third-party identity providers to participate in SCA, broadening the ecosystem beyond bank-issued credentials. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "security-controls",
        num: "05",
        color: "var(--at-teal-deep)",
        eyebrow: "Security controls",
        title: "Required controls for authentication implementations",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`LFIs MUST apply the following controls to their authentication implementation:`);
                } else {
                  return [
                    createTextVNode("LFIs MUST apply the following controls to their authentication implementation:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-ef97c5b6${_scopeId2}><thead data-v-ef97c5b6${_scopeId2}><tr data-v-ef97c5b6${_scopeId2}><th style="${ssrRenderStyle({ "width": "3rem" })}" data-v-ef97c5b6${_scopeId2}>#</th><th data-v-ef97c5b6${_scopeId2}>Control</th><th data-v-ef97c5b6${_scopeId2}>Rationale</th></tr></thead><tbody data-v-ef97c5b6${_scopeId2}><tr data-v-ef97c5b6${_scopeId2}><td data-v-ef97c5b6${_scopeId2}>1</td><td data-v-ef97c5b6${_scopeId2}>Apps MUST be distributed through authorised app stores only</td><td data-v-ef97c5b6${_scopeId2}>Provides a trusted source and enables integrity verification</td></tr><tr data-v-ef97c5b6${_scopeId2}><td data-v-ef97c5b6${_scopeId2}>2</td><td data-v-ef97c5b6${_scopeId2}>Apps MUST verify the mobile OS version is supported</td><td data-v-ef97c5b6${_scopeId2}>Ensures expected behaviour and reduces risk of information leakage</td></tr><tr data-v-ef97c5b6${_scopeId2}><td data-v-ef97c5b6${_scopeId2}>3</td><td data-v-ef97c5b6${_scopeId2}>App installations MUST be correlated to a specific device signature</td><td data-v-ef97c5b6${_scopeId2}>Establishes provenance of authentication operations</td></tr><tr data-v-ef97c5b6${_scopeId2}><td data-v-ef97c5b6${_scopeId2}>4</td><td data-v-ef97c5b6${_scopeId2}>Private keys MUST be stored in the device secure element</td><td data-v-ef97c5b6${_scopeId2}>Prevents extraction and reflects OWASP mobile best practices</td></tr><tr data-v-ef97c5b6${_scopeId2}><td data-v-ef97c5b6${_scopeId2}>5</td><td data-v-ef97c5b6${_scopeId2}>Apps MUST verify the identity of external services (e.g. API Hub endpoints) using certificate pinning or equivalent</td><td data-v-ef97c5b6${_scopeId2}>Prevents redirection of authentication flows to malicious services</td></tr><tr data-v-ef97c5b6${_scopeId2}><td data-v-ef97c5b6${_scopeId2}>6</td><td data-v-ef97c5b6${_scopeId2}>Apps MUST NOT operate on jailbroken or rooted devices</td><td data-v-ef97c5b6${_scopeId2}>Prevents compromise of the secure element and authentication flow</td></tr><tr data-v-ef97c5b6${_scopeId2}><td data-v-ef97c5b6${_scopeId2}>7</td><td data-v-ef97c5b6${_scopeId2}>Each authentication operation MUST be linked to the specific consent being authorized</td><td data-v-ef97c5b6${_scopeId2}>Provides audit trail and prevents replay of authentication assertions</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", { style: { "width": "3rem" } }, "#"),
                          createVNode("th", null, "Control"),
                          createVNode("th", null, "Rationale")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, "1"),
                          createVNode("td", null, "Apps MUST be distributed through authorised app stores only"),
                          createVNode("td", null, "Provides a trusted source and enables integrity verification")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "2"),
                          createVNode("td", null, "Apps MUST verify the mobile OS version is supported"),
                          createVNode("td", null, "Ensures expected behaviour and reduces risk of information leakage")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "3"),
                          createVNode("td", null, "App installations MUST be correlated to a specific device signature"),
                          createVNode("td", null, "Establishes provenance of authentication operations")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "4"),
                          createVNode("td", null, "Private keys MUST be stored in the device secure element"),
                          createVNode("td", null, "Prevents extraction and reflects OWASP mobile best practices")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "5"),
                          createVNode("td", null, "Apps MUST verify the identity of external services (e.g. API Hub endpoints) using certificate pinning or equivalent"),
                          createVNode("td", null, "Prevents redirection of authentication flows to malicious services")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "6"),
                          createVNode("td", null, "Apps MUST NOT operate on jailbroken or rooted devices"),
                          createVNode("td", null, "Prevents compromise of the secure element and authentication flow")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "7"),
                          createVNode("td", null, "Each authentication operation MUST be linked to the specific consent being authorized"),
                          createVNode("td", null, "Provides audit trail and prevents replay of authentication assertions")
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
                  createTextVNode("LFIs MUST apply the following controls to their authentication implementation:")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", { style: { "width": "3rem" } }, "#"),
                        createVNode("th", null, "Control"),
                        createVNode("th", null, "Rationale")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, "1"),
                        createVNode("td", null, "Apps MUST be distributed through authorised app stores only"),
                        createVNode("td", null, "Provides a trusted source and enables integrity verification")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "2"),
                        createVNode("td", null, "Apps MUST verify the mobile OS version is supported"),
                        createVNode("td", null, "Ensures expected behaviour and reduces risk of information leakage")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "3"),
                        createVNode("td", null, "App installations MUST be correlated to a specific device signature"),
                        createVNode("td", null, "Establishes provenance of authentication operations")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "4"),
                        createVNode("td", null, "Private keys MUST be stored in the device secure element"),
                        createVNode("td", null, "Prevents extraction and reflects OWASP mobile best practices")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "5"),
                        createVNode("td", null, "Apps MUST verify the identity of external services (e.g. API Hub endpoints) using certificate pinning or equivalent"),
                        createVNode("td", null, "Prevents redirection of authentication flows to malicious services")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "6"),
                        createVNode("td", null, "Apps MUST NOT operate on jailbroken or rooted devices"),
                        createVNode("td", null, "Prevents compromise of the secure element and authentication flow")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "7"),
                        createVNode("td", null, "Each authentication operation MUST be linked to the specific consent being authorized"),
                        createVNode("td", null, "Provides audit trail and prevents replay of authentication assertions")
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
    };
  }
});
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/v2.2-rc1/consent-journey/authentication/implementation.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const implementation = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ef97c5b6"]]);
export {
  implementation as default
};
