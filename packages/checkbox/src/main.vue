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
          'wd-icon-check-bold': finalShape === 'circle' || finalShape === 'square'
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
      <i
        class="wd-checkbox__btn-check wd-icon-check-bold"
        v-if="finalShape === 'button' && isChecked"
      ></i>
      <span class="wd-checkbox__txt" v-if="$slots.default">
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

  data () {
    return {
      currentDisabled: ''
    }
  },

  props: {
    value: [String, Number, Boolean],
    shape: String,
    checkedColor: String,
    disabled: {
      type: Boolean,
      default: null
    },
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
        const { min, max, value, disabled } = this.checkboxGroup
        // 个数限制
        const sizeDisabled = Boolean((min && value.length <= min && this.isChecked) || (max && value.length >= max && !this.isChecked))
        return disabled ? (this.disabled !== null ? this.disabled : disabled) : (this.disabled || sizeDisabled)
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
        this.$emit('change', !this.isChecked)
        this.checkboxGroup.changeValue(this.value)
      } else {
        let newValue
        if (this.trueValue && this.falseValue) {
          newValue = this.isChecked ? this.falseValue : this.trueValue
        } else {
          newValue = !this.value
        }
        this.$emit('input', newValue)
        this.$emit('change', newValue)
      }
    }
  }
}
</script>
