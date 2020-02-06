<template>
  <div v-clickoutside="handleOutsideClick" style="display: inline-block;">
    <!-- 控制对象 -->
    <span ref="trigger" @click="toggle">
      <slot></slot>
    </span>
    <!-- 文字提示 -->
    <transition name="wd-fade">
      <div
        class="wd-tooltip"
        :class="'is-' + effect"
        ref="tooltip"
        :style="popStyle"
        v-show="showPop"
      >
        <div :class="arrowClass" v-if="visibleArrow"></div>
        <div>
          <!-- 普通模式传入文字 mode = "normal" -->
          <div v-if="showText === 'normal'" class="wd-tooltip__inner">{{content}}</div>
          <!-- 列表模式 mode = "menu" -->
          <div v-if="showText === 'menu'" class="wd-tooltip__menu">
            <div
              v-for="(item,index) in content"
              :key="index"
              @click="linkTo(item,index)"
              class="wd-tooltip__menu-inner"
              :style="{'border-top':index === 0 ? 'none' : '1px solid ' + lineColor }"
            >
              <wd-icon :name="item.name" class="wd-tooltip__icon"></wd-icon>
              <span>{{item.content}}</span>
            </div>
          </div>
          <!-- 内容自定义插槽 -->
          <slot name="content" v-else></slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Clickoutside from '../../../src/utils/clickoutside'

export default {
  name: 'WdTooltip',
  data () {
    return {
      position: {
        top: 0,
        left: 0
      },
      showPop: true,
      popStyle: {}
    }
  },
  props: {
    placement: {
      type: String,
      default: 'bottom'
    },
    offset: {
      type: Number,
      default: 5
    },
    value: Boolean,
    openDelay: {
      type: Number,
      default: 300
    },
    disabled: Boolean,
    effect: {
      type: String,
      default: 'dark'
    },
    content: [String, Array],
    visibleArrow: {
      type: Boolean,
      default: true
    },
    closeOutside: {
      type: Boolean,
      default: true
    },
    mode: {
      type: String,
      default: 'normal'
    }
  },
  directives: { Clickoutside },
  computed: {
    arrowClass () {
      return this.visibleArrow && {
        'wd-tooltip__arrow': true,
        'wd-tooltip__arrow-up': this.placement === 'bottom' || this.placement === 'bottom-start' || this.placement === 'bottom-end',
        'wd-tooltip__arrow-right': this.placement === 'left' || this.placement === 'left-start' || this.placement === 'left-end',
        'wd-tooltip__arrow-left': this.placement === 'right' || this.placement === 'right-start' || this.placement === 'right-end',
        'wd-tooltip__arrow-down': this.placement === 'top' || this.placement === 'top-start' || this.placement === 'top-end'
      }
    },
    showText () {
      return !this.$slots.content &&
        (this.mode === 'normal' ? 'normal' : (this.mode === 'menu' ? 'menu' : 'normal'))
    },
    lineColor () {
      return this.effect === 'light' ? 'rgba(255, 255, 255, .5)' : '#ebeef5'
    }
  },
  watch: {
    value (newVal) {
      if (newVal === this.showPop) {
        // eslint-disable-next-line no-useless-return
        return
      } else {
        this.showPop = this.value
        if (this.showPop) {
          this.$nextTick(() => {
            this.init(true)
          })
        }
      }
    },
    showPop () {
      this.$emit(`${this.showPop === true ? 'on-show' : 'on-hide'}`)
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.init()
      window.addEventListener('resize', this.reset)
    })
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.reset)
  },
  methods: {
    reset () {
      if (this.showPop) {
        this.init(true)
      }
    },
    /**
     * @param isReset 判定是否是点开时重定位调用，否则为初始化(窗口重设)调用（避免初始位置变更时出现滑动）
     */
    init (isReset) {
      if (!isReset) {
        this.showPop = false
      }
      // 目标对象 dom（被跟随）
      const trigger = this.$refs.trigger.children[0]
      // 文字提示 dom
      const tooltip = this.$refs.tooltip
      // 顶部相对屏幕位置
      const scrollTop = window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop

      // 定位元素，考虑滚动该高度，当前参照对象的距离顶部高度，左侧相对屏幕距离
      switch (this.placement) {
        case 'top':
          this.position.left = trigger.offsetLeft - tooltip.offsetWidth / 2 + trigger.offsetWidth / 2
          this.position.top = scrollTop + trigger.getBoundingClientRect().top - tooltip.offsetHeight - this.offset
          break
        case 'top-start':
          this.position.left = trigger.offsetLeft
          this.position.top = scrollTop + trigger.getBoundingClientRect().top - tooltip.offsetHeight - this.offset
          break
        case 'top-end':
          this.position.left = trigger.offsetLeft + trigger.offsetWidth - tooltip.offsetWidth
          this.position.top = scrollTop + trigger.getBoundingClientRect().top - tooltip.offsetHeight - this.offset
          break
        case 'bottom':
          this.position.left = trigger.offsetLeft - tooltip.offsetWidth / 2 + trigger.offsetWidth / 2
          this.position.top = scrollTop + trigger.getBoundingClientRect().top + trigger.offsetHeight + this.offset
          break
        case 'bottom-start':
          this.position.left = trigger.offsetLeft
          this.position.top = scrollTop + trigger.getBoundingClientRect().top + trigger.offsetHeight + this.offset
          break
        case 'bottom-end':
          this.position.left = trigger.offsetLeft + trigger.offsetWidth - tooltip.offsetWidth
          this.position.top = scrollTop + trigger.getBoundingClientRect().top + trigger.offsetHeight + this.offset
          break
        case 'left':
          this.position.left = trigger.offsetLeft - tooltip.offsetWidth - this.offset
          this.position.top = scrollTop + trigger.getBoundingClientRect().top + trigger.offsetHeight / 2 - tooltip.offsetHeight / 2
          break
        case 'left-start':
          this.position.left = trigger.offsetLeft - tooltip.offsetWidth - this.offset
          this.position.top = scrollTop + trigger.getBoundingClientRect().top
          break
        case 'left-end':
          this.position.left = trigger.offsetLeft - tooltip.offsetWidth - this.offset
          this.position.top = scrollTop + trigger.getBoundingClientRect().top + trigger.offsetHeight - tooltip.offsetHeight
          break
        case 'right':
          this.position.left = trigger.offsetLeft + trigger.offsetWidth + this.offset
          this.position.top = scrollTop + trigger.getBoundingClientRect().top + trigger.offsetHeight / 2 - tooltip.offsetHeight / 2
          break
        case 'right-start':
          this.position.left = trigger.offsetLeft + trigger.offsetWidth + this.offset
          this.position.top = scrollTop + trigger.getBoundingClientRect().top
          break
        case 'right-end':
          this.position.left = trigger.offsetLeft + trigger.offsetWidth + this.offset
          this.position.top = scrollTop + trigger.getBoundingClientRect().top + trigger.offsetHeight - tooltip.offsetHeight
          break
        default:
          console.warn('Wrong placement prop')
      }
      this.popStyle = {
        top: this.position.top + 'px',
        left: this.position.left + 'px',
        'transition-duration': this.openDelay ? (this.openDelay + 'ms') : '',
        display: isReset ? this.popStyle.display : 'none'
      }
    },
    toggle () {
      if (this.disabled) return
      this.showPop = !this.showPop
      if (this.showPop) {
        this.$nextTick(() => {
          this.init(true)
        })
      }
    },
    // 菜单模式，跳转关闭
    linkTo (item, index) {
      this.showPop = false
      this.$emit('link', item, index)
    },
    // 点击外部关闭
    handleOutsideClick () {
      if (!this.closeOutside) return
      this.showPop = (this.value && this.showPop)
    }
  }
}
</script>
