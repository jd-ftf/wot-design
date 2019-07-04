<template>
  <div
    class="jm-input-number"
    :class="{
      'is-disabled': disabled,
      'is-without-input': withoutInput
    }"
  >
    <a class="jm-input-number__action" :class="{ 'is-disabled': minDisabled }" @click="sub">
      <i class="jm-input-number__sub"></i>
    </a>
    <div v-if="!withoutInput" class="jm-input-number__inner">
      <input
        class="jm-input-number__input"
        type="number"
        :min="min"
        :max="max"
        :disabled="disabled"
        :value="displayValue"
        @input="handleInput"
        @change="handleChange"
        @blur="handleBlur"
      />
      <i class="jm-input-number__input-border"></i>
    </div>
    <a class="jm-input-number__action" :class="{ 'is-disabled': maxDisabled }" @click="add">
      <i class="jm-input-number__add"></i>
    </a>
  </div>
</template>

<script>
export default {
  name: 'JmInputNumber',
  data () {
    return {
      inputValue: ''
    }
  },
  props: {
    value: [Number, String],
    min: {
      type: Number,
      default: 1
    },
    max: {
      type: Number,
      default: Infinity
    },
    step: {
      type: Number,
      default: 1
    },
    stepStrictly: Boolean,
    precision: {
      type: Number,
      default: 0
    },
    disabled: Boolean,
    withoutInput: Boolean,
    inputWidth: String
  },
  computed: {
    minDisabled () {
      return this.disabled || this.value <= this.min || (this.value - this.step) < this.min
    },
    maxDisabled () {
      return this.disabled || this.value >= this.max || (this.value + this.step) > this.max
    },
    displayValue () {
      if (this.inputValue) {
        return this.inputValue
      }

      return this.value
    }
  },
  methods: {
    toPrecision (value) {
      return parseFloat(Math.round(value * Math.pow(10, this.precision)) / Math.pow(10, this.precision))
    },
    setValue (value) {
      if (value !== undefined && this.precision) {
        value = this.toPrecision(value)
      }
      if (value > this.max) value = this.max
      if (value < this.min) value = this.min
      this.$emit('input', value)
      this.$emit('change', value)
    },
    sub () {
      if (this.minDisabled) return

      this.$emit('input', parseFloat(this.value) - this.step)
    },
    add () {
      if (this.maxDisabled) return

      this.$emit('input', parseFloat(this.value) + this.step)
    },
    handleInput (event) {
      this.inputValue = event.target.value
    },
    handleChange (event) {
      let value = event.target.value === '' ? this.min : Number(event.target.value)
      this.setValue(value)
      this.inputValue = null
    },
    handleBlur () {
      this.$emit('blur')
    },
    format (value) {
      value = value || 0
      return parseFloat(value).toFixed(this.precision)
    }
  }
}
</script>
