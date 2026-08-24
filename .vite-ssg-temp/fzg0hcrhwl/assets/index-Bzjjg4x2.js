import { defineComponent, reactive, computed, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrRenderStyle, ssrInterpolate, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const FILS_PER_AED$1 = 100;
function yearVal(schedule, year) {
  const idx = Math.max(0, Math.min(schedule.length - 1, (year || 1) - 1));
  return schedule[idx] ?? 0;
}
const MERCHANT_BPS_SCHEDULE = [38, 35, 32, 29, 25];
const FLOWS = {
  consumer_p2p: {
    id: "consumer_p2p",
    label: "Transfer (P2P)",
    segment: "retail-sme",
    kind: "payment",
    unit: "transfers / month",
    perTxnFils: () => 25
  },
  me_to_me: {
    id: "me_to_me",
    label: "Me-to-Me payment",
    segment: "retail-sme",
    kind: "payment",
    unit: "payments / month",
    yearStep: { years: [1, 2, 3], schedule: [20, 18, 17] },
    perTxnFils: ({ year }) => yearVal([20, 18, 17], year)
  },
  merchant_collect_rsme: {
    id: "merchant_collect_rsme",
    label: "Merchant Collections (Retail/SME)",
    segment: "retail-sme",
    kind: "payment",
    unit: "transactions / month",
    needsAmount: true,
    yearStep: { years: [1, 2, 3, 4, 5], schedule: MERCHANT_BPS_SCHEDULE },
    perTxnFils: ({ year, avgAmountAED }) => {
      const bps = yearVal(MERCHANT_BPS_SCHEDULE, year);
      const txnFils = (avgAmountAED || 0) * (bps / 1e4) * FILS_PER_AED$1;
      const capFils = 50 * FILS_PER_AED$1;
      return Math.min(txnFils, capFils);
    }
  },
  large_value: {
    id: "large_value",
    label: "Large Value / Rent / Invoice Collection",
    segment: "any",
    kind: "payment",
    unit: "collections / month",
    perTxnFils: () => 4 * FILS_PER_AED$1
  },
  data_sharing: {
    id: "data_sharing",
    label: "Data Sharing",
    segment: "retail-sme",
    kind: "data",
    unit: "customers"
  }
};
const FLOW_LIST = Object.values(FLOWS);
const PRESETS = [
  {
    id: "p2p_at_scale",
    label: "Transfer (P2P) at scale",
    blurb: "50,000 transfers per month",
    inputs: {
      flowId: "consumer_p2p",
      monthlyVolume: 5e4,
      pairWithCoP: false
    }
  },
  {
    id: "merchant_retail",
    label: "Retail merchant collections",
    blurb: "5,000 collections / month at AED 80, Year 1",
    inputs: {
      flowId: "merchant_collect_rsme",
      monthlyVolume: 5e3,
      avgAmountAED: 80,
      year: 1,
      pairWithCoP: false
    }
  },
  {
    id: "data_app",
    label: "Data-sharing app",
    blurb: "2,500 customers, 50 requests / month each, within free threshold",
    inputs: {
      flowId: "data_sharing",
      customers: 2500,
      monthlyRequests: 50,
      hasBillableRequests: false,
      billableRequests: 0,
      lfiOverageAED: 0
    }
  },
  {
    id: "invoice_collect",
    label: "Rent / invoice collection",
    blurb: "500 invoice collections per month",
    inputs: {
      flowId: "large_value",
      monthlyVolume: 500
    }
  }
];
const FILS_PER_AED = 100;
const NEBRAS_FIL_PER_CALL = 2.5;
const NEBRAS_FIL_DISCOUNTED = 0.5;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const firstPreset = PRESETS[0];
    const inputs = reactive({
      flowId: firstPreset.inputs.flowId,
      monthlyVolume: 0,
      avgAmountAED: 0,
      year: 1,
      pairWithCoP: false,
      customers: 0,
      monthlyRequests: 0,
      hasBillableRequests: false,
      billableRequests: 0,
      lfiOverageAED: 0
    });
    function applyPreset(preset) {
      Object.assign(inputs, preset.inputs);
    }
    applyPreset(firstPreset);
    const currentFlow = computed(() => {
      const f = FLOWS[inputs.flowId];
      return f ?? FLOW_LIST[0];
    });
    const activePresetId = computed(() => {
      for (const p of PRESETS) {
        let match = true;
        for (const k of Object.keys(p.inputs)) {
          if (p.inputs[k] !== inputs[k]) {
            match = false;
            break;
          }
        }
        if (match) return p.id;
      }
      return null;
    });
    const result = computed(() => {
      const flow = currentFlow.value;
      if (!flow) return null;
      return flow.kind === "data" ? computeDataFlow(flow, inputs) : computePaymentFlow(flow, inputs);
    });
    const totals = computed(() => {
      const r = result.value;
      if (!r) return { nebrasAED: 0, lfiAED: 0, overageAED: 0, monthlyAED: 0, yearlyAED: 0 };
      const nebrasAED = r.nebrasFils / FILS_PER_AED;
      const lfiAED = r.lfiFils / FILS_PER_AED;
      const overageAED = r.overageFils / FILS_PER_AED;
      const monthlyAED = nebrasAED + lfiAED + overageAED;
      return { nebrasAED, lfiAED, overageAED, monthlyAED, yearlyAED: monthlyAED * 12 };
    });
    function computePaymentFlow(flow, i) {
      const volume = Math.max(0, i.monthlyVolume || 0);
      const perTxnFils = flow.perTxnFils ? flow.perTxnFils(i) : 0;
      const lfiFils = perTxnFils * volume;
      const nebrasFils = volume * NEBRAS_FIL_PER_CALL + (i.pairWithCoP ? volume * NEBRAS_FIL_DISCOUNTED : 0);
      const assumptions = [];
      assumptions.push(`Each payment is one chargeable Nebras call at ${NEBRAS_FIL_PER_CALL} fils.`);
      if (flow.needsAmount && flow.yearStep) {
        const schedule = flow.yearStep.schedule;
        const idx = Math.min(schedule.length - 1, (i.year || 1) - 1);
        const bps = schedule[idx] ?? 0;
        const txnAED = perTxnFils / FILS_PER_AED;
        if (txnAED >= 50) {
          assumptions.push(`Year ${i.year} rate of ${bps} bps × AED ${i.avgAmountAED} hits the AED 50 per-transaction cap.`);
        } else {
          assumptions.push(`Year ${i.year} rate of ${bps} bps × AED ${i.avgAmountAED} = AED ${txnAED.toFixed(2)} per transaction.`);
        }
      } else if (flow.yearStep) {
        assumptions.push(`Year ${i.year} per-transaction rate: ${perTxnFils} fils.`);
      } else if (perTxnFils >= FILS_PER_AED) {
        assumptions.push(`Per-transaction LFI fee: AED ${(perTxnFils / FILS_PER_AED).toFixed(2)}.`);
      } else {
        assumptions.push(`Per-transaction LFI fee: ${perTxnFils} fils.`);
      }
      if (i.pairWithCoP) {
        assumptions.push(`Each payment is paired with one Confirmation of Payee call at the discounted ${NEBRAS_FIL_DISCOUNTED} fils rate.`);
      }
      return { nebrasFils, lfiFils, overageFils: 0, assumptions, lfiKind: "payment" };
    }
    function computeDataFlow(_flow, i) {
      const customers = Math.max(0, i.customers || 0);
      const monthlyRequests = Math.max(0, i.monthlyRequests || 0);
      const totalRequests = customers * monthlyRequests;
      const billable = i.hasBillableRequests ? Math.max(0, i.billableRequests || 0) : 0;
      const totalBillable = customers * billable;
      const overageAED = totalBillable * (i.lfiOverageAED || 0);
      const overageFils = overageAED * FILS_PER_AED;
      const nebrasFils = totalRequests * NEBRAS_FIL_PER_CALL;
      const assumptions = [];
      assumptions.push(`Each request is one Nebras-chargeable call at ${NEBRAS_FIL_PER_CALL} fils.`);
      if (i.hasBillableRequests && billable > 0) {
        assumptions.push(`${billable} request${billable === 1 ? "" : "s"} per customer per month exceed the daily free threshold (5 unattended / 15 attended pages).`);
        if ((i.lfiOverageAED || 0) > 0) {
          assumptions.push(`Charged at AED ${(i.lfiOverageAED || 0).toFixed(2)} per call by the LFI.`);
        } else {
          assumptions.push(`No LFI overage rate set — overage is currently free.`);
        }
      } else {
        assumptions.push(`All requests stay within the daily free threshold (5 unattended / 15 attended pages per customer).`);
      }
      return { nebrasFils, lfiFils: 0, overageFils, assumptions, lfiKind: "data" };
    }
    function formatAED(n) {
      if (!Number.isFinite(n)) return "—";
      return new Intl.NumberFormat("en-AE", {
        style: "currency",
        currency: "AED",
        maximumFractionDigits: 2
      }).format(n);
    }
    const feeStreams = [
      {
        index: "01",
        category: "TPP → Nebras",
        color: "var(--at-teal)",
        title: "API Hub fees",
        desc: "A per-call fee paid by the TPP to Nebras for every chargeable API served through the API Hub.",
        headline: "2.5 fils / call &mdash; <span>most APIs</span>",
        anchor: "#nebras-api-fees"
      },
      {
        index: "02",
        category: "TPP → LFI",
        color: "var(--at-blue-deep)",
        title: "Payment fees",
        desc: "Paid by the TPP to the LFI that executes a payment, capped by segment and payment context.",
        headline: "from 25 fils / txn &mdash; <span>Transfer (P2P)</span>",
        anchor: "#lfi-payment-fees"
      },
      {
        index: "03",
        category: "TPP → LFI",
        color: "var(--at-gold)",
        title: "Data sharing above threshold",
        desc: "Free up to a per-customer daily threshold. Above that, the LFI charges the TPP for continued retrieval.",
        headline: "0 &rarr; LFI&#8209;set &mdash; <span>above 15 pages/day</span>",
        anchor: "#lfi-data-fees"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-pr" }, _attrs))} data-v-d4dbf214><section class="ed-pr-hero" data-v-d4dbf214><div class="ed-pr-hero__inner" data-v-d4dbf214><div class="ed-pr-hero__label" data-v-d4dbf214><span class="ed-pr-hero__label-dash" data-v-d4dbf214></span> AlTareq · Commercial and Pricing Model </div><h1 class="ed-pr-hero__title" data-v-d4dbf214>Pricing</h1><p class="ed-pr-hero__sub" data-v-d4dbf214> Pricing in UAE Open Finance is built on three clear streams: API Hub fees from Nebras for use of the platform, payment fees from the LFI that executes each transaction, and data‑sharing fees from the LFI once a customer’s usage passes a generous free threshold. This page walks through how each one is calculated. </p><div class="ed-pr-hero__scope" data-v-d4dbf214><div class="ed-pr-hero__scope-row" data-v-d4dbf214><span class="ed-pr-hero__scope-tag ed-pr-hero__scope-tag--in" data-v-d4dbf214>In scope</span><span class="ed-pr-hero__scope-desc" data-v-d4dbf214> The three fee streams a TPP will encounter when operating in the ecosystem — Nebras API Hub fees, LFI payment fees, and LFI data‑sharing fees above the free threshold. </span></div><div class="ed-pr-hero__scope-row" data-v-d4dbf214><span class="ed-pr-hero__scope-tag ed-pr-hero__scope-tag--out" data-v-d4dbf214>Not covered here</span><span class="ed-pr-hero__scope-desc" data-v-d4dbf214> End‑user pricing (what a TPP may charge its own customers), LFI‑to‑TPP commissions on referred business, and any CBUAE license fees. These are governed elsewhere in the AlTareq Standards. </span></div></div></div></section><section class="ed-pr-overview" data-v-d4dbf214><div class="ed-pr-overview__inner" data-v-d4dbf214><div class="ed-pr-overview__head" data-v-d4dbf214><div class="ed-pr-overview__eyebrow" data-v-d4dbf214><span class="ed-pr-overview__eyebrow-dash" data-v-d4dbf214></span> The three fees </div><h2 class="ed-pr-overview__title" data-v-d4dbf214>How the fee structure works</h2><p class="ed-pr-overview__lede" data-v-d4dbf214> Fees only apply to <strong data-v-d4dbf214>technically successful</strong> API calls. The three streams stack: a single consumer payment through Open Finance will typically attract a Nebras API fee <em data-v-d4dbf214>and</em> a payment fee to the LFI executing it. </p></div><div class="ed-pr-overview__grid" data-v-d4dbf214><!--[-->`);
      ssrRenderList(feeStreams, (fee) => {
        _push(`<a${ssrRenderAttr("href", fee.anchor)} class="ed-pr-overview__card" style="${ssrRenderStyle({ "--card-color": fee.color })}" data-v-d4dbf214><span class="ed-pr-overview__card-top" style="${ssrRenderStyle({ background: fee.color })}" data-v-d4dbf214></span><div class="ed-pr-overview__card-meta" data-v-d4dbf214><span class="ed-pr-overview__card-index" data-v-d4dbf214>${ssrInterpolate(fee.index)}</span><span class="ed-pr-overview__card-cat" style="${ssrRenderStyle({ color: fee.color })}" data-v-d4dbf214>${ssrInterpolate(fee.category)}</span></div><h3 class="ed-pr-overview__card-title" data-v-d4dbf214>${ssrInterpolate(fee.title)}</h3><p class="ed-pr-overview__card-desc" data-v-d4dbf214>${ssrInterpolate(fee.desc)}</p><div class="ed-pr-overview__card-headline" data-v-d4dbf214><span class="ed-pr-overview__card-headline-label" data-v-d4dbf214>Headline rate</span><span class="ed-pr-overview__card-headline-value" data-v-d4dbf214>${fee.headline ?? ""}</span></div><div class="ed-pr-overview__card-foot" data-v-d4dbf214><span class="ed-pr-overview__card-cta" data-v-d4dbf214>See the detail</span><span class="ed-pr-overview__card-arrow" style="${ssrRenderStyle({ color: fee.color })}" data-v-d4dbf214>↓</span></div></a>`);
      });
      _push(`<!--]--></div></div></section><section id="nebras-api-fees" class="ed-pr-detail ed-pr-detail--hub" data-v-d4dbf214><div class="ed-pr-detail__inner" data-v-d4dbf214><div class="ed-pr-detail__head" data-v-d4dbf214><div class="ed-pr-detail__eyebrow" data-v-d4dbf214><span class="ed-pr-detail__eyebrow-dash" data-v-d4dbf214></span> Fee 01 · TPP → Nebras </div><h2 class="ed-pr-detail__title" data-v-d4dbf214>API Hub fees</h2><p class="ed-pr-detail__lede" data-v-d4dbf214> Nebras charges TPPs a flat per‑call fee for chargeable APIs served through the API Hub. Only endpoints that <strong data-v-d4dbf214>pull data from an LFI</strong> or <strong data-v-d4dbf214>instruct a payment</strong> are chargeable. Everything else — raising or checking a consent, authentication, discovery, and reference‑data lookups — is free. </p></div><div class="ed-pr-rate-table" data-v-d4dbf214><div class="ed-pr-rate-table__head" data-v-d4dbf214><span data-v-d4dbf214>Chargeability</span><span data-v-d4dbf214>Rate per successful call</span></div><div class="ed-pr-rate-table__row" data-v-d4dbf214><span class="ed-pr-rate-table__label" data-v-d4dbf214>Chargeable</span><span class="ed-pr-rate-table__value" data-v-d4dbf214>2.5 fils</span></div><div class="ed-pr-rate-table__row" data-v-d4dbf214><span class="ed-pr-rate-table__label" data-v-d4dbf214>Not chargeable</span><span class="ed-pr-rate-table__value" data-v-d4dbf214>Free</span></div></div><div class="ed-pr-detail__note" data-v-d4dbf214><span class="ed-pr-detail__note-tag" data-v-d4dbf214>Payment‑paired discount</span><span class="ed-pr-detail__note-body" data-v-d4dbf214><strong data-v-d4dbf214>Balance</strong> and <strong data-v-d4dbf214>Confirmation of Payee</strong> calls are billed at <strong data-v-d4dbf214>0.5 fils</strong> instead of 2.5 fils when made within <strong data-v-d4dbf214>2 hours</strong> of a payment. One payment discounts only one Balance call and one CoP call. </span></div><div class="ed-pr-detail__note" data-v-d4dbf214><span class="ed-pr-detail__note-tag" data-v-d4dbf214>Insurance Quotes tier</span><span class="ed-pr-detail__note-body" data-v-d4dbf214><strong data-v-d4dbf214>Insurance Quote</strong> calls (<code data-v-d4dbf214>POST /{sector}-insurance-quotes</code>) are billed by the number of LFIs that returned a quote, not at the flat 2.5 fils rate: <span class="ed-pr-quotes-tier" data-v-d4dbf214><span data-v-d4dbf214><strong data-v-d4dbf214>5 fils</strong> — up to 4 LFIs</span><span data-v-d4dbf214><strong data-v-d4dbf214>7.5 fils</strong> — up to 10 LFIs</span><span data-v-d4dbf214><strong data-v-d4dbf214>10 fils</strong> — up to 25 LFIs</span><span data-v-d4dbf214><strong data-v-d4dbf214>12.5 fils</strong> — more than 25 LFIs</span></span><code data-v-d4dbf214>PATCH /{sector}-insurance-quotes/{QuoteId}</code> (accept, submit KYC) and <code data-v-d4dbf214>POST /{sector}-insurance-policies</code> are billed at the flat 2.5 fils rate. <code data-v-d4dbf214>GET /{sector}-insurance-quotes/{QuoteId}</code> is free. </span></div><p class="ed-pr-detail__footnote" data-v-d4dbf214><a href="/pricing/endpoints/" data-v-d4dbf214>See the full list of chargeable endpoints →</a></p></div></section><section id="lfi-payment-fees" class="ed-pr-detail ed-pr-detail--payments" data-v-d4dbf214><div class="ed-pr-detail__inner" data-v-d4dbf214><div class="ed-pr-detail__head" data-v-d4dbf214><div class="ed-pr-detail__eyebrow" data-v-d4dbf214><span class="ed-pr-detail__eyebrow-dash" data-v-d4dbf214></span> Fee 02 · TPP → LFI </div><h2 class="ed-pr-detail__title" data-v-d4dbf214>Payment fees</h2><p class="ed-pr-detail__lede" data-v-d4dbf214> When a TPP initiates a successful payment through the API Hub, the LFI that executes the payment charges the TPP a fee. Rates are capped by the AlTareq model and vary by customer segment (Retail/SME vs Corporate) and payment context. Nebras calculates and collects these fees on behalf of LFIs. </p></div><div class="ed-pr-seg" data-v-d4dbf214><div class="ed-pr-seg__head" data-v-d4dbf214><span class="ed-pr-seg__tag" data-v-d4dbf214>Retail &amp; SME</span><span class="ed-pr-seg__hint" data-v-d4dbf214>Caps are binding</span></div><div class="ed-pr-ctx-table" data-v-d4dbf214><div class="ed-pr-ctx-table__head" data-v-d4dbf214><span data-v-d4dbf214>Payment context</span><span data-v-d4dbf214>Cap paid by TPP to LFI</span></div><div class="ed-pr-ctx-table__row" data-v-d4dbf214><div class="ed-pr-ctx-table__label" data-v-d4dbf214><strong data-v-d4dbf214>Merchant Collections</strong><span data-v-d4dbf214>Debit‑card‑equivalent, initiated by the merchant via the TPP.</span></div><div class="ed-pr-ctx-table__value" data-v-d4dbf214><span class="ed-pr-ctx-table__primary" data-v-d4dbf214> 38 bps in Year 1, stepping down to 25 bps by Year 5 </span><span class="ed-pr-ctx-table__schedule" data-v-d4dbf214><span data-v-d4dbf214>Y1 38 bps</span><span data-v-d4dbf214>Y2 35 bps</span><span data-v-d4dbf214>Y3 32 bps</span><span data-v-d4dbf214>Y4 29 bps</span><span data-v-d4dbf214>Y5 25 bps</span></span><span class="ed-pr-ctx-table__secondary" data-v-d4dbf214> Also capped at <strong data-v-d4dbf214>50 AED</strong> per transaction; first <strong data-v-d4dbf214>200 AED</strong> collected per merchant per day is exempt. </span></div></div><div class="ed-pr-ctx-table__row" data-v-d4dbf214><div class="ed-pr-ctx-table__label" data-v-d4dbf214><strong data-v-d4dbf214>Transfer (P2P) &amp; SME‑to‑SME</strong><span data-v-d4dbf214>Outbound payment from the customer’s own account.</span></div><div class="ed-pr-ctx-table__value" data-v-d4dbf214><span class="ed-pr-ctx-table__primary" data-v-d4dbf214>25 fils per transaction</span></div></div><div class="ed-pr-ctx-table__row" data-v-d4dbf214><div class="ed-pr-ctx-table__label" data-v-d4dbf214><strong data-v-d4dbf214>Me‑to‑Me</strong><span data-v-d4dbf214>Outbound payment from a customer’s own account to another of their own.</span></div><div class="ed-pr-ctx-table__value" data-v-d4dbf214><span class="ed-pr-ctx-table__primary" data-v-d4dbf214> 20 fils in Year 1, stepping down to 17 fils by Year 3 </span><span class="ed-pr-ctx-table__schedule" data-v-d4dbf214><span data-v-d4dbf214>Y1 20 fils</span><span data-v-d4dbf214>Y2 18 fils</span><span data-v-d4dbf214>Y3 17 fils</span></span></div></div><div class="ed-pr-ctx-table__row" data-v-d4dbf214><div class="ed-pr-ctx-table__label" data-v-d4dbf214><strong data-v-d4dbf214>Bulk Payment — SME only</strong><span data-v-d4dbf214>Outbound bulk payment initiated by the business.</span></div><div class="ed-pr-ctx-table__value" data-v-d4dbf214><span class="ed-pr-ctx-table__primary" data-v-d4dbf214> 25 fils per transaction, and 250 fils per batch </span><span class="ed-pr-ctx-table__secondary" data-v-d4dbf214> No limit on the number of transactions in a batch. </span></div></div><div class="ed-pr-ctx-table__row" data-v-d4dbf214><div class="ed-pr-ctx-table__label" data-v-d4dbf214><strong data-v-d4dbf214>Large Value / Rent / Invoice Collection</strong><span data-v-d4dbf214>Collected via an embedded payment link in a smart invoice or equivalent.</span></div><div class="ed-pr-ctx-table__value" data-v-d4dbf214><span class="ed-pr-ctx-table__primary" data-v-d4dbf214>4 AED per transaction</span><span class="ed-pr-ctx-table__secondary" data-v-d4dbf214> E.g. rent payments; retail/SME invoices above AED 5,000. </span></div></div></div></div><div class="ed-pr-seg" data-v-d4dbf214><div class="ed-pr-seg__head" data-v-d4dbf214><span class="ed-pr-seg__tag ed-pr-seg__tag--corp" data-v-d4dbf214>Corporate</span><span class="ed-pr-seg__hint" data-v-d4dbf214>Turnover &gt; 100m AED / year</span></div><div class="ed-pr-ctx-table" data-v-d4dbf214><div class="ed-pr-ctx-table__head" data-v-d4dbf214><span data-v-d4dbf214>Payment context</span><span data-v-d4dbf214>Cap paid by TPP to LFI</span></div><div class="ed-pr-ctx-table__row" data-v-d4dbf214><div class="ed-pr-ctx-table__label" data-v-d4dbf214><strong data-v-d4dbf214>Merchant Collections</strong><span data-v-d4dbf214>Initiated by a corporate merchant via the TPP.</span></div><div class="ed-pr-ctx-table__value" data-v-d4dbf214><span class="ed-pr-ctx-table__primary" data-v-d4dbf214> 38 bps in Year 1, stepping down to 25 bps by Year 5 </span><span class="ed-pr-ctx-table__schedule" data-v-d4dbf214><span data-v-d4dbf214>Y1 38 bps</span><span data-v-d4dbf214>Y2 35 bps</span><span data-v-d4dbf214>Y3 32 bps</span><span data-v-d4dbf214>Y4 29 bps</span><span data-v-d4dbf214>Y5 25 bps</span></span><span class="ed-pr-ctx-table__secondary" data-v-d4dbf214> Also capped at <strong data-v-d4dbf214>50 AED</strong> per transaction. </span></div></div><div class="ed-pr-ctx-table__row" data-v-d4dbf214><div class="ed-pr-ctx-table__label" data-v-d4dbf214><strong data-v-d4dbf214>Corporate Payments</strong><span data-v-d4dbf214>Outbound payment from the corporate’s own account. Includes bulk payments.</span></div><div class="ed-pr-ctx-table__value" data-v-d4dbf214><span class="ed-pr-ctx-table__primary" data-v-d4dbf214>250 fils per individual transaction</span></div></div><div class="ed-pr-ctx-table__row" data-v-d4dbf214><div class="ed-pr-ctx-table__label" data-v-d4dbf214><strong data-v-d4dbf214>Large Value / Rent / Invoice Collection</strong><span data-v-d4dbf214>Collected via an embedded payment link in a smart invoice or equivalent.</span></div><div class="ed-pr-ctx-table__value" data-v-d4dbf214><span class="ed-pr-ctx-table__primary" data-v-d4dbf214>4 AED per transaction</span><span class="ed-pr-ctx-table__secondary" data-v-d4dbf214> E.g. rent payments; corporate invoices above AED 5,000. </span></div></div></div></div><p class="ed-pr-detail__footnote" data-v-d4dbf214> These caps apply whether the payment settles through <strong data-v-d4dbf214>Aani Core</strong> or an alternative payment rail. LFIs MUST NOT impose additional charges on end users for payments initiated through Open Finance APIs. </p></div></section><section id="lfi-data-fees" class="ed-pr-detail ed-pr-detail--data" data-v-d4dbf214><div class="ed-pr-detail__inner" data-v-d4dbf214><div class="ed-pr-detail__head" data-v-d4dbf214><div class="ed-pr-detail__eyebrow" data-v-d4dbf214><span class="ed-pr-detail__eyebrow-dash" data-v-d4dbf214></span> Fee 03 · TPP → LFI </div><h2 class="ed-pr-detail__title" data-v-d4dbf214>Data‑sharing fees above threshold</h2><p class="ed-pr-detail__lede" data-v-d4dbf214> Data sharing is free up to a per‑customer, per‑day threshold. Above that threshold, the LFI charges the TPP for continued transactional‑data retrieval. Thresholds and caps differ between Retail/SME and Corporate. </p></div><div class="ed-pr-pagedef" data-v-d4dbf214><div class="ed-pr-pagedef__tag" data-v-d4dbf214>How a “page” is defined</div><div class="ed-pr-pagedef__body" data-v-d4dbf214><p data-v-d4dbf214> A <strong data-v-d4dbf214>page</strong> is <strong data-v-d4dbf214>100 lines of transactional data</strong>, with a maximum age span of <strong data-v-d4dbf214>13 months</strong> per call. If a single API call returns more than 100 lines, it is treated as multiple pages and charged accordingly. </p></div></div><div class="ed-pr-seg" data-v-d4dbf214><div class="ed-pr-seg__head" data-v-d4dbf214><span class="ed-pr-seg__tag" data-v-d4dbf214>Retail &amp; SME</span><span class="ed-pr-seg__hint" data-v-d4dbf214>Free threshold, then LFI‑set</span></div><div class="ed-pr-ctx-table" data-v-d4dbf214><div class="ed-pr-ctx-table__head" data-v-d4dbf214><span data-v-d4dbf214>Data‑sharing context</span><span data-v-d4dbf214>Threshold &amp; rate</span></div><div class="ed-pr-ctx-table__row" data-v-d4dbf214><div class="ed-pr-ctx-table__label" data-v-d4dbf214><strong data-v-d4dbf214>Attended transactional data</strong><span data-v-d4dbf214>Triggered by an active user of the TPP’s service.</span></div><div class="ed-pr-ctx-table__value" data-v-d4dbf214><span class="ed-pr-ctx-table__primary" data-v-d4dbf214> Free up to <strong data-v-d4dbf214>15 pages</strong> per customer, per day </span><span class="ed-pr-ctx-table__secondary" data-v-d4dbf214> Above 15 pages/customer/day — priced by the LFI. </span></div></div><div class="ed-pr-ctx-table__row" data-v-d4dbf214><div class="ed-pr-ctx-table__label" data-v-d4dbf214><strong data-v-d4dbf214>Unattended transactional data</strong><span data-v-d4dbf214>Initiated without an active user — e.g. background refresh.</span></div><div class="ed-pr-ctx-table__value" data-v-d4dbf214><span class="ed-pr-ctx-table__primary" data-v-d4dbf214> Free up to <strong data-v-d4dbf214>5 pages</strong> per customer, per day </span><span class="ed-pr-ctx-table__secondary" data-v-d4dbf214> Above 5 pages/customer/day — priced by the LFI. </span></div></div><div class="ed-pr-ctx-table__row" data-v-d4dbf214><div class="ed-pr-ctx-table__label" data-v-d4dbf214><strong data-v-d4dbf214>All other Data APIs</strong><span data-v-d4dbf214> Confirmation of Payee, Balance, Payment Status, Product Data, Customer Records. </span></div><div class="ed-pr-ctx-table__value" data-v-d4dbf214><span class="ed-pr-ctx-table__primary" data-v-d4dbf214>Zero — always free to the TPP</span></div></div></div></div><div class="ed-pr-seg" data-v-d4dbf214><div class="ed-pr-seg__head" data-v-d4dbf214><span class="ed-pr-seg__tag ed-pr-seg__tag--corp" data-v-d4dbf214>Corporate</span><span class="ed-pr-seg__hint" data-v-d4dbf214>Capped per page</span></div><div class="ed-pr-ctx-table" data-v-d4dbf214><div class="ed-pr-ctx-table__head" data-v-d4dbf214><span data-v-d4dbf214>Data‑sharing context</span><span data-v-d4dbf214>Rate</span></div><div class="ed-pr-ctx-table__row" data-v-d4dbf214><div class="ed-pr-ctx-table__label" data-v-d4dbf214><strong data-v-d4dbf214>All Data APIs</strong><span data-v-d4dbf214>Any transactional‑data retrieval for a corporate customer.</span></div><div class="ed-pr-ctx-table__value" data-v-d4dbf214><span class="ed-pr-ctx-table__primary" data-v-d4dbf214>Capped at 40 fils per page</span></div></div><div class="ed-pr-ctx-table__row" data-v-d4dbf214><div class="ed-pr-ctx-table__label" data-v-d4dbf214><strong data-v-d4dbf214>Confirmation of Payee</strong><span data-v-d4dbf214>Payee verification prior to a payment.</span></div><div class="ed-pr-ctx-table__value" data-v-d4dbf214><span class="ed-pr-ctx-table__primary" data-v-d4dbf214>Zero</span></div></div></div></div><p class="ed-pr-lfi-link" data-v-d4dbf214> Above the free threshold each LFI sets its own per‑call rate. <a href="/pricing/lfi-rates/" data-v-d4dbf214>See per‑LFI overage rates →</a></p></div></section><section id="fee-calculator" class="ed-pr-calc" data-v-d4dbf214><div class="ed-pr-calc__inner" data-v-d4dbf214><div class="ed-pr-calc__head" data-v-d4dbf214><div class="ed-pr-calc__eyebrow" data-v-d4dbf214><span class="ed-pr-calc__eyebrow-dash" data-v-d4dbf214></span> Fee calculator </div><h2 class="ed-pr-calc__title" data-v-d4dbf214>Try a scenario</h2><p class="ed-pr-calc__lede" data-v-d4dbf214> Pick a starting point, then tinker with the inputs to model your own flow. Calculations follow the caps and stepped rates published in the AlTareq Commercial and Pricing Model — this is a guide, not a quote. </p></div><div class="ed-pr-calc__presets" data-v-d4dbf214><span class="ed-pr-calc__presets-label" data-v-d4dbf214>Start from a scenario</span><div class="ed-pr-calc__presets-list" data-v-d4dbf214><!--[-->`);
      ssrRenderList(unref(PRESETS), (p) => {
        _push(`<button type="button" class="${ssrRenderClass([{ "is-active": unref(activePresetId) === p.id }, "ed-pr-calc__preset"])}" data-v-d4dbf214><span class="ed-pr-calc__preset-label" data-v-d4dbf214>${ssrInterpolate(p.label)}</span><span class="ed-pr-calc__preset-blurb" data-v-d4dbf214>${ssrInterpolate(p.blurb)}</span></button>`);
      });
      _push(`<!--]--></div></div><div class="ed-pr-calc__body" data-v-d4dbf214><div class="ed-pr-calc__inputs" data-v-d4dbf214><div class="ed-pr-calc__panel-eyebrow" data-v-d4dbf214>Inputs</div><label class="ed-pr-calc__field" data-v-d4dbf214><span class="ed-pr-calc__field-label" data-v-d4dbf214>Flow type</span><select class="ed-pr-calc__select" data-v-d4dbf214><!--[-->`);
      ssrRenderList(unref(FLOW_LIST), (f) => {
        _push(`<option${ssrRenderAttr("value", f.id)} data-v-d4dbf214${ssrIncludeBooleanAttr(Array.isArray(unref(inputs).flowId) ? ssrLooseContain(unref(inputs).flowId, f.id) : ssrLooseEqual(unref(inputs).flowId, f.id)) ? " selected" : ""}>${ssrInterpolate(f.label)}</option>`);
      });
      _push(`<!--]--></select></label>`);
      if (unref(currentFlow).yearStep) {
        _push(`<div class="ed-pr-calc__field" data-v-d4dbf214><span class="ed-pr-calc__field-label" data-v-d4dbf214>Year</span><div class="ed-pr-calc__year-toggle" data-v-d4dbf214><!--[-->`);
        ssrRenderList(unref(currentFlow).yearStep.years, (y) => {
          _push(`<button type="button" class="${ssrRenderClass(["ed-pr-calc__year-btn", { "is-active": unref(inputs).year === y }])}" data-v-d4dbf214>Y${ssrInterpolate(y)}</button>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(currentFlow).kind === "payment") {
        _push(`<!--[--><label class="ed-pr-calc__field" data-v-d4dbf214><span class="ed-pr-calc__field-label" data-v-d4dbf214>Monthly volume</span><div class="ed-pr-calc__input-with-unit" data-v-d4dbf214><input type="number" min="0"${ssrRenderAttr("value", unref(inputs).monthlyVolume)} class="ed-pr-calc__input" data-v-d4dbf214><span class="ed-pr-calc__input-unit" data-v-d4dbf214>${ssrInterpolate(unref(currentFlow).unit)}</span></div></label>`);
        if (unref(currentFlow).needsAmount) {
          _push(`<label class="ed-pr-calc__field" data-v-d4dbf214><span class="ed-pr-calc__field-label" data-v-d4dbf214>Average transaction amount</span><div class="ed-pr-calc__input-with-unit" data-v-d4dbf214><input type="number" min="0" step="1"${ssrRenderAttr("value", unref(inputs).avgAmountAED)} class="ed-pr-calc__input" data-v-d4dbf214><span class="ed-pr-calc__input-unit" data-v-d4dbf214>AED</span></div></label>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<label class="ed-pr-calc__check" data-v-d4dbf214><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(unref(inputs).pairWithCoP) ? ssrLooseContain(unref(inputs).pairWithCoP, null) : unref(inputs).pairWithCoP) ? " checked" : ""} data-v-d4dbf214><span data-v-d4dbf214>Pair each payment with a Confirmation of Payee call (discounted to 0.5 fils)</span></label><!--]-->`);
      } else {
        _push(`<!---->`);
      }
      if (unref(currentFlow).kind === "data") {
        _push(`<!--[--><label class="ed-pr-calc__field" data-v-d4dbf214><span class="ed-pr-calc__field-label" data-v-d4dbf214>Active customers</span><div class="ed-pr-calc__input-with-unit" data-v-d4dbf214><input type="number" min="0"${ssrRenderAttr("value", unref(inputs).customers)} class="ed-pr-calc__input" data-v-d4dbf214><span class="ed-pr-calc__input-unit" data-v-d4dbf214>customers</span></div></label><label class="ed-pr-calc__field" data-v-d4dbf214><span class="ed-pr-calc__field-label" data-v-d4dbf214>Data sharing requests per customer per month</span><div class="ed-pr-calc__input-with-unit" data-v-d4dbf214><input type="number" min="0"${ssrRenderAttr("value", unref(inputs).monthlyRequests)} class="ed-pr-calc__input" data-v-d4dbf214><span class="ed-pr-calc__input-unit" data-v-d4dbf214>requests</span></div></label><label class="ed-pr-calc__check" data-v-d4dbf214><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(unref(inputs).hasBillableRequests) ? ssrLooseContain(unref(inputs).hasBillableRequests, null) : unref(inputs).hasBillableRequests) ? " checked" : ""} data-v-d4dbf214><span data-v-d4dbf214>Some requests exceed the daily free threshold (5 unattended / 15 attended pages per customer)</span></label>`);
        if (unref(inputs).hasBillableRequests) {
          _push(`<!--[--><label class="ed-pr-calc__field ed-pr-calc__field--secondary" data-v-d4dbf214><span class="ed-pr-calc__field-label" data-v-d4dbf214>Requests per customer per month above threshold</span><div class="ed-pr-calc__input-with-unit" data-v-d4dbf214><input type="number" min="0"${ssrRenderAttr("value", unref(inputs).billableRequests)} class="ed-pr-calc__input" data-v-d4dbf214><span class="ed-pr-calc__input-unit" data-v-d4dbf214>requests</span></div></label><label class="ed-pr-calc__field" data-v-d4dbf214><span class="ed-pr-calc__field-label" data-v-d4dbf214>LFI overage rate</span><div class="ed-pr-calc__input-with-unit" data-v-d4dbf214><input type="number" min="0" step="0.01"${ssrRenderAttr("value", unref(inputs).lfiOverageAED)} class="ed-pr-calc__input" data-v-d4dbf214><span class="ed-pr-calc__input-unit" data-v-d4dbf214>AED / call</span></div></label><!--]-->`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="ed-pr-calc__outputs" data-v-d4dbf214><div class="ed-pr-calc__panel-eyebrow" data-v-d4dbf214>Estimate</div><div class="ed-pr-calc__total" data-v-d4dbf214><span class="ed-pr-calc__total-label" data-v-d4dbf214>Monthly cost</span><span class="ed-pr-calc__total-value" data-v-d4dbf214>${ssrInterpolate(formatAED(unref(totals).monthlyAED))}</span><span class="ed-pr-calc__total-yearly" data-v-d4dbf214>~ ${ssrInterpolate(formatAED(unref(totals).yearlyAED))} per year</span></div><div class="ed-pr-calc__breakdown" data-v-d4dbf214><div class="ed-pr-calc__breakdown-row" data-v-d4dbf214><span class="ed-pr-calc__breakdown-label" data-v-d4dbf214>Nebras API fees</span><span class="ed-pr-calc__breakdown-value" data-v-d4dbf214>${ssrInterpolate(formatAED(unref(totals).nebrasAED))}</span></div>`);
      if (unref(totals).lfiAED > 0) {
        _push(`<div class="ed-pr-calc__breakdown-row" data-v-d4dbf214><span class="ed-pr-calc__breakdown-label" data-v-d4dbf214> LFI ${ssrInterpolate(((_a = unref(result)) == null ? void 0 : _a.lfiKind) === "payment" ? "payment" : "data-sharing")} fees </span><span class="ed-pr-calc__breakdown-value" data-v-d4dbf214>${ssrInterpolate(formatAED(unref(totals).lfiAED))}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(totals).overageAED > 0) {
        _push(`<div class="ed-pr-calc__breakdown-row ed-pr-calc__breakdown-row--secondary" data-v-d4dbf214><span class="ed-pr-calc__breakdown-label" data-v-d4dbf214>Data overage above threshold</span><span class="ed-pr-calc__breakdown-value" data-v-d4dbf214>${ssrInterpolate(formatAED(unref(totals).overageAED))}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if ((_c = (_b = unref(result)) == null ? void 0 : _b.assumptions) == null ? void 0 : _c.length) {
        _push(`<ul class="ed-pr-calc__assumptions" data-v-d4dbf214><!--[-->`);
        ssrRenderList(unref(result).assumptions, (a) => {
          _push(`<li data-v-d4dbf214>${ssrInterpolate(a)}</li>`);
        });
        _push(`<!--]--></ul>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></section><section class="ed-pr-auth" data-v-d4dbf214><div class="ed-pr-auth__inner" data-v-d4dbf214><div class="ed-pr-auth__head" data-v-d4dbf214><div class="ed-pr-auth__eyebrow" data-v-d4dbf214><span class="ed-pr-auth__eyebrow-dash" data-v-d4dbf214></span> Authority </div><h2 class="ed-pr-auth__title" data-v-d4dbf214>Where this model comes from</h2><p class="ed-pr-auth__lede" data-v-d4dbf214> The fees on this page come from the AlTareq Commercial and Pricing Model, which forms part of the UAE Open Finance Regulations. It is regulated by <strong data-v-d4dbf214>CBUAE</strong> and reviewed annually in conjunction with Nebras Open Finance and ecosystem participants. </p></div><div class="ed-pr-auth__grid" data-v-d4dbf214><article class="ed-pr-auth__tile" data-v-d4dbf214><div class="ed-pr-auth__tile-eyebrow" data-v-d4dbf214>Binding</div><h3 class="ed-pr-auth__tile-title" data-v-d4dbf214>Fee caps are regulatory</h3><p class="ed-pr-auth__tile-body" data-v-d4dbf214> A breach of this pricing model is treated as a breach of the CBUAE Open Finance Regulations and is subject to CBUAE supervision, investigation, and enforcement. </p></article><article class="ed-pr-auth__tile" data-v-d4dbf214><div class="ed-pr-auth__tile-eyebrow" data-v-d4dbf214>Success‑only</div><h3 class="ed-pr-auth__tile-title" data-v-d4dbf214>Fees follow successful calls</h3><p class="ed-pr-auth__tile-body" data-v-d4dbf214> All fees above are charged only for <strong data-v-d4dbf214>technically successful</strong> API calls. Failed calls do not attract either API Hub fees or LFI fees. </p></article><article class="ed-pr-auth__tile" data-v-d4dbf214><div class="ed-pr-auth__tile-eyebrow" data-v-d4dbf214>VAT</div><h3 class="ed-pr-auth__tile-title" data-v-d4dbf214>All figures are VAT‑inclusive</h3><p class="ed-pr-auth__tile-body" data-v-d4dbf214> All fees between TPPs and LFIs are stated inclusive of VAT. The receiving party is responsible for its own invoicing and VAT treatment — Nebras and CBUAE do not handle this. </p></article></div></div></section></div>`);
    };
  }
});
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/pricing/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d4dbf214"]]);
export {
  index as default
};
