<route lang="yaml">
meta:
  title: "Certificate Rotation — A Best-Practice Guide for LFIs and TPPs"
  description: "How to rotate your Trust Framework certificates before they expire. You rotate only the certificates whose private key you hold; Nebras rotates the rest. All certificates expire after 13 months except the server encryption key, and the Trust Framework emails expiry reminders starting two months out."
  category: Security
  readTime: "7 min"
  updated: "2026-06-03"
  tags:
    - Certificates
    - Trust Framework
    - mTLS
</route>

<script setup lang="ts">
interface Section { id: string; label: string }
interface MetaItem { label: string; value: string }

const sections: Section[] = [
  { id: 'principle', label: 'Rotate only your own keys' },
  { id: 'expiry',    label: 'Expiry & reminders' },
  { id: 'how',       label: 'How rotation works' },
  { id: 'transport', label: 'Transport certificates' },
  { id: 'signing',   label: 'Signing certificates' },
  { id: 'checklist', label: 'Checklist' },
]

const meta: MetaItem[] = [
  { label: 'Category', value: 'Security' },
  { label: 'Read',     value: '7 min' },
  { label: 'Updated',  value: '3 Jun 2026' },
]

const tags: readonly string[] = ['Certificates', 'Trust Framework', 'mTLS']

const opensslCommand = `openssl req -new -newkey rsa:2048 -nodes \\
  -keyout <UUID>.key \\
  -out <UUID>.csr \\
  -subj "/C=AE/O=<LegalName>/OU=<OrganizationId>/CN=<UUID>" \\
  -sha256`
</script>

<template>
  <div class="ed-page">
    <EdBackStrip href="/knowledge-base/" text="All knowledge base articles" />

    <EdHero
      eyebrow="Learn · Understand · Build"
      title="Certificate Rotation — A Best-Practice Guide for LFIs and TPPs"
      :meta="meta"
      lede="Every certificate in the Trust Framework has a finite life. Rotating it &mdash; replacing it with a fresh certificate before the old one expires &mdash; is a routine operational task, but one that <strong>breaks live services if it is missed</strong>. This guide explains which certificates are yours to rotate, when to act, and the safe overlap pattern that keeps traffic flowing through the cutover."
    >
      <template #lede>
        <div class="ed-tags">
          <span v-for="t in tags" :key="t" class="ed-tag">{{ t }}</span>
        </div>
      </template>
    </EdHero>

    <EdInPageNav :sections="sections" />

    <EdNote type="warning" title="Rotate before expiry — not after">
      <p>
        A certificate that reaches its expiry date stops being trusted. An expired <strong>transport</strong>
        certificate fails the mTLS handshake; an expired <strong>signing</strong> certificate makes every
        JWT you sign unverifiable. In both cases the affected service stops working until a valid
        certificate is in place. Always complete rotation <strong>before</strong> the expiry date.
      </p>
    </EdNote>

    <EdSectionBand
      id="principle"
      num="01"
      color="var(--at-teal)"
      eyebrow="The golden rule"
      title="You rotate only the certificates whose private key you hold"
      tone="cream"
    >
      <EdProse>
        Not every certificate that appears under your organisation is yours to manage. The rule is simple:
      </EdProse>

      <EdBullets>
        <li>
          <strong>You hold the private key</strong> &rarr; the certificate is <strong>yours to rotate</strong>.
          You generated the key and CSR yourself, so only you can produce a replacement.
        </li>
        <li>
          <strong>Nebras holds the private key</strong> &rarr; <strong>Nebras rotates it</strong>. Any
          certificate where Ozone supplied the CSR, or where the key material lives on the API Hub, is
          rotated by Nebras with no action required from you. From your perspective these certificates
          appear under your organisation but require no operational involvement.
        </li>
      </EdBullets>

      <EdProse>
        The canonical illustration is the server transport pair described in the
        <a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/certificate-walkthroughs">Certificate Walkthroughs</a>:
        <strong>S1</strong> (Ozone holds the private key &mdash; Nebras rotates it) versus
        <strong>S4</strong> (the LFI holds the private key &mdash; the LFI rotates it). The same split
        applies to every certificate on your organisation.
      </EdProse>

      <EdNote type="tip" title="Record the private-key holder in the certificate description">
        <p>
          Because who-holds-the-key decides who rotates, make it impossible to get wrong: state the holder
          in the certificate's <strong>description</strong> field when you create it. The walkthroughs
          already follow this convention &mdash; e.g.
          <code>S1 - Ozone holds Private Key - TPP-APIHub</code> and
          <code>S4 - I hold Private Key - APIHub-OzoneConnect</code>. A glance at the description then tells
          any operator whether a given certificate is theirs to renew or Nebras's.
        </p>
      </EdNote>

      <EdProse>
        <strong>TPPs</strong> hold the private key for all of their application certificates &mdash;
        transport, signing, and (where used) encryption &mdash; so a TPP rotates all of them itself.
        <strong>LFIs</strong> rotate the certificates they generated (such as S4 and their client
        transport and signing certificates) and leave the Ozone-held certificates to Nebras.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="expiry"
      num="02"
      color="var(--at-gold)"
      eyebrow="Lifetimes and reminders"
      title="13 months, with email reminders from two months out"
      tone="surface"
    >
      <EdProse>
        With one exception, every certificate in the Trust Framework expires <strong>13 months</strong>
        after it is issued:
      </EdProse>

      <EdBullets>
        <li>
          <strong>Transport, signing, and application encryption certificates</strong> &mdash; valid for
          <strong>13 months</strong>, then must be rotated.
        </li>
        <li>
          <strong>The server encryption key (SERVER ENCKEY)</strong> &mdash; <strong>does not expire</strong>,
          and therefore does not require periodic rotation.
        </li>
      </EdBullets>

      <EdNote type="info" title="The Trust Framework reminds you before expiry">
        <p>
          You do not have to track expiry dates by hand. The Trust Framework (directory) sends
          <strong>email notifications</strong> about upcoming certificate expiry, issued regularly and
          starting <strong>two months before</strong> the expiry date. Treat the first reminder as your
          cue to plan the rotation &mdash; it leaves ample time to generate, deploy, and validate the
          replacement before the deadline.
        </p>
      </EdNote>

      <EdProse>
        Make sure the email recipients on your organisation are correct and monitored, so these reminders
        reach the team that owns rotation. See
        <a href="/tech/lfi-api-hub/trust-framework/contacts">Contacts</a> for managing notification
        recipients.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="how"
      num="03"
      color="var(--at-blue)"
      eyebrow="The mechanism"
      title="Overlap, cut over, then retire"
      tone="cream"
    >
      <EdProse>
        Rotation is not a single in-place swap &mdash; it is a controlled overlap. A new certificate is
        issued and published <em>alongside</em> the old one, so both are trusted at the same time. You then
        move your service onto the new key, confirm it works, and only afterwards retire the old
        certificate. Nothing breaks because there is never a moment when no valid certificate exists.
      </EdProse>

      <ol class="ed-steps">
        <li>
          <strong>Generate a new key and CSR.</strong> Produce a fresh 2048-bit RSA private key and a
          SHA-256 CSR with the same subject fields as the certificate you are replacing. In production this
          MUST happen inside your HSM or equivalent secure key management infrastructure.
          <EdCode :code="opensslCommand" lang="bash" filename="openssl (demonstration only)" />
        </li>
        <li>
          <strong>Upload the CSR and issue the new certificate.</strong> Upload it in the Trust Framework
          exactly as you did when the certificate was first created. The new certificate receives its own
          <strong>Key ID (<code>kid</code>)</strong>, and the Trust Framework publishes it to your
          organisation's JWKS automatically.
        </li>
        <li>
          <strong>Both keys are now live.</strong> During the overlap, the old and new <code>kid</code>s
          are both resolvable from your JWKS. Any party that verifies your certificates against the JWKS
          will accept either one, which is what makes a zero-downtime cutover possible.
        </li>
        <li>
          <strong>Cut over to the new key.</strong> Switch your service to present (transport) or sign with
          (signing) the new certificate. See the type-specific guidance below.
        </li>
        <li>
          <strong>Verify, then retire the old certificate.</strong> Confirm the new key is in use and
          working, then revoke or remove the old certificate per your key-destruction policy. See
          <a href="/policy/secure-management">Secure Management</a>.
        </li>
      </ol>

      <EdNote type="tip" title="Rotation reuses the creation steps you already know">
        <p>
          Steps 1&ndash;2 are identical to first-time certificate creation. If you have generated a
          certificate before &mdash; see
          <a href="/tech/lfi-api-hub/trust-framework/certificates/">Keys &amp; Certificates (LFI)</a> or
          <a href="/tech/tpp-standards/trust-framework/certificates/">Keys &amp; Certificates (TPP)</a>
          &mdash; you already know the mechanics. Rotation adds only the overlap-and-cutover discipline
          around them.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="transport"
      num="04"
      color="var(--at-blue-deep)"
      eyebrow="Transport certificates"
      title="Rotating the certificate used for mTLS"
      tone="surface"
    >
      <EdProse>
        A transport certificate authenticates your client during the mTLS handshake. To rotate it:
      </EdProse>

      <EdBullets>
        <li>Issue the new transport certificate (overlap steps 1&ndash;2 above).</li>
        <li>
          Deploy the new certificate and its private key to the infrastructure that terminates mTLS &mdash;
          for an LFI-held server transport certificate (S4), that is your Ozone Connect server; for a TPP,
          that is wherever your client establishes outbound mTLS connections.
        </li>
        <li>
          Re-run connectivity validation. After transport certificates are rotated, the Hub re-verifies
          connectivity using the <a href="/tech/lfi-api-hub/v2.1/health-check/">Health Check</a> endpoints
          (<code>/hello-mtls</code>, <code>/echo-cert</code>). Confirm these pass on the new certificate
          before retiring the old one.
        </li>
        <li>Remove the old certificate from your infrastructure once the new one is confirmed working.</li>
      </EdBullets>

      <EdNote type="info" title="The OU pin survives rotation">
        <p>
          Where the Hub authenticates your transport certificate by pinning the <strong>OU</strong> (your
          Organisation ID) rather than a specific certificate, a rotation that keeps the same subject
          fields needs <strong>no configuration change</strong> on the verifying side &mdash; the new
          certificate matches the same pin. This is why keeping the CSR subject identical to the previous
          certificate matters.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="signing"
      num="05"
      color="var(--at-navy)"
      eyebrow="Signing certificates"
      title="Rotating the certificate used to sign JWTs"
      tone="cream"
    >
      <EdProse>
        A signing certificate proves the integrity and authenticity of the JWTs you send &mdash; client
        assertions, request objects, and similar. The key detail when rotating is the <code>kid</code>:
      </EdProse>

      <EdBullets>
        <li>Issue the new signing certificate (overlap steps 1&ndash;2 above) and note its new <code>kid</code>.</li>
        <li>
          During the overlap, both the old and new <code>kid</code> are published to your signing JWKS, so
          JWTs signed with either key continue to verify.
        </li>
        <li>
          Cut over by signing new JWTs with the new private key and setting the <code>kid</code> header to
          the new certificate's Key ID. The verifying party resolves that <code>kid</code> from your JWKS
          and validates the signature. See
          <a href="/tech/tpp-standards/security/fapi/message-signing">Message Signing</a> for how the
          <code>kid</code> is used in the JWT header.
        </li>
        <li>
          Once you have fully switched to signing with the new key, retire the old signing certificate.
        </li>
      </EdBullets>

      <EdNote type="tip" title="Always sign with the kid that is actually in use">
        <p>
          The most common rotation mistake is updating the certificate but continuing to send the old
          <code>kid</code> in the JWT header, or vice versa. The <code>kid</code> you put in the header
          MUST correspond to the private key that produced the signature. Verify the two match after every
          rotation.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="checklist"
      num="06"
      color="var(--at-teal-deep)"
      eyebrow="Checklist"
      title="Before you mark a rotation complete"
      tone="surface"
      narrow
    >
      <EdBullets>
        <li>The certificate being rotated is one whose private key you hold (otherwise Nebras rotates it).</li>
        <li>The new certificate was issued <strong>before</strong> the old one's expiry date.</li>
        <li>The new key and CSR were generated inside your HSM / secure key management for production.</li>
        <li>The new <code>kid</code> is published to your JWKS and resolvable.</li>
        <li><strong>Transport:</strong> Health Check connectivity validation passes on the new certificate.</li>
        <li><strong>Signing:</strong> new JWTs are signed with the new key and carry the matching <code>kid</code>.</li>
        <li>The old certificate is retired and the old private key destroyed per your key-management policy.</li>
        <li>The certificate description records who holds the private key.</li>
      </EdBullets>
    </EdSectionBand>

    <EdRelatedCards eyebrow="Further reading" title="Related references">
      <EdRelatedCard
        href="/tech/lfi-api-hub/trust-framework/certificates/"
        category="LFI · Trust Framework"
        category-color="var(--at-teal)"
        title="Keys & Certificates (LFI)"
        desc="Certificate types, key requirements, and the creation walkthrough for LFIs."
      />
      <EdRelatedCard
        href="/tech/tpp-standards/trust-framework/certificates/"
        category="TPP · Trust Framework"
        category-color="var(--at-blue)"
        title="Keys & Certificates (TPP)"
        desc="Certificate types, key requirements, and the creation walkthrough for TPPs."
      />
      <EdRelatedCard
        href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/certificate-walkthroughs"
        category="LFI · Onboarding"
        category-color="var(--at-gold)"
        title="Certificate Walkthroughs"
        desc="S1 vs S4 — the canonical Ozone-held versus LFI-held private-key example."
      />
      <EdRelatedCard
        href="/policy/secure-management"
        category="Policy"
        category-color="var(--at-navy)"
        title="Secure Management"
        desc="Key lifecycle, rotation cadence, HSM requirements, and key destruction."
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
