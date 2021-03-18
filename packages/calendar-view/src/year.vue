<template>
  <div class="wd-year">
    <div class="wd-year__title">{{ formatTitle }}</div>
    <div class="wd-year__months">
      <div
        v-for="month in months"
        :key="month.date"
        class="wd-year__month"
        :class="[{
          'is-disabled': month.disabled,
        }, getItemClass(month.type, value, type)]"
        @click="handleDateClick(month)"
      >
        <div class="wd-year__month-container">
          <div class="wd-year__month-top">{{ month.topInfo }}</div>
          <div class="wd-year__month-text">
            {{ month.text }}月
          </div>
          <div class="wd-year__month-bottom">{{ month.bottomInfo }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Toast from 'wot-design/packages/toast'
import { getType } from 'wot-design/src/utils'
import {
  compareMonth,
  getDateByDefaultTime,
  getMonthOffset,
  getMonthByOffset
} from './utils'

export default {
  props: {
    type: String,
    date: Number,
    value: [String, Number, Array],
    minDate: Number,
    maxDate: Number,
    formatter: Function,
    maxRange: Number,
    rangePrompt: String,
    allowSameDay: Boolean,
    defaultTime: Array
  },
  computed: {
    months () {
      const months = []
      const date = new Date(this.date)
      const year = date.getFullYear()

      for (let month = 0; month < 12; month++) {
        const date = new Date(year, month, 1).getTime()
        let type = this.getMonthType(date, this.value)
        if (!type && compareMonth(date, Date.now()) === 0) {
          type = 'current'
        }
        const monthObj = this.getFormatterDate(date, month, type)
        months.push(monthObj)
      }

      return months
    },
    formatTitle () {
      const date = new Date(this.date)
      const year = date.getFullYear()

      return year + '年'
    }
  },
  methods: {
    getItemClass (monthType, value) {
      const classList = [('is-' + monthType)]

      if (this.type.indexOf('range') > -1) {
        if (!value || !value[1]) {
          classList.push('is-without-end')
        } else if (value && value[0] && value[1]) {
          if (this.type === 'monthrange' && compareMonth(value[0], value[1]) === 0) {
            classList.push('is-same-end')
          }
        }
      }

      return classList.join(' ')
    },
    getMonthType (date) {
      if (this.type === 'monthrange') {
        const [startDate, endDate] = this.value || []

        if (startDate && compareMonth(date, startDate) === 0) {
          if (endDate && compareMonth(startDate, endDate) === 0) {
            return 'same'
          }
          return 'start'
        } else if (endDate && compareMonth(date, endDate) === 0) {
          return 'end'
        } else if (startDate && endDate && compareMonth(date, startDate) === 1 && compareMonth(date, endDate) === -1) {
          return 'middle'
        } else {
          return ''
        }
      } else {
        if (this.value && compareMonth(date, this.value) === 0) {
          return 'selected'
        } else {
          return ''
        }
      }
    },
    handleDateClick (date) {
      if (date.disabled) return

      switch (this.type) {
        case 'month':
          this.handleMonthChange(date)
          break
        case 'monthrange':
          this.handleMonthRangeChange(date)
          break
        default:
          this.handleMonthChange(date)
      }
    },
    getDate (date, isEnd) {
      date = this.defaultTime && this.defaultTime.length > 0
        ? getDateByDefaultTime(date, isEnd ? this.defaultTime[1] : this.defaultTime[0])
        : date

      if (date < this.minDate) return this.minDate

      if (date > this.maxDate) return this.maxDate

      return date
    },
    handleMonthChange (date) {
      if (date.type !== 'selected') {
        this.$emit('change', this.getDate(date.date))
      }
    },
    handleMonthRangeChange (date) {
      let value
      const [startDate, endDate] = this.value || []
      const compare = compareMonth(date.date, startDate)

      // 禁止选择同个日期
      if (!this.allowSameDay && compare === 0) return

      if (startDate && !endDate && compare > -1) {
        if (this.maxRange && getMonthOffset(date.date, startDate) > this.maxRange) {
          const maxEndDate = getMonthByOffset(startDate, this.maxRange - 1)
          value = [startDate, this.getDate(maxEndDate)]
          Toast({
            msg: this.rangePrompt || `选择月份不能超过${this.maxRange}个月`,
            context: this
          })
        } else {
          value = [startDate, this.getDate(date.date)]
        }
      } else {
        value = [this.getDate(date.date), null]
      }
      this.$emit('change', value)
    },
    getFormatterDate (date, month, type) {
      let monthObj = {
        date: date,
        text: month + 1,
        topInfo: '',
        bottomInfo: '',
        type,
        disabled: compareMonth(date, this.minDate) === -1 || compareMonth(date, this.maxDate) === 1
      }
      if (this.formatter) {
        if (getType(this.formatter) === 'function') {
          monthObj = this.formatter(monthObj)
        } else {
          console.error('[wot-design] error(wd-calendar-view): the formatter prop of wd-calendar-view should be a function')
        }
      }

      return monthObj
    }
  }
}
</script>
