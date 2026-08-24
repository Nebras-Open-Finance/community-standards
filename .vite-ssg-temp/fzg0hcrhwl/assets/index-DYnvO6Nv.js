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
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const images1 = [
      { src: new URL("/images/raidiam/organizations/all.png", import.meta.url).href, alt: "Step 1", title: "All organizations within the Trust Framework can be viewed in the directory." },
      { src: new URL("/images/raidiam/organizations/lfi.png", import.meta.url).href, alt: "Step 2", title: "By selecting an organization, you can see whether it is designated as an LFI." },
      { src: new URL("/images/raidiam/organizations/tpp.png", import.meta.url).href, alt: "Step 3", title: "Alternatively, the organization may be designated as a TPP." }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdBullets = __unplugin_components_5;
      const _component_EdProse = __unplugin_components_4;
      const _component_ClientOnly = resolveComponent("ClientOnly");
      const _component_Carousel = __unplugin_components_5$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-c6cd908c><section class="ed-doc__hero" data-v-c6cd908c><div class="ed-doc__inner" data-v-c6cd908c><div class="ed-doc__eyebrow" data-v-c6cd908c><span class="ed-doc__eyebrow-dash" data-v-c6cd908c></span> TPP · Trust Framework · Directory </div><h1 class="ed-doc__title" data-v-c6cd908c> Trust Framework <span class="ed-doc__read" data-v-c6cd908c>2 min read</span></h1><p class="ed-doc__lede" data-v-c6cd908c> The Trust Framework facilitates secure data sharing between Licensed Financial Institutions (LFIs) and Third-Party Providers (TPPs) by delivering key services such as API discovery, client onboarding, and client authentication. </p></div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "endpoints",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Trust Framework Environments",
        title: "Sandbox and Production endpoints",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-c6cd908c${_scopeId}>Sandbox Trust Framework</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-c6cd908c${_scopeId2}>Web Application: <a href="https://web.sandbox.directory.openfinance.ae/" data-v-c6cd908c${_scopeId2}>https://web.sandbox.directory.openfinance.ae/</a></li><li data-v-c6cd908c${_scopeId2}>OIDC Discovery API: <a href="https://auth.sandbox.directory.openfinance.ae/.well-known/openid-configuration" data-v-c6cd908c${_scopeId2}>https://auth.sandbox.directory.openfinance.ae/.well-known/openid-configuration</a></li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createTextVNode("Web Application: "),
                      createVNode("a", { href: "https://web.sandbox.directory.openfinance.ae/" }, "https://web.sandbox.directory.openfinance.ae/")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("OIDC Discovery API: "),
                      createVNode("a", { href: "https://auth.sandbox.directory.openfinance.ae/.well-known/openid-configuration" }, "https://auth.sandbox.directory.openfinance.ae/.well-known/openid-configuration")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-c6cd908c${_scopeId}>Production Trust Framework</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-c6cd908c${_scopeId2}>Web Application: <a href="https://web.directory.openfinance.ae/" data-v-c6cd908c${_scopeId2}>https://web.directory.openfinance.ae/</a></li><li data-v-c6cd908c${_scopeId2}>OIDC Discovery API: <a href="https://auth.directory.openfinance.ae/.well-known/openid-configuration" data-v-c6cd908c${_scopeId2}>https://auth.directory.openfinance.ae/.well-known/openid-configuration</a></li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createTextVNode("Web Application: "),
                      createVNode("a", { href: "https://web.directory.openfinance.ae/" }, "https://web.directory.openfinance.ae/")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("OIDC Discovery API: "),
                      createVNode("a", { href: "https://auth.directory.openfinance.ae/.well-known/openid-configuration" }, "https://auth.directory.openfinance.ae/.well-known/openid-configuration")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, "Sandbox Trust Framework"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createTextVNode("Web Application: "),
                    createVNode("a", { href: "https://web.sandbox.directory.openfinance.ae/" }, "https://web.sandbox.directory.openfinance.ae/")
                  ]),
                  createVNode("li", null, [
                    createTextVNode("OIDC Discovery API: "),
                    createVNode("a", { href: "https://auth.sandbox.directory.openfinance.ae/.well-known/openid-configuration" }, "https://auth.sandbox.directory.openfinance.ae/.well-known/openid-configuration")
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "Production Trust Framework"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createTextVNode("Web Application: "),
                    createVNode("a", { href: "https://web.directory.openfinance.ae/" }, "https://web.directory.openfinance.ae/")
                  ]),
                  createVNode("li", null, [
                    createTextVNode("OIDC Discovery API: "),
                    createVNode("a", { href: "https://auth.directory.openfinance.ae/.well-known/openid-configuration" }, "https://auth.directory.openfinance.ae/.well-known/openid-configuration")
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
        id: "core-functions",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "Core Functions",
        title: "What the Trust Framework provides",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-c6cd908c${_scopeId}>Trust Anchors</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Maintain a registry of authorized participants, defining their roles and scopes of access within the ecosystem. `);
                } else {
                  return [
                    createTextVNode(" Maintain a registry of authorized participants, defining their roles and scopes of access within the ecosystem. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-c6cd908c${_scopeId}>API Portal for Discovery</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Serve as a centralized directory of all servers, clients, and APIs participating in the ecosystem. `);
                } else {
                  return [
                    createTextVNode(" Serve as a centralized directory of all servers, clients, and APIs participating in the ecosystem. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-c6cd908c${_scopeId}>Keystore</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Manage a registry of active cryptographic keys for each participant. These keys are used to validate identities, enabling mutual trust — an essential foundation for secure data sharing. `);
                } else {
                  return [
                    createTextVNode(" Manage a registry of active cryptographic keys for each participant. These keys are used to validate identities, enabling mutual trust — an essential foundation for secure data sharing. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-c6cd908c${_scopeId}>Public Key Infrastructure (PKI)</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Issue and manage TLS, signature, and encryption certificates. The PKI also provides mechanisms for verifying certificates generated within the platform. `);
                } else {
                  return [
                    createTextVNode(" Issue and manage TLS, signature, and encryption certificates. The PKI also provides mechanisms for verifying certificates generated within the platform. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, "Trust Anchors"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Maintain a registry of authorized participants, defining their roles and scopes of access within the ecosystem. ")
                ]),
                _: 1
              }),
              createVNode("h3", null, "API Portal for Discovery"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Serve as a centralized directory of all servers, clients, and APIs participating in the ecosystem. ")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Keystore"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Manage a registry of active cryptographic keys for each participant. These keys are used to validate identities, enabling mutual trust — an essential foundation for secure data sharing. ")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Public Key Infrastructure (PKI)"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Issue and manage TLS, signature, and encryption certificates. The PKI also provides mechanisms for verifying certificates generated within the platform. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "organisations",
        num: "03",
        color: "var(--at-blue-deep, #1d4ed8)",
        eyebrow: "Organisations",
        title: "LFIs, TPPs, and how they coexist in the directory",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` All organisations participating in Open Finance operate within the Trust Framework. Upon successful onboarding, participants are registered within the Framework and gain visibility of other authorised organisations in the ecosystem. `);
                } else {
                  return [
                    createTextVNode(" All organisations participating in Open Finance operate within the Trust Framework. Upon successful onboarding, participants are registered within the Framework and gain visibility of other authorised organisations in the ecosystem. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Organisations are classified according to their role:`);
                } else {
                  return [
                    createTextVNode("Organisations are classified according to their role:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<strong data-v-c6cd908c${_scopeId2}>Licensed Financial Institutions (LFIs)</strong> provide capabilities into the Open Finance ecosystem. For example, an institution such as ADCB may expose payment initiation services or account information APIs for consumption by authorised participants. `);
                } else {
                  return [
                    createVNode("strong", null, "Licensed Financial Institutions (LFIs)"),
                    createTextVNode(" provide capabilities into the Open Finance ecosystem. For example, an institution such as ADCB may expose payment initiation services or account information APIs for consumption by authorised participants. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<strong data-v-c6cd908c${_scopeId2}>Third Party Providers (TPPs)</strong> consume the capabilities made available through Open Finance. For example, a fintech organisation such as Spare Technologies may access payment or data services provided by LFIs to deliver customer-facing solutions. `);
                } else {
                  return [
                    createVNode("strong", null, "Third Party Providers (TPPs)"),
                    createTextVNode(" consume the capabilities made available through Open Finance. For example, a fintech organisation such as Spare Technologies may access payment or data services provided by LFIs to deliver customer-facing solutions. ")
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
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Where permitted by their regulatory licence, an LFI may also operate in the capacity of a TPP. In such cases, the organisation retains its LFI classification within the Trust Framework while exercising TPP capabilities. `);
                } else {
                  return [
                    createTextVNode(" Where permitted by their regulatory licence, an LFI may also operate in the capacity of a TPP. In such cases, the organisation retains its LFI classification within the Trust Framework while exercising TPP capabilities. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" All organisations participating in Open Finance operate within the Trust Framework. Upon successful onboarding, participants are registered within the Framework and gain visibility of other authorised organisations in the ecosystem. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Organisations are classified according to their role:")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("strong", null, "Licensed Financial Institutions (LFIs)"),
                  createTextVNode(" provide capabilities into the Open Finance ecosystem. For example, an institution such as ADCB may expose payment initiation services or account information APIs for consumption by authorised participants. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("strong", null, "Third Party Providers (TPPs)"),
                  createTextVNode(" consume the capabilities made available through Open Finance. For example, a fintech organisation such as Spare Technologies may access payment or data services provided by LFIs to deliver customer-facing solutions. ")
                ]),
                _: 1
              }),
              createVNode(_component_ClientOnly, null, {
                default: withCtx(() => [
                  createVNode(_component_Carousel, { images: images1 })
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Where permitted by their regulatory licence, an LFI may also operate in the capacity of a TPP. In such cases, the organisation retains its LFI classification within the Trust Framework while exercising TPP capabilities. ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/trust-framework/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c6cd908c"]]);
export {
  index as default
};
