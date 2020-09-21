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
      default: 5
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
      const trigger = this.$refs.trigger.children[0]
      // 文字提示 dom
      const popover = this.$refs[this.el]
      const arrow = this.$refs.arrow || ''
      const arrowHeight = arrow.offsetHeight || 0
      const arrowWidth = arrow.offsetWidth || 0
      const arrowStyle = {}
      const position = {
        top: 0,
        left: 0
      }
      // 定位元素，考虑滚动该高度，当前参照对象的距离顶部高度，左侧相对屏幕距离
      switch (this.placement) {
        case 'top':
          position.left = trigger.offsetLeft - popover.offsetWidth / 2 + trigger.offsetWidth / 2
          position.top = -popover.offsetHeight - this.offset - arrowHeight
          arrowStyle.left = '50%'
          break
        case 'top-start':
          position.left = trigger.offsetLeft
          position.top = -popover.offsetHeight - this.offset - arrowHeight
          arrowStyle.left = (trigger.offsetWidth <= popover.offsetWidth ? trigger.offsetWidth / 2 : 20) + 'px'
          break
        case 'top-end':
          position.left = trigger.offsetLeft + trigger.offsetWidth - popover.offsetWidth
          position.top = -popover.offsetHeight - this.offset - arrowHeight
          arrowStyle.right = (popover.offsetWidth >= trigger.offsetWidth ? trigger.offsetWidth / 2 : 20) + 'px'
          arrowStyle.transform = 'translateX(50%)'
          break
        case 'bottom':
          position.left = trigger.offsetLeft - popover.offsetWidth / 2 + trigger.offsetWidth / 2
          position.top = trigger.offsetHeight + arrowHeight + this.offset
          arrowStyle.left = '50%'
          break
        case 'bottom-start':
          position.left = trigger.offsetLeft
          position.top = trigger.offsetHeight + arrowHeight + this.offset
          arrowStyle.left = (trigger.offsetWidth <= popover.offsetWidth ? trigger.offsetWidth / 2 : 20) + 'px'
          break
        case 'bottom-end':
          position.left = trigger.offsetLeft + trigger.offsetWidth - popover.offsetWidth
          position.top = trigger.offsetHeight + arrowHeight + this.offset
          arrowStyle.right = (popover.offsetWidth >= trigger.offsetWidth ? trigger.offsetWidth / 2 : 20) + 'px'
          arrowStyle.transform = 'translateX(50%)'
          break
        case 'left':
          position.left = trigger.offsetLeft - popover.offsetWidth - this.offset - arrowWidth
          position.top = -popover.offsetHeight / 2 + trigger.offsetHeight / 2
          arrowStyle.top = '50%'
          break
        case 'left-start':
          position.left = trigger.offsetLeft - popover.offsetWidth - this.offset - arrowWidth
          position.top = 0
          arrowStyle.top = (popover.offsetHeight > trigger.offsetHeight / 2 ? trigger.offsetHeight / 2 : 0) + 'px'
          break
        case 'left-end':
          position.left = trigger.offsetLeft - popover.offsetWidth - this.offset - arrowWidth
          position.top = -popover.offsetHeight + trigger.offsetHeight
          arrowStyle.bottom = (popover.offsetHeight > trigger.offsetHeight / 2 ? trigger.offsetHeight / 2 : 0) + 'px'
          arrowStyle.transform = 'translateY(50%)'
          break
        case 'right':
          position.left = trigger.offsetLeft + trigger.offsetWidth + this.offset + arrowWidth
          position.top = -popover.offsetHeight / 2 + trigger.offsetHeight / 2
          arrowStyle.top = '50%'
          break
        case 'right-start':
          position.left = trigger.offsetLeft + trigger.offsetWidth + this.offset + arrowWidth
          position.top = 0
          arrowStyle.top = (popover.offsetHeight > trigger.offsetHeight / 2 ? trigger.offsetHeight / 2 : 0) + 'px'
          break
        case 'right-end':
          position.left = trigger.offsetLeft + trigger.offsetWidth + this.offset + arrowWidth
          position.top = -popover.offsetHeight + trigger.offsetHeight
          arrowStyle.bottom = (popover.offsetHeight > trigger.offsetHeight / 2 ? trigger.offsetHeight / 2 : 0) + 'px'
          arrowStyle.transform = 'translateY(50%)'
          break
        default:
          console.warn('Wrong placement prop')
      }
      this.popStyle = {
        top: position.top + 'px',
        left: position.left + 'px'
      }
      this.arrowStyle = arrowStyle
    }
  },

  mounted () {
    window.addEventListener('resize', () => {
      this.init()
    })
  }
}
