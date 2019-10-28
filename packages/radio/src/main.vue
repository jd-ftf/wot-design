<template>
  <label
    class="jm-radio"
    :class="{
      'is-checked': isChecked,
      'is-dot': finalShape === 'dot',
      'is-button': finalShape === 'button',
      'is-disabled': finalDisabled
    }"
  >
    <span class="jm-radio__shape" :style="{ 'color': isChecked && !finalDisabled ? finalCheckedColor : '' }">
      <i
        class="jm-radio__check"
        :class="{
          'jm-icon-check-round': finalShape === 'circle'
        }"
        :style="{
          'color': isChecked && finalShape !== 'circle' && !finalDisabled ? finalCheckedColor : ''
        }"
      ></i>
      <input
        type="radio"
        class="jm-radio__input"
        :value="value"
        :checked="isChecked"
        :disabled="finalDisabled"
        @change="handleChange"
      />
    </span>
    <div class="jm-radio__label" :style="{ 'color': isChecked && finalShape === 'button' && !finalDisabled ? finalCheckedColor : '' }">
      <slot></slot>
    </div>
  </label>
</template>

<script>
export default {
  name: 'JmRadio',
  inject: ['radioGroup'],
  props: {
    value: [String, Number, Boolean],
    shape: String,
    checkedColor: String,
    disabled: Boolean
  },
  computed: {
    isChecked () {
      return this.radioGroup.value === this.value
    },
    finalShape () {
      return this.shape || this.radioGroup.shape
    },
    finalCheckedColor () {
      return this.checkedColor || this.radioGroup.checkedColor
    },
    finalDisabled () {
      return this.disabled || this.radioGroup.disabled || false
    }
  },
  methods: {
    handleChange () {
      this.radioGroup.changeValue(this.value)
    }
  }
}
</script>
