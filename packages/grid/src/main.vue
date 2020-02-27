<template>
  <div
    class="wd-grid"
    :style="gridStyle"
  >
    <slot />
  </div>
</template>

<script>

export default {
  name: 'WdGrid',
  provide () {
    return {
      grid: this
    }
  },
  data () {
    return {
      length: ''
    }
  },
  props: {
    clickable: {
      type: Boolean,
      default: false
    },
    square: {
      type: Boolean,
      default: false
    },
    column: Number,
    border: {
      type: Boolean,
      default: true
    },
    gutter: Number
  },
  computed: {
    gridStyle () {
      return this.gutter ? {
        paddingLeft: this.gutter + 'px',
        paddingBottom: this.gutter + 'px'
      } : {}
    }
  },
  mounted () {
    const children = []
    this.$slots.default.forEach(item => {
      item.tag && children.push(item.child)
    })
    this.length = children.length

    if (!this.border) return
    children.forEach((item, index) => {
      const { column } = this
      if (column) {
        const isRightItem = children.length - 1 === index || (index + 1) % column === 0
        const isFirstLine = (index + 1) <= column

        isFirstLine && item.set('itemClass', 'is-first-line')
        isRightItem && item.set('itemClass', 'is-right')
        !isFirstLine && !isRightItem && item.set('itemClass', 'is-border')

        // 没有完全替换时, 倒数第二行样式, 最后一个样式按照 last 样式处理
        if (index === children.length - (children.length % column) - 1) {
          item.set('itemClass', 'is-last')
        }
      } else {
        item.set('itemClass', 'is-first-line')
      }
      if (children.length - 1 === index) {
        item.set('itemClass', 'is-last')
      }
    })
  }
}
</script>
