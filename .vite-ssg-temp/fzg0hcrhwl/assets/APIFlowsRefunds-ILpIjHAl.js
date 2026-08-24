import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs } from "vue/server-renderer";
import { u as useMermaidDiagram } from "./APIFlowViewer-C5xJUdUs.js";
const mermaidDefinition = `
sequenceDiagram
    participant TPP as TPP
    participant Hub as API Hub
    participant LFI as LFI

    Note over TPP: Payment Consent already created and<br/> authorised with ReadRefundAccount permission

    Note over TPP: Create Client Assertion
    TPP->>+Hub: POST /token (client_credentials, scope=confirmation-of-payee)
    Hub-->>-TPP: {access_token}

    TPP->>+Hub: GET /payment-consents/{ConsentId}/refund
    Hub->>+LFI: GET /payment-consents/{consentId}/refund 
    LFI-->>-Hub: { refundAccount }
    Hub-->>-TPP: 200 { refundAccount } (application/jwt)

    Note over TPP: Decode JWS, extract<br/>RefundAccount IBAN and name

    Note over TPP: Initiate refund payment using<br/>RefundAccount as creditor
`;
const _sfc_main = {
  __name: "APIFlowsRefunds",
  __ssrInlineRender: true,
  setup(__props) {
    useMermaidDiagram(mermaidDefinition, "refunds-diagram");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "diagram-wrapper" }, _attrs))}><div class="mermaid-container"></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/api-flows/APIFlowsRefunds.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
