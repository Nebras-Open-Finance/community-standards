import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { defineComponent, computed, withCtx, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { useRoute } from "vue-router";
import { b as paymentPermissionCombinations, g as getAuthPaymentPermissionText, c as getPaymentPermissionText } from "./PaymentConsentPermissionsText-DEZshb6t.js";
import { _ as _export_sfc } from "../main.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ServiceInitiationPermissionText",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const isLfi = computed(() => route.path.includes("/lfi-api-hub/"));
    const pageLabel = computed(() => isLfi.value ? "Authorization Page" : "Consent Page");
    const rows = computed(
      () => paymentPermissionCombinations.map((permissions) => ({
        permissions,
        text: isLfi.value ? getAuthPaymentPermissionText(permissions) : getPaymentPermissionText(permissions)
      }))
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdProse = __unplugin_components_4;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_EdProse, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`The table below describes the text shown to users on the ${ssrInterpolate(pageLabel.value)}.`);
          } else {
            return [
              createTextVNode("The table below describes the text shown to users on the " + toDisplayString(pageLabel.value) + ".", 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="sip__wrap" data-v-731e2436><table class="sip" data-v-731e2436><thead data-v-731e2436><tr data-v-731e2436><th data-v-731e2436>Permissions</th><th data-v-731e2436>Text shown to user on ${ssrInterpolate(pageLabel.value)}</th></tr></thead><tbody data-v-731e2436><!--[-->`);
      ssrRenderList(rows.value, (combo, i) => {
        _push(`<tr data-v-731e2436><td data-v-731e2436><!--[-->`);
        ssrRenderList(combo.permissions, (p) => {
          _push(`<code class="sip__tag" data-v-731e2436>${ssrInterpolate(p)}</code>`);
        });
        _push(`<!--]--></td><td data-v-731e2436>${ssrInterpolate(combo.text)}</td></tr>`);
      });
      _push(`<!--]--></tbody></table></div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/permissions/ServiceInitiationPermissionText.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __unplugin_components_3 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-731e2436"]]);
export {
  __unplugin_components_3 as _
};
