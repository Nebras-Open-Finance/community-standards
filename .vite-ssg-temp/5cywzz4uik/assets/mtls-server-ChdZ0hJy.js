import { E as EdCode } from "./EdCode-BQ4YLUeg.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { defineComponent, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const bundlePreprodCmd = `curl -sSL https://crl.sandbox.pki.openfinance.ae/issuer-ca.pem  > trust-framework-preprod.pem
curl -sSL https://crl.sandbox.pki.openfinance.ae/root-ca.pem   >> trust-framework-preprod.pem`;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "mtls-server",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdBullets = __unplugin_components_5;
      const _component_EdNote = __unplugin_components_7;
      const _component_EdRefTable = __unplugin_components_12;
      const _component_EdCode = EdCode;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-94ce1bf9><section class="ed-doc__hero" data-v-94ce1bf9><div class="ed-doc__inner" data-v-94ce1bf9><div class="ed-doc__eyebrow" data-v-94ce1bf9><span class="ed-doc__eyebrow-dash" data-v-94ce1bf9></span> LFI · API Hub · Onboarding · Configuring Auth </div><h1 class="ed-doc__title" data-v-94ce1bf9> Configuring Inbound mTLS <span class="ed-doc__read" data-v-94ce1bf9>5 min read</span></h1><p class="ed-doc__lede" data-v-94ce1bf9> This page describes how the LFI MUST configure inbound mutual TLS (mTLS) on its Ozone Connect server so that calls from the API Hub are authenticated and all other calls are rejected. </p></div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "why-mtls",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Why the LFI must configure inbound mTLS",
        title: "The Hub does not terminate TLS for you",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Every request the API Hub sends to the LFI is a mutual TLS connection in which the API Hub presents the <strong data-v-94ce1bf9${_scopeId2}>C4</strong> transport client certificate. The LFI&#39;s Ozone Connect server — or whichever component terminates TLS in front of it (reverse proxy, load balancer, WAF, API gateway) — MUST be configured to: `);
                } else {
                  return [
                    createTextVNode(" Every request the API Hub sends to the LFI is a mutual TLS connection in which the API Hub presents the "),
                    createVNode("strong", null, "C4"),
                    createTextVNode(" transport client certificate. The LFI's Ozone Connect server — or whichever component terminates TLS in front of it (reverse proxy, load balancer, WAF, API gateway) — MUST be configured to: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-94ce1bf9${_scopeId2}><strong data-v-94ce1bf9${_scopeId2}>Require</strong> a client certificate on every inbound connection, and</li><li data-v-94ce1bf9${_scopeId2}><strong data-v-94ce1bf9${_scopeId2}>Trust</strong> certificates signed by the Trust Framework Issuing CA for the relevant environment.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Require"),
                      createTextVNode(" a client certificate on every inbound connection, and")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Trust"),
                      createTextVNode(" certificates signed by the Trust Framework Issuing CA for the relevant environment.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Without this:`);
                } else {
                  return [
                    createTextVNode("Without this:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-94ce1bf9${_scopeId2}>If the server accepts connections that do not present a client certificate, unauthenticated callers reach Ozone Connect endpoints — a critical security failure.</li><li data-v-94ce1bf9${_scopeId2}>If the server&#39;s default trust store is used (operating system CA bundle, public Web PKI roots), the Trust Framework roots are not present and <strong data-v-94ce1bf9${_scopeId2}>every</strong> API Hub call is rejected at the handshake.</li>`);
                } else {
                  return [
                    createVNode("li", null, "If the server accepts connections that do not present a client certificate, unauthenticated callers reach Ozone Connect endpoints — a critical security failure."),
                    createVNode("li", null, [
                      createTextVNode("If the server's default trust store is used (operating system CA bundle, public Web PKI roots), the Trust Framework roots are not present and "),
                      createVNode("strong", null, "every"),
                      createTextVNode(" API Hub call is rejected at the handshake.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "warning",
              title: "This is the LFI's responsibility"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-94ce1bf9${_scopeId2}> The API Hub does not terminate TLS on the LFI&#39;s behalf for the API Hub → Ozone Connect leg. Ozone Connect is the party that validates the API Hub&#39;s C4 client certificate. LFIs sometimes assume the Hub handles all mTLS — it does not. </p>`);
                } else {
                  return [
                    createVNode("p", null, " The API Hub does not terminate TLS on the LFI's behalf for the API Hub → Ozone Connect leg. Ozone Connect is the party that validates the API Hub's C4 client certificate. LFIs sometimes assume the Hub handles all mTLS — it does not. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Every request the API Hub sends to the LFI is a mutual TLS connection in which the API Hub presents the "),
                  createVNode("strong", null, "C4"),
                  createTextVNode(" transport client certificate. The LFI's Ozone Connect server — or whichever component terminates TLS in front of it (reverse proxy, load balancer, WAF, API gateway) — MUST be configured to: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Require"),
                    createTextVNode(" a client certificate on every inbound connection, and")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Trust"),
                    createTextVNode(" certificates signed by the Trust Framework Issuing CA for the relevant environment.")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Without this:")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "If the server accepts connections that do not present a client certificate, unauthenticated callers reach Ozone Connect endpoints — a critical security failure."),
                  createVNode("li", null, [
                    createTextVNode("If the server's default trust store is used (operating system CA bundle, public Web PKI roots), the Trust Framework roots are not present and "),
                    createVNode("strong", null, "every"),
                    createTextVNode(" API Hub call is rejected at the handshake.")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "warning",
                title: "This is the LFI's responsibility"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, " The API Hub does not terminate TLS on the LFI's behalf for the API Hub → Ozone Connect leg. Ozone Connect is the party that validates the API Hub's C4 client certificate. LFIs sometimes assume the Hub handles all mTLS — it does not. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "trust-framework-cas",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "Trust Framework certificate authorities",
        title: "Production and Pre-production CAs",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Each API Hub environment pairs with a distinct Trust Framework PKI:`);
                } else {
                  return [
                    createTextVNode("Each API Hub environment pairs with a distinct Trust Framework PKI:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-94ce1bf9${_scopeId2}><strong data-v-94ce1bf9${_scopeId2}>Production</strong> API Hub → <strong data-v-94ce1bf9${_scopeId2}>Production</strong> Trust Framework</li><li data-v-94ce1bf9${_scopeId2}><strong data-v-94ce1bf9${_scopeId2}>Pre-production</strong> API Hub → <strong data-v-94ce1bf9${_scopeId2}>Sandbox</strong> Trust Framework</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Production"),
                      createTextVNode(" API Hub → "),
                      createVNode("strong", null, "Production"),
                      createTextVNode(" Trust Framework")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Pre-production"),
                      createTextVNode(" API Hub → "),
                      createVNode("strong", null, "Sandbox"),
                      createTextVNode(" Trust Framework")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` To validate the API Hub&#39;s C4 client certificate, the LFI MUST configure its Ozone Connect server with the Root and Issuing CA of the Trust Framework that pairs with the API Hub environment in use. `);
                } else {
                  return [
                    createTextVNode(" To validate the API Hub's C4 client certificate, the LFI MUST configure its Ozone Connect server with the Root and Issuing CA of the Trust Framework that pairs with the API Hub environment in use. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-94ce1bf9${_scopeId}>Production</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The Production API Hub uses certificates issued by the <strong data-v-94ce1bf9${_scopeId2}>Production Trust Framework</strong>. Its CAs are below. `);
                } else {
                  return [
                    createTextVNode(" The Production API Hub uses certificates issued by the "),
                    createVNode("strong", null, "Production Trust Framework"),
                    createTextVNode(". Its CAs are below. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h4 data-v-94ce1bf9${_scopeId}>Root CA</h4>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`The self-signed root of trust for the Production Trust Framework PKI.`);
                } else {
                  return [
                    createTextVNode("The self-signed root of trust for the Production Trust Framework PKI.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-94ce1bf9${_scopeId2}><thead data-v-94ce1bf9${_scopeId2}><tr data-v-94ce1bf9${_scopeId2}><th data-v-94ce1bf9${_scopeId2}>Field</th><th data-v-94ce1bf9${_scopeId2}>Value</th></tr></thead><tbody data-v-94ce1bf9${_scopeId2}><tr data-v-94ce1bf9${_scopeId2}><td data-v-94ce1bf9${_scopeId2}><strong data-v-94ce1bf9${_scopeId2}>Distinguished Name</strong></td><td data-v-94ce1bf9${_scopeId2}><code data-v-94ce1bf9${_scopeId2}>C=AE, O=Nebras Open Finance Company, OU=Al Tareq Trust Framework, CN=Al Tareq Production Trust Framework Root CA - G1</code></td></tr><tr data-v-94ce1bf9${_scopeId2}><td data-v-94ce1bf9${_scopeId2}><strong data-v-94ce1bf9${_scopeId2}>PEM</strong></td><td data-v-94ce1bf9${_scopeId2}><a href="https://crl.pki.openfinance.ae/root-ca.pem" data-v-94ce1bf9${_scopeId2}><code data-v-94ce1bf9${_scopeId2}>https://crl.pki.openfinance.ae/root-ca.pem</code></a></td></tr><tr data-v-94ce1bf9${_scopeId2}><td data-v-94ce1bf9${_scopeId2}><strong data-v-94ce1bf9${_scopeId2}>Algorithm</strong></td><td data-v-94ce1bf9${_scopeId2}>RSA 2048, signed with <code data-v-94ce1bf9${_scopeId2}>sha512WithRSAEncryption</code></td></tr><tr data-v-94ce1bf9${_scopeId2}><td data-v-94ce1bf9${_scopeId2}><strong data-v-94ce1bf9${_scopeId2}>Valid from</strong></td><td data-v-94ce1bf9${_scopeId2}>2024-10-01</td></tr><tr data-v-94ce1bf9${_scopeId2}><td data-v-94ce1bf9${_scopeId2}><strong data-v-94ce1bf9${_scopeId2}>Valid until</strong></td><td data-v-94ce1bf9${_scopeId2}>2039-09-28</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Field"),
                          createVNode("th", null, "Value")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "Distinguished Name")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "C=AE, O=Nebras Open Finance Company, OU=Al Tareq Trust Framework, CN=Al Tareq Production Trust Framework Root CA - G1")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "PEM")
                          ]),
                          createVNode("td", null, [
                            createVNode("a", { href: "https://crl.pki.openfinance.ae/root-ca.pem" }, [
                              createVNode("code", null, "https://crl.pki.openfinance.ae/root-ca.pem")
                            ])
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "Algorithm")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("RSA 2048, signed with "),
                            createVNode("code", null, "sha512WithRSAEncryption")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "Valid from")
                          ]),
                          createVNode("td", null, "2024-10-01")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "Valid until")
                          ]),
                          createVNode("td", null, "2039-09-28")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h4 data-v-94ce1bf9${_scopeId}>Issuing CA</h4>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The subordinate CA that signs all participant certificates on Production (C1, C3, C4, S1, S3, S4, Sig1–Sig4, Enc1, Enc2). `);
                } else {
                  return [
                    createTextVNode(" The subordinate CA that signs all participant certificates on Production (C1, C3, C4, S1, S3, S4, Sig1–Sig4, Enc1, Enc2). ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-94ce1bf9${_scopeId2}><thead data-v-94ce1bf9${_scopeId2}><tr data-v-94ce1bf9${_scopeId2}><th data-v-94ce1bf9${_scopeId2}>Field</th><th data-v-94ce1bf9${_scopeId2}>Value</th></tr></thead><tbody data-v-94ce1bf9${_scopeId2}><tr data-v-94ce1bf9${_scopeId2}><td data-v-94ce1bf9${_scopeId2}><strong data-v-94ce1bf9${_scopeId2}>Distinguished Name</strong></td><td data-v-94ce1bf9${_scopeId2}><code data-v-94ce1bf9${_scopeId2}>C=AE, O=Nebras Open Finance Company, OU=Al Tareq Trust Framework, CN=Al Tareq Production Trust Framework Issuing CA - G1</code></td></tr><tr data-v-94ce1bf9${_scopeId2}><td data-v-94ce1bf9${_scopeId2}><strong data-v-94ce1bf9${_scopeId2}>Issued by</strong></td><td data-v-94ce1bf9${_scopeId2}>Al Tareq Production Trust Framework Root CA - G1</td></tr><tr data-v-94ce1bf9${_scopeId2}><td data-v-94ce1bf9${_scopeId2}><strong data-v-94ce1bf9${_scopeId2}>PEM</strong></td><td data-v-94ce1bf9${_scopeId2}><a href="https://crl.pki.openfinance.ae/issuer-ca.pem" data-v-94ce1bf9${_scopeId2}><code data-v-94ce1bf9${_scopeId2}>https://crl.pki.openfinance.ae/issuer-ca.pem</code></a></td></tr><tr data-v-94ce1bf9${_scopeId2}><td data-v-94ce1bf9${_scopeId2}><strong data-v-94ce1bf9${_scopeId2}>OCSP responder</strong></td><td data-v-94ce1bf9${_scopeId2}><code data-v-94ce1bf9${_scopeId2}>http://ocsp.pki.openfinance.ae</code></td></tr><tr data-v-94ce1bf9${_scopeId2}><td data-v-94ce1bf9${_scopeId2}><strong data-v-94ce1bf9${_scopeId2}>CRL distribution point</strong></td><td data-v-94ce1bf9${_scopeId2}><code data-v-94ce1bf9${_scopeId2}>http://crl.pki.openfinance.ae/issuer.crl</code></td></tr><tr data-v-94ce1bf9${_scopeId2}><td data-v-94ce1bf9${_scopeId2}><strong data-v-94ce1bf9${_scopeId2}>Algorithm</strong></td><td data-v-94ce1bf9${_scopeId2}>RSA 2048, signed with <code data-v-94ce1bf9${_scopeId2}>sha512WithRSAEncryption</code></td></tr><tr data-v-94ce1bf9${_scopeId2}><td data-v-94ce1bf9${_scopeId2}><strong data-v-94ce1bf9${_scopeId2}>Valid from</strong></td><td data-v-94ce1bf9${_scopeId2}>2024-10-01</td></tr><tr data-v-94ce1bf9${_scopeId2}><td data-v-94ce1bf9${_scopeId2}><strong data-v-94ce1bf9${_scopeId2}>Valid until</strong></td><td data-v-94ce1bf9${_scopeId2}>2034-09-29</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Field"),
                          createVNode("th", null, "Value")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "Distinguished Name")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "C=AE, O=Nebras Open Finance Company, OU=Al Tareq Trust Framework, CN=Al Tareq Production Trust Framework Issuing CA - G1")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "Issued by")
                          ]),
                          createVNode("td", null, "Al Tareq Production Trust Framework Root CA - G1")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "PEM")
                          ]),
                          createVNode("td", null, [
                            createVNode("a", { href: "https://crl.pki.openfinance.ae/issuer-ca.pem" }, [
                              createVNode("code", null, "https://crl.pki.openfinance.ae/issuer-ca.pem")
                            ])
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "OCSP responder")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "http://ocsp.pki.openfinance.ae")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "CRL distribution point")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "http://crl.pki.openfinance.ae/issuer.crl")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "Algorithm")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("RSA 2048, signed with "),
                            createVNode("code", null, "sha512WithRSAEncryption")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "Valid from")
                          ]),
                          createVNode("td", null, "2024-10-01")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "Valid until")
                          ]),
                          createVNode("td", null, "2034-09-29")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-94ce1bf9${_scopeId}>Pre-production</h3><h4 data-v-94ce1bf9${_scopeId}>Root CA</h4>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`The self-signed root of trust for the Pre-production PKI.`);
                } else {
                  return [
                    createTextVNode("The self-signed root of trust for the Pre-production PKI.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-94ce1bf9${_scopeId2}><thead data-v-94ce1bf9${_scopeId2}><tr data-v-94ce1bf9${_scopeId2}><th data-v-94ce1bf9${_scopeId2}>Field</th><th data-v-94ce1bf9${_scopeId2}>Value</th></tr></thead><tbody data-v-94ce1bf9${_scopeId2}><tr data-v-94ce1bf9${_scopeId2}><td data-v-94ce1bf9${_scopeId2}><strong data-v-94ce1bf9${_scopeId2}>Distinguished Name</strong></td><td data-v-94ce1bf9${_scopeId2}><code data-v-94ce1bf9${_scopeId2}>C=AE, O=Nebras Open Finance Company, OU=Al Tareq Trust Framework, CN=Al Tareq Sandbox Trust Framework Root CA - G1</code></td></tr><tr data-v-94ce1bf9${_scopeId2}><td data-v-94ce1bf9${_scopeId2}><strong data-v-94ce1bf9${_scopeId2}>PEM</strong></td><td data-v-94ce1bf9${_scopeId2}><a href="https://crl.sandbox.pki.openfinance.ae/root-ca.pem" data-v-94ce1bf9${_scopeId2}><code data-v-94ce1bf9${_scopeId2}>https://crl.sandbox.pki.openfinance.ae/root-ca.pem</code></a></td></tr><tr data-v-94ce1bf9${_scopeId2}><td data-v-94ce1bf9${_scopeId2}><strong data-v-94ce1bf9${_scopeId2}>Algorithm</strong></td><td data-v-94ce1bf9${_scopeId2}>RSA 2048, signed with <code data-v-94ce1bf9${_scopeId2}>sha512WithRSAEncryption</code></td></tr><tr data-v-94ce1bf9${_scopeId2}><td data-v-94ce1bf9${_scopeId2}><strong data-v-94ce1bf9${_scopeId2}>Valid from</strong></td><td data-v-94ce1bf9${_scopeId2}>2024-08-22</td></tr><tr data-v-94ce1bf9${_scopeId2}><td data-v-94ce1bf9${_scopeId2}><strong data-v-94ce1bf9${_scopeId2}>Valid until</strong></td><td data-v-94ce1bf9${_scopeId2}>2039-08-19</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Field"),
                          createVNode("th", null, "Value")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "Distinguished Name")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "C=AE, O=Nebras Open Finance Company, OU=Al Tareq Trust Framework, CN=Al Tareq Sandbox Trust Framework Root CA - G1")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "PEM")
                          ]),
                          createVNode("td", null, [
                            createVNode("a", { href: "https://crl.sandbox.pki.openfinance.ae/root-ca.pem" }, [
                              createVNode("code", null, "https://crl.sandbox.pki.openfinance.ae/root-ca.pem")
                            ])
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "Algorithm")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("RSA 2048, signed with "),
                            createVNode("code", null, "sha512WithRSAEncryption")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "Valid from")
                          ]),
                          createVNode("td", null, "2024-08-22")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "Valid until")
                          ]),
                          createVNode("td", null, "2039-08-19")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h4 data-v-94ce1bf9${_scopeId}>Issuing CA</h4>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`The subordinate CA that signs all participant certificates on Pre-production.`);
                } else {
                  return [
                    createTextVNode("The subordinate CA that signs all participant certificates on Pre-production.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-94ce1bf9${_scopeId2}><thead data-v-94ce1bf9${_scopeId2}><tr data-v-94ce1bf9${_scopeId2}><th data-v-94ce1bf9${_scopeId2}>Field</th><th data-v-94ce1bf9${_scopeId2}>Value</th></tr></thead><tbody data-v-94ce1bf9${_scopeId2}><tr data-v-94ce1bf9${_scopeId2}><td data-v-94ce1bf9${_scopeId2}><strong data-v-94ce1bf9${_scopeId2}>Distinguished Name</strong></td><td data-v-94ce1bf9${_scopeId2}><code data-v-94ce1bf9${_scopeId2}>C=AE, O=Nebras Open Finance Company, OU=Al Tareq Trust Framework, CN=Al Tareq Sandbox Trust Framework Issuing CA - G1</code></td></tr><tr data-v-94ce1bf9${_scopeId2}><td data-v-94ce1bf9${_scopeId2}><strong data-v-94ce1bf9${_scopeId2}>Issued by</strong></td><td data-v-94ce1bf9${_scopeId2}>Al Tareq Sandbox Trust Framework Root CA - G1</td></tr><tr data-v-94ce1bf9${_scopeId2}><td data-v-94ce1bf9${_scopeId2}><strong data-v-94ce1bf9${_scopeId2}>PEM</strong></td><td data-v-94ce1bf9${_scopeId2}><a href="https://crl.sandbox.pki.openfinance.ae/issuer-ca.pem" data-v-94ce1bf9${_scopeId2}><code data-v-94ce1bf9${_scopeId2}>https://crl.sandbox.pki.openfinance.ae/issuer-ca.pem</code></a></td></tr><tr data-v-94ce1bf9${_scopeId2}><td data-v-94ce1bf9${_scopeId2}><strong data-v-94ce1bf9${_scopeId2}>OCSP responder</strong></td><td data-v-94ce1bf9${_scopeId2}><code data-v-94ce1bf9${_scopeId2}>http://ocsp.sandbox.pki.openfinance.ae</code></td></tr><tr data-v-94ce1bf9${_scopeId2}><td data-v-94ce1bf9${_scopeId2}><strong data-v-94ce1bf9${_scopeId2}>CRL distribution point</strong></td><td data-v-94ce1bf9${_scopeId2}><code data-v-94ce1bf9${_scopeId2}>http://crl.sandbox.pki.openfinance.ae/issuer.crl</code></td></tr><tr data-v-94ce1bf9${_scopeId2}><td data-v-94ce1bf9${_scopeId2}><strong data-v-94ce1bf9${_scopeId2}>Algorithm</strong></td><td data-v-94ce1bf9${_scopeId2}>RSA 2048, signed with <code data-v-94ce1bf9${_scopeId2}>sha512WithRSAEncryption</code></td></tr><tr data-v-94ce1bf9${_scopeId2}><td data-v-94ce1bf9${_scopeId2}><strong data-v-94ce1bf9${_scopeId2}>Valid from</strong></td><td data-v-94ce1bf9${_scopeId2}>2024-08-22</td></tr><tr data-v-94ce1bf9${_scopeId2}><td data-v-94ce1bf9${_scopeId2}><strong data-v-94ce1bf9${_scopeId2}>Valid until</strong></td><td data-v-94ce1bf9${_scopeId2}>2034-08-20</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Field"),
                          createVNode("th", null, "Value")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "Distinguished Name")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "C=AE, O=Nebras Open Finance Company, OU=Al Tareq Trust Framework, CN=Al Tareq Sandbox Trust Framework Issuing CA - G1")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "Issued by")
                          ]),
                          createVNode("td", null, "Al Tareq Sandbox Trust Framework Root CA - G1")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "PEM")
                          ]),
                          createVNode("td", null, [
                            createVNode("a", { href: "https://crl.sandbox.pki.openfinance.ae/issuer-ca.pem" }, [
                              createVNode("code", null, "https://crl.sandbox.pki.openfinance.ae/issuer-ca.pem")
                            ])
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "OCSP responder")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "http://ocsp.sandbox.pki.openfinance.ae")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "CRL distribution point")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "http://crl.sandbox.pki.openfinance.ae/issuer.crl")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "Algorithm")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("RSA 2048, signed with "),
                            createVNode("code", null, "sha512WithRSAEncryption")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "Valid from")
                          ]),
                          createVNode("td", null, "2024-08-22")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "Valid until")
                          ]),
                          createVNode("td", null, "2034-08-20")
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
                  createTextVNode("Each API Hub environment pairs with a distinct Trust Framework PKI:")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Production"),
                    createTextVNode(" API Hub → "),
                    createVNode("strong", null, "Production"),
                    createTextVNode(" Trust Framework")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Pre-production"),
                    createTextVNode(" API Hub → "),
                    createVNode("strong", null, "Sandbox"),
                    createTextVNode(" Trust Framework")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" To validate the API Hub's C4 client certificate, the LFI MUST configure its Ozone Connect server with the Root and Issuing CA of the Trust Framework that pairs with the API Hub environment in use. ")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Production"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The Production API Hub uses certificates issued by the "),
                  createVNode("strong", null, "Production Trust Framework"),
                  createTextVNode(". Its CAs are below. ")
                ]),
                _: 1
              }),
              createVNode("h4", null, "Root CA"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("The self-signed root of trust for the Production Trust Framework PKI.")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Field"),
                        createVNode("th", null, "Value")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "Distinguished Name")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "C=AE, O=Nebras Open Finance Company, OU=Al Tareq Trust Framework, CN=Al Tareq Production Trust Framework Root CA - G1")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "PEM")
                        ]),
                        createVNode("td", null, [
                          createVNode("a", { href: "https://crl.pki.openfinance.ae/root-ca.pem" }, [
                            createVNode("code", null, "https://crl.pki.openfinance.ae/root-ca.pem")
                          ])
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "Algorithm")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("RSA 2048, signed with "),
                          createVNode("code", null, "sha512WithRSAEncryption")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "Valid from")
                        ]),
                        createVNode("td", null, "2024-10-01")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "Valid until")
                        ]),
                        createVNode("td", null, "2039-09-28")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h4", null, "Issuing CA"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The subordinate CA that signs all participant certificates on Production (C1, C3, C4, S1, S3, S4, Sig1–Sig4, Enc1, Enc2). ")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Field"),
                        createVNode("th", null, "Value")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "Distinguished Name")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "C=AE, O=Nebras Open Finance Company, OU=Al Tareq Trust Framework, CN=Al Tareq Production Trust Framework Issuing CA - G1")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "Issued by")
                        ]),
                        createVNode("td", null, "Al Tareq Production Trust Framework Root CA - G1")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "PEM")
                        ]),
                        createVNode("td", null, [
                          createVNode("a", { href: "https://crl.pki.openfinance.ae/issuer-ca.pem" }, [
                            createVNode("code", null, "https://crl.pki.openfinance.ae/issuer-ca.pem")
                          ])
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "OCSP responder")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "http://ocsp.pki.openfinance.ae")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "CRL distribution point")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "http://crl.pki.openfinance.ae/issuer.crl")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "Algorithm")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("RSA 2048, signed with "),
                          createVNode("code", null, "sha512WithRSAEncryption")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "Valid from")
                        ]),
                        createVNode("td", null, "2024-10-01")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "Valid until")
                        ]),
                        createVNode("td", null, "2034-09-29")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "Pre-production"),
              createVNode("h4", null, "Root CA"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("The self-signed root of trust for the Pre-production PKI.")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Field"),
                        createVNode("th", null, "Value")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "Distinguished Name")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "C=AE, O=Nebras Open Finance Company, OU=Al Tareq Trust Framework, CN=Al Tareq Sandbox Trust Framework Root CA - G1")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "PEM")
                        ]),
                        createVNode("td", null, [
                          createVNode("a", { href: "https://crl.sandbox.pki.openfinance.ae/root-ca.pem" }, [
                            createVNode("code", null, "https://crl.sandbox.pki.openfinance.ae/root-ca.pem")
                          ])
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "Algorithm")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("RSA 2048, signed with "),
                          createVNode("code", null, "sha512WithRSAEncryption")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "Valid from")
                        ]),
                        createVNode("td", null, "2024-08-22")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "Valid until")
                        ]),
                        createVNode("td", null, "2039-08-19")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h4", null, "Issuing CA"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("The subordinate CA that signs all participant certificates on Pre-production.")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Field"),
                        createVNode("th", null, "Value")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "Distinguished Name")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "C=AE, O=Nebras Open Finance Company, OU=Al Tareq Trust Framework, CN=Al Tareq Sandbox Trust Framework Issuing CA - G1")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "Issued by")
                        ]),
                        createVNode("td", null, "Al Tareq Sandbox Trust Framework Root CA - G1")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "PEM")
                        ]),
                        createVNode("td", null, [
                          createVNode("a", { href: "https://crl.sandbox.pki.openfinance.ae/issuer-ca.pem" }, [
                            createVNode("code", null, "https://crl.sandbox.pki.openfinance.ae/issuer-ca.pem")
                          ])
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "OCSP responder")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "http://ocsp.sandbox.pki.openfinance.ae")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "CRL distribution point")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "http://crl.sandbox.pki.openfinance.ae/issuer.crl")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "Algorithm")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("RSA 2048, signed with "),
                          createVNode("code", null, "sha512WithRSAEncryption")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "Valid from")
                        ]),
                        createVNode("td", null, "2024-08-22")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "Valid until")
                        ]),
                        createVNode("td", null, "2034-08-20")
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
        id: "configuring-server",
        num: "03",
        color: "var(--at-blue-deep, #1d4ed8)",
        eyebrow: "Configuring your Ozone Connect server",
        title: "Trust the CA bundle, pin to the API Hub's C4 OU",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Inbound mTLS configuration has two parts:`);
                } else {
                  return [
                    createTextVNode("Inbound mTLS configuration has two parts:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-94ce1bf9${_scopeId2}><strong data-v-94ce1bf9${_scopeId2}>Trust the Trust Framework CA bundle</strong> so the handshake accepts C4 and is rejected for anything not signed by the Trust Framework.</li><li data-v-94ce1bf9${_scopeId2}><strong data-v-94ce1bf9${_scopeId2}>Pin the connection to the API Hub&#39;s C4 client</strong> so that a certificate signed by the same Trust Framework — but belonging to a different participant — cannot reach your endpoints.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Trust the Trust Framework CA bundle"),
                      createTextVNode(" so the handshake accepts C4 and is rejected for anything not signed by the Trust Framework.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Pin the connection to the API Hub's C4 client"),
                      createTextVNode(" so that a certificate signed by the same Trust Framework — but belonging to a different participant — cannot reach your endpoints.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 id="trust-ca-bundle" data-v-94ce1bf9${_scopeId}>3a. Trust the CA bundle</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Assemble a single PEM bundle containing the <strong data-v-94ce1bf9${_scopeId2}>Issuing CA</strong> first, then the <strong data-v-94ce1bf9${_scopeId2}>Root CA</strong>. This bundle is what your TLS-terminating component loads as its trusted client-CA file. `);
                } else {
                  return [
                    createTextVNode(" Assemble a single PEM bundle containing the "),
                    createVNode("strong", null, "Issuing CA"),
                    createTextVNode(" first, then the "),
                    createVNode("strong", null, "Root CA"),
                    createTextVNode(". This bundle is what your TLS-terminating component loads as its trusted client-CA file. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "tip",
              title: "Bundle for Pre-production"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_EdCode, {
                    lang: "bash",
                    code: bundlePreprodCmd
                  }, null, _parent3, _scopeId2));
                  _push3(`<p data-v-94ce1bf9${_scopeId2}>For Production, fetch the equivalent files from <code data-v-94ce1bf9${_scopeId2}>https://crl.pki.openfinance.ae/</code>.</p>`);
                } else {
                  return [
                    createVNode(_component_EdCode, {
                      lang: "bash",
                      code: bundlePreprodCmd
                    }),
                    createVNode("p", null, [
                      createTextVNode("For Production, fetch the equivalent files from "),
                      createVNode("code", null, "https://crl.pki.openfinance.ae/"),
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
                  _push3(` Configure the component that terminates TLS in front of Ozone Connect to <strong data-v-94ce1bf9${_scopeId2}>require</strong> a client certificate and to validate it against this bundle. The LFI is responsible for mapping the requirement to their own infrastructure — common patterns include: `);
                } else {
                  return [
                    createTextVNode(" Configure the component that terminates TLS in front of Ozone Connect to "),
                    createVNode("strong", null, "require"),
                    createTextVNode(" a client certificate and to validate it against this bundle. The LFI is responsible for mapping the requirement to their own infrastructure — common patterns include: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-94ce1bf9${_scopeId2}><thead data-v-94ce1bf9${_scopeId2}><tr data-v-94ce1bf9${_scopeId2}><th data-v-94ce1bf9${_scopeId2}>Platform</th><th data-v-94ce1bf9${_scopeId2}>Configuration surface</th></tr></thead><tbody data-v-94ce1bf9${_scopeId2}><tr data-v-94ce1bf9${_scopeId2}><td data-v-94ce1bf9${_scopeId2}><strong data-v-94ce1bf9${_scopeId2}>nginx</strong></td><td data-v-94ce1bf9${_scopeId2}><code data-v-94ce1bf9${_scopeId2}>ssl_client_certificate</code> (path to the bundle) and <code data-v-94ce1bf9${_scopeId2}>ssl_verify_client on</code></td></tr><tr data-v-94ce1bf9${_scopeId2}><td data-v-94ce1bf9${_scopeId2}><strong data-v-94ce1bf9${_scopeId2}>AWS Network Load Balancer / API Gateway</strong></td><td data-v-94ce1bf9${_scopeId2}>Trust store referencing the bundle, with <code data-v-94ce1bf9${_scopeId2}>MutualAuthentication = verify</code></td></tr><tr data-v-94ce1bf9${_scopeId2}><td data-v-94ce1bf9${_scopeId2}><strong data-v-94ce1bf9${_scopeId2}>Google Cloud Load Balancing</strong></td><td data-v-94ce1bf9${_scopeId2}>Backend service client TLS policy with a server-side TLS trust configuration</td></tr><tr data-v-94ce1bf9${_scopeId2}><td data-v-94ce1bf9${_scopeId2}><strong data-v-94ce1bf9${_scopeId2}>Azure Application Gateway</strong></td><td data-v-94ce1bf9${_scopeId2}>Trusted client CA certificate on the listener, with client-authentication enabled</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Platform"),
                          createVNode("th", null, "Configuration surface")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "nginx")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "ssl_client_certificate"),
                            createTextVNode(" (path to the bundle) and "),
                            createVNode("code", null, "ssl_verify_client on")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "AWS Network Load Balancer / API Gateway")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("Trust store referencing the bundle, with "),
                            createVNode("code", null, "MutualAuthentication = verify")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "Google Cloud Load Balancing")
                          ]),
                          createVNode("td", null, "Backend service client TLS policy with a server-side TLS trust configuration")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "Azure Application Gateway")
                          ]),
                          createVNode("td", null, "Trusted client CA certificate on the listener, with client-authentication enabled")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "warning",
              title: "Do not rely on the system trust store"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-94ce1bf9${_scopeId2}> The Trust Framework roots are <strong data-v-94ce1bf9${_scopeId2}>private</strong> — they are not present in operating-system or browser trust stores. Your component MUST be configured with the Trust Framework bundle explicitly. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" The Trust Framework roots are "),
                      createVNode("strong", null, "private"),
                      createTextVNode(" — they are not present in operating-system or browser trust stores. Your component MUST be configured with the Trust Framework bundle explicitly. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Once the bundle is in place, the API Hub&#39;s C4 certificate will validate on every inbound call. The handshake will now also validate <strong data-v-94ce1bf9${_scopeId2}>any</strong> other Trust Framework participant&#39;s certificate — which is what section 3b addresses. `);
                } else {
                  return [
                    createTextVNode(" Once the bundle is in place, the API Hub's C4 certificate will validate on every inbound call. The handshake will now also validate "),
                    createVNode("strong", null, "any"),
                    createTextVNode(" other Trust Framework participant's certificate — which is what section 3b addresses. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-94ce1bf9${_scopeId}>3b. Pin to the API Hub&#39;s C4 client</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Trusting the Trust Framework CA means that every TPP, every other LFI, and every client certificate issued by the same Issuing CA satisfies the handshake. To ensure that only the API Hub — and specifically your own API Hub instance&#39;s egress — can reach your Ozone Connect endpoints, the LFI SHOULD additionally pin the connection to the API Hub&#39;s C4 client subject <code data-v-94ce1bf9${_scopeId2}>OU</code>. `);
                } else {
                  return [
                    createTextVNode(" Trusting the Trust Framework CA means that every TPP, every other LFI, and every client certificate issued by the same Issuing CA satisfies the handshake. To ensure that only the API Hub — and specifically your own API Hub instance's egress — can reach your Ozone Connect endpoints, the LFI SHOULD additionally pin the connection to the API Hub's C4 client subject "),
                    createVNode("code", null, "OU"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The subject of the C4 certificate contains the Ozone organisation&#39;s identifier in its <code data-v-94ce1bf9${_scopeId2}>OU</code>. Ozone provides this identifier as part of <a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/#c4-transport-client-certificate" data-v-94ce1bf9${_scopeId2}>environment-specific onboarding</a> — the JWKS URL and KID for C4 are supplied by Ozone on the Service Desk ticket; the OU of the certificate in that keystore is the value to pin against. `);
                } else {
                  return [
                    createTextVNode(" The subject of the C4 certificate contains the Ozone organisation's identifier in its "),
                    createVNode("code", null, "OU"),
                    createTextVNode(". Ozone provides this identifier as part of "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/#c4-transport-client-certificate" }, "environment-specific onboarding"),
                    createTextVNode(" — the JWKS URL and KID for C4 are supplied by Ozone on the Service Desk ticket; the OU of the certificate in that keystore is the value to pin against. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Most reverse proxies expose the client-certificate subject as a variable during the request — for example, nginx exposes <code data-v-94ce1bf9${_scopeId2}>$ssl_client_s_dn</code>. The LFI rejects any request whose client certificate subject <code data-v-94ce1bf9${_scopeId2}>OU</code> does not equal the documented Ozone organisation OU. `);
                } else {
                  return [
                    createTextVNode(" Most reverse proxies expose the client-certificate subject as a variable during the request — for example, nginx exposes "),
                    createVNode("code", null, "$ssl_client_s_dn"),
                    createTextVNode(". The LFI rejects any request whose client certificate subject "),
                    createVNode("code", null, "OU"),
                    createTextVNode(" does not equal the documented Ozone organisation OU. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Pinning by the C4 leaf certificate&#39;s SHA-256 fingerprint is <strong data-v-94ce1bf9${_scopeId2}>not</strong> required. The OU pin above is sufficient and survives C4 rotation without any LFI-side configuration change. `);
                } else {
                  return [
                    createTextVNode(" Pinning by the C4 leaf certificate's SHA-256 fingerprint is "),
                    createVNode("strong", null, "not"),
                    createTextVNode(" required. The OU pin above is sufficient and survives C4 rotation without any LFI-side configuration change. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Inbound mTLS configuration has two parts:")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Trust the Trust Framework CA bundle"),
                    createTextVNode(" so the handshake accepts C4 and is rejected for anything not signed by the Trust Framework.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Pin the connection to the API Hub's C4 client"),
                    createTextVNode(" so that a certificate signed by the same Trust Framework — but belonging to a different participant — cannot reach your endpoints.")
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", { id: "trust-ca-bundle" }, "3a. Trust the CA bundle"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Assemble a single PEM bundle containing the "),
                  createVNode("strong", null, "Issuing CA"),
                  createTextVNode(" first, then the "),
                  createVNode("strong", null, "Root CA"),
                  createTextVNode(". This bundle is what your TLS-terminating component loads as its trusted client-CA file. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "tip",
                title: "Bundle for Pre-production"
              }, {
                default: withCtx(() => [
                  createVNode(_component_EdCode, {
                    lang: "bash",
                    code: bundlePreprodCmd
                  }),
                  createVNode("p", null, [
                    createTextVNode("For Production, fetch the equivalent files from "),
                    createVNode("code", null, "https://crl.pki.openfinance.ae/"),
                    createTextVNode(".")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Configure the component that terminates TLS in front of Ozone Connect to "),
                  createVNode("strong", null, "require"),
                  createTextVNode(" a client certificate and to validate it against this bundle. The LFI is responsible for mapping the requirement to their own infrastructure — common patterns include: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Platform"),
                        createVNode("th", null, "Configuration surface")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "nginx")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "ssl_client_certificate"),
                          createTextVNode(" (path to the bundle) and "),
                          createVNode("code", null, "ssl_verify_client on")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "AWS Network Load Balancer / API Gateway")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("Trust store referencing the bundle, with "),
                          createVNode("code", null, "MutualAuthentication = verify")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "Google Cloud Load Balancing")
                        ]),
                        createVNode("td", null, "Backend service client TLS policy with a server-side TLS trust configuration")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "Azure Application Gateway")
                        ]),
                        createVNode("td", null, "Trusted client CA certificate on the listener, with client-authentication enabled")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "warning",
                title: "Do not rely on the system trust store"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" The Trust Framework roots are "),
                    createVNode("strong", null, "private"),
                    createTextVNode(" — they are not present in operating-system or browser trust stores. Your component MUST be configured with the Trust Framework bundle explicitly. ")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Once the bundle is in place, the API Hub's C4 certificate will validate on every inbound call. The handshake will now also validate "),
                  createVNode("strong", null, "any"),
                  createTextVNode(" other Trust Framework participant's certificate — which is what section 3b addresses. ")
                ]),
                _: 1
              }),
              createVNode("h3", null, "3b. Pin to the API Hub's C4 client"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Trusting the Trust Framework CA means that every TPP, every other LFI, and every client certificate issued by the same Issuing CA satisfies the handshake. To ensure that only the API Hub — and specifically your own API Hub instance's egress — can reach your Ozone Connect endpoints, the LFI SHOULD additionally pin the connection to the API Hub's C4 client subject "),
                  createVNode("code", null, "OU"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The subject of the C4 certificate contains the Ozone organisation's identifier in its "),
                  createVNode("code", null, "OU"),
                  createTextVNode(". Ozone provides this identifier as part of "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/#c4-transport-client-certificate" }, "environment-specific onboarding"),
                  createTextVNode(" — the JWKS URL and KID for C4 are supplied by Ozone on the Service Desk ticket; the OU of the certificate in that keystore is the value to pin against. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Most reverse proxies expose the client-certificate subject as a variable during the request — for example, nginx exposes "),
                  createVNode("code", null, "$ssl_client_s_dn"),
                  createTextVNode(". The LFI rejects any request whose client certificate subject "),
                  createVNode("code", null, "OU"),
                  createTextVNode(" does not equal the documented Ozone organisation OU. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Pinning by the C4 leaf certificate's SHA-256 fingerprint is "),
                  createVNode("strong", null, "not"),
                  createTextVNode(" required. The OU pin above is sufficient and survives C4 rotation without any LFI-side configuration change. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "verification",
        num: "04",
        color: "var(--at-navy)",
        eyebrow: "Verification",
        title: "Both layers must pass connectivity validation",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Ozone verifies both layers of your inbound mTLS configuration end-to-end as part of <a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/#connectivity-validation" data-v-94ce1bf9${_scopeId2}>Connectivity Validation</a>. The API Hub is only considered set up for an environment once <strong data-v-94ce1bf9${_scopeId2}>both</strong> of the following are exercised successfully: `);
                } else {
                  return [
                    createTextVNode(" Ozone verifies both layers of your inbound mTLS configuration end-to-end as part of "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/#connectivity-validation" }, "Connectivity Validation"),
                    createTextVNode(". The API Hub is only considered set up for an environment once "),
                    createVNode("strong", null, "both"),
                    createTextVNode(" of the following are exercised successfully: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-94ce1bf9${_scopeId2}>The CA-trust layer rejects any connection that does not present a Trust Framework-issued client certificate (section 3a).</li><li data-v-94ce1bf9${_scopeId2}>The pinning layer rejects any Trust Framework-issued certificate whose subject OU does not match the API Hub&#39;s C4 organisation OU, and accepts the legitimate C4 certificate (section 3b).</li>`);
                } else {
                  return [
                    createVNode("li", null, "The CA-trust layer rejects any connection that does not present a Trust Framework-issued client certificate (section 3a)."),
                    createVNode("li", null, "The pinning layer rejects any Trust Framework-issued certificate whose subject OU does not match the API Hub's C4 organisation OU, and accepts the legitimate C4 certificate (section 3b).")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` If either case fails, the environment-specific onboarding ticket remains open until the configuration is corrected. `);
                } else {
                  return [
                    createTextVNode(" If either case fails, the environment-specific onboarding ticket remains open until the configuration is corrected. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Ozone verifies both layers of your inbound mTLS configuration end-to-end as part of "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/#connectivity-validation" }, "Connectivity Validation"),
                  createTextVNode(". The API Hub is only considered set up for an environment once "),
                  createVNode("strong", null, "both"),
                  createTextVNode(" of the following are exercised successfully: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "The CA-trust layer rejects any connection that does not present a Trust Framework-issued client certificate (section 3a)."),
                  createVNode("li", null, "The pinning layer rejects any Trust Framework-issued certificate whose subject OU does not match the API Hub's C4 organisation OU, and accepts the legitimate C4 certificate (section 3b).")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" If either case fails, the environment-specific onboarding ticket remains open until the configuration is corrected. ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/v2.1/api-hub/onboarding/configuring-authentication/mtls-server.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const mtlsServer = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-94ce1bf9"]]);
export {
  mtlsServer as default
};
