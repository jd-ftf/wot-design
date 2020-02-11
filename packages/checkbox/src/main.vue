<template>
  <label
    class="wd-checkbox"
    :class="{
      'is-checked': isChecked,
      'is-button': finalShape === 'button',
      'is-disabled': finalDisabled,
      'is-inline': inline
    }"
  >
    <span
      class="wd-checkbox__shape"
      :class="{
        'is-square': finalShape === 'square'
      }"
      :style="{ 'color': isChecked && !finalDisabled ? finalCheckedColor : '' }"
    >
      <i
        class="wd-checkbox__check"
        :class="{
          'wd-icon-check-round': finalShape === 'circle' || finalShape === 'square'
        }"
        :style="{
          'color': isChecked && finalShape !== 'circle' && finalShape !== 'square' && !finalDisabled ? finalCheckedColor : ''
        }"
      ></i>
      <input
        type="checkbox"
        class="wd-checkbox__input"
        :value="value"
        :checked="isChecked"
        :disabled="finalDisabled"
        @change="toggle"
      />
    </span>
    <div
      class="wd-checkbox__label"
      :style="{ 'color': isChecked && finalShape === 'button' && !finalDisabled ? finalCheckedColor : '' }"
    >
      <i class="wd-checkbox__btn-check wd-icon-check" v-if="finalShape === 'button' && isChecked"></i>
      <span class="wd-checkbox__txt">
        <slot></slot>
      </span>
    </div>
  </label>
</template>

<script>
export default {
  name: 'WdCheckbox',
  inject: {
    checkboxGroup: {
      default: ''
    }
  },
  props: {
    value: [String, Number, Boolean],
    shape: String,
    checkedColor: String,
    disabled: Boolean,
    trueValue: [String, Number],
    falseValue: [String, Number]
  },
  computed: {
    isChecked () {
      if (this.checkboxGroup) {
        return this.checkboxGroup.value.indexOf(this.value) > -1
      } else if (this.trueValue && this.falseValue) {
        return this.value === this.trueValue
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
      if (this.checkboxGroup) {
        let { min, max, value, disabled } = this.checkboxGroup
        let sizeDisabled = false
        if (min && value.length <= min && this.isChecked) {
          sizeDisabled = true
        } else if (max && value.length >= max && !this.isChecked) {
          sizeDisabled = true
        }
        return this.disabled || disabled || sizeDisabled || false
      } else {
        return this.disabled || false
      }
    },
    inline () {
      return this.checkboxGroup.inline
    }
  },
  methods: {
    toggle () {
      if (this.checkboxGroup) {
        this.checkboxGroup.changeValue(this.value)
      } else if (this.trueValue && this.falseValue) {
        this.$emit('input', this.isChecked ? this.falseValue : this.trueValue)
      } else {
        this.$emit('input', !this.value)
      }
      this.$emit('change', this.value)
    }
  }
}
</script>
