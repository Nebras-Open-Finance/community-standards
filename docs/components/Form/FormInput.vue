<template>
  <div class="form-wrapper-outer">
    <div id="input-wrapper" :class="field_wrapper">
      <input :ref="inputRef" :name="name" :id="inputUUID" v-model="data" />
      <div class="field-placeholder" @click="focus()">
        <span>{{ placeholder }}</span>
      </div>
    </div>
    <!-- <div class="hidden sm:block text-3xl font-semibold absolute transform -translate-x-9 -translate-y-13"
         :class="{'text-base-100': error === false,
                    'text-error': error === true     
        }"
     v-if="required === true">
      &#x2733;
    </div> -->
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";

export default {
  props: {
    name: {
      type: String,
      default: "",
    },
    input: {
      type: [String, Number],
      default: undefined,
    },
    inputRef: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    error: {
      type: Boolean,
      default: undefined,
    },
  },
  data() {
    return {
      data: undefined,
    };
  },
  created() {
    this.data = this.input;
  },
  computed: {
    inputUUID() {
      return uuidv4();
    },
    field_wrapper() {
      let classConcat = "";
      if (this.data) {
        classConcat = classConcat.concat("-hasValue");
      }
      if (this.error === true) {
        classConcat = classConcat.concat("-error");
      }
      return "field-wrapper".concat(classConcat);
    },
  },
  methods: {
    focus() {
      document.getElementById(this.inputUUID).focus();
    },
    outputData() {
      this.$emit("output", {
        data: this.data,
      });
    },
  },
  watch: {
    input(value) {
      this.data = value;
    },
    data() {
      this.outputData();
    },
  },
};
</script>

<style scoped>
[class^="field-wrapper"] {
  position: relative;
  margin-bottom: 5px;
}

[class^="field-wrapper"] input,
[class^="field-wrapper"] textarea,
[class^="field-wrapper"] ul {
  font-size: 1rem;
  line-height: 1.5rem;
  border: 1px solid #dadce0;
  box-shadow: 0 0 4px rgba(17, 85, 113, 1);
  padding: 15px;
  padding-left: 24px;
  border-radius: 4px;
  width: 100%;
  color: rgba(17, 85, 113, 1) !important; /* primary colour */
  border-color: rgba(17, 85, 113, 1); /* primary colour */
}

[class*="-disabled"] input,
[class*="-disabled"] textarea {
  background-color: rgba(224, 224, 224, 1);
  cursor: not-allowed;
}

[class*="-error"] input,
[class*="-error"] textarea,
[class*="-error"] ul {
  box-shadow: 0 0 4px rgba(255, 5, 5, 1) !important;
  border-color: rgba(255, 5, 5, 1) !important;
}

[class^="field-wrapper"] input:focus,
[class^="field-wrapper"] textarea:focus,
[class^="field-wrapper"] ul:focus {
  outline: none !important;
  border: 2px solid rgba(17, 85, 113, 1);
}

[class*="-error"] input:focus,
[class*="-error"] textarea:focus,
[class*="-error"] ul:focus {
  outline: none !important;
  border: 2px solid, rgba(255, 5, 5, 1);
}

[class*="-warning"] input:focus,
[class*="-warning"] textarea:focus,
[class*="-warning"] ul:focus {
  outline: none !important;
  border: 2px solid, rgba(255, 147, 5, 1);
}

[class^="field-wrapper"] .field-placeholder {
  font-size: 16px;
  position: absolute;
  /* background: #fff; */
  top: 19px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #80868b;
  left: 8px;
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

[class^="field-wrapper"] input:not([disabled]):focus ~ .field-placeholder,
[class^="field-wrapper"] textarea:not([disabled]):focus ~ .field-placeholder,
[class^="field-wrapper-hasValue"] .field-placeholder {
  color: rgba(17, 85, 113, 1); /* primary colour */
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

[class^="field-wrapper"] input:-webkit-autofill,
[class^="field-wrapper"] input:-webkit-autofill:hover,
[class^="field-wrapper"] input:-webkit-autofill:focus,
[class^="field-wrapper"] input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 30px white inset, 0 0 4px rgba(17, 85, 113, 1) !important;
  -webkit-text-fill-color: rgba(17, 85, 113, 1);
}

[class*="-disabled"] input:-webkit-autofill,
[class*="-disabled"] input:-webkit-autofill:hover,
[class*="-disabled"] input:-webkit-autofill:focus,
[class*="-disabled"] input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 30px rgba(224, 224, 224, 1) inset,
    0 0 4px rgba(17, 85, 113, 1) !important;
  -webkit-text-fill-color: rgba(17, 85, 113, 1);
}
</style>
