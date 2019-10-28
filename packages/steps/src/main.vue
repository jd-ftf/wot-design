<template>
  <div class="jm-steps" :class="{ 'is-vertical': vertical }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'JmSteps',
  provide () {
    return {
      steps: this
    }
  },
  data () {
    return {
      items: []
    }
  },
  props: {
    active: {
      type: Number,
      default: 0
    },
    vertical: Boolean,
    dot: Boolean,
    space: String,
    alignCenter: Boolean
  },
  computed: {
    canAlignCenter () {
      return !this.vertical && this.alignCenter
    }
  }
}
</script>
