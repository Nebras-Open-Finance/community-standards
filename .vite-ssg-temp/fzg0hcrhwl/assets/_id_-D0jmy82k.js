import { defineComponent, computed, ref, onMounted, watch, resolveComponent, mergeProps, unref, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderStyle, ssrRenderAttr, ssrRenderClass, ssrRenderList, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { useRoute } from "vue-router";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "@unhead/vue";
const rawData = [
  {
    id: "d8b3852e-502e-432f-9c40-ffdf0055b879",
    isProduction: false,
    legalName: "Arab African International Bank",
    logoUri: "https://data.sandbox.directory.openfinance.ae/logos/d8b3852e-502e-432f-9c40-ffdf0055b879/d8b3852e-502e-432f-9c40-ffdf0055b879.png",
    name: "AAIB",
    type: "LFI",
    publicLink: "https://docs.nebras-open-finance.com/d8b3852e-502e-432f-9c40-ffdf0055b879/public",
    privateLink: "https://docs.nebras-open-finance.com/d8b3852e-502e-432f-9c40-ffdf0055b879/private"
  },
  {
    id: "36b067c3-8017-4144-bb7e-49cf794089c9",
    isProduction: true,
    legalName: "Abu Dhabi Commercial Bank PBJC",
    logoUri: "https://data.directory.openfinance.ae/logos/36b067c3-8017-4144-bb7e-49cf794089c9/36b067c3-8017-4144-bb7e-49cf794089c9.jpg",
    name: "ADCB",
    type: "LFI",
    publicLink: "https://docs.nebras-open-finance.com/36b067c3-8017-4144-bb7e-49cf794089c9/public",
    privateLink: "https://docs.nebras-open-finance.com/36b067c3-8017-4144-bb7e-49cf794089c9/private"
  },
  {
    id: "1b4f7317-8b67-4179-bdfb-8054f74c25d0",
    isProduction: true,
    legalName: "Abu Dhabi Islamic Bank P.J.S.C",
    lfiGoLiveDate: "2026-04-14",
    logoUri: "https://data.directory.openfinance.ae/logos/1b4f7317-8b67-4179-bdfb-8054f74c25d0/1b4f7317-8b67-4179-bdfb-8054f74c25d0.jpg",
    name: "ADIB",
    tppGoLiveDate: "2026-04-14",
    type: "LFI",
    publicLink: "https://docs.nebras-open-finance.com/1b4f7317-8b67-4179-bdfb-8054f74c25d0/public",
    privateLink: "https://docs.nebras-open-finance.com/1b4f7317-8b67-4179-bdfb-8054f74c25d0/private"
  },
  {
    id: "b1b75d1a-648e-4e88-8d1f-a2a3cf43de5c",
    isProduction: true,
    legalName: "ABU DHABI NATIONAL INSURANCE COMPANY PJSC",
    logoUri: "https://data.directory.openfinance.ae/logos/b1b75d1a-648e-4e88-8d1f-a2a3cf43de5c/b1b75d1a-648e-4e88-8d1f-a2a3cf43de5c.jpg",
    name: "ADNIC",
    type: "LFI",
    publicLink: "https://docs.nebras-open-finance.com/b1b75d1a-648e-4e88-8d1f-a2a3cf43de5c/public",
    privateLink: "https://docs.nebras-open-finance.com/b1b75d1a-648e-4e88-8d1f-a2a3cf43de5c/private"
  },
  {
    id: "8bb52664-8391-4a20-8eb0-2deb0c782cf3",
    isProduction: false,
    legalName: "AFIA Insurance Brokerage Services",
    logoUri: "https://data.sandbox.directory.openfinance.ae/logos/8bb52664-8391-4a20-8eb0-2deb0c782cf3/8bb52664-8391-4a20-8eb0-2deb0c782cf3.png",
    name: "AFIA Insurance Brokerage Services LLC (InsuranceMarket.ae)",
    type: "TPP",
    publicLink: "https://docs.nebras-open-finance.com/8bb52664-8391-4a20-8eb0-2deb0c782cf3/public",
    privateLink: "https://docs.nebras-open-finance.com/8bb52664-8391-4a20-8eb0-2deb0c782cf3/private"
  },
  {
    id: "cd0221a4-0ff4-4974-a631-72ab0aa54a18",
    isProduction: false,
    legalName: "Agricultural  Bank of China  Ltd",
    logoUri: "https://data.sandbox.directory.openfinance.ae/logos/cd0221a4-0ff4-4974-a631-72ab0aa54a18/cd0221a4-0ff4-4974-a631-72ab0aa54a18.png",
    name: "Agricultural  Bank of China  Ltd",
    type: "LFI",
    publicLink: "https://docs.nebras-open-finance.com/cd0221a4-0ff4-4974-a631-72ab0aa54a18/public",
    privateLink: "https://docs.nebras-open-finance.com/cd0221a4-0ff4-4974-a631-72ab0aa54a18/private"
  },
  {
    id: "efc97cf6-2d7b-4b37-8a9a-ac9c1958b17a",
    isProduction: false,
    legalName: "Ajman Bank P.J.S.C",
    logoUri: "https://data.sandbox.directory.openfinance.ae/logos/efc97cf6-2d7b-4b37-8a9a-ac9c1958b17a/efc97cf6-2d7b-4b37-8a9a-ac9c1958b17a.png",
    name: "Ajman Bank",
    type: "LFI",
    publicLink: "https://docs.nebras-open-finance.com/efc97cf6-2d7b-4b37-8a9a-ac9c1958b17a/public",
    privateLink: "https://docs.nebras-open-finance.com/efc97cf6-2d7b-4b37-8a9a-ac9c1958b17a/private"
  },
  {
    id: "176874d6-e4db-48cb-935c-e9bc11193a8f",
    isProduction: false,
    legalName: "Al Ansari Exchange",
    logoUri: "https://data.sandbox.directory.openfinance.ae/logos/176874d6-e4db-48cb-935c-e9bc11193a8f/176874d6-e4db-48cb-935c-e9bc11193a8f.jpg",
    name: "Al Ansari Exchange",
    type: "LFI",
    publicLink: "https://docs.nebras-open-finance.com/176874d6-e4db-48cb-935c-e9bc11193a8f/public",
    privateLink: "https://docs.nebras-open-finance.com/176874d6-e4db-48cb-935c-e9bc11193a8f/private"
  },
  {
    id: "f8655450-519d-48ce-ba63-29a3547929f5",
    isProduction: false,
    legalName: "Al Buharia National Insurance Co",
    logoUri: "https://data.sandbox.directory.openfinance.ae/logos/f8655450-519d-48ce-ba63-29a3547929f5/f8655450-519d-48ce-ba63-29a3547929f5.jpg",
    name: "Al Buharia National Insurance Co",
    type: "LFI",
    publicLink: "https://docs.nebras-open-finance.com/f8655450-519d-48ce-ba63-29a3547929f5/public",
    privateLink: "https://docs.nebras-open-finance.com/f8655450-519d-48ce-ba63-29a3547929f5/private"
  },
  {
    id: "3ae85b57-7a70-4be2-84fe-97fbb4d8ec45",
    isProduction: false,
    legalName: "Al Fardan Exchange - Sole Proprietorship L.L.C",
    logoUri: "https://data.sandbox.directory.openfinance.ae/logos/3ae85b57-7a70-4be2-84fe-97fbb4d8ec45/3ae85b57-7a70-4be2-84fe-97fbb4d8ec45.png",
    name: "Al Fardan Exchange - Sole Proprietorship L.L.C",
    type: "LFI",
    publicLink: "https://docs.nebras-open-finance.com/3ae85b57-7a70-4be2-84fe-97fbb4d8ec45/public",
    privateLink: "https://docs.nebras-open-finance.com/3ae85b57-7a70-4be2-84fe-97fbb4d8ec45/private"
  },
  {
    id: "341a8d2e-ccc9-4512-acb3-8497c13c9b6c",
    isProduction: false,
    legalName: "Al Fujairah National Insurance Company PSC",
    logoUri: "https://data.sandbox.directory.openfinance.ae/logos/341a8d2e-ccc9-4512-acb3-8497c13c9b6c/341a8d2e-ccc9-4512-acb3-8497c13c9b6c.png",
    name: "Al Fujairah National Insurance Company PSC",
    type: "LFI",
    publicLink: "https://docs.nebras-open-finance.com/341a8d2e-ccc9-4512-acb3-8497c13c9b6c/public",
    privateLink: "https://docs.nebras-open-finance.com/341a8d2e-ccc9-4512-acb3-8497c13c9b6c/private"
  },
  {
    id: "9b16b09b-fde8-4a15-89d0-b376e8a55ef7",
    isProduction: false,
    legalName: "Al Hilal Bank P.J.S.C",
    logoUri: "https://data.sandbox.directory.openfinance.ae/logos/9b16b09b-fde8-4a15-89d0-b376e8a55ef7/9b16b09b-fde8-4a15-89d0-b376e8a55ef7.jpg",
    name: "AL Hilal Bank",
    type: "LFI",
    publicLink: "https://docs.nebras-open-finance.com/9b16b09b-fde8-4a15-89d0-b376e8a55ef7/public",
    privateLink: "https://docs.nebras-open-finance.com/9b16b09b-fde8-4a15-89d0-b376e8a55ef7/private"
  },
  {
    id: "30303fd5-70a9-4cfc-a08e-d927572e9a8d",
    isProduction: false,
    legalName: "Al Ittihad Al Watani",
    logoUri: "https://data.sandbox.directory.openfinance.ae/logos/30303fd5-70a9-4cfc-a08e-d927572e9a8d/30303fd5-70a9-4cfc-a08e-d927572e9a8d.png",
    name: "AL ITTIHAD AL WATANI Insurance Company",
    type: "LFI",
    publicLink: "https://docs.nebras-open-finance.com/30303fd5-70a9-4cfc-a08e-d927572e9a8d/public",
    privateLink: "https://docs.nebras-open-finance.com/30303fd5-70a9-4cfc-a08e-d927572e9a8d/private"
  },
  {
    id: "edee04f4-7dc6-4274-815d-c18262b344c4",
    isProduction: false,
    legalName: "Al Maryah Community Bank L.L.C.",
    logoUri: "https://data.sandbox.directory.openfinance.ae/logos/edee04f4-7dc6-4274-815d-c18262b344c4/edee04f4-7dc6-4274-815d-c18262b344c4.png",
    name: "Al Maryah Community Bank",
    type: "LFI",
    publicLink: "https://docs.nebras-open-finance.com/edee04f4-7dc6-4274-815d-c18262b344c4/public",
    privateLink: "https://docs.nebras-open-finance.com/edee04f4-7dc6-4274-815d-c18262b344c4/private"
  },
  {
    id: "8e4400b9-2250-4788-9871-13b123921199",
    isProduction: false,
    legalName: "Arab Bank for Investment & Foreign Trade",
    logoUri: "https://data.sandbox.directory.openfinance.ae/logos/8e4400b9-2250-4788-9871-13b123921199/8e4400b9-2250-4788-9871-13b123921199.jpg",
    name: "Al Masraf",
    type: "LFI",
    publicLink: "https://docs.nebras-open-finance.com/8e4400b9-2250-4788-9871-13b123921199/public",
    privateLink: "https://docs.nebras-open-finance.com/8e4400b9-2250-4788-9871-13b123921199/private"
  },
  {
    id: "1696c7b7-249f-48c3-9f21-7e26fac2c116",
    isProduction: true,
    legalName: "ALAIN AHLIA INSURANCE COMPANY",
    logoUri: null,
    name: "ALAIN AHLIA INSURANCE COMPANY",
    type: "LFI",
    publicLink: "https://docs.nebras-open-finance.com/1696c7b7-249f-48c3-9f21-7e26fac2c116/public",
    privateLink: "https://docs.nebras-open-finance.com/1696c7b7-249f-48c3-9f21-7e26fac2c116/private"
  },
  {
    id: "239cb7d5-4dcb-4348-9964-d8872faadc1c",
    isProduction: false,
    legalName: "Arab Bank PLC",
    logoUri: "https://data.sandbox.directory.openfinance.ae/logos/239cb7d5-4dcb-4348-9964-d8872faadc1c/239cb7d5-4dcb-4348-9964-d8872faadc1c.png",
    name: "Arab Bank PLC",
    type: "LFI",
    publicLink: "https://docs.nebras-open-finance.com/239cb7d5-4dcb-4348-9964-d8872faadc1c/public",
    privateLink: "https://docs.nebras-open-finance.com/239cb7d5-4dcb-4348-9964-d8872faadc1c/private"
  },
  {
    id: "d6f549cc-ff6f-4e21-844e-f26a2ee932cb",
    isProduction: false,
    legalName: "Arab Financial Services LLC",
    logoUri: "https://data.sandbox.directory.openfinance.ae/logos/d6f549cc-ff6f-4e21-844e-f26a2ee932cb/d6f549cc-ff6f-4e21-844e-f26a2ee932cb.jpg",
    name: "Arab Financial Services LLC",
    type: "TPP",
    publicLink: "https://docs.nebras-open-finance.com/d6f549cc-ff6f-4e21-844e-f26a2ee932cb/public",
    privateLink: "https://docs.nebras-open-finance.com/d6f549cc-ff6f-4e21-844e-f26a2ee932cb/private"
  },
  {
    id: "473cbc09-d58d-4656-8e70-11e467f37cfe",
    isProduction: true,
    legalName: "Al Wathba National Insurance Co",
    logoUri: "https://data.directory.openfinance.ae/logos/473cbc09-d58d-4656-8e70-11e467f37cfe/473cbc09-d58d-4656-8e70-11e467f37cfe.jpg",
    name: "AWNIC",
    type: "LFI",
    publicLink: "https://docs.nebras-open-finance.com/473cbc09-d58d-4656-8e70-11e467f37cfe/public",
    privateLink: "https://docs.nebras-open-finance.com/473cbc09-d58d-4656-8e70-11e467f37cfe/private"
  },
  {
    id: "9803b615-62f0-4d8f-813f-ec20fd1cc46f",
    isProduction: false,
    legalName: "Bancify Technologies FZ-LLC",
    logoUri: null,
    name: "Bancify Technologies FZ-LLC",
    type: "TPP",
    publicLink: "https://docs.nebras-open-finance.com/9803b615-62f0-4d8f-813f-ec20fd1cc46f/public",
    privateLink: "https://docs.nebras-open-finance.com/9803b615-62f0-4d8f-813f-ec20fd1cc46f/private"
  },
  {
    id: "0a8eefd6-57c8-4f73-9bdb-112625595d2f",
    isProduction: false,
    legalName: "BANK OF BARODA",
    logoUri: "https://data.sandbox.directory.openfinance.ae/logos/0a8eefd6-57c8-4f73-9bdb-112625595d2f/0a8eefd6-57c8-4f73-9bdb-112625595d2f.png",
    name: "BANK OF BARODA",
    type: "LFI",
    publicLink: "https://docs.nebras-open-finance.com/0a8eefd6-57c8-4f73-9bdb-112625595d2f/public",
    privateLink: "https://docs.nebras-open-finance.com/0a8eefd6-57c8-4f73-9bdb-112625595d2f/private"
  },
  {
    id: "d786af7f-4f7c-48cb-87ed-97bdb9c036ad",
    isProduction: false,
    legalName: "Bank of China Limited",
    logoUri: "https://data.sandbox.directory.openfinance.ae/logos/d786af7f-4f7c-48cb-87ed-97bdb9c036ad/d786af7f-4f7c-48cb-87ed-97bdb9c036ad.jpg",
    name: "Bank Of China",
    type: "LFI",
    publicLink: "https://docs.nebras-open-finance.com/d786af7f-4f7c-48cb-87ed-97bdb9c036ad/public",
    privateLink: "https://docs.nebras-open-finance.com/d786af7f-4f7c-48cb-87ed-97bdb9c036ad/private"
  },
  {
    id: "c278a7df-8495-4420-a14c-137f5c5869a9",
    isProduction: false,
    legalName: "Bank of Sharjah PJSC",
    logoUri: "https://data.sandbox.directory.openfinance.ae/logos/c278a7df-8495-4420-a14c-137f5c5869a9/c278a7df-8495-4420-a14c-137f5c5869a9.png",
    name: "Bank of Sharjah PJSC",
    type: "LFI",
    publicLink: "https://docs.nebras-open-finance.com/c278a7df-8495-4420-a14c-137f5c5869a9/public",
    privateLink: "https://docs.nebras-open-finance.com/c278a7df-8495-4420-a14c-137f5c5869a9/private"
  },
  {
    id: "5b10d9f1-d356-46cd-8bea-346bcca80722",
    isProduction: false,
    legalName: "BANQUE BANORIENT FRANCE",
    logoUri: "https://data.sandbox.directory.openfinance.ae/logos/5b10d9f1-d356-46cd-8bea-346bcca80722/5b10d9f1-d356-46cd-8bea-346bcca80722.jpg",
    name: "BANQUE BANORIENT FRANCE",
    type: "LFI",
    publicLink: "https://docs.nebras-open-finance.com/5b10d9f1-d356-46cd-8bea-346bcca80722/public",
    privateLink: "https://docs.nebras-open-finance.com/5b10d9f1-d356-46cd-8bea-346bcca80722/private"
  },
  {
    id: "2d4044fb-5c12-4444-8a59-a2689e8a5121",
    isProduction: false,
    legalName: "Banque Misr",
    logoUri: "https://data.sandbox.directory.openfinance.ae/logos/2d4044fb-5c12-4444-8a59-a2689e8a5121/2d4044fb-5c12-4444-8a59-a2689e8a5121.png",
    name: "Banque Misr",
    type: "LFI",
    publicLink: "https://docs.nebras-open-finance.com/2d4044fb-5c12-4444-8a59-a2689e8a5121/public",
    privateLink: "https://docs.nebras-open-finance.com/2d4044fb-5c12-4444-8a59-a2689e8a5121/private"
  },
  {
    id: "52908ec0-5606-4e4e-a4bf-ef207c967c5c",
    isProduction: false,
    legalName: "Barclays Bank PLC",
    logoUri: "https://data.sandbox.directory.openfinance.ae/logos/52908ec0-5606-4e4e-a4bf-ef207c967c5c/52908ec0-5606-4e4e-a4bf-ef207c967c5c.png",
    name: "Barclays Bank PLC",
    type: "LFI",
    publicLink: "https://docs.nebras-open-finance.com/52908ec0-5606-4e4e-a4bf-ef207c967c5c/public",
    privateLink: "https://docs.nebras-open-finance.com/52908ec0-5606-4e4e-a4bf-ef207c967c5c/private"
  },
  {
    id: "f8a308b8-1c34-4d09-8240-23f38079a662",
    isProduction: false,
    legalName: "Bunuk",
    logoUri: "https://data.sandbox.directory.openfinance.ae/logos/f8a308b8-1c34-4d09-8240-23f38079a662/f8a308b8-1c34-4d09-8240-23f38079a662.png",
    name: "Bunuk",
    type: "TPP",
    publicLink: "https://docs.nebras-open-finance.com/f8a308b8-1c34-4d09-8240-23f38079a662/public",
    privateLink: "https://docs.nebras-open-finance.com/f8a308b8-1c34-4d09-8240-23f38079a662/private"
  },
  {
    id: "2f9981d9-47e6-4cd5-ba04-d6bdadf52591",
    isProduction: true,
    legalName: "COMMERCIAL BANK OF DUBAI",
    lfiGoLiveDate: "2025-12-22",
    logoUri: "https://data.directory.openfinance.ae/logos/2f9981d9-47e6-4cd5-ba04-d6bdadf52591/2f9981d9-47e6-4cd5-ba04-d6bdadf52591.png",
    name: "CBD",
    tppGoLiveDate: "2026-08-11",
    type: "LFI",
    publicLink: "https://docs.nebras-open-finance.com/2f9981d9-47e6-4cd5-ba04-d6bdadf52591/public",
    privateLink: "https://docs.nebras-open-finance.com/2f9981d9-47e6-4cd5-ba04-d6bdadf52591/private"
  },
  {
    id: "e06d8b39-ddb7-4fcd-93cf-d6e60bff6fe5",
    isProduction: false,
    legalName: "Cigna Insurance Middle East SAL",
    logoUri: null,
    name: "Cigna Insurance Middle East SAL",
    type: "LFI",
    publicLink: "https://docs.nebras-open-finance.com/e06d8b39-ddb7-4fcd-93cf-d6e60bff6fe5/public",
    privateLink: "https://docs.nebras-open-finance.com/e06d8b39-ddb7-4fcd-93cf-d6e60bff6fe5/private"
  },
  {
    id: "8c14e8a9-6dea-45ce-b6e4-6fbef7d23e64",
    isProduction: false,
    legalName: "Citibank NA, UAE",
    logoUri: "https://data.sandbox.directory.openfinance.ae/logos/8c14e8a9-6dea-45ce-b6e4-6fbef7d23e64/8c14e8a9-6dea-45ce-b6e4-6fbef7d23e64.jpg",
    name: "Citibank NA, UAE",
    type: "LFI",
    publicLink: "https://docs.nebras-open-finance.com/8c14e8a9-6dea-45ce-b6e4-6fbef7d23e64/public",
    privateLink: "https://docs.nebras-open-finance.com/8c14e8a9-6dea-45ce-b6e4-6fbef7d23e64/private"
  },
  {
    id: "5459391f-964f-4dba-a891-2ff95b9123be",
    isProduction: false,
    legalName: "Commercial Bank International PJSC",
    logoUri: "https://data.sandbox.directory.openfinance.ae/logos/5459391f-964f-4dba-a891-2ff95b9123be/5459391f-964f-4dba-a891-2ff95b9123be.jpg",
    name: "Commercial Bank International PJSC",
    type: "LFI",
    publicLink: "https://docs.nebras-open-finance.com/5459391f-964f-4dba-a891-2ff95b9123be/public",
    privateLink: "https://docs.nebras-open-finance.com/5459391f-964f-4dba-a891-2ff95b9123be/private"
  },
  {
    id: "8804ffec-cec7-4067-add0-00ed5efe1ef4",
    isProduction: false,
    legalName: "National Health Insurance Company - Daman PJSC",
    logoUri: "https://data.sandbox.directory.openfinance.ae/logos/8804ffec-cec7-4067-add0-00ed5efe1ef4/8804ffec-cec7-4067-add0-00ed5efe1ef4.jpg",
    name: "Daman",
    type: "LFI",
    publicLink: "https://docs.nebras-open-finance.com/8804ffec-cec7-4067-add0-00ed5efe1ef4/public",
    privateLink: "https://docs.nebras-open-finance.com/8804ffec-cec7-4067-add0-00ed5efe1ef4/private"
  },
  {
    id: "690c1e21-5806-43bb-aa16-15bcda631922",
    isProduction: true,
    legalName: "Dubai Islamic Bank P.J.S.C",
    logoUri: "https://data.directory.openfinance.ae/logos/690c1e21-5806-43bb-aa16-15bcda631922/690c1e21-5806-43bb-aa16-15bcda631922.jpg",
    name: "DIB",
    type: "LFI",
    publicLink: "https://docs.nebras-open-finance.com/690c1e21-5806-43bb-aa16-15bcda631922/public",
    privateLink: "https://docs.nebras-open-finance.com/690c1e21-5806-43bb-aa16-15bcda631922/private"
  },
  {
    id: "1b045d74-e76e-4dda-b302-e2c24ff1f718",
    isProduction: false,
    legalName: "Dubai Islamic Bank P.J.S.C",
    logoUri: "https://data.sandbox.directory.openfinance.ae/logos/1b045d74-e76e-4dda-b302-e2c24ff1f718/1b045d74-e76e-4dda-b302-e2c24ff1f718.jpg",
    name: "DIB",
    type: "LFI",
    publicLink: "https://docs.nebras-open-finance.com/1b045d74-e76e-4dda-b302-e2c24ff1f718/public",
    privateLink: "https://docs.nebras-open-finance.com/1b045d74-e76e-4dda-b302-e2c24ff1f718/private"
  },
  {
    id: "6207c397-4021-4381-a83a-1a37c657abf9",
    isProduction: false,
    legalName: "Digital Financial Services LLC",
    logoUri: "https://data.sandbox.directory.openfinance.ae/logos/6207c397-4021-4381-a83a-1a37c657abf9/6207c397-4021-4381-a83a-1a37c657abf9.png",
    name: "Digital Financial Services LLC (e & money)",
    type: "TPP",
    publicLink: "https://docs.nebras-open-finance.com/6207c397-4021-4381-a83a-1a37c657abf9/public",
    privateLink: "https://docs.nebras-open-finance.com/6207c397-4021-4381-a83a-1a37c657abf9/private"
  },
  {
    id: "447b3351-d026-4e70-9dfe-ce99a05f52e2",
    isProduction: false,
    legalName: "Direct Debit System FZ LLC",
    logoUri: "https://data.sandbox.directory.openfinance.ae/logos/447b3351-d026-4e70-9dfe-ce99a05f52e2/447b3351-d026-4e70-9dfe-ce99a05f52e2.png",
    name: "Direct Debit System FZ LLC",
    type: "TPP",
    publicLink: "https://docs.nebras-open-finance.com/447b3351-d026-4e70-9dfe-ce99a05f52e2/public",
    privateLink: "https://docs.nebras-open-finance.com/447b3351-d026-4e70-9dfe-ce99a05f52e2/private"
  },
  {
    id: "7c618e0b-0acc-4642-bdbb-180eb419be95",
    isProduction: false,
    legalName: "Dubai Insurance Company",
    logoUri: "https://data.sandbox.directory.openfinance.ae/logos/7c618e0b-0acc-4642-bdbb-180eb419be95/7c618e0b-0acc-4642-bdbb-180eb419be95.png",
    name: "Dubai Insurance Company",
    type: "LFI",
    publicLink: "https://docs.nebras-open-finance.com/7c618e0b-0acc-4642-bdbb-180eb419be95/public",
    privateLink: "https://docs.nebras-open-finance.com/7c618e0b-0acc-4642-bdbb-180eb419be95/private"
  },
  {
    id: "e7d13870-5780-4df3-8865-7534a513b4d3",
    isProduction: false,
    legalName: "DUBAI NATIONAL INSURANCE & REINSURANCE CO. (P.S.C.)",
    logoUri: "https://data.sandbox.directory.openfinance.ae/logos/e7d13870-5780-4df3-8865-7534a513b4d3/e7d13870-5780-4df3-8865-7534a513b4d3.png",
    name: "Dubai National Insurance and Reinsurance",
    type: "LFI",
    publicLink: "https://docs.nebras-open-finance.com/e7d13870-5780-4df3-8865-7534a513b4d3/public",
    privateLink: "https://docs.nebras-open-finance.com/e7d13870-5780-4df3-8865-7534a513b4d3/private"
  },
  {
    id: "f18cef1c-2ea2-4501-a1e5-db2e911689f8",
    isProduction: true,
    legalName: "Emirates Insurance Company",
    logoUri: "https://data.directory.openfinance.ae/logos/f18cef1c-2ea2-4501-a1e5-db2e911689f8/f18cef1c-2ea2-4501-a1e5-db2e911689f8.png",
    name: "EIC",
    type: "LFI",
    publicLink: "https://docs.nebras-open-finance.com/f18cef1c-2ea2-4501-a1e5-db2e911689f8/public",
    privateLink: "https://docs.nebras-open-finance.com/f18cef1c-2ea2-4501-a1e5-db2e911689f8/private"
  },
  {
    id: "37f353bf-0f2a-48f2-8c5a-10b40b7bc7b3",
    isProduction: false,
    legalName: "Emirates Islamic Bank PJSC",
    logoUri: "https://data.sandbox.directory.openfinance.ae/logos/37f353bf-0f2a-48f2-8c5a-10b40b7bc7b3/37f353bf-0f2a-48f2-8c5a-10b40b7bc7b3.jpg",
    name: "Emirates Islamic",
    type: "LFI",
    publicLink: "https://docs.nebras-open-finance.com/37f353bf-0f2a-48f2-8c5a-10b40b7bc7b3/public",
    privateLink: "https://docs.nebras-open-finance.com/37f353bf-0f2a-48f2-8c5a-10b40b7bc7b3/private"
  },
  {
    id: "64e5061d-437f-43c8-9f17-1df9a4600705",
    isProduction: true,
    legalName: "EMIRATES NBD BANK PJSC",
    logoUri: "https://data.directory.openfinance.ae/logos/64e5061d-437f-43c8-9f17-1df9a4600705/64e5061d-437f-43c8-9f17-1df9a4600705.png",
    name: "Emirates NBD",
    type: "LFI",
    publicLink: "https://docs.nebras-open-finance.com/64e5061d-437f-43c8-9f17-1df9a4600705/public",
    privateLink: "https://docs.nebras-open-finance.com/64e5061d-437f-43c8-9f17-1df9a4600705/private"
  },
  {
    id: "8a37e74c-2827-496c-abf6-985bf177b5ea",
    isProduction: true,
    legalName: "First Abu Dhabi Islamic Finance PJSC",
    lfiGoLiveDate: "2025-12-22",
    logoUri: "https://data.directory.openfinance.ae/logos/8a37e74c-2827-496c-abf6-985bf177b5ea/8a37e74c-2827-496c-abf6-985bf177b5ea.jpg",
    name: "FAB",
    type: "LFI",
    publicLink: "https://docs.nebras-open-finance.com/8a37e74c-2827-496c-abf6-985bf177b5ea/public",
    privateLink: "https://docs.nebras-open-finance.com/8a37e74c-2827-496c-abf6-985bf177b5ea/private"
  },
  {
    id: "a2df4c56-b0d5-43e8-9e7d-685f722e8830",
    isProduction: false,
    legalName: "Fintech Galaxy FZE",
    logoUri: null,
    name: "Fintech Galaxy FZE",
    type: "TPP",
    publicLink: "https://docs.nebras-open-finance.com/a2df4c56-b0d5-43e8-9e7d-685f722e8830/public",
    privateLink: "https://docs.nebras-open-finance.com/a2df4c56-b0d5-43e8-9e7d-685f722e8830/private"
  },
  {
    id: "768b9d9c-648e-4cc7-89d6-4b0dd0528be3",
    isProduction: false,
    legalName: "Grow High Technology Serices LLC (GrowX.Global)",
    logoUri: "https://data.sandbox.directory.openfinance.ae/logos/768b9d9c-648e-4cc7-89d6-4b0dd0528be3/768b9d9c-648e-4cc7-89d6-4b0dd0528be3.jpg",
    name: "GrowX",
    type: "TPP",
    publicLink: "https://docs.nebras-open-finance.com/768b9d9c-648e-4cc7-89d6-4b0dd0528be3/public",
    privateLink: "https://docs.nebras-open-finance.com/768b9d9c-648e-4cc7-89d6-4b0dd0528be3/private"
  },
  {
    id: "25d5678a-99c6-4473-9911-b6a0b205cea7",
    isProduction: false,
    legalName: "Gulf Insurance Group (Gulf) B.S.C Closed",
    logoUri: null,
    name: "Gulf Insurance Group (Gulf) B.S.C Closed",
    type: "LFI",
    publicLink: "https://docs.nebras-open-finance.com/25d5678a-99c6-4473-9911-b6a0b205cea7/public",
    privateLink: "https://docs.nebras-open-finance.com/25d5678a-99c6-4473-9911-b6a0b205cea7/private"
  },
  {
    id: "60599f81-3502-4ff9-8eba-a6ad975ed9ac",
    isProduction: false,
    legalName: "Habib Bank AG Zurich",
    logoUri: "https://data.sandbox.directory.openfinance.ae/logos/60599f81-3502-4ff9-8eba-a6ad975ed9ac/60599f81-3502-4ff9-8eba-a6ad975ed9ac.png",
    name: "Habib Bank AG Zurich",
    type: "LFI",
    publicLink: "https://docs.nebras-open-finance.com/60599f81-3502-4ff9-8eba-a6ad975ed9ac/public",
    privateLink: "https://docs.nebras-open-finance.com/60599f81-3502-4ff9-8eba-a6ad975ed9ac/private"
  },
  {
    id: "db16163c-efb3-4ec2-aa3d-a3d4f466814e",
    isProduction: true,
    legalName: "HSBC Bank Middle East Limited",
    logoUri: "https://data.directory.openfinance.ae/logos/db16163c-efb3-4ec2-aa3d-a3d4f466814e/db16163c-efb3-4ec2-aa3d-a3d4f466814e.jpg",
    name: "HSBC",
    type: "LFI",
    publicLink: "https://docs.nebras-open-finance.com/db16163c-efb3-4ec2-aa3d-a3d4f466814e/public",
    privateLink: "https://docs.nebras-open-finance.com/db16163c-efb3-4ec2-aa3d-a3d4f466814e/private"
  },
  {
    id: "9e02bfe5-afa5-45a9-a6fd-680452a07f98",
    isProduction: false,
    legalName: "InvestBank P.J.S.C",
    logoUri: "https://data.sandbox.directory.openfinance.ae/logos/9e02bfe5-afa5-45a9-a6fd-680452a07f98/9e02bfe5-afa5-45a9-a6fd-680452a07f98.png",
    name: "InvestBank P.J.S.C",
    type: "LFI",
    publicLink: "https://docs.nebras-open-finance.com/9e02bfe5-afa5-45a9-a6fd-680452a07f98/public",
    privateLink: "https://docs.nebras-open-finance.com/9e02bfe5-afa5-45a9-a6fd-680452a07f98/private"
  },
  {
    id: "221bfab7-d564-4083-a9f5-277468aece4c",
    isProduction: true,
    legalName: "ISLAMIC ARAB INSURANCE COMPANY 'SALAMA'",
    logoUri: "https://data.directory.openfinance.ae/logos/221bfab7-d564-4083-a9f5-277468aece4c/221bfab7-d564-4083-a9f5-277468aece4c.jpg",
    name: "ISLAMIC ARAB INSURANCE COMPANY 'SALAMA'",
    type: "LFI",
    publicLink: "https://docs.nebras-open-finance.com/221bfab7-d564-4083-a9f5-277468aece4c/public",
    privateLink: "https://docs.nebras-open-finance.com/221bfab7-d564-4083-a9f5-277468aece4c/private"
  },
  {
    id: "bc3e7f48-da31-4e7a-b622-dc893e7f2847",
    isProduction: true,
    legalName: "Lean Technologies Ltd",
    logoUri: "https://data.directory.openfinance.ae/logos/bc3e7f48-da31-4e7a-b622-dc893e7f2847/bc3e7f48-da31-4e7a-b622-dc893e7f2847.jpg",
    name: "LEAN TECH",
    tppGoLiveDate: "2026-01-01",
    type: "TPP",
    publicLink: "https://docs.nebras-open-finance.com/bc3e7f48-da31-4e7a-b622-dc893e7f2847/public",
    privateLink: "https://docs.nebras-open-finance.com/bc3e7f48-da31-4e7a-b622-dc893e7f2847/private"
  },
  {
    id: "cb607aa6-4d84-4b50-bae9-0e6f0dc76a88",
    isProduction: false,
    legalName: "Lending Advisor",
    logoUri: "https://data.sandbox.directory.openfinance.ae/logos/cb607aa6-4d84-4b50-bae9-0e6f0dc76a88/cb607aa6-4d84-4b50-bae9-0e6f0dc76a88.png",
    name: "Lending Advisor",
    type: "TPP",
    publicLink: "https://docs.nebras-open-finance.com/cb607aa6-4d84-4b50-bae9-0e6f0dc76a88/public",
    privateLink: "https://docs.nebras-open-finance.com/cb607aa6-4d84-4b50-bae9-0e6f0dc76a88/private"
  },
  {
    id: "c683c060-5649-4df7-9b9a-c845cbf13719",
    isProduction: false,
    legalName: "Life Insurance Corporation (International) B.S.C(C)",
    logoUri: null,
    name: "LIC",
    type: "LFI",
    publicLink: "https://docs.nebras-open-finance.com/c683c060-5649-4df7-9b9a-c845cbf13719/public",
    privateLink: "https://docs.nebras-open-finance.com/c683c060-5649-4df7-9b9a-c845cbf13719/private"
  },
  {
    id: "879f9b11-5905-41ae-9dbe-7cb151b16546",
    isProduction: true,
    legalName: "Liva Insurance BSC (c)",
    logoUri: "https://data.directory.openfinance.ae/logos/879f9b11-5905-41ae-9dbe-7cb151b16546/879f9b11-5905-41ae-9dbe-7cb151b16546.jpg",
    name: "LIVA",
    type: "LFI",
    publicLink: "https://docs.nebras-open-finance.com/879f9b11-5905-41ae-9dbe-7cb151b16546/public",
    privateLink: "https://docs.nebras-open-finance.com/879f9b11-5905-41ae-9dbe-7cb151b16546/private"
  },
  {
    id: "a6bcdeac-5f93-40da-ad06-f7fb7a953058",
    isProduction: false,
    legalName: "Lulu International Exchange LLC",
    logoUri: "https://data.sandbox.directory.openfinance.ae/logos/a6bcdeac-5f93-40da-ad06-f7fb7a953058/a6bcdeac-5f93-40da-ad06-f7fb7a953058.jpg",
    name: "Lulu International Exchange LLC",
    type: "LFI",
    publicLink: "https://docs.nebras-open-finance.com/a6bcdeac-5f93-40da-ad06-f7fb7a953058/public",
    privateLink: "https://docs.nebras-open-finance.com/a6bcdeac-5f93-40da-ad06-f7fb7a953058/private"
  },
  {
    id: "205f38cc-1c37-4eb9-9d3b-f5ad7f4d2029",
    isProduction: false,
    legalName: "MadfooatCom for E Payments DMCC",
    logoUri: null,
    name: "MadfooatCom",
    type: "TPP",
    publicLink: "https://docs.nebras-open-finance.com/205f38cc-1c37-4eb9-9d3b-f5ad7f4d2029/public",
    privateLink: "https://docs.nebras-open-finance.com/205f38cc-1c37-4eb9-9d3b-f5ad7f4d2029/private"
  },
  {
    id: "4767786f-ab28-4d5c-8fdb-0f27e1c4eb9c",
    isProduction: true,
    legalName: "MASHREQ BANK PSC",
    lfiGoLiveDate: "2026-02-11",
    logoUri: "https://data.directory.openfinance.ae/logos/4767786f-ab28-4d5c-8fdb-0f27e1c4eb9c/4767786f-ab28-4d5c-8fdb-0f27e1c4eb9c.jpg",
    name: "Mashreq",
    tppGoLiveDate: "2026-08-21",
    type: "LFI",
    publicLink: "https://docs.nebras-open-finance.com/4767786f-ab28-4d5c-8fdb-0f27e1c4eb9c/public",
    privateLink: "https://docs.nebras-open-finance.com/4767786f-ab28-4d5c-8fdb-0f27e1c4eb9c/private"
  },
  {
    id: "94884086-b7c2-43a0-b4e7-a928b9fed0ac",
    isProduction: true,
    legalName: "Mercury Payments Services LLC",
    logoUri: "https://data.directory.openfinance.ae/logos/94884086-b7c2-43a0-b4e7-a928b9fed0ac/94884086-b7c2-43a0-b4e7-a928b9fed0ac.png",
    name: "Mercury",
    type: "TPP",
    publicLink: "https://docs.nebras-open-finance.com/94884086-b7c2-43a0-b4e7-a928b9fed0ac/public",
    privateLink: "https://docs.nebras-open-finance.com/94884086-b7c2-43a0-b4e7-a928b9fed0ac/private"
  },
  {
    id: "a632a8ef-44d8-4331-856f-a0b9dc66241e",
    isProduction: false,
    legalName: "American Life Insurance Company (MetLife)",
    logoUri: null,
    name: "MetLife",
    type: "LFI",
    publicLink: "https://docs.nebras-open-finance.com/a632a8ef-44d8-4331-856f-a0b9dc66241e/public",
    privateLink: "https://docs.nebras-open-finance.com/a632a8ef-44d8-4331-856f-a0b9dc66241e/private"
  },
  {
    id: "c4d75ae0-6601-43ba-a2ac-33c666c4466d",
    isProduction: false,
    legalName: "myAlfred LLC",
    logoUri: "https://data.sandbox.directory.openfinance.ae/logos/c4d75ae0-6601-43ba-a2ac-33c666c4466d/c4d75ae0-6601-43ba-a2ac-33c666c4466d.jpg",
    name: "myAlfred LLC",
    type: "TPP",
    publicLink: "https://docs.nebras-open-finance.com/c4d75ae0-6601-43ba-a2ac-33c666c4466d/public",
    privateLink: "https://docs.nebras-open-finance.com/c4d75ae0-6601-43ba-a2ac-33c666c4466d/private"
  },
  {
    id: "8c21e663-1d34-45cd-91fa-86d7c2d240f4",
    isProduction: true,
    legalName: "National Bank of Fujairah PJSC",
    logoUri: "https://data.directory.openfinance.ae/logos/8c21e663-1d34-45cd-91fa-86d7c2d240f4/8c21e663-1d34-45cd-91fa-86d7c2d240f4.png",
    name: "National Bank of Fujairah PJSC",
    type: "LFI",
    publicLink: "https://docs.nebras-open-finance.com/8c21e663-1d34-45cd-91fa-86d7c2d240f4/public",
    privateLink: "https://docs.nebras-open-finance.com/8c21e663-1d34-45cd-91fa-86d7c2d240f4/private"
  },
  {
    id: "286847d4-b090-4758-af79-e8df0a4daf36",
    isProduction: false,
    legalName: "NATIONAL BANK OF KUWAIT",
    logoUri: "https://data.sandbox.directory.openfinance.ae/logos/286847d4-b090-4758-af79-e8df0a4daf36/286847d4-b090-4758-af79-e8df0a4daf36.jpg",
    name: "NATIONAL BANK OF KUWAIT",
    type: "LFI",
    publicLink: "https://docs.nebras-open-finance.com/286847d4-b090-4758-af79-e8df0a4daf36/public",
    privateLink: "https://docs.nebras-open-finance.com/286847d4-b090-4758-af79-e8df0a4daf36/private"
  },
  {
    id: "f004039c-1827-4851-800a-19b7a5e9f329",
    isProduction: false,
    legalName: "NATIONAL BANK OF UMM AL-QAIWAIN",
    logoUri: "https://data.sandbox.directory.openfinance.ae/logos/f004039c-1827-4851-800a-19b7a5e9f329/f004039c-1827-4851-800a-19b7a5e9f329.png",
    name: "NBQ",
    type: "LFI",
    publicLink: "https://docs.nebras-open-finance.com/f004039c-1827-4851-800a-19b7a5e9f329/public",
    privateLink: "https://docs.nebras-open-finance.com/f004039c-1827-4851-800a-19b7a5e9f329/private"
  },
  {
    id: "8c9881e0-f32e-49e9-984b-8b42708dec88",
    isProduction: false,
    legalName: "NearGo L.L.C-FZ",
    logoUri: "https://data.sandbox.directory.openfinance.ae/logos/8c9881e0-f32e-49e9-984b-8b42708dec88/8c9881e0-f32e-49e9-984b-8b42708dec88.jpg",
    name: "NearGo",
    type: "TPP",
    publicLink: "https://docs.nebras-open-finance.com/8c9881e0-f32e-49e9-984b-8b42708dec88/public",
    privateLink: "https://docs.nebras-open-finance.com/8c9881e0-f32e-49e9-984b-8b42708dec88/private"
  },
  {
    id: "80dbdeff-47fd-48cf-9451-7fc63b25ff43",
    isProduction: true,
    legalName: "Nebras Open Finance",
    logoUri: "https://data.directory.openfinance.ae/logos/placeholder-logo.png",
    name: "Nebras",
    type: "Authority",
    publicLink: "https://docs.nebras-open-finance.com/80dbdeff-47fd-48cf-9451-7fc63b25ff43/public",
    privateLink: "https://docs.nebras-open-finance.com/80dbdeff-47fd-48cf-9451-7fc63b25ff43/private"
  },
  {
    id: "Mercury",
    isProduction: false,
    legalName: "Nebras (Legal Name)",
    logoUri: "https://data.sandbox.directory.openfinance.ae/logos/Mercury/Mercury.png",
    name: "Nebras",
    type: "Authority",
    publicLink: "https://docs.nebras-open-finance.com/Mercury/public",
    privateLink: "https://docs.nebras-open-finance.com/Mercury/private"
  },
  {
    id: "a084403e-b182-4369-8ec2-2e22b125b78c",
    isProduction: false,
    legalName: "Nebras QA",
    logoUri: null,
    name: "Nebras QA",
    type: "TPP",
    publicLink: "https://docs.nebras-open-finance.com/a084403e-b182-4369-8ec2-2e22b125b78c/public",
    privateLink: "https://docs.nebras-open-finance.com/a084403e-b182-4369-8ec2-2e22b125b78c/private"
  },
  {
    id: "d0b8c17e-c503-412d-bf95-b4969dc71088",
    isProduction: false,
    legalName: "Nomod Billing LLC",
    logoUri: "https://data.sandbox.directory.openfinance.ae/logos/d0b8c17e-c503-412d-bf95-b4969dc71088/d0b8c17e-c503-412d-bf95-b4969dc71088.png",
    name: "Nomod",
    type: "TPP",
    publicLink: "https://docs.nebras-open-finance.com/d0b8c17e-c503-412d-bf95-b4969dc71088/public",
    privateLink: "https://docs.nebras-open-finance.com/d0b8c17e-c503-412d-bf95-b4969dc71088/private"
  },
  {
    id: "7bcf7684-2ec6-441e-8eb2-247fea8a951a",
    isProduction: false,
    legalName: "Numi Technologies Ltd",
    logoUri: "https://data.sandbox.directory.openfinance.ae/logos/7bcf7684-2ec6-441e-8eb2-247fea8a951a/7bcf7684-2ec6-441e-8eb2-247fea8a951a.jpg",
    name: "Numi Technologies Ltd",
    type: "TPP",
    publicLink: "https://docs.nebras-open-finance.com/7bcf7684-2ec6-441e-8eb2-247fea8a951a/public",
    privateLink: "https://docs.nebras-open-finance.com/7bcf7684-2ec6-441e-8eb2-247fea8a951a/private"
  },
  {
    id: "7336c529-f6ad-4d98-b9f6-183316fd0a68",
    isProduction: true,
    legalName: "NymCard Payment Services L.L.C.",
    logoUri: null,
    name: "NymCard",
    type: "TPP",
    publicLink: "https://docs.nebras-open-finance.com/7336c529-f6ad-4d98-b9f6-183316fd0a68/public",
    privateLink: "https://docs.nebras-open-finance.com/7336c529-f6ad-4d98-b9f6-183316fd0a68/private"
  },
  {
    id: "9bfa48bf-647e-4082-a6c2-25291e15c98c",
    isProduction: false,
    legalName: "OpenID Foundation",
    logoUri: "https://data.sandbox.directory.openfinance.ae/logos/9bfa48bf-647e-4082-a6c2-25291e15c98c/9bfa48bf-647e-4082-a6c2-25291e15c98c.png",
    name: "OpenID Foundation",
    type: "TPP",
    publicLink: "https://docs.nebras-open-finance.com/9bfa48bf-647e-4082-a6c2-25291e15c98c/public",
    privateLink: "https://docs.nebras-open-finance.com/9bfa48bf-647e-4082-a6c2-25291e15c98c/private"
  },
  {
    id: "f4649205-7273-4b7f-8d55-5ad95674a5f9",
    isProduction: true,
    legalName: "Orient Insurance PJSC",
    logoUri: "https://data.directory.openfinance.ae/logos/f4649205-7273-4b7f-8d55-5ad95674a5f9/f4649205-7273-4b7f-8d55-5ad95674a5f9.png",
    name: "Orient Insurance PJSC",
    type: "LFI",
    publicLink: "https://docs.nebras-open-finance.com/f4649205-7273-4b7f-8d55-5ad95674a5f9/public",
    privateLink: "https://docs.nebras-open-finance.com/f4649205-7273-4b7f-8d55-5ad95674a5f9/private"
  },
  {
    id: "0016920f-c806-47fd-91d6-ce81b3fa7a1e",
    isProduction: true,
    legalName: "PAY TEN PAYMENT SERVICES PROVIDER LLC",
    logoUri: "https://data.directory.openfinance.ae/logos/0016920f-c806-47fd-91d6-ce81b3fa7a1e/0016920f-c806-47fd-91d6-ce81b3fa7a1e.png",
    name: "PAY TEN",
    tppGoLiveDate: "2026-01-01",
    type: "TPP",
    publicLink: "https://docs.nebras-open-finance.com/0016920f-c806-47fd-91d6-ce81b3fa7a1e/public",
    privateLink: "https://docs.nebras-open-finance.com/0016920f-c806-47fd-91d6-ce81b3fa7a1e/private"
  },
  {
    id: "1108d6f4-d50d-4bd6-9ab2-68b956b3cd26",
    isProduction: false,
    legalName: "Paymob Technologies LLC",
    logoUri: "https://data.sandbox.directory.openfinance.ae/logos/1108d6f4-d50d-4bd6-9ab2-68b956b3cd26/1108d6f4-d50d-4bd6-9ab2-68b956b3cd26.jpg",
    name: "Paymob",
    type: "TPP",
    publicLink: "https://docs.nebras-open-finance.com/1108d6f4-d50d-4bd6-9ab2-68b956b3cd26/public",
    privateLink: "https://docs.nebras-open-finance.com/1108d6f4-d50d-4bd6-9ab2-68b956b3cd26/private"
  },
  {
    id: "1e74e695-42a4-4591-b4b2-13b0c893cf35",
    isProduction: false,
    legalName: "Policybazaar Middle East Insurance Brokers LLC",
    logoUri: "https://data.sandbox.directory.openfinance.ae/logos/1e74e695-42a4-4591-b4b2-13b0c893cf35/1e74e695-42a4-4591-b4b2-13b0c893cf35.png",
    name: "Policybazaar",
    type: "TPP",
    publicLink: "https://docs.nebras-open-finance.com/1e74e695-42a4-4591-b4b2-13b0c893cf35/public",
    privateLink: "https://docs.nebras-open-finance.com/1e74e695-42a4-4591-b4b2-13b0c893cf35/private"
  },
  {
    id: "4bdd53d6-b93c-4a2d-aedb-ef04aa6a8281",
    isProduction: false,
    legalName: "Protego Insurance Brokers LLC",
    logoUri: "https://data.sandbox.directory.openfinance.ae/logos/4bdd53d6-b93c-4a2d-aedb-ef04aa6a8281/4bdd53d6-b93c-4a2d-aedb-ef04aa6a8281.png",
    name: "Protego Insurance Brokers LLC",
    type: "TPP",
    publicLink: "https://docs.nebras-open-finance.com/4bdd53d6-b93c-4a2d-aedb-ef04aa6a8281/public",
    privateLink: "https://docs.nebras-open-finance.com/4bdd53d6-b93c-4a2d-aedb-ef04aa6a8281/private"
  },
  {
    id: "521e38cb-a400-4114-9591-40d282d608fe",
    isProduction: false,
    legalName: "National Bank of Ras Al Khaimah (P.S.C.)",
    logoUri: "https://data.sandbox.directory.openfinance.ae/logos/521e38cb-a400-4114-9591-40d282d608fe/521e38cb-a400-4114-9591-40d282d608fe.jpg",
    name: "RAK BANK",
    type: "LFI",
    publicLink: "https://docs.nebras-open-finance.com/521e38cb-a400-4114-9591-40d282d608fe/public",
    privateLink: "https://docs.nebras-open-finance.com/521e38cb-a400-4114-9591-40d282d608fe/private"
  },
  {
    id: "dd8e6644-faa0-4813-9909-79a1a43062c1",
    isProduction: false,
    legalName: "Ras Al Khaimah National Insurance Company P.S.C",
    logoUri: "https://data.sandbox.directory.openfinance.ae/logos/dd8e6644-faa0-4813-9909-79a1a43062c1/dd8e6644-faa0-4813-9909-79a1a43062c1.jpg",
    name: "Ras Al Khaimah National Insurance Company P.S.C",
    type: "LFI",
    publicLink: "https://docs.nebras-open-finance.com/dd8e6644-faa0-4813-9909-79a1a43062c1/public",
    privateLink: "https://docs.nebras-open-finance.com/dd8e6644-faa0-4813-9909-79a1a43062c1/private"
  },
  {
    id: "6bed8f06-6ae1-44e5-9059-ab0b9e91ff30",
    isProduction: false,
    legalName: "SAUDI ARABIAN INSURANCE CO. BSCC DUBAI BRANCH",
    logoUri: "https://data.sandbox.directory.openfinance.ae/logos/6bed8f06-6ae1-44e5-9059-ab0b9e91ff30/6bed8f06-6ae1-44e5-9059-ab0b9e91ff30.png",
    name: "SAUDI ARABIAN INSURANCE CO. BSCC DUBAI BRANCH",
    type: "LFI",
    publicLink: "https://docs.nebras-open-finance.com/6bed8f06-6ae1-44e5-9059-ab0b9e91ff30/public",
    privateLink: "https://docs.nebras-open-finance.com/6bed8f06-6ae1-44e5-9059-ab0b9e91ff30/private"
  },
  {
    id: "18c1db8f-a463-4158-84ca-cd0d2bf1682e",
    isProduction: false,
    legalName: "Sav Technologies Limited",
    logoUri: "https://data.sandbox.directory.openfinance.ae/logos/18c1db8f-a463-4158-84ca-cd0d2bf1682e/18c1db8f-a463-4158-84ca-cd0d2bf1682e.jpg",
    name: "Sav Technologies Limited",
    type: "TPP",
    publicLink: "https://docs.nebras-open-finance.com/18c1db8f-a463-4158-84ca-cd0d2bf1682e/public",
    privateLink: "https://docs.nebras-open-finance.com/18c1db8f-a463-4158-84ca-cd0d2bf1682e/private"
  },
  {
    id: "29536048-fef2-423e-83c2-b333869677cc",
    isProduction: false,
    legalName: "Sharjah Islamic Bank",
    logoUri: "https://data.sandbox.directory.openfinance.ae/logos/29536048-fef2-423e-83c2-b333869677cc/29536048-fef2-423e-83c2-b333869677cc.png",
    name: "Sharjah Islamic Bank",
    type: "LFI",
    publicLink: "https://docs.nebras-open-finance.com/29536048-fef2-423e-83c2-b333869677cc/public",
    privateLink: "https://docs.nebras-open-finance.com/29536048-fef2-423e-83c2-b333869677cc/private"
  },
  {
    id: "daa9716b-d6c3-4211-9f87-53a630bdb9f6",
    isProduction: true,
    legalName: "Spare Digital Technologies LLC S.O.C",
    logoUri: "https://data.directory.openfinance.ae/logos/daa9716b-d6c3-4211-9f87-53a630bdb9f6/daa9716b-d6c3-4211-9f87-53a630bdb9f6.png",
    name: "Spare Technologies",
    tppGoLiveDate: "2026-03-02",
    type: "TPP",
    publicLink: "https://docs.nebras-open-finance.com/daa9716b-d6c3-4211-9f87-53a630bdb9f6/public",
    privateLink: "https://docs.nebras-open-finance.com/daa9716b-d6c3-4211-9f87-53a630bdb9f6/private"
  },
  {
    id: "dc0b18f1-924d-4fb8-8606-facca336f5d8",
    isProduction: false,
    legalName: "Spire Technologies WLL",
    logoUri: "https://data.sandbox.directory.openfinance.ae/logos/dc0b18f1-924d-4fb8-8606-facca336f5d8/dc0b18f1-924d-4fb8-8606-facca336f5d8.png",
    name: "Spire Technologies WLL",
    type: "TPP",
    publicLink: "https://docs.nebras-open-finance.com/dc0b18f1-924d-4fb8-8606-facca336f5d8/public",
    privateLink: "https://docs.nebras-open-finance.com/dc0b18f1-924d-4fb8-8606-facca336f5d8/private"
  },
  {
    id: "16c610ed-9e4a-407d-90d0-64149ba96b45",
    isProduction: false,
    legalName: "Standard Chartered Bank",
    logoUri: "https://data.sandbox.directory.openfinance.ae/logos/16c610ed-9e4a-407d-90d0-64149ba96b45/16c610ed-9e4a-407d-90d0-64149ba96b45.png",
    name: "Standard Chartered Bank",
    type: "LFI",
    publicLink: "https://docs.nebras-open-finance.com/16c610ed-9e4a-407d-90d0-64149ba96b45/public",
    privateLink: "https://docs.nebras-open-finance.com/16c610ed-9e4a-407d-90d0-64149ba96b45/private"
  },
  {
    id: "a41e437b-306a-4763-a42b-c4de302eee0b",
    isProduction: false,
    legalName: "Sukoon Insurance PJSC",
    logoUri: "https://data.sandbox.directory.openfinance.ae/logos/a41e437b-306a-4763-a42b-c4de302eee0b/a41e437b-306a-4763-a42b-c4de302eee0b.png",
    name: "Sukoon Insurance PJSC",
    type: "LFI",
    publicLink: "https://docs.nebras-open-finance.com/a41e437b-306a-4763-a42b-c4de302eee0b/public",
    privateLink: "https://docs.nebras-open-finance.com/a41e437b-306a-4763-a42b-c4de302eee0b/private"
  },
  {
    id: "d5ee7389-e521-4469-9387-f80ef15edc6f",
    isProduction: false,
    legalName: "Bawabat Altarabut For Information Technology L.L.C",
    logoUri: null,
    name: "Tarabut",
    type: "TPP",
    publicLink: "https://docs.nebras-open-finance.com/d5ee7389-e521-4469-9387-f80ef15edc6f/public",
    privateLink: "https://docs.nebras-open-finance.com/d5ee7389-e521-4469-9387-f80ef15edc6f/private"
  },
  {
    id: "8e924742-96c7-45c3-961f-09a80ce1d991",
    isProduction: false,
    legalName: "The Saudi  National Bank",
    logoUri: "https://data.sandbox.directory.openfinance.ae/logos/8e924742-96c7-45c3-961f-09a80ce1d991/8e924742-96c7-45c3-961f-09a80ce1d991.jpg",
    name: "The Saudi  National Bank",
    type: "LFI",
    publicLink: "https://docs.nebras-open-finance.com/8e924742-96c7-45c3-961f-09a80ce1d991/public",
    privateLink: "https://docs.nebras-open-finance.com/8e924742-96c7-45c3-961f-09a80ce1d991/private"
  },
  {
    id: "c8e1896a-9c6c-4d1d-8f98-1a771a1ccd85",
    isProduction: true,
    legalName: "Union Insurance",
    logoUri: "https://data.directory.openfinance.ae/logos/c8e1896a-9c6c-4d1d-8f98-1a771a1ccd85/c8e1896a-9c6c-4d1d-8f98-1a771a1ccd85.png",
    name: "Union Insurance",
    type: "LFI",
    publicLink: "https://docs.nebras-open-finance.com/c8e1896a-9c6c-4d1d-8f98-1a771a1ccd85/public",
    privateLink: "https://docs.nebras-open-finance.com/c8e1896a-9c6c-4d1d-8f98-1a771a1ccd85/private"
  },
  {
    id: "1ee6f5b6-2fa4-48fd-bffa-d8771186c564",
    isProduction: false,
    legalName: "United Arab Bank P.J.S.C",
    logoUri: "https://data.sandbox.directory.openfinance.ae/logos/1ee6f5b6-2fa4-48fd-bffa-d8771186c564/1ee6f5b6-2fa4-48fd-bffa-d8771186c564.png",
    name: "United Arab Bank P.J.S.C",
    type: "LFI",
    publicLink: "https://docs.nebras-open-finance.com/1ee6f5b6-2fa4-48fd-bffa-d8771186c564/public",
    privateLink: "https://docs.nebras-open-finance.com/1ee6f5b6-2fa4-48fd-bffa-d8771186c564/private"
  },
  {
    id: "d86e6704-e92b-4368-a425-5a7ba230e986",
    isProduction: true,
    legalName: "WIO Bank",
    lfiGoLiveDate: "2026-04-13",
    logoUri: "https://data.directory.openfinance.ae/logos/d86e6704-e92b-4368-a425-5a7ba230e986/d86e6704-e92b-4368-a425-5a7ba230e986.jpg",
    name: "WIO Bank",
    tppGoLiveDate: "2026-08-01",
    type: "LFI",
    publicLink: "https://docs.nebras-open-finance.com/d86e6704-e92b-4368-a425-5a7ba230e986/public",
    privateLink: "https://docs.nebras-open-finance.com/d86e6704-e92b-4368-a425-5a7ba230e986/private"
  },
  {
    id: "4c52000d-3db6-44db-8be3-8418cae0e2f1",
    isProduction: false,
    legalName: "ZIINA PAYMENT L.L.C",
    logoUri: "https://data.sandbox.directory.openfinance.ae/logos/4c52000d-3db6-44db-8be3-8418cae0e2f1/4c52000d-3db6-44db-8be3-8418cae0e2f1.jpg",
    name: "ZIINA PAYMENT L.L.C",
    type: "TPP",
    publicLink: "https://docs.nebras-open-finance.com/4c52000d-3db6-44db-8be3-8418cae0e2f1/public",
    privateLink: "https://docs.nebras-open-finance.com/4c52000d-3db6-44db-8be3-8418cae0e2f1/private"
  },
  {
    id: "a90b2761-560d-45a9-9b32-67465c603059",
    isProduction: false,
    legalName: "Zurich International Life Limited",
    logoUri: "https://data.sandbox.directory.openfinance.ae/logos/a90b2761-560d-45a9-9b32-67465c603059/a90b2761-560d-45a9-9b32-67465c603059.jpg",
    name: "Zurich International Life Limited",
    type: "LFI",
    publicLink: "https://docs.nebras-open-finance.com/a90b2761-560d-45a9-9b32-67465c603059/public",
    privateLink: "https://docs.nebras-open-finance.com/a90b2761-560d-45a9-9b32-67465c603059/private"
  }
];
const ORG_TYPES = ["LFI", "TPP", "Authority"];
function isOrgType(candidate) {
  return typeof candidate === "string" && ORG_TYPES.includes(candidate);
}
function narrow(raw) {
  if (!raw || typeof raw !== "object") return null;
  const r = raw;
  const id = typeof r["id"] === "string" ? r["id"] : "";
  const name = typeof r["name"] === "string" ? r["name"] : "";
  const legalName = typeof r["legalName"] === "string" ? r["legalName"] : "";
  const typeRaw = r["type"];
  if (!id || !name || !legalName || !isOrgType(typeRaw)) return null;
  const logoUriRaw = r["logoUri"];
  const logoUri = typeof logoUriRaw === "string" ? logoUriRaw : logoUriRaw === null ? null : null;
  const isProduction = r["isProduction"] === true;
  const org = {
    id,
    name,
    legalName,
    logoUri,
    type: typeRaw,
    isProduction
  };
  if (typeof r["lfiGoLiveDate"] === "string") org.lfiGoLiveDate = r["lfiGoLiveDate"];
  if (typeof r["tppGoLiveDate"] === "string") org.tppGoLiveDate = r["tppGoLiveDate"];
  return org;
}
const allOrgs = (Array.isArray(rawData) ? rawData : []).map(narrow).filter((o) => o !== null);
const docRepoOrgs = allOrgs.filter((o) => o.isProduction === true);
const docRepoIds = docRepoOrgs.map((o) => o.id);
if (docRepoIds.length === 0) {
  console.error(
    "[doc-repository] No production orgs found in trust-framework.json — SSG will produce zero [id] pages."
  );
}
const DOCS_API = "https://docs.nebras-open-finance.com";
const NEBRAS_ORG_ID = "80dbdeff-47fd-48cf-9451-7fc63b25ff43";
const LOGIN_MARKER_KEY = "nebras_docs_login_attempt";
const LOGIN_COOLDOWN_MS = 3e4;
const UPLOADS_ENABLED = false;
const EXPIRY_SOON_DAYS = 60;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const orgId = computed(() => {
      const raw = route.params["id"];
      return typeof raw === "string" ? raw : Array.isArray(raw) ? raw[0] ?? "" : "";
    });
    const org = computed(() => docRepoOrgs.find((o) => o.id === orgId.value));
    const sessionLoading = ref(true);
    const redirecting = ref(false);
    const loopDetected = ref(false);
    const sessionError = ref("");
    const isAuthenticated = ref(false);
    const isNebras = ref(false);
    const canSeePrivate = ref(false);
    const canSeeProtected = ref(false);
    const myOrgs = ref([]);
    const publicFiles = ref([]);
    const privateFiles = ref([]);
    const protectedFiles = ref([]);
    const publicLoading = ref(false);
    const privateLoading = ref(false);
    const protectedLoading = ref(false);
    const publicError = ref("");
    const privateError = ref("");
    const protectedError = ref("");
    const catalog = ref({
      public: [],
      private: [],
      protected: []
    });
    const maxUploadBytes = ref(5 * 1024 * 1024);
    const activeTab = ref("public");
    const search = ref("");
    const uploadFile = ref(null);
    ref(false);
    const uploadError = ref("");
    const uploadSuccess = ref("");
    const selectedSlug = ref("");
    const selectedMonth = ref("");
    const selectedExpiry = ref("");
    const fileInput = ref(null);
    async function bootstrap() {
      sessionLoading.value = true;
      sessionError.value = "";
      loopDetected.value = false;
      try {
        const meRes = await fetch(`${DOCS_API}/me`, { credentials: "include" });
        let meBody = {};
        if (meRes.ok) {
          meBody = await meRes.json().catch(() => ({}));
        }
        if (!meRes.ok || meBody.authenticated !== true) {
          if (typeof window === "undefined") return;
          const marker = Number(window.sessionStorage.getItem(LOGIN_MARKER_KEY) || 0);
          if (marker && Date.now() - marker < LOGIN_COOLDOWN_MS) {
            window.sessionStorage.removeItem(LOGIN_MARKER_KEY);
            loopDetected.value = true;
            return;
          }
          window.sessionStorage.setItem(LOGIN_MARKER_KEY, String(Date.now()));
          redirecting.value = true;
          const redirect = encodeURIComponent(window.location.href);
          window.location.href = `${DOCS_API}/login?redirect=${redirect}`;
          return;
        }
        if (typeof window !== "undefined") {
          window.sessionStorage.removeItem(LOGIN_MARKER_KEY);
        }
        isAuthenticated.value = true;
        isNebras.value = meBody.isNebras === true;
        myOrgs.value = Array.isArray(meBody.orgs) ? meBody.orgs : [];
        await Promise.all([loadPublic(), loadPrivate(), loadProtected(), loadCatalog()]);
        if (canManageGrants.value) await loadGrants();
      } catch (e) {
        sessionError.value = e instanceof Error ? e.message : String(e);
      } finally {
        if (!redirecting.value) sessionLoading.value = false;
      }
    }
    async function loadPublic() {
      publicLoading.value = true;
      publicError.value = "";
      try {
        const res = await fetch(`${DOCS_API}/${orgId.value}/public`, { credentials: "include" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const body = await res.json();
        publicFiles.value = Array.isArray(body) ? body : [];
      } catch (e) {
        publicError.value = e instanceof Error ? e.message : String(e);
        publicFiles.value = [];
      } finally {
        publicLoading.value = false;
      }
    }
    async function loadPrivate() {
      privateLoading.value = true;
      privateError.value = "";
      try {
        const res = await fetch(`${DOCS_API}/${orgId.value}/private`, { credentials: "include" });
        if (res.status === 403 || res.status === 401) {
          canSeePrivate.value = false;
          privateFiles.value = [];
          return;
        }
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        canSeePrivate.value = true;
        const body = await res.json();
        privateFiles.value = Array.isArray(body) ? body : [];
      } catch (e) {
        privateError.value = e instanceof Error ? e.message : String(e);
        privateFiles.value = [];
      } finally {
        privateLoading.value = false;
      }
    }
    async function loadProtected() {
      protectedLoading.value = true;
      protectedError.value = "";
      try {
        const res = await fetch(`${DOCS_API}/${orgId.value}/protected`, { credentials: "include" });
        if (res.status === 403 || res.status === 401) {
          canSeeProtected.value = false;
          protectedFiles.value = [];
          return;
        }
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        canSeeProtected.value = true;
        const body = await res.json();
        protectedFiles.value = Array.isArray(body) ? body : [];
      } catch (e) {
        protectedError.value = e instanceof Error ? e.message : String(e);
        protectedFiles.value = [];
      } finally {
        protectedLoading.value = false;
      }
    }
    async function loadCatalog() {
      try {
        const res = await fetch(`${DOCS_API}/catalog?orgId=${encodeURIComponent(orgId.value)}`);
        if (!res.ok) return;
        const body = await res.json();
        catalog.value = {
          public: Array.isArray(body.public) ? body.public : [],
          private: Array.isArray(body.private) ? body.private : [],
          protected: Array.isArray(body.protected) ? body.protected : []
        };
        if (typeof body.maxUploadBytes === "number" && Number.isFinite(body.maxUploadBytes) && body.maxUploadBytes > 0) {
          maxUploadBytes.value = body.maxUploadBytes;
        }
      } catch {
        catalog.value = { public: [], private: [], protected: [] };
      }
    }
    onMounted(() => {
      void bootstrap();
    });
    watch(orgId, () => {
      void bootstrap();
    });
    watch(activeTab, () => {
      selectedSlug.value = "";
      selectedMonth.value = "";
      selectedExpiry.value = "";
      uploadFile.value = null;
      uploadError.value = "";
      uploadSuccess.value = "";
      if (fileInput.value) fileInput.value.value = "";
    });
    watch(selectedSlug, () => {
      selectedMonth.value = "";
      selectedExpiry.value = "";
    });
    const activeFiles = computed(
      () => activeTab.value === "private" ? privateFiles.value : activeTab.value === "protected" ? protectedFiles.value : publicFiles.value
    );
    const activeLoading = computed(
      () => activeTab.value === "private" ? privateLoading.value : activeTab.value === "protected" ? protectedLoading.value : publicLoading.value
    );
    const activeError = computed(
      () => activeTab.value === "private" ? privateError.value : activeTab.value === "protected" ? protectedError.value : publicError.value
    );
    const activeCatalog = computed(
      () => activeTab.value === "private" ? catalog.value.private : activeTab.value === "protected" ? catalog.value.protected : catalog.value.public
    );
    const monthlySlugSet = computed(
      () => new Set(activeCatalog.value.filter((c) => c.monthly).map((c) => c.slug))
    );
    function parseMonthly(fileName) {
      const dot = fileName.lastIndexOf(".");
      const base = dot > 0 ? fileName.slice(0, dot) : fileName;
      const m = base.match(/^(.+)-(\d{4}-\d{2})$/);
      const slug = m == null ? void 0 : m[1];
      const month = m == null ? void 0 : m[2];
      if (!slug || !month) return null;
      return { slug, month };
    }
    function isMonthlyFile(f) {
      const parsed = parseMonthly(f.file);
      return !!parsed && monthlySlugSet.value.has(parsed.slug);
    }
    const COMBINED_MONTHLY_GROUPS = [
      {
        key: "lfi-collection-memos",
        heading: "LFI Collection Memos",
        members: [
          { slug: "lfi-collection-memo", typeLabel: "Collection Memo" },
          { slug: "lfi-collection-memo-supporting-data", typeLabel: "Supporting Data" }
        ]
      },
      {
        key: "tpp-invoices",
        heading: "TPP Invoices",
        members: [
          { slug: "tpp-invoice", typeLabel: "Invoice" },
          { slug: "tpp-invoice-supporting-data", typeLabel: "Supporting Data" }
        ]
      }
    ];
    const combinedBySlug = /* @__PURE__ */ new Map();
    for (const cfg of COMBINED_MONTHLY_GROUPS) {
      cfg.members.forEach(
        (m, i) => combinedBySlug.set(m.slug, { config: cfg, order: i, typeLabel: m.typeLabel })
      );
    }
    const monthlyGroups = computed(() => {
      var _a;
      const groups = /* @__PURE__ */ new Map();
      for (const f of activeFiles.value) {
        const parsed = parseMonthly(f.file);
        if (!parsed || !monthlySlugSet.value.has(parsed.slug)) continue;
        const combined = combinedBySlug.get(parsed.slug);
        const key = combined ? combined.config.key : parsed.slug;
        let g = groups.get(key);
        if (!g) {
          const label = combined ? combined.config.heading : ((_a = activeCatalog.value.find((c) => c.slug === parsed.slug)) == null ? void 0 : _a.label) || parsed.slug;
          g = { slug: key, label, items: [] };
          groups.set(key, g);
        }
        g.items.push({
          entry: f,
          month: parsed.month,
          typeLabel: combined == null ? void 0 : combined.typeLabel,
          order: (combined == null ? void 0 : combined.order) ?? 0
        });
      }
      for (const g of groups.values())
        g.items.sort((a, b) => b.month.localeCompare(a.month) || a.order - b.order);
      return [...groups.values()].sort((a, b) => a.label.localeCompare(b.label));
    });
    function monthCount(group) {
      return new Set(group.items.map((i) => i.month)).size;
    }
    function formatMonth(month) {
      const m = month.match(/^(\d{4})-(\d{2})$/);
      if (!m) return month;
      const d = new Date(Number(m[1]), Number(m[2]) - 1, 1);
      if (Number.isNaN(d.getTime())) return month;
      return d.toLocaleDateString("en-GB", { month: "long", year: "numeric" });
    }
    const filteredFiles = computed(() => {
      const base = activeFiles.value.filter((f) => !isMonthlyFile(f));
      const q = search.value.toLowerCase().trim();
      if (!q) return base;
      return base.filter((f) => f.file.toLowerCase().includes(q));
    });
    const filteredMonthlyGroups = computed(() => {
      const q = search.value.toLowerCase().trim();
      if (!q) return monthlyGroups.value;
      return monthlyGroups.value.map((g) => ({
        ...g,
        items: g.items.filter(
          (it) => {
            var _a;
            return g.label.toLowerCase().includes(q) || it.month.includes(q) || formatMonth(it.month).toLowerCase().includes(q) || (((_a = it.typeLabel) == null ? void 0 : _a.toLowerCase().includes(q)) ?? false) || it.entry.file.toLowerCase().includes(q);
          }
        )
      })).filter((g) => g.items.length > 0);
    });
    const hasAnyFiles = computed(
      () => filteredFiles.value.length > 0 || filteredMonthlyGroups.value.length > 0
    );
    const selectedEntry = computed(
      () => activeCatalog.value.find((c) => c.slug === selectedSlug.value)
    );
    computed(() => {
      var _a;
      return ((_a = selectedEntry.value) == null ? void 0 : _a.label) || "";
    });
    const selectedMonthly = computed(() => {
      var _a;
      return ((_a = selectedEntry.value) == null ? void 0 : _a.monthly) === true;
    });
    const selectedNeedsExpiry = computed(() => {
      var _a;
      return ((_a = selectedEntry.value) == null ? void 0 : _a.expiry) === true;
    });
    computed(
      () => !!selectedSlug.value && (!selectedMonthly.value || !!selectedMonth.value) && (!selectedNeedsExpiry.value || !!selectedExpiry.value)
    );
    const uploadBaseName = computed(() => {
      if (!selectedSlug.value) return "";
      if (selectedMonthly.value) {
        return selectedMonth.value ? `${selectedSlug.value}-${selectedMonth.value}` : "";
      }
      return selectedSlug.value;
    });
    computed(() => {
      if (!uploadBaseName.value) return false;
      return activeFiles.value.some((f) => f.file.startsWith(`${uploadBaseName.value}.`));
    });
    function fileType(name) {
      const ext = name.split(".").pop();
      return ext && ext !== name ? ext.toUpperCase() : "";
    }
    function formatDate(iso) {
      if (!iso) return "";
      const d = new Date(iso);
      if (Number.isNaN(d.getTime())) return "";
      return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
    }
    function expiryInfo(entry) {
      const raw = entry.expiry;
      if (!raw) return null;
      const d = /* @__PURE__ */ new Date(`${raw}T00:00:00Z`);
      if (Number.isNaN(d.getTime())) return null;
      const days = Math.floor((d.getTime() - Date.now()) / 864e5);
      const state = days < 0 ? "expired" : days <= EXPIRY_SOON_DAYS ? "soon" : "ok";
      const text = state === "expired" ? `Expired ${formatDate(raw)}` : `Expires ${formatDate(raw)}`;
      return { text, state };
    }
    const typeLabel = computed(() => {
      var _a;
      const t = (_a = org.value) == null ? void 0 : _a.type;
      if (!t) return "";
      if (t === "LFI") return "Licensed Financial Institution";
      if (t === "TPP") return "Third Party Provider";
      return t;
    });
    const typeColor = computed(() => {
      var _a;
      const t = (_a = org.value) == null ? void 0 : _a.type;
      if (t === "LFI") return "var(--at-teal)";
      if (t === "TPP") return "var(--at-gold)";
      return "var(--at-blue-deep)";
    });
    const orgName = computed(() => {
      var _a;
      return ((_a = org.value) == null ? void 0 : _a.name) ?? "";
    });
    const orgLegalName = computed(() => {
      var _a;
      return ((_a = org.value) == null ? void 0 : _a.legalName) ?? "";
    });
    const orgLogo = computed(() => {
      var _a;
      return ((_a = org.value) == null ? void 0 : _a.logoUri) ?? "";
    });
    const canManageGrants = computed(
      () => isNebras.value || myOrgs.value.includes(orgId.value)
    );
    const grantedOrgIds = ref([]);
    const grantsLoading = ref(false);
    const grantsSaving = ref(false);
    const grantsError = ref("");
    const grantsSuccess = ref("");
    const grantSelect = ref("");
    function orgNameById(id) {
      var _a;
      return ((_a = docRepoOrgs.find((o) => o.id === id)) == null ? void 0 : _a.name) || id;
    }
    const grantedOrgs = computed(
      () => grantedOrgIds.value.map((id) => ({ id, name: orgNameById(id) })).sort((a, b) => a.name.localeCompare(b.name))
    );
    const ungrantedOrgs = computed(
      () => docRepoOrgs.filter((o) => o.id !== orgId.value && o.id !== NEBRAS_ORG_ID && !grantedOrgIds.value.includes(o.id)).map((o) => ({ id: o.id, name: o.name })).sort((a, b) => a.name.localeCompare(b.name))
    );
    function applyGrantsResponse(body) {
      grantedOrgIds.value = Array.isArray(body.orgs) ? body.orgs.filter((o) => typeof o === "string") : [];
    }
    async function loadGrants() {
      grantsLoading.value = true;
      grantsError.value = "";
      try {
        const res = await fetch(`${DOCS_API}/${orgId.value}/grants`, { credentials: "include" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        applyGrantsResponse(await res.json());
      } catch (e) {
        grantsError.value = e instanceof Error ? e.message : String(e);
      } finally {
        grantsLoading.value = false;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_router_link = resolveComponent("router-link");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-5030f16e>`);
      if (!unref(org)) {
        _push(`<section class="ed-doc-gate" data-v-5030f16e><div class="ed-doc-gate__inner" data-v-5030f16e><h2 class="ed-doc-gate__title" data-v-5030f16e>Organisation not found</h2><p class="ed-doc-gate__sub" data-v-5030f16e> No organisation matches <strong data-v-5030f16e>${ssrInterpolate(unref(orgId))}</strong>. </p>`);
        _push(ssrRenderComponent(_component_router_link, {
          to: "/doc-repository/",
          class: "ed-doc-button"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` All organisations `);
            } else {
              return [
                createTextVNode(" All organisations ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></section>`);
      } else {
        _push(`<!--[-->`);
        if (unref(sessionLoading) || unref(redirecting)) {
          _push(`<section class="ed-doc-gate" data-v-5030f16e><div class="ed-doc-gate__inner" data-v-5030f16e><div class="ed-doc-gate__spinner" data-v-5030f16e></div><div class="ed-doc-gate__text" data-v-5030f16e>${ssrInterpolate(unref(redirecting) ? "Redirecting to sign-in…" : "Checking access…")}</div></div></section>`);
        } else if (unref(loopDetected)) {
          _push(`<section class="ed-doc-gate" data-v-5030f16e><div class="ed-doc-gate__inner" data-v-5030f16e><h2 class="ed-doc-gate__title" data-v-5030f16e>Sign-in didn&#39;t complete</h2><p class="ed-doc-gate__sub" data-v-5030f16e> We tried to sign you in but the session didn&#39;t stick. Try again, and if this keeps happening, check that third-party cookies are allowed for this site. </p><button type="button" class="ed-doc-button" data-v-5030f16e>Try again</button></div></section>`);
        } else if (unref(sessionError)) {
          _push(`<section class="ed-doc-gate" data-v-5030f16e><div class="ed-doc-gate__inner" data-v-5030f16e><h2 class="ed-doc-gate__title" data-v-5030f16e>Couldn&#39;t load this page</h2><p class="ed-doc-gate__sub" data-v-5030f16e><strong data-v-5030f16e>${ssrInterpolate(unref(sessionError))}</strong></p><button type="button" class="ed-doc-button" data-v-5030f16e>Try again</button></div></section>`);
        } else {
          _push(`<!--[--><section class="ed-doc-back" data-v-5030f16e><div class="ed-doc-back__inner" data-v-5030f16e>`);
          _push(ssrRenderComponent(_component_router_link, {
            to: "/doc-repository/",
            class: "ed-doc-back__link"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<span class="ed-doc-back__arrow" data-v-5030f16e${_scopeId}>←</span><span class="ed-doc-back__text" data-v-5030f16e${_scopeId}>All organisations</span>`);
              } else {
                return [
                  createVNode("span", { class: "ed-doc-back__arrow" }, "←"),
                  createVNode("span", { class: "ed-doc-back__text" }, "All organisations")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div></section><section class="ed-doc-hero" style="${ssrRenderStyle({ "--accent": unref(typeColor) })}" data-v-5030f16e><div class="ed-doc-hero__inner" data-v-5030f16e><div class="ed-doc-hero__main" data-v-5030f16e>`);
          if (unref(typeLabel)) {
            _push(`<div class="ed-doc-hero__label" data-v-5030f16e><span class="ed-doc-hero__label-dash" data-v-5030f16e></span> ${ssrInterpolate(unref(typeLabel))}</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="ed-doc-hero__head" data-v-5030f16e>`);
          if (unref(orgLogo)) {
            _push(`<img${ssrRenderAttr("src", unref(orgLogo))}${ssrRenderAttr("alt", unref(orgName))} class="ed-doc-hero__logo" data-v-5030f16e>`);
          } else {
            _push(`<div class="ed-doc-hero__logo ed-doc-hero__logo--placeholder" data-v-5030f16e>${ssrInterpolate(unref(orgName).charAt(0))}</div>`);
          }
          _push(`<div data-v-5030f16e><h1 class="ed-doc-hero__title" data-v-5030f16e>${ssrInterpolate(unref(orgName))}</h1>`);
          if (unref(orgLegalName) && unref(orgLegalName) !== unref(orgName)) {
            _push(`<p class="ed-doc-hero__legal" data-v-5030f16e>${ssrInterpolate(unref(orgLegalName))}</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div><p class="ed-doc-hero__sub" data-v-5030f16e> Documents published by this organisation as part of UAE Open Finance. Public documents are visible to all participants. Protected documents are visible to this organisation and any other organisation it chooses to share with. Private documents are visible only to authorised users within this organisation. </p></div></div></section><section class="ed-doc-body" data-v-5030f16e><div class="ed-doc-body__inner" data-v-5030f16e><div class="ed-doc-tabs" role="tablist" data-v-5030f16e><button type="button" role="tab"${ssrRenderAttr("aria-selected", unref(activeTab) === "public")} class="${ssrRenderClass([{ "ed-doc-tab--active": unref(activeTab) === "public" }, "ed-doc-tab"])}" style="${ssrRenderStyle(unref(activeTab) === "public" ? { background: unref(typeColor), borderColor: unref(typeColor), color: "var(--at-bg-cream)" } : {})}" data-v-5030f16e><svg class="ed-doc-tab__icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-v-5030f16e><circle cx="12" cy="12" r="10" data-v-5030f16e></circle><path d="M2 12h20" data-v-5030f16e></path><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" data-v-5030f16e></path></svg> Public Documents <span class="ed-doc-tab__count" data-v-5030f16e>(${ssrInterpolate(unref(publicFiles).length)})</span></button>`);
          if (unref(canSeeProtected)) {
            _push(`<button type="button" role="tab"${ssrRenderAttr("aria-selected", unref(activeTab) === "protected")} class="${ssrRenderClass([{ "ed-doc-tab--active": unref(activeTab) === "protected" }, "ed-doc-tab"])}" style="${ssrRenderStyle(unref(activeTab) === "protected" ? { background: unref(typeColor), borderColor: unref(typeColor), color: "var(--at-bg-cream)" } : {})}" data-v-5030f16e><svg class="ed-doc-tab__icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-v-5030f16e><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" data-v-5030f16e></path></svg> Protected Documents <span class="ed-doc-tab__count" data-v-5030f16e>(${ssrInterpolate(unref(protectedFiles).length)})</span></button>`);
          } else {
            _push(`<!---->`);
          }
          if (unref(canSeePrivate)) {
            _push(`<button type="button" role="tab"${ssrRenderAttr("aria-selected", unref(activeTab) === "private")} class="${ssrRenderClass([{ "ed-doc-tab--active": unref(activeTab) === "private" }, "ed-doc-tab"])}" style="${ssrRenderStyle(unref(activeTab) === "private" ? { background: unref(typeColor), borderColor: unref(typeColor), color: "var(--at-bg-cream)" } : {})}" data-v-5030f16e><svg class="ed-doc-tab__icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-v-5030f16e><rect x="3" y="11" width="18" height="11" rx="2" ry="2" data-v-5030f16e></rect><path d="M7 11V7a5 5 0 0 1 10 0v4" data-v-5030f16e></path></svg> Private Documents <span class="ed-doc-tab__count" data-v-5030f16e>(${ssrInterpolate(unref(privateFiles).length)})</span></button>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
          if (unref(isNebras) && !UPLOADS_ENABLED) {
            _push(`<div class="ed-doc-upload" data-v-5030f16e><div class="ed-doc-upload__empty" data-v-5030f16e> Document uploads are currently disabled. </div></div>`);
          } else {
            _push(`<!---->`);
          }
          if (unref(isNebras) && UPLOADS_ENABLED) ;
          else {
            _push(`<!---->`);
          }
          if (unref(activeTab) === "protected" && unref(canManageGrants)) {
            _push(`<div class="ed-doc-share" data-v-5030f16e><div class="ed-doc-share__head" data-v-5030f16e><span class="ed-doc-share__title" data-v-5030f16e>Shared with</span><span class="ed-doc-share__hint" data-v-5030f16e> Choose which organisations can read ${ssrInterpolate(unref(orgName))}&#39;s protected documents. Any member of a shared organisation gains access. </span></div>`);
            if (unref(grantsLoading)) {
              _push(`<div class="ed-doc-share__empty" data-v-5030f16e>Loading shares…</div>`);
            } else {
              _push(`<!--[-->`);
              if (unref(grantedOrgs).length) {
                _push(`<div class="ed-doc-share__chips" data-v-5030f16e><!--[-->`);
                ssrRenderList(unref(grantedOrgs), (g) => {
                  _push(`<span class="ed-doc-share__chip" data-v-5030f16e>${ssrInterpolate(g.name)} <button type="button" class="ed-doc-share__chip-remove"${ssrIncludeBooleanAttr(unref(grantsSaving)) ? " disabled" : ""}${ssrRenderAttr("aria-label", `Stop sharing with ${g.name}`)} data-v-5030f16e>×</button></span>`);
                });
                _push(`<!--]--></div>`);
              } else {
                _push(`<div class="ed-doc-share__empty" data-v-5030f16e> Not shared with any organisation yet. Only ${ssrInterpolate(unref(orgName))} and Nebras can see these documents. </div>`);
              }
              _push(`<div class="ed-doc-share__row" data-v-5030f16e><select class="ed-doc-upload__select"${ssrIncludeBooleanAttr(unref(grantsSaving)) ? " disabled" : ""} data-v-5030f16e><option value="" disabled data-v-5030f16e${ssrIncludeBooleanAttr(Array.isArray(unref(grantSelect)) ? ssrLooseContain(unref(grantSelect), "") : ssrLooseEqual(unref(grantSelect), "")) ? " selected" : ""}>Add an organisation…</option><!--[-->`);
              ssrRenderList(unref(ungrantedOrgs), (o) => {
                _push(`<option${ssrRenderAttr("value", o.id)} data-v-5030f16e${ssrIncludeBooleanAttr(Array.isArray(unref(grantSelect)) ? ssrLooseContain(unref(grantSelect), o.id) : ssrLooseEqual(unref(grantSelect), o.id)) ? " selected" : ""}>${ssrInterpolate(o.name)}</option>`);
              });
              _push(`<!--]--></select><button type="button" class="ed-doc-button"${ssrIncludeBooleanAttr(unref(grantsSaving) || !unref(grantSelect)) ? " disabled" : ""} data-v-5030f16e>${ssrInterpolate(unref(grantsSaving) ? "Saving…" : "Add")}</button></div>`);
              if (unref(grantsError)) {
                _push(`<div class="ed-doc-upload__error" data-v-5030f16e>${ssrInterpolate(unref(grantsError))}</div>`);
              } else {
                _push(`<!---->`);
              }
              if (unref(grantsSuccess)) {
                _push(`<div class="ed-doc-upload__success" data-v-5030f16e>${ssrInterpolate(unref(grantsSuccess))}</div>`);
              } else {
                _push(`<!---->`);
              }
              _push(`<!--]-->`);
            }
            _push(`</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="ed-doc-search" data-v-5030f16e><svg class="ed-doc-search__icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-v-5030f16e><circle cx="11" cy="11" r="8" data-v-5030f16e></circle><path d="m21 21-4.35-4.35" data-v-5030f16e></path></svg><input${ssrRenderAttr("value", unref(search))} class="ed-doc-search__input" type="search" placeholder="Search documents…" aria-label="Search documents" data-v-5030f16e>`);
          if (unref(search)) {
            _push(`<button type="button" class="ed-doc-search__clear" aria-label="Clear search" data-v-5030f16e>×</button>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
          if (unref(activeLoading)) {
            _push(`<div class="ed-doc-list" data-v-5030f16e><!--[-->`);
            ssrRenderList(3, (n) => {
              _push(`<div class="ed-doc-row ed-doc-row--skeleton" data-v-5030f16e><span class="ed-doc-skel ed-doc-skel--name" data-v-5030f16e></span><span class="ed-doc-skel ed-doc-skel--meta" data-v-5030f16e></span><span class="ed-doc-skel ed-doc-skel--btn" data-v-5030f16e></span></div>`);
            });
            _push(`<!--]--></div>`);
          } else if (unref(activeError)) {
            _push(`<div class="ed-doc-list" data-v-5030f16e><div class="ed-doc-empty" data-v-5030f16e> Could not load documents: <strong data-v-5030f16e>${ssrInterpolate(unref(activeError))}</strong></div></div>`);
          } else {
            _push(`<!--[--><!--[-->`);
            ssrRenderList(unref(filteredMonthlyGroups), (group) => {
              _push(`<section class="ed-doc-group" data-v-5030f16e><div class="ed-doc-group__head" data-v-5030f16e><h2 class="ed-doc-group__title" data-v-5030f16e>${ssrInterpolate(group.label)}</h2><span class="ed-doc-group__count" data-v-5030f16e>${ssrInterpolate(monthCount(group))} ${ssrInterpolate(monthCount(group) === 1 ? "month" : "months")}</span></div><div class="ed-doc-list" data-v-5030f16e><!--[-->`);
              ssrRenderList(group.items, (item) => {
                _push(`<div class="ed-doc-row" data-v-5030f16e><div class="ed-doc-row__icon" style="${ssrRenderStyle({ borderColor: unref(typeColor), color: unref(typeColor) })}" data-v-5030f16e><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-v-5030f16e><rect x="3" y="4" width="18" height="18" rx="2" ry="2" data-v-5030f16e></rect><line x1="16" y1="2" x2="16" y2="6" data-v-5030f16e></line><line x1="8" y1="2" x2="8" y2="6" data-v-5030f16e></line><line x1="3" y1="10" x2="21" y2="10" data-v-5030f16e></line></svg></div><div class="ed-doc-row__body" data-v-5030f16e><h3 class="ed-doc-row__title" data-v-5030f16e>${ssrInterpolate(formatMonth(item.month))}`);
                if (item.typeLabel) {
                  _push(`<!--[--> · ${ssrInterpolate(item.typeLabel)}<!--]-->`);
                } else {
                  _push(`<!---->`);
                }
                _push(`</h3><div class="ed-doc-row__meta" data-v-5030f16e>`);
                if (fileType(item.entry.file)) {
                  _push(`<span data-v-5030f16e>${ssrInterpolate(fileType(item.entry.file))}</span>`);
                } else {
                  _push(`<!---->`);
                }
                if (fileType(item.entry.file) && item.entry.date) {
                  _push(`<span class="ed-doc-row__sep" data-v-5030f16e>·</span>`);
                } else {
                  _push(`<!---->`);
                }
                if (item.entry.date) {
                  _push(`<span data-v-5030f16e>Uploaded ${ssrInterpolate(formatDate(item.entry.date))}</span>`);
                } else {
                  _push(`<!---->`);
                }
                if (expiryInfo(item.entry)) {
                  _push(`<!--[--><span class="ed-doc-row__sep" data-v-5030f16e>·</span><span class="${ssrRenderClass([`ed-doc-row__expiry--${expiryInfo(item.entry).state}`, "ed-doc-row__expiry"])}" data-v-5030f16e>${ssrInterpolate(expiryInfo(item.entry).text)}</span><!--]-->`);
                } else {
                  _push(`<!---->`);
                }
                _push(`</div></div><button type="button" class="ed-doc-button" data-v-5030f16e> Download </button></div>`);
              });
              _push(`<!--]--></div></section>`);
            });
            _push(`<!--]-->`);
            if (unref(filteredFiles).length) {
              _push(`<div class="ed-doc-list" data-v-5030f16e><!--[-->`);
              ssrRenderList(unref(filteredFiles), (file) => {
                _push(`<div class="ed-doc-row" data-v-5030f16e><div class="ed-doc-row__icon" style="${ssrRenderStyle({ borderColor: unref(typeColor), color: unref(typeColor) })}" data-v-5030f16e><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-v-5030f16e><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" data-v-5030f16e></path><polyline points="14 2 14 8 20 8" data-v-5030f16e></polyline></svg></div><div class="ed-doc-row__body" data-v-5030f16e><h3 class="ed-doc-row__title" data-v-5030f16e>${ssrInterpolate(file.file)}</h3><div class="ed-doc-row__meta" data-v-5030f16e>`);
                if (fileType(file.file)) {
                  _push(`<span data-v-5030f16e>${ssrInterpolate(fileType(file.file))}</span>`);
                } else {
                  _push(`<!---->`);
                }
                if (fileType(file.file) && file.date) {
                  _push(`<span class="ed-doc-row__sep" data-v-5030f16e>·</span>`);
                } else {
                  _push(`<!---->`);
                }
                if (file.date) {
                  _push(`<span data-v-5030f16e>${ssrInterpolate(formatDate(file.date))}</span>`);
                } else {
                  _push(`<!---->`);
                }
                if (expiryInfo(file)) {
                  _push(`<!--[--><span class="ed-doc-row__sep" data-v-5030f16e>·</span><span class="${ssrRenderClass([`ed-doc-row__expiry--${expiryInfo(file).state}`, "ed-doc-row__expiry"])}" data-v-5030f16e>${ssrInterpolate(expiryInfo(file).text)}</span><!--]-->`);
                } else {
                  _push(`<!---->`);
                }
                _push(`</div></div><button type="button" class="ed-doc-button" data-v-5030f16e> Download </button></div>`);
              });
              _push(`<!--]--></div>`);
            } else {
              _push(`<!---->`);
            }
            if (!unref(hasAnyFiles)) {
              _push(`<div class="ed-doc-list" data-v-5030f16e><div class="ed-doc-empty" data-v-5030f16e>`);
              if (unref(search)) {
                _push(`<!--[--> No documents match <strong data-v-5030f16e>&quot;${ssrInterpolate(unref(search))}&quot;</strong>. <!--]-->`);
              } else {
                _push(`<!--[--> No ${ssrInterpolate(unref(activeTab))} documents available. <!--]-->`);
              }
              _push(`</div></div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`<!--]-->`);
          }
          _push(`</div></section><!--]-->`);
        }
        _push(`<!--]-->`);
      }
      _push(`</div>`);
    };
  }
});
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/doc-repository/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-5030f16e"]]);
export {
  _id_ as default
};
