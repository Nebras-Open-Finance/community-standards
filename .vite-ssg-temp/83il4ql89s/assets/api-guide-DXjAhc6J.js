import { _ as __unplugin_components_6$2 } from "./EdRefTable-DCHoNUfr.js";
import { _ as __unplugin_components_6$1, a as __unplugin_components_7 } from "./EdRelatedCards-D4uHHv56.js";
import { _ as __unplugin_components_6 } from "./EdCallout-BllD3rO_.js";
import { _ as __unplugin_components_4 } from "./EdProse-D3vi_RS_.js";
import { _ as __unplugin_components_5$1 } from "./EdNote-61YjJPRT.js";
import { _ as __unplugin_components_5 } from "./APIFlowViewer-BRjrby73.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-DD63-Oxz.js";
import { _ as __unplugin_components_2 } from "./EdInPageNav-DkIq-w7S.js";
import { _ as __unplugin_components_0$1 } from "./EdHero-BRdU9xqH.js";
import { _ as __unplugin_components_0 } from "./EdBackStrip-CrlwbtLm.js";
import { defineComponent, resolveComponent, mergeProps, withCtx, createVNode, createTextVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { useHead } from "@unhead/vue";
import { _ as _sfc_main$1 } from "./BpPaymentFlow-DobHG7mp.js";
import { b as block0 } from "../main.mjs";
import "mermaid";
import "./useChartTheme-DtmiKid7.js";
import "vite-ssg";
import "axios";
import "vue-router";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "api-guide",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({ title: "Payment — API Guide · BioPay" });
    const sections = [
      { id: "sequence", label: "Sequence Diagram" },
      { id: "token", label: "Access token" },
      { id: "create", label: "Create payment" },
      { id: "execution", label: "The LFI makes the payment" },
      { id: "patch", label: "Patching the Payment Status" },
      { id: "status", label: "Event and polling" }
    ];
    const meta = [
      { label: "Status", value: "Draft" },
      { label: "Grant type", value: "client_credentials" },
      { label: "Version", value: "0.1" }
    ];
    const rails = [
      {
        instrument: "AANI",
        creditor: "AEAaniCreditor",
        addressed: "IBAN, AANI alias, mobile number or Emirates ID",
        note: "Account-to-account. Creditor agent identified by BIC where the alias does not resolve it."
      },
      {
        instrument: "CBDC",
        creditor: "AECbdcCreditor",
        addressed: "Wallet identifier",
        note: "Digital Dirham. Wallet addressing is a placeholder pending the scheme definition."
      },
      {
        instrument: "JAYWAN",
        creditor: "AEJaywanCreditor",
        addressed: "Acquirer, merchant and terminal identifiers",
        note: "Domestic card scheme. Field set is a first cut and needs validating against the scheme’s own message definition."
      }
    ];
    const statuses = [
      {
        value: "Pending",
        meaning: "Set by the Hub on creation. The LFI has accepted the instruction but the rail has not responded.",
        terminal: "No"
      },
      {
        value: "AcceptedWithoutPosting",
        meaning: "The rail has accepted the payment; the debtor account has not yet been posted.",
        terminal: "Yes"
      },
      {
        value: "Accepted",
        meaning: "The payment has settled on the rail.",
        terminal: "Yes"
      },
      {
        value: "Rejected",
        meaning: "The LFI or the rail refused the payment. StatusReason carries why.",
        terminal: "Yes"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdBackStrip = __unplugin_components_0;
      const _component_EdHero = __unplugin_components_0$1;
      const _component_EdInPageNav = __unplugin_components_2;
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_APIFlowViewer = __unplugin_components_5;
      const _component_EdNote = __unplugin_components_5$1;
      const _component_RouterLink = resolveComponent("RouterLink");
      const _component_EdProse = __unplugin_components_4;
      const _component_EdCallout = __unplugin_components_6;
      const _component_EdRelatedCards = __unplugin_components_6$1;
      const _component_EdRelatedCard = __unplugin_components_7;
      const _component_EdRefTable = __unplugin_components_6$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-page" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_EdBackStrip, {
        href: "/biopay/",
        text: "BioPay overview"
      }, null, _parent));
      _push(ssrRenderComponent(_component_EdHero, {
        eyebrow: "BioPay · Payment · Draft",
        "eyebrow-color": "var(--at-navy)",
        title: "Payment API Guide",
        meta,
        lede: "How a biometric identification becomes a payment: the initiator takes a token, creates the payment, and the LFI executes it on the rail and patches the outcome back to the API Hub. That patch is what the initiator then learns by event or by polling. No consent, no redirect, no PSU at the authorisation endpoint."
      }, null, _parent));
      _push(ssrRenderComponent(_component_EdInPageNav, { sections }, null, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "sequence",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Sequence Diagram",
        title: "The payment flow end to end",
        tone: "surface",
        lede: "Click the diagram to expand it."
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_APIFlowViewer, {
              title: "BioPay — payment",
              eyebrow: "Payment flow"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$1, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "info",
              title: "Where this guide starts"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p${_scopeId2}> The capture, the match and the resolution to an ICP user identifier all happen outside the Open Finance boundary and are not API operations. The registration that must already exist, and the discovery call that confirms it is still usable, are covered on the `);
                  _push3(ssrRenderComponent(_component_RouterLink, { to: "/biopay/registration/api-guide" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Registration API Guide`);
                      } else {
                        return [
                          createTextVNode("Registration API Guide")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`. This guide picks up at the token endpoint. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" The capture, the match and the resolution to an ICP user identifier all happen outside the Open Finance boundary and are not API operations. The registration that must already exist, and the discovery call that confirms it is still usable, are covered on the "),
                      createVNode(_component_RouterLink, { to: "/biopay/registration/api-guide" }, {
                        default: withCtx(() => [
                          createTextVNode("Registration API Guide")
                        ]),
                        _: 1
                      }),
                      createTextVNode(". This guide picks up at the token endpoint. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_APIFlowViewer, {
                title: "BioPay — payment",
                eyebrow: "Payment flow"
              }, {
                default: withCtx(() => [
                  createVNode(_sfc_main$1)
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "info",
                title: "Where this guide starts"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" The capture, the match and the resolution to an ICP user identifier all happen outside the Open Finance boundary and are not API operations. The registration that must already exist, and the discovery call that confirms it is still usable, are covered on the "),
                    createVNode(_component_RouterLink, { to: "/biopay/registration/api-guide" }, {
                      default: withCtx(() => [
                        createTextVNode("Registration API Guide")
                      ]),
                      _: 1
                    }),
                    createTextVNode(". This guide picks up at the token endpoint. ")
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
        id: "token",
        num: "02",
        color: "var(--at-blue-deep)",
        eyebrow: "Access token",
        title: "A token with no PSU in the loop"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The initiator obtains an access token under <code${_scopeId2}>client_credentials</code>, using its BPIP client. There is no PAR, no authorisation request, no redirect and no refresh token: the customer’s authority was established once, at registration, and is held by the API Hub. Nothing about the token is tied to a particular customer or a particular payment — it authenticates the initiator, and the authority to debit comes from the registration the Hub already holds. `);
                } else {
                  return [
                    createTextVNode(" The initiator obtains an access token under "),
                    createVNode("code", null, "client_credentials"),
                    createTextVNode(", using its BPIP client. There is no PAR, no authorisation request, no redirect and no refresh token: the customer’s authority was established once, at registration, and is held by the API Hub. Nothing about the token is tied to a particular customer or a particular payment — it authenticates the initiator, and the authority to debit comes from the registration the Hub already holds. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The request is made over mutual TLS with the transport certificate registered in the Directory, and authenticated with a client assertion signed by the signing certificate — the same `);
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
                  _push3(` every other participant uses. The token is bound to that transport certificate, so a token replayed from a different connection is rejected. The scope is the BioPay scope and nothing else; a BPIP client cannot obtain a token bearing any other. See `);
                  _push3(ssrRenderComponent(_component_RouterLink, { to: "/biopay/directory" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Directory`);
                      } else {
                        return [
                          createTextVNode("Directory")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(` for what the role entitles. `);
                } else {
                  return [
                    createTextVNode(" The request is made over mutual TLS with the transport certificate registered in the Directory, and authenticated with a client assertion signed by the signing certificate — the same "),
                    createVNode(_component_RouterLink, { to: "/tech/tpp-standards/trust-framework/certificates" }, {
                      default: withCtx(() => [
                        createTextVNode("certificate profiles")
                      ]),
                      _: 1
                    }),
                    createTextVNode(" every other participant uses. The token is bound to that transport certificate, so a token replayed from a different connection is rejected. The scope is the BioPay scope and nothing else; a BPIP client cannot obtain a token bearing any other. See "),
                    createVNode(_component_RouterLink, { to: "/biopay/directory" }, {
                      default: withCtx(() => [
                        createTextVNode("Directory")
                      ]),
                      _: 1
                    }),
                    createTextVNode(" for what the role entitles. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Tokens are reused across payments for their lifetime rather than fetched per payment — at an acceptance point the round trip matters, and there is nothing customer-specific in the token to invalidate it between customers. The initiator SHOULD refresh ahead of expiry rather than on a <code${_scopeId2}>401</code>, and MUST NOT treat a cached token as evidence that a registration is still live: that is what discovery is for. `);
                } else {
                  return [
                    createTextVNode(" Tokens are reused across payments for their lifetime rather than fetched per payment — at an acceptance point the round trip matters, and there is nothing customer-specific in the token to invalidate it between customers. The initiator SHOULD refresh ahead of expiry rather than on a "),
                    createVNode("code", null, "401"),
                    createTextVNode(", and MUST NOT treat a cached token as evidence that a registration is still live: that is what discovery is for. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "info",
              title: "Addressed per LFI"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p${_scopeId2}> The token endpoint is the LFI-scoped authorisation server (<code${_scopeId2}>auth1.{lfiCode}</code>), but the initiator does not compose that host itself. It resolves the token endpoint from the <code${_scopeId2}>DiscoveryEndpointUrl</code> the registration event delivered — the same way a Confirmation of Payee TPP does — and discovery returns that URL again on every call. A token taken from one LFI’s authorisation server is not valid at another’s, so an initiator serving customers across several LFIs holds a token per LFI. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" The token endpoint is the LFI-scoped authorisation server ("),
                      createVNode("code", null, "auth1.{lfiCode}"),
                      createTextVNode("), but the initiator does not compose that host itself. It resolves the token endpoint from the "),
                      createVNode("code", null, "DiscoveryEndpointUrl"),
                      createTextVNode(" the registration event delivered — the same way a Confirmation of Payee TPP does — and discovery returns that URL again on every call. A token taken from one LFI’s authorisation server is not valid at another’s, so an initiator serving customers across several LFIs holds a token per LFI. ")
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
                  createTextVNode(" The initiator obtains an access token under "),
                  createVNode("code", null, "client_credentials"),
                  createTextVNode(", using its BPIP client. There is no PAR, no authorisation request, no redirect and no refresh token: the customer’s authority was established once, at registration, and is held by the API Hub. Nothing about the token is tied to a particular customer or a particular payment — it authenticates the initiator, and the authority to debit comes from the registration the Hub already holds. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The request is made over mutual TLS with the transport certificate registered in the Directory, and authenticated with a client assertion signed by the signing certificate — the same "),
                  createVNode(_component_RouterLink, { to: "/tech/tpp-standards/trust-framework/certificates" }, {
                    default: withCtx(() => [
                      createTextVNode("certificate profiles")
                    ]),
                    _: 1
                  }),
                  createTextVNode(" every other participant uses. The token is bound to that transport certificate, so a token replayed from a different connection is rejected. The scope is the BioPay scope and nothing else; a BPIP client cannot obtain a token bearing any other. See "),
                  createVNode(_component_RouterLink, { to: "/biopay/directory" }, {
                    default: withCtx(() => [
                      createTextVNode("Directory")
                    ]),
                    _: 1
                  }),
                  createTextVNode(" for what the role entitles. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Tokens are reused across payments for their lifetime rather than fetched per payment — at an acceptance point the round trip matters, and there is nothing customer-specific in the token to invalidate it between customers. The initiator SHOULD refresh ahead of expiry rather than on a "),
                  createVNode("code", null, "401"),
                  createTextVNode(", and MUST NOT treat a cached token as evidence that a registration is still live: that is what discovery is for. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "info",
                title: "Addressed per LFI"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" The token endpoint is the LFI-scoped authorisation server ("),
                    createVNode("code", null, "auth1.{lfiCode}"),
                    createTextVNode("), but the initiator does not compose that host itself. It resolves the token endpoint from the "),
                    createVNode("code", null, "DiscoveryEndpointUrl"),
                    createTextVNode(" the registration event delivered — the same way a Confirmation of Payee TPP does — and discovery returns that URL again on every call. A token taken from one LFI’s authorisation server is not valid at another’s, so an initiator serving customers across several LFIs holds a token per LFI. ")
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
        id: "create",
        num: "03",
        color: "var(--at-teal)",
        eyebrow: "Create payment",
        title: "Create Payment",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The initiator <code${_scopeId2}>POST</code>s to <code${_scopeId2}>/biometric-payments</code>, addressed at the <code${_scopeId2}>ResourceServerUrl</code> the discovery response returned — never at a URL the initiator composed itself. Discovery MUST have been called first: it is what confirms the registration has not been suspended, revoked or had its default instrument changed since the registration event, and it is what names the <code${_scopeId2}>PaymentInstrument</code> this request must be shaped to. `);
                } else {
                  return [
                    createTextVNode(" The initiator "),
                    createVNode("code", null, "POST"),
                    createTextVNode("s to "),
                    createVNode("code", null, "/biometric-payments"),
                    createTextVNode(", addressed at the "),
                    createVNode("code", null, "ResourceServerUrl"),
                    createTextVNode(" the discovery response returned — never at a URL the initiator composed itself. Discovery MUST have been called first: it is what confirms the registration has not been suspended, revoked or had its default instrument changed since the registration event, and it is what names the "),
                    createVNode("code", null, "PaymentInstrument"),
                    createTextVNode(" this request must be shaped to. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<code${_scopeId2}>Data</code> carries the <code${_scopeId2}>IcpUserId</code>, the <code${_scopeId2}>PaymentInstrument</code>, the <code${_scopeId2}>Instruction</code> (identifiers, amount and any remittance information), the <code${_scopeId2}>Creditor</code> shaped to that instrument, and the <code${_scopeId2}>BiometricAssurance</code>. <code${_scopeId2}>Risk</code> carries the <code${_scopeId2}>PaymentContextCode</code> and the merchant and terminal context. There is no debtor account in the request: the Hub resolves it from the registration, and the initiator never learns it. `);
                } else {
                  return [
                    createVNode("code", null, "Data"),
                    createTextVNode(" carries the "),
                    createVNode("code", null, "IcpUserId"),
                    createTextVNode(", the "),
                    createVNode("code", null, "PaymentInstrument"),
                    createTextVNode(", the "),
                    createVNode("code", null, "Instruction"),
                    createTextVNode(" (identifiers, amount and any remittance information), the "),
                    createVNode("code", null, "Creditor"),
                    createTextVNode(" shaped to that instrument, and the "),
                    createVNode("code", null, "BiometricAssurance"),
                    createTextVNode(". "),
                    createVNode("code", null, "Risk"),
                    createTextVNode(" carries the "),
                    createVNode("code", null, "PaymentContextCode"),
                    createTextVNode(" and the merchant and terminal context. There is no debtor account in the request: the Hub resolves it from the registration, and the initiator never learns it. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<code${_scopeId2}>BiometricAssurance</code> is ICP’s assertion about the identification it performed — the match method, the time of the match, and ICP’s own transaction reference. It is the evidence set for non-repudiation and dispute handling. It carries no biometric, no template and no match score, and the boundary holds here: nothing that could reconstruct the identification crosses into Open Finance. `);
                } else {
                  return [
                    createVNode("code", null, "BiometricAssurance"),
                    createTextVNode(" is ICP’s assertion about the identification it performed — the match method, the time of the match, and ICP’s own transaction reference. It is the evidence set for non-repudiation and dispute handling. It carries no biometric, no template and no match score, and the boundary holds here: nothing that could reconstruct the identification crosses into Open Finance. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The request carries <code${_scopeId2}>x-idempotency-key</code>, a detached <code${_scopeId2}>x-jws-signature</code> over the body, and the usual <code${_scopeId2}>x-fapi-interaction-id</code> and <code${_scopeId2}>x-fapi-auth-date</code> — <code${_scopeId2}>x-fapi-auth-date</code> being the time of the biometric identification at ICP. The Hub validates entitlement, signature, schema and idempotency, resolves the LFI from the registration, and proxies to that LFI’s Ozone Connect. `);
                } else {
                  return [
                    createTextVNode(" The request carries "),
                    createVNode("code", null, "x-idempotency-key"),
                    createTextVNode(", a detached "),
                    createVNode("code", null, "x-jws-signature"),
                    createTextVNode(" over the body, and the usual "),
                    createVNode("code", null, "x-fapi-interaction-id"),
                    createTextVNode(" and "),
                    createVNode("code", null, "x-fapi-auth-date"),
                    createTextVNode(" — "),
                    createVNode("code", null, "x-fapi-auth-date"),
                    createTextVNode(" being the time of the biometric identification at ICP. The Hub validates entitlement, signature, schema and idempotency, resolves the LFI from the registration, and proxies to that LFI’s Ozone Connect. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCallout, { color: "var(--at-teal)" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p${_scopeId2}><strong${_scopeId2}>The response is always <code${_scopeId2}>201</code> with <code${_scopeId2}>Status: Pending</code>.</strong> It confirms the payment was created, not that money moved. Execution on the rail is asynchronous and the outcome arrives later, by the LFI’s patch. An acceptance point that treats <code${_scopeId2}>201</code> as settlement is reading it wrong; what it can safely tell the customer at that moment is that the payment has been accepted for execution. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createVNode("strong", null, [
                        createTextVNode("The response is always "),
                        createVNode("code", null, "201"),
                        createTextVNode(" with "),
                        createVNode("code", null, "Status: Pending"),
                        createTextVNode(".")
                      ]),
                      createTextVNode(" It confirms the payment was created, not that money moved. Execution on the rail is asynchronous and the outcome arrives later, by the LFI’s patch. An acceptance point that treats "),
                      createVNode("code", null, "201"),
                      createTextVNode(" as settlement is reading it wrong; what it can safely tell the customer at that moment is that the payment has been accepted for execution. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The idempotency key is what makes that <code${_scopeId2}>201</code> safe to lose. A replay of the same key with an identical body returns the original resource and the same <code${_scopeId2}>201</code>, not a second payment; the same key with a different body is rejected <code${_scopeId2}>409</code>. An initiator standing at a till with no response has two safe options — query by the key it generated, or retry with the same key. It MUST NOT retry with a fresh key, and MUST retain the key long enough to recover. `);
                } else {
                  return [
                    createTextVNode(" The idempotency key is what makes that "),
                    createVNode("code", null, "201"),
                    createTextVNode(" safe to lose. A replay of the same key with an identical body returns the original resource and the same "),
                    createVNode("code", null, "201"),
                    createTextVNode(", not a second payment; the same key with a different body is rejected "),
                    createVNode("code", null, "409"),
                    createTextVNode(". An initiator standing at a till with no response has two safe options — query by the key it generated, or retry with the same key. It MUST NOT retry with a fresh key, and MUST retain the key long enough to recover. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRelatedCards, {
              eyebrow: "Read alongside",
              title: "API Reference"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_EdRelatedCard, {
                    href: "/biopay/payment/api-reference/biometric-payments",
                    category: "API Reference",
                    "category-color": "var(--at-teal)",
                    title: "POST /biometric-payments",
                    desc: "Request, response and error schemas for payment initiation."
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_EdRelatedCard, {
                      href: "/biopay/payment/api-reference/biometric-payments",
                      category: "API Reference",
                      "category-color": "var(--at-teal)",
                      title: "POST /biometric-payments",
                      desc: "Request, response and error schemas for payment initiation."
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The initiator "),
                  createVNode("code", null, "POST"),
                  createTextVNode("s to "),
                  createVNode("code", null, "/biometric-payments"),
                  createTextVNode(", addressed at the "),
                  createVNode("code", null, "ResourceServerUrl"),
                  createTextVNode(" the discovery response returned — never at a URL the initiator composed itself. Discovery MUST have been called first: it is what confirms the registration has not been suspended, revoked or had its default instrument changed since the registration event, and it is what names the "),
                  createVNode("code", null, "PaymentInstrument"),
                  createTextVNode(" this request must be shaped to. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("code", null, "Data"),
                  createTextVNode(" carries the "),
                  createVNode("code", null, "IcpUserId"),
                  createTextVNode(", the "),
                  createVNode("code", null, "PaymentInstrument"),
                  createTextVNode(", the "),
                  createVNode("code", null, "Instruction"),
                  createTextVNode(" (identifiers, amount and any remittance information), the "),
                  createVNode("code", null, "Creditor"),
                  createTextVNode(" shaped to that instrument, and the "),
                  createVNode("code", null, "BiometricAssurance"),
                  createTextVNode(". "),
                  createVNode("code", null, "Risk"),
                  createTextVNode(" carries the "),
                  createVNode("code", null, "PaymentContextCode"),
                  createTextVNode(" and the merchant and terminal context. There is no debtor account in the request: the Hub resolves it from the registration, and the initiator never learns it. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("code", null, "BiometricAssurance"),
                  createTextVNode(" is ICP’s assertion about the identification it performed — the match method, the time of the match, and ICP’s own transaction reference. It is the evidence set for non-repudiation and dispute handling. It carries no biometric, no template and no match score, and the boundary holds here: nothing that could reconstruct the identification crosses into Open Finance. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The request carries "),
                  createVNode("code", null, "x-idempotency-key"),
                  createTextVNode(", a detached "),
                  createVNode("code", null, "x-jws-signature"),
                  createTextVNode(" over the body, and the usual "),
                  createVNode("code", null, "x-fapi-interaction-id"),
                  createTextVNode(" and "),
                  createVNode("code", null, "x-fapi-auth-date"),
                  createTextVNode(" — "),
                  createVNode("code", null, "x-fapi-auth-date"),
                  createTextVNode(" being the time of the biometric identification at ICP. The Hub validates entitlement, signature, schema and idempotency, resolves the LFI from the registration, and proxies to that LFI’s Ozone Connect. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCallout, { color: "var(--at-teal)" }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createVNode("strong", null, [
                      createTextVNode("The response is always "),
                      createVNode("code", null, "201"),
                      createTextVNode(" with "),
                      createVNode("code", null, "Status: Pending"),
                      createTextVNode(".")
                    ]),
                    createTextVNode(" It confirms the payment was created, not that money moved. Execution on the rail is asynchronous and the outcome arrives later, by the LFI’s patch. An acceptance point that treats "),
                    createVNode("code", null, "201"),
                    createTextVNode(" as settlement is reading it wrong; what it can safely tell the customer at that moment is that the payment has been accepted for execution. ")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The idempotency key is what makes that "),
                  createVNode("code", null, "201"),
                  createTextVNode(" safe to lose. A replay of the same key with an identical body returns the original resource and the same "),
                  createVNode("code", null, "201"),
                  createTextVNode(", not a second payment; the same key with a different body is rejected "),
                  createVNode("code", null, "409"),
                  createTextVNode(". An initiator standing at a till with no response has two safe options — query by the key it generated, or retry with the same key. It MUST NOT retry with a fresh key, and MUST retain the key long enough to recover. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdRelatedCards, {
                eyebrow: "Read alongside",
                title: "API Reference"
              }, {
                default: withCtx(() => [
                  createVNode(_component_EdRelatedCard, {
                    href: "/biopay/payment/api-reference/biometric-payments",
                    category: "API Reference",
                    "category-color": "var(--at-teal)",
                    title: "POST /biometric-payments",
                    desc: "Request, response and error schemas for payment initiation."
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "execution",
        num: "04",
        color: "var(--at-navy)",
        eyebrow: "LFI",
        title: "The LFI makes the payment"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The LFI receives the proxied request at its Ozone Connect `);
                  _push3(ssrRenderComponent(_component_RouterLink, { to: "/biopay/payment/api-reference/biometric-payments" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<code${_scopeId3}>POST /biometric-payments</code>`);
                      } else {
                        return [
                          createVNode("code", null, "POST /biometric-payments")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(` endpoint. It does not re-validate the registration or the initiator’s entitlement — the Hub has already done both, and the LFI trusts it for that, exactly as it does for token and consent validation elsewhere in Open Finance. What the LFI owns is execution: resolving the registered instrument to the funding account, running its own fraud, risk and balance checks, and deciding whether to debit. `);
                } else {
                  return [
                    createTextVNode(" The LFI receives the proxied request at its Ozone Connect "),
                    createVNode(_component_RouterLink, { to: "/biopay/payment/api-reference/biometric-payments" }, {
                      default: withCtx(() => [
                        createVNode("code", null, "POST /biometric-payments")
                      ]),
                      _: 1
                    }),
                    createTextVNode(" endpoint. It does not re-validate the registration or the initiator’s entitlement — the Hub has already done both, and the LFI trusts it for that, exactly as it does for token and consent validation elsewhere in Open Finance. What the LFI owns is execution: resolving the registered instrument to the funding account, running its own fraud, risk and balance checks, and deciding whether to debit. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The LFI is the final authority on the debit. A payment the Hub validated can still be refused here — insufficient funds, a risk decision, a limit — and that refusal is reported the same way a rail rejection is, by patching the payment to <code${_scopeId2}>Rejected</code> with a <code${_scopeId2}>StatusReason</code>. `);
                } else {
                  return [
                    createTextVNode(" The LFI is the final authority on the debit. A payment the Hub validated can still be refused here — insufficient funds, a risk decision, a limit — and that refusal is reported the same way a rail rejection is, by patching the payment to "),
                    createVNode("code", null, "Rejected"),
                    createTextVNode(" with a "),
                    createVNode("code", null, "StatusReason"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Execution runs on whichever rail the customer registered. The rail decides the shape of the creditor details the initiator sent, and it decides how long the outcome takes to arrive — which is why the payment is created <code${_scopeId2}>Pending</code> rather than the LFI holding the request open until the rail answers. `);
                } else {
                  return [
                    createTextVNode(" Execution runs on whichever rail the customer registered. The rail decides the shape of the creditor details the initiator sent, and it decides how long the outcome takes to arrive — which is why the payment is created "),
                    createVNode("code", null, "Pending"),
                    createTextVNode(" rather than the LFI holding the request open until the rail answers. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table${_scopeId2}><thead${_scopeId2}><tr${_scopeId2}><th${_scopeId2}>Instrument</th><th${_scopeId2}>Creditor schema</th><th${_scopeId2}>Creditor addressed by</th><th${_scopeId2}>Notes</th></tr></thead><tbody${_scopeId2}><!--[-->`);
                  ssrRenderList(rails, (r) => {
                    _push3(`<tr${_scopeId2}><td${_scopeId2}><strong${_scopeId2}><code${_scopeId2}>${ssrInterpolate(r.instrument)}</code></strong></td><td${_scopeId2}><code${_scopeId2}>${ssrInterpolate(r.creditor)}</code></td><td${_scopeId2}>${ssrInterpolate(r.addressed)}</td><td${_scopeId2}>${ssrInterpolate(r.note)}</td></tr>`);
                  });
                  _push3(`<!--]--></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Instrument"),
                          createVNode("th", null, "Creditor schema"),
                          createVNode("th", null, "Creditor addressed by"),
                          createVNode("th", null, "Notes")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        (openBlock(), createBlock(Fragment, null, renderList(rails, (r) => {
                          return createVNode("tr", {
                            key: r.instrument
                          }, [
                            createVNode("td", null, [
                              createVNode("strong", null, [
                                createVNode("code", null, toDisplayString(r.instrument), 1)
                              ])
                            ]),
                            createVNode("td", null, [
                              createVNode("code", null, toDisplayString(r.creditor), 1)
                            ]),
                            createVNode("td", null, toDisplayString(r.addressed), 1),
                            createVNode("td", null, toDisplayString(r.note), 1)
                          ]);
                        }), 64))
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
                  _push3(` The initiator integrates once against one initiation endpoint; each rail keeps its own message shape, and further rails are added by giving them a creditor schema rather than an endpoint of their own. `);
                } else {
                  return [
                    createTextVNode(" The initiator integrates once against one initiation endpoint; each rail keeps its own message shape, and further rails are added by giving them a creditor schema rather than an endpoint of their own. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The LFI receives the proxied request at its Ozone Connect "),
                  createVNode(_component_RouterLink, { to: "/biopay/payment/api-reference/biometric-payments" }, {
                    default: withCtx(() => [
                      createVNode("code", null, "POST /biometric-payments")
                    ]),
                    _: 1
                  }),
                  createTextVNode(" endpoint. It does not re-validate the registration or the initiator’s entitlement — the Hub has already done both, and the LFI trusts it for that, exactly as it does for token and consent validation elsewhere in Open Finance. What the LFI owns is execution: resolving the registered instrument to the funding account, running its own fraud, risk and balance checks, and deciding whether to debit. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The LFI is the final authority on the debit. A payment the Hub validated can still be refused here — insufficient funds, a risk decision, a limit — and that refusal is reported the same way a rail rejection is, by patching the payment to "),
                  createVNode("code", null, "Rejected"),
                  createTextVNode(" with a "),
                  createVNode("code", null, "StatusReason"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Execution runs on whichever rail the customer registered. The rail decides the shape of the creditor details the initiator sent, and it decides how long the outcome takes to arrive — which is why the payment is created "),
                  createVNode("code", null, "Pending"),
                  createTextVNode(" rather than the LFI holding the request open until the rail answers. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Instrument"),
                        createVNode("th", null, "Creditor schema"),
                        createVNode("th", null, "Creditor addressed by"),
                        createVNode("th", null, "Notes")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      (openBlock(), createBlock(Fragment, null, renderList(rails, (r) => {
                        return createVNode("tr", {
                          key: r.instrument
                        }, [
                          createVNode("td", null, [
                            createVNode("strong", null, [
                              createVNode("code", null, toDisplayString(r.instrument), 1)
                            ])
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, toDisplayString(r.creditor), 1)
                          ]),
                          createVNode("td", null, toDisplayString(r.addressed), 1),
                          createVNode("td", null, toDisplayString(r.note), 1)
                        ]);
                      }), 64))
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The initiator integrates once against one initiation endpoint; each rail keeps its own message shape, and further rails are added by giving them a creditor schema rather than an endpoint of their own. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "patch",
        num: "05",
        color: "var(--at-gold)",
        eyebrow: "LFI → API Hub",
        title: "Patching the Payment Status",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Once the LFI knows how the rail responded it patches the outcome to the API Hub, at <code${_scopeId2}>PATCH /biometrics-payment-log/{id}</code>. This is the only way a payment moves out of <code${_scopeId2}>Pending</code>: the Hub is the source of truth for payment state, and nothing the initiator calls can change it. An LFI that executes a payment but never patches leaves the initiator polling a payment that stays <code${_scopeId2}>Pending</code> forever. `);
                } else {
                  return [
                    createTextVNode(" Once the LFI knows how the rail responded it patches the outcome to the API Hub, at "),
                    createVNode("code", null, "PATCH /biometrics-payment-log/{id}"),
                    createTextVNode(". This is the only way a payment moves out of "),
                    createVNode("code", null, "Pending"),
                    createTextVNode(": the Hub is the source of truth for payment state, and nothing the initiator calls can change it. An LFI that executes a payment but never patches leaves the initiator polling a payment that stays "),
                    createVNode("code", null, "Pending"),
                    createTextVNode(" forever. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The body is small — the <code${_scopeId2}>Status</code>, optionally the <code${_scopeId2}>StatusUpdateDateTime</code> at which the LFI observed it, the <code${_scopeId2}>RailReference</code> recording how the payment was represented on the rail that executed it, and a <code${_scopeId2}>StatusReason</code> where the payment was rejected. The instruction, the creditor and the biometric assurance were fixed at creation and cannot be patched. The Hub answers <code${_scopeId2}>204</code>. `);
                } else {
                  return [
                    createTextVNode(" The body is small — the "),
                    createVNode("code", null, "Status"),
                    createTextVNode(", optionally the "),
                    createVNode("code", null, "StatusUpdateDateTime"),
                    createTextVNode(" at which the LFI observed it, the "),
                    createVNode("code", null, "RailReference"),
                    createTextVNode(" recording how the payment was represented on the rail that executed it, and a "),
                    createVNode("code", null, "StatusReason"),
                    createTextVNode(" where the payment was rejected. The instruction, the creditor and the biometric assurance were fixed at creation and cannot be patched. The Hub answers "),
                    createVNode("code", null, "204"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` One patch is the normal case — straight from <code${_scopeId2}>Pending</code> to <code${_scopeId2}>Accepted</code>, <code${_scopeId2}>AcceptedWithoutPosting</code> or <code${_scopeId2}>Rejected</code>. An LFI MAY patch more than once where the rail reports progress in stages, but MUST NOT patch a payment that has already reached a terminal status; the Hub answers <code${_scopeId2}>409</code>. `);
                } else {
                  return [
                    createTextVNode(" One patch is the normal case — straight from "),
                    createVNode("code", null, "Pending"),
                    createTextVNode(" to "),
                    createVNode("code", null, "Accepted"),
                    createTextVNode(", "),
                    createVNode("code", null, "AcceptedWithoutPosting"),
                    createTextVNode(" or "),
                    createVNode("code", null, "Rejected"),
                    createTextVNode(". An LFI MAY patch more than once where the rail reports progress in stages, but MUST NOT patch a payment that has already reached a terminal status; the Hub answers "),
                    createVNode("code", null, "409"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "info",
              title: "The same place the LFI already patches"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p${_scopeId2}> The operation is modelled on the published Consent Manager operation `);
                  _push3(ssrRenderComponent(_component_RouterLink, { to: "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/payment-log-id" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<code${_scopeId3}>PATCH /payment-log/{id}</code>`);
                      } else {
                        return [
                          createVNode("code", null, "PATCH /payment-log/{id}")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`, and is served at the same Consent Manager host (<code${_scopeId2}>cm.{lfiCode}</code>) rather than the <code${_scopeId2}>rs1.*</code> host the initiator-facing operations use. An LFI already integrated with Open Finance is therefore patching biometric payments the same way, and from the same place, as every other payment it executes. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" The operation is modelled on the published Consent Manager operation "),
                      createVNode(_component_RouterLink, { to: "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/payment-log-id" }, {
                        default: withCtx(() => [
                          createVNode("code", null, "PATCH /payment-log/{id}")
                        ]),
                        _: 1
                      }),
                      createTextVNode(", and is served at the same Consent Manager host ("),
                      createVNode("code", null, "cm.{lfiCode}"),
                      createTextVNode(") rather than the "),
                      createVNode("code", null, "rs1.*"),
                      createTextVNode(" host the initiator-facing operations use. An LFI already integrated with Open Finance is therefore patching biometric payments the same way, and from the same place, as every other payment it executes. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCallout, { color: "var(--at-gold)" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p${_scopeId2}><strong${_scopeId2}>The patch is what the initiator eventually sees.</strong> It is not bookkeeping. Recording the status, delivering the payment status event, and answering the initiator’s polling are all the same fact, written once here. The <code${_scopeId2}>204</code> means the Hub holds the new status — not that the initiator has received it; event delivery happens asynchronously and its outcome does not affect that response. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createVNode("strong", null, "The patch is what the initiator eventually sees."),
                      createTextVNode(" It is not bookkeeping. Recording the status, delivering the payment status event, and answering the initiator’s polling are all the same fact, written once here. The "),
                      createVNode("code", null, "204"),
                      createTextVNode(" means the Hub holds the new status — not that the initiator has received it; event delivery happens asynchronously and its outcome does not affect that response. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRelatedCards, {
              eyebrow: "Read alongside",
              title: "API Reference"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_EdRelatedCard, {
                    href: "/biopay/payment/api-reference/biometrics-payment-log",
                    category: "API Reference",
                    "category-color": "var(--at-gold)",
                    title: "PATCH /biometrics-payment-log",
                    desc: "Request body, status vocabulary and error responses for the LFI's payment log patch."
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_EdRelatedCard, {
                      href: "/biopay/payment/api-reference/biometrics-payment-log",
                      category: "API Reference",
                      "category-color": "var(--at-gold)",
                      title: "PATCH /biometrics-payment-log",
                      desc: "Request body, status vocabulary and error responses for the LFI's payment log patch."
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Once the LFI knows how the rail responded it patches the outcome to the API Hub, at "),
                  createVNode("code", null, "PATCH /biometrics-payment-log/{id}"),
                  createTextVNode(". This is the only way a payment moves out of "),
                  createVNode("code", null, "Pending"),
                  createTextVNode(": the Hub is the source of truth for payment state, and nothing the initiator calls can change it. An LFI that executes a payment but never patches leaves the initiator polling a payment that stays "),
                  createVNode("code", null, "Pending"),
                  createTextVNode(" forever. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The body is small — the "),
                  createVNode("code", null, "Status"),
                  createTextVNode(", optionally the "),
                  createVNode("code", null, "StatusUpdateDateTime"),
                  createTextVNode(" at which the LFI observed it, the "),
                  createVNode("code", null, "RailReference"),
                  createTextVNode(" recording how the payment was represented on the rail that executed it, and a "),
                  createVNode("code", null, "StatusReason"),
                  createTextVNode(" where the payment was rejected. The instruction, the creditor and the biometric assurance were fixed at creation and cannot be patched. The Hub answers "),
                  createVNode("code", null, "204"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" One patch is the normal case — straight from "),
                  createVNode("code", null, "Pending"),
                  createTextVNode(" to "),
                  createVNode("code", null, "Accepted"),
                  createTextVNode(", "),
                  createVNode("code", null, "AcceptedWithoutPosting"),
                  createTextVNode(" or "),
                  createVNode("code", null, "Rejected"),
                  createTextVNode(". An LFI MAY patch more than once where the rail reports progress in stages, but MUST NOT patch a payment that has already reached a terminal status; the Hub answers "),
                  createVNode("code", null, "409"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "info",
                title: "The same place the LFI already patches"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" The operation is modelled on the published Consent Manager operation "),
                    createVNode(_component_RouterLink, { to: "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/payment-log-id" }, {
                      default: withCtx(() => [
                        createVNode("code", null, "PATCH /payment-log/{id}")
                      ]),
                      _: 1
                    }),
                    createTextVNode(", and is served at the same Consent Manager host ("),
                    createVNode("code", null, "cm.{lfiCode}"),
                    createTextVNode(") rather than the "),
                    createVNode("code", null, "rs1.*"),
                    createTextVNode(" host the initiator-facing operations use. An LFI already integrated with Open Finance is therefore patching biometric payments the same way, and from the same place, as every other payment it executes. ")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdCallout, { color: "var(--at-gold)" }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createVNode("strong", null, "The patch is what the initiator eventually sees."),
                    createTextVNode(" It is not bookkeeping. Recording the status, delivering the payment status event, and answering the initiator’s polling are all the same fact, written once here. The "),
                    createVNode("code", null, "204"),
                    createTextVNode(" means the Hub holds the new status — not that the initiator has received it; event delivery happens asynchronously and its outcome does not affect that response. ")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdRelatedCards, {
                eyebrow: "Read alongside",
                title: "API Reference"
              }, {
                default: withCtx(() => [
                  createVNode(_component_EdRelatedCard, {
                    href: "/biopay/payment/api-reference/biometrics-payment-log",
                    category: "API Reference",
                    "category-color": "var(--at-gold)",
                    title: "PATCH /biometrics-payment-log",
                    desc: "Request body, status vocabulary and error responses for the LFI's payment log patch."
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "status",
        num: "06",
        color: "var(--at-blue-deep)",
        eyebrow: "API Hub → BPIP",
        title: "Event sent, and polling of payment status"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The status vocabulary is the published payments one, so BioPay does not introduce a second. Both routes below report the same four values, and both read the same record the LFI’s patch wrote. `);
                } else {
                  return [
                    createTextVNode(" The status vocabulary is the published payments one, so BioPay does not introduce a second. Both routes below report the same four values, and both read the same record the LFI’s patch wrote. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table${_scopeId2}><thead${_scopeId2}><tr${_scopeId2}><th${_scopeId2}>Status</th><th${_scopeId2}>Meaning</th><th${_scopeId2}>Terminal</th></tr></thead><tbody${_scopeId2}><!--[-->`);
                  ssrRenderList(statuses, (s) => {
                    _push3(`<tr${_scopeId2}><td${_scopeId2}><strong${_scopeId2}><code${_scopeId2}>${ssrInterpolate(s.value)}</code></strong></td><td${_scopeId2}>${ssrInterpolate(s.meaning)}</td><td${_scopeId2}>${ssrInterpolate(s.terminal)}</td></tr>`);
                  });
                  _push3(`<!--]--></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Status"),
                          createVNode("th", null, "Meaning"),
                          createVNode("th", null, "Terminal")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        (openBlock(), createBlock(Fragment, null, renderList(statuses, (s) => {
                          return createVNode("tr", {
                            key: s.value
                          }, [
                            createVNode("td", null, [
                              createVNode("strong", null, [
                                createVNode("code", null, toDisplayString(s.value), 1)
                              ])
                            ]),
                            createVNode("td", null, toDisplayString(s.meaning), 1),
                            createVNode("td", null, toDisplayString(s.terminal), 1)
                          ]);
                        }), 64))
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
                  _push3(`<strong${_scopeId2}>The event.</strong> On recording the patch, the Hub delivers a payment status event to the endpoint the initiator registered in the Directory. It is an ordinary Open Finance webhook — the same signed envelope and the same <code${_scopeId2}>Data</code> / <code${_scopeId2}>Meta</code> split as the registration event, signed by the Hub and then encrypted to the initiator’s encryption certificate, and delivered as a JWE. Respond <code${_scopeId2}>202</code> with an empty body first, then decrypt, verify the Hub’s signature on the inner JWS, and process asynchronously. The Hub retries on any non-2xx. See `);
                  _push3(ssrRenderComponent(_component_RouterLink, { to: "/tech/tpp-standards/security/fapi/receiving-events" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Receiving Event Notifications`);
                      } else {
                        return [
                          createTextVNode("Receiving Event Notifications")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(` for the full FAPI-aligned handling, and the `);
                  _push3(ssrRenderComponent(_component_RouterLink, { to: "/tech/tpp-standards/v2.1/webhooks/payment-status/api-guide" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Payment Status Webhook`);
                      } else {
                        return [
                          createTextVNode("Payment Status Webhook")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(` for the published event this one follows. `);
                } else {
                  return [
                    createVNode("strong", null, "The event."),
                    createTextVNode(" On recording the patch, the Hub delivers a payment status event to the endpoint the initiator registered in the Directory. It is an ordinary Open Finance webhook — the same signed envelope and the same "),
                    createVNode("code", null, "Data"),
                    createTextVNode(" / "),
                    createVNode("code", null, "Meta"),
                    createTextVNode(" split as the registration event, signed by the Hub and then encrypted to the initiator’s encryption certificate, and delivered as a JWE. Respond "),
                    createVNode("code", null, "202"),
                    createTextVNode(" with an empty body first, then decrypt, verify the Hub’s signature on the inner JWS, and process asynchronously. The Hub retries on any non-2xx. See "),
                    createVNode(_component_RouterLink, { to: "/tech/tpp-standards/security/fapi/receiving-events" }, {
                      default: withCtx(() => [
                        createTextVNode("Receiving Event Notifications")
                      ]),
                      _: 1
                    }),
                    createTextVNode(" for the full FAPI-aligned handling, and the "),
                    createVNode(_component_RouterLink, { to: "/tech/tpp-standards/v2.1/webhooks/payment-status/api-guide" }, {
                      default: withCtx(() => [
                        createTextVNode("Payment Status Webhook")
                      ]),
                      _: 1
                    }),
                    createTextVNode(" for the published event this one follows. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<strong${_scopeId2}>The polling.</strong> <code${_scopeId2}>GET /biometric-payments/{PaymentId}</code> returns the current state of the payment, serving the status the LFI last patched. An initiator MAY use it alone, or alongside the event as a backstop. It is the route an initiator without an encryption certificate has to rely on, since without one the Hub has no key to encrypt an event to. The separate <code${_scopeId2}>GET /biometric-payments?IdempotencyKey</code> query is for recovery, not for tracking: it answers whether a payment was created at all when the <code${_scopeId2}>201</code> was lost. `);
                } else {
                  return [
                    createVNode("strong", null, "The polling."),
                    createTextVNode(),
                    createVNode("code", null, "GET /biometric-payments/{PaymentId}"),
                    createTextVNode(" returns the current state of the payment, serving the status the LFI last patched. An initiator MAY use it alone, or alongside the event as a backstop. It is the route an initiator without an encryption certificate has to rely on, since without one the Hub has no key to encrypt an event to. The separate "),
                    createVNode("code", null, "GET /biometric-payments?IdempotencyKey"),
                    createTextVNode(" query is for recovery, not for tracking: it answers whether a payment was created at all when the "),
                    createVNode("code", null, "201"),
                    createTextVNode(" was lost. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCallout, { color: "var(--at-blue-deep)" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p${_scopeId2}><strong${_scopeId2}>What the till can say at each stage.</strong> On <code${_scopeId2}>201</code>: accepted, payment pending. On <code${_scopeId2}>AcceptedWithoutPosting</code> or <code${_scopeId2}>Accepted</code>: complete — the distinction is a settlement detail, not something the customer needs. On <code${_scopeId2}>Rejected</code>: not taken, fall back to another tender; the <code${_scopeId2}>StatusReason</code> is what tells the initiator whether another attempt is worth making. While <code${_scopeId2}>Pending</code>: nothing has failed, and the acceptance point decides from its own risk appetite whether to release goods before a terminal status arrives. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createVNode("strong", null, "What the till can say at each stage."),
                      createTextVNode(" On "),
                      createVNode("code", null, "201"),
                      createTextVNode(": accepted, payment pending. On "),
                      createVNode("code", null, "AcceptedWithoutPosting"),
                      createTextVNode(" or "),
                      createVNode("code", null, "Accepted"),
                      createTextVNode(": complete — the distinction is a settlement detail, not something the customer needs. On "),
                      createVNode("code", null, "Rejected"),
                      createTextVNode(": not taken, fall back to another tender; the "),
                      createVNode("code", null, "StatusReason"),
                      createTextVNode(" is what tells the initiator whether another attempt is worth making. While "),
                      createVNode("code", null, "Pending"),
                      createTextVNode(": nothing has failed, and the acceptance point decides from its own risk appetite whether to release goods before a terminal status arrives. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRelatedCards, {
              eyebrow: "Read alongside",
              title: "API Reference"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_EdRelatedCard, {
                    href: "/biopay/payment/api-reference/biometric-payments-payment-id",
                    category: "API Reference",
                    "category-color": "var(--at-blue-deep)",
                    title: "GET /biometric-payments/{PaymentId}",
                    desc: "Retrieving the current state of a payment."
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_EdRelatedCard, {
                    href: "/biopay/registration/api-reference/event-notification",
                    category: "API Reference",
                    "category-color": "var(--at-gold)",
                    title: "POST Event",
                    desc: "The registration event schema, whose envelope the payment status event shares."
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_EdRelatedCard, {
                      href: "/biopay/payment/api-reference/biometric-payments-payment-id",
                      category: "API Reference",
                      "category-color": "var(--at-blue-deep)",
                      title: "GET /biometric-payments/{PaymentId}",
                      desc: "Retrieving the current state of a payment."
                    }),
                    createVNode(_component_EdRelatedCard, {
                      href: "/biopay/registration/api-reference/event-notification",
                      category: "API Reference",
                      "category-color": "var(--at-gold)",
                      title: "POST Event",
                      desc: "The registration event schema, whose envelope the payment status event shares."
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The status vocabulary is the published payments one, so BioPay does not introduce a second. Both routes below report the same four values, and both read the same record the LFI’s patch wrote. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Status"),
                        createVNode("th", null, "Meaning"),
                        createVNode("th", null, "Terminal")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      (openBlock(), createBlock(Fragment, null, renderList(statuses, (s) => {
                        return createVNode("tr", {
                          key: s.value
                        }, [
                          createVNode("td", null, [
                            createVNode("strong", null, [
                              createVNode("code", null, toDisplayString(s.value), 1)
                            ])
                          ]),
                          createVNode("td", null, toDisplayString(s.meaning), 1),
                          createVNode("td", null, toDisplayString(s.terminal), 1)
                        ]);
                      }), 64))
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("strong", null, "The event."),
                  createTextVNode(" On recording the patch, the Hub delivers a payment status event to the endpoint the initiator registered in the Directory. It is an ordinary Open Finance webhook — the same signed envelope and the same "),
                  createVNode("code", null, "Data"),
                  createTextVNode(" / "),
                  createVNode("code", null, "Meta"),
                  createTextVNode(" split as the registration event, signed by the Hub and then encrypted to the initiator’s encryption certificate, and delivered as a JWE. Respond "),
                  createVNode("code", null, "202"),
                  createTextVNode(" with an empty body first, then decrypt, verify the Hub’s signature on the inner JWS, and process asynchronously. The Hub retries on any non-2xx. See "),
                  createVNode(_component_RouterLink, { to: "/tech/tpp-standards/security/fapi/receiving-events" }, {
                    default: withCtx(() => [
                      createTextVNode("Receiving Event Notifications")
                    ]),
                    _: 1
                  }),
                  createTextVNode(" for the full FAPI-aligned handling, and the "),
                  createVNode(_component_RouterLink, { to: "/tech/tpp-standards/v2.1/webhooks/payment-status/api-guide" }, {
                    default: withCtx(() => [
                      createTextVNode("Payment Status Webhook")
                    ]),
                    _: 1
                  }),
                  createTextVNode(" for the published event this one follows. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("strong", null, "The polling."),
                  createTextVNode(),
                  createVNode("code", null, "GET /biometric-payments/{PaymentId}"),
                  createTextVNode(" returns the current state of the payment, serving the status the LFI last patched. An initiator MAY use it alone, or alongside the event as a backstop. It is the route an initiator without an encryption certificate has to rely on, since without one the Hub has no key to encrypt an event to. The separate "),
                  createVNode("code", null, "GET /biometric-payments?IdempotencyKey"),
                  createTextVNode(" query is for recovery, not for tracking: it answers whether a payment was created at all when the "),
                  createVNode("code", null, "201"),
                  createTextVNode(" was lost. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCallout, { color: "var(--at-blue-deep)" }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createVNode("strong", null, "What the till can say at each stage."),
                    createTextVNode(" On "),
                    createVNode("code", null, "201"),
                    createTextVNode(": accepted, payment pending. On "),
                    createVNode("code", null, "AcceptedWithoutPosting"),
                    createTextVNode(" or "),
                    createVNode("code", null, "Accepted"),
                    createTextVNode(": complete — the distinction is a settlement detail, not something the customer needs. On "),
                    createVNode("code", null, "Rejected"),
                    createTextVNode(": not taken, fall back to another tender; the "),
                    createVNode("code", null, "StatusReason"),
                    createTextVNode(" is what tells the initiator whether another attempt is worth making. While "),
                    createVNode("code", null, "Pending"),
                    createTextVNode(": nothing has failed, and the acceptance point decides from its own risk appetite whether to release goods before a terminal status arrives. ")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdRelatedCards, {
                eyebrow: "Read alongside",
                title: "API Reference"
              }, {
                default: withCtx(() => [
                  createVNode(_component_EdRelatedCard, {
                    href: "/biopay/payment/api-reference/biometric-payments-payment-id",
                    category: "API Reference",
                    "category-color": "var(--at-blue-deep)",
                    title: "GET /biometric-payments/{PaymentId}",
                    desc: "Retrieving the current state of a payment."
                  }),
                  createVNode(_component_EdRelatedCard, {
                    href: "/biopay/registration/api-reference/event-notification",
                    category: "API Reference",
                    "category-color": "var(--at-gold)",
                    title: "POST Event",
                    desc: "The registration event schema, whose envelope the payment status event shares."
                  })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/biopay/payment/api-guide.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
