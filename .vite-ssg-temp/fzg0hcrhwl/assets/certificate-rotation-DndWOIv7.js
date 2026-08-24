import { _ as __unplugin_components_0, a as __unplugin_components_2, b as __unplugin_components_6, c as __unplugin_components_7$1 } from "./EdBackStrip-COkyNhGh.js";
import { E as EdCode } from "./EdCode-BQ4YLUeg.js";
import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_0$1 } from "./EdHero-DawHPCxB.js";
import { defineComponent, mergeProps, withCtx, createVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const opensslCommand = `openssl req -new -newkey rsa:2048 -nodes \\
  -keyout <UUID>.key \\
  -out <UUID>.csr \\
  -subj "/C=AE/O=<LegalName>/OU=<OrganizationId>/CN=<UUID>" \\
  -sha256`;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "certificate-rotation",
  __ssrInlineRender: true,
  setup(__props) {
    const sections = [
      { id: "principle", label: "Rotate only your own keys" },
      { id: "expiry", label: "Expiry & reminders" },
      { id: "how", label: "How rotation works" },
      { id: "transport", label: "Transport certificates" },
      { id: "signing", label: "Signing certificates" },
      { id: "checklist", label: "Checklist" }
    ];
    const meta = [
      { label: "Category", value: "Security" },
      { label: "Read", value: "7 min" },
      { label: "Updated", value: "3 Jun 2026" }
    ];
    const tags = ["Certificates", "Trust Framework", "mTLS"];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdBackStrip = __unplugin_components_0;
      const _component_EdHero = __unplugin_components_0$1;
      const _component_EdInPageNav = __unplugin_components_2;
      const _component_EdNote = __unplugin_components_7;
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdBullets = __unplugin_components_5;
      const _component_EdCode = EdCode;
      const _component_EdRelatedCards = __unplugin_components_6;
      const _component_EdRelatedCard = __unplugin_components_7$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-page" }, _attrs))} data-v-4a22f215>`);
      _push(ssrRenderComponent(_component_EdBackStrip, {
        href: "/knowledge-base/",
        text: "All knowledge base articles"
      }, null, _parent));
      _push(ssrRenderComponent(_component_EdHero, {
        eyebrow: "Learn · Understand · Build",
        title: "Certificate Rotation — A Best-Practice Guide for LFIs and TPPs",
        meta,
        lede: "Every certificate in the Trust Framework has a finite life. Rotating it — replacing it with a fresh certificate before the old one expires — is a routine operational task, but one that <strong>breaks live services if it is missed</strong>. This guide explains which certificates are yours to rotate, when to act, and the safe overlap pattern that keeps traffic flowing through the cutover."
      }, {
        lede: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="ed-tags" data-v-4a22f215${_scopeId}><!--[-->`);
            ssrRenderList(tags, (t) => {
              _push2(`<span class="ed-tag" data-v-4a22f215${_scopeId}>${ssrInterpolate(t)}</span>`);
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
      _push(ssrRenderComponent(_component_EdNote, {
        type: "warning",
        title: "Rotate before expiry — not after"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p data-v-4a22f215${_scopeId}> A certificate that reaches its expiry date stops being trusted. An expired <strong data-v-4a22f215${_scopeId}>transport</strong> certificate fails the mTLS handshake; an expired <strong data-v-4a22f215${_scopeId}>signing</strong> certificate makes every JWT you sign unverifiable. In both cases the affected service stops working until a valid certificate is in place. Always complete rotation <strong data-v-4a22f215${_scopeId}>before</strong> the expiry date. </p>`);
          } else {
            return [
              createVNode("p", null, [
                createTextVNode(" A certificate that reaches its expiry date stops being trusted. An expired "),
                createVNode("strong", null, "transport"),
                createTextVNode(" certificate fails the mTLS handshake; an expired "),
                createVNode("strong", null, "signing"),
                createTextVNode(" certificate makes every JWT you sign unverifiable. In both cases the affected service stops working until a valid certificate is in place. Always complete rotation "),
                createVNode("strong", null, "before"),
                createTextVNode(" the expiry date. ")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "principle",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "The golden rule",
        title: "You rotate only the certificates whose private key you hold",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Not every certificate that appears under your organisation is yours to manage. The rule is simple: `);
                } else {
                  return [
                    createTextVNode(" Not every certificate that appears under your organisation is yours to manage. The rule is simple: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-4a22f215${_scopeId2}><strong data-v-4a22f215${_scopeId2}>You hold the private key</strong> → the certificate is <strong data-v-4a22f215${_scopeId2}>yours to rotate</strong>. You generated the key and CSR yourself, so only you can produce a replacement. </li><li data-v-4a22f215${_scopeId2}><strong data-v-4a22f215${_scopeId2}>Nebras holds the private key</strong> → <strong data-v-4a22f215${_scopeId2}>Nebras rotates it</strong>. Any certificate where Ozone supplied the CSR, or where the key material lives on the API Hub, is rotated by Nebras with no action required from you. From your perspective these certificates appear under your organisation but require no operational involvement. </li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "You hold the private key"),
                      createTextVNode(" → the certificate is "),
                      createVNode("strong", null, "yours to rotate"),
                      createTextVNode(". You generated the key and CSR yourself, so only you can produce a replacement. ")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Nebras holds the private key"),
                      createTextVNode(" → "),
                      createVNode("strong", null, "Nebras rotates it"),
                      createTextVNode(". Any certificate where Ozone supplied the CSR, or where the key material lives on the API Hub, is rotated by Nebras with no action required from you. From your perspective these certificates appear under your organisation but require no operational involvement. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The canonical illustration is the server transport pair described in the <a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/certificate-walkthroughs" data-v-4a22f215${_scopeId2}>Certificate Walkthroughs</a>: <strong data-v-4a22f215${_scopeId2}>S1</strong> (Ozone holds the private key — Nebras rotates it) versus <strong data-v-4a22f215${_scopeId2}>S4</strong> (the LFI holds the private key — the LFI rotates it). The same split applies to every certificate on your organisation. `);
                } else {
                  return [
                    createTextVNode(" The canonical illustration is the server transport pair described in the "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/certificate-walkthroughs" }, "Certificate Walkthroughs"),
                    createTextVNode(": "),
                    createVNode("strong", null, "S1"),
                    createTextVNode(" (Ozone holds the private key — Nebras rotates it) versus "),
                    createVNode("strong", null, "S4"),
                    createTextVNode(" (the LFI holds the private key — the LFI rotates it). The same split applies to every certificate on your organisation. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "tip",
              title: "Record the private-key holder in the certificate description"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-4a22f215${_scopeId2}> Because who-holds-the-key decides who rotates, make it impossible to get wrong: state the holder in the certificate&#39;s <strong data-v-4a22f215${_scopeId2}>description</strong> field when you create it. The walkthroughs already follow this convention — e.g. <code data-v-4a22f215${_scopeId2}>S1 - Ozone holds Private Key - TPP-APIHub</code> and <code data-v-4a22f215${_scopeId2}>S4 - I hold Private Key - APIHub-OzoneConnect</code>. A glance at the description then tells any operator whether a given certificate is theirs to renew or Nebras&#39;s. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" Because who-holds-the-key decides who rotates, make it impossible to get wrong: state the holder in the certificate's "),
                      createVNode("strong", null, "description"),
                      createTextVNode(" field when you create it. The walkthroughs already follow this convention — e.g. "),
                      createVNode("code", null, "S1 - Ozone holds Private Key - TPP-APIHub"),
                      createTextVNode(" and "),
                      createVNode("code", null, "S4 - I hold Private Key - APIHub-OzoneConnect"),
                      createTextVNode(". A glance at the description then tells any operator whether a given certificate is theirs to renew or Nebras's. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<strong data-v-4a22f215${_scopeId2}>TPPs</strong> hold the private key for all of their application certificates — transport, signing, and (where used) encryption — so a TPP rotates all of them itself. <strong data-v-4a22f215${_scopeId2}>LFIs</strong> rotate the certificates they generated (such as S4 and their client transport and signing certificates) and leave the Ozone-held certificates to Nebras. `);
                } else {
                  return [
                    createVNode("strong", null, "TPPs"),
                    createTextVNode(" hold the private key for all of their application certificates — transport, signing, and (where used) encryption — so a TPP rotates all of them itself. "),
                    createVNode("strong", null, "LFIs"),
                    createTextVNode(" rotate the certificates they generated (such as S4 and their client transport and signing certificates) and leave the Ozone-held certificates to Nebras. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Not every certificate that appears under your organisation is yours to manage. The rule is simple: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "You hold the private key"),
                    createTextVNode(" → the certificate is "),
                    createVNode("strong", null, "yours to rotate"),
                    createTextVNode(". You generated the key and CSR yourself, so only you can produce a replacement. ")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Nebras holds the private key"),
                    createTextVNode(" → "),
                    createVNode("strong", null, "Nebras rotates it"),
                    createTextVNode(". Any certificate where Ozone supplied the CSR, or where the key material lives on the API Hub, is rotated by Nebras with no action required from you. From your perspective these certificates appear under your organisation but require no operational involvement. ")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The canonical illustration is the server transport pair described in the "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/certificate-walkthroughs" }, "Certificate Walkthroughs"),
                  createTextVNode(": "),
                  createVNode("strong", null, "S1"),
                  createTextVNode(" (Ozone holds the private key — Nebras rotates it) versus "),
                  createVNode("strong", null, "S4"),
                  createTextVNode(" (the LFI holds the private key — the LFI rotates it). The same split applies to every certificate on your organisation. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "tip",
                title: "Record the private-key holder in the certificate description"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" Because who-holds-the-key decides who rotates, make it impossible to get wrong: state the holder in the certificate's "),
                    createVNode("strong", null, "description"),
                    createTextVNode(" field when you create it. The walkthroughs already follow this convention — e.g. "),
                    createVNode("code", null, "S1 - Ozone holds Private Key - TPP-APIHub"),
                    createTextVNode(" and "),
                    createVNode("code", null, "S4 - I hold Private Key - APIHub-OzoneConnect"),
                    createTextVNode(". A glance at the description then tells any operator whether a given certificate is theirs to renew or Nebras's. ")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("strong", null, "TPPs"),
                  createTextVNode(" hold the private key for all of their application certificates — transport, signing, and (where used) encryption — so a TPP rotates all of them itself. "),
                  createVNode("strong", null, "LFIs"),
                  createTextVNode(" rotate the certificates they generated (such as S4 and their client transport and signing certificates) and leave the Ozone-held certificates to Nebras. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "expiry",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "Lifetimes and reminders",
        title: "13 months, with email reminders from two months out",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` With one exception, every certificate in the Trust Framework expires <strong data-v-4a22f215${_scopeId2}>13 months</strong> after it is issued: `);
                } else {
                  return [
                    createTextVNode(" With one exception, every certificate in the Trust Framework expires "),
                    createVNode("strong", null, "13 months"),
                    createTextVNode(" after it is issued: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-4a22f215${_scopeId2}><strong data-v-4a22f215${_scopeId2}>Transport, signing, and application encryption certificates</strong> — valid for <strong data-v-4a22f215${_scopeId2}>13 months</strong>, then must be rotated. </li><li data-v-4a22f215${_scopeId2}><strong data-v-4a22f215${_scopeId2}>The server encryption key (SERVER ENCKEY)</strong> — <strong data-v-4a22f215${_scopeId2}>does not expire</strong>, and therefore does not require periodic rotation. </li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Transport, signing, and application encryption certificates"),
                      createTextVNode(" — valid for "),
                      createVNode("strong", null, "13 months"),
                      createTextVNode(", then must be rotated. ")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "The server encryption key (SERVER ENCKEY)"),
                      createTextVNode(" — "),
                      createVNode("strong", null, "does not expire"),
                      createTextVNode(", and therefore does not require periodic rotation. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "info",
              title: "The Trust Framework reminds you before expiry"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-4a22f215${_scopeId2}> You do not have to track expiry dates by hand. The Trust Framework (directory) sends <strong data-v-4a22f215${_scopeId2}>email notifications</strong> about upcoming certificate expiry, issued regularly and starting <strong data-v-4a22f215${_scopeId2}>two months before</strong> the expiry date. Treat the first reminder as your cue to plan the rotation — it leaves ample time to generate, deploy, and validate the replacement before the deadline. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" You do not have to track expiry dates by hand. The Trust Framework (directory) sends "),
                      createVNode("strong", null, "email notifications"),
                      createTextVNode(" about upcoming certificate expiry, issued regularly and starting "),
                      createVNode("strong", null, "two months before"),
                      createTextVNode(" the expiry date. Treat the first reminder as your cue to plan the rotation — it leaves ample time to generate, deploy, and validate the replacement before the deadline. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Make sure the email recipients on your organisation are correct and monitored, so these reminders reach the team that owns rotation. See <a href="/tech/lfi-api-hub/trust-framework/contacts" data-v-4a22f215${_scopeId2}>Contacts</a> for managing notification recipients. `);
                } else {
                  return [
                    createTextVNode(" Make sure the email recipients on your organisation are correct and monitored, so these reminders reach the team that owns rotation. See "),
                    createVNode("a", { href: "/tech/lfi-api-hub/trust-framework/contacts" }, "Contacts"),
                    createTextVNode(" for managing notification recipients. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" With one exception, every certificate in the Trust Framework expires "),
                  createVNode("strong", null, "13 months"),
                  createTextVNode(" after it is issued: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Transport, signing, and application encryption certificates"),
                    createTextVNode(" — valid for "),
                    createVNode("strong", null, "13 months"),
                    createTextVNode(", then must be rotated. ")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "The server encryption key (SERVER ENCKEY)"),
                    createTextVNode(" — "),
                    createVNode("strong", null, "does not expire"),
                    createTextVNode(", and therefore does not require periodic rotation. ")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "info",
                title: "The Trust Framework reminds you before expiry"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" You do not have to track expiry dates by hand. The Trust Framework (directory) sends "),
                    createVNode("strong", null, "email notifications"),
                    createTextVNode(" about upcoming certificate expiry, issued regularly and starting "),
                    createVNode("strong", null, "two months before"),
                    createTextVNode(" the expiry date. Treat the first reminder as your cue to plan the rotation — it leaves ample time to generate, deploy, and validate the replacement before the deadline. ")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Make sure the email recipients on your organisation are correct and monitored, so these reminders reach the team that owns rotation. See "),
                  createVNode("a", { href: "/tech/lfi-api-hub/trust-framework/contacts" }, "Contacts"),
                  createTextVNode(" for managing notification recipients. ")
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
        num: "03",
        color: "var(--at-blue)",
        eyebrow: "The mechanism",
        title: "Overlap, cut over, then retire",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Rotation is not a single in-place swap — it is a controlled overlap. A new certificate is issued and published <em data-v-4a22f215${_scopeId2}>alongside</em> the old one, so both are trusted at the same time. You then move your service onto the new key, confirm it works, and only afterwards retire the old certificate. Nothing breaks because there is never a moment when no valid certificate exists. `);
                } else {
                  return [
                    createTextVNode(" Rotation is not a single in-place swap — it is a controlled overlap. A new certificate is issued and published "),
                    createVNode("em", null, "alongside"),
                    createTextVNode(" the old one, so both are trusted at the same time. You then move your service onto the new key, confirm it works, and only afterwards retire the old certificate. Nothing breaks because there is never a moment when no valid certificate exists. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<ol class="ed-steps" data-v-4a22f215${_scopeId}><li data-v-4a22f215${_scopeId}><strong data-v-4a22f215${_scopeId}>Generate a new key and CSR.</strong> Produce a fresh 2048-bit RSA private key and a SHA-256 CSR with the same subject fields as the certificate you are replacing. In production this MUST happen inside your HSM or equivalent secure key management infrastructure. `);
            _push2(ssrRenderComponent(_component_EdCode, {
              code: opensslCommand,
              lang: "bash",
              filename: "openssl (demonstration only)"
            }, null, _parent2, _scopeId));
            _push2(`</li><li data-v-4a22f215${_scopeId}><strong data-v-4a22f215${_scopeId}>Upload the CSR and issue the new certificate.</strong> Upload it in the Trust Framework exactly as you did when the certificate was first created. The new certificate receives its own <strong data-v-4a22f215${_scopeId}>Key ID (<code data-v-4a22f215${_scopeId}>kid</code>)</strong>, and the Trust Framework publishes it to your organisation&#39;s JWKS automatically. </li><li data-v-4a22f215${_scopeId}><strong data-v-4a22f215${_scopeId}>Both keys are now live.</strong> During the overlap, the old and new <code data-v-4a22f215${_scopeId}>kid</code>s are both resolvable from your JWKS. Any party that verifies your certificates against the JWKS will accept either one, which is what makes a zero-downtime cutover possible. </li><li data-v-4a22f215${_scopeId}><strong data-v-4a22f215${_scopeId}>Cut over to the new key.</strong> Switch your service to present (transport) or sign with (signing) the new certificate. See the type-specific guidance below. </li><li data-v-4a22f215${_scopeId}><strong data-v-4a22f215${_scopeId}>Verify, then retire the old certificate.</strong> Confirm the new key is in use and working, then revoke or remove the old certificate per your key-destruction policy. See <a href="/policy/secure-management" data-v-4a22f215${_scopeId}>Secure Management</a>. </li></ol>`);
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "tip",
              title: "Rotation reuses the creation steps you already know"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-4a22f215${_scopeId2}> Steps 1–2 are identical to first-time certificate creation. If you have generated a certificate before — see <a href="/tech/lfi-api-hub/trust-framework/certificates/" data-v-4a22f215${_scopeId2}>Keys &amp; Certificates (LFI)</a> or <a href="/tech/tpp-standards/trust-framework/certificates/" data-v-4a22f215${_scopeId2}>Keys &amp; Certificates (TPP)</a> — you already know the mechanics. Rotation adds only the overlap-and-cutover discipline around them. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" Steps 1–2 are identical to first-time certificate creation. If you have generated a certificate before — see "),
                      createVNode("a", { href: "/tech/lfi-api-hub/trust-framework/certificates/" }, "Keys & Certificates (LFI)"),
                      createTextVNode(" or "),
                      createVNode("a", { href: "/tech/tpp-standards/trust-framework/certificates/" }, "Keys & Certificates (TPP)"),
                      createTextVNode(" — you already know the mechanics. Rotation adds only the overlap-and-cutover discipline around them. ")
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
                  createTextVNode(" Rotation is not a single in-place swap — it is a controlled overlap. A new certificate is issued and published "),
                  createVNode("em", null, "alongside"),
                  createTextVNode(" the old one, so both are trusted at the same time. You then move your service onto the new key, confirm it works, and only afterwards retire the old certificate. Nothing breaks because there is never a moment when no valid certificate exists. ")
                ]),
                _: 1
              }),
              createVNode("ol", { class: "ed-steps" }, [
                createVNode("li", null, [
                  createVNode("strong", null, "Generate a new key and CSR."),
                  createTextVNode(" Produce a fresh 2048-bit RSA private key and a SHA-256 CSR with the same subject fields as the certificate you are replacing. In production this MUST happen inside your HSM or equivalent secure key management infrastructure. "),
                  createVNode(_component_EdCode, {
                    code: opensslCommand,
                    lang: "bash",
                    filename: "openssl (demonstration only)"
                  })
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "Upload the CSR and issue the new certificate."),
                  createTextVNode(" Upload it in the Trust Framework exactly as you did when the certificate was first created. The new certificate receives its own "),
                  createVNode("strong", null, [
                    createTextVNode("Key ID ("),
                    createVNode("code", null, "kid"),
                    createTextVNode(")")
                  ]),
                  createTextVNode(", and the Trust Framework publishes it to your organisation's JWKS automatically. ")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "Both keys are now live."),
                  createTextVNode(" During the overlap, the old and new "),
                  createVNode("code", null, "kid"),
                  createTextVNode("s are both resolvable from your JWKS. Any party that verifies your certificates against the JWKS will accept either one, which is what makes a zero-downtime cutover possible. ")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "Cut over to the new key."),
                  createTextVNode(" Switch your service to present (transport) or sign with (signing) the new certificate. See the type-specific guidance below. ")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "Verify, then retire the old certificate."),
                  createTextVNode(" Confirm the new key is in use and working, then revoke or remove the old certificate per your key-destruction policy. See "),
                  createVNode("a", { href: "/policy/secure-management" }, "Secure Management"),
                  createTextVNode(". ")
                ])
              ]),
              createVNode(_component_EdNote, {
                type: "tip",
                title: "Rotation reuses the creation steps you already know"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" Steps 1–2 are identical to first-time certificate creation. If you have generated a certificate before — see "),
                    createVNode("a", { href: "/tech/lfi-api-hub/trust-framework/certificates/" }, "Keys & Certificates (LFI)"),
                    createTextVNode(" or "),
                    createVNode("a", { href: "/tech/tpp-standards/trust-framework/certificates/" }, "Keys & Certificates (TPP)"),
                    createTextVNode(" — you already know the mechanics. Rotation adds only the overlap-and-cutover discipline around them. ")
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
        id: "transport",
        num: "04",
        color: "var(--at-blue-deep)",
        eyebrow: "Transport certificates",
        title: "Rotating the certificate used for mTLS",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` A transport certificate authenticates your client during the mTLS handshake. To rotate it: `);
                } else {
                  return [
                    createTextVNode(" A transport certificate authenticates your client during the mTLS handshake. To rotate it: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-4a22f215${_scopeId2}>Issue the new transport certificate (overlap steps 1–2 above).</li><li data-v-4a22f215${_scopeId2}> Deploy the new certificate and its private key to the infrastructure that terminates mTLS — for an LFI-held server transport certificate (S4), that is your Ozone Connect server; for a TPP, that is wherever your client establishes outbound mTLS connections. </li><li data-v-4a22f215${_scopeId2}> Re-run connectivity validation. After transport certificates are rotated, the Hub re-verifies connectivity using the <a href="/tech/lfi-api-hub/v2.1/health-check/" data-v-4a22f215${_scopeId2}>Health Check</a> endpoints (<code data-v-4a22f215${_scopeId2}>/hello-mtls</code>, <code data-v-4a22f215${_scopeId2}>/echo-cert</code>). Confirm these pass on the new certificate before retiring the old one. </li><li data-v-4a22f215${_scopeId2}>Remove the old certificate from your infrastructure once the new one is confirmed working.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Issue the new transport certificate (overlap steps 1–2 above)."),
                    createVNode("li", null, " Deploy the new certificate and its private key to the infrastructure that terminates mTLS — for an LFI-held server transport certificate (S4), that is your Ozone Connect server; for a TPP, that is wherever your client establishes outbound mTLS connections. "),
                    createVNode("li", null, [
                      createTextVNode(" Re-run connectivity validation. After transport certificates are rotated, the Hub re-verifies connectivity using the "),
                      createVNode("a", { href: "/tech/lfi-api-hub/v2.1/health-check/" }, "Health Check"),
                      createTextVNode(" endpoints ("),
                      createVNode("code", null, "/hello-mtls"),
                      createTextVNode(", "),
                      createVNode("code", null, "/echo-cert"),
                      createTextVNode("). Confirm these pass on the new certificate before retiring the old one. ")
                    ]),
                    createVNode("li", null, "Remove the old certificate from your infrastructure once the new one is confirmed working.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "info",
              title: "The OU pin survives rotation"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-4a22f215${_scopeId2}> Where the Hub authenticates your transport certificate by pinning the <strong data-v-4a22f215${_scopeId2}>OU</strong> (your Organisation ID) rather than a specific certificate, a rotation that keeps the same subject fields needs <strong data-v-4a22f215${_scopeId2}>no configuration change</strong> on the verifying side — the new certificate matches the same pin. This is why keeping the CSR subject identical to the previous certificate matters. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" Where the Hub authenticates your transport certificate by pinning the "),
                      createVNode("strong", null, "OU"),
                      createTextVNode(" (your Organisation ID) rather than a specific certificate, a rotation that keeps the same subject fields needs "),
                      createVNode("strong", null, "no configuration change"),
                      createTextVNode(" on the verifying side — the new certificate matches the same pin. This is why keeping the CSR subject identical to the previous certificate matters. ")
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
                  createTextVNode(" A transport certificate authenticates your client during the mTLS handshake. To rotate it: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Issue the new transport certificate (overlap steps 1–2 above)."),
                  createVNode("li", null, " Deploy the new certificate and its private key to the infrastructure that terminates mTLS — for an LFI-held server transport certificate (S4), that is your Ozone Connect server; for a TPP, that is wherever your client establishes outbound mTLS connections. "),
                  createVNode("li", null, [
                    createTextVNode(" Re-run connectivity validation. After transport certificates are rotated, the Hub re-verifies connectivity using the "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.1/health-check/" }, "Health Check"),
                    createTextVNode(" endpoints ("),
                    createVNode("code", null, "/hello-mtls"),
                    createTextVNode(", "),
                    createVNode("code", null, "/echo-cert"),
                    createTextVNode("). Confirm these pass on the new certificate before retiring the old one. ")
                  ]),
                  createVNode("li", null, "Remove the old certificate from your infrastructure once the new one is confirmed working.")
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "info",
                title: "The OU pin survives rotation"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" Where the Hub authenticates your transport certificate by pinning the "),
                    createVNode("strong", null, "OU"),
                    createTextVNode(" (your Organisation ID) rather than a specific certificate, a rotation that keeps the same subject fields needs "),
                    createVNode("strong", null, "no configuration change"),
                    createTextVNode(" on the verifying side — the new certificate matches the same pin. This is why keeping the CSR subject identical to the previous certificate matters. ")
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
        id: "signing",
        num: "05",
        color: "var(--at-navy)",
        eyebrow: "Signing certificates",
        title: "Rotating the certificate used to sign JWTs",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` A signing certificate proves the integrity and authenticity of the JWTs you send — client assertions, request objects, and similar. The key detail when rotating is the <code data-v-4a22f215${_scopeId2}>kid</code>: `);
                } else {
                  return [
                    createTextVNode(" A signing certificate proves the integrity and authenticity of the JWTs you send — client assertions, request objects, and similar. The key detail when rotating is the "),
                    createVNode("code", null, "kid"),
                    createTextVNode(": ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-4a22f215${_scopeId2}>Issue the new signing certificate (overlap steps 1–2 above) and note its new <code data-v-4a22f215${_scopeId2}>kid</code>.</li><li data-v-4a22f215${_scopeId2}> During the overlap, both the old and new <code data-v-4a22f215${_scopeId2}>kid</code> are published to your signing JWKS, so JWTs signed with either key continue to verify. </li><li data-v-4a22f215${_scopeId2}> Cut over by signing new JWTs with the new private key and setting the <code data-v-4a22f215${_scopeId2}>kid</code> header to the new certificate&#39;s Key ID. The verifying party resolves that <code data-v-4a22f215${_scopeId2}>kid</code> from your JWKS and validates the signature. See <a href="/tech/tpp-standards/security/fapi/message-signing" data-v-4a22f215${_scopeId2}>Message Signing</a> for how the <code data-v-4a22f215${_scopeId2}>kid</code> is used in the JWT header. </li><li data-v-4a22f215${_scopeId2}> Once you have fully switched to signing with the new key, retire the old signing certificate. </li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createTextVNode("Issue the new signing certificate (overlap steps 1–2 above) and note its new "),
                      createVNode("code", null, "kid"),
                      createTextVNode(".")
                    ]),
                    createVNode("li", null, [
                      createTextVNode(" During the overlap, both the old and new "),
                      createVNode("code", null, "kid"),
                      createTextVNode(" are published to your signing JWKS, so JWTs signed with either key continue to verify. ")
                    ]),
                    createVNode("li", null, [
                      createTextVNode(" Cut over by signing new JWTs with the new private key and setting the "),
                      createVNode("code", null, "kid"),
                      createTextVNode(" header to the new certificate's Key ID. The verifying party resolves that "),
                      createVNode("code", null, "kid"),
                      createTextVNode(" from your JWKS and validates the signature. See "),
                      createVNode("a", { href: "/tech/tpp-standards/security/fapi/message-signing" }, "Message Signing"),
                      createTextVNode(" for how the "),
                      createVNode("code", null, "kid"),
                      createTextVNode(" is used in the JWT header. ")
                    ]),
                    createVNode("li", null, " Once you have fully switched to signing with the new key, retire the old signing certificate. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "tip",
              title: "Always sign with the kid that is actually in use"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-4a22f215${_scopeId2}> The most common rotation mistake is updating the certificate but continuing to send the old <code data-v-4a22f215${_scopeId2}>kid</code> in the JWT header, or vice versa. The <code data-v-4a22f215${_scopeId2}>kid</code> you put in the header MUST correspond to the private key that produced the signature. Verify the two match after every rotation. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" The most common rotation mistake is updating the certificate but continuing to send the old "),
                      createVNode("code", null, "kid"),
                      createTextVNode(" in the JWT header, or vice versa. The "),
                      createVNode("code", null, "kid"),
                      createTextVNode(" you put in the header MUST correspond to the private key that produced the signature. Verify the two match after every rotation. ")
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
                  createTextVNode(" A signing certificate proves the integrity and authenticity of the JWTs you send — client assertions, request objects, and similar. The key detail when rotating is the "),
                  createVNode("code", null, "kid"),
                  createTextVNode(": ")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createTextVNode("Issue the new signing certificate (overlap steps 1–2 above) and note its new "),
                    createVNode("code", null, "kid"),
                    createTextVNode(".")
                  ]),
                  createVNode("li", null, [
                    createTextVNode(" During the overlap, both the old and new "),
                    createVNode("code", null, "kid"),
                    createTextVNode(" are published to your signing JWKS, so JWTs signed with either key continue to verify. ")
                  ]),
                  createVNode("li", null, [
                    createTextVNode(" Cut over by signing new JWTs with the new private key and setting the "),
                    createVNode("code", null, "kid"),
                    createTextVNode(" header to the new certificate's Key ID. The verifying party resolves that "),
                    createVNode("code", null, "kid"),
                    createTextVNode(" from your JWKS and validates the signature. See "),
                    createVNode("a", { href: "/tech/tpp-standards/security/fapi/message-signing" }, "Message Signing"),
                    createTextVNode(" for how the "),
                    createVNode("code", null, "kid"),
                    createTextVNode(" is used in the JWT header. ")
                  ]),
                  createVNode("li", null, " Once you have fully switched to signing with the new key, retire the old signing certificate. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "tip",
                title: "Always sign with the kid that is actually in use"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" The most common rotation mistake is updating the certificate but continuing to send the old "),
                    createVNode("code", null, "kid"),
                    createTextVNode(" in the JWT header, or vice versa. The "),
                    createVNode("code", null, "kid"),
                    createTextVNode(" you put in the header MUST correspond to the private key that produced the signature. Verify the two match after every rotation. ")
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
        id: "checklist",
        num: "06",
        color: "var(--at-teal-deep)",
        eyebrow: "Checklist",
        title: "Before you mark a rotation complete",
        tone: "surface",
        narrow: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-4a22f215${_scopeId2}>The certificate being rotated is one whose private key you hold (otherwise Nebras rotates it).</li><li data-v-4a22f215${_scopeId2}>The new certificate was issued <strong data-v-4a22f215${_scopeId2}>before</strong> the old one&#39;s expiry date.</li><li data-v-4a22f215${_scopeId2}>The new key and CSR were generated inside your HSM / secure key management for production.</li><li data-v-4a22f215${_scopeId2}>The new <code data-v-4a22f215${_scopeId2}>kid</code> is published to your JWKS and resolvable.</li><li data-v-4a22f215${_scopeId2}><strong data-v-4a22f215${_scopeId2}>Transport:</strong> Health Check connectivity validation passes on the new certificate.</li><li data-v-4a22f215${_scopeId2}><strong data-v-4a22f215${_scopeId2}>Signing:</strong> new JWTs are signed with the new key and carry the matching <code data-v-4a22f215${_scopeId2}>kid</code>.</li><li data-v-4a22f215${_scopeId2}>The old certificate is retired and the old private key destroyed per your key-management policy.</li><li data-v-4a22f215${_scopeId2}>The certificate description records who holds the private key.</li>`);
                } else {
                  return [
                    createVNode("li", null, "The certificate being rotated is one whose private key you hold (otherwise Nebras rotates it)."),
                    createVNode("li", null, [
                      createTextVNode("The new certificate was issued "),
                      createVNode("strong", null, "before"),
                      createTextVNode(" the old one's expiry date.")
                    ]),
                    createVNode("li", null, "The new key and CSR were generated inside your HSM / secure key management for production."),
                    createVNode("li", null, [
                      createTextVNode("The new "),
                      createVNode("code", null, "kid"),
                      createTextVNode(" is published to your JWKS and resolvable.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Transport:"),
                      createTextVNode(" Health Check connectivity validation passes on the new certificate.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Signing:"),
                      createTextVNode(" new JWTs are signed with the new key and carry the matching "),
                      createVNode("code", null, "kid"),
                      createTextVNode(".")
                    ]),
                    createVNode("li", null, "The old certificate is retired and the old private key destroyed per your key-management policy."),
                    createVNode("li", null, "The certificate description records who holds the private key.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "The certificate being rotated is one whose private key you hold (otherwise Nebras rotates it)."),
                  createVNode("li", null, [
                    createTextVNode("The new certificate was issued "),
                    createVNode("strong", null, "before"),
                    createTextVNode(" the old one's expiry date.")
                  ]),
                  createVNode("li", null, "The new key and CSR were generated inside your HSM / secure key management for production."),
                  createVNode("li", null, [
                    createTextVNode("The new "),
                    createVNode("code", null, "kid"),
                    createTextVNode(" is published to your JWKS and resolvable.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Transport:"),
                    createTextVNode(" Health Check connectivity validation passes on the new certificate.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Signing:"),
                    createTextVNode(" new JWTs are signed with the new key and carry the matching "),
                    createVNode("code", null, "kid"),
                    createTextVNode(".")
                  ]),
                  createVNode("li", null, "The old certificate is retired and the old private key destroyed per your key-management policy."),
                  createVNode("li", null, "The certificate description records who holds the private key.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdRelatedCards, {
        eyebrow: "Further reading",
        title: "Related references"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdRelatedCard, {
              href: "/tech/lfi-api-hub/trust-framework/certificates/",
              category: "LFI · Trust Framework",
              "category-color": "var(--at-teal)",
              title: "Keys & Certificates (LFI)",
              desc: "Certificate types, key requirements, and the creation walkthrough for LFIs."
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRelatedCard, {
              href: "/tech/tpp-standards/trust-framework/certificates/",
              category: "TPP · Trust Framework",
              "category-color": "var(--at-blue)",
              title: "Keys & Certificates (TPP)",
              desc: "Certificate types, key requirements, and the creation walkthrough for TPPs."
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRelatedCard, {
              href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/certificate-walkthroughs",
              category: "LFI · Onboarding",
              "category-color": "var(--at-gold)",
              title: "Certificate Walkthroughs",
              desc: "S1 vs S4 — the canonical Ozone-held versus LFI-held private-key example."
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRelatedCard, {
              href: "/policy/secure-management",
              category: "Policy",
              "category-color": "var(--at-navy)",
              title: "Secure Management",
              desc: "Key lifecycle, rotation cadence, HSM requirements, and key destruction."
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdRelatedCard, {
                href: "/tech/lfi-api-hub/trust-framework/certificates/",
                category: "LFI · Trust Framework",
                "category-color": "var(--at-teal)",
                title: "Keys & Certificates (LFI)",
                desc: "Certificate types, key requirements, and the creation walkthrough for LFIs."
              }),
              createVNode(_component_EdRelatedCard, {
                href: "/tech/tpp-standards/trust-framework/certificates/",
                category: "TPP · Trust Framework",
                "category-color": "var(--at-blue)",
                title: "Keys & Certificates (TPP)",
                desc: "Certificate types, key requirements, and the creation walkthrough for TPPs."
              }),
              createVNode(_component_EdRelatedCard, {
                href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/certificate-walkthroughs",
                category: "LFI · Onboarding",
                "category-color": "var(--at-gold)",
                title: "Certificate Walkthroughs",
                desc: "S1 vs S4 — the canonical Ozone-held versus LFI-held private-key example."
              }),
              createVNode(_component_EdRelatedCard, {
                href: "/policy/secure-management",
                category: "Policy",
                "category-color": "var(--at-navy)",
                title: "Secure Management",
                desc: "Key lifecycle, rotation cadence, HSM requirements, and key destruction."
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/knowledge-base/articles/certificate-rotation.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const certificateRotation = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4a22f215"]]);
export {
  certificateRotation as default
};
