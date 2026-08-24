import { E as EdCode } from "./EdCode-BQ4YLUeg.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as _sfc_main$1 } from "./APIFlowsBankDataSharing-6DTJNK8A.js";
import { _ as __unplugin_components_8 } from "./APIFlowViewer-C5xJUdUs.js";
import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { defineComponent, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "mermaid";
import "./useChartTheme-DtmiKid7.js";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const accountsListJson = `{
  "data": [
    {
      "id": "acc-001",
      "accountType": "Retail",
      "accountSubType": "CurrentAccount",
      "currency": "AED",
      "status": "Active",
      "accountHolderName": "Ahmed Al Mansouri",
      "servicer": {
        "schemeName": "BICFI",
        "identification": "BANKAEAAXXX"
      },
      "accountNumbers": [
        {
          "schemeName": "IBAN",
          "identification": "AE070331234567890123456"
        }
      ],
      "customers": [
        { "id": "cust-001" }
      ],
      "product": {
        "id": "prod-current-01",
        "productName": "Everyday Current Account"
      }
    }
  ],
  "meta": {
    "totalPages": 1,
    "totalRecords": 1
  }
}
`;
const accountByIdJson = `{
  "data": {
    "id": "acc-001",
    "accountType": "Retail",
    "accountSubType": "CurrentAccount",
    "currency": "AED",
    "status": "Active",
    "accountHolderName": "Ahmed Al Mansouri",
    "servicer": {
      "schemeName": "BICFI",
      "identification": "BANKAEAAXXX"
    },
    "accountNumbers": [
      {
        "schemeName": "IBAN",
        "identification": "AE070331234567890123456"
      }
    ],
    "customers": [
      { "id": "cust-001" }
    ],
    "product": {
      "id": "prod-current-01",
      "productName": "Everyday Current Account"
    }
  },
  "meta": {}
}
`;
const balancesJson = `{
  "data": [
    {
      "accountId": "acc-001",
      "balanceType": "InterimAvailable",
      "creditDebitIndicator": "Credit",
      "timestamp": "2026-04-13T10:15:00Z",
      "amount": { "amount": "12345.67", "currency": "AED" }
    },
    {
      "accountId": "acc-001",
      "balanceType": "ClosingBooked",
      "creditDebitIndicator": "Credit",
      "timestamp": "2026-04-12T23:59:59Z",
      "amount": { "amount": "12000.00", "currency": "AED" }
    }
  ],
  "meta": { "totalPages": 1, "totalRecords": 2 }
}
`;
const transactionsJson = `{
  "data": [
    {
      "accountId": "acc-001",
      "transactionId": "txn-900123",
      "transactionDateTime": "2026-04-12T14:22:11Z",
      "bookingDateTime": "2026-04-12T14:22:11Z",
      "valueDateTime": "2026-04-12T14:22:11Z",
      "transactionType": "POS",
      "subTransactionType": "CardPurchase",
      "creditDebitIndicator": "Debit",
      "status": "Booked",
      "amount": { "amount": "42.50", "currency": "AED" },
      "transactionInformation": "CARREFOUR MALL OF THE EMIRATES",
      "transactionReference": "POS-20260412-900123",
      "balance": {
        "creditDebitIndicator": "Credit",
        "balanceType": "InterimAvailable",
        "amount": { "amount": "12345.67", "currency": "AED" }
      },
      "merchantDetails": {
        "merchantName": "Carrefour",
        "merchantCategoryCode": "5411"
      }
    }
  ],
  "meta": {
    "paginated": true,
    "totalPages": 12,
    "totalRecords": 1187
  }
}
`;
const statementsJson = `{
  "data": [
    {
      "accountId": "acc-001",
      "accountSubType": "CurrentAccount",
      "statementId": "stmt-2026-03",
      "statementDate": "2026-03-31",
      "openingDate": "2026-03-01",
      "closingDate": "2026-03-31",
      "openingBalance": {
        "creditDebitIndicator": "Credit",
        "amount": "10000.00",
        "currency": "AED"
      },
      "closingBalance": {
        "creditDebitIndicator": "Credit",
        "amount": "12345.67",
        "currency": "AED"
      },
      "summary": [
        {
          "creditDebitIndicator": "Credit",
          "subTransactionType": "SalaryCredit",
          "amount": "18000.00",
          "count": 1
        },
        {
          "creditDebitIndicator": "Debit",
          "subTransactionType": "CardPurchase",
          "amount": "5234.33",
          "count": 42
        }
      ]
    }
  ],
  "meta": {
    "paginated": true,
    "totalPages": 3,
    "totalRecords": 24
  }
}
`;
const beneficiariesJson = `{
  "data": [
    {
      "accountId": "acc-001",
      "beneficiaryId": "ben-00123",
      "beneficiaryType": "Trusted",
      "addedViaOF": false,
      "reference": "Rent March",
      "creditorAccount": {
        "schemeName": "IBAN",
        "identification": "AE220331234567890876543",
        "name": "Fatima Al Zaabi"
      },
      "servicer": {
        "schemeName": "BICFI",
        "identification": "BANKAEAAXXX"
      }
    }
  ],
  "meta": { "totalPages": 1, "totalRecords": 1 }
}
`;
const directDebitsJson = `{
  "data": [
    {
      "accountId": "acc-001",
      "directDebitId": "dd-4471",
      "mandateIdentification": "MANDATE-4471",
      "directDebitStatusCode": "Active",
      "name": "DEWA",
      "frequency": "Monthly",
      "previousPaymentDateTime": "2026-03-15T00:00:00Z",
      "previousPaymentAmount": { "amount": "320.15", "currency": "AED" }
    }
  ],
  "meta": { "totalPages": 1, "totalRecords": 1 }
}
`;
const scheduledPaymentsJson = `{
  "data": [
    {
      "accountId": "acc-001",
      "scheduledPaymentId": "sp-9981",
      "scheduledType": "Execution",
      "scheduledPaymentDateTime": "2026-04-20T09:00:00Z",
      "instructedAmount": { "amount": "1500.00", "currency": "AED" },
      "creditorAccount": {
        "schemeName": "IBAN",
        "identification": "AE220331234567890876543",
        "name": "Fatima Al Zaabi"
      },
      "creditorReference": "Rent April",
      "debtorReference": "Rent April"
    }
  ],
  "meta": { "totalPages": 1, "totalRecords": 1 }
}
`;
const standingOrdersJson = `{
  "data": [
    {
      "accountId": "acc-001",
      "standingOrderId": "so-7712",
      "standingOrderStatusCode": "Active",
      "frequency": "EvryMnth",
      "firstPaymentDateTime": "2025-10-01T00:00:00Z",
      "firstPaymentAmount": { "amount": "2500.00", "currency": "AED" },
      "nextPaymentDateTime": "2026-05-01T00:00:00Z",
      "nextPaymentAmount": { "amount": "2500.00", "currency": "AED" },
      "creditorAccount": {
        "schemeName": "IBAN",
        "identification": "AE220331234567890876543",
        "name": "Fatima Al Zaabi"
      },
      "standingOrderType": "FixedAmount"
    }
  ],
  "meta": { "totalPages": 1, "totalRecords": 1 }
}
`;
const productsJson = `{
  "data": [
    {
      "accountId": "acc-001",
      "productId": "prod-current-01",
      "productName": "Everyday Current Account",
      "productType": "CurrentAccount",
      "fees": [
        {
          "feeType": "MonthlyMaintenance",
          "amount": { "amount": "25.00", "currency": "AED" }
        }
      ],
      "benefits": [
        { "benefitType": "FreeATMWithdrawals", "description": "Unlimited free ATM withdrawals within the UAE" }
      ]
    }
  ],
  "meta": { "totalPages": 1, "totalRecords": 1 }
}
`;
const customerRetailJson = `{
  "data": [
    {
      "id": "cust-001",
      "customerType": "Sole",
      "customerCategory": "Retail",
      "accountRole": "Principal",
      "verifiedClaims": [
        {
          "verification": { "trustFramework": "UAE.FI" },
          "claims": {
            "identityType": "Person",
            "fullName": "Ahmed Al Mansouri",
            "givenName": "Ahmed",
            "familyName": "Al Mansouri",
            "emiratesId": "784-1985-1234567-1",
            "emiratesIdExpiryDate": "2029-06-15",
            "birthDate": "1985-06-14",
            "nationality": "AE",
            "mobileNumber": "+971501234567",
            "email": "ahmed@example.ae",
            "residentialAddress": {
              "streetAddress": "Building 12, Marina Walk",
              "locality": "Dubai",
              "country": "AE"
            }
          }
        }
      ]
    }
  ],
  "meta": { "totalPages": 1, "totalRecords": 1 }
}
`;
const customerCorporateJson = `{
  "data": [
    {
      "id": "cust-002",
      "customerType": "Sole",
      "customerCategory": "Corporate",
      "accountRole": "Principal",
      "verifiedClaims": [
        {
          "verification": { "trustFramework": "UAE.FI" },
          "claims": {
            "identityType": "Organisation",
            "businessName": "Al Mansouri Trading LLC",
            "tradeLicenceNumber": "DED-123456",
            "taxIdentificationNumber": "100123456700003",
            "dateOfIncorporation": "2015-02-10",
            "countryOfIncorporation": "AE",
            "corporateAddress": {
              "streetAddress": "Office 402, Business Bay Tower",
              "locality": "Dubai",
              "country": "AE"
            }
          }
        }
      ]
    }
  ],
  "meta": { "totalPages": 1, "totalRecords": 1 }
}
`;
const customerPsuJson = `{
  "data": {
    "id": "cust-001",
    "customerCategory": "Retail",
    "verifiedClaims": [
      {
        "verification": { "trustFramework": "UAE.FI" },
        "claims": {
          "identityType": "Person",
          "fullName": "Ahmed Al Mansouri",
          "givenName": "Ahmed",
          "familyName": "Al Mansouri",
          "emiratesId": "784-1985-1234567-1",
          "emiratesIdExpiryDate": "2029-06-15",
          "residentialAddress": {
            "streetAddress": "Building 12, Marina Walk",
            "locality": "Dubai",
            "country": "AE"
          }
        }
      }
    ]
  },
  "meta": {}
}
`;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdBullets = __unplugin_components_5;
      const _component_APIFlowViewer = __unplugin_components_8;
      const _component_APIFlowsBankDataSharing = _sfc_main$1;
      const _component_EdNote = __unplugin_components_7;
      const _component_EdRefTable = __unplugin_components_12;
      const _component_EdCode = EdCode;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-ee50c514><section class="ed-doc__hero" data-v-ee50c514><div class="ed-doc__inner" data-v-ee50c514><div class="ed-doc__eyebrow" data-v-ee50c514><span class="ed-doc__eyebrow-dash" data-v-ee50c514></span> LFI · Banking · Bank Data Sharing </div><h1 class="ed-doc__title" data-v-ee50c514> Bank Data Sharing — API Guide <span class="ed-doc__read" data-v-ee50c514>12 min read</span></h1><p class="ed-doc__lede" data-v-ee50c514> Bank Data Sharing lets a TPP retrieve a customer&#39;s account list, account details, balances, transactions, statements, beneficiaries, direct debits, scheduled payments, standing orders, products, and customer details from your LFI via the API Hub. This guide covers the Ozone Connect endpoints your LFI MUST implement so the Hub can serve TPP requests. </p><p class="ed-doc__lede" data-v-ee50c514> The behavioural rules for each endpoint — including account status handling, required field population, and <code data-v-ee50c514>AccountSubType</code> coverage — are in the <a href="/tech/lfi-api-hub/v2.1/banking/data-sharing/requirements" data-v-ee50c514>Bank Data Sharing Requirements</a>. This guide covers the request and response shape of each endpoint. </p><p class="ed-doc__lede" data-v-ee50c514> To see what the TPP receives for each field you return — and which consent permission exposes it — see the Field Mapping pages, one per endpoint, starting with <a href="/tech/lfi-api-hub/v2.1/banking/data-sharing/field-mapping/accounts" data-v-ee50c514><code data-v-ee50c514>GET /accounts</code></a>. </p></div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "prerequisites",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Prerequisites",
        title: "What must be in place before you implement",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Before implementing Bank Data Sharing, ensure the following are in place:`);
                } else {
                  return [
                    createTextVNode("Before implementing Bank Data Sharing, ensure the following are in place:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-ee50c514${_scopeId2}><strong data-v-ee50c514${_scopeId2}>API Hub onboarded</strong> — Your API Hub instance is provisioned and your <a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/" data-v-ee50c514${_scopeId2}>environment-specific configuration</a> is complete. </li><li data-v-ee50c514${_scopeId2}><strong data-v-ee50c514${_scopeId2}>Consent Journey implemented</strong> — The <a href="/tech/lfi-api-hub/v2.1/consent-journey/api-guide" data-v-ee50c514${_scopeId2}>Consent Journey API Guide</a> MUST be implemented first. A Bank Data Sharing request cannot be served without an authorized consent, so <span class="endpoint" data-v-ee50c514${_scopeId2}><span class="http-method http-method--get" data-v-ee50c514${_scopeId2}>GET</span><code data-v-ee50c514${_scopeId2}>/auth</code></span>, <span class="endpoint" data-v-ee50c514${_scopeId2}><span class="http-method http-method--get" data-v-ee50c514${_scopeId2}>GET</span><code data-v-ee50c514${_scopeId2}>/consents/{consentId}</code></span>, <span class="endpoint" data-v-ee50c514${_scopeId2}><span class="http-method http-method--patch" data-v-ee50c514${_scopeId2}>PATCH</span><code data-v-ee50c514${_scopeId2}>/consents/{consentId}</code></span>, <span class="endpoint" data-v-ee50c514${_scopeId2}><span class="http-method http-method--post" data-v-ee50c514${_scopeId2}>POST</span><code data-v-ee50c514${_scopeId2}>/auth/{interactionId}/doConfirm</code></span>, and <span class="endpoint" data-v-ee50c514${_scopeId2}><span class="http-method http-method--post" data-v-ee50c514${_scopeId2}>POST</span><code data-v-ee50c514${_scopeId2}>/auth/{interactionId}/doFail</code></span> must already be in place. </li><li data-v-ee50c514${_scopeId2}><strong data-v-ee50c514${_scopeId2}>Ozone Connect connectivity verified</strong> — Bidirectional mTLS connectivity is confirmed between the API Hub and your Ozone Connect base URL. See <a href="/tech/lfi-api-hub/v2.1/api-hub/connectivity/" data-v-ee50c514${_scopeId2}>Connectivity &amp; Certificates</a>. </li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "API Hub onboarded"),
                      createTextVNode(" — Your API Hub instance is provisioned and your "),
                      createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/" }, "environment-specific configuration"),
                      createTextVNode(" is complete. ")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Consent Journey implemented"),
                      createTextVNode(" — The "),
                      createVNode("a", { href: "/tech/lfi-api-hub/v2.1/consent-journey/api-guide" }, "Consent Journey API Guide"),
                      createTextVNode(" MUST be implemented first. A Bank Data Sharing request cannot be served without an authorized consent, so "),
                      createVNode("span", { class: "endpoint" }, [
                        createVNode("span", { class: "http-method http-method--get" }, "GET"),
                        createVNode("code", null, "/auth")
                      ]),
                      createTextVNode(", "),
                      createVNode("span", { class: "endpoint" }, [
                        createVNode("span", { class: "http-method http-method--get" }, "GET"),
                        createVNode("code", null, "/consents/{consentId}")
                      ]),
                      createTextVNode(", "),
                      createVNode("span", { class: "endpoint" }, [
                        createVNode("span", { class: "http-method http-method--patch" }, "PATCH"),
                        createVNode("code", null, "/consents/{consentId}")
                      ]),
                      createTextVNode(", "),
                      createVNode("span", { class: "endpoint" }, [
                        createVNode("span", { class: "http-method http-method--post" }, "POST"),
                        createVNode("code", null, "/auth/{interactionId}/doConfirm")
                      ]),
                      createTextVNode(", and "),
                      createVNode("span", { class: "endpoint" }, [
                        createVNode("span", { class: "http-method http-method--post" }, "POST"),
                        createVNode("code", null, "/auth/{interactionId}/doFail")
                      ]),
                      createTextVNode(" must already be in place. ")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Ozone Connect connectivity verified"),
                      createTextVNode(" — Bidirectional mTLS connectivity is confirmed between the API Hub and your Ozone Connect base URL. See "),
                      createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/connectivity/" }, "Connectivity & Certificates"),
                      createTextVNode(". ")
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
                  createTextVNode("Before implementing Bank Data Sharing, ensure the following are in place:")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "API Hub onboarded"),
                    createTextVNode(" — Your API Hub instance is provisioned and your "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/" }, "environment-specific configuration"),
                    createTextVNode(" is complete. ")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Consent Journey implemented"),
                    createTextVNode(" — The "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.1/consent-journey/api-guide" }, "Consent Journey API Guide"),
                    createTextVNode(" MUST be implemented first. A Bank Data Sharing request cannot be served without an authorized consent, so "),
                    createVNode("span", { class: "endpoint" }, [
                      createVNode("span", { class: "http-method http-method--get" }, "GET"),
                      createVNode("code", null, "/auth")
                    ]),
                    createTextVNode(", "),
                    createVNode("span", { class: "endpoint" }, [
                      createVNode("span", { class: "http-method http-method--get" }, "GET"),
                      createVNode("code", null, "/consents/{consentId}")
                    ]),
                    createTextVNode(", "),
                    createVNode("span", { class: "endpoint" }, [
                      createVNode("span", { class: "http-method http-method--patch" }, "PATCH"),
                      createVNode("code", null, "/consents/{consentId}")
                    ]),
                    createTextVNode(", "),
                    createVNode("span", { class: "endpoint" }, [
                      createVNode("span", { class: "http-method http-method--post" }, "POST"),
                      createVNode("code", null, "/auth/{interactionId}/doConfirm")
                    ]),
                    createTextVNode(", and "),
                    createVNode("span", { class: "endpoint" }, [
                      createVNode("span", { class: "http-method http-method--post" }, "POST"),
                      createVNode("code", null, "/auth/{interactionId}/doFail")
                    ]),
                    createTextVNode(" must already be in place. ")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Ozone Connect connectivity verified"),
                    createTextVNode(" — Bidirectional mTLS connectivity is confirmed between the API Hub and your Ozone Connect base URL. See "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/connectivity/" }, "Connectivity & Certificates"),
                    createTextVNode(". ")
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
        id: "api-sequence-flow",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "API Sequence Flow",
        title: "End-to-end Bank Data Sharing",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_APIFlowViewer, {
              title: "Bank Data Sharing API Flow",
              downloadUrl: "/images/consent-flows/uae-data-sharing-sequence-diagram.png"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_APIFlowsBankDataSharing, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_APIFlowsBankDataSharing)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_APIFlowViewer, {
                title: "Bank Data Sharing API Flow",
                downloadUrl: "/images/consent-flows/uae-data-sharing-sequence-diagram.png"
              }, {
                default: withCtx(() => [
                  createVNode(_component_APIFlowsBankDataSharing)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "consent-validation",
        num: "03",
        color: "var(--at-blue-deep, #1d4ed8)",
        eyebrow: "Consent validation",
        title: "Validate the consent before it is created",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` During consent creation, if your LFI has configured the <a href="/tech/lfi-api-hub/v2.1/consent-events/open-api/validate" class="endpoint" data-v-ee50c514${_scopeId2}><span class="http-method http-method--post" data-v-ee50c514${_scopeId2}>POST</span><code data-v-ee50c514${_scopeId2}>/consent/action/validate</code></a> endpoint, the API Hub forwards the full consent payload to your Ozone Connect server <strong data-v-ee50c514${_scopeId2}>before</strong> the consent is created. The request and response shape, and the overall placement of this call in the consent lifecycle, are covered in the <a href="/tech/lfi-api-hub/v2.1/consent-journey/api-guide#step-2-optional-validate-the-consent" data-v-ee50c514${_scopeId2}>Consent Journey API Guide — Validate the consent</a>. `);
                } else {
                  return [
                    createTextVNode(" During consent creation, if your LFI has configured the "),
                    createVNode("a", {
                      href: "/tech/lfi-api-hub/v2.1/consent-events/open-api/validate",
                      class: "endpoint"
                    }, [
                      createVNode("span", { class: "http-method http-method--post" }, "POST"),
                      createVNode("code", null, "/consent/action/validate")
                    ]),
                    createTextVNode(" endpoint, the API Hub forwards the full consent payload to your Ozone Connect server "),
                    createVNode("strong", null, "before"),
                    createTextVNode(" the consent is created. The request and response shape, and the overall placement of this call in the consent lifecycle, are covered in the "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.1/consent-journey/api-guide#step-2-optional-validate-the-consent" }, "Consent Journey API Guide — Validate the consent"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` For Bank Data Sharing consents (<code data-v-ee50c514${_scopeId2}>consentType: cbuae-account-access-consents</code>), your LFI MUST respond with <code data-v-ee50c514${_scopeId2}>data.status: invalid</code> in the cases listed in <a href="/tech/lfi-api-hub/v2.1/banking/data-sharing/requirements#consent-validation" data-v-ee50c514${_scopeId2}>Bank Data Sharing Requirements — Consent Validation</a>. `);
                } else {
                  return [
                    createTextVNode(" For Bank Data Sharing consents ("),
                    createVNode("code", null, "consentType: cbuae-account-access-consents"),
                    createTextVNode("), your LFI MUST respond with "),
                    createVNode("code", null, "data.status: invalid"),
                    createTextVNode(" in the cases listed in "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/requirements#consent-validation" }, "Bank Data Sharing Requirements — Consent Validation"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "info",
              title: "Strongly recommended"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-ee50c514${_scopeId2}> If the validate endpoint is not configured, the API Hub assumes all consents are valid and creates them immediately — those checks then cannot be enforced. Configuring the endpoint is strongly recommended for Bank Data Sharing. </p>`);
                } else {
                  return [
                    createVNode("p", null, " If the validate endpoint is not configured, the API Hub assumes all consents are valid and creates them immediately — those checks then cannot be enforced. Configuring the endpoint is strongly recommended for Bank Data Sharing. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" During consent creation, if your LFI has configured the "),
                  createVNode("a", {
                    href: "/tech/lfi-api-hub/v2.1/consent-events/open-api/validate",
                    class: "endpoint"
                  }, [
                    createVNode("span", { class: "http-method http-method--post" }, "POST"),
                    createVNode("code", null, "/consent/action/validate")
                  ]),
                  createTextVNode(" endpoint, the API Hub forwards the full consent payload to your Ozone Connect server "),
                  createVNode("strong", null, "before"),
                  createTextVNode(" the consent is created. The request and response shape, and the overall placement of this call in the consent lifecycle, are covered in the "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/consent-journey/api-guide#step-2-optional-validate-the-consent" }, "Consent Journey API Guide — Validate the consent"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" For Bank Data Sharing consents ("),
                  createVNode("code", null, "consentType: cbuae-account-access-consents"),
                  createTextVNode("), your LFI MUST respond with "),
                  createVNode("code", null, "data.status: invalid"),
                  createTextVNode(" in the cases listed in "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/requirements#consent-validation" }, "Bank Data Sharing Requirements — Consent Validation"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "info",
                title: "Strongly recommended"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, " If the validate endpoint is not configured, the API Hub assumes all consents are valid and creates them immediately — those checks then cannot be enforced. Configuring the endpoint is strongly recommended for Bank Data Sharing. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "consent-flow",
        num: "04",
        color: "var(--at-navy)",
        eyebrow: "Consent flow",
        title: "Authorize the customer at your LFI",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Once the consent has been created, the TPP redirects the customer to your LFI&#39;s <a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/auth-endpoint" data-v-ee50c514${_scopeId2}>authorization endpoint</a> — the URL you registered during API Hub onboarding. From there, your LFI runs the standard consent journey: authenticate the customer, retrieve the consent, let the customer approve or reject it, patch the authorized accounts and customer identifier onto the consent, and redirect back to the Hub. `);
                } else {
                  return [
                    createTextVNode(" Once the consent has been created, the TPP redirects the customer to your LFI's "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/auth-endpoint" }, "authorization endpoint"),
                    createTextVNode(" — the URL you registered during API Hub onboarding. From there, your LFI runs the standard consent journey: authenticate the customer, retrieve the consent, let the customer approve or reject it, patch the authorized accounts and customer identifier onto the consent, and redirect back to the Hub. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`The endpoints your LFI implements against the API Hub for this flow are:`);
                } else {
                  return [
                    createTextVNode("The endpoints your LFI implements against the API Hub for this flow are:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-ee50c514${_scopeId2}><thead data-v-ee50c514${_scopeId2}><tr data-v-ee50c514${_scopeId2}><th data-v-ee50c514${_scopeId2}>Endpoint</th><th data-v-ee50c514${_scopeId2}>Direction</th><th data-v-ee50c514${_scopeId2}>Purpose</th></tr></thead><tbody data-v-ee50c514${_scopeId2}><tr data-v-ee50c514${_scopeId2}><td data-v-ee50c514${_scopeId2}><a href="/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/open-api/auth" class="endpoint" data-v-ee50c514${_scopeId2}><span class="http-method http-method--get" data-v-ee50c514${_scopeId2}>GET</span><code data-v-ee50c514${_scopeId2}>/auth</code></a></td><td data-v-ee50c514${_scopeId2}>LFI → API Hub</td><td data-v-ee50c514${_scopeId2}>Initiate the authorization interaction</td></tr><tr data-v-ee50c514${_scopeId2}><td data-v-ee50c514${_scopeId2}><a href="/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consents-consentId" class="endpoint" data-v-ee50c514${_scopeId2}><span class="http-method http-method--get" data-v-ee50c514${_scopeId2}>GET</span><code data-v-ee50c514${_scopeId2}>/consents/{consentId}</code></a></td><td data-v-ee50c514${_scopeId2}>LFI → API Hub</td><td data-v-ee50c514${_scopeId2}>Retrieve the full consent details</td></tr><tr data-v-ee50c514${_scopeId2}><td data-v-ee50c514${_scopeId2}><a href="/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/patch-consents-consentId" class="endpoint" data-v-ee50c514${_scopeId2}><span class="http-method http-method--patch" data-v-ee50c514${_scopeId2}>PATCH</span><code data-v-ee50c514${_scopeId2}>/consents/{consentId}</code></a></td><td data-v-ee50c514${_scopeId2}>LFI → API Hub</td><td data-v-ee50c514${_scopeId2}>Update consent status, customer identifiers, and account IDs</td></tr><tr data-v-ee50c514${_scopeId2}><td data-v-ee50c514${_scopeId2}><a href="/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/open-api/auth-interactionId-doConfirm" class="endpoint" data-v-ee50c514${_scopeId2}><span class="http-method http-method--post" data-v-ee50c514${_scopeId2}>POST</span><code data-v-ee50c514${_scopeId2}>/auth/{interactionId}/doConfirm</code></a></td><td data-v-ee50c514${_scopeId2}>LFI → API Hub</td><td data-v-ee50c514${_scopeId2}>Complete the interaction and redirect back to the TPP successfully</td></tr><tr data-v-ee50c514${_scopeId2}><td data-v-ee50c514${_scopeId2}><a href="/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/open-api/auth-interactionId-doFail" class="endpoint" data-v-ee50c514${_scopeId2}><span class="http-method http-method--post" data-v-ee50c514${_scopeId2}>POST</span><code data-v-ee50c514${_scopeId2}>/auth/{interactionId}/doFail</code></a></td><td data-v-ee50c514${_scopeId2}>LFI → API Hub</td><td data-v-ee50c514${_scopeId2}>Complete the interaction and redirect back to the TPP with a failure</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Endpoint"),
                          createVNode("th", null, "Direction"),
                          createVNode("th", null, "Purpose")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("a", {
                              href: "/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/open-api/auth",
                              class: "endpoint"
                            }, [
                              createVNode("span", { class: "http-method http-method--get" }, "GET"),
                              createVNode("code", null, "/auth")
                            ])
                          ]),
                          createVNode("td", null, "LFI → API Hub"),
                          createVNode("td", null, "Initiate the authorization interaction")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("a", {
                              href: "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consents-consentId",
                              class: "endpoint"
                            }, [
                              createVNode("span", { class: "http-method http-method--get" }, "GET"),
                              createVNode("code", null, "/consents/{consentId}")
                            ])
                          ]),
                          createVNode("td", null, "LFI → API Hub"),
                          createVNode("td", null, "Retrieve the full consent details")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("a", {
                              href: "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/patch-consents-consentId",
                              class: "endpoint"
                            }, [
                              createVNode("span", { class: "http-method http-method--patch" }, "PATCH"),
                              createVNode("code", null, "/consents/{consentId}")
                            ])
                          ]),
                          createVNode("td", null, "LFI → API Hub"),
                          createVNode("td", null, "Update consent status, customer identifiers, and account IDs")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("a", {
                              href: "/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/open-api/auth-interactionId-doConfirm",
                              class: "endpoint"
                            }, [
                              createVNode("span", { class: "http-method http-method--post" }, "POST"),
                              createVNode("code", null, "/auth/{interactionId}/doConfirm")
                            ])
                          ]),
                          createVNode("td", null, "LFI → API Hub"),
                          createVNode("td", null, "Complete the interaction and redirect back to the TPP successfully")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("a", {
                              href: "/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/open-api/auth-interactionId-doFail",
                              class: "endpoint"
                            }, [
                              createVNode("span", { class: "http-method http-method--post" }, "POST"),
                              createVNode("code", null, "/auth/{interactionId}/doFail")
                            ])
                          ]),
                          createVNode("td", null, "LFI → API Hub"),
                          createVNode("td", null, "Complete the interaction and redirect back to the TPP with a failure")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Full details are in the <a href="/tech/lfi-api-hub/v2.1/consent-journey/api-guide" data-v-ee50c514${_scopeId2}>Consent Journey API Guide</a>. `);
                } else {
                  return [
                    createTextVNode(" Full details are in the "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.1/consent-journey/api-guide" }, "Consent Journey API Guide"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-ee50c514${_scopeId}>After the consent is authorized</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Every request the TPP makes to the API Hub&#39;s resource server — for example, <code data-v-ee50c514${_scopeId2}>https://rs1.LFICODE.apihub.openfinance.ae/open-finance/account-information/v2.1/accounts</code> — MUST carry an access token bound to the authorized consent. `);
                } else {
                  return [
                    createTextVNode(" Every request the TPP makes to the API Hub's resource server — for example, "),
                    createVNode("code", null, "https://rs1.LFICODE.apihub.openfinance.ae/open-finance/account-information/v2.1/accounts"),
                    createTextVNode(" — MUST carry an access token bound to the authorized consent. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`The API Hub then performs the following checks before any traffic reaches your LFI:`);
                } else {
                  return [
                    createTextVNode("The API Hub then performs the following checks before any traffic reaches your LFI:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-ee50c514${_scopeId2}>Validates the access token</li><li data-v-ee50c514${_scopeId2}>Validates that the consent is in <code data-v-ee50c514${_scopeId2}>Authorised</code> status</li><li data-v-ee50c514${_scopeId2}> Validates that the consent grants access to the requested resource — e.g. <code data-v-ee50c514${_scopeId2}>ReadAccountsBasic</code> or <code data-v-ee50c514${_scopeId2}>ReadAccountsDetail</code> is required to call <span class="endpoint" data-v-ee50c514${_scopeId2}><span class="http-method http-method--get" data-v-ee50c514${_scopeId2}>GET</span><code data-v-ee50c514${_scopeId2}>/open-finance/account-information/v2.1/accounts</code></span></li><li data-v-ee50c514${_scopeId2}> For endpoints scoped to a specific account, validates that the <code data-v-ee50c514${_scopeId2}>{accountId}</code> path parameter is one of the accounts the LFI patched onto the consent at authorization. For <span class="endpoint" data-v-ee50c514${_scopeId2}><span class="http-method http-method--get" data-v-ee50c514${_scopeId2}>GET</span><code data-v-ee50c514${_scopeId2}>/accounts</code></span>, the same set is supplied to your Ozone Connect endpoint as the <code data-v-ee50c514${_scopeId2}>accountIds</code> query parameter </li><li data-v-ee50c514${_scopeId2}>Validates that the TPP holds the role required to call the endpoint (e.g. <code data-v-ee50c514${_scopeId2}>BDSP</code> for Bank Data Sharing)</li>`);
                } else {
                  return [
                    createVNode("li", null, "Validates the access token"),
                    createVNode("li", null, [
                      createTextVNode("Validates that the consent is in "),
                      createVNode("code", null, "Authorised"),
                      createTextVNode(" status")
                    ]),
                    createVNode("li", null, [
                      createTextVNode(" Validates that the consent grants access to the requested resource — e.g. "),
                      createVNode("code", null, "ReadAccountsBasic"),
                      createTextVNode(" or "),
                      createVNode("code", null, "ReadAccountsDetail"),
                      createTextVNode(" is required to call "),
                      createVNode("span", { class: "endpoint" }, [
                        createVNode("span", { class: "http-method http-method--get" }, "GET"),
                        createVNode("code", null, "/open-finance/account-information/v2.1/accounts")
                      ])
                    ]),
                    createVNode("li", null, [
                      createTextVNode(" For endpoints scoped to a specific account, validates that the "),
                      createVNode("code", null, "{accountId}"),
                      createTextVNode(" path parameter is one of the accounts the LFI patched onto the consent at authorization. For "),
                      createVNode("span", { class: "endpoint" }, [
                        createVNode("span", { class: "http-method http-method--get" }, "GET"),
                        createVNode("code", null, "/accounts")
                      ]),
                      createTextVNode(", the same set is supplied to your Ozone Connect endpoint as the "),
                      createVNode("code", null, "accountIds"),
                      createTextVNode(" query parameter ")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("Validates that the TPP holds the role required to call the endpoint (e.g. "),
                      createVNode("code", null, "BDSP"),
                      createTextVNode(" for Bank Data Sharing)")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` If all checks pass, the Hub proxies the request to your Ozone Connect base URL, enriching it with the headers listed in <a href="#common-request-headers" data-v-ee50c514${_scopeId2}>Common request headers</a>. The headers most relevant to your LFI are: `);
                } else {
                  return [
                    createTextVNode(" If all checks pass, the Hub proxies the request to your Ozone Connect base URL, enriching it with the headers listed in "),
                    createVNode("a", { href: "#common-request-headers" }, "Common request headers"),
                    createTextVNode(". The headers most relevant to your LFI are: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-ee50c514${_scopeId2}><code data-v-ee50c514${_scopeId2}>o3-consent-id</code> — the authorized consent backing this call</li><li data-v-ee50c514${_scopeId2}><code data-v-ee50c514${_scopeId2}>o3-psu-identifier</code> — the opaque reference your LFI patched onto the consent during the <a href="#consent-flow" data-v-ee50c514${_scopeId2}>Consent flow</a>, identifying the customer inside your systems</li><li data-v-ee50c514${_scopeId2}><code data-v-ee50c514${_scopeId2}>o3-api-uri</code> — the parameterised URL the TPP called</li><li data-v-ee50c514${_scopeId2}><code data-v-ee50c514${_scopeId2}>o3-ozone-interaction-id</code> — a per-request correlation ID for debugging</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("code", null, "o3-consent-id"),
                      createTextVNode(" — the authorized consent backing this call")
                    ]),
                    createVNode("li", null, [
                      createVNode("code", null, "o3-psu-identifier"),
                      createTextVNode(" — the opaque reference your LFI patched onto the consent during the "),
                      createVNode("a", { href: "#consent-flow" }, "Consent flow"),
                      createTextVNode(", identifying the customer inside your systems")
                    ]),
                    createVNode("li", null, [
                      createVNode("code", null, "o3-api-uri"),
                      createTextVNode(" — the parameterised URL the TPP called")
                    ]),
                    createVNode("li", null, [
                      createVNode("code", null, "o3-ozone-interaction-id"),
                      createTextVNode(" — a per-request correlation ID for debugging")
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
                  createTextVNode(" Once the consent has been created, the TPP redirects the customer to your LFI's "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/auth-endpoint" }, "authorization endpoint"),
                  createTextVNode(" — the URL you registered during API Hub onboarding. From there, your LFI runs the standard consent journey: authenticate the customer, retrieve the consent, let the customer approve or reject it, patch the authorized accounts and customer identifier onto the consent, and redirect back to the Hub. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("The endpoints your LFI implements against the API Hub for this flow are:")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Endpoint"),
                        createVNode("th", null, "Direction"),
                        createVNode("th", null, "Purpose")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("a", {
                            href: "/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/open-api/auth",
                            class: "endpoint"
                          }, [
                            createVNode("span", { class: "http-method http-method--get" }, "GET"),
                            createVNode("code", null, "/auth")
                          ])
                        ]),
                        createVNode("td", null, "LFI → API Hub"),
                        createVNode("td", null, "Initiate the authorization interaction")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("a", {
                            href: "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consents-consentId",
                            class: "endpoint"
                          }, [
                            createVNode("span", { class: "http-method http-method--get" }, "GET"),
                            createVNode("code", null, "/consents/{consentId}")
                          ])
                        ]),
                        createVNode("td", null, "LFI → API Hub"),
                        createVNode("td", null, "Retrieve the full consent details")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("a", {
                            href: "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/patch-consents-consentId",
                            class: "endpoint"
                          }, [
                            createVNode("span", { class: "http-method http-method--patch" }, "PATCH"),
                            createVNode("code", null, "/consents/{consentId}")
                          ])
                        ]),
                        createVNode("td", null, "LFI → API Hub"),
                        createVNode("td", null, "Update consent status, customer identifiers, and account IDs")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("a", {
                            href: "/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/open-api/auth-interactionId-doConfirm",
                            class: "endpoint"
                          }, [
                            createVNode("span", { class: "http-method http-method--post" }, "POST"),
                            createVNode("code", null, "/auth/{interactionId}/doConfirm")
                          ])
                        ]),
                        createVNode("td", null, "LFI → API Hub"),
                        createVNode("td", null, "Complete the interaction and redirect back to the TPP successfully")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("a", {
                            href: "/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/open-api/auth-interactionId-doFail",
                            class: "endpoint"
                          }, [
                            createVNode("span", { class: "http-method http-method--post" }, "POST"),
                            createVNode("code", null, "/auth/{interactionId}/doFail")
                          ])
                        ]),
                        createVNode("td", null, "LFI → API Hub"),
                        createVNode("td", null, "Complete the interaction and redirect back to the TPP with a failure")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Full details are in the "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/consent-journey/api-guide" }, "Consent Journey API Guide"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "After the consent is authorized"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Every request the TPP makes to the API Hub's resource server — for example, "),
                  createVNode("code", null, "https://rs1.LFICODE.apihub.openfinance.ae/open-finance/account-information/v2.1/accounts"),
                  createTextVNode(" — MUST carry an access token bound to the authorized consent. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("The API Hub then performs the following checks before any traffic reaches your LFI:")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Validates the access token"),
                  createVNode("li", null, [
                    createTextVNode("Validates that the consent is in "),
                    createVNode("code", null, "Authorised"),
                    createTextVNode(" status")
                  ]),
                  createVNode("li", null, [
                    createTextVNode(" Validates that the consent grants access to the requested resource — e.g. "),
                    createVNode("code", null, "ReadAccountsBasic"),
                    createTextVNode(" or "),
                    createVNode("code", null, "ReadAccountsDetail"),
                    createTextVNode(" is required to call "),
                    createVNode("span", { class: "endpoint" }, [
                      createVNode("span", { class: "http-method http-method--get" }, "GET"),
                      createVNode("code", null, "/open-finance/account-information/v2.1/accounts")
                    ])
                  ]),
                  createVNode("li", null, [
                    createTextVNode(" For endpoints scoped to a specific account, validates that the "),
                    createVNode("code", null, "{accountId}"),
                    createTextVNode(" path parameter is one of the accounts the LFI patched onto the consent at authorization. For "),
                    createVNode("span", { class: "endpoint" }, [
                      createVNode("span", { class: "http-method http-method--get" }, "GET"),
                      createVNode("code", null, "/accounts")
                    ]),
                    createTextVNode(", the same set is supplied to your Ozone Connect endpoint as the "),
                    createVNode("code", null, "accountIds"),
                    createTextVNode(" query parameter ")
                  ]),
                  createVNode("li", null, [
                    createTextVNode("Validates that the TPP holds the role required to call the endpoint (e.g. "),
                    createVNode("code", null, "BDSP"),
                    createTextVNode(" for Bank Data Sharing)")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" If all checks pass, the Hub proxies the request to your Ozone Connect base URL, enriching it with the headers listed in "),
                  createVNode("a", { href: "#common-request-headers" }, "Common request headers"),
                  createTextVNode(". The headers most relevant to your LFI are: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("code", null, "o3-consent-id"),
                    createTextVNode(" — the authorized consent backing this call")
                  ]),
                  createVNode("li", null, [
                    createVNode("code", null, "o3-psu-identifier"),
                    createTextVNode(" — the opaque reference your LFI patched onto the consent during the "),
                    createVNode("a", { href: "#consent-flow" }, "Consent flow"),
                    createTextVNode(", identifying the customer inside your systems")
                  ]),
                  createVNode("li", null, [
                    createVNode("code", null, "o3-api-uri"),
                    createTextVNode(" — the parameterised URL the TPP called")
                  ]),
                  createVNode("li", null, [
                    createVNode("code", null, "o3-ozone-interaction-id"),
                    createTextVNode(" — a per-request correlation ID for debugging")
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
        id: "conventions",
        num: "05",
        color: "var(--at-teal-deep)",
        eyebrow: "Ozone Connect Data Sharing responses",
        title: "Shared conventions across every endpoint",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The remainder of this guide covers the LFI-facing Ozone Connect endpoints that serve each TPP request after the consent is authorized — the shared conventions (field population, request headers, error responses, pagination) followed by the per-endpoint request and response shapes. `);
                } else {
                  return [
                    createTextVNode(" The remainder of this guide covers the LFI-facing Ozone Connect endpoints that serve each TPP request after the consent is authorized — the shared conventions (field population, request headers, error responses, pagination) followed by the per-endpoint request and response shapes. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-ee50c514${_scopeId}>Field population</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Every field that <strong data-v-ee50c514${_scopeId2}>exists</strong> on the LFI&#39;s systems, or is <strong data-v-ee50c514${_scopeId2}>derivable</strong> from them, MUST be populated in the response. TPPs rely on this data to serve customer use cases end-to-end — a field the LFI omits is a feature the TPP cannot build. The OpenAPI spec marks the minimum required set, but LFIs MUST populate every optional field they hold. `);
                } else {
                  return [
                    createTextVNode(" Every field that "),
                    createVNode("strong", null, "exists"),
                    createTextVNode(" on the LFI's systems, or is "),
                    createVNode("strong", null, "derivable"),
                    createTextVNode(" from them, MUST be populated in the response. TPPs rely on this data to serve customer use cases end-to-end — a field the LFI omits is a feature the TPP cannot build. The OpenAPI spec marks the minimum required set, but LFIs MUST populate every optional field they hold. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` This rule applies to every endpoint in this guide. The endpoint-specific rules in <a href="/tech/lfi-api-hub/v2.1/banking/data-sharing/requirements" data-v-ee50c514${_scopeId2}>Bank Data Sharing Requirements</a> call out fields that are always required for each endpoint. `);
                } else {
                  return [
                    createTextVNode(" This rule applies to every endpoint in this guide. The endpoint-specific rules in "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/requirements" }, "Bank Data Sharing Requirements"),
                    createTextVNode(" call out fields that are always required for each endpoint. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 id="common-request-headers" class="ed-doc__subhead" data-v-ee50c514${_scopeId}>Common request headers</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` All resource endpoints receive the same set of headers from the API Hub. They are listed here and referenced from each endpoint section below. `);
                } else {
                  return [
                    createTextVNode(" All resource endpoints receive the same set of headers from the API Hub. They are listed here and referenced from each endpoint section below. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-ee50c514${_scopeId2}><thead data-v-ee50c514${_scopeId2}><tr data-v-ee50c514${_scopeId2}><th data-v-ee50c514${_scopeId2}>Header</th><th data-v-ee50c514${_scopeId2}>Required</th><th data-v-ee50c514${_scopeId2}>Description</th></tr></thead><tbody data-v-ee50c514${_scopeId2}><tr data-v-ee50c514${_scopeId2}><td data-v-ee50c514${_scopeId2}><code data-v-ee50c514${_scopeId2}>o3-provider-id</code></td><td data-v-ee50c514${_scopeId2}>Yes</td><td data-v-ee50c514${_scopeId2}>Identifier for your LFI registered in the Hub</td></tr><tr data-v-ee50c514${_scopeId2}><td data-v-ee50c514${_scopeId2}><code data-v-ee50c514${_scopeId2}>o3-aspsp-id</code></td><td data-v-ee50c514${_scopeId2}>Yes <em data-v-ee50c514${_scopeId2}>(deprecated)</em></td><td data-v-ee50c514${_scopeId2}>Deprecated alias for <code data-v-ee50c514${_scopeId2}>o3-provider-id</code>. Will be removed in a future version — use <code data-v-ee50c514${_scopeId2}>o3-provider-id</code></td></tr><tr data-v-ee50c514${_scopeId2}><td data-v-ee50c514${_scopeId2}><code data-v-ee50c514${_scopeId2}>o3-caller-org-id</code></td><td data-v-ee50c514${_scopeId2}>Yes</td><td data-v-ee50c514${_scopeId2}>Organisation ID of the TPP making the underlying request</td></tr><tr data-v-ee50c514${_scopeId2}><td data-v-ee50c514${_scopeId2}><code data-v-ee50c514${_scopeId2}>o3-caller-client-id</code></td><td data-v-ee50c514${_scopeId2}>Yes</td><td data-v-ee50c514${_scopeId2}>OIDC client ID of the TPP application</td></tr><tr data-v-ee50c514${_scopeId2}><td data-v-ee50c514${_scopeId2}><code data-v-ee50c514${_scopeId2}>o3-caller-software-statement-id</code></td><td data-v-ee50c514${_scopeId2}>Yes</td><td data-v-ee50c514${_scopeId2}>Software statement ID of the TPP application</td></tr><tr data-v-ee50c514${_scopeId2}><td data-v-ee50c514${_scopeId2}><code data-v-ee50c514${_scopeId2}>o3-api-uri</code></td><td data-v-ee50c514${_scopeId2}>Yes</td><td data-v-ee50c514${_scopeId2}>The parameterised URL of the API being called by the TPP</td></tr><tr data-v-ee50c514${_scopeId2}><td data-v-ee50c514${_scopeId2}><code data-v-ee50c514${_scopeId2}>o3-api-operation</code></td><td data-v-ee50c514${_scopeId2}>Yes</td><td data-v-ee50c514${_scopeId2}>The HTTP method of the operation carried out by the TPP (e.g. <code data-v-ee50c514${_scopeId2}>GET</code>)</td></tr><tr data-v-ee50c514${_scopeId2}><td data-v-ee50c514${_scopeId2}><code data-v-ee50c514${_scopeId2}>o3-consent-id</code></td><td data-v-ee50c514${_scopeId2}>Yes</td><td data-v-ee50c514${_scopeId2}>The consent ID authorising this call</td></tr><tr data-v-ee50c514${_scopeId2}><td data-v-ee50c514${_scopeId2}><code data-v-ee50c514${_scopeId2}>o3-psu-identifier</code></td><td data-v-ee50c514${_scopeId2}>Yes</td><td data-v-ee50c514${_scopeId2}>Base64-encoded representation of the customer identifier JSON object — the opaque LFI-issued reference patched onto the consent at authorization, linking the consent to the authenticated customer</td></tr><tr data-v-ee50c514${_scopeId2}><td data-v-ee50c514${_scopeId2}><code data-v-ee50c514${_scopeId2}>o3-ozone-interaction-id</code></td><td data-v-ee50c514${_scopeId2}>Yes</td><td data-v-ee50c514${_scopeId2}>Hub-generated interaction ID. Equals <code data-v-ee50c514${_scopeId2}>o3-caller-interaction-id</code> if the TPP provided one</td></tr><tr data-v-ee50c514${_scopeId2}><td data-v-ee50c514${_scopeId2}><code data-v-ee50c514${_scopeId2}>o3-caller-interaction-id</code></td><td data-v-ee50c514${_scopeId2}>No</td><td data-v-ee50c514${_scopeId2}>Interaction ID passed in by the TPP, if present</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Header"),
                          createVNode("th", null, "Required"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "o3-provider-id")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, "Identifier for your LFI registered in the Hub")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "o3-aspsp-id")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("Yes "),
                            createVNode("em", null, "(deprecated)")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("Deprecated alias for "),
                            createVNode("code", null, "o3-provider-id"),
                            createTextVNode(". Will be removed in a future version — use "),
                            createVNode("code", null, "o3-provider-id")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "o3-caller-org-id")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, "Organisation ID of the TPP making the underlying request")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "o3-caller-client-id")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, "OIDC client ID of the TPP application")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "o3-caller-software-statement-id")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, "Software statement ID of the TPP application")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "o3-api-uri")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, "The parameterised URL of the API being called by the TPP")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "o3-api-operation")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, [
                            createTextVNode("The HTTP method of the operation carried out by the TPP (e.g. "),
                            createVNode("code", null, "GET"),
                            createTextVNode(")")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "o3-consent-id")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, "The consent ID authorising this call")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "o3-psu-identifier")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, "Base64-encoded representation of the customer identifier JSON object — the opaque LFI-issued reference patched onto the consent at authorization, linking the consent to the authenticated customer")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "o3-ozone-interaction-id")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, [
                            createTextVNode("Hub-generated interaction ID. Equals "),
                            createVNode("code", null, "o3-caller-interaction-id"),
                            createTextVNode(" if the TPP provided one")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "o3-caller-interaction-id")
                          ]),
                          createVNode("td", null, "No"),
                          createVNode("td", null, "Interaction ID passed in by the TPP, if present")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Token and consent validation have already been performed by the Hub before the request reaches your Ozone Connect endpoint. Your LFI does not re-validate the token or consent — it is trusted to be valid. See <a href="/tech/lfi-api-hub/v2.1/banking/data-sharing/requirements" data-v-ee50c514${_scopeId2}>Bank Data Sharing Requirements</a> for what your Ozone Connect endpoints must validate. `);
                } else {
                  return [
                    createTextVNode(" Token and consent validation have already been performed by the Hub before the request reaches your Ozone Connect endpoint. Your LFI does not re-validate the token or consent — it is trusted to be valid. See "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/requirements" }, "Bank Data Sharing Requirements"),
                    createTextVNode(" for what your Ozone Connect endpoints must validate. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 id="common-error-responses" class="ed-doc__subhead" data-v-ee50c514${_scopeId}>Common error responses</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Every <code data-v-ee50c514${_scopeId2}>/accounts/{accountId}/…</code> endpoint MUST check the account&#39;s status before returning data — if the account is not <code data-v-ee50c514${_scopeId2}>Active</code>, the endpoint MUST respond with <code data-v-ee50c514${_scopeId2}>403</code> instead of returning the resource. <span class="endpoint" data-v-ee50c514${_scopeId2}><span class="http-method http-method--get" data-v-ee50c514${_scopeId2}>GET</span><code data-v-ee50c514${_scopeId2}>/accounts</code></span> is the only exception: it lists every consented account regardless of status, with the <code data-v-ee50c514${_scopeId2}>Status</code> field populated so the TPP can observe the current state. `);
                } else {
                  return [
                    createTextVNode(" Every "),
                    createVNode("code", null, "/accounts/{accountId}/…"),
                    createTextVNode(" endpoint MUST check the account's status before returning data — if the account is not "),
                    createVNode("code", null, "Active"),
                    createTextVNode(", the endpoint MUST respond with "),
                    createVNode("code", null, "403"),
                    createTextVNode(" instead of returning the resource. "),
                    createVNode("span", { class: "endpoint" }, [
                      createVNode("span", { class: "http-method http-method--get" }, "GET"),
                      createVNode("code", null, "/accounts")
                    ]),
                    createTextVNode(" is the only exception: it lists every consented account regardless of status, with the "),
                    createVNode("code", null, "Status"),
                    createTextVNode(" field populated so the TPP can observe the current state. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`All error bodies MUST include <code data-v-ee50c514${_scopeId2}>errorCode</code> and <code data-v-ee50c514${_scopeId2}>errorMessage</code>.`);
                } else {
                  return [
                    createTextVNode("All error bodies MUST include "),
                    createVNode("code", null, "errorCode"),
                    createTextVNode(" and "),
                    createVNode("code", null, "errorMessage"),
                    createTextVNode(".")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h4 class="ed-doc__subhead-minor" data-v-ee50c514${_scopeId}><code data-v-ee50c514${_scopeId}>403</code> — Forbidden</h4>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Return <code data-v-ee50c514${_scopeId2}>403</code> using the <a href="/tech/lfi-api-hub/v2.1/banking/data-sharing/requirements#account-status-handling" data-v-ee50c514${_scopeId2}>Account Status Handling</a> mapping: `);
                } else {
                  return [
                    createTextVNode(" Return "),
                    createVNode("code", null, "403"),
                    createTextVNode(" using the "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/requirements#account-status-handling" }, "Account Status Handling"),
                    createTextVNode(" mapping: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-ee50c514${_scopeId2}><thead data-v-ee50c514${_scopeId2}><tr data-v-ee50c514${_scopeId2}><th data-v-ee50c514${_scopeId2}><code data-v-ee50c514${_scopeId2}>errorCode</code></th><th data-v-ee50c514${_scopeId2}><code data-v-ee50c514${_scopeId2}>errorMessage</code></th><th data-v-ee50c514${_scopeId2}>When to use</th></tr></thead><tbody data-v-ee50c514${_scopeId2}><tr data-v-ee50c514${_scopeId2}><td data-v-ee50c514${_scopeId2}><code data-v-ee50c514${_scopeId2}>Consent.AccountTemporarilyBlocked</code></td><td data-v-ee50c514${_scopeId2}><code data-v-ee50c514${_scopeId2}>The account is temporarily blocked.</code></td><td data-v-ee50c514${_scopeId2}>Account status is <code data-v-ee50c514${_scopeId2}>Suspended</code></td></tr><tr data-v-ee50c514${_scopeId2}><td data-v-ee50c514${_scopeId2}><code data-v-ee50c514${_scopeId2}>Consent.PermanentAccountAccessFailure</code></td><td data-v-ee50c514${_scopeId2}><code data-v-ee50c514${_scopeId2}>The account is permanently inaccessible.</code></td><td data-v-ee50c514${_scopeId2}>Account status is <code data-v-ee50c514${_scopeId2}>Closed</code>, <code data-v-ee50c514${_scopeId2}>Deceased</code>, or <code data-v-ee50c514${_scopeId2}>Unclaimed</code></td></tr><tr data-v-ee50c514${_scopeId2}><td data-v-ee50c514${_scopeId2}><code data-v-ee50c514${_scopeId2}>GenericError</code></td><td data-v-ee50c514${_scopeId2}><code data-v-ee50c514${_scopeId2}>The account is inaccessible.</code></td><td data-v-ee50c514${_scopeId2}><code data-v-ee50c514${_scopeId2}>{accountId}</code> does not belong to the customer identified by <code data-v-ee50c514${_scopeId2}>o3-psu-identifier</code></td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, [
                            createVNode("code", null, "errorCode")
                          ]),
                          createVNode("th", null, [
                            createVNode("code", null, "errorMessage")
                          ]),
                          createVNode("th", null, "When to use")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Consent.AccountTemporarilyBlocked")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "The account is temporarily blocked.")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("Account status is "),
                            createVNode("code", null, "Suspended")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Consent.PermanentAccountAccessFailure")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "The account is permanently inaccessible.")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("Account status is "),
                            createVNode("code", null, "Closed"),
                            createTextVNode(", "),
                            createVNode("code", null, "Deceased"),
                            createTextVNode(", or "),
                            createVNode("code", null, "Unclaimed")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "GenericError")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "The account is inaccessible.")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "{accountId}"),
                            createTextVNode(" does not belong to the customer identified by "),
                            createVNode("code", null, "o3-psu-identifier")
                          ])
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h4 class="ed-doc__subhead-minor" data-v-ee50c514${_scopeId}><code data-v-ee50c514${_scopeId}>400</code> — Bad Request</h4>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Return <code data-v-ee50c514${_scopeId2}>400</code> only for a request that is genuinely malformed — not for a well-formed request that simply matches no data. The API Hub enforces the OpenAPI schema before proxying, so most format errors are rejected upstream and rarely reach your Ozone Connect endpoints. `);
                } else {
                  return [
                    createTextVNode(" Return "),
                    createVNode("code", null, "400"),
                    createTextVNode(" only for a request that is genuinely malformed — not for a well-formed request that simply matches no data. The API Hub enforces the OpenAPI schema before proxying, so most format errors are rejected upstream and rarely reach your Ozone Connect endpoints. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-ee50c514${_scopeId2}><thead data-v-ee50c514${_scopeId2}><tr data-v-ee50c514${_scopeId2}><th data-v-ee50c514${_scopeId2}><code data-v-ee50c514${_scopeId2}>errorCode</code></th><th data-v-ee50c514${_scopeId2}><code data-v-ee50c514${_scopeId2}>errorMessage</code></th><th data-v-ee50c514${_scopeId2}>When to use</th></tr></thead><tbody data-v-ee50c514${_scopeId2}><tr data-v-ee50c514${_scopeId2}><td data-v-ee50c514${_scopeId2}><code data-v-ee50c514${_scopeId2}>Resource.InvalidFormat</code></td><td data-v-ee50c514${_scopeId2}><code data-v-ee50c514${_scopeId2}>A query parameter has an invalid format.</code></td><td data-v-ee50c514${_scopeId2}>A date-range query parameter cannot be parsed, a contradictory range is supplied (<code data-v-ee50c514${_scopeId2}>fromBookingDateTime</code> after <code data-v-ee50c514${_scopeId2}>toBookingDateTime</code>), or <code data-v-ee50c514${_scopeId2}>toBookingDateTime</code> is in the future. The API Hub enforces these checks before proxying, so an LFI does not normally return this itself</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, [
                            createVNode("code", null, "errorCode")
                          ]),
                          createVNode("th", null, [
                            createVNode("code", null, "errorMessage")
                          ]),
                          createVNode("th", null, "When to use")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Resource.InvalidFormat")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "A query parameter has an invalid format.")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("A date-range query parameter cannot be parsed, a contradictory range is supplied ("),
                            createVNode("code", null, "fromBookingDateTime"),
                            createTextVNode(" after "),
                            createVNode("code", null, "toBookingDateTime"),
                            createTextVNode("), or "),
                            createVNode("code", null, "toBookingDateTime"),
                            createTextVNode(" is in the future. The API Hub enforces these checks before proxying, so an LFI does not normally return this itself")
                          ])
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 id="pagination" class="ed-doc__subhead" data-v-ee50c514${_scopeId}>Pagination</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="endpoint" data-v-ee50c514${_scopeId2}><span class="http-method http-method--get" data-v-ee50c514${_scopeId2}>GET</span><code data-v-ee50c514${_scopeId2}>/accounts/{accountId}/transactions</code></span> and <span class="endpoint" data-v-ee50c514${_scopeId2}><span class="http-method http-method--get" data-v-ee50c514${_scopeId2}>GET</span><code data-v-ee50c514${_scopeId2}>/accounts/{accountId}/statements</code></span> MUST support pagination. Other list endpoints (<code data-v-ee50c514${_scopeId2}>/beneficiaries</code>, <code data-v-ee50c514${_scopeId2}>/direct-debits</code>, <code data-v-ee50c514${_scopeId2}>/scheduled-payments</code>, <code data-v-ee50c514${_scopeId2}>/standing-orders</code>, <code data-v-ee50c514${_scopeId2}>/products</code>, <code data-v-ee50c514${_scopeId2}>/accounts/{accountId}/customer</code>) MAY support pagination where result sets warrant it. `);
                } else {
                  return [
                    createVNode("span", { class: "endpoint" }, [
                      createVNode("span", { class: "http-method http-method--get" }, "GET"),
                      createVNode("code", null, "/accounts/{accountId}/transactions")
                    ]),
                    createTextVNode(" and "),
                    createVNode("span", { class: "endpoint" }, [
                      createVNode("span", { class: "http-method http-method--get" }, "GET"),
                      createVNode("code", null, "/accounts/{accountId}/statements")
                    ]),
                    createTextVNode(" MUST support pagination. Other list endpoints ("),
                    createVNode("code", null, "/beneficiaries"),
                    createTextVNode(", "),
                    createVNode("code", null, "/direct-debits"),
                    createTextVNode(", "),
                    createVNode("code", null, "/scheduled-payments"),
                    createTextVNode(", "),
                    createVNode("code", null, "/standing-orders"),
                    createTextVNode(", "),
                    createVNode("code", null, "/products"),
                    createTextVNode(", "),
                    createVNode("code", null, "/accounts/{accountId}/customer"),
                    createTextVNode(") MAY support pagination where result sets warrant it. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The LFI implements page-based pagination (<code data-v-ee50c514${_scopeId2}>page</code> / <code data-v-ee50c514${_scopeId2}>page-size</code> query params, <code data-v-ee50c514${_scopeId2}>meta.paginated</code> / <code data-v-ee50c514${_scopeId2}>meta.totalPages</code> / <code data-v-ee50c514${_scopeId2}>meta.totalRecords</code> in the response). The API Hub converts this into the <code data-v-ee50c514${_scopeId2}>Links</code> envelope returned to the TPP. `);
                } else {
                  return [
                    createTextVNode(" The LFI implements page-based pagination ("),
                    createVNode("code", null, "page"),
                    createTextVNode(" / "),
                    createVNode("code", null, "page-size"),
                    createTextVNode(" query params, "),
                    createVNode("code", null, "meta.paginated"),
                    createTextVNode(" / "),
                    createVNode("code", null, "meta.totalPages"),
                    createTextVNode(" / "),
                    createVNode("code", null, "meta.totalRecords"),
                    createTextVNode(" in the response). The API Hub converts this into the "),
                    createVNode("code", null, "Links"),
                    createTextVNode(" envelope returned to the TPP. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`See <a href="/tech/lfi-api-hub/v2.1/banking/data-sharing/api-guide/pagination" data-v-ee50c514${_scopeId2}>Pagination</a> for the full behaviour.`);
                } else {
                  return [
                    createTextVNode("See "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/api-guide/pagination" }, "Pagination"),
                    createTextVNode(" for the full behaviour.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The remainder of this guide covers the LFI-facing Ozone Connect endpoints that serve each TPP request after the consent is authorized — the shared conventions (field population, request headers, error responses, pagination) followed by the per-endpoint request and response shapes. ")
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Field population"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Every field that "),
                  createVNode("strong", null, "exists"),
                  createTextVNode(" on the LFI's systems, or is "),
                  createVNode("strong", null, "derivable"),
                  createTextVNode(" from them, MUST be populated in the response. TPPs rely on this data to serve customer use cases end-to-end — a field the LFI omits is a feature the TPP cannot build. The OpenAPI spec marks the minimum required set, but LFIs MUST populate every optional field they hold. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" This rule applies to every endpoint in this guide. The endpoint-specific rules in "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/requirements" }, "Bank Data Sharing Requirements"),
                  createTextVNode(" call out fields that are always required for each endpoint. ")
                ]),
                _: 1
              }),
              createVNode("h3", {
                id: "common-request-headers",
                class: "ed-doc__subhead"
              }, "Common request headers"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" All resource endpoints receive the same set of headers from the API Hub. They are listed here and referenced from each endpoint section below. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Header"),
                        createVNode("th", null, "Required"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "o3-provider-id")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, "Identifier for your LFI registered in the Hub")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "o3-aspsp-id")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("Yes "),
                          createVNode("em", null, "(deprecated)")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("Deprecated alias for "),
                          createVNode("code", null, "o3-provider-id"),
                          createTextVNode(". Will be removed in a future version — use "),
                          createVNode("code", null, "o3-provider-id")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "o3-caller-org-id")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, "Organisation ID of the TPP making the underlying request")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "o3-caller-client-id")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, "OIDC client ID of the TPP application")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "o3-caller-software-statement-id")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, "Software statement ID of the TPP application")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "o3-api-uri")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, "The parameterised URL of the API being called by the TPP")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "o3-api-operation")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, [
                          createTextVNode("The HTTP method of the operation carried out by the TPP (e.g. "),
                          createVNode("code", null, "GET"),
                          createTextVNode(")")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "o3-consent-id")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, "The consent ID authorising this call")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "o3-psu-identifier")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, "Base64-encoded representation of the customer identifier JSON object — the opaque LFI-issued reference patched onto the consent at authorization, linking the consent to the authenticated customer")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "o3-ozone-interaction-id")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, [
                          createTextVNode("Hub-generated interaction ID. Equals "),
                          createVNode("code", null, "o3-caller-interaction-id"),
                          createTextVNode(" if the TPP provided one")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "o3-caller-interaction-id")
                        ]),
                        createVNode("td", null, "No"),
                        createVNode("td", null, "Interaction ID passed in by the TPP, if present")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Token and consent validation have already been performed by the Hub before the request reaches your Ozone Connect endpoint. Your LFI does not re-validate the token or consent — it is trusted to be valid. See "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/requirements" }, "Bank Data Sharing Requirements"),
                  createTextVNode(" for what your Ozone Connect endpoints must validate. ")
                ]),
                _: 1
              }),
              createVNode("h3", {
                id: "common-error-responses",
                class: "ed-doc__subhead"
              }, "Common error responses"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Every "),
                  createVNode("code", null, "/accounts/{accountId}/…"),
                  createTextVNode(" endpoint MUST check the account's status before returning data — if the account is not "),
                  createVNode("code", null, "Active"),
                  createTextVNode(", the endpoint MUST respond with "),
                  createVNode("code", null, "403"),
                  createTextVNode(" instead of returning the resource. "),
                  createVNode("span", { class: "endpoint" }, [
                    createVNode("span", { class: "http-method http-method--get" }, "GET"),
                    createVNode("code", null, "/accounts")
                  ]),
                  createTextVNode(" is the only exception: it lists every consented account regardless of status, with the "),
                  createVNode("code", null, "Status"),
                  createTextVNode(" field populated so the TPP can observe the current state. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("All error bodies MUST include "),
                  createVNode("code", null, "errorCode"),
                  createTextVNode(" and "),
                  createVNode("code", null, "errorMessage"),
                  createTextVNode(".")
                ]),
                _: 1
              }),
              createVNode("h4", { class: "ed-doc__subhead-minor" }, [
                createVNode("code", null, "403"),
                createTextVNode(" — Forbidden")
              ]),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Return "),
                  createVNode("code", null, "403"),
                  createTextVNode(" using the "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/requirements#account-status-handling" }, "Account Status Handling"),
                  createTextVNode(" mapping: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, [
                          createVNode("code", null, "errorCode")
                        ]),
                        createVNode("th", null, [
                          createVNode("code", null, "errorMessage")
                        ]),
                        createVNode("th", null, "When to use")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Consent.AccountTemporarilyBlocked")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "The account is temporarily blocked.")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("Account status is "),
                          createVNode("code", null, "Suspended")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Consent.PermanentAccountAccessFailure")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "The account is permanently inaccessible.")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("Account status is "),
                          createVNode("code", null, "Closed"),
                          createTextVNode(", "),
                          createVNode("code", null, "Deceased"),
                          createTextVNode(", or "),
                          createVNode("code", null, "Unclaimed")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "GenericError")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "The account is inaccessible.")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "{accountId}"),
                          createTextVNode(" does not belong to the customer identified by "),
                          createVNode("code", null, "o3-psu-identifier")
                        ])
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h4", { class: "ed-doc__subhead-minor" }, [
                createVNode("code", null, "400"),
                createTextVNode(" — Bad Request")
              ]),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Return "),
                  createVNode("code", null, "400"),
                  createTextVNode(" only for a request that is genuinely malformed — not for a well-formed request that simply matches no data. The API Hub enforces the OpenAPI schema before proxying, so most format errors are rejected upstream and rarely reach your Ozone Connect endpoints. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, [
                          createVNode("code", null, "errorCode")
                        ]),
                        createVNode("th", null, [
                          createVNode("code", null, "errorMessage")
                        ]),
                        createVNode("th", null, "When to use")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Resource.InvalidFormat")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "A query parameter has an invalid format.")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("A date-range query parameter cannot be parsed, a contradictory range is supplied ("),
                          createVNode("code", null, "fromBookingDateTime"),
                          createTextVNode(" after "),
                          createVNode("code", null, "toBookingDateTime"),
                          createTextVNode("), or "),
                          createVNode("code", null, "toBookingDateTime"),
                          createTextVNode(" is in the future. The API Hub enforces these checks before proxying, so an LFI does not normally return this itself")
                        ])
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", {
                id: "pagination",
                class: "ed-doc__subhead"
              }, "Pagination"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("span", { class: "endpoint" }, [
                    createVNode("span", { class: "http-method http-method--get" }, "GET"),
                    createVNode("code", null, "/accounts/{accountId}/transactions")
                  ]),
                  createTextVNode(" and "),
                  createVNode("span", { class: "endpoint" }, [
                    createVNode("span", { class: "http-method http-method--get" }, "GET"),
                    createVNode("code", null, "/accounts/{accountId}/statements")
                  ]),
                  createTextVNode(" MUST support pagination. Other list endpoints ("),
                  createVNode("code", null, "/beneficiaries"),
                  createTextVNode(", "),
                  createVNode("code", null, "/direct-debits"),
                  createTextVNode(", "),
                  createVNode("code", null, "/scheduled-payments"),
                  createTextVNode(", "),
                  createVNode("code", null, "/standing-orders"),
                  createTextVNode(", "),
                  createVNode("code", null, "/products"),
                  createTextVNode(", "),
                  createVNode("code", null, "/accounts/{accountId}/customer"),
                  createTextVNode(") MAY support pagination where result sets warrant it. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The LFI implements page-based pagination ("),
                  createVNode("code", null, "page"),
                  createTextVNode(" / "),
                  createVNode("code", null, "page-size"),
                  createTextVNode(" query params, "),
                  createVNode("code", null, "meta.paginated"),
                  createTextVNode(" / "),
                  createVNode("code", null, "meta.totalPages"),
                  createTextVNode(" / "),
                  createVNode("code", null, "meta.totalRecords"),
                  createTextVNode(" in the response). The API Hub converts this into the "),
                  createVNode("code", null, "Links"),
                  createTextVNode(" envelope returned to the TPP. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("See "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/api-guide/pagination" }, "Pagination"),
                  createTextVNode(" for the full behaviour.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "get-accounts",
        num: "06",
        color: "var(--at-teal)",
        eyebrow: "Endpoint",
        title: "GET /accounts",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="ed-doc__endpoint" data-v-ee50c514${_scopeId}><span class="http-badge http-get" data-v-ee50c514${_scopeId}>GET</span><code class="ed-doc__endpoint-path" data-v-ee50c514${_scopeId}>/accounts</code></div>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Backs the TPP request <code data-v-ee50c514${_scopeId2}>GET https://rs1.LFICODE.apihub.openfinance.ae/open-finance/account-information/vx.y/accounts</code>. `);
                } else {
                  return [
                    createTextVNode(" Backs the TPP request "),
                    createVNode("code", null, "GET https://rs1.LFICODE.apihub.openfinance.ae/open-finance/account-information/vx.y/accounts"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Returns the accounts matching the <code data-v-ee50c514${_scopeId2}>accountIds</code> query parameter. Non-CAAP LFIs MUST treat <code data-v-ee50c514${_scopeId2}>accountIds</code> as mandatory — it is always supplied by the Hub and contains the set of accounts the customer consented to share. `);
                } else {
                  return [
                    createTextVNode(" Returns the accounts matching the "),
                    createVNode("code", null, "accountIds"),
                    createTextVNode(" query parameter. Non-CAAP LFIs MUST treat "),
                    createVNode("code", null, "accountIds"),
                    createTextVNode(" as mandatory — it is always supplied by the Hub and contains the set of accounts the customer consented to share. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-ee50c514${_scopeId}>Request headers</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`See <a href="#common-request-headers" data-v-ee50c514${_scopeId2}>Common request headers</a>.`);
                } else {
                  return [
                    createTextVNode("See "),
                    createVNode("a", { href: "#common-request-headers" }, "Common request headers"),
                    createTextVNode(".")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-ee50c514${_scopeId}>Query parameters</h3>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-ee50c514${_scopeId2}><thead data-v-ee50c514${_scopeId2}><tr data-v-ee50c514${_scopeId2}><th data-v-ee50c514${_scopeId2}>Parameter</th><th data-v-ee50c514${_scopeId2}>Required</th><th data-v-ee50c514${_scopeId2}>Default</th><th data-v-ee50c514${_scopeId2}>Description</th></tr></thead><tbody data-v-ee50c514${_scopeId2}><tr data-v-ee50c514${_scopeId2}><td data-v-ee50c514${_scopeId2}><code data-v-ee50c514${_scopeId2}>accountIds</code></td><td data-v-ee50c514${_scopeId2}>Yes</td><td data-v-ee50c514${_scopeId2}>—</td><td data-v-ee50c514${_scopeId2}>Comma-separated list of account IDs to return. Populated by the Hub from the <code data-v-ee50c514${_scopeId2}>accountIds</code> your LFI patched onto the consent during the <a href="#consent-flow" data-v-ee50c514${_scopeId2}>Consent flow</a></td></tr><tr data-v-ee50c514${_scopeId2}><td data-v-ee50c514${_scopeId2}><code data-v-ee50c514${_scopeId2}>page</code></td><td data-v-ee50c514${_scopeId2}>Yes</td><td data-v-ee50c514${_scopeId2}><code data-v-ee50c514${_scopeId2}>1</code></td><td data-v-ee50c514${_scopeId2}>Page number for paginated results</td></tr><tr data-v-ee50c514${_scopeId2}><td data-v-ee50c514${_scopeId2}><code data-v-ee50c514${_scopeId2}>page-size</code></td><td data-v-ee50c514${_scopeId2}>Yes</td><td data-v-ee50c514${_scopeId2}><code data-v-ee50c514${_scopeId2}>100</code></td><td data-v-ee50c514${_scopeId2}>Number of records per page</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Parameter"),
                          createVNode("th", null, "Required"),
                          createVNode("th", null, "Default"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "accountIds")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, "—"),
                          createVNode("td", null, [
                            createTextVNode("Comma-separated list of account IDs to return. Populated by the Hub from the "),
                            createVNode("code", null, "accountIds"),
                            createTextVNode(" your LFI patched onto the consent during the "),
                            createVNode("a", { href: "#consent-flow" }, "Consent flow")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "page")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, [
                            createVNode("code", null, "1")
                          ]),
                          createVNode("td", null, "Page number for paginated results")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "page-size")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, [
                            createVNode("code", null, "100")
                          ]),
                          createVNode("td", null, "Number of records per page")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-ee50c514${_scopeId}>Response</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<code data-v-ee50c514${_scopeId2}>Content-Type: application/json</code>. Return <code data-v-ee50c514${_scopeId2}>200</code> with a <code data-v-ee50c514${_scopeId2}>data</code> array containing one record per consented account. See <a href="/tech/lfi-api-hub/v2.1/banking/data-sharing/requirements#get-accounts" data-v-ee50c514${_scopeId2}>GET /accounts rules</a> for field-level requirements. `);
                } else {
                  return [
                    createVNode("code", null, "Content-Type: application/json"),
                    createTextVNode(". Return "),
                    createVNode("code", null, "200"),
                    createTextVNode(" with a "),
                    createVNode("code", null, "data"),
                    createTextVNode(" array containing one record per consented account. See "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/requirements#get-accounts" }, "GET /accounts rules"),
                    createTextVNode(" for field-level requirements. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: accountsListJson,
              lang: "json",
              filename: "GET /accounts response"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="endpoint" data-v-ee50c514${_scopeId2}><span class="http-method http-method--get" data-v-ee50c514${_scopeId2}>GET</span><code data-v-ee50c514${_scopeId2}>/accounts</code></span> is exempt from the <a href="#common-error-responses" data-v-ee50c514${_scopeId2}>Common error responses</a> status mapping — return all consented accounts regardless of status. `);
                } else {
                  return [
                    createVNode("span", { class: "endpoint" }, [
                      createVNode("span", { class: "http-method http-method--get" }, "GET"),
                      createVNode("code", null, "/accounts")
                    ]),
                    createTextVNode(" is exempt from the "),
                    createVNode("a", { href: "#common-error-responses" }, "Common error responses"),
                    createTextVNode(" status mapping — return all consented accounts regardless of status. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` See the <a href="/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts" data-v-ee50c514${_scopeId2}>GET <code data-v-ee50c514${_scopeId2}>/accounts</code> API Reference</a> for the full schema. `);
                } else {
                  return [
                    createTextVNode(" See the "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts" }, [
                      createTextVNode("GET "),
                      createVNode("code", null, "/accounts"),
                      createTextVNode(" API Reference")
                    ]),
                    createTextVNode(" for the full schema. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "ed-doc__endpoint" }, [
                createVNode("span", { class: "http-badge http-get" }, "GET"),
                createVNode("code", { class: "ed-doc__endpoint-path" }, "/accounts")
              ]),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Backs the TPP request "),
                  createVNode("code", null, "GET https://rs1.LFICODE.apihub.openfinance.ae/open-finance/account-information/vx.y/accounts"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Returns the accounts matching the "),
                  createVNode("code", null, "accountIds"),
                  createTextVNode(" query parameter. Non-CAAP LFIs MUST treat "),
                  createVNode("code", null, "accountIds"),
                  createTextVNode(" as mandatory — it is always supplied by the Hub and contains the set of accounts the customer consented to share. ")
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Request headers"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("See "),
                  createVNode("a", { href: "#common-request-headers" }, "Common request headers"),
                  createTextVNode(".")
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Query parameters"),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Parameter"),
                        createVNode("th", null, "Required"),
                        createVNode("th", null, "Default"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "accountIds")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, "—"),
                        createVNode("td", null, [
                          createTextVNode("Comma-separated list of account IDs to return. Populated by the Hub from the "),
                          createVNode("code", null, "accountIds"),
                          createTextVNode(" your LFI patched onto the consent during the "),
                          createVNode("a", { href: "#consent-flow" }, "Consent flow")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "page")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, [
                          createVNode("code", null, "1")
                        ]),
                        createVNode("td", null, "Page number for paginated results")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "page-size")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, [
                          createVNode("code", null, "100")
                        ]),
                        createVNode("td", null, "Number of records per page")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Response"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("code", null, "Content-Type: application/json"),
                  createTextVNode(". Return "),
                  createVNode("code", null, "200"),
                  createTextVNode(" with a "),
                  createVNode("code", null, "data"),
                  createTextVNode(" array containing one record per consented account. See "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/requirements#get-accounts" }, "GET /accounts rules"),
                  createTextVNode(" for field-level requirements. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: accountsListJson,
                lang: "json",
                filename: "GET /accounts response"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("span", { class: "endpoint" }, [
                    createVNode("span", { class: "http-method http-method--get" }, "GET"),
                    createVNode("code", null, "/accounts")
                  ]),
                  createTextVNode(" is exempt from the "),
                  createVNode("a", { href: "#common-error-responses" }, "Common error responses"),
                  createTextVNode(" status mapping — return all consented accounts regardless of status. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" See the "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts" }, [
                    createTextVNode("GET "),
                    createVNode("code", null, "/accounts"),
                    createTextVNode(" API Reference")
                  ]),
                  createTextVNode(" for the full schema. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "get-accounts-accountid",
        num: "07",
        color: "var(--at-gold)",
        eyebrow: "Endpoint",
        title: "GET /accounts/{accountId}",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="ed-doc__endpoint" data-v-ee50c514${_scopeId}><span class="http-badge http-get" data-v-ee50c514${_scopeId}>GET</span><code class="ed-doc__endpoint-path" data-v-ee50c514${_scopeId}>/accounts/{accountId}</code></div>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Backs the TPP request <code data-v-ee50c514${_scopeId2}>GET https://rs1.LFICODE.apihub.openfinance.ae/open-finance/account-information/vx.y/accounts/{AccountId}</code>. `);
                } else {
                  return [
                    createTextVNode(" Backs the TPP request "),
                    createVNode("code", null, "GET https://rs1.LFICODE.apihub.openfinance.ae/open-finance/account-information/vx.y/accounts/{AccountId}"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Returns the full details of a single account. The response shape is the same <code data-v-ee50c514${_scopeId2}>CbuaeAccount</code> returned inside the <code data-v-ee50c514${_scopeId2}>data</code> array of <span class="endpoint" data-v-ee50c514${_scopeId2}><span class="http-method http-method--get" data-v-ee50c514${_scopeId2}>GET</span><code data-v-ee50c514${_scopeId2}>/accounts</code></span>, wrapped as a single object rather than an array. Data returned here MUST be consistent with what is returned by <span class="endpoint" data-v-ee50c514${_scopeId2}><span class="http-method http-method--get" data-v-ee50c514${_scopeId2}>GET</span><code data-v-ee50c514${_scopeId2}>/accounts</code></span> for the same account. `);
                } else {
                  return [
                    createTextVNode(" Returns the full details of a single account. The response shape is the same "),
                    createVNode("code", null, "CbuaeAccount"),
                    createTextVNode(" returned inside the "),
                    createVNode("code", null, "data"),
                    createTextVNode(" array of "),
                    createVNode("span", { class: "endpoint" }, [
                      createVNode("span", { class: "http-method http-method--get" }, "GET"),
                      createVNode("code", null, "/accounts")
                    ]),
                    createTextVNode(", wrapped as a single object rather than an array. Data returned here MUST be consistent with what is returned by "),
                    createVNode("span", { class: "endpoint" }, [
                      createVNode("span", { class: "http-method http-method--get" }, "GET"),
                      createVNode("code", null, "/accounts")
                    ]),
                    createTextVNode(" for the same account. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-ee50c514${_scopeId}>Request headers</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`See <a href="#common-request-headers" data-v-ee50c514${_scopeId2}>Common request headers</a>.`);
                } else {
                  return [
                    createTextVNode("See "),
                    createVNode("a", { href: "#common-request-headers" }, "Common request headers"),
                    createTextVNode(".")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-ee50c514${_scopeId}>Path parameters</h3>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-ee50c514${_scopeId2}><thead data-v-ee50c514${_scopeId2}><tr data-v-ee50c514${_scopeId2}><th data-v-ee50c514${_scopeId2}>Parameter</th><th data-v-ee50c514${_scopeId2}>Required</th><th data-v-ee50c514${_scopeId2}>Description</th></tr></thead><tbody data-v-ee50c514${_scopeId2}><tr data-v-ee50c514${_scopeId2}><td data-v-ee50c514${_scopeId2}><code data-v-ee50c514${_scopeId2}>accountId</code></td><td data-v-ee50c514${_scopeId2}>Yes</td><td data-v-ee50c514${_scopeId2}>The ID of the account to return. MUST be one of the accounts on the consent</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Parameter"),
                          createVNode("th", null, "Required"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "accountId")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, "The ID of the account to return. MUST be one of the accounts on the consent")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-ee50c514${_scopeId}>Response</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<code data-v-ee50c514${_scopeId2}>Content-Type: application/json</code>`);
                } else {
                  return [
                    createVNode("code", null, "Content-Type: application/json")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: accountByIdJson,
              lang: "json",
              filename: "GET /accounts/{accountId} response"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Errors: see <a href="#common-error-responses" data-v-ee50c514${_scopeId2}>Common error responses</a>.`);
                } else {
                  return [
                    createTextVNode("Errors: see "),
                    createVNode("a", { href: "#common-error-responses" }, "Common error responses"),
                    createTextVNode(".")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` See the <a href="/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId" data-v-ee50c514${_scopeId2}>GET <code data-v-ee50c514${_scopeId2}>/accounts/{accountId}</code> API Reference</a> for the full schema. `);
                } else {
                  return [
                    createTextVNode(" See the "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId" }, [
                      createTextVNode("GET "),
                      createVNode("code", null, "/accounts/{accountId}"),
                      createTextVNode(" API Reference")
                    ]),
                    createTextVNode(" for the full schema. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "ed-doc__endpoint" }, [
                createVNode("span", { class: "http-badge http-get" }, "GET"),
                createVNode("code", { class: "ed-doc__endpoint-path" }, "/accounts/{accountId}")
              ]),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Backs the TPP request "),
                  createVNode("code", null, "GET https://rs1.LFICODE.apihub.openfinance.ae/open-finance/account-information/vx.y/accounts/{AccountId}"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Returns the full details of a single account. The response shape is the same "),
                  createVNode("code", null, "CbuaeAccount"),
                  createTextVNode(" returned inside the "),
                  createVNode("code", null, "data"),
                  createTextVNode(" array of "),
                  createVNode("span", { class: "endpoint" }, [
                    createVNode("span", { class: "http-method http-method--get" }, "GET"),
                    createVNode("code", null, "/accounts")
                  ]),
                  createTextVNode(", wrapped as a single object rather than an array. Data returned here MUST be consistent with what is returned by "),
                  createVNode("span", { class: "endpoint" }, [
                    createVNode("span", { class: "http-method http-method--get" }, "GET"),
                    createVNode("code", null, "/accounts")
                  ]),
                  createTextVNode(" for the same account. ")
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Request headers"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("See "),
                  createVNode("a", { href: "#common-request-headers" }, "Common request headers"),
                  createTextVNode(".")
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Path parameters"),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Parameter"),
                        createVNode("th", null, "Required"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "accountId")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, "The ID of the account to return. MUST be one of the accounts on the consent")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Response"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("code", null, "Content-Type: application/json")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: accountByIdJson,
                lang: "json",
                filename: "GET /accounts/{accountId} response"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Errors: see "),
                  createVNode("a", { href: "#common-error-responses" }, "Common error responses"),
                  createTextVNode(".")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" See the "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId" }, [
                    createTextVNode("GET "),
                    createVNode("code", null, "/accounts/{accountId}"),
                    createTextVNode(" API Reference")
                  ]),
                  createTextVNode(" for the full schema. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "get-accounts-balances",
        num: "08",
        color: "var(--at-blue-deep, #1d4ed8)",
        eyebrow: "Endpoint",
        title: "GET /accounts/{accountId}/balances",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="ed-doc__endpoint" data-v-ee50c514${_scopeId}><span class="http-badge http-get" data-v-ee50c514${_scopeId}>GET</span><code class="ed-doc__endpoint-path" data-v-ee50c514${_scopeId}>/accounts/{accountId}/balances</code></div>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Backs the TPP request <code data-v-ee50c514${_scopeId2}>GET https://rs1.LFICODE.apihub.openfinance.ae/open-finance/account-information/vx.y/accounts/{AccountId}/balances</code>. `);
                } else {
                  return [
                    createTextVNode(" Backs the TPP request "),
                    createVNode("code", null, "GET https://rs1.LFICODE.apihub.openfinance.ae/open-finance/account-information/vx.y/accounts/{AccountId}/balances"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Returns the balances for a single account. An account may have more than one balance — return one record per distinct <code data-v-ee50c514${_scopeId2}>balanceType</code> held. For <code data-v-ee50c514${_scopeId2}>CurrentAccount</code> and <code data-v-ee50c514${_scopeId2}>Savings</code> accounts, a record with <code data-v-ee50c514${_scopeId2}>balanceType: InterimAvailable</code> MUST always be included — this is the real-time available balance. Include <code data-v-ee50c514${_scopeId2}>creditLines</code> where applicable. `);
                } else {
                  return [
                    createTextVNode(" Returns the balances for a single account. An account may have more than one balance — return one record per distinct "),
                    createVNode("code", null, "balanceType"),
                    createTextVNode(" held. For "),
                    createVNode("code", null, "CurrentAccount"),
                    createTextVNode(" and "),
                    createVNode("code", null, "Savings"),
                    createTextVNode(" accounts, a record with "),
                    createVNode("code", null, "balanceType: InterimAvailable"),
                    createTextVNode(" MUST always be included — this is the real-time available balance. Include "),
                    createVNode("code", null, "creditLines"),
                    createTextVNode(" where applicable. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-ee50c514${_scopeId}>Request headers</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`See <a href="#common-request-headers" data-v-ee50c514${_scopeId2}>Common request headers</a>.`);
                } else {
                  return [
                    createTextVNode("See "),
                    createVNode("a", { href: "#common-request-headers" }, "Common request headers"),
                    createTextVNode(".")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-ee50c514${_scopeId}>Path parameters</h3>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-ee50c514${_scopeId2}><thead data-v-ee50c514${_scopeId2}><tr data-v-ee50c514${_scopeId2}><th data-v-ee50c514${_scopeId2}>Parameter</th><th data-v-ee50c514${_scopeId2}>Required</th><th data-v-ee50c514${_scopeId2}>Description</th></tr></thead><tbody data-v-ee50c514${_scopeId2}><tr data-v-ee50c514${_scopeId2}><td data-v-ee50c514${_scopeId2}><code data-v-ee50c514${_scopeId2}>accountId</code></td><td data-v-ee50c514${_scopeId2}>Yes</td><td data-v-ee50c514${_scopeId2}>The ID of the account whose balances are being returned</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Parameter"),
                          createVNode("th", null, "Required"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "accountId")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, "The ID of the account whose balances are being returned")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-ee50c514${_scopeId}>Query parameters</h3>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-ee50c514${_scopeId2}><thead data-v-ee50c514${_scopeId2}><tr data-v-ee50c514${_scopeId2}><th data-v-ee50c514${_scopeId2}>Parameter</th><th data-v-ee50c514${_scopeId2}>Required</th><th data-v-ee50c514${_scopeId2}>Default</th><th data-v-ee50c514${_scopeId2}>Description</th></tr></thead><tbody data-v-ee50c514${_scopeId2}><tr data-v-ee50c514${_scopeId2}><td data-v-ee50c514${_scopeId2}><code data-v-ee50c514${_scopeId2}>page</code></td><td data-v-ee50c514${_scopeId2}>Yes</td><td data-v-ee50c514${_scopeId2}><code data-v-ee50c514${_scopeId2}>1</code></td><td data-v-ee50c514${_scopeId2}>Page number</td></tr><tr data-v-ee50c514${_scopeId2}><td data-v-ee50c514${_scopeId2}><code data-v-ee50c514${_scopeId2}>page-size</code></td><td data-v-ee50c514${_scopeId2}>Yes</td><td data-v-ee50c514${_scopeId2}><code data-v-ee50c514${_scopeId2}>100</code></td><td data-v-ee50c514${_scopeId2}>Records per page</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Parameter"),
                          createVNode("th", null, "Required"),
                          createVNode("th", null, "Default"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "page")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, [
                            createVNode("code", null, "1")
                          ]),
                          createVNode("td", null, "Page number")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "page-size")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, [
                            createVNode("code", null, "100")
                          ]),
                          createVNode("td", null, "Records per page")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-ee50c514${_scopeId}>Response</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<code data-v-ee50c514${_scopeId2}>Content-Type: application/json</code>`);
                } else {
                  return [
                    createVNode("code", null, "Content-Type: application/json")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: balancesJson,
              lang: "json",
              filename: "GET /accounts/{accountId}/balances response"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The full set of allowable <code data-v-ee50c514${_scopeId2}>balanceType</code> values (<code data-v-ee50c514${_scopeId2}>ClosingAvailable</code>, <code data-v-ee50c514${_scopeId2}>ClosingBooked</code>, <code data-v-ee50c514${_scopeId2}>ClosingCleared</code>, <code data-v-ee50c514${_scopeId2}>Expected</code>, <code data-v-ee50c514${_scopeId2}>ForwardAvailable</code>, <code data-v-ee50c514${_scopeId2}>Information</code>, <code data-v-ee50c514${_scopeId2}>InterimAvailable</code>, <code data-v-ee50c514${_scopeId2}>InterimBooked</code>, <code data-v-ee50c514${_scopeId2}>InterimCleared</code>, <code data-v-ee50c514${_scopeId2}>OpeningAvailable</code>, <code data-v-ee50c514${_scopeId2}>OpeningBooked</code>, <code data-v-ee50c514${_scopeId2}>OpeningCleared</code>, <code data-v-ee50c514${_scopeId2}>PreviouslyClosedBooked</code>) is defined in the OpenAPI spec. `);
                } else {
                  return [
                    createTextVNode(" The full set of allowable "),
                    createVNode("code", null, "balanceType"),
                    createTextVNode(" values ("),
                    createVNode("code", null, "ClosingAvailable"),
                    createTextVNode(", "),
                    createVNode("code", null, "ClosingBooked"),
                    createTextVNode(", "),
                    createVNode("code", null, "ClosingCleared"),
                    createTextVNode(", "),
                    createVNode("code", null, "Expected"),
                    createTextVNode(", "),
                    createVNode("code", null, "ForwardAvailable"),
                    createTextVNode(", "),
                    createVNode("code", null, "Information"),
                    createTextVNode(", "),
                    createVNode("code", null, "InterimAvailable"),
                    createTextVNode(", "),
                    createVNode("code", null, "InterimBooked"),
                    createTextVNode(", "),
                    createVNode("code", null, "InterimCleared"),
                    createTextVNode(", "),
                    createVNode("code", null, "OpeningAvailable"),
                    createTextVNode(", "),
                    createVNode("code", null, "OpeningBooked"),
                    createTextVNode(", "),
                    createVNode("code", null, "OpeningCleared"),
                    createTextVNode(", "),
                    createVNode("code", null, "PreviouslyClosedBooked"),
                    createTextVNode(") is defined in the OpenAPI spec. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Errors: see <a href="#common-error-responses" data-v-ee50c514${_scopeId2}>Common error responses</a>.`);
                } else {
                  return [
                    createTextVNode("Errors: see "),
                    createVNode("a", { href: "#common-error-responses" }, "Common error responses"),
                    createTextVNode(".")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` See the <a href="/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-balances" data-v-ee50c514${_scopeId2}>GET <code data-v-ee50c514${_scopeId2}>/accounts/{accountId}/balances</code> API Reference</a> for the full schema. `);
                } else {
                  return [
                    createTextVNode(" See the "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-balances" }, [
                      createTextVNode("GET "),
                      createVNode("code", null, "/accounts/{accountId}/balances"),
                      createTextVNode(" API Reference")
                    ]),
                    createTextVNode(" for the full schema. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "ed-doc__endpoint" }, [
                createVNode("span", { class: "http-badge http-get" }, "GET"),
                createVNode("code", { class: "ed-doc__endpoint-path" }, "/accounts/{accountId}/balances")
              ]),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Backs the TPP request "),
                  createVNode("code", null, "GET https://rs1.LFICODE.apihub.openfinance.ae/open-finance/account-information/vx.y/accounts/{AccountId}/balances"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Returns the balances for a single account. An account may have more than one balance — return one record per distinct "),
                  createVNode("code", null, "balanceType"),
                  createTextVNode(" held. For "),
                  createVNode("code", null, "CurrentAccount"),
                  createTextVNode(" and "),
                  createVNode("code", null, "Savings"),
                  createTextVNode(" accounts, a record with "),
                  createVNode("code", null, "balanceType: InterimAvailable"),
                  createTextVNode(" MUST always be included — this is the real-time available balance. Include "),
                  createVNode("code", null, "creditLines"),
                  createTextVNode(" where applicable. ")
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Request headers"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("See "),
                  createVNode("a", { href: "#common-request-headers" }, "Common request headers"),
                  createTextVNode(".")
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Path parameters"),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Parameter"),
                        createVNode("th", null, "Required"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "accountId")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, "The ID of the account whose balances are being returned")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Query parameters"),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Parameter"),
                        createVNode("th", null, "Required"),
                        createVNode("th", null, "Default"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "page")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, [
                          createVNode("code", null, "1")
                        ]),
                        createVNode("td", null, "Page number")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "page-size")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, [
                          createVNode("code", null, "100")
                        ]),
                        createVNode("td", null, "Records per page")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Response"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("code", null, "Content-Type: application/json")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: balancesJson,
                lang: "json",
                filename: "GET /accounts/{accountId}/balances response"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The full set of allowable "),
                  createVNode("code", null, "balanceType"),
                  createTextVNode(" values ("),
                  createVNode("code", null, "ClosingAvailable"),
                  createTextVNode(", "),
                  createVNode("code", null, "ClosingBooked"),
                  createTextVNode(", "),
                  createVNode("code", null, "ClosingCleared"),
                  createTextVNode(", "),
                  createVNode("code", null, "Expected"),
                  createTextVNode(", "),
                  createVNode("code", null, "ForwardAvailable"),
                  createTextVNode(", "),
                  createVNode("code", null, "Information"),
                  createTextVNode(", "),
                  createVNode("code", null, "InterimAvailable"),
                  createTextVNode(", "),
                  createVNode("code", null, "InterimBooked"),
                  createTextVNode(", "),
                  createVNode("code", null, "InterimCleared"),
                  createTextVNode(", "),
                  createVNode("code", null, "OpeningAvailable"),
                  createTextVNode(", "),
                  createVNode("code", null, "OpeningBooked"),
                  createTextVNode(", "),
                  createVNode("code", null, "OpeningCleared"),
                  createTextVNode(", "),
                  createVNode("code", null, "PreviouslyClosedBooked"),
                  createTextVNode(") is defined in the OpenAPI spec. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Errors: see "),
                  createVNode("a", { href: "#common-error-responses" }, "Common error responses"),
                  createTextVNode(".")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" See the "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-balances" }, [
                    createTextVNode("GET "),
                    createVNode("code", null, "/accounts/{accountId}/balances"),
                    createTextVNode(" API Reference")
                  ]),
                  createTextVNode(" for the full schema. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "get-accounts-transactions",
        num: "09",
        color: "var(--at-navy)",
        eyebrow: "Endpoint",
        title: "GET /accounts/{accountId}/transactions",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="ed-doc__endpoint" data-v-ee50c514${_scopeId}><span class="http-badge http-get" data-v-ee50c514${_scopeId}>GET</span><code class="ed-doc__endpoint-path" data-v-ee50c514${_scopeId}>/accounts/{accountId}/transactions</code></div>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Backs the TPP request <code data-v-ee50c514${_scopeId2}>GET https://rs1.LFICODE.apihub.openfinance.ae/open-finance/account-information/vx.y/accounts/{AccountId}/transactions</code>. `);
                } else {
                  return [
                    createTextVNode(" Backs the TPP request "),
                    createVNode("code", null, "GET https://rs1.LFICODE.apihub.openfinance.ae/open-finance/account-information/vx.y/accounts/{AccountId}/transactions"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Returns the transactions for a single account, filtered by booking date-time where provided. Pagination is <strong data-v-ee50c514${_scopeId2}>required</strong> for this endpoint — see <a href="/tech/lfi-api-hub/v2.1/banking/data-sharing/api-guide/pagination" data-v-ee50c514${_scopeId2}>Pagination</a>. `);
                } else {
                  return [
                    createTextVNode(" Returns the transactions for a single account, filtered by booking date-time where provided. Pagination is "),
                    createVNode("strong", null, "required"),
                    createTextVNode(" for this endpoint — see "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/api-guide/pagination" }, "Pagination"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-ee50c514${_scopeId}>Request headers</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`See <a href="#common-request-headers" data-v-ee50c514${_scopeId2}>Common request headers</a>. In addition:`);
                } else {
                  return [
                    createTextVNode("See "),
                    createVNode("a", { href: "#common-request-headers" }, "Common request headers"),
                    createTextVNode(". In addition:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-ee50c514${_scopeId2}><thead data-v-ee50c514${_scopeId2}><tr data-v-ee50c514${_scopeId2}><th data-v-ee50c514${_scopeId2}>Header</th><th data-v-ee50c514${_scopeId2}>Required</th><th data-v-ee50c514${_scopeId2}>Description</th></tr></thead><tbody data-v-ee50c514${_scopeId2}><tr data-v-ee50c514${_scopeId2}><td data-v-ee50c514${_scopeId2}><code data-v-ee50c514${_scopeId2}>o3-fx-transactions</code></td><td data-v-ee50c514${_scopeId2}>No</td><td data-v-ee50c514${_scopeId2}>If <code data-v-ee50c514${_scopeId2}>true</code>, return only FX-related transactions, based on permissions set in the related consent</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Header"),
                          createVNode("th", null, "Required"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "o3-fx-transactions")
                          ]),
                          createVNode("td", null, "No"),
                          createVNode("td", null, [
                            createTextVNode("If "),
                            createVNode("code", null, "true"),
                            createTextVNode(", return only FX-related transactions, based on permissions set in the related consent")
                          ])
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-ee50c514${_scopeId}>Path parameters</h3>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-ee50c514${_scopeId2}><thead data-v-ee50c514${_scopeId2}><tr data-v-ee50c514${_scopeId2}><th data-v-ee50c514${_scopeId2}>Parameter</th><th data-v-ee50c514${_scopeId2}>Required</th><th data-v-ee50c514${_scopeId2}>Description</th></tr></thead><tbody data-v-ee50c514${_scopeId2}><tr data-v-ee50c514${_scopeId2}><td data-v-ee50c514${_scopeId2}><code data-v-ee50c514${_scopeId2}>accountId</code></td><td data-v-ee50c514${_scopeId2}>Yes</td><td data-v-ee50c514${_scopeId2}>The ID of the account whose transactions are being returned</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Parameter"),
                          createVNode("th", null, "Required"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "accountId")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, "The ID of the account whose transactions are being returned")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-ee50c514${_scopeId}>Query parameters</h3>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-ee50c514${_scopeId2}><thead data-v-ee50c514${_scopeId2}><tr data-v-ee50c514${_scopeId2}><th data-v-ee50c514${_scopeId2}>Parameter</th><th data-v-ee50c514${_scopeId2}>Required</th><th data-v-ee50c514${_scopeId2}>Default</th><th data-v-ee50c514${_scopeId2}>Description</th></tr></thead><tbody data-v-ee50c514${_scopeId2}><tr data-v-ee50c514${_scopeId2}><td data-v-ee50c514${_scopeId2}><code data-v-ee50c514${_scopeId2}>fromBookingDateTime</code></td><td data-v-ee50c514${_scopeId2}>No</td><td data-v-ee50c514${_scopeId2}>—</td><td data-v-ee50c514${_scopeId2}>Return only transactions booked on or after this date-time. Open-ended if omitted. Any timezone offset MUST be ignored</td></tr><tr data-v-ee50c514${_scopeId2}><td data-v-ee50c514${_scopeId2}><code data-v-ee50c514${_scopeId2}>toBookingDateTime</code></td><td data-v-ee50c514${_scopeId2}>No</td><td data-v-ee50c514${_scopeId2}>—</td><td data-v-ee50c514${_scopeId2}>Return only transactions booked on or before this date-time. Open-ended if omitted. Any timezone offset MUST be ignored</td></tr><tr data-v-ee50c514${_scopeId2}><td data-v-ee50c514${_scopeId2}><code data-v-ee50c514${_scopeId2}>page</code></td><td data-v-ee50c514${_scopeId2}>Yes</td><td data-v-ee50c514${_scopeId2}><code data-v-ee50c514${_scopeId2}>1</code></td><td data-v-ee50c514${_scopeId2}>Page number</td></tr><tr data-v-ee50c514${_scopeId2}><td data-v-ee50c514${_scopeId2}><code data-v-ee50c514${_scopeId2}>page-size</code></td><td data-v-ee50c514${_scopeId2}>Yes</td><td data-v-ee50c514${_scopeId2}><code data-v-ee50c514${_scopeId2}>100</code></td><td data-v-ee50c514${_scopeId2}>Records per page</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Parameter"),
                          createVNode("th", null, "Required"),
                          createVNode("th", null, "Default"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "fromBookingDateTime")
                          ]),
                          createVNode("td", null, "No"),
                          createVNode("td", null, "—"),
                          createVNode("td", null, "Return only transactions booked on or after this date-time. Open-ended if omitted. Any timezone offset MUST be ignored")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "toBookingDateTime")
                          ]),
                          createVNode("td", null, "No"),
                          createVNode("td", null, "—"),
                          createVNode("td", null, "Return only transactions booked on or before this date-time. Open-ended if omitted. Any timezone offset MUST be ignored")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "page")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, [
                            createVNode("code", null, "1")
                          ]),
                          createVNode("td", null, "Page number")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "page-size")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, [
                            createVNode("code", null, "100")
                          ]),
                          createVNode("td", null, "Records per page")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-ee50c514${_scopeId}>Response</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<code data-v-ee50c514${_scopeId2}>Content-Type: application/json</code>`);
                } else {
                  return [
                    createVNode("code", null, "Content-Type: application/json")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` At least two years of transactions MUST be available for retrieval. If no transactions exist within the requested range, return <code data-v-ee50c514${_scopeId2}>200</code> with an empty <code data-v-ee50c514${_scopeId2}>data</code> array — do not return <code data-v-ee50c514${_scopeId2}>404</code>. `);
                } else {
                  return [
                    createTextVNode(" At least two years of transactions MUST be available for retrieval. If no transactions exist within the requested range, return "),
                    createVNode("code", null, "200"),
                    createTextVNode(" with an empty "),
                    createVNode("code", null, "data"),
                    createTextVNode(" array — do not return "),
                    createVNode("code", null, "404"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The two-year rule is a <strong data-v-ee50c514${_scopeId2}>minimum availability guarantee, not a query limit</strong>. An LFI MUST NOT reject a request solely because <code data-v-ee50c514${_scopeId2}>fromBookingDateTime</code> or <code data-v-ee50c514${_scopeId2}>toBookingDateTime</code> extends beyond two years into the past, or because the range matches no transactions — return <code data-v-ee50c514${_scopeId2}>200</code> with the matching subset, empty where there is none. An LFI MAY return transactions older than two years where it holds them. The API Hub rejects malformed date-range requests before proxying — an unparseable date-time, a contradictory range (<code data-v-ee50c514${_scopeId2}>fromBookingDateTime</code> after <code data-v-ee50c514${_scopeId2}>toBookingDateTime</code>), or a <code data-v-ee50c514${_scopeId2}>toBookingDateTime</code> in the future — with <code data-v-ee50c514${_scopeId2}>400</code>, so the LFI receives only well-formed ranges. See <a href="#common-error-responses" data-v-ee50c514${_scopeId2}>Common error responses</a>. `);
                } else {
                  return [
                    createTextVNode(" The two-year rule is a "),
                    createVNode("strong", null, "minimum availability guarantee, not a query limit"),
                    createTextVNode(". An LFI MUST NOT reject a request solely because "),
                    createVNode("code", null, "fromBookingDateTime"),
                    createTextVNode(" or "),
                    createVNode("code", null, "toBookingDateTime"),
                    createTextVNode(" extends beyond two years into the past, or because the range matches no transactions — return "),
                    createVNode("code", null, "200"),
                    createTextVNode(" with the matching subset, empty where there is none. An LFI MAY return transactions older than two years where it holds them. The API Hub rejects malformed date-range requests before proxying — an unparseable date-time, a contradictory range ("),
                    createVNode("code", null, "fromBookingDateTime"),
                    createTextVNode(" after "),
                    createVNode("code", null, "toBookingDateTime"),
                    createTextVNode("), or a "),
                    createVNode("code", null, "toBookingDateTime"),
                    createTextVNode(" in the future — with "),
                    createVNode("code", null, "400"),
                    createTextVNode(", so the LFI receives only well-formed ranges. See "),
                    createVNode("a", { href: "#common-error-responses" }, "Common error responses"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: transactionsJson,
              lang: "json",
              filename: "GET /accounts/{accountId}/transactions response"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Errors: see <a href="#common-error-responses" data-v-ee50c514${_scopeId2}>Common error responses</a>.`);
                } else {
                  return [
                    createTextVNode("Errors: see "),
                    createVNode("a", { href: "#common-error-responses" }, "Common error responses"),
                    createTextVNode(".")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` See the <a href="/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-transactions" data-v-ee50c514${_scopeId2}>GET <code data-v-ee50c514${_scopeId2}>/accounts/{accountId}/transactions</code> API Reference</a> for the full schema. `);
                } else {
                  return [
                    createTextVNode(" See the "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-transactions" }, [
                      createTextVNode("GET "),
                      createVNode("code", null, "/accounts/{accountId}/transactions"),
                      createTextVNode(" API Reference")
                    ]),
                    createTextVNode(" for the full schema. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "ed-doc__endpoint" }, [
                createVNode("span", { class: "http-badge http-get" }, "GET"),
                createVNode("code", { class: "ed-doc__endpoint-path" }, "/accounts/{accountId}/transactions")
              ]),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Backs the TPP request "),
                  createVNode("code", null, "GET https://rs1.LFICODE.apihub.openfinance.ae/open-finance/account-information/vx.y/accounts/{AccountId}/transactions"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Returns the transactions for a single account, filtered by booking date-time where provided. Pagination is "),
                  createVNode("strong", null, "required"),
                  createTextVNode(" for this endpoint — see "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/api-guide/pagination" }, "Pagination"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Request headers"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("See "),
                  createVNode("a", { href: "#common-request-headers" }, "Common request headers"),
                  createTextVNode(". In addition:")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Header"),
                        createVNode("th", null, "Required"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "o3-fx-transactions")
                        ]),
                        createVNode("td", null, "No"),
                        createVNode("td", null, [
                          createTextVNode("If "),
                          createVNode("code", null, "true"),
                          createTextVNode(", return only FX-related transactions, based on permissions set in the related consent")
                        ])
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Path parameters"),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Parameter"),
                        createVNode("th", null, "Required"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "accountId")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, "The ID of the account whose transactions are being returned")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Query parameters"),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Parameter"),
                        createVNode("th", null, "Required"),
                        createVNode("th", null, "Default"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "fromBookingDateTime")
                        ]),
                        createVNode("td", null, "No"),
                        createVNode("td", null, "—"),
                        createVNode("td", null, "Return only transactions booked on or after this date-time. Open-ended if omitted. Any timezone offset MUST be ignored")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "toBookingDateTime")
                        ]),
                        createVNode("td", null, "No"),
                        createVNode("td", null, "—"),
                        createVNode("td", null, "Return only transactions booked on or before this date-time. Open-ended if omitted. Any timezone offset MUST be ignored")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "page")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, [
                          createVNode("code", null, "1")
                        ]),
                        createVNode("td", null, "Page number")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "page-size")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, [
                          createVNode("code", null, "100")
                        ]),
                        createVNode("td", null, "Records per page")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Response"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("code", null, "Content-Type: application/json")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" At least two years of transactions MUST be available for retrieval. If no transactions exist within the requested range, return "),
                  createVNode("code", null, "200"),
                  createTextVNode(" with an empty "),
                  createVNode("code", null, "data"),
                  createTextVNode(" array — do not return "),
                  createVNode("code", null, "404"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The two-year rule is a "),
                  createVNode("strong", null, "minimum availability guarantee, not a query limit"),
                  createTextVNode(". An LFI MUST NOT reject a request solely because "),
                  createVNode("code", null, "fromBookingDateTime"),
                  createTextVNode(" or "),
                  createVNode("code", null, "toBookingDateTime"),
                  createTextVNode(" extends beyond two years into the past, or because the range matches no transactions — return "),
                  createVNode("code", null, "200"),
                  createTextVNode(" with the matching subset, empty where there is none. An LFI MAY return transactions older than two years where it holds them. The API Hub rejects malformed date-range requests before proxying — an unparseable date-time, a contradictory range ("),
                  createVNode("code", null, "fromBookingDateTime"),
                  createTextVNode(" after "),
                  createVNode("code", null, "toBookingDateTime"),
                  createTextVNode("), or a "),
                  createVNode("code", null, "toBookingDateTime"),
                  createTextVNode(" in the future — with "),
                  createVNode("code", null, "400"),
                  createTextVNode(", so the LFI receives only well-formed ranges. See "),
                  createVNode("a", { href: "#common-error-responses" }, "Common error responses"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: transactionsJson,
                lang: "json",
                filename: "GET /accounts/{accountId}/transactions response"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Errors: see "),
                  createVNode("a", { href: "#common-error-responses" }, "Common error responses"),
                  createTextVNode(".")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" See the "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-transactions" }, [
                    createTextVNode("GET "),
                    createVNode("code", null, "/accounts/{accountId}/transactions"),
                    createTextVNode(" API Reference")
                  ]),
                  createTextVNode(" for the full schema. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "get-accounts-statements",
        num: "10",
        color: "var(--at-teal-deep)",
        eyebrow: "Endpoint",
        title: "GET /accounts/{accountId}/statements",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="ed-doc__endpoint" data-v-ee50c514${_scopeId}><span class="http-badge http-get" data-v-ee50c514${_scopeId}>GET</span><code class="ed-doc__endpoint-path" data-v-ee50c514${_scopeId}>/accounts/{accountId}/statements</code></div>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Backs the TPP request <code data-v-ee50c514${_scopeId2}>GET https://rs1.LFICODE.apihub.openfinance.ae/open-finance/account-information/vx.y/accounts/{AccountId}/statements</code>. `);
                } else {
                  return [
                    createTextVNode(" Backs the TPP request "),
                    createVNode("code", null, "GET https://rs1.LFICODE.apihub.openfinance.ae/open-finance/account-information/vx.y/accounts/{AccountId}/statements"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Returns the statements for a single account, filtered by statement date where provided. Pagination is <strong data-v-ee50c514${_scopeId2}>required</strong> for this endpoint — see <a href="/tech/lfi-api-hub/v2.1/banking/data-sharing/api-guide/pagination" data-v-ee50c514${_scopeId2}>Pagination</a>. `);
                } else {
                  return [
                    createTextVNode(" Returns the statements for a single account, filtered by statement date where provided. Pagination is "),
                    createVNode("strong", null, "required"),
                    createTextVNode(" for this endpoint — see "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/api-guide/pagination" }, "Pagination"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-ee50c514${_scopeId}>Request headers</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`See <a href="#common-request-headers" data-v-ee50c514${_scopeId2}>Common request headers</a>.`);
                } else {
                  return [
                    createTextVNode("See "),
                    createVNode("a", { href: "#common-request-headers" }, "Common request headers"),
                    createTextVNode(".")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-ee50c514${_scopeId}>Path parameters</h3>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-ee50c514${_scopeId2}><thead data-v-ee50c514${_scopeId2}><tr data-v-ee50c514${_scopeId2}><th data-v-ee50c514${_scopeId2}>Parameter</th><th data-v-ee50c514${_scopeId2}>Required</th><th data-v-ee50c514${_scopeId2}>Description</th></tr></thead><tbody data-v-ee50c514${_scopeId2}><tr data-v-ee50c514${_scopeId2}><td data-v-ee50c514${_scopeId2}><code data-v-ee50c514${_scopeId2}>accountId</code></td><td data-v-ee50c514${_scopeId2}>Yes</td><td data-v-ee50c514${_scopeId2}>The ID of the account whose statements are being returned</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Parameter"),
                          createVNode("th", null, "Required"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "accountId")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, "The ID of the account whose statements are being returned")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-ee50c514${_scopeId}>Query parameters</h3>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-ee50c514${_scopeId2}><thead data-v-ee50c514${_scopeId2}><tr data-v-ee50c514${_scopeId2}><th data-v-ee50c514${_scopeId2}>Parameter</th><th data-v-ee50c514${_scopeId2}>Required</th><th data-v-ee50c514${_scopeId2}>Default</th><th data-v-ee50c514${_scopeId2}>Description</th></tr></thead><tbody data-v-ee50c514${_scopeId2}><tr data-v-ee50c514${_scopeId2}><td data-v-ee50c514${_scopeId2}><code data-v-ee50c514${_scopeId2}>fromStatementDate</code></td><td data-v-ee50c514${_scopeId2}>No</td><td data-v-ee50c514${_scopeId2}>—</td><td data-v-ee50c514${_scopeId2}>Return only statements with a statement date on or after this date. Open-ended if omitted</td></tr><tr data-v-ee50c514${_scopeId2}><td data-v-ee50c514${_scopeId2}><code data-v-ee50c514${_scopeId2}>toStatementDate</code></td><td data-v-ee50c514${_scopeId2}>No</td><td data-v-ee50c514${_scopeId2}>—</td><td data-v-ee50c514${_scopeId2}>Return only statements with a statement date on or before this date. Open-ended if omitted</td></tr><tr data-v-ee50c514${_scopeId2}><td data-v-ee50c514${_scopeId2}><code data-v-ee50c514${_scopeId2}>page</code></td><td data-v-ee50c514${_scopeId2}>Yes</td><td data-v-ee50c514${_scopeId2}><code data-v-ee50c514${_scopeId2}>1</code></td><td data-v-ee50c514${_scopeId2}>Page number</td></tr><tr data-v-ee50c514${_scopeId2}><td data-v-ee50c514${_scopeId2}><code data-v-ee50c514${_scopeId2}>page-size</code></td><td data-v-ee50c514${_scopeId2}>Yes</td><td data-v-ee50c514${_scopeId2}><code data-v-ee50c514${_scopeId2}>100</code></td><td data-v-ee50c514${_scopeId2}>Records per page</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Parameter"),
                          createVNode("th", null, "Required"),
                          createVNode("th", null, "Default"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "fromStatementDate")
                          ]),
                          createVNode("td", null, "No"),
                          createVNode("td", null, "—"),
                          createVNode("td", null, "Return only statements with a statement date on or after this date. Open-ended if omitted")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "toStatementDate")
                          ]),
                          createVNode("td", null, "No"),
                          createVNode("td", null, "—"),
                          createVNode("td", null, "Return only statements with a statement date on or before this date. Open-ended if omitted")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "page")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, [
                            createVNode("code", null, "1")
                          ]),
                          createVNode("td", null, "Page number")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "page-size")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, [
                            createVNode("code", null, "100")
                          ]),
                          createVNode("td", null, "Records per page")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-ee50c514${_scopeId}>Response</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<code data-v-ee50c514${_scopeId2}>Content-Type: application/json</code>`);
                } else {
                  return [
                    createVNode("code", null, "Content-Type: application/json")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` At least two years of statements MUST be available for retrieval. If no statements exist in the requested range, return <code data-v-ee50c514${_scopeId2}>200</code> with an empty <code data-v-ee50c514${_scopeId2}>data</code> array. `);
                } else {
                  return [
                    createTextVNode(" At least two years of statements MUST be available for retrieval. If no statements exist in the requested range, return "),
                    createVNode("code", null, "200"),
                    createTextVNode(" with an empty "),
                    createVNode("code", null, "data"),
                    createTextVNode(" array. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` As with transactions, the two-year rule is a <strong data-v-ee50c514${_scopeId2}>minimum availability guarantee, not a query limit</strong>. An LFI MUST NOT reject a request solely because <code data-v-ee50c514${_scopeId2}>fromStatementDate</code> or <code data-v-ee50c514${_scopeId2}>toStatementDate</code> extends beyond two years into the past, or because the range matches no statements — return <code data-v-ee50c514${_scopeId2}>200</code> with the matching subset, empty where there is none. An LFI MAY return statements older than two years where it holds them. The API Hub rejects malformed date-range requests before proxying — an unparseable date, a contradictory range (<code data-v-ee50c514${_scopeId2}>fromStatementDate</code> after <code data-v-ee50c514${_scopeId2}>toStatementDate</code>), or a <code data-v-ee50c514${_scopeId2}>toStatementDate</code> in the future — with <code data-v-ee50c514${_scopeId2}>400</code>, so the LFI receives only well-formed ranges. See <a href="#common-error-responses" data-v-ee50c514${_scopeId2}>Common error responses</a>. `);
                } else {
                  return [
                    createTextVNode(" As with transactions, the two-year rule is a "),
                    createVNode("strong", null, "minimum availability guarantee, not a query limit"),
                    createTextVNode(". An LFI MUST NOT reject a request solely because "),
                    createVNode("code", null, "fromStatementDate"),
                    createTextVNode(" or "),
                    createVNode("code", null, "toStatementDate"),
                    createTextVNode(" extends beyond two years into the past, or because the range matches no statements — return "),
                    createVNode("code", null, "200"),
                    createTextVNode(" with the matching subset, empty where there is none. An LFI MAY return statements older than two years where it holds them. The API Hub rejects malformed date-range requests before proxying — an unparseable date, a contradictory range ("),
                    createVNode("code", null, "fromStatementDate"),
                    createTextVNode(" after "),
                    createVNode("code", null, "toStatementDate"),
                    createTextVNode("), or a "),
                    createVNode("code", null, "toStatementDate"),
                    createTextVNode(" in the future — with "),
                    createVNode("code", null, "400"),
                    createTextVNode(", so the LFI receives only well-formed ranges. See "),
                    createVNode("a", { href: "#common-error-responses" }, "Common error responses"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: statementsJson,
              lang: "json",
              filename: "GET /accounts/{accountId}/statements response"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Errors: see <a href="#common-error-responses" data-v-ee50c514${_scopeId2}>Common error responses</a>.`);
                } else {
                  return [
                    createTextVNode("Errors: see "),
                    createVNode("a", { href: "#common-error-responses" }, "Common error responses"),
                    createTextVNode(".")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` See the <a href="/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-statements" data-v-ee50c514${_scopeId2}>GET <code data-v-ee50c514${_scopeId2}>/accounts/{accountId}/statements</code> API Reference</a> for the full schema. `);
                } else {
                  return [
                    createTextVNode(" See the "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-statements" }, [
                      createTextVNode("GET "),
                      createVNode("code", null, "/accounts/{accountId}/statements"),
                      createTextVNode(" API Reference")
                    ]),
                    createTextVNode(" for the full schema. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "ed-doc__endpoint" }, [
                createVNode("span", { class: "http-badge http-get" }, "GET"),
                createVNode("code", { class: "ed-doc__endpoint-path" }, "/accounts/{accountId}/statements")
              ]),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Backs the TPP request "),
                  createVNode("code", null, "GET https://rs1.LFICODE.apihub.openfinance.ae/open-finance/account-information/vx.y/accounts/{AccountId}/statements"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Returns the statements for a single account, filtered by statement date where provided. Pagination is "),
                  createVNode("strong", null, "required"),
                  createTextVNode(" for this endpoint — see "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/api-guide/pagination" }, "Pagination"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Request headers"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("See "),
                  createVNode("a", { href: "#common-request-headers" }, "Common request headers"),
                  createTextVNode(".")
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Path parameters"),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Parameter"),
                        createVNode("th", null, "Required"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "accountId")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, "The ID of the account whose statements are being returned")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Query parameters"),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Parameter"),
                        createVNode("th", null, "Required"),
                        createVNode("th", null, "Default"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "fromStatementDate")
                        ]),
                        createVNode("td", null, "No"),
                        createVNode("td", null, "—"),
                        createVNode("td", null, "Return only statements with a statement date on or after this date. Open-ended if omitted")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "toStatementDate")
                        ]),
                        createVNode("td", null, "No"),
                        createVNode("td", null, "—"),
                        createVNode("td", null, "Return only statements with a statement date on or before this date. Open-ended if omitted")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "page")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, [
                          createVNode("code", null, "1")
                        ]),
                        createVNode("td", null, "Page number")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "page-size")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, [
                          createVNode("code", null, "100")
                        ]),
                        createVNode("td", null, "Records per page")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Response"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("code", null, "Content-Type: application/json")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" At least two years of statements MUST be available for retrieval. If no statements exist in the requested range, return "),
                  createVNode("code", null, "200"),
                  createTextVNode(" with an empty "),
                  createVNode("code", null, "data"),
                  createTextVNode(" array. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" As with transactions, the two-year rule is a "),
                  createVNode("strong", null, "minimum availability guarantee, not a query limit"),
                  createTextVNode(". An LFI MUST NOT reject a request solely because "),
                  createVNode("code", null, "fromStatementDate"),
                  createTextVNode(" or "),
                  createVNode("code", null, "toStatementDate"),
                  createTextVNode(" extends beyond two years into the past, or because the range matches no statements — return "),
                  createVNode("code", null, "200"),
                  createTextVNode(" with the matching subset, empty where there is none. An LFI MAY return statements older than two years where it holds them. The API Hub rejects malformed date-range requests before proxying — an unparseable date, a contradictory range ("),
                  createVNode("code", null, "fromStatementDate"),
                  createTextVNode(" after "),
                  createVNode("code", null, "toStatementDate"),
                  createTextVNode("), or a "),
                  createVNode("code", null, "toStatementDate"),
                  createTextVNode(" in the future — with "),
                  createVNode("code", null, "400"),
                  createTextVNode(", so the LFI receives only well-formed ranges. See "),
                  createVNode("a", { href: "#common-error-responses" }, "Common error responses"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: statementsJson,
                lang: "json",
                filename: "GET /accounts/{accountId}/statements response"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Errors: see "),
                  createVNode("a", { href: "#common-error-responses" }, "Common error responses"),
                  createTextVNode(".")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" See the "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-statements" }, [
                    createTextVNode("GET "),
                    createVNode("code", null, "/accounts/{accountId}/statements"),
                    createTextVNode(" API Reference")
                  ]),
                  createTextVNode(" for the full schema. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "get-accounts-beneficiaries",
        num: "11",
        color: "var(--at-teal)",
        eyebrow: "Endpoint",
        title: "GET /accounts/{accountId}/beneficiaries",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="ed-doc__endpoint" data-v-ee50c514${_scopeId}><span class="http-badge http-get" data-v-ee50c514${_scopeId}>GET</span><code class="ed-doc__endpoint-path" data-v-ee50c514${_scopeId}>/accounts/{accountId}/beneficiaries</code></div>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Backs the TPP request <code data-v-ee50c514${_scopeId2}>GET https://rs1.LFICODE.apihub.openfinance.ae/open-finance/account-information/vx.y/accounts/{AccountId}/beneficiaries</code>. `);
                } else {
                  return [
                    createTextVNode(" Backs the TPP request "),
                    createVNode("code", null, "GET https://rs1.LFICODE.apihub.openfinance.ae/open-finance/account-information/vx.y/accounts/{AccountId}/beneficiaries"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Returns the beneficiaries linked to the account. Only supported for <code data-v-ee50c514${_scopeId2}>CurrentAccount</code> and <code data-v-ee50c514${_scopeId2}>Savings</code> — not available for <code data-v-ee50c514${_scopeId2}>CreditCard</code>, <code data-v-ee50c514${_scopeId2}>Finance</code>, or <code data-v-ee50c514${_scopeId2}>Mortgage</code> accounts. `);
                } else {
                  return [
                    createTextVNode(" Returns the beneficiaries linked to the account. Only supported for "),
                    createVNode("code", null, "CurrentAccount"),
                    createTextVNode(" and "),
                    createVNode("code", null, "Savings"),
                    createTextVNode(" — not available for "),
                    createVNode("code", null, "CreditCard"),
                    createTextVNode(", "),
                    createVNode("code", null, "Finance"),
                    createTextVNode(", or "),
                    createVNode("code", null, "Mortgage"),
                    createTextVNode(" accounts. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-ee50c514${_scopeId}>Request headers</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`See <a href="#common-request-headers" data-v-ee50c514${_scopeId2}>Common request headers</a>.`);
                } else {
                  return [
                    createTextVNode("See "),
                    createVNode("a", { href: "#common-request-headers" }, "Common request headers"),
                    createTextVNode(".")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-ee50c514${_scopeId}>Path parameters</h3>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-ee50c514${_scopeId2}><thead data-v-ee50c514${_scopeId2}><tr data-v-ee50c514${_scopeId2}><th data-v-ee50c514${_scopeId2}>Parameter</th><th data-v-ee50c514${_scopeId2}>Required</th><th data-v-ee50c514${_scopeId2}>Description</th></tr></thead><tbody data-v-ee50c514${_scopeId2}><tr data-v-ee50c514${_scopeId2}><td data-v-ee50c514${_scopeId2}><code data-v-ee50c514${_scopeId2}>accountId</code></td><td data-v-ee50c514${_scopeId2}>Yes</td><td data-v-ee50c514${_scopeId2}>The ID of the account whose beneficiaries are being returned</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Parameter"),
                          createVNode("th", null, "Required"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "accountId")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, "The ID of the account whose beneficiaries are being returned")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-ee50c514${_scopeId}>Query parameters</h3>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-ee50c514${_scopeId2}><thead data-v-ee50c514${_scopeId2}><tr data-v-ee50c514${_scopeId2}><th data-v-ee50c514${_scopeId2}>Parameter</th><th data-v-ee50c514${_scopeId2}>Required</th><th data-v-ee50c514${_scopeId2}>Default</th><th data-v-ee50c514${_scopeId2}>Description</th></tr></thead><tbody data-v-ee50c514${_scopeId2}><tr data-v-ee50c514${_scopeId2}><td data-v-ee50c514${_scopeId2}><code data-v-ee50c514${_scopeId2}>page</code></td><td data-v-ee50c514${_scopeId2}>Yes</td><td data-v-ee50c514${_scopeId2}><code data-v-ee50c514${_scopeId2}>1</code></td><td data-v-ee50c514${_scopeId2}>Page number</td></tr><tr data-v-ee50c514${_scopeId2}><td data-v-ee50c514${_scopeId2}><code data-v-ee50c514${_scopeId2}>page-size</code></td><td data-v-ee50c514${_scopeId2}>Yes</td><td data-v-ee50c514${_scopeId2}><code data-v-ee50c514${_scopeId2}>100</code></td><td data-v-ee50c514${_scopeId2}>Records per page</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Parameter"),
                          createVNode("th", null, "Required"),
                          createVNode("th", null, "Default"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "page")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, [
                            createVNode("code", null, "1")
                          ]),
                          createVNode("td", null, "Page number")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "page-size")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, [
                            createVNode("code", null, "100")
                          ]),
                          createVNode("td", null, "Records per page")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-ee50c514${_scopeId}>Response</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<code data-v-ee50c514${_scopeId2}>Content-Type: application/json</code>`);
                } else {
                  return [
                    createVNode("code", null, "Content-Type: application/json")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` If the account holds no beneficiaries, return <code data-v-ee50c514${_scopeId2}>200</code> with an empty <code data-v-ee50c514${_scopeId2}>data</code> array — do not return <code data-v-ee50c514${_scopeId2}>404</code>. `);
                } else {
                  return [
                    createTextVNode(" If the account holds no beneficiaries, return "),
                    createVNode("code", null, "200"),
                    createTextVNode(" with an empty "),
                    createVNode("code", null, "data"),
                    createTextVNode(" array — do not return "),
                    createVNode("code", null, "404"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: beneficiariesJson,
              lang: "json",
              filename: "GET /accounts/{accountId}/beneficiaries response"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Errors: see <a href="#common-error-responses" data-v-ee50c514${_scopeId2}>Common error responses</a>.`);
                } else {
                  return [
                    createTextVNode("Errors: see "),
                    createVNode("a", { href: "#common-error-responses" }, "Common error responses"),
                    createTextVNode(".")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` See the <a href="/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-beneficiaries" data-v-ee50c514${_scopeId2}>GET <code data-v-ee50c514${_scopeId2}>/accounts/{accountId}/beneficiaries</code> API Reference</a> for the full schema. `);
                } else {
                  return [
                    createTextVNode(" See the "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-beneficiaries" }, [
                      createTextVNode("GET "),
                      createVNode("code", null, "/accounts/{accountId}/beneficiaries"),
                      createTextVNode(" API Reference")
                    ]),
                    createTextVNode(" for the full schema. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "ed-doc__endpoint" }, [
                createVNode("span", { class: "http-badge http-get" }, "GET"),
                createVNode("code", { class: "ed-doc__endpoint-path" }, "/accounts/{accountId}/beneficiaries")
              ]),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Backs the TPP request "),
                  createVNode("code", null, "GET https://rs1.LFICODE.apihub.openfinance.ae/open-finance/account-information/vx.y/accounts/{AccountId}/beneficiaries"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Returns the beneficiaries linked to the account. Only supported for "),
                  createVNode("code", null, "CurrentAccount"),
                  createTextVNode(" and "),
                  createVNode("code", null, "Savings"),
                  createTextVNode(" — not available for "),
                  createVNode("code", null, "CreditCard"),
                  createTextVNode(", "),
                  createVNode("code", null, "Finance"),
                  createTextVNode(", or "),
                  createVNode("code", null, "Mortgage"),
                  createTextVNode(" accounts. ")
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Request headers"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("See "),
                  createVNode("a", { href: "#common-request-headers" }, "Common request headers"),
                  createTextVNode(".")
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Path parameters"),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Parameter"),
                        createVNode("th", null, "Required"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "accountId")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, "The ID of the account whose beneficiaries are being returned")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Query parameters"),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Parameter"),
                        createVNode("th", null, "Required"),
                        createVNode("th", null, "Default"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "page")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, [
                          createVNode("code", null, "1")
                        ]),
                        createVNode("td", null, "Page number")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "page-size")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, [
                          createVNode("code", null, "100")
                        ]),
                        createVNode("td", null, "Records per page")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Response"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("code", null, "Content-Type: application/json")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" If the account holds no beneficiaries, return "),
                  createVNode("code", null, "200"),
                  createTextVNode(" with an empty "),
                  createVNode("code", null, "data"),
                  createTextVNode(" array — do not return "),
                  createVNode("code", null, "404"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: beneficiariesJson,
                lang: "json",
                filename: "GET /accounts/{accountId}/beneficiaries response"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Errors: see "),
                  createVNode("a", { href: "#common-error-responses" }, "Common error responses"),
                  createTextVNode(".")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" See the "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-beneficiaries" }, [
                    createTextVNode("GET "),
                    createVNode("code", null, "/accounts/{accountId}/beneficiaries"),
                    createTextVNode(" API Reference")
                  ]),
                  createTextVNode(" for the full schema. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "get-accounts-direct-debits",
        num: "12",
        color: "var(--at-gold)",
        eyebrow: "Endpoint",
        title: "GET /accounts/{accountId}/direct-debits",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="ed-doc__endpoint" data-v-ee50c514${_scopeId}><span class="http-badge http-get" data-v-ee50c514${_scopeId}>GET</span><code class="ed-doc__endpoint-path" data-v-ee50c514${_scopeId}>/accounts/{accountId}/direct-debits</code></div>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Backs the TPP request <code data-v-ee50c514${_scopeId2}>GET https://rs1.LFICODE.apihub.openfinance.ae/open-finance/account-information/vx.y/accounts/{AccountId}/direct-debits</code>. `);
                } else {
                  return [
                    createTextVNode(" Backs the TPP request "),
                    createVNode("code", null, "GET https://rs1.LFICODE.apihub.openfinance.ae/open-finance/account-information/vx.y/accounts/{AccountId}/direct-debits"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Returns the direct debits linked to the account. Only supported for <code data-v-ee50c514${_scopeId2}>CurrentAccount</code> and <code data-v-ee50c514${_scopeId2}>Savings</code>. `);
                } else {
                  return [
                    createTextVNode(" Returns the direct debits linked to the account. Only supported for "),
                    createVNode("code", null, "CurrentAccount"),
                    createTextVNode(" and "),
                    createVNode("code", null, "Savings"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-ee50c514${_scopeId}>Request headers</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`See <a href="#common-request-headers" data-v-ee50c514${_scopeId2}>Common request headers</a>.`);
                } else {
                  return [
                    createTextVNode("See "),
                    createVNode("a", { href: "#common-request-headers" }, "Common request headers"),
                    createTextVNode(".")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-ee50c514${_scopeId}>Path parameters</h3>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-ee50c514${_scopeId2}><thead data-v-ee50c514${_scopeId2}><tr data-v-ee50c514${_scopeId2}><th data-v-ee50c514${_scopeId2}>Parameter</th><th data-v-ee50c514${_scopeId2}>Required</th><th data-v-ee50c514${_scopeId2}>Description</th></tr></thead><tbody data-v-ee50c514${_scopeId2}><tr data-v-ee50c514${_scopeId2}><td data-v-ee50c514${_scopeId2}><code data-v-ee50c514${_scopeId2}>accountId</code></td><td data-v-ee50c514${_scopeId2}>Yes</td><td data-v-ee50c514${_scopeId2}>The ID of the account whose direct debits are being returned</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Parameter"),
                          createVNode("th", null, "Required"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "accountId")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, "The ID of the account whose direct debits are being returned")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-ee50c514${_scopeId}>Query parameters</h3>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-ee50c514${_scopeId2}><thead data-v-ee50c514${_scopeId2}><tr data-v-ee50c514${_scopeId2}><th data-v-ee50c514${_scopeId2}>Parameter</th><th data-v-ee50c514${_scopeId2}>Required</th><th data-v-ee50c514${_scopeId2}>Default</th><th data-v-ee50c514${_scopeId2}>Description</th></tr></thead><tbody data-v-ee50c514${_scopeId2}><tr data-v-ee50c514${_scopeId2}><td data-v-ee50c514${_scopeId2}><code data-v-ee50c514${_scopeId2}>page</code></td><td data-v-ee50c514${_scopeId2}>Yes</td><td data-v-ee50c514${_scopeId2}><code data-v-ee50c514${_scopeId2}>1</code></td><td data-v-ee50c514${_scopeId2}>Page number</td></tr><tr data-v-ee50c514${_scopeId2}><td data-v-ee50c514${_scopeId2}><code data-v-ee50c514${_scopeId2}>page-size</code></td><td data-v-ee50c514${_scopeId2}>Yes</td><td data-v-ee50c514${_scopeId2}><code data-v-ee50c514${_scopeId2}>100</code></td><td data-v-ee50c514${_scopeId2}>Records per page</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Parameter"),
                          createVNode("th", null, "Required"),
                          createVNode("th", null, "Default"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "page")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, [
                            createVNode("code", null, "1")
                          ]),
                          createVNode("td", null, "Page number")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "page-size")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, [
                            createVNode("code", null, "100")
                          ]),
                          createVNode("td", null, "Records per page")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-ee50c514${_scopeId}>Response</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<code data-v-ee50c514${_scopeId2}>Content-Type: application/json</code>`);
                } else {
                  return [
                    createVNode("code", null, "Content-Type: application/json")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` If the account holds no direct debits, return <code data-v-ee50c514${_scopeId2}>200</code> with an empty <code data-v-ee50c514${_scopeId2}>data</code> array. `);
                } else {
                  return [
                    createTextVNode(" If the account holds no direct debits, return "),
                    createVNode("code", null, "200"),
                    createTextVNode(" with an empty "),
                    createVNode("code", null, "data"),
                    createTextVNode(" array. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: directDebitsJson,
              lang: "json",
              filename: "GET /accounts/{accountId}/direct-debits response"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Errors: see <a href="#common-error-responses" data-v-ee50c514${_scopeId2}>Common error responses</a>.`);
                } else {
                  return [
                    createTextVNode("Errors: see "),
                    createVNode("a", { href: "#common-error-responses" }, "Common error responses"),
                    createTextVNode(".")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` See the <a href="/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-direct-debits" data-v-ee50c514${_scopeId2}>GET <code data-v-ee50c514${_scopeId2}>/accounts/{accountId}/direct-debits</code> API Reference</a> for the full schema. `);
                } else {
                  return [
                    createTextVNode(" See the "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-direct-debits" }, [
                      createTextVNode("GET "),
                      createVNode("code", null, "/accounts/{accountId}/direct-debits"),
                      createTextVNode(" API Reference")
                    ]),
                    createTextVNode(" for the full schema. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "ed-doc__endpoint" }, [
                createVNode("span", { class: "http-badge http-get" }, "GET"),
                createVNode("code", { class: "ed-doc__endpoint-path" }, "/accounts/{accountId}/direct-debits")
              ]),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Backs the TPP request "),
                  createVNode("code", null, "GET https://rs1.LFICODE.apihub.openfinance.ae/open-finance/account-information/vx.y/accounts/{AccountId}/direct-debits"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Returns the direct debits linked to the account. Only supported for "),
                  createVNode("code", null, "CurrentAccount"),
                  createTextVNode(" and "),
                  createVNode("code", null, "Savings"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Request headers"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("See "),
                  createVNode("a", { href: "#common-request-headers" }, "Common request headers"),
                  createTextVNode(".")
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Path parameters"),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Parameter"),
                        createVNode("th", null, "Required"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "accountId")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, "The ID of the account whose direct debits are being returned")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Query parameters"),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Parameter"),
                        createVNode("th", null, "Required"),
                        createVNode("th", null, "Default"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "page")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, [
                          createVNode("code", null, "1")
                        ]),
                        createVNode("td", null, "Page number")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "page-size")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, [
                          createVNode("code", null, "100")
                        ]),
                        createVNode("td", null, "Records per page")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Response"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("code", null, "Content-Type: application/json")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" If the account holds no direct debits, return "),
                  createVNode("code", null, "200"),
                  createTextVNode(" with an empty "),
                  createVNode("code", null, "data"),
                  createTextVNode(" array. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: directDebitsJson,
                lang: "json",
                filename: "GET /accounts/{accountId}/direct-debits response"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Errors: see "),
                  createVNode("a", { href: "#common-error-responses" }, "Common error responses"),
                  createTextVNode(".")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" See the "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-direct-debits" }, [
                    createTextVNode("GET "),
                    createVNode("code", null, "/accounts/{accountId}/direct-debits"),
                    createTextVNode(" API Reference")
                  ]),
                  createTextVNode(" for the full schema. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "get-accounts-scheduled-payments",
        num: "13",
        color: "var(--at-blue-deep, #1d4ed8)",
        eyebrow: "Endpoint",
        title: "GET /accounts/{accountId}/scheduled-payments",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="ed-doc__endpoint" data-v-ee50c514${_scopeId}><span class="http-badge http-get" data-v-ee50c514${_scopeId}>GET</span><code class="ed-doc__endpoint-path" data-v-ee50c514${_scopeId}>/accounts/{accountId}/scheduled-payments</code></div>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Backs the TPP request <code data-v-ee50c514${_scopeId2}>GET https://rs1.LFICODE.apihub.openfinance.ae/open-finance/account-information/vx.y/accounts/{AccountId}/scheduled-payments</code>. `);
                } else {
                  return [
                    createTextVNode(" Backs the TPP request "),
                    createVNode("code", null, "GET https://rs1.LFICODE.apihub.openfinance.ae/open-finance/account-information/vx.y/accounts/{AccountId}/scheduled-payments"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Returns one-off scheduled payments linked to the account. Only supported for <code data-v-ee50c514${_scopeId2}>CurrentAccount</code> and <code data-v-ee50c514${_scopeId2}>Savings</code>. `);
                } else {
                  return [
                    createTextVNode(" Returns one-off scheduled payments linked to the account. Only supported for "),
                    createVNode("code", null, "CurrentAccount"),
                    createTextVNode(" and "),
                    createVNode("code", null, "Savings"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-ee50c514${_scopeId}>Request headers</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`See <a href="#common-request-headers" data-v-ee50c514${_scopeId2}>Common request headers</a>.`);
                } else {
                  return [
                    createTextVNode("See "),
                    createVNode("a", { href: "#common-request-headers" }, "Common request headers"),
                    createTextVNode(".")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-ee50c514${_scopeId}>Path parameters</h3>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-ee50c514${_scopeId2}><thead data-v-ee50c514${_scopeId2}><tr data-v-ee50c514${_scopeId2}><th data-v-ee50c514${_scopeId2}>Parameter</th><th data-v-ee50c514${_scopeId2}>Required</th><th data-v-ee50c514${_scopeId2}>Description</th></tr></thead><tbody data-v-ee50c514${_scopeId2}><tr data-v-ee50c514${_scopeId2}><td data-v-ee50c514${_scopeId2}><code data-v-ee50c514${_scopeId2}>accountId</code></td><td data-v-ee50c514${_scopeId2}>Yes</td><td data-v-ee50c514${_scopeId2}>The ID of the account whose scheduled payments are being returned</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Parameter"),
                          createVNode("th", null, "Required"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "accountId")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, "The ID of the account whose scheduled payments are being returned")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-ee50c514${_scopeId}>Query parameters</h3>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-ee50c514${_scopeId2}><thead data-v-ee50c514${_scopeId2}><tr data-v-ee50c514${_scopeId2}><th data-v-ee50c514${_scopeId2}>Parameter</th><th data-v-ee50c514${_scopeId2}>Required</th><th data-v-ee50c514${_scopeId2}>Default</th><th data-v-ee50c514${_scopeId2}>Description</th></tr></thead><tbody data-v-ee50c514${_scopeId2}><tr data-v-ee50c514${_scopeId2}><td data-v-ee50c514${_scopeId2}><code data-v-ee50c514${_scopeId2}>page</code></td><td data-v-ee50c514${_scopeId2}>Yes</td><td data-v-ee50c514${_scopeId2}><code data-v-ee50c514${_scopeId2}>1</code></td><td data-v-ee50c514${_scopeId2}>Page number</td></tr><tr data-v-ee50c514${_scopeId2}><td data-v-ee50c514${_scopeId2}><code data-v-ee50c514${_scopeId2}>page-size</code></td><td data-v-ee50c514${_scopeId2}>Yes</td><td data-v-ee50c514${_scopeId2}><code data-v-ee50c514${_scopeId2}>100</code></td><td data-v-ee50c514${_scopeId2}>Records per page</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Parameter"),
                          createVNode("th", null, "Required"),
                          createVNode("th", null, "Default"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "page")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, [
                            createVNode("code", null, "1")
                          ]),
                          createVNode("td", null, "Page number")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "page-size")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, [
                            createVNode("code", null, "100")
                          ]),
                          createVNode("td", null, "Records per page")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-ee50c514${_scopeId}>Response</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<code data-v-ee50c514${_scopeId2}>Content-Type: application/json</code>`);
                } else {
                  return [
                    createVNode("code", null, "Content-Type: application/json")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: scheduledPaymentsJson,
              lang: "json",
              filename: "GET /accounts/{accountId}/scheduled-payments response"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Errors: see <a href="#common-error-responses" data-v-ee50c514${_scopeId2}>Common error responses</a>.`);
                } else {
                  return [
                    createTextVNode("Errors: see "),
                    createVNode("a", { href: "#common-error-responses" }, "Common error responses"),
                    createTextVNode(".")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` See the <a href="/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-scheduled-payments" data-v-ee50c514${_scopeId2}>GET <code data-v-ee50c514${_scopeId2}>/accounts/{accountId}/scheduled-payments</code> API Reference</a> for the full schema. `);
                } else {
                  return [
                    createTextVNode(" See the "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-scheduled-payments" }, [
                      createTextVNode("GET "),
                      createVNode("code", null, "/accounts/{accountId}/scheduled-payments"),
                      createTextVNode(" API Reference")
                    ]),
                    createTextVNode(" for the full schema. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "ed-doc__endpoint" }, [
                createVNode("span", { class: "http-badge http-get" }, "GET"),
                createVNode("code", { class: "ed-doc__endpoint-path" }, "/accounts/{accountId}/scheduled-payments")
              ]),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Backs the TPP request "),
                  createVNode("code", null, "GET https://rs1.LFICODE.apihub.openfinance.ae/open-finance/account-information/vx.y/accounts/{AccountId}/scheduled-payments"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Returns one-off scheduled payments linked to the account. Only supported for "),
                  createVNode("code", null, "CurrentAccount"),
                  createTextVNode(" and "),
                  createVNode("code", null, "Savings"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Request headers"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("See "),
                  createVNode("a", { href: "#common-request-headers" }, "Common request headers"),
                  createTextVNode(".")
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Path parameters"),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Parameter"),
                        createVNode("th", null, "Required"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "accountId")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, "The ID of the account whose scheduled payments are being returned")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Query parameters"),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Parameter"),
                        createVNode("th", null, "Required"),
                        createVNode("th", null, "Default"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "page")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, [
                          createVNode("code", null, "1")
                        ]),
                        createVNode("td", null, "Page number")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "page-size")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, [
                          createVNode("code", null, "100")
                        ]),
                        createVNode("td", null, "Records per page")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Response"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("code", null, "Content-Type: application/json")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: scheduledPaymentsJson,
                lang: "json",
                filename: "GET /accounts/{accountId}/scheduled-payments response"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Errors: see "),
                  createVNode("a", { href: "#common-error-responses" }, "Common error responses"),
                  createTextVNode(".")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" See the "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-scheduled-payments" }, [
                    createTextVNode("GET "),
                    createVNode("code", null, "/accounts/{accountId}/scheduled-payments"),
                    createTextVNode(" API Reference")
                  ]),
                  createTextVNode(" for the full schema. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "get-accounts-standing-orders",
        num: "14",
        color: "var(--at-navy)",
        eyebrow: "Endpoint",
        title: "GET /accounts/{accountId}/standing-orders",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="ed-doc__endpoint" data-v-ee50c514${_scopeId}><span class="http-badge http-get" data-v-ee50c514${_scopeId}>GET</span><code class="ed-doc__endpoint-path" data-v-ee50c514${_scopeId}>/accounts/{accountId}/standing-orders</code></div>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Backs the TPP request <code data-v-ee50c514${_scopeId2}>GET https://rs1.LFICODE.apihub.openfinance.ae/open-finance/account-information/vx.y/accounts/{AccountId}/standing-orders</code>. `);
                } else {
                  return [
                    createTextVNode(" Backs the TPP request "),
                    createVNode("code", null, "GET https://rs1.LFICODE.apihub.openfinance.ae/open-finance/account-information/vx.y/accounts/{AccountId}/standing-orders"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Returns standing orders linked to the account. Only supported for <code data-v-ee50c514${_scopeId2}>CurrentAccount</code> and <code data-v-ee50c514${_scopeId2}>Savings</code>. `);
                } else {
                  return [
                    createTextVNode(" Returns standing orders linked to the account. Only supported for "),
                    createVNode("code", null, "CurrentAccount"),
                    createTextVNode(" and "),
                    createVNode("code", null, "Savings"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-ee50c514${_scopeId}>Request headers</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`See <a href="#common-request-headers" data-v-ee50c514${_scopeId2}>Common request headers</a>.`);
                } else {
                  return [
                    createTextVNode("See "),
                    createVNode("a", { href: "#common-request-headers" }, "Common request headers"),
                    createTextVNode(".")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-ee50c514${_scopeId}>Path parameters</h3>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-ee50c514${_scopeId2}><thead data-v-ee50c514${_scopeId2}><tr data-v-ee50c514${_scopeId2}><th data-v-ee50c514${_scopeId2}>Parameter</th><th data-v-ee50c514${_scopeId2}>Required</th><th data-v-ee50c514${_scopeId2}>Description</th></tr></thead><tbody data-v-ee50c514${_scopeId2}><tr data-v-ee50c514${_scopeId2}><td data-v-ee50c514${_scopeId2}><code data-v-ee50c514${_scopeId2}>accountId</code></td><td data-v-ee50c514${_scopeId2}>Yes</td><td data-v-ee50c514${_scopeId2}>The ID of the account whose standing orders are being returned</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Parameter"),
                          createVNode("th", null, "Required"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "accountId")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, "The ID of the account whose standing orders are being returned")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-ee50c514${_scopeId}>Query parameters</h3>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-ee50c514${_scopeId2}><thead data-v-ee50c514${_scopeId2}><tr data-v-ee50c514${_scopeId2}><th data-v-ee50c514${_scopeId2}>Parameter</th><th data-v-ee50c514${_scopeId2}>Required</th><th data-v-ee50c514${_scopeId2}>Default</th><th data-v-ee50c514${_scopeId2}>Description</th></tr></thead><tbody data-v-ee50c514${_scopeId2}><tr data-v-ee50c514${_scopeId2}><td data-v-ee50c514${_scopeId2}><code data-v-ee50c514${_scopeId2}>page</code></td><td data-v-ee50c514${_scopeId2}>Yes</td><td data-v-ee50c514${_scopeId2}><code data-v-ee50c514${_scopeId2}>1</code></td><td data-v-ee50c514${_scopeId2}>Page number</td></tr><tr data-v-ee50c514${_scopeId2}><td data-v-ee50c514${_scopeId2}><code data-v-ee50c514${_scopeId2}>page-size</code></td><td data-v-ee50c514${_scopeId2}>Yes</td><td data-v-ee50c514${_scopeId2}><code data-v-ee50c514${_scopeId2}>100</code></td><td data-v-ee50c514${_scopeId2}>Records per page</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Parameter"),
                          createVNode("th", null, "Required"),
                          createVNode("th", null, "Default"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "page")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, [
                            createVNode("code", null, "1")
                          ]),
                          createVNode("td", null, "Page number")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "page-size")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, [
                            createVNode("code", null, "100")
                          ]),
                          createVNode("td", null, "Records per page")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-ee50c514${_scopeId}>Response</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<code data-v-ee50c514${_scopeId2}>Content-Type: application/json</code>`);
                } else {
                  return [
                    createVNode("code", null, "Content-Type: application/json")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: standingOrdersJson,
              lang: "json",
              filename: "GET /accounts/{accountId}/standing-orders response"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Errors: see <a href="#common-error-responses" data-v-ee50c514${_scopeId2}>Common error responses</a>.`);
                } else {
                  return [
                    createTextVNode("Errors: see "),
                    createVNode("a", { href: "#common-error-responses" }, "Common error responses"),
                    createTextVNode(".")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` See the <a href="/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-standing-orders" data-v-ee50c514${_scopeId2}>GET <code data-v-ee50c514${_scopeId2}>/accounts/{accountId}/standing-orders</code> API Reference</a> for the full schema. `);
                } else {
                  return [
                    createTextVNode(" See the "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-standing-orders" }, [
                      createTextVNode("GET "),
                      createVNode("code", null, "/accounts/{accountId}/standing-orders"),
                      createTextVNode(" API Reference")
                    ]),
                    createTextVNode(" for the full schema. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "ed-doc__endpoint" }, [
                createVNode("span", { class: "http-badge http-get" }, "GET"),
                createVNode("code", { class: "ed-doc__endpoint-path" }, "/accounts/{accountId}/standing-orders")
              ]),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Backs the TPP request "),
                  createVNode("code", null, "GET https://rs1.LFICODE.apihub.openfinance.ae/open-finance/account-information/vx.y/accounts/{AccountId}/standing-orders"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Returns standing orders linked to the account. Only supported for "),
                  createVNode("code", null, "CurrentAccount"),
                  createTextVNode(" and "),
                  createVNode("code", null, "Savings"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Request headers"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("See "),
                  createVNode("a", { href: "#common-request-headers" }, "Common request headers"),
                  createTextVNode(".")
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Path parameters"),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Parameter"),
                        createVNode("th", null, "Required"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "accountId")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, "The ID of the account whose standing orders are being returned")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Query parameters"),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Parameter"),
                        createVNode("th", null, "Required"),
                        createVNode("th", null, "Default"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "page")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, [
                          createVNode("code", null, "1")
                        ]),
                        createVNode("td", null, "Page number")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "page-size")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, [
                          createVNode("code", null, "100")
                        ]),
                        createVNode("td", null, "Records per page")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Response"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("code", null, "Content-Type: application/json")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: standingOrdersJson,
                lang: "json",
                filename: "GET /accounts/{accountId}/standing-orders response"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Errors: see "),
                  createVNode("a", { href: "#common-error-responses" }, "Common error responses"),
                  createTextVNode(".")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" See the "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-standing-orders" }, [
                    createTextVNode("GET "),
                    createVNode("code", null, "/accounts/{accountId}/standing-orders"),
                    createTextVNode(" API Reference")
                  ]),
                  createTextVNode(" for the full schema. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "get-accounts-products",
        num: "15",
        color: "var(--at-teal-deep)",
        eyebrow: "Endpoint",
        title: "GET /accounts/{accountId}/products",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="ed-doc__endpoint" data-v-ee50c514${_scopeId}><span class="http-badge http-get" data-v-ee50c514${_scopeId}>GET</span><code class="ed-doc__endpoint-path" data-v-ee50c514${_scopeId}>/accounts/{accountId}/products</code></div>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Backs the TPP request <code data-v-ee50c514${_scopeId2}>GET https://rs1.LFICODE.apihub.openfinance.ae/open-finance/account-information/vx.y/accounts/{AccountId}/product</code> (singular on the TPP side). `);
                } else {
                  return [
                    createTextVNode(" Backs the TPP request "),
                    createVNode("code", null, "GET https://rs1.LFICODE.apihub.openfinance.ae/open-finance/account-information/vx.y/accounts/{AccountId}/product"),
                    createTextVNode(" (singular on the TPP side). ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Returns the product data associated with the account — fees, charges, rates, rewards, benefits, and eligibility criteria. <code data-v-ee50c514${_scopeId2}>FinanceRates</code> may be returned as cleartext JSON or as a JWE compact string — see <a href="/tech/lfi-api-hub/v2.1/banking/data-sharing/api-guide/finance-rates" data-v-ee50c514${_scopeId2}>Encrypted FinanceRates</a>. `);
                } else {
                  return [
                    createTextVNode(" Returns the product data associated with the account — fees, charges, rates, rewards, benefits, and eligibility criteria. "),
                    createVNode("code", null, "FinanceRates"),
                    createTextVNode(" may be returned as cleartext JSON or as a JWE compact string — see "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/api-guide/finance-rates" }, "Encrypted FinanceRates"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-ee50c514${_scopeId}>Request headers</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`See <a href="#common-request-headers" data-v-ee50c514${_scopeId2}>Common request headers</a>.`);
                } else {
                  return [
                    createTextVNode("See "),
                    createVNode("a", { href: "#common-request-headers" }, "Common request headers"),
                    createTextVNode(".")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-ee50c514${_scopeId}>Path parameters</h3>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-ee50c514${_scopeId2}><thead data-v-ee50c514${_scopeId2}><tr data-v-ee50c514${_scopeId2}><th data-v-ee50c514${_scopeId2}>Parameter</th><th data-v-ee50c514${_scopeId2}>Required</th><th data-v-ee50c514${_scopeId2}>Description</th></tr></thead><tbody data-v-ee50c514${_scopeId2}><tr data-v-ee50c514${_scopeId2}><td data-v-ee50c514${_scopeId2}><code data-v-ee50c514${_scopeId2}>accountId</code></td><td data-v-ee50c514${_scopeId2}>Yes</td><td data-v-ee50c514${_scopeId2}>The ID of the account whose product data is being returned</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Parameter"),
                          createVNode("th", null, "Required"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "accountId")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, "The ID of the account whose product data is being returned")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-ee50c514${_scopeId}>Query parameters</h3>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-ee50c514${_scopeId2}><thead data-v-ee50c514${_scopeId2}><tr data-v-ee50c514${_scopeId2}><th data-v-ee50c514${_scopeId2}>Parameter</th><th data-v-ee50c514${_scopeId2}>Required</th><th data-v-ee50c514${_scopeId2}>Default</th><th data-v-ee50c514${_scopeId2}>Description</th></tr></thead><tbody data-v-ee50c514${_scopeId2}><tr data-v-ee50c514${_scopeId2}><td data-v-ee50c514${_scopeId2}><code data-v-ee50c514${_scopeId2}>page</code></td><td data-v-ee50c514${_scopeId2}>Yes</td><td data-v-ee50c514${_scopeId2}><code data-v-ee50c514${_scopeId2}>1</code></td><td data-v-ee50c514${_scopeId2}>Page number</td></tr><tr data-v-ee50c514${_scopeId2}><td data-v-ee50c514${_scopeId2}><code data-v-ee50c514${_scopeId2}>page-size</code></td><td data-v-ee50c514${_scopeId2}>Yes</td><td data-v-ee50c514${_scopeId2}><code data-v-ee50c514${_scopeId2}>100</code></td><td data-v-ee50c514${_scopeId2}>Records per page</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Parameter"),
                          createVNode("th", null, "Required"),
                          createVNode("th", null, "Default"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "page")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, [
                            createVNode("code", null, "1")
                          ]),
                          createVNode("td", null, "Page number")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "page-size")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, [
                            createVNode("code", null, "100")
                          ]),
                          createVNode("td", null, "Records per page")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-ee50c514${_scopeId}>Response</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<code data-v-ee50c514${_scopeId2}>Content-Type: application/json</code>`);
                } else {
                  return [
                    createVNode("code", null, "Content-Type: application/json")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` If no product data exists for the account, return <code data-v-ee50c514${_scopeId2}>200</code> with an empty <code data-v-ee50c514${_scopeId2}>data</code> array. `);
                } else {
                  return [
                    createTextVNode(" If no product data exists for the account, return "),
                    createVNode("code", null, "200"),
                    createTextVNode(" with an empty "),
                    createVNode("code", null, "data"),
                    createTextVNode(" array. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: productsJson,
              lang: "json",
              filename: "GET /accounts/{accountId}/products response"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Errors: see <a href="#common-error-responses" data-v-ee50c514${_scopeId2}>Common error responses</a>.`);
                } else {
                  return [
                    createTextVNode("Errors: see "),
                    createVNode("a", { href: "#common-error-responses" }, "Common error responses"),
                    createTextVNode(".")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` See the <a href="/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-products" data-v-ee50c514${_scopeId2}>GET <code data-v-ee50c514${_scopeId2}>/accounts/{accountId}/products</code> API Reference</a> for the full schema. `);
                } else {
                  return [
                    createTextVNode(" See the "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-products" }, [
                      createTextVNode("GET "),
                      createVNode("code", null, "/accounts/{accountId}/products"),
                      createTextVNode(" API Reference")
                    ]),
                    createTextVNode(" for the full schema. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "ed-doc__endpoint" }, [
                createVNode("span", { class: "http-badge http-get" }, "GET"),
                createVNode("code", { class: "ed-doc__endpoint-path" }, "/accounts/{accountId}/products")
              ]),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Backs the TPP request "),
                  createVNode("code", null, "GET https://rs1.LFICODE.apihub.openfinance.ae/open-finance/account-information/vx.y/accounts/{AccountId}/product"),
                  createTextVNode(" (singular on the TPP side). ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Returns the product data associated with the account — fees, charges, rates, rewards, benefits, and eligibility criteria. "),
                  createVNode("code", null, "FinanceRates"),
                  createTextVNode(" may be returned as cleartext JSON or as a JWE compact string — see "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/api-guide/finance-rates" }, "Encrypted FinanceRates"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Request headers"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("See "),
                  createVNode("a", { href: "#common-request-headers" }, "Common request headers"),
                  createTextVNode(".")
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Path parameters"),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Parameter"),
                        createVNode("th", null, "Required"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "accountId")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, "The ID of the account whose product data is being returned")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Query parameters"),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Parameter"),
                        createVNode("th", null, "Required"),
                        createVNode("th", null, "Default"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "page")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, [
                          createVNode("code", null, "1")
                        ]),
                        createVNode("td", null, "Page number")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "page-size")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, [
                          createVNode("code", null, "100")
                        ]),
                        createVNode("td", null, "Records per page")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Response"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("code", null, "Content-Type: application/json")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" If no product data exists for the account, return "),
                  createVNode("code", null, "200"),
                  createTextVNode(" with an empty "),
                  createVNode("code", null, "data"),
                  createTextVNode(" array. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: productsJson,
                lang: "json",
                filename: "GET /accounts/{accountId}/products response"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Errors: see "),
                  createVNode("a", { href: "#common-error-responses" }, "Common error responses"),
                  createTextVNode(".")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" See the "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-products" }, [
                    createTextVNode("GET "),
                    createVNode("code", null, "/accounts/{accountId}/products"),
                    createTextVNode(" API Reference")
                  ]),
                  createTextVNode(" for the full schema. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "get-accounts-customer",
        num: "16",
        color: "var(--at-teal)",
        eyebrow: "Endpoint",
        title: "GET /accounts/{accountId}/customer",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="ed-doc__endpoint" data-v-ee50c514${_scopeId}><span class="http-badge http-get" data-v-ee50c514${_scopeId}>GET</span><code class="ed-doc__endpoint-path" data-v-ee50c514${_scopeId}>/accounts/{accountId}/customer</code></div>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Backs the TPP request <code data-v-ee50c514${_scopeId2}>GET https://rs1.LFICODE.apihub.openfinance.ae/open-finance/account-information/vx.y/accounts/{AccountId}/parties</code> — &quot;parties&quot; on the TPP side, &quot;customer&quot; on Ozone Connect. `);
                } else {
                  return [
                    createTextVNode(" Backs the TPP request "),
                    createVNode("code", null, "GET https://rs1.LFICODE.apihub.openfinance.ae/open-finance/account-information/vx.y/accounts/{AccountId}/parties"),
                    createTextVNode(' — "parties" on the TPP side, "customer" on Ozone Connect. ')
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Returns the customer records associated with a specific account. Joint accounts return one record per joint holder. `);
                } else {
                  return [
                    createTextVNode(" Returns the customer records associated with a specific account. Joint accounts return one record per joint holder. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The response is based on <a href="https://openid.net/specs/openid-connect-4-identity-assurance-1_0.html" data-v-ee50c514${_scopeId2}>OpenID Connect for Identity Assurance 1.0</a> — claims are carried inside a <code data-v-ee50c514${_scopeId2}>verifiedClaims</code> envelope. See <a href="/knowledge-base/articles/identity-assurance-claims" data-v-ee50c514${_scopeId2}>Identity Assurance Claims</a>. `);
                } else {
                  return [
                    createTextVNode(" The response is based on "),
                    createVNode("a", { href: "https://openid.net/specs/openid-connect-4-identity-assurance-1_0.html" }, "OpenID Connect for Identity Assurance 1.0"),
                    createTextVNode(" — claims are carried inside a "),
                    createVNode("code", null, "verifiedClaims"),
                    createTextVNode(" envelope. See "),
                    createVNode("a", { href: "/knowledge-base/articles/identity-assurance-claims" }, "Identity Assurance Claims"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-ee50c514${_scopeId}>Request headers</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`See <a href="#common-request-headers" data-v-ee50c514${_scopeId2}>Common request headers</a>.`);
                } else {
                  return [
                    createTextVNode("See "),
                    createVNode("a", { href: "#common-request-headers" }, "Common request headers"),
                    createTextVNode(".")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-ee50c514${_scopeId}>Path parameters</h3>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-ee50c514${_scopeId2}><thead data-v-ee50c514${_scopeId2}><tr data-v-ee50c514${_scopeId2}><th data-v-ee50c514${_scopeId2}>Parameter</th><th data-v-ee50c514${_scopeId2}>Required</th><th data-v-ee50c514${_scopeId2}>Description</th></tr></thead><tbody data-v-ee50c514${_scopeId2}><tr data-v-ee50c514${_scopeId2}><td data-v-ee50c514${_scopeId2}><code data-v-ee50c514${_scopeId2}>accountId</code></td><td data-v-ee50c514${_scopeId2}>Yes</td><td data-v-ee50c514${_scopeId2}>The ID of the account whose customers are being returned</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Parameter"),
                          createVNode("th", null, "Required"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "accountId")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, "The ID of the account whose customers are being returned")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-ee50c514${_scopeId}>Response</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<code data-v-ee50c514${_scopeId2}>Content-Type: application/json</code>`);
                } else {
                  return [
                    createVNode("code", null, "Content-Type: application/json")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h4 class="ed-doc__subhead-minor" data-v-ee50c514${_scopeId}><code data-v-ee50c514${_scopeId}>200</code> — Retail (personal) account</h4>`);
            _push2(ssrRenderComponent(_component_EdCode, {
              code: customerRetailJson,
              lang: "json",
              filename: "GET /accounts/{accountId}/customer — retail"
            }, null, _parent2, _scopeId));
            _push2(`<h4 class="ed-doc__subhead-minor" data-v-ee50c514${_scopeId}><code data-v-ee50c514${_scopeId}>200</code> — SME / Corporate account</h4>`);
            _push2(ssrRenderComponent(_component_EdCode, {
              code: customerCorporateJson,
              lang: "json",
              filename: "GET /accounts/{accountId}/customer — corporate"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Errors: see <a href="#common-error-responses" data-v-ee50c514${_scopeId2}>Common error responses</a>.`);
                } else {
                  return [
                    createTextVNode("Errors: see "),
                    createVNode("a", { href: "#common-error-responses" }, "Common error responses"),
                    createTextVNode(".")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` See the <a href="/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-customer" data-v-ee50c514${_scopeId2}>GET <code data-v-ee50c514${_scopeId2}>/accounts/{accountId}/customer</code> API Reference</a> for the full schema. `);
                } else {
                  return [
                    createTextVNode(" See the "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-customer" }, [
                      createTextVNode("GET "),
                      createVNode("code", null, "/accounts/{accountId}/customer"),
                      createTextVNode(" API Reference")
                    ]),
                    createTextVNode(" for the full schema. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "ed-doc__endpoint" }, [
                createVNode("span", { class: "http-badge http-get" }, "GET"),
                createVNode("code", { class: "ed-doc__endpoint-path" }, "/accounts/{accountId}/customer")
              ]),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Backs the TPP request "),
                  createVNode("code", null, "GET https://rs1.LFICODE.apihub.openfinance.ae/open-finance/account-information/vx.y/accounts/{AccountId}/parties"),
                  createTextVNode(' — "parties" on the TPP side, "customer" on Ozone Connect. ')
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Returns the customer records associated with a specific account. Joint accounts return one record per joint holder. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The response is based on "),
                  createVNode("a", { href: "https://openid.net/specs/openid-connect-4-identity-assurance-1_0.html" }, "OpenID Connect for Identity Assurance 1.0"),
                  createTextVNode(" — claims are carried inside a "),
                  createVNode("code", null, "verifiedClaims"),
                  createTextVNode(" envelope. See "),
                  createVNode("a", { href: "/knowledge-base/articles/identity-assurance-claims" }, "Identity Assurance Claims"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Request headers"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("See "),
                  createVNode("a", { href: "#common-request-headers" }, "Common request headers"),
                  createTextVNode(".")
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Path parameters"),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Parameter"),
                        createVNode("th", null, "Required"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "accountId")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, "The ID of the account whose customers are being returned")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Response"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("code", null, "Content-Type: application/json")
                ]),
                _: 1
              }),
              createVNode("h4", { class: "ed-doc__subhead-minor" }, [
                createVNode("code", null, "200"),
                createTextVNode(" — Retail (personal) account")
              ]),
              createVNode(_component_EdCode, {
                code: customerRetailJson,
                lang: "json",
                filename: "GET /accounts/{accountId}/customer — retail"
              }),
              createVNode("h4", { class: "ed-doc__subhead-minor" }, [
                createVNode("code", null, "200"),
                createTextVNode(" — SME / Corporate account")
              ]),
              createVNode(_component_EdCode, {
                code: customerCorporateJson,
                lang: "json",
                filename: "GET /accounts/{accountId}/customer — corporate"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Errors: see "),
                  createVNode("a", { href: "#common-error-responses" }, "Common error responses"),
                  createTextVNode(".")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" See the "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-customer" }, [
                    createTextVNode("GET "),
                    createVNode("code", null, "/accounts/{accountId}/customer"),
                    createTextVNode(" API Reference")
                  ]),
                  createTextVNode(" for the full schema. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "get-customer",
        num: "17",
        color: "var(--at-gold)",
        eyebrow: "Endpoint",
        title: "GET /customer",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="ed-doc__endpoint" data-v-ee50c514${_scopeId}><span class="http-badge http-get" data-v-ee50c514${_scopeId}>GET</span><code class="ed-doc__endpoint-path" data-v-ee50c514${_scopeId}>/customer</code></div>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Backs the TPP request <code data-v-ee50c514${_scopeId2}>GET https://rs1.LFICODE.apihub.openfinance.ae/open-finance/account-information/vx.y/parties</code> — &quot;parties&quot; on the TPP side, &quot;customer&quot; on Ozone Connect. `);
                } else {
                  return [
                    createTextVNode(" Backs the TPP request "),
                    createVNode("code", null, "GET https://rs1.LFICODE.apihub.openfinance.ae/open-finance/account-information/vx.y/parties"),
                    createTextVNode(' — "parties" on the TPP side, "customer" on Ozone Connect. ')
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Returns the customer record for the authenticated customer. Unlike <code data-v-ee50c514${_scopeId2}>/accounts/{accountId}/customer</code>, this endpoint is not scoped to a specific account. `);
                } else {
                  return [
                    createTextVNode(" Returns the customer record for the authenticated customer. Unlike "),
                    createVNode("code", null, "/accounts/{accountId}/customer"),
                    createTextVNode(", this endpoint is not scoped to a specific account. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "warning",
              title: "Resolve from o3-psu-identifier, not the consent"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-ee50c514${_scopeId2}> The response MUST be derived from the <code data-v-ee50c514${_scopeId2}>o3-psu-identifier</code> header — not from any account on the consent. At authorization, the LFI patched an opaque customer identifier onto the consent, linking the consent to the authenticated user inside the LFI&#39;s own systems. The Hub forwards that identifier here. Your LFI resolves it back to the customer and returns that customer&#39;s claims. </p><p data-v-ee50c514${_scopeId2}><code data-v-ee50c514${_scopeId2}>o3-consent-id</code> is still supplied so the LFI can attribute the call for logging, but it MUST NOT be used to select which customer to return — the customer who authenticated the consent is the only subject of this response. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" The response MUST be derived from the "),
                      createVNode("code", null, "o3-psu-identifier"),
                      createTextVNode(" header — not from any account on the consent. At authorization, the LFI patched an opaque customer identifier onto the consent, linking the consent to the authenticated user inside the LFI's own systems. The Hub forwards that identifier here. Your LFI resolves it back to the customer and returns that customer's claims. ")
                    ]),
                    createVNode("p", null, [
                      createVNode("code", null, "o3-consent-id"),
                      createTextVNode(" is still supplied so the LFI can attribute the call for logging, but it MUST NOT be used to select which customer to return — the customer who authenticated the consent is the only subject of this response. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The response is based on <a href="https://openid.net/specs/openid-connect-4-identity-assurance-1_0.html" data-v-ee50c514${_scopeId2}>OpenID Connect for Identity Assurance 1.0</a>. See <a href="/knowledge-base/articles/identity-assurance-claims" data-v-ee50c514${_scopeId2}>Identity Assurance Claims</a>. `);
                } else {
                  return [
                    createTextVNode(" The response is based on "),
                    createVNode("a", { href: "https://openid.net/specs/openid-connect-4-identity-assurance-1_0.html" }, "OpenID Connect for Identity Assurance 1.0"),
                    createTextVNode(". See "),
                    createVNode("a", { href: "/knowledge-base/articles/identity-assurance-claims" }, "Identity Assurance Claims"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-ee50c514${_scopeId}>Request headers</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` See <a href="#common-request-headers" data-v-ee50c514${_scopeId2}>Common request headers</a>. <code data-v-ee50c514${_scopeId2}>o3-psu-identifier</code> is the operative header for this endpoint. `);
                } else {
                  return [
                    createTextVNode(" See "),
                    createVNode("a", { href: "#common-request-headers" }, "Common request headers"),
                    createTextVNode(". "),
                    createVNode("code", null, "o3-psu-identifier"),
                    createTextVNode(" is the operative header for this endpoint. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-ee50c514${_scopeId}>Response</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<code data-v-ee50c514${_scopeId2}>Content-Type: application/json</code>`);
                } else {
                  return [
                    createVNode("code", null, "Content-Type: application/json")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: customerPsuJson,
              lang: "json",
              filename: "GET /customer response"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` See the <a href="/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/customer" data-v-ee50c514${_scopeId2}>GET <code data-v-ee50c514${_scopeId2}>/customer</code> API Reference</a> for the full schema. `);
                } else {
                  return [
                    createTextVNode(" See the "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/customer" }, [
                      createTextVNode("GET "),
                      createVNode("code", null, "/customer"),
                      createTextVNode(" API Reference")
                    ]),
                    createTextVNode(" for the full schema. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "ed-doc__endpoint" }, [
                createVNode("span", { class: "http-badge http-get" }, "GET"),
                createVNode("code", { class: "ed-doc__endpoint-path" }, "/customer")
              ]),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Backs the TPP request "),
                  createVNode("code", null, "GET https://rs1.LFICODE.apihub.openfinance.ae/open-finance/account-information/vx.y/parties"),
                  createTextVNode(' — "parties" on the TPP side, "customer" on Ozone Connect. ')
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Returns the customer record for the authenticated customer. Unlike "),
                  createVNode("code", null, "/accounts/{accountId}/customer"),
                  createTextVNode(", this endpoint is not scoped to a specific account. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "warning",
                title: "Resolve from o3-psu-identifier, not the consent"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" The response MUST be derived from the "),
                    createVNode("code", null, "o3-psu-identifier"),
                    createTextVNode(" header — not from any account on the consent. At authorization, the LFI patched an opaque customer identifier onto the consent, linking the consent to the authenticated user inside the LFI's own systems. The Hub forwards that identifier here. Your LFI resolves it back to the customer and returns that customer's claims. ")
                  ]),
                  createVNode("p", null, [
                    createVNode("code", null, "o3-consent-id"),
                    createTextVNode(" is still supplied so the LFI can attribute the call for logging, but it MUST NOT be used to select which customer to return — the customer who authenticated the consent is the only subject of this response. ")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The response is based on "),
                  createVNode("a", { href: "https://openid.net/specs/openid-connect-4-identity-assurance-1_0.html" }, "OpenID Connect for Identity Assurance 1.0"),
                  createTextVNode(". See "),
                  createVNode("a", { href: "/knowledge-base/articles/identity-assurance-claims" }, "Identity Assurance Claims"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Request headers"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" See "),
                  createVNode("a", { href: "#common-request-headers" }, "Common request headers"),
                  createTextVNode(". "),
                  createVNode("code", null, "o3-psu-identifier"),
                  createTextVNode(" is the operative header for this endpoint. ")
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Response"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("code", null, "Content-Type: application/json")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: customerPsuJson,
                lang: "json",
                filename: "GET /customer response"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" See the "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/customer" }, [
                    createTextVNode("GET "),
                    createVNode("code", null, "/customer"),
                    createTextVNode(" API Reference")
                  ]),
                  createTextVNode(" for the full schema. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "customer-data-responses",
        num: "18",
        color: "var(--at-blue-deep, #1d4ed8)",
        eyebrow: "Customer data responses",
        title: "OpenID Connect Identity Assurance envelope",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The response format for <span class="endpoint" data-v-ee50c514${_scopeId2}><span class="http-method http-method--get" data-v-ee50c514${_scopeId2}>GET</span><code data-v-ee50c514${_scopeId2}>/customer</code></span> and <span class="endpoint" data-v-ee50c514${_scopeId2}><span class="http-method http-method--get" data-v-ee50c514${_scopeId2}>GET</span><code data-v-ee50c514${_scopeId2}>/accounts/{accountId}/customer</code></span> (and the CoP query response) is based on the <a href="https://openid.net/specs/openid-connect-4-identity-assurance-1_0.html" data-v-ee50c514${_scopeId2}>OpenID Connect for Identity Assurance 1.0 Specification</a> — claims about a customer are carried inside a <code data-v-ee50c514${_scopeId2}>verifiedClaims</code> envelope with a <code data-v-ee50c514${_scopeId2}>verification.trustFramework</code> indicating the framework under which the claims were verified. `);
                } else {
                  return [
                    createTextVNode(" The response format for "),
                    createVNode("span", { class: "endpoint" }, [
                      createVNode("span", { class: "http-method http-method--get" }, "GET"),
                      createVNode("code", null, "/customer")
                    ]),
                    createTextVNode(" and "),
                    createVNode("span", { class: "endpoint" }, [
                      createVNode("span", { class: "http-method http-method--get" }, "GET"),
                      createVNode("code", null, "/accounts/{accountId}/customer")
                    ]),
                    createTextVNode(" (and the CoP query response) is based on the "),
                    createVNode("a", { href: "https://openid.net/specs/openid-connect-4-identity-assurance-1_0.html" }, "OpenID Connect for Identity Assurance 1.0 Specification"),
                    createTextVNode(" — claims about a customer are carried inside a "),
                    createVNode("code", null, "verifiedClaims"),
                    createTextVNode(" envelope with a "),
                    createVNode("code", null, "verification.trustFramework"),
                    createTextVNode(" indicating the framework under which the claims were verified. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` See <a href="/knowledge-base/articles/identity-assurance-claims" data-v-ee50c514${_scopeId2}>Identity Assurance Claims</a> for the shared envelope and how it maps to each endpoint. `);
                } else {
                  return [
                    createTextVNode(" See "),
                    createVNode("a", { href: "/knowledge-base/articles/identity-assurance-claims" }, "Identity Assurance Claims"),
                    createTextVNode(" for the shared envelope and how it maps to each endpoint. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The response format for "),
                  createVNode("span", { class: "endpoint" }, [
                    createVNode("span", { class: "http-method http-method--get" }, "GET"),
                    createVNode("code", null, "/customer")
                  ]),
                  createTextVNode(" and "),
                  createVNode("span", { class: "endpoint" }, [
                    createVNode("span", { class: "http-method http-method--get" }, "GET"),
                    createVNode("code", null, "/accounts/{accountId}/customer")
                  ]),
                  createTextVNode(" (and the CoP query response) is based on the "),
                  createVNode("a", { href: "https://openid.net/specs/openid-connect-4-identity-assurance-1_0.html" }, "OpenID Connect for Identity Assurance 1.0 Specification"),
                  createTextVNode(" — claims about a customer are carried inside a "),
                  createVNode("code", null, "verifiedClaims"),
                  createTextVNode(" envelope with a "),
                  createVNode("code", null, "verification.trustFramework"),
                  createTextVNode(" indicating the framework under which the claims were verified. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" See "),
                  createVNode("a", { href: "/knowledge-base/articles/identity-assurance-claims" }, "Identity Assurance Claims"),
                  createTextVNode(" for the shared envelope and how it maps to each endpoint. ")
                ]),
                _: 1
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/v2.1/banking/data-sharing/api-guide/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ee50c514"]]);
export {
  index as default
};
