## UI Behaviour Driven by API Fields

### Debtor Account Selection

The presence or absence of `Initiation.DebtorAccount` in `domestic_payment_pii` determines whether the user selects their account at the LFI or if it is pre-selected by the TPP.

<DebtorAccountSelectionTable />

::: tip
Passing a `DebtorAccount` reduces friction for users who have already selected their account within the TPP's own interface, but removes the user's ability to choose a different account at the LFI.
:::


### Payment Control Parameters

Control parameters define the spending rules for the consent and are displayed in the **Payment rules** card on both the TPP Consent Page and the LFI Authorisation Page.

There are two groups of control parameters: **overall limits** that apply across the full lifetime of the consent, and the **payment schedule** that defines each individual payment.

**Overall limits** (set at `ControlParameters.ConsentSchedule.MultiPayment`):

| Field | UI Label | Behaviour |
|---|---|---|
| `MaximumCumulativeNumberOfPayments` | *Total Number of Payments allowed* | The maximum number of individual payments that can be made across the entire consent. Only shown when provided. |
| `MaximumCumulativeValueOfPayments` | *Total Value allowed* | The maximum total amount that can be paid across the entire consent. Only shown when provided. |

**Payment schedule** (set at `ControlParameters.ConsentSchedule.MultiPayment.PeriodicSchedule.Schedule`):

Unlike periodic schedule types, a Defined Schedule specifies each payment individually. Each entry in the `Schedule` array defines exactly one payment:

| Field | UI Label | Behaviour |
|---|---|---|
| `PaymentExecutionDate` | *Date* | The specific date on which this payment may be executed. Each date must be unique across the schedule. |
| `MaximumIndividualAmount` | *Max per Payment* | The maximum amount allowed for this scheduled payment. Always shown. |
| *(implicit)* | *Payments per Date* | Only 1 payment is allowed per `PaymentExecutionDate`. Always enforced. |

Each schedule entry is shown as a row in the **Payment schedule** section of the UI, displaying the date on the left and the maximum amount on the right.


::: tip
If an optional parameter is not provided in the API request, it must be **omitted entirely from the User Experience** — it must **not** be displayed as `null` or `0`.

✅ **Correct** — optional row not shown when parameter is absent:
```
Payment rules

Payment schedule
───────────────────────────────────────────
Date                             01/08/2026
Max Payment Amount                   500.00
Date                             02/09/2026
Max Payment Amount                  1200.00

Total Number of Payments allowed         3
───────────────────────────────────────────
```

❌ **Incorrect** — optional row shown with a null or zero value:
```
Payment rules
───────────────────────────────────────────
Date                             01/08/2026
Max Payment Amount                   500.00
Date                             02/09/2026
Max Payment Amount                  1200.00

Total Number of Payments allowed         3
Total Value allowed                      0
───────────────────────────────────────────
```
:::


### Creditor Configuration

The presence or absence of creditors in `Initiation.Creditor` in `domestic_payment_pii` determines how the LFI presents payment recipient information to the user.

| `Initiation.Creditor` | LFI Authorisation Page Behaviour |
|---|---|
| **1 creditor** | The single payee's name and account details are displayed under "Who you're paying". *(See Example 1)* |
| **2–10 defined creditors** | ❌ **Not Supported** |
| **Undefined** (absent or empty) | ❌ **Not Supported** |

### Permissions and Data Access

The table below describes the text shown to users on the Consent Page.

<ServiceInitiationPermissionText />
