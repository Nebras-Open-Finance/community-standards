import { _ as __unplugin_components_5$1 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_5 } from "./Carousel-BiOyohqq.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { defineComponent, resolveComponent, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "tpp-activation",
  __ssrInlineRender: true,
  setup(__props) {
    const images1 = [
      { src: new URL("/images/ozone/admin-portal/1.png", import.meta.url).href, alt: "Step 1", title: "Go to TPP Management > TPP List > Click on the TPP name. If it is not active, click Activate." },
      { src: new URL("/images/ozone/admin-portal/2.png", import.meta.url).href, alt: "Step 2", title: "Click on the Activate TPP button" },
      { src: new URL("/images/ozone/admin-portal/3.png", import.meta.url).href, alt: "Step 3", title: "Click on Activate TPP to confirm" }
    ];
    const images2 = [
      { src: new URL("/images/ozone/admin-portal/4.png", import.meta.url).href, alt: "Step 1", title: "Go to TPP Management > Software Statement > Click on the Software Statement name. If it is not active, click Activate." },
      { src: new URL("/images/ozone/admin-portal/5.png", import.meta.url).href, alt: "Step 2", title: "Click on the Activate button" },
      { src: new URL("/images/ozone/admin-portal/6.png", import.meta.url).href, alt: "Step 3", title: "Click on Activate to confirm" }
    ];
    const images3 = [
      { src: new URL("/images/ozone/admin-portal/7.png", import.meta.url).href, alt: "Step 1", title: "Go to TPP Management > Clients > Click on the Client name. If it is not active, click Activate." },
      { src: new URL("/images/ozone/admin-portal/8.png", import.meta.url).href, alt: "Step 2", title: "Click on the Activate button" },
      { src: new URL("/images/ozone/admin-portal/9.png", import.meta.url).href, alt: "Step 3", title: "Click on Activate to confirm" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdNote = __unplugin_components_7;
      const _component_ClientOnly = resolveComponent("ClientOnly");
      const _component_Carousel = __unplugin_components_5;
      const _component_EdBullets = __unplugin_components_5$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-16a294f0><section class="ed-doc__hero" data-v-16a294f0><div class="ed-doc__inner" data-v-16a294f0><div class="ed-doc__eyebrow" data-v-16a294f0><span class="ed-doc__eyebrow-dash" data-v-16a294f0></span> LFI · API Hub · Admin Portal · TPP Management </div><h1 class="ed-doc__title" data-v-16a294f0> TPP Management &amp; Activation <span class="ed-doc__read" data-v-16a294f0>3 min read</span></h1><p class="ed-doc__lede" data-v-16a294f0> The <strong data-v-16a294f0>TPP Management</strong> section of the Admin Portal is where you manage all TPPs that have registered with your API Hub. It contains three sub-sections: <strong data-v-16a294f0>TPP List</strong>, <strong data-v-16a294f0>Software Statements</strong>, and <strong data-v-16a294f0>Clients</strong>. </p><p class="ed-doc__lede ed-doc__lede--tight" data-v-16a294f0> All three levels — TPP, software statement, and client — MUST be active for a TPP to make API requests. If any one of the three is blocked, the TPP&#39;s requests will be rejected. </p></div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "viewing-tpps",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Viewing registered TPPs",
        title: "Browse the TPP list",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The TPP List shows every TPP organisation that has registered with your API Hub. Each TPP entry represents an organisation from the Trust Framework. A single TPP organisation may have multiple software statements (applications) and multiple clients. `);
                } else {
                  return [
                    createTextVNode(" The TPP List shows every TPP organisation that has registered with your API Hub. Each TPP entry represents an organisation from the Trust Framework. A single TPP organisation may have multiple software statements (applications) and multiple clients. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "info",
              title: "Nebras and Ozone internal clients"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-16a294f0${_scopeId2}> You will see TPP entries for <strong data-v-16a294f0${_scopeId2}>Nebras</strong> and <strong data-v-16a294f0${_scopeId2}>Ozone</strong> with active clients against them. These are used internally to validate and monitor your API Hub — they MUST remain active. If any of these clients&#39; requests are causing issues, contact Nebras before blocking them. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" You will see TPP entries for "),
                      createVNode("strong", null, "Nebras"),
                      createTextVNode(" and "),
                      createVNode("strong", null, "Ozone"),
                      createTextVNode(" with active clients against them. These are used internally to validate and monitor your API Hub — they MUST remain active. If any of these clients' requests are causing issues, contact Nebras before blocking them. ")
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
                  createTextVNode(" The TPP List shows every TPP organisation that has registered with your API Hub. Each TPP entry represents an organisation from the Trust Framework. A single TPP organisation may have multiple software statements (applications) and multiple clients. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "info",
                title: "Nebras and Ozone internal clients"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" You will see TPP entries for "),
                    createVNode("strong", null, "Nebras"),
                    createTextVNode(" and "),
                    createVNode("strong", null, "Ozone"),
                    createTextVNode(" with active clients against them. These are used internally to validate and monitor your API Hub — they MUST remain active. If any of these clients' requests are causing issues, contact Nebras before blocking them. ")
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
        id: "activating-tpp",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "Activating a TPP",
        title: "Three steps in strict order",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` After a TPP has registered with you — after the <code data-v-16a294f0${_scopeId2}>/tpp-registration</code> endpoint is called successfully (for detail on how a TPP registers, see <a href="/tech/tpp-standards/registration/api-guide" data-v-16a294f0${_scopeId2}>Registration API Guide</a>) — the TPP is not automatically granted access. The LFI MUST activate the TPP within the Admin Portal for access to be granted. `);
                } else {
                  return [
                    createTextVNode(" After a TPP has registered with you — after the "),
                    createVNode("code", null, "/tpp-registration"),
                    createTextVNode(" endpoint is called successfully (for detail on how a TPP registers, see "),
                    createVNode("a", { href: "/tech/tpp-standards/registration/api-guide" }, "Registration API Guide"),
                    createTextVNode(") — the TPP is not automatically granted access. The LFI MUST activate the TPP within the Admin Portal for access to be granted. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The activation is done in three steps and <strong data-v-16a294f0${_scopeId2}>MUST be performed in this order.</strong>`);
                } else {
                  return [
                    createTextVNode(" The activation is done in three steps and "),
                    createVNode("strong", null, "MUST be performed in this order.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-16a294f0${_scopeId}>Step 1 — Activate the TPP</h3>`);
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
            _push2(`<h3 data-v-16a294f0${_scopeId}>Step 2 — Activate the Software Statement</h3>`);
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
            _push2(`<h3 data-v-16a294f0${_scopeId}>Step 3 — Activate the Client</h3>`);
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
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" After a TPP has registered with you — after the "),
                  createVNode("code", null, "/tpp-registration"),
                  createTextVNode(" endpoint is called successfully (for detail on how a TPP registers, see "),
                  createVNode("a", { href: "/tech/tpp-standards/registration/api-guide" }, "Registration API Guide"),
                  createTextVNode(") — the TPP is not automatically granted access. The LFI MUST activate the TPP within the Admin Portal for access to be granted. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The activation is done in three steps and "),
                  createVNode("strong", null, "MUST be performed in this order.")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Step 1 — Activate the TPP"),
              createVNode(_component_ClientOnly, null, {
                default: withCtx(() => [
                  createVNode(_component_Carousel, { images: images1 })
                ]),
                _: 1
              }),
              createVNode("h3", null, "Step 2 — Activate the Software Statement"),
              createVNode(_component_ClientOnly, null, {
                default: withCtx(() => [
                  createVNode(_component_Carousel, { images: images2 })
                ]),
                _: 1
              }),
              createVNode("h3", null, "Step 3 — Activate the Client"),
              createVNode(_component_ClientOnly, null, {
                default: withCtx(() => [
                  createVNode(_component_Carousel, { images: images3 })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "blocking-tpp",
        num: "03",
        color: "var(--at-blue-deep, #1d4ed8)",
        eyebrow: "Blocking a TPP",
        title: "Block at TPP, software statement, or client level",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` In certain circumstances, Nebras may instruct an LFI to block a TPP — for example, if a TPP is consistently sending malformed requests and is unresponsive to communications. Blocking can be applied at any of the three levels: `);
                } else {
                  return [
                    createTextVNode(" In certain circumstances, Nebras may instruct an LFI to block a TPP — for example, if a TPP is consistently sending malformed requests and is unresponsive to communications. Blocking can be applied at any of the three levels: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-16a294f0${_scopeId2}><strong data-v-16a294f0${_scopeId2}>Block the client</strong> — immediately stops requests from that specific client</li><li data-v-16a294f0${_scopeId2}><strong data-v-16a294f0${_scopeId2}>Block the software statement</strong> — stops all clients under that software statement</li><li data-v-16a294f0${_scopeId2}><strong data-v-16a294f0${_scopeId2}>Block the TPP</strong> — stops all software statements and clients for the entire TPP organisation</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Block the client"),
                      createTextVNode(" — immediately stops requests from that specific client")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Block the software statement"),
                      createTextVNode(" — stops all clients under that software statement")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Block the TPP"),
                      createTextVNode(" — stops all software statements and clients for the entire TPP organisation")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` To block, navigate to the relevant entity (TPP, software statement, or client), open its detail page, and click <strong data-v-16a294f0${_scopeId2}>Block</strong>. `);
                } else {
                  return [
                    createTextVNode(" To block, navigate to the relevant entity (TPP, software statement, or client), open its detail page, and click "),
                    createVNode("strong", null, "Block"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` To restore access, open the blocked entity and click <strong data-v-16a294f0${_scopeId2}>Activate</strong>. `);
                } else {
                  return [
                    createTextVNode(" To restore access, open the blocked entity and click "),
                    createVNode("strong", null, "Activate"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "warning",
              title: "Do not block without instruction"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-16a294f0${_scopeId2}> Do NOT block a TPP, software statement, or client without explicit instruction from Nebras. If you observe issues with a specific TPP&#39;s traffic, raise it with Nebras first. In cases where the Central Bank revokes a TPP&#39;s licence, Nebras will remove the TPP from the ecosystem centrally — no LFI action is required. </p>`);
                } else {
                  return [
                    createVNode("p", null, " Do NOT block a TPP, software statement, or client without explicit instruction from Nebras. If you observe issues with a specific TPP's traffic, raise it with Nebras first. In cases where the Central Bank revokes a TPP's licence, Nebras will remove the TPP from the ecosystem centrally — no LFI action is required. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" In certain circumstances, Nebras may instruct an LFI to block a TPP — for example, if a TPP is consistently sending malformed requests and is unresponsive to communications. Blocking can be applied at any of the three levels: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Block the client"),
                    createTextVNode(" — immediately stops requests from that specific client")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Block the software statement"),
                    createTextVNode(" — stops all clients under that software statement")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Block the TPP"),
                    createTextVNode(" — stops all software statements and clients for the entire TPP organisation")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" To block, navigate to the relevant entity (TPP, software statement, or client), open its detail page, and click "),
                  createVNode("strong", null, "Block"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" To restore access, open the blocked entity and click "),
                  createVNode("strong", null, "Activate"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "warning",
                title: "Do not block without instruction"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, " Do NOT block a TPP, software statement, or client without explicit instruction from Nebras. If you observe issues with a specific TPP's traffic, raise it with Nebras first. In cases where the Central Bank revokes a TPP's licence, Nebras will remove the TPP from the ecosystem centrally — no LFI action is required. ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/v2.1/api-hub/admin-portal/tpp-activation.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const tppActivation = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-16a294f0"]]);
export {
  tppActivation as default
};
