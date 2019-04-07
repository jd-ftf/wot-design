<template>
  <div class="jm-pull-refresh">
    <div class="jm-pull-refresh__container" :class="{ 'dropping': topDropped }" :style="{ 'transform': transform }">
      <transition name="slice-down" v-if="showTip">
        <div class="jm-pull-refresh__tip" v-show="tipShow">
          {{ tipText }}
        </div>
      </transition>
      <slot name="top">
        <div class="jm-pull-refresh__top">
          <jm-indicator v-if="topStatus == 'loading'" class="jm-pull-refresh__loading" type="spinner" size="20px" color="#a7a7a7" />
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
import JmIndicator from '../../loading/src/indicator'

export default {
  name: 'JmPullRefresh',
  props: {
    value: Boolean,
    topPullText: {
      type: String,
      default: '下拉刷新'
    },
    topDropText: {
      type: String,
      default: '释放刷新'
    },
    topLoadingText: {
      type: String,
      default: '正在刷新'
    },
    distanceRatio: { // refresh组件 拖动距离与手指实际拖动的拖拽比例
      type: Number,
      default: 2
    },
    topDistance: { // 下拉刷新事件触发的距离
      type: Number,
      default: 50
    },
    maxDistance: { // refresh组件 可拖动的最大距离，0表示无限制
      type: Number,
      default: 0
    },
    showTip: { // 是否开启提示
      type: Boolean,
      default: false
    },
    tipText: String, // 提示文字
    canRefresh: { // 是否可拖动
      type: Boolean,
      default: true
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
      startTime: '',
      endTime: '',
      fingerStatus: 'out'
    }
  },
  computed: {
    transform () {
      return this.translate === 0 ? null : `translate3d(0, ${this.translate}px, 0)`
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

        if (this.showTip) {
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
          this.topText = this.topPullText
          break
        case 'drop':
          this.topText = this.topDropText
          break
        case 'loading':
          this.topText = this.topLoadingText
          break
      }
    }
  },
  methods: {
    getScrollTargetEvent (element) {
      let currentNode = element

      while (currentNode && currentNode.tagName !== 'HTML' && currentNode.tagName !== 'BODY' &&
        currentNode.nodeType === 1) {
        let overflowY = document.defaultView.getComputedStyle(currentNode).overflowY
        if (overflowY === 'auto' || overflowY === 'scroll') {
          return currentNode
        }

        currentNode = currentNode.parentNode
      }

      return window
    },
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
    },
    init () {
      this.topText = this.topPullText
      this.scrollEventTarget = this.getScrollTargetEvent(this.$el)
      this.bindTouchEvent()
    },
    handleTouchStart (event) {
      this.fingerStatus = 'in'

      if (this.topStatus === 'loading') {
        return
      }

      this.startTime = new Date().getTime()
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

      if (this.showTip) {
        this.tipShowTimer && clearTimeout(this.tipShowTimer)
        this.tipHideTimer && clearTimeout(this.tipHideTimer)
        this.tipShow = false
      }

      let elRect = this.$el.getBoundingClientRect()
      if (this.startTouch.y < elRect.top || this.startTouch.y > elRect.bottom || !this.canRefresh) {
        return
      }

      this.endTime = new Date().getTime()
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
    }
  },
  mounted () {
    this.init()
  },
  beforeDestroy () {
    this.$el.removeEventListener('touchstart', this.handleTouchStart)
    this.$el.removeEventListener('touchmove', this.handleTouchMove)
    this.$el.removeEventListener('touchend', this.handleTouchEnd)
  }
}
</script>
