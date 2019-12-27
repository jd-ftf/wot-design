import { padZero, range } from 'wot-design/src/utils'
import pickerViewProps from '../../packages/picker-view/src/pickerViewProps'

const times = (num, formatter) => {
  let index = -1
  let array = []

  while (++index < num) {
    array.push(formatter(index))
  }

  return array
}

const currentYear = new Date().getFullYear()

const getMonthEndDay = (year, month) => {
  return 32 - new Date(year, month - 1, 32).getDate()
}

export default {
  data () {
    return {
      innerValue: this.formatValue(this.value),
      pickerValue: this.getPickerValue()
    }
  },
  props: {
    ...pickerViewProps,
    type: {
      type: String,
      default: 'datetime'
    },
    value: null,
    filter: Function,
    formatter: {
      type: Function,
      default: (type, value) => value
    },
    minHour: {
      type: Number,
      default: 0
    },
    maxHour: {
      type: Number,
      default: 23
    },
    minMinute: {
      type: Number,
      default: 0
    },
    maxMinute: {
      type: Number,
      default: 59
    },
    minDate: {
      type: Date,
      default: () => new Date(currentYear - 10, 0, 1)
    },
    maxDate: {
      type: Date,
      default: () => new Date(currentYear + 10, 11, 31)
    }
  },
  computed: {
    ranges () {
      if (this.type === 'time') {
        return [
          {
            type: 'hour',
            range: [this.minHour, this.maxHour]
          }, {
            type: 'minute',
            range: [this.minMinute, this.maxMinute]
          }
        ]
      }

      const { maxYear, maxMonth, maxDate, maxHour, maxMinute } = this.getBoundary('max', this.innerValue)
      const { minYear, minMonth, minDate, minHour, minMinute } = this.getBoundary('min', this.innerValue)

      const result = [
        {
          type: 'year',
          range: [minYear, maxYear]
        }, {
          type: 'month',
          range: [minMonth, maxMonth]
        }, {
          type: 'date',
          range: [minDate, maxDate]
        }, {
          type: 'hour',
          range: [minHour, maxHour]
        }, {
          type: 'minute',
          range: [minMinute, maxMinute]
        }
      ]

      if (this.type === 'date') result.splice(3, 2)

      if (this.type === 'year-month') result.splice(2, 3)

      return result
    },
    originColumns () {
      return this.ranges.map(({ type, range }) => {
        let values = times(range[1] - range[0] + 1, index => {
          return range[0] + index
        })

        if (this.filter) {
          values = this.filter(type, values)
        }

        return {
          type,
          values
        }
      })
    },
    columns () {
      return this.originColumns.map(column => {
        return column.values.map(value => ({
          label: this.formatter(column.type, padZero(value)),
          value
        }))
      })
    }
  },
  watch: {
    value (val, oldVal) {
      if (oldVal && val.valueOf() === this.innerValue.valueOf()) return

      val = this.formatValue(val)
      this.innerValue = val
      this.pickerValue = this.getPickerValue()
    },
    columns: 'updateColumnValues',
    maxDate: 'updateInnerValue',
    minDate: 'updateInnerValue'
  },
  methods: {
    getPickerValue () {
      if (this.value) {
        let value = this.formatValue(this.value)
        let result = this.getValueArray(value)

        return result
      }

      return ''
    },
    formatDisplay (items) {
      if (this.displayFormat) return this.displayFormat(items)

      if (this.type !== 'time') {
        return items.length === 2
          ? `${items[0].value}-${padZero(items[1].value)}`
          : items.length === 3
            ? `${items[0].value}-${padZero(items[1].value)}-${padZero(items[2].value)}`
            : `${items[0].value}-${padZero(items[1].value)}-${padZero(items[2].value)} ${padZero(items[3].value)}:${padZero(items[4].value)}`
      }

      return `${padZero(items[0].value)}:${padZero(items[1].value)}`
    },
    formatValue (value) {
      if (this.type === 'time') {
        if (!value) {
          value = `${padZero(this.minHour)}:${padZero(this.minMinute)}`
        }

        let [hour, minute] = value.split(':')
        hour = padZero(range(hour, this.minHour, this.maxHour))
        minute = padZero(range(minute, this.minMinute, this.maxMinute))

        return `${hour}:${minute}`
      }

      if (Object.prototype.toString.call(value) !== '[object Date]' || isNaN(value.getTime())) {
        value = this.minDate
      }

      value = Math.max(value.getTime(), this.minDate.getTime())
      value = Math.min(value, this.maxDate.getTime())

      return new Date(value)
    },
    getBoundary (type, value) {
      const boundary = this[`${type}Date`]
      const year = boundary.getFullYear()
      let month = 1
      let date = 1
      let hour = 0
      let minute = 0

      if (type === 'max') {
        month = 12
        date = getMonthEndDay(value.getFullYear(), value.getMonth() + 1)
        hour = 23
        minute = 59
      }

      if (value.getFullYear() === year) {
        month = boundary.getMonth() + 1

        if (value.getMonth() + 1 === month) {
          date = boundary.getDate()

          if (value.getDate() === date) {
            hour = boundary.getHours()

            if (value.getHours() === hour) {
              minute = boundary.getMinutes()
            }
          }
        }
      }

      return {
        [`${type}Year`]: year,
        [`${type}Month`]: month,
        [`${type}Date`]: date,
        [`${type}Hour`]: hour,
        [`${type}Minute`]: minute
      }
    },
    updateInnerValue () {
      const pickerView = this.$refs.pickerView || this.$refs.picker.getPickerView()
      const values = pickerView.getValues()

      if (this.type === 'time') {
        this.innerValue = `${padZero(values[0])}:${padZero(values[1])}`
        return
      }

      const year = values[0] && parseInt(values[0])
      const month = values[1] && parseInt(values[1])

      const maxDate = getMonthEndDay(year, month)
      let date = this.type === 'year-month' ? 1 : (values[2] && parseInt(values[2]))
      date = date > maxDate ? maxDate : date

      let hour = 0
      let minute = 0

      if (this.type === 'datetime') {
        hour = values[3] && parseInt(values[3])
        minute = values[4] && parseInt(values[4])
      }
      const value = new Date(year, month - 1, date, hour, minute)

      this.innerValue = this.formatValue(value)
    },
    onColumnChange (pickerView) {
      this.updateInnerValue()
    },
    updateColumnValues () {
      const values = this.getValueArray(this.innerValue)

      this.$nextTick(() => {
        let pickerView = this.$refs.pickerView || this.$refs.picker.getPickerView()
        pickerView.setValues(values)
      })
    },
    getValueArray (value) {
      if (this.type === 'time') {
        let [hour, minute] = value.split(':')

        return [parseInt(hour), parseInt(minute)]
      }

      const values = [
        value.getFullYear(),
        value.getMonth() + 1,
        value.getDate(),
        value.getHours(),
        value.getMinutes()
      ]

      if (this.type === 'date') values.splice(3, 2)

      if (this.type === 'year-month') values.splice(2, 3)

      return values
    }
  }
}
