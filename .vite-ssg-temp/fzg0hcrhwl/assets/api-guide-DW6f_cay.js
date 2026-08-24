import { mergeProps, useSSRContext, defineComponent, withCtx, createTextVNode, createVNode } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { u as useMermaidDiagram, _ as __unplugin_components_8 } from "./APIFlowViewer-C5xJUdUs.js";
import { E as EdCode } from "./EdCode-BQ4YLUeg.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "mermaid";
import "./useChartTheme-DtmiKid7.js";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const mermaidDefinition = `
sequenceDiagram
    participant TPP as TPP
    participant Hub as API Hub
    participant LFI as LFI

    TPP->>+Hub: POST /tpp-registration
    Hub-->>-TPP: 204 No Content
`;
const _sfc_main$1 = {
  __name: "APIFlowsRegistration",
  __ssrInlineRender: true,
  setup(__props) {
    useMermaidDiagram(
      mermaidDefinition,
      "tpp-registration-diagram",
      {
        sequence: {
          diagramMarginX: 50,
          diagramMarginY: 30,
          actorMargin: 275,
          width: 110,
          height: 65,
          boxMargin: 20,
          messageMargin: 45,
          mirrorActors: false,
          useMaxWidth: true
        }
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "diagram-wrapper" }, _attrs))}><div class="mermaid-container"></div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/api-flows/APIFlowsRegistration.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const wellKnownExample = `"registration_endpoint": "https://rs1.[LFICode].apihub.openfinance.ae/tpp-registration"`;
const curlExample = `curl <registration_endpoint> \\
  --request POST \\
  --header 'Content-Type: application/json' \\
  --cert path/to/your-cert.pem \\
  --key path/to/your-key.key \\
  --data '{}'`;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "api-guide",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdBullets = __unplugin_components_5;
      const _component_EdNote = __unplugin_components_7;
      const _component_EdCode = EdCode;
      const _component_APIFlowViewer = __unplugin_components_8;
      const _component_APIFlowsRegistration = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-e49b2295><section class="ed-doc__hero" data-v-e49b2295><div class="ed-doc__inner" data-v-e49b2295><div class="ed-doc__eyebrow" data-v-e49b2295><span class="ed-doc__eyebrow-dash" data-v-e49b2295></span> TPP · Registration · Dynamic Client Registration </div><h1 class="ed-doc__title" data-v-e49b2295> Registering your Application <span class="ed-doc__read" data-v-e49b2295>2 min read</span></h1><p class="ed-doc__lede" data-v-e49b2295> TPPs dynamically register their applications with LFIs by submitting a registration request to the LFI&#39;s <code data-v-e49b2295>registration_endpoint</code>, which is discovered via the <code data-v-e49b2295>.well-known</code> endpoint. This request includes the TPP application&#39;s transport certificate and corresponding private key to establish a secure and trusted connection. </p></div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "prerequisites",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Prerequisites",
        title: "What you need before registering",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Before registering with an Authorisation Server, ensure the following requirements are met: `);
                } else {
                  return [
                    createTextVNode(" Before registering with an Authorisation Server, ensure the following requirements are met: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-e49b2295${_scopeId2}><strong data-v-e49b2295${_scopeId2}>Onboarded Organisation in the <a href="/tech/tpp-standards/trust-framework/" data-v-e49b2295${_scopeId2}>Trust Framework</a></strong> — your organisation must be successfully registered and approved within the Trust Framework. </li><li data-v-e49b2295${_scopeId2}><strong data-v-e49b2295${_scopeId2}>Registered <a href="/tech/tpp-standards/trust-framework/application" data-v-e49b2295${_scopeId2}>Application</a></strong> — the application must be created within the Trust Framework and assigned the appropriate <a href="/tech/tpp-standards/trust-framework/roles" data-v-e49b2295${_scopeId2}>roles</a> required for the intended use case. </li><li data-v-e49b2295${_scopeId2}><strong data-v-e49b2295${_scopeId2}>Valid <a href="/tech/tpp-standards/trust-framework/certificates" data-v-e49b2295${_scopeId2}>Transport Certificate</a></strong> — an active transport certificate must be issued and registered in the Trust Framework to enable secure <strong data-v-e49b2295${_scopeId2}>mTLS communication</strong> with the Authorisation Server. </li><li data-v-e49b2295${_scopeId2}><strong data-v-e49b2295${_scopeId2}>Selected Authorisation Server</strong> — you must identify the Authorisation Server you intend to register with by using <a href="/tech/tpp-standards/trust-framework/api-discovery" data-v-e49b2295${_scopeId2}>API Discovery</a> to locate and select the appropriate endpoint. </li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, [
                        createTextVNode("Onboarded Organisation in the "),
                        createVNode("a", { href: "/tech/tpp-standards/trust-framework/" }, "Trust Framework")
                      ]),
                      createTextVNode(" — your organisation must be successfully registered and approved within the Trust Framework. ")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, [
                        createTextVNode("Registered "),
                        createVNode("a", { href: "/tech/tpp-standards/trust-framework/application" }, "Application")
                      ]),
                      createTextVNode(" — the application must be created within the Trust Framework and assigned the appropriate "),
                      createVNode("a", { href: "/tech/tpp-standards/trust-framework/roles" }, "roles"),
                      createTextVNode(" required for the intended use case. ")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, [
                        createTextVNode("Valid "),
                        createVNode("a", { href: "/tech/tpp-standards/trust-framework/certificates" }, "Transport Certificate")
                      ]),
                      createTextVNode(" — an active transport certificate must be issued and registered in the Trust Framework to enable secure "),
                      createVNode("strong", null, "mTLS communication"),
                      createTextVNode(" with the Authorisation Server. ")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Selected Authorisation Server"),
                      createTextVNode(" — you must identify the Authorisation Server you intend to register with by using "),
                      createVNode("a", { href: "/tech/tpp-standards/trust-framework/api-discovery" }, "API Discovery"),
                      createTextVNode(" to locate and select the appropriate endpoint. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "warning",
              title: "Roles are locked in at registration"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-e49b2295${_scopeId2}> The roles assigned to your application (<code data-v-e49b2295${_scopeId2}>BSIP</code>, <code data-v-e49b2295${_scopeId2}>BDSP</code>, <code data-v-e49b2295${_scopeId2}>ISP</code>) determine what it is permitted to do with the LFI. Once registered, editing the application&#39;s roles in the Trust Framework has no effect — the registered roles are fixed. If the roles later need to change, you must disable the application, create a new one with the correct roles, and register it again. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" The roles assigned to your application ("),
                      createVNode("code", null, "BSIP"),
                      createTextVNode(", "),
                      createVNode("code", null, "BDSP"),
                      createTextVNode(", "),
                      createVNode("code", null, "ISP"),
                      createTextVNode(") determine what it is permitted to do with the LFI. Once registered, editing the application's roles in the Trust Framework has no effect — the registered roles are fixed. If the roles later need to change, you must disable the application, create a new one with the correct roles, and register it again. ")
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
                  createTextVNode(" Before registering with an Authorisation Server, ensure the following requirements are met: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, [
                      createTextVNode("Onboarded Organisation in the "),
                      createVNode("a", { href: "/tech/tpp-standards/trust-framework/" }, "Trust Framework")
                    ]),
                    createTextVNode(" — your organisation must be successfully registered and approved within the Trust Framework. ")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, [
                      createTextVNode("Registered "),
                      createVNode("a", { href: "/tech/tpp-standards/trust-framework/application" }, "Application")
                    ]),
                    createTextVNode(" — the application must be created within the Trust Framework and assigned the appropriate "),
                    createVNode("a", { href: "/tech/tpp-standards/trust-framework/roles" }, "roles"),
                    createTextVNode(" required for the intended use case. ")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, [
                      createTextVNode("Valid "),
                      createVNode("a", { href: "/tech/tpp-standards/trust-framework/certificates" }, "Transport Certificate")
                    ]),
                    createTextVNode(" — an active transport certificate must be issued and registered in the Trust Framework to enable secure "),
                    createVNode("strong", null, "mTLS communication"),
                    createTextVNode(" with the Authorisation Server. ")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Selected Authorisation Server"),
                    createTextVNode(" — you must identify the Authorisation Server you intend to register with by using "),
                    createVNode("a", { href: "/tech/tpp-standards/trust-framework/api-discovery" }, "API Discovery"),
                    createTextVNode(" to locate and select the appropriate endpoint. ")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "warning",
                title: "Roles are locked in at registration"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" The roles assigned to your application ("),
                    createVNode("code", null, "BSIP"),
                    createTextVNode(", "),
                    createVNode("code", null, "BDSP"),
                    createTextVNode(", "),
                    createVNode("code", null, "ISP"),
                    createTextVNode(") determine what it is permitted to do with the LFI. Once registered, editing the application's roles in the Trust Framework has no effect — the registered roles are fixed. If the roles later need to change, you must disable the application, create a new one with the correct roles, and register it again. ")
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
        id: "registration-endpoint",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "Retrieving the registration_endpoint",
        title: "Discover the URL via .well-known",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Once you have identified the Authorisation Server you want to register with, you can locate its registration endpoint via the <a href="/tech/tpp-standards/trust-framework/well-known" data-v-e49b2295${_scopeId2}><code data-v-e49b2295${_scopeId2}>.well-known</code> OpenID configuration</a>. `);
                } else {
                  return [
                    createTextVNode(" Once you have identified the Authorisation Server you want to register with, you can locate its registration endpoint via the "),
                    createVNode("a", { href: "/tech/tpp-standards/trust-framework/well-known" }, [
                      createVNode("code", null, ".well-known"),
                      createTextVNode(" OpenID configuration")
                    ]),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Within the returned JSON from the <code data-v-e49b2295${_scopeId2}>.well-known</code> look for:`);
                } else {
                  return [
                    createTextVNode("Within the returned JSON from the "),
                    createVNode("code", null, ".well-known"),
                    createTextVNode(" look for:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: wellKnownExample,
              lang: "json",
              filename: ".well-known excerpt"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`This is the endpoint your TPP will use to register the application with.`);
                } else {
                  return [
                    createTextVNode("This is the endpoint your TPP will use to register the application with.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Once you have identified the Authorisation Server you want to register with, you can locate its registration endpoint via the "),
                  createVNode("a", { href: "/tech/tpp-standards/trust-framework/well-known" }, [
                    createVNode("code", null, ".well-known"),
                    createTextVNode(" OpenID configuration")
                  ]),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Within the returned JSON from the "),
                  createVNode("code", null, ".well-known"),
                  createTextVNode(" look for:")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: wellKnownExample,
                lang: "json",
                filename: ".well-known excerpt"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("This is the endpoint your TPP will use to register the application with.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "sequence-flow",
        num: "03",
        color: "var(--at-blue-deep, #1d4ed8)",
        eyebrow: "API Sequence Flow",
        title: "End-to-end TPP registration",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_APIFlowViewer, { title: "TPP Registration API Flow" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_APIFlowsRegistration, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_APIFlowsRegistration)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_APIFlowViewer, { title: "TPP Registration API Flow" }, {
                default: withCtx(() => [
                  createVNode(_component_APIFlowsRegistration)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "post-tpp-registration",
        num: "04",
        color: "var(--at-navy)",
        eyebrow: "POST /tpp-registration",
        title: "Submitting the registration request",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="ed-doc__endpoint" data-v-e49b2295${_scopeId}><span class="http-badge http-post" data-v-e49b2295${_scopeId}>POST</span><code class="ed-doc__endpoint-path" data-v-e49b2295${_scopeId}>/tpp-registration</code></div><h3 data-v-e49b2295${_scopeId}>Example request</h3>`);
            _push2(ssrRenderComponent(_component_EdCode, {
              code: curlExample,
              lang: "bash",
              filename: "curl"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` This endpoint uses <strong data-v-e49b2295${_scopeId2}>mutual TLS (mTLS)</strong> with transport-level certificates. Make sure that: `);
                } else {
                  return [
                    createTextVNode(" This endpoint uses "),
                    createVNode("strong", null, "mutual TLS (mTLS)"),
                    createTextVNode(" with transport-level certificates. Make sure that: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-e49b2295${_scopeId2}><code data-v-e49b2295${_scopeId2}>--cert</code> — path to your <strong data-v-e49b2295${_scopeId2}>transport</strong> client certificate (<code data-v-e49b2295${_scopeId2}>.pem</code>)</li><li data-v-e49b2295${_scopeId2}><code data-v-e49b2295${_scopeId2}>--key</code> — path to your <strong data-v-e49b2295${_scopeId2}>transport</strong> private key (<code data-v-e49b2295${_scopeId2}>.key</code>)</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("code", null, "--cert"),
                      createTextVNode(" — path to your "),
                      createVNode("strong", null, "transport"),
                      createTextVNode(" client certificate ("),
                      createVNode("code", null, ".pem"),
                      createTextVNode(")")
                    ]),
                    createVNode("li", null, [
                      createVNode("code", null, "--key"),
                      createTextVNode(" — path to your "),
                      createVNode("strong", null, "transport"),
                      createTextVNode(" private key ("),
                      createVNode("code", null, ".key"),
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
                  _push3(` Once the registration is successful, you will receive a <strong data-v-e49b2295${_scopeId2}>204 No Content</strong> response. This indicates that your application is registered with the server. `);
                } else {
                  return [
                    createTextVNode(" Once the registration is successful, you will receive a "),
                    createVNode("strong", null, "204 No Content"),
                    createTextVNode(" response. This indicates that your application is registered with the server. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "info",
              title: "Your Client ID is not returned here"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-e49b2295${_scopeId2}><span class="endpoint" data-v-e49b2295${_scopeId2}><span class="http-method http-method--post" data-v-e49b2295${_scopeId2}>POST</span><code data-v-e49b2295${_scopeId2}>/tpp-registration</code></span> returns no body. Your <code data-v-e49b2295${_scopeId2}>ClientId</code> is the UUID assigned to your application when it was created in the Trust Framework Directory — it is not issued by this endpoint. Find it on the application detail page: Organisation → Applications → select your application. See <a href="/tech/tpp-standards/trust-framework/application#your-client-id" data-v-e49b2295${_scopeId2}>Creating an Application</a> for a screenshot. </p><p data-v-e49b2295${_scopeId2}> You will need this value as <code data-v-e49b2295${_scopeId2}>client_id</code>, <code data-v-e49b2295${_scopeId2}>iss</code>, and <code data-v-e49b2295${_scopeId2}>sub</code> in all Client Assertions and Request JWTs. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createVNode("span", { class: "endpoint" }, [
                        createVNode("span", { class: "http-method http-method--post" }, "POST"),
                        createVNode("code", null, "/tpp-registration")
                      ]),
                      createTextVNode(" returns no body. Your "),
                      createVNode("code", null, "ClientId"),
                      createTextVNode(" is the UUID assigned to your application when it was created in the Trust Framework Directory — it is not issued by this endpoint. Find it on the application detail page: Organisation → Applications → select your application. See "),
                      createVNode("a", { href: "/tech/tpp-standards/trust-framework/application#your-client-id" }, "Creating an Application"),
                      createTextVNode(" for a screenshot. ")
                    ]),
                    createVNode("p", null, [
                      createTextVNode(" You will need this value as "),
                      createVNode("code", null, "client_id"),
                      createTextVNode(", "),
                      createVNode("code", null, "iss"),
                      createTextVNode(", and "),
                      createVNode("code", null, "sub"),
                      createTextVNode(" in all Client Assertions and Request JWTs. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "ed-doc__endpoint" }, [
                createVNode("span", { class: "http-badge http-post" }, "POST"),
                createVNode("code", { class: "ed-doc__endpoint-path" }, "/tpp-registration")
              ]),
              createVNode("h3", null, "Example request"),
              createVNode(_component_EdCode, {
                code: curlExample,
                lang: "bash",
                filename: "curl"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" This endpoint uses "),
                  createVNode("strong", null, "mutual TLS (mTLS)"),
                  createTextVNode(" with transport-level certificates. Make sure that: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("code", null, "--cert"),
                    createTextVNode(" — path to your "),
                    createVNode("strong", null, "transport"),
                    createTextVNode(" client certificate ("),
                    createVNode("code", null, ".pem"),
                    createTextVNode(")")
                  ]),
                  createVNode("li", null, [
                    createVNode("code", null, "--key"),
                    createTextVNode(" — path to your "),
                    createVNode("strong", null, "transport"),
                    createTextVNode(" private key ("),
                    createVNode("code", null, ".key"),
                    createTextVNode(")")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Once the registration is successful, you will receive a "),
                  createVNode("strong", null, "204 No Content"),
                  createTextVNode(" response. This indicates that your application is registered with the server. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "info",
                title: "Your Client ID is not returned here"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createVNode("span", { class: "endpoint" }, [
                      createVNode("span", { class: "http-method http-method--post" }, "POST"),
                      createVNode("code", null, "/tpp-registration")
                    ]),
                    createTextVNode(" returns no body. Your "),
                    createVNode("code", null, "ClientId"),
                    createTextVNode(" is the UUID assigned to your application when it was created in the Trust Framework Directory — it is not issued by this endpoint. Find it on the application detail page: Organisation → Applications → select your application. See "),
                    createVNode("a", { href: "/tech/tpp-standards/trust-framework/application#your-client-id" }, "Creating an Application"),
                    createTextVNode(" for a screenshot. ")
                  ]),
                  createVNode("p", null, [
                    createTextVNode(" You will need this value as "),
                    createVNode("code", null, "client_id"),
                    createTextVNode(", "),
                    createVNode("code", null, "iss"),
                    createTextVNode(", and "),
                    createVNode("code", null, "sub"),
                    createTextVNode(" in all Client Assertions and Request JWTs. ")
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
        id: "activation",
        num: "05",
        color: "var(--at-teal-deep)",
        eyebrow: "Activation",
        title: "Registration alone does not grant access",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Registration does not automatically grant access. Once a TPP submits a registration request to an LFI, the LFI must activate the TPP, the associated Client, and the Software Statement before the TPP can communicate with the LFI. `);
                } else {
                  return [
                    createTextVNode(" Registration does not automatically grant access. Once a TPP submits a registration request to an LFI, the LFI must activate the TPP, the associated Client, and the Software Statement before the TPP can communicate with the LFI. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "info",
              title: "Model bank"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-e49b2295${_scopeId2}> Registration with the <a href="/tech/tpp-standards/sandbox/model-bank" data-v-e49b2295${_scopeId2}>model bank</a> is activated automatically — no manual approval is required. For all other LFIs, activation must be performed by the LFI via their Admin Portal before the TPP can make API calls. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" Registration with the "),
                      createVNode("a", { href: "/tech/tpp-standards/sandbox/model-bank" }, "model bank"),
                      createTextVNode(" is activated automatically — no manual approval is required. For all other LFIs, activation must be performed by the LFI via their Admin Portal before the TPP can make API calls. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` For guidance on how an LFI activates a TPP&#39;s registration request via their Admin Portal, please review the <a href="/tech/lfi-api-hub/v2.1/api-hub/admin-portal/tpp-activation" data-v-e49b2295${_scopeId2}>TPP Management &amp; Activation page</a>. `);
                } else {
                  return [
                    createTextVNode(" For guidance on how an LFI activates a TPP's registration request via their Admin Portal, please review the "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/admin-portal/tpp-activation" }, "TPP Management & Activation page"),
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
                  createTextVNode(" Registration does not automatically grant access. Once a TPP submits a registration request to an LFI, the LFI must activate the TPP, the associated Client, and the Software Statement before the TPP can communicate with the LFI. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "info",
                title: "Model bank"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" Registration with the "),
                    createVNode("a", { href: "/tech/tpp-standards/sandbox/model-bank" }, "model bank"),
                    createTextVNode(" is activated automatically — no manual approval is required. For all other LFIs, activation must be performed by the LFI via their Admin Portal before the TPP can make API calls. ")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" For guidance on how an LFI activates a TPP's registration request via their Admin Portal, please review the "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/admin-portal/tpp-activation" }, "TPP Management & Activation page"),
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/registration/api-guide.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const apiGuide = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e49b2295"]]);
export {
  apiGuide as default
};
