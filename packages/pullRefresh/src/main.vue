<template>
  <div class="jm-pull-refresh">
    <div class="jm-pull-refresh__container" :class="{ 'dropping': topDropped }" :style="{ 'transform': transform }">
      <transition name="jm-slice-down" v-if="tipText">
        <div class="jm-pull-refresh__tip" v-show="tipShow">
          {{ tipText }}
        </div>
      </transition>
      <slot name="top">
        <div class="jm-pull-refresh__top">
          <jm-indicator v-if="topStatus == 'loading'" class="jm-pull-refresh__loading" type="spinner" size="16px" color="#a7a7a7" />
          <i
            class="jm-pull-refresh__arrow"
            :class="{
            'jm-icon-arrow-thin-down': topStatus == 'pull' || topStatus == 'drop',
            'jm-icon-arrow-thin-up': topStatus == 'drop'
          }"></i>
          <span class="jm-pull-refresh__text">{{ topText }}</span>
        </div>
      </slot>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import locale from '@/mixins/locale'
import { getScrollTargetEvent } from '@/utils'
import JmIndicator from '../../loading/src/indicator'

export default {
  name: 'JmPullRefresh',
  mixins: [locale],
  props: {
    value: Boolean,
    topPullText: String,
    topDropText: String,
    topLoadingText: String,
    distanceRatio: {
      type: Number,
      default: 2
    },
    topDistance: {
      type: Number,
      default: 50
    },
    maxDistance: {
      type: Number,
      default: 0
    },
    tipText: String,
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      scrollEventTarget: '',
      direction: '',
      topDropped: false,
      translate: 0,
      topText: '',
      startTouch: {
        x: 0,
        y: 0
      },
      startScrollTop: 0,
      endTouch: {
        x: 0,
        y: 0
      },
      topStatus: 'pull',
      tipShow: false,
      tipShowTimer: '',
      tipHideTimer: '',
      fingerStatus: 'out'
    }
  },
  computed: {
    transform () {
      return this.translate === 0 ? null : `translate3d(0, ${this.ease(this.translate)}px, 0)`
    }
  },
  components: {
    JmIndicator
  },
  watch: {
    value (val) {
      if (!val) {
        this.translate = 0
        setTimeout(() => {
          this.topStatus = 'pull'
        }, 200)

        if (this.tipText) {
          this.tipShowTimer = setTimeout(() => {
            this.tipShow = true
          }, 300)
          this.tipHideTimer = setTimeout(() => {
            this.tipShow = false
          }, 2000)
        }
      }
    },
    topStatus (val) {
      this.$emit('top-status-change', val)

      switch (val) {
        case 'pull':
          this.topText = this.topPullText || this.t('jmd.pullRefresh.topPull')
          break
        case 'drop':
          this.topText = this.topDropText || this.t('jmd.pullRefresh.topDrop')
          break
        case 'loading':
          this.topText = this.topLoadingText || this.t('jmd.pullRefresh.topLoading')
          break
      }
    }
  },
  methods: {
    getScrollTop (element) {
      if (element === window) {
        return Math.max(window.pageYOffset || 0, document.documentElement.scrollTop)
      } else {
        return element.scrollTop
      }
    },
    bindTouchEvent () {
      this.$el.addEventListener('touchstart', this.handleTouchStart)
      this.$el.addEventListener('touchmove', this.handleTouchMove)
      this.$el.addEventListener('touchend', this.handleTouchEnd)
      this.$el.removeEventListener('touchcancel', this.handleTouchEnd)
    },
    init () {
      this.topText = this.topPullText || this.t('jmd.pullRefresh.topPull')
      this.scrollEventTarget = getScrollTargetEvent(this.$el)
      this.bindTouchEvent()
    },
    handleTouchStart (event) {
      if (this.fingerStatus === 'in' && event.touches.length > 1) {
        this.handleTouchEnd()
      }

      this.fingerStatus = 'in'

      if (this.topStatus === 'loading') {
        return
      }

      this.startTouch = {
        x: event.touches[0].pageX,
        y: event.touches[0].pageY
      }
      this.startScrollTop = this.getScrollTop(this.scrollEventTarget)

      if (this.topStatus !== 'loading') {
        this.topStatus = 'pull'
        this.topDropped = false
      }
    },
    handleTouchMove (event) {
      if (this.topStatus === 'loading' || this.fingerStatus === 'out') {
        return
      }

      if (this.tipText) {
        this.tipShowTimer && clearTimeout(this.tipShowTimer)
        this.tipHideTimer && clearTimeout(this.tipHideTimer)
        this.tipShow = false
      }

      let elRect = this.$el.getBoundingClientRect()
      if (this.startTouch.y < elRect.top || this.startTouch.y > elRect.bottom || this.disabled) {
        return
      }

      this.endTouch = {
        x: event.touches[0].pageX,
        y: event.touches[0].pageY
      }

      let offsetLeft = this.endTouch.x - this.startTouch.x
      let offsetTop = this.endTouch.y - this.startTouch.y

      let distanceX = Math.abs(offsetLeft)
      let distanceY = Math.abs(offsetTop)

      let distance = (this.endTouch.y - this.startTouch.y) / this.distanceRatio
      this.direction = distance > 0 ? 'down' : 'up'
      if (this.direction === 'down' &&
        this.getScrollTop(this.scrollEventTarget) === 0 &&
        this.topStatus !== 'loading' &&
        (distanceX < 5 || (distanceX >= 5 && distanceY >= 1.73 * distanceX))) {
        event.preventDefault()

        if (this.maxDistance > 0) {
          this.translate = distance < this.maxDistance ? distance - this.startScrollTop : this.translate
        } else {
          this.translate = distance - this.startScrollTop
        }

        if (this.translate < 0) {
          this.translate = 0
        }

        this.topStatus = this.translate >= this.topDistance ? 'drop' : 'pull'

        this.$emit('dragging', this.translate)
      }

      this.$nextTick(() => {
        if (this.fingerStatus === 'in' && this.endTouch.y >= document.body.clientHeight - 20) {
          this.handleTouchEnd()
        }
      })
    },
    handleTouchEnd () {
      if (this.topStatus === 'loading' || this.fingerStatus === 'out') {
        return
      }

      if (this.direction === 'down' && this.getScrollTop(this.scrollEventTarget) === 0 &&
        this.translate > 0) {
        this.topDropped = true

        if (this.topStatus === 'drop') {
          this.translate = 50
          this.topStatus = 'loading'
          this.$emit('input', true)
          this.$emit('refresh')
        } else {
          this.translate = 0
          this.topStatus = 'pull'
        }
      }

      this.fingerStatus = 'out'

      this.$emit('drag-end', this.topStatus)
    },
    ease (height) {
      const { topDistance } = this
      return height < topDistance
        ? height
        : height < topDistance * 2
          ? Math.round(topDistance + (height - topDistance) / 2)
          : Math.round(topDistance * 1.5 + (height - topDistance * 2) / 4)
    }
  },
  mounted () {
    this.init()
  },
  beforeDestroy () {
    this.$el.removeEventListener('touchstart', this.handleTouchStart)
    this.$el.removeEventListener('touchmove', this.handleTouchMove)
    this.$el.removeEventListener('touchend', this.handleTouchEnd)
    this.$el.removeEventListener('touchcancel', this.handleTouchEnd)
  }
}
</script>
