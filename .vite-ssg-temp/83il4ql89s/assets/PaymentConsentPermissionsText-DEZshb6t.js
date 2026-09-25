import { computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate } from "vue/server-renderer";
import { u as useSharedState } from "./useSharedState-qc0PNim7.js";
import { _ as _export_sfc } from "../main.mjs";
const purposeCodes = {
  "ACM": "Agency Commission",
  "CCP": "Customer Card Payment",
  "CHC": "Charitable Contributions",
  "CRP": "Credit Card Payment",
  "POS": "Merchant Settlements",
  "AES": "Advance Payment against",
  "ALW": "Allowance",
  "BON": "Bonus",
  "CIN": "Commercial Investments",
  "COM": "Commission",
  "COP": "Compensation",
  "DCP": "Debit Card Payment",
  // Also used for Pre-Paid Reloadable & Personalized Debit Card Payments
  "DIV": "Dividend Payouts",
  "EDU": "Educational Support",
  "EMI": "Equated Monthly Installments",
  "EOS": "End of service final settlement",
  "IPO": "IPO Subscriptions",
  "LAS": "Leave Salary",
  "LIP": "Loan Interest Payments",
  "LNC": "Loan Charges",
  "LND": "Loan Disbursements",
  "MCR": "Medical Claim Reimbursements",
  "OVT": "Over Time",
  "PEN": "Pension",
  "POR": "Refunds/Reversals on IPO",
  "RNT": "Rent Payments",
  "SAA": "Salary Advance",
  "SAL": "Salary",
  "TKT": "Tickets",
  "UTL": "Utility",
  // Listed as ULT, but likely UTL for Utility Bill Payments
  "TOF": "Transfer of funds between persons Normal and Juridical",
  // This could correspond to P2P (Peer-to-Peer) transfers
  "IGT": "Inter Group Transfer",
  "OAT": "Own Account Transfer",
  "SVI": "Stored Value Card Cash - In",
  "SVO": "Stored Value Card Cash - Out",
  "SVP": "Stored Value Card Payments",
  "MWI": "Mobile Wallet Cash In",
  "MWO": "Mobile Wallet Cash Out",
  "MWP": "Mobile Wallet Payments",
  "PRP": "Profit rate Swap Payments",
  "PRW": "Profit Rate Unwind Payments",
  "IRP": "Interest Rate Swap Payments",
  "IRW": "Interest Rate Unwind Payments",
  "GDS": "Goods Bought or Sold",
  "GMS": "Processing repair and maintenance services on goods",
  "STS": "Sea transport",
  "ATS": "Air transport",
  "OTS": "Other modes of transport",
  "STR": "Travel",
  "SCO": "Construction",
  "INS": "Insurance services",
  "FIS": "Financial services",
  "IPC": "Charges for the use of intellectual property royalties",
  "TCS": "Telecommunication services",
  "ITS": "Computer services",
  "IFS": "Information services",
  "RDS": "Research and development services",
  "PMS": "Professional and management consulting services",
  "TTS": "Technical trade-related and other business services",
  "PRS": "Personal cultural audio visual and recreational services",
  "GOS": "Government goods and services embassies etc",
  "IGD": "Intra group dividends",
  "IID": "Intra group interest on debt",
  "PIP": "Profits on Islamic products",
  "PRR": "Profits or rents on real estate",
  "DOE": "Dividends on equity not intra group",
  "ISH": "Income on investment funds shares",
  "ISL": "Interest on securities more than a year",
  "ISS": "Interest on securities less than a year",
  "IOL": "Income on loans",
  "IOD": "Income on deposits",
  "GRI": "Government related income taxes tariffs capital transfers etc",
  "CEA": "Equity for the establishment of new company from residents abroad equity of merger or acquisition of companies abroad from residents and participation to capital increase of related company abroad",
  "PPA": "Purchase of real estate abroad from residents",
  "DLF": "Debt instruments intragroup loans securities deposits foreign",
  // Listed as DIF, but likely DLF
  "FSA": "Equity other than investment fund shares in t related companies abroad",
  "FIA": "Investment fund shares foreign",
  "DSA": "Purchases and sales of foreign debt securities less than a year in t related companies",
  "DLA": "Purchases and sales of foreign debt securities more than a year in t related companies",
  "FDA": "Financial derivatives foreign",
  "AFA": "Receipts or payments from personal residents bank account or deposits abroad",
  "SLA": "Loans - Drawings or Repayments on loans extended to n-residents - short term",
  "LLA": "Loans - Drawings or Repayments on loans extended to n-residents - long term",
  "LEA": "Leasing abroad",
  "RFS": "Repos on foreign securities",
  "TCR": "Trade credits and advances receivable",
  "CEL": "Equity for the establishment of new company in the UAE from residents equity of merger or acquisition of companies in the UAE from n-residents participation to capital increase of related companies",
  "PPL": "Purchase of real estate in the UAE from n- residents",
  "LDL": "Debt instruments intragroup loans securities deposits in the UAE",
  // Listed as DIL, but likely LDL
  "FSL": "Equity other than investment fund shares in t related companies in the UAE",
  "FIL": "Investment fund shares in the UAE",
  "DSL": "Purchases and sales of securities issued by residents less than a year in t related companies",
  "DLL": "Purchases and sales of securities issued by residents more than a year in t related companies",
  "FDL": "Financial derivatives in the UAE",
  "AFL": "Receipts or payments from personal n- resident bank account in the UAE",
  "SLL": "Loans - Drawings or Repayments on foreign loans extended to residents - short term",
  "LLL": "Loans - Drawings or Repayments on foreign loans extended to residents - long term",
  "LEL": "Leasing in the UAE",
  "RLS": "Repos on securities issued by residents",
  "TCP": "Trade credits and advances payable"
};
function getPurposeDescription(code) {
  if (!code) return "Unknown code";
  const upperCode = code.toUpperCase();
  return `${purposeCodes[upperCode] ?? "Unknown code"} (${code})`;
}
function getPaymentPermissionText(permissions) {
  if (!permissions) return null;
  const basic = permissions.includes("ReadAccountsBasic");
  const detail = permissions.includes("ReadAccountsDetail");
  const balances = permissions.includes("ReadBalances");
  const refund = permissions.includes("ReadRefundAccount");
  const hasBasicOrDetail = basic || detail;
  if (hasBasicOrDetail && balances && refund) {
    return "You also grant us permission to access your account details and balance before making the payment, as well as to process refunds.";
  }
  if (hasBasicOrDetail && refund && !balances) {
    return "You also grant us permission to access your account details before making the payment, as well as to process refunds.";
  }
  if (refund && !hasBasicOrDetail && !balances) {
    return "You also grant us permission to access your account details in order to process a refund.";
  }
  if (hasBasicOrDetail && balances && !refund) {
    return "You also grant us permission to access your account details and balance before making the payment.";
  }
  if (hasBasicOrDetail && !balances && !refund) {
    return "You also grant us permission to access your account details before making the payment.";
  }
  return null;
}
function getAuthPaymentPermissionText(permissions) {
  if (!permissions) return null;
  const basic = permissions.includes("ReadAccountsBasic");
  const detail = permissions.includes("ReadAccountsDetail");
  const balances = permissions.includes("ReadBalances");
  const refund = permissions.includes("ReadRefundAccount");
  const hasBasicOrDetail = basic || detail;
  if (hasBasicOrDetail && balances && refund) {
    return "We are also providing access to your account details and balance before making the payment, as well as to process refunds.";
  }
  if (hasBasicOrDetail && refund && !balances) {
    return "We are also providing access to your account details before making the payment, as well as to process refunds.";
  }
  if (refund && !hasBasicOrDetail && !balances) {
    return "We are also providing access to your account details in order to process a refund.";
  }
  if (hasBasicOrDetail && balances && !refund) {
    return "We are also providing access to your account details and balance before making the payment.";
  }
  if (hasBasicOrDetail && !balances && !refund) {
    return "We are also providing access to your account details before making the payment.";
  }
  return null;
}
const paymentPermissionCombinations = [
  ["ReadAccountsBasic"],
  ["ReadAccountsDetail"],
  ["ReadRefundAccount"],
  ["ReadAccountsBasic", "ReadAccountsDetail"],
  ["ReadAccountsBasic", "ReadBalances"],
  ["ReadAccountsBasic", "ReadRefundAccount"],
  ["ReadAccountsDetail", "ReadBalances"],
  ["ReadAccountsDetail", "ReadRefundAccount"],
  ["ReadAccountsBasic", "ReadAccountsDetail", "ReadBalances"],
  ["ReadAccountsBasic", "ReadAccountsDetail", "ReadRefundAccount"],
  ["ReadAccountsBasic", "ReadBalances", "ReadRefundAccount"],
  ["ReadAccountsDetail", "ReadBalances", "ReadRefundAccount"],
  ["ReadAccountsBasic", "ReadAccountsDetail", "ReadBalances", "ReadRefundAccount"]
];
const _sfc_main = {
  __name: "PaymentConsentPermissionsText",
  __ssrInlineRender: true,
  setup(__props) {
    const { consentData } = useSharedState();
    const text = computed(
      () => {
        var _a;
        return getPaymentPermissionText((_a = consentData.value) == null ? void 0 : _a.Permissions);
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      if (text.value) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "payment-perm-frame" }, _attrs))} data-v-1f82cc7b><div class="payment-perm-text" data-v-1f82cc7b>${ssrInterpolate(text.value)}</div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/consent-ui/PaymentConsentPermissionsText.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __unplugin_components_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1f82cc7b"]]);
export {
  __unplugin_components_0 as _,
  getPurposeDescription as a,
  paymentPermissionCombinations as b,
  getPaymentPermissionText as c,
  getAuthPaymentPermissionText as g,
  purposeCodes as p
};
