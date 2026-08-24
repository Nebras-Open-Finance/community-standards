import { _ as __unplugin_components_0, a as __unplugin_components_2, b as __unplugin_components_6, c as __unplugin_components_7$1 } from "./EdBackStrip-COkyNhGh.js";
import { mergeProps, useSSRContext, defineComponent, withCtx, createVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, createTextVNode } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { u as useMermaidDiagram, _ as __unplugin_components_8 } from "./APIFlowViewer-C5xJUdUs.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { _ as __unplugin_components_0$1 } from "./EdHero-DawHPCxB.js";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "mermaid";
import "./useChartTheme-DtmiKid7.js";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const mermaidDefinition = `
flowchart LR
    subgraph Nebras["Nebras"]
        RH[Retail API Hub]
        SH[Business API Hub]
    end

    subgraph LFI["LFI"]
        OC[Ozone Connect]
        RC[Retail Core Banking]
        SC[Business Core Banking]
    end

    RH -->|"o3-provider-id: fabretail"| OC
    SH -->|"o3-provider-id: fabbusiness"| OC
    OC --> RC
    OC --> SC

    style Nebras fill:#e8eefc,stroke:#0043A6
    style LFI fill:#e6f7f3,stroke:#009882

    classDef whitebox fill:#ffffff,stroke:#333,color:#333
    class RH,SH,OC,RC,SC whitebox
`;
const _sfc_main$1 = {
  __name: "APIFlowsMultiSegmentApiHubs",
  __ssrInlineRender: true,
  setup(__props) {
    useMermaidDiagram(
      mermaidDefinition,
      "multi-segment-api-hubs-diagram",
      { flowchart: { curve: "basis", padding: 20, nodeSpacing: 50, rankSpacing: 80, useMaxWidth: true } }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "diagram-wrapper" }, _attrs))}><div class="mermaid-container"></div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/api-flows/APIFlowsMultiSegmentApiHubs.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "multi-segment-api-hubs",
  __ssrInlineRender: true,
  setup(__props) {
    const sections = [
      { id: "why", label: "Why multiple Hubs" },
      { id: "model", label: "Recommended model" },
      { id: "certs", label: "Certificates" },
      { id: "routing", label: "Routing" },
      { id: "summary", label: "Summary" }
    ];
    const meta = [
      { label: "Category", value: "Integration" },
      { label: "Read", value: "8 min" },
      { label: "Updated", value: "21 Apr 2026" }
    ];
    const tags = ["API Hub", "LFI", "Topology"];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdBackStrip = __unplugin_components_0;
      const _component_EdHero = __unplugin_components_0$1;
      const _component_EdInPageNav = __unplugin_components_2;
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdBullets = __unplugin_components_5;
      const _component_EdNote = __unplugin_components_7;
      const _component_EdRefTable = __unplugin_components_12;
      const _component_APIFlowViewer = __unplugin_components_8;
      const _component_APIFlowsMultiSegmentApiHubs = _sfc_main$1;
      const _component_EdRelatedCards = __unplugin_components_6;
      const _component_EdRelatedCard = __unplugin_components_7$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-page" }, _attrs))} data-v-cf3c2e35>`);
      _push(ssrRenderComponent(_component_EdBackStrip, {
        href: "/knowledge-base/",
        text: "All knowledge base articles"
      }, null, _parent));
      _push(ssrRenderComponent(_component_EdHero, {
        eyebrow: "Learn · Understand · Build",
        title: "Multi-Segment LFIs — How to Structure API Hubs Across Customer Segments",
        meta,
        lede: "Many LFIs serve more than one customer segment — for example retail, SME, private banking, or corporate. When those segments authenticate their customers in different places, the LFI needs <strong>one API Hub per authentication context</strong>, but can share a single Ozone Connect — minimising LFI-maintained certificates."
      }, {
        lede: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="ed-tags" data-v-cf3c2e35${_scopeId}><!--[-->`);
            ssrRenderList(tags, (t) => {
              _push2(`<span class="ed-tag" data-v-cf3c2e35${_scopeId}>${ssrInterpolate(t)}</span>`);
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode("div", { class: "ed-tags" }, [
                (openBlock(), createBlock(Fragment, null, renderList(tags, (t) => {
                  return createVNode("span", {
                    key: t,
                    class: "ed-tag"
                  }, toDisplayString(t), 1);
                }), 64))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdInPageNav, { sections }, null, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "why",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Why multiple Hubs",
        title: "Authentication context dictates topology",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`The API Hub is more than a proxy — it acts as the <strong data-v-cf3c2e35${_scopeId2}>OIDC Authorization Server</strong> for the LFI within the Open Finance ecosystem. When a TPP drives an end user through an authorization flow, the API Hub is the entity that:`);
                } else {
                  return [
                    createTextVNode("The API Hub is more than a proxy — it acts as the "),
                    createVNode("strong", null, "OIDC Authorization Server"),
                    createTextVNode(" for the LFI within the Open Finance ecosystem. When a TPP drives an end user through an authorization flow, the API Hub is the entity that:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-cf3c2e35${_scopeId2}>Exposes the single OIDC <code data-v-cf3c2e35${_scopeId2}>/authorize</code> endpoint the TPP redirects the end user to</li><li data-v-cf3c2e35${_scopeId2}>Issues the access tokens the TPP uses to call APIs</li><li data-v-cf3c2e35${_scopeId2}>Holds the authoritative record of consents</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createTextVNode("Exposes the single OIDC "),
                      createVNode("code", null, "/authorize"),
                      createTextVNode(" endpoint the TPP redirects the end user to")
                    ]),
                    createVNode("li", null, "Issues the access tokens the TPP uses to call APIs"),
                    createVNode("li", null, "Holds the authoritative record of consents")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Because the API Hub must behave as a conformant OIDC Authorization Server, it has <strong data-v-cf3c2e35${_scopeId2}>one authorization endpoint</strong> that redirects the end user into the LFI&#39;s own authentication experience (see the <a href="/tech/lfi-api-hub/v2.1/consent-journey/api-guide" data-v-cf3c2e35${_scopeId2}>Consent Journey API Guide</a> and the <a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/auth-endpoint" data-v-cf3c2e35${_scopeId2}>Authorization Endpoint configuration</a>).`);
                } else {
                  return [
                    createTextVNode("Because the API Hub must behave as a conformant OIDC Authorization Server, it has "),
                    createVNode("strong", null, "one authorization endpoint"),
                    createTextVNode(" that redirects the end user into the LFI's own authentication experience (see the "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.1/consent-journey/api-guide" }, "Consent Journey API Guide"),
                    createTextVNode(" and the "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/auth-endpoint" }, "Authorization Endpoint configuration"),
                    createTextVNode(").")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`If retail and SME customers authenticate in different places — for example, retail customers in the retail mobile app and SME customers in a separate business banking portal — a single authorization endpoint cannot send an end user to both. Since the Hub mimics a standard Authorization Server, it can only be configured to redirect to one authentication flow.`);
                } else {
                  return [
                    createTextVNode("If retail and SME customers authenticate in different places — for example, retail customers in the retail mobile app and SME customers in a separate business banking portal — a single authorization endpoint cannot send an end user to both. Since the Hub mimics a standard Authorization Server, it can only be configured to redirect to one authentication flow.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`In that situation the LFI needs <strong data-v-cf3c2e35${_scopeId2}>one API Hub per distinct authentication context</strong>:`);
                } else {
                  return [
                    createTextVNode("In that situation the LFI needs "),
                    createVNode("strong", null, "one API Hub per distinct authentication context"),
                    createTextVNode(":")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-cf3c2e35${_scopeId2}>Retail end users → Retail API Hub → Retail authentication endpoint</li><li data-v-cf3c2e35${_scopeId2}>SME end users → SME API Hub → SME authentication endpoint</li>`);
                } else {
                  return [
                    createVNode("li", null, "Retail end users → Retail API Hub → Retail authentication endpoint"),
                    createVNode("li", null, "SME end users → SME API Hub → SME authentication endpoint")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`The same logic applies to any additional segment (private banking, corporate) that has its own authentication experience.`);
                } else {
                  return [
                    createTextVNode("The same logic applies to any additional segment (private banking, corporate) that has its own authentication experience.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "tip",
              title: "When one Hub is enough"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-cf3c2e35${_scopeId2}>If all segments authenticate through the same endpoint — for example, a single unified banking app that handles both retail and SME sign-in — a single API Hub is sufficient. The need for multiple Hubs is driven by distinct authentication flows, not by the existence of multiple products.</p>`);
                } else {
                  return [
                    createVNode("p", null, "If all segments authenticate through the same endpoint — for example, a single unified banking app that handles both retail and SME sign-in — a single API Hub is sufficient. The need for multiple Hubs is driven by distinct authentication flows, not by the existence of multiple products.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("The API Hub is more than a proxy — it acts as the "),
                  createVNode("strong", null, "OIDC Authorization Server"),
                  createTextVNode(" for the LFI within the Open Finance ecosystem. When a TPP drives an end user through an authorization flow, the API Hub is the entity that:")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createTextVNode("Exposes the single OIDC "),
                    createVNode("code", null, "/authorize"),
                    createTextVNode(" endpoint the TPP redirects the end user to")
                  ]),
                  createVNode("li", null, "Issues the access tokens the TPP uses to call APIs"),
                  createVNode("li", null, "Holds the authoritative record of consents")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Because the API Hub must behave as a conformant OIDC Authorization Server, it has "),
                  createVNode("strong", null, "one authorization endpoint"),
                  createTextVNode(" that redirects the end user into the LFI's own authentication experience (see the "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/consent-journey/api-guide" }, "Consent Journey API Guide"),
                  createTextVNode(" and the "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/auth-endpoint" }, "Authorization Endpoint configuration"),
                  createTextVNode(").")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("If retail and SME customers authenticate in different places — for example, retail customers in the retail mobile app and SME customers in a separate business banking portal — a single authorization endpoint cannot send an end user to both. Since the Hub mimics a standard Authorization Server, it can only be configured to redirect to one authentication flow.")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("In that situation the LFI needs "),
                  createVNode("strong", null, "one API Hub per distinct authentication context"),
                  createTextVNode(":")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Retail end users → Retail API Hub → Retail authentication endpoint"),
                  createVNode("li", null, "SME end users → SME API Hub → SME authentication endpoint")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("The same logic applies to any additional segment (private banking, corporate) that has its own authentication experience.")
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "tip",
                title: "When one Hub is enough"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, "If all segments authenticate through the same endpoint — for example, a single unified banking app that handles both retail and SME sign-in — a single API Hub is sufficient. The need for multiple Hubs is driven by distinct authentication flows, not by the existence of multiple products.")
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
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "Recommended model",
        title: "One Trust Framework org, one client, one Ozone Connect",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-cf3c2e35${_scopeId2}><strong data-v-cf3c2e35${_scopeId2}>One Trust Framework organisation</strong> — the LFI is a single legal entity in the UAE Open Finance ecosystem and is registered as one organisation regardless of how many segments it serves.</li><li data-v-cf3c2e35${_scopeId2}><strong data-v-cf3c2e35${_scopeId2}>One API Hub deployment per authentication context</strong> — e.g. one for retail, one for SME. Each Hub has its own authorization endpoint, its own environment-specific onboarding, and its own base URLs.</li><li data-v-cf3c2e35${_scopeId2}><strong data-v-cf3c2e35${_scopeId2}>One shared <code data-v-cf3c2e35${_scopeId2}>C3-hh-cm-client</code> application</strong> — both Hubs use the same client registration. This means the LFI&#39;s client-side identity and signing material is created once and reused.</li><li data-v-cf3c2e35${_scopeId2}><strong data-v-cf3c2e35${_scopeId2}>One shared Ozone Connect deployment</strong> — the LFI exposes a single set of Ozone Connect APIs, and routes incoming Hub requests to the correct downstream core using the <code data-v-cf3c2e35${_scopeId2}>o3-provider-id</code> header.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "One Trust Framework organisation"),
                      createTextVNode(" — the LFI is a single legal entity in the UAE Open Finance ecosystem and is registered as one organisation regardless of how many segments it serves.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "One API Hub deployment per authentication context"),
                      createTextVNode(" — e.g. one for retail, one for SME. Each Hub has its own authorization endpoint, its own environment-specific onboarding, and its own base URLs.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, [
                        createTextVNode("One shared "),
                        createVNode("code", null, "C3-hh-cm-client"),
                        createTextVNode(" application")
                      ]),
                      createTextVNode(" — both Hubs use the same client registration. This means the LFI's client-side identity and signing material is created once and reused.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "One shared Ozone Connect deployment"),
                      createTextVNode(" — the LFI exposes a single set of Ozone Connect APIs, and routes incoming Hub requests to the correct downstream core using the "),
                      createVNode("code", null, "o3-provider-id"),
                      createTextVNode(" header.")
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
                    createVNode("strong", null, "One Trust Framework organisation"),
                    createTextVNode(" — the LFI is a single legal entity in the UAE Open Finance ecosystem and is registered as one organisation regardless of how many segments it serves.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "One API Hub deployment per authentication context"),
                    createTextVNode(" — e.g. one for retail, one for SME. Each Hub has its own authorization endpoint, its own environment-specific onboarding, and its own base URLs.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, [
                      createTextVNode("One shared "),
                      createVNode("code", null, "C3-hh-cm-client"),
                      createTextVNode(" application")
                    ]),
                    createTextVNode(" — both Hubs use the same client registration. This means the LFI's client-side identity and signing material is created once and reused.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "One shared Ozone Connect deployment"),
                    createTextVNode(" — the LFI exposes a single set of Ozone Connect APIs, and routes incoming Hub requests to the correct downstream core using the "),
                    createVNode("code", null, "o3-provider-id"),
                    createTextVNode(" header.")
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
        id: "certs",
        num: "03",
        color: "var(--at-blue)",
        eyebrow: "Certificate footprint",
        title: "The LFI's burden does not grow with extra Hubs",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-cf3c2e35${_scopeId}>LFI-held certificates — maintained once, shared across Hubs</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`LFI-held certificates live on the LFI&#39;s Trust Framework organisation and are held by the LFI. Because both Hubs sit under the same organisation and share the same <code data-v-cf3c2e35${_scopeId2}>C3-hh-cm-client</code> application, the LFI maintains <strong data-v-cf3c2e35${_scopeId2}>one set</strong> of these certificates:`);
                } else {
                  return [
                    createTextVNode("LFI-held certificates live on the LFI's Trust Framework organisation and are held by the LFI. Because both Hubs sit under the same organisation and share the same "),
                    createVNode("code", null, "C3-hh-cm-client"),
                    createTextVNode(" application, the LFI maintains "),
                    createVNode("strong", null, "one set"),
                    createTextVNode(" of these certificates:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-cf3c2e35${_scopeId2}><thead data-v-cf3c2e35${_scopeId2}><tr data-v-cf3c2e35${_scopeId2}><th data-v-cf3c2e35${_scopeId2}>Certificate</th><th data-v-cf3c2e35${_scopeId2}>Purpose</th><th data-v-cf3c2e35${_scopeId2}>Reused across Hubs</th></tr></thead><tbody data-v-cf3c2e35${_scopeId2}><tr data-v-cf3c2e35${_scopeId2}><td data-v-cf3c2e35${_scopeId2}><strong data-v-cf3c2e35${_scopeId2}>C3</strong></td><td data-v-cf3c2e35${_scopeId2}>LFI client cert used when calling Consent Manager &amp; Headless Heimdall</td><td data-v-cf3c2e35${_scopeId2}>✅</td></tr><tr data-v-cf3c2e35${_scopeId2}><td data-v-cf3c2e35${_scopeId2}><strong data-v-cf3c2e35${_scopeId2}>S4</strong></td><td data-v-cf3c2e35${_scopeId2}>LFI server cert identifying Ozone Connect to the API Hub</td><td data-v-cf3c2e35${_scopeId2}>✅</td></tr><tr data-v-cf3c2e35${_scopeId2}><td data-v-cf3c2e35${_scopeId2}><strong data-v-cf3c2e35${_scopeId2}>Sig4</strong></td><td data-v-cf3c2e35${_scopeId2}>LFI JWT Auth signing key (only if <a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/application-layer-auth#jwt-auth" data-v-cf3c2e35${_scopeId2}>JWT Auth</a> is selected)</td><td data-v-cf3c2e35${_scopeId2}>✅</td></tr><tr data-v-cf3c2e35${_scopeId2}><td data-v-cf3c2e35${_scopeId2}><strong data-v-cf3c2e35${_scopeId2}>Enc1</strong></td><td data-v-cf3c2e35${_scopeId2}>LFI encryption key used to decrypt PII</td><td data-v-cf3c2e35${_scopeId2}>✅</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Certificate"),
                          createVNode("th", null, "Purpose"),
                          createVNode("th", null, "Reused across Hubs")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "C3")
                          ]),
                          createVNode("td", null, "LFI client cert used when calling Consent Manager & Headless Heimdall"),
                          createVNode("td", null, "✅")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "S4")
                          ]),
                          createVNode("td", null, "LFI server cert identifying Ozone Connect to the API Hub"),
                          createVNode("td", null, "✅")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "Sig4")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("LFI JWT Auth signing key (only if "),
                            createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/application-layer-auth#jwt-auth" }, "JWT Auth"),
                            createTextVNode(" is selected)")
                          ]),
                          createVNode("td", null, "✅")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "Enc1")
                          ]),
                          createVNode("td", null, "LFI encryption key used to decrypt PII"),
                          createVNode("td", null, "✅")
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
                  _push3(`See <a href="/tech/lfi-api-hub/v2.1/api-hub/connectivity/" data-v-cf3c2e35${_scopeId2}>API Hub Connectivity &amp; Certificates</a> for the full certificate model and the existing &quot;Certificate reuse across brands&quot; note.`);
                } else {
                  return [
                    createTextVNode("See "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/connectivity/" }, "API Hub Connectivity & Certificates"),
                    createTextVNode(' for the full certificate model and the existing "Certificate reuse across brands" note.')
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-cf3c2e35${_scopeId}>Ozone-held certificates — additional material added per Hub</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Each additional API Hub requires its own server-side certificates — most visibly <strong data-v-cf3c2e35${_scopeId2}>S1</strong>, the server transport certificate that identifies the Hub instance to TPPs. These are added to the LFI&#39;s Trust Framework organisation so TPPs can validate the Hub&#39;s identity, but the private keys are held and maintained by Ozone.`);
                } else {
                  return [
                    createTextVNode("Each additional API Hub requires its own server-side certificates — most visibly "),
                    createVNode("strong", null, "S1"),
                    createTextVNode(", the server transport certificate that identifies the Hub instance to TPPs. These are added to the LFI's Trust Framework organisation so TPPs can validate the Hub's identity, but the private keys are held and maintained by Ozone.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`From the LFI&#39;s perspective, these certificates appear under the organisation but require no operational involvement — the LFI does not generate, store, or rotate the private key material.`);
                } else {
                  return [
                    createTextVNode("From the LFI's perspective, these certificates appear under the organisation but require no operational involvement — the LFI does not generate, store, or rotate the private key material.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-cf3c2e35${_scopeId2}><thead data-v-cf3c2e35${_scopeId2}><tr data-v-cf3c2e35${_scopeId2}><th data-v-cf3c2e35${_scopeId2}>Certificate</th><th data-v-cf3c2e35${_scopeId2}>Purpose</th><th data-v-cf3c2e35${_scopeId2}>Added per Hub</th><th data-v-cf3c2e35${_scopeId2}>Private key held by</th></tr></thead><tbody data-v-cf3c2e35${_scopeId2}><tr data-v-cf3c2e35${_scopeId2}><td data-v-cf3c2e35${_scopeId2}><strong data-v-cf3c2e35${_scopeId2}>S1</strong></td><td data-v-cf3c2e35${_scopeId2}>Identifies the Hub instance to TPPs</td><td data-v-cf3c2e35${_scopeId2}>✅</td><td data-v-cf3c2e35${_scopeId2}>Ozone</td></tr><tr data-v-cf3c2e35${_scopeId2}><td data-v-cf3c2e35${_scopeId2}><strong data-v-cf3c2e35${_scopeId2}>S3</strong></td><td data-v-cf3c2e35${_scopeId2}>Identifies CM &amp; HH servers to the LFI</td><td data-v-cf3c2e35${_scopeId2}>✅</td><td data-v-cf3c2e35${_scopeId2}>Ozone</td></tr><tr data-v-cf3c2e35${_scopeId2}><td data-v-cf3c2e35${_scopeId2}><strong data-v-cf3c2e35${_scopeId2}>Sig2</strong></td><td data-v-cf3c2e35${_scopeId2}>Signs API Hub responses / <code data-v-cf3c2e35${_scopeId2}>id_token</code> to TPPs</td><td data-v-cf3c2e35${_scopeId2}>✅</td><td data-v-cf3c2e35${_scopeId2}>Ozone</td></tr><tr data-v-cf3c2e35${_scopeId2}><td data-v-cf3c2e35${_scopeId2}><strong data-v-cf3c2e35${_scopeId2}>C4</strong></td><td data-v-cf3c2e35${_scopeId2}>Hub client cert when calling Ozone Connect (held in Ozone&#39;s org)</td><td data-v-cf3c2e35${_scopeId2}>✅</td><td data-v-cf3c2e35${_scopeId2}>Ozone</td></tr><tr data-v-cf3c2e35${_scopeId2}><td data-v-cf3c2e35${_scopeId2}><strong data-v-cf3c2e35${_scopeId2}>Sig3</strong></td><td data-v-cf3c2e35${_scopeId2}>Signs Hub-side JWT Auth headers (held in Ozone&#39;s org, only when JWT Auth is used)</td><td data-v-cf3c2e35${_scopeId2}>✅</td><td data-v-cf3c2e35${_scopeId2}>Ozone</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Certificate"),
                          createVNode("th", null, "Purpose"),
                          createVNode("th", null, "Added per Hub"),
                          createVNode("th", null, "Private key held by")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "S1")
                          ]),
                          createVNode("td", null, "Identifies the Hub instance to TPPs"),
                          createVNode("td", null, "✅"),
                          createVNode("td", null, "Ozone")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "S3")
                          ]),
                          createVNode("td", null, "Identifies CM & HH servers to the LFI"),
                          createVNode("td", null, "✅"),
                          createVNode("td", null, "Ozone")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "Sig2")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("Signs API Hub responses / "),
                            createVNode("code", null, "id_token"),
                            createTextVNode(" to TPPs")
                          ]),
                          createVNode("td", null, "✅"),
                          createVNode("td", null, "Ozone")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "C4")
                          ]),
                          createVNode("td", null, "Hub client cert when calling Ozone Connect (held in Ozone's org)"),
                          createVNode("td", null, "✅"),
                          createVNode("td", null, "Ozone")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "Sig3")
                          ]),
                          createVNode("td", null, "Signs Hub-side JWT Auth headers (held in Ozone's org, only when JWT Auth is used)"),
                          createVNode("td", null, "✅"),
                          createVNode("td", null, "Ozone")
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
                  _push3(`Net effect: the LFI&#39;s own certificate maintenance burden does not grow as additional Hubs are added. The one-time set of C3, S4, Sig4, and Enc1 covers every Hub sitting under the organisation.`);
                } else {
                  return [
                    createTextVNode("Net effect: the LFI's own certificate maintenance burden does not grow as additional Hubs are added. The one-time set of C3, S4, Sig4, and Enc1 covers every Hub sitting under the organisation.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, "LFI-held certificates — maintained once, shared across Hubs"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("LFI-held certificates live on the LFI's Trust Framework organisation and are held by the LFI. Because both Hubs sit under the same organisation and share the same "),
                  createVNode("code", null, "C3-hh-cm-client"),
                  createTextVNode(" application, the LFI maintains "),
                  createVNode("strong", null, "one set"),
                  createTextVNode(" of these certificates:")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Certificate"),
                        createVNode("th", null, "Purpose"),
                        createVNode("th", null, "Reused across Hubs")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "C3")
                        ]),
                        createVNode("td", null, "LFI client cert used when calling Consent Manager & Headless Heimdall"),
                        createVNode("td", null, "✅")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "S4")
                        ]),
                        createVNode("td", null, "LFI server cert identifying Ozone Connect to the API Hub"),
                        createVNode("td", null, "✅")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "Sig4")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("LFI JWT Auth signing key (only if "),
                          createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/application-layer-auth#jwt-auth" }, "JWT Auth"),
                          createTextVNode(" is selected)")
                        ]),
                        createVNode("td", null, "✅")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "Enc1")
                        ]),
                        createVNode("td", null, "LFI encryption key used to decrypt PII"),
                        createVNode("td", null, "✅")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("See "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/connectivity/" }, "API Hub Connectivity & Certificates"),
                  createTextVNode(' for the full certificate model and the existing "Certificate reuse across brands" note.')
                ]),
                _: 1
              }),
              createVNode("h3", null, "Ozone-held certificates — additional material added per Hub"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Each additional API Hub requires its own server-side certificates — most visibly "),
                  createVNode("strong", null, "S1"),
                  createTextVNode(", the server transport certificate that identifies the Hub instance to TPPs. These are added to the LFI's Trust Framework organisation so TPPs can validate the Hub's identity, but the private keys are held and maintained by Ozone.")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("From the LFI's perspective, these certificates appear under the organisation but require no operational involvement — the LFI does not generate, store, or rotate the private key material.")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Certificate"),
                        createVNode("th", null, "Purpose"),
                        createVNode("th", null, "Added per Hub"),
                        createVNode("th", null, "Private key held by")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "S1")
                        ]),
                        createVNode("td", null, "Identifies the Hub instance to TPPs"),
                        createVNode("td", null, "✅"),
                        createVNode("td", null, "Ozone")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "S3")
                        ]),
                        createVNode("td", null, "Identifies CM & HH servers to the LFI"),
                        createVNode("td", null, "✅"),
                        createVNode("td", null, "Ozone")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "Sig2")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("Signs API Hub responses / "),
                          createVNode("code", null, "id_token"),
                          createTextVNode(" to TPPs")
                        ]),
                        createVNode("td", null, "✅"),
                        createVNode("td", null, "Ozone")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "C4")
                        ]),
                        createVNode("td", null, "Hub client cert when calling Ozone Connect (held in Ozone's org)"),
                        createVNode("td", null, "✅"),
                        createVNode("td", null, "Ozone")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "Sig3")
                        ]),
                        createVNode("td", null, "Signs Hub-side JWT Auth headers (held in Ozone's org, only when JWT Auth is used)"),
                        createVNode("td", null, "✅"),
                        createVNode("td", null, "Ozone")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Net effect: the LFI's own certificate maintenance burden does not grow as additional Hubs are added. The one-time set of C3, S4, Sig4, and Enc1 covers every Hub sitting under the organisation.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "routing",
        num: "04",
        color: "var(--at-blue-deep)",
        eyebrow: "Single Ozone Connect routing",
        title: "o3-provider-id selects the segment",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_APIFlowViewer, { title: "Multi-Segment LFI — Request Routing via o3-provider-id" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_APIFlowsMultiSegmentApiHubs, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_APIFlowsMultiSegmentApiHubs)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Because the LFI uses a single shared Ozone Connect deployment, incoming requests from the multiple Hubs arrive at the same set of endpoints. The Ozone Connect layer must identify which Hub the request came from and route internally to the appropriate downstream core (retail core vs SME core, for example).`);
                } else {
                  return [
                    createTextVNode("Because the LFI uses a single shared Ozone Connect deployment, incoming requests from the multiple Hubs arrive at the same set of endpoints. The Ozone Connect layer must identify which Hub the request came from and route internally to the appropriate downstream core (retail core vs SME core, for example).")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`The API Hub tells the LFI which Hub the request originated from via the <strong data-v-cf3c2e35${_scopeId2}><code data-v-cf3c2e35${_scopeId2}>o3-provider-id</code></strong> request header. The value sent on every request <strong data-v-cf3c2e35${_scopeId2}>is the LFI Code</strong> for the Hub that originated it — the same code that forms part of that Hub&#39;s TPP-facing and LFI-facing hostnames (see <a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/prerequisites#lfi-code" data-v-cf3c2e35${_scopeId2}>Prerequisites — LFI Code</a>). Because each segment Hub is onboarded with its own LFI Code, Ozone Connect can use <code data-v-cf3c2e35${_scopeId2}>o3-provider-id</code> directly to identify the segment.`);
                } else {
                  return [
                    createTextVNode("The API Hub tells the LFI which Hub the request originated from via the "),
                    createVNode("strong", null, [
                      createVNode("code", null, "o3-provider-id")
                    ]),
                    createTextVNode(" request header. The value sent on every request "),
                    createVNode("strong", null, "is the LFI Code"),
                    createTextVNode(" for the Hub that originated it — the same code that forms part of that Hub's TPP-facing and LFI-facing hostnames (see "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/prerequisites#lfi-code" }, "Prerequisites — LFI Code"),
                    createTextVNode("). Because each segment Hub is onboarded with its own LFI Code, Ozone Connect can use "),
                    createVNode("code", null, "o3-provider-id"),
                    createTextVNode(" directly to identify the segment.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`For example, FAB operates separate retail and business Hubs in production with LFI Codes <code data-v-cf3c2e35${_scopeId2}>fabretail</code> and <code data-v-cf3c2e35${_scopeId2}>fabbusiness</code> respectively — Ozone Connect receives those exact values in the <code data-v-cf3c2e35${_scopeId2}>o3-provider-id</code> header on each request.`);
                } else {
                  return [
                    createTextVNode("For example, FAB operates separate retail and business Hubs in production with LFI Codes "),
                    createVNode("code", null, "fabretail"),
                    createTextVNode(" and "),
                    createVNode("code", null, "fabbusiness"),
                    createTextVNode(" respectively — Ozone Connect receives those exact values in the "),
                    createVNode("code", null, "o3-provider-id"),
                    createTextVNode(" header on each request.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-cf3c2e35${_scopeId2}><thead data-v-cf3c2e35${_scopeId2}><tr data-v-cf3c2e35${_scopeId2}><th data-v-cf3c2e35${_scopeId2}>Request</th><th data-v-cf3c2e35${_scopeId2}><code data-v-cf3c2e35${_scopeId2}>o3-provider-id</code> value (FAB example)</th><th data-v-cf3c2e35${_scopeId2}>LFI action</th></tr></thead><tbody data-v-cf3c2e35${_scopeId2}><tr data-v-cf3c2e35${_scopeId2}><td data-v-cf3c2e35${_scopeId2}>Retail Hub → Ozone Connect</td><td data-v-cf3c2e35${_scopeId2}><code data-v-cf3c2e35${_scopeId2}>fabretail</code></td><td data-v-cf3c2e35${_scopeId2}>Route to retail core banking system</td></tr><tr data-v-cf3c2e35${_scopeId2}><td data-v-cf3c2e35${_scopeId2}>Business Hub → Ozone Connect</td><td data-v-cf3c2e35${_scopeId2}><code data-v-cf3c2e35${_scopeId2}>fabbusiness</code></td><td data-v-cf3c2e35${_scopeId2}>Route to SME / business core banking system</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Request"),
                          createVNode("th", null, [
                            createVNode("code", null, "o3-provider-id"),
                            createTextVNode(" value (FAB example)")
                          ]),
                          createVNode("th", null, "LFI action")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, "Retail Hub → Ozone Connect"),
                          createVNode("td", null, [
                            createVNode("code", null, "fabretail")
                          ]),
                          createVNode("td", null, "Route to retail core banking system")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "Business Hub → Ozone Connect"),
                          createVNode("td", null, [
                            createVNode("code", null, "fabbusiness")
                          ]),
                          createVNode("td", null, "Route to SME / business core banking system")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-cf3c2e35${_scopeId}>Implementation guidance</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-cf3c2e35${_scopeId2}>The <code data-v-cf3c2e35${_scopeId2}>o3-provider-id</code> value is fixed at onboarding when each Hub&#39;s LFI Code is agreed with Nebras. There is no separate configuration step.</li><li data-v-cf3c2e35${_scopeId2}>Treat <code data-v-cf3c2e35${_scopeId2}>o3-provider-id</code> as the <strong data-v-cf3c2e35${_scopeId2}>first branching decision</strong> inside Ozone Connect. All downstream logic (account lookup, customer lookup, payment execution, consent validation) should resolve through the segment&#39;s own core.</li><li data-v-cf3c2e35${_scopeId2}>Validate the header on every request — reject calls with a missing or unknown <code data-v-cf3c2e35${_scopeId2}>o3-provider-id</code>.</li><li data-v-cf3c2e35${_scopeId2}>Keep segment boundaries clean: a consent created via the retail Hub <strong data-v-cf3c2e35${_scopeId2}>MUST</strong> be served by the retail core; a consent created via the business Hub <strong data-v-cf3c2e35${_scopeId2}>MUST</strong> be served by the business core. Do not allow cross-segment resolution.</li><li data-v-cf3c2e35${_scopeId2}><code data-v-cf3c2e35${_scopeId2}>o3-provider-id</code> is the supported identifier. <code data-v-cf3c2e35${_scopeId2}>o3-aspsp-id</code> is a deprecated alias retained for backward compatibility only — see the request header tables in each API guide (e.g. <a href="/tech/lfi-api-hub/v2.1/banking/data-sharing/api-guide/" data-v-cf3c2e35${_scopeId2}>Bank Data Sharing API Guide</a>).</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createTextVNode("The "),
                      createVNode("code", null, "o3-provider-id"),
                      createTextVNode(" value is fixed at onboarding when each Hub's LFI Code is agreed with Nebras. There is no separate configuration step.")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("Treat "),
                      createVNode("code", null, "o3-provider-id"),
                      createTextVNode(" as the "),
                      createVNode("strong", null, "first branching decision"),
                      createTextVNode(" inside Ozone Connect. All downstream logic (account lookup, customer lookup, payment execution, consent validation) should resolve through the segment's own core.")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("Validate the header on every request — reject calls with a missing or unknown "),
                      createVNode("code", null, "o3-provider-id"),
                      createTextVNode(".")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("Keep segment boundaries clean: a consent created via the retail Hub "),
                      createVNode("strong", null, "MUST"),
                      createTextVNode(" be served by the retail core; a consent created via the business Hub "),
                      createVNode("strong", null, "MUST"),
                      createTextVNode(" be served by the business core. Do not allow cross-segment resolution.")
                    ]),
                    createVNode("li", null, [
                      createVNode("code", null, "o3-provider-id"),
                      createTextVNode(" is the supported identifier. "),
                      createVNode("code", null, "o3-aspsp-id"),
                      createTextVNode(" is a deprecated alias retained for backward compatibility only — see the request header tables in each API guide (e.g. "),
                      createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/api-guide/" }, "Bank Data Sharing API Guide"),
                      createTextVNode(").")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_APIFlowViewer, { title: "Multi-Segment LFI — Request Routing via o3-provider-id" }, {
                default: withCtx(() => [
                  createVNode(_component_APIFlowsMultiSegmentApiHubs)
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Because the LFI uses a single shared Ozone Connect deployment, incoming requests from the multiple Hubs arrive at the same set of endpoints. The Ozone Connect layer must identify which Hub the request came from and route internally to the appropriate downstream core (retail core vs SME core, for example).")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("The API Hub tells the LFI which Hub the request originated from via the "),
                  createVNode("strong", null, [
                    createVNode("code", null, "o3-provider-id")
                  ]),
                  createTextVNode(" request header. The value sent on every request "),
                  createVNode("strong", null, "is the LFI Code"),
                  createTextVNode(" for the Hub that originated it — the same code that forms part of that Hub's TPP-facing and LFI-facing hostnames (see "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/prerequisites#lfi-code" }, "Prerequisites — LFI Code"),
                  createTextVNode("). Because each segment Hub is onboarded with its own LFI Code, Ozone Connect can use "),
                  createVNode("code", null, "o3-provider-id"),
                  createTextVNode(" directly to identify the segment.")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("For example, FAB operates separate retail and business Hubs in production with LFI Codes "),
                  createVNode("code", null, "fabretail"),
                  createTextVNode(" and "),
                  createVNode("code", null, "fabbusiness"),
                  createTextVNode(" respectively — Ozone Connect receives those exact values in the "),
                  createVNode("code", null, "o3-provider-id"),
                  createTextVNode(" header on each request.")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Request"),
                        createVNode("th", null, [
                          createVNode("code", null, "o3-provider-id"),
                          createTextVNode(" value (FAB example)")
                        ]),
                        createVNode("th", null, "LFI action")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, "Retail Hub → Ozone Connect"),
                        createVNode("td", null, [
                          createVNode("code", null, "fabretail")
                        ]),
                        createVNode("td", null, "Route to retail core banking system")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "Business Hub → Ozone Connect"),
                        createVNode("td", null, [
                          createVNode("code", null, "fabbusiness")
                        ]),
                        createVNode("td", null, "Route to SME / business core banking system")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "Implementation guidance"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createTextVNode("The "),
                    createVNode("code", null, "o3-provider-id"),
                    createTextVNode(" value is fixed at onboarding when each Hub's LFI Code is agreed with Nebras. There is no separate configuration step.")
                  ]),
                  createVNode("li", null, [
                    createTextVNode("Treat "),
                    createVNode("code", null, "o3-provider-id"),
                    createTextVNode(" as the "),
                    createVNode("strong", null, "first branching decision"),
                    createTextVNode(" inside Ozone Connect. All downstream logic (account lookup, customer lookup, payment execution, consent validation) should resolve through the segment's own core.")
                  ]),
                  createVNode("li", null, [
                    createTextVNode("Validate the header on every request — reject calls with a missing or unknown "),
                    createVNode("code", null, "o3-provider-id"),
                    createTextVNode(".")
                  ]),
                  createVNode("li", null, [
                    createTextVNode("Keep segment boundaries clean: a consent created via the retail Hub "),
                    createVNode("strong", null, "MUST"),
                    createTextVNode(" be served by the retail core; a consent created via the business Hub "),
                    createVNode("strong", null, "MUST"),
                    createTextVNode(" be served by the business core. Do not allow cross-segment resolution.")
                  ]),
                  createVNode("li", null, [
                    createVNode("code", null, "o3-provider-id"),
                    createTextVNode(" is the supported identifier. "),
                    createVNode("code", null, "o3-aspsp-id"),
                    createTextVNode(" is a deprecated alias retained for backward compatibility only — see the request header tables in each API guide (e.g. "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/api-guide/" }, "Bank Data Sharing API Guide"),
                    createTextVNode(").")
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
        id: "summary",
        num: "05",
        color: "var(--at-navy)",
        eyebrow: "Summary",
        title: "At a glance",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-cf3c2e35${_scopeId2}><thead data-v-cf3c2e35${_scopeId2}><tr data-v-cf3c2e35${_scopeId2}><th data-v-cf3c2e35${_scopeId2}>Concern</th><th data-v-cf3c2e35${_scopeId2}>Recommendation</th></tr></thead><tbody data-v-cf3c2e35${_scopeId2}><tr data-v-cf3c2e35${_scopeId2}><td data-v-cf3c2e35${_scopeId2}>Trust Framework organisations</td><td data-v-cf3c2e35${_scopeId2}>One</td></tr><tr data-v-cf3c2e35${_scopeId2}><td data-v-cf3c2e35${_scopeId2}>API Hub deployments</td><td data-v-cf3c2e35${_scopeId2}>One per distinct authentication context (e.g. retail, SME)</td></tr><tr data-v-cf3c2e35${_scopeId2}><td data-v-cf3c2e35${_scopeId2}><code data-v-cf3c2e35${_scopeId2}>C3-hh-cm-client</code> application</td><td data-v-cf3c2e35${_scopeId2}>One, shared</td></tr><tr data-v-cf3c2e35${_scopeId2}><td data-v-cf3c2e35${_scopeId2}>LFI-held certificates (C3, S4, Sig4, Enc1)</td><td data-v-cf3c2e35${_scopeId2}>One set, shared across Hubs</td></tr><tr data-v-cf3c2e35${_scopeId2}><td data-v-cf3c2e35${_scopeId2}>Ozone-held certificates (S1 etc.)</td><td data-v-cf3c2e35${_scopeId2}>Added per Hub; maintained by Ozone</td></tr><tr data-v-cf3c2e35${_scopeId2}><td data-v-cf3c2e35${_scopeId2}>Ozone Connect</td><td data-v-cf3c2e35${_scopeId2}>One deployment, routing on <code data-v-cf3c2e35${_scopeId2}>o3-provider-id</code></td></tr><tr data-v-cf3c2e35${_scopeId2}><td data-v-cf3c2e35${_scopeId2}>Downstream cores</td><td data-v-cf3c2e35${_scopeId2}>One per segment, selected by <code data-v-cf3c2e35${_scopeId2}>o3-provider-id</code></td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Concern"),
                          createVNode("th", null, "Recommendation")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, "Trust Framework organisations"),
                          createVNode("td", null, "One")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "API Hub deployments"),
                          createVNode("td", null, "One per distinct authentication context (e.g. retail, SME)")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "C3-hh-cm-client"),
                            createTextVNode(" application")
                          ]),
                          createVNode("td", null, "One, shared")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "LFI-held certificates (C3, S4, Sig4, Enc1)"),
                          createVNode("td", null, "One set, shared across Hubs")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "Ozone-held certificates (S1 etc.)"),
                          createVNode("td", null, "Added per Hub; maintained by Ozone")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "Ozone Connect"),
                          createVNode("td", null, [
                            createTextVNode("One deployment, routing on "),
                            createVNode("code", null, "o3-provider-id")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "Downstream cores"),
                          createVNode("td", null, [
                            createTextVNode("One per segment, selected by "),
                            createVNode("code", null, "o3-provider-id")
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
                  _push3(`This pattern keeps the LFI&#39;s operational and certificate footprint independent of the number of segments served, while still meeting the Open Finance authentication and authorization model for each segment independently.`);
                } else {
                  return [
                    createTextVNode("This pattern keeps the LFI's operational and certificate footprint independent of the number of segments served, while still meeting the Open Finance authentication and authorization model for each segment independently.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Concern"),
                        createVNode("th", null, "Recommendation")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, "Trust Framework organisations"),
                        createVNode("td", null, "One")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "API Hub deployments"),
                        createVNode("td", null, "One per distinct authentication context (e.g. retail, SME)")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "C3-hh-cm-client"),
                          createTextVNode(" application")
                        ]),
                        createVNode("td", null, "One, shared")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "LFI-held certificates (C3, S4, Sig4, Enc1)"),
                        createVNode("td", null, "One set, shared across Hubs")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "Ozone-held certificates (S1 etc.)"),
                        createVNode("td", null, "Added per Hub; maintained by Ozone")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "Ozone Connect"),
                        createVNode("td", null, [
                          createTextVNode("One deployment, routing on "),
                          createVNode("code", null, "o3-provider-id")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "Downstream cores"),
                        createVNode("td", null, [
                          createTextVNode("One per segment, selected by "),
                          createVNode("code", null, "o3-provider-id")
                        ])
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("This pattern keeps the LFI's operational and certificate footprint independent of the number of segments served, while still meeting the Open Finance authentication and authorization model for each segment independently.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdRelatedCards, {
        eyebrow: "Related articles",
        title: "Read alongside"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdRelatedCard, {
              href: "/knowledge-base/articles/tpp-context-block",
              category: "Integration",
              "category-color": "var(--at-blue-deep)",
              title: "The tpp and decodedSsa Context Blocks",
              desc: "What the TPP context object on every Ozone Connect call contains."
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRelatedCard, {
              href: "/knowledge-base/articles/request-headers",
              category: "Security",
              "category-color": "var(--at-blue)",
              title: "FAPI Request Headers",
              desc: "What x-fapi-interaction-id and the other FAPI headers are for."
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdRelatedCard, {
                href: "/knowledge-base/articles/tpp-context-block",
                category: "Integration",
                "category-color": "var(--at-blue-deep)",
                title: "The tpp and decodedSsa Context Blocks",
                desc: "What the TPP context object on every Ozone Connect call contains."
              }),
              createVNode(_component_EdRelatedCard, {
                href: "/knowledge-base/articles/request-headers",
                category: "Security",
                "category-color": "var(--at-blue)",
                title: "FAPI Request Headers",
                desc: "What x-fapi-interaction-id and the other FAPI headers are for."
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/knowledge-base/articles/multi-segment-api-hubs.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const multiSegmentApiHubs = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-cf3c2e35"]]);
export {
  multiSegmentApiHubs as default
};
