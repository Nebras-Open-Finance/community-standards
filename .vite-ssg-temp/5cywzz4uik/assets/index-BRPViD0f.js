import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { defineComponent, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdNote = __unplugin_components_7;
      const _component_EdRefTable = __unplugin_components_12;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-3950e78d><section class="ed-doc__hero" data-v-3950e78d><div class="ed-doc__inner" data-v-3950e78d><div class="ed-doc__eyebrow" data-v-3950e78d><span class="ed-doc__eyebrow-dash" data-v-3950e78d></span> TPP Standards · v2.2-rc1 · Consent · Data Deletion Confirmation </div><h1 class="ed-doc__title" data-v-3950e78d> Data Deletion Confirmation <span class="ed-doc__read" data-v-3950e78d>7 min read</span></h1><p class="ed-doc__lede" data-v-3950e78d> When a consent ends, the TPP must review the data it holds under that consent and confirm what it did with it. That confirmation is recorded as an <strong data-v-3950e78d>Attestation Event</strong>, posted to an append-only <code data-v-3950e78d>attestations</code> sub-resource on the consent itself. For the request and response schemas, see the <a href="/tech/tpp-standards/v2.2-rc1/consent/data-deletion-confirmation/open-api/post-account-access-consents-ConsentId-attestations" data-v-3950e78d>API Reference</a>. </p></div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "obligation",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "What is required",
        title: "The obligation",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Once a consent reaches a <strong data-v-3950e78d${_scopeId2}>terminal status</strong>, the TPP MUST review every category of data it holds under that consent and record an Attestation Event stating, per category, whether the data was deleted or lawfully retained. `);
                } else {
                  return [
                    createTextVNode(" Once a consent reaches a "),
                    createVNode("strong", null, "terminal status"),
                    createTextVNode(", the TPP MUST review every category of data it holds under that consent and record an Attestation Event stating, per category, whether the data was deleted or lawfully retained. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The terminal statuses in scope are <code data-v-3950e78d${_scopeId2}>Revoked</code> and <code data-v-3950e78d${_scopeId2}>Expired</code>. <code data-v-3950e78d${_scopeId2}>Rejected</code> consents are explicitly out of scope — no data was ever shared under them, so there is nothing to attest to. `);
                } else {
                  return [
                    createTextVNode(" The terminal statuses in scope are "),
                    createVNode("code", null, "Revoked"),
                    createTextVNode(" and "),
                    createVNode("code", null, "Expired"),
                    createTextVNode(". "),
                    createVNode("code", null, "Rejected"),
                    createTextVNode(" consents are explicitly out of scope — no data was ever shared under them, so there is nothing to attest to. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, { type: "important" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-3950e78d${_scopeId2}> A payment consent is <strong data-v-3950e78d${_scopeId2}>not</strong> empty for this purpose. It carries debtor and creditor account details, amounts, references, and charge and exchange-rate information, plus any account data the TPP retrieved in order to set the payment up. When a payment consent reaches a terminal status, that data falls under the same obligation as a Data Sharing consent. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" A payment consent is "),
                      createVNode("strong", null, "not"),
                      createTextVNode(" empty for this purpose. It carries debtor and creditor account details, amounts, references, and charge and exchange-rate information, plus any account data the TPP retrieved in order to set the payment up. When a payment consent reaches a terminal status, that data falls under the same obligation as a Data Sharing consent. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Data the TPP holds outside the consent — data the customer supplied directly, or data obtained under a separate lawful basis — is not covered by this attestation. `);
                } else {
                  return [
                    createTextVNode(" Data the TPP holds outside the consent — data the customer supplied directly, or data obtained under a separate lawful basis — is not covered by this attestation. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Once a consent reaches a "),
                  createVNode("strong", null, "terminal status"),
                  createTextVNode(", the TPP MUST review every category of data it holds under that consent and record an Attestation Event stating, per category, whether the data was deleted or lawfully retained. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The terminal statuses in scope are "),
                  createVNode("code", null, "Revoked"),
                  createTextVNode(" and "),
                  createVNode("code", null, "Expired"),
                  createTextVNode(". "),
                  createVNode("code", null, "Rejected"),
                  createTextVNode(" consents are explicitly out of scope — no data was ever shared under them, so there is nothing to attest to. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, { type: "important" }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" A payment consent is "),
                    createVNode("strong", null, "not"),
                    createTextVNode(" empty for this purpose. It carries debtor and creditor account details, amounts, references, and charge and exchange-rate information, plus any account data the TPP retrieved in order to set the payment up. When a payment consent reaches a terminal status, that data falls under the same obligation as a Data Sharing consent. ")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Data the TPP holds outside the consent — data the customer supplied directly, or data obtained under a separate lawful basis — is not covered by this attestation. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "sub-resource",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "Where it is recorded",
        title: "The attestations sub-resource"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Every consent type gains an <code data-v-3950e78d${_scopeId2}>attestations</code> sub-resource. Each is scoped to its own API family, so a TPP only needs the scopes it already holds. `);
                } else {
                  return [
                    createTextVNode(" Every consent type gains an "),
                    createVNode("code", null, "attestations"),
                    createTextVNode(" sub-resource. Each is scoped to its own API family, so a TPP only needs the scopes it already holds. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-3950e78d${_scopeId2}><thead data-v-3950e78d${_scopeId2}><tr data-v-3950e78d${_scopeId2}><th data-v-3950e78d${_scopeId2}>Consent type</th><th data-v-3950e78d${_scopeId2}>Path</th><th data-v-3950e78d${_scopeId2}>Scope</th></tr></thead><tbody data-v-3950e78d${_scopeId2}><tr data-v-3950e78d${_scopeId2}><td data-v-3950e78d${_scopeId2}>Bank Data Sharing</td><td data-v-3950e78d${_scopeId2}><code data-v-3950e78d${_scopeId2}>/account-access-consents/{ConsentId}/attestations</code></td><td data-v-3950e78d${_scopeId2}><code data-v-3950e78d${_scopeId2}>accounts</code></td></tr><tr data-v-3950e78d${_scopeId2}><td data-v-3950e78d${_scopeId2}>Bank Service Initiation</td><td data-v-3950e78d${_scopeId2}><code data-v-3950e78d${_scopeId2}>/payment-consents/{ConsentId}/attestations</code></td><td data-v-3950e78d${_scopeId2}><code data-v-3950e78d${_scopeId2}>payments</code></td></tr><tr data-v-3950e78d${_scopeId2}><td data-v-3950e78d${_scopeId2}>Insurance</td><td data-v-3950e78d${_scopeId2}><code data-v-3950e78d${_scopeId2}>/insurance-consents/{ConsentId}/attestations</code></td><td data-v-3950e78d${_scopeId2}><code data-v-3950e78d${_scopeId2}>insurance</code></td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Consent type"),
                          createVNode("th", null, "Path"),
                          createVNode("th", null, "Scope")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, "Bank Data Sharing"),
                          createVNode("td", null, [
                            createVNode("code", null, "/account-access-consents/{ConsentId}/attestations")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "accounts")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "Bank Service Initiation"),
                          createVNode("td", null, [
                            createVNode("code", null, "/payment-consents/{ConsentId}/attestations")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "payments")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "Insurance"),
                          createVNode("td", null, [
                            createVNode("code", null, "/insurance-consents/{ConsentId}/attestations")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "insurance")
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
                  _push3(`<code data-v-3950e78d${_scopeId2}>POST</code> appends a new Attestation Event. <code data-v-3950e78d${_scopeId2}>GET</code> returns every event successfully recorded against that consent, each carrying a copy of the Attestation the TPP submitted alongside its receipt. The response is paginated. `);
                } else {
                  return [
                    createVNode("code", null, "POST"),
                    createTextVNode(" appends a new Attestation Event. "),
                    createVNode("code", null, "GET"),
                    createTextVNode(" returns every event successfully recorded against that consent, each carrying a copy of the Attestation the TPP submitted alongside its receipt. The response is paginated. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Where a TPP has posted more than one Attestation against a consent, only the <strong data-v-3950e78d${_scopeId2}>last successfully recorded</strong> one is reported on. Pass <code data-v-3950e78d${_scopeId2}>LastSubmitted=true</code> on the <code data-v-3950e78d${_scopeId2}>GET</code> to retrieve just that event rather than the whole history; the parameter defaults to <code data-v-3950e78d${_scopeId2}>false</code>. `);
                } else {
                  return [
                    createTextVNode(" Where a TPP has posted more than one Attestation against a consent, only the "),
                    createVNode("strong", null, "last successfully recorded"),
                    createTextVNode(" one is reported on. Pass "),
                    createVNode("code", null, "LastSubmitted=true"),
                    createTextVNode(" on the "),
                    createVNode("code", null, "GET"),
                    createTextVNode(" to retrieve just that event rather than the whole history; the parameter defaults to "),
                    createVNode("code", null, "false"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, { type: "note" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-3950e78d${_scopeId2}> Attestations are recorded and validated wholly within the API Hub. There is no corresponding Ozone Connect endpoint and no change to the consent record an LFI holds. </p>`);
                } else {
                  return [
                    createVNode("p", null, " Attestations are recorded and validated wholly within the API Hub. There is no corresponding Ozone Connect endpoint and no change to the consent record an LFI holds. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Every consent type gains an "),
                  createVNode("code", null, "attestations"),
                  createTextVNode(" sub-resource. Each is scoped to its own API family, so a TPP only needs the scopes it already holds. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Consent type"),
                        createVNode("th", null, "Path"),
                        createVNode("th", null, "Scope")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, "Bank Data Sharing"),
                        createVNode("td", null, [
                          createVNode("code", null, "/account-access-consents/{ConsentId}/attestations")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "accounts")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "Bank Service Initiation"),
                        createVNode("td", null, [
                          createVNode("code", null, "/payment-consents/{ConsentId}/attestations")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "payments")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "Insurance"),
                        createVNode("td", null, [
                          createVNode("code", null, "/insurance-consents/{ConsentId}/attestations")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "insurance")
                        ])
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("code", null, "POST"),
                  createTextVNode(" appends a new Attestation Event. "),
                  createVNode("code", null, "GET"),
                  createTextVNode(" returns every event successfully recorded against that consent, each carrying a copy of the Attestation the TPP submitted alongside its receipt. The response is paginated. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Where a TPP has posted more than one Attestation against a consent, only the "),
                  createVNode("strong", null, "last successfully recorded"),
                  createTextVNode(" one is reported on. Pass "),
                  createVNode("code", null, "LastSubmitted=true"),
                  createTextVNode(" on the "),
                  createVNode("code", null, "GET"),
                  createTextVNode(" to retrieve just that event rather than the whole history; the parameter defaults to "),
                  createVNode("code", null, "false"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, { type: "note" }, {
                default: withCtx(() => [
                  createVNode("p", null, " Attestations are recorded and validated wholly within the API Hub. There is no corresponding Ozone Connect endpoint and no change to the consent record an LFI holds. ")
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
        num: "03",
        color: "var(--at-teal)",
        eyebrow: "How it is submitted",
        title: "Signed requests and receipts",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<code data-v-3950e78d${_scopeId2}>POST</code> does not take a JSON body. The request is a <strong data-v-3950e78d${_scopeId2}>signed JWT</strong> sent as <code data-v-3950e78d${_scopeId2}>application/jwt</code>, and the <code data-v-3950e78d${_scopeId2}>201</code> response is a signed JWT in return. The Attestation itself travels in the <code data-v-3950e78d${_scopeId2}>message</code> claim. `);
                } else {
                  return [
                    createVNode("code", null, "POST"),
                    createTextVNode(" does not take a JSON body. The request is a "),
                    createVNode("strong", null, "signed JWT"),
                    createTextVNode(" sent as "),
                    createVNode("code", null, "application/jwt"),
                    createTextVNode(", and the "),
                    createVNode("code", null, "201"),
                    createTextVNode(" response is a signed JWT in return. The Attestation itself travels in the "),
                    createVNode("code", null, "message"),
                    createTextVNode(" claim. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-3950e78d${_scopeId2}><thead data-v-3950e78d${_scopeId2}><tr data-v-3950e78d${_scopeId2}><th data-v-3950e78d${_scopeId2}>Operation</th><th data-v-3950e78d${_scopeId2}>Media type</th><th data-v-3950e78d${_scopeId2}>Body</th></tr></thead><tbody data-v-3950e78d${_scopeId2}><tr data-v-3950e78d${_scopeId2}><td data-v-3950e78d${_scopeId2}><code data-v-3950e78d${_scopeId2}>POST</code> request</td><td data-v-3950e78d${_scopeId2}><code data-v-3950e78d${_scopeId2}>application/jwt</code></td><td data-v-3950e78d${_scopeId2}><code data-v-3950e78d${_scopeId2}>message</code> carries <code data-v-3950e78d${_scopeId2}>Data</code> — the Attestation</td></tr><tr data-v-3950e78d${_scopeId2}><td data-v-3950e78d${_scopeId2}><code data-v-3950e78d${_scopeId2}>POST</code> 201 response</td><td data-v-3950e78d${_scopeId2}><code data-v-3950e78d${_scopeId2}>application/jwt</code></td><td data-v-3950e78d${_scopeId2}><code data-v-3950e78d${_scopeId2}>message</code> carries <code data-v-3950e78d${_scopeId2}>Data</code> — the receipt</td></tr><tr data-v-3950e78d${_scopeId2}><td data-v-3950e78d${_scopeId2}><code data-v-3950e78d${_scopeId2}>GET</code> 200 response</td><td data-v-3950e78d${_scopeId2}><code data-v-3950e78d${_scopeId2}>application/json</code></td><td data-v-3950e78d${_scopeId2}>Unsigned — <code data-v-3950e78d${_scopeId2}>Data</code>, <code data-v-3950e78d${_scopeId2}>Links</code>, <code data-v-3950e78d${_scopeId2}>Meta</code></td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Operation"),
                          createVNode("th", null, "Media type"),
                          createVNode("th", null, "Body")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "POST"),
                            createTextVNode(" request")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "application/jwt")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "message"),
                            createTextVNode(" carries "),
                            createVNode("code", null, "Data"),
                            createTextVNode(" — the Attestation")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "POST"),
                            createTextVNode(" 201 response")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "application/jwt")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "message"),
                            createTextVNode(" carries "),
                            createVNode("code", null, "Data"),
                            createTextVNode(" — the receipt")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "GET"),
                            createTextVNode(" 200 response")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "application/json")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("Unsigned — "),
                            createVNode("code", null, "Data"),
                            createTextVNode(", "),
                            createVNode("code", null, "Links"),
                            createTextVNode(", "),
                            createVNode("code", null, "Meta")
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
                  _push3(` Both JWTs require the <code data-v-3950e78d${_scopeId2}>iss</code>, <code data-v-3950e78d${_scopeId2}>exp</code>, <code data-v-3950e78d${_scopeId2}>nbf</code> and <code data-v-3950e78d${_scopeId2}>message</code> claims; <code data-v-3950e78d${_scopeId2}>aud</code> and <code data-v-3950e78d${_scopeId2}>iat</code> are optional. `);
                } else {
                  return [
                    createTextVNode(" Both JWTs require the "),
                    createVNode("code", null, "iss"),
                    createTextVNode(", "),
                    createVNode("code", null, "exp"),
                    createTextVNode(", "),
                    createVNode("code", null, "nbf"),
                    createTextVNode(" and "),
                    createVNode("code", null, "message"),
                    createTextVNode(" claims; "),
                    createVNode("code", null, "aud"),
                    createTextVNode(" and "),
                    createVNode("code", null, "iat"),
                    createTextVNode(" are optional. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, { type: "note" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-3950e78d${_scopeId2}> The receipt repeats the submitted Attestation back in full, rather than just acknowledging it by <code data-v-3950e78d${_scopeId2}>AttestationId</code>. That is deliberate: it puts the complete record inside the signed message, so the TPP holds a signed artefact covering both what it attested and what the API Hub recorded. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" The receipt repeats the submitted Attestation back in full, rather than just acknowledging it by "),
                      createVNode("code", null, "AttestationId"),
                      createTextVNode(". That is deliberate: it puts the complete record inside the signed message, so the TPP holds a signed artefact covering both what it attested and what the API Hub recorded. ")
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
                  createVNode("code", null, "POST"),
                  createTextVNode(" does not take a JSON body. The request is a "),
                  createVNode("strong", null, "signed JWT"),
                  createTextVNode(" sent as "),
                  createVNode("code", null, "application/jwt"),
                  createTextVNode(", and the "),
                  createVNode("code", null, "201"),
                  createTextVNode(" response is a signed JWT in return. The Attestation itself travels in the "),
                  createVNode("code", null, "message"),
                  createTextVNode(" claim. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Operation"),
                        createVNode("th", null, "Media type"),
                        createVNode("th", null, "Body")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "POST"),
                          createTextVNode(" request")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "application/jwt")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "message"),
                          createTextVNode(" carries "),
                          createVNode("code", null, "Data"),
                          createTextVNode(" — the Attestation")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "POST"),
                          createTextVNode(" 201 response")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "application/jwt")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "message"),
                          createTextVNode(" carries "),
                          createVNode("code", null, "Data"),
                          createTextVNode(" — the receipt")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "GET"),
                          createTextVNode(" 200 response")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "application/json")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("Unsigned — "),
                          createVNode("code", null, "Data"),
                          createTextVNode(", "),
                          createVNode("code", null, "Links"),
                          createTextVNode(", "),
                          createVNode("code", null, "Meta")
                        ])
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Both JWTs require the "),
                  createVNode("code", null, "iss"),
                  createTextVNode(", "),
                  createVNode("code", null, "exp"),
                  createTextVNode(", "),
                  createVNode("code", null, "nbf"),
                  createTextVNode(" and "),
                  createVNode("code", null, "message"),
                  createTextVNode(" claims; "),
                  createVNode("code", null, "aud"),
                  createTextVNode(" and "),
                  createVNode("code", null, "iat"),
                  createTextVNode(" are optional. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, { type: "note" }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" The receipt repeats the submitted Attestation back in full, rather than just acknowledging it by "),
                    createVNode("code", null, "AttestationId"),
                    createTextVNode(". That is deliberate: it puts the complete record inside the signed message, so the TPP holds a signed artefact covering both what it attested and what the API Hub recorded. ")
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
        id: "deadline",
        num: "04",
        color: "var(--at-gold)",
        eyebrow: "When it is due",
        title: "The regulatory deadline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The API Hub stamps every recorded event with <code data-v-3950e78d${_scopeId2}>RegulatoryDeadlineMetIndicator</code>, reporting whether it arrived before the regulatory deadline for the <code data-v-3950e78d${_scopeId2}>AttestationType</code> submitted. For <code data-v-3950e78d${_scopeId2}>DataRetentionDeletion</code> that deadline is <strong data-v-3950e78d${_scopeId2}>45 days</strong> from the consent reaching its terminal status. `);
                } else {
                  return [
                    createTextVNode(" The API Hub stamps every recorded event with "),
                    createVNode("code", null, "RegulatoryDeadlineMetIndicator"),
                    createTextVNode(", reporting whether it arrived before the regulatory deadline for the "),
                    createVNode("code", null, "AttestationType"),
                    createTextVNode(" submitted. For "),
                    createVNode("code", null, "DataRetentionDeletion"),
                    createTextVNode(" that deadline is "),
                    createVNode("strong", null, "45 days"),
                    createTextVNode(" from the consent reaching its terminal status. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, { type: "note" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-3950e78d${_scopeId2}> The deadline is not carried in the OpenAPI document — the specification defines only the indicator, and the API Hub applies the regulatory value for the attestation type. A change to the deadline is therefore a policy change, not a schema change. </p>`);
                } else {
                  return [
                    createVNode("p", null, " The deadline is not carried in the OpenAPI document — the specification defines only the indicator, and the API Hub applies the regulatory value for the attestation type. A change to the deadline is therefore a policy change, not a schema change. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The deadline runs from the status change, not from the moment the TPP noticed it. A TPP subscribed to the <a href="/tech/tpp-standards/v2.2-rc1/webhooks/consent-status/api-guide" data-v-3950e78d${_scopeId2}>consent status webhook</a> is notified when a consent becomes terminal; a TPP that is not subscribed MUST poll the consent to detect the transition. Either way, knowing is the TPP&#39;s responsibility. `);
                } else {
                  return [
                    createTextVNode(" The deadline runs from the status change, not from the moment the TPP noticed it. A TPP subscribed to the "),
                    createVNode("a", { href: "/tech/tpp-standards/v2.2-rc1/webhooks/consent-status/api-guide" }, "consent status webhook"),
                    createTextVNode(" is notified when a consent becomes terminal; a TPP that is not subscribed MUST poll the consent to detect the transition. Either way, knowing is the TPP's responsibility. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, { type: "warning" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-3950e78d${_scopeId2}> A late event is still recorded. The API Hub does not reject it — <code data-v-3950e78d${_scopeId2}>RegulatoryDeadlineMetIndicator</code> simply reports <code data-v-3950e78d${_scopeId2}>false</code>. A late attestation is more useful than a missing one, and the indicator preserves the compliance signal. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" A late event is still recorded. The API Hub does not reject it — "),
                      createVNode("code", null, "RegulatoryDeadlineMetIndicator"),
                      createTextVNode(" simply reports "),
                      createVNode("code", null, "false"),
                      createTextVNode(". A late attestation is more useful than a missing one, and the indicator preserves the compliance signal. ")
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
                  createTextVNode(" The API Hub stamps every recorded event with "),
                  createVNode("code", null, "RegulatoryDeadlineMetIndicator"),
                  createTextVNode(", reporting whether it arrived before the regulatory deadline for the "),
                  createVNode("code", null, "AttestationType"),
                  createTextVNode(" submitted. For "),
                  createVNode("code", null, "DataRetentionDeletion"),
                  createTextVNode(" that deadline is "),
                  createVNode("strong", null, "45 days"),
                  createTextVNode(" from the consent reaching its terminal status. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, { type: "note" }, {
                default: withCtx(() => [
                  createVNode("p", null, " The deadline is not carried in the OpenAPI document — the specification defines only the indicator, and the API Hub applies the regulatory value for the attestation type. A change to the deadline is therefore a policy change, not a schema change. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The deadline runs from the status change, not from the moment the TPP noticed it. A TPP subscribed to the "),
                  createVNode("a", { href: "/tech/tpp-standards/v2.2-rc1/webhooks/consent-status/api-guide" }, "consent status webhook"),
                  createTextVNode(" is notified when a consent becomes terminal; a TPP that is not subscribed MUST poll the consent to detect the transition. Either way, knowing is the TPP's responsibility. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, { type: "warning" }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" A late event is still recorded. The API Hub does not reject it — "),
                    createVNode("code", null, "RegulatoryDeadlineMetIndicator"),
                    createTextVNode(" simply reports "),
                    createVNode("code", null, "false"),
                    createTextVNode(". A late attestation is more useful than a missing one, and the indicator preserves the compliance signal. ")
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
        id: "model",
        num: "05",
        color: "var(--at-teal)",
        eyebrow: "How the register behaves",
        title: "Append-only and stateless",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The sub-resource is append-only. Each <code data-v-3950e78d${_scopeId2}>POST</code> records a new, immutable event; the API Hub applies no de-duplication and stores every successfully recorded event. `);
                } else {
                  return [
                    createTextVNode(" The sub-resource is append-only. Each "),
                    createVNode("code", null, "POST"),
                    createTextVNode(" records a new, immutable event; the API Hub applies no de-duplication and stores every successfully recorded event. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` There is deliberately <strong data-v-3950e78d${_scopeId2}>no state model and no correction endpoint</strong>. A TPP that needs to restate an attestation simply posts another event, and the last one successfully recorded is the one reported on. `);
                } else {
                  return [
                    createTextVNode(" There is deliberately "),
                    createVNode("strong", null, "no state model and no correction endpoint"),
                    createTextVNode(". A TPP that needs to restate an attestation simply posts another event, and the last one successfully recorded is the one reported on. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<code data-v-3950e78d${_scopeId2}>AttestationType</code> is the extension point. A future obligation to attest to something else against a consent becomes a new type — not a new API. `);
                } else {
                  return [
                    createVNode("code", null, "AttestationType"),
                    createTextVNode(" is the extension point. A future obligation to attest to something else against a consent becomes a new type — not a new API. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The sub-resource is append-only. Each "),
                  createVNode("code", null, "POST"),
                  createTextVNode(" records a new, immutable event; the API Hub applies no de-duplication and stores every successfully recorded event. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" There is deliberately "),
                  createVNode("strong", null, "no state model and no correction endpoint"),
                  createTextVNode(". A TPP that needs to restate an attestation simply posts another event, and the last one successfully recorded is the one reported on. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("code", null, "AttestationType"),
                  createTextVNode(" is the extension point. A future obligation to attest to something else against a consent becomes a new type — not a new API. ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/v2.2-rc1/consent/data-deletion-confirmation/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3950e78d"]]);
export {
  index as default
};
