import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs } from "vue/server-renderer";
import { u as useMermaidDiagram } from "./APIFlowViewer-C5xJUdUs.js";
const mermaidDefinition = `
sequenceDiagram
    participant TPP as TPP
    participant Hub as API Hub
    participant LFI as LFI (Ozone Connect)

    Note over TPP: Initial request — no page parameters
    TPP->>+Hub: GET /accounts/acc-001/transactions?fromBookingDateTime=...
    Hub->>+LFI: GET /accounts/acc-001/transactions?...&page=1&page-size=100
    LFI-->>-Hub: 200 {data + meta {totalPages 3}}
    Note over Hub: Convert meta to Links envelope
    Hub-->>-TPP: 200 {Data + Links {Self + First + Next page 2 + Last} + Meta}

    Note over TPP: Follow Links.Next
    TPP->>+Hub: GET Links.Next from page 1
    Hub->>+LFI: GET /accounts/acc-001/transactions?...&page=2&page-size=100
    LFI-->>-Hub: 200 {data + meta {totalPages 3}}
    Hub-->>-TPP: 200 {Data + Links {Self + First + Prev + Next page 3 + Last} + Meta}

    Note over TPP: Follow Links.Next
    TPP->>+Hub: GET Links.Next from page 2
    Hub->>+LFI: GET /accounts/acc-001/transactions?...&page=3&page-size=100
    LFI-->>-Hub: 200 {data + meta {totalPages 3}}
    Note over Hub: Last page reached — Links.Next omitted
    Hub-->>-TPP: 200 {Data + Links {Self + First + Prev + Last} + Meta}

    Note over TPP: Links.Next absent — loop terminates
`;
const _sfc_main = {
  __name: "APIFlowsPagination",
  __ssrInlineRender: true,
  setup(__props) {
    useMermaidDiagram(mermaidDefinition, "pagination-diagram");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "diagram-wrapper" }, _attrs))}><div class="mermaid-container"></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/api-flows/APIFlowsPagination.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
