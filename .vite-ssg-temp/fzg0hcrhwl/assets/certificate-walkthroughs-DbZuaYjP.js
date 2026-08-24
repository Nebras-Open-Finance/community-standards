import { E as EdCode } from "./EdCode-BQ4YLUeg.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_5$1 } from "./Carousel-BiOyohqq.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { defineComponent, resolveComponent, mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const opensslCmd = `openssl req -new -newkey rsa:2048 -nodes \\
  -keyout s4.key \\
  -out s4.csr \\
  -subj "/C=AE/O=<LegalName>/OU=<OrganisationId>/CN=<OrganisationId>" \\
  -sha256`;
const jwksUrlTemplate = `Sandbox:    https://keystore.sandbox.directory.openfinance.ae/{OrganisationId}/transport.jwks
Production: https://keystore.directory.openfinance.ae/{OrganisationId}/transport.jwks`;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "certificate-walkthroughs",
  __ssrInlineRender: true,
  setup(__props) {
    const images1 = [
      { src: new URL("/images/raidiam/s1/1.png", import.meta.url).href, alt: "Step 1", title: "Click into your organisation" },
      { src: new URL("/images/raidiam/s1/2.png", import.meta.url).href, alt: "Step 2", title: "Click into organisation certificates" },
      { src: new URL("/images/raidiam/s1/3.png", import.meta.url).href, alt: "Step 3", title: "Click + New Certificate" }
    ];
    const images2 = [
      { src: new URL("/images/raidiam/s1/4.png", import.meta.url).href, alt: "Step 4", title: "Select the certificate type OPF UAE SERVER TRANSPORT" },
      { src: new URL("/images/raidiam/s1/5.png", import.meta.url).href, alt: "Step 5", title: 'Set the description to "S1 - Ozone holds Private Key - TPP-APIHub"' },
      { src: new URL("/images/raidiam/s1/6.png", import.meta.url).href, alt: "Step 6", title: "Click Next" },
      { src: new URL("/images/raidiam/s1/7.png", import.meta.url).href, alt: "Step 7", title: "Skip the section to generate the CSR and Private Key." },
      { src: new URL("/images/raidiam/s1/8.png", import.meta.url).href, alt: "Step 8", title: "Upload the CSR provided by Ozone in the ticket and click Save" }
    ];
    const images2a = [
      { src: new URL("/images/raidiam/s1/4.png", import.meta.url).href, alt: "Step 4", title: "Select the certificate type OPF UAE SERVER TRANSPORT" },
      { src: new URL("/images/raidiam/s1/12.png", import.meta.url).href, alt: "Step 5", title: "Set the description to S4 - I hold Private Key - APIHub-OzoneConnect" },
      { src: new URL("/images/raidiam/s1/13.png", import.meta.url).href, alt: "Step 6", title: "Click Next" },
      { src: new URL("/images/raidiam/s1/8.png", import.meta.url).href, alt: "Step 8", title: "Upload the CSR generated in step 1." }
    ];
    const images3 = [
      { src: new URL("/images/raidiam/s1/9.png", import.meta.url).href, alt: "Step 9", title: "The KID (Key ID) can be found and copied here" },
      { src: new URL("/images/raidiam/s1/10.png", import.meta.url).href, alt: "Step 10", title: "You can navigate to the Keystore here" },
      { src: new URL("/images/raidiam/s1/11.png", import.meta.url).href, alt: "Step 11", title: "Add then copy the JWKs from the URL" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdBullets = __unplugin_components_5;
      const _component_EdProse = __unplugin_components_4;
      const _component_ClientOnly = resolveComponent("ClientOnly");
      const _component_Carousel = __unplugin_components_5$1;
      const _component_EdNote = __unplugin_components_7;
      const _component_EdCode = EdCode;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-dd798c33><section class="ed-doc__hero" data-v-dd798c33><div class="ed-doc__inner" data-v-dd798c33><div class="ed-doc__eyebrow" data-v-dd798c33><span class="ed-doc__eyebrow-dash" data-v-dd798c33></span> LFI · API Hub · Onboarding · Environment-Specific </div><h1 class="ed-doc__title" data-v-dd798c33> Certificate Walkthroughs <span class="ed-doc__read" data-v-dd798c33>4 min read</span></h1><p class="ed-doc__lede" data-v-dd798c33> This page provides step-by-step walkthroughs for creating certificates required during <a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/" data-v-dd798c33>environment-specific onboarding</a>. </p><p class="ed-doc__lede ed-doc__lede--tight" data-v-dd798c33>Two representative examples are covered:</p></div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "examples-overview",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Examples covered",
        title: "One Ozone-held and one LFI-held certificate",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-dd798c33${_scopeId2}><strong data-v-dd798c33${_scopeId2}>S1</strong> — an Ozone-held certificate where the LFI uploads a CSR provided by Ozone</li><li data-v-dd798c33${_scopeId2}><strong data-v-dd798c33${_scopeId2}>S4</strong> — an LFI-held certificate where the LFI generates the key, CSR, and certificate</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "S1"),
                      createTextVNode(" — an Ozone-held certificate where the LFI uploads a CSR provided by Ozone")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "S4"),
                      createTextVNode(" — an LFI-held certificate where the LFI generates the key, CSR, and certificate")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The same patterns apply to the other certificates listed in the <a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/" data-v-dd798c33${_scopeId2}>Environment Specific Configuration</a> — refer to that page to determine which process applies to each certificate. `);
                } else {
                  return [
                    createTextVNode(" The same patterns apply to the other certificates listed in the "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/" }, "Environment Specific Configuration"),
                    createTextVNode(" — refer to that page to determine which process applies to each certificate. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "S1"),
                    createTextVNode(" — an Ozone-held certificate where the LFI uploads a CSR provided by Ozone")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "S4"),
                    createTextVNode(" — an LFI-held certificate where the LFI generates the key, CSR, and certificate")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The same patterns apply to the other certificates listed in the "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/" }, "Environment Specific Configuration"),
                  createTextVNode(" — refer to that page to determine which process applies to each certificate. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "walkthrough-s1",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "Walkthrough: S1",
        title: "Ozone-held server transport certificate",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<strong data-v-dd798c33${_scopeId2}>S1</strong> identifies the LFI&#39;s API Hub instance to TPPs. Ozone holds the private key and generates the CSR. The LFI uploads the CSR to their Trust Framework organisation to generate the certificate. `);
                } else {
                  return [
                    createVNode("strong", null, "S1"),
                    createTextVNode(" identifies the LFI's API Hub instance to TPPs. Ozone holds the private key and generates the CSR. The LFI uploads the CSR to their Trust Framework organisation to generate the certificate. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-dd798c33${_scopeId}>Prerequisites</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-dd798c33${_scopeId2}>You have received the S1 CSR file from Ozone (provided via the Service Desk ticket).</li><li data-v-dd798c33${_scopeId2}> You are signed in to the correct Trust Framework directory: <ul data-v-dd798c33${_scopeId2}><li data-v-dd798c33${_scopeId2}><strong data-v-dd798c33${_scopeId2}>Pre-production</strong> → Sandbox Trust Framework (<code data-v-dd798c33${_scopeId2}>web.sandbox.directory.openfinance.ae</code>)</li><li data-v-dd798c33${_scopeId2}><strong data-v-dd798c33${_scopeId2}>Production</strong> → Production Trust Framework (<code data-v-dd798c33${_scopeId2}>web.directory.openfinance.ae</code>)</li></ul></li>`);
                } else {
                  return [
                    createVNode("li", null, "You have received the S1 CSR file from Ozone (provided via the Service Desk ticket)."),
                    createVNode("li", null, [
                      createTextVNode(" You are signed in to the correct Trust Framework directory: "),
                      createVNode("ul", null, [
                        createVNode("li", null, [
                          createVNode("strong", null, "Pre-production"),
                          createTextVNode(" → Sandbox Trust Framework ("),
                          createVNode("code", null, "web.sandbox.directory.openfinance.ae"),
                          createTextVNode(")")
                        ]),
                        createVNode("li", null, [
                          createVNode("strong", null, "Production"),
                          createTextVNode(" → Production Trust Framework ("),
                          createVNode("code", null, "web.directory.openfinance.ae"),
                          createTextVNode(")")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-dd798c33${_scopeId}>Steps</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-dd798c33${_scopeId2}>Navigate to your <strong data-v-dd798c33${_scopeId2}>Organisation</strong> in the Trust Framework.</li><li data-v-dd798c33${_scopeId2}>Open the <strong data-v-dd798c33${_scopeId2}>Organisation Certificates</strong> section.</li><li data-v-dd798c33${_scopeId2}>Click <strong data-v-dd798c33${_scopeId2}>+ New Certificate</strong>.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createTextVNode("Navigate to your "),
                      createVNode("strong", null, "Organisation"),
                      createTextVNode(" in the Trust Framework.")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("Open the "),
                      createVNode("strong", null, "Organisation Certificates"),
                      createTextVNode(" section.")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("Click "),
                      createVNode("strong", null, "+ New Certificate"),
                      createTextVNode(".")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_ClientOnly, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Carousel, { images: images1 }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Carousel, { images: images1 })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-dd798c33${_scopeId2}>Select <strong data-v-dd798c33${_scopeId2}>OPF UAE SERVER TRANSPORT</strong> as the certificate type.</li><li data-v-dd798c33${_scopeId2}>Set the description to <strong data-v-dd798c33${_scopeId2}>S1 - Ozone holds Private Key - TPP-APIHub</strong></li><li data-v-dd798c33${_scopeId2}>Skip the step to generate the private key and CSR.</li><li data-v-dd798c33${_scopeId2}>Upload the CSR provided by Ozone.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createTextVNode("Select "),
                      createVNode("strong", null, "OPF UAE SERVER TRANSPORT"),
                      createTextVNode(" as the certificate type.")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("Set the description to "),
                      createVNode("strong", null, "S1 - Ozone holds Private Key - TPP-APIHub")
                    ]),
                    createVNode("li", null, "Skip the step to generate the private key and CSR."),
                    createVNode("li", null, "Upload the CSR provided by Ozone.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_ClientOnly, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Carousel, { images: images2 }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Carousel, { images: images2 })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-dd798c33${_scopeId2}> The Trust Framework will generate the certificate. Once complete, the certificate detail page will display: <ul data-v-dd798c33${_scopeId2}><li data-v-dd798c33${_scopeId2}>The <strong data-v-dd798c33${_scopeId2}>Key ID (KID)</strong> — copy this value exactly as shown (it is case-sensitive).</li><li data-v-dd798c33${_scopeId2}>The <strong data-v-dd798c33${_scopeId2}>JWKS URL</strong> — this is your organisation&#39;s transport JWKS URL.</li></ul></li><li data-v-dd798c33${_scopeId2}>Provide the <strong data-v-dd798c33${_scopeId2}>KID</strong> and <strong data-v-dd798c33${_scopeId2}>JWKS URL</strong> back to Ozone via the Service Desk ticket.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createTextVNode(" The Trust Framework will generate the certificate. Once complete, the certificate detail page will display: "),
                      createVNode("ul", null, [
                        createVNode("li", null, [
                          createTextVNode("The "),
                          createVNode("strong", null, "Key ID (KID)"),
                          createTextVNode(" — copy this value exactly as shown (it is case-sensitive).")
                        ]),
                        createVNode("li", null, [
                          createTextVNode("The "),
                          createVNode("strong", null, "JWKS URL"),
                          createTextVNode(" — this is your organisation's transport JWKS URL.")
                        ])
                      ])
                    ]),
                    createVNode("li", null, [
                      createTextVNode("Provide the "),
                      createVNode("strong", null, "KID"),
                      createTextVNode(" and "),
                      createVNode("strong", null, "JWKS URL"),
                      createTextVNode(" back to Ozone via the Service Desk ticket.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_ClientOnly, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Carousel, { images: images3 }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Carousel, { images: images3 })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "tip",
              title: "Finding the JWKS URL"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-dd798c33${_scopeId2}>Your organisation&#39;s transport JWKS URL follows this pattern:</p>`);
                  _push3(ssrRenderComponent(_component_EdCode, {
                    lang: "text",
                    code: jwksUrlTemplate
                  }, null, _parent3, _scopeId2));
                  _push3(`<p data-v-dd798c33${_scopeId2}>You can also find it on the Organisation Certificates page in the Trust Framework.</p>`);
                } else {
                  return [
                    createVNode("p", null, "Your organisation's transport JWKS URL follows this pattern:"),
                    createVNode(_component_EdCode, {
                      lang: "text",
                      code: jwksUrlTemplate
                    }),
                    createVNode("p", null, "You can also find it on the Organisation Certificates page in the Trust Framework.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-dd798c33${_scopeId}>What happens next</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Ozone will install the certificate (paired with the private key they hold) onto the API Hub servers. TPPs connecting to your API Hub instance will see this certificate during the TLS handshake. `);
                } else {
                  return [
                    createTextVNode(" Ozone will install the certificate (paired with the private key they hold) onto the API Hub servers. TPPs connecting to your API Hub instance will see this certificate during the TLS handshake. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("strong", null, "S1"),
                  createTextVNode(" identifies the LFI's API Hub instance to TPPs. Ozone holds the private key and generates the CSR. The LFI uploads the CSR to their Trust Framework organisation to generate the certificate. ")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Prerequisites"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "You have received the S1 CSR file from Ozone (provided via the Service Desk ticket)."),
                  createVNode("li", null, [
                    createTextVNode(" You are signed in to the correct Trust Framework directory: "),
                    createVNode("ul", null, [
                      createVNode("li", null, [
                        createVNode("strong", null, "Pre-production"),
                        createTextVNode(" → Sandbox Trust Framework ("),
                        createVNode("code", null, "web.sandbox.directory.openfinance.ae"),
                        createTextVNode(")")
                      ]),
                      createVNode("li", null, [
                        createVNode("strong", null, "Production"),
                        createTextVNode(" → Production Trust Framework ("),
                        createVNode("code", null, "web.directory.openfinance.ae"),
                        createTextVNode(")")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "Steps"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createTextVNode("Navigate to your "),
                    createVNode("strong", null, "Organisation"),
                    createTextVNode(" in the Trust Framework.")
                  ]),
                  createVNode("li", null, [
                    createTextVNode("Open the "),
                    createVNode("strong", null, "Organisation Certificates"),
                    createTextVNode(" section.")
                  ]),
                  createVNode("li", null, [
                    createTextVNode("Click "),
                    createVNode("strong", null, "+ New Certificate"),
                    createTextVNode(".")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_ClientOnly, null, {
                default: withCtx(() => [
                  createVNode(_component_Carousel, { images: images1 })
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createTextVNode("Select "),
                    createVNode("strong", null, "OPF UAE SERVER TRANSPORT"),
                    createTextVNode(" as the certificate type.")
                  ]),
                  createVNode("li", null, [
                    createTextVNode("Set the description to "),
                    createVNode("strong", null, "S1 - Ozone holds Private Key - TPP-APIHub")
                  ]),
                  createVNode("li", null, "Skip the step to generate the private key and CSR."),
                  createVNode("li", null, "Upload the CSR provided by Ozone.")
                ]),
                _: 1
              }),
              createVNode(_component_ClientOnly, null, {
                default: withCtx(() => [
                  createVNode(_component_Carousel, { images: images2 })
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createTextVNode(" The Trust Framework will generate the certificate. Once complete, the certificate detail page will display: "),
                    createVNode("ul", null, [
                      createVNode("li", null, [
                        createTextVNode("The "),
                        createVNode("strong", null, "Key ID (KID)"),
                        createTextVNode(" — copy this value exactly as shown (it is case-sensitive).")
                      ]),
                      createVNode("li", null, [
                        createTextVNode("The "),
                        createVNode("strong", null, "JWKS URL"),
                        createTextVNode(" — this is your organisation's transport JWKS URL.")
                      ])
                    ])
                  ]),
                  createVNode("li", null, [
                    createTextVNode("Provide the "),
                    createVNode("strong", null, "KID"),
                    createTextVNode(" and "),
                    createVNode("strong", null, "JWKS URL"),
                    createTextVNode(" back to Ozone via the Service Desk ticket.")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_ClientOnly, null, {
                default: withCtx(() => [
                  createVNode(_component_Carousel, { images: images3 })
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "tip",
                title: "Finding the JWKS URL"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, "Your organisation's transport JWKS URL follows this pattern:"),
                  createVNode(_component_EdCode, {
                    lang: "text",
                    code: jwksUrlTemplate
                  }),
                  createVNode("p", null, "You can also find it on the Organisation Certificates page in the Trust Framework.")
                ]),
                _: 1
              }),
              createVNode("h3", null, "What happens next"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Ozone will install the certificate (paired with the private key they hold) onto the API Hub servers. TPPs connecting to your API Hub instance will see this certificate during the TLS handshake. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "walkthrough-s4",
        num: "03",
        color: "var(--at-blue-deep, #1d4ed8)",
        eyebrow: "Walkthrough: S4",
        title: "LFI-held server transport certificate",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<strong data-v-dd798c33${_scopeId2}>S4</strong> identifies the LFI&#39;s Ozone Connect server to the API Hub. The LFI holds the private key and is responsible for generating the key, CSR, and certificate. `);
                } else {
                  return [
                    createVNode("strong", null, "S4"),
                    createTextVNode(" identifies the LFI's Ozone Connect server to the API Hub. The LFI holds the private key and is responsible for generating the key, CSR, and certificate. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-dd798c33${_scopeId}>Prerequisites</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-dd798c33${_scopeId2}>You have your organisation&#39;s <strong data-v-dd798c33${_scopeId2}>Legal Name</strong> and <strong data-v-dd798c33${_scopeId2}>Organisation ID</strong> from the Trust Framework.</li><li data-v-dd798c33${_scopeId2}> You are signed in to the correct Trust Framework directory: <ul data-v-dd798c33${_scopeId2}><li data-v-dd798c33${_scopeId2}><strong data-v-dd798c33${_scopeId2}>Pre-production</strong> → Sandbox Trust Framework (<code data-v-dd798c33${_scopeId2}>web.sandbox.directory.openfinance.ae</code>)</li><li data-v-dd798c33${_scopeId2}><strong data-v-dd798c33${_scopeId2}>Production</strong> → Production Trust Framework (<code data-v-dd798c33${_scopeId2}>web.directory.openfinance.ae</code>)</li></ul></li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createTextVNode("You have your organisation's "),
                      createVNode("strong", null, "Legal Name"),
                      createTextVNode(" and "),
                      createVNode("strong", null, "Organisation ID"),
                      createTextVNode(" from the Trust Framework.")
                    ]),
                    createVNode("li", null, [
                      createTextVNode(" You are signed in to the correct Trust Framework directory: "),
                      createVNode("ul", null, [
                        createVNode("li", null, [
                          createVNode("strong", null, "Pre-production"),
                          createTextVNode(" → Sandbox Trust Framework ("),
                          createVNode("code", null, "web.sandbox.directory.openfinance.ae"),
                          createTextVNode(")")
                        ]),
                        createVNode("li", null, [
                          createVNode("strong", null, "Production"),
                          createTextVNode(" → Production Trust Framework ("),
                          createVNode("code", null, "web.directory.openfinance.ae"),
                          createTextVNode(")")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-dd798c33${_scopeId}>Step 1 — Generate the private key and CSR</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Generate a 2048-bit RSA private key and a SHA-256 signed CSR. The CSR subject fields MUST match your Trust Framework organisation details: `);
                } else {
                  return [
                    createTextVNode(" Generate a 2048-bit RSA private key and a SHA-256 signed CSR. The CSR subject fields MUST match your Trust Framework organisation details: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              lang: "bash",
              code: opensslCmd
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Replace:`);
                } else {
                  return [
                    createTextVNode("Replace:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-dd798c33${_scopeId2}><code data-v-dd798c33${_scopeId2}>&lt;LegalName&gt;</code> with your organisation&#39;s legal name as it appears in the Trust Framework</li><li data-v-dd798c33${_scopeId2}><code data-v-dd798c33${_scopeId2}>&lt;OrganisationId&gt;</code> with your organisation&#39;s ID from the Trust Framework</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("code", null, "<LegalName>"),
                      createTextVNode(" with your organisation's legal name as it appears in the Trust Framework")
                    ]),
                    createVNode("li", null, [
                      createVNode("code", null, "<OrganisationId>"),
                      createTextVNode(" with your organisation's ID from the Trust Framework")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "warning",
              title: "Production environments"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-dd798c33${_scopeId2}> The OpenSSL command shown is for demonstration. In production, private key generation and CSR creation MUST be performed within your HSM or equivalent secure key management infrastructure, in accordance with your institution&#39;s security policies. </p>`);
                } else {
                  return [
                    createVNode("p", null, " The OpenSSL command shown is for demonstration. In production, private key generation and CSR creation MUST be performed within your HSM or equivalent secure key management infrastructure, in accordance with your institution's security policies. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Store the <code data-v-dd798c33${_scopeId2}>.key</code> file securely — it MUST never be shared. See <a href="/policy/secure-management" data-v-dd798c33${_scopeId2}>Secure Management</a> for requirements. `);
                } else {
                  return [
                    createTextVNode(" Store the "),
                    createVNode("code", null, ".key"),
                    createTextVNode(" file securely — it MUST never be shared. See "),
                    createVNode("a", { href: "/policy/secure-management" }, "Secure Management"),
                    createTextVNode(" for requirements. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-dd798c33${_scopeId}>Step 2 — Upload the CSR to the Trust Framework</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-dd798c33${_scopeId2}>Navigate to your <strong data-v-dd798c33${_scopeId2}>Organisation</strong> in the Trust Framework.</li><li data-v-dd798c33${_scopeId2}>Open the <strong data-v-dd798c33${_scopeId2}>Organisation Certificates</strong> section.</li><li data-v-dd798c33${_scopeId2}>Click <strong data-v-dd798c33${_scopeId2}>+ New Certificate</strong>.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createTextVNode("Navigate to your "),
                      createVNode("strong", null, "Organisation"),
                      createTextVNode(" in the Trust Framework.")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("Open the "),
                      createVNode("strong", null, "Organisation Certificates"),
                      createTextVNode(" section.")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("Click "),
                      createVNode("strong", null, "+ New Certificate"),
                      createTextVNode(".")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_ClientOnly, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Carousel, { images: images1 }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Carousel, { images: images1 })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-dd798c33${_scopeId2}>Select <strong data-v-dd798c33${_scopeId2}>OPF UAE SERVER TRANSPORT</strong> as the certificate type.</li><li data-v-dd798c33${_scopeId2}>Set the description to <strong data-v-dd798c33${_scopeId2}>S4 - I hold Private Key - APIHub-OzoneConnect</strong></li><li data-v-dd798c33${_scopeId2}>Click <strong data-v-dd798c33${_scopeId2}>Next</strong>.</li><li data-v-dd798c33${_scopeId2}>Upload the <code data-v-dd798c33${_scopeId2}>.csr</code> file generated in Step 1.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createTextVNode("Select "),
                      createVNode("strong", null, "OPF UAE SERVER TRANSPORT"),
                      createTextVNode(" as the certificate type.")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("Set the description to "),
                      createVNode("strong", null, "S4 - I hold Private Key - APIHub-OzoneConnect")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("Click "),
                      createVNode("strong", null, "Next"),
                      createTextVNode(".")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("Upload the "),
                      createVNode("code", null, ".csr"),
                      createTextVNode(" file generated in Step 1.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_ClientOnly, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Carousel, { images: images2a }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Carousel, { images: images2a })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-dd798c33${_scopeId}>Step 3 — Record the KID and JWKS URL</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Once the Trust Framework processes the CSR:`);
                } else {
                  return [
                    createTextVNode("Once the Trust Framework processes the CSR:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-dd798c33${_scopeId2}>The certificate detail page will display the <strong data-v-dd798c33${_scopeId2}>Key ID (KID)</strong> — copy this value exactly (case-sensitive).</li><li data-v-dd798c33${_scopeId2}>Note your organisation&#39;s <strong data-v-dd798c33${_scopeId2}>transport JWKS URL</strong>.</li><li data-v-dd798c33${_scopeId2}>Provide the <strong data-v-dd798c33${_scopeId2}>KID</strong> and <strong data-v-dd798c33${_scopeId2}>JWKS URL</strong> to Ozone via the Service Desk ticket.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createTextVNode("The certificate detail page will display the "),
                      createVNode("strong", null, "Key ID (KID)"),
                      createTextVNode(" — copy this value exactly (case-sensitive).")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("Note your organisation's "),
                      createVNode("strong", null, "transport JWKS URL"),
                      createTextVNode(".")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("Provide the "),
                      createVNode("strong", null, "KID"),
                      createTextVNode(" and "),
                      createVNode("strong", null, "JWKS URL"),
                      createTextVNode(" to Ozone via the Service Desk ticket.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_ClientOnly, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Carousel, { images: images3 }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Carousel, { images: images3 })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "tip",
              title: "Finding the JWKS URL"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-dd798c33${_scopeId2}>Your organisation&#39;s transport JWKS URL follows this pattern:</p>`);
                  _push3(ssrRenderComponent(_component_EdCode, {
                    lang: "text",
                    code: jwksUrlTemplate
                  }, null, _parent3, _scopeId2));
                  _push3(`<p data-v-dd798c33${_scopeId2}>You can also find it on the Organisation Certificates page in the Trust Framework.</p>`);
                } else {
                  return [
                    createVNode("p", null, "Your organisation's transport JWKS URL follows this pattern:"),
                    createVNode(_component_EdCode, {
                      lang: "text",
                      code: jwksUrlTemplate
                    }),
                    createVNode("p", null, "You can also find it on the Organisation Certificates page in the Trust Framework.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-dd798c33${_scopeId}>Step 4 — Deploy the certificate</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Deploy the certificate (<code data-v-dd798c33${_scopeId2}>.pem</code>) and private key (<code data-v-dd798c33${_scopeId2}>.key</code>) to your Ozone Connect server infrastructure. The API Hub will validate this certificate during mTLS connections to your Ozone Connect endpoints. `);
                } else {
                  return [
                    createTextVNode(" Deploy the certificate ("),
                    createVNode("code", null, ".pem"),
                    createTextVNode(") and private key ("),
                    createVNode("code", null, ".key"),
                    createTextVNode(") to your Ozone Connect server infrastructure. The API Hub will validate this certificate during mTLS connections to your Ozone Connect endpoints. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` For detailed guidance on generating keys and certificates in the Trust Framework, see <a href="/tech/lfi-api-hub/trust-framework/certificates/" data-v-dd798c33${_scopeId2}>Keys &amp; Certificates</a>. `);
                } else {
                  return [
                    createTextVNode(" For detailed guidance on generating keys and certificates in the Trust Framework, see "),
                    createVNode("a", { href: "/tech/lfi-api-hub/trust-framework/certificates/" }, "Keys & Certificates"),
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
                  createVNode("strong", null, "S4"),
                  createTextVNode(" identifies the LFI's Ozone Connect server to the API Hub. The LFI holds the private key and is responsible for generating the key, CSR, and certificate. ")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Prerequisites"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createTextVNode("You have your organisation's "),
                    createVNode("strong", null, "Legal Name"),
                    createTextVNode(" and "),
                    createVNode("strong", null, "Organisation ID"),
                    createTextVNode(" from the Trust Framework.")
                  ]),
                  createVNode("li", null, [
                    createTextVNode(" You are signed in to the correct Trust Framework directory: "),
                    createVNode("ul", null, [
                      createVNode("li", null, [
                        createVNode("strong", null, "Pre-production"),
                        createTextVNode(" → Sandbox Trust Framework ("),
                        createVNode("code", null, "web.sandbox.directory.openfinance.ae"),
                        createTextVNode(")")
                      ]),
                      createVNode("li", null, [
                        createVNode("strong", null, "Production"),
                        createTextVNode(" → Production Trust Framework ("),
                        createVNode("code", null, "web.directory.openfinance.ae"),
                        createTextVNode(")")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "Step 1 — Generate the private key and CSR"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Generate a 2048-bit RSA private key and a SHA-256 signed CSR. The CSR subject fields MUST match your Trust Framework organisation details: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                lang: "bash",
                code: opensslCmd
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Replace:")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("code", null, "<LegalName>"),
                    createTextVNode(" with your organisation's legal name as it appears in the Trust Framework")
                  ]),
                  createVNode("li", null, [
                    createVNode("code", null, "<OrganisationId>"),
                    createTextVNode(" with your organisation's ID from the Trust Framework")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "warning",
                title: "Production environments"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, " The OpenSSL command shown is for demonstration. In production, private key generation and CSR creation MUST be performed within your HSM or equivalent secure key management infrastructure, in accordance with your institution's security policies. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Store the "),
                  createVNode("code", null, ".key"),
                  createTextVNode(" file securely — it MUST never be shared. See "),
                  createVNode("a", { href: "/policy/secure-management" }, "Secure Management"),
                  createTextVNode(" for requirements. ")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Step 2 — Upload the CSR to the Trust Framework"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createTextVNode("Navigate to your "),
                    createVNode("strong", null, "Organisation"),
                    createTextVNode(" in the Trust Framework.")
                  ]),
                  createVNode("li", null, [
                    createTextVNode("Open the "),
                    createVNode("strong", null, "Organisation Certificates"),
                    createTextVNode(" section.")
                  ]),
                  createVNode("li", null, [
                    createTextVNode("Click "),
                    createVNode("strong", null, "+ New Certificate"),
                    createTextVNode(".")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_ClientOnly, null, {
                default: withCtx(() => [
                  createVNode(_component_Carousel, { images: images1 })
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createTextVNode("Select "),
                    createVNode("strong", null, "OPF UAE SERVER TRANSPORT"),
                    createTextVNode(" as the certificate type.")
                  ]),
                  createVNode("li", null, [
                    createTextVNode("Set the description to "),
                    createVNode("strong", null, "S4 - I hold Private Key - APIHub-OzoneConnect")
                  ]),
                  createVNode("li", null, [
                    createTextVNode("Click "),
                    createVNode("strong", null, "Next"),
                    createTextVNode(".")
                  ]),
                  createVNode("li", null, [
                    createTextVNode("Upload the "),
                    createVNode("code", null, ".csr"),
                    createTextVNode(" file generated in Step 1.")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_ClientOnly, null, {
                default: withCtx(() => [
                  createVNode(_component_Carousel, { images: images2a })
                ]),
                _: 1
              }),
              createVNode("h3", null, "Step 3 — Record the KID and JWKS URL"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Once the Trust Framework processes the CSR:")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createTextVNode("The certificate detail page will display the "),
                    createVNode("strong", null, "Key ID (KID)"),
                    createTextVNode(" — copy this value exactly (case-sensitive).")
                  ]),
                  createVNode("li", null, [
                    createTextVNode("Note your organisation's "),
                    createVNode("strong", null, "transport JWKS URL"),
                    createTextVNode(".")
                  ]),
                  createVNode("li", null, [
                    createTextVNode("Provide the "),
                    createVNode("strong", null, "KID"),
                    createTextVNode(" and "),
                    createVNode("strong", null, "JWKS URL"),
                    createTextVNode(" to Ozone via the Service Desk ticket.")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_ClientOnly, null, {
                default: withCtx(() => [
                  createVNode(_component_Carousel, { images: images3 })
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "tip",
                title: "Finding the JWKS URL"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, "Your organisation's transport JWKS URL follows this pattern:"),
                  createVNode(_component_EdCode, {
                    lang: "text",
                    code: jwksUrlTemplate
                  }),
                  createVNode("p", null, "You can also find it on the Organisation Certificates page in the Trust Framework.")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Step 4 — Deploy the certificate"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Deploy the certificate ("),
                  createVNode("code", null, ".pem"),
                  createTextVNode(") and private key ("),
                  createVNode("code", null, ".key"),
                  createTextVNode(") to your Ozone Connect server infrastructure. The API Hub will validate this certificate during mTLS connections to your Ozone Connect endpoints. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" For detailed guidance on generating keys and certificates in the Trust Framework, see "),
                  createVNode("a", { href: "/tech/lfi-api-hub/trust-framework/certificates/" }, "Keys & Certificates"),
                  createTextVNode(". ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/certificate-walkthroughs.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const certificateWalkthroughs = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-dd798c33"]]);
export {
  certificateWalkthroughs as default
};
