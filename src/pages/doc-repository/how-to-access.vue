<route lang="yaml">
meta:
  title: Accessing the Document Repository
  purpose: How to browse the Document Repository, sign in via the production Trust Framework directory, and who can see an organisation's protected and private documents.
  updated: "2026-06-22"
</route>

<script setup lang="ts">
import type { EdMetaItem } from '@/components/editorial/EdMeta.vue'
import type { EdInPageNavSection } from '@/components/editorial/EdInPageNav.vue'

const meta: EdMetaItem[] = [
  { label: 'Applies to', value: 'LFIs · TPPs · Participants' },
  { label: 'Read', value: '4 min' },
  { label: 'Updated', value: '22 Jun 2026' },
]

const sections: EdInPageNavSection[] = [
  { id: 'browsing', label: 'Browsing' },
  { id: 'signing-in', label: 'Signing in' },
  { id: 'protected-access', label: 'Protected access' },
  { id: 'private-access', label: 'Private access' },
  { id: 'endpoints', label: 'Endpoints' },
]
</script>

<template>
  <div class="ed-page">
    <EdBackStrip href="/doc-repository/" text="Document Repository" />

    <EdHero
      eyebrow="Document Repository · Access Guide"
      title="Accessing the Document Repository"
      :meta="meta"
      lede="Explains how to <strong>browse the Document Repository</strong>, how to <strong>sign in</strong> against the production Trust Framework directory, and <strong>who may view</strong> an organisation's protected and private documents."
    />

    <EdInPageNav :sections="sections" />

    <EdSectionBand
      id="browsing"
      num="01"
      color="var(--at-teal)"
      eyebrow="Browsing"
      title="Finding an organisation's documents"
      lede="The Document Repository lists every production participant in UAE Open Finance &mdash; Licensed Financial Institutions and Third-Party Providers."
      tone="cream"
    >
      <EdProse>
        The <a href="/doc-repository/">directory</a> itself is open: you can
        search and filter participants without signing in. Selecting an
        organisation opens its documents page, at which point you are asked to
        sign in. Once signed in, an organisation's documents appear in up to
        three groups:
      </EdProse>
      <EdBullets>
        <li>
          <strong>Public documents</strong> &mdash; visible to any signed-in
          participant; for example trade licences and Central Bank licences.
        </li>
        <li>
          <strong>Protected documents</strong> &mdash; visible to the owning
          organisation and to any other organisation it has chosen to share with.
          The protected tab is hidden if neither applies to you.
        </li>
        <li>
          <strong>Private documents</strong> &mdash; visible only to people
          authorised within that organisation. The private tab is hidden if you
          do not have access.
        </li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="signing-in"
      num="02"
      color="var(--at-gold)"
      eyebrow="Signing in"
      title="Authenticating with the Trust Framework directory"
      lede="The repository authenticates you against the <strong><a href=&quot;https://web.directory.openfinance.ae/&quot; target=&quot;_blank&quot; rel=&quot;noopener&quot;>production UAE Open Finance Trust Framework directory</a></strong> using OpenID Connect."
      tone="surface"
    >
      <EdProse>
        When you open an organisation's documents page you are redirected to the
        directory to sign in with your directory account, then returned to the
        page. You need only an account in the production Trust Framework
        directory &mdash; there is no separate repository login.
      </EdProse>
      <EdProse>
        A signed-in session lasts approximately one hour, after which you are
        asked to sign in again.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="protected-access"
      num="03"
      color="var(--at-blue-deep)"
      eyebrow="Protected access"
      title="Who may view protected documents"
      lede="Protected documents sit between public and private: the owning organisation controls which other organisations may read them."
      tone="surface"
    >
      <h3>Who can read them</h3>
      <EdBullets>
        <li>
          The owning organisation's <strong>administrators and Active PBCs</strong>
          &mdash; the same people who can see its private documents.
        </li>
        <li>
          <strong>Any member</strong> of an organisation the owner has shared with.
          Unlike private access, this is not limited to privileged roles &mdash; once
          an organisation is granted, all of its members can read the documents.
        </li>
        <li>
          <strong>Nebras operators</strong>, who may view every organisation's documents.
        </li>
      </EdBullets>
      <h3>Managing shares</h3>
      <EdProse>
        A privileged member of the owning organisation (administrator or Active PBC),
        or a Nebras operator, manages the share list from the Protected tab &mdash;
        adding or removing organisations at any time. Sharing is granted per whole
        organisation and covers all of the owner's protected documents. Organisations
        that have only been granted access cannot themselves change who else can see
        the documents, and only Nebras may upload them.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="private-access"
      num="04"
      color="var(--at-blue)"
      eyebrow="Private access"
      title="Who may view private documents"
      lede="An organisation's private documents are visible only to people who hold a privileged role for that organisation in the Trust Framework directory."
      tone="cream"
    >
      <h3>Qualifying roles</h3>
      <EdBullets>
        <li>
          <strong>Organisation administrators</strong> of that organisation.
        </li>
        <li>
          Holders of the <strong>Principal Business Contact (PBC)</strong>
          contact role, where the role is <em>Active</em>.
        </li>
      </EdBullets>
      <EdProse>
        Access is assessed per organisation: a PBC or organisation administrator
        role in one organisation only grants access to that organisation's
        private documents, not those of any other organisation. Nebras operators
        may view every organisation's documents.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="endpoints"
      num="05"
      color="var(--at-navy)"
      eyebrow="Endpoints"
      title="What the document endpoints provide"
      lede="The repository pages are powered by a small API at <code>docs.nebras-open-finance.com</code>. It may be called directly &mdash; for example to script downloads."
      tone="surface"
    >
      <h3>Organisation list</h3>
      <EdProse>
        A request to <code>https://docs.nebras-open-finance.com/</code> returns
        the list of all production organisations as JSON, each with its
        identifier and links to its public and private documents. This is the
        same list the directory page shows, and it requires no sign-in.
      </EdProse>

      <h3>Public documents</h3>
      <EdProse>
        <code>https://docs.nebras-open-finance.com/{id}/public</code> lists the
        public documents for a single organisation, where <code>{id}</code> is
        that organisation's identifier from the root list. Appending a file name
        to the path returns the file itself. Public documents are open.
      </EdProse>

      <h3>Protected documents</h3>
      <EdProse>
        <code>https://docs.nebras-open-finance.com/{id}/protected</code> lists
        &mdash; and serves &mdash; that organisation's protected documents. This
        endpoint is gated: you must be signed in and either authorised for the
        organisation (an administrator or PBC), a member of an organisation it has
        shared with, or a Nebras operator. The owner's share list is managed at
        <code>https://docs.nebras-open-finance.com/{id}/grants</code>.
      </EdProse>

      <h3>Private documents</h3>
      <EdProse>
        <code>https://docs.nebras-open-finance.com/{id}/private</code> lists
        &mdash; and serves &mdash; that organisation's private documents. This
        endpoint is gated: you must be signed in and authorised for the
        organisation (an administrator or PBC, as above), or a Nebras operator.
        Without access it returns an authentication or permission error rather
        than the documents.
      </EdProse>
    </EdSectionBand>

    <EdRelatedCards eyebrow="Read alongside" title="Related">
      <EdRelatedCard
        href="/doc-repository/"
        category="Directory"
        category-color="var(--at-teal)"
        title="Document Repository"
        desc="Browse and search every production LFI and TPP, and open their published documents."
      />
      <EdRelatedCard
        href="/policy/secure-management"
        category="Nebras"
        title="Secure Management of Keys and Credentials"
        desc="The authentication and access-control standards underpinning the directory and repository."
      />
    </EdRelatedCards>
  </div>
</template>

<style scoped>
.ed-page {
  background: var(--at-bg-cream);
  color: var(--at-navy-deep);
  font-family: var(--at-sans);
  padding-top: 4.25rem;
}
</style>
