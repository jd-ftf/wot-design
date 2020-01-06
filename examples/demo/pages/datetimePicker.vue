<template>
  <div style="margin: 20px 0">
    <wd-datetime-picker v-model="value1" label="日期选择" />
    <wd-datetime-picker type="date" v-model="value2" label="年月日" />
    <wd-datetime-picker type="year-month" v-model="value3" label="年月" />
    <wd-datetime-picker type="time" v-model="value4" label="时分" />
    <wd-datetime-picker v-model="value5" label="展示格式" :display-format="displayFormat" />
    <wd-datetime-picker v-model="value6" label="内部格式" :formatter="formatter" />
    <wd-datetime-picker v-model="value7" label="过滤选项" :filter="filter" />
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
      value6: new Date(),
      value7: ''
    }
  },
  methods: {
    displayFormat (items) {
      return `${items[0].label}年${items[1].label}月${items[2].label}日 ${items[3].label}:${items[4].label}`
    },
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
    }
  }
}
</script>
