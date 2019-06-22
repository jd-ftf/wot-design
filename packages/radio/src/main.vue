<template>
  <label class="jm-radio" :class="{'is-checked': isChecked}">
    <span class="jm-radio__shape">
      <i class="jm-radio__check"></i>
      <input
        type="radio"
        class="jm-radio__input"
        :value="value"
        :checked="isChecked"
        @change="handleChange"
      />
    </span>
    <span class="jm-radio__label">
      <slot></slot>
    </span>
  </label>
</template>

<script>
export default {
  name: 'JmRadio',
  inject: ['radioGroup'],
  props: {
    value: [String, Number, Boolean],
    name: String,
    shape: String,
    dot: Boolean,
    checkedColor: String
  },
  computed: {
    isChecked () {
      return this.radioGroup.value === this.value
    },
    finalShape () {
      return this.shape || this.radioGroup.shape
    },
    finalDot () {
      return this.dot || this.radioGroup.dot
    },
    finalCheckedColor () {
      return this.checkedColor || this.radioGroup.checkedColor
    }
  },
  methods: {
    handleChange () {
      this.radioGroup.changeValue(this.value)
    }
  }
}
</script>
