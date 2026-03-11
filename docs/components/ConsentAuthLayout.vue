<template>
  <div>
  </div>
  <div class="consent-auth-layout">
    <div class="consent-auth-panel">
      <div class="panel-label tpp-label">TPP · Consent Page</div>
      <slot name="consent" />
    </div>
    <div class="consent-auth-panel">
      <div class="panel-label lfi-label">LFI · Authorisation Page</div>
      <slot name="auth" />
    </div>
  </div>
</template>

<style scoped>
.consent-auth-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 1.25rem;
}

@media (max-width: 768px) {
  .consent-auth-layout {
    grid-template-columns: 1fr;
  }
}

.consent-auth-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.panel-label {
  width: 100%;
  text-align: center;
  padding: 0.45rem 0.75rem;
  border-radius: 7px;
  box-sizing: border-box;
  font-size: 0.85rem;
  font-weight: 600;
  color: #1a202c;
}

.tpp-label {
  background: rgba(0, 39, 127, 0.05);
  border: 1px solid rgba(0, 39, 127, 0.12);
}

.lfi-label {
  background: rgba(0, 192, 167, 0.07);
  border: 1px solid rgba(0, 192, 167, 0.28);
}
</style>
