import { defineComponent, computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass, ssrRenderSlot } from "vue/server-renderer";
import { useHead } from "@unhead/vue";
import { _ as _export_sfc } from "../main.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "EndpointPage",
  __ssrInlineRender: true,
  props: {
    eyebrow: {},
    title: {},
    version: {},
    method: {},
    path: {},
    description: {}
  },
  setup(__props) {
    const props = __props;
    const metaDescription = computed(() => {
      if (props.description) return props.description;
      const ver = props.version ? `${props.version} ` : "";
      return `${props.title}: ${props.method} ${props.path}. ${props.eyebrow} endpoint in the UAE Open Finance ${ver}standards, with request and response schema, examples and validation rules.`;
    });
    useHead({
      meta: [
        { name: "description", content: metaDescription },
        { property: "og:description", content: metaDescription },
        { name: "twitter:description", content: metaDescription }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-api-endpoint" }, _attrs))} data-v-c7378379><section class="ed-api-endpoint__hero" data-v-c7378379><div class="ed-api-endpoint__hero-inner" data-v-c7378379><div class="ed-api-endpoint__hero-label" data-v-c7378379><span class="ed-api-endpoint__hero-label-dash" data-v-c7378379></span> ${ssrInterpolate(__props.eyebrow)}</div><h1 class="ed-api-endpoint__hero-title" data-v-c7378379>${ssrInterpolate(__props.title)} `);
      if (__props.version) {
        _push(`<span class="ed-api-endpoint__hero-badge" data-v-c7378379>${ssrInterpolate(__props.version)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</h1><div class="ed-api-endpoint__hero-meta" data-v-c7378379><span class="${ssrRenderClass(["http-badge", `http-${__props.method.toLowerCase()}`])}" data-v-c7378379>${ssrInterpolate(__props.method)}</span><code class="ed-api-endpoint__hero-path" data-v-c7378379>${ssrInterpolate(__props.path)}</code></div>`);
      ssrRenderSlot(_ctx.$slots, "hero", {}, null, _push, _parent);
      _push(`</div></section><section class="ed-api-endpoint__body" data-v-c7378379><div class="ed-api-endpoint__body-inner" data-v-c7378379>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/EndpointPage.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __unplugin_components_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c7378379"]]);
export {
  __unplugin_components_0 as _
};
