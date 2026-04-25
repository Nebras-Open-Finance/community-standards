<template>
  <div class="ed-pr">

    <PageHeader />

    <!-- ═══════════════════════════════════════════════════════════════════
         HERO
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ed-pr-hero">
      <div class="ed-pr-hero__inner">
        <div class="ed-pr-hero__label">
          <span class="ed-pr-hero__label-dash" />
          AlTareq &middot; Commercial and Pricing Model
        </div>
        <h1 class="ed-pr-hero__title">Pricing</h1>
        <p class="ed-pr-hero__sub">
          Pricing in UAE Open Finance is built on three clear streams:
          API&nbsp;Hub fees from Nebras for use of the platform, payment fees
          from the LFI that executes each transaction, and data&#8209;sharing
          fees from the LFI once a customer&rsquo;s usage passes a generous
          free threshold. This page walks through how each one is calculated.
        </p>

        <div class="ed-pr-hero__scope">
          <div class="ed-pr-hero__scope-row">
            <span class="ed-pr-hero__scope-tag ed-pr-hero__scope-tag--in">In scope</span>
            <span class="ed-pr-hero__scope-desc">
              The three fee streams a TPP will encounter when operating in
              the ecosystem &mdash; Nebras API&nbsp;Hub fees, LFI payment
              fees, and LFI data&#8209;sharing fees above the free threshold.
            </span>
          </div>
          <div class="ed-pr-hero__scope-row">
            <span class="ed-pr-hero__scope-tag ed-pr-hero__scope-tag--out">Not covered here</span>
            <span class="ed-pr-hero__scope-desc">
              End&#8209;user pricing (what a TPP may charge its own customers),
              LFI&#8209;to&#8209;TPP commissions on referred business, and any
              CBUAE license fees. These are governed elsewhere in the AlTareq
              Standards.
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         THE THREE FEES AT A GLANCE
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ed-pr-overview">
      <div class="ed-pr-overview__inner">
        <div class="ed-pr-overview__head">
          <div class="ed-pr-overview__eyebrow">
            <span class="ed-pr-overview__eyebrow-dash" />
            The three fees
          </div>
          <h2 class="ed-pr-overview__title">How the fee structure works</h2>
          <p class="ed-pr-overview__lede">
            Fees only apply to <strong>technically successful</strong> API
            calls. The three streams stack: a single consumer payment through
            Open Banking will typically attract a Nebras API&nbsp;fee
            <em>and</em> a payment fee to the LFI executing it.
          </p>
        </div>

        <div class="ed-pr-overview__grid">
          <a
            v-for="fee in feeStreams"
            :key="fee.title"
            :href="fee.anchor"
            class="ed-pr-overview__card"
            :style="{ '--card-color': fee.color }"
            @click="onFeeCardClick($event, fee.anchor)"
          >
            <span class="ed-pr-overview__card-top" :style="{ background: fee.color }" />

            <div class="ed-pr-overview__card-meta">
              <span class="ed-pr-overview__card-index">{{ fee.index }}</span>
              <span class="ed-pr-overview__card-cat" :style="{ color: fee.color }">
                {{ fee.category }}
              </span>
            </div>

            <h3 class="ed-pr-overview__card-title">{{ fee.title }}</h3>
            <p class="ed-pr-overview__card-desc">{{ fee.desc }}</p>

            <div class="ed-pr-overview__card-headline">
              <span class="ed-pr-overview__card-headline-label">Headline rate</span>
              <span class="ed-pr-overview__card-headline-value" v-html="fee.headline" />
            </div>

            <div class="ed-pr-overview__card-foot">
              <span class="ed-pr-overview__card-cta">See the detail</span>
              <span class="ed-pr-overview__card-arrow" :style="{ color: fee.color }">&darr;</span>
            </div>
          </a>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         FEE 1 — NEBRAS API HUB FEES
    ═══════════════════════════════════════════════════════════════════ -->
    <section id="nebras-api-fees" class="ed-pr-detail ed-pr-detail--hub">
      <div class="ed-pr-detail__inner">
        <div class="ed-pr-detail__head">
          <div class="ed-pr-detail__eyebrow">
            <span class="ed-pr-detail__eyebrow-dash" />
            Fee 01 &middot; TPP &rarr; Nebras
          </div>
          <h2 class="ed-pr-detail__title">API Hub fees</h2>
          <p class="ed-pr-detail__lede">
            Nebras charges TPPs a flat per&#8209;call fee for chargeable APIs
            served through the API&nbsp;Hub. Only endpoints that
            <strong>pull data from an LFI</strong> or
            <strong>instruct a payment</strong> are chargeable. Everything
            else &mdash; raising or checking a consent, authentication,
            discovery, and reference&#8209;data lookups &mdash; is free.
          </p>
        </div>

        <!-- Rate by chargeability status -->
        <div class="ed-pr-rate-table">
          <div class="ed-pr-rate-table__head">
            <span>Chargeability</span>
            <span>Rate per successful call</span>
          </div>
          <div class="ed-pr-rate-table__row">
            <span class="ed-pr-rate-table__label">Chargeable</span>
            <span class="ed-pr-rate-table__value">2.5 fils</span>
          </div>
          <div class="ed-pr-rate-table__row">
            <span class="ed-pr-rate-table__label">Not chargeable</span>
            <span class="ed-pr-rate-table__value">Free</span>
          </div>
        </div>

        <!-- Discount rule -->
        <div class="ed-pr-detail__note">
          <span class="ed-pr-detail__note-tag">Payment&#8209;paired discount</span>
          <span class="ed-pr-detail__note-body">
            <strong>Balance</strong> and
            <strong>Confirmation of Payee</strong> calls are billed at
            <strong>0.5&nbsp;fils</strong> instead of 2.5&nbsp;fils when made
            within <strong>2&nbsp;hours</strong> of a payment. One payment
            discounts only one Balance call and one CoP call.
          </span>
        </div>

        <p class="ed-pr-detail__footnote">
          <a href="/pricing/endpoints/">See the full list of chargeable endpoints &rarr;</a>
        </p>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         FEE 2 — LFI PAYMENT FEES
    ═══════════════════════════════════════════════════════════════════ -->
    <section id="lfi-payment-fees" class="ed-pr-detail ed-pr-detail--payments">
      <div class="ed-pr-detail__inner">
        <div class="ed-pr-detail__head">
          <div class="ed-pr-detail__eyebrow">
            <span class="ed-pr-detail__eyebrow-dash" />
            Fee 02 &middot; TPP &rarr; LFI
          </div>
          <h2 class="ed-pr-detail__title">Payment fees</h2>
          <p class="ed-pr-detail__lede">
            When a TPP initiates a successful payment through the API&nbsp;Hub,
            the LFI that executes the payment charges the TPP a fee. Rates
            are capped by the AlTareq model and vary by customer segment
            (Retail/SME vs Corporate) and payment context. Nebras calculates
            and collects these fees on behalf of LFIs.
          </p>
        </div>

        <!-- Retail & SME -->
        <div class="ed-pr-seg">
          <div class="ed-pr-seg__head">
            <span class="ed-pr-seg__tag">Retail &amp; SME</span>
            <span class="ed-pr-seg__hint">Caps are binding</span>
          </div>

          <div class="ed-pr-ctx-table">
            <div class="ed-pr-ctx-table__head">
              <span>Payment context</span>
              <span>Cap paid by TPP to LFI</span>
            </div>

            <div class="ed-pr-ctx-table__row">
              <div class="ed-pr-ctx-table__label">
                <strong>Merchant Collections</strong>
                <span>Debit&#8209;card&#8209;equivalent, initiated by the merchant via the TPP.</span>
              </div>
              <div class="ed-pr-ctx-table__value">
                <span class="ed-pr-ctx-table__primary">
                  38&nbsp;bps in Year&nbsp;1, stepping down to 25&nbsp;bps by Year&nbsp;5
                </span>
                <span class="ed-pr-ctx-table__schedule">
                  <span>Y1 38&nbsp;bps</span>
                  <span>Y2 35&nbsp;bps</span>
                  <span>Y3 32&nbsp;bps</span>
                  <span>Y4 29&nbsp;bps</span>
                  <span>Y5 25&nbsp;bps</span>
                </span>
                <span class="ed-pr-ctx-table__secondary">
                  Also capped at <strong>50 AED</strong> per transaction; first
                  <strong>200 AED</strong> collected per merchant per day is
                  exempt.
                </span>
              </div>
            </div>

            <div class="ed-pr-ctx-table__row">
              <div class="ed-pr-ctx-table__label">
                <strong>Transfer (P2P) &amp; SME&#8209;to&#8209;SME</strong>
                <span>Outbound payment from the customer&rsquo;s own account.</span>
              </div>
              <div class="ed-pr-ctx-table__value">
                <span class="ed-pr-ctx-table__primary">25&nbsp;fils per transaction</span>
              </div>
            </div>

            <div class="ed-pr-ctx-table__row">
              <div class="ed-pr-ctx-table__label">
                <strong>Me&#8209;to&#8209;Me</strong>
                <span>Outbound payment from a customer&rsquo;s own account to another of their own.</span>
              </div>
              <div class="ed-pr-ctx-table__value">
                <span class="ed-pr-ctx-table__primary">
                  20&nbsp;fils in Year&nbsp;1, stepping down to 17&nbsp;fils by Year&nbsp;3
                </span>
                <span class="ed-pr-ctx-table__schedule">
                  <span>Y1 20&nbsp;fils</span>
                  <span>Y2 18&nbsp;fils</span>
                  <span>Y3 17&nbsp;fils</span>
                </span>
              </div>
            </div>

            <div class="ed-pr-ctx-table__row">
              <div class="ed-pr-ctx-table__label">
                <strong>Bulk Payment &mdash; SME only</strong>
                <span>Outbound bulk payment initiated by the business.</span>
              </div>
              <div class="ed-pr-ctx-table__value">
                <span class="ed-pr-ctx-table__primary">
                  25&nbsp;fils per transaction, and 250&nbsp;fils per batch
                </span>
                <span class="ed-pr-ctx-table__secondary">
                  No limit on the number of transactions in a batch.
                </span>
              </div>
            </div>

            <div class="ed-pr-ctx-table__row">
              <div class="ed-pr-ctx-table__label">
                <strong>Large Value / Rent / Invoice Collection</strong>
                <span>Collected via an embedded payment link in a smart invoice or equivalent.</span>
              </div>
              <div class="ed-pr-ctx-table__value">
                <span class="ed-pr-ctx-table__primary">4 AED per transaction</span>
                <span class="ed-pr-ctx-table__secondary">
                  E.g. rent payments; retail/SME invoices above AED&nbsp;5,000.
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Corporate -->
        <div class="ed-pr-seg">
          <div class="ed-pr-seg__head">
            <span class="ed-pr-seg__tag ed-pr-seg__tag--corp">Corporate</span>
            <span class="ed-pr-seg__hint">Turnover &gt; 100m AED / year</span>
          </div>

          <div class="ed-pr-ctx-table">
            <div class="ed-pr-ctx-table__head">
              <span>Payment context</span>
              <span>Cap paid by TPP to LFI</span>
            </div>

            <div class="ed-pr-ctx-table__row">
              <div class="ed-pr-ctx-table__label">
                <strong>Merchant Collections</strong>
                <span>Initiated by a corporate merchant via the TPP.</span>
              </div>
              <div class="ed-pr-ctx-table__value">
                <span class="ed-pr-ctx-table__primary">
                  38&nbsp;bps in Year&nbsp;1, stepping down to 25&nbsp;bps by Year&nbsp;5
                </span>
                <span class="ed-pr-ctx-table__schedule">
                  <span>Y1 38&nbsp;bps</span>
                  <span>Y2 35&nbsp;bps</span>
                  <span>Y3 32&nbsp;bps</span>
                  <span>Y4 29&nbsp;bps</span>
                  <span>Y5 25&nbsp;bps</span>
                </span>
                <span class="ed-pr-ctx-table__secondary">
                  Also capped at <strong>50 AED</strong> per transaction.
                </span>
              </div>
            </div>

            <div class="ed-pr-ctx-table__row">
              <div class="ed-pr-ctx-table__label">
                <strong>Corporate Payments</strong>
                <span>Outbound payment from the corporate&rsquo;s own account. Includes bulk payments.</span>
              </div>
              <div class="ed-pr-ctx-table__value">
                <span class="ed-pr-ctx-table__primary">250 fils per individual transaction</span>
              </div>
            </div>

            <div class="ed-pr-ctx-table__row">
              <div class="ed-pr-ctx-table__label">
                <strong>Large Value / Rent / Invoice Collection</strong>
                <span>Collected via an embedded payment link in a smart invoice or equivalent.</span>
              </div>
              <div class="ed-pr-ctx-table__value">
                <span class="ed-pr-ctx-table__primary">4 AED per transaction</span>
                <span class="ed-pr-ctx-table__secondary">
                  E.g. rent payments; corporate invoices above AED&nbsp;5,000.
                </span>
              </div>
            </div>
          </div>
        </div>

        <p class="ed-pr-detail__footnote">
          These caps apply whether the payment settles through <strong>Aani
          Core</strong> or an alternative payment rail. LFIs MUST NOT impose
          additional charges on end users for payments initiated through
          Open Finance APIs.
        </p>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         FEE 3 — LFI DATA SHARING ABOVE THRESHOLD
    ═══════════════════════════════════════════════════════════════════ -->
    <section id="lfi-data-fees" class="ed-pr-detail ed-pr-detail--data">
      <div class="ed-pr-detail__inner">
        <div class="ed-pr-detail__head">
          <div class="ed-pr-detail__eyebrow">
            <span class="ed-pr-detail__eyebrow-dash" />
            Fee 03 &middot; TPP &rarr; LFI
          </div>
          <h2 class="ed-pr-detail__title">Data&#8209;sharing fees above threshold</h2>
          <p class="ed-pr-detail__lede">
            Data sharing is free up to a per&#8209;customer, per&#8209;day
            threshold. Above that threshold, the LFI charges the TPP for
            continued transactional&#8209;data retrieval. Thresholds and caps
            differ between Retail/SME and Corporate.
          </p>
        </div>

        <!-- Page definition — important callout -->
        <div class="ed-pr-pagedef">
          <div class="ed-pr-pagedef__tag">How a &ldquo;page&rdquo; is defined</div>
          <div class="ed-pr-pagedef__body">
            <p>
              A <strong>page</strong> is <strong>100 lines of transactional
              data</strong>, with a maximum age span of
              <strong>13 months</strong> per call. If a single API call
              returns more than 100 lines, it is treated as multiple pages
              and charged accordingly.
            </p>
          </div>
        </div>

        <!-- Retail & SME -->
        <div class="ed-pr-seg">
          <div class="ed-pr-seg__head">
            <span class="ed-pr-seg__tag">Retail &amp; SME</span>
            <span class="ed-pr-seg__hint">Free threshold, then LFI&#8209;set</span>
          </div>

          <div class="ed-pr-ctx-table">
            <div class="ed-pr-ctx-table__head">
              <span>Data&#8209;sharing context</span>
              <span>Threshold &amp; rate</span>
            </div>

            <div class="ed-pr-ctx-table__row">
              <div class="ed-pr-ctx-table__label">
                <strong>Attended transactional data</strong>
                <span>Triggered by an active user of the TPP&rsquo;s service.</span>
              </div>
              <div class="ed-pr-ctx-table__value">
                <span class="ed-pr-ctx-table__primary">
                  Free up to <strong>15 pages</strong> per customer, per day
                </span>
                <span class="ed-pr-ctx-table__secondary">
                  Above 15 pages/customer/day &mdash; priced by the LFI.
                </span>
              </div>
            </div>

            <div class="ed-pr-ctx-table__row">
              <div class="ed-pr-ctx-table__label">
                <strong>Unattended transactional data</strong>
                <span>Initiated without an active user &mdash; e.g. background refresh.</span>
              </div>
              <div class="ed-pr-ctx-table__value">
                <span class="ed-pr-ctx-table__primary">
                  Free up to <strong>5 pages</strong> per customer, per day
                </span>
                <span class="ed-pr-ctx-table__secondary">
                  Above 5 pages/customer/day &mdash; priced by the LFI.
                </span>
              </div>
            </div>

            <div class="ed-pr-ctx-table__row">
              <div class="ed-pr-ctx-table__label">
                <strong>All other Data APIs</strong>
                <span>
                  Confirmation of Payee, Balance, Payment Status, Product
                  Data, Customer Records.
                </span>
              </div>
              <div class="ed-pr-ctx-table__value">
                <span class="ed-pr-ctx-table__primary">Zero &mdash; always free to the TPP</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Corporate -->
        <div class="ed-pr-seg">
          <div class="ed-pr-seg__head">
            <span class="ed-pr-seg__tag ed-pr-seg__tag--corp">Corporate</span>
            <span class="ed-pr-seg__hint">Capped per page</span>
          </div>

          <div class="ed-pr-ctx-table">
            <div class="ed-pr-ctx-table__head">
              <span>Data&#8209;sharing context</span>
              <span>Rate</span>
            </div>

            <div class="ed-pr-ctx-table__row">
              <div class="ed-pr-ctx-table__label">
                <strong>All Data APIs</strong>
                <span>Any transactional&#8209;data retrieval for a corporate customer.</span>
              </div>
              <div class="ed-pr-ctx-table__value">
                <span class="ed-pr-ctx-table__primary">Capped at 40 fils per page</span>
              </div>
            </div>

            <div class="ed-pr-ctx-table__row">
              <div class="ed-pr-ctx-table__label">
                <strong>Confirmation of Payee</strong>
                <span>Payee verification prior to a payment.</span>
              </div>
              <div class="ed-pr-ctx-table__value">
                <span class="ed-pr-ctx-table__primary">Zero</span>
              </div>
            </div>
          </div>
        </div>

        <p class="ed-pr-lfi-link">
          Above the free threshold each LFI sets its own per&#8209;call rate.
          <a href="/pricing/lfi-rates/">See per&#8209;LFI overage rates &rarr;</a>
        </p>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         FEE CALCULATOR — PLACEHOLDER
    ═══════════════════════════════════════════════════════════════════ -->
    <section id="fee-calculator" class="ed-pr-calc">
      <div class="ed-pr-calc__inner">
        <div class="ed-pr-calc__head">
          <div class="ed-pr-calc__eyebrow">
            <span class="ed-pr-calc__eyebrow-dash" />
            Fee calculator
          </div>
          <h2 class="ed-pr-calc__title">Try a scenario</h2>
          <p class="ed-pr-calc__lede">
            Pick a starting point, then tinker with the inputs to model your
            own flow. Calculations follow the caps and stepped rates published
            in the AlTareq Commercial and Pricing Model &mdash; this is a
            guide, not a quote.
          </p>
        </div>

        <div class="ed-pr-calc__presets">
          <span class="ed-pr-calc__presets-label">Start from a scenario</span>
          <div class="ed-pr-calc__presets-list">
            <button
              v-for="p in PRESETS"
              :key="p.id"
              type="button"
              class="ed-pr-calc__preset"
              :class="{ 'is-active': activePresetId === p.id }"
              @click="applyPreset(p)"
            >
              <span class="ed-pr-calc__preset-label">{{ p.label }}</span>
              <span class="ed-pr-calc__preset-blurb">{{ p.blurb }}</span>
            </button>
          </div>
        </div>

        <div class="ed-pr-calc__body">
          <div class="ed-pr-calc__inputs">
            <div class="ed-pr-calc__panel-eyebrow">Inputs</div>

            <label class="ed-pr-calc__field">
              <span class="ed-pr-calc__field-label">Flow type</span>
              <select v-model="inputs.flowId" class="ed-pr-calc__select">
                <option v-for="f in FLOW_LIST" :key="f.id" :value="f.id">{{ f.label }}</option>
              </select>
            </label>

            <div v-if="currentFlow.yearStep" class="ed-pr-calc__field">
              <span class="ed-pr-calc__field-label">Year</span>
              <div class="ed-pr-calc__year-toggle">
                <button
                  v-for="y in currentFlow.yearStep.years"
                  :key="y"
                  type="button"
                  :class="['ed-pr-calc__year-btn', { 'is-active': inputs.year === y }]"
                  @click="inputs.year = y"
                >Y{{ y }}</button>
              </div>
            </div>

            <template v-if="currentFlow.kind === 'payment'">
              <label class="ed-pr-calc__field">
                <span class="ed-pr-calc__field-label">Monthly volume</span>
                <div class="ed-pr-calc__input-with-unit">
                  <input
                    type="number"
                    min="0"
                    v-model.number="inputs.monthlyVolume"
                    class="ed-pr-calc__input"
                  />
                  <span class="ed-pr-calc__input-unit">{{ currentFlow.unit }}</span>
                </div>
              </label>

              <label v-if="currentFlow.needsAmount" class="ed-pr-calc__field">
                <span class="ed-pr-calc__field-label">Average transaction amount</span>
                <div class="ed-pr-calc__input-with-unit">
                  <input
                    type="number"
                    min="0"
                    step="1"
                    v-model.number="inputs.avgAmountAED"
                    class="ed-pr-calc__input"
                  />
                  <span class="ed-pr-calc__input-unit">AED</span>
                </div>
              </label>

              <label class="ed-pr-calc__check">
                <input type="checkbox" v-model="inputs.pairWithCoP" />
                <span>Pair each payment with a Confirmation of Payee call (discounted to 0.5&nbsp;fils)</span>
              </label>
            </template>

            <template v-if="currentFlow.kind === 'data'">
              <label class="ed-pr-calc__field">
                <span class="ed-pr-calc__field-label">Active customers</span>
                <div class="ed-pr-calc__input-with-unit">
                  <input
                    type="number"
                    min="0"
                    v-model.number="inputs.customers"
                    class="ed-pr-calc__input"
                  />
                  <span class="ed-pr-calc__input-unit">customers</span>
                </div>
              </label>

              <label class="ed-pr-calc__field">
                <span class="ed-pr-calc__field-label">Data sharing requests per customer per month</span>
                <div class="ed-pr-calc__input-with-unit">
                  <input
                    type="number"
                    min="0"
                    v-model.number="inputs.monthlyRequests"
                    class="ed-pr-calc__input"
                  />
                  <span class="ed-pr-calc__input-unit">requests</span>
                </div>
              </label>

              <label class="ed-pr-calc__check">
                <input type="checkbox" v-model="inputs.hasBillableRequests" />
                <span>Some requests exceed the daily free threshold (5 unattended / 15 attended pages per customer)</span>
              </label>

              <template v-if="inputs.hasBillableRequests">
                <label class="ed-pr-calc__field ed-pr-calc__field--secondary">
                  <span class="ed-pr-calc__field-label">Requests per customer per month above threshold</span>
                  <div class="ed-pr-calc__input-with-unit">
                    <input
                      type="number"
                      min="0"
                      v-model.number="inputs.billableRequests"
                      class="ed-pr-calc__input"
                    />
                    <span class="ed-pr-calc__input-unit">requests</span>
                  </div>
                </label>

                <label class="ed-pr-calc__field">
                  <span class="ed-pr-calc__field-label">LFI overage rate</span>
                  <div class="ed-pr-calc__input-with-unit">
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      v-model.number="inputs.lfiOverageAED"
                      class="ed-pr-calc__input"
                    />
                    <span class="ed-pr-calc__input-unit">AED / call</span>
                  </div>
                </label>
              </template>
            </template>
          </div>

          <div class="ed-pr-calc__outputs">
            <div class="ed-pr-calc__panel-eyebrow">Estimate</div>

            <div class="ed-pr-calc__total">
              <span class="ed-pr-calc__total-label">Monthly cost</span>
              <span class="ed-pr-calc__total-value">{{ formatAED(totals.monthlyAED) }}</span>
              <span class="ed-pr-calc__total-yearly">~ {{ formatAED(totals.yearlyAED) }} per year</span>
            </div>

            <div class="ed-pr-calc__breakdown">
              <div class="ed-pr-calc__breakdown-row">
                <span class="ed-pr-calc__breakdown-label">Nebras API fees</span>
                <span class="ed-pr-calc__breakdown-value">{{ formatAED(totals.nebrasAED) }}</span>
              </div>
              <div v-if="totals.lfiAED > 0" class="ed-pr-calc__breakdown-row">
                <span class="ed-pr-calc__breakdown-label">
                  LFI {{ result.lfiKind === 'payment' ? 'payment' : 'data-sharing' }} fees
                </span>
                <span class="ed-pr-calc__breakdown-value">{{ formatAED(totals.lfiAED) }}</span>
              </div>
              <div
                v-if="totals.overageAED > 0"
                class="ed-pr-calc__breakdown-row ed-pr-calc__breakdown-row--secondary"
              >
                <span class="ed-pr-calc__breakdown-label">Data overage above threshold</span>
                <span class="ed-pr-calc__breakdown-value">{{ formatAED(totals.overageAED) }}</span>
              </div>
            </div>

            <ul v-if="result?.assumptions?.length" class="ed-pr-calc__assumptions">
              <li v-for="a in result.assumptions" :key="a">{{ a }}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         WHERE THIS COMES FROM
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ed-pr-auth">
      <div class="ed-pr-auth__inner">
        <div class="ed-pr-auth__head">
          <div class="ed-pr-auth__eyebrow">
            <span class="ed-pr-auth__eyebrow-dash" />
            Authority
          </div>
          <h2 class="ed-pr-auth__title">Where this model comes from</h2>
          <p class="ed-pr-auth__lede">
            The fees on this page come from the AlTareq Commercial and
            Pricing Model, which forms part of the UAE Open Finance
            Regulations. It is regulated by <strong>CBUAE</strong> and
            reviewed annually in conjunction with Nebras Open Finance and
            ecosystem participants.
          </p>
        </div>

        <div class="ed-pr-auth__grid">
          <article class="ed-pr-auth__tile">
            <div class="ed-pr-auth__tile-eyebrow">Binding</div>
            <h3 class="ed-pr-auth__tile-title">Fee caps are regulatory</h3>
            <p class="ed-pr-auth__tile-body">
              A breach of this pricing model is treated as a breach of the
              CBUAE Open Finance Regulations and is subject to CBUAE
              supervision, investigation, and enforcement.
            </p>
          </article>

          <article class="ed-pr-auth__tile">
            <div class="ed-pr-auth__tile-eyebrow">Success&#8209;only</div>
            <h3 class="ed-pr-auth__tile-title">Fees follow successful calls</h3>
            <p class="ed-pr-auth__tile-body">
              All fees above are charged only for <strong>technically
              successful</strong> API calls. Failed calls do not attract
              either API&nbsp;Hub fees or LFI fees.
            </p>
          </article>

          <article class="ed-pr-auth__tile">
            <div class="ed-pr-auth__tile-eyebrow">VAT</div>
            <h3 class="ed-pr-auth__tile-title">All figures are VAT&#8209;inclusive</h3>
            <p class="ed-pr-auth__tile-body">
              All fees between TPPs and LFIs are stated inclusive of VAT. The
              receiving party is responsible for its own invoicing and VAT
              treatment &mdash; Nebras and CBUAE do not handle this.
            </p>
          </article>
        </div>
      </div>
    </section>

    <PageFooter />
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import PageHeader from './Components/PageHeader.vue'
import PageFooter from './Components/PageFooter.vue'
import { FLOWS, FLOW_LIST, PRESETS } from './data/feeCalculator.mjs'

const FILS_PER_AED = 100
const NEBRAS_FIL_PER_CALL = 2.5
const NEBRAS_FIL_DISCOUNTED = 0.5

const inputs = reactive({
  flowId: PRESETS[0].inputs.flowId,
  monthlyVolume: 0,
  avgAmountAED: 0,
  year: 1,
  pairWithCoP: false,
  customers: 0,
  monthlyRequests: 0,
  hasBillableRequests: false,
  billableRequests: 0,
  lfiOverageAED: 0,
})

applyPreset(PRESETS[0])

function applyPreset(preset) {
  Object.assign(inputs, preset.inputs)
}

const currentFlow = computed(() => FLOWS[inputs.flowId])

const activePresetId = computed(() => {
  for (const p of PRESETS) {
    let match = true
    for (const k of Object.keys(p.inputs)) {
      if (p.inputs[k] !== inputs[k]) { match = false; break }
    }
    if (match) return p.id
  }
  return null
})

const result = computed(() => {
  const flow = currentFlow.value
  if (!flow) return null
  return flow.kind === 'data'
    ? computeDataFlow(flow, inputs)
    : computePaymentFlow(flow, inputs)
})

const totals = computed(() => {
  const r = result.value
  if (!r) return { nebrasAED: 0, lfiAED: 0, overageAED: 0, monthlyAED: 0, yearlyAED: 0 }
  const nebrasAED = r.nebrasFils / FILS_PER_AED
  const lfiAED = r.lfiFils / FILS_PER_AED
  const overageAED = r.overageFils / FILS_PER_AED
  const monthlyAED = nebrasAED + lfiAED + overageAED
  return { nebrasAED, lfiAED, overageAED, monthlyAED, yearlyAED: monthlyAED * 12 }
})

function computePaymentFlow(flow, i) {
  const volume = Math.max(0, i.monthlyVolume || 0)
  const perTxnFils = flow.perTxnFils ? flow.perTxnFils(i) : 0
  const lfiFils = perTxnFils * volume

  const nebrasFils = volume * NEBRAS_FIL_PER_CALL
    + (i.pairWithCoP ? volume * NEBRAS_FIL_DISCOUNTED : 0)

  const assumptions = []
  assumptions.push(`Each payment is one chargeable Nebras call at ${NEBRAS_FIL_PER_CALL} fils.`)

  if (flow.needsAmount) {
    const bps = flow.yearStep.schedule[Math.min(flow.yearStep.schedule.length - 1, (i.year || 1) - 1)]
    const txnAED = perTxnFils / FILS_PER_AED
    if (txnAED >= 50) {
      assumptions.push(`Year ${i.year} rate of ${bps} bps × AED ${i.avgAmountAED} hits the AED 50 per-transaction cap.`)
    } else {
      assumptions.push(`Year ${i.year} rate of ${bps} bps × AED ${i.avgAmountAED} = AED ${txnAED.toFixed(2)} per transaction.`)
    }
  } else if (flow.yearStep) {
    assumptions.push(`Year ${i.year} per-transaction rate: ${perTxnFils} fils.`)
  } else if (perTxnFils >= FILS_PER_AED) {
    assumptions.push(`Per-transaction LFI fee: AED ${(perTxnFils / FILS_PER_AED).toFixed(2)}.`)
  } else {
    assumptions.push(`Per-transaction LFI fee: ${perTxnFils} fils.`)
  }

  if (i.pairWithCoP) {
    assumptions.push(`Each payment is paired with one Confirmation of Payee call at the discounted ${NEBRAS_FIL_DISCOUNTED} fils rate.`)
  }

  return { nebrasFils, lfiFils, overageFils: 0, assumptions, lfiKind: 'payment' }
}

function computeDataFlow(flow, i) {
  const customers = Math.max(0, i.customers || 0)
  const monthlyRequests = Math.max(0, i.monthlyRequests || 0)
  const totalRequests = customers * monthlyRequests

  const billable = i.hasBillableRequests
    ? Math.max(0, i.billableRequests || 0)
    : 0
  const totalBillable = customers * billable
  const overageAED = totalBillable * (i.lfiOverageAED || 0)
  const overageFils = overageAED * FILS_PER_AED

  const nebrasFils = totalRequests * NEBRAS_FIL_PER_CALL

  const assumptions = []
  assumptions.push(`Each request is one Nebras-chargeable call at ${NEBRAS_FIL_PER_CALL} fils.`)

  if (i.hasBillableRequests && billable > 0) {
    assumptions.push(`${billable} request${billable === 1 ? '' : 's'} per customer per month exceed the daily free threshold (5 unattended / 15 attended pages).`)
    if ((i.lfiOverageAED || 0) > 0) {
      assumptions.push(`Charged at AED ${(i.lfiOverageAED || 0).toFixed(2)} per call by the LFI.`)
    } else {
      assumptions.push(`No LFI overage rate set — overage is currently free.`)
    }
  } else {
    assumptions.push(`All requests stay within the daily free threshold (5 unattended / 15 attended pages per customer).`)
  }

  return { nebrasFils, lfiFils: 0, overageFils, assumptions, lfiKind: 'data' }
}

function formatAED(n) {
  if (!Number.isFinite(n)) return '—'
  return new Intl.NumberFormat('en-AE', {
    style: 'currency',
    currency: 'AED',
    maximumFractionDigits: 2,
  }).format(n)
}

function onFeeCardClick(event, anchor) {
  const id = anchor.startsWith('#') ? anchor.slice(1) : anchor
  const target = typeof document !== 'undefined' ? document.getElementById(id) : null
  if (!target) return
  event.preventDefault()
  target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  if (typeof history !== 'undefined' && history.pushState) {
    history.pushState(null, '', anchor)
  }
}

const feeStreams = [
  {
    index: '01',
    category: 'TPP → Nebras',
    color: 'var(--at-teal)',
    title: 'API Hub fees',
    desc: 'A per-call fee paid by the TPP to Nebras for every chargeable API served through the API Hub.',
    headline: '2.5 fils / call &mdash; <span>most APIs</span>',
    anchor: '#nebras-api-fees',
  },
  {
    index: '02',
    category: 'TPP → LFI',
    color: 'var(--at-blue-deep)',
    title: 'Payment fees',
    desc: 'Paid by the TPP to the LFI that executes a payment, capped by segment and payment context.',
    headline: 'from 25 fils / txn &mdash; <span>Transfer (P2P)</span>',
    anchor: '#lfi-payment-fees',
  },
  {
    index: '03',
    category: 'TPP → LFI',
    color: 'var(--at-gold)',
    title: 'Data sharing above threshold',
    desc: 'Free up to a per-customer daily threshold. Above that, the LFI charges the TPP for continued retrieval.',
    headline: '0 &rarr; LFI&#8209;set &mdash; <span>above 15 pages/day</span>',
    anchor: '#lfi-data-fees',
  },
]
</script>

<style scoped>
.ed-pr {
  background: var(--at-bg-cream);
  color: var(--at-navy-deep);
  font-family: var(--at-sans);
  padding-top: 4.25rem;
}

/* ─── Hero ──────────────────────────────────────────────────────────────── */
.ed-pr-hero {
  background: var(--at-bg-cream);
  border-bottom: 1px solid var(--at-grid-line);
}

.ed-pr-hero__inner {
  max-width: var(--at-page-max);
  margin: 0 auto;
  padding: 4.5rem 2rem 3rem;
}

.ed-pr-hero__label {
  font-family: var(--at-mono);
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--at-teal);
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.ed-pr-hero__label-dash {
  width: 24px;
  height: 1px;
  background: currentColor;
}

.ed-pr-hero__title {
  font-family: var(--at-serif);
  font-size: clamp(2.75rem, 6.5vw, 4.5rem);
  font-weight: 600;
  line-height: 0.98;
  letter-spacing: -0.035em;
  margin: 0;
  color: var(--at-navy-deep);
}

.ed-pr-hero__sub {
  font-family: var(--at-sans);
  font-size: 1.15rem;
  line-height: 1.6;
  margin: 1.75rem 0 2rem;
  max-width: 52rem;
  color: var(--at-mute-2);
}

/* Scope rows */
.ed-pr-hero__scope {
  margin-top: 2.25rem;
  border: 1px solid var(--at-grid-line);
  background: var(--at-surface);
  max-width: 56rem;
}

.ed-pr-hero__scope-row {
  display: grid;
  grid-template-columns: 10rem 1fr;
  align-items: baseline;
  gap: 1.25rem;
  padding: 1rem 1.1rem;
  border-bottom: 1px solid var(--at-grid-line);
}

.ed-pr-hero__scope-row:last-child { border-bottom: none; }

.ed-pr-hero__scope-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.3rem 0 0;
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-weight: 700;
}

.ed-pr-hero__scope-tag::before {
  content: '';
  width: 18px;
  height: 1px;
  background: currentColor;
}

.ed-pr-hero__scope-tag--in { color: var(--at-teal); }
.ed-pr-hero__scope-tag--out { color: var(--at-mute); }

.ed-pr-hero__scope-desc {
  font-family: var(--at-sans);
  font-size: 0.92rem;
  line-height: 1.55;
  color: var(--at-mute-2);
}

.ed-pr-hero__scope-desc strong { color: var(--at-navy-deep); font-weight: 600; }

/* ─── Overview: three fees ──────────────────────────────────────────────── */
.ed-pr-overview {
  padding: 4rem 0;
  background: var(--at-surface);
  border-top: 1px solid var(--at-grid-line);
}

.ed-pr-overview__inner {
  max-width: var(--at-page-max);
  margin: 0 auto;
  padding: 0 2rem;
}

.ed-pr-overview__head { max-width: 48rem; margin-bottom: 2.5rem; }

.ed-pr-overview__eyebrow {
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--at-teal);
  margin-bottom: 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 600;
}

.ed-pr-overview__eyebrow-dash {
  width: 24px;
  height: 1px;
  background: currentColor;
}

.ed-pr-overview__title {
  font-family: var(--at-serif);
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 500;
  letter-spacing: -0.025em;
  line-height: 1.05;
  margin: 0;
  color: var(--at-navy-deep);
}

.ed-pr-overview__lede {
  font-family: var(--at-sans);
  font-size: 1rem;
  line-height: 1.65;
  color: var(--at-mute-2);
  margin: 1.1rem 0 0;
}

.ed-pr-overview__lede strong { color: var(--at-navy-deep); font-weight: 600; }
.ed-pr-overview__lede em { font-style: italic; color: var(--at-navy-deep); }

.ed-pr-overview__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}

.ed-pr-overview__card {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 2rem 1.75rem 1.5rem;
  background: var(--at-bg-cream);
  border: 1px solid var(--at-grid-line);
  text-decoration: none;
  color: inherit;
  transition: border-color 0.2s ease, transform 0.2s ease;
}

.ed-pr-overview__card:hover {
  border-color: var(--card-color, var(--at-navy));
  transform: translateY(-2px);
}

.ed-pr-overview__card-top {
  position: absolute;
  top: 0;
  left: 0;
  width: 48px;
  height: 3px;
}

.ed-pr-overview__card-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 700;
}

.ed-pr-overview__card-index {
  color: var(--at-mute);
  font-weight: 700;
}

.ed-pr-overview__card-title {
  font-family: var(--at-serif);
  font-size: 1.45rem;
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: var(--at-navy-deep);
  margin: 0 0 0.75rem;
}

.ed-pr-overview__card-desc {
  font-family: var(--at-sans);
  font-size: 0.93rem;
  line-height: 1.6;
  color: var(--at-mute-2);
  margin: 0 0 1.25rem;
  flex: 1;
}

.ed-pr-overview__card-headline {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.9rem 0;
  border-top: 1px dashed var(--at-grid-line-2);
  border-bottom: 1px dashed var(--at-grid-line-2);
  margin-bottom: 1rem;
}

.ed-pr-overview__card-headline-label {
  font-family: var(--at-mono);
  font-size: 0.6rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--at-mute);
  font-weight: 700;
}

.ed-pr-overview__card-headline-value {
  font-family: var(--at-serif);
  font-size: 1.15rem;
  color: var(--at-navy-deep);
  font-weight: 500;
  letter-spacing: -0.01em;
}

.ed-pr-overview__card-headline-value :deep(span) {
  font-family: var(--at-sans);
  font-size: 0.85rem;
  color: var(--at-mute-2);
  font-weight: 400;
}

.ed-pr-overview__card-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.ed-pr-overview__card-cta {
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--at-mute);
}

.ed-pr-overview__card-arrow {
  font-family: var(--at-mono);
  font-size: 1.05rem;
  transition: transform 0.2s;
}

.ed-pr-overview__card:hover .ed-pr-overview__card-arrow { transform: translateY(3px); }
.ed-pr-overview__card:hover .ed-pr-overview__card-cta { color: var(--at-navy-deep); }

/* ─── Detail sections (shared) ──────────────────────────────────────────── */
.ed-pr-detail {
  padding: 4rem 0 4.5rem;
  border-top: 1px solid var(--at-grid-line);
}

.ed-pr-detail--hub { background: var(--at-bg-cream); }
.ed-pr-detail--payments { background: var(--at-surface); }
.ed-pr-detail--data { background: var(--at-bg-cream); }

.ed-pr-detail__inner {
  max-width: var(--at-page-max);
  margin: 0 auto;
  padding: 0 2rem;
}

.ed-pr-detail__head { max-width: 52rem; margin-bottom: 2.5rem; }

.ed-pr-detail__eyebrow {
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--at-blue-deep);
  margin-bottom: 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 600;
}

.ed-pr-detail--hub .ed-pr-detail__eyebrow { color: var(--at-teal); }
.ed-pr-detail--data .ed-pr-detail__eyebrow { color: var(--at-gold); }

.ed-pr-detail__eyebrow-dash {
  width: 24px;
  height: 1px;
  background: currentColor;
}

.ed-pr-detail__title {
  font-family: var(--at-serif);
  font-size: clamp(1.85rem, 3.6vw, 2.4rem);
  font-weight: 500;
  letter-spacing: -0.025em;
  line-height: 1.1;
  margin: 0;
  color: var(--at-navy-deep);
}

.ed-pr-detail__lede {
  font-family: var(--at-sans);
  font-size: 1rem;
  line-height: 1.65;
  color: var(--at-mute-2);
  margin: 1.1rem 0 0;
}

.ed-pr-detail__lede strong { color: var(--at-navy-deep); font-weight: 600; }

/* Rate table — flat, key/value style for Fee 01 */
.ed-pr-rate-table {
  border: 1px solid var(--at-grid-line);
  background: var(--at-surface);
  margin-bottom: 1.5rem;
}

.ed-pr-rate-table__head {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  padding: 0.8rem 1.25rem;
  background: rgba(0, 39, 127, 0.04);
  border-bottom: 1px solid var(--at-grid-line);
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-navy-deep);
}

.ed-pr-rate-table__row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  padding: 1.15rem 1.25rem;
  border-bottom: 1px solid var(--at-grid-line);
  align-items: center;
}

.ed-pr-rate-table__row:last-child { border-bottom: none; }

.ed-pr-rate-table__label {
  font-family: var(--at-sans);
  font-size: 0.98rem;
  color: var(--at-navy-deep);
  font-weight: 600;
}

.ed-pr-rate-table__hint {
  display: block;
  font-weight: 400;
  font-size: 0.85rem;
  color: var(--at-mute-2);
  margin-top: 0.2rem;
}

.ed-pr-rate-table__value {
  font-family: var(--at-serif);
  font-size: 1.15rem;
  color: var(--at-navy-deep);
  font-weight: 500;
  letter-spacing: -0.01em;
}

.ed-pr-rate-table__value--multi {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  font-size: 0.95rem;
  font-family: var(--at-sans);
  font-weight: 400;
  color: var(--at-mute-2);
}

.ed-pr-rate-table__value--multi strong {
  font-family: var(--at-serif);
  color: var(--at-navy-deep);
  font-size: 1.05rem;
  font-weight: 500;
  margin-right: 0.35rem;
}

/* Detail notes (two variants: teal default, amber) */
.ed-pr-detail__note {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.9rem;
  padding: 1rem 1.25rem;
  background: rgba(25, 122, 140, 0.06);
  border-left: 3px solid var(--at-teal);
  margin-bottom: 1.25rem;
}

.ed-pr-detail__note--amber {
  background: rgba(179, 120, 25, 0.06);
  border-left-color: var(--at-gold);
  margin-top: 1.5rem;
  margin-bottom: 0;
}

.ed-pr-detail__note-tag {
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-teal-deep);
  flex-shrink: 0;
}

.ed-pr-detail__note--amber .ed-pr-detail__note-tag { color: var(--at-gold); }

.ed-pr-detail__note-body {
  font-family: var(--at-sans);
  font-size: 0.92rem;
  line-height: 1.55;
  color: var(--at-mute-2);
  flex: 1;
  min-width: 14rem;
}

.ed-pr-detail__note-body strong { color: var(--at-navy-deep); font-weight: 600; }

.ed-pr-detail__footnote {
  font-family: var(--at-sans);
  font-size: 0.88rem;
  line-height: 1.6;
  color: var(--at-mute-2);
  margin: 0;
  max-width: 52rem;
}

.ed-pr-detail__footnote code {
  font-family: var(--at-mono);
  font-size: 0.82em;
  background: rgba(0, 39, 127, 0.08);
  padding: 0.08em 0.35em;
  color: var(--at-navy-deep);
}

/* Segment (Retail/SME, Corporate) wrapper */
.ed-pr-seg { margin-bottom: 2rem; }
.ed-pr-seg:last-of-type { margin-bottom: 1rem; }

.ed-pr-seg__head {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.85rem;
  margin-bottom: 0.75rem;
  padding: 0 0.15rem;
}

.ed-pr-seg__tag {
  font-family: var(--at-mono);
  font-size: 0.68rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-teal);
}

.ed-pr-seg__tag--corp { color: var(--at-blue-deep); }

.ed-pr-seg__hint {
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.11em;
  text-transform: uppercase;
  color: var(--at-mute);
  font-weight: 500;
}

/* Context table — payment context / data context breakdown */
.ed-pr-ctx-table {
  border: 1px solid var(--at-grid-line);
  background: var(--at-bg-cream);
}

.ed-pr-detail--payments .ed-pr-ctx-table { background: var(--at-bg-cream); }
.ed-pr-detail--data .ed-pr-ctx-table { background: var(--at-surface); }

.ed-pr-ctx-table__head {
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  gap: 1.5rem;
  padding: 0.8rem 1.25rem;
  background: rgba(0, 39, 127, 0.04);
  border-bottom: 1px solid var(--at-grid-line);
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-navy-deep);
}

.ed-pr-ctx-table__row {
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  gap: 1.5rem;
  padding: 1.25rem 1.25rem;
  border-bottom: 1px solid var(--at-grid-line);
  align-items: flex-start;
}

.ed-pr-ctx-table__row:last-child { border-bottom: none; }

.ed-pr-ctx-table__label {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.ed-pr-ctx-table__label strong {
  font-family: var(--at-sans);
  font-size: 0.98rem;
  color: var(--at-navy-deep);
  font-weight: 600;
}

.ed-pr-ctx-table__label span {
  font-family: var(--at-sans);
  font-size: 0.88rem;
  line-height: 1.5;
  color: var(--at-mute-2);
}

.ed-pr-ctx-table__value {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.ed-pr-ctx-table__primary {
  font-family: var(--at-serif);
  font-size: 1.1rem;
  color: var(--at-navy-deep);
  font-weight: 500;
  letter-spacing: -0.01em;
  line-height: 1.35;
}

.ed-pr-ctx-table__primary strong {
  color: var(--at-navy-deep);
  font-weight: 700;
}

.ed-pr-ctx-table__schedule {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  font-family: var(--at-mono);
  font-size: 0.72rem;
  letter-spacing: 0.04em;
}

.ed-pr-ctx-table__schedule span {
  padding: 0.25rem 0.55rem;
  background: rgba(0, 82, 204, 0.08);
  color: var(--at-blue-deep);
  font-weight: 600;
}

.ed-pr-ctx-table__secondary {
  font-family: var(--at-sans);
  font-size: 0.88rem;
  line-height: 1.5;
  color: var(--at-mute-2);
}

.ed-pr-ctx-table__secondary strong { color: var(--at-navy-deep); font-weight: 600; }

/* Link out to per-LFI overage rates page */
.ed-pr-lfi-link {
  font-family: var(--at-sans);
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--at-mute-2);
  margin: 1.5rem 0 0;
}

.ed-pr-lfi-link a {
  color: var(--at-navy-deep);
  font-weight: 600;
  text-decoration: none;
  margin-left: 0.4rem;
  white-space: nowrap;
}

.ed-pr-lfi-link a:hover { text-decoration: underline; }

/* Page-definition callout (Fee 03) */
.ed-pr-pagedef {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 1.25rem;
  padding: 1.25rem 1.5rem;
  background: rgba(179, 120, 25, 0.07);
  border-left: 3px solid var(--at-gold);
  margin-bottom: 2rem;
}

.ed-pr-pagedef__tag {
  font-family: var(--at-mono);
  font-size: 0.68rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-gold);
  flex-shrink: 0;
}

.ed-pr-pagedef__body {
  flex: 1;
  min-width: 16rem;
}

.ed-pr-pagedef__body p {
  margin: 0;
  font-family: var(--at-sans);
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--at-mute-2);
}

.ed-pr-pagedef__body strong { color: var(--at-navy-deep); font-weight: 600; }

/* ─── Calculator placeholder ────────────────────────────────────────────── */
.ed-pr-calc {
  padding: 4rem 0 4.5rem;
  background: var(--at-surface);
  border-top: 1px solid var(--at-grid-line);
}

.ed-pr-calc__inner {
  max-width: var(--at-page-max);
  margin: 0 auto;
  padding: 0 2rem;
}

.ed-pr-calc__head { max-width: 52rem; margin-bottom: 2rem; }

.ed-pr-calc__eyebrow {
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--at-gold);
  margin-bottom: 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 600;
}

.ed-pr-calc__eyebrow-dash {
  width: 24px;
  height: 1px;
  background: currentColor;
}

.ed-pr-calc__title {
  font-family: var(--at-serif);
  font-size: clamp(1.85rem, 3.6vw, 2.4rem);
  font-weight: 500;
  letter-spacing: -0.025em;
  line-height: 1.1;
  margin: 0;
  color: var(--at-navy-deep);
}

.ed-pr-calc__lede {
  font-family: var(--at-sans);
  font-size: 1rem;
  line-height: 1.65;
  color: var(--at-mute-2);
  margin: 1.1rem 0 0;
}

/* Preset chips */
.ed-pr-calc__presets {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  margin-bottom: 2rem;
}

.ed-pr-calc__presets-label {
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--at-mute);
  font-weight: 700;
}

.ed-pr-calc__presets-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(13rem, 1fr));
  gap: 0.65rem;
}

.ed-pr-calc__preset {
  appearance: none;
  text-align: left;
  cursor: pointer;
  font: inherit;
  background: var(--at-bg-cream);
  border: 1px solid var(--at-grid-line);
  padding: 0.85rem 0.95rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  transition: border-color 0.15s, background 0.15s;
}

.ed-pr-calc__preset:hover {
  border-color: var(--at-navy-deep);
}

.ed-pr-calc__preset.is-active {
  border-color: var(--at-navy-deep);
  background: var(--at-surface);
  box-shadow: inset 0 0 0 1px var(--at-navy-deep);
}

.ed-pr-calc__preset-label {
  font-family: var(--at-sans);
  font-size: 0.92rem;
  font-weight: 600;
  color: var(--at-navy-deep);
}

.ed-pr-calc__preset-blurb {
  font-family: var(--at-sans);
  font-size: 0.82rem;
  line-height: 1.45;
  color: var(--at-mute-2);
}

/* Body grid: inputs left, output right */
.ed-pr-calc__body {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
  align-items: stretch;
}

.ed-pr-calc__inputs,
.ed-pr-calc__outputs {
  background: var(--at-bg-cream);
  border: 1px solid var(--at-grid-line);
  padding: 1.5rem 1.5rem 1.65rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.ed-pr-calc__panel-eyebrow {
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--at-mute);
  font-weight: 700;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid var(--at-grid-line);
}

/* Input fields */
.ed-pr-calc__field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.ed-pr-calc__field--secondary {
  padding-top: 0.5rem;
  border-top: 1px dashed var(--at-grid-line);
  margin-top: 0.25rem;
}

.ed-pr-calc__field-label {
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--at-navy-deep);
  font-weight: 700;
}

.ed-pr-calc__select,
.ed-pr-calc__input {
  font-family: var(--at-sans);
  font-size: 0.95rem;
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line);
  padding: 0.5rem 0.65rem;
  color: var(--at-navy-deep);
  width: 100%;
  border-radius: 0;
}

.ed-pr-calc__select:focus,
.ed-pr-calc__input:focus {
  outline: none;
  border-color: var(--at-navy-deep);
  box-shadow: inset 0 0 0 1px var(--at-navy-deep);
}

.ed-pr-calc__input-with-unit {
  display: flex;
  align-items: stretch;
  gap: 0;
  border: 1px solid var(--at-grid-line);
  background: var(--at-surface);
}

.ed-pr-calc__input-with-unit:focus-within {
  border-color: var(--at-navy-deep);
  box-shadow: inset 0 0 0 1px var(--at-navy-deep);
}

.ed-pr-calc__input-with-unit .ed-pr-calc__input {
  border: 0;
  flex: 1;
  min-width: 0;
}

.ed-pr-calc__input-with-unit .ed-pr-calc__input:focus {
  box-shadow: none;
}

.ed-pr-calc__input-unit {
  font-family: var(--at-mono);
  font-size: 0.72rem;
  letter-spacing: 0.05em;
  color: var(--at-mute);
  background: var(--at-bg-cream);
  padding: 0 0.7rem;
  display: flex;
  align-items: center;
  border-left: 1px solid var(--at-grid-line);
  white-space: nowrap;
}

/* Year toggle */
.ed-pr-calc__year-toggle {
  display: flex;
  gap: 0.3rem;
  flex-wrap: wrap;
}

.ed-pr-calc__year-btn {
  appearance: none;
  cursor: pointer;
  font-family: var(--at-mono);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  background: var(--at-surface);
  color: var(--at-navy-deep);
  border: 1px solid var(--at-grid-line);
  padding: 0.4rem 0.85rem;
  transition: background 0.15s;
}

.ed-pr-calc__year-btn:hover { background: var(--at-bg-cream); }

.ed-pr-calc__year-btn.is-active {
  background: var(--at-navy-deep);
  color: var(--at-bg-cream);
  border-color: var(--at-navy-deep);
}

/* Checkbox */
.ed-pr-calc__check {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  font-family: var(--at-sans);
  font-size: 0.88rem;
  line-height: 1.45;
  color: var(--at-mute-2);
  cursor: pointer;
}

.ed-pr-calc__check input { margin-top: 0.2rem; flex-shrink: 0; }

/* Output panel */
.ed-pr-calc__total {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.4rem 0 0.85rem;
  border-bottom: 1px solid var(--at-grid-line);
}

.ed-pr-calc__total-label {
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--at-mute);
  font-weight: 700;
}

.ed-pr-calc__total-value {
  font-family: var(--at-serif);
  font-size: clamp(2rem, 4vw, 2.6rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--at-navy-deep);
  line-height: 1.05;
}

.ed-pr-calc__total-yearly {
  font-family: var(--at-mono);
  font-size: 0.78rem;
  color: var(--at-mute-2);
  letter-spacing: 0.02em;
}

.ed-pr-calc__breakdown {
  display: flex;
  flex-direction: column;
}

.ed-pr-calc__breakdown-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 0.55rem 0;
  border-bottom: 1px solid var(--at-grid-line);
  gap: 1rem;
}

.ed-pr-calc__breakdown-row:last-child { border-bottom: 0; }

.ed-pr-calc__breakdown-label {
  font-family: var(--at-sans);
  font-size: 0.92rem;
  color: var(--at-navy-deep);
}

.ed-pr-calc__breakdown-value {
  font-family: var(--at-mono);
  font-size: 0.92rem;
  font-weight: 600;
  color: var(--at-navy-deep);
}

.ed-pr-calc__breakdown-row--secondary {
  opacity: 0.78;
}

.ed-pr-calc__breakdown-row--secondary .ed-pr-calc__breakdown-label,
.ed-pr-calc__breakdown-row--secondary .ed-pr-calc__breakdown-value {
  font-size: 0.82rem;
  color: var(--at-mute-2);
  font-weight: 500;
}

.ed-pr-calc__assumptions {
  list-style: none;
  padding: 0;
  margin: 0.5rem 0 0;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.ed-pr-calc__assumptions li {
  font-family: var(--at-sans);
  font-size: 0.82rem;
  line-height: 1.5;
  color: var(--at-mute-2);
  padding-left: 0.85rem;
  position: relative;
}

.ed-pr-calc__assumptions li::before {
  content: '·';
  position: absolute;
  left: 0;
  color: var(--at-gold);
  font-weight: 700;
}

/* ─── Authority ─────────────────────────────────────────────────────────── */
.ed-pr-auth {
  padding: 4rem 0 5rem;
  background: var(--at-bg-cream);
  border-top: 1px solid var(--at-grid-line);
}

.ed-pr-auth__inner {
  max-width: var(--at-page-max);
  margin: 0 auto;
  padding: 0 2rem;
}

.ed-pr-auth__head { max-width: 48rem; margin-bottom: 2.5rem; }

.ed-pr-auth__eyebrow {
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--at-teal);
  margin-bottom: 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 600;
}

.ed-pr-auth__eyebrow-dash {
  width: 24px;
  height: 1px;
  background: currentColor;
}

.ed-pr-auth__title {
  font-family: var(--at-serif);
  font-size: clamp(1.85rem, 3.6vw, 2.4rem);
  font-weight: 500;
  letter-spacing: -0.025em;
  line-height: 1.05;
  margin: 0;
  color: var(--at-navy-deep);
}

.ed-pr-auth__lede {
  font-family: var(--at-sans);
  font-size: 1rem;
  line-height: 1.65;
  color: var(--at-mute-2);
  margin: 1.1rem 0 0;
}

.ed-pr-auth__lede strong { color: var(--at-navy-deep); font-weight: 600; }

.ed-pr-auth__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  border: 1px solid var(--at-grid-line);
  background: var(--at-surface);
}

.ed-pr-auth__tile {
  padding: 1.75rem 1.5rem;
  border-right: 1px solid var(--at-grid-line);
}

.ed-pr-auth__tile:last-child { border-right: none; }

.ed-pr-auth__tile-eyebrow {
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-teal);
  margin-bottom: 0.6rem;
}

.ed-pr-auth__tile-title {
  font-family: var(--at-serif);
  font-size: 1.2rem;
  font-weight: 500;
  letter-spacing: -0.015em;
  line-height: 1.25;
  margin: 0 0 0.75rem;
  color: var(--at-navy-deep);
}

.ed-pr-auth__tile-body {
  font-family: var(--at-sans);
  font-size: 0.92rem;
  line-height: 1.6;
  color: var(--at-mute-2);
  margin: 0;
}

.ed-pr-auth__tile-body strong { color: var(--at-navy-deep); font-weight: 600; }

/* ─── Responsive ────────────────────────────────────────────────────────── */
@media (max-width: 900px) {
  .ed-pr-hero__scope-row { grid-template-columns: 1fr; gap: 0.5rem; }
  .ed-pr-overview__grid { grid-template-columns: 1fr; }
  .ed-pr-rate-table__head,
  .ed-pr-rate-table__row,
  .ed-pr-ctx-table__head,
  .ed-pr-ctx-table__row { grid-template-columns: 1fr; gap: 0.75rem; }
  .ed-pr-calc__body { grid-template-columns: 1fr; }
  .ed-pr-auth__grid { grid-template-columns: 1fr; }
  .ed-pr-auth__tile { border-right: none; border-bottom: 1px solid var(--at-grid-line); }
  .ed-pr-auth__tile:last-child { border-bottom: none; }
}

@media (max-width: 640px) {
  .ed-pr-hero__inner { padding: 3rem 1.25rem 2rem; }
  .ed-pr-overview { padding: 3rem 0; }
  .ed-pr-overview__inner,
  .ed-pr-detail__inner,
  .ed-pr-calc__inner,
  .ed-pr-auth__inner { padding: 0 1.25rem; }
  .ed-pr-detail { padding: 3rem 0 3.5rem; }
  .ed-pr-calc { padding: 3rem 0 3.5rem; }
  .ed-pr-calc__inputs,
  .ed-pr-calc__outputs { padding: 1.25rem 1.25rem 1.5rem; }
  .ed-pr-auth { padding: 3rem 0 4rem; }
}
</style>
