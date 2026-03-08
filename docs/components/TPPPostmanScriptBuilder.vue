<template>
  <div class="form-root">

    <div class="form-section">
      <FormInput placeholder="Enter your Client Id" ref="inputClientId" name="client_id" :input="formData.client_id"
        :error="!!showError('client_id')" @output="setClientId" />
      <InfoTooltip style="position: absolute; right: 10px; top: 10px;" :icon-size="40">
        <strong>Client ID</strong> - Use the client_id from your Trust Framework application detail page.<br />
        See: <a href="/tech/tpp-standards/trust-framework/application#your-client-id">Trust Framework client_id</a>
      </InfoTooltip>
            <div v-if="showError('client_id') === ''" class="field-error" style="color: rgba(17, 85, 113, 1);"
        aria-live="polite">Your Client Id should look like: <span style="font-style: italic;">https://rp.sandbox.directory.openfinance.ae/openid_relying_party/c6fb03a0-e987-49d5-94e2-76cfec02c522</span>
      </div>
      <div class="field-error" aria-live="polite">{{ showError('client_id') }}</div>
    </div>

    <div class="form-section">
      <div class="role-label">Client Roles</div>
      <div class="role-row">
        <button v-for="opt in roles" :key="opt" type="button"
          :class="['role-chip', { active: formData.roles.includes(opt), error: showError('role') }]"
          @click="setRoles(opt)">
          {{ opt }}
        </button>
      </div>
      <InfoTooltip style="position: absolute; right: 10px; top: 30px;" :icon-size="40">
        <strong>Client Roles</strong> - Choose the roles assigned to your app (BDSP for data sharing, BSIP for payments/service initiation).<br />
        See: <a href="/tech/tpp-standards/trust-framework/roles">roles reference</a>
      </InfoTooltip>
      
      <div class="field-error" aria-live="polite">{{ showError('role') }}</div>
    </div>

    <div class="form-section">
      <FormInput placeholder="Enter your Redirect URI" ref="inputRedirectURI" name="redirect_uri"
        :input="formData.redirect_uri" :error="!!showError('redirect_uri')" @output="setRedirectURI" />
      <InfoTooltip style="position: absolute; right: 10px; top: 10px;" :icon-size="40">
        <strong>Redirect URI</strong> - Must exactly match a redirect URI registered on your Trust Framework application.<br />
        See: <a href="/tech/tpp-standards/trust-framework/redirect-uri">redirect URI guidance</a>
      </InfoTooltip>
      <div class="field-error" aria-live="polite">{{ showError('redirect_uri') }}</div>
    </div>

    <div class="form-section">
      <FormInput placeholder="Enter your Client Transport Key ID" ref="inputTransportKeyId" name="transport_key_id"
        :input="formData.transport_key_id" :error="!!showError('transport_key_id')" @output="setTransportKeyID" />
      <InfoTooltip style="position: absolute; right: 10px; top: 10px;" :icon-size="40">
        <strong>Transport key ID</strong> - - The kid from your transport certificate details in the Trust Framework.<br />
        See: <a href="/tech/tpp-standards/trust-framework/certificates">mTLS certificates</a>
      </InfoTooltip>
      <div class="field-error" aria-live="polite">{{ showError('transport_key_id') }}</div>
    </div>

    <div class="form-section">
      <FormInput placeholder="Enter your Client Signing Key ID" ref="inputSigningKeyId" name="signing_key_id"
        :input="formData.signing_key_id" :error="!!showError('signing_key_id')" @output="setSigningKeyID" />
      <InfoTooltip style="position: absolute; right: 10px; top: 10px;" :icon-size="40">
        <strong>Signing key ID</strong> - The kid from your signing certificate details in the Trust Framework.<br />
        See: <a href="/tech/tpp-standards/trust-framework/certificates#finding-your-key-id-kid">finding your key ID (kid)</a>
      </InfoTooltip>
      <div class="field-error" aria-live="polite">{{ showError('signing_key_id') }}</div>
    </div>

    <div class="form-section">
      <div class="upload-label">Upload signing private key (.key)</div>
      <label class="file-input">
        <span class="file-button">Choose file</span>
        <span class="file-name">{{ formData.key_file_name || 'No file chosen' }}</span>
        <input type="file" accept=".key,.pem,.txt" @change="handleKeyUpload" />
      </label>
      <div class="field-hint" aria-live="polite">Accepted: .key, .pem or .txt private key files.</div>
      <div v-if="showError('key_upload') === ''" class="field-hint strong" aria-live="polite">
        While we request your Signing Private Key here to help you get up and running in the sandbox environment, this is strictly for testing purposes. In production, never share your private keys—they must stay secure within your own environment.
        Please refer to <a href="/policy/secure-management">Secure Management of Keys and Credentials in UAE Open Finance</a> for guidance.
      </div>
      <div class="field-error" aria-live="polite">{{ showError('key_upload') || uploadError }}</div>
    </div>


    <div class="form-section">
      <FormInput placeholder="Enter the LFI's Discovery Endpoint" ref="inputDiscoveryURI" name="discovery_uri"
        :input="formData.discovery_uri" :error="!!showError('discovery_uri')" @output="setDiscoveryURI" />
      <InfoTooltip style="position: absolute; right: 10px; top: 10px;" :icon-size="40">
        <strong>LFI Discovery URL</strong> - The .well-known endpoint of the target LFI; model bank URL is prefilled.<br />
        See: <a href="/tpp-standards/trust-framework/well-known">The .well-known Endpoint</a>
      </InfoTooltip>
      <div v-if="showError('discovery_uri') === ''" class="field-error" style="color: rgba(17, 85, 113, 1);"
        aria-live="polite">The discovery uri for the model bank is: <br />
        <span style="font-style: italic; padding-left: 12px;">https://auth1.altareq1.sandbox.apihub.openfinance.ae/.well-known/openid-configuration</span>
        <br /> 
        for an LFI's preprod environment it will be 
        <br />
        <span style="font-style: italic; padding-left: 12px;">https://auth1.<span style="background-color: rgba(255,255,0,0.6);">[LFI  CODE]</span>.preprod.apihub.openfinance.ae/.well-known/openid-configuration</span>
      </div>
      <div class="field-error" aria-live="polite">{{ showError('discovery_uri') }}</div>
    </div>



    <div class="actions">
      <button class="consent-style-button" @click="submit">
        <span class="consent-style-button-inner">
          <svg class="consent-style-button-icon" width="22" height="23" viewBox="0 0 22 23" fill="none"
            xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path
              d="M11 0C4.92501 0 0 4.93861 0 11.0306C0 17.1225 4.92501 22.0611 11 22.0611C17.075 22.0611 22 17.1225 22 11.0306C22 4.93861 17.075 0 11 0Z"
              fill="white" />
            <path
              d="M14.8042 14.8454H7.19727V7.21704H14.8056V14.8454H14.8042ZM8.95837 13.078H13.0417V8.98435H8.95837V13.078Z"
              fill="url(#paint0_linear_2_496)" />
            <path
              d="M5.4292 5.44275V16.6169H16.5723V5.44275H5.4292ZM14.8042 14.8454H7.19727V7.2171H14.8056V14.8454H14.8042Z"
              fill="url(#paint1_linear_2_496)" />
            <path
              d="M3.66125 3.6698V18.3899H18.3404V3.6698H3.66125ZM16.5724 16.6183H5.42793V5.44416H16.5724V16.6183Z"
              fill="url(#paint2_linear_2_496)" />
            <path d="M22 22.0611L13.0416 13.0781H8.95831L17.9166 22.0611H22Z"
              fill="url(#paint3_radial_2_496)" />
            <defs>
              <linearGradient id="paint0_linear_2_496" x1="7.02442" y1="10.9465" x2="14.6294" y2="10.9465"
                gradientUnits="userSpaceOnUse">
                <stop stop-color="#4083E1" />
                <stop offset="0.08" stop-color="#3E8BDD" />
                <stop offset="0.48" stop-color="#36B1CC" />
                <stop offset="0.8" stop-color="#31C9C1" />
                <stop offset="1" stop-color="#30D2BE" />
              </linearGradient>
              <linearGradient id="paint1_linear_2_496" x1="5.42781" y1="11.0305" x2="16.5723" y2="11.0305"
                gradientUnits="userSpaceOnUse">
                <stop stop-color="#80ACEB" />
                <stop offset="0.3" stop-color="#7BC0E1" />
                <stop offset="0.73" stop-color="#76D8D7" />
                <stop offset="1" stop-color="#75E1D4" />
              </linearGradient>
              <linearGradient id="paint2_linear_2_496" x1="3.65987" y1="11.0305" x2="18.3404" y2="11.0305"
                gradientUnits="userSpaceOnUse">
                <stop stop-color="#BFD6F5" />
                <stop offset="0.55" stop-color="#BBE7ED" />
                <stop offset="1" stop-color="#BAF0E9" />
              </linearGradient>
              <radialGradient id="paint3_radial_2_496" cx="0" cy="0" r="1"
                gradientTransform="matrix(9.09232 8.98302 -65.3309 67.979 10.8846 13.0781)"
                gradientUnits="userSpaceOnUse">
                <stop stop-color="#40E0C7" />
                <stop offset="0.304248" stop-color="#0050C8" />
                <stop offset="0.623256" stop-color="white" />
              </radialGradient>
            </defs>
          </svg>
          <span class="consent-style-button-text">Download your Postman Collection</span>
        </span>
      </button>
    </div>
  </div>
</template>

<script>
import FormInput from './Form/FormInput.vue'
import InfoTooltip from './InfoTooltip.vue'

export default {
  components: { FormInput, InfoTooltip },
  data() {
    return {
      complete: false,
      roles: ['BDSP (Bank Data Sharing)', 'BSIP (Payments / Service Initiation)'],
      formData: {
        client_id: undefined,
        roles: [],
        redirect_uri: undefined,
        transport_key_id: undefined,
        signing_key_id: undefined,
        discovery_uri: 'https://auth1.altareq1.sandbox.apihub.openfinance.ae/.well-known/openid-configuration',
        key_file_name: undefined
      },
      uploadError: ''
    }
  },
  methods: {
    setRoles(val) {
      const roles = this.formData.roles
      const index = roles.indexOf(val)
      if (index >= 0) {
        roles.splice(index, 1)
      } else {
        roles.push(val)
      }
    },
    setClientId(val) {
      this.formData.client_id = val.data
    },
    setRedirectURI(val) {
      this.formData.redirect_uri = val.data
    },
    setTransportKeyID(val) {
      this.formData.transport_key_id = val.data
    },
    setSigningKeyID(val) {
      this.formData.signing_key_id = val.data
    },
    setDiscoveryURI(val) {
      this.formData.discovery_uri = val.data
    },
    async handleKeyUpload(event) {
      const file = event?.target?.files?.[0]
      if (!file) return
      if (!file.name.match(/\\.(key|pem|txt)$/i)) {
        this.uploadError = 'Please upload a .key, .pem or .txt private key file.'
        return
      }
      this.uploadError = ''
      this.formData.key_file_name = file.name
    },

    showError(key) {
      if (!this.complete) return ''
      if (key === 'client_id' && !this.formData.client_id) return 'Field is required.'
      if (key === 'role' && this.formData.roles.length === 0) return 'One role is required.'
      if (key === 'redirect_uri' && !this.formData.redirect_uri) return 'Field is required.'
      if (key === 'transport_key_id' && !this.formData.transport_key_id) return 'Field is required.'
      if (key === 'signing_key_id' && !this.formData.signing_key_id) return 'Field is required.'
      if (key === 'discovery_uri' && !this.formData.discovery_uri) return 'Field is required.'
      if (key === 'key_upload' && !this.formData.key_file_name) return 'Signing .key file is required.'
      return ''
    },
    async submit() {
      this.complete = true
      if (
        this.showError('client_id') ||
        this.showError('role') ||
        this.showError('redirect_uri') ||
        this.showError('transport_key_id') ||
        this.showError('signing_key_id') ||
        this.showError('discovery_uri')
      ) {
        window.scrollTo({ top: 300, behavior: 'smooth' })
        return
      }
      // submit logic placeholder
      this.$emit('submit', { ...this.formData })
    }
  }
}
</script>

<style scoped>
.form-root {
  /* max-width: 760px; */
  margin: 0 auto;
  padding: 16px 12px 24px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  font-family: 'Poppins', system-ui, -apple-system, sans-serif;
}

.lead {
  margin: 0;
  color: #4d5566;
  font-size: 14px;
}

.form-section {
  position: relative;
  width: 100%;
  gap: 8px;
}

.two-col {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 14px;
}

.field-col {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.role-label {
  font-weight: 600;
  color: #0b1340;
}

.role-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.role-chip {
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.75rem;
  border: 1px solid #dadce0;
  box-shadow: 0 0 4px rgba(17, 85, 113, 1);
  padding: 15px;
  padding-left: 24px;
  padding-right: 24px;
  border-radius: 4px;
  color: rgba(17, 85, 113, 1) !important;
  border-color: rgba(17, 85, 113, 1);
}

.role-chip.active {
  background: rgba(54, 191, 212, 0.3);
}

.role-chip.error {
  border-color: #dc2626;
  box-shadow: 0 0 4px #dc2626;
}

.upload-label {
  font-weight: 600;
  color: #0b1340;
  margin-bottom: 6px;
}

.file-input {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  cursor: pointer;
}

.file-input input {
  display: none;
}

.file-button {
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.75rem;
  border: 1px solid #dadce0;
  box-shadow: 0 0 4px rgba(17, 85, 113, 1);
  padding: 7px;
  padding-left: 12px;
  padding-right: 12px;
  border-radius: 4px;
  color: rgba(17, 85, 113, 1) !important;
  border-color: rgba(17, 85, 113, 1);
}

.file-name {
  flex: 1;
  color: #0b1340;
  font-size: 13px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.field-hint {
  margin-top: 6px;
  font-size: 12px;
  color: #4d5566;
}

.field-hint.strong {
  color: rgba(17, 85, 113, 1);
}

.field-error {
  min-height: 18px;
  font-size: 12px;
  padding-left: 12px;
  color: #dc2626;
}

.actions {
  display: flex;
  justify-content: center;
  padding-top: 4px;
}

.consent-style-button {
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
}

.consent-style-button-inner {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 400px;
  height: 48px;
  padding: 10px 10px 10px 20px;
  border-radius: 66px;
  background: linear-gradient(84.64deg, #00c8af 0%, #015ad7 41.05%, #000000 82.6%);
  box-shadow: 0 10px 20px rgba(1, 90, 215, 0.18);
  color: #ffffff;
  font-weight: 600;
  letter-spacing: -0.01em;
}

.consent-style-button:hover .consent-style-button-inner {
 opacity: 80%;
}

.consent-style-button-icon {
  flex: none;
}

.consent-style-button-text {
  font-size: 14px;
}
</style>


