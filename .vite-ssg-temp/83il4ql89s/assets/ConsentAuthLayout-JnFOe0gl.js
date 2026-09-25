import { defineComponent, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderSlot, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "../main.mjs";
const _imports_0 = "/images/journeys/ConsentPages/AlTareq.png";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ConsentAuthLayout",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "cal" }, _attrs))} data-v-e9a823f2><div class="cal__layout" data-v-e9a823f2><div class="cal__panel" data-v-e9a823f2><div class="cal__label cal__label--tpp" data-v-e9a823f2><span class="cal__label-eyebrow" data-v-e9a823f2>TPP</span><span class="cal__label-title" data-v-e9a823f2>Consent page</span></div><div class="cal__slot" data-v-e9a823f2>`);
      ssrRenderSlot(_ctx.$slots, "consent", {}, null, _push, _parent);
      _push(`</div></div><div class="cal__panel" data-v-e9a823f2><div class="cal__label cal__label--lfi" data-v-e9a823f2><span class="cal__label-eyebrow" data-v-e9a823f2>LFI</span><span class="cal__label-title" data-v-e9a823f2>Authorisation page</span></div><div class="cal__slot" data-v-e9a823f2>`);
      ssrRenderSlot(_ctx.$slots, "auth", {}, null, _push, _parent);
      _push(`</div></div></div><svg class="cal__arrow" viewBox="0 0 16 14" aria-hidden="true" data-v-e9a823f2><polygon points="0,0 16,7 0,14" style="${ssrRenderStyle({ "fill": "var(--at-teal-deep)" })}" data-v-e9a823f2></polygon></svg><div class="cal__hop" aria-hidden="true" data-v-e9a823f2><div class="cal__hop-node" data-v-e9a823f2><svg width="32" height="32" viewBox="0 0 70 70" fill="none" data-v-e9a823f2><g transform="translate(12.5, 9.5)" data-v-e9a823f2><path fill-rule="evenodd" clip-rule="evenodd" d="M19.5372 34.52C18.4771 33.7108 17.7917 32.4244 17.7917 30.9758C17.7917 28.5269 19.7504 26.5417 22.1667 26.5417C24.5829 26.5417 26.5417 28.5269 26.5417 30.9758C26.5417 32.4244 25.8563 33.7108 24.7962 34.52L26.5417 41.1245H17.7917L19.5372 34.52Z" fill="currentColor" data-v-e9a823f2></path><path fill-rule="evenodd" clip-rule="evenodd" d="M0 17.5H44.3333V50.1667H0V17.5ZM3.5 21V46.6667H40.8333V21H3.5Z" fill="currentColor" data-v-e9a823f2></path><path fill-rule="evenodd" clip-rule="evenodd" d="M8.75 13.4167C8.75 6.00685 14.7568 0 22.1667 0C29.5823 0 35.5833 6.04242 35.5833 13.4464H32.0833C32.0833 7.9638 27.6377 3.5 22.1667 3.5C16.6898 3.5 12.25 7.93984 12.25 13.4167V19.25H8.75V13.4167Z" fill="currentColor" data-v-e9a823f2></path></g></svg></div><span class="cal__hop-label" data-v-e9a823f2>Authentication</span></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/ConsentAuthLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __unplugin_components_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e9a823f2"]]);
export {
  __unplugin_components_0 as _,
  _imports_0 as a
};
