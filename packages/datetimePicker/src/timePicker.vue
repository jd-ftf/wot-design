<script>
import DatetimePickerMixin from '@/mixins/datetimePicker'
import props from './props'

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
  }
}
</script>
