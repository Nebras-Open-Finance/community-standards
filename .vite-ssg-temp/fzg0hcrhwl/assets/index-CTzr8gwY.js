import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { E as EdCode } from "./EdCode-BQ4YLUeg.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { defineComponent, mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const opensslSan = `openssl req -new -newkey rsa:2048 -nodes \\
-out ...-opf_uae_server_transport.csr \\
-keyout ...-opf_uae_server_transport.key \\
-subj "/C=AE/O=Organisation Name/OU=b345..." \\
-sha256 \\
-addext "subjectAltName=DNS:some.hostname.com"`;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdNote = __unplugin_components_7;
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdCode = EdCode;
      const _component_EdBullets = __unplugin_components_5;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-5e3ec2b3><section class="ed-doc__hero" data-v-5e3ec2b3><div class="ed-doc__inner" data-v-5e3ec2b3><div class="ed-doc__eyebrow" data-v-5e3ec2b3><span class="ed-doc__eyebrow-dash" data-v-5e3ec2b3></span> LFI · Trust Framework · Certificates </div><h1 class="ed-doc__title" data-v-5e3ec2b3> Certificates with a SAN <span class="ed-doc__read" data-v-5e3ec2b3>2 min read</span></h1><p class="ed-doc__lede" data-v-5e3ec2b3> The Subject Alternative Name (SAN) extension is required on server-side certificates — specifically the transport certificates LFIs present at their API Hub endpoints. </p>`);
      _push(ssrRenderComponent(_component_EdNote, {
        type: "info",
        title: "This page applies to LFI server certificates"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p data-v-5e3ec2b3${_scopeId}> The Subject Alternative Name (SAN) extension is required on <strong data-v-5e3ec2b3${_scopeId}>server-side</strong> certificates — specifically the transport certificates LFIs present at their API Hub endpoints. TPPs generating client certificates (transport, signing, or encryption) do <strong data-v-5e3ec2b3${_scopeId}>not</strong> add a SAN; they set the <code data-v-5e3ec2b3${_scopeId}>CN</code> to their application&#39;s Client ID instead. See <a href="/tech/lfi-api-hub/trust-framework/certificates/" data-v-5e3ec2b3${_scopeId}>Keys and Certificates</a> for client certificate requirements. </p>`);
          } else {
            return [
              createVNode("p", null, [
                createTextVNode(" The Subject Alternative Name (SAN) extension is required on "),
                createVNode("strong", null, "server-side"),
                createTextVNode(" certificates — specifically the transport certificates LFIs present at their API Hub endpoints. TPPs generating client certificates (transport, signing, or encryption) do "),
                createVNode("strong", null, "not"),
                createTextVNode(" add a SAN; they set the "),
                createVNode("code", null, "CN"),
                createTextVNode(" to their application's Client ID instead. See "),
                createVNode("a", { href: "/tech/lfi-api-hub/trust-framework/certificates/" }, "Keys and Certificates"),
                createTextVNode(" for client certificate requirements. ")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "adding-san",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Adding a Subject Alternative Name (SAN)",
        title: "Inline -addext on the CSR",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Modern browsers and certificate authorities no longer rely on the Common Name (CN) field for hostname validation on server certificates. Instead, they require the Subject Alternative Name (SAN) extension specifying the DNS hostnames the certificate is valid for — in this context, the API Hub instance the LFI operates. `);
                } else {
                  return [
                    createTextVNode(" Modern browsers and certificate authorities no longer rely on the Common Name (CN) field for hostname validation on server certificates. Instead, they require the Subject Alternative Name (SAN) extension specifying the DNS hostnames the certificate is valid for — in this context, the API Hub instance the LFI operates. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` To include a SAN directly in the CSR without needing a separate config file, you can use the <code data-v-5e3ec2b3${_scopeId2}>-addext</code> option: `);
                } else {
                  return [
                    createTextVNode(" To include a SAN directly in the CSR without needing a separate config file, you can use the "),
                    createVNode("code", null, "-addext"),
                    createTextVNode(" option: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: opensslSan,
              lang: "bash",
              filename: "openssl with SAN"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` In this example, <code data-v-5e3ec2b3${_scopeId2}>some.hostname.com</code> will appear in the SAN extension of the CSR. `);
                } else {
                  return [
                    createTextVNode(" In this example, "),
                    createVNode("code", null, "some.hostname.com"),
                    createTextVNode(" will appear in the SAN extension of the CSR. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Modern browsers and certificate authorities no longer rely on the Common Name (CN) field for hostname validation on server certificates. Instead, they require the Subject Alternative Name (SAN) extension specifying the DNS hostnames the certificate is valid for — in this context, the API Hub instance the LFI operates. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" To include a SAN directly in the CSR without needing a separate config file, you can use the "),
                  createVNode("code", null, "-addext"),
                  createTextVNode(" option: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: opensslSan,
                lang: "bash",
                filename: "openssl with SAN"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" In this example, "),
                  createVNode("code", null, "some.hostname.com"),
                  createTextVNode(" will appear in the SAN extension of the CSR. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "why-san",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "Why SAN Instead of CN",
        title: "Server certificates rely on SAN, not CN, for hostname validation",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Historically, SSL/TLS server certificates included the Common Name (CN) to specify the hostname. However: `);
                } else {
                  return [
                    createTextVNode(" Historically, SSL/TLS server certificates included the Common Name (CN) to specify the hostname. However: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-5e3ec2b3${_scopeId2}><strong data-v-5e3ec2b3${_scopeId2}>CN is deprecated</strong> — as of RFC 2818 and subsequent updates, browsers and certificate authorities have stopped using CN for hostname validation on server certificates.</li><li data-v-5e3ec2b3${_scopeId2}><strong data-v-5e3ec2b3${_scopeId2}>SAN is mandatory</strong> — the Subject Alternative Name is now the authoritative field for hostname checking.</li><li data-v-5e3ec2b3${_scopeId2}><strong data-v-5e3ec2b3${_scopeId2}>Multiple hostnames</strong> — SAN supports multiple DNS names (and IP addresses), whereas CN supports only one.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "CN is deprecated"),
                      createTextVNode(" — as of RFC 2818 and subsequent updates, browsers and certificate authorities have stopped using CN for hostname validation on server certificates.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "SAN is mandatory"),
                      createTextVNode(" — the Subject Alternative Name is now the authoritative field for hostname checking.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Multiple hostnames"),
                      createTextVNode(" — SAN supports multiple DNS names (and IP addresses), whereas CN supports only one.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`For server certificates, modern CSRs omit CN and rely solely on SAN.`);
                } else {
                  return [
                    createTextVNode("For server certificates, modern CSRs omit CN and rely solely on SAN.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Historically, SSL/TLS server certificates included the Common Name (CN) to specify the hostname. However: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "CN is deprecated"),
                    createTextVNode(" — as of RFC 2818 and subsequent updates, browsers and certificate authorities have stopped using CN for hostname validation on server certificates.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "SAN is mandatory"),
                    createTextVNode(" — the Subject Alternative Name is now the authoritative field for hostname checking.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Multiple hostnames"),
                    createTextVNode(" — SAN supports multiple DNS names (and IP addresses), whereas CN supports only one.")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("For server certificates, modern CSRs omit CN and rely solely on SAN.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "openssl-version",
        num: "03",
        color: "var(--at-blue-deep, #1d4ed8)",
        eyebrow: "OpenSSL Version Support",
        title: "-addext requires OpenSSL 1.1.1 or newer",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The <code data-v-5e3ec2b3${_scopeId2}>-addext</code> option was introduced in OpenSSL 1.1.1 (released September 2018). If you are using OpenSSL 1.1.1 or later, you can add SANs inline as shown above. `);
                } else {
                  return [
                    createTextVNode(" The "),
                    createVNode("code", null, "-addext"),
                    createTextVNode(" option was introduced in OpenSSL 1.1.1 (released September 2018). If you are using OpenSSL 1.1.1 or later, you can add SANs inline as shown above. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` On older versions of OpenSSL, you will need to use an external configuration file (<code data-v-5e3ec2b3${_scopeId2}>openssl.cnf</code>) to include SANs. `);
                } else {
                  return [
                    createTextVNode(" On older versions of OpenSSL, you will need to use an external configuration file ("),
                    createVNode("code", null, "openssl.cnf"),
                    createTextVNode(") to include SANs. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The "),
                  createVNode("code", null, "-addext"),
                  createTextVNode(" option was introduced in OpenSSL 1.1.1 (released September 2018). If you are using OpenSSL 1.1.1 or later, you can add SANs inline as shown above. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" On older versions of OpenSSL, you will need to use an external configuration file ("),
                  createVNode("code", null, "openssl.cnf"),
                  createTextVNode(") to include SANs. ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/trust-framework/certificates-san/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-5e3ec2b3"]]);
export {
  index as default
};
