import { defineComponent, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { a as permissionGroups, p as permissionDescriptions } from "./permissionDescriptions-WkI-8pYN.js";
import { _ as _export_sfc } from "../main.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PermissionsReference",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "pr" }, _attrs))} data-v-90315b23><!--[-->`);
      ssrRenderList(unref(permissionGroups), (group) => {
        _push(`<section class="pr__group" data-v-90315b23><header class="pr__group-head" data-v-90315b23><span class="pr__eyebrow" data-v-90315b23><span class="pr__eyebrow-dash" data-v-90315b23></span> ${ssrInterpolate(group.label)}</span></header><div class="pr__table-wrap" data-v-90315b23><table class="pr__table" data-v-90315b23><thead data-v-90315b23><tr data-v-90315b23><th data-v-90315b23>Permission</th><th data-v-90315b23>What the user sees shared</th></tr></thead><tbody data-v-90315b23><!--[-->`);
        ssrRenderList(group.permissions, (perm) => {
          _push(`<tr data-v-90315b23><td data-v-90315b23><code data-v-90315b23>${ssrInterpolate(perm)}</code></td><td data-v-90315b23>${ssrInterpolate(unref(permissionDescriptions)[perm])}</td></tr>`);
        });
        _push(`<!--]--></tbody></table></div></section>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/permissions/PermissionsReference.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __unplugin_components_1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-90315b23"]]);
export {
  __unplugin_components_1 as _
};
