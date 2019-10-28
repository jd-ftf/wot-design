<script>
import DatetimePickerMixin from '@/mixins/datetimePicker'
import props from './props'
import { padZero, range } from '@/utils'

export default {
  mixins: [DatetimePickerMixin],
  props: {
    ...props,
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
    }
  },
  watch: {
    value (val) {
      val = this.formatValue(val)

      if (val !== this.innerValue) {
        this.innerValue = val
      }
    }
  },
  computed: {
    ranges () {
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
  },
  methods: {
    formatValue (value) {
      if (!value) {
        value = `${padZero(this.minHour)}:${padZero(this.minMinute)}`
      }

      let [hour, minute] = value.split(':')
      hour = padZero(range(hour, this.minHour, this.maxHour))
      minute = padZero(range(minute, this.minMinute, this.maxMinute))

      return `${hour}:${minute}`
    },
    getValueArray (value) {
      let [hour, minute] = value.split(':')

      return [parseInt(hour), parseInt(minute)]
    },
    updateColumnValues () {
      const values = this.getValueArray(this.innerValue)

      this.$nextTick(() => {
        let pickerView = this.$refs.picker.getPickerView()
        pickerView.setValues(values)
      })
    },
    transferToValue () {
      return `${padZero(this.pickerValue[0])}:${padZero(this.pickerValue[1])}`
    }
  }
}
</script>
