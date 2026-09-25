import { _ as __unplugin_components_6$2, a as __unplugin_components_7 } from "./EdRelatedCards-D4uHHv56.js";
import { E as EdCode } from "./EdCode-DdFAg-H5.js";
import { _ as __unplugin_components_6$1 } from "./EdRefTable-DCHoNUfr.js";
import { _ as __unplugin_components_6 } from "./EdBullets-gB3sPgIp.js";
import { _ as __unplugin_components_4 } from "./EdProse-D3vi_RS_.js";
import { _ as __unplugin_components_5 } from "./EdNote-61YjJPRT.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-DD63-Oxz.js";
import { _ as __unplugin_components_2 } from "./EdInPageNav-DkIq-w7S.js";
import { _ as __unplugin_components_0$1 } from "./EdHero-BRdU9xqH.js";
import { _ as __unplugin_components_0 } from "./EdBackStrip-CrlwbtLm.js";
import { defineComponent, mergeProps, withCtx, createVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const jwksProduction = `Active     https://keystore.directory.openfinance.ae/{id}/application.jwks
Inactive   https://keystore.directory.openfinance.ae/{id}/inactive/application.jwks`;
const jwksSandbox = `Active     https://keystore.sandbox.directory.openfinance.ae/{id}/application.jwks
Inactive   https://keystore.sandbox.directory.openfinance.ae/{id}/inactive/application.jwks`;
const activeOnlySnippet = `const jwks = createRemoteJWKSet(new URL(jwksUri))   // active keys only
const { payload } = await jwtVerify(jwsString, jwks)`;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "pii-signature-verification",
  __ssrInlineRender: true,
  setup(__props) {
    const sections = [
      { id: "problem", label: "The problem" },
      { id: "when", label: "Where you verify" },
      { id: "jwks", label: "Active & inactive JWKS" },
      { id: "how", label: "Verifying later" },
      { id: "timing", label: "Timing claims" }
    ];
    const meta = [
      { label: "Category", value: "Security" },
      { label: "Read", value: "6 min" },
      { label: "Updated", value: "15 Sep 2026" }
    ];
    const tags = ["PII", "JWS", "Trust Framework"];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdBackStrip = __unplugin_components_0;
      const _component_EdHero = __unplugin_components_0$1;
      const _component_EdInPageNav = __unplugin_components_2;
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdNote = __unplugin_components_5;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdBullets = __unplugin_components_6;
      const _component_EdRefTable = __unplugin_components_6$1;
      const _component_EdCode = EdCode;
      const _component_EdRelatedCards = __unplugin_components_6$2;
      const _component_EdRelatedCard = __unplugin_components_7;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-page" }, _attrs))} data-v-0c2bdd7e>`);
      _push(ssrRenderComponent(_component_EdBackStrip, {
        href: "/knowledge-base/",
        text: "All knowledge base articles"
      }, null, _parent));
      _push(ssrRenderComponent(_component_EdHero, {
        eyebrow: "Learn · Understand · Build",
        title: "Verifying the PII Signature — Rotated Keys and the Inactive JWKS",
        meta,
        lede: "Verifying the TPP's signature on payment PII is <strong>optional</strong>. If you do it, this article is about the one thing that will break it: the signature lives as long as the consent, but the key that made it does not. A TPP may rotate its signing key at any time, and a rotated key leaves the active JWKS. Verify at the wrong moment against the wrong key set and you will reject a signature that is perfectly valid."
      }, {
        lede: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="ed-tags" data-v-0c2bdd7e${_scopeId}><!--[-->`);
            ssrRenderList(tags, (t) => {
              _push2(`<span class="ed-tag" data-v-0c2bdd7e${_scopeId}>${ssrInterpolate(t)}</span>`);
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode("div", { class: "ed-tags" }, [
                (openBlock(), createBlock(Fragment, null, renderList(tags, (t) => {
                  return createVNode("span", {
                    key: t,
                    class: "ed-tag"
                  }, toDisplayString(t), 1);
                }), 64))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdInPageNav, { sections }, null, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "problem",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "The problem",
        title: "One signature, two clocks",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "info",
              title: "This article assumes you have chosen to verify"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-0c2bdd7e${_scopeId2}> The <code data-v-0c2bdd7e${_scopeId2}>PersonalIdentifiableInformation</code> field arrives inside a request that the API Hub has already verified was signed by the authenticated TPP, so verifying the inner JWS is <strong data-v-0c2bdd7e${_scopeId2}>not required</strong> — it is a defence-in-depth measure. See <a href="/tech/lfi-api-hub/v2.1/banking/service-initiation/personal-identifiable-information/api-guide/verify-tpp-signature" data-v-0c2bdd7e${_scopeId2}>Verifying the TPP JWS Signature</a> for when an LFI might choose to. Nothing here makes it mandatory. </p><p data-v-0c2bdd7e${_scopeId2}> This article is the signing-key half of <a href="/tech/lfi-api-hub/v2.1/banking/service-initiation/personal-identifiable-information/api-guide/decrypt-pii#two-patterns" data-v-0c2bdd7e${_scopeId2}>Pattern B</a> on the decryption guide — the pattern you need whenever you handle the PII anywhere other than at consent creation. That guide also covers the other two consequences of the same drift: your own Enc1 key, and the timing claims. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" The "),
                      createVNode("code", null, "PersonalIdentifiableInformation"),
                      createTextVNode(" field arrives inside a request that the API Hub has already verified was signed by the authenticated TPP, so verifying the inner JWS is "),
                      createVNode("strong", null, "not required"),
                      createTextVNode(" — it is a defence-in-depth measure. See "),
                      createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/service-initiation/personal-identifiable-information/api-guide/verify-tpp-signature" }, "Verifying the TPP JWS Signature"),
                      createTextVNode(" for when an LFI might choose to. Nothing here makes it mandatory. ")
                    ]),
                    createVNode("p", null, [
                      createTextVNode(" This article is the signing-key half of "),
                      createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/service-initiation/personal-identifiable-information/api-guide/decrypt-pii#two-patterns" }, "Pattern B"),
                      createTextVNode(" on the decryption guide — the pattern you need whenever you handle the PII anywhere other than at consent creation. That guide also covers the other two consequences of the same drift: your own Enc1 key, and the timing claims. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The PII on a payment consent is a JWE that encapsulates a JWS. The TPP builds the PII object, signs it with its signing key, encrypts it to your Enc1 public key, and submits it at PAR. <strong data-v-0c2bdd7e${_scopeId2}>That signature is made exactly once and never changes.</strong>`);
                } else {
                  return [
                    createTextVNode(" The PII on a payment consent is a JWE that encapsulates a JWS. The TPP builds the PII object, signs it with its signing key, encrypts it to your Enc1 public key, and submits it at PAR. "),
                    createVNode("strong", null, "That signature is made exactly once and never changes.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The consent, however, can be long-lived. A multi-payment consent stays usable until its <code data-v-0c2bdd7e${_scopeId2}>ExpirationDateTime</code>, and each payment made under it carries the same PII — the same bytes, signed at the same original moment. `);
                } else {
                  return [
                    createTextVNode(" The consent, however, can be long-lived. A multi-payment consent stays usable until its "),
                    createVNode("code", null, "ExpirationDateTime"),
                    createTextVNode(", and each payment made under it carries the same PII — the same bytes, signed at the same original moment. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Meanwhile the key that made the signature is on its own, entirely independent schedule: `);
                } else {
                  return [
                    createTextVNode(" Meanwhile the key that made the signature is on its own, entirely independent schedule: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-0c2bdd7e${_scopeId2}>Every Trust Framework signing certificate expires after <strong data-v-0c2bdd7e${_scopeId2}>13 months</strong>.</li><li data-v-0c2bdd7e${_scopeId2}>A TPP <strong data-v-0c2bdd7e${_scopeId2}>may rotate whenever it likes</strong> — after an incident, on internal policy, or as routine hygiene. It does not need a reason and it does not tell you.</li><li data-v-0c2bdd7e${_scopeId2}>Rotation issues a <strong data-v-0c2bdd7e${_scopeId2}>new certificate with a new <code data-v-0c2bdd7e${_scopeId2}>kid</code></strong>. It does not re-sign anything.</li><li data-v-0c2bdd7e${_scopeId2}>Once the old certificate is retired, its <code data-v-0c2bdd7e${_scopeId2}>kid</code> <strong data-v-0c2bdd7e${_scopeId2}>leaves the active JWKS</strong>.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createTextVNode("Every Trust Framework signing certificate expires after "),
                      createVNode("strong", null, "13 months"),
                      createTextVNode(".")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("A TPP "),
                      createVNode("strong", null, "may rotate whenever it likes"),
                      createTextVNode(" — after an incident, on internal policy, or as routine hygiene. It does not need a reason and it does not tell you.")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("Rotation issues a "),
                      createVNode("strong", null, [
                        createTextVNode("new certificate with a new "),
                        createVNode("code", null, "kid")
                      ]),
                      createTextVNode(". It does not re-sign anything.")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("Once the old certificate is retired, its "),
                      createVNode("code", null, "kid"),
                      createTextVNode(),
                      createVNode("strong", null, "leaves the active JWKS"),
                      createTextVNode(".")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` So the two clocks drift apart. The signature stays fixed at the moment of consent creation while the TPP&#39;s published key set moves on without it. A consent authorised in March and paid against in October may have been signed with a key that stopped being active in June. `);
                } else {
                  return [
                    createTextVNode(" So the two clocks drift apart. The signature stays fixed at the moment of consent creation while the TPP's published key set moves on without it. A consent authorised in March and paid against in October may have been signed with a key that stopped being active in June. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` This is not a sandbox concern. Checked against the production keystore, ADCB already holds <strong data-v-0c2bdd7e${_scopeId2}>four active application keys and four retired ones</strong> — real rotations, on live organisations, while long-lived consents signed under the older keys remain in force. `);
                } else {
                  return [
                    createTextVNode(" This is not a sandbox concern. Checked against the production keystore, ADCB already holds "),
                    createVNode("strong", null, "four active application keys and four retired ones"),
                    createTextVNode(" — real rotations, on live organisations, while long-lived consents signed under the older keys remain in force. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdNote, {
                type: "info",
                title: "This article assumes you have chosen to verify"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" The "),
                    createVNode("code", null, "PersonalIdentifiableInformation"),
                    createTextVNode(" field arrives inside a request that the API Hub has already verified was signed by the authenticated TPP, so verifying the inner JWS is "),
                    createVNode("strong", null, "not required"),
                    createTextVNode(" — it is a defence-in-depth measure. See "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/service-initiation/personal-identifiable-information/api-guide/verify-tpp-signature" }, "Verifying the TPP JWS Signature"),
                    createTextVNode(" for when an LFI might choose to. Nothing here makes it mandatory. ")
                  ]),
                  createVNode("p", null, [
                    createTextVNode(" This article is the signing-key half of "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/service-initiation/personal-identifiable-information/api-guide/decrypt-pii#two-patterns" }, "Pattern B"),
                    createTextVNode(" on the decryption guide — the pattern you need whenever you handle the PII anywhere other than at consent creation. That guide also covers the other two consequences of the same drift: your own Enc1 key, and the timing claims. ")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The PII on a payment consent is a JWE that encapsulates a JWS. The TPP builds the PII object, signs it with its signing key, encrypts it to your Enc1 public key, and submits it at PAR. "),
                  createVNode("strong", null, "That signature is made exactly once and never changes.")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The consent, however, can be long-lived. A multi-payment consent stays usable until its "),
                  createVNode("code", null, "ExpirationDateTime"),
                  createTextVNode(", and each payment made under it carries the same PII — the same bytes, signed at the same original moment. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Meanwhile the key that made the signature is on its own, entirely independent schedule: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createTextVNode("Every Trust Framework signing certificate expires after "),
                    createVNode("strong", null, "13 months"),
                    createTextVNode(".")
                  ]),
                  createVNode("li", null, [
                    createTextVNode("A TPP "),
                    createVNode("strong", null, "may rotate whenever it likes"),
                    createTextVNode(" — after an incident, on internal policy, or as routine hygiene. It does not need a reason and it does not tell you.")
                  ]),
                  createVNode("li", null, [
                    createTextVNode("Rotation issues a "),
                    createVNode("strong", null, [
                      createTextVNode("new certificate with a new "),
                      createVNode("code", null, "kid")
                    ]),
                    createTextVNode(". It does not re-sign anything.")
                  ]),
                  createVNode("li", null, [
                    createTextVNode("Once the old certificate is retired, its "),
                    createVNode("code", null, "kid"),
                    createTextVNode(),
                    createVNode("strong", null, "leaves the active JWKS"),
                    createTextVNode(".")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" So the two clocks drift apart. The signature stays fixed at the moment of consent creation while the TPP's published key set moves on without it. A consent authorised in March and paid against in October may have been signed with a key that stopped being active in June. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" This is not a sandbox concern. Checked against the production keystore, ADCB already holds "),
                  createVNode("strong", null, "four active application keys and four retired ones"),
                  createTextVNode(" — real rotations, on live organisations, while long-lived consents signed under the older keys remain in force. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "when",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "Where you verify",
        title: "The point of verification decides which keys you need",
        lede: "The PII reaches your Ozone Connect implementation at more than one point in the consent lifecycle, and the age of the signature is different at each. This is the whole decision.",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-0c2bdd7e${_scopeId2}><thead data-v-0c2bdd7e${_scopeId2}><tr data-v-0c2bdd7e${_scopeId2}><th data-v-0c2bdd7e${_scopeId2}>Where you verify</th><th data-v-0c2bdd7e${_scopeId2}>Age of the signature</th><th data-v-0c2bdd7e${_scopeId2}>Key set you need</th><th data-v-0c2bdd7e${_scopeId2}>Pattern</th></tr></thead><tbody data-v-0c2bdd7e${_scopeId2}><tr data-v-0c2bdd7e${_scopeId2}><td data-v-0c2bdd7e${_scopeId2}><code data-v-0c2bdd7e${_scopeId2}>POST /consent/action/validate</code></td><td data-v-0c2bdd7e${_scopeId2}><strong data-v-0c2bdd7e${_scopeId2}>Seconds</strong></td><td data-v-0c2bdd7e${_scopeId2}>Active JWKS only</td><td data-v-0c2bdd7e${_scopeId2}><strong data-v-0c2bdd7e${_scopeId2}>A</strong></td></tr><tr data-v-0c2bdd7e${_scopeId2}><td data-v-0c2bdd7e${_scopeId2}><code data-v-0c2bdd7e${_scopeId2}>POST /consent/event/post</code></td><td data-v-0c2bdd7e${_scopeId2}>Seconds</td><td data-v-0c2bdd7e${_scopeId2}>Active JWKS only</td><td data-v-0c2bdd7e${_scopeId2}><strong data-v-0c2bdd7e${_scopeId2}>A</strong></td></tr><tr data-v-0c2bdd7e${_scopeId2}><td data-v-0c2bdd7e${_scopeId2}>The consent authorisation journey</td><td data-v-0c2bdd7e${_scopeId2}><strong data-v-0c2bdd7e${_scopeId2}>Minutes to hours</strong></td><td data-v-0c2bdd7e${_scopeId2}>Active <strong data-v-0c2bdd7e${_scopeId2}>and inactive</strong></td><td data-v-0c2bdd7e${_scopeId2}><strong data-v-0c2bdd7e${_scopeId2}>B</strong></td></tr><tr data-v-0c2bdd7e${_scopeId2}><td data-v-0c2bdd7e${_scopeId2}><code data-v-0c2bdd7e${_scopeId2}>POST /consent/event/patch</code></td><td data-v-0c2bdd7e${_scopeId2}>Minutes to hours</td><td data-v-0c2bdd7e${_scopeId2}>Active <strong data-v-0c2bdd7e${_scopeId2}>and inactive</strong></td><td data-v-0c2bdd7e${_scopeId2}><strong data-v-0c2bdd7e${_scopeId2}>B</strong></td></tr><tr data-v-0c2bdd7e${_scopeId2}><td data-v-0c2bdd7e${_scopeId2}><code data-v-0c2bdd7e${_scopeId2}>POST /payments</code></td><td data-v-0c2bdd7e${_scopeId2}><strong data-v-0c2bdd7e${_scopeId2}>Up to the consent lifetime</strong></td><td data-v-0c2bdd7e${_scopeId2}>Active <strong data-v-0c2bdd7e${_scopeId2}>and inactive</strong></td><td data-v-0c2bdd7e${_scopeId2}><strong data-v-0c2bdd7e${_scopeId2}>B</strong></td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Where you verify"),
                          createVNode("th", null, "Age of the signature"),
                          createVNode("th", null, "Key set you need"),
                          createVNode("th", null, "Pattern")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "POST /consent/action/validate")
                          ]),
                          createVNode("td", null, [
                            createVNode("strong", null, "Seconds")
                          ]),
                          createVNode("td", null, "Active JWKS only"),
                          createVNode("td", null, [
                            createVNode("strong", null, "A")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "POST /consent/event/post")
                          ]),
                          createVNode("td", null, "Seconds"),
                          createVNode("td", null, "Active JWKS only"),
                          createVNode("td", null, [
                            createVNode("strong", null, "A")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "The consent authorisation journey"),
                          createVNode("td", null, [
                            createVNode("strong", null, "Minutes to hours")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("Active "),
                            createVNode("strong", null, "and inactive")
                          ]),
                          createVNode("td", null, [
                            createVNode("strong", null, "B")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "POST /consent/event/patch")
                          ]),
                          createVNode("td", null, "Minutes to hours"),
                          createVNode("td", null, [
                            createTextVNode("Active "),
                            createVNode("strong", null, "and inactive")
                          ]),
                          createVNode("td", null, [
                            createVNode("strong", null, "B")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "POST /payments")
                          ]),
                          createVNode("td", null, [
                            createVNode("strong", null, "Up to the consent lifetime")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("Active "),
                            createVNode("strong", null, "and inactive")
                          ]),
                          createVNode("td", null, [
                            createVNode("strong", null, "B")
                          ])
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-0c2bdd7e${_scopeId}>The one safe moment: consent validate</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<code data-v-0c2bdd7e${_scopeId2}>/consent/action/validate</code> is called by the API Hub <strong data-v-0c2bdd7e${_scopeId2}>before the consent is created</strong> — synchronously, inside the TPP&#39;s PAR request. The signature is at most seconds old. A key cannot have been rotated out between the TPP signing the PII and the Hub calling you about it. `);
                } else {
                  return [
                    createVNode("code", null, "/consent/action/validate"),
                    createTextVNode(" is called by the API Hub "),
                    createVNode("strong", null, "before the consent is created"),
                    createTextVNode(" — synchronously, inside the TPP's PAR request. The signature is at most seconds old. A key cannot have been rotated out between the TPP signing the PII and the Hub calling you about it. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<strong data-v-0c2bdd7e${_scopeId2}>If you verify here, the active JWKS is sufficient.</strong> This is the conventional fresh-signature case, and the straightforward <code data-v-0c2bdd7e${_scopeId2}>createRemoteJWKSet</code> pattern works correctly. The same holds for the <code data-v-0c2bdd7e${_scopeId2}>post</code> consent event, which fires at the same moment in the lifecycle. `);
                } else {
                  return [
                    createVNode("strong", null, "If you verify here, the active JWKS is sufficient."),
                    createTextVNode(" This is the conventional fresh-signature case, and the straightforward "),
                    createVNode("code", null, "createRemoteJWKSet"),
                    createTextVNode(" pattern works correctly. The same holds for the "),
                    createVNode("code", null, "post"),
                    createTextVNode(" consent event, which fires at the same moment in the lifecycle. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-0c2bdd7e${_scopeId}>Everywhere else is “later”</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<strong data-v-0c2bdd7e${_scopeId2}>The authorisation journey is already later.</strong> It is tempting to treat consent authorisation as still “at creation” — it is usually the same session, after all. It is not. Between the TPP creating the consent and the customer actually authenticating on your platform there can be a redirect the customer does not follow immediately, an app switch, a login they abandon and resume, a re-authentication, a device handover. `);
                } else {
                  return [
                    createVNode("strong", null, "The authorisation journey is already later."),
                    createTextVNode(" It is tempting to treat consent authorisation as still “at creation” — it is usually the same session, after all. It is not. Between the TPP creating the consent and the customer actually authenticating on your platform there can be a redirect the customer does not follow immediately, an app switch, a login they abandon and resume, a re-authentication, a device handover. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<strong data-v-0c2bdd7e${_scopeId2}>Payment execution is much later.</strong> A single instant payment follows authorisation closely, but a multi-payment consent may execute against the same PII for as long as the consent lives. That is the case with no upper bound short of <code data-v-0c2bdd7e${_scopeId2}>ExpirationDateTime</code>. `);
                } else {
                  return [
                    createVNode("strong", null, "Payment execution is much later."),
                    createTextVNode(" A single instant payment follows authorisation closely, but a multi-payment consent may execute against the same PII for as long as the consent lives. That is the case with no upper bound short of "),
                    createVNode("code", null, "ExpirationDateTime"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "warning",
              title: "Do not assume the redirect was prompt"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-0c2bdd7e${_scopeId2}> The most common way to get this wrong is to reason “the customer authorises seconds after the TPP creates the consent, so the key must still be active”. Usually true; not reliably true. If you verify anywhere other than the creation-time hooks, you MUST be prepared for a key that is no longer active. </p>`);
                } else {
                  return [
                    createVNode("p", null, " The most common way to get this wrong is to reason “the customer authorises seconds after the TPP creates the consent, so the key must still be active”. Usually true; not reliably true. If you verify anywhere other than the creation-time hooks, you MUST be prepared for a key that is no longer active. ")
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
                        createVNode("th", null, "Where you verify"),
                        createVNode("th", null, "Age of the signature"),
                        createVNode("th", null, "Key set you need"),
                        createVNode("th", null, "Pattern")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "POST /consent/action/validate")
                        ]),
                        createVNode("td", null, [
                          createVNode("strong", null, "Seconds")
                        ]),
                        createVNode("td", null, "Active JWKS only"),
                        createVNode("td", null, [
                          createVNode("strong", null, "A")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "POST /consent/event/post")
                        ]),
                        createVNode("td", null, "Seconds"),
                        createVNode("td", null, "Active JWKS only"),
                        createVNode("td", null, [
                          createVNode("strong", null, "A")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "The consent authorisation journey"),
                        createVNode("td", null, [
                          createVNode("strong", null, "Minutes to hours")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("Active "),
                          createVNode("strong", null, "and inactive")
                        ]),
                        createVNode("td", null, [
                          createVNode("strong", null, "B")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "POST /consent/event/patch")
                        ]),
                        createVNode("td", null, "Minutes to hours"),
                        createVNode("td", null, [
                          createTextVNode("Active "),
                          createVNode("strong", null, "and inactive")
                        ]),
                        createVNode("td", null, [
                          createVNode("strong", null, "B")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "POST /payments")
                        ]),
                        createVNode("td", null, [
                          createVNode("strong", null, "Up to the consent lifetime")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("Active "),
                          createVNode("strong", null, "and inactive")
                        ]),
                        createVNode("td", null, [
                          createVNode("strong", null, "B")
                        ])
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "The one safe moment: consent validate"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("code", null, "/consent/action/validate"),
                  createTextVNode(" is called by the API Hub "),
                  createVNode("strong", null, "before the consent is created"),
                  createTextVNode(" — synchronously, inside the TPP's PAR request. The signature is at most seconds old. A key cannot have been rotated out between the TPP signing the PII and the Hub calling you about it. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("strong", null, "If you verify here, the active JWKS is sufficient."),
                  createTextVNode(" This is the conventional fresh-signature case, and the straightforward "),
                  createVNode("code", null, "createRemoteJWKSet"),
                  createTextVNode(" pattern works correctly. The same holds for the "),
                  createVNode("code", null, "post"),
                  createTextVNode(" consent event, which fires at the same moment in the lifecycle. ")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Everywhere else is “later”"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("strong", null, "The authorisation journey is already later."),
                  createTextVNode(" It is tempting to treat consent authorisation as still “at creation” — it is usually the same session, after all. It is not. Between the TPP creating the consent and the customer actually authenticating on your platform there can be a redirect the customer does not follow immediately, an app switch, a login they abandon and resume, a re-authentication, a device handover. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("strong", null, "Payment execution is much later."),
                  createTextVNode(" A single instant payment follows authorisation closely, but a multi-payment consent may execute against the same PII for as long as the consent lives. That is the case with no upper bound short of "),
                  createVNode("code", null, "ExpirationDateTime"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "warning",
                title: "Do not assume the redirect was prompt"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, " The most common way to get this wrong is to reason “the customer authorises seconds after the TPP creates the consent, so the key must still be active”. Usually true; not reliably true. If you verify anywhere other than the creation-time hooks, you MUST be prepared for a key that is no longer active. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "jwks",
        num: "03",
        color: "var(--at-blue)",
        eyebrow: "Active & inactive JWKS",
        title: "Retired keys are published at a parallel path",
        lede: "Retired keys are not lost. The Trust Framework keystore publishes them at a parallel <strong>inactive/</strong> path alongside the active set. Every identifier resolves to a <strong>pair</strong> of endpoints.",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-0c2bdd7e${_scopeId}>The URL format</h3>`);
            _push2(ssrRenderComponent(_component_EdCode, {
              code: jwksProduction,
              lang: "text",
              filename: "Production"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Sandbox uses the same shape on its own host:`);
                } else {
                  return [
                    createTextVNode("Sandbox uses the same shape on its own host:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: jwksSandbox,
              lang: "text",
              filename: "Sandbox"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The <code data-v-0c2bdd7e${_scopeId2}>inactive/</code> segment sits <strong data-v-0c2bdd7e${_scopeId2}>between the identifier and the filename</strong> — not appended to the filename, and not prefixed to the path. `);
                } else {
                  return [
                    createTextVNode(" The "),
                    createVNode("code", null, "inactive/"),
                    createTextVNode(" segment sits "),
                    createVNode("strong", null, "between the identifier and the filename"),
                    createTextVNode(" — not appended to the filename, and not prefixed to the path. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` For the PII signature, <code data-v-0c2bdd7e${_scopeId2}>{id}</code> is the <strong data-v-0c2bdd7e${_scopeId2}>TPP&#39;s software statement ID</strong>, which arrives on every relevant call in the <code data-v-0c2bdd7e${_scopeId2}>o3-caller-software-statement-id</code> header — including <code data-v-0c2bdd7e${_scopeId2}>/consent/action/validate</code> and <code data-v-0c2bdd7e${_scopeId2}>POST /payments</code>. You do not need to look it up. `);
                } else {
                  return [
                    createTextVNode(" For the PII signature, "),
                    createVNode("code", null, "{id}"),
                    createTextVNode(" is the "),
                    createVNode("strong", null, "TPP's software statement ID"),
                    createTextVNode(", which arrives on every relevant call in the "),
                    createVNode("code", null, "o3-caller-software-statement-id"),
                    createTextVNode(" header — including "),
                    createVNode("code", null, "/consent/action/validate"),
                    createTextVNode(" and "),
                    createVNode("code", null, "POST /payments"),
                    createTextVNode(". You do not need to look it up. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The same <code data-v-0c2bdd7e${_scopeId2}>inactive/</code> convention applies to <code data-v-0c2bdd7e${_scopeId2}>transport.jwks</code>, though that is not relevant to signature verification. `);
                } else {
                  return [
                    createTextVNode(" The same "),
                    createVNode("code", null, "inactive/"),
                    createTextVNode(" convention applies to "),
                    createVNode("code", null, "transport.jwks"),
                    createTextVNode(", though that is not relevant to signature verification. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-0c2bdd7e${_scopeId}>What is in the inactive set</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The response is an ordinary JWKS — the same format as the active set, with retired keys instead of current ones. Sampling a production organisation: `);
                } else {
                  return [
                    createTextVNode(" The response is an ordinary JWKS — the same format as the active set, with retired keys instead of current ones. Sampling a production organisation: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-0c2bdd7e${_scopeId2}><thead data-v-0c2bdd7e${_scopeId2}><tr data-v-0c2bdd7e${_scopeId2}><th data-v-0c2bdd7e${_scopeId2}>Endpoint</th><th data-v-0c2bdd7e${_scopeId2}>Keys</th></tr></thead><tbody data-v-0c2bdd7e${_scopeId2}><tr data-v-0c2bdd7e${_scopeId2}><td data-v-0c2bdd7e${_scopeId2}><code data-v-0c2bdd7e${_scopeId2}>application.jwks</code></td><td data-v-0c2bdd7e${_scopeId2}>4</td></tr><tr data-v-0c2bdd7e${_scopeId2}><td data-v-0c2bdd7e${_scopeId2}><code data-v-0c2bdd7e${_scopeId2}>inactive/application.jwks</code></td><td data-v-0c2bdd7e${_scopeId2}>4</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Endpoint"),
                          createVNode("th", null, "Keys")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "application.jwks")
                          ]),
                          createVNode("td", null, "4")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "inactive/application.jwks")
                          ]),
                          createVNode("td", null, "4")
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
                  _push3(` Every certificate sampled from an <code data-v-0c2bdd7e${_scopeId2}>inactive/</code> set had a <code data-v-0c2bdd7e${_scopeId2}>notAfter</code> in the past, consistent with keys retired by expiry or rotation. `);
                } else {
                  return [
                    createTextVNode(" Every certificate sampled from an "),
                    createVNode("code", null, "inactive/"),
                    createTextVNode(" set had a "),
                    createVNode("code", null, "notAfter"),
                    createTextVNode(" in the past, consistent with keys retired by expiry or rotation. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "important",
              title: "Membership of inactive/ does not tell you why a key was retired"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-0c2bdd7e${_scopeId2}> The set does not distinguish a certificate that expired normally, one superseded by a routine rotation, and one revoked for key compromise. If a revocation reason is material to your risk decision, obtain it from the certificate record in the Trust Framework — it cannot be inferred from which JWKS the key appeared in. </p>`);
                } else {
                  return [
                    createVNode("p", null, " The set does not distinguish a certificate that expired normally, one superseded by a routine rotation, and one revoked for key compromise. If a revocation reason is material to your risk decision, obtain it from the certificate record in the Trust Framework — it cannot be inferred from which JWKS the key appeared in. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-0c2bdd7e${_scopeId}>Pin the algorithm yourself</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Published JWKS entries carry <code data-v-0c2bdd7e${_scopeId2}>kty</code>, <code data-v-0c2bdd7e${_scopeId2}>use</code>, <code data-v-0c2bdd7e${_scopeId2}>kid</code> and <code data-v-0c2bdd7e${_scopeId2}>x5c</code> — and <strong data-v-0c2bdd7e${_scopeId2}>no <code data-v-0c2bdd7e${_scopeId2}>alg</code></strong>. Your verifier must therefore pin the algorithm itself: <strong data-v-0c2bdd7e${_scopeId2}>PS256</strong>, the only algorithm in the UAE Open Finance FAPI profile. Do not accept whatever the JWS header proposes. `);
                } else {
                  return [
                    createTextVNode(" Published JWKS entries carry "),
                    createVNode("code", null, "kty"),
                    createTextVNode(", "),
                    createVNode("code", null, "use"),
                    createTextVNode(", "),
                    createVNode("code", null, "kid"),
                    createTextVNode(" and "),
                    createVNode("code", null, "x5c"),
                    createTextVNode(" — and "),
                    createVNode("strong", null, [
                      createTextVNode("no "),
                      createVNode("code", null, "alg")
                    ]),
                    createTextVNode(". Your verifier must therefore pin the algorithm itself: "),
                    createVNode("strong", null, "PS256"),
                    createTextVNode(", the only algorithm in the UAE Open Finance FAPI profile. Do not accept whatever the JWS header proposes. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, "The URL format"),
              createVNode(_component_EdCode, {
                code: jwksProduction,
                lang: "text",
                filename: "Production"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Sandbox uses the same shape on its own host:")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: jwksSandbox,
                lang: "text",
                filename: "Sandbox"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The "),
                  createVNode("code", null, "inactive/"),
                  createTextVNode(" segment sits "),
                  createVNode("strong", null, "between the identifier and the filename"),
                  createTextVNode(" — not appended to the filename, and not prefixed to the path. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" For the PII signature, "),
                  createVNode("code", null, "{id}"),
                  createTextVNode(" is the "),
                  createVNode("strong", null, "TPP's software statement ID"),
                  createTextVNode(", which arrives on every relevant call in the "),
                  createVNode("code", null, "o3-caller-software-statement-id"),
                  createTextVNode(" header — including "),
                  createVNode("code", null, "/consent/action/validate"),
                  createTextVNode(" and "),
                  createVNode("code", null, "POST /payments"),
                  createTextVNode(". You do not need to look it up. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The same "),
                  createVNode("code", null, "inactive/"),
                  createTextVNode(" convention applies to "),
                  createVNode("code", null, "transport.jwks"),
                  createTextVNode(", though that is not relevant to signature verification. ")
                ]),
                _: 1
              }),
              createVNode("h3", null, "What is in the inactive set"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The response is an ordinary JWKS — the same format as the active set, with retired keys instead of current ones. Sampling a production organisation: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Endpoint"),
                        createVNode("th", null, "Keys")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "application.jwks")
                        ]),
                        createVNode("td", null, "4")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "inactive/application.jwks")
                        ]),
                        createVNode("td", null, "4")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Every certificate sampled from an "),
                  createVNode("code", null, "inactive/"),
                  createTextVNode(" set had a "),
                  createVNode("code", null, "notAfter"),
                  createTextVNode(" in the past, consistent with keys retired by expiry or rotation. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "important",
                title: "Membership of inactive/ does not tell you why a key was retired"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, " The set does not distinguish a certificate that expired normally, one superseded by a routine rotation, and one revoked for key compromise. If a revocation reason is material to your risk decision, obtain it from the certificate record in the Trust Framework — it cannot be inferred from which JWKS the key appeared in. ")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Pin the algorithm yourself"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Published JWKS entries carry "),
                  createVNode("code", null, "kty"),
                  createTextVNode(", "),
                  createVNode("code", null, "use"),
                  createTextVNode(", "),
                  createVNode("code", null, "kid"),
                  createTextVNode(" and "),
                  createVNode("code", null, "x5c"),
                  createTextVNode(" — and "),
                  createVNode("strong", null, [
                    createTextVNode("no "),
                    createVNode("code", null, "alg")
                  ]),
                  createTextVNode(". Your verifier must therefore pin the algorithm itself: "),
                  createVNode("strong", null, "PS256"),
                  createTextVNode(", the only algorithm in the UAE Open Finance FAPI profile. Do not accept whatever the JWS header proposes. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "how",
        num: "04",
        color: "var(--at-blue-deep)",
        eyebrow: "Verifying later",
        title: "Resolve the kid across both sets",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` If you verify anywhere other than the creation-time hooks, resolve the <code data-v-0c2bdd7e${_scopeId2}>kid</code> across both sets: `);
                } else {
                  return [
                    createTextVNode(" If you verify anywhere other than the creation-time hooks, resolve the "),
                    createVNode("code", null, "kid"),
                    createTextVNode(" across both sets: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<ol class="ed-steps" data-v-0c2bdd7e${_scopeId}><li data-v-0c2bdd7e${_scopeId}>Read the <code data-v-0c2bdd7e${_scopeId}>kid</code> from the JWS header of the decrypted PII.</li><li data-v-0c2bdd7e${_scopeId}>Look it up in the TPP&#39;s <strong data-v-0c2bdd7e${_scopeId}>active</strong> JWKS.</li><li data-v-0c2bdd7e${_scopeId}>If it is not there, look it up in the TPP&#39;s <strong data-v-0c2bdd7e${_scopeId}>inactive</strong> JWKS.</li><li data-v-0c2bdd7e${_scopeId}>Verify the signature against whichever key matched, pinning <code data-v-0c2bdd7e${_scopeId}>PS256</code>.</li></ol>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` A <code data-v-0c2bdd7e${_scopeId2}>kid</code> found in the inactive set is the <strong data-v-0c2bdd7e${_scopeId2}>expected</strong> outcome for an older consent. It means the TPP rotated its signing key at some point after creating the consent, which is routine and entirely permitted. It is a key-lifecycle event, not a signature defect, and on its own it says nothing adverse about the signature or the TPP. `);
                } else {
                  return [
                    createTextVNode(" A "),
                    createVNode("code", null, "kid"),
                    createTextVNode(" found in the inactive set is the "),
                    createVNode("strong", null, "expected"),
                    createTextVNode(" outcome for an older consent. It means the TPP rotated its signing key at some point after creating the consent, which is routine and entirely permitted. It is a key-lifecycle event, not a signature defect, and on its own it says nothing adverse about the signature or the TPP. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "tip",
              title: "Order the lookup active-first"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-0c2bdd7e${_scopeId2}> Most consents you verify will be recent, so the active set will almost always hit. Treat the inactive lookup as the fallback, and cache both sets as you would any JWKS rather than fetching per request. </p>`);
                } else {
                  return [
                    createVNode("p", null, " Most consents you verify will be recent, so the active set will almost always hit. Treat the inactive lookup as the fallback, and cache both sets as you would any JWKS rather than fetching per request. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The straightforward pattern shown in the <a href="/tech/lfi-api-hub/v2.1/banking/service-initiation/personal-identifiable-information/api-guide/verify-tpp-signature" data-v-0c2bdd7e${_scopeId2}>API guide</a> resolves the active JWKS only: `);
                } else {
                  return [
                    createTextVNode(" The straightforward pattern shown in the "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/service-initiation/personal-identifiable-information/api-guide/verify-tpp-signature" }, "API guide"),
                    createTextVNode(" resolves the active JWKS only: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: activeOnlySnippet,
              lang: "typescript",
              filename: "Active keys only"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` That is correct at <code data-v-0c2bdd7e${_scopeId2}>/consent/action/validate</code>. Used at payment execution it will work for months and then begin failing on long-lived consents — with no change at either end, and in a way that presents as a signature error when the signature is fine. `);
                } else {
                  return [
                    createTextVNode(" That is correct at "),
                    createVNode("code", null, "/consent/action/validate"),
                    createTextVNode(". Used at payment execution it will work for months and then begin failing on long-lived consents — with no change at either end, and in a way that presents as a signature error when the signature is fine. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" If you verify anywhere other than the creation-time hooks, resolve the "),
                  createVNode("code", null, "kid"),
                  createTextVNode(" across both sets: ")
                ]),
                _: 1
              }),
              createVNode("ol", { class: "ed-steps" }, [
                createVNode("li", null, [
                  createTextVNode("Read the "),
                  createVNode("code", null, "kid"),
                  createTextVNode(" from the JWS header of the decrypted PII.")
                ]),
                createVNode("li", null, [
                  createTextVNode("Look it up in the TPP's "),
                  createVNode("strong", null, "active"),
                  createTextVNode(" JWKS.")
                ]),
                createVNode("li", null, [
                  createTextVNode("If it is not there, look it up in the TPP's "),
                  createVNode("strong", null, "inactive"),
                  createTextVNode(" JWKS.")
                ]),
                createVNode("li", null, [
                  createTextVNode("Verify the signature against whichever key matched, pinning "),
                  createVNode("code", null, "PS256"),
                  createTextVNode(".")
                ])
              ]),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" A "),
                  createVNode("code", null, "kid"),
                  createTextVNode(" found in the inactive set is the "),
                  createVNode("strong", null, "expected"),
                  createTextVNode(" outcome for an older consent. It means the TPP rotated its signing key at some point after creating the consent, which is routine and entirely permitted. It is a key-lifecycle event, not a signature defect, and on its own it says nothing adverse about the signature or the TPP. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "tip",
                title: "Order the lookup active-first"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, " Most consents you verify will be recent, so the active set will almost always hit. Treat the inactive lookup as the fallback, and cache both sets as you would any JWKS rather than fetching per request. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The straightforward pattern shown in the "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/service-initiation/personal-identifiable-information/api-guide/verify-tpp-signature" }, "API guide"),
                  createTextVNode(" resolves the active JWKS only: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: activeOnlySnippet,
                lang: "typescript",
                filename: "Active keys only"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" That is correct at "),
                  createVNode("code", null, "/consent/action/validate"),
                  createTextVNode(". Used at payment execution it will work for months and then begin failing on long-lived consents — with no change at either end, and in a way that presents as a signature error when the signature is fine. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "timing",
        num: "05",
        color: "var(--at-navy)",
        eyebrow: "Timing claims",
        title: "The same default catches exp, iat and nbf",
        lede: "Key resolution is the subject of this article, but the same libraries carry a second default that fails for the same underlying reason, and it is worth knowing about while you are here.",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<code data-v-0c2bdd7e${_scopeId2}>exp</code>, <code data-v-0c2bdd7e${_scopeId2}>iat</code> and <code data-v-0c2bdd7e${_scopeId2}>nbf</code> are set by the TPP at the instant it signs the PII — the same instant, and for the same reason, that fixes the <code data-v-0c2bdd7e${_scopeId2}>kid</code>. They bound the <strong data-v-0c2bdd7e${_scopeId2}>PAR submission window</strong>, not the moment you happen to be verifying. At payment execution on a long-lived consent they will normally have lapsed. `);
                } else {
                  return [
                    createVNode("code", null, "exp"),
                    createTextVNode(", "),
                    createVNode("code", null, "iat"),
                    createTextVNode(" and "),
                    createVNode("code", null, "nbf"),
                    createTextVNode(" are set by the TPP at the instant it signs the PII — the same instant, and for the same reason, that fixes the "),
                    createVNode("code", null, "kid"),
                    createTextVNode(". They bound the "),
                    createVNode("strong", null, "PAR submission window"),
                    createTextVNode(", not the moment you happen to be verifying. At payment execution on a long-lived consent they will normally have lapsed. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<code data-v-0c2bdd7e${_scopeId2}>jwtVerify</code> and its equivalents enforce <code data-v-0c2bdd7e${_scopeId2}>exp</code> and <code data-v-0c2bdd7e${_scopeId2}>nbf</code><strong data-v-0c2bdd7e${_scopeId2}>against the current time</strong> by default, so this fails exactly where the active-JWKS-only lookup fails, and on the same consents. `);
                } else {
                  return [
                    createVNode("code", null, "jwtVerify"),
                    createTextVNode(" and its equivalents enforce "),
                    createVNode("code", null, "exp"),
                    createTextVNode(" and "),
                    createVNode("code", null, "nbf"),
                    createVNode("strong", null, "against the current time"),
                    createTextVNode(" by default, so this fails exactly where the active-JWKS-only lookup fails, and on the same consents. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` If you verify the PII signature at a later point, evaluate its timing claims against the consent&#39;s <code data-v-0c2bdd7e${_scopeId2}>CreationDateTime</code> rather than against now, or do not evaluate them at all. <code data-v-0c2bdd7e${_scopeId2}>iat</code> is still worth checking for consistency with <code data-v-0c2bdd7e${_scopeId2}>CreationDateTime</code>. Whether the consent is still usable <strong data-v-0c2bdd7e${_scopeId2}>today</strong> is answered by the API Hub&#39;s consent validation on every request, not by a claim inside the PII. `);
                } else {
                  return [
                    createTextVNode(" If you verify the PII signature at a later point, evaluate its timing claims against the consent's "),
                    createVNode("code", null, "CreationDateTime"),
                    createTextVNode(" rather than against now, or do not evaluate them at all. "),
                    createVNode("code", null, "iat"),
                    createTextVNode(" is still worth checking for consistency with "),
                    createVNode("code", null, "CreationDateTime"),
                    createTextVNode(". Whether the consent is still usable "),
                    createVNode("strong", null, "today"),
                    createTextVNode(" is answered by the API Hub's consent validation on every request, not by a claim inside the PII. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("code", null, "exp"),
                  createTextVNode(", "),
                  createVNode("code", null, "iat"),
                  createTextVNode(" and "),
                  createVNode("code", null, "nbf"),
                  createTextVNode(" are set by the TPP at the instant it signs the PII — the same instant, and for the same reason, that fixes the "),
                  createVNode("code", null, "kid"),
                  createTextVNode(". They bound the "),
                  createVNode("strong", null, "PAR submission window"),
                  createTextVNode(", not the moment you happen to be verifying. At payment execution on a long-lived consent they will normally have lapsed. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("code", null, "jwtVerify"),
                  createTextVNode(" and its equivalents enforce "),
                  createVNode("code", null, "exp"),
                  createTextVNode(" and "),
                  createVNode("code", null, "nbf"),
                  createVNode("strong", null, "against the current time"),
                  createTextVNode(" by default, so this fails exactly where the active-JWKS-only lookup fails, and on the same consents. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" If you verify the PII signature at a later point, evaluate its timing claims against the consent's "),
                  createVNode("code", null, "CreationDateTime"),
                  createTextVNode(" rather than against now, or do not evaluate them at all. "),
                  createVNode("code", null, "iat"),
                  createTextVNode(" is still worth checking for consistency with "),
                  createVNode("code", null, "CreationDateTime"),
                  createTextVNode(". Whether the consent is still usable "),
                  createVNode("strong", null, "today"),
                  createTextVNode(" is answered by the API Hub's consent validation on every request, not by a claim inside the PII. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdRelatedCards, {
        eyebrow: "Related articles",
        title: "Read alongside"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdRelatedCard, {
              href: "/knowledge-base/articles/pii-encryption",
              category: "Security",
              "category-color": "var(--at-blue)",
              title: "Payment PII Encryption",
              desc: "Why PII is encrypted end to end, and what the API Hub can and cannot see."
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRelatedCard, {
              href: "/knowledge-base/articles/certificate-rotation",
              category: "Security",
              "category-color": "var(--at-blue)",
              title: "Certificate Rotation",
              desc: "The 13-month lifetime and the overlap-and-cutover discipline that produces retired keys."
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRelatedCard, {
              href: "/knowledge-base/articles/jwt-claims",
              category: "Security",
              "category-color": "var(--at-blue)",
              title: "JWT Claim Rules",
              desc: "Per-claim reference for the request object and client assertion."
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdRelatedCard, {
                href: "/knowledge-base/articles/pii-encryption",
                category: "Security",
                "category-color": "var(--at-blue)",
                title: "Payment PII Encryption",
                desc: "Why PII is encrypted end to end, and what the API Hub can and cannot see."
              }),
              createVNode(_component_EdRelatedCard, {
                href: "/knowledge-base/articles/certificate-rotation",
                category: "Security",
                "category-color": "var(--at-blue)",
                title: "Certificate Rotation",
                desc: "The 13-month lifetime and the overlap-and-cutover discipline that produces retired keys."
              }),
              createVNode(_component_EdRelatedCard, {
                href: "/knowledge-base/articles/jwt-claims",
                category: "Security",
                "category-color": "var(--at-blue)",
                title: "JWT Claim Rules",
                desc: "Per-claim reference for the request object and client assertion."
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/knowledge-base/articles/pii-signature-verification.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const piiSignatureVerification = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0c2bdd7e"]]);
export {
  piiSignatureVerification as default
};
