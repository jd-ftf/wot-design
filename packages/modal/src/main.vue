<template>
  <transition name="jm-fade">
    <div
      v-show="show"
      class="jm-modal"
      :style="{
        'z-index': zIndex,
        'transition-duration': duration ? (duration + 'ms') : ''
      }"
      @click="handleClock"
      @touchmove="preventMove"
    ></div>
  </transition>
</template>

<script>
export default {
  name: 'JmModal',
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
