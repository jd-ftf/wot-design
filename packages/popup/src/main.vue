<template>
  <transition :name="transitionName">
    <div
      v-show="value"
      class="jm-popup"
      :class="[ `jm-popup--${position}` ]"
    >
      <slot></slot>
    </div>
  </transition>
</template>

<script>
import popupMixin from '@/mixins/popup'

export default {
  name: 'JmPopup',
  mixins: [popupMixin],
  props: {
    position: {
      type: String,
      default: 'center'
    },
    duration: Number,
    closeable: Boolean
  },
  computed: {
    transitionName () {
      if (this.position === 'center') {
        return 'jm-fade'
      } else {
        return `jm-popup-slide-${this.position}`
      }
    }
  }
}
</script>
