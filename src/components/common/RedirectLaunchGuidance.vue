<script setup lang="ts">
import { computed } from 'vue'

/**
 * Shared guidance for how a native mobile app should OPEN an outbound
 * authorization redirect URL. Used by both:
 *   - TPP · opening the authorization_endpoint after /par (app → LFI)
 *   - LFI · opening the return URL from doConfirm / doFail (app → TPP)
 *
 * The two contexts differ only in which app the URL may hand off to and the
 * wording of the trigger; the launch recommendation itself is identical.
 */
const props = withDefaults(defineProps<{
  /** Which side of the flow is reading this page. */
  audience: 'TPP' | 'LFI'
  /** The app the outbound URL may deep-link into, if installed. */
  targetApp: string
  /** Human name for the redirect being opened. */
  redirectName: string
  /** First EdSectionBand number to use — the host page owns 01. */
  startNum?: number
}>(), {
  startNum: 2,
})

const pad = (n: number): string => String(n).padStart(2, '0')
const n = (offset: number): string => pad(props.startNum + offset)

const flutterCode = computed(() => `import 'package:url_launcher/url_launcher.dart';

/// Opens an outbound Open Finance redirect URL from within the app.
Future<void> openRedirect(Uri redirectUri) async {
  try {
    // 1. Prefer an external user-agent. Where ${props.targetApp} is installed
    //    and the URL is a verified Universal Link / App Link, the OS opens
    //    that app directly (app-to-app). Otherwise it opens the system browser.
    final launched = await launchUrl(
      redirectUri,
      mode: LaunchMode.externalApplication,
    );
    if (!launched) {
      throw Exception('externalApplication launch returned false');
    }
  } catch (_) {
    // 2. Fall back to the platform default. For https URLs this resolves to an
    //    in-app browser tab (Chrome Custom Tabs / SFSafariViewController) —
    //    still a compliant external user-agent.
    //    NEVER fall back to LaunchMode.inAppWebView (an embedded WebView).
    await launchUrl(
      redirectUri,
      mode: LaunchMode.platformDefault,
    );
  }
}`)
</script>

<template>
  <!-- Recommendation -->
  <EdSectionBand
    :id="'launch-from-app'"
    :num="n(0)"
    color="var(--at-teal)"
    eyebrow="Opening from within a mobile app"
    title="Prefer an external user-agent, then fall back"
    tone="cream"
  >
    <EdProse>
      When your customer is inside your native app and you need to open the {{ redirectName }},
      you MUST open it in an <strong>external user-agent</strong> &mdash; never an embedded WebView.
      Two launch modes satisfy this, and you SHOULD try them in order:
    </EdProse>

    <ol class="rlg__ol">
      <li>
        <strong>External application mode (preferred).</strong>
        Hand the URL to the operating system. Where {{ targetApp }} is installed and the URL is a
        verified Universal Link (iOS) or App Link (Android), the OS opens that app directly &mdash;
        this is <strong>app-to-app</strong> redirection. If the app is not installed, the OS opens the
        device's <strong>system browser</strong>. Both are compliant external user-agents.
      </li>
      <li>
        <strong>Platform default mode (fallback).</strong>
        If the external-application launch throws or returns <code>false</code>, catch the error and
        retry in platform-default mode. For <code>https</code> URLs this resolves to an
        <strong>in-app browser tab</strong> &mdash; Chrome Custom Tabs on Android,
        <code>SFSafariViewController</code> on iOS &mdash; which is still an acceptable external
        user-agent.
      </li>
    </ol>

    <EdNote type="info" title="Why this order">
      <p>
        External-application mode is tried first because it is the only mode that can hand the customer
        straight into {{ targetApp }} (app-to-app), giving the smoothest, most trusted experience. The
        in-app browser tab reached by platform-default mode renders the URL in a tab rather than handing
        off to the app, so app-to-app generally will not trigger &mdash; which is why it is the fallback,
        not the default.
      </p>
    </EdNote>
  </EdSectionBand>

  <!-- Implementation -->
  <EdSectionBand
    :id="'launch-implementation'"
    :num="n(1)"
    color="var(--at-gold)"
    eyebrow="Implementation"
    title="Try external-application, catch the error, fall back"
    tone="surface"
  >
    <EdProse>
      The pattern is the same across native stacks: attempt to launch in external-application mode, and
      on failure fall back to the platform default. The example below uses Flutter's
      <code>url_launcher</code>; the same shape applies to native iOS, native Android, and React Native.
    </EdProse>

    <EdCode :code="flutterCode" lang="dart" filename="Flutter · url_launcher" />

    <EdRefTable>
      <table>
        <thead>
          <tr>
            <th>Platform</th>
            <th>External application (try first)</th>
            <th>Platform default / in-app tab (fallback)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>iOS</strong></td>
            <td><code>UIApplication.open(_:)</code></td>
            <td><code>SFSafariViewController</code></td>
          </tr>
          <tr>
            <td><strong>Android</strong></td>
            <td><code>Intent.ACTION_VIEW</code> to the system default</td>
            <td>Chrome Custom Tabs</td>
          </tr>
          <tr>
            <td><strong>Flutter</strong></td>
            <td><code>LaunchMode.externalApplication</code></td>
            <td><code>LaunchMode.platformDefault</code></td>
          </tr>
        </tbody>
      </table>
    </EdRefTable>
  </EdSectionBand>

  <!-- Prohibition -->
  <EdSectionBand
    :id="'no-embedded-webview'"
    :num="n(2)"
    color="var(--at-blue-deep, #1d4ed8)"
    eyebrow="Prohibited"
    title="Never use an embedded WebView"
    tone="cream"
  >
    <EdProse>
      The redirect MUST NOT be opened in an <strong>embedded WebView</strong> (for example
      <code>WKWebView</code>, Android <code>WebView</code>, or
      <code>LaunchMode.inAppWebView</code>). This is a hard requirement of
      <a href="https://www.rfc-editor.org/rfc/rfc8252.html" target="_blank" rel="noopener">RFC 8252
      (OAuth 2.0 for Native Apps)</a>, which the FAPI security profile and UAE Open Finance are built on.
    </EdProse>

    <EdNote type="danger" title="Embedded WebViews are forbidden for authorization">
      <p>
        A host app can read everything inside its own embedded WebView &mdash; entered credentials,
        cookies, and session tokens. Embedded WebViews also break verified deep linking, so app-to-app
        redirection cannot occur and the customer is forced to re-authenticate from scratch. If a launch
        fails, fall back to the <strong>in-app browser tab</strong> (platform-default mode) &mdash; never
        to an embedded WebView.
      </p>
    </EdNote>
  </EdSectionBand>

  <!-- Web & desktop — audience-specific, supplied by the host page.
       The scoped `num` keeps section numbering continuous with the sections above. -->
  <slot name="web-desktop" :num="n(3)" />
</template>

<style scoped>
.rlg__ol {
  font-family: var(--at-sans);
  font-size: 1rem;
  line-height: 1.7;
  margin: 0.85rem 0 0 1.4rem;
  padding: 0;
  max-width: 56rem;
  color: var(--at-mute-2);
}
.rlg__ol li { margin: 0.55rem 0; }
.rlg__ol :deep(strong) { color: var(--at-navy-deep); font-weight: 600; }
.rlg__ol code {
  font-family: var(--at-mono);
  font-size: 0.86em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  padding: 0.08em 0.4em;
}
</style>
