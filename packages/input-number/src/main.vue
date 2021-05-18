<template>
  <div
    class="wd-input-number"
    :class="{
      'is-disabled': disabled,
      'is-without-input': withoutInput
    }"
  >
    <a class="wd-input-number__action" :class="{ 'is-disabled': minDisabled }" @click="sub">
      <i class="wd-icon-decrease wd-input-number__action-icon"></i>
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
        :placeholder="placeholder"
        @input="handleInput"
        @change="handleChange"
        @blur="handleBlur"
      />
      <i class="wd-input-number__input-border"></i>
    </div>
    <a class="wd-input-number__action" :class="{ 'is-disabled': maxDisabled }" @click="add">
      <i class="wd-icon-add wd-input-number__action-icon"></i>
    </a>
  </div>
</template>

<script>
import { getType } from 'wot-design/src/utils'

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
    inputWidth: String,
    allowNull: Boolean,
    placeholder: String
  },
  watch: {
    value: {
      immediate: true,
      handler () {
        this.$emit('input', this.formatValue(this.value))
      }
    },
    max () {
      this.setValue(this.value)
    },
    min () {
      this.setValue(this.value)
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
      const type = getType(value)
      if (!this.allowNull || (type !== 'null' && type !== 'undefined' && value !== '')) {
        if (this.stepStrictly) {
          value = this.toStrictlyStep(value)
        }
        value = this.toPrecision(value)
        if (value > this.max) value = this.max
        if (value < this.min) value = this.min
      }

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

      const value = this.changeStep(this.value, -this.step)
      this.$emit('input', value)
      this.$emit('sub', value)
    },
    add () {
      if (this.maxDisabled) return

      const value = this.changeStep(this.value, this.step)
      this.$emit('input', value)
      this.$emit('add', value)
    },
    handleInput (event) {
      this.inputValue = event.target.value
    },
    handleChange (event) {
      let value = event.target.value === '' ? (this.allowNull ? '' : this.min) : Number(event.target.value)
      this.setValue(value)
      this.inputValue = null
    },
    handleBlur () {
      this.$emit('blur')
    },
    formatValue (value) {
      const type = getType(value)

      if (this.allowNull && (type === 'null' || type === 'undefined' || value === '')) {
        return ''
      }

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
