<template>
  <div style="margin: 20px 0">
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
    <demo-block title="必填标志" transparent>
      <wd-datetime-picker v-model="value18" label="日期选择" required />
    </demo-block>
    <demo-block title="值靠右展示" transparent>
      <wd-datetime-picker v-model="value12" label="日期选择" align-right />
    </demo-block>
    <demo-block title="唤起项插槽">
      <div class="text">
        当前时间：
        <span>{{value14}}</span>
      </div>
      <wd-datetime-picker v-model="value14">
        <wd-button type="primary">唤起picker</wd-button>
      </wd-datetime-picker>
    </demo-block>
    <demo-block title="时间范围选择" transparent>
      <wd-datetime-picker v-model="value16" label="时间范围选择" :columns-height="100" type="time"></wd-datetime-picker>
      <!-- TODO 可能会修改交互形式，此slot可能会替换 -->
      <wd-datetime-picker v-model="value17" label="分隔符插槽" :columns-height="100">
        <div slot="region-separator" class="region-separator">分隔符</div>
      </wd-datetime-picker>
      <div class="range-wrapper">
        <div class="text">
          开始时间:
          <span>{{value15[0]}}</span>
        </div>
        <div class="text">
          结束时间:
          <span>{{value15[1]}}</span>
        </div>
        <wd-datetime-picker v-model="value15" :columns-height="100">
          <wd-button type="primary">唤起picker</wd-button>
        </wd-datetime-picker>
      </div>
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
      value13: new Date(),
      value14: new Date(2012, 10, 10, 10, 10),
      value15: [
        new Date(2012, 10, 10, 10, 10),
        new Date(2014, 8, 10, 12, 22)
      ],
      value16: [
        '09:20',
        '11:20'
      ],
      value17: [
        new Date(2012, 10, 10, 10, 10),
        new Date(2013, 10, 11, 10, 10)
      ],
      value18: '',
      value19: '',
      value20: ''
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
<style scoped lang="scss">
.text {
  margin-bottom: 10px;
  color: rgba(0, 0, 0, 0.65);

  span {
    color: #34d19d;
  }
}
.range-wrapper {
  padding: 15px 15px;
  background-color: #fff;
  border-top: 1px solid rgba(0, 0, 0, 0.04);
}
.region-separator {
  text-align: center;
  position: relative;
  margin: 10px 0;
  color: rgba(0, 0, 0, 0.25);
  &::after {
    content: '';
    position: absolute;
    width: 50%;
    height: 1px;
    left: -30px;
    top: 50%;
    background-color: rgba(0, 0, 0, 0.04);
  }
  &::before {
    content: '';
    position: absolute;
    width: 50%;
    height: 1px;
    right: -30px;
    top: 50%;
    background-color: rgba(0, 0, 0, 0.04);
  }
}
</style>
