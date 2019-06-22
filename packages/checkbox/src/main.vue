<template>
  <label
    class="jm-checkbox"
    :class="{
      'is-checked': isChecked,
      'is-button': finalShape === 'button',
      'is-disabled': finalDisabled
    }"
  >
    <span class="jm-checkbox__shape" :style="{ 'color': isChecked && !finalDisabled ? finalCheckedColor : '' }">
      <i
        class="jm-checkbox__check"
        :class="{
          'jm-icon-check-round': finalShape === 'circle' || finalShape === 'square'
        }"
        :style="{
          'color': isChecked && finalShape !== 'circle' && finalShape !== 'square' && !finalDisabled ? finalCheckedColor : ''
        }"
      ></i>
      <input
        type="checkbox"
        class="jm-checkbox__input"
        :name="name"
        :value="value"
        :checked="isChecked"
        :disabled="finalDisabled"
        @change="handleChange"
      />
    </span>
    <div class="jm-checkbox__label" :style="{ 'color': isChecked && finalShape === 'button' && !finalDisabled ? finalCheckedColor : '' }">
      <slot></slot>
    </div>
  </label>
</template>

<script>
export default {
  name: 'JmCheckbox',
  inject: {
    checkboxGroup: {
      default: ''
    }
  },
  props: {
    value: [String, Number, Boolean],
    name: String,
    shape: String,
    checkedColor: String,
    disabled: Boolean
  },
  computed: {
    isChecked () {
      if (this.checkboxGroup) {
        return this.checkboxGroup.value.indexOf(this.value) > -1
      } else {
        return this.value
      }
    },
    finalShape () {
      return this.shape || (this.checkboxGroup && this.checkboxGroup.shape) || 'circle'
    },
    finalCheckedColor () {
      return this.checkedColor || (this.checkboxGroup && this.checkboxGroup.checkedColor)
    },
    finalDisabled () {
      return this.disabled || (this.checkboxGroup && this.checkboxGroup.disabled) || false
    }
  },
  methods: {
    handleChange () {
      if (this.checkboxGroup) {
        this.checkboxGroup.changeValue(this.value)
        this.$emit('change', this.isChecked)
      } else {
        this.$emit('input', !this.value)
      }
    }
  }
}
</script>
