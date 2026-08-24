import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as _sfc_main$1, a as _sfc_main$2 } from "./APIFlowsConnectivityCertificates-DqqeKrf0.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { _ as __unplugin_components_8 } from "./APIFlowViewer-C5xJUdUs.js";
import { I as ImageViewer } from "./ImageViewer-DmHTopUf.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "mermaid";
import "./useChartTheme-DtmiKid7.js";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_EdSectionBand = __unplugin_components_3;
  const _component_EdProse = __unplugin_components_4;
  const _component_ImageViewer = ImageViewer;
  const _component_APIFlowViewer = __unplugin_components_8;
  const _component_APIFlowsConnectivityCertificates = _sfc_main$1;
  const _component_EdRefTable = __unplugin_components_12;
  const _component_APIFlowsConnectivityEncryption = _sfc_main$2;
  const _component_EdNote = __unplugin_components_7;
  const _component_EdBullets = __unplugin_components_5;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-8bc4acf9><section class="ed-doc__hero" data-v-8bc4acf9><div class="ed-doc__inner" data-v-8bc4acf9><div class="ed-doc__eyebrow" data-v-8bc4acf9><span class="ed-doc__eyebrow-dash" data-v-8bc4acf9></span> LFI · API Hub · Connectivity </div><h1 class="ed-doc__title" data-v-8bc4acf9> API Hub Connectivity &amp; Certificates <span class="ed-doc__read" data-v-8bc4acf9>5 min read</span></h1><p class="ed-doc__lede" data-v-8bc4acf9> This page describes the network architecture of the API Hub and the certificates that secure communication between all parties in the ecosystem. </p></div></section>`);
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "network-architecture",
    num: "01",
    color: "var(--at-teal)",
    eyebrow: "Network architecture",
    title: "Connectivity between TPPs, Hub, and LFI",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` The diagram below shows the full connectivity model between TPPs, the API Hub, and the LFI&#39;s infrastructure. `);
            } else {
              return [
                createTextVNode(" The diagram below shows the full connectivity model between TPPs, the API Hub, and the LFI's infrastructure. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_ImageViewer, {
          src: "/images/ozone/hub/connectivity.png",
          alt: "API Hub connectivity diagram showing certificate placement across TPP, API Hub, and LFI networks"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` All connections between the API Hub and external parties use <strong data-v-8bc4acf9${_scopeId2}>mutual TLS (mTLS)</strong>. Each certificate has a specific role in securing a particular connection path. The certificates are created and stored within the Trust Framework, and the private keys are held by the party responsible for that connection. `);
            } else {
              return [
                createTextVNode(" All connections between the API Hub and external parties use "),
                createVNode("strong", null, "mutual TLS (mTLS)"),
                createTextVNode(". Each certificate has a specific role in securing a particular connection path. The certificates are created and stored within the Trust Framework, and the private keys are held by the party responsible for that connection. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` The sequence diagram below shows which certificate secures each direction of traffic between the TPP, the API Hub, and the LFI&#39;s Ozone Connect backend. `);
            } else {
              return [
                createTextVNode(" The sequence diagram below shows which certificate secures each direction of traffic between the TPP, the API Hub, and the LFI's Ozone Connect backend. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_APIFlowViewer, { title: "Certificates per connection" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_APIFlowsConnectivityCertificates, null, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_APIFlowsConnectivityCertificates)
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" The diagram below shows the full connectivity model between TPPs, the API Hub, and the LFI's infrastructure. ")
            ]),
            _: 1
          }),
          createVNode(_component_ImageViewer, {
            src: "/images/ozone/hub/connectivity.png",
            alt: "API Hub connectivity diagram showing certificate placement across TPP, API Hub, and LFI networks"
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" All connections between the API Hub and external parties use "),
              createVNode("strong", null, "mutual TLS (mTLS)"),
              createTextVNode(". Each certificate has a specific role in securing a particular connection path. The certificates are created and stored within the Trust Framework, and the private keys are held by the party responsible for that connection. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" The sequence diagram below shows which certificate secures each direction of traffic between the TPP, the API Hub, and the LFI's Ozone Connect backend. ")
            ]),
            _: 1
          }),
          createVNode(_component_APIFlowViewer, { title: "Certificates per connection" }, {
            default: withCtx(() => [
              createVNode(_component_APIFlowsConnectivityCertificates)
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "connection-paths",
    num: "02",
    color: "var(--at-gold)",
    eyebrow: "Connection paths",
    title: "Certificate roles by direction",
    tone: "surface"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<h3 data-v-8bc4acf9${_scopeId}>TPP to API Hub</h3>`);
        _push2(ssrRenderComponent(_component_EdRefTable, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<table data-v-8bc4acf9${_scopeId2}><thead data-v-8bc4acf9${_scopeId2}><tr data-v-8bc4acf9${_scopeId2}><th data-v-8bc4acf9${_scopeId2}>Connection</th><th data-v-8bc4acf9${_scopeId2}>Certificate</th><th data-v-8bc4acf9${_scopeId2}>Description</th></tr></thead><tbody data-v-8bc4acf9${_scopeId2}><tr data-v-8bc4acf9${_scopeId2}><td data-v-8bc4acf9${_scopeId2}>TPP → API Hub</td><td data-v-8bc4acf9${_scopeId2}><strong data-v-8bc4acf9${_scopeId2}>C1</strong> (TPP client cert)</td><td data-v-8bc4acf9${_scopeId2}>The TPP presents its client certificate to identify itself to the API Hub.</td></tr><tr data-v-8bc4acf9${_scopeId2}><td data-v-8bc4acf9${_scopeId2}>API Hub → TPP</td><td data-v-8bc4acf9${_scopeId2}><strong data-v-8bc4acf9${_scopeId2}>S1</strong> (API Hub server cert)</td><td data-v-8bc4acf9${_scopeId2}>The API Hub presents this server certificate to identify the LFI&#39;s API Hub instance to the TPP.</td></tr><tr data-v-8bc4acf9${_scopeId2}><td data-v-8bc4acf9${_scopeId2}>Request signing</td><td data-v-8bc4acf9${_scopeId2}><strong data-v-8bc4acf9${_scopeId2}>Sig1</strong></td><td data-v-8bc4acf9${_scopeId2}>The TPP signs request JWTs (e.g. PAR request objects and <code data-v-8bc4acf9${_scopeId2}>private_key_jwt</code> client assertions) sent to the API Hub. The API Hub verifies using the public key in the TPP&#39;s JWKS.</td></tr><tr data-v-8bc4acf9${_scopeId2}><td data-v-8bc4acf9${_scopeId2}>Response signing</td><td data-v-8bc4acf9${_scopeId2}><strong data-v-8bc4acf9${_scopeId2}>Sig2</strong></td><td data-v-8bc4acf9${_scopeId2}>The API Hub signs responses and <code data-v-8bc4acf9${_scopeId2}>id_token</code> payloads sent to the TPP. The TPP verifies using the public key in the JWKS.</td></tr></tbody></table>`);
            } else {
              return [
                createVNode("table", null, [
                  createVNode("thead", null, [
                    createVNode("tr", null, [
                      createVNode("th", null, "Connection"),
                      createVNode("th", null, "Certificate"),
                      createVNode("th", null, "Description")
                    ])
                  ]),
                  createVNode("tbody", null, [
                    createVNode("tr", null, [
                      createVNode("td", null, "TPP → API Hub"),
                      createVNode("td", null, [
                        createVNode("strong", null, "C1"),
                        createTextVNode(" (TPP client cert)")
                      ]),
                      createVNode("td", null, "The TPP presents its client certificate to identify itself to the API Hub.")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "API Hub → TPP"),
                      createVNode("td", null, [
                        createVNode("strong", null, "S1"),
                        createTextVNode(" (API Hub server cert)")
                      ]),
                      createVNode("td", null, "The API Hub presents this server certificate to identify the LFI's API Hub instance to the TPP.")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "Request signing"),
                      createVNode("td", null, [
                        createVNode("strong", null, "Sig1")
                      ]),
                      createVNode("td", null, [
                        createTextVNode("The TPP signs request JWTs (e.g. PAR request objects and "),
                        createVNode("code", null, "private_key_jwt"),
                        createTextVNode(" client assertions) sent to the API Hub. The API Hub verifies using the public key in the TPP's JWKS.")
                      ])
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "Response signing"),
                      createVNode("td", null, [
                        createVNode("strong", null, "Sig2")
                      ]),
                      createVNode("td", null, [
                        createTextVNode("The API Hub signs responses and "),
                        createVNode("code", null, "id_token"),
                        createTextVNode(" payloads sent to the TPP. The TPP verifies using the public key in the JWKS.")
                      ])
                    ])
                  ])
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 data-v-8bc4acf9${_scopeId}>API Hub to LFI (Ozone Connect)</h3>`);
        _push2(ssrRenderComponent(_component_EdRefTable, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<table data-v-8bc4acf9${_scopeId2}><thead data-v-8bc4acf9${_scopeId2}><tr data-v-8bc4acf9${_scopeId2}><th data-v-8bc4acf9${_scopeId2}>Connection</th><th data-v-8bc4acf9${_scopeId2}>Certificate</th><th data-v-8bc4acf9${_scopeId2}>Description</th></tr></thead><tbody data-v-8bc4acf9${_scopeId2}><tr data-v-8bc4acf9${_scopeId2}><td data-v-8bc4acf9${_scopeId2}>API Hub → LFI</td><td data-v-8bc4acf9${_scopeId2}><strong data-v-8bc4acf9${_scopeId2}>C4</strong> (API Hub client cert)</td><td data-v-8bc4acf9${_scopeId2}>The API Hub presents this client certificate when calling the LFI&#39;s Ozone Connect endpoints.</td></tr><tr data-v-8bc4acf9${_scopeId2}><td data-v-8bc4acf9${_scopeId2}>LFI → API Hub</td><td data-v-8bc4acf9${_scopeId2}><strong data-v-8bc4acf9${_scopeId2}>S4</strong> (LFI server cert)</td><td data-v-8bc4acf9${_scopeId2}>The LFI&#39;s Ozone Connect server presents this certificate to identify itself to the API Hub.</td></tr><tr data-v-8bc4acf9${_scopeId2}><td data-v-8bc4acf9${_scopeId2}>Request signing (JWT Auth)</td><td data-v-8bc4acf9${_scopeId2}><strong data-v-8bc4acf9${_scopeId2}>Sig3</strong></td><td data-v-8bc4acf9${_scopeId2}> The API Hub signs JWT Auth headers on Ozone Connect requests. Only applicable when <a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/application-layer-auth#jwt-auth" data-v-8bc4acf9${_scopeId2}>JWT Auth</a> is selected. </td></tr><tr data-v-8bc4acf9${_scopeId2}><td data-v-8bc4acf9${_scopeId2}>Response signing (JWT Auth)</td><td data-v-8bc4acf9${_scopeId2}><strong data-v-8bc4acf9${_scopeId2}>Sig4</strong></td><td data-v-8bc4acf9${_scopeId2}>The LFI signs JWT Auth headers on Ozone Connect responses. Only applicable when JWT Auth is selected.</td></tr></tbody></table>`);
            } else {
              return [
                createVNode("table", null, [
                  createVNode("thead", null, [
                    createVNode("tr", null, [
                      createVNode("th", null, "Connection"),
                      createVNode("th", null, "Certificate"),
                      createVNode("th", null, "Description")
                    ])
                  ]),
                  createVNode("tbody", null, [
                    createVNode("tr", null, [
                      createVNode("td", null, "API Hub → LFI"),
                      createVNode("td", null, [
                        createVNode("strong", null, "C4"),
                        createTextVNode(" (API Hub client cert)")
                      ]),
                      createVNode("td", null, "The API Hub presents this client certificate when calling the LFI's Ozone Connect endpoints.")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "LFI → API Hub"),
                      createVNode("td", null, [
                        createVNode("strong", null, "S4"),
                        createTextVNode(" (LFI server cert)")
                      ]),
                      createVNode("td", null, "The LFI's Ozone Connect server presents this certificate to identify itself to the API Hub.")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "Request signing (JWT Auth)"),
                      createVNode("td", null, [
                        createVNode("strong", null, "Sig3")
                      ]),
                      createVNode("td", null, [
                        createTextVNode(" The API Hub signs JWT Auth headers on Ozone Connect requests. Only applicable when "),
                        createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/application-layer-auth#jwt-auth" }, "JWT Auth"),
                        createTextVNode(" is selected. ")
                      ])
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "Response signing (JWT Auth)"),
                      createVNode("td", null, [
                        createVNode("strong", null, "Sig4")
                      ]),
                      createVNode("td", null, "The LFI signs JWT Auth headers on Ozone Connect responses. Only applicable when JWT Auth is selected.")
                    ])
                  ])
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 data-v-8bc4acf9${_scopeId}>LFI to API Hub (Consent Manager &amp; Headless Heimdall)</h3>`);
        _push2(ssrRenderComponent(_component_EdRefTable, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<table data-v-8bc4acf9${_scopeId2}><thead data-v-8bc4acf9${_scopeId2}><tr data-v-8bc4acf9${_scopeId2}><th data-v-8bc4acf9${_scopeId2}>Connection</th><th data-v-8bc4acf9${_scopeId2}>Certificate</th><th data-v-8bc4acf9${_scopeId2}>Description</th></tr></thead><tbody data-v-8bc4acf9${_scopeId2}><tr data-v-8bc4acf9${_scopeId2}><td data-v-8bc4acf9${_scopeId2}>LFI → API Hub</td><td data-v-8bc4acf9${_scopeId2}><strong data-v-8bc4acf9${_scopeId2}>C3</strong> (LFI client cert)</td><td data-v-8bc4acf9${_scopeId2}>The LFI presents this client certificate when calling the Consent Manager and Headless Heimdall Auth Server.</td></tr><tr data-v-8bc4acf9${_scopeId2}><td data-v-8bc4acf9${_scopeId2}>API Hub → LFI</td><td data-v-8bc4acf9${_scopeId2}><strong data-v-8bc4acf9${_scopeId2}>S3</strong> (API Hub server cert)</td><td data-v-8bc4acf9${_scopeId2}>The Consent Manager and Headless Heimdall servers present this certificate to identify themselves to the LFI.</td></tr><tr data-v-8bc4acf9${_scopeId2}><td data-v-8bc4acf9${_scopeId2}>Request signing (JWT Auth)</td><td data-v-8bc4acf9${_scopeId2}><strong data-v-8bc4acf9${_scopeId2}>Sig4</strong></td><td data-v-8bc4acf9${_scopeId2}>The LFI signs JWT Auth headers on requests to the Consent Manager and Headless Heimdall. Only applicable when JWT Auth is selected.</td></tr><tr data-v-8bc4acf9${_scopeId2}><td data-v-8bc4acf9${_scopeId2}>Response signing (JWT Auth)</td><td data-v-8bc4acf9${_scopeId2}><strong data-v-8bc4acf9${_scopeId2}>Sig3</strong></td><td data-v-8bc4acf9${_scopeId2}>The API Hub signs JWT Auth headers on Consent Manager and Headless Heimdall responses. Only applicable when JWT Auth is selected.</td></tr></tbody></table>`);
            } else {
              return [
                createVNode("table", null, [
                  createVNode("thead", null, [
                    createVNode("tr", null, [
                      createVNode("th", null, "Connection"),
                      createVNode("th", null, "Certificate"),
                      createVNode("th", null, "Description")
                    ])
                  ]),
                  createVNode("tbody", null, [
                    createVNode("tr", null, [
                      createVNode("td", null, "LFI → API Hub"),
                      createVNode("td", null, [
                        createVNode("strong", null, "C3"),
                        createTextVNode(" (LFI client cert)")
                      ]),
                      createVNode("td", null, "The LFI presents this client certificate when calling the Consent Manager and Headless Heimdall Auth Server.")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "API Hub → LFI"),
                      createVNode("td", null, [
                        createVNode("strong", null, "S3"),
                        createTextVNode(" (API Hub server cert)")
                      ]),
                      createVNode("td", null, "The Consent Manager and Headless Heimdall servers present this certificate to identify themselves to the LFI.")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "Request signing (JWT Auth)"),
                      createVNode("td", null, [
                        createVNode("strong", null, "Sig4")
                      ]),
                      createVNode("td", null, "The LFI signs JWT Auth headers on requests to the Consent Manager and Headless Heimdall. Only applicable when JWT Auth is selected.")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "Response signing (JWT Auth)"),
                      createVNode("td", null, [
                        createVNode("strong", null, "Sig3")
                      ]),
                      createVNode("td", null, "The API Hub signs JWT Auth headers on Consent Manager and Headless Heimdall responses. Only applicable when JWT Auth is selected.")
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
          createVNode("h3", null, "TPP to API Hub"),
          createVNode(_component_EdRefTable, null, {
            default: withCtx(() => [
              createVNode("table", null, [
                createVNode("thead", null, [
                  createVNode("tr", null, [
                    createVNode("th", null, "Connection"),
                    createVNode("th", null, "Certificate"),
                    createVNode("th", null, "Description")
                  ])
                ]),
                createVNode("tbody", null, [
                  createVNode("tr", null, [
                    createVNode("td", null, "TPP → API Hub"),
                    createVNode("td", null, [
                      createVNode("strong", null, "C1"),
                      createTextVNode(" (TPP client cert)")
                    ]),
                    createVNode("td", null, "The TPP presents its client certificate to identify itself to the API Hub.")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, "API Hub → TPP"),
                    createVNode("td", null, [
                      createVNode("strong", null, "S1"),
                      createTextVNode(" (API Hub server cert)")
                    ]),
                    createVNode("td", null, "The API Hub presents this server certificate to identify the LFI's API Hub instance to the TPP.")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, "Request signing"),
                    createVNode("td", null, [
                      createVNode("strong", null, "Sig1")
                    ]),
                    createVNode("td", null, [
                      createTextVNode("The TPP signs request JWTs (e.g. PAR request objects and "),
                      createVNode("code", null, "private_key_jwt"),
                      createTextVNode(" client assertions) sent to the API Hub. The API Hub verifies using the public key in the TPP's JWKS.")
                    ])
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, "Response signing"),
                    createVNode("td", null, [
                      createVNode("strong", null, "Sig2")
                    ]),
                    createVNode("td", null, [
                      createTextVNode("The API Hub signs responses and "),
                      createVNode("code", null, "id_token"),
                      createTextVNode(" payloads sent to the TPP. The TPP verifies using the public key in the JWKS.")
                    ])
                  ])
                ])
              ])
            ]),
            _: 1
          }),
          createVNode("h3", null, "API Hub to LFI (Ozone Connect)"),
          createVNode(_component_EdRefTable, null, {
            default: withCtx(() => [
              createVNode("table", null, [
                createVNode("thead", null, [
                  createVNode("tr", null, [
                    createVNode("th", null, "Connection"),
                    createVNode("th", null, "Certificate"),
                    createVNode("th", null, "Description")
                  ])
                ]),
                createVNode("tbody", null, [
                  createVNode("tr", null, [
                    createVNode("td", null, "API Hub → LFI"),
                    createVNode("td", null, [
                      createVNode("strong", null, "C4"),
                      createTextVNode(" (API Hub client cert)")
                    ]),
                    createVNode("td", null, "The API Hub presents this client certificate when calling the LFI's Ozone Connect endpoints.")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, "LFI → API Hub"),
                    createVNode("td", null, [
                      createVNode("strong", null, "S4"),
                      createTextVNode(" (LFI server cert)")
                    ]),
                    createVNode("td", null, "The LFI's Ozone Connect server presents this certificate to identify itself to the API Hub.")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, "Request signing (JWT Auth)"),
                    createVNode("td", null, [
                      createVNode("strong", null, "Sig3")
                    ]),
                    createVNode("td", null, [
                      createTextVNode(" The API Hub signs JWT Auth headers on Ozone Connect requests. Only applicable when "),
                      createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/application-layer-auth#jwt-auth" }, "JWT Auth"),
                      createTextVNode(" is selected. ")
                    ])
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, "Response signing (JWT Auth)"),
                    createVNode("td", null, [
                      createVNode("strong", null, "Sig4")
                    ]),
                    createVNode("td", null, "The LFI signs JWT Auth headers on Ozone Connect responses. Only applicable when JWT Auth is selected.")
                  ])
                ])
              ])
            ]),
            _: 1
          }),
          createVNode("h3", null, "LFI to API Hub (Consent Manager & Headless Heimdall)"),
          createVNode(_component_EdRefTable, null, {
            default: withCtx(() => [
              createVNode("table", null, [
                createVNode("thead", null, [
                  createVNode("tr", null, [
                    createVNode("th", null, "Connection"),
                    createVNode("th", null, "Certificate"),
                    createVNode("th", null, "Description")
                  ])
                ]),
                createVNode("tbody", null, [
                  createVNode("tr", null, [
                    createVNode("td", null, "LFI → API Hub"),
                    createVNode("td", null, [
                      createVNode("strong", null, "C3"),
                      createTextVNode(" (LFI client cert)")
                    ]),
                    createVNode("td", null, "The LFI presents this client certificate when calling the Consent Manager and Headless Heimdall Auth Server.")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, "API Hub → LFI"),
                    createVNode("td", null, [
                      createVNode("strong", null, "S3"),
                      createTextVNode(" (API Hub server cert)")
                    ]),
                    createVNode("td", null, "The Consent Manager and Headless Heimdall servers present this certificate to identify themselves to the LFI.")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, "Request signing (JWT Auth)"),
                    createVNode("td", null, [
                      createVNode("strong", null, "Sig4")
                    ]),
                    createVNode("td", null, "The LFI signs JWT Auth headers on requests to the Consent Manager and Headless Heimdall. Only applicable when JWT Auth is selected.")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, "Response signing (JWT Auth)"),
                    createVNode("td", null, [
                      createVNode("strong", null, "Sig3")
                    ]),
                    createVNode("td", null, "The API Hub signs JWT Auth headers on Consent Manager and Headless Heimdall responses. Only applicable when JWT Auth is selected.")
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
    id: "payload-encryption",
    num: "03",
    color: "var(--at-blue-deep, #1d4ed8)",
    eyebrow: "Payload encryption",
    title: "JWE encryption keys for sensitive payloads",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Payload encryption is separate from transport: <strong data-v-8bc4acf9${_scopeId2}>Enc1</strong> and <strong data-v-8bc4acf9${_scopeId2}>Enc2</strong> are JWE keys applied to the message body, not to the TLS connection. The sequence below shows how each one is used. `);
            } else {
              return [
                createTextVNode(" Payload encryption is separate from transport: "),
                createVNode("strong", null, "Enc1"),
                createTextVNode(" and "),
                createVNode("strong", null, "Enc2"),
                createTextVNode(" are JWE keys applied to the message body, not to the TLS connection. The sequence below shows how each one is used. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_APIFlowViewer, { title: "Payload encryption flows" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_APIFlowsConnectivityEncryption, null, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_APIFlowsConnectivityEncryption)
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdRefTable, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<table data-v-8bc4acf9${_scopeId2}><thead data-v-8bc4acf9${_scopeId2}><tr data-v-8bc4acf9${_scopeId2}><th data-v-8bc4acf9${_scopeId2}>Certificate</th><th data-v-8bc4acf9${_scopeId2}>Description</th></tr></thead><tbody data-v-8bc4acf9${_scopeId2}><tr data-v-8bc4acf9${_scopeId2}><td data-v-8bc4acf9${_scopeId2}><strong data-v-8bc4acf9${_scopeId2}>Enc1</strong> (LFI encryption key)</td><td data-v-8bc4acf9${_scopeId2}>Used by the TPP to encrypt Personally Identifiable Information (PII) sent via the API Hub. Only the LFI can decrypt this data using its private key.</td></tr><tr data-v-8bc4acf9${_scopeId2}><td data-v-8bc4acf9${_scopeId2}><strong data-v-8bc4acf9${_scopeId2}>Enc2</strong> (TPP encryption key)</td><td data-v-8bc4acf9${_scopeId2}>Used by the API Hub to encrypt webhook event payloads sent to the TPP. Only the TPP can decrypt using its private key.</td></tr></tbody></table>`);
            } else {
              return [
                createVNode("table", null, [
                  createVNode("thead", null, [
                    createVNode("tr", null, [
                      createVNode("th", null, "Certificate"),
                      createVNode("th", null, "Description")
                    ])
                  ]),
                  createVNode("tbody", null, [
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("strong", null, "Enc1"),
                        createTextVNode(" (LFI encryption key)")
                      ]),
                      createVNode("td", null, "Used by the TPP to encrypt Personally Identifiable Information (PII) sent via the API Hub. Only the LFI can decrypt this data using its private key.")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("strong", null, "Enc2"),
                        createTextVNode(" (TPP encryption key)")
                      ]),
                      createVNode("td", null, "Used by the API Hub to encrypt webhook event payloads sent to the TPP. Only the TPP can decrypt using its private key.")
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
              createTextVNode(" Payload encryption is separate from transport: "),
              createVNode("strong", null, "Enc1"),
              createTextVNode(" and "),
              createVNode("strong", null, "Enc2"),
              createTextVNode(" are JWE keys applied to the message body, not to the TLS connection. The sequence below shows how each one is used. ")
            ]),
            _: 1
          }),
          createVNode(_component_APIFlowViewer, { title: "Payload encryption flows" }, {
            default: withCtx(() => [
              createVNode(_component_APIFlowsConnectivityEncryption)
            ]),
            _: 1
          }),
          createVNode(_component_EdRefTable, null, {
            default: withCtx(() => [
              createVNode("table", null, [
                createVNode("thead", null, [
                  createVNode("tr", null, [
                    createVNode("th", null, "Certificate"),
                    createVNode("th", null, "Description")
                  ])
                ]),
                createVNode("tbody", null, [
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("strong", null, "Enc1"),
                      createTextVNode(" (LFI encryption key)")
                    ]),
                    createVNode("td", null, "Used by the TPP to encrypt Personally Identifiable Information (PII) sent via the API Hub. Only the LFI can decrypt this data using its private key.")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("strong", null, "Enc2"),
                      createTextVNode(" (TPP encryption key)")
                    ]),
                    createVNode("td", null, "Used by the API Hub to encrypt webhook event payloads sent to the TPP. Only the TPP can decrypt using its private key.")
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
    id: "certificate-summary",
    num: "04",
    color: "var(--at-navy)",
    eyebrow: "Certificate summary",
    title: "Who holds each private key, and where it is created",
    tone: "surface"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` The table below summarises all certificates, who holds the private key, and where the certificate is created in the Trust Framework. `);
            } else {
              return [
                createTextVNode(" The table below summarises all certificates, who holds the private key, and where the certificate is created in the Trust Framework. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdRefTable, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<table data-v-8bc4acf9${_scopeId2}><thead data-v-8bc4acf9${_scopeId2}><tr data-v-8bc4acf9${_scopeId2}><th data-v-8bc4acf9${_scopeId2}>Certificate</th><th data-v-8bc4acf9${_scopeId2}>Type</th><th data-v-8bc4acf9${_scopeId2}>Private Key Held By</th><th data-v-8bc4acf9${_scopeId2}>Trust Framework Location</th><th data-v-8bc4acf9${_scopeId2}>Purpose</th></tr></thead><tbody data-v-8bc4acf9${_scopeId2}><tr data-v-8bc4acf9${_scopeId2}><td data-v-8bc4acf9${_scopeId2}><strong data-v-8bc4acf9${_scopeId2}>S1</strong></td><td data-v-8bc4acf9${_scopeId2}>Server Transport</td><td data-v-8bc4acf9${_scopeId2}>Ozone</td><td data-v-8bc4acf9${_scopeId2}>LFI&#39;s organisation</td><td data-v-8bc4acf9${_scopeId2}>Identifies the LFI&#39;s API Hub instance to TPPs</td></tr><tr data-v-8bc4acf9${_scopeId2}><td data-v-8bc4acf9${_scopeId2}><strong data-v-8bc4acf9${_scopeId2}>S3</strong></td><td data-v-8bc4acf9${_scopeId2}>Server Transport</td><td data-v-8bc4acf9${_scopeId2}>Ozone</td><td data-v-8bc4acf9${_scopeId2}>LFI&#39;s organisation</td><td data-v-8bc4acf9${_scopeId2}>Identifies the CM &amp; HH servers to the LFI</td></tr><tr data-v-8bc4acf9${_scopeId2}><td data-v-8bc4acf9${_scopeId2}><strong data-v-8bc4acf9${_scopeId2}>S4</strong></td><td data-v-8bc4acf9${_scopeId2}>Server Transport</td><td data-v-8bc4acf9${_scopeId2}>LFI</td><td data-v-8bc4acf9${_scopeId2}>LFI&#39;s organisation</td><td data-v-8bc4acf9${_scopeId2}>Identifies the LFI&#39;s Ozone Connect server to the API Hub</td></tr><tr data-v-8bc4acf9${_scopeId2}><td data-v-8bc4acf9${_scopeId2}><strong data-v-8bc4acf9${_scopeId2}>C1</strong></td><td data-v-8bc4acf9${_scopeId2}>Client Transport</td><td data-v-8bc4acf9${_scopeId2}>TPP</td><td data-v-8bc4acf9${_scopeId2}>TPP&#39;s organisation</td><td data-v-8bc4acf9${_scopeId2}>Identifies the TPP when calling the API Hub</td></tr><tr data-v-8bc4acf9${_scopeId2}><td data-v-8bc4acf9${_scopeId2}><strong data-v-8bc4acf9${_scopeId2}>C3</strong></td><td data-v-8bc4acf9${_scopeId2}>Client Transport</td><td data-v-8bc4acf9${_scopeId2}>LFI</td><td data-v-8bc4acf9${_scopeId2}>LFI&#39;s organisation (<code data-v-8bc4acf9${_scopeId2}>C3-hh-cm-client</code> application)</td><td data-v-8bc4acf9${_scopeId2}>Identifies the LFI when calling CM &amp; HH</td></tr><tr data-v-8bc4acf9${_scopeId2}><td data-v-8bc4acf9${_scopeId2}><strong data-v-8bc4acf9${_scopeId2}>C4</strong></td><td data-v-8bc4acf9${_scopeId2}>Client Transport</td><td data-v-8bc4acf9${_scopeId2}>Ozone</td><td data-v-8bc4acf9${_scopeId2}>Ozone&#39;s organisation</td><td data-v-8bc4acf9${_scopeId2}>Identifies the API Hub when calling Ozone Connect</td></tr><tr data-v-8bc4acf9${_scopeId2}><td data-v-8bc4acf9${_scopeId2}><strong data-v-8bc4acf9${_scopeId2}>Sig1</strong></td><td data-v-8bc4acf9${_scopeId2}>Signing</td><td data-v-8bc4acf9${_scopeId2}>TPP</td><td data-v-8bc4acf9${_scopeId2}>TPP&#39;s organisation</td><td data-v-8bc4acf9${_scopeId2}>Signs TPP request JWTs (e.g. PAR request objects, <code data-v-8bc4acf9${_scopeId2}>private_key_jwt</code>)</td></tr><tr data-v-8bc4acf9${_scopeId2}><td data-v-8bc4acf9${_scopeId2}><strong data-v-8bc4acf9${_scopeId2}>Sig2</strong></td><td data-v-8bc4acf9${_scopeId2}>Signing</td><td data-v-8bc4acf9${_scopeId2}>Ozone</td><td data-v-8bc4acf9${_scopeId2}>LFI&#39;s organisation</td><td data-v-8bc4acf9${_scopeId2}>Signs API Hub responses and <code data-v-8bc4acf9${_scopeId2}>id_token</code> sent to TPPs</td></tr><tr data-v-8bc4acf9${_scopeId2}><td data-v-8bc4acf9${_scopeId2}><strong data-v-8bc4acf9${_scopeId2}>Sig3</strong></td><td data-v-8bc4acf9${_scopeId2}>Signing</td><td data-v-8bc4acf9${_scopeId2}>Ozone</td><td data-v-8bc4acf9${_scopeId2}>Ozone&#39;s organisation</td><td data-v-8bc4acf9${_scopeId2}>Signs JWT Auth headers on API Hub requests/responses to the LFI</td></tr><tr data-v-8bc4acf9${_scopeId2}><td data-v-8bc4acf9${_scopeId2}><strong data-v-8bc4acf9${_scopeId2}>Sig4</strong></td><td data-v-8bc4acf9${_scopeId2}>Signing</td><td data-v-8bc4acf9${_scopeId2}>LFI</td><td data-v-8bc4acf9${_scopeId2}>LFI&#39;s organisation (<code data-v-8bc4acf9${_scopeId2}>C3-hh-cm-client</code> application)</td><td data-v-8bc4acf9${_scopeId2}>Signs JWT Auth headers on LFI requests/responses to the API Hub</td></tr><tr data-v-8bc4acf9${_scopeId2}><td data-v-8bc4acf9${_scopeId2}><strong data-v-8bc4acf9${_scopeId2}>Enc1</strong></td><td data-v-8bc4acf9${_scopeId2}>Server Encryption</td><td data-v-8bc4acf9${_scopeId2}>LFI</td><td data-v-8bc4acf9${_scopeId2}>LFI&#39;s organisation</td><td data-v-8bc4acf9${_scopeId2}>Encrypts PII — only the LFI can decrypt</td></tr><tr data-v-8bc4acf9${_scopeId2}><td data-v-8bc4acf9${_scopeId2}><strong data-v-8bc4acf9${_scopeId2}>Enc2</strong></td><td data-v-8bc4acf9${_scopeId2}>Client Encryption</td><td data-v-8bc4acf9${_scopeId2}>TPP</td><td data-v-8bc4acf9${_scopeId2}>TPP&#39;s organisation</td><td data-v-8bc4acf9${_scopeId2}>Encrypts webhook event payloads — only the TPP can decrypt</td></tr></tbody></table>`);
            } else {
              return [
                createVNode("table", null, [
                  createVNode("thead", null, [
                    createVNode("tr", null, [
                      createVNode("th", null, "Certificate"),
                      createVNode("th", null, "Type"),
                      createVNode("th", null, "Private Key Held By"),
                      createVNode("th", null, "Trust Framework Location"),
                      createVNode("th", null, "Purpose")
                    ])
                  ]),
                  createVNode("tbody", null, [
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("strong", null, "S1")
                      ]),
                      createVNode("td", null, "Server Transport"),
                      createVNode("td", null, "Ozone"),
                      createVNode("td", null, "LFI's organisation"),
                      createVNode("td", null, "Identifies the LFI's API Hub instance to TPPs")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("strong", null, "S3")
                      ]),
                      createVNode("td", null, "Server Transport"),
                      createVNode("td", null, "Ozone"),
                      createVNode("td", null, "LFI's organisation"),
                      createVNode("td", null, "Identifies the CM & HH servers to the LFI")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("strong", null, "S4")
                      ]),
                      createVNode("td", null, "Server Transport"),
                      createVNode("td", null, "LFI"),
                      createVNode("td", null, "LFI's organisation"),
                      createVNode("td", null, "Identifies the LFI's Ozone Connect server to the API Hub")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("strong", null, "C1")
                      ]),
                      createVNode("td", null, "Client Transport"),
                      createVNode("td", null, "TPP"),
                      createVNode("td", null, "TPP's organisation"),
                      createVNode("td", null, "Identifies the TPP when calling the API Hub")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("strong", null, "C3")
                      ]),
                      createVNode("td", null, "Client Transport"),
                      createVNode("td", null, "LFI"),
                      createVNode("td", null, [
                        createTextVNode("LFI's organisation ("),
                        createVNode("code", null, "C3-hh-cm-client"),
                        createTextVNode(" application)")
                      ]),
                      createVNode("td", null, "Identifies the LFI when calling CM & HH")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("strong", null, "C4")
                      ]),
                      createVNode("td", null, "Client Transport"),
                      createVNode("td", null, "Ozone"),
                      createVNode("td", null, "Ozone's organisation"),
                      createVNode("td", null, "Identifies the API Hub when calling Ozone Connect")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("strong", null, "Sig1")
                      ]),
                      createVNode("td", null, "Signing"),
                      createVNode("td", null, "TPP"),
                      createVNode("td", null, "TPP's organisation"),
                      createVNode("td", null, [
                        createTextVNode("Signs TPP request JWTs (e.g. PAR request objects, "),
                        createVNode("code", null, "private_key_jwt"),
                        createTextVNode(")")
                      ])
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("strong", null, "Sig2")
                      ]),
                      createVNode("td", null, "Signing"),
                      createVNode("td", null, "Ozone"),
                      createVNode("td", null, "LFI's organisation"),
                      createVNode("td", null, [
                        createTextVNode("Signs API Hub responses and "),
                        createVNode("code", null, "id_token"),
                        createTextVNode(" sent to TPPs")
                      ])
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("strong", null, "Sig3")
                      ]),
                      createVNode("td", null, "Signing"),
                      createVNode("td", null, "Ozone"),
                      createVNode("td", null, "Ozone's organisation"),
                      createVNode("td", null, "Signs JWT Auth headers on API Hub requests/responses to the LFI")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("strong", null, "Sig4")
                      ]),
                      createVNode("td", null, "Signing"),
                      createVNode("td", null, "LFI"),
                      createVNode("td", null, [
                        createTextVNode("LFI's organisation ("),
                        createVNode("code", null, "C3-hh-cm-client"),
                        createTextVNode(" application)")
                      ]),
                      createVNode("td", null, "Signs JWT Auth headers on LFI requests/responses to the API Hub")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("strong", null, "Enc1")
                      ]),
                      createVNode("td", null, "Server Encryption"),
                      createVNode("td", null, "LFI"),
                      createVNode("td", null, "LFI's organisation"),
                      createVNode("td", null, "Encrypts PII — only the LFI can decrypt")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("strong", null, "Enc2")
                      ]),
                      createVNode("td", null, "Client Encryption"),
                      createVNode("td", null, "TPP"),
                      createVNode("td", null, "TPP's organisation"),
                      createVNode("td", null, "Encrypts webhook event payloads — only the TPP can decrypt")
                    ])
                  ])
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdNote, {
          type: "info",
          title: "Trust Framework certificate types"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<p data-v-8bc4acf9${_scopeId2}>When creating these certificates in the Trust Framework, select the following types:</p><ul data-v-8bc4acf9${_scopeId2}><li data-v-8bc4acf9${_scopeId2}><strong data-v-8bc4acf9${_scopeId2}>C1, C3, C4</strong> — <code data-v-8bc4acf9${_scopeId2}>OPF UAE CLIENT TRANSPORT</code></li><li data-v-8bc4acf9${_scopeId2}><strong data-v-8bc4acf9${_scopeId2}>S1, S3, S4</strong> — <code data-v-8bc4acf9${_scopeId2}>OPF UAE SERVER TRANSPORT</code></li><li data-v-8bc4acf9${_scopeId2}><strong data-v-8bc4acf9${_scopeId2}>Sig1, Sig2, Sig3, Sig4</strong> — <code data-v-8bc4acf9${_scopeId2}>OPF UAE CLIENT SIGNING</code></li><li data-v-8bc4acf9${_scopeId2}><strong data-v-8bc4acf9${_scopeId2}>Enc1</strong> — <code data-v-8bc4acf9${_scopeId2}>SERVER ENCKEY</code></li><li data-v-8bc4acf9${_scopeId2}><strong data-v-8bc4acf9${_scopeId2}>Enc2</strong> — <code data-v-8bc4acf9${_scopeId2}>OPF UAE CLIENT ENCRYPTION</code></li></ul>`);
            } else {
              return [
                createVNode("p", null, "When creating these certificates in the Trust Framework, select the following types:"),
                createVNode("ul", null, [
                  createVNode("li", null, [
                    createVNode("strong", null, "C1, C3, C4"),
                    createTextVNode(" — "),
                    createVNode("code", null, "OPF UAE CLIENT TRANSPORT")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "S1, S3, S4"),
                    createTextVNode(" — "),
                    createVNode("code", null, "OPF UAE SERVER TRANSPORT")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Sig1, Sig2, Sig3, Sig4"),
                    createTextVNode(" — "),
                    createVNode("code", null, "OPF UAE CLIENT SIGNING")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Enc1"),
                    createTextVNode(" — "),
                    createVNode("code", null, "SERVER ENCKEY")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Enc2"),
                    createTextVNode(" — "),
                    createVNode("code", null, "OPF UAE CLIENT ENCRYPTION")
                  ])
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdNote, {
          type: "info",
          title: "Sig3 and Sig4"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<p data-v-8bc4acf9${_scopeId2}> The <strong data-v-8bc4acf9${_scopeId2}>Sig3</strong> and <strong data-v-8bc4acf9${_scopeId2}>Sig4</strong> certificates are only required when <a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/application-layer-auth#jwt-auth" data-v-8bc4acf9${_scopeId2}>JWT Auth</a> is selected as the application layer authentication method. </p>`);
            } else {
              return [
                createVNode("p", null, [
                  createTextVNode(" The "),
                  createVNode("strong", null, "Sig3"),
                  createTextVNode(" and "),
                  createVNode("strong", null, "Sig4"),
                  createTextVNode(" certificates are only required when "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/application-layer-auth#jwt-auth" }, "JWT Auth"),
                  createTextVNode(" is selected as the application layer authentication method. ")
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
              createTextVNode(" The table below summarises all certificates, who holds the private key, and where the certificate is created in the Trust Framework. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdRefTable, null, {
            default: withCtx(() => [
              createVNode("table", null, [
                createVNode("thead", null, [
                  createVNode("tr", null, [
                    createVNode("th", null, "Certificate"),
                    createVNode("th", null, "Type"),
                    createVNode("th", null, "Private Key Held By"),
                    createVNode("th", null, "Trust Framework Location"),
                    createVNode("th", null, "Purpose")
                  ])
                ]),
                createVNode("tbody", null, [
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("strong", null, "S1")
                    ]),
                    createVNode("td", null, "Server Transport"),
                    createVNode("td", null, "Ozone"),
                    createVNode("td", null, "LFI's organisation"),
                    createVNode("td", null, "Identifies the LFI's API Hub instance to TPPs")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("strong", null, "S3")
                    ]),
                    createVNode("td", null, "Server Transport"),
                    createVNode("td", null, "Ozone"),
                    createVNode("td", null, "LFI's organisation"),
                    createVNode("td", null, "Identifies the CM & HH servers to the LFI")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("strong", null, "S4")
                    ]),
                    createVNode("td", null, "Server Transport"),
                    createVNode("td", null, "LFI"),
                    createVNode("td", null, "LFI's organisation"),
                    createVNode("td", null, "Identifies the LFI's Ozone Connect server to the API Hub")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("strong", null, "C1")
                    ]),
                    createVNode("td", null, "Client Transport"),
                    createVNode("td", null, "TPP"),
                    createVNode("td", null, "TPP's organisation"),
                    createVNode("td", null, "Identifies the TPP when calling the API Hub")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("strong", null, "C3")
                    ]),
                    createVNode("td", null, "Client Transport"),
                    createVNode("td", null, "LFI"),
                    createVNode("td", null, [
                      createTextVNode("LFI's organisation ("),
                      createVNode("code", null, "C3-hh-cm-client"),
                      createTextVNode(" application)")
                    ]),
                    createVNode("td", null, "Identifies the LFI when calling CM & HH")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("strong", null, "C4")
                    ]),
                    createVNode("td", null, "Client Transport"),
                    createVNode("td", null, "Ozone"),
                    createVNode("td", null, "Ozone's organisation"),
                    createVNode("td", null, "Identifies the API Hub when calling Ozone Connect")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("strong", null, "Sig1")
                    ]),
                    createVNode("td", null, "Signing"),
                    createVNode("td", null, "TPP"),
                    createVNode("td", null, "TPP's organisation"),
                    createVNode("td", null, [
                      createTextVNode("Signs TPP request JWTs (e.g. PAR request objects, "),
                      createVNode("code", null, "private_key_jwt"),
                      createTextVNode(")")
                    ])
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("strong", null, "Sig2")
                    ]),
                    createVNode("td", null, "Signing"),
                    createVNode("td", null, "Ozone"),
                    createVNode("td", null, "LFI's organisation"),
                    createVNode("td", null, [
                      createTextVNode("Signs API Hub responses and "),
                      createVNode("code", null, "id_token"),
                      createTextVNode(" sent to TPPs")
                    ])
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("strong", null, "Sig3")
                    ]),
                    createVNode("td", null, "Signing"),
                    createVNode("td", null, "Ozone"),
                    createVNode("td", null, "Ozone's organisation"),
                    createVNode("td", null, "Signs JWT Auth headers on API Hub requests/responses to the LFI")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("strong", null, "Sig4")
                    ]),
                    createVNode("td", null, "Signing"),
                    createVNode("td", null, "LFI"),
                    createVNode("td", null, [
                      createTextVNode("LFI's organisation ("),
                      createVNode("code", null, "C3-hh-cm-client"),
                      createTextVNode(" application)")
                    ]),
                    createVNode("td", null, "Signs JWT Auth headers on LFI requests/responses to the API Hub")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("strong", null, "Enc1")
                    ]),
                    createVNode("td", null, "Server Encryption"),
                    createVNode("td", null, "LFI"),
                    createVNode("td", null, "LFI's organisation"),
                    createVNode("td", null, "Encrypts PII — only the LFI can decrypt")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("strong", null, "Enc2")
                    ]),
                    createVNode("td", null, "Client Encryption"),
                    createVNode("td", null, "TPP"),
                    createVNode("td", null, "TPP's organisation"),
                    createVNode("td", null, "Encrypts webhook event payloads — only the TPP can decrypt")
                  ])
                ])
              ])
            ]),
            _: 1
          }),
          createVNode(_component_EdNote, {
            type: "info",
            title: "Trust Framework certificate types"
          }, {
            default: withCtx(() => [
              createVNode("p", null, "When creating these certificates in the Trust Framework, select the following types:"),
              createVNode("ul", null, [
                createVNode("li", null, [
                  createVNode("strong", null, "C1, C3, C4"),
                  createTextVNode(" — "),
                  createVNode("code", null, "OPF UAE CLIENT TRANSPORT")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "S1, S3, S4"),
                  createTextVNode(" — "),
                  createVNode("code", null, "OPF UAE SERVER TRANSPORT")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "Sig1, Sig2, Sig3, Sig4"),
                  createTextVNode(" — "),
                  createVNode("code", null, "OPF UAE CLIENT SIGNING")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "Enc1"),
                  createTextVNode(" — "),
                  createVNode("code", null, "SERVER ENCKEY")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "Enc2"),
                  createTextVNode(" — "),
                  createVNode("code", null, "OPF UAE CLIENT ENCRYPTION")
                ])
              ])
            ]),
            _: 1
          }),
          createVNode(_component_EdNote, {
            type: "info",
            title: "Sig3 and Sig4"
          }, {
            default: withCtx(() => [
              createVNode("p", null, [
                createTextVNode(" The "),
                createVNode("strong", null, "Sig3"),
                createTextVNode(" and "),
                createVNode("strong", null, "Sig4"),
                createTextVNode(" certificates are only required when "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/application-layer-auth#jwt-auth" }, "JWT Auth"),
                createTextVNode(" is selected as the application layer authentication method. ")
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
    id: "who-does-what",
    num: "05",
    color: "var(--at-teal-deep)",
    eyebrow: "Who does what",
    title: "Certificate generation responsibilities",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<h3 data-v-8bc4acf9${_scopeId}>Ozone-held certificates (S1, S3, Sig2, C4, Sig3)</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` For certificates where <strong data-v-8bc4acf9${_scopeId2}>Ozone holds the private key</strong>, the process is: `);
            } else {
              return [
                createTextVNode(" For certificates where "),
                createVNode("strong", null, "Ozone holds the private key"),
                createTextVNode(", the process is: ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-8bc4acf9${_scopeId2}>Ozone generates the private key and a Certificate Signing Request (CSR).</li><li data-v-8bc4acf9${_scopeId2}><strong data-v-8bc4acf9${_scopeId2}>For S1, S3, and Sig2:</strong> Ozone provides the CSR to the LFI. The LFI uploads the CSR to their own organisation in the Trust Framework to generate the certificate, then provides the JWKS URL and KID back to Ozone.</li><li data-v-8bc4acf9${_scopeId2}><strong data-v-8bc4acf9${_scopeId2}>For C4 and Sig3:</strong> These certificates are in Ozone&#39;s own Trust Framework organisation. Ozone provides the JWKS URL and KID to the LFI. No action is required from the LFI for these certificates.</li>`);
            } else {
              return [
                createVNode("li", null, "Ozone generates the private key and a Certificate Signing Request (CSR)."),
                createVNode("li", null, [
                  createVNode("strong", null, "For S1, S3, and Sig2:"),
                  createTextVNode(" Ozone provides the CSR to the LFI. The LFI uploads the CSR to their own organisation in the Trust Framework to generate the certificate, then provides the JWKS URL and KID back to Ozone.")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "For C4 and Sig3:"),
                  createTextVNode(" These certificates are in Ozone's own Trust Framework organisation. Ozone provides the JWKS URL and KID to the LFI. No action is required from the LFI for these certificates.")
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 data-v-8bc4acf9${_scopeId}>LFI-held certificates (C3, S4, Sig4, Enc1)</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` For certificates where the <strong data-v-8bc4acf9${_scopeId2}>LFI holds the private key</strong>, the process is: `);
            } else {
              return [
                createTextVNode(" For certificates where the "),
                createVNode("strong", null, "LFI holds the private key"),
                createTextVNode(", the process is: ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-8bc4acf9${_scopeId2}>The LFI generates the private key and CSR.</li><li data-v-8bc4acf9${_scopeId2}><strong data-v-8bc4acf9${_scopeId2}>For C3 and Sig4:</strong> The LFI creates the certificate in the <code data-v-8bc4acf9${_scopeId2}>C3-hh-cm-client</code> application in the Trust Framework. See <a href="/tech/lfi-api-hub/trust-framework/creating-c3-application" data-v-8bc4acf9${_scopeId2}>Creating the C3-hh-cm-client Application</a> and <a href="/tech/lfi-api-hub/trust-framework/certificates/" data-v-8bc4acf9${_scopeId2}>Keys &amp; Certificates</a>. </li><li data-v-8bc4acf9${_scopeId2}><strong data-v-8bc4acf9${_scopeId2}>For S4 and Enc1:</strong> The LFI creates the certificate under Organisation Certificates in the Trust Framework.</li><li data-v-8bc4acf9${_scopeId2}>The LFI provides the JWKS URL and KID to Ozone.</li>`);
            } else {
              return [
                createVNode("li", null, "The LFI generates the private key and CSR."),
                createVNode("li", null, [
                  createVNode("strong", null, "For C3 and Sig4:"),
                  createTextVNode(" The LFI creates the certificate in the "),
                  createVNode("code", null, "C3-hh-cm-client"),
                  createTextVNode(" application in the Trust Framework. See "),
                  createVNode("a", { href: "/tech/lfi-api-hub/trust-framework/creating-c3-application" }, "Creating the C3-hh-cm-client Application"),
                  createTextVNode(" and "),
                  createVNode("a", { href: "/tech/lfi-api-hub/trust-framework/certificates/" }, "Keys & Certificates"),
                  createTextVNode(". ")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "For S4 and Enc1:"),
                  createTextVNode(" The LFI creates the certificate under Organisation Certificates in the Trust Framework.")
                ]),
                createVNode("li", null, "The LFI provides the JWKS URL and KID to Ozone.")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdNote, {
          type: "tip",
          title: "Certificate reuse across brands"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<p data-v-8bc4acf9${_scopeId2}> If your institution operates multiple API Hub instances (e.g. for retail and business brands), LFI-held certificates (C3, S4, Sig4, Enc1) MAY be reused across brands. Each brand still requires its own environment-specific onboarding form, but can reference the same certificates if appropriate. </p>`);
            } else {
              return [
                createVNode("p", null, " If your institution operates multiple API Hub instances (e.g. for retail and business brands), LFI-held certificates (C3, S4, Sig4, Enc1) MAY be reused across brands. Each brand still requires its own environment-specific onboarding form, but can reference the same certificates if appropriate. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode("h3", null, "Ozone-held certificates (S1, S3, Sig2, C4, Sig3)"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" For certificates where "),
              createVNode("strong", null, "Ozone holds the private key"),
              createTextVNode(", the process is: ")
            ]),
            _: 1
          }),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, "Ozone generates the private key and a Certificate Signing Request (CSR)."),
              createVNode("li", null, [
                createVNode("strong", null, "For S1, S3, and Sig2:"),
                createTextVNode(" Ozone provides the CSR to the LFI. The LFI uploads the CSR to their own organisation in the Trust Framework to generate the certificate, then provides the JWKS URL and KID back to Ozone.")
              ]),
              createVNode("li", null, [
                createVNode("strong", null, "For C4 and Sig3:"),
                createTextVNode(" These certificates are in Ozone's own Trust Framework organisation. Ozone provides the JWKS URL and KID to the LFI. No action is required from the LFI for these certificates.")
              ])
            ]),
            _: 1
          }),
          createVNode("h3", null, "LFI-held certificates (C3, S4, Sig4, Enc1)"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" For certificates where the "),
              createVNode("strong", null, "LFI holds the private key"),
              createTextVNode(", the process is: ")
            ]),
            _: 1
          }),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, "The LFI generates the private key and CSR."),
              createVNode("li", null, [
                createVNode("strong", null, "For C3 and Sig4:"),
                createTextVNode(" The LFI creates the certificate in the "),
                createVNode("code", null, "C3-hh-cm-client"),
                createTextVNode(" application in the Trust Framework. See "),
                createVNode("a", { href: "/tech/lfi-api-hub/trust-framework/creating-c3-application" }, "Creating the C3-hh-cm-client Application"),
                createTextVNode(" and "),
                createVNode("a", { href: "/tech/lfi-api-hub/trust-framework/certificates/" }, "Keys & Certificates"),
                createTextVNode(". ")
              ]),
              createVNode("li", null, [
                createVNode("strong", null, "For S4 and Enc1:"),
                createTextVNode(" The LFI creates the certificate under Organisation Certificates in the Trust Framework.")
              ]),
              createVNode("li", null, "The LFI provides the JWKS URL and KID to Ozone.")
            ]),
            _: 1
          }),
          createVNode(_component_EdNote, {
            type: "tip",
            title: "Certificate reuse across brands"
          }, {
            default: withCtx(() => [
              createVNode("p", null, " If your institution operates multiple API Hub instances (e.g. for retail and business brands), LFI-held certificates (C3, S4, Sig4, Enc1) MAY be reused across brands. Each brand still requires its own environment-specific onboarding form, but can reference the same certificates if appropriate. ")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "next-steps",
    num: "06",
    color: "var(--at-gold)",
    eyebrow: "Next steps",
    title: "Where to go next",
    tone: "surface"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-8bc4acf9${_scopeId2}><a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/" data-v-8bc4acf9${_scopeId2}>Environment Specific Configuration</a> — the onboarding form where all certificate details are exchanged </li><li data-v-8bc4acf9${_scopeId2}><a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/application-layer-auth" data-v-8bc4acf9${_scopeId2}>Application Layer Authentication</a> — choose your application layer authentication method (determines whether Sig3/Sig4 are required) </li><li data-v-8bc4acf9${_scopeId2}><a href="/tech/lfi-api-hub/trust-framework/certificates/" data-v-8bc4acf9${_scopeId2}>Keys &amp; Certificates</a> — how to generate keys and upload CSRs in the Trust Framework </li>`);
            } else {
              return [
                createVNode("li", null, [
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/" }, "Environment Specific Configuration"),
                  createTextVNode(" — the onboarding form where all certificate details are exchanged ")
                ]),
                createVNode("li", null, [
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/application-layer-auth" }, "Application Layer Authentication"),
                  createTextVNode(" — choose your application layer authentication method (determines whether Sig3/Sig4 are required) ")
                ]),
                createVNode("li", null, [
                  createVNode("a", { href: "/tech/lfi-api-hub/trust-framework/certificates/" }, "Keys & Certificates"),
                  createTextVNode(" — how to generate keys and upload CSRs in the Trust Framework ")
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
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/" }, "Environment Specific Configuration"),
                createTextVNode(" — the onboarding form where all certificate details are exchanged ")
              ]),
              createVNode("li", null, [
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/application-layer-auth" }, "Application Layer Authentication"),
                createTextVNode(" — choose your application layer authentication method (determines whether Sig3/Sig4 are required) ")
              ]),
              createVNode("li", null, [
                createVNode("a", { href: "/tech/lfi-api-hub/trust-framework/certificates/" }, "Keys & Certificates"),
                createTextVNode(" — how to generate keys and upload CSRs in the Trust Framework ")
              ])
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div>`);
}
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/v2.1/api-hub/connectivity/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-8bc4acf9"]]);
export {
  index as default
};
