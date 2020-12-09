<template>
  <div :class="{ 'wd-sticky': true, 'is-support-sticky': !shouldScroll }" :style="shouldScroll ? { height: height + 'px' } : stickyStyle">
    <div :style="shouldScroll && this.fixed ? stickyStyle : ''">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { isSupportSticky } from 'wot-design/src/utils'

export default {
  name: 'Sticky',
  data () {
    return {
      fixed: false,
      height: null,
      shouldScroll: !isSupportSticky,
      transformY: 0
    }
  },
  props: {
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
    },
    canSticky () {
      let currentNode = this.$el.parentNode

      while (currentNode &&
        currentNode.tagName !== 'HTML' &&
        currentNode.tagName !== 'BODY' &&
        currentNode !== window &&
        currentNode.nodeType === 1) {
        let overflow = document.defaultView.getComputedStyle(currentNode).overflow
        if (overflow !== 'visible') {
          return false
        }

        currentNode = currentNode.parentNode
      }

      return true
    }
  },
  methods: {
    onScroll () {
      this.height = this.$el.offsetHeight
      let stickyTop = this.$el.getBoundingClientRect().top

      let containerHeight = this.$el.parentNode.offsetHeight
      let containerBottom = this.$el.parentNode.getBoundingClientRect().bottom

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
    }
  },
  mounted () {
    if (!this.canSticky) {
      console.warn('[wot-design] warning(wd-sticky): if you want to use sticky, the overflow of the ancestor element cannot be auto, overlay, scroll and hidden')
      return
    }

    if (this.shouldScroll) {
      this.height = this.$el.clientHeight
      window.addEventListener('scroll', this.onScroll)
    }
  },
  beforeDestroy () {
    if (this.canSticky && this.shouldScroll) {
      window.removeEventListener('scroll', this.onScroll)
    }
  }
}
</script>
