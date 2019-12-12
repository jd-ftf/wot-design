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
    },
    zIndex: Number
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
      this.renderModal()

      if (this.lockScroll) {
        if (!context.lockCount) {
          document.body.classList.add('jm-overflow-hidden')
        }
        context.lockCount++
      }
    },
    close () {
      if (!this.opened) return

      if (this.lockScroll) {
        context.lockCount--

        if (!context.lockCount) {
          document.body.classList.remove('jm-overflow-hidden')
        }
      }

      this.opened = false
      closeModal(this)
      this.$emit('input', false)
    },
    renderModal () {
      this.$el.style.zIndex = ++context.zIndex + 1
      openModal(this, {
        duration: this.duration,
        zIndex: context.zIndex++,
        closeOnClickModal: this.closeOnClickModal
      })
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
