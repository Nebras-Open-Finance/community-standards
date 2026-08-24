import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs } from "vue/server-renderer";
import { u as useMermaidDiagram } from "./APIFlowViewer-C5xJUdUs.js";
const mermaidDefinition = `
sequenceDiagram
    participant TPP as TPP
    participant Hub as API Hub
    participant LFI as LFI

    Note over TPP: Consent created with Webhook.IsActive: true<br/>and a registered Webhook.Url
    TPP->>Hub: POST /payments
    Hub->>LFI: POST /payments
    LFI-->>Hub: 201 {PaymentId}
    Hub-->>TPP: 201 {PaymentId, Status: Pending}

    Note over LFI: LFI executes via intra-bank, AANI, or UAEFTS
    LFI->>Hub: PATCH /payment-log/{paymentId} {Status: AcceptedWithoutPosting}

    Note over TPP,Hub: Option 1 — Event notification (push)
    Hub-->>TPP: POST Webhook.Url {Status: AcceptedWithoutPosting}
    TPP-->>Hub: 202 Accepted

    Note over TPP,Hub: Option 2 — Polling (pull)
    TPP->>Hub: GET /payments/{paymentId}
    Hub->>LFI: GET /payments/{paymentId}
    LFI-->>Hub: 200 {Status: AcceptedWithoutPosting}
    Hub-->>TPP: 200 {Status: AcceptedWithoutPosting}
`;
const _sfc_main = {
  __name: "TPPPaymentStatus",
  __ssrInlineRender: true,
  setup(__props) {
    useMermaidDiagram(mermaidDefinition, "tpp-payment-status-diagram");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "diagram-wrapper" }, _attrs))}><div class="mermaid-container"></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/api-flows/TPPPaymentStatus.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
