import Picker from 'jm-design/packages/picker'
import pickerProps from 'jm-design/packages/picker/src/pickerProps'
import { padZero } from 'jm-design/src/utils'

const times = (num, formatter) => {
  let index = -1
  let array = []

  while (++index < num) {
    array.push(formatter(index))
  }

  return array
}

export default {
  data () {
    return {
      innerValue: this.formatValue(this.value),
      pickerValue: this.getPickerValue(this.value)
    }
  },
  computed: {
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
    columns: 'updateColumnValues',
    value () {
      this.pickerValue = this.getPickerValue(this.value)
    }
  },
  methods: {
    onConfirm () {
      this.$nextTick(() => {
        this.$emit('input', this.transferToValue())
        this.$emit('confirm')
      })
    },
    onCancel () {
      this.$emit('cancel')
    },
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
    }
  },
  render () {
    let props = {}
    Object.keys(pickerProps).forEach(key => {
      props[key] = this[key]
    })
    props.displayFormat = this.formatDisplay

    return (
      <Picker
        ref="picker"
        vModel={this.pickerValue}
        columns={this.columns}
        column-change={this.onColumnChange}
        onConfirm={this.onConfirm}
        onCancel={this.onCancel}
        {...{ props }}
      />
    )
  }
}
