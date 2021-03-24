<template>
  <ul>
    <li v-for="option in options" :key="option.value">
      <ValidationProvider v-slot="{ errors }" :name="name" rules="required">
        <label>
          <input :name="name" type="radio" :value="option.value" :checked="checked === option.value" @change="updateValue(option)" />
          {{ option.label }}
          <div class="check" />
        </label>
        <div v-if="errors.length" class="error">
          {{ errors[0] }}
        </div>
      </ValidationProvider>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    rules: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default: () => []
    },
    name: {
      type: String,
      default: ''
    },
    checked: {
      type: String,
      default: ''
    }
  },
  methods: {
    updateValue (option) {
      this.$emit('input', option.value);
    }
  }
}
</script>
