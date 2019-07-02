<template>
  <div class="jm-swipe-item" :style="computedSty">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'JmSwipeItem',
  data () {
    return {
      offset: 0
    }
  },
  computed: {
    computedSty () {
      const { computedWidth, computedHeight, vertical, width, space } = this.$parent

      return {
        width: computedWidth + 'px',
        'margin-left': width * space / 4 + 'px',
        height: computedHeight ? (computedHeight + 'px') : '100%',
        transform: `translate${vertical ? 'Y' : 'X'}(${this.offset}px)`
      }
    }
  },
  beforeCreate () {
    this.$parent.items.push(this)
  },
  destroyed () {
    this.$parent.items.slice(this.$parent.items.indexOf(this), 1)
  }
}
</script>
