<template>
  <div>
    <wd-cell-group border>
      <wd-calendar label="单个日期选择" v-model="value1" />
      <wd-calendar label="多个日期选择" type="dates" v-model="value2" />
      <wd-calendar label="日期范围选择" type="daterange" v-model="value3" />
      <wd-calendar label="日期时间选择" type="datetime" v-model="value4" />
      <wd-calendar label="日期时间范围选择" type="datetimerange" v-model="value5" :default-time="['00:00:00', '23:59:59']" />
      <wd-calendar label="周选择" type="week" v-model="value6" />
      <wd-calendar label="月选择" type="month" v-model="value7" />
      <wd-calendar label="周范围选择" :first-day-of-week="1" type="weekrange" v-model="value8" />
      <wd-calendar label="月范围选择" type="monthrange" v-model="value9" />
      <wd-calendar label="日周月切换" :first-day-of-week="1" show-type-switch v-model="value10" />
      <wd-calendar label="快捷操作" v-model="value11" :show-confirm="false" />
      <wd-calendar label="日期格式化" type="daterange" v-model="value12" :formatter="formatter" />
      <wd-calendar label="快捷选项" :shortcuts="shortcuts" :on-shortcuts-click="onShortcutsClick" type="daterange" v-model="value13" />
      <wd-calendar label="自定义展示" type="daterange" v-model="value14" :display-format="displayFormat" :inner-display-format="innerDisplayFormat" />
      <wd-calendar label="before-confirm" v-model="value15" :before-confirm="beforeConfirm" />
    </wd-cell-group>
    <demo-block transparent title="自定义选择器">
      <div style="margin-bottom: 10px;">
        当前选中日期：{{ value16 && new Date(value16) }}
      </div>
      <wd-calendar v-model="value16">
        <wd-button>选择日期</wd-button>
      </wd-calendar>
    </demo-block>
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  data () {
    return {
      value1: '',
      value2: [new Date(Date.now() - 24 * 60 * 60 * 1000 * 3), new Date()],
      value3: [],
      value4: new Date(),
      value5: [],
      value6: new Date(),
      value7: new Date(),
      value8: [new Date(Date.now() - 24 * 60 * 60 * 1000 * 14), new Date()],
      value9: [new Date(Date.now() - 24 * 60 * 60 * 1000 * 33), new Date()],
      value10: new Date(),
      value11: '',
      value12: [new Date(Date.now() - 24 * 60 * 60 * 1000 * 3), new Date()],
      value13: '',
      value14: [new Date(Date.now() - 24 * 60 * 60 * 1000 * 3), new Date()],
      value15: '',
      value16: '',
      shortcuts: [
        {
          text: '近7天',
          id: 7
        }, {
          text: '近15天',
          id: 15
        }, {
          text: '近30天',
          id: 30
        }
      ]
    }
  },
  methods: {
    formatter: function (day) {
      const now = new Date()

      const year = day.date.getFullYear()
      const month = day.date.getMonth()
      const da = day.date.getDate()
      const nowYear = now.getFullYear()
      const nowMonth = now.getMonth()
      const nowDa = now.getDate()

      if (year === nowYear && month === nowMonth && da === nowDa) {
        day.topInfo = '今天'
      }

      if (month === 5 && da === 18) {
        day.topInfo = '618大促'
      }

      if (month === 10 && da === 11) {
        day.topInfo = '京东双11'
      }

      if (day.type === 'start') {
        day.bottomInfo = '开始'
      }

      if (day.type === 'end') {
        day.bottomInfo = '结束'
      }

      if (day.type === 'same') {
        day.bottomInfo = '开始/结束'
      }

      return day
    },
    onShortcutsClick ({ item }) {
      const dayDiff = item.id
      const endDate = Date.now() - 24 * 60 * 60 * 1000
      const startDate = endDate - dayDiff * 24 * 60 * 60 * 1000

      return [new Date(startDate), new Date(endDate)]
    },
    displayFormat (value) {
      return dayjs(value[0]).format('YY年MM月DD日') + ' - ' + dayjs(value[1]).format('YY年MM月DD日')
    },
    innerDisplayFormat (value, rangeType) {
      if (!value) {
        return rangeType === 'start' ? '活动开始时间' : '活动结束时间'
      }

      return dayjs(value).format('YY年MM月DD日')
    },
    beforeConfirm ({ value, resolve }) {
      if (value > Date.now()) {
        this.$toast.error('该日期暂无数据，请选择今天或今天之前的日期')
        resolve(false)
      } else {
        resolve(true)
      }
    }
  }
}
</script>
