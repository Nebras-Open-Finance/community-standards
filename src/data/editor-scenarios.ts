/**
 * Preset bodies for the `EditableJson` scenario rail on the User Experience
 * pages — the presets that drive the wireframe previews above each editor.
 *
 * Builders that derive variants take the page's own base body. That keeps
 * version-specific detail (the RAR `type` urn, the TPP `consent` vs LFI `Data`
 * wrapper, the permission list a given version supports) in the page, and the
 * shape of each scenario here.
 */

export interface JsonScenario {
  id: string
  label: string
  description?: string
  data: Record<string, unknown>
}

/** Merchant used by the payment demos, matching the Single Instant Payment body. */
const MERCHANT_NAME = 'Al Noor General'

/**
 * Payees added on top of a page's own creditor to make a multiple-beneficiary
 * consent. Mirrors the reference list the Consent Management wireframe shows for
 * the Multiple Beneficiaries model.
 */
const ADDITIONAL_BENEFICIARIES = [
  {
    Creditor: { Name: 'Al Noor Trading LLC' },
    CreditorAccount: {
      SchemeName: 'IBAN',
      Identification: 'AE320260001234567890123',
      Name: { en: 'Al Noor Trading LLC' },
    },
  },
  {
    Creditor: { Name: 'Emirates Telecommunications Group' },
    CreditorAccount: {
      SchemeName: 'IBAN',
      Identification: 'AE980350000009876543210',
      Name: { en: 'Emirates Telecommunications Group' },
    },
  },
]

/**
 * Permissions needed to read accounts, their balances, and their transactions —
 * the narrowest scope most account-aggregation propositions actually require.
 */
const ACCOUNTS_BALANCES_TRANSACTIONS = [
  'ReadAccountsBasic',
  'ReadAccountsDetail',
  'ReadBalances',
  'ReadTransactionsBasic',
  'ReadTransactionsDetail',
]

/**
 * Bank Data Sharing scenarios.
 *
 * @param base The page's full-scope consent body.
 * @param consentKey The wrapper holding the consent properties — `consent` for
 *   the TPP-facing PAR `authorization_details`, `Data` for the API Hub consent body.
 */
export function bankDataSharingScenarios(
  base: Record<string, unknown>,
  consentKey: 'consent' | 'Data' = 'consent',
): JsonScenario[] {
  const derive = (
    mutate: (consent: Record<string, unknown>) => void,
  ): Record<string, unknown> => {
    const next = JSON.parse(JSON.stringify(base)) as Record<string, unknown>
    mutate(next[consentKey] as Record<string, unknown>)
    return next
  }

  return [
    {
      id: 'all-permissions',
      label: 'All data permissions',
      description: 'Every permission, current and savings accounts',
      data: derive(() => {}),
    },
    {
      id: 'accounts-balances-transactions',
      label: 'Accounts, balances, transactions',
      description: 'Narrow scope — no beneficiaries, party or statements',
      data: derive((consent) => {
        consent.Permissions = [...ACCOUNTS_BALANCES_TRANSACTIONS]
      }),
    },
    {
      id: 'credit-cards-only',
      label: 'Credit cards only',
      description: 'AccountSubType restricted to CreditCard',
      data: derive((consent) => {
        consent.Permissions = [...ACCOUNTS_BALANCES_TRANSACTIONS]
        consent.AccountSubType = ['CreditCard']
      }),
    },
    {
      id: 'no-on-behalf-of',
      label: 'No OnBehalfOf',
      description: 'All permissions, OnBehalfOf omitted',
      data: derive((consent) => {
        delete consent.OnBehalfOf
      }),
    },
  ]
}

/**
 * Domestic payment PII (`AEDomesticPaymentPII`) — where the debtor account comes
 * from, and whether a merchant is named.
 *
 * `DebtorAccount` is optional: when the TPP already knows which account the
 * customer pays from it sends it, and the LFI presents it as chosen; when it is
 * absent the customer selects the account during authorisation at the LFI.
 *
 * The third scenario flips whichever way the page's base body sits: pages that
 * name a merchant (Single Instant Payment) get a scenario without one, and pages
 * that don't (the multi-payment types) get a scenario with one.
 */
export function domesticPaymentPiiScenarios(
  base: Record<string, unknown>,
  options: { beneficiaries?: 'single' | 'flexible' } = {},
): JsonScenario[] {
  const derive = (
    mutate: (body: Record<string, any>) => void,
  ): Record<string, unknown> => {
    const next = JSON.parse(JSON.stringify(base)) as Record<string, any>
    mutate(next)
    return next
  }

  const scenarios: JsonScenario[] = [
    {
      id: 'debtor-account-at-tpp',
      label: 'Debtor account selected at TPP',
      description: 'DebtorAccount sent in the request',
      data: derive(() => {}),
    },
    {
      id: 'debtor-account-at-lfi',
      label: 'Debtor account selected at LFI',
      description: 'DebtorAccount omitted — customer picks at authorisation',
      data: derive((body) => {
        delete body.Initiation?.DebtorAccount
      }),
    },
  ]

  // Only Variable On Demand and Delegated SCA accept more than one creditor, or
  // none at all. Every other payment type is bound to a single creditor.
  if (options.beneficiaries === 'flexible') {
    scenarios.push(
      {
        id: 'multiple-beneficiaries',
        label: 'Multiple beneficiaries',
        description: 'Creditor lists three payees — up to 10 are permitted',
        data: derive((body) => {
          body.Initiation.Creditor = [
            ...(body.Initiation.Creditor ?? []),
            ...ADDITIONAL_BENEFICIARIES,
          ]
        }),
      },
      {
        id: 'open-beneficiaries',
        label: 'Open beneficiaries',
        description: 'Creditor omitted — the TPP chooses the payee per payment',
        data: derive((body) => {
          delete body.Initiation.Creditor
        }),
      },
    )
  }

  if ((base as any).Risk?.CreditorIndicators?.MerchantDetails) {
    scenarios.push({
      id: 'no-merchant-details',
      label: 'No merchant details',
      description: 'MerchantDetails omitted — no on-behalf-of merchant shown',
      data: derive((body) => {
        delete body.Risk.CreditorIndicators.MerchantDetails
        // Prune the parents the merchant block left empty, so the scenario reads
        // as a body that simply never carried merchant risk data.
        if (!Object.keys(body.Risk.CreditorIndicators).length) delete body.Risk.CreditorIndicators
        if (!Object.keys(body.Risk).length) delete body.Risk
      }),
    })
  } else {
    scenarios.push({
      id: 'with-merchant-details',
      label: 'Merchant details provided',
      description: 'MerchantDetails names the merchant the TPP collects for',
      data: derive((body) => {
        body.Risk = {
          ...(body.Risk ?? {}),
          CreditorIndicators: {
            ...(body.Risk?.CreditorIndicators ?? {}),
            MerchantDetails: { MerchantName: MERCHANT_NAME },
          },
        }
      }),
    })
  }

  return scenarios
}

/**
 * Payment consent scenarios — the data-sharing permissions a payment consent may
 * carry alongside the payment itself, and the payment purpose.
 *
 * @param base The page's full consent body.
 * @param consentKey The wrapper holding the consent properties — `consent` for
 *   the TPP-facing PAR `authorization_details`, `Data` for the API Hub consent body.
 */
export function paymentConsentScenarios(
  base: Record<string, unknown>,
  consentKey: 'consent' | 'Data' = 'consent',
): JsonScenario[] {
  const derive = (
    mutate: (consent: Record<string, any>) => void,
  ): Record<string, unknown> => {
    const next = JSON.parse(JSON.stringify(base)) as Record<string, any>
    mutate(next[consentKey])
    return next
  }

  const scenarios: JsonScenario[] = [
    {
      id: 'with-data-sharing',
      label: 'With data sharing permissions',
      description: 'Accounts, balances and refund account alongside the payment',
      data: derive(() => {}),
    },
    {
      id: 'without-data-sharing',
      label: 'Without data sharing permissions',
      description: 'Permissions omitted — payment only, no account data shared',
      data: derive((consent) => {
        delete consent.Permissions
      }),
    },
    {
      id: 'purpose-code-utility',
      label: 'Utility purpose code',
      description: 'PaymentPurposeCode UTL instead of ACM',
      data: derive((consent) => {
        consent.PaymentPurposeCode = 'UTL'
      }),
    },
    {
      id: 'multiple-authorizations',
      label: 'Multiple authorisations',
      description: 'IsSingleAuthorization false, with a deadline to authorise',
      data: derive((consent) => {
        consent.IsSingleAuthorization = false
        // The deadline by which a consent awaiting authorization must be
        // authorized. It cannot fall after the consent itself expires.
        consent.AuthorizationExpirationDateTime = consent.ExpirationDateTime
      }),
    },
  ]

  // Single Instant Payment and Delegated SCA carry no MultiPayment block, so
  // there are no optional caps to strip and no minimal variant to show.
  if ((base as any)[consentKey]?.ControlParameters?.ConsentSchedule?.MultiPayment) {
    scenarios.push({
      id: 'minimal-control-parameters',
      label: 'Minimal control parameters',
      description: 'Only the caps this payment type actually requires',
      data: derive((consent) => {
        stripOptionalControls(consent.ControlParameters.ConsentSchedule.MultiPayment)
      }),
    })
  }

  return scenarios
}

/**
 * Reduces a `MultiPayment` block to the controls the payment type requires,
 * dropping every optional cap.
 *
 * Both cumulative caps are optional in the spec, but the API Hub rejects a
 * Periodic Schedule consent without `MaximumCumulativeNumberOfPayments` — so it
 * is kept for those two types. `Controls` carries `minProperties: 1`, so one cap
 * is always retained: the per-payment ceiling where the type has one, otherwise
 * the per-period count.
 */
function stripOptionalControls(multiPayment: Record<string, any>) {
  delete multiPayment.MaximumCumulativeValueOfPayments

  const type: string = multiPayment.PeriodicSchedule?.Type ?? ''
  if (!type.endsWith('PeriodicSchedule')) delete multiPayment.MaximumCumulativeNumberOfPayments

  const controls = multiPayment.PeriodicSchedule?.Controls
  if (controls) {
    const keep = 'MaximumIndividualAmount' in controls
      ? 'MaximumIndividualAmount'
      : 'MaximumCumulativeNumberOfPaymentsPerPeriod'
    for (const key of Object.keys(controls)) {
      if (key !== keep) delete controls[key]
    }
  }
}

/**
 * Confirmation of Payee — the three `NameMatchIndicator` outcomes an LFI can
 * return, as the `message.Data` of a confirmation response.
 *
 * `MaskedName` is returned on `Partial` and `No` only: on those outcomes the TPP
 * MUST surface the name the LFI actually holds so the payer can decide whether
 * to proceed. On `Yes` there is nothing to disclose, so the field is omitted.
 */
export function confirmationOfPayeeScenarios(): JsonScenario[] {
  return [
    {
      id: 'match-yes',
      label: 'Yes — full match',
      description: 'Name and account match; no MaskedName returned',
      data: {
        NameMatchIndicator: 'ConfirmationOfPayee.Yes',
      },
    },
    {
      id: 'match-partial',
      label: 'Partial match',
      description: 'Close match; payer reviews the masked account name',
      data: {
        NameMatchIndicator: 'ConfirmationOfPayee.Partial',
        MaskedName: 'Ib*** A***** Sa***',
      },
    },
    {
      id: 'match-no',
      label: 'No match',
      description: 'Different account holder; payer must be warned',
      data: {
        NameMatchIndicator: 'ConfirmationOfPayee.No',
        MaskedName: 'Fa**** Al M*****',
      },
    },
  ]
}
