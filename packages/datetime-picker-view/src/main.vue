<template>
  <wd-picker-view
    ref="pickerView"
    v-model="pickerValue"
    :columns="columns"
    :loading="loading"
    :loading-color="loadingColor"
    :arrow-html="arrowHtml"
    :column-change="onColumnChange"
    :columns-height="columnsHeight"
    @change="handleChange"
  />
</template>

<script>
import WdPickerView from 'wot-design/packages/picker-view'
import { padZero, range } from 'wot-design/src/utils'
import pickerViewProps from 'wot-design/packages/picker-view/src/pickerViewProps'
import datetimePickerViewProps from 'wot-design/packages/datetime-picker-view/src/datetimePickerProps'

const times = (num, formatter) => {
  let index = -1
  let array = []

  while (++index < num) {
    array.push(formatter(index))
  }

  return array
}

const getMonthEndDay = (year, month) => {
  return 32 - new Date(year, month - 1, 32).getDate()
}

export default {
  name: 'WdDatetimePickerView',
  components: {
    WdPickerView
  },

  data () {
    // 初始化值
    return {
      // 格式化初始值（当前选中值）
      innerValue: this.formatValue(this.value),
      // 日期选项数组，将日期拆分成picker的每一列的选项
      pickerValue: this.getPickerValue(this.value)
    }
  },

  props: {
    ...pickerViewProps,
    ...datetimePickerViewProps,
    // datetime / 'date' / 'year-month' / 'time'
    type: {
      type: String,
      default: 'datetime'
    },
    value: null,
    startSymbol: Boolean
  },

  computed: {
    // 年月日时分秒区间设置
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

      return this.getRangesList(this.innerValue)
    },
    originColumns () {
      /**
       * 获取 每个时间类型的最大最小值 范围， 计算出当前的源 Columns
       * 获取时间范围时 startPicker endPicker 中
       * 开始选择器中的时间，每一个都是 endPicker 的最小时间（disabledIndex)
       * 禁用项 minLine -> disabledIndex
       */
      const mapRange = (ranges, type) => {
        return ranges.map(({ type, range }) => {
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
      }

      return mapRange(this.ranges)
    },
    columns () {
      if (this.columnFormatter) {
        // 禁用特殊处理函数, 外部传入
        return this.columnFormatter(this, this.originColumns, this.value)
      } else {
        const mapColumns = (columns, type) => {
          // 此时index是最外层知道当前的索引即可得到当前是哪个时间段
          return columns.map((column, cindex) => {
            return column.values.map((value, index) => {
              return {
                label: this.formatter ? this.formatter(column.type, padZero(value)) : padZero(value),
                value
              }
            })
          })
        }
        return mapColumns(this.originColumns)
      }
    }
  },

  watch: {
    innerValue () {
      this.$emit('input', this.innerValue)
    },
    value: {
      handler (val, oldVal) {
        // 存在旧值，新值与 innerValue 相同，则不作处理
        if (oldVal && val.valueOf() === this.innerValue.valueOf()) return
        // 格式化新值
        val = this.formatValue(val)
        // 当前 value 赋值
        this.innerValue = val
        // 每一列选择器数据赋值
        this.pickerValue = this.getPickerValue(val)
      },
      immediate: true
    },
    columns: {
      handler () {
        this.updateColumnValues()
      },
      immediate: true
    },
    maxDate: 'updateInnerValue',
    minDate: 'updateInnerValue'
  },

  methods: {
    // 获取区间范围列表
    getRangesList (value) {
      const { maxYear, maxMonth, maxDate, maxHour, maxMinute } = this.getBoundary('max', value)
      const { minYear, minMonth, minDate, minHour, minMinute } = this.getBoundary('min', value)

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

    // 将当前的 value 格式化后，按照年月日时分秒拆分成数组
    getPickerValue (value) {
      return this.getValueArray(this.formatValue(value))
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

    // 格式化当前日期 value
    formatValue (value) {
      // 显示小时：分钟
      if (this.type === 'time') {
        // 如果值为空，那么设置当前值为 最小时分
        if (!value) {
          value = `${padZero(this.minHour)}:${padZero(this.minMinute)}`
        }

        // 拆分时分 xx:xx -> [hour, minute]
        let [hour, minute] = value.split(':')
        // 控制 hour, minute 范围
        hour = padZero(range(hour, this.minHour, this.maxHour))
        minute = padZero(range(minute, this.minMinute, this.maxMinute))

        return `${hour}:${minute}`
      }
      // value 值不为date类型 或 无效日期，设置值为最小日期
      if (Object.prototype.toString.call(value) !== '[object Date]' || isNaN(value.getTime())) {
        value = this.minDate
      }

      // 取有效日期
      value = range(value.getTime(), this.minDate.getTime(), this.maxDate.getTime())

      // 转换为date格式
      return new Date(value)
    },

    /**
     * 获取边界分界线
     * @param {String} type 边界类型 value = max / min
     * @param {string / date} value 要处理的日期
     */
    getBoundary (type, value) {
      const boundary = this[`${type}Date`]
      // 拆分年月日时分
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

    // 更新inner
    updateInnerValue () {
      const pickerView = this.$refs.pickerView || this.getPickerView()
      let values = ''

      values = pickerView.getValues()

      if (this.type === 'time') {
        this.innerValue = `${padZero(values[0])}:${padZero(values[1])}`
        return
      }

      // 处理年份 索引位0
      const year = values[0] && parseInt(values[0])

      // 处理月 索引位1
      const month = values[1] && parseInt(values[1])

      const maxDate = getMonthEndDay(year, month)

      // 处理 date 日期 索引位2
      let date = 1
      if (this.type !== 'year-month') {
        date = (values[2] && parseInt(values[2])) > maxDate ? maxDate : (values[2] && parseInt(values[2]))
      }

      // 处理 时分 索引位3，4
      let hour = 0
      let minute = 0

      if (this.type === 'datetime') {
        hour = values[3] && parseInt(values[3])
        minute = values[4] && parseInt(values[4])
      }
      const value = new Date(year, month - 1, date, hour, minute)

      this.innerValue = this.formatValue(value)
    },

    // picker列项更改矫正
    onColumnChange (pickerView, item, columnIndex, resolve) {
      this.updateInnerValue()
      resolve()
    },

    // 更新列数据
    updateColumnValues () {
      this.displayColumns = this.columns
      // 区分时间范围 还是 普通计时
      const values = this.getValueArray(this.innerValue)

      this.$nextTick(() => {
        // 根据数组 设置 pickerView 值
        const pickerView = this.$refs.pickerView || this.getPickerView()
        pickerView.setValues(values)
      })
    },

    // 将日期拆分成数组
    getValueArray (value) {
      if (this.type === 'time') {
        const [hour, minute] = value.split(':')

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
    },

    handleChange (pickerView, value, index) {
      this.$emit('change', pickerView, value, index)
    }
  }
}
</script>
