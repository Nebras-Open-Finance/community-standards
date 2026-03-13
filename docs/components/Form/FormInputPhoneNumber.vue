<template>
  <div class="phone-wrapper-outer" :class="field_class" style="height: 62px; margin-bottom: 5px;">
    <VueTelInput :id="inputUUID" @input="onInput" type="number" :value="phone_number" v-bind="bindProps"
      :defaultCountry="country_codeClean" />
    <div :class="field_placeholder_class" @click="focus()">
      <span>{{ placeholder }}</span>
    </div>
  </div>
</template>

<script>
import { VueTelInput } from 'vue3-tel-input'
import 'vue3-tel-input/dist/vue3-tel-input.css'
import { v4 as uuidv4 } from "uuid";


export default {
  components: { VueTelInput },
  props: {
    input: {
      type: Object,
      default() {
        return {
          country_code: undefined,
          phone_number: undefined
        }
      }
    },
    country_code: {
      type: String,
      required: false,
    },
    error: {
      type: Boolean,
      default: undefined,
    },
    placeholder: {
      type: String,
      default: 'Enter your mobile number'
    }
  },
  data() {
    return {
      phone_number: undefined,
      phoneObject: {
        country_code: undefined,
      },
      phoneFocus: false,
      payload: {},
      bindProps: {
        mode: "international",
        preferredCountries: ["GB"],
        onlyCountries: [],
        ignoredCountries: [],
        name: "mobile-phone",
        maxLen: 25,
        inputOptions: {
          showDialCode: false,
          placeholder: undefined,
        }
      }
    };
  },
  computed: {
    inputUUID() {
      return uuidv4();
    },
    field_class() {
      return this.error ? 'phone-wrapper-error' : ''
    },
    country_codeClean() {
      if (!this.input.country_code) return 'GB'
      return this.input.country_code
    },
    field_placeholder_class() {
      var focused = document.activeElement;
      if (!focused || focused == document.body) {
        focused = null;
      }
      if ((this.phone_number && this.phone_number !== '') || this.phoneFocus)
        return 'active-placeholder'
      return 'field-placeholder'
    }
  },
  created() {
    document.addEventListener('focusin', this.focusChanged)
    document.addEventListener('focusout', this.removeFocus)
  },
  beforeDestroy() {
    document.removeEventListener('focusin', this.focusChanged)
    document.removeEventListener('focusout', this.removeFocus)
  },
  watch: {
    input(value) {
      this.phoneObject.country_code = value.country_code
      this.phone_number = value.phone_number
      this.outputData()
    },
    phone_number() {
      this.outputData();
    },
  },
  methods: {
    onInput(val, phoneObject) {
      if ((typeof val === 'object') === false) {
        this.phoneObject = phoneObject
        this.phone_number = val
      }
    },
    removeFocus() {
      this.phoneFocus = false
    },
    focusChanged(event) {
      const el = event.target
      if (el === document.getElementsByClassName('vti__input')[0]) {
        this.phoneFocus = true
      }
      else {
        this.phoneFocus = false
      }
    },
    focus() {
      document.getElementsByClassName('vti__input')[0].focus();
    },
    outputData() {
      this.$emit("output", {
        data: this.phone_number,
        meta: this.phoneObject,
      });
    },
  },
};
</script>

<style>
.field-placeholder {
  font-size: 16px;
  position: absolute;
  /* background: #fff; */
  top: 19px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #80868b;
  left: 50px;
  padding: 0 8px;
  -webkit-transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1),
    opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);
  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1),
    opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1;
  text-align: left;
  margin-left: 8px;
  cursor: text;
  color: rgba(17, 85, 113, 1);
}

.active-placeholder {
  font-size: 16px;
  position: absolute;
  /* background: #fff; */
  top: 19px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #80868b;
  left: 50px;
  padding: 0 8px;
  -webkit-transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1),
    opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);
  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1),
    opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1;
  text-align: left;
  margin-left: 8px;
  cursor: text;
  color: rgba(17, 85, 113, 1);
  -webkit-transform: translateY(-29px) scale(0.75) translateX(-15%);
  transform: translateY(-29px) scale(0.75) translateX(-15%);
  border: 1px solid rgba(17, 85, 113, 1) !important;
  padding-top: 1px;
  padding-bottom: 2px;
  background: #ffffff;
  border-radius: 0.25rem;
  padding-left: 8px;
  padding-right: 8px;
}

.vti__dropdown:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
}

.vti__input {
  font-size: 20.5px !important;
}

.vue-tel-input {
  border-color: inherit !important;
  border: 1px solid rgba(17, 85, 113, 1) !important;
  box-shadow: 0 0 4px rgba(17, 85, 113, 1) !important;
}

.vue-tel-input:focus-within {
  border-color: inherit !important;
  border: 1px solid rgba(17, 85, 113, 1) !important;
  box-shadow: 0 0 4px rgba(17, 85, 113, 1) !important;
}

.phone-wrapper-error .vue-tel-input,
.phone-wrapper-error .vue-tel-input:focus-within {
  border: 1px solid rgba(255, 5, 5, 1) !important;
  box-shadow: 0 0 4px rgba(255, 5, 5, 1) !important;
}

.vti__input:focus~.field-placeholder {
  -webkit-transform: translateY(-29px) scale(0.75) translateX(-15%);
  transform: translateY(-29px) scale(0.75) translateX(-15%);
  border: 1px solid rgba(17, 85, 113, 1);
  padding-top: 1px;
  padding-bottom: 2px;
  background: #ffffff;
  border-radius: 0.25rem;
  padding-left: 8px;
  padding-right: 8px;
}

.vti__selection {
  z-index: 9999 !important;
  max-height: 200px !important;
  font-family: "ABeeZee", sans-serif !important;
}

.country-selector__input {
  font-family: "ABeeZee", sans-serif !important;
}

.country-selector__label {
  font-family: "ABeeZee", sans-serif !important;
  color: #115571 !important;
}

[class^='vue-tel'] {
  font-family: "ABeeZee", sans-serif !important;
  font-weight: 400;
  height: 60px !important;
  min-height: 60px !important;
  color: #115571 !important;
}

.vue-phone-number-input {
  position: relative;
  z-index: 30;
}

[class='vti__dropdown-list below'] {
  transform: translateY(26px);
}

.input-tel__input {
  background-color: inherit !important;
  cursor: inherit !important;
  font-size: 1.25rem !important;
  line-height: 1.75rem !important;
  padding: 15px !important;
  margin-left: 0px !important;
}

.input-tel__input::placeholder {
  font-size: 1rem !important;
}


.country-selector.lg {
  height: 60px !important;
  min-height: 60px !important;
}

.country-selector.lg .country-selector__input {
  height: 60px !important;
  min-height: 60px !important;
  color: #115571 !important;
}

.country-selector__country-flag {
  top: 25px !important;
}
</style>
