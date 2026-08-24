import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs } from "vue/server-renderer";
import { u as useMermaidDiagram } from "./APIFlowViewer-C5xJUdUs.js";
const mermaidDefinition = `
sequenceDiagram
    participant TPP as TPP
    participant Hub as API Hub
    participant LFI as LFI

    Note over TPP: Collect quote inputs from customer
    Note over TPP: Construct Client Assertion

    TPP->>+Hub: POST /token (client_credentials, scope=insurance)
    Hub-->>-TPP: 200 {access_token}

    TPP->>+Hub: POST /{type}-insurance-quotes
    Hub->>+LFI: POST /{type}-insurance-quotes
    LFI-->>-Hub: 201 {data: [{QuoteId, ...}]}
    Hub-->>-TPP: 201 {data: [{QuoteId, ...}]}

    Note over TPP: Customer selects a quote
    Note over TPP: PATCH includes Subscription.Webhook (optional)

    TPP->>+Hub: PATCH /{type}-insurance-quotes/{QuoteId} (Accept Quote)
    Hub->>+LFI: PATCH /{type}-insurance-quotes/{QuoteId}
    LFI-->>-Hub: 204 No Content
    Hub-->>-TPP: 204 No Content

    LFI->>Hub: PATCH /insurance-quote-log/{logId} (ApplicationPending)
    Hub-->>TPP: Webhook event (ApplicationPending)

    Note over LFI: LFI hosts KYC, payment, document delivery

    TPP->>+Hub: POST /{type}-insurance-policies (QuoteId)
    Hub->>+LFI: POST /{type}-insurance-policies
    LFI-->>-Hub: 201 Created
    Hub-->>-TPP: 201 Created

    LFI->>Hub: PATCH /insurance-quote-log/{logId} (PolicyIssued + InsurancePolicyId)
    Hub-->>TPP: Webhook event (PolicyIssued)
    LFI->>Hub: PATCH /insurance-quote-log/{logId} (Completed)
    Hub-->>TPP: Webhook event (Completed)
`;
const _sfc_main = {
  __name: "APIFlowsInsuranceQuotationLFILed",
  __ssrInlineRender: true,
  setup(__props) {
    useMermaidDiagram(mermaidDefinition, "insurance-quotation-lfi-led-diagram");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "diagram-wrapper" }, _attrs))}><div class="mermaid-container"></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/api-flows/APIFlowsInsuranceQuotationLFILed.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
