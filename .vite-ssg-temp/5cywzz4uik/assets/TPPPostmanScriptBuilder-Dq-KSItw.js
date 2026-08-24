import { defineComponent, useId, computed, mergeProps, useSSRContext, reactive, ref, withCtx, createVNode, createTextVNode } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderAttr, ssrRenderSlot, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { _ as _export_sfc, C as CURRENT_VERSION } from "../main.mjs";
import { _ as __unplugin_components_0 } from "./FormInput-BzoE1TtY.js";
import { useRoute } from "vue-router";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "InfoTooltip",
  __ssrInlineRender: true,
  props: {
    iconColor: { default: "var(--at-navy-deep)" },
    iconSize: { default: 18 }
  },
  setup(__props) {
    const props = __props;
    const tooltipId = `info-tip-${useId()}`;
    const iconSizePx = computed(
      () => typeof props.iconSize === "number" ? `${props.iconSize}px` : String(props.iconSize)
    );
    const iconStyle = computed(() => ({
      width: iconSizePx.value,
      height: iconSizePx.value
    }));
    const strokeWidth = computed(() => {
      const n = Number(props.iconSize) || 16;
      if (n <= 16) return 1.25;
      if (n <= 24) return 1.5;
      if (n <= 32) return 1.65;
      return 1.8;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<span${ssrRenderAttrs(mergeProps({
        class: "it",
        "aria-describedby": tooltipId
      }, _attrs))} data-v-720d1095><span class="it__icon" role="img" aria-hidden="true" style="${ssrRenderStyle(iconStyle.value)}" data-v-720d1095><svg${ssrRenderAttr("width", iconSizePx.value)}${ssrRenderAttr("height", iconSizePx.value)} viewBox="0 0 16 16" fill="none" data-v-720d1095><circle${ssrRenderAttr("stroke", __props.iconColor)} cx="8" cy="8" r="6.75"${ssrRenderAttr("stroke-width", strokeWidth.value)} vector-effect="non-scaling-stroke" data-v-720d1095></circle><path d="M8 4.5V4.7"${ssrRenderAttr("stroke", __props.iconColor)}${ssrRenderAttr("stroke-width", strokeWidth.value)} stroke-linecap="round" vector-effect="non-scaling-stroke" data-v-720d1095></path><path d="M8 7V11"${ssrRenderAttr("stroke", __props.iconColor)}${ssrRenderAttr("stroke-width", strokeWidth.value)} stroke-linecap="round" vector-effect="non-scaling-stroke" data-v-720d1095></path></svg></span><span${ssrRenderAttr("id", tooltipId)} class="it__panel" role="tooltip" data-v-720d1095>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</span></span>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/forms/InfoTooltip.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __unplugin_components_1 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-720d1095"]]);
const MODEL_BANK_DISCOVERY = "https://auth1.altareq1.sandbox.apihub.openfinance.ae/.well-known/openid-configuration";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "TPPPostmanScriptBuilder",
  __ssrInlineRender: true,
  setup(__props) {
    const ROLES = ["BDSP (Bank Data Sharing)", "BSIP (Payments / Service Initiation)"];
    const route = useRoute();
    const currentVersion = computed(() => {
      const match = route.path.match(/\/(v\d+\.\d+)\//);
      return (match == null ? void 0 : match[1]) ?? CURRENT_VERSION;
    });
    const formData = reactive({
      client_id: "",
      roles: [],
      redirect_uri: "",
      transport_key_id: "",
      signing_key_id: "",
      discovery_uri: MODEL_BANK_DISCOVERY,
      key_file_name: "",
      key_content: ""
    });
    const complete = ref(false);
    const uploadError = ref("");
    const discoveryError = ref("");
    const isDownloading = ref(false);
    function setField(key, payload) {
      formData[key] = payload.data ?? "";
      if (key === "discovery_uri") discoveryError.value = "";
    }
    function showError(key) {
      if (!complete.value) return "";
      if (key === "client_id" && !formData.client_id) return "Field is required.";
      if (key === "role" && formData.roles.length === 0) return "One role is required.";
      if (key === "redirect_uri") {
        if (!formData.redirect_uri) return "Field is required.";
        try {
          new URL(formData.redirect_uri);
        } catch {
          return "Must be a valid URI.";
        }
      }
      if (key === "transport_key_id" && !formData.transport_key_id) return "Field is required.";
      if (key === "signing_key_id" && !formData.signing_key_id) return "Field is required.";
      if (key === "discovery_uri") {
        if (!formData.discovery_uri) return "Field is required.";
        if (!/^https:\/\/auth1\.[a-zA-Z0-9-]{1,15}\.(sandbox|preprod|uat)\.apihub\.openfinance\.ae\/\.well-known\/openid-configuration$/.test(formData.discovery_uri))
          return "Must match: https://auth1.[LFI-CODE].(sandbox|preprod).apihub.openfinance.ae/.well-known/openid-configuration";
      }
      if (key === "key_upload" && !formData.key_file_name) return "Signing .key file is required.";
      return "";
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_FormInput = __unplugin_components_0;
      const _component_InfoTooltip = __unplugin_components_1;
      _push(`<form${ssrRenderAttrs(mergeProps({ class: "psb" }, _attrs))} data-v-b0ef5d7a><div class="psb__field" data-v-b0ef5d7a><div class="psb__row" data-v-b0ef5d7a>`);
      _push(ssrRenderComponent(_component_FormInput, {
        placeholder: "Client ID",
        name: "client_id",
        input: formData.client_id,
        error: !!showError("client_id"),
        onOutput: (v) => setField("client_id", v)
      }, null, _parent));
      _push(ssrRenderComponent(_component_InfoTooltip, { class: "psb__tooltip" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<strong data-v-b0ef5d7a${_scopeId}>Client ID</strong> — use the client_id from your Trust Framework application detail page. See: <a href="/tech/tpp-standards/trust-framework/creating-an-application#your-client-id" data-v-b0ef5d7a${_scopeId}>Trust Framework client_id</a>`);
          } else {
            return [
              createVNode("strong", null, "Client ID"),
              createTextVNode(" — use the client_id from your Trust Framework application detail page. See: "),
              createVNode("a", { href: "/tech/tpp-standards/trust-framework/creating-an-application#your-client-id" }, "Trust Framework client_id")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (showError("client_id") === "") {
        _push(`<p class="psb__hint" data-v-b0ef5d7a> Looks like: <code data-v-b0ef5d7a>https://rp.sandbox.directory.openfinance.ae/openid_relying_party/c6fb03a0-…</code></p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<p class="psb__error" aria-live="polite" data-v-b0ef5d7a>${ssrInterpolate(showError("client_id"))}</p></div><div class="psb__field" data-v-b0ef5d7a><div class="psb__label-row" data-v-b0ef5d7a><span class="psb__label" data-v-b0ef5d7a>Client roles</span>`);
      _push(ssrRenderComponent(_component_InfoTooltip, { class: "psb__tooltip" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<strong data-v-b0ef5d7a${_scopeId}>Client roles</strong> — pick the roles assigned to your app (BDSP for data sharing, BSIP for payments / service initiation). See: <a href="/tech/tpp-standards/trust-framework/roles" data-v-b0ef5d7a${_scopeId}>roles reference</a>`);
          } else {
            return [
              createVNode("strong", null, "Client roles"),
              createTextVNode(" — pick the roles assigned to your app (BDSP for data sharing, BSIP for payments / service initiation). See: "),
              createVNode("a", { href: "/tech/tpp-standards/trust-framework/roles" }, "roles reference")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="psb__chips" data-v-b0ef5d7a><!--[-->`);
      ssrRenderList(ROLES, (opt) => {
        _push(`<button type="button" class="${ssrRenderClass([{
          "psb-chip--active": formData.roles.includes(opt),
          "psb-chip--error": !!showError("role")
        }, "psb-chip"])}" data-v-b0ef5d7a>${ssrInterpolate(opt)}</button>`);
      });
      _push(`<!--]--></div><p class="psb__error" aria-live="polite" data-v-b0ef5d7a>${ssrInterpolate(showError("role"))}</p></div><div class="psb__field" data-v-b0ef5d7a><div class="psb__row" data-v-b0ef5d7a>`);
      _push(ssrRenderComponent(_component_FormInput, {
        placeholder: "Redirect URI",
        name: "redirect_uri",
        input: formData.redirect_uri,
        error: !!showError("redirect_uri"),
        onOutput: (v) => setField("redirect_uri", v)
      }, null, _parent));
      _push(ssrRenderComponent(_component_InfoTooltip, { class: "psb__tooltip" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<strong data-v-b0ef5d7a${_scopeId}>Redirect URI</strong> — must exactly match a redirect URI registered on your Trust Framework application. See: <a href="/tech/tpp-standards/trust-framework/redirect-uri" data-v-b0ef5d7a${_scopeId}>redirect URI guidance</a>`);
          } else {
            return [
              createVNode("strong", null, "Redirect URI"),
              createTextVNode(" — must exactly match a redirect URI registered on your Trust Framework application. See: "),
              createVNode("a", { href: "/tech/tpp-standards/trust-framework/redirect-uri" }, "redirect URI guidance")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><p class="psb__error" aria-live="polite" data-v-b0ef5d7a>${ssrInterpolate(showError("redirect_uri"))}</p></div><div class="psb__field" data-v-b0ef5d7a><div class="psb__row" data-v-b0ef5d7a>`);
      _push(ssrRenderComponent(_component_FormInput, {
        placeholder: "Client Transport Key ID",
        name: "transport_key_id",
        input: formData.transport_key_id,
        error: !!showError("transport_key_id"),
        onOutput: (v) => setField("transport_key_id", v)
      }, null, _parent));
      _push(ssrRenderComponent(_component_InfoTooltip, { class: "psb__tooltip" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<strong data-v-b0ef5d7a${_scopeId}>Transport key ID</strong> — the kid from your transport certificate details in the Trust Framework. See: <a href="/tech/tpp-standards/trust-framework/certificates" data-v-b0ef5d7a${_scopeId}>mTLS certificates</a>`);
          } else {
            return [
              createVNode("strong", null, "Transport key ID"),
              createTextVNode(" — the kid from your transport certificate details in the Trust Framework. See: "),
              createVNode("a", { href: "/tech/tpp-standards/trust-framework/certificates" }, "mTLS certificates")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><p class="psb__error" aria-live="polite" data-v-b0ef5d7a>${ssrInterpolate(showError("transport_key_id"))}</p></div><div class="psb__field" data-v-b0ef5d7a><div class="psb__row" data-v-b0ef5d7a>`);
      _push(ssrRenderComponent(_component_FormInput, {
        placeholder: "Client Signing Key ID",
        name: "signing_key_id",
        input: formData.signing_key_id,
        error: !!showError("signing_key_id"),
        onOutput: (v) => setField("signing_key_id", v)
      }, null, _parent));
      _push(ssrRenderComponent(_component_InfoTooltip, { class: "psb__tooltip" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<strong data-v-b0ef5d7a${_scopeId}>Signing key ID</strong> — the kid from your signing certificate details in the Trust Framework. See: <a href="/tech/tpp-standards/trust-framework/certificates#finding-your-key-id-kid" data-v-b0ef5d7a${_scopeId}>finding your key ID (kid)</a>`);
          } else {
            return [
              createVNode("strong", null, "Signing key ID"),
              createTextVNode(" — the kid from your signing certificate details in the Trust Framework. See: "),
              createVNode("a", { href: "/tech/tpp-standards/trust-framework/certificates#finding-your-key-id-kid" }, "finding your key ID (kid)")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><p class="psb__error" aria-live="polite" data-v-b0ef5d7a>${ssrInterpolate(showError("signing_key_id"))}</p></div><div class="psb__field" data-v-b0ef5d7a><div class="psb__label-row" data-v-b0ef5d7a><span class="psb__label" data-v-b0ef5d7a>Signing private key</span></div><label class="${ssrRenderClass([{ "psb-upload--error": showError("key_upload") || uploadError.value }, "psb-upload"])}" data-v-b0ef5d7a><span class="psb-upload__btn" data-v-b0ef5d7a>Choose file</span><span class="psb-upload__name" data-v-b0ef5d7a>${ssrInterpolate(formData.key_file_name || "No file chosen")}</span><input type="file" accept=".key,.pem,.txt" class="psb-upload__input" data-v-b0ef5d7a></label><p class="psb__hint" data-v-b0ef5d7a>Accepted: <code data-v-b0ef5d7a>.key</code>, <code data-v-b0ef5d7a>.pem</code> or <code data-v-b0ef5d7a>.txt</code> private key files.</p>`);
      if (!showError("key_upload") && !uploadError.value) {
        _push(`<p class="psb__hint psb__hint--strong" data-v-b0ef5d7a> While we accept your signing private key here to bootstrap sandbox testing, this is for testing only. In production, never share private keys — they must stay inside your environment. See <a href="/policy/secure-management" data-v-b0ef5d7a>Secure Management of Keys and Credentials</a>. </p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<p class="psb__error" aria-live="polite" data-v-b0ef5d7a>${ssrInterpolate(showError("key_upload") || uploadError.value)}</p></div><div class="psb__field" data-v-b0ef5d7a><div class="psb__row" data-v-b0ef5d7a>`);
      _push(ssrRenderComponent(_component_FormInput, {
        placeholder: "LFI Discovery Endpoint",
        name: "discovery_uri",
        input: formData.discovery_uri,
        error: !!showError("discovery_uri") || !!discoveryError.value,
        onOutput: (v) => setField("discovery_uri", v)
      }, null, _parent));
      _push(ssrRenderComponent(_component_InfoTooltip, { class: "psb__tooltip" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<strong data-v-b0ef5d7a${_scopeId}>LFI Discovery URL</strong> — the .well-known endpoint of the target LFI; the model bank URL is prefilled. See: <a href="/tech/tpp-standards/trust-framework/well-known" data-v-b0ef5d7a${_scopeId}>The .well-known Endpoint</a>`);
          } else {
            return [
              createVNode("strong", null, "LFI Discovery URL"),
              createTextVNode(" — the .well-known endpoint of the target LFI; the model bank URL is prefilled. See: "),
              createVNode("a", { href: "/tech/tpp-standards/trust-framework/well-known" }, "The .well-known Endpoint")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (showError("discovery_uri") === "") {
        _push(`<p class="psb__hint" data-v-b0ef5d7a> Model bank: <code data-v-b0ef5d7a>https://auth1.altareq1.sandbox.apihub.openfinance.ae/.well-known/openid-configuration</code><br data-v-b0ef5d7a> Pre-prod: <code data-v-b0ef5d7a>https://auth1.<mark data-v-b0ef5d7a>[LFI CODE]</mark>.preprod.apihub.openfinance.ae/.well-known/openid-configuration</code></p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<p class="psb__error" aria-live="polite" data-v-b0ef5d7a>${ssrInterpolate(showError("discovery_uri") || discoveryError.value)}</p></div><div class="psb__actions" data-v-b0ef5d7a><button type="submit" class="psb-cta"${ssrIncludeBooleanAttr(isDownloading.value) ? " disabled" : ""} data-v-b0ef5d7a><svg class="psb-cta__logo" viewBox="0 0 24 24" aria-hidden="true" data-v-b0ef5d7a><path fill="currentColor" d="M13.527.099C6.955-.744.942 3.9.099 10.473c-.843 6.572 3.8 12.584 10.373 13.428 6.573.843 12.587-3.801 13.428-10.374C24.744 6.955 20.101.943 13.527.099zm2.471 7.485a.855.855 0 0 0-.593.25l-4.453 4.453-.307-.307-.643-.643c4.389-4.376 5.18-4.418 5.996-3.753zm-4.863 4.861l4.44-4.44a.62.62 0 1 1 .847.903l-4.699 4.125-.588-.588zm.33.694l-1.1.238a.06.06 0 0 1-.067-.032.06.06 0 0 1 .01-.073l.645-.645.512.512zm-2.803-.459l1.172-1.172.879.878-1.979.426a.074.074 0 0 1-.085-.039.072.072 0 0 1 .013-.093zm-3.646 6.058a.076.076 0 0 1-.069-.083.077.077 0 0 1 .022-.046h.002l.946-.946 1.222 1.222-2.123-.147zm2.425-1.256a.227.227 0 0 0-.117.061l-.32.319-1.314-1.314.32-.319c.16-.16.42-.16.58 0l.851.851a.227.227 0 0 0 0 .402zm6.272-3.124-2.79 2.79c-.063.063-.16.072-.232.022l-.582-.412 4.012-4.012c.099.108.165.245.187.392.04.408-.215.799-.595 1.22zm3.491-3.328l-1.578 1.395-1.083-1.083 1.397-1.58c.27-.31.737-.34 1.043-.072.31.27.34.737.072 1.043z" data-v-b0ef5d7a></path></svg><span data-v-b0ef5d7a>${ssrInterpolate(isDownloading.value ? "Preparing…" : "Download Postman collection")}</span><span class="psb-cta__arrow" aria-hidden="true" data-v-b0ef5d7a>↗</span></button></div><p class="psb__version" data-v-b0ef5d7a> This collection is for API version <strong data-v-b0ef5d7a>${ssrInterpolate(currentVersion.value)}</strong>. Switch versions via the navigation header. See the <a${ssrRenderAttr("href", `/tech/tpp-standards/${currentVersion.value}/getting-started/postman`)} data-v-b0ef5d7a>Postman guide</a> for details. </p></form>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/forms/TPPPostmanScriptBuilder.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __unplugin_components_3 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b0ef5d7a"]]);
export {
  __unplugin_components_3 as _
};
