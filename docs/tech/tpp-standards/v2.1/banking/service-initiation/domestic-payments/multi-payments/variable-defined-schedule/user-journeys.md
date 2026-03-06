---
next: false
prev: false
aside: false
---


# Variable Defined Schedule - User Experience


## Interactive Demo

Customise the request body fields below and watch the **Consent** and **Authorisation** page previews update live.

<div style="border: 1px solid #bfdbfe; border-radius: 10px; overflow: hidden; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(0,39,127,0.06);">
  <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.65rem 1rem; background: rgba(0,39,127,0.04); border-bottom: 1px solid #bfdbfe; flex-wrap: wrap; gap: 0.5rem;">
    <div style="display: flex; align-items: center; gap: 0.6rem;">
      <span style="font-size: 0.72rem; font-weight: 700; color: rgba(0,39,127,0.8); letter-spacing: 0.07em; text-transform: uppercase;">domestic_payment_pii</span>
      <span style="font-size: 0.7rem; color: rgba(0,39,127,0.45);">PAR request body field</span>
    </div>
    <a href="/tech/tpp-standards/v2.1/consent/open-api/par" style="font-size: 0.75rem; color: rgba(0,39,127,0.6); text-decoration: none; display: flex; align-items: center; gap: 3px;">View PAR endpoint ↗</a>
  </div>
  <EditableJson spec="/openapi/v2.1/standards/uae-authorization-endpoints-openapi.yaml"
    schemaName="AEBankServiceInitiationRichAuthorizationRequests.AEDomesticPaymentPII"
    :initialData="initialFormDataPII"
    stateField="pii"
    :customValidator="myPIICustomValidator"
  />
</div>


<div style="border: 1px solid #bfdbfe; border-radius: 10px; overflow: hidden; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(0,39,127,0.06);">
  <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.65rem 1rem; background: rgba(0,39,127,0.04); border-bottom: 1px solid #bfdbfe; flex-wrap: wrap; gap: 0.5rem;">
    <div style="display: flex; align-items: center; gap: 0.6rem;">
      <span style="font-size: 0.72rem; font-weight: 700; color: rgba(0,39,127,0.8); letter-spacing: 0.07em; text-transform: uppercase;">authorization_details</span>
      <span style="font-size: 0.7rem; color: rgba(0,39,127,0.45);">PAR request body field</span>
    </div>
    <a href="/tech/tpp-standards/v2.1/consent/open-api/par" style="font-size: 0.75rem; color: rgba(0,39,127,0.6); text-decoration: none; display: flex; align-items: center; gap: 3px;">View PAR endpoint ↗</a>
  </div>
  <EditableJson
    spec="/openapi/v2.1/standards/uae-authorization-endpoints-openapi.yaml"
    schemaName="AEBankServiceInitiationRichAuthorizationRequestsV21.AEBankServiceInitiationAuthorizationDetailsProperties"
    :excludedFields="['consent.PersonalIdentifiableInformation']"
    :initialData="initialFormDataSIP"
    :customValidator="myCustomValidator"
  />
</div>


<script setup>
import { ref, watch } from 'vue'
import { useSharedState } from '../../../../../../../../components/Composables/useSharedState.ts'
import { purposeCodes } from '../../../../../../../../components/Composables/aaniPaymentCodes.ts'


const { sharedState } = useSharedState()

const simulateDuplicatePayment = ref(false)
watch(simulateDuplicatePayment, (val) => {
  sharedState.value.simulatedBehaviour = { ...sharedState.value.simulatedBehaviour, duplicatePaymentAlert: val }
}, { immediate: true })

const simulatePaymentLimitExceeded = ref(false)
watch(simulatePaymentLimitExceeded, (val) => {
  sharedState.value.simulatedBehaviour = { ...sharedState.value.simulatedBehaviour, paymentLimitExceeded: val }
}, { immediate: true })

const myCustomValidator = (value) => {
if (
    !value?.consent ||
    !value?.consent?.ControlParameters ||
    !value?.consent?.ControlParameters?.ConsentSchedule ||
    !value?.consent?.ControlParameters?.ConsentSchedule?.MultiPayment ||
    !value?.consent?.ControlParameters?.ConsentSchedule?.MultiPayment?.PeriodicSchedule ||
    value?.consent?.ControlParameters?.ConsentSchedule?.MultiPayment?.PeriodicSchedule?.Type !== 'VariableDefinedSchedule' ||
    value?.consent?.ControlParameters?.ConsentSchedule?.SinglePayment ||
    value?.consent?.ControlParameters?.ConsentSchedule?.FilePayment
  ) {
    return "consent.ControlParameters.ConsentSchedule.MultiPayment.PeriodicSchedule.Type must be 'VariableDefinedSchedule'"
  } 
     if (
        (() => {
        const expiration = new Date(value.consent.ExpirationDateTime);
        const now = new Date();
        const oneYearFromNow = new Date();
        oneYearFromNow.setFullYear(now.getFullYear() + 1);

        return expiration <= now || expiration >= oneYearFromNow;
        })()
    ) {
        return "consent.ExpirationDateTime cannot be in the past and must be less than a year in the future.";
    }

    if (value.consent.PaymentPurposeCode && !purposeCodes[value.consent.PaymentPurposeCode]) {
        return `consent.PaymentPurposeCode '${value.consent.PaymentPurposeCode}' is not a valid purpose code`
    }

    const perms = value.consent.Permissions || []
    if (perms.includes('ReadBalances') && !perms.includes('ReadAccountsBasic') && !perms.includes('ReadAccountsDetail')) {
        return "consent.Permissions: ReadBalances requires ReadAccountsBasic or ReadAccountsDetail"
    }

    if (value.consent.AuthorizationExpirationDateTime) {
        const authExpiry = new Date(value.consent.AuthorizationExpirationDateTime)
        const now = new Date()
        if (authExpiry < now) {
        return "consent.AuthorizationExpirationDateTime must not be in the past"
        }
        if (value.consent.ExpirationDateTime && authExpiry > new Date(value.consent.ExpirationDateTime)) {
        return "consent.AuthorizationExpirationDateTime must not be after consent.ExpirationDateTime"
        }
    }

    const schedule = value?.consent?.ControlParameters?.ConsentSchedule?.MultiPayment?.PeriodicSchedule?.Schedule
    if (Array.isArray(schedule)) {
        const dates = schedule.map(item => item.PaymentExecutionDate)
        const duplicates = dates.filter((date, i) => dates.indexOf(date) !== i)
        if (duplicates.length > 0) {
            return `Schedule contains duplicate PaymentExecutionDate: ${[...new Set(duplicates)].join(', ')}`
        }

        const today = new Date()
        today.setHours(0, 0, 0, 0)
        const expiration = value.consent.ExpirationDateTime ? new Date(value.consent.ExpirationDateTime) : null
        for (const item of schedule) {
            const execDate = new Date(item.PaymentExecutionDate)
            execDate.setHours(0, 0, 0, 0)
            if (execDate < today) {
                return `Schedule PaymentExecutionDate '${item.PaymentExecutionDate}' must be today or in the future`
            }
            if (expiration && execDate >= expiration) {
                return `Schedule PaymentExecutionDate '${item.PaymentExecutionDate}' must be before consent.ExpirationDateTime`
            }
        }
    }

  return null
}

const initialFormDataSIP = ref({
                "type": "urn:openfinanceuae:service-initiation-consent:v2.1",
                "consent": {
                    "ConsentId": "b8f42378-10ac-46a1-8d20-4e020484216d",
                    "IsSingleAuthorization": true,
                    "ExpirationDateTime": "2026-12-25T23:00:00.000Z",
                    "BaseConsentId": "b9f42378-10ac-46a1-8d20-4e020484216d",
                    "AuthorizationExpirationDateTime": "2026-12-25T23:00:00.000Z",
                    "Permissions": ["ReadAccountsBasic", "ReadAccountsDetail", "ReadBalances", "ReadRefundAccount"],
                    "ControlParameters": {
                        "ConsentSchedule": {
                            "MultiPayment": {
                                "MaximumCumulativeNumberOfPayments": 12,
                                "MaximumCumulativeValueOfPayments": {
                                    "Amount": "6000.00",
                                    "Currency": "AED"
                                },
                                "PeriodicSchedule": {
                                    "Type": "VariableDefinedSchedule",
                                    "Schedule": [
                                        {
                                          "PaymentExecutionDate": "2026-08-01",
                                          "MaximumIndividualAmount": {
                                            "Amount": "500.00",
                                            "Currency": "AED"
                                          }
                                        },
                                                                                                                    {
                                          "PaymentExecutionDate": "2026-09-02",
                                          "MaximumIndividualAmount": {
                                            "Amount": "1200.00",
                                            "Currency": "AED"
                                          }
                                        },
                                                                                                                    {
                                          "PaymentExecutionDate": "2026-10-11",
                                          "MaximumIndividualAmount": {
                                            "Amount": "300.00",
                                            "Currency": "AED"
                                          }
                                        },
                                                                                                                    {
                                          "PaymentExecutionDate": "2026-10-12",
                                          "MaximumIndividualAmount": {
                                            "Amount": "300.00",
                                            "Currency": "AED"
                                          }
                                        },
                                                                                                                    {
                                          "PaymentExecutionDate": "2026-10-13",
                                          "MaximumIndividualAmount": {
                                            "Amount": "300.00",
                                            "Currency": "AED"
                                          }
                                        },
                                                                                                                    {
                                          "PaymentExecutionDate": "2026-10-14",
                                          "MaximumIndividualAmount": {
                                            "Amount": "400.00",
                                            "Currency": "AED"
                                          }
                                        },
                                                                                {
                                          "PaymentExecutionDate": "2026-04-01",
                                          "MaximumIndividualAmount": {
                                            "Amount": "500.00",
                                            "Currency": "AED"
                                          }
                                        },
                                                                                                                    {
                                          "PaymentExecutionDate": "2026-05-02",
                                          "MaximumIndividualAmount": {
                                            "Amount": "1200.00",
                                            "Currency": "AED"
                                          }
                                        },
                                                                                                                    {
                                          "PaymentExecutionDate": "2026-11-11",
                                          "MaximumIndividualAmount": {
                                            "Amount": "300.00",
                                            "Currency": "AED"
                                          }
                                        },
                                                                                                                    {
                                          "PaymentExecutionDate": "2026-12-12",
                                          "MaximumIndividualAmount": {
                                            "Amount": "300.00",
                                            "Currency": "AED"
                                          }
                                        },
                                                                                                                    {
                                          "PaymentExecutionDate": "2026-12-13",
                                          "MaximumIndividualAmount": {
                                            "Amount": "300.00",
                                            "Currency": "AED"
                                          }
                                        },
                                                                                                                    {
                                          "PaymentExecutionDate": "2026-12-14",
                                          "MaximumIndividualAmount": {
                                            "Amount": "400.00",
                                            "Currency": "AED"
                                          }
                                        }
                                    ]
                                }
                            }
                        }
                    },
                    "PaymentPurposeCode": "ACM",
                    "DebtorReference": "Test Purchase",
                    "CreditorReference": "Test Purchase"
                },
                "subscription": {
                    "Webhook": {
                        "Url": "https://webhook.site/mock-event-receiver",
                        "IsActive": false
                    }
                }
            })


const myPIICustomValidator = (value) => {
 if (
   !value.Initiation.Creditor     
    ) {
    return "value.Initiation.Creditor is required for Type 'VariableDefinedSchedule'"

  }    
  else if (
    value.Initiation.Creditor.length > 1
    ) {
    return "Only a single Creditor is required for Type 'VariableDefinedSchedule'"
  }
  return null
}

const initialFormDataPII = ref({
  "Initiation": {
     "DebtorAccount": {
       "SchemeName": "IBAN",
       "Identification": "AE070331234567890123456",
       "Name": {
         "en": "Mohammed Al Rashidi",
       }
     },
    "Creditor": [
      {
        "Creditor": {
          "Name": "Ivan England"
        },
        "CreditorAccount": {
          "SchemeName": "IBAN",
          "Identification": "AE070331234567890123456",
          "Name": {
            "en": "Ivan David England"
          }
        }
      }
    ]
  }
})
</script>





### Live UI Preview

Changes made above are immediately reflected in both panels.

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1.25rem;">
  <div style="display: flex; flex-direction: column; align-items: center; gap: 0.75rem;">
    <div style="width: 100%; text-align: center; padding: 0.45rem 0.75rem; background: rgba(0,39,127,0.05); border-radius: 7px; border: 1px solid rgba(0,39,127,0.12); box-sizing: border-box;">
      <div style="font-size: 0.85rem; font-weight: 600; color: #1a202c; margin-top: 2px;">TPP · Consent Page</div>
    </div>
    <ConsentDefinedSchedule />
  </div>
  <div style="display: flex; flex-direction: column; align-items: center; gap: 0.75rem;">
    <div style="width: 100%; text-align: center; padding: 0.45rem 0.75rem; background: rgba(0,192,167,0.07); border-radius: 7px; border: 1px solid rgba(0,192,167,0.28); box-sizing: border-box;">
      <div style="font-size: 0.85rem; font-weight: 600; color: #1a202c; margin-top: 2px;">LFI · Authorisation Page</div>
    </div>
    <AuthorizationDefinedSchedule /> 
  </div>
</div>


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


## Example User Journeys

#### Example 1 - Account Selected at TPP

<ImageViewer
  src="/images/user-experience/variable-defined-schedule/1.png"
  alt="variable-defined-schedule"
/>

#### Example 2 - Account Selected at LFI

<ImageViewer
  src="/images/user-experience/variable-defined-schedule/2.png"
  alt="variable-defined-schedule"
/>

#### Example 3 - Account Selected at LFI (Less Control Parameters)

<ImageViewer
  src="/images/user-experience/variable-defined-schedule/3.png"
  alt="variable-defined-schedule"
/>

#### Example 4 - Account Selected at LFI (Large Schedule)

<ImageViewer
  src="/images/user-experience/variable-defined-schedule/4.png"
  alt="variable-defined-schedule"
/>
