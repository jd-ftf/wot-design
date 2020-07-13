<template>
  <div class="wd-badge">
    <slot></slot>
    <transition name="wd-zoom-in-center">
      <div
        class="wd-badge__gap"
        v-show="!hidden && (content || content === 0 || isDot)"
        :class="{ 'is-fixed': $slots.default }"
      >
        <div
          v-text="content"
          class="wd-badge__content"
          :class="[
            type ? `wd-badge__content--${type}` : '',
            isDot ? 'is-dot': ''
          ]"
          :style="{
            backgroundColor: bgColor
          }">
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'WdBadge',
  props: {
    value: [Number, String],
    bgColor: String,
    max: Number,
    isDot: Boolean,
    hidden: Boolean,
    type: {
      type: String,
      validator (val) {
        return ['primary', 'success', 'warning', 'info', 'danger'].indexOf(val) > -1
      }
    }
  },

  computed: {
    content () {
      if (this.isDot) return
      const value = this.value
      const max = this.max
      if (typeof value === 'number' && typeof max === 'number') {
        return max < value ? `${max}+` : value
      }
      return value
    }
  }
}
</script>
