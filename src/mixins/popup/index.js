import { context } from './context'
import { openModal, closeModal } from './modal'
import TouchMixin from '../touch'
import { getScrollEventTarget } from '../../utils/scroll'
import { on, off } from '../../utils/event'

export function stopPropagation (event) {
  event.stopPropagation()
}

export function preventDefault (event, isStopPropagation) {
  /* istanbul ignore else */
  if (typeof event.cancelable !== 'boolean' || event.cancelable) {
    event.preventDefault()
  }

  if (isStopPropagation) {
    stopPropagation(event)
  }
}

export default {
  mixins: [TouchMixin],
  data () {
    return {
      inited: this.value
    }
  },
  props: {
    value: Boolean,
    lockScroll: {
      type: Boolean,
      default: true
    },
    closeOnClickModal: {
      type: Boolean,
      default: true
    },
    zIndex: Number,
    duration: {
      type: Number,
      default: 300
    },
    modal: {
      type: Boolean,
      default: true
    },
    modalStyle: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  watch: {
    value (val) {
      const type = val ? 'open' : 'close'
      this.inited = this.inited || this.value
      this[type]()
      this.$emit(type)
    }
  },
  methods: {
    open () {
      if (this.$isServer || this.opened) return

      if (this.zIndex !== undefined) {
        context.zIndex = this.zIndex
      }

      this.opened = true
      this.modal && this.renderModal()

      if (this.lockScroll) {
        on(document, 'touchstart', this.touchStart)
        on(document, 'touchmove', this.onTouchMove)

        if (!context.lockCount) {
          document.body.classList.add('wd-overflow-hidden')
        }
        context.lockCount++
      }
    },
    close () {
      if (!this.opened) return

      if (this.lockScroll) {
        off(document, 'touchstart', this.touchStart)
        off(document, 'touchmove', this.onTouchMove)
        context.lockCount--

        if (!context.lockCount) {
          document.body.classList.remove('wd-overflow-hidden')
        }
      }

      this.opened = false
      this.modal && closeModal(this)
      this.$emit('input', false)
    },
    renderModal () {
      this.$el.style.zIndex = ++context.zIndex + 1
      openModal(this, {
        duration: this.duration,
        zIndex: context.zIndex++,
        closeOnClickModal: this.closeOnClickModal,
        modalStyle: this.modalStyle
      })
    },
    onTouchMove (event) {
      this.touchMove(event)
      const direction = this.deltaY > 0 ? '10' : '01'
      const el = getScrollEventTarget(event.target, this.$el)
      const { scrollHeight, offsetHeight, scrollTop } = el
      let status = '11'

      if (scrollTop === 0) {
        status = offsetHeight >= scrollHeight ? '00' : '01'
      } else if (scrollTop + offsetHeight >= scrollHeight) {
        status = '10'
      }

      if (status !== '11' &&
        this.direction === 'vertical' &&
        !(parseInt(status, 2) & parseInt(direction, 2))) {
        preventDefault(event)
      }
    }
  },
  mounted () {
    if (this.value) {
      this.open()
    }
  },
  beforeDestroy () {
    this.close()
  },
  activated () {
    if (this.value) {
      this.open()
    }
  },
  deactivated () {
    this.close()
  }
}
