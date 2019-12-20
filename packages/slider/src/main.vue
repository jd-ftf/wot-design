<template>
  <div
    ref="track"
    :class="{
      'jm-slider': true,
      'jm-slider__has-label': !hideLabel,
      'jm-slider--disabled': disabled
    }"
  >
    <div
      class="jm-slider__label-min"
      v-if="!hideMinMax">
      {{ minValue }}
    </div>
    <div
      class="jm-slider__bar-wrapper"
      :style="{background: inactiveColor ? inactiveColor : '' } "
    >
      <div
        class="jm-slider__bar"
        :style="{ background: activeColor ? activeColor : '',
                  width: barWidth + '%',
                  left: barLeft + '%'
                }"
      ></div>
      <!-- 左边 -->
      <div
        class="jm-slider__button-wrapper"
        :style="{left:  leftBarPercent - 10 + '%', visibility: !disabled ? 'show' : 'hidden' }"
        @touchstart="onTouchStart"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd"
      >
        <div class="jm-slider__label" v-if="!hideLabel">{{ leftNewValue }}</div>
        <div class="jm-slider__button" />
      </div>
      <!-- 右边 -->
      <div
        v-if="showRight"
        class="jm-slider__button-wrapper"
        :style="{ left: rightBarPercent - 10 + '%' , visibility: !disabled ? 'show' : 'hidden' } "
        @touchstart="onTouchStartRight"
        @touchmove="onTouchMoveRight"
        @touchend="onTouchEndRight"
      >
        <div class="jm-slider__label" v-if="!hideLabel">{{ rightNewValue }}</div>
        <div class="jm-slider__button" />
      </div>
    </div>
    <div class="jm-slider__label-max" v-if="!hideMinMax">{{ maxValue }}</div>
  </div>
</template>

<script>
import touchMixin from '@/mixins/touch'

export default {
  name: 'JmSlider',
  mixins: [touchMixin],
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
    },
    inactiveColor: {
      type: String,
      default: '#e5e5e5'
    },
    activeColor: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      showRight: false,
      barWidth: '',
      barLeft: '',
      barHeight: '6px',
      leftNewValue: 0,
      rightNewValue: 0,
      rightBarPercent: 0,
      leftBarPercent: 0
    }
  },
  watch: {
    value (newValue, oldValue) {
      this.updateValue(newValue, oldValue)
    }
  },
  created () {
    this.updateValue()
  },
  mounted () {
    // 获取轨道长度
    this.trackWidth = this.$refs.track && this.$refs.track.clientWidth
    window.onresize = () => {
      this.trackWidth = this.$refs.track && this.$refs.track.clientWidth
    }
  },
  methods: {
    updateValue (newValue, oldValue) {
      const condition = newValue && oldValue &&
              (this.checkType(newValue) === 'Array' ? this.equal(newValue, oldValue) : (newValue === oldValue))
      if (condition) return
      const { value } = this
      // 动态传值后修改
      if (this.checkType(value) === 'Array') {
        this.showRight = true
        this.currentValue = this.value
        const { leftBarPercent, rightBarPercent } = this
        if (leftBarPercent < rightBarPercent) {
          this.leftBarSlider(value[0])
          this.rightBarSlider(value[1])
        } else {
          this.leftBarSlider(value[1])
          this.rightBarSlider(value[0])
        }
      } else {
        this.leftBarSlider(value)
      }
    },
    onTouchStart (even) {
      if (this.disabled) return
      const { leftBarPercent, currentValue, rightBarPercent } = this
      this.touchStart(event)
      // 是左边滑轮
      this.startValue = this.checkType(currentValue) !== 'Array' ? this.format(currentValue)
        : (leftBarPercent < rightBarPercent ? this.format(currentValue[0]) : this.format(currentValue[1]))
    },
    onTouchMove (event) {
      if (this.disabled) return
      const { maxValue, minValue } = this
      this.touchMove(event)
      // 移动间距 this.deltaX 就是向左(-)向右(+)
      const diff = this.deltaX / this.trackWidth * (maxValue - minValue)
      this.newValue = this.startValue + diff
      // 左滑轮滑动控制
      this.leftBarSlider(this.newValue)
      this.$emit('dragmove', this.currentValue)
    },
    onTouchEnd () {
      /* eslint-disable no-useless-return */
      if (this.disabled) return
      this.$emit('dragend', this.currentValue)
    },
    // 右边滑轮滑动状态监听
    onTouchStartRight (event) {
      if (this.disabled) return
      const { leftBarPercent, rightBarPercent, currentValue } = this
      // 右滑轮移动时数据绑定
      this.touchStart(event)
      // 记录开始数据值
      this.startValue = leftBarPercent < rightBarPercent ? this.format(currentValue[1]) : this.format(currentValue[0])
      this.$emit('dragstart', this.currentValue)
    },
    onTouchMoveRight (event) {
      if (this.disabled) return
      const { maxValue, minValue } = this
      this.touchMove(event)
      // 移动间距 this.deltaX 就是向左向右
      const diff = this.deltaX / this.trackWidth * (maxValue - minValue)
      this.newValue = this.format(this.startValue + diff)
      // 右滑轮滑动控制
      this.rightBarSlider(this.newValue)
      this.$emit('dragmove', this.currentValue)
    },
    onTouchEndRight () {
      if (this.disabled) return
      console.log(this.currentValue)
      this.$emit('dragend', this.currentValue)
    },
    /**
     * 控制右侧滑轮滑动， value校验
     * @param {Number} value 当前滑轮绑定值
     */
    rightBarSlider (value) {
      const { minValue, maxValue } = this
      const rightBarPercent = (value - minValue) / (maxValue - minValue) * 100
      this.rightNewValue = this.format(value)
      this.rightBarPercent = this.format(rightBarPercent)
      this.styleControl()
    },
    /**
     * 控制左滑轮滑动，更新渲染数据，对 value 进行校验取整
     * @param {Number} value 当前滑轮绑定值
     */
    leftBarSlider (value) {
      const { minValue, maxValue, showRight } = this
      value = this.format(value)
      // 把 value 转换成百分比
      const percent = this.format((value - minValue) / (maxValue - minValue) * 100)
      this.leftNewValue = value
      this.leftBarPercent = this.format(percent)
      if (!showRight) {
        this.currentValue = value
        this.barWidth = percent
      } else {
        this.styleControl()
      }
    },
    // 样式控制
    styleControl () {
      const { leftNewValue, rightNewValue } = this
      if (!leftNewValue || !rightNewValue) return
      const { leftBarPercent, rightBarPercent } = this
      // 左右滑轮距离左边最短为当前激活条所处位置
      const barLeft = leftBarPercent < rightBarPercent
        ? [leftBarPercent, rightBarPercent]
        : [rightBarPercent, leftBarPercent]
      this.barWidth = barLeft[1] - barLeft[0]
      this.barLeft = barLeft[0]
      this.currentValue = leftNewValue < rightNewValue
        ? [leftNewValue, rightNewValue]
        : [rightNewValue, leftNewValue]
    },
    // 将pos转化为value
    pos2Value (pos) {
      const { maxValue, minValue, step } = this
      const percent = pos / this.trackWidth
      const value = percent * (maxValue - minValue) + minValue
      const res = minValue + Math.floor((value - minValue) / step) * step
      return res
    },
    checkType (value) {
      return Object.prototype.toString.call(value).slice(8, -1)
    },
    equal (arr1, arr2) {
      let i = 0
      arr1.forEach((item, index) => {
        item === arr2[index] && i++
      })
      return (i === 2)
    },
    format (value) {
      const { maxValue, minValue, step } = this
      return Math.round(Math.max(minValue, Math.min(value, maxValue)) / step) * step
    }
  }
}
</script>

<style>
</style>
