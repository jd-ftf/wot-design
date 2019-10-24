<script>
import DatetimePickerMixin from '@/mixins/datetimePicker'
import props from './props'

const currentYear = new Date().getFullYear()

const getMonthEndDay = (year, month) => {
  return 32 - new Date(year, month - 1, 32).getDate()
}

export default {
  mixins: [DatetimePickerMixin],
  props: {
    ...props,
    minDate: {
      type: Date,
      default: () => new Date(currentYear - 10, 0, 1)
    },
    maxDate: {
      type: Date,
      default: () => new Date(currentYear + 10, 11, 31)
    }
  },
  watch: {
    value (val) {
      val = this.formatValue(val)

      if (val.valueOf() !== this.innerValue.valueOf()) {
        this.innerValue = val
      }
    },
    maxDate: 'updateInnerValue',
    minDate: 'updateInnerValue'
  },
  computed: {
    ranges () {
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
    }
  },
  methods: {
    formatValue (value) {
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
      const pickerView = this.$refs.picker.getPickerView()
      const values = pickerView.getValues()
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
        let pickerView = this.$refs.picker.getPickerView()
        pickerView.setValues(values)
      })
    },
    getValueArray (value) {
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
    },
    transferToValue () {
      let date
      if (this.type === 'date') {
        date = new Date(this.pickerValue[0], this.pickerValue[1] - 1, this.pickerValue[2], 0, 0)
      } else if (this.type === 'year-month') {
        date = new Date(this.pickerValue[0], this.pickerValue[1] - 1, this.pickerValue[2], 0, 0)
      } else {
        date = new Date(this.pickerValue[0], this.pickerValue[1] - 1, this.pickerValue[2], this.pickerValue[3], this.pickerValue[4])
      }

      return date
    }
  }
}
</script>
