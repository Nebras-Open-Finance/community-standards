import mermaid from "mermaid";
import { ref, onMounted, defineComponent, onUnmounted, useSSRContext } from "vue";
import { o as onThemeChange } from "./useChartTheme-DtmiKid7.js";
import { ssrInterpolate, ssrRenderSlot, ssrRenderTeleport, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderClass, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "../main.mjs";
const DEFAULT_SEQUENCE = {
  diagramMarginX: 50,
  diagramMarginY: 30,
  actorMargin: 80,
  width: 200,
  height: 65,
  boxMargin: 20,
  messageMargin: 45,
  mirrorActors: false,
  useMaxWidth: true
};
function currentTheme() {
  if (typeof document === "undefined") return "default";
  return document.documentElement.classList.contains("dark") ? "dark" : "default";
}
function useMermaidDiagram(definition, idPrefix, config = { sequence: DEFAULT_SEQUENCE }) {
  const containerRef = ref(null);
  let renderCount = 0;
  async function render() {
    const container = containerRef.value;
    if (!container) return;
    mermaid.initialize({
      startOnLoad: false,
      theme: currentTheme(),
      securityLevel: "loose",
      ...config
    });
    const id = `${idPrefix}-${++renderCount}-${Math.random().toString(36).slice(2, 8)}`;
    try {
      const { svg } = await mermaid.render(id, definition);
      container.innerHTML = svg;
    } catch (err) {
      console.error(err);
      container.innerHTML = `
        <div style="color:#f87171; padding:60px; text-align:center; font-family:monospace; font-size:15px;">
          Failed to render Mermaid diagram — check console
        </div>`;
    }
  }
  onMounted(render);
  onThemeChange(() => {
    void render();
  });
  return { containerRef };
}
const BASE_SCALE = 2.75;
const BASE_Y = 0;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "APIFlowViewer",
  __ssrInlineRender: true,
  props: {
    title: { default: "API Flow" },
    downloadUrl: { default: "" },
    eyebrow: { default: "Sequence diagram" }
  },
  setup(__props) {
    const isOpen = ref(false);
    const scale = ref(BASE_SCALE);
    const panX = ref(0);
    const panY = ref(BASE_Y);
    const isDragging = ref(false);
    const dragStart = ref({ x: 0, y: 0, panX: 0, panY: 0 });
    function close() {
      isOpen.value = false;
      resetView();
      document.removeEventListener("keydown", handleKey);
      stopDrag();
    }
    function resetView() {
      scale.value = BASE_SCALE;
      panX.value = 0;
      panY.value = BASE_Y;
    }
    function handleKey(e) {
      if (e.key === "Escape") close();
      if (e.key === "+" || e.key === "=") zoomIn();
      if (e.key === "-") zoomOut();
    }
    function zoomIn() {
      scale.value = Math.min(+(scale.value + 0.25).toFixed(2), BASE_SCALE * 4);
    }
    function zoomOut() {
      scale.value = Math.max(+(scale.value - 0.25).toFixed(2), BASE_SCALE * 0.1);
    }
    function onMouseMove(e) {
      if (!isDragging.value) return;
      panX.value = dragStart.value.panX + (e.clientX - dragStart.value.x);
      panY.value = dragStart.value.panY + (e.clientY - dragStart.value.y);
    }
    function stopDrag() {
      isDragging.value = false;
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", stopDrag);
    }
    onUnmounted(() => {
      document.removeEventListener("keydown", handleKey);
      stopDrag();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><figure class="afv" data-v-2ea875a6><figcaption class="afv__caption" data-v-2ea875a6><span class="afv__eyebrow" data-v-2ea875a6><span class="afv__eyebrow-dash" data-v-2ea875a6></span> ${ssrInterpolate(__props.eyebrow)}</span><span class="afv__title" data-v-2ea875a6>${ssrInterpolate(__props.title)}</span><span class="afv__expand-cue" data-v-2ea875a6>Click to expand <span aria-hidden="true" data-v-2ea875a6>↗</span></span></figcaption><div class="afv__preview" data-v-2ea875a6>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></figure>`);
      ssrRenderTeleport(_push, (_push2) => {
        if (isOpen.value) {
          _push2(`<div class="afv-overlay" role="dialog" aria-modal="true"${ssrRenderAttr("aria-label", __props.title)} data-v-2ea875a6><div class="afv-modal" data-v-2ea875a6><header class="afv-toolbar" data-v-2ea875a6><div class="afv-toolbar__left" data-v-2ea875a6><button class="afv-btn"${ssrIncludeBooleanAttr(scale.value <= BASE_SCALE * 0.1) ? " disabled" : ""} title="Zoom out (-)" aria-label="Zoom out" data-v-2ea875a6>−</button><span class="afv-zoom" data-v-2ea875a6>${ssrInterpolate(Math.round(scale.value / BASE_SCALE * 100))}%</span><button class="afv-btn"${ssrIncludeBooleanAttr(scale.value >= BASE_SCALE * 4) ? " disabled" : ""} title="Zoom in (+)" aria-label="Zoom in" data-v-2ea875a6>+</button><button class="afv-btn-text" data-v-2ea875a6>Reset</button></div><div class="afv-toolbar__center" data-v-2ea875a6><span class="afv-toolbar__eyebrow" data-v-2ea875a6>${ssrInterpolate(__props.eyebrow)}</span><span class="afv-toolbar__title" data-v-2ea875a6>${ssrInterpolate(__props.title)}</span></div><div class="afv-toolbar__right" data-v-2ea875a6>`);
          if (__props.downloadUrl) {
            _push2(`<a${ssrRenderAttr("href", __props.downloadUrl)} download class="afv-btn-text afv-btn-text--accent" data-v-2ea875a6>Download <span aria-hidden="true" data-v-2ea875a6>↓</span></a>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`<button class="afv-btn afv-btn--close" title="Close (Esc)" aria-label="Close" data-v-2ea875a6>✕</button></div></header><div class="${ssrRenderClass([{ "is-dragging": isDragging.value }, "afv-canvas"])}" style="${ssrRenderStyle({ cursor: isDragging.value ? "grabbing" : "grab" })}" data-v-2ea875a6><div class="afv-canvas__content" style="${ssrRenderStyle({ transform: `translate(${panX.value}px, ${panY.value}px) scale(${scale.value})` })}" data-v-2ea875a6>`);
          ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent);
          _push2(`</div></div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/APIFlowViewer.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __unplugin_components_8 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2ea875a6"]]);
export {
  __unplugin_components_8 as _,
  useMermaidDiagram as u
};
