<template>
  <div :class="{ 'wd-sticky': true, 'is-support-sticky': !shouldScroll }" :style="shouldScroll ? { height: height + 'px' } : stickyStyle">
    <div :style="shouldScroll && this.fixed ? stickyStyle : ''">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { isSupportSticky, getScrollTargetEvent } from 'wot-design/src/utils'

export default {
  name: 'Sticky',
  data () {
    return {
      fixed: false,
      scroller: null,
      height: null,
      shouldScroll: !isSupportSticky,
      transformY: 0
    }
  },
  props: {
    container: null,
    zIndex: {
      type: Number,
      default: 9
    },
    offsetTop: {
      type: Number,
      default: 0
    }
  },
  computed: {
    stickyStyle () {
      let style = {
        position: this.shouldScroll
          ? 'fixed'
          : '',
        top: (!this.shouldScroll || this.fixed) ? this.offsetTop + 'px' : 0,
        zIndex: this.zIndex,
        width: '100%',
        transform: `translate(0, ${this.transformY}px)`
      }

      return style
    }
  },
  methods: {
    onScroll () {
      this.height = this.$el.offsetHeight
      let stickyTop = this.$el.getBoundingClientRect().top

      if (this.container) {
        let containerHeight = this.container.offsetHeight
        let containerBottom = this.container.getBoundingClientRect().bottom

        // if is in container
        if (this.height + this.offsetTop < containerHeight) {
          if (stickyTop < this.offsetTop && containerBottom > 0) {
            this.fixed = true
            let distance = containerBottom - (this.height + this.offsetTop)
            distance < 0 && (this.transformY = distance)
          } else {
            this.fixed = false
            this.transformY = 0
          }
        }
        return
      }

      if (stickyTop < this.offsetTop) {
        this.fixed = true
      } else {
        this.fixed = false
      }
    }
  },
  mounted () {
    if (this.shouldScroll) {
      this.height = this.$el.clientHeight
      this.scroller = getScrollTargetEvent(this.$el)
      this.scroller.addEventListener('scroll', this.onScroll)
    }
  },
  beforeDestroy () {
    this.scroller && this.scroller.removeEventListener('scroll', this.onScroll)
  }
}
</script>
