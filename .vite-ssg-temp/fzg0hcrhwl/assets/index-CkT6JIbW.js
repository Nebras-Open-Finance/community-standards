import { _ as __unplugin_components_7$1 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_7, a as __unplugin_components_8 } from "./EdStages-NkJQJXq7.js";
import { I as ImageViewer } from "./ImageViewer-DmHTopUf.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { defineComponent, mergeProps, withCtx, createTextVNode, createVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrRenderClass, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const states = [
      {
        id: "awaitingauthorization",
        name: "AwaitingAuthorization",
        kind: "transient",
        intro: `The initial state for all consents. The TPP has submitted a Rich Authorization
            Request (RAR) via <code>/par</code> and is waiting for the user to authenticate
            with the LFI and authorise the consent.`,
        detail: `If the LFI requires multiple authorizers (e.g. joint account), the consent
             remains in <code>AwaitingAuthorization</code> until all required parties have
             authorized.`
      },
      {
        id: "authorized",
        name: "Authorized",
        kind: "transient",
        intro: `The consent has been fully authorized and is active. The TPP may make resource
            requests referencing this consent.`,
        detail: `The consent leaves <code>Authorized</code> when one of the following occurs:`,
        bullets: [
          "Fully used (Service Initiation only) → <code>Consumed</code>",
          "<code>ExpirationDateTime</code> reached → <code>Expired</code>",
          "User revokes it → <code>Revoked</code>",
          "LFI temporarily blocks it → <code>Suspended</code>"
        ]
      },
      {
        id: "rejected",
        name: "Rejected",
        kind: "terminal",
        intro: `The consent moves from <code>AwaitingAuthorization</code> to <code>Rejected</code> when:`,
        bullets: [
          `The user declines at the LFI's authorization screen, or`,
          "The LFI rejects the consent during processing"
        ],
        detail: `<strong>Terminal state.</strong> The TPP must submit a new <code>/par</code>
             request with a fresh <code>ConsentId</code> to restart the flow.`
      },
      {
        id: "suspended",
        name: "Suspended",
        kind: "recoverable",
        intro: `The LFI moves the consent from <code>Authorized</code> to <code>Suspended</code>
            when it temporarily blocks access — for example, if the user's Emirates ID has
            expired and must be renewed before access can be restored.`,
        detail: `Once the block is cleared, the LFI must return the consent to
             <code>Authorized</code>. <strong>Not a terminal state.</strong>`
      },
      {
        id: "consumed",
        name: "Consumed",
        kind: "terminal",
        intro: `The consent moves from <code>Authorized</code> to <code>Consumed</code> when the
            action it covers has been fully used.`,
        detail: `<strong>Terminal state.</strong> Applies <strong>only to Service Initiation
             consents</strong> — a Data Sharing consent can never move to
             <code>Consumed</code> under any circumstances.`
      },
      {
        id: "expired",
        name: "Expired",
        kind: "terminal",
        intro: `The consent moves from <code>Authorized</code> or <code>Suspended</code> to
            <code>Expired</code> when it reaches its <code>ExpirationDateTime</code>.`,
        detail: `<strong>Terminal state.</strong> The TPP must prompt the user to re-consent and
             begin a new authorization flow with a new <code>ConsentId</code>.`
      },
      {
        id: "revoked",
        name: "Revoked",
        kind: "terminal",
        intro: `The consent moves from <code>Authorized</code> or <code>Suspended</code> to
            <code>Revoked</code> when the user explicitly revokes it — either through the
            TPP's consent management interface or directly at the LFI.`,
        detail: `<strong>Terminal state.</strong>`
      }
    ];
    function pillLabel(kind) {
      if (kind === "terminal") return "Terminal";
      if (kind === "recoverable") return "Recoverable";
      return "In flight";
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdRefTable = __unplugin_components_12;
      const _component_ImageViewer = ImageViewer;
      const _component_EdStages = __unplugin_components_7;
      const _component_EdStage = __unplugin_components_8;
      const _component_EdNote = __unplugin_components_7$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-35e95a64><section class="ed-doc__hero" data-v-35e95a64><div class="ed-doc__inner" data-v-35e95a64><div class="ed-doc__eyebrow" data-v-35e95a64><span class="ed-doc__eyebrow-dash" data-v-35e95a64></span> TPP Standards · v2.1 · Consent </div><h1 class="ed-doc__title" data-v-35e95a64> Consent <span class="ed-doc__read" data-v-35e95a64>4 min read</span></h1><p class="ed-doc__lede" data-v-35e95a64> A <strong data-v-35e95a64>Consent</strong> is an authorisation object that represents a user&#39;s explicit permission for a TPP to access their data or initiate services at an LFI. Every protected resource request in UAE Open Finance is bound to a consent — there is no access without one. </p></div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "consent-types",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Two flavours",
        title: "Consent types",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` There are two types of consent, corresponding to the two service families. `);
                } else {
                  return [
                    createTextVNode(" There are two types of consent, corresponding to the two service families. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-35e95a64${_scopeId2}><thead data-v-35e95a64${_scopeId2}><tr data-v-35e95a64${_scopeId2}><th data-v-35e95a64${_scopeId2}>Type</th><th data-v-35e95a64${_scopeId2}>Used for</th><th data-v-35e95a64${_scopeId2}>Created via</th></tr></thead><tbody data-v-35e95a64${_scopeId2}><tr data-v-35e95a64${_scopeId2}><td data-v-35e95a64${_scopeId2}><strong data-v-35e95a64${_scopeId2}>Bank Data Sharing</strong></td><td data-v-35e95a64${_scopeId2}>Reading account data, balances, transactions, and related resources</td><td data-v-35e95a64${_scopeId2}><code data-v-35e95a64${_scopeId2}>authorization_details</code> with <code data-v-35e95a64${_scopeId2}>type: urn:openfinanceuae:account-access-consent:v2.1</code></td></tr><tr data-v-35e95a64${_scopeId2}><td data-v-35e95a64${_scopeId2}><strong data-v-35e95a64${_scopeId2}>Bank Service Initiation</strong></td><td data-v-35e95a64${_scopeId2}>Initiating payments</td><td data-v-35e95a64${_scopeId2}><code data-v-35e95a64${_scopeId2}>authorization_details</code> with <code data-v-35e95a64${_scopeId2}>type: urn:openfinanceuae:payment-consent:v2.1</code></td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Type"),
                          createVNode("th", null, "Used for"),
                          createVNode("th", null, "Created via")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "Bank Data Sharing")
                          ]),
                          createVNode("td", null, "Reading account data, balances, transactions, and related resources"),
                          createVNode("td", null, [
                            createVNode("code", null, "authorization_details"),
                            createTextVNode(" with "),
                            createVNode("code", null, "type: urn:openfinanceuae:account-access-consent:v2.1")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "Bank Service Initiation")
                          ]),
                          createVNode("td", null, "Initiating payments"),
                          createVNode("td", null, [
                            createVNode("code", null, "authorization_details"),
                            createTextVNode(" with "),
                            createVNode("code", null, "type: urn:openfinanceuae:payment-consent:v2.1")
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
                  createTextVNode(" There are two types of consent, corresponding to the two service families. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Type"),
                        createVNode("th", null, "Used for"),
                        createVNode("th", null, "Created via")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "Bank Data Sharing")
                        ]),
                        createVNode("td", null, "Reading account data, balances, transactions, and related resources"),
                        createVNode("td", null, [
                          createVNode("code", null, "authorization_details"),
                          createTextVNode(" with "),
                          createVNode("code", null, "type: urn:openfinanceuae:account-access-consent:v2.1")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "Bank Service Initiation")
                        ]),
                        createVNode("td", null, "Initiating payments"),
                        createVNode("td", null, [
                          createVNode("code", null, "authorization_details"),
                          createTextVNode(" with "),
                          createVNode("code", null, "type: urn:openfinanceuae:payment-consent:v2.1")
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
        id: "high-level-flow",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "Lifecycle at a glance",
        title: "From creation to authorized",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Before any <code data-v-35e95a64${_scopeId2}>UserOAuth2Security</code> protected resource can be accessed, a consent must go through a two-phase flow: <strong data-v-35e95a64${_scopeId2}>staging</strong> and <strong data-v-35e95a64${_scopeId2}>authorization</strong>. `);
                } else {
                  return [
                    createTextVNode(" Before any "),
                    createVNode("code", null, "UserOAuth2Security"),
                    createTextVNode(" protected resource can be accessed, a consent must go through a two-phase flow: "),
                    createVNode("strong", null, "staging"),
                    createTextVNode(" and "),
                    createVNode("strong", null, "authorization"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_ImageViewer, {
              src: "/images/journeys/oauth-wireframe.png",
              alt: "OAuth flow — staging, redirect, authentication and authorization across TPP, API Hub and LFI"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Before any "),
                  createVNode("code", null, "UserOAuth2Security"),
                  createTextVNode(" protected resource can be accessed, a consent must go through a two-phase flow: "),
                  createVNode("strong", null, "staging"),
                  createTextVNode(" and "),
                  createVNode("strong", null, "authorization"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode(_component_ImageViewer, {
                src: "/images/journeys/oauth-wireframe.png",
                alt: "OAuth flow — staging, redirect, authentication and authorization across TPP, API Hub and LFI"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "source-of-truth",
        num: "03",
        color: "var(--at-blue-deep, #1d4ed8)",
        eyebrow: "Authoritative record",
        title: "API Hub as the source of truth",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The API Hub maintains all Open Finance consents and acts as the <strong data-v-35e95a64${_scopeId2}>authoritative system of record</strong> for consents across the ecosystem. All consent creation, modification, and revocation events are recorded within the API Hub to ensure a single, consistent source of truth. `);
                } else {
                  return [
                    createTextVNode(" The API Hub maintains all Open Finance consents and acts as the "),
                    createVNode("strong", null, "authoritative system of record"),
                    createTextVNode(" for consents across the ecosystem. All consent creation, modification, and revocation events are recorded within the API Hub to ensure a single, consistent source of truth. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Whenever a TPP initiates a request to access customer data or initiate a payment, the request is validated against the consent record stored in the API Hub. `);
                } else {
                  return [
                    createTextVNode(" Whenever a TPP initiates a request to access customer data or initiate a payment, the request is validated against the consent record stored in the API Hub. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` To maintain ecosystem-wide consistency, consent updates such as status changes must be synchronised with the API Hub. `);
                } else {
                  return [
                    createTextVNode(" To maintain ecosystem-wide consistency, consent updates such as status changes must be synchronised with the API Hub. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The API Hub maintains all Open Finance consents and acts as the "),
                  createVNode("strong", null, "authoritative system of record"),
                  createTextVNode(" for consents across the ecosystem. All consent creation, modification, and revocation events are recorded within the API Hub to ensure a single, consistent source of truth. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Whenever a TPP initiates a request to access customer data or initiate a payment, the request is validated against the consent record stored in the API Hub. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" To maintain ecosystem-wide consistency, consent updates such as status changes must be synchronised with the API Hub. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "immutability",
        num: "04",
        color: "var(--at-teal)",
        eyebrow: "What can change",
        title: "Consent immutability after staging",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Once a consent is staged, the <strong data-v-35e95a64${_scopeId2}>only field under <code data-v-35e95a64${_scopeId2}>Data</code> that may change is <code data-v-35e95a64${_scopeId2}>Status</code></strong>. All other <code data-v-35e95a64${_scopeId2}>Data</code> values are fixed for the lifetime of that consent. <code data-v-35e95a64${_scopeId2}>Subscription</code> and <code data-v-35e95a64${_scopeId2}>Meta</code> may be patched, but they sit outside the <code data-v-35e95a64${_scopeId2}>Data</code> object. See the request/response models in the OpenAPI (e.g. <a href="/tech/tpp-standards/v2.1/consent/open-api/account-access-consents" data-v-35e95a64${_scopeId2}><code data-v-35e95a64${_scopeId2}>/account-access-consents</code></a>) for the canonical structure. `);
                } else {
                  return [
                    createTextVNode(" Once a consent is staged, the "),
                    createVNode("strong", null, [
                      createTextVNode("only field under "),
                      createVNode("code", null, "Data"),
                      createTextVNode(" that may change is "),
                      createVNode("code", null, "Status")
                    ]),
                    createTextVNode(". All other "),
                    createVNode("code", null, "Data"),
                    createTextVNode(" values are fixed for the lifetime of that consent. "),
                    createVNode("code", null, "Subscription"),
                    createTextVNode(" and "),
                    createVNode("code", null, "Meta"),
                    createTextVNode(" may be patched, but they sit outside the "),
                    createVNode("code", null, "Data"),
                    createTextVNode(" object. See the request/response models in the OpenAPI (e.g. "),
                    createVNode("a", { href: "/tech/tpp-standards/v2.1/consent/open-api/account-access-consents" }, [
                      createVNode("code", null, "/account-access-consents")
                    ]),
                    createTextVNode(") for the canonical structure. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` If a user needs to change any <code data-v-35e95a64${_scopeId2}>Data</code> value (for example, to adjust <code data-v-35e95a64${_scopeId2}>ExpirationDateTime</code> or add or remove a permission), the TPP must create a <strong data-v-35e95a64${_scopeId2}>new consent</strong>, revoke the previous one, and link the two via <code data-v-35e95a64${_scopeId2}>BaseConsentId</code>. `);
                } else {
                  return [
                    createTextVNode(" If a user needs to change any "),
                    createVNode("code", null, "Data"),
                    createTextVNode(" value (for example, to adjust "),
                    createVNode("code", null, "ExpirationDateTime"),
                    createTextVNode(" or add or remove a permission), the TPP must create a "),
                    createVNode("strong", null, "new consent"),
                    createTextVNode(", revoke the previous one, and link the two via "),
                    createVNode("code", null, "BaseConsentId"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Once a consent is staged, the "),
                  createVNode("strong", null, [
                    createTextVNode("only field under "),
                    createVNode("code", null, "Data"),
                    createTextVNode(" that may change is "),
                    createVNode("code", null, "Status")
                  ]),
                  createTextVNode(". All other "),
                  createVNode("code", null, "Data"),
                  createTextVNode(" values are fixed for the lifetime of that consent. "),
                  createVNode("code", null, "Subscription"),
                  createTextVNode(" and "),
                  createVNode("code", null, "Meta"),
                  createTextVNode(" may be patched, but they sit outside the "),
                  createVNode("code", null, "Data"),
                  createTextVNode(" object. See the request/response models in the OpenAPI (e.g. "),
                  createVNode("a", { href: "/tech/tpp-standards/v2.1/consent/open-api/account-access-consents" }, [
                    createVNode("code", null, "/account-access-consents")
                  ]),
                  createTextVNode(") for the canonical structure. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" If a user needs to change any "),
                  createVNode("code", null, "Data"),
                  createTextVNode(" value (for example, to adjust "),
                  createVNode("code", null, "ExpirationDateTime"),
                  createTextVNode(" or add or remove a permission), the TPP must create a "),
                  createVNode("strong", null, "new consent"),
                  createTextVNode(", revoke the previous one, and link the two via "),
                  createVNode("code", null, "BaseConsentId"),
                  createTextVNode(". ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "accessing-protected-resource",
        num: "05",
        color: "var(--at-gold)",
        eyebrow: "Two conditions to satisfy",
        title: "Accessing a protected resource",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Resources secured with <code data-v-35e95a64${_scopeId2}>UserOAuth2Security</code> require user involvement — the user must authenticate with the LFI and explicitly authorise the consent before the TPP can access any resource on their behalf. `);
                } else {
                  return [
                    createTextVNode(" Resources secured with "),
                    createVNode("code", null, "UserOAuth2Security"),
                    createTextVNode(" require user involvement — the user must authenticate with the LFI and explicitly authorise the consent before the TPP can access any resource on their behalf. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Two independent conditions must <strong data-v-35e95a64${_scopeId2}>both</strong> be satisfied before the API Hub will serve a <code data-v-35e95a64${_scopeId2}>UserOAuth2Security</code> resource: `);
                } else {
                  return [
                    createTextVNode(" Two independent conditions must "),
                    createVNode("strong", null, "both"),
                    createTextVNode(" be satisfied before the API Hub will serve a "),
                    createVNode("code", null, "UserOAuth2Security"),
                    createTextVNode(" resource: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdStages, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "1",
                    title: "A valid Access Token",
                    "num-color": "var(--at-teal)"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-35e95a64${_scopeId3}> Requests must carry a Bearer access token in the <code data-v-35e95a64${_scopeId3}>Authorization</code> header: </p><pre class="ed-doc__pre" data-v-35e95a64${_scopeId3}><code data-v-35e95a64${_scopeId3}>Authorization: Bearer &lt;access_token&gt;</code></pre><p data-v-35e95a64${_scopeId3}> Access tokens are short-lived (10-minute lifetime) and are bound to the consent they were issued for. See <a href="/tech/tpp-standards/security/tokens/" data-v-35e95a64${_scopeId3}>Tokens &amp; Assertions</a> for the full token lifecycle. </p>`);
                      } else {
                        return [
                          createVNode("p", null, [
                            createTextVNode(" Requests must carry a Bearer access token in the "),
                            createVNode("code", null, "Authorization"),
                            createTextVNode(" header: ")
                          ]),
                          createVNode("pre", { class: "ed-doc__pre" }, [
                            createVNode("code", null, "Authorization: Bearer <access_token>")
                          ]),
                          createVNode("p", null, [
                            createTextVNode(" Access tokens are short-lived (10-minute lifetime) and are bound to the consent they were issued for. See "),
                            createVNode("a", { href: "/tech/tpp-standards/security/tokens/" }, "Tokens & Assertions"),
                            createTextVNode(" for the full token lifecycle. ")
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "2",
                    title: "An Authorized Consent",
                    "num-color": "var(--at-teal)"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-35e95a64${_scopeId3}> The consent referenced in the access token&#39;s <code data-v-35e95a64${_scopeId3}>authorization_details</code> must be in the <code data-v-35e95a64${_scopeId3}>Authorized</code> state. The <code data-v-35e95a64${_scopeId3}>authorization_details</code> object defines the exact scope of access — which permissions are granted, to which endpoints, for which accounts, and for how long. </p>`);
                      } else {
                        return [
                          createVNode("p", null, [
                            createTextVNode(" The consent referenced in the access token's "),
                            createVNode("code", null, "authorization_details"),
                            createTextVNode(" must be in the "),
                            createVNode("code", null, "Authorized"),
                            createTextVNode(" state. The "),
                            createVNode("code", null, "authorization_details"),
                            createTextVNode(" object defines the exact scope of access — which permissions are granted, to which endpoints, for which accounts, and for how long. ")
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_EdStage, {
                      num: "1",
                      title: "A valid Access Token",
                      "num-color": "var(--at-teal)"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, [
                          createTextVNode(" Requests must carry a Bearer access token in the "),
                          createVNode("code", null, "Authorization"),
                          createTextVNode(" header: ")
                        ]),
                        createVNode("pre", { class: "ed-doc__pre" }, [
                          createVNode("code", null, "Authorization: Bearer <access_token>")
                        ]),
                        createVNode("p", null, [
                          createTextVNode(" Access tokens are short-lived (10-minute lifetime) and are bound to the consent they were issued for. See "),
                          createVNode("a", { href: "/tech/tpp-standards/security/tokens/" }, "Tokens & Assertions"),
                          createTextVNode(" for the full token lifecycle. ")
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_EdStage, {
                      num: "2",
                      title: "An Authorized Consent",
                      "num-color": "var(--at-teal)"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, [
                          createTextVNode(" The consent referenced in the access token's "),
                          createVNode("code", null, "authorization_details"),
                          createTextVNode(" must be in the "),
                          createVNode("code", null, "Authorized"),
                          createTextVNode(" state. The "),
                          createVNode("code", null, "authorization_details"),
                          createTextVNode(" object defines the exact scope of access — which permissions are granted, to which endpoints, for which accounts, and for how long. ")
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, { type: "warning" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-35e95a64${_scopeId2}> The API Hub <strong data-v-35e95a64${_scopeId2}>must</strong> reject all requests to <code data-v-35e95a64${_scopeId2}>UserOAuth2Security</code> resources where the associated consent is not in the <code data-v-35e95a64${_scopeId2}>Authorized</code> state — including consents that are <code data-v-35e95a64${_scopeId2}>AwaitingAuthorization</code>, <code data-v-35e95a64${_scopeId2}>Suspended</code>, <code data-v-35e95a64${_scopeId2}>Expired</code>, <code data-v-35e95a64${_scopeId2}>Revoked</code>, <code data-v-35e95a64${_scopeId2}>Rejected</code>, or <code data-v-35e95a64${_scopeId2}>Consumed</code>. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" The API Hub "),
                      createVNode("strong", null, "must"),
                      createTextVNode(" reject all requests to "),
                      createVNode("code", null, "UserOAuth2Security"),
                      createTextVNode(" resources where the associated consent is not in the "),
                      createVNode("code", null, "Authorized"),
                      createTextVNode(" state — including consents that are "),
                      createVNode("code", null, "AwaitingAuthorization"),
                      createTextVNode(", "),
                      createVNode("code", null, "Suspended"),
                      createTextVNode(", "),
                      createVNode("code", null, "Expired"),
                      createTextVNode(", "),
                      createVNode("code", null, "Revoked"),
                      createTextVNode(", "),
                      createVNode("code", null, "Rejected"),
                      createTextVNode(", or "),
                      createVNode("code", null, "Consumed"),
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
                  createTextVNode(" Resources secured with "),
                  createVNode("code", null, "UserOAuth2Security"),
                  createTextVNode(" require user involvement — the user must authenticate with the LFI and explicitly authorise the consent before the TPP can access any resource on their behalf. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Two independent conditions must "),
                  createVNode("strong", null, "both"),
                  createTextVNode(" be satisfied before the API Hub will serve a "),
                  createVNode("code", null, "UserOAuth2Security"),
                  createTextVNode(" resource: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdStages, null, {
                default: withCtx(() => [
                  createVNode(_component_EdStage, {
                    num: "1",
                    title: "A valid Access Token",
                    "num-color": "var(--at-teal)"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, [
                        createTextVNode(" Requests must carry a Bearer access token in the "),
                        createVNode("code", null, "Authorization"),
                        createTextVNode(" header: ")
                      ]),
                      createVNode("pre", { class: "ed-doc__pre" }, [
                        createVNode("code", null, "Authorization: Bearer <access_token>")
                      ]),
                      createVNode("p", null, [
                        createTextVNode(" Access tokens are short-lived (10-minute lifetime) and are bound to the consent they were issued for. See "),
                        createVNode("a", { href: "/tech/tpp-standards/security/tokens/" }, "Tokens & Assertions"),
                        createTextVNode(" for the full token lifecycle. ")
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_EdStage, {
                    num: "2",
                    title: "An Authorized Consent",
                    "num-color": "var(--at-teal)"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, [
                        createTextVNode(" The consent referenced in the access token's "),
                        createVNode("code", null, "authorization_details"),
                        createTextVNode(" must be in the "),
                        createVNode("code", null, "Authorized"),
                        createTextVNode(" state. The "),
                        createVNode("code", null, "authorization_details"),
                        createTextVNode(" object defines the exact scope of access — which permissions are granted, to which endpoints, for which accounts, and for how long. ")
                      ])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, { type: "warning" }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" The API Hub "),
                    createVNode("strong", null, "must"),
                    createTextVNode(" reject all requests to "),
                    createVNode("code", null, "UserOAuth2Security"),
                    createTextVNode(" resources where the associated consent is not in the "),
                    createVNode("code", null, "Authorized"),
                    createTextVNode(" state — including consents that are "),
                    createVNode("code", null, "AwaitingAuthorization"),
                    createTextVNode(", "),
                    createVNode("code", null, "Suspended"),
                    createTextVNode(", "),
                    createVNode("code", null, "Expired"),
                    createTextVNode(", "),
                    createVNode("code", null, "Revoked"),
                    createTextVNode(", "),
                    createVNode("code", null, "Rejected"),
                    createTextVNode(", or "),
                    createVNode("code", null, "Consumed"),
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
        id: "consent-states",
        num: "06",
        color: "var(--at-blue-deep, #1d4ed8)",
        eyebrow: "Lifecycle states",
        title: "Consent states",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` A consent moves through a defined set of states during its lifecycle. Your application must track these states and respond appropriately — particularly to terminal states, which require a new consent flow. `);
                } else {
                  return [
                    createTextVNode(" A consent moves through a defined set of states during its lifecycle. Your application must track these states and respond appropriately — particularly to terminal states, which require a new consent flow. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_ImageViewer, {
              src: "/images/journeys/consent-states.png",
              alt: "Consent state machine — states and transitions"
            }, null, _parent2, _scopeId));
            _push2(`<div class="ed-doc__states" data-v-35e95a64${_scopeId}><!--[-->`);
            ssrRenderList(states, (s) => {
              _push2(`<article${ssrRenderAttr("id", s.id)} class="${ssrRenderClass([`ed-doc__state--${s.kind}`, "ed-doc__state"])}" data-v-35e95a64${_scopeId}><header class="ed-doc__state-head" data-v-35e95a64${_scopeId}><h3 class="ed-doc__state-name" data-v-35e95a64${_scopeId}>${ssrInterpolate(s.name)}</h3><span class="ed-doc__state-pill" data-v-35e95a64${_scopeId}>${ssrInterpolate(pillLabel(s.kind))}</span></header><p class="ed-doc__state-body" data-v-35e95a64${_scopeId}>${s.intro ?? ""}</p>`);
              if (s.bullets && s.bullets.length) {
                _push2(`<ul class="ed-doc__state-bullets" data-v-35e95a64${_scopeId}><!--[-->`);
                ssrRenderList(s.bullets, (b, bi) => {
                  _push2(`<li data-v-35e95a64${_scopeId}>${b ?? ""}</li>`);
                });
                _push2(`<!--]--></ul>`);
              } else {
                _push2(`<!---->`);
              }
              if (s.detail) {
                _push2(`<p class="ed-doc__state-body" data-v-35e95a64${_scopeId}>${s.detail ?? ""}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</article>`);
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" A consent moves through a defined set of states during its lifecycle. Your application must track these states and respond appropriately — particularly to terminal states, which require a new consent flow. ")
                ]),
                _: 1
              }),
              createVNode(_component_ImageViewer, {
                src: "/images/journeys/consent-states.png",
                alt: "Consent state machine — states and transitions"
              }),
              createVNode("div", { class: "ed-doc__states" }, [
                (openBlock(), createBlock(Fragment, null, renderList(states, (s) => {
                  return createVNode("article", {
                    id: s.id,
                    key: s.id,
                    class: ["ed-doc__state", `ed-doc__state--${s.kind}`]
                  }, [
                    createVNode("header", { class: "ed-doc__state-head" }, [
                      createVNode("h3", { class: "ed-doc__state-name" }, toDisplayString(s.name), 1),
                      createVNode("span", { class: "ed-doc__state-pill" }, toDisplayString(pillLabel(s.kind)), 1)
                    ]),
                    createVNode("p", {
                      class: "ed-doc__state-body",
                      innerHTML: s.intro
                    }, null, 8, ["innerHTML"]),
                    s.bullets && s.bullets.length ? (openBlock(), createBlock("ul", {
                      key: 0,
                      class: "ed-doc__state-bullets"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(s.bullets, (b, bi) => {
                        return openBlock(), createBlock("li", {
                          key: bi,
                          innerHTML: b
                        }, null, 8, ["innerHTML"]);
                      }), 128))
                    ])) : createCommentVNode("", true),
                    s.detail ? (openBlock(), createBlock("p", {
                      key: 1,
                      class: "ed-doc__state-body",
                      innerHTML: s.detail
                    }, null, 8, ["innerHTML"])) : createCommentVNode("", true)
                  ], 10, ["id"]);
                }), 64))
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/v2.1/consent/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-35e95a64"]]);
export {
  index as default
};
