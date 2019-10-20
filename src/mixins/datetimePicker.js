import Picker from 'jm-design/picker'
import pickerProps from 'jm-design/picker/src/pickerProps'

const times = (num, formatter) => {
  let index = -1
  let array = []

  while (++index < num) {
    array.push(formatter(index))
  }

  return array
}

const padZero = (number, length = 2) => {
  number = number + ''

  while (number.length < length) {
    number = '0' + number
  }

  return number
}

export default {
  data () {
    return {
      innerValue: this.formatValue(this.value)
    }
  },
  computed: {
    originColumns () {
      return this.ranges.map(({ type, range }) => {
        let values = times(range[1] - range[0] + 1, index => {
          return padZero(range[0] + index)
        })

        if (this.filter) {
          this.filter(type, values)
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
          label: this.formatter(column.type, value),
          value
        }))
      })
    }
  },
  render () {
    let props = {}
    Object.keys(pickerProps).forEach(key => {
      props[key] = this[key]
    })

    return (
      <Picker
        columns={this.columns}
        column-change={this.onColumnChange}
        {...{ props }}
      />
    )
  }
}
