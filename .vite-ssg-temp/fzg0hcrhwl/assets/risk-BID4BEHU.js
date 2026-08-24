import { E as EdCode } from "./EdCode-BQ4YLUeg.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { defineComponent, mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const merchantExample = `{
  "Risk": {
    "DebtorIndicators": {
      "Authentication": {
        "AuthenticationChannel": "Web",
        "KnowledgeFactor": { "IsUsed": true, "Type": "Password" },
        "PossessionFactor": { "IsUsed": true, "Type": "SMSOTP" },
        "ChallengeOutcome": "Pass",
        "AuthenticationFlow": "MFA",
        "ChallengeDateTime": "2025-06-19T10:14:32Z"
      },
      "GeoLocation": {
        "Latitude": "25.2048",
        "Longitude": "55.2708"
      },
      "BrowserInformation": {
        "UserAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "IsCookiesEnabled": true,
        "PixelRatio": 2.0
      },
      "AccountRiskIndicators": {
        "UserOnboardingDateTime": "2023-01-15T08:00:00Z",
        "SuspiciousActivity": "NoSuspiciousActivity",
        "TransactionHistory": { "LastDay": 1, "LastYear": 47 }
      }
    },
    "TransactionIndicators": {
      "IsCustomerPresent": true,
      "IsContractPresent": false,
      "Channel": "Web",
      "ChannelType": "ECommerce",
      "SubChannelType": "WebBrowser",
      "PaymentProcess": {
        "TotalDuration": 94,
        "CurrentSessionAttempts": 1,
        "CurrentSessionFailedAttempts": 0,
        "Last24HourAttempts": 1,
        "Last24HourFailedAttempts": 0
      },
      "MerchantRisk": {
        "DeliveryTimeframe": "SameDayShipping",
        "ReorderItemsIndicator": "FirstTimeOrder",
        "IsGiftCardPurchase": false,
        "IsDeliveryAddressMatchesBilling": true,
        "AddressMatchLevel": "FullMatch"
      }
    },
    "CreditorIndicators": {
      "AccountType": "Corporate",
      "IsCreditorPrePopulated": true,
      "IsVerifiedByTPP": true,
      "IsCreditorConfirmed": true,
      "MerchantDetails": {
        "MerchantId": "MERCH00012345",
        "MerchantName": "Acme Electronics LLC",
        "MerchantCategoryCode": "5732"
      }
    },
    "DestinationDeliveryAddress": {
      "RecipientType": "Individual",
      "RecipientName": { "en": "Mohammed Al Rashid" },
      "NationalAddress": [
        {
          "AddressType": "DeliveryTo",
          "AddressLine": ["Villa 12, Al Wasl Road"],
          "CountrySubDivision": "Dubai",
          "Country": "AE"
        }
      ]
    }
  }
}`;
const a2aExample = `{
  "Risk": {
    "DebtorIndicators": {
      "Authentication": {
        "AuthenticationChannel": "App",
        "InherenceFactor": { "IsUsed": true, "Type": "FaceRecognition" },
        "PossessionFactor": { "IsUsed": true, "Type": "Passkey" },
        "ChallengeOutcome": "Pass",
        "AuthenticationFlow": "MFA",
        "ChallengeDateTime": "2025-06-19T14:02:11Z"
      },
      "GeoLocation": {
        "Latitude": "24.4539",
        "Longitude": "54.3773"
      },
      "DeviceInformation": {
        "DeviceType": "Mobile",
        "DeviceOperatingSystem": "iOS",
        "DeviceOperatingSystemVersion": "17.5",
        "DeviceBindingId": "a3f8b2c1-9d4e-4f12-b77a-0e1234567890",
        "BindingStatus": "Active",
        "BindingDuration": "P180D",
        "ConnectionType": "WiFi",
        "DeviceEnvironmentContext": []
      },
      "AppInformation": {
        "AppVersion": "4.2.1",
        "PackageName": "ae.example.tppapp",
        "BuildNumber": "20250601"
      },
      "BiometricCapabilities": {
        "SupportsBiometric": true,
        "BiometricTypes": ["FacialRecognition", "Fingerprint"]
      },
      "AccountRiskIndicators": {
        "UserOnboardingDateTime": "2022-08-10T09:30:00Z",
        "LastAccountChangeDate": "2025-01-04",
        "SuspiciousActivity": "NoSuspiciousActivity",
        "TransactionHistory": { "LastDay": 0, "LastYear": 112 }
      }
    },
    "TransactionIndicators": {
      "IsCustomerPresent": true,
      "IsContractPresent": false,
      "Channel": "Mobile",
      "ChannelType": "InApp",
      "SubChannelType": "MobileApp",
      "PaymentProcess": {
        "TotalDuration": 38,
        "CurrentSessionAttempts": 1,
        "CurrentSessionFailedAttempts": 0,
        "Last24HourAttempts": 1,
        "Last24HourFailedAttempts": 0
      }
    },
    "CreditorIndicators": {
      "AccountType": "Retail",
      "IsCreditorPrePopulated": false,
      "IsVerifiedByTPP": false,
      "IsCreditorConfirmed": true
    }
  }
}`;
const subscriptionExample = `{
  "Risk": {
    "DebtorIndicators": {
      "Authentication": {
        "ChallengeOutcome": "NotPerformed"
      },
      "AccountRiskIndicators": {
        "UserOnboardingDateTime": "2021-03-22T11:00:00Z",
        "SuspiciousActivity": "NoSuspiciousActivity",
        "TransactionHistory": { "LastDay": 0, "LastYear": 24 }
      }
    },
    "TransactionIndicators": {
      "IsCustomerPresent": false,
      "IsContractPresent": true,
      "ChannelType": "RecurringPayment",
      "PaymentProcess": {
        "CurrentSessionAttempts": 1,
        "CurrentSessionFailedAttempts": 0,
        "Last24HourAttempts": 1,
        "Last24HourFailedAttempts": 0
      }
    },
    "CreditorIndicators": {
      "AccountType": "Corporate",
      "IsCreditorPrePopulated": true,
      "IsVerifiedByTPP": true,
      "IsCreditorConfirmed": true,
      "MerchantDetails": {
        "MerchantId": "MERCH00099887",
        "MerchantName": "CloudSoft FZ LLC",
        "MerchantCategoryCode": "7372"
      }
    }
  }
}`;
const delegatedScaExample = `{
  "Risk": {
    "DebtorIndicators": {
      "Authentication": {
        "AuthenticationChannel": "App",
        "PossessionFactor": { "IsUsed": true, "Type": "SecureEnclaveKey" },
        "InherenceFactor": { "IsUsed": true, "Type": "Fingerprint" },
        "ChallengeOutcome": "Pass",
        "AuthenticationFlow": "MFA",
        "AuthenticationValue": "eyJhbGciOiJFUzI1NiJ9...",
        "ChallengeDateTime": "2025-06-19T09:55:44Z"
      },
      "GeoLocation": {
        "Latitude": "25.1972",
        "Longitude": "55.2744"
      },
      "DeviceInformation": {
        "DeviceType": "Mobile",
        "DeviceOperatingSystem": "Android",
        "DeviceOperatingSystemVersion": "14",
        "DeviceBindingId": "d7e9c3a2-1b5f-4c88-a991-1f2345678901",
        "BindingStatus": "Active",
        "BindingDuration": "P365D",
        "ConnectionType": "Cellular",
        "DeviceEnvironmentContext": []
      },
      "AppInformation": {
        "AppVersion": "5.0.3",
        "PackageName": "ae.example.tppapp",
        "BuildNumber": "20250610"
      },
      "BiometricCapabilities": {
        "SupportsBiometric": true,
        "BiometricTypes": ["Fingerprint"]
      },
      "AccountRiskIndicators": {
        "UserOnboardingDateTime": "2020-11-01T08:00:00Z",
        "LastAccountChangeDate": "2024-12-01",
        "SuspiciousActivity": "NoSuspiciousActivity",
        "TransactionHistory": { "LastDay": 2, "LastYear": 198 }
      }
    },
    "TransactionIndicators": {
      "IsCustomerPresent": true,
      "IsContractPresent": false,
      "Channel": "Mobile",
      "ChannelType": "InApp",
      "SubChannelType": "MobileApp",
      "PaymentProcess": {
        "TotalDuration": 22,
        "CurrentSessionAttempts": 1,
        "CurrentSessionFailedAttempts": 0,
        "Last24HourAttempts": 3,
        "Last24HourFailedAttempts": 0
      }
    },
    "CreditorIndicators": {
      "AccountType": "Retail",
      "IsCreditorPrePopulated": false,
      "IsVerifiedByTPP": false,
      "IsCreditorConfirmed": true
    }
  }
}`;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "risk",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdRefTable = __unplugin_components_12;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdNote = __unplugin_components_7;
      const _component_EdCode = EdCode;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-dd5b8c50><section class="ed-doc__hero" data-v-dd5b8c50><div class="ed-doc__inner" data-v-dd5b8c50><div class="ed-doc__eyebrow" data-v-dd5b8c50><span class="ed-doc__eyebrow-dash" data-v-dd5b8c50></span> Service Initiation · PII · Risk </div><h1 class="ed-doc__title" data-v-dd5b8c50> Risk <span class="ed-doc__read" data-v-dd5b8c50>5 min read</span></h1><p class="ed-doc__lede" data-v-dd5b8c50> The <code data-v-dd5b8c50>Risk</code> object is a required part of the PII payload submitted at both <span class="endpoint" data-v-dd5b8c50><span class="http-method http-method--post" data-v-dd5b8c50>POST</span><code data-v-dd5b8c50>/par</code></span> (consent staging) and <span class="endpoint" data-v-dd5b8c50><span class="http-method http-method--post" data-v-dd5b8c50>POST</span><code data-v-dd5b8c50>/payments</code></span> (payment initiation). It carries contextual signals about the debtor, the transaction, and the creditor that the LFI uses for fraud scoring and risk assessment. </p><p class="ed-doc__lede" data-v-dd5b8c50><strong data-v-dd5b8c50>TPPs must populate every field that is known or derivable from their system.</strong> Omitting available data degrades the LFI&#39;s ability to assess the payment accurately. At the same time, the schema enforces <code data-v-dd5b8c50>additionalProperties: false</code> at the root — no fields outside the defined schema are permitted. </p><p class="ed-doc__lede" data-v-dd5b8c50> Like all PII, the <code data-v-dd5b8c50>Risk</code> object is encrypted inside the JWE and is only readable by the destination LFI. </p></div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "schema-overview",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Schema Overview",
        title: "Four top-level properties of the Risk object",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-dd5b8c50${_scopeId2}><thead data-v-dd5b8c50${_scopeId2}><tr data-v-dd5b8c50${_scopeId2}><th data-v-dd5b8c50${_scopeId2}>Property</th><th data-v-dd5b8c50${_scopeId2}>Description</th></tr></thead><tbody data-v-dd5b8c50${_scopeId2}><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>DebtorIndicators</code></td><td data-v-dd5b8c50${_scopeId2}>Signals about the user: authentication method, device, location, account history</td></tr><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>TransactionIndicators</code></td><td data-v-dd5b8c50${_scopeId2}>Signals about the transaction itself: channel, customer presence, merchant context</td></tr><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>CreditorIndicators</code></td><td data-v-dd5b8c50${_scopeId2}>Signals about the payee: account type, merchant details, COP verification</td></tr><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>DestinationDeliveryAddress</code></td><td data-v-dd5b8c50${_scopeId2}>Postal delivery address for the goods or services, if applicable</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Property"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "DebtorIndicators")
                          ]),
                          createVNode("td", null, "Signals about the user: authentication method, device, location, account history")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "TransactionIndicators")
                          ]),
                          createVNode("td", null, "Signals about the transaction itself: channel, customer presence, merchant context")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "CreditorIndicators")
                          ]),
                          createVNode("td", null, "Signals about the payee: account type, merchant details, COP verification")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "DestinationDeliveryAddress")
                          ]),
                          createVNode("td", null, "Postal delivery address for the goods or services, if applicable")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Property"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "DebtorIndicators")
                        ]),
                        createVNode("td", null, "Signals about the user: authentication method, device, location, account history")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "TransactionIndicators")
                        ]),
                        createVNode("td", null, "Signals about the transaction itself: channel, customer presence, merchant context")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "CreditorIndicators")
                        ]),
                        createVNode("td", null, "Signals about the payee: account type, merchant details, COP verification")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "DestinationDeliveryAddress")
                        ]),
                        createVNode("td", null, "Postal delivery address for the goods or services, if applicable")
                      ])
                    ])
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
        id: "debtor-indicators",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "DebtorIndicators",
        title: "Who is making the payment and how they authenticated",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-dd5b8c50${_scopeId}>Authentication</h3>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-dd5b8c50${_scopeId2}><thead data-v-dd5b8c50${_scopeId2}><tr data-v-dd5b8c50${_scopeId2}><th data-v-dd5b8c50${_scopeId2}>Field</th><th data-v-dd5b8c50${_scopeId2}>Type</th><th data-v-dd5b8c50${_scopeId2}>Description</th></tr></thead><tbody data-v-dd5b8c50${_scopeId2}><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>AuthenticationChannel</code></td><td data-v-dd5b8c50${_scopeId2}>enum</td><td data-v-dd5b8c50${_scopeId2}>Channel on which the user authenticated: <code data-v-dd5b8c50${_scopeId2}>App</code>, <code data-v-dd5b8c50${_scopeId2}>Web</code></td></tr><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>PossessionFactor.IsUsed</code></td><td data-v-dd5b8c50${_scopeId2}>boolean</td><td data-v-dd5b8c50${_scopeId2}>Whether a possession factor was used</td></tr><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>PossessionFactor.Type</code></td><td data-v-dd5b8c50${_scopeId2}>enum</td><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>FIDO2SecurityKey</code>, <code data-v-dd5b8c50${_scopeId2}>Passkey</code>, <code data-v-dd5b8c50${_scopeId2}>OTPDevice</code>, <code data-v-dd5b8c50${_scopeId2}>OTPApp</code>, <code data-v-dd5b8c50${_scopeId2}>SMSOTP</code>, <code data-v-dd5b8c50${_scopeId2}>EmailOTP</code>, <code data-v-dd5b8c50${_scopeId2}>PushNotification</code>, <code data-v-dd5b8c50${_scopeId2}>WebauthnToken</code>, <code data-v-dd5b8c50${_scopeId2}>SecureEnclaveKey</code>, <code data-v-dd5b8c50${_scopeId2}>HardwareOTPKey</code>, <code data-v-dd5b8c50${_scopeId2}>TrustedDevice</code>, <code data-v-dd5b8c50${_scopeId2}>Other</code></td></tr><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>KnowledgeFactor.IsUsed</code></td><td data-v-dd5b8c50${_scopeId2}>boolean</td><td data-v-dd5b8c50${_scopeId2}>Whether a knowledge factor was used</td></tr><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>KnowledgeFactor.Type</code></td><td data-v-dd5b8c50${_scopeId2}>enum</td><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>PIN</code>, <code data-v-dd5b8c50${_scopeId2}>Password</code>, <code data-v-dd5b8c50${_scopeId2}>SecurityQuestion</code>, <code data-v-dd5b8c50${_scopeId2}>SMSOTP</code>, <code data-v-dd5b8c50${_scopeId2}>EmailOTP</code>, <code data-v-dd5b8c50${_scopeId2}>OTPPush</code>, <code data-v-dd5b8c50${_scopeId2}>Other</code></td></tr><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>InherenceFactor.IsUsed</code></td><td data-v-dd5b8c50${_scopeId2}>boolean</td><td data-v-dd5b8c50${_scopeId2}>Whether a biometric/inherence factor was used</td></tr><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>InherenceFactor.Type</code></td><td data-v-dd5b8c50${_scopeId2}>enum</td><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>Biometric</code>, <code data-v-dd5b8c50${_scopeId2}>Fingerprint</code>, <code data-v-dd5b8c50${_scopeId2}>FaceRecognition</code>, <code data-v-dd5b8c50${_scopeId2}>IrisScan</code>, <code data-v-dd5b8c50${_scopeId2}>VoiceRecognition</code>, <code data-v-dd5b8c50${_scopeId2}>FIDOBiometric</code>, <code data-v-dd5b8c50${_scopeId2}>DeviceBiometrics</code>, <code data-v-dd5b8c50${_scopeId2}>Other</code></td></tr><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>ChallengeOutcome</code></td><td data-v-dd5b8c50${_scopeId2}>enum</td><td data-v-dd5b8c50${_scopeId2}>Result of MFA: <code data-v-dd5b8c50${_scopeId2}>Pass</code>, <code data-v-dd5b8c50${_scopeId2}>Fail</code>, <code data-v-dd5b8c50${_scopeId2}>NotPerformed</code></td></tr><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>AuthenticationFlow</code></td><td data-v-dd5b8c50${_scopeId2}>enum</td><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>MFA</code>, <code data-v-dd5b8c50${_scopeId2}>Other</code></td></tr><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>AuthenticationValue</code></td><td data-v-dd5b8c50${_scopeId2}>string</td><td data-v-dd5b8c50${_scopeId2}>Cryptographic proof of authentication, where supported</td></tr><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>ChallengeDateTime</code></td><td data-v-dd5b8c50${_scopeId2}>date-time</td><td data-v-dd5b8c50${_scopeId2}>When the authentication challenge was completed</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Field"),
                          createVNode("th", null, "Type"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "AuthenticationChannel")
                          ]),
                          createVNode("td", null, "enum"),
                          createVNode("td", null, [
                            createTextVNode("Channel on which the user authenticated: "),
                            createVNode("code", null, "App"),
                            createTextVNode(", "),
                            createVNode("code", null, "Web")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "PossessionFactor.IsUsed")
                          ]),
                          createVNode("td", null, "boolean"),
                          createVNode("td", null, "Whether a possession factor was used")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "PossessionFactor.Type")
                          ]),
                          createVNode("td", null, "enum"),
                          createVNode("td", null, [
                            createVNode("code", null, "FIDO2SecurityKey"),
                            createTextVNode(", "),
                            createVNode("code", null, "Passkey"),
                            createTextVNode(", "),
                            createVNode("code", null, "OTPDevice"),
                            createTextVNode(", "),
                            createVNode("code", null, "OTPApp"),
                            createTextVNode(", "),
                            createVNode("code", null, "SMSOTP"),
                            createTextVNode(", "),
                            createVNode("code", null, "EmailOTP"),
                            createTextVNode(", "),
                            createVNode("code", null, "PushNotification"),
                            createTextVNode(", "),
                            createVNode("code", null, "WebauthnToken"),
                            createTextVNode(", "),
                            createVNode("code", null, "SecureEnclaveKey"),
                            createTextVNode(", "),
                            createVNode("code", null, "HardwareOTPKey"),
                            createTextVNode(", "),
                            createVNode("code", null, "TrustedDevice"),
                            createTextVNode(", "),
                            createVNode("code", null, "Other")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "KnowledgeFactor.IsUsed")
                          ]),
                          createVNode("td", null, "boolean"),
                          createVNode("td", null, "Whether a knowledge factor was used")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "KnowledgeFactor.Type")
                          ]),
                          createVNode("td", null, "enum"),
                          createVNode("td", null, [
                            createVNode("code", null, "PIN"),
                            createTextVNode(", "),
                            createVNode("code", null, "Password"),
                            createTextVNode(", "),
                            createVNode("code", null, "SecurityQuestion"),
                            createTextVNode(", "),
                            createVNode("code", null, "SMSOTP"),
                            createTextVNode(", "),
                            createVNode("code", null, "EmailOTP"),
                            createTextVNode(", "),
                            createVNode("code", null, "OTPPush"),
                            createTextVNode(", "),
                            createVNode("code", null, "Other")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "InherenceFactor.IsUsed")
                          ]),
                          createVNode("td", null, "boolean"),
                          createVNode("td", null, "Whether a biometric/inherence factor was used")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "InherenceFactor.Type")
                          ]),
                          createVNode("td", null, "enum"),
                          createVNode("td", null, [
                            createVNode("code", null, "Biometric"),
                            createTextVNode(", "),
                            createVNode("code", null, "Fingerprint"),
                            createTextVNode(", "),
                            createVNode("code", null, "FaceRecognition"),
                            createTextVNode(", "),
                            createVNode("code", null, "IrisScan"),
                            createTextVNode(", "),
                            createVNode("code", null, "VoiceRecognition"),
                            createTextVNode(", "),
                            createVNode("code", null, "FIDOBiometric"),
                            createTextVNode(", "),
                            createVNode("code", null, "DeviceBiometrics"),
                            createTextVNode(", "),
                            createVNode("code", null, "Other")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "ChallengeOutcome")
                          ]),
                          createVNode("td", null, "enum"),
                          createVNode("td", null, [
                            createTextVNode("Result of MFA: "),
                            createVNode("code", null, "Pass"),
                            createTextVNode(", "),
                            createVNode("code", null, "Fail"),
                            createTextVNode(", "),
                            createVNode("code", null, "NotPerformed")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "AuthenticationFlow")
                          ]),
                          createVNode("td", null, "enum"),
                          createVNode("td", null, [
                            createVNode("code", null, "MFA"),
                            createTextVNode(", "),
                            createVNode("code", null, "Other")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "AuthenticationValue")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "Cryptographic proof of authentication, where supported")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "ChallengeDateTime")
                          ]),
                          createVNode("td", null, "date-time"),
                          createVNode("td", null, "When the authentication challenge was completed")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-dd5b8c50${_scopeId}>UserName</h3>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-dd5b8c50${_scopeId2}><thead data-v-dd5b8c50${_scopeId2}><tr data-v-dd5b8c50${_scopeId2}><th data-v-dd5b8c50${_scopeId2}>Field</th><th data-v-dd5b8c50${_scopeId2}>Type</th><th data-v-dd5b8c50${_scopeId2}>Description</th></tr></thead><tbody data-v-dd5b8c50${_scopeId2}><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>en</code></td><td data-v-dd5b8c50${_scopeId2}>string</td><td data-v-dd5b8c50${_scopeId2}>User&#39;s name in English</td></tr><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>ar</code></td><td data-v-dd5b8c50${_scopeId2}>string</td><td data-v-dd5b8c50${_scopeId2}>User&#39;s name in Arabic</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Field"),
                          createVNode("th", null, "Type"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "en")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "User's name in English")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "ar")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "User's name in Arabic")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-dd5b8c50${_scopeId}>GeoLocation</h3>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-dd5b8c50${_scopeId2}><thead data-v-dd5b8c50${_scopeId2}><tr data-v-dd5b8c50${_scopeId2}><th data-v-dd5b8c50${_scopeId2}>Field</th><th data-v-dd5b8c50${_scopeId2}>Type</th><th data-v-dd5b8c50${_scopeId2}>Required</th><th data-v-dd5b8c50${_scopeId2}>Description</th></tr></thead><tbody data-v-dd5b8c50${_scopeId2}><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>Latitude</code></td><td data-v-dd5b8c50${_scopeId2}>string</td><td data-v-dd5b8c50${_scopeId2}>Yes</td><td data-v-dd5b8c50${_scopeId2}>GPS latitude of the user&#39;s device</td></tr><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>Longitude</code></td><td data-v-dd5b8c50${_scopeId2}>string</td><td data-v-dd5b8c50${_scopeId2}>Yes</td><td data-v-dd5b8c50${_scopeId2}>GPS longitude of the user&#39;s device</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Field"),
                          createVNode("th", null, "Type"),
                          createVNode("th", null, "Required"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Latitude")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, "GPS latitude of the user's device")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Longitude")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, "GPS longitude of the user's device")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-dd5b8c50${_scopeId}>DeviceInformation</h3>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-dd5b8c50${_scopeId2}><thead data-v-dd5b8c50${_scopeId2}><tr data-v-dd5b8c50${_scopeId2}><th data-v-dd5b8c50${_scopeId2}>Field</th><th data-v-dd5b8c50${_scopeId2}>Type</th><th data-v-dd5b8c50${_scopeId2}>Description</th></tr></thead><tbody data-v-dd5b8c50${_scopeId2}><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>DeviceId</code></td><td data-v-dd5b8c50${_scopeId2}>string</td><td data-v-dd5b8c50${_scopeId2}>IMEISV number of the device</td></tr><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>AlternativeDeviceId</code></td><td data-v-dd5b8c50${_scopeId2}>string</td><td data-v-dd5b8c50${_scopeId2}>Alternative device identifier</td></tr><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>DeviceOperatingSystem</code></td><td data-v-dd5b8c50${_scopeId2}>string</td><td data-v-dd5b8c50${_scopeId2}>OS name (e.g. iOS, Android)</td></tr><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>DeviceOperatingSystemVersion</code></td><td data-v-dd5b8c50${_scopeId2}>string</td><td data-v-dd5b8c50${_scopeId2}>OS version</td></tr><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>DeviceBindingId</code></td><td data-v-dd5b8c50${_scopeId2}>string</td><td data-v-dd5b8c50${_scopeId2}>Identifier binding the device to this application</td></tr><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>LastBindingDateTime</code></td><td data-v-dd5b8c50${_scopeId2}>date-time</td><td data-v-dd5b8c50${_scopeId2}>When the device was last bound</td></tr><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>BindingDuration</code></td><td data-v-dd5b8c50${_scopeId2}>duration</td><td data-v-dd5b8c50${_scopeId2}>ISO 8601 duration since last binding (e.g. <code data-v-dd5b8c50${_scopeId2}>P30D</code>)</td></tr><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>BindingStatus</code></td><td data-v-dd5b8c50${_scopeId2}>enum</td><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>Active</code>, <code data-v-dd5b8c50${_scopeId2}>Expired</code>, <code data-v-dd5b8c50${_scopeId2}>Revoked</code>, <code data-v-dd5b8c50${_scopeId2}>Suspended</code></td></tr><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>DeviceType</code></td><td data-v-dd5b8c50${_scopeId2}>enum</td><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>Mobile</code>, <code data-v-dd5b8c50${_scopeId2}>Desktop</code>, <code data-v-dd5b8c50${_scopeId2}>Tablet</code>, <code data-v-dd5b8c50${_scopeId2}>Wearable</code>, <code data-v-dd5b8c50${_scopeId2}>Other</code></td></tr><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>DeviceManufacturer.Model</code></td><td data-v-dd5b8c50${_scopeId2}>string</td><td data-v-dd5b8c50${_scopeId2}>Device model name</td></tr><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>DeviceManufacturer.Manufacturer</code></td><td data-v-dd5b8c50${_scopeId2}>string</td><td data-v-dd5b8c50${_scopeId2}>Device manufacturer</td></tr><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>DeviceLanguage</code></td><td data-v-dd5b8c50${_scopeId2}>string</td><td data-v-dd5b8c50${_scopeId2}>Device language setting</td></tr><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>DeviceLocalDateTime</code></td><td data-v-dd5b8c50${_scopeId2}>string</td><td data-v-dd5b8c50${_scopeId2}>Local time on the device at initiation</td></tr><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>ConnectionType</code></td><td data-v-dd5b8c50${_scopeId2}>enum</td><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>WiFi</code>, <code data-v-dd5b8c50${_scopeId2}>Cellular</code>, <code data-v-dd5b8c50${_scopeId2}>Other</code></td></tr><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>ScreenInformation.PixelDensity</code></td><td data-v-dd5b8c50${_scopeId2}>number</td><td data-v-dd5b8c50${_scopeId2}>Screen pixel density</td></tr><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>ScreenInformation.Orientation</code></td><td data-v-dd5b8c50${_scopeId2}>enum</td><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>Portrait</code>, <code data-v-dd5b8c50${_scopeId2}>Landscape</code></td></tr><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>BatteryStatus.Level</code></td><td data-v-dd5b8c50${_scopeId2}>number</td><td data-v-dd5b8c50${_scopeId2}>Battery level 0–100</td></tr><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>BatteryStatus.IsCharging</code></td><td data-v-dd5b8c50${_scopeId2}>boolean</td><td data-v-dd5b8c50${_scopeId2}>Whether device is charging</td></tr><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>TouchSupport.Supported</code></td><td data-v-dd5b8c50${_scopeId2}>boolean</td><td data-v-dd5b8c50${_scopeId2}>Whether the device supports touch input</td></tr><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>TouchSupport.MaxTouchPoints</code></td><td data-v-dd5b8c50${_scopeId2}>integer</td><td data-v-dd5b8c50${_scopeId2}>Maximum simultaneous touch points</td></tr><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>MotionSensors.Status</code></td><td data-v-dd5b8c50${_scopeId2}>enum</td><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>InMotion</code>, <code data-v-dd5b8c50${_scopeId2}>Stationary</code></td></tr><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>MotionSensors.Accelerometer</code></td><td data-v-dd5b8c50${_scopeId2}>boolean</td><td data-v-dd5b8c50${_scopeId2}>Whether accelerometer is present</td></tr><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>MotionSensors.Gyroscope</code></td><td data-v-dd5b8c50${_scopeId2}>boolean</td><td data-v-dd5b8c50${_scopeId2}>Whether gyroscope is present</td></tr><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>DeviceEnvironmentContext</code></td><td data-v-dd5b8c50${_scopeId2}>array&lt;enum&gt;</td><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>VPNDetected</code>, <code data-v-dd5b8c50${_scopeId2}>EmulatorDetected</code></td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Field"),
                          createVNode("th", null, "Type"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "DeviceId")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "IMEISV number of the device")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "AlternativeDeviceId")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "Alternative device identifier")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "DeviceOperatingSystem")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "OS name (e.g. iOS, Android)")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "DeviceOperatingSystemVersion")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "OS version")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "DeviceBindingId")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "Identifier binding the device to this application")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "LastBindingDateTime")
                          ]),
                          createVNode("td", null, "date-time"),
                          createVNode("td", null, "When the device was last bound")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "BindingDuration")
                          ]),
                          createVNode("td", null, "duration"),
                          createVNode("td", null, [
                            createTextVNode("ISO 8601 duration since last binding (e.g. "),
                            createVNode("code", null, "P30D"),
                            createTextVNode(")")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "BindingStatus")
                          ]),
                          createVNode("td", null, "enum"),
                          createVNode("td", null, [
                            createVNode("code", null, "Active"),
                            createTextVNode(", "),
                            createVNode("code", null, "Expired"),
                            createTextVNode(", "),
                            createVNode("code", null, "Revoked"),
                            createTextVNode(", "),
                            createVNode("code", null, "Suspended")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "DeviceType")
                          ]),
                          createVNode("td", null, "enum"),
                          createVNode("td", null, [
                            createVNode("code", null, "Mobile"),
                            createTextVNode(", "),
                            createVNode("code", null, "Desktop"),
                            createTextVNode(", "),
                            createVNode("code", null, "Tablet"),
                            createTextVNode(", "),
                            createVNode("code", null, "Wearable"),
                            createTextVNode(", "),
                            createVNode("code", null, "Other")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "DeviceManufacturer.Model")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "Device model name")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "DeviceManufacturer.Manufacturer")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "Device manufacturer")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "DeviceLanguage")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "Device language setting")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "DeviceLocalDateTime")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "Local time on the device at initiation")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "ConnectionType")
                          ]),
                          createVNode("td", null, "enum"),
                          createVNode("td", null, [
                            createVNode("code", null, "WiFi"),
                            createTextVNode(", "),
                            createVNode("code", null, "Cellular"),
                            createTextVNode(", "),
                            createVNode("code", null, "Other")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "ScreenInformation.PixelDensity")
                          ]),
                          createVNode("td", null, "number"),
                          createVNode("td", null, "Screen pixel density")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "ScreenInformation.Orientation")
                          ]),
                          createVNode("td", null, "enum"),
                          createVNode("td", null, [
                            createVNode("code", null, "Portrait"),
                            createTextVNode(", "),
                            createVNode("code", null, "Landscape")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "BatteryStatus.Level")
                          ]),
                          createVNode("td", null, "number"),
                          createVNode("td", null, "Battery level 0–100")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "BatteryStatus.IsCharging")
                          ]),
                          createVNode("td", null, "boolean"),
                          createVNode("td", null, "Whether device is charging")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "TouchSupport.Supported")
                          ]),
                          createVNode("td", null, "boolean"),
                          createVNode("td", null, "Whether the device supports touch input")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "TouchSupport.MaxTouchPoints")
                          ]),
                          createVNode("td", null, "integer"),
                          createVNode("td", null, "Maximum simultaneous touch points")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "MotionSensors.Status")
                          ]),
                          createVNode("td", null, "enum"),
                          createVNode("td", null, [
                            createVNode("code", null, "InMotion"),
                            createTextVNode(", "),
                            createVNode("code", null, "Stationary")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "MotionSensors.Accelerometer")
                          ]),
                          createVNode("td", null, "boolean"),
                          createVNode("td", null, "Whether accelerometer is present")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "MotionSensors.Gyroscope")
                          ]),
                          createVNode("td", null, "boolean"),
                          createVNode("td", null, "Whether gyroscope is present")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "DeviceEnvironmentContext")
                          ]),
                          createVNode("td", null, "array<enum>"),
                          createVNode("td", null, [
                            createVNode("code", null, "VPNDetected"),
                            createTextVNode(", "),
                            createVNode("code", null, "EmulatorDetected")
                          ])
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-dd5b8c50${_scopeId}>AppInformation <em data-v-dd5b8c50${_scopeId}>(mobile apps)</em></h3>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-dd5b8c50${_scopeId2}><thead data-v-dd5b8c50${_scopeId2}><tr data-v-dd5b8c50${_scopeId2}><th data-v-dd5b8c50${_scopeId2}>Field</th><th data-v-dd5b8c50${_scopeId2}>Type</th><th data-v-dd5b8c50${_scopeId2}>Description</th></tr></thead><tbody data-v-dd5b8c50${_scopeId2}><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>AppVersion</code></td><td data-v-dd5b8c50${_scopeId2}>string</td><td data-v-dd5b8c50${_scopeId2}>Version of the TPP&#39;s mobile app</td></tr><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>PackageName</code></td><td data-v-dd5b8c50${_scopeId2}>string</td><td data-v-dd5b8c50${_scopeId2}>Application package identifier</td></tr><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>BuildNumber</code></td><td data-v-dd5b8c50${_scopeId2}>string</td><td data-v-dd5b8c50${_scopeId2}>Build number</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Field"),
                          createVNode("th", null, "Type"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "AppVersion")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "Version of the TPP's mobile app")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "PackageName")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "Application package identifier")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "BuildNumber")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "Build number")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-dd5b8c50${_scopeId}>BrowserInformation <em data-v-dd5b8c50${_scopeId}>(web sessions)</em></h3>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-dd5b8c50${_scopeId2}><thead data-v-dd5b8c50${_scopeId2}><tr data-v-dd5b8c50${_scopeId2}><th data-v-dd5b8c50${_scopeId2}>Field</th><th data-v-dd5b8c50${_scopeId2}>Type</th><th data-v-dd5b8c50${_scopeId2}>Description</th></tr></thead><tbody data-v-dd5b8c50${_scopeId2}><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>UserAgent</code></td><td data-v-dd5b8c50${_scopeId2}>string</td><td data-v-dd5b8c50${_scopeId2}>Full browser user agent string</td></tr><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>IsCookiesEnabled</code></td><td data-v-dd5b8c50${_scopeId2}>boolean</td><td data-v-dd5b8c50${_scopeId2}>Whether cookies are enabled</td></tr><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>AvailableFonts</code></td><td data-v-dd5b8c50${_scopeId2}>array&lt;string&gt;</td><td data-v-dd5b8c50${_scopeId2}>Installed fonts (fingerprinting signal)</td></tr><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>Plugins</code></td><td data-v-dd5b8c50${_scopeId2}>array&lt;string&gt;</td><td data-v-dd5b8c50${_scopeId2}>Installed browser plugins</td></tr><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>PixelRatio</code></td><td data-v-dd5b8c50${_scopeId2}>number</td><td data-v-dd5b8c50${_scopeId2}>Device pixel ratio</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Field"),
                          createVNode("th", null, "Type"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "UserAgent")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "Full browser user agent string")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "IsCookiesEnabled")
                          ]),
                          createVNode("td", null, "boolean"),
                          createVNode("td", null, "Whether cookies are enabled")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "AvailableFonts")
                          ]),
                          createVNode("td", null, "array<string>"),
                          createVNode("td", null, "Installed fonts (fingerprinting signal)")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Plugins")
                          ]),
                          createVNode("td", null, "array<string>"),
                          createVNode("td", null, "Installed browser plugins")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "PixelRatio")
                          ]),
                          createVNode("td", null, "number"),
                          createVNode("td", null, "Device pixel ratio")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-dd5b8c50${_scopeId}>BiometricCapabilities</h3>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-dd5b8c50${_scopeId2}><thead data-v-dd5b8c50${_scopeId2}><tr data-v-dd5b8c50${_scopeId2}><th data-v-dd5b8c50${_scopeId2}>Field</th><th data-v-dd5b8c50${_scopeId2}>Type</th><th data-v-dd5b8c50${_scopeId2}>Description</th></tr></thead><tbody data-v-dd5b8c50${_scopeId2}><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>SupportsBiometric</code></td><td data-v-dd5b8c50${_scopeId2}>boolean</td><td data-v-dd5b8c50${_scopeId2}>Whether the device supports biometric authentication</td></tr><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>BiometricTypes</code></td><td data-v-dd5b8c50${_scopeId2}>array&lt;enum&gt;</td><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>Fingerprint</code>, <code data-v-dd5b8c50${_scopeId2}>FacialRecognition</code>, <code data-v-dd5b8c50${_scopeId2}>Iris</code>, <code data-v-dd5b8c50${_scopeId2}>VoicePrint</code>, <code data-v-dd5b8c50${_scopeId2}>Other</code></td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Field"),
                          createVNode("th", null, "Type"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "SupportsBiometric")
                          ]),
                          createVNode("td", null, "boolean"),
                          createVNode("td", null, "Whether the device supports biometric authentication")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "BiometricTypes")
                          ]),
                          createVNode("td", null, "array<enum>"),
                          createVNode("td", null, [
                            createVNode("code", null, "Fingerprint"),
                            createTextVNode(", "),
                            createVNode("code", null, "FacialRecognition"),
                            createTextVNode(", "),
                            createVNode("code", null, "Iris"),
                            createTextVNode(", "),
                            createVNode("code", null, "VoicePrint"),
                            createTextVNode(", "),
                            createVNode("code", null, "Other")
                          ])
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-dd5b8c50${_scopeId}>UserBehavior</h3>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-dd5b8c50${_scopeId2}><thead data-v-dd5b8c50${_scopeId2}><tr data-v-dd5b8c50${_scopeId2}><th data-v-dd5b8c50${_scopeId2}>Field</th><th data-v-dd5b8c50${_scopeId2}>Type</th><th data-v-dd5b8c50${_scopeId2}>Description</th></tr></thead><tbody data-v-dd5b8c50${_scopeId2}><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>ScrollBehavior.Direction</code></td><td data-v-dd5b8c50${_scopeId2}>enum</td><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>Up</code>, <code data-v-dd5b8c50${_scopeId2}>Down</code>, <code data-v-dd5b8c50${_scopeId2}>Both</code></td></tr><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>ScrollBehavior.Speed</code></td><td data-v-dd5b8c50${_scopeId2}>number</td><td data-v-dd5b8c50${_scopeId2}>Average scroll speed in pixels per second</td></tr><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>ScrollBehavior.Frequency</code></td><td data-v-dd5b8c50${_scopeId2}>number</td><td data-v-dd5b8c50${_scopeId2}>Scroll events per minute</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Field"),
                          createVNode("th", null, "Type"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "ScrollBehavior.Direction")
                          ]),
                          createVNode("td", null, "enum"),
                          createVNode("td", null, [
                            createVNode("code", null, "Up"),
                            createTextVNode(", "),
                            createVNode("code", null, "Down"),
                            createTextVNode(", "),
                            createVNode("code", null, "Both")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "ScrollBehavior.Speed")
                          ]),
                          createVNode("td", null, "number"),
                          createVNode("td", null, "Average scroll speed in pixels per second")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "ScrollBehavior.Frequency")
                          ]),
                          createVNode("td", null, "number"),
                          createVNode("td", null, "Scroll events per minute")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-dd5b8c50${_scopeId}>AccountRiskIndicators</h3>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-dd5b8c50${_scopeId2}><thead data-v-dd5b8c50${_scopeId2}><tr data-v-dd5b8c50${_scopeId2}><th data-v-dd5b8c50${_scopeId2}>Field</th><th data-v-dd5b8c50${_scopeId2}>Type</th><th data-v-dd5b8c50${_scopeId2}>Description</th></tr></thead><tbody data-v-dd5b8c50${_scopeId2}><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>UserOnboardingDateTime</code></td><td data-v-dd5b8c50${_scopeId2}>date-time</td><td data-v-dd5b8c50${_scopeId2}>When the user&#39;s account was first activated with the TPP</td></tr><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>LastAccountChangeDate</code></td><td data-v-dd5b8c50${_scopeId2}>date</td><td data-v-dd5b8c50${_scopeId2}>Date the account details were last changed</td></tr><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>LastPasswordChangeDate</code></td><td data-v-dd5b8c50${_scopeId2}>date</td><td data-v-dd5b8c50${_scopeId2}>Date of the last password change</td></tr><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>SuspiciousActivity</code></td><td data-v-dd5b8c50${_scopeId2}>enum</td><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>NoSuspiciousActivity</code>, <code data-v-dd5b8c50${_scopeId2}>SuspiciousActivityDetected</code></td></tr><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>TransactionHistory.LastDay</code></td><td data-v-dd5b8c50${_scopeId2}>integer</td><td data-v-dd5b8c50${_scopeId2}>Total transactions in the last 24 hours</td></tr><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>TransactionHistory.LastYear</code></td><td data-v-dd5b8c50${_scopeId2}>integer</td><td data-v-dd5b8c50${_scopeId2}>Total transactions in the past year</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Field"),
                          createVNode("th", null, "Type"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "UserOnboardingDateTime")
                          ]),
                          createVNode("td", null, "date-time"),
                          createVNode("td", null, "When the user's account was first activated with the TPP")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "LastAccountChangeDate")
                          ]),
                          createVNode("td", null, "date"),
                          createVNode("td", null, "Date the account details were last changed")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "LastPasswordChangeDate")
                          ]),
                          createVNode("td", null, "date"),
                          createVNode("td", null, "Date of the last password change")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "SuspiciousActivity")
                          ]),
                          createVNode("td", null, "enum"),
                          createVNode("td", null, [
                            createVNode("code", null, "NoSuspiciousActivity"),
                            createTextVNode(", "),
                            createVNode("code", null, "SuspiciousActivityDetected")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "TransactionHistory.LastDay")
                          ]),
                          createVNode("td", null, "integer"),
                          createVNode("td", null, "Total transactions in the last 24 hours")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "TransactionHistory.LastYear")
                          ]),
                          createVNode("td", null, "integer"),
                          createVNode("td", null, "Total transactions in the past year")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-dd5b8c50${_scopeId}>SupplementaryData</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Free-form object for any debtor-side signals that do not fit the structured fields (e.g. typing speed, behavioural biometrics). `);
                } else {
                  return [
                    createTextVNode(" Free-form object for any debtor-side signals that do not fit the structured fields (e.g. typing speed, behavioural biometrics). ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, "Authentication"),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Field"),
                        createVNode("th", null, "Type"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "AuthenticationChannel")
                        ]),
                        createVNode("td", null, "enum"),
                        createVNode("td", null, [
                          createTextVNode("Channel on which the user authenticated: "),
                          createVNode("code", null, "App"),
                          createTextVNode(", "),
                          createVNode("code", null, "Web")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "PossessionFactor.IsUsed")
                        ]),
                        createVNode("td", null, "boolean"),
                        createVNode("td", null, "Whether a possession factor was used")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "PossessionFactor.Type")
                        ]),
                        createVNode("td", null, "enum"),
                        createVNode("td", null, [
                          createVNode("code", null, "FIDO2SecurityKey"),
                          createTextVNode(", "),
                          createVNode("code", null, "Passkey"),
                          createTextVNode(", "),
                          createVNode("code", null, "OTPDevice"),
                          createTextVNode(", "),
                          createVNode("code", null, "OTPApp"),
                          createTextVNode(", "),
                          createVNode("code", null, "SMSOTP"),
                          createTextVNode(", "),
                          createVNode("code", null, "EmailOTP"),
                          createTextVNode(", "),
                          createVNode("code", null, "PushNotification"),
                          createTextVNode(", "),
                          createVNode("code", null, "WebauthnToken"),
                          createTextVNode(", "),
                          createVNode("code", null, "SecureEnclaveKey"),
                          createTextVNode(", "),
                          createVNode("code", null, "HardwareOTPKey"),
                          createTextVNode(", "),
                          createVNode("code", null, "TrustedDevice"),
                          createTextVNode(", "),
                          createVNode("code", null, "Other")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "KnowledgeFactor.IsUsed")
                        ]),
                        createVNode("td", null, "boolean"),
                        createVNode("td", null, "Whether a knowledge factor was used")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "KnowledgeFactor.Type")
                        ]),
                        createVNode("td", null, "enum"),
                        createVNode("td", null, [
                          createVNode("code", null, "PIN"),
                          createTextVNode(", "),
                          createVNode("code", null, "Password"),
                          createTextVNode(", "),
                          createVNode("code", null, "SecurityQuestion"),
                          createTextVNode(", "),
                          createVNode("code", null, "SMSOTP"),
                          createTextVNode(", "),
                          createVNode("code", null, "EmailOTP"),
                          createTextVNode(", "),
                          createVNode("code", null, "OTPPush"),
                          createTextVNode(", "),
                          createVNode("code", null, "Other")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "InherenceFactor.IsUsed")
                        ]),
                        createVNode("td", null, "boolean"),
                        createVNode("td", null, "Whether a biometric/inherence factor was used")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "InherenceFactor.Type")
                        ]),
                        createVNode("td", null, "enum"),
                        createVNode("td", null, [
                          createVNode("code", null, "Biometric"),
                          createTextVNode(", "),
                          createVNode("code", null, "Fingerprint"),
                          createTextVNode(", "),
                          createVNode("code", null, "FaceRecognition"),
                          createTextVNode(", "),
                          createVNode("code", null, "IrisScan"),
                          createTextVNode(", "),
                          createVNode("code", null, "VoiceRecognition"),
                          createTextVNode(", "),
                          createVNode("code", null, "FIDOBiometric"),
                          createTextVNode(", "),
                          createVNode("code", null, "DeviceBiometrics"),
                          createTextVNode(", "),
                          createVNode("code", null, "Other")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "ChallengeOutcome")
                        ]),
                        createVNode("td", null, "enum"),
                        createVNode("td", null, [
                          createTextVNode("Result of MFA: "),
                          createVNode("code", null, "Pass"),
                          createTextVNode(", "),
                          createVNode("code", null, "Fail"),
                          createTextVNode(", "),
                          createVNode("code", null, "NotPerformed")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "AuthenticationFlow")
                        ]),
                        createVNode("td", null, "enum"),
                        createVNode("td", null, [
                          createVNode("code", null, "MFA"),
                          createTextVNode(", "),
                          createVNode("code", null, "Other")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "AuthenticationValue")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "Cryptographic proof of authentication, where supported")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "ChallengeDateTime")
                        ]),
                        createVNode("td", null, "date-time"),
                        createVNode("td", null, "When the authentication challenge was completed")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "UserName"),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Field"),
                        createVNode("th", null, "Type"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "en")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "User's name in English")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "ar")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "User's name in Arabic")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "GeoLocation"),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Field"),
                        createVNode("th", null, "Type"),
                        createVNode("th", null, "Required"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Latitude")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, "GPS latitude of the user's device")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Longitude")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, "GPS longitude of the user's device")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "DeviceInformation"),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Field"),
                        createVNode("th", null, "Type"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "DeviceId")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "IMEISV number of the device")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "AlternativeDeviceId")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "Alternative device identifier")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "DeviceOperatingSystem")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "OS name (e.g. iOS, Android)")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "DeviceOperatingSystemVersion")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "OS version")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "DeviceBindingId")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "Identifier binding the device to this application")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "LastBindingDateTime")
                        ]),
                        createVNode("td", null, "date-time"),
                        createVNode("td", null, "When the device was last bound")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "BindingDuration")
                        ]),
                        createVNode("td", null, "duration"),
                        createVNode("td", null, [
                          createTextVNode("ISO 8601 duration since last binding (e.g. "),
                          createVNode("code", null, "P30D"),
                          createTextVNode(")")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "BindingStatus")
                        ]),
                        createVNode("td", null, "enum"),
                        createVNode("td", null, [
                          createVNode("code", null, "Active"),
                          createTextVNode(", "),
                          createVNode("code", null, "Expired"),
                          createTextVNode(", "),
                          createVNode("code", null, "Revoked"),
                          createTextVNode(", "),
                          createVNode("code", null, "Suspended")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "DeviceType")
                        ]),
                        createVNode("td", null, "enum"),
                        createVNode("td", null, [
                          createVNode("code", null, "Mobile"),
                          createTextVNode(", "),
                          createVNode("code", null, "Desktop"),
                          createTextVNode(", "),
                          createVNode("code", null, "Tablet"),
                          createTextVNode(", "),
                          createVNode("code", null, "Wearable"),
                          createTextVNode(", "),
                          createVNode("code", null, "Other")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "DeviceManufacturer.Model")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "Device model name")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "DeviceManufacturer.Manufacturer")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "Device manufacturer")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "DeviceLanguage")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "Device language setting")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "DeviceLocalDateTime")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "Local time on the device at initiation")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "ConnectionType")
                        ]),
                        createVNode("td", null, "enum"),
                        createVNode("td", null, [
                          createVNode("code", null, "WiFi"),
                          createTextVNode(", "),
                          createVNode("code", null, "Cellular"),
                          createTextVNode(", "),
                          createVNode("code", null, "Other")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "ScreenInformation.PixelDensity")
                        ]),
                        createVNode("td", null, "number"),
                        createVNode("td", null, "Screen pixel density")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "ScreenInformation.Orientation")
                        ]),
                        createVNode("td", null, "enum"),
                        createVNode("td", null, [
                          createVNode("code", null, "Portrait"),
                          createTextVNode(", "),
                          createVNode("code", null, "Landscape")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "BatteryStatus.Level")
                        ]),
                        createVNode("td", null, "number"),
                        createVNode("td", null, "Battery level 0–100")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "BatteryStatus.IsCharging")
                        ]),
                        createVNode("td", null, "boolean"),
                        createVNode("td", null, "Whether device is charging")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "TouchSupport.Supported")
                        ]),
                        createVNode("td", null, "boolean"),
                        createVNode("td", null, "Whether the device supports touch input")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "TouchSupport.MaxTouchPoints")
                        ]),
                        createVNode("td", null, "integer"),
                        createVNode("td", null, "Maximum simultaneous touch points")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "MotionSensors.Status")
                        ]),
                        createVNode("td", null, "enum"),
                        createVNode("td", null, [
                          createVNode("code", null, "InMotion"),
                          createTextVNode(", "),
                          createVNode("code", null, "Stationary")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "MotionSensors.Accelerometer")
                        ]),
                        createVNode("td", null, "boolean"),
                        createVNode("td", null, "Whether accelerometer is present")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "MotionSensors.Gyroscope")
                        ]),
                        createVNode("td", null, "boolean"),
                        createVNode("td", null, "Whether gyroscope is present")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "DeviceEnvironmentContext")
                        ]),
                        createVNode("td", null, "array<enum>"),
                        createVNode("td", null, [
                          createVNode("code", null, "VPNDetected"),
                          createTextVNode(", "),
                          createVNode("code", null, "EmulatorDetected")
                        ])
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, [
                createTextVNode("AppInformation "),
                createVNode("em", null, "(mobile apps)")
              ]),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Field"),
                        createVNode("th", null, "Type"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "AppVersion")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "Version of the TPP's mobile app")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "PackageName")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "Application package identifier")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "BuildNumber")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "Build number")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, [
                createTextVNode("BrowserInformation "),
                createVNode("em", null, "(web sessions)")
              ]),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Field"),
                        createVNode("th", null, "Type"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "UserAgent")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "Full browser user agent string")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "IsCookiesEnabled")
                        ]),
                        createVNode("td", null, "boolean"),
                        createVNode("td", null, "Whether cookies are enabled")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "AvailableFonts")
                        ]),
                        createVNode("td", null, "array<string>"),
                        createVNode("td", null, "Installed fonts (fingerprinting signal)")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Plugins")
                        ]),
                        createVNode("td", null, "array<string>"),
                        createVNode("td", null, "Installed browser plugins")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "PixelRatio")
                        ]),
                        createVNode("td", null, "number"),
                        createVNode("td", null, "Device pixel ratio")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "BiometricCapabilities"),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Field"),
                        createVNode("th", null, "Type"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "SupportsBiometric")
                        ]),
                        createVNode("td", null, "boolean"),
                        createVNode("td", null, "Whether the device supports biometric authentication")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "BiometricTypes")
                        ]),
                        createVNode("td", null, "array<enum>"),
                        createVNode("td", null, [
                          createVNode("code", null, "Fingerprint"),
                          createTextVNode(", "),
                          createVNode("code", null, "FacialRecognition"),
                          createTextVNode(", "),
                          createVNode("code", null, "Iris"),
                          createTextVNode(", "),
                          createVNode("code", null, "VoicePrint"),
                          createTextVNode(", "),
                          createVNode("code", null, "Other")
                        ])
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "UserBehavior"),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Field"),
                        createVNode("th", null, "Type"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "ScrollBehavior.Direction")
                        ]),
                        createVNode("td", null, "enum"),
                        createVNode("td", null, [
                          createVNode("code", null, "Up"),
                          createTextVNode(", "),
                          createVNode("code", null, "Down"),
                          createTextVNode(", "),
                          createVNode("code", null, "Both")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "ScrollBehavior.Speed")
                        ]),
                        createVNode("td", null, "number"),
                        createVNode("td", null, "Average scroll speed in pixels per second")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "ScrollBehavior.Frequency")
                        ]),
                        createVNode("td", null, "number"),
                        createVNode("td", null, "Scroll events per minute")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "AccountRiskIndicators"),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Field"),
                        createVNode("th", null, "Type"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "UserOnboardingDateTime")
                        ]),
                        createVNode("td", null, "date-time"),
                        createVNode("td", null, "When the user's account was first activated with the TPP")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "LastAccountChangeDate")
                        ]),
                        createVNode("td", null, "date"),
                        createVNode("td", null, "Date the account details were last changed")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "LastPasswordChangeDate")
                        ]),
                        createVNode("td", null, "date"),
                        createVNode("td", null, "Date of the last password change")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "SuspiciousActivity")
                        ]),
                        createVNode("td", null, "enum"),
                        createVNode("td", null, [
                          createVNode("code", null, "NoSuspiciousActivity"),
                          createTextVNode(", "),
                          createVNode("code", null, "SuspiciousActivityDetected")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "TransactionHistory.LastDay")
                        ]),
                        createVNode("td", null, "integer"),
                        createVNode("td", null, "Total transactions in the last 24 hours")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "TransactionHistory.LastYear")
                        ]),
                        createVNode("td", null, "integer"),
                        createVNode("td", null, "Total transactions in the past year")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "SupplementaryData"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Free-form object for any debtor-side signals that do not fit the structured fields (e.g. typing speed, behavioural biometrics). ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "transaction-indicators",
        num: "03",
        color: "var(--at-blue-deep, #1d4ed8)",
        eyebrow: "TransactionIndicators",
        title: "The nature of the transaction itself",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-dd5b8c50${_scopeId2}><thead data-v-dd5b8c50${_scopeId2}><tr data-v-dd5b8c50${_scopeId2}><th data-v-dd5b8c50${_scopeId2}>Field</th><th data-v-dd5b8c50${_scopeId2}>Type</th><th data-v-dd5b8c50${_scopeId2}>Description</th></tr></thead><tbody data-v-dd5b8c50${_scopeId2}><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>IsCustomerPresent</code></td><td data-v-dd5b8c50${_scopeId2}>boolean</td><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>true</code> if the user is actively present during initiation; <code data-v-dd5b8c50${_scopeId2}>false</code> for automated/background payments</td></tr><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>IsContractPresent</code></td><td data-v-dd5b8c50${_scopeId2}>boolean</td><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>true</code> if there is a contractual relationship between the creditor and the TPP for this payment</td></tr><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>Channel</code></td><td data-v-dd5b8c50${_scopeId2}>enum</td><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>Web</code>, <code data-v-dd5b8c50${_scopeId2}>Mobile</code></td></tr><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>ChannelType</code></td><td data-v-dd5b8c50${_scopeId2}>enum</td><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>ECommerce</code>, <code data-v-dd5b8c50${_scopeId2}>InStore</code>, <code data-v-dd5b8c50${_scopeId2}>InApp</code>, <code data-v-dd5b8c50${_scopeId2}>Telephone</code>, <code data-v-dd5b8c50${_scopeId2}>Mail</code>, <code data-v-dd5b8c50${_scopeId2}>RecurringPayment</code>, <code data-v-dd5b8c50${_scopeId2}>Other</code></td></tr><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>SubChannelType</code></td><td data-v-dd5b8c50${_scopeId2}>enum</td><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>WebBrowser</code>, <code data-v-dd5b8c50${_scopeId2}>MobileApp</code>, <code data-v-dd5b8c50${_scopeId2}>SmartTV</code>, <code data-v-dd5b8c50${_scopeId2}>WearableDevice</code>, <code data-v-dd5b8c50${_scopeId2}>POSTerminal</code>, <code data-v-dd5b8c50${_scopeId2}>ATM</code>, <code data-v-dd5b8c50${_scopeId2}>KioskTerminal</code>, <code data-v-dd5b8c50${_scopeId2}>Other</code></td></tr><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>PaymentProcess.TotalDuration</code></td><td data-v-dd5b8c50${_scopeId2}>integer</td><td data-v-dd5b8c50${_scopeId2}>Seconds from payment initiation to submission</td></tr><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>PaymentProcess.CurrentSessionAttempts</code></td><td data-v-dd5b8c50${_scopeId2}>integer</td><td data-v-dd5b8c50${_scopeId2}>Payment attempts in the current session</td></tr><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>PaymentProcess.CurrentSessionFailedAttempts</code></td><td data-v-dd5b8c50${_scopeId2}>integer</td><td data-v-dd5b8c50${_scopeId2}>Failed attempts in the current session</td></tr><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>PaymentProcess.Last24HourAttempts</code></td><td data-v-dd5b8c50${_scopeId2}>integer</td><td data-v-dd5b8c50${_scopeId2}>Total payment attempts in the last 24 hours</td></tr><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>PaymentProcess.Last24HourFailedAttempts</code></td><td data-v-dd5b8c50${_scopeId2}>integer</td><td data-v-dd5b8c50${_scopeId2}>Failed attempts in the last 24 hours</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Field"),
                          createVNode("th", null, "Type"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "IsCustomerPresent")
                          ]),
                          createVNode("td", null, "boolean"),
                          createVNode("td", null, [
                            createVNode("code", null, "true"),
                            createTextVNode(" if the user is actively present during initiation; "),
                            createVNode("code", null, "false"),
                            createTextVNode(" for automated/background payments")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "IsContractPresent")
                          ]),
                          createVNode("td", null, "boolean"),
                          createVNode("td", null, [
                            createVNode("code", null, "true"),
                            createTextVNode(" if there is a contractual relationship between the creditor and the TPP for this payment")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Channel")
                          ]),
                          createVNode("td", null, "enum"),
                          createVNode("td", null, [
                            createVNode("code", null, "Web"),
                            createTextVNode(", "),
                            createVNode("code", null, "Mobile")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "ChannelType")
                          ]),
                          createVNode("td", null, "enum"),
                          createVNode("td", null, [
                            createVNode("code", null, "ECommerce"),
                            createTextVNode(", "),
                            createVNode("code", null, "InStore"),
                            createTextVNode(", "),
                            createVNode("code", null, "InApp"),
                            createTextVNode(", "),
                            createVNode("code", null, "Telephone"),
                            createTextVNode(", "),
                            createVNode("code", null, "Mail"),
                            createTextVNode(", "),
                            createVNode("code", null, "RecurringPayment"),
                            createTextVNode(", "),
                            createVNode("code", null, "Other")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "SubChannelType")
                          ]),
                          createVNode("td", null, "enum"),
                          createVNode("td", null, [
                            createVNode("code", null, "WebBrowser"),
                            createTextVNode(", "),
                            createVNode("code", null, "MobileApp"),
                            createTextVNode(", "),
                            createVNode("code", null, "SmartTV"),
                            createTextVNode(", "),
                            createVNode("code", null, "WearableDevice"),
                            createTextVNode(", "),
                            createVNode("code", null, "POSTerminal"),
                            createTextVNode(", "),
                            createVNode("code", null, "ATM"),
                            createTextVNode(", "),
                            createVNode("code", null, "KioskTerminal"),
                            createTextVNode(", "),
                            createVNode("code", null, "Other")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "PaymentProcess.TotalDuration")
                          ]),
                          createVNode("td", null, "integer"),
                          createVNode("td", null, "Seconds from payment initiation to submission")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "PaymentProcess.CurrentSessionAttempts")
                          ]),
                          createVNode("td", null, "integer"),
                          createVNode("td", null, "Payment attempts in the current session")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "PaymentProcess.CurrentSessionFailedAttempts")
                          ]),
                          createVNode("td", null, "integer"),
                          createVNode("td", null, "Failed attempts in the current session")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "PaymentProcess.Last24HourAttempts")
                          ]),
                          createVNode("td", null, "integer"),
                          createVNode("td", null, "Total payment attempts in the last 24 hours")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "PaymentProcess.Last24HourFailedAttempts")
                          ]),
                          createVNode("td", null, "integer"),
                          createVNode("td", null, "Failed attempts in the last 24 hours")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-dd5b8c50${_scopeId}>MerchantRisk <em data-v-dd5b8c50${_scopeId}>(e-commerce payments)</em></h3>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-dd5b8c50${_scopeId2}><thead data-v-dd5b8c50${_scopeId2}><tr data-v-dd5b8c50${_scopeId2}><th data-v-dd5b8c50${_scopeId2}>Field</th><th data-v-dd5b8c50${_scopeId2}>Type</th><th data-v-dd5b8c50${_scopeId2}>Description</th></tr></thead><tbody data-v-dd5b8c50${_scopeId2}><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>DeliveryTimeframe</code></td><td data-v-dd5b8c50${_scopeId2}>enum</td><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>ElectronicDelivery</code>, <code data-v-dd5b8c50${_scopeId2}>SameDayShipping</code>, <code data-v-dd5b8c50${_scopeId2}>OvernightShipping</code>, <code data-v-dd5b8c50${_scopeId2}>MoreThan1DayShipping</code></td></tr><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>ReorderItemsIndicator</code></td><td data-v-dd5b8c50${_scopeId2}>enum</td><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>FirstTimeOrder</code>, <code data-v-dd5b8c50${_scopeId2}>Reorder</code></td></tr><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>PreOrderPurchaseIndicator</code></td><td data-v-dd5b8c50${_scopeId2}>enum</td><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>MerchandiseAvailable</code>, <code data-v-dd5b8c50${_scopeId2}>FutureAvailability</code></td></tr><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>IsGiftCardPurchase</code></td><td data-v-dd5b8c50${_scopeId2}>boolean</td><td data-v-dd5b8c50${_scopeId2}>Whether the transaction includes a gift card</td></tr><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>IsDeliveryAddressMatchesBilling</code></td><td data-v-dd5b8c50${_scopeId2}>boolean</td><td data-v-dd5b8c50${_scopeId2}>Whether delivery address matches billing address</td></tr><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>AddressMatchLevel</code></td><td data-v-dd5b8c50${_scopeId2}>enum</td><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>FullMatch</code>, <code data-v-dd5b8c50${_scopeId2}>PartialMatch</code>, <code data-v-dd5b8c50${_scopeId2}>NoMatch</code>, <code data-v-dd5b8c50${_scopeId2}>NotApplicable</code></td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Field"),
                          createVNode("th", null, "Type"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "DeliveryTimeframe")
                          ]),
                          createVNode("td", null, "enum"),
                          createVNode("td", null, [
                            createVNode("code", null, "ElectronicDelivery"),
                            createTextVNode(", "),
                            createVNode("code", null, "SameDayShipping"),
                            createTextVNode(", "),
                            createVNode("code", null, "OvernightShipping"),
                            createTextVNode(", "),
                            createVNode("code", null, "MoreThan1DayShipping")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "ReorderItemsIndicator")
                          ]),
                          createVNode("td", null, "enum"),
                          createVNode("td", null, [
                            createVNode("code", null, "FirstTimeOrder"),
                            createTextVNode(", "),
                            createVNode("code", null, "Reorder")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "PreOrderPurchaseIndicator")
                          ]),
                          createVNode("td", null, "enum"),
                          createVNode("td", null, [
                            createVNode("code", null, "MerchandiseAvailable"),
                            createTextVNode(", "),
                            createVNode("code", null, "FutureAvailability")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "IsGiftCardPurchase")
                          ]),
                          createVNode("td", null, "boolean"),
                          createVNode("td", null, "Whether the transaction includes a gift card")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "IsDeliveryAddressMatchesBilling")
                          ]),
                          createVNode("td", null, "boolean"),
                          createVNode("td", null, "Whether delivery address matches billing address")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "AddressMatchLevel")
                          ]),
                          createVNode("td", null, "enum"),
                          createVNode("td", null, [
                            createVNode("code", null, "FullMatch"),
                            createTextVNode(", "),
                            createVNode("code", null, "PartialMatch"),
                            createTextVNode(", "),
                            createVNode("code", null, "NoMatch"),
                            createTextVNode(", "),
                            createVNode("code", null, "NotApplicable")
                          ])
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-dd5b8c50${_scopeId}>SupplementaryData</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Free-form object for transaction-side signals outside the structured fields. `);
                } else {
                  return [
                    createTextVNode(" Free-form object for transaction-side signals outside the structured fields. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Field"),
                        createVNode("th", null, "Type"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "IsCustomerPresent")
                        ]),
                        createVNode("td", null, "boolean"),
                        createVNode("td", null, [
                          createVNode("code", null, "true"),
                          createTextVNode(" if the user is actively present during initiation; "),
                          createVNode("code", null, "false"),
                          createTextVNode(" for automated/background payments")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "IsContractPresent")
                        ]),
                        createVNode("td", null, "boolean"),
                        createVNode("td", null, [
                          createVNode("code", null, "true"),
                          createTextVNode(" if there is a contractual relationship between the creditor and the TPP for this payment")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Channel")
                        ]),
                        createVNode("td", null, "enum"),
                        createVNode("td", null, [
                          createVNode("code", null, "Web"),
                          createTextVNode(", "),
                          createVNode("code", null, "Mobile")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "ChannelType")
                        ]),
                        createVNode("td", null, "enum"),
                        createVNode("td", null, [
                          createVNode("code", null, "ECommerce"),
                          createTextVNode(", "),
                          createVNode("code", null, "InStore"),
                          createTextVNode(", "),
                          createVNode("code", null, "InApp"),
                          createTextVNode(", "),
                          createVNode("code", null, "Telephone"),
                          createTextVNode(", "),
                          createVNode("code", null, "Mail"),
                          createTextVNode(", "),
                          createVNode("code", null, "RecurringPayment"),
                          createTextVNode(", "),
                          createVNode("code", null, "Other")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "SubChannelType")
                        ]),
                        createVNode("td", null, "enum"),
                        createVNode("td", null, [
                          createVNode("code", null, "WebBrowser"),
                          createTextVNode(", "),
                          createVNode("code", null, "MobileApp"),
                          createTextVNode(", "),
                          createVNode("code", null, "SmartTV"),
                          createTextVNode(", "),
                          createVNode("code", null, "WearableDevice"),
                          createTextVNode(", "),
                          createVNode("code", null, "POSTerminal"),
                          createTextVNode(", "),
                          createVNode("code", null, "ATM"),
                          createTextVNode(", "),
                          createVNode("code", null, "KioskTerminal"),
                          createTextVNode(", "),
                          createVNode("code", null, "Other")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "PaymentProcess.TotalDuration")
                        ]),
                        createVNode("td", null, "integer"),
                        createVNode("td", null, "Seconds from payment initiation to submission")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "PaymentProcess.CurrentSessionAttempts")
                        ]),
                        createVNode("td", null, "integer"),
                        createVNode("td", null, "Payment attempts in the current session")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "PaymentProcess.CurrentSessionFailedAttempts")
                        ]),
                        createVNode("td", null, "integer"),
                        createVNode("td", null, "Failed attempts in the current session")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "PaymentProcess.Last24HourAttempts")
                        ]),
                        createVNode("td", null, "integer"),
                        createVNode("td", null, "Total payment attempts in the last 24 hours")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "PaymentProcess.Last24HourFailedAttempts")
                        ]),
                        createVNode("td", null, "integer"),
                        createVNode("td", null, "Failed attempts in the last 24 hours")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, [
                createTextVNode("MerchantRisk "),
                createVNode("em", null, "(e-commerce payments)")
              ]),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Field"),
                        createVNode("th", null, "Type"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "DeliveryTimeframe")
                        ]),
                        createVNode("td", null, "enum"),
                        createVNode("td", null, [
                          createVNode("code", null, "ElectronicDelivery"),
                          createTextVNode(", "),
                          createVNode("code", null, "SameDayShipping"),
                          createTextVNode(", "),
                          createVNode("code", null, "OvernightShipping"),
                          createTextVNode(", "),
                          createVNode("code", null, "MoreThan1DayShipping")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "ReorderItemsIndicator")
                        ]),
                        createVNode("td", null, "enum"),
                        createVNode("td", null, [
                          createVNode("code", null, "FirstTimeOrder"),
                          createTextVNode(", "),
                          createVNode("code", null, "Reorder")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "PreOrderPurchaseIndicator")
                        ]),
                        createVNode("td", null, "enum"),
                        createVNode("td", null, [
                          createVNode("code", null, "MerchandiseAvailable"),
                          createTextVNode(", "),
                          createVNode("code", null, "FutureAvailability")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "IsGiftCardPurchase")
                        ]),
                        createVNode("td", null, "boolean"),
                        createVNode("td", null, "Whether the transaction includes a gift card")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "IsDeliveryAddressMatchesBilling")
                        ]),
                        createVNode("td", null, "boolean"),
                        createVNode("td", null, "Whether delivery address matches billing address")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "AddressMatchLevel")
                        ]),
                        createVNode("td", null, "enum"),
                        createVNode("td", null, [
                          createVNode("code", null, "FullMatch"),
                          createTextVNode(", "),
                          createVNode("code", null, "PartialMatch"),
                          createTextVNode(", "),
                          createVNode("code", null, "NoMatch"),
                          createTextVNode(", "),
                          createVNode("code", null, "NotApplicable")
                        ])
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "SupplementaryData"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Free-form object for transaction-side signals outside the structured fields. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "creditor-indicators",
        num: "04",
        color: "var(--at-navy)",
        eyebrow: "CreditorIndicators",
        title: "Information about the payee (beneficiary)",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-dd5b8c50${_scopeId2}><thead data-v-dd5b8c50${_scopeId2}><tr data-v-dd5b8c50${_scopeId2}><th data-v-dd5b8c50${_scopeId2}>Field</th><th data-v-dd5b8c50${_scopeId2}>Type</th><th data-v-dd5b8c50${_scopeId2}>Description</th></tr></thead><tbody data-v-dd5b8c50${_scopeId2}><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>AccountType</code></td><td data-v-dd5b8c50${_scopeId2}>enum</td><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>Retail</code>, <code data-v-dd5b8c50${_scopeId2}>Corporate</code></td></tr><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>IsCreditorPrePopulated</code></td><td data-v-dd5b8c50${_scopeId2}>boolean</td><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>true</code> if the TPP pre-filled the beneficiary details rather than the user entering them</td></tr><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>TradingName</code></td><td data-v-dd5b8c50${_scopeId2}>string</td><td data-v-dd5b8c50${_scopeId2}>Trading name of the creditor, if a business</td></tr><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>IsVerifiedByTPP</code></td><td data-v-dd5b8c50${_scopeId2}>boolean</td><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>true</code> if the TPP has onboarded and verified the creditor</td></tr><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>IsCreditorConfirmed</code></td><td data-v-dd5b8c50${_scopeId2}>boolean</td><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>true</code> if beneficiary account details were confirmed via Confirmation of Payee</td></tr><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>AdditionalAccountHolderIdentifiers</code></td><td data-v-dd5b8c50${_scopeId2}>array</td><td data-v-dd5b8c50${_scopeId2}>Additional identifiers for the creditor — each requires <code data-v-dd5b8c50${_scopeId2}>SchemeName</code> (<code data-v-dd5b8c50${_scopeId2}>EmiratesID</code> or <code data-v-dd5b8c50${_scopeId2}>TradeLicenceNumber</code>) and <code data-v-dd5b8c50${_scopeId2}>Identification</code></td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Field"),
                          createVNode("th", null, "Type"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "AccountType")
                          ]),
                          createVNode("td", null, "enum"),
                          createVNode("td", null, [
                            createVNode("code", null, "Retail"),
                            createTextVNode(", "),
                            createVNode("code", null, "Corporate")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "IsCreditorPrePopulated")
                          ]),
                          createVNode("td", null, "boolean"),
                          createVNode("td", null, [
                            createVNode("code", null, "true"),
                            createTextVNode(" if the TPP pre-filled the beneficiary details rather than the user entering them")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "TradingName")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "Trading name of the creditor, if a business")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "IsVerifiedByTPP")
                          ]),
                          createVNode("td", null, "boolean"),
                          createVNode("td", null, [
                            createVNode("code", null, "true"),
                            createTextVNode(" if the TPP has onboarded and verified the creditor")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "IsCreditorConfirmed")
                          ]),
                          createVNode("td", null, "boolean"),
                          createVNode("td", null, [
                            createVNode("code", null, "true"),
                            createTextVNode(" if beneficiary account details were confirmed via Confirmation of Payee")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "AdditionalAccountHolderIdentifiers")
                          ]),
                          createVNode("td", null, "array"),
                          createVNode("td", null, [
                            createTextVNode("Additional identifiers for the creditor — each requires "),
                            createVNode("code", null, "SchemeName"),
                            createTextVNode(" ("),
                            createVNode("code", null, "EmiratesID"),
                            createTextVNode(" or "),
                            createVNode("code", null, "TradeLicenceNumber"),
                            createTextVNode(") and "),
                            createVNode("code", null, "Identification")
                          ])
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-dd5b8c50${_scopeId}>MerchantDetails <em data-v-dd5b8c50${_scopeId}>(merchant payments only)</em></h3>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-dd5b8c50${_scopeId2}><thead data-v-dd5b8c50${_scopeId2}><tr data-v-dd5b8c50${_scopeId2}><th data-v-dd5b8c50${_scopeId2}>Field</th><th data-v-dd5b8c50${_scopeId2}>Type</th><th data-v-dd5b8c50${_scopeId2}>Description</th></tr></thead><tbody data-v-dd5b8c50${_scopeId2}><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>MerchantId</code></td><td data-v-dd5b8c50${_scopeId2}>string</td><td data-v-dd5b8c50${_scopeId2}>Merchant identifier (8–20 chars)</td></tr><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>MerchantName</code></td><td data-v-dd5b8c50${_scopeId2}>string</td><td data-v-dd5b8c50${_scopeId2}>Merchant trading name</td></tr><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>MerchantSICCode</code></td><td data-v-dd5b8c50${_scopeId2}>string</td><td data-v-dd5b8c50${_scopeId2}>Standard Industrial Classification code (3–4 chars)</td></tr><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>MerchantCategoryCode</code></td><td data-v-dd5b8c50${_scopeId2}>string</td><td data-v-dd5b8c50${_scopeId2}>ISO 18245 merchant category code (3–4 chars)</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Field"),
                          createVNode("th", null, "Type"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "MerchantId")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "Merchant identifier (8–20 chars)")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "MerchantName")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "Merchant trading name")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "MerchantSICCode")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "Standard Industrial Classification code (3–4 chars)")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "MerchantCategoryCode")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "ISO 18245 merchant category code (3–4 chars)")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-dd5b8c50${_scopeId}>SupplementaryData</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Free-form object for creditor-side signals outside the structured fields. `);
                } else {
                  return [
                    createTextVNode(" Free-form object for creditor-side signals outside the structured fields. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Field"),
                        createVNode("th", null, "Type"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "AccountType")
                        ]),
                        createVNode("td", null, "enum"),
                        createVNode("td", null, [
                          createVNode("code", null, "Retail"),
                          createTextVNode(", "),
                          createVNode("code", null, "Corporate")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "IsCreditorPrePopulated")
                        ]),
                        createVNode("td", null, "boolean"),
                        createVNode("td", null, [
                          createVNode("code", null, "true"),
                          createTextVNode(" if the TPP pre-filled the beneficiary details rather than the user entering them")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "TradingName")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "Trading name of the creditor, if a business")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "IsVerifiedByTPP")
                        ]),
                        createVNode("td", null, "boolean"),
                        createVNode("td", null, [
                          createVNode("code", null, "true"),
                          createTextVNode(" if the TPP has onboarded and verified the creditor")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "IsCreditorConfirmed")
                        ]),
                        createVNode("td", null, "boolean"),
                        createVNode("td", null, [
                          createVNode("code", null, "true"),
                          createTextVNode(" if beneficiary account details were confirmed via Confirmation of Payee")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "AdditionalAccountHolderIdentifiers")
                        ]),
                        createVNode("td", null, "array"),
                        createVNode("td", null, [
                          createTextVNode("Additional identifiers for the creditor — each requires "),
                          createVNode("code", null, "SchemeName"),
                          createTextVNode(" ("),
                          createVNode("code", null, "EmiratesID"),
                          createTextVNode(" or "),
                          createVNode("code", null, "TradeLicenceNumber"),
                          createTextVNode(") and "),
                          createVNode("code", null, "Identification")
                        ])
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, [
                createTextVNode("MerchantDetails "),
                createVNode("em", null, "(merchant payments only)")
              ]),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Field"),
                        createVNode("th", null, "Type"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "MerchantId")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "Merchant identifier (8–20 chars)")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "MerchantName")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "Merchant trading name")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "MerchantSICCode")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "Standard Industrial Classification code (3–4 chars)")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "MerchantCategoryCode")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "ISO 18245 merchant category code (3–4 chars)")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "SupplementaryData"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Free-form object for creditor-side signals outside the structured fields. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "delivery-address",
        num: "05",
        color: "var(--at-teal-deep)",
        eyebrow: "DestinationDeliveryAddress",
        title: "Postal address for goods or services delivery",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Postal address for delivery of goods or services. Provide this when the payment is for physical goods being shipped. `);
                } else {
                  return [
                    createTextVNode(" Postal address for delivery of goods or services. Provide this when the payment is for physical goods being shipped. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-dd5b8c50${_scopeId2}><thead data-v-dd5b8c50${_scopeId2}><tr data-v-dd5b8c50${_scopeId2}><th data-v-dd5b8c50${_scopeId2}>Field</th><th data-v-dd5b8c50${_scopeId2}>Type</th><th data-v-dd5b8c50${_scopeId2}>Description</th></tr></thead><tbody data-v-dd5b8c50${_scopeId2}><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>RecipientType</code></td><td data-v-dd5b8c50${_scopeId2}>enum</td><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>Individual</code>, <code data-v-dd5b8c50${_scopeId2}>Corporate</code></td></tr><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>RecipientName.en</code></td><td data-v-dd5b8c50${_scopeId2}>string</td><td data-v-dd5b8c50${_scopeId2}>Recipient name in English</td></tr><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>RecipientName.ar</code></td><td data-v-dd5b8c50${_scopeId2}>string</td><td data-v-dd5b8c50${_scopeId2}>Recipient name in Arabic</td></tr><tr data-v-dd5b8c50${_scopeId2}><td data-v-dd5b8c50${_scopeId2}><code data-v-dd5b8c50${_scopeId2}>NationalAddress</code></td><td data-v-dd5b8c50${_scopeId2}>array</td><td data-v-dd5b8c50${_scopeId2}>One or more postal addresses — see <code data-v-dd5b8c50${_scopeId2}>AEAddress</code> schema for full field list including <code data-v-dd5b8c50${_scopeId2}>AddressType</code>, <code data-v-dd5b8c50${_scopeId2}>AddressLine</code>, <code data-v-dd5b8c50${_scopeId2}>Country</code>, and UAE-specific fields such as <code data-v-dd5b8c50${_scopeId2}>CountrySubDivision</code> (Emirate)</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Field"),
                          createVNode("th", null, "Type"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "RecipientType")
                          ]),
                          createVNode("td", null, "enum"),
                          createVNode("td", null, [
                            createVNode("code", null, "Individual"),
                            createTextVNode(", "),
                            createVNode("code", null, "Corporate")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "RecipientName.en")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "Recipient name in English")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "RecipientName.ar")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "Recipient name in Arabic")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "NationalAddress")
                          ]),
                          createVNode("td", null, "array"),
                          createVNode("td", null, [
                            createTextVNode("One or more postal addresses — see "),
                            createVNode("code", null, "AEAddress"),
                            createTextVNode(" schema for full field list including "),
                            createVNode("code", null, "AddressType"),
                            createTextVNode(", "),
                            createVNode("code", null, "AddressLine"),
                            createTextVNode(", "),
                            createVNode("code", null, "Country"),
                            createTextVNode(", and UAE-specific fields such as "),
                            createVNode("code", null, "CountrySubDivision"),
                            createTextVNode(" (Emirate)")
                          ])
                        ])
                      ])
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
                  createTextVNode(" Postal address for delivery of goods or services. Provide this when the payment is for physical goods being shipped. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Field"),
                        createVNode("th", null, "Type"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "RecipientType")
                        ]),
                        createVNode("td", null, "enum"),
                        createVNode("td", null, [
                          createVNode("code", null, "Individual"),
                          createTextVNode(", "),
                          createVNode("code", null, "Corporate")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "RecipientName.en")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "Recipient name in English")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "RecipientName.ar")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "Recipient name in Arabic")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "NationalAddress")
                        ]),
                        createVNode("td", null, "array"),
                        createVNode("td", null, [
                          createTextVNode("One or more postal addresses — see "),
                          createVNode("code", null, "AEAddress"),
                          createTextVNode(" schema for full field list including "),
                          createVNode("code", null, "AddressType"),
                          createTextVNode(", "),
                          createVNode("code", null, "AddressLine"),
                          createTextVNode(", "),
                          createVNode("code", null, "Country"),
                          createTextVNode(", and UAE-specific fields such as "),
                          createVNode("code", null, "CountrySubDivision"),
                          createTextVNode(" (Emirate)")
                        ])
                      ])
                    ])
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
        id: "examples",
        num: "06",
        color: "var(--at-gold)",
        eyebrow: "Payment Context Examples",
        title: "Minimum expected content for common scenarios",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The fields you must populate vary significantly depending on the payment scenario. The following examples show the minimum expected content for common cases. `);
                } else {
                  return [
                    createTextVNode(" The fields you must populate vary significantly depending on the payment scenario. The following examples show the minimum expected content for common cases. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "warning",
              title: "Populate everything you know"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-dd5b8c50${_scopeId2}> These examples are illustrative minimums. If your system holds additional signals — device binding age, transaction history, browser fingerprint — include them. Missing data that your system holds weakens the LFI&#39;s risk assessment. </p>`);
                } else {
                  return [
                    createVNode("p", null, " These examples are illustrative minimums. If your system holds additional signals — device binding age, transaction history, browser fingerprint — include them. Missing data that your system holds weakens the LFI's risk assessment. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-dd5b8c50${_scopeId}>Merchant / E-Commerce Payment</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` A retail customer checks out on the TPP&#39;s web storefront. The user is present, authenticated with username/password + OTP, and paying a known merchant. `);
                } else {
                  return [
                    createTextVNode(" A retail customer checks out on the TPP's web storefront. The user is present, authenticated with username/password + OTP, and paying a known merchant. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: merchantExample,
              lang: "json",
              filename: "Risk — merchant / e-commerce"
            }, null, _parent2, _scopeId));
            _push2(`<h3 data-v-dd5b8c50${_scopeId}>Account-to-Account Transfer</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` A user transfers funds to a friend or family member from within the TPP&#39;s mobile app. The user is present, authenticated with biometrics on a known device. `);
                } else {
                  return [
                    createTextVNode(" A user transfers funds to a friend or family member from within the TPP's mobile app. The user is present, authenticated with biometrics on a known device. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: a2aExample,
              lang: "json",
              filename: "Risk — account-to-account"
            }, null, _parent2, _scopeId));
            _push2(`<h3 data-v-dd5b8c50${_scopeId}>Subscription / Recurring Payment (Customer Not Present)</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` A recurring subscription payment initiated automatically by the TPP&#39;s backend — for example, a monthly SaaS fee. The user is not present; the payment is executed under a standing consent. `);
                } else {
                  return [
                    createTextVNode(" A recurring subscription payment initiated automatically by the TPP's backend — for example, a monthly SaaS fee. The user is not present; the payment is executed under a standing consent. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: subscriptionExample,
              lang: "json",
              filename: "Risk — subscription"
            }, null, _parent2, _scopeId));
            _push2(`<h3 data-v-dd5b8c50${_scopeId}>Delegated SCA Payment</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` A payment where the user has completed SCA at the TPP (satisfying the bank&#39;s SCA requirement by delegation). The user is present, authenticated with a strong combination of factors on a trusted device, and the TPP is asserting authentication on behalf of the bank. `);
                } else {
                  return [
                    createTextVNode(" A payment where the user has completed SCA at the TPP (satisfying the bank's SCA requirement by delegation). The user is present, authenticated with a strong combination of factors on a trusted device, and the TPP is asserting authentication on behalf of the bank. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: delegatedScaExample,
              lang: "json",
              filename: "Risk — delegated SCA"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The fields you must populate vary significantly depending on the payment scenario. The following examples show the minimum expected content for common cases. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "warning",
                title: "Populate everything you know"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, " These examples are illustrative minimums. If your system holds additional signals — device binding age, transaction history, browser fingerprint — include them. Missing data that your system holds weakens the LFI's risk assessment. ")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Merchant / E-Commerce Payment"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" A retail customer checks out on the TPP's web storefront. The user is present, authenticated with username/password + OTP, and paying a known merchant. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: merchantExample,
                lang: "json",
                filename: "Risk — merchant / e-commerce"
              }),
              createVNode("h3", null, "Account-to-Account Transfer"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" A user transfers funds to a friend or family member from within the TPP's mobile app. The user is present, authenticated with biometrics on a known device. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: a2aExample,
                lang: "json",
                filename: "Risk — account-to-account"
              }),
              createVNode("h3", null, "Subscription / Recurring Payment (Customer Not Present)"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" A recurring subscription payment initiated automatically by the TPP's backend — for example, a monthly SaaS fee. The user is not present; the payment is executed under a standing consent. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: subscriptionExample,
                lang: "json",
                filename: "Risk — subscription"
              }),
              createVNode("h3", null, "Delegated SCA Payment"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" A payment where the user has completed SCA at the TPP (satisfying the bank's SCA requirement by delegation). The user is present, authenticated with a strong combination of factors on a trusted device, and the TPP is asserting authentication on behalf of the bank. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: delegatedScaExample,
                lang: "json",
                filename: "Risk — delegated SCA"
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/v2.2-rc1/banking/service-initiation/personal-identifiable-information/risk.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const risk = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-dd5b8c50"]]);
export {
  risk as default
};
