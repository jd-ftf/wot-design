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
  </div>
</template>

<script>
export default {
  data () {
    return {
      type1: 'date',
      type2: 'daterange',
      value1: '',
      value2: '',
      value3: '',
      value4: Date.now()
    }
  }
}
</script>