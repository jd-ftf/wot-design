
<template>
  <div>
    <wd-cell-group border style="margin: 20px 0">
      <wd-select-picker label="基本用法" v-model="value1" :columns="columns1"></wd-select-picker>
      <wd-select-picker label="类型切换" v-model="value2" type="radio" :columns="columns1"></wd-select-picker>
      <wd-select-picker label="禁用" v-model="value3" :columns="columns1" disabled></wd-select-picker>
      <wd-select-picker label="只读" v-model="value4" :columns="columns1" readonly></wd-select-picker>
      <wd-select-picker label="loading" v-model="value5" :columns="columns1" loading></wd-select-picker>
      <wd-select-picker label="禁用选项" v-model="value6" :columns="columns2"></wd-select-picker>
      <wd-select-picker
        label="展示格式"
        v-model="value7"
        :columns="columns1"
        :display-format="displayFormat"
      ></wd-select-picker>
      <wd-select-picker
        label="before-confirm"
        v-model="value8"
        :columns="columns1"
        :before-confirm="beforeConfirm"
      />
      <wd-select-picker label="标题" v-model="value9" :columns="columns1" title="多选"></wd-select-picker>
      <wd-select-picker label="错误" v-model="value10" :columns="columns1" error></wd-select-picker>
      <wd-select-picker label="必填" v-model="value11" :columns="columns1" required></wd-select-picker>
      <wd-select-picker
        label="change事件"
        v-model="value12"
        :columns="columns1"
        @change="handleChange"
      ></wd-select-picker>
      <wd-select-picker label="值靠右展示" v-model="value13" :columns="columns1" align-right></wd-select-picker>
    </wd-cell-group>
    <demo-block title="label不传" transparent>
      <wd-select-picker v-model="value14" :columns="columns1"></wd-select-picker>
    </demo-block>
    <demo-block title="大小" transparent>
      <wd-select-picker label="大尺寸" v-model="value15" size="large" :columns="columns1"></wd-select-picker>
    </demo-block>
    <demo-block title="默认插槽">
      <div class="text">
        当前选中项：
        <span>{{value16}}</span>
      </div>
      <wd-select-picker v-model="value16" :columns="columns1">
        <wd-button type="primary">默认唤起项</wd-button>
      </wd-select-picker>
    </demo-block>
  </div>
</template>

<script>
export default {
  data () {
    return {
      changeValue: '',
      initValue: '',
      columns1: [
        {
          value: '1',
          label: '京麦'
        },
        {
          value: '2',
          label: '京东金融'
        },
        {
          value: '3',
          label: '京me'
        },
        {
          value: '4',
          label: '京麦'
        },
        {
          value: '5',
          label: '京东金融'
        },
        {
          value: '6',
          label: '京me'
        },
        {
          value: '7',
          label: '京麦'
        },
        {
          value: '8',
          label: '京东金融'
        },
        {
          value: '9',
          label: '京me'
        }
      ],
      columns2: [
        {
          value: '1',
          label: '京麦',
          disabled: true
        },
        {
          value: '2',
          label: '京东金融'
        },
        {
          value: '3',
          label: '京me'
        }
      ],
      value1: ['1'],
      value2: '1',
      value3: ['2'],
      value4: ['3'],
      value5: [],
      value6: [],
      value7: [],
      value8: [],
      value9: [],
      value10: [],
      value11: [],
      value12: ['3'],
      value13: ['2'],
      value14: ['1'],
      value15: ['3'],
      value16: ['2']
    }
  },

  created () {
    this.initValue = this.value17
  },

  methods: {
    displayFormat (items) {
      let showValue = ''
      this.columns1.forEach(column => {
        items.forEach((item, index) => {
          if (column.value === item) {
            showValue += `${item}: ${column.label} ${index + 1 < items.length ? '--' : ''} `
          }
        })
      })
      return showValue
    },

    beforeConfirm (value, resolve) {
      if (value.length > 2) {
        this.$toast.warning('最多只能选择两款产品')
        resolve(false)
      } else {
        resolve(true)
      }
    },

    handleChange (val) {
      this.$toast.info(val.length === 0 ? '未选择' : val.toString())
    }
  }
}
</script>

<style lang="scss" scoped>
.showdemo {
  text-align: center;
  padding: 25px;
}
.text {
  margin-bottom: 10px;
  color: rgba(0, 0, 0, 0.65);

  span {
    color: #34d19d;
  }
}
.bg {
  padding: 10px;
  background: rgba(0, 0, 0, 0.04);
  border-radius: 4px;
}
</style>
