<template>
  <div
    :class="[
      'wd-row',
      flex && 'wd-row__flex',
      flex && justify && 'wd-row__justify-' + justify,
      flex && align && 'wd-row__align-' + align
    ]"
    :style="style"
    >
    <slot />
  </div>
</template>

<script>

export default {
  name: 'WdRow',
  data () {
    return {
      style: ''
    }
  },
  props: {
    flex: Boolean,
    align: String,
    justify: String,
    gutter: {
      type: [Number, String],
      default: 0
    }
  },
  created () {
    this.$nextTick(() => {
      this.setGutter()
    })
  },
  methods: {
    setGutter () {
      const { gutter } = this
      if (gutter < 0) {
        console.warn('Attribute gutter must be greater than or equal to 0')
      }
      const margin = `${gutter / 2}px`
      const style = gutter ? `margin-left: -${margin}; margin-right: -${margin};` : ''
      const children = []

      this.style = style
      this.$slots.default.forEach(item => {
        item.tag && children.push(item.child)
      })
      gutter && children && children.forEach(item => {
        item.setGutter(gutter)
      })
    }
  }
}
</script>
