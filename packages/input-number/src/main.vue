<template>
  <div
    class="wd-input-number"
    :class="{
      'is-disabled': disabled,
      'is-without-input': withoutInput
    }"
  >
    <a class="wd-input-number__action" :class="{ 'is-disabled': minDisabled }" @click="sub">
      <i class="wd-input-number__sub"></i>
    </a>
    <div v-if="!withoutInput" class="wd-input-number__inner">
      <input
        class="wd-input-number__input"
        :style="{
          'width': inputWidth
        }"
        type="number"
        :min="min"
        :max="max"
        :disabled="disabled"
        :value="displayValue"
        @input="handleInput"
        @change="handleChange"
        @blur="handleBlur"
      />
      <i class="wd-input-number__input-border"></i>
    </div>
    <a class="wd-input-number__action" :class="{ 'is-disabled': maxDisabled }" @click="add">
      <i class="wd-input-number__add"></i>
    </a>
  </div>
</template>

<script>
export default {
  name: 'WdInputNumber',
  data () {
    return {
      inputValue: null
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
  watch: {
    value: {
      immediate: true,
      handler () {
        this.$emit('input', this.formatValue(this.value))
      }
    }
  },
  computed: {
    minDisabled () {
      return this.disabled || this.value <= this.min || this.changeStep(this.value, -this.step) < this.min
    },
    maxDisabled () {
      return this.disabled || this.value >= this.max || this.changeStep(this.value, this.step) > this.max
    },
    displayValue () {
      if (this.inputValue !== null) {
        return this.inputValue
      }

      return this.formatValue(this.value)
    }
  },
  methods: {
    toPrecision (value) {
      return parseFloat(Math.round(value * Math.pow(10, this.precision)) / Math.pow(10, this.precision))
    },
    getPrecision (value) {
      if (value === undefined) return 0
      const valueString = value.toString()
      const dotPosition = valueString.indexOf('.')
      let precision = 0
      if (dotPosition !== -1) {
        precision = valueString.length - dotPosition - 1
      }
      return precision
    },
    toStrictlyStep (value) {
      const stepPrecision = this.getPrecision(this.step)
      const precisionFactory = Math.pow(10, stepPrecision)
      return Math.round(value / this.step) * precisionFactory * this.step / precisionFactory
    },
    setValue (value) {
      if (this.stepStrictly) {
        value = this.toStrictlyStep(value)
      }
      if (value !== undefined && this.precision !== undefined) {
        value = this.toPrecision(value)
      }
      if (value > this.max) value = this.max
      if (value < this.min) value = this.min
      this.$emit('input', value)
      this.$emit('change', value)
    },
    changeStep (val, step) {
      val = Number(val)

      if (isNaN(val)) {
        return this.min
      }

      const precisionFactory = Math.pow(10, this.precision)

      return this.toPrecision((val * precisionFactory + step * precisionFactory) / precisionFactory)
    },
    sub () {
      if (this.minDisabled) return

      this.$emit('input', this.changeStep(this.value, -this.step))
    },
    add () {
      if (this.maxDisabled) return

      this.$emit('input', this.changeStep(this.value, this.step))
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
    formatValue (value) {
      value = Number(value)

      if (isNaN(value)) {
        value = this.min
      }

      if (this.stepStrictly) {
        value = this.toStrictlyStep(value)
      }

      if (this.precision) {
        value = value.toFixed(this.precision)
      }

      return value
    }
  }
}
</script>
