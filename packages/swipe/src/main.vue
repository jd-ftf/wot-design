<template>
  <div class="wd-swipe" :class="{ 'is-vertical': vertical }" :style="{ height: height }">
    <div
      class="wd-swipe__container"
      :style="containerStyle"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
    >
      <slot></slot>
    </div>
    <slot name="indicators">
      <div v-if="!hideIndicators" class="wd-swipe__indicators">
        <i
          v-for="item in count"
          :key="item"
          class="wd-swipe__indicator"
          :class="item - 1 === countIndex ? 'is-active' : ''"
          :style="{
            'background': item - 1 === countIndex ? indicatorActiveColor : indicatorColor
          }"
        ></i>
      </div>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'WdSwipe',
  data () {
    return {
      index: 0,
      width: 0,
      computedHeight: null,
      items: [],
      timer: null,
      swiping: false,
      startX: 0,
      startY: 0,
      deltaX: 0,
      deltaY: 0,
      direction: '',
      startTime: '',
      endTime: ''
    }
  },
  props: {
    autoplay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 3000
    },
    duration: {
      type: Number,
      default: 500
    },
    initialIndex: {
      type: Number,
      default: 0
    },
    loop: {
      type: Boolean,
      default: true
    },
    hideIndicators: Boolean,
    indicatorColor: {
      type: String,
      default: 'rgba(255, 255, 255, 0.65)'
    },
    indicatorActiveColor: {
      type: String,
      default: '#fff'
    },
    touchable: {
      type: Boolean,
      default: true
    },
    vertical: Boolean,
    height: String,
    space: {
      type: Number,
      default: 0
    },
    animate: {
      type: Boolean,
      default: true
    },
    stopMoving: Boolean
  },
  watch: {
    items () {
      this.startPlay()
    }
  },
  computed: {
    count () {
      return this.items.length
    },
    computedWidth () {
      return this.width * (1 - this.space)
    },
    containerStyle () {
      let size = this.vertical ? 'height' : 'width'
      let delta = !this.canLoop && ((this.index === this.count - 1 && this.delta < 0) || (this.index === 0 && this.delta > 0))
        ? this.delta / 4
        : this.delta
      let spaceLeft = this.width * this.space / 4

      return {
        [size]: this.size * this.count + 'px',
        'padding-left': spaceLeft + 'px',
        transform: `translate${this.vertical ? 'Y' : 'X'}(${-((this.size + spaceLeft) * this.index - (this.animate ? delta : 0))}px)`,
        transition: `transform ${(this.swiping || !this.animate) ? 0 : this.duration}ms`
      }
    },
    size () {
      return this.vertical ? this.computedHeight : this.computedWidth
    },
    countIndex () {
      return (this.count + this.index) % this.count
    },
    delta () {
      return this.vertical ? this.deltaY : this.deltaX
    },
    currentDirection () {
      return this.vertical
        ? this.direction === 'vertical'
        : this.direction === 'horizontal'
    },
    canLoop () {
      return this.loop && !this.space && this.count > 1
    }
  },
  methods: {
    startPlay () {
      if (this.autoplay && this.count > 1) {
        this.clearTimer()
        this.timer = setInterval(() => {
          this.resetToCurrentPosition()
          setTimeout(() => {
            this.swiping = false
            this.moveTo({
              diffIndex: 1,
              emitChange: true
            })
          }, 30)
        }, this.interval)
      }
    },
    swipeTo (index) {
      this.clearTimer()
      this.resetToCurrentPosition()
      setTimeout(() => {
        this.swiping = false
        this.moveTo({
          diffIndex: index - this.index,
          emitChange: true
        })
      }, 30)
      this.startPlay()
    },
    prev () {
      this.swipeTo(this.index - 1)
    },
    next () {
      this.swipeTo(this.index + 1)
    },
    clearTimer () {
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
    },
    moveTo ({ diffIndex = 0, delta = 0, emitChange }) {
      let isLast = this.index === this.count - 1
      let isFirst = this.index === 0

      if ((!this.canLoop && ((isLast && diffIndex > 0) || (isFirst && diffIndex < 0)))) {
        return
      }

      if (this.items[0] && this.canLoop) {
        this.items[0].offset = isLast && (diffIndex > 0 || delta < 0) ? (this.size * this.count) : 0
      }

      if (this.items[this.count - 1] && this.canLoop) {
        this.items[this.count - 1].offset = isFirst && (diffIndex < 0 || delta > 0) ? (-this.size * this.count) : 0
      }

      this.index += diffIndex

      if (emitChange) {
        this.$emit('change', this.countIndex)
      }
    },
    resetToCurrentPosition () {
      this.swiping = true
      if (this.index === this.count) {
        this.moveTo({
          diffIndex: -this.count
        })
      } else if (this.index === -1) {
        this.moveTo({
          diffIndex: this.count
        })
      }
    },
    onTouchStart (event) {
      if (!this.touchable) return

      this.startTime = Date.now()
      this.clearTimer()
      this.startX = event.touches[0].clientX
      this.startY = event.touches[0].clientY
      if (!this.stopMoving) {
        this.resetToCurrentPosition()
      }
    },
    onTouchMove (event) {
      if (!this.touchable || !this.swiping) return

      let deltaX = event.touches[0].clientX - this.startX
      let deltaY = event.touches[0].clientY - this.startY

      this.direction = this.direction || this.getDirection(deltaX, deltaY)

      if (this.currentDirection) {
        event.preventDefault()
        this.deltaX = deltaX
        this.deltaY = deltaY
        this.moveTo({ delta: this.delta })
      }
    },
    onTouchEnd (event) {
      if (!this.touchable || !this.swiping) return

      this.swiping = false
      this.endTime = Date.now()

      if (this.currentDirection && this.delta) {
        // judge if should swipe to item
        let isEffectiveSwipe = Math.abs(this.delta) > this.size / 3 || Math.abs(this.delta) / (this.endTime - this.startTime) > 0.7
        isEffectiveSwipe && this.moveTo({
          diffIndex: this.delta < 0 ? 1 : -1,
          emitChange: true
        })
      }

      this.deltaX = 0
      this.deltaY = 0
      this.direction = ''

      this.startPlay()
    },
    getDirection (deltaX, deltaY) {
      let offsetX = Math.abs(deltaX)
      let offsetY = Math.abs(deltaY)
      let direction = ''

      if (offsetX > 5 || offsetY > 5) {
        direction = offsetX > offsetY ? 'horizontal' : 'vertical'
      }

      return direction
    }
  },
  mounted () {
    this.width = this.$el.clientWidth
    this.computedHeight = this.$el.clientHeight
    this.startPlay()
  },
  created () {
    this.index = this.initialIndex
  }
}
</script>
