import { _ as __unplugin_components_0 } from "./FieldMapEndpointPage-CfyJQrW-.js";
import { mergeProps, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "./EndpointPage-BtLubFvo.js";
import "@unhead/vue";
import "vite-ssg";
import "axios";
import "vue-router";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_FieldMapEndpointPage = __unplugin_components_0;
  _push(ssrRenderComponent(_component_FieldMapEndpointPage, mergeProps({
    slug: "bank-data-sharing__accounts--id--direct-debits",
    eyebrow: "LFI · Banking · Data Sharing · Field Mapping",
    title: "Get Direct Debits for an Account — Field Mapping",
    version: "v2.1",
    method: "GET",
    path: "/accounts/{accountId}/direct-debits",
    resource: "/accounts/{}/direct-debits",
    ozone: "GET /accounts/{accountId}/direct-debits",
    standards: "GET /accounts/{AccountId}/direct-debits"
  }, _attrs), null, _parent));
}
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/v2.1/banking/data-sharing/field-mapping/accounts-AccountId-direct-debits.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const accountsAccountIdDirectDebits = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  accountsAccountIdDirectDebits as default
};
