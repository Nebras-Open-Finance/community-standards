<template>
  <footer class="homepage-footer">
    <div class="footer-inner">

      <img src="/images/altareq.svg" alt="AlTareq" class="footer-logo" />


      <p class="footer-copy">
        This site is open source. Help improve the data, documentation links, community guides, or the  itself.
        Every contribution strengthens the ecosystem.
      </p>


      <a
        href="https://github.com/Nebras-Open-Finance/community-standards"
        target="_blank"
        rel="noopener noreferrer"
        class="footer-github"
        aria-label="View on GitHub"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
        View on GitHub
      </a>

    </div>
  </footer>
</template>

<script setup>
</script>

<style scoped>
.homepage-footer {
  width: 100%;
  border-top: 1px solid rgba(0, 39, 127, 0.1);
  background: rgba(255, 255, 255, 0.97);
  padding: 1rem 1.5rem;
}

.footer-inner {
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.footer-logo {
  width: 5rem;
  opacity: 0.7;
  flex-shrink: 0;
}

.divider {
  background: rgba(122, 210, 248, 0.1);
  background: linear-gradient(0deg, rgba(0, 39, 127, 1) 0%, rgba(0, 139, 228, 1) 50%, rgba(0, 129, 113, 0.55) 100%);
  width: 3px;
  margin-top: 10px;
  margin-bottom: 10px;
  min-height: 80%;
  margin-left: 50px;
  margin-right: 50px;
  align-self: stretch;
}

.footer-copy {
  flex: 1;
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.55;
  margin: auto;
  color: rgba(0, 39, 127, 0.5);
  text-align: center;
}

.footer-github {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  flex-shrink: 0;
  font-size: 0.8rem;
  font-weight: 500;
  color: rgba(0, 39, 127, 0.65);
  text-decoration: none;
  padding: 0.4rem 0.8rem;
  border: 1px solid rgba(0, 39, 127, 0.15);
  border-radius: 6px;
  transition: color 0.15s ease, border-color 0.15s ease, background 0.15s ease;
}

.footer-github:hover {
  color: rgba(0, 39, 127, 1);
  border-color: rgba(0, 39, 127, 0.35);
  background: rgba(0, 39, 127, 0.04);
}
</style>
