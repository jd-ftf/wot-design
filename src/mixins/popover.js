import Clickoutside from 'wot-design/src/utils/clickoutside'

/**
 * @param {String} [placement=bottom] - Placement of the popper accepted values: top(-start, -end), right(-start, -end), bottom(-start, -end), left(-start, -end)
 * @param {Number} [offset=5] - Amount of pixels the popper will be shifted (can be negative).
 * @param {Boolean} [visibleArrow=false] Visibility of the arrow
 * @param {Boolean} [value=false] Visibility of the component
 * @param {Boolean} [disabled=false] Disabled to change.
 * @param {Boolean} [closeOutside=true] 点击外部关闭
 */

export default {
  props: {
    placement: {
      type: String,
      default: 'bottom'
    },
    visibleArrow: {
      type: Boolean,
      default: true
    },
    offset: {
      type: Number,
      default: 0
    },
    value: Boolean,
    closeOutside: {
      type: Boolean,
      default: true
    },
    disabled: Boolean
  },

  directives: { Clickoutside },

  data () {
    return {
      popStyle: {},
      arrowStyle: {},
      showPop: false
    }
  },

  computed: {
    arrowClass () {
      const el = `wd-${this.el}__arrow`
      return this.visibleArrow ? {
        [el]: true,
        [el + '-up']: this.placement === 'bottom' || this.placement === 'bottom-start' || this.placement === 'bottom-end',
        [el + '-right']: this.placement === 'left' || this.placement === 'left-start' || this.placement === 'left-end',
        [el + '-left']: this.placement === 'right' || this.placement === 'right-start' || this.placement === 'right-end',
        [el + '-down']: this.placement === 'top' || this.placement === 'top-start' || this.placement === 'top-end'
      } : ''
    }
  },

  watch: {
    'value': {
      immediate: true, // immediate选项可以开启首次赋值监听
      handler (newVal) {
        if (newVal === this.showPop) return
        this.toggle(true)
      }
    }
  },

  methods: {
    /**
     * @param {Boolean} isOutsideControl 判定是否是value控制的显隐, 默认值为空
     */
    toggle (isOutsideControl = false) {
      if (this.disabled) return
      this.showPop = isOutsideControl ? this.value : !this.showPop
      if (this.showPop) {
        this.$nextTick(() => {
          this.init()
        })
      }
      this.$emit(`${this.showPop === true ? 'show' : 'hide'}`)
      this.$emit('input', this.showPop)
    },

    // 点击外部关闭
    handleOutsideClick () {
      if (!this.closeOutside || this.disabled) return
      this.showPop && this.toggle()
    },

    // 位置初始化函数
    init () {
      // 目标对象 dom（被跟随）
      const trigger = this.$refs.trigger ? this.$refs.trigger.children[0] : {}
      // 文字提示 dom
      const popover = this.$refs[this.el]
      const arrow = this.$refs.arrow || ''
      const arrowHeight = arrow.offsetHeight || 0
      const arrowWidth = arrow.offsetWidth || 0
      let arrowStyle = {}
      let position = {}
      // 上下位（纵轴）对应的距离左边的距离
      const verticalX = trigger.offsetWidth / 2
      // 上下位（纵轴）对应的距离底部的距离
      const verticalY = trigger.offsetHeight + arrowHeight + 5
      // 左右位（横轴）对应的距离左边的距离
      const horizontalX = trigger.offsetWidth + arrowWidth + 5
      // 左右位（横轴）对应的距离底部的距离
      const horizontalY = trigger.offsetHeight / 2

      const offsetX = ((verticalX - arrowWidth > 0) ? 0 : (verticalX - 25)) + this.offset
      const offsetY = ((horizontalY - arrowHeight > 0) ? 0 : (horizontalY - 20)) + this.offset

      // 定位元素，考虑滚动该高度，当前参照对象的距离顶部高度，左侧相对屏幕距离
      switch (this.placement) {
        case 'top':
          position = {
            left: `${verticalX}px`,
            transform: 'translateX(-50%)',
            bottom: `${verticalY}px`
          }
          arrowStyle = {
            left: '50%'
          }
          break
        case 'top-start':
          position = {
            left: `${offsetX}px`,
            bottom: `${verticalY}px`
          }
          arrowStyle = {
            left: `${(popover.offsetWidth >= trigger.offsetWidth ? verticalX : popover.offsetWidth - 25) - offsetX}px`
          }
          break
        case 'top-end':
          position = {
            right: `${offsetX}px`,
            bottom: `${verticalY}px`
          }
          arrowStyle = {
            right: `${(popover.offsetWidth >= trigger.offsetWidth ? verticalX : popover.offsetWidth - 25) - offsetX}px`,
            transform: 'translateX(50%)'
          }
          break
        case 'bottom':
          position = {
            left: `${verticalX}px`,
            transform: 'translateX(-50%)',
            top: `${verticalY}px`
          }
          arrowStyle = {
            left: '50%'
          }
          break
        case 'bottom-start':
          position = {
            left: `${offsetX}px`,
            top: `${verticalY}px`
          }
          arrowStyle = {
            left: `${25 - this.offset}px`
          }
          break
        case 'bottom-end':
          position = {
            right: `${offsetX}px`,
            top: `${verticalY}px`
          }
          arrowStyle = {
            right: `${25 - this.offset}px`,
            transform: 'translateX(50%)'
          }
          break
        case 'left':
          position = {
            right: `${horizontalX}px`,
            top: `${horizontalY}px`,
            transform: 'translateY(-50%)'
          }
          arrowStyle = {
            top: '50%'
          }
          break
        case 'left-start':
          position = {
            right: `${horizontalX}px`,
            top: `${offsetY}px`
          }
          arrowStyle = {
            top: `${20 - this.offset}px`
          }
          break
        case 'left-end':
          position = {
            right: `${horizontalX}px`,
            bottom: `${offsetY}px`
          }
          arrowStyle = {
            bottom: `${(popover.offsetHeight >= trigger.offsetHeight ? horizontalY : popover.offsetHeight - 20) - offsetX}px`,
            transform: 'translateY(50%)'
          }
          break
        case 'right':
          position = {
            left: `${horizontalX}px`,
            top: `${horizontalY}px`,
            transform: 'translateY(-50%)'
          }
          arrowStyle = {
            top: '50%'
          }
          break
        case 'right-start':
          position = {
            left: `${horizontalX}px`,
            top: `${offsetY}px`
          }
          arrowStyle = {
            top: `${(popover.offsetHeight >= trigger.offsetHeight ? horizontalY : popover.offsetHeight - 20) - offsetX}px`
          }
          break
        case 'right-end':
          position = {
            left: `${horizontalX}px`,
            bottom: `${offsetY}px`
          }
          arrowStyle = {
            bottom: `${(popover.offsetHeight >= trigger.offsetHeight ? horizontalY : popover.offsetHeight - 20) - offsetX}px`,
            transform: 'translateY(50%)'
          }
          break
        default:
          console.warn('[wot design] warning: wrong placement prop')
      }
      this.popStyle = position
      this.arrowStyle = arrowStyle
    }
  },

  mounted () {
    window.addEventListener('resize', this.init)
  },

  beforeDestroy () {
    window.removeEventListener('resize', this.init)
  }
}
