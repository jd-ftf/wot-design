<template>
  <div class="wd-radio-group">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'WdRadioGroup',
  props: {
    value: [String, Number, Boolean],
    shape: {
      type: String,
      default: 'dot'
    },
    checkedColor: String,
    disabled: Boolean,
    inline: Boolean
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
