<script setup lang="ts">
// Two-panel layout used in the consent + authorisation guides:
//   - Left panel (TPP slot)  — the consent page hosted by the API Hub
//   - Right panel (LFI slot) — the authorisation page hosted by the LFI
// On wide viewports a teal connector node sits between them, with dashed
// rails extending left (purple = TPP-side) and right (teal = LFI-side) to
// signal the cross-party authentication hop.
</script>

<template>
  <div class="cal">
    <div class="cal__layout">
      <div class="cal__panel">
        <div class="cal__label cal__label--tpp">
          <span class="cal__label-eyebrow">TPP</span>
          <span class="cal__label-title">Consent page</span>
        </div>
        <div class="cal__slot">
          <slot name="consent" />
        </div>
      </div>

      <div class="cal__panel">
        <div class="cal__label cal__label--lfi">
          <span class="cal__label-eyebrow">LFI</span>
          <span class="cal__label-title">Authorisation page</span>
        </div>
        <div class="cal__slot">
          <slot name="auth" />
        </div>
      </div>
    </div>

    <!-- Arrowhead capping the right (LFI / teal-deep) end of the rail. -->
    <svg class="cal__arrow" viewBox="0 0 16 14" aria-hidden="true">
      <polygon points="0,0 16,7 0,14" style="fill: var(--at-teal-deep);" />
    </svg>

    <div class="cal__hop" aria-hidden="true">
      <div class="cal__hop-node">
        <svg width="32" height="32" viewBox="0 0 70 70" fill="none">
          <g transform="translate(12.5, 9.5)">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M19.5372 34.52C18.4771 33.7108 17.7917 32.4244 17.7917 30.9758C17.7917 28.5269 19.7504 26.5417 22.1667 26.5417C24.5829 26.5417 26.5417 28.5269 26.5417 30.9758C26.5417 32.4244 25.8563 33.7108 24.7962 34.52L26.5417 41.1245H17.7917L19.5372 34.52Z" fill="currentColor" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M0 17.5H44.3333V50.1667H0V17.5ZM3.5 21V46.6667H40.8333V21H3.5Z" fill="currentColor" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.75 13.4167C8.75 6.00685 14.7568 0 22.1667 0C29.5823 0 35.5833 6.04242 35.5833 13.4464H32.0833C32.0833 7.9638 27.6377 3.5 22.1667 3.5C16.6898 3.5 12.25 7.93984 12.25 13.4167V19.25H8.75V13.4167Z" fill="currentColor" />
          </g>
        </svg>
      </div>
      <span class="cal__hop-label">Authentication</span>
    </div>
  </div>
</template>

<style scoped>
.cal {
  position: relative;
  margin: 1.5rem 0;
}

/* Arrowhead capping the right rail. Sits at z-index 0 like the rails so
   panel content (z-index 1) and the central node (z-index 2) paint over it. */
.cal__arrow {
  position: absolute;
  top: 50%;
  right: 0;
  width: 40px;
  height: 50px;
  transform: translate(50%, -50%);
  z-index: 0;
  pointer-events: none;
}
@media (max-width: 768px) {
  .cal__arrow { display: none; }
}

/* Dashed rails — pattern verbatim from the docs port; colours retoned to
   match the panel header accents (navy-deep TPP / teal-deep LFI) instead
   of the original purple / cyan. Hidden when the layout stacks below 769px. */
@media (min-width: 769px) {
  .cal::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 50%;
    height: 14px;
    transform: translateY(-50%);
    background-image: repeating-linear-gradient(
      to right,
      var(--at-navy-deep) 0px,
      var(--at-navy-deep) 8px,
      transparent 8px,
      transparent 16px
    );
    z-index: 0;
  }

  .cal::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    right: 0;
    height: 14px;
    transform: translateY(-50%);
    background-image: repeating-linear-gradient(
      to right,
      var(--at-teal-deep) 0px,
      var(--at-teal-deep) 8px,
      transparent 8px,
      transparent 16px
    );
    z-index: 0;
  }
}

.cal__layout {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  align-items: stretch;
}

@media (max-width: 768px) {
  .cal__layout { grid-template-columns: 1fr; gap: 1rem; }
}

.cal__panel {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: center;
}

/* Scale the slotted consent / auth windows up by 50% relative to the
   surrounding chrome (panel labels, layout). `zoom` (rather than
   `transform: scale`) is used because it affects layout — the panel
   container expands to accommodate the larger content.
   No `width: 100%` here: zoom scales from the slot's top-left corner, so
   forcing full-panel width pinned the slot to the left edge and caused it
   to grow rightwards. Letting the slot size to its content means the panel's
   `align-items: center` keeps it horizontally centred under the label. */
.cal__slot {
  zoom: 1.5;
}

.cal__label {
  width: 100%;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.65rem 0.85rem;
  border: 1px solid var(--cal-accent);
  background: color-mix(in srgb, var(--cal-accent) 10%, var(--at-surface));
  font-family: var(--at-sans);
  text-align: center;
  box-sizing: border-box;
  --cal-accent: var(--at-navy-deep);
}
.cal__label--tpp { --cal-accent: var(--at-navy-deep); }
.cal__label--lfi { --cal-accent: var(--at-teal-deep); }

.cal__label-eyebrow {
  font-family: var(--at-mono);
  font-size: 0.6rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--cal-accent);
}
.cal__label-title {
  font-family: var(--at-serif);
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: var(--at-navy-deep);
}

/* Connector node — sits over the rails on wide viewports. Hidden on
   narrow viewports where the rails themselves are off. */
.cal__hop {
  display: none;
}
@media (min-width: 769px) {
  /* The hop's bounding box is sized to the NODE only — caption is absolute
     below — so centring the box on cal's centre puts the node's centre on
     the rail line. `transform: scale()` (vs `zoom`) is used here so the
     +50% growth happens around the box's centre, not its top-left corner. */
  .cal__hop {
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 56px;
    height: 56px;
    transform: translate(-50%, -50%) scale(1.5);
    z-index: 2;
  }
  .cal__hop-node {
    width: 100%;
    height: 100%;
    background: var(--at-teal-deep);
    color: var(--at-bg-cream);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 6px 20px rgba(0, 23, 56, 0.18);
  }
  .cal__hop-label {
    position: absolute;
    top: calc(100% + 6px);
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    font-family: var(--at-mono);
    font-size: 0.6rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    font-weight: 600;
    color: var(--at-mute-2);
  }
}
</style>
