<template>
  <div class="jm-input-number">
    <a class="jm-input-number__action">
      <i class="jm-input-number__sub"></i>
    </a>
    <a class="jm-input-number__action">
      <i class="jm-input-number__add"></i>
    </a>
  </div>
</template>

<script>
export default {
  name: 'JmInputNumber',
  props: {
    value: {
      type: Number,
      default: 0
    },
    min: {
      type: Number,
      default: -Infinity
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
  }
}
</script>
