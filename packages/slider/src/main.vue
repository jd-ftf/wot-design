<template>
  <div
    :class="{
      'jm-slider': true,
      'jm-slider--has-label': !hideLabel,
      'jm-slider--disabled': disabled
    }">
    <div
      class="jm-slider__label-min"
      v-if="!hideMinMax">
      {{ minValue }}
    </div>
    <div
      ref="axle"
      :class="{
        'jm-slider__axle': true,
        'jm-slider__axle--has-min-max': !hideMinMax
      }"
      @touchstart="slidingStart"
      @touchend="slidingEnd"
      @touchmove="sliding">
      <div
        ref="container"
        v-if="!disabled"
        class="jm-slider__handle-container"
        :style="{ left: handlePosition[0] - handleRadius + 'px' }">
        <div class="jm-slider__handle"></div>
        <div
          class="jm-slider__label-cur"
          v-if="!hideLabel">
          {{ typeof value === 'number' ? value : value[0] }}
        </div>
      </div>
      <div
        v-if="!disabled && typeof value !== 'number'"
        :style="{ left: handlePosition[1] - handleRadius + 'px' }"
        class="jm-slider__handle-container">
        <div class="jm-slider__handle"></div>
        <div
          class="jm-slider__label-cur"
          v-if="!hideLabel">
          {{ value[1] }}
        </div>
      </div>
      <div
        class="jm-slider__progress-bar"
        :style="{
          width: Math.abs(handlePosition[0] - handlePosition[1]) + 'px',
          left: Math.min(handlePosition[0], handlePosition[1]) + 'px'
        }">
      </div>
    </div>
    <div
      class="jm-slider__label-max"
      v-if="!hideMinMax">
      {{ maxValue }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'JmSlider',
  props: {
    hideMinMax: Boolean,
    hideLabel: Boolean,
    disabled: {
      type: Boolean,
      default: false
    },
    maxValue: {
      type: Number,
      default: 100
    },
    minValue: {
      type: Number,
      default: 0
    },
    value: {
      type: [Number, Array],
      default: 0
    },
    step: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      handleRadius: 0,
      axleWidth: 0
    }
  },
  computed: {
    handlePosition () {
      return typeof this.value === 'number'
        ? [this.value2Pos(this.value), 0]
        : [this.value2Pos(this.value[0]), this.value2Pos(this.value[1])]
    }
  },
  mounted () {
    this.handleRadius = this.$refs.container && this.$refs.container.clientWidth / 2
    this.axleWidth = this.$refs.axle.clientWidth
    window.onresize = () => {
      this.axleWidth = this.$refs.axle.clientWidth
    }
  },
  methods: {

    // 开始拖动事件
    slidingStart () {
      if (!this.disabled) {
        this.$emit('slidingstart', this.value)
      }
    },

    // 拖动事件
    sliding (event) {
      if (!this.disabled) {
        const touchX = event.changedTouches[0].clientX
        const axleX = this.$refs.axle.offsetLeft
        const currentPos = touchX - axleX

        if (typeof this.value === 'number') {
          const value = this.pos2Value(currentPos)
          this.$emit('sliding', value)
          this.$emit('input', value)
        } else {
          const deltaLeft = Math.abs(currentPos - this.value2Pos(this.value[0]))
          const deltaRight = Math.abs(currentPos - this.value2Pos(this.value[1]))

          const value = this.pos2Value(currentPos)
          const currentValue = deltaLeft < deltaRight
            ? [value, this.value[1]]
            : [this.value[0], value]
          this.$emit('sliding', currentValue)
          this.$emit('input', currentValue)
        }
      }
    },

    // 结束拖动事件
    slidingEnd () {
      if (!this.disabled) {
        this.$emit('slidingend', this.value)
      }
    },

    // 如果value超出限定值则设定为限定值
    fixValue (value) {
      value < this.minValue && (value = this.minValue)
      value > this.maxValue && (value = this.maxValue)
      return value
    },

    // 将pos转化为value
    pos2Value (pos) {
      const percent = pos / this.axleWidth
      const value = percent * (this.maxValue - this.minValue) + this.minValue
      const res = this.minValue + Math.floor((value - this.minValue) / this.step) * this.step
      return this.fixValue(res)
    },

    // 将value转化为pos
    value2Pos (value) {
      const fixedValue = this.fixValue(value)
      const percent = (fixedValue - this.minValue) / (this.maxValue - this.minValue)
      return percent * this.axleWidth
    }
  }
}
</script>
