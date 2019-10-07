import { context } from './context'
import { openModal, closeModal } from './modal'

export default {
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
      if (this.$isServer) return

      this.renderModal()

      if (this.lockScroll) {
        document.addEventListener('touchstart', this.touchStart)
        document.addEventListener('touchmove', this.touchMove)

        if (!context.lockCount) {
          document.body.classList.add('jm-overflow-hidden')
        }
        context.lockCount++
      }
    },
    close () {
      if (this.lockScroll) {
        context.lockCount--
        document.removeEventListener('touchstart', this.touchStart)
        document.removeEventListener('touchmove', this.touchMove)

        if (!context.lockCount) {
          document.body.classList.remove('jm-overflow-hidden')
        }
      }

      closeModal(this)
      this.$emit('input', false)
    },
    renderModal () {
      this.$el.style.zIndex = ++context.zIndex + 1
      openModal(this, {
        duration: this.duration,
        zIndex: context.zIndex++
      })
    },
    touchStart () {

    },
    touchMove () {

    }
  },
  mounted () {
    if (this.value) {
      this.open()
    }
  }
}
