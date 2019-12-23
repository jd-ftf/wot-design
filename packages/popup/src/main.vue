<template>
  <transition :name="transitionName" @after-enter="handleOpened" @after-leave="handleClosed">
    <div
      v-show="value"
      class="wd-popup"
      :class="[ `wd-popup--${position}` ]"
      :style="{ 'transition-duration': duration ? (duration + 'ms') : '' }"
    >
      <slot></slot>
      <i v-if="closable" class="wd-popup__close wd-icon-add" @click="close"></i>
    </div>
  </transition>
</template>

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
  }
}
</script>
