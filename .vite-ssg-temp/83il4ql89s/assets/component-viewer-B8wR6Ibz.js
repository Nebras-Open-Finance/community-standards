import { _ as __unplugin_components_4, a as __unplugin_components_3 } from "./ConsentSingleInstantPayment-BmbvVWg6.js";
import { _ as __unplugin_components_2, a as __unplugin_components_1 } from "./ConsentBankDataSharing-Dh6olf2f.js";
import { _ as __unplugin_components_0 } from "./ConsentAuthLayout-JnFOe0gl.js";
import { defineComponent, mergeProps, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "../main.mjs";
import "./useSharedState-qc0PNim7.js";
import "./PaymentConsentPermissionsText-DEZshb6t.js";
import "./DirhamAmount-BJSUbugi.js";
import "./formatDate-CaaKrjgT.js";
import "./permissionDescriptions-WkI-8pYN.js";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "component-viewer",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ConsentAuthLayout = __unplugin_components_0;
      const _component_ConsentBankDataSharing = __unplugin_components_1;
      const _component_AuthorizationBankDataSharing = __unplugin_components_2;
      const _component_ConsentSingleInstantPayment = __unplugin_components_3;
      const _component_AuthorizationSingleInstantPayment = __unplugin_components_4;
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "page" }, _attrs))} data-v-0d9df800><header class="page__hero" data-v-0d9df800><span class="page__eyebrow" data-v-0d9df800><span class="page__eyebrow-dash" data-v-0d9df800></span> Component review </span><h1 class="page__title" data-v-0d9df800>ConsentAuthLayout</h1><p class="page__lede" data-v-0d9df800> Re-review with realistic content slotted in. Left panel hosts a TPP consent screen mock; right panel hosts the matching LFI authorisation screen. The teal connector node + dashed rails sit between them on wide viewports to signal the cross-party authentication hop. </p></header><section class="page__body" data-v-0d9df800><h2 class="page__h2" data-v-0d9df800>Bank Data Sharing</h2><p class="page__note" data-v-0d9df800> Real <code data-v-0d9df800>ConsentBankDataSharing</code> + <code data-v-0d9df800>AuthorizationBankDataSharing</code> mocks slotted into the layout. Swap to <code data-v-0d9df800>ConsentSingleInstantPayment</code> / <code data-v-0d9df800>AuthorizationSingleInstantPayment</code> below to see the payment-flow variant. </p>`);
      _push(ssrRenderComponent(_component_ConsentAuthLayout, null, {
        consent: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_ConsentBankDataSharing, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_ConsentBankDataSharing)
            ];
          }
        }),
        auth: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_AuthorizationBankDataSharing, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_AuthorizationBankDataSharing)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<h2 class="page__h2" data-v-0d9df800>Single Instant Payment</h2><p class="page__note" data-v-0d9df800> Same chrome, different mock pair. Confirms the layout adapts to whatever content the slots receive. </p>`);
      _push(ssrRenderComponent(_component_ConsentAuthLayout, null, {
        consent: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_ConsentSingleInstantPayment, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_ConsentSingleInstantPayment)
            ];
          }
        }),
        auth: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_AuthorizationSingleInstantPayment, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_AuthorizationSingleInstantPayment)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section></main>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/_dev/component-viewer.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const componentViewer = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0d9df800"]]);
export {
  componentViewer as default
};
