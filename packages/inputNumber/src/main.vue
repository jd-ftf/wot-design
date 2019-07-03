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
        :value="currentValue"
        @input="handleInput"
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
      currentValue: ''
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
      handler (value) {
        this.currentValue = value
      }
    }
  },
  computed: {
    minDisabled () {
      return this.disabled || this.value <= this.min || (this.value - this.step) < this.min
    },
    maxDisabled () {
      return this.disabled || this.value >= this.max || (this.value + this.step) > this.max
    }
  },
  methods: {
    sub () {
      if (this.minDisabled) return

      this.$emit('input', parseFloat(this.value) - this.step)
    },
    add () {
      if (this.maxDisabled) return

      this.$emit('input', parseFloat(this.value) + this.step)
    },
    handleInput (event) {
      let value = parseFloat(event.target.value)
      this.$emit('input', value)
    },
    handleBlur () {
      if (!this.value) {
        this.$emit('input', this.min)
      }
    },
    format (value) {
      value = value || 0
      return parseFloat(value).toFixed(this.precision)
    }
  }
}
</script>
