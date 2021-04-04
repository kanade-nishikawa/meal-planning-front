<template>
  <ValidationProvider v-slot="{ errors }" :rules="rules">
    <input v-model="inputValue" type="number" :maxlength="maxlength" :max="max" :min="min" :class="['leftContent', inputClass]" />
    <span :class="['rightContent', { spanClass }]">{{ spanContent }}</span>
    <div v-if="errors.length" class="error">
      {{ errors[0] }}
    </div>
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
      type: String,
      default: null
    },
    maxlength: {
      type: Number,
      default: null
    },
    max: {
      type: Number,
      default: null
    },
    min: {
      type: Number,
      default: null
    },
    inputClass: {
      type: Object,
      default: () => ({})
    },
    spanClass: {
      type: Object,
      default: () => ({})
    },
    spanContent: {
      type: String,
      default: ''
    }
  },
  computed: {
    inputValue: {
      get () {
        return this.$props.value;
      },
      set (val) {
        this.$emit('input', val);
      }
    }
  }
};
</script>
