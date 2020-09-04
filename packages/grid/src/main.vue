<template>
  <div class="wd-grid" :style="gridStyle">
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
      default: false
    },
    bgColor: String,
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

  watch: {
    column () {
      this.$nextTick(() => {
        this.init()
      })
    }
  },

  mounted () {
    this.init()
  },

  methods: {
    init () {
      const children = []
      this.$slots.default.forEach(item => {
        item.tag && children.push(item.child)
      })
      this.length = children.length
      children.forEach((item, index) => {
        if (this.border) {
          const { column } = this
          if (column) {
            const isRightItem = children.length - 1 === index || (index + 1) % column === 0
            const isFirstLine = (index + 1) <= column
            isFirstLine && item.itemClass.push('is-first-line')
            isRightItem && item.itemClass.push('is-right')
            !isFirstLine && item.itemClass.push('is-border')
          } else {
            item.itemClass.push('is-first-line')
          }
        }
        item.init()
      })
    }
  }
}
</script>
