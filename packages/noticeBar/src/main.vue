<template>
  <div class="jm-notice-bar" :style="{ background: backgroundColor, color: color }">
    <slot name="left-icon">
      <i :class="`jm-notice-bar__left-icon jm-icon-${leftIcon}`"></i>
    </slot>
    <div class="jm-notice-bar__wrap" ref="wrap">
      <div class="jm-notice-bar__content" ref="content">
        <slot>
          {{ text }}
        </slot>
      </div>
    </div>
    <slot name="right-icon">
      <i v-if="closable" class="jm-notice-bar__right-icon jm-icon-close" @click="handleClick"></i>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'JmNoticeBar',
  props: {
    text: String,
    scrollable: {
      type: Boolean,
      default: true
    },
    delay: {
      type: Number,
      default: 1
    },
    speed: {
      type: Number,
      default: 50
    },
    closable: Boolean,
    wrapable: Boolean,
    leftIcon: String,
    color: String,
    backgroundColor: String
  },
  methods: {
    handleClick () {
      this.$emit('click')
    }
  }
}
</script>
