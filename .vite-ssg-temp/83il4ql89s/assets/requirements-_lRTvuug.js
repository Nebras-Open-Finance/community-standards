import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs } from "vue/server-renderer";
const next = false;
const prev = false;
const _sfc_main = {
  __name: "requirements",
  __ssrInlineRender: true,
  setup(__props, { expose: __expose }) {
    const frontmatter = { "next": false, "prev": false };
    __expose({ frontmatter });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "markdown-body" }, _attrs))}><p>🕒 <strong>2 minute read</strong></p><h1>ATMs — Requirements</h1><p>::: info Coming soon This page will detail the requirements for implementing the ATM API. :::</p></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/v2.2-rc1/banking/atms/requirements.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default,
  next,
  prev
};
