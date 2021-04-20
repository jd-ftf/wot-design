<template>
  <div class="wd-month">
    <div class="wd-month__title">{{ formatTitle }}</div>
    <div class="wd-month__days">
      <div
        v-for="(day, index) in days"
        :key="day.date.getTime()"
        class="wd-month__day"
        :class="[{
          'is-disabled': day.disabled,
        }, getItemClass(day.type, value, type)]"
        :style="getFirstDayStyle(index, day.date, firstDayOfWeek)"
        @click="handleDateClick(day)"
      >
        <div class="wd-month__day-container">
          <div class="wd-month__day-top">{{ day.topInfo }}</div>
          <div class="wd-month__day-text">
            {{ day.text }}
          </div>
          <div class="wd-month__day-bottom">{{ day.bottomInfo }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import locale from 'wot-design/src/mixins/locale'
import Toast from 'wot-design/packages/toast'
import { getType } from 'wot-design/src/utils'
import {
  compareDate,
  getMonthEndDay,
  getWeekRange,
  getDateByDefaultTime,
  getDayOffset,
  getDayByOffset,
  getWeekOffset,
  getWeekByOffset
} from './utils'

export default {
  mixins: [locale],
  props: {
    type: String,
    date: Date,
    value: null,
    minDate: Date,
    maxDate: Date,
    firstDayOfWeek: Number,
    formatter: Function,
    maxRange: Number,
    rangePrompt: String,
    allowSameDay: Boolean,
    defaultTime: Array
  },
  computed: {
    days () {
      const days = []
      const year = this.date.getFullYear()
      const month = this.date.getMonth()

      const totalDay = getMonthEndDay(year, month + 1)

      let value = this.value

      if ((this.type === 'week' || this.type === 'weekrange') && value) {
        value = this.getWeekValue()
      }

      for (let day = 1; day <= totalDay; day++) {
        const date = new Date(year, month, day)
        let type = this.getDayType(date, value)
        if (!type && compareDate(date, new Date()) === 0) {
          type = 'current'
        }
        const dayObj = this.getFormatterDate(date, day, type)
        days.push(dayObj)
      }

      return days
    },
    formatTitle () {
      return dayjs(this.date).format(this.t('wd.calendarView.monthTitle'))
    }
  },
  methods: {
    getItemClass (monthType, value) {
      const classList = [('is-' + monthType)]

      if (this.type.indexOf('range') > -1) {
        if (!value || !value[1]) {
          classList.push('is-without-end')
        }
      }

      return classList.join(' ')
    },
    getFirstDayStyle (index, date, firstDayOfWeek) {
      if (firstDayOfWeek >= 7) {
        firstDayOfWeek = firstDayOfWeek % 7
      }

      if (index !== 0) return ''

      const offset = (7 + date.getDay() - firstDayOfWeek) % 7

      return 'margin-left: ' + (100 / 7) * offset + '%'
    },
    getDayType (date, value) {
      switch (this.type) {
        case 'date':
        case 'datetime':
          return this.getDateType(date)
        case 'dates':
          return this.getDatesType(date)
        case 'daterange':
        case 'datetimerange':
          return this.getDatetimeType(date, value)
        case 'week':
          return this.getWeektimeType(date, value)
        case 'weekrange':
          return this.getWeektimeType(date, value)
        default:
          return this.getDateType(date)
      }
    },
    getDateType (date) {
      if (this.value && compareDate(date, this.value) === 0) {
        return 'selected'
      }

      return ''
    },
    getDatesType (date) {
      if (!this.value) return ''

      let type = ''

      this.value.some((item) => {
        if (compareDate(date, item) === 0) {
          type = 'selected'

          return true
        }

        return false
      })

      return type
    },
    getDatetimeType (date, value) {
      const [startDate, endDate] = value || []

      if (startDate && compareDate(date, startDate) === 0) {
        if (this.allowSameDay && endDate && compareDate(startDate, endDate) === 0) {
          return 'same'
        }
        return 'start'
      } else if (endDate && compareDate(date, endDate) === 0) {
        return 'end'
      } else if (startDate && endDate && compareDate(date, startDate) === 1 && compareDate(date, endDate) === -1) {
        return 'middle'
      } else {
        return ''
      }
    },
    getWeektimeType (date, value) {
      const [startDate, endDate] = value || []

      if (startDate && compareDate(date, startDate) === 0) {
        return 'start'
      } else if (endDate && compareDate(date, endDate) === 0) {
        return 'end'
      } else if (startDate && endDate && compareDate(date, startDate) === 1 && compareDate(date, endDate) === -1) {
        return 'middle'
      } else {
        return ''
      }
    },
    getWeekValue () {
      if (this.type === 'week') {
        return getWeekRange(this.value, this.firstDayOfWeek)
      } else {
        const [startDate, endDate] = this.value || []

        if (startDate) {
          const firstWeekRange = getWeekRange(startDate, this.firstDayOfWeek)

          if (endDate) {
            const endWeekRange = getWeekRange(endDate, this.firstDayOfWeek)

            return [firstWeekRange[0], endWeekRange[1]]
          } else {
            return firstWeekRange
          }
        }

        return []
      }
    },
    handleDateClick (date) {
      switch (this.type) {
        case 'date':
        case 'datetime':
          this.handleDateChange(date)
          break
        case 'dates':
          this.handleDatesChange(date)
          break
        case 'daterange':
        case 'datetimerange':
          this.handleDateRangeChange(date)
          break
        case 'week':
          this.handleWeekChange(date)
          break
        case 'weekrange':
          this.handleWeekRangeChange(date)
          break
        default:
          this.handleDateChange(date)
      }
    },
    getDate (date, isEnd) {
      date = this.defaultTime && this.defaultTime.length > 0
        ? getDateByDefaultTime(date, isEnd ? this.defaultTime[1] : this.defaultTime[0])
        : date

      if (date.getTime() < this.minDate.getTime()) return new Date(this.minDate.getTime())

      if (date.getTime() > this.maxDate.getTime()) return new Date(this.maxDate.getTime())

      return date
    },
    handleDateChange (date) {
      if (date.disabled) return

      if (date.type !== 'selected') {
        this.$emit('change', {
          value: this.getDate(date.date),
          type: 'start'
        })
      }
    },
    handleDatesChange (date) {
      if (date.disabled) return

      const value = (this.value || []).slice(0)
      if (date.type !== 'selected') {
        value.push(this.getDate(date.date))
      } else {
        const index = value.findIndex((item) => {
          return compareDate(item, date.date) === 0
        })
        value.splice(index, 1)
      }
      this.$emit('change', {
        value
      })
    },
    handleDateRangeChange (date) {
      if (date.disabled) return

      let value
      let type
      const [startDate, endDate] = this.value || []
      const compare = compareDate(date.date, startDate)

      // 禁止选择同个日期
      if (!this.allowSameDay && compare === 0 && (this.type === 'daterange' || this.type === 'datetimerange') && !endDate) {
        return
      }

      if (startDate && !endDate && compare > -1) {
        // 不能选择超过最大范围的日期
        if (this.maxRange && getDayOffset(date.date, startDate) > this.maxRange) {
          const maxEndDate = getDayByOffset(startDate, this.maxRange - 1)
          value = [startDate, this.getDate(maxEndDate, true)]
          Toast({
            msg: this.rangePrompt || this.t('wd.calendarView.rangePrompt', { maxRange: this.maxRange }),
            context: this
          })
        } else {
          value = [startDate, this.getDate(date.date, true)]
        }
      } else if (this.type === 'datetimerange' && startDate && endDate) {
        // 时间范围类型，且有开始时间和结束时间，需要支持重新点击开始日期和结束日期可以重新修改时间
        if (compare === 0) {
          type = 'start'
          value = this.value
        } else if (compareDate(date.date, endDate) === 0) {
          type = 'end'
          value = this.value
        } else {
          value = [this.getDate(date.date), null]
        }
      } else {
        value = [this.getDate(date.date), null]
      }

      this.$emit('change', {
        value,
        type: type || (value[1] ? 'end' : 'start')
      })
    },
    handleWeekChange (date) {
      const [weekStart] = getWeekRange(date.date, this.firstDayOfWeek)

      // 周的第一天如果是禁用状态，则不可选中
      if (this.getFormatterDate(weekStart, new Date(weekStart).getDate()).disabled) return

      this.$emit('change', {
        value: new Date(this.getDate(weekStart).getTime() + 24 * 60 * 60 * 1000)
      })
    },
    handleWeekRangeChange (date) {
      const [weekStartDate] = getWeekRange(date.date, this.firstDayOfWeek)

      // 周的第一天如果是禁用状态，则不可选中
      if (this.getFormatterDate(weekStartDate, new Date(weekStartDate).getDate()).disabled) return

      let value
      const [startDate, endDate] = this.value || []
      const [startWeekStartDate] = startDate ? getWeekRange(startDate, this.firstDayOfWeek) : []
      const compare = compareDate(weekStartDate, startWeekStartDate)

      if (startDate && !endDate && compare > -1) {
        if (!this.allowSameDay && compare === 0) return

        // 不能选择超过最大范围的日期
        if (this.maxRange && getWeekOffset(weekStartDate, startWeekStartDate) > this.maxRange) {
          const maxEndDate = getWeekByOffset(startWeekStartDate, this.maxRange - 1)
          value = [new Date(this.getDate(startWeekStartDate).getTime() + 24 * 60 * 60 * 1000), this.getDate(maxEndDate, true)]
          Toast({
            msg: this.rangePrompt || this.t('wd.calendarView.rangePromptWeek', { maxRange: this.maxRange }),
            context: this
          })
        } else {
          value = [new Date(this.getDate(startWeekStartDate).getTime() + 24 * 60 * 60 * 1000), new Date(this.getDate(weekStartDate).getTime() + 24 * 60 * 60 * 1000)]
        }
      } else {
        value = [new Date(this.getDate(weekStartDate).getTime() + 24 * 60 * 60 * 1000), null]
      }

      this.$emit('change', {
        value
      })
    },
    getFormatterDate (date, day, type) {
      let dayObj = {
        date: date,
        text: day,
        topInfo: '',
        bottomInfo: '',
        type,
        disabled: compareDate(date, this.minDate) === -1 || compareDate(date, this.maxDate) === 1
      }
      if (this.formatter) {
        if (getType(this.formatter) === 'function') {
          dayObj = this.formatter(dayObj)
        } else {
          console.error('[wot-design] error(wd-calendar-view): the formatter prop of wd-calendar-view should be a function')
        }
      }

      return dayObj
    }
  }
}
</script>
