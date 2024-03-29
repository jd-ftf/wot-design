<template>
  <div class="wd-calendar-view">
    <year-panel
      v-if="type === 'month' || type === 'monthrange'"
      ref="yearPanel"
      :type="type"
      :value="value"
      :min-date="minDate"
      :max-date="maxDate"
      :formatter="formatter"
      :max-range="maxRange"
      :range-prompt="rangePrompt"
      :allow-same-day="allowSameDay"
      :show-panel-title="showPanelTitle"
      :default-time="formatDefauleTime"
      :panel-height="panelHeight"
      @change="handleChange"
    />
    <month-panel
      v-else
      ref="monthPanel"
      :type="type"
      :value="value"
      :min-date="minDate"
      :max-date="maxDate"
      :first-day-of-week="firstDayOfWeek"
      :formatter="formatter"
      :max-range="maxRange"
      :range-prompt="rangePrompt"
      :allow-same-day="allowSameDay"
      :show-panel-title="showPanelTitle"
      :default-time="formatDefauleTime"
      :panel-height="panelHeight"
      :time-filter="timeFilter"
      :hide-second="hideSecond"
      @change="handleChange"
    />
  </div>
</template>

<script>
import YearPanel from './yearPanel'
import MonthPanel from './monthPanel'
import { getDefaultTime } from './utils'

const current = new Date()
const currentYear = current.getFullYear()
const currentMonth = current.getMonth()
const currentDay = current.getDate()

export default {
  name: 'WdCalendarView',
  components: {
    YearPanel,
    MonthPanel
  },
  props: {
    value: null,
    type: {
      type: String,
      default: 'date'
    },
    minDate: {
      type: Date,
      default () {
        return new Date(currentYear, currentMonth - 6, currentDay)
      }
    },
    maxDate: {
      type: Date,
      default () {
        return new Date(currentYear, currentMonth + 6, currentDay, 23, 59, 59)
      }
    },
    firstDayOfWeek: {
      type: Number,
      default: 0
    },
    formatter: Function,
    maxRange: Number,
    rangePrompt: String,
    allowSameDay: Boolean,
    showPanelTitle: {
      type: Boolean,
      default: true
    },
    defaultTime: [String, Array],
    panelHeight: Number,
    timeFilter: Function,
    hideSecond: Boolean
  },
  computed: {
    formatDefauleTime () {
      return getDefaultTime(this.defaultTime)
    }
  },
  methods: {
    // 对外暴露方法
    scrollIntoView () {
      const panel = this.getPanel()
      panel.scrollIntoView()
    },
    getPanel () {
      return this.type.indexOf('month') > -1 ? this.$refs.yearPanel : this.$refs.monthPanel
    },
    handleChange (value) {
      this.$emit('input', value)
      this.$emit('change', value)
    }
  }
}
</script>
