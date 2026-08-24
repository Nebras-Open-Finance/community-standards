import { defineComponent, ref, onUnmounted, useSSRContext } from "vue";
import { ssrRenderAttr, ssrInterpolate, ssrRenderTeleport, ssrIncludeBooleanAttr, ssrRenderClass, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "../main.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ImageViewer",
  __ssrInlineRender: true,
  props: {
    src: {},
    alt: { default: "" },
    figmaUrl: { default: "" },
    caption: { default: "" }
  },
  setup(__props) {
    const isOpen = ref(false);
    const scale = ref(1);
    const panX = ref(0);
    const panY = ref(0);
    const isDragging = ref(false);
    const dragStart = ref({ x: 0, y: 0, panX: 0, panY: 0 });
    function close() {
      isOpen.value = false;
      resetView();
      document.removeEventListener("keydown", handleKey);
      stopDrag();
    }
    function resetView() {
      scale.value = 1;
      panX.value = 0;
      panY.value = 0;
    }
    function handleKey(e) {
      if (e.key === "Escape") close();
      if (e.key === "+" || e.key === "=") zoomIn();
      if (e.key === "-") zoomOut();
    }
    function zoomIn() {
      scale.value = Math.min(+(scale.value + 0.25).toFixed(2), 4);
    }
    function zoomOut() {
      const next = Math.max(+(scale.value - 0.25).toFixed(2), 1);
      scale.value = next;
      if (next === 1) {
        panX.value = 0;
        panY.value = 0;
      }
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
      _push(`<!--[--><figure class="iv" data-v-23a3b010><div class="iv__frame" data-v-23a3b010><img${ssrRenderAttr("src", __props.src)}${ssrRenderAttr("alt", __props.alt)} class="iv__thumb" data-v-23a3b010><span class="iv__cue" aria-hidden="true" data-v-23a3b010>Click to expand <span data-v-23a3b010>↗</span></span></div>`);
      if (__props.caption || __props.alt) {
        _push(`<figcaption class="iv__caption" data-v-23a3b010>${ssrInterpolate(__props.caption || __props.alt)}</figcaption>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</figure>`);
      ssrRenderTeleport(_push, (_push2) => {
        if (isOpen.value) {
          _push2(`<div class="iv-overlay" role="dialog" aria-modal="true"${ssrRenderAttr("aria-label", __props.alt || "Image viewer")} data-v-23a3b010><div class="iv-modal" data-v-23a3b010><header class="iv-toolbar" data-v-23a3b010><div class="iv-toolbar__left" data-v-23a3b010><button class="iv-btn"${ssrIncludeBooleanAttr(scale.value <= 1) ? " disabled" : ""} title="Zoom out (-)" aria-label="Zoom out" data-v-23a3b010>−</button><span class="iv-zoom" data-v-23a3b010>${ssrInterpolate(Math.round(scale.value * 100))}%</span><button class="iv-btn"${ssrIncludeBooleanAttr(scale.value >= 4) ? " disabled" : ""} title="Zoom in (+)" aria-label="Zoom in" data-v-23a3b010>+</button><button class="iv-btn-text" data-v-23a3b010>Reset</button></div><div class="iv-toolbar__center" data-v-23a3b010><span class="iv-toolbar__eyebrow" data-v-23a3b010>Image</span>`);
          if (__props.alt || __props.caption) {
            _push2(`<span class="iv-toolbar__title" data-v-23a3b010>${ssrInterpolate(__props.caption || __props.alt)}</span>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div><div class="iv-toolbar__right" data-v-23a3b010>`);
          if (__props.figmaUrl) {
            _push2(`<a${ssrRenderAttr("href", __props.figmaUrl)} target="_blank" rel="noopener noreferrer" class="iv-btn-text iv-btn-text--accent" data-v-23a3b010>Figma <span aria-hidden="true" data-v-23a3b010>↗</span></a>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`<button class="iv-btn-text" data-v-23a3b010>Download <span aria-hidden="true" data-v-23a3b010>↓</span></button><button class="iv-btn iv-btn--close" title="Close (Esc)" aria-label="Close" data-v-23a3b010>✕</button></div></header><div class="${ssrRenderClass([{ "is-dragging": isDragging.value }, "iv-canvas"])}" style="${ssrRenderStyle({ cursor: scale.value > 1 ? isDragging.value ? "grabbing" : "grab" : "default" })}" data-v-23a3b010><img${ssrRenderAttr("src", __props.src)}${ssrRenderAttr("alt", __props.alt)} class="iv-img" style="${ssrRenderStyle({ transform: `translate(${panX.value}px, ${panY.value}px) scale(${scale.value})` })}" draggable="false" data-v-23a3b010></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/ImageViewer.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ImageViewer = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-23a3b010"]]);
export {
  ImageViewer as I
};
