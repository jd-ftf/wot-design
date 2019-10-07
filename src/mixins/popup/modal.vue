<template>
  <transition name="jm-fade">
    <div
      v-show="show"
      class="jm-popup__modal"
      :style="{
        'z-index': zIndex,
        'animation-duration': duration ? (duration + 'ms') : ''
      }"
      @click="() => onClickModal()"
    ></div>
  </transition>
</template>

<script>
export default {
  props: {
    show: Boolean,
    duration: Number,
    zIndex: {
      type: Number,
      default: 1
    },
    onClickModal: {
      type: Function,
      default: () => {}
    }
  }
}
</script>
