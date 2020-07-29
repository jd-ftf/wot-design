<template>
  <div class="wd-badge">
    <slot></slot>
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
        :style="badgeStyle">
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
    top: Number,
    right: Number,
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
    },
    badgeStyle () {
      let badgeStyle = {
        'background-color': this.bgColor
      }
      if (this.$slots.default) {
        badgeStyle = Object.assign(badgeStyle, {
          'top': `${this.top || 0}px`,
          'right': `${this.right || 0}px`
        })
      }

      return badgeStyle
    }
  }
}
</script>
