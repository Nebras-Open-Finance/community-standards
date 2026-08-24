import { _ as __unplugin_components_0, a as __unplugin_components_2, b as __unplugin_components_6$1, c as __unplugin_components_7$2 } from "./EdBackStrip-COkyNhGh.js";
import { _ as __unplugin_components_6 } from "./EdExample-DPMgFk_O.js";
import { _ as __unplugin_components_7$1, a as __unplugin_components_8 } from "./EdStages-NkJQJXq7.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { _ as __unplugin_components_0$1 } from "./EdHero-DawHPCxB.js";
import { defineComponent, mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { useHead } from "@unhead/vue";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "procurement",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({ title: "Procurement Policy · Internal Policies" });
    const sections = [
      { id: "overview", label: "Overview" },
      { id: "principles", label: "Principles & provisions" },
      { id: "governance", label: "Governance & Committee" },
      { id: "methods", label: "Methods & thresholds" },
      { id: "tender", label: "Tender lifecycle" },
      { id: "special", label: "Special arrangements" },
      { id: "contracts", label: "Contract management" },
      { id: "vendors", label: "Vendor management" },
      { id: "records", label: "Records & maintenance" }
    ];
    const meta = [
      { label: "Applies to", value: "All Nebras staff" },
      { label: "Classification", value: "Restricted" },
      { label: "Version", value: "0.1 · Aug 2025" }
    ];
    const keyNums = [
      { value: "500k", unit: "AED", label: "Procurement Committee oversight threshold" },
      { value: "20", unit: "%", label: "Variation cap before Committee review" },
      { value: "7", unit: "yr", label: "Critical record retention" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdBackStrip = __unplugin_components_0;
      const _component_EdHero = __unplugin_components_0$1;
      const _component_EdInPageNav = __unplugin_components_2;
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdBullets = __unplugin_components_5;
      const _component_EdNote = __unplugin_components_7;
      const _component_EdStages = __unplugin_components_7$1;
      const _component_EdStage = __unplugin_components_8;
      const _component_EdExample = __unplugin_components_6;
      const _component_EdRelatedCards = __unplugin_components_6$1;
      const _component_EdRelatedCard = __unplugin_components_7$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-page" }, _attrs))} data-v-84150726>`);
      _push(ssrRenderComponent(_component_EdBackStrip, {
        href: "/internal/policies/",
        text: "All policies"
      }, null, _parent));
      _push(ssrRenderComponent(_component_EdHero, {
        eyebrow: "Internal · Restricted",
        "eyebrow-color": "var(--at-navy)",
        title: "Procurement Policy",
        meta,
        lede: "This policy establishes the governing framework for all procurement and contracting activities within Nebras Open Finance, ensuring that procurement is conducted in a transparent, efficient, and controlled manner — consistently achieving <strong>value for money</strong> while supporting Nebras’s role in enabling the UAE Open Finance ecosystem.",
        "key-nums": keyNums
      }, null, _parent));
      _push(ssrRenderComponent(_component_EdInPageNav, { sections }, null, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "overview",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Overview",
        title: "Purpose and scope",
        lede: "This policy applies to all internal stakeholders and external parties engaged in the supply of goods, works, and services to Nebras, promoting transparent, competitive, and standardized processes aligned with organizational objectives.",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-84150726${_scopeId2}>This policy establishes the framework for procurement activities to ensure that the organization consistently achieves value for money. It promotes transparent, competitive, and standardized processes, while supporting efficient, ethical, and commercially sound procurement practices. It applies to all procurement of goods, works, and services undertaken by Nebras.</p>`);
                } else {
                  return [
                    createVNode("p", null, "This policy establishes the framework for procurement activities to ensure that the organization consistently achieves value for money. It promotes transparent, competitive, and standardized processes, while supporting efficient, ethical, and commercially sound procurement practices. It applies to all procurement of goods, works, and services undertaken by Nebras.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-84150726${_scopeId}>Excluded from scope</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-84150726${_scopeId2}>Employment-related contracts.</li><li data-v-84150726${_scopeId2}>Low-value purchases below defined thresholds (e.g. petty cash or corporate card use).</li><li data-v-84150726${_scopeId2}>Utility services (e.g. electricity, water, telecommunications).</li><li data-v-84150726${_scopeId2}>Real estate transactions (e.g. office leases, land acquisition).</li><li data-v-84150726${_scopeId2}>Insurance policies (e.g. medical, asset, liability coverage).</li>`);
                } else {
                  return [
                    createVNode("li", null, "Employment-related contracts."),
                    createVNode("li", null, "Low-value purchases below defined thresholds (e.g. petty cash or corporate card use)."),
                    createVNode("li", null, "Utility services (e.g. electricity, water, telecommunications)."),
                    createVNode("li", null, "Real estate transactions (e.g. office leases, land acquisition)."),
                    createVNode("li", null, "Insurance policies (e.g. medical, asset, liability coverage).")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("p", null, "This policy establishes the framework for procurement activities to ensure that the organization consistently achieves value for money. It promotes transparent, competitive, and standardized processes, while supporting efficient, ethical, and commercially sound procurement practices. It applies to all procurement of goods, works, and services undertaken by Nebras.")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Excluded from scope"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Employment-related contracts."),
                  createVNode("li", null, "Low-value purchases below defined thresholds (e.g. petty cash or corporate card use)."),
                  createVNode("li", null, "Utility services (e.g. electricity, water, telecommunications)."),
                  createVNode("li", null, "Real estate transactions (e.g. office leases, land acquisition)."),
                  createVNode("li", null, "Insurance policies (e.g. medical, asset, liability coverage).")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "principles",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "Principles & provisions",
        title: "Key principles and general provisions",
        lede: "Procurement activities MUST adhere to a set of key principles, supported by general provisions that safeguard fairness, competition, and the interests of Nebras.",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-84150726${_scopeId}>Key procurement principles</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-84150726${_scopeId2}><strong data-v-84150726${_scopeId2}>Value for money</strong> — the Procurement function MUST consider all options and develop strategies that achieve the most advantageous combination of total cost, quality, and sustainability on a case-by-case basis.</li><li data-v-84150726${_scopeId2}><strong data-v-84150726${_scopeId2}>Fair and equal competition</strong> — all processes MUST be open, transparent, and competitive; bidders shall be treated equally and provided with the same information simultaneously.</li><li data-v-84150726${_scopeId2}><strong data-v-84150726${_scopeId2}>Conflict of interest and ethical conduct</strong> — personnel MUST adhere to the HR Policy and Code of Conduct, avoid real or perceived conflicts of interest, reject gifts, bribery, corruption, or favouritism, and MUST NOT disclose bid or contract details to unauthorized parties.</li><li data-v-84150726${_scopeId2}><strong data-v-84150726${_scopeId2}>Proportionality</strong> — the procurement process MUST be proportionate to the size and nature of the requirement, avoiding unnecessary burdens on Nebras and bidders.</li><li data-v-84150726${_scopeId2}><strong data-v-84150726${_scopeId2}>Protecting the interests of Nebras</strong> — evaluate risks, maintain comprehensive records, operate within the Delegation of Authority (DoA), require bidders to sign NDAs before receiving tender documents, and comply with applicable UAE laws.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Value for money"),
                      createTextVNode(" — the Procurement function MUST consider all options and develop strategies that achieve the most advantageous combination of total cost, quality, and sustainability on a case-by-case basis.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Fair and equal competition"),
                      createTextVNode(" — all processes MUST be open, transparent, and competitive; bidders shall be treated equally and provided with the same information simultaneously.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Conflict of interest and ethical conduct"),
                      createTextVNode(" — personnel MUST adhere to the HR Policy and Code of Conduct, avoid real or perceived conflicts of interest, reject gifts, bribery, corruption, or favouritism, and MUST NOT disclose bid or contract details to unauthorized parties.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Proportionality"),
                      createTextVNode(" — the procurement process MUST be proportionate to the size and nature of the requirement, avoiding unnecessary burdens on Nebras and bidders.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Protecting the interests of Nebras"),
                      createTextVNode(" — evaluate risks, maintain comprehensive records, operate within the Delegation of Authority (DoA), require bidders to sign NDAs before receiving tender documents, and comply with applicable UAE laws.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-84150726${_scopeId}>General provisions</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-84150726${_scopeId2}>Procurement shall be conducted in a fair, transparent, and competitive manner.</li><li data-v-84150726${_scopeId2}>Splitting procurement requirements to bypass approval thresholds is strictly prohibited.</li><li data-v-84150726${_scopeId2}>Procurement activities MUST comply with applicable UAE laws and local content requirements.</li><li data-v-84150726${_scopeId2}>All procurement MUST be supported by an approved budget and relevant approvals as per the DoA.</li><li data-v-84150726${_scopeId2}>A valid contract or purchase order MUST be issued before engaging any supplier.</li><li data-v-84150726${_scopeId2}>Nebras reserves the right to reject invoices submitted without a valid agreement.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Procurement shall be conducted in a fair, transparent, and competitive manner."),
                    createVNode("li", null, "Splitting procurement requirements to bypass approval thresholds is strictly prohibited."),
                    createVNode("li", null, "Procurement activities MUST comply with applicable UAE laws and local content requirements."),
                    createVNode("li", null, "All procurement MUST be supported by an approved budget and relevant approvals as per the DoA."),
                    createVNode("li", null, "A valid contract or purchase order MUST be issued before engaging any supplier."),
                    createVNode("li", null, "Nebras reserves the right to reject invoices submitted without a valid agreement.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, "Key procurement principles"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Value for money"),
                    createTextVNode(" — the Procurement function MUST consider all options and develop strategies that achieve the most advantageous combination of total cost, quality, and sustainability on a case-by-case basis.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Fair and equal competition"),
                    createTextVNode(" — all processes MUST be open, transparent, and competitive; bidders shall be treated equally and provided with the same information simultaneously.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Conflict of interest and ethical conduct"),
                    createTextVNode(" — personnel MUST adhere to the HR Policy and Code of Conduct, avoid real or perceived conflicts of interest, reject gifts, bribery, corruption, or favouritism, and MUST NOT disclose bid or contract details to unauthorized parties.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Proportionality"),
                    createTextVNode(" — the procurement process MUST be proportionate to the size and nature of the requirement, avoiding unnecessary burdens on Nebras and bidders.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Protecting the interests of Nebras"),
                    createTextVNode(" — evaluate risks, maintain comprehensive records, operate within the Delegation of Authority (DoA), require bidders to sign NDAs before receiving tender documents, and comply with applicable UAE laws.")
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "General provisions"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Procurement shall be conducted in a fair, transparent, and competitive manner."),
                  createVNode("li", null, "Splitting procurement requirements to bypass approval thresholds is strictly prohibited."),
                  createVNode("li", null, "Procurement activities MUST comply with applicable UAE laws and local content requirements."),
                  createVNode("li", null, "All procurement MUST be supported by an approved budget and relevant approvals as per the DoA."),
                  createVNode("li", null, "A valid contract or purchase order MUST be issued before engaging any supplier."),
                  createVNode("li", null, "Nebras reserves the right to reject invoices submitted without a valid agreement.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "governance",
        num: "03",
        color: "var(--at-blue)",
        eyebrow: "Governance & Committee",
        title: "Dual control and the Procurement Committee",
        lede: "Nebras applies the concept of dual control where a procurement transaction involves an RFP, tender process, or other special procurement decision. A standing Procurement Committee of independent members submits its endorsement to the respective delegated authority, which reviews the report and takes the decision accordingly.",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-84150726${_scopeId2}>The Procurement Committee shall be appointed upon the approval of the CEO and comprises a Chairperson, Secretary, Permanent Members, Advisory Members, and Invitee Members as required. Its detailed role, responsibilities, composition, and operating procedures are defined in the Procurement Committee Charter, which shall be reviewed and updated annually.</p>`);
                } else {
                  return [
                    createVNode("p", null, "The Procurement Committee shall be appointed upon the approval of the CEO and comprises a Chairperson, Secretary, Permanent Members, Advisory Members, and Invitee Members as required. Its detailed role, responsibilities, composition, and operating procedures are defined in the Procurement Committee Charter, which shall be reviewed and updated annually.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-84150726${_scopeId}>The Committee provides oversight of</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-84150726${_scopeId2}>Procurement transactions exceeding <strong data-v-84150726${_scopeId2}>AED 500,000</strong>.</li><li data-v-84150726${_scopeId2}>Contract variations greater than <strong data-v-84150726${_scopeId2}>20%</strong> of an existing contract.</li><li data-v-84150726${_scopeId2}>Single or sole source procurement requests.</li><li data-v-84150726${_scopeId2}>Contract renewal and termination requests.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createTextVNode("Procurement transactions exceeding "),
                      createVNode("strong", null, "AED 500,000"),
                      createTextVNode(".")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("Contract variations greater than "),
                      createVNode("strong", null, "20%"),
                      createTextVNode(" of an existing contract.")
                    ]),
                    createVNode("li", null, "Single or sole source procurement requests."),
                    createVNode("li", null, "Contract renewal and termination requests.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-84150726${_scopeId2}>The Procurement Committee finalizes evaluation for RFP/RFQs under <strong data-v-84150726${_scopeId2}>AED 3 million</strong>. Anything above AED 3 million in value — or other values as per the defined DoA — is referred to the CBUAE’s Procurement Committee.</p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode("The Procurement Committee finalizes evaluation for RFP/RFQs under "),
                      createVNode("strong", null, "AED 3 million"),
                      createTextVNode(". Anything above AED 3 million in value — or other values as per the defined DoA — is referred to the CBUAE’s Procurement Committee.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("p", null, "The Procurement Committee shall be appointed upon the approval of the CEO and comprises a Chairperson, Secretary, Permanent Members, Advisory Members, and Invitee Members as required. Its detailed role, responsibilities, composition, and operating procedures are defined in the Procurement Committee Charter, which shall be reviewed and updated annually.")
                ]),
                _: 1
              }),
              createVNode("h3", null, "The Committee provides oversight of"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createTextVNode("Procurement transactions exceeding "),
                    createVNode("strong", null, "AED 500,000"),
                    createTextVNode(".")
                  ]),
                  createVNode("li", null, [
                    createTextVNode("Contract variations greater than "),
                    createVNode("strong", null, "20%"),
                    createTextVNode(" of an existing contract.")
                  ]),
                  createVNode("li", null, "Single or sole source procurement requests."),
                  createVNode("li", null, "Contract renewal and termination requests.")
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, null, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode("The Procurement Committee finalizes evaluation for RFP/RFQs under "),
                    createVNode("strong", null, "AED 3 million"),
                    createTextVNode(". Anything above AED 3 million in value — or other values as per the defined DoA — is referred to the CBUAE’s Procurement Committee.")
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "methods",
        num: "04",
        color: "var(--at-blue-deep)",
        eyebrow: "Methods & thresholds",
        title: "Procurement methods and value thresholds",
        lede: "The procurement method is determined by the value and complexity of the requirement, from direct low-value purchases through to a full sealed-envelope tender.",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-84150726${_scopeId}>Direct procurement</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-84150726${_scopeId2}><strong data-v-84150726${_scopeId2}>Petty cash</strong> — low-value purchases below AED 1,000 for immediate and incidental needs, administered by the Finance Department and supported by valid receipts.</li><li data-v-84150726${_scopeId2}><strong data-v-84150726${_scopeId2}>Corporate card</strong> — low-value purchases from AED 1,000 to AED 5,000, issued and controlled by the Finance Department, with the Procurement Manager determining card versus purchase order.</li><li data-v-84150726${_scopeId2}><strong data-v-84150726${_scopeId2}>Direct purchase order</strong> — low-risk, low-value purchases from AED 5,001 up to AED 50,000, supported by a valid Purchase Requisition and necessary technical approvals.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Petty cash"),
                      createTextVNode(" — low-value purchases below AED 1,000 for immediate and incidental needs, administered by the Finance Department and supported by valid receipts.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Corporate card"),
                      createTextVNode(" — low-value purchases from AED 1,000 to AED 5,000, issued and controlled by the Finance Department, with the Procurement Manager determining card versus purchase order.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Direct purchase order"),
                      createTextVNode(" — low-risk, low-value purchases from AED 5,001 up to AED 50,000, supported by a valid Purchase Requisition and necessary technical approvals.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-84150726${_scopeId}>Competitive procurement</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-84150726${_scopeId2}><strong data-v-84150726${_scopeId2}>RFQ</strong> — for standard, low-complexity goods with clearly defined specifications, valued above AED 50,000 to below AED 1,000,000.</li><li data-v-84150726${_scopeId2}><strong data-v-84150726${_scopeId2}>RFP</strong> — for medium-complexity procurements above AED 50,000 to below AED 1,000,000, where both technical and commercial evaluations are necessary; a minimum of three proposals shall be sought from qualified vendors.</li><li data-v-84150726${_scopeId2}><strong data-v-84150726${_scopeId2}>Tender</strong> — for high-value and complex procurements from AED 1,000,000, using a sealed-envelope process with a minimum of three sealed bids from qualified vendors.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "RFQ"),
                      createTextVNode(" — for standard, low-complexity goods with clearly defined specifications, valued above AED 50,000 to below AED 1,000,000.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "RFP"),
                      createTextVNode(" — for medium-complexity procurements above AED 50,000 to below AED 1,000,000, where both technical and commercial evaluations are necessary; a minimum of three proposals shall be sought from qualified vendors.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Tender"),
                      createTextVNode(" — for high-value and complex procurements from AED 1,000,000, using a sealed-envelope process with a minimum of three sealed bids from qualified vendors.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-84150726${_scopeId2}>For procurements valued at AED 500,000 and above, Procurement Committee approval shall be required prior to Delegation of Authority (DOA) approval.</p>`);
                } else {
                  return [
                    createVNode("p", null, "For procurements valued at AED 500,000 and above, Procurement Committee approval shall be required prior to Delegation of Authority (DOA) approval.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="thresholds" data-v-84150726${_scopeId}><table data-v-84150726${_scopeId}><thead data-v-84150726${_scopeId}><tr data-v-84150726${_scopeId}><th data-v-84150726${_scopeId}>Value range (AED)</th><th data-v-84150726${_scopeId}>Approach</th><th data-v-84150726${_scopeId}>Method</th><th data-v-84150726${_scopeId}>Governance</th><th data-v-84150726${_scopeId}>Financial controls</th></tr></thead><tbody data-v-84150726${_scopeId}><tr data-v-84150726${_scopeId}><td data-v-84150726${_scopeId}>&lt; 1,000</td><td data-v-84150726${_scopeId}>Any</td><td data-v-84150726${_scopeId}>Petty cash</td><td data-v-84150726${_scopeId}>Finance controls</td><td data-v-84150726${_scopeId}>Policy exclusion</td></tr><tr data-v-84150726${_scopeId}><td data-v-84150726${_scopeId}>1,000 – 5,000</td><td data-v-84150726${_scopeId}>Tactical</td><td data-v-84150726${_scopeId}>Corporate card</td><td data-v-84150726${_scopeId}>Finance approval</td><td data-v-84150726${_scopeId}>Policy exclusion</td></tr><tr data-v-84150726${_scopeId}><td data-v-84150726${_scopeId}>5,001 – 50,000</td><td data-v-84150726${_scopeId}>Tactical</td><td data-v-84150726${_scopeId}>Direct PO</td><td data-v-84150726${_scopeId}>Standard approval (DOA)</td><td data-v-84150726${_scopeId}>PR required</td></tr><tr data-v-84150726${_scopeId}><td data-v-84150726${_scopeId}>50k – 500k</td><td data-v-84150726${_scopeId}>Tactical</td><td data-v-84150726${_scopeId}>RFQ</td><td data-v-84150726${_scopeId}>3 bidders</td><td data-v-84150726${_scopeId}>Standard lifecycle</td></tr><tr data-v-84150726${_scopeId}><td data-v-84150726${_scopeId}>50k – 1M</td><td data-v-84150726${_scopeId}>Normal</td><td data-v-84150726${_scopeId}>RFP</td><td data-v-84150726${_scopeId}>3 bidders</td><td data-v-84150726${_scopeId}>Technical &amp; commercial eval</td></tr><tr data-v-84150726${_scopeId}><td data-v-84150726${_scopeId}>50k – 1M (unclear scope)</td><td data-v-84150726${_scopeId}>Normal</td><td data-v-84150726${_scopeId}>RFI → RFQ/RFP</td><td data-v-84150726${_scopeId}>3 bidders</td><td data-v-84150726${_scopeId}>Market discovery required</td></tr><tr data-v-84150726${_scopeId}><td data-v-84150726${_scopeId}>500k – 1M</td><td data-v-84150726${_scopeId}>Normal</td><td data-v-84150726${_scopeId}>RFQ / RFP</td><td data-v-84150726${_scopeId}>Procurement Committee required</td><td data-v-84150726${_scopeId}>Enhanced governance</td></tr><tr data-v-84150726${_scopeId}><td data-v-84150726${_scopeId}>≥ 1M</td><td data-v-84150726${_scopeId}>Strategic</td><td data-v-84150726${_scopeId}>Tender</td><td data-v-84150726${_scopeId}>Procurement Committee required</td><td data-v-84150726${_scopeId}>1% Tender Guarantee (case-by-case)</td></tr><tr data-v-84150726${_scopeId}><td data-v-84150726${_scopeId}>≥ 1M (award stage)</td><td data-v-84150726${_scopeId}>Strategic</td><td data-v-84150726${_scopeId}>Contract award</td><td data-v-84150726${_scopeId}>Procurement Committee + DOA</td><td data-v-84150726${_scopeId}>10% Performance Guarantee</td></tr></tbody></table></div>`);
          } else {
            return [
              createVNode("h3", null, "Direct procurement"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Petty cash"),
                    createTextVNode(" — low-value purchases below AED 1,000 for immediate and incidental needs, administered by the Finance Department and supported by valid receipts.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Corporate card"),
                    createTextVNode(" — low-value purchases from AED 1,000 to AED 5,000, issued and controlled by the Finance Department, with the Procurement Manager determining card versus purchase order.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Direct purchase order"),
                    createTextVNode(" — low-risk, low-value purchases from AED 5,001 up to AED 50,000, supported by a valid Purchase Requisition and necessary technical approvals.")
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "Competitive procurement"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "RFQ"),
                    createTextVNode(" — for standard, low-complexity goods with clearly defined specifications, valued above AED 50,000 to below AED 1,000,000.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "RFP"),
                    createTextVNode(" — for medium-complexity procurements above AED 50,000 to below AED 1,000,000, where both technical and commercial evaluations are necessary; a minimum of three proposals shall be sought from qualified vendors.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Tender"),
                    createTextVNode(" — for high-value and complex procurements from AED 1,000,000, using a sealed-envelope process with a minimum of three sealed bids from qualified vendors.")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("p", null, "For procurements valued at AED 500,000 and above, Procurement Committee approval shall be required prior to Delegation of Authority (DOA) approval.")
                ]),
                _: 1
              }),
              createVNode("div", { class: "thresholds" }, [
                createVNode("table", null, [
                  createVNode("thead", null, [
                    createVNode("tr", null, [
                      createVNode("th", null, "Value range (AED)"),
                      createVNode("th", null, "Approach"),
                      createVNode("th", null, "Method"),
                      createVNode("th", null, "Governance"),
                      createVNode("th", null, "Financial controls")
                    ])
                  ]),
                  createVNode("tbody", null, [
                    createVNode("tr", null, [
                      createVNode("td", null, "< 1,000"),
                      createVNode("td", null, "Any"),
                      createVNode("td", null, "Petty cash"),
                      createVNode("td", null, "Finance controls"),
                      createVNode("td", null, "Policy exclusion")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "1,000 – 5,000"),
                      createVNode("td", null, "Tactical"),
                      createVNode("td", null, "Corporate card"),
                      createVNode("td", null, "Finance approval"),
                      createVNode("td", null, "Policy exclusion")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "5,001 – 50,000"),
                      createVNode("td", null, "Tactical"),
                      createVNode("td", null, "Direct PO"),
                      createVNode("td", null, "Standard approval (DOA)"),
                      createVNode("td", null, "PR required")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "50k – 500k"),
                      createVNode("td", null, "Tactical"),
                      createVNode("td", null, "RFQ"),
                      createVNode("td", null, "3 bidders"),
                      createVNode("td", null, "Standard lifecycle")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "50k – 1M"),
                      createVNode("td", null, "Normal"),
                      createVNode("td", null, "RFP"),
                      createVNode("td", null, "3 bidders"),
                      createVNode("td", null, "Technical & commercial eval")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "50k – 1M (unclear scope)"),
                      createVNode("td", null, "Normal"),
                      createVNode("td", null, "RFI → RFQ/RFP"),
                      createVNode("td", null, "3 bidders"),
                      createVNode("td", null, "Market discovery required")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "500k – 1M"),
                      createVNode("td", null, "Normal"),
                      createVNode("td", null, "RFQ / RFP"),
                      createVNode("td", null, "Procurement Committee required"),
                      createVNode("td", null, "Enhanced governance")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "≥ 1M"),
                      createVNode("td", null, "Strategic"),
                      createVNode("td", null, "Tender"),
                      createVNode("td", null, "Procurement Committee required"),
                      createVNode("td", null, "1% Tender Guarantee (case-by-case)")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "≥ 1M (award stage)"),
                      createVNode("td", null, "Strategic"),
                      createVNode("td", null, "Contract award"),
                      createVNode("td", null, "Procurement Committee + DOA"),
                      createVNode("td", null, "10% Performance Guarantee")
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "tender",
        num: "05",
        color: "var(--at-navy)",
        eyebrow: "Tender lifecycle",
        title: "From requisition to award",
        lede: "For competitive and tendered procurements, a structured lifecycle ensures transparency, fairness, and value for money. All submissions are received and managed through the Digital Procurement System.",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdStages, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "01",
                    title: "Purchase Requisition",
                    "num-color": "var(--at-navy)"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-84150726${_scopeId3}>The End-User raises a Purchase Requisition (PR) aligned to the approved budget, with clear scope of work, specifications, BOQ, quantities, and the correct asset, material, or service code. PRs that split values to bypass approval limits are strictly prohibited.</p>`);
                      } else {
                        return [
                          createVNode("p", null, "The End-User raises a Purchase Requisition (PR) aligned to the approved budget, with clear scope of work, specifications, BOQ, quantities, and the correct asset, material, or service code. PRs that split values to bypass approval limits are strictly prohibited.")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "02",
                    title: "Sourcing",
                    "num-color": "var(--at-navy)"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-84150726${_scopeId3}>The Bidders List is drawn from the Approved Vendor list, an End-User proposed bidders list, or the prequalification process. A minimum of three bids shall be sought from qualified vendors.</p>`);
                      } else {
                        return [
                          createVNode("p", null, "The Bidders List is drawn from the Approved Vendor list, an End-User proposed bidders list, or the prequalification process. A minimum of three bids shall be sought from qualified vendors.")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "03",
                    title: "Tender opening",
                    "num-color": "var(--at-navy)"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-84150726${_scopeId3}>Opening follows a structured, two-stage process: technical submissions are accessed first for evaluation, and commercial submissions remain restricted until the technical evaluation is formally completed and approved.</p>`);
                      } else {
                        return [
                          createVNode("p", null, "Opening follows a structured, two-stage process: technical submissions are accessed first for evaluation, and commercial submissions remain restricted until the technical evaluation is formally completed and approved.")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "04",
                    title: "Technical evaluation",
                    "num-color": "var(--at-navy)"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-84150726${_scopeId3}>Conducted against predefined, approved technical criteria by End-Users and assigned cross-department members, with all pricing information excluded. A structured Post-Tender Clarification (PTC) may be initiated prior to commercial opening.</p>`);
                      } else {
                        return [
                          createVNode("p", null, "Conducted against predefined, approved technical criteria by End-Users and assigned cross-department members, with all pricing information excluded. A structured Post-Tender Clarification (PTC) may be initiated prior to commercial opening.")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "05",
                    title: "Commercial evaluation",
                    "num-color": "var(--at-navy)"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-84150726${_scopeId3}>Only the commercial submissions of technically qualified bidders are opened. The commercial evaluation is conducted exclusively by the Procurement Department, without involvement from the technical team or other departments.</p>`);
                      } else {
                        return [
                          createVNode("p", null, "Only the commercial submissions of technically qualified bidders are opened. The commercial evaluation is conducted exclusively by the Procurement Department, without involvement from the technical team or other departments.")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "06",
                    title: "Negotiation & award",
                    "num-color": "var(--at-navy)"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-84150726${_scopeId3}>Negotiation may be authorized with the lowest or multiple bidders. The best evaluated offer is submitted for Procurement Committee review and endorsement, followed by final approval in line with the DOA.</p>`);
                      } else {
                        return [
                          createVNode("p", null, "Negotiation may be authorized with the lowest or multiple bidders. The best evaluated offer is submitted for Procurement Committee review and endorsement, followed by final approval in line with the DOA.")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_EdStage, {
                    num: "07",
                    title: "Notification",
                    "num-color": "var(--at-navy)"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-84150726${_scopeId3}>The award is issued through a signed Letter of Award (LOA) in accordance with the DOA. All unsuccessful bidders receive a formal regret notification in writing.</p>`);
                      } else {
                        return [
                          createVNode("p", null, "The award is issued through a signed Letter of Award (LOA) in accordance with the DOA. All unsuccessful bidders receive a formal regret notification in writing.")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_EdStage, {
                      num: "01",
                      title: "Purchase Requisition",
                      "num-color": "var(--at-navy)"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, "The End-User raises a Purchase Requisition (PR) aligned to the approved budget, with clear scope of work, specifications, BOQ, quantities, and the correct asset, material, or service code. PRs that split values to bypass approval limits are strictly prohibited.")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_EdStage, {
                      num: "02",
                      title: "Sourcing",
                      "num-color": "var(--at-navy)"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, "The Bidders List is drawn from the Approved Vendor list, an End-User proposed bidders list, or the prequalification process. A minimum of three bids shall be sought from qualified vendors.")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_EdStage, {
                      num: "03",
                      title: "Tender opening",
                      "num-color": "var(--at-navy)"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, "Opening follows a structured, two-stage process: technical submissions are accessed first for evaluation, and commercial submissions remain restricted until the technical evaluation is formally completed and approved.")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_EdStage, {
                      num: "04",
                      title: "Technical evaluation",
                      "num-color": "var(--at-navy)"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, "Conducted against predefined, approved technical criteria by End-Users and assigned cross-department members, with all pricing information excluded. A structured Post-Tender Clarification (PTC) may be initiated prior to commercial opening.")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_EdStage, {
                      num: "05",
                      title: "Commercial evaluation",
                      "num-color": "var(--at-navy)"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, "Only the commercial submissions of technically qualified bidders are opened. The commercial evaluation is conducted exclusively by the Procurement Department, without involvement from the technical team or other departments.")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_EdStage, {
                      num: "06",
                      title: "Negotiation & award",
                      "num-color": "var(--at-navy)"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, "Negotiation may be authorized with the lowest or multiple bidders. The best evaluated offer is submitted for Procurement Committee review and endorsement, followed by final approval in line with the DOA.")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_EdStage, {
                      num: "07",
                      title: "Notification",
                      "num-color": "var(--at-navy)"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", null, "The award is issued through a signed Letter of Award (LOA) in accordance with the DOA. All unsuccessful bidders receive a formal regret notification in writing.")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdExample, { label: "Guarantees" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_EdBullets, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<li data-v-84150726${_scopeId3}><strong data-v-84150726${_scopeId3}>Tender Guarantee</strong> — 1% of the total bid value, in the form of a bank guarantee or security cheque, determined case-by-case; returned to unsuccessful bidders following contract award.</li><li data-v-84150726${_scopeId3}><strong data-v-84150726${_scopeId3}>Performance Guarantee</strong> — 10% of the total contract value from the successful supplier. A supplier may request to deduct an amount from payable invoices as an alternative, subject to Procurement Committee approval.</li>`);
                      } else {
                        return [
                          createVNode("li", null, [
                            createVNode("strong", null, "Tender Guarantee"),
                            createTextVNode(" — 1% of the total bid value, in the form of a bank guarantee or security cheque, determined case-by-case; returned to unsuccessful bidders following contract award.")
                          ]),
                          createVNode("li", null, [
                            createVNode("strong", null, "Performance Guarantee"),
                            createTextVNode(" — 10% of the total contract value from the successful supplier. A supplier may request to deduct an amount from payable invoices as an alternative, subject to Procurement Committee approval.")
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_EdBullets, null, {
                      default: withCtx(() => [
                        createVNode("li", null, [
                          createVNode("strong", null, "Tender Guarantee"),
                          createTextVNode(" — 1% of the total bid value, in the form of a bank guarantee or security cheque, determined case-by-case; returned to unsuccessful bidders following contract award.")
                        ]),
                        createVNode("li", null, [
                          createVNode("strong", null, "Performance Guarantee"),
                          createTextVNode(" — 10% of the total contract value from the successful supplier. A supplier may request to deduct an amount from payable invoices as an alternative, subject to Procurement Committee approval.")
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdStages, null, {
                default: withCtx(() => [
                  createVNode(_component_EdStage, {
                    num: "01",
                    title: "Purchase Requisition",
                    "num-color": "var(--at-navy)"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, "The End-User raises a Purchase Requisition (PR) aligned to the approved budget, with clear scope of work, specifications, BOQ, quantities, and the correct asset, material, or service code. PRs that split values to bypass approval limits are strictly prohibited.")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_EdStage, {
                    num: "02",
                    title: "Sourcing",
                    "num-color": "var(--at-navy)"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, "The Bidders List is drawn from the Approved Vendor list, an End-User proposed bidders list, or the prequalification process. A minimum of three bids shall be sought from qualified vendors.")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_EdStage, {
                    num: "03",
                    title: "Tender opening",
                    "num-color": "var(--at-navy)"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, "Opening follows a structured, two-stage process: technical submissions are accessed first for evaluation, and commercial submissions remain restricted until the technical evaluation is formally completed and approved.")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_EdStage, {
                    num: "04",
                    title: "Technical evaluation",
                    "num-color": "var(--at-navy)"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, "Conducted against predefined, approved technical criteria by End-Users and assigned cross-department members, with all pricing information excluded. A structured Post-Tender Clarification (PTC) may be initiated prior to commercial opening.")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_EdStage, {
                    num: "05",
                    title: "Commercial evaluation",
                    "num-color": "var(--at-navy)"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, "Only the commercial submissions of technically qualified bidders are opened. The commercial evaluation is conducted exclusively by the Procurement Department, without involvement from the technical team or other departments.")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_EdStage, {
                    num: "06",
                    title: "Negotiation & award",
                    "num-color": "var(--at-navy)"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, "Negotiation may be authorized with the lowest or multiple bidders. The best evaluated offer is submitted for Procurement Committee review and endorsement, followed by final approval in line with the DOA.")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_EdStage, {
                    num: "07",
                    title: "Notification",
                    "num-color": "var(--at-navy)"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, "The award is issued through a signed Letter of Award (LOA) in accordance with the DOA. All unsuccessful bidders receive a formal regret notification in writing.")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_EdExample, { label: "Guarantees" }, {
                default: withCtx(() => [
                  createVNode(_component_EdBullets, null, {
                    default: withCtx(() => [
                      createVNode("li", null, [
                        createVNode("strong", null, "Tender Guarantee"),
                        createTextVNode(" — 1% of the total bid value, in the form of a bank guarantee or security cheque, determined case-by-case; returned to unsuccessful bidders following contract award.")
                      ]),
                      createVNode("li", null, [
                        createVNode("strong", null, "Performance Guarantee"),
                        createTextVNode(" — 10% of the total contract value from the successful supplier. A supplier may request to deduct an amount from payable invoices as an alternative, subject to Procurement Committee approval.")
                      ])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "special",
        num: "06",
        color: "var(--at-teal-deep)",
        eyebrow: "Special arrangements",
        title: "Non-competitive and framework arrangements",
        lede: "Beyond standard competitive procurement, defined arrangements cover situations where competition is not practical or where recurring needs are best served by longer-term agreements.",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-84150726${_scopeId2}><strong data-v-84150726${_scopeId2}>Single / sole source</strong> — a supplier may be selected without competition where goods or services are available from only one source, an officially authorized distributor exists, or the End-User relies on proven performance with written justification. All such requests MUST be justified, submitted to the Procurement Committee for endorsement, documented, and subject to periodic audit review.</li><li data-v-84150726${_scopeId2}><strong data-v-84150726${_scopeId2}>Purchase Order variation / Change Request</strong> — a variation of 20% or less is reviewed and endorsed by the Procurement Manager prior to final DOA approval; a variation above 20% MUST be submitted to the Procurement Committee.</li><li data-v-84150726${_scopeId2}><strong data-v-84150726${_scopeId2}>Emergency procurement</strong> — used only where there is an immediate threat to health, safety, operations, or reputation; each request MUST be justified by the requesting Business Unit and approved per the DoA.</li><li data-v-84150726${_scopeId2}><strong data-v-84150726${_scopeId2}>Blanket Agreement</strong> — established for recurring procurement of goods where exact quantities are uncertain but anticipated over a defined period, at fixed pricing.</li><li data-v-84150726${_scopeId2}><strong data-v-84150726${_scopeId2}>Framework Agreement</strong> — used for recurring procurement of services with uncertain quantities or timing; it MUST define the contract period, scope, and pricing.</li><li data-v-84150726${_scopeId2}><strong data-v-84150726${_scopeId2}>Special procurement</strong> — for Marketing Events, Brand Campaigns, and CSR Sponsorships, a tailored approach evaluates proposals on creativity, strategic alignment, execution capability, and value for money. A minimum of three proposals shall be solicited, except for CSR sponsorships, and all such procurements MUST have pre-approved budgets.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Single / sole source"),
                      createTextVNode(" — a supplier may be selected without competition where goods or services are available from only one source, an officially authorized distributor exists, or the End-User relies on proven performance with written justification. All such requests MUST be justified, submitted to the Procurement Committee for endorsement, documented, and subject to periodic audit review.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Purchase Order variation / Change Request"),
                      createTextVNode(" — a variation of 20% or less is reviewed and endorsed by the Procurement Manager prior to final DOA approval; a variation above 20% MUST be submitted to the Procurement Committee.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Emergency procurement"),
                      createTextVNode(" — used only where there is an immediate threat to health, safety, operations, or reputation; each request MUST be justified by the requesting Business Unit and approved per the DoA.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Blanket Agreement"),
                      createTextVNode(" — established for recurring procurement of goods where exact quantities are uncertain but anticipated over a defined period, at fixed pricing.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Framework Agreement"),
                      createTextVNode(" — used for recurring procurement of services with uncertain quantities or timing; it MUST define the contract period, scope, and pricing.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Special procurement"),
                      createTextVNode(" — for Marketing Events, Brand Campaigns, and CSR Sponsorships, a tailored approach evaluates proposals on creativity, strategic alignment, execution capability, and value for money. A minimum of three proposals shall be solicited, except for CSR sponsorships, and all such procurements MUST have pre-approved budgets.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Single / sole source"),
                    createTextVNode(" — a supplier may be selected without competition where goods or services are available from only one source, an officially authorized distributor exists, or the End-User relies on proven performance with written justification. All such requests MUST be justified, submitted to the Procurement Committee for endorsement, documented, and subject to periodic audit review.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Purchase Order variation / Change Request"),
                    createTextVNode(" — a variation of 20% or less is reviewed and endorsed by the Procurement Manager prior to final DOA approval; a variation above 20% MUST be submitted to the Procurement Committee.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Emergency procurement"),
                    createTextVNode(" — used only where there is an immediate threat to health, safety, operations, or reputation; each request MUST be justified by the requesting Business Unit and approved per the DoA.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Blanket Agreement"),
                    createTextVNode(" — established for recurring procurement of goods where exact quantities are uncertain but anticipated over a defined period, at fixed pricing.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Framework Agreement"),
                    createTextVNode(" — used for recurring procurement of services with uncertain quantities or timing; it MUST define the contract period, scope, and pricing.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Special procurement"),
                    createTextVNode(" — for Marketing Events, Brand Campaigns, and CSR Sponsorships, a tailored approach evaluates proposals on creativity, strategic alignment, execution capability, and value for money. A minimum of three proposals shall be solicited, except for CSR sponsorships, and all such procurements MUST have pre-approved budgets.")
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "contracts",
        num: "07",
        color: "var(--at-teal)",
        eyebrow: "Contract management",
        title: "Managing contracts through their lifecycle",
        lede: "Contract Management is the responsibility of the End-User Department, ensuring contracted goods and services are delivered per specification and terms, that risks are managed, and that effective communication is maintained between stakeholders.",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-84150726${_scopeId}>Variation and renewal</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-84150726${_scopeId2}>Any modification to the scope, value, or terms of a contract is a variation, initiated by the End-User. A variation of 20% or less is endorsed by the Procurement Manager; a variation above 20% MUST be submitted to the Procurement Committee, both prior to final DOA approval.</li><li data-v-84150726${_scopeId2}>Renewals or extensions shall not be automatic and MUST be planned; End-Users submit a formal renewal request for Procurement Committee approval before any renewal process begins.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Any modification to the scope, value, or terms of a contract is a variation, initiated by the End-User. A variation of 20% or less is endorsed by the Procurement Manager; a variation above 20% MUST be submitted to the Procurement Committee, both prior to final DOA approval."),
                    createVNode("li", null, "Renewals or extensions shall not be automatic and MUST be planned; End-Users submit a formal renewal request for Procurement Committee approval before any renewal process begins.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-84150726${_scopeId}>Disputes and termination</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-84150726${_scopeId2}><strong data-v-84150726${_scopeId2}>Minor disputes</strong> — slight scope deviations, timeline delays, or minor performance issues, resolved by the Procurement Department with the supplier and End-User to avoid escalation.</li><li data-v-84150726${_scopeId2}><strong data-v-84150726${_scopeId2}>Major disputes</strong> — unethical or fraudulent practices, significant scope or timeline deviations, or severe performance failures, managed by the Procurement Department with the Legal Department.</li><li data-v-84150726${_scopeId2}><strong data-v-84150726${_scopeId2}>Resolution options</strong> — invoice deductions or retentions, forfeiture of performance guarantees, liquidated damages (major, where permitted), claims against insurance or guarantees, contract termination, and legal action.</li><li data-v-84150726${_scopeId2}><strong data-v-84150726${_scopeId2}>Termination</strong> — supported by documented justification, coordinated with the Legal Department, approved by the Procurement Committee, and finalized per the DOA based on contract value.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Minor disputes"),
                      createTextVNode(" — slight scope deviations, timeline delays, or minor performance issues, resolved by the Procurement Department with the supplier and End-User to avoid escalation.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Major disputes"),
                      createTextVNode(" — unethical or fraudulent practices, significant scope or timeline deviations, or severe performance failures, managed by the Procurement Department with the Legal Department.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Resolution options"),
                      createTextVNode(" — invoice deductions or retentions, forfeiture of performance guarantees, liquidated damages (major, where permitted), claims against insurance or guarantees, contract termination, and legal action.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Termination"),
                      createTextVNode(" — supported by documented justification, coordinated with the Legal Department, approved by the Procurement Committee, and finalized per the DOA based on contract value.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, "Variation and renewal"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Any modification to the scope, value, or terms of a contract is a variation, initiated by the End-User. A variation of 20% or less is endorsed by the Procurement Manager; a variation above 20% MUST be submitted to the Procurement Committee, both prior to final DOA approval."),
                  createVNode("li", null, "Renewals or extensions shall not be automatic and MUST be planned; End-Users submit a formal renewal request for Procurement Committee approval before any renewal process begins.")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Disputes and termination"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Minor disputes"),
                    createTextVNode(" — slight scope deviations, timeline delays, or minor performance issues, resolved by the Procurement Department with the supplier and End-User to avoid escalation.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Major disputes"),
                    createTextVNode(" — unethical or fraudulent practices, significant scope or timeline deviations, or severe performance failures, managed by the Procurement Department with the Legal Department.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Resolution options"),
                    createTextVNode(" — invoice deductions or retentions, forfeiture of performance guarantees, liquidated damages (major, where permitted), claims against insurance or guarantees, contract termination, and legal action.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Termination"),
                    createTextVNode(" — supported by documented justification, coordinated with the Legal Department, approved by the Procurement Committee, and finalized per the DOA based on contract value.")
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "vendors",
        num: "08",
        color: "var(--at-gold)",
        eyebrow: "Vendor management",
        title: "Registering, evaluating, and classifying vendors",
        lede: "Nebras maintains a robust Vendor Management framework to ensure the engagement of capable, reliable, and qualified vendors, managed with transparency, accountability, and a focus on long-term partnership development.",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-84150726${_scopeId}>Registration and performance</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-84150726${_scopeId2}>All vendors MUST register through Nebras’s Vendor Registration Portal or Digital Procurement System; Procurement reviews company formation documents while Finance validates banking information.</li><li data-v-84150726${_scopeId2}>Nebras maintains a centralized vendor master file; vendor status is actively monitored and may be deactivated for expired licenses or prolonged inactivity.</li><li data-v-84150726${_scopeId2}>End-Users evaluate performance at Goods Receipt or Service Entry; the Procurement Department conducts quarterly reviews and initiates improvement plans where necessary.</li><li data-v-84150726${_scopeId2}>Suspension or blacklisting may apply for contract breaches, safety violations, unethical conduct, or repeated performance failures; reactivation requires formal approval and reassessment.</li>`);
                } else {
                  return [
                    createVNode("li", null, "All vendors MUST register through Nebras’s Vendor Registration Portal or Digital Procurement System; Procurement reviews company formation documents while Finance validates banking information."),
                    createVNode("li", null, "Nebras maintains a centralized vendor master file; vendor status is actively monitored and may be deactivated for expired licenses or prolonged inactivity."),
                    createVNode("li", null, "End-Users evaluate performance at Goods Receipt or Service Entry; the Procurement Department conducts quarterly reviews and initiates improvement plans where necessary."),
                    createVNode("li", null, "Suspension or blacklisting may apply for contract breaches, safety violations, unethical conduct, or repeated performance failures; reactivation requires formal approval and reassessment.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-84150726${_scopeId}>Vendor classifications</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-84150726${_scopeId2}><strong data-v-84150726${_scopeId2}>Level 1 — Strategic</strong> — key partners and Critical Service Providers (CSPs) providing high-value, high-risk services or products critical to operations.</li><li data-v-84150726${_scopeId2}><strong data-v-84150726${_scopeId2}>Level 2 — Operational</strong> — suppliers supporting core operations with medium-value, moderate-risk offerings where alternatives exist and disruption has limited impact.</li><li data-v-84150726${_scopeId2}><strong data-v-84150726${_scopeId2}>Level 3 — Transactional</strong> — suppliers of low-value, low-risk goods or services that are easily replaceable.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Level 1 — Strategic"),
                      createTextVNode(" — key partners and Critical Service Providers (CSPs) providing high-value, high-risk services or products critical to operations.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Level 2 — Operational"),
                      createTextVNode(" — suppliers supporting core operations with medium-value, moderate-risk offerings where alternatives exist and disruption has limited impact.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Level 3 — Transactional"),
                      createTextVNode(" — suppliers of low-value, low-risk goods or services that are easily replaceable.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-84150726${_scopeId2}>For onboarding strategic vendors and CSPs delivering high-risk, high-value goods or services, Third Party Risk Management (TPRM) applies: Information Security, IT, Finance, Risk, and Operations each provide risk mitigation questionnaires as part of prequalification, and the Procurement Committee ensures all CSPs are thoroughly assessed and endorsed by the respective departments.</p>`);
                } else {
                  return [
                    createVNode("p", null, "For onboarding strategic vendors and CSPs delivering high-risk, high-value goods or services, Third Party Risk Management (TPRM) applies: Information Security, IT, Finance, Risk, and Operations each provide risk mitigation questionnaires as part of prequalification, and the Procurement Committee ensures all CSPs are thoroughly assessed and endorsed by the respective departments.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, "Registration and performance"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "All vendors MUST register through Nebras’s Vendor Registration Portal or Digital Procurement System; Procurement reviews company formation documents while Finance validates banking information."),
                  createVNode("li", null, "Nebras maintains a centralized vendor master file; vendor status is actively monitored and may be deactivated for expired licenses or prolonged inactivity."),
                  createVNode("li", null, "End-Users evaluate performance at Goods Receipt or Service Entry; the Procurement Department conducts quarterly reviews and initiates improvement plans where necessary."),
                  createVNode("li", null, "Suspension or blacklisting may apply for contract breaches, safety violations, unethical conduct, or repeated performance failures; reactivation requires formal approval and reassessment.")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Vendor classifications"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Level 1 — Strategic"),
                    createTextVNode(" — key partners and Critical Service Providers (CSPs) providing high-value, high-risk services or products critical to operations.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Level 2 — Operational"),
                    createTextVNode(" — suppliers supporting core operations with medium-value, moderate-risk offerings where alternatives exist and disruption has limited impact.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Level 3 — Transactional"),
                    createTextVNode(" — suppliers of low-value, low-risk goods or services that are easily replaceable.")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, null, {
                default: withCtx(() => [
                  createVNode("p", null, "For onboarding strategic vendors and CSPs delivering high-risk, high-value goods or services, Third Party Risk Management (TPRM) applies: Information Security, IT, Finance, Risk, and Operations each provide risk mitigation questionnaires as part of prequalification, and the Procurement Committee ensures all CSPs are thoroughly assessed and endorsed by the respective departments.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "records",
        num: "09",
        color: "var(--at-blue)",
        eyebrow: "Records & maintenance",
        title: "Archiving, master data, and policy upkeep",
        tone: "cream",
        narrow: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-84150726${_scopeId}>Archiving and retention</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-84150726${_scopeId2}>Procurement documents — contracts, purchase orders, tenders, and requisitions — shall be centrally archived with appropriate access controls.</li><li data-v-84150726${_scopeId2}>Critical records shall be retained for a minimum of <strong data-v-84150726${_scopeId2}>seven years</strong>, and other documents for at least <strong data-v-84150726${_scopeId2}>three years</strong>, after which they are securely disposed of per applicable regulations.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Procurement documents — contracts, purchase orders, tenders, and requisitions — shall be centrally archived with appropriate access controls."),
                    createVNode("li", null, [
                      createTextVNode("Critical records shall be retained for a minimum of "),
                      createVNode("strong", null, "seven years"),
                      createTextVNode(", and other documents for at least "),
                      createVNode("strong", null, "three years"),
                      createTextVNode(", after which they are securely disposed of per applicable regulations.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-84150726${_scopeId}>Master data and receipt</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-84150726${_scopeId2}>Requests to create, modify, or extend material or service master records MUST be submitted to the Procurement Department with complete and accurate End-User details; asset codes remain the responsibility of the Finance Department.</li><li data-v-84150726${_scopeId2}>End-Users MUST generate Goods Receipt Notes (GRNs) and Service Entry Sheets (SESs) in the Digital Procurement System promptly upon receipt, verifying deliveries and completing supplier performance evaluations to ensure timely vendor payments.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Requests to create, modify, or extend material or service master records MUST be submitted to the Procurement Department with complete and accurate End-User details; asset codes remain the responsibility of the Finance Department."),
                    createVNode("li", null, "End-Users MUST generate Goods Receipt Notes (GRNs) and Service Entry Sheets (SESs) in the Digital Procurement System promptly upon receipt, verifying deliveries and completing supplier performance evaluations to ensure timely vendor payments.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-84150726${_scopeId}>Policy maintenance</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-84150726${_scopeId2}>The Procurement Department is responsible for maintaining and updating this policy.</li><li data-v-84150726${_scopeId2}>Revisions are invalid unless authorized and formally approved per the authorities delegated by the Nebras Board of Managers, then communicated to all relevant departments.</li>`);
                } else {
                  return [
                    createVNode("li", null, "The Procurement Department is responsible for maintaining and updating this policy."),
                    createVNode("li", null, "Revisions are invalid unless authorized and formally approved per the authorities delegated by the Nebras Board of Managers, then communicated to all relevant departments.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, "Archiving and retention"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Procurement documents — contracts, purchase orders, tenders, and requisitions — shall be centrally archived with appropriate access controls."),
                  createVNode("li", null, [
                    createTextVNode("Critical records shall be retained for a minimum of "),
                    createVNode("strong", null, "seven years"),
                    createTextVNode(", and other documents for at least "),
                    createVNode("strong", null, "three years"),
                    createTextVNode(", after which they are securely disposed of per applicable regulations.")
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "Master data and receipt"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Requests to create, modify, or extend material or service master records MUST be submitted to the Procurement Department with complete and accurate End-User details; asset codes remain the responsibility of the Finance Department."),
                  createVNode("li", null, "End-Users MUST generate Goods Receipt Notes (GRNs) and Service Entry Sheets (SESs) in the Digital Procurement System promptly upon receipt, verifying deliveries and completing supplier performance evaluations to ensure timely vendor payments.")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Policy maintenance"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "The Procurement Department is responsible for maintaining and updating this policy."),
                  createVNode("li", null, "Revisions are invalid unless authorized and formally approved per the authorities delegated by the Nebras Board of Managers, then communicated to all relevant departments.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdRelatedCards, {
        eyebrow: "Read alongside",
        title: "Related policies"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdRelatedCard, {
              href: "/internal/policies/outsourcing",
              category: "Governance & Oversight",
              title: "Outsourcing Policy",
              desc: "How outsourcing arrangements are governed once a provider has been sourced and selected through procurement."
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRelatedCard, {
              href: "/internal/policies/enterprise-risk-management",
              category: "Risk, Security & Compliance",
              title: "Enterprise Risk Management Policy",
              desc: "The risk framework under which vendor, CSP, and third-party risks are assessed and managed."
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdRelatedCard, {
                href: "/internal/policies/outsourcing",
                category: "Governance & Oversight",
                title: "Outsourcing Policy",
                desc: "How outsourcing arrangements are governed once a provider has been sourced and selected through procurement."
              }),
              createVNode(_component_EdRelatedCard, {
                href: "/internal/policies/enterprise-risk-management",
                category: "Risk, Security & Compliance",
                title: "Enterprise Risk Management Policy",
                desc: "The risk framework under which vendor, CSP, and third-party risks are assessed and managed."
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/internal/policies/procurement.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const procurement = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-84150726"]]);
export {
  procurement as default
};
