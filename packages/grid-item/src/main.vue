<template>
  <div
    :class="['wd-grid-item', grid.border && !grid.gutter && itemClass]"
    @click="click"
    :style="style"
  >
    <div
      :class="{
        'wd-grid-item__content': true,
        'is-square': grid.square,
        'is-round': grid.border && grid.gutter > 0
      }"
      :style="gutterContentStyle"
    >
      <slot v-if="$slots.default" />
      <div v-else>
        <wd-badge
          :is-dot="isDot"
          :value="value"
          :max="max"
          :type="type"
          :style="{ width:iconSize,height: iconSize }"
        >
          <slot v-if="$slots.icon" name="icon" />
          <!-- TODO 标签切换为类名展示 -->
          <wd-icon v-else :name="icon" :size="iconSize" />
        </wd-badge>
        <slot name="text" v-if="$slots.text" />
        <div v-else class="wd-grid-item__text">{{ text }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import WdBadge from 'wot-design/packages/badge'

export default {
  name: 'WdGridItem',

  inject: ['grid'],

  components: {
    WdBadge
  },

  data () {
    return {
      style: {},
      gutterContentStyle: {},
      itemClass: []
    }
  },

  props: {
    icon: {
      type: String,
      default: ''
    },
    iconSize: {
      type: String,
      default: '26px'
    },
    text: String,
    to: [String, Object],
    replace: Boolean,
    // badge属性
    isDot: Boolean,
    type: String,
    value: [Number, String],
    max: Number
  },

  created () {
    this.$nextTick(() => {
      this.init()
    })
  },

  methods: {
    set (key, value) {
      this[key] = value
    },

    init () {
      const { length, gutter, square, column, bgColor } = this.grid
      const width = column ? 100 / column + '%' : 100 / length + '%'
      // 单独定义正方形
      const squareStyle = square ? {
        width,
        paddingBottom: '0',
        paddingTop: width,
        backgroundColor: 'transparent'
      } : ''
      // 单独定义间隔
      const gutterStyle = gutter ? {
        width,
        padding: `${gutter}px ${gutter}px 0 0`,
        backgroundColor: 'transparent'
      } : ''
      // 间隔+正方形
      this.gutterContentStyle = (gutter && square) ? { right: `${gutter}px`, bottom: `${gutter}px`, backgroundColor: bgColor } : { backgroundColor: bgColor }
      this.style = squareStyle || gutterStyle || { width }
    },

    click (event) {
      if (!this.grid.clickable) return
      const { to, replace } = this
      let isRouterLink = false
      if (to && this.$router) {
        const resolved = this.$router.match(to)
        if (resolved.matched.length) {
          isRouterLink = true
        }
      }
      isRouterLink ? this.$router[replace ? 'replace' : 'push'](to) : location.href = to
      this.$emit('item-click', event)
    }
  }
}
</script>
