<template>
  <div>
    <demo-block transparent>
      <div slot="title">基本用法，数值: {{ value1 }}</div>
      <wd-datetime-picker-view v-model="value1" />
    </demo-block>
    <demo-block transparent>
      <div slot="title">年月日，数值: {{ value2 }}</div>
      <wd-datetime-picker-view type="date" v-model="value2" />
    </demo-block>
    <demo-block transparent>
      <div slot="title">年月，数值: {{ value3 }}</div>
      <wd-datetime-picker-view type="year-month" v-model="value3" />
    </demo-block>
    <demo-block transparent>
      <div slot="title">时分，数值: {{ value4 }}</div>
      <wd-datetime-picker-view type="time" v-model="value4" />
    </demo-block>
    <demo-block transparent>
      <div slot="title">内部格式，数值: {{ value5 }}</div>
      <wd-datetime-picker-view :formatter="formatter" v-model="value5" />
    </demo-block>
    <demo-block transparent>
      <div slot="title">过滤选项，数值: {{ value6 }}</div>
      <wd-datetime-picker-view :filter="filter" v-model="value6" />
    </demo-block>
    <demo-block transparent>
      <div slot="title">选项数组设置，数值: {{ value7 }}</div>
      <wd-datetime-picker-view :column-formatter="setColumn" v-model="value7" />
    </demo-block>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value1: new Date(),
      value2: '',
      value3: new Date(),
      value4: '09:20',
      value5: new Date(),
      value6: '',
      value7: new Date()
    }
  },

  methods: {
    formatter (type, value) {
      switch (type) {
        case 'year':
          return value + '年'
        case 'month':
          return value + '月'
        case 'date':
          return value + '日'
        case 'hour':
          return value + '时'
        case 'minute':
          return value + '分'
        default:
          return value
      }
    },

    filter (type, values) {
      if (type === 'minute') {
        return values.filter(value => value % 5 === 0)
      }

      return values
    },

    setColumn (pickerView, originColumns, currentValue) {
      currentValue = pickerView.getPickerValue(currentValue)

      const mapColumns = (columns) => {
        // 此时index是最外层知道当前的索引即可得到当前是哪个时间段
        return columns.map((column, cIndex) => {
          return column.values.map((value, index) => {
            return {
              label: (column.type === 'hour' ? '#:' : '') + value,
              value,
              disabled: column.type === 'year' && (currentValue[0] !== value)
            }
          })
        })
      }

      return mapColumns(originColumns)
    }
  }
}
</script>
