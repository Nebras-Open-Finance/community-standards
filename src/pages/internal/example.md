<route lang="yaml">
meta:
  layout: internal
  title: Example page
  next: false
  prev: false
  aside: false
</route>

# Example page

This page is a starter template. Duplicate it with the widget above to get a draft seeded
with everything below, then edit the Markdown freely. The block elements shown here cover
the formatting you can use on an internal page — headings, prose, lists, tables, quotes,
images and code.

## What an internal page is for

Internal pages are a low-friction space for documentation that is not yet ready to live in
the public site. Drafts stay in your browser; only pages committed to the repository at
`src/pages/internal/*.md` are visible to anyone else. Use the section to capture working
notes, draft proposals, and onboarding material before promoting it into the wider docs.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

### A smaller subsection

Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
anim id est laborum. **Bold text** stands out, *italic text* sets a softer emphasis, and
`inline code` is for short identifiers like `clientId` or `POST /payments`. Links look
like [this one to the TPP standards](/tech/tpp-standards/).

## Lists

Unordered:

- The TPP initiates the consent via PAR
- The API Hub stores the consent and brokers authorization
- The end user authenticates at the LFI
- The TPP exchanges the auth code for an access token

Ordered:

1. Validate the access token
2. Validate the consent is still authorised
3. Enrich the request with `customerId` and `accountIds`
4. Proxy the request to the Ozone Connect endpoint
5. Normalise the response and return it to the TPP

Nested list:

- Banking
  - Account information
  - Payment initiation
  - Confirmation of funds
- Insurance
  - Policy information
  - Claim status

## A table

| Term | Role | Operated by |
| --- | --- | --- |
| TPP | Third-Party Provider | Third party |
| API Hub | Authorization Server & Gateway | Nebras |
| Ozone Connect | LFI backend exposing Open Finance endpoints | LFI |

## A blockquote

> "Strict mediation is the foundation of the trust model: every TPP request flows through
> the API Hub, which validates the token and consent before proxying to the LFI."

## An image

Standalone images render as a zoomable `ImageViewer`. Use a URL or a path under `public/`.

![A sample article cover image](/images/articles/adib-first.jpg)

## Code blocks

A JSON example:

```json
{
  "Data": {
    "ConsentId": "urn:apihub:consent:abc-123",
    "Status": "Authorised",
    "Permissions": [
      "ReadAccountsBasic",
      "ReadBalances",
      "ReadTransactionsDetail"
    ]
  }
}
```

A `curl` example:

```bash
curl -X POST https://rs1.demo-bank.apihub.openfinance.ae/open-banking/v2.1/aisp/account-access-consents \
  -H "Authorization: Bearer eyJhbGciOi..." \
  -H "Content-Type: application/json" \
  -d @consent.json
```

A short TypeScript snippet:

```ts
interface ConsentRequest {
  permissions: string[]
  expirationDateTime?: string
  transactionFromDateTime?: string
  transactionToDateTime?: string
}

function isExpired(consent: { expirationDateTime?: string }): boolean {
  if (!consent.expirationDateTime) return false
  return new Date(consent.expirationDateTime).getTime() < Date.now()
}
```

## Horizontal rules separate sections

---

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tristique sapien at
neque dignissim, vitae cursus mauris pulvinar. Praesent volutpat tortor in justo
fermentum, sit amet faucibus enim luctus.

---

## When you're ready to publish

Drafts live only in this browser. When a page is ready to share, the publish flow copies
the draft into `src/pages/internal/{slug}.md` and ships it through a normal repo commit.
After deploy, the page is reachable at `/internal/{slug}` and the local draft can be
deleted from the internal home.
