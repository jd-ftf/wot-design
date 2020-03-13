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
      <wd-datetime-picker-view :formatter="formatter"  v-model="value5" />
    </demo-block>
    <demo-block transparent>
      <div slot="title">过滤选项，数值: {{ value6 }}</div>
      <wd-datetime-picker-view :filter="filter"  v-model="value6" />
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
}
</script>