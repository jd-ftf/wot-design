<template>
  <div class="wd-checkbox-group" :class="[{ 'is-cell': cell }, { 'is-button': cell && shape === 'button' }, size && `is-${size}`]">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'WdCheckboxGroup',
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
    disabled: Boolean,
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 0
    },
    cell: Boolean,
    button: Boolean,
    inline: Boolean,
    size: String
  },
  provide () {
    return {
      checkboxGroup: this
    }
  },
  methods: {
    changeValue (value) {
      let index = this.value.indexOf(value)
      if (index > -1) {
        this.value.splice(index, 1)
      } else {
        this.value.push(value)
      }
      this.$emit('input', this.value)
      this.$emit('change', this.value)
    }
  }
}
</script>
