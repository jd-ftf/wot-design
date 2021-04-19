<template>
  <div class="wd-swipe-action">
    <!--滑动操作容器-->
    <div class="wd-swipe-action__wrapper" :style="wrapperStyle">
      <!--左侧滑动按钮容器-->
      <div class="wd-swipe-action__left" ref="left" @touchstart.capture="onClick($event,'left')">
        <slot name="left"></slot>
      </div>
      <!--自定义内容-->
      <div class="wd-swipe-action__content" @touchstart.capture="onClick($event,'inside')">
        <slot></slot>
      </div>
      <!--右侧滑动按钮容器-->
      <div class="wd-swipe-action__right" ref="right" @touchstart.capture="onClick($event,'right')">
        <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import Touch from 'main/mixins/touch'
import { on, off } from 'main/utils/event'

export default {
  name: 'WdSwipeAction',
  mixins: [Touch],
  props: {
    value: {
      type: String,
      default: 'close'
    },
    beforeClose: {
      type: Function,
      default (v) { return v }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    autoClose: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    value (value, old) {
      this.changeState(value, old)
    }
  },
  data () {
    return {
      // 左按钮宽度
      leftWidth: 0,
      // 右按钮宽度
      rightWidth: 0,
      // 触摸事件开始时wrapper的偏移量
      originOffset: 0,
      // wrapper 当前的偏移量
      wrapperOffset: 0,
      // 是否处于触摸中
      touching: false
    }
  },
  computed: {
    /**
     * @description wrapper 样式计算函数
     */
    wrapperStyle () {
      return {
        transform: `translate3d(${this.wrapperOffset}px, 0, 0)`,
        transitionDuration: this.touching ? '0s' : '.6s'
      }
    }
  },
  methods: {
    /**
     * @description 通过 v-model 切换 滑动按钮
     * @param {String} state 要切换到的状态
     * @param {String} state 切换之前的状态
     */
    changeState (state, old) {
      const { leftWidth, rightWidth } = this
      // disabled 状态、左右按钮都为空时此方法无任何意义
      if (
        this.disabled ||
        (leftWidth === 0 && rightWidth === 0)
      ) {
        return
      }
      switch (state) {
        case 'close':
          this.close('state', old)
          break
        case 'left':
          this.wrapperOffset = leftWidth
          break
        case 'right':
          this.wrapperOffset = -rightWidth
          break
      }
    },
    /**
     * @description 关闭操过按钮，并在合适的时候调用 beforeClose
     */
    close (reason, position) {
      // 现在的偏移量为 0 ,close函数没必要使用
      if (this.wrapperOffset === 0) return
      // 原来的偏移量——>现在的偏移量
      if (reason === 'swipe' && this.originOffset === 0) {
        // offset：0 ——> offset：0
        this.wrapperOffset = 0
        return
      } else if (reason === 'swipe' && this.originOffset > 0) {
        // offset > 0 ——> offset：0
        position = 'left'
      } else if (reason === 'swipe' && this.originOffset < 0) {
        // offset < 0 ——> offset：0
        position = 'right'
      }

      if (reason && position) {
        this.beforeClose(reason, position)
      }

      this.wrapperOffset = 0

      // 同步给父组件
      this.$emit('input', 'close')
    },
    /**
     * @description 时时刻刻监听左/右滑动按钮的尺寸，并保留更新记录
     * @param {Element} el 监听的元素
     * @param {Function} cb 回调，注意此处this指向mutationObserver，访问Vue实例建议使用监听函数
     */
    observerSlotSize (el, cb) {
      if (!el) return
      const mutationObserver = new MutationObserver(cb)
      mutationObserver.observe(el, {
        attributes: true,
        attributeFilter: ['style'],
        subtree: true
      })
      this.observerList.push(mutationObserver)
    },
    /**
     * @description 滑动开始的事件句柄
     */
    onTouchStart (event) {
      if (this.disabled) return
      // 记录触摸开始时的偏移量，以备后用
      this.originOffset = this.wrapperOffset

      this.touchStart(event)
    },
    /**
     * @description 滑动开始的事件句柄
     */
    onTouchMove (event) {
      if (this.disabled) return
      this.touchMove(event)

      if (this.direction !== 'horizontal') {
        return
      }
      // 有横向滚动时，句柄才会生效。同时阻止一下事件穿透。
      event.stopPropagation()
      const { leftWidth, rightWidth } = this
      const offset = this.originOffset + this.deltaX

      // 如果需要想滑出来的按钮不存在，对应的按钮肯定滑不出来，容器处于初始状态。此时需要模拟一下位于此处的start事件。
      if (
        (leftWidth === 0 && offset > 0) ||
        (rightWidth === 0 && offset < 0)
      ) {
        this.wrapperOffset = 0
        return this.onTouchStart(event)
      }
      // 按钮已经展示完了，再滑动没有任何意义，相当于滑动结束。此时需要模拟一下位于此处的start事件。
      if (leftWidth !== 0 && offset >= leftWidth) {
        this.wrapperOffset = leftWidth
        return this.onTouchStart(event)
      } else if (rightWidth !== 0 && -offset >= rightWidth) {
        this.wrapperOffset = -rightWidth
        return this.onTouchStart(event)
      }
      // 本次行为为滑动跟随手指
      this.touching = true
      // 本次滑动，wrapper应该设置的偏移量
      this.wrapperOffset = offset
    },
    /**
     * @description 滑动结束的事件句柄
     */
    onTouchEnd () {
      if (this.disabled) return

      this.touching = false
      // 滑出"操作按钮"的阈值
      const THRESHOLD = 0.3

      const { leftWidth, rightWidth } = this
      if (
        this.originOffset < 0 && // 之前展示的是右按钮
        this.wrapperOffset < 0 &&// 目前仍然是右按钮
        this.wrapperOffset - this.originOffset < rightWidth * THRESHOLD// 并且滑动的范围不超过右边框阀值
      ) {
        this.wrapperOffset = -rightWidth // 回归右按钮
        this.$emit('input', 'right')
      } else if (
        this.originOffset > 0 &&// 之前展示的是左按钮
        this.wrapperOffset > 0 &&// 现在仍然是左按钮
        this.originOffset - this.wrapperOffset < leftWidth * THRESHOLD// 并且滑动的范围不超过左按钮阀值
      ) {
        this.wrapperOffset = leftWidth // 回归左按钮
        this.$emit('input', 'left')
      } else if (
        rightWidth > 0 &&
        this.originOffset >= 0 &&// 之前是初始状态或者展示左按钮显
        this.wrapperOffset < 0 &&// 现在展示右按钮
        Math.abs(this.wrapperOffset) > rightWidth * THRESHOLD// 视图中已经展示的右按钮长度超过阀值
      ) {
        this.wrapperOffset = -rightWidth
        this.$emit('input', 'right')
      } else if (
        leftWidth > 0 &&
        this.originOffset <= 0 &&// 之前初始状态或者右按钮显示
        this.wrapperOffset > 0 &&// 现在左按钮
        Math.abs(this.wrapperOffset) > leftWidth * THRESHOLD// 视图中已经展示的左按钮长度超过阀值
      ) {
        this.wrapperOffset = leftWidth
        this.$emit('input', 'left')
      } else {
        // 回归初始状态
        this.close('swipe')
      }
    },
    /**
     * @description 滑动结束的事件句柄
     */
    onClick (event, position) {
      if (
        this.disabled ||
        this.wrapperOffset === 0
      ) {
        return
      }
      // 点击外部，关闭滑动操作
      if (!this.$el.contains(event.target)) {
        if (!this.autoClose) return
        position = 'outside'
      }

      // click 了 position 导致了 close 滑动操作
      this.close('click', position)
      // 触发父组件的click事件
      this.$emit('click', position)
    },
    /**
     * @description 初始化事件绑定
     */
    bindTouchEvent (el) {
      const { onTouchStart, onTouchMove, onTouchEnd, onClick } = this
      // Vue 2.6 模板绑定touch事件有毛病(参考官方issue)，此处手动绑定

      on(el, 'touchstart', onTouchStart)
      on(el, 'touchmove', onTouchMove)

      on(el, 'touchend', onTouchEnd)
      on(el, 'touchcancel', onTouchEnd)

      // 组件以外的 click 会导致滑动操作关闭
      on(document, 'touchstart', onClick)
    },
    /**
     * @description addEventListener 对 el 保持引用，此处需要手动移除事件
     */
    removeTouchEvent (el) {
      const { onTouchStart, onTouchMove, onTouchEnd, onClick } = this
      // Vue 2.6 模板绑定touch事件有毛病(参考官方issue)，此处手动绑定

      off(el, 'touchstart', onTouchStart)
      off(el, 'touchmove', onTouchMove)

      off(el, 'touchend', onTouchEnd)
      off(el, 'touchcancel', onTouchEnd)
      off(document, 'click', onClick)
    },
    /**
     * @description 时时刻刻监听左/右滑动按钮的尺寸，并保留更新记录
     */
    bindObserver () {
      const leftElement = this.$refs['left']
      const rightElement = this.$refs['right']
      this.observerSlotSize(leftElement, () => {
        this.leftWidth = leftElement.getBoundingClientRect().width
      })
      this.observerSlotSize(rightElement, () => {
        this.rightWidth = rightElement.getBoundingClientRect().width
      })
      this.leftWidth = leftElement.getBoundingClientRect().width
      this.rightWidth = rightElement.getBoundingClientRect().width
    }
  },
  created () {
    this.observerList = []
  },
  mounted () {
    this.bindTouchEvent(this.$el)
    this.bindObserver()
    this.touching = true
    this.changeState(this.value)
    this.touching = false
  },
  destroyed () {
    this.observerList.forEach(observer => {
      observer.disconnect()
    })
    this.removeTouchEvent(this.$el)
  }
}
</script>
