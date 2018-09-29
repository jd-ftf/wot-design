<template>
  <div
    class="jm-slider"
    :class="classRoot">
    <label
      class="jm-slider__label-min"
      :class="classMinLabel"
      v-show="showMinMax"
      v-text="min">
    </label>
    <div
      class="jm-slider__axle"
      ref="axle"
      :class="classAxle"
      @touchstart="_slidingStart"
      @touchend="_slidingEnd"
      @touchmove="_sliding">
      <div
        class="jm-slider__ball-container"
        ref="container"
        v-show="!isDisable"
        :class="classContainer1"
        :style="styleContainer1"
        @touchstart="_activeSlider(1)"
        @touchend="_inactiveSlider(1)">
        <div class="jm-slider__ball"></div>
        <label
          class="jm-slider__label-cur"
          v-show="showLabel"
          v-text="_getValue()[0]">
        </label>
      </div>
      <div
        class="jm-slider__ball-container"
        ref="container2"
        :class="classContainer2"
        :style="styleContainer2"
        v-if="type === 'double'"
        @touchstart="_activeSlider(2)"
        @touchend="_inactiveSlider(2)">
        <div class="jm-slider__ball"></div>
        <label
          class="jm-slider__label-cur"
          v-show="showLabel"
          v-text="_getValue()[1]">
        </label>
      </div>
      <div
        class="jm-slider__progress-bar"
        :class="classProgressBar"
        :style="styleProgressBar">
      </div>
    </div>
    <label
      class="jm-slider__label-max"
      :class="classMaxLabel"
      v-show="showMinMax"
      v-text="max">
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
      min: 0,
      max: 100,
      isDisable: false,
      pos1: 0,
      pos2: 0,
      isSlider1Active: false,
      isSlider2Active: false,
      axleWidth: 0,
      ballRadius: 0,
      eventList: {
        slidingStart: [],
        slidingEnd: [],
        sliding: []
      }
    }
  },
  mounted () {
    // 保存初始值
    this.axleWidth = this.$refs.axle.clientWidth
    this.ballRadius = this.$refs.container.clientWidth / 2

    // 看最小值和最大值是否相反
    if (this.minValue > this.maxValue) {
      this.min = this.maxValue
      this.max = this.minValue
    } else {
      this.min = this.minValue
      this.max = this.maxValue
    }

    // 将disabled设到变量上使其可以操控
    this.isDisable = this.disabled

    // 对初始值进行设定
    this.setValue(this.value.split(',').map(val => Number(val)))
  },
  computed: {
    classRoot () {
      let classList = []
      this.isDisable && classList.push('jm-slider--disabled')
      this.showLabel && classList.push('jm-slider--has-label')
      return classList.join(' ')
    },
    classAxle () {
      return this.showMinMax ? 'jm-slider__axle--has-min-max' : ''
    },
    classMinLabel () {
      return this.isDisable ? 'jm-slider__label-min--disabled' : ''
    },
    classMaxLabel () {
      return this.isDisable ? 'jm-slider__label-max--disabled' : ''
    },
    classProgressBar () {
      return this.isDisable ? 'jm-slider__progress-bar--disabled' : ''
    },
    classContainer1 () {
      return this.isSlider1Active ? 'jm-slider__ball-container--active' : ''
    },
    classContainer2 () {
      return this.isSlider2Active ? 'jm-slider__ball-container--active' : ''
    },
    styleProgressBar () {
      if (this.type === 'single') {
        return `width: ${this.pos1}px;`
      }
      let styleList = []
      styleList.push(`width: ${Math.abs(this.pos1 - this.pos2)}px;`)
      styleList.push(`left: ${Math.min(this.pos1, this.pos2)}px`)
      return styleList.join(';')
    },
    styleContainer1 () {
      return `left: ${this.pos1 - this.ballRadius}px;`
    },
    styleContainer2 () {
      return `left: ${this.pos2 - this.ballRadius}px;`
    }
  },
  methods: {
    // 第n个滑块被激活
    _activeSlider (n) {
      this[`isSlider${n}Active`] = true
    },

    // 第n个滑块被重置
    _inactiveSlider (n) {
      this[`isSlider${n}Active`] = false
    },

    // 开始拖动事件
    _slidingStart (event) {
      if (!this.isDisable) {
        if (this.type === 'single') {
          this._setPos(event.changedTouches[0].clientX - this.$refs.axle.offsetLeft)
        }
        this.eventList['slidingStart'].forEach(fn => fn && fn(event))
      }
    },

    // 指尖开始移动
    _sliding (event) {
      if (!this.isDisable) {
        this._setPos(event.changedTouches[0].clientX - this.$refs.axle.offsetLeft)
        this.eventList['sliding'].forEach(fn => fn && fn(event))
      }
    },

    // 结束拖动事件
    _slidingEnd (event) {
      if (!this.isDisable) {
        this.eventList['slidingEnd'].forEach(fn => fn && fn(event))
      }
    },

    // 给滑块定位
    _setPos (pos) {
      pos < 0 && (pos = 0)
      pos > this.axleWidth && (pos = this.axleWidth)
      this.isSlider1Active && (this.pos1 = pos)
      this.isSlider2Active && (this.pos2 = pos)
    },

    // 将pos转化为value
    _pos2Value (pos) {
      return pos / this.axleWidth * (this.max - this.min) + this.min | 0
    },

    // 将value转化为pos
    _value2Pos (value) {
      return (value - this.min) / (this.max - this.min) * this.axleWidth
    },

    // 获得通过pos转化过来的value值，有可能不是正序
    _getValue () {
      return [this.pos1, this.pos2].map(pos => this._pos2Value(pos))
    },

    // 获得大小正序排列的value
    // type=single输出Number
    // type=double输出Array
    getValue () {
      let val = this._getValue()
      return this.type === 'single'
        ? val[0]
        : [Math.min(val[0], val[1]), Math.max(val[0], val[1])]
    },

    // 给插件赋值
    setValue (value, otherValue) {
      // 将各种各样的输入转化为value = []的形式
      value = otherValue ? [value, otherValue] : value instanceof Array ? value : [value]
      value.forEach((val, index) => {
        val < this.min && (val = this.min)
        val > this.max && (val = this.max)
        // 只有在激活Slider的时候才能setPos
        this._activeSlider(index + 1)
        this._setPos(this._value2Pos(val))
        this._inactiveSlider(index + 1)
      })
    },

    // 是否禁用插件
    disable (bool) {
      this.isDisable = bool
    },

    // 添加事件
    addEvent (type, fn) {
      if (typeof type === 'function') {
        [fn, type] = [type, 'slidingend']
      }
      type = type.toLowerCase()
      return typeof fn === 'function'
        ? type + '-' + (this.eventList[type].push(fn) - 1)
        : false
    },

    // 移除事件
    removeEvent (id) {
      let [type, index] = id.split('-')
      this.eventList[type][index] = null
    }
  }
}
</script>
