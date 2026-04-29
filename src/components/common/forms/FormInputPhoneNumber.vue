<script setup lang="ts">
import { ref, computed, watch, useId } from 'vue'

interface PhoneInput {
  country_code?: string  // ISO 3166-1 alpha-2 (e.g. "AE")
  phone_number?: string
}

const props = withDefaults(defineProps<{
  input?: PhoneInput
  countryCode?: string
  error?: boolean
  placeholder?: string
}>(), {
  input: () => ({ country_code: 'AE', phone_number: '' }),
  countryCode: 'AE',
  error: false,
  placeholder: 'Enter your mobile number',
})

const emit = defineEmits<{
  output: [{ data: string | undefined; meta: { countryCallingCode: string; iso: string } }]
}>()

// Curated subset focused on UAE Open Finance participants:
// UAE (default) + GCC, plus the largest Western, South Asian and MENA
// markets. Add more here as needed — no third-party dep, no rebuild.
interface Country { iso: string; name: string; dial: string; flag: string }
const COUNTRIES: Country[] = [
  { iso: 'AE', name: 'United Arab Emirates', dial: '971', flag: '🇦🇪' },
  { iso: 'SA', name: 'Saudi Arabia',         dial: '966', flag: '🇸🇦' },
  { iso: 'BH', name: 'Bahrain',              dial: '973', flag: '🇧🇭' },
  { iso: 'KW', name: 'Kuwait',               dial: '965', flag: '🇰🇼' },
  { iso: 'OM', name: 'Oman',                 dial: '968', flag: '🇴🇲' },
  { iso: 'QA', name: 'Qatar',                dial: '974', flag: '🇶🇦' },
  { iso: 'EG', name: 'Egypt',                dial: '20',  flag: '🇪🇬' },
  { iso: 'JO', name: 'Jordan',               dial: '962', flag: '🇯🇴' },
  { iso: 'LB', name: 'Lebanon',              dial: '961', flag: '🇱🇧' },
  { iso: 'GB', name: 'United Kingdom',       dial: '44',  flag: '🇬🇧' },
  { iso: 'US', name: 'United States',        dial: '1',   flag: '🇺🇸' },
  { iso: 'CA', name: 'Canada',               dial: '1',   flag: '🇨🇦' },
  { iso: 'DE', name: 'Germany',              dial: '49',  flag: '🇩🇪' },
  { iso: 'FR', name: 'France',               dial: '33',  flag: '🇫🇷' },
  { iso: 'NL', name: 'Netherlands',          dial: '31',  flag: '🇳🇱' },
  { iso: 'IE', name: 'Ireland',              dial: '353', flag: '🇮🇪' },
  { iso: 'IT', name: 'Italy',                dial: '39',  flag: '🇮🇹' },
  { iso: 'ES', name: 'Spain',                dial: '34',  flag: '🇪🇸' },
  { iso: 'SE', name: 'Sweden',               dial: '46',  flag: '🇸🇪' },
  { iso: 'CH', name: 'Switzerland',          dial: '41',  flag: '🇨🇭' },
  { iso: 'IN', name: 'India',                dial: '91',  flag: '🇮🇳' },
  { iso: 'PK', name: 'Pakistan',             dial: '92',  flag: '🇵🇰' },
  { iso: 'BD', name: 'Bangladesh',           dial: '880', flag: '🇧🇩' },
  { iso: 'PH', name: 'Philippines',          dial: '63',  flag: '🇵🇭' },
  { iso: 'LK', name: 'Sri Lanka',            dial: '94',  flag: '🇱🇰' },
  { iso: 'NP', name: 'Nepal',                dial: '977', flag: '🇳🇵' },
  { iso: 'SG', name: 'Singapore',            dial: '65',  flag: '🇸🇬' },
  { iso: 'MY', name: 'Malaysia',             dial: '60',  flag: '🇲🇾' },
  { iso: 'AU', name: 'Australia',            dial: '61',  flag: '🇦🇺' },
  { iso: 'NZ', name: 'New Zealand',          dial: '64',  flag: '🇳🇿' },
  { iso: 'ZA', name: 'South Africa',         dial: '27',  flag: '🇿🇦' },
  { iso: 'TR', name: 'Türkiye',              dial: '90',  flag: '🇹🇷' },
]

function findByIso(iso: string | undefined): Country {
  return COUNTRIES.find((c) => c.iso === iso) ?? COUNTRIES[0]!
}

const inputId = useId()
const selectedIso = ref(props.input?.country_code || props.countryCode || 'AE')
const phoneNumber = ref<string>(props.input?.phone_number ?? '')

const selectedCountry = computed<Country>(() => findByIso(selectedIso.value))
const isFocused = ref(false)

watch(() => props.input, (v) => {
  if (v?.country_code && v.country_code !== selectedIso.value) selectedIso.value = v.country_code
  phoneNumber.value = v?.phone_number ?? ''
})

function emitOutput() {
  emit('output', {
    data: phoneNumber.value || undefined,
    meta: { countryCallingCode: selectedCountry.value.dial, iso: selectedCountry.value.iso },
  })
}

watch(phoneNumber, emitOutput)
watch(selectedIso, emitOutput)
</script>

<template>
  <div
    class="fip"
    :class="{
      'fip--has-value': !!phoneNumber,
      'fip--focused': isFocused,
      'fip--error': error,
    }"
  >
    <div class="fip__shell">
      <select
        v-model="selectedIso"
        class="fip__country"
        :aria-label="'Country dialling code'"
      >
        <option v-for="c in COUNTRIES" :key="c.iso" :value="c.iso">
          {{ c.flag }} {{ c.name }} (+{{ c.dial }})
        </option>
      </select>

      <span class="fip__divider" aria-hidden="true" />

      <span class="fip__dial">+{{ selectedCountry.dial }}</span>

      <input
        :id="inputId"
        v-model="phoneNumber"
        type="tel"
        inputmode="tel"
        autocomplete="tel-national"
        class="fip__number"
        @focus="isFocused = true"
        @blur="isFocused = false"
      />

      <label :for="inputId" class="fip__label">
        {{ placeholder }}
      </label>
    </div>
  </div>
</template>

<style scoped>
.fip {
  position: relative;
  display: block;
  width: 100%;
}

.fip__shell {
  position: relative;
  display: grid;
  grid-template-columns: auto 1px auto 1fr;
  align-items: stretch;
  height: 56px;
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line-2);
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.fip--focused .fip__shell {
  border-color: var(--at-teal);
  box-shadow: inset 0 -2px 0 var(--at-teal);
}

.fip--error .fip__shell {
  border-color: #B33A3A;
}
.fip--error.fip--focused .fip__shell {
  box-shadow: inset 0 -2px 0 #B33A3A;
}

.fip__country {
  appearance: none;
  -webkit-appearance: none;
  background: transparent;
  border: none;
  outline: none;
  padding: 0 1.85rem 0 0.85rem;
  font-family: var(--at-sans);
  font-size: 1rem;
  color: transparent;
  cursor: pointer;
  /* Show only the flag from the option's text by clipping width — the flag
     emoji + first space land in this narrow viewport, the rest spills. */
  width: 4rem;
  text-overflow: clip;
  background-image: linear-gradient(45deg, transparent 50%, var(--at-mute) 50%),
                    linear-gradient(135deg, var(--at-mute) 50%, transparent 50%);
  background-position: calc(100% - 16px) 50%, calc(100% - 11px) 50%;
  background-size: 5px 5px, 5px 5px;
  background-repeat: no-repeat;
  /* Force the visible fragment to be the flag — unicode flag emojis are
     wide enough to occupy the visible char slot. */
  text-indent: -0.05em;
  letter-spacing: 0.5em;
  text-shadow: 0 0 0 var(--at-navy-deep);
  color: transparent;
}
.fip__country option {
  font-family: var(--at-sans);
  font-size: 0.95rem;
  color: var(--at-navy-deep);
  letter-spacing: normal;
  text-shadow: none;
}

.fip__divider {
  background: var(--at-grid-line);
}

.fip__dial {
  display: inline-flex;
  align-items: center;
  padding: 0 0.65rem 0 0.85rem;
  font-family: var(--at-mono);
  font-size: 0.95rem;
  color: var(--at-mute-2);
  white-space: nowrap;
}

.fip__number {
  border: none;
  outline: none;
  background: transparent;
  padding: 0 1rem 0 0;
  font-family: var(--at-sans);
  font-size: 1rem;
  color: var(--at-navy-deep);
  width: 100%;
}
.fip__number:focus {
  outline: none;
}

/* Chrome autofill paints a yellow / light-blue background. The shell border
   is on `.fip__shell`, so the inset white only needs to mask the input itself. */
.fip__number:-webkit-autofill,
.fip__number:-webkit-autofill:hover,
.fip__number:-webkit-autofill:focus,
.fip__number:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 1000px var(--at-surface) inset;
  -webkit-text-fill-color: var(--at-navy-deep);
  caret-color: var(--at-navy-deep);
  transition: background-color 9999s ease-out 0s;
}

.fip__label {
  position: absolute;
  top: 50%;
  left: 6.85rem;
  transform: translateY(-50%);
  padding: 0 0.35rem;
  background: transparent;
  font-family: var(--at-sans);
  font-size: 1rem;
  color: var(--at-mute);
  pointer-events: none;
  transition: top 0.15s ease, transform 0.15s ease, font-size 0.15s ease,
              font-family 0.15s ease, color 0.15s ease, letter-spacing 0.15s ease,
              background 0.15s ease, left 0.15s ease;
  cursor: text;
}

.fip--focused .fip__label,
.fip--has-value .fip__label {
  top: 0;
  left: 1rem;
  transform: translateY(-50%);
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--at-teal-deep);
  background: var(--at-surface);
  pointer-events: auto;
}

.fip--error.fip--focused .fip__label,
.fip--error.fip--has-value .fip__label {
  color: #B33A3A;
}
</style>
