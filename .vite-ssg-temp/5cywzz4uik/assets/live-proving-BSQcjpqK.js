import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_EdSectionBand = __unplugin_components_3;
  const _component_EdProse = __unplugin_components_4;
  const _component_EdNote = __unplugin_components_7;
  const _component_EdBullets = __unplugin_components_5;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-9b443fbf><section class="ed-doc__hero" data-v-9b443fbf><div class="ed-doc__inner" data-v-9b443fbf><div class="ed-doc__eyebrow" data-v-9b443fbf><span class="ed-doc__eyebrow-dash" data-v-9b443fbf></span> Production · Live Proving </div><h1 class="ed-doc__title" data-v-9b443fbf> Production Live Proving <span class="ed-doc__read" data-v-9b443fbf>2 min read</span></h1><p class="ed-doc__lede" data-v-9b443fbf> Once all certification requirements have been met, TPPs enter the <strong data-v-9b443fbf>Production Proving Phase</strong> — a controlled live period where the TPP&#39;s integration is validated against real production infrastructure before being opened to all customers and LFIs. </p></div></section>`);
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "buddying",
    num: "01",
    color: "var(--at-teal)",
    eyebrow: "The Buddying Phase",
    title: "Validate against a small set of buddy LFIs first",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` During Production Proving, each TPP is paired with a small set of <strong data-v-9b443fbf${_scopeId2}>buddy LFIs</strong> (Authorization Servers). Testing in production is restricted to these buddied LFIs only — the TPP must not make production requests to any LFI or Authorization Server outside of its assigned buddy set during this phase. `);
            } else {
              return [
                createTextVNode(" During Production Proving, each TPP is paired with a small set of "),
                createVNode("strong", null, "buddy LFIs"),
                createTextVNode(" (Authorization Servers). Testing in production is restricted to these buddied LFIs only — the TPP must not make production requests to any LFI or Authorization Server outside of its assigned buddy set during this phase. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` This pairing allows the TPP to validate its end-to-end use case in a controlled real-world environment, with LFI teams available to support and investigate any issues that arise. `);
            } else {
              return [
                createTextVNode(" This pairing allows the TPP to validate its end-to-end use case in a controlled real-world environment, with LFI teams available to support and investigate any issues that arise. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<strong data-v-9b443fbf${_scopeId2}>Expected duration:</strong> 2 weeks to 1 month, depending on the complexity of the integration and the number of use cases being validated. `);
            } else {
              return [
                createVNode("strong", null, "Expected duration:"),
                createTextVNode(" 2 weeks to 1 month, depending on the complexity of the integration and the number of use cases being validated. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdNote, {
          type: "info",
          title: "Only test users during live proving"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<p data-v-9b443fbf${_scopeId2}> During the buddying phase, all testing must be conducted using <strong data-v-9b443fbf${_scopeId2}>test users only</strong>. Real customer accounts must not be used until go-live approval has been granted. </p>`);
            } else {
              return [
                createVNode("p", null, [
                  createTextVNode(" During the buddying phase, all testing must be conducted using "),
                  createVNode("strong", null, "test users only"),
                  createTextVNode(". Real customer accounts must not be used until go-live approval has been granted. ")
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
              createTextVNode(" During Production Proving, each TPP is paired with a small set of "),
              createVNode("strong", null, "buddy LFIs"),
              createTextVNode(" (Authorization Servers). Testing in production is restricted to these buddied LFIs only — the TPP must not make production requests to any LFI or Authorization Server outside of its assigned buddy set during this phase. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" This pairing allows the TPP to validate its end-to-end use case in a controlled real-world environment, with LFI teams available to support and investigate any issues that arise. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createVNode("strong", null, "Expected duration:"),
              createTextVNode(" 2 weeks to 1 month, depending on the complexity of the integration and the number of use cases being validated. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdNote, {
            type: "info",
            title: "Only test users during live proving"
          }, {
            default: withCtx(() => [
              createVNode("p", null, [
                createTextVNode(" During the buddying phase, all testing must be conducted using "),
                createVNode("strong", null, "test users only"),
                createTextVNode(". Real customer accounts must not be used until go-live approval has been granted. ")
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
    id: "commercial",
    num: "02",
    color: "var(--at-gold)",
    eyebrow: "Commercial Model",
    title: "Live proving is non-commercial",
    tone: "surface"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` The Production Proving Phase is <strong data-v-9b443fbf${_scopeId2}>non-commercial</strong>. None of the following apply until go-live approval is granted: `);
            } else {
              return [
                createTextVNode(" The Production Proving Phase is "),
                createVNode("strong", null, "non-commercial"),
                createTextVNode(". None of the following apply until go-live approval is granted: ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-9b443fbf${_scopeId2}>API Hub fees</li><li data-v-9b443fbf${_scopeId2}>LFI-to-TPP fees</li><li data-v-9b443fbf${_scopeId2}>TPP-to-LFI commissions</li><li data-v-9b443fbf${_scopeId2}>Any other commercial charges</li>`);
            } else {
              return [
                createVNode("li", null, "API Hub fees"),
                createVNode("li", null, "LFI-to-TPP fees"),
                createVNode("li", null, "TPP-to-LFI commissions"),
                createVNode("li", null, "Any other commercial charges")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` All commercial terms take effect only once Nebras grants go-live approval. `);
            } else {
              return [
                createTextVNode(" All commercial terms take effect only once Nebras grants go-live approval. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" The Production Proving Phase is "),
              createVNode("strong", null, "non-commercial"),
              createTextVNode(". None of the following apply until go-live approval is granted: ")
            ]),
            _: 1
          }),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, "API Hub fees"),
              createVNode("li", null, "LFI-to-TPP fees"),
              createVNode("li", null, "TPP-to-LFI commissions"),
              createVNode("li", null, "Any other commercial charges")
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" All commercial terms take effect only once Nebras grants go-live approval. ")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "go-live",
    num: "03",
    color: "var(--at-blue-deep, #1d4ed8)",
    eyebrow: "Applying for Go-Live",
    title: "Sign-off opens production access to all LFIs and customers",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Once the TPP is satisfied that live proving has been completed successfully, it can apply to Nebras for <strong data-v-9b443fbf${_scopeId2}>go-live sign-off</strong>. `);
            } else {
              return [
                createTextVNode(" Once the TPP is satisfied that live proving has been completed successfully, it can apply to Nebras for "),
                createVNode("strong", null, "go-live sign-off"),
                createTextVNode(". ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`Go-live approval allows the TPP to:`);
            } else {
              return [
                createTextVNode("Go-live approval allows the TPP to:")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-9b443fbf${_scopeId2}>Work with all production LFIs, not just the buddied set</li><li data-v-9b443fbf${_scopeId2}>Open their service to all customers</li><li data-v-9b443fbf${_scopeId2}>Operate under the full commercial model</li>`);
            } else {
              return [
                createVNode("li", null, "Work with all production LFIs, not just the buddied set"),
                createVNode("li", null, "Open their service to all customers"),
                createVNode("li", null, "Operate under the full commercial model")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Nebras will review the TPP&#39;s live proving activity before granting approval. `);
            } else {
              return [
                createTextVNode(" Nebras will review the TPP's live proving activity before granting approval. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Once the TPP is satisfied that live proving has been completed successfully, it can apply to Nebras for "),
              createVNode("strong", null, "go-live sign-off"),
              createTextVNode(". ")
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode("Go-live approval allows the TPP to:")
            ]),
            _: 1
          }),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, "Work with all production LFIs, not just the buddied set"),
              createVNode("li", null, "Open their service to all customers"),
              createVNode("li", null, "Operate under the full commercial model")
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Nebras will review the TPP's live proving activity before granting approval. ")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "onboarding-new-lfis",
    num: "04",
    color: "var(--at-navy)",
    eyebrow: "After Go-Live",
    title: "Onboarding new LFIs after go-live",
    tone: "surface"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Given the nature of Open Finance integrations — where each LFI operates its own Authorization Server with its own configuration, supported account types, and capabilities — <strong data-v-9b443fbf${_scopeId2}>each new LFI a TPP onboards requires its own validation period</strong>. TPPs should expect to spend time confirming that a newly integrated LFI behaves as expected for their use case before directing live customer traffic to it. This should be factored into integration and release planning. `);
            } else {
              return [
                createTextVNode(" Given the nature of Open Finance integrations — where each LFI operates its own Authorization Server with its own configuration, supported account types, and capabilities — "),
                createVNode("strong", null, "each new LFI a TPP onboards requires its own validation period"),
                createTextVNode(". TPPs should expect to spend time confirming that a newly integrated LFI behaves as expected for their use case before directing live customer traffic to it. This should be factored into integration and release planning. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Given the nature of Open Finance integrations — where each LFI operates its own Authorization Server with its own configuration, supported account types, and capabilities — "),
              createVNode("strong", null, "each new LFI a TPP onboards requires its own validation period"),
              createTextVNode(". TPPs should expect to spend time confirming that a newly integrated LFI behaves as expected for their use case before directing live customer traffic to it. This should be factored into integration and release planning. ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/production/live-proving.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const liveProving = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-9b443fbf"]]);
export {
  liveProving as default
};
