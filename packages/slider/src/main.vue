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
      {{ min }}
    </div>
    <div
      :class="{
        'jm-slider__bar-wrapper' : true
      }"
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
        @touchstart="onTouchStart(true)"
        @touchmove="onTouchMove(true)"
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
        @touchstart="onTouchStart(false)"
        @touchmove="onTouchMove(false)"
        @touchend="onTouchEnd"
      >
        <div class="jm-slider__label" v-if="!hideLabel">{{ rightNewValue }}</div>
        <div class="jm-slider__button" />
      </div>
    </div>
    <div class="jm-slider__label-max" v-if="!hideMinMax">{{ max }}</div>
  </div>
</template>

<script>
import touchMixin from 'jm-design/src/mixins/touch'

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
    max: {
      type: Number,
      default: 100
    },
    min: {
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
      // 右边滑轮距离右端点的百分比距离
      rightBarPercent: 0,
      // 左边滑轮距离左顶点的百分比距离
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
    onTouchStart (left) {
      if (this.disabled) return
      this.touchStart(window.event)
      if (left) {
        // 是左边滑轮
        this.startValue = this.checkType(this.currentValue) !== 'Array'
          ? this.format(this.currentValue)
          : (this.leftBarPercent < this.rightBarPercent
            ? this.format(this.currentValue[0])
            : this.format(this.currentValue[1]))
      } else {
        // 记录开始数据值
        this.startValue = this.leftBarPercent < this.rightBarPercent
          ? this.format(this.currentValue[1])
          : this.format(this.currentValue[0])
      }
      this.$emit('dragstart', this.currentValue)
    },
    /**
     * 确定移动的是哪一个滑轮
     * @param {Boolean} left true：左  false：右
     */
    onTouchMove (left) {
      if (this.disabled) return
      const { max, min } = this
      this.touchMove(window.event)
      const diff = this.deltaX / this.trackWidth * (max - min)
      this.newValue = this.startValue + diff
      if (left) {
        this.leftBarSlider(this.newValue)
      } else {
        this.rightBarSlider(this.newValue)
      }
      this.$emit('dragmove', this.currentValue)
      this.$emit('input', this.currentValue)
    },
    onTouchEnd () {
      if (this.disabled) return
      this.$emit('dragend', this.currentValue)
      this.$emit('change', this.currentValue)
    },
    /**
     * 控制右侧滑轮滑动， value校验
     * @param {Number} value 当前滑轮绑定值
     */
    rightBarSlider (value) {
      const { min, max } = this
      const rightBarPercent = (value - min) / (max - min) * 100
      this.rightNewValue = this.format(value)
      this.rightBarPercent = this.format(rightBarPercent)
      this.styleControl()
    },
    /**
     * 控制左滑轮滑动，更新渲染数据，对 value 进行校验取整
     * @param {Number} value 当前滑轮绑定值
     */
    leftBarSlider (value) {
      const { min, max, showRight } = this
      value = this.format(value)
      // 把 value 转换成百分比
      const percent = this.format((value - min) / (max - min) * 100)
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
      const { leftBarPercent, rightBarPercent } = this
      // 左右滑轮距离左边最短为当前激活条所处位置
      const barLeft = leftBarPercent < rightBarPercent
        ? [leftBarPercent, rightBarPercent]
        : [rightBarPercent, leftBarPercent]
      this.barWidth = barLeft[1] - barLeft[0]
      this.barLeft = barLeft[0]
      // 更新当前绑定值
      this.currentValue = leftNewValue < rightNewValue
        ? [leftNewValue, rightNewValue]
        : [rightNewValue, leftNewValue]
    },
    updateValue (newValue, oldValue) {
      const condition = newValue && oldValue &&
              (this.checkType(newValue) === 'Array' ? !this.equal(newValue, oldValue) : (newValue === oldValue))
      if (condition) return
      if (newValue && oldValue) {
        // 类型校验，支持所有值(除null、undefined。undefined建议统一写成void (0)防止全局undefined被覆盖)
        if (newValue === null || newValue === undefined) {
          throw Error('value can\'t be null or undefined')
        } else if (this.checkType(newValue) === 'Array' && newValue.length !== 2) {
          throw Error('value must be dyadic array')
        } else if (this.checkType(newValue) !== 'Number' && this.checkType(newValue) !== 'Array') {
          throw Error('value must be dyadic array Or Number')
        }
      }
      // 动态传值后修改
      if (this.checkType(this.value) === 'Array') {
        this.showRight = true
        this.currentValue = this.value
        if (this.leftBarPercent < this.rightBarPercent) {
          this.leftBarSlider(this.value[0])
          this.rightBarSlider(this.value[1])
        } else {
          this.leftBarSlider(this.value[1])
          this.rightBarSlider(this.value[0])
        }
      } else {
        this.leftBarSlider(this.value)
      }
    },
    // 将pos转化为value
    pos2Value (pos) {
      const { max, min, step } = this
      const percent = pos / this.trackWidth
      const value = percent * (max - min) + min
      const res = min + Math.floor((value - min) / step) * step
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
      const { max, min, step } = this
      return Math.round(Math.max(min, Math.min(value, max)) / step) * step
    }
  }
}
</script>
