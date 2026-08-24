import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs } from "vue/server-renderer";
import { u as useMermaidDiagram } from "./APIFlowViewer-C5xJUdUs.js";
const mermaidDefinition = `
sequenceDiagram
    participant TPP as TPP
    participant A as API Hub (LFI A)
    participant B as API Hub (LFI B)
    participant AR as LFI A
    participant BR as LFI B

    Note over TPP,B: Step 1 — Token request for each LFI (in parallel)
    par
        TPP->>+A: POST /token (client_credentials, scope=products)
        A-->>-TPP: access_token A
    and
        TPP->>+B: POST /token (client_credentials, scope=products)
        B-->>-TPP: access_token B
    end

    Note over TPP,BR: Step 2 — GET /products from each LFI (in parallel)
    par
        TPP->>+A: GET /products
        A->>+AR: GET /products
        AR->>-A: 200 { Data: [ Products ] }
        A-->>-TPP: 200 { Data: [ Products ] }
    and
        TPP->>+B: GET /products
        B->>+BR: GET /products
        BR->>-B: 200 { Data: [ Products ] }
        B-->>-TPP: 200 { Data: [ Products ] }
    end

    Note over TPP: Aggregate & present all products to user

    alt User selects Apply Now
        Note over TPP: Use ApplicationUri, PhoneNumber,<br/>Email, or Description
    else User requests contact from LFI B
        TPP->>+B: POST /leads
        B->>+BR: POST /leads
        BR->>-B: 201 { LeadId }
        B-->>-TPP: 201 { LeadId }
    end
`;
const _sfc_main = {
  __name: "APIFlowsProductsLeads",
  __ssrInlineRender: true,
  setup(__props) {
    useMermaidDiagram(mermaidDefinition, "products-leads-diagram");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "diagram-wrapper" }, _attrs))}><div class="mermaid-container"></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/api-flows/APIFlowsProductsLeads.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
