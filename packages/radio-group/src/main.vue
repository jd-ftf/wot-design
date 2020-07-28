<template>
  <div
    class="wd-radio-group"
    :class="[
      { 'is-cell': cell },
      { 'is-button': cell && shape === 'button' },
      { 'is-small': size === 'small'}
    ]"
  >
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
    checkedTextColor: String,
    disabled: Boolean,
    cell: Boolean,
    // normal || small
    size: {
      type: String,
      default: 'normal'
    },
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
