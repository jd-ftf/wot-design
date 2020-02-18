<template>
  <div class="wd-badge">
    <span><slot></slot></span>
    <transition name="wd-zoom-in-center">
      <sup
        v-show="!hidden && (content || content === 0 || isDot)"
        v-text="content"
        class="wd-badge__content"
        :class="[
          type ? `wd-badge__content--${type}` : '',
          {
            'is-fixed': $slots.default,
            'is-dot': isDot
          }
        ]"
        :style="{
          backgroundColor: bgColor
        }">
      </sup>
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
