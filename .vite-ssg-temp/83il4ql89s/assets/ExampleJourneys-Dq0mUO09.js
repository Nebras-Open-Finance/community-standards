import { _ as __unplugin_components_2, a as __unplugin_components_1, b as __unplugin_components_1$1 } from "./COPPiiBlock-AuBTObSJ.js";
import { _ as __unplugin_components_0 } from "./ConsentAuthLayout-JnFOe0gl.js";
import { mergeProps, withCtx, createVNode, useSSRContext, ref, unref } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "../main.mjs";
import { _ as __unplugin_components_2$1 } from "./EditableJson-BkohSb0c.js";
import { u as useSharedState } from "./useSharedState-qc0PNim7.js";
import { c as confirmationOfPayeeScenarios } from "./editor-scenarios-CAtfwFsI.js";
import { I as ImageViewer } from "./ImageViewer-DmHTopUf.js";
const _sfc_main$2 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  const _component_ConsentAuthLayout = __unplugin_components_0;
  const _component_ConsentSIPCOP = __unplugin_components_1;
  const _component_AuthorizationSIPCOP = __unplugin_components_2;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "wf-frame" }, _attrs))} data-v-8104ae5a>`);
  _push(ssrRenderComponent(_component_ConsentAuthLayout, null, {
    consent: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_ConsentSIPCOP, null, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_ConsentSIPCOP)
        ];
      }
    }),
    auth: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_AuthorizationSIPCOP, null, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_AuthorizationSIPCOP)
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/v2.1/banking/confirmation-of-payee/_shared/WireframePreview.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const WireframePreview = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-8104ae5a"]]);
const _sfc_main$1 = {
  __name: "InteractiveDemo",
  __ssrInlineRender: true,
  setup(__props) {
    useSharedState();
    const myCustomValidator = (value) => {
      if (value.NameMatchIndicator === "ConfirmationOfPayee.Yes" && value.MaskedName || value.NameMatchIndicator === "ConfirmationOfPayee.Partial" && !value.MaskedName || value.NameMatchIndicator === "ConfirmationOfPayee.No" && !value.MaskedName) {
        return "MaskedName must be returned when NameMatchIndicator is Partial or No, and omitted when it is Yes";
      }
      return null;
    };
    const scenarios = confirmationOfPayeeScenarios();
    const initialFormData = ref(scenarios.find((s) => s.id === "match-partial").data);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EditableJson = __unplugin_components_2$1;
      const _component_COPPiiBlock = __unplugin_components_1$1;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_EditableJson, {
        spec: "/openapi/v2.1/standards/uae-confirmation-of-payee-openapi.yaml",
        "schema-name": "AEAccountConfirmationResponseProperties",
        "initial-data": initialFormData.value,
        "custom-validator": myCustomValidator,
        scenarios: unref(scenarios),
        "scenarios-label": "Match results",
        "state-field": "copData",
        label: "message.Data",
        description: "Confirmation Response",
        "endpoint-href": "/tech/tpp-standards/v2.1/banking/confirmation-of-payee/open-api/confirmation",
        "endpoint-label": "View confirmation endpoint"
      }, null, _parent));
      _push(ssrRenderComponent(_component_COPPiiBlock, null, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/v2.1/banking/confirmation-of-payee/_shared/InteractiveDemo.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_ImageViewer = ImageViewer;
  _push(`<!--[--><h3>Example 1 — Single Instant Payment — ConfirmationOfPayee.Yes</h3>`);
  _push(ssrRenderComponent(_component_ImageViewer, {
    src: "/images/user-experience/confirmation-of-payee/1.png",
    alt: "confirmation-of-payee"
  }, null, _parent));
  _push(`<h3>Example 2 — Single Instant Payment — ConfirmationOfPayee.Partial</h3>`);
  _push(ssrRenderComponent(_component_ImageViewer, {
    src: "/images/user-experience/confirmation-of-payee/2.png",
    alt: "confirmation-of-payee"
  }, null, _parent));
  _push(`<h3>Example 3 — Single Instant Payment — ConfirmationOfPayee.No</h3>`);
  _push(ssrRenderComponent(_component_ImageViewer, {
    src: "/images/user-experience/confirmation-of-payee/3.png",
    alt: "confirmation-of-payee"
  }, null, _parent));
  _push(`<h3>Example 4 — Variable On Demand (Multi Creditor) — ConfirmationOfPayee.Yes</h3>`);
  _push(ssrRenderComponent(_component_ImageViewer, {
    src: "/images/user-experience/confirmation-of-payee/4.png",
    alt: "confirmation-of-payee"
  }, null, _parent));
  _push(`<h3>Example 5 — Variable On Demand (Multi Creditor) — ConfirmationOfPayee.Yes + one without ConfirmationOfPayee</h3>`);
  _push(ssrRenderComponent(_component_ImageViewer, {
    src: "/images/user-experience/confirmation-of-payee/5.png",
    alt: "confirmation-of-payee"
  }, null, _parent));
  _push(`<h3>Example 6 — Variable On Demand (Multi Creditor) — ConfirmationOfPayee.Yes + ConfirmationOfPayee.Partial</h3>`);
  _push(ssrRenderComponent(_component_ImageViewer, {
    src: "/images/user-experience/confirmation-of-payee/6.png",
    alt: "confirmation-of-payee"
  }, null, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/v2.1/banking/confirmation-of-payee/_shared/ExampleJourneys.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ExampleJourneys = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  ExampleJourneys as E,
  WireframePreview as W,
  _sfc_main$1 as _
};
