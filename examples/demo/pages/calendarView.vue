<template>
  <div class="page-calendaar-view">
    <demo-block title="单个日期选择" :hor="0">
      <div style="margin: 0 15px 10px;">
        <div style="margin-bottom: 10px; font-size: 13px;">切换类型：</div>
        <wd-radio-group v-model="type1" shape="button">
          <wd-radio value="date">date</wd-radio>
          <wd-radio value="week">week</wd-radio>
          <wd-radio value="month">month</wd-radio>
        </wd-radio-group>
      </div>
      <wd-calendar-view :type="type1" v-model="value1" />
    </demo-block>
    <demo-block title="多个日期选择" :hor="0">
      <wd-calendar-view type="dates" v-model="value2" />
    </demo-block>
    <demo-block title="日期范围选择" :hor="0">
      <div style="margin: 0 15px 10px;">
        <div style="margin-bottom: 10px; font-size: 13px;">切换类型：</div>
        <wd-radio-group v-model="type2" shape="button">
          <wd-radio value="daterange">daterange</wd-radio>
          <wd-radio value="weekrange">weekrange</wd-radio>
          <wd-radio value="monthrange">monthrange</wd-radio>
        </wd-radio-group>
      </div>
      <wd-calendar-view :type="type2" v-model="value3" />
    </demo-block>
    <demo-block title="时间类型" :hor="0">
      <wd-calendar-view type="datetime" v-model="value4" />
    </demo-block>
    <demo-block title="时间范围类型" :hor="0">
      <wd-calendar-view type="datetimerange" allow-same-day v-model="value5" />
    </demo-block>
    <demo-block title="限制最大选择范围" :hor="0">
      <wd-calendar-view type="daterange" :max-range="3" v-model="value6" />
    </demo-block>
    <demo-block title="自定义日期" :hor="0">
      <wd-calendar-view type="daterange" v-model="value7" :formatter="formatter" />
    </demo-block>
    <demo-block title="设置周起始日" :hor="0">
      <wd-calendar-view type="daterange" :first-day-of-week="1" v-model="value8" />
    </demo-block>
  </div>
</template>

<script>
export default {
  data () {
    return {
      type1: 'date',
      type2: 'daterange',
      value1: Date.now(),
      value2: '',
      value3: [Date.now() - 24 * 60 * 60 * 1000 * 3, Date.now() - 24 * 60 * 60 * 1000],
      value4: Date.now(),
      value5: [Date.now() - 24 * 60 * 60 * 1000 * 3, Date.now() - 24 * 60 * 60 * 1000],
      value6: '',
      value7: '',
      value8: '',
      formatter (day) {
        const date = new Date(day.date)
        const now = new Date()

        const year = date.getFullYear()
        const month = date.getMonth()
        const da = date.getDate()
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
      }
    }
  }
}
</script>