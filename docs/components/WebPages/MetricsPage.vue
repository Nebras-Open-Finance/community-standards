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

      <div style="display: flex; margin-bottom: 3rem;">
        <div style="width: 45%; margin-right: auto">
          <h4
            style="font-size: larger; font-weight: 500; margin-bottom: 10px; opacity: 70%; margin-top: 2rem; margin-bottom: 1rem; font-weight: 500;">
            API Volumes</h4>


          <APIVolBarChart />
        </div>

        <div style="width: 45%; margin-left: auto">
          <h4
            style="font-size: larger; font-weight: 500; margin-bottom: 10px; opacity: 70%; margin-top: 2rem; margin-bottom: 1rem; text-align: left; font-weight: 500;">
            API Vol by Bank</h4>

          <APIVolByBankBarChart />
        </div>
      </div>



      <div style="display: flex; margin-bottom: 3rem;">
        <div style="width: 45%; margin-right: auto">
          <h4
            style="font-size: larger; font-weight: 500; margin-bottom: 10px; opacity: 70%; margin-top: 2rem; margin-bottom: 1rem; font-weight: 500;">
            API Response Times</h4>


          <APIResponseBarChart />
        </div>

        <div style="width: 45%; margin-left: auto">
          <h4
            style="font-size: larger; font-weight: 500; margin-bottom: 10px; opacity: 70%; margin-top: 2rem; margin-bottom: 1rem; text-align: left; font-weight: 500;">
            API Error Rates</h4>


          <APIErrorRatesBarChart />
        </div>
      </div>


      <div style="display: flex; margin-bottom: 3rem;">
        <div style="width: 45%; margin-right: auto">
          <h4
            style="font-size: larger; font-weight: 500; margin-bottom: 10px; opacity: 70%; margin-top: 2rem; margin-bottom: 1rem; font-weight: 500;">
            API Volume by Family</h4>


          <APIVolByFamilyBarChart />

        </div>

        <div style="width: 45%; margin-left: auto">
          <h4
            style="font-size: larger; font-weight: 500; margin-bottom: 10px; opacity: 70%; margin-top: 2rem; margin-bottom: 1rem; text-align: left; font-weight: 500;">
            API Volume by Endpoint (Data Sharing)</h4>


          <APIEndpointDSBarChart />
        </div>
      </div>

      <div style="display: flex; margin-bottom: 3rem;">
        <div style="width: 45%; margin-right: auto">
          <h4
            style="font-size: larger; font-weight: 500; margin-bottom: 10px; opacity: 70%; margin-top: 2rem; margin-bottom: 1rem; font-weight: 500;">
            API Volume by TPP</h4>


          <APIVolByTPPBarChart />

        </div>
      </div>
    </div>
    <div class="section-4">

          <h2
            style="font-size: xx-large; font-weight: 500; margin-bottom: 10px; opacity: 70%; margin-top: 2rem; margin-bottom: 1rem; font-weight: 500;">
            Payments</h2>

      <div style="display: flex; margin-bottom: 3rem;">
        <div style="width: 45%; margin-right: auto">
          <h4
            style="font-size: larger; font-weight: 500; margin-bottom: 10px; opacity: 70%; margin-top: 2rem; margin-bottom: 1rem; font-weight: 500;">
            Payment Volumes (Amount)</h4>


          <PaymentVolAmountBarChart />
        </div>

        <div style="width: 45%; margin-left: auto">
          <h4
            style="font-size: larger; font-weight: 500; margin-bottom: 10px; opacity: 70%; margin-top: 2rem; margin-bottom: 1rem; text-align: left; font-weight: 500;">
            Payment Volumes (Count)</h4>

          <PaymentVolBarChart />
        </div>
      </div>

      <div style="display: flex; margin-bottom: 3rem;">
        <div style="width: 45%; margin-right: auto">
          <h4
            style="font-size: larger; font-weight: 500; margin-bottom: 10px; opacity: 70%; margin-top: 2rem; margin-bottom: 1rem; font-weight: 500;">
            Payment Volumes By Bank (Amount)</h4>


          <PaymentVolAmountByBankBarChart />
        </div>

        <div style="width: 45%; margin-left: auto">
          <h4
            style="font-size: larger; font-weight: 500; margin-bottom: 10px; opacity: 70%; margin-top: 2rem; margin-bottom: 1rem; text-align: left; font-weight: 500;">
             Payment Volumes By Bank (Count)</h4>

          <PaymentVolByBankBarChart />
        </div>
      </div>

      <div style="display: flex; margin-bottom: 3rem;">
        <div style="width: 45%; margin-right: auto">
          <h4
            style="font-size: larger; font-weight: 500; margin-bottom: 10px; opacity: 70%; margin-top: 2rem; margin-bottom: 1rem; font-weight: 500;">
            Payment Success Rate By Bank</h4>


          <PaymentSuccessByBankBarChart />
        </div>

        <div style="width: 45%; margin-left: auto">
          <h4
            style="font-size: larger; font-weight: 500; margin-bottom: 10px; opacity: 70%; margin-top: 2rem; margin-bottom: 1rem; text-align: left; font-weight: 500;">
             Average Payment Amount By Bank</h4>

          <PaymentAverageByBankBarChart />
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

import PaymentVolBarChart from './Charts/PaymentVolBarChart.vue'
import PaymentVolAmountBarChart from './Charts/PaymentVolAmountBarChart.vue'
import PaymentVolByBankBarChart from './Charts/PaymentVolByBankBarChart.vue'
import PaymentVolAmountByBankBarChart from './Charts/PaymentVolAmountByBankBarChart.vue'
import PaymentSuccessByBankBarChart from './Charts/PaymentSuccessByBankBarChart.vue'
import PaymentAverageByBankBarChart from './Charts/PaymentAverageByBankBarChart.vue'

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
</style>