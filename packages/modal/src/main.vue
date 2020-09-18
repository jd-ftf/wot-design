<template>
  <transition name="wd-fade">
    <div
      v-show="show"
      class="wd-modal"
      :style="{
        'z-index': zIndex,
        'transition-duration': duration ? (duration + 'ms') : '',
        ...modalStyle
      }"
      @click="handleClock"
      @touchmove="preventMove"
    ></div>
  </transition>
</template>

<script>
export default {
  name: 'WdModal',
  props: {
    show: Boolean,
    duration: Number,
    zIndex: {
      type: Number,
      default: 1
    },
    closeOnClickModal: {
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
  methods: {
    handleClock () {
      if (this.closeOnClickModal) {
        this.$emit('click-modal')
      }
    },
    preventMove (event) {
      event.preventDefault()
    }
  }
}
</script>
