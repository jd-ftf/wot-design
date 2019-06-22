<template>
  <div class="jm-checkbox-group">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'JmCheckboxGroup',
  props: {
    value: {
      type: Array,
      default () {
        return []
      }
    },
    shape: {
      type: String,
      default: 'circle'
    },
    checkedColor: String,
    disabled: Boolean
  },
  provide () {
    return {
      checkboxGroup: this
    }
  },
  methods: {
    changeValue (value) {
      this.$emit('input', value)
      this.$emit('change', value)
    }
  }
}
</script>
