<template>
  <div>
    <space>
      <div slot="title">基本用法，数值: {{ value1 }}</div>
      <wd-picker-view :columns="columns1" v-model="value1" @change="onChange" />
    </space>
    <space>
      <div slot="title">禁用选项，数值: {{ value2 }}</div>
      <wd-picker-view :columns="columns2" v-model="value2" />
    </space>
    <space>
      <div slot="title">加载中，数值: {{ value3 }}</div>
      <wd-picker-view :columns="columns1" v-model="value3" loading />
    </space>
    <space >
      <div slot="title">多列，数值: {{ value4 }}</div>
      <wd-picker-view :columns="columns3" v-model="value4" />
    </space>
    <space>
      <div slot="title">多级联动，数值: {{ value5 }}</div>
      <wd-picker-view :columns="columns4" v-model="value5" :column-change="onChangeDistrict" />
    </space>
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
      value1: '选项1',
      value2: '选项1',
      value3: '',
      columns2: [
        {
          label: '选项1'
        }, {
          label: '选项2'
        }, {
          label: '选项3',
          disabled: true
        }, {
          label: '选项4'
        }, {
          label: '选项5'
        }, {
          label: '选项6'
        }, {
          label: '选项7'
        }
      ],
      columns3: [
        ['中山大学', '中南大学', '华南理工大学'],
        ['计算机科学与技术', '软件工程', '通信工程', '法学', '经济学']
      ],
      value4: ['中南大学', '软件工程'],
      columns4: [
        district[0],
        district[district[0][0].value],
        district[district[district[0][0].value][0].value]
      ],
      value5: ['110000', '110100', '110102'],
      onChangeDistrict (pickerView, item, columnIndex) {
        if (columnIndex === 0) {
          pickerView.setColumnData(1, district[item.value])
          pickerView.setColumnData(2, district[district[item.value][0].value])
          return
        }
        if (columnIndex === 1) {
          pickerView.setColumnData(2, district[item.value])
        }
      }
    }
  },
  methods: {
    onChange (picker, value, index) {
      this.$toast(`当前选中项: ${value}, 下标: ${index}`)
    },
    onCancel () {
      this.$toast('点击了取消')
    },
    onConfirm (picker, value, index) {
      this.$toast(`点击了完成，当前选中项: ${value}, 下标: ${index}`)
    }
  }
}
</script>
