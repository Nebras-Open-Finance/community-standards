---
title: "Choosing a Payment Type"
description: "Guide to the seven UAE Open Finance payment types — Single Instant Payment and the six Multi-Payment variants — with a decision framework for selecting the right one and notes on the Delegated SCA overlay."
next: false
prev: false
---

# Choosing a Payment Type

UAE Open Finance defines **seven payment shapes** a TPP can put on the wire:

- **Single Instant Payment (SIP)** — one payment, one authorisation
- **Six Multi-Payment (MP) variants** — a 2×3 grid of `{Fixed | Variable} × {OnDemand | PeriodicSchedule | DefinedSchedule}`

Each variant is a different combination of two independent questions: **who controls the amount**, and **who controls the timing**. Picking the right one is about matching those two axes to your product's real behaviour.

A separate control — **Delegated SCA** — can overlay most of these variants and shifts strong customer authentication from the LFI to the TPP. It is covered at the end.



## Decision Framework

Two questions drive the choice.

### 1. How many payments does this consent need to cover?

| Answer | Payment type |
|--------|--------------|
| Exactly one, executed immediately | [Single Instant Payment](/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/single-instant-payment/api-guide) |
| Many payments over time | One of the six Multi-Payment variants |

If the answer is "one", stop — SIP is the only option. Everything below is for multi-payment consents.

### 2. What's fixed at consent time — the amount, the dates, or neither?

| Amount | Timing | Variant |
|--------|--------|---------|
| Fixed per payment | TPP triggers each payment on-demand | [FixedOnDemand](/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/fixed-on-demand/api-guide) |
| Variable up to a per-payment cap | TPP triggers each payment on-demand | [VariableOnDemand](/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/variable-on-demand/api-guide) |
| Fixed per payment | One per recurring period (e.g. monthly) | [FixedPeriodicSchedule](/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/fixed-periodic-schedule/api-guide) |
| Variable up to a per-payment cap | One per recurring period | [VariablePeriodicSchedule](/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/variable-periodic-schedule/api-guide) |
| Exact amount known for each dated payment | List of specific calendar dates | [FixedDefinedSchedule](/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/fixed-defined-schedule/api-guide) |
| Per-date ceiling, actual amount may differ | List of specific calendar dates | [VariableDefinedSchedule](/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/variable-defined-schedule/api-guide) |

The vertical axis (`Fixed` vs `Variable`) is about **amount control**. The horizontal axis (`OnDemand` vs `PeriodicSchedule` vs `DefinedSchedule`) is about **timing control**.



## Single Instant Payment

One payment, one authorisation, settled immediately on UAE domestic rails (AANI or UAEFTS).

**When to use:** A checkout, an ad-hoc bill, a one-off transfer — any situation where the user is making a single payment decision in the moment.

**What's fixed at consent time:** The exact amount, the creditor, the payment purpose.

**Re-authorisation:** Every payment is its own consent. There is no "next payment" under the same authorisation.



## FixedOnDemand

Many payments over the consent lifetime, each for the **same fixed amount**, triggered whenever the TPP wants (subject to cumulative caps).

**When to use:** Fixed-amount subscription billing, regular instalment collection, membership fees — any case where the charge is always the same but the TPP (not the calendar) decides when to collect.

**What's fixed at consent time:** The per-payment amount (`PeriodicSchedule.Amount`), the creditor, and cumulative caps via `PeriodicSchedule.PeriodType`.

::: tip `PeriodType` is a cap window, not a cadence
On on-demand variants, `PeriodicSchedule.PeriodType` (`Day`, `Week`, `Month`, …) defines the **reference window for cumulative limits** — e.g. "no more than N payments totalling X AED per rolling month". It is **not** a recurrence schedule. The TPP still triggers each payment explicitly.
:::



## VariableOnDemand

Many payments over the consent lifetime, each at a **variable amount up to a ceiling**, triggered whenever the TPP wants (subject to cumulative caps).

**When to use:** Metered billing, utility top-ups, variable-charge subscriptions, TPP-managed savings sweeps — cases where both the amount and the timing depend on usage or TPP logic rather than a calendar.

**What's fixed at consent time:** The per-payment ceiling (`MaximumIndividualAmount`), cumulative caps via `PeriodicSchedule.PeriodType`, and optional `Controls` on total count and total value across the consent.



## FixedPeriodicSchedule

**One payment per period** (e.g. monthly) at a **fixed amount**, over the consent lifetime.

**When to use:** Fixed-price subscriptions, loan repayments, membership dues — predictable recurring charges that follow a calendar.

**What's fixed at consent time:** The per-payment amount and the period cadence. The LFI will only permit **one payment per period** under this consent.

**vs FixedOnDemand:** Same fixed amount, but the calendar — not the TPP — gates payment frequency.



## VariablePeriodicSchedule

**One payment per period** at a **variable amount up to a ceiling**, over the consent lifetime.

**When to use:** Utility bills, variable monthly service charges, TPP-managed savings where the amount differs each period but must stay within a pre-approved cap.

**What's fixed at consent time:** The per-payment ceiling (`MaximumIndividualAmount`) and the period cadence. One payment per period, actual amount variable within the cap.



## FixedDefinedSchedule

A **pre-agreed list of specific dates**, each with a **fixed exact amount**.

**When to use:** Structured instalment plans, staged loan repayments, any case where both dates and amounts are known and agreed upfront (e.g. "AED 500 on the 1st of each of Jan/Apr/Jul/Oct").

**What's fixed at consent time:** Every `(PaymentExecutionDate, Amount)` pair in the `Schedule` array. The TPP submits exactly one payment per scheduled entry, for exactly the listed amount.



## VariableDefinedSchedule

A **pre-agreed list of specific dates**, each with a **ceiling amount**. The actual payment may come in under the ceiling.

**When to use:** Milestone-based project billing, staged payments where dates are fixed but the final amount on each date depends on delivered work or usage.

**What's fixed at consent time:** Every `(PaymentExecutionDate, MaximumIndividualAmount)` pair. The TPP submits one payment per scheduled entry, at or below the listed ceiling.

**vs FixedDefinedSchedule:** Same schedule shape, same dates, same `Schedule` array — the only structural difference is whether each entry carries a locked `Amount` or a `MaximumIndividualAmount` ceiling.



## Delegated SCA — an overlay, not a seventh type

Delegated SCA is not a payment shape of its own. It is a **`ControlParameters.IsDelegatedAuthentication: true` flag** that can overlay a multi-payment consent, shifting the responsibility for performing Strong Customer Authentication from the LFI to the TPP.

- **Default flow:** The LFI authenticates the user at each step of the consent journey and SCA for the payment itself.
- **Delegated SCA:** The TPP has already performed SCA at its own surface (biometrics, secure enclave, MFA), and asserts this to the LFI via a fully-populated `Risk.DebtorIndicators.Authentication` block on every `POST /par` and `POST /payments`.

**When to use:** Apps that already run a compliant SCA flow on the user's device and want to avoid a redirect to the LFI on every payment. The LFI must also advertise Delegated SCA support for the requested beneficiary model via the Trust Framework.

See the [Delegated SCA api-guide](/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/delegated-sca/api-guide) for the full flow and mandatory Risk fields.



## Common Pitfalls

**Treating `PeriodicSchedule.PeriodType` as a cadence on on-demand variants.** On `FixedOnDemand` and `VariableOnDemand`, `PeriodType` is a **cap reference window**, not a recurrence schedule. The TPP still triggers every payment.

**Picking `FixedDefinedSchedule` when dates are known but amounts aren't.** If amounts may vary per date, use `VariableDefinedSchedule` with a `MaximumIndividualAmount` per entry — `FixedDefinedSchedule` locks the amount at consent time and the LFI will reject any payment for a different value.

**Assuming `PeriodicSchedule` means "periodic payments".** The object is named for its role in the schema, not its semantics in every variant. For `OnDemand` variants it governs caps; for `PeriodicSchedule` variants it governs cadence; for `DefinedSchedule` variants it carries the date list.

**Setting the `Type` on the wrong object.** The OpenAPI discriminator is on `PeriodicSchedule.Type` (e.g. `"FixedOnDemand"`), **not** on `MultiPayment.Type`. Mis-placed discriminator will be rejected with `400 invalid_message_format`.
