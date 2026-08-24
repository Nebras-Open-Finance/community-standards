import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { I as ImageViewer } from "./ImageViewer-DmHTopUf.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_0 } from "./CertificationTicketBanner-DF3U_2rx.js";
import { defineComponent, mergeProps, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const certListUrl = "https://openid.net/certification/certified-cbuae-fapi-2-0-rp-message-signing-id1/";
const conformanceSuiteUrl = "https://www.certification.openid.net/";
const howToCertifyUrl = "https://openid.net/how-to-certify-your-implementation/";
const feeScheduleUrl = "https://openid.net/certification/fees/";
const joinOidfUrl = "https://openid.net/foundation/join/";
const membershipUrl = "https://openid.net/foundation/members/";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "fapi",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CertificationTicketBanner = __unplugin_components_0;
      const _component_EdNote = __unplugin_components_7;
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdRefTable = __unplugin_components_12;
      const _component_ImageViewer = ImageViewer;
      const _component_EdBullets = __unplugin_components_5;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-c1b8b5c3><section class="ed-doc__hero" data-v-c1b8b5c3><div class="ed-doc__inner" data-v-c1b8b5c3><div class="ed-doc__eyebrow" data-v-c1b8b5c3><span class="ed-doc__eyebrow-dash" data-v-c1b8b5c3></span> Testing &amp; Certification · FAPI </div><h1 class="ed-doc__title" data-v-c1b8b5c3> FAPI Conformance <span class="ed-doc__read" data-v-c1b8b5c3>2 min read</span></h1><p class="ed-doc__lede" data-v-c1b8b5c3> Every TPP must obtain a <strong data-v-c1b8b5c3>Relying Party (RP) certification</strong> for their application against the <strong data-v-c1b8b5c3>CBUAE FAPI 2.0 Message Signing Profile</strong> before being promoted to production. This certification is issued by the <a href="https://openid.net/" target="_blank" rel="noopener" data-v-c1b8b5c3>OpenID Foundation (OIDF)</a> and is an exit criterion from the API Hub Sandbox. </p></div></section><div class="ed-doc__intro" data-v-c1b8b5c3><div class="ed-doc__inner" data-v-c1b8b5c3>`);
      _push(ssrRenderComponent(_component_CertificationTicketBanner, { "cert-type": "TPP FAPI Certification Evidence" }, null, _parent));
      _push(ssrRenderComponent(_component_EdNote, {
        type: "info",
        title: "Test as a client (Relying Party)"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p data-v-c1b8b5c3${_scopeId}> TPPs integrate as OAuth 2.0 clients — they consume the LFI&#39;s Authorization Server. The correct certification track is therefore the <strong data-v-c1b8b5c3${_scopeId}>Relying Party (RP)</strong> test, not the Authorization Server (AS) test. Selecting the wrong track will produce results that are not accepted. </p>`);
          } else {
            return [
              createVNode("p", null, [
                createTextVNode(" TPPs integrate as OAuth 2.0 clients — they consume the LFI's Authorization Server. The correct certification track is therefore the "),
                createVNode("strong", null, "Relying Party (RP)"),
                createTextVNode(" test, not the Authorization Server (AS) test. Selecting the wrong track will produce results that are not accepted. ")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "cert-required",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Certification Required",
        title: "CBUAE FAPI 2.0 RP Message Signing ID1",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` TPPs must achieve the <strong data-v-c1b8b5c3${_scopeId2}>CBUAE FAPI 2.0 RP Message Signing ID1</strong> certification. A public list of organisations that have already certified is available at: `);
                } else {
                  return [
                    createTextVNode(" TPPs must achieve the "),
                    createVNode("strong", null, "CBUAE FAPI 2.0 RP Message Signing ID1"),
                    createTextVNode(" certification. A public list of organisations that have already certified is available at: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<a${ssrRenderAttr("href", certListUrl)} target="_blank" rel="noopener" data-v-c1b8b5c3${_scopeId2}>${ssrInterpolate(certListUrl)}</a>`);
                } else {
                  return [
                    createVNode("a", {
                      href: certListUrl,
                      target: "_blank",
                      rel: "noopener"
                    }, toDisplayString(certListUrl))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Certification must be renewed for each major new version of the Standards.`);
                } else {
                  return [
                    createTextVNode("Certification must be renewed for each major new version of the Standards.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" TPPs must achieve the "),
                  createVNode("strong", null, "CBUAE FAPI 2.0 RP Message Signing ID1"),
                  createTextVNode(" certification. A public list of organisations that have already certified is available at: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("a", {
                    href: certListUrl,
                    target: "_blank",
                    rel: "noopener"
                  }, toDisplayString(certListUrl))
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Certification must be renewed for each major new version of the Standards.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "running-tests",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "Running the Conformance Tests",
        title: "Configure and run the OIDF test plan",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-c1b8b5c3${_scopeId}>1. Access the Conformance Suite</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The OIDF conformance suite is available at <a${ssrRenderAttr("href", conformanceSuiteUrl)} target="_blank" rel="noopener" data-v-c1b8b5c3${_scopeId2}>www.certification.openid.net</a>. Log in with a Google or GitLab account to create and run test plans. `);
                } else {
                  return [
                    createTextVNode(" The OIDF conformance suite is available at "),
                    createVNode("a", {
                      href: conformanceSuiteUrl,
                      target: "_blank",
                      rel: "noopener"
                    }, "www.certification.openid.net"),
                    createTextVNode(". Log in with a Google or GitLab account to create and run test plans. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-c1b8b5c3${_scopeId}>2. Configure the Test Plan</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`When scheduling a new test, use the following configuration exactly:`);
                } else {
                  return [
                    createTextVNode("When scheduling a new test, use the following configuration exactly:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-c1b8b5c3${_scopeId2}><thead data-v-c1b8b5c3${_scopeId2}><tr data-v-c1b8b5c3${_scopeId2}><th data-v-c1b8b5c3${_scopeId2}>Setting</th><th data-v-c1b8b5c3${_scopeId2}>Value</th></tr></thead><tbody data-v-c1b8b5c3${_scopeId2}><tr data-v-c1b8b5c3${_scopeId2}><td data-v-c1b8b5c3${_scopeId2}><strong data-v-c1b8b5c3${_scopeId2}>Test Plan</strong></td><td data-v-c1b8b5c3${_scopeId2}><code data-v-c1b8b5c3${_scopeId2}>FAPI2-Message-Signing-ID1: Relying Party (client) test</code></td></tr><tr data-v-c1b8b5c3${_scopeId2}><td data-v-c1b8b5c3${_scopeId2}><strong data-v-c1b8b5c3${_scopeId2}>Sender Constraining</strong></td><td data-v-c1b8b5c3${_scopeId2}><code data-v-c1b8b5c3${_scopeId2}>mtls</code></td></tr><tr data-v-c1b8b5c3${_scopeId2}><td data-v-c1b8b5c3${_scopeId2}><strong data-v-c1b8b5c3${_scopeId2}>Client Authentication Type</strong></td><td data-v-c1b8b5c3${_scopeId2}><code data-v-c1b8b5c3${_scopeId2}>private_key_jwt</code></td></tr><tr data-v-c1b8b5c3${_scopeId2}><td data-v-c1b8b5c3${_scopeId2}><strong data-v-c1b8b5c3${_scopeId2}>Authorization Request Type</strong></td><td data-v-c1b8b5c3${_scopeId2}><code data-v-c1b8b5c3${_scopeId2}>rar</code></td></tr><tr data-v-c1b8b5c3${_scopeId2}><td data-v-c1b8b5c3${_scopeId2}><strong data-v-c1b8b5c3${_scopeId2}>Request Method</strong></td><td data-v-c1b8b5c3${_scopeId2}><code data-v-c1b8b5c3${_scopeId2}>signed_non_repudiation</code></td></tr><tr data-v-c1b8b5c3${_scopeId2}><td data-v-c1b8b5c3${_scopeId2}><strong data-v-c1b8b5c3${_scopeId2}>FAPI Client Type</strong></td><td data-v-c1b8b5c3${_scopeId2}><code data-v-c1b8b5c3${_scopeId2}>oidc</code></td></tr><tr data-v-c1b8b5c3${_scopeId2}><td data-v-c1b8b5c3${_scopeId2}><strong data-v-c1b8b5c3${_scopeId2}>FAPI Profile</strong></td><td data-v-c1b8b5c3${_scopeId2}><code data-v-c1b8b5c3${_scopeId2}>cbuae</code></td></tr><tr data-v-c1b8b5c3${_scopeId2}><td data-v-c1b8b5c3${_scopeId2}><strong data-v-c1b8b5c3${_scopeId2}>FAPI Response Mode</strong></td><td data-v-c1b8b5c3${_scopeId2}><code data-v-c1b8b5c3${_scopeId2}>plain_response</code></td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Setting"),
                          createVNode("th", null, "Value")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "Test Plan")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "FAPI2-Message-Signing-ID1: Relying Party (client) test")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "Sender Constraining")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "mtls")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "Client Authentication Type")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "private_key_jwt")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "Authorization Request Type")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "rar")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "Request Method")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "signed_non_repudiation")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "FAPI Client Type")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "oidc")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "FAPI Profile")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "cbuae")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "FAPI Response Mode")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "plain_response")
                          ])
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_ImageViewer, {
              src: "/images/fapi/test-config.png",
              alt: "OIDF Conformance Suite test configuration for CBUAE FAPI 2.0 RP Message Signing ID1"
            }, null, _parent2, _scopeId));
            _push2(`<h3 data-v-c1b8b5c3${_scopeId}>3. Note on Test Data Visibility</h3>`);
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "warning",
              title: "Test data becomes public"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-c1b8b5c3${_scopeId2}> After running the conformance tests, all data used — including public and private keys of certificates and client data from the test — will be made available in the ecosystem and visible to other participants. If you run the certification in a production environment, you must revoke the certificates used during the tests and obtain any required customer consent. It is strongly recommended to use dedicated test certificates. </p>`);
                } else {
                  return [
                    createVNode("p", null, " After running the conformance tests, all data used — including public and private keys of certificates and client data from the test — will be made available in the ecosystem and visible to other participants. If you run the certification in a production environment, you must revoke the certificates used during the tests and obtain any required customer consent. It is strongly recommended to use dedicated test certificates. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-c1b8b5c3${_scopeId}>4. Submit for Certification</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Once tests pass, submit your results to the OIDF for certification. Follow the submission instructions at: `);
                } else {
                  return [
                    createTextVNode(" Once tests pass, submit your results to the OIDF for certification. Follow the submission instructions at: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<a${ssrRenderAttr("href", howToCertifyUrl)} target="_blank" rel="noopener" data-v-c1b8b5c3${_scopeId2}>${ssrInterpolate(howToCertifyUrl)}</a>`);
                } else {
                  return [
                    createVNode("a", {
                      href: howToCertifyUrl,
                      target: "_blank",
                      rel: "noopener"
                    }, toDisplayString(howToCertifyUrl))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, "1. Access the Conformance Suite"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The OIDF conformance suite is available at "),
                  createVNode("a", {
                    href: conformanceSuiteUrl,
                    target: "_blank",
                    rel: "noopener"
                  }, "www.certification.openid.net"),
                  createTextVNode(". Log in with a Google or GitLab account to create and run test plans. ")
                ]),
                _: 1
              }),
              createVNode("h3", null, "2. Configure the Test Plan"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("When scheduling a new test, use the following configuration exactly:")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Setting"),
                        createVNode("th", null, "Value")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "Test Plan")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "FAPI2-Message-Signing-ID1: Relying Party (client) test")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "Sender Constraining")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "mtls")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "Client Authentication Type")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "private_key_jwt")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "Authorization Request Type")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "rar")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "Request Method")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "signed_non_repudiation")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "FAPI Client Type")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "oidc")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "FAPI Profile")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "cbuae")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "FAPI Response Mode")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "plain_response")
                        ])
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_ImageViewer, {
                src: "/images/fapi/test-config.png",
                alt: "OIDF Conformance Suite test configuration for CBUAE FAPI 2.0 RP Message Signing ID1"
              }),
              createVNode("h3", null, "3. Note on Test Data Visibility"),
              createVNode(_component_EdNote, {
                type: "warning",
                title: "Test data becomes public"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, " After running the conformance tests, all data used — including public and private keys of certificates and client data from the test — will be made available in the ecosystem and visible to other participants. If you run the certification in a production environment, you must revoke the certificates used during the tests and obtain any required customer consent. It is strongly recommended to use dedicated test certificates. ")
                ]),
                _: 1
              }),
              createVNode("h3", null, "4. Submit for Certification"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Once tests pass, submit your results to the OIDF for certification. Follow the submission instructions at: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("a", {
                    href: howToCertifyUrl,
                    target: "_blank",
                    rel: "noopener"
                  }, toDisplayString(howToCertifyUrl))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "notify-nebras",
        num: "03",
        color: "var(--at-blue-deep, #1d4ed8)",
        eyebrow: "Notifying Nebras",
        title: "Inform Nebras as soon as the OIDF issues your certification",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` TPPs must inform Nebras <strong data-v-c1b8b5c3${_scopeId2}>immediately</strong> upon receipt of their FAPI Certification from the OIDF. Receipt of certification is an exit criterion from the API Hub Sandbox — production promotion will not proceed until this has been confirmed. `);
                } else {
                  return [
                    createTextVNode(" TPPs must inform Nebras "),
                    createVNode("strong", null, "immediately"),
                    createTextVNode(" upon receipt of their FAPI Certification from the OIDF. Receipt of certification is an exit criterion from the API Hub Sandbox — production promotion will not proceed until this has been confirmed. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" TPPs must inform Nebras "),
                  createVNode("strong", null, "immediately"),
                  createTextVNode(" upon receipt of their FAPI Certification from the OIDF. Receipt of certification is an exit criterion from the API Hub Sandbox — production promotion will not proceed until this has been confirmed. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "fees",
        num: "04",
        color: "var(--at-navy)",
        eyebrow: "Fees",
        title: "Paid directly to the OIDF",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Certification fees are fixed and paid directly to the OIDF. The current fee schedule is available at: `);
                } else {
                  return [
                    createTextVNode(" Certification fees are fixed and paid directly to the OIDF. The current fee schedule is available at: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<a${ssrRenderAttr("href", feeScheduleUrl)} target="_blank" rel="noopener" data-v-c1b8b5c3${_scopeId2}>${ssrInterpolate(feeScheduleUrl)}</a>`);
                } else {
                  return [
                    createVNode("a", {
                      href: feeScheduleUrl,
                      target: "_blank",
                      rel: "noopener"
                    }, toDisplayString(feeScheduleUrl))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Fees are significantly reduced for OIDF members. Institutions that expect to certify multiple implementations or renew frequently may find OIDF membership cost-effective. Membership information and benefits: `);
                } else {
                  return [
                    createTextVNode(" Fees are significantly reduced for OIDF members. Institutions that expect to certify multiple implementations or renew frequently may find OIDF membership cost-effective. Membership information and benefits: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-c1b8b5c3${_scopeId2}><a${ssrRenderAttr("href", joinOidfUrl)} target="_blank" rel="noopener" data-v-c1b8b5c3${_scopeId2}>Join the OpenID Foundation</a></li><li data-v-c1b8b5c3${_scopeId2}><a${ssrRenderAttr("href", membershipUrl)} target="_blank" rel="noopener" data-v-c1b8b5c3${_scopeId2}>Membership fee schedule</a></li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("a", {
                        href: joinOidfUrl,
                        target: "_blank",
                        rel: "noopener"
                      }, "Join the OpenID Foundation")
                    ]),
                    createVNode("li", null, [
                      createVNode("a", {
                        href: membershipUrl,
                        target: "_blank",
                        rel: "noopener"
                      }, "Membership fee schedule")
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
                  createTextVNode(" Certification fees are fixed and paid directly to the OIDF. The current fee schedule is available at: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("a", {
                    href: feeScheduleUrl,
                    target: "_blank",
                    rel: "noopener"
                  }, toDisplayString(feeScheduleUrl))
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Fees are significantly reduced for OIDF members. Institutions that expect to certify multiple implementations or renew frequently may find OIDF membership cost-effective. Membership information and benefits: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("a", {
                      href: joinOidfUrl,
                      target: "_blank",
                      rel: "noopener"
                    }, "Join the OpenID Foundation")
                  ]),
                  createVNode("li", null, [
                    createVNode("a", {
                      href: membershipUrl,
                      target: "_blank",
                      rel: "noopener"
                    }, "Membership fee schedule")
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
        id: "support",
        num: "05",
        color: "var(--at-teal-deep)",
        eyebrow: "Support",
        title: "OIDF certification support",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` For questions about running conformance tests or the certification process, contact the OIDF directly: `);
                } else {
                  return [
                    createTextVNode(" For questions about running conformance tests or the certification process, contact the OIDF directly: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<strong data-v-c1b8b5c3${_scopeId2}>Email:</strong> <a href="mailto:Certification@oidf.org" data-v-c1b8b5c3${_scopeId2}>Certification@oidf.org</a>`);
                } else {
                  return [
                    createVNode("strong", null, "Email:"),
                    createTextVNode(),
                    createVNode("a", { href: "mailto:Certification@oidf.org" }, "Certification@oidf.org")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" For questions about running conformance tests or the certification process, contact the OIDF directly: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("strong", null, "Email:"),
                  createTextVNode(),
                  createVNode("a", { href: "mailto:Certification@oidf.org" }, "Certification@oidf.org")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/production/testing-certification/fapi.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const fapi = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c1b8b5c3"]]);
export {
  fapi as default
};
