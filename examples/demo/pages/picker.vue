<template>
  <div>
    <div style="margin: 20px 0">
      <wd-picker :columns="columns1" label="单列选项" v-model="value1" />
      <wd-picker :columns="columns1" label="禁用" v-model="value2" disabled />
      <wd-picker :columns="columns1" label="只读" v-model="value3" readonly />
      <wd-picker :columns="columns1" label="loading" v-model="value4" loading />
      <wd-picker :columns="columns2" label="多列" v-model="value5" />
      <wd-picker
        :columns="columns3"
        label="多列联动"
        v-model="value6"
        :column-change="onChangeDistrict"
      />
      <wd-picker
        :columns="columns2"
        label="展示格式化"
        v-model="value7"
        :display-format="displayFormat"
      />
      <wd-picker :columns="columns1" label="标题" v-model="value8" title="文案标题" />
      <wd-picker
        :columns="columns1"
        label="before-confirm"
        v-model="value9"
        :loading="isLoading"
        :before-confirm="beforeConfirm"
      />
    </div>
    <demo-block title="label不传" transparent>
      <wd-picker :columns="columns1" v-model="value10" />
    </demo-block>
    <demo-block title="大小" transparent>
      <wd-picker :columns="columns1" label="单列选择" v-model="value11" size="large" />
    </demo-block>
    <demo-block title="错误" transparent>
      <wd-picker :columns="columns1" label="单列选择" v-model="value11" error />
    </demo-block>
    <demo-block title="值靠右显示" transparent>
      <wd-picker :columns="columns1" label="单列选择" v-model="value12" align-right />
    </demo-block>
  </div>
</template>

<script>
const district = {
  '0': [{ label: '北京', value: '110000' }, { label: '广东省', value: '440000' }],
  '110000': [{ label: '北京', value: '110100' }],
  '440000': [{ label: '广州市', value: '440100' }, { label: '韶关市', value: '440200' }, { label: '深圳市', value: '440300' }, { label: '珠海市', value: '440400' }, { label: '汕头市', value: '440500' }],
  '110100': [{ label: '东城区', value: '110101' }, { label: '西城区', value: '110102' }, { label: '朝阳区', value: '110105' }, { label: '丰台区', value: '110106' }, { label: '石景山区', value: '110107' }],
  '440100': [{ label: '荔湾区', value: '440103' }, { label: '越秀区', value: '440104' }, { label: '海珠区', value: '440105' }],
  '440200': [{ label: '武江区', value: '440203' }],
  '440300': [{ label: '罗湖区', value: '440303' }, { label: '福田区', value: '440304' }],
  '440400': [{ label: '香洲区', value: '440402' }, { label: '斗门区', value: '440403' }, { label: '金湾区', value: '440404' }],
  '440500': [{ label: '龙湖区', value: '440507' }, { label: '金平区', value: '440511' }]
}

export default {
  data () {
    return {
      columns1: ['选项1', '选项2', '选项3', '选项4', '选项5', '选项6', '选项7'],
      columns2: [
        ['中山大学', '中南大学', '华南理工大学'],
        ['计算机科学与技术', '软件工程', '通信工程', '法学', '经济学']
      ],
      columns3: [
        district[0],
        district[district[0][0].value],
        district[district[district[0][0].value][0].value]
      ],
      value1: '',
      value2: '选项3',
      value3: '选项4',
      value4: '',
      value5: ['中南大学', '软件工程'],
      value6: ['110000', '110100', '110102'],
      value7: ['中南大学', '软件工程'],
      value8: '',
      value9: '',
      value10: '',
      value11: '',
      value12: '',
      isLoading: false
    }
  },
  methods: {
    onChangeDistrict (pickerView, item, columnIndex, resolve) {
      if (columnIndex === 0) {
        pickerView.setColumnData(1, district[item.value])
        pickerView.setColumnData(2, district[district[item.value][0].value])
        return
      }
      if (columnIndex === 1) {
        pickerView.setColumnData(2, district[item.value])
      }
      resolve()
    },
    displayFormat (items) {
      return items.join('-')
    },
    beforeConfirm (value, resolve) {
      this.isLoading = true
      setTimeout(() => {
        this.isLoading = false
        if (['选项2', '选项3'].indexOf(value) > -1) {
          resolve(false)
          this.$toast.error('选项校验不通过，请重新选择')
        } else {
          resolve(true)
        }
      }, 2000)
    }
  }
}
</script>
