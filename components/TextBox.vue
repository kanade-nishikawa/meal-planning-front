<template>
  <ValidationProvider v-slot="{ errors }" :rules="rules">
    <input v-model="inputValue" type="text" :maxlength="maxlength" :class="['leftContent', { inputClass }]" />
    <span :class="['rightContent', { spanClass }]">{{ spanContent }}</span>
    <span>{{ errors[0] }}</span>
  </ValidationProvider>
</template>

<script>
export default {
  props: {
    rules: {
      type: String,
      default: ''
    },
    value: {
      type: Number,
      required: true
    },
    maxlength: {
      type: String,
      default: ''
    },
    inputClass: {
      type: String,
      default: ''
    },
    spanClass: {
      type: String,
      default: ''
    },
    spanContent: {
      type: String,
      default: ''
    }
  },
  computed: {
    inputValue: {
      get () {
        return this.value;
      },
      set (value) {
        this.$emit('input', value);
      }
    }
  }
}
</script>
