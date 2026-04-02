## UI Behaviour Driven by API Fields

### Permissions and Data Access

The table below outlines the text displayed to users on the Consent Page when they expand each data category associated with the consent permissions.

<PermissionsReference />


### Account Sub Type Filtering

The `AccountSubType` field in `authorization_details` acts as a filter, controlling which of the user's accounts are presented for selection on the LFI Authorisation Page.

| `AccountSubType` | LFI Authorisation Page Behaviour |
|---|---|
| **Provided** | Only accounts whose sub-type matches one of the specified values are shown. If the user holds no accounts of the requested sub-type, the LFI returns an error and the authorisation flow cannot proceed. |
| **Not provided** | All of the user's available accounts are shown for selection, regardless of account type. |

::: tip
Use `AccountSubType` to restrict access to specific account types (e.g. `Mortgage`). Omit it to allow selection from all account types.
:::


### On Behalf Of

When a TPP acts on behalf of another entity (e.g. an aggregator operating under a different trading name), `OnBehalfOf.TradingName` can be passed to identify the entity to the user on the LFI Authorisation Page.

| `OnBehalfOf.TradingName` | LFI Authorisation Page Behaviour |
|---|---|
| **Provided** | The trading name is displayed within the Authorisation Page so the user clearly understands which entity they are sharing data with. |
| **Not provided** | The TPP's name is displayed in place of the trading name. |

::: tip
Always populate `OnBehalfOf.TradingName` so users see a recognisable name rather than a blank or placeholder on the Authorisation Page.
:::