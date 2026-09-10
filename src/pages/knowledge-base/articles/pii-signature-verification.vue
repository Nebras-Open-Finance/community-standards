<route lang="yaml">
meta:
  title: "Verifying the PII Signature — Rotated Keys and the Inactive JWKS"
  description: "The TPP signature on a payment consent's PII is as long-lived as the consent. The key that made it is not — TPPs rotate signing keys freely, and a rotated key leaves the active JWKS. Where you verify decides which key sets you have to look in."
  category: Security
  readTime: "6 min"
  updated: "2026-09-10"
  tags:
    - PII
    - JWS
    - Trust Framework
</route>

<script setup lang="ts">
interface Section { id: string; label: string }
interface MetaItem { label: string; value: string }

const sections: Section[] = [
  { id: 'problem', label: 'The problem' },
  { id: 'when',    label: 'Where you verify' },
  { id: 'jwks',    label: 'Active & inactive JWKS' },
  { id: 'how',     label: 'Verifying later' },
  { id: 'timing',  label: 'Timing claims' },
]

const meta: MetaItem[] = [
  { label: 'Category', value: 'Security' },
  { label: 'Read',     value: '6 min' },
  { label: 'Updated',  value: '10 Sep 2026' },
]

const tags: readonly string[] = ['PII', 'JWS', 'Trust Framework']

const jwksProduction = `Active     https://keystore.directory.openfinance.ae/{id}/application.jwks
Inactive   https://keystore.directory.openfinance.ae/{id}/inactive/application.jwks`

const jwksSandbox = `Active     https://keystore.sandbox.directory.openfinance.ae/{id}/application.jwks
Inactive   https://keystore.sandbox.directory.openfinance.ae/{id}/inactive/application.jwks`

const activeOnlySnippet = `const jwks = createRemoteJWKSet(new URL(jwksUri))   // active keys only
const { payload } = await jwtVerify(jwsString, jwks)`
</script>

<template>
  <div class="ed-page">
    <EdBackStrip href="/knowledge-base/" text="All knowledge base articles" />

    <EdHero
      eyebrow="Learn · Understand · Build"
      title="Verifying the PII Signature — Rotated Keys and the Inactive JWKS"
      :meta="meta"
      lede="Verifying the TPP's signature on payment PII is <strong>optional</strong>. If you do it, this article is about the one thing that will break it: the signature lives as long as the consent, but the key that made it does not. A TPP may rotate its signing key at any time, and a rotated key leaves the active JWKS. Verify at the wrong moment against the wrong key set and you will reject a signature that is perfectly valid."
    >
      <template #lede>
        <div class="ed-tags">
          <span v-for="t in tags" :key="t" class="ed-tag">{{ t }}</span>
        </div>
      </template>
    </EdHero>

    <EdInPageNav :sections="sections" />

    <EdSectionBand
      id="problem"
      num="01"
      color="var(--at-teal)"
      eyebrow="The problem"
      title="One signature, two clocks"
      tone="cream"
    >
      <EdNote type="info" title="This article assumes you have chosen to verify">
        <p>
          The <code>PersonalIdentifiableInformation</code> field arrives inside a request that
          the API Hub has already verified was signed by the authenticated TPP, so verifying the
          inner JWS is <strong>not required</strong> &mdash; it is a defence-in-depth measure. See
          <a href="/tech/lfi-api-hub/v2.1/banking/service-initiation/personal-identifiable-information/api-guide/verify-tpp-signature">Verifying the TPP JWS Signature</a>
          for when an LFI might choose to. Nothing here makes it mandatory.
        </p>
      </EdNote>

      <EdProse>
        The PII on a payment consent is a JWE that encapsulates a JWS. The TPP builds the PII
        object, signs it with its signing key, encrypts it to your Enc1 public key, and submits it
        at PAR. <strong>That signature is made exactly once and never changes.</strong>
      </EdProse>

      <EdProse>
        The consent, however, can be long-lived. A multi-payment consent stays usable until its
        <code>ExpirationDateTime</code>, and each payment made under it carries the same PII &mdash;
        the same bytes, signed at the same original moment.
      </EdProse>

      <EdProse>
        Meanwhile the key that made the signature is on its own, entirely independent schedule:
      </EdProse>

      <EdBullets>
        <li>Every Trust Framework signing certificate expires after <strong>13 months</strong>.</li>
        <li>A TPP <strong>may rotate whenever it likes</strong> &mdash; after an incident, on internal policy, or as routine hygiene. It does not need a reason and it does not tell you.</li>
        <li>Rotation issues a <strong>new certificate with a new <code>kid</code></strong>. It does not re-sign anything.</li>
        <li>Once the old certificate is retired, its <code>kid</code> <strong>leaves the active JWKS</strong>.</li>
      </EdBullets>

      <EdProse>
        So the two clocks drift apart. The signature stays fixed at the moment of consent creation
        while the TPP's published key set moves on without it. A consent authorised in March and
        paid against in October may have been signed with a key that stopped being active in June.
      </EdProse>

      <EdProse>
        This is not a sandbox concern. Checked against the production keystore, ADCB already holds
        <strong>four active application keys and four retired ones</strong> &mdash; real rotations,
        on live organisations, while long-lived consents signed under the older keys remain in
        force.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="when"
      num="02"
      color="var(--at-gold)"
      eyebrow="Where you verify"
      title="The point of verification decides which keys you need"
      lede="The PII reaches your Ozone Connect implementation at more than one point in the consent lifecycle, and the age of the signature is different at each. This is the whole decision."
      tone="surface"
    >
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Where you verify</th><th>Age of the signature</th><th>Key set you need</th></tr>
          </thead>
          <tbody>
            <tr><td><code>POST /consent/action/validate</code></td><td><strong>Seconds</strong></td><td>Active JWKS only</td></tr>
            <tr><td><code>POST /consent/event/post</code></td><td>Seconds</td><td>Active JWKS only</td></tr>
            <tr><td>The consent authorisation journey</td><td><strong>Minutes to hours</strong></td><td>Active <strong>and inactive</strong></td></tr>
            <tr><td><code>POST /consent/event/patch</code></td><td>Minutes to hours</td><td>Active <strong>and inactive</strong></td></tr>
            <tr><td><code>POST /payments</code></td><td><strong>Up to the consent lifetime</strong></td><td>Active <strong>and inactive</strong></td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3>The one safe moment: consent validate</h3>
      <EdProse>
        <code>/consent/action/validate</code> is called by the API Hub <strong>before the consent
        is created</strong> &mdash; synchronously, inside the TPP's PAR request. The signature is at
        most seconds old. A key cannot have been rotated out between the TPP signing the PII and
        the Hub calling you about it.
      </EdProse>
      <EdProse>
        <strong>If you verify here, the active JWKS is sufficient.</strong> This is the conventional
        fresh-signature case, and the straightforward <code>createRemoteJWKSet</code> pattern works
        correctly. The same holds for the <code>post</code> consent event, which fires at the same
        moment in the lifecycle.
      </EdProse>

      <h3>Everywhere else is &ldquo;later&rdquo;</h3>
      <EdProse>
        <strong>The authorisation journey is already later.</strong> It is tempting to treat consent
        authorisation as still &ldquo;at creation&rdquo; &mdash; it is usually the same session,
        after all. It is not. Between the TPP creating the consent and the customer actually
        authenticating on your platform there can be a redirect the customer does not follow
        immediately, an app switch, a login they abandon and resume, a re-authentication, a device
        handover.
      </EdProse>
      <EdProse>
        <strong>Payment execution is much later.</strong> A single instant payment follows
        authorisation closely, but a multi-payment consent may execute against the same PII for as
        long as the consent lives. That is the case with no upper bound short of
        <code>ExpirationDateTime</code>.
      </EdProse>

      <EdNote type="warning" title="Do not assume the redirect was prompt">
        <p>
          The most common way to get this wrong is to reason &ldquo;the customer authorises seconds
          after the TPP creates the consent, so the key must still be active&rdquo;. Usually true;
          not reliably true. If you verify anywhere other than the creation-time hooks, you MUST be
          prepared for a key that is no longer active.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="jwks"
      num="03"
      color="var(--at-blue)"
      eyebrow="Active & inactive JWKS"
      title="Retired keys are published at a parallel path"
      lede="Retired keys are not lost. The Trust Framework keystore publishes them at a parallel <strong>inactive/</strong> path alongside the active set. Every identifier resolves to a <strong>pair</strong> of endpoints."
      tone="cream"
    >
      <h3>The URL format</h3>
      <EdCode :code="jwksProduction" lang="text" filename="Production" />
      <EdProse>Sandbox uses the same shape on its own host:</EdProse>
      <EdCode :code="jwksSandbox" lang="text" filename="Sandbox" />

      <EdProse>
        The <code>inactive/</code> segment sits <strong>between the identifier and the
        filename</strong> &mdash; not appended to the filename, and not prefixed to the path.
      </EdProse>

      <EdProse>
        For the PII signature, <code>{id}</code> is the <strong>TPP's software statement ID</strong>,
        which arrives on every relevant call in the <code>o3-caller-software-statement-id</code>
        header &mdash; including <code>/consent/action/validate</code> and
        <code>POST /payments</code>. You do not need to look it up.
      </EdProse>

      <EdProse>
        The same <code>inactive/</code> convention applies to <code>transport.jwks</code>, though
        that is not relevant to signature verification.
      </EdProse>

      <h3>What is in the inactive set</h3>
      <EdProse>
        The response is an ordinary JWKS &mdash; the same format as the active set, with retired
        keys instead of current ones. Sampling a production organisation:
      </EdProse>
      <EdRefTable>
        <table>
          <thead><tr><th>Endpoint</th><th>Keys</th></tr></thead>
          <tbody>
            <tr><td><code>application.jwks</code></td><td>4</td></tr>
            <tr><td><code>inactive/application.jwks</code></td><td>4</td></tr>
          </tbody>
        </table>
      </EdRefTable>
      <EdProse>
        Every certificate sampled from an <code>inactive/</code> set had a <code>notAfter</code> in
        the past, consistent with keys retired by expiry or rotation.
      </EdProse>

      <EdNote type="important" title="Membership of inactive/ does not tell you why a key was retired">
        <p>
          The set does not distinguish a certificate that expired normally, one superseded by a
          routine rotation, and one revoked for key compromise. If a revocation reason is material
          to your risk decision, obtain it from the certificate record in the Trust Framework
          &mdash; it cannot be inferred from which JWKS the key appeared in.
        </p>
      </EdNote>

      <h3>Pin the algorithm yourself</h3>
      <EdProse>
        Published JWKS entries carry <code>kty</code>, <code>use</code>, <code>kid</code> and
        <code>x5c</code> &mdash; and <strong>no <code>alg</code></strong>. Your verifier must
        therefore pin the algorithm itself: <strong>PS256</strong>, the only algorithm in the UAE
        Open Finance FAPI profile. Do not accept whatever the JWS header proposes.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="how"
      num="04"
      color="var(--at-blue-deep)"
      eyebrow="Verifying later"
      title="Resolve the kid across both sets"
      tone="surface"
    >
      <EdProse>
        If you verify anywhere other than the creation-time hooks, resolve the <code>kid</code>
        across both sets:
      </EdProse>

      <ol class="ed-steps">
        <li>Read the <code>kid</code> from the JWS header of the decrypted PII.</li>
        <li>Look it up in the TPP's <strong>active</strong> JWKS.</li>
        <li>If it is not there, look it up in the TPP's <strong>inactive</strong> JWKS.</li>
        <li>Verify the signature against whichever key matched, pinning <code>PS256</code>.</li>
      </ol>

      <EdProse>
        A <code>kid</code> found in the inactive set is the <strong>expected</strong> outcome for an
        older consent. It means the TPP rotated its signing key at some point after creating the
        consent, which is routine and entirely permitted. It is a key-lifecycle event, not a
        signature defect, and on its own it says nothing adverse about the signature or the TPP.
      </EdProse>

      <EdNote type="tip" title="Order the lookup active-first">
        <p>
          Most consents you verify will be recent, so the active set will almost always hit. Treat
          the inactive lookup as the fallback, and cache both sets as you would any JWKS rather
          than fetching per request.
        </p>
      </EdNote>

      <EdProse>
        The straightforward pattern shown in the
        <a href="/tech/lfi-api-hub/v2.1/banking/service-initiation/personal-identifiable-information/api-guide/verify-tpp-signature">API guide</a>
        resolves the active JWKS only:
      </EdProse>
      <EdCode :code="activeOnlySnippet" lang="typescript" filename="Active keys only" />

      <EdProse>
        That is correct at <code>/consent/action/validate</code>. Used at payment execution it will
        work for months and then begin failing on long-lived consents &mdash; with no change at
        either end, and in a way that presents as a signature error when the signature is fine.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="timing"
      num="05"
      color="var(--at-navy)"
      eyebrow="Timing claims"
      title="The same default catches exp and nbf"
      lede="Key resolution is the subject of this article, but the same libraries carry a second default that fails for the same underlying reason, and it is worth knowing about while you are here."
      tone="cream"
    >
      <EdProse>
        <code>jwtVerify</code> and its equivalents enforce <code>exp</code> and <code>nbf</code>
        <strong>against the current time</strong> by default. On the PII JWS those claims bound the
        <strong>PAR submission window</strong> &mdash; the moment the TPP created the consent &mdash;
        not the moment you happen to be verifying. At payment execution on a long-lived consent
        they will normally have lapsed.
      </EdProse>

      <EdProse>
        If you verify the PII signature at a later point, evaluate its timing claims against the
        consent's <code>CreationDateTime</code> rather than against now, or do not evaluate them at
        all. Whether the consent is still usable <strong>today</strong> is answered by the API Hub's
        consent validation on every request, not by a claim inside the PII.
      </EdProse>
    </EdSectionBand>

    <EdRelatedCards eyebrow="Related articles" title="Read alongside">
      <EdRelatedCard
        href="/knowledge-base/articles/pii-encryption"
        category="Security"
        category-color="var(--at-blue)"
        title="Payment PII Encryption"
        desc="Why PII is encrypted end to end, and what the API Hub can and cannot see."
      />
      <EdRelatedCard
        href="/knowledge-base/articles/certificate-rotation"
        category="Security"
        category-color="var(--at-blue)"
        title="Certificate Rotation"
        desc="The 13-month lifetime and the overlap-and-cutover discipline that produces retired keys."
      />
      <EdRelatedCard
        href="/knowledge-base/articles/jwt-claims"
        category="Security"
        category-color="var(--at-blue)"
        title="JWT Claim Rules"
        desc="Per-claim reference for the request object and client assertion."
      />
    </EdRelatedCards>
  </div>
</template>

<style scoped>
.ed-page { background: var(--at-bg-cream); color: var(--at-navy-deep); font-family: var(--at-sans); padding-top: 4.25rem; }
.ed-tags { display: flex; flex-wrap: wrap; gap: 0.45rem; margin-top: 1.5rem; }
.ed-tag { padding: 0.35rem 0.7rem; background: color-mix(in srgb, var(--at-blue) 12%, transparent); color: var(--at-blue-deep); font-family: var(--at-mono); font-size: 0.62rem; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 700; }

.ed-steps {
  font-family: var(--at-sans);
  font-size: 1rem;
  line-height: 1.7;
  color: var(--at-mute-2);
  margin: 1rem 0 0.5rem 1.25rem;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.ed-steps > li { padding-left: 0.35rem; }
.ed-steps :deep(strong), .ed-steps strong { color: var(--at-navy-deep); font-weight: 600; }
.ed-steps :deep(code), .ed-steps code {
  font-family: var(--at-mono);
  font-size: 0.86em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  padding: 0.08em 0.4em;
}
.ed-steps :deep(a), .ed-steps a { color: var(--at-teal-deep); text-decoration: none; border-bottom: 1px solid currentColor; }
</style>
