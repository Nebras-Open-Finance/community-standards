<template>
  <div class="homepage">

    <PageHeader />


    <div class="section">
      <div class="section-heading">
        Metrics & Monitoring
      </div>


          <h2
            style="font-size: xx-large; font-weight: 500; margin-bottom: 10px; opacity: 70%; margin-top: 2rem; margin-bottom: 1rem; font-weight: 500;">
            API</h2>

      <div class="chart-row">
        <div class="chart-col">
          <h4
            style="font-size: larger; font-weight: 500; margin-bottom: 10px; opacity: 70%; margin-top: 2rem; margin-bottom: 1rem; font-weight: 500;">
            API Calls by Month</h4>


          <APIVolBarChart />
        </div>

        <div class="chart-col">
          <h4
            style="font-size: larger; font-weight: 500; margin-bottom: 10px; opacity: 70%; margin-top: 2rem; margin-bottom: 1rem; text-align: left; font-weight: 500;">
            API Calls by Bank</h4>

          <APIVolByBankBarChart />
        </div>
      </div>



      <div class="chart-row">
        <div class="chart-col">
          <h4
            style="font-size: larger; font-weight: 500; margin-bottom: 10px; opacity: 70%; margin-top: 2rem; margin-bottom: 1rem; font-weight: 500;">
            API Response Time by Month</h4>


          <APIResponseBarChart />
        </div>

        <div class="chart-col">
          <h4
            style="font-size: larger; font-weight: 500; margin-bottom: 10px; opacity: 70%; margin-top: 2rem; margin-bottom: 1rem; text-align: left; font-weight: 500;">
            API Error Rate by Month</h4>


          <APIErrorRatesBarChart />
        </div>
      </div>


      <div class="chart-row">
        <div class="chart-col">
          <h4
            style="font-size: larger; font-weight: 500; margin-bottom: 10px; opacity: 70%; margin-top: 2rem; margin-bottom: 1rem; font-weight: 500;">
            API Calls by API Family</h4>


          <APIVolByFamilyBarChart />

        </div>

        <div class="chart-col">
          <h4
            style="font-size: larger; font-weight: 500; margin-bottom: 10px; opacity: 70%; margin-top: 2rem; margin-bottom: 1rem; text-align: left; font-weight: 500;">
            API Calls by Endpoint (Data Sharing)</h4>


          <APIEndpointDSBarChart />
        </div>
      </div>

      <div class="chart-row">
        <div class="chart-col">
          <h4
            style="font-size: larger; font-weight: 500; margin-bottom: 10px; opacity: 70%; margin-top: 2rem; margin-bottom: 1rem; font-weight: 500;">
            API Calls by TPP</h4>


          <APIVolByTPPBarChart />

        </div>
      </div>
    </div>
    <div class="section-4">

          <h2
            style="font-size: xx-large; font-weight: 500; margin-bottom: 10px; opacity: 70%; margin-top: 2rem; margin-bottom: 1rem; font-weight: 500;">
            Payments</h2>

      <div class="chart-row">
        <div class="chart-col">
          <h4
            style="font-size: larger; font-weight: 500; margin-bottom: 10px; opacity: 70%; margin-top: 2rem; margin-bottom: 1rem; font-weight: 500;">
            Payment Amount by Month</h4>


          <PaymentAmountByMonthChart />
        </div>

        <div class="chart-col">
          <h4
            style="font-size: larger; font-weight: 500; margin-bottom: 10px; opacity: 70%; margin-top: 2rem; margin-bottom: 1rem; text-align: left; font-weight: 500;">
            Payment Count by Month</h4>

          <PaymentCountByMonthChart />
        </div>
      </div>

      <div class="chart-row">
        <div class="chart-col">
          <h4
            style="font-size: larger; font-weight: 500; margin-bottom: 10px; opacity: 70%; margin-top: 2rem; margin-bottom: 1rem; font-weight: 500;">
            Payment Amount by Bank</h4>


          <PaymentAmountByBankChart />
        </div>

        <div class="chart-col">
          <h4
            style="font-size: larger; font-weight: 500; margin-bottom: 10px; opacity: 70%; margin-top: 2rem; margin-bottom: 1rem; text-align: left; font-weight: 500;">
             Payment Count by Bank</h4>

          <PaymentCountByBankChart />
        </div>
      </div>

      <div class="chart-row">
        <div class="chart-col">
          <h4
            style="font-size: larger; font-weight: 500; margin-bottom: 10px; opacity: 70%; margin-top: 2rem; margin-bottom: 1rem; font-weight: 500;">
            Payment Amount by Bank & Consent Type</h4>

          <PaymentAmountByConsentAndBankChart />
        </div>

        <div class="chart-col">
          <h4
            style="font-size: larger; font-weight: 500; margin-bottom: 10px; opacity: 70%; margin-top: 2rem; margin-bottom: 1rem; text-align: left; font-weight: 500;">
            Payment Count by Bank & Consent Type</h4>

          <PaymentCountByConsentAndBankChart />
        </div>
      </div>

      <div class="chart-row">
        <div class="chart-col">
          <h4
            style="font-size: larger; font-weight: 500; margin-bottom: 10px; opacity: 70%; margin-top: 2rem; margin-bottom: 1rem; font-weight: 500;">
            Payment Success Rate by Bank</h4>


          <PaymentSuccessRateByBankChart />
        </div>

        <div class="chart-col">
          <h4
            style="font-size: larger; font-weight: 500; margin-bottom: 10px; opacity: 70%; margin-top: 2rem; margin-bottom: 1rem; text-align: left; font-weight: 500;">
             Avg Successful Payment Amount by Bank</h4>

          <PaymentAvgAmountByBankChart />
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import PageHeader from './Components/PageHeader.vue'

import APIVolBarChart from './Charts/APIVolBarChart.vue'
import APIVolByBankBarChart from './Charts/APIVolByBankBarChart.vue'
import APIResponseBarChart from './Charts/APIResponseBarChart.vue'
import APIErrorRatesBarChart from './Charts/APIErrorRatesBarChart.vue'
import APIVolByFamilyBarChart from './Charts/APIVolByFamilyBarChart.vue'
import APIEndpointDSBarChart from './Charts/APIEndpointDSBarChart.vue'
import APIVolByTPPBarChart from './Charts/APIVolByTPPBarChart.vue'

import PaymentCountByMonthChart from './Charts/PaymentCountByMonthChart.vue'
import PaymentAmountByMonthChart from './Charts/PaymentAmountByMonthChart.vue'
import PaymentCountByBankChart from './Charts/PaymentCountByBankChart.vue'
import PaymentAmountByBankChart from './Charts/PaymentAmountByBankChart.vue'
import PaymentAmountByConsentAndBankChart from './Charts/PaymentAmountByConsentAndBankChart.vue'
import PaymentCountByConsentAndBankChart from './Charts/PaymentCountByConsentAndBankChart.vue'
import PaymentSuccessRateByBankChart from './Charts/PaymentSuccessRateByBankChart.vue'
import PaymentAvgAmountByBankChart from './Charts/PaymentAvgAmountByBankChart.vue'

// const apiVolByLFI = ref([])

// const loadApiVolByLFI = async () => {
//   try {
//     const response = await fetch('/metrics/api-vol.json')

//     const data = await response.json()

//     const grouped = data.reduce((acc, { lfinamekey, apicallcount }) => {
//       if (!lfinamekey || !apicallcount) return acc
//       const key = lfinamekey.trim()
//       const val = Number(apicallcount)
//       if (Number.isNaN(val)) return acc
//       acc[key] = (acc[key] || 0) + val
//       return acc
//     }, {})

//     apiVolByLFI.value = Object.entries(grouped)
//       .map(([label, value]) => ({ label, value }))
//       .sort((a, b) => b.value - a.value)
//   } catch (err) {
//     console.error('API volume load failed:', err)
//   }
// }

// onMounted(() => {
//   loadApiVolByLFI()
// })
</script>

<style scoped>
.section-4 {
  transform: translateY(-100px);
  z-index: 10;
  min-height: 1120px;
  background: rgba(122, 210, 248, 0.1);
  background: linear-gradient(0deg, rgba(0, 192, 167, 0.05) 0%, rgba(0, 192, 167, 0.35) 100%);
  background-position: 50%;
  background-size: cover;
  display: block;
  position: relative;
  overflow: hidden;
  clip-path: polygon(0% 10vh, 100% 0%, 100% calc(100% - 10vh), 0% 100%);
  padding-top: 200px;
  padding-left: 100px;
  padding-right: 100px;
  padding-bottom: 200px;
}

.chart-row {
  display: flex;
  margin-bottom: 3rem;
  justify-content: space-between;
  gap: 2rem;
}

.chart-col {
  width: 45%;
  min-width: 0;
}

/* ─── Tablet: stack chart pairs ─────────────────────────── */
@media (max-width: 1024px) {
  .chart-row {
    flex-direction: column;
    gap: 1rem;
  }

  .chart-col {
    width: 100%;
  }
}

/* ─── Mobile ─────────────────────────────────────────────── */
@media (max-width: 768px) {
  .section-4 {
    transform: none;
    clip-path: none;
    padding-top: 3rem;
    padding-left: 1.25rem;
    padding-right: 1.25rem;
    padding-bottom: 3rem;
  }
}
</style>
