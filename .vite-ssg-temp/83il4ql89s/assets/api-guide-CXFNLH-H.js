import { _ as __unplugin_components_6$2, a as __unplugin_components_7 } from "./EdRelatedCards-D4uHHv56.js";
import { _ as __unplugin_components_6$1 } from "./EdBullets-gB3sPgIp.js";
import { _ as __unplugin_components_6 } from "./EdCallout-BllD3rO_.js";
import { _ as __unplugin_components_4 } from "./EdProse-D3vi_RS_.js";
import { _ as __unplugin_components_5$1 } from "./EdNote-61YjJPRT.js";
import { _ as __unplugin_components_5 } from "./APIFlowViewer-BRjrby73.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-DD63-Oxz.js";
import { _ as __unplugin_components_2 } from "./EdInPageNav-DkIq-w7S.js";
import { _ as __unplugin_components_0$1 } from "./EdHero-BRdU9xqH.js";
import { _ as __unplugin_components_0 } from "./EdBackStrip-CrlwbtLm.js";
import { defineComponent, resolveComponent, mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { useHead } from "@unhead/vue";
import { _ as _sfc_main$1 } from "./BpRegistrationFlow-C_6EJf7-.js";
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
    useHead({ title: "Registration — API Guide · BioPay" });
    const sections = [
      { id: "sequence", label: "Sequence Diagram" },
      { id: "lfi-to-hub", label: "Posting the registration" },
      { id: "event", label: "The registration event" },
      { id: "discovery", label: "Discovery" },
      { id: "open", label: "Open items" }
    ];
    const meta = [
      { label: "Status", value: "Draft" },
      { label: "Endpoints", value: "2 initiator-facing" },
      { label: "Version", value: "0.1" }
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
      const _component_EdBullets = __unplugin_components_6$1;
      const _component_EdRelatedCards = __unplugin_components_6$2;
      const _component_EdRelatedCard = __unplugin_components_7;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-page" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_EdBackStrip, {
        href: "/biopay/",
        text: "BioPay overview"
      }, null, _parent));
      _push(ssrRenderComponent(_component_EdHero, {
        eyebrow: "BioPay · Registration · Draft",
        "eyebrow-color": "var(--at-gold)",
        title: "Registration API Guide",
        meta,
        lede: "The API calls that follow a completed registration. Identity verification and instrument selection happen in the LFI’s own channel with no API involved — this guide starts once that is done: the LFI posts the registration to the API Hub, the Hub notifies the BPIP, and the BPIP queries discovery from then on."
      }, null, _parent));
      _push(ssrRenderComponent(_component_EdInPageNav, { sections }, null, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "sequence",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Sequence Diagram",
        title: "The registration flow end to end",
        tone: "surface",
        lede: "Click the diagram to expand it."
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_APIFlowViewer, {
              title: "BioPay — registration",
              eyebrow: "Registration flow"
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
                  _push3(`<p${_scopeId2}> The customer’s journey in the LFI channel — identity verification and instrument selection — is covered on `);
                  _push3(ssrRenderComponent(_component_RouterLink, { to: "/biopay/registration/user-experience" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`User Experience`);
                      } else {
                        return [
                          createTextVNode("User Experience")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`. Everything from the LFI’s call to the API Hub onwards is described below. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" The customer’s journey in the LFI channel — identity verification and instrument selection — is covered on "),
                      createVNode(_component_RouterLink, { to: "/biopay/registration/user-experience" }, {
                        default: withCtx(() => [
                          createTextVNode("User Experience")
                        ]),
                        _: 1
                      }),
                      createTextVNode(". Everything from the LFI’s call to the API Hub onwards is described below. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_APIFlowViewer, {
                title: "BioPay — registration",
                eyebrow: "Registration flow"
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
                    createTextVNode(" The customer’s journey in the LFI channel — identity verification and instrument selection — is covered on "),
                    createVNode(_component_RouterLink, { to: "/biopay/registration/user-experience" }, {
                      default: withCtx(() => [
                        createTextVNode("User Experience")
                      ]),
                      _: 1
                    }),
                    createTextVNode(". Everything from the LFI’s call to the API Hub onwards is described below. ")
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
        id: "lfi-to-hub",
        num: "02",
        color: "var(--at-blue-deep)",
        eyebrow: "LFI → API Hub",
        title: "Posting the completed registration"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The registration itself happens in the LFI’s own channel. Once the customer’s identity has been verified and they have chosen an instrument, the LFI posts the finished registration to the API Hub. That call is what brings the binding into Open Finance: before it, nothing outside the LFI knows the customer has a payment capability. `);
                } else {
                  return [
                    createTextVNode(" The registration itself happens in the LFI’s own channel. Once the customer’s identity has been verified and they have chosen an instrument, the LFI posts the finished registration to the API Hub. That call is what brings the binding into Open Finance: before it, nothing outside the LFI knows the customer has a payment capability. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The LFI calls with its own LFI-role client over mutual TLS with application-layer authentication, under <code${_scopeId2}>client_credentials</code>. It sends the ICP user identifier, the instrument or instruments the customer selected and which of them is the default. The Hub stores that against the LFI and returns a <code${_scopeId2}>RegistrationId</code>. It holds no biometric, no template, no account number and no card number — only the identifier, the LFI that holds the customer, and what may be spent from. `);
                } else {
                  return [
                    createTextVNode(" The LFI calls with its own LFI-role client over mutual TLS with application-layer authentication, under "),
                    createVNode("code", null, "client_credentials"),
                    createTextVNode(". It sends the ICP user identifier, the instrument or instruments the customer selected and which of them is the default. The Hub stores that against the LFI and returns a "),
                    createVNode("code", null, "RegistrationId"),
                    createTextVNode(". It holds no biometric, no template, no account number and no card number — only the identifier, the LFI that holds the customer, and what may be spent from. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The same call is how a registration changes later: a new default instrument, a suspension or a withdrawal is posted by the LFI, and each becomes a further event to the BPIP. `);
                } else {
                  return [
                    createTextVNode(" The same call is how a registration changes later: a new default instrument, a suspension or a withdrawal is posted by the LFI, and each becomes a further event to the BPIP. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "info",
              title: "Not in the API Reference"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p${_scopeId2}> This call runs LFI → API Hub, so it sits outside the initiator-facing API Reference. It is documented here and on `);
                  _push3(ssrRenderComponent(_component_RouterLink, { to: "/biopay/technical-architecture" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Technical Architecture`);
                      } else {
                        return [
                          createTextVNode("Technical Architecture")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" This call runs LFI → API Hub, so it sits outside the initiator-facing API Reference. It is documented here and on "),
                      createVNode(_component_RouterLink, { to: "/biopay/technical-architecture" }, {
                        default: withCtx(() => [
                          createTextVNode("Technical Architecture")
                        ]),
                        _: 1
                      }),
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
                  createTextVNode(" The registration itself happens in the LFI’s own channel. Once the customer’s identity has been verified and they have chosen an instrument, the LFI posts the finished registration to the API Hub. That call is what brings the binding into Open Finance: before it, nothing outside the LFI knows the customer has a payment capability. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The LFI calls with its own LFI-role client over mutual TLS with application-layer authentication, under "),
                  createVNode("code", null, "client_credentials"),
                  createTextVNode(". It sends the ICP user identifier, the instrument or instruments the customer selected and which of them is the default. The Hub stores that against the LFI and returns a "),
                  createVNode("code", null, "RegistrationId"),
                  createTextVNode(". It holds no biometric, no template, no account number and no card number — only the identifier, the LFI that holds the customer, and what may be spent from. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The same call is how a registration changes later: a new default instrument, a suspension or a withdrawal is posted by the LFI, and each becomes a further event to the BPIP. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "info",
                title: "Not in the API Reference"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" This call runs LFI → API Hub, so it sits outside the initiator-facing API Reference. It is documented here and on "),
                    createVNode(_component_RouterLink, { to: "/biopay/technical-architecture" }, {
                      default: withCtx(() => [
                        createTextVNode("Technical Architecture")
                      ]),
                      _: 1
                    }),
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
        id: "event",
        num: "03",
        color: "var(--at-gold)",
        eyebrow: "API Hub → BPIP",
        title: "The registration event",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Once the Hub has stored the registration it notifies the BPIP at the event endpoint the BPIP registered in the Directory. This is how the BPIP learns that an identity it can recognise now has a payment capability, and where to address that identity’s later calls. The BPIP implements this endpoint; every other operation in this guide runs the other way. `);
                } else {
                  return [
                    createTextVNode(" Once the Hub has stored the registration it notifies the BPIP at the event endpoint the BPIP registered in the Directory. This is how the BPIP learns that an identity it can recognise now has a payment capability, and where to address that identity’s later calls. The BPIP implements this endpoint; every other operation in this guide runs the other way. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` It is an ordinary Open Finance webhook rather than a BioPay-specific notification: the same signed envelope and the same <code${_scopeId2}>Data</code> / <code${_scopeId2}>Meta</code> split as the payment status and consent status events. <code${_scopeId2}>Meta</code> carries the <code${_scopeId2}>EventType</code> — <code${_scopeId2}>Resource.Created</code>, <code${_scopeId2}>Resource.Updated</code> or <code${_scopeId2}>Resource.Deleted</code> — with the <code${_scopeId2}>RegistrationId</code> and <code${_scopeId2}>EventDateTime</code>. <code${_scopeId2}>Data</code> is the registration as it now stands, in the same shape discovery returns it, so a suspension is an update carrying the new <code${_scopeId2}>RegistrationStatus</code> rather than an event type of its own. `);
                } else {
                  return [
                    createTextVNode(" It is an ordinary Open Finance webhook rather than a BioPay-specific notification: the same signed envelope and the same "),
                    createVNode("code", null, "Data"),
                    createTextVNode(" / "),
                    createVNode("code", null, "Meta"),
                    createTextVNode(" split as the payment status and consent status events. "),
                    createVNode("code", null, "Meta"),
                    createTextVNode(" carries the "),
                    createVNode("code", null, "EventType"),
                    createTextVNode(" — "),
                    createVNode("code", null, "Resource.Created"),
                    createTextVNode(", "),
                    createVNode("code", null, "Resource.Updated"),
                    createTextVNode(" or "),
                    createVNode("code", null, "Resource.Deleted"),
                    createTextVNode(" — with the "),
                    createVNode("code", null, "RegistrationId"),
                    createTextVNode(" and "),
                    createVNode("code", null, "EventDateTime"),
                    createTextVNode(". "),
                    createVNode("code", null, "Data"),
                    createTextVNode(" is the registration as it now stands, in the same shape discovery returns it, so a suspension is an update carrying the new "),
                    createVNode("code", null, "RegistrationStatus"),
                    createTextVNode(" rather than an event type of its own. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "info",
              title: "Delivered as a JWE"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p${_scopeId2}> The event is signed by the API Hub and then encrypted to the BPIP’s encryption certificate registered in the Trust Framework, and delivered as a JWE compact serialisation with the Content Type <code${_scopeId2}>application/jwe</code> — exactly as the published webhooks are. Respond <code${_scopeId2}>202</code> with an empty body first, then decode the JWE header to select the right private key by <code${_scopeId2}>kid</code>, decrypt, and verify the Hub’s signature on the inner JWS before acting on the contents. The Hub retries on any non-2xx. See `);
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
                  _push3(` for the full FAPI-aligned handling; the <code${_scopeId2}>application/json</code> schema in the API Reference is the payload you get after decryption, not what arrives on the wire. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" The event is signed by the API Hub and then encrypted to the BPIP’s encryption certificate registered in the Trust Framework, and delivered as a JWE compact serialisation with the Content Type "),
                      createVNode("code", null, "application/jwe"),
                      createTextVNode(" — exactly as the published webhooks are. Respond "),
                      createVNode("code", null, "202"),
                      createTextVNode(" with an empty body first, then decode the JWE header to select the right private key by "),
                      createVNode("code", null, "kid"),
                      createTextVNode(", decrypt, and verify the Hub’s signature on the inner JWS before acting on the contents. The Hub retries on any non-2xx. See "),
                      createVNode(_component_RouterLink, { to: "/tech/tpp-standards/security/fapi/receiving-events" }, {
                        default: withCtx(() => [
                          createTextVNode("Receiving Event Notifications")
                        ]),
                        _: 1
                      }),
                      createTextVNode(" for the full FAPI-aligned handling; the "),
                      createVNode("code", null, "application/json"),
                      createTextVNode(" schema in the API Reference is the payload you get after decryption, not what arrives on the wire. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCallout, { color: "var(--at-gold)" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p${_scopeId2}><strong${_scopeId2}>The event carries the routing.</strong> Token, discovery and payment endpoints are all addressed per LFI, and the event’s <code${_scopeId2}>Data</code> is where the BPIP gets them — <code${_scopeId2}>DiscoveryEndpointUrl</code> and <code${_scopeId2}>ResourceServerUrl</code>, rather than an <code${_scopeId2}>lfiCode</code> to compose hosts from. A BPIP that loses this event loses the ability to transact for that customer until it reconciles, so event delivery is not a convenience here — it is part of the integration. Discovery returns the same <code${_scopeId2}>Data</code> again on every call, so the routing is re-confirmed rather than cached indefinitely. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createVNode("strong", null, "The event carries the routing."),
                      createTextVNode(" Token, discovery and payment endpoints are all addressed per LFI, and the event’s "),
                      createVNode("code", null, "Data"),
                      createTextVNode(" is where the BPIP gets them — "),
                      createVNode("code", null, "DiscoveryEndpointUrl"),
                      createTextVNode(" and "),
                      createVNode("code", null, "ResourceServerUrl"),
                      createTextVNode(", rather than an "),
                      createVNode("code", null, "lfiCode"),
                      createTextVNode(" to compose hosts from. A BPIP that loses this event loses the ability to transact for that customer until it reconciles, so event delivery is not a convenience here — it is part of the integration. Discovery returns the same "),
                      createVNode("code", null, "Data"),
                      createTextVNode(" again on every call, so the routing is re-confirmed rather than cached indefinitely. ")
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
                  createTextVNode(" Once the Hub has stored the registration it notifies the BPIP at the event endpoint the BPIP registered in the Directory. This is how the BPIP learns that an identity it can recognise now has a payment capability, and where to address that identity’s later calls. The BPIP implements this endpoint; every other operation in this guide runs the other way. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" It is an ordinary Open Finance webhook rather than a BioPay-specific notification: the same signed envelope and the same "),
                  createVNode("code", null, "Data"),
                  createTextVNode(" / "),
                  createVNode("code", null, "Meta"),
                  createTextVNode(" split as the payment status and consent status events. "),
                  createVNode("code", null, "Meta"),
                  createTextVNode(" carries the "),
                  createVNode("code", null, "EventType"),
                  createTextVNode(" — "),
                  createVNode("code", null, "Resource.Created"),
                  createTextVNode(", "),
                  createVNode("code", null, "Resource.Updated"),
                  createTextVNode(" or "),
                  createVNode("code", null, "Resource.Deleted"),
                  createTextVNode(" — with the "),
                  createVNode("code", null, "RegistrationId"),
                  createTextVNode(" and "),
                  createVNode("code", null, "EventDateTime"),
                  createTextVNode(". "),
                  createVNode("code", null, "Data"),
                  createTextVNode(" is the registration as it now stands, in the same shape discovery returns it, so a suspension is an update carrying the new "),
                  createVNode("code", null, "RegistrationStatus"),
                  createTextVNode(" rather than an event type of its own. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "info",
                title: "Delivered as a JWE"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" The event is signed by the API Hub and then encrypted to the BPIP’s encryption certificate registered in the Trust Framework, and delivered as a JWE compact serialisation with the Content Type "),
                    createVNode("code", null, "application/jwe"),
                    createTextVNode(" — exactly as the published webhooks are. Respond "),
                    createVNode("code", null, "202"),
                    createTextVNode(" with an empty body first, then decode the JWE header to select the right private key by "),
                    createVNode("code", null, "kid"),
                    createTextVNode(", decrypt, and verify the Hub’s signature on the inner JWS before acting on the contents. The Hub retries on any non-2xx. See "),
                    createVNode(_component_RouterLink, { to: "/tech/tpp-standards/security/fapi/receiving-events" }, {
                      default: withCtx(() => [
                        createTextVNode("Receiving Event Notifications")
                      ]),
                      _: 1
                    }),
                    createTextVNode(" for the full FAPI-aligned handling; the "),
                    createVNode("code", null, "application/json"),
                    createTextVNode(" schema in the API Reference is the payload you get after decryption, not what arrives on the wire. ")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdCallout, { color: "var(--at-gold)" }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createVNode("strong", null, "The event carries the routing."),
                    createTextVNode(" Token, discovery and payment endpoints are all addressed per LFI, and the event’s "),
                    createVNode("code", null, "Data"),
                    createTextVNode(" is where the BPIP gets them — "),
                    createVNode("code", null, "DiscoveryEndpointUrl"),
                    createTextVNode(" and "),
                    createVNode("code", null, "ResourceServerUrl"),
                    createTextVNode(", rather than an "),
                    createVNode("code", null, "lfiCode"),
                    createTextVNode(" to compose hosts from. A BPIP that loses this event loses the ability to transact for that customer until it reconciles, so event delivery is not a convenience here — it is part of the integration. Discovery returns the same "),
                    createVNode("code", null, "Data"),
                    createTextVNode(" again on every call, so the routing is re-confirmed rather than cached indefinitely. ")
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
        id: "discovery",
        num: "04",
        color: "var(--at-navy)",
        eyebrow: "BPIP → API Hub",
        title: "Discovery"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Discovery resolves an ICP user identifier to the registration the Hub holds for it: whether it is live, which instruments the customer selected and which is the default, and the endpoints at which the BPIP obtains a token for — and then calls — the LFI holding it. The Hub answers from its own registration store; this call is not proxied to the LFI. `);
                } else {
                  return [
                    createTextVNode(" Discovery resolves an ICP user identifier to the registration the Hub holds for it: whether it is live, which instruments the customer selected and which is the default, and the endpoints at which the BPIP obtains a token for — and then calls — the LFI holding it. The Hub answers from its own registration store; this call is not proxied to the LFI. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The BPIP calls it before every payment, even though it already holds the same <code${_scopeId2}>Data</code> from the registration event, because a registration may have been suspended, revoked or had its default instrument changed since. The payment is then addressed at the <code${_scopeId2}>ResourceServerUrl</code> discovery returned, never at a URL the BPIP composed itself. `);
                } else {
                  return [
                    createTextVNode(" The BPIP calls it before every payment, even though it already holds the same "),
                    createVNode("code", null, "Data"),
                    createTextVNode(" from the registration event, because a registration may have been suspended, revoked or had its default instrument changed since. The payment is then addressed at the "),
                    createVNode("code", null, "ResourceServerUrl"),
                    createTextVNode(" discovery returned, never at a URL the BPIP composed itself. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` It follows the published Confirmation of Payee <code${_scopeId2}>/discovery</code> pattern, so BioPay introduces no second discovery mechanism. Request and response are both signed JWTs sent as <code${_scopeId2}>application/jwt</code> — the signature <em${_scopeId2}>is</em> the body, so this operation carries no detached <code${_scopeId2}>x-jws-signature</code> header. The request’s <code${_scopeId2}>message</code> holds the identifier to resolve; the response’s holds the resolved registration. Signing the request is also what lets the identifier travel in a body rather than a query string, keeping it out of access and proxy logs — which is why this is a <code${_scopeId2}>POST</code>. `);
                } else {
                  return [
                    createTextVNode(" It follows the published Confirmation of Payee "),
                    createVNode("code", null, "/discovery"),
                    createTextVNode(" pattern, so BioPay introduces no second discovery mechanism. Request and response are both signed JWTs sent as "),
                    createVNode("code", null, "application/jwt"),
                    createTextVNode(" — the signature "),
                    createVNode("em", null, "is"),
                    createTextVNode(" the body, so this operation carries no detached "),
                    createVNode("code", null, "x-jws-signature"),
                    createTextVNode(" header. The request’s "),
                    createVNode("code", null, "message"),
                    createTextVNode(" holds the identifier to resolve; the response’s holds the resolved registration. Signing the request is also what lets the identifier travel in a body rather than a query string, keeping it out of access and proxy logs — which is why this is a "),
                    createVNode("code", null, "POST"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` An identifier with no registration is not an error: the Hub answers <code${_scopeId2}>200</code> with a <code${_scopeId2}>RegistrationStatus</code> of <code${_scopeId2}>NotRegistered</code> and the routing fields absent. A request whose JWT cannot be verified is rejected with the <code${_scopeId2}>JWS.*</code> error codes the Confirmation of Payee standard already defines. `);
                } else {
                  return [
                    createTextVNode(" An identifier with no registration is not an error: the Hub answers "),
                    createVNode("code", null, "200"),
                    createTextVNode(" with a "),
                    createVNode("code", null, "RegistrationStatus"),
                    createTextVNode(" of "),
                    createVNode("code", null, "NotRegistered"),
                    createTextVNode(" and the routing fields absent. A request whose JWT cannot be verified is rejected with the "),
                    createVNode("code", null, "JWS.*"),
                    createTextVNode(" error codes the Confirmation of Payee standard already defines. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Discovery resolves an ICP user identifier to the registration the Hub holds for it: whether it is live, which instruments the customer selected and which is the default, and the endpoints at which the BPIP obtains a token for — and then calls — the LFI holding it. The Hub answers from its own registration store; this call is not proxied to the LFI. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The BPIP calls it before every payment, even though it already holds the same "),
                  createVNode("code", null, "Data"),
                  createTextVNode(" from the registration event, because a registration may have been suspended, revoked or had its default instrument changed since. The payment is then addressed at the "),
                  createVNode("code", null, "ResourceServerUrl"),
                  createTextVNode(" discovery returned, never at a URL the BPIP composed itself. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" It follows the published Confirmation of Payee "),
                  createVNode("code", null, "/discovery"),
                  createTextVNode(" pattern, so BioPay introduces no second discovery mechanism. Request and response are both signed JWTs sent as "),
                  createVNode("code", null, "application/jwt"),
                  createTextVNode(" — the signature "),
                  createVNode("em", null, "is"),
                  createTextVNode(" the body, so this operation carries no detached "),
                  createVNode("code", null, "x-jws-signature"),
                  createTextVNode(" header. The request’s "),
                  createVNode("code", null, "message"),
                  createTextVNode(" holds the identifier to resolve; the response’s holds the resolved registration. Signing the request is also what lets the identifier travel in a body rather than a query string, keeping it out of access and proxy logs — which is why this is a "),
                  createVNode("code", null, "POST"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" An identifier with no registration is not an error: the Hub answers "),
                  createVNode("code", null, "200"),
                  createTextVNode(" with a "),
                  createVNode("code", null, "RegistrationStatus"),
                  createTextVNode(" of "),
                  createVNode("code", null, "NotRegistered"),
                  createTextVNode(" and the routing fields absent. A request whose JWT cannot be verified is rejected with the "),
                  createVNode("code", null, "JWS.*"),
                  createTextVNode(" error codes the Confirmation of Payee standard already defines. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "open",
        num: "05",
        color: "var(--at-gold)",
        eyebrow: "Open items",
        title: "What this page does not yet answer",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdBullets, { accent: "var(--at-gold)" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li${_scopeId2}><strong${_scopeId2}>There is nowhere for a BPIP to subscribe to webhooks.</strong> Elsewhere in Open Finance a TPP opts in per consent — the payment status event is requested with <code${_scopeId2}>subscription.Webhook.IsActive</code> on the consent itself. BioPay has no consent, so the registration event has no subscription to hang off: the Hub delivers to the endpoint the BPIP registered in the Directory, or it delivers nowhere. That leaves the question of whether every BPIP must therefore be required to implement and correctly handle webhooks as a condition of holding the role, or whether some opt-in and a non-event way to learn of a registration are needed instead. </li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "There is nowhere for a BPIP to subscribe to webhooks."),
                      createTextVNode(" Elsewhere in Open Finance a TPP opts in per consent — the payment status event is requested with "),
                      createVNode("code", null, "subscription.Webhook.IsActive"),
                      createTextVNode(" on the consent itself. BioPay has no consent, so the registration event has no subscription to hang off: the Hub delivers to the endpoint the BPIP registered in the Directory, or it delivers nowhere. That leaves the question of whether every BPIP must therefore be required to implement and correctly handle webhooks as a condition of holding the role, or whether some opt-in and a non-event way to learn of a registration are needed instead. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdBullets, { accent: "var(--at-gold)" }, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "There is nowhere for a BPIP to subscribe to webhooks."),
                    createTextVNode(" Elsewhere in Open Finance a TPP opts in per consent — the payment status event is requested with "),
                    createVNode("code", null, "subscription.Webhook.IsActive"),
                    createTextVNode(" on the consent itself. BioPay has no consent, so the registration event has no subscription to hang off: the Hub delivers to the endpoint the BPIP registered in the Directory, or it delivers nowhere. That leaves the question of whether every BPIP must therefore be required to implement and correctly handle webhooks as a condition of holding the role, or whether some opt-in and a non-event way to learn of a registration are needed instead. ")
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdRelatedCards, {
        eyebrow: "Schemas",
        "eyebrow-color": "var(--at-gold)",
        title: "API Reference"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdRelatedCard, {
              href: "/biopay/registration/api-reference/biometric-payments-discovery",
              category: "API Reference",
              "category-color": "var(--at-navy)",
              title: "POST /biometric-payments-discovery",
              desc: "Signed request, signed response and error schemas for the discovery endpoint."
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRelatedCard, {
              href: "/biopay/registration/api-reference/event-notification",
              category: "API Reference",
              "category-color": "var(--at-gold)",
              title: "POST Event",
              desc: "The registration event schema the BPIP implements."
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRelatedCard, {
              href: "/tech/tpp-standards/v2.1/webhooks/payment-status/api-guide",
              category: "Open Finance",
              "category-color": "var(--at-blue-deep)",
              title: "Payment Status Webhook",
              desc: "The published webhook whose envelope, Data and Meta structure this event follows."
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdRelatedCard, {
                href: "/biopay/registration/api-reference/biometric-payments-discovery",
                category: "API Reference",
                "category-color": "var(--at-navy)",
                title: "POST /biometric-payments-discovery",
                desc: "Signed request, signed response and error schemas for the discovery endpoint."
              }),
              createVNode(_component_EdRelatedCard, {
                href: "/biopay/registration/api-reference/event-notification",
                category: "API Reference",
                "category-color": "var(--at-gold)",
                title: "POST Event",
                desc: "The registration event schema the BPIP implements."
              }),
              createVNode(_component_EdRelatedCard, {
                href: "/tech/tpp-standards/v2.1/webhooks/payment-status/api-guide",
                category: "Open Finance",
                "category-color": "var(--at-blue-deep)",
                title: "Payment Status Webhook",
                desc: "The published webhook whose envelope, Data and Meta structure this event follows."
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/biopay/registration/api-guide.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
