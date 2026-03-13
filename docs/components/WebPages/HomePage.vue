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
        Developer Docs
      </div>

      <p class="section-description">
        This site’s developer documentation aims to clearly explain the Open Finance integrations and specifications in
        the UAE.
        By using modern, best-in-class technologies and frameworks, the docs guide you on how to either provide Open
        Finance services as a <strong>LFI</strong> or consume them as a <strong>TPP</strong>.
      </p>

      <div class="section-subheading" style="margin-bottom: 0px;">
        Technology Architecture & Overview
      </div>

      <div class="arch-row">

        <div class="arch-text">
          <p class="section-description">
            At the core of the system is the <strong>Directory</strong>, known as the
            <a class="link" href="tech/trust-framework/">Trust Framework</a>. It serves as the
            <strong>single source of truth</strong> for all authorized participants, defining
            their roles and access scopes within the ecosystem. All API discovery, certificate
            issuance, and validation are managed through the Trust Framework.
          </p>

          <p class="section-description">
            Going beyond many global models, the UAE has introduced a centralized
            <a class="link" href="tech/api-hub/">API Hub</a> at the heart of its Open Finance infrastructure. Each LFI
            is provided with its own API Hub tenant, and all requests from TPPs flow directly
            through this hub, which handles interactions with the relevant LFIs. This centralized
            approach reduces the burden on LFIs for managing consents and access, while ensuring
            consistency and transparency across the ecosystem.
          </p>

        </div>

        <pre class="arch-diagram">
+======================================================================+
|                  AlTareq Trust Framework (Directory)                 |
|----------------------------------------------------------------------|
|                                                                      |
|                      +-------------------------+                     |
|                      |           TPP           |                     |
|                      +------------+------------+                     |
|                                   |                                  |
|                 +-----------------+-----------------+                |
|                 |                 |                 |                |
|             +---v---+         +---v---+         +---v---+            |
|             |API Hub|         |API Hub|   ...   |API Hub|            |
|             +-------+         +-------+         +-------+            |
|                 |                 |                 |                |
|                 |                 |                 |                |
|             +---v---+         +---v---+         +---v---+            |
|             | LFI 1 |         | LFI 2 |   ...   | LFI N |            |
|             +-------+         +-------+         +-------+            |
|                                                                      |
+======================================================================+
    </pre>



      </div>

      <div class="section-subheading">
        TPP - Integration & Standards
      </div>


      <p class="section-description">
        These <a href="/tech/tpp-standards" class="link">TPP Guides & Standards</a> are for developers, fintech teams,
        and
        integrators building applications
        that leverage Open Finance APIs. Whether you're offering personal finance management
        tools, digital lending services, or payment solutions, this is your launchpad.
      </p>

      <p class="section-description">
        Access API specs, Postman collections, developer guides, and our knowledge base to
        integrate quickly and securely with licensed financial institutions.
      </p>

      <h4 style="font-size: larger; font-weight: 500; margin-bottom: 10px;">Core Open Finance APIs</h4>
      <ul>
        <li style="margin-bottom: 3px;">
          <a href="/tech/tpp-standards/bank-data-sharing" style="font-size: large;" class="link">Bank Data Sharing</a> –
          Access customer account information (balances, transactions, and account details) with explicit consent for
          personal finance, analytics, or lending applications.
        </li>
        <li style="margin-bottom: 3px;">
          <a href="/tech/tpp-standards/bank-service-initiation" style="font-size: large;" class="link">Payment (Bank
            Service Initiation)</a> – Initiate payments directly from customer accounts, supporting real-time transfers,
          bill payments, and other payment flows securely.
        </li>
        <li style="margin-bottom: 3px;">
          <a href="/tech/tpp-standardsconfirmation-of-payee" style="font-size: large;" class="link">Confirmation of
            Payee</a> – Verify beneficiary details before processing a payment to reduce fraud and ensure funds are sent
          to the correct recipient.
        </li>
      </ul>

      <div class="section-subheading" style="margin-top: 50px;">
        LFIs - Integration Guide
      </div>

      <p class="section-description">
        These <a href="/tech/api-hub" class="link">Integration Guide Guides</a> are for Licensed Financial
        Institutions (LFIs)
        integrating with the UAE’s Open Finance ecosystem. Each LFI is provided with its own <strong>API Hub</strong>
        tenant, which securely routes all requests from authorized TPPs. The API Hub manages consent records and TPP
        access
        centrally, ensuring consistent, transparent, and secure access.
      </p>

      <h4 style="font-size: larger; font-weight: 500; margin-bottom: 10px;">Integration Resources</h4>
      <ul>
        <li style="margin-bottom: 3px;">
          <a href="/tech/api-hub/setting-up" class="link">Connecting to the API Hub</a> – Step-by-step instructions for
          setting up your API Hub tenant and connecting your systems.
        </li>
        <li style="margin-bottom: 3px;">
          <a href="/tech/api-hub/api-specs" class="link">API Specifications</a> – Detailed documentation on endpoints
          and data models.
        </li>

        <!-- TO DO Maybe seperate to API Sequence Diagrams -->

        <li style="margin-bottom: 3px;">
          <a href="/tech/api-hub/user-guides" class="link">API Flows and User Guides</a> – Practical guidance for
          implementing API flows, including consent steup and authorization and other common integration patterns.
        </li>
      </ul>
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
          style="font-size: larger; font-weight: 500; margin-bottom: 10px; text-align: center; opacity: 70%; margin-top: 2rem; margin-bottom: 2.5rem; font-weight: 500;">
          Production</h4>
        <div class="stats-grid">

          <div class="stat-card">
            <div class="stat-header">
              <span class="stat-icon">🏛️</span>
              <span class="stat-title">Organisations</span>
            </div>
            <div class="stat-number">15</div>
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
            <div class="stat-number">5</div>
            <p class="stat-description">
              Authorized third-party providers building products powered by Open Finance.
            </p>
          </div>

          <div class="stat-card">
            <div class="stat-header">
              <span class="stat-icon">🏦</span>
              <span class="stat-title">LFIs</span>
            </div>
            <div class="stat-number">10</div>
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
            <div class="stat-number">36</div>
            <p class="stat-description">
              Production-ready APIs designed to be consumed, enabling seamless data exchange or real-time payment
              access.
            </p>
          </div>

        </div>
      </section>

      <div class="graph-grid">

        <DonutChart style="margin: auto" title="LFI by Type" :items="[
          { label: 'Banks', value: 9 },
          { label: 'Insurers', value: 1 },
        ]" />

        <DonutChart style="margin: auto" title="API by Type" :items="[
          { label: 'Bank Data Sharing', value: 10 },
          { label: 'Payments', value: 9 },
          { label: 'Confirmation of Payee', value: 9 },
          { label: 'Products and Leads', value: 7 },
        ]" />
      </div>


      <section class="stats-section">
        <h4
          style="font-size: larger; font-weight: 500; margin-bottom: 10px; text-align: center; opacity: 70%; margin-top: 2rem; margin-bottom: 2.5rem; font-weight: 500;">
          Sandbox</h4>
        <div class="stats-grid">

          <div class="stat-card">
            <div class="stat-header">
              <span class="stat-icon">🏛️</span>
              <span class="stat-title">Organisations</span>
            </div>
            <div class="stat-number">76</div>
            <p class="stat-description">
              Organizations in the Open Finance sandbox, building out integrations.
            </p>
          </div>

          <div class="stat-card">
            <div class="stat-header">
              <span class="stat-icon">🚀</span>
              <span class="stat-title">TPPs</span>
            </div>
            <div class="stat-number">23</div>
            <p class="stat-description">
              Third-party providers experimenting and developing products before production launch.
            </p>
          </div>

          <div class="stat-card">
            <div class="stat-header">
              <span class="stat-icon">🏦</span>
              <span class="stat-title">LFIs</span>
            </div>
            <div class="stat-number">53</div>
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
            <div class="stat-number">218</div>
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
      <div class="section-heading">
        Metrics & Monitoring
      </div>

            <div class="chart-row">
        <div class="chart-col">
          <h4
            style="font-size: larger; font-weight: 500; margin-bottom: 10px; opacity: 70%; margin-top: 2rem; margin-bottom: 1rem; font-weight: 500;">
            API Volumes</h4>


          <APIVolBarChart />
        </div>

        <div class="chart-col">
          <h4
            style="font-size: larger; font-weight: 500; margin-bottom: 10px; opacity: 70%; margin-top: 2rem; margin-bottom: 1rem; text-align: left; font-weight: 500;">
            API Vol by Bank</h4>

          <APIVolByBankBarChart />
        </div>
      </div>



      <div class="chart-row">
        <div class="chart-col">
          <h4
            style="font-size: larger; font-weight: 500; margin-bottom: 10px; opacity: 70%; margin-top: 2rem; margin-bottom: 1rem; font-weight: 500;">
            API Response Times</h4>


          <APIResponseBarChart />
        </div>

        <div class="chart-col">
          <h4
            style="font-size: larger; font-weight: 500; margin-bottom: 10px; opacity: 70%; margin-top: 2rem; margin-bottom: 1rem; text-align: left; font-weight: 500;">
            API Error Rates</h4>


          <APIErrorRatesBarChart />
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

        <ArticleLink link="https://www.wamda.com/2026/01/ziina-uae-execute-live-open-finance-payments-lean"
          imageSrc="/images/articles/zina-lean.jpg" date="15 Jan 2026"
          title="Ziina becomes first in the UAE to execute live Open Finance payments with Lean"
          text="Lean Technologies, the MENA region’s leading  financial infrastructure provider, and Ziina, the UAE’s homegrown consumer and business payments platform, announce the launch of the country’s first live customer-initiated Open Finance payment experience under the Central Bank of the UAE’s (CBUAE) Open Finance framework." />


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
import PageHeader from './Components/PageHeader.vue'
import OrganizationScroller from './Components/OrganizationScroller.vue'
import DonutChart from './Charts/DonutChart.vue'
import ArticleLink from './Components/ArticleLink.vue'

import APIVolBarChart from './Charts/APIVolBarChart.vue'
import APIVolByBankBarChart from './Charts/APIVolByBankBarChart.vue'
import APIResponseBarChart from './Charts/APIResponseBarChart.vue'
import APIErrorRatesBarChart from './Charts/APIErrorRatesBarChart.vue'
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

/* Architecture section */
.arch-row {
  display: flex;
  gap: 2rem;
}

.arch-text {
  margin-top: 50px;
  flex: 1;
  min-width: 0;
}

.arch-diagram {
  margin-left: 5%;
  overflow-x: auto;
  flex-shrink: 0;
  font-size: 0.75rem;
  align-self: flex-start;
  margin-top: 50px;
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

  .arch-row {
    flex-direction: column;
  }

  .arch-diagram {
    margin-left: 0;
    margin-top: 1rem;
    font-size: 0.5rem;
    overflow-x: auto;
    max-width: 100%;
  }

  .stats-section {
    padding-left: 0;
    padding-right: 0;
  }
}
</style>