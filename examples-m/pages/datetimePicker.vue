<template>
  <div style="margin: 20px 0">
    <jm-datetime-picker v-model="value1" label="日期选择" />
    <jm-datetime-picker type="date" v-model="value2" label="年月日" />
    <jm-datetime-picker type="year-month" v-model="value3" label="年月" />
    <jm-datetime-picker v-model="value4" label="展示格式" :display-format="displayFormat" />
    <jm-datetime-picker v-model="value4" label="内部格式" :formatter="formatter" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      value1: new Date(),
      value2: '',
      value3: new Date(),
      value4: new Date()
    }
  },
  methods: {
    displayFormat (value) {
      return `${value[0]}年${value[1]}月${value[2]}日 ${value[3]}:${value[4]}`
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
    }
  }
}
</script>
