<template>
  <div style="margin: 20px 0">
    <jm-picker :columns="columns1" label="单列选项" v-model="value1" />
    <jm-picker :columns="columns1" label="禁用" v-model="value2" disabled />
    <jm-picker :columns="columns1" label="只读" v-model="value3" readonly />
    <jm-picker :columns="columns1" label="loading" v-model="value4" loading />
    <jm-picker :columns="columns2" label="多列" v-model="value5" />
    <jm-picker :columns="columns3" label="多列联动" v-model="value6" :column-change="onChangeDistrict" :display-format="displayFormat" />
  </div>
</template>

<script>
const district = {
  '0': [{ label: '北京', value: '110000' }, { label: '广东省', value: '440000' }],
  '110000': [{ label: '北京', value: '110100' }],
  '440000': [{ label: '广州市', value: '440100' }, { label: '深圳市', value: '440300' }],
  '110100': [{ label: '东城区', value: '110101' }, { label: '西城区', value: '110102' }],
  '440100': [{ label: '荔湾区', value: '440103' }, { label: '越秀区', value: '440104' }],
  '440300': [{ label: '罗湖区', value: '440303' }, { label: '福田区', value: '440304' }]
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
      onChangeDistrict (pickerView, item, columnIndex) {
        if (columnIndex === 0) {
          pickerView.setColumnData(1, district[item.value])
          pickerView.setColumnData(2, district[district[item.value][0].value])
          return
        }
        if (columnIndex === 1) {
          pickerView.setColumnData(2, district[item.value])
        }
      },
      displayFormat (items) {
        return items.map(item => {
          return item.label
        }).join('-')
      }
    }
  }
}
</script>
