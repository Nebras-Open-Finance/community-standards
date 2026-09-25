import { defineComponent, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs } from "vue/server-renderer";
import { u as useMermaidDiagram } from "./APIFlowViewer-BRjrby73.js";
const mermaidDefinition = `
sequenceDiagram
    participant PSU as Customer
    participant POS as Acceptance point
    participant ICP as BPIP
    participant Hub as API Hub
    participant LFI as LFI (Ozone Connect)

    Note over PSU,ICP: Outside the Open Finance boundary
    PSU->>POS: Presents thumbprint / face / palm
    POS->>ICP: Capture + amount + creditor details
    ICP->>ICP: Match, liveness, resolve to ICP user id

    Note over ICP,Hub: client_credentials — no consent, no PSU redirect
    ICP->>Hub: POST /token (BPIP role, biometric-payments scope)
    Hub-->>ICP: access_token

    ICP->>Hub: POST /biometric-payments-discovery (signed JWT: IcpUserId)
    Hub->>Hub: Read registration store (not proxied to LFI)
    Hub-->>ICP: 200 signed JWT {RegistrationStatus, PaymentInstrument,<br/>DiscoveryEndpointUrl, ResourceServerUrl}

    alt Not registered or suspended
        ICP-->>POS: BioPay unavailable — fall back
    else Registered
        ICP->>Hub: POST /biometric-payments at ResourceServerUrl<br/>(payload shaped to instrument)
        Hub->>Hub: Entitlement, schema, idempotency, resolve LFI
        Hub->>LFI: Proxied payment request
        LFI->>LFI: Fraud, risk, balance checks
        LFI-->>Hub: 201 {PaymentId}
        Hub-->>ICP: 201 {PaymentId, Status: Pending}
        ICP-->>POS: Accepted — payment pending

        Note over LFI: Executes on the registered payment rail<br/>(AANI, CBDC, Jaywan, ...)
        LFI->>Hub: PATCH /biometrics-payment-log/{id}<br/>{Status, RailReference}
        Hub-->>LFI: 204 No Content
        Hub->>ICP: Payment status event {PaymentId, Status}
        ICP-->>Hub: 202 Accepted

        opt Polling, or recovery from a lost 201
            ICP->>Hub: GET /biometric-payments/{PaymentId}
            ICP->>Hub: GET /biometric-payments?IdempotencyKey
            Hub-->>ICP: 200 {Status}
        end
    end
`;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "BpPaymentFlow",
  __ssrInlineRender: true,
  setup(__props) {
    useMermaidDiagram(
      mermaidDefinition,
      "biopay-payment-flow"
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "diagram-wrapper" }, _attrs))}><div class="mermaid-container"></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/biopay/BpPaymentFlow.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
