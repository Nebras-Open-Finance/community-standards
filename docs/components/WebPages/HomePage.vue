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
        Key metrics tracking the adoption and expansion of the CBUAE Open Finance framework.
        Visit the <a href="/metrics" class="link">metrics page</a> for the full picture.
      </p>

      <div class="new-kpi-grid">
        <div class="new-kpi-card">
          <p class="new-kpi-label">Successful API Calls</p>
          <p class="new-kpi-value new-kpi-teal">{{ ecoStats.successfulApiCalls }}</p>
          <p class="new-kpi-delta new-kpi-delta-teal">Live ecosystem data</p>
          <p class="new-kpi-desc">Total successful API calls across the Open Finance ecosystem</p>
        </div>
        <div class="new-kpi-card">
          <p class="new-kpi-label">Payment Amount (AED)</p>
          <p class="new-kpi-value new-kpi-gold">{{ ecoStats.successfulPaymentAmount }}</p>
          <p class="new-kpi-delta new-kpi-delta-gold">Settled transactions</p>
          <p class="new-kpi-desc">Total value of successful payments through Open Finance rails</p>
        </div>
        <div class="new-kpi-card">
          <p class="new-kpi-label">Licensed LFIs</p>
          <p class="new-kpi-value new-kpi-teal">{{ prodStats.lfis }}</p>
          <p class="new-kpi-delta new-kpi-delta-teal">In production</p>
          <p class="new-kpi-desc">Licensed Financial Institutions connected to the framework</p>
        </div>
        <div class="new-kpi-card">
          <p class="new-kpi-label">Registered TPPs</p>
          <p class="new-kpi-value new-kpi-gold">{{ prodStats.tpps }}</p>
          <p class="new-kpi-delta new-kpi-delta-gold">Authorised providers</p>
          <p class="new-kpi-desc">Third Party Providers authorised to access Open Finance APIs</p>
        </div>
      </div>

      <div class="new-chart-row">
        <div class="new-chart-panel">
          <p class="new-chart-tag">API Consumption</p>
          <h3 class="new-chart-title">Successful API Volume by Month</h3>
          <DashApiVolumeChart
            :data="filteredSuccessApiData"
            group-by="month"
            stack-by="family"
            title="Successful API Volume by Month"
          />
        </div>
        <div class="new-chart-panel">
          <p class="new-chart-tag">Payment Activity</p>
          <h3 class="new-chart-title">Successful Payment Amount by Month (AED)</h3>
          <DashApiVolumeChart
            :data="filteredSuccessPaymentData"
            group-by="month"
            value-key="amount"
            title="Successful Payment Amount by Month (AED)"
          />
        </div>
      </div>

      <a class="all-blogs-link" href="/metrics">
        <span>View all metrics</span>
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M12.2929 4.29289C12.6834 3.90237 13.3166 3.90237 13.7071 4.29289L20.7071 11.2929C21.0976 11.6834 21.0976 12.3166 20.7071 12.7071L13.7071 19.7071C13.3166 20.0976 12.6834 20.0976 12.2929 19.7071C11.9024 19.3166 11.9024 18.6834 12.2929 18.2929L17.5858 13H4C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11H17.5858L12.2929 5.70711C11.9024 5.31658 11.9024 4.68342 12.2929 4.29289Z"
            fill="currentColor"></path>
        </svg>
      </a>

    </div>


    <div class="section-3">


      <div class="section-heading">
        Our Community
      </div>

      <p class="section-description">
        AlTareq brings together LFIs, TPPs, regulators, and developers shaping the future of finance in the UAE.
      </p>

      <!-- Community Stats Grid -->
      <div class="new-comm-grid">
        <div class="new-comm-stat">
          <div class="new-comm-icon new-comm-icon--teal">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11M20 10v11M8 10v11M16 10v11M12 10v11"/>
            </svg>
          </div>
          <p class="new-comm-value new-kpi-teal">{{ prodStats.lfis }}</p>
          <p class="new-comm-label">Licensed LFIs</p>
          <p class="new-comm-desc">Banks &amp; financial institutions live on the framework</p>
        </div>
        <div class="new-comm-stat">
          <div class="new-comm-icon new-comm-icon--gold">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
            </svg>
          </div>
          <p class="new-comm-value new-kpi-gold">{{ prodStats.tpps }}</p>
          <p class="new-comm-label">Active TPPs</p>
          <p class="new-comm-desc">Third-party providers building on Open Finance APIs</p>
        </div>
        <div class="new-comm-stat">
          <div class="new-comm-icon new-comm-icon--teal">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
          </div>
          <p class="new-comm-value new-kpi-teal">{{ prodApiStats.total }}</p>
          <p class="new-comm-label">APIs Available</p>
          <p class="new-comm-desc">Published API endpoints across all categories</p>
        </div>
        <div class="new-comm-stat">
          <div class="new-comm-icon new-comm-icon--gold">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </div>
          <p class="new-comm-value new-kpi-gold">{{ prodStats.total }}</p>
          <p class="new-comm-label">Organisations</p>
          <p class="new-comm-desc">Organisations active in the Open Finance ecosystem</p>
        </div>
      </div>

      <!-- Charts -->
      <div class="graph-grid">
        <DonutChart v-if="lfiByTypeItems.length > 0" style="margin: auto" title="LFI by Type" :items="lfiByTypeItems" />
        <DonutChart v-if="prodApiStats.byType.length > 0" style="margin: auto" title="API by Type" :items="prodApiStats.byType" />
      </div>

      <!-- Join & Contribute -->
      <div class="new-join-grid">
        <div class="new-join-panel new-join-panel--teal">
          <div class="new-comm-icon new-comm-icon--teal" style="margin-bottom: 1rem;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </div>
          <h3 class="new-join-title">Join the Community</h3>
          <p class="new-join-body">
            Whether you're an LFI, a TPP, a developer, or just curious about Open Finance — all are welcome.
            Share insights, ask questions, and help shape the ecosystem.
          </p>
          <div class="new-join-actions">
            <a href="https://github.com/Nebras-Open-Finance" target="_blank" rel="noopener noreferrer" class="new-join-btn new-join-btn--primary">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              GitHub
            </a>
            <a href="/news" class="new-join-btn new-join-btn--secondary">Read News</a>
          </div>
        </div>
        <div class="new-join-panel new-join-panel--default">
          <div class="new-comm-icon new-comm-icon--gold" style="margin-bottom: 1rem;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          </div>
          <h3 class="new-join-title">Contribute to AlTareq</h3>
          <p class="new-join-body">
            This site is open source. Help improve the data, documentation links, community guides, or the code itself.
            Every contribution strengthens the ecosystem.
          </p>
          <ul class="new-contribute-list">
            <li>Update or add KPI data</li>
            <li>Improve developer documentation links</li>
            <li>Submit your company or profile</li>
            <li>Translate content to Arabic</li>
          </ul>
          <a href="https://github.com/Nebras-Open-Finance/community-standards" target="_blank" rel="noopener noreferrer" class="new-contribute-link">
            View on GitHub ↗
          </a>
        </div>
      </div>

    </div>

    <div class="section-4">

      <div class="section-heading">Developer Docs</div>


      <p class="section-description">
        Technical documentation for every participant in the UAE Open Finance ecosystem —
        whether you're <strong>building on top of it</strong> or <strong>powering it</strong>.
      </p>

      <div class="new-doc-split">

        <!-- TPP Column -->
        <div class="new-doc-col">
          <div class="new-doc-col-header">
            <div class="new-comm-icon new-comm-icon--teal">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
              </svg>
            </div>
            <div>
              <h3 class="new-doc-col-title">For TPPs</h3>
              <p class="new-kpi-label" style="margin:0;">Third Party Providers · Build on Open Finance</p>
            </div>
            <span class="new-doc-badge new-doc-badge--teal">12 resources</span>
          </div>

          <div class="new-doc-cards">
            <div class="new-doc-card">
              <div class="new-doc-card-header">
                <div class="new-doc-icon new-doc-icon--teal">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                </div>
                <div>
                  <h4 class="new-doc-card-title">Getting Started</h4>
                  <p class="new-doc-card-desc">Understand the TPP registration process, trust framework, and your first API call.</p>
                </div>
              </div>
              <div class="new-doc-links">
                <a href="/tech/tpp-standards/trust-framework/" class="new-doc-link new-doc-link--teal">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                  Trust Framework
                </a>
                <a href="/tech/tpp-standards/" class="new-doc-link new-doc-link--teal">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                  TPP Standards Overview
                </a>
              </div>
            </div>

            <div class="new-doc-card">
              <div class="new-doc-card-header">
                <div class="new-doc-icon new-doc-icon--teal">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/><circle cx="7" cy="15" r="1.5" fill="currentColor"/></svg>
                </div>
                <div>
                  <h4 class="new-doc-card-title">Payment Initiation</h4>
                  <p class="new-doc-card-desc">Initiate payments on behalf of customers through the Open Finance rails.</p>
                </div>
              </div>
              <div class="new-doc-links">
                <a href="/tech/tpp-standards/v2.1/banking/service-initiation/" class="new-doc-link new-doc-link--teal">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                  Payment Initiation
                </a>
                <a href="/tech/tpp-standards/v2.1/banking/confirmation-of-payee/" class="new-doc-link new-doc-link--teal">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                  Confirmation of Payee
                </a>
              </div>
            </div>

            <div class="new-doc-card">
              <div class="new-doc-card-header">
                <div class="new-doc-icon new-doc-icon--teal">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
                </div>
                <div>
                  <h4 class="new-doc-card-title">Bank Data Sharing</h4>
                  <p class="new-doc-card-desc">Access customer account data and transaction history with consent.</p>
                </div>
              </div>
              <div class="new-doc-links">
                <a href="/tech/tpp-standards/v2.1/banking/data-sharing/" class="new-doc-link new-doc-link--teal">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                  Bank Data Sharing
                </a>
              </div>
            </div>
          </div>

          <a href="/tech/tpp-standards/" class="new-doc-cta new-doc-cta--teal">
            View full TPP documentation →
          </a>
        </div>

        <!-- LFI Column -->
        <div class="new-doc-col">
          <div class="new-doc-col-header">
            <div class="new-comm-icon new-comm-icon--gold">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11M20 10v11M8 10v11M16 10v11M12 10v11"/>
              </svg>
            </div>
            <div>
              <h3 class="new-doc-col-title">For LFIs</h3>
              <p class="new-kpi-label" style="margin:0;">Licensed Financial Institutions · Power Open Finance</p>
            </div>
            <span class="new-doc-badge new-doc-badge--gold">12 resources</span>
          </div>

          <div class="new-doc-cards">
            <div class="new-doc-card">
              <div class="new-doc-card-header">
                <div class="new-doc-icon new-doc-icon--gold">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11M20 10v11M8 10v11M16 10v11M12 10v11"/></svg>
                </div>
                <div>
                  <h4 class="new-doc-card-title">LFI Onboarding</h4>
                  <p class="new-doc-card-desc">Step-by-step guide to connecting your institution to the Open Finance framework.</p>
                </div>
              </div>
              <div class="new-doc-links">
                <a href="/tech/lfi-api-hub/trust-framework/" class="new-doc-link new-doc-link--gold">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                  Trust Framework
                </a>
                <a href="/tech/lfi-api-hub/getting-started/" class="new-doc-link new-doc-link--gold">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                  Integration Journey
                </a>
              </div>
            </div>

            <div class="new-doc-card">
              <div class="new-doc-card-header">
                <div class="new-doc-icon new-doc-icon--gold">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
                </div>
                <div>
                  <h4 class="new-doc-card-title">API Standards</h4>
                  <p class="new-doc-card-desc">Implement CBUAE-compliant API standards to expose your financial data.</p>
                </div>
              </div>
              <div class="new-doc-links">
                <a href="/tech/lfi-api-hub/v2.1/banking/data-sharing/" class="new-doc-link new-doc-link--gold">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                  Data Sharing
                </a>
                <a href="/tech/lfi-api-hub/v2.1/banking/confirmation-of-payee/" class="new-doc-link new-doc-link--gold">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                  Confirmation of Payee
                </a>
              </div>
            </div>

            <div class="new-doc-card">
              <div class="new-doc-card-header">
                <div class="new-doc-icon new-doc-icon--gold">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                </div>
                <div>
                  <h4 class="new-doc-card-title">Operations &amp; Support</h4>
                  <p class="new-doc-card-desc">Manage API health, respond to incidents, and stay up to date.</p>
                </div>
              </div>
              <div class="new-doc-links">
                <a href="/tech/lfi-api-hub/" class="new-doc-link new-doc-link--gold">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                  LFI API Hub
                </a>
              </div>
            </div>
          </div>

          <a href="/tech/lfi-api-hub/getting-started/" class="new-doc-cta new-doc-cta--gold">
            View full LFI documentation →
          </a>
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

/* ═══════════════════════════════════════════════════
   SECTION-2 · Story in Numbers
═══════════════════════════════════════════════════ */

.new-kpi-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
}

.new-kpi-card {
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  padding: 1.5rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.new-kpi-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.09);
  border-color: rgba(0, 0, 0, 0.14);
}

.new-kpi-label {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.62rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #64748b;
  margin-bottom: 0.75rem;
}

.new-kpi-value {
  font-size: 2rem;
  font-weight: 800;
  font-family: 'IBM Plex Mono', monospace;
  line-height: 1;
  margin-bottom: 0.5rem;
}

.new-kpi-teal { color: hsl(178, 60%, 30%); }
.new-kpi-gold { color: hsl(36, 75%, 36%); }

.new-kpi-delta {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.7rem;
  margin-bottom: 0.75rem;
}

.new-kpi-delta-teal { color: hsl(178, 60%, 30%); }
.new-kpi-delta-gold { color: hsl(36, 75%, 36%); }

.new-kpi-desc {
  font-size: 0.8rem;
  line-height: 1.45;
  color: #64748b;
  margin: 0;
}

.new-chart-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.new-chart-panel {
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  padding: 1.5rem;
}

.new-chart-tag {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.62rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #64748b;
  margin-bottom: 0.2rem;
}

.new-chart-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1.25rem;
}

/* ═══════════════════════════════════════════════════
   SECTION-3 · Our Community
═══════════════════════════════════════════════════ */

.new-comm-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 2.5rem;
  text-align: center;
}

.new-comm-stat {
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  padding: 1.5rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.new-comm-stat:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.09);
}

.new-comm-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 0.75rem;
}

.new-comm-icon--teal {
  background: rgba(0, 172, 157, 0.14);
  color: hsl(178, 60%, 30%);
}

.new-comm-icon--gold {
  background: rgba(180, 120, 20, 0.12);
  color: hsl(36, 75%, 36%);
}

.new-comm-value {
  font-size: 2.25rem;
  font-weight: 800;
  font-family: 'IBM Plex Mono', monospace;
  line-height: 1;
  margin-bottom: 0.4rem;
}

.new-comm-label {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.62rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #1e293b;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.new-comm-desc {
  font-size: 0.78rem;
  line-height: 1.4;
  color: #64748b;
  margin: 0;
}

.new-join-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-top: 2.5rem;
}

.new-join-panel {
  border-radius: 12px;
  padding: 2rem;
}

.new-join-panel--teal {
  border: 1px solid rgba(0, 172, 157, 0.28);
  background: rgba(0, 172, 157, 0.05);
}

.new-join-panel--default {
  border: 1px solid rgba(0, 0, 0, 0.08);
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(10px);
}

.new-join-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.75rem;
}

.new-join-body {
  font-size: 0.875rem;
  line-height: 1.65;
  color: #64748b;
  margin-bottom: 1.5rem;
}

.new-join-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.new-join-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.new-join-btn:hover { opacity: 0.8; }

.new-join-btn--primary {
  background: hsl(178, 60%, 30%);
  color: white;
}

.new-join-btn--secondary {
  border: 1px solid rgba(0, 0, 0, 0.15);
  color: #1e293b;
  background: transparent;
}

.new-contribute-list {
  list-style: none;
  padding: 0;
  margin: 0 0 1.25rem;
}

.new-contribute-list li {
  font-size: 0.875rem;
  color: #64748b;
  padding: 0.35rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.new-contribute-list li::before {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: hsl(36, 75%, 45%);
  flex-shrink: 0;
}

.new-contribute-link {
  font-size: 0.875rem;
  font-weight: 500;
  color: hsl(36, 75%, 36%);
  text-decoration: none;
}

.new-contribute-link:hover { text-decoration: underline; }

/* ═══════════════════════════════════════════════════
   SECTION-4 · Developer Docs
═══════════════════════════════════════════════════ */

.new-doc-split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-top: 2rem;
}

.new-doc-col-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.09);
  margin-bottom: 1.25rem;
}

.new-doc-col-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 0.15rem;
}

.new-doc-badge {
  margin-left: auto;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.6rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  font-weight: 600;
  flex-shrink: 0;
}

.new-doc-badge--teal {
  color: hsl(178, 60%, 30%);
  border: 1px solid rgba(0, 172, 157, 0.28);
  background: rgba(0, 172, 157, 0.1);
}

.new-doc-badge--gold {
  color: hsl(36, 75%, 36%);
  border: 1px solid rgba(180, 120, 20, 0.25);
  background: rgba(180, 120, 20, 0.09);
}

.new-doc-cards {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.new-doc-card {
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 10px;
  padding: 1.1rem 1.25rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.new-doc-card:hover {
  border-color: rgba(0, 0, 0, 0.14);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}

.new-doc-card-header {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.new-doc-icon {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.new-doc-icon--teal {
  background: rgba(0, 172, 157, 0.14);
  color: hsl(178, 60%, 30%);
}

.new-doc-icon--gold {
  background: rgba(180, 120, 20, 0.12);
  color: hsl(36, 75%, 36%);
}

.new-doc-card-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 0.25rem;
}

.new-doc-card-desc {
  font-size: 0.75rem;
  line-height: 1.4;
  color: #64748b;
  margin: 0;
}

.new-doc-links {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.new-doc-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.78rem;
  padding: 0.3rem 0.5rem;
  border-radius: 4px;
  text-decoration: none;
  transition: background 0.15s ease;
}

.new-doc-link:hover { background: rgba(0, 0, 0, 0.04); }
.new-doc-link--teal { color: hsl(178, 60%, 30%); }
.new-doc-link--gold { color: hsl(36, 75%, 36%); }

.new-doc-cta {
  display: inline-block;
  margin-top: 1.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.new-doc-cta:hover { text-decoration: underline; }
.new-doc-cta--teal { color: hsl(178, 60%, 30%); }
.new-doc-cta--gold { color: hsl(36, 75%, 36%); }

@media (max-width: 1024px) {
  .new-kpi-grid { grid-template-columns: repeat(2, 1fr); }
  .new-comm-grid { grid-template-columns: repeat(2, 1fr); }
  .new-chart-row { grid-template-columns: 1fr; }
  .new-doc-split { grid-template-columns: 1fr; gap: 2rem; }
}

@media (max-width: 640px) {
  .new-kpi-grid { grid-template-columns: 1fr; }
  .new-comm-grid { grid-template-columns: 1fr; }
  .new-join-grid { grid-template-columns: 1fr; }
}
</style>