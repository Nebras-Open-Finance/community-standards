import { defineComponent, computed, ref, onMounted, onBeforeUnmount, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderStyle, ssrRenderAttr, ssrRenderList } from "vue/server-renderer";
import { _ as _export_sfc } from "../main.mjs";
const PAGE_W = 1056;
const PAGE_H = 816;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CertificateDoc",
  __ssrInlineRender: true,
  props: {
    variant: { default: "lfi" }
  },
  setup(__props) {
    const props = __props;
    const isLfi = computed(() => props.variant !== "tpp");
    const recipientPh = computed(
      () => isLfi.value ? "Licensed Financial Institution Name" : "Third-Party Provider Name"
    );
    const declaration = computed(
      () => isLfi.value ? "a Licensed Financial Institution of the UAE Open Finance ecosystem, has satisfied all certification and live-proving requirements of the <b>AlTareq</b> trust framework, has <b>successfully exited TPP Buddying</b>, and is hereby authorised to operate commercially in production — opening its Open Finance services to <b>all authorised Third-Party Providers</b> and <b>all of its customers</b>." : "a Third-Party Provider of the UAE Open Finance ecosystem, has satisfied all onboarding and certification requirements of the <b>AlTareq</b> trust framework, has <b>successfully completed Production Proving with its buddy LFIs</b>, and is hereby authorised to operate commercially in production — connecting to <b>all authorised Licensed Financial Institutions</b> and serving <b>all of its customers</b>."
    );
    const gates = computed(
      () => isLfi.value ? ["Functional Certification", "Consent & CX Conformance", "Performance & Stress tested", "Penetration Tested"] : ["Functional Certification", "Consent & CX Conformance", "FAPI OIDF certified", "Penetration Tested"]
    );
    const heroTitle = computed(() => isLfi.value ? "LFI go-live certificate" : "TPP go-live certificate");
    const heroSub = computed(
      () => isLfi.value ? "Generate the Nebras-signed certificate confirming a Licensed Financial Institution has completed every AlTareq certification stage and exited TPP buddying — authorised to open its Open Finance services to all authorised TPPs and all of its customers. Fill in the highlighted fields, then save as PDF." : "Generate the Nebras-signed certificate confirming a Third-Party Provider has completed every AlTareq certification stage and Production Proving with its buddy LFIs — authorised to connect to all Licensed Financial Institutions and serve all of its customers. Fill in the highlighted fields, then save as PDF."
    );
    const rootEl = ref();
    const scrollEl = ref();
    const scale = ref(1);
    let ro;
    function fit() {
      var _a;
      const avail = ((_a = scrollEl.value) == null ? void 0 : _a.clientWidth) ?? PAGE_W;
      scale.value = Math.min(avail / PAGE_W, 1);
    }
    const reservedHeight = computed(() => `${Math.round(PAGE_H * scale.value)}px`);
    function initFields() {
      const root = rootEl.value;
      if (!root) return;
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
      const d = /* @__PURE__ */ new Date();
      const dateEl = root.querySelector(".dblock .sig");
      if (dateEl) dateEl.textContent = `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
      root.querySelectorAll("[contenteditable]").forEach((el) => {
        const check = () => {
          var _a;
          el.classList.toggle("ph", ((_a = el.textContent) == null ? void 0 : _a.trim()) === "");
        };
        el.addEventListener("input", check);
        el.addEventListener("blur", () => {
          var _a;
          if (((_a = el.textContent) == null ? void 0 : _a.trim()) === "") el.innerHTML = "";
          check();
        });
        el.addEventListener("paste", (e) => {
          var _a;
          e.preventDefault();
          const t = (((_a = e.clipboardData) == null ? void 0 : _a.getData("text")) ?? "").replace(/\s+/g, " ");
          document.execCommand("insertText", false, t);
        });
        el.addEventListener("keydown", (e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            el.blur();
          }
        });
      });
      const sigEl = root.querySelector(".sblock:not(.dblock) .sig");
      const nameEl = root.querySelector(".sblock:not(.dblock) .sname");
      if (sigEl && nameEl) {
        const mirror = (from, to) => {
          from.addEventListener("input", () => {
            var _a;
            to.textContent = from.textContent;
            to.classList.toggle("ph", ((_a = to.textContent) == null ? void 0 : _a.trim()) === "");
          });
        };
        mirror(sigEl, nameEl);
        mirror(nameEl, sigEl);
      }
    }
    onMounted(() => {
      var _a;
      fit();
      initFields();
      if (typeof ResizeObserver !== "undefined" && scrollEl.value) {
        ro = new ResizeObserver(fit);
        ro.observe(scrollEl.value);
      }
      if ((_a = document.fonts) == null ? void 0 : _a.ready) document.fonts.ready.then(fit);
    });
    onBeforeUnmount(() => ro == null ? void 0 : ro.disconnect());
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        ref_key: "rootEl",
        ref: rootEl,
        class: "cdoc"
      }, _attrs))} data-v-29e7a61c><section class="cdoc__hero cdoc-noprint" data-v-29e7a61c><div class="cdoc__hero-inner" data-v-29e7a61c><div class="cdoc__hero-label" data-v-29e7a61c><span class="cdoc__hero-dash" data-v-29e7a61c></span> Nebras · UAE Open Finance </div><h1 class="cdoc__hero-title" data-v-29e7a61c>${ssrInterpolate(heroTitle.value)}</h1><p class="cdoc__hero-sub" data-v-29e7a61c>${ssrInterpolate(heroSub.value)}</p></div></section><div class="cdoc__bar cdoc-noprint" data-v-29e7a61c><div class="cdoc__bar-inner" data-v-29e7a61c><span class="cdoc__live" data-v-29e7a61c><span class="cdoc__live-dot" data-v-29e7a61c></span>Live</span><span class="cdoc__hint" data-v-29e7a61c> Click any highlighted field to type. The signature renders as a handwritten signature and stays in sync with the printed signatory name below it. </span><div class="cdoc__bar-actions" data-v-29e7a61c><button type="button" data-v-29e7a61c>Clear fields</button><button type="button" class="pri" data-v-29e7a61c>⎙ Save as PDF</button></div></div></div><div class="cdoc__area cdoc-noprint-bg" data-v-29e7a61c><div class="cdoc__scroll" style="${ssrRenderStyle({ height: reservedHeight.value })}" data-v-29e7a61c><div class="cdoc__stage" style="${ssrRenderStyle({ transform: `scale(${scale.value})` })}" data-v-29e7a61c><section id="cdoc-page" class="page" data-v-29e7a61c><div class="frame" data-v-29e7a61c><span class="wm" data-v-29e7a61c>N</span><div class="head" data-v-29e7a61c><div class="brand" data-v-29e7a61c><span class="mark" data-v-29e7a61c></span><span data-v-29e7a61c><span class="bname" data-v-29e7a61c>Nebras</span><span class="btag" data-v-29e7a61c>Operator · UAE Open Finance</span></span></div></div><div class="body" data-v-29e7a61c><div class="eyebrow" data-v-29e7a61c><s data-v-29e7a61c></s>Commercial Go-Live Authorisation<s data-v-29e7a61c></s></div><h1 data-v-29e7a61c>Certificate of Commercial Go-Live</h1><div class="conf" data-v-29e7a61c>This is to certify that</div><div class="lfi ph" contenteditable="true"${ssrRenderAttr("data-ph", recipientPh.value)} data-v-29e7a61c></div><p class="decl" data-v-29e7a61c>${declaration.value ?? ""}</p><div class="gate" data-v-29e7a61c><div class="glist" data-v-29e7a61c><!--[-->`);
      ssrRenderList(gates.value, (g, i) => {
        _push(`<div class="gi" data-v-29e7a61c><span class="tick" data-v-29e7a61c>✓</span><span class="gt" data-v-29e7a61c>${ssrInterpolate(g)}</span></div>`);
      });
      _push(`<!--]--></div></div><div class="foot" data-v-29e7a61c><div class="sblock" data-v-29e7a61c><div class="sig" contenteditable="true" data-ph="Type name to sign" data-v-29e7a61c>Jonathan Holman</div><div class="srule" data-v-29e7a61c></div><div class="sname" contenteditable="true" data-ph="Signatory name" data-v-29e7a61c>Jonathan Holman</div><div class="srole" contenteditable="true" data-ph="Signatory role" data-v-29e7a61c>Chief Executive Officer · Nebras</div></div><div class="seal" data-v-29e7a61c><s data-v-29e7a61c>Nebras</s><u data-v-29e7a61c>N</u><s data-v-29e7a61c>Go-Live</s><q data-v-29e7a61c>Authorised</q></div><div class="sblock dblock" data-v-29e7a61c><div class="sig" contenteditable="true" data-ph="Date of issue" data-v-29e7a61c>—</div><div class="srule" data-v-29e7a61c></div><div class="sname" data-v-29e7a61c>Date of Issue</div><div class="srole" data-v-29e7a61c>Effective from date of signature</div></div></div></div></div></section></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/certificates/CertificateDoc.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __unplugin_components_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-29e7a61c"]]);
export {
  __unplugin_components_0 as _
};
