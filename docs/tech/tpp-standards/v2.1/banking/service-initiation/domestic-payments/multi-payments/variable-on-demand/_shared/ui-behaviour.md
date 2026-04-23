## UI Behaviour Driven by API Fields

### Debtor Account Selection

The presence or absence of `Initiation.DebtorAccount` in `domestic_payment_pii` determines whether the user selects their account at the LFI or if it is pre-selected by the TPP.

::: tip
Passing a `DebtorAccount` reduces friction for users who have already selected their account within the TPP's own interface, but removes the user's ability to choose a different account at the LFI.
:::


### Payment Control Parameters

Control parameters define the spending rules for the consent and are displayed in the **Payment rules** card on both the TPP Consent Page and the LFI Authorisation Page.

There are two groups of control parameters: **overall limits** that apply across the full lifetime of the consent, and **per-period limits** that reset each period.

**Overall limits** (set at `ControlParameters.ConsentSchedule.MultiPayment`):

| Field | UI Label | Behaviour |
|---|---|---|
| `MaximumCumulativeNumberOfPayments` | *Total Number of Payments allowed* | The maximum number of individual payments that can be made across the entire consent. Only shown when provided. |
| `MaximumCumulativeValueOfPayments` | *Total Value allowed* | The maximum total amount that can be paid across the entire consent. Only shown when provided. |

**Per-period limits** (set at `ControlParameters.ConsentSchedule.MultiPayment.PeriodicSchedule.Controls`):

| Field | UI Label | Behaviour |
|---|---|---|
| `MaximumIndividualAmount` | *Max per Payment* | The maximum amount allowed for a single payment. Always shown. |
| `MaximumCumulativeNumberOfPaymentsPerPeriod` | *Max Payments per {PeriodType}* | The maximum number of payments within a single period (e.g. per Week). The period type from `PeriodType` is substituted into the label. Only shown when provided. |
| `MaximumCumulativeValueOfPaymentsPerPeriod` | *Max Value per {PeriodType}* | The maximum total value of payments within a single period. The period type from `PeriodType` is substituted into the label. Only shown when provided. |

::: tip
If an optional parameter is not provided in the API request, it must be **omitted entirely from the User Experience** — it must **not** be displayed as `null` or `0`.

✅ **Correct** — row not shown when parameter is absent:
```
Payment rules
───────────────────────────────────────────
Max per Payment                    AED 200
───────────────────────────────────────────
```

❌ **Incorrect** — row shown with a null or zero value:
```
Payment rules
───────────────────────────────────────────
Max per Payment                    AED 200
Total Number of Payments allowed         0
───────────────────────────────────────────
```
:::


### Creditor Configuration

The presence or absence of creditors in `Initiation.Creditor` in `domestic_payment_pii` determines how the LFI presents payment recipient information to the user.

| `Initiation.Creditor` | LFI Authorisation Page Behaviour |
|---|---|
| **1 creditor** | The single payee's name and account details are displayed under "Who you're paying". *(See Example 1)* |
| **2–10 defined creditors** | All specified payees are listed under "Who you're paying". *(See Examples 2, 3 & 4)* |
| **Undefined** (absent or empty) | A general message informs the user that the TPP is responsible for selecting beneficiaries at payment time. *(See Example 5)* |

### Permissions and Data Access

The table below describes the text shown to users on the Consent Page.

<ServiceInitiationPermissionText />
