<template>
  <div
    :class="[
      'wd-col',
      span && 'wd-col__' + span,
      offset && 'wd-col__offset-' + offset,
    ]"
    :style="style"
  >
    <slot />
  </div>
</template>

<script>

export default {
  name: 'WdCol',

  data () {
    return {
      style: ''
    }
  },

  props: {
    span: {
      type: [Number, String],
      default: 24
    },
    offset: {
      type: [Number, String],
      default: 0
    }
  },

  created () {
    this.check()
  },

  methods: {
    check () {
      if (this.span < 0 || this.offset < 0) {
        console.warn('[wot design] warning(wd-col): attribute span/offset must be greater than or equal to 0')
      }
    },

    setGutter (gutter) {
      const padding = `${gutter / 2}px`
      const style = gutter > 0 ? {
        paddingLeft: padding,
        paddingRight: padding,
        backgroundClip: 'content-box'
      } : ''

      if (style !== this.style) {
        this.style = style
      }
    }
  }
}
</script>
