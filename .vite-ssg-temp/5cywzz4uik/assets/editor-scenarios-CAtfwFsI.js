const MERCHANT_NAME = "Al Noor General";
const ADDITIONAL_BENEFICIARIES = [
  {
    Creditor: { Name: "Al Noor Trading LLC" },
    CreditorAccount: {
      SchemeName: "IBAN",
      Identification: "AE320260001234567890123",
      Name: { en: "Al Noor Trading LLC" }
    }
  },
  {
    Creditor: { Name: "Emirates Telecommunications Group" },
    CreditorAccount: {
      SchemeName: "IBAN",
      Identification: "AE980350000009876543210",
      Name: { en: "Emirates Telecommunications Group" }
    }
  }
];
const ACCOUNTS_BALANCES_TRANSACTIONS = [
  "ReadAccountsBasic",
  "ReadAccountsDetail",
  "ReadBalances",
  "ReadTransactionsBasic",
  "ReadTransactionsDetail"
];
function bankDataSharingScenarios(base, consentKey = "consent") {
  const derive = (mutate) => {
    const next = JSON.parse(JSON.stringify(base));
    mutate(next[consentKey]);
    return next;
  };
  return [
    {
      id: "all-permissions",
      label: "All data permissions",
      description: "Every permission, current and savings accounts",
      data: derive(() => {
      })
    },
    {
      id: "accounts-balances-transactions",
      label: "Accounts, balances, transactions",
      description: "Narrow scope — no beneficiaries, party or statements",
      data: derive((consent) => {
        consent.Permissions = [...ACCOUNTS_BALANCES_TRANSACTIONS];
      })
    },
    {
      id: "credit-cards-only",
      label: "Credit cards only",
      description: "AccountSubType restricted to CreditCard",
      data: derive((consent) => {
        consent.Permissions = [...ACCOUNTS_BALANCES_TRANSACTIONS];
        consent.AccountSubType = ["CreditCard"];
      })
    },
    {
      id: "no-on-behalf-of",
      label: "No OnBehalfOf",
      description: "All permissions, OnBehalfOf omitted",
      data: derive((consent) => {
        delete consent.OnBehalfOf;
      })
    }
  ];
}
function domesticPaymentPiiScenarios(base, options = {}) {
  var _a, _b;
  const derive = (mutate) => {
    const next = JSON.parse(JSON.stringify(base));
    mutate(next);
    return next;
  };
  const scenarios = [
    {
      id: "debtor-account-at-tpp",
      label: "Debtor account selected at TPP",
      description: "DebtorAccount sent in the request",
      data: derive(() => {
      })
    },
    {
      id: "debtor-account-at-lfi",
      label: "Debtor account selected at LFI",
      description: "DebtorAccount omitted — customer picks at authorisation",
      data: derive((body) => {
        var _a2;
        (_a2 = body.Initiation) == null ? true : delete _a2.DebtorAccount;
      })
    }
  ];
  if (options.beneficiaries === "flexible") {
    scenarios.push(
      {
        id: "multiple-beneficiaries",
        label: "Multiple beneficiaries",
        description: "Creditor lists three payees — up to 10 are permitted",
        data: derive((body) => {
          body.Initiation.Creditor = [
            ...body.Initiation.Creditor ?? [],
            ...ADDITIONAL_BENEFICIARIES
          ];
        })
      },
      {
        id: "open-beneficiaries",
        label: "Open beneficiaries",
        description: "Creditor omitted — the TPP chooses the payee per payment",
        data: derive((body) => {
          delete body.Initiation.Creditor;
        })
      }
    );
  }
  if ((_b = (_a = base.Risk) == null ? void 0 : _a.CreditorIndicators) == null ? void 0 : _b.MerchantDetails) {
    scenarios.push({
      id: "no-merchant-details",
      label: "No merchant details",
      description: "MerchantDetails omitted — no on-behalf-of merchant shown",
      data: derive((body) => {
        delete body.Risk.CreditorIndicators.MerchantDetails;
        if (!Object.keys(body.Risk.CreditorIndicators).length) delete body.Risk.CreditorIndicators;
        if (!Object.keys(body.Risk).length) delete body.Risk;
      })
    });
  } else {
    scenarios.push({
      id: "with-merchant-details",
      label: "Merchant details provided",
      description: "MerchantDetails names the merchant the TPP collects for",
      data: derive((body) => {
        var _a2;
        body.Risk = {
          ...body.Risk ?? {},
          CreditorIndicators: {
            ...((_a2 = body.Risk) == null ? void 0 : _a2.CreditorIndicators) ?? {},
            MerchantDetails: { MerchantName: MERCHANT_NAME }
          }
        };
      })
    });
  }
  return scenarios;
}
function paymentConsentScenarios(base, consentKey = "consent") {
  var _a, _b, _c;
  const derive = (mutate) => {
    const next = JSON.parse(JSON.stringify(base));
    mutate(next[consentKey]);
    return next;
  };
  const scenarios = [
    {
      id: "with-data-sharing",
      label: "With data sharing permissions",
      description: "Accounts, balances and refund account alongside the payment",
      data: derive(() => {
      })
    },
    {
      id: "without-data-sharing",
      label: "Without data sharing permissions",
      description: "Permissions omitted — payment only, no account data shared",
      data: derive((consent) => {
        delete consent.Permissions;
      })
    },
    {
      id: "purpose-code-utility",
      label: "Utility purpose code",
      description: "PaymentPurposeCode UTL instead of ACM",
      data: derive((consent) => {
        consent.PaymentPurposeCode = "UTL";
      })
    },
    {
      id: "multiple-authorizations",
      label: "Multiple authorisations",
      description: "IsSingleAuthorization false, with a deadline to authorise",
      data: derive((consent) => {
        consent.IsSingleAuthorization = false;
        consent.AuthorizationExpirationDateTime = consent.ExpirationDateTime;
      })
    }
  ];
  if ((_c = (_b = (_a = base[consentKey]) == null ? void 0 : _a.ControlParameters) == null ? void 0 : _b.ConsentSchedule) == null ? void 0 : _c.MultiPayment) {
    scenarios.push({
      id: "minimal-control-parameters",
      label: "Minimal control parameters",
      description: "Only the caps this payment type actually requires",
      data: derive((consent) => {
        stripOptionalControls(consent.ControlParameters.ConsentSchedule.MultiPayment);
      })
    });
  }
  return scenarios;
}
function stripOptionalControls(multiPayment) {
  var _a, _b;
  delete multiPayment.MaximumCumulativeValueOfPayments;
  const type = ((_a = multiPayment.PeriodicSchedule) == null ? void 0 : _a.Type) ?? "";
  if (!type.endsWith("PeriodicSchedule")) delete multiPayment.MaximumCumulativeNumberOfPayments;
  const controls = (_b = multiPayment.PeriodicSchedule) == null ? void 0 : _b.Controls;
  if (controls) {
    const keep = "MaximumIndividualAmount" in controls ? "MaximumIndividualAmount" : "MaximumCumulativeNumberOfPaymentsPerPeriod";
    for (const key of Object.keys(controls)) {
      if (key !== keep) delete controls[key];
    }
  }
}
function confirmationOfPayeeScenarios() {
  return [
    {
      id: "match-yes",
      label: "Yes — full match",
      description: "Name and account match; no MaskedName returned",
      data: {
        NameMatchIndicator: "ConfirmationOfPayee.Yes"
      }
    },
    {
      id: "match-partial",
      label: "Partial match",
      description: "Close match; payer reviews the masked account name",
      data: {
        NameMatchIndicator: "ConfirmationOfPayee.Partial",
        MaskedName: "Ib*** A***** Sa***"
      }
    },
    {
      id: "match-no",
      label: "No match",
      description: "Different account holder; payer must be warned",
      data: {
        NameMatchIndicator: "ConfirmationOfPayee.No",
        MaskedName: "Fa**** Al M*****"
      }
    }
  ];
}
export {
  bankDataSharingScenarios as b,
  confirmationOfPayeeScenarios as c,
  domesticPaymentPiiScenarios as d,
  paymentConsentScenarios as p
};
