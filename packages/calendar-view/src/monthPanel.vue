<template>
  <div class="wd-month-panel">
    <div v-if="showPanelTitle" class="wd-month-panel__title">
      {{ title }}
    </div>
    <div class="wd-month-panel__weeks">
      <div v-for="item in 7" :key="item" class="wd-month-panel__week">{{ getWeekLabel(item - 1 + firstDayOfWeek) }}</div>
    </div>
    <div
      ref="container"
      class="wd-month-panel__container"
      :class="{
        'wd-month-panel__container--time': !!timeType
      }"
      :style="{
        height: (timeType ? ((panelHeight || 378) - 125) : (panelHeight || 378)) + 'px'
      }"
    >
      <month
        v-for="item in months"
        ref="months"
        :key="item"
        :type="type"
        :date="item"
        :value="value"
        :min-date="minDate"
        :max-date="maxDate"
        :first-day-of-week="firstDayOfWeek"
        :formatter="formatter"
        :max-range="maxRange"
        :range-prompt="rangePrompt"
        :allow-same-day="allowSameDay"
        :default-time="defaultTime"
        @change="handleDateChange"
      />
    </div>
    <div v-if="!!timeType" class="wd-month-panel__time">
      <div v-if="type === 'datetimerange'" class="wd-month-panel__time-label">
        <div class="wd-month-panel__time-text">{{ timeType === 'start' ? '开始' : '结束' }}</div>
      </div>
      <div class="wd-month-panel__time-picker">
        <wd-picker-view
          v-model="timeValue"
          :columns="timeData"
          :columns-height="125"
          @change="handleTimeChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import WdPickerView from 'wot-design/packages/picker-view'
import { getType, isEqual } from 'wot-design/src/utils'
import Month from './month'
import { compareMonth, formatMonthTitle, getTimeData } from './utils'

export default {
  components: {
    WdPickerView,
    Month
  },
  props: {
    type: String,
    value: [String, Number, Array],
    minDate: Number,
    maxDate: Number,
    firstDayOfWeek: Number,
    formatter: Function,
    maxRange: Number,
    rangePrompt: String,
    allowSameDay: Boolean,
    showPanelTitle: Boolean,
    defaultTime: Array,
    panelHeight: Number,
    timeFilter: Function,
    hideSecond: Boolean
  },
  data () {
    return {
      title: '',
      timeValue: [],
      timeData: [],
      timeType: '',
      innerValue: ''
    }
  },
  computed: {
    months () {
      const months = []
      const month = new Date(this.minDate)
      month.setDate(1)

      while (compareMonth(month, this.maxDate) < 1) {
        months.push(month.getTime())
        month.setMonth(month.getMonth() + 1)
      }

      return months
    }
  },
  watch: {
    value: {
      handler (val) {
        if (isEqual(val, this.innerValue)) return

        if ((this.type === 'datetime' && val) || (this.type === 'datetimerange' && val && val.length > 0 && val[0])) {
          this.timeType = 'start'
          this.setTime(val, 'start')
        }
      },
      immediate: true
    },
    type (val) {
      if ((val === 'datetime' && this.value) || (val === 'datetimerange' && this.value && this.value.length > 0 && this.value[0])) {
        this.timeType = 'start'
        this.setTime(this.value, 'start')
      }
    }
  },
  mounted () {
    if (this.showPanelTitle) {
      this.onScroll()
      this.$refs.container.addEventListener('scroll', this.onScroll)
      this.$refs.container.addEventListener('touchmove', this.onScroll)
    }
    this.scrollIntoView()
  },
  beforeDestroy () {
    if (this.showPanelTitle) {
      this.$refs.container.removeEventListener('scroll', this.onScroll)
      this.$refs.container.removeEventListener('touchmove', this.onScroll)
    }
  },
  methods: {
    getWeekLabel (index) {
      const weeks = ['日', '一', '二', '三', '四', '五', '六']

      if (index >= 7) {
        index = index % 7
      }

      return weeks[index]
    },
    onScroll () {
      const { container, months } = this.$refs
      const top = container.scrollTop
      const bottom = top + container.clientHeight
      const heights = months.map(item => item.$el.clientHeight)
      const heightSum = heights.reduce((a, b) => a + b)

      if (bottom > heightSum && top > 0) return

      let currentMonth
      let height = 0
      const visibleRange = [-1, -1]

      for (let i = 0, len = months.length; i < len; i++) {
        const visible = height < bottom && (height + heights[i]) > top

        if (visible) {
          visibleRange[1] = i

          if (!currentMonth) {
            currentMonth = months[i]
            visibleRange[0] = i
          }
        }

        height += heights[i]
      }

      if (currentMonth) {
        this.title = formatMonthTitle(currentMonth.date)
      }
    },
    scrollIntoView () {
      let activeDate
      const type = getType(this.value)
      if (type === 'array') {
        activeDate = this.value[0]
      } else if (type === 'number') {
        activeDate = this.value
      }

      if (!activeDate) {
        activeDate = Date.now()
      }

      this.months.some((month, index) => {
        if (compareMonth(month, activeDate) === 0) {
          const { container, months } = this.$refs
          container.scrollTop = months[index].$el.getBoundingClientRect().top - container.getBoundingClientRect().top + container.scrollTop
          return true
        }

        return false
      })
    },
    /**
     * 获取时间 picker 的数据
     * @param {timestamp|array} value 当前时间
     * @param {string} type 类型，是开始还是结束
     */
    getTimeData (value, type) {
      if (this.type === 'datetime') {
        return getTimeData({
          date: value,
          minDate: this.minDate,
          maxDate: this.maxDate,
          filter: this.timeFilter,
          isHideSecond: this.hideSecond
        })
      } else {
        if (type === 'start') {
          return getTimeData({
            date: value[0],
            minDate: this.minDate,
            maxDate: this.value[1] ? this.value[1] : this.maxDate,
            filter: this.timeFilter,
            isHideSecond: this.hideSecond
          })
        } else {
          return getTimeData({
            date: value[1],
            minDate: value[0],
            maxDate: this.maxDate,
            filter: this.timeFilter,
            isHideSecond: this.hideSecond
          })
        }
      }
    },
    /**
     * 获取 date 的时分秒
     * @param {timestamp} date 时间
     * @param {string} type 类型，是开始还是结束
     */
    getTimeValue (date, type) {
      if (this.type === 'datetime') {
        date = new Date(date)
      } else {
        if (type === 'start') {
          date = new Date(date[0])
        } else {
          date = new Date(date[1])
        }
      }

      const hour = date.getHours()
      const minute = date.getMinutes()
      const second = date.getSeconds()

      return this.hideSecond ? [hour, minute] : [hour, minute, second]
    },
    setTime (value, type) {
      if (getType(value) === 'array' && value[0] && value[1] && type === 'start' && this.timeType === 'start') {
        type = 'end'
      }

      this.timeData = this.getTimeData(value, type)
      this.timeValue = this.getTimeValue(value, type)
      this.timeType = type
    },
    handleDateChange ({ value, type }) {
      if (!isEqual(value, this.value)) {
        this.innerValue = value
        this.handleChange(value)
      }
      // datetime 和 datetimerange 类型，需要计算 timeData 并做展示
      if (this.type.indexOf('time') > -1) {
        this.setTime(value, type)
      }
    },
    handleChange (value) {
      this.$emit('change', value)
    },
    handleTimeChange (picker, value) {
      if (this.type === 'datetime') {
        const date = new Date(this.value)
        date.setHours(value[0])
        date.setMinutes(value[1])
        date.setSeconds(this.hideSecond ? 0 : value[2])
        const dateTime = date.getTime()

        this.timeData = this.getTimeData(dateTime)
        this.handleChange(dateTime)
      } else {
        const [start, end] = this.value
        const dataValue = this.timeType === 'start' ? start : end
        const date = new Date(dataValue)
        date.setHours(value[0])
        date.setMinutes(value[1])
        date.setSeconds(this.hideSecond ? 0 : value[2])
        const dateTime = date.getTime()

        if (dateTime === dataValue) return

        const finalValue = [start, end]
        if (this.timeType === 'start') {
          finalValue[0] = dateTime
        } else {
          finalValue[1] = dateTime
        }

        this.innerValue = finalValue
        this.timeData = this.getTimeData(finalValue, this.timeType)

        this.handleChange(finalValue)
      }
    }
  }
}
</script>
