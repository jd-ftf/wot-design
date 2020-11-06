<script>
import popupMixin from 'wot-design/src/mixins/popup'

export default {
  name: 'WdPopup',
  mixins: [popupMixin],
  props: {
    position: {
      type: String,
      default: 'center'
    },
    duration: Number,
    closable: Boolean,
    transition: String
  },
  computed: {
    transitionName () {
      if (this.transition) {
        return this.transition
      }

      if (this.position === 'center') {
        return 'wd-fade'
      } else {
        return `wd-popup-slide-${this.position}`
      }
    }
  },
  methods: {
    handleOpened () {
      this.$emit('opened')
    },
    handleClosed () {
      this.$emit('closed')
    }
  },

  render () {
    const {
      transitionName,
      handleOpened,
      handleClosed,
      value,
      position,
      duration,
      closable,
      close
    } = this
    return (
      <transition name={transitionName} onAfterEnter={handleOpened} onAfterLeave={handleClosed} >
        <div
          v-show={value}
          class={[
            'wd-popup',
            `wd-popup--${position}`
          ]}
          ref="popup"
          style={
            { 'transition-duration': duration ? (duration + 'ms') : '' }
          }
        >
          <slot></slot>
          {this.$slots.default}
          {closable ? <i class="wd-popup__close wd-icon-add" onClick={close}></i> : ''}
        </div>
      </transition>
    )
  }
}
</script>
