---
next: false
prev: false
aside: false
---

🕒 **3 minute read**

# ATMs — API Guide

The ATM API exposes a single endpoint that returns all ATM records published by the LFI. This is open data — no customer consent is required. The Hub calls your Ozone Connect [`GET /atm`](/tech/lfi-api-hub/v2.1/banking/atms/open-api/atm) endpoint whenever a TPP or public consumer requests ATM data for your institution.

## API Sequence Flow

<APIFlowViewer title="ATM API Flow">
  <APIFlowsATMs/>
</APIFlowViewer>


## <span style="color: #22c55e; padding-right: 5px;">GET</span> `/atm`

### Request headers

| Header | Required | Description |
|--------|----------|-------------|
| `o3-provider-id` | Yes | Identifier for your LFI registered in the Hub |
| `o3-caller-org-id` | Yes | Organisation ID of the TPP making the underlying request |
| `o3-caller-client-id` | Yes | OIDC client ID of the TPP application |
| `o3-caller-software-statement-id` | Yes | Software statement ID of the TPP application |
| `o3-api-uri` | Yes | The parameterised URL of the API being called by the TPP |
| `o3-api-operation` | Yes | The HTTP method of the operation carried out by the TPP (e.g. `GET`) |
| `o3-ozone-interaction-id` | Yes | Hub-generated interaction ID. Equals `o3-caller-interaction-id` if the TPP provided one |
| `o3-caller-interaction-id` | No | Interaction ID passed in by the TPP, if present |

### Response

`Content-Type: application/json`

Return `200` with a `data` array containing one record per ATM. Return an empty array if no ATMs are registered — do not return `404`.

#### `data[]` — ATM record

##### Required fields

| Field | Type | Description |
|-------|------|-------------|
| `LFIId` | string | Your LFI identifier as registered in the Hub (1–36 characters) |
| `LFIBrandId` | string | Brand identifier for the LFI (1–140 characters) |
| `ATMId` | string | Unique identifier for the ATM (1–36 characters) |
| `SupportedCurrencies` | string[] | ISO 4217 currency codes the ATM dispenses or accepts (at least one required) |
| `Location` | object | Physical location of the ATM — see below |

##### `Location`

Both `PostalAddress` and `GeoLocation` are required.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `PostalAddress` | object | Yes | Structured postal address — see below |
| `GeoLocation` | object | Yes | GPS coordinates — see below |
| `LocationCategory` | string[] | No | One or more of: `BranchExternal`, `BranchInternal`, `BranchLobby`, `RetailerOutlet`, `RemoteUnit`, `DriveThru`, `Other` |
| `Site` | object | No | `Identification` and `Name` of the site |

##### `PostalAddress`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `AddressLine` | string[] | Yes | 1–7 free-form address lines |
| `TownName` | string | No | City or town |
| `CountrySubDivision` | string | No | UAE emirate: `AbuDhabi`, `Dubai`, `Sharjah`, `Ajman`, `UmmAlQuwain`, `RasAlKhaimah`, `Fujairah` |
| `Country` | string | No | ISO 3166-1 alpha-2 country code (e.g. `AE`) |
| `StreetName` | string | No | Street name |
| `BuildingNumber` | string | No | Building number |
| `BuildingName` | string | No | Building name |
| `Floor` | string | No | Floor within the building |
| `DistrictName` | string | No | District or neighbourhood |
| `PostBox` | string | No | PO box |
| `AddressType` | string | No | `Business` or `Other` |

##### `GeoLocation`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `Latitude` | string | Yes | Latitude of the ATM |
| `Longitude` | string | Yes | Longitude of the ATM |

##### Optional fields

| Field | Type | Description |
|-------|------|-------------|
| `SupportedLanguages` | string[] | Languages supported on the ATM interface |
| `Services` | string[] | Services available: `Balance`, `BillPayments`, `CashDeposits`, `CharityDonation`, `ChequeDeposits`, `CashWithdrawal`, `EnvelopeDeposit`, `FastCash`, `MobileBankingRegistration`, `MobilePaymentRegistration`, `MobilePhoneTopUp`, `OrderStatement`, `PINActivation`, `PINChange`, `PINUnblock`, `MiniStatement`, `Other`, or a namespaced extension value |
| `Accessibility` | string[] | Accessibility features: `AudioCashMachine`, `AutomaticDoors`, `ExternalRamp`, `InductionLoop`, `InternalRamp`, `LevelAccess`, `LowerLevelCounter`, `WheelchairAccess`, `Other` |
| `IsAccess24Hour` | boolean | Whether the ATM is accessible 24 hours |
| `Availability` | object | `Status` (`Available`, `Unavailable`, `UnderMaintenance`) and `OperatingHours` (array of `Days`, `OpenTime`, `CloseTime`) |
| `MinimumPossibleAmount` | object | Minimum transaction amount (`Amount` and `Currency`) |
| `MaximumPossibleAmount` | object | Maximum transaction amount (`Amount` and `Currency`) |
| `Branch` | object | Associated branch identifier (`SchemeName`: `BICFI` or `Other`, and `Identification`) |
| `ATMFee` | array | Fee records — each requires `Type`; optionally includes `Amount`, `Percentage`, `ApplicableNetworks`, `Conditions` |
| `Notes` | string[] | Free-text notes about the ATM |
| `Links` | object | `FeesUri` — URL to a full fee schedule |

##### `ATMFee.Type` values

`Withdrawal`, `BalanceInquiry`, `MiniStatement`, `PINChange`, `CashDeposit`, `CardlessWithdrawal`, `InternationalWithdrawal`, `CrossBankWithdrawal`, `OverLimit`, `DeclinedTransaction`, `EmergencyCashWithdrawal`, `ForeignATMUsage`, `ServiceDenial`, `FastCashWithdrawal`, `NetworkSurcharge`, `ForeignExchange`, `DomesticCrossBank`, `InternationalCrossBank`, `Other`

#### `meta`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `LastUpdatedDateTime` | string (date-time) | Yes | Timestamp of the most recent update to the ATM data |
| `TotalRecords` | integer | Yes | Total number of ATM records returned |

#### Example response

```json
{
  "data": [
    {
      "LFIId": "lfi-001",
      "LFIBrandId": "First National Bank UAE",
      "ATMId": "atm-dxb-001",
      "SupportedLanguages": ["en", "ar"],
      "Services": ["CashWithdrawal", "Balance", "MiniStatement", "PINChange"],
      "Accessibility": ["WheelchairAccess", "AudioCashMachine"],
      "IsAccess24Hour": true,
      "Availability": {
        "Status": "Available"
      },
      "SupportedCurrencies": ["AED"],
      "MinimumPossibleAmount": {
        "Amount": "20",
        "Currency": "AED"
      },
      "MaximumPossibleAmount": {
        "Amount": "5000",
        "Currency": "AED"
      },
      "Location": {
        "LocationCategory": ["BranchExternal"],
        "PostalAddress": {
          "AddressLine": ["Sheikh Zayed Road", "Al Quoz"],
          "TownName": "Dubai",
          "CountrySubDivision": "Dubai",
          "Country": "AE"
        },
        "GeoLocation": {
          "Latitude": "25.1972",
          "Longitude": "55.2796"
        }
      },
      "ATMFee": [
        {
          "Type": "CrossBankWithdrawal",
          "Amount": {
            "Amount": "2.00",
            "Currency": "AED"
          }
        }
      ]
    }
  ],
  "meta": {
    "LastUpdatedDateTime": "2025-03-01T08:00:00Z",
    "TotalRecords": 1
  }
}
```

#### Error responses

Only return an error when the Hub's request itself is invalid or a server condition prevents you from responding. All error bodies must include `errorCode` and `errorMessage`.

##### `400` — Bad request

| `errorCode` | When to use |
|-------------|-------------|
| `Body.InvalidFormat` | Request is malformed or does not match the schema |
| `Resource.InvalidFormat` | A request parameter is present but syntactically invalid |
| `GenericRecoverableError` | Recoverable validation error not covered above — Hub may retry |
| `GenericError` | Unrecoverable validation error not covered above |

##### `403` — Forbidden

| `errorCode` | When to use |
|-------------|-------------|
| `AccessToken.InvalidScope` | The Hub's token does not include the required scope |
| `GenericRecoverableError` | Recoverable access failure not covered above |
| `GenericError` | Unrecoverable access failure not covered above |

##### `500` — Internal server error

| `errorCode` | When to use |
|-------------|-------------|
| `GenericRecoverableError` | Transient server error — Hub may retry after a delay |
| `GenericError` | Unrecoverable server error |
