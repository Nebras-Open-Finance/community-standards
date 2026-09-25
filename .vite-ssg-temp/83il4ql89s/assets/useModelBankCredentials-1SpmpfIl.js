import { computed } from "vue";
import { useRoute } from "vue-router";
import { C as CURRENT_VERSION } from "../main.mjs";
const credentials = [
  {
    version: "v2.1",
    username: "omar.farsi@testmail.ae",
    password: "PIX",
    accounts: [
      { accountId: "2_1_100004000000000000000001", schemeName: "AccountNumber", identification: "10901010157", accountType: "Retail", name: "Omar Al-Farsi" },
      { accountId: "2_1_100004000000000000000002", schemeName: "AccountNumber", identification: "10000109010103", accountType: "Corporate", name: "Mario International" },
      { accountId: "2_1_100004000000000000000003", schemeName: "IBAN", identification: "10000109010105", accountType: "Retail", name: "Spectrum" }
    ]
  },
  {
    version: "v2.0",
    username: "mario@biz.bix",
    password: "PIX",
    accounts: [
      { accountId: "100004000000000000000004", schemeName: "AccountNumber", identification: "10000109010104", accountType: "Corporate", name: "Luigi PrePaid Card" },
      { accountId: "100004000000000000000006", schemeName: "AccountNumber", identification: "10000109010106", accountType: "Corporate", name: "Peach Charge Card" },
      { accountId: "100004000000000000000007", schemeName: "IBAN", identification: "10000109010107", accountType: "Retail", name: "Bowser Other" },
      { accountId: "100004000000000000000008", schemeName: "IBAN", identification: "10000109010108", accountType: "Corporate", name: "Toadstool Current" },
      { accountId: "100004000000000000000009", schemeName: "AccountNumber", identification: "10000109010109", accountType: "Retail", name: "Yoshi Savings" },
      { accountId: "100004000000000000000010", schemeName: "IBAN", identification: "10000109010110", accountType: "Corporate", name: "Koopa Credit Card" },
      { accountId: "100004000000000000000011", schemeName: "IBAN", identification: "10000109010111", accountType: "Retail", name: "Daisy PrePaid Card" }
    ]
  },
  {
    version: "v1.2",
    username: "mits",
    password: "mits",
    accounts: [
      { accountId: "100004000000000000000002", schemeName: "AccountNumber", identification: "10000109010102", accountType: "Corporate", name: "Luigi International" },
      { accountId: "100004000000000000000003", schemeName: "AccountNumber", identification: "10000109010103", accountType: "Retail", name: "Mario International" },
      { accountId: "100004000000000000000005", schemeName: "IBAN", identification: "10000109010105", accountType: "Retail", name: "Spectrum" }
    ]
  }
];
function useModelBankCredentials() {
  const route = useRoute();
  const currentVersion = computed(() => {
    const match = route.path.match(/\/(v\d+\.\d+)\//);
    return (match == null ? void 0 : match[1]) ?? CURRENT_VERSION;
  });
  const currentCredentials = computed(
    () => credentials.find((c) => c.version === currentVersion.value)
  );
  const allCredentials = credentials;
  return {
    currentVersion,
    currentCredentials,
    allCredentials
  };
}
export {
  useModelBankCredentials as u
};
