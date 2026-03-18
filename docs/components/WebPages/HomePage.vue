<template>
  <div class="homepage">

    <PageHeader />

    <div class="section-hero">


      <div class="hero-main">
        <img src="/images/altareq.svg" alt="AlTareq" class="image-main" />
        <div class="divider"></div>

        <div class="hero-text">
          <h1 class="hero-title">
            Welcome to the AlTareq Community Site
          </h1>
          <p class="hero-description">
            Offering insights and tools to help you get to grips with the UAE's Open Finance program. This is a
            community-driven site and is <strong>not official</strong>.
          </p>
        </div>
      </div>


      <OrganizationScroller style="bottom: 170px;" />
    </div>



    <div class="section-2">
      <div class="section-heading">
        The Story in Numbers
      </div>

      <p class="section-description">
        A snapshot of the UAE Open Finance ecosystem. Visit the <a href="/metrics" class="link">metrics page</a> for the full picture.
      </p>

      <div class="hp-kpi-row">
        <div class="hp-kpi-card" style="--accent: #36BFD4">
          <div class="hp-kpi-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="hp-kpi-body">
            <div class="hp-kpi-value">{{ ecoStats.successfulApiCalls }}</div>
            <div class="hp-kpi-label">Successful API Calls</div>
          </div>
        </div>
        <div class="hp-kpi-card" style="--accent: #8B5CF6">
          <div class="hp-kpi-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
          <div class="hp-kpi-body">
            <div class="hp-kpi-value">{{ ecoStats.successfulPaymentAmount }}</div>
            <div class="hp-kpi-label">Successful Payment Amount (AED)</div>
          </div>
        </div>
        <div class="hp-kpi-card" style="--accent: #10B981">
          <div class="hp-kpi-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" stroke-width="2"/>
              <path d="M2 10h20" stroke="currentColor" stroke-width="2"/>
              <circle cx="7" cy="15" r="1.5" fill="currentColor"/>
            </svg>
          </div>
          <div class="hp-kpi-body">
            <div class="hp-kpi-value">{{ ecoStats.dataSharingRequests }}</div>
            <div class="hp-kpi-label">Successful Data Sharing Requests</div>
          </div>
        </div>
      </div>

      <div class="chart-row">
        <div class="chart-col">
          <DashApiVolumeChart
            :data="filteredSuccessApiData"
            group-by="month"
            stack-by="family"
            title="Successful API Volume by Month"
          />
        </div>
        <div class="chart-col">
          <DashApiVolumeChart
            :data="filteredSuccessPaymentData"
            group-by="month"
            value-key="amount"
            title="Successful Payment Amount by Month (AED)"
          />
        </div>
      </div>

      <a class="all-blogs-link" href="/metrics">
        <span>More</span>
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M12.2929 4.29289C12.6834 3.90237 13.3166 3.90237 13.7071 4.29289L20.7071 11.2929C21.0976 11.6834 21.0976 12.3166 20.7071 12.7071L13.7071 19.7071C13.3166 20.0976 12.6834 20.0976 12.2929 19.7071C11.9024 19.3166 11.9024 18.6834 12.2929 18.2929L17.5858 13H4C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11H17.5858L12.2929 5.70711C11.9024 5.31658 11.9024 4.68342 12.2929 4.29289Z"
            fill="#000000"></path>
        </svg>
      </a>

    </div>


    <div class="section-3">


      <div class="section-heading">
        Our Community
      </div>

      <p class="section-description">
        The Open Finance community in the UAE is growing rapidly, bringing together banks, fintechs, developers, and
        regulators to shape a innovative and inclusive financial ecosystem.
      </p>


      <section class="stats-section">
        <h4
          style="font-size: x-large; font-weight: 500; text-align: center; opacity: 70%; margin-top: 4rem; margin-bottom: 2.5rem; font-weight: 500;">
          Production</h4>
        <div class="stats-grid">

          <div class="stat-card">
            <div class="stat-header">
              <span class="stat-icon">🏛️</span>
              <span class="stat-title">Organisations</span>
            </div>
            <div class="stat-number">{{ prodStats.total }}</div>
            <p class="stat-description">
              Organizations participating in the Open Finance ecosystem, securely sharing/consuming financial data or
              making payments for you.
            </p>
          </div>

          <div class="stat-card">
            <div class="stat-header">
              <span class="stat-icon">🚀</span>
              <span class="stat-title">TPPs</span>
            </div>
            <div class="stat-number">{{ prodStats.tpps }}</div>
            <p class="stat-description">
              Authorized third-party providers building products powered by Open Finance.
            </p>
          </div>

          <div class="stat-card">
            <div class="stat-header">
              <span class="stat-icon">🏦</span>
              <span class="stat-title">LFIs</span>
            </div>
            <div class="stat-number">{{ prodStats.lfis }}</div>
            <p class="stat-description">
              Licensed financial institutions offering their services via the standardized and secure Open Finance
              network.
            </p>
          </div>

          <div class="stat-card">
            <div class="stat-header">
              <span class="stat-icon">⚡</span>
              <span class="stat-title">APIs</span>
            </div>
            <div class="stat-number">{{ prodApiStats.total }}</div>
            <p class="stat-description">
              Production-ready APIs designed to be consumed, enabling seamless data exchange or real-time payment
              access.
            </p>
          </div>

        </div>
      </section>

      <div class="graph-grid">

        <DonutChart v-if="lfiByTypeItems.length > 0" style="margin: auto" title="LFI by Type" :items="lfiByTypeItems" />

        <DonutChart v-if="prodApiStats.byType.length > 0" style="margin: auto" title="API by Type" :items="prodApiStats.byType" />
      </div>


      <section class="stats-section">
        <h4
          style="font-size: x-large; font-weight: 500; text-align: center; opacity: 70%; margin-top: 4rem; margin-bottom: 2.5rem; font-weight: 500;">
          Sandbox</h4>
        <div class="stats-grid">

          <div class="stat-card">
            <div class="stat-header">
              <span class="stat-icon">🏛️</span>
              <span class="stat-title">Organisations</span>
            </div>
            <div class="stat-number">{{ sandboxStats.total }}</div>
            <p class="stat-description">
              Organizations in the Open Finance sandbox, building out integrations.
            </p>
          </div>

          <div class="stat-card">
            <div class="stat-header">
              <span class="stat-icon">🚀</span>
              <span class="stat-title">TPPs</span>
            </div>
            <div class="stat-number">{{ sandboxStats.tpps }}</div>
            <p class="stat-description">
              Third-party providers experimenting and developing products before production launch.
            </p>
          </div>

          <div class="stat-card">
            <div class="stat-header">
              <span class="stat-icon">🏦</span>
              <span class="stat-title">LFIs</span>
            </div>
            <div class="stat-number">{{ sandboxStats.lfis }}</div>
            <p class="stat-description">
              Licensed financial institutions integrating and testing their Open Finance services in Sandbox before
              promotion to production.
            </p>
          </div>

          <div class="stat-card">
            <div class="stat-header">
              <span class="stat-icon">⚡</span>
              <span class="stat-title">APIs</span>
            </div>
            <div class="stat-number">{{ sandboxApiTotal }}</div>
            <p class="stat-description">
              Sandbox APIs ready for self testing, enabling developers to end to end test their own services.
            </p>
          </div>

        </div>
      </section>


      <p class="section-description">
        As part of the collaboration and shared learning at the heart of Open Finance's momentum, this site is a
        community-driven
        initiative to experiment with documentation tools and enhance reference material for the UAE Open Finance
        ecosystem. It is not an official source, but a space to share ideas, contribute improvements, and explore better
        ways of educating and exchanging knowledge. Please contribute and provide feedback via our GitHub repository.
      </p>

    </div>

    <div class="section-4">

      <div class="section-heading">Developer Docs</div>


      <p class="section-description">
        Technical documentation for every participant in the UAE Open Finance ecosystem —
          whether you're <strong>building on top of it</strong> or <strong>powering it</strong>.
      </p>

      <div class="dev-split">

        <div class="dev-side dev-side-tpp">
          <span class="dev-badge dev-badge-tpp">TPP</span>
          <h3 class="dev-side-heading">Third-Party Providers</h3>
          <p class="dev-side-body">Get access to an ecosystem of services — payments, account information, and confirmation of payee — to power your product.</p>
          <ul class="dev-side-links">
            <li><a href="/tech/tpp-standards/trust-framework/">Trust Framework</a></li>
            <li><a href="/tech/tpp-standards/v2.1/banking/service-initiation/">Payment Initiation</a></li>
            <li><a href="/tech/tpp-standards/v2.1/banking/data-sharing/">Bank Data Sharing</a></li>
            <li><a href="/tech/tpp-standards/v2.1/banking/confirmation-of-payee/">Confirmation of Payee</a></li>
          </ul>
          <a href="/tech/tpp-standards/" class="dev-cta dev-cta-tpp">Get started</a>
        </div>

        <div class="dev-divider"></div>

        <div class="dev-side dev-side-lfi">
          <span class="dev-badge dev-badge-lfi">LFI</span>
          <h3 class="dev-side-heading">Licensed Financial Institutions</h3>
          <p class="dev-side-body">Through a single integration with Nebras, power an ecosystem of entities. Follow our step-by-step guide to get set up in sandbox and production.</p>
          <ul class="dev-side-links">
            <li><a href="/tech/lfi-api-hub/trust-framework/">Trust Framework</a></li>
            <li><a href="/tech/lfi-api-hub/getting-started/">Integration Journey</a></li>
            <li><a href="/tech/lfi-api-hub/v2.1/banking/data-sharing/">Data Sharing</a></li>
            <li><a href="/tech/lfi-api-hub/v2.1/banking/confirmation-of-payee/">Confirmation of Payee</a></li>
          </ul>
          <a href="/tech/lfi-api-hub/getting-started/" class="dev-cta dev-cta-lfi">Get started</a>
        </div>

      </div>
    </div>



    <div class="section-5">
      <div class="section-heading">
        Articles & News
      </div>

      <div class="card-grid">

        <ArticleLink
          link="https://www.openbankingexpo.com/news/amazon-expands-uk-payment-options-with-pay-by-bank-via-partnership-with-truelayer/"
          imageSrc="/images/articles/amazon.png" date="10 Feb 2026"
          title="Amazon expands UK payment options with Pay by Bank via partnership with TrueLayer"
          text="Amazon has expanded the range of payment options available to UK customers, giving shoppers more choice over how they pay at checkout. From Pay by Bank to cards, instalments, gift cards and rewards points, the move reflects a broader shift towards more flexible, account-to-account payment experiences in everyday commerce." />

   <ArticleLink
          link="https://gulfnews.com/business/banking/how-open-finance-in-uae-banks-is-driving-faster-credit-and-new-services-1.500418393"
          imageSrc="/images/articles/faster-credit.png" date="23 Jan 2026"
          title="How open finance in UAE banks is driving faster credit and new services"
          text="UAE banking sector is entering a new phase of digital transformation as open finance begins to roll out, allowing individuals and businesses to securely share and initiate services such as payments through regulated third-party providers, all within a strict, consent-based framework." />



        <ArticleLink link="https://uaefintechvibes.com/adib-leads-open-finance-initiative-altareq/"
          imageSrc="/images/articles/adib-sharia.png" date="21 Jan 2026" title="ADIB Leads the Shariah-Compliant Digital Wave with the Open Finance Initiative
              AlTareq" text="Abu Dhabi Islamic Bank (ADIB), a global leader in Islamic finance, has announced a landmark achievement in
              its digital transformation journey. In alignment with its Vision 2035, ADIB has officially become the
              first Islamic bank in the UAE to implement Open Finance under the Open Finance Initiative AlTareq, a
              strategic project led by the Central Bank of the UAE (CBUAE). This rollout marks a significant turning
              point for the nation’s financial sector, advancing the UAE’s goal to build a world-class, data-driven
              digital ecosystem as part of the CBUAE’s 2023–2026 strategy." />


        <ArticleLink
          link="https://www.openbankingexpo.com/news/abu-dhabi-islamic-bank-implements-open-finance-with-support-from-altareq/"
          imageSrc="/images/articles/adib-live.jpg" date="20 Jan 2026"
          title="Abu Dhabi Islamic Bank implements Open Finance with support from AlTareq" text="Abu Dhabi Islamic Bank (ADIB), a leading Islamic financial institution, has taken another major step in
              shaping the future of financial services as part of its Vision 2035 by rolling out Open Finance, marking a
              key milestone in the UAE’s Open Finance journey under AlTareq, the Central Bank of the UAE’s (CBUAE) Open
              Finance Initiative." />


        <ArticleLink
          link="https://www.linkedin.com/pulse/when-open-finance-became-real-customers-uae-faisal-toukan-9kvsf/?trackingId=rv1pe3NS9%2FveDIbJe71Cag%3D%3D"
          imageSrc="/images/articles/of-real-zina.png" date="20 Jan 2026"
          title="When Open Finance Became Real for Customers in the UAE" text="We are witnessing the beginning of a shift in how money moves in the UAE. For the first time, a customer
              in the country has completed a live, regulated Open Finance payment from inside a Ziina app experience.
              What was once a policy framework and a technical standard is now a real interaction available to people
              who use Ziina every day." />

          <ArticleLink
          link="https://ffnews.com/newsarticle/fintech/adib-becomes-first-islamic-bank-to-implement-open-finance-with-the-support-of-the-cbuaes-open-finance-initiative-altareq/"
          imageSrc="/images/articles/adib-first.jpg" date="20 Jan 2026" title="ADIB Becomes First Islamic Bank to Implement Open Finance With the Support of the
              CBUAE’s Open Finance Initiative AlTareq" text="Abu Dhabi Islamic Bank (ADIB), a leading Islamic financial institution, has taken another major step in
              shaping the future of financial services as part of its Vision 2035 by rolling out Open Finance, marking a
              key milestone in the UAE’s Open Finance journey under AlTareq, the Central Bank of the UAE’s (CBUAE) Open
              Finance Initiative." />



      </div>



      <a class="all-blogs-link" href="/news">
        <span>More</span>
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M12.2929 4.29289C12.6834 3.90237 13.3166 3.90237 13.7071 4.29289L20.7071 11.2929C21.0976 11.6834 21.0976 12.3166 20.7071 12.7071L13.7071 19.7071C13.3166 20.0976 12.6834 20.0976 12.2929 19.7071C11.9024 19.3166 11.9024 18.6834 12.2929 18.2929L17.5858 13H4C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11H17.5858L12.2929 5.70711C11.9024 5.31658 11.9024 4.68342 12.2929 4.29289Z"
            fill="#000000"></path>
        </svg>
      </a>

    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import PageHeader from './Components/PageHeader.vue'
import OrganizationScroller from './Components/OrganizationScroller.vue'
import DonutChart from './Charts/DonutChart.vue'
import ArticleLink from './Components/ArticleLink.vue'

import DashApiVolumeChart from './Charts/DashApiVolumeChart.vue'
import { filteredSuccessApiData, filteredSuccessPaymentData } from './stores/dashboardStore.js'

const tfData = ref(null)
const apiData = ref([])
const paymentData = ref([])

const SUCCESS_PAYMENT_STATUSES = new Set([
  'AcceptedSettlementCompleted',
  'AcceptedCreditSettlementCompleted',
  'AcceptedWithoutPosting',
])

onMounted(async () => {
  const [tf, api, payments] = await Promise.all([
    axios.get('/api/trust-framework.json'),
    fetch('/api/api-data.json').then(r => r.json()).catch(() => []),
    fetch('/api/payment-log.json').then(r => r.json()).catch(() => []),
  ])
  tfData.value = tf.data
  apiData.value = api
  paymentData.value = payments
})

const ecoStats = computed(() => {
  // Successful API calls (2xx)
  const successfulApiCalls = apiData.value
    .filter(r => (r.TPPResponseCodeGroup || '2xx') === '2xx')
    .reduce((s, r) => s + (r.TotalNumberofCalls || 0), 0)

  // Data sharing requests: account-information family, 2xx
  const dataSharingRequests = apiData.value
    .filter(r => {
      const url = r.URL || ''
      return url.includes('/account-information/') && (r.TPPResponseCodeGroup || '2xx') === '2xx'
    })
    .reduce((s, r) => s + (r.TotalNumberofCalls || 0), 0)

  // Successful payments
  const successRows = paymentData.value.filter(r => SUCCESS_PAYMENT_STATUSES.has(r.status) && r.LFI)
  const successfulPaymentAmount = successRows.reduce((s, r) => s + (r.amount || 0), 0)
  const successfulPaymentCount  = successRows.reduce((s, r) => s + (r.Count  || 0), 0)

  return {
    successfulApiCalls:    successfulApiCalls.toLocaleString(),
    dataSharingRequests:   dataSharingRequests.toLocaleString(),
    successfulPaymentAmount: successfulPaymentAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    successfulPaymentCount:  successfulPaymentCount.toLocaleString(),
  }
})

function parseApiResources(raw) {
  if (!raw) return []
  try {
    return JSON.parse(raw.replace(/""/g, '"'))
  } catch {
    return []
  }
}

const API_TYPE_LABELS = {
  'payment': 'Payments',
  'confirmation': 'Confirmation of Payee',
  'account-information': 'Bank Data Sharing',
  'account': 'Account Information',
  'product': 'Products & Leads',
  'insurance': 'Insurance',
  'atm': 'ATM',
}

const prodStats = computed(() => {
  if (!tfData.value) return { total: 0, tpps: 0, lfis: 0 }
  const orgs = tfData.value.Organisations.filter(o => o.Environment === 'production' && o.Status === 'Active')
  return {
    total: orgs.length,
    tpps: orgs.filter(o => o.Size === 'TPP').length,
    lfis: orgs.filter(o => o.Size === 'LFI').length,
  }
})

const sandboxStats = computed(() => {
  if (!tfData.value) return { total: 0, tpps: 0, lfis: 0 }
  const orgs = tfData.value.Organisations.filter(o => o.Environment === 'sandbox' && o.Status === 'Active')
  return {
    total: orgs.length,
    tpps: orgs.filter(o => o.Size === 'TPP').length,
    lfis: orgs.filter(o => o.Size === 'LFI').length,
  }
})

function apiCountsFromServers(servers) {
  const counts = {}
  for (const server of servers) {
    for (const r of parseApiResources(server.ApiResources)) {
      if (r.Status === 'Active') {
        const type = r.ApiFamilyType || 'other'
        counts[type] = (counts[type] || 0) + 1
      }
    }
  }
  return counts
}

const prodApiStats = computed(() => {
  if (!tfData.value) return { total: 0, byType: [] }
  const servers = tfData.value.AuthorisationServers.filter(s => s.Environment === 'production' && s.Status === 'Active')
  const counts = apiCountsFromServers(servers)
  const total = Object.values(counts).reduce((s, n) => s + n, 0)
  const byType = Object.entries(counts).map(([key, value]) => ({
    label: API_TYPE_LABELS[key] ?? key,
    value,
  }))
  return { total, byType }
})

const sandboxApiTotal = computed(() => {
  if (!tfData.value) return 0
  const servers = tfData.value.AuthorisationServers.filter(s => s.Environment === 'sandbox' && s.Status === 'Active')
  const counts = apiCountsFromServers(servers)
  return Object.values(counts).reduce((s, n) => s + n, 0)
})

const lfiByTypeItems = computed(() => {
  if (!tfData.value) return []
  const lfis = tfData.value.Organisations.filter(o => o.Environment === 'production' && o.Status === 'Active' && o.Size === 'LFI')
  let banks = 0, insurers = 0
  for (const org of lfis) {
    const name = `${org.LegalEntityName} ${org.RegisteredName}`.toLowerCase()
    if (name.includes('insur')) insurers++
    else banks++
  }
  const items = [{ label: 'Banks', value: banks }]
  if (insurers > 0) items.push({ label: 'Insurers', value: insurers })
  return items
})
</script>

<style scoped>
.section-hero {
  z-index: 10;
  height: calc(100vh + 100px);
  /* min-height: 1120px; */
  /* background: rgba(122, 210, 248, 0.1);
    background: linear-gradient(0deg, rgba(122, 210, 248, 0.05) 0%, rgba(122, 210, 248, 0.55) 100%); */
  background-size: cover;
  display: block;
  position: relative;
  clip-path: polygon(0% 0%, 100% 0%, 100% calc(100% - 20vh), 0% 100%);
}

.hero-main {
  width: 80%;
  opacity: 70%;
  position: absolute;
  top: 25%;
  left: 20%;
  display: flex;
}

.hero-text {
  display: block;
  max-width: 40%;
  color: black;
}

.hero-title {
  line-height: 48px;
  font-size: 32px;
  font-weight: 600;
  margin-top: 20px;
  margin-bottom: 20px;
}

.hero-description {
  line-height: 26px;
  font-size: 18px;
  font-weight: 400;
}

.divider {
  background: rgba(122, 210, 248, 0.1);
  background: linear-gradient(0deg, rgba(0, 39, 127, 1) 0%, rgba(0, 139, 228, 1) 50%, rgba(0, 129, 113, 0.55) 100%);
  width: 3px;
  margin-top: 10px;
  margin-bottom: 10px;
  min-height: 80%;
  margin-left: 50px;
  margin-right: 50px;
}


.section-2 {
  transform: translateY(-170px);
  z-index: 10;
  min-height: 1120px;
  background: rgba(122, 210, 248, 0.1);
  background: linear-gradient(0deg, rgba(122, 210, 248, 0.05) 0%, rgba(122, 210, 248, 0.55) 100%);
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

.section-3 {
  transform: translateY(-270px);
  z-index: 10;
  min-height: 1120px;
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

.section-4 {
  transform: translateY(-350px);
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

.section-5 {
  transform: translateY(-200px);
  z-index: 10;
  background-position: 50%;
  background-size: cover;
  display: block;
  position: relative;
  overflow: hidden;
  padding-left: 100px;
  padding-right: 100px;
}


.section-description {
  font-size: 1.25rem;
  line-height: 1.5rem;
  opacity: 80%;
  margin-bottom: 20px;
}

.link {
  text-decoration: underline;
  color: inherit;
  transition: opacity 0.3s ease
}

.link:hover {
  opacity: 0.7;
}

.stats-section {
  margin-bottom: 4rem;
  padding-left: 2rem;
  padding-right: 2rem;
}

.stats-grid {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.graph-grid {
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;
  margin-bottom: 4rem;
}

/* Card */
.stat-card {
  background: rgba(0, 129, 113, 0.05);
  border-radius: 16px;
  padding: 1.75rem;
  color: #e5e7eb;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.35);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.45);
}

/* Header row */
.stat-header {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: #94a3b8;
  margin-bottom: 0.75rem;
}

.stat-icon {
  font-size: 1.2rem;
}

/* Big number */
.stat-number {
  font-size: 4rem;
  line-height: 5rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  margin-bottom: 1rem;
  margin-top: 1rem;
  color: black;
  opacity: 60%;
}

/* Description */
.stat-description {
  font-size: 0.9rem;
  line-height: 1.4;
  color: #94a3b8;
}

/* Responsive */
@media (max-width: 1024px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
}

.all-blogs-link {
  display: flex;
  align-items: center;
  font-weight: 700;
  /* bold */
  font-size: 1.25rem;
  /* text-xl */
  cursor: pointer;
  text-decoration: none;
  color: #000;
  /* text color */
  transition: all 0.2s ease-in-out;
}

.all-blogs-link span {
  margin-right: 0.5rem;
  /* space between text and arrow */
}

.all-blogs-link:hover {
  text-decoration: underline;
}

.all-blogs-link svg {
  width: 28px;
  height: 28px;
  fill: currentColor;
  /* match text color */
}

/* Developer Docs section */
.dev-split {
  display: flex;
  align-items: stretch;
  gap: 0;
  margin-top: 2.5rem;
}

.dev-side {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 2rem 3rem;
}

.dev-divider {
  width: 1px;
  background: rgba(0, 0, 0, 0.12);
  align-self: stretch;
  margin: 1rem 0;
}

.dev-badge {
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 0.25rem 0.65rem;
  border-radius: 999px;
  margin-bottom: 1.25rem;
  width: fit-content;
}

.dev-badge-tpp {
  background: rgba(0, 100, 210, 0.1);
  color: rgb(0, 80, 180);
}

.dev-badge-lfi {
  background: rgba(0, 129, 113, 0.1);
  color: rgb(0, 100, 88);
}

.dev-side-heading {
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 1.2;
  margin: 0 0 1rem;
}

.dev-side-body {
  font-size: 1rem;
  line-height: 1.65;
  opacity: 0.7;
  margin-bottom: 1.75rem;
}

.dev-side-links {
  list-style: none;
  padding: 0;
  margin: 0 0 2rem;
  flex: 1;
}

.dev-side-links li {
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  padding: 0.6rem 0;
}

.dev-side-links li:last-child {
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

.dev-side-links a {
  text-decoration: none;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  opacity: 0.7;
  transition: opacity 0.2s;
}

.dev-side-links a::before {
  content: '→';
  font-size: 0.85rem;
}

.dev-side-links a:hover {
  opacity: 1;
}

.dev-cta {
  display: inline-block;
  padding: 0.65rem 1.5rem;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;
  margin-top: auto;
  width: fit-content;
  transition: opacity 0.2s;
}

.dev-cta:hover {
  opacity: 0.85;
}

.dev-cta-tpp {
  background: rgb(0, 100, 210);
  color: white;
}

.dev-cta-lfi {
  background: rgb(0, 129, 113);
  color: white;
}

/* ── Homepage KPI cards ──────────────────────────────────────────────────── */
.hp-kpi-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 2.5rem;
}

.hp-kpi-card {
  background: #fff;
  border: 1px solid #E8EFF6;
  border-radius: 12px;
  padding: 1.1rem 1.25rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  border-left: 4px solid var(--accent, #36BFD4);
  box-shadow: 0 2px 8px rgba(12, 20, 65, 0.05);
  transition: box-shadow 0.15s;
}

.hp-kpi-card:hover {
  box-shadow: 0 4px 16px rgba(12, 20, 65, 0.1);
}

.hp-kpi-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: color-mix(in srgb, var(--accent, #36BFD4) 12%, transparent);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent, #36BFD4);
  flex-shrink: 0;
}

.hp-kpi-body {
  flex: 1;
  min-width: 0;
}

.hp-kpi-value {
  font-family: 'Poppins', sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  color: #0C1441;
  line-height: 1.1;
}

.hp-kpi-label {
  font-family: 'Poppins', sans-serif;
  font-size: 0.7rem;
  font-weight: 500;
  color: #667085;
  margin-top: 0.15rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (max-width: 1100px) {
  .hp-kpi-row {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .hp-kpi-row {
    grid-template-columns: 1fr;
  }
}

/* Metrics chart rows */
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

/* ─── Tablet: stack graphs & chart pairs ─────────────────── */
@media (max-width: 1024px) {
  .chart-row {
    flex-direction: column;
    gap: 1rem;
  }

  .chart-col {
    width: 100%;
  }

  .graph-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

/* ─── Mobile ─────────────────────────────────────────────── */
@media (max-width: 768px) {
  .section-hero {
    height: auto;
    min-height: 100vh;
    clip-path: polygon(0% 0%, 100% 0%, 100% calc(100% - 8vh), 0% 100%);
  }

  .hero-main {
    position: static;
    width: 100%;
    flex-direction: column;
    align-items: center;
    padding: 7rem 1.5rem 3rem;
    text-align: center;
  }

  .image-main {
    max-width: 110px;
  }

  .divider {
    display: none;
  }

  .hero-text {
    max-width: 100%;
    text-align: center;
  }

  .section-2 {
    transform: none;
    clip-path: none;
    padding-top: 3rem;
    padding-left: 1.25rem;
    padding-right: 1.25rem;
    padding-bottom: 3rem;
  }

  .section-3 {
    transform: none;
    clip-path: none;
    padding-top: 3rem;
    padding-left: 1.25rem;
    padding-right: 1.25rem;
    padding-bottom: 3rem;
  }

  .section-4 {
    transform: none;
    clip-path: none;
    padding-top: 3rem;
    padding-left: 1.25rem;
    padding-right: 1.25rem;
    padding-bottom: 3rem;
  }

  .section-5 {
    transform: none;
    padding-left: 1.25rem;
    padding-right: 1.25rem;
    padding-top: 2rem;
    padding-bottom: 3rem;
  }

  .dev-split {
    flex-direction: column;
  }

  .dev-divider {
    width: auto;
    height: 1px;
    margin: 0;
  }

  .dev-side {
    padding: 2rem 1.5rem;
  }

  .stats-section {
    padding-left: 0;
    padding-right: 0;
  }
}
</style>