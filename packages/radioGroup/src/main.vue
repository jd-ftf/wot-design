<template>
  <div class="jm-radio-group">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'JmRadioGroup',
  props: {
    value: [String, Number, Boolean],
    shape: {
      type: String,
      default: 'circle'
    },
    dot: Boolean,
    checkedColor: String
  },
  provide () {
    return {
      radioGroup: this
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
