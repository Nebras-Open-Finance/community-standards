import { _ as __unplugin_components_6 } from "./EdBullets-gB3sPgIp.js";
import { _ as __unplugin_components_5 } from "./EdNote-61YjJPRT.js";
import { _ as __unplugin_components_4 } from "./EdProse-D3vi_RS_.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-DD63-Oxz.js";
import { _ as __unplugin_components_2 } from "./EdInPageNav-DkIq-w7S.js";
import { _ as __unplugin_components_0$1 } from "./EdHero-BRdU9xqH.js";
import { _ as __unplugin_components_0 } from "./EdBackStrip-CrlwbtLm.js";
import { defineComponent, resolveComponent, mergeProps, withCtx, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { useHead } from "@unhead/vue";
import { b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "directory",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({ title: "Directory · BioPay" });
    const sections = [
      { id: "role", label: "The BPIP role" },
      { id: "endpoints", label: "Entitled endpoints" },
      { id: "certificates", label: "Certificates" },
      { id: "boundary", label: "No other access" }
    ];
    const meta = [
      { label: "Status", value: "Draft" },
      { label: "New roles", value: "1" },
      { label: "Version", value: "0.1" }
    ];
    const endpoints = [
      {
        method: "POST",
        path: "/biometric-payments-discovery",
        link: "/biopay/registration/api-reference/biometric-payments-discovery",
        note: "Discover a customer’s BioPay registration."
      },
      {
        method: "POST",
        path: "/biometric-payments",
        link: "/biopay/payment/api-reference/biometric-payments",
        note: "Initiate a biometric payment."
      },
      {
        method: "GET",
        path: "/biometric-payments/{PaymentId}",
        link: "/biopay/payment/api-reference/biometric-payments-payment-id",
        note: "Retrieve a payment by PaymentId."
      },
      {
        method: "GET",
        path: "/biometric-payments",
        link: "/biopay/payment/api-reference/biometric-payments-by-idempotency-key",
        note: "Retrieve a payment by idempotency key."
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdBackStrip = __unplugin_components_0;
      const _component_EdHero = __unplugin_components_0$1;
      const _component_EdInPageNav = __unplugin_components_2;
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdNote = __unplugin_components_5;
      const _component_EdBullets = __unplugin_components_6;
      const _component_RouterLink = resolveComponent("RouterLink");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-page" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_EdBackStrip, {
        href: "/biopay/",
        text: "BioPay overview"
      }, null, _parent));
      _push(ssrRenderComponent(_component_EdHero, {
        eyebrow: "BioPay · Draft",
        "eyebrow-color": "var(--at-blue-deep)",
        title: "Directory",
        meta,
        lede: "BioPay introduces one new participant role: the <strong>Biometric Payment Initiation Provider (BPIP)</strong>. This page sets out what the role entitles its holder to, the certificates it requires, and the endpoints it can reach."
      }, null, _parent));
      _push(ssrRenderComponent(_component_EdInPageNav, { sections }, null, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "role",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "The BPIP role",
        title: "A new organisation type, inherited downwards"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p${_scopeId2}><strong${_scopeId2}>BPIP</strong> — Biometric Payment Initiation Provider — is a proposed new organisation type in the Directory, held by an entity specifically authorised to initiate biometric payments. In the first instance that entity is ICP. </p><p${_scopeId2}> Once the organisation type exists, the role is inherited downwards in the usual way: an organisation holding BPIP can create <strong${_scopeId2}>applications</strong> that carry the role, those applications issue <strong${_scopeId2}>software statements</strong> asserting it, and the <strong${_scopeId2}>clients</strong> registered from those software statements are entitled by it. Nothing further has to be assigned at the client level — a client created under a BPIP application is a BPIP client. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createVNode("strong", null, "BPIP"),
                      createTextVNode(" — Biometric Payment Initiation Provider — is a proposed new organisation type in the Directory, held by an entity specifically authorised to initiate biometric payments. In the first instance that entity is ICP. ")
                    ]),
                    createVNode("p", null, [
                      createTextVNode(" Once the organisation type exists, the role is inherited downwards in the usual way: an organisation holding BPIP can create "),
                      createVNode("strong", null, "applications"),
                      createTextVNode(" that carry the role, those applications issue "),
                      createVNode("strong", null, "software statements"),
                      createTextVNode(" asserting it, and the "),
                      createVNode("strong", null, "clients"),
                      createTextVNode(" registered from those software statements are entitled by it. Nothing further has to be assigned at the client level — a client created under a BPIP application is a BPIP client. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "info",
              title: "One grant type"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p${_scopeId2}> A BPIP client uses <code${_scopeId2}>client_credentials</code> only. There is no redirect journey to run: no PSU at the authorisation endpoint, no consent to authorise, and no refresh token to hold. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" A BPIP client uses "),
                      createVNode("code", null, "client_credentials"),
                      createTextVNode(" only. There is no redirect journey to run: no PSU at the authorisation endpoint, no consent to authorise, and no refresh token to hold. ")
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
                  createVNode("p", null, [
                    createVNode("strong", null, "BPIP"),
                    createTextVNode(" — Biometric Payment Initiation Provider — is a proposed new organisation type in the Directory, held by an entity specifically authorised to initiate biometric payments. In the first instance that entity is ICP. ")
                  ]),
                  createVNode("p", null, [
                    createTextVNode(" Once the organisation type exists, the role is inherited downwards in the usual way: an organisation holding BPIP can create "),
                    createVNode("strong", null, "applications"),
                    createTextVNode(" that carry the role, those applications issue "),
                    createVNode("strong", null, "software statements"),
                    createTextVNode(" asserting it, and the "),
                    createVNode("strong", null, "clients"),
                    createTextVNode(" registered from those software statements are entitled by it. Nothing further has to be assigned at the client level — a client created under a BPIP application is a BPIP client. ")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "info",
                title: "One grant type"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" A BPIP client uses "),
                    createVNode("code", null, "client_credentials"),
                    createTextVNode(" only. There is no redirect journey to run: no PSU at the authorisation endpoint, no consent to authorise, and no refresh token to hold. ")
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
        id: "endpoints",
        num: "02",
        color: "var(--at-blue-deep)",
        eyebrow: "Entitled endpoints",
        title: "The complete BPIP surface",
        tone: "surface",
        lede: "The BPIP role entitles its clients to the endpoints in this section, and to nothing else."
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdBullets, { accent: "var(--at-blue-deep)" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(endpoints, (e) => {
                    _push3(`<li${_scopeId2}><code${_scopeId2}>${ssrInterpolate(e.method)}</code>`);
                    _push3(ssrRenderComponent(_component_RouterLink, {
                      to: e.link
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<code${_scopeId3}>${ssrInterpolate(e.path)}</code>`);
                        } else {
                          return [
                            createVNode("code", null, toDisplayString(e.path), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(` — ${ssrInterpolate(e.note)}</li>`);
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(), createBlock(Fragment, null, renderList(endpoints, (e) => {
                      return createVNode("li", {
                        key: e.method + e.path
                      }, [
                        createVNode("code", null, toDisplayString(e.method), 1),
                        createVNode(_component_RouterLink, {
                          to: e.link
                        }, {
                          default: withCtx(() => [
                            createVNode("code", null, toDisplayString(e.path), 1)
                          ]),
                          _: 2
                        }, 1032, ["to"]),
                        createTextVNode(" — " + toDisplayString(e.note), 1)
                      ]);
                    }), 64))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` A BPIP client may also <strong${_scopeId2}>receive</strong> events from the API Hub — the `);
                  _push3(ssrRenderComponent(_component_RouterLink, { to: "/biopay/registration/api-reference/event-notification" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`registration event`);
                      } else {
                        return [
                          createTextVNode("registration event")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(` and the payment status event — at an endpoint it registers in the Directory. Those are delivered to the BPIP; they are not endpoints the BPIP calls. `);
                } else {
                  return [
                    createTextVNode(" A BPIP client may also "),
                    createVNode("strong", null, "receive"),
                    createTextVNode(" events from the API Hub — the "),
                    createVNode(_component_RouterLink, { to: "/biopay/registration/api-reference/event-notification" }, {
                      default: withCtx(() => [
                        createTextVNode("registration event")
                      ]),
                      _: 1
                    }),
                    createTextVNode(" and the payment status event — at an endpoint it registers in the Directory. Those are delivered to the BPIP; they are not endpoints the BPIP calls. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdBullets, { accent: "var(--at-blue-deep)" }, {
                default: withCtx(() => [
                  (openBlock(), createBlock(Fragment, null, renderList(endpoints, (e) => {
                    return createVNode("li", {
                      key: e.method + e.path
                    }, [
                      createVNode("code", null, toDisplayString(e.method), 1),
                      createVNode(_component_RouterLink, {
                        to: e.link
                      }, {
                        default: withCtx(() => [
                          createVNode("code", null, toDisplayString(e.path), 1)
                        ]),
                        _: 2
                      }, 1032, ["to"]),
                      createTextVNode(" — " + toDisplayString(e.note), 1)
                    ]);
                  }), 64))
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" A BPIP client may also "),
                  createVNode("strong", null, "receive"),
                  createTextVNode(" events from the API Hub — the "),
                  createVNode(_component_RouterLink, { to: "/biopay/registration/api-reference/event-notification" }, {
                    default: withCtx(() => [
                      createTextVNode("registration event")
                    ]),
                    _: 1
                  }),
                  createTextVNode(" and the payment status event — at an endpoint it registers in the Directory. Those are delivered to the BPIP; they are not endpoints the BPIP calls. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "certificates",
        num: "03",
        color: "var(--at-gold)",
        eyebrow: "Certificates",
        title: "Transport and signing, plus encryption for webhooks"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` A BPIP application requires the same certificates as any other Directory participant, issued under the existing Trust Framework `);
                  _push3(ssrRenderComponent(_component_RouterLink, { to: "/tech/tpp-standards/trust-framework/certificates" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`certificate profiles`);
                      } else {
                        return [
                          createTextVNode("certificate profiles")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`. `);
                } else {
                  return [
                    createTextVNode(" A BPIP application requires the same certificates as any other Directory participant, issued under the existing Trust Framework "),
                    createVNode(_component_RouterLink, { to: "/tech/tpp-standards/trust-framework/certificates" }, {
                      default: withCtx(() => [
                        createTextVNode("certificate profiles")
                      ]),
                      _: 1
                    }),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, { accent: "var(--at-gold)" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li${_scopeId2}><strong${_scopeId2}>Transport certificate — required.</strong> Presented in the mTLS handshake on every call to the API Hub, and the certificate the access token is bound to. </li><li${_scopeId2}><strong${_scopeId2}>Signing certificate — required.</strong> Signs the client assertion used at the token endpoint, and the signed payloads the BioPay endpoints expect. </li><li${_scopeId2}><strong${_scopeId2}>Encryption certificate — required if the BPIP implements webhooks.</strong> Events are delivered as a JWE encrypted with the public encryption certificate registered in the Directory, so only the holder of the corresponding private key can read them. Without one the API Hub has no key to encrypt to and cannot deliver events — the BPIP would have to track payment status by polling instead. </li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Transport certificate — required."),
                      createTextVNode(" Presented in the mTLS handshake on every call to the API Hub, and the certificate the access token is bound to. ")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Signing certificate — required."),
                      createTextVNode(" Signs the client assertion used at the token endpoint, and the signed payloads the BioPay endpoints expect. ")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Encryption certificate — required if the BPIP implements webhooks."),
                      createTextVNode(" Events are delivered as a JWE encrypted with the public encryption certificate registered in the Directory, so only the holder of the corresponding private key can read them. Without one the API Hub has no key to encrypt to and cannot deliver events — the BPIP would have to track payment status by polling instead. ")
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
                  createTextVNode(" A BPIP application requires the same certificates as any other Directory participant, issued under the existing Trust Framework "),
                  createVNode(_component_RouterLink, { to: "/tech/tpp-standards/trust-framework/certificates" }, {
                    default: withCtx(() => [
                      createTextVNode("certificate profiles")
                    ]),
                    _: 1
                  }),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, { accent: "var(--at-gold)" }, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Transport certificate — required."),
                    createTextVNode(" Presented in the mTLS handshake on every call to the API Hub, and the certificate the access token is bound to. ")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Signing certificate — required."),
                    createTextVNode(" Signs the client assertion used at the token endpoint, and the signed payloads the BioPay endpoints expect. ")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Encryption certificate — required if the BPIP implements webhooks."),
                    createTextVNode(" Events are delivered as a JWE encrypted with the public encryption certificate registered in the Directory, so only the holder of the corresponding private key can read them. Without one the API Hub has no key to encrypt to and cannot deliver events — the BPIP would have to track payment status by polling instead. ")
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
        id: "boundary",
        num: "04",
        color: "var(--at-navy)",
        eyebrow: "No other access",
        title: "BPIP reaches nothing else in Open Finance",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "warning",
              title: "The role is closed"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p${_scopeId2}> A BPIP client has <strong${_scopeId2}>no access to any other Open Finance service</strong>. It cannot create or read consents, cannot call the Data Sharing, Service Initiation, Confirmation of Payee, Products and Leads or Insurance APIs, and cannot obtain a token bearing any scope beyond the BioPay one. The entitlement is enforced at the API Hub, which rejects a request whose client does not carry BPIP before anything is proxied to an LFI. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" A BPIP client has "),
                      createVNode("strong", null, "no access to any other Open Finance service"),
                      createTextVNode(". It cannot create or read consents, cannot call the Data Sharing, Service Initiation, Confirmation of Payee, Products and Leads or Insurance APIs, and cannot obtain a token bearing any scope beyond the BioPay one. The entitlement is enforced at the API Hub, which rejects a request whose client does not carry BPIP before anything is proxied to an LFI. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdNote, {
                type: "warning",
                title: "The role is closed"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" A BPIP client has "),
                    createVNode("strong", null, "no access to any other Open Finance service"),
                    createTextVNode(". It cannot create or read consents, cannot call the Data Sharing, Service Initiation, Confirmation of Payee, Products and Leads or Insurance APIs, and cannot obtain a token bearing any scope beyond the BioPay one. The entitlement is enforced at the API Hub, which rejects a request whose client does not carry BPIP before anything is proxied to an LFI. ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/biopay/directory.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
