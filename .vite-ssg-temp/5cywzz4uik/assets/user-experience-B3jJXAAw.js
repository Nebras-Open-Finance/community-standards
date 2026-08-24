import { _ as __unplugin_components_2, a as __unplugin_components_3$1 } from "./InsuranceManagementConnections-BJxXdiw8.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { resolveComponent, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vue-router";
import "./useSharedState-qc0PNim7.js";
import "./insurancePolicyStatus-7keZa3ks.js";
import "./DirhamAmount-BJSUbugi.js";
import "./formatDate-CaaKrjgT.js";
import "vite-ssg";
import "axios";
import "@unhead/vue";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_EdSectionBand = __unplugin_components_3;
  const _component_EdProse = __unplugin_components_4;
  const _component_ClientOnly = resolveComponent("ClientOnly");
  const _component_InsuranceManagementConnections = __unplugin_components_2;
  const _component_InsuranceConnectionsEditor = __unplugin_components_3$1;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-efc6dbf8><section class="ed-doc__hero" data-v-efc6dbf8><div class="ed-doc__inner" data-v-efc6dbf8><div class="ed-doc__eyebrow" data-v-efc6dbf8><span class="ed-doc__eyebrow-dash" data-v-efc6dbf8></span> LFI · CMI · Insurance Data Sharing · UX </div><h1 class="ed-doc__title" data-v-efc6dbf8> Insurance Data Sharing — User Experience <span class="ed-doc__read" data-v-efc6dbf8>2 min read</span></h1><p class="ed-doc__lede" data-v-efc6dbf8> The LFI Consent Management Interface for Insurance Data Sharing consents. Customers see all third party providers connected to their insurance policies, the data permissions they have granted, and can cancel a connection at any time. </p><p class="ed-doc__lede ed-doc__lede--tight" data-v-efc6dbf8> While you may adapt visual elements such as colour palette, fonts, and styling to align with your brand, you must not alter the meaning, clarity, or completeness of the consent management content. The representation of <strong data-v-efc6dbf8>AlTareq</strong> — including logos, naming, and action buttons — must be preserved. Your Consent Management Interface must be submitted as part of <strong data-v-efc6dbf8>CX certification</strong> prior to production, and any material changes to a production CMI must be re-submitted for review and approval. </p></div></section>`);
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "live-ui-preview",
    num: "01",
    color: "var(--at-teal)",
    eyebrow: "Live UI Preview",
    title: "LFI Connections — Insurance Data Sharing view",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` The component below shows the LFI Connections page for insurance consents. Tap any consent card to open its details and manage it. Each consent shows the policies of a given insurance type the customer has shared with a third party provider. `);
            } else {
              return [
                createTextVNode(" The component below shows the LFI Connections page for insurance consents. Tap any consent card to open its details and manage it. Each consent shows the policies of a given insurance type the customer has shared with a third party provider. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_ClientOnly, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="ed-doc__previews" data-v-efc6dbf8${_scopeId2}><figure class="ed-doc__preview" data-v-efc6dbf8${_scopeId2}>`);
              _push3(ssrRenderComponent(_component_InsuranceManagementConnections, { perspective: "lfi" }, null, _parent3, _scopeId2));
              _push3(`</figure></div>`);
            } else {
              return [
                createVNode("div", { class: "ed-doc__previews" }, [
                  createVNode("figure", { class: "ed-doc__preview" }, [
                    createVNode(_component_InsuranceManagementConnections, { perspective: "lfi" })
                  ])
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 class="ed-doc__sub" data-v-efc6dbf8${_scopeId}>Configure simulated consents</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Use the editor below to add, remove, and adjust the simulated insurance consents. Every change is reflected immediately in the preview above. `);
            } else {
              return [
                createTextVNode(" Use the editor below to add, remove, and adjust the simulated insurance consents. Every change is reflected immediately in the preview above. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_InsuranceConnectionsEditor, null, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" The component below shows the LFI Connections page for insurance consents. Tap any consent card to open its details and manage it. Each consent shows the policies of a given insurance type the customer has shared with a third party provider. ")
            ]),
            _: 1
          }),
          createVNode(_component_ClientOnly, null, {
            default: withCtx(() => [
              createVNode("div", { class: "ed-doc__previews" }, [
                createVNode("figure", { class: "ed-doc__preview" }, [
                  createVNode(_component_InsuranceManagementConnections, { perspective: "lfi" })
                ])
              ])
            ]),
            _: 1
          }),
          createVNode("h3", { class: "ed-doc__sub" }, "Configure simulated consents"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Use the editor below to add, remove, and adjust the simulated insurance consents. Every change is reflected immediately in the preview above. ")
            ]),
            _: 1
          }),
          createVNode(_component_InsuranceConnectionsEditor)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/v2.2-rc1/consent-management-interface/insurance-data-sharing/user-experience.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const userExperience = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-efc6dbf8"]]);
export {
  userExperience as default
};
