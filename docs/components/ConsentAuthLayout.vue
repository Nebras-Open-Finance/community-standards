<template>
  <div class="consent-auth-wrapper">
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
    <!-- Centered connector icon (desktop only) -->
    <div class="connector-icon" aria-hidden="true">
      <svg style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)" width="50" height="50" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="70" height="70" rx="35" fill="#35BFD4"/>
        <g transform="translate(12.5, 9.5)">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M19.5372 34.52C18.4771 33.7108 17.7917 32.4244 17.7917 30.9758C17.7917 28.5269 19.7504 26.5417 22.1667 26.5417C24.5829 26.5417 26.5417 28.5269 26.5417 30.9758C26.5417 32.4244 25.8563 33.7108 24.7962 34.52L26.5417 41.1245H17.7917L19.5372 34.52Z" fill="#F5F5FD"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M0 17.5H44.3333V50.1667H0V17.5ZM3.5 21V46.6667H40.8333V21H3.5Z" fill="#F5F5FD"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M8.75 13.4167C8.75 6.00685 14.7568 0 22.1667 0C29.5823 0 35.5833 6.04242 35.5833 13.4464H32.0833C32.0833 7.9638 27.6377 3.5 22.1667 3.5C16.6898 3.5 12.25 7.93984 12.25 13.4167V19.25H8.75V13.4167Z" fill="#F5F5FD"/>
        </g>
      </svg>
      <div style="position: absolute; bottom: -25px; transform: translateX(-2px); font-weight: 600; font-size: small; text-align: center;">Authentication</div>
      
    </div>
  </div>
</template>

<style scoped>
.consent-auth-wrapper {
  position: relative;
}

@media (min-width: 769px) {
  .consent-auth-wrapper::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 50%;
    height: 14px;
    transform: translateY(-50%);
    background-image: repeating-linear-gradient(
      to right,
      #7878E3 0px,
      #7878E3 8px,
      transparent 8px,
      transparent 16px
    );
    z-index: 0;
  }

  .consent-auth-wrapper::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    right: 0;
    height: 14px;
    transform: translateY(-50%);
    background-image: repeating-linear-gradient(
      to right,
      #35BFD4 0px,
      #35BFD4 8px,
      transparent 8px,
      transparent 16px
    );
    z-index: 0;
  }
}

.consent-auth-layout {
  position: relative;
  z-index: 1;
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

.connector-icon {
  display: none;
}

@media (min-width: 769px) {
  .connector-icon {
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
        width: 90px;
    height: 90px;
    background-color: rgba(53,191,212,1);
    border-radius: 100%;
  }
}
</style>
