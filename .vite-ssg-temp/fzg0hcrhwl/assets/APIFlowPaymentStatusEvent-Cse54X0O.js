import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs } from "vue/server-renderer";
import { u as useMermaidDiagram } from "./APIFlowViewer-C5xJUdUs.js";
const mermaidDefinition = `
sequenceDiagram
    participant TPP as TPP
    participant Hub as API Hub
    participant LFI as LFI

    Note over TPP: Consent with (subscription.Webhook.URL<br/> & subscription.Webhook.IsActive: true)
    TPP->>+Hub: POST /payments
    Hub->>LFI: POST /payments
    LFI-->>Hub: 201 {PaymentId}
    Hub-->>-TPP: 201 {PaymentId, Status: Pending}

    LFI-->>+Hub: PATCH /payment-log/{paymentId} {Status: AcceptedWithoutPosting}
    Hub-->>-TPP: POST (Event - Payment Initiation Request) {Status: AcceptedWithoutPosting}
`;
const _sfc_main = {
  __name: "APIFlowPaymentStatusEvent",
  __ssrInlineRender: true,
  setup(__props) {
    useMermaidDiagram(mermaidDefinition, "payment-status-event-diagram");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "diagram-wrapper" }, _attrs))}><div class="mermaid-container"></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/api-flows/APIFlowPaymentStatusEvent.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
