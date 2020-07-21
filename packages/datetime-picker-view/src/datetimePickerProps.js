const currentYear = new Date().getFullYear()

export default {
  filter: Function,
  formatter: Function,
  columnFormatter: Function,
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
}
