import { I as ImageViewer } from "./ImageViewer-DmHTopUf.js";
import { _ as __unplugin_components_5$1 } from "./Carousel-BiOyohqq.js";
import { E as EdCode } from "./EdCode-BQ4YLUeg.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { defineComponent, resolveComponent, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
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
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const images1 = [
      { src: new URL("/images/raidiam/generate-transport-certificate/1.png", import.meta.url).href, alt: "Step 1", title: "Within your application click App Certificates" },
      { src: new URL("/images/raidiam/generate-transport-certificate/2.png", import.meta.url).href, alt: "Step 2", title: "Click + New Certificate" }
    ];
    const images2 = [
      { src: new URL("/images/raidiam/generate-transport-certificate/3.png", import.meta.url).href, alt: "Step 3", title: "Select the certificate type", tagline: "Transport, Signing or Encryption" }
    ];
    const images3 = [
      { src: new URL("/images/raidiam/generate-transport-certificate/4.png", import.meta.url).href, alt: "Step 4", title: "Create a script to generate your private key (.key) and CSR" },
      { src: new URL("/images/raidiam/generate-transport-certificate/5.png", import.meta.url).href, alt: "Step 5", title: "Generate your CSR" },
      { src: new URL("/images/raidiam/generate-transport-certificate/6.png", import.meta.url).href, alt: "Step 6", title: "CSR generated successfully" }
    ];
    const images4 = [
      { src: new URL("/images/raidiam/generate-transport-certificate/7.png", import.meta.url).href, alt: "Step 7", title: "Upload your CSR" },
      { src: new URL("/images/raidiam/generate-transport-certificate/8.png", import.meta.url).href, alt: "Step 8", title: "Select the .csr file to upload" }
    ];
    const images5 = [
      { src: new URL("/images/raidiam/generate-transport-certificate/9.png", import.meta.url).href, alt: "Step 9", title: "Your certificate is generated and ready to be downloaded" },
      { src: new URL("/images/raidiam/generate-transport-certificate/10.png", import.meta.url).href, alt: "Step 10", title: "You now have the certificate (.pem) and key (.key) pair" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdBullets = __unplugin_components_5;
      const _component_EdNote = __unplugin_components_7;
      const _component_EdCode = EdCode;
      const _component_ClientOnly = resolveComponent("ClientOnly");
      const _component_Carousel = __unplugin_components_5$1;
      const _component_ImageViewer = ImageViewer;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-504c59e5><section class="ed-doc__hero" data-v-504c59e5><div class="ed-doc__inner" data-v-504c59e5><div class="ed-doc__eyebrow" data-v-504c59e5><span class="ed-doc__eyebrow-dash" data-v-504c59e5></span> LFI · Trust Framework · Keys &amp; Certificates </div><h1 class="ed-doc__title" data-v-504c59e5> Keys and Certificates <span class="ed-doc__read" data-v-504c59e5>4 min read</span></h1><p class="ed-doc__lede" data-v-504c59e5> To operate within the ecosystem, your application must use certificates issued and stored within the Trust Framework. There are three types of certificates, each serving a distinct security function. </p></div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "cert-types",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Certificate Types",
        title: "Transport and Signing — both required for LFI clients",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` As an LFI, you are required to create two certificate types per application: `);
                } else {
                  return [
                    createTextVNode(" As an LFI, you are required to create two certificate types per application: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-504c59e5${_scopeId}>1. Transport Certificate — Required</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Used for <strong data-v-504c59e5${_scopeId2}>mutual TLS (mTLS)</strong> to authenticate your client (application) when making API requests. `);
                } else {
                  return [
                    createTextVNode(" Used for "),
                    createVNode("strong", null, "mutual TLS (mTLS)"),
                    createTextVNode(" to authenticate your client (application) when making API requests. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-504c59e5${_scopeId2}><strong data-v-504c59e5${_scopeId2}>Purpose:</strong> Secure transport and client authentication</li><li data-v-504c59e5${_scopeId2}><strong data-v-504c59e5${_scopeId2}>Usage:</strong> mTLS handshake for all API calls</li><li data-v-504c59e5${_scopeId2}><strong data-v-504c59e5${_scopeId2}>Presented to:</strong> API providers during connection</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Purpose:"),
                      createTextVNode(" Secure transport and client authentication")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Usage:"),
                      createTextVNode(" mTLS handshake for all API calls")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Presented to:"),
                      createTextVNode(" API providers during connection")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-504c59e5${_scopeId}>2. Signing Certificate — Required</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Used to <strong data-v-504c59e5${_scopeId2}>digitally sign JWTs</strong> your application sends — such as client assertions, request objects, etc. `);
                } else {
                  return [
                    createTextVNode(" Used to "),
                    createVNode("strong", null, "digitally sign JWTs"),
                    createTextVNode(" your application sends — such as client assertions, request objects, etc. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-504c59e5${_scopeId2}><strong data-v-504c59e5${_scopeId2}>Purpose:</strong> Proving integrity and authenticity of signed payloads</li><li data-v-504c59e5${_scopeId2}><strong data-v-504c59e5${_scopeId2}>Usage:</strong> Signing the contents of JWTs</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Purpose:"),
                      createTextVNode(" Proving integrity and authenticity of signed payloads")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Usage:"),
                      createTextVNode(" Signing the contents of JWTs")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "info",
              title: "Encryption certificates"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-504c59e5${_scopeId2}> The Trust Framework also supports an <strong data-v-504c59e5${_scopeId2}>Encryption Certificate</strong>, but this is <strong data-v-504c59e5${_scopeId2}>not required for LFI clients</strong>. Note that the encryption keys you may see on your organisation (e.g. ENC1) are server-side keys used by the platform — these are distinct from application-level encryption certificates. An application-level encryption certificate is only needed by TPPs that wish to receive encrypted webhook event notifications. See <a href="/tech/tpp-standards/v2.1/webhooks/" data-v-504c59e5${_scopeId2}>Webhooks</a> for more information. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" The Trust Framework also supports an "),
                      createVNode("strong", null, "Encryption Certificate"),
                      createTextVNode(", but this is "),
                      createVNode("strong", null, "not required for LFI clients"),
                      createTextVNode(". Note that the encryption keys you may see on your organisation (e.g. ENC1) are server-side keys used by the platform — these are distinct from application-level encryption certificates. An application-level encryption certificate is only needed by TPPs that wish to receive encrypted webhook event notifications. See "),
                      createVNode("a", { href: "/tech/tpp-standards/v2.1/webhooks/" }, "Webhooks"),
                      createTextVNode(" for more information. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Each certificate plays a critical role in securing communication and asserting identity. Once you understand the certificate types, you can generate the required keys and CSRs according to the Trust Framework specifications. `);
                } else {
                  return [
                    createTextVNode(" Each certificate plays a critical role in securing communication and asserting identity. Once you understand the certificate types, you can generate the required keys and CSRs according to the Trust Framework specifications. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" As an LFI, you are required to create two certificate types per application: ")
                ]),
                _: 1
              }),
              createVNode("h3", null, "1. Transport Certificate — Required"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Used for "),
                  createVNode("strong", null, "mutual TLS (mTLS)"),
                  createTextVNode(" to authenticate your client (application) when making API requests. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Purpose:"),
                    createTextVNode(" Secure transport and client authentication")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Usage:"),
                    createTextVNode(" mTLS handshake for all API calls")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Presented to:"),
                    createTextVNode(" API providers during connection")
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "2. Signing Certificate — Required"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Used to "),
                  createVNode("strong", null, "digitally sign JWTs"),
                  createTextVNode(" your application sends — such as client assertions, request objects, etc. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Purpose:"),
                    createTextVNode(" Proving integrity and authenticity of signed payloads")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Usage:"),
                    createTextVNode(" Signing the contents of JWTs")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "info",
                title: "Encryption certificates"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" The Trust Framework also supports an "),
                    createVNode("strong", null, "Encryption Certificate"),
                    createTextVNode(", but this is "),
                    createVNode("strong", null, "not required for LFI clients"),
                    createTextVNode(". Note that the encryption keys you may see on your organisation (e.g. ENC1) are server-side keys used by the platform — these are distinct from application-level encryption certificates. An application-level encryption certificate is only needed by TPPs that wish to receive encrypted webhook event notifications. See "),
                    createVNode("a", { href: "/tech/tpp-standards/v2.1/webhooks/" }, "Webhooks"),
                    createTextVNode(" for more information. ")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Each certificate plays a critical role in securing communication and asserting identity. Once you understand the certificate types, you can generate the required keys and CSRs according to the Trust Framework specifications. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "key-requirements",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "Key and Certificate Requirements",
        title: "2048-bit RSA, SHA-256 CSR, and the required subject fields",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Keys and certificates within the Trust Framework (TF) must meet the following requirements: `);
                } else {
                  return [
                    createTextVNode(" Keys and certificates within the Trust Framework (TF) must meet the following requirements: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-504c59e5${_scopeId2}><strong data-v-504c59e5${_scopeId2}>2048-bit RSA private key (unencrypted)</strong></li><li data-v-504c59e5${_scopeId2}>A corresponding <strong data-v-504c59e5${_scopeId2}>Certificate Signing Request (CSR)</strong> signed with <strong data-v-504c59e5${_scopeId2}>SHA-256</strong></li><li data-v-504c59e5${_scopeId2}> CSR subject fields must include: <ul data-v-504c59e5${_scopeId2}><li data-v-504c59e5${_scopeId2}><strong data-v-504c59e5${_scopeId2}>C</strong> → Country — must be set to <code data-v-504c59e5${_scopeId2}>AE</code> (United Arab Emirates)</li><li data-v-504c59e5${_scopeId2}><strong data-v-504c59e5${_scopeId2}>O</strong> → Organization — must equal the Organization&#39;s legal name in the Trust Framework</li><li data-v-504c59e5${_scopeId2}><strong data-v-504c59e5${_scopeId2}>OU</strong> → Organizational Unit — must equal the Organization&#39;s ID in the Trust Framework</li><li data-v-504c59e5${_scopeId2}><strong data-v-504c59e5${_scopeId2}>CN</strong> → Common Name — must equal the application&#39;s <strong data-v-504c59e5${_scopeId2}>Client ID</strong> (the UUID assigned by the Trust Framework when the application was created)</li></ul></li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "2048-bit RSA private key (unencrypted)")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("A corresponding "),
                      createVNode("strong", null, "Certificate Signing Request (CSR)"),
                      createTextVNode(" signed with "),
                      createVNode("strong", null, "SHA-256")
                    ]),
                    createVNode("li", null, [
                      createTextVNode(" CSR subject fields must include: "),
                      createVNode("ul", null, [
                        createVNode("li", null, [
                          createVNode("strong", null, "C"),
                          createTextVNode(" → Country — must be set to "),
                          createVNode("code", null, "AE"),
                          createTextVNode(" (United Arab Emirates)")
                        ]),
                        createVNode("li", null, [
                          createVNode("strong", null, "O"),
                          createTextVNode(" → Organization — must equal the Organization's legal name in the Trust Framework")
                        ]),
                        createVNode("li", null, [
                          createVNode("strong", null, "OU"),
                          createTextVNode(" → Organizational Unit — must equal the Organization's ID in the Trust Framework")
                        ]),
                        createVNode("li", null, [
                          createVNode("strong", null, "CN"),
                          createTextVNode(" → Common Name — must equal the application's "),
                          createVNode("strong", null, "Client ID"),
                          createTextVNode(" (the UUID assigned by the Trust Framework when the application was created)")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-504c59e5${_scopeId}>Generating the Private Key and CSR</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`The Trust Framework provides an example using OpenSSL to generate:`);
                } else {
                  return [
                    createTextVNode("The Trust Framework provides an example using OpenSSL to generate:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-504c59e5${_scopeId2}>A private key file (<code data-v-504c59e5${_scopeId2}>.key</code>)</li><li data-v-504c59e5${_scopeId2}>A Certificate Signing Request file (<code data-v-504c59e5${_scopeId2}>.csr</code>)</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createTextVNode("A private key file ("),
                      createVNode("code", null, ".key"),
                      createTextVNode(")")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("A Certificate Signing Request file ("),
                      createVNode("code", null, ".csr"),
                      createTextVNode(")")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Example:`);
                } else {
                  return [
                    createTextVNode("Example:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: opensslCommand,
              lang: "bash",
              filename: "openssl"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Replace <code data-v-504c59e5${_scopeId2}>LegalName</code> and <code data-v-504c59e5${_scopeId2}>OrganizationId</code> with your organisation&#39;s details from the Trust Framework. Replace <code data-v-504c59e5${_scopeId2}>UUID</code> with your application&#39;s <strong data-v-504c59e5${_scopeId2}>Client ID</strong> — the UUID assigned when the application was created (see <a href="/tech/lfi-api-hub/trust-framework/creating-c3-application#your-client-id" data-v-504c59e5${_scopeId2}>Creating an Application</a>). Equivalent cryptographic tools may be used, provided all requirements above are met. `);
                } else {
                  return [
                    createTextVNode(" Replace "),
                    createVNode("code", null, "LegalName"),
                    createTextVNode(" and "),
                    createVNode("code", null, "OrganizationId"),
                    createTextVNode(" with your organisation's details from the Trust Framework. Replace "),
                    createVNode("code", null, "UUID"),
                    createTextVNode(" with your application's "),
                    createVNode("strong", null, "Client ID"),
                    createTextVNode(" — the UUID assigned when the application was created (see "),
                    createVNode("a", { href: "/tech/lfi-api-hub/trust-framework/creating-c3-application#your-client-id" }, "Creating an Application"),
                    createTextVNode("). Equivalent cryptographic tools may be used, provided all requirements above are met. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The <code data-v-504c59e5${_scopeId2}>.csr</code> file (Certificate Signing Request) must be uploaded to the Trust Framework. The <code data-v-504c59e5${_scopeId2}>.key</code> file (Private Key) must be kept <em data-v-504c59e5${_scopeId2}>secure and must never be shared</em>. More information on private key handling and security requirements can be found <a href="/policy/secure-management" data-v-504c59e5${_scopeId2}>here</a>. `);
                } else {
                  return [
                    createTextVNode(" The "),
                    createVNode("code", null, ".csr"),
                    createTextVNode(" file (Certificate Signing Request) must be uploaded to the Trust Framework. The "),
                    createVNode("code", null, ".key"),
                    createTextVNode(" file (Private Key) must be kept "),
                    createVNode("em", null, "secure and must never be shared"),
                    createTextVNode(". More information on private key handling and security requirements can be found "),
                    createVNode("a", { href: "/policy/secure-management" }, "here"),
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
                  createTextVNode(" Keys and certificates within the Trust Framework (TF) must meet the following requirements: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "2048-bit RSA private key (unencrypted)")
                  ]),
                  createVNode("li", null, [
                    createTextVNode("A corresponding "),
                    createVNode("strong", null, "Certificate Signing Request (CSR)"),
                    createTextVNode(" signed with "),
                    createVNode("strong", null, "SHA-256")
                  ]),
                  createVNode("li", null, [
                    createTextVNode(" CSR subject fields must include: "),
                    createVNode("ul", null, [
                      createVNode("li", null, [
                        createVNode("strong", null, "C"),
                        createTextVNode(" → Country — must be set to "),
                        createVNode("code", null, "AE"),
                        createTextVNode(" (United Arab Emirates)")
                      ]),
                      createVNode("li", null, [
                        createVNode("strong", null, "O"),
                        createTextVNode(" → Organization — must equal the Organization's legal name in the Trust Framework")
                      ]),
                      createVNode("li", null, [
                        createVNode("strong", null, "OU"),
                        createTextVNode(" → Organizational Unit — must equal the Organization's ID in the Trust Framework")
                      ]),
                      createVNode("li", null, [
                        createVNode("strong", null, "CN"),
                        createTextVNode(" → Common Name — must equal the application's "),
                        createVNode("strong", null, "Client ID"),
                        createTextVNode(" (the UUID assigned by the Trust Framework when the application was created)")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "Generating the Private Key and CSR"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("The Trust Framework provides an example using OpenSSL to generate:")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createTextVNode("A private key file ("),
                    createVNode("code", null, ".key"),
                    createTextVNode(")")
                  ]),
                  createVNode("li", null, [
                    createTextVNode("A Certificate Signing Request file ("),
                    createVNode("code", null, ".csr"),
                    createTextVNode(")")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Example:")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: opensslCommand,
                lang: "bash",
                filename: "openssl"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Replace "),
                  createVNode("code", null, "LegalName"),
                  createTextVNode(" and "),
                  createVNode("code", null, "OrganizationId"),
                  createTextVNode(" with your organisation's details from the Trust Framework. Replace "),
                  createVNode("code", null, "UUID"),
                  createTextVNode(" with your application's "),
                  createVNode("strong", null, "Client ID"),
                  createTextVNode(" — the UUID assigned when the application was created (see "),
                  createVNode("a", { href: "/tech/lfi-api-hub/trust-framework/creating-c3-application#your-client-id" }, "Creating an Application"),
                  createTextVNode("). Equivalent cryptographic tools may be used, provided all requirements above are met. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The "),
                  createVNode("code", null, ".csr"),
                  createTextVNode(" file (Certificate Signing Request) must be uploaded to the Trust Framework. The "),
                  createVNode("code", null, ".key"),
                  createTextVNode(" file (Private Key) must be kept "),
                  createVNode("em", null, "secure and must never be shared"),
                  createTextVNode(". More information on private key handling and security requirements can be found "),
                  createVNode("a", { href: "/policy/secure-management" }, "here"),
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
        id: "walkthrough",
        num: "03",
        color: "var(--at-blue-deep, #1d4ed8)",
        eyebrow: "Walkthrough",
        title: "Creating a certificate in the Trust Framework portal",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<ol class="ed-doc__steps" data-v-504c59e5${_scopeId}><li data-v-504c59e5${_scopeId}><h3 data-v-504c59e5${_scopeId}>Navigate to App Certificates</h3><ol class="ed-doc__substeps" data-v-504c59e5${_scopeId}><li data-v-504c59e5${_scopeId}>Open your application in the Trust Framework.</li><li data-v-504c59e5${_scopeId}>Click <strong data-v-504c59e5${_scopeId}>App Certificates</strong>.</li><li data-v-504c59e5${_scopeId}>Click <strong data-v-504c59e5${_scopeId}>+ New Certificate</strong>.</li></ol>`);
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
            _push2(`</li><li data-v-504c59e5${_scopeId}><h3 data-v-504c59e5${_scopeId}>Select the certificate type</h3><ol class="ed-doc__substeps" data-v-504c59e5${_scopeId}><li data-v-504c59e5${_scopeId}>Select <strong data-v-504c59e5${_scopeId}>Transport</strong> or <strong data-v-504c59e5${_scopeId}>Signing</strong>. You will need to repeat this process for each. Do not create an Encryption certificate for your LFI client.</li></ol>`);
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
            _push2(`</li><li data-v-504c59e5${_scopeId}><h3 data-v-504c59e5${_scopeId}>Generate the private key and CSR</h3><ol class="ed-doc__substeps" data-v-504c59e5${_scopeId}><li data-v-504c59e5${_scopeId}>Generate your private key (<code data-v-504c59e5${_scopeId}>.key</code>) and Certificate Signing Request (<code data-v-504c59e5${_scopeId}>.csr</code>).</li><li data-v-504c59e5${_scopeId}>Confirm that the CSR has been generated successfully before proceeding.</li></ol>`);
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "warning",
              title: "Production environments"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-504c59e5${_scopeId2}> The OpenSSL command shown is intended for demonstration and testing only. In production, private key generation and CSR creation must be performed within your HSM or equivalent secure key management infrastructure, in accordance with your institution&#39;s security policies. </p>`);
                } else {
                  return [
                    createVNode("p", null, " The OpenSSL command shown is intended for demonstration and testing only. In production, private key generation and CSR creation must be performed within your HSM or equivalent secure key management infrastructure, in accordance with your institution's security policies. ")
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
            _push2(`</li><li data-v-504c59e5${_scopeId}><h3 data-v-504c59e5${_scopeId}>Upload the CSR</h3><ol class="ed-doc__substeps" data-v-504c59e5${_scopeId}><li data-v-504c59e5${_scopeId}>Click <strong data-v-504c59e5${_scopeId}>Upload your CSR</strong> and select the <code data-v-504c59e5${_scopeId}>.csr</code> file generated in the previous step.</li></ol>`);
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
            _push2(`</li><li data-v-504c59e5${_scopeId}><h3 data-v-504c59e5${_scopeId}>Download the certificate</h3><ol class="ed-doc__substeps" data-v-504c59e5${_scopeId}><li data-v-504c59e5${_scopeId}>Once the Trust Framework processes the CSR, your certificate is ready. Download the <code data-v-504c59e5${_scopeId}>.pem</code> certificate file.</li><li data-v-504c59e5${_scopeId}>You now have the <code data-v-504c59e5${_scopeId}>.pem</code> / <code data-v-504c59e5${_scopeId}>.key</code> pair. Store your private key securely — it must never be shared. See <a href="/policy/secure-management" data-v-504c59e5${_scopeId}>Secure Management</a> for requirements.</li></ol>`);
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
            _push2(`</li></ol>`);
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "info",
              title: "Renewing a certificate before it expires"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-504c59e5${_scopeId2}> Certificates are valid for 13 months and must be rotated before they expire to avoid breaking services. You only rotate the certificates whose private key you hold — Nebras rotates the rest. See <a href="/knowledge-base/articles/certificate-rotation" data-v-504c59e5${_scopeId2}>Certificate Rotation</a> for the best-practice guide covering reminders, the safe overlap pattern, and transport- and signing-specific steps. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" Certificates are valid for 13 months and must be rotated before they expire to avoid breaking services. You only rotate the certificates whose private key you hold — Nebras rotates the rest. See "),
                      createVNode("a", { href: "/knowledge-base/articles/certificate-rotation" }, "Certificate Rotation"),
                      createTextVNode(" for the best-practice guide covering reminders, the safe overlap pattern, and transport- and signing-specific steps. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("ol", { class: "ed-doc__steps" }, [
                createVNode("li", null, [
                  createVNode("h3", null, "Navigate to App Certificates"),
                  createVNode("ol", { class: "ed-doc__substeps" }, [
                    createVNode("li", null, "Open your application in the Trust Framework."),
                    createVNode("li", null, [
                      createTextVNode("Click "),
                      createVNode("strong", null, "App Certificates"),
                      createTextVNode(".")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("Click "),
                      createVNode("strong", null, "+ New Certificate"),
                      createTextVNode(".")
                    ])
                  ]),
                  createVNode(_component_ClientOnly, null, {
                    default: withCtx(() => [
                      createVNode(_component_Carousel, { images: images1 })
                    ]),
                    _: 1
                  })
                ]),
                createVNode("li", null, [
                  createVNode("h3", null, "Select the certificate type"),
                  createVNode("ol", { class: "ed-doc__substeps" }, [
                    createVNode("li", null, [
                      createTextVNode("Select "),
                      createVNode("strong", null, "Transport"),
                      createTextVNode(" or "),
                      createVNode("strong", null, "Signing"),
                      createTextVNode(". You will need to repeat this process for each. Do not create an Encryption certificate for your LFI client.")
                    ])
                  ]),
                  createVNode(_component_ClientOnly, null, {
                    default: withCtx(() => [
                      createVNode(_component_Carousel, { images: images2 })
                    ]),
                    _: 1
                  })
                ]),
                createVNode("li", null, [
                  createVNode("h3", null, "Generate the private key and CSR"),
                  createVNode("ol", { class: "ed-doc__substeps" }, [
                    createVNode("li", null, [
                      createTextVNode("Generate your private key ("),
                      createVNode("code", null, ".key"),
                      createTextVNode(") and Certificate Signing Request ("),
                      createVNode("code", null, ".csr"),
                      createTextVNode(").")
                    ]),
                    createVNode("li", null, "Confirm that the CSR has been generated successfully before proceeding.")
                  ]),
                  createVNode(_component_EdNote, {
                    type: "warning",
                    title: "Production environments"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, " The OpenSSL command shown is intended for demonstration and testing only. In production, private key generation and CSR creation must be performed within your HSM or equivalent secure key management infrastructure, in accordance with your institution's security policies. ")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_ClientOnly, null, {
                    default: withCtx(() => [
                      createVNode(_component_Carousel, { images: images3 })
                    ]),
                    _: 1
                  })
                ]),
                createVNode("li", null, [
                  createVNode("h3", null, "Upload the CSR"),
                  createVNode("ol", { class: "ed-doc__substeps" }, [
                    createVNode("li", null, [
                      createTextVNode("Click "),
                      createVNode("strong", null, "Upload your CSR"),
                      createTextVNode(" and select the "),
                      createVNode("code", null, ".csr"),
                      createTextVNode(" file generated in the previous step.")
                    ])
                  ]),
                  createVNode(_component_ClientOnly, null, {
                    default: withCtx(() => [
                      createVNode(_component_Carousel, { images: images4 })
                    ]),
                    _: 1
                  })
                ]),
                createVNode("li", null, [
                  createVNode("h3", null, "Download the certificate"),
                  createVNode("ol", { class: "ed-doc__substeps" }, [
                    createVNode("li", null, [
                      createTextVNode("Once the Trust Framework processes the CSR, your certificate is ready. Download the "),
                      createVNode("code", null, ".pem"),
                      createTextVNode(" certificate file.")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("You now have the "),
                      createVNode("code", null, ".pem"),
                      createTextVNode(" / "),
                      createVNode("code", null, ".key"),
                      createTextVNode(" pair. Store your private key securely — it must never be shared. See "),
                      createVNode("a", { href: "/policy/secure-management" }, "Secure Management"),
                      createTextVNode(" for requirements.")
                    ])
                  ]),
                  createVNode(_component_ClientOnly, null, {
                    default: withCtx(() => [
                      createVNode(_component_Carousel, { images: images5 })
                    ]),
                    _: 1
                  })
                ])
              ]),
              createVNode(_component_EdNote, {
                type: "info",
                title: "Renewing a certificate before it expires"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" Certificates are valid for 13 months and must be rotated before they expire to avoid breaking services. You only rotate the certificates whose private key you hold — Nebras rotates the rest. See "),
                    createVNode("a", { href: "/knowledge-base/articles/certificate-rotation" }, "Certificate Rotation"),
                    createTextVNode(" for the best-practice guide covering reminders, the safe overlap pattern, and transport- and signing-specific steps. ")
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
        id: "finding-your-key-id-kid",
        num: "04",
        color: "var(--at-navy)",
        eyebrow: "Finding Your Key ID (kid)",
        title: "The kid value used in every signed JWT",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Once your certificate is issued, the Trust Framework assigns it a <strong data-v-504c59e5${_scopeId2}>Key ID (<code data-v-504c59e5${_scopeId2}>kid</code>)</strong>. This value must be included in the <code data-v-504c59e5${_scopeId2}>kid</code> header of every JWT signed with the corresponding private key. `);
                } else {
                  return [
                    createTextVNode(" Once your certificate is issued, the Trust Framework assigns it a "),
                    createVNode("strong", null, [
                      createTextVNode("Key ID ("),
                      createVNode("code", null, "kid"),
                      createTextVNode(")")
                    ]),
                    createTextVNode(". This value must be included in the "),
                    createVNode("code", null, "kid"),
                    createTextVNode(" header of every JWT signed with the corresponding private key. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_ImageViewer, {
              src: "/images/raidiam/generate-transport-certificate/11.png",
              alt: "Key ID (kid) location on the certificate detail page in the Trust Framework"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "tip",
              title: "Where to find it later"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-504c59e5${_scopeId2}> Your <code data-v-504c59e5${_scopeId2}>kid</code> is always visible on the certificate detail page. Navigate to your Application → App Certificates → select the certificate. Copy the Key ID exactly as shown — it is case-sensitive. See <a href="/tech/tpp-standards/security/fapi/message-signing" data-v-504c59e5${_scopeId2}>Message Signing</a> for how the <code data-v-504c59e5${_scopeId2}>kid</code> value is used in the JWT header. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" Your "),
                      createVNode("code", null, "kid"),
                      createTextVNode(" is always visible on the certificate detail page. Navigate to your Application → App Certificates → select the certificate. Copy the Key ID exactly as shown — it is case-sensitive. See "),
                      createVNode("a", { href: "/tech/tpp-standards/security/fapi/message-signing" }, "Message Signing"),
                      createTextVNode(" for how the "),
                      createVNode("code", null, "kid"),
                      createTextVNode(" value is used in the JWT header. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` You will need a separate <code data-v-504c59e5${_scopeId2}>kid</code> for each certificate (Transport and Signing). When signing JWTs, always use the <code data-v-504c59e5${_scopeId2}>kid</code> of your <strong data-v-504c59e5${_scopeId2}>Signing</strong> certificate. `);
                } else {
                  return [
                    createTextVNode(" You will need a separate "),
                    createVNode("code", null, "kid"),
                    createTextVNode(" for each certificate (Transport and Signing). When signing JWTs, always use the "),
                    createVNode("code", null, "kid"),
                    createTextVNode(" of your "),
                    createVNode("strong", null, "Signing"),
                    createTextVNode(" certificate. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Once your certificate is issued, the Trust Framework assigns it a "),
                  createVNode("strong", null, [
                    createTextVNode("Key ID ("),
                    createVNode("code", null, "kid"),
                    createTextVNode(")")
                  ]),
                  createTextVNode(". This value must be included in the "),
                  createVNode("code", null, "kid"),
                  createTextVNode(" header of every JWT signed with the corresponding private key. ")
                ]),
                _: 1
              }),
              createVNode(_component_ImageViewer, {
                src: "/images/raidiam/generate-transport-certificate/11.png",
                alt: "Key ID (kid) location on the certificate detail page in the Trust Framework"
              }),
              createVNode(_component_EdNote, {
                type: "tip",
                title: "Where to find it later"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" Your "),
                    createVNode("code", null, "kid"),
                    createTextVNode(" is always visible on the certificate detail page. Navigate to your Application → App Certificates → select the certificate. Copy the Key ID exactly as shown — it is case-sensitive. See "),
                    createVNode("a", { href: "/tech/tpp-standards/security/fapi/message-signing" }, "Message Signing"),
                    createTextVNode(" for how the "),
                    createVNode("code", null, "kid"),
                    createTextVNode(" value is used in the JWT header. ")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" You will need a separate "),
                  createVNode("code", null, "kid"),
                  createTextVNode(" for each certificate (Transport and Signing). When signing JWTs, always use the "),
                  createVNode("code", null, "kid"),
                  createTextVNode(" of your "),
                  createVNode("strong", null, "Signing"),
                  createTextVNode(" certificate. ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/trust-framework/certificates/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-504c59e5"]]);
export {
  index as default
};
