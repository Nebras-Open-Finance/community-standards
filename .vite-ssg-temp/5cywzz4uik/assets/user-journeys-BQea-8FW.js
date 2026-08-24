import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { W as WireframePreview, _ as _sfc_main$1, E as ExampleJourneys } from "./ExampleJourneys-BLRMvvTl.js";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "./COPPiiBlock-AuBTObSJ.js";
import "./ConsentSingleInstantPayment-BmbvVWg6.js";
import "./ConsentAuthLayout-JnFOe0gl.js";
import "./useSharedState-qc0PNim7.js";
import "./PaymentConsentPermissionsText-DEZshb6t.js";
import "./DirhamAmount-BJSUbugi.js";
import "./EditableJson-BkohSb0c.js";
import "yaml";
import "./editor-scenarios-CAtfwFsI.js";
import "./ImageViewer-DmHTopUf.js";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const _sfc_main = {
  __name: "user-journeys",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdProse = __unplugin_components_4;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-1baba072><section class="ed-doc__hero" data-v-1baba072><div class="ed-doc__inner" data-v-1baba072><div class="ed-doc__eyebrow" data-v-1baba072><span class="ed-doc__eyebrow-dash" data-v-1baba072></span> Banking · Confirmation of Payee · UX </div><h1 class="ed-doc__title" data-v-1baba072> Confirmation of Payee — User Experience <span class="ed-doc__read" data-v-1baba072>2 min read</span></h1><p class="ed-doc__lede" data-v-1baba072> You must display the <strong data-v-1baba072>Confirmation of Payee</strong> result faithfully aligned with the demo and examples below. You may not suppress, reorder, or alter the result as this could mislead the customer about whether the payee name matched. The customer must always be able to make an informed decision about whether to proceed with the payment based on the result shown. </p><p class="ed-doc__lede ed-doc__lede--tight" data-v-1baba072> Your CoP screen must be submitted as part of <strong data-v-1baba072>CX certification</strong> prior to production. </p></div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "interactive-demo",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Interactive Demo",
        title: "Edit the consent and watch the previews respond",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(WireframePreview, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Edit the <code data-v-1baba072${_scopeId2}>message.Data</code> fields returned by the LFI and see to change the signed JWS is embedded inside the <code data-v-1baba072${_scopeId2}>domestic_payment_pii</code> creditor block and watch the Consent and Authorisation page previews update live. `);
                } else {
                  return [
                    createTextVNode(" Edit the "),
                    createVNode("code", null, "message.Data"),
                    createTextVNode(" fields returned by the LFI and see to change the signed JWS is embedded inside the "),
                    createVNode("code", null, "domestic_payment_pii"),
                    createTextVNode(" creditor block and watch the Consent and Authorisation page previews update live. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(WireframePreview),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Edit the "),
                  createVNode("code", null, "message.Data"),
                  createTextVNode(" fields returned by the LFI and see to change the signed JWS is embedded inside the "),
                  createVNode("code", null, "domestic_payment_pii"),
                  createTextVNode(" creditor block and watch the Consent and Authorisation page previews update live. ")
                ]),
                _: 1
              }),
              createVNode(_sfc_main$1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "example-journeys",
        num: "02",
        color: "var(--at-blue-deep, #1d4ed8)",
        eyebrow: "Examples",
        title: "Sample user journeys",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(ExampleJourneys, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(ExampleJourneys)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
};
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/v2.2-rc1/banking/confirmation-of-payee/user-journeys.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const userJourneys = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1baba072"]]);
export {
  userJourneys as default
};
