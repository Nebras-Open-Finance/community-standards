import { defineComponent, ref, computed, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const ENDPOINT_PRICING = [
  // ─── Consent & authorization (all non-chargeable) ────────────────────────
  {
    docPath: "tech/tpp-standards/v2.1/consent/open-api/par",
    method: "POST",
    path: "/par",
    family: "Consent & authorization",
    title: "Pushed Authorization Request",
    chargeable: false
  },
  {
    docPath: "tech/tpp-standards/security/tokens/open-api/token",
    method: "POST",
    path: "/token",
    family: "Consent & authorization",
    title: "Token endpoint",
    chargeable: false
  },
  {
    docPath: "tech/tpp-standards/v2.1/consent/open-api/account-access-consents",
    method: "GET",
    path: "/account-access-consents",
    family: "Consent & authorization",
    title: "Retrieve Data Sharing Consents by BaseConsentId",
    chargeable: false
  },
  {
    docPath: "tech/tpp-standards/v2.1/consent/open-api/account-access-consents-ConsentId",
    method: "GET",
    path: "/account-access-consents/{ConsentId}",
    family: "Consent & authorization",
    title: "Retrieve Data Sharing Consent by ConsentId",
    chargeable: false
  },
  {
    docPath: "tech/tpp-standards/v2.1/consent/open-api/patch-account-access-consents-ConsentId",
    method: "PATCH",
    path: "/account-access-consents/{ConsentId}",
    family: "Consent & authorization",
    title: "Modify a Data Sharing Consent",
    chargeable: false
  },
  {
    docPath: "tech/tpp-standards/v2.1/consent/open-api/payment-consents",
    method: "GET",
    path: "/payment-consents",
    family: "Consent & authorization",
    title: "Retrieve Payment Consents by BaseConsentId",
    chargeable: false
  },
  {
    docPath: "tech/tpp-standards/v2.1/consent/open-api/payment-consents-ConsentId",
    method: "GET",
    path: "/payment-consents/{ConsentId}",
    family: "Consent & authorization",
    title: "Retrieve Payment Consent by ConsentId",
    chargeable: false
  },
  {
    docPath: "tech/tpp-standards/v2.1/consent/open-api/patch-payment-consents-ConsentId",
    method: "PATCH",
    path: "/payment-consents/{ConsentId}",
    family: "Consent & authorization",
    title: "Modify a Payment Consent",
    chargeable: false
  },
  {
    docPath: "tech/tpp-standards/v2.1/consent/open-api/insurance-consents",
    method: "GET",
    path: "/insurance-consents",
    family: "Consent & authorization",
    title: "Retrieve Insurance Data Sharing Consents by BaseConsentId",
    chargeable: false
  },
  {
    docPath: "tech/tpp-standards/v2.1/consent/open-api/insurance-consents-ConsentId",
    method: "GET",
    path: "/insurance-consents/{ConsentId}",
    family: "Consent & authorization",
    title: "Retrieve Insurance Data Sharing Consent by ConsentId",
    chargeable: false
  },
  {
    docPath: "tech/tpp-standards/v2.1/consent/open-api/patch-insurance-consents-ConsentId",
    method: "PATCH",
    path: "/insurance-consents/{ConsentId}",
    family: "Consent & authorization",
    title: "Modify an Insurance Data Sharing Consent",
    chargeable: false
  },
  // ─── Data sharing (all chargeable; balance is discounted with payment) ───
  {
    docPath: "tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts",
    method: "GET",
    path: "/accounts",
    family: "Data sharing",
    title: "Get Accounts",
    chargeable: true
  },
  {
    docPath: "tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId",
    method: "GET",
    path: "/accounts/{AccountId}",
    family: "Data sharing",
    title: "Get an Account",
    chargeable: true
  },
  {
    docPath: "tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-balances",
    method: "GET",
    path: "/accounts/{AccountId}/balances",
    family: "Data sharing",
    title: "Get Balances for an Account",
    chargeable: true,
    discountable: true
  },
  {
    docPath: "tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-beneficiaries",
    method: "GET",
    path: "/accounts/{AccountId}/beneficiaries",
    family: "Data sharing",
    title: "Get Beneficiaries for an Account",
    chargeable: true
  },
  {
    docPath: "tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-direct-debits",
    method: "GET",
    path: "/accounts/{AccountId}/direct-debits",
    family: "Data sharing",
    title: "Get Direct Debits for an Account",
    chargeable: true
  },
  {
    docPath: "tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-parties",
    method: "GET",
    path: "/accounts/{AccountId}/parties",
    family: "Data sharing",
    title: "Get Customer for an Account",
    chargeable: true
  },
  {
    docPath: "tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-product",
    method: "GET",
    path: "/accounts/{AccountId}/product",
    family: "Data sharing",
    title: "Get Product Configuration for an Account",
    chargeable: true
  },
  {
    docPath: "tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-scheduled-payments",
    method: "GET",
    path: "/accounts/{AccountId}/scheduled-payments",
    family: "Data sharing",
    title: "Get Scheduled Payments for an Account",
    chargeable: true
  },
  {
    docPath: "tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-standing-orders",
    method: "GET",
    path: "/accounts/{AccountId}/standing-orders",
    family: "Data sharing",
    title: "Get Standing Orders for an Account",
    chargeable: true
  },
  {
    docPath: "tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-statements",
    method: "GET",
    path: "/accounts/{AccountId}/statements",
    family: "Data sharing",
    title: "Get Statements for an Account",
    chargeable: true
  },
  {
    docPath: "tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-transactions",
    method: "GET",
    path: "/accounts/{AccountId}/transactions",
    family: "Data sharing",
    title: "Get Transactions for an Account",
    chargeable: true
  },
  {
    docPath: "tech/tpp-standards/v2.1/banking/data-sharing/open-api/parties",
    method: "GET",
    path: "/parties",
    family: "Data sharing",
    title: "Get Customers",
    chargeable: true
  },
  // Insurance Data Sharing — 7 sectors × 2 endpoints (list + by-id)
  {
    docPath: "tech/tpp-standards/v2.1/insurance/data-sharing/open-api/employment-insurance-policies",
    method: "GET",
    path: "/employment-insurance-policies",
    family: "Data sharing",
    title: "Get Employment Insurance Policies",
    chargeable: true
  },
  {
    docPath: "tech/tpp-standards/v2.1/insurance/data-sharing/open-api/employment-insurance-policies-InsurancePolicyId",
    method: "GET",
    path: "/employment-insurance-policies/{InsurancePolicyId}",
    family: "Data sharing",
    title: "Get an Employment Insurance Policy",
    chargeable: true
  },
  {
    docPath: "tech/tpp-standards/v2.1/insurance/data-sharing/open-api/health-insurance-policies",
    method: "GET",
    path: "/health-insurance-policies",
    family: "Data sharing",
    title: "Get Health Insurance Policies",
    chargeable: true
  },
  {
    docPath: "tech/tpp-standards/v2.1/insurance/data-sharing/open-api/health-insurance-policies-InsurancePolicyId",
    method: "GET",
    path: "/health-insurance-policies/{InsurancePolicyId}",
    family: "Data sharing",
    title: "Get a Health Insurance Policy",
    chargeable: true
  },
  {
    docPath: "tech/tpp-standards/v2.1/insurance/data-sharing/open-api/home-insurance-policies",
    method: "GET",
    path: "/home-insurance-policies",
    family: "Data sharing",
    title: "Get Home Insurance Policies",
    chargeable: true
  },
  {
    docPath: "tech/tpp-standards/v2.1/insurance/data-sharing/open-api/home-insurance-policies-InsurancePolicyId",
    method: "GET",
    path: "/home-insurance-policies/{InsurancePolicyId}",
    family: "Data sharing",
    title: "Get a Home Insurance Policy",
    chargeable: true
  },
  {
    docPath: "tech/tpp-standards/v2.1/insurance/data-sharing/open-api/life-insurance-policies",
    method: "GET",
    path: "/life-insurance-policies",
    family: "Data sharing",
    title: "Get Life Insurance Policies",
    chargeable: true
  },
  {
    docPath: "tech/tpp-standards/v2.1/insurance/data-sharing/open-api/life-insurance-policies-InsurancePolicyId",
    method: "GET",
    path: "/life-insurance-policies/{InsurancePolicyId}",
    family: "Data sharing",
    title: "Get a Life Insurance Policy",
    chargeable: true
  },
  {
    docPath: "tech/tpp-standards/v2.1/insurance/data-sharing/open-api/motor-insurance-policies",
    method: "GET",
    path: "/motor-insurance-policies",
    family: "Data sharing",
    title: "Get Motor Insurance Policies",
    chargeable: true
  },
  {
    docPath: "tech/tpp-standards/v2.1/insurance/data-sharing/open-api/motor-insurance-policies-InsurancePolicyId",
    method: "GET",
    path: "/motor-insurance-policies/{InsurancePolicyId}",
    family: "Data sharing",
    title: "Get a Motor Insurance Policy",
    chargeable: true
  },
  {
    docPath: "tech/tpp-standards/v2.1/insurance/data-sharing/open-api/renters-insurance-policies",
    method: "GET",
    path: "/renters-insurance-policies",
    family: "Data sharing",
    title: "Get Renters Insurance Policies",
    chargeable: true
  },
  {
    docPath: "tech/tpp-standards/v2.1/insurance/data-sharing/open-api/renters-insurance-policies-InsurancePolicyId",
    method: "GET",
    path: "/renters-insurance-policies/{InsurancePolicyId}",
    family: "Data sharing",
    title: "Get a Renters Insurance Policy",
    chargeable: true
  },
  {
    docPath: "tech/tpp-standards/v2.1/insurance/data-sharing/open-api/travel-insurance-policies",
    method: "GET",
    path: "/travel-insurance-policies",
    family: "Data sharing",
    title: "Get Travel Insurance Policies",
    chargeable: true
  },
  {
    docPath: "tech/tpp-standards/v2.1/insurance/data-sharing/open-api/travel-insurance-policies-InsurancePolicyId",
    method: "GET",
    path: "/travel-insurance-policies/{InsurancePolicyId}",
    family: "Data sharing",
    title: "Get a Travel Insurance Policy",
    chargeable: true
  },
  // ─── Service initiation — payments ───────────────────────────────────────
  {
    docPath: "tech/tpp-standards/v2.1/banking/service-initiation/open-api/payments",
    method: "POST",
    path: "/payments",
    family: "Service initiation",
    title: "Create a Payment",
    chargeable: true
  },
  {
    docPath: "tech/tpp-standards/v2.1/banking/service-initiation/open-api/payments-idempotency",
    method: "GET",
    path: "/payments",
    family: "Service initiation",
    title: "Get a PaymentId from Idempotency Key",
    chargeable: false
  },
  {
    docPath: "tech/tpp-standards/v2.1/banking/service-initiation/open-api/payments-PaymentId",
    method: "GET",
    path: "/payments/{PaymentId}",
    family: "Service initiation",
    title: "Get a Payment",
    chargeable: false
  },
  {
    docPath: "tech/tpp-standards/v2.1/banking/service-initiation/open-api/payment-consents-ConsentId-refund",
    method: "GET",
    path: "/payment-consents/{ConsentId}/refund",
    family: "Service initiation",
    title: "Get Account Details for a Refund",
    chargeable: true
  },
  // ─── Quotes — Open Insurance (7 sectors × 4 endpoints) ──────────────────
  // POST quote, PATCH quote, POST policy are chargeable per the Commercial
  // and Pricing Model §5.6. GET quote-by-id is not chargeable per §6.
  // API Hub fee is tiered (5 / 7.5 / 10 / 12.5 fils) by entity count.
  {
    docPath: "tech/tpp-standards/v2.1/insurance/quotation/open-api/employment-insurance-quotes",
    method: "POST",
    path: "/employment-insurance-quotes",
    family: "Quotes",
    title: "Create an Employment Insurance Quote",
    chargeable: true
  },
  {
    docPath: "tech/tpp-standards/v2.1/insurance/quotation/open-api/get-employment-insurance-quotes-QuoteId",
    method: "GET",
    path: "/employment-insurance-quotes/{QuoteId}",
    family: "Quotes",
    title: "Retrieve an Employment Insurance Quote",
    chargeable: false
  },
  {
    docPath: "tech/tpp-standards/v2.1/insurance/quotation/open-api/patch-employment-insurance-quotes-QuoteId",
    method: "PATCH",
    path: "/employment-insurance-quotes/{QuoteId}",
    family: "Quotes",
    title: "Accept an Employment Insurance Quote",
    chargeable: true
  },
  {
    docPath: "tech/tpp-standards/v2.1/insurance/quotation/open-api/post-employment-insurance-policies",
    method: "POST",
    path: "/employment-insurance-policies",
    family: "Quotes",
    title: "Create an Employment Insurance Policy",
    chargeable: true
  },
  {
    docPath: "tech/tpp-standards/v2.1/insurance/quotation/open-api/health-insurance-quotes",
    method: "POST",
    path: "/health-insurance-quotes",
    family: "Quotes",
    title: "Create a Health Insurance Quote",
    chargeable: true
  },
  {
    docPath: "tech/tpp-standards/v2.1/insurance/quotation/open-api/get-health-insurance-quotes-QuoteId",
    method: "GET",
    path: "/health-insurance-quotes/{QuoteId}",
    family: "Quotes",
    title: "Retrieve a Health Insurance Quote",
    chargeable: false
  },
  {
    docPath: "tech/tpp-standards/v2.1/insurance/quotation/open-api/patch-health-insurance-quotes-QuoteId",
    method: "PATCH",
    path: "/health-insurance-quotes/{QuoteId}",
    family: "Quotes",
    title: "Accept a Health Insurance Quote",
    chargeable: true
  },
  {
    docPath: "tech/tpp-standards/v2.1/insurance/quotation/open-api/post-health-insurance-policies",
    method: "POST",
    path: "/health-insurance-policies",
    family: "Quotes",
    title: "Create a Health Insurance Policy",
    chargeable: true
  },
  {
    docPath: "tech/tpp-standards/v2.1/insurance/quotation/open-api/home-insurance-quotes",
    method: "POST",
    path: "/home-insurance-quotes",
    family: "Quotes",
    title: "Create a Home Insurance Quote",
    chargeable: true
  },
  {
    docPath: "tech/tpp-standards/v2.1/insurance/quotation/open-api/get-home-insurance-quotes-QuoteId",
    method: "GET",
    path: "/home-insurance-quotes/{QuoteId}",
    family: "Quotes",
    title: "Retrieve a Home Insurance Quote",
    chargeable: false
  },
  {
    docPath: "tech/tpp-standards/v2.1/insurance/quotation/open-api/patch-home-insurance-quotes-QuoteId",
    method: "PATCH",
    path: "/home-insurance-quotes/{QuoteId}",
    family: "Quotes",
    title: "Accept a Home Insurance Quote",
    chargeable: true
  },
  {
    docPath: "tech/tpp-standards/v2.1/insurance/quotation/open-api/post-home-insurance-policies",
    method: "POST",
    path: "/home-insurance-policies",
    family: "Quotes",
    title: "Create a Home Insurance Policy",
    chargeable: true
  },
  {
    docPath: "tech/tpp-standards/v2.1/insurance/quotation/open-api/life-insurance-quotes",
    method: "POST",
    path: "/life-insurance-quotes",
    family: "Quotes",
    title: "Create a Life Insurance Quote",
    chargeable: true
  },
  {
    docPath: "tech/tpp-standards/v2.1/insurance/quotation/open-api/get-life-insurance-quotes-QuoteId",
    method: "GET",
    path: "/life-insurance-quotes/{QuoteId}",
    family: "Quotes",
    title: "Retrieve a Life Insurance Quote",
    chargeable: false
  },
  {
    docPath: "tech/tpp-standards/v2.1/insurance/quotation/open-api/patch-life-insurance-quotes-QuoteId",
    method: "PATCH",
    path: "/life-insurance-quotes/{QuoteId}",
    family: "Quotes",
    title: "Accept a Life Insurance Quote",
    chargeable: true
  },
  {
    docPath: "tech/tpp-standards/v2.1/insurance/quotation/open-api/post-life-insurance-policies",
    method: "POST",
    path: "/life-insurance-policies",
    family: "Quotes",
    title: "Create a Life Insurance Policy",
    chargeable: true
  },
  {
    docPath: "tech/tpp-standards/v2.1/insurance/quotation/open-api/motor-insurance-quotes",
    method: "POST",
    path: "/motor-insurance-quotes",
    family: "Quotes",
    title: "Create a Motor Insurance Quote",
    chargeable: true
  },
  {
    docPath: "tech/tpp-standards/v2.1/insurance/quotation/open-api/get-motor-insurance-quotes-QuoteId",
    method: "GET",
    path: "/motor-insurance-quotes/{QuoteId}",
    family: "Quotes",
    title: "Retrieve a Motor Insurance Quote",
    chargeable: false
  },
  {
    docPath: "tech/tpp-standards/v2.1/insurance/quotation/open-api/patch-motor-insurance-quotes-QuoteId",
    method: "PATCH",
    path: "/motor-insurance-quotes/{QuoteId}",
    family: "Quotes",
    title: "Accept a Motor Insurance Quote",
    chargeable: true
  },
  {
    docPath: "tech/tpp-standards/v2.1/insurance/quotation/open-api/post-motor-insurance-policies",
    method: "POST",
    path: "/motor-insurance-policies",
    family: "Quotes",
    title: "Create a Motor Insurance Policy",
    chargeable: true
  },
  {
    docPath: "tech/tpp-standards/v2.1/insurance/quotation/open-api/renters-insurance-quotes",
    method: "POST",
    path: "/renters-insurance-quotes",
    family: "Quotes",
    title: "Create a Renters Insurance Quote",
    chargeable: true
  },
  {
    docPath: "tech/tpp-standards/v2.1/insurance/quotation/open-api/get-renters-insurance-quotes-QuoteId",
    method: "GET",
    path: "/renters-insurance-quotes/{QuoteId}",
    family: "Quotes",
    title: "Retrieve a Renters Insurance Quote",
    chargeable: false
  },
  {
    docPath: "tech/tpp-standards/v2.1/insurance/quotation/open-api/patch-renters-insurance-quotes-QuoteId",
    method: "PATCH",
    path: "/renters-insurance-quotes/{QuoteId}",
    family: "Quotes",
    title: "Accept a Renters Insurance Quote",
    chargeable: true
  },
  {
    docPath: "tech/tpp-standards/v2.1/insurance/quotation/open-api/post-renters-insurance-policies",
    method: "POST",
    path: "/renters-insurance-policies",
    family: "Quotes",
    title: "Create a Renters Insurance Policy",
    chargeable: true
  },
  {
    docPath: "tech/tpp-standards/v2.1/insurance/quotation/open-api/travel-insurance-quotes",
    method: "POST",
    path: "/travel-insurance-quotes",
    family: "Quotes",
    title: "Create a Travel Insurance Quote",
    chargeable: true
  },
  {
    docPath: "tech/tpp-standards/v2.1/insurance/quotation/open-api/get-travel-insurance-quotes-QuoteId",
    method: "GET",
    path: "/travel-insurance-quotes/{QuoteId}",
    family: "Quotes",
    title: "Retrieve a Travel Insurance Quote",
    chargeable: false
  },
  {
    docPath: "tech/tpp-standards/v2.1/insurance/quotation/open-api/patch-travel-insurance-quotes-QuoteId",
    method: "PATCH",
    path: "/travel-insurance-quotes/{QuoteId}",
    family: "Quotes",
    title: "Accept a Travel Insurance Quote",
    chargeable: true
  },
  {
    docPath: "tech/tpp-standards/v2.1/insurance/quotation/open-api/post-travel-insurance-policies",
    method: "POST",
    path: "/travel-insurance-policies",
    family: "Quotes",
    title: "Create a Travel Insurance Policy",
    chargeable: true
  },
  // ─── Confirmation of Payee ───────────────────────────────────────────────
  {
    docPath: "tech/tpp-standards/v2.1/banking/confirmation-of-payee/open-api/confirmation",
    method: "POST",
    path: "/confirmation",
    family: "Confirmation of Payee",
    title: "Confirm the IBAN matches the Name on the Account",
    chargeable: true,
    discountable: true
  },
  {
    docPath: "tech/tpp-standards/v2.1/banking/confirmation-of-payee/open-api/discovery",
    method: "POST",
    path: "/discovery",
    family: "Confirmation of Payee",
    title: "Discover the LFI that will confirm the payee",
    chargeable: false
  },
  // ─── ATMs, products, leads ───────────────────────────────────────────────
  {
    docPath: "tech/tpp-standards/v2.1/banking/atms/open-api/atms",
    method: "GET",
    path: "/atms",
    family: "ATMs, products, leads",
    title: "Retrieve ATMs",
    chargeable: false
  },
  {
    docPath: "tech/tpp-standards/v2.1/banking/products-leads/open-api/products",
    method: "GET",
    path: "/products",
    family: "ATMs, products, leads",
    title: "Retrieve publicly available banking products",
    chargeable: false
  },
  {
    docPath: "tech/tpp-standards/v2.1/banking/products-leads/open-api/leads",
    method: "POST",
    path: "/leads",
    family: "ATMs, products, leads",
    title: "Provide user lead details",
    chargeable: false
  },
  // ─── Onboarding & directory ──────────────────────────────────────────────
  {
    docPath: "tech/tpp-standards/registration/open-api/tpp-registration",
    method: "POST",
    path: "/tpp-registration",
    family: "Onboarding & directory",
    title: "Post Registration to Request Onboarding to an LFI",
    chargeable: false
  },
  {
    docPath: "tech/tpp-standards/trust-framework/open-api/participants",
    method: "GET",
    path: "/participants",
    family: "Onboarding & directory",
    title: "Retrieve all Open Finance Servers and API Resources",
    chargeable: false
  }
];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const FAMILY_ORDER = [
      "Consent & authorization",
      "Data sharing",
      "Service initiation",
      "Quotes",
      "Confirmation of Payee",
      "ATMs, products, leads",
      "Onboarding & directory"
    ];
    const query = ref("");
    const filter = ref("all");
    const totalChargeable = ENDPOINT_PRICING.filter((e) => e.chargeable).length;
    const totalFree = ENDPOINT_PRICING.length - totalChargeable;
    const filterOptions = computed(() => [
      { value: "all", label: "All", count: ENDPOINT_PRICING.length },
      { value: "chargeable", label: "Chargeable", count: totalChargeable },
      { value: "free", label: "Not chargeable", count: totalFree }
    ]);
    const visibleEndpoints = computed(() => {
      const q = query.value.trim().toLowerCase();
      return ENDPOINT_PRICING.filter((endpoint) => {
        if (filter.value === "chargeable" && !endpoint.chargeable) return false;
        if (filter.value === "free" && endpoint.chargeable) return false;
        if (!q) return true;
        return endpoint.path.toLowerCase().includes(q) || endpoint.title.toLowerCase().includes(q) || endpoint.method.toLowerCase().includes(q);
      });
    });
    const groupedEndpoints = computed(() => {
      const groups = /* @__PURE__ */ new Map();
      for (const endpoint of visibleEndpoints.value) {
        const existing = groups.get(endpoint.family);
        if (existing) {
          existing.push(endpoint);
        } else {
          groups.set(endpoint.family, [endpoint]);
        }
      }
      return [...groups.entries()].sort((a, b) => FAMILY_ORDER.indexOf(a[0]) - FAMILY_ORDER.indexOf(b[0])).map(([family, endpoints]) => ({
        family,
        endpoints: endpoints.slice().sort((a, b) => a.path.localeCompare(b.path)),
        chargeableCount: endpoints.filter((e) => e.chargeable).length
      }));
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-cep" }, _attrs))} data-v-3ad63eb7><section class="ed-cep-hero" data-v-3ad63eb7><div class="ed-cep-hero__inner" data-v-3ad63eb7><div class="ed-cep-hero__label" data-v-3ad63eb7><span class="ed-cep-hero__label-dash" data-v-3ad63eb7></span> AlTareq · Chargeable endpoints </div><h1 class="ed-cep-hero__title" data-v-3ad63eb7>Which endpoints are chargeable?</h1><p class="ed-cep-hero__sub" data-v-3ad63eb7> Every TPP‑callable endpoint in the UAE Open Finance standards is listed below with its API Hub fee status. Chargeable endpoints attract the per‑call API Hub fee defined in <a href="/pricing/#nebras-api-fees" data-v-3ad63eb7>Fee 01</a>; non‑chargeable endpoints are served at no API Hub fee. A small number are discounted to <strong data-v-3ad63eb7>0.5 fils</strong> when paired with a payment within two hours. </p><p class="ed-cep-hero__back" data-v-3ad63eb7><a href="/pricing/" data-v-3ad63eb7>← Back to pricing</a></p></div></section><section class="ed-cep-section" data-v-3ad63eb7><div class="ed-cep-section__inner" data-v-3ad63eb7><div class="ed-cep-controls" data-v-3ad63eb7><div class="ed-cep-controls__search" data-v-3ad63eb7><input${ssrRenderAttr("value", unref(query))} type="search" placeholder="Search by path, title or method" class="ed-cep-controls__input" aria-label="Search endpoints" data-v-3ad63eb7></div><div class="ed-cep-controls__filters" role="tablist" data-v-3ad63eb7><!--[-->`);
      ssrRenderList(unref(filterOptions), (option) => {
        _push(`<button type="button" class="${ssrRenderClass([{ "is-active": unref(filter) === option.value }, "ed-cep-pill"])}"${ssrRenderAttr("aria-pressed", unref(filter) === option.value)} data-v-3ad63eb7>${ssrInterpolate(option.label)} <span class="ed-cep-pill__count" data-v-3ad63eb7>${ssrInterpolate(option.count)}</span></button>`);
      });
      _push(`<!--]--></div></div>`);
      if (unref(visibleEndpoints).length === 0) {
        _push(`<div class="ed-cep-empty" data-v-3ad63eb7> No endpoints match the current filter. </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(unref(groupedEndpoints), (group) => {
        _push(`<div class="ed-cep-group" data-v-3ad63eb7><div class="ed-cep-group__head" data-v-3ad63eb7><span class="ed-cep-group__name" data-v-3ad63eb7>${ssrInterpolate(group.family)}</span><span class="ed-cep-group__meta" data-v-3ad63eb7>${ssrInterpolate(group.chargeableCount)} chargeable · ${ssrInterpolate(group.endpoints.length - group.chargeableCount)} not chargeable </span></div><div class="ed-cep-table" data-v-3ad63eb7><div class="ed-cep-table__head" data-v-3ad63eb7><span data-v-3ad63eb7>Method</span><span data-v-3ad63eb7>Endpoint</span><span data-v-3ad63eb7>Status</span></div><!--[-->`);
        ssrRenderList(group.endpoints, (endpoint) => {
          _push(`<a${ssrRenderAttr("href", `/${endpoint.docPath}`)} class="ed-cep-table__row" data-v-3ad63eb7><span class="${ssrRenderClass([`is-${endpoint.method.toLowerCase()}`, "ed-cep-method"])}" data-v-3ad63eb7>${ssrInterpolate(endpoint.method)}</span><span class="ed-cep-endpoint" data-v-3ad63eb7><code data-v-3ad63eb7>${ssrInterpolate(endpoint.path)}</code><span class="ed-cep-endpoint__title" data-v-3ad63eb7>${ssrInterpolate(endpoint.title)}</span></span><span class="ed-cep-status" data-v-3ad63eb7><span class="${ssrRenderClass([endpoint.chargeable ? "is-chargeable" : "is-free", "ed-cep-status__pill"])}" data-v-3ad63eb7>${ssrInterpolate(endpoint.chargeable ? "Chargeable" : "Not chargeable")}</span>`);
          if (endpoint.discountable) {
            _push(`<span class="ed-cep-status__note" data-v-3ad63eb7> 0.5 fils when paired with a payment </span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</span></a>`);
        });
        _push(`<!--]--></div></div>`);
      });
      _push(`<!--]--></div></section></div>`);
    };
  }
});
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/pricing/endpoints/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3ad63eb7"]]);
export {
  index as default
};
