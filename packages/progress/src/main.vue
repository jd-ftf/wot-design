<template>
  <div class="jm-progress" :class="{ 'is-with-text': !hideText }">
    <span class="jm-progress__outer">
      <i class="jm-progress__inner" :style="{ background: showColor, width: percentage + '%' }"></i>
    </span>
    <span v-if="!hideText" class="jm-progress__label" :style="{ left: percentage + '%' }">{{ percentage }}%</span>
  </div>
</template>

<script>
export default {
  name: 'JmProgress',
  props: {
    percentage: {
      type: Number,
      default: 0
    },
    hideText: Boolean,
    color: [String, Array, Function]
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
