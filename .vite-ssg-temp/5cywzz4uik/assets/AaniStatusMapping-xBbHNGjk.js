import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs } from "vue/server-renderer";
import { u as useMermaidDiagram } from "./APIFlowViewer-C5xJUdUs.js";
const mermaidDefinition$1 = `
sequenceDiagram
    participant Hub as API Hub
    participant LFI as LFI
    participant FTS as UAEFTS

    Note over LFI: POST /payments returned 201 {Status: Pending}
    LFI->>FTS: Submit pacs.008

    alt ACK then CB900
        FTS-->>LFI: ACK (technical acceptance, Status remains Pending, no PATCH)
        FTS-->>LFI: CB900 Debit Confirmation
        LFI->>Hub: PATCH /payment-log/{paymentId} {Status: AcceptedCreditSettlementCompleted}
        Hub-->>LFI: 200
    else NAK received
        FTS-->>LFI: NAK (reason code)
        LFI->>Hub: PATCH /payment-log/{paymentId} {Status: Rejected, Code: FTS.AC06}
        Hub-->>LFI: 200
    end
`;
const _sfc_main$1 = {
  __name: "FtsStatusMapping",
  __ssrInlineRender: true,
  setup(__props) {
    useMermaidDiagram(mermaidDefinition$1, "fts-status-mapping-diagram");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "diagram-wrapper" }, _attrs))}><div class="mermaid-container"></div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/api-flows/FtsStatusMapping.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const mermaidDefinition = `
sequenceDiagram
    participant Hub as API Hub
    participant LFI as LFI
    participant AANI as AANI

    Note over LFI: POST /payments returned 201 {Status: Pending}
    LFI->>AANI: Submit pacs.008

    alt Positive Account Verification Response
        AANI-->>LFI: pacs.002 accepted + paymentTransactionId
        LFI->>Hub: PATCH /payment-log/{paymentId} {Status: AcceptedWithoutPosting}
        Hub-->>LFI: 200
    else pacs.002 rejection
        AANI-->>LFI: pacs.002 rejected
        LFI->>Hub: PATCH /payment-log/{paymentId} {Status: Rejected, Code: AANI.AM04}
        Hub-->>LFI: 200
    end
`;
const _sfc_main = {
  __name: "AaniStatusMapping",
  __ssrInlineRender: true,
  setup(__props) {
    useMermaidDiagram(mermaidDefinition, "aani-status-mapping-diagram");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "diagram-wrapper" }, _attrs))}><div class="mermaid-container"></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/api-flows/AaniStatusMapping.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _,
  _sfc_main$1 as a
};
