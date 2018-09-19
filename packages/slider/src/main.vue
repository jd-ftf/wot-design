<template>
  <div
    class="jm-slider"
    :class="classRoot"
    @touchstart="startDrag"
    @touchend="endDrag"
    @touchmove="move">
    <label
      class="jm-slider__label-min"
      :class="classMinLabel"
      v-show="showMinMax"
      v-text="minValue">
    </label>
    <div
      class="jm-slider__axle"
      ref="axle"
      :class="classAxle">
      <div
        class="jm-slider__ball-container"
        ref="container"
        v-show="!disabled"
        :style="posLeft">
        <div class="jm-slider__ball"></div>
        <label
          class="jm-slider__label-cur"
          v-show="showLabel"
          v-text="curValue">
        </label>
      </div>
      <div
        class="jm-slider__progress-bar"
        :class="classProgressBar"
        :style="progressBarWidth">
      </div>
    </div>
    <label
      class="jm-slider__label-max"
      :class="classMaxLabel"
      v-show="showMinMax"
      v-text="maxValue">
    </label>
  </div>
</template>

<script>
export default {
  name: 'JmSlider',
  props: {
    type: {
      type: String,
      default: 'single'
    },
    showLabel: {
      type: Boolean,
      default: true
    },
    showMinMax: {
      type: Boolean,
      default: true
    },
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
      type: String,
      default: '0,100'
    }
  },
  data () {
    return {
      dragActive: false,
      pos: 0,
      axleWidth: 0,
      ballRadius: 0
    }
  },
  mounted () {
    // 保存初始值
    this.axleWidth = this.$refs.axle.clientWidth
    this.ballRadius = this.$refs.container.clientWidth / 2

    // 看最小值和最大值是否相反
    if (this.minValue > this.maxValue) {
      this.minValue = [this.maxValue, this.maxValue = this.minValue][0]
    }

    // 对初始值进行设定
    let value = this.value.replace(/\s+/g, '').split(',').map(val => Number(val))
    if (this.type === 'single') {
      value[0] < this.maxValue && value[0] > this.minValue
        ? this.setValue(value[0])
        : this.setValue(this.minValue)
    } else if (this.type === 'double') {
      // todo
    }
  },
  computed: {
    posLeft () {
      return `left: ${this.pos - this.ballRadius}px;`
    },
    curValue () {
      return this.getValue()
    },
    classRoot () {
      let classList = []
      this.disabled && classList.push('jm-slider--disabled')
      this.showLabel && !this.disabled && classList.push('jm-slider--has-label')
      return classList.join(' ')
    },
    classMinLabel () {
      let classList = []
      this.disabled && classList.push('jm-slider__label-min--disabled')
      return classList.join(' ')
    },
    classMaxLabel () {
      let classList = []
      this.disabled && classList.push('jm-slider__label-max--disabled')
      return classList.join(' ')
    },
    classAxle () {
      let classList = []
      this.showMinMax && classList.push('jm-slider__axle--has-min-max')
      return classList.join(' ')
    },
    classProgressBar () {
      let classList = []
      this.disabled && classList.push('jm-slider__progress-bar--disabled')
      return classList.join(' ')
    },
    progressBarWidth () {
      return `width: ${this.pos}px;`
    }
  },
  methods: {

    // 开始拖动事件
    startDrag (event) {
      if (!this.disabled) {
        this.dragActive = true
        this.setPos(event.changedTouches[0].clientX)
      }
    },

    // 结束拖动事件
    endDrag () {
      if (!this.disabled) {
        this.dragActive = false
      }
    },

    // 给滑块定位
    setPos (pos) {
      pos -= this.$refs.axle.offsetLeft
      pos = pos < 0 ? 0 : pos
      pos = pos > this.axleWidth ? this.axleWidth : pos
      this.pos = pos
    },

    // 指尖开始移动
    move (event) {
      if (this.dragActive && !this.disabled) {
        this.setPos(event.changedTouches[0].clientX)
      }
    },

    // 获得通过pos转化过来的value值
    getValue () {
      let percent = this.pos / this.axleWidth
      return percent * (this.maxValue - this.minValue) + this.minValue | 0
    },

    setValue (value) {
      if (this.type === 'single') {
        let percent = (value - this.minValue) / (this.maxValue - this.minValue)
        this.pos = percent * this.axleWidth
      } else if (this.type === 'double') {
        // todo
      }
    }
  }
}
</script>
