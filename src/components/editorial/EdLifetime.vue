<script setup lang="ts">
withDefaults(defineProps<{
  from: string
  to: string
  duration: string
  recommended?: string
  color?: string
}>(), {
  recommended: '',
  color: 'var(--at-navy-deep)',
})
</script>

<template>
  <div class="ed-lifetime" :style="{ '--lt-accent': color }">
    <div class="ed-lifetime__rail">
      <div class="ed-lifetime__endpoint">
        <span class="ed-lifetime__dot" />
        <span class="ed-lifetime__label">{{ from }}</span>
      </div>

      <div class="ed-lifetime__span">
        <span class="ed-lifetime__duration">{{ duration }}</span>
        <span class="ed-lifetime__line" />
        <span v-if="recommended" class="ed-lifetime__recommended">{{ recommended }}</span>
      </div>

      <div class="ed-lifetime__endpoint">
        <span class="ed-lifetime__dot" />
        <span class="ed-lifetime__label">{{ to }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ed-lifetime {
  margin: 1.5rem 0;
  padding: 1.5rem 1.75rem;
  background: var(--at-bg-cream);
  border: 1px solid var(--at-grid-line);
}

.ed-lifetime__rail {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 1rem;
}

.ed-lifetime__endpoint {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.45rem;
  flex-shrink: 0;
}

.ed-lifetime__dot {
  width: 12px;
  height: 12px;
  background: var(--lt-accent);
  border-radius: 50%;
  border: 2px solid var(--at-bg-cream);
  box-shadow: 0 0 0 2px var(--lt-accent);
}

.ed-lifetime__label {
  font-family: var(--at-mono);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: var(--at-navy-deep);
}

.ed-lifetime__span {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  min-width: 0;
  padding: 0.5rem 0;
}

.ed-lifetime__duration {
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--lt-accent);
  background: var(--at-bg-cream);
  padding: 0 0.65rem;
  position: relative;
  z-index: 1;
}

.ed-lifetime__line {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(
    to right,
    var(--lt-accent) 0%,
    var(--lt-accent) 30%,
    color-mix(in srgb, var(--lt-accent) 45%, transparent) 50%,
    var(--lt-accent) 70%,
    var(--lt-accent) 100%
  );
  transform: translateY(-50%);
  z-index: 0;
}

.ed-lifetime__recommended {
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--at-mute);
  font-weight: 600;
  background: var(--at-bg-cream);
  padding: 0 0.5rem;
  position: relative;
  z-index: 1;
}

@media (max-width: 560px) {
  .ed-lifetime__rail {
    grid-template-columns: 1fr;
    gap: 0.65rem;
  }
  .ed-lifetime__line {
    left: 50%;
    right: auto;
    top: 0;
    bottom: 0;
    width: 2px;
    height: auto;
    background: var(--lt-accent);
    transform: translateX(-50%);
  }
  .ed-lifetime__span {
    flex-direction: row;
    gap: 0.6rem;
    padding: 0.4rem 0;
  }
}
</style>
