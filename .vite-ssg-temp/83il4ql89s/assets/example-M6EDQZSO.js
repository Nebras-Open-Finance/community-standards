import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr } from "vue/server-renderer";
import { b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const _imports_0 = "/images/articles/adib-first.jpg";
const _sfc_main = {
  __name: "example",
  __ssrInlineRender: true,
  setup(__props, { expose: __expose }) {
    const frontmatter = {};
    __expose({ frontmatter });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "markdown-body" }, _attrs))}><h1>Example page</h1><p>This page is a starter template. Duplicate it with the widget above to get a draft seeded with everything below, then edit the Markdown freely. The block elements shown here cover the formatting you can use on an internal page — headings, prose, lists, tables, quotes, images and code.</p><h2>What an internal page is for</h2><p>Internal pages are a low-friction space for documentation that is not yet ready to live in the public site. Drafts stay in your browser; only pages committed to the repository at <code>src/pages/internal/*.md</code> are visible to anyone else. Use the section to capture working notes, draft proposals, and onboarding material before promoting it into the wider docs.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p><h3>A smaller subsection</h3><p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. <strong>Bold text</strong> stands out, <em>italic text</em> sets a softer emphasis, and <code>inline code</code> is for short identifiers like <code>clientId</code> or <code>POST /payments</code>. Links look like <a href="/tech/tpp-standards/">this one to the TPP standards</a>.</p><h2>Lists</h2><p>Unordered:</p><ul><li>The TPP initiates the consent via PAR</li><li>The API Hub stores the consent and brokers authorization</li><li>The end user authenticates at the LFI</li><li>The TPP exchanges the auth code for an access token</li></ul><p>Ordered:</p><ol><li>Validate the access token</li><li>Validate the consent is still authorised</li><li>Enrich the request with <code>customerId</code> and <code>accountIds</code></li><li>Proxy the request to the Ozone Connect endpoint</li><li>Normalise the response and return it to the TPP</li></ol><p>Nested list:</p><ul><li>Banking <ul><li>Account information</li><li>Payment initiation</li><li>Confirmation of funds</li></ul></li><li>Insurance <ul><li>Policy information</li><li>Claim status</li></ul></li></ul><h2>A table</h2><table><thead><tr><th>Term</th><th>Role</th><th>Operated by</th></tr></thead><tbody><tr><td>TPP</td><td>Third-Party Provider</td><td>Third party</td></tr><tr><td>API Hub</td><td>Authorization Server &amp; Gateway</td><td>Nebras</td></tr><tr><td>Ozone Connect</td><td>LFI backend exposing Open Finance endpoints</td><td>LFI</td></tr></tbody></table><h2>A blockquote</h2><blockquote><p>“Strict mediation is the foundation of the trust model: every TPP request flows through the API Hub, which validates the token and consent before proxying to the LFI.”</p></blockquote><h2>An image</h2><p>Standalone images render as a zoomable <code>ImageViewer</code>. Use a URL or a path under <code>public/</code>.</p><p><img${ssrRenderAttr("src", _imports_0)} alt="A sample article cover image"></p><h2>Code blocks</h2><p>A JSON example:</p><pre><code class="language-json">{
  &quot;Data&quot;: {
    &quot;ConsentId&quot;: &quot;urn:apihub:consent:abc-123&quot;,
    &quot;Status&quot;: &quot;Authorised&quot;,
    &quot;Permissions&quot;: [
      &quot;ReadAccountsBasic&quot;,
      &quot;ReadBalances&quot;,
      &quot;ReadTransactionsDetail&quot;
    ]
  }
}
</code></pre><p>A <code>curl</code> example:</p><pre><code class="language-bash">curl -X POST https://rs1.demo-bank.apihub.openfinance.ae/open-banking/v2.1/aisp/account-access-consents \\
  -H &quot;Authorization: Bearer eyJhbGciOi...&quot; \\
  -H &quot;Content-Type: application/json&quot; \\
  -d @consent.json
</code></pre><p>A short TypeScript snippet:</p><pre><code class="language-ts">interface ConsentRequest {
  permissions: string[]
  expirationDateTime?: string
  transactionFromDateTime?: string
  transactionToDateTime?: string
}

function isExpired(consent: { expirationDateTime?: string }): boolean {
  if (!consent.expirationDateTime) return false
  return new Date(consent.expirationDateTime).getTime() &lt; Date.now()
}
</code></pre><h2>Horizontal rules separate sections</h2><hr><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tristique sapien at neque dignissim, vitae cursus mauris pulvinar. Praesent volutpat tortor in justo fermentum, sit amet faucibus enim luctus.</p><hr><h2>When you’re ready to publish</h2><p>Drafts live only in this browser. When a page is ready to share, the publish flow copies the draft into <code>src/pages/internal/{slug}.md</code> and ships it through a normal repo commit. After deploy, the page is reachable at <code>/internal/{slug}</code> and the local draft can be deleted from the internal home.</p></div>`);
    };
  }
};
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/internal/example.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
