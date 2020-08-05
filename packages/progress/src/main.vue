<template>
  <div class="wd-progress">
    <span class="wd-progress__outer">
      <i class="wd-progress__inner" :style="{ background: showColor, width: percentage + '%' }"></i>
    </span>
    <div class="wd-progress__label">
      <span v-if="!hideText">{{ percentage }}%</span>
      <i v-else-if="icon" class="wd-progress__icon" :style="{ color: color }" :class="icon"></i>
      <slot v-else name="icon"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WdProgress',
  props: {
    percentage: {
      type: Number,
      default: 0
    },
    hideText: Boolean,
    color: [String, Array, Function],
    icon: String
  },
  computed: {
    showColor () {
      let color
      if (this.color) {
        if (typeof this.color === 'string') {
          color = this.color
        } else if (this.color instanceof Array) {
          const colorArray = this.getColors().sort((color1, color2) => {
            return color1.percentage - color2.percentage
          })
          for (let i = 0, len = colorArray.length; i < len; i++) {
            if (colorArray[i].percentage > this.percentage) {
              color = colorArray[i].color
              break
            }
          }
        } else if (typeof this.color === 'function') {
          color = this.color(this.percentage)
        }
      }

      return color
    }
  },
  methods: {
    getColors () {
      let color = this.color
      const split = 100 / color.length
      return color.map((splitItem, index) => {
        if (typeof splitItem === 'string') {
          return {
            color: splitItem,
            percentage: (index + 1) * split
          }
        } else {
          return splitItem
        }
      })
    }
  }
}
</script>
