import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { I as ImageViewer } from "./ImageViewer-DmHTopUf.js";
import { _ as __unplugin_components_5$1 } from "./Carousel-BiOyohqq.js";
import { _ as __unplugin_components_3$1 } from "./TPPPostmanScriptBuilder-Dq-KSItw.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { defineComponent, resolveComponent, mergeProps, withCtx, createVNode, createTextVNode, unref, toDisplayString, openBlock, createBlock, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { u as useModelBankCredentials } from "./useModelBankCredentials-1SpmpfIl.js";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "./FormInput-BzoE1TtY.js";
import "vue-router";
import "vite-ssg";
import "axios";
import "@unhead/vue";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { currentVersion, currentCredentials: creds } = useModelBankCredentials();
    const images1 = [
      { src: new URL("/images/postman/postman_1_spotlight.png", import.meta.url).href, alt: "Step 1", title: "Import" },
      { src: new URL("/images/postman/post_spotlight.png", import.meta.url).href, alt: "Step 2", title: "Import" }
    ];
    const images2 = [
      { src: new URL("/images/postman/postman_2_spotlight.png", import.meta.url).href, alt: "Step 1", title: "Settings" },
      { src: new URL("/images/postman/postman_3_spotlight.png", import.meta.url).href, alt: "Step 2", title: "Certificates" },
      { src: new URL("/images/postman/postman_4_spotlight.png", import.meta.url).href, alt: "Step 3", title: "Add Certificate" },
      { src: new URL("/images/postman/postman_5_spotlight.png", import.meta.url).href, alt: "Step 3", title: "Host, Client Transport CRT (.pem), Client Transport KEY (.key)" }
    ];
    const images3 = [
      { src: new URL("/images/postman/first-flow-sip/1.png", import.meta.url).href, alt: "Step 1", title: "Navigate to Single Instant Payment → Auth Flow and send O3 Util: Prepare Encrypted PII" },
      { src: new URL("/images/postman/first-flow-sip/2.png", import.meta.url).href, alt: "Step 2", title: "Send O3 Util: Prepare Request Object JWT" },
      { src: new URL("/images/postman/first-flow-sip/3.png", import.meta.url).href, alt: "Step 3", title: "Send O3 Util: Prepare Private Key JWT" }
    ];
    const images4 = [
      { src: new URL("/images/postman/first-flow-sip/4.png", import.meta.url).href, alt: "Step 1", title: "Send POST /par to stage the payment consent" },
      { src: new URL("/images/postman/first-flow-sip/5_spotlight.png", import.meta.url).href, alt: "Step 2", title: "Click Visualize to render the /par response as a redirect link" },
      { src: new URL("/images/postman/first-flow-sip/6.png", import.meta.url).href, alt: "Step 3", title: "Copy the link and open it in a browser to redirect the user to the LFI" }
    ];
    const images5 = [
      { src: new URL("/images/postman/first-flow-sip/7.png", import.meta.url).href, alt: "Step 1", title: "Authenticate with the LFI" },
      { src: new URL("/images/postman/first-flow-sip/8.png", import.meta.url).href, alt: "Step 2", title: "Select the account to debit for the payment" },
      { src: new URL("/images/postman/first-flow-sip/9.png", import.meta.url).href, alt: "Step 3", title: "Authorize the payment consent" }
    ];
    const images6 = [
      { src: new URL("/images/postman/first-flow-sip/10.png", import.meta.url).href, alt: "Step 1", title: "Copy the `code` parameter from the redirect URL" },
      { src: new URL("/images/postman/first-flow-sip/11.png", import.meta.url).href, alt: "Step 2", title: "Set the `authorizationCode` collection variable in Postman" },
      { src: new URL("/images/postman/first-flow-sip/12.png", import.meta.url).href, alt: "Step 3", title: "Send the token request to exchange the code for an access token" }
    ];
    const images7 = [
      { src: new URL("/images/postman/first-flow-sip/13.png", import.meta.url).href, alt: "Step 1", title: "Navigate to the Payments folder and send O3 Util: Prepare Encrypted PII" },
      { src: new URL("/images/postman/first-flow-sip/14.png", import.meta.url).href, alt: "Step 2", title: "Send O3 Util: Prepare Request Object JWT for SIP" },
      { src: new URL("/images/postman/first-flow-sip/15.png", import.meta.url).href, alt: "Step 3", title: "Send POST /payments — a 201 confirms the payment was initiated" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdBullets = __unplugin_components_5;
      const _component_EdProse = __unplugin_components_4;
      const _component_TPPPostmanScriptBuilder = __unplugin_components_3$1;
      const _component_ClientOnly = resolveComponent("ClientOnly");
      const _component_Carousel = __unplugin_components_5$1;
      const _component_ImageViewer = ImageViewer;
      const _component_EdNote = __unplugin_components_7;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-9bdb2df3><section class="ed-doc__hero" data-v-9bdb2df3><div class="ed-doc__inner" data-v-9bdb2df3><div class="ed-doc__eyebrow" data-v-9bdb2df3><span class="ed-doc__eyebrow-dash" data-v-9bdb2df3></span> TPP · Getting Started · Sandbox </div><h1 class="ed-doc__title" data-v-9bdb2df3> Getting Started for TPPs (Sandbox) <span class="ed-doc__read" data-v-9bdb2df3>6 min read</span></h1><p class="ed-doc__lede" data-v-9bdb2df3> A guided walkthrough that takes you from a freshly onboarded sandbox application to a successful end-to-end payment, using the Postman collection and the included O3 sandbox utilities. </p></div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "prerequisites",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Prerequisites",
        title: "Before you start",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-9bdb2df3${_scopeId2}> You are onboarded to the sandbox Trust Framework. If not, see <a href="/tech/tpp-standards/trust-framework/onboarding" data-v-9bdb2df3${_scopeId2}>Trust Framework Onboarding</a>. </li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createTextVNode(" You are onboarded to the sandbox Trust Framework. If not, see "),
                      createVNode("a", { href: "/tech/tpp-standards/trust-framework/onboarding" }, "Trust Framework Onboarding"),
                      createTextVNode(". ")
                    ])
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
                    createTextVNode(" You are onboarded to the sandbox Trust Framework. If not, see "),
                    createVNode("a", { href: "/tech/tpp-standards/trust-framework/onboarding" }, "Trust Framework Onboarding"),
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
        id: "postman-collection",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "Postman Collection (Sandbox)",
        title: "Generate a personalised Postman script",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Fill in the values below using an Application (Client) you have created in the <strong data-v-9bdb2df3${_scopeId2}>Sandbox Trust Framework</strong>. `);
                } else {
                  return [
                    createTextVNode(" Fill in the values below using an Application (Client) you have created in the "),
                    createVNode("strong", null, "Sandbox Trust Framework"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_TPPPostmanScriptBuilder, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Fill in the values below using an Application (Client) you have created in the "),
                  createVNode("strong", null, "Sandbox Trust Framework"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode(_component_TPPPostmanScriptBuilder)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "setting-up-postman",
        num: "03",
        color: "var(--at-blue-deep, #1d4ed8)",
        eyebrow: "Setting Up Postman",
        title: "Install, import, and configure mTLS",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<ol class="ed-doc__steps" data-v-9bdb2df3${_scopeId}><li data-v-9bdb2df3${_scopeId}><h3 data-v-9bdb2df3${_scopeId}>Install Postman</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Download Postman from <a href="https://www.postman.com/downloads/" data-v-9bdb2df3${_scopeId2}>postman.com/downloads</a>. Launch Postman and sign in (or create a free account). `);
                } else {
                  return [
                    createTextVNode(" Download Postman from "),
                    createVNode("a", { href: "https://www.postman.com/downloads/" }, "postman.com/downloads"),
                    createTextVNode(". Launch Postman and sign in (or create a free account). ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</li><li data-v-9bdb2df3${_scopeId}><h3 data-v-9bdb2df3${_scopeId}>Import the collection</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-9bdb2df3${_scopeId2}>In Postman, click <strong data-v-9bdb2df3${_scopeId2}>Import</strong> (top left).</li><li data-v-9bdb2df3${_scopeId2}>Select the downloaded <code data-v-9bdb2df3${_scopeId2}>.json</code> file.</li><li data-v-9bdb2df3${_scopeId2}>The collection will appear in your Collections sidebar.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createTextVNode("In Postman, click "),
                      createVNode("strong", null, "Import"),
                      createTextVNode(" (top left).")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("Select the downloaded "),
                      createVNode("code", null, ".json"),
                      createTextVNode(" file.")
                    ]),
                    createVNode("li", null, "The collection will appear in your Collections sidebar.")
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
            _push2(`</li><li data-v-9bdb2df3${_scopeId}><h3 data-v-9bdb2df3${_scopeId}>Configure mTLS certificates in Postman</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-9bdb2df3${_scopeId2}>Open Postman settings: gear icon (top right) → <strong data-v-9bdb2df3${_scopeId2}>Settings</strong> → <strong data-v-9bdb2df3${_scopeId2}>Certificates</strong> tab.</li><li data-v-9bdb2df3${_scopeId2}>Click <strong data-v-9bdb2df3${_scopeId2}>Add Certificate</strong>.</li><li data-v-9bdb2df3${_scopeId2}> Enter the host of the LFI Discovery URL, e.g. <code data-v-9bdb2df3${_scopeId2}>*.altareq1.sandbox.apihub.openfinance.ae</code> or <code data-v-9bdb2df3${_scopeId2}>*.[LFI CODE].preprod.apihub.openfinance.ae</code>. Leave port blank (defaults to 443). </li><li data-v-9bdb2df3${_scopeId2}>Attach <strong data-v-9bdb2df3${_scopeId2}>CRT</strong>: <code data-v-9bdb2df3${_scopeId2}>client_transport.pem</code>.</li><li data-v-9bdb2df3${_scopeId2}>Attach <strong data-v-9bdb2df3${_scopeId2}>KEY</strong>: <code data-v-9bdb2df3${_scopeId2}>client_transport.key</code>.</li><li data-v-9bdb2df3${_scopeId2}>Save the certificate entry.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createTextVNode("Open Postman settings: gear icon (top right) → "),
                      createVNode("strong", null, "Settings"),
                      createTextVNode(" → "),
                      createVNode("strong", null, "Certificates"),
                      createTextVNode(" tab.")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("Click "),
                      createVNode("strong", null, "Add Certificate"),
                      createTextVNode(".")
                    ]),
                    createVNode("li", null, [
                      createTextVNode(" Enter the host of the LFI Discovery URL, e.g. "),
                      createVNode("code", null, "*.altareq1.sandbox.apihub.openfinance.ae"),
                      createTextVNode(" or "),
                      createVNode("code", null, "*.[LFI CODE].preprod.apihub.openfinance.ae"),
                      createTextVNode(". Leave port blank (defaults to 443). ")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("Attach "),
                      createVNode("strong", null, "CRT"),
                      createTextVNode(": "),
                      createVNode("code", null, "client_transport.pem"),
                      createTextVNode(".")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("Attach "),
                      createVNode("strong", null, "KEY"),
                      createTextVNode(": "),
                      createVNode("code", null, "client_transport.key"),
                      createTextVNode(".")
                    ]),
                    createVNode("li", null, "Save the certificate entry.")
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
            _push2(`<h4 data-v-9bdb2df3${_scopeId}>Test by registering</h4>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Send a request to the TPP&#39;s registration endpoint. A <code data-v-9bdb2df3${_scopeId2}>204 (No Content)</code> response confirms the certificate is correctly attached. `);
                } else {
                  return [
                    createTextVNode(" Send a request to the TPP's registration endpoint. A "),
                    createVNode("code", null, "204 (No Content)"),
                    createTextVNode(" response confirms the certificate is correctly attached. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_ImageViewer, {
              src: "/images/postman/register_spotlight.png",
              alt: "Postman Registration Request"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, { class: "ed-doc__note" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<em data-v-9bdb2df3${_scopeId2}>Note: if you are testing multiple LFIs in sandbox/pre-prod you may need to change the host in the Add Certificate step.</em>`);
                } else {
                  return [
                    createVNode("em", null, "Note: if you are testing multiple LFIs in sandbox/pre-prod you may need to change the host in the Add Certificate step.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</li></ol>`);
          } else {
            return [
              createVNode("ol", { class: "ed-doc__steps" }, [
                createVNode("li", null, [
                  createVNode("h3", null, "Install Postman"),
                  createVNode(_component_EdProse, null, {
                    default: withCtx(() => [
                      createTextVNode(" Download Postman from "),
                      createVNode("a", { href: "https://www.postman.com/downloads/" }, "postman.com/downloads"),
                      createTextVNode(". Launch Postman and sign in (or create a free account). ")
                    ]),
                    _: 1
                  })
                ]),
                createVNode("li", null, [
                  createVNode("h3", null, "Import the collection"),
                  createVNode(_component_EdBullets, null, {
                    default: withCtx(() => [
                      createVNode("li", null, [
                        createTextVNode("In Postman, click "),
                        createVNode("strong", null, "Import"),
                        createTextVNode(" (top left).")
                      ]),
                      createVNode("li", null, [
                        createTextVNode("Select the downloaded "),
                        createVNode("code", null, ".json"),
                        createTextVNode(" file.")
                      ]),
                      createVNode("li", null, "The collection will appear in your Collections sidebar.")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_ClientOnly, null, {
                    default: withCtx(() => [
                      createVNode(_component_Carousel, { images: images1 })
                    ]),
                    _: 1
                  })
                ]),
                createVNode("li", null, [
                  createVNode("h3", null, "Configure mTLS certificates in Postman"),
                  createVNode(_component_EdBullets, null, {
                    default: withCtx(() => [
                      createVNode("li", null, [
                        createTextVNode("Open Postman settings: gear icon (top right) → "),
                        createVNode("strong", null, "Settings"),
                        createTextVNode(" → "),
                        createVNode("strong", null, "Certificates"),
                        createTextVNode(" tab.")
                      ]),
                      createVNode("li", null, [
                        createTextVNode("Click "),
                        createVNode("strong", null, "Add Certificate"),
                        createTextVNode(".")
                      ]),
                      createVNode("li", null, [
                        createTextVNode(" Enter the host of the LFI Discovery URL, e.g. "),
                        createVNode("code", null, "*.altareq1.sandbox.apihub.openfinance.ae"),
                        createTextVNode(" or "),
                        createVNode("code", null, "*.[LFI CODE].preprod.apihub.openfinance.ae"),
                        createTextVNode(". Leave port blank (defaults to 443). ")
                      ]),
                      createVNode("li", null, [
                        createTextVNode("Attach "),
                        createVNode("strong", null, "CRT"),
                        createTextVNode(": "),
                        createVNode("code", null, "client_transport.pem"),
                        createTextVNode(".")
                      ]),
                      createVNode("li", null, [
                        createTextVNode("Attach "),
                        createVNode("strong", null, "KEY"),
                        createTextVNode(": "),
                        createVNode("code", null, "client_transport.key"),
                        createTextVNode(".")
                      ]),
                      createVNode("li", null, "Save the certificate entry.")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_ClientOnly, null, {
                    default: withCtx(() => [
                      createVNode(_component_Carousel, { images: images2 })
                    ]),
                    _: 1
                  }),
                  createVNode("h4", null, "Test by registering"),
                  createVNode(_component_EdProse, null, {
                    default: withCtx(() => [
                      createTextVNode(" Send a request to the TPP's registration endpoint. A "),
                      createVNode("code", null, "204 (No Content)"),
                      createTextVNode(" response confirms the certificate is correctly attached. ")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_ImageViewer, {
                    src: "/images/postman/register_spotlight.png",
                    alt: "Postman Registration Request"
                  }),
                  createVNode(_component_EdProse, { class: "ed-doc__note" }, {
                    default: withCtx(() => [
                      createVNode("em", null, "Note: if you are testing multiple LFIs in sandbox/pre-prod you may need to change the host in the Add Certificate step.")
                    ]),
                    _: 1
                  })
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "first-requests",
        num: "04",
        color: "var(--at-navy)",
        eyebrow: "Your First Open Finance Requests",
        title: "An end-to-end Single Instant Payment in the sandbox",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<ol class="ed-doc__steps" data-v-9bdb2df3${_scopeId}><li data-v-9bdb2df3${_scopeId}><h3 data-v-9bdb2df3${_scopeId}>Prepare the requests for /par</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Navigate to the <strong data-v-9bdb2df3${_scopeId2}>Auth Flow</strong> folder within <strong data-v-9bdb2df3${_scopeId2}>Single Instant Payment</strong> and run the three <a href="/tech/tpp-standards/security/fapi/o3-utils" data-v-9bdb2df3${_scopeId2}>O3 utility requests</a> in order: `);
                } else {
                  return [
                    createTextVNode(" Navigate to the "),
                    createVNode("strong", null, "Auth Flow"),
                    createTextVNode(" folder within "),
                    createVNode("strong", null, "Single Instant Payment"),
                    createTextVNode(" and run the three "),
                    createVNode("a", { href: "/tech/tpp-standards/security/fapi/o3-utils" }, "O3 utility requests"),
                    createTextVNode(" in order: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<ol class="ed-doc__substeps" data-v-9bdb2df3${_scopeId}><li data-v-9bdb2df3${_scopeId}>Send <strong data-v-9bdb2df3${_scopeId}>O3 Util: Prepare Encrypted PII</strong> — encrypts the <a href="/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information/" data-v-9bdb2df3${_scopeId}>PII payload</a> required for the consent.</li><li data-v-9bdb2df3${_scopeId}>Send <strong data-v-9bdb2df3${_scopeId}>O3 Util: Prepare Request Object JWT</strong> — builds the <a href="/tech/tpp-standards/security/fapi/request-jwt" data-v-9bdb2df3${_scopeId}>signed request object</a> for the <code data-v-9bdb2df3${_scopeId}>/par</code> call.</li><li data-v-9bdb2df3${_scopeId}>Send <strong data-v-9bdb2df3${_scopeId}>O3 Util: Prepare Private Key JWT</strong> — creates the client assertion used for authentication.</li></ol>`);
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
            _push2(`</li><li data-v-9bdb2df3${_scopeId}><h3 data-v-9bdb2df3${_scopeId}>Stage the consent and redirect to the LFI</h3><ol class="ed-doc__substeps" data-v-9bdb2df3${_scopeId}><li data-v-9bdb2df3${_scopeId}>Send the <a href="/tech/tpp-standards/v2.1/consent/open-api/par" class="endpoint" data-v-9bdb2df3${_scopeId}><span class="http-method http-method--post" data-v-9bdb2df3${_scopeId}>POST</span><code data-v-9bdb2df3${_scopeId}>/par</code></a> request to stage the payment consent.</li><li data-v-9bdb2df3${_scopeId}>Click <strong data-v-9bdb2df3${_scopeId}>Visualize</strong> in the Postman response panel — this renders the response as a clickable redirect link.</li><li data-v-9bdb2df3${_scopeId}>Copy the link and open it in a browser to start the authorization redirect to the LFI.</li></ol>`);
            _push2(ssrRenderComponent(_component_ClientOnly, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Carousel, { images: images4 }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Carousel, { images: images4 })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</li><li data-v-9bdb2df3${_scopeId}><h3 data-v-9bdb2df3${_scopeId}>Authenticate and authorize</h3><ol class="ed-doc__substeps" data-v-9bdb2df3${_scopeId}><li data-v-9bdb2df3${_scopeId}>Authenticate with the LFI.</li></ol>`);
            if (unref(creds)) {
              _push2(ssrRenderComponent(_component_EdNote, {
                type: "tip",
                title: `Model Bank Credentials (${unref(currentVersion)})`
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<p data-v-9bdb2df3${_scopeId2}> If you are using the <a href="/tech/tpp-standards/sandbox/model-bank" data-v-9bdb2df3${_scopeId2}>Model Bank</a>, the sandbox credentials are: </p><table class="ed-doc__creds" data-v-9bdb2df3${_scopeId2}><thead data-v-9bdb2df3${_scopeId2}><tr data-v-9bdb2df3${_scopeId2}><th data-v-9bdb2df3${_scopeId2}>Username</th><th data-v-9bdb2df3${_scopeId2}>Password</th></tr></thead><tbody data-v-9bdb2df3${_scopeId2}><tr data-v-9bdb2df3${_scopeId2}><td data-v-9bdb2df3${_scopeId2}><code data-v-9bdb2df3${_scopeId2}>${ssrInterpolate(unref(creds).username)}</code></td><td data-v-9bdb2df3${_scopeId2}><code data-v-9bdb2df3${_scopeId2}>${ssrInterpolate(unref(creds).password)}</code></td></tr></tbody></table>`);
                  } else {
                    return [
                      createVNode("p", null, [
                        createTextVNode(" If you are using the "),
                        createVNode("a", { href: "/tech/tpp-standards/sandbox/model-bank" }, "Model Bank"),
                        createTextVNode(", the sandbox credentials are: ")
                      ]),
                      createVNode("table", { class: "ed-doc__creds" }, [
                        createVNode("thead", null, [
                          createVNode("tr", null, [
                            createVNode("th", null, "Username"),
                            createVNode("th", null, "Password")
                          ])
                        ]),
                        createVNode("tbody", null, [
                          createVNode("tr", null, [
                            createVNode("td", null, [
                              createVNode("code", null, toDisplayString(unref(creds).username), 1)
                            ]),
                            createVNode("td", null, [
                              createVNode("code", null, toDisplayString(unref(creds).password), 1)
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
              _push2(`<!---->`);
            }
            _push2(`<ol class="ed-doc__substeps" start="2" data-v-9bdb2df3${_scopeId}><li data-v-9bdb2df3${_scopeId}>Select the account to debit and authorize the payment consent.</li></ol>`);
            _push2(ssrRenderComponent(_component_ClientOnly, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Carousel, { images: images5 }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Carousel, { images: images5 })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</li><li data-v-9bdb2df3${_scopeId}><h3 data-v-9bdb2df3${_scopeId}>Exchange the authorization code for a token</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` After the LFI redirects back to your <code data-v-9bdb2df3${_scopeId2}>redirect_uri</code>, the URL will contain a <code data-v-9bdb2df3${_scopeId2}>code</code> query parameter. `);
                } else {
                  return [
                    createTextVNode(" After the LFI redirects back to your "),
                    createVNode("code", null, "redirect_uri"),
                    createTextVNode(", the URL will contain a "),
                    createVNode("code", null, "code"),
                    createTextVNode(" query parameter. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<ol class="ed-doc__substeps" data-v-9bdb2df3${_scopeId}><li data-v-9bdb2df3${_scopeId}>Copy the <code data-v-9bdb2df3${_scopeId}>code</code> value from the redirect URL.</li><li data-v-9bdb2df3${_scopeId}>Set it as the <code data-v-9bdb2df3${_scopeId}>authorizationCode</code> <a href="/tech/tpp-standards/security/tokens/" data-v-9bdb2df3${_scopeId}>collection variable</a> in Postman.</li><li data-v-9bdb2df3${_scopeId}>Send the <strong data-v-9bdb2df3${_scopeId}>token request</strong> to exchange the code for an access token.</li></ol>`);
            _push2(ssrRenderComponent(_component_ClientOnly, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Carousel, { images: images6 }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Carousel, { images: images6 })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</li><li data-v-9bdb2df3${_scopeId}><h3 data-v-9bdb2df3${_scopeId}>Initiate the payment</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Navigate to the <strong data-v-9bdb2df3${_scopeId2}>Payments</strong> folder and run the O3 utility requests, then submit the payment: `);
                } else {
                  return [
                    createTextVNode(" Navigate to the "),
                    createVNode("strong", null, "Payments"),
                    createTextVNode(" folder and run the O3 utility requests, then submit the payment: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<ol class="ed-doc__substeps" data-v-9bdb2df3${_scopeId}><li data-v-9bdb2df3${_scopeId}>Send <strong data-v-9bdb2df3${_scopeId}>O3 Util: Prepare Encrypted PII</strong> — encrypts the <a href="/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information/" data-v-9bdb2df3${_scopeId}>payment PII</a>.</li><li data-v-9bdb2df3${_scopeId}>Send <strong data-v-9bdb2df3${_scopeId}>O3 Util: Prepare Request Object JWT for SIP</strong> — builds the signed request object for the payment.</li><li data-v-9bdb2df3${_scopeId}>Send <a href="/tech/tpp-standards/v2.1/banking/service-initiation/open-api/payments" class="endpoint" data-v-9bdb2df3${_scopeId}><span class="http-method http-method--post" data-v-9bdb2df3${_scopeId}>POST</span><code data-v-9bdb2df3${_scopeId}>/payments</code></a>.</li></ol>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`A <code data-v-9bdb2df3${_scopeId2}>201</code> response confirms the payment was successfully initiated.`);
                } else {
                  return [
                    createTextVNode("A "),
                    createVNode("code", null, "201"),
                    createTextVNode(" response confirms the payment was successfully initiated.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_ClientOnly, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Carousel, { images: images7 }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Carousel, { images: images7 })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</li><li data-v-9bdb2df3${_scopeId}><h3 data-v-9bdb2df3${_scopeId}>Retrieve the Payment ID and status</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Decode the <a href="/knowledge-base/articles/jwt-claims" data-v-9bdb2df3${_scopeId2}>JWT</a> received in the <span class="endpoint" data-v-9bdb2df3${_scopeId2}><span class="http-method http-method--post" data-v-9bdb2df3${_scopeId2}>POST</span><code data-v-9bdb2df3${_scopeId2}>/payments</code></span> response to retrieve the <code data-v-9bdb2df3${_scopeId2}>PaymentId</code> and <code data-v-9bdb2df3${_scopeId2}>Status</code>. The status will typically start as <code data-v-9bdb2df3${_scopeId2}>Pending</code>. `);
                } else {
                  return [
                    createTextVNode(" Decode the "),
                    createVNode("a", { href: "/knowledge-base/articles/jwt-claims" }, "JWT"),
                    createTextVNode(" received in the "),
                    createVNode("span", { class: "endpoint" }, [
                      createVNode("span", { class: "http-method http-method--post" }, "POST"),
                      createVNode("code", null, "/payments")
                    ]),
                    createTextVNode(" response to retrieve the "),
                    createVNode("code", null, "PaymentId"),
                    createTextVNode(" and "),
                    createVNode("code", null, "Status"),
                    createTextVNode(". The status will typically start as "),
                    createVNode("code", null, "Pending"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_ImageViewer, {
              src: "/images/postman/first-flow-sip/16.png",
              alt: "Decoded payment response JWT showing PaymentId and Status"
            }, null, _parent2, _scopeId));
            _push2(`</li></ol>`);
          } else {
            return [
              createVNode("ol", { class: "ed-doc__steps" }, [
                createVNode("li", null, [
                  createVNode("h3", null, "Prepare the requests for /par"),
                  createVNode(_component_EdProse, null, {
                    default: withCtx(() => [
                      createTextVNode(" Navigate to the "),
                      createVNode("strong", null, "Auth Flow"),
                      createTextVNode(" folder within "),
                      createVNode("strong", null, "Single Instant Payment"),
                      createTextVNode(" and run the three "),
                      createVNode("a", { href: "/tech/tpp-standards/security/fapi/o3-utils" }, "O3 utility requests"),
                      createTextVNode(" in order: ")
                    ]),
                    _: 1
                  }),
                  createVNode("ol", { class: "ed-doc__substeps" }, [
                    createVNode("li", null, [
                      createTextVNode("Send "),
                      createVNode("strong", null, "O3 Util: Prepare Encrypted PII"),
                      createTextVNode(" — encrypts the "),
                      createVNode("a", { href: "/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information/" }, "PII payload"),
                      createTextVNode(" required for the consent.")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("Send "),
                      createVNode("strong", null, "O3 Util: Prepare Request Object JWT"),
                      createTextVNode(" — builds the "),
                      createVNode("a", { href: "/tech/tpp-standards/security/fapi/request-jwt" }, "signed request object"),
                      createTextVNode(" for the "),
                      createVNode("code", null, "/par"),
                      createTextVNode(" call.")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("Send "),
                      createVNode("strong", null, "O3 Util: Prepare Private Key JWT"),
                      createTextVNode(" — creates the client assertion used for authentication.")
                    ])
                  ]),
                  createVNode(_component_ClientOnly, null, {
                    default: withCtx(() => [
                      createVNode(_component_Carousel, { images: images3 })
                    ]),
                    _: 1
                  })
                ]),
                createVNode("li", null, [
                  createVNode("h3", null, "Stage the consent and redirect to the LFI"),
                  createVNode("ol", { class: "ed-doc__substeps" }, [
                    createVNode("li", null, [
                      createTextVNode("Send the "),
                      createVNode("a", {
                        href: "/tech/tpp-standards/v2.1/consent/open-api/par",
                        class: "endpoint"
                      }, [
                        createVNode("span", { class: "http-method http-method--post" }, "POST"),
                        createVNode("code", null, "/par")
                      ]),
                      createTextVNode(" request to stage the payment consent.")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("Click "),
                      createVNode("strong", null, "Visualize"),
                      createTextVNode(" in the Postman response panel — this renders the response as a clickable redirect link.")
                    ]),
                    createVNode("li", null, "Copy the link and open it in a browser to start the authorization redirect to the LFI.")
                  ]),
                  createVNode(_component_ClientOnly, null, {
                    default: withCtx(() => [
                      createVNode(_component_Carousel, { images: images4 })
                    ]),
                    _: 1
                  })
                ]),
                createVNode("li", null, [
                  createVNode("h3", null, "Authenticate and authorize"),
                  createVNode("ol", { class: "ed-doc__substeps" }, [
                    createVNode("li", null, "Authenticate with the LFI.")
                  ]),
                  unref(creds) ? (openBlock(), createBlock(_component_EdNote, {
                    key: 0,
                    type: "tip",
                    title: `Model Bank Credentials (${unref(currentVersion)})`
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, [
                        createTextVNode(" If you are using the "),
                        createVNode("a", { href: "/tech/tpp-standards/sandbox/model-bank" }, "Model Bank"),
                        createTextVNode(", the sandbox credentials are: ")
                      ]),
                      createVNode("table", { class: "ed-doc__creds" }, [
                        createVNode("thead", null, [
                          createVNode("tr", null, [
                            createVNode("th", null, "Username"),
                            createVNode("th", null, "Password")
                          ])
                        ]),
                        createVNode("tbody", null, [
                          createVNode("tr", null, [
                            createVNode("td", null, [
                              createVNode("code", null, toDisplayString(unref(creds).username), 1)
                            ]),
                            createVNode("td", null, [
                              createVNode("code", null, toDisplayString(unref(creds).password), 1)
                            ])
                          ])
                        ])
                      ])
                    ]),
                    _: 1
                  }, 8, ["title"])) : createCommentVNode("", true),
                  createVNode("ol", {
                    class: "ed-doc__substeps",
                    start: "2"
                  }, [
                    createVNode("li", null, "Select the account to debit and authorize the payment consent.")
                  ]),
                  createVNode(_component_ClientOnly, null, {
                    default: withCtx(() => [
                      createVNode(_component_Carousel, { images: images5 })
                    ]),
                    _: 1
                  })
                ]),
                createVNode("li", null, [
                  createVNode("h3", null, "Exchange the authorization code for a token"),
                  createVNode(_component_EdProse, null, {
                    default: withCtx(() => [
                      createTextVNode(" After the LFI redirects back to your "),
                      createVNode("code", null, "redirect_uri"),
                      createTextVNode(", the URL will contain a "),
                      createVNode("code", null, "code"),
                      createTextVNode(" query parameter. ")
                    ]),
                    _: 1
                  }),
                  createVNode("ol", { class: "ed-doc__substeps" }, [
                    createVNode("li", null, [
                      createTextVNode("Copy the "),
                      createVNode("code", null, "code"),
                      createTextVNode(" value from the redirect URL.")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("Set it as the "),
                      createVNode("code", null, "authorizationCode"),
                      createTextVNode(),
                      createVNode("a", { href: "/tech/tpp-standards/security/tokens/" }, "collection variable"),
                      createTextVNode(" in Postman.")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("Send the "),
                      createVNode("strong", null, "token request"),
                      createTextVNode(" to exchange the code for an access token.")
                    ])
                  ]),
                  createVNode(_component_ClientOnly, null, {
                    default: withCtx(() => [
                      createVNode(_component_Carousel, { images: images6 })
                    ]),
                    _: 1
                  })
                ]),
                createVNode("li", null, [
                  createVNode("h3", null, "Initiate the payment"),
                  createVNode(_component_EdProse, null, {
                    default: withCtx(() => [
                      createTextVNode(" Navigate to the "),
                      createVNode("strong", null, "Payments"),
                      createTextVNode(" folder and run the O3 utility requests, then submit the payment: ")
                    ]),
                    _: 1
                  }),
                  createVNode("ol", { class: "ed-doc__substeps" }, [
                    createVNode("li", null, [
                      createTextVNode("Send "),
                      createVNode("strong", null, "O3 Util: Prepare Encrypted PII"),
                      createTextVNode(" — encrypts the "),
                      createVNode("a", { href: "/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information/" }, "payment PII"),
                      createTextVNode(".")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("Send "),
                      createVNode("strong", null, "O3 Util: Prepare Request Object JWT for SIP"),
                      createTextVNode(" — builds the signed request object for the payment.")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("Send "),
                      createVNode("a", {
                        href: "/tech/tpp-standards/v2.1/banking/service-initiation/open-api/payments",
                        class: "endpoint"
                      }, [
                        createVNode("span", { class: "http-method http-method--post" }, "POST"),
                        createVNode("code", null, "/payments")
                      ]),
                      createTextVNode(".")
                    ])
                  ]),
                  createVNode(_component_EdProse, null, {
                    default: withCtx(() => [
                      createTextVNode("A "),
                      createVNode("code", null, "201"),
                      createTextVNode(" response confirms the payment was successfully initiated.")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_ClientOnly, null, {
                    default: withCtx(() => [
                      createVNode(_component_Carousel, { images: images7 })
                    ]),
                    _: 1
                  })
                ]),
                createVNode("li", null, [
                  createVNode("h3", null, "Retrieve the Payment ID and status"),
                  createVNode(_component_EdProse, null, {
                    default: withCtx(() => [
                      createTextVNode(" Decode the "),
                      createVNode("a", { href: "/knowledge-base/articles/jwt-claims" }, "JWT"),
                      createTextVNode(" received in the "),
                      createVNode("span", { class: "endpoint" }, [
                        createVNode("span", { class: "http-method http-method--post" }, "POST"),
                        createVNode("code", null, "/payments")
                      ]),
                      createTextVNode(" response to retrieve the "),
                      createVNode("code", null, "PaymentId"),
                      createTextVNode(" and "),
                      createVNode("code", null, "Status"),
                      createTextVNode(". The status will typically start as "),
                      createVNode("code", null, "Pending"),
                      createTextVNode(". ")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_ImageViewer, {
                    src: "/images/postman/first-flow-sip/16.png",
                    alt: "Decoded payment response JWT showing PaymentId and Status"
                  })
                ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/v2.1/getting-started/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9bdb2df3"]]);
export {
  index as default
};
