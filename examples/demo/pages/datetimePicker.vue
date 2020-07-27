<template>
  <div style="margin: 20px 0">
    <demo-block title="值靠右展示" transparent>
      <wd-datetime-picker v-model="value13" label="区域选择" align-right />
    </demo-block>
    <div>
      <wd-datetime-picker v-model="value1" label="日期选择" />
      <wd-datetime-picker type="date" v-model="value2" label="年月日" />
      <wd-datetime-picker type="year-month" v-model="value3" label="年月" />
      <wd-datetime-picker type="time" v-model="value4" label="时分" />
      <wd-datetime-picker v-model="value5" label="展示格式" :display-format="displayFormat" />
      <wd-datetime-picker v-model="value6" label="内部格式" :formatter="formatter" />
      <wd-datetime-picker v-model="value7" label="过滤选项" :filter="filter" />
      <wd-datetime-picker v-model="value8" label="before-confirm" :before-confirm="beforeConfirm" />
    </div>
    <demo-block title="label 不传" transparent>
      <wd-datetime-picker v-model="value9" />
    </demo-block>
    <demo-block title="大小" transparent>
      <wd-datetime-picker v-model="value10" label="日期选择" size="large" />
    </demo-block>
    <demo-block title="错误" transparent>
      <wd-datetime-picker v-model="value11" label="日期选择" error />
    </demo-block>
    <demo-block title="值靠右展示" transparent>
      <wd-datetime-picker v-model="value12" label="日期选择" align-right />
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
      value6: new Date(),
      value7: '',
      value8: new Date(),
      value9: new Date(),
      value10: new Date(),
      value11: '',
      value12: new Date(),
      value13: [
        new Date(),
        ''
      ]
    }
  },
  watch: {
    value1 (val) {
      console.log(val)
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
    },
    beforeConfirm (value, resolve) {
      if (value.getTime() > Date.now()) {
        resolve(false)
        this.$toast.error('不能选择大于今天的日期')
      } else {
        resolve(true)
      }
    }
  }
}
</script>
