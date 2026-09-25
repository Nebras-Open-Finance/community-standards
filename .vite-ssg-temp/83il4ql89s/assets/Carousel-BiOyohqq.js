import { defineComponent, ref, computed, onUnmounted, useSSRContext } from "vue";
import { ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderTeleport, ssrRenderClass, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "../main.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Carousel",
  __ssrInlineRender: true,
  props: {
    images: {}
  },
  setup(__props) {
    const props = __props;
    const currentIndex = ref(0);
    const total = computed(() => {
      var _a;
      return ((_a = props.images) == null ? void 0 : _a.length) ?? 0;
    });
    const current = computed(() => {
      var _a;
      return (_a = props.images) == null ? void 0 : _a[currentIndex.value];
    });
    function next() {
      if (total.value === 0) return;
      currentIndex.value = (currentIndex.value + 1) % total.value;
    }
    function prev() {
      if (total.value === 0) return;
      currentIndex.value = (currentIndex.value - 1 + total.value) % total.value;
    }
    const isOpen = ref(false);
    const scale = ref(1);
    const panX = ref(0);
    const panY = ref(0);
    const isDragging = ref(false);
    const dragStart = ref({ x: 0, y: 0, panX: 0, panY: 0 });
    function resetView() {
      scale.value = 1;
      panX.value = 0;
      panY.value = 0;
    }
    function close() {
      isOpen.value = false;
      resetView();
      document.removeEventListener("keydown", handleKey);
      stopDrag();
    }
    function handleKey(e) {
      if (e.key === "Escape") close();
      if (e.key === "+" || e.key === "=") zoomIn();
      if (e.key === "-") zoomOut();
      if (e.key === "ArrowRight" && currentIndex.value < total.value - 1) nextAndReset();
      if (e.key === "ArrowLeft" && currentIndex.value > 0) prevAndReset();
    }
    function zoomIn() {
      scale.value = Math.min(+(scale.value + 0.25).toFixed(2), 4);
    }
    function zoomOut() {
      const n = Math.max(+(scale.value - 0.25).toFixed(2), 1);
      scale.value = n;
      if (n === 1) {
        panX.value = 0;
        panY.value = 0;
      }
    }
    function nextAndReset() {
      next();
      resetView();
    }
    function prevAndReset() {
      prev();
      resetView();
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
      var _a, _b, _c;
      _push(`<!--[-->`);
      if (total.value) {
        _push(`<figure class="crs" data-v-fc569b6e>`);
        if ((_a = current.value) == null ? void 0 : _a.title) {
          _push(`<figcaption class="crs__title" data-v-fc569b6e>${ssrInterpolate(current.value.title)}</figcaption>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="crs__frame" data-v-fc569b6e>`);
        if ((_b = current.value) == null ? void 0 : _b.src) {
          _push(`<img${ssrRenderAttr("src", current.value.src)}${ssrRenderAttr("alt", current.value.alt || "")} class="crs__img" data-v-fc569b6e>`);
        } else {
          _push(`<!---->`);
        }
        if ((_c = current.value) == null ? void 0 : _c.tagline) {
          _push(`<span class="crs__tagline" data-v-fc569b6e>${current.value.tagline ?? ""}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<span class="crs__cue" aria-hidden="true" data-v-fc569b6e>Click to expand <span data-v-fc569b6e>↗</span></span></div><div class="crs__controls" data-v-fc569b6e><span class="crs__step" data-v-fc569b6e>Step ${ssrInterpolate(currentIndex.value + 1)} / ${ssrInterpolate(total.value)}</span><div class="crs__nav" data-v-fc569b6e><button class="crs-step-btn"${ssrIncludeBooleanAttr(currentIndex.value === 0) ? " disabled" : ""} data-v-fc569b6e><span aria-hidden="true" data-v-fc569b6e>←</span> Previous</button><button class="crs-step-btn"${ssrIncludeBooleanAttr(currentIndex.value >= total.value - 1) ? " disabled" : ""} data-v-fc569b6e>Next <span aria-hidden="true" data-v-fc569b6e>→</span></button></div></div></figure>`);
      } else {
        _push(`<!---->`);
      }
      ssrRenderTeleport(_push, (_push2) => {
        var _a2, _b2, _c2;
        if (isOpen.value) {
          _push2(`<div class="crs-overlay" role="dialog" aria-modal="true"${ssrRenderAttr("aria-label", ((_a2 = current.value) == null ? void 0 : _a2.title) || "Image carousel")} data-v-fc569b6e><div class="crs-modal" data-v-fc569b6e><header class="crs-toolbar" data-v-fc569b6e><div class="crs-toolbar__left" data-v-fc569b6e><button class="crs-btn"${ssrIncludeBooleanAttr(currentIndex.value <= 0) ? " disabled" : ""} title="Previous (←)" aria-label="Previous" data-v-fc569b6e>‹</button><span class="crs-step-pill" data-v-fc569b6e>${ssrInterpolate(currentIndex.value + 1)} / ${ssrInterpolate(total.value)}</span><button class="crs-btn"${ssrIncludeBooleanAttr(currentIndex.value >= total.value - 1) ? " disabled" : ""} title="Next (→)" aria-label="Next" data-v-fc569b6e>›</button></div><div class="crs-toolbar__center" data-v-fc569b6e><span class="crs-toolbar__eyebrow" data-v-fc569b6e>Step ${ssrInterpolate(currentIndex.value + 1)}</span>`);
          if ((_b2 = current.value) == null ? void 0 : _b2.title) {
            _push2(`<span class="crs-toolbar__title" data-v-fc569b6e>${ssrInterpolate(current.value.title)}</span>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div><div class="crs-toolbar__right" data-v-fc569b6e><button class="crs-btn"${ssrIncludeBooleanAttr(scale.value <= 1) ? " disabled" : ""} title="Zoom out (-)" aria-label="Zoom out" data-v-fc569b6e>−</button><span class="crs-zoom" data-v-fc569b6e>${ssrInterpolate(Math.round(scale.value * 100))}%</span><button class="crs-btn"${ssrIncludeBooleanAttr(scale.value >= 4) ? " disabled" : ""} title="Zoom in (+)" aria-label="Zoom in" data-v-fc569b6e>+</button><button class="crs-btn-text" data-v-fc569b6e>Reset</button><button class="crs-btn-text" data-v-fc569b6e>Download <span aria-hidden="true" data-v-fc569b6e>↓</span></button><button class="crs-btn crs-btn--close" title="Close (Esc)" aria-label="Close" data-v-fc569b6e>✕</button></div></header><div class="${ssrRenderClass([{ "is-dragging": isDragging.value }, "crs-canvas"])}" style="${ssrRenderStyle({ cursor: scale.value > 1 ? isDragging.value ? "grabbing" : "grab" : "default" })}" data-v-fc569b6e>`);
          if ((_c2 = current.value) == null ? void 0 : _c2.src) {
            _push2(`<img${ssrRenderAttr("src", current.value.src)}${ssrRenderAttr("alt", current.value.alt || "")} class="crs-img" style="${ssrRenderStyle({ transform: `translate(${panX.value}px, ${panY.value}px) scale(${scale.value})` })}" draggable="false" data-v-fc569b6e>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/Carousel.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __unplugin_components_5 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-fc569b6e"]]);
export {
  __unplugin_components_5 as _
};
