// Functional Certification config for the TPP (consumer) side of Domestic
// Payments. Unlike the LFI side — one standalone area per payment type — the TPP
// side is a single area covering all eight types: the TPP ticks the ones it
// offers and, for each, provides the two objects it is responsible for
// constructing and sending to the API Hub —
//
//   * the Consent (authorization_details / RAR) it sends at PAR, and
//   * the Risk (AERisk) object it sends for fraud scoring —
//
// both edited in a schema-validated JSON editor, plus a Postman example of a
// payment made against a consent of that type. Delegated SCA additionally
// evidences the authentication the TPP performs itself before each payment and
// how it manifests in Risk.DebtorIndicators.Authentication.
//
// The consent ControlParameters shapes mirror the LFI multi-payments config
// (multi-payments.ts) — confirmed accepted at PAR against the sandbox — and every
// seed here is checked against the OpenAPI schema by
// supporting/tests/functional-cert-payment-tpp.test.mjs, so the editor can never
// silently discard an invalid seed.

import type { FcTppPaymentArea, FcTppPaymentCapability, FcTppPaymentType } from './types'

// Sandbox Model Bank resource-server bases the TPP calls; {VERSION} is substituted
// by the portal. Payments and account-information are served from different paths.
const PAY_BASE =
  'https://rs1.altareq1.sandbox.apihub.openfinance.ae/open-finance/payment/{VERSION}'
const AIS_BASE =
  'https://rs1.altareq1.sandbox.apihub.openfinance.ae/open-finance/account-information/{VERSION}'

const AUTH_SPEC = '/openapi/v2.1/standards/uae-authorization-endpoints-openapi.yaml'
const SI_GUIDE = '/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments'
const CONSENT_SCHEMA =
  'AEBankServiceInitiationRichAuthorizationRequestsV21.AEBankServiceInitiationAuthorizationDetailsProperties'
const RISK_SCHEMA = 'AEBankServiceInitiationRichAuthorizationRequests.AERisk'

// A reference JWE-serialised PII string. The PII a TPP sends at PAR is a JWE
// (AEJWEPaymentPII, a string) encapsulating the signed, encrypted payment details;
// the cleartext shape is out of scope here, so the seed carries a representative
// compact-serialisation placeholder the TPP replaces with its own.
const JWE_PII =
  'eyJhbGciOiJSU0EtT0FFUC0yNTYiLCJlbmMiOiJBMjU2R0NNIn0.encryptedKey.iv.ciphertext.tag'

/** Wrap a ControlParameters object as a full authorization_details Consent seed. */
function consentSeed(controlParameters: Record<string, unknown>): Record<string, unknown> {
  return {
    type: 'urn:openfinanceuae:service-initiation-consent:v2.1',
    consent: {
      PersonalIdentifiableInformation: JWE_PII,
      ControlParameters: controlParameters,
      ConsentId: 'b8f42378-10ac-46a1-8d20-4e020484216d',
      ExpirationDateTime: '2027-06-05T23:59:59.000Z',
      PaymentPurposeCode: 'GDS',
    },
    subscription: {
      Webhook: { Url: 'https://webhook.site/mock-event-receiver', IsActive: false },
    },
  }
}

// ── ControlParameters per payment type ───────────────────────────────────────
// SinglePayment for Single Instant Payment; MultiPayment (discriminated by
// PeriodicSchedule.Type) for the six long-lived types; IsDelegatedAuthentication
// with no ConsentSchedule for Delegated SCA (the TPP manages the controls).

const CP_SIP = {
  IsDelegatedAuthentication: false,
  ConsentSchedule: {
    SinglePayment: { Type: 'SingleInstantPayment', Amount: { Amount: '100.00', Currency: 'AED' } },
  },
}
const CP_VOD = {
  IsDelegatedAuthentication: false,
  ConsentSchedule: {
    MultiPayment: {
      MaximumCumulativeValueOfPayments: { Amount: '10000.00', Currency: 'AED' },
      MaximumCumulativeNumberOfPayments: 24,
      PeriodicSchedule: {
        Type: 'VariableOnDemand',
        PeriodType: 'Month',
        PeriodStartDate: '2026-08-01',
        Controls: {
          MaximumIndividualAmount: { Amount: '1000.00', Currency: 'AED' },
          MaximumCumulativeValueOfPaymentsPerPeriod: { Amount: '3000.00', Currency: 'AED' },
          MaximumCumulativeNumberOfPaymentsPerPeriod: 5,
        },
      },
    },
  },
}
const CP_FOD = {
  IsDelegatedAuthentication: false,
  ConsentSchedule: {
    MultiPayment: {
      PeriodicSchedule: {
        Type: 'FixedOnDemand',
        PeriodType: 'Month',
        PeriodStartDate: '2026-08-01',
        Amount: { Amount: '500.00', Currency: 'AED' },
        Controls: { MaximumCumulativeNumberOfPaymentsPerPeriod: 3 },
      },
    },
  },
}
const CP_VPS = {
  IsDelegatedAuthentication: false,
  ConsentSchedule: {
    MultiPayment: {
      MaximumCumulativeNumberOfPayments: 12,
      PeriodicSchedule: {
        Type: 'VariablePeriodicSchedule',
        PeriodType: 'Month',
        PeriodStartDate: '2026-08-01',
        MaximumIndividualAmount: { Amount: '1200.00', Currency: 'AED' },
      },
    },
  },
}
const CP_FPS = {
  IsDelegatedAuthentication: false,
  ConsentSchedule: {
    MultiPayment: {
      MaximumCumulativeNumberOfPayments: 12,
      PeriodicSchedule: {
        Type: 'FixedPeriodicSchedule',
        PeriodType: 'Month',
        PeriodStartDate: '2026-08-01',
        Amount: { Amount: '500.00', Currency: 'AED' },
      },
    },
  },
}
const CP_VDS = {
  IsDelegatedAuthentication: false,
  ConsentSchedule: {
    MultiPayment: {
      PeriodicSchedule: {
        Type: 'VariableDefinedSchedule',
        Schedule: [
          { PaymentExecutionDate: '2026-08-15', MaximumIndividualAmount: { Amount: '1200.00', Currency: 'AED' } },
          { PaymentExecutionDate: '2026-09-15', MaximumIndividualAmount: { Amount: '1200.00', Currency: 'AED' } },
        ],
      },
    },
  },
}
const CP_FDS = {
  IsDelegatedAuthentication: false,
  ConsentSchedule: {
    MultiPayment: {
      PeriodicSchedule: {
        Type: 'FixedDefinedSchedule',
        Schedule: [
          { PaymentExecutionDate: '2026-08-15', Amount: { Amount: '500.00', Currency: 'AED' } },
          { PaymentExecutionDate: '2026-09-15', Amount: { Amount: '500.00', Currency: 'AED' } },
        ],
      },
    },
  },
}
const CP_DSCA = { IsDelegatedAuthentication: true }

// ── Risk (AERisk) template ────────────────────────────────────────────────────
// The full AERisk skeleton — EVERY field the schema defines, so the TPP sees the
// whole shape and fills in what applies (and deletes what it does not). Generated
// from the AERisk schema and validated against it by the guard test: free-text
// fields are blank, and fields that cannot be blank without the editor rejecting
// the object (enums, numbers, booleans, date-times, and the `^[A-Z]{2}$` country
// code) carry a schema-valid placeholder the TPP overwrites. Delegated SCA fills
// DebtorIndicators.Authentication in particular; other TPPs typically leave it out.
const RISK_TEMPLATE: Record<string, unknown> = {
  DebtorIndicators: {
    Authentication: {
      AuthenticationChannel: 'App',
      PossessionFactor: { IsUsed: false, Type: 'FIDO2SecurityKey' },
      KnowledgeFactor: { IsUsed: false, Type: 'PIN' },
      InherenceFactor: { IsUsed: false, Type: 'Biometric' },
      ChallengeOutcome: 'Pass',
      AuthenticationFlow: 'MFA',
      AuthenticationValue: '',
      ChallengeDateTime: '2026-01-01T00:00:00.000Z',
    },
    UserName: { en: '', ar: '' },
    GeoLocation: { Latitude: '', Longitude: '' },
    DeviceInformation: {
      DeviceId: '',
      AlternativeDeviceId: '',
      DeviceOperatingSystem: '',
      DeviceOperatingSystemVersion: '',
      DeviceBindingId: '',
      LastBindingDateTime: '2026-01-01T00:00:00.000Z',
      BindingDuration: '',
      BindingStatus: 'Active',
      DeviceType: 'Mobile',
      DeviceManufacturer: { Model: '', Manufacturer: '' },
      DeviceLanguage: '',
      DeviceLocalDateTime: '',
      ConnectionType: 'WiFi',
      ScreenInformation: { PixelDensity: 0, Orientation: 'Portrait' },
      BatteryStatus: { Level: 0, IsCharging: false },
      TouchSupport: { Supported: false, MaxTouchPoints: 0 },
      MotionSensors: { Status: 'InMotion', Accelerometer: false, Gyroscope: false },
      DeviceEnvironmentContext: ['VPNDetected'],
    },
    BiometricCapabilities: { SupportsBiometric: false, BiometricTypes: ['Fingerprint'] },
    AppInformation: { AppVersion: '', PackageName: '', BuildNumber: '' },
    BrowserInformation: {
      UserAgent: '',
      IsCookiesEnabled: false,
      AvailableFonts: [''],
      Plugins: [''],
      PixelRatio: 0,
    },
    UserBehavior: { ScrollBehavior: { Direction: 'Up', Speed: 0, Frequency: 0 } },
    AccountRiskIndicators: {
      UserOnboardingDateTime: '2026-01-01T00:00:00.000Z',
      LastAccountChangeDate: '2026-01-01',
      LastPasswordChangeDate: '2026-01-01',
      SuspiciousActivity: 'NoSuspiciousActivity',
      TransactionHistory: { LastDay: 0, LastYear: 0 },
    },
    SupplementaryData: {},
  },
  DestinationDeliveryAddress: {
    RecipientType: 'Individual',
    RecipientName: { en: '', ar: '' },
    NationalAddress: [
      {
        AddressType: 'Billing',
        AddressLine: ['x'],
        BuildingNumber: 'x',
        BuildingName: 'x',
        Floor: 'x',
        StreetName: 'x',
        DistrictName: 'x',
        PostBox: 'x',
        TownName: 'x',
        CountrySubDivision: 'AbuDhabi',
        Country: 'AE',
      },
    ],
  },
  TransactionIndicators: {
    IsCustomerPresent: false,
    IsContractPresent: false,
    Channel: 'Web',
    ChannelType: 'ECommerce',
    SubChannelType: 'WebBrowser',
    PaymentProcess: {
      TotalDuration: 0,
      CurrentSessionAttempts: 1,
      CurrentSessionFailedAttempts: 0,
      Last24HourAttempts: 0,
      Last24HourFailedAttempts: 0,
    },
    MerchantRisk: {
      DeliveryTimeframe: 'ElectronicDelivery',
      ReorderItemsIndicator: 'FirstTimeOrder',
      PreOrderPurchaseIndicator: 'MerchandiseAvailable',
      IsGiftCardPurchase: false,
      IsDeliveryAddressMatchesBilling: false,
      AddressMatchLevel: 'FullMatch',
    },
    SupplementaryData: {},
  },
  CreditorIndicators: {
    AccountType: 'Retail',
    IsCreditorPrePopulated: false,
    TradingName: { en: '', ar: '' },
    IsVerifiedByTPP: false,
    AdditionalAccountHolderIdentifiers: [
      { SchemeName: 'EmiratesID', Identification: 'x', Name: { en: '', ar: '' } },
    ],
    MerchantDetails: { MerchantId: 'xxxxxxxx', MerchantName: 'x', MerchantSICCode: 'xxx', MerchantCategoryCode: 'xxx' },
    IsCreditorConfirmed: false,
    SupplementaryData: {},
  },
}

interface TypeDef {
  key: string
  label: string
  paymentType: string
  summary: string
  controlParameters: Record<string, unknown>
  isDelegatedSca?: boolean
}

const TYPE_DEFS: TypeDef[] = [
  { key: 'single-instant-payment', label: 'Single Instant Payment', paymentType: 'SingleInstantPayment', controlParameters: CP_SIP, summary: 'A one-off payment initiated immediately after authorization — ConsentSchedule.SinglePayment with a fixed Amount.' },
  { key: 'variable-on-demand', label: 'Variable On-Demand', paymentType: 'VariableOnDemand', controlParameters: CP_VOD, summary: 'On-demand payments of variable amounts within per-period controls and cumulative caps.' },
  { key: 'fixed-on-demand', label: 'Fixed On-Demand', paymentType: 'FixedOnDemand', controlParameters: CP_FOD, summary: 'On-demand payments of a fixed amount within per-period controls.' },
  { key: 'variable-periodic-schedule', label: 'Variable Periodic Schedule', paymentType: 'VariablePeriodicSchedule', controlParameters: CP_VPS, summary: 'Recurring payments of variable amounts on a period schedule, with a maximum individual amount.' },
  { key: 'fixed-periodic-schedule', label: 'Fixed Periodic Schedule', paymentType: 'FixedPeriodicSchedule', controlParameters: CP_FPS, summary: 'Recurring payments of a fixed amount on a period schedule.' },
  { key: 'variable-defined-schedule', label: 'Variable Defined Schedule', paymentType: 'VariableDefinedSchedule', controlParameters: CP_VDS, summary: 'Pre-defined future-dated payments of variable amounts on specific dates.' },
  { key: 'fixed-defined-schedule', label: 'Fixed Defined Schedule', paymentType: 'FixedDefinedSchedule', controlParameters: CP_FDS, summary: 'Pre-defined future-dated payments of a fixed amount on specific dates.' },
  { key: 'delegated-sca', label: 'Delegated SCA', paymentType: 'DelegatedSCA', controlParameters: CP_DSCA, isDelegatedSca: true, summary: 'IsDelegatedAuthentication: true with no ConsentSchedule — the TPP performs the SCA and manages the payment controls itself.' },
]

function buildType(t: TypeDef): FcTppPaymentType {
  const guide = t.isDelegatedSca
    ? `${SI_GUIDE}/multi-payments/delegated-sca/api-guide`
    : t.key === 'single-instant-payment'
      ? `${SI_GUIDE}/single-instant-payment/api-guide`
      : `${SI_GUIDE}/multi-payments/${t.key}/api-guide`
  return {
    key: t.key,
    label: t.label,
    paymentType: t.paymentType,
    ...(t.isDelegatedSca ? { isDelegatedSca: true } : {}),
    summary: t.summary,
    docHref: guide,
    postmanRequest: `POST /payments — ${t.label}`,
    consentSeed: consentSeed(t.controlParameters),
    riskSeed: RISK_TEMPLATE,
  }
}

// ── Optional capabilities: account/balance reads (before) and Refunds (after) ─
const CAPABILITIES: FcTppPaymentCapability[] = [
  {
    key: 'accounts-balances',
    label: 'Accounts & Balances',
    timing: 'before',
    description:
      'The payment consent carries ReadAccountsBasic/Detail and ReadBalances, so you read the debtor account and its balance before initiating the payment.',
    baseUrlTemplate: AIS_BASE,
    endpoints: [
      { method: 'GET', path: '/accounts', permission: 'ReadAccountsBasic' },
      { method: 'GET', path: '/accounts/{AccountId}/balances', permission: 'ReadBalances' },
    ],
    docHref: '/tech/tpp-standards/v2.1/banking/data-sharing/api-guide',
  },
  {
    key: 'refunds',
    label: 'Refunds',
    timing: 'after',
    description:
      'The payment consent carries ReadRefundAccount, so you retrieve the debtor refund-account details after the payment.',
    baseUrlTemplate: PAY_BASE,
    endpoints: [
      { method: 'GET', path: '/payment-consents/{ConsentId}/refund', permission: 'ReadRefundAccount' },
    ],
    docHref: '/tech/tpp-standards/v2.1/banking/service-initiation/refunds/api-guide',
  },
]

export const domesticPaymentsTppArea: FcTppPaymentArea = {
  kind: 'payment-tpp',
  key: 'domestic-payments',
  label: 'Domestic Payments',
  apiName: 'Bank Service Initiation',
  role: 'tpp',
  certType: 'TPP Functional Certification Evidence',
  tppBaseUrlTemplate: PAY_BASE,
  wellKnownUrl:
    'https://auth1.altareq1.sandbox.apihub.openfinance.ae/.well-known/openid-configuration',
  sandboxEvidenceHref: '/tech/tpp-standards/sandbox/model-bank',
  postmanGuideHref: '/tech/tpp-standards/v2.1/getting-started/postman',
  consentEditor: { spec: AUTH_SPEC, schemaName: CONSENT_SCHEMA },
  riskEditor: { spec: AUTH_SPEC, schemaName: RISK_SCHEMA },
  types: TYPE_DEFS.map(buildType),
  capabilities: CAPABILITIES,
}
