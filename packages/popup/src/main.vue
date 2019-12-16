<template>
  <transition :name="transitionName" @after-enter="handleOpened" @after-leave="handleClosed">
    <div
      v-show="value"
      class="jm-popup"
      :class="[ `jm-popup--${position}` ]"
      :style="{ 'transition-duration': duration ? (duration + 'ms') : '' }"
    >
      <slot></slot>
      <i v-if="closable" class="jm-popup__close jm-icon-add" @click="close"></i>
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
    closable: Boolean,
    transition: String
  },
  computed: {
    transitionName () {
      if (this.transition) {
        return this.transition
      }

      if (this.position === 'center') {
        return 'jm-fade'
      } else {
        return `jm-popup-slide-${this.position}`
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
  }
}
</script>
